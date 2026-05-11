module.exports = [
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "API_BACKWARDS_COMPATIBILITY_VERSION",
    ()=>API_BACKWARDS_COMPATIBILITY_VERSION,
    "GLOBAL_LOGS_API_KEY",
    ()=>GLOBAL_LOGS_API_KEY,
    "_global",
    ()=>_global,
    "makeGetter",
    ()=>makeGetter
]);
const GLOBAL_LOGS_API_KEY = Symbol.for('io.opentelemetry.js.api.logs');
const _global = globalThis;
function makeGetter(requiredVersion, instance, fallback) {
    return (version)=>version === requiredVersion ? instance : fallback;
}
const API_BACKWARDS_COMPATIBILITY_VERSION = 1; //# sourceMappingURL=global-utils.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "NOOP_LOGGER",
    ()=>NOOP_LOGGER,
    "NoopLogger",
    ()=>NoopLogger
]);
class NoopLogger {
    emit(_logRecord) {}
}
const NOOP_LOGGER = new NoopLogger(); //# sourceMappingURL=NoopLogger.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "NOOP_LOGGER_PROVIDER",
    ()=>NOOP_LOGGER_PROVIDER,
    "NoopLoggerProvider",
    ()=>NoopLoggerProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)");
;
class NoopLoggerProvider {
    getLogger(_name, _version, _options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NoopLogger"]();
    }
}
const NOOP_LOGGER_PROVIDER = new NoopLoggerProvider(); //# sourceMappingURL=NoopLoggerProvider.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "ProxyLogger",
    ()=>ProxyLogger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)");
;
class ProxyLogger {
    constructor(provider, name, version, options){
        this._provider = provider;
        this.name = name;
        this.version = version;
        this.options = options;
    }
    /**
     * Emit a log record. This method should only be used by log appenders.
     *
     * @param logRecord
     */ emit(logRecord) {
        this._getLogger().emit(logRecord);
    }
    /**
     * Try to get a logger from the proxy logger provider.
     * If the proxy logger provider has no delegate, return a noop logger.
     */ _getLogger() {
        if (this._delegate) {
            return this._delegate;
        }
        const logger = this._provider._getDelegateLogger(this.name, this.version, this.options);
        if (!logger) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER"];
        }
        this._delegate = logger;
        return this._delegate;
    }
} //# sourceMappingURL=ProxyLogger.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "ProxyLoggerProvider",
    ()=>ProxyLoggerProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js [app-rsc] (ecmascript)");
;
;
class ProxyLoggerProvider {
    getLogger(name, version, options) {
        var _a;
        return (_a = this._getDelegateLogger(name, version, options)) !== null && _a !== void 0 ? _a : new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLogger"](this, name, version, options);
    }
    /**
     * Get the delegate logger provider.
     * Used by tests only.
     * @internal
     */ _getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"];
    }
    /**
     * Set the delegate logger provider
     * @internal
     */ _setDelegate(delegate) {
        this._delegate = delegate;
    }
    /**
     * @internal
     */ _getDelegateLogger(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getLogger(name, version, options);
    }
} //# sourceMappingURL=ProxyLoggerProvider.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "LogsAPI",
    ()=>LogsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js [app-rsc] (ecmascript)");
;
;
;
class LogsAPI {
    constructor(){
        this._proxyLoggerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLoggerProvider"]();
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new LogsAPI();
        }
        return this._instance;
    }
    setGlobalLoggerProvider(provider) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) {
            return this.getLoggerProvider();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["makeGetter"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"], provider, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"]);
        this._proxyLoggerProvider._setDelegate(provider);
        return provider;
    }
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */ getLoggerProvider() {
        var _a, _b;
        return (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) === null || _a === void 0 ? void 0 : _a.call(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"], __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"])) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
    }
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */ getLogger(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
    }
    /** Remove the global logger provider */ disable() {
        delete __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]];
        this._proxyLoggerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLoggerProvider"]();
    }
} //# sourceMappingURL=logs.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "logs",
    ()=>logs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [app-rsc] (ecmascript)");
