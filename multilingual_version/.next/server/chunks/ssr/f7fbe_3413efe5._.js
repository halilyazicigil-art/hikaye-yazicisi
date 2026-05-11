module.exports = [
"[project]/multilingual_version/node_modules/tslib/tslib.es6.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ __turbopack_context__.s([
    "__addDisposableResource",
    ()=>__addDisposableResource,
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldIn",
    ()=>__classPrivateFieldIn,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__disposeResources",
    ()=>__disposeResources,
    "__esDecorate",
    ()=>__esDecorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__propKey",
    ()=>__propKey,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__rewriteRelativeImportExtension",
    ()=>__rewriteRelativeImportExtension,
    "__runInitializers",
    ()=>__runInitializers,
    "__setFunctionName",
    ()=>__setFunctionName,
    "__spread",
    ()=>__spread,
    "__spreadArray",
    ()=>__spreadArray,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
;
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++){
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
;
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
;
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
;
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __createBinding = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function __exportStar(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
var __setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var ownKeys = function(o) {
    ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return ownKeys(o);
};
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) {
        env.stack.push({
            async: true
        });
    }
    return value;
}
var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop()){
            try {
                if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                if (r.dispose) {
                    var result = r.dispose.call(r.value);
                    if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                        fail(e);
                        return next();
                    });
                } else s |= 1;
            } catch (e) {
                fail(e);
            }
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
        });
    }
    return path;
}
const __TURBOPACK__default__export__ = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
};
}),
"[project]/multilingual_version/node_modules/iceberg-js/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/errors/IcebergError.ts
__turbopack_context__.s([
    "IcebergError",
    ()=>IcebergError,
    "IcebergRestCatalog",
    ()=>IcebergRestCatalog,
    "getCurrentSchema",
    ()=>getCurrentSchema,
    "isDecimalType",
    ()=>isDecimalType,
    "isFixedType",
    ()=>isFixedType,
    "parseDecimalType",
    ()=>parseDecimalType,
    "parseFixedType",
    ()=>parseFixedType,
    "typesEqual",
    ()=>typesEqual
]);
var IcebergError = class extends Error {
    constructor(message, opts){
        super(message);
        this.name = "IcebergError";
        this.status = opts.status;
        this.icebergType = opts.icebergType;
        this.icebergCode = opts.icebergCode;
        this.details = opts.details;
        this.isCommitStateUnknown = opts.icebergType === "CommitStateUnknownException" || [
            500,
            502,
            504
        ].includes(opts.status) && opts.icebergType?.includes("CommitState") === true;
    }
    /**
   * Returns true if the error is a 404 Not Found error.
   */ isNotFound() {
        return this.status === 404;
    }
    /**
   * Returns true if the error is a 409 Conflict error.
   */ isConflict() {
        return this.status === 409;
    }
    /**
   * Returns true if the error is a 419 Authentication Timeout error.
   */ isAuthenticationTimeout() {
        return this.status === 419;
    }
};
// src/utils/url.ts
function buildUrl(baseUrl, path, query) {
    const url = new URL(path, baseUrl);
    if (query) {
        for (const [key, value] of Object.entries(query)){
            if (value !== void 0) {
                url.searchParams.set(key, value);
            }
        }
    }
    return url.toString();
}
// src/http/createFetchClient.ts
async function buildAuthHeaders(auth) {
    if (!auth || auth.type === "none") {
        return {};
    }
    if (auth.type === "bearer") {
        return {
            Authorization: `Bearer ${auth.token}`
        };
    }
    if (auth.type === "header") {
        return {
            [auth.name]: auth.value
        };
    }
    if (auth.type === "custom") {
        return await auth.getHeaders();
    }
    return {};
}
function createFetchClient(options) {
    const fetchFn = options.fetchImpl ?? globalThis.fetch;
    return {
        async request ({ method, path, query, body, headers }) {
            const url = buildUrl(options.baseUrl, path, query);
            const authHeaders = await buildAuthHeaders(options.auth);
            const res = await fetchFn(url, {
                method,
                headers: {
                    ...body ? {
                        "Content-Type": "application/json"
                    } : {},
                    ...authHeaders,
                    ...headers
                },
                body: body ? JSON.stringify(body) : void 0
            });
            const text = await res.text();
            const isJson = (res.headers.get("content-type") || "").includes("application/json");
            const data = isJson && text ? JSON.parse(text) : text;
            if (!res.ok) {
                const errBody = isJson ? data : void 0;
                const errorDetail = errBody?.error;
                throw new IcebergError(errorDetail?.message ?? `Request failed with status ${res.status}`, {
                    status: res.status,
                    icebergType: errorDetail?.type,
                    icebergCode: errorDetail?.code,
                    details: errBody
                });
            }
            return {
                status: res.status,
                headers: res.headers,
                data
            };
        }
    };
}
// src/catalog/namespaces.ts
function namespaceToPath(namespace) {
    return namespace.join("");
}
var NamespaceOperations = class {
    constructor(client, prefix = ""){
        this.client = client;
        this.prefix = prefix;
    }
    async listNamespaces(parent) {
        const query = parent ? {
            parent: namespaceToPath(parent.namespace)
        } : void 0;
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces`,
            query
        });
        return response.data.namespaces.map((ns)=>({
                namespace: ns
            }));
    }
    async createNamespace(id, metadata) {
        const request = {
            namespace: id.namespace,
            properties: metadata?.properties
        };
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces`,
            body: request
        });
        return response.data;
    }
    async dropNamespace(id) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
    }
    async loadNamespaceMetadata(id) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
        });
        return {
            properties: response.data.properties
        };
    }
    async namespaceExists(id) {
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath(id.namespace)}`
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createNamespaceIfNotExists(id, metadata) {
        try {
            return await this.createNamespace(id, metadata);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return;
            }
            throw error;
        }
    }
};
// src/catalog/tables.ts
function namespaceToPath2(namespace) {
    return namespace.join("");
}
var TableOperations = class {
    constructor(client, prefix = "", accessDelegation){
        this.client = client;
        this.prefix = prefix;
        this.accessDelegation = accessDelegation;
    }
    async listTables(namespace) {
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`
        });
        return response.data.identifiers;
    }
    async createTable(namespace, request) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(namespace.namespace)}/tables`,
            body: request,
            headers
        });
        return response.data.metadata;
    }
    async updateTable(id, request) {
        const response = await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            body: request
        });
        return {
            "metadata-location": response.data["metadata-location"],
            metadata: response.data.metadata
        };
    }
    async dropTable(id, options) {
        await this.client.request({
            method: "DELETE",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            query: {
                purgeRequested: String(options?.purge ?? false)
            }
        });
    }
    async loadTable(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        const response = await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
            headers
        });
        return response.data.metadata;
    }
    async tableExists(id) {
        const headers = {};
        if (this.accessDelegation) {
            headers["X-Iceberg-Access-Delegation"] = this.accessDelegation;
        }
        try {
            await this.client.request({
                method: "HEAD",
                path: `${this.prefix}/namespaces/${namespaceToPath2(id.namespace)}/tables/${id.name}`,
                headers
            });
            return true;
        } catch (error) {
            if (error instanceof IcebergError && error.status === 404) {
                return false;
            }
            throw error;
        }
    }
    async createTableIfNotExists(namespace, request) {
        try {
            return await this.createTable(namespace, request);
        } catch (error) {
            if (error instanceof IcebergError && error.status === 409) {
                return await this.loadTable({
                    namespace: namespace.namespace,
                    name: request.name
                });
            }
            throw error;
        }
    }
};
// src/catalog/IcebergRestCatalog.ts
var IcebergRestCatalog = class {
    /**
   * Creates a new Iceberg REST Catalog client.
   *
   * @param options - Configuration options for the catalog client
   */ constructor(options){
        let prefix = "v1";
        if (options.catalogName) {
            prefix += `/${options.catalogName}`;
        }
        const baseUrl = options.baseUrl.endsWith("/") ? options.baseUrl : `${options.baseUrl}/`;
        this.client = createFetchClient({
            baseUrl,
            auth: options.auth,
            fetchImpl: options.fetch
        });
        this.accessDelegation = options.accessDelegation?.join(",");
        this.namespaceOps = new NamespaceOperations(this.client, prefix);
        this.tableOps = new TableOperations(this.client, prefix, this.accessDelegation);
    }
    /**
   * Lists all namespaces in the catalog.
   *
   * @param parent - Optional parent namespace to list children under
   * @returns Array of namespace identifiers
   *
   * @example
   * ```typescript
   * // List all top-level namespaces
   * const namespaces = await catalog.listNamespaces();
   *
   * // List namespaces under a parent
   * const children = await catalog.listNamespaces({ namespace: ['analytics'] });
   * ```
   */ async listNamespaces(parent) {
        return this.namespaceOps.listNamespaces(parent);
    }
    /**
   * Creates a new namespace in the catalog.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespace(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * console.log(response.namespace); // ['analytics']
   * console.log(response.properties); // { owner: 'data-team', ... }
   * ```
   */ async createNamespace(id, metadata) {
        return this.namespaceOps.createNamespace(id, metadata);
    }
    /**
   * Drops a namespace from the catalog.
   *
   * The namespace must be empty (contain no tables) before it can be dropped.
   *
   * @param id - Namespace identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropNamespace({ namespace: ['analytics'] });
   * ```
   */ async dropNamespace(id) {
        await this.namespaceOps.dropNamespace(id);
    }
    /**
   * Loads metadata for a namespace.
   *
   * @param id - Namespace identifier to load
   * @returns Namespace metadata including properties
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadNamespaceMetadata({ namespace: ['analytics'] });
   * console.log(metadata.properties);
   * ```
   */ async loadNamespaceMetadata(id) {
        return this.namespaceOps.loadNamespaceMetadata(id);
    }
    /**
   * Lists all tables in a namespace.
   *
   * @param namespace - Namespace identifier to list tables from
   * @returns Array of table identifiers
   *
   * @example
   * ```typescript
   * const tables = await catalog.listTables({ namespace: ['analytics'] });
   * console.log(tables); // [{ namespace: ['analytics'], name: 'events' }, ...]
   * ```
   */ async listTables(namespace) {
        return this.tableOps.listTables(namespace);
    }
    /**
   * Creates a new table in the catalog.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTable(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     },
   *     'partition-spec': {
   *       'spec-id': 0,
   *       fields: [
   *         { source_id: 2, field_id: 1000, name: 'ts_day', transform: 'day' }
   *       ]
   *     }
   *   }
   * );
   * ```
   */ async createTable(namespace, request) {
        return this.tableOps.createTable(namespace, request);
    }
    /**
   * Updates an existing table's metadata.
   *
   * Can update the schema, partition spec, or properties of a table.
   *
   * @param id - Table identifier to update
   * @param request - Update request with fields to modify
   * @returns Response containing the metadata location and updated table metadata
   *
   * @example
   * ```typescript
   * const response = await catalog.updateTable(
   *   { namespace: ['analytics'], name: 'events' },
   *   {
   *     properties: { 'read.split.target-size': '134217728' }
   *   }
   * );
   * console.log(response['metadata-location']); // s3://...
   * console.log(response.metadata); // TableMetadata object
   * ```
   */ async updateTable(id, request) {
        return this.tableOps.updateTable(id, request);
    }
    /**
   * Drops a table from the catalog.
   *
   * @param id - Table identifier to drop
   *
   * @example
   * ```typescript
   * await catalog.dropTable({ namespace: ['analytics'], name: 'events' });
   * ```
   */ async dropTable(id, options) {
        await this.tableOps.dropTable(id, options);
    }
    /**
   * Loads metadata for a table.
   *
   * @param id - Table identifier to load
   * @returns Table metadata including schema, partition spec, location, etc.
   *
   * @example
   * ```typescript
   * const metadata = await catalog.loadTable({ namespace: ['analytics'], name: 'events' });
   * console.log(metadata.schema);
   * console.log(metadata.location);
   * ```
   */ async loadTable(id) {
        return this.tableOps.loadTable(id);
    }
    /**
   * Checks if a namespace exists in the catalog.
   *
   * @param id - Namespace identifier to check
   * @returns True if the namespace exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.namespaceExists({ namespace: ['analytics'] });
   * console.log(exists); // true or false
   * ```
   */ async namespaceExists(id) {
        return this.namespaceOps.namespaceExists(id);
    }
    /**
   * Checks if a table exists in the catalog.
   *
   * @param id - Table identifier to check
   * @returns True if the table exists, false otherwise
   *
   * @example
   * ```typescript
   * const exists = await catalog.tableExists({ namespace: ['analytics'], name: 'events' });
   * console.log(exists); // true or false
   * ```
   */ async tableExists(id) {
        return this.tableOps.tableExists(id);
    }
    /**
   * Creates a namespace if it does not exist.
   *
   * If the namespace already exists, returns void. If created, returns the response.
   *
   * @param id - Namespace identifier to create
   * @param metadata - Optional metadata properties for the namespace
   * @returns Response containing the created namespace and its properties, or void if it already exists
   *
   * @example
   * ```typescript
   * const response = await catalog.createNamespaceIfNotExists(
   *   { namespace: ['analytics'] },
   *   { properties: { owner: 'data-team' } }
   * );
   * if (response) {
   *   console.log('Created:', response.namespace);
   * } else {
   *   console.log('Already exists');
   * }
   * ```
   */ async createNamespaceIfNotExists(id, metadata) {
        return this.namespaceOps.createNamespaceIfNotExists(id, metadata);
    }
    /**
   * Creates a table if it does not exist.
   *
   * If the table already exists, returns its metadata instead.
   *
   * @param namespace - Namespace to create the table in
   * @param request - Table creation request including name, schema, partition spec, etc.
   * @returns Table metadata for the created or existing table
   *
   * @example
   * ```typescript
   * const metadata = await catalog.createTableIfNotExists(
   *   { namespace: ['analytics'] },
   *   {
   *     name: 'events',
   *     schema: {
   *       type: 'struct',
   *       fields: [
   *         { id: 1, name: 'id', type: 'long', required: true },
   *         { id: 2, name: 'timestamp', type: 'timestamp', required: true }
   *       ],
   *       'schema-id': 0
   *     }
   *   }
   * );
   * ```
   */ async createTableIfNotExists(namespace, request) {
        return this.tableOps.createTableIfNotExists(namespace, request);
    }
};
// src/catalog/types.ts
var DECIMAL_REGEX = /^decimal\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)$/;
var FIXED_REGEX = /^fixed\s*\[\s*(\d+)\s*\]$/;
function parseDecimalType(type) {
    const match = type.match(DECIMAL_REGEX);
    if (!match) return null;
    return {
        precision: parseInt(match[1], 10),
        scale: parseInt(match[2], 10)
    };
}
function parseFixedType(type) {
    const match = type.match(FIXED_REGEX);
    if (!match) return null;
    return {
        length: parseInt(match[1], 10)
    };
}
function isDecimalType(type) {
    return DECIMAL_REGEX.test(type);
}
function isFixedType(type) {
    return FIXED_REGEX.test(type);
}
function typesEqual(a, b) {
    const decimalA = parseDecimalType(a);
    const decimalB = parseDecimalType(b);
    if (decimalA && decimalB) {
        return decimalA.precision === decimalB.precision && decimalA.scale === decimalB.scale;
    }
    const fixedA = parseFixedType(a);
    const fixedB = parseFixedType(b);
    if (fixedA && fixedB) {
        return fixedA.length === fixedB.length;
    }
    return a === b;
}
function getCurrentSchema(metadata) {
    return metadata.schemas.find((s)=>s["schema-id"] === metadata["current-schema-id"]);
}
;
 //# sourceMappingURL=index.mjs.map
 //# sourceMappingURL=index.mjs.map
}),
"[project]/multilingual_version/node_modules/cookie/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseCookie = parseCookie;
exports.parse = parseCookie;
exports.stringifyCookie = stringifyCookie;
exports.stringifySetCookie = stringifySetCookie;
exports.serialize = stringifySetCookie;
exports.parseSetCookie = parseSetCookie;
exports.stringifySetCookie = stringifySetCookie;
exports.serialize = stringifySetCookie;
/**
 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
 * which has been replaced by the token definition in RFC 7230 appendix B.
 *
 * cookie-name       = token
 * token             = 1*tchar
 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
 *                     "*" / "+" / "-" / "." / "^" / "_" /
 *                     "`" / "|" / "~" / DIGIT / ALPHA
 *
 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
 * Allow same range as cookie value, except `=`, which delimits end of name.
 */ const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
 *
 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
 *                     ; US-ASCII characters excluding CTLs,
 *                     ; whitespace DQUOTE, comma, semicolon,
 *                     ; and backslash
 *
 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
 */ const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
 * RegExp to match domain-value in RFC 6265 sec 4.1.1
 *
 * domain-value      = <subdomain>
 *                     ; defined in [RFC1034], Section 3.5, as
 *                     ; enhanced by [RFC1123], Section 2.1
 * <subdomain>       = <label> | <subdomain> "." <label>
 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
 *                     Labels must be 63 characters or less.
 *                     'let-dig' not 'letter' in the first char, per RFC1123
 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
 * <let-dig-hyp>     = <let-dig> | "-"
 * <let-dig>         = <letter> | <digit>
 * <letter>          = any one of the 52 alphabetic characters A through Z in
 *                     upper case and a through z in lower case
 * <digit>           = any one of the ten digits 0 through 9
 *
 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
 *
 * > (Note that a leading %x2E ("."), if present, is ignored even though that
 * character is not permitted, but a trailing %x2E ("."), if present, will
 * cause the user agent to ignore the attribute.)
 */ const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
 * RegExp to match path-value in RFC 6265 sec 4.1.1
 *
 * path-value        = <any CHAR except CTLs or ";">
 * CHAR              = %x01-7F
 *                     ; defined in RFC 5234 appendix B.1
 */ const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
/**
 * RegExp to match max-age-value in RFC 6265 sec 5.6.2
 */ const maxAgeRegExp = /^-?\d+$/;
