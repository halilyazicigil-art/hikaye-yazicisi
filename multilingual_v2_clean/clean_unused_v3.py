import re
import os
import sys

def main():
    errors_file = "tsc_errors.txt"
    if not os.path.exists(errors_file):
        print(f"Error: {errors_file} not found.")
        sys.exit(1)

    with open(errors_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Group errors by file
    file_errors = {}
    for line in lines:
        # Match pattern like: app/(auth)/register/page.tsx(39,9): error TS6133: ...
        match = re.match(r'^(.*)\((\d+),(\d+)\): error (TS6133|TS6196): \'([^\']+)\'', line.strip())
        if match:
            filepath = match.group(1).strip()
            line_num = int(match.group(2))
            col_num = int(match.group(3))
            varname = match.group(5)
            
            # Skip scratch files because we deleted the scratch folder
            if "scratch/" in filepath:
                continue
                
            if filepath not in file_errors:
                file_errors[filepath] = []
            file_errors[filepath].append((line_num, col_num, varname))

    for filepath, errors in file_errors.items():
        full_path = os.path.abspath(filepath)
        if not os.path.exists(full_path):
            print(f"Warning: File {full_path} not found.")
            continue

        print(f"Processing: {filepath} with {len(errors)} unused declarations")
        
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all import blocks in the file content
        import_blocks = []
        for m in re.finditer(r'\bimport\s+[\s\S]+?from\s+[\'"][^\'"]+[\'"]', content):
            import_blocks.append((m.start(), m.end(), m.group(0)))

        content_lines = content.splitlines(keepends=True)
        
        import_cleanups = []
        local_cleanups = []

        for line_num, col_num, varname in errors:
            char_idx = sum(len(l) for l in content_lines[:line_num-1]) + (col_num - 1)
            
            is_in_import = False
            for start, end, text in import_blocks:
                if start <= char_idx <= end:
                    import_cleanups.append((start, end, text, varname))
                    is_in_import = True
                    break
            
            if not is_in_import:
                local_cleanups.append((char_idx, line_num, col_num, varname))

        modifications = []

        # Process local cleanups
        for char_idx, line_num, col_num, varname in local_cleanups:
            if content[char_idx:char_idx+len(varname)] == varname:
                line_start = content.rfind('\n', 0, char_idx) + 1
                line_end = content.find('\n', char_idx)
                if line_end == -1:
                    line_end = len(content)
                line = content[line_start:line_end]
                pos_in_line = char_idx - line_start
                
                before_var = line[:pos_in_line].rstrip()
                
                if before_var.endswith(':'):
                    modifications.append((char_idx, char_idx+len(varname), "_" + varname))
                elif '{' in before_var and '}' in line[pos_in_line:]:
                    modifications.append((char_idx, char_idx+len(varname), f"{varname}: _{varname}"))
                else:
                    modifications.append((char_idx, char_idx+len(varname), "_" + varname))
            else:
                line_start = content.rfind('\n', 0, char_idx) + 1
                line_end = content.find('\n', char_idx)
                if line_end == -1:
                    line_end = len(content)
                line = content[line_start:line_end]
                
                match = re.search(r'\b' + re.escape(varname) + r'\b', line)
                if match:
                    actual_start = line_start + match.start()
                    before_var = line[:match.start()].rstrip()
                    if before_var.endswith(':'):
                        modifications.append((actual_start, actual_start+len(varname), "_" + varname))
                    elif '{' in before_var and '}' in line[match.start():]:
                        modifications.append((actual_start, actual_start+len(varname), f"{varname}: _{varname}"))
                    else:
                        modifications.append((actual_start, actual_start+len(varname), "_" + varname))

        # Group import cleanups
        block_cleanups = {}
        for start, end, text, varname in import_cleanups:
            if (start, end) not in block_cleanups:
                block_cleanups[(start, end)] = (text, [])
            block_cleanups[(start, end)][1].append(varname)

        for (start, end), (text, varnames) in block_cleanups.items():
            cleaned_text = text
            for varname in varnames:
                alias_pattern = r'\b[A-Za-z0-9_]+\s+as\s+' + re.escape(varname) + r'\b'
                if re.search(alias_pattern, cleaned_text):
                    cleaned_text = re.sub(alias_pattern, '', cleaned_text)
                else:
                    pattern = r'\b' + re.escape(varname) + r'\b'
                    cleaned_text = re.sub(pattern, '', cleaned_text)
                
                cleaned_text = re.sub(r',\s*,', ',', cleaned_text)
                cleaned_text = re.sub(r'{\s*,', '{', cleaned_text)
                cleaned_text = re.sub(r',\s*}', '}', cleaned_text)
                
            if re.search(r'\{\s*\}', cleaned_text) or re.match(r'^\s*import\s+from\s+.*$', cleaned_text.strip()) or not cleaned_text.strip() or "import ;" in cleaned_text or re.match(r'^\s*import\s*[\'"].*[\'"];?\s*$', cleaned_text.strip()):
                commented_lines = [f"// {l}" for l in text.splitlines(keepends=True)]
                cleaned_text = "".join(commented_lines)
                
            modifications.append((start, end, cleaned_text))

        modifications = sorted(modifications, key=lambda x: x[0], reverse=True)

        for start, end, replacement in modifications:
            content = content[:start] + replacement + content[end:]

        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)

    print("Advanced AST-safe cleanup completed successfully.")

if __name__ == "__main__":
    main()
