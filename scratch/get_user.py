import os
import requests

def get_env():
    env = {}
    with open('.env', 'r') as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                env[key] = value
    return env

env = get_env()
url = env['NEXT_PUBLIC_SUPABASE_URL']
key = env['SUPABASE_SERVICE_ROLE_KEY']

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}'
}

response = requests.get(f"{url}/rest/v1/profiles?select=user_id&limit=1", headers=headers)
print(response.text)