const __toString = Object.prototype.toString;
const NullObject = /* @__PURE__ */ (()=>{
    const C = function() {};
    C.prototype = Object.create(null);
    return C;
})();
/**
 * Parse a `Cookie` header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */ function parseCookie(str, options) {
    const obj = new NullObject();
    const len = str.length;
    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
    if (len < 2) return obj;
    const dec = options?.decode || decode;
    let index = 0;
    do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1) break; // No more cookie pairs.
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        const key = valueSlice(str, index, eqIdx);
        // only assign once
        if (obj[key] === undefined) {
            obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
    }while (index < len)
    return obj;
}
/**
 * Stringifies an object into an HTTP `Cookie` header.
 */ function stringifyCookie(cookie, options) {
    const enc = options?.encode || encodeURIComponent;
    const cookieStrings = [];
    for (const name of Object.keys(cookie)){
        const val = cookie[name];
        if (val === undefined) continue;
        if (!cookieNameRegExp.test(name)) {
            throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
            throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
    }
    return cookieStrings.join("; ");
}
function stringifySetCookie(_name, _val, _opts) {
    const cookie = typeof _name === "object" ? _name : {
        ..._opts,
        name: _name,
        value: String(_val)
    };
    const options = typeof _val === "object" ? _val : _opts;
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
    }
    const value = cookie.value ? enc(cookie.value) : "";
    if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
    }
    let str = cookie.name + "=" + value;
    if (cookie.maxAge !== undefined) {
        if (!Number.isInteger(cookie.maxAge)) {
            throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
    }
    if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
            throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
    }
    if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
            throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
    }
    if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
            throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
    }
    if (cookie.httpOnly) {
        str += "; HttpOnly";
    }
    if (cookie.secure) {
        str += "; Secure";
    }
    if (cookie.partitioned) {
        str += "; Partitioned";
    }
    if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : undefined;
        switch(priority){
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
    }
    if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch(sameSite){
            case true:
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
    }
    return str;
}
/**
 * Deserialize a `Set-Cookie` header into an object.
 *
 * deserialize('foo=bar; httpOnly')
 *   => { name: 'foo', value: 'bar', httpOnly: true }
 */ function parseSetCookie(str, options) {
    const dec = options?.decode || decode;
    const len = str.length;
    const endIdx = endIndex(str, 0, len);
    const eqIdx = eqIndex(str, 0, endIdx);
    const setCookie = eqIdx === -1 ? {
        name: "",
        value: dec(valueSlice(str, 0, endIdx))
    } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
    };
    let index = endIdx + 1;
    while(index < len){
        const endIdx = endIndex(str, index, len);
        const eqIdx = eqIndex(str, index, endIdx);
        const attr = eqIdx === -1 ? valueSlice(str, index, endIdx) : valueSlice(str, index, eqIdx);
        const val = eqIdx === -1 ? undefined : valueSlice(str, eqIdx + 1, endIdx);
        switch(attr.toLowerCase()){
            case "httponly":
                setCookie.httpOnly = true;
                break;
            case "secure":
                setCookie.secure = true;
                break;
            case "partitioned":
                setCookie.partitioned = true;
                break;
            case "domain":
                setCookie.domain = val;
                break;
            case "path":
                setCookie.path = val;
                break;
            case "max-age":
                if (val && maxAgeRegExp.test(val)) setCookie.maxAge = Number(val);
                break;
            case "expires":
                if (!val) break;
                const date = new Date(val);
                if (Number.isFinite(date.valueOf())) setCookie.expires = date;
                break;
            case "priority":
                if (!val) break;
                const priority = val.toLowerCase();
                if (priority === "low" || priority === "medium" || priority === "high") {
                    setCookie.priority = priority;
                }
                break;
            case "samesite":
                if (!val) break;
                const sameSite = val.toLowerCase();
                if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
                    setCookie.sameSite = sameSite;
                }
                break;
        }
        index = endIdx + 1;
    }
    return setCookie;
}
/**
 * Find the `;` character between `min` and `len` in str.
 */ function endIndex(str, min, len) {
    const index = str.indexOf(";", min);
    return index === -1 ? len : index;
}
/**
 * Find the `=` character between `min` and `max` in str.
 */ function eqIndex(str, min, max) {
    const index = str.indexOf("=", min);
    return index < max ? index : -1;
}
/**
 * Slice out a value between startPod to max.
 */ function valueSlice(str, min, max) {
    let start = min;
    let end = max;
    do {
        const code = str.charCodeAt(start);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) break;
    }while (++start < end)
    while(end > start){
        const code = str.charCodeAt(end - 1);
        if (code !== 0x20 /*   */  && code !== 0x09 /* \t */ ) break;
        end--;
    }
    return str.slice(start, end);
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 */ function decode(str) {
    if (str.indexOf("%") === -1) return str;
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
}
/**
 * Determine if value is a Date.
 */ function isDate(val) {
    return __toString.call(val) === "[object Date]";
} //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/platform/node/globalThis.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
 */ /** only globals that common to node and browsers are allowed */ // eslint-disable-next-line n/no-unsupported-features/es-builtins
__turbopack_context__.s([
    "_globalThis",
    ()=>_globalThis
]);
const _globalThis = typeof globalThis === 'object' ? globalThis : /*TURBOPACK member replacement*/ __turbopack_context__.g; //# sourceMappingURL=globalThis.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$platform$2f$node$2f$globalThis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/platform/node/globalThis.js [app-rsc] (ecmascript)");
;
const GLOBAL_LOGS_API_KEY = Symbol.for('io.opentelemetry.js.api.logs');
const _global = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$platform$2f$node$2f$globalThis$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_globalThis"];
function makeGetter(requiredVersion, instance, fallback) {
    return (version)=>version === requiredVersion ? instance : fallback;
}
const API_BACKWARDS_COMPATIBILITY_VERSION = 1; //# sourceMappingURL=global-utils.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)");
;
class NoopLoggerProvider {
    getLogger(_name, _version, _options) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NoopLogger"]();
    }
}
const NOOP_LOGGER_PROVIDER = new NoopLoggerProvider(); //# sourceMappingURL=NoopLoggerProvider.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js [app-rsc] (ecmascript)");
;
class ProxyLogger {
    constructor(_provider, name, version, options){
        this._provider = _provider;
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER"];
        }
        this._delegate = logger;
        return this._delegate;
    }
} //# sourceMappingURL=ProxyLogger.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/ProxyLogger.js [app-rsc] (ecmascript)");
;
;
class ProxyLoggerProvider {
    getLogger(name, version, options) {
        var _a;
        return (_a = this._getDelegateLogger(name, version, options)) !== null && _a !== void 0 ? _a : new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLogger$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLogger"](this, name, version, options);
    }
    /**
     * Get the delegate logger provider.
     * Used by tests only.
     * @internal
     */ _getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"];
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
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/ProxyLoggerProvider.js [app-rsc] (ecmascript)");
;
;
;
class LogsAPI {
    constructor(){
        this._proxyLoggerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLoggerProvider"]();
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new LogsAPI();
        }
        return this._instance;
    }
    setGlobalLoggerProvider(provider) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) {
            return this.getLoggerProvider();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["makeGetter"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"], provider, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$NoopLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NOOP_LOGGER_PROVIDER"]);
        this._proxyLoggerProvider._setDelegate(provider);
        return provider;
    }
    /**
     * Returns the global logger provider.
     *
     * @returns LoggerProvider
     */ getLoggerProvider() {
        var _a, _b;
        return (_b = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]]) === null || _a === void 0 ? void 0 : _a.call(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"], __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API_BACKWARDS_COMPATIBILITY_VERSION"])) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
    }
    /**
     * Returns a logger from the global logger provider.
     *
     * @returns Logger
     */ getLogger(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
    }
    /** Remove the global logger provider */ disable() {
        delete __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["_global"][__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$internal$2f$global$2d$utils$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GLOBAL_LOGS_API_KEY"]];
        this._proxyLoggerProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$ProxyLoggerProvider$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProxyLoggerProvider"]();
    }
} //# sourceMappingURL=logs.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const logs = __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f40$prisma$2f$instrumentation$2f$node_modules$2f40$opentelemetry$2f$api$2d$logs$2f$build$2f$esm$2f$api$2f$logs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LogsAPI"].getInstance(); //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/import-in-the-middle/lib/register.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/import-in-the-middle/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
const { importHooks, specifiers, toHook } = __turbopack_context__.r("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/import-in-the-middle/lib/register.js [app-rsc] (ecmascript)");
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
"[project]/multilingual_version/node_modules/@prisma/instrumentation/dist/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var index_exports = {};
__export(index_exports, {
    PrismaInstrumentation: ()=>PrismaInstrumentation,
    registerInstrumentations: ()=>import_instrumentation2.registerInstrumentations
});
module.exports = __toCommonJS(index_exports);
// src/PrismaInstrumentation.ts
var import_api2 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
var import_instrumentation = __turbopack_context__.r("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
// ../instrumentation-contract/dist/index.mjs
var package_default = {
    name: "@prisma/instrumentation-contract",
    version: "7.6.0",
    description: "Shared types and utilities for Prisma instrumentation",
    main: "dist/index.js",
    module: "dist/index.mjs",
    types: "dist/index.d.ts",
    exports: {
        ".": {
            require: {
                types: "./dist/index.d.ts",
                default: "./dist/index.js"
            },
            import: {
                types: "./dist/index.d.mts",
                default: "./dist/index.mjs"
            }
        }
    },
    license: "Apache-2.0",
    homepage: "https://www.prisma.io",
    repository: {
        type: "git",
        url: "https://github.com/prisma/prisma.git",
        directory: "packages/instrumentation-contract"
    },
    bugs: "https://github.com/prisma/prisma/issues",
    scripts: {
        dev: "DEV=true tsx helpers/build.ts",
        build: "tsx helpers/build.ts",
        prepublishOnly: "pnpm run build",
        test: "vitest run"
    },
    files: [
        "dist"
    ],
    sideEffects: false,
    devDependencies: {
        "@opentelemetry/api": "1.9.0"
    },
    peerDependencies: {
        "@opentelemetry/api": "^1.8"
    }
};
var majorVersion = package_default.version.split(".")[0];
var GLOBAL_INSTRUMENTATION_KEY = "PRISMA_INSTRUMENTATION";
var GLOBAL_VERSIONED_INSTRUMENTATION_KEY = `V${majorVersion}_PRISMA_INSTRUMENTATION`;
var globalThisWithPrismaInstrumentation = globalThis;
function getGlobalTracingHelper() {
    const versionedGlobal = globalThisWithPrismaInstrumentation[GLOBAL_VERSIONED_INSTRUMENTATION_KEY];
    if (versionedGlobal?.helper) {
        return versionedGlobal.helper;
    }
    const fallbackGlobal = globalThisWithPrismaInstrumentation[GLOBAL_INSTRUMENTATION_KEY];
    return fallbackGlobal?.helper;
}
function setGlobalTracingHelper(helper) {
    const globalValue = {
        helper
    };
    globalThisWithPrismaInstrumentation[GLOBAL_VERSIONED_INSTRUMENTATION_KEY] = globalValue;
    globalThisWithPrismaInstrumentation[GLOBAL_INSTRUMENTATION_KEY] = globalValue;
}
function clearGlobalTracingHelper() {
    delete globalThisWithPrismaInstrumentation[GLOBAL_VERSIONED_INSTRUMENTATION_KEY];
    delete globalThisWithPrismaInstrumentation[GLOBAL_INSTRUMENTATION_KEY];
}
// src/ActiveTracingHelper.ts
var import_api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
var showAllTraces = process.env.PRISMA_SHOW_ALL_TRACES === "true";
var nonSampledTraceParent = `00-10-10-00`;
function engineSpanKindToOtelSpanKind(engineSpanKind) {
    switch(engineSpanKind){
        case "client":
            return import_api.SpanKind.CLIENT;
        case "internal":
        default:
            return import_api.SpanKind.INTERNAL;
    }
}
var ActiveTracingHelper = class {
    tracerProvider;
    ignoreSpanTypes;
    constructor({ tracerProvider, ignoreSpanTypes }){
        this.tracerProvider = tracerProvider;
        this.ignoreSpanTypes = ignoreSpanTypes;
    }
    isEnabled() {
        return true;
    }
    getTraceParent(context) {
        const span = import_api.trace.getSpanContext(context ?? import_api.context.active());
        if (span) {
            return `00-${span.traceId}-${span.spanId}-0${span.traceFlags}`;
        }
        return nonSampledTraceParent;
    }
    dispatchEngineSpans(spans) {
        const tracer = this.tracerProvider.getTracer("prisma");
        const linkIds = /* @__PURE__ */ new Map();
        const roots = spans.filter((span)=>span.parentId === null);
        for (const root of roots){
            dispatchEngineSpan(tracer, root, spans, linkIds, this.ignoreSpanTypes);
        }
    }
    getActiveContext() {
        return import_api.context.active();
    }
    runInChildSpan(options, callback) {
        if (typeof options === "string") {
            options = {
                name: options
            };
        }
        if (options.internal && !showAllTraces) {
            return callback();
        }
        const tracer = this.tracerProvider.getTracer("prisma");
        const context = options.context ?? this.getActiveContext();
        const name = `prisma:client:${options.name}`;
        if (shouldIgnoreSpan(name, this.ignoreSpanTypes)) {
            return callback();
        }
        if (options.active === false) {
            const span = tracer.startSpan(name, options, context);
            return endSpan(span, callback(span, context));
        }
        return tracer.startActiveSpan(name, options, (span)=>endSpan(span, callback(span, context)));
    }
};
function dispatchEngineSpan(tracer, engineSpan, allSpans, linkIds, ignoreSpanTypes) {
    if (shouldIgnoreSpan(engineSpan.name, ignoreSpanTypes)) return;
    const spanOptions = {
        attributes: engineSpan.attributes,
        kind: engineSpanKindToOtelSpanKind(engineSpan.kind),
        startTime: engineSpan.startTime
    };
    tracer.startActiveSpan(engineSpan.name, spanOptions, (span)=>{
        linkIds.set(engineSpan.id, span.spanContext().spanId);
        if (engineSpan.links) {
            span.addLinks(engineSpan.links.flatMap((link)=>{
                const linkedId = linkIds.get(link);
                if (!linkedId) {
                    return [];
                }
                return {
                    context: {
                        spanId: linkedId,
                        traceId: span.spanContext().traceId,
                        traceFlags: span.spanContext().traceFlags
                    }
                };
            }));
        }
        const children = allSpans.filter((s)=>s.parentId === engineSpan.id);
        for (const child of children){
            dispatchEngineSpan(tracer, child, allSpans, linkIds, ignoreSpanTypes);
        }
        span.end(engineSpan.endTime);
    });
}
function endSpan(span, result) {
    if (isPromiseLike(result)) {
        return result.then((value)=>{
            span.end();
            return value;
        }, (reason)=>{
            span.end();
            throw reason;
        });
    }
    span.end();
    return result;
}
function isPromiseLike(value) {
    return value != null && typeof value["then"] === "function";
}
function shouldIgnoreSpan(spanName, ignoreSpanTypes) {
    return ignoreSpanTypes.some((pattern)=>typeof pattern === "string" ? pattern === spanName : pattern.test(spanName));
}
// package.json
var package_default2 = {
    name: "@prisma/instrumentation",
    version: "7.6.0",
    description: "OpenTelemetry compliant instrumentation for Prisma Client",
    main: "dist/index.js",
    module: "dist/index.mjs",
    types: "dist/index.d.ts",
    exports: {
        ".": {
            require: {
                types: "./dist/index.d.ts",
                default: "./dist/index.js"
            },
            import: {
                types: "./dist/index.d.ts",
                default: "./dist/index.mjs"
            }
        }
    },
    license: "Apache-2.0",
    homepage: "https://www.prisma.io",
    repository: {
        type: "git",
        url: "https://github.com/prisma/prisma.git",
        directory: "packages/instrumentation"
    },
    bugs: "https://github.com/prisma/prisma/issues",
    devDependencies: {
        "@opentelemetry/api": "1.9.0",
        "@prisma/instrumentation-contract": "workspace:*",
        "@types/node": "~20.19.24",
        typescript: "5.4.5"
    },
    dependencies: {
        "@opentelemetry/instrumentation": "^0.207.0"
    },
    peerDependencies: {
        "@opentelemetry/api": "^1.8"
    },
    files: [
        "dist"
    ],
    keywords: [
        "prisma",
        "instrumentation",
        "opentelemetry",
        "otel"
    ],
    scripts: {
        dev: "DEV=true tsx helpers/build.ts",
        build: "tsx helpers/build.ts",
        prepublishOnly: "pnpm run build",
        test: "vitest run"
    },
    sideEffects: false
};
// src/constants.ts
var VERSION = package_default2.version;
var NAME = package_default2.name;
var MODULE_NAME = "@prisma/client";
// src/PrismaInstrumentation.ts
var PrismaInstrumentation = class extends import_instrumentation.InstrumentationBase {
    tracerProvider;
    constructor(config = {}){
        super(NAME, VERSION, config);
    }
    setTracerProvider(tracerProvider) {
        this.tracerProvider = tracerProvider;
    }
    init() {
        const module2 = new import_instrumentation.InstrumentationNodeModuleDefinition(MODULE_NAME, [
            VERSION
        ]);
        return [
            module2
        ];
    }
    enable() {
        const config = this._config;
        setGlobalTracingHelper(new ActiveTracingHelper({
            tracerProvider: this.tracerProvider ?? import_api2.trace.getTracerProvider(),
            ignoreSpanTypes: config.ignoreSpanTypes ?? []
        }));
    }
    disable() {
        clearGlobalTracingHelper();
    }
    isEnabled() {
        return getGlobalTracingHelper() !== void 0;
    }
};
// src/index.ts
var import_instrumentation2 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@prisma/instrumentation/node_modules/@opentelemetry/instrumentation/build/esm/index.js [app-rsc] (ecmascript)");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    PrismaInstrumentation,
    registerInstrumentations
});
}),
"[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/debug-build-ntZrglYX.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This serves as a build time flag that will be true by default, but false in non-debug builds or if users replace `__SENTRY_DEBUG__` in their generated code.
 *
 * ATTENTION: This constant must never cross package boundaries (i.e. be exported) to guarantee that it can be used for tree shaking.
 */ const DEBUG_BUILD = typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__;