;
;
;
const logs = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$fastify$2f$otel$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LogsAPI"].getInstance(); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/import-in-the-middle/lib/register.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Unless explicitly stated otherwise all files in this repository are licensed under the Apache 2.0 License.
//
// This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.
const importHooks = [] // TODO should this be a Set?
;
const setters = new WeakMap();
const getters = new WeakMap();
const specifiers = new Map();
const toHook = [];
const proxyHandler = {
    set (target, name, value) {
        const set = setters.get(target);
        const setter = set && set[name];
        if (typeof setter === 'function') {
            return setter(value);
        }
        // If a module doesn't export the property being assigned (e.g. no default
        // export), there is no setter to call. Don't crash userland code.
        return true;
    },
    get (target, name) {
        if (name === Symbol.toStringTag) {
            return 'Module';
        }
        const getter = getters.get(target)[name];
        if (typeof getter === 'function') {
            return getter();
        }
    },
    defineProperty (target, property, descriptor) {
        if (!('value' in descriptor)) {
            throw new Error('Getters/setters are not supported for exports property descriptors.');
        }
        const set = setters.get(target);
        const setter = set && set[property];
        if (typeof setter === 'function') {
            return setter(descriptor.value);
        }
        return true;
    }
};
function register(name, namespace, set, get, specifier) {
    specifiers.set(name, specifier);
    setters.set(namespace, set);
    getters.set(namespace, get);
    const proxy = new Proxy(namespace, proxyHandler);
    importHooks.forEach((hook)=>hook(name, proxy, specifier));
    toHook.push([
        name,
        proxy,
        specifier
    ]);
}
exports.register = register;
exports.importHooks = importHooks;
exports.specifiers = specifiers;
exports.toHook = toHook;
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/import-in-the-middle/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Unless explicitly stated otherwise all files in this repository are licensed under the Apache 2.0 License.
//
// This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const moduleDetailsFromPath = __turbopack_context__.r("[project]/multilingual_version/node_modules/module-details-from-path/index.js [app-rsc] (ecmascript)");
const { fileURLToPath } = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const { MessageChannel } = __turbopack_context__.r("[externals]/worker_threads [external] (worker_threads, cjs)");
let { isBuiltin } = __turbopack_context__.r("[externals]/module [external] (module, cjs)");
if (!isBuiltin) {
    isBuiltin = ()=>true;
}
const { importHooks, specifiers, toHook } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/import-in-the-middle/lib/register.js [app-rsc] (ecmascript)");
function addHook(hook) {
    importHooks.push(hook);
    toHook.forEach(([name, namespace, specifier])=>hook(name, namespace, specifier));
}
function removeHook(hook) {
    const index = importHooks.indexOf(hook);
    if (index > -1) {
        importHooks.splice(index, 1);
    }
}
function callHookFn(hookFn, namespace, name, baseDir) {
    const newDefault = hookFn(namespace, name, baseDir);
    if (newDefault && newDefault !== namespace) {
        // Only ESM modules that actually export `default` can have it reassigned.
        // Some hooks return a value unconditionally; avoid crashing when the module
        // has no default export (see issue #188).
        if ('default' in namespace) {
            namespace.default = newDefault;
        }
    }
}
let sendModulesToLoader;
/**
 * EXPERIMENTAL
 * This feature is experimental and may change in minor versions.
 * **NOTE** This feature is incompatible with the {internals: true} Hook option.
 *
 * Creates a message channel with a port that can be used to add hooks to the
 * list of exclusively included modules.
 *
 * This can be used to only wrap modules that are Hook'ed, however modules need
 * to be hooked before they are imported.
 *
 * ```ts
 * import { register } from 'module'
 * import { Hook, createAddHookMessageChannel } from 'import-in-the-middle'
 *
 * const { registerOptions, waitForAllMessagesAcknowledged } = createAddHookMessageChannel()
 *
 * register('import-in-the-middle/hook.mjs', import.meta.url, registerOptions)
 *
 * Hook(['fs'], (exported, name, baseDir) => {
 *   // Instrument the fs module
 * })
 *
 * // Ensure that the loader has acknowledged all the modules
 * // before we allow execution to continue
 * await waitForAllMessagesAcknowledged()
 * ```
 */ function createAddHookMessageChannel() {
    const { port1, port2 } = new MessageChannel();
    let pendingAckCount = 0;
    let resolveFn;
    sendModulesToLoader = (modules)=>{
        pendingAckCount++;
        port1.postMessage(modules);
    };
    port1.on('message', ()=>{
        pendingAckCount--;
        if (resolveFn && pendingAckCount <= 0) {
            resolveFn();
        }
    }).unref();
    function waitForAllMessagesAcknowledged() {
        // This timer is to prevent the process from exiting with code 13:
        // 13: Unsettled Top-Level Await.
        const timer = setInterval(()=>{}, 1000);
        const promise = new Promise((resolve)=>{
            resolveFn = resolve;
        }).then(()=>{
            clearInterval(timer);
        });
        if (pendingAckCount === 0) {
            resolveFn();
        }
        return promise;
    }
    const addHookMessagePort = port2;
    const registerOptions = {
        data: {
            addHookMessagePort,
            include: []
        },
        transferList: [
            addHookMessagePort
        ]
    };
    return {
        registerOptions,
        addHookMessagePort,
        waitForAllMessagesAcknowledged
    };
}
function Hook(modules, options, hookFn) {
    if (this instanceof Hook === false) return new Hook(modules, options, hookFn);
    if (typeof modules === 'function') {
        hookFn = modules;
        modules = null;
        options = null;
    } else if (typeof options === 'function') {
        hookFn = options;
        options = null;
    }
    const internals = options ? options.internals === true : false;
    if (sendModulesToLoader && Array.isArray(modules)) {
        sendModulesToLoader(modules);
    }
    this._iitmHook = (name, namespace, specifier)=>{
        const loadUrl = name;
        const isNodeUrl = loadUrl.startsWith('node:');
        let filePath, baseDir;
        if (isNodeUrl) {
            // Normalize builtin module name to *not* have 'node:' prefix, unless
            // required, as it is for 'node:test' and some others.  `module.isBuiltin`
            // is available in all Node.js versions that have node:-only modules.
            const unprefixed = name.slice(5);
            if (isBuiltin(unprefixed)) {
                name = unprefixed;
            }
        } else if (loadUrl.startsWith('file://')) {
            const stackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            try {
                filePath = fileURLToPath(name);
                name = filePath;
            } catch (e) {}
            Error.stackTraceLimit = stackTraceLimit;
            if (filePath) {
                const details = moduleDetailsFromPath(filePath);
                if (details) {
                    name = details.name;
                    baseDir = details.basedir;
                }
            }
        }
        if (modules) {
            for (const matchArg of modules){
                if (filePath && matchArg === filePath) {
                    // abspath match
                    callHookFn(hookFn, namespace, filePath, undefined);
                } else if (matchArg === name) {
                    if (!baseDir) {
                        // built-in module (or unexpected non file:// name?)
                        callHookFn(hookFn, namespace, name, baseDir);
                    } else if (baseDir.endsWith(specifiers.get(loadUrl))) {
                        // An import of the top-level module (e.g. `import 'ioredis'`).
                        // Note: Slight behaviour difference from RITM. RITM uses
                        // `require.resolve(name)` to see if filename is the module
                        // main file, which will catch `require('ioredis/built/index.js')`.
                        // The check here will not catch `import 'ioredis/built/index.js'`.
                        callHookFn(hookFn, namespace, name, baseDir);
                    } else if (internals) {
                        const internalPath = name + path.sep + path.relative(baseDir, filePath);
                        callHookFn(hookFn, namespace, internalPath, baseDir);
                    }
                } else if (matchArg === specifier) {
                    callHookFn(hookFn, namespace, specifier, baseDir);
                }
            }
        } else {
            callHookFn(hookFn, namespace, name, baseDir);
        }
    };
    addHook(this._iitmHook);
}
Hook.prototype.unhook = function() {
    removeHook(this._iitmHook);
};
module.exports = Hook;
module.exports.Hook = Hook;
module.exports.addHook = addHook;
module.exports.removeHook = removeHook;
module.exports.createAddHookMessageChannel = createAddHookMessageChannel;
}),
"[project]/multilingual_version/node_modules/@fastify/otel/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"name\":\"@fastify/otel\",\"version\":\"0.18.0\",\"description\":\"Official Fastify OpenTelemetry Instrumentation\",\"main\":\"index.js\",\"type\":\"commonjs\",\"types\":\"types/index.d.ts\",\"scripts\":{\"lint\":\"eslint\",\"lint:fix\":\"eslint --fix\",\"test\":\"npm run test:all && npm run test:typescript\",\"test:unit\":\"c8 --100 node --test\",\"test:all\":\"npm run test:v4 && npm run test:v5\",\"test:v4\":\"cross-env FASTIFY_VERSION=fastifyv4 npm run test:unit\",\"test:v5\":\"cross-env FASTIFY_VERSION=fastify npm run test:unit\",\"test:coverage\":\"c8 node --test && c8 report --reporter=html\",\"test:typescript\":\"tsd\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/fastify/otel.git\"},\"keywords\":[\"plugin\",\"helper\",\"fastify\",\"instrumentation\",\"otel\",\"opentelemetry\"],\"author\":\"Carlos Fuentes - @metcoder95 (https://metcoder.dev)\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/fastify/otel/issues\"},\"homepage\":\"https://github.com/fastify/otel#readme\",\"funding\":[{\"type\":\"github\",\"url\":\"https://github.com/sponsors/fastify\"},{\"type\":\"opencollective\",\"url\":\"https://opencollective.com/fastify\"}],\"devDependencies\":{\"@fastify/type-provider-typebox\":\"^6.1.0\",\"@opentelemetry/context-async-hooks\":\"^2.0.0\",\"@opentelemetry/contrib-test-utils\":\"^0.59.0\",\"@opentelemetry/instrumentation-http\":\"^0.212.0\",\"@opentelemetry/propagator-jaeger\":\"^2.0.0\",\"@opentelemetry/sdk-trace-base\":\"^2.0.0\",\"@opentelemetry/sdk-trace-node\":\"^2.2.0\",\"@types/node\":\"^25.0.3\",\"c8\":\"^11.0.0\",\"cross-env\":\"^10.0.0\",\"eslint\":\"^9.16.0\",\"fastify\":\"^5.1.0\",\"fastify-plugin\":\"^5.1.0\",\"fastifyv4\":\"npm:fastify@^4.0.0\",\"neostandard\":\"^0.12.0\",\"tsd\":\"^0.33.0\"},\"dependencies\":{\"@opentelemetry/core\":\"^2.0.0\",\"@opentelemetry/instrumentation\":\"^0.212.0\",\"@opentelemetry/semantic-conventions\":\"^1.28.0\",\"minimatch\":\"^10.2.4\"},\"peerDependencies\":{\"@opentelemetry/api\":\"^1.9.0\"},\"tsd\":{\"directory\":\"types\"}}"));}),
"[project]/multilingual_version/node_modules/@fastify/otel/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const dc = __turbopack_context__.r("[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)");
const { context, trace, SpanStatusCode, propagation, diag } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const { getRPCMetadata, RPCType } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const { ATTR_HTTP_ROUTE, ATTR_HTTP_RESPONSE_STATUS_CODE, ATTR_HTTP_REQUEST_METHOD, ATTR_URL_PATH } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const { InstrumentationBase } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const { version: PACKAGE_VERSION, name: PACKAGE_NAME } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/package.json (json)");
// Constants
const SUPPORTED_VERSIONS = '>=4.0.0 <6';
const FASTIFY_HOOKS = [
    'onRequest',
    'preParsing',
    'preValidation',
    'preHandler',
    'preSerialization',
    'onSend',
    'onResponse',
    'onError'
];
const ATTRIBUTE_NAMES = {
    HOOK_NAME: 'hook.name',
    FASTIFY_TYPE: 'fastify.type',
    HOOK_CALLBACK_NAME: 'hook.callback.name',
    ROOT: 'fastify.root'
};
const HOOK_TYPES = {
    ROUTE: 'route-hook',
    INSTANCE: 'hook',
    HANDLER: 'request-handler'
};
const ANONYMOUS_FUNCTION_NAME = 'anonymous';
// Symbols
const kInstrumentation = Symbol('fastify otel instance');
const kRequestSpan = Symbol('fastify otel request spans');
const kRequestContext = Symbol('fastify otel request context');
const kAddHookOriginal = Symbol('fastify otel addhook original');
const kSetNotFoundOriginal = Symbol('fastify otel setnotfound original');
const kIgnorePaths = Symbol('fastify otel ignore path');
const kRecordExceptions = Symbol('fastify otel record exceptions');
class FastifyOtelInstrumentation extends InstrumentationBase {
    logger = null;
    _requestHook = null;
    _lifecycleHook = null;
    constructor(config){
        super(PACKAGE_NAME, PACKAGE_VERSION, config);
        this.logger = diag.createComponentLogger({
            namespace: PACKAGE_NAME
        });
        this[kIgnorePaths] = null;
        this[kRecordExceptions] = true;
        if (config?.recordExceptions != null) {
            if (typeof config.recordExceptions !== 'boolean') {
                throw new TypeError('recordExceptions must be a boolean');
            }
            this[kRecordExceptions] = config.recordExceptions;
        }
        if (typeof config?.requestHook === 'function') {
            this._requestHook = config.requestHook;
        }
        if (typeof config?.lifecycleHook === 'function') {
            this._lifecycleHook = config.lifecycleHook;
        }
        if (config?.ignorePaths != null || process.env.OTEL_FASTIFY_IGNORE_PATHS != null) {
            const ignorePaths = config?.ignorePaths ?? process.env.OTEL_FASTIFY_IGNORE_PATHS;
            if ((typeof ignorePaths !== 'string' || ignorePaths.length === 0) && typeof ignorePaths !== 'function') {
                throw new TypeError('ignorePaths must be a string or a function');
            }
            let globMatcher = null;
            this[kIgnorePaths] = (routeOptions)=>{
                if (typeof ignorePaths === 'function') {
                    return ignorePaths(routeOptions);
                } else {
                    // Using minimatch to match the path until path.matchesGlob is out of experimental
                    // path.matchesGlob uses minimatch internally
                    if (globMatcher == null) {
                        globMatcher = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/index.js [app-rsc] (ecmascript)").minimatch;
                    }
                    return globMatcher(routeOptions.url, ignorePaths);
                }
            };
        }
    }
    enable() {
        if (this._handleInitialization === undefined && this.getConfig().registerOnInitialization) {
            this._handleInitialization = (message)=>{
                // Cannot use `fastify.register(plugin)` because it is lazily executed and
                // thus requires user code to await fastify instance first.
                this.plugin()(message.fastify, undefined, ()=>{});
                // Add an empty plugin to keep `app.hasPlugin('@fastify/otel')` invariant
                const emptyPlugin = (_, __, done)=>{
                    done();
                };
                emptyPlugin[Symbol.for('skip-override')] = true;
                emptyPlugin[Symbol.for('fastify.display-name')] = '@fastify/otel';
                message.fastify.register(emptyPlugin);
            };
            dc.subscribe('fastify.initialization', this._handleInitialization);
        }
        return super.enable();
    }
    disable() {
        if (this._handleInitialization) {
            dc.unsubscribe('fastify.initialization', this._handleInitialization);
            this._handleInitialization = undefined;
        }
        return super.disable();
    }
    // We do not do patching in this instrumentation
    init() {
        return [];
    }
    plugin() {
        const instrumentation = this;
        FastifyInstrumentationPlugin[Symbol.for('skip-override')] = true;
        FastifyInstrumentationPlugin[Symbol.for('fastify.display-name')] = '@fastify/otel';
        FastifyInstrumentationPlugin[Symbol.for('plugin-meta')] = {
            fastify: SUPPORTED_VERSIONS,
            name: '@fastify/otel'
        };
        return FastifyInstrumentationPlugin;
        //TURBOPACK unreachable
        ;
        function FastifyInstrumentationPlugin(instance, opts, done) {
            instance.decorate(kInstrumentation, instrumentation);
            // addHook and notfoundHandler are essentially inherited from the prototype
            // what is important is to bound it to the right instance
            instance.decorate(kAddHookOriginal, instance.addHook);
            instance.decorate(kSetNotFoundOriginal, instance.setNotFoundHandler);
            instance.decorateRequest('opentelemetry', function openetelemetry() {
                const ctx = this[kRequestContext];
                const span = this[kRequestSpan];
                return {
                    enabled: this.routeOptions.config?.otel !== false,
                    span,
                    tracer: instrumentation.tracer,
                    context: ctx,
                    inject: (carrier, setter)=>{
                        return propagation.inject(ctx, carrier, setter);
                    },
                    extract: (carrier, getter)=>{
                        return propagation.extract(ctx, carrier, getter);
                    }
                };
            });
            instance.decorateRequest(kRequestSpan, null);
            instance.decorateRequest(kRequestContext, null);
            instance.addHook('onRoute', function otelWireRoute(routeOptions) {
                if (instrumentation[kIgnorePaths]?.(routeOptions) === true) {
                    instrumentation.logger.debug(`Ignoring route instrumentation ${routeOptions.method} ${routeOptions.url} because it matches the ignore path`);
                    return;
                }
                if (routeOptions.config?.otel === false) {
                    instrumentation.logger.debug(`Ignoring route instrumentation ${routeOptions.method} ${routeOptions.url} because it is disabled`);
                    return;
                }
                for (const hook of FASTIFY_HOOKS){
                    if (routeOptions[hook] != null) {
                        const handlerLike = routeOptions[hook];
                        if (typeof handlerLike === 'function') {
                            routeOptions[hook] = handlerWrapper(handlerLike, hook, {
                                [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - route -> ${hook}`,
                                [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.ROUTE,
                                [ATTR_HTTP_ROUTE]: routeOptions.url,
                                [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: handlerLike.name?.length > 0 ? handlerLike.name : ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ 
                            });
                        } else if (Array.isArray(handlerLike)) {
                            const wrappedHandlers = [];
                            for (const handler of handlerLike){
                                wrappedHandlers.push(handlerWrapper(handler, hook, {
                                    [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - route -> ${hook}`,
                                    [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.ROUTE,
                                    [ATTR_HTTP_ROUTE]: routeOptions.url,
                                    [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: handler.name?.length > 0 ? handler.name : ANONYMOUS_FUNCTION_NAME
                                }));
                            }
                            routeOptions[hook] = wrappedHandlers;
                        }
                    }
                }
                // We always want to add the onSend hook to the route to be executed last
                if (routeOptions.onSend != null) {
                    routeOptions.onSend = Array.isArray(routeOptions.onSend) ? [
                        ...routeOptions.onSend,
                        finalizeResponseSpanHook
                    ] : [
                        routeOptions.onSend,
                        finalizeResponseSpanHook
                    ];
                } else {
                    routeOptions.onSend = finalizeResponseSpanHook;
                }
                // We always want to add the onError hook to the route to be executed last
                if (routeOptions.onError != null) {
                    routeOptions.onError = Array.isArray(routeOptions.onError) ? [
                        ...routeOptions.onError,
                        recordErrorInSpanHook
                    ] : [
                        routeOptions.onError,
                        recordErrorInSpanHook
                    ];
                } else {
                    routeOptions.onError = recordErrorInSpanHook;
                }
                routeOptions.handler = handlerWrapper(routeOptions.handler, 'handler', {
                    [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - route-handler`,
                    [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.HANDLER,
                    [ATTR_HTTP_ROUTE]: routeOptions.url,
                    [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: routeOptions.handler.name.length > 0 ? routeOptions.handler.name : ANONYMOUS_FUNCTION_NAME
                });
            });
            instance.addHook('onRequest', function startRequestSpanHook(request, _reply, hookDone) {
                if (this[kInstrumentation].isEnabled() === false || request.routeOptions.config?.otel === false) {
                    return hookDone();
                }
                if (this[kInstrumentation][kIgnorePaths]?.({
                    url: request.url,
                    method: request.method
                }) === true) {
                    this[kInstrumentation].logger.debug(`Ignoring request ${request.method} ${request.url} because it matches the ignore path`);
                    return hookDone();
                }
                let ctx = context.active();
                if (trace.getSpan(ctx) == null) {
                    ctx = propagation.extract(ctx, request.headers);
                }
                const rpcMetadata = getRPCMetadata(ctx);
                if (request.routeOptions.url != null && rpcMetadata?.type === RPCType.HTTP) {
                    rpcMetadata.route = request.routeOptions.url;
                }
                const attributes = {
                    [ATTRIBUTE_NAMES.ROOT]: '@fastify/otel',
                    [ATTR_HTTP_REQUEST_METHOD]: request.method,
                    [ATTR_URL_PATH]: request.url
                };
                if (request.routeOptions.url != null) {
                    attributes[ATTR_HTTP_ROUTE] = request.routeOptions.url;
                }
                /** @type {import('@opentelemetry/api').Span} */ const span = this[kInstrumentation].tracer.startSpan('request', {
                    attributes
                }, ctx);
                try {
                    this[kInstrumentation]._requestHook?.(span, request);
                } catch (err) {
                    this[kInstrumentation].logger.error({
                        err
                    }, 'requestHook threw');
                }
                request[kRequestContext] = trace.setSpan(ctx, span);
                request[kRequestSpan] = span;
                context.with(request[kRequestContext], ()=>{
                    hookDone();
                });
            });
            // onResponse is the last hook to be executed, only added for 404 handlers
            instance.addHook('onResponse', function finalizeNotFoundSpanHook(request, reply, hookDone) {
                const span = request[kRequestSpan];
                if (span != null) {
                    span.setAttributes({
                        [ATTR_HTTP_RESPONSE_STATUS_CODE]: reply.statusCode
                    });
                    span.end();
                }
                request[kRequestSpan] = null;
                hookDone();
            });
            instance.addHook = addHookPatched;
            instance.setNotFoundHandler = setNotFoundHandlerPatched;
            done();
            function finalizeResponseSpanHook(request, reply, payload, hookDone) {
                /** @type {import('@opentelemetry/api').Span} */ const span = request[kRequestSpan];
                if (span != null) {
                    if (reply.statusCode >= 500) {
                        span.setStatus({
                            code: SpanStatusCode.ERROR
                        });
                    }
                    span.setAttributes({
                        [ATTR_HTTP_RESPONSE_STATUS_CODE]: reply.statusCode
                    });
                    span.end();
                }
                request[kRequestSpan] = null;
                hookDone(null, payload);
            }
            function recordErrorInSpanHook(request, reply, error, hookDone) {
                /** @type {Span} */ const span = request[kRequestSpan];
                if (span != null) {
                    span.setStatus({
                        code: SpanStatusCode.ERROR,
                        message: error.message
                    });
                    if (instrumentation[kRecordExceptions] !== false) {
                        span.recordException(error);
                    }
                }
                hookDone();
            }
            function addHookPatched(name, hook) {
                const addHookOriginal = this[kAddHookOriginal];
                if (FASTIFY_HOOKS.includes(name)) {
                    return addHookOriginal.call(this, name, handlerWrapper(hook, name, {
                        [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - ${name}`,
                        [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.INSTANCE,
                        [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: hook.name?.length > 0 ? hook.name : ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ 
                    }));
                } else {
                    return addHookOriginal.call(this, name, hook);
                }
            }
            function setNotFoundHandlerPatched(hooks, handler) {
                const setNotFoundHandlerOriginal = this[kSetNotFoundOriginal];
                if (typeof hooks === 'function') {
                    handler = handlerWrapper(hooks, 'notFoundHandler', {
                        [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - not-found-handler`,
                        [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.INSTANCE,
                        [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: hooks.name?.length > 0 ? hooks.name : ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ 
                    });
                    setNotFoundHandlerOriginal.call(this, handler);
                } else {
                    if (hooks.preValidation != null) {
                        hooks.preValidation = handlerWrapper(hooks.preValidation, 'notFoundHandler - preValidation', {
                            [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - not-found-handler - preValidation`,
                            [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.INSTANCE,
                            [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: hooks.preValidation.name?.length > 0 ? hooks.preValidation.name : ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ 
                        });
                    }
                    if (hooks.preHandler != null) {
                        hooks.preHandler = handlerWrapper(hooks.preHandler, 'notFoundHandler - preHandler', {
                            [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - not-found-handler - preHandler`,
                            [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.INSTANCE,
                            [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: hooks.preHandler.name?.length > 0 ? hooks.preHandler.name : ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ 
                        });
                    }
                    handler = handlerWrapper(handler, 'notFoundHandler', {
                        [ATTRIBUTE_NAMES.HOOK_NAME]: `${this.pluginName} - not-found-handler`,
                        [ATTRIBUTE_NAMES.FASTIFY_TYPE]: HOOK_TYPES.INSTANCE,
                        [ATTRIBUTE_NAMES.HOOK_CALLBACK_NAME]: handler.name?.length > 0 ? handler.name : ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ 
                    });
                    setNotFoundHandlerOriginal.call(this, hooks, handler);
                }
            }
            // regular handlers are (request, reply), @fastify/websocket handlers are (socket, request)
            function getRequestFromArgs(args) {
                for (const arg of args){
                    if (arg?.routeOptions && arg.url && arg.method) {
                        return arg;
                    }
                }
                return null;
            }
            function handlerWrapper(handler, hookName, spanAttributes = {}) {
                return function handlerWrapped(...args) {
                    /** @type {FastifyOtelInstrumentation} */ const instrumentation = this[kInstrumentation];
                    const request = getRequestFromArgs(args);
                    if (request === null) {
                        instrumentation.logger.debug(`Ignoring route instrumentation because ${hookName} was called without a Fastify request argument`);
                        return handler.call(this, ...args);
                    }
                    if (instrumentation.isEnabled() === false || request.routeOptions.config?.otel === false) {
                        instrumentation.logger.debug(`Ignoring route instrumentation ${request.routeOptions.method} ${request.routeOptions.url} because it is disabled`);
                        return handler.call(this, ...args);
                    }
                    if (instrumentation[kIgnorePaths]?.({
                        url: request.url,
                        method: request.method
                    }) === true) {
                        instrumentation.logger.debug(`Ignoring route instrumentation ${request.routeOptions.method} ${request.routeOptions.url} because it matches the ignore path`);
                        return handler.call(this, ...args);
                    }
                    /* c8 ignore next */ const ctx = request[kRequestContext] ?? context.active();
                    const handlerName = handler.name?.length > 0 ? handler.name : this.pluginName /* c8 ignore next */  ?? ANONYMOUS_FUNCTION_NAME /* c8 ignore next */ ;
                    const span = instrumentation.tracer.startSpan(`${hookName} - ${handlerName}`, {
                        attributes: spanAttributes
                    }, ctx);
                    if (instrumentation._lifecycleHook != null) {
                        try {
                            instrumentation._lifecycleHook(span, {
                                hookName,
                                request,
                                handler: handlerName
                            });
                        } catch (err) {
                            instrumentation.logger.error({
                                err
                            }, 'Execution of lifecycleHook failed');
                        }
                    }
                    return context.with(trace.setSpan(ctx, span), function() {
                        try {
                            const res = handler.call(this, ...args);
                            if (typeof res?.then === 'function') {
                                return res.then((result)=>{
                                    span.end();
                                    return result;
                                }, (error)=>{
                                    span.setStatus({
                                        code: SpanStatusCode.ERROR,
                                        message: error.message
                                    });
                                    if (instrumentation[kRecordExceptions] !== false) {
                                        span.recordException(error);
                                    }
                                    span.end();
                                    return Promise.reject(error);
                                });
                            }
                            span.end();
                            return res;
                        } catch (error) {
                            span.setStatus({
                                code: SpanStatusCode.ERROR,
                                message: error.message
                            });
                            if (instrumentation[kRecordExceptions] !== false) {
                                span.recordException(error);
                            }
                            span.end();
                            throw error;
                        }
                    }, this);
                };
            }
        }
    }
}
module.exports = FastifyOtelInstrumentation;
module.exports.FastifyOtelInstrumentation = FastifyOtelInstrumentation;
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/balanced-match/dist/commonjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.range = exports.balanced = void 0;
const balanced = (a, b, str)=>{
    const ma = a instanceof RegExp ? maybeMatch(a, str) : a;
    const mb = b instanceof RegExp ? maybeMatch(b, str) : b;
    const r = ma !== null && mb != null && (0, exports.range)(ma, mb, str);
    return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + ma.length, r[1]),
        post: str.slice(r[1] + mb.length)
    };
};
exports.balanced = balanced;
const maybeMatch = (reg, str)=>{
    const m = str.match(reg);
    return m ? m[0] : null;
};
const range = (a, b, str)=>{
    let begs, beg, left, right = undefined, result;
    let ai = str.indexOf(a);
    let bi = str.indexOf(b, ai + 1);
    let i = ai;
    if (ai >= 0 && bi > 0) {
        if (a === b) {
            return [
                ai,
                bi
            ];
        }
        begs = [];
        left = str.length;
        while(i >= 0 && !result){
            if (i === ai) {
                begs.push(i);
                ai = str.indexOf(a, i + 1);
            } else if (begs.length === 1) {
                const r = begs.pop();
                if (r !== undefined) result = [
                    r,
                    bi
                ];
            } else {
                beg = begs.pop();
                if (beg !== undefined && beg < left) {
                    left = beg;
                    right = bi;
                }
                bi = str.indexOf(b, i + 1);
            }
            i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length && right !== undefined) {
            result = [
                left,
                right
            ];
        }
    }
    return result;
};
exports.range = range; //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/brace-expansion/dist/commonjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EXPANSION_MAX = void 0;
exports.expand = expand;
const balanced_match_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/balanced-match/dist/commonjs/index.js [app-rsc] (ecmascript)");
const escSlash = '\0SLASH' + Math.random() + '\0';
const escOpen = '\0OPEN' + Math.random() + '\0';
const escClose = '\0CLOSE' + Math.random() + '\0';
const escComma = '\0COMMA' + Math.random() + '\0';
const escPeriod = '\0PERIOD' + Math.random() + '\0';
const escSlashPattern = new RegExp(escSlash, 'g');
const escOpenPattern = new RegExp(escOpen, 'g');
const escClosePattern = new RegExp(escClose, 'g');
const escCommaPattern = new RegExp(escComma, 'g');
const escPeriodPattern = new RegExp(escPeriod, 'g');
const slashPattern = /\\\\/g;
const openPattern = /\\{/g;
const closePattern = /\\}/g;
const commaPattern = /\\,/g;
const periodPattern = /\\\./g;
exports.EXPANSION_MAX = 100_000;
function numeric(str) {
    return !isNaN(str) ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
    return str.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str) {
    return str.replace(escSlashPattern, '\\').replace(escOpenPattern, '{').replace(escClosePattern, '}').replace(escCommaPattern, ',').replace(escPeriodPattern, '.');
}
/**
 * Basically just str.split(","), but handling cases
 * where we have nested braced sections, which should be
 * treated as individual members, like {a,{b,c},d}
 */ function parseCommaParts(str) {
    if (!str) {
        return [
            ''
        ];
    }
    const parts = [];
    const m = (0, balanced_match_1.balanced)('{', '}', str);
    if (!m) {
        return str.split(',');
    }
    const { pre, body, post } = m;
    const p = pre.split(',');
    p[p.length - 1] += '{' + body + '}';
    const postParts = parseCommaParts(post);
    if (post.length) {
        ;
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
}
function expand(str, options = {}) {
    if (!str) {
        return [];
    }
    const { max = exports.EXPANSION_MAX } = options;
    // I don't know why Bash 4.3 does this, but it does.
    // Anything starting with {} will have the first two bytes preserved
    // but *only* at the top level, so {},a}b will not expand to anything,
    // but a{},b}c will be expanded to [a}c,abc].
    // One could argue that this is a bug in Bash, but since the goal of
    // this module is to match Bash's rules, we escape a leading {}
    if (str.slice(0, 2) === '{}') {
        str = '\\{\\}' + str.slice(2);
    }
    return expand_(escapeBraces(str), max, true).map(unescapeBraces);
}
function embrace(str) {
    return '{' + str + '}';
}
function isPadded(el) {
    return /^-?0\d/.test(el);
}
function lte(i, y) {
    return i <= y;
}
function gte(i, y) {
    return i >= y;
}
function expand_(str, max, isTop) {
    /** @type {string[]} */ const expansions = [];
    const m = (0, balanced_match_1.balanced)('{', '}', str);
    if (!m) return [
        str
    ];
    // no need to expand pre, since it is guaranteed to be free of brace-sets
    const pre = m.pre;
    const post = m.post.length ? expand_(m.post, max, false) : [
        ''
    ];
    if (/\$$/.test(m.pre)) {
        for(let k = 0; k < post.length && k < max; k++){
            const expansion = pre + '{' + m.body + '}' + post[k];
            expansions.push(expansion);
        }
    } else {
        const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        const isSequence = isNumericSequence || isAlphaSequence;
        const isOptions = m.body.indexOf(',') >= 0;
        if (!isSequence && !isOptions) {
            // {a},b}
            if (m.post.match(/,(?!,).*\}/)) {
                str = m.pre + '{' + m.body + escClose + m.post;
                return expand_(str, max, true);
            }
            return [
                str
            ];
        }
        let n;
        if (isSequence) {
            n = m.body.split(/\.\./);
        } else {
            n = parseCommaParts(m.body);
            if (n.length === 1 && n[0] !== undefined) {
                // x{{a,b}}y ==> x{a}y x{b}y
                n = expand_(n[0], max, false).map(embrace);
                //XXX is this necessary? Can't seem to hit it in tests.
                /* c8 ignore start */ if (n.length === 1) {
                    return post.map((p)=>m.pre + n[0] + p);
                }
            /* c8 ignore stop */ }
        }
        // at this point, n is the parts, and we know it's not a comma set
        // with a single entry.
        let N;
        if (isSequence && n[0] !== undefined && n[1] !== undefined) {
            const x = numeric(n[0]);
            const y = numeric(n[1]);
            const width = Math.max(n[0].length, n[1].length);
            let incr = n.length === 3 && n[2] !== undefined ? Math.max(Math.abs(numeric(n[2])), 1) : 1;
            let test = lte;
            const reverse = y < x;
            if (reverse) {
                incr *= -1;
                test = gte;
            }
            const pad = n.some(isPadded);
            N = [];
            for(let i = x; test(i, y) && N.length < max; i += incr){
                let c;
                if (isAlphaSequence) {
                    c = String.fromCharCode(i);
                    if (c === '\\') {
                        c = '';
                    }
                } else {
                    c = String(i);
                    if (pad) {
                        const need = width - c.length;
                        if (need > 0) {
                            const z = new Array(need + 1).join('0');
                            if (i < 0) {
                                c = '-' + z + c.slice(1);
                            } else {
                                c = z + c;
                            }
                        }
                    }
                }
                N.push(c);
            }
        } else {
            N = [];
            for(let j = 0; j < n.length; j++){
                N.push.apply(N, expand_(n[j], max, false));
            }
        }
        for(let j = 0; j < N.length; j++){
            for(let k = 0; k < post.length && expansions.length < max; k++){
                const expansion = pre + N[j] + post[k];
                if (!isTop || isSequence || expansion) {
                    expansions.push(expansion);
                }
            }
        }
    }
    return expansions;
} //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/assert-valid-pattern.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertValidPattern = void 0;
const MAX_PATTERN_LENGTH = 1024 * 64;
const assertValidPattern = (pattern)=>{
    if (typeof pattern !== 'string') {
        throw new TypeError('invalid pattern');
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError('pattern is too long');
    }
};
exports.assertValidPattern = assertValidPattern; //# sourceMappingURL=assert-valid-pattern.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/brace-expressions.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// translate the various posix character classes into unicode properties
// this works across all unicode locales
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseClass = void 0;
// { <posix class>: [<translation>, /u flag required, negated]
const posixClasses = {
    '[:alnum:]': [
        '\\p{L}\\p{Nl}\\p{Nd}',
        true
    ],
    '[:alpha:]': [
        '\\p{L}\\p{Nl}',
        true
    ],
    '[:ascii:]': [
        '\\x' + '00-\\x' + '7f',
        false
    ],
    '[:blank:]': [
        '\\p{Zs}\\t',
        true
    ],
    '[:cntrl:]': [
        '\\p{Cc}',
        true
    ],
    '[:digit:]': [
        '\\p{Nd}',
        true
    ],
    '[:graph:]': [
        '\\p{Z}\\p{C}',
        true,
        true
    ],
    '[:lower:]': [
        '\\p{Ll}',
        true
    ],
    '[:print:]': [
        '\\p{C}',
        true
    ],
    '[:punct:]': [
        '\\p{P}',
        true
    ],
    '[:space:]': [
        '\\p{Z}\\t\\r\\n\\v\\f',
        true
    ],
    '[:upper:]': [
        '\\p{Lu}',
        true
    ],
    '[:word:]': [
        '\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}',
        true
    ],
    '[:xdigit:]': [
        'A-Fa-f0-9',
        false
    ]
};
// only need to escape a few things inside of brace expressions
// escapes: [ \ ] -
const braceEscape = (s)=>s.replace(/[[\]\\-]/g, '\\$&');
// escape all regexp magic characters
const regexpEscape = (s)=>s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// everything has already been escaped, we just have to join
const rangesToString = (ranges)=>ranges.join('');
// takes a glob string at a posix brace expression, and returns
// an equivalent regular expression source, and boolean indicating
// whether the /u flag needs to be applied, and the number of chars
// consumed to parse the character class.
// This also removes out of order ranges, and returns ($.) if the
// entire class just no good.
const parseClass = (glob, position)=>{
    const pos = position;
    /* c8 ignore start */ if (glob.charAt(pos) !== '[') {
        throw new Error('not in a brace expression');
    }
    /* c8 ignore stop */ const ranges = [];
    const negs = [];
    let i = pos + 1;
    let sawStart = false;
    let uflag = false;
    let escaping = false;
    let negate = false;
    let endPos = pos;
    let rangeStart = '';
    WHILE: while(i < glob.length){
        const c = glob.charAt(i);
        if ((c === '!' || c === '^') && i === pos + 1) {
            negate = true;
            i++;
            continue;
        }
        if (c === ']' && sawStart && !escaping) {
            endPos = i + 1;
            break;
        }
        sawStart = true;
        if (c === '\\') {
            if (!escaping) {
                escaping = true;
                i++;
                continue;
            }
        // escaped \ char, fall through and treat like normal char
        }
        if (c === '[' && !escaping) {
            // either a posix class, a collation equivalent, or just a [
            for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)){
                if (glob.startsWith(cls, i)) {
                    // invalid, [a-[] is fine, but not [a-[:alpha]]
                    if (rangeStart) {
                        return [
                            '$.',
                            false,
                            glob.length - pos,
                            true
                        ];
                    }
                    i += cls.length;
                    if (neg) negs.push(unip);
                    else ranges.push(unip);
                    uflag = uflag || u;
                    continue WHILE;
                }
            }
        }
        // now it's just a normal character, effectively
        escaping = false;
        if (rangeStart) {
            // throw this range away if it's not valid, but others
            // can still match.
            if (c > rangeStart) {
                ranges.push(braceEscape(rangeStart) + '-' + braceEscape(c));
            } else if (c === rangeStart) {
                ranges.push(braceEscape(c));
            }
            rangeStart = '';
            i++;
            continue;
        }
        // now might be the start of a range.
        // can be either c-d or c-] or c<more...>] or c] at this point
        if (glob.startsWith('-]', i + 1)) {
            ranges.push(braceEscape(c + '-'));
            i += 2;
            continue;
        }
        if (glob.startsWith('-', i + 1)) {
            rangeStart = c;
            i += 2;
            continue;
        }
        // not the start of a range, just a single character
        ranges.push(braceEscape(c));
        i++;
    }
    if (endPos < i) {
        // didn't see the end of the class, not a valid class,
        // but might still be valid as a literal match.
        return [
            '',
            false,
            0,
            false
        ];
    }
    // if we got no ranges and no negates, then we have a range that
    // cannot possibly match anything, and that poisons the whole glob
    if (!ranges.length && !negs.length) {
        return [
            '$.',
            false,
            glob.length - pos,
            true
        ];
    }
    // if we got one positive range, and it's a single character, then that's
    // not actually a magic pattern, it's just that one literal character.
    // we should not treat that as "magic", we should just return the literal
    // character. [_] is a perfectly valid way to escape glob magic chars.
    if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
        const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
        return [
            regexpEscape(r),
            false,
            endPos - pos,
            false
        ];
    }
    const sranges = '[' + (negate ? '^' : '') + rangesToString(ranges) + ']';
    const snegs = '[' + (negate ? '' : '^') + rangesToString(negs) + ']';
    const comb = ranges.length && negs.length ? '(' + sranges + '|' + snegs + ')' : ranges.length ? sranges : snegs;
    return [
        comb,
        uflag,
        endPos - pos,
        true
    ];
};
exports.parseClass = parseClass; //# sourceMappingURL=brace-expressions.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/unescape.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unescape = void 0;
/**
 * Un-escape a string that has been escaped with {@link escape}.
 *
 * If the {@link MinimatchOptions.windowsPathsNoEscape} option is used, then
 * square-bracket escapes are removed, but not backslash escapes.
 *
 * For example, it will turn the string `'[*]'` into `*`, but it will not
 * turn `'\\*'` into `'*'`, because `\` is a path separator in
 * `windowsPathsNoEscape` mode.
 *
 * When `windowsPathsNoEscape` is not set, then both square-bracket escapes and
 * backslash escapes are removed.
 *
 * Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot be escaped
 * or unescaped.
 *
 * When `magicalBraces` is not set, escapes of braces (`{` and `}`) will not be
 * unescaped.
 */ const unescape = (s, { windowsPathsNoEscape = false, magicalBraces = true } = {})=>{
    if (magicalBraces) {
        return windowsPathsNoEscape ? s.replace(/\[([^/\\])\]/g, '$1') : s.replace(/((?!\\).|^)\[([^/\\])\]/g, '$1$2').replace(/\\([^/])/g, '$1');
    }
    return windowsPathsNoEscape ? s.replace(/\[([^/\\{}])\]/g, '$1') : s.replace(/((?!\\).|^)\[([^/\\{}])\]/g, '$1$2').replace(/\\([^/{}])/g, '$1');
};
exports.unescape = unescape; //# sourceMappingURL=unescape.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/ast.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// parse a single path portion
var _a;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AST = void 0;
const brace_expressions_js_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/brace-expressions.js [app-rsc] (ecmascript)");
const unescape_js_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/unescape.js [app-rsc] (ecmascript)");
const types = new Set([
    '!',
    '?',
    '+',
    '*',
    '@'
]);
const isExtglobType = (c)=>types.has(c);
const isExtglobAST = (c)=>isExtglobType(c.type);
// Map of which extglob types can adopt the children of a nested extglob
//
// anything but ! can adopt a matching type:
// +(a|+(b|c)|d) => +(a|b|c|d)
// *(a|*(b|c)|d) => *(a|b|c|d)
// @(a|@(b|c)|d) => @(a|b|c|d)
// ?(a|?(b|c)|d) => ?(a|b|c|d)
//
// * can adopt anything, because 0 or repetition is allowed
// *(a|?(b|c)|d) => *(a|b|c|d)
// *(a|+(b|c)|d) => *(a|b|c|d)
// *(a|@(b|c)|d) => *(a|b|c|d)
//
// + can adopt @, because 1 or repetition is allowed
// +(a|@(b|c)|d) => +(a|b|c|d)
//
// + and @ CANNOT adopt *, because 0 would be allowed
// +(a|*(b|c)|d) => would match "", on *(b|c)
// @(a|*(b|c)|d) => would match "", on *(b|c)
//
// + and @ CANNOT adopt ?, because 0 would be allowed
// +(a|?(b|c)|d) => would match "", on ?(b|c)
// @(a|?(b|c)|d) => would match "", on ?(b|c)
//
// ? can adopt @, because 0 or 1 is allowed
// ?(a|@(b|c)|d) => ?(a|b|c|d)
//
// ? and @ CANNOT adopt * or +, because >1 would be allowed
// ?(a|*(b|c)|d) => would match bbb on *(b|c)
// @(a|*(b|c)|d) => would match bbb on *(b|c)
// ?(a|+(b|c)|d) => would match bbb on +(b|c)
// @(a|+(b|c)|d) => would match bbb on +(b|c)
//
// ! CANNOT adopt ! (nothing else can either)
// !(a|!(b|c)|d) => !(a|b|c|d) would fail to match on b (not not b|c)
//
// ! can adopt @
// !(a|@(b|c)|d) => !(a|b|c|d)
//
// ! CANNOT adopt *
// !(a|*(b|c)|d) => !(a|b|c|d) would match on bbb, not allowed
//
// ! CANNOT adopt +
// !(a|+(b|c)|d) => !(a|b|c|d) would match on bbb, not allowed
//
// ! CANNOT adopt ?
// x!(a|?(b|c)|d) => x!(a|b|c|d) would fail to match "x"
const adoptionMap = new Map([
    [
        '!',
        [
            '@'
        ]
    ],
    [
        '?',
        [
            '?',
            '@'
        ]
    ],
    [
        '@',
        [
            '@'
        ]
    ],
    [
        '*',
        [
            '*',
            '+',
            '?',
            '@'
        ]
    ],
    [
        '+',
        [
            '+',
            '@'
        ]
    ]
]);
// nested extglobs that can be adopted in, but with the addition of
// a blank '' element.
const adoptionWithSpaceMap = new Map([
    [
        '!',
        [
            '?'
        ]
    ],
    [
        '@',
        [
            '?'
        ]
    ],
    [
        '+',
        [
            '?',
            '*'
        ]
    ]
]);
// union of the previous two maps
const adoptionAnyMap = new Map([
    [
        '!',
        [
            '?',
            '@'
        ]
    ],
    [
        '?',
        [
            '?',
            '@'
        ]
    ],
    [
        '@',
        [
            '?',
            '@'
        ]
    ],
    [
        '*',
        [
            '*',
            '+',
            '?',
            '@'
        ]
    ],
    [
        '+',
        [
            '+',
            '@',
            '?',
            '*'
        ]
    ]
]);
// Extglobs that can take over their parent if they are the only child
// the key is parent, value maps child to resulting extglob parent type
// '@' is omitted because it's a special case. An `@` extglob with a single
// member can always be usurped by that subpattern.
const usurpMap = new Map([
    [
        '!',
        new Map([
            [
                '!',
                '@'
            ]
        ])
    ],
    [
        '?',
        new Map([
            [
                '*',
                '*'
            ],
            [
                '+',
                '*'
            ]
        ])
    ],
    [
        '@',
        new Map([
            [
                '!',
                '!'
            ],
            [
                '?',
                '?'
            ],
            [
                '@',
                '@'
            ],
            [
                '*',
                '*'
            ],
            [
                '+',
                '+'
            ]
        ])
    ],
    [
        '+',
        new Map([
            [
                '?',
                '*'
            ],
            [
                '*',
                '*'
            ]
        ])
    ]
]);
// Patterns that get prepended to bind to the start of either the
// entire string, or just a single path portion, to prevent dots
// and/or traversal patterns, when needed.
// Exts don't need the ^ or / bit, because the root binds that already.
const startNoTraversal = '(?!(?:^|/)\\.\\.?(?:$|/))';
const startNoDot = '(?!\\.)';
// characters that indicate a start of pattern needs the "no dots" bit,
// because a dot *might* be matched. ( is not in the list, because in
// the case of a child extglob, it will handle the prevention itself.
const addPatternStart = new Set([
    '[',
    '.'
]);
// cases where traversal is A-OK, no dot prevention needed
const justDots = new Set([
    '..',
    '.'
]);
const reSpecials = new Set('().*{}+?[]^$\\!');
const regExpEscape = (s)=>s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// any single thing other than /
const qmark = '[^/]';
// * => any number of characters
const star = qmark + '*?';
// use + when we need to ensure that *something* matches, because the * is
// the only thing in the path portion.
const starNoEmpty = qmark + '+?';
// remove the \ chars that we added if we end up doing a nonmagic compare
// const deslash = (s: string) => s.replace(/\\(.)/g, '$1')
let ID = 0;
class AST {
    type;
    #root;
    #hasMagic;
    #uflag = false;
    #parts = [];
    #parent;
    #parentIndex;
    #negs;
    #filledNegs = false;
    #options;
    #toString;
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    #emptyExt = false;
    id = ++ID;
    get depth() {
        return (this.#parent?.depth ?? -1) + 1;
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return {
            '@@type': 'AST',
            id: this.id,
            type: this.type,
            root: this.#root.id,
            parent: this.#parent?.id,
            depth: this.depth,
            partsLength: this.#parts.length,
            parts: this.#parts
        };
    }
    constructor(type, parent, options = {}){
        this.type = type;
        // extglobs are inherently magical
        if (type) this.#hasMagic = true;
        this.#parent = parent;
        this.#root = this.#parent ? this.#parent.#root : this;
        this.#options = this.#root === this ? options : this.#root.#options;
        this.#negs = this.#root === this ? [] : this.#root.#negs;
        if (type === '!' && !this.#root.#filledNegs) this.#negs.push(this);
        this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
    }
    get hasMagic() {
        /* c8 ignore start */ if (this.#hasMagic !== undefined) return this.#hasMagic;
        /* c8 ignore stop */ for (const p of this.#parts){
            if (typeof p === 'string') continue;
            if (p.type || p.hasMagic) return this.#hasMagic = true;
        }
        // note: will be undefined until we generate the regexp src and find out
        return this.#hasMagic;
    }
    // reconstructs the pattern
    toString() {
        return this.#toString !== undefined ? this.#toString : !this.type ? this.#toString = this.#parts.map((p)=>String(p)).join('') : this.#toString = this.type + '(' + this.#parts.map((p)=>String(p)).join('|') + ')';
    }
    #fillNegs() {
        /* c8 ignore start */ if (this !== this.#root) throw new Error('should only call on root');
        if (this.#filledNegs) return this;
        /* c8 ignore stop */ // call toString() once to fill this out
        this.toString();
        this.#filledNegs = true;
        let n;
        while(n = this.#negs.pop()){
            if (n.type !== '!') continue;
            // walk up the tree, appending everthing that comes AFTER parentIndex
            let p = n;
            let pp = p.#parent;
            while(pp){
                for(let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++){
                    for (const part of n.#parts){
                        /* c8 ignore start */ if (typeof part === 'string') {
                            throw new Error('string part in extglob AST??');
                        }
                        /* c8 ignore stop */ part.copyIn(pp.#parts[i]);
                    }
                }
                p = pp;
                pp = p.#parent;
            }
        }
        return this;
    }
    push(...parts) {
        for (const p of parts){
            if (p === '') continue;
            /* c8 ignore start */ if (typeof p !== 'string' && !(p instanceof _a && p.#parent === this)) {
                throw new Error('invalid part: ' + p);
            }
            /* c8 ignore stop */ this.#parts.push(p);
        }
    }
    toJSON() {
        const ret = this.type === null ? this.#parts.slice().map((p)=>typeof p === 'string' ? p : p.toJSON()) : [
            this.type,
            ...this.#parts.map((p)=>p.toJSON())
        ];
        if (this.isStart() && !this.type) ret.unshift([]);
        if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && this.#parent?.type === '!')) {
            ret.push({});
        }
        return ret;
    }
    isStart() {
        if (this.#root === this) return true;
        // if (this.type) return !!this.#parent?.isStart()
        if (!this.#parent?.isStart()) return false;
        if (this.#parentIndex === 0) return true;
        // if everything AHEAD of this is a negation, then it's still the "start"
        const p = this.#parent;
        for(let i = 0; i < this.#parentIndex; i++){
            const pp = p.#parts[i];
            if (!(pp instanceof _a && pp.type === '!')) {
                return false;
            }
        }
        return true;
    }
    isEnd() {
        if (this.#root === this) return true;
        if (this.#parent?.type === '!') return true;
        if (!this.#parent?.isEnd()) return false;
        if (!this.type) return this.#parent?.isEnd();
        // if not root, it'll always have a parent
        /* c8 ignore start */ const pl = this.#parent ? this.#parent.#parts.length : 0;
        /* c8 ignore stop */ return this.#parentIndex === pl - 1;
    }
    copyIn(part) {
        if (typeof part === 'string') this.push(part);
        else this.push(part.clone(this));
    }
    clone(parent) {
        const c = new _a(this.type, parent);
        for (const p of this.#parts){
            c.copyIn(p);
        }
        return c;
    }
    static #parseAST(str, ast, pos, opt, extDepth) {
        const maxDepth = opt.maxExtglobRecursion ?? 2;
        let escaping = false;
        let inBrace = false;
        let braceStart = -1;
        let braceNeg = false;
        if (ast.type === null) {
            // outside of a extglob, append until we find a start
            let i = pos;
            let acc = '';
            while(i < str.length){
                const c = str.charAt(i++);
                // still accumulate escapes at this point, but we do ignore
                // starts that are escaped
                if (escaping || c === '\\') {
                    escaping = !escaping;
                    acc += c;
                    continue;
                }
                if (inBrace) {
                    if (i === braceStart + 1) {
                        if (c === '^' || c === '!') {
                            braceNeg = true;
                        }
                    } else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                        inBrace = false;
                    }
                    acc += c;
                    continue;
                } else if (c === '[') {
                    inBrace = true;
                    braceStart = i;
                    braceNeg = false;
                    acc += c;
                    continue;
                }
                // we don't have to check for adoption here, because that's
                // done at the other recursion point.
                const doRecurse = !opt.noext && isExtglobType(c) && str.charAt(i) === '(' && extDepth <= maxDepth;
                if (doRecurse) {
                    ast.push(acc);
                    acc = '';
                    const ext = new _a(c, ast);
                    i = _a.#parseAST(str, ext, i, opt, extDepth + 1);
                    ast.push(ext);
                    continue;
                }
                acc += c;
            }
            ast.push(acc);
            return i;
        }
        // some kind of extglob, pos is at the (
        // find the next | or )
        let i = pos + 1;
        let part = new _a(null, ast);
        const parts = [];
        let acc = '';
        while(i < str.length){
            const c = str.charAt(i++);
            // still accumulate escapes at this point, but we do ignore
            // starts that are escaped
            if (escaping || c === '\\') {
                escaping = !escaping;
                acc += c;
                continue;
            }
            if (inBrace) {
                if (i === braceStart + 1) {
                    if (c === '^' || c === '!') {
                        braceNeg = true;
                    }
                } else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                    inBrace = false;
                }
                acc += c;
                continue;
            } else if (c === '[') {
                inBrace = true;
                braceStart = i;
                braceNeg = false;
                acc += c;
                continue;
            }
            const doRecurse = !opt.noext && isExtglobType(c) && str.charAt(i) === '(' && /* c8 ignore start - the maxDepth is sufficient here */ (extDepth <= maxDepth || ast && ast.#canAdoptType(c));
            /* c8 ignore stop */ if (doRecurse) {
                const depthAdd = ast && ast.#canAdoptType(c) ? 0 : 1;
                part.push(acc);
                acc = '';
                const ext = new _a(c, part);
                part.push(ext);
                i = _a.#parseAST(str, ext, i, opt, extDepth + depthAdd);
                continue;
            }
            if (c === '|') {
                part.push(acc);
                acc = '';
                parts.push(part);
                part = new _a(null, ast);
                continue;
            }
            if (c === ')') {
                if (acc === '' && ast.#parts.length === 0) {
                    ast.#emptyExt = true;
                }
                part.push(acc);
                acc = '';
                ast.push(...parts, part);
                return i;
            }
            acc += c;
        }
        // unfinished extglob
        // if we got here, it was a malformed extglob! not an extglob, but
        // maybe something else in there.
        ast.type = null;
        ast.#hasMagic = undefined;
        ast.#parts = [
            str.substring(pos - 1)
        ];
        return i;
    }
    #canAdoptWithSpace(child) {
        return this.#canAdopt(child, adoptionWithSpaceMap);
    }
    #canAdopt(child, map = adoptionMap) {
        if (!child || typeof child !== 'object' || child.type !== null || child.#parts.length !== 1 || this.type === null) {
            return false;
        }
        const gc = child.#parts[0];
        if (!gc || typeof gc !== 'object' || gc.type === null) {
            return false;
        }
        return this.#canAdoptType(gc.type, map);
    }
    #canAdoptType(c, map = adoptionAnyMap) {
        return !!map.get(this.type)?.includes(c);
    }
    #adoptWithSpace(child, index) {
        const gc = child.#parts[0];
        const blank = new _a(null, gc, this.options);
        blank.#parts.push('');
        gc.push(blank);
        this.#adopt(child, index);
    }
    #adopt(child, index) {
        const gc = child.#parts[0];
        this.#parts.splice(index, 1, ...gc.#parts);
        for (const p of gc.#parts){
            if (typeof p === 'object') p.#parent = this;
        }
        this.#toString = undefined;
    }
    #canUsurpType(c) {
        const m = usurpMap.get(this.type);
        return !!m?.has(c);
    }
    #canUsurp(child) {
        if (!child || typeof child !== 'object' || child.type !== null || child.#parts.length !== 1 || this.type === null || this.#parts.length !== 1) {
            return false;
        }
        const gc = child.#parts[0];
        if (!gc || typeof gc !== 'object' || gc.type === null) {
            return false;
        }
        return this.#canUsurpType(gc.type);
    }
    #usurp(child) {
        const m = usurpMap.get(this.type);
        const gc = child.#parts[0];
        const nt = m?.get(gc.type);
        /* c8 ignore start - impossible */ if (!nt) return false;
        /* c8 ignore stop */ this.#parts = gc.#parts;
        for (const p of this.#parts){
            if (typeof p === 'object') {
                p.#parent = this;
            }
        }
        this.type = nt;
        this.#toString = undefined;
        this.#emptyExt = false;
    }
    static fromGlob(pattern, options = {}) {
        const ast = new _a(null, undefined, options);
        _a.#parseAST(pattern, ast, 0, options, 0);
        return ast;
    }
    // returns the regular expression if there's magic, or the unescaped
    // string if not.
    toMMPattern() {
        // should only be called on root
        /* c8 ignore start */ if (this !== this.#root) return this.#root.toMMPattern();
        /* c8 ignore stop */ const glob = this.toString();
        const [re, body, hasMagic, uflag] = this.toRegExpSource();
        // if we're in nocase mode, and not nocaseMagicOnly, then we do
        // still need a regular expression if we have to case-insensitively
        // match capital/lowercase characters.
        const anyMagic = hasMagic || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
        if (!anyMagic) {
            return body;
        }
        const flags = (this.#options.nocase ? 'i' : '') + (uflag ? 'u' : '');
        return Object.assign(new RegExp(`^${re}$`, flags), {
            _src: re,
            _glob: glob
        });
    }
    get options() {
        return this.#options;
    }
    // returns the string match, the regexp source, whether there's magic
    // in the regexp (so a regular expression is required) and whether or
    // not the uflag is needed for the regular expression (for posix classes)
    // TODO: instead of injecting the start/end at this point, just return
    // the BODY of the regexp, along with the start/end portions suitable
    // for binding the start/end in either a joined full-path makeRe context
    // (where we bind to (^|/), or a standalone matchPart context (where
    // we bind to ^, and not /).  Otherwise slashes get duped!
    //
    // In part-matching mode, the start is:
    // - if not isStart: nothing
    // - if traversal possible, but not allowed: ^(?!\.\.?$)
    // - if dots allowed or not possible: ^
    // - if dots possible and not allowed: ^(?!\.)
    // end is:
    // - if not isEnd(): nothing
    // - else: $
    //
    // In full-path matching mode, we put the slash at the START of the
    // pattern, so start is:
    // - if first pattern: same as part-matching mode
    // - if not isStart(): nothing
    // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
    // - if dots allowed or not possible: /
    // - if dots possible and not allowed: /(?!\.)
    // end is:
    // - if last pattern, same as part-matching mode
    // - else nothing
    //
    // Always put the (?:$|/) on negated tails, though, because that has to be
    // there to bind the end of the negated pattern portion, and it's easier to
    // just stick it in now rather than try to inject it later in the middle of
    // the pattern.
    //
    // We can just always return the same end, and leave it up to the caller
    // to know whether it's going to be used joined or in parts.
    // And, if the start is adjusted slightly, can do the same there:
    // - if not isStart: nothing
    // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
    // - if dots allowed or not possible: (?:/|^)
    // - if dots possible and not allowed: (?:/|^)(?!\.)
    //
    // But it's better to have a simpler binding without a conditional, for
    // performance, so probably better to return both start options.
    //
    // Then the caller just ignores the end if it's not the first pattern,
    // and the start always gets applied.
    //
    // But that's always going to be $ if it's the ending pattern, or nothing,
    // so the caller can just attach $ at the end of the pattern when building.
    //
    // So the todo is:
    // - better detect what kind of start is needed
    // - return both flavors of starting pattern
    // - attach $ at the end of the pattern when creating the actual RegExp
    //
    // Ah, but wait, no, that all only applies to the root when the first pattern
    // is not an extglob. If the first pattern IS an extglob, then we need all
    // that dot prevention biz to live in the extglob portions, because eg
    // +(*|.x*) can match .xy but not .yx.
    //
    // So, return the two flavors if it's #root and the first child is not an
    // AST, otherwise leave it to the child AST to handle it, and there,
    // use the (?:^|/) style of start binding.
    //
    // Even simplified further:
    // - Since the start for a join is eg /(?!\.) and the start for a part
    // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
    // or start or whatever) and prepend ^ or / at the Regexp construction.
    toRegExpSource(allowDot) {
        const dot = allowDot ?? !!this.#options.dot;
        if (this.#root === this) {
            this.#flatten();
            this.#fillNegs();
        }
        if (!isExtglobAST(this)) {
            const noEmpty = this.isStart() && this.isEnd() && !this.#parts.some((s)=>typeof s !== 'string');
            const src = this.#parts.map((p)=>{
                const [re, _, hasMagic, uflag] = typeof p === 'string' ? _a.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
                this.#hasMagic = this.#hasMagic || hasMagic;
                this.#uflag = this.#uflag || uflag;
                return re;
            }).join('');
            let start = '';
            if (this.isStart()) {
                if (typeof this.#parts[0] === 'string') {
                    // this is the string that will match the start of the pattern,
                    // so we need to protect against dots and such.
                    // '.' and '..' cannot match unless the pattern is that exactly,
                    // even if it starts with . or dot:true is set.
                    const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
                    if (!dotTravAllowed) {
                        const aps = addPatternStart;
                        // check if we have a possibility of matching . or ..,
                        // and prevent that.
                        const needNoTrav = // dots are allowed, and the pattern starts with [ or .
                        dot && aps.has(src.charAt(0)) || src.startsWith('\\.') && aps.has(src.charAt(2)) || src.startsWith('\\.\\.') && aps.has(src.charAt(4));
                        // no need to prevent dots if it can't match a dot, or if a
                        // sub-pattern will be preventing it anyway.
                        const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
                        start = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : '';
                    }
                }
            }
            // append the "end of path portion" pattern to negation tails
            let end = '';
            if (this.isEnd() && this.#root.#filledNegs && this.#parent?.type === '!') {
                end = '(?:$|\\/)';
            }
            const final = start + src + end;
            return [
                final,
                (0, unescape_js_1.unescape)(src),
                this.#hasMagic = !!this.#hasMagic,
                this.#uflag
            ];
        }
        // We need to calculate the body *twice* if it's a repeat pattern
        // at the start, once in nodot mode, then again in dot mode, so a
        // pattern like *(?) can match 'x.y'
        const repeated = this.type === '*' || this.type === '+';
        // some kind of extglob
        const start = this.type === '!' ? '(?:(?!(?:' : '(?:';
        let body = this.#partsToRegExp(dot);
        if (this.isStart() && this.isEnd() && !body && this.type !== '!') {
            // invalid extglob, has to at least be *something* present, if it's
            // the entire path portion.
            const s = this.toString();
            const me = this;
            me.#parts = [
                s
            ];
            me.type = null;
            me.#hasMagic = undefined;
            return [
                s,
                (0, unescape_js_1.unescape)(this.toString()),
                false,
                false
            ];
        }
        let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? '' : this.#partsToRegExp(true);
        if (bodyDotAllowed === body) {
            bodyDotAllowed = '';
        }
        if (bodyDotAllowed) {
            body = `(?:${body})(?:${bodyDotAllowed})*?`;
        }
        // an empty !() is exactly equivalent to a starNoEmpty
        let final = '';
        if (this.type === '!' && this.#emptyExt) {
            final = (this.isStart() && !dot ? startNoDot : '') + starNoEmpty;
        } else {
            const close = this.type === '!' ? // !() must match something,but !(x) can match ''
            '))' + (this.isStart() && !dot && !allowDot ? startNoDot : '') + star + ')' : this.type === '@' ? ')' : this.type === '?' ? ')?' : this.type === '+' && bodyDotAllowed ? ')' : this.type === '*' && bodyDotAllowed ? `)?` : `)${this.type}`;
            final = start + body + close;
        }
        return [
            final,
            (0, unescape_js_1.unescape)(body),
            this.#hasMagic = !!this.#hasMagic,
            this.#uflag
        ];
    }
    #flatten() {
        if (!isExtglobAST(this)) {
            for (const p of this.#parts){
                if (typeof p === 'object') {
                    p.#flatten();
                }
            }
        } else {
            // do up to 10 passes to flatten as much as possible
            let iterations = 0;
            let done = false;
            do {
                done = true;
                for(let i = 0; i < this.#parts.length; i++){
                    const c = this.#parts[i];
                    if (typeof c === 'object') {
                        c.#flatten();
                        if (this.#canAdopt(c)) {
                            done = false;
                            this.#adopt(c, i);
                        } else if (this.#canAdoptWithSpace(c)) {
                            done = false;
                            this.#adoptWithSpace(c, i);
                        } else if (this.#canUsurp(c)) {
                            done = false;
                            this.#usurp(c);
                        }
                    }
                }
            }while (!done && ++iterations < 10)
        }
        this.#toString = undefined;
    }
    #partsToRegExp(dot) {
        return this.#parts.map((p)=>{
            // extglob ASTs should only contain parent ASTs
            /* c8 ignore start */ if (typeof p === 'string') {
                throw new Error('string type in extglob ast??');
            }
            /* c8 ignore stop */ // can ignore hasMagic, because extglobs are already always magic
            const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
            this.#uflag = this.#uflag || uflag;
            return re;
        }).filter((p)=>!(this.isStart() && this.isEnd()) || !!p).join('|');
    }
    static #parseGlob(glob, hasMagic, noEmpty = false) {
        let escaping = false;
        let re = '';
        let uflag = false;
        // multiple stars that aren't globstars coalesce into one *
        let inStar = false;
        for(let i = 0; i < glob.length; i++){
            const c = glob.charAt(i);
            if (escaping) {
                escaping = false;
                re += (reSpecials.has(c) ? '\\' : '') + c;
                continue;
            }
            if (c === '*') {
                if (inStar) continue;
                inStar = true;
                re += noEmpty && /^[*]+$/.test(glob) ? starNoEmpty : star;
                hasMagic = true;
                continue;
            } else {
                inStar = false;
            }
            if (c === '\\') {
                if (i === glob.length - 1) {
                    re += '\\\\';
                } else {
                    escaping = true;
                }
                continue;
            }
            if (c === '[') {
                const [src, needUflag, consumed, magic] = (0, brace_expressions_js_1.parseClass)(glob, i);
                if (consumed) {
                    re += src;
                    uflag = uflag || needUflag;
                    i += consumed - 1;
                    hasMagic = hasMagic || magic;
                    continue;
                }
            }
            if (c === '?') {
                re += qmark;
                hasMagic = true;
                continue;
            }
            re += regExpEscape(c);
        }
        return [
            re,
            (0, unescape_js_1.unescape)(glob),
            !!hasMagic,
            uflag
        ];
    }
}
exports.AST = AST;
_a = AST; //# sourceMappingURL=ast.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/escape.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.escape = void 0;
/**
 * Escape all magic characters in a glob pattern.
 *
 * If the {@link MinimatchOptions.windowsPathsNoEscape}
 * option is used, then characters are escaped by wrapping in `[]`, because
 * a magic character wrapped in a character class can only be satisfied by
 * that exact character.  In this mode, `\` is _not_ escaped, because it is
 * not interpreted as a magic character, but instead as a path separator.
 *
 * If the {@link MinimatchOptions.magicalBraces} option is used,
 * then braces (`{` and `}`) will be escaped.
 */ const escape = (s, { windowsPathsNoEscape = false, magicalBraces = false } = {})=>{
    // don't need to escape +@! because we escape the parens
    // that make those magic, and escaping ! as [!] isn't valid,
    // because [!]] is a valid glob class meaning not ']'.
    if (magicalBraces) {
        return windowsPathsNoEscape ? s.replace(/[?*()[\]{}]/g, '[$&]') : s.replace(/[?*()[\]\\{}]/g, '\\$&');
    }
    return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, '[$&]') : s.replace(/[?*()[\]\\]/g, '\\$&');
};
exports.escape = escape; //# sourceMappingURL=escape.js.map
}),
"[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unescape = exports.escape = exports.AST = exports.Minimatch = exports.match = exports.makeRe = exports.braceExpand = exports.defaults = exports.filter = exports.GLOBSTAR = exports.sep = exports.minimatch = void 0;
const brace_expansion_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/brace-expansion/dist/commonjs/index.js [app-rsc] (ecmascript)");
const assert_valid_pattern_js_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/assert-valid-pattern.js [app-rsc] (ecmascript)");
const ast_js_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/ast.js [app-rsc] (ecmascript)");
const escape_js_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/escape.js [app-rsc] (ecmascript)");
const unescape_js_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/unescape.js [app-rsc] (ecmascript)");
const minimatch = (p, pattern, options = {})=>{
    (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === '#') {
        return false;
    }
    return new Minimatch(pattern, options).match(p);
};
exports.minimatch = minimatch;
// Optimized checking for the most common glob patterns.
const starDotExtRE = /^\*+([^+@!?*[(]*)$/;
const starDotExtTest = (ext)=>(f)=>!f.startsWith('.') && f.endsWith(ext);
const starDotExtTestDot = (ext)=>(f)=>f.endsWith(ext);
const starDotExtTestNocase = (ext)=>{
    ext = ext.toLowerCase();
    return (f)=>!f.startsWith('.') && f.toLowerCase().endsWith(ext);
};
const starDotExtTestNocaseDot = (ext)=>{
    ext = ext.toLowerCase();
    return (f)=>f.toLowerCase().endsWith(ext);
};
const starDotStarRE = /^\*+\.\*+$/;
const starDotStarTest = (f)=>!f.startsWith('.') && f.includes('.');
const starDotStarTestDot = (f)=>f !== '.' && f !== '..' && f.includes('.');
const dotStarRE = /^\.\*+$/;
const dotStarTest = (f)=>f !== '.' && f !== '..' && f.startsWith('.');
const starRE = /^\*+$/;
const starTest = (f)=>f.length !== 0 && !f.startsWith('.');
const starTestDot = (f)=>f.length !== 0 && f !== '.' && f !== '..';
const qmarksRE = /^\?+([^+@!?*[(]*)?$/;
const qmarksTestNocase = ([$0, ext = ''])=>{
    const noext = qmarksTestNoExt([
        $0
    ]);
    if (!ext) return noext;
    ext = ext.toLowerCase();
    return (f)=>noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestNocaseDot = ([$0, ext = ''])=>{
    const noext = qmarksTestNoExtDot([
        $0
    ]);
    if (!ext) return noext;
    ext = ext.toLowerCase();
    return (f)=>noext(f) && f.toLowerCase().endsWith(ext);
};
const qmarksTestDot = ([$0, ext = ''])=>{
    const noext = qmarksTestNoExtDot([
        $0
    ]);
    return !ext ? noext : (f)=>noext(f) && f.endsWith(ext);
};
const qmarksTest = ([$0, ext = ''])=>{
    const noext = qmarksTestNoExt([
        $0
    ]);
    return !ext ? noext : (f)=>noext(f) && f.endsWith(ext);
};
const qmarksTestNoExt = ([$0])=>{
    const len = $0.length;
    return (f)=>f.length === len && !f.startsWith('.');
};
const qmarksTestNoExtDot = ([$0])=>{
    const len = $0.length;
    return (f)=>f.length === len && f !== '.' && f !== '..';
};
/* c8 ignore start */ const defaultPlatform = typeof process === 'object' && process ? typeof process.env === 'object' && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : 'posix';
const path = {
    win32: {
        sep: '\\'
    },
    posix: {
        sep: '/'
    }
};
/* c8 ignore stop */ exports.sep = defaultPlatform === 'win32' ? path.win32.sep : path.posix.sep;
exports.minimatch.sep = exports.sep;
exports.GLOBSTAR = Symbol('globstar **');
exports.minimatch.GLOBSTAR = exports.GLOBSTAR;
// any single thing other than /
// don't need to escape / when using new RegExp()
const qmark = '[^/]';
// * => any number of characters
const star = qmark + '*?';
// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
const twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
// not a ^ or / followed by a dot,
// followed by anything, any number of times.
const twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?';
const filter = (pattern, options = {})=>(p)=>(0, exports.minimatch)(p, pattern, options);
exports.filter = filter;
exports.minimatch.filter = exports.filter;
const ext = (a, b = {})=>Object.assign({}, a, b);
const defaults = (def)=>{
    if (!def || typeof def !== 'object' || !Object.keys(def).length) {
        return exports.minimatch;
    }
    const orig = exports.minimatch;
    const m = (p, pattern, options = {})=>orig(p, pattern, ext(def, options));
    return Object.assign(m, {
        Minimatch: class Minimatch extends orig.Minimatch {
            constructor(pattern, options = {}){
                super(pattern, ext(def, options));
            }
            static defaults(options) {
                return orig.defaults(ext(def, options)).Minimatch;
            }
        },
        AST: class AST extends orig.AST {
            /* c8 ignore start */ constructor(type, parent, options = {}){
                super(type, parent, ext(def, options));
            }
            /* c8 ignore stop */ static fromGlob(pattern, options = {}) {
                return orig.AST.fromGlob(pattern, ext(def, options));
            }
        },
        unescape: (s, options = {})=>orig.unescape(s, ext(def, options)),
        escape: (s, options = {})=>orig.escape(s, ext(def, options)),
        filter: (pattern, options = {})=>orig.filter(pattern, ext(def, options)),
        defaults: (options)=>orig.defaults(ext(def, options)),
        makeRe: (pattern, options = {})=>orig.makeRe(pattern, ext(def, options)),
        braceExpand: (pattern, options = {})=>orig.braceExpand(pattern, ext(def, options)),
        match: (list, pattern, options = {})=>orig.match(list, pattern, ext(def, options)),
        sep: orig.sep,
        GLOBSTAR: exports.GLOBSTAR
    });
};
exports.defaults = defaults;
exports.minimatch.defaults = exports.defaults;
// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
const braceExpand = (pattern, options = {})=>{
    (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
    // Thanks to Yeting Li <https://github.com/yetingli> for
    // improving this regexp to avoid a ReDOS vulnerability.
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        // shortcut. no need to expand.
        return [
            pattern
        ];
    }
    return (0, brace_expansion_1.expand)(pattern, {
        max: options.braceExpandMax
    });
};
exports.braceExpand = braceExpand;
exports.minimatch.braceExpand = exports.braceExpand;
// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
const makeRe = (pattern, options = {})=>new Minimatch(pattern, options).makeRe();
exports.makeRe = makeRe;
exports.minimatch.makeRe = exports.makeRe;
const match = (list, pattern, options = {})=>{
    const mm = new Minimatch(pattern, options);
    list = list.filter((f)=>mm.match(f));
    if (mm.options.nonull && !list.length) {
        list.push(pattern);
    }
    return list;
};
exports.match = match;
exports.minimatch.match = exports.match;
// replace stuff like \* with *
const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
const regExpEscape = (s)=>s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
class Minimatch {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    maxGlobstarRecursion;
    regexp;
    constructor(pattern, options = {}){
        (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
        options = options || {};
        this.options = options;
        this.maxGlobstarRecursion = options.maxGlobstarRecursion ?? 200;
        this.pattern = pattern;
        this.platform = options.platform || defaultPlatform;
        this.isWindows = this.platform === 'win32';
        // avoid the annoying deprecation flag lol
        const awe = 'allowWindow' + 'sEscape';
        this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options[awe] === false;
        if (this.windowsPathsNoEscape) {
            this.pattern = this.pattern.replace(/\\/g, '/');
        }
        this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
        this.regexp = null;
        this.negate = false;
        this.nonegate = !!options.nonegate;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.nocase = !!this.options.nocase;
        this.windowsNoMagicRoot = options.windowsNoMagicRoot !== undefined ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
        this.globSet = [];
        this.globParts = [];
        this.set = [];
        // make the set of regexps etc.
        this.make();
    }
    hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1) {
            return true;
        }
        for (const pattern of this.set){
            for (const part of pattern){
                if (typeof part !== 'string') return true;
            }
        }
        return false;
    }
    debug(..._) {}
    make() {
        const pattern = this.pattern;
        const options = this.options;
        // empty patterns and comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === '#') {
            this.comment = true;
            return;
        }
        if (!pattern) {
            this.empty = true;
            return;
        }
        // step 1: figure out negation, etc.
        this.parseNegate();
        // step 2: expand braces
        this.globSet = [
            ...new Set(this.braceExpand())
        ];
        if (options.debug) {
            //oxlint-disable-next-line no-console
            this.debug = (...args)=>console.error(...args);
        }
        this.debug(this.pattern, this.globSet);
        // step 3: now we have a set, so turn each one into a series of
        // path-portion matching patterns.
        // These will be regexps, except in the case of "**", which is
        // set to the GLOBSTAR object for globstar behavior,
        // and will not contain any / characters
        //
        // First, we preprocess to make the glob pattern sets a bit simpler
        // and deduped.  There are some perf-killing patterns that can cause
        // problems with a glob walk, but we can simplify them down a bit.
        const rawGlobParts = this.globSet.map((s)=>this.slashSplit(s));
        this.globParts = this.preprocess(rawGlobParts);
        this.debug(this.pattern, this.globParts);
        // glob --> regexps
        let set = this.globParts.map((s, _, __)=>{
            if (this.isWindows && this.windowsNoMagicRoot) {
                // check if it's a drive or unc path.
                const isUNC = s[0] === '' && s[1] === '' && (s[2] === '?' || !globMagic.test(s[2])) && !globMagic.test(s[3]);
                const isDrive = /^[a-z]:/i.test(s[0]);
                if (isUNC) {
                    return [
                        ...s.slice(0, 4),
                        ...s.slice(4).map((ss)=>this.parse(ss))
                    ];
                } else if (isDrive) {
                    return [
                        s[0],
                        ...s.slice(1).map((ss)=>this.parse(ss))
                    ];
                }
            }
            return s.map((ss)=>this.parse(ss));
        });
        this.debug(this.pattern, set);
        // filter out everything that didn't compile properly.
        this.set = set.filter((s)=>s.indexOf(false) === -1);
        // do not treat the ? in UNC paths as magic
        if (this.isWindows) {
            for(let i = 0; i < this.set.length; i++){
                const p = this.set[i];
                if (p[0] === '' && p[1] === '' && this.globParts[i][2] === '?' && typeof p[3] === 'string' && /^[a-z]:$/i.test(p[3])) {
                    p[2] = '?';
                }
            }
        }
        this.debug(this.pattern, this.set);
    }
    // various transforms to equivalent pattern sets that are
    // faster to process in a filesystem walk.  The goal is to
    // eliminate what we can, and push all ** patterns as far
    // to the right as possible, even if it increases the number
    // of patterns that we have to process.
    preprocess(globParts) {
        // if we're not in globstar mode, then turn ** into *
        if (this.options.noglobstar) {
            for (const partset of globParts){
                for(let j = 0; j < partset.length; j++){
                    if (partset[j] === '**') {
                        partset[j] = '*';
                    }
                }
            }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
            // aggressive optimization for the purpose of fs walking
            globParts = this.firstPhasePreProcess(globParts);
            globParts = this.secondPhasePreProcess(globParts);
        } else if (optimizationLevel >= 1) {
            // just basic optimizations to remove some .. parts
            globParts = this.levelOneOptimize(globParts);
        } else {
            // just collapse multiple ** portions into one
            globParts = this.adjascentGlobstarOptimize(globParts);
        }
        return globParts;
    }
    // just get rid of adjascent ** portions
    adjascentGlobstarOptimize(globParts) {
        return globParts.map((parts)=>{
            let gs = -1;
            while(-1 !== (gs = parts.indexOf('**', gs + 1))){
                let i = gs;
                while(parts[i + 1] === '**'){
                    i++;
                }
                if (i !== gs) {
                    parts.splice(gs, i - gs);
                }
            }
            return parts;
        });
    }
    // get rid of adjascent ** and resolve .. portions
    levelOneOptimize(globParts) {
        return globParts.map((parts)=>{
            parts = parts.reduce((set, part)=>{
                const prev = set[set.length - 1];
                if (part === '**' && prev === '**') {
                    return set;
                }
                if (part === '..') {
                    if (prev && prev !== '..' && prev !== '.' && prev !== '**') {
                        set.pop();
                        return set;
                    }
                }
                set.push(part);
                return set;
            }, []);
            return parts.length === 0 ? [
                ''
            ] : parts;
        });
    }
    levelTwoFileOptimize(parts) {
        if (!Array.isArray(parts)) {
            parts = this.slashSplit(parts);
        }
        let didSomething = false;
        do {
            didSomething = false;
            // <pre>/<e>/<rest> -> <pre>/<rest>
            if (!this.preserveMultipleSlashes) {
                for(let i = 1; i < parts.length - 1; i++){
                    const p = parts[i];
                    // don't squeeze out UNC patterns
                    if (i === 1 && p === '' && parts[0] === '') continue;
                    if (p === '.' || p === '') {
                        didSomething = true;
                        parts.splice(i, 1);
                        i--;
                    }
                }
                if (parts[0] === '.' && parts.length === 2 && (parts[1] === '.' || parts[1] === '')) {
                    didSomething = true;
                    parts.pop();
                }
            }
            // <pre>/<p>/../<rest> -> <pre>/<rest>
            let dd = 0;
            while(-1 !== (dd = parts.indexOf('..', dd + 1))){
                const p = parts[dd - 1];
                if (p && p !== '.' && p !== '..' && p !== '**' && !(this.isWindows && /^[a-z]:$/i.test(p))) {
                    didSomething = true;
                    parts.splice(dd - 1, 2);
                    dd -= 2;
                }
            }
        }while (didSomething)
        return parts.length === 0 ? [
            ''
        ] : parts;
    }
    // First phase: single-pattern processing
    // <pre> is 1 or more portions
    // <rest> is 1 or more portions
    // <p> is any portion other than ., .., '', or **
    // <e> is . or ''
    //
    // **/.. is *brutal* for filesystem walking performance, because
    // it effectively resets the recursive walk each time it occurs,
    // and ** cannot be reduced out by a .. pattern part like a regexp
    // or most strings (other than .., ., and '') can be.
    //
    // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
    // <pre>/<e>/<rest> -> <pre>/<rest>
    // <pre>/<p>/../<rest> -> <pre>/<rest>
    // **/**/<rest> -> **/<rest>
    //
    // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
    // this WOULD be allowed if ** did follow symlinks, or * didn't
    firstPhasePreProcess(globParts) {
        let didSomething = false;
        do {
            didSomething = false;
            // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
            for (let parts of globParts){
                let gs = -1;
                while(-1 !== (gs = parts.indexOf('**', gs + 1))){
                    let gss = gs;
                    while(parts[gss + 1] === '**'){
                        // <pre>/**/**/<rest> -> <pre>/**/<rest>
                        gss++;
                    }
                    // eg, if gs is 2 and gss is 4, that means we have 3 **
                    // parts, and can remove 2 of them.
                    if (gss > gs) {
                        parts.splice(gs + 1, gss - gs);
                    }
                    let next = parts[gs + 1];
                    const p = parts[gs + 2];
                    const p2 = parts[gs + 3];
                    if (next !== '..') continue;
                    if (!p || p === '.' || p === '..' || !p2 || p2 === '.' || p2 === '..') {
                        continue;
                    }
                    didSomething = true;
                    // edit parts in place, and push the new one
                    parts.splice(gs, 1);
                    const other = parts.slice(0);
                    other[gs] = '**';
                    globParts.push(other);
                    gs--;
                }
                // <pre>/<e>/<rest> -> <pre>/<rest>
                if (!this.preserveMultipleSlashes) {
                    for(let i = 1; i < parts.length - 1; i++){
                        const p = parts[i];
                        // don't squeeze out UNC patterns
                        if (i === 1 && p === '' && parts[0] === '') continue;
                        if (p === '.' || p === '') {
                            didSomething = true;
                            parts.splice(i, 1);
                            i--;
                        }
                    }
                    if (parts[0] === '.' && parts.length === 2 && (parts[1] === '.' || parts[1] === '')) {
                        didSomething = true;
                        parts.pop();
                    }
                }
                // <pre>/<p>/../<rest> -> <pre>/<rest>
                let dd = 0;
                while(-1 !== (dd = parts.indexOf('..', dd + 1))){
                    const p = parts[dd - 1];
                    if (p && p !== '.' && p !== '..' && p !== '**') {
                        didSomething = true;
                        const needDot = dd === 1 && parts[dd + 1] === '**';
                        const splin = needDot ? [
                            '.'
                        ] : [];
                        parts.splice(dd - 1, 2, ...splin);
                        if (parts.length === 0) parts.push('');
                        dd -= 2;
                    }
                }
            }
        }while (didSomething)
        return globParts;
    }
    // second phase: multi-pattern dedupes
    // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
    // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
    // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
    //
    // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
    // ^-- not valid because ** doens't follow symlinks
    secondPhasePreProcess(globParts) {
        for(let i = 0; i < globParts.length - 1; i++){
            for(let j = i + 1; j < globParts.length; j++){
                const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
                if (matched) {
                    globParts[i] = [];
                    globParts[j] = matched;
                    break;
                }
            }
        }
        return globParts.filter((gs)=>gs.length);
    }
    partsMatch(a, b, emptyGSMatch = false) {
        let ai = 0;
        let bi = 0;
        let result = [];
        let which = '';
        while(ai < a.length && bi < b.length){
            if (a[ai] === b[bi]) {
                result.push(which === 'b' ? b[bi] : a[ai]);
                ai++;
                bi++;
            } else if (emptyGSMatch && a[ai] === '**' && b[bi] === a[ai + 1]) {
                result.push(a[ai]);
                ai++;
            } else if (emptyGSMatch && b[bi] === '**' && a[ai] === b[bi + 1]) {
                result.push(b[bi]);
                bi++;
            } else if (a[ai] === '*' && b[bi] && (this.options.dot || !b[bi].startsWith('.')) && b[bi] !== '**') {
                if (which === 'b') return false;
                which = 'a';
                result.push(a[ai]);
                ai++;
                bi++;
            } else if (b[bi] === '*' && a[ai] && (this.options.dot || !a[ai].startsWith('.')) && a[ai] !== '**') {
                if (which === 'a') return false;
                which = 'b';
                result.push(b[bi]);
                ai++;
                bi++;
            } else {
                return false;
            }
        }
        // if we fall out of the loop, it means they two are identical
        // as long as their lengths match
        return a.length === b.length && result;
    }
    parseNegate() {
        if (this.nonegate) return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for(let i = 0; i < pattern.length && pattern.charAt(i) === '!'; i++){
            negate = !negate;
            negateOffset++;
        }
        if (negateOffset) this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file, pattern, partial = false) {
        let fileStartIndex = 0;
        let patternStartIndex = 0;
        // UNC paths like //?/X:/... can match X:/... and vice versa
        // Drive letters in absolute drive or unc paths are always compared
        // case-insensitively.
        if (this.isWindows) {
            const fileDrive = typeof file[0] === 'string' && /^[a-z]:$/i.test(file[0]);
            const fileUNC = !fileDrive && file[0] === '' && file[1] === '' && file[2] === '?' && /^[a-z]:$/i.test(file[3]);
            const patternDrive = typeof pattern[0] === 'string' && /^[a-z]:$/i.test(pattern[0]);
            const patternUNC = !patternDrive && pattern[0] === '' && pattern[1] === '' && pattern[2] === '?' && typeof pattern[3] === 'string' && /^[a-z]:$/i.test(pattern[3]);
            const fdi = fileUNC ? 3 : fileDrive ? 0 : undefined;
            const pdi = patternUNC ? 3 : patternDrive ? 0 : undefined;
            if (typeof fdi === 'number' && typeof pdi === 'number') {
                const [fd, pd] = [
                    file[fdi],
                    pattern[pdi]
                ];
                // start matching at the drive letter index of each
                if (fd.toLowerCase() === pd.toLowerCase()) {
                    pattern[pdi] = fd;
                    patternStartIndex = pdi;
                    fileStartIndex = fdi;
                }
            }
        }
        // resolve and reduce . and .. portions in the file as well.
        // don't need to do the second phase, because it's only one string[]
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
            file = this.levelTwoFileOptimize(file);
        }
        if (pattern.includes(exports.GLOBSTAR)) {
            return this.#matchGlobstar(file, pattern, partial, fileStartIndex, patternStartIndex);
        }
        return this.#matchOne(file, pattern, partial, fileStartIndex, patternStartIndex);
    }
    #matchGlobstar(file, pattern, partial, fileIndex, patternIndex) {
        // split the pattern into head, tail, and middle of ** delimited parts
        const firstgs = pattern.indexOf(exports.GLOBSTAR, patternIndex);
        const lastgs = pattern.lastIndexOf(exports.GLOBSTAR);
        // split the pattern up into globstar-delimited sections
        // the tail has to be at the end, and the others just have
        // to be found in order from the head.
        const [head, body, tail] = partial ? [
            pattern.slice(patternIndex, firstgs),
            pattern.slice(firstgs + 1),
            []
        ] : [
            pattern.slice(patternIndex, firstgs),
            pattern.slice(firstgs + 1, lastgs),
            pattern.slice(lastgs + 1)
        ];
        // check the head, from the current file/pattern index.
        if (head.length) {
            const fileHead = file.slice(fileIndex, fileIndex + head.length);
            if (!this.#matchOne(fileHead, head, partial, 0, 0)) {
                return false;
            }
            fileIndex += head.length;
            patternIndex += head.length;
        }
        // now we know the head matches!
        // if the last portion is not empty, it MUST match the end
        // check the tail
        let fileTailMatch = 0;
        if (tail.length) {
            // if head + tail > file, then we cannot possibly match
            if (tail.length + fileIndex > file.length) return false;
            // try to match the tail
            let tailStart = file.length - tail.length;
            if (this.#matchOne(file, tail, partial, tailStart, 0)) {
                fileTailMatch = tail.length;
            } else {
                // affordance for stuff like a/**/* matching a/b/
                // if the last file portion is '', and there's more to the pattern
                // then try without the '' bit.
                if (file[file.length - 1] !== '' || fileIndex + tail.length === file.length) {
                    return false;
                }
                tailStart--;
                if (!this.#matchOne(file, tail, partial, tailStart, 0)) {
                    return false;
                }
                fileTailMatch = tail.length + 1;
            }
        }
        // now we know the tail matches!
        // the middle is zero or more portions wrapped in **, possibly
        // containing more ** sections.
        // so a/**/b/**/c/**/d has become **/b/**/c/**
        // if it's empty, it means a/**/b, just verify we have no bad dots
        // if there's no tail, so it ends on /**, then we must have *something*
        // after the head, or it's not a matc
        if (!body.length) {
            let sawSome = !!fileTailMatch;
            for(let i = fileIndex; i < file.length - fileTailMatch; i++){
                const f = String(file[i]);
                sawSome = true;
                if (f === '.' || f === '..' || !this.options.dot && f.startsWith('.')) {
                    return false;
                }
            }
            // in partial mode, we just need to get past all file parts
            return partial || sawSome;
        }
        // now we know that there's one or more body sections, which can
        // be matched anywhere from the 0 index (because the head was pruned)
        // through to the length-fileTailMatch index.
        // split the body up into sections, and note the minimum index it can
        // be found at (start with the length of all previous segments)
        // [section, before, after]
        const bodySegments = [
            [
                [],
                0
            ]
        ];
        let currentBody = bodySegments[0];
        let nonGsParts = 0;
        const nonGsPartsSums = [
            0
        ];
        for (const b of body){
            if (b === exports.GLOBSTAR) {
                nonGsPartsSums.push(nonGsParts);
                currentBody = [
                    [],
                    0
                ];
                bodySegments.push(currentBody);
            } else {
                currentBody[0].push(b);
                nonGsParts++;
            }
        }
        let i = bodySegments.length - 1;
        const fileLength = file.length - fileTailMatch;
        for (const b of bodySegments){
            b[1] = fileLength - (nonGsPartsSums[i--] + b[0].length);
        }
        return !!this.#matchGlobStarBodySections(file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
    }
    // return false for "nope, not matching"
    // return null for "not matching, cannot keep trying"
    #matchGlobStarBodySections(file, // pattern section, last possible position for it
    bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
        // take the first body segment, and walk from fileIndex to its "after"
        // value at the end
        // If it doesn't match at that position, we increment, until we hit
        // that final possible position, and give up.
        // If it does match, then advance and try to rest.
        // If any of them fail we keep walking forward.
        // this is still a bit recursively painful, but it's more constrained
        // than previous implementations, because we never test something that
        // can't possibly be a valid matching condition.
        const bs = bodySegments[bodyIndex];
        if (!bs) {
            // just make sure that there's no bad dots
            for(let i = fileIndex; i < file.length; i++){
                sawTail = true;
                const f = file[i];
                if (f === '.' || f === '..' || !this.options.dot && f.startsWith('.')) {
                    return false;
                }
            }
            return sawTail;
        }
        // have a non-globstar body section to test
        const [body, after] = bs;
        while(fileIndex <= after){
            const m = this.#matchOne(file.slice(0, fileIndex + body.length), body, partial, fileIndex, 0);
            // if limit exceeded, no match. intentional false negative,
            // acceptable break in correctness for security.
            if (m && globStarDepth < this.maxGlobstarRecursion) {
                // match! see if the rest match. if so, we're done!
                const sub = this.#matchGlobStarBodySections(file, bodySegments, fileIndex + body.length, bodyIndex + 1, partial, globStarDepth + 1, sawTail);
                if (sub !== false) {
                    return sub;
                }
            }
            const f = file[fileIndex];
            if (f === '.' || f === '..' || !this.options.dot && f.startsWith('.')) {
                return false;
            }
            fileIndex++;
        }
        // walked off. no point continuing
        return partial || null;
    }
    #matchOne(file, pattern, partial, fileIndex, patternIndex) {
        let fi;
        let pi;
        let pl;
        let fl;
        for(fi = fileIndex, pi = patternIndex, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++){
            this.debug('matchOne loop');
            let p = pattern[pi];
            let f = file[fi];
            this.debug(pattern, p, f);
            // should be impossible.
            // some invalid regexp stuff in the set.
            /* c8 ignore start */ if (p === false || p === exports.GLOBSTAR) {
                return false;
            }
            /* c8 ignore stop */ // something other than **
            // non-magic patterns just have to match exactly
            // patterns with magic have been turned into regexps.
            let hit;
            if (typeof p === 'string') {
                hit = f === p;
                this.debug('string match', p, f, hit);
            } else {
                hit = p.test(f);
                this.debug('pattern match', p, f, hit);
            }
            if (!hit) return false;
        }
        // Note: ending in / means that we'll get a final ""
        // at the end of the pattern.  This can only match a
        // corresponding "" at the end of the file.
        // If the file ends in /, then it can only match a
        // a pattern that ends in /, unless the pattern just
        // doesn't have any more for it. But, a/b/ should *not*
        // match "a/b/*", even though "" matches against the
        // [^/]*? pattern, except in partial mode, where it might
        // simply not be reached yet.
        // However, a/b/ should still satisfy a/*
        // now either we fell off the end of the pattern, or we're done.
        if (fi === fl && pi === pl) {
            // ran out of pattern and filename at the same time.
            // an exact hit!
            return true;
        } else if (fi === fl) {
            // ran out of file, but still had pattern left.
            // this is ok if we're doing the match as part of
            // a glob fs traversal.
            return partial;
        } else if (pi === pl) {
            // ran out of pattern, still have file left.
            // this is only acceptable if we're on the very last
            // empty segment of a file with a trailing slash.
            // a/* should match a/b/
            return fi === fl - 1 && file[fi] === '';
        /* c8 ignore start */ } else {
            // should be unreachable.
            throw new Error('wtf?');
        }
    /* c8 ignore stop */ }
    braceExpand() {
        return (0, exports.braceExpand)(this.pattern, this.options);
    }
    parse(pattern) {
        (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
        const options = this.options;
        // shortcuts
        if (pattern === '**') return exports.GLOBSTAR;
        if (pattern === '') return '';
        // far and away, the most common glob pattern parts are
        // *, *.*, and *.<ext>  Add a fast check method for those.
        let m;
        let fastTest = null;
        if (m = pattern.match(starRE)) {
            fastTest = options.dot ? starTestDot : starTest;
        } else if (m = pattern.match(starDotExtRE)) {
            fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
        } else if (m = pattern.match(qmarksRE)) {
            fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
        } else if (m = pattern.match(starDotStarRE)) {
            fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
        } else if (m = pattern.match(dotStarRE)) {
            fastTest = dotStarTest;
        }
        const re = ast_js_1.AST.fromGlob(pattern, this.options).toMMPattern();
        if (fastTest && typeof re === 'object') {
            // Avoids overriding in frozen environments
            Reflect.defineProperty(re, 'test', {
                value: fastTest
            });
        }
        return re;
    }
    makeRe() {
        if (this.regexp || this.regexp === false) return this.regexp;
        // at this point, this.set is a 2d array of partial
        // pattern strings, or "**".
        //
        // It's better to use .match().  This function shouldn't
        // be used, really, but it's pretty convenient sometimes,
        // when you just want to work with a regex.
        const set = this.set;
        if (!set.length) {
            this.regexp = false;
            return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
        const flags = new Set(options.nocase ? [
            'i'
        ] : []);
        // regexpify non-globstar patterns
        // if ** is only item, then we just do one twoStar
        // if ** is first, and there are more, prepend (\/|twoStar\/)? to next
        // if ** is last, append (\/twoStar|) to previous
        // if ** is in the middle, append (\/|\/twoStar\/) to previous
        // then filter out GLOBSTAR symbols
        let re = set.map((pattern)=>{
            const pp = pattern.map((p)=>{
                if (p instanceof RegExp) {
                    for (const f of p.flags.split(''))flags.add(f);
                }
                return typeof p === 'string' ? regExpEscape(p) : p === exports.GLOBSTAR ? exports.GLOBSTAR : p._src;
            });
            pp.forEach((p, i)=>{
                const next = pp[i + 1];
                const prev = pp[i - 1];
                if (p !== exports.GLOBSTAR || prev === exports.GLOBSTAR) {
                    return;
                }
                if (prev === undefined) {
                    if (next !== undefined && next !== exports.GLOBSTAR) {
                        pp[i + 1] = '(?:\\/|' + twoStar + '\\/)?' + next;
                    } else {
                        pp[i] = twoStar;
                    }
                } else if (next === undefined) {
                    pp[i - 1] = prev + '(?:\\/|\\/' + twoStar + ')?';
                } else if (next !== exports.GLOBSTAR) {
                    pp[i - 1] = prev + '(?:\\/|\\/' + twoStar + '\\/)' + next;
                    pp[i + 1] = exports.GLOBSTAR;
                }
            });
            const filtered = pp.filter((p)=>p !== exports.GLOBSTAR);
            // For partial matches, we need to make the pattern match
            // any prefix of the full path. We do this by generating
            // alternative patterns that match progressively longer prefixes.
            if (this.partial && filtered.length >= 1) {
                const prefixes = [];
                for(let i = 1; i <= filtered.length; i++){
                    prefixes.push(filtered.slice(0, i).join('/'));
                }
                return '(?:' + prefixes.join('|') + ')';
            }
            return filtered.join('/');
        }).join('|');
        // need to wrap in parens if we had more than one thing with |,
        // otherwise only the first will be anchored to ^ and the last to $
        const [open, close] = set.length > 1 ? [
            '(?:',
            ')'
        ] : [
            '',
            ''
        ];
        // must match entire pattern
        // ending in a * or ** will make it less strict.
        re = '^' + open + re + close + '$';
        // In partial mode, '/' should always match as it's a valid prefix for any pattern
        if (this.partial) {
            re = '^(?:\\/|' + open + re.slice(1, -1) + close + ')$';
        }
        // can match anything, as long as it's not this.
        if (this.negate) re = '^(?!' + re + ').+$';
        try {
            this.regexp = new RegExp(re, [
                ...flags
            ].join(''));
        /* c8 ignore start */ } catch  {
            // should be impossible
            this.regexp = false;
        }
        /* c8 ignore stop */ return this.regexp;
    }
    slashSplit(p) {
        // if p starts with // on windows, we preserve that
        // so that UNC paths aren't broken.  Otherwise, any number of
        // / characters are coalesced into one, unless
        // preserveMultipleSlashes is set to true.
        if (this.preserveMultipleSlashes) {
            return p.split('/');
        } else if (this.isWindows && /^\/\/[^/]+/.test(p)) {
            // add an extra '' for the one we lose
            return [
                '',
                ...p.split(/\/+/)
            ];
        } else {
            return p.split(/\/+/);
        }
    }
    match(f, partial = this.partial) {
        this.debug('match', f, this.pattern);
        // short-circuit in the case of busted things.
        // comments, etc.
        if (this.comment) {
            return false;
        }
        if (this.empty) {
            return f === '';
        }
        if (f === '/' && partial) {
            return true;
        }
        const options = this.options;
        // windows: need to use /, not \
        if (this.isWindows) {
            f = f.split('\\').join('/');
        }
        // treat the test path as a set of pathparts.
        const ff = this.slashSplit(f);
        this.debug(this.pattern, 'split', ff);
        // just ONE of the pattern sets in this.set needs to match
        // in order for it to be valid.  If negating, then just one
        // match means that we have failed.
        // Either way, return on the first hit.
        const set = this.set;
        this.debug(this.pattern, 'set', set);
        // Find the basename of the path by looking for the last non-empty segment
        let filename = ff[ff.length - 1];
        if (!filename) {
            for(let i = ff.length - 2; !filename && i >= 0; i--){
                filename = ff[i];
            }
        }
        for (const pattern of set){
            let file = ff;
            if (options.matchBase && pattern.length === 1) {
                file = [
                    filename
                ];
            }
            const hit = this.matchOne(file, pattern, partial);
            if (hit) {
                if (options.flipNegate) {
                    return true;
                }
                return !this.negate;
            }
        }
        // didn't get any hits.  this is success if it's a negative
        // pattern, failure otherwise.
        if (options.flipNegate) {
            return false;
        }
        return this.negate;
    }
    static defaults(def) {
        return exports.minimatch.defaults(def).Minimatch;
    }
}
exports.Minimatch = Minimatch;
/* c8 ignore start */ var ast_js_2 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/ast.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "AST", {
    enumerable: true,
    get: function() {
        return ast_js_2.AST;
    }
});
var escape_js_2 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/escape.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "escape", {
    enumerable: true,
    get: function() {
        return escape_js_2.escape;
    }
});
var unescape_js_2 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@fastify/otel/node_modules/minimatch/dist/commonjs/unescape.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "unescape", {
    enumerable: true,
    get: function() {
        return unescape_js_2.unescape;
    }
});
/* c8 ignore stop */ exports.minimatch.AST = ast_js_1.AST;
exports.minimatch.Minimatch = Minimatch;
exports.minimatch.escape = escape_js_1.escape;
exports.minimatch.unescape = unescape_js_1.unescape; //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=f7fbe_%40fastify_otel_42bda36b._.js.map