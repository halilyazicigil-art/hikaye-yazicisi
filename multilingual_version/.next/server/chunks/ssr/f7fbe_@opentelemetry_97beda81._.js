module.exports = [
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
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
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
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
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "NOOP_LOGGER_PROVIDER",
    ()=>NOOP_LOGGER_PROVIDER,
    "NoopLoggerProvider",
    ()=>NoopLoggerProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)");
;
class NoopLoggerProvider {
    getLogger(_name, _version, _options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NoopLogger"]();
    }
}
const NOOP_LOGGER_PROVIDER = new NoopLoggerProvider(); //# sourceMappingURL=NoopLoggerProvider.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "ProxyLogger",
    ()=>ProxyLogger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)");
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER"];
        }
        this._delegate = logger;
        return this._delegate;
    }
} //# sourceMappingURL=ProxyLogger.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "ProxyLoggerProvider",
    ()=>ProxyLoggerProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js [app-rsc] (ecmascript)");
;
;
class ProxyLoggerProvider {
    getLogger(name, version, options) {
        var _a;
        return (_a = this._getDelegateLogger(name, version, options)) !== null && _a !== void 0 ? _a : new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLogger"](this, name, version, options);
    }
    /**
     * Get the delegate logger provider.
     * Used by tests only.
     * @internal
     */ _getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"];
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
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "LogsAPI",
    ()=>LogsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js [app-rsc] (ecmascript)");
;
;
;
class LogsAPI {
    constructor(){
        this._proxyLoggerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLoggerProvider"]();
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new LogsAPI();
        }
        return this._instance;
    }
    setGlobalLoggerProvider(provider) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) {
            return this.getLoggerProvider();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["makeGetter"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"], provider, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"]);
        this._proxyLoggerProvider._setDelegate(provider);
        return provider;
    }
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */ getLoggerProvider() {
        var _a, _b;
        return (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) === null || _a === void 0 ? void 0 : _a.call(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"], __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"])) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
    }
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */ getLogger(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
    }
    /** Remove the global logger provider */ disable() {
        delete __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]];
        this._proxyLoggerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLoggerProvider"]();
    }
} //# sourceMappingURL=logs.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "logs",
    ()=>logs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [app-rsc] (ecmascript)");
;
;
;
const logs = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LogsAPI"].getInstance(); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "isTracingSuppressed",
    ()=>isTracingSuppressed,
    "suppressTracing",
    ()=>suppressTracing,
    "unsuppressTracing",
    ()=>unsuppressTracing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/context/context.js [app-rsc] (ecmascript)");
;
const SUPPRESS_TRACING_KEY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContextKey"])('OpenTelemetry SDK Context Key SUPPRESS_TRACING');
function suppressTracing(context) {
    return context.setValue(SUPPRESS_TRACING_KEY, true);
}
function unsuppressTracing(context) {
    return context.deleteValue(SUPPRESS_TRACING_KEY);
}
function isTracingSuppressed(context) {
    return context.getValue(SUPPRESS_TRACING_KEY) === true;
} //# sourceMappingURL=suppress-tracing.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/internal/exporter.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "_export",
    ()=>_export
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/context-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [app-rsc] (ecmascript)");
;
;
function _export(exporter, arg) {
    return new Promise((resolve)=>{
        // prevent downstream exporter calls from generating spans
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["context"].with((0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["suppressTracing"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["context"].active()), ()=>{
            exporter.export(arg, resolve);
        });
    });
} //# sourceMappingURL=exporter.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "internal",
    ()=>internal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$exporter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/internal/exporter.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const internal = {
    _export: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$exporter$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_export"]
}; //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "BAGGAGE_HEADER",
    ()=>BAGGAGE_HEADER,
    "BAGGAGE_ITEMS_SEPARATOR",
    ()=>BAGGAGE_ITEMS_SEPARATOR,
    "BAGGAGE_KEY_PAIR_SEPARATOR",
    ()=>BAGGAGE_KEY_PAIR_SEPARATOR,
    "BAGGAGE_MAX_NAME_VALUE_PAIRS",
    ()=>BAGGAGE_MAX_NAME_VALUE_PAIRS,
    "BAGGAGE_MAX_PER_NAME_VALUE_PAIRS",
    ()=>BAGGAGE_MAX_PER_NAME_VALUE_PAIRS,
    "BAGGAGE_MAX_TOTAL_LENGTH",
    ()=>BAGGAGE_MAX_TOTAL_LENGTH,
    "BAGGAGE_PROPERTIES_SEPARATOR",
    ()=>BAGGAGE_PROPERTIES_SEPARATOR
]);
const BAGGAGE_KEY_PAIR_SEPARATOR = '=';
const BAGGAGE_PROPERTIES_SEPARATOR = ';';
const BAGGAGE_ITEMS_SEPARATOR = ',';
const BAGGAGE_HEADER = 'baggage';
const BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
const BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
const BAGGAGE_MAX_TOTAL_LENGTH = 8192; //# sourceMappingURL=constants.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getKeyPairs",
    ()=>getKeyPairs,
    "parseKeyPairsIntoRecord",
    ()=>parseKeyPairsIntoRecord,
    "parsePairKeyValue",
    ()=>parsePairKeyValue,
    "serializeKeyPairs",
    ()=>serializeKeyPairs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/baggage/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/constants.js [app-rsc] (ecmascript)");
;
;
function serializeKeyPairs(keyPairs) {
    return keyPairs.reduce((hValue, current)=>{
        const value = `${hValue}${hValue !== '' ? __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"] : ''}${current}`;
        return value.length > __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_MAX_TOTAL_LENGTH"] ? hValue : value;
    }, '');
}
function getKeyPairs(baggage) {
    return baggage.getAllEntries().map(([key, value])=>{
        let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
        // include opaque metadata if provided
        // NOTE: we intentionally don't URI-encode the metadata - that responsibility falls on the metadata implementation
        if (value.metadata !== undefined) {
            entry += __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_PROPERTIES_SEPARATOR"] + value.metadata.toString();
        }
        return entry;
    });
}
function parsePairKeyValue(entry) {
    if (!entry) return;
    const metadataSeparatorIndex = entry.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_PROPERTIES_SEPARATOR"]);
    const keyPairPart = metadataSeparatorIndex === -1 ? entry : entry.substring(0, metadataSeparatorIndex);
    const separatorIndex = keyPairPart.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_KEY_PAIR_SEPARATOR"]);
    if (separatorIndex <= 0) return;
    const rawKey = keyPairPart.substring(0, separatorIndex).trim();
    const rawValue = keyPairPart.substring(separatorIndex + 1).trim();
    if (!rawKey || !rawValue) return;
    let key;
    let value;
    try {
        key = decodeURIComponent(rawKey);
        value = decodeURIComponent(rawValue);
    } catch  {
        return;
    }
    let metadata;
    if (metadataSeparatorIndex !== -1 && metadataSeparatorIndex < entry.length - 1) {
        const metadataString = entry.substring(metadataSeparatorIndex + 1);
        metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baggageEntryMetadataFromString"])(metadataString);
    }
    return {
        key,
        value,
        metadata
    };
}
function parseKeyPairsIntoRecord(value) {
    const result = {};
    if (typeof value === 'string' && value.length > 0) {
        value.split(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"]).forEach((entry)=>{
            const keyPair = parsePairKeyValue(entry);
            if (keyPair !== undefined && keyPair.value.length > 0) {
                result[keyPair.key] = keyPair.value;
            }
        });
    }
    return result;
} //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "W3CBaggagePropagator",
    ()=>W3CBaggagePropagator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/propagation-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/constants.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/utils.js [app-rsc] (ecmascript)");
;
;
;
;
class W3CBaggagePropagator {
    inject(context, carrier, setter) {
        const baggage = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["propagation"].getBaggage(context);
        if (!baggage || (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTracingSuppressed"])(context)) return;
        const keyPairs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getKeyPairs"])(baggage).filter((pair)=>{
            return pair.length <= __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_MAX_PER_NAME_VALUE_PAIRS"];
        }).slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_MAX_NAME_VALUE_PAIRS"]);
        const headerValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeKeyPairs"])(keyPairs);
        if (headerValue.length > 0) {
            setter.set(carrier, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_HEADER"], headerValue);
        }
    }
    extract(context, carrier, getter) {
        const headerValue = getter.get(carrier, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_HEADER"]);
        const baggageString = Array.isArray(headerValue) ? headerValue.join(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"]) : headerValue;
        if (!baggageString) return context;
        const baggage = {};
        if (baggageString.length === 0) {
            return context;
        }
        const pairs = baggageString.split(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_ITEMS_SEPARATOR"]);
        pairs.forEach((entry)=>{
            const keyPair = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parsePairKeyValue"])(entry);
            if (keyPair) {
                const baggageEntry = {
                    value: keyPair.value
                };
                if (keyPair.metadata) {
                    baggageEntry.metadata = keyPair.metadata;
                }
                baggage[keyPair.key] = baggageEntry;
            }
        });
        if (Object.entries(baggage).length === 0) {
            return context;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["propagation"].setBaggage(context, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$propagation$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["propagation"].createBaggage(baggage));
    }
    fields() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BAGGAGE_HEADER"]
        ];
    }
} //# sourceMappingURL=W3CBaggagePropagator.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /**
 * A utility for returning wall times anchored to a given point in time. Wall time measurements will
 * not be taken from the system, but instead are computed by adding a monotonic clock time
 * to the anchor point.
 *
 * This is needed because the system time can change and result in unexpected situations like
 * spans ending before they are started. Creating an anchored clock for each local root span
 * ensures that span timings and durations are accurate while preventing span times from drifting
 * too far from the system clock.
 *
 * Only creating an anchored clock once per local trace ensures span times are correct relative
 * to each other. For example, a child span will never have a start time before its parent even
 * if the system clock is corrected during the local trace.
 *
 * Heavily inspired by the OTel Java anchored clock
 * https://github.com/open-telemetry/opentelemetry-java/blob/main/sdk/trace/src/main/java/io/opentelemetry/sdk/trace/AnchoredClock.java
 */ __turbopack_context__.s([
    "AnchoredClock",
    ()=>AnchoredClock
]);
class AnchoredClock {
    _monotonicClock;
    _epochMillis;
    _performanceMillis;
    /**
     * Create a new AnchoredClock anchored to the current time returned by systemClock.
     *
     * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
     * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
     */ constructor(systemClock, monotonicClock){
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
    }
    /**
     * Returns the current time by adding the number of milliseconds since the
     * AnchoredClock was created to the creation epoch time
     */ now() {
        const delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
    }
} //# sourceMappingURL=anchored-clock.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/attributes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "isAttributeKey",
    ()=>isAttributeKey,
    "isAttributeValue",
    ()=>isAttributeValue,
    "sanitizeAttributes",
    ()=>sanitizeAttributes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-rsc] (ecmascript)");
;
function sanitizeAttributes(attributes) {
    const out = {};
    if (typeof attributes !== 'object' || attributes == null) {
        return out;
    }
    for(const key in attributes){
        if (!Object.prototype.hasOwnProperty.call(attributes, key)) {
            continue;
        }
        if (!isAttributeKey(key)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Invalid attribute key: ${key}`);
            continue;
        }
        const val = attributes[key];
        if (!isAttributeValue(val)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Invalid attribute value set for key: ${key}`);
            continue;
        }
        if (Array.isArray(val)) {
            out[key] = val.slice();
        } else {
            out[key] = val;
        }
    }
    return out;
}
function isAttributeKey(key) {
    return typeof key === 'string' && key !== '';
}
function isAttributeValue(val) {
    if (val == null) {
        return true;
    }
    if (Array.isArray(val)) {
        return isHomogeneousAttributeValueArray(val);
    }
    return isValidPrimitiveAttributeValueType(typeof val);
}
function isHomogeneousAttributeValueArray(arr) {
    let type;
    for (const element of arr){
        // null/undefined elements are allowed
        if (element == null) continue;
        const elementType = typeof element;
        if (elementType === type) {
            continue;
        }
        if (!type) {
            if (isValidPrimitiveAttributeValueType(elementType)) {
                type = elementType;
                continue;
            }
            // encountered an invalid primitive
            return false;
        }
        return false;
    }
    return true;
}
function isValidPrimitiveAttributeValueType(valType) {
    switch(valType){
        case 'number':
        case 'boolean':
        case 'string':
            return true;
    }
    return false;
} //# sourceMappingURL=attributes.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "loggingErrorHandler",
    ()=>loggingErrorHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-rsc] (ecmascript)");
;
function loggingErrorHandler() {
    return (ex)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].error(stringifyException(ex));
    };
}
/**
 * Converts an exception into a string representation
 * @param {Exception} ex
 */ function stringifyException(ex) {
    if (typeof ex === 'string') {
        return ex;
    } else {
        return JSON.stringify(flattenException(ex));
    }
}
/**
 * Flattens an exception into key-value pairs by traversing the prototype chain
 * and coercing values to strings. Duplicate properties will not be overwritten;
 * the first insert wins.
 */ function flattenException(ex) {
    const result = {};
    let current = ex;
    while(current !== null){
        Object.getOwnPropertyNames(current).forEach((propertyName)=>{
            if (result[propertyName]) return;
            const value = current[propertyName];
            if (value) {
                result[propertyName] = String(value);
            }
        });
        current = Object.getPrototypeOf(current);
    }
    return result;
} //# sourceMappingURL=logging-error-handler.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "globalErrorHandler",
    ()=>globalErrorHandler,
    "setGlobalErrorHandler",
    ()=>setGlobalErrorHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$logging$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js [app-rsc] (ecmascript)");
;
/** The global error handler delegate */ let delegateHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$logging$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loggingErrorHandler"])();
function setGlobalErrorHandler(handler) {
    delegateHandler = handler;
}
function globalErrorHandler(ex) {
    try {
        delegateHandler(ex);
    } catch  {} // eslint-disable-line no-empty
} //# sourceMappingURL=global-error-handler.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "otperformance",
    ()=>otperformance
]);
;
;
;
const otperformance = performance; //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/time.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "addHrTimes",
    ()=>addHrTimes,
    "getTimeOrigin",
    ()=>getTimeOrigin,
    "hrTime",
    ()=>hrTime,
    "hrTimeDuration",
    ()=>hrTimeDuration,
    "hrTimeToMicroseconds",
    ()=>hrTimeToMicroseconds,
    "hrTimeToMilliseconds",
    ()=>hrTimeToMilliseconds,
    "hrTimeToNanoseconds",
    ()=>hrTimeToNanoseconds,
    "hrTimeToTimeStamp",
    ()=>hrTimeToTimeStamp,
    "isTimeInput",
    ()=>isTimeInput,
    "isTimeInputHrTime",
    ()=>isTimeInputHrTime,
    "millisToHrTime",
    ()=>millisToHrTime,
    "timeInputToHrTime",
    ()=>timeInputToHrTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/index.js [app-rsc] (ecmascript) <locals>");
;
const NANOSECOND_DIGITS = 9;
const NANOSECOND_DIGITS_IN_MILLIS = 6;
const MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
const SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
function millisToHrTime(epochMillis) {
    const epochSeconds = epochMillis / 1000;
    // Decimals only.
    const seconds = Math.trunc(epochSeconds);
    // Round sub-nanosecond accuracy to nanosecond.
    const nanos = Math.round(epochMillis % 1000 * MILLISECONDS_TO_NANOSECONDS);
    return [
        seconds,
        nanos
    ];
}
function getTimeOrigin() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["otperformance"].timeOrigin;
}
function hrTime(performanceNow) {
    const timeOrigin = millisToHrTime(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["otperformance"].timeOrigin);
    const now = millisToHrTime(typeof performanceNow === 'number' ? performanceNow : __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["otperformance"].now());
    return addHrTimes(timeOrigin, now);
}
function timeInputToHrTime(time) {
    // process.hrtime
    if (isTimeInputHrTime(time)) {
        return time;
    } else if (typeof time === 'number') {
        // Must be a performance.now() if it's smaller than process start time.
        if (time < __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["otperformance"].timeOrigin) {
            return hrTime(time);
        } else {
            // epoch milliseconds or performance.timeOrigin
            return millisToHrTime(time);
        }
    } else if (time instanceof Date) {
        return millisToHrTime(time.getTime());
    } else {
        throw TypeError('Invalid input type');
    }
}
function hrTimeDuration(startTime, endTime) {
    let seconds = endTime[0] - startTime[0];
    let nanos = endTime[1] - startTime[1];
    // overflow
    if (nanos < 0) {
        seconds -= 1;
        // negate
        nanos += SECOND_TO_NANOSECONDS;
    }
    return [
        seconds,
        nanos
    ];
}
function hrTimeToTimeStamp(time) {
    const precision = NANOSECOND_DIGITS;
    const tmp = `${'0'.repeat(precision)}${time[1]}Z`;
    const nanoString = tmp.substring(tmp.length - precision - 1);
    const date = new Date(time[0] * 1000).toISOString();
    return date.replace('000Z', nanoString);
}
function hrTimeToNanoseconds(time) {
    return time[0] * SECOND_TO_NANOSECONDS + time[1];
}
function hrTimeToMilliseconds(time) {
    return time[0] * 1e3 + time[1] / 1e6;
}
function hrTimeToMicroseconds(time) {
    return time[0] * 1e6 + time[1] / 1e3;
}
function isTimeInputHrTime(value) {
    return Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number';
}
function isTimeInput(value) {
    return isTimeInputHrTime(value) || typeof value === 'number' || value instanceof Date;
}
function addHrTimes(time1, time2) {
    const out = [
        time1[0] + time2[0],
        time1[1] + time2[1]
    ];
    // Nanoseconds
    if (out[1] >= SECOND_TO_NANOSECONDS) {
        out[1] -= SECOND_TO_NANOSECONDS;
        out[0] += 1;
    }
    return out;
} //# sourceMappingURL=time.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/timer-util.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /**
 * @deprecated please copy this code to your implementation instead, this function will be removed in the next major version of this package.
 * @param timer
 */ __turbopack_context__.s([
    "unrefTimer",
    ()=>unrefTimer
]);
function unrefTimer(timer) {
    if (typeof timer !== 'number') {
        timer.unref();
    }
} //# sourceMappingURL=timer-util.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/ExportResult.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "ExportResultCode",
    ()=>ExportResultCode
]);
var ExportResultCode;
(function(ExportResultCode) {
    ExportResultCode[ExportResultCode["SUCCESS"] = 0] = "SUCCESS";
    ExportResultCode[ExportResultCode["FAILED"] = 1] = "FAILED";
})(ExportResultCode || (ExportResultCode = {})); //# sourceMappingURL=ExportResult.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/version.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ // this is autogenerated file, see scripts/version-update.js
__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
const VERSION = '2.7.1'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * The name of the runtime of this process.
 *
 * @example OpenJDK Runtime Environment
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ __turbopack_context__.s([
    "ATTR_PROCESS_RUNTIME_NAME",
    ()=>ATTR_PROCESS_RUNTIME_NAME
]);
const ATTR_PROCESS_RUNTIME_NAME = 'process.runtime.name'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "SDK_INFO",
    ()=>SDK_INFO
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/version.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$semconv$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/semconv.js [app-rsc] (ecmascript)");
;
;
;
const SDK_INFO = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_NAME"]]: 'opentelemetry',
    [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$semconv$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_PROCESS_RUNTIME_NAME"]]: 'node',
    [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_LANGUAGE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_VERSION"]]: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$version$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"]
}; //# sourceMappingURL=sdk-info.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/globalThis.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /**
 * @deprecated Use globalThis directly instead.
 */ __turbopack_context__.s([
    "_globalThis",
    ()=>_globalThis
]);
const _globalThis = globalThis; //# sourceMappingURL=globalThis.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/environment.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "getBooleanFromEnv",
    ()=>getBooleanFromEnv,
    "getNumberFromEnv",
    ()=>getNumberFromEnv,
    "getStringFromEnv",
    ()=>getStringFromEnv,
    "getStringListFromEnv",
    ()=>getStringListFromEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
;
;
function getNumberFromEnv(key) {
    const raw = process.env[key];
    if (raw == null || raw.trim() === '') {
        return undefined;
    }
    const value = Number(raw);
    if (isNaN(value)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Unknown value ${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["inspect"])(raw)} for ${key}, expected a number, using defaults`);
        return undefined;
    }
    return value;
}
function getStringFromEnv(key) {
    const raw = process.env[key];
    if (raw == null || raw.trim() === '') {
        return undefined;
    }
    return raw;
}
function getBooleanFromEnv(key) {
    const raw = process.env[key]?.trim().toLowerCase();
    if (raw == null || raw === '') {
        // NOTE: falling back to `false` instead of `undefined` as required by the specification.
        // If you have a use-case that requires `undefined`, consider using `getStringFromEnv()` and applying the necessary
        // normalizations in the consuming code.
        return false;
    }
    if (raw === 'true') {
        return true;
    } else if (raw === 'false') {
        return false;
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Unknown value ${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["inspect"])(raw)} for ${key}, expected 'true' or 'false', falling back to 'false' (default)`);
        return false;
    }
}
function getStringListFromEnv(key) {
    return getStringFromEnv(key)?.split(',').map((v)=>v.trim()).filter((s)=>s !== '');
} //# sourceMappingURL=environment.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/propagation/composite.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "CompositePropagator",
    ()=>CompositePropagator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-rsc] (ecmascript)");
;
class CompositePropagator {
    _propagators;
    _fields;
    /**
     * Construct a composite propagator from a list of propagators.
     *
     * @param [config] Configuration object for composite propagator
     */ constructor(config = {}){
        this._propagators = config.propagators ?? [];
        const fields = new Set();
        for (const propagator of this._propagators){
            // older propagators may not have fields function, null check to be sure
            const propagatorFields = typeof propagator.fields === 'function' ? propagator.fields() : [];
            for (const field of propagatorFields){
                fields.add(field);
            }
        }
        this._fields = Array.from(fields);
    }
    /**
     * Run each of the configured propagators with the given context and carrier.
     * Propagators are run in the order they are configured, so if multiple
     * propagators write the same carrier key, the propagator later in the list
     * will "win".
     *
     * @param context Context to inject
     * @param carrier Carrier into which context will be injected
     */ inject(context, carrier, setter) {
        for (const propagator of this._propagators){
            try {
                propagator.inject(context, carrier, setter);
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
            }
        }
    }
    /**
     * Run each of the configured propagators with the given context and carrier.
     * Propagators are run in the order they are configured, so if multiple
     * propagators write the same context key, the propagator later in the list
     * will "win".
     *
     * @param context Context to add values to
     * @param carrier Carrier from which to extract context
     */ extract(context, carrier, getter) {
        return this._propagators.reduce((ctx, propagator)=>{
            try {
                return propagator.extract(ctx, carrier, getter);
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Failed to extract with ${propagator.constructor.name}. Err: ${err.message}`);
            }
            return ctx;
        }, context);
    }
    fields() {
        // return a new array so our fields cannot be modified
        return this._fields.slice();
    }
} //# sourceMappingURL=composite.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/internal/validators.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "validateKey",
    ()=>validateKey,
    "validateValue",
    ()=>validateValue
]);
const VALID_KEY_CHAR_RANGE = '[_0-9a-z-*/]';
const VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
const VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
const VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
const VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
const INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
function validateKey(key) {
    return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
    return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
} //# sourceMappingURL=validators.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "TraceState",
    ()=>TraceState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/internal/validators.js [app-rsc] (ecmascript)");
;
const MAX_TRACE_STATE_ITEMS = 32;
const MAX_TRACE_STATE_LEN = 512;
const LIST_MEMBERS_SEPARATOR = ',';
const LIST_MEMBER_KEY_VALUE_SPLITTER = '=';
class TraceState {
    _length;
    _rawTraceState;
    _internalState;
    constructor(rawTraceState){
        this._rawTraceState = typeof rawTraceState === 'string' ? rawTraceState : '';
        this._length = this._rawTraceState.length;
    }
    set(key, value) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateKey"])(key) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateValue"])(value)) {
            return this;
        }
        const currState = this._getState();
        const currValue = currState.get(key);
        // Get the new length depending if we already have a value or not
        // - for existing keys we add the difference between the length of the values
        // - for new keys is the key & value lenght plus
        //   - +1 for the key/value splitter
        //   - +1 for the separator if there are other keys
        let newLength = this._length;
        if (typeof currValue === 'string') {
            newLength += value.length - currValue.length;
        } else {
            newLength += key.length + value.length + (currState.size > 0 ? 2 : 1);
        }
        if (newLength > MAX_TRACE_STATE_LEN) {
            return this;
        }
        const newState = new Map(currState);
        newState.delete(key);
        newState.set(key, value);
        return this._fromState(newState, newLength);
    }
    unset(key) {
        const currState = this._getState();
        const currValue = currState.get(key);
        // No need to create a new instance if the key does not exist
        if (typeof currValue !== 'string') {
            return this;
        }
        // Get the new length depending if we already have a value or not
        // - for existing keys we substract key and value length plus
        //   - +1 for the key/value splitter
        //   - +1 for the separator if there are other keys
        let newLength = this._length - (key.length + currValue.length + 1);
        if (currState.size > 1) {
            // remove separator from length if there's no key or only one.
            newLength = newLength - 1;
        }
        const newState = new Map(currState);
        newState.delete(key);
        return this._fromState(newState, newLength);
    }
    get(key) {
        const currState = this._getState();
        return currState.get(key);
    }
    serialize() {
        // Maps put new entries at the end. We prepend the seralized entry
        // to get the right order according to the spec (updated members go 1st)
        let serialized = '';
        let index = 0;
        for (const entry of this._getState()){
            if (index > 0) {
                serialized = LIST_MEMBERS_SEPARATOR + serialized;
            }
            serialized = `${entry[0]}${LIST_MEMBER_KEY_VALUE_SPLITTER}${entry[1]}` + serialized;
            index++;
        }
        return serialized;
    }
    _getState() {
        if (this._internalState) {
            return this._internalState;
        }
        // Not parsed yet, lets do it
        const vendorMembers = this._rawTraceState.split(LIST_MEMBERS_SEPARATOR);
        // This Map will have the order reversed
        const vendorEntries = new Map();
        let currentLength = 0;
        for (const member of vendorMembers){
            const m = member.trim();
            const idx = m.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
            if (idx === -1) {
                continue;
            }
            const key = m.slice(0, idx);
            const value = m.slice(idx + 1);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateKey"])(key) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$internal$2f$validators$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateValue"])(value)) {
                continue;
            }
            // Skip if adding the new member exceeds the length
            const futureLength = currentLength + m.length + (vendorEntries.size > 0 ? 1 : 0);
            if (futureLength > MAX_TRACE_STATE_LEN) {
                continue;
            }
            // All good, add it
            vendorEntries.set(key, value);
            currentLength = futureLength;
            // Check if we reached the max items
            if (vendorEntries.size >= MAX_TRACE_STATE_ITEMS) {
                break;
            }
        }
        // Now we set the length & the Map in the right order
        this._length = currentLength;
        this._internalState = new Map(Array.from(vendorEntries.entries()).reverse());
        return this._internalState;
    }
    _fromState(state, length) {
        const traceState = Object.create(TraceState.prototype);
        traceState._internalState = state;
        traceState._length = length;
        return traceState;
    }
} //# sourceMappingURL=TraceState.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "TRACE_PARENT_HEADER",
    ()=>TRACE_PARENT_HEADER,
    "TRACE_STATE_HEADER",
    ()=>TRACE_STATE_HEADER,
    "W3CTraceContextPropagator",
    ()=>W3CTraceContextPropagator,
    "parseTraceParent",
    ()=>parseTraceParent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/trace-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$trace_flags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$TraceState$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js [app-rsc] (ecmascript)");
;
;
;
const TRACE_PARENT_HEADER = 'traceparent';
const TRACE_STATE_HEADER = 'tracestate';
const VERSION = '00';
const VERSION_PART = '(?!ff)[\\da-f]{2}';
const TRACE_ID_PART = '(?![0]{32})[\\da-f]{32}';
const PARENT_ID_PART = '(?![0]{16})[\\da-f]{16}';
const FLAGS_PART = '[\\da-f]{2}';
const TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
function parseTraceParent(traceParent) {
    const match = TRACE_PARENT_REGEX.exec(traceParent);
    if (!match) return null;
    // According to the specification the implementation should be compatible
    // with future versions. If there are more parts, we only reject it if it's using version 00
    // See https://www.w3.org/TR/trace-context/#versioning-of-traceparent
    if (match[1] === '00' && match[5]) return null;
    return {
        traceId: match[2],
        spanId: match[3],
        traceFlags: parseInt(match[4], 16)
    };
}
class W3CTraceContextPropagator {
    inject(context, carrier, setter) {
        const spanContext = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trace"].getSpanContext(context);
        if (!spanContext || (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTracingSuppressed"])(context) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$spancontext$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSpanContextValid"])(spanContext)) return;
        const traceParent = `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2f$trace_flags$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TraceFlags"].NONE).toString(16)}`;
        setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
            setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
    }
    extract(context, carrier, getter) {
        const traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
        if (!traceParentHeader) return context;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== 'string') return context;
        const spanContext = parseTraceParent(traceParent);
        if (!spanContext) return context;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
        if (traceStateHeader) {
            // If more than one `tracestate` header is found, we merge them into a
            // single header.
            const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(',') : traceStateHeader;
            spanContext.traceState = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$TraceState$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TraceState"](typeof state === 'string' ? state : undefined);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$trace$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trace"].setSpanContext(context, spanContext);
    }
    fields() {
        return [
            TRACE_PARENT_HEADER,
            TRACE_STATE_HEADER
        ];
    }
} //# sourceMappingURL=W3CTraceContextPropagator.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "RPCType",
    ()=>RPCType,
    "deleteRPCMetadata",
    ()=>deleteRPCMetadata,
    "getRPCMetadata",
    ()=>getRPCMetadata,
    "setRPCMetadata",
    ()=>setRPCMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/context/context.js [app-rsc] (ecmascript)");
;
const RPC_METADATA_KEY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$context$2f$context$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContextKey"])('OpenTelemetry SDK Context Key RPC_METADATA');
var RPCType;
(function(RPCType) {
    RPCType["HTTP"] = "http";
})(RPCType || (RPCType = {}));
function setRPCMetadata(context, meta) {
    return context.setValue(RPC_METADATA_KEY, meta);
}
function deleteRPCMetadata(context) {
    return context.deleteValue(RPC_METADATA_KEY);
}
function getRPCMetadata(context) {
    return context.getValue(RPC_METADATA_KEY);
} //# sourceMappingURL=rpc-metadata.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * based on lodash in order to support esm builds without esModuleInterop.
 * lodash is using MIT License.
 **/ __turbopack_context__.s([
    "isPlainObject",
    ()=>isPlainObject
]);
const objectTag = '[object Object]';
const nullTag = '[object Null]';
const undefinedTag = '[object Undefined]';
const funcProto = Function.prototype;
const funcToString = funcProto.toString;
const objectCtorString = funcToString.call(Object);
const getPrototypeOf = Object.getPrototypeOf;
const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const symToStringTag = Symbol ? Symbol.toStringTag : undefined;
const nativeObjectToString = objectProto.toString;
function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
        return false;
    }
    const proto = getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return value != null && typeof value == 'object';
}
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function getRawTag(value) {
    const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    let unmasked = false;
    try {
        value[symToStringTag] = undefined;
        unmasked = true;
    } catch  {
    // silence
    }
    const result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        } else {
            delete value[symToStringTag];
        }
    }
    return result;
}
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function objectToString(value) {
    return nativeObjectToString.call(value);
} //# sourceMappingURL=lodash.merge.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/merge.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "merge",
    ()=>merge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$lodash$2e$merge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js [app-rsc] (ecmascript)");
;
const MAX_LEVEL = 20;
function merge(...args) {
    let result = args.shift();
    const objects = new WeakMap();
    while(args.length > 0){
        result = mergeTwoObjects(result, args.shift(), 0, objects);
    }
    return result;
}
function takeValue(value) {
    if (isArray(value)) {
        return value.slice();
    }
    return value;
}
/**
 * Merges two objects
 * @param one - first object
 * @param two - second object
 * @param level - current deep level
 * @param objects - objects holder that has been already referenced - to prevent
 * cyclic dependency
 */ function mergeTwoObjects(one, two, level = 0, objects) {
    let result;
    if (level > MAX_LEVEL) {
        return undefined;
    }
    level++;
    if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
        result = takeValue(two);
    } else if (isArray(one)) {
        result = one.slice();
        if (isArray(two)) {
            for(let i = 0, j = two.length; i < j; i++){
                result.push(takeValue(two[i]));
            }
        } else if (isObject(two)) {
            const keys = Object.keys(two);
            for(let i = 0, j = keys.length; i < j; i++){
                const key = keys[i];
                if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                    continue;
                }
                result[key] = takeValue(two[key]);
            }
        }
    } else if (isObject(one)) {
        if (isObject(two)) {
            if (!shouldMerge(one, two)) {
                return two;
            }
            result = Object.assign({}, one);
            const keys = Object.keys(two);
            for(let i = 0, j = keys.length; i < j; i++){
                const key = keys[i];
                if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                    continue;
                }
                const twoValue = two[key];
                if (isPrimitive(twoValue)) {
                    if (typeof twoValue === 'undefined') {
                        delete result[key];
                    } else {
                        // result[key] = takeValue(twoValue);
                        result[key] = twoValue;
                    }
                } else {
                    const obj1 = result[key];
                    const obj2 = twoValue;
                    if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
                        delete result[key];
                    } else {
                        if (isObject(obj1) && isObject(obj2)) {
                            const arr1 = objects.get(obj1) || [];
                            const arr2 = objects.get(obj2) || [];
                            arr1.push({
                                obj: one,
                                key
                            });
                            arr2.push({
                                obj: two,
                                key
                            });
                            objects.set(obj1, arr1);
                            objects.set(obj2, arr2);
                        }
                        result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
                    }
                }
            }
        } else {
            result = two;
        }
    }
    return result;
}
/**
 * Function to check if object has been already reference
 * @param obj
 * @param key
 * @param objects
 */ function wasObjectReferenced(obj, key, objects) {
    const arr = objects.get(obj[key]) || [];
    for(let i = 0, j = arr.length; i < j; i++){
        const info = arr[i];
        if (info.key === key && info.obj === obj) {
            return true;
        }
    }
    return false;
}
function isArray(value) {
    return Array.isArray(value);
}
function isFunction(value) {
    return typeof value === 'function';
}
function isObject(value) {
    return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === 'object';
}
function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined' || value instanceof Date || value instanceof RegExp || value === null;
}
function shouldMerge(one, two) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$lodash$2e$merge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlainObject"])(one) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$lodash$2e$merge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPlainObject"])(two)) {
        return false;
    }
    return true;
} //# sourceMappingURL=merge.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/timeout.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ /**
 * Error that is thrown on timeouts.
 */ __turbopack_context__.s([
    "TimeoutError",
    ()=>TimeoutError,
    "callWithTimeout",
    ()=>callWithTimeout
]);
class TimeoutError extends Error {
    constructor(message){
        super(message);
        // manually adjust prototype to retain `instanceof` functionality when targeting ES5, see:
        // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
function callWithTimeout(promise, timeout) {
    let timeoutHandle;
    const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
        timeoutHandle = setTimeout(function timeoutHandler() {
            reject(new TimeoutError('Operation timed out.'));
        }, timeout);
    });
    return Promise.race([
        promise,
        timeoutPromise
    ]).then((result)=>{
        clearTimeout(timeoutHandle);
        return result;
    }, (reason)=>{
        clearTimeout(timeoutHandle);
        throw reason;
    });
} //# sourceMappingURL=timeout.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/url.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "isUrlIgnored",
    ()=>isUrlIgnored,
    "urlMatches",
    ()=>urlMatches
]);
function urlMatches(url, urlToMatch) {
    if (typeof urlToMatch === 'string') {
        return url === urlToMatch;
    } else {
        return !!url.match(urlToMatch);
    }
}
function isUrlIgnored(url, ignoredUrls) {
    if (!ignoredUrls) {
        return false;
    }
    for (const ignoreUrl of ignoredUrls){
        if (urlMatches(url, ignoreUrl)) {
            return true;
        }
    }
    return false;
} //# sourceMappingURL=url.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/promise.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "Deferred",
    ()=>Deferred
]);
class Deferred {
    _promise;
    _resolve;
    _reject;
    constructor(){
        this._promise = new Promise((resolve, reject)=>{
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    get promise() {
        return this._promise;
    }
    resolve(val) {
        this._resolve(val);
    }
    reject(err) {
        this._reject(err);
    }
} //# sourceMappingURL=promise.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/callback.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "BindOnceFuture",
    ()=>BindOnceFuture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/promise.js [app-rsc] (ecmascript)");
;
class BindOnceFuture {
    _isCalled = false;
    _deferred = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$promise$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Deferred"]();
    _callback;
    _that;
    constructor(callback, that){
        this._callback = callback;
        this._that = that;
    }
    get isCalled() {
        return this._isCalled;
    }
    get promise() {
        return this._deferred.promise;
    }
    call(...args) {
        if (!this._isCalled) {
            this._isCalled = true;
            try {
                Promise.resolve(this._callback.call(this._that, ...args)).then((val)=>this._deferred.resolve(val), (err)=>this._deferred.reject(err));
            } catch (err) {
                this._deferred.reject(err);
            }
        }
        return this._deferred.promise;
    }
} //# sourceMappingURL=callback.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/configuration.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "diagLogLevelFromString",
    ()=>diagLogLevelFromString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag/types.js [app-rsc] (ecmascript)");
;
const logLevelMap = {
    ALL: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].ALL,
    VERBOSE: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].VERBOSE,
    DEBUG: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].DEBUG,
    INFO: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].INFO,
    WARN: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].WARN,
    ERROR: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].ERROR,
    NONE: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].NONE
};
function diagLogLevelFromString(value) {
    if (value == null) {
        // don't fall back to default - no value set has different semantics for ús than an incorrect value (do not set vs. fall back to default)
        return undefined;
    }
    const resolvedLogLevel = logLevelMap[value.toUpperCase()];
    if (resolvedLogLevel == null) {
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn(`Unknown log level "${value}", expected one of ${Object.keys(logLevelMap)}, using default`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DiagLogLevel"].INFO;
    }
    return resolvedLogLevel;
} //# sourceMappingURL=configuration.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnchoredClock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$anchored$2d$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AnchoredClock"],
    "BindOnceFuture",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$callback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BindOnceFuture"],
    "CompositePropagator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$propagation$2f$composite$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CompositePropagator"],
    "ExportResultCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$ExportResult$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ExportResultCode"],
    "RPCType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$rpc$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RPCType"],
    "SDK_INFO",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$sdk$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SDK_INFO"],
    "TRACE_PARENT_HEADER",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$W3CTraceContextPropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRACE_PARENT_HEADER"],
    "TRACE_STATE_HEADER",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$W3CTraceContextPropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRACE_STATE_HEADER"],
    "TimeoutError",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$timeout$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TimeoutError"],
    "TraceState",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$TraceState$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TraceState"],
    "W3CBaggagePropagator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$propagation$2f$W3CBaggagePropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["W3CBaggagePropagator"],
    "W3CTraceContextPropagator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$W3CTraceContextPropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["W3CTraceContextPropagator"],
    "_globalThis",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$globalThis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_globalThis"],
    "addHrTimes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addHrTimes"],
    "callWithTimeout",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$timeout$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["callWithTimeout"],
    "deleteRPCMetadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$rpc$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteRPCMetadata"],
    "diagLogLevelFromString",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$configuration$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diagLogLevelFromString"],
    "getBooleanFromEnv",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$environment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBooleanFromEnv"],
    "getNumberFromEnv",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$environment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getNumberFromEnv"],
    "getRPCMetadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$rpc$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRPCMetadata"],
    "getStringFromEnv",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$environment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStringFromEnv"],
    "getStringListFromEnv",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$environment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStringListFromEnv"],
    "getTimeOrigin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTimeOrigin"],
    "globalErrorHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$global$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["globalErrorHandler"],
    "hrTime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hrTime"],
    "hrTimeDuration",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hrTimeDuration"],
    "hrTimeToMicroseconds",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hrTimeToMicroseconds"],
    "hrTimeToMilliseconds",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hrTimeToMilliseconds"],
    "hrTimeToNanoseconds",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hrTimeToNanoseconds"],
    "hrTimeToTimeStamp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hrTimeToTimeStamp"],
    "internal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["internal"],
    "isAttributeValue",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAttributeValue"],
    "isTimeInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTimeInput"],
    "isTimeInputHrTime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTimeInputHrTime"],
    "isTracingSuppressed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTracingSuppressed"],
    "isUrlIgnored",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isUrlIgnored"],
    "loggingErrorHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$logging$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loggingErrorHandler"],
    "merge",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$merge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["merge"],
    "millisToHrTime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["millisToHrTime"],
    "otperformance",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["otperformance"],
    "parseKeyPairsIntoRecord",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseKeyPairsIntoRecord"],
    "parseTraceParent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$W3CTraceContextPropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseTraceParent"],
    "sanitizeAttributes",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanitizeAttributes"],
    "setGlobalErrorHandler",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$global$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setGlobalErrorHandler"],
    "setRPCMetadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$rpc$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setRPCMetadata"],
    "suppressTracing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["suppressTracing"],
    "timeInputToHrTime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["timeInputToHrTime"],
    "unrefTimer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$timer$2d$util$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unrefTimer"],
    "unsuppressTracing",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unsuppressTracing"],
    "urlMatches",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlMatches"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$propagation$2f$W3CBaggagePropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$anchored$2d$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/attributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$global$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$logging$2d$error$2d$handler$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$time$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/time.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$timer$2d$util$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/timer-util.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$ExportResult$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/ExportResult.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$baggage$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/baggage/utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$sdk$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$common$2f$globalThis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/common/globalThis.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$environment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/environment.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$propagation$2f$composite$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/propagation/composite.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$W3CTraceContextPropagator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$rpc$2d$metadata$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$suppress$2d$tracing$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$trace$2f$TraceState$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$merge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/merge.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$timeout$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/timeout.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$url$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/url.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$callback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/callback.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$utils$2f$configuration$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/utils/configuration.js [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/@opentelemetry/resources/build/esm/default-service-name.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "_clearDefaultServiceNameCache",
    ()=>_clearDefaultServiceNameCache,
    "defaultServiceName",
    ()=>defaultServiceName
]);
let serviceName;
function defaultServiceName() {
    if (serviceName === undefined) {
        try {
            const argv0 = globalThis.process.argv0;
            serviceName = argv0 ? `unknown_service:${argv0}` : 'unknown_service';
        } catch  {
            serviceName = 'unknown_service';
        }
    }
    return serviceName;
}
function _clearDefaultServiceNameCache() {
    serviceName = undefined;
} //# sourceMappingURL=default-service-name.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/resources/build/esm/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "isPromiseLike",
    ()=>isPromiseLike
]);
const isPromiseLike = (val)=>{
    return val !== null && typeof val === 'object' && typeof val.then === 'function';
}; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "defaultResource",
    ()=>defaultResource,
    "emptyResource",
    ()=>emptyResource,
    "resourceFromAttributes",
    ()=>resourceFromAttributes,
    "resourceFromDetectedResource",
    ()=>resourceFromDetectedResource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$sdk$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$default$2d$service$2d$name$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/resources/build/esm/default-service-name.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@opentelemetry/resources/build/esm/utils.js [app-rsc] (ecmascript)");
;
;
;
;
;
class ResourceImpl {
    _rawAttributes;
    _asyncAttributesPending = false;
    _schemaUrl;
    _memoizedAttributes;
    static FromAttributeList(attributes, options) {
        const res = new ResourceImpl({}, options);
        res._rawAttributes = guardedRawAttributes(attributes);
        res._asyncAttributesPending = attributes.filter(([_, val])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPromiseLike"])(val)).length > 0;
        return res;
    }
    constructor(/**
     * A dictionary of attributes with string keys and values that provide
     * information about the entity as numbers, strings or booleans
     * TODO: Consider to add check/validation on attributes.
     */ resource, options){
        const attributes = resource.attributes ?? {};
        this._rawAttributes = Object.entries(attributes).map(([k, v])=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPromiseLike"])(v)) {
                // side-effect
                this._asyncAttributesPending = true;
            }
            return [
                k,
                v
            ];
        });
        this._rawAttributes = guardedRawAttributes(this._rawAttributes);
        this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
    }
    get asyncAttributesPending() {
        return this._asyncAttributesPending;
    }
    async waitForAsyncAttributes() {
        if (!this.asyncAttributesPending) {
            return;
        }
        for(let i = 0; i < this._rawAttributes.length; i++){
            const [k, v] = this._rawAttributes[i];
            this._rawAttributes[i] = [
                k,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPromiseLike"])(v) ? await v : v
            ];
        }
        this._asyncAttributesPending = false;
    }
    get attributes() {
        if (this.asyncAttributesPending) {
            __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].error('Accessing resource attributes before async attributes settled');
        }
        if (this._memoizedAttributes) {
            return this._memoizedAttributes;
        }
        const attrs = {};
        for (const [k, v] of this._rawAttributes){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPromiseLike"])(v)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].debug(`Unsettled resource attribute ${k} skipped`);
                continue;
            }
            if (v != null) {
                attrs[k] ??= v;
            }
        }
        // only memoize output if all attributes are settled
        if (!this._asyncAttributesPending) {
            this._memoizedAttributes = attrs;
        }
        return attrs;
    }
    getRawAttributes() {
        return this._rawAttributes;
    }
    get schemaUrl() {
        return this._schemaUrl;
    }
    merge(resource) {
        if (resource == null) return this;
        // Order is important
        // Spec states incoming attributes override existing attributes
        const mergedSchemaUrl = mergeSchemaUrl(this, resource);
        const mergedOptions = mergedSchemaUrl ? {
            schemaUrl: mergedSchemaUrl
        } : undefined;
        return ResourceImpl.FromAttributeList([
            ...resource.getRawAttributes(),
            ...this.getRawAttributes()
        ], mergedOptions);
    }
}
function resourceFromAttributes(attributes, options) {
    return ResourceImpl.FromAttributeList(Object.entries(attributes), options);
}
function resourceFromDetectedResource(detectedResource, options) {
    return new ResourceImpl(detectedResource, options);
}
function emptyResource() {
    return resourceFromAttributes({});
}
function defaultResource() {
    return resourceFromAttributes({
        [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_SERVICE_NAME"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$default$2d$service$2d$name$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultServiceName"])(),
        [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_LANGUAGE"]]: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$sdk$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SDK_INFO"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_LANGUAGE"]],
        [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_NAME"]]: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$sdk$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SDK_INFO"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_NAME"]],
        [__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_VERSION"]]: __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$core$2f$build$2f$esm$2f$platform$2f$node$2f$sdk$2d$info$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SDK_INFO"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$semantic$2d$conventions$2f$build$2f$esm$2f$stable_attributes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ATTR_TELEMETRY_SDK_VERSION"]]
    });
}
function guardedRawAttributes(attributes) {
    return attributes.map(([k, v])=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$resources$2f$build$2f$esm$2f$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isPromiseLike"])(v)) {
            return [
                k,
                v.catch((err)=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].debug('promise rejection for resource attribute: %s - %s', k, err);
                    return undefined;
                })
            ];
        }
        return [
            k,
            v
        ];
    });
}
function validateSchemaUrl(schemaUrl) {
    if (typeof schemaUrl === 'string' || schemaUrl === undefined) {
        return schemaUrl;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn('Schema URL must be string or undefined, got %s. Schema URL will be ignored.', schemaUrl);
    return undefined;
}
function mergeSchemaUrl(old, updating) {
    const oldSchemaUrl = old?.schemaUrl;
    const updatingSchemaUrl = updating?.schemaUrl;
    const isOldEmpty = oldSchemaUrl === undefined || oldSchemaUrl === '';
    const isUpdatingEmpty = updatingSchemaUrl === undefined || updatingSchemaUrl === '';
    if (isOldEmpty) {
        return updatingSchemaUrl;
    }
    if (isUpdatingEmpty) {
        return oldSchemaUrl;
    }
    if (oldSchemaUrl === updatingSchemaUrl) {
        return oldSchemaUrl;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["diag"].warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
    return undefined;
} //# sourceMappingURL=ResourceImpl.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.33.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-fs'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SYNC_FUNCTIONS = exports.CALLBACK_FUNCTIONS = exports.PROMISE_FUNCTIONS = void 0;
exports.PROMISE_FUNCTIONS = [
    'access',
    'appendFile',
    'chmod',
    'chown',
    'copyFile',
    'cp',
    'lchown',
    'link',
    'lstat',
    'lutimes',
    'mkdir',
    'mkdtemp',
    'open',
    'opendir',
    'readdir',
    'readFile',
    'readlink',
    'realpath',
    'rename',
    'rm',
    'rmdir',
    'stat',
    'symlink',
    'truncate',
    'unlink',
    'utimes',
    'writeFile'
];
exports.CALLBACK_FUNCTIONS = [
    'access',
    'appendFile',
    'chmod',
    'chown',
    'copyFile',
    'cp',
    'exists',
    'lchown',
    'link',
    'lstat',
    'lutimes',
    'mkdir',
    'mkdtemp',
    'open',
    'opendir',
    'readdir',
    'readFile',
    'readlink',
    'realpath',
    'realpath.native',
    'rename',
    'rm',
    'rmdir',
    'stat',
    'symlink',
    'truncate',
    'unlink',
    'utimes',
    'writeFile'
];
exports.SYNC_FUNCTIONS = [
    'accessSync',
    'appendFileSync',
    'chmodSync',
    'chownSync',
    'copyFileSync',
    'cpSync',
    'existsSync',
    'lchownSync',
    'linkSync',
    'lstatSync',
    'lutimesSync',
    'mkdirSync',
    'mkdtempSync',
    'opendirSync',
    'openSync',
    'readdirSync',
    'readFileSync',
    'readlinkSync',
    'realpathSync',
    'realpathSync.native',
    'renameSync',
    'rmdirSync',
    'rmSync',
    'statSync',
    'symlinkSync',
    'truncateSync',
    'unlinkSync',
    'utimesSync',
    'writeFileSync'
]; //# sourceMappingURL=constants.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.indexFs = exports.splitTwoLevels = void 0;
function splitTwoLevels(functionName) {
    const memberParts = functionName.split('.');
    if (memberParts.length > 1) {
        if (memberParts.length !== 2) throw Error(`Invalid member function name ${functionName}`);
        return memberParts;
    } else {
        return [
            functionName
        ];
    }
}
exports.splitTwoLevels = splitTwoLevels;
function indexFs(fs, member) {
    if (!member) throw new Error(JSON.stringify({
        member
    }));
    const splitResult = splitTwoLevels(member);
    const [functionName1, functionName2] = splitResult;
    if (functionName2) {
        return {
            objectToPatch: fs[functionName1],
            functionNameToPatch: functionName2
        };
    } else {
        return {
            objectToPatch: fs,
            functionNameToPatch: functionName1
        };
    }
}
exports.indexFs = indexFs; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FsInstrumentation = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/version.js [app-rsc] (ecmascript)");
const constants_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/constants.js [app-rsc] (ecmascript)");
const util_1 = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/utils.js [app-rsc] (ecmascript)");
/**
 * This is important for 2-level functions like `realpath.native` to retain the 2nd-level
 * when patching the 1st-level.
 */ function patchedFunctionWithOriginalProperties(patchedFunction, original) {
    return Object.assign(patchedFunction, original);
}
class FsInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition('fs', [
                '*'
            ], (fs)=>{
                for (const fName of constants_1.SYNC_FUNCTIONS){
                    const { objectToPatch, functionNameToPatch } = (0, utils_1.indexFs)(fs, fName);
                    if ((0, instrumentation_1.isWrapped)(objectToPatch[functionNameToPatch])) {
                        this._unwrap(objectToPatch, functionNameToPatch);
                    }
                    this._wrap(objectToPatch, functionNameToPatch, this._patchSyncFunction.bind(this, fName));
                }
                for (const fName of constants_1.CALLBACK_FUNCTIONS){
                    const { objectToPatch, functionNameToPatch } = (0, utils_1.indexFs)(fs, fName);
                    if ((0, instrumentation_1.isWrapped)(objectToPatch[functionNameToPatch])) {
                        this._unwrap(objectToPatch, functionNameToPatch);
                    }
                    if (fName === 'exists') {
                        // handling separately because of the inconsistent cb style:
                        // `exists` doesn't have error as the first argument, but the result
                        this._wrap(objectToPatch, functionNameToPatch, this._patchExistsCallbackFunction.bind(this, fName));
                        continue;
                    }
                    this._wrap(objectToPatch, functionNameToPatch, this._patchCallbackFunction.bind(this, fName));
                }
                for (const fName of constants_1.PROMISE_FUNCTIONS){
                    if ((0, instrumentation_1.isWrapped)(fs.promises[fName])) {
                        this._unwrap(fs.promises, fName);
                    }
                    this._wrap(fs.promises, fName, this._patchPromiseFunction.bind(this, fName));
                }
                return fs;
            }, (fs)=>{
                if (fs === undefined) return;
                for (const fName of constants_1.SYNC_FUNCTIONS){
                    const { objectToPatch, functionNameToPatch } = (0, utils_1.indexFs)(fs, fName);
                    if ((0, instrumentation_1.isWrapped)(objectToPatch[functionNameToPatch])) {
                        this._unwrap(objectToPatch, functionNameToPatch);
                    }
                }
                for (const fName of constants_1.CALLBACK_FUNCTIONS){
                    const { objectToPatch, functionNameToPatch } = (0, utils_1.indexFs)(fs, fName);
                    if ((0, instrumentation_1.isWrapped)(objectToPatch[functionNameToPatch])) {
                        this._unwrap(objectToPatch, functionNameToPatch);
                    }
                }
                for (const fName of constants_1.PROMISE_FUNCTIONS){
                    if ((0, instrumentation_1.isWrapped)(fs.promises[fName])) {
                        this._unwrap(fs.promises, fName);
                    }
                }
            }),
            new instrumentation_1.InstrumentationNodeModuleDefinition('fs/promises', [
                '*'
            ], (fsPromises)=>{
                for (const fName of constants_1.PROMISE_FUNCTIONS){
                    if ((0, instrumentation_1.isWrapped)(fsPromises[fName])) {
                        this._unwrap(fsPromises, fName);
                    }
                    this._wrap(fsPromises, fName, this._patchPromiseFunction.bind(this, fName));
                }
                return fsPromises;
            }, (fsPromises)=>{
                if (fsPromises === undefined) return;
                for (const fName of constants_1.PROMISE_FUNCTIONS){
                    if ((0, instrumentation_1.isWrapped)(fsPromises[fName])) {
                        this._unwrap(fsPromises, fName);
                    }
                }
            })
        ];
    }
    _patchSyncFunction(functionName, original) {
        const instrumentation = this;
        const patchedFunction = function(...args) {
            const activeContext = api.context.active();
            if (!instrumentation._shouldTrace(activeContext)) {
                return original.apply(this, args);
            }
            if (instrumentation._runCreateHook(functionName, {
                args: args
            }) === false) {
                return api.context.with((0, core_1.suppressTracing)(activeContext), original, this, ...args);
            }
            const span = instrumentation.tracer.startSpan(`fs ${functionName}`);
            try {
                // Suppress tracing for internal fs calls
                const res = api.context.with((0, core_1.suppressTracing)(api.trace.setSpan(activeContext, span)), original, this, ...args);
                instrumentation._runEndHook(functionName, {
                    args: args,
                    span
                });
                return res;
            } catch (error) {
                span.recordException(error);
                span.setStatus({
                    message: error.message,
                    code: api.SpanStatusCode.ERROR
                });
                instrumentation._runEndHook(functionName, {
                    args: args,
                    span,
                    error
                });
                throw error;
            } finally{
                span.end();
            }
        };
        return patchedFunctionWithOriginalProperties(patchedFunction, original);
    }
    _patchCallbackFunction(functionName, original) {
        const instrumentation = this;
        const patchedFunction = function(...args) {
            const activeContext = api.context.active();
            if (!instrumentation._shouldTrace(activeContext)) {
                return original.apply(this, args);
            }
            if (instrumentation._runCreateHook(functionName, {
                args: args
            }) === false) {
                return api.context.with((0, core_1.suppressTracing)(activeContext), original, this, ...args);
            }
            const lastIdx = args.length - 1;
            const cb = args[lastIdx];
            if (typeof cb === 'function') {
                const span = instrumentation.tracer.startSpan(`fs ${functionName}`);
                // Return to the context active during the call in the callback
                args[lastIdx] = api.context.bind(activeContext, function(error) {
                    if (error) {
                        span.recordException(error);
                        span.setStatus({
                            message: error.message,
                            code: api.SpanStatusCode.ERROR
                        });
                    }
                    instrumentation._runEndHook(functionName, {
                        args: args,
                        span,
                        error
                    });
                    span.end();
                    return cb.apply(this, arguments);
                });
                try {
                    // Suppress tracing for internal fs calls
                    return api.context.with((0, core_1.suppressTracing)(api.trace.setSpan(activeContext, span)), original, this, ...args);
                } catch (error) {
                    span.recordException(error);
                    span.setStatus({
                        message: error.message,
                        code: api.SpanStatusCode.ERROR
                    });
                    instrumentation._runEndHook(functionName, {
                        args: args,
                        span,
                        error
                    });
                    span.end();
                    throw error;
                }
            } else {
                // TODO: what to do if we are pretty sure it's going to throw
                return original.apply(this, args);
            }
        };
        return patchedFunctionWithOriginalProperties(patchedFunction, original);
    }
    _patchExistsCallbackFunction(functionName, original) {
        const instrumentation = this;
        const patchedFunction = function(...args) {
            const activeContext = api.context.active();
            if (!instrumentation._shouldTrace(activeContext)) {
                return original.apply(this, args);
            }
            if (instrumentation._runCreateHook(functionName, {
                args: args
            }) === false) {
                return api.context.with((0, core_1.suppressTracing)(activeContext), original, this, ...args);
            }
            const lastIdx = args.length - 1;
            const cb = args[lastIdx];
            if (typeof cb === 'function') {
                const span = instrumentation.tracer.startSpan(`fs ${functionName}`);
                // Return to the context active during the call in the callback
                args[lastIdx] = api.context.bind(activeContext, function() {
                    // `exists` never calls the callback with an error
                    instrumentation._runEndHook(functionName, {
                        args: args,
                        span
                    });
                    span.end();
                    return cb.apply(this, arguments);
                });
                try {
                    // Suppress tracing for internal fs calls
                    return api.context.with((0, core_1.suppressTracing)(api.trace.setSpan(activeContext, span)), original, this, ...args);
                } catch (error) {
                    span.recordException(error);
                    span.setStatus({
                        message: error.message,
                        code: api.SpanStatusCode.ERROR
                    });
                    instrumentation._runEndHook(functionName, {
                        args: args,
                        span,
                        error
                    });
                    span.end();
                    throw error;
                }
            } else {
                return original.apply(this, args);
            }
        };
        const functionWithOriginalProperties = patchedFunctionWithOriginalProperties(patchedFunction, original);
        // `exists` has a custom promisify function because of the inconsistent signature
        // replicating that on the patched function
        const promisified = function(path) {
            return new Promise((resolve)=>functionWithOriginalProperties(path, resolve));
        };
        Object.defineProperty(promisified, 'name', {
            value: functionName
        });
        Object.defineProperty(functionWithOriginalProperties, util_1.promisify.custom, {
            value: promisified
        });
        return functionWithOriginalProperties;
    }
    _patchPromiseFunction(functionName, original) {
        const instrumentation = this;
        const patchedFunction = async function(...args) {
            const activeContext = api.context.active();
            if (!instrumentation._shouldTrace(activeContext)) {
                return original.apply(this, args);
            }
            if (instrumentation._runCreateHook(functionName, {
                args: args
            }) === false) {
                return api.context.with((0, core_1.suppressTracing)(activeContext), original, this, ...args);
            }
            const span = instrumentation.tracer.startSpan(`fs ${functionName}`);
            try {
                // Suppress tracing for internal fs calls
                const res = await api.context.with((0, core_1.suppressTracing)(api.trace.setSpan(activeContext, span)), original, this, ...args);
                instrumentation._runEndHook(functionName, {
                    args: args,
                    span
                });
                return res;
            } catch (error) {
                span.recordException(error);
                span.setStatus({
                    message: error.message,
                    code: api.SpanStatusCode.ERROR
                });
                instrumentation._runEndHook(functionName, {
                    args: args,
                    span,
                    error
                });
                throw error;
            } finally{
                span.end();
            }
        };
        return patchedFunctionWithOriginalProperties(patchedFunction, original);
    }
    _runCreateHook(...args) {
        const { createHook } = this.getConfig();
        if (typeof createHook === 'function') {
            try {
                return createHook(...args);
            } catch (e) {
                this._diag.error('caught createHook error', e);
            }
        }
        return true;
    }
    _runEndHook(...args) {
        const { endHook } = this.getConfig();
        if (typeof endHook === 'function') {
            try {
                endHook(...args);
            } catch (e) {
                this._diag.error('caught endHook error', e);
            }
        }
    }
    _shouldTrace(context) {
        if ((0, core_1.isTracingSuppressed)(context)) {
            // Performance optimization. Avoid creating additional contexts and spans
            // if we already know that the tracing is being suppressed.
            return false;
        }
        const { requireParentSpan } = this.getConfig();
        if (requireParentSpan) {
            const parentSpan = api.trace.getSpan(context);
            if (parentSpan == null) {
                return false;
            }
        }
        return true;
    }
}
exports.FsInstrumentation = FsInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FsInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-fs/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "FsInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.FsInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/enum.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpanNames = exports.TokenKind = exports.AllowedOperationTypes = void 0;
var AllowedOperationTypes;
(function(AllowedOperationTypes) {
    AllowedOperationTypes["QUERY"] = "query";
    AllowedOperationTypes["MUTATION"] = "mutation";
    AllowedOperationTypes["SUBSCRIPTION"] = "subscription";
})(AllowedOperationTypes = exports.AllowedOperationTypes || (exports.AllowedOperationTypes = {}));
var TokenKind;
(function(TokenKind) {
    TokenKind["SOF"] = "<SOF>";
    TokenKind["EOF"] = "<EOF>";
    TokenKind["BANG"] = "!";
    TokenKind["DOLLAR"] = "$";
    TokenKind["AMP"] = "&";
    TokenKind["PAREN_L"] = "(";
    TokenKind["PAREN_R"] = ")";
    TokenKind["SPREAD"] = "...";
    TokenKind["COLON"] = ":";
    TokenKind["EQUALS"] = "=";
    TokenKind["AT"] = "@";
    TokenKind["BRACKET_L"] = "[";
    TokenKind["BRACKET_R"] = "]";
    TokenKind["BRACE_L"] = "{";
    TokenKind["PIPE"] = "|";
    TokenKind["BRACE_R"] = "}";
    TokenKind["NAME"] = "Name";
    TokenKind["INT"] = "Int";
    TokenKind["FLOAT"] = "Float";
    TokenKind["STRING"] = "String";
    TokenKind["BLOCK_STRING"] = "BlockString";
    TokenKind["COMMENT"] = "Comment";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
var SpanNames;
(function(SpanNames) {
    SpanNames["EXECUTE"] = "graphql.execute";
    SpanNames["PARSE"] = "graphql.parse";
    SpanNames["RESOLVE"] = "graphql.resolve";
    SpanNames["VALIDATE"] = "graphql.validate";
    SpanNames["SCHEMA_VALIDATE"] = "graphql.validateSchema";
    SpanNames["SCHEMA_PARSE"] = "graphql.parseSchema";
})(SpanNames = exports.SpanNames || (exports.SpanNames = {})); //# sourceMappingURL=enum.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = void 0;
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
 */ var AttributeNames;
(function(AttributeNames) {
    AttributeNames["SOURCE"] = "graphql.source";
    AttributeNames["FIELD_NAME"] = "graphql.field.name";
    AttributeNames["FIELD_PATH"] = "graphql.field.path";
    AttributeNames["FIELD_TYPE"] = "graphql.field.type";
    AttributeNames["PARENT_NAME"] = "graphql.parent.name";
    AttributeNames["OPERATION_TYPE"] = "graphql.operation.type";
    AttributeNames["OPERATION_NAME"] = "graphql.operation.name";
    AttributeNames["VARIABLES"] = "graphql.variables.";
    AttributeNames["ERROR_VALIDATION_NAME"] = "graphql.validation.error";
})(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {})); //# sourceMappingURL=AttributeNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/symbols.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OTEL_GRAPHQL_DATA_SYMBOL = exports.OTEL_PATCHED_SYMBOL = void 0;
exports.OTEL_PATCHED_SYMBOL = Symbol.for('opentelemetry.patched');
exports.OTEL_GRAPHQL_DATA_SYMBOL = Symbol.for('opentelemetry.graphql_data'); //# sourceMappingURL=symbols.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OPERATION_NOT_SUPPORTED = void 0;
const symbols_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/symbols.js [app-rsc] (ecmascript)");
exports.OPERATION_NOT_SUPPORTED = 'Operation$operationName$not' + ' supported'; //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrapFieldResolver = exports.wrapFields = exports.getSourceFromLocation = exports.getOperation = exports.endSpan = exports.addSpanSource = exports.addInputVariableAttributes = exports.isPromise = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const enum_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/enum.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
const symbols_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/symbols.js [app-rsc] (ecmascript)");
const OPERATION_VALUES = Object.values(enum_1.AllowedOperationTypes);
// https://github.com/graphql/graphql-js/blob/main/src/jsutils/isPromise.ts
const isPromise = (value)=>{
    return typeof value?.then === 'function';
};
exports.isPromise = isPromise;
// https://github.com/graphql/graphql-js/blob/main/src/jsutils/isObjectLike.ts
const isObjectLike = (value)=>{
    return typeof value == 'object' && value !== null;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addInputVariableAttribute(span, key, variable) {
    if (Array.isArray(variable)) {
        variable.forEach((value, idx)=>{
            addInputVariableAttribute(span, `${key}.${idx}`, value);
        });
    } else if (variable instanceof Object) {
        Object.entries(variable).forEach(([nestedKey, value])=>{
            addInputVariableAttribute(span, `${key}.${nestedKey}`, value);
        });
    } else {
        span.setAttribute(`${AttributeNames_1.AttributeNames.VARIABLES}${String(key)}`, variable);
    }
}
function addInputVariableAttributes(span, variableValues) {
    Object.entries(variableValues).forEach(([key, value])=>{
        addInputVariableAttribute(span, key, value);
    });
}
exports.addInputVariableAttributes = addInputVariableAttributes;
function addSpanSource(span, loc, allowValues, start, end) {
    const source = getSourceFromLocation(loc, allowValues, start, end);
    span.setAttribute(AttributeNames_1.AttributeNames.SOURCE, source);
}
exports.addSpanSource = addSpanSource;
function createFieldIfNotExists(tracer, getConfig, contextValue, info, path) {
    let field = getField(contextValue, path);
    if (field) {
        return {
            field,
            spanAdded: false
        };
    }
    const config = getConfig();
    const parentSpan = config.flatResolveSpans ? getRootSpan(contextValue) : getParentFieldSpan(contextValue, path);
    field = {
        span: createResolverSpan(tracer, getConfig, contextValue, info, path, parentSpan)
    };
    addField(contextValue, path, field);
    return {
        field,
        spanAdded: true
    };
}
function createResolverSpan(tracer, getConfig, contextValue, info, path, parentSpan) {
    const attributes = {
        [AttributeNames_1.AttributeNames.FIELD_NAME]: info.fieldName,
        [AttributeNames_1.AttributeNames.FIELD_PATH]: path.join('.'),
        [AttributeNames_1.AttributeNames.FIELD_TYPE]: info.returnType.toString(),
        [AttributeNames_1.AttributeNames.PARENT_NAME]: info.parentType.name
    };
    const span = tracer.startSpan(`${enum_1.SpanNames.RESOLVE} ${attributes[AttributeNames_1.AttributeNames.FIELD_PATH]}`, {
        attributes
    }, parentSpan ? api.trace.setSpan(api.context.active(), parentSpan) : undefined);
    const document = contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL].source;
    const fieldNode = info.fieldNodes.find((fieldNode)=>fieldNode.kind === 'Field');
    if (fieldNode) {
        addSpanSource(span, document.loc, getConfig().allowValues, fieldNode.loc?.start, fieldNode.loc?.end);
    }
    return span;
}
function endSpan(span, error) {
    if (error) {
        span.recordException(error);
    }
    span.end();
}
exports.endSpan = endSpan;
function getOperation(document, operationName) {
    if (!document || !Array.isArray(document.definitions)) {
        return undefined;
    }
    if (operationName) {
        return document.definitions.filter((definition)=>OPERATION_VALUES.indexOf(definition?.operation) !== -1).find((definition)=>operationName === definition?.name?.value);
    } else {
        return document.definitions.find((definition)=>OPERATION_VALUES.indexOf(definition?.operation) !== -1);
    }
}
exports.getOperation = getOperation;
function addField(contextValue, path, field) {
    return contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL].fields[path.join('.')] = field;
}
function getField(contextValue, path) {
    return contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL].fields[path.join('.')];
}
function getParentFieldSpan(contextValue, path) {
    for(let i = path.length - 1; i > 0; i--){
        const field = getField(contextValue, path.slice(0, i));
        if (field) {
            return field.span;
        }
    }
    return getRootSpan(contextValue);
}
function getRootSpan(contextValue) {
    return contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL].span;
}
function pathToArray(mergeItems, path) {
    const flattened = [];
    let curr = path;
    while(curr){
        let key = curr.key;
        if (mergeItems && typeof key === 'number') {
            key = '*';
        }
        flattened.push(String(key));
        curr = curr.prev;
    }
    return flattened.reverse();
}
function repeatBreak(i) {
    return repeatChar('\n', i);
}
function repeatSpace(i) {
    return repeatChar(' ', i);
}
function repeatChar(char, to) {
    let text = '';
    for(let i = 0; i < to; i++){
        text += char;
    }
    return text;
}
const KindsToBeRemoved = [
    enum_1.TokenKind.FLOAT,
    enum_1.TokenKind.STRING,
    enum_1.TokenKind.INT,
    enum_1.TokenKind.BLOCK_STRING
];
function getSourceFromLocation(loc, allowValues = false, inputStart, inputEnd) {
    let source = '';
    if (loc?.startToken) {
        const start = typeof inputStart === 'number' ? inputStart : loc.start;
        const end = typeof inputEnd === 'number' ? inputEnd : loc.end;
        let next = loc.startToken.next;
        let previousLine = 1;
        while(next){
            if (next.start < start) {
                next = next.next;
                previousLine = next?.line;
                continue;
            }
            if (next.end > end) {
                next = next.next;
                previousLine = next?.line;
                continue;
            }
            let value = next.value || next.kind;
            let space = '';
            if (!allowValues && KindsToBeRemoved.indexOf(next.kind) >= 0) {
                // value = repeatChar('*', value.length);
                value = '*';
            }
            if (next.kind === enum_1.TokenKind.STRING) {
                value = `"${value}"`;
            }
            if (next.kind === enum_1.TokenKind.EOF) {
                value = '';
            }
            if (next.line > previousLine) {
                source += repeatBreak(next.line - previousLine);
                previousLine = next.line;
                space = repeatSpace(next.column - 1);
            } else {
                if (next.line === next.prev?.line) {
                    space = repeatSpace(next.start - (next.prev?.end || 0));
                }
            }
            source += space + value;
            if (next) {
                next = next.next;
            }
        }
    }
    return source;
}
exports.getSourceFromLocation = getSourceFromLocation;
function wrapFields(type, tracer, getConfig) {
    if (!type || type[symbols_1.OTEL_PATCHED_SYMBOL]) {
        return;
    }
    const fields = type.getFields();
    type[symbols_1.OTEL_PATCHED_SYMBOL] = true;
    Object.keys(fields).forEach((key)=>{
        const field = fields[key];
        if (!field) {
            return;
        }
        if (field.resolve) {
            field.resolve = wrapFieldResolver(tracer, getConfig, field.resolve);
        }
        if (field.type) {
            const unwrappedTypes = unwrapType(field.type);
            for (const unwrappedType of unwrappedTypes){
                wrapFields(unwrappedType, tracer, getConfig);
            }
        }
    });
}
exports.wrapFields = wrapFields;
function unwrapType(type) {
    // unwrap wrapping types (non-nullable and list types)
    if ('ofType' in type) {
        return unwrapType(type.ofType);
    }
    // unwrap union types
    if (isGraphQLUnionType(type)) {
        return type.getTypes();
    }
    // return object types
    if (isGraphQLObjectType(type)) {
        return [
            type
        ];
    }
    return [];
}
function isGraphQLUnionType(type) {
    return 'getTypes' in type && typeof type.getTypes === 'function';
}
function isGraphQLObjectType(type) {
    return 'getFields' in type && typeof type.getFields === 'function';
}
const handleResolveSpanError = (resolveSpan, err, shouldEndSpan)=>{
    if (!shouldEndSpan) {
        return;
    }
    resolveSpan.recordException(err);
    resolveSpan.setStatus({
        code: api.SpanStatusCode.ERROR,
        message: err.message
    });
    resolveSpan.end();
};
const handleResolveSpanSuccess = (resolveSpan, shouldEndSpan)=>{
    if (!shouldEndSpan) {
        return;
    }
    resolveSpan.end();
};
function wrapFieldResolver(tracer, getConfig, fieldResolver, isDefaultResolver = false) {
    if (wrappedFieldResolver[symbols_1.OTEL_PATCHED_SYMBOL] || typeof fieldResolver !== 'function') {
        return fieldResolver;
    }
    function wrappedFieldResolver(source, args, contextValue, info) {
        if (!fieldResolver) {
            return undefined;
        }
        const config = getConfig();
        // follows what graphql is doing to decide if this is a trivial resolver
        // for which we don't need to create a resolve span
        if (config.ignoreTrivialResolveSpans && isDefaultResolver && (isObjectLike(source) || typeof source === 'function')) {
            const property = source[info.fieldName];
            // a function execution is not trivial and should be recorder.
            // property which is not a function is just a value and we don't want a "resolve" span for it
            if (typeof property !== 'function') {
                return fieldResolver.call(this, source, args, contextValue, info);
            }
        }
        if (!contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL]) {
            return fieldResolver.call(this, source, args, contextValue, info);
        }
        const path = pathToArray(config.mergeItems, info && info.path);
        const depth = path.filter((item)=>typeof item === 'string').length;
        let span;
        let shouldEndSpan = false;
        if (config.depth >= 0 && config.depth < depth) {
            span = getParentFieldSpan(contextValue, path);
        } else {
            const { field, spanAdded } = createFieldIfNotExists(tracer, getConfig, contextValue, info, path);
            span = field.span;
            shouldEndSpan = spanAdded;
        }
        return api.context.with(api.trace.setSpan(api.context.active(), span), ()=>{
            try {
                const res = fieldResolver.call(this, source, args, contextValue, info);
                if ((0, exports.isPromise)(res)) {
                    return res.then((r)=>{
                        handleResolveSpanSuccess(span, shouldEndSpan);
                        return r;
                    }, (err)=>{
                        handleResolveSpanError(span, err, shouldEndSpan);
                        throw err;
                    });
                } else {
                    handleResolveSpanSuccess(span, shouldEndSpan);
                    return res;
                }
            } catch (err) {
                handleResolveSpanError(span, err, shouldEndSpan);
                throw err;
            }
        });
    }
    wrappedFieldResolver[symbols_1.OTEL_PATCHED_SYMBOL] = true;
    return wrappedFieldResolver;
}
exports.wrapFieldResolver = wrapFieldResolver; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.62.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-graphql'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLInstrumentation = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const enum_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/enum.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
const symbols_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/symbols.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/internal-types.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/utils.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/version.js [app-rsc] (ecmascript)");
const DEFAULT_CONFIG = {
    mergeItems: false,
    depth: -1,
    allowValues: false,
    ignoreResolveSpans: false
};
const supportedVersions = [
    '>=14.0.0 <17'
];
class GraphQLInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, {
            ...DEFAULT_CONFIG,
            ...config
        });
    }
    setConfig(config = {}) {
        super.setConfig({
            ...DEFAULT_CONFIG,
            ...config
        });
    }
    init() {
        const module = new instrumentation_1.InstrumentationNodeModuleDefinition('graphql', supportedVersions);
        module.files.push(this._addPatchingExecute());
        module.files.push(this._addPatchingParser());
        module.files.push(this._addPatchingValidate());
        return module;
    }
    _addPatchingExecute() {
        return new instrumentation_1.InstrumentationNodeModuleFile('graphql/execution/execute.js', supportedVersions, // cannot make it work with appropriate type as execute function has 2
        //types and/cannot import function but only types
        (moduleExports)=>{
            if ((0, instrumentation_1.isWrapped)(moduleExports.execute)) {
                this._unwrap(moduleExports, 'execute');
            }
            this._wrap(moduleExports, 'execute', this._patchExecute(moduleExports.defaultFieldResolver));
            return moduleExports;
        }, (moduleExports)=>{
            if (moduleExports) {
                this._unwrap(moduleExports, 'execute');
            }
        });
    }
    _addPatchingParser() {
        return new instrumentation_1.InstrumentationNodeModuleFile('graphql/language/parser.js', supportedVersions, (moduleExports)=>{
            if ((0, instrumentation_1.isWrapped)(moduleExports.parse)) {
                this._unwrap(moduleExports, 'parse');
            }
            this._wrap(moduleExports, 'parse', this._patchParse());
            return moduleExports;
        }, (moduleExports)=>{
            if (moduleExports) {
                this._unwrap(moduleExports, 'parse');
            }
        });
    }
    _addPatchingValidate() {
        return new instrumentation_1.InstrumentationNodeModuleFile('graphql/validation/validate.js', supportedVersions, (moduleExports)=>{
            if ((0, instrumentation_1.isWrapped)(moduleExports.validate)) {
                this._unwrap(moduleExports, 'validate');
            }
            this._wrap(moduleExports, 'validate', this._patchValidate());
            return moduleExports;
        }, (moduleExports)=>{
            if (moduleExports) {
                this._unwrap(moduleExports, 'validate');
            }
        });
    }
    _patchExecute(defaultFieldResolved) {
        const instrumentation = this;
        return function execute(original) {
            return function patchExecute() {
                let processedArgs;
                // case when apollo server is used for example
                if (arguments.length >= 2) {
                    const args = arguments;
                    processedArgs = instrumentation._wrapExecuteArgs(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], defaultFieldResolved);
                } else {
                    const args = arguments[0];
                    processedArgs = instrumentation._wrapExecuteArgs(args.schema, args.document, args.rootValue, args.contextValue, args.variableValues, args.operationName, args.fieldResolver, args.typeResolver, defaultFieldResolved);
                }
                const operation = (0, utils_1.getOperation)(processedArgs.document, processedArgs.operationName);
                const span = instrumentation._createExecuteSpan(operation, processedArgs);
                processedArgs.contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL] = {
                    source: processedArgs.document ? processedArgs.document || processedArgs.document[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL] : undefined,
                    span,
                    fields: {}
                };
                return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
                    return (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                        return original.apply(this, [
                            processedArgs
                        ]);
                    }, (err, result)=>{
                        instrumentation._handleExecutionResult(span, err, result);
                    });
                });
            };
        };
    }
    _handleExecutionResult(span, err, result) {
        const config = this.getConfig();
        if (result === undefined || err) {
            (0, utils_1.endSpan)(span, err);
            return;
        }
        if ((0, utils_1.isPromise)(result)) {
            result.then((resultData)=>{
                if (typeof config.responseHook !== 'function') {
                    (0, utils_1.endSpan)(span);
                    return;
                }
                this._executeResponseHook(span, resultData);
            }, (error)=>{
                (0, utils_1.endSpan)(span, error);
            });
        } else {
            if (typeof config.responseHook !== 'function') {
                (0, utils_1.endSpan)(span);
                return;
            }
            this._executeResponseHook(span, result);
        }
    }
    _executeResponseHook(span, result) {
        const { responseHook } = this.getConfig();
        if (!responseHook) {
            return;
        }
        (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
            responseHook(span, result);
        }, (err)=>{
            if (err) {
                this._diag.error('Error running response hook', err);
            }
            (0, utils_1.endSpan)(span, undefined);
        }, true);
    }
    _patchParse() {
        const instrumentation = this;
        return function parse(original) {
            return function patchParse(source, options) {
                return instrumentation._parse(this, original, source, options);
            };
        };
    }
    _patchValidate() {
        const instrumentation = this;
        return function validate(original) {
            return function patchValidate(schema, documentAST, rules, options, typeInfo) {
                return instrumentation._validate(this, original, schema, documentAST, rules, typeInfo, options);
            };
        };
    }
    _parse(obj, original, source, options) {
        const config = this.getConfig();
        const span = this.tracer.startSpan(enum_1.SpanNames.PARSE);
        return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
            return (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                return original.call(obj, source, options);
            }, (err, result)=>{
                if (result) {
                    const operation = (0, utils_1.getOperation)(result);
                    if (!operation) {
                        span.updateName(enum_1.SpanNames.SCHEMA_PARSE);
                    } else if (result.loc) {
                        (0, utils_1.addSpanSource)(span, result.loc, config.allowValues);
                    }
                }
                (0, utils_1.endSpan)(span, err);
            });
        });
    }
    _validate(obj, original, schema, documentAST, rules, typeInfo, options) {
        const span = this.tracer.startSpan(enum_1.SpanNames.VALIDATE, {});
        return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
            return (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                return original.call(obj, schema, documentAST, rules, options, typeInfo);
            }, (err, errors)=>{
                if (!documentAST.loc) {
                    span.updateName(enum_1.SpanNames.SCHEMA_VALIDATE);
                }
                if (errors && errors.length) {
                    span.recordException({
                        name: AttributeNames_1.AttributeNames.ERROR_VALIDATION_NAME,
                        message: JSON.stringify(errors)
                    });
                }
                (0, utils_1.endSpan)(span, err);
            });
        });
    }
    _createExecuteSpan(operation, processedArgs) {
        const config = this.getConfig();
        const span = this.tracer.startSpan(enum_1.SpanNames.EXECUTE, {});
        if (operation) {
            const { operation: operationType, name: nameNode } = operation;
            span.setAttribute(AttributeNames_1.AttributeNames.OPERATION_TYPE, operationType);
            const operationName = nameNode?.value;
            // https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/instrumentation/graphql/
            // > The span name MUST be of the format <graphql.operation.type> <graphql.operation.name> provided that graphql.operation.type and graphql.operation.name are available.
            // > If graphql.operation.name is not available, the span SHOULD be named <graphql.operation.type>.
            if (operationName) {
                span.setAttribute(AttributeNames_1.AttributeNames.OPERATION_NAME, operationName);
                span.updateName(`${operationType} ${operationName}`);
            } else {
                span.updateName(operationType);
            }
        } else {
            let operationName = ' ';
            if (processedArgs.operationName) {
                operationName = ` "${processedArgs.operationName}" `;
            }
            operationName = internal_types_1.OPERATION_NOT_SUPPORTED.replace('$operationName$', operationName);
            span.setAttribute(AttributeNames_1.AttributeNames.OPERATION_NAME, operationName);
        }
        if (processedArgs.document?.loc) {
            (0, utils_1.addSpanSource)(span, processedArgs.document.loc, config.allowValues);
        }
        if (processedArgs.variableValues && config.allowValues) {
            (0, utils_1.addInputVariableAttributes)(span, processedArgs.variableValues);
        }
        return span;
    }
    _wrapExecuteArgs(schema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver, defaultFieldResolved) {
        if (!contextValue) {
            contextValue = {};
        }
        if (contextValue[symbols_1.OTEL_GRAPHQL_DATA_SYMBOL] || this.getConfig().ignoreResolveSpans) {
            return {
                schema,
                document,
                rootValue,
                contextValue,
                variableValues,
                operationName,
                fieldResolver,
                typeResolver
            };
        }
        const isUsingDefaultResolver = fieldResolver == null;
        // follows graphql implementation here:
        // https://github.com/graphql/graphql-js/blob/0b7daed9811731362c71900e12e5ea0d1ecc7f1f/src/execution/execute.ts#L494
        const fieldResolverForExecute = fieldResolver ?? defaultFieldResolved;
        fieldResolver = (0, utils_1.wrapFieldResolver)(this.tracer, ()=>this.getConfig(), fieldResolverForExecute, isUsingDefaultResolver);
        if (schema) {
            (0, utils_1.wrapFields)(schema.getQueryType(), this.tracer, ()=>this.getConfig());
            (0, utils_1.wrapFields)(schema.getMutationType(), this.tracer, ()=>this.getConfig());
        }
        return {
            schema,
            document,
            rootValue,
            contextValue,
            variableValues,
            operationName,
            fieldResolver,
            typeResolver
        };
    }
}
exports.GraphQLInstrumentation = GraphQLInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-graphql/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "GraphQLInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.GraphQLInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors, Aspecto
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_LISTENERS_SET = void 0;
exports.EVENT_LISTENERS_SET = Symbol('opentelemetry.instrumentation.kafkajs.eventListenersSet'); //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/propagator.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bufferTextMapGetter = void 0;
/*
same as open telemetry's `defaultTextMapGetter`,
but also handle case where header is buffer,
adding toString() to make sure string is returned
*/ exports.bufferTextMapGetter = {
    get (carrier, key) {
        if (!carrier) {
            return undefined;
        }
        const keys = Object.keys(carrier);
        for (const carrierKey of keys){
            if (carrierKey === key || carrierKey.toLowerCase() === key) {
                return carrier[carrierKey]?.toString();
            }
        }
        return undefined;
    },
    keys (carrier) {
        return carrier ? Object.keys(carrier) : [];
    }
}; //# sourceMappingURL=propagator.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.METRIC_MESSAGING_PROCESS_DURATION = exports.METRIC_MESSAGING_CLIENT_SENT_MESSAGES = exports.METRIC_MESSAGING_CLIENT_OPERATION_DURATION = exports.METRIC_MESSAGING_CLIENT_CONSUMED_MESSAGES = exports.MESSAGING_SYSTEM_VALUE_KAFKA = exports.MESSAGING_OPERATION_TYPE_VALUE_SEND = exports.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE = exports.MESSAGING_OPERATION_TYPE_VALUE_PROCESS = exports.ATTR_MESSAGING_SYSTEM = exports.ATTR_MESSAGING_OPERATION_TYPE = exports.ATTR_MESSAGING_OPERATION_NAME = exports.ATTR_MESSAGING_KAFKA_OFFSET = exports.ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE = exports.ATTR_MESSAGING_KAFKA_MESSAGE_KEY = exports.ATTR_MESSAGING_DESTINATION_PARTITION_ID = exports.ATTR_MESSAGING_DESTINATION_NAME = exports.ATTR_MESSAGING_BATCH_MESSAGE_COUNT = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * The number of messages sent, received, or processed in the scope of the batching operation.
 *
 * @example 0
 * @example 1
 * @example 2
 *
 * @note Instrumentations **SHOULD NOT** set `messaging.batch.message_count` on spans that operate with a single message. When a messaging client library supports both batch and single-message API for the same operation, instrumentations **SHOULD** use `messaging.batch.message_count` for batching APIs and **SHOULD NOT** use it for single-message APIs.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_BATCH_MESSAGE_COUNT = 'messaging.batch.message_count';
/**
 * The message destination name
 *
 * @example MyQueue
 * @example MyTopic
 *
 * @note Destination name **SHOULD** uniquely identify a specific queue, topic or other entity within the broker. If
 * the broker doesn't have such notion, the destination name **SHOULD** uniquely identify the broker.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_DESTINATION_NAME = 'messaging.destination.name';
/**
 * The identifier of the partition messages are sent to or received from, unique within the `messaging.destination.name`.
 *
 * @example "1"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_DESTINATION_PARTITION_ID = 'messaging.destination.partition.id';
/**
 * Message keys in Kafka are used for grouping alike messages to ensure they're processed on the same partition. They differ from `messaging.message.id` in that they're not unique. If the key is `null`, the attribute **MUST NOT** be set.
 *
 * @example "myKey"
 *
 * @note If the key type is not string, it's string representation has to be supplied for the attribute. If the key has no unambiguous, canonical string form, don't include its value.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_KAFKA_MESSAGE_KEY = 'messaging.kafka.message.key';
/**
 * A boolean that is true if the message is a tombstone.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE = 'messaging.kafka.message.tombstone';
/**
 * The offset of a record in the corresponding Kafka partition.
 *
 * @example 42
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_KAFKA_OFFSET = 'messaging.kafka.offset';
/**
 * The system-specific name of the messaging operation.
 *
 * @example ack
 * @example nack
 * @example send
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_OPERATION_NAME = 'messaging.operation.name';
/**
 * A string identifying the type of the messaging operation.
 *
 * @note If a custom value is used, it **MUST** be of low cardinality.
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_OPERATION_TYPE = 'messaging.operation.type';
/**
 * The messaging system as identified by the client instrumentation.
 *
 * @note The actual messaging system may differ from the one known by the client. For example, when using Kafka client libraries to communicate with Azure Event Hubs, the `messaging.system` is set to `kafka` based on the instrumentation's best knowledge.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_SYSTEM = 'messaging.system';
/**
 * Enum value "process" for attribute {@link ATTR_MESSAGING_OPERATION_TYPE}.
 */ exports.MESSAGING_OPERATION_TYPE_VALUE_PROCESS = 'process';
/**
 * Enum value "receive" for attribute {@link ATTR_MESSAGING_OPERATION_TYPE}.
 */ exports.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE = 'receive';
/**
 * Enum value "send" for attribute {@link ATTR_MESSAGING_OPERATION_TYPE}.
 */ exports.MESSAGING_OPERATION_TYPE_VALUE_SEND = 'send';
/**
 * Enum value "kafka" for attribute {@link ATTR_MESSAGING_SYSTEM}.
 */ exports.MESSAGING_SYSTEM_VALUE_KAFKA = 'kafka';
/**
 * Number of messages that were delivered to the application.
 *
 * @note Records the number of messages pulled from the broker or number of messages dispatched to the application in push-based scenarios.
 * The metric **SHOULD** be reported once per message delivery. For example, if receiving and processing operations are both instrumented for a single message delivery, this counter is incremented when the message is received and not reported when it is processed.
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.METRIC_MESSAGING_CLIENT_CONSUMED_MESSAGES = 'messaging.client.consumed.messages';
/**
 * Duration of messaging operation initiated by a producer or consumer client.
 *
 * @note This metric **SHOULD NOT** be used to report processing duration - processing duration is reported in `messaging.process.duration` metric.
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.METRIC_MESSAGING_CLIENT_OPERATION_DURATION = 'messaging.client.operation.duration';
/**
 * Number of messages producer attempted to send to the broker.
 *
 * @note This metric **MUST NOT** count messages that were created but haven't yet been sent.
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.METRIC_MESSAGING_CLIENT_SENT_MESSAGES = 'messaging.client.sent.messages';
/**
 * Duration of processing operation.
 *
 * @note This metric **MUST** be reported for operations with `messaging.operation.type` that matches `process`.
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.METRIC_MESSAGING_PROCESS_DURATION = 'messaging.process.duration'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.23.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-kafkajs'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
/*
 * Copyright The OpenTelemetry Authors, Aspecto
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KafkaJsInstrumentation = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/internal-types.js [app-rsc] (ecmascript)");
const propagator_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/propagator.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/semconv.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/version.js [app-rsc] (ecmascript)");
function prepareCounter(meter, value, attributes) {
    return (errorType)=>{
        meter.add(value, {
            ...attributes,
            ...errorType ? {
                [semantic_conventions_1.ATTR_ERROR_TYPE]: errorType
            } : {}
        });
    };
}
function prepareDurationHistogram(meter, value, attributes) {
    return (errorType)=>{
        meter.record((Date.now() - value) / 1000, {
            ...attributes,
            ...errorType ? {
                [semantic_conventions_1.ATTR_ERROR_TYPE]: errorType
            } : {}
        });
    };
}
const HISTOGRAM_BUCKET_BOUNDARIES = [
    0.005,
    0.01,
    0.025,
    0.05,
    0.075,
    0.1,
    0.25,
    0.5,
    0.75,
    1,
    2.5,
    5,
    7.5,
    10
];
class KafkaJsInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    _updateMetricInstruments() {
        this._clientDuration = this.meter.createHistogram(semconv_1.METRIC_MESSAGING_CLIENT_OPERATION_DURATION, {
            advice: {
                explicitBucketBoundaries: HISTOGRAM_BUCKET_BOUNDARIES
            }
        });
        this._sentMessages = this.meter.createCounter(semconv_1.METRIC_MESSAGING_CLIENT_SENT_MESSAGES);
        this._consumedMessages = this.meter.createCounter(semconv_1.METRIC_MESSAGING_CLIENT_CONSUMED_MESSAGES);
        this._processDuration = this.meter.createHistogram(semconv_1.METRIC_MESSAGING_PROCESS_DURATION, {
            advice: {
                explicitBucketBoundaries: HISTOGRAM_BUCKET_BOUNDARIES
            }
        });
    }
    init() {
        const unpatch = (moduleExports)=>{
            if ((0, instrumentation_1.isWrapped)(moduleExports?.Kafka?.prototype.producer)) {
                this._unwrap(moduleExports.Kafka.prototype, 'producer');
            }
            if ((0, instrumentation_1.isWrapped)(moduleExports?.Kafka?.prototype.consumer)) {
                this._unwrap(moduleExports.Kafka.prototype, 'consumer');
            }
        };
        const module = new instrumentation_1.InstrumentationNodeModuleDefinition('kafkajs', [
            '>=0.3.0 <3'
        ], (moduleExports)=>{
            unpatch(moduleExports);
            this._wrap(moduleExports?.Kafka?.prototype, 'producer', this._getProducerPatch());
            this._wrap(moduleExports?.Kafka?.prototype, 'consumer', this._getConsumerPatch());
            return moduleExports;
        }, unpatch);
        return module;
    }
    _getConsumerPatch() {
        const instrumentation = this;
        return (original)=>{
            return function consumer(...args) {
                const newConsumer = original.apply(this, args);
                if ((0, instrumentation_1.isWrapped)(newConsumer.run)) {
                    instrumentation._unwrap(newConsumer, 'run');
                }
                instrumentation._wrap(newConsumer, 'run', instrumentation._getConsumerRunPatch());
                instrumentation._setKafkaEventListeners(newConsumer);
                return newConsumer;
            };
        };
    }
    _setKafkaEventListeners(kafkaObj) {
        if (kafkaObj[internal_types_1.EVENT_LISTENERS_SET]) return;
        // The REQUEST Consumer event was added in kafkajs@1.5.0.
        if (kafkaObj.events?.REQUEST) {
            kafkaObj.on(kafkaObj.events.REQUEST, this._recordClientDurationMetric.bind(this));
        }
        kafkaObj[internal_types_1.EVENT_LISTENERS_SET] = true;
    }
    _recordClientDurationMetric(event) {
        const [address, port] = event.payload.broker.split(':');
        this._clientDuration.record(event.payload.duration / 1000, {
            [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
            [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: `${event.payload.apiName}`,
            [semantic_conventions_1.ATTR_SERVER_ADDRESS]: address,
            [semantic_conventions_1.ATTR_SERVER_PORT]: Number.parseInt(port, 10)
        });
    }
    _getProducerPatch() {
        const instrumentation = this;
        return (original)=>{
            return function consumer(...args) {
                const newProducer = original.apply(this, args);
                if ((0, instrumentation_1.isWrapped)(newProducer.sendBatch)) {
                    instrumentation._unwrap(newProducer, 'sendBatch');
                }
                instrumentation._wrap(newProducer, 'sendBatch', instrumentation._getSendBatchPatch());
                if ((0, instrumentation_1.isWrapped)(newProducer.send)) {
                    instrumentation._unwrap(newProducer, 'send');
                }
                instrumentation._wrap(newProducer, 'send', instrumentation._getSendPatch());
                if ((0, instrumentation_1.isWrapped)(newProducer.transaction)) {
                    instrumentation._unwrap(newProducer, 'transaction');
                }
                instrumentation._wrap(newProducer, 'transaction', instrumentation._getProducerTransactionPatch());
                instrumentation._setKafkaEventListeners(newProducer);
                return newProducer;
            };
        };
    }
    _getConsumerRunPatch() {
        const instrumentation = this;
        return (original)=>{
            return function run(...args) {
                const config = args[0];
                if (config?.eachMessage) {
                    if ((0, instrumentation_1.isWrapped)(config.eachMessage)) {
                        instrumentation._unwrap(config, 'eachMessage');
                    }
                    instrumentation._wrap(config, 'eachMessage', instrumentation._getConsumerEachMessagePatch());
                }
                if (config?.eachBatch) {
                    if ((0, instrumentation_1.isWrapped)(config.eachBatch)) {
                        instrumentation._unwrap(config, 'eachBatch');
                    }
                    instrumentation._wrap(config, 'eachBatch', instrumentation._getConsumerEachBatchPatch());
                }
                return original.call(this, config);
            };
        };
    }
    _getConsumerEachMessagePatch() {
        const instrumentation = this;
        return (original)=>{
            return function eachMessage(...args) {
                const payload = args[0];
                const propagatedContext = api_1.propagation.extract(api_1.ROOT_CONTEXT, payload.message.headers, propagator_1.bufferTextMapGetter);
                const span = instrumentation._startConsumerSpan({
                    topic: payload.topic,
                    message: payload.message,
                    operationType: semconv_1.MESSAGING_OPERATION_TYPE_VALUE_PROCESS,
                    ctx: propagatedContext,
                    attributes: {
                        [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.partition)
                    }
                });
                const pendingMetrics = [
                    prepareDurationHistogram(instrumentation._processDuration, Date.now(), {
                        [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                        [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'process',
                        [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: payload.topic,
                        [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.partition)
                    }),
                    prepareCounter(instrumentation._consumedMessages, 1, {
                        [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                        [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'process',
                        [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: payload.topic,
                        [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.partition)
                    })
                ];
                const eachMessagePromise = api_1.context.with(api_1.trace.setSpan(propagatedContext, span), ()=>{
                    return original.apply(this, args);
                });
                return instrumentation._endSpansOnPromise([
                    span
                ], pendingMetrics, eachMessagePromise);
            };
        };
    }
    _getConsumerEachBatchPatch() {
        return (original)=>{
            const instrumentation = this;
            return function eachBatch(...args) {
                const payload = args[0];
                // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/semantic_conventions/messaging.md#topic-with-multiple-consumers
                const receivingSpan = instrumentation._startConsumerSpan({
                    topic: payload.batch.topic,
                    message: undefined,
                    operationType: semconv_1.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE,
                    ctx: api_1.ROOT_CONTEXT,
                    attributes: {
                        [semconv_1.ATTR_MESSAGING_BATCH_MESSAGE_COUNT]: payload.batch.messages.length,
                        [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.batch.partition)
                    }
                });
                return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), receivingSpan), ()=>{
                    const startTime = Date.now();
                    const spans = [];
                    const pendingMetrics = [
                        prepareCounter(instrumentation._consumedMessages, payload.batch.messages.length, {
                            [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                            [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'process',
                            [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: payload.batch.topic,
                            [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.batch.partition)
                        })
                    ];
                    payload.batch.messages.forEach((message)=>{
                        const propagatedContext = api_1.propagation.extract(api_1.ROOT_CONTEXT, message.headers, propagator_1.bufferTextMapGetter);
                        const spanContext = api_1.trace.getSpan(propagatedContext)?.spanContext();
                        let origSpanLink;
                        if (spanContext) {
                            origSpanLink = {
                                context: spanContext
                            };
                        }
                        spans.push(instrumentation._startConsumerSpan({
                            topic: payload.batch.topic,
                            message,
                            operationType: semconv_1.MESSAGING_OPERATION_TYPE_VALUE_PROCESS,
                            link: origSpanLink,
                            attributes: {
                                [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.batch.partition)
                            }
                        }));
                        pendingMetrics.push(prepareDurationHistogram(instrumentation._processDuration, startTime, {
                            [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                            [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'process',
                            [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: payload.batch.topic,
                            [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(payload.batch.partition)
                        }));
                    });
                    const batchMessagePromise = original.apply(this, args);
                    spans.unshift(receivingSpan);
                    return instrumentation._endSpansOnPromise(spans, pendingMetrics, batchMessagePromise);
                });
            };
        };
    }
    _getProducerTransactionPatch() {
        const instrumentation = this;
        return (original)=>{
            return function transaction(...args) {
                const transactionSpan = instrumentation.tracer.startSpan('transaction');
                const transactionPromise = original.apply(this, args);
                transactionPromise.then((transaction)=>{
                    const originalSend = transaction.send;
                    transaction.send = function send(...args) {
                        return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), transactionSpan), ()=>{
                            const patched = instrumentation._getSendPatch()(originalSend);
                            return patched.apply(this, args).catch((err)=>{
                                transactionSpan.setStatus({
                                    code: api_1.SpanStatusCode.ERROR,
                                    message: err?.message
                                });
                                transactionSpan.recordException(err);
                                throw err;
                            });
                        });
                    };
                    const originalSendBatch = transaction.sendBatch;
                    transaction.sendBatch = function sendBatch(...args) {
                        return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), transactionSpan), ()=>{
                            const patched = instrumentation._getSendBatchPatch()(originalSendBatch);
                            return patched.apply(this, args).catch((err)=>{
                                transactionSpan.setStatus({
                                    code: api_1.SpanStatusCode.ERROR,
                                    message: err?.message
                                });
                                transactionSpan.recordException(err);
                                throw err;
                            });
                        });
                    };
                    const originalCommit = transaction.commit;
                    transaction.commit = function commit(...args) {
                        const originCommitPromise = originalCommit.apply(this, args).then(()=>{
                            transactionSpan.setStatus({
                                code: api_1.SpanStatusCode.OK
                            });
                        });
                        return instrumentation._endSpansOnPromise([
                            transactionSpan
                        ], [], originCommitPromise);
                    };
                    const originalAbort = transaction.abort;
                    transaction.abort = function abort(...args) {
                        const originAbortPromise = originalAbort.apply(this, args);
                        return instrumentation._endSpansOnPromise([
                            transactionSpan
                        ], [], originAbortPromise);
                    };
                }).catch((err)=>{
                    transactionSpan.setStatus({
                        code: api_1.SpanStatusCode.ERROR,
                        message: err?.message
                    });
                    transactionSpan.recordException(err);
                    transactionSpan.end();
                });
                return transactionPromise;
            };
        };
    }
    _getSendBatchPatch() {
        const instrumentation = this;
        return (original)=>{
            return function sendBatch(...args) {
                const batch = args[0];
                const messages = batch.topicMessages || [];
                const spans = [];
                const pendingMetrics = [];
                messages.forEach((topicMessage)=>{
                    topicMessage.messages.forEach((message)=>{
                        spans.push(instrumentation._startProducerSpan(topicMessage.topic, message));
                        pendingMetrics.push(prepareCounter(instrumentation._sentMessages, 1, {
                            [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                            [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'send',
                            [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: topicMessage.topic,
                            ...message.partition !== undefined ? {
                                [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(message.partition)
                            } : {}
                        }));
                    });
                });
                const origSendResult = original.apply(this, args);
                return instrumentation._endSpansOnPromise(spans, pendingMetrics, origSendResult);
            };
        };
    }
    _getSendPatch() {
        const instrumentation = this;
        return (original)=>{
            return function send(...args) {
                const record = args[0];
                const spans = record.messages.map((message)=>{
                    return instrumentation._startProducerSpan(record.topic, message);
                });
                const pendingMetrics = record.messages.map((m)=>prepareCounter(instrumentation._sentMessages, 1, {
                        [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                        [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'send',
                        [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: record.topic,
                        ...m.partition !== undefined ? {
                            [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: String(m.partition)
                        } : {}
                    }));
                const origSendResult = original.apply(this, args);
                return instrumentation._endSpansOnPromise(spans, pendingMetrics, origSendResult);
            };
        };
    }
    _endSpansOnPromise(spans, pendingMetrics, sendPromise) {
        return Promise.resolve(sendPromise).then((result)=>{
            pendingMetrics.forEach((m)=>m());
            return result;
        }).catch((reason)=>{
            let errorMessage;
            let errorType = semantic_conventions_1.ERROR_TYPE_VALUE_OTHER;
            if (typeof reason === 'string' || reason === undefined) {
                errorMessage = reason;
            } else if (typeof reason === 'object' && Object.prototype.hasOwnProperty.call(reason, 'message')) {
                errorMessage = reason.message;
                errorType = reason.constructor.name;
            }
            pendingMetrics.forEach((m)=>m(errorType));
            spans.forEach((span)=>{
                span.setAttribute(semantic_conventions_1.ATTR_ERROR_TYPE, errorType);
                span.setStatus({
                    code: api_1.SpanStatusCode.ERROR,
                    message: errorMessage
                });
            });
            throw reason;
        }).finally(()=>{
            spans.forEach((span)=>span.end());
        });
    }
    _startConsumerSpan({ topic, message, operationType, ctx, link, attributes }) {
        const operationName = operationType === semconv_1.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE ? 'poll' // for batch processing spans
         : operationType; // for individual message processing spans
        const span = this.tracer.startSpan(`${operationName} ${topic}`, {
            kind: operationType === semconv_1.MESSAGING_OPERATION_TYPE_VALUE_RECEIVE ? api_1.SpanKind.CLIENT : api_1.SpanKind.CONSUMER,
            attributes: {
                ...attributes,
                [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: topic,
                [semconv_1.ATTR_MESSAGING_OPERATION_TYPE]: operationType,
                [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: operationName,
                [semconv_1.ATTR_MESSAGING_KAFKA_MESSAGE_KEY]: message?.key ? String(message.key) : undefined,
                [semconv_1.ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE]: message?.key && message.value === null ? true : undefined,
                [semconv_1.ATTR_MESSAGING_KAFKA_OFFSET]: message?.offset
            },
            links: link ? [
                link
            ] : []
        }, ctx);
        const { consumerHook } = this.getConfig();
        if (consumerHook && message) {
            (0, instrumentation_1.safeExecuteInTheMiddle)(()=>consumerHook(span, {
                    topic,
                    message
                }), (e)=>{
                if (e) this._diag.error('consumerHook error', e);
            }, true);
        }
        return span;
    }
    _startProducerSpan(topic, message) {
        const span = this.tracer.startSpan(`send ${topic}`, {
            kind: api_1.SpanKind.PRODUCER,
            attributes: {
                [semconv_1.ATTR_MESSAGING_SYSTEM]: semconv_1.MESSAGING_SYSTEM_VALUE_KAFKA,
                [semconv_1.ATTR_MESSAGING_DESTINATION_NAME]: topic,
                [semconv_1.ATTR_MESSAGING_KAFKA_MESSAGE_KEY]: message.key ? String(message.key) : undefined,
                [semconv_1.ATTR_MESSAGING_KAFKA_MESSAGE_TOMBSTONE]: message.key && message.value === null ? true : undefined,
                [semconv_1.ATTR_MESSAGING_DESTINATION_PARTITION_ID]: message.partition !== undefined ? String(message.partition) : undefined,
                [semconv_1.ATTR_MESSAGING_OPERATION_NAME]: 'send',
                [semconv_1.ATTR_MESSAGING_OPERATION_TYPE]: semconv_1.MESSAGING_OPERATION_TYPE_VALUE_SEND
            }
        });
        message.headers = message.headers ?? {};
        api_1.propagation.inject(api_1.trace.setSpan(api_1.context.active(), span), message.headers);
        const { producerHook } = this.getConfig();
        if (producerHook) {
            (0, instrumentation_1.safeExecuteInTheMiddle)(()=>producerHook(span, {
                    topic,
                    message
                }), (e)=>{
                if (e) this._diag.error('producerHook error', e);
            }, true);
        }
        return span;
    }
}
exports.KafkaJsInstrumentation = KafkaJsInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors, Aspecto
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KafkaJsInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-kafkajs/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "KafkaJsInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.KafkaJsInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-lru-memoizer/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.58.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-lru-memoizer'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-lru-memoizer/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LruMemoizerInstrumentation = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-lru-memoizer/build/src/version.js [app-rsc] (ecmascript)");
class LruMemoizerInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition('lru-memoizer', [
                '>=1.3 <4'
            ], (moduleExports)=>{
                // moduleExports is a function which receives an options object,
                // and returns a "memoizer" function upon invocation.
                // We want to patch this "memoizer's" internal function
                const asyncMemoizer = function() {
                    // This following function is invoked every time the user wants to get a (possible) memoized value
                    // We replace it with another function in which we bind the current context to the last argument (callback)
                    const origMemoizer = moduleExports.apply(this, arguments);
                    return function() {
                        const modifiedArguments = [
                            ...arguments
                        ];
                        // last argument is the callback
                        const origCallback = modifiedArguments.pop();
                        const callbackWithContext = typeof origCallback === 'function' ? api_1.context.bind(api_1.context.active(), origCallback) : origCallback;
                        modifiedArguments.push(callbackWithContext);
                        return origMemoizer.apply(this, modifiedArguments);
                    };
                };
                // sync function preserves context, but we still need to export it
                // as the lru-memoizer package does
                asyncMemoizer.sync = moduleExports.sync;
                return asyncMemoizer;
            }, undefined // no need to disable as this instrumentation does not create any spans
            )
        ];
    }
}
exports.LruMemoizerInstrumentation = LruMemoizerInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-lru-memoizer/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LruMemoizerInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-lru-memoizer/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "LruMemoizerInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.LruMemoizerInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.METRIC_DB_CLIENT_CONNECTIONS_USAGE = exports.DB_SYSTEM_VALUE_MONGODB = exports.DB_SYSTEM_NAME_VALUE_MONGODB = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_OPERATION = exports.ATTR_DB_NAME = exports.ATTR_DB_MONGODB_COLLECTION = exports.ATTR_DB_CONNECTION_STRING = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `server.address`, `server.port` attributes instead.
 *
 * @example "Server=(localdb)\\v11.0;Integrated Security=true;"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` and `server.port`.
 */ exports.ATTR_DB_CONNECTION_STRING = 'db.connection_string';
/**
 * Deprecated, use `db.collection.name` instead.
 *
 * @example "mytable"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.collection.name`.
 */ exports.ATTR_DB_MONGODB_COLLECTION = 'db.mongodb.collection';
/**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * Deprecated, use `db.operation.name` instead.
 *
 * @example findAndModify
 * @example HMSET
 * @example SELECT
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.operation.name`.
 */ exports.ATTR_DB_OPERATION = 'db.operation';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Enum value "mongodb" for attribute {@link ATTR_DB_SYSTEM_NAME}.
 *
 * [MongoDB](https://www.mongodb.com/)
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_NAME_VALUE_MONGODB = 'mongodb';
/**
 * Enum value "mongodb" for attribute {@link ATTR_DB_SYSTEM}.
 *
 * MongoDB
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_VALUE_MONGODB = 'mongodb';
/**
 * Deprecated, use `db.client.connection.count` instead.
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.client.connection.count`.
 */ exports.METRIC_DB_CLIENT_CONNECTIONS_USAGE = 'db.client.connections.usage'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongodbCommandType = void 0;
var MongodbCommandType;
(function(MongodbCommandType) {
    MongodbCommandType["CREATE_INDEXES"] = "createIndexes";
    MongodbCommandType["FIND_AND_MODIFY"] = "findAndModify";
    MongodbCommandType["IS_MASTER"] = "isMaster";
    MongodbCommandType["COUNT"] = "count";
    MongodbCommandType["AGGREGATE"] = "aggregate";
    MongodbCommandType["UNKNOWN"] = "unknown";
})(MongodbCommandType = exports.MongodbCommandType || (exports.MongodbCommandType = {})); //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.67.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-mongodb'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongoDBInstrumentation = void 0;
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
 */ const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/semconv.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/internal-types.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/version.js [app-rsc] (ecmascript)");
const DEFAULT_CONFIG = {
    requireParentSpan: true
};
/** mongodb instrumentation plugin for OpenTelemetry */ class MongoDBInstrumentation extends instrumentation_1.InstrumentationBase {
    _netSemconvStability;
    _dbSemconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, {
            ...DEFAULT_CONFIG,
            ...config
        });
        this._setSemconvStabilityFromEnv();
    }
    // Used for testing.
    _setSemconvStabilityFromEnv() {
        this._netSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
        this._dbSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    setConfig(config = {}) {
        super.setConfig({
            ...DEFAULT_CONFIG,
            ...config
        });
    }
    _updateMetricInstruments() {
        this._connectionsUsage = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTIONS_USAGE, {
            description: 'The number of connections that are currently in state described by the state attribute.',
            unit: '{connection}'
        });
    }
    /**
     * Convenience function for updating the `db.client.connections.usage` metric.
     * The name "count" comes from the eventual replacement for this metric per
     * https://opentelemetry.io/docs/specs/semconv/non-normative/db-migration/#database-client-connection-count
     */ _connCountAdd(n, poolName, state) {
        this._connectionsUsage?.add(n, {
            'pool.name': poolName,
            state
        });
    }
    init() {
        const { v3PatchConnection: v3PatchConnection, v3UnpatchConnection: v3UnpatchConnection } = this._getV3ConnectionPatches();
        const { v4PatchConnect, v4UnpatchConnect } = this._getV4ConnectPatches();
        const { v4PatchConnectionCallback, v4PatchConnectionPromise, v4UnpatchConnection } = this._getV4ConnectionPatches();
        const { v4PatchConnectionPool, v4UnpatchConnectionPool } = this._getV4ConnectionPoolPatches();
        const { v4PatchSessions, v4UnpatchSessions } = this._getV4SessionsPatches();
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition('mongodb', [
                '>=3.3.0 <4'
            ], undefined, undefined, [
                new instrumentation_1.InstrumentationNodeModuleFile('mongodb/lib/core/wireprotocol/index.js', [
                    '>=3.3.0 <4'
                ], v3PatchConnection, v3UnpatchConnection)
            ]),
            new instrumentation_1.InstrumentationNodeModuleDefinition('mongodb', [
                '>=4.0.0 <8'
            ], undefined, undefined, [
                new instrumentation_1.InstrumentationNodeModuleFile('mongodb/lib/cmap/connection.js', [
                    '>=4.0.0 <6.4'
                ], v4PatchConnectionCallback, v4UnpatchConnection),
                new instrumentation_1.InstrumentationNodeModuleFile('mongodb/lib/cmap/connection.js', [
                    '>=6.4.0 <8'
                ], v4PatchConnectionPromise, v4UnpatchConnection),
                new instrumentation_1.InstrumentationNodeModuleFile('mongodb/lib/cmap/connection_pool.js', [
                    '>=4.0.0 <6.4'
                ], v4PatchConnectionPool, v4UnpatchConnectionPool),
                new instrumentation_1.InstrumentationNodeModuleFile('mongodb/lib/cmap/connect.js', [
                    '>=4.0.0 <8'
                ], v4PatchConnect, v4UnpatchConnect),
                new instrumentation_1.InstrumentationNodeModuleFile('mongodb/lib/sessions.js', [
                    '>=4.0.0 <8'
                ], v4PatchSessions, v4UnpatchSessions)
            ])
        ];
    }
    _getV3ConnectionPatches() {
        return {
            v3PatchConnection: (moduleExports)=>{
                // patch insert operation
                if ((0, instrumentation_1.isWrapped)(moduleExports.insert)) {
                    this._unwrap(moduleExports, 'insert');
                }
                this._wrap(moduleExports, 'insert', this._getV3PatchOperation('insert'));
                // patch remove operation
                if ((0, instrumentation_1.isWrapped)(moduleExports.remove)) {
                    this._unwrap(moduleExports, 'remove');
                }
                this._wrap(moduleExports, 'remove', this._getV3PatchOperation('remove'));
                // patch update operation
                if ((0, instrumentation_1.isWrapped)(moduleExports.update)) {
                    this._unwrap(moduleExports, 'update');
                }
                this._wrap(moduleExports, 'update', this._getV3PatchOperation('update'));
                // patch other command
                if ((0, instrumentation_1.isWrapped)(moduleExports.command)) {
                    this._unwrap(moduleExports, 'command');
                }
                this._wrap(moduleExports, 'command', this._getV3PatchCommand());
                // patch query
                if ((0, instrumentation_1.isWrapped)(moduleExports.query)) {
                    this._unwrap(moduleExports, 'query');
                }
                this._wrap(moduleExports, 'query', this._getV3PatchFind());
                // patch get more operation on cursor
                if ((0, instrumentation_1.isWrapped)(moduleExports.getMore)) {
                    this._unwrap(moduleExports, 'getMore');
                }
                this._wrap(moduleExports, 'getMore', this._getV3PatchCursor());
                return moduleExports;
            },
            v3UnpatchConnection: (moduleExports)=>{
                if (moduleExports === undefined) return;
                this._unwrap(moduleExports, 'insert');
                this._unwrap(moduleExports, 'remove');
                this._unwrap(moduleExports, 'update');
                this._unwrap(moduleExports, 'command');
                this._unwrap(moduleExports, 'query');
                this._unwrap(moduleExports, 'getMore');
            }
        };
    }
    _getV4SessionsPatches() {
        return {
            v4PatchSessions: (moduleExports)=>{
                if ((0, instrumentation_1.isWrapped)(moduleExports.acquire)) {
                    this._unwrap(moduleExports, 'acquire');
                }
                this._wrap(moduleExports.ServerSessionPool.prototype, 'acquire', this._getV4AcquireCommand());
                if ((0, instrumentation_1.isWrapped)(moduleExports.release)) {
                    this._unwrap(moduleExports, 'release');
                }
                this._wrap(moduleExports.ServerSessionPool.prototype, 'release', this._getV4ReleaseCommand());
                return moduleExports;
            },
            v4UnpatchSessions: (moduleExports)=>{
                if (moduleExports === undefined) return;
                if ((0, instrumentation_1.isWrapped)(moduleExports.acquire)) {
                    this._unwrap(moduleExports, 'acquire');
                }
                if ((0, instrumentation_1.isWrapped)(moduleExports.release)) {
                    this._unwrap(moduleExports, 'release');
                }
            }
        };
    }
    _getV4AcquireCommand() {
        const instrumentation = this;
        return (original)=>{
            return function patchAcquire() {
                const nSessionsBeforeAcquire = this.sessions.length;
                const session = original.call(this);
                const nSessionsAfterAcquire = this.sessions.length;
                if (nSessionsBeforeAcquire === nSessionsAfterAcquire) {
                    //no session in the pool. a new session was created and used
                    instrumentation._connCountAdd(1, instrumentation._poolName, 'used');
                } else if (nSessionsBeforeAcquire - 1 === nSessionsAfterAcquire) {
                    //a session was already in the pool. remove it from the pool and use it.
                    instrumentation._connCountAdd(-1, instrumentation._poolName, 'idle');
                    instrumentation._connCountAdd(1, instrumentation._poolName, 'used');
                }
                return session;
            };
        };
    }
    _getV4ReleaseCommand() {
        const instrumentation = this;
        return (original)=>{
            return function patchRelease(session) {
                const cmdPromise = original.call(this, session);
                instrumentation._connCountAdd(-1, instrumentation._poolName, 'used');
                instrumentation._connCountAdd(1, instrumentation._poolName, 'idle');
                return cmdPromise;
            };
        };
    }
    _getV4ConnectionPoolPatches() {
        return {
            v4PatchConnectionPool: (moduleExports)=>{
                const poolPrototype = moduleExports.ConnectionPool.prototype;
                if ((0, instrumentation_1.isWrapped)(poolPrototype.checkOut)) {
                    this._unwrap(poolPrototype, 'checkOut');
                }
                this._wrap(poolPrototype, 'checkOut', this._getV4ConnectionPoolCheckOut());
                return moduleExports;
            },
            v4UnpatchConnectionPool: (moduleExports)=>{
                if (moduleExports === undefined) return;
                this._unwrap(moduleExports.ConnectionPool.prototype, 'checkOut');
            }
        };
    }
    _getV4ConnectPatches() {
        return {
            v4PatchConnect: (moduleExports)=>{
                if ((0, instrumentation_1.isWrapped)(moduleExports.connect)) {
                    this._unwrap(moduleExports, 'connect');
                }
                this._wrap(moduleExports, 'connect', this._getV4ConnectCommand());
                return moduleExports;
            },
            v4UnpatchConnect: (moduleExports)=>{
                if (moduleExports === undefined) return;
                this._unwrap(moduleExports, 'connect');
            }
        };
    }
    // This patch will become unnecessary once
    // https://jira.mongodb.org/browse/NODE-5639 is done.
    _getV4ConnectionPoolCheckOut() {
        return (original)=>{
            return function patchedCheckout(callback) {
                const patchedCallback = api_1.context.bind(api_1.context.active(), callback);
                return original.call(this, patchedCallback);
            };
        };
    }
    _getV4ConnectCommand() {
        const instrumentation = this;
        return (original)=>{
            return function patchedConnect(options, callback) {
                // from v6.4 `connect` method only accepts an options param and returns a promise
                // with the connection
                if (original.length === 1) {
                    const result = original.call(this, options);
                    if (result && typeof result.then === 'function') {
                        result.then(()=>instrumentation.setPoolName(options), // this handler is set to pass the lint rules
                        ()=>undefined);
                    }
                    return result;
                }
                // Earlier versions expects a callback param and return void
                const patchedCallback = function(err, conn) {
                    if (err || !conn) {
                        callback(err, conn);
                        return;
                    }
                    instrumentation.setPoolName(options);
                    callback(err, conn);
                };
                return original.call(this, options, patchedCallback);
            };
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _getV4ConnectionPatches() {
        return {
            v4PatchConnectionCallback: (moduleExports)=>{
                // patch insert operation
                if ((0, instrumentation_1.isWrapped)(moduleExports.Connection.prototype.command)) {
                    this._unwrap(moduleExports.Connection.prototype, 'command');
                }
                this._wrap(moduleExports.Connection.prototype, 'command', this._getV4PatchCommandCallback());
                return moduleExports;
            },
            v4PatchConnectionPromise: (moduleExports)=>{
                // patch insert operation
                if ((0, instrumentation_1.isWrapped)(moduleExports.Connection.prototype.command)) {
                    this._unwrap(moduleExports.Connection.prototype, 'command');
                }
                this._wrap(moduleExports.Connection.prototype, 'command', this._getV4PatchCommandPromise());
                return moduleExports;
            },
            v4UnpatchConnection: (moduleExports)=>{
                if (moduleExports === undefined) return;
                this._unwrap(moduleExports.Connection.prototype, 'command');
            }
        };
    }
    /** Creates spans for common operations */ _getV3PatchOperation(operationName) {
        const instrumentation = this;
        return (original)=>{
            return function patchedServerCommand(server, ns, ops, options, callback) {
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
                const resultHandler = typeof options === 'function' ? options : callback;
                if (skipInstrumentation || typeof resultHandler !== 'function' || typeof ops !== 'object') {
                    if (typeof options === 'function') {
                        return original.call(this, server, ns, ops, options);
                    } else {
                        return original.call(this, server, ns, ops, options, callback);
                    }
                }
                const attributes = instrumentation._getV3SpanAttributes(ns, server, // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ops[0], operationName);
                const spanName = instrumentation._spanNameFromAttrs(attributes);
                const span = instrumentation.tracer.startSpan(spanName, {
                    kind: api_1.SpanKind.CLIENT,
                    attributes
                });
                const patchedCallback = instrumentation._patchEnd(span, resultHandler);
                // handle when options is the callback to send the correct number of args
                if (typeof options === 'function') {
                    return original.call(this, server, ns, ops, patchedCallback);
                } else {
                    return original.call(this, server, ns, ops, options, patchedCallback);
                }
            };
        };
    }
    /** Creates spans for command operation */ _getV3PatchCommand() {
        const instrumentation = this;
        return (original)=>{
            return function patchedServerCommand(server, ns, cmd, options, callback) {
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
                const resultHandler = typeof options === 'function' ? options : callback;
                if (skipInstrumentation || typeof resultHandler !== 'function' || typeof cmd !== 'object') {
                    if (typeof options === 'function') {
                        return original.call(this, server, ns, cmd, options);
                    } else {
                        return original.call(this, server, ns, cmd, options, callback);
                    }
                }
                const commandType = MongoDBInstrumentation._getCommandType(cmd);
                const operationName = commandType === internal_types_1.MongodbCommandType.UNKNOWN ? undefined : commandType;
                const attributes = instrumentation._getV3SpanAttributes(ns, server, cmd, operationName);
                const spanName = instrumentation._spanNameFromAttrs(attributes);
                const span = instrumentation.tracer.startSpan(spanName, {
                    kind: api_1.SpanKind.CLIENT,
                    attributes
                });
                const patchedCallback = instrumentation._patchEnd(span, resultHandler);
                // handle when options is the callback to send the correct number of args
                if (typeof options === 'function') {
                    return original.call(this, server, ns, cmd, patchedCallback);
                } else {
                    return original.call(this, server, ns, cmd, options, patchedCallback);
                }
            };
        };
    }
    /** Creates spans for command operation */ _getV4PatchCommandCallback() {
        const instrumentation = this;
        return (original)=>{
            return function patchedV4ServerCommand(ns, cmd, options, callback) {
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
                const resultHandler = callback;
                const commandType = Object.keys(cmd)[0];
                if (typeof cmd !== 'object' || cmd.ismaster || cmd.hello) {
                    return original.call(this, ns, cmd, options, callback);
                }
                let span = undefined;
                if (!skipInstrumentation) {
                    const attributes = instrumentation._getV4SpanAttributes(this, ns, cmd, commandType);
                    const spanName = instrumentation._spanNameFromAttrs(attributes);
                    span = instrumentation.tracer.startSpan(spanName, {
                        kind: api_1.SpanKind.CLIENT,
                        attributes
                    });
                }
                const patchedCallback = instrumentation._patchEnd(span, resultHandler, this.id, commandType);
                return original.call(this, ns, cmd, options, patchedCallback);
            };
        };
    }
    _getV4PatchCommandPromise() {
        const instrumentation = this;
        return (original)=>{
            return function patchedV4ServerCommand(...args) {
                const [ns, cmd] = args;
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
                const commandType = Object.keys(cmd)[0];
                const resultHandler = ()=>undefined;
                if (typeof cmd !== 'object' || cmd.ismaster || cmd.hello) {
                    return original.apply(this, args);
                }
                let span = undefined;
                if (!skipInstrumentation) {
                    const attributes = instrumentation._getV4SpanAttributes(this, ns, cmd, commandType);
                    const spanName = instrumentation._spanNameFromAttrs(attributes);
                    span = instrumentation.tracer.startSpan(spanName, {
                        kind: api_1.SpanKind.CLIENT,
                        attributes
                    });
                }
                const patchedCallback = instrumentation._patchEnd(span, resultHandler, this.id, commandType);
                const result = original.apply(this, args);
                result.then((res)=>patchedCallback(null, res), (err)=>patchedCallback(err));
                return result;
            };
        };
    }
    /** Creates spans for find operation */ _getV3PatchFind() {
        const instrumentation = this;
        return (original)=>{
            return function patchedServerCommand(server, ns, cmd, cursorState, options, callback) {
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
                const resultHandler = typeof options === 'function' ? options : callback;
                if (skipInstrumentation || typeof resultHandler !== 'function' || typeof cmd !== 'object') {
                    if (typeof options === 'function') {
                        return original.call(this, server, ns, cmd, cursorState, options);
                    } else {
                        return original.call(this, server, ns, cmd, cursorState, options, callback);
                    }
                }
                const attributes = instrumentation._getV3SpanAttributes(ns, server, cmd, 'find');
                const spanName = instrumentation._spanNameFromAttrs(attributes);
                const span = instrumentation.tracer.startSpan(spanName, {
                    kind: api_1.SpanKind.CLIENT,
                    attributes
                });
                const patchedCallback = instrumentation._patchEnd(span, resultHandler);
                // handle when options is the callback to send the correct number of args
                if (typeof options === 'function') {
                    return original.call(this, server, ns, cmd, cursorState, patchedCallback);
                } else {
                    return original.call(this, server, ns, cmd, cursorState, options, patchedCallback);
                }
            };
        };
    }
    /** Creates spans for find operation */ _getV3PatchCursor() {
        const instrumentation = this;
        return (original)=>{
            return function patchedServerCommand(server, ns, cursorState, batchSize, options, callback) {
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
                const resultHandler = typeof options === 'function' ? options : callback;
                if (skipInstrumentation || typeof resultHandler !== 'function') {
                    if (typeof options === 'function') {
                        return original.call(this, server, ns, cursorState, batchSize, options);
                    } else {
                        return original.call(this, server, ns, cursorState, batchSize, options, callback);
                    }
                }
                const attributes = instrumentation._getV3SpanAttributes(ns, server, cursorState.cmd, 'getMore');
                const spanName = instrumentation._spanNameFromAttrs(attributes);
                const span = instrumentation.tracer.startSpan(spanName, {
                    kind: api_1.SpanKind.CLIENT,
                    attributes
                });
                const patchedCallback = instrumentation._patchEnd(span, resultHandler);
                // handle when options is the callback to send the correct number of args
                if (typeof options === 'function') {
                    return original.call(this, server, ns, cursorState, batchSize, patchedCallback);
                } else {
                    return original.call(this, server, ns, cursorState, batchSize, options, patchedCallback);
                }
            };
        };
    }
    /**
     * Get the mongodb command type from the object.
     * @param command Internal mongodb command object
     */ static _getCommandType(command) {
        if (command.createIndexes !== undefined) {
            return internal_types_1.MongodbCommandType.CREATE_INDEXES;
        } else if (command.findandmodify !== undefined) {
            return internal_types_1.MongodbCommandType.FIND_AND_MODIFY;
        } else if (command.ismaster !== undefined) {
            return internal_types_1.MongodbCommandType.IS_MASTER;
        } else if (command.count !== undefined) {
            return internal_types_1.MongodbCommandType.COUNT;
        } else if (command.aggregate !== undefined) {
            return internal_types_1.MongodbCommandType.AGGREGATE;
        } else {
            return internal_types_1.MongodbCommandType.UNKNOWN;
        }
    }
    /**
     * Determine a span's attributes by fetching related metadata from the context
     * @param connectionCtx mongodb internal connection context
     * @param ns mongodb namespace
     * @param command mongodb internal representation of a command
     */ _getV4SpanAttributes(connectionCtx, ns, command, operation) {
        let host, port;
        if (connectionCtx) {
            const hostParts = typeof connectionCtx.address === 'string' ? connectionCtx.address.split(':') : '';
            if (hostParts.length === 2) {
                host = hostParts[0];
                port = hostParts[1];
            }
        }
        // capture parameters within the query as well if enhancedDatabaseReporting is enabled.
        let commandObj;
        if (command?.documents && command.documents[0]) {
            commandObj = command.documents[0];
        } else if (command?.cursors) {
            commandObj = command.cursors;
        } else {
            commandObj = command;
        }
        return this._getSpanAttributes(ns.db, ns.collection, host, port, commandObj, operation);
    }
    /**
     * Determine a span's attributes by fetching related metadata from the context
     * @param ns mongodb namespace
     * @param topology mongodb internal representation of the network topology
     * @param command mongodb internal representation of a command
     */ _getV3SpanAttributes(ns, topology, command, operation) {
        // Extract host/port info.
        let host;
        let port;
        if (topology && topology.s) {
            host = topology.s.options?.host ?? topology.s.host;
            port = (topology.s.options?.port ?? topology.s.port)?.toString();
            if (host == null || port == null) {
                const address = topology.description?.address;
                if (address) {
                    const addressSegments = address.split(':');
                    host = addressSegments[0];
                    port = addressSegments[1];
                }
            }
        }
        // The namespace is a combination of the database name and the name of the
        // collection or index, like so: [database-name].[collection-or-index-name].
        // It could be a string or an instance of MongoDBNamespace, as such we
        // always coerce to a string to extract db and collection.
        const [dbName, dbCollection] = ns.toString().split('.');
        // capture parameters within the query as well if enhancedDatabaseReporting is enabled.
        const commandObj = command?.query ?? command?.q ?? command;
        return this._getSpanAttributes(dbName, dbCollection, host, port, commandObj, operation);
    }
    _getSpanAttributes(dbName, dbCollection, host, port, commandObj, operation) {
        const attributes = {};
        if (this._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
            attributes[semconv_1.ATTR_DB_SYSTEM] = semconv_1.DB_SYSTEM_VALUE_MONGODB;
            attributes[semconv_1.ATTR_DB_NAME] = dbName;
            attributes[semconv_1.ATTR_DB_MONGODB_COLLECTION] = dbCollection;
            attributes[semconv_1.ATTR_DB_OPERATION] = operation;
            attributes[semconv_1.ATTR_DB_CONNECTION_STRING] = `mongodb://${host}:${port}/${dbName}`;
        }
        if (this._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
            attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semconv_1.DB_SYSTEM_NAME_VALUE_MONGODB;
            attributes[semantic_conventions_1.ATTR_DB_NAMESPACE] = dbName;
            attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = operation;
            attributes[semantic_conventions_1.ATTR_DB_COLLECTION_NAME] = dbCollection;
        }
        if (host && port) {
            if (this._netSemconvStability & instrumentation_1.SemconvStability.OLD) {
                attributes[semconv_1.ATTR_NET_PEER_NAME] = host;
            }
            if (this._netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
            }
            const portNumber = parseInt(port, 10);
            if (!isNaN(portNumber)) {
                if (this._netSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_NET_PEER_PORT] = portNumber;
                }
                if (this._netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    attributes[semantic_conventions_1.ATTR_SERVER_PORT] = portNumber;
                }
            }
        }
        if (commandObj) {
            const { dbStatementSerializer: configDbStatementSerializer } = this.getConfig();
            const dbStatementSerializer = typeof configDbStatementSerializer === 'function' ? configDbStatementSerializer : this._defaultDbStatementSerializer.bind(this);
            (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                const query = dbStatementSerializer(commandObj);
                if (this._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_DB_STATEMENT] = query;
                }
                if (this._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = query;
                }
            }, (err)=>{
                if (err) {
                    this._diag.error('Error running dbStatementSerializer hook', err);
                }
            }, true);
        }
        return attributes;
    }
    _spanNameFromAttrs(attributes) {
        let spanName;
        if (this._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
            // https://opentelemetry.io/docs/specs/semconv/database/database-spans/#name
            spanName = [
                attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME],
                attributes[semantic_conventions_1.ATTR_DB_COLLECTION_NAME]
            ].filter((attr)=>attr).join(' ') || semconv_1.DB_SYSTEM_NAME_VALUE_MONGODB;
        } else {
            spanName = `mongodb.${attributes[semconv_1.ATTR_DB_OPERATION] || 'command'}`;
        }
        return spanName;
    }
    _getDefaultDbStatementReplacer() {
        const seen = new WeakSet();
        return (_key, value)=>{
            // undefined, boolean, number, bigint, string, symbol, function || null
            if (typeof value !== 'object' || !value) return '?';
            // objects (including arrays)
            if (seen.has(value)) return '[Circular]';
            seen.add(value);
            return value;
        };
    }
    _defaultDbStatementSerializer(commandObj) {
        const { enhancedDatabaseReporting } = this.getConfig();
        if (enhancedDatabaseReporting) {
            return JSON.stringify(commandObj);
        }
        return JSON.stringify(commandObj, this._getDefaultDbStatementReplacer());
    }
    /**
     * Triggers the response hook in case it is defined.
     * @param span The span to add the results to.
     * @param result The command result
     */ _handleExecutionResult(span, result) {
        const { responseHook } = this.getConfig();
        if (typeof responseHook === 'function') {
            (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                responseHook(span, {
                    data: result
                });
            }, (err)=>{
                if (err) {
                    this._diag.error('Error running response hook', err);
                }
            }, true);
        }
    }
    /**
     * Ends a created span.
     * @param span The created span to end.
     * @param resultHandler A callback function.
     * @param connectionId: The connection ID of the Command response.
     */ _patchEnd(span, resultHandler, connectionId, commandType) {
        // mongodb is using "tick" when calling a callback, this way the context
        // in final callback (resultHandler) is lost
        const activeContext = api_1.context.active();
        const instrumentation = this;
        let spanEnded = false;
        return function patchedEnd(...args) {
            if (!spanEnded) {
                spanEnded = true;
                const error = args[0];
                if (span) {
                    if (error instanceof Error) {
                        span.setStatus({
                            code: api_1.SpanStatusCode.ERROR,
                            message: error.message
                        });
                    } else {
                        const result = args[1];
                        instrumentation._handleExecutionResult(span, result);
                    }
                    span.end();
                }
                if (commandType === 'endSessions') {
                    instrumentation._connCountAdd(-1, instrumentation._poolName, 'idle');
                }
            }
            return api_1.context.with(activeContext, ()=>{
                return resultHandler.apply(this, args);
            });
        };
    }
    setPoolName(options) {
        const host = options.hostAddress?.host;
        const port = options.hostAddress?.port;
        const database = options.dbName;
        const poolName = `mongodb://${host}:${port}/${database}`;
        this._poolName = poolName;
    }
    _checkSkipInstrumentation(currentSpan) {
        const requireParentSpan = this.getConfig().requireParentSpan;
        const hasNoParentSpan = currentSpan === undefined;
        return requireParentSpan === true && hasNoParentSpan;
    }
}
exports.MongoDBInstrumentation = MongoDBInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongodbCommandType = void 0;
var MongodbCommandType;
(function(MongodbCommandType) {
    MongodbCommandType["CREATE_INDEXES"] = "createIndexes";
    MongodbCommandType["FIND_AND_MODIFY"] = "findAndModify";
    MongodbCommandType["IS_MASTER"] = "isMaster";
    MongodbCommandType["COUNT"] = "count";
    MongodbCommandType["UNKNOWN"] = "unknown";
})(MongodbCommandType = exports.MongodbCommandType || (exports.MongodbCommandType = {})); //# sourceMappingURL=types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongodbCommandType = exports.MongoDBInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "MongoDBInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.MongoDBInstrumentation;
    }
});
var types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongodb/build/src/types.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "MongodbCommandType", {
    enumerable: true,
    get: function() {
        return types_1.MongodbCommandType;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DB_SYSTEM_NAME_VALUE_MONGODB = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_USER = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_OPERATION = exports.ATTR_DB_NAME = exports.ATTR_DB_MONGODB_COLLECTION = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `db.collection.name` instead.
 *
 * @example "mytable"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.collection.name`.
 */ exports.ATTR_DB_MONGODB_COLLECTION = 'db.mongodb.collection';
/**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * Deprecated, use `db.operation.name` instead.
 *
 * @example findAndModify
 * @example HMSET
 * @example SELECT
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.operation.name`.
 */ exports.ATTR_DB_OPERATION = 'db.operation';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, no replacement at this time.
 *
 * @example readonly_user
 * @example reporting_user
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Removed, no replacement at this time.
 */ exports.ATTR_DB_USER = 'db.user';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Enum value "mongodb" for attribute {@link ATTR_DB_SYSTEM_NAME}.
 *
 * [MongoDB](https://www.mongodb.com/)
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_NAME_VALUE_MONGODB = 'mongodb'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleCallbackResponse = exports.handlePromiseResponse = exports.getAttributesFromCollection = void 0;
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
 */ const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/semconv.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
function getAttributesFromCollection(collection, dbSemconvStability, netSemconvStability) {
    const attrs = {};
    if (dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
        attrs[semconv_1.ATTR_DB_MONGODB_COLLECTION] = collection.name;
        attrs[semconv_1.ATTR_DB_NAME] = collection.conn.name;
        attrs[semconv_1.ATTR_DB_USER] = collection.conn.user;
    }
    if (dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
        attrs[semantic_conventions_1.ATTR_DB_COLLECTION_NAME] = collection.name;
        attrs[semantic_conventions_1.ATTR_DB_NAMESPACE] = collection.conn.name;
    // db.user has no stable replacement
    }
    if (netSemconvStability & instrumentation_1.SemconvStability.OLD) {
        attrs[semconv_1.ATTR_NET_PEER_NAME] = collection.conn.host;
        attrs[semconv_1.ATTR_NET_PEER_PORT] = collection.conn.port;
    }
    if (netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
        attrs[semantic_conventions_1.ATTR_SERVER_ADDRESS] = collection.conn.host;
        attrs[semantic_conventions_1.ATTR_SERVER_PORT] = collection.conn.port;
    }
    return attrs;
}
exports.getAttributesFromCollection = getAttributesFromCollection;
function setErrorStatus(span, error = {}) {
    span.recordException(error);
    span.setStatus({
        code: api_1.SpanStatusCode.ERROR,
        message: `${error.message} ${error.code ? `\nMongoose Error Code: ${error.code}` : ''}`
    });
}
function applyResponseHook(span, response, responseHook, moduleVersion = undefined) {
    if (!responseHook) {
        return;
    }
    (0, instrumentation_1.safeExecuteInTheMiddle)(()=>responseHook(span, {
            moduleVersion,
            response
        }), (e)=>{
        if (e) {
            api_1.diag.error('mongoose instrumentation: responseHook error', e);
        }
    }, true);
}
function handlePromiseResponse(execResponse, span, responseHook, moduleVersion = undefined) {
    if (!(execResponse instanceof Promise)) {
        applyResponseHook(span, execResponse, responseHook, moduleVersion);
        span.end();
        return execResponse;
    }
    return execResponse.then((response)=>{
        applyResponseHook(span, response, responseHook, moduleVersion);
        return response;
    }).catch((err)=>{
        setErrorStatus(span, err);
        throw err;
    }).finally(()=>span.end());
}
exports.handlePromiseResponse = handlePromiseResponse;
function handleCallbackResponse(callback, exec, originalThis, span, args, responseHook, moduleVersion = undefined) {
    let callbackArgumentIndex = 0;
    if (args.length === 2) {
        callbackArgumentIndex = 1;
    } else if (args.length === 3) {
        callbackArgumentIndex = 2;
    }
    args[callbackArgumentIndex] = (err, response)=>{
        if (err) {
            setErrorStatus(span, err);
        } else {
            applyResponseHook(span, response, responseHook, moduleVersion);
        }
        span.end();
        return callback(err, response);
    };
    return exec.apply(originalThis, args);
}
exports.handleCallbackResponse = handleCallbackResponse; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.60.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-mongoose'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/mongoose.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongooseInstrumentation = exports._ALREADY_INSTRUMENTED = exports._STORED_PARENT_SPAN = void 0;
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
 */ const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/utils.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/version.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/semconv.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const contextCaptureFunctionsCommon = [
    'deleteOne',
    'deleteMany',
    'find',
    'findOne',
    'estimatedDocumentCount',
    'countDocuments',
    'distinct',
    'where',
    '$where',
    'findOneAndUpdate',
    'findOneAndDelete',
    'findOneAndReplace'
];
const contextCaptureFunctions6 = [
    'remove',
    'count',
    'findOneAndRemove',
    ...contextCaptureFunctionsCommon
];
const contextCaptureFunctions7 = [
    'count',
    'findOneAndRemove',
    ...contextCaptureFunctionsCommon
];
const contextCaptureFunctions8 = [
    ...contextCaptureFunctionsCommon
];
function getContextCaptureFunctions(moduleVersion) {
    /* istanbul ignore next */ if (!moduleVersion) {
        return contextCaptureFunctionsCommon;
    } else if (moduleVersion.startsWith('6.') || moduleVersion.startsWith('5.')) {
        return contextCaptureFunctions6;
    } else if (moduleVersion.startsWith('7.')) {
        return contextCaptureFunctions7;
    } else {
        return contextCaptureFunctions8;
    }
}
function instrumentRemove(moduleVersion) {
    return moduleVersion && (moduleVersion.startsWith('5.') || moduleVersion.startsWith('6.')) || false;
}
/**
 * 8.21.0 changed Document.updateOne/deleteOne so that the Query is not fully built when Query.exec() is called.
 * @param moduleVersion
 */ function needsDocumentMethodPatch(moduleVersion) {
    if (!moduleVersion || !moduleVersion.startsWith('8.')) {
        return false;
    }
    const minor = parseInt(moduleVersion.split('.')[1], 10);
    return minor >= 21;
}
// when mongoose functions are called, we store the original call context
// and then set it as the parent for the spans created by Query/Aggregate exec()
// calls. this bypass the unlinked spans issue on thenables await operations.
exports._STORED_PARENT_SPAN = Symbol('stored-parent-span');
// Prevents double-instrumentation when doc.updateOne/deleteOne (Mongoose 8.21.0+)
// creates a span and returns a Query that also calls exec()
exports._ALREADY_INSTRUMENTED = Symbol('already-instrumented');
class MongooseInstrumentation extends instrumentation_1.InstrumentationBase {
    _netSemconvStability;
    _dbSemconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
        this._setSemconvStabilityFromEnv();
    }
    // Used for testing.
    _setSemconvStabilityFromEnv() {
        this._netSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
        this._dbSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    init() {
        const module = new instrumentation_1.InstrumentationNodeModuleDefinition('mongoose', [
            '>=5.9.7 <10'
        ], this.patch.bind(this), this.unpatch.bind(this));
        return module;
    }
    patch(module, moduleVersion) {
        const moduleExports = module[Symbol.toStringTag] === 'Module' ? module.default // ESM
         : module; // CommonJS
        this._wrap(moduleExports.Model.prototype, 'save', this.patchOnModelMethods('save', moduleVersion));
        // mongoose applies this code on module require:
        // Model.prototype.$save = Model.prototype.save;
        // which captures the save function before it is patched.
        // so we need to apply the same logic after instrumenting the save function.
        moduleExports.Model.prototype.$save = moduleExports.Model.prototype.save;
        if (instrumentRemove(moduleVersion)) {
            this._wrap(moduleExports.Model.prototype, 'remove', this.patchOnModelMethods('remove', moduleVersion));
        }
        // Mongoose 8.21.0+ changed Document.updateOne()/deleteOne() so that the Query is not fully built when Query.exec() is called.
        //
        // See https://github.com/Automattic/mongoose/blob/7dbda12dca1bd7adb9e270d7de8ac5229606ce72/lib/document.js#L861.
        // - `this` is a Query object
        // - the update happens in a pre-hook that gets called when Query.exec() is already running.
        // - when we instrument Query.exec(), we don't have access to the options yet as they get set during Query.exec() only.
        //
        // Unfortunately, after Query.exec() is finished, the options are left modified by the library, so just delaying
        // attaching the attributes after the span is done is not an option. Therefore, we patch Model methods
        // and grab the data directly where the user provides it.
        //
        // ref: https://github.com/Automattic/mongoose/pull/15908 (introduced this behavior)
        if (needsDocumentMethodPatch(moduleVersion)) {
            this._wrap(moduleExports.Model.prototype, 'updateOne', this._patchDocumentUpdateMethods('updateOne', moduleVersion));
            this._wrap(moduleExports.Model.prototype, 'deleteOne', this._patchDocumentUpdateMethods('deleteOne', moduleVersion));
        }
        this._wrap(moduleExports.Query.prototype, 'exec', this.patchQueryExec(moduleVersion));
        this._wrap(moduleExports.Aggregate.prototype, 'exec', this.patchAggregateExec(moduleVersion));
        const contextCaptureFunctions = getContextCaptureFunctions(moduleVersion);
        contextCaptureFunctions.forEach((funcName)=>{
            this._wrap(moduleExports.Query.prototype, funcName, this.patchAndCaptureSpanContext(funcName));
        });
        this._wrap(moduleExports.Model, 'aggregate', this.patchModelAggregate());
        this._wrap(moduleExports.Model, 'insertMany', this.patchModelStatic('insertMany', moduleVersion));
        this._wrap(moduleExports.Model, 'bulkWrite', this.patchModelStatic('bulkWrite', moduleVersion));
        return moduleExports;
    }
    unpatch(module, moduleVersion) {
        const moduleExports = module[Symbol.toStringTag] === 'Module' ? module.default // ESM
         : module; // CommonJS
        const contextCaptureFunctions = getContextCaptureFunctions(moduleVersion);
        this._unwrap(moduleExports.Model.prototype, 'save');
        // revert the patch for $save which we applied by aliasing it to patched `save`
        moduleExports.Model.prototype.$save = moduleExports.Model.prototype.save;
        if (instrumentRemove(moduleVersion)) {
            this._unwrap(moduleExports.Model.prototype, 'remove');
        }
        if (needsDocumentMethodPatch(moduleVersion)) {
            this._unwrap(moduleExports.Model.prototype, 'updateOne');
            this._unwrap(moduleExports.Model.prototype, 'deleteOne');
        }
        this._unwrap(moduleExports.Query.prototype, 'exec');
        this._unwrap(moduleExports.Aggregate.prototype, 'exec');
        contextCaptureFunctions.forEach((funcName)=>{
            this._unwrap(moduleExports.Query.prototype, funcName);
        });
        this._unwrap(moduleExports.Model, 'aggregate');
        this._unwrap(moduleExports.Model, 'insertMany');
        this._unwrap(moduleExports.Model, 'bulkWrite');
    }
    patchAggregateExec(moduleVersion) {
        const self = this;
        return (originalAggregate)=>{
            return function exec(callback) {
                if (self.getConfig().requireParentSpan && api_1.trace.getSpan(api_1.context.active()) === undefined) {
                    return originalAggregate.apply(this, arguments);
                }
                const parentSpan = this[exports._STORED_PARENT_SPAN];
                const attributes = {};
                const { dbStatementSerializer } = self.getConfig();
                if (dbStatementSerializer) {
                    const statement = dbStatementSerializer('aggregate', {
                        options: this.options,
                        aggregatePipeline: this._pipeline
                    });
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                        attributes[semconv_1.ATTR_DB_STATEMENT] = statement;
                    }
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                        attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = statement;
                    }
                }
                const span = self._startSpan(this._model.collection, this._model?.modelName, 'aggregate', attributes, parentSpan);
                return self._handleResponse(span, originalAggregate, this, arguments, callback, moduleVersion);
            };
        };
    }
    patchQueryExec(moduleVersion) {
        const self = this;
        return (originalExec)=>{
            return function exec(callback) {
                // Skip if already instrumented by document instance method patch
                if (this[exports._ALREADY_INSTRUMENTED]) {
                    return originalExec.apply(this, arguments);
                }
                if (self.getConfig().requireParentSpan && api_1.trace.getSpan(api_1.context.active()) === undefined) {
                    return originalExec.apply(this, arguments);
                }
                const parentSpan = this[exports._STORED_PARENT_SPAN];
                const attributes = {};
                const { dbStatementSerializer } = self.getConfig();
                if (dbStatementSerializer) {
                    const statement = dbStatementSerializer(this.op, {
                        // Use public API methods (getFilter/getOptions) for better compatibility
                        condition: this.getFilter?.() ?? this._conditions,
                        updates: this._update,
                        options: this.getOptions?.() ?? this.options,
                        fields: this._fields
                    });
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                        attributes[semconv_1.ATTR_DB_STATEMENT] = statement;
                    }
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                        attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = statement;
                    }
                }
                const span = self._startSpan(this.mongooseCollection, this.model.modelName, this.op, attributes, parentSpan);
                return self._handleResponse(span, originalExec, this, arguments, callback, moduleVersion);
            };
        };
    }
    patchOnModelMethods(op, moduleVersion) {
        const self = this;
        return (originalOnModelFunction)=>{
            return function method(options, callback) {
                if (self.getConfig().requireParentSpan && api_1.trace.getSpan(api_1.context.active()) === undefined) {
                    return originalOnModelFunction.apply(this, arguments);
                }
                const serializePayload = {
                    document: this
                };
                if (options && !(options instanceof Function)) {
                    serializePayload.options = options;
                }
                const attributes = {};
                const { dbStatementSerializer } = self.getConfig();
                if (dbStatementSerializer) {
                    const statement = dbStatementSerializer(op, serializePayload);
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                        attributes[semconv_1.ATTR_DB_STATEMENT] = statement;
                    }
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                        attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = statement;
                    }
                }
                const span = self._startSpan(this.constructor.collection, this.constructor.modelName, op, attributes);
                if (options instanceof Function) {
                    callback = options;
                    options = undefined;
                }
                return self._handleResponse(span, originalOnModelFunction, this, arguments, callback, moduleVersion);
            };
        };
    }
    // Patch document instance methods (doc.updateOne/deleteOne) for Mongoose 8.21.0+.
    _patchDocumentUpdateMethods(op, moduleVersion) {
        const self = this;
        return (originalMethod)=>{
            return function method(update, options, callback) {
                if (self.getConfig().requireParentSpan && api_1.trace.getSpan(api_1.context.active()) === undefined) {
                    return originalMethod.apply(this, arguments);
                }
                // determine actual callback since different argument patterns are allowed
                let actualCallback = callback;
                let actualUpdate = update;
                let actualOptions = options;
                if (typeof update === 'function') {
                    actualCallback = update;
                    actualUpdate = undefined;
                    actualOptions = undefined;
                } else if (typeof options === 'function') {
                    actualCallback = options;
                    actualOptions = undefined;
                }
                const attributes = {};
                const dbStatementSerializer = self.getConfig().dbStatementSerializer;
                if (dbStatementSerializer) {
                    const statement = dbStatementSerializer(op, {
                        // Document instance methods automatically use the document's _id as filter
                        condition: {
                            _id: this._id
                        },
                        updates: actualUpdate,
                        options: actualOptions
                    });
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                        attributes[semconv_1.ATTR_DB_STATEMENT] = statement;
                    }
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                        attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = statement;
                    }
                }
                const span = self._startSpan(this.constructor.collection, this.constructor.modelName, op, attributes);
                const result = self._handleResponse(span, originalMethod, this, arguments, actualCallback, moduleVersion);
                // Mark returned Query to prevent double-instrumentation when exec() is eventually called
                if (result && typeof result === 'object') {
                    result[exports._ALREADY_INSTRUMENTED] = true;
                }
                return result;
            };
        };
    }
    patchModelStatic(op, moduleVersion) {
        const self = this;
        return (original)=>{
            return function patchedStatic(docsOrOps, options, callback) {
                if (self.getConfig().requireParentSpan && api_1.trace.getSpan(api_1.context.active()) === undefined) {
                    return original.apply(this, arguments);
                }
                if (typeof options === 'function') {
                    callback = options;
                    options = undefined;
                }
                const serializePayload = {};
                switch(op){
                    case 'insertMany':
                        serializePayload.documents = docsOrOps;
                        break;
                    case 'bulkWrite':
                        serializePayload.operations = docsOrOps;
                        break;
                    default:
                        serializePayload.document = docsOrOps;
                        break;
                }
                if (options !== undefined) {
                    serializePayload.options = options;
                }
                const attributes = {};
                const { dbStatementSerializer } = self.getConfig();
                if (dbStatementSerializer) {
                    const statement = dbStatementSerializer(op, serializePayload);
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                        attributes[semconv_1.ATTR_DB_STATEMENT] = statement;
                    }
                    if (self._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                        attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = statement;
                    }
                }
                const span = self._startSpan(this.collection, this.modelName, op, attributes);
                return self._handleResponse(span, original, this, arguments, callback, moduleVersion);
            };
        };
    }
    // we want to capture the otel span on the object which is calling exec.
    // in the special case of aggregate, we need have no function to path
    // on the Aggregate object to capture the context on, so we patch
    // the aggregate of Model, and set the context on the Aggregate object
    patchModelAggregate() {
        const self = this;
        return (original)=>{
            return function captureSpanContext() {
                const currentSpan = api_1.trace.getSpan(api_1.context.active());
                const aggregate = self._callOriginalFunction(()=>original.apply(this, arguments));
                if (aggregate) aggregate[exports._STORED_PARENT_SPAN] = currentSpan;
                return aggregate;
            };
        };
    }
    patchAndCaptureSpanContext(funcName) {
        const self = this;
        return (original)=>{
            return function captureSpanContext() {
                this[exports._STORED_PARENT_SPAN] = api_1.trace.getSpan(api_1.context.active());
                return self._callOriginalFunction(()=>original.apply(this, arguments));
            };
        };
    }
    _startSpan(collection, modelName, operation, attributes, parentSpan) {
        const finalAttributes = {
            ...attributes,
            ...(0, utils_1.getAttributesFromCollection)(collection, this._dbSemconvStability, this._netSemconvStability)
        };
        if (this._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
            finalAttributes[semconv_1.ATTR_DB_OPERATION] = operation;
            finalAttributes[semconv_1.ATTR_DB_SYSTEM] = 'mongoose'; // keep for backwards compatibility
        }
        if (this._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
            finalAttributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = operation;
            finalAttributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semconv_1.DB_SYSTEM_NAME_VALUE_MONGODB; // actual db system name
        }
        const spanName = this._dbSemconvStability & instrumentation_1.SemconvStability.STABLE ? `${operation} ${collection.name}` : `mongoose.${modelName}.${operation}`;
        return this.tracer.startSpan(spanName, {
            kind: api_1.SpanKind.CLIENT,
            attributes: finalAttributes
        }, parentSpan ? api_1.trace.setSpan(api_1.context.active(), parentSpan) : undefined);
    }
    _handleResponse(span, exec, originalThis, args, callback, moduleVersion = undefined) {
        const self = this;
        if (callback instanceof Function) {
            return self._callOriginalFunction(()=>(0, utils_1.handleCallbackResponse)(callback, exec, originalThis, span, args, self.getConfig().responseHook, moduleVersion));
        } else {
            const response = self._callOriginalFunction(()=>exec.apply(originalThis, args));
            return (0, utils_1.handlePromiseResponse)(response, span, self.getConfig().responseHook, moduleVersion);
        }
    }
    _callOriginalFunction(originalFunction) {
        if (this.getConfig().suppressInternalInstrumentation) {
            return api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), originalFunction);
        } else {
            return originalFunction();
        }
    }
}
exports.MongooseInstrumentation = MongooseInstrumentation; //# sourceMappingURL=mongoose.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MongooseInstrumentation = void 0;
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
 */ var mongoose_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mongoose/build/src/mongoose.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "MongooseInstrumentation", {
    enumerable: true,
    get: function() {
        return mongoose_1.MongooseInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.METRIC_DB_CLIENT_CONNECTIONS_USAGE = exports.DB_SYSTEM_VALUE_MYSQL = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_USER = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_NAME = exports.ATTR_DB_CONNECTION_STRING = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `server.address`, `server.port` attributes instead.
 *
 * @example "Server=(localdb)\\v11.0;Integrated Security=true;"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` and `server.port`.
 */ exports.ATTR_DB_CONNECTION_STRING = 'db.connection_string';
/**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, no replacement at this time.
 *
 * @example readonly_user
 * @example reporting_user
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Removed, no replacement at this time.
 */ exports.ATTR_DB_USER = 'db.user';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Enum value "mysql" for attribute {@link ATTR_DB_SYSTEM}.
 *
 * MySQL
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_VALUE_MYSQL = 'mysql';
/**
 * Deprecated, use `db.client.connection.count` instead.
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.client.connection.count`.
 */ exports.METRIC_DB_CLIENT_CONNECTIONS_USAGE = 'db.client.connections.usage'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/AttributeNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = void 0;
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
 */ // Mysql specific attributes not covered by semantic conventions
var AttributeNames;
(function(AttributeNames) {
    AttributeNames["MYSQL_VALUES"] = "db.mysql.values";
})(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {})); //# sourceMappingURL=AttributeNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPoolNameOld = exports.arrayStringifyHelper = exports.getSpanName = exports.getDbValues = exports.getDbQueryText = exports.getJDBCString = exports.getConfig = void 0;
function getConfig(config) {
    const { host, port, database, user } = config && config.connectionConfig || config || {};
    return {
        host,
        port,
        database,
        user
    };
}
exports.getConfig = getConfig;
function getJDBCString(host, port, database) {
    let jdbcString = `jdbc:mysql://${host || 'localhost'}`;
    if (typeof port === 'number') {
        jdbcString += `:${port}`;
    }
    if (typeof database === 'string') {
        jdbcString += `/${database}`;
    }
    return jdbcString;
}
exports.getJDBCString = getJDBCString;
/**
 * @returns the database query being executed.
 */ function getDbQueryText(query) {
    if (typeof query === 'string') {
        return query;
    } else {
        return query.sql;
    }
}
exports.getDbQueryText = getDbQueryText;
function getDbValues(query, values) {
    if (typeof query === 'string') {
        return arrayStringifyHelper(values);
    } else {
        // According to https://github.com/mysqljs/mysql#performing-queries
        // The values argument will override the values in the option object.
        return arrayStringifyHelper(values || query.values);
    }
}
exports.getDbValues = getDbValues;
/**
 * The span name SHOULD be set to a low cardinality value
 * representing the statement executed on the database.
 *
 * TODO: revisit span name based on https://github.com/open-telemetry/semantic-conventions/blob/v1.33.0/docs/database/database-spans.md#name
 *
 * @returns SQL statement without variable arguments or SQL verb
 */ function getSpanName(query) {
    const rawQuery = typeof query === 'object' ? query.sql : query;
    // Extract the SQL verb
    const firstSpace = rawQuery?.indexOf(' ');
    if (typeof firstSpace === 'number' && firstSpace !== -1) {
        return rawQuery?.substring(0, firstSpace);
    }
    return rawQuery;
}
exports.getSpanName = getSpanName;
function arrayStringifyHelper(arr) {
    if (arr) return `[${arr.toString()}]`;
    return '';
}
exports.arrayStringifyHelper = arrayStringifyHelper;
function getPoolNameOld(pool) {
    const c = pool.config.connectionConfig;
    let poolName = '';
    poolName += c.host ? `host: '${c.host}', ` : '';
    poolName += c.port ? `port: ${c.port}, ` : '';
    poolName += c.database ? `database: '${c.database}', ` : '';
    poolName += c.user ? `user: '${c.user}'` : '';
    if (!c.user) {
        poolName = poolName.substring(0, poolName.length - 2); //omit last comma
    }
    return poolName.trim();
}
exports.getPoolNameOld = getPoolNameOld; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.60.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-mysql'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MySQLInstrumentation = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/semconv.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/AttributeNames.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/utils.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/version.js [app-rsc] (ecmascript)");
class MySQLInstrumentation extends instrumentation_1.InstrumentationBase {
    _netSemconvStability;
    _dbSemconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
        this._setSemconvStabilityFromEnv();
    }
    // Used for testing.
    _setSemconvStabilityFromEnv() {
        this._netSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
        this._dbSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    _updateMetricInstruments() {
        this._connectionsUsageOld = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTIONS_USAGE, {
            description: 'The number of connections that are currently in state described by the state attribute.',
            unit: '{connection}'
        });
    }
    /**
     * Convenience function for updating the `db.client.connections.usage` metric.
     * The name "count" comes from the eventually replacement for this metric per
     * https://opentelemetry.io/docs/specs/semconv/non-normative/db-migration/#database-client-connection-count
     */ _connCountAdd(n, poolNameOld, state) {
        this._connectionsUsageOld?.add(n, {
            state,
            name: poolNameOld
        });
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition('mysql', [
                '>=2.0.0 <3'
            ], (moduleExports)=>{
                if ((0, instrumentation_1.isWrapped)(moduleExports.createConnection)) {
                    this._unwrap(moduleExports, 'createConnection');
                }
                this._wrap(moduleExports, 'createConnection', this._patchCreateConnection());
                if ((0, instrumentation_1.isWrapped)(moduleExports.createPool)) {
                    this._unwrap(moduleExports, 'createPool');
                }
                this._wrap(moduleExports, 'createPool', this._patchCreatePool());
                if ((0, instrumentation_1.isWrapped)(moduleExports.createPoolCluster)) {
                    this._unwrap(moduleExports, 'createPoolCluster');
                }
                this._wrap(moduleExports, 'createPoolCluster', this._patchCreatePoolCluster());
                return moduleExports;
            }, (moduleExports)=>{
                if (moduleExports === undefined) return;
                this._unwrap(moduleExports, 'createConnection');
                this._unwrap(moduleExports, 'createPool');
                this._unwrap(moduleExports, 'createPoolCluster');
            })
        ];
    }
    // global export function
    _patchCreateConnection() {
        return (originalCreateConnection)=>{
            const thisPlugin = this;
            return function createConnection(_connectionUri) {
                const originalResult = originalCreateConnection(...arguments);
                // This is unwrapped on next call after unpatch
                thisPlugin._wrap(originalResult, 'query', thisPlugin._patchQuery(originalResult));
                return originalResult;
            };
        };
    }
    // global export function
    _patchCreatePool() {
        return (originalCreatePool)=>{
            const thisPlugin = this;
            return function createPool(_config) {
                const pool = originalCreatePool(...arguments);
                thisPlugin._wrap(pool, 'query', thisPlugin._patchQuery(pool));
                thisPlugin._wrap(pool, 'getConnection', thisPlugin._patchGetConnection(pool));
                thisPlugin._wrap(pool, 'end', thisPlugin._patchPoolEnd(pool));
                thisPlugin._setPoolCallbacks(pool, '');
                return pool;
            };
        };
    }
    _patchPoolEnd(pool) {
        return (originalPoolEnd)=>{
            const thisPlugin = this;
            return function end(callback) {
                const nAll = pool._allConnections.length;
                const nFree = pool._freeConnections.length;
                const nUsed = nAll - nFree;
                const poolNameOld = (0, utils_1.getPoolNameOld)(pool);
                thisPlugin._connCountAdd(-nUsed, poolNameOld, 'used');
                thisPlugin._connCountAdd(-nFree, poolNameOld, 'idle');
                originalPoolEnd.apply(pool, arguments);
            };
        };
    }
    // global export function
    _patchCreatePoolCluster() {
        return (originalCreatePoolCluster)=>{
            const thisPlugin = this;
            return function createPool(_config) {
                const cluster = originalCreatePoolCluster(...arguments);
                // This is unwrapped on next call after unpatch
                thisPlugin._wrap(cluster, 'getConnection', thisPlugin._patchGetConnection(cluster));
                thisPlugin._wrap(cluster, 'add', thisPlugin._patchAdd(cluster));
                return cluster;
            };
        };
    }
    _patchAdd(cluster) {
        return (originalAdd)=>{
            const thisPlugin = this;
            return function add(id, config) {
                // Unwrap if unpatch has been called
                if (!thisPlugin['_enabled']) {
                    thisPlugin._unwrap(cluster, 'add');
                    return originalAdd.apply(cluster, arguments);
                }
                originalAdd.apply(cluster, arguments);
                const nodes = cluster['_nodes'];
                if (nodes) {
                    const nodeId = typeof id === 'object' ? 'CLUSTER::' + cluster._lastId : String(id);
                    const pool = nodes[nodeId].pool;
                    thisPlugin._setPoolCallbacks(pool, id);
                }
            };
        };
    }
    // method on cluster or pool
    _patchGetConnection(pool) {
        return (originalGetConnection)=>{
            const thisPlugin = this;
            return function getConnection(arg1, arg2, arg3) {
                // Unwrap if unpatch has been called
                if (!thisPlugin['_enabled']) {
                    thisPlugin._unwrap(pool, 'getConnection');
                    return originalGetConnection.apply(pool, arguments);
                }
                if (arguments.length === 1 && typeof arg1 === 'function') {
                    const patchFn = thisPlugin._getConnectionCallbackPatchFn(arg1);
                    return originalGetConnection.call(pool, patchFn);
                }
                if (arguments.length === 2 && typeof arg2 === 'function') {
                    const patchFn = thisPlugin._getConnectionCallbackPatchFn(arg2);
                    return originalGetConnection.call(pool, arg1, patchFn);
                }
                if (arguments.length === 3 && typeof arg3 === 'function') {
                    const patchFn = thisPlugin._getConnectionCallbackPatchFn(arg3);
                    return originalGetConnection.call(pool, arg1, arg2, patchFn);
                }
                return originalGetConnection.apply(pool, arguments);
            };
        };
    }
    _getConnectionCallbackPatchFn(cb) {
        const thisPlugin = this;
        const activeContext = api_1.context.active();
        return function(err, connection) {
            if (connection) {
                // this is the callback passed into a query
                // no need to unwrap
                if (!(0, instrumentation_1.isWrapped)(connection.query)) {
                    thisPlugin._wrap(connection, 'query', thisPlugin._patchQuery(connection));
                }
            }
            if (typeof cb === 'function') {
                api_1.context.with(activeContext, cb, this, err, connection);
            }
        };
    }
    _patchQuery(connection) {
        return (originalQuery)=>{
            const thisPlugin = this;
            return function query(query, _valuesOrCallback, _callback) {
                if (!thisPlugin['_enabled']) {
                    thisPlugin._unwrap(connection, 'query');
                    return originalQuery.apply(connection, arguments);
                }
                const attributes = {};
                const { host, port, database, user } = (0, utils_1.getConfig)(connection.config);
                const portNumber = parseInt(port, 10);
                const dbQueryText = (0, utils_1.getDbQueryText)(query);
                if (thisPlugin._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_DB_SYSTEM] = semconv_1.DB_SYSTEM_VALUE_MYSQL;
                    attributes[semconv_1.ATTR_DB_CONNECTION_STRING] = (0, utils_1.getJDBCString)(host, port, database);
                    attributes[semconv_1.ATTR_DB_NAME] = database;
                    attributes[semconv_1.ATTR_DB_USER] = user;
                    attributes[semconv_1.ATTR_DB_STATEMENT] = dbQueryText;
                }
                if (thisPlugin._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semantic_conventions_1.DB_SYSTEM_NAME_VALUE_MYSQL;
                    attributes[semantic_conventions_1.ATTR_DB_NAMESPACE] = database;
                    attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = dbQueryText;
                }
                if (thisPlugin._netSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_NET_PEER_NAME] = host;
                    if (!isNaN(portNumber)) {
                        attributes[semconv_1.ATTR_NET_PEER_PORT] = portNumber;
                    }
                }
                if (thisPlugin._netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
                    if (!isNaN(portNumber)) {
                        attributes[semantic_conventions_1.ATTR_SERVER_PORT] = portNumber;
                    }
                }
                const span = thisPlugin.tracer.startSpan((0, utils_1.getSpanName)(query), {
                    kind: api_1.SpanKind.CLIENT,
                    attributes
                });
                if (thisPlugin.getConfig().enhancedDatabaseReporting) {
                    let values;
                    if (Array.isArray(_valuesOrCallback)) {
                        values = _valuesOrCallback;
                    } else if (arguments[2]) {
                        values = [
                            _valuesOrCallback
                        ];
                    }
                    span.setAttribute(AttributeNames_1.AttributeNames.MYSQL_VALUES, (0, utils_1.getDbValues)(query, values));
                }
                const cbIndex = Array.from(arguments).findIndex((arg)=>typeof arg === 'function');
                const parentContext = api_1.context.active();
                if (cbIndex === -1) {
                    const streamableQuery = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
                        return originalQuery.apply(connection, arguments);
                    });
                    api_1.context.bind(parentContext, streamableQuery);
                    return streamableQuery.on('error', (err)=>span.setStatus({
                            code: api_1.SpanStatusCode.ERROR,
                            message: err.message
                        })).on('end', ()=>{
                        span.end();
                    });
                } else {
                    thisPlugin._wrap(arguments, cbIndex, thisPlugin._patchCallbackQuery(span, parentContext));
                    return api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
                        return originalQuery.apply(connection, arguments);
                    });
                }
            };
        };
    }
    _patchCallbackQuery(span, parentContext) {
        return (originalCallback)=>{
            return function(err, results, fields) {
                if (err) {
                    span.setStatus({
                        code: api_1.SpanStatusCode.ERROR,
                        message: err.message
                    });
                }
                span.end();
                return api_1.context.with(parentContext, ()=>originalCallback(...arguments));
            };
        };
    }
    _setPoolCallbacks(pool, id) {
        const poolNameOld = id || (0, utils_1.getPoolNameOld)(pool);
        pool.on('connection', (_connection)=>{
            this._connCountAdd(1, poolNameOld, 'idle');
        });
        pool.on('acquire', (_connection)=>{
            this._connCountAdd(-1, poolNameOld, 'idle');
            this._connCountAdd(1, poolNameOld, 'used');
        });
        pool.on('release', (_connection)=>{
            this._connCountAdd(1, poolNameOld, 'idle');
            this._connCountAdd(-1, poolNameOld, 'used');
        });
    }
}
exports.MySQLInstrumentation = MySQLInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MySQLInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "MySQLInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.MySQLInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DB_SYSTEM_VALUE_MYSQL = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_USER = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_NAME = exports.ATTR_DB_CONNECTION_STRING = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `server.address`, `server.port` attributes instead.
 *
 * @example "Server=(localdb)\\v11.0;Integrated Security=true;"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` and `server.port`.
 */ exports.ATTR_DB_CONNECTION_STRING = 'db.connection_string';
/**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, no replacement at this time.
 *
 * @example readonly_user
 * @example reporting_user
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Removed, no replacement at this time.
 */ exports.ATTR_DB_USER = 'db.user';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Enum value "mysql" for attribute {@link ATTR_DB_SYSTEM}.
 *
 * MySQL
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_VALUE_MYSQL = 'mysql'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConnectionPrototypeToInstrument = exports.once = exports.getSpanName = exports.getQueryText = exports.getConnectionAttributes = void 0;
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/semconv.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
/**
 * Get an Attributes map from a mysql connection config object
 *
 * @param config ConnectionConfig
 */ function getConnectionAttributes(config, dbSemconvStability, netSemconvStability) {
    const { host, port, database, user } = getConfig(config);
    const attrs = {};
    if (dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
        attrs[semconv_1.ATTR_DB_CONNECTION_STRING] = getJDBCString(host, port, database);
        attrs[semconv_1.ATTR_DB_NAME] = database;
        attrs[semconv_1.ATTR_DB_USER] = user;
    }
    if (dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
        attrs[semantic_conventions_1.ATTR_DB_NAMESPACE] = database;
    }
    const portNumber = parseInt(port, 10);
    if (netSemconvStability & instrumentation_1.SemconvStability.OLD) {
        attrs[semconv_1.ATTR_NET_PEER_NAME] = host;
        if (!isNaN(portNumber)) {
            attrs[semconv_1.ATTR_NET_PEER_PORT] = portNumber;
        }
    }
    if (netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
        attrs[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
        if (!isNaN(portNumber)) {
            attrs[semantic_conventions_1.ATTR_SERVER_PORT] = portNumber;
        }
    }
    return attrs;
}
exports.getConnectionAttributes = getConnectionAttributes;
function getConfig(config) {
    const { host, port, database, user } = config && config.connectionConfig || config || {};
    return {
        host,
        port,
        database,
        user
    };
}
function getJDBCString(host, port, database) {
    let jdbcString = `jdbc:mysql://${host || 'localhost'}`;
    if (typeof port === 'number') {
        jdbcString += `:${port}`;
    }
    if (typeof database === 'string') {
        jdbcString += `/${database}`;
    }
    return jdbcString;
}
/**
 * Conjures up the value for the db.query.text attribute by formatting a SQL query.
 */ function getQueryText(query, format, values, maskStatement = false, maskStatementHook = defaultMaskingHook) {
    const [querySql, queryValues] = typeof query === 'string' ? [
        query,
        values
    ] : [
        query.sql,
        hasValues(query) ? values || query.values : values
    ];
    try {
        if (maskStatement) {
            return maskStatementHook(querySql);
        } else if (format && queryValues) {
            return format(querySql, queryValues);
        } else {
            return querySql;
        }
    } catch (e) {
        return 'Could not determine the query due to an error in masking or formatting';
    }
}
exports.getQueryText = getQueryText;
/**
 * Replaces numeric values and quoted strings in the query with placeholders ('?').
 *
 * - `\b\d+\b`: Matches whole numbers (integers) and replaces them with '?'.
 * - `(["'])(?:(?=(\\?))\2.)*?\1`:
 *   - Matches quoted strings (both single `'` and double `"` quotes).
 *   - Uses a lookahead `(?=(\\?))` to detect an optional backslash without consuming it immediately.
 *   - Captures the optional backslash `\2` and ensures escaped quotes inside the string are handled correctly.
 *   - Ensures that only complete quoted strings are replaced with '?'.
 *
 * This prevents accidental replacement of escaped quotes within strings and ensures that the
 * query structure remains intact while masking sensitive data.
 */ function defaultMaskingHook(query) {
    return query.replace(/\b\d+\b/g, '?').replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '?');
}
function hasValues(obj) {
    return 'values' in obj;
}
/**
 * The span name SHOULD be set to a low cardinality value
 * representing the statement executed on the database.
 *
 * @returns SQL statement without variable arguments or SQL verb
 */ function getSpanName(query) {
    const rawQuery = typeof query === 'object' ? query.sql : query;
    // Extract the SQL verb
    const firstSpace = rawQuery?.indexOf(' ');
    if (typeof firstSpace === 'number' && firstSpace !== -1) {
        return rawQuery?.substring(0, firstSpace);
    }
    return rawQuery;
}
exports.getSpanName = getSpanName;
const once = (fn)=>{
    let called = false;
    return (...args)=>{
        if (called) return;
        called = true;
        return fn(...args);
    };
};
exports.once = once;
function getConnectionPrototypeToInstrument(connection) {
    const connectionPrototype = connection.prototype;
    const basePrototype = Object.getPrototypeOf(connectionPrototype);
    // mysql2@3.11.5 included a refactoring, where most code was moved out of the `Connection` class and into a shared base
    // so we need to instrument that instead, see https://github.com/sidorares/node-mysql2/pull/3081
    // This checks if the functions we're instrumenting are there on the base - we cannot use the presence of a base
    // prototype since EventEmitter is the base for mysql2@<=3.11.4
    if (typeof basePrototype?.query === 'function' && typeof basePrototype?.execute === 'function') {
        return basePrototype;
    }
    // otherwise instrument the connection directly.
    return connectionPrototype;
}
exports.getConnectionPrototypeToInstrument = getConnectionPrototypeToInstrument; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.60.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-mysql2'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MySQL2Instrumentation = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/semconv.js [app-rsc] (ecmascript)");
const sql_common_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/sql-common/build/src/index.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/utils.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/version.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const supportedVersions = [
    '>=1.4.2 <4'
];
class MySQL2Instrumentation extends instrumentation_1.InstrumentationBase {
    _netSemconvStability;
    _dbSemconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
        this._setSemconvStabilityFromEnv();
    }
    // Used for testing.
    _setSemconvStabilityFromEnv() {
        this._netSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
        this._dbSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    init() {
        let format;
        function setFormatFunction(moduleExports) {
            if (!format && moduleExports.format) {
                format = moduleExports.format;
            }
        }
        const patch = (ConnectionPrototype)=>{
            if ((0, instrumentation_1.isWrapped)(ConnectionPrototype.query)) {
                this._unwrap(ConnectionPrototype, 'query');
            }
            this._wrap(ConnectionPrototype, 'query', this._patchQuery(format, false));
            if ((0, instrumentation_1.isWrapped)(ConnectionPrototype.execute)) {
                this._unwrap(ConnectionPrototype, 'execute');
            }
            this._wrap(ConnectionPrototype, 'execute', this._patchQuery(format, true));
        };
        const unpatch = (ConnectionPrototype)=>{
            this._unwrap(ConnectionPrototype, 'query');
            this._unwrap(ConnectionPrototype, 'execute');
        };
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition('mysql2', supportedVersions, (moduleExports)=>{
                setFormatFunction(moduleExports);
                return moduleExports;
            }, ()=>{}, [
                new instrumentation_1.InstrumentationNodeModuleFile('mysql2/promise.js', supportedVersions, (moduleExports)=>{
                    setFormatFunction(moduleExports);
                    return moduleExports;
                }, ()=>{}),
                new instrumentation_1.InstrumentationNodeModuleFile('mysql2/lib/connection.js', supportedVersions, (moduleExports)=>{
                    const ConnectionPrototype = (0, utils_1.getConnectionPrototypeToInstrument)(moduleExports);
                    patch(ConnectionPrototype);
                    return moduleExports;
                }, (moduleExports)=>{
                    if (moduleExports === undefined) return;
                    const ConnectionPrototype = (0, utils_1.getConnectionPrototypeToInstrument)(moduleExports);
                    unpatch(ConnectionPrototype);
                })
            ])
        ];
    }
    _patchQuery(format, isPrepared) {
        return (originalQuery)=>{
            const thisPlugin = this;
            return function query(query, _valuesOrCallback, _callback) {
                let values;
                if (Array.isArray(_valuesOrCallback)) {
                    values = _valuesOrCallback;
                } else if (arguments[2]) {
                    values = [
                        _valuesOrCallback
                    ];
                }
                const { maskStatement, maskStatementHook, responseHook } = thisPlugin.getConfig();
                const attributes = (0, utils_1.getConnectionAttributes)(this.config, thisPlugin._dbSemconvStability, thisPlugin._netSemconvStability);
                const dbQueryText = (0, utils_1.getQueryText)(query, format, values, maskStatement, maskStatementHook);
                if (thisPlugin._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_DB_SYSTEM] = semconv_1.DB_SYSTEM_VALUE_MYSQL;
                    attributes[semconv_1.ATTR_DB_STATEMENT] = dbQueryText;
                }
                if (thisPlugin._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semantic_conventions_1.DB_SYSTEM_NAME_VALUE_MYSQL;
                    attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = dbQueryText;
                }
                const span = thisPlugin.tracer.startSpan((0, utils_1.getSpanName)(query), {
                    kind: api.SpanKind.CLIENT,
                    attributes
                });
                if (!isPrepared && thisPlugin.getConfig().addSqlCommenterCommentToQueries) {
                    arguments[0] = query = typeof query === 'string' ? (0, sql_common_1.addSqlCommenterComment)(span, query) : Object.assign(query, {
                        sql: (0, sql_common_1.addSqlCommenterComment)(span, query.sql)
                    });
                }
                const endSpan = (0, utils_1.once)((err, results)=>{
                    if (err) {
                        span.setStatus({
                            code: api.SpanStatusCode.ERROR,
                            message: err.message
                        });
                    } else {
                        if (typeof responseHook === 'function') {
                            (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                                responseHook(span, {
                                    queryResults: results
                                });
                            }, (err)=>{
                                if (err) {
                                    thisPlugin._diag.warn('Failed executing responseHook', err);
                                }
                            }, true);
                        }
                    }
                    span.end();
                });
                if (arguments.length === 1) {
                    if (typeof query.onResult === 'function') {
                        thisPlugin._wrap(query, 'onResult', thisPlugin._patchCallbackQuery(endSpan));
                    }
                    const streamableQuery = originalQuery.apply(this, arguments);
                    // `end` in mysql behaves similarly to `result` in mysql2.
                    streamableQuery.once('error', (err)=>{
                        endSpan(err);
                    }).once('result', (results)=>{
                        endSpan(undefined, results);
                    });
                    return streamableQuery;
                }
                if (typeof arguments[1] === 'function') {
                    thisPlugin._wrap(arguments, 1, thisPlugin._patchCallbackQuery(endSpan));
                } else if (typeof arguments[2] === 'function') {
                    thisPlugin._wrap(arguments, 2, thisPlugin._patchCallbackQuery(endSpan));
                }
                return originalQuery.apply(this, arguments);
            };
        };
    }
    _patchCallbackQuery(endSpan) {
        return (originalCallback)=>{
            return function(err, results, fields) {
                endSpan(err, results);
                return originalCallback(...arguments);
            };
        };
    }
}
exports.MySQL2Instrumentation = MySQL2Instrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MySQL2Instrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-mysql2/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "MySQL2Instrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.MySQL2Instrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/sql-common/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSqlCommenterComment = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
// NOTE: This function currently is returning false-positives
// in cases where comment characters appear in string literals
// ("SELECT '-- not a comment';" would return true, although has no comment)
function hasValidSqlComment(query) {
    const indexOpeningDashDashComment = query.indexOf('--');
    if (indexOpeningDashDashComment >= 0) {
        return true;
    }
    const indexOpeningSlashComment = query.indexOf('/*');
    if (indexOpeningSlashComment < 0) {
        return false;
    }
    const indexClosingSlashComment = query.indexOf('*/');
    return indexOpeningDashDashComment < indexClosingSlashComment;
}
// sqlcommenter specification (https://google.github.io/sqlcommenter/spec/#value-serialization)
// expects us to URL encode based on the RFC 3986 spec (https://en.wikipedia.org/wiki/Percent-encoding),
// but encodeURIComponent does not handle some characters correctly (! ' ( ) *),
// which means we need special handling for this
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c)=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}
function addSqlCommenterComment(span, query) {
    if (typeof query !== 'string' || query.length === 0) {
        return query;
    }
    // As per sqlcommenter spec we shall not add a comment if there already is a comment
    // in the query
    if (hasValidSqlComment(query)) {
        return query;
    }
    const propagator = new core_1.W3CTraceContextPropagator();
    const headers = {};
    propagator.inject(api_1.trace.setSpan(api_1.ROOT_CONTEXT, span), headers, api_1.defaultTextMapSetter);
    // sqlcommenter spec requires keys in the comment to be sorted lexicographically
    const sortedKeys = Object.keys(headers).sort();
    if (sortedKeys.length === 0) {
        return query;
    }
    const commentString = sortedKeys.map((key)=>{
        const encodedValue = fixedEncodeURIComponent(headers[key]);
        return `${key}='${encodedValue}'`;
    }).join(',');
    return `${query} /*${commentString}*/`;
}
exports.addSqlCommenterComment = addSqlCommenterComment; //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_LISTENERS_SET = void 0;
exports.EVENT_LISTENERS_SET = Symbol('opentelemetry.instrumentation.pg.eventListenersSet'); //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = void 0;
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
 */ // Postgresql specific attributes not covered by semantic conventions
var AttributeNames;
(function(AttributeNames) {
    AttributeNames["PG_VALUES"] = "db.postgresql.values";
    AttributeNames["PG_PLAN"] = "db.postgresql.plan";
    AttributeNames["IDLE_TIMEOUT_MILLIS"] = "db.postgresql.idle.timeout.millis";
    AttributeNames["MAX_CLIENT"] = "db.postgresql.max.client";
})(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {})); //# sourceMappingURL=AttributeNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS = exports.METRIC_DB_CLIENT_CONNECTION_COUNT = exports.DB_SYSTEM_VALUE_POSTGRESQL = exports.DB_CLIENT_CONNECTION_STATE_VALUE_USED = exports.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_USER = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_NAME = exports.ATTR_DB_CONNECTION_STRING = exports.ATTR_DB_CLIENT_CONNECTION_STATE = exports.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * The name of the connection pool; unique within the instrumented application. In case the connection pool implementation doesn't provide a name, instrumentation **SHOULD** use a combination of parameters that would make the name unique, for example, combining attributes `server.address`, `server.port`, and `db.namespace`, formatted as `server.address:server.port/db.namespace`. Instrumentations that generate connection pool name following different patterns **SHOULD** document it.
 *
 * @example myDataSource
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = 'db.client.connection.pool.name';
/**
 * The state of a connection in the pool
 *
 * @example idle
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_DB_CLIENT_CONNECTION_STATE = 'db.client.connection.state';
/**
 * Deprecated, use `server.address`, `server.port` attributes instead.
 *
 * @example "Server=(localdb)\\v11.0;Integrated Security=true;"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` and `server.port`.
 */ exports.ATTR_DB_CONNECTION_STRING = 'db.connection_string';
/**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, no replacement at this time.
 *
 * @example readonly_user
 * @example reporting_user
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Removed, no replacement at this time.
 */ exports.ATTR_DB_USER = 'db.user';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Enum value "idle" for attribute {@link ATTR_DB_CLIENT_CONNECTION_STATE}.
 */ exports.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = 'idle';
/**
 * Enum value "used" for attribute {@link ATTR_DB_CLIENT_CONNECTION_STATE}.
 */ exports.DB_CLIENT_CONNECTION_STATE_VALUE_USED = 'used';
/**
 * Enum value "postgresql" for attribute {@link ATTR_DB_SYSTEM}.
 */ exports.DB_SYSTEM_VALUE_POSTGRESQL = 'postgresql';
/**
 * The number of connections that are currently in state described by the `state` attribute
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.METRIC_DB_CLIENT_CONNECTION_COUNT = 'db.client.connection.count';
/**
 * The number of current pending requests for an open connection
 *
 * @experimental This metric is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS = 'db.client.connection.pending_requests'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/enums/SpanNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpanNames = void 0;
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
 */ // Contains span names produced by instrumentation
var SpanNames;
(function(SpanNames) {
    SpanNames["QUERY_PREFIX"] = "pg.query";
    SpanNames["CONNECT"] = "pg.connect";
    SpanNames["POOL_CONNECT"] = "pg-pool.connect";
})(SpanNames = exports.SpanNames || (exports.SpanNames = {})); //# sourceMappingURL=SpanNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sanitizedErrorMessage = exports.isObjectWithTextString = exports.getErrorMessage = exports.patchClientConnectCallback = exports.patchCallbackPGPool = exports.updateCounter = exports.getPoolName = exports.patchCallback = exports.handleExecutionResult = exports.handleConfigQuery = exports.shouldSkipInstrumentation = exports.getSemanticAttributesFromPoolConnection = exports.getSemanticAttributesFromConnection = exports.getConnectionString = exports.parseAndMaskConnectionString = exports.parseNormalizedOperationName = exports.getQuerySpanName = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/semconv.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const SpanNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/enums/SpanNames.js [app-rsc] (ecmascript)");
/**
 * Helper function to get a low cardinality span name from whatever info we have
 * about the query.
 *
 * This is tricky, because we don't have most of the information (table name,
 * operation name, etc) the spec recommends using to build a low-cardinality
 * value w/o parsing. So, we use db.name and assume that, if the query's a named
 * prepared statement, those `name` values will be low cardinality. If we don't
 * have a named prepared statement, we try to parse an operation (despite the
 * spec's warnings).
 *
 * @params dbName The name of the db against which this query is being issued,
 *   which could be missing if no db name was given at the time that the
 *   connection was established.
 * @params queryConfig Information we have about the query being issued, typed
 *   to reflect only the validation we've actually done on the args to
 *   `client.query()`. This will be undefined if `client.query()` was called
 *   with invalid arguments.
 */ function getQuerySpanName(dbName, queryConfig) {
    // NB: when the query config is invalid, we omit the dbName too, so that
    // someone (or some tool) reading the span name doesn't misinterpret the
    // dbName as being a prepared statement or sql commit name.
    if (!queryConfig) return SpanNames_1.SpanNames.QUERY_PREFIX;
    // Either the name of a prepared statement; or an attempted parse
    // of the SQL command, normalized to uppercase; or unknown.
    const command = typeof queryConfig.name === 'string' && queryConfig.name ? queryConfig.name : parseNormalizedOperationName(queryConfig.text);
    return `${SpanNames_1.SpanNames.QUERY_PREFIX}:${command}${dbName ? ` ${dbName}` : ''}`;
}
exports.getQuerySpanName = getQuerySpanName;
function parseNormalizedOperationName(queryText) {
    // Trim the query text to handle leading/trailing whitespace
    const trimmedQuery = queryText.trim();
    const indexOfFirstSpace = trimmedQuery.indexOf(' ');
    let sqlCommand = indexOfFirstSpace === -1 ? trimmedQuery : trimmedQuery.slice(0, indexOfFirstSpace);
    sqlCommand = sqlCommand.toUpperCase();
    // Handle query text being "COMMIT;", which has an extra semicolon before the space.
    return sqlCommand.endsWith(';') ? sqlCommand.slice(0, -1) : sqlCommand;
}
exports.parseNormalizedOperationName = parseNormalizedOperationName;
function parseAndMaskConnectionString(connectionString) {
    try {
        // Parse the connection string
        const url = new URL(connectionString);
        // Remove all auth information (username and password)
        url.username = '';
        url.password = '';
        return url.toString();
    } catch (e) {
        // If parsing fails, return a generic connection string
        return 'postgresql://localhost:5432/';
    }
}
exports.parseAndMaskConnectionString = parseAndMaskConnectionString;
function getConnectionString(params) {
    if ('connectionString' in params && params.connectionString) {
        return parseAndMaskConnectionString(params.connectionString);
    }
    const host = params.host || 'localhost';
    const port = params.port || 5432;
    const database = params.database || '';
    return `postgresql://${host}:${port}/${database}`;
}
exports.getConnectionString = getConnectionString;
function getPort(port) {
    // Port may be NaN as parseInt() is used on the value, passing null will result in NaN being parsed.
    // https://github.com/brianc/node-postgres/blob/2a8efbee09a284be12748ed3962bc9b816965e36/packages/pg/lib/connection-parameters.js#L66
    if (Number.isInteger(port)) {
        return port;
    }
    // Unable to find the default used in pg code, so falling back to 'undefined'.
    return undefined;
}
function getSemanticAttributesFromConnection(params, semconvStability) {
    let attributes = {};
    if (semconvStability & instrumentation_1.SemconvStability.OLD) {
        attributes = {
            ...attributes,
            [semconv_1.ATTR_DB_SYSTEM]: semconv_1.DB_SYSTEM_VALUE_POSTGRESQL,
            [semconv_1.ATTR_DB_NAME]: params.database,
            [semconv_1.ATTR_DB_CONNECTION_STRING]: getConnectionString(params),
            [semconv_1.ATTR_DB_USER]: params.user,
            [semconv_1.ATTR_NET_PEER_NAME]: params.host,
            [semconv_1.ATTR_NET_PEER_PORT]: getPort(params.port)
        };
    }
    if (semconvStability & instrumentation_1.SemconvStability.STABLE) {
        attributes = {
            ...attributes,
            [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semantic_conventions_1.DB_SYSTEM_NAME_VALUE_POSTGRESQL,
            [semantic_conventions_1.ATTR_DB_NAMESPACE]: params.namespace,
            [semantic_conventions_1.ATTR_SERVER_ADDRESS]: params.host,
            [semantic_conventions_1.ATTR_SERVER_PORT]: getPort(params.port)
        };
    }
    return attributes;
}
exports.getSemanticAttributesFromConnection = getSemanticAttributesFromConnection;
function getSemanticAttributesFromPoolConnection(params, semconvStability) {
    let url;
    try {
        url = params.connectionString ? new URL(params.connectionString) : undefined;
    } catch (e) {
        url = undefined;
    }
    let attributes = {
        [AttributeNames_1.AttributeNames.IDLE_TIMEOUT_MILLIS]: params.idleTimeoutMillis,
        [AttributeNames_1.AttributeNames.MAX_CLIENT]: params.maxClient
    };
    if (semconvStability & instrumentation_1.SemconvStability.OLD) {
        attributes = {
            ...attributes,
            [semconv_1.ATTR_DB_SYSTEM]: semconv_1.DB_SYSTEM_VALUE_POSTGRESQL,
            [semconv_1.ATTR_DB_NAME]: url?.pathname.slice(1) ?? params.database,
            [semconv_1.ATTR_DB_CONNECTION_STRING]: getConnectionString(params),
            [semconv_1.ATTR_NET_PEER_NAME]: url?.hostname ?? params.host,
            [semconv_1.ATTR_NET_PEER_PORT]: Number(url?.port) || getPort(params.port),
            [semconv_1.ATTR_DB_USER]: url?.username ?? params.user
        };
    }
    if (semconvStability & instrumentation_1.SemconvStability.STABLE) {
        attributes = {
            ...attributes,
            [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semantic_conventions_1.DB_SYSTEM_NAME_VALUE_POSTGRESQL,
            [semantic_conventions_1.ATTR_DB_NAMESPACE]: params.namespace,
            [semantic_conventions_1.ATTR_SERVER_ADDRESS]: url?.hostname ?? params.host,
            [semantic_conventions_1.ATTR_SERVER_PORT]: Number(url?.port) || getPort(params.port)
        };
    }
    return attributes;
}
exports.getSemanticAttributesFromPoolConnection = getSemanticAttributesFromPoolConnection;
function shouldSkipInstrumentation(instrumentationConfig) {
    return instrumentationConfig.requireParentSpan === true && api_1.trace.getSpan(api_1.context.active()) === undefined;
}
exports.shouldSkipInstrumentation = shouldSkipInstrumentation;
// Create a span from our normalized queryConfig object,
// or return a basic span if no queryConfig was given/could be created.
function handleConfigQuery(tracer, instrumentationConfig, semconvStability, queryConfig) {
    // Create child span.
    const { connectionParameters } = this;
    const dbName = connectionParameters.database;
    const spanName = getQuerySpanName(dbName, queryConfig);
    const span = tracer.startSpan(spanName, {
        kind: api_1.SpanKind.CLIENT,
        attributes: getSemanticAttributesFromConnection(connectionParameters, semconvStability)
    });
    if (!queryConfig) {
        return span;
    }
    // Set attributes
    if (queryConfig.text) {
        if (semconvStability & instrumentation_1.SemconvStability.OLD) {
            span.setAttribute(semconv_1.ATTR_DB_STATEMENT, queryConfig.text);
        }
        if (semconvStability & instrumentation_1.SemconvStability.STABLE) {
            span.setAttribute(semantic_conventions_1.ATTR_DB_QUERY_TEXT, queryConfig.text);
        }
    }
    if (instrumentationConfig.enhancedDatabaseReporting && Array.isArray(queryConfig.values)) {
        try {
            const convertedValues = queryConfig.values.map((value)=>{
                if (value == null) {
                    return 'null';
                } else if (value instanceof Buffer) {
                    return value.toString();
                } else if (typeof value === 'object') {
                    if (typeof value.toPostgres === 'function') {
                        return value.toPostgres();
                    }
                    return JSON.stringify(value);
                } else {
                    //string, number
                    return value.toString();
                }
            });
            span.setAttribute(AttributeNames_1.AttributeNames.PG_VALUES, convertedValues);
        } catch (e) {
            api_1.diag.error('failed to stringify ', queryConfig.values, e);
        }
    }
    // Set plan name attribute, if present
    if (typeof queryConfig.name === 'string') {
        span.setAttribute(AttributeNames_1.AttributeNames.PG_PLAN, queryConfig.name);
    }
    return span;
}
exports.handleConfigQuery = handleConfigQuery;
function handleExecutionResult(config, span, pgResult) {
    if (typeof config.responseHook === 'function') {
        (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
            config.responseHook(span, {
                data: pgResult
            });
        }, (err)=>{
            if (err) {
                api_1.diag.error('Error running response hook', err);
            }
        }, true);
    }
}
exports.handleExecutionResult = handleExecutionResult;
function patchCallback(instrumentationConfig, span, cb, attributes, recordDuration) {
    return function patchedCallback(err, res) {
        if (err) {
            if (Object.prototype.hasOwnProperty.call(err, 'code')) {
                attributes[semantic_conventions_1.ATTR_ERROR_TYPE] = err['code'];
            }
            if (err instanceof Error) {
                span.recordException(sanitizedErrorMessage(err));
            }
            span.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message: err.message
            });
        } else {
            handleExecutionResult(instrumentationConfig, span, res);
        }
        recordDuration();
        span.end();
        cb.call(this, err, res);
    };
}
exports.patchCallback = patchCallback;
function getPoolName(pool) {
    let poolName = '';
    poolName += (pool?.host ? `${pool.host}` : 'unknown_host') + ':';
    poolName += (pool?.port ? `${pool.port}` : 'unknown_port') + '/';
    poolName += pool?.database ? `${pool.database}` : 'unknown_database';
    return poolName.trim();
}
exports.getPoolName = getPoolName;
function updateCounter(poolName, pool, connectionCount, connectionPendingRequests, latestCounter) {
    const all = pool.totalCount;
    const pending = pool.waitingCount;
    const idle = pool.idleCount;
    const used = all - idle;
    connectionCount.add(used - latestCounter.used, {
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_STATE]: semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_USED,
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName
    });
    connectionCount.add(idle - latestCounter.idle, {
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_STATE]: semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE,
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName
    });
    connectionPendingRequests.add(pending - latestCounter.pending, {
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName
    });
    return {
        used: used,
        idle: idle,
        pending: pending
    };
}
exports.updateCounter = updateCounter;
function patchCallbackPGPool(span, cb) {
    return function patchedCallback(err, res, done) {
        if (err) {
            if (err instanceof Error) {
                span.recordException(sanitizedErrorMessage(err));
            }
            span.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message: err.message
            });
        }
        span.end();
        cb.call(this, err, res, done);
    };
}
exports.patchCallbackPGPool = patchCallbackPGPool;
function patchClientConnectCallback(span, cb) {
    return function patchedClientConnectCallback(err) {
        if (err) {
            if (err instanceof Error) {
                span.recordException(sanitizedErrorMessage(err));
            }
            span.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message: err.message
            });
        }
        span.end();
        cb.apply(this, arguments);
    };
}
exports.patchClientConnectCallback = patchClientConnectCallback;
/**
 * Attempt to get a message string from a thrown value, while being quite
 * defensive, to recognize the fact that, in JS, any kind of value (even
 * primitives) can be thrown.
 */ function getErrorMessage(e) {
    return typeof e === 'object' && e !== null && 'message' in e ? String(e.message) : undefined;
}
exports.getErrorMessage = getErrorMessage;
function isObjectWithTextString(it) {
    return typeof it === 'object' && typeof it?.text === 'string';
}
exports.isObjectWithTextString = isObjectWithTextString;
/**
 * Generates a sanitized message for the error.
 * Only includes the error type and PostgreSQL error code, omitting any sensitive details.
 */ function sanitizedErrorMessage(error) {
    const name = error?.name ?? 'PostgreSQLError';
    const code = error?.code ?? 'UNKNOWN';
    return `PostgreSQL error of type '${name}' occurred (code: ${code})`;
}
exports.sanitizedErrorMessage = sanitizedErrorMessage; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.66.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-pg'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PgInstrumentation = void 0;
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
 */ const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/internal-types.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/utils.js [app-rsc] (ecmascript)");
const sql_common_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/sql-common/build/src/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/version.js [app-rsc] (ecmascript)");
const SpanNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/enums/SpanNames.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/semconv.js [app-rsc] (ecmascript)");
function extractModuleExports(module) {
    return module[Symbol.toStringTag] === 'Module' ? module.default // ESM
     : module; // CommonJS
}
class PgInstrumentation extends instrumentation_1.InstrumentationBase {
    // Pool events connect, acquire, release and remove can be called
    // multiple times without changing the values of total, idle and waiting
    // connections. The _connectionsCounter is used to keep track of latest
    // values and only update the metrics _connectionsCount and _connectionPendingRequests
    // when the value change.
    _connectionsCounter = {
        used: 0,
        idle: 0,
        pending: 0
    };
    _semconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
        this._semconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    _updateMetricInstruments() {
        this._operationDuration = this.meter.createHistogram(semantic_conventions_1.METRIC_DB_CLIENT_OPERATION_DURATION, {
            description: 'Duration of database client operations.',
            unit: 's',
            valueType: api_1.ValueType.DOUBLE,
            advice: {
                explicitBucketBoundaries: [
                    0.001,
                    0.005,
                    0.01,
                    0.05,
                    0.1,
                    0.5,
                    1,
                    5,
                    10
                ]
            }
        });
        this._connectionsCounter = {
            idle: 0,
            pending: 0,
            used: 0
        };
        this._connectionsCount = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTION_COUNT, {
            description: 'The number of connections that are currently in state described by the state attribute.',
            unit: '{connection}'
        });
        this._connectionPendingRequests = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS, {
            description: 'The number of current pending requests for an open connection.',
            unit: '{connection}'
        });
    }
    init() {
        const SUPPORTED_PG_VERSIONS = [
            '>=8.0.3 <9'
        ];
        const SUPPORTED_PG_POOL_VERSIONS = [
            '>=2.0.0 <4'
        ];
        const modulePgNativeClient = new instrumentation_1.InstrumentationNodeModuleFile('pg/lib/native/client.js', SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
        const modulePgClient = new instrumentation_1.InstrumentationNodeModuleFile('pg/lib/client.js', SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
        const modulePG = new instrumentation_1.InstrumentationNodeModuleDefinition('pg', SUPPORTED_PG_VERSIONS, (module)=>{
            const moduleExports = extractModuleExports(module);
            this._patchPgClient(moduleExports.Client);
            return module;
        }, (module)=>{
            const moduleExports = extractModuleExports(module);
            this._unpatchPgClient(moduleExports.Client);
            return module;
        }, [
            modulePgClient,
            modulePgNativeClient
        ]);
        const modulePGPool = new instrumentation_1.InstrumentationNodeModuleDefinition('pg-pool', SUPPORTED_PG_POOL_VERSIONS, (module)=>{
            const moduleExports = extractModuleExports(module);
            if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
                this._unwrap(moduleExports.prototype, 'connect');
            }
            this._wrap(moduleExports.prototype, 'connect', this._getPoolConnectPatch());
            return moduleExports;
        }, (module)=>{
            const moduleExports = extractModuleExports(module);
            if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
                this._unwrap(moduleExports.prototype, 'connect');
            }
        });
        return [
            modulePG,
            modulePGPool
        ];
    }
    _patchPgClient(module) {
        if (!module) {
            return;
        }
        const moduleExports = extractModuleExports(module);
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.query)) {
            this._unwrap(moduleExports.prototype, 'query');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
            this._unwrap(moduleExports.prototype, 'connect');
        }
        this._wrap(moduleExports.prototype, 'query', this._getClientQueryPatch());
        this._wrap(moduleExports.prototype, 'connect', this._getClientConnectPatch());
        return module;
    }
    _unpatchPgClient(module) {
        const moduleExports = extractModuleExports(module);
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.query)) {
            this._unwrap(moduleExports.prototype, 'query');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
            this._unwrap(moduleExports.prototype, 'connect');
        }
        return module;
    }
    _getClientConnectPatch() {
        const plugin = this;
        return (original)=>{
            return function connect(callback) {
                const config = plugin.getConfig();
                if (utils.shouldSkipInstrumentation(config) || config.ignoreConnectSpans) {
                    return original.call(this, callback);
                }
                const span = plugin.tracer.startSpan(SpanNames_1.SpanNames.CONNECT, {
                    kind: api_1.SpanKind.CLIENT,
                    attributes: utils.getSemanticAttributesFromConnection(this, plugin._semconvStability)
                });
                if (callback) {
                    const parentSpan = api_1.trace.getSpan(api_1.context.active());
                    callback = utils.patchClientConnectCallback(span, callback);
                    if (parentSpan) {
                        callback = api_1.context.bind(api_1.context.active(), callback);
                    }
                }
                const connectResult = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
                    return original.call(this, callback);
                });
                return handleConnectResult(span, connectResult);
            };
        };
    }
    recordOperationDuration(attributes, startTime) {
        const metricsAttributes = {};
        const keysToCopy = [
            semantic_conventions_1.ATTR_DB_NAMESPACE,
            semantic_conventions_1.ATTR_ERROR_TYPE,
            semantic_conventions_1.ATTR_SERVER_PORT,
            semantic_conventions_1.ATTR_SERVER_ADDRESS,
            semantic_conventions_1.ATTR_DB_OPERATION_NAME
        ];
        if (this._semconvStability & instrumentation_1.SemconvStability.OLD) {
            keysToCopy.push(semconv_1.ATTR_DB_SYSTEM);
        }
        if (this._semconvStability & instrumentation_1.SemconvStability.STABLE) {
            keysToCopy.push(semantic_conventions_1.ATTR_DB_SYSTEM_NAME);
        }
        keysToCopy.forEach((key)=>{
            if (key in attributes) {
                metricsAttributes[key] = attributes[key];
            }
        });
        const durationSeconds = (0, core_1.hrTimeToMilliseconds)((0, core_1.hrTimeDuration)(startTime, (0, core_1.hrTime)())) / 1000;
        this._operationDuration.record(durationSeconds, metricsAttributes);
    }
    _getClientQueryPatch() {
        const plugin = this;
        return (original)=>{
            this._diag.debug('Patching pg.Client.prototype.query');
            return function query(...args) {
                if (utils.shouldSkipInstrumentation(plugin.getConfig())) {
                    return original.apply(this, args);
                }
                const startTime = (0, core_1.hrTime)();
                // client.query(text, cb?), client.query(text, values, cb?), and
                // client.query(configObj, cb?) are all valid signatures. We construct
                // a queryConfig obj from all (valid) signatures to build the span in a
                // unified way. We verify that we at least have query text, and code
                // defensively when dealing with `queryConfig` after that (to handle all
                // the other invalid cases, like a non-array for values being provided).
                // The type casts here reflect only what we've actually validated.
                const arg0 = args[0];
                const firstArgIsString = typeof arg0 === 'string';
                const firstArgIsQueryObjectWithText = utils.isObjectWithTextString(arg0);
                // TODO: remove the `as ...` casts below when the TS version is upgraded.
                // Newer TS versions will use the result of firstArgIsQueryObjectWithText
                // to properly narrow arg0, but TS 4.3.5 does not.
                const queryConfig = firstArgIsString ? {
                    text: arg0,
                    values: Array.isArray(args[1]) ? args[1] : undefined
                } : firstArgIsQueryObjectWithText ? {
                    ...arg0,
                    name: arg0.name,
                    text: arg0.text,
                    values: arg0.values ?? (Array.isArray(args[1]) ? args[1] : undefined)
                } : undefined;
                const attributes = {
                    [semconv_1.ATTR_DB_SYSTEM]: semconv_1.DB_SYSTEM_VALUE_POSTGRESQL,
                    [semantic_conventions_1.ATTR_DB_NAMESPACE]: this.database,
                    [semantic_conventions_1.ATTR_SERVER_PORT]: this.connectionParameters.port,
                    [semantic_conventions_1.ATTR_SERVER_ADDRESS]: this.connectionParameters.host
                };
                if (queryConfig?.text) {
                    attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = utils.parseNormalizedOperationName(queryConfig?.text);
                }
                const recordDuration = ()=>{
                    plugin.recordOperationDuration(attributes, startTime);
                };
                const instrumentationConfig = plugin.getConfig();
                const span = utils.handleConfigQuery.call(this, plugin.tracer, instrumentationConfig, plugin._semconvStability, queryConfig);
                // Modify query text w/ a tracing comment before invoking original for
                // tracing, but only if args[0] has one of our expected shapes.
                if (instrumentationConfig.addSqlCommenterCommentToQueries) {
                    if (firstArgIsString) {
                        args[0] = (0, sql_common_1.addSqlCommenterComment)(span, arg0);
                    } else if (firstArgIsQueryObjectWithText && !('name' in arg0)) {
                        // In the case of a query object, we need to ensure there's no name field
                        // as this indicates a prepared query, where the comment would remain the same
                        // for every invocation and contain an outdated trace context.
                        args[0] = {
                            ...arg0,
                            text: (0, sql_common_1.addSqlCommenterComment)(span, arg0.text)
                        };
                    }
                }
                // Bind callback (if any) to parent span (if any)
                if (args.length > 0) {
                    const parentSpan = api_1.trace.getSpan(api_1.context.active());
                    if (typeof args[args.length - 1] === 'function') {
                        // Patch ParameterQuery callback
                        args[args.length - 1] = utils.patchCallback(instrumentationConfig, span, args[args.length - 1], attributes, recordDuration);
                        // If a parent span exists, bind the callback
                        if (parentSpan) {
                            args[args.length - 1] = api_1.context.bind(api_1.context.active(), args[args.length - 1]);
                        }
                    } else if (typeof queryConfig?.callback === 'function') {
                        // Patch ConfigQuery callback
                        let callback = utils.patchCallback(plugin.getConfig(), span, queryConfig.callback, attributes, recordDuration);
                        // If a parent span existed, bind the callback
                        if (parentSpan) {
                            callback = api_1.context.bind(api_1.context.active(), callback);
                        }
                        args[0].callback = callback;
                    }
                }
                const { requestHook } = instrumentationConfig;
                if (typeof requestHook === 'function' && queryConfig) {
                    (0, instrumentation_1.safeExecuteInTheMiddle)(()=>{
                        // pick keys to expose explicitly, so we're not leaking pg package
                        // internals that are subject to change
                        const { database, host, port, user } = this.connectionParameters;
                        const connection = {
                            database,
                            host,
                            port,
                            user
                        };
                        requestHook(span, {
                            connection,
                            query: {
                                text: queryConfig.text,
                                // nb: if `client.query` is called with illegal arguments
                                // (e.g., if `queryConfig.values` is passed explicitly, but a
                                // non-array is given), then the type casts will be wrong. But
                                // we leave it up to the queryHook to handle that, and we
                                // catch and swallow any errors it throws. The other options
                                // are all worse. E.g., we could leave `queryConfig.values`
                                // and `queryConfig.name` as `unknown`, but then the hook body
                                // would be forced to validate (or cast) them before using
                                // them, which seems incredibly cumbersome given that these
                                // casts will be correct 99.9% of the time -- and pg.query
                                // will immediately throw during development in the other .1%
                                // of cases. Alternatively, we could simply skip calling the
                                // hook when `values` or `name` don't have the expected type,
                                // but that would add unnecessary validation overhead to every
                                // hook invocation and possibly be even more confusing/unexpected.
                                values: queryConfig.values,
                                name: queryConfig.name
                            }
                        });
                    }, (err)=>{
                        if (err) {
                            plugin._diag.error('Error running query hook', err);
                        }
                    }, true);
                }
                let result;
                try {
                    result = original.apply(this, args);
                } catch (e) {
                    if (e instanceof Error) {
                        span.recordException(utils.sanitizedErrorMessage(e));
                    }
                    span.setStatus({
                        code: api_1.SpanStatusCode.ERROR,
                        message: utils.getErrorMessage(e)
                    });
                    span.end();
                    throw e;
                }
                // Bind promise to parent span and end the span
                if (result instanceof Promise) {
                    return result.then((result)=>{
                        // Return a pass-along promise which ends the span and then goes to user's orig resolvers
                        return new Promise((resolve)=>{
                            utils.handleExecutionResult(plugin.getConfig(), span, result);
                            recordDuration();
                            span.end();
                            resolve(result);
                        });
                    }).catch((error)=>{
                        return new Promise((_, reject)=>{
                            if (error instanceof Error) {
                                span.recordException(utils.sanitizedErrorMessage(error));
                            }
                            span.setStatus({
                                code: api_1.SpanStatusCode.ERROR,
                                message: error.message
                            });
                            recordDuration();
                            span.end();
                            reject(error);
                        });
                    });
                }
                // else returns void
                return result; // void
            };
        };
    }
    _setPoolConnectEventListeners(pgPool) {
        if (pgPool[internal_types_1.EVENT_LISTENERS_SET]) return;
        const poolName = utils.getPoolName(pgPool.options);
        pgPool.on('connect', ()=>{
            this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool.on('acquire', ()=>{
            this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool.on('remove', ()=>{
            this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool.on('release', ()=>{
            this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool[internal_types_1.EVENT_LISTENERS_SET] = true;
    }
    _getPoolConnectPatch() {
        const plugin = this;
        return (originalConnect)=>{
            return function connect(callback) {
                const config = plugin.getConfig();
                if (utils.shouldSkipInstrumentation(config)) {
                    return originalConnect.call(this, callback);
                }
                // Still set up event listeners for metrics even when skipping spans
                plugin._setPoolConnectEventListeners(this);
                if (config.ignoreConnectSpans) {
                    return originalConnect.call(this, callback);
                }
                // setup span
                const span = plugin.tracer.startSpan(SpanNames_1.SpanNames.POOL_CONNECT, {
                    kind: api_1.SpanKind.CLIENT,
                    attributes: utils.getSemanticAttributesFromPoolConnection(this.options, plugin._semconvStability)
                });
                if (callback) {
                    const parentSpan = api_1.trace.getSpan(api_1.context.active());
                    callback = utils.patchCallbackPGPool(span, callback);
                    // If a parent span exists, bind the callback
                    if (parentSpan) {
                        callback = api_1.context.bind(api_1.context.active(), callback);
                    }
                }
                const connectResult = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), ()=>{
                    return originalConnect.call(this, callback);
                });
                return handleConnectResult(span, connectResult);
            };
        };
    }
}
exports.PgInstrumentation = PgInstrumentation;
function handleConnectResult(span, connectResult) {
    if (!(connectResult instanceof Promise)) {
        return connectResult;
    }
    const connectResultPromise = connectResult;
    return api_1.context.bind(api_1.context.active(), connectResultPromise.then((result)=>{
        span.end();
        return result;
    }).catch((error)=>{
        if (error instanceof Error) {
            span.recordException(utils.sanitizedErrorMessage(error));
        }
        span.setStatus({
            code: api_1.SpanStatusCode.ERROR,
            message: utils.getErrorMessage(error)
        });
        span.end();
        return Promise.reject(error);
    }));
} //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = exports.PgInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "PgInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.PgInstrumentation;
    }
});
var AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-pg/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "AttributeNames", {
    enumerable: true,
    get: function() {
        return AttributeNames_1.AttributeNames;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.60.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-hapi'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HapiLifecycleMethodNames = exports.HapiLayerType = exports.handlerPatched = exports.HapiComponentName = void 0;
exports.HapiComponentName = '@hapi/hapi';
/**
 * This symbol is used to mark a Hapi route handler or server extension handler as
 * already patched, since its possible to use these handlers multiple times
 * i.e. when allowing multiple versions of one plugin, or when registering a plugin
 * multiple times on different servers.
 */ exports.handlerPatched = Symbol('hapi-handler-patched');
exports.HapiLayerType = {
    ROUTER: 'router',
    PLUGIN: 'plugin',
    EXT: 'server.ext'
};
exports.HapiLifecycleMethodNames = new Set([
    'onPreAuth',
    'onCredentials',
    'onPostAuth',
    'onPreHandler',
    'onPostHandler',
    'onPreResponse',
    'onRequest'
]); //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ATTR_HTTP_METHOD = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `http.request.method` instead.
 *
 * @example GET
 * @example POST
 * @example HEAD
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `http.request.method`.
 */ exports.ATTR_HTTP_METHOD = 'http.method'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = void 0;
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
 */ var AttributeNames;
(function(AttributeNames) {
    AttributeNames["HAPI_TYPE"] = "hapi.type";
    AttributeNames["PLUGIN_NAME"] = "hapi.plugin.name";
    AttributeNames["EXT_TYPE"] = "server.ext.type";
})(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {})); //# sourceMappingURL=AttributeNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPluginFromInput = exports.getExtMetadata = exports.getRouteMetadata = exports.isPatchableExtMethod = exports.isDirectExtInput = exports.isLifecycleExtEventObj = exports.isLifecycleExtType = exports.getPluginName = void 0;
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/semconv.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/internal-types.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
function getPluginName(plugin) {
    if (plugin.name) {
        return plugin.name;
    } else {
        return plugin.pkg.name;
    }
}
exports.getPluginName = getPluginName;
const isLifecycleExtType = (variableToCheck)=>{
    return typeof variableToCheck === 'string' && internal_types_1.HapiLifecycleMethodNames.has(variableToCheck);
};
exports.isLifecycleExtType = isLifecycleExtType;
const isLifecycleExtEventObj = (variableToCheck)=>{
    const event = variableToCheck?.type;
    return event !== undefined && (0, exports.isLifecycleExtType)(event);
};
exports.isLifecycleExtEventObj = isLifecycleExtEventObj;
const isDirectExtInput = (variableToCheck)=>{
    return Array.isArray(variableToCheck) && variableToCheck.length <= 3 && (0, exports.isLifecycleExtType)(variableToCheck[0]) && typeof variableToCheck[1] === 'function';
};
exports.isDirectExtInput = isDirectExtInput;
const isPatchableExtMethod = (variableToCheck)=>{
    return !Array.isArray(variableToCheck);
};
exports.isPatchableExtMethod = isPatchableExtMethod;
const getRouteMetadata = (route, semconvStability, pluginName)=>{
    const attributes = {
        [semantic_conventions_1.ATTR_HTTP_ROUTE]: route.path
    };
    if (semconvStability & instrumentation_1.SemconvStability.OLD) {
        attributes[semconv_1.ATTR_HTTP_METHOD] = route.method;
    }
    if (semconvStability & instrumentation_1.SemconvStability.STABLE) {
        // Note: This currently does *not* normalize the method name to uppercase
        // and conditionally include `http.request.method.original` as described
        // at https://opentelemetry.io/docs/specs/semconv/http/http-spans/
        // These attributes are for a *hapi* span, and not the parent HTTP span,
        // so the HTTP span guidance doesn't strictly apply.
        attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD] = route.method;
    }
    let name;
    if (pluginName) {
        attributes[AttributeNames_1.AttributeNames.HAPI_TYPE] = internal_types_1.HapiLayerType.PLUGIN;
        attributes[AttributeNames_1.AttributeNames.PLUGIN_NAME] = pluginName;
        name = `${pluginName}: route - ${route.path}`;
    } else {
        attributes[AttributeNames_1.AttributeNames.HAPI_TYPE] = internal_types_1.HapiLayerType.ROUTER;
        name = `route - ${route.path}`;
    }
    return {
        attributes,
        name
    };
};
exports.getRouteMetadata = getRouteMetadata;
const getExtMetadata = (extPoint, pluginName, methodName)=>{
    let baseName = `ext - ${extPoint}`;
    if (methodName && methodName !== 'method') {
        // method is the default name for the extension in the ServerExtEventsObject format.
        baseName = `ext - ${extPoint} - ${methodName}`;
    }
    if (pluginName) {
        return {
            attributes: {
                [AttributeNames_1.AttributeNames.EXT_TYPE]: extPoint,
                [AttributeNames_1.AttributeNames.HAPI_TYPE]: internal_types_1.HapiLayerType.EXT,
                [AttributeNames_1.AttributeNames.PLUGIN_NAME]: pluginName
            },
            name: `${pluginName}: ${baseName}`
        };
    }
    return {
        attributes: {
            [AttributeNames_1.AttributeNames.EXT_TYPE]: extPoint,
            [AttributeNames_1.AttributeNames.HAPI_TYPE]: internal_types_1.HapiLayerType.EXT
        },
        name: baseName
    };
};
exports.getExtMetadata = getExtMetadata;
const getPluginFromInput = (pluginObj)=>{
    if ('plugin' in pluginObj) {
        if ('plugin' in pluginObj.plugin) {
            return pluginObj.plugin.plugin;
        }
        return pluginObj.plugin;
    }
    return pluginObj;
};
exports.getPluginFromInput = getPluginFromInput; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HapiInstrumentation = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/version.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/internal-types.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/utils.js [app-rsc] (ecmascript)");
/** Hapi instrumentation for OpenTelemetry */ class HapiInstrumentation extends instrumentation_1.InstrumentationBase {
    _semconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
        this._semconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    init() {
        return new instrumentation_1.InstrumentationNodeModuleDefinition(internal_types_1.HapiComponentName, [
            '>=17.0.0 <22'
        ], (module)=>{
            const moduleExports = module[Symbol.toStringTag] === 'Module' ? module.default : module;
            if (!(0, instrumentation_1.isWrapped)(moduleExports.server)) {
                this._wrap(moduleExports, 'server', this._getServerPatch.bind(this));
            }
            if (!(0, instrumentation_1.isWrapped)(moduleExports.Server)) {
                this._wrap(moduleExports, 'Server', this._getServerPatch.bind(this));
            }
            return moduleExports;
        }, (module)=>{
            const moduleExports = module[Symbol.toStringTag] === 'Module' ? module.default : module;
            this._massUnwrap([
                moduleExports
            ], [
                'server',
                'Server'
            ]);
        });
    }
    /**
     * Patches the Hapi.server and Hapi.Server functions in order to instrument
     * the server.route, server.ext, and server.register functions via calls to the
     * @function _getServerRoutePatch, @function _getServerExtPatch, and
     * @function _getServerRegisterPatch functions
     * @param original - the original Hapi Server creation function
     */ _getServerPatch(original) {
        const instrumentation = this;
        const self = this;
        return function server(opts) {
            const newServer = original.apply(this, [
                opts
            ]);
            self._wrap(newServer, 'route', (originalRouter)=>{
                return instrumentation._getServerRoutePatch.bind(instrumentation)(originalRouter);
            });
            // Casting as any is necessary here due to multiple overloads on the Hapi.ext
            // function, which requires supporting a variety of different parameters
            // as extension inputs
            self._wrap(newServer, 'ext', (originalExtHandler)=>{
                return instrumentation._getServerExtPatch.bind(instrumentation)(// eslint-disable-next-line @typescript-eslint/no-explicit-any
                originalExtHandler);
            });
            // Casting as any is necessary here due to multiple overloads on the Hapi.Server.register
            // function, which requires supporting a variety of different types of Plugin inputs
            self._wrap(newServer, 'register', // eslint-disable-next-line @typescript-eslint/no-explicit-any
            instrumentation._getServerRegisterPatch.bind(instrumentation));
            return newServer;
        };
    }
    /**
     * Patches the plugin register function used by the Hapi Server. This function
     * goes through each plugin that is being registered and adds instrumentation
     * via a call to the @function _wrapRegisterHandler function.
     * @param {RegisterFunction<T>} original - the original register function which
     * registers each plugin on the server
     */ _getServerRegisterPatch(original) {
        const instrumentation = this;
        return function register(pluginInput, options) {
            if (Array.isArray(pluginInput)) {
                for (const pluginObj of pluginInput){
                    const plugin = (0, utils_1.getPluginFromInput)(pluginObj);
                    instrumentation._wrapRegisterHandler(plugin);
                }
            } else {
                const plugin = (0, utils_1.getPluginFromInput)(pluginInput);
                instrumentation._wrapRegisterHandler(plugin);
            }
            return original.apply(this, [
                pluginInput,
                options
            ]);
        };
    }
    /**
     * Patches the Server.ext function which adds extension methods to the specified
     * point along the request lifecycle. This function accepts the full range of
     * accepted input into the standard Hapi `server.ext` function. For each extension,
     * it adds instrumentation to the handler via a call to the @function _wrapExtMethods
     * function.
     * @param original - the original ext function which adds the extension method to the server
     * @param {string} [pluginName] - if present, represents the name of the plugin responsible
     * for adding this server extension. Else, signifies that the extension was added directly
     */ _getServerExtPatch(original, pluginName) {
        const instrumentation = this;
        return function ext(...args) {
            if (Array.isArray(args[0])) {
                const eventsList = args[0];
                for(let i = 0; i < eventsList.length; i++){
                    const eventObj = eventsList[i];
                    if ((0, utils_1.isLifecycleExtType)(eventObj.type)) {
                        const lifecycleEventObj = eventObj;
                        const handler = instrumentation._wrapExtMethods(lifecycleEventObj.method, eventObj.type, pluginName);
                        lifecycleEventObj.method = handler;
                        eventsList[i] = lifecycleEventObj;
                    }
                }
                return original.apply(this, args);
            } else if ((0, utils_1.isDirectExtInput)(args)) {
                const extInput = args;
                const method = extInput[1];
                const handler = instrumentation._wrapExtMethods(method, extInput[0], pluginName);
                return original.apply(this, [
                    extInput[0],
                    handler,
                    extInput[2]
                ]);
            } else if ((0, utils_1.isLifecycleExtEventObj)(args[0])) {
                const lifecycleEventObj = args[0];
                const handler = instrumentation._wrapExtMethods(lifecycleEventObj.method, lifecycleEventObj.type, pluginName);
                lifecycleEventObj.method = handler;
                return original.call(this, lifecycleEventObj);
            }
            return original.apply(this, args);
        };
    }
    /**
     * Patches the Server.route function. This function accepts either one or an array
     * of Hapi.ServerRoute objects and adds instrumentation on each route via a call to
     * the @function _wrapRouteHandler function.
     * @param {HapiServerRouteInputMethod} original - the original route function which adds
     * the route to the server
     * @param {string} [pluginName] - if present, represents the name of the plugin responsible
     * for adding this server route. Else, signifies that the route was added directly
     */ _getServerRoutePatch(original, pluginName) {
        const instrumentation = this;
        return function route(route) {
            if (Array.isArray(route)) {
                for(let i = 0; i < route.length; i++){
                    const newRoute = instrumentation._wrapRouteHandler.call(instrumentation, route[i], pluginName);
                    route[i] = newRoute;
                }
            } else {
                route = instrumentation._wrapRouteHandler.call(instrumentation, route, pluginName);
            }
            return original.apply(this, [
                route
            ]);
        };
    }
    /**
     * Wraps newly registered plugins to add instrumentation to the plugin's clone of
     * the original server. Specifically, wraps the server.route and server.ext functions
     * via calls to @function _getServerRoutePatch and @function _getServerExtPatch
     * @param {Hapi.Plugin<T>} plugin - the new plugin which is being instrumented
     */ _wrapRegisterHandler(plugin) {
        const instrumentation = this;
        const pluginName = (0, utils_1.getPluginName)(plugin);
        const oldRegister = plugin.register;
        const self = this;
        const newRegisterHandler = function(server, options) {
            self._wrap(server, 'route', (original)=>{
                return instrumentation._getServerRoutePatch.bind(instrumentation)(original, pluginName);
            });
            // Casting as any is necessary here due to multiple overloads on the Hapi.ext
            // function, which requires supporting a variety of different parameters
            // as extension inputs
            self._wrap(server, 'ext', (originalExtHandler)=>{
                return instrumentation._getServerExtPatch.bind(instrumentation)(// eslint-disable-next-line @typescript-eslint/no-explicit-any
                originalExtHandler, pluginName);
            });
            return oldRegister.call(this, server, options);
        };
        plugin.register = newRegisterHandler;
    }
    /**
     * Wraps request extension methods to add instrumentation to each new extension handler.
     * Patches each individual extension in order to create the
     * span and propagate context. It does not create spans when there is no parent span.
     * @param {PatchableExtMethod | PatchableExtMethod[]} method - the request extension
     * handler which is being instrumented
     * @param {Hapi.ServerRequestExtType} extPoint - the point in the Hapi request lifecycle
     * which this extension targets
     * @param {string} [pluginName] - if present, represents the name of the plugin responsible
     * for adding this server route. Else, signifies that the route was added directly
     */ _wrapExtMethods(method, extPoint, pluginName) {
        const instrumentation = this;
        if (method instanceof Array) {
            for(let i = 0; i < method.length; i++){
                method[i] = instrumentation._wrapExtMethods(method[i], extPoint);
            }
            return method;
        } else if ((0, utils_1.isPatchableExtMethod)(method)) {
            if (method[internal_types_1.handlerPatched] === true) return method;
            method[internal_types_1.handlerPatched] = true;
            const newHandler = async function(...params) {
                if (api.trace.getSpan(api.context.active()) === undefined) {
                    return await method.apply(this, params);
                }
                const metadata = (0, utils_1.getExtMetadata)(extPoint, pluginName, method.name);
                const span = instrumentation.tracer.startSpan(metadata.name, {
                    attributes: metadata.attributes
                });
                try {
                    return await api.context.with(api.trace.setSpan(api.context.active(), span), method, undefined, ...params);
                } catch (err) {
                    span.recordException(err);
                    span.setStatus({
                        code: api.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    throw err;
                } finally{
                    span.end();
                }
            };
            return newHandler;
        }
        return method;
    }
    /**
     * Patches each individual route handler method in order to create the
     * span and propagate context. It does not create spans when there is no parent span.
     * @param {PatchableServerRoute} route - the route handler which is being instrumented
     * @param {string} [pluginName] - if present, represents the name of the plugin responsible
     * for adding this server route. Else, signifies that the route was added directly
     */ _wrapRouteHandler(route, pluginName) {
        const instrumentation = this;
        if (route[internal_types_1.handlerPatched] === true) return route;
        route[internal_types_1.handlerPatched] = true;
        const wrapHandler = (oldHandler)=>{
            return async function(...params) {
                if (api.trace.getSpan(api.context.active()) === undefined) {
                    return await oldHandler.call(this, ...params);
                }
                const rpcMetadata = (0, core_1.getRPCMetadata)(api.context.active());
                if (rpcMetadata?.type === core_1.RPCType.HTTP) {
                    rpcMetadata.route = route.path;
                }
                const metadata = (0, utils_1.getRouteMetadata)(route, instrumentation._semconvStability, pluginName);
                const span = instrumentation.tracer.startSpan(metadata.name, {
                    attributes: metadata.attributes
                });
                try {
                    return await api.context.with(api.trace.setSpan(api.context.active(), span), ()=>oldHandler.call(this, ...params));
                } catch (err) {
                    span.recordException(err);
                    span.setStatus({
                        code: api.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    throw err;
                } finally{
                    span.end();
                }
            };
        };
        if (typeof route.handler === 'function') {
            route.handler = wrapHandler(route.handler);
        } else if (typeof route.options === 'function') {
            const oldOptions = route.options;
            route.options = function(server) {
                const options = oldOptions(server);
                if (typeof options.handler === 'function') {
                    options.handler = wrapHandler(options.handler);
                }
                return options;
            };
        } else if (typeof route.options?.handler === 'function') {
            route.options.handler = wrapHandler(route.options.handler);
        }
        return route;
    }
}
exports.HapiInstrumentation = HapiInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = exports.HapiInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "HapiInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.HapiInstrumentation;
    }
});
var AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-hapi/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "AttributeNames", {
    enumerable: true,
    get: function() {
        return AttributeNames_1.AttributeNames;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KoaLayerType = void 0;
var KoaLayerType;
(function(KoaLayerType) {
    KoaLayerType["ROUTER"] = "router";
    KoaLayerType["MIDDLEWARE"] = "middleware";
})(KoaLayerType = exports.KoaLayerType || (exports.KoaLayerType = {})); //# sourceMappingURL=types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.62.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-koa'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttributeNames = void 0;
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
 */ var AttributeNames;
(function(AttributeNames) {
    AttributeNames["KOA_TYPE"] = "koa.type";
    AttributeNames["KOA_NAME"] = "koa.name";
})(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {})); //# sourceMappingURL=AttributeNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLayerIgnored = exports.getMiddlewareMetadata = void 0;
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
 */ const types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/types.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const getMiddlewareMetadata = (context, layer, isRouter, layerPath)=>{
    if (isRouter) {
        return {
            attributes: {
                [AttributeNames_1.AttributeNames.KOA_NAME]: layerPath?.toString(),
                [AttributeNames_1.AttributeNames.KOA_TYPE]: types_1.KoaLayerType.ROUTER,
                [semantic_conventions_1.ATTR_HTTP_ROUTE]: layerPath?.toString()
            },
            name: context._matchedRouteName || `router - ${layerPath}`
        };
    } else {
        return {
            attributes: {
                [AttributeNames_1.AttributeNames.KOA_NAME]: layer.name ?? 'middleware',
                [AttributeNames_1.AttributeNames.KOA_TYPE]: types_1.KoaLayerType.MIDDLEWARE
            },
            name: `middleware - ${layer.name}`
        };
    }
};
exports.getMiddlewareMetadata = getMiddlewareMetadata;
/**
 * Check whether the given request is ignored by configuration
 * @param [list] List of ignore patterns
 * @param [onException] callback for doing something when an exception has
 *     occurred
 */ const isLayerIgnored = (type, config)=>{
    return !!(Array.isArray(config?.ignoreLayersType) && config?.ignoreLayersType?.includes(type));
};
exports.isLayerIgnored = isLayerIgnored; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.kLayerPatched = void 0;
/**
 * This symbol is used to mark a Koa layer as being already instrumented
 * since its possible to use a given layer multiple times (ex: middlewares)
 */ exports.kLayerPatched = Symbol('koa-layer-patched'); //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KoaInstrumentation = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/types.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/version.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/utils.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/internal-types.js [app-rsc] (ecmascript)");
/** Koa instrumentation for OpenTelemetry */ class KoaInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    init() {
        return new instrumentation_1.InstrumentationNodeModuleDefinition('koa', [
            '>=2.0.0 <4'
        ], (module)=>{
            const moduleExports = module[Symbol.toStringTag] === 'Module' ? module.default // ESM
             : module; // CommonJS
            if (moduleExports == null) {
                return moduleExports;
            }
            if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.use)) {
                this._unwrap(moduleExports.prototype, 'use');
            }
            this._wrap(moduleExports.prototype, 'use', this._getKoaUsePatch.bind(this));
            return module;
        }, (module)=>{
            const moduleExports = module[Symbol.toStringTag] === 'Module' ? module.default // ESM
             : module; // CommonJS
            if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.use)) {
                this._unwrap(moduleExports.prototype, 'use');
            }
        });
    }
    /**
     * Patches the Koa.use function in order to instrument each original
     * middleware layer which is introduced
     * @param {KoaMiddleware} middleware - the original middleware function
     */ _getKoaUsePatch(original) {
        const plugin = this;
        return function use(middlewareFunction) {
            let patchedFunction;
            if (middlewareFunction.router) {
                patchedFunction = plugin._patchRouterDispatch(middlewareFunction);
            } else {
                patchedFunction = plugin._patchLayer(middlewareFunction, false);
            }
            return original.apply(this, [
                patchedFunction
            ]);
        };
    }
    /**
     * Patches the dispatch function used by @koa/router. This function
     * goes through each routed middleware and adds instrumentation via a call
     * to the @function _patchLayer function.
     * @param {KoaMiddleware} dispatchLayer - the original dispatch function which dispatches
     * routed middleware
     */ _patchRouterDispatch(dispatchLayer) {
        api.diag.debug('Patching @koa/router dispatch');
        const router = dispatchLayer.router;
        const routesStack = router?.stack ?? [];
        for (const pathLayer of routesStack){
            const path = pathLayer.path;
            // Type cast needed: router.stack comes from @types/koa@2.x but we use @types/koa@3.x
            // See internal-types.ts for full explanation
            const pathStack = pathLayer.stack;
            for(let j = 0; j < pathStack.length; j++){
                const routedMiddleware = pathStack[j];
                pathStack[j] = this._patchLayer(routedMiddleware, true, path);
            }
        }
        return dispatchLayer;
    }
    /**
     * Patches each individual @param middlewareLayer function in order to create the
     * span and propagate context. It does not create spans when there is no parent span.
     * @param {KoaMiddleware} middlewareLayer - the original middleware function.
     * @param {boolean} isRouter - tracks whether the original middleware function
     * was dispatched by the router originally
     * @param {string?} layerPath - if present, provides additional data from the
     * router about the routed path which the middleware is attached to
     */ _patchLayer(middlewareLayer, isRouter, layerPath) {
        const layerType = isRouter ? types_1.KoaLayerType.ROUTER : types_1.KoaLayerType.MIDDLEWARE;
        // Skip patching layer if its ignored in the config
        if (middlewareLayer[internal_types_1.kLayerPatched] === true || (0, utils_1.isLayerIgnored)(layerType, this.getConfig())) return middlewareLayer;
        if (middlewareLayer.constructor.name === 'GeneratorFunction' || middlewareLayer.constructor.name === 'AsyncGeneratorFunction') {
            api.diag.debug('ignoring generator-based Koa middleware layer');
            return middlewareLayer;
        }
        middlewareLayer[internal_types_1.kLayerPatched] = true;
        api.diag.debug('patching Koa middleware layer');
        return async (context, next)=>{
            const parent = api.trace.getSpan(api.context.active());
            if (parent === undefined) {
                return middlewareLayer(context, next);
            }
            const metadata = (0, utils_1.getMiddlewareMetadata)(context, middlewareLayer, isRouter, layerPath);
            const span = this.tracer.startSpan(metadata.name, {
                attributes: metadata.attributes
            });
            const rpcMetadata = (0, core_1.getRPCMetadata)(api.context.active());
            if (rpcMetadata?.type === core_1.RPCType.HTTP && context._matchedRoute) {
                rpcMetadata.route = context._matchedRoute.toString();
            }
            const { requestHook } = this.getConfig();
            if (requestHook) {
                (0, instrumentation_1.safeExecuteInTheMiddle)(()=>requestHook(span, {
                        context,
                        middlewareLayer,
                        layerType
                    }), (e)=>{
                    if (e) {
                        api.diag.error('koa instrumentation: request hook failed', e);
                    }
                }, true);
            }
            const newContext = api.trace.setSpan(api.context.active(), span);
            return api.context.with(newContext, async ()=>{
                try {
                    return await middlewareLayer(context, next);
                } catch (err) {
                    span.recordException(err);
                    throw err;
                } finally{
                    span.end();
                }
            });
        };
    }
}
exports.KoaInstrumentation = KoaInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KoaLayerType = exports.AttributeNames = exports.KoaInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "KoaInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.KoaInstrumentation;
    }
});
var AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "AttributeNames", {
    enumerable: true,
    get: function() {
        return AttributeNames_1.AttributeNames;
    }
});
var types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-koa/build/src/types.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "KoaLayerType", {
    enumerable: true,
    get: function() {
        return types_1.KoaLayerType;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectNames = exports.ConnectTypes = exports.AttributeNames = void 0;
var AttributeNames;
(function(AttributeNames) {
    AttributeNames["CONNECT_TYPE"] = "connect.type";
    AttributeNames["CONNECT_NAME"] = "connect.name";
})(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {}));
var ConnectTypes;
(function(ConnectTypes) {
    ConnectTypes["MIDDLEWARE"] = "middleware";
    ConnectTypes["REQUEST_HANDLER"] = "request_handler";
})(ConnectTypes = exports.ConnectTypes || (exports.ConnectTypes = {}));
var ConnectNames;
(function(ConnectNames) {
    ConnectNames["MIDDLEWARE"] = "middleware";
    ConnectNames["REQUEST_HANDLER"] = "request handler";
})(ConnectNames = exports.ConnectNames || (exports.ConnectNames = {})); //# sourceMappingURL=AttributeNames.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.57.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-connect'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/internal-types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._LAYERS_STORE_PROPERTY = void 0;
exports._LAYERS_STORE_PROPERTY = Symbol('opentelemetry.instrumentation-connect.request-route-stack'); //# sourceMappingURL=internal-types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateRoute = exports.replaceCurrentStackRoute = exports.addNewStackLayer = void 0;
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
 */ const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const internal_types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/internal-types.js [app-rsc] (ecmascript)");
const addNewStackLayer = (request)=>{
    if (Array.isArray(request[internal_types_1._LAYERS_STORE_PROPERTY]) === false) {
        Object.defineProperty(request, internal_types_1._LAYERS_STORE_PROPERTY, {
            enumerable: false,
            value: []
        });
    }
    request[internal_types_1._LAYERS_STORE_PROPERTY].push('/');
    const stackLength = request[internal_types_1._LAYERS_STORE_PROPERTY].length;
    return ()=>{
        if (stackLength === request[internal_types_1._LAYERS_STORE_PROPERTY].length) {
            request[internal_types_1._LAYERS_STORE_PROPERTY].pop();
        } else {
            api_1.diag.warn('Connect: Trying to pop the stack multiple time');
        }
    };
};
exports.addNewStackLayer = addNewStackLayer;
const replaceCurrentStackRoute = (request, newRoute)=>{
    if (newRoute) {
        request[internal_types_1._LAYERS_STORE_PROPERTY].splice(-1, 1, newRoute);
    }
};
exports.replaceCurrentStackRoute = replaceCurrentStackRoute;
// generate route from existing stack on request object.
// splash between stack layer will be deduped
// ["/first/", "/second", "/third/"] => /first/second/third/
const generateRoute = (request)=>{
    return request[internal_types_1._LAYERS_STORE_PROPERTY].reduce((acc, sub)=>acc.replace(/\/+$/, '') + sub);
};
exports.generateRoute = generateRoute; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectInstrumentation = exports.ANONYMOUS_NAME = void 0;
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/version.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/utils.js [app-rsc] (ecmascript)");
exports.ANONYMOUS_NAME = 'anonymous';
/** Connect instrumentation for OpenTelemetry */ class ConnectInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition('connect', [
                '>=3.0.0 <4'
            ], (moduleExports)=>{
                return this._patchConstructor(moduleExports);
            })
        ];
    }
    _patchApp(patchedApp) {
        if (!(0, instrumentation_1.isWrapped)(patchedApp.use)) {
            this._wrap(patchedApp, 'use', this._patchUse.bind(this));
        }
        if (!(0, instrumentation_1.isWrapped)(patchedApp.handle)) {
            this._wrap(patchedApp, 'handle', this._patchHandle.bind(this));
        }
    }
    _patchConstructor(original) {
        const instrumentation = this;
        return function(...args) {
            const app = original.apply(this, args);
            instrumentation._patchApp(app);
            return app;
        };
    }
    _patchNext(next, finishSpan) {
        return function nextFunction(err) {
            const result = next.apply(this, [
                err
            ]);
            finishSpan();
            return result;
        };
    }
    _startSpan(routeName, middleWare) {
        let connectType;
        let connectName;
        let connectTypeName;
        if (routeName) {
            connectType = AttributeNames_1.ConnectTypes.REQUEST_HANDLER;
            connectTypeName = AttributeNames_1.ConnectNames.REQUEST_HANDLER;
            connectName = routeName;
        } else {
            connectType = AttributeNames_1.ConnectTypes.MIDDLEWARE;
            connectTypeName = AttributeNames_1.ConnectNames.MIDDLEWARE;
            connectName = middleWare.name || exports.ANONYMOUS_NAME;
        }
        const spanName = `${connectTypeName} - ${connectName}`;
        const options = {
            attributes: {
                [semantic_conventions_1.ATTR_HTTP_ROUTE]: routeName.length > 0 ? routeName : '/',
                [AttributeNames_1.AttributeNames.CONNECT_TYPE]: connectType,
                [AttributeNames_1.AttributeNames.CONNECT_NAME]: connectName
            }
        };
        return this.tracer.startSpan(spanName, options);
    }
    _patchMiddleware(routeName, middleWare) {
        const instrumentation = this;
        const isErrorMiddleware = middleWare.length === 4;
        function patchedMiddleware() {
            if (!instrumentation.isEnabled()) {
                return middleWare.apply(this, arguments);
            }
            const [reqArgIdx, resArgIdx, nextArgIdx] = isErrorMiddleware ? [
                1,
                2,
                3
            ] : [
                0,
                1,
                2
            ];
            const req = arguments[reqArgIdx];
            const res = arguments[resArgIdx];
            const next = arguments[nextArgIdx];
            (0, utils_1.replaceCurrentStackRoute)(req, routeName);
            const rpcMetadata = (0, core_1.getRPCMetadata)(api_1.context.active());
            if (routeName && rpcMetadata?.type === core_1.RPCType.HTTP) {
                rpcMetadata.route = (0, utils_1.generateRoute)(req);
            }
            let spanName = '';
            if (routeName) {
                spanName = `request handler - ${routeName}`;
            } else {
                spanName = `middleware - ${middleWare.name || exports.ANONYMOUS_NAME}`;
            }
            const span = instrumentation._startSpan(routeName, middleWare);
            instrumentation._diag.debug('start span', spanName);
            let spanFinished = false;
            function finishSpan() {
                if (!spanFinished) {
                    spanFinished = true;
                    instrumentation._diag.debug(`finishing span ${span.name}`);
                    span.end();
                } else {
                    instrumentation._diag.debug(`span ${span.name} - already finished`);
                }
                res.removeListener('close', finishSpan);
            }
            res.addListener('close', finishSpan);
            arguments[nextArgIdx] = instrumentation._patchNext(next, finishSpan);
            return middleWare.apply(this, arguments);
        }
        Object.defineProperty(patchedMiddleware, 'length', {
            value: middleWare.length,
            writable: false,
            configurable: true
        });
        return patchedMiddleware;
    }
    _patchUse(original) {
        const instrumentation = this;
        return function(...args) {
            const middleWare = args[args.length - 1];
            const routeName = args[args.length - 2] || '';
            args[args.length - 1] = instrumentation._patchMiddleware(routeName, middleWare);
            return original.apply(this, args);
        };
    }
    _patchHandle(original) {
        const instrumentation = this;
        return function() {
            const [reqIdx, outIdx] = [
                0,
                2
            ];
            const req = arguments[reqIdx];
            const out = arguments[outIdx];
            const completeStack = (0, utils_1.addNewStackLayer)(req);
            if (typeof out === 'function') {
                arguments[outIdx] = instrumentation._patchOut(out, completeStack);
            }
            return original.apply(this, arguments);
        };
    }
    _patchOut(out, completeStack) {
        return function nextFunction(...args) {
            completeStack();
            return Reflect.apply(out, this, args);
        };
    }
}
exports.ConnectInstrumentation = ConnectInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectTypes = exports.ConnectNames = exports.AttributeNames = exports.ANONYMOUS_NAME = exports.ConnectInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "ConnectInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.ConnectInstrumentation;
    }
});
Object.defineProperty(exports, "ANONYMOUS_NAME", {
    enumerable: true,
    get: function() {
        return instrumentation_1.ANONYMOUS_NAME;
    }
});
var AttributeNames_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-connect/build/src/enums/AttributeNames.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "AttributeNames", {
    enumerable: true,
    get: function() {
        return AttributeNames_1.AttributeNames;
    }
});
Object.defineProperty(exports, "ConnectNames", {
    enumerable: true,
    get: function() {
        return AttributeNames_1.ConnectNames;
    }
});
Object.defineProperty(exports, "ConnectTypes", {
    enumerable: true,
    get: function() {
        return AttributeNames_1.ConnectTypes;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.58.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-knex'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SUPPORTED_VERSIONS = exports.MODULE_NAME = void 0;
exports.MODULE_NAME = 'knex';
exports.SUPPORTED_VERSIONS = [
    // use "lib/execution" for runner.js, "lib" for client.js as basepath, latest tested 0.95.6
    '>=0.22.0 <4',
    // use "lib" as basepath
    '>=0.10.0 <0.18.0',
    '>=0.19.0 <0.22.0',
    // use "src" as basepath
    '>=0.18.0 <0.19.0'
]; //# sourceMappingURL=constants.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DB_SYSTEM_NAME_VALUE_SQLITE = exports.ATTR_NET_TRANSPORT = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_USER = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_SQL_TABLE = exports.ATTR_DB_OPERATION = exports.ATTR_DB_NAME = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * Deprecated, use `db.operation.name` instead.
 *
 * @example findAndModify
 * @example HMSET
 * @example SELECT
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.operation.name`.
 */ exports.ATTR_DB_OPERATION = 'db.operation';
/**
 * Deprecated, use `db.collection.name` instead.
 *
 * @example "mytable"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.collection.name`, but only if not extracting the value from `db.query.text`.
 */ exports.ATTR_DB_SQL_TABLE = 'db.sql.table';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, no replacement at this time.
 *
 * @example readonly_user
 * @example reporting_user
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Removed, no replacement at this time.
 */ exports.ATTR_DB_USER = 'db.user';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Deprecated, use `network.transport`.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `network.transport`.
 */ exports.ATTR_NET_TRANSPORT = 'net.transport';
/**
 * Enum value "sqlite" for attribute {@link ATTR_DB_SYSTEM_NAME}.
 *
 * [SQLite](https://www.sqlite.org/)
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_NAME_VALUE_SQLITE = 'sqlite'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractTableName = exports.extractPortFromConnectionString = exports.extractHostFromConnectionString = exports.extractDatabaseFromConnectionString = exports.limitLength = exports.getName = exports.mapSystem = exports.otelExceptionFromKnexError = exports.getFormatter = void 0;
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/semconv.js [app-rsc] (ecmascript)");
const getFormatter = (runner)=>{
    if (runner) {
        if (runner.client) {
            if (runner.client._formatQuery) {
                return runner.client._formatQuery.bind(runner.client);
            } else if (runner.client.SqlString) {
                return runner.client.SqlString.format.bind(runner.client.SqlString);
            }
        }
        if (runner.builder) {
            return runner.builder.toString.bind(runner.builder);
        }
    }
    return ()=>'<noop formatter>';
};
exports.getFormatter = getFormatter;
function otelExceptionFromKnexError(err, message) {
    if (!(err && err instanceof Error)) {
        return err;
    }
    return {
        message,
        code: err.code,
        stack: err.stack,
        name: err.name
    };
}
exports.otelExceptionFromKnexError = otelExceptionFromKnexError;
const systemMap = new Map([
    [
        'sqlite3',
        semconv_1.DB_SYSTEM_NAME_VALUE_SQLITE
    ],
    [
        'pg',
        semantic_conventions_1.DB_SYSTEM_NAME_VALUE_POSTGRESQL
    ]
]);
const mapSystem = (knexSystem)=>{
    return systemMap.get(knexSystem) || knexSystem;
};
exports.mapSystem = mapSystem;
const getName = (db, operation, table)=>{
    if (operation) {
        if (table) {
            return `${operation} ${db}.${table}`;
        }
        return `${operation} ${db}`;
    }
    return db;
};
exports.getName = getName;
const limitLength = (str, maxLength)=>{
    if (typeof str === 'string' && typeof maxLength === 'number' && 0 < maxLength && maxLength < str.length) {
        return str.substring(0, maxLength) + '..';
    }
    return str;
};
exports.limitLength = limitLength;
/**
 * Helpers to extract connection details from a Knex connectionString.
 * When Knex is configured via `connection.connectionString` instead of
 * explicit fields like `host`, `port`, and `database`, these values are
 * embedded in the URL and must be parsed out.
 * e.g. "postgres://user:pass@localhost:5432/mydb"
 */ const extractDatabaseFromConnectionString = (connectionString)=>{
    if (!connectionString) return undefined;
    try {
        const db = new URL(connectionString).pathname?.replace(/^\//, '');
        return db || undefined;
    } catch  {
        return undefined;
    }
};
exports.extractDatabaseFromConnectionString = extractDatabaseFromConnectionString;
const extractHostFromConnectionString = (connectionString)=>{
    if (!connectionString) return undefined;
    try {
        return new URL(connectionString).hostname || undefined;
    } catch  {
        return undefined;
    }
};
exports.extractHostFromConnectionString = extractHostFromConnectionString;
const extractPortFromConnectionString = (connectionString)=>{
    if (!connectionString) return undefined;
    try {
        const port = new URL(connectionString).port;
        return port ? parseInt(port, 10) : undefined;
    } catch  {
        return undefined;
    }
};
exports.extractPortFromConnectionString = extractPortFromConnectionString;
const extractTableName = (builder)=>{
    const table = builder?._single?.table;
    if (typeof table === 'object') {
        return (0, exports.extractTableName)(table);
    }
    return table;
};
exports.extractTableName = extractTableName; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KnexInstrumentation = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/version.js [app-rsc] (ecmascript)");
const constants = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/constants.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/utils.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/semconv.js [app-rsc] (ecmascript)");
const contextSymbol = Symbol('opentelemetry.instrumentation-knex.context');
const DEFAULT_CONFIG = {
    maxQueryLength: 1022,
    requireParentSpan: false
};
class KnexInstrumentation extends instrumentation_1.InstrumentationBase {
    _semconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, {
            ...DEFAULT_CONFIG,
            ...config
        });
        this._semconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    setConfig(config = {}) {
        super.setConfig({
            ...DEFAULT_CONFIG,
            ...config
        });
    }
    init() {
        const module = new instrumentation_1.InstrumentationNodeModuleDefinition(constants.MODULE_NAME, constants.SUPPORTED_VERSIONS);
        module.files.push(this.getClientNodeModuleFileInstrumentation('src'), this.getClientNodeModuleFileInstrumentation('lib'), this.getRunnerNodeModuleFileInstrumentation('src'), this.getRunnerNodeModuleFileInstrumentation('lib'), this.getRunnerNodeModuleFileInstrumentation('lib/execution'));
        return module;
    }
    getRunnerNodeModuleFileInstrumentation(basePath) {
        return new instrumentation_1.InstrumentationNodeModuleFile(`knex/${basePath}/runner.js`, constants.SUPPORTED_VERSIONS, (Runner, moduleVersion)=>{
            this.ensureWrapped(Runner.prototype, 'query', this.createQueryWrapper(moduleVersion));
            return Runner;
        }, (Runner, moduleVersion)=>{
            this._unwrap(Runner.prototype, 'query');
            return Runner;
        });
    }
    getClientNodeModuleFileInstrumentation(basePath) {
        return new instrumentation_1.InstrumentationNodeModuleFile(`knex/${basePath}/client.js`, constants.SUPPORTED_VERSIONS, (Client)=>{
            this.ensureWrapped(Client.prototype, 'queryBuilder', this.storeContext.bind(this));
            this.ensureWrapped(Client.prototype, 'schemaBuilder', this.storeContext.bind(this));
            this.ensureWrapped(Client.prototype, 'raw', this.storeContext.bind(this));
            return Client;
        }, (Client)=>{
            this._unwrap(Client.prototype, 'queryBuilder');
            this._unwrap(Client.prototype, 'schemaBuilder');
            this._unwrap(Client.prototype, 'raw');
            return Client;
        });
    }
    createQueryWrapper(moduleVersion) {
        const instrumentation = this;
        return function wrapQuery(original) {
            return function wrapped_logging_method(query) {
                const config = this.client.config;
                const table = utils.extractTableName(this.builder);
                // `method` actually refers to the knex API method - Not exactly "operation"
                // in the spec sense, but matches most of the time.
                const operation = query?.method;
                // Knex can be configured with a connectionString instead of explicit fields.
                // Fall back to parsing the connectionString if filename and database are not set.
                const connectionString = config?.connection?.connectionString;
                const name = config?.connection?.filename || config?.connection?.database || utils.extractDatabaseFromConnectionString(connectionString);
                const { maxQueryLength } = instrumentation.getConfig();
                const attributes = {
                    'knex.version': moduleVersion
                };
                const transport = config?.connection?.filename === ':memory:' ? 'inproc' : undefined;
                if (instrumentation._semconvStability & instrumentation_1.SemconvStability.OLD) {
                    Object.assign(attributes, {
                        [semconv_1.ATTR_DB_SYSTEM]: utils.mapSystem(this.client.driverName),
                        [semconv_1.ATTR_DB_SQL_TABLE]: table,
                        [semconv_1.ATTR_DB_OPERATION]: operation,
                        [semconv_1.ATTR_DB_USER]: config?.connection?.user,
                        [semconv_1.ATTR_DB_NAME]: name,
                        // Fall back to parsing host and port from connectionString if not explicitly set.
                        [semconv_1.ATTR_NET_PEER_NAME]: config?.connection?.host ?? utils.extractHostFromConnectionString(connectionString),
                        [semconv_1.ATTR_NET_PEER_PORT]: config?.connection?.port ?? utils.extractPortFromConnectionString(connectionString),
                        [semconv_1.ATTR_NET_TRANSPORT]: transport
                    });
                }
                if (instrumentation._semconvStability & instrumentation_1.SemconvStability.STABLE) {
                    Object.assign(attributes, {
                        [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: utils.mapSystem(this.client.driverName),
                        [semantic_conventions_1.ATTR_DB_COLLECTION_NAME]: table,
                        [semantic_conventions_1.ATTR_DB_OPERATION_NAME]: operation,
                        [semantic_conventions_1.ATTR_DB_NAMESPACE]: name,
                        // Fall back to parsing host and port from connectionString if not explicitly set.
                        [semantic_conventions_1.ATTR_SERVER_ADDRESS]: config?.connection?.host ?? utils.extractHostFromConnectionString(connectionString),
                        [semantic_conventions_1.ATTR_SERVER_PORT]: config?.connection?.port ?? utils.extractPortFromConnectionString(connectionString)
                    });
                }
                if (maxQueryLength) {
                    // filters both undefined and 0
                    const queryText = utils.limitLength(query?.sql, maxQueryLength);
                    if (instrumentation._semconvStability & instrumentation_1.SemconvStability.STABLE) {
                        attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = queryText;
                    }
                    if (instrumentation._semconvStability & instrumentation_1.SemconvStability.OLD) {
                        attributes[semconv_1.ATTR_DB_STATEMENT] = queryText;
                    }
                }
                const parentContext = this.builder[contextSymbol] || api.context.active();
                const parentSpan = api.trace.getSpan(parentContext);
                const hasActiveParent = parentSpan && api.trace.isSpanContextValid(parentSpan.spanContext());
                if (instrumentation._config.requireParentSpan && !hasActiveParent) {
                    return original.bind(this)(...arguments);
                }
                const span = instrumentation.tracer.startSpan(utils.getName(name, operation, table), {
                    kind: api.SpanKind.CLIENT,
                    attributes
                }, parentContext);
                const spanContext = api.trace.setSpan(api.context.active(), span);
                return api.context.with(spanContext, original, this, ...arguments).then((result)=>{
                    span.end();
                    return result;
                }).catch((err)=>{
                    // knex adds full query with all the binding values to the message,
                    // we want to undo that without changing the original error
                    const formatter = utils.getFormatter(this);
                    const fullQuery = formatter(query.sql, query.bindings || []);
                    const message = err.message.replace(fullQuery + ' - ', '');
                    const exc = utils.otelExceptionFromKnexError(err, message);
                    span.recordException(exc);
                    span.setStatus({
                        code: api.SpanStatusCode.ERROR,
                        message
                    });
                    span.end();
                    throw err;
                });
            };
        };
    }
    storeContext(original) {
        return function wrapped_logging_method() {
            const builder = original.apply(this, arguments);
            // Builder is a custom promise type and when awaited it fails to propagate context.
            // We store the parent context at the moment of initiating the builder
            // otherwise we'd have nothing to attach the span as a child for in `query`.
            Object.defineProperty(builder, contextSymbol, {
                value: api.context.active()
            });
            return builder;
        };
    }
    ensureWrapped(obj, methodName, wrapper) {
        if ((0, instrumentation_1.isWrapped)(obj[methodName])) {
            this._unwrap(obj, methodName);
        }
        this._wrap(obj, methodName, wrapper);
    }
}
exports.KnexInstrumentation = KnexInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KnexInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-knex/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "KnexInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.KnexInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DB_SYSTEM_VALUE_MSSQL = exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_DB_USER = exports.ATTR_DB_SYSTEM = exports.ATTR_DB_STATEMENT = exports.ATTR_DB_SQL_TABLE = exports.ATTR_DB_NAME = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `db.namespace` instead.
 *
 * @example customers
 * @example main
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.namespace`.
 */ exports.ATTR_DB_NAME = 'db.name';
/**
 * Deprecated, use `db.collection.name` instead.
 *
 * @example "mytable"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.collection.name`, but only if not extracting the value from `db.query.text`.
 */ exports.ATTR_DB_SQL_TABLE = 'db.sql.table';
/**
 * The database statement being executed.
 *
 * @example SELECT * FROM wuser_table
 * @example SET mykey "WuValue"
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.query.text`.
 */ exports.ATTR_DB_STATEMENT = 'db.statement';
/**
 * Deprecated, use `db.system.name` instead.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `db.system.name`.
 */ exports.ATTR_DB_SYSTEM = 'db.system';
/**
 * Deprecated, no replacement at this time.
 *
 * @example readonly_user
 * @example reporting_user
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Removed, no replacement at this time.
 */ exports.ATTR_DB_USER = 'db.user';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port';
/**
 * Enum value "mssql" for attribute {@link ATTR_DB_SYSTEM}.
 *
 * Microsoft SQL Server
 *
 * @experimental This enum value is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.DB_SYSTEM_VALUE_MSSQL = 'mssql'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.once = exports.getSpanName = void 0;
/**
 * The span name SHOULD be set to a low cardinality value
 * representing the statement executed on the database.
 *
 * @returns Operation executed on Tedious Connection. Does not map to SQL statement in any way.
 */ function getSpanName(operation, db, sql, bulkLoadTable) {
    if (operation === 'execBulkLoad' && bulkLoadTable && db) {
        return `${operation} ${bulkLoadTable} ${db}`;
    }
    if (operation === 'callProcedure') {
        // `sql` refers to procedure name with `callProcedure`
        if (db) {
            return `${operation} ${sql} ${db}`;
        }
        return `${operation} ${sql}`;
    }
    // do not use `sql` in general case because of high-cardinality
    if (db) {
        return `${operation} ${db}`;
    }
    return `${operation}`;
}
exports.getSpanName = getSpanName;
const once = (fn)=>{
    let called = false;
    return (...args)=>{
        if (called) return;
        called = true;
        return fn(...args);
    };
};
exports.once = once; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.33.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-tedious'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TediousInstrumentation = exports.INJECTED_CTX = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/semconv.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/utils.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/version.js [app-rsc] (ecmascript)");
const CURRENT_DATABASE = Symbol('opentelemetry.instrumentation-tedious.current-database');
exports.INJECTED_CTX = Symbol('opentelemetry.instrumentation-tedious.context-info-injected');
const PATCHED_METHODS = [
    'callProcedure',
    'execSql',
    'execSqlBatch',
    'execBulkLoad',
    'prepare',
    'execute'
];
function setDatabase(databaseName) {
    Object.defineProperty(this, CURRENT_DATABASE, {
        value: databaseName,
        writable: true
    });
}
class TediousInstrumentation extends instrumentation_1.InstrumentationBase {
    static COMPONENT = 'tedious';
    _netSemconvStability;
    _dbSemconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
        this._setSemconvStabilityFromEnv();
    }
    // Used for testing.
    _setSemconvStabilityFromEnv() {
        this._netSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
        this._dbSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('database', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition(TediousInstrumentation.COMPONENT, [
                '>=1.11.0 <20'
            ], (moduleExports)=>{
                const ConnectionPrototype = moduleExports.Connection.prototype;
                for (const method of PATCHED_METHODS){
                    if ((0, instrumentation_1.isWrapped)(ConnectionPrototype[method])) {
                        this._unwrap(ConnectionPrototype, method);
                    }
                    this._wrap(ConnectionPrototype, method, this._patchQuery(method, moduleExports));
                }
                if ((0, instrumentation_1.isWrapped)(ConnectionPrototype.connect)) {
                    this._unwrap(ConnectionPrototype, 'connect');
                }
                this._wrap(ConnectionPrototype, 'connect', this._patchConnect);
                return moduleExports;
            }, (moduleExports)=>{
                if (moduleExports === undefined) return;
                const ConnectionPrototype = moduleExports.Connection.prototype;
                for (const method of PATCHED_METHODS){
                    this._unwrap(ConnectionPrototype, method);
                }
                this._unwrap(ConnectionPrototype, 'connect');
            })
        ];
    }
    _patchConnect(original) {
        return function patchedConnect() {
            setDatabase.call(this, this.config?.options?.database);
            // remove the listener first in case it's already added
            this.removeListener('databaseChange', setDatabase);
            this.on('databaseChange', setDatabase);
            this.once('end', ()=>{
                this.removeListener('databaseChange', setDatabase);
            });
            return original.apply(this, arguments);
        };
    }
    _buildTraceparent(span) {
        const sc = span.spanContext();
        return `00-${sc.traceId}-${sc.spanId}-0${Number(sc.traceFlags || api.TraceFlags.NONE).toString(16)}`;
    }
    /**
     * Fire a one-off `SET CONTEXT_INFO @opentelemetry_traceparent` on the same
     * connection. Marks the request with INJECTED_CTX so our patch skips it.
     */ _injectContextInfo(connection, tediousModule, traceparent) {
        return new Promise((resolve)=>{
            try {
                const sql = 'set context_info @opentelemetry_traceparent';
                const req = new tediousModule.Request(sql, (_err)=>{
                    resolve();
                });
                Object.defineProperty(req, exports.INJECTED_CTX, {
                    value: true
                });
                const buf = Buffer.from(traceparent, 'utf8');
                req.addParameter('opentelemetry_traceparent', tediousModule.TYPES.VarBinary, buf, {
                    length: buf.length
                });
                connection.execSql(req);
            } catch  {
                resolve();
            }
        });
    }
    _shouldInjectFor(operation) {
        return operation === 'execSql' || operation === 'execSqlBatch' || operation === 'callProcedure' || operation === 'execute';
    }
    _patchQuery(operation, tediousModule) {
        return (originalMethod)=>{
            const thisPlugin = this;
            function patchedMethod(request) {
                // Skip our own injected request
                if (request?.[exports.INJECTED_CTX]) {
                    return originalMethod.apply(this, arguments);
                }
                if (!(request instanceof events_1.EventEmitter)) {
                    thisPlugin._diag.warn(`Unexpected invocation of patched ${operation} method. Span not recorded`);
                    return originalMethod.apply(this, arguments);
                }
                let procCount = 0;
                let statementCount = 0;
                const incrementStatementCount = ()=>statementCount++;
                const incrementProcCount = ()=>procCount++;
                const databaseName = this[CURRENT_DATABASE];
                const sql = ((request)=>{
                    // Required for <11.0.9
                    if (request.sqlTextOrProcedure === 'sp_prepare' && request.parametersByName?.stmt?.value) {
                        return request.parametersByName.stmt.value;
                    }
                    return request.sqlTextOrProcedure;
                })(request);
                const attributes = {};
                if (thisPlugin._dbSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_DB_SYSTEM] = semconv_1.DB_SYSTEM_VALUE_MSSQL;
                    attributes[semconv_1.ATTR_DB_NAME] = databaseName;
                    // >=4 uses `authentication` object; older versions just userName and password pair
                    attributes[semconv_1.ATTR_DB_USER] = this.config?.userName ?? this.config?.authentication?.options?.userName;
                    attributes[semconv_1.ATTR_DB_STATEMENT] = sql;
                    attributes[semconv_1.ATTR_DB_SQL_TABLE] = request.table;
                }
                if (thisPlugin._dbSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    // The OTel spec for "db.namespace" discusses handling for connection
                    // to MSSQL "named instances". This isn't currently supported.
                    //    https://opentelemetry.io/docs/specs/semconv/database/sql-server/#:~:text=%5B1%5D%20db%2Enamespace
                    attributes[semantic_conventions_1.ATTR_DB_NAMESPACE] = databaseName;
                    attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semantic_conventions_1.DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER;
                    attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = sql;
                    attributes[semantic_conventions_1.ATTR_DB_COLLECTION_NAME] = request.table;
                // See https://opentelemetry.io/docs/specs/semconv/database/sql-server/#spans
                // TODO(3290): can `db.response.status_code` be added?
                // TODO(3290): is `operation` correct for `db.operation.name`
                // TODO(3290): can `db.query.summary` reliably be calculated?
                // TODO(3290): `db.stored_procedure.name`
                }
                if (thisPlugin._netSemconvStability & instrumentation_1.SemconvStability.OLD) {
                    attributes[semconv_1.ATTR_NET_PEER_NAME] = this.config?.server;
                    attributes[semconv_1.ATTR_NET_PEER_PORT] = this.config?.options?.port;
                }
                if (thisPlugin._netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                    attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = this.config?.server;
                    attributes[semantic_conventions_1.ATTR_SERVER_PORT] = this.config?.options?.port;
                }
                const span = thisPlugin.tracer.startSpan((0, utils_1.getSpanName)(operation, databaseName, sql, request.table), {
                    kind: api.SpanKind.CLIENT,
                    attributes
                });
                const endSpan = (0, utils_1.once)((err)=>{
                    request.removeListener('done', incrementStatementCount);
                    request.removeListener('doneInProc', incrementStatementCount);
                    request.removeListener('doneProc', incrementProcCount);
                    request.removeListener('error', endSpan);
                    this.removeListener('end', endSpan);
                    span.setAttribute('tedious.procedure_count', procCount);
                    span.setAttribute('tedious.statement_count', statementCount);
                    if (err) {
                        span.setStatus({
                            code: api.SpanStatusCode.ERROR,
                            message: err.message
                        });
                    // TODO(3290): set `error.type` attribute?
                    }
                    span.end();
                });
                request.on('done', incrementStatementCount);
                request.on('doneInProc', incrementStatementCount);
                request.on('doneProc', incrementProcCount);
                request.once('error', endSpan);
                this.on('end', endSpan);
                if (typeof request.callback === 'function') {
                    thisPlugin._wrap(request, 'callback', thisPlugin._patchCallbackQuery(endSpan));
                } else {
                    thisPlugin._diag.error('Expected request.callback to be a function');
                }
                const runUserRequest = ()=>{
                    return api.context.with(api.trace.setSpan(api.context.active(), span), originalMethod, this, ...arguments);
                };
                const cfg = thisPlugin.getConfig();
                const shouldInject = cfg.enableTraceContextPropagation && thisPlugin._shouldInjectFor(operation);
                if (!shouldInject) return runUserRequest();
                const traceparent = thisPlugin._buildTraceparent(span);
                void thisPlugin._injectContextInfo(this, tediousModule, traceparent).finally(runUserRequest);
            }
            Object.defineProperty(patchedMethod, 'length', {
                value: originalMethod.length,
                writable: false
            });
            return patchedMethod;
        };
    }
    _patchCallbackQuery(endSpan) {
        return (originalCallback)=>{
            return function(err, rowCount, rows) {
                endSpan(err);
                return originalCallback.apply(this, arguments);
            };
        };
    }
}
exports.TediousInstrumentation = TediousInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TediousInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-tedious/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "TediousInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.TediousInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-generic-pool/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.57.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-generic-pool'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-generic-pool/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenericPoolInstrumentation = void 0;
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-generic-pool/build/src/version.js [app-rsc] (ecmascript)");
const MODULE_NAME = 'generic-pool';
class GenericPoolInstrumentation extends instrumentation_1.InstrumentationBase {
    // only used for v2 - v2.3)
    _isDisabled = false;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition(MODULE_NAME, [
                '>=3.0.0 <4'
            ], (moduleExports)=>{
                const Pool = moduleExports.Pool;
                if ((0, instrumentation_1.isWrapped)(Pool.prototype.acquire)) {
                    this._unwrap(Pool.prototype, 'acquire');
                }
                this._wrap(Pool.prototype, 'acquire', this._acquirePatcher.bind(this));
                return moduleExports;
            }, (moduleExports)=>{
                const Pool = moduleExports.Pool;
                this._unwrap(Pool.prototype, 'acquire');
                return moduleExports;
            }),
            new instrumentation_1.InstrumentationNodeModuleDefinition(MODULE_NAME, [
                '>=2.4.0 <3'
            ], (moduleExports)=>{
                const Pool = moduleExports.Pool;
                if ((0, instrumentation_1.isWrapped)(Pool.prototype.acquire)) {
                    this._unwrap(Pool.prototype, 'acquire');
                }
                this._wrap(Pool.prototype, 'acquire', this._acquireWithCallbacksPatcher.bind(this));
                return moduleExports;
            }, (moduleExports)=>{
                const Pool = moduleExports.Pool;
                this._unwrap(Pool.prototype, 'acquire');
                return moduleExports;
            }),
            new instrumentation_1.InstrumentationNodeModuleDefinition(MODULE_NAME, [
                '>=2.0.0 <2.4'
            ], (moduleExports)=>{
                this._isDisabled = false;
                if ((0, instrumentation_1.isWrapped)(moduleExports.Pool)) {
                    this._unwrap(moduleExports, 'Pool');
                }
                this._wrap(moduleExports, 'Pool', this._poolWrapper.bind(this));
                return moduleExports;
            }, (moduleExports)=>{
                // since the object is created on the fly every time, we need to use
                // a boolean switch here to disable the instrumentation
                this._isDisabled = true;
                return moduleExports;
            })
        ];
    }
    _acquirePatcher(original) {
        const instrumentation = this;
        return function wrapped_acquire(...args) {
            const parent = api.context.active();
            const span = instrumentation.tracer.startSpan('generic-pool.acquire', {}, parent);
            return api.context.with(api.trace.setSpan(parent, span), ()=>{
                return original.call(this, ...args).then((value)=>{
                    span.end();
                    return value;
                }, (err)=>{
                    span.recordException(err);
                    span.end();
                    throw err;
                });
            });
        };
    }
    _poolWrapper(original) {
        const instrumentation = this;
        return function wrapped_pool() {
            const pool = original.apply(this, arguments);
            instrumentation._wrap(pool, 'acquire', instrumentation._acquireWithCallbacksPatcher.bind(instrumentation));
            return pool;
        };
    }
    _acquireWithCallbacksPatcher(original) {
        const instrumentation = this;
        return function wrapped_acquire(cb, priority) {
            // only used for v2 - v2.3
            if (instrumentation._isDisabled) {
                return original.call(this, cb, priority);
            }
            const parent = api.context.active();
            const span = instrumentation.tracer.startSpan('generic-pool.acquire', {}, parent);
            return api.context.with(api.trace.setSpan(parent, span), ()=>{
                original.call(this, (err, client)=>{
                    span.end();
                    // Not checking whether cb is a function because
                    // the original code doesn't do that either.
                    if (cb) {
                        return cb(err, client);
                    }
                }, priority);
            });
        };
    }
}
exports.GenericPoolInstrumentation = GenericPoolInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-generic-pool/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenericPoolInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-generic-pool/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "GenericPoolInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.GenericPoolInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-dataloader/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.31.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-dataloader'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-dataloader/build/src/instrumentation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

;
globalThis["__SENTRY_SERVER_MODULES__"] = {
    "@react-pdf/renderer": "^4.5.1",
    "@sentry/nextjs": "^10.52.0",
    "@supabase/ssr": "^0.10.2",
    "@supabase/supabase-js": "^2.105.1",
    "framer-motion": "^12.38.0",
    "google-auth-library": "^10.6.2",
    "lucide-react": "^1.11.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^22.1.0",
    "zustand": "^5.0.12",
    "@eslint/eslintrc": "^3",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "jsdom": "^29.1.1",
    "postcss": "^8.5.12",
    "tailwindcss": "^3.4.19",
    "typescript": "^5",
    "vitest": "^4.1.5"
};
globalThis["_sentryNextJsVersion"] = "15.5.15";
globalThis["_sentryRewritesTunnelPath"] = "/monitoring";
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataloaderInstrumentation = void 0;
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-dataloader/build/src/version.js [app-rsc] (ecmascript)");
const MODULE_NAME = 'dataloader';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractModuleExports(module) {
    return module[Symbol.toStringTag] === 'Module' ? module.default // ESM
     : module; // CommonJS
}
class DataloaderInstrumentation extends instrumentation_1.InstrumentationBase {
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
    }
    init() {
        return [
            new instrumentation_1.InstrumentationNodeModuleDefinition(MODULE_NAME, [
                '>=2.0.0 <3'
            ], (module)=>{
                const dataloader = extractModuleExports(module);
                this._patchLoad(dataloader.prototype);
                this._patchLoadMany(dataloader.prototype);
                this._patchPrime(dataloader.prototype);
                this._patchClear(dataloader.prototype);
                this._patchClearAll(dataloader.prototype);
                return this._getPatchedConstructor(dataloader);
            }, (module)=>{
                const dataloader = extractModuleExports(module);
                [
                    'load',
                    'loadMany',
                    'prime',
                    'clear',
                    'clearAll'
                ].forEach((method)=>{
                    if ((0, instrumentation_1.isWrapped)(dataloader.prototype[method])) {
                        this._unwrap(dataloader.prototype, method);
                    }
                });
            })
        ];
    }
    shouldCreateSpans() {
        const config = this.getConfig();
        const hasParentSpan = api_1.trace.getSpan(api_1.context.active()) !== undefined;
        return hasParentSpan || !config.requireParentSpan;
    }
    getSpanName(dataloader, operation) {
        const dataloaderName = dataloader.name;
        if (dataloaderName === undefined || dataloaderName === null) {
            return `${MODULE_NAME}.${operation}`;
        }
        return `${MODULE_NAME}.${operation} ${dataloaderName}`;
    }
    _wrapBatchLoadFn(batchLoadFn) {
        const instrumentation = this;
        return function patchedBatchLoadFn(...args) {
            if (!instrumentation.isEnabled() || !instrumentation.shouldCreateSpans()) {
                return batchLoadFn.call(this, ...args);
            }
            const parent = api_1.context.active();
            const span = instrumentation.tracer.startSpan(instrumentation.getSpanName(this, 'batch'), {
                links: this._batch?.spanLinks
            }, parent);
            return api_1.context.with(api_1.trace.setSpan(parent, span), ()=>{
                return batchLoadFn.apply(this, args).then((value)=>{
                    span.end();
                    return value;
                }).catch((err)=>{
                    span.recordException(err);
                    span.setStatus({
                        code: api_1.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    span.end();
                    throw err;
                });
            });
        };
    }
    _getPatchedConstructor(constructor) {
        const instrumentation = this;
        const prototype = constructor.prototype;
        if (!instrumentation.isEnabled()) {
            return constructor;
        }
        function PatchedDataloader(...args) {
            // BatchLoadFn is the first constructor argument
            // https://github.com/graphql/dataloader/blob/77c2cd7ca97e8795242018ebc212ce2487e729d2/src/index.js#L47
            if (typeof args[0] === 'function') {
                if ((0, instrumentation_1.isWrapped)(args[0])) {
                    instrumentation._unwrap(args, 0);
                }
                args[0] = instrumentation._wrapBatchLoadFn(args[0]);
            }
            return constructor.apply(this, args);
        }
        PatchedDataloader.prototype = prototype;
        return PatchedDataloader;
    }
    _patchLoad(proto) {
        if ((0, instrumentation_1.isWrapped)(proto.load)) {
            this._unwrap(proto, 'load');
        }
        this._wrap(proto, 'load', this._getPatchedLoad.bind(this));
    }
    _getPatchedLoad(original) {
        const instrumentation = this;
        return function patchedLoad(...args) {
            if (!instrumentation.shouldCreateSpans()) {
                return original.call(this, ...args);
            }
            const parent = api_1.context.active();
            const span = instrumentation.tracer.startSpan(instrumentation.getSpanName(this, 'load'), {
                kind: api_1.SpanKind.CLIENT
            }, parent);
            return api_1.context.with(api_1.trace.setSpan(parent, span), ()=>{
                const result = original.call(this, ...args).then((value)=>{
                    span.end();
                    return value;
                }).catch((err)=>{
                    span.recordException(err);
                    span.setStatus({
                        code: api_1.SpanStatusCode.ERROR,
                        message: err.message
                    });
                    span.end();
                    throw err;
                });
                const loader = this;
                if (loader._batch) {
                    if (!loader._batch.spanLinks) {
                        loader._batch.spanLinks = [];
                    }
                    loader._batch.spanLinks.push({
                        context: span.spanContext()
                    });
                }
                return result;
            });
        };
    }
    _patchLoadMany(proto) {
        if ((0, instrumentation_1.isWrapped)(proto.loadMany)) {
            this._unwrap(proto, 'loadMany');
        }
        this._wrap(proto, 'loadMany', this._getPatchedLoadMany.bind(this));
    }
    _getPatchedLoadMany(original) {
        const instrumentation = this;
        return function patchedLoadMany(...args) {
            if (!instrumentation.shouldCreateSpans()) {
                return original.call(this, ...args);
            }
            const parent = api_1.context.active();
            const span = instrumentation.tracer.startSpan(instrumentation.getSpanName(this, 'loadMany'), {
                kind: api_1.SpanKind.CLIENT
            }, parent);
            return api_1.context.with(api_1.trace.setSpan(parent, span), ()=>{
                // .loadMany never rejects, as errors from internal .load
                // calls are caught by dataloader lib
                return original.call(this, ...args).then((value)=>{
                    span.end();
                    return value;
                });
            });
        };
    }
    _patchPrime(proto) {
        if ((0, instrumentation_1.isWrapped)(proto.prime)) {
            this._unwrap(proto, 'prime');
        }
        this._wrap(proto, 'prime', this._getPatchedPrime.bind(this));
    }
    _getPatchedPrime(original) {
        const instrumentation = this;
        return function patchedPrime(...args) {
            if (!instrumentation.shouldCreateSpans()) {
                return original.call(this, ...args);
            }
            const parent = api_1.context.active();
            const span = instrumentation.tracer.startSpan(instrumentation.getSpanName(this, 'prime'), {
                kind: api_1.SpanKind.CLIENT
            }, parent);
            const ret = api_1.context.with(api_1.trace.setSpan(parent, span), ()=>{
                return original.call(this, ...args);
            });
            span.end();
            return ret;
        };
    }
    _patchClear(proto) {
        if ((0, instrumentation_1.isWrapped)(proto.clear)) {
            this._unwrap(proto, 'clear');
        }
        this._wrap(proto, 'clear', this._getPatchedClear.bind(this));
    }
    _getPatchedClear(original) {
        const instrumentation = this;
        return function patchedClear(...args) {
            if (!instrumentation.shouldCreateSpans()) {
                return original.call(this, ...args);
            }
            const parent = api_1.context.active();
            const span = instrumentation.tracer.startSpan(instrumentation.getSpanName(this, 'clear'), {
                kind: api_1.SpanKind.CLIENT
            }, parent);
            const ret = api_1.context.with(api_1.trace.setSpan(parent, span), ()=>{
                return original.call(this, ...args);
            });
            span.end();
            return ret;
        };
    }
    _patchClearAll(proto) {
        if ((0, instrumentation_1.isWrapped)(proto.clearAll)) {
            this._unwrap(proto, 'clearAll');
        }
        this._wrap(proto, 'clearAll', this._getPatchedClearAll.bind(this));
    }
    _getPatchedClearAll(original) {
        const instrumentation = this;
        return function patchedClearAll(...args) {
            if (!instrumentation.shouldCreateSpans()) {
                return original.call(this, ...args);
            }
            const parent = api_1.context.active();
            const span = instrumentation.tracer.startSpan(instrumentation.getSpanName(this, 'clearAll'), {
                kind: api_1.SpanKind.CLIENT
            }, parent);
            const ret = api_1.context.with(api_1.trace.setSpan(parent, span), ()=>{
                return original.call(this, ...args);
            });
            span.end();
            return ret;
        };
    }
}
exports.DataloaderInstrumentation = DataloaderInstrumentation; //# sourceMappingURL=instrumentation.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-dataloader/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataloaderInstrumentation = void 0;
var instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-dataloader/build/src/instrumentation.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "DataloaderInstrumentation", {
    enumerable: true,
    get: function() {
        return instrumentation_1.DataloaderInstrumentation;
    }
}); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/semconv.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ATTR_NET_PEER_PORT = exports.ATTR_NET_PEER_NAME = exports.ATTR_MESSAGING_SYSTEM = exports.ATTR_MESSAGING_OPERATION = void 0;
/*
 * This file contains a copy of unstable semantic convention definitions
 * used by this package.
 * @see https://github.com/open-telemetry/opentelemetry-js/tree/main/semantic-conventions#unstable-semconv
 */ /**
 * Deprecated, use `messaging.operation.type` instead.
 *
 * @example publish
 * @example create
 * @example process
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `messaging.operation.type`.
 */ exports.ATTR_MESSAGING_OPERATION = 'messaging.operation';
/**
 * The messaging system as identified by the client instrumentation.
 *
 * @note The actual messaging system may differ from the one known by the client. For example, when using Kafka client libraries to communicate with Azure Event Hubs, the `messaging.system` is set to `kafka` based on the instrumentation's best knowledge.
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 */ exports.ATTR_MESSAGING_SYSTEM = 'messaging.system';
/**
 * Deprecated, use `server.address` on client spans and `client.address` on server spans.
 *
 * @example example.com
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.address` on client spans and `client.address` on server spans.
 */ exports.ATTR_NET_PEER_NAME = 'net.peer.name';
/**
 * Deprecated, use `server.port` on client spans and `client.port` on server spans.
 *
 * @example 8080
 *
 * @experimental This attribute is experimental and is subject to breaking changes in minor releases of `@opentelemetry/semantic-conventions`.
 *
 * @deprecated Replaced by `server.port` on client spans and `client.port` on server spans.
 */ exports.ATTR_NET_PEER_PORT = 'net.peer.port'; //# sourceMappingURL=semconv.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/semconv-obsolete.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ATTR_MESSAGING_CONVERSATION_ID = exports.OLD_ATTR_MESSAGING_MESSAGE_ID = exports.MESSAGING_DESTINATION_KIND_VALUE_TOPIC = exports.ATTR_MESSAGING_URL = exports.ATTR_MESSAGING_PROTOCOL_VERSION = exports.ATTR_MESSAGING_PROTOCOL = exports.MESSAGING_OPERATION_VALUE_PROCESS = exports.ATTR_MESSAGING_RABBITMQ_ROUTING_KEY = exports.ATTR_MESSAGING_DESTINATION_KIND = exports.ATTR_MESSAGING_DESTINATION = void 0;
/*
 * This file contains constants for values that where replaced/removed from
 * Semantic Conventions long enough ago that they do not have `ATTR_*`
 * constants in the `@opentelemetry/semantic-conventions` package. Eventually
 * it is expected that this instrumention will be updated to emit telemetry
 * using modern Semantic Conventions, dropping the need for the constants in
 * this file.
 */ /**
 * The message destination name. This might be equal to the span name but is required nevertheless.
 *
 * @deprecated Use ATTR_MESSAGING_DESTINATION_NAME in [incubating entry-point]({@link https://github.com/open-telemetry/opentelemetry-js/blob/main/semantic-conventions/README.md#unstable-semconv}).
 */ exports.ATTR_MESSAGING_DESTINATION = 'messaging.destination';
/**
 * The kind of message destination.
 *
 * @deprecated Removed in semconv v1.20.0.
 */ exports.ATTR_MESSAGING_DESTINATION_KIND = 'messaging.destination_kind';
/**
 * RabbitMQ message routing key.
 *
 * @deprecated Use ATTR_MESSAGING_RABBITMQ_DESTINATION_ROUTING_KEY in [incubating entry-point]({@link https://github.com/open-telemetry/opentelemetry-js/blob/main/semantic-conventions/README.md#unstable-semconv}).
 */ exports.ATTR_MESSAGING_RABBITMQ_ROUTING_KEY = 'messaging.rabbitmq.routing_key';
/**
 * A string identifying the kind of message consumption as defined in the [Operation names](#operation-names) section above. If the operation is &#34;send&#34;, this attribute MUST NOT be set, since the operation can be inferred from the span kind in that case.
 *
 * @deprecated Use MESSAGING_OPERATION_TYPE_VALUE_PROCESS in [incubating entry-point]({@link https://github.com/open-telemetry/opentelemetry-js/blob/main/semantic-conventions/README.md#unstable-semconv}).
 */ exports.MESSAGING_OPERATION_VALUE_PROCESS = 'process';
/**
 * The name of the transport protocol.
 *
 * @deprecated Use ATTR_NETWORK_PROTOCOL_NAME.
 */ exports.ATTR_MESSAGING_PROTOCOL = 'messaging.protocol';
/**
 * The version of the transport protocol.
 *
 * @deprecated Use ATTR_NETWORK_PROTOCOL_VERSION.
 */ exports.ATTR_MESSAGING_PROTOCOL_VERSION = 'messaging.protocol_version';
/**
 * Connection string.
 *
 * @deprecated Removed in semconv v1.17.0.
 */ exports.ATTR_MESSAGING_URL = 'messaging.url';
/**
 * The kind of message destination.
 *
 * @deprecated Removed in semconv v1.20.0.
 */ exports.MESSAGING_DESTINATION_KIND_VALUE_TOPIC = 'topic';
/**
 * A value used by the messaging system as an identifier for the message, represented as a string.
 *
 * @deprecated Use ATTR_MESSAGING_MESSAGE_ID in [incubating entry-point]({@link https://github.com/open-telemetry/opentelemetry-js/blob/main/semantic-conventions/README.md#unstable-semconv}).
 *
 * Note: changing to `ATTR_MESSAGING_MESSAGE_ID` means a change in value from `messaging.message_id` to `messaging.message.id`.
 */ exports.OLD_ATTR_MESSAGING_MESSAGE_ID = 'messaging.message_id';
/**
 * The [conversation ID](#conversations) identifying the conversation to which the message belongs, represented as a string. Sometimes called &#34;Correlation ID&#34;.
 *
 * @deprecated Use ATTR_MESSAGING_MESSAGE_CONVERSATION_ID in [incubating entry-point]({@link https://github.com/open-telemetry/opentelemetry-js/blob/main/semantic-conventions/README.md#unstable-semconv}).
 */ exports.ATTR_MESSAGING_CONVERSATION_ID = 'messaging.conversation_id'; //# sourceMappingURL=semconv-obsolete.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/types.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_CONFIG = exports.EndOperation = void 0;
var EndOperation;
(function(EndOperation) {
    EndOperation["AutoAck"] = "auto ack";
    EndOperation["Ack"] = "ack";
    EndOperation["AckAll"] = "ackAll";
    EndOperation["Reject"] = "reject";
    EndOperation["Nack"] = "nack";
    EndOperation["NackAll"] = "nackAll";
    EndOperation["ChannelClosed"] = "channel closed";
    EndOperation["ChannelError"] = "channel error";
    EndOperation["InstrumentationTimeout"] = "instrumentation timeout";
})(EndOperation = exports.EndOperation || (exports.EndOperation = {}));
exports.DEFAULT_CONFIG = {
    consumeTimeoutMs: 1000 * 60,
    useLinksForConsume: false
}; //# sourceMappingURL=types.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isConfirmChannelTracing = exports.unmarkConfirmChannelTracing = exports.markConfirmChannelTracing = exports.getConnectionAttributesFromUrl = exports.getConnectionAttributesFromServer = exports.normalizeExchange = exports.CONNECTION_ATTRIBUTES = exports.CHANNEL_CONSUME_TIMEOUT_TIMER = exports.CHANNEL_SPANS_NOT_ENDED = exports.MESSAGE_STORED_SPAN = void 0;
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
 */ const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semantic_conventions_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/semconv.js [app-rsc] (ecmascript)");
const semconv_obsolete_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/semconv-obsolete.js [app-rsc] (ecmascript)");
exports.MESSAGE_STORED_SPAN = Symbol('opentelemetry.amqplib.message.stored-span');
exports.CHANNEL_SPANS_NOT_ENDED = Symbol('opentelemetry.amqplib.channel.spans-not-ended');
exports.CHANNEL_CONSUME_TIMEOUT_TIMER = Symbol('opentelemetry.amqplib.channel.consumer-timeout-timer');
exports.CONNECTION_ATTRIBUTES = Symbol('opentelemetry.amqplib.connection.attributes');
const IS_CONFIRM_CHANNEL_CONTEXT_KEY = (0, api_1.createContextKey)('opentelemetry.amqplib.channel.is-confirm-channel');
const normalizeExchange = (exchangeName)=>exchangeName !== '' ? exchangeName : '<default>';
exports.normalizeExchange = normalizeExchange;
const censorPassword = (url)=>{
    return url.replace(/:[^:@/]*@/, ':***@');
};
const getPort = (portFromUrl, resolvedProtocol)=>{
    // we are using the resolved protocol which is upper case
    // this code mimic the behavior of the amqplib which is used to set connection params
    return portFromUrl || (resolvedProtocol === 'AMQP' ? 5672 : 5671);
};
const getProtocol = (protocolFromUrl)=>{
    const resolvedProtocol = protocolFromUrl || 'amqp';
    // the substring removed the ':' part of the protocol ('amqp:' -> 'amqp')
    const noEndingColon = resolvedProtocol.endsWith(':') ? resolvedProtocol.substring(0, resolvedProtocol.length - 1) : resolvedProtocol;
    // upper cases to match spec
    return noEndingColon.toUpperCase();
};
const getHostname = (hostnameFromUrl)=>{
    // if user supplies empty hostname, it gets forwarded to 'net' package which default it to localhost.
    // https://nodejs.org/docs/latest-v12.x/api/net.html#net_socket_connect_options_connectlistener
    return hostnameFromUrl || 'localhost';
};
const extractConnectionAttributeOrLog = (url, attributeKey, attributeValue, nameForLog)=>{
    if (attributeValue) {
        return {
            [attributeKey]: attributeValue
        };
    } else {
        api_1.diag.error(`amqplib instrumentation: could not extract connection attribute ${nameForLog} from user supplied url`, {
            url
        });
        return {};
    }
};
const getConnectionAttributesFromServer = (conn)=>{
    const product = conn.serverProperties.product?.toLowerCase?.();
    if (product) {
        return {
            [semconv_1.ATTR_MESSAGING_SYSTEM]: product
        };
    } else {
        return {};
    }
};
exports.getConnectionAttributesFromServer = getConnectionAttributesFromServer;
const getConnectionAttributesFromUrl = (url, netSemconvStability)=>{
    const attributes = {
        [semconv_obsolete_1.ATTR_MESSAGING_PROTOCOL_VERSION]: '0.9.1'
    };
    url = url || 'amqp://localhost';
    if (typeof url === 'object') {
        const connectOptions = url;
        const protocol = getProtocol(connectOptions?.protocol);
        Object.assign(attributes, {
            ...extractConnectionAttributeOrLog(url, semconv_obsolete_1.ATTR_MESSAGING_PROTOCOL, protocol, 'protocol')
        });
        const hostname = getHostname(connectOptions?.hostname);
        if (netSemconvStability & instrumentation_1.SemconvStability.OLD) {
            Object.assign(attributes, {
                ...extractConnectionAttributeOrLog(url, semconv_1.ATTR_NET_PEER_NAME, hostname, 'hostname')
            });
        }
        if (netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
            Object.assign(attributes, {
                ...extractConnectionAttributeOrLog(url, semantic_conventions_1.ATTR_SERVER_ADDRESS, hostname, 'hostname')
            });
        }
        const port = getPort(connectOptions.port, protocol);
        if (netSemconvStability & instrumentation_1.SemconvStability.OLD) {
            Object.assign(attributes, extractConnectionAttributeOrLog(url, semconv_1.ATTR_NET_PEER_PORT, port, 'port'));
        }
        if (netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
            Object.assign(attributes, extractConnectionAttributeOrLog(url, semantic_conventions_1.ATTR_SERVER_PORT, port, 'port'));
        }
    } else {
        const censoredUrl = censorPassword(url);
        attributes[semconv_obsolete_1.ATTR_MESSAGING_URL] = censoredUrl;
        try {
            const urlParts = new URL(censoredUrl);
            const protocol = getProtocol(urlParts.protocol);
            Object.assign(attributes, {
                ...extractConnectionAttributeOrLog(censoredUrl, semconv_obsolete_1.ATTR_MESSAGING_PROTOCOL, protocol, 'protocol')
            });
            const hostname = getHostname(urlParts.hostname);
            if (netSemconvStability & instrumentation_1.SemconvStability.OLD) {
                Object.assign(attributes, {
                    ...extractConnectionAttributeOrLog(censoredUrl, semconv_1.ATTR_NET_PEER_NAME, hostname, 'hostname')
                });
            }
            if (netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                Object.assign(attributes, {
                    ...extractConnectionAttributeOrLog(censoredUrl, semantic_conventions_1.ATTR_SERVER_ADDRESS, hostname, 'hostname')
                });
            }
            const port = getPort(urlParts.port ? parseInt(urlParts.port) : undefined, protocol);
            if (netSemconvStability & instrumentation_1.SemconvStability.OLD) {
                Object.assign(attributes, extractConnectionAttributeOrLog(censoredUrl, semconv_1.ATTR_NET_PEER_PORT, port, 'port'));
            }
            if (netSemconvStability & instrumentation_1.SemconvStability.STABLE) {
                Object.assign(attributes, extractConnectionAttributeOrLog(censoredUrl, semantic_conventions_1.ATTR_SERVER_PORT, port, 'port'));
            }
        } catch (err) {
            api_1.diag.error('amqplib instrumentation: error while extracting connection details from connection url', {
                censoredUrl,
                err
            });
        }
    }
    return attributes;
};
exports.getConnectionAttributesFromUrl = getConnectionAttributesFromUrl;
const markConfirmChannelTracing = (context)=>{
    return context.setValue(IS_CONFIRM_CHANNEL_CONTEXT_KEY, true);
};
exports.markConfirmChannelTracing = markConfirmChannelTracing;
const unmarkConfirmChannelTracing = (context)=>{
    return context.deleteValue(IS_CONFIRM_CHANNEL_CONTEXT_KEY);
};
exports.unmarkConfirmChannelTracing = unmarkConfirmChannelTracing;
const isConfirmChannelTracing = (context)=>{
    return context.getValue(IS_CONFIRM_CHANNEL_CONTEXT_KEY) === true;
};
exports.isConfirmChannelTracing = isConfirmChannelTracing; //# sourceMappingURL=utils.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/version.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
// this is autogenerated file, see scripts/version-update.js
exports.PACKAGE_VERSION = '0.61.0';
exports.PACKAGE_NAME = '@opentelemetry/instrumentation-amqplib'; //# sourceMappingURL=version.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/amqplib.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AmqplibInstrumentation = void 0;
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
 */ const api_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const instrumentation_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
const semconv_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/semconv.js [app-rsc] (ecmascript)");
const semconv_obsolete_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/semconv-obsolete.js [app-rsc] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/types.js [app-rsc] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/utils.js [app-rsc] (ecmascript)");
/** @knipignore */ const version_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/version.js [app-rsc] (ecmascript)");
const supportedVersions = [
    '>=0.5.5 <1'
];
class AmqplibInstrumentation extends instrumentation_1.InstrumentationBase {
    _netSemconvStability;
    constructor(config = {}){
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, {
            ...types_1.DEFAULT_CONFIG,
            ...config
        });
        this._setSemconvStabilityFromEnv();
    }
    // Used for testing.
    _setSemconvStabilityFromEnv() {
        this._netSemconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', process.env.OTEL_SEMCONV_STABILITY_OPT_IN);
    }
    setConfig(config = {}) {
        super.setConfig({
            ...types_1.DEFAULT_CONFIG,
            ...config
        });
    }
    init() {
        const channelModelModuleFile = new instrumentation_1.InstrumentationNodeModuleFile('amqplib/lib/channel_model.js', supportedVersions, this.patchChannelModel.bind(this), this.unpatchChannelModel.bind(this));
        const callbackModelModuleFile = new instrumentation_1.InstrumentationNodeModuleFile('amqplib/lib/callback_model.js', supportedVersions, this.patchChannelModel.bind(this), this.unpatchChannelModel.bind(this));
        const connectModuleFile = new instrumentation_1.InstrumentationNodeModuleFile('amqplib/lib/connect.js', supportedVersions, this.patchConnect.bind(this), this.unpatchConnect.bind(this));
        const module = new instrumentation_1.InstrumentationNodeModuleDefinition('amqplib', supportedVersions, undefined, undefined, [
            channelModelModuleFile,
            connectModuleFile,
            callbackModelModuleFile
        ]);
        return module;
    }
    patchConnect(moduleExports) {
        moduleExports = this.unpatchConnect(moduleExports);
        if (!(0, instrumentation_1.isWrapped)(moduleExports.connect)) {
            this._wrap(moduleExports, 'connect', this.getConnectPatch.bind(this));
        }
        return moduleExports;
    }
    unpatchConnect(moduleExports) {
        if ((0, instrumentation_1.isWrapped)(moduleExports.connect)) {
            this._unwrap(moduleExports, 'connect');
        }
        return moduleExports;
    }
    patchChannelModel(moduleExports, moduleVersion) {
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.publish)) {
            this._wrap(moduleExports.Channel.prototype, 'publish', this.getPublishPatch.bind(this, moduleVersion));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.consume)) {
            this._wrap(moduleExports.Channel.prototype, 'consume', this.getConsumePatch.bind(this, moduleVersion));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.ack)) {
            this._wrap(moduleExports.Channel.prototype, 'ack', this.getAckPatch.bind(this, false, types_1.EndOperation.Ack));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.nack)) {
            this._wrap(moduleExports.Channel.prototype, 'nack', this.getAckPatch.bind(this, true, types_1.EndOperation.Nack));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.reject)) {
            this._wrap(moduleExports.Channel.prototype, 'reject', this.getAckPatch.bind(this, true, types_1.EndOperation.Reject));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.ackAll)) {
            this._wrap(moduleExports.Channel.prototype, 'ackAll', this.getAckAllPatch.bind(this, false, types_1.EndOperation.AckAll));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.nackAll)) {
            this._wrap(moduleExports.Channel.prototype, 'nackAll', this.getAckAllPatch.bind(this, true, types_1.EndOperation.NackAll));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.emit)) {
            this._wrap(moduleExports.Channel.prototype, 'emit', this.getChannelEmitPatch.bind(this));
        }
        if (!(0, instrumentation_1.isWrapped)(moduleExports.ConfirmChannel.prototype.publish)) {
            this._wrap(moduleExports.ConfirmChannel.prototype, 'publish', this.getConfirmedPublishPatch.bind(this, moduleVersion));
        }
        return moduleExports;
    }
    unpatchChannelModel(moduleExports) {
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.publish)) {
            this._unwrap(moduleExports.Channel.prototype, 'publish');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.consume)) {
            this._unwrap(moduleExports.Channel.prototype, 'consume');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.ack)) {
            this._unwrap(moduleExports.Channel.prototype, 'ack');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.nack)) {
            this._unwrap(moduleExports.Channel.prototype, 'nack');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.reject)) {
            this._unwrap(moduleExports.Channel.prototype, 'reject');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.ackAll)) {
            this._unwrap(moduleExports.Channel.prototype, 'ackAll');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.nackAll)) {
            this._unwrap(moduleExports.Channel.prototype, 'nackAll');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.Channel.prototype.emit)) {
            this._unwrap(moduleExports.Channel.prototype, 'emit');
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.ConfirmChannel.prototype.publish)) {
            this._unwrap(moduleExports.ConfirmChannel.prototype, 'publish');
        }
        return moduleExports;
    }
    getConnectPatch(original) {
        const self = this;
        return function patchedConnect(url, socketOptions, openCallback) {
            return original.call(this, url, socketOptions, function(err, conn) {
                if (err == null) {
                    const urlAttributes = (0, utils_1.getConnectionAttributesFromUrl)(url, self._netSemconvStability);
                    const serverAttributes = (0, utils_1.getConnectionAttributesFromServer)(conn);
                    conn[utils_1.CONNECTION_ATTRIBUTES] = {
                        ...urlAttributes,
                        ...serverAttributes
                    };
                }
                openCallback.apply(this, arguments);
            });
        };
    }
    getChannelEmitPatch(original) {
        const self = this;
        return function emit(eventName) {
            if (eventName === 'close') {
                self.endAllSpansOnChannel(this, true, types_1.EndOperation.ChannelClosed, undefined);
                const activeTimer = this[utils_1.CHANNEL_CONSUME_TIMEOUT_TIMER];
                if (activeTimer) {
                    clearInterval(activeTimer);
                }
                this[utils_1.CHANNEL_CONSUME_TIMEOUT_TIMER] = undefined;
            } else if (eventName === 'error') {
                self.endAllSpansOnChannel(this, true, types_1.EndOperation.ChannelError, undefined);
            }
            return original.apply(this, arguments);
        };
    }
    getAckAllPatch(isRejected, endOperation, original) {
        const self = this;
        return function ackAll(requeueOrEmpty) {
            self.endAllSpansOnChannel(this, isRejected, endOperation, requeueOrEmpty);
            return original.apply(this, arguments);
        };
    }
    getAckPatch(isRejected, endOperation, original) {
        const self = this;
        return function ack(message, allUpToOrRequeue, requeue) {
            const channel = this;
            // we use this patch in reject function as well, but it has different signature
            const requeueResolved = endOperation === types_1.EndOperation.Reject ? allUpToOrRequeue : requeue;
            const spansNotEnded = channel[utils_1.CHANNEL_SPANS_NOT_ENDED] ?? [];
            const msgIndex = spansNotEnded.findIndex((msgDetails)=>msgDetails.msg === message);
            if (msgIndex < 0) {
                // should not happen in happy flow
                // but possible if user is calling the api function ack twice with same message
                self.endConsumerSpan(message, isRejected, endOperation, requeueResolved);
            } else if (endOperation !== types_1.EndOperation.Reject && allUpToOrRequeue) {
                for(let i = 0; i <= msgIndex; i++){
                    self.endConsumerSpan(spansNotEnded[i].msg, isRejected, endOperation, requeueResolved);
                }
                spansNotEnded.splice(0, msgIndex + 1);
            } else {
                self.endConsumerSpan(message, isRejected, endOperation, requeueResolved);
                spansNotEnded.splice(msgIndex, 1);
            }
            return original.apply(this, arguments);
        };
    }
    getConsumePatch(moduleVersion, original) {
        const self = this;
        return function consume(queue, onMessage, options) {
            const channel = this;
            if (!Object.prototype.hasOwnProperty.call(channel, utils_1.CHANNEL_SPANS_NOT_ENDED)) {
                const { consumeTimeoutMs } = self.getConfig();
                if (consumeTimeoutMs) {
                    const timer = setInterval(()=>{
                        self.checkConsumeTimeoutOnChannel(channel);
                    }, consumeTimeoutMs);
                    timer.unref();
                    channel[utils_1.CHANNEL_CONSUME_TIMEOUT_TIMER] = timer;
                }
                channel[utils_1.CHANNEL_SPANS_NOT_ENDED] = [];
            }
            const patchedOnMessage = function(msg) {
                // msg is expected to be null for signaling consumer cancel notification
                // https://www.rabbitmq.com/consumer-cancel.html
                // in this case, we do not start a span, as this is not a real message.
                if (!msg) {
                    return onMessage.call(this, msg);
                }
                const headers = msg.properties.headers ?? {};
                let parentContext = api_1.propagation.extract(api_1.ROOT_CONTEXT, headers);
                const exchange = msg.fields?.exchange;
                let links;
                if (self._config.useLinksForConsume) {
                    const parentSpanContext = parentContext ? api_1.trace.getSpan(parentContext)?.spanContext() : undefined;
                    parentContext = undefined;
                    if (parentSpanContext) {
                        links = [
                            {
                                context: parentSpanContext
                            }
                        ];
                    }
                }
                const span = self.tracer.startSpan(`${queue} process`, {
                    kind: api_1.SpanKind.CONSUMER,
                    attributes: {
                        ...channel?.connection?.[utils_1.CONNECTION_ATTRIBUTES],
                        [semconv_obsolete_1.ATTR_MESSAGING_DESTINATION]: exchange,
                        [semconv_obsolete_1.ATTR_MESSAGING_DESTINATION_KIND]: semconv_obsolete_1.MESSAGING_DESTINATION_KIND_VALUE_TOPIC,
                        [semconv_obsolete_1.ATTR_MESSAGING_RABBITMQ_ROUTING_KEY]: msg.fields?.routingKey,
                        [semconv_1.ATTR_MESSAGING_OPERATION]: semconv_obsolete_1.MESSAGING_OPERATION_VALUE_PROCESS,
                        [semconv_obsolete_1.OLD_ATTR_MESSAGING_MESSAGE_ID]: msg?.properties.messageId,
                        [semconv_obsolete_1.ATTR_MESSAGING_CONVERSATION_ID]: msg?.properties.correlationId
                    },
                    links
                }, parentContext);
                const { consumeHook } = self.getConfig();
                if (consumeHook) {
                    (0, instrumentation_1.safeExecuteInTheMiddle)(()=>consumeHook(span, {
                            moduleVersion,
                            msg
                        }), (e)=>{
                        if (e) {
                            api_1.diag.error('amqplib instrumentation: consumerHook error', e);
                        }
                    }, true);
                }
                if (!options?.noAck) {
                    // store the message on the channel so we can close the span on ackAll etc
                    channel[utils_1.CHANNEL_SPANS_NOT_ENDED].push({
                        msg,
                        timeOfConsume: (0, core_1.hrTime)()
                    });
                    // store the span on the message, so we can end it when user call 'ack' on it
                    msg[utils_1.MESSAGE_STORED_SPAN] = span;
                }
                const setContext = parentContext ? parentContext : api_1.ROOT_CONTEXT;
                api_1.context.with(api_1.trace.setSpan(setContext, span), ()=>{
                    onMessage.call(this, msg);
                });
                if (options?.noAck) {
                    self.callConsumeEndHook(span, msg, false, types_1.EndOperation.AutoAck);
                    span.end();
                }
            };
            arguments[1] = patchedOnMessage;
            return original.apply(this, arguments);
        };
    }
    getConfirmedPublishPatch(moduleVersion, original) {
        const self = this;
        return function confirmedPublish(exchange, routingKey, content, options, callback) {
            const channel = this;
            const { span, modifiedOptions } = self.createPublishSpan(self, exchange, routingKey, channel, options);
            const { publishHook } = self.getConfig();
            if (publishHook) {
                (0, instrumentation_1.safeExecuteInTheMiddle)(()=>publishHook(span, {
                        moduleVersion,
                        exchange,
                        routingKey,
                        content,
                        options: modifiedOptions,
                        isConfirmChannel: true
                    }), (e)=>{
                    if (e) {
                        api_1.diag.error('amqplib instrumentation: publishHook error', e);
                    }
                }, true);
            }
            const patchedOnConfirm = function(err, ok) {
                try {
                    callback?.call(this, err, ok);
                } finally{
                    const { publishConfirmHook } = self.getConfig();
                    if (publishConfirmHook) {
                        (0, instrumentation_1.safeExecuteInTheMiddle)(()=>publishConfirmHook(span, {
                                moduleVersion,
                                exchange,
                                routingKey,
                                content,
                                options,
                                isConfirmChannel: true,
                                confirmError: err
                            }), (e)=>{
                            if (e) {
                                api_1.diag.error('amqplib instrumentation: publishConfirmHook error', e);
                            }
                        }, true);
                    }
                    if (err) {
                        span.setStatus({
                            code: api_1.SpanStatusCode.ERROR,
                            message: "message confirmation has been nack'ed"
                        });
                    }
                    span.end();
                }
            };
            // calling confirm channel publish function is storing the message in queue and registering the callback for broker confirm.
            // span ends in the patched callback.
            const markedContext = (0, utils_1.markConfirmChannelTracing)(api_1.context.active());
            const argumentsCopy = [
                ...arguments
            ];
            argumentsCopy[3] = modifiedOptions;
            argumentsCopy[4] = api_1.context.bind((0, utils_1.unmarkConfirmChannelTracing)(api_1.trace.setSpan(markedContext, span)), patchedOnConfirm);
            return api_1.context.with(markedContext, original.bind(this, ...argumentsCopy));
        };
    }
    getPublishPatch(moduleVersion, original) {
        const self = this;
        return function publish(exchange, routingKey, content, options) {
            if ((0, utils_1.isConfirmChannelTracing)(api_1.context.active())) {
                // work already done
                return original.apply(this, arguments);
            } else {
                const channel = this;
                const { span, modifiedOptions } = self.createPublishSpan(self, exchange, routingKey, channel, options);
                const { publishHook } = self.getConfig();
                if (publishHook) {
                    (0, instrumentation_1.safeExecuteInTheMiddle)(()=>publishHook(span, {
                            moduleVersion,
                            exchange,
                            routingKey,
                            content,
                            options: modifiedOptions,
                            isConfirmChannel: false
                        }), (e)=>{
                        if (e) {
                            api_1.diag.error('amqplib instrumentation: publishHook error', e);
                        }
                    }, true);
                }
                // calling normal channel publish function is only storing the message in queue.
                // it does not send it and waits for an ack, so the span duration is expected to be very short.
                const argumentsCopy = [
                    ...arguments
                ];
                argumentsCopy[3] = modifiedOptions;
                const originalRes = original.apply(this, argumentsCopy);
                span.end();
                return originalRes;
            }
        };
    }
    createPublishSpan(self, exchange, routingKey, channel, options) {
        const normalizedExchange = (0, utils_1.normalizeExchange)(exchange);
        const span = self.tracer.startSpan(`publish ${normalizedExchange}`, {
            kind: api_1.SpanKind.PRODUCER,
            attributes: {
                ...channel.connection[utils_1.CONNECTION_ATTRIBUTES],
                [semconv_obsolete_1.ATTR_MESSAGING_DESTINATION]: exchange,
                [semconv_obsolete_1.ATTR_MESSAGING_DESTINATION_KIND]: semconv_obsolete_1.MESSAGING_DESTINATION_KIND_VALUE_TOPIC,
                [semconv_obsolete_1.ATTR_MESSAGING_RABBITMQ_ROUTING_KEY]: routingKey,
                [semconv_obsolete_1.OLD_ATTR_MESSAGING_MESSAGE_ID]: options?.messageId,
                [semconv_obsolete_1.ATTR_MESSAGING_CONVERSATION_ID]: options?.correlationId
            }
        });
        const modifiedOptions = options ?? {};
        modifiedOptions.headers = modifiedOptions.headers ?? {};
        api_1.propagation.inject(api_1.trace.setSpan(api_1.context.active(), span), modifiedOptions.headers);
        return {
            span,
            modifiedOptions
        };
    }
    endConsumerSpan(message, isRejected, operation, requeue) {
        const storedSpan = message[utils_1.MESSAGE_STORED_SPAN];
        if (!storedSpan) return;
        if (isRejected !== false) {
            storedSpan.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message: operation !== types_1.EndOperation.ChannelClosed && operation !== types_1.EndOperation.ChannelError ? `${operation} called on message${requeue === true ? ' with requeue' : requeue === false ? ' without requeue' : ''}` : operation
            });
        }
        this.callConsumeEndHook(storedSpan, message, isRejected, operation);
        storedSpan.end();
        message[utils_1.MESSAGE_STORED_SPAN] = undefined;
    }
    endAllSpansOnChannel(channel, isRejected, operation, requeue) {
        const spansNotEnded = channel[utils_1.CHANNEL_SPANS_NOT_ENDED] ?? [];
        spansNotEnded.forEach((msgDetails)=>{
            this.endConsumerSpan(msgDetails.msg, isRejected, operation, requeue);
        });
        channel[utils_1.CHANNEL_SPANS_NOT_ENDED] = [];
    }
    callConsumeEndHook(span, msg, rejected, endOperation) {
        const { consumeEndHook } = this.getConfig();
        if (!consumeEndHook) return;
        (0, instrumentation_1.safeExecuteInTheMiddle)(()=>consumeEndHook(span, {
                msg,
                rejected,
                endOperation
            }), (e)=>{
            if (e) {
                api_1.diag.error('amqplib instrumentation: consumerEndHook error', e);
            }
        }, true);
    }
    checkConsumeTimeoutOnChannel(channel) {
        const currentTime = (0, core_1.hrTime)();
        const spansNotEnded = channel[utils_1.CHANNEL_SPANS_NOT_ENDED] ?? [];
        let i;
        const { consumeTimeoutMs } = this.getConfig();
        for(i = 0; i < spansNotEnded.length; i++){
            const currMessage = spansNotEnded[i];
            const timeFromConsume = (0, core_1.hrTimeDuration)(currMessage.timeOfConsume, currentTime);
            if ((0, core_1.hrTimeToMilliseconds)(timeFromConsume) < consumeTimeoutMs) {
                break;
            }
            this.endConsumerSpan(currMessage.msg, null, types_1.EndOperation.InstrumentationTimeout, true);
        }
        spansNotEnded.splice(0, i);
    }
}
exports.AmqplibInstrumentation = AmqplibInstrumentation; //# sourceMappingURL=amqplib.js.map
}),
"[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EndOperation = exports.DEFAULT_CONFIG = exports.AmqplibInstrumentation = void 0;
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
 */ var amqplib_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/amqplib.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "AmqplibInstrumentation", {
    enumerable: true,
    get: function() {
        return amqplib_1.AmqplibInstrumentation;
    }
});
var types_1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/instrumentation-amqplib/build/src/types.js [app-rsc] (ecmascript)");
Object.defineProperty(exports, "DEFAULT_CONFIG", {
    enumerable: true,
    get: function() {
        return types_1.DEFAULT_CONFIG;
    }
});
Object.defineProperty(exports, "EndOperation", {
    enumerable: true,
    get: function() {
        return types_1.EndOperation;
    }
}); //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=f7fbe_%40opentelemetry_97beda81._.js.map