exports.DEBUG_BUILD = DEBUG_BUILD; //# sourceMappingURL=debug-build-ntZrglYX.js.map
}),
"[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/resource-C7SKXNJp.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core = __turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/core/build/cjs/index.js [app-rsc] (ecmascript)");
const semanticConventions = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
const core$1 = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
const debugBuild = __turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/debug-build-ntZrglYX.js [app-rsc] (ecmascript)");
const sdkTraceBase = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/sdk-trace-base/build/esm/index.js [app-rsc] (ecmascript)");
/** If this attribute is true, it means that the parent is a remote span. */ const SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE = 'sentry.parentIsRemote';
// These are not standardized yet, but used by the graphql instrumentation
const SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION = 'sentry.graphql.operation';
/**
 * Get the parent span id from a span.
 * In OTel v1, the parent span id is accessed as `parentSpanId`
 * In OTel v2, the parent span id is accessed as `spanId` on the `parentSpanContext`
 */ function getParentSpanId(span) {
    if ('parentSpanId' in span) {
        return span.parentSpanId;
    } else if ('parentSpanContext' in span) {
        return span.parentSpanContext?.spanId;
    }
    return undefined;
}
/**
 * Check if a given span has attributes.
 * This is necessary because the base `Span` type does not have attributes,
 * so in places where we are passed a generic span, we need to check if we want to access them.
 */ function spanHasAttributes(span) {
    const castSpan = span;
    return !!castSpan.attributes && typeof castSpan.attributes === 'object';
}
/**
 * Check if a given span has a kind.
 * This is necessary because the base `Span` type does not have a kind,
 * so in places where we are passed a generic span, we need to check if we want to access it.
 */ function spanHasKind(span) {
    const castSpan = span;
    return typeof castSpan.kind === 'number';
}
/**
 * Check if a given span has a status.
 * This is necessary because the base `Span` type does not have a status,
 * so in places where we are passed a generic span, we need to check if we want to access it.
 */ function spanHasStatus(span) {
    const castSpan = span;
    return !!castSpan.status;
}
/**
 * Check if a given span has a name.
 * This is necessary because the base `Span` type does not have a name,
 * so in places where we are passed a generic span, we need to check if we want to access it.
 */ function spanHasName(span) {
    const castSpan = span;
    return !!castSpan.name;
}
/**
 * Check if a given span has a kind.
 * This is necessary because the base `Span` type does not have a kind,
 * so in places where we are passed a generic span, we need to check if we want to access it.
 */ function spanHasParentId(span) {
    const castSpan = span;
    return !!getParentSpanId(castSpan);
}
/**
 * Check if a given span has events.
 * This is necessary because the base `Span` type does not have events,
 * so in places where we are passed a generic span, we need to check if we want to access it.
 */ function spanHasEvents(span) {
    const castSpan = span;
    return Array.isArray(castSpan.events);
}
/**
 * Get sanitizied request data from an OTEL span.
 */ function getRequestSpanData(span) {
    // The base `Span` type has no `attributes`, so we need to guard here against that
    if (!spanHasAttributes(span)) {
        return {};
    }
    // eslint-disable-next-line deprecation/deprecation
    const maybeUrlAttribute = span.attributes[semanticConventions.ATTR_URL_FULL] || span.attributes[semanticConventions.SEMATTRS_HTTP_URL];
    const data = {
        url: maybeUrlAttribute,
        // eslint-disable-next-line deprecation/deprecation
        'http.method': span.attributes[semanticConventions.ATTR_HTTP_REQUEST_METHOD] || span.attributes[semanticConventions.SEMATTRS_HTTP_METHOD]
    };
    // Default to GET if URL is set but method is not
    if (!data['http.method'] && data.url) {
        data['http.method'] = 'GET';
    }
    try {
        if (typeof maybeUrlAttribute === 'string') {
            const url = core.parseUrl(maybeUrlAttribute);
            data.url = core.getSanitizedUrlString(url);
            if (url.search) {
                data['http.query'] = url.search;
            }
            if (url.hash) {
                data['http.fragment'] = url.hash;
            }
        }
    } catch  {
    // ignore
    }
    return data;
}
// Typescript complains if we do not use `...args: any[]` for the mixin, with:
// A mixin class must have a constructor with a single rest parameter of type 'any[]'.ts(2545)
/* eslint-disable @typescript-eslint/no-explicit-any */ /**
 * Wrap an Client class with things we need for OpenTelemetry support.
 * Make sure that the Client class passed in is non-abstract!
 *
 * Usage:
 * const OpenTelemetryClient = getWrappedClientClass(NodeClient);
 * const client = new OpenTelemetryClient(options);
 */ function wrapClientClass(ClientClass) {
    // @ts-expect-error We just assume that this is non-abstract, if you pass in an abstract class this would make it non-abstract
    class OpenTelemetryClient extends ClientClass {
        constructor(...args){
            super(...args);
        }
        /** Get the OTEL tracer. */ get tracer() {
            if (this._tracer) {
                return this._tracer;
            }
            const name = '@sentry/opentelemetry';
            const version = core.SDK_VERSION;
            const tracer = api.trace.getTracer(name, version);
            this._tracer = tracer;
            return tracer;
        }
        /**
     * @inheritDoc
     */ async flush(timeout) {
            const provider = this.traceProvider;
            await provider?.forceFlush();
            return super.flush(timeout);
        }
    }
    return OpenTelemetryClient;
}
/* eslint-enable @typescript-eslint/no-explicit-any */ /**
 * Get the span kind from a span.
 * For whatever reason, this is not public API on the generic "Span" type,
 * so we need to check if we actually have a `SDKTraceBaseSpan` where we can fetch this from.
 * Otherwise, we fall back to `SpanKind.INTERNAL`.
 */ function getSpanKind(span) {
    if (spanHasKind(span)) {
        return span.kind;
    }
    return api.SpanKind.INTERNAL;
}
const SENTRY_TRACE_HEADER = 'sentry-trace';
const SENTRY_BAGGAGE_HEADER = 'baggage';
const SENTRY_TRACE_STATE_DSC = 'sentry.dsc';
const SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING = 'sentry.sampled_not_recording';
const SENTRY_TRACE_STATE_URL = 'sentry.url';
const SENTRY_TRACE_STATE_SAMPLE_RAND = 'sentry.sample_rand';
const SENTRY_TRACE_STATE_SAMPLE_RATE = 'sentry.sample_rate';
/**
 *  A flag marking a context as ignored because the span associated with the context
 *  is ignored (`ignoreSpans` filter).
 */ const SENTRY_TRACE_STATE_CHILD_IGNORED = 'sentry.ignored';
/**
 *  A flag marking a segment span as ignored because it matched the `ignoreSpans` filter.
 *  Unlike `SENTRY_TRACE_STATE_CHILD_IGNORED` (used for child spans), this flag is NOT consumed
 *  by the context manager for re-parenting. Instead, it propagates to child spans so they
 *  can record the correct client report outcome (`ignored` instead of `sample_rate`).
 */ const SENTRY_TRACE_STATE_SEGMENT_IGNORED = 'sentry.segment_ignored';
const SENTRY_SCOPES_CONTEXT_KEY = api.createContextKey('sentry_scopes');
const SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY = api.createContextKey('sentry_fork_isolation_scope');
const SENTRY_FORK_SET_SCOPE_CONTEXT_KEY = api.createContextKey('sentry_fork_set_scope');
const SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY = api.createContextKey('sentry_fork_set_isolation_scope');
const SCOPE_CONTEXT_FIELD = '_scopeContext';
/**
 * Try to get the current scopes from the given OTEL context.
 * This requires a Context Manager that was wrapped with getWrappedContextManager.
 */ function getScopesFromContext(context) {
    return context.getValue(SENTRY_SCOPES_CONTEXT_KEY);
}
/**
 * Set the current scopes on an OTEL context.
 * This will return a forked context with the Propagation Context set.
 */ function setScopesOnContext(context, scopes) {
    return context.setValue(SENTRY_SCOPES_CONTEXT_KEY, scopes);
}
/**
 * Set the context on the scope so we can later look it up.
 * We need this to get the context from the scope in the `trace` functions.
 *
 * We use WeakRef to avoid a circular reference between the scope and the context.
 * The context holds scopes (via SENTRY_SCOPES_CONTEXT_KEY), and if the scope held
 * a strong reference back to the context, neither could be garbage collected even
 * when the context is no longer reachable from application code (e.g., after a
 * request completes but pooled connections retain patched callbacks).
 */ function setContextOnScope(scope, context) {
    core.addNonEnumerableProperty(scope, SCOPE_CONTEXT_FIELD, core.makeWeakRef(context));
}
/**
 * Get the context related to a scope.
 * Returns undefined if the context has been garbage collected (when WeakRef is used).
 */ function getContextFromScope(scope) {
    return core.derefWeakRef(scope[SCOPE_CONTEXT_FIELD]);
}
/**
 *
 * @param otelSpan Checks whether a given OTEL Span is an http request to sentry.
 * @returns boolean
 */ function isSentryRequestSpan(span) {
    if (!spanHasAttributes(span)) {
        return false;
    }
    const { attributes } = span;
    // `ATTR_URL_FULL` is the new attribute, but we still support the old one, `ATTR_HTTP_URL`, for now.
    // eslint-disable-next-line deprecation/deprecation
    const httpUrl = attributes[semanticConventions.SEMATTRS_HTTP_URL] || attributes[semanticConventions.ATTR_URL_FULL];
    if (!httpUrl) {
        return false;
    }
    return core.isSentryRequestUrl(httpUrl.toString(), core.getClient());
}
/**
 * OpenTelemetry only knows about SAMPLED or NONE decision,
 * but for us it is important to differentiate between unset and unsampled.
 *
 * Both of these are identified as `traceFlags === TracegFlags.NONE`,
 * but we additionally look at a special trace state to differentiate between them.
 */ function getSamplingDecision(spanContext) {
    const { traceFlags, traceState } = spanContext;
    const sampledNotRecording = traceState ? traceState.get(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING) === '1' : false;
    // If trace flag is `SAMPLED`, we interpret this as sampled
    // If it is `NONE`, it could mean either it was sampled to be not recorder, or that it was not sampled at all
    // For us this is an important difference, sow e look at the SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING
    // to identify which it is
    if (traceFlags === api.TraceFlags.SAMPLED) {
        return true;
    }
    if (sampledNotRecording) {
        return false;
    }
    // Fall back to DSC as a last resort, that may also contain `sampled`...
    const dscString = traceState ? traceState.get(SENTRY_TRACE_STATE_DSC) : undefined;
    const dsc = dscString ? core.baggageHeaderToDynamicSamplingContext(dscString) : undefined;
    if (dsc?.sampled === 'true') {
        return true;
    }
    if (dsc?.sampled === 'false') {
        return false;
    }
    return undefined;
}
/**
 * Infer the op & description for a set of name, attributes and kind of a span.
 */ function inferSpanData(spanName, attributes, kind) {
    // if http.method exists, this is an http request span
    // eslint-disable-next-line deprecation/deprecation
    const httpMethod = attributes[semanticConventions.ATTR_HTTP_REQUEST_METHOD] || attributes[semanticConventions.SEMATTRS_HTTP_METHOD];
    if (httpMethod) {
        return descriptionForHttpMethod({
            attributes,
            name: spanName,
            kind
        }, httpMethod);
    }
    // eslint-disable-next-line deprecation/deprecation
    const dbSystem = attributes[semanticConventions.ATTR_DB_SYSTEM_NAME] || attributes[semanticConventions.SEMATTRS_DB_SYSTEM];
    const opIsCache = typeof attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_OP] === 'string' && attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_OP].startsWith('cache.');
    // If db.type exists then this is a database call span
    // If the Redis DB is used as a cache, the span description should not be changed
    if (dbSystem && !opIsCache) {
        return descriptionForDbSystem({
            attributes,
            name: spanName
        });
    }
    const customSourceOrRoute = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === 'custom' ? 'custom' : 'route';
    // If rpc.service exists then this is a rpc call span.
    // eslint-disable-next-line deprecation/deprecation
    const rpcService = attributes[semanticConventions.SEMATTRS_RPC_SERVICE];
    if (rpcService) {
        return {
            ...getUserUpdatedNameAndSource(spanName, attributes, 'route'),
            op: 'rpc'
        };
    }
    // If messaging.system exists then this is a messaging system span.
    // eslint-disable-next-line deprecation/deprecation
    const messagingSystem = attributes[semanticConventions.SEMATTRS_MESSAGING_SYSTEM];
    if (messagingSystem) {
        return {
            ...getUserUpdatedNameAndSource(spanName, attributes, customSourceOrRoute),
            op: 'message'
        };
    }
    // If faas.trigger exists then this is a function as a service span.
    // eslint-disable-next-line deprecation/deprecation
    const faasTrigger = attributes[semanticConventions.SEMATTRS_FAAS_TRIGGER];
    if (faasTrigger) {
        return {
            ...getUserUpdatedNameAndSource(spanName, attributes, customSourceOrRoute),
            op: faasTrigger.toString()
        };
    }
    return {
        op: undefined,
        description: spanName,
        source: 'custom'
    };
}
/**
 * Extract better op/description from an otel span.
 *
 * Does not overwrite the span name if the source is already set to custom to ensure
 * that user-updated span names are preserved. In this case, we only adjust the op but
 * leave span description and source unchanged.
 *
 * Based on https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/7422ce2a06337f68a59b552b8c5a2ac125d6bae5/exporter/sentryexporter/sentry_exporter.go#L306
 */ function parseSpanDescription(span) {
    const attributes = spanHasAttributes(span) ? span.attributes : {};
    const name = spanHasName(span) ? span.name : '<unknown>';
    const kind = getSpanKind(span);
    return inferSpanData(name, attributes, kind);
}
function descriptionForDbSystem({ attributes, name }) {
    // if we already have a custom name, we don't overwrite it but only set the op
    const userDefinedName = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    if (typeof userDefinedName === 'string') {
        return {
            op: 'db',
            description: userDefinedName,
            source: attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] || 'custom'
        };
    }
    // if we already have the source set to custom, we don't overwrite the span description but only set the op
    if (attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === 'custom') {
        return {
            op: 'db',
            description: name,
            source: 'custom'
        };
    }
    // Use DB statement (Ex "SELECT * FROM table") if possible as description.
    // eslint-disable-next-line deprecation/deprecation
    const statement = attributes[semanticConventions.SEMATTRS_DB_STATEMENT];
    const description = statement ? statement.toString() : name;
    return {
        op: 'db',
        description,
        source: 'task'
    };
}
/** Only exported for tests. */ function descriptionForHttpMethod({ name, kind, attributes }, httpMethod) {
    const opParts = [
        'http'
    ];
    switch(kind){
        case api.SpanKind.CLIENT:
            opParts.push('client');
            break;
        case api.SpanKind.SERVER:
            opParts.push('server');
            break;
    }
    // Spans for HTTP requests we have determined to be prefetch requests will have a `.prefetch` postfix in the op
    if (attributes['sentry.http.prefetch']) {
        opParts.push('prefetch');
    }
    const { urlPath, url, query, fragment, hasRoute } = getSanitizedUrl(attributes, kind);
    if (!urlPath) {
        return {
            ...getUserUpdatedNameAndSource(name, attributes),
            op: opParts.join('.')
        };
    }
    const graphqlOperationsAttribute = attributes[SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION];
    // Ex. GET /api/users
    const baseDescription = `${httpMethod} ${urlPath}`;
    // When the http span has a graphql operation, append it to the description
    // We add these in the graphqlIntegration
    const inferredDescription = graphqlOperationsAttribute ? `${baseDescription} (${getGraphqlOperationNamesFromAttribute(graphqlOperationsAttribute)})` : baseDescription;
    // If `httpPath` is a root path, then we can categorize the transaction source as route.
    const inferredSource = hasRoute || urlPath === '/' ? 'route' : 'url';
    const data = {};
    if (url) {
        data.url = url;
    }
    if (query) {
        data['http.query'] = query;
    }
    if (fragment) {
        data['http.fragment'] = fragment;
    }
    // If the span kind is neither client nor server, we use the original name
    // this infers that somebody manually started this span, in which case we don't want to overwrite the name
    const isClientOrServerKind = kind === api.SpanKind.CLIENT || kind === api.SpanKind.SERVER;
    // If the span is an auto-span (=it comes from one of our instrumentations),
    // we always want to infer the name
    // this is necessary because some of the auto-instrumentation we use uses kind=INTERNAL
    const origin = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN] || 'manual';
    const isManualSpan = !`${origin}`.startsWith('auto');
    // If users (or in very rare occasions we) set the source to custom, we don't overwrite the name
    const alreadyHasCustomSource = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] === 'custom';
    const customSpanName = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    const useInferredDescription = !alreadyHasCustomSource && customSpanName == null && (isClientOrServerKind || !isManualSpan);
    const { description, source } = useInferredDescription ? {
        description: inferredDescription,
        source: inferredSource
    } : getUserUpdatedNameAndSource(name, attributes);
    return {
        op: opParts.join('.'),
        description,
        source,
        data
    };
}
function getGraphqlOperationNamesFromAttribute(attr) {
    if (Array.isArray(attr)) {
        // oxlint-disable-next-line typescript/require-array-sort-compare
        const sorted = attr.slice().sort();
        // Up to 5 items, we just add all of them
        if (sorted.length <= 5) {
            return sorted.join(', ');
        } else {
            // Else, we add the first 5 and the diff of other operations
            return `${sorted.slice(0, 5).join(', ')}, +${sorted.length - 5}`;
        }
    }
    return `${attr}`;
}
/** Exported for tests only */ function getSanitizedUrl(attributes, kind) {
    // This is the relative path of the URL, e.g. /sub
    // eslint-disable-next-line deprecation/deprecation
    const httpTarget = attributes[semanticConventions.SEMATTRS_HTTP_TARGET];
    // This is the full URL, including host & query params etc., e.g. https://example.com/sub?foo=bar
    // eslint-disable-next-line deprecation/deprecation
    const httpUrl = attributes[semanticConventions.SEMATTRS_HTTP_URL] || attributes[semanticConventions.ATTR_URL_FULL];
    // This is the normalized route name - may not always be available!
    const httpRoute = attributes[semanticConventions.ATTR_HTTP_ROUTE];
    const parsedUrl = typeof httpUrl === 'string' ? core.parseUrl(httpUrl) : undefined;
    const url = parsedUrl ? core.getSanitizedUrlString(parsedUrl) : undefined;
    const query = parsedUrl?.search || undefined;
    const fragment = parsedUrl?.hash || undefined;
    if (typeof httpRoute === 'string') {
        return {
            urlPath: httpRoute,
            url,
            query,
            fragment,
            hasRoute: true
        };
    }
    if (kind === api.SpanKind.SERVER && typeof httpTarget === 'string') {
        return {
            urlPath: core.stripUrlQueryAndFragment(httpTarget),
            url,
            query,
            fragment,
            hasRoute: false
        };
    }
    if (parsedUrl) {
        return {
            urlPath: url,
            url,
            query,
            fragment,
            hasRoute: false
        };
    }
    // fall back to target even for client spans, if no URL is present
    if (typeof httpTarget === 'string') {
        return {
            urlPath: core.stripUrlQueryAndFragment(httpTarget),
            url,
            query,
            fragment,
            hasRoute: false
        };
    }
    return {
        urlPath: undefined,
        url,
        query,
        fragment,
        hasRoute: false
    };
}
/**
 * Because Otel instrumentation sometimes mutates span names via `span.updateName`, the only way
 * to ensure that a user-set span name is preserved is to store it as a tmp attribute on the span.
 * We delete this attribute once we're done with it when preparing the event envelope.
 *
 * This temp attribute always takes precedence over the original name.
 *
 * We also need to take care of setting the correct source. Users can always update the source
 * after updating the name, so we need to respect that.
 *
 * @internal exported only for testing
 */ function getUserUpdatedNameAndSource(originalName, attributes, fallbackSource = 'custom') {
    const source = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] || fallbackSource;
    const description = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    if (description && typeof description === 'string') {
        return {
            description,
            source
        };
    }
    return {
        description: originalName,
        source
    };
}
/**
 * Setup a DSC handler on the passed client,
 * ensuring that the transaction name is inferred from the span correctly.
 */ function enhanceDscWithOpenTelemetryRootSpanName(client) {
    client.on('createDsc', (dsc, rootSpan)=>{
        if (!rootSpan) {
            return;
        }
        // We want to overwrite the transaction on the DSC that is created by default in core
        // The reason for this is that we want to infer the span name, not use the initial one
        // Otherwise, we'll get names like "GET" instead of e.g. "GET /foo"
        // `parseSpanDescription` takes the attributes of the span into account for the name
        // This mutates the passed-in DSC
        const jsonSpan = core.spanToJSON(rootSpan);
        const attributes = jsonSpan.data;
        const source = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
        const { description } = spanHasName(rootSpan) ? parseSpanDescription(rootSpan) : {
            description: undefined
        };
        if (source !== 'url' && description) {
            dsc.transaction = description;
        }
        // Also ensure sampling decision is correctly inferred
        // In core, we use `spanIsSampled`, which just looks at the trace flags
        // but in OTEL, we use a slightly more complex logic to be able to differntiate between unsampled and deferred sampling
        if (core.hasSpansEnabled()) {
            const sampled = getSamplingDecision(rootSpan.spanContext());
            dsc.sampled = sampled == undefined ? undefined : String(sampled);
        }
    });
}
/**
 * Returns the currently active span.
 */ function getActiveSpan() {
    return api.trace.getActiveSpan();
}
/**
 * Generate a TraceState for the given data.
 */ function makeTraceState({ dsc, sampled }) {
    // We store the DSC as OTEL trace state on the span context
    const dscString = dsc ? core.dynamicSamplingContextToSentryBaggageHeader(dsc) : undefined;
    const traceStateBase = new core$1.TraceState();
    const traceStateWithDsc = dscString ? traceStateBase.set(SENTRY_TRACE_STATE_DSC, dscString) : traceStateBase;
    // We also specifically want to store if this is sampled to be not recording,
    // or unsampled (=could be either sampled or not)
    return sampled === false ? traceStateWithDsc.set(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING, '1') : traceStateWithDsc;
}
const setupElements = new Set();
/** Get all the OpenTelemetry elements that have been set up. */ function openTelemetrySetupCheck() {
    return Array.from(setupElements);
}
/** Mark an OpenTelemetry element as setup. */ function setIsSetup(element) {
    setupElements.add(element);
}
/**
 * Injects and extracts `sentry-trace` and `baggage` headers from carriers.
 */ class SentryPropagator extends core$1.W3CBaggagePropagator {
    /** A map of URLs that have already been checked for if they match tracePropagationTargets. */ constructor(){
        super();
        setIsSetup('SentryPropagator');
        // We're caching results so we don't have to recompute regexp every time we create a request.
        this._urlMatchesTargetsMap = new core.LRUMap(100);
    }
    /**
   * @inheritDoc
   */ inject(context, carrier, setter) {
        if (core$1.isTracingSuppressed(context)) {
            debugBuild.DEBUG_BUILD && core.debug.log('[Tracing] Not injecting trace data for url because tracing is suppressed.');
            return;
        }
        const activeSpan = api.trace.getSpan(context);
        const url = activeSpan && getCurrentURL(activeSpan);
        const { tracePropagationTargets, propagateTraceparent } = core.getClient()?.getOptions() || {};
        if (!core.shouldPropagateTraceForUrl(url, tracePropagationTargets, this._urlMatchesTargetsMap)) {
            debugBuild.DEBUG_BUILD && core.debug.log('[Tracing] Not injecting trace data for url because it does not match tracePropagationTargets:', url);
            return;
        }
        const existingBaggageHeader = getExistingBaggage(carrier);
        const existingSentryTraceHeader = getExistingSentryTrace(carrier);
        let baggage = api.propagation.getBaggage(context) || api.propagation.createBaggage({});
        const { dynamicSamplingContext, traceId, spanId, sampled } = getInjectionData(context);
        if (existingBaggageHeader) {
            const baggageEntries = core.parseBaggageHeader(existingBaggageHeader);
            if (baggageEntries) {
                Object.entries(baggageEntries).forEach(([key, value])=>{
                    if (!existingSentryTraceHeader && key.startsWith(core.SENTRY_BAGGAGE_KEY_PREFIX)) {
                        // Edge case: A baggage header with sentry- keys was added previously but no
                        // sentry-trace header. In this case we remove the old sentry-keys and add new
                        // ones below.
                        return;
                    }
                    baggage = baggage.setEntry(key, {
                        value
                    });
                });
            }
        }
        if (!existingSentryTraceHeader && dynamicSamplingContext) {
            baggage = Object.entries(dynamicSamplingContext).reduce((b, [dscKey, dscValue])=>{
                if (dscValue) {
                    return b.setEntry(`${core.SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`, {
                        value: dscValue
                    });
                }
                return b;
            }, baggage);
        }
        // We also want to avoid setting the default OTEL trace ID, if we get that for whatever reason
        if (!existingSentryTraceHeader && traceId && traceId !== api.INVALID_TRACEID) {
            setter.set(carrier, SENTRY_TRACE_HEADER, core.generateSentryTraceHeader(traceId, spanId, sampled));
            if (propagateTraceparent) {
                setter.set(carrier, 'traceparent', core.generateTraceparentHeader(traceId, spanId, sampled));
            }
        }
        super.inject(api.propagation.setBaggage(context, baggage), carrier, setter);
    }
    /**
   * @inheritDoc
   */ extract(context, carrier, getter) {
        const maybeSentryTraceHeader = getter.get(carrier, SENTRY_TRACE_HEADER);
        const baggage = getter.get(carrier, SENTRY_BAGGAGE_HEADER);
        const sentryTrace = maybeSentryTraceHeader ? Array.isArray(maybeSentryTraceHeader) ? maybeSentryTraceHeader[0] : maybeSentryTraceHeader : undefined;
        // Add remote parent span context
        // If there is no incoming trace, this will return the context as-is
        return ensureScopesOnContext(getContextWithRemoteActiveSpan(context, {
            sentryTrace,
            baggage
        }));
    }
    /**
   * @inheritDoc
   */ fields() {
        return [
            SENTRY_TRACE_HEADER,
            SENTRY_BAGGAGE_HEADER,
            'traceparent'
        ];
    }
}
/**
 * Get propagation injection data for the given context.
 * The additional options can be passed to override the scope and client that is otherwise derived from the context.
 */ function getInjectionData(context, options = {}) {
    const span = api.trace.getSpan(context);
    // If we have a remote span, the spanId should be considered as the parentSpanId, not spanId itself
    // Instead, we use a virtual (generated) spanId for propagation
    if (span?.spanContext().isRemote) {
        const spanContext = span.spanContext();
        const dynamicSamplingContext = core.getDynamicSamplingContextFromSpan(span);
        return {
            dynamicSamplingContext,
            traceId: spanContext.traceId,
            spanId: undefined,
            sampled: getSamplingDecision(spanContext)
        };
    }
    // If we have a local span, we just use this
    if (span) {
        const spanContext = span.spanContext();
        const dynamicSamplingContext = core.getDynamicSamplingContextFromSpan(span);
        return {
            dynamicSamplingContext,
            traceId: spanContext.traceId,
            spanId: spanContext.spanId,
            sampled: getSamplingDecision(spanContext)
        };
    }
    // Else we try to use the propagation context from the scope
    // The only scenario where this should happen is when we neither have a span, nor an incoming trace
    const scope = options.scope || getScopesFromContext(context)?.scope || core.getCurrentScope();
    const client = options.client || core.getClient();
    const propagationContext = scope.getPropagationContext();
    const dynamicSamplingContext = client ? core.getDynamicSamplingContextFromScope(client, scope) : undefined;
    return {
        dynamicSamplingContext,
        traceId: propagationContext.traceId,
        spanId: propagationContext.propagationSpanId,
        sampled: propagationContext.sampled
    };
}
function getContextWithRemoteActiveSpan(ctx, { sentryTrace, baggage }) {
    const propagationContext = core.propagationContextFromHeaders(sentryTrace, baggage);
    const { traceId, parentSpanId, sampled, dsc } = propagationContext;
    const client = core.getClient();
    const incomingDsc = core.baggageHeaderToDynamicSamplingContext(baggage);
    // We only want to set the virtual span if we are continuing a concrete trace
    // Otherwise, we ignore the incoming trace here, e.g. if we have no trace headers
    if (!parentSpanId || client && !core.shouldContinueTrace(client, incomingDsc?.org_id)) {
        return ctx;
    }
    const spanContext = generateRemoteSpanContext({
        traceId,
        spanId: parentSpanId,
        sampled,
        dsc
    });
    return api.trace.setSpanContext(ctx, spanContext);
}
/**
 * Takes trace strings and propagates them as a remote active span.
 * This should be used in addition to `continueTrace` in OTEL-powered environments.
 */ function continueTraceAsRemoteSpan(ctx, options, callback) {
    const ctxWithSpanContext = ensureScopesOnContext(getContextWithRemoteActiveSpan(ctx, options));
    return api.context.with(ctxWithSpanContext, callback);
}
function ensureScopesOnContext(ctx) {
    // If there are no scopes yet on the context, ensure we have them
    const scopes = getScopesFromContext(ctx);
    const newScopes = {
        // If we have no scope here, this is most likely either the root context or a context manually derived from it
        // In this case, we want to fork the current scope, to ensure we do not pollute the root scope
        scope: scopes ? scopes.scope : core.getCurrentScope().clone(),
        isolationScope: scopes ? scopes.isolationScope : core.getIsolationScope()
    };
    return setScopesOnContext(ctx, newScopes);
}
/** Try to get the existing baggage header so we can merge this in. */ function getExistingBaggage(carrier) {
    try {
        const baggage = carrier[SENTRY_BAGGAGE_HEADER];
        return Array.isArray(baggage) ? baggage.join(',') : baggage;
    } catch  {
        return undefined;
    }
}
function getExistingSentryTrace(carrier) {
    try {
        return carrier[SENTRY_TRACE_HEADER];
    } catch  {
        return undefined;
    }
}
/**
 * It is pretty tricky to get access to the outgoing request URL of a request in the propagator.
 * As we only have access to the context of the span to be sent and the carrier (=headers),
 * but the span may be unsampled and thus have no attributes.
 *
 * So we use the following logic:
 * 1. If we have an active span, we check if it has a URL attribute.
 * 2. Else, if the active span has no URL attribute (e.g. it is unsampled), we check a special trace state (which we set in our sampler).
 */ function getCurrentURL(span) {
    const spanData = core.spanToJSON(span).data;
    // `ATTR_URL_FULL` is the new attribute, but we still support the old one, `SEMATTRS_HTTP_URL`, for now.
    // eslint-disable-next-line deprecation/deprecation
    const urlAttribute = spanData[semanticConventions.SEMATTRS_HTTP_URL] || spanData[semanticConventions.ATTR_URL_FULL];
    if (typeof urlAttribute === 'string') {
        return urlAttribute;
    }
    // Also look at the traceState, which we may set in the sampler even for unsampled spans
    const urlTraceState = span.spanContext().traceState?.get(SENTRY_TRACE_STATE_URL);
    if (urlTraceState) {
        return urlTraceState;
    }
    return undefined;
}
function generateRemoteSpanContext({ spanId, traceId, sampled, dsc }) {
    // We store the DSC as OTEL trace state on the span context
    const traceState = makeTraceState({
        dsc,
        sampled
    });
    const spanContext = {
        traceId,
        spanId,
        isRemote: true,
        traceFlags: sampled ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE,
        traceState
    };
    return spanContext;
}
/**
 * Internal helper for starting spans and manual spans. See {@link startSpan} and {@link startSpanManual} for the public APIs.
 * @param options - The span context options
 * @param callback - The callback to execute with the span
 * @param autoEnd - Whether to automatically end the span after the callback completes
 */ function _startSpan(options, callback, autoEnd) {
    const tracer = getTracer();
    const { name, parentSpan: customParentSpan } = options;
    // If `options.parentSpan` is defined, we want to wrap the callback in `withActiveSpan`
    const wrapper = getActiveSpanWrapper(customParentSpan);
    return wrapper(()=>{
        const activeCtx = getContext(options.scope, options.forceTransaction);
        const missingRequiredParent = options.onlyIfParent && !api.trace.getSpan(activeCtx);
        const ctx = missingRequiredParent ? core$1.suppressTracing(activeCtx) : activeCtx;
        if (missingRequiredParent) {
            core.getClient()?.recordDroppedEvent('no_parent_span', 'span');
        }
        const spanOptions = getSpanOptions(options);
        // If spans are not enabled, ensure we suppress tracing for the span creation
        // but preserve the original context for the callback execution
        // This ensures that we don't create spans when tracing is disabled which
        // would otherwise be a problem for users that don't enable tracing but use
        // custom OpenTelemetry setups.
        if (!core.hasSpansEnabled()) {
            const suppressedCtx = core$1.isTracingSuppressed(ctx) ? ctx : core$1.suppressTracing(ctx);
            return api.context.with(suppressedCtx, ()=>{
                return tracer.startActiveSpan(name, spanOptions, suppressedCtx, (span)=>{
                    patchSpanEnd(span);
                    // Restore the original unsuppressed context for the callback execution
                    // so that custom OpenTelemetry spans maintain the correct context.
                    // We use activeCtx (not ctx) because ctx may be suppressed when onlyIfParent is true
                    // and no parent span exists. Using activeCtx ensures custom OTel spans are never
                    // inadvertently suppressed.
                    return api.context.with(activeCtx, ()=>{
                        return core.handleCallbackErrors(()=>callback(span), ()=>{
                            // Only set the span status to ERROR when there wasn't any status set before, in order to avoid stomping useful span statuses
                            if (core.spanToJSON(span).status === undefined) {
                                span.setStatus({
                                    code: api.SpanStatusCode.ERROR
                                });
                            }
                        }, autoEnd ? ()=>span.end() : undefined);
                    });
                });
            });
        }
        return tracer.startActiveSpan(name, spanOptions, ctx, (span)=>{
            patchSpanEnd(span);
            return core.handleCallbackErrors(()=>callback(span), ()=>{
                // Only set the span status to ERROR when there wasn't any status set before, in order to avoid stomping useful span statuses
                if (core.spanToJSON(span).status === undefined) {
                    span.setStatus({
                        code: api.SpanStatusCode.ERROR
                    });
                }
            }, autoEnd ? ()=>span.end() : undefined);
        });
    });
}
/**
 * Wraps a function with a transaction/span and finishes the span after the function is done.
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * If you want to create a span that is not set as active, use {@link startInactiveSpan}.
 *
 * You'll always get a span passed to the callback,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */ function startSpan(options, callback) {
    return _startSpan(options, callback, true);
}
/**
 * Similar to `Sentry.startSpan`. Wraps a function with a span, but does not finish the span
 * after the function is done automatically. You'll have to call `span.end()` or the `finish` function passed to the callback manually.
 *
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * You'll always get a span passed to the callback,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */ function startSpanManual(options, callback) {
    return _startSpan(options, (span)=>callback(span, ()=>span.end()), false);
}
/**
 * Creates a span. This span is not set as active, so will not get automatic instrumentation spans
 * as children or be able to be accessed via `Sentry.getActiveSpan()`.
 *
 * If you want to create a span that is set as active, use {@link startSpan}.
 *
 * This function will always return a span,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */ function startInactiveSpan(options) {
    const tracer = getTracer();
    const { name, parentSpan: customParentSpan } = options;
    // If `options.parentSpan` is defined, we want to wrap the callback in `withActiveSpan`
    const wrapper = getActiveSpanWrapper(customParentSpan);
    return wrapper(()=>{
        const activeCtx = getContext(options.scope, options.forceTransaction);
        const missingRequiredParent = options.onlyIfParent && !api.trace.getSpan(activeCtx);
        let ctx = missingRequiredParent ? core$1.suppressTracing(activeCtx) : activeCtx;
        if (missingRequiredParent) {
            core.getClient()?.recordDroppedEvent('no_parent_span', 'span');
        }
        const spanOptions = getSpanOptions(options);
        if (!core.hasSpansEnabled()) {
            ctx = core$1.isTracingSuppressed(ctx) ? ctx : core$1.suppressTracing(ctx);
        }
        const span = tracer.startSpan(name, spanOptions, ctx);
        patchSpanEnd(span);
        return span;
    });
}
/**
 * Forks the current scope and sets the provided span as active span in the context of the provided callback. Can be
 * passed `null` to start an entirely new span tree.
 *
 * @param span Spans started in the context of the provided callback will be children of this span. If `null` is passed,
 * spans started within the callback will be root spans.
 * @param callback Execution context in which the provided span will be active. Is passed the newly forked scope.
 * @returns the value returned from the provided callback function.
 */ function withActiveSpan(span, callback) {
    const newContextWithActiveSpan = span ? api.trace.setSpan(api.context.active(), span) : api.trace.deleteSpan(api.context.active());
    return api.context.with(newContextWithActiveSpan, ()=>callback(core.getCurrentScope()));
}
function getTracer() {
    const client = core.getClient();
    return client?.tracer || api.trace.getTracer('@sentry/opentelemetry', core.SDK_VERSION);
}
function getSpanOptions(options) {
    const { startTime, attributes, kind, op, links } = options;
    // OTEL expects timestamps in ms, not seconds
    const fixedStartTime = typeof startTime === 'number' ? ensureTimestampInMilliseconds(startTime) : startTime;
    return {
        attributes: op ? {
            [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
            ...attributes
        } : attributes,
        kind,
        links,
        startTime: fixedStartTime
    };
}
function ensureTimestampInMilliseconds(timestamp) {
    const isMs = timestamp < 9999999999;
    return isMs ? timestamp * 1000 : timestamp;
}
/**
 * Wraps the span's `end()` method so that numeric timestamps passed in seconds
 * are converted to milliseconds before reaching OTel's native `Span.end()`.
 */ function patchSpanEnd(span) {
    const originalEnd = span.end.bind(span);
    span.end = (endTime)=>{
        return originalEnd(typeof endTime === 'number' ? ensureTimestampInMilliseconds(endTime) : endTime);
    };
}
function getContext(scope, forceTransaction) {
    const ctx = getContextForScope(scope);
    const parentSpan = api.trace.getSpan(ctx);
    // In the case that we have no parent span, we start a new trace
    // Note that if we continue a trace, we'll always have a remote parent span here anyhow
    if (!parentSpan) {
        return ctx;
    }
    // If we don't want to force a transaction, and we have a parent span, all good, we just return as-is!
    if (!forceTransaction) {
        return ctx;
    }
    // Else, if we do have a parent span but want to force a transaction, we have to simulate a "root" context
    // Else, we need to do two things:
    // 1. Unset the parent span from the context, so we'll create a new root span
    // 2. Ensure the propagation context is correct, so we'll continue from the parent span
    const ctxWithoutSpan = api.trace.deleteSpan(ctx);
    const { spanId, traceId } = parentSpan.spanContext();
    const sampled = getSamplingDecision(parentSpan.spanContext());
    // In this case, when we are forcing a transaction, we want to treat this like continuing an incoming trace
    // so we set the traceState according to the root span
    const rootSpan = core.getRootSpan(parentSpan);
    const dsc = core.getDynamicSamplingContextFromSpan(rootSpan);
    const traceState = makeTraceState({
        dsc,
        sampled
    });
    const spanOptions = {
        traceId,
        spanId,
        isRemote: true,
        traceFlags: sampled ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE,
        traceState
    };
    const ctxWithSpanContext = api.trace.setSpanContext(ctxWithoutSpan, spanOptions);
    return ctxWithSpanContext;
}
function getContextForScope(scope) {
    if (scope) {
        const ctx = getContextFromScope(scope);
        if (ctx) {
            return ctx;
        }
    }
    return api.context.active();
}
/**
 * Continue a trace from `sentry-trace` and `baggage` values.
 * These values can be obtained from incoming request headers, or in the browser from `<meta name="sentry-trace">`
 * and `<meta name="baggage">` HTML tags.
 *
 * Spans started with `startSpan`, `startSpanManual` and `startInactiveSpan`, within the callback will automatically
 * be attached to the incoming trace.
 *
 * This is a custom version of `continueTrace` that is used in OTEL-powered environments.
 * It propagates the trace as a remote span, in addition to setting it on the propagation context.
 */ function continueTrace(options, callback) {
    return continueTraceAsRemoteSpan(api.context.active(), options, callback);
}
/**
 * Start a new trace with a unique traceId, ensuring all spans created within the callback
 * share the same traceId.
 *
 * This is a custom version of `startNewTrace` for OTEL-powered environments.
 * It injects the new traceId as a remote span context into the OTEL context, so that
 * `startInactiveSpan` and `startSpan` pick it up correctly.
 */ function startNewTrace(callback) {
    const traceId = core.generateTraceId();
    const spanId = core.generateSpanId();
    const spanContext = {
        traceId,
        spanId,
        isRemote: true,
        traceFlags: api.TraceFlags.NONE
    };
    const ctxWithTrace = api.trace.setSpanContext(api.context.active(), spanContext);
    return api.context.with(ctxWithTrace, ()=>{
        core.getCurrentScope().setPropagationContext({
            traceId,
            sampleRand: core._INTERNAL_safeMathRandom()
        });
        return callback();
    });
}
/**
 * Get the trace context for a given scope.
 * We have a custom implementation here because we need an OTEL-specific way to get the span from a scope.
 */ function getTraceContextForScope(client, scope) {
    const ctx = getContextFromScope(scope);
    const span = ctx && api.trace.getSpan(ctx);
    const traceContext = span ? core.spanToTraceContext(span) : core.getTraceContextFromScope(scope);
    const dynamicSamplingContext = span ? core.getDynamicSamplingContextFromSpan(span) : core.getDynamicSamplingContextFromScope(client, scope);
    return [
        dynamicSamplingContext,
        traceContext
    ];
}
function getActiveSpanWrapper(parentSpan) {
    return parentSpan !== undefined ? (callback)=>{
        return withActiveSpan(parentSpan, callback);
    } : (callback)=>callback();
}
/** Suppress tracing in the given callback, ensuring no spans are generated inside of it. */ function suppressTracing(callback) {
    const ctx = core$1.suppressTracing(api.context.active());
    return api.context.with(ctx, callback);
}
/** Ensure the `trace` context is set on all events. */ function setupEventContextTrace(client) {
    client.on('preprocessEvent', (event)=>{
        const span = getActiveSpan();
        // For transaction events, this is handled separately
        // Because the active span may not be the span that is actually the transaction event
        if (!span || event.type === 'transaction') {
            return;
        }
        // If event has already set `trace` context, use that one.
        event.contexts = {
            trace: core.spanToTraceContext(span),
            ...event.contexts
        };
        const rootSpan = core.getRootSpan(span);
        event.sdkProcessingMetadata = {
            dynamicSamplingContext: core.getDynamicSamplingContextFromSpan(rootSpan),
            ...event.sdkProcessingMetadata
        };
        return event;
    });
}
/**
 * Otel-specific implementation of `getTraceData`.
 * @see `@sentry/core` version of `getTraceData` for more information
 */ function getTraceData({ span, scope, client, propagateTraceparent } = {}) {
    let ctx = (scope && getContextFromScope(scope)) ?? api.context.active();
    if (span) {
        const { scope } = core.getCapturedScopesOnSpan(span);
        // fall back to current context if for whatever reason we can't find the one of the span
        ctx = scope && getContextFromScope(scope) || api.trace.setSpan(api.context.active(), span);
    }
    const { traceId, spanId, sampled, dynamicSamplingContext } = getInjectionData(ctx, {
        scope,
        client
    });
    const traceData = {
        'sentry-trace': core.generateSentryTraceHeader(traceId, spanId, sampled),
        baggage: core.dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext)
    };
    if (propagateTraceparent) {
        traceData.traceparent = core.generateTraceparentHeader(traceId, spanId, sampled);
    }
    return traceData;
}
/**
 * Sets the async context strategy to use follow the OTEL context under the hood.
 * We handle forking a hub inside of our custom OTEL Context Manager (./otelContextManager.ts)
 */ function setOpenTelemetryContextAsyncContextStrategy() {
    function getScopes() {
        const ctx = api.context.active();
        const scopes = getScopesFromContext(ctx);
        if (scopes) {
            return scopes;
        }
        // fallback behavior:
        // if, for whatever reason, we can't find scopes on the context here, we have to fix this somehow
        return {
            scope: core.getDefaultCurrentScope(),
            isolationScope: core.getDefaultIsolationScope()
        };
    }
    function withScope(callback) {
        const ctx = api.context.active();
        // We depend on the otelContextManager to handle the context/hub
        // We set the `SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY` context value, which is picked up by
        // the OTEL context manager, which uses the presence of this key to determine if it should
        // fork the isolation scope, or not
        // as by default, we don't want to fork this, unless triggered explicitly by `withScope`
        return api.context.with(ctx, ()=>{
            return callback(getCurrentScope());
        });
    }
    function withSetScope(scope, callback) {
        const ctx = getContextFromScope(scope) || api.context.active();
        // We depend on the otelContextManager to handle the context/hub
        // We set the `SENTRY_FORK_SET_SCOPE_CONTEXT_KEY` context value, which is picked up by
        // the OTEL context manager, which picks up this scope as the current scope
        return api.context.with(ctx.setValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY, scope), ()=>{
            return callback(scope);
        });
    }
    function withIsolationScope(callback) {
        const ctx = api.context.active();
        // We depend on the otelContextManager to handle the context/hub
        // We set the `SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY` context value, which is picked up by
        // the OTEL context manager, which uses the presence of this key to determine if it should
        // fork the isolation scope, or not
        return api.context.with(ctx.setValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY, true), ()=>{
            return callback(getIsolationScope());
        });
    }
    function withSetIsolationScope(isolationScope, callback) {
        const ctx = api.context.active();
        // We depend on the otelContextManager to handle the context/hub
        // We set the `SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY` context value, which is picked up by
        // the OTEL context manager, which uses the presence of this key to determine if it should
        // fork the isolation scope, or not
        return api.context.with(ctx.setValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY, isolationScope), ()=>{
            return callback(getIsolationScope());
        });
    }
    function getCurrentScope() {
        return getScopes().scope;
    }
    function getIsolationScope() {
        return getScopes().isolationScope;
    }
    core.setAsyncContextStrategy({
        withScope,
        withSetScope,
        withSetIsolationScope,
        withIsolationScope,
        getCurrentScope,
        getIsolationScope,
        startSpan,
        startSpanManual,
        startInactiveSpan,
        getActiveSpan,
        suppressTracing,
        getTraceData,
        continueTrace,
        startNewTrace,
        // The types here don't fully align, because our own `Span` type is narrower
        // than the OTEL one - but this is OK for here, as we now we'll only have OTEL spans passed around
        withActiveSpan: withActiveSpan
    });
}
/**
 * Merge Sentry scopes into an OpenTelemetry {@link Context} and apply trace-context adjustments
 * used by Sentry OpenTelemetry context manager(s).
 *
 * @param context - Context passed into `ContextManager.with`.
 * @param activeContext - Context that was active before entering `with` (e.g. `this.active()`), used
 *   to restore the parent span when the incoming span is marked ignored for children.
 * @returns A new context ready for `super.with` / `AsyncLocalStorage.run`.
 */ function buildContextWithSentryScopes(context, activeContext) {
    const span = api.trace.getSpan(context);
    let effectiveContext;
    if (span?.spanContext().traceState?.get(SENTRY_TRACE_STATE_CHILD_IGNORED) === '1') {
        const contextWithoutSpan = api.trace.deleteSpan(context);
        const parentSpan = api.trace.getSpan(activeContext);
        effectiveContext = parentSpan ? api.trace.setSpan(contextWithoutSpan, parentSpan) : contextWithoutSpan;
    } else {
        effectiveContext = context;
    }
    const currentScopes = getScopesFromContext(effectiveContext);
    const currentScope = currentScopes?.scope || core.getCurrentScope();
    const currentIsolationScope = currentScopes?.isolationScope || core.getIsolationScope();
    const shouldForkIsolationScope = effectiveContext.getValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY) === true;
    const scope = effectiveContext.getValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY);
    const isolationScope = effectiveContext.getValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY);
    const newCurrentScope = scope || currentScope.clone();
    const newIsolationScope = isolationScope || (shouldForkIsolationScope ? currentIsolationScope.clone() : currentIsolationScope);
    const scopes = {
        scope: newCurrentScope,
        isolationScope: newIsolationScope
    };
    const ctx1 = setScopesOnContext(effectiveContext, scopes);
    const ctx2 = ctx1.deleteValue(SENTRY_FORK_ISOLATION_SCOPE_CONTEXT_KEY).deleteValue(SENTRY_FORK_SET_SCOPE_CONTEXT_KEY).deleteValue(SENTRY_FORK_SET_ISOLATION_SCOPE_CONTEXT_KEY);
    setContextOnScope(newCurrentScope, ctx2);
    return ctx2;
}
/**
 * Wrap an OpenTelemetry ContextManager in a way that ensures the context is kept in sync with the Sentry Scope.
 *
 * Usage:
 * import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
 * const SentryContextManager = wrapContextManagerClass(AsyncLocalStorageContextManager);
 * const contextManager = new SentryContextManager();
 *
 * @deprecated Use {@link SentryAsyncLocalStorageContextManager} instead.
 */ function wrapContextManagerClass(ContextManagerClass) {
    /**
   * This is a custom ContextManager for OpenTelemetry, which extends the default AsyncLocalStorageContextManager.
   * It ensures that we create new scopes per context, so that the OTEL Context & the Sentry Scope are always in sync.
   *
   * Note that we currently only support AsyncHooks with this,
   * but since this should work for Node 14+ anyhow that should be good enough.
   */ // @ts-expect-error TS does not like this, but we know this is fine
    class SentryContextManager extends ContextManagerClass {
        constructor(...args){
            super(...args);
            setIsSetup('SentryContextManager');
        }
        /**
     * Overwrite with() of the original AsyncLocalStorageContextManager
     * to ensure we also create new scopes per context.
     */ with(context, fn, thisArg, ...args) {
            const ctx2 = buildContextWithSentryScopes(context, this.active());
            return super.with(ctx2, fn, thisArg, ...args);
        }
        /**
     * Gets underlying AsyncLocalStorage and symbol to allow lookup of scope.
     */ getAsyncLocalStorageLookup() {
            return {
                // @ts-expect-error This is on the base class, but not part of the interface
                asyncLocalStorage: this._asyncLocalStorage,
                contextSymbol: SENTRY_SCOPES_CONTEXT_KEY
            };
        }
    }
    return SentryContextManager;
}
/**
 * This function runs through a list of OTEL Spans, and wraps them in an `SpanNode`
 * where each node holds a reference to their parent node.
 */ function groupSpansWithParents(spans) {
    const nodeMap = new Map();
    for (const span of spans){
        createOrUpdateSpanNodeAndRefs(nodeMap, span);
    }
    return Array.from(nodeMap, function([_id, spanNode]) {
        return spanNode;
    });
}
/**
 * This returns the _local_ parent ID - `parentId` on the span may point to a remote span.
 */ function getLocalParentId(span) {
    const parentIsRemote = span.attributes[SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE] === true;
    // If the parentId is the trace parent ID, we pretend it's undefined
    // As this means the parent exists somewhere else
    return !parentIsRemote ? getParentSpanId(span) : undefined;
}
function createOrUpdateSpanNodeAndRefs(nodeMap, span) {
    const id = span.spanContext().spanId;
    const parentId = getLocalParentId(span);
    if (!parentId) {
        createOrUpdateNode(nodeMap, {
            id,
            span,
            children: []
        });
        return;
    }
    // Else make sure to create parent node as well
    // Note that the parent may not know it's parent _yet_, this may be updated in a later pass
    const parentNode = createOrGetParentNode(nodeMap, parentId);
    const node = createOrUpdateNode(nodeMap, {
        id,
        span,
        parentNode,
        children: []
    });
    parentNode.children.push(node);
}
function createOrGetParentNode(nodeMap, id) {
    const existing = nodeMap.get(id);
    if (existing) {
        return existing;
    }
    return createOrUpdateNode(nodeMap, {
        id,
        children: []
    });
}
function createOrUpdateNode(nodeMap, spanNode) {
    const existing = nodeMap.get(spanNode.id);
    // If span is already set, nothing to do here
    if (existing?.span) {
        return existing;
    }
    // If it exists but span is not set yet, we update it
    if (existing && !existing.span) {
        existing.span = spanNode.span;
        existing.parentNode = spanNode.parentNode;
        return existing;
    }
    // Else, we create a new one...
    nodeMap.set(spanNode.id, spanNode);
    return spanNode;
}
// canonicalCodesGrpcMap maps some GRPC codes to Sentry's span statuses. See description in grpc documentation.
const canonicalGrpcErrorCodesMap = {
    '1': 'cancelled',
    '2': 'unknown_error',
    '3': 'invalid_argument',
    '4': 'deadline_exceeded',
    '5': 'not_found',
    '6': 'already_exists',
    '7': 'permission_denied',
    '8': 'resource_exhausted',
    '9': 'failed_precondition',
    '10': 'aborted',
    '11': 'out_of_range',
    '12': 'unimplemented',
    '13': 'internal_error',
    '14': 'unavailable',
    '15': 'data_loss',
    '16': 'unauthenticated'
};
const isStatusErrorMessageValid = (message)=>{
    return Object.values(canonicalGrpcErrorCodesMap).includes(message);
};
/**
 * Get a Sentry span status from an otel span.
 */ function mapStatus(span) {
    const attributes = spanHasAttributes(span) ? span.attributes : {};
    const status = spanHasStatus(span) ? span.status : undefined;
    if (status) {
        // Since span status OK is not set by default, we give it priority: https://opentelemetry.io/docs/concepts/signals/traces/#span-status
        if (status.code === api.SpanStatusCode.OK) {
            return {
                code: core.SPAN_STATUS_OK
            };
        // If the span is already marked as erroneous we return that exact status
        } else if (status.code === api.SpanStatusCode.ERROR) {
            if (typeof status.message === 'undefined') {
                const inferredStatus = inferStatusFromAttributes(attributes);
                if (inferredStatus) {
                    return inferredStatus;
                }
            }
            if (status.message && isStatusErrorMessageValid(status.message)) {
                return {
                    code: core.SPAN_STATUS_ERROR,
                    message: status.message
                };
            } else {
                return {
                    code: core.SPAN_STATUS_ERROR,
                    message: 'internal_error'
                };
            }
        }
    }
    // If the span status is UNSET, we try to infer it from HTTP or GRPC status codes.
    const inferredStatus = inferStatusFromAttributes(attributes);
    if (inferredStatus) {
        return inferredStatus;
    }
    // We default to setting the spans status to ok.
    if (status?.code === api.SpanStatusCode.UNSET) {
        return {
            code: core.SPAN_STATUS_OK
        };
    } else {
        return {
            code: core.SPAN_STATUS_ERROR,
            message: 'unknown_error'
        };
    }
}
function inferStatusFromAttributes(attributes) {
    // If the span status is UNSET, we try to infer it from HTTP or GRPC status codes.
    // eslint-disable-next-line deprecation/deprecation
    const httpCodeAttribute = attributes[semanticConventions.ATTR_HTTP_RESPONSE_STATUS_CODE] || attributes[semanticConventions.SEMATTRS_HTTP_STATUS_CODE];
    // eslint-disable-next-line deprecation/deprecation
    const grpcCodeAttribute = attributes[semanticConventions.SEMATTRS_RPC_GRPC_STATUS_CODE];
    const numberHttpCode = typeof httpCodeAttribute === 'number' ? httpCodeAttribute : typeof httpCodeAttribute === 'string' ? parseInt(httpCodeAttribute) : undefined;
    if (typeof numberHttpCode === 'number') {
        return core.getSpanStatusFromHttpCode(numberHttpCode);
    }
    if (typeof grpcCodeAttribute === 'string') {
        return {
            code: core.SPAN_STATUS_ERROR,
            message: canonicalGrpcErrorCodesMap[grpcCodeAttribute] || 'unknown_error'
        };
    }
    return undefined;
}
const MAX_SPAN_COUNT = 1000;
const DEFAULT_TIMEOUT = 300; // 5 min
/**
 * A Sentry-specific exporter that converts OpenTelemetry Spans to Sentry Spans & Transactions.
 */ class SentrySpanExporter {
    /*
   * A quick explanation on the buckets: We do bucketing of finished spans for efficiency. This span exporter is
   * accumulating spans until a root span is encountered and then it flushes all the spans that are descendants of that
   * root span. Because it is totally in the realm of possibilities that root spans are never finished, and we don't
   * want to accumulate spans indefinitely in memory, we need to periodically evacuate spans. Naively we could simply
   * store the spans in an array and each time a new span comes in we could iterate through the entire array and
   * evacuate all spans that have an end-timestamp that is older than our limit. This could get quite expensive because
   * we would have to iterate a potentially large number of spans every time we evacuate. We want to avoid these large
   * bursts of computation.
   *
   * Instead we go for a bucketing approach and put spans into buckets, based on what second
   * (modulo the time limit) the span was put into the exporter. With buckets, when we decide to evacuate, we can
   * iterate through the bucket entries instead, which have an upper bound of items, making the evacuation much more
   * efficient. Cleaning up also becomes much more efficient since it simply involves de-referencing a bucket within the
   * bucket array, and letting garbage collection take care of the rest.
   */ // Essentially a a set of span ids that are already sent. The values are expiration
    // times in this cache so we don't hold onto them indefinitely.
    /* Internally, we use a debounced flush to give some wiggle room to the span processor to accumulate more spans. */ constructor(options){
        this._finishedSpanBucketSize = options?.timeout || DEFAULT_TIMEOUT;
        this._finishedSpanBuckets = new Array(this._finishedSpanBucketSize).fill(undefined);
        this._lastCleanupTimestampInS = Math.floor(core._INTERNAL_safeDateNow() / 1000);
        this._spansToBucketEntry = new WeakMap();
        this._sentSpans = new Map();
        this._debouncedFlush = core.debounce(this.flush.bind(this), 1, {
            maxWait: 100
        });
    }
    /**
   * Export a single span.
   * This is called by the span processor whenever a span is ended.
   */ export(span) {
        const currentTimestampInS = Math.floor(core._INTERNAL_safeDateNow() / 1000);
        if (this._lastCleanupTimestampInS !== currentTimestampInS) {
            let droppedSpanCount = 0;
            this._finishedSpanBuckets.forEach((bucket, i)=>{
                if (bucket && bucket.timestampInS <= currentTimestampInS - this._finishedSpanBucketSize) {
                    droppedSpanCount += bucket.spans.size;
                    this._finishedSpanBuckets[i] = undefined;
                }
            });
            if (droppedSpanCount > 0) {
                debugBuild.DEBUG_BUILD && core.debug.log(`SpanExporter dropped ${droppedSpanCount} spans because they were pending for more than ${this._finishedSpanBucketSize} seconds.`);
            }
            this._lastCleanupTimestampInS = currentTimestampInS;
        }
        const currentBucketIndex = currentTimestampInS % this._finishedSpanBucketSize;
        const currentBucket = this._finishedSpanBuckets[currentBucketIndex] || {
            timestampInS: currentTimestampInS,
            spans: new Set()
        };
        this._finishedSpanBuckets[currentBucketIndex] = currentBucket;
        currentBucket.spans.add(span);
        this._spansToBucketEntry.set(span, currentBucket);
        // If the span doesn't have a local parent ID (it's a root span), we're gonna flush all the ended spans
        const localParentId = getLocalParentId(span);
        if (!localParentId || this._sentSpans.has(localParentId)) {
            this._debouncedFlush();
        }
    }
    /**
   * Try to flush any pending spans immediately.
   * This is called internally by the exporter (via _debouncedFlush),
   * but can also be triggered externally if we force-flush.
   */ flush() {
        const finishedSpans = this._finishedSpanBuckets.flatMap((bucket)=>bucket ? Array.from(bucket.spans) : []);
        this._flushSentSpanCache();
        const sentSpans = this._maybeSend(finishedSpans);
        const sentSpanCount = sentSpans.size;
        const remainingOpenSpanCount = finishedSpans.length - sentSpanCount;
        debugBuild.DEBUG_BUILD && core.debug.log(`SpanExporter exported ${sentSpanCount} spans, ${remainingOpenSpanCount} spans are waiting for their parent spans to finish`);
        const expirationDate = core._INTERNAL_safeDateNow() + DEFAULT_TIMEOUT * 1000;
        for (const span of sentSpans){
            this._sentSpans.set(span.spanContext().spanId, expirationDate);
            const bucketEntry = this._spansToBucketEntry.get(span);
            if (bucketEntry) {
                bucketEntry.spans.delete(span);
            }
        }
        // Cancel a pending debounced flush, if there is one
        // This can be relevant if we directly flush, circumventing the debounce
        // in that case, we want to cancel any pending debounced flush
        this._debouncedFlush.cancel();
    }
    /**
   * Clear the exporter.
   * This is called when the span processor is shut down.
   */ clear() {
        this._finishedSpanBuckets = this._finishedSpanBuckets.fill(undefined);
        this._sentSpans.clear();
        this._debouncedFlush.cancel();
    }
    /**
   * Send the given spans, but only if they are part of a finished transaction.
   *
   * Returns the sent spans.
   * Spans remain unsent when their parent span is not yet finished.
   * This will happen regularly, as child spans are generally finished before their parents.
   * But it _could_ also happen because, for whatever reason, a parent span was lost.
   * In this case, we'll eventually need to clean this up.
   */ _maybeSend(spans) {
        const grouped = groupSpansWithParents(spans);
        const sentSpans = new Set();
        const rootNodes = this._getCompletedRootNodes(grouped);
        for (const root of rootNodes){
            const span = root.span;
            sentSpans.add(span);
            const transactionEvent = createTransactionForOtelSpan(span);
            // Add an attribute to the transaction event to indicate that this transaction is an orphaned transaction
            if (root.parentNode && this._sentSpans.has(root.parentNode.id)) {
                const traceData = transactionEvent.contexts?.trace?.data;
                if (traceData) {
                    traceData['sentry.parent_span_already_sent'] = true;
                }
            }
            // We'll recursively add all the child spans to this array
            const spans = transactionEvent.spans || [];
            for (const child of root.children){
                createAndFinishSpanForOtelSpan(child, spans, sentSpans);
            }
            // spans.sort() mutates the array, but we do not use this anymore after this point
            // so we can safely mutate it here
            transactionEvent.spans = spans.length > MAX_SPAN_COUNT ? spans.sort((a, b)=>a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT) : spans;
            const measurements = core.timedEventsToMeasurements(span.events);
            if (measurements) {
                transactionEvent.measurements = measurements;
            }
            core.captureEvent(transactionEvent);
        }
        return sentSpans;
    }
    /** Remove "expired" span id entries from the _sentSpans cache. */ _flushSentSpanCache() {
        const currentTimestamp = core._INTERNAL_safeDateNow();
        // Note, it is safe to delete items from the map as we go: https://stackoverflow.com/a/35943995/90297
        for (const [spanId, expirationTime] of this._sentSpans.entries()){
            if (expirationTime <= currentTimestamp) {
                this._sentSpans.delete(spanId);
            }
        }
    }
    /** Check if a node is a completed root node or a node whose parent has already been sent */ _nodeIsCompletedRootNodeOrHasSentParent(node) {
        return !!node.span && (!node.parentNode || this._sentSpans.has(node.parentNode.id));
    }
    /** Get all completed root nodes from a list of nodes */ _getCompletedRootNodes(nodes) {
        // TODO: We should be able to remove the explicit `node is SpanNodeCompleted` type guard
        //       once we stop supporting TS < 5.5
        return nodes.filter((node)=>this._nodeIsCompletedRootNodeOrHasSentParent(node));
    }
}
function parseSpan(span) {
    const attributes = span.attributes;
    const origin = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN];
    const op = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_OP];
    const source = attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
    return {
        origin,
        op,
        source
    };
}
/** Exported only for tests. */ function createTransactionForOtelSpan(span) {
    const { op, description, data, origin = 'manual', source } = getSpanData(span);
    const capturedSpanScopes = core.getCapturedScopesOnSpan(span);
    const sampleRate = span.attributes[core.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
    const attributes = {
        [core.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: source,
        [core.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate,
        [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
        [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
        ...data,
        ...removeSentryAttributes(span.attributes)
    };
    const { links } = span;
    const { traceId: trace_id, spanId: span_id } = span.spanContext();
    // If parentSpanIdFromTraceState is defined at all, we want it to take precedence
    // In that case, an empty string should be interpreted as "no parent span id",
    // even if `span.parentSpanId` is set
    // this is the case when we are starting a new trace, where we have a virtual span based on the propagationContext
    // We only want to continue the traceId in this case, but ignore the parent span
    const parent_span_id = getParentSpanId(span);
    const status = mapStatus(span);
    const traceContext = {
        parent_span_id,
        span_id,
        trace_id,
        data: attributes,
        origin,
        op,
        status: core.getStatusMessage(status),
        links: core.convertSpanLinksForEnvelope(links)
    };
    const statusCode = attributes[semanticConventions.ATTR_HTTP_RESPONSE_STATUS_CODE];
    const responseContext = typeof statusCode === 'number' ? {
        response: {
            status_code: statusCode
        }
    } : undefined;
    const transactionEvent = {
        contexts: {
            trace: traceContext,
            otel: {
                resource: span.resource.attributes
            },
            ...responseContext
        },
        spans: [],
        start_timestamp: core.spanTimeInputToSeconds(span.startTime),
        timestamp: core.spanTimeInputToSeconds(span.endTime),
        transaction: description,
        type: 'transaction',
        sdkProcessingMetadata: {
            capturedSpanScope: capturedSpanScopes.scope,
            capturedSpanIsolationScope: capturedSpanScopes.isolationScope,
            sampleRate,
            dynamicSamplingContext: core.getDynamicSamplingContextFromSpan(span)
        },
        ...source && {
            transaction_info: {
                source
            }
        }
    };
    return transactionEvent;
}
function createAndFinishSpanForOtelSpan(node, spans, sentSpans) {
    const span = node.span;
    if (span) {
        sentSpans.add(span);
    }
    const shouldDrop = !span;
    // If this span should be dropped, we still want to create spans for the children of this
    if (shouldDrop) {
        node.children.forEach((child)=>{
            createAndFinishSpanForOtelSpan(child, spans, sentSpans);
        });
        return;
    }
    const span_id = span.spanContext().spanId;
    const trace_id = span.spanContext().traceId;
    const parentSpanId = getParentSpanId(span);
    const { attributes, startTime, endTime, links } = span;
    const { op, description, data, origin = 'manual' } = getSpanData(span);
    const allData = {
        [core.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
        [core.SEMANTIC_ATTRIBUTE_SENTRY_OP]: op,
        ...removeSentryAttributes(attributes),
        ...data
    };
    const status = mapStatus(span);
    const spanJSON = {
        span_id,
        trace_id,
        data: allData,
        description,
        parent_span_id: parentSpanId,
        start_timestamp: core.spanTimeInputToSeconds(startTime),
        // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
        timestamp: core.spanTimeInputToSeconds(endTime) || undefined,
        status: core.getStatusMessage(status),
        op,
        origin,
        measurements: core.timedEventsToMeasurements(span.events),
        links: core.convertSpanLinksForEnvelope(links)
    };
    spans.push(spanJSON);
    node.children.forEach((child)=>{
        createAndFinishSpanForOtelSpan(child, spans, sentSpans);
    });
}
function getSpanData(span) {
    const { op: definedOp, source: definedSource, origin } = parseSpan(span);
    const { op: inferredOp, description, source: inferredSource, data: inferredData } = parseSpanDescription(span);
    const op = definedOp || inferredOp;
    const source = definedSource || inferredSource;
    const data = {
        ...inferredData,
        ...getData(span)
    };
    return {
        op,
        description,
        source,
        origin,
        data
    };
}
/**
 * Remove custom `sentry.` attributes we do not need to send.
 * These are more carrier attributes we use inside of the SDK, we do not need to send them to the API.
 */ function removeSentryAttributes(data) {
    const cleanedData = {
        ...data
    };
    /* eslint-disable @typescript-eslint/no-dynamic-delete */ delete cleanedData[core.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE];
    delete cleanedData[SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE];
    delete cleanedData[core.SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
    /* eslint-enable @typescript-eslint/no-dynamic-delete */ return cleanedData;
}
function getData(span) {
    const attributes = span.attributes;
    const data = {};
    if (span.kind !== api.SpanKind.INTERNAL) {
        data['otel.kind'] = api.SpanKind[span.kind];
    }
    // eslint-disable-next-line deprecation/deprecation
    const maybeHttpStatusCodeAttribute = attributes[semanticConventions.SEMATTRS_HTTP_STATUS_CODE];
    if (maybeHttpStatusCodeAttribute) {
        data[semanticConventions.ATTR_HTTP_RESPONSE_STATUS_CODE] = maybeHttpStatusCodeAttribute;
    }
    const requestData = getRequestSpanData(span);
    if (requestData.url) {
        data.url = requestData.url;
    }
    if (requestData['http.query']) {
        data['http.query'] = requestData['http.query'].slice(1);
    }
    if (requestData['http.fragment']) {
        data['http.fragment'] = requestData['http.fragment'].slice(1);
    }
    return data;
}
/**
 * Converts OpenTelemetry Spans to Sentry Spans and sends them to Sentry via
 * the Sentry SDK.
 */ class SentrySpanProcessor {
    constructor(options){
        setIsSetup('SentrySpanProcessor');
        this._exporter = new SentrySpanExporter(options);
    }
    /**
   * @inheritDoc
   */ async forceFlush() {
        this._exporter.flush();
    }
    /**
   * @inheritDoc
   */ async shutdown() {
        this._exporter.clear();
    }
    /**
   * @inheritDoc
   */ onStart(span, parentContext) {
        // This is a reliable way to get the parent span - because this is exactly how the parent is identified in the OTEL SDK
        const parentSpan = api.trace.getSpan(parentContext);
        let scopes = getScopesFromContext(parentContext);
        // We need access to the parent span in order to be able to move up the span tree for breadcrumbs
        if (parentSpan && !parentSpan.spanContext().isRemote) {
            core.addChildSpanToSpan(parentSpan, span);
        }
        // We need this in the span exporter
        if (parentSpan?.spanContext().isRemote) {
            span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_PARENT_IS_REMOTE, true);
        }
        // The root context does not have scopes stored, so we check for this specifically
        // As fallback we attach the global scopes
        if (parentContext === api.ROOT_CONTEXT) {
            scopes = {
                scope: core.getDefaultCurrentScope(),
                isolationScope: core.getDefaultIsolationScope()
            };
        }
        // We need the scope at time of span creation in order to apply it to the event when the span is finished
        if (scopes) {
            core.setCapturedScopesOnSpan(span, scopes.scope, scopes.isolationScope);
        }
        core.logSpanStart(span);
        const client = core.getClient();
        client?.emit('spanStart', span);
    }
    /** @inheritDoc */ onEnd(span) {
        core.logSpanEnd(span);
        const client = core.getClient();
        client?.emit('spanEnd', span);
        if (client && core.hasSpanStreamingEnabled(client)) {
            client.emit('afterSpanEnd', span);
        } else {
            this._exporter.export(span);
        }
    }
}
/**
 * A custom OTEL sampler that uses Sentry sampling rates to make its decision
 */ class SentrySampler {
    constructor(client){
        this._client = client;
        this._isSpanStreaming = core.hasSpanStreamingEnabled(client);
        setIsSetup('SentrySampler');
    }
    /** @inheritDoc */ shouldSample(context, traceId, spanName, spanKind, spanAttributes, _links) {
        const options = this._client.getOptions();
        const { ignoreSpans } = options;
        const parentSpan = getValidSpan(context);
        const parentContext = parentSpan?.spanContext();
        if (!core.hasSpansEnabled(options)) {
            return wrapSamplingDecision({
                decision: undefined,
                context,
                spanAttributes
            });
        }
        // `ATTR_HTTP_REQUEST_METHOD` is the new attribute, but we still support the old one, `SEMATTRS_HTTP_METHOD`, for now.
        // eslint-disable-next-line deprecation/deprecation
        const maybeSpanHttpMethod = spanAttributes[semanticConventions.SEMATTRS_HTTP_METHOD] || spanAttributes[semanticConventions.ATTR_HTTP_REQUEST_METHOD];
        // If we have a http.client span that has no local parent, we never want to sample it
        // but we want to leave downstream sampling decisions up to the server.
        // Exception: when span streaming is enabled, we always emit these spans.
        if (spanKind === api.SpanKind.CLIENT && maybeSpanHttpMethod && (!parentSpan || parentContext?.isRemote)) {
            if (!this._isSpanStreaming) {
                this._client.recordDroppedEvent('no_parent_span', 'span');
                return wrapSamplingDecision({
                    decision: undefined,
                    context,
                    spanAttributes
                });
            }
        }
        const parentSampled = parentSpan ? getParentSampled(parentSpan, traceId, spanName) : undefined;
        const isRootSpan = !parentSpan || parentContext?.isRemote;
        // We only sample based on parameters (like tracesSampleRate or tracesSampler) for root spans (which is done in sampleSpan).
        // Non-root-spans simply inherit the sampling decision from their parent.
        if (!isRootSpan) {
            if (this._isSpanStreaming) {
                // `ignoreSpans` is only applied at span start for streamed spans.
                // Static spans/transactions get filtered at transaction end.
                // Likewise, we only record client outcomes for child spans when streaming
                if (parentSampled) {
                    if (ignoreSpans?.length) {
                        const { description: inferredChildName, op: childOp } = inferSpanData(spanName, spanAttributes, spanKind);
                        if (core.shouldIgnoreSpan({
                            description: inferredChildName,
                            op: spanAttributes[core.SEMANTIC_ATTRIBUTE_SENTRY_OP] ?? childOp,
                            attributes: spanAttributes
                        }, ignoreSpans)) {
                            this._client.recordDroppedEvent('ignored', 'span');
                            return wrapSamplingDecision({
                                decision: sdkTraceBase.SamplingDecision.NOT_RECORD,
                                context,
                                spanAttributes,
                                ignoredChildSpan: true
                            });
                        }
                    }
                }
                if (!parentSampled) {
                    const parentSegmentIgnored = parentContext?.traceState?.get(SENTRY_TRACE_STATE_SEGMENT_IGNORED) === '1';
                    this._client.recordDroppedEvent(parentSegmentIgnored ? 'ignored' : 'sample_rate', 'span');
                }
            }
            return wrapSamplingDecision({
                decision: parentSampled ? sdkTraceBase.SamplingDecision.RECORD_AND_SAMPLED : sdkTraceBase.SamplingDecision.NOT_RECORD,
                context,
                spanAttributes
            });
        }
        // We want to pass the inferred name & attributes to the sampler method
        const { description: inferredSpanName, data: inferredAttributes, op } = inferSpanData(spanName, spanAttributes, spanKind);
        const mergedAttributes = {
            ...inferredAttributes,
            ...spanAttributes
        };
        if (op) {
            mergedAttributes[core.SEMANTIC_ATTRIBUTE_SENTRY_OP] = op;
        }
        if (this._isSpanStreaming && ignoreSpans?.length && core.shouldIgnoreSpan({
            description: inferredSpanName,
            op: mergedAttributes[core.SEMANTIC_ATTRIBUTE_SENTRY_OP] ?? op,
            attributes: mergedAttributes
        }, ignoreSpans)) {
            this._client.recordDroppedEvent('ignored', 'span');
            return wrapSamplingDecision({
                decision: sdkTraceBase.SamplingDecision.NOT_RECORD,
                context,
                spanAttributes,
                ignoredSegmentSpan: true
            });
        }
        const mutableSamplingDecision = {
            decision: true
        };
        this._client.emit('beforeSampling', {
            spanAttributes: mergedAttributes,
            spanName: inferredSpanName,
            parentSampled: parentSampled,
            parentContext: parentContext
        }, mutableSamplingDecision);
        if (!mutableSamplingDecision.decision) {
            return wrapSamplingDecision({
                decision: undefined,
                context,
                spanAttributes
            });
        }
        const { isolationScope } = getScopesFromContext(context) ?? {};
        const dscString = parentContext?.traceState ? parentContext.traceState.get(SENTRY_TRACE_STATE_DSC) : undefined;
        const dsc = dscString ? core.baggageHeaderToDynamicSamplingContext(dscString) : undefined;
        const sampleRand = core.parseSampleRate(dsc?.sample_rand) ?? core._INTERNAL_safeMathRandom();
        const [sampled, sampleRate, localSampleRateWasApplied] = core.sampleSpan(options, {
            name: inferredSpanName,
            attributes: mergedAttributes,
            normalizedRequest: isolationScope?.getScopeData().sdkProcessingMetadata.normalizedRequest,
            parentSampled,
            parentSampleRate: core.parseSampleRate(dsc?.sample_rate)
        }, sampleRand);
        const method = `${maybeSpanHttpMethod}`.toUpperCase();
        if (method === 'OPTIONS' || method === 'HEAD') {
            debugBuild.DEBUG_BUILD && core.debug.log(`[Tracing] Not sampling span because HTTP method is '${method}' for ${spanName}`);
            return wrapSamplingDecision({
                decision: sdkTraceBase.SamplingDecision.NOT_RECORD,
                context,
                spanAttributes,
                sampleRand,
                downstreamTraceSampleRate: 0
            });
        }
        if (!sampled && // We check for `parentSampled === undefined` because we only want to record client reports for spans that are trace roots (ie. when there was incoming trace)
        parentSampled === undefined) {
            debugBuild.DEBUG_BUILD && core.debug.log('[Tracing] Discarding root span because its trace was not chosen to be sampled.');
            this._client.recordDroppedEvent('sample_rate', this._isSpanStreaming ? 'span' : 'transaction');
        }
        return {
            ...wrapSamplingDecision({
                decision: sampled ? sdkTraceBase.SamplingDecision.RECORD_AND_SAMPLED : sdkTraceBase.SamplingDecision.NOT_RECORD,
                context,
                spanAttributes,
                sampleRand,
                downstreamTraceSampleRate: localSampleRateWasApplied ? sampleRate : undefined
            }),
            attributes: {
                // We set the sample rate on the span when a local sample rate was applied to better understand how traces were sampled in Sentry
                [core.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: localSampleRateWasApplied ? sampleRate : undefined
            }
        };
    }
    /** Returns the sampler name or short description with the configuration. */ toString() {
        return 'SentrySampler';
    }
}
function getParentSampled(parentSpan, traceId, spanName) {
    const parentContext = parentSpan.spanContext();
    // Only inherit sample rate if `traceId` is the same
    // Note for testing: `isSpanContextValid()` checks the format of the traceId/spanId, so we need to pass valid ones
    if (api.isSpanContextValid(parentContext) && parentContext.traceId === traceId) {
        if (parentContext.isRemote) {
            const parentSampled = getSamplingDecision(parentSpan.spanContext());
            debugBuild.DEBUG_BUILD && core.debug.log(`[Tracing] Inheriting remote parent's sampled decision for ${spanName}: ${parentSampled}`);
            return parentSampled;
        }
        const parentSampled = getSamplingDecision(parentContext);
        debugBuild.DEBUG_BUILD && core.debug.log(`[Tracing] Inheriting parent's sampled decision for ${spanName}: ${parentSampled}`);
        return parentSampled;
    }
    return undefined;
}
/**
 * Wrap a sampling decision with data that Sentry needs to work properly with it.
 * If you pass `decision: undefined`, it will be treated as `NOT_RECORDING`, but in contrast to passing `NOT_RECORDING`
 * it will not propagate this decision to downstream Sentry SDKs.
 */ function wrapSamplingDecision({ decision, context, spanAttributes, sampleRand, downstreamTraceSampleRate, ignoredChildSpan, ignoredSegmentSpan }) {
    let traceState = getBaseTraceState(context, spanAttributes);
    // We will override the propagated sample rate downstream when
    // - the tracesSampleRate is applied
    // - the tracesSampler is invoked
    // Since unsampled OTEL spans (NonRecordingSpans) cannot hold attributes we need to store this on the (trace)context.
    if (downstreamTraceSampleRate !== undefined) {
        traceState = traceState.set(SENTRY_TRACE_STATE_SAMPLE_RATE, `${downstreamTraceSampleRate}`);
    }
    if (sampleRand !== undefined) {
        traceState = traceState.set(SENTRY_TRACE_STATE_SAMPLE_RAND, `${sampleRand}`);
    }
    if (ignoredChildSpan) {
        traceState = traceState.set(SENTRY_TRACE_STATE_CHILD_IGNORED, '1');
    }
    if (ignoredSegmentSpan) {
        traceState = traceState.set(SENTRY_TRACE_STATE_SEGMENT_IGNORED, '1');
    }
    // If the decision is undefined, we treat it as NOT_RECORDING, but we don't propagate this decision to downstream SDKs
    // Which is done by not setting `SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING` traceState
    if (decision == undefined) {
        return {
            decision: sdkTraceBase.SamplingDecision.NOT_RECORD,
            traceState
        };
    }
    if (decision === sdkTraceBase.SamplingDecision.NOT_RECORD) {
        return {
            decision,
            traceState: traceState.set(SENTRY_TRACE_STATE_SAMPLED_NOT_RECORDING, '1')
        };
    }
    return {
        decision,
        traceState
    };
}
function getBaseTraceState(context, spanAttributes) {
    const parentSpan = api.trace.getSpan(context);
    const parentContext = parentSpan?.spanContext();
    let traceState = parentContext?.traceState || new core$1.TraceState();
    // We always keep the URL on the trace state, so we can access it in the propagator
    // `ATTR_URL_FULL` is the new attribute, but we still support the old one, `ATTR_HTTP_URL`, for now.
    // eslint-disable-next-line deprecation/deprecation
    const url = spanAttributes[semanticConventions.SEMATTRS_HTTP_URL] || spanAttributes[semanticConventions.ATTR_URL_FULL];
    if (url && typeof url === 'string') {
        traceState = traceState.set(SENTRY_TRACE_STATE_URL, url);
    }
    return traceState;
}
/**
 * If the active span is invalid, we want to ignore it as parent.
 * This aligns with how otel tracers and default samplers handle these cases.
 */ function getValidSpan(context) {
    const span = api.trace.getSpan(context);
    return span && api.isSpanContextValid(span.spanContext()) ? span : undefined;
}
/**
 * Minimal Resource implementation that satisfies the OpenTelemetry Resource interface
 * used by BasicTracerProvider, without depending on `@opentelemetry/resources`.
 */ class SentryResource {
    constructor(attributes){
        this._attributes = attributes;
    }
    get attributes() {
        return this._attributes;
    }
    merge(other) {
        if (!other) {
            return this;
        }
        return new SentryResource({
            ...this._attributes,
            ...other.attributes
        });
    }
    getRawAttributes() {
        return Object.entries(this._attributes);
    }
}
/**
 * Parses `OTEL_RESOURCE_ATTRIBUTES` env var (comma-separated `key=value` pairs).
 * Values are URL-decoded per the OTel spec.
 */ function parseOtelResourceAttributes(raw) {
    if (!raw) {
        return {};
    }
    const result = {};
    for (const pair of raw.split(',')){
        const eq = pair.indexOf('=');
        if (eq === -1) {
            continue;
        }
        const key = pair.substring(0, eq).trim();
        const value = pair.substring(eq + 1).trim();
        if (key) {
            try {
                result[key] = decodeURIComponent(value);
            } catch  {
                result[key] = value;
            }
        }
    }
    return result;
}
/**
 * Returns a Resource for use in Sentry's OpenTelemetry TracerProvider setup.
 *
 * Combines the default OTel SDK telemetry attributes with Sentry-specific
 * service attributes, equivalent to what was previously done via:
 * `defaultResource().merge(resourceFromAttributes({ ... }))`
 *
 * Respects OTEL_SERVICE_NAME and OTEL_RESOURCE_ATTRIBUTES environment variables
 * per the OpenTelemetry specification.
 */ function getSentryResource(serviceNameFallback) {
    const env = typeof process !== 'undefined' ? process.env : {};
    const otelServiceName = env.OTEL_SERVICE_NAME;
    const otelResourceAttrs = parseOtelResourceAttributes(env.OTEL_RESOURCE_ATTRIBUTES);
    return new SentryResource({
        // Lowest priority: Sentry defaults
        // eslint-disable-next-line deprecation/deprecation
        [semanticConventions.SEMRESATTRS_SERVICE_NAMESPACE]: 'sentry',
        [semanticConventions.ATTR_SERVICE_NAME]: serviceNameFallback,
        // OTEL_RESOURCE_ATTRIBUTES overrides defaults (including service.name and service.namespace)
        ...otelResourceAttrs,
        // OTEL_SERVICE_NAME explicitly overrides service.name
        ...otelServiceName ? {
            [semanticConventions.ATTR_SERVICE_NAME]: otelServiceName
        } : {},
        // Highest priority: Sentry SDK telemetry attrs (cannot be overridden by env vars)
        [semanticConventions.ATTR_SERVICE_VERSION]: core.SDK_VERSION,
        [semanticConventions.ATTR_TELEMETRY_SDK_LANGUAGE]: core$1.SDK_INFO[semanticConventions.ATTR_TELEMETRY_SDK_LANGUAGE],
        [semanticConventions.ATTR_TELEMETRY_SDK_NAME]: core$1.SDK_INFO[semanticConventions.ATTR_TELEMETRY_SDK_NAME],
        [semanticConventions.ATTR_TELEMETRY_SDK_VERSION]: core$1.SDK_INFO[semanticConventions.ATTR_TELEMETRY_SDK_VERSION]
    });
}
exports.SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION = SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION;
exports.SENTRY_SCOPES_CONTEXT_KEY = SENTRY_SCOPES_CONTEXT_KEY;
exports.SentryPropagator = SentryPropagator;
exports.SentrySampler = SentrySampler;
exports.SentrySpanProcessor = SentrySpanProcessor;
exports.buildContextWithSentryScopes = buildContextWithSentryScopes;
exports.continueTrace = continueTrace;
exports.enhanceDscWithOpenTelemetryRootSpanName = enhanceDscWithOpenTelemetryRootSpanName;
exports.getActiveSpan = getActiveSpan;
exports.getRequestSpanData = getRequestSpanData;
exports.getScopesFromContext = getScopesFromContext;
exports.getSentryResource = getSentryResource;
exports.getSpanKind = getSpanKind;
exports.getTraceContextForScope = getTraceContextForScope;
exports.isSentryRequestSpan = isSentryRequestSpan;
exports.openTelemetrySetupCheck = openTelemetrySetupCheck;
exports.setIsSetup = setIsSetup;
exports.setOpenTelemetryContextAsyncContextStrategy = setOpenTelemetryContextAsyncContextStrategy;
exports.setupEventContextTrace = setupEventContextTrace;
exports.spanHasAttributes = spanHasAttributes;
exports.spanHasEvents = spanHasEvents;
exports.spanHasKind = spanHasKind;
exports.spanHasName = spanHasName;
exports.spanHasParentId = spanHasParentId;
exports.spanHasStatus = spanHasStatus;
exports.startInactiveSpan = startInactiveSpan;
exports.startSpan = startSpan;
exports.startSpanManual = startSpanManual;
exports.suppressTracing = suppressTracing;
exports.withActiveSpan = withActiveSpan;
exports.wrapClientClass = wrapClientClass;
exports.wrapContextManagerClass = wrapContextManagerClass;
exports.wrapSamplingDecision = wrapSamplingDecision; //# sourceMappingURL=resource-C7SKXNJp.js.map
}),
"[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const resource = __turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/resource-C7SKXNJp.js [app-rsc] (ecmascript)");
const core = __turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/core/build/cjs/index.js [app-rsc] (ecmascript)");
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const node_async_hooks = __turbopack_context__.r("[externals]/node:async_hooks [external] (node:async_hooks, cjs)");
const node_events = __turbopack_context__.r("[externals]/node:events [external] (node:events, cjs)");
__turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js [app-rsc] (ecmascript)");
__turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/core/build/esm/index.js [app-rsc] (ecmascript)");
__turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/debug-build-ntZrglYX.js [app-rsc] (ecmascript)");
__turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/sdk-trace-base/build/esm/index.js [app-rsc] (ecmascript)");
const ADD_LISTENER_METHODS = [
    'addListener',
    'on',
    'once',
    'prependListener',
    'prependOnceListener'
];
/**
 * OpenTelemetry-compatible context manager using Node.js `AsyncLocalStorage`.
 * Semantics match `@opentelemetry/context-async-hooks` (function `bind` + `EventEmitter` patching).
 */ class SentryAsyncLocalStorageContextManager {
    __init() {
        this._asyncLocalStorage = new node_async_hooks.AsyncLocalStorage();
    }
    __init2() {
        this._kOtListeners = Symbol('OtListeners');
    }
    __init3() {
        this._wrapped = false;
    }
    constructor(){
        SentryAsyncLocalStorageContextManager.prototype.__init.call(this);
        SentryAsyncLocalStorageContextManager.prototype.__init2.call(this);
        SentryAsyncLocalStorageContextManager.prototype.__init3.call(this);
        resource.setIsSetup('SentryContextManager');
    }
    active() {
        return this._asyncLocalStorage.getStore() ?? api.ROOT_CONTEXT;
    }
    with(context, fn, thisArg, ...args) {
        const ctx2 = resource.buildContextWithSentryScopes(context, this.active());
        const cb = thisArg == null ? fn : fn.bind(thisArg);
        return this._asyncLocalStorage.run(ctx2, cb, ...args);
    }
    enable() {
        return this;
    }
    disable() {
        this._asyncLocalStorage.disable();
        return this;
    }
    bind(context, target) {
        if (target instanceof node_events.EventEmitter) {
            return this._bindEventEmitter(context, target);
        }
        if (typeof target === 'function') {
            return this._bindFunction(context, target);
        }
        return target;
    }
    /**
   * Gets underlying AsyncLocalStorage and symbol to allow lookup of scope.
   * This is Sentry-specific.
   */ getAsyncLocalStorageLookup() {
        return {
            asyncLocalStorage: this._asyncLocalStorage,
            contextSymbol: resource.SENTRY_SCOPES_CONTEXT_KEY
        };
    }
    _bindFunction(context, target) {
        const managerWith = this.with.bind(this);
        const contextWrapper = function(...args) {
            return managerWith(context, ()=>target.apply(this, args));
        };
        Object.defineProperty(contextWrapper, 'length', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: target.length
        });
        return contextWrapper;
    }
    _bindEventEmitter(context, ee) {
        if (this._getPatchMap(ee) !== undefined) {
            return ee;
        }
        this._createPatchMap(ee);
        for (const methodName of ADD_LISTENER_METHODS){
            if (ee[methodName] === undefined) continue;
            ee[methodName] = this._patchAddListener(ee, ee[methodName], context);
        }
        if (typeof ee.removeListener === 'function') {
            // oxlint-disable-next-line @typescript-eslint/unbound-method -- patched like upstream OTel context manager
            ee.removeListener = this._patchRemoveListener(ee, ee.removeListener);
        }
        if (typeof ee.off === 'function') {
            // oxlint-disable-next-line @typescript-eslint/unbound-method
            ee.off = this._patchRemoveListener(ee, ee.off);
        }
        if (typeof ee.removeAllListeners === 'function') {
            ee.removeAllListeners = this._patchRemoveAllListeners(ee, // oxlint-disable-next-line @typescript-eslint/unbound-method
            ee.removeAllListeners);
        }
        return ee;
    }
    _patchRemoveListener(ee, original) {
        // oxlint-disable-next-line @typescript-eslint/no-this-alias
        const contextManager = this;
        return function(event, listener) {
            const events = contextManager._getPatchMap(ee)?.[event];
            if (events === undefined) {
                return original.call(this, event, listener);
            }
            const patchedListener = events.get(listener);
            return original.call(this, event, patchedListener || listener);
        };
    }
    _patchRemoveAllListeners(ee, original) {
        // oxlint-disable-next-line @typescript-eslint/no-this-alias
        const contextManager = this;
        return function(event) {
            const map = contextManager._getPatchMap(ee);
            if (map !== undefined) {
                if (arguments.length === 0) {
                    contextManager._createPatchMap(ee);
                } else if (event !== undefined && map[event] !== undefined) {
                    // oxlint-disable-next-line @typescript-eslint/no-dynamic-delete -- event-keyed listener map
                    delete map[event];
                }
            }
            return original.apply(this, arguments);
        };
    }
    _patchAddListener(ee, original, context) {
        // oxlint-disable-next-line @typescript-eslint/no-this-alias
        const contextManager = this;
        return function(event, listener) {
            if (contextManager._wrapped) {
                return original.call(this, event, listener);
            }
            let map = contextManager._getPatchMap(ee);
            if (map === undefined) {
                map = contextManager._createPatchMap(ee);
            }
            let listeners = map[event];
            if (listeners === undefined) {
                listeners = new WeakMap();
                map[event] = listeners;
            }
            const patchedListener = contextManager.bind(context, listener);
            listeners.set(listener, patchedListener);
            contextManager._wrapped = true;
            try {
                return original.call(this, event, patchedListener);
            } finally{
                contextManager._wrapped = false;
            }
        };
    }
    _createPatchMap(ee) {
        const map = Object.create(null);
        ee[this._kOtListeners] = map;
        return map;
    }
    _getPatchMap(ee) {
        return ee[this._kOtListeners];
    }
}
exports.SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION = resource.SEMANTIC_ATTRIBUTE_SENTRY_GRAPHQL_OPERATION;
exports.SentryPropagator = resource.SentryPropagator;
exports.SentrySampler = resource.SentrySampler;
exports.SentrySpanProcessor = resource.SentrySpanProcessor;
exports.continueTrace = resource.continueTrace;
exports.enhanceDscWithOpenTelemetryRootSpanName = resource.enhanceDscWithOpenTelemetryRootSpanName;
exports.getActiveSpan = resource.getActiveSpan;
exports.getRequestSpanData = resource.getRequestSpanData;
exports.getScopesFromContext = resource.getScopesFromContext;
exports.getSentryResource = resource.getSentryResource;
exports.getSpanKind = resource.getSpanKind;
exports.getTraceContextForScope = resource.getTraceContextForScope;
exports.isSentryRequestSpan = resource.isSentryRequestSpan;
exports.openTelemetrySetupCheck = resource.openTelemetrySetupCheck;
exports.setOpenTelemetryContextAsyncContextStrategy = resource.setOpenTelemetryContextAsyncContextStrategy;
exports.setupEventContextTrace = resource.setupEventContextTrace;
exports.spanHasAttributes = resource.spanHasAttributes;
exports.spanHasEvents = resource.spanHasEvents;
exports.spanHasKind = resource.spanHasKind;
exports.spanHasName = resource.spanHasName;
exports.spanHasParentId = resource.spanHasParentId;
exports.spanHasStatus = resource.spanHasStatus;
exports.startInactiveSpan = resource.startInactiveSpan;
exports.startSpan = resource.startSpan;
exports.startSpanManual = resource.startSpanManual;
exports.suppressTracing = resource.suppressTracing;
exports.withActiveSpan = resource.withActiveSpan;
exports.wrapClientClass = resource.wrapClientClass;
exports.wrapContextManagerClass = resource.wrapContextManagerClass;
exports.wrapSamplingDecision = resource.wrapSamplingDecision;
exports.getClient = core.getClient;
exports.getDynamicSamplingContextFromSpan = core.getDynamicSamplingContextFromSpan;
exports.shouldPropagateTraceForUrl = core.shouldPropagateTraceForUrl;
exports.withStreamedSpan = core.withStreamedSpan;
exports.SentryAsyncLocalStorageContextManager = SentryAsyncLocalStorageContextManager; //# sourceMappingURL=index.js.map
}),
"[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/tracingChannel.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
const node_diagnostics_channel = __turbopack_context__.r("[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)");
const api = __turbopack_context__.r("[project]/multilingual_version/node_modules/@opentelemetry/api/build/esm/index.js [app-rsc] (ecmascript)");
const core = __turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/core/build/cjs/index.js [app-rsc] (ecmascript)");
const debugBuild = __turbopack_context__.r("[project]/multilingual_version/node_modules/@sentry/opentelemetry/build/cjs/debug-build-ntZrglYX.js [app-rsc] (ecmascript)");
/**
 * Transform function that creates a span from the channel data.
 */ /**
 * Creates a new tracing channel with proper OTel context propagation.
 *
 * When the channel's `tracePromise` / `traceSync` / `traceCallback` is called,
 * the `transformStart` function runs inside `bindStore` so that:
 *   1. A new span is created from the channel data.
 *   2. The span is set on the OTel context stored in AsyncLocalStorage.
 *   3. Downstream code (including Sentry's span processor) sees the correct parent.
 *
 * @param channelNameOrInstance - Either a channel name string or an existing TracingChannel instance.
 * @param transformStart - Function that creates an OpenTelemetry span from the channel data.
 * @returns The tracing channel with OTel context bound.
 */ function tracingChannel(channelNameOrInstance, transformStart) {
    const channel = node_diagnostics_channel.tracingChannel(channelNameOrInstance);
    let lookup;
    try {
        const contextManager = api.context._getContextManager();
        lookup = contextManager.getAsyncLocalStorageLookup();
    } catch  {
    // getAsyncLocalStorageLookup may not exist if using a non-Sentry context manager
    }
    if (!lookup) {
        debugBuild.DEBUG_BUILD && core.logger.warn('[TracingChannel] Could not access OpenTelemetry AsyncLocalStorage, context propagation will not work.');
        return channel;
    }
    const otelStorage = lookup.asyncLocalStorage;
    // Bind the start channel so that each trace invocation runs the transform
    // and stores the resulting context (with span) in AsyncLocalStorage.
    // @ts-expect-error bindStore types don't account for AsyncLocalStorage of a different generic type
    channel.start.bindStore(otelStorage, (data)=>{
        const span = transformStart(data);
        // Store the span on data so downstream event handlers (asyncEnd, error, etc.) can access it.
        data._sentrySpan = span;
        // Return the context with the span set — this is what gets stored in AsyncLocalStorage.
        return api.trace.setSpan(api.context.active(), span);
    });
    return channel;
}
exports.tracingChannel = tracingChannel; //# sourceMappingURL=tracingChannel.js.map
}),
"[project]/multilingual_version/node_modules/module-details-from-path/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var sep = __turbopack_context__.r("[externals]/path [external] (path, cjs)").sep;
module.exports = function(file) {
    var segments = file.split(sep);
    var index = segments.lastIndexOf('node_modules');
    if (index === -1) return;
    if (!segments[index + 1]) return;
    var scoped = segments[index + 1][0] === '@';
    var name = scoped ? segments[index + 1] + '/' + segments[index + 2] : segments[index + 1];
    var offset = scoped ? 3 : 2;
    var basedir = '';
    var lastBaseDirSegmentIndex = index + offset - 1;
    for(var i = 0; i <= lastBaseDirSegmentIndex; i++){
        if (i === lastBaseDirSegmentIndex) {
            basedir += segments[i];
        } else {
            basedir += segments[i] + sep;
        }
    }
    var path = '';
    var lastSegmentIndex = segments.length - 1;
    for(var i2 = index + offset; i2 <= lastSegmentIndex; i2++){
        if (i2 === lastSegmentIndex) {
            path += segments[i2];
        } else {
            path += segments[i2] + sep;
        }
    }
    return {
        name: name,
        basedir: basedir,
        path: path
    };
};
}),
"[project]/multilingual_version/node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parse",
    ()=>parse
]);
var UNKNOWN_FUNCTION = '<unknown>';
/**
 * This parses the different stack traces and puts them into one format
 * This borrows heavily from TraceKit (https://github.com/csnover/TraceKit)
 */ function parse(stackString) {
    var lines = stackString.split('\n');
    return lines.reduce(function(stack, line) {
        var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);
        if (parseResult) {
            stack.push(parseResult);
        }
        return stack;
    }, []);
}
var chromeRe = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|rsc|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRe = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function parseChrome(line) {
    var parts = chromeRe.exec(line);
    if (!parts) {
        return null;
    }
    var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
    var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
    var submatch = chromeEvalRe.exec(parts[2]);
    if (isEval && submatch != null) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url
        parts[3] = submatch[2]; // line
        parts[4] = submatch[3]; // column
    }
    return {
        file: !isNative ? parts[2] : null,
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: isNative ? [
            parts[2]
        ] : [],
        lineNumber: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
    };
}
var winjsRe = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|rsc|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseWinjs(line) {
    var parts = winjsRe.exec(line);
    if (!parts) {
        return null;
    }
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
    };
}
var geckoRe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|rsc|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function parseGecko(line) {
    var parts = geckoRe.exec(line);
    if (!parts) {
        return null;
    }
    var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
    var submatch = geckoEvalRe.exec(parts[3]);
    if (isEval && submatch != null) {
        // throw out eval line/column and use top-most line number
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = null; // no column when eval
    }
    return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: parts[2] ? parts[2].split(',') : [],
        lineNumber: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
    };
}
var javaScriptCoreRe = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function parseJSC(line) {
    var parts = javaScriptCoreRe.exec(line);
    if (!parts) {
        return null;
    }
    return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[4],
        column: parts[5] ? +parts[5] : null
    };
}
var nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseNode(line) {
    var parts = nodeRe.exec(line);
    if (!parts) {
        return null;
    }
    return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
    };
}
;
}),
"[project]/multilingual_version/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "mergeClasses",
    ()=>mergeClasses
]);
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
;
 //# sourceMappingURL=mergeClasses.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "toKebabCase",
    ()=>toKebabCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
;
 //# sourceMappingURL=toKebabCase.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "toCamelCase",
    ()=>toCamelCase
]);
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
;
 //# sourceMappingURL=toCamelCase.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "toPascalCase",
    ()=>toPascalCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toCamelCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs [app-rsc] (ecmascript)");
;
const toPascalCase = (string)=>{
    const camelCase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toCamelCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toCamelCase"])(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
;
 //# sourceMappingURL=toPascalCase.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs <module evaluation>", "default");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs", "default");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toKebabCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toPascalCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/Icon.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toKebabCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toPascalCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toPascalCase$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/users.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "path",
        {
            d: "M16 3.128a4 4 0 0 1 0 7.744",
            key: "16gr8j"
        }
    ],
    [
        "path",
        {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ]
];
const Users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("users", __iconNode);
;
 //# sourceMappingURL=users.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/users.mjs [app-rsc] (ecmascript) <export default as Users>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Users",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/users.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/book.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Book
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
            key: "k3hazp"
        }
    ]
];
const Book = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("book", __iconNode);
;
 //# sourceMappingURL=book.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/book.mjs [app-rsc] (ecmascript) <export default as Book>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Book",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/book.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
 //# sourceMappingURL=clock.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-rsc] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-rsc] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TriangleAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
];
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("triangle-alert", __iconNode);
;
 //# sourceMappingURL=triangle-alert.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-rsc] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>DollarSign
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "2",
            y2: "22",
            key: "7eqyqh"
        }
    ],
    [
        "path",
        {
            d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
            key: "1b0p4s"
        }
    ]
];
const DollarSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("dollar-sign", __iconNode);
;
 //# sourceMappingURL=dollar-sign.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-rsc] (ecmascript) <export default as DollarSign>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DollarSign",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/dollar-sign.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TrendingUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 7h6v6",
            key: "box55l"
        }
    ],
    [
        "path",
        {
            d: "m22 7-8.5 8.5-5-5L2 17",
            key: "1t1m79"
        }
    ]
];
const TrendingUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("trending-up", __iconNode);
;
 //# sourceMappingURL=trending-up.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-rsc] (ecmascript) <export default as TrendingUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendingUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Activity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
            key: "169zse"
        }
    ]
];
const Activity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("activity", __iconNode);
;
 //# sourceMappingURL=activity.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-rsc] (ecmascript) <export default as Activity>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Activity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Sparkles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
            key: "1s2grr"
        }
    ],
    [
        "path",
        {
            d: "M20 2v4",
            key: "1rf3ol"
        }
    ],
    [
        "path",
        {
            d: "M22 4h-4",
            key: "gwowj6"
        }
    ],
    [
        "circle",
        {
            cx: "4",
            cy: "20",
            r: "2",
            key: "6kqj1y"
        }
    ]
];
const Sparkles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("sparkles", __iconNode);
;
 //# sourceMappingURL=sparkles.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-rsc] (ecmascript) <export default as Sparkles>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sparkles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleCheckBig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-rsc] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>CircleX
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
];
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("circle-x", __iconNode);
;
 //# sourceMappingURL=circle-x.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-rsc] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LoaderCircle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
];
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("loader-circle", __iconNode);
;
 //# sourceMappingURL=loader-circle.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-rsc] (ecmascript) <export default as Loader2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/search.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/search.mjs [app-rsc] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/search.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/database.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Database
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "ellipse",
        {
            cx: "12",
            cy: "5",
            rx: "9",
            ry: "3",
            key: "msslwz"
        }
    ],
    [
        "path",
        {
            d: "M3 5V19A9 3 0 0 0 21 19V5",
            key: "1wlel7"
        }
    ],
    [
        "path",
        {
            d: "M3 12A9 3 0 0 0 21 12",
            key: "mv7ke4"
        }
    ]
];
const Database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("database", __iconNode);
;
 //# sourceMappingURL=database.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/database.mjs [app-rsc] (ecmascript) <export default as Database>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Database",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/database.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Zap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
];
const Zap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("zap", __iconNode);
;
 //# sourceMappingURL=zap.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-rsc] (ecmascript) <export default as Zap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Zap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Layers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
            key: "zw3jo"
        }
    ],
    [
        "path",
        {
            d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
            key: "1wduqc"
        }
    ],
    [
        "path",
        {
            d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
            key: "kqbvx6"
        }
    ]
];
const Layers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("layers", __iconNode);
;
 //# sourceMappingURL=layers.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-rsc] (ecmascript) <export default as Layers>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-rsc] (ecmascript)");
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RefreshCw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-rsc] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
            key: "v9h5vc"
        }
    ],
    [
        "path",
        {
            d: "M21 3v5h-5",
            key: "1q7to0"
        }
    ],
    [
        "path",
        {
            d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
            key: "3uifl3"
        }
    ],
    [
        "path",
        {
            d: "M8 16H3v5",
            key: "1cv678"
        }
    ]
];
const RefreshCw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])("refresh-cw", __iconNode);
;
 //# sourceMappingURL=refresh-cw.mjs.map
}),
"[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-rsc] (ecmascript) <export default as RefreshCw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshCw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multilingual_version$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multilingual_version/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=f7fbe_3413efe5._.js.map