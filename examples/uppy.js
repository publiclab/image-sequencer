! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Uppy = e()
    }
}(function() {
    var define, module, exports, _$browser_51 = {},
        cachedSetTimeout, cachedClearTimeout, process = _$browser_51 = {};

    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined")
    }

    function runTimeout(e) {
        if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(e, 0);
        try {
            return cachedSetTimeout(e, 0)
        } catch (t) {
            try {
                return cachedSetTimeout.call(null, e, 0)
            } catch (t) {
                return cachedSetTimeout.call(this, e, 0)
            }
        }
    }! function() {
        try {
            cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout
        } catch (e) {
            cachedSetTimeout = defaultSetTimout
        }
        try {
            cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout
        }
    }();
    var currentQueue, queue = [],
        draining = !1,
        queueIndex = -1;

    function cleanUpNextTick() {
        draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
    }

    function drainQueue() {
        if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t;) {
                for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, t = queue.length
            }
            currentQueue = null, draining = !1,
                function(e) {
                    if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(e);
                    try {
                        cachedClearTimeout(e)
                    } catch (t) {
                        try {
                            return cachedClearTimeout.call(null, e)
                        } catch (t) {
                            return cachedClearTimeout.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function Item(e, t) {
        this.fun = e, this.array = t
    }

    function noop() {}
    process.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
    }, Item.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, process.listeners = function(e) {
        return []
    }, process.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, process.cwd = function() {
        return "/"
    }, process.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, process.umask = function() {
        return 0
    };
    var _$es6Promise_34 = {
        exports: {}
    };
    (function(e, t) {
        ! function(e, t) {
            "object" == typeof _$es6Promise_34.exports ? _$es6Promise_34.exports = t() : "function" == typeof define && define.amd ? define(t) : e.ES6Promise = t()
        }(this, function() {
            "use strict";

            function r(e) {
                return "function" == typeof e
            }
            var n = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                o = 0,
                i = void 0,
                s = void 0,
                a = function(e, t) {
                    f[o] = e, f[o + 1] = t, 2 === (o += 2) && (s ? s(_) : v())
                },
                u = "undefined" != typeof window ? window : void 0,
                l = u || {},
                p = l.MutationObserver || l.WebKitMutationObserver,
                c = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e),
                d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function h() {
                var e = setTimeout;
                return function() {
                    return e(_, 1)
                }
            }
            var f = new Array(1e3);

            function _() {
                for (var e = 0; e < o; e += 2)(0, f[e])(f[e + 1]), f[e] = void 0, f[e + 1] = void 0;
                o = 0
            }
            var y, m, g, b, v = void 0;

            function w(e, t) {
                var r = this,
                    n = new this.constructor(E);
                void 0 === n[C] && j(n);
                var o = r._state;
                if (o) {
                    var i = arguments[o - 1];
                    a(function() {
                        return I(o, n, i, r._result)
                    })
                } else R(r, n, e, t);
                return n
            }

            function S(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(E);
                return O(t, e), t
            }
            c ? v = function() {
                return e.nextTick(_)
            } : p ? (m = 0, g = new p(_), b = document.createTextNode(""), g.observe(b, {
                characterData: !0
            }), v = function() {
                b.data = m = ++m % 2
            }) : d ? ((y = new MessageChannel).port1.onmessage = _, v = function() {
                return y.port2.postMessage(0)
            }) : v = void 0 === u && "function" == typeof require ? function() {
                try {
                    var e = Function("return this")().require("vertx");
                    return void 0 !== (i = e.runOnLoop || e.runOnContext) ? function() {
                        i(_)
                    } : h()
                } catch (e) {
                    return h()
                }
            }() : h();
            var C = Math.random().toString(36).substring(2);

            function E() {}
            var $ = void 0,
                P = 1,
                T = 2,
                A = {
                    error: null
                };

            function k(e) {
                try {
                    return e.then
                } catch (e) {
                    return A.error = e, A
                }
            }

            function F(e, t, n) {
                t.constructor === e.constructor && n === w && t.constructor.resolve === S ? function(e, t) {
                    t._state === P ? B(e, t._result) : t._state === T ? U(e, t._result) : R(t, void 0, function(t) {
                        return O(e, t)
                    }, function(t) {
                        return U(e, t)
                    })
                }(e, t) : n === A ? (U(e, A.error), A.error = null) : void 0 === n ? B(e, t) : r(n) ? function(e, t, r) {
                    a(function(e) {
                        var n = !1,
                            o = function(r, o, i, s) {
                                try {
                                    r.call(o, function(r) {
                                        n || (n = !0, t !== r ? O(e, r) : B(e, r))
                                    }, function(t) {
                                        n || (n = !0, U(e, t))
                                    })
                                } catch (e) {
                                    return e
                                }
                            }(r, t, 0, 0, e._label);
                        !n && o && (n = !0, U(e, o))
                    }, e)
                }(e, t, n) : B(e, t)
            }

            function O(e, t) {
                var r, n;
                e === t ? U(e, new TypeError("You cannot resolve a promise with itself")) : (n = typeof(r = t), null === r || "object" !== n && "function" !== n ? B(e, t) : F(e, t, k(t)))
            }

            function x(e) {
                e._onerror && e._onerror(e._result), D(e)
            }

            function B(e, t) {
                e._state === $ && (e._result = t, e._state = P, 0 !== e._subscribers.length && a(D, e))
            }

            function U(e, t) {
                e._state === $ && (e._state = T, e._result = t, a(x, e))
            }

            function R(e, t, r, n) {
                var o = e._subscribers,
                    i = o.length;
                e._onerror = null, o[i] = t, o[i + P] = r, o[i + T] = n, 0 === i && e._state && a(D, e)
            }

            function D(e) {
                var t = e._subscribers,
                    r = e._state;
                if (0 !== t.length) {
                    for (var n = void 0, o = void 0, i = e._result, s = 0; s < t.length; s += 3) n = t[s], o = t[s + r], n ? I(r, n, o, i) : o(i);
                    e._subscribers.length = 0
                }
            }

            function I(e, t, n, o) {
                var i = r(n),
                    s = void 0,
                    a = void 0,
                    u = void 0,
                    l = void 0;
                if (i) {
                    if ((s = function(e, t) {
                            try {
                                return e(t)
                            } catch (e) {
                                return A.error = e, A
                            }
                        }(n, o)) === A ? (l = !0, a = s.error, s.error = null) : u = !0, t === s) return void U(t, new TypeError("A promises callback cannot return that same promise."))
                } else s = o, u = !0;
                t._state !== $ || (i && u ? O(t, s) : l ? U(t, a) : e === P ? B(t, s) : e === T && U(t, s))
            }
            var M = 0;

            function j(e) {
                e[C] = M++, e._state = void 0, e._result = void 0, e._subscribers = []
            }
            var L = function() {
                    function e(e, t) {
                        this._instanceConstructor = e, this.promise = new e(E), this.promise[C] || j(this.promise), n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? B(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && B(this.promise, this._result))) : U(this.promise, new Error("Array Methods must be provided an Array"))
                    }
                    return e.prototype._enumerate = function(e) {
                        for (var t = 0; this._state === $ && t < e.length; t++) this._eachEntry(e[t], t)
                    }, e.prototype._eachEntry = function(e, t) {
                        var r = this._instanceConstructor,
                            n = r.resolve;
                        if (n === S) {
                            var o = k(e);
                            if (o === w && e._state !== $) this._settledAt(e._state, t, e._result);
                            else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                            else if (r === N) {
                                var i = new r(E);
                                F(i, e, o), this._willSettleAt(i, t)
                            } else this._willSettleAt(new r(function(t) {
                                return t(e)
                            }), t)
                        } else this._willSettleAt(n(e), t)
                    }, e.prototype._settledAt = function(e, t, r) {
                        var n = this.promise;
                        n._state === $ && (this._remaining--, e === T ? U(n, r) : this._result[t] = r), 0 === this._remaining && B(n, this._result)
                    }, e.prototype._willSettleAt = function(e, t) {
                        var r = this;
                        R(e, void 0, function(e) {
                            return r._settledAt(P, t, e)
                        }, function(e) {
                            return r._settledAt(T, t, e)
                        })
                    }, e
                }(),
                N = function() {
                    function e(t) {
                        this[C] = M++, this._result = this._state = void 0, this._subscribers = [], E !== t && ("function" != typeof t && function() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }(), this instanceof e ? function(e, t) {
                            try {
                                t(function(t) {
                                    O(e, t)
                                }, function(t) {
                                    U(e, t)
                                })
                            } catch (t) {
                                U(e, t)
                            }
                        }(this, t) : function() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }())
                    }
                    return e.prototype.catch = function(e) {
                        return this.then(null, e)
                    }, e.prototype.finally = function(e) {
                        var t = this.constructor;
                        return r(e) ? this.then(function(r) {
                            return t.resolve(e()).then(function() {
                                return r
                            })
                        }, function(r) {
                            return t.resolve(e()).then(function() {
                                throw r
                            })
                        }) : this.then(e, e)
                    }, e
                }();
            return N.prototype.then = w, N.all = function(e) {
                return new L(this, e).promise
            }, N.race = function(e) {
                var t = this;
                return n(e) ? new t(function(r, n) {
                    for (var o = e.length, i = 0; i < o; i++) t.resolve(e[i]).then(r, n)
                }) : new t(function(e, t) {
                    return t(new TypeError("You must pass an array to race."))
                })
            }, N.resolve = S, N.reject = function(e) {
                var t = new this(E);
                return U(t, e), t
            }, N._setScheduler = function(e) {
                s = e
            }, N._setAsap = function(e) {
                a = e
            }, N._asap = a, N.polyfill = function() {
                var e = void 0;
                if (void 0 !== t) e = t;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (e) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var r = e.Promise;
                if (r) {
                    var n = null;
                    try {
                        n = Object.prototype.toString.call(r.resolve())
                    } catch (e) {}
                    if ("[object Promise]" === n && !r.cast) return
                }
                e.Promise = N
            }, N.Promise = N, N
        })
    }).call(this, _$browser_51, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), _$es6Promise_34 = _$es6Promise_34.exports;
    var _$auto_33 = _$es6Promise_34.polyfill(),
        _$fetchUmd_85 = {
            exports: {}
        },
        __global_85, factory;
    __global_85 = this, factory = function(e) {
        "use strict";
        var t = {
            searchParams: "URLSearchParams" in self,
            iterable: "Symbol" in self && "iterator" in Symbol,
            blob: "FileReader" in self && "Blob" in self && function() {
                try {
                    return new Blob, !0
                } catch (e) {
                    return !1
                }
            }(),
            formData: "FormData" in self,
            arrayBuffer: "ArrayBuffer" in self
        };
        if (t.arrayBuffer) var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
            n = ArrayBuffer.isView || function(e) {
                return e && r.indexOf(Object.prototype.toString.call(e)) > -1
            };

        function o(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }

        function i(e) {
            return "string" != typeof e && (e = String(e)), e
        }

        function s(e) {
            var r = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return t.iterable && (r[Symbol.iterator] = function() {
                return r
            }), r
        }

        function a(e) {
            this.map = {}, e instanceof a ? e.forEach(function(e, t) {
                this.append(t, e)
            }, this) : Array.isArray(e) ? e.forEach(function(e) {
                this.append(e[0], e[1])
            }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
                this.append(t, e[t])
            }, this)
        }

        function u(e) {
            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }

        function l(e) {
            return new Promise(function(t, r) {
                e.onload = function() {
                    t(e.result)
                }, e.onerror = function() {
                    r(e.error)
                }
            })
        }

        function p(e) {
            var t = new FileReader,
                r = l(t);
            return t.readAsArrayBuffer(e), r
        }

        function c(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer
        }

        function d() {
            return this.bodyUsed = !1, this._initBody = function(e) {
                var r;
                this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : t.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : t.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : t.arrayBuffer && t.blob && (r = e) && DataView.prototype.isPrototypeOf(r) ? (this._bodyArrayBuffer = c(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : t.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || n(e)) ? this._bodyArrayBuffer = c(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, t.blob && (this.blob = function() {
                var e = u(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? u(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(p)
            }), this.text = function() {
                var e, t, r, n = u(this);
                if (n) return n;
                if (this._bodyBlob) return e = this._bodyBlob, r = l(t = new FileReader), t.readAsText(e), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
                    for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, t.formData && (this.formData = function() {
                return this.text().then(_)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }
        a.prototype.append = function(e, t) {
            e = o(e), t = i(t);
            var r = this.map[e];
            this.map[e] = r ? r + ", " + t : t
        }, a.prototype.delete = function(e) {
            delete this.map[o(e)]
        }, a.prototype.get = function(e) {
            return e = o(e), this.has(e) ? this.map[e] : null
        }, a.prototype.has = function(e) {
            return this.map.hasOwnProperty(o(e))
        }, a.prototype.set = function(e, t) {
            this.map[o(e)] = i(t)
        }, a.prototype.forEach = function(e, t) {
            for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
        }, a.prototype.keys = function() {
            var e = [];
            return this.forEach(function(t, r) {
                e.push(r)
            }), s(e)
        }, a.prototype.values = function() {
            var e = [];
            return this.forEach(function(t) {
                e.push(t)
            }), s(e)
        }, a.prototype.entries = function() {
            var e = [];
            return this.forEach(function(t, r) {
                e.push([r, t])
            }), s(e)
        }, t.iterable && (a.prototype[Symbol.iterator] = a.prototype.entries);
        var h = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

        function f(e, t) {
            var r, n, o = (t = t || {}).body;
            if (e instanceof f) {
                if (e.bodyUsed) throw new TypeError("Already read");
                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new a(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, o || null == e._bodyInit || (o = e._bodyInit, e.bodyUsed = !0)
            } else this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new a(t.headers)), this.method = (n = (r = t.method || this.method || "GET").toUpperCase(), h.indexOf(n) > -1 ? n : r), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
        }

        function _(e) {
            var t = new FormData;
            return e.trim().split("&").forEach(function(e) {
                if (e) {
                    var r = e.split("="),
                        n = r.shift().replace(/\+/g, " "),
                        o = r.join("=").replace(/\+/g, " ");
                    t.append(decodeURIComponent(n), decodeURIComponent(o))
                }
            }), t
        }

        function y(e, t) {
            t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new a(t.headers), this.url = t.url || "", this._initBody(e)
        }
        f.prototype.clone = function() {
            return new f(this, {
                body: this._bodyInit
            })
        }, d.call(f.prototype), d.call(y.prototype), y.prototype.clone = function() {
            return new y(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new a(this.headers),
                url: this.url
            })
        }, y.error = function() {
            var e = new y(null, {
                status: 0,
                statusText: ""
            });
            return e.type = "error", e
        };
        var m = [301, 302, 303, 307, 308];
        y.redirect = function(e, t) {
            if (-1 === m.indexOf(t)) throw new RangeError("Invalid status code");
            return new y(null, {
                status: t,
                headers: {
                    location: e
                }
            })
        }, e.DOMException = self.DOMException;
        try {
            new e.DOMException
        } catch (t) {
            e.DOMException = function(e, t) {
                this.message = e, this.name = t;
                var r = Error(e);
                this.stack = r.stack
            }, e.DOMException.prototype = Object.create(Error.prototype), e.DOMException.prototype.constructor = e.DOMException
        }

        function g(r, n) {
            return new Promise(function(o, i) {
                var s = new f(r, n);
                if (s.signal && s.signal.aborted) return i(new e.DOMException("Aborted", "AbortError"));
                var u = new XMLHttpRequest;

                function l() {
                    u.abort()
                }
                u.onload = function() {
                    var e, t, r = {
                        status: u.status,
                        statusText: u.statusText,
                        headers: (e = u.getAllResponseHeaders() || "", t = new a, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                            var r = e.split(":"),
                                n = r.shift().trim();
                            if (n) {
                                var o = r.join(":").trim();
                                t.append(n, o)
                            }
                        }), t)
                    };
                    r.url = "responseURL" in u ? u.responseURL : r.headers.get("X-Request-URL");
                    var n = "response" in u ? u.response : u.responseText;
                    o(new y(n, r))
                }, u.onerror = function() {
                    i(new TypeError("Network request failed"))
                }, u.ontimeout = function() {
                    i(new TypeError("Network request failed"))
                }, u.onabort = function() {
                    i(new e.DOMException("Aborted", "AbortError"))
                }, u.open(s.method, s.url, !0), "include" === s.credentials ? u.withCredentials = !0 : "omit" === s.credentials && (u.withCredentials = !1), "responseType" in u && t.blob && (u.responseType = "blob"), s.headers.forEach(function(e, t) {
                    u.setRequestHeader(t, e)
                }), s.signal && (s.signal.addEventListener("abort", l), u.onreadystatechange = function() {
                    4 === u.readyState && s.signal.removeEventListener("abort", l)
                }), u.send(void 0 === s._bodyInit ? null : s._bodyInit)
            })
        }
        g.polyfill = !0, self.fetch || (self.fetch = g, self.Headers = a, self.Request = f, self.Response = y), e.Headers = a, e.Request = f, e.Response = y, e.fetch = g, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, "object" == typeof _$fetchUmd_85.exports ? factory(_$fetchUmd_85.exports) : "function" == typeof define && define.amd ? define(["exports"], factory) : factory(__global_85.WHATWGFetch = {}), _$fetchUmd_85 = _$fetchUmd_85.exports;
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        _extends = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        defaultOptions = {
            limit: 1,
            onStart: function() {},
            onProgress: function() {},
            onPartComplete: function() {},
            onSuccess: function() {},
            onError: function(e) {
                throw e
            }
        };

    function remove(e, t) {
        var r = e.indexOf(t); - 1 !== r && e.splice(r, 1)
    }
    var MultipartUploader = function() {
            function e(t, r) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.options = _extends({}, defaultOptions, r), this.file = t, this.key = this.options.key || null, this.uploadId = this.options.uploadId || null, this.parts = this.options.parts || [], this.isPaused = !1, this.chunks = null, this.chunkState = null, this.uploading = [], this._initChunks()
            }
            return e.prototype._initChunks = function() {
                for (var e = [], t = Math.max(Math.ceil(this.file.size / 1e4), 5242880), r = 0; r < this.file.size; r += t) {
                    var n = Math.min(this.file.size, r + t);
                    e.push(this.file.slice(r, n))
                }
                this.chunks = e, this.chunkState = e.map(function() {
                    return {
                        uploaded: 0,
                        busy: !1,
                        done: !1
                    }
                })
            }, e.prototype._createUpload = function() {
                var e = this;
                return Promise.resolve().then(function() {
                    return e.options.createMultipartUpload()
                }).then(function(e) {
                    if ("object" !== (void 0 === e ? "undefined" : _typeof(e)) || !e || "string" != typeof e.uploadId || "string" != typeof e.key) throw new TypeError("AwsS3/Multipart: Got incorrect result from 'createMultipartUpload()', expected an object '{ uploadId, key }'.");
                    return e
                }).then(function(t) {
                    e.key = t.key, e.uploadId = t.uploadId, e.options.onStart(t)
                }).then(function() {
                    e._uploadParts()
                }).catch(function(t) {
                    e._onError(t)
                })
            }, e.prototype._resumeUpload = function() {
                var e = this;
                return Promise.resolve().then(function() {
                    return e.options.listParts({
                        uploadId: e.uploadId,
                        key: e.key
                    })
                }).then(function(t) {
                    t.forEach(function(t) {
                        var r = t.PartNumber - 1;
                        e.chunkState[r] = {
                            uploaded: t.Size,
                            etag: t.ETag,
                            done: !0
                        }, e.parts.some(function(e) {
                            return e.PartNumber === t.PartNumber
                        }) || e.parts.push({
                            PartNumber: t.PartNumber,
                            ETag: t.ETag
                        })
                    }), e._uploadParts()
                }).catch(function(t) {
                    e._onError(t)
                })
            }, e.prototype._uploadParts = function() {
                var e = this;
                if (!this.isPaused) {
                    var t = this.options.limit - this.uploading.length;
                    if (0 !== t)
                        if (this.chunkState.every(function(e) {
                                return e.done
                            })) this._completeUpload();
                        else {
                            for (var r = [], n = 0; n < this.chunkState.length; n++) {
                                var o = this.chunkState[n];
                                if (!o.done && !o.busy && (r.push(n), r.length >= t)) break
                            }
                            r.forEach(function(t) {
                                e._uploadPart(t)
                            })
                        }
                }
            }, e.prototype._uploadPart = function(e) {
                var t = this,
                    r = this.chunks[e];
                return this.chunkState[e].busy = !0, Promise.resolve().then(function() {
                    return t.options.prepareUploadPart({
                        key: t.key,
                        uploadId: t.uploadId,
                        body: r,
                        number: e + 1
                    })
                }).then(function(e) {
                    if ("object" !== (void 0 === e ? "undefined" : _typeof(e)) || !e || "string" != typeof e.url) throw new TypeError("AwsS3/Multipart: Got incorrect result from 'prepareUploadPart()', expected an object '{ url }'.");
                    return e
                }).then(function(r) {
                    var n = r.url;
                    t._uploadPartBytes(e, n)
                }, function(e) {
                    t._onError(e)
                })
            }, e.prototype._onPartProgress = function(e, t, r) {
                this.chunkState[e].uploaded = t;
                var n = this.chunkState.reduce(function(e, t) {
                    return e + t.uploaded
                }, 0);
                this.options.onProgress(n, this.file.size)
            }, e.prototype._onPartComplete = function(e, t) {
                this.chunkState[e].etag = t, this.chunkState[e].done = !0;
                var r = {
                    PartNumber: e + 1,
                    ETag: t
                };
                this.parts.push(r), this.options.onPartComplete(r), this._uploadParts()
            }, e.prototype._uploadPartBytes = function(e, t) {
                var r = this,
                    n = this.chunks[e],
                    o = new XMLHttpRequest;
                o.open("PUT", t, !0), o.responseType = "text", this.uploading.push(o), o.upload.addEventListener("progress", function(t) {
                    t.lengthComputable && r._onPartProgress(e, t.loaded, t.total)
                }), o.addEventListener("abort", function(t) {
                    remove(r.uploading, t.target), r.chunkState[e].busy = !1
                }), o.addEventListener("load", function(t) {
                    if (remove(r.uploading, t.target), r.chunkState[e].busy = !1, t.target.status < 200 || t.target.status >= 300) r._onError(new Error("Non 2xx"));
                    else {
                        r._onPartProgress(e, n.size, n.size);
                        var o = t.target.getResponseHeader("ETag");
                        null !== o ? r._onPartComplete(e, o) : r._onError(new Error("AwsS3/Multipart: Could not read the ETag header. This likely means CORS is not configured correctly on the S3 Bucket. Seee https://uppy.io/docs/aws-s3-multipart#S3-Bucket-Configuration for instructions."))
                    }
                }), o.addEventListener("error", function(t) {
                    remove(r.uploading, t.target), r.chunkState[e].busy = !1;
                    var n = new Error("Unknown error");
                    n.source = t.target, r._onError(n)
                }), o.send(n)
            }, e.prototype._completeUpload = function() {
                var e = this;
                return this.parts.sort(function(e, t) {
                    return e.PartNumber - t.PartNumber
                }), Promise.resolve().then(function() {
                    return e.options.completeMultipartUpload({
                        key: e.key,
                        uploadId: e.uploadId,
                        parts: e.parts
                    })
                }).then(function(t) {
                    e.options.onSuccess(t)
                }, function(t) {
                    e._onError(t)
                })
            }, e.prototype._abortUpload = function() {
                this.uploading.slice().forEach(function(e) {
                    e.abort()
                }), this.options.abortMultipartUpload({
                    key: this.key,
                    uploadId: this.uploadId
                }), this.uploading = []
            }, e.prototype._onError = function(e) {
                this.options.onError(e)
            }, e.prototype.start = function() {
                this.isPaused = !1, this.uploadId ? this._resumeUpload() : this._createUpload()
            }, e.prototype.pause = function() {
                this.uploading.slice().forEach(function(e) {
                    e.abort()
                }), this.isPaused = !0
            }, e.prototype.abort = function() {
                if (!(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).really) return this.pause();
                this._abortUpload()
            }, e
        }(),
        _$MultipartUploader_88 = MultipartUploader,
        ___extends_92 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        _createClass = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        _$RequestClient_92 = function() {
            function e(t, r) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.uppy = t, this.opts = r, this.onReceiveResponse = this.onReceiveResponse.bind(this)
            }
            return e.prototype.onReceiveResponse = function(e) {
                var t, r = this.uppy.getState().companion || {},
                    n = this.opts.serverUrl,
                    o = e.headers;
                return o.has("i-am") && o.get("i-am") !== r[n] && this.uppy.setState({
                    companion: ___extends_92({}, r, (t = {}, t[n] = o.get("i-am"), t))
                }), e
            }, e.prototype._getUrl = function(e) {
                return /^(https?:|)\/\//.test(e) ? e : this.hostname + "/" + e
            }, e.prototype.get = function(e) {
                var t = this;
                return fetch(this._getUrl(e), {
                    method: "get",
                    headers: this.headers,
                    credentials: "same-origin"
                }).then(this.onReceiveResponse).then(function(e) {
                    return e.json()
                }).catch(function(r) {
                    throw new Error("Could not get " + t._getUrl(e) + ". " + r)
                })
            }, e.prototype.post = function(e, t) {
                var r = this;
                return fetch(this._getUrl(e), {
                    method: "post",
                    headers: this.headers,
                    credentials: "same-origin",
                    body: JSON.stringify(t)
                }).then(this.onReceiveResponse).then(function(t) {
                    if (t.status < 200 || t.status > 300) throw new Error("Could not post " + r._getUrl(e) + ". " + t.statusText);
                    return t.json()
                }).catch(function(t) {
                    throw new Error("Could not post " + r._getUrl(e) + ". " + t)
                })
            }, e.prototype.delete = function(e, t) {
                var r = this;
                return fetch(this.hostname + "/" + e, {
                    method: "delete",
                    headers: this.headers,
                    credentials: "same-origin",
                    body: t ? JSON.stringify(t) : null
                }).then(this.onReceiveResponse).then(function(e) {
                    return e.json()
                }).catch(function(t) {
                    throw new Error("Could not delete " + r._getUrl(e) + ". " + t)
                })
            }, _createClass(e, [{
                key: "hostname",
                get: function() {
                    var e = this.uppy.getState().companion,
                        t = this.opts.serverUrl;
                    return (e && e[t] ? e[t] : t).replace(/\/$/, "")
                }
            }, {
                key: "defaultHeaders",
                get: function() {
                    return {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            }, {
                key: "headers",
                get: function() {
                    return ___extends_92({}, this.defaultHeaders, this.opts.serverHeaders || {})
                }
            }]), e
        }(),
        ___extends_91 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        ___createClass_91 = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        __dummy_91$0 = 0,
        _getName = function(e) {
            return e.split("-").map(function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }).join(" ")
        },
        _$Provider_91 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.provider = n.provider, o.id = o.provider, o.authProvider = n.authProvider || o.provider, o.name = o.opts.name || _getName(o.id), o.tokenKey = "companion-" + o.id + "-auth-token", o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.setAuthToken = function(e) {
                localStorage.setItem(this.tokenKey, e)
            }, t.prototype.checkAuth = function() {
                return this.get(this.id + "/authorized").then(function(e) {
                    return e.authenticated
                })
            }, t.prototype.authUrl = function() {
                return this.hostname + "/" + this.id + "/connect"
            }, t.prototype.fileUrl = function(e) {
                return this.hostname + "/" + this.id + "/get/" + e
            }, t.prototype.list = function(e) {
                return this.get(this.id + "/list/" + (e || ""))
            }, t.prototype.logout = function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : location.href;
                return this.get(this.id + "/logout?redirect=" + t).then(function(t) {
                    return localStorage.removeItem(e.tokenKey), t
                })
            }, t.initPlugin = function(e, t, r) {
                if (e.type = "acquirer", e.files = [], r && (e.opts = ___extends_91({}, r, t)), t.serverPattern) {
                    var n = t.serverPattern;
                    if (!("string" == typeof n || Array.isArray(n) || n instanceof RegExp)) throw new TypeError(e.id + ': the option "serverPattern" must be one of string, Array, RegExp');
                    e.opts.serverPattern = n
                } else /^(?!https?:\/\/).*$/.test(t.serverUrl) ? e.opts.serverPattern = location.protocol + "//" + t.serverUrl.replace(/^\/\//, "") : e.opts.serverPattern = t.serverUrl
            }, ___createClass_91(t, [{
                key: "defaultHeaders",
                get: function() {
                    return ___extends_91({}, e.prototype.defaultHeaders, {
                        "uppy-auth-token": localStorage.getItem(this.tokenKey)
                    })
                }
            }]), t
        }(_$RequestClient_92),
        _$namespaceEmitter_45 = function() {
            var e = {},
                t = e._fns = {};
            return e.emit = function(e, r, n, o, i, s, a) {
                var u = function(e) {
                    for (var r = t[e] ? t[e] : [], n = e.indexOf(":"), o = -1 === n ? [e] : [e.substring(0, n), e.substring(n + 1)], i = Object.keys(t), s = 0, a = i.length; s < a; s++) {
                        var u = i[s];
                        if ("*" === u && (r = r.concat(t[u])), 2 === o.length && o[0] === u) {
                            r = r.concat(t[u]);
                            break
                        }
                    }
                    return r
                }(e);
                u.length && function(e, t, r) {
                    for (var n = 0, o = t.length; n < o && t[n]; n++) t[n].event = e, t[n].apply(t[n], r)
                }(e, u, [r, n, o, i, s, a])
            }, e.on = function(e, r) {
                t[e] || (t[e] = []), t[e].push(r)
            }, e.once = function(t, r) {
                this.on(t, function n() {
                    r.apply(this, arguments), e.off(t, n)
                })
            }, e.off = function(e, t) {
                var r = [];
                if (e && t)
                    for (var n = this._fns[e], o = 0, i = n ? n.length : 0; o < i; o++) n[o] !== t && r.push(n[o]);
                r.length ? this._fns[e] = r : delete this._fns[e]
            }, e
        },
        _$Socket_93 = function() {
            function e(t) {
                var r = this;
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.queued = [], this.isOpen = !1, this.socket = new WebSocket(t.target), this.emitter = _$namespaceEmitter_45(), this.socket.onopen = function(e) {
                    for (r.isOpen = !0; r.queued.length > 0 && r.isOpen;) {
                        var t = r.queued[0];
                        r.send(t.action, t.payload), r.queued = r.queued.slice(1)
                    }
                }, this.socket.onclose = function(e) {
                    r.isOpen = !1
                }, this._handleMessage = this._handleMessage.bind(this), this.socket.onmessage = this._handleMessage, this.close = this.close.bind(this), this.emit = this.emit.bind(this), this.on = this.on.bind(this), this.once = this.once.bind(this), this.send = this.send.bind(this)
            }
            return e.prototype.close = function() {
                return this.socket.close()
            }, e.prototype.send = function(e, t) {
                this.isOpen ? this.socket.send(JSON.stringify({
                    action: e,
                    payload: t
                })) : this.queued.push({
                    action: e,
                    payload: t
                })
            }, e.prototype.on = function(e, t) {
                this.emitter.on(e, t)
            }, e.prototype.emit = function(e, t) {
                this.emitter.emit(e, t)
            }, e.prototype.once = function(e, t) {
                this.emitter.once(e, t)
            }, e.prototype._handleMessage = function(e) {
                try {
                    var t = JSON.parse(e.data);
                    this.emit(t.action, t.payload)
                } catch (e) {
                    console.log(e)
                }
            }, e
        }(),
        __dummy_94$0 = 0,
        __dummy_94$1 = 0,
        __dummy_94$2 = 0,
        _$lib_94 = {
            RequestClient: _$RequestClient_92,
            Provider: _$Provider_91,
            Socket: _$Socket_93
        },
        _$pad_16 = function(e, t) {
            var r = "000000000" + e;
            return r.substr(r.length - t)
        },
        __dummy_14$0 = 0,
        env = "object" == typeof window ? window : self,
        globalCount = Object.keys(env).length,
        clientId = _$pad_16(((navigator.mimeTypes ? navigator.mimeTypes.length : 0) + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4),
        _$fingerprintBrowser_14 = function() {
            return clientId
        },
        getRandomValue, crypto = window.crypto || window.msCrypto;
    if (crypto) {
        var lim = Math.pow(2, 32) - 1;
        getRandomValue = function() {
            return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim)
        }
    } else getRandomValue = Math.random;
    var _$getRandomValue_15 = getRandomValue,
        _$cuid_13 = {},
        __dummy_13$0 = 0,
        __dummy_13$1 = 0,
        __dummy_13$2 = 0,
        c = 0,
        blockSize = 4,
        base = 36,
        discreteValues = Math.pow(base, blockSize);

    function randomBlock() {
        return _$pad_16((_$getRandomValue_15() * discreteValues << 0).toString(base), blockSize)
    }

    function safeCounter() {
        return c = c < discreteValues ? c : 0, ++c - 1
    }

    function cuid() {
        return "c" + (new Date).getTime().toString(base) + _$pad_16(safeCounter().toString(base), blockSize) + _$fingerprintBrowser_14() + (randomBlock() + randomBlock())
    }
    cuid.slug = function() {
        var e = (new Date).getTime().toString(36),
            t = safeCounter().toString(36).slice(-4),
            r = _$fingerprintBrowser_14().slice(0, 1) + _$fingerprintBrowser_14().slice(-1),
            n = randomBlock().slice(-2);
        return e.slice(-2) + t + r + n
    }, cuid.isCuid = function(e) {
        return "string" == typeof e && !!e.startsWith("c")
    }, cuid.isSlug = function(e) {
        if ("string" != typeof e) return !1;
        var t = e.length;
        return t >= 7 && t <= 10
    }, cuid.fingerprint = _$fingerprintBrowser_14, _$cuid_13 = cuid;
    var _$wildcard_86 = {};

    function WildcardMatcher(e, t) {
        this.text = e = e || "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t)
    }
    WildcardMatcher.prototype.match = function(e) {
        var t, r, n = !0,
            o = this.parts,
            i = o.length;
        if ("string" == typeof e || e instanceof String)
            if (this.hasWild || this.text == e) {
                for (r = (e || "").split(this.separator), t = 0; n && t < i; t++) "*" !== o[t] && (n = t < r.length && o[t] === r[t]);
                n = n && r
            } else n = !1;
        else if ("function" == typeof e.splice)
            for (n = [], t = e.length; t--;) this.match(e[t]) && (n[n.length] = e[t]);
        else if ("object" == typeof e)
            for (var s in n = {}, e) this.match(s) && (n[s] = e[s]);
        return n
    }, _$wildcard_86 = function(e, t, r) {
        var n = new WildcardMatcher(e, r || /[\/\.]/);
        return void 0 !== t ? n.match(t) : n
    };
    var __dummy_44$0 = 0,
        reMimePartSplit = /[\/\+\.]/,
        _$mimeMatch_44 = function(e, t) {
            function r(t) {
                var r = _$wildcard_86(t, e, reMimePartSplit);
                return r && r.length >= 2
            }
            return t ? r(t.split(";")[0]) : r
        },
        _$prettierBytes_50 = function(e) {
            if ("number" != typeof e || isNaN(e)) throw new TypeError("Expected a number, got " + typeof e);
            var t = e < 0,
                r = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            if (t && (e = -e), e < 1) return (t ? "-" : "") + e + " B";
            var n = Math.min(Math.floor(Math.log(e) / Math.log(1e3)), r.length - 1);
            e = Number(e / Math.pow(1e3, n));
            var o = r[n];
            return e >= 10 || e % 1 == 0 ? (t ? "-" : "") + e.toFixed(0) + " " + o : (t ? "-" : "") + e.toFixed(1) + " " + o
        },
        _$preact_49 = {
            exports: {}
        };
    ! function() {
        "use strict";

        function e(e, t) {
            var r, n, o, i, s = C;
            for (i = arguments.length; i-- > 2;) S.push(arguments[i]);
            for (t && null != t.children && (S.length || S.push(t.children), delete t.children); S.length;)
                if ((n = S.pop()) && void 0 !== n.pop)
                    for (i = n.length; i--;) S.push(n[i]);
                else "boolean" == typeof n && (n = null), (o = "function" != typeof e) && (null == n ? n = "" : "number" == typeof n ? n = String(n) : "string" != typeof n && (o = !1)), o && r ? s[s.length - 1] += n : s === C ? s = [n] : s.push(n), r = o;
            var a = new v;
            return a.nodeName = e, a.children = s, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== w.vnode && w.vnode(a), a
        }

        function t(e, t) {
            for (var r in t) e[r] = t[r];
            return e
        }

        function r(e, t) {
            null != e && ("function" == typeof e ? e(t) : e.current = t)
        }

        function n(e) {
            !e.__d && (e.__d = !0) && 1 == P.push(e) && (w.debounceRendering || E)(o)
        }

        function o() {
            for (var e; e = P.pop();) e.__d && m(e)
        }

        function i(e, t) {
            return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase()
        }

        function s(e) {
            var r = t({}, e.attributes);
            r.children = e.children;
            var n = e.nodeName.defaultProps;
            if (void 0 !== n)
                for (var o in n) void 0 === r[o] && (r[o] = n[o]);
            return r
        }

        function a(e) {
            var t = e.parentNode;
            t && t.removeChild(e)
        }

        function u(e, t, n, o, i) {
            if ("className" === t && (t = "class"), "key" === t);
            else if ("ref" === t) r(n, null), r(o, e);
            else if ("class" !== t || i)
                if ("style" === t) {
                    if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
                        if ("string" != typeof n)
                            for (var s in n) s in o || (e.style[s] = "");
                        for (var s in o) e.style[s] = "number" == typeof o[s] && !1 === $.test(s) ? o[s] + "px" : o[s]
                    }
                } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");
            else if ("o" == t[0] && "n" == t[1]) {
                var a = t !== (t = t.replace(/Capture$/, ""));
                t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, l, a) : e.removeEventListener(t, l, a), (e.__l || (e.__l = {}))[t] = o
            } else if ("list" !== t && "type" !== t && !i && t in e) {
                try {
                    e[t] = null == o ? "" : o
                } catch (e) {}
                null != o && !1 !== o || "spellcheck" == t || e.removeAttribute(t)
            } else {
                var u = i && t !== (t = t.replace(/^xlink:?/, ""));
                null == o || !1 === o ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o))
            } else e.className = o || ""
        }

        function l(e) {
            return this.__l[e.type](w.event && w.event(e) || e)
        }

        function p() {
            for (var e; e = T.shift();) w.afterMount && w.afterMount(e), e.componentDidMount && e.componentDidMount()
        }

        function c(e, t, r, n, o, l) {
            A++ || (k = null != o && void 0 !== o.ownerSVGElement, F = null != e && !("__preactattr_" in e));
            var c = function e(t, r, n, o, l) {
                var p = t,
                    c = k;
                if (null != r && "boolean" != typeof r || (r = ""), "string" == typeof r || "number" == typeof r) return t && void 0 !== t.splitText && t.parentNode && (!t._component || l) ? t.nodeValue != r && (t.nodeValue = r) : (p = document.createTextNode(r), t && (t.parentNode && t.parentNode.replaceChild(p, t), d(t, !0))), p.__preactattr_ = !0, p;
                var h, _, m = r.nodeName;
                if ("function" == typeof m) return function(e, t, r, n) {
                    for (var o = e && e._component, i = o, a = e, u = o && e._componentConstructor === t.nodeName, l = u, p = s(t); o && !l && (o = o.__u);) l = o.constructor === t.nodeName;
                    return o && l && (!n || o._component) ? (y(o, p, 3, r, n), e = o.base) : (i && !u && (g(i), e = a = null), o = f(t.nodeName, p, r), e && !o.__b && (o.__b = e, a = null), y(o, p, 1, r, n), e = o.base, a && e !== a && (a._component = null, d(a, !1))), e
                }(t, r, n, o);
                if (k = "svg" === m || "foreignObject" !== m && k, m = String(m), (!t || !i(t, m)) && (h = m, (_ = k ? document.createElementNS("http://www.w3.org/2000/svg", h) : document.createElement(h)).__n = h, p = _, t)) {
                    for (; t.firstChild;) p.appendChild(t.firstChild);
                    t.parentNode && t.parentNode.replaceChild(p, t), d(t, !0)
                }
                var b = p.firstChild,
                    v = p.__preactattr_,
                    w = r.children;
                if (null == v) {
                    v = p.__preactattr_ = {};
                    for (var S = p.attributes, C = S.length; C--;) v[S[C].name] = S[C].value
                }
                return !F && w && 1 === w.length && "string" == typeof w[0] && null != b && void 0 !== b.splitText && null == b.nextSibling ? b.nodeValue != w[0] && (b.nodeValue = w[0]) : (w && w.length || null != b) && function(t, r, n, o, s) {
                        var u, l, p, c, h, f, _, y, m = t.childNodes,
                            g = [],
                            b = {},
                            v = 0,
                            w = 0,
                            S = m.length,
                            C = 0,
                            E = r ? r.length : 0;
                        if (0 !== S)
                            for (var $ = 0; $ < S; $++) {
                                var P = m[$],
                                    T = P.__preactattr_,
                                    A = E && T ? P._component ? P._component.__k : T.key : null;
                                null != A ? (v++, b[A] = P) : (T || (void 0 !== P.splitText ? !s || P.nodeValue.trim() : s)) && (g[C++] = P)
                            }
                        if (0 !== E)
                            for (var $ = 0; $ < E; $++) {
                                c = r[$], h = null;
                                var A = c.key;
                                if (null != A) v && void 0 !== b[A] && (h = b[A], b[A] = void 0, v--);
                                else if (w < C)
                                    for (u = w; u < C; u++)
                                        if (void 0 !== g[u] && (f = l = g[u], y = s, "string" == typeof(_ = c) || "number" == typeof _ ? void 0 !== f.splitText : "string" == typeof _.nodeName ? !f._componentConstructor && i(f, _.nodeName) : y || f._componentConstructor === _.nodeName)) {
                                            h = l, g[u] = void 0, u === C - 1 && C--, u === w && w++;
                                            break
                                        }
                                h = e(h, c, n, o), p = m[$], h && h !== t && h !== p && (null == p ? t.appendChild(h) : h === p.nextSibling ? a(p) : t.insertBefore(h, p))
                            }
                        if (v)
                            for (var $ in b) void 0 !== b[$] && d(b[$], !1);
                        for (; w <= C;) void 0 !== (h = g[C--]) && d(h, !1)
                    }(p, w, n, o, F || null != v.dangerouslySetInnerHTML),
                    function(e, t, r) {
                        var n;
                        for (n in r) t && null != t[n] || null == r[n] || u(e, n, r[n], r[n] = void 0, k);
                        for (n in t) "children" === n || "innerHTML" === n || n in r && t[n] === ("value" === n || "checked" === n ? e[n] : r[n]) || u(e, n, r[n], r[n] = t[n], k)
                    }(p, r.attributes, v), k = c, p
            }(e, t, r, n, l);
            return o && c.parentNode !== o && o.appendChild(c), --A || (F = !1, l || p()), c
        }

        function d(e, t) {
            var n = e._component;
            n ? g(n) : (null != e.__preactattr_ && r(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || a(e), h(e))
        }

        function h(e) {
            for (e = e.lastChild; e;) {
                var t = e.previousSibling;
                d(e, !0), e = t
            }
        }

        function f(e, t, r) {
            var n, o = O.length;
            for (e.prototype && e.prototype.render ? (n = new e(t, r), b.call(n, t, r)) : ((n = new b(t, r)).constructor = e, n.render = _); o--;)
                if (O[o].constructor === e) return n.__b = O[o].__b, O.splice(o, 1), n;
            return n
        }

        function _(e, t, r) {
            return this.constructor(e, r)
        }

        function y(e, t, o, i, s) {
            e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || s ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === w.syncComponentUpdates && e.base ? n(e) : m(e, 1, s)), r(e.__r, e))
        }

        function m(e, r, n, o) {
            if (!e.__x) {
                var i, a, u, l = e.props,
                    h = e.state,
                    _ = e.context,
                    b = e.__p || l,
                    v = e.__s || h,
                    S = e.__c || _,
                    C = e.base,
                    E = e.__b,
                    $ = C || E,
                    P = e._component,
                    k = !1,
                    F = S;
                if (e.constructor.getDerivedStateFromProps && (h = t(t({}, h), e.constructor.getDerivedStateFromProps(l, h)), e.state = h), C && (e.props = b, e.state = v, e.context = S, 2 !== r && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(l, h, _) ? k = !0 : e.componentWillUpdate && e.componentWillUpdate(l, h, _), e.props = l, e.state = h, e.context = _), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !k) {
                    i = e.render(l, h, _), e.getChildContext && (_ = t(t({}, _), e.getChildContext())), C && e.getSnapshotBeforeUpdate && (F = e.getSnapshotBeforeUpdate(b, v));
                    var O, x, B = i && i.nodeName;
                    if ("function" == typeof B) {
                        var U = s(i);
                        (a = P) && a.constructor === B && U.key == a.__k ? y(a, U, 1, _, !1) : (O = a, e._component = a = f(B, U, _), a.__b = a.__b || E, a.__u = e, y(a, U, 0, _, !1), m(a, 1, n, !0)), x = a.base
                    } else u = $, (O = P) && (u = e._component = null), ($ || 1 === r) && (u && (u._component = null), x = c(u, i, _, n || !C, $ && $.parentNode, !0));
                    if ($ && x !== $ && a !== P) {
                        var R = $.parentNode;
                        R && x !== R && (R.replaceChild(x, $), O || ($._component = null, d($, !1)))
                    }
                    if (O && g(O), e.base = x, x && !o) {
                        for (var D = e, I = e; I = I.__u;)(D = I).base = x;
                        x._component = D, x._componentConstructor = D.constructor
                    }
                }
                for (!C || n ? T.push(e) : k || (e.componentDidUpdate && e.componentDidUpdate(b, v, F), w.afterUpdate && w.afterUpdate(e)); e.__h.length;) e.__h.pop().call(e);
                A || o || p()
            }
        }

        function g(e) {
            w.beforeUnmount && w.beforeUnmount(e);
            var t = e.base;
            e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
            var n = e._component;
            n ? g(n) : t && (null != t.__preactattr_ && r(t.__preactattr_.ref, null), e.__b = t, a(t), O.push(e), h(t)), r(e.__r, null)
        }

        function b(e, t) {
            this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = []
        }
        var v = function() {},
            w = {},
            S = [],
            C = [],
            E = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
            $ = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
            P = [],
            T = [],
            A = 0,
            k = !1,
            F = !1,
            O = [];
        t(b.prototype, {
            setState: function(e, r) {
                this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), r && this.__h.push(r), n(this)
            },
            forceUpdate: function(e) {
                e && this.__h.push(e), m(this, 2)
            },
            render: function() {}
        });
        var x = {
            h: e,
            createElement: e,
            cloneElement: function(r, n) {
                return e(r.nodeName, t(t({}, r.attributes), n), arguments.length > 2 ? [].slice.call(arguments, 2) : r.children)
            },
            createRef: function() {
                return {}
            },
            Component: b,
            render: function(e, t, r) {
                return c(r, e, {}, !1, t, !1)
            },
            rerender: o,
            options: w
        };
        _$preact_49.exports = x
    }(), _$preact_49 = _$preact_49.exports;
    var ___typeof_167 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        _$isDOMElement_167 = function(e) {
            return e && "object" === (void 0 === e ? "undefined" : ___typeof_167(e)) && e.nodeType === Node.ELEMENT_NODE
        },
        ___typeof_158 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        __dummy_158$0 = 0,
        _$findDOMElement_158 = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
            return "string" == typeof e ? t.querySelector(e) : "object" === (void 0 === e ? "undefined" : ___typeof_158(e)) && _$isDOMElement_167(e) ? e : void 0
        },
        ___typeof_95 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        ___extends_95 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_95$0 = 0,
        __dummy_95$1 = 0,
        _$Plugin_95 = function() {
            function e(t, r) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.uppy = t, this.opts = r || {}, this.update = this.update.bind(this), this.mount = this.mount.bind(this), this.install = this.install.bind(this), this.uninstall = this.uninstall.bind(this)
            }
            return e.prototype.getPluginState = function() {
                return this.uppy.getState().plugins[this.id] || {}
            }, e.prototype.setPluginState = function(e) {
                var t, r = this.uppy.getState().plugins;
                this.uppy.setState({
                    plugins: ___extends_95({}, r, (t = {}, t[this.id] = ___extends_95({}, r[this.id], e), t))
                })
            }, e.prototype.update = function(e) {
                void 0 !== this.el && this._updateUI && this._updateUI(e)
            }, e.prototype.onMount = function() {}, e.prototype.mount = function(t, r) {
                var n, o, i, s = this,
                    a = r.id,
                    u = _$findDOMElement_158(t);
                if (u) return this.isTargetDOMEl = !0, this.rerender = function(e) {
                    s.uppy.getPlugin(s.id) && (s.el = _$preact_49.render(s.render(e), u, s.el))
                }, this._updateUI = (n = this.rerender, o = null, i = null, function() {
                    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    return i = t, o || (o = Promise.resolve().then(function() {
                        return o = null, n.apply(void 0, i)
                    })), o
                }), this.uppy.log("Installing " + a + " to a DOM element"), this.opts.replaceTargetContent && (u.innerHTML = ""), this.el = _$preact_49.render(this.render(this.uppy.getState()), u), this.onMount(), this.el;
                var l = void 0;
                if ("object" === (void 0 === t ? "undefined" : ___typeof_95(t)) && t instanceof e) l = t;
                else if ("function" == typeof t) {
                    var p = t;
                    this.uppy.iteratePlugins(function(e) {
                        if (e instanceof p) return l = e, !1
                    })
                }
                if (l) return this.uppy.log("Installing " + a + " to " + l.id), this.parent = l, this.el = l.addTarget(r), this.onMount(), this.el;
                throw this.uppy.log("Not installing " + a), new Error("Invalid target option given to " + a + ". Please make sure that the element \n      exists on the page, or that the plugin you are targeting has been installed. Check that the <script> tag initializing Uppy \n      comes at the bottom of the page, before the closing </body> tag (see https://github.com/transloadit/uppy/issues/1042).")
            }, e.prototype.render = function(e) {
                throw new Error("Extend the render method to add your plugin to a DOM element")
            }, e.prototype.addTarget = function(e) {
                throw new Error("Extend the addTarget method to add your plugin to another plugin's target")
            }, e.prototype.unmount = function() {
                this.isTargetDOMEl && this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
            }, e.prototype.install = function() {}, e.prototype.uninstall = function() {
                this.unmount()
            }, e
        }(),
        _$supportsUploadProgress_97 = function(e) {
            if (null == e && (e = "undefined" != typeof navigator ? navigator.userAgent : null), !e) return !0;
            var t = /Edge\/(\d+\.\d+)/.exec(e);
            if (!t) return !0;
            var r = t[1].split("."),
                n = r[0],
                o = r[1];
            return n = parseInt(n, 10), o = parseInt(o, 10), n < 15 || 15 === n && o < 15063 || n > 18 || 18 === n && o >= 18218
        },
        ___extends_141 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        DefaultStore = function() {
            function e() {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.state = {}, this.callbacks = []
            }
            return e.prototype.getState = function() {
                return this.state
            }, e.prototype.setState = function(e) {
                var t = ___extends_141({}, this.state),
                    r = ___extends_141({}, this.state, e);
                this.state = r, this._publish(t, r, e)
            }, e.prototype.subscribe = function(e) {
                var t = this;
                return this.callbacks.push(e),
                    function() {
                        t.callbacks.splice(t.callbacks.indexOf(e), 1)
                    }
            }, e.prototype._publish = function() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                this.callbacks.forEach(function(e) {
                    e.apply(void 0, t)
                })
            }, e
        }(),
        _$lib_141 = function() {
            return new DefaultStore
        },
        ___extends_153 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        _$Translator_153 = function() {
            function e(t) {
                var r = this;
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.locale = {
                    strings: {},
                    pluralize: function(e) {
                        return 1 === e ? 0 : 1
                    }
                }, Array.isArray(t) ? t.forEach(function(e) {
                    return r._apply(e)
                }) : this._apply(t)
            }
            return e.prototype._apply = function(e) {
                if (e && e.strings) {
                    var t = this.locale;
                    this.locale = ___extends_153({}, t, {
                        strings: ___extends_153({}, t.strings, e.strings)
                    }), this.locale.pluralize = e.pluralize || t.pluralize
                }
            }, e.prototype.interpolate = function(e, t) {
                var r = String.prototype,
                    n = r.split,
                    o = r.replace,
                    i = /\$/g,
                    s = [e];
                for (var a in t)
                    if ("_" !== a && t.hasOwnProperty(a)) {
                        var u = t[a];
                        "string" == typeof u && (u = o.call(t[a], i, "$$$$")), s = l(s, new RegExp("%\\{" + a + "\\}", "g"), u)
                    }
                return s;

                function l(e, t, r) {
                    var o = [];
                    return e.forEach(function(e) {
                        n.call(e, t).forEach(function(e, t, n) {
                            "" !== e && o.push(e), t < n.length - 1 && o.push(r)
                        })
                    }), o
                }
            }, e.prototype.translate = function(e, t) {
                return this.translateArray(e, t).join("")
            }, e.prototype.translateArray = function(e, t) {
                if (t && void 0 !== t.smart_count) {
                    var r = this.locale.pluralize(t.smart_count);
                    return this.interpolate(this.locale.strings[e][r], t)
                }
                return this.interpolate(this.locale.strings[e], t)
            }, e
        }(),
        _$generateFileID_159 = function(e) {
            return ["uppy", e.name ? e.name.toLowerCase().replace(/[^A-Z0-9]/gi, "") : "", e.type, e.data.size, e.data.lastModified].filter(function(e) {
                return e
            }).join("-")
        },
        _$getFileNameAndExtension_161 = function(e) {
            var t = /(?:\.([^.]+))?$/.exec(e)[1];
            return {
                name: e.replace("." + t, ""),
                extension: t
            }
        },
        _$mimeTypes_172 = {
            md: "text/markdown",
            markdown: "text/markdown",
            mp4: "video/mp4",
            mp3: "audio/mp3",
            svg: "image/svg+xml",
            jpg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            yaml: "text/yaml",
            yml: "text/yaml",
            csv: "text/csv",
            avi: "video/x-msvideo",
            mks: "video/x-matroska",
            mkv: "video/x-matroska",
            mov: "video/quicktime",
            doc: "application/msword",
            docm: "application/vnd.ms-word.document.macroenabled.12",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            dot: "application/msword",
            dotm: "application/vnd.ms-word.template.macroenabled.12",
            dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
            xla: "application/vnd.ms-excel",
            xlam: "application/vnd.ms-excel.addin.macroenabled.12",
            xlc: "application/vnd.ms-excel",
            xlf: "application/x-xliff+xml",
            xlm: "application/vnd.ms-excel",
            xls: "application/vnd.ms-excel",
            xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
            xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            xlt: "application/vnd.ms-excel",
            xltm: "application/vnd.ms-excel.template.macroenabled.12",
            xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
            xlw: "application/vnd.ms-excel"
        },
        __dummy_162$0 = 0,
        __dummy_162$1 = 0,
        _$getFileType_162 = function(e) {
            var t = e.name ? _$getFileNameAndExtension_161(e.name).extension : null;
            return t = t ? t.toLowerCase() : null, e.isRemote ? e.type ? e.type : _$mimeTypes_172[t] : e.type ? e.type : t && _$mimeTypes_172[t] ? _$mimeTypes_172[t] : "application/octet-stream"
        };

    function __pad_166(e) {
        return 2 !== e.length ? 0 + e : e
    }
    var _$getTimeStamp_166 = function() {
            var e = new Date;
            return __pad_166(e.getHours().toString()) + ":" + __pad_166(e.getMinutes().toString()) + ":" + __pad_166(e.getSeconds().toString())
        },
        _$lib_96 = {},
        ___typeof_96 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        ___extends_96 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        ___createClass_96 = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        __dummy_96$0 = 0,
        __dummy_96$1 = 0,
        __dummy_96$2 = 0,
        __dummy_96$3 = 0,
        __dummy_96$4 = 0,
        __dummy_96$5 = 0,
        __dummy_96$6 = 0,
        __dummy_96$7 = 0,
        __dummy_96$8 = 0,
        __dummy_96$9 = 0,
        __dummy_96$10 = 0,
        __dummy_96$11 = 0,
        Uppy = function() {
            function e(t) {
                var r = this;
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = {
                        strings: {
                            youCanOnlyUploadX: {
                                0: "You can only upload %{smart_count} file",
                                1: "You can only upload %{smart_count} files"
                            },
                            youHaveToAtLeastSelectX: {
                                0: "You have to select at least %{smart_count} file",
                                1: "You have to select at least %{smart_count} files"
                            },
                            exceedsSize: "This file exceeds maximum allowed size of",
                            youCanOnlyUploadFileTypes: "You can only upload:",
                            companionError: "Connection with Companion failed",
                            failedToUpload: "Failed to upload %{file}",
                            noInternetConnection: "No Internet connection",
                            connectedToInternet: "Connected to the Internet",
                            noFilesFound: "You have no files or folders here",
                            selectXFiles: {
                                0: "Select %{smart_count} file",
                                1: "Select %{smart_count} files"
                            },
                            cancel: "Cancel",
                            logOut: "Log out",
                            filter: "Filter",
                            resetFilter: "Reset filter"
                        }
                    },
                    o = {
                        id: "uppy",
                        autoProceed: !1,
                        allowMultipleUploads: !0,
                        debug: !1,
                        restrictions: {
                            maxFileSize: null,
                            maxNumberOfFiles: null,
                            minNumberOfFiles: null,
                            allowedFileTypes: null
                        },
                        meta: {},
                        onBeforeFileAdded: function(e, t) {
                            return e
                        },
                        onBeforeUpload: function(e) {
                            return e
                        },
                        locale: n,
                        store: _$lib_141()
                    };
                this.opts = ___extends_96({}, o, t), this.opts.restrictions = ___extends_96({}, o.restrictions, this.opts.restrictions), this.translator = new _$Translator_153([n, this.opts.locale]), this.locale = this.translator.locale, this.i18n = this.translator.translate.bind(this.translator), this.plugins = {}, this.getState = this.getState.bind(this), this.getPlugin = this.getPlugin.bind(this), this.setFileMeta = this.setFileMeta.bind(this), this.setFileState = this.setFileState.bind(this), this.log = this.log.bind(this), this.info = this.info.bind(this), this.hideInfo = this.hideInfo.bind(this), this.addFile = this.addFile.bind(this), this.removeFile = this.removeFile.bind(this), this.pauseResume = this.pauseResume.bind(this), this._calculateProgress = this._calculateProgress.bind(this), this.updateOnlineStatus = this.updateOnlineStatus.bind(this), this.resetProgress = this.resetProgress.bind(this), this.pauseAll = this.pauseAll.bind(this), this.resumeAll = this.resumeAll.bind(this), this.retryAll = this.retryAll.bind(this), this.cancelAll = this.cancelAll.bind(this), this.retryUpload = this.retryUpload.bind(this), this.upload = this.upload.bind(this), this.emitter = _$namespaceEmitter_45(), this.on = this.on.bind(this), this.off = this.off.bind(this), this.once = this.emitter.once.bind(this.emitter), this.emit = this.emitter.emit.bind(this.emitter), this.preProcessors = [], this.uploaders = [], this.postProcessors = [], this.store = this.opts.store, this.setState({
                    plugins: {},
                    files: {},
                    currentUploads: {},
                    allowNewUpload: !0,
                    capabilities: {
                        uploadProgress: _$supportsUploadProgress_97(),
                        resumableUploads: !1
                    },
                    totalProgress: 0,
                    meta: ___extends_96({}, this.opts.meta),
                    info: {
                        isHidden: !0,
                        type: "info",
                        message: ""
                    }
                }), this._storeUnsubscribe = this.store.subscribe(function(e, t, n) {
                    r.emit("state-update", e, t, n), r.updateAll(t)
                }), this.opts.debug && "undefined" != typeof window && (window.uppyLog = "", window[this.opts.id] = this), this._addListeners()
            }
            return e.prototype.on = function(e, t) {
                return this.emitter.on(e, t), this
            }, e.prototype.off = function(e, t) {
                return this.emitter.off(e, t), this
            }, e.prototype.updateAll = function(e) {
                this.iteratePlugins(function(t) {
                    t.update(e)
                })
            }, e.prototype.setState = function(e) {
                this.store.setState(e)
            }, e.prototype.getState = function() {
                return this.store.getState()
            }, e.prototype.setFileState = function(e, t) {
                var r;
                if (!this.getState().files[e]) throw new Error("Can\u2019t set state for " + e + " (the file could have been removed)");
                this.setState({
                    files: ___extends_96({}, this.getState().files, (r = {}, r[e] = ___extends_96({}, this.getState().files[e], t), r))
                })
            }, e.prototype.resetProgress = function() {
                var e = {
                        percentage: 0,
                        bytesUploaded: 0,
                        uploadComplete: !1,
                        uploadStarted: !1
                    },
                    t = ___extends_96({}, this.getState().files),
                    r = {};
                Object.keys(t).forEach(function(n) {
                    var o = ___extends_96({}, t[n]);
                    o.progress = ___extends_96({}, o.progress, e), r[n] = o
                }), this.setState({
                    files: r,
                    totalProgress: 0
                }), this.emit("reset-progress")
            }, e.prototype.addPreProcessor = function(e) {
                this.preProcessors.push(e)
            }, e.prototype.removePreProcessor = function(e) {
                var t = this.preProcessors.indexOf(e); - 1 !== t && this.preProcessors.splice(t, 1)
            }, e.prototype.addPostProcessor = function(e) {
                this.postProcessors.push(e)
            }, e.prototype.removePostProcessor = function(e) {
                var t = this.postProcessors.indexOf(e); - 1 !== t && this.postProcessors.splice(t, 1)
            }, e.prototype.addUploader = function(e) {
                this.uploaders.push(e)
            }, e.prototype.removeUploader = function(e) {
                var t = this.uploaders.indexOf(e); - 1 !== t && this.uploaders.splice(t, 1)
            }, e.prototype.setMeta = function(e) {
                var t = ___extends_96({}, this.getState().meta, e),
                    r = ___extends_96({}, this.getState().files);
                Object.keys(r).forEach(function(t) {
                    r[t] = ___extends_96({}, r[t], {
                        meta: ___extends_96({}, r[t].meta, e)
                    })
                }), this.log("Adding metadata:"), this.log(e), this.setState({
                    meta: t,
                    files: r
                })
            }, e.prototype.setFileMeta = function(e, t) {
                var r = ___extends_96({}, this.getState().files);
                if (r[e]) {
                    var n = ___extends_96({}, r[e].meta, t);
                    r[e] = ___extends_96({}, r[e], {
                        meta: n
                    }), this.setState({
                        files: r
                    })
                } else this.log("Was trying to set metadata for a file that\u2019s not with us anymore: ", e)
            }, e.prototype.getFile = function(e) {
                return this.getState().files[e]
            }, e.prototype.getFiles = function() {
                var e = this.getState().files;
                return Object.keys(e).map(function(t) {
                    return e[t]
                })
            }, e.prototype._checkMinNumberOfFiles = function(e) {
                var t = this.opts.restrictions.minNumberOfFiles;
                if (Object.keys(e).length < t) throw new Error("" + this.i18n("youHaveToAtLeastSelectX", {
                    smart_count: t
                }))
            }, e.prototype._checkRestrictions = function(e) {
                var t = this.opts.restrictions,
                    r = t.maxFileSize,
                    n = t.maxNumberOfFiles,
                    o = t.allowedFileTypes;
                if (n && Object.keys(this.getState().files).length + 1 > n) throw new Error("" + this.i18n("youCanOnlyUploadX", {
                    smart_count: n
                }));
                if (o && !(o.filter(function(t) {
                        return t.indexOf("/") > -1 ? !!e.type && _$mimeMatch_44(e.type, t) : "." === t[0] && e.extension === t.substr(1) ? e.extension : void 0
                    }).length > 0)) {
                    var i = o.join(", ");
                    throw new Error(this.i18n("youCanOnlyUploadFileTypes") + " " + i)
                }
                if (r && e.data.size > r) throw new Error(this.i18n("exceedsSize") + " " + _$prettierBytes_50(r))
            }, e.prototype.addFile = function(e) {
                var t, r = this,
                    n = this.getState(),
                    o = n.files,
                    i = function(e) {
                        var t = "object" === (void 0 === e ? "undefined" : ___typeof_96(e)) ? e : new Error(e);
                        throw r.log(t.message), r.info(t.message, "error", 5e3), t
                    };
                !1 === n.allowNewUpload && i(new Error("Cannot add new files: already uploading."));
                var s = this.opts.onBeforeFileAdded(e, o);
                if (!1 !== s) {
                    if ("object" === (void 0 === s ? "undefined" : ___typeof_96(s)) && s) {
                        if (s.then) throw new TypeError("onBeforeFileAdded() returned a Promise, but this is no longer supported. It must be synchronous.");
                        e = s
                    }
                    var a, u = _$getFileType_162(e);
                    a = e.name ? e.name : "image" === u.split("/")[0] ? u.split("/")[0] + "." + u.split("/")[1] : "noname";
                    var l = _$getFileNameAndExtension_161(a).extension,
                        p = e.isRemote || !1,
                        c = _$generateFileID_159(e),
                        d = e.meta || {};
                    d.name = a, d.type = u;
                    var h = {
                        source: e.source || "",
                        id: c,
                        name: a,
                        extension: l || "",
                        meta: ___extends_96({}, this.getState().meta, d),
                        type: u,
                        data: e.data,
                        progress: {
                            percentage: 0,
                            bytesUploaded: 0,
                            bytesTotal: e.data.size || 0,
                            uploadComplete: !1,
                            uploadStarted: !1
                        },
                        size: e.data.size || 0,
                        isRemote: p,
                        remote: e.remote || "",
                        preview: e.preview
                    };
                    try {
                        this._checkRestrictions(h)
                    } catch (e) {
                        i(e)
                    }
                    this.setState({
                        files: ___extends_96({}, o, (t = {}, t[c] = h, t))
                    }), this.emit("file-added", h), this.log("Added file: " + a + ", " + c + ", mime type: " + u), this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(function() {
                        r.scheduledAutoProceed = null, r.upload().catch(function(e) {
                            console.error(e.stack || e.message || e)
                        })
                    }, 4))
                } else this.log("Not adding file because onBeforeFileAdded returned false")
            }, e.prototype.removeFile = function(e) {
                var t = this,
                    r = this.getState(),
                    n = r.files,
                    o = r.currentUploads,
                    i = ___extends_96({}, n),
                    s = i[e];
                delete i[e];
                var a = ___extends_96({}, o),
                    u = [];
                Object.keys(a).forEach(function(t) {
                    var r = o[t].fileIDs.filter(function(t) {
                        return t !== e
                    });
                    0 !== r.length ? a[t] = ___extends_96({}, o[t], {
                        fileIDs: r
                    }) : u.push(t)
                }), this.setState({
                    currentUploads: a,
                    files: i
                }), u.forEach(function(e) {
                    t._removeUpload(e)
                }), this._calculateTotalProgress(), this.emit("file-removed", s), this.log("File removed: " + s.id)
            }, e.prototype.pauseResume = function(e) {
                if (this.getState().capabilities.resumableUploads && !this.getFile(e).uploadComplete) {
                    var t = !this.getFile(e).isPaused;
                    return this.setFileState(e, {
                        isPaused: t
                    }), this.emit("upload-pause", e, t), t
                }
            }, e.prototype.pauseAll = function() {
                var e = ___extends_96({}, this.getState().files);
                Object.keys(e).filter(function(t) {
                    return !e[t].progress.uploadComplete && e[t].progress.uploadStarted
                }).forEach(function(t) {
                    var r = ___extends_96({}, e[t], {
                        isPaused: !0
                    });
                    e[t] = r
                }), this.setState({
                    files: e
                }), this.emit("pause-all")
            }, e.prototype.resumeAll = function() {
                var e = ___extends_96({}, this.getState().files);
                Object.keys(e).filter(function(t) {
                    return !e[t].progress.uploadComplete && e[t].progress.uploadStarted
                }).forEach(function(t) {
                    var r = ___extends_96({}, e[t], {
                        isPaused: !1,
                        error: null
                    });
                    e[t] = r
                }), this.setState({
                    files: e
                }), this.emit("resume-all")
            }, e.prototype.retryAll = function() {
                var e = ___extends_96({}, this.getState().files),
                    t = Object.keys(e).filter(function(t) {
                        return e[t].error
                    });
                t.forEach(function(t) {
                    var r = ___extends_96({}, e[t], {
                        isPaused: !1,
                        error: null
                    });
                    e[t] = r
                }), this.setState({
                    files: e,
                    error: null
                }), this.emit("retry-all", t);
                var r = this._createUpload(t);
                return this._runUpload(r)
            }, e.prototype.cancelAll = function() {
                var e = this;
                this.emit("cancel-all"), Object.keys(this.getState().files).forEach(function(t) {
                    e.removeFile(t)
                }), this.setState({
                    allowNewUpload: !0,
                    totalProgress: 0,
                    error: null
                })
            }, e.prototype.retryUpload = function(e) {
                var t = ___extends_96({}, this.getState().files),
                    r = ___extends_96({}, t[e], {
                        error: null,
                        isPaused: !1
                    });
                t[e] = r, this.setState({
                    files: t
                }), this.emit("upload-retry", e);
                var n = this._createUpload([e]);
                return this._runUpload(n)
            }, e.prototype.reset = function() {
                this.cancelAll()
            }, e.prototype._calculateProgress = function(e, t) {
                this.getFile(e.id) ? (this.setFileState(e.id, {
                    progress: ___extends_96({}, this.getFile(e.id).progress, {
                        bytesUploaded: t.bytesUploaded,
                        bytesTotal: t.bytesTotal,
                        percentage: Math.floor((t.bytesUploaded / t.bytesTotal * 100).toFixed(2))
                    })
                }), this._calculateTotalProgress()) : this.log("Not setting progress for a file that has been removed: " + e.id)
            }, e.prototype._calculateTotalProgress = function() {
                var e = this.getFiles().filter(function(e) {
                    return e.progress.uploadStarted
                });
                if (0 === e.length) return this.emit("progress", 0), void this.setState({
                    totalProgress: 0
                });
                var t = e.filter(function(e) {
                        return null != e.progress.bytesTotal
                    }),
                    r = e.filter(function(e) {
                        return null == e.progress.bytesTotal
                    });
                if (0 !== t.length) {
                    var n = t.reduce(function(e, t) {
                            return e + t.progress.bytesTotal
                        }, 0),
                        o = n / t.length;
                    n += o * r.length;
                    var i = 0;
                    t.forEach(function(e) {
                        i += e.progress.bytesUploaded
                    }), r.forEach(function(e) {
                        i += o * (e.progress.percentage || 0)
                    });
                    var s = 0 === n ? 0 : Math.round(i / n * 100);
                    this.setState({
                        totalProgress: s
                    }), this.emit("progress", s)
                } else {
                    var a = e.length,
                        u = r.reduce(function(e, t) {
                            return e + t.progress.percentage
                        }, 0),
                        l = Math.round(u / a * 100);
                    this.setState({
                        totalProgress: l
                    })
                }
            }, e.prototype._addListeners = function() {
                var e = this;
                this.on("error", function(t) {
                    e.setState({
                        error: t.message
                    })
                }), this.on("upload-error", function(t, r, n) {
                    e.setFileState(t.id, {
                        error: r.message,
                        response: n
                    }), e.setState({
                        error: r.message
                    });
                    var o = e.i18n("failedToUpload", {
                        file: t.name
                    });
                    "object" === (void 0 === r ? "undefined" : ___typeof_96(r)) && r.message && (o = {
                        message: o,
                        details: r.message
                    }), e.info(o, "error", 5e3)
                }), this.on("upload", function() {
                    e.setState({
                        error: null
                    })
                }), this.on("upload-started", function(t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: {
                            uploadStarted: Date.now(),
                            uploadComplete: !1,
                            percentage: 0,
                            bytesUploaded: 0,
                            bytesTotal: t.size
                        }
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("upload-progress", this._calculateProgress), this.on("upload-success", function(t, r) {
                    var n = e.getFile(t.id).progress;
                    e.setFileState(t.id, {
                        progress: ___extends_96({}, n, {
                            uploadComplete: !0,
                            percentage: 100,
                            bytesUploaded: n.bytesTotal
                        }),
                        response: r,
                        uploadURL: r.uploadURL,
                        isPaused: !1
                    }), e._calculateTotalProgress()
                }), this.on("preprocess-progress", function(t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: ___extends_96({}, e.getFile(t.id).progress, {
                            preprocess: r
                        })
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("preprocess-complete", function(t) {
                    if (e.getFile(t.id)) {
                        var r = ___extends_96({}, e.getState().files);
                        r[t.id] = ___extends_96({}, r[t.id], {
                            progress: ___extends_96({}, r[t.id].progress)
                        }), delete r[t.id].progress.preprocess, e.setState({
                            files: r
                        })
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("postprocess-progress", function(t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: ___extends_96({}, e.getState().files[t.id].progress, {
                            postprocess: r
                        })
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("postprocess-complete", function(t) {
                    if (e.getFile(t.id)) {
                        var r = ___extends_96({}, e.getState().files);
                        r[t.id] = ___extends_96({}, r[t.id], {
                            progress: ___extends_96({}, r[t.id].progress)
                        }), delete r[t.id].progress.postprocess, e.setState({
                            files: r
                        })
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("restored", function() {
                    e._calculateTotalProgress()
                }), "undefined" != typeof window && window.addEventListener && (window.addEventListener("online", function() {
                    return e.updateOnlineStatus()
                }), window.addEventListener("offline", function() {
                    return e.updateOnlineStatus()
                }), setTimeout(function() {
                    return e.updateOnlineStatus()
                }, 3e3))
            }, e.prototype.updateOnlineStatus = function() {
                void 0 === window.navigator.onLine || window.navigator.onLine ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0)
            }, e.prototype.getID = function() {
                return this.opts.id
            }, e.prototype.use = function(e, t) {
                if ("function" != typeof e) {
                    var r = "Expected a plugin class, but got " + (null === e ? "null" : void 0 === e ? "undefined" : ___typeof_96(e)) + ". Please verify that the plugin was imported and spelled correctly.";
                    throw new TypeError(r)
                }
                var n = new e(this, t),
                    o = n.id;
                if (this.plugins[n.type] = this.plugins[n.type] || [], !o) throw new Error("Your plugin must have an id");
                if (!n.type) throw new Error("Your plugin must have a type");
                var i = this.getPlugin(o);
                if (i) {
                    var s = "Already found a plugin named '" + i.id + "'. Tried to use: '" + o + "'.\nUppy plugins must have unique 'id' options. See https://uppy.io/docs/plugins/#id.";
                    throw new Error(s)
                }
                return this.plugins[n.type].push(n), n.install(), this
            }, e.prototype.getPlugin = function(e) {
                var t = null;
                return this.iteratePlugins(function(r) {
                    if (r.id === e) return t = r, !1
                }), t
            }, e.prototype.iteratePlugins = function(e) {
                var t = this;
                Object.keys(this.plugins).forEach(function(r) {
                    t.plugins[r].forEach(e)
                })
            }, e.prototype.removePlugin = function(e) {
                this.log("Removing plugin " + e.id), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
                var t = this.plugins[e.type].slice(),
                    r = t.indexOf(e); - 1 !== r && (t.splice(r, 1), this.plugins[e.type] = t);
                var n = this.getState();
                delete n.plugins[e.id], this.setState(n)
            }, e.prototype.close = function() {
                var e = this;
                this.log("Closing Uppy instance " + this.opts.id + ": removing all files and uninstalling plugins"), this.reset(), this._storeUnsubscribe(), this.iteratePlugins(function(t) {
                    e.removePlugin(t)
                })
            }, e.prototype.info = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "info",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3,
                    n = "object" === (void 0 === e ? "undefined" : ___typeof_96(e));
                this.setState({
                    info: {
                        isHidden: !1,
                        type: t,
                        message: n ? e.message : e,
                        details: n ? e.details : null
                    }
                }), this.emit("info-visible"), clearTimeout(this.infoTimeoutID), this.infoTimeoutID = 0 !== r ? setTimeout(this.hideInfo, r) : void 0
            }, e.prototype.hideInfo = function() {
                var e = ___extends_96({}, this.getState().info, {
                    isHidden: !0
                });
                this.setState({
                    info: e
                }), this.emit("info-hidden")
            }, e.prototype.log = function(e, t) {
                if (this.opts.debug) {
                    var r = "[Uppy] [" + _$getTimeStamp_166() + "] " + e;
                    window.uppyLog = window.uppyLog + "\nDEBUG LOG: " + e, "error" !== t ? "warning" !== t ? e === "" + e ? console.log(r) : (r = "[Uppy] [" + _$getTimeStamp_166() + "]", console.log(r), console.dir(e)) : console.warn(r) : console.error(r)
                }
            }, e.prototype.run = function() {
                return this.log("Calling run() is no longer necessary.", "warning"), this
            }, e.prototype.restore = function(e) {
                return this.log('Core: attempting to restore upload "' + e + '"'), this.getState().currentUploads[e] ? this._runUpload(e) : (this._removeUpload(e), Promise.reject(new Error("Nonexistent upload")))
            }, e.prototype._createUpload = function(e) {
                var t, r = this.getState(),
                    n = r.allowNewUpload,
                    o = r.currentUploads;
                if (!n) throw new Error("Cannot create a new upload: already uploading.");
                var i = _$cuid_13();
                return this.emit("upload", {
                    id: i,
                    fileIDs: e
                }), this.setState({
                    allowNewUpload: !1 !== this.opts.allowMultipleUploads,
                    currentUploads: ___extends_96({}, o, (t = {}, t[i] = {
                        fileIDs: e,
                        step: 0,
                        result: {}
                    }, t))
                }), i
            }, e.prototype._getUpload = function(e) {
                return this.getState().currentUploads[e]
            }, e.prototype.addResultData = function(e, t) {
                var r;
                if (this._getUpload(e)) {
                    var n = this.getState().currentUploads,
                        o = ___extends_96({}, n[e], {
                            result: ___extends_96({}, n[e].result, t)
                        });
                    this.setState({
                        currentUploads: ___extends_96({}, n, (r = {}, r[e] = o, r))
                    })
                } else this.log("Not setting result for an upload that has been removed: " + e)
            }, e.prototype._removeUpload = function(e) {
                var t = ___extends_96({}, this.getState().currentUploads);
                delete t[e], this.setState({
                    currentUploads: t
                })
            }, e.prototype._runUpload = function(e) {
                var t = this,
                    r = this.getState().currentUploads[e].step,
                    n = [].concat(this.preProcessors, this.uploaders, this.postProcessors),
                    o = Promise.resolve();
                return n.forEach(function(n, i) {
                    i < r || (o = o.then(function() {
                        var r, o = t.getState().currentUploads,
                            s = ___extends_96({}, o[e], {
                                step: i
                            });
                        return t.setState({
                            currentUploads: ___extends_96({}, o, (r = {}, r[e] = s, r))
                        }), n(s.fileIDs, e)
                    }).then(function(e) {
                        return null
                    }))
                }), o.catch(function(r) {
                    t.emit("error", r, e), t._removeUpload(e)
                }), o.then(function() {
                    var r = t.getState().currentUploads[e];
                    if (r) {
                        var n = r.fileIDs.map(function(e) {
                                return t.getFile(e)
                            }),
                            o = n.filter(function(e) {
                                return !e.error
                            }),
                            i = n.filter(function(e) {
                                return e.error
                            });
                        t.addResultData(e, {
                            successful: o,
                            failed: i,
                            uploadID: e
                        })
                    } else t.log("Not setting result for an upload that has been removed: " + e)
                }).then(function() {
                    var r = t.getState().currentUploads;
                    if (r[e]) {
                        var n = r[e].result;
                        return t.emit("complete", n), t._removeUpload(e), n
                    }
                    t.log("Not setting result for an upload that has been canceled: " + e)
                })
            }, e.prototype.upload = function() {
                var e = this;
                this.plugins.uploader || this.log("No uploader type plugins are used", "warning");
                var t = this.getState().files,
                    r = this.opts.onBeforeUpload(t);
                if (!1 === r) return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
                if (r && "object" === (void 0 === r ? "undefined" : ___typeof_96(r))) {
                    if (r.then) throw new TypeError("onBeforeUpload() returned a Promise, but this is no longer supported. It must be synchronous.");
                    t = r
                }
                return Promise.resolve().then(function() {
                    return e._checkMinNumberOfFiles(t)
                }).then(function() {
                    var r = e.getState().currentUploads,
                        n = Object.keys(r).reduce(function(e, t) {
                            return e.concat(r[t].fileIDs)
                        }, []),
                        o = [];
                    Object.keys(t).forEach(function(t) {
                        var r = e.getFile(t);
                        r.progress.uploadStarted || -1 !== n.indexOf(t) || o.push(r.id)
                    });
                    var i = e._createUpload(o);
                    return e._runUpload(i)
                }).catch(function(t) {
                    var r = "object" === (void 0 === t ? "undefined" : ___typeof_96(t)) ? t.message : t,
                        n = "object" === (void 0 === t ? "undefined" : ___typeof_96(t)) ? t.details : null;
                    return e.log(r + " " + n), e.info({
                        message: r,
                        details: n
                    }, "error", 4e3), Promise.reject("object" === (void 0 === t ? "undefined" : ___typeof_96(t)) ? t : new Error(t))
                })
            }, ___createClass_96(e, [{
                key: "state",
                get: function() {
                    return this.getState()
                }
            }]), e
        }();
    _$lib_96 = function(e) {
        return new Uppy(e)
    }, _$lib_96.Uppy = Uppy, _$lib_96.Plugin = _$Plugin_95;
    var _$lodashThrottle_43 = {};
    (function(e) {
        var t = "Expected a function",
            r = NaN,
            n = "[object Symbol]",
            o = /^\s+|\s+$/g,
            i = /^[-+]0x[0-9a-f]+$/i,
            s = /^0b[01]+$/i,
            a = /^0o[0-7]+$/i,
            u = parseInt,
            l = "object" == typeof e && e && e.Object === Object && e,
            p = "object" == typeof self && self && self.Object === Object && self,
            c = l || p || Function("return this")(),
            d = Object.prototype.toString,
            h = Math.max,
            f = Math.min,
            _ = function() {
                return c.Date.now()
            };

        function y(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function m(e) {
            if ("number" == typeof e) return e;
            if (function(e) {
                    return "symbol" == typeof e || function(e) {
                        return !!e && "object" == typeof e
                    }(e) && d.call(e) == n
                }(e)) return r;
            if (y(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = y(t) ? t + "" : t
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(o, "");
            var l = s.test(e);
            return l || a.test(e) ? u(e.slice(2), l ? 2 : 8) : i.test(e) ? r : +e
        }
        _$lodashThrottle_43 = function(e, r, n) {
            var o = !0,
                i = !0;
            if ("function" != typeof e) throw new TypeError(t);
            return y(n) && (o = "leading" in n ? !!n.leading : o, i = "trailing" in n ? !!n.trailing : i),
                function(e, r, n) {
                    var o, i, s, a, u, l, p = 0,
                        c = !1,
                        d = !1,
                        g = !0;
                    if ("function" != typeof e) throw new TypeError(t);

                    function b(t) {
                        var r = o,
                            n = i;
                        return o = i = void 0, p = t, a = e.apply(n, r)
                    }

                    function v(e) {
                        var t = e - l;
                        return void 0 === l || t >= r || t < 0 || d && e - p >= s
                    }

                    function w() {
                        var e = _();
                        if (v(e)) return S(e);
                        u = setTimeout(w, function(e) {
                            var t = r - (e - l);
                            return d ? f(t, s - (e - p)) : t
                        }(e))
                    }

                    function S(e) {
                        return u = void 0, g && o ? b(e) : (o = i = void 0, a)
                    }

                    function C() {
                        var e = _(),
                            t = v(e);
                        if (o = arguments, i = this, l = e, t) {
                            if (void 0 === u) return function(e) {
                                return p = e, u = setTimeout(w, r), c ? b(e) : a
                            }(l);
                            if (d) return u = setTimeout(w, r), b(l)
                        }
                        return void 0 === u && (u = setTimeout(w, r)), a
                    }
                    return r = m(r) || 0, y(n) && (c = !!n.leading, s = (d = "maxWait" in n) ? h(m(n.maxWait) || 0, r) : s, g = "trailing" in n ? !!n.trailing : g), C.cancel = function() {
                        void 0 !== u && clearTimeout(u), p = 0, o = l = i = u = void 0
                    }, C.flush = function() {
                        return void 0 === u ? a : S(_())
                    }, C
                }(e, r, {
                    leading: o,
                    maxWait: r,
                    trailing: i
                })
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$emitSocketProgress_156 = _$lodashThrottle_43(function(e, t, r) {
            var n = t.progress,
                o = t.bytesUploaded,
                i = t.bytesTotal;
            n && (e.uppy.log("Upload progress: " + n), e.uppy.emit("upload-progress", r, {
                uploader: e,
                bytesUploaded: o,
                bytesTotal: i
            }))
        }, 300, {
            leading: !0,
            trailing: !0
        }),
        _$getSocketHost_164 = function(e) {
            var t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/.exec(e)[1];
            return ("https:" === location.protocol ? "wss" : "ws") + "://" + t
        },
        _$limitPromises_171 = function(e) {
            var t = 0,
                r = [];
            return function(o) {
                return function() {
                    for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
                    var u = function() {
                        t++;
                        var e = o.apply(void 0, s);
                        return e.then(n, n), e
                    };
                    return t >= e ? new Promise(function(e, t) {
                        r.push(function() {
                            u().then(e, t)
                        })
                    }) : u()
                }
            };

            function n() {
                t--;
                var e = r.shift();
                e && e()
            }
        },
        ___extends_89 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_89 = _$lib_96.Plugin,
        __dummy_89$0 = 0,
        __Socket_89 = _$lib_94.Socket,
        __RequestClient_89 = _$lib_94.RequestClient,
        __dummy_89$1 = 0,
        __dummy_89$2 = 0,
        __dummy_89$3 = 0,
        __dummy_89$4 = 0;

    function createEventTracker(e) {
        var t = [];
        return {
            on: function(r, n) {
                return t.push([r, n]), e.on(r, n)
            },
            remove: function() {
                t.forEach(function(t) {
                    var r = t[0],
                        n = t[1];
                    e.off(r, n)
                })
            }
        }
    }

    function assertServerError(e) {
        if (e && e.error) {
            var t = new Error(e.message);
            throw ___extends_89(t, e.error), t
        }
        return e
    }
    var _$lib_89 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.type = "uploader", o.id = "AwsS3Multipart", o.title = "AWS S3 Multipart", o.client = new __RequestClient_89(r, n);
                var i = {
                    timeout: 3e4,
                    limit: 0,
                    createMultipartUpload: o.createMultipartUpload.bind(o),
                    listParts: o.listParts.bind(o),
                    prepareUploadPart: o.prepareUploadPart.bind(o),
                    abortMultipartUpload: o.abortMultipartUpload.bind(o),
                    completeMultipartUpload: o.completeMultipartUpload.bind(o)
                };
                return o.opts = ___extends_89({}, i, n), o.upload = o.upload.bind(o), "number" == typeof o.opts.limit && 0 !== o.opts.limit ? o.limitRequests = _$limitPromises_171(o.opts.limit) : o.limitRequests = function(e) {
                    return e
                }, o.uploaders = Object.create(null), o.uploaderEvents = Object.create(null), o.uploaderSockets = Object.create(null), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.resetUploaderReferences = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                this.uploaders[e] && (this.uploaders[e].abort({
                    really: t.abort || !1
                }), this.uploaders[e] = null), this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
            }, t.prototype.assertHost = function() {
                if (!this.opts.serverUrl) throw new Error("Expected a `serverUrl` option containing a Companion address.")
            }, t.prototype.createMultipartUpload = function(e) {
                return this.assertHost(), this.client.post("s3/multipart", {
                    filename: e.name,
                    type: e.type
                }).then(assertServerError)
            }, t.prototype.listParts = function(e, t) {
                var r = t.key,
                    n = t.uploadId;
                this.assertHost();
                var o = encodeURIComponent(r);
                return this.client.get("s3/multipart/" + n + "?key=" + o).then(assertServerError)
            }, t.prototype.prepareUploadPart = function(e, t) {
                var r = t.key,
                    n = t.uploadId,
                    o = t.number;
                this.assertHost();
                var i = encodeURIComponent(r);
                return this.client.get("s3/multipart/" + n + "/" + o + "?key=" + i).then(assertServerError)
            }, t.prototype.completeMultipartUpload = function(e, t) {
                var r = t.key,
                    n = t.uploadId,
                    o = t.parts;
                this.assertHost();
                var i = encodeURIComponent(r),
                    s = encodeURIComponent(n);
                return this.client.post("s3/multipart/" + s + "/complete?key=" + i, {
                    parts: o
                }).then(assertServerError)
            }, t.prototype.abortMultipartUpload = function(e, t) {
                var r = t.key,
                    n = t.uploadId;
                this.assertHost();
                var o = encodeURIComponent(r),
                    i = encodeURIComponent(n);
                return this.client.delete("s3/multipart/" + i + "?key=" + o).then(assertServerError)
            }, t.prototype.uploadFile = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = new _$MultipartUploader_88(e.data, ___extends_89({
                        createMultipartUpload: t.limitRequests(t.opts.createMultipartUpload.bind(t, e)),
                        listParts: t.limitRequests(t.opts.listParts.bind(t, e)),
                        prepareUploadPart: t.opts.prepareUploadPart.bind(t, e),
                        completeMultipartUpload: t.limitRequests(t.opts.completeMultipartUpload.bind(t, e)),
                        abortMultipartUpload: t.limitRequests(t.opts.abortMultipartUpload.bind(t, e)),
                        limit: t.opts.limit || 5,
                        onStart: function(r) {
                            var n = t.uppy.getFile(e.id);
                            t.uppy.setFileState(e.id, {
                                s3Multipart: ___extends_89({}, n.s3Multipart, {
                                    key: r.key,
                                    uploadId: r.uploadId,
                                    parts: []
                                })
                            })
                        },
                        onProgress: function(r, n) {
                            t.uppy.emit("upload-progress", e, {
                                uploader: t,
                                bytesUploaded: r,
                                bytesTotal: n
                            })
                        },
                        onError: function(r) {
                            t.uppy.log(r), t.uppy.emit("upload-error", e, r), r.message = "Failed because: " + r.message, t.resetUploaderReferences(e.id), n(r)
                        },
                        onSuccess: function(n) {
                            var i = {
                                uploadURL: n.location
                            };
                            t.uppy.emit("upload-success", e, i), n.location && t.uppy.log("Download " + o.file.name + " from " + n.location), t.resetUploaderReferences(e.id), r(o)
                        },
                        onPartComplete: function(r) {
                            var n = t.uppy.getFile(e.id);
                            n && (t.uppy.setFileState(e.id, {
                                s3Multipart: ___extends_89({}, n.s3Multipart, {
                                    parts: [].concat(n.s3Multipart.parts, [r])
                                })
                            }), t.uppy.emit("s3-multipart:part-uploaded", n, r))
                        }
                    }, e.s3Multipart));
                    t.uploaders[e.id] = o, t.uploaderEvents[e.id] = createEventTracker(t.uppy), t.onFileRemove(e.id, function(n) {
                        t.resetUploaderReferences(e.id, {
                            abort: !0
                        }), r("upload " + n.id + " was removed")
                    }), t.onFilePause(e.id, function(e) {
                        e ? o.pause() : o.start()
                    }), t.onPauseAll(e.id, function() {
                        o.pause()
                    }), t.onResumeAll(e.id, function() {
                        o.start()
                    }), e.isPaused || o.start(), e.isRestored || t.uppy.emit("upload-started", e, o)
                })
            }, t.prototype.uploadRemote = function(e) {
                var t = this;
                return this.resetUploaderReferences(e.id), new Promise(function(r, n) {
                    if (e.serverToken) return t.connectToServerSocket(e).then(function() {
                        return r()
                    }).catch(n);
                    t.uppy.emit("upload-started", e), fetch(e.remote.url, {
                        method: "post",
                        credentials: "include",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(___extends_89({}, e.remote.body, {
                            protocol: "s3-multipart",
                            size: e.data.size,
                            metadata: e.meta
                        }))
                    }).then(function(r) {
                        return r.status < 200 || r.status > 300 ? n(r.statusText) : r.json().then(function(r) {
                            return t.uppy.setFileState(e.id, {
                                serverToken: r.token
                            }), t.uppy.getFile(e.id)
                        })
                    }).then(function(e) {
                        return t.connectToServerSocket(e)
                    }).then(function() {
                        r()
                    }).catch(function(e) {
                        n(new Error(e))
                    })
                })
            }, t.prototype.connectToServerSocket = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = e.serverToken,
                        i = _$getSocketHost_164(e.remote.serverUrl),
                        s = new __Socket_89({
                            target: i + "/api/" + o
                        });
                    t.uploaderSockets[s] = s, t.uploaderEvents[e.id] = createEventTracker(t.uppy), t.onFileRemove(e.id, function(n) {
                        t.resetUploaderReferences(e.id, {
                            abort: !0
                        }), r("upload " + e.id + " was removed")
                    }), t.onFilePause(e.id, function(e) {
                        s.send(e ? "pause" : "resume", {})
                    }), t.onPauseAll(e.id, function() {
                        return s.send("pause", {})
                    }), t.onResumeAll(e.id, function() {
                        e.error && s.send("pause", {}), s.send("resume", {})
                    }), t.onRetry(e.id, function() {
                        s.send("pause", {}), s.send("resume", {})
                    }), t.onRetryAll(e.id, function() {
                        s.send("pause", {}), s.send("resume", {})
                    }), e.isPaused && s.send("pause", {}), s.on("progress", function(r) {
                        return _$emitSocketProgress_156(t, r, e)
                    }), s.on("error", function(r) {
                        t.uppy.emit("upload-error", e, new Error(r.error)), n(new Error(r.error))
                    }), s.on("success", function(n) {
                        var o = {
                            uploadURL: n.url
                        };
                        t.uppy.emit("upload-success", e, o), r()
                    })
                })
            }, t.prototype.upload = function(e) {
                var t = this;
                if (0 === e.length) return Promise.resolve();
                var r = e.map(function(e) {
                    var r = t.uppy.getFile(e);
                    return r.isRemote ? t.uploadRemote(r) : t.uploadFile(r)
                });
                return Promise.all(r)
            }, t.prototype.onFileRemove = function(e, t) {
                this.uploaderEvents[e].on("file-removed", function(r) {
                    e === r.id && t(r.id)
                })
            }, t.prototype.onFilePause = function(e, t) {
                this.uploaderEvents[e].on("upload-pause", function(r, n) {
                    e === r && t(n)
                })
            }, t.prototype.onRetry = function(e, t) {
                this.uploaderEvents[e].on("upload-retry", function(r) {
                    e === r && t()
                })
            }, t.prototype.onRetryAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("retry-all", function(n) {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.onPauseAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("pause-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.onResumeAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("resume-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.install = function() {
                var e = this,
                    t = this.uppy.getState().capabilities;
                this.uppy.setState({
                    capabilities: ___extends_89({}, t, {
                        resumableUploads: !0
                    })
                }), this.uppy.addUploader(this.upload), this.uppy.on("cancel-all", function() {
                    e.uppy.getFiles().forEach(function(t) {
                        e.resetUploaderReferences(t.id, {
                            abort: !0
                        })
                    })
                })
            }, t.prototype.uninstall = function() {
                this.uppy.setState({
                    capabilities: ___extends_89({}, this.uppy.getState().capabilities, {
                        resumableUploads: !1
                    })
                }), this.uppy.removeUploader(this.upload)
            }, t
        }(__Plugin_89),
        _$resolveUrl_55 = {},
        root, __factory_55;
    root = this, __factory_55 = function() {
        return function() {
            var e = arguments.length;
            if (0 === e) throw new Error("resolveUrl requires at least one argument; got none.");
            var t = document.createElement("base");
            if (t.href = arguments[0], 1 === e) return t.href;
            var r = document.getElementsByTagName("head")[0];
            r.insertBefore(t, r.firstChild);
            for (var n, o = document.createElement("a"), i = 1; i < e; i++) o.href = arguments[i], n = o.href, t.href = n;
            return r.removeChild(t), n
        }
    }, "function" == typeof define && define.amd ? define(__factory_55) : "object" == typeof _$resolveUrl_55 ? _$resolveUrl_55 = __factory_55() : root.resolveUrl = __factory_55();
    var _$settle_175 = function(e) {
            var t = [],
                r = [];

            function n(e) {
                t.push(e)
            }

            function o(e) {
                r.push(e)
            }
            return Promise.all(e.map(function(e) {
                return e.then(n, o)
            })).then(function() {
                return {
                    successful: t,
                    failed: r
                }
            })
        },
        ___extends_184 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_184 = _$lib_96.Plugin,
        __dummy_184$0 = 0,
        __dummy_184$1 = 0,
        __dummy_184$2 = 0,
        __Provider_184 = _$lib_94.Provider,
        __Socket_184 = _$lib_94.Socket,
        __dummy_184$3 = 0,
        __dummy_184$4 = 0,
        __dummy_184$5 = 0,
        __dummy_184$6 = 0;

    function buildResponseError(e, t) {
        return t || (t = new Error("Upload error")), "string" == typeof t && (t = new Error(t)), t instanceof Error || (t = ___extends_184(new Error("Upload error"), {
            data: t
        })), t.request = e, t
    }
    var _$lib_184 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.type = "uploader", o.id = "XHRUpload", o.title = "XHRUpload";
                var i = {
                        strings: {
                            timedOut: "Upload stalled for %{seconds} seconds, aborting."
                        }
                    },
                    s = {
                        formData: !0,
                        fieldName: "files[]",
                        method: "post",
                        metaFields: null,
                        responseUrlFieldName: "url",
                        bundle: !1,
                        headers: {},
                        locale: i,
                        timeout: 3e4,
                        limit: 0,
                        withCredentials: !1,
                        responseType: "",
                        getResponseData: function(e, t) {
                            var r = {};
                            try {
                                r = JSON.parse(e)
                            } catch (e) {
                                console.log(e)
                            }
                            return r
                        },
                        getResponseError: function(e, t) {
                            return new Error("Upload error")
                        }
                    };
                if (o.opts = ___extends_184({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.handleUpload = o.handleUpload.bind(o), "number" == typeof o.opts.limit && 0 !== o.opts.limit ? o.limitUploads = _$limitPromises_171(o.opts.limit) : o.limitUploads = function(e) {
                        return e
                    }, o.opts.bundle && !o.opts.formData) throw new Error("`opts.formData` must be true when `opts.bundle` is enabled.");
                return o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.getOptions = function(e) {
                var t = this.uppy.getState().xhrUpload,
                    r = ___extends_184({}, this.opts, t || {}, e.xhrUpload || {});
                return r.headers = {}, ___extends_184(r.headers, this.opts.headers), t && ___extends_184(r.headers, t.headers), e.xhrUpload && ___extends_184(r.headers, e.xhrUpload.headers), r
            }, t.prototype.createProgressTimeout = function(e, t) {
                var r = this.uppy,
                    n = this,
                    o = !1;

                function i() {
                    r.log("[XHRUpload] timed out");
                    var o = new Error(n.i18n("timedOut", {
                        seconds: Math.ceil(e / 1e3)
                    }));
                    t(o)
                }
                var s = null;
                return {
                    progress: function() {
                        o || e > 0 && (s && clearTimeout(s), s = setTimeout(i, e))
                    },
                    done: function() {
                        r.log("[XHRUpload] timer done"), s && (clearTimeout(s), s = null), o = !0
                    }
                }
            }, t.prototype.createFormDataUpload = function(e, t) {
                var r = new FormData;
                return (Array.isArray(t.metaFields) ? t.metaFields : Object.keys(e.meta)).forEach(function(t) {
                    r.append(t, e.meta[t])
                }), e.name ? r.append(t.fieldName, e.data, e.name) : r.append(t.fieldName, e.data), r
            }, t.prototype.createBareUpload = function(e, t) {
                return e.data
            }, t.prototype.upload = function(e, t, r) {
                var n = this,
                    o = this.getOptions(e);
                return this.uppy.log("uploading " + t + " of " + r), new Promise(function(t, r) {
                    var i = o.formData ? n.createFormDataUpload(e, o) : n.createBareUpload(e, o),
                        s = n.createProgressTimeout(o.timeout, function(t) {
                            a.abort(), n.uppy.emit("upload-error", e, t), r(t)
                        }),
                        a = new XMLHttpRequest,
                        u = _$cuid_13();
                    a.upload.addEventListener("loadstart", function(e) {
                        n.uppy.log("[XHRUpload] " + u + " started")
                    }), a.upload.addEventListener("progress", function(t) {
                        n.uppy.log("[XHRUpload] " + u + " progress: " + t.loaded + " / " + t.total), s.progress(), t.lengthComputable && n.uppy.emit("upload-progress", e, {
                            uploader: n,
                            bytesUploaded: t.loaded,
                            bytesTotal: t.total
                        })
                    }), a.addEventListener("load", function(i) {
                        if (n.uppy.log("[XHRUpload] " + u + " finished"), s.done(), i.target.status >= 200 && i.target.status < 300) {
                            var l = o.getResponseData(a.responseText, a),
                                p = l[o.responseUrlFieldName],
                                c = {
                                    status: i.target.status,
                                    body: l,
                                    uploadURL: p
                                };
                            return n.uppy.emit("upload-success", e, c), p && n.uppy.log("Download " + e.name + " from " + e.uploadURL), t(e)
                        }
                        var d = o.getResponseData(a.responseText, a),
                            h = buildResponseError(a, o.getResponseError(a.responseText, a)),
                            f = {
                                status: i.target.status,
                                body: d
                            };
                        return n.uppy.emit("upload-error", e, h, f), r(h)
                    }), a.addEventListener("error", function(t) {
                        n.uppy.log("[XHRUpload] " + u + " errored"), s.done();
                        var i = buildResponseError(a, o.getResponseError(a.responseText, a));
                        return n.uppy.emit("upload-error", e, i), r(i)
                    }), a.open(o.method.toUpperCase(), o.endpoint, !0), a.withCredentials = o.withCredentials, "" !== o.responseType && (a.responseType = o.responseType), Object.keys(o.headers).forEach(function(e) {
                        a.setRequestHeader(e, o.headers[e])
                    }), a.send(i), n.uppy.on("file-removed", function(t) {
                        t.id === e.id && (s.done(), a.abort())
                    }), n.uppy.on("cancel-all", function() {
                        s.done(), a.abort()
                    })
                })
            }, t.prototype.uploadRemote = function(e, t, r) {
                var n = this,
                    o = this.getOptions(e);
                return new Promise(function(t, r) {
                    var i = {};
                    (Array.isArray(o.metaFields) ? o.metaFields : Object.keys(e.meta)).forEach(function(t) {
                        i[t] = e.meta[t]
                    }), new __Provider_184(n.uppy, e.remote.providerOptions).post(e.remote.url, ___extends_184({}, e.remote.body, {
                        endpoint: o.endpoint,
                        size: e.data.size,
                        fieldname: o.fieldName,
                        metadata: i,
                        headers: o.headers
                    })).then(function(i) {
                        var s = i.token,
                            a = _$getSocketHost_164(e.remote.serverUrl),
                            u = new __Socket_184({
                                target: a + "/api/" + s
                            });
                        u.on("progress", function(t) {
                            return _$emitSocketProgress_156(n, t, e)
                        }), u.on("success", function(r) {
                            var i = o.getResponseData(r.response.responseText, r.response),
                                s = i[o.responseUrlFieldName],
                                a = {
                                    status: r.response.status,
                                    body: i,
                                    uploadURL: s
                                };
                            return n.uppy.emit("upload-success", e, a), u.close(), t()
                        }), u.on("error", function(t) {
                            var i = t.response,
                                s = i ? o.getResponseError(i.responseText, i) : ___extends_184(new Error(t.error.message), {
                                    cause: t.error
                                });
                            n.uppy.emit("upload-error", e, s), r(s)
                        })
                    })
                })
            }, t.prototype.uploadBundle = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = t.opts.endpoint,
                        i = t.opts.method,
                        s = new FormData;
                    e.forEach(function(e, r) {
                        var n = t.getOptions(e);
                        s.append(n.fieldName, e.data)
                    });
                    var a = new XMLHttpRequest,
                        u = t.createProgressTimeout(t.opts.timeout, function(e) {
                            a.abort(), l(e), n(e)
                        }),
                        l = function(r) {
                            e.forEach(function(e) {
                                t.uppy.emit("upload-error", e, r)
                            })
                        };
                    a.upload.addEventListener("loadstart", function(e) {
                        t.uppy.log("[XHRUpload] started uploading bundle"), u.progress()
                    }), a.upload.addEventListener("progress", function(r) {
                        u.progress(), r.lengthComputable && e.forEach(function(e) {
                            t.uppy.emit("upload-progress", e, {
                                uploader: t,
                                bytesUploaded: r.loaded / r.total * e.size,
                                bytesTotal: e.size
                            })
                        })
                    }), a.addEventListener("load", function(o) {
                        if (u.done(), o.target.status >= 200 && o.target.status < 300) {
                            var i = t.opts.getResponseData(a.responseText, a),
                                s = {
                                    status: o.target.status,
                                    body: i
                                };
                            return e.forEach(function(e) {
                                t.uppy.emit("upload-success", e, s)
                            }), r()
                        }
                        var p = t.opts.getResponseError(a.responseText, a) || new Error("Upload error");
                        return p.request = a, l(p), n(p)
                    }), a.addEventListener("error", function(e) {
                        u.done();
                        var r = t.opts.getResponseError(a.responseText, a) || new Error("Upload error");
                        return l(r), n(r)
                    }), t.uppy.on("cancel-all", function() {
                        u.done(), a.abort()
                    }), a.open(i.toUpperCase(), o, !0), a.withCredentials = t.opts.withCredentials, "" !== t.opts.responseType && (a.responseType = t.opts.responseType), Object.keys(t.opts.headers).forEach(function(e) {
                        a.setRequestHeader(e, t.opts.headers[e])
                    }), a.send(s), e.forEach(function(e) {
                        t.uppy.emit("upload-started", e)
                    })
                })
            }, t.prototype.uploadFiles = function(e) {
                var t = this,
                    r = e.map(function(r, n) {
                        var o = parseInt(n, 10) + 1,
                            i = e.length;
                        return r.error ? function() {
                            return Promise.reject(new Error(r.error))
                        } : r.isRemote ? (t.uppy.emit("upload-started", r), t.uploadRemote.bind(t, r, o, i)) : (t.uppy.emit("upload-started", r), t.upload.bind(t, r, o, i))
                    }).map(function(e) {
                        return t.limitUploads(e)()
                    });
                return _$settle_175(r)
            }, t.prototype.handleUpload = function(e) {
                var t = this;
                if (0 === e.length) return this.uppy.log("[XHRUpload] No files to upload!"), Promise.resolve();
                this.uppy.log("[XHRUpload] Uploading...");
                var r = e.map(function(e) {
                    return t.uppy.getFile(e)
                });
                return this.opts.bundle ? this.uploadBundle(r) : this.uploadFiles(r).then(function() {
                    return null
                })
            }, t.prototype.install = function() {
                this.opts.bundle && this.uppy.setState({
                    capabilities: ___extends_184({}, this.uppy.getState().capabilities, {
                        bundled: !0
                    })
                }), this.uppy.addUploader(this.handleUpload)
            }, t.prototype.uninstall = function() {
                this.opts.bundle && this.uppy.setState({
                    capabilities: ___extends_184({}, this.uppy.getState().capabilities, {
                        bundled: !0
                    })
                }), this.uppy.removeUploader(this.handleUpload)
            }, t
        }(__Plugin_184),
        ___typeof_90 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        ___extends_90 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_90$0 = 0,
        __Plugin_90 = _$lib_96.Plugin,
        __dummy_90$1 = 0,
        __dummy_90$2 = 0,
        __RequestClient_90 = _$lib_94.RequestClient,
        __dummy_90$3 = 0;

    function isXml(e) {
        var t = e.headers ? e.headers["content-type"] : e.getResponseHeader("Content-Type");
        return "string" == typeof t && "application/xml" === t.toLowerCase()
    }

    function getXmlValue(e, t) {
        var r = e.indexOf("<" + t + ">"),
            n = e.indexOf("</" + t + ">", r);
        return -1 !== r && -1 !== n ? e.slice(r + t.length + 2, n) : ""
    }

    function __assertServerError_90(e) {
        if (e && e.error) {
            var t = new Error(e.message);
            throw ___extends_90(t, e.error), t
        }
        return e
    }
    var _$lib_90 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.type = "uploader", o.id = "AwsS3", o.title = "AWS S3";
                var i = {
                        strings: {
                            preparingUpload: "Preparing upload..."
                        }
                    },
                    s = {
                        timeout: 3e4,
                        limit: 0,
                        getUploadParameters: o.getUploadParameters.bind(o),
                        locale: i
                    };
                return o.opts = ___extends_90({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.client = new __RequestClient_90(r, n), o.prepareUpload = o.prepareUpload.bind(o), "number" == typeof o.opts.limit && 0 !== o.opts.limit ? o.limitRequests = _$limitPromises_171(o.opts.limit) : o.limitRequests = function(e) {
                    return e
                }, o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.getUploadParameters = function(e) {
                if (!this.opts.serverUrl) throw new Error("Expected a `serverUrl` option containing a Companion address.");
                var t = encodeURIComponent(e.meta.name),
                    r = encodeURIComponent(e.meta.type);
                return this.client.get("s3/params?filename=" + t + "&type=" + r).then(__assertServerError_90)
            }, t.prototype.validateParameters = function(e, t) {
                if ("object" !== (void 0 === t ? "undefined" : ___typeof_90(t)) || !t || "string" != typeof t.url || "object" !== ___typeof_90(t.fields) && null != t.fields || null != t.method && !/^(put|post)$/i.test(t.method)) {
                    var r = new TypeError("AwsS3: got incorrect result from 'getUploadParameters()' for file '" + e.name + "', expected an object '{ url, method, fields, headers }'.\nSee https://uppy.io/docs/aws-s3/#getUploadParameters-file for more on the expected format.");
                    throw console.error(r), r
                }
                return t
            }, t.prototype.prepareUpload = function(e) {
                var t = this;
                e.forEach(function(e) {
                    var r = t.uppy.getFile(e);
                    t.uppy.emit("preprocess-progress", r, {
                        mode: "determinate",
                        message: t.i18n("preparingUpload"),
                        value: 0
                    })
                });
                var r = this.limitRequests(this.opts.getUploadParameters);
                return Promise.all(e.map(function(e) {
                    var n = t.uppy.getFile(e);
                    return Promise.resolve().then(function() {
                        return r(n)
                    }).then(function(e) {
                        return t.validateParameters(n, e)
                    }).then(function(e) {
                        return t.uppy.emit("preprocess-progress", n, {
                            mode: "determinate",
                            message: t.i18n("preparingUpload"),
                            value: 1
                        }), e
                    }).catch(function(e) {
                        t.uppy.emit("upload-error", n, e)
                    })
                })).then(function(r) {
                    var n = {};
                    e.forEach(function(e, o) {
                        var i = t.uppy.getFile(e);
                        if (!i.error) {
                            var s = r[o],
                                a = s.method,
                                u = void 0 === a ? "post" : a,
                                l = s.url,
                                p = s.fields,
                                c = s.headers,
                                d = {
                                    method: u,
                                    formData: "post" === u.toLowerCase(),
                                    endpoint: l,
                                    metaFields: Object.keys(p)
                                };
                            c && (d.headers = c);
                            var h = ___extends_90({}, i, {
                                meta: ___extends_90({}, i.meta, p),
                                xhrUpload: d
                            });
                            n[e] = h
                        }
                    }), t.uppy.setState({
                        files: ___extends_90({}, t.uppy.getState().files, n)
                    }), e.forEach(function(e) {
                        var r = t.uppy.getFile(e);
                        t.uppy.emit("preprocess-complete", r)
                    })
                })
            }, t.prototype.install = function() {
                var e = this.uppy.log;
                this.uppy.addPreProcessor(this.prepareUpload);
                var t = !1;
                this.uppy.use(_$lib_184, {
                    fieldName: "file",
                    responseUrlFieldName: "location",
                    timeout: this.opts.timeout,
                    limit: this.opts.limit,
                    responseType: "text",
                    getResponseData: function(r, n) {
                        return isXml(n) ? {
                            location: _$resolveUrl_55(n.responseURL, getXmlValue(r, "Location")),
                            bucket: getXmlValue(r, "Bucket"),
                            key: getXmlValue(r, "Key"),
                            etag: getXmlValue(r, "ETag")
                        } : "POST" === this.method.toUpperCase() ? (t || (e("[AwsS3] No response data found, make sure to set the success_action_status AWS SDK option to 201. See https://uppy.io/docs/aws-s3/#POST-Uploads", "warning"), t = !0), {
                            location: null
                        }) : n.responseURL ? {
                            location: n.responseURL.replace(/\?.*$/, "")
                        } : {
                            location: null
                        }
                    },
                    getResponseError: function(e, t) {
                        if (isXml(t)) {
                            var r = getXmlValue(e, "Message");
                            return new Error(r)
                        }
                    }
                })
            }, t.prototype.uninstall = function() {
                var e = this.uppy.getPlugin("XHRUpload");
                this.uppy.removePlugin(e), this.uppy.removePreProcessor(this.prepareUpload)
            }, t
        }(__Plugin_90),
        _$flatten_36 = function(e, t) {
            return (t = "number" == typeof t ? t : 1 / 0) ? function e(r, n) {
                return r.reduce(function(r, o) {
                    return Array.isArray(o) && n < t ? r.concat(e(o, n + 1)) : r.concat(o)
                }, [])
            }(e, 1) : Array.isArray(e) ? e.map(function(e) {
                return e
            }) : e
        },
        _$runParallel_56 = {};
    (function(e) {
        _$runParallel_56 = function(t, r) {
            var n, o, i, s = !0;

            function a(t) {
                function o() {
                    r && r(t, n), r = null
                }
                s ? e.nextTick(o) : o()
            }

            function u(e, t, r) {
                n[e] = r, (0 == --o || t) && a(t)
            }
            Array.isArray(t) ? (n = [], o = t.length) : (i = Object.keys(t), n = {}, o = i.length), o ? i ? i.forEach(function(e) {
                t[e](function(t, r) {
                    u(e, t, r)
                })
            }) : t.forEach(function(e, t) {
                e(function(e, r) {
                    u(t, e, r)
                })
            }) : a(null), s = !1
        }
    }).call(this, _$browser_51);
    var _$dragDrop_17 = function(e, t) {
            if ("string" == typeof e) {
                var r = e;
                if (!(e = window.document.querySelector(e))) throw new Error('"' + r + '" does not match any HTML elements')
            }
            if (!e) throw new Error('"' + e + '" is not a valid HTML element');
            var n;
            return "function" == typeof t && (t = {
                    onDrop: t
                }), e.addEventListener("dragenter", o, !1), e.addEventListener("dragover", i, !1), e.addEventListener("dragleave", s, !1), e.addEventListener("drop", a, !1),
                function() {
                    u(), e.removeEventListener("dragenter", o, !1), e.removeEventListener("dragover", i, !1), e.removeEventListener("dragleave", s, !1), e.removeEventListener("drop", a, !1)
                };

            function o(e) {
                return t.onDragEnter && t.onDragEnter(e), e.stopPropagation(), e.preventDefault(), !1
            }

            function i(r) {
                if (r.stopPropagation(), r.preventDefault(), r.dataTransfer.items) {
                    var o = toArray(r.dataTransfer.items),
                        i = o.filter(function(e) {
                            return "file" === e.kind
                        }),
                        s = o.filter(function(e) {
                            return "string" === e.kind
                        });
                    if (0 === i.length && !t.onDropText) return;
                    if (0 === s.length && !t.onDrop) return;
                    if (0 === i.length && 0 === s.length) return
                }
                return e.classList.add("drag"), clearTimeout(n), t.onDragOver && t.onDragOver(r), r.dataTransfer.dropEffect = "copy", !1
            }

            function s(e) {
                return e.stopPropagation(), e.preventDefault(), t.onDragLeave && t.onDragLeave(e), clearTimeout(n), n = setTimeout(u, 50), !1
            }

            function a(e) {
                e.stopPropagation(), e.preventDefault(), t.onDragLeave && t.onDragLeave(e), clearTimeout(n), u();
                var r = {
                        x: e.clientX,
                        y: e.clientY
                    },
                    o = e.dataTransfer.getData("text");
                if (o && t.onDropText && t.onDropText(o, r), e.dataTransfer.items) {
                    var i = toArray(e.dataTransfer.items).filter(function(e) {
                        return "file" === e.kind
                    });
                    if (0 === i.length) return;
                    _$runParallel_56(i.map(function(e) {
                        return function(t) {
                            ! function(e, t) {
                                var r = [];
                                if (e.isFile) e.file(function(r) {
                                    r.fullPath = e.fullPath, t(null, r)
                                }, function(e) {
                                    t(e)
                                });
                                else if (e.isDirectory) {
                                    var n = e.createReader();
                                    ! function e() {
                                        n.readEntries(function(n) {
                                            n.length > 0 ? (r = r.concat(toArray(n)), e()) : _$runParallel_56(r.map(function(e) {
                                                return function(t) {
                                                    processEntry(e, t)
                                                }
                                            }), t)
                                        })
                                    }()
                                }
                            }(e.webkitGetAsEntry(), t)
                        }
                    }), function(e, n) {
                        if (e) throw e;
                        t.onDrop && t.onDrop(_$flatten_36(n), r)
                    })
                } else {
                    var s = toArray(e.dataTransfer.files);
                    if (0 === s.length) return;
                    s.forEach(function(e) {
                        e.fullPath = "/" + e.name
                    }), t.onDrop && t.onDrop(s, r)
                }
                return !1
            }

            function u() {
                e.classList.remove("drag")
            }
        },
        __dummy_17$0 = 0,
        __dummy_17$1 = 0;

    function processEntry(e, t) {
        var r = [];
        if (e.isFile) e.file(function(r) {
            r.fullPath = e.fullPath, t(null, r)
        }, function(e) {
            t(e)
        });
        else if (e.isDirectory) {
            var n = e.createReader();
            ! function e() {
                n.readEntries(function(n) {
                    n.length > 0 ? (r = r.concat(toArray(n)), e()) : _$runParallel_56(r.map(function(e) {
                        return function(t) {
                            processEntry(e, t)
                        }
                    }), t)
                })
            }()
        }
    }

    function toArray(e) {
        return Array.prototype.slice.call(e || [], 0)
    }
    var _$ResizeObserver_54 = {
        exports: {}
    };
    (function(e) {
        ! function(e, t) {
            "object" == typeof _$ResizeObserver_54.exports ? _$ResizeObserver_54.exports = t() : "function" == typeof define && define.amd ? define(t) : e.ResizeObserver = t()
        }(this, function() {
            "use strict";
            var t = function() {
                    if ("undefined" != typeof Map) return Map;

                    function e(e, t) {
                        var r = -1;
                        return e.some(function(e, n) {
                            return e[0] === t && (r = n, !0)
                        }), r
                    }
                    return function() {
                        function t() {
                            this.__entries__ = []
                        }
                        return Object.defineProperty(t.prototype, "size", {
                            get: function() {
                                return this.__entries__.length
                            },
                            enumerable: !0,
                            configurable: !0
                        }), t.prototype.get = function(t) {
                            var r = e(this.__entries__, t),
                                n = this.__entries__[r];
                            return n && n[1]
                        }, t.prototype.set = function(t, r) {
                            var n = e(this.__entries__, t);
                            ~n ? this.__entries__[n][1] = r : this.__entries__.push([t, r])
                        }, t.prototype.delete = function(t) {
                            var r = this.__entries__,
                                n = e(r, t);
                            ~n && r.splice(n, 1)
                        }, t.prototype.has = function(t) {
                            return !!~e(this.__entries__, t)
                        }, t.prototype.clear = function() {
                            this.__entries__.splice(0)
                        }, t.prototype.forEach = function(e, t) {
                            void 0 === t && (t = null);
                            for (var r = 0, n = this.__entries__; r < n.length; r++) {
                                var o = n[r];
                                e.call(t, o[1], o[0])
                            }
                        }, t
                    }()
                }(),
                r = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
                n = void 0 !== e && e.Math === Math ? e : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(),
                o = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(n) : function(e) {
                    return setTimeout(function() {
                        return e(Date.now())
                    }, 1e3 / 60)
                },
                i = 2,
                s = 20,
                a = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
                u = "undefined" != typeof MutationObserver,
                l = function() {
                    function e() {
                        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function(e, t) {
                            var r = !1,
                                n = !1,
                                s = 0;

                            function a() {
                                r && (r = !1, e()), n && l()
                            }

                            function u() {
                                o(a)
                            }

                            function l() {
                                var e = Date.now();
                                if (r) {
                                    if (e - s < i) return;
                                    n = !0
                                } else r = !0, n = !1, setTimeout(u, t);
                                s = e
                            }
                            return l
                        }(this.refresh.bind(this), s)
                    }
                    return e.prototype.addObserver = function(e) {
                        ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_()
                    }, e.prototype.removeObserver = function(e) {
                        var t = this.observers_,
                            r = t.indexOf(e);
                        ~r && t.splice(r, 1), !t.length && this.connected_ && this.disconnect_()
                    }, e.prototype.refresh = function() {
                        this.updateObservers_() && this.refresh()
                    }, e.prototype.updateObservers_ = function() {
                        var e = this.observers_.filter(function(e) {
                            return e.gatherActive(), e.hasActive()
                        });
                        return e.forEach(function(e) {
                            return e.broadcastActive()
                        }), e.length > 0
                    }, e.prototype.connect_ = function() {
                        r && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), u ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0)
                    }, e.prototype.disconnect_ = function() {
                        r && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1)
                    }, e.prototype.onTransitionEnd_ = function(e) {
                        var t = e.propertyName,
                            r = void 0 === t ? "" : t;
                        a.some(function(e) {
                            return !!~r.indexOf(e)
                        }) && this.refresh()
                    }, e.getInstance = function() {
                        return this.instance_ || (this.instance_ = new e), this.instance_
                    }, e.instance_ = null, e
                }(),
                p = function(e, t) {
                    for (var r = 0, n = Object.keys(t); r < n.length; r++) {
                        var o = n[r];
                        Object.defineProperty(e, o, {
                            value: t[o],
                            enumerable: !1,
                            writable: !1,
                            configurable: !0
                        })
                    }
                    return e
                },
                c = function(e) {
                    return e && e.ownerDocument && e.ownerDocument.defaultView || n
                },
                d = m(0, 0, 0, 0);

            function h(e) {
                return parseFloat(e) || 0
            }

            function f(e) {
                for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                return t.reduce(function(t, r) {
                    return t + h(e["border-" + r + "-width"])
                }, 0)
            }
            var _ = "undefined" != typeof SVGGraphicsElement ? function(e) {
                return e instanceof c(e).SVGGraphicsElement
            } : function(e) {
                return e instanceof c(e).SVGElement && "function" == typeof e.getBBox
            };

            function y(e) {
                return r ? _(e) ? function(e) {
                    var t = e.getBBox();
                    return m(0, 0, t.width, t.height)
                }(e) : function(e) {
                    var t = e.clientWidth,
                        r = e.clientHeight;
                    if (!t && !r) return d;
                    var n = c(e).getComputedStyle(e),
                        o = function(e) {
                            for (var t = {}, r = 0, n = ["top", "right", "bottom", "left"]; r < n.length; r++) {
                                var o = n[r],
                                    i = e["padding-" + o];
                                t[o] = h(i)
                            }
                            return t
                        }(n),
                        i = o.left + o.right,
                        s = o.top + o.bottom,
                        a = h(n.width),
                        u = h(n.height);
                    if ("border-box" === n.boxSizing && (Math.round(a + i) !== t && (a -= f(n, "left", "right") + i), Math.round(u + s) !== r && (u -= f(n, "top", "bottom") + s)), ! function(e) {
                            return e === c(e).document.documentElement
                        }(e)) {
                        var l = Math.round(a + i) - t,
                            p = Math.round(u + s) - r;
                        1 !== Math.abs(l) && (a -= l), 1 !== Math.abs(p) && (u -= p)
                    }
                    return m(o.left, o.top, a, u)
                }(e) : d
            }

            function m(e, t, r, n) {
                return {
                    x: e,
                    y: t,
                    width: r,
                    height: n
                }
            }
            var g = function() {
                    function e(e) {
                        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = m(0, 0, 0, 0), this.target = e
                    }
                    return e.prototype.isActive = function() {
                        var e = y(this.target);
                        return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
                    }, e.prototype.broadcastRect = function() {
                        var e = this.contentRect_;
                        return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e
                    }, e
                }(),
                b = function(e, t) {
                    var r, n, o, i, s, a, u, l = (n = (r = t).x, o = r.y, i = r.width, s = r.height, a = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, u = Object.create(a.prototype), p(u, {
                        x: n,
                        y: o,
                        width: i,
                        height: s,
                        top: o,
                        right: n + i,
                        bottom: s + o,
                        left: n
                    }), u);
                    p(this, {
                        target: e,
                        contentRect: l
                    })
                },
                v = function() {
                    function e(e, r, n) {
                        if (this.activeObservations_ = [], this.observations_ = new t, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
                        this.callback_ = e, this.controller_ = r, this.callbackCtx_ = n
                    }
                    return e.prototype.observe = function(e) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(e instanceof c(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var t = this.observations_;
                            t.has(e) || (t.set(e, new g(e)), this.controller_.addObserver(this), this.controller_.refresh())
                        }
                    }, e.prototype.unobserve = function(e) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(e instanceof c(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var t = this.observations_;
                            t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this))
                        }
                    }, e.prototype.disconnect = function() {
                        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
                    }, e.prototype.gatherActive = function() {
                        var e = this;
                        this.clearActive(), this.observations_.forEach(function(t) {
                            t.isActive() && e.activeObservations_.push(t)
                        })
                    }, e.prototype.broadcastActive = function() {
                        if (this.hasActive()) {
                            var e = this.callbackCtx_,
                                t = this.activeObservations_.map(function(e) {
                                    return new b(e.target, e.broadcastRect())
                                });
                            this.callback_.call(e, t, e), this.clearActive()
                        }
                    }, e.prototype.clearActive = function() {
                        this.activeObservations_.splice(0)
                    }, e.prototype.hasActive = function() {
                        return this.activeObservations_.length > 0
                    }, e
                }(),
                w = "undefined" != typeof WeakMap ? new WeakMap : new t,
                S = function e(t) {
                    if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    var r = l.getInstance(),
                        n = new v(t, r, this);
                    w.set(this, n)
                };
            return ["observe", "unobserve", "disconnect"].forEach(function(e) {
                S.prototype[e] = function() {
                    var t;
                    return (t = w.get(this))[e].apply(t, arguments)
                }
            }), void 0 !== n.ResizeObserver ? n.ResizeObserver : S
        })
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), _$ResizeObserver_54 = _$ResizeObserver_54.exports;
    var _$classnames_9 = {
        exports: {}
    };
    ! function() {
        "use strict";
        var e = {}.hasOwnProperty;

        function t() {
            for (var r = [], n = 0; n < arguments.length; n++) {
                var o = arguments[n];
                if (o) {
                    var i = typeof o;
                    if ("string" === i || "number" === i) r.push(o);
                    else if (Array.isArray(o) && o.length) {
                        var s = t.apply(null, o);
                        s && r.push(s)
                    } else if ("object" === i)
                        for (var a in o) e.call(o, a) && o[a] && r.push(a)
                }
            }
            return r.join(" ")
        }
        _$classnames_9.exports ? (t.default = t, _$classnames_9.exports = t) : "function" == typeof define && "object" == typeof define.amd && define.amd ? define("classnames", [], function() {
            return t
        }) : window.classNames = t
    }(), _$classnames_9 = _$classnames_9.exports;
    var _$preactCssTransitionGroup_48 = {
            exports: {}
        },
        __global_48, __factory_48;
    __global_48 = this, __factory_48 = function(e) {
        "use strict";

        function t(e) {
            return e.attributes && e.attributes.key
        }

        function r(e) {
            return e.base
        }

        function n(e) {
            return e && e.filter(function(e) {
                return null !== e
            })
        }

        function o(e, t) {
            for (var r = e.length; r--;)
                if (t(e[r])) return !0;
            return !1
        }

        function i(e, r) {
            return o(e, function(e) {
                return t(e) === r
            })
        }

        function s(e, r) {
            return i(e, t(r))
        }

        function a(e, r, n) {
            return o(e, function(e) {
                return t(e) === r && e.props[n]
            })
        }

        function u(e, r, n) {
            return a(e, t(r), n)
        }
        var l = " ",
            p = /[\n\t\r]+/g,
            c = function(e) {
                return (l + e + l).replace(p, l)
            };

        function d(e, t) {
            var r;
            e.classList ? (r = e.classList).add.apply(r, t.split(" ")) : e.className += " " + t
        }

        function h(e, t) {
            if (t = t.trim(), e.classList) {
                var r;
                (r = e.classList).remove.apply(r, t.split(" "))
            } else {
                var n = e.className.trim(),
                    o = c(n);
                for (t = l + t + l; o.indexOf(t) >= 0;) o = o.replace(t, l);
                e.className = o.trim()
            }
        }
        var f = {
                transitionend: {
                    transition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "mozTransitionEnd",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd"
                },
                animationend: {
                    animation: "animationend",
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "mozAnimationEnd",
                    OAnimation: "oAnimationEnd",
                    msAnimation: "MSAnimationEnd"
                }
            },
            _ = [];
        "undefined" != typeof window && function() {
            var e = document.createElement("div").style;
            for (var t in "AnimationEvent" in window || delete f.animationend.animation, "TransitionEvent" in window || delete f.transitionend.transition, f) {
                var r = f[t];
                for (var n in r)
                    if (n in e) {
                        _.push(r[n]);
                        break
                    }
            }
        }();
        var y = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            m = function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            },
            g = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            },
            b = function(e) {
                function t() {
                    var n, o;
                    y(this, t);
                    for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
                    return n = o = g(this, e.call.apply(e, [this].concat(s))), o.flushClassNameQueue = function() {
                        r(o) && d(r(o), o.classNameQueue.join(" ")), o.classNameQueue.length = 0, o.timeout = null
                    }, g(o, n)
                }
                return m(t, e), t.prototype.transition = function(e, t, n) {
                    var o = this,
                        i = r(this),
                        s = this.props.name[e] || this.props.name + "-" + e,
                        a = this.props.name[e + "Active"] || s + "-active",
                        u = null;
                    this.endListener && this.endListener(), this.endListener = function(e) {
                        e && e.target !== i || (clearTimeout(u), h(i, s), h(i, a), function(e, t) {
                            _.length && _.forEach(function(r) {
                                e.removeEventListener(r, t, !1)
                            })
                        }(i, o.endListener), o.endListener = null, t && t())
                    }, n ? (u = setTimeout(this.endListener, n), this.transitionTimeouts.push(u)) : function(e, t) {
                        if (!_.length) return window.setTimeout(t, 0);
                        _.forEach(function(r) {
                            e.addEventListener(r, t, !1)
                        })
                    }(i, this.endListener), d(i, s), this.queueClass(a)
                }, t.prototype.queueClass = function(e) {
                    this.classNameQueue.push(e), this.timeout || (this.timeout = setTimeout(this.flushClassNameQueue, 17))
                }, t.prototype.stop = function() {
                    this.timeout && (clearTimeout(this.timeout), this.classNameQueue.length = 0, this.timeout = null), this.endListener && this.endListener()
                }, t.prototype.componentWillMount = function() {
                    this.classNameQueue = [], this.transitionTimeouts = []
                }, t.prototype.componentWillUnmount = function() {
                    this.timeout && clearTimeout(this.timeout), this.transitionTimeouts.forEach(function(e) {
                        clearTimeout(e)
                    })
                }, t.prototype.componentWillEnter = function(e) {
                    this.props.enter ? this.transition("enter", e, this.props.enterTimeout) : e()
                }, t.prototype.componentWillLeave = function(e) {
                    this.props.leave ? this.transition("leave", e, this.props.leaveTimeout) : e()
                }, t.prototype.render = function() {
                    return (e = this.props.children) && e[0];
                    var e
                }, t
            }(e.Component),
            v = function(r) {
                function o(n) {
                    y(this, o);
                    var i = g(this, r.call(this));
                    return i.renderChild = function(r) {
                        var n = i.props,
                            o = n.transitionName,
                            s = n.transitionEnter,
                            a = n.transitionLeave,
                            u = n.transitionEnterTimeout,
                            l = n.transitionLeaveTimeout,
                            p = t(r);
                        return e.h(b, {
                            key: p,
                            ref: function(e) {
                                (i.refs[p] = e) || (r = null)
                            },
                            name: o,
                            enter: s,
                            leave: a,
                            enterTimeout: u,
                            leaveTimeout: l
                        }, r)
                    }, i.refs = {}, i.state = {
                        children: (n.children || []).slice()
                    }, i
                }
                return m(o, r), o.prototype.shouldComponentUpdate = function(e, t) {
                    return t.children !== this.state.children
                }, o.prototype.componentWillMount = function() {
                    this.currentlyTransitioningKeys = {}, this.keysToEnter = [], this.keysToLeave = []
                }, o.prototype.componentWillReceiveProps = function(r) {
                    var o, a, l, p, c = this,
                        d = r.children,
                        h = r.exclusive,
                        f = r.showProp,
                        _ = n(d || []).slice(),
                        y = n(h ? this.props.children : this.state.children),
                        m = (o = _, a = [], l = {}, p = [], y.forEach(function(e) {
                            var r = t(e);
                            i(o, r) ? p.length && (l[r] = p, p = []) : p.push(e)
                        }), o.forEach(function(e) {
                            var r = t(e);
                            l.hasOwnProperty(r) && (a = a.concat(l[r])), a.push(e)
                        }), a.concat(p));
                    f && (m = m.map(function(t) {
                        var r;
                        return !t.props[f] && u(y, t, f) && (t = e.cloneElement(t, ((r = {})[f] = !0, r))), t
                    })), h && m.forEach(function(e) {
                        return c.stop(t(e))
                    }), this.setState({
                        children: m
                    }), this.forceUpdate(), _.forEach(function(e) {
                        var t = e.key,
                            r = y && s(y, e);
                        if (f) {
                            if (r) {
                                var n = u(y, e, f),
                                    o = e.props[f];
                                n || !o || c.currentlyTransitioningKeys[t] || c.keysToEnter.push(t)
                            }
                        } else r || c.currentlyTransitioningKeys[t] || c.keysToEnter.push(t)
                    }), y.forEach(function(e) {
                        var t = e.key,
                            r = _ && s(_, e);
                        if (f) {
                            if (r) {
                                var n = u(_, e, f),
                                    o = e.props[f];
                                n || !o || c.currentlyTransitioningKeys[t] || c.keysToLeave.push(t)
                            }
                        } else r || c.currentlyTransitioningKeys[t] || c.keysToLeave.push(t)
                    })
                }, o.prototype.performEnter = function(e) {
                    var t = this;
                    this.currentlyTransitioningKeys[e] = !0;
                    var r = this.refs[e];
                    r.componentWillEnter ? r.componentWillEnter(function() {
                        return t._handleDoneEntering(e)
                    }) : this._handleDoneEntering(e)
                }, o.prototype._handleDoneEntering = function(e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = n(this.props.children),
                        r = this.props.showProp;
                    !t || !r && !i(t, e) || r && !a(t, e, r) ? this.performLeave(e) : this.setState({
                        children: t
                    })
                }, o.prototype.stop = function(e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = this.refs[e];
                    t && t.stop()
                }, o.prototype.performLeave = function(e) {
                    var t = this;
                    this.currentlyTransitioningKeys[e] = !0;
                    var r = this.refs[e];
                    r && r.componentWillLeave ? r.componentWillLeave(function() {
                        return t._handleDoneLeaving(e)
                    }) : this._handleDoneLeaving(e)
                }, o.prototype._handleDoneLeaving = function(e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = this.props.showProp,
                        r = n(this.props.children);
                    t && r && a(r, e, t) ? this.performEnter(e) : !t && r && i(r, e) ? this.performEnter(e) : this.setState({
                        children: r
                    })
                }, o.prototype.componentDidUpdate = function() {
                    var e = this,
                        t = this.keysToEnter,
                        r = this.keysToLeave;
                    this.keysToEnter = [], t.forEach(function(t) {
                        return e.performEnter(t)
                    }), this.keysToLeave = [], r.forEach(function(t) {
                        return e.performLeave(t)
                    })
                }, o.prototype.render = function(t, r) {
                    var o = t.component,
                        i = (t.transitionName, t.transitionEnter, t.transitionLeave, t.transitionEnterTimeout, t.transitionLeaveTimeout, t.children, function(e, t) {
                            var r = {};
                            for (var n in e) t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
                            return r
                        }(t, ["component", "transitionName", "transitionEnter", "transitionLeave", "transitionEnterTimeout", "transitionLeaveTimeout", "children"])),
                        s = r.children;
                    return e.h(o, i, n(s).map(this.renderChild))
                }, o
            }(e.Component);
        return v.defaultProps = {
            component: "span",
            transitionEnter: !0,
            transitionLeave: !0
        }, v
    }, "object" == typeof _$preactCssTransitionGroup_48.exports ? _$preactCssTransitionGroup_48.exports = __factory_48(_$preact_49) : "function" == typeof define && define.amd ? define(["preact"], __factory_48) : __global_48.PreactCSSTransitionGroup = __factory_48(__global_48.preact), _$preactCssTransitionGroup_48 = _$preactCssTransitionGroup_48.exports;
    var __dummy_98$0 = 0,
        h = _$preact_49.h,
        ActionBrowseTagline = function(e) {
            function t(r) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r));
                return n.handleClick = n.handleClick.bind(n), n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleClick = function(e) {
                this.input.click()
            }, t.prototype.render = function() {
                var e = this,
                    t = h("button", {
                        type: "button",
                        class: "uppy-Dashboard-browse",
                        onclick: this.handleClick
                    }, this.props.i18n("browse"));
                return h("div", {
                    class: "uppy-Dashboard-dropFilesTitle"
                }, 0 === this.props.acquirers.length ? this.props.i18nArray("dropPaste", {
                    browse: t
                }) : this.props.i18nArray("dropPasteImport", {
                    browse: t
                }), h("input", {
                    class: "uppy-Dashboard-input",
                    hidden: !0,
                    "aria-hidden": "true",
                    tabindex: -1,
                    type: "file",
                    name: "files[]",
                    multiple: 1 !== this.props.maxNumberOfFiles,
                    onchange: this.props.handleInputChange,
                    accept: this.props.allowedFileTypes,
                    value: "",
                    ref: function(t) {
                        e.input = t
                    }
                }))
            }, t
        }(_$preact_49.Component),
        _$ActionBrowseTagline_98 = ActionBrowseTagline,
        __h_109 = _$preact_49.h,
        _$icons_109 = {
            defaultTabIcon: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    width: "30",
                    height: "30",
                    viewBox: "0 0 30 30"
                }, __h_109("path", {
                    d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
                }))
            },
            iconCopy: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon",
                    width: "51",
                    height: "51",
                    viewBox: "0 0 51 51"
                }, __h_109("path", {
                    d: "M17.21 45.765a5.394 5.394 0 0 1-7.62 0l-4.12-4.122a5.393 5.393 0 0 1 0-7.618l6.774-6.775-2.404-2.404-6.775 6.776c-3.424 3.427-3.424 9 0 12.426l4.12 4.123a8.766 8.766 0 0 0 6.216 2.57c2.25 0 4.5-.858 6.214-2.57l13.55-13.552a8.72 8.72 0 0 0 2.575-6.213 8.73 8.73 0 0 0-2.575-6.213l-4.123-4.12-2.404 2.404 4.123 4.12a5.352 5.352 0 0 1 1.58 3.81c0 1.438-.562 2.79-1.58 3.808l-13.55 13.55z"
                }), __h_109("path", {
                    d: "M44.256 2.858A8.728 8.728 0 0 0 38.043.283h-.002a8.73 8.73 0 0 0-6.212 2.574l-13.55 13.55a8.725 8.725 0 0 0-2.575 6.214 8.73 8.73 0 0 0 2.574 6.216l4.12 4.12 2.405-2.403-4.12-4.12a5.357 5.357 0 0 1-1.58-3.812c0-1.437.562-2.79 1.58-3.808l13.55-13.55a5.348 5.348 0 0 1 3.81-1.58c1.44 0 2.792.562 3.81 1.58l4.12 4.12c2.1 2.1 2.1 5.518 0 7.617L39.2 23.775l2.404 2.404 6.775-6.777c3.426-3.427 3.426-9 0-12.426l-4.12-4.12z"
                }))
            },
            iconRetry: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon retry",
                    width: "28",
                    height: "31",
                    viewBox: "0 0 16 19",
                    xmlns: "http://www.w3.org/2000/svg"
                }, __h_109("path", {
                    d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
                }), __h_109("path", {
                    d: "M7.9 3H10v2H7.9z"
                }), __h_109("path", {
                    d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
                }), __h_109("path", {
                    d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
                }))
            },
            localIcon: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    fill: "#607d8b",
                    width: "27",
                    height: "25",
                    viewBox: "0 0 27 25"
                }, __h_109("path", {
                    d: "M5.586 9.288a.313.313 0 0 0 .282.176h4.84v3.922c0 1.514 1.25 2.24 2.792 2.24 1.54 0 2.79-.726 2.79-2.24V9.464h4.84c.122 0 .23-.068.284-.176a.304.304 0 0 0-.046-.324L13.735.106a.316.316 0 0 0-.472 0l-7.63 8.857a.302.302 0 0 0-.047.325z"
                }), __h_109("path", {
                    d: "M24.3 5.093c-.218-.76-.54-1.187-1.208-1.187h-4.856l1.018 1.18h3.948l2.043 11.038h-7.193v2.728H9.114v-2.725h-7.36l2.66-11.04h3.33l1.018-1.18H3.907c-.668 0-1.06.46-1.21 1.186L0 16.456v7.062C0 24.338.676 25 1.51 25h23.98c.833 0 1.51-.663 1.51-1.482v-7.062L24.3 5.093z"
                }))
            },
            iconAudio: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon",
                    width: "55",
                    height: "55",
                    viewBox: "0 0 55 55"
                }, __h_109("path", {
                    d: "M52.66.25c-.216-.19-.5-.276-.79-.242l-31 4.01a1 1 0 0 0-.87.992V40.622C18.174 38.428 15.273 37 12 37c-5.514 0-10 4.037-10 9s4.486 9 10 9 10-4.037 10-9c0-.232-.02-.46-.04-.687.014-.065.04-.124.04-.192V16.12l29-3.753v18.257C49.174 28.428 46.273 27 43 27c-5.514 0-10 4.037-10 9s4.486 9 10 9c5.464 0 9.913-3.966 9.993-8.867 0-.013.007-.024.007-.037V1a.998.998 0 0 0-.34-.75zM12 53c-4.41 0-8-3.14-8-7s3.59-7 8-7 8 3.14 8 7-3.59 7-8 7zm31-10c-4.41 0-8-3.14-8-7s3.59-7 8-7 8 3.14 8 7-3.59 7-8 7zM22 14.1V5.89l29-3.753v8.21l-29 3.754z"
                }))
            },
            iconVideo: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon",
                    viewBox: "0 0 58 58"
                }, __h_109("path", {
                    d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
                }), __h_109("path", {
                    d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
                }))
            },
            iconPDF: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon",
                    viewBox: "0 0 342 335"
                }, __h_109("path", {
                    d: "M329.337 227.84c-2.1 1.3-8.1 2.1-11.9 2.1-12.4 0-27.6-5.7-49.1-14.9 8.3-.6 15.8-.9 22.6-.9 12.4 0 16 0 28.2 3.1 12.1 3 12.2 9.3 10.2 10.6zm-215.1 1.9c4.8-8.4 9.7-17.3 14.7-26.8 12.2-23.1 20-41.3 25.7-56.2 11.5 20.9 25.8 38.6 42.5 52.8 2.1 1.8 4.3 3.5 6.7 5.3-34.1 6.8-63.6 15-89.6 24.9zm39.8-218.9c6.8 0 10.7 17.06 11 33.16.3 16-3.4 27.2-8.1 35.6-3.9-12.4-5.7-31.8-5.7-44.5 0 0-.3-24.26 2.8-24.26zm-133.4 307.2c3.9-10.5 19.1-31.3 41.6-49.8 1.4-1.1 4.9-4.4 8.1-7.4-23.5 37.6-39.3 52.5-49.7 57.2zm315.2-112.3c-6.8-6.7-22-10.2-45-10.5-15.6-.2-34.3 1.2-54.1 3.9-8.8-5.1-17.9-10.6-25.1-17.3-19.2-18-35.2-42.9-45.2-70.3.6-2.6 1.2-4.8 1.7-7.1 0 0 10.8-61.5 7.9-82.3-.4-2.9-.6-3.7-1.4-5.9l-.9-2.5c-2.9-6.76-8.7-13.96-17.8-13.57l-5.3-.17h-.1c-10.1 0-18.4 5.17-20.5 12.84-6.6 24.3.2 60.5 12.5 107.4l-3.2 7.7c-8.8 21.4-19.8 43-29.5 62l-1.3 2.5c-10.2 20-19.5 37-27.9 51.4l-8.7 4.6c-.6.4-15.5 8.2-19 10.3-29.6 17.7-49.28 37.8-52.54 53.8-1.04 5-.26 11.5 5.01 14.6l8.4 4.2c3.63 1.8 7.53 2.7 11.43 2.7 21.1 0 45.6-26.2 79.3-85.1 39-12.7 83.4-23.3 122.3-29.1 29.6 16.7 66 28.3 89 28.3 4.1 0 7.6-.4 10.5-1.2 4.4-1.1 8.1-3.6 10.4-7.1 4.4-6.7 5.4-15.9 4.1-25.4-.3-2.8-2.6-6.3-5-8.7z"
                }))
            },
            iconText: function() {
                return __h_109("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon",
                    width: "62",
                    height: "62",
                    viewBox: "0 0 62 62",
                    xmlns: "http://www.w3.org/2000/svg"
                }, __h_109("path", {
                    d: "M4.309 4.309h24.912v53.382h-6.525v3.559h16.608v-3.559h-6.525V4.309h24.912v10.676h3.559V.75H.75v14.235h3.559z",
                    "fill-rule": "nonzero",
                    fill: "#000"
                }))
            }
        },
        __dummy_99$0 = 0,
        localIcon = _$icons_109.localIcon,
        __dummy_99$1 = 0,
        __h_99 = _$preact_49.h,
        Component = _$preact_49.Component,
        poweredByUppy = function(e) {
            return __h_99("a", {
                tabindex: "-1",
                href: "https://uppy.io",
                rel: "noreferrer noopener",
                target: "_blank",
                class: "uppy-Dashboard-poweredBy"
            }, "Powered by ", __h_99("svg", {
                "aria-hidden": "true",
                class: "UppyIcon uppy-Dashboard-poweredByIcon",
                width: "11",
                height: "11",
                viewBox: "0 0 11 11",
                xmlns: "http://www.w3.org/2000/svg"
            }, __h_99("path", {
                d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
                "fill-rule": "evenodd"
            })), __h_99("span", {
                class: "uppy-Dashboard-poweredByUppy"
            }, "Uppy"))
        },
        AddFiles = function(e) {
            function t(r) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r));
                return n.handleClick = n.handleClick.bind(n), n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleClick = function(e) {
                this.input.click()
            }, t.prototype.render = function() {
                var e = this,
                    t = 0 !== this.props.acquirers.length;
                return __h_99("div", {
                    class: "uppy-DashboarAddFiles"
                }, t ? __h_99("div", {
                    class: "uppy-DashboardTabs"
                }, __h_99(_$ActionBrowseTagline_98, {
                    acquirers: this.props.acquirers,
                    handleInputChange: this.props.handleInputChange,
                    i18n: this.props.i18n,
                    i18nArray: this.props.i18nArray,
                    allowedFileTypes: this.props.allowedFileTypes,
                    maxNumberOfFiles: this.props.maxNumberOfFiles
                }), __h_99("div", {
                    class: "uppy-DashboardTabs-list",
                    role: "tablist"
                }, __h_99("div", {
                    class: "uppy-DashboardTab",
                    role: "presentation"
                }, __h_99("button", {
                    type: "button",
                    class: "uppy-DashboardTab-btn",
                    role: "tab",
                    tabindex: 0,
                    onclick: this.handleClick
                }, localIcon(), __h_99("div", {
                    class: "uppy-DashboardTab-name"
                }, this.props.i18n("myDevice"))), __h_99("input", {
                    class: "uppy-Dashboard-input",
                    hidden: !0,
                    "aria-hidden": "true",
                    tabindex: -1,
                    type: "file",
                    name: "files[]",
                    multiple: 1 !== this.props.maxNumberOfFiles,
                    accept: this.props.allowedFileTypes,
                    onchange: this.props.handleInputChange,
                    value: "",
                    ref: function(t) {
                        e.input = t
                    }
                })), this.props.acquirers.map(function(t) {
                    return __h_99("div", {
                        class: "uppy-DashboardTab",
                        role: "presentation"
                    }, __h_99("button", {
                        class: "uppy-DashboardTab-btn",
                        type: "button",
                        role: "tab",
                        tabindex: 0,
                        "aria-controls": "uppy-DashboardContent-panel--" + t.id,
                        "aria-selected": e.props.activePanel.id === t.id,
                        onclick: function() {
                            return e.props.showPanel(t.id)
                        }
                    }, t.icon(), __h_99("div", {
                        class: "uppy-DashboardTab-name"
                    }, t.name)))
                }))) : __h_99("div", {
                    class: "uppy-DashboardTabs"
                }, __h_99(_$ActionBrowseTagline_98, {
                    acquirers: this.props.acquirers,
                    handleInputChange: this.props.handleInputChange,
                    i18n: this.props.i18n,
                    i18nArray: this.props.i18nArray,
                    allowedFileTypes: this.props.allowedFileTypes,
                    maxNumberOfFiles: this.props.maxNumberOfFiles
                })), __h_99("div", {
                    class: "uppy-DashboarAddFiles-info"
                }, this.props.note && __h_99("div", {
                    class: "uppy-Dashboard-note"
                }, this.props.note), this.props.proudlyDisplayPoweredByUppy && poweredByUppy(this.props)))
            }, t
        }(Component),
        _$AddFiles_99 = AddFiles,
        __h_100 = _$preact_49.h,
        __dummy_100$0 = 0,
        _$AddFilesPanel_100 = function(e) {
            return __h_100("div", {
                class: "uppy-Dashboard-AddFilesPanel",
                "aria-hidden": e.showAddFilesPanel
            }, __h_100("div", {
                class: "uppy-DashboardContent-bar"
            }, __h_100("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "h1"
            }, e.i18n("addingMoreFiles")), __h_100("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: function(t) {
                    return e.toggleAddFilesPanel(!1)
                }
            }, e.i18n("back"))), __h_100(_$AddFiles_99, e))
        },
        __dummy_112$0 = 0,
        iconText = _$icons_109.iconText,
        iconAudio = _$icons_109.iconAudio,
        iconVideo = _$icons_109.iconVideo,
        iconPDF = _$icons_109.iconPDF,
        _$getFileTypeIcon_112 = function(e) {
            var t = {
                color: "#cbcbcb",
                icon: ""
            };
            if (!e) return t;
            var r = e.split("/")[0],
                n = e.split("/")[1];
            return "text" === r ? {
                color: "#cbcbcb",
                icon: iconText()
            } : "audio" === r ? {
                color: "#1abc9c",
                icon: iconAudio()
            } : "video" === r ? {
                color: "#2980b9",
                icon: iconVideo()
            } : "application" === r && "pdf" === n ? {
                color: "#e74c3c",
                icon: iconPDF()
            } : "image" === r ? {
                color: "#f2f2f2",
                icon: ""
            } : t
        },
        __dummy_106$0 = 0,
        __h_106 = _$preact_49.h,
        _$FilePreview_106 = function(e) {
            var t = e.file;
            if (t.preview) return __h_106("img", {
                class: "uppy-DashboardItem-previewImg",
                alt: t.name,
                src: t.preview
            });
            var r = _$getFileTypeIcon_112(t.type),
                n = r.color,
                o = r.icon;
            return __h_106("div", {
                class: "uppy-DashboardItem-previewIconWrap"
            }, __h_106("span", {
                class: "uppy-DashboardItem-previewIcon",
                style: {
                    color: n
                }
            }, o), __h_106("svg", {
                class: "uppy-DashboardItem-previewIconBg",
                width: "72",
                height: "93",
                viewBox: "0 0 72 93"
            }, __h_106("g", null, __h_106("path", {
                d: "M24.08 5h38.922A2.997 2.997 0 0 1 66 8.003v74.994A2.997 2.997 0 0 1 63.004 86H8.996A2.998 2.998 0 0 1 6 83.01V22.234L24.08 5z",
                fill: "#FFF"
            }), __h_106("path", {
                d: "M24 5L6 22.248h15.007A2.995 2.995 0 0 0 24 19.244V5z",
                fill: "#E4E4E4"
            }))))
        },
        _$ignoreEvent_113 = function(e) {
            var t = e.target.tagName;
            "INPUT" !== t && "TEXTAREA" !== t ? (e.preventDefault(), e.stopPropagation()) : e.stopPropagation()
        },
        __dummy_102$0 = 0,
        __dummy_102$1 = 0,
        __dummy_102$2 = 0,
        __dummy_102$3 = 0,
        __h_102 = _$preact_49.h,
        FileCard = function(e) {
            function t(r) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r));
                return n.meta = {}, n.tempStoreMetaOrSubmit = n.tempStoreMetaOrSubmit.bind(n), n.renderMetaFields = n.renderMetaFields.bind(n), n.handleSave = n.handleSave.bind(n), n.handleCancel = n.handleCancel.bind(n), n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                var e = this;
                setTimeout(function() {
                    e.firstInput && e.firstInput.focus({
                        preventScroll: !0
                    })
                }, 150)
            }, t.prototype.tempStoreMetaOrSubmit = function(e) {
                var t = this.props.files[this.props.fileCardFor];
                if (13 === e.keyCode) return e.stopPropagation(), e.preventDefault(), void this.props.saveFileCard(this.meta, t.id);
                var r = e.target.value,
                    n = e.target.dataset.name;
                this.meta[n] = r
            }, t.prototype.renderMetaFields = function(e) {
                var t = this;
                return (this.props.metaFields || []).map(function(r, n) {
                    return __h_102("fieldset", {
                        class: "uppy-DashboardFileCard-fieldset"
                    }, __h_102("label", {
                        class: "uppy-DashboardFileCard-label"
                    }, r.name), __h_102("input", {
                        class: "uppy-c-textInput uppy-DashboardFileCard-input",
                        type: "text",
                        "data-name": r.id,
                        value: e.meta[r.id],
                        placeholder: r.placeholder,
                        onkeyup: t.tempStoreMetaOrSubmit,
                        onkeydown: t.tempStoreMetaOrSubmit,
                        onkeypress: t.tempStoreMetaOrSubmit,
                        ref: function(e) {
                            0 === n && (t.firstInput = e)
                        }
                    }))
                })
            }, t.prototype.handleSave = function(e) {
                var t = this.props.fileCardFor;
                this.props.saveFileCard(this.meta, t)
            }, t.prototype.handleCancel = function(e) {
                this.meta = {}, this.props.toggleFileCard()
            }, t.prototype.render = function() {
                var e = this.props.files[this.props.fileCardFor];
                return __h_102("div", {
                    class: "uppy-DashboardFileCard",
                    onDragOver: _$ignoreEvent_113,
                    onDragLeave: _$ignoreEvent_113,
                    onDrop: _$ignoreEvent_113,
                    onPaste: _$ignoreEvent_113
                }, __h_102("div", {
                    class: "uppy-DashboardContent-bar"
                }, __h_102("div", {
                    class: "uppy-DashboardContent-title",
                    role: "heading",
                    "aria-level": "h1"
                }, this.props.i18nArray("editing", {
                    file: __h_102("span", {
                        class: "uppy-DashboardContent-titleFile"
                    }, e.meta ? e.meta.name : e.name)
                })), __h_102("button", {
                    type: "button",
                    title: this.props.i18n("finishEditingFile"),
                    onclick: this.handleSave
                }, this.props.i18n("done"))), __h_102("div", {
                    class: "uppy-DashboardFileCard-inner"
                }, __h_102("div", {
                    class: "uppy-DashboardFileCard-preview",
                    style: {
                        backgroundColor: _$getFileTypeIcon_112(e.type).color
                    }
                }, __h_102(_$FilePreview_106, {
                    file: e
                })), __h_102("div", {
                    class: "uppy-DashboardFileCard-info"
                }, this.renderMetaFields(e)), __h_102("div", {
                    class: "uppy-Dashboard-actions"
                }, __h_102("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-actionsBtn",
                    type: "button",
                    onclick: this.handleSave
                }, this.props.i18n("saveChanges")), __h_102("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-actionsBtn",
                    type: "button",
                    onclick: this.handleCancel
                }, this.props.i18n("cancel")))))
            }, t
        }(_$preact_49.Component),
        _$FileCard_102 = FileCard,
        __h_104 = _$preact_49.h,
        circleLength = 2 * Math.PI * 15,
        _$FileItemProgress_104 = function(e) {
            return __h_104("svg", {
                width: "70",
                height: "70",
                viewBox: "0 0 36 36",
                class: "UppyIcon UppyIcon-progressCircle"
            }, __h_104("g", {
                class: "progress-group"
            }, __h_104("circle", {
                class: "bg",
                r: "15",
                cx: "18",
                cy: "18",
                "stroke-width": "2",
                fill: "none"
            }), __h_104("circle", {
                class: "progress",
                r: "15",
                cx: "18",
                cy: "18",
                transform: "rotate(-90, 18, 18)",
                "stroke-width": "2",
                fill: "none",
                "stroke-dasharray": circleLength,
                "stroke-dashoffset": circleLength - circleLength / 100 * e.progress
            })), e.hidePauseResumeCancelButtons || e.bundled ? null : __h_104("g", null, __h_104("polygon", {
                class: "play",
                transform: "translate(3, 3)",
                points: "12 20 12 10 20 15"
            }), __h_104("g", {
                class: "pause",
                transform: "translate(14.5, 13)"
            }, __h_104("rect", {
                x: "0",
                y: "0",
                width: "2",
                height: "10",
                rx: "0"
            }), __h_104("rect", {
                x: "5",
                y: "0",
                width: "2",
                height: "10",
                rx: "0"
            })), __h_104("polygon", {
                class: "cancel",
                transform: "translate(2, 2)",
                points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
            })), __h_104("polygon", {
                class: "check",
                transform: "translate(2, 3)",
                points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
            }))
        },
        _$copyToClipboard_111 = function(e, t) {
            return t = t || "Copy the URL below", new Promise(function(r) {
                var n = document.createElement("textarea");
                n.setAttribute("style", {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "2em",
                    height: "2em",
                    padding: 0,
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    background: "transparent"
                }), n.value = e, document.body.appendChild(n), n.select();
                var o = function() {
                    document.body.removeChild(n), window.prompt(t, e), r()
                };
                try {
                    return document.execCommand("copy") ? (document.body.removeChild(n), r()) : o()
                } catch (e) {
                    return document.body.removeChild(n), o()
                }
            })
        },
        _$truncateString_114 = function(e, t) {
            return e.length > t ? e.substr(0, t / 2) + "..." + e.substr(e.length - t / 4, e.length) : e
        },
        ___extends_103 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_103$0 = 0,
        __dummy_103$1 = 0,
        __dummy_103$2 = 0,
        __dummy_103$3 = 0,
        __dummy_103$4 = 0,
        __dummy_103$5 = 0,
        __dummy_103$6 = 0,
        __dummy_103$7 = 0,
        iconCopy = _$icons_109.iconCopy,
        iconRetry = _$icons_109.iconRetry,
        __dummy_103$8 = 0,
        __h_103 = _$preact_49.h;

    function FileItemProgressWrapper(e) {
        if (!e.hideRetryButton || !e.error) return e.isUploaded || e.bundled || e.hidePauseResumeCancelButtons && !e.error ? __h_103("div", {
            class: "uppy-DashboardItem-progressIndicator"
        }, __h_103(_$FileItemProgress_104, {
            progress: e.file.progress.percentage,
            fileID: e.file.id,
            hidePauseResumeCancelButtons: e.hidePauseResumeCancelButtons,
            bundled: e.bundled
        })) : __h_103("button", {
            class: "uppy-DashboardItem-progressIndicator",
            type: "button",
            "aria-label": e.progressIndicatorTitle,
            title: e.progressIndicatorTitle,
            onclick: e.onPauseResumeCancelRetry
        }, e.error ? e.hideRetryButton ? null : iconRetry() : __h_103(_$FileItemProgress_104, {
            progress: e.file.progress.percentage,
            fileID: e.file.id,
            hidePauseResumeCancelButtons: e.hidePauseResumeCancelButtons
        }))
    }
    var _$FileItem_103 = function(e) {
            var t = e.file,
                r = e.acquirers,
                n = t.progress.preprocess || t.progress.postprocess,
                o = t.progress.uploadComplete && !n && !t.error,
                i = t.progress.uploadStarted || n,
                s = t.progress.uploadStarted && !t.progress.uploadComplete || n,
                a = t.isPaused || !1,
                u = t.error || !1,
                l = _$getFileNameAndExtension_161(t.meta.name).name,
                p = e.isWide ? _$truncateString_114(l, 30) : l,
                c = _$classnames_9("uppy-DashboardItem", {
                    "is-inprogress": s
                }, {
                    "is-processing": n
                }, {
                    "is-complete": o
                }, {
                    "is-paused": a
                }, {
                    "is-error": u
                }, {
                    "is-resumable": e.resumableUploads
                }, {
                    "is-bundled": e.bundledUpload
                });
            return __h_103("li", {
                class: c,
                id: "uppy_" + t.id,
                title: t.meta.name
            }, __h_103("div", {
                class: "uppy-DashboardItem-preview"
            }, __h_103("div", {
                class: "uppy-DashboardItem-previewInnerWrap",
                style: {
                    backgroundColor: _$getFileTypeIcon_112(t.type).color
                }
            }, e.showLinkToFileUploadResult && t.uploadURL ? __h_103("a", {
                class: "uppy-DashboardItem-previewLink",
                href: t.uploadURL,
                rel: "noreferrer noopener",
                target: "_blank"
            }) : null, __h_103(_$FilePreview_106, {
                file: t
            })), __h_103("div", {
                class: "uppy-DashboardItem-progress"
            }, __h_103(FileItemProgressWrapper, ___extends_103({
                progressIndicatorTitle: function(e) {
                    return o ? e.i18n("uploadComplete") : u ? e.i18n("retryUpload") : e.resumableUploads ? t.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.i18n("cancelUpload")
                }(e),
                onPauseResumeCancelRetry: function(r) {
                    o || (!u || e.hideRetryButton ? e.hidePauseResumeCancelButtons || (e.resumableUploads ? e.pauseUpload(t.id) : e.cancelUpload(t.id)) : e.retryUpload(t.id))
                },
                file: t,
                error: u
            }, e)))), __h_103("div", {
                class: "uppy-DashboardItem-info"
            }, __h_103("div", {
                class: "uppy-DashboardItem-name",
                title: l
            }, e.showLinkToFileUploadResult && t.uploadURL ? __h_103("a", {
                href: t.uploadURL,
                rel: "noreferrer noopener",
                target: "_blank"
            }, t.extension ? p + "." + t.extension : p) : t.extension ? p + "." + t.extension : p), __h_103("div", {
                class: "uppy-DashboardItem-status"
            }, t.data.size ? __h_103("div", {
                class: "uppy-DashboardItem-statusSize"
            }, _$prettierBytes_50(t.data.size)) : null, t.source && t.source !== e.id && __h_103("div", {
                class: "uppy-DashboardItem-sourceIcon"
            }, r.map(function(r) {
                if (r.id === t.source) return __h_103("span", {
                    title: e.i18n("fileSource", {
                        name: r.name
                    })
                }, r.icon())
            })), !i && e.metaFields && e.metaFields.length ? __h_103("button", {
                class: "uppy-DashboardItem-edit",
                type: "button",
                "aria-label": e.i18n("editFile"),
                title: e.i18n("editFile"),
                onclick: function(r) {
                    return e.toggleFileCard(t.id)
                }
            }, e.i18n("edit")) : null, e.showLinkToFileUploadResult && t.uploadURL ? __h_103("button", {
                class: "uppy-DashboardItem-copyLink",
                type: "button",
                "aria-label": e.i18n("copyLink"),
                title: e.i18n("copyLink"),
                onclick: function() {
                    _$copyToClipboard_111(t.uploadURL, e.i18n("copyLinkToClipboardFallback")).then(function() {
                        e.log("Link copied to clipboard."), e.info(e.i18n("copyLinkToClipboardSuccess"), "info", 3e3)
                    }).catch(e.log)
                }
            }, iconCopy()) : "")), __h_103("div", {
                class: "uppy-DashboardItem-action"
            }, !o && __h_103("button", {
                class: "uppy-DashboardItem-remove",
                type: "button",
                "aria-label": e.i18n("removeFile"),
                title: e.i18n("removeFile"),
                onclick: function() {
                    return e.removeFile(t.id)
                }
            }, __h_103("svg", {
                "aria-hidden": "true",
                class: "UppyIcon",
                width: "60",
                height: "60",
                viewBox: "0 0 60 60",
                xmlns: "http://www.w3.org/2000/svg"
            }, __h_103("path", {
                stroke: "#FFF",
                "stroke-width": "1",
                "fill-rule": "nonzero",
                "vector-effect": "non-scaling-stroke",
                d: "M30 1C14 1 1 14 1 30s13 29 29 29 29-13 29-29S46 1 30 1z"
            }), __h_103("path", {
                fill: "#FFF",
                "vector-effect": "non-scaling-stroke",
                d: "M42 39.667L39.667 42 30 32.333 20.333 42 18 39.667 27.667 30 18 20.333 20.333 18 30 27.667 39.667 18 42 20.333 32.333 30z"
            })))))
        },
        ___extends_105 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_105$0 = 0,
        __dummy_105$1 = 0,
        __h_105 = _$preact_49.h,
        _$FileList_105 = function(e) {
            var t = 0 === e.totalFileCount,
                r = _$classnames_9("uppy-Dashboard-files", {
                    "uppy-Dashboard-files--noFiles": t
                });
            return __h_105("ul", {
                class: r
            }, Object.keys(e.files).map(function(t) {
                return __h_105(_$FileItem_103, ___extends_105({}, e, {
                    acquirers: e.acquirers,
                    file: e.files[t]
                }))
            }))
        },
        __h_107 = _$preact_49.h,
        __dummy_107$0 = 0,
        _$PanelContent_107 = function(e) {
            return __h_107("div", {
                class: "uppy-DashboardContent-panel",
                role: "tabpanel",
                id: e.activePanel && "uppy-DashboardContent-panel--" + e.activePanel.id,
                onDragOver: _$ignoreEvent_113,
                onDragLeave: _$ignoreEvent_113,
                onDrop: _$ignoreEvent_113,
                onPaste: _$ignoreEvent_113
            }, __h_107("div", {
                class: "uppy-DashboardContent-bar"
            }, __h_107("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "h1"
            }, e.i18n("importFrom", {
                name: e.activePanel.name
            })), __h_107("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: e.hideAllPanels
            }, e.i18n("done"))), __h_107("div", {
                class: "uppy-DashboardContent-panelBody"
            }, e.getPlugin(e.activePanel.id).render(e.state)))
        },
        __h_108 = _$preact_49.h,
        uploadStates = {
            STATE_ERROR: "error",
            STATE_WAITING: "waiting",
            STATE_PREPROCESSING: "preprocessing",
            STATE_UPLOADING: "uploading",
            STATE_POSTPROCESSING: "postprocessing",
            STATE_COMPLETE: "complete",
            STATE_PAUSED: "paused"
        };

    function UploadStatus(e) {
        switch (function(e, t, r) {
            var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (e) return uploadStates.STATE_ERROR;
            if (t) return uploadStates.STATE_COMPLETE;
            if (r) return uploadStates.STATE_PAUSED;
            for (var o = uploadStates.STATE_WAITING, i = Object.keys(n), s = 0; s < i.length; s++) {
                var a = n[i[s]].progress;
                if (a.uploadStarted && !a.uploadComplete) return uploadStates.STATE_UPLOADING;
                a.preprocess && o !== uploadStates.STATE_UPLOADING && (o = uploadStates.STATE_PREPROCESSING), a.postprocess && o !== uploadStates.STATE_UPLOADING && o !== uploadStates.STATE_PREPROCESSING && (o = uploadStates.STATE_POSTPROCESSING)
            }
            return o
        }(e.isAllErrored, e.isAllComplete, e.isAllPaused, e.files)) {
            case "uploading":
                return e.i18n("uploadingXFiles", {
                    smart_count: e.inProgressNotPausedFiles.length
                });
            case "preprocessing":
            case "postprocessing":
                return e.i18n("processingXFiles", {
                    smart_count: e.processingFiles.length
                });
            case "paused":
                return e.i18n("uploadPaused");
            case "waiting":
                return e.i18n("xFilesSelected", {
                    smart_count: e.newFiles.length
                });
            case "complete":
                return e.i18n("uploadComplete")
        }
    }
    var _$PanelTopBar_108 = function(e) {
            var t = e.allowNewUpload;
            return t && e.maxNumberOfFiles && (t = e.totalFileCount < e.maxNumberOfFiles), __h_108("div", {
                class: "uppy-DashboardContent-bar"
            }, __h_108("div", null, e.isAllComplete ? null : __h_108("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: e.cancelAll
            }, e.i18n("cancel"))), __h_108("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "h1"
            }, __h_108(UploadStatus, e)), t && __h_108("button", {
                class: "uppy-DashboardContent-addMore",
                type: "button",
                "aria-label": e.i18n("addMoreFiles"),
                title: e.i18n("addMoreFiles"),
                onclick: function() {
                    return e.toggleAddFilesPanel(!0)
                }
            }, __h_108("svg", {
                class: "UppyIcon",
                width: "15",
                height: "15",
                viewBox: "0 0 13 13",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg"
            }, __h_108("path", {
                d: ""
            }))))
        },
        _$isTouchDevice_170 = function() {
            return "ontouchstart" in window || navigator.maxTouchPoints
        },
        ___extends_101 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_101$0 = 0,
        __dummy_101$1 = 0,
        __dummy_101$2 = 0,
        __dummy_101$3 = 0,
        __dummy_101$4 = 0,
        __dummy_101$5 = 0,
        __dummy_101$6 = 0,
        __dummy_101$7 = 0,
        __h_101 = _$preact_49.h,
        __dummy_101$8 = 0,
        _$Dashboard_101 = function(e) {
            var t = 0 === e.totalFileCount,
                r = _$classnames_9({
                    "uppy-Root": e.isTargetDOMEl
                }, "uppy-Dashboard", {
                    "Uppy--isTouchDevice": _$isTouchDevice_170()
                }, {
                    "uppy-Dashboard--animateOpenClose": e.animateOpenClose
                }, {
                    "uppy-Dashboard--isClosing": e.isClosing
                }, {
                    "uppy-Dashboard--modal": !e.inline
                }, {
                    "uppy-size--md": e.containerWidth > 576
                }, {
                    "uppy-size--lg": e.containerWidth > 700
                }, {
                    "uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel
                });
            return __h_101("div", {
                class: r,
                "aria-hidden": e.inline ? "false" : e.modal.isHidden,
                "aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
                onpaste: e.handlePaste
            }, __h_101("div", {
                class: "uppy-Dashboard-overlay",
                tabindex: -1,
                onclick: e.handleClickOutside
            }), __h_101("div", {
                class: "uppy-Dashboard-inner",
                "aria-modal": !e.inline && "true",
                role: !e.inline && "dialog",
                style: {
                    width: e.inline && e.width ? e.width : "",
                    height: e.inline && e.height ? e.height : ""
                }
            }, __h_101("button", {
                class: "uppy-Dashboard-close",
                type: "button",
                "aria-label": e.i18n("closeModal"),
                title: e.i18n("closeModal"),
                onclick: e.closeModal
            }, __h_101("span", {
                "aria-hidden": "true"
            }, "\xd7")), __h_101("div", {
                class: "uppy-Dashboard-innerWrap"
            }, !t && e.showSelectedFiles && __h_101(_$PanelTopBar_108, e), e.showSelectedFiles ? __h_101(t ? _$AddFiles_99 : _$FileList_105, e) : __h_101(_$AddFiles_99, e), __h_101(_$preactCssTransitionGroup_48, {
                transitionName: "uppy-transition-slideDownUp",
                transitionEnterTimeout: 250,
                transitionLeaveTimeout: 250
            }, e.showAddFilesPanel ? __h_101(_$AddFilesPanel_100, ___extends_101({
                key: "AddFilesPanel"
            }, e)) : null), __h_101(_$preactCssTransitionGroup_48, {
                transitionName: "uppy-transition-slideDownUp",
                transitionEnterTimeout: 250,
                transitionLeaveTimeout: 250
            }, e.fileCardFor ? __h_101(_$FileCard_102, ___extends_101({
                key: "FileCard"
            }, e)) : null), __h_101(_$preactCssTransitionGroup_48, {
                transitionName: "uppy-transition-slideDownUp",
                transitionEnterTimeout: 250,
                transitionLeaveTimeout: 250
            }, e.activePanel ? __h_101(_$PanelContent_107, ___extends_101({
                key: "PanelContent"
            }, e)) : null), __h_101("div", {
                class: "uppy-Dashboard-progressindicators"
            }, e.progressindicators.map(function(t) {
                return e.getPlugin(t.id).render(e.state)
            })))))
        },
        ___extends_125 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_125 = _$lib_96.Plugin,
        __h_125 = _$preact_49.h,
        _$lib_125 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.type = "progressindicator", o.id = o.opts.id || "Informer", o.title = "Informer", o.opts = ___extends_125({}, {
                    typeColors: {
                        info: {
                            text: "#fff",
                            bg: "#000"
                        },
                        warning: {
                            text: "#fff",
                            bg: "#F6A623"
                        },
                        error: {
                            text: "#fff",
                            bg: "#D32F2F"
                        },
                        success: {
                            text: "#fff",
                            bg: "#1BB240"
                        }
                    }
                }, n), o.render = o.render.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.render = function(e) {
                var t = e.info,
                    r = t.isHidden,
                    n = t.message,
                    o = t.details;
                return __h_125("div", {
                    class: "uppy uppy-Informer",
                    "aria-hidden": r
                }, __h_125("p", {
                    role: "alert"
                }, n, " ", o && __h_125("span", {
                    "aria-label": o,
                    "data-microtip-position": "top",
                    "data-microtip-size": "large",
                    role: "tooltip"
                }, "?")))
            }, t.prototype.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t
        }(__Plugin_125),
        _$StatusBarStates_139 = {
            STATE_ERROR: "error",
            STATE_WAITING: "waiting",
            STATE_PREPROCESSING: "preprocessing",
            STATE_UPLOADING: "uploading",
            STATE_POSTPROCESSING: "postprocessing",
            STATE_COMPLETE: "complete"
        },
        _$secondsToTime_174 = function(e) {
            return {
                hours: Math.floor(e / 3600) % 24,
                minutes: Math.floor(e / 60) % 60,
                seconds: Math.floor(e % 60)
            }
        },
        _$prettyETA_173 = function(e) {
            var t = _$secondsToTime_174(e),
                r = t.hours ? t.hours + "h " : "",
                n = t.hours ? ("0" + t.minutes).substr(-2) : t.minutes;
            return r + (n ? n + "m " : "") + (n ? ("0" + t.seconds).substr(-2) : t.seconds) + "s"
        },
        ___extends_138 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_138$0 = 0,
        __dummy_138$1 = 0,
        __dummy_138$2 = 0,
        __dummy_138$3 = 0,
        __dummy_138$4 = 0,
        __h_138 = _$preact_49.h,
        _$StatusBar_138 = function(e) {
            var t = e = e || {},
                r = t.newFiles,
                n = t.allowNewUpload,
                o = t.isUploadInProgress,
                i = t.isAllPaused,
                s = t.resumableUploads,
                a = t.error,
                u = t.hideUploadButton,
                l = t.hidePauseResumeButton,
                p = t.hideCancelButton,
                c = t.hideRetryButton,
                d = e.uploadState,
                h = e.totalProgress,
                f = void 0,
                _ = void 0;
            if (d === _$StatusBarStates_139.STATE_PREPROCESSING || d === _$StatusBarStates_139.STATE_POSTPROCESSING) {
                var y = function(e) {
                    var t = [];
                    Object.keys(e).forEach(function(r) {
                        var n = e[r].progress;
                        n.preprocess && t.push(n.preprocess), n.postprocess && t.push(n.postprocess)
                    });
                    var r = t[0];
                    return {
                        mode: r.mode,
                        message: r.message,
                        value: t.filter(function(e) {
                            return "determinate" === e.mode
                        }).reduce(function(e, t, r, n) {
                            return e + t.value / n.length
                        }, 0)
                    }
                }(e.files);
                "determinate" === (f = y.mode) && (h = 100 * y.value), _ = ProgressBarProcessing(y)
            } else d === _$StatusBarStates_139.STATE_COMPLETE ? _ = ProgressBarComplete(e) : d === _$StatusBarStates_139.STATE_UPLOADING ? (e.supportsUploadProgress || (f = "indeterminate", h = null), _ = ProgressBarUploading(e)) : d === _$StatusBarStates_139.STATE_ERROR && (h = void 0, _ = ProgressBarError(e));
            var m = "number" == typeof h ? h : 100,
                g = d === _$StatusBarStates_139.STATE_WAITING && e.hideUploadButton || d === _$StatusBarStates_139.STATE_WAITING && !e.newFiles > 0 || d === _$StatusBarStates_139.STATE_COMPLETE && e.hideAfterFinish,
                b = !a && r && !o && !i && n && !u,
                v = !p && d !== _$StatusBarStates_139.STATE_WAITING && d !== _$StatusBarStates_139.STATE_COMPLETE,
                w = s && !l && d !== _$StatusBarStates_139.STATE_WAITING && d !== _$StatusBarStates_139.STATE_PREPROCESSING && d !== _$StatusBarStates_139.STATE_POSTPROCESSING && d !== _$StatusBarStates_139.STATE_COMPLETE,
                S = a && !c,
                C = "uppy-StatusBar-progress\n                           " + (f ? "is-" + f : ""),
                E = _$classnames_9({
                    "uppy-Root": e.isTargetDOMEl
                }, "uppy-StatusBar", "is-" + d);
            return __h_138("div", {
                class: E,
                "aria-hidden": g
            }, __h_138("div", {
                class: C,
                style: {
                    width: m + "%"
                },
                role: "progressbar",
                "aria-valuemin": "0",
                "aria-valuemax": "100",
                "aria-valuenow": h
            }), _, __h_138("div", {
                class: "uppy-StatusBar-actions"
            }, b ? __h_138(UploadBtn, ___extends_138({}, e, {
                uploadState: d
            })) : null, S ? __h_138(RetryBtn, e) : null, w ? __h_138(PauseResumeButton, e) : null, v ? __h_138(CancelBtn, e) : null))
        },
        ThrottledProgressDetails = _$lodashThrottle_43(function(e) {
            return __h_138("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, e.numUploads > 1 && e.i18n("filesUploadedOfTotal", {
                complete: e.complete,
                smart_count: e.numUploads
            }) + " \xb7 ", e.i18n("dataUploadedOfTotal", {
                complete: _$prettierBytes_50(e.totalUploadedSize),
                total: _$prettierBytes_50(e.totalSize)
            }) + " \xb7 ", e.i18n("xTimeLeft", {
                time: _$prettyETA_173(e.totalETA)
            }))
        }, 500, {
            leading: !0,
            trailing: !0
        }),
        ProgressBarUploading = function(e) {
            if (!e.isUploadStarted || e.isAllComplete) return null;
            var t = e.isAllPaused ? e.i18n("paused") : e.i18n("uploading"),
                r = e.newFiles && e.isUploadStarted;
            return __h_138("div", {
                class: "uppy-StatusBar-content",
                "aria-label": t,
                title: t
            }, e.isAllPaused ? null : __h_138(LoadingSpinner, e), __h_138("div", {
                class: "uppy-StatusBar-status"
            }, __h_138("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, e.supportsUploadProgress ? t + ": " + e.totalProgress + "%" : t), e.isAllPaused || r || !e.showProgressDetails ? null : e.supportsUploadProgress ? __h_138(ThrottledProgressDetails, e) : __h_138(UnknownProgressDetails, e), r ? __h_138(UploadNewlyAddedFiles, e) : null))
        },
        ProgressBarComplete = function(e) {
            e.totalProgress;
            var t = e.i18n;
            return __h_138("div", {
                class: "uppy-StatusBar-content",
                role: "status",
                title: t("complete")
            }, __h_138("svg", {
                "aria-hidden": "true",
                class: "uppy-StatusBar-statusIndicator UppyIcon",
                width: "18",
                height: "17",
                viewBox: "0 0 23 17"
            }, __h_138("path", {
                d: "M8.944 17L0 7.865l2.555-2.61 6.39 6.525L20.41 0 23 2.645z"
            })), t("complete"))
        },
        ProgressBarError = function(e) {
            var t = e.error,
                r = (e.retryAll, e.hideRetryButton, e.i18n);
            return __h_138("div", {
                class: "uppy-StatusBar-content",
                role: "alert"
            }, __h_138("span", {
                class: "uppy-StatusBar-contentPadding"
            }, r("uploadFailed"), "."), __h_138("span", {
                class: "uppy-StatusBar-details",
                "aria-label": t,
                "data-microtip-position": "top",
                "data-microtip-size": "large",
                role: "tooltip"
            }, "?"))
        },
        _$getBytesRemaining_160 = function(e) {
            return e.bytesTotal - e.bytesUploaded
        },
        _$getSpeed_165 = function(e) {
            if (!e.bytesUploaded) return 0;
            var t = new Date - e.uploadStarted;
            return e.bytesUploaded / (t / 1e3)
        },
        ___extends_140 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_140 = _$lib_96.Plugin,
        __dummy_140$0 = 0,
        __dummy_140$1 = 0,
        __dummy_140$2 = 0,
        __dummy_140$3 = 0,
        __dummy_140$4 = 0,
        _$lib_140 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.id = o.opts.id || "StatusBar", o.title = "StatusBar", o.type = "progressindicator";
                var i = {
                        strings: {
                            uploading: "Uploading",
                            upload: "Upload",
                            complete: "Complete",
                            uploadFailed: "Upload failed",
                            pleasePressRetry: "Please press Retry to upload again",
                            paused: "Paused",
                            error: "Error",
                            retry: "Retry",
                            cancel: "Cancel",
                            pause: "Pause",
                            resume: "Resume",
                            pressToRetry: "Press to retry",
                            filesUploadedOfTotal: {
                                0: "%{complete} of %{smart_count} file uploaded",
                                1: "%{complete} of %{smart_count} files uploaded"
                            },
                            dataUploadedOfTotal: "%{complete} of %{total}",
                            xTimeLeft: "%{time} left",
                            uploadXFiles: {
                                0: "Upload %{smart_count} file",
                                1: "Upload %{smart_count} files"
                            },
                            uploadXNewFiles: {
                                0: "Upload +%{smart_count} file",
                                1: "Upload +%{smart_count} files"
                            },
                            xMoreFilesAdded: {
                                0: "%{smart_count} more file added",
                                1: "%{smart_count} more files added"
                            }
                        }
                    },
                    s = {
                        target: "body",
                        hideUploadButton: !1,
                        hideRetryButton: !1,
                        hidePauseResumeButton: !1,
                        hideCancelButton: !1,
                        showProgressDetails: !1,
                        locale: i,
                        hideAfterFinish: !0
                    };
                return o.opts = ___extends_140({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.startUpload = o.startUpload.bind(o), o.render = o.render.bind(o), o.install = o.install.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.getTotalSpeed = function(e) {
                var t = 0;
                return e.forEach(function(e) {
                    t += _$getSpeed_165(e.progress)
                }), t
            }, t.prototype.getTotalETA = function(e) {
                var t = this.getTotalSpeed(e);
                if (0 === t) return 0;
                var r = e.reduce(function(e, t) {
                    return e + _$getBytesRemaining_160(t.progress)
                }, 0);
                return Math.round(r / t * 10) / 10
            }, t.prototype.startUpload = function() {
                var e = this;
                return this.uppy.upload().catch(function(t) {
                    e.uppy.log(t.stack || t.message || t)
                })
            }, t.prototype.getUploadingState = function(e, t, r) {
                if (e) return _$StatusBarStates_139.STATE_ERROR;
                if (t) return _$StatusBarStates_139.STATE_COMPLETE;
                for (var n = _$StatusBarStates_139.STATE_WAITING, o = Object.keys(r), i = 0; i < o.length; i++) {
                    var s = r[o[i]].progress;
                    if (s.uploadStarted && !s.uploadComplete) return _$StatusBarStates_139.STATE_UPLOADING;
                    s.preprocess && n !== _$StatusBarStates_139.STATE_UPLOADING && (n = _$StatusBarStates_139.STATE_PREPROCESSING), s.postprocess && n !== _$StatusBarStates_139.STATE_UPLOADING && n !== _$StatusBarStates_139.STATE_PREPROCESSING && (n = _$StatusBarStates_139.STATE_POSTPROCESSING)
                }
                return n
            }, t.prototype.render = function(e) {
                var t = e.capabilities,
                    r = e.files,
                    n = e.allowNewUpload,
                    o = e.totalProgress,
                    i = e.error,
                    s = Object.keys(r).filter(function(e) {
                        return !r[e].progress.uploadStarted && !r[e].progress.preprocess && !r[e].progress.postprocess
                    }),
                    a = Object.keys(r).filter(function(e) {
                        return r[e].progress.uploadStarted
                    }),
                    u = a.filter(function(e) {
                        return r[e].isPaused
                    }),
                    l = Object.keys(r).filter(function(e) {
                        return r[e].progress.uploadComplete
                    }),
                    p = Object.keys(r).filter(function(e) {
                        return r[e].error
                    }),
                    c = Object.keys(r).filter(function(e) {
                        return !r[e].progress.uploadComplete && r[e].progress.uploadStarted
                    }),
                    d = c.filter(function(e) {
                        return !r[e].isPaused
                    }),
                    h = Object.keys(r).filter(function(e) {
                        return r[e].progress.uploadStarted || r[e].progress.preprocess || r[e].progress.postprocess
                    }),
                    f = Object.keys(r).filter(function(e) {
                        return r[e].progress.preprocess || r[e].progress.postprocess
                    }),
                    _ = d.map(function(e) {
                        return r[e]
                    }),
                    y = this.getTotalETA(_),
                    m = 0,
                    g = 0;
                _.forEach(function(e) {
                    m += e.progress.bytesTotal || 0, g += e.progress.bytesUploaded || 0
                });
                var b = a.length > 0,
                    v = 100 === o && l.length === Object.keys(r).length && 0 === f.length,
                    w = b && p.length === a.length,
                    S = 0 !== c.length && u.length === c.length,
                    C = c.length > 0,
                    E = t.resumableUploads || !1,
                    $ = !1 !== t.uploadProgress;
                return _$StatusBar_138({
                    error: i,
                    uploadState: this.getUploadingState(w, v, e.files || {}),
                    allowNewUpload: n,
                    totalProgress: o,
                    totalSize: m,
                    totalUploadedSize: g,
                    isAllComplete: v,
                    isAllPaused: S,
                    isAllErrored: w,
                    isUploadStarted: b,
                    isUploadInProgress: C,
                    complete: l.length,
                    newFiles: s.length,
                    numUploads: h.length,
                    totalETA: y,
                    files: r,
                    i18n: this.i18n,
                    pauseAll: this.uppy.pauseAll,
                    resumeAll: this.uppy.resumeAll,
                    retryAll: this.uppy.retryAll,
                    cancelAll: this.uppy.cancelAll,
                    startUpload: this.startUpload,
                    resumableUploads: E,
                    supportsUploadProgress: $,
                    showProgressDetails: this.opts.showProgressDetails,
                    hideUploadButton: this.opts.hideUploadButton,
                    hideRetryButton: this.opts.hideRetryButton,
                    hidePauseResumeButton: this.opts.hidePauseResumeButton,
                    hideCancelButton: this.opts.hideCancelButton,
                    hideAfterFinish: this.opts.hideAfterFinish,
                    isTargetDOMEl: this.isTargetDOMEl
                })
            }, t.prototype.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.unmount()
            }, t
        }(__Plugin_140),
        _$dataURItoBlob_155 = function(e, t, r) {
            var n = e.split(",")[1],
                o = t.mimeType || e.split(",")[0].split(":")[1].split(";")[0];
            null == o && (o = "plain/text");
            for (var i = atob(n), s = [], a = 0; a < i.length; a++) s.push(i.charCodeAt(a));
            return r ? new File([new Uint8Array(s)], t.name || "", {
                type: o
            }) : new Blob([new Uint8Array(s)], {
                type: o
            })
        },
        _$isObjectURL_168 = function(e) {
            return 0 === e.indexOf("blob:")
        },
        _$isPreviewSupported_169 = function(e) {
            if (!e) return !1;
            var t = e.split("/")[1];
            return !!/^(jpe?g|gif|png|svg|svg\+xml|bmp)$/.test(t)
        },
        ___extends_143 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_143 = _$lib_96.Plugin,
        __dummy_143$0 = 0,
        __dummy_143$1 = 0,
        __dummy_143$2 = 0,
        _$lib_143 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.type = "thumbnail", o.id = o.opts.id || "ThumbnailGenerator", o.title = "Thumbnail Generator", o.queue = [], o.queueProcessing = !1, o.defaultThumbnailDimension = 200, o.opts = ___extends_143({}, {
                    thumbnailWidth: null,
                    thumbnailHeight: null
                }, n), o.onFileAdded = o.onFileAdded.bind(o), o.onFileRemoved = o.onFileRemoved.bind(o), o.onRestored = o.onRestored.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.createThumbnail = function(e, t, r) {
                var n = this,
                    o = URL.createObjectURL(e.data);
                return new Promise(function(e, t) {
                    var r = new Image;
                    r.src = o, r.addEventListener("load", function() {
                        URL.revokeObjectURL(o), e(r)
                    }), r.addEventListener("error", function(e) {
                        URL.revokeObjectURL(o), t(e.error || new Error("Could not create thumbnail"))
                    })
                }).then(function(e) {
                    var o = n.getProportionalDimensions(e, t, r),
                        i = n.resizeImage(e, o.width, o.height);
                    return n.canvasToBlob(i, "image/png")
                }).then(function(e) {
                    return URL.createObjectURL(e)
                })
            }, t.prototype.getProportionalDimensions = function(e, t, r) {
                var n = e.width / e.height;
                return null != t ? {
                    width: t,
                    height: Math.round(t / n)
                } : null != r ? {
                    width: Math.round(r * n),
                    height: r
                } : {
                    width: this.defaultThumbnailDimension,
                    height: Math.round(this.defaultThumbnailDimension / n)
                }
            }, t.prototype.protect = function(e) {
                var t = e.width / e.height,
                    r = Math.floor(Math.sqrt(5e6 * t)),
                    n = Math.floor(5e6 / Math.sqrt(5e6 * t));
                if (r > 4096 && (r = 4096, n = Math.round(r / t)), n > 4096 && (n = 4096, r = Math.round(t * n)), e.width > r) {
                    var o = document.createElement("canvas");
                    o.width = r, o.height = n, o.getContext("2d").drawImage(e, 0, 0, r, n), e = o
                }
                return e
            }, t.prototype.resizeImage = function(e, t, r) {
                e = this.protect(e);
                var n = Math.ceil(Math.log(e.width / t) * Math.LOG2E);
                n < 1 && (n = 1);
                for (var o = t * Math.pow(2, n - 1), i = r * Math.pow(2, n - 1); n--;) {
                    var s = document.createElement("canvas");
                    s.width = o, s.height = i, s.getContext("2d").drawImage(e, 0, 0, o, i), e = s, o = Math.round(o / 2), i = Math.round(i / 2)
                }
                return e
            }, t.prototype.canvasToBlob = function(e, t, r) {
                return e.toBlob ? new Promise(function(n) {
                    e.toBlob(n, t, r)
                }) : Promise.resolve().then(function() {
                    return _$dataURItoBlob_155(e.toDataURL(t, r), {})
                })
            }, t.prototype.setPreviewURL = function(e, t) {
                this.uppy.setFileState(e, {
                    preview: t
                })
            }, t.prototype.addToQueue = function(e) {
                this.queue.push(e), !1 === this.queueProcessing && this.processQueue()
            }, t.prototype.processQueue = function() {
                var e = this;
                if (this.queueProcessing = !0, this.queue.length > 0) {
                    var t = this.queue.shift();
                    return this.requestThumbnail(t).catch(function(e) {}).then(function() {
                        return e.processQueue()
                    })
                }
                this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated")
            }, t.prototype.requestThumbnail = function(e) {
                var t = this;
                return _$isPreviewSupported_169(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then(function(r) {
                    t.setPreviewURL(e.id, r), t.uppy.log("[ThumbnailGenerator] Generated thumbnail for " + e.id), t.uppy.emit("thumbnail:generated", t.uppy.getFile(e.id), r)
                }).catch(function(r) {
                    t.uppy.log("[ThumbnailGenerator] Failed thumbnail for " + e.id), t.uppy.log(r, "warning"), t.uppy.emit("thumbnail:error", t.uppy.getFile(e.id), r)
                }) : Promise.resolve()
            }, t.prototype.onFileAdded = function(e) {
                e.preview || this.addToQueue(e)
            }, t.prototype.onFileRemoved = function(e) {
                var t = this.queue.indexOf(e); - 1 !== t && this.queue.splice(t, 1), e.preview && _$isObjectURL_168(e.preview) && URL.revokeObjectURL(e.preview)
            }, t.prototype.onRestored = function() {
                var e = this,
                    t = this.uppy.getState().files;
                Object.keys(t).forEach(function(t) {
                    var r = e.uppy.getFile(t);
                    r.isRestored && (r.preview && !_$isObjectURL_168(r.preview) || e.addToQueue(r))
                })
            }, t.prototype.install = function() {
                this.uppy.on("file-added", this.onFileAdded), this.uppy.on("file-removed", this.onFileRemoved), this.uppy.on("restored", this.onRestored)
            }, t.prototype.uninstall = function() {
                this.uppy.off("file-added", this.onFileAdded), this.uppy.off("file-removed", this.onFileRemoved), this.uppy.off("restored", this.onRestored)
            }, t
        }(__Plugin_143),
        ___typeof_157 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        __dummy_157$0 = 0,
        _$findAllDOMElements_157 = function(e) {
            if ("string" == typeof e) {
                var t = [].slice.call(document.querySelectorAll(e));
                return t.length > 0 ? t : null
            }
            if ("object" === (void 0 === e ? "undefined" : ___typeof_157(e)) && _$isDOMElement_167(e)) return [e]
        },
        _$toArray_176 = function(e) {
            return Array.prototype.slice.call(e || [], 0)
        },
        ___extends_110 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_110 = _$lib_96.Plugin,
        __dummy_110$0 = 0,
        __dummy_110$1 = 0,
        __dummy_110$2 = 0,
        __dummy_110$3 = 0,
        __dummy_110$4 = 0,
        __dummy_110$5 = 0,
        __dummy_110$6 = 0,
        __dummy_110$7 = 0,
        __dummy_110$8 = 0,
        ResizeObserver = _$ResizeObserver_54.default || _$ResizeObserver_54,
        defaultTabIcon = _$icons_109.defaultTabIcon,
        FOCUSABLE_ELEMENTS = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

    function createPromise() {
        var e = {};
        return e.promise = new Promise(function(t, r) {
            e.resolve = t, e.reject = r
        }), e
    }
    var _$lib_110 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.id = o.opts.id || "Dashboard", o.title = "Dashboard", o.type = "orchestrator", o.modalName = "uppy-Dashboard-" + _$cuid_13();
                var i = {
                    target: "body",
                    metaFields: [],
                    trigger: "#uppy-select-files",
                    inline: !1,
                    width: 750,
                    height: 275,
                    thumbnailWidth: 280,
                    defaultTabIcon: defaultTabIcon,
                    showLinkToFileUploadResult: !0,
                    showProgressDetails: !1,
                    hideUploadButton: !1,
                    hideRetryButton: !1,
                    hidePauseResumeCancelButtons: !1,
                    hideProgressAfterFinish: !1,
                    note: null,
                    closeModalOnClickOutside: !1,
                    closeAfterFinish: !1,
                    disableStatusBar: !1,
                    disableInformer: !1,
                    disableThumbnailGenerator: !1,
                    disablePageScrollWhenModalOpen: !0,
                    animateOpenClose: !0,
                    proudlyDisplayPoweredByUppy: !0,
                    onRequestCloseModal: function() {
                        return o.closeModal()
                    },
                    showSelectedFiles: !0,
                    browserBackButtonClose: !1
                };
                return o.opts = ___extends_110({}, i, n), o.translator = new _$Translator_153([{
                    strings: {
                        selectToUpload: "Select files to upload",
                        closeModal: "Close Modal",
                        upload: "Upload",
                        importFrom: "Import from %{name}",
                        addingMoreFiles: "Adding more files",
                        addMoreFiles: "Add more files",
                        dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
                        dashboardTitle: "Uppy Dashboard",
                        copyLinkToClipboardSuccess: "Link copied to clipboard",
                        copyLinkToClipboardFallback: "Copy the URL below",
                        copyLink: "Copy link",
                        fileSource: "File source: %{name}",
                        done: "Done",
                        back: "Back",
                        name: "Name",
                        removeFile: "Remove file",
                        editFile: "Edit file",
                        editing: "Editing %{file}",
                        edit: "Edit",
                        finishEditingFile: "Finish editing file",
                        saveChanges: "Save changes",
                        cancel: "Cancel",
                        localDisk: "Local Disk",
                        myDevice: "My Device",
                        dropPasteImport: "Drop files here, paste, %{browse} or import from",
                        dropPaste: "Drop files here, paste or %{browse}",
                        browse: "browse",
                        fileProgress: "File progress: upload speed and ETA",
                        numberOfSelectedFiles: "Number of selected files",
                        uploadAllNewFiles: "Upload all new files",
                        emptyFolderAdded: "No files were added from empty folder",
                        uploadComplete: "Upload complete",
                        uploadPaused: "Upload paused",
                        resumeUpload: "Resume upload",
                        pauseUpload: "Pause upload",
                        retryUpload: "Retry upload",
                        cancelUpload: "Cancel upload",
                        xFilesSelected: {
                            0: "%{smart_count} file selected",
                            1: "%{smart_count} files selected"
                        },
                        uploadXFiles: {
                            0: "Upload %{smart_count} file",
                            1: "Upload %{smart_count} files"
                        },
                        uploadingXFiles: {
                            0: "Uploading %{smart_count} file",
                            1: "Uploading %{smart_count} files"
                        },
                        processingXFiles: {
                            0: "Processing %{smart_count} file",
                            1: "Processing %{smart_count} files"
                        },
                        uploadXNewFiles: {
                            0: "Upload +%{smart_count} file",
                            1: "Upload +%{smart_count} files"
                        },
                        folderAdded: {
                            0: "Added %{smart_count} file from %{folder}",
                            1: "Added %{smart_count} files from %{folder}"
                        }
                    }
                }, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.openModal = o.openModal.bind(o), o.closeModal = o.closeModal.bind(o), o.requestCloseModal = o.requestCloseModal.bind(o), o.isModalOpen = o.isModalOpen.bind(o), o.addTarget = o.addTarget.bind(o), o.removeTarget = o.removeTarget.bind(o), o.hideAllPanels = o.hideAllPanels.bind(o), o.showPanel = o.showPanel.bind(o), o.getFocusableNodes = o.getFocusableNodes.bind(o), o.setFocusToFirstNode = o.setFocusToFirstNode.bind(o), o.handlePopState = o.handlePopState.bind(o), o.maintainFocus = o.maintainFocus.bind(o), o.initEvents = o.initEvents.bind(o), o.handleKeyDown = o.handleKeyDown.bind(o), o.handleFileAdded = o.handleFileAdded.bind(o), o.handleComplete = o.handleComplete.bind(o), o.handleClickOutside = o.handleClickOutside.bind(o), o.toggleFileCard = o.toggleFileCard.bind(o), o.toggleAddFilesPanel = o.toggleAddFilesPanel.bind(o), o.handleDrop = o.handleDrop.bind(o), o.handlePaste = o.handlePaste.bind(o), o.handleInputChange = o.handleInputChange.bind(o), o.render = o.render.bind(o), o.install = o.install.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.removeTarget = function(e) {
                var t = this.getPluginState().targets.filter(function(t) {
                    return t.id !== e.id
                });
                this.setPluginState({
                    targets: t
                })
            }, t.prototype.addTarget = function(e) {
                var t = e.id || e.constructor.name,
                    r = e.title || t,
                    n = e.type;
                if ("acquirer" === n || "progressindicator" === n || "presenter" === n) {
                    var o = {
                            id: t,
                            name: r,
                            type: n
                        },
                        i = this.getPluginState().targets.slice();
                    return i.push(o), this.setPluginState({
                        targets: i
                    }), this.el
                }
                this.uppy.log("Dashboard: Modal can only be used by plugins of types: acquirer, progressindicator, presenter")
            }, t.prototype.hideAllPanels = function() {
                this.setPluginState({
                    activePanel: !1,
                    showAddFilesPanel: !1
                })
            }, t.prototype.showPanel = function(e) {
                var t = this.getPluginState().targets.filter(function(t) {
                    return "acquirer" === t.type && t.id === e
                })[0];
                this.setPluginState({
                    activePanel: t
                })
            }, t.prototype.requestCloseModal = function() {
                if (this.opts.onRequestCloseModal) return this.opts.onRequestCloseModal();
                this.closeModal()
            }, t.prototype.getFocusableNodes = function() {
                var e = this.el.querySelectorAll(FOCUSABLE_ELEMENTS);
                return Object.keys(e).map(function(t) {
                    return e[t]
                })
            }, t.prototype.setFocusToFirstNode = function() {
                var e = this.getFocusableNodes();
                e.length && e[0].focus()
            }, t.prototype.updateBrowserHistory = function() {
                var e;
                history.state && history.state[this.modalName] || history.pushState(___extends_110({}, history.state, ((e = {})[this.modalName] = !0, e)), ""), window.addEventListener("popstate", this.handlePopState, !1)
            }, t.prototype.handlePopState = function(e) {
                !this.isModalOpen() || e.state && e.state[this.modalName] || this.closeModal({
                    manualClose: !1
                }), !this.isModalOpen() && e.state && e.state[this.modalName] && history.go(-1)
            }, t.prototype.setFocusToBrowse = function() {
                var e = this.el.querySelector(".uppy-Dashboard-browse");
                e && e.focus()
            }, t.prototype.maintainFocus = function(e) {
                var t = this.getFocusableNodes(),
                    r = t.indexOf(document.activeElement);
                e.shiftKey && 0 === r && (t[t.length - 1].focus(), e.preventDefault()), e.shiftKey || r !== t.length - 1 || (t[0].focus(), e.preventDefault())
            }, t.prototype.openModal = function() {
                var e = this,
                    t = createPromise(),
                    r = t.promise,
                    n = t.resolve;
                return this.savedScrollPosition = window.scrollY, this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing ? this.el.addEventListener("animationend", function t() {
                    e.setPluginState({
                        isHidden: !1
                    }), e.el.removeEventListener("animationend", t, !1), n()
                }, !1) : (this.setPluginState({
                    isHidden: !1
                }), n()), this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDown), this.setFocusToBrowse(), r
            }, t.prototype.closeModal = function() {
                var e = this,
                    t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).manualClose,
                    r = void 0 === t || t,
                    n = this.getPluginState(),
                    o = n.isHidden,
                    i = n.isClosing;
                if (!o && !i) {
                    var s = createPromise(),
                        a = s.promise,
                        u = s.resolve;
                    return this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose ? (this.setPluginState({
                        isClosing: !0
                    }), this.el.addEventListener("animationend", function t() {
                        e.setPluginState({
                            isHidden: !0,
                            isClosing: !1
                        }), e.el.removeEventListener("animationend", t, !1), u()
                    }, !1)) : (this.setPluginState({
                        isHidden: !0
                    }), u()), document.removeEventListener("keydown", this.handleKeyDown), this.savedActiveElement.focus(), r && this.opts.browserBackButtonClose && history.state && history.state[this.modalName] && history.go(-1), a
                }
            }, t.prototype.isModalOpen = function() {
                return !this.getPluginState().isHidden || !1
            }, t.prototype.handleKeyDown = function(e) {
                27 === e.keyCode && this.requestCloseModal(e), 9 === e.keyCode && this.maintainFocus(e)
            }, t.prototype.handleClickOutside = function() {
                this.opts.closeModalOnClickOutside && this.requestCloseModal()
            }, t.prototype.handlePaste = function(e) {
                var t = this;
                _$toArray_176(e.clipboardData.items).forEach(function(e) {
                    if ("file" === e.kind) {
                        var r = e.getAsFile();
                        if (!r) return t.uppy.log("[Dashboard] File pasted, but the file blob is empty"), void t.uppy.info("Error pasting file", "error");
                        t.uppy.log("[Dashboard] File pasted");
                        try {
                            t.uppy.addFile({
                                source: t.id,
                                name: e.name,
                                type: e.type,
                                data: r
                            })
                        } catch (e) {}
                    }
                })
            }, t.prototype.handleInputChange = function(e) {
                var t = this;
                e.preventDefault(), _$toArray_176(e.target.files).forEach(function(e) {
                    try {
                        t.uppy.addFile({
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        })
                    } catch (e) {}
                })
            }, t.prototype.initEvents = function() {
                var e = this,
                    t = _$findAllDOMElements_157(this.opts.trigger);
                !this.opts.inline && t && t.forEach(function(t) {
                    return t.addEventListener("click", e.openModal)
                }), this.opts.inline || t || this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options unless you are planning to call openModal() method yourself", "error"), this.removeDragDropListener = _$dragDrop_17(this.el, function(t) {
                    e.handleDrop(t)
                }), this.ro = new ResizeObserver(function(t, r) {
                    var n = t,
                        o = Array.isArray(n),
                        i = 0;
                    for (n = o ? n : n[Symbol.iterator]();;) {
                        var s;
                        if (o) {
                            if (i >= n.length) break;
                            s = n[i++]
                        } else {
                            if ((i = n.next()).done) break;
                            s = i.value
                        }
                        var a = s.contentRect,
                            u = a.width,
                            l = a.height;
                        e.uppy.log("[Dashboard] resized: " + u + " / " + l), e.setPluginState({
                            containerWidth: u,
                            containerHeight: l
                        })
                    }
                }), this.ro.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.handleFileAdded), this.uppy.on("complete", this.handleComplete)
            }, t.prototype.handleFileAdded = function() {
                this.hideAllPanels()
            }, t.prototype.handleComplete = function(e) {
                var t = e.failed;
                e.uploadID, this.opts.closeAfterFinish && 0 === t.length && this.requestCloseModal()
            }, t.prototype.removeEvents = function() {
                var e = this,
                    t = _$findAllDOMElements_157(this.opts.trigger);
                !this.opts.inline && t && t.forEach(function(t) {
                    return t.removeEventListener("click", e.openModal)
                }), this.ro.unobserve(this.el.querySelector(".uppy-Dashboard-inner")), this.removeDragDropListener(), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.handleFileAdded), this.uppy.off("complete", this.handleComplete)
            }, t.prototype.toggleFileCard = function(e) {
                this.setPluginState({
                    fileCardFor: e || !1
                })
            }, t.prototype.toggleAddFilesPanel = function(e) {
                this.setPluginState({
                    showAddFilesPanel: e
                })
            }, t.prototype.handleDrop = function(e) {
                var t = this;
                this.uppy.log("[Dashboard] Files were dropped"), e.forEach(function(e) {
                    try {
                        t.uppy.addFile({
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        })
                    } catch (e) {}
                })
            }, t.prototype.render = function(e) {
                var t = this,
                    r = this.getPluginState(),
                    n = e.files,
                    o = e.capabilities,
                    i = e.allowNewUpload,
                    s = Object.keys(n).filter(function(e) {
                        return !n[e].progress.uploadStarted
                    }),
                    a = Object.keys(n).filter(function(e) {
                        return n[e].progress.uploadStarted
                    }),
                    u = Object.keys(n).filter(function(e) {
                        return n[e].isPaused
                    }),
                    l = Object.keys(n).filter(function(e) {
                        return n[e].progress.uploadComplete
                    }),
                    p = Object.keys(n).filter(function(e) {
                        return n[e].error
                    }),
                    c = Object.keys(n).filter(function(e) {
                        return !n[e].progress.uploadComplete && n[e].progress.uploadStarted
                    }),
                    d = c.filter(function(e) {
                        return !n[e].isPaused
                    }),
                    h = Object.keys(n).filter(function(e) {
                        return n[e].progress.preprocess || n[e].progress.postprocess
                    }),
                    f = a.length > 0,
                    _ = 100 === e.totalProgress && l.length === Object.keys(n).length && 0 === h.length,
                    y = f && p.length === a.length,
                    m = 0 !== c.length && u.length === c.length,
                    g = function(e) {
                        var r = t.uppy.getPlugin(e.id);
                        return ___extends_110({}, e, {
                            icon: r.icon || t.opts.defaultTabIcon,
                            render: r.render
                        })
                    },
                    b = r.targets.filter(function(e) {
                        return "acquirer" === e.type && function(e) {
                            var r = t.uppy.getPlugin(e.id);
                            return "function" != typeof r.isSupported || r.isSupported()
                        }(e)
                    }).map(g),
                    v = r.targets.filter(function(e) {
                        return "progressindicator" === e.type
                    }).map(g);
                return _$Dashboard_101({
                    state: e,
                    modal: r,
                    files: n,
                    newFiles: s,
                    uploadStartedFiles: a,
                    completeFiles: l,
                    erroredFiles: p,
                    inProgressFiles: c,
                    inProgressNotPausedFiles: d,
                    processingFiles: h,
                    isUploadStarted: f,
                    isAllComplete: _,
                    isAllErrored: y,
                    isAllPaused: m,
                    totalFileCount: Object.keys(n).length,
                    totalProgress: e.totalProgress,
                    allowNewUpload: i,
                    acquirers: b,
                    activePanel: r.activePanel,
                    animateOpenClose: this.opts.animateOpenClose,
                    isClosing: r.isClosing,
                    getPlugin: this.uppy.getPlugin,
                    progressindicators: v,
                    autoProceed: this.uppy.opts.autoProceed,
                    id: this.id,
                    closeModal: this.requestCloseModal,
                    handleClickOutside: this.handleClickOutside,
                    handleInputChange: this.handleInputChange,
                    handlePaste: this.handlePaste,
                    inline: this.opts.inline,
                    showPanel: this.showPanel,
                    hideAllPanels: this.hideAllPanels,
                    log: this.uppy.log,
                    i18n: this.i18n,
                    i18nArray: this.i18nArray,
                    addFile: this.uppy.addFile,
                    removeFile: this.uppy.removeFile,
                    info: this.uppy.info,
                    note: this.opts.note,
                    metaFields: r.metaFields,
                    resumableUploads: o.resumableUploads || !1,
                    bundled: o.bundled || !1,
                    startUpload: function(e) {
                        t.uppy.upload().catch(function(e) {
                            t.uppy.log(e.stack || e.message || e)
                        })
                    },
                    pauseUpload: this.uppy.pauseResume,
                    retryUpload: this.uppy.retryUpload,
                    cancelUpload: function(e) {
                        t.uppy.removeFile(e)
                    },
                    cancelAll: this.uppy.cancelAll,
                    fileCardFor: r.fileCardFor,
                    toggleFileCard: this.toggleFileCard,
                    toggleAddFilesPanel: this.toggleAddFilesPanel,
                    showAddFilesPanel: r.showAddFilesPanel,
                    saveFileCard: function(e, r) {
                        t.uppy.setFileMeta(r, e), t.toggleFileCard()
                    },
                    width: this.opts.width,
                    height: this.opts.height,
                    showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
                    proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
                    currentWidth: r.containerWidth,
                    isWide: r.containerWidth > 400,
                    containerWidth: r.containerWidth,
                    isTargetDOMEl: this.isTargetDOMEl,
                    allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
                    maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
                    showSelectedFiles: this.opts.showSelectedFiles
                })
            }, t.prototype.discoverProviderPlugins = function() {
                var e = this;
                this.uppy.iteratePlugins(function(t) {
                    t && !t.target && t.opts && t.opts.target === e.constructor && e.addTarget(t)
                })
            }, t.prototype.install = function() {
                var e = this;
                this.setPluginState({
                    isHidden: !0,
                    showFileCard: !1,
                    showAddFilesPanel: !1,
                    activePanel: !1,
                    metaFields: this.opts.metaFields,
                    targets: []
                });
                var t = this.opts,
                    r = t.inline,
                    n = t.closeAfterFinish;
                if (r && n) throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
                this.uppy.opts.allowMultipleUploads && n && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploads` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
                var o = this.opts.target;
                o && this.mount(o, this), (this.opts.plugins || []).forEach(function(t) {
                    var r = e.uppy.getPlugin(t);
                    r && r.mount(e, r)
                }), this.opts.disableStatusBar || this.uppy.use(_$lib_140, {
                    id: this.id + ":StatusBar",
                    target: this,
                    hideUploadButton: this.opts.hideUploadButton,
                    hideRetryButton: this.opts.hideRetryButton,
                    hidePauseResumeButton: this.opts.hidePauseResumeButton,
                    hideCancelButton: this.opts.hideCancelButton,
                    showProgressDetails: this.opts.showProgressDetails,
                    hideAfterFinish: this.opts.hideProgressAfterFinish,
                    locale: this.opts.locale
                }), this.opts.disableInformer || this.uppy.use(_$lib_125, {
                    id: this.id + ":Informer",
                    target: this
                }), this.opts.disableThumbnailGenerator || this.uppy.use(_$lib_143, {
                    id: this.id + ":ThumbnailGenerator",
                    thumbnailWidth: this.opts.thumbnailWidth
                }), this.discoverProviderPlugins(), this.initEvents()
            }, t.prototype.uninstall = function() {
                var e = this;
                if (!this.opts.disableInformer) {
                    var t = this.uppy.getPlugin(this.id + ":Informer");
                    t && this.uppy.removePlugin(t)
                }
                if (!this.opts.disableStatusBar) {
                    var r = this.uppy.getPlugin(this.id + ":StatusBar");
                    r && this.uppy.removePlugin(r)
                }
                if (!this.opts.disableThumbnailGenerator) {
                    var n = this.uppy.getPlugin(this.id + ":ThumbnailGenerator");
                    n && this.uppy.removePlugin(n)
                }(this.opts.plugins || []).forEach(function(t) {
                    var r = e.uppy.getPlugin(t);
                    r && r.unmount()
                }), this.unmount(), this.removeEvents()
            }, t
        }(__Plugin_110),
        ___extends_115 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_115 = _$lib_96.Plugin,
        __dummy_115$0 = 0,
        __dummy_115$1 = 0,
        __dummy_115$2 = 0,
        __h_115 = _$preact_49.h,
        _$lib_115 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.type = "acquirer", o.id = o.opts.id || "DragDrop", o.title = "Drag & Drop";
                var i = {
                        strings: {
                            dropHereOr: "Drop files here or %{browse}",
                            browse: "browse"
                        }
                    },
                    s = {
                        target: null,
                        inputName: "files[]",
                        width: "100%",
                        height: "100%",
                        note: null,
                        locale: i
                    };
                return o.opts = ___extends_115({}, s, n), o.isDragDropSupported = o.checkDragDropSupport(), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.handleDrop = o.handleDrop.bind(o), o.handleInputChange = o.handleInputChange.bind(o), o.checkDragDropSupport = o.checkDragDropSupport.bind(o), o.render = o.render.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.checkDragDropSupport = function() {
                var e = document.createElement("div");
                return "draggable" in e && "ondragstart" in e && "ondrop" in e && "FormData" in window && "FileReader" in window
            }, t.prototype.handleDrop = function(e) {
                var t = this;
                this.uppy.log("[DragDrop] Files dropped"), e.forEach(function(e) {
                    try {
                        t.uppy.addFile({
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        })
                    } catch (e) {}
                })
            }, t.prototype.handleInputChange = function(e) {
                var t = this;
                this.uppy.log("[DragDrop] Files selected through input"), _$toArray_176(e.target.files).forEach(function(e) {
                    try {
                        t.uppy.addFile({
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        })
                    } catch (e) {}
                })
            }, t.prototype.render = function(e) {
                var t = this,
                    r = "uppy-Root uppy-DragDrop-container " + (this.isDragDropSupported ? "uppy-DragDrop--is-dragdrop-supported" : ""),
                    n = {
                        width: this.opts.width,
                        height: this.opts.height
                    },
                    o = this.uppy.opts.restrictions;
                return __h_115("div", {
                    class: r,
                    style: n
                }, __h_115("div", {
                    class: "uppy-DragDrop-inner"
                }, __h_115("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon uppy-DragDrop-arrow",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    xmlns: "http://www.w3.org/2000/svg"
                }, __h_115("path", {
                    d: "M11 10V0H5v10H2l6 6 6-6h-3zm0 0",
                    "fill-rule": "evenodd"
                })), __h_115("label", {
                    class: "uppy-DragDrop-label"
                }, __h_115("input", {
                    style: {
                        width: "0.1px",
                        height: "0.1px",
                        opacity: 0,
                        overflow: "hidden",
                        position: "absolute",
                        zIndex: -1
                    },
                    class: "uppy-DragDrop-input",
                    type: "file",
                    name: this.opts.inputName,
                    multiple: 1 !== o.maxNumberOfFiles,
                    accept: o.allowedFileTypes,
                    ref: function(e) {
                        t.input = e
                    },
                    onchange: this.handleInputChange,
                    value: ""
                }), this.i18nArray("dropHereOr", {
                    browse: __h_115("span", {
                        class: "uppy-DragDrop-dragText"
                    }, this.i18n("browse"))
                })), __h_115("span", {
                    class: "uppy-DragDrop-note"
                }, this.opts.note)))
            }, t.prototype.install = function() {
                var e = this,
                    t = this.opts.target;
                t && this.mount(t, this), this.removeDragDropListener = _$dragDrop_17(this.el, function(t) {
                    e.handleDrop(t), e.uppy.log(t)
                })
            }, t.prototype.uninstall = function() {
                this.unmount(), this.removeDragDropListener()
            }, t
        }(__Plugin_115),
        __h_135 = _$preact_49.h,
        _$Loader_135 = function(e) {
            return __h_135("div", {
                class: "uppy-Provider-loading"
            }, __h_135("span", null, "Loading..."))
        };

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function _possibleConstructorReturn(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function _inherits(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }
    var __dummy_128$0 = 0,
        __dummy_128$1 = 0,
        __h_128 = _$preact_49.h,
        __Component_128 = _$preact_49.Component,
        AuthBlock = function(e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments))
            }
            return _inherits(t, e), t.prototype.componentDidMount = function() {
                var e = this;
                setTimeout(function() {
                    e.connectButton && e.connectButton.focus({
                        preventScroll: !0
                    })
                }, 150)
            }, t.prototype.render = function() {
                var e = this;
                return __h_128("div", {
                    class: "uppy-Provider-auth"
                }, __h_128("div", {
                    class: "uppy-Provider-authIcon"
                }, this.props.pluginIcon()), __h_128("h1", {
                    class: "uppy-Provider-authTitle"
                }, "Please authenticate with ", __h_128("span", {
                    class: "uppy-Provider-authTitleName"
                }, this.props.pluginName), __h_128("br", null), " to select files"), __h_128("button", {
                    type: "button",
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
                    onclick: this.props.handleAuth,
                    ref: function(t) {
                        e.connectButton = t
                    }
                }, "Connect to ", this.props.pluginName), this.props.demo && __h_128("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
                    onclick: this.props.handleDemoAuth
                }, "Proceed with Demo Account"))
            }, t
        }(__Component_128),
        AuthView = function(e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments))
            }
            return _inherits(t, e), t.prototype.componentDidMount = function() {
                this.props.checkAuth()
            }, t.prototype.render = function() {
                return this.props.checkAuthInProgress ? __h_128(_$Loader_135, null) : __h_128(AuthBlock, this.props)
            }, t
        }(__Component_128),
        _$AuthView_128 = AuthView,
        __h_129 = _$preact_49.h,
        _$Breadcrumbs_129 = function(e) {
            return __h_129("div", {
                class: "uppy-Provider-breadcrumbs"
            }, __h_129("div", {
                class: "uppy-Provider-breadcrumbsIcon"
            }, e.breadcrumbsIcon), e.directories.map(function(t, r) {
                return function(e) {
                    return __h_129("span", null, __h_129("button", {
                        type: "button",
                        class: "uppy-u-reset",
                        onclick: e.getFolder
                    }, e.title), e.isLast ? "" : " / ")
                }({
                    getFolder: function() {
                        return e.getFolder(t.id)
                    },
                    title: 0 === r ? e.title : t.title,
                    isLast: r + 1 === e.directories.length
                })
            }))
        },
        __dummy_131$0 = 0,
        __h_131 = _$preact_49.h,
        __Component_131 = _$preact_49.Component,
        _$Filter_131 = function(e) {
            function t(r) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r));
                return n.handleKeyPress = n.handleKeyPress.bind(n), n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleKeyPress = function(e) {
                if (13 === e.keyCode) return e.stopPropagation(), void e.preventDefault();
                this.props.filterQuery(e)
            }, t.prototype.render = function() {
                var e = this;
                return __h_131("div", {
                    class: "uppy-ProviderBrowser-search"
                }, __h_131("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon uppy-ProviderBrowser-searchIcon",
                    viewBox: "0 0 100 100"
                }, __h_131("path", {
                    d: "M87.533 80.03L62.942 55.439c3.324-4.587 5.312-10.207 5.312-16.295 0-.312-.043-.611-.092-.908.05-.301.093-.605.093-.922 0-15.36-12.497-27.857-27.857-27.857-.273 0-.536.043-.799.08-.265-.037-.526-.08-.799-.08-15.361 0-27.858 12.497-27.858 27.857 0 .312.042.611.092.909a5.466 5.466 0 0 0-.093.921c0 15.36 12.496 27.858 27.857 27.858.273 0 .535-.043.8-.081.263.038.524.081.798.081 5.208 0 10.071-1.464 14.245-3.963L79.582 87.98a5.603 5.603 0 0 0 3.976 1.647 5.621 5.621 0 0 0 3.975-9.597zM39.598 55.838c-.265-.038-.526-.081-.8-.081-9.16 0-16.612-7.452-16.612-16.612 0-.312-.042-.611-.092-.908.051-.301.093-.605.093-.922 0-9.16 7.453-16.612 16.613-16.612.272 0 .534-.042.799-.079.263.037.525.079.799.079 9.16 0 16.612 7.452 16.612 16.612 0 .312.043.611.092.909-.05.301-.094.604-.094.921 0 9.16-7.452 16.612-16.612 16.612-.274 0-.536.043-.798.081z"
                })), __h_131("input", {
                    class: "uppy-u-reset uppy-ProviderBrowser-searchInput",
                    type: "text",
                    placeholder: this.props.i18n("filter"),
                    "aria-label": this.props.i18n("filter"),
                    onkeyup: this.handleKeyPress,
                    onkeydown: this.handleKeyPress,
                    onkeypress: this.handleKeyPress,
                    value: this.props.filterInput,
                    ref: function(t) {
                        e.input = t
                    }
                }), this.props.filterInput && __h_131("button", {
                    class: "uppy-u-reset uppy-ProviderBrowser-searchClose",
                    type: "button",
                    "aria-label": this.props.i18n("resetFilter"),
                    title: this.props.i18n("resetFilter"),
                    onclick: this.props.filterQuery
                }, __h_131("svg", {
                    "aria-hidden": "true",
                    class: "UppyIcon",
                    viewBox: "0 0 19 19"
                }, __h_131("path", {
                    d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
                }))))
            }, t
        }(__Component_131),
        __h_132 = _$preact_49.h,
        _$FooterActions_132 = function(e) {
            return __h_132("div", {
                class: "uppy-ProviderBrowser-footer"
            }, __h_132("button", {
                class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
                onclick: e.done
            }, e.i18n("selectXFiles", {
                smart_count: e.selected
            })), __h_132("button", {
                class: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
                onclick: e.cancel
            }, e.i18n("cancel")))
        },
        __h_133 = _$preact_49.h,
        _$Item_133 = function(e) {
            var t = function(e) {
                    13 === e.keyCode && (e.stopPropagation(), e.preventDefault())
                },
                r = e.getItemIcon();
            return __h_133("li", {
                class: "uppy-ProviderBrowserItem" + (e.isChecked ? " uppy-ProviderBrowserItem--selected" : "") + ("video" === r ? " uppy-ProviderBrowserItem--noPreview" : "")
            }, __h_133("div", {
                class: "uppy-ProviderBrowserItem-checkbox"
            }, __h_133("input", {
                type: "checkbox",
                role: "option",
                tabindex: 0,
                "aria-label": "Select " + e.title,
                id: e.id,
                checked: e.isChecked,
                disabled: e.isDisabled,
                onchange: e.handleClick,
                onkeyup: t,
                onkeydown: t,
                onkeypress: t
            }), __h_133("label", {
                for: e.id,
                onclick: e.handleClick
            })), __h_133("button", {
                type: "button",
                class: "uppy-ProviderBrowserItem-inner",
                "aria-label": "Select " + e.title,
                tabindex: 0,
                onclick: function(t) {
                    if (t.preventDefault(), "folder" === e.type) return e.handleFolderClick(t);
                    e.handleClick(t)
                }
            }, function(e) {
                if (null !== e) switch (e) {
                    case "file":
                        return __h_133("svg", {
                            "aria-hidden": "true",
                            class: "UppyIcon",
                            width: 11,
                            height: 14.5,
                            viewBox: "0 0 44 58"
                        }, __h_133("path", {
                            d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
                        }));
                    case "folder":
                        return __h_133("svg", {
                            "aria-hidden": "true",
                            class: "UppyIcon",
                            style: {
                                width: 16,
                                marginRight: 3
                            },
                            viewBox: "0 0 276.157 276.157"
                        }, __h_133("path", {
                            d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
                        }));
                    case "video":
                        return __h_133("svg", {
                            "aria-hidden": "true",
                            viewBox: "0 0 58 58"
                        }, __h_133("path", {
                            d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
                        }), __h_133("path", {
                            d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
                        }));
                    default:
                        return __h_133("img", {
                            src: e
                        })
                }
            }(e.getItemIcon()), e.showTitles && e.title))
        },
        __dummy_134$0 = 0,
        __h_134 = _$preact_49.h,
        _$ItemList_134 = function(e) {
            return e.folders.length || e.files.length ? __h_134("div", {
                class: "uppy-ProviderBrowser-body"
            }, __h_134("ul", {
                class: "uppy-ProviderBrowser-list",
                onscroll: e.handleScroll,
                role: "listbox",
                "aria-label": "List of files from " + e.title
            }, e.folders.map(function(t) {
                var r = !1,
                    n = e.isChecked(t);
                return n && (r = n.loading), _$Item_133({
                    title: t.name,
                    id: t.id,
                    type: "folder",
                    getItemIcon: function() {
                        return t.icon
                    },
                    isDisabled: r,
                    isChecked: n,
                    handleFolderClick: function() {
                        return e.handleFolderClick(t)
                    },
                    handleClick: function(r) {
                        return e.toggleCheckbox(r, t)
                    },
                    columns: e.columns,
                    showTitles: e.showTitles
                })
            }), e.files.map(function(t) {
                return _$Item_133({
                    title: t.name,
                    id: t.id,
                    type: "file",
                    getItemIcon: function() {
                        return t.icon
                    },
                    isDisabled: !1,
                    isChecked: e.isChecked(t),
                    handleClick: function(r) {
                        return e.toggleCheckbox(r, t)
                    },
                    columns: e.columns,
                    showTitles: e.showTitles
                })
            }))) : __h_134("div", {
                class: "uppy-Provider-empty"
            }, e.i18n("noFilesFound"))
        },
        ___extends_130 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_130$0 = 0,
        __dummy_130$1 = 0,
        __dummy_130$2 = 0,
        __dummy_130$3 = 0,
        __dummy_130$4 = 0,
        __h_130 = _$preact_49.h,
        _$Browser_130 = function(e) {
            var t = e.folders,
                r = e.files;
            "" !== e.filterInput && (t = e.filterItems(e.folders), r = e.filterItems(e.files));
            var n = e.currentSelection.length;
            return __h_130("div", {
                class: _$classnames_9("uppy-ProviderBrowser", "uppy-ProviderBrowser-viewType--" + e.viewType)
            }, __h_130("div", {
                class: "uppy-ProviderBrowser-header"
            }, __h_130("div", {
                class: _$classnames_9("uppy-ProviderBrowser-headerBar", !e.showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
            }, e.showBreadcrumbs && _$Breadcrumbs_129({
                getFolder: e.getFolder,
                directories: e.directories,
                breadcrumbsIcon: e.pluginIcon && e.pluginIcon(),
                title: e.title
            }), __h_130("span", {
                class: "uppy-ProviderBrowser-user"
            }, e.username), __h_130("button", {
                type: "button",
                onclick: e.logout,
                class: "uppy-ProviderBrowser-userLogout"
            }, e.i18n("logOut")))), e.showFilter && __h_130(_$Filter_131, e), __h_130(_$ItemList_134, {
                columns: [{
                    name: "Name",
                    key: "title"
                }],
                folders: t,
                files: r,
                activeRow: e.isActiveRow,
                sortByTitle: e.sortByTitle,
                sortByDate: e.sortByDate,
                isChecked: e.isChecked,
                handleFolderClick: e.getNextFolder,
                toggleCheckbox: e.toggleCheckbox,
                handleScroll: e.handleScroll,
                title: e.title,
                showTitles: e.showTitles,
                i18n: e.i18n
            }), n > 0 && __h_130(_$FooterActions_132, ___extends_130({
                selected: n
            }, e)))
        },
        ___extends_136 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        };

    function ___classCallCheck_136(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var __dummy_136$0 = 0,
        __h_136 = _$preact_49.h,
        __Component_136 = _$preact_49.Component,
        __dummy_136$1 = 0,
        __dummy_136$2 = 0,
        __dummy_136$3 = 0,
        __dummy_136$4 = 0,
        __dummy_136$5 = 0,
        __dummy_136$6 = 0,
        CloseWrapper = function(e) {
            function t() {
                return ___classCallCheck_136(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentWillUnmount = function() {
                this.props.onUnmount()
            }, t.prototype.render = function() {
                return this.props.children[0]
            }, t
        }(__Component_136),
        _$lib_136 = function() {
            function e(t, r) {
                ___classCallCheck_136(this, e), this.plugin = t, this.provider = r.provider, this.opts = ___extends_136({}, {
                    viewType: "list",
                    showTitles: !0,
                    showFilter: !0,
                    showBreadcrumbs: !0
                }, r), this.addFile = this.addFile.bind(this), this.filterItems = this.filterItems.bind(this), this.filterQuery = this.filterQuery.bind(this), this.toggleSearch = this.toggleSearch.bind(this), this.getFolder = this.getFolder.bind(this), this.getNextFolder = this.getNextFolder.bind(this), this.logout = this.logout.bind(this), this.checkAuth = this.checkAuth.bind(this), this.handleAuth = this.handleAuth.bind(this), this.handleDemoAuth = this.handleDemoAuth.bind(this), this.sortByTitle = this.sortByTitle.bind(this), this.sortByDate = this.sortByDate.bind(this), this.isActiveRow = this.isActiveRow.bind(this), this.isChecked = this.isChecked.bind(this), this.toggleCheckbox = this.toggleCheckbox.bind(this), this.handleError = this.handleError.bind(this), this.handleScroll = this.handleScroll.bind(this), this.donePicking = this.donePicking.bind(this), this.cancelPicking = this.cancelPicking.bind(this), this.clearSelection = this.clearSelection.bind(this), this.render = this.render.bind(this), this.clearSelection()
            }
            return e.prototype.tearDown = function() {}, e.prototype._updateFilesAndFolders = function(e, t, r) {
                this.nextPagePath = e.nextPagePath, e.items.forEach(function(e) {
                    e.isFolder ? r.push(e) : t.push(e)
                }), this.plugin.setPluginState({
                    folders: r,
                    files: t
                })
            }, e.prototype.checkAuth = function() {
                var e = this;
                this.plugin.setPluginState({
                    checkAuthInProgress: !0
                }), this.provider.checkAuth().then(function(t) {
                    e.plugin.setPluginState({
                        checkAuthInProgress: !1
                    }), e.plugin.onAuth(t)
                }).catch(function(t) {
                    e.plugin.setPluginState({
                        checkAuthInProgress: !1
                    }), e.handleError(t)
                })
            }, e.prototype.getFolder = function(e, t) {
                var r = this;
                return this._loaderWrapper(this.provider.list(e), function(n) {
                    var o, i = r.plugin.getPluginState(),
                        s = function(t, r) {
                            for (var n = 0; n < t.length; n++)
                                if (o = t[n], e === o.id) return n;
                            var o;
                            return -1
                        }(i.directories);
                    o = -1 !== s ? i.directories.slice(0, s + 1) : i.directories.concat([{
                        id: e,
                        title: t
                    }]), r.username = r.username ? r.username : n.username, r._updateFilesAndFolders(n, [], []), r.plugin.setPluginState({
                        directories: o
                    })
                }, this.handleError)
            }, e.prototype.getNextFolder = function(e) {
                this.getFolder(e.requestPath, e.name), this.lastCheckbox = void 0
            }, e.prototype.addFile = function(e) {
                var t = {
                        id: this.providerFileToId(e),
                        source: this.plugin.id,
                        data: e,
                        name: e.name || e.id,
                        type: e.mimeType,
                        isRemote: !0,
                        body: {
                            fileId: e.id
                        },
                        remote: {
                            serverUrl: this.plugin.opts.serverUrl,
                            url: "" + this.provider.fileUrl(e.requestPath),
                            body: {
                                fileId: e.id
                            },
                            providerOptions: this.provider.opts
                        }
                    },
                    r = _$getFileType_162(t);
                r && _$isPreviewSupported_169(r) && (t.preview = e.thumbnail), this.plugin.uppy.log("Adding remote file");
                try {
                    this.plugin.uppy.addFile(t)
                } catch (e) {}
            }, e.prototype.removeFile = function(e) {
                var t = this.plugin.getPluginState().currentSelection;
                this.plugin.setPluginState({
                    currentSelection: t.filter(function(t) {
                        return t.id !== e
                    })
                })
            }, e.prototype.logout = function() {
                var e = this;
                this.provider.logout(location.href).then(function(t) {
                    t.ok && e.plugin.setPluginState({
                        authenticated: !1,
                        files: [],
                        folders: [],
                        directories: []
                    })
                }).catch(this.handleError)
            }, e.prototype.filterQuery = function(e) {
                var t = this.plugin.getPluginState();
                this.plugin.setPluginState(___extends_136({}, t, {
                    filterInput: e ? e.target.value : ""
                }))
            }, e.prototype.toggleSearch = function(e) {
                var t = this.plugin.getPluginState();
                this.plugin.setPluginState({
                    isSearchVisible: !t.isSearchVisible,
                    filterInput: ""
                })
            }, e.prototype.filterItems = function(e) {
                var t = this.plugin.getPluginState();
                return "" === t.filterInput ? e : e.filter(function(e) {
                    return -1 !== e.name.toLowerCase().indexOf(t.filterInput.toLowerCase())
                })
            }, e.prototype.sortByTitle = function() {
                var e = ___extends_136({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.folders,
                    n = e.sorting,
                    o = t.sort(function(e, t) {
                        return "titleDescending" === n ? t.name.localeCompare(e.name) : e.name.localeCompare(t.name)
                    }),
                    i = r.sort(function(e, t) {
                        return "titleDescending" === n ? t.name.localeCompare(e.name) : e.name.localeCompare(t.name)
                    });
                this.plugin.setPluginState(___extends_136({}, e, {
                    files: o,
                    folders: i,
                    sorting: "titleDescending" === n ? "titleAscending" : "titleDescending"
                }))
            }, e.prototype.sortByDate = function() {
                var e = ___extends_136({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.folders,
                    n = e.sorting,
                    o = t.sort(function(e, t) {
                        var r = new Date(e.modifiedDate),
                            o = new Date(t.modifiedDate);
                        return "dateDescending" === n ? r > o ? -1 : r < o ? 1 : 0 : r > o ? 1 : r < o ? -1 : 0
                    }),
                    i = r.sort(function(e, t) {
                        var r = new Date(e.modifiedDate),
                            o = new Date(t.modifiedDate);
                        return "dateDescending" === n ? r > o ? -1 : r < o ? 1 : 0 : r > o ? 1 : r < o ? -1 : 0
                    });
                this.plugin.setPluginState(___extends_136({}, e, {
                    files: o,
                    folders: i,
                    sorting: "dateDescending" === n ? "dateAscending" : "dateDescending"
                }))
            }, e.prototype.sortBySize = function() {
                var e = ___extends_136({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.sorting;
                if (t.length && this.plugin.getItemData(t[0]).size) {
                    var n = t.sort(function(e, t) {
                        var n = e.size,
                            o = t.size;
                        return "sizeDescending" === r ? n > o ? -1 : n < o ? 1 : 0 : n > o ? 1 : n < o ? -1 : 0
                    });
                    this.plugin.setPluginState(___extends_136({}, e, {
                        files: n,
                        sorting: "sizeDescending" === r ? "sizeAscending" : "sizeDescending"
                    }))
                }
            }, e.prototype.isActiveRow = function(e) {
                return this.plugin.getPluginState().activeRow === this.plugin.getItemId(e)
            }, e.prototype.isChecked = function(e) {
                return this.plugin.getPluginState().currentSelection.some(function(t) {
                    return t === e
                })
            }, e.prototype.addFolder = function(e) {
                var t = this,
                    r = this.providerFileToId(e),
                    n = this.plugin.getPluginState(),
                    o = n.selectedFolders || {};
                if (!(r in o && o[r].loading)) return o[r] = {
                    loading: !0,
                    files: []
                }, this.plugin.setPluginState({
                    selectedFolders: o
                }), this.provider.list(e.requestPath).then(function(i) {
                    var s = [];
                    i.items.forEach(function(e) {
                        e.isFolder || (t.addFile(e), s.push(t.providerFileToId(e)))
                    }), (n = t.plugin.getPluginState()).selectedFolders[r] = {
                        loading: !1,
                        files: s
                    }, t.plugin.setPluginState({
                        selectedFolders: o
                    });
                    var a, u = t.plugin.uppy.getPlugin("Dashboard");
                    a = s.length ? u.i18n("folderAdded", {
                        smart_count: s.length,
                        folder: e.name
                    }) : u.i18n("emptyFolderAdded"), t.plugin.uppy.info(a)
                }).catch(function(e) {
                    delete(n = t.plugin.getPluginState()).selectedFolders[r], t.plugin.setPluginState({
                        selectedFolders: n.selectedFolders
                    }), t.handleError(e)
                })
            }, e.prototype.toggleCheckbox = function(e, t) {
                e.stopPropagation(), e.preventDefault();
                var r = this.plugin.getPluginState(),
                    n = r.folders,
                    o = r.files,
                    i = this.filterItems(n.concat(o));
                if (this.lastCheckbox && e.shiftKey) {
                    var s, a = i.indexOf(this.lastCheckbox),
                        u = i.indexOf(t);
                    return s = a < u ? i.slice(a, u + 1) : i.slice(u, a + 1), void this.plugin.setPluginState({
                        currentSelection: s
                    })
                }
                this.lastCheckbox = t;
                var l = this.plugin.getPluginState().currentSelection;
                this.isChecked(t) ? this.plugin.setPluginState({
                    currentSelection: l.filter(function(e) {
                        return e !== t
                    })
                }) : this.plugin.setPluginState({
                    currentSelection: l.concat([t])
                })
            }, e.prototype.providerFileToId = function(e) {
                return _$generateFileID_159({
                    data: e,
                    name: e.name || e.id,
                    type: e.mimeType
                })
            }, e.prototype.handleDemoAuth = function() {
                var e = this.plugin.getPluginState();
                this.plugin.setPluginState({}, e, {
                    authenticated: !0
                })
            }, e.prototype.handleAuth = function() {
                var e = this,
                    t = btoa(JSON.stringify({
                        origin: location.origin
                    })),
                    r = this.provider.authUrl() + "?state=" + t,
                    n = window.open(r, "_blank");
                window.addEventListener("message", function t(r) {
                    e._isOriginAllowed(r.origin, e.plugin.opts.serverPattern) && r.source === n ? (n.close(), window.removeEventListener("message", t), e.provider.setAuthToken(r.data.token), e._loaderWrapper(e.provider.checkAuth(), e.plugin.onAuth, e.handleError)) : e.plugin.uppy.log("rejecting event from " + r.origin + " vs allowed pattern " + e.plugin.opts.serverPattern)
                })
            }, e.prototype._isOriginAllowed = function(e, t) {
                var r = function(e) {
                    return "string" == typeof e ? new RegExp("^" + e + "$") : e instanceof RegExp ? e : void 0
                };
                return (Array.isArray(t) ? t.map(r) : [r(t)]).filter(function(e) {
                    return null !== e
                }).some(function(t) {
                    return t.test(e)
                })
            }, e.prototype.handleError = function(e) {
                var t = this.plugin.uppy,
                    r = t.i18n("companionError");
                t.log(e.toString()), t.info({
                    message: r,
                    details: e.toString()
                }, "error", 5e3)
            }, e.prototype.handleScroll = function(e) {
                var t = this,
                    r = e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight),
                    n = this.nextPagePath || null;
                r < 50 && n && !this._isHandlingScroll && (this.provider.list(n).then(function(e) {
                    var r = t.plugin.getPluginState(),
                        n = r.files,
                        o = r.folders;
                    t._updateFilesAndFolders(e, n, o)
                }).catch(this.handleError).then(function() {
                    t._isHandlingScroll = !1
                }), this._isHandlingScroll = !0)
            }, e.prototype.donePicking = function() {
                var e = this,
                    t = this.plugin.getPluginState().currentSelection.map(function(t) {
                        return t.isFolder ? e.addFolder(t) : e.addFile(t)
                    });
                this._loaderWrapper(Promise.all(t), function() {
                    e.clearSelection()
                }, function() {})
            }, e.prototype.cancelPicking = function() {
                this.clearSelection();
                var e = this.plugin.uppy.getPlugin("Dashboard");
                e && e.hideAllPanels()
            }, e.prototype.clearSelection = function() {
                this.plugin.setPluginState({
                    currentSelection: []
                })
            }, e.prototype._loaderWrapper = function(e, t, r) {
                var n = this;
                e.then(function(e) {
                    n.plugin.setPluginState({
                        loading: !1
                    }), t(e)
                }).catch(function(e) {
                    n.plugin.setPluginState({
                        loading: !1
                    }), r(e)
                }), this.plugin.setPluginState({
                    loading: !0
                })
            }, e.prototype.render = function(e) {
                var t = this.plugin.getPluginState(),
                    r = t.authenticated,
                    n = t.checkAuthInProgress;
                if (t.loading) return __h_136(CloseWrapper, {
                    onUnmount: this.clearSelection
                }, __h_136(_$Loader_135, null));
                if (!r) return __h_136(CloseWrapper, {
                    onUnmount: this.clearSelection
                }, __h_136(_$AuthView_128, {
                    pluginName: this.plugin.title,
                    pluginIcon: this.plugin.icon,
                    demo: this.plugin.opts.demo,
                    checkAuth: this.checkAuth,
                    handleAuth: this.handleAuth,
                    handleDemoAuth: this.handleDemoAuth,
                    checkAuthInProgress: n
                }));
                var o = ___extends_136({}, this.plugin.getPluginState(), {
                    username: this.username,
                    getNextFolder: this.getNextFolder,
                    getFolder: this.getFolder,
                    filterItems: this.filterItems,
                    filterQuery: this.filterQuery,
                    toggleSearch: this.toggleSearch,
                    sortByTitle: this.sortByTitle,
                    sortByDate: this.sortByDate,
                    logout: this.logout,
                    demo: this.plugin.opts.demo,
                    isActiveRow: this.isActiveRow,
                    isChecked: this.isChecked,
                    toggleCheckbox: this.toggleCheckbox,
                    handleScroll: this.handleScroll,
                    done: this.donePicking,
                    cancel: this.cancelPicking,
                    title: this.plugin.title,
                    viewType: this.opts.viewType,
                    showTitles: this.opts.showTitles,
                    showFilter: this.opts.showFilter,
                    showBreadcrumbs: this.opts.showBreadcrumbs,
                    pluginIcon: this.plugin.icon,
                    i18n: this.plugin.uppy.i18n
                });
                return __h_136(CloseWrapper, {
                    onUnmount: this.clearSelection
                }, __h_136(_$Browser_130, o))
            }, e
        }(),
        __Plugin_116 = _$lib_96.Plugin,
        __Provider_116 = _$lib_94.Provider,
        __dummy_116$0 = 0,
        __h_116 = _$preact_49.h,
        _$lib_116 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.id = o.opts.id || "Dropbox", __Provider_116.initPlugin(o, n), o.title = o.opts.title || "Dropbox", o.icon = function() {
                    return __h_116("svg", {
                        "aria-hidden": "true",
                        fill: "#0060ff",
                        width: "128",
                        height: "118",
                        viewBox: "0 0 128 118"
                    }, __h_116("path", {
                        d: "M38.145.777L1.108 24.96l25.608 20.507 37.344-23.06z"
                    }), __h_116("path", {
                        d: "M1.108 65.975l37.037 24.183L64.06 68.525l-37.343-23.06zM64.06 68.525l25.917 21.633 37.036-24.183-25.61-20.51z"
                    }), __h_116("path", {
                        d: "M127.014 24.96L89.977.776 64.06 22.407l37.345 23.06zM64.136 73.18l-25.99 21.567-11.122-7.262v8.142l37.112 22.256 37.114-22.256v-8.142l-11.12 7.262z"
                    }))
                }, o.provider = new __Provider_116(r, {
                    serverUrl: o.opts.serverUrl,
                    serverHeaders: o.opts.serverHeaders,
                    provider: "dropbox"
                }), o.onAuth = o.onAuth.bind(o), o.render = o.render.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.install = function() {
                this.view = new _$lib_136(this, {
                    provider: this.provider
                }), this.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.view.tearDown(), this.unmount()
            }, t.prototype.onAuth = function(e) {
                this.setPluginState({
                    authenticated: e
                }), e && this.view.getFolder()
            }, t.prototype.render = function(e) {
                return this.view.render(e)
            }, t
        }(__Plugin_116),
        ___extends_117 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_117 = _$lib_96.Plugin,
        __dummy_117$0 = 0,
        __dummy_117$1 = 0,
        __h_117 = _$preact_49.h,
        _$lib_117 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.id = o.opts.id || "FileInput", o.title = "File Input", o.type = "acquirer";
                var i = {
                        strings: {
                            chooseFiles: "Choose files"
                        }
                    },
                    s = {
                        target: null,
                        pretty: !0,
                        inputName: "files[]",
                        locale: i
                    };
                return o.opts = ___extends_117({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.render = o.render.bind(o), o.handleInputChange = o.handleInputChange.bind(o), o.handleClick = o.handleClick.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleInputChange = function(e) {
                var t = this;
                this.uppy.log("[FileInput] Something selected through input..."), _$toArray_176(e.target.files).forEach(function(e) {
                    try {
                        t.uppy.addFile({
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        })
                    } catch (e) {}
                })
            }, t.prototype.handleClick = function(e) {
                this.input.click()
            }, t.prototype.render = function(e) {
                var t = this,
                    r = this.uppy.opts.restrictions,
                    n = r.allowedFileTypes ? r.allowedFileTypes.join(",") : null;
                return __h_117("div", {
                    class: "uppy-Root uppy-FileInput-container"
                }, __h_117("input", {
                    class: "uppy-FileInput-input",
                    style: this.opts.pretty && {
                        width: "0.1px",
                        height: "0.1px",
                        opacity: 0,
                        overflow: "hidden",
                        position: "absolute",
                        zIndex: -1
                    },
                    type: "file",
                    name: this.opts.inputName,
                    onchange: this.handleInputChange,
                    multiple: 1 !== r.maxNumberOfFiles,
                    accept: n,
                    ref: function(e) {
                        t.input = e
                    },
                    value: ""
                }), this.opts.pretty && __h_117("button", {
                    class: "uppy-FileInput-btn",
                    type: "button",
                    onclick: this.handleClick
                }, this.i18n("chooseFiles")))
            }, t.prototype.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.unmount()
            }, t
        }(__Plugin_117),
        _$lib_37 = {
            __esModule: !0
        };
    _$lib_37.default = getFormData, _$lib_37.getFieldData = getFieldData;
    var NODE_LIST_CLASSES = {
            "[object HTMLCollection]": !0,
            "[object NodeList]": !0,
            "[object RadioNodeList]": !0
        },
        IGNORED_ELEMENT_TYPES = {
            button: !0,
            fieldset: !0,
            reset: !0,
            submit: !0
        },
        CHECKED_INPUT_TYPES = {
            checkbox: !0,
            radio: !0
        },
        TRIM_RE = /^\s+|\s+$/g,
        slice = Array.prototype.slice,
        toString = Object.prototype.toString;

    function getFormData(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            trim: !1
        };
        if (!e) throw new Error("A form is required by getFormData, was given form=" + e);
        for (var r = {}, n = void 0, o = [], i = {}, s = 0, a = e.elements.length; s < a; s++) {
            var u = e.elements[s];
            IGNORED_ELEMENT_TYPES[u.type] || u.disabled || (n = u.name || u.id) && !i[n] && (o.push(n), i[n] = !0)
        }
        for (var l = 0, p = o.length; l < p; l++) {
            var c = getFieldData(e, n = o[l], t);
            null != c && (r[n] = c)
        }
        return r
    }

    function getFieldData(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
            trim: !1
        };
        if (!e) throw new Error("A form is required by getFieldData, was given form=" + e);
        if (!t && "[object String]" !== toString.call(t)) throw new Error("A field name is required by getFieldData, was given fieldName=" + t);
        var n = e.elements[t];
        if (!n || n.disabled) return null;
        if (!NODE_LIST_CLASSES[toString.call(n)]) return getFormElementValue(n, r.trim);
        for (var o = [], i = !0, s = 0, a = n.length; s < a; s++)
            if (!n[s].disabled) {
                i && "radio" !== n[s].type && (i = !1);
                var u = getFormElementValue(n[s], r.trim);
                null != u && (o = o.concat(u))
            }
        return i && 1 === o.length ? o[0] : o.length > 0 ? o : null
    }

    function getFormElementValue(e, t) {
        var r = null,
            n = e.type;
        if ("select-one" === n) return e.options.length && (r = e.options[e.selectedIndex].value), r;
        if ("select-multiple" === n) {
            r = [];
            for (var o = 0, i = e.options.length; o < i; o++) e.options[o].selected && r.push(e.options[o].value);
            return 0 === r.length && (r = null), r
        }
        return "file" === n && "files" in e ? (e.multiple ? 0 === (r = slice.call(e.files)).length && (r = null) : r = e.files[0], r) : (CHECKED_INPUT_TYPES[n] ? e.checked && (r = e.value) : r = t ? e.value.replace(TRIM_RE, "") : e.value, r)
    }
    getFormData.getFieldData = getFieldData;
    var ___extends_118 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_118 = _$lib_96.Plugin,
        __dummy_118$0 = 0,
        __dummy_118$1 = 0,
        __getFormData_118 = _$lib_37.default || _$lib_37,
        _$lib_118 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.type = "acquirer", o.id = "Form", o.title = "Form", o.opts = ___extends_118({}, {
                    target: null,
                    resultName: "uppyResult",
                    getMetaFromForm: !0,
                    addResultToForm: !0,
                    submitOnSuccess: !1,
                    triggerUploadOnSubmit: !1
                }, n), o.handleFormSubmit = o.handleFormSubmit.bind(o), o.handleUploadStart = o.handleUploadStart.bind(o), o.handleSuccess = o.handleSuccess.bind(o), o.addResultToForm = o.addResultToForm.bind(o), o.getMetaFromForm = o.getMetaFromForm.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleUploadStart = function() {
                this.opts.getMetaFromForm && this.getMetaFromForm()
            }, t.prototype.handleSuccess = function(e) {
                this.opts.addResultToForm && this.addResultToForm(e), this.opts.submitOnSuccess && this.form.submit()
            }, t.prototype.handleFormSubmit = function(e) {
                var t = this;
                if (this.opts.triggerUploadOnSubmit) {
                    e.preventDefault();
                    var r = _$toArray_176(e.target.elements),
                        n = [];
                    r.forEach(function(e) {
                        ("BUTTON" === e.tagName || "INPUT" === e.tagName && "submit" === e.type) && !e.disabled && (e.disabled = !0, n.push(e))
                    }), this.uppy.upload().then(function() {
                        n.forEach(function(e) {
                            e.disabled = !1
                        })
                    }, function(e) {
                        return n.forEach(function(e) {
                            e.disabled = !1
                        }), Promise.reject(e)
                    }).catch(function(e) {
                        t.uppy.log(e.stack || e.message || e)
                    })
                }
            }, t.prototype.addResultToForm = function(e) {
                this.uppy.log("[Form] Adding result to the original form:"), this.uppy.log(e);
                var t = this.form.querySelector('[name="' + this.opts.resultName + '"]');
                t ? t.value = JSON.stringify(e) : ((t = document.createElement("input")).name = this.opts.resultName, t.type = "hidden", t.value = JSON.stringify(e), this.form.appendChild(t))
            }, t.prototype.getMetaFromForm = function() {
                var e = __getFormData_118(this.form);
                this.uppy.setMeta(e)
            }, t.prototype.install = function() {
                this.form = _$findDOMElement_158(this.opts.target), this.form && "FORM" !== !this.form.nodeName ? (this.form.addEventListener("submit", this.handleFormSubmit), this.uppy.on("upload", this.handleUploadStart), this.uppy.on("complete", this.handleSuccess)) : console.error("Form plugin requires a <form> target element passed in options to operate, none was found", "error")
            }, t.prototype.uninstall = function() {
                this.form.removeEventListener("submit", this.handleFormSubmit), this.uppy.off("upload", this.handleUploadStart), this.uppy.off("complete", this.handleSuccess)
            }, t
        }(__Plugin_118),
        _$IndexedDBStore_119 = {},
        ___extends_119 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_119$0 = 0,
        indexedDB = "undefined" != typeof window && (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB),
        isSupported = !!indexedDB,
        DB_NAME = "uppy-blobs",
        STORE_NAME = "files",
        DEFAULT_EXPIRY = 864e5,
        DB_VERSION = 3;

    function connect(e) {
        var t = indexedDB.open(e, DB_VERSION);
        return new Promise(function(e, r) {
            t.onupgradeneeded = function(t) {
                var r = t.target.result,
                    n = t.currentTarget.transaction;
                if (t.oldVersion < 2 && r.createObjectStore(STORE_NAME, {
                        keyPath: "id"
                    }).createIndex("store", "store", {
                        unique: !1
                    }), t.oldVersion < 3) {
                    var o = n.objectStore(STORE_NAME);
                    o.createIndex("expires", "expires", {
                        unique: !1
                    }), o.openCursor().onsuccess = function(e) {
                        var t = e.target.result;
                        if (t) {
                            var r = t.value;
                            r.expires = Date.now() + DEFAULT_EXPIRY, t.update(r)
                        }
                    }
                }
                n.oncomplete = function() {
                    e(r)
                }
            }, t.onsuccess = function(t) {
                e(t.target.result)
            }, t.onerror = r
        })
    }

    function waitForRequest(e) {
        return new Promise(function(t, r) {
            e.onsuccess = function(e) {
                t(e.target.result)
            }, e.onerror = r
        })
    }
    var cleanedUp = !1,
        IndexedDBStore = function() {
            function e(t) {
                var r = this;
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.opts = ___extends_119({
                    dbName: DB_NAME,
                    storeName: "default",
                    expires: DEFAULT_EXPIRY,
                    maxFileSize: 10485760,
                    maxTotalSize: 314572800
                }, t), this.name = this.opts.storeName;
                var n = function() {
                    return connect(r.opts.dbName)
                };
                cleanedUp ? this.ready = n() : (cleanedUp = !0, this.ready = e.cleanup().then(n, n))
            }
            return e.prototype.key = function(e) {
                return this.name + "!" + e
            }, e.prototype.list = function() {
                var e = this;
                return this.ready.then(function(t) {
                    return waitForRequest(t.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME).index("store").getAll(IDBKeyRange.only(e.name)))
                }).then(function(e) {
                    var t = {};
                    return e.forEach(function(e) {
                        t[e.fileID] = e.data
                    }), t
                })
            }, e.prototype.get = function(e) {
                var t = this;
                return this.ready.then(function(r) {
                    return waitForRequest(r.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME).get(t.key(e)))
                }).then(function(e) {
                    return {
                        id: e.data.fileID,
                        data: e.data.data
                    }
                })
            }, e.prototype.getSize = function() {
                var e = this;
                return this.ready.then(function(t) {
                    var r = t.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME).index("store").openCursor(IDBKeyRange.only(e.name));
                    return new Promise(function(e, t) {
                        var n = 0;
                        r.onsuccess = function(t) {
                            var r = t.target.result;
                            r ? (n += r.value.data.size, r.continue()) : e(n)
                        }, r.onerror = function() {
                            t(new Error("Could not retrieve stored blobs size"))
                        }
                    })
                })
            }, e.prototype.put = function(e) {
                var t = this;
                return e.data.size > this.opts.maxFileSize ? Promise.reject(new Error("File is too big to store.")) : this.getSize().then(function(e) {
                    return e > t.opts.maxTotalSize ? Promise.reject(new Error("No space left")) : t.ready
                }).then(function(r) {
                    return waitForRequest(r.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME).add({
                        id: t.key(e.id),
                        fileID: e.id,
                        store: t.name,
                        expires: Date.now() + t.opts.expires,
                        data: e.data
                    }))
                })
            }, e.prototype.delete = function(e) {
                var t = this;
                return this.ready.then(function(r) {
                    return waitForRequest(r.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME).delete(t.key(e)))
                })
            }, e.cleanup = function() {
                return connect(DB_NAME).then(function(e) {
                    var t = e.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME).index("expires").openCursor(IDBKeyRange.upperBound(Date.now()));
                    return new Promise(function(r, n) {
                        t.onsuccess = function(t) {
                            var n = t.target.result;
                            if (n) {
                                var o = n.value;
                                console.log("[IndexedDBStore] Deleting record", o.fileID, "of size", _$prettierBytes_50(o.data.size), "- expired on", new Date(o.expires)), n.delete(), n.continue()
                            } else r(e)
                        }, t.onerror = n
                    })
                }).then(function(e) {
                    e.close()
                })
            }, e
        }();
    IndexedDBStore.isSupported = isSupported, _$IndexedDBStore_119 = IndexedDBStore;
    var ___extends_120 = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    };

    function maybeParse(e) {
        try {
            return JSON.parse(e)
        } catch (e) {
            return null
        }
    }
    var __cleanedUp_120 = !1,
        _$MetaDataStore_120 = function() {
            function e(t) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.opts = ___extends_120({
                    expires: 864e5
                }, t), this.name = "uppyState:" + t.storeName, __cleanedUp_120 || (__cleanedUp_120 = !0, e.cleanup())
            }
            return e.prototype.load = function() {
                var e = localStorage.getItem(this.name);
                if (!e) return null;
                var t = maybeParse(e);
                return t ? t.metadata ? t.metadata : (this.save(t), t) : null
            }, e.prototype.save = function(e) {
                var t = Date.now() + this.opts.expires,
                    r = JSON.stringify({
                        metadata: e,
                        expires: t
                    });
                localStorage.setItem(this.name, r)
            }, e.cleanup = function() {
                var e = function() {
                        for (var e = [], t = 0; t < localStorage.length; t++) {
                            var r = localStorage.key(t);
                            /^uppyState:/.test(r) && e.push(r.slice("uppyState:".length))
                        }
                        return e
                    }(),
                    t = Date.now();
                e.forEach(function(e) {
                    var r = localStorage.getItem("uppyState:" + e);
                    if (!r) return null;
                    var n = maybeParse(r);
                    if (!n) return null;
                    n.expires && n.expires < t && localStorage.removeItem("uppyState:" + e)
                })
            }, e
        }(),
        _$ServiceWorkerStore_121 = {},
        __isSupported_121 = "undefined" != typeof navigator && "serviceWorker" in navigator,
        ServiceWorkerStore = function() {
            function e(t) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.ready = new Promise(function(e, t) {
                    __isSupported_121 ? navigator.serviceWorker.controller ? e() : navigator.serviceWorker.addEventListener("controllerchange", function() {
                        e()
                    }) : t(new Error("Unsupported"))
                }), this.name = t.storeName
            }
            return e.prototype.list = function() {
                var e = this,
                    t = {},
                    r = new Promise(function(e, r) {
                        t.resolve = e, t.reject = r
                    });
                console.log("Loading stored blobs from Service Worker");
                var n = function r(n) {
                    if (n.data.store === e.name) switch (n.data.type) {
                        case "uppy/ALL_FILES":
                            t.resolve(n.data.files), navigator.serviceWorker.removeEventListener("message", r)
                    }
                };
                return this.ready.then(function() {
                    navigator.serviceWorker.addEventListener("message", n), navigator.serviceWorker.controller.postMessage({
                        type: "uppy/GET_FILES",
                        store: e.name
                    })
                }), r
            }, e.prototype.put = function(e) {
                var t = this;
                return this.ready.then(function() {
                    navigator.serviceWorker.controller.postMessage({
                        type: "uppy/ADD_FILE",
                        store: t.name,
                        file: e
                    })
                })
            }, e.prototype.delete = function(e) {
                var t = this;
                return this.ready.then(function() {
                    navigator.serviceWorker.controller.postMessage({
                        type: "uppy/REMOVE_FILE",
                        store: t.name,
                        fileID: e
                    })
                })
            }, e
        }();
    ServiceWorkerStore.isSupported = __isSupported_121, _$ServiceWorkerStore_121 = ServiceWorkerStore;
    var ___extends_122 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_122 = _$lib_96.Plugin,
        __dummy_122$0 = 0,
        __dummy_122$1 = 0,
        __dummy_122$2 = 0,
        _$lib_122 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.type = "debugger", o.id = "GoldenRetriever", o.title = "Golden Retriever", o.opts = ___extends_122({}, {
                    expires: 864e5,
                    serviceWorker: !1
                }, n), o.MetaDataStore = new _$MetaDataStore_120({
                    expires: o.opts.expires,
                    storeName: r.getID()
                }), o.ServiceWorkerStore = null, o.opts.serviceWorker && (o.ServiceWorkerStore = new _$ServiceWorkerStore_121({
                    storeName: r.getID()
                })), o.IndexedDBStore = new _$IndexedDBStore_119(___extends_122({
                    expires: o.opts.expires
                }, n.indexedDB || {}, {
                    storeName: r.getID()
                })), o.saveFilesStateToLocalStorage = o.saveFilesStateToLocalStorage.bind(o), o.loadFilesStateFromLocalStorage = o.loadFilesStateFromLocalStorage.bind(o), o.loadFileBlobsFromServiceWorker = o.loadFileBlobsFromServiceWorker.bind(o), o.loadFileBlobsFromIndexedDB = o.loadFileBlobsFromIndexedDB.bind(o), o.onBlobsLoaded = o.onBlobsLoaded.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.loadFilesStateFromLocalStorage = function() {
                var e = this.MetaDataStore.load();
                e && (this.uppy.log("[GoldenRetriever] Recovered some state from Local Storage"), this.uppy.setState({
                    currentUploads: e.currentUploads || {},
                    files: e.files || {}
                }), this.savedPluginData = e.pluginData)
            }, t.prototype.getWaitingFiles = function() {
                var e = {};
                return this.uppy.getFiles().forEach(function(t) {
                    t.progress && t.progress.uploadStarted || (e[t.id] = t)
                }), e
            }, t.prototype.getUploadingFiles = function() {
                var e = this,
                    t = {},
                    r = this.uppy.getState().currentUploads;
                return r && Object.keys(r).forEach(function(n) {
                    r[n].fileIDs.forEach(function(r) {
                        t[r] = e.uppy.getFile(r)
                    })
                }), t
            }, t.prototype.saveFilesStateToLocalStorage = function() {
                var e = ___extends_122(this.getWaitingFiles(), this.getUploadingFiles()),
                    t = {};
                this.uppy.emit("restore:get-data", function(e) {
                    ___extends_122(t, e)
                });
                var r = this.uppy.getState().currentUploads;
                this.MetaDataStore.save({
                    currentUploads: r,
                    files: e,
                    pluginData: t
                })
            }, t.prototype.loadFileBlobsFromServiceWorker = function() {
                var e = this;
                this.ServiceWorkerStore.list().then(function(t) {
                    var r = Object.keys(t).length;
                    return r === e.uppy.getFiles().length ? (e.uppy.log("[GoldenRetriever] Successfully recovered " + r + " blobs from Service Worker!"), e.uppy.info("Successfully recovered " + r + " files", "success", 3e3), e.onBlobsLoaded(t)) : (e.uppy.log("[GoldenRetriever] No blobs found in Service Worker, trying IndexedDB now..."), e.loadFileBlobsFromIndexedDB())
                }).catch(function(t) {
                    e.uppy.log("[GoldenRetriever] Failed to recover blobs from Service Worker", "warning"), e.uppy.log(t)
                })
            }, t.prototype.loadFileBlobsFromIndexedDB = function() {
                var e = this;
                this.IndexedDBStore.list().then(function(t) {
                    var r = Object.keys(t).length;
                    if (r > 0) return e.uppy.log("[GoldenRetriever] Successfully recovered " + r + " blobs from IndexedDB!"), e.uppy.info("Successfully recovered " + r + " files", "success", 3e3), e.onBlobsLoaded(t);
                    e.uppy.log("[GoldenRetriever] No blobs found in IndexedDB")
                }).catch(function(t) {
                    e.uppy.log("[GoldenRetriever] Failed to recover blobs from IndexedDB", "warning"), e.uppy.log(t)
                })
            }, t.prototype.onBlobsLoaded = function(e) {
                var t = this,
                    r = [],
                    n = ___extends_122({}, this.uppy.getState().files);
                Object.keys(e).forEach(function(o) {
                    var i = t.uppy.getFile(o);
                    if (i) {
                        var s = e[o],
                            a = ___extends_122({}, i, {
                                data: s,
                                isRestored: !0
                            });
                        n[o] = a
                    } else r.push(o)
                }), this.uppy.setState({
                    files: n
                }), this.uppy.emit("restored", this.savedPluginData), r.length && this.deleteBlobs(r).then(function() {
                    t.uppy.log("[GoldenRetriever] Cleaned up " + r.length + " old files")
                }).catch(function(e) {
                    t.uppy.log("[GoldenRetriever] Could not clean up " + r.length + " old files", "warning"), t.uppy.log(e)
                })
            }, t.prototype.deleteBlobs = function(e) {
                var t = this,
                    r = [];
                return e.forEach(function(e) {
                    t.ServiceWorkerStore && r.push(t.ServiceWorkerStore.delete(e)), t.IndexedDBStore && r.push(t.IndexedDBStore.delete(e))
                }), Promise.all(r)
            }, t.prototype.install = function() {
                var e = this;
                this.loadFilesStateFromLocalStorage(), this.uppy.getFiles().length > 0 ? this.ServiceWorkerStore ? (this.uppy.log("[GoldenRetriever] Attempting to load files from Service Worker..."), this.loadFileBlobsFromServiceWorker()) : (this.uppy.log("[GoldenRetriever] Attempting to load files from Indexed DB..."), this.loadFileBlobsFromIndexedDB()) : (this.uppy.log("[GoldenRetriever] No files need to be loaded, only restoring processing state..."), this.onBlobsLoaded([])), this.uppy.on("file-added", function(t) {
                    t.isRemote || (e.ServiceWorkerStore && e.ServiceWorkerStore.put(t).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Could not store file", "warning"), e.uppy.log(t)
                    }), e.IndexedDBStore.put(t).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Could not store file", "warning"), e.uppy.log(t)
                    }))
                }), this.uppy.on("file-removed", function(t) {
                    e.ServiceWorkerStore && e.ServiceWorkerStore.delete(t.id).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), e.uppy.log(t)
                    }), e.IndexedDBStore.delete(t.id).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), e.uppy.log(t)
                    })
                }), this.uppy.on("complete", function(t) {
                    var r = t.successful,
                        n = r.map(function(e) {
                            return e.id
                        });
                    e.deleteBlobs(n).then(function() {
                        e.uppy.log("[GoldenRetriever] Removed " + r.length + " files that finished uploading")
                    }).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Could not remove " + r.length + " files that finished uploading", "warning"), e.uppy.log(t)
                    })
                }), this.uppy.on("state-update", this.saveFilesStateToLocalStorage), this.uppy.on("restored", function() {
                    var t = e.uppy.getState().currentUploads;
                    t && Object.keys(t).forEach(function(r) {
                        e.uppy.restore(r, t[r])
                    })
                })
            }, t
        }(__Plugin_122),
        _$DriveProviderViews_123 = function(e) {
            function t() {
                return function(e, r) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.toggleCheckbox = function(t, r) {
                t.stopPropagation(), t.preventDefault(), r.custom.isTeamDrive || e.prototype.toggleCheckbox.call(this, t, r)
            }, t
        }(_$lib_136),
        __Plugin_124 = _$lib_96.Plugin,
        __Provider_124 = _$lib_94.Provider,
        __dummy_124$0 = 0,
        __h_124 = _$preact_49.h,
        _$lib_124 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.id = o.opts.id || "GoogleDrive", o.title = o.opts.title || "Google Drive", __Provider_124.initPlugin(o, n), o.title = o.opts.title || "Google Drive", o.icon = function() {
                    return __h_124("svg", {
                        "aria-hidden": "true",
                        width: "18px",
                        height: "16px",
                        viewBox: "0 0 18 16",
                        version: "1.1",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, __h_124("g", {
                        "fill-rule": "evenodd"
                    }, __h_124("polygon", {
                        fill: "#3089FC",
                        points: "6.32475 10.2 18 10.2 14.999625 15.3 3.324375 15.3"
                    }), __h_124("polygon", {
                        fill: "#00A85D",
                        points: "3.000375 15.3 0 10.2 5.83875 0.275974026 8.838 5.37597403 5.999625 10.2"
                    }), __h_124("polygon", {
                        fill: "#FFD024",
                        points: "11.838375 9.92402597 5.999625 0 12.000375 0 17.839125 9.92402597"
                    })))
                }, o.provider = new __Provider_124(r, {
                    serverUrl: o.opts.serverUrl,
                    serverHeaders: o.opts.serverHeaders,
                    provider: "drive",
                    authProvider: "google"
                }), o.onAuth = o.onAuth.bind(o), o.render = o.render.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.install = function() {
                this.view = new _$DriveProviderViews_123(this, {
                    provider: this.provider
                }), this.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1,
                    hasTeamDrives: !1,
                    teamDrives: [],
                    teamDriveId: ""
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.view.tearDown(), this.unmount()
            }, t.prototype.onAuth = function(e) {
                this.setPluginState({
                    authenticated: e
                }), e && this.view.getFolder("root", "/")
            }, t.prototype.render = function(e) {
                return this.view.render(e)
            }, t
        }(__Plugin_124),
        __Plugin_126 = _$lib_96.Plugin,
        __Provider_126 = _$lib_94.Provider,
        __dummy_126$0 = 0,
        __h_126 = _$preact_49.h,
        _$lib_126 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.id = o.opts.id || "Instagram", __Provider_126.initPlugin(o, n), o.title = o.opts.title || "Instagram", o.icon = function() {
                    return __h_126("svg", {
                        "aria-hidden": "true",
                        fill: "#DE3573",
                        width: "28",
                        height: "28",
                        viewBox: "0 0 512 512"
                    }, __h_126("path", {
                        d: "M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z"
                    }), __h_126("path", {
                        d: "M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z"
                    }), __h_126("circle", {
                        cx: "390.476",
                        cy: "121.524",
                        r: "30.23"
                    }))
                }, o.provider = new __Provider_126(r, {
                    serverUrl: o.opts.serverUrl,
                    serverHeaders: o.opts.serverHeaders,
                    provider: "instagram",
                    authProvider: "instagram"
                }), o.onAuth = o.onAuth.bind(o), o.render = o.render.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.install = function() {
                this.view = new _$lib_136(this, {
                    provider: this.provider,
                    viewType: "grid",
                    showTitles: !1,
                    showFilter: !1,
                    showBreadcrumbs: !1
                }), this.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.view.tearDown(), this.unmount()
            }, t.prototype.onAuth = function(e) {
                this.setPluginState({
                    authenticated: e
                }), e && this.view.getFolder("recent")
            }, t.prototype.render = function(e) {
                return this.view.render(e)
            }, t
        }(__Plugin_126),
        ___extends_127 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_127 = _$lib_96.Plugin,
        __h_127 = _$preact_49.h,
        _$lib_127 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.id = o.opts.id || "ProgressBar", o.title = "Progress Bar", o.type = "progressindicator", o.opts = ___extends_127({}, {
                    target: "body",
                    replaceTargetContent: !1,
                    fixed: !1,
                    hideAfterFinish: !0
                }, n), o.render = o.render.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.render = function(e) {
                var t = e.totalProgress || 0,
                    r = 100 === t && this.opts.hideAfterFinish;
                return __h_127("div", {
                    class: "uppy uppy-ProgressBar",
                    style: {
                        position: this.opts.fixed ? "fixed" : "initial"
                    },
                    "aria-hidden": r
                }, __h_127("div", {
                    class: "uppy-ProgressBar-inner",
                    style: {
                        width: t + "%"
                    }
                }), __h_127("div", {
                    class: "uppy-ProgressBar-percentage"
                }, t))
            }, t.prototype.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.unmount()
            }, t
        }(__Plugin_127),
        ___extends_137 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_137 = _$lib_96.Plugin,
        _$lib_137 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.type = "debugger", o.id = "ReduxDevTools", o.title = "Redux DevTools", o.opts = ___extends_137({}, {}, n), o.handleStateChange = o.handleStateChange.bind(o), o.initDevTools = o.initDevTools.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleStateChange = function(e, t, r) {
                this.devTools.send("UPPY_STATE_UPDATE", t)
            }, t.prototype.initDevTools = function() {
                var e = this;
                this.devTools = window.devToolsExtension.connect(), this.devToolsUnsubscribe = this.devTools.subscribe(function(t) {
                    if ("DISPATCH" === t.type) switch (console.log(t.payload.type), t.payload.type) {
                        case "RESET":
                            return void e.uppy.reset();
                        case "IMPORT_STATE":
                            var r = t.payload.nextLiftedState.computedStates;
                            return e.uppy.store.state = ___extends_137({}, e.uppy.getState(), r[r.length - 1].state), void e.uppy.updateAll(e.uppy.getState());
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                            e.uppy.store.state = ___extends_137({}, e.uppy.getState(), JSON.parse(t.state)), e.uppy.updateAll(e.uppy.getState())
                    }
                })
            }, t.prototype.install = function() {
                this.withDevTools = "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__, this.withDevTools && (this.initDevTools(), this.uppy.on("state-update", this.handleStateChange))
            }, t.prototype.uninstall = function() {
                this.withDevTools && (this.devToolsUnsubscribe(), this.uppy.off("state-update", this.handleStateUpdate))
            }, t
        }(__Plugin_137),
        _$lib_142 = {},
        ___extends_142 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_142$0 = 0,
        STATE_UPDATE = "uppy/STATE_UPDATE",
        defaultSelector = function(e) {
            return function(t) {
                return t.uppy[e]
            }
        },
        ReduxStore = function() {
            function e(t) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this._store = t.store, this._id = t.id || _$cuid_13(), this._selector = t.selector || defaultSelector(this._id), this.setState({})
            }
            return e.prototype.setState = function(e) {
                this._store.dispatch({
                    type: STATE_UPDATE,
                    id: this._id,
                    payload: e
                })
            }, e.prototype.getState = function() {
                return this._selector(this._store.getState())
            }, e.prototype.subscribe = function(e) {
                var t = this,
                    r = this.getState();
                return this._store.subscribe(function() {
                    var n = t.getState();
                    if (r !== n) {
                        var o = function(e, t) {
                            var r = Object.keys(t),
                                n = {};
                            return r.forEach(function(r) {
                                e[r] !== t[r] && (n[r] = t[r])
                            }), n
                        }(r, n);
                        e(r, n, o), r = n
                    }
                })
            }, e
        }();
    _$lib_142 = function(e) {
        return new ReduxStore(e)
    }, _$lib_142.STATE_UPDATE = STATE_UPDATE, _$lib_142.reducer = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments[1];
        if (t.type === STATE_UPDATE) {
            var r, n = ___extends_142({}, e[t.id], t.payload);
            return ___extends_142({}, e, ((r = {})[t.id] = n, r))
        }
        return e
    }, _$lib_142.middleware = function() {
        return function() {
            return function(e) {
                return function(t) {
                    e(t)
                }
            }
        }
    };
    var _$componentEmitter_11 = {
        exports: {}
    };

    function Emitter(e) {
        if (e) return function(e) {
            for (var t in Emitter.prototype) e[t] = Emitter.prototype[t];
            return e
        }(e)
    }
    _$componentEmitter_11.exports = Emitter, Emitter.prototype.on = Emitter.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, Emitter.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === t || r.fn === t) {
                n.splice(o, 1);
                break
            }
        return this
    }, Emitter.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t);
        return this
    }, Emitter.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, Emitter.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }, _$componentEmitter_11 = _$componentEmitter_11.exports;
    var _$backo2_3 = {};

    function Backoff(e) {
        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
    }
    _$backo2_3 = Backoff, Backoff.prototype.duration = function() {
        var e = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var t = Math.random(),
                r = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r
        }
        return 0 | Math.min(e, this.max)
    }, Backoff.prototype.reset = function() {
        this.attempts = 0
    }, Backoff.prototype.setMin = function(e) {
        this.ms = e
    }, Backoff.prototype.setMax = function(e) {
        this.max = e
    }, Backoff.prototype.setJitter = function(e) {
        this.jitter = e
    };
    var __slice_10 = [].slice,
        _$componentBind_10 = function(e, t) {
            if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
            var r = __slice_10.call(arguments, 2);
            return function() {
                return t.apply(e, r.concat(__slice_10.call(arguments)))
            }
        };

    function __noop_1() {}
    var _$after_1 = function(e, t, r) {
            var n = !1;
            return r = r || __noop_1, o.count = e, 0 === e ? t() : o;

            function o(e, i) {
                if (o.count <= 0) throw new Error("after called too many times");
                --o.count, e ? (n = !0, t(e), t = r) : 0 !== o.count || n || t(null, i)
            }
        },
        _$arraybufferSlice_2 = function(e, t, r) {
            var n = e.byteLength;
            if (t = t || 0, r = r || n, e.slice) return e.slice(t, r);
            if (t < 0 && (t += n), r < 0 && (r += n), r > n && (r = n), t >= n || t >= r || 0 === n) return new ArrayBuffer(0);
            for (var o = new Uint8Array(e), i = new Uint8Array(r - t), s = t, a = 0; s < r; s++, a++) i[a] = o[s];
            return i.buffer
        },
        _$base64Arraybuffer_4 = {};
    ! function() {
        "use strict";
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = new Uint8Array(256), r = 0; r < e.length; r++) t[e.charCodeAt(r)] = r;
        _$base64Arraybuffer_4.encode = function(t) {
            var r, n = new Uint8Array(t),
                o = n.length,
                i = "";
            for (r = 0; r < o; r += 3) i += e[n[r] >> 2], i += e[(3 & n[r]) << 4 | n[r + 1] >> 4], i += e[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], i += e[63 & n[r + 2]];
            return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
        }, _$base64Arraybuffer_4.decode = function(e) {
            var r, n, o, i, s, a = .75 * e.length,
                u = e.length,
                l = 0;
            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
            var p = new ArrayBuffer(a),
                c = new Uint8Array(p);
            for (r = 0; r < u; r += 4) n = t[e.charCodeAt(r)], o = t[e.charCodeAt(r + 1)], i = t[e.charCodeAt(r + 2)], s = t[e.charCodeAt(r + 3)], c[l++] = n << 2 | o >> 4, c[l++] = (15 & o) << 4 | i >> 2, c[l++] = (3 & i) << 6 | 63 & s;
            return p
        }
    }();
    var _$blob_6 = {},
        BlobBuilder = void 0 !== BlobBuilder ? BlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        blobSupported = function() {
            try {
                return 2 === new Blob(["hi"]).size
            } catch (e) {
                return !1
            }
        }(),
        blobSupportsArrayBufferView = blobSupported && function() {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size
            } catch (e) {
                return !1
            }
        }(),
        blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

    function mapArrayBufferViews(e) {
        return e.map(function(e) {
            if (e.buffer instanceof ArrayBuffer) {
                var t = e.buffer;
                if (e.byteLength !== t.byteLength) {
                    var r = new Uint8Array(e.byteLength);
                    r.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = r.buffer
                }
                return t
            }
            return e
        })
    }

    function BlobBuilderConstructor(e, t) {
        t = t || {};
        var r = new BlobBuilder;
        return mapArrayBufferViews(e).forEach(function(e) {
            r.append(e)
        }), t.type ? r.getBlob(t.type) : r.getBlob()
    }

    function BlobConstructor(e, t) {
        return new Blob(mapArrayBufferViews(e), t || {})
    }
    "undefined" != typeof Blob && (BlobBuilderConstructor.prototype = Blob.prototype, BlobConstructor.prototype = Blob.prototype), _$blob_6 = blobSupported ? blobSupportsArrayBufferView ? Blob : BlobConstructor : blobBuilderSupported ? BlobBuilderConstructor : void 0;
    var _$keys_31 = Object.keys || function(e) {
            var t = [],
                r = Object.prototype.hasOwnProperty;
            for (var n in e) r.call(e, n) && t.push(n);
            return t
        },
        byteArray, byteCount, byteIndex, stringFromCharCode = String.fromCharCode;

    function ucs2decode(e) {
        for (var t, r, n = [], o = 0, i = e.length; o < i;)(t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (r = e.charCodeAt(o++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), o--) : n.push(t);
        return n
    }

    function checkScalarValue(e, t) {
        if (e >= 55296 && e <= 57343) {
            if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
            return !1
        }
        return !0
    }

    function createByte(e, t) {
        return stringFromCharCode(e >> t & 63 | 128)
    }

    function encodeCodePoint(e, t) {
        if (0 == (4294967168 & e)) return stringFromCharCode(e);
        var r = "";
        return 0 == (4294965248 & e) ? r = stringFromCharCode(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (checkScalarValue(e, t) || (e = 65533), r = stringFromCharCode(e >> 12 & 15 | 224), r += createByte(e, 6)) : 0 == (4292870144 & e) && (r = stringFromCharCode(e >> 18 & 7 | 240), r += createByte(e, 12), r += createByte(e, 6)), r + stringFromCharCode(63 & e | 128)
    }

    function readContinuationByte() {
        if (byteIndex >= byteCount) throw Error("Invalid byte index");
        var e = 255 & byteArray[byteIndex];
        if (byteIndex++, 128 == (192 & e)) return 63 & e;
        throw Error("Invalid continuation byte")
    }

    function decodeSymbol(e) {
        var t, r;
        if (byteIndex > byteCount) throw Error("Invalid byte index");
        if (byteIndex == byteCount) return !1;
        if (t = 255 & byteArray[byteIndex], byteIndex++, 0 == (128 & t)) return t;
        if (192 == (224 & t)) {
            if ((r = (31 & t) << 6 | readContinuationByte()) >= 128) return r;
            throw Error("Invalid continuation byte")
        }
        if (224 == (240 & t)) {
            if ((r = (15 & t) << 12 | readContinuationByte() << 6 | readContinuationByte()) >= 2048) return checkScalarValue(r, e) ? r : 65533;
            throw Error("Invalid continuation byte")
        }
        if (240 == (248 & t) && (r = (7 & t) << 18 | readContinuationByte() << 12 | readContinuationByte() << 6 | readContinuationByte()) >= 65536 && r <= 1114111) return r;
        throw Error("Invalid UTF-8 detected")
    }
    for (var _$utf8_32 = {
            encode: function(e, t) {
                for (var r = !1 !== (t = t || {}).strict, n = ucs2decode(e), o = n.length, i = -1, s = ""; ++i < o;) s += encodeCodePoint(n[i], r);
                return s
            },
            decode: function(e, t) {
                var r = !1 !== (t = t || {}).strict;
                byteArray = ucs2decode(e), byteCount = byteArray.length, byteIndex = 0;
                for (var n, o = []; !1 !== (n = decodeSymbol(r));) o.push(n);
                return function(e) {
                    for (var t, r = e.length, n = -1, o = ""; ++n < r;)(t = e[n]) > 65535 && (o += stringFromCharCode((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += stringFromCharCode(t);
                    return o
                }(o)
            }
        }, _$base64Js_5 = {
            toByteArray: function(e) {
                for (var t, r = getLens(e), n = r[0], o = r[1], i = new Arr(function(e, t, r) {
                        return 3 * (t + r) / 4 - r
                    }(0, n, o)), s = 0, a = o > 0 ? n - 4 : n, u = 0; u < a; u += 4) t = revLookup[e.charCodeAt(u)] << 18 | revLookup[e.charCodeAt(u + 1)] << 12 | revLookup[e.charCodeAt(u + 2)] << 6 | revLookup[e.charCodeAt(u + 3)], i[s++] = t >> 16 & 255, i[s++] = t >> 8 & 255, i[s++] = 255 & t;
                return 2 === o && (t = revLookup[e.charCodeAt(u)] << 2 | revLookup[e.charCodeAt(u + 1)] >> 4, i[s++] = 255 & t), 1 === o && (t = revLookup[e.charCodeAt(u)] << 10 | revLookup[e.charCodeAt(u + 1)] << 4 | revLookup[e.charCodeAt(u + 2)] >> 2, i[s++] = t >> 8 & 255, i[s++] = 255 & t), i
            },
            fromByteArray: function(e) {
                for (var t, r = e.length, n = r % 3, o = [], i = 0, s = r - n; i < s; i += 16383) o.push(encodeChunk(e, i, i + 16383 > s ? s : i + 16383));
                return 1 === n ? (t = e[r - 1], o.push(lookup[t >> 2] + lookup[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o.push(lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "=")), o.join("")
            }
        }, lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i) lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;

    function getLens(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function encodeChunk(e, t, r) {
        for (var n, o, i = [], s = t; s < r; s += 3) n = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), i.push(lookup[(o = n) >> 18 & 63] + lookup[o >> 12 & 63] + lookup[o >> 6 & 63] + lookup[63 & o]);
        return i.join("")
    }
    revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
    var _$ieee754_40 = {
            read: function(e, t, r, n, o) {
                var i, s, a = 8 * o - n - 1,
                    u = (1 << a) - 1,
                    l = u >> 1,
                    p = -7,
                    c = r ? o - 1 : 0,
                    d = r ? -1 : 1,
                    h = e[t + c];
                for (c += d, i = h & (1 << -p) - 1, h >>= -p, p += a; p > 0; i = 256 * i + e[t + c], c += d, p -= 8);
                for (s = i & (1 << -p) - 1, i >>= -p, p += n; p > 0; s = 256 * s + e[t + c], c += d, p -= 8);
                if (0 === i) i = 1 - l;
                else {
                    if (i === u) return s ? NaN : 1 / 0 * (h ? -1 : 1);
                    s += Math.pow(2, n), i -= l
                }
                return (h ? -1 : 1) * s * Math.pow(2, i - n)
            },
            write: function(e, t, r, n, o, i) {
                var s, a, u, l = 8 * i - o - 1,
                    p = (1 << l) - 1,
                    c = p >> 1,
                    d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    h = n ? 0 : i - 1,
                    f = n ? 1 : -1,
                    _ = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = p) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + c >= 1 ? d / u : d * Math.pow(2, 1 - c)) * u >= 2 && (s++, u /= 2), s + c >= p ? (a = 0, s = p) : s + c >= 1 ? (a = (t * u - 1) * Math.pow(2, o), s += c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, o), s = 0)); o >= 8; e[r + h] = 255 & a, h += f, a /= 256, o -= 8);
                for (s = s << o | a, l += o; l > 0; e[r + h] = 255 & s, h += f, s /= 256, l -= 8);
                e[r + h - f] |= 128 * _
            }
        },
        _$buffer_8 = {},
        __dummy_8$0 = 0,
        __dummy_8$1 = 0;
    _$buffer_8.Buffer = Buffer, _$buffer_8.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;

    function createBuffer(e) {
        if (e > K_MAX_LENGTH) throw new RangeError('The value "' + e + '" is invalid for option "size"');
        var t = new Uint8Array(e);
        return t.__proto__ = Buffer.prototype, t
    }

    function Buffer(e, t, r) {
        if ("number" == typeof e) {
            if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
            return allocUnsafe(e)
        }
        return from(e, t, r)
    }

    function from(e, t, r) {
        if ("string" == typeof e) return function(e, t) {
            if ("string" == typeof t && "" !== t || (t = "utf8"), !Buffer.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
            var r = 0 | byteLength(e, t),
                n = createBuffer(r),
                o = n.write(e, t);
            return o !== r && (n = n.slice(0, o)), n
        }(e, t);
        if (ArrayBuffer.isView(e)) return fromArrayLike(e);
        if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
        if (isInstance(e, ArrayBuffer) || e && isInstance(e.buffer, ArrayBuffer)) return function(e, t, r) {
            if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
            if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
            var n;
            return (n = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r)).__proto__ = Buffer.prototype, n
        }(e, t, r);
        if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
        var n = e.valueOf && e.valueOf();
        if (null != n && n !== e) return Buffer.from(n, t, r);
        var o = function(e) {
            if (Buffer.isBuffer(e)) {
                var t = 0 | checked(e.length),
                    r = createBuffer(t);
                return 0 === r.length ? r : (e.copy(r, 0, 0, t), r)
            }
            return void 0 !== e.length ? "number" != typeof e.length || numberIsNaN(e.length) ? createBuffer(0) : fromArrayLike(e) : "Buffer" === e.type && Array.isArray(e.data) ? fromArrayLike(e.data) : void 0
        }(e);
        if (o) return o;
        if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return Buffer.from(e[Symbol.toPrimitive]("string"), t, r);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
    }

    function assertSize(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
        if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
    }

    function allocUnsafe(e) {
        return assertSize(e), createBuffer(e < 0 ? 0 : 0 | checked(e))
    }

    function fromArrayLike(e) {
        for (var t = e.length < 0 ? 0 : 0 | checked(e.length), r = createBuffer(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
        return r
    }

    function checked(e) {
        if (e >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        return 0 | e
    }

    function byteLength(e, t) {
        if (Buffer.isBuffer(e)) return e.length;
        if (ArrayBuffer.isView(e) || isInstance(e, ArrayBuffer)) return e.byteLength;
        if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
        var r = e.length,
            n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r) return 0;
        for (var o = !1;;) switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
                return utf8ToBytes(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return base64ToBytes(e).length;
            default:
                if (o) return n ? -1 : utf8ToBytes(e).length;
                t = ("" + t).toLowerCase(), o = !0
        }
    }

    function swap(e, t, r) {
        var n = e[t];
        e[t] = e[r], e[r] = n
    }

    function bidirectionalIndexOf(e, t, r, n, o) {
        if (0 === e.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), numberIsNaN(r = +r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
            if (o) return -1;
            r = e.length - 1
        } else if (r < 0) {
            if (!o) return -1;
            r = 0
        }
        if ("string" == typeof t && (t = Buffer.from(t, n)), Buffer.isBuffer(t)) return 0 === t.length ? -1 : arrayIndexOf(e, t, r, n, o);
        if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : arrayIndexOf(e, [t], r, n, o);
        throw new TypeError("val must be string, number or Buffer")
    }

    function arrayIndexOf(e, t, r, n, o) {
        var i, s = 1,
            a = e.length,
            u = t.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
            if (e.length < 2 || t.length < 2) return -1;
            s = 2, a /= 2, u /= 2, r /= 2
        }

        function l(e, t) {
            return 1 === s ? e[t] : e.readUInt16BE(t * s)
        }
        if (o) {
            var p = -1;
            for (i = r; i < a; i++)
                if (l(e, i) === l(t, -1 === p ? 0 : i - p)) {
                    if (-1 === p && (p = i), i - p + 1 === u) return p * s
                } else -1 !== p && (i -= i - p), p = -1
        } else
            for (r + u > a && (r = a - u), i = r; i >= 0; i--) {
                for (var c = !0, d = 0; d < u; d++)
                    if (l(e, i + d) !== l(t, d)) {
                        c = !1;
                        break
                    }
                if (c) return i
            }
        return -1
    }

    function hexWrite(e, t, r, n) {
        r = Number(r) || 0;
        var o = e.length - r;
        n ? (n = Number(n)) > o && (n = o) : n = o;
        var i = t.length;
        n > i / 2 && (n = i / 2);
        for (var s = 0; s < n; ++s) {
            var a = parseInt(t.substr(2 * s, 2), 16);
            if (numberIsNaN(a)) return s;
            e[r + s] = a
        }
        return s
    }

    function utf8Write(e, t, r, n) {
        return blitBuffer(utf8ToBytes(t, e.length - r), e, r, n)
    }

    function asciiWrite(e, t, r, n) {
        return blitBuffer(function(e) {
            for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
            return t
        }(t), e, r, n)
    }

    function latin1Write(e, t, r, n) {
        return asciiWrite(e, t, r, n)
    }

    function base64Write(e, t, r, n) {
        return blitBuffer(base64ToBytes(t), e, r, n)
    }

    function ucs2Write(e, t, r, n) {
        return blitBuffer(function(e, t) {
            for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = (r = e.charCodeAt(s)) >> 8, o = r % 256, i.push(o), i.push(n);
            return i
        }(t, e.length - r), e, r, n)
    }

    function base64Slice(e, t, r) {
        return 0 === t && r === e.length ? _$base64Js_5.fromByteArray(e) : _$base64Js_5.fromByteArray(e.slice(t, r))
    }

    function utf8Slice(e, t, r) {
        r = Math.min(e.length, r);
        for (var n = [], o = t; o < r;) {
            var i, s, a, u, l = e[o],
                p = null,
                c = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
            if (o + c <= r) switch (c) {
                case 1:
                    l < 128 && (p = l);
                    break;
                case 2:
                    128 == (192 & (i = e[o + 1])) && (u = (31 & l) << 6 | 63 & i) > 127 && (p = u);
                    break;
                case 3:
                    i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & l) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (p = u);
                    break;
                case 4:
                    i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & l) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (p = u)
            }
            null === p ? (p = 65533, c = 1) : p > 65535 && (p -= 65536, n.push(p >>> 10 & 1023 | 55296), p = 56320 | 1023 & p), n.push(p), o += c
        }
        return function(e) {
            var t = e.length;
            if (t <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, e);
            for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += MAX_ARGUMENTS_LENGTH));
            return r
        }(n)
    }
    Buffer.TYPED_ARRAY_SUPPORT = function() {
        try {
            var e = new Uint8Array(1);
            return e.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function() {
                    return 42
                }
            }, 42 === e.foo()
        } catch (e) {
            return !1
        }
    }(), Buffer.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(Buffer.prototype, "parent", {
        enumerable: !0,
        get: function() {
            if (Buffer.isBuffer(this)) return this.buffer
        }
    }), Object.defineProperty(Buffer.prototype, "offset", {
        enumerable: !0,
        get: function() {
            if (Buffer.isBuffer(this)) return this.byteOffset
        }
    }), "undefined" != typeof Symbol && null != Symbol.species && Buffer[Symbol.species] === Buffer && Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: !0,
        enumerable: !1,
        writable: !1
    }), Buffer.poolSize = 8192, Buffer.from = function(e, t, r) {
        return from(e, t, r)
    }, Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array, Buffer.alloc = function(e, t, r) {
        return function(e, t, r) {
            return assertSize(e), e <= 0 ? createBuffer(e) : void 0 !== t ? "string" == typeof r ? createBuffer(e).fill(t, r) : createBuffer(e).fill(t) : createBuffer(e)
        }(e, t, r)
    }, Buffer.allocUnsafe = function(e) {
        return allocUnsafe(e)
    }, Buffer.allocUnsafeSlow = function(e) {
        return allocUnsafe(e)
    }, Buffer.isBuffer = function(e) {
        return null != e && !0 === e._isBuffer && e !== Buffer.prototype
    }, Buffer.compare = function(e, t) {
        if (isInstance(e, Uint8Array) && (e = Buffer.from(e, e.offset, e.byteLength)), isInstance(t, Uint8Array) && (t = Buffer.from(t, t.offset, t.byteLength)), !Buffer.isBuffer(e) || !Buffer.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (e === t) return 0;
        for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (e[o] !== t[o]) {
                r = e[o], n = t[o];
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }, Buffer.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }, Buffer.concat = function(e, t) {
        if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === e.length) return Buffer.alloc(0);
        var r;
        if (void 0 === t)
            for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
        var n = Buffer.allocUnsafe(t),
            o = 0;
        for (r = 0; r < e.length; ++r) {
            var i = e[r];
            if (isInstance(i, Uint8Array) && (i = Buffer.from(i)), !Buffer.isBuffer(i)) throw new TypeError('"list" argument must be an Array of Buffers');
            i.copy(n, o), o += i.length
        }
        return n
    }, Buffer.byteLength = byteLength, Buffer.prototype._isBuffer = !0, Buffer.prototype.swap16 = function() {
        var e = this.length;
        if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var t = 0; t < e; t += 2) swap(this, t, t + 1);
        return this
    }, Buffer.prototype.swap32 = function() {
        var e = this.length;
        if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var t = 0; t < e; t += 4) swap(this, t, t + 3), swap(this, t + 1, t + 2);
        return this
    }, Buffer.prototype.swap64 = function() {
        var e = this.length;
        if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var t = 0; t < e; t += 8) swap(this, t, t + 7), swap(this, t + 1, t + 6), swap(this, t + 2, t + 5), swap(this, t + 3, t + 4);
        return this
    }, Buffer.prototype.toString = function() {
        var e = this.length;
        return 0 === e ? "" : 0 === arguments.length ? utf8Slice(this, 0, e) : function(e, t, r) {
            var n = !1;
            if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
            if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
            if ((r >>>= 0) <= (t >>>= 0)) return "";
            for (e || (e = "utf8");;) switch (e) {
                case "hex":
                    return hexSlice(this, t, r);
                case "utf8":
                case "utf-8":
                    return utf8Slice(this, t, r);
                case "ascii":
                    return asciiSlice(this, t, r);
                case "latin1":
                case "binary":
                    return latin1Slice(this, t, r);
                case "base64":
                    return base64Slice(this, t, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return utf16leSlice(this, t, r);
                default:
                    if (n) throw new TypeError("Unknown encoding: " + e);
                    e = (e + "").toLowerCase(), n = !0
            }
        }.apply(this, arguments)
    }, Buffer.prototype.toLocaleString = Buffer.prototype.toString, Buffer.prototype.equals = function(e) {
        if (!Buffer.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
        return this === e || 0 === Buffer.compare(this, e)
    }, Buffer.prototype.inspect = function() {
        var e = "",
            t = _$buffer_8.INSPECT_MAX_BYTES;
        return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
    }, Buffer.prototype.compare = function(e, t, r, n, o) {
        if (isInstance(e, Uint8Array) && (e = Buffer.from(e, e.offset, e.byteLength)), !Buffer.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
        if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
        if (n >= o && t >= r) return 0;
        if (n >= o) return -1;
        if (t >= r) return 1;
        if (this === e) return 0;
        for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), a = Math.min(i, s), u = this.slice(n, o), l = e.slice(t, r), p = 0; p < a; ++p)
            if (u[p] !== l[p]) {
                i = u[p], s = l[p];
                break
            }
        return i < s ? -1 : s < i ? 1 : 0
    }, Buffer.prototype.includes = function(e, t, r) {
        return -1 !== this.indexOf(e, t, r)
    }, Buffer.prototype.indexOf = function(e, t, r) {
        return bidirectionalIndexOf(this, e, t, r, !0)
    }, Buffer.prototype.lastIndexOf = function(e, t, r) {
        return bidirectionalIndexOf(this, e, t, r, !1)
    }, Buffer.prototype.write = function(e, t, r, n) {
        if (void 0 === t) n = "utf8", r = this.length, t = 0;
        else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
        else {
            if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
        }
        var o = this.length - t;
        if ((void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;) switch (n) {
            case "hex":
                return hexWrite(this, e, t, r);
            case "utf8":
            case "utf-8":
                return utf8Write(this, e, t, r);
            case "ascii":
                return asciiWrite(this, e, t, r);
            case "latin1":
            case "binary":
                return latin1Write(this, e, t, r);
            case "base64":
                return base64Write(this, e, t, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ucs2Write(this, e, t, r);
            default:
                if (i) throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), i = !0
        }
    }, Buffer.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    };
    var MAX_ARGUMENTS_LENGTH = 4096;

    function asciiSlice(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
        return n
    }

    function latin1Slice(e, t, r) {
        var n = "";
        r = Math.min(e.length, r);
        for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
        return n
    }

    function hexSlice(e, t, r) {
        var n = e.length;
        (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = "", i = t; i < r; ++i) o += toHex(e[i]);
        return o
    }

    function utf16leSlice(e, t, r) {
        for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        return o
    }

    function checkOffset(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
    }

    function checkInt(e, t, r, n, o, i) {
        if (!Buffer.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
        if (r + n > e.length) throw new RangeError("Index out of range")
    }

    function checkIEEE754(e, t, r, n, o, i) {
        if (r + n > e.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range")
    }

    function writeFloat(e, t, r, n, o) {
        return t = +t, r >>>= 0, o || checkIEEE754(e, 0, r, 4), _$ieee754_40.write(e, t, r, n, 23, 4), r + 4
    }

    function writeDouble(e, t, r, n, o) {
        return t = +t, r >>>= 0, o || checkIEEE754(e, 0, r, 8), _$ieee754_40.write(e, t, r, n, 52, 8), r + 8
    }
    Buffer.prototype.slice = function(e, t) {
        var r = this.length;
        (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e);
        var n = this.subarray(e, t);
        return n.__proto__ = Buffer.prototype, n
    }, Buffer.prototype.readUIntLE = function(e, t, r) {
        e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
        return n
    }, Buffer.prototype.readUIntBE = function(e, t, r) {
        e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);) n += this[e + --t] * o;
        return n
    }, Buffer.prototype.readUInt8 = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 1, this.length), this[e]
    }, Buffer.prototype.readUInt16LE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 2, this.length), this[e] | this[e + 1] << 8
    }, Buffer.prototype.readUInt16BE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 2, this.length), this[e] << 8 | this[e + 1]
    }, Buffer.prototype.readUInt32LE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
    }, Buffer.prototype.readUInt32BE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
    }, Buffer.prototype.readIntLE = function(e, t, r) {
        e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
        for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n
    }, Buffer.prototype.readIntBE = function(e, t, r) {
        e >>>= 0, t >>>= 0, r || checkOffset(e, t, this.length);
        for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);) i += this[e + --n] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i
    }, Buffer.prototype.readInt8 = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
    }, Buffer.prototype.readInt16LE = function(e, t) {
        e >>>= 0, t || checkOffset(e, 2, this.length);
        var r = this[e] | this[e + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
    }, Buffer.prototype.readInt16BE = function(e, t) {
        e >>>= 0, t || checkOffset(e, 2, this.length);
        var r = this[e + 1] | this[e] << 8;
        return 32768 & r ? 4294901760 | r : r
    }, Buffer.prototype.readInt32LE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
    }, Buffer.prototype.readInt32BE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
    }, Buffer.prototype.readFloatLE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 4, this.length), _$ieee754_40.read(this, e, !0, 23, 4)
    }, Buffer.prototype.readFloatBE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 4, this.length), _$ieee754_40.read(this, e, !1, 23, 4)
    }, Buffer.prototype.readDoubleLE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 8, this.length), _$ieee754_40.read(this, e, !0, 52, 8)
    }, Buffer.prototype.readDoubleBE = function(e, t) {
        return e >>>= 0, t || checkOffset(e, 8, this.length), _$ieee754_40.read(this, e, !1, 52, 8)
    }, Buffer.prototype.writeUIntLE = function(e, t, r, n) {
        e = +e, t >>>= 0, r >>>= 0, n || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1,
            i = 0;
        for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
        return t + r
    }, Buffer.prototype.writeUIntBE = function(e, t, r, n) {
        e = +e, t >>>= 0, r >>>= 0, n || checkInt(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1,
            i = 1;
        for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
        return t + r
    }, Buffer.prototype.writeUInt8 = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
    }, Buffer.prototype.writeUInt16LE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
    }, Buffer.prototype.writeUInt16BE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
    }, Buffer.prototype.writeUInt32LE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
    }, Buffer.prototype.writeUInt32BE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
    }, Buffer.prototype.writeIntLE = function(e, t, r, n) {
        if (e = +e, t >>>= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            checkInt(this, e, t, r, o - 1, -o)
        }
        var i = 0,
            s = 1,
            a = 0;
        for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
        return t + r
    }, Buffer.prototype.writeIntBE = function(e, t, r, n) {
        if (e = +e, t >>>= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            checkInt(this, e, t, r, o - 1, -o)
        }
        var i = r - 1,
            s = 1,
            a = 0;
        for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
        return t + r
    }, Buffer.prototype.writeInt8 = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
    }, Buffer.prototype.writeInt16LE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
    }, Buffer.prototype.writeInt16BE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
    }, Buffer.prototype.writeInt32LE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
    }, Buffer.prototype.writeInt32BE = function(e, t, r) {
        return e = +e, t >>>= 0, r || checkInt(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
    }, Buffer.prototype.writeFloatLE = function(e, t, r) {
        return writeFloat(this, e, t, !0, r)
    }, Buffer.prototype.writeFloatBE = function(e, t, r) {
        return writeFloat(this, e, t, !1, r)
    }, Buffer.prototype.writeDoubleLE = function(e, t, r) {
        return writeDouble(this, e, t, !0, r)
    }, Buffer.prototype.writeDoubleBE = function(e, t, r) {
        return writeDouble(this, e, t, !1, r)
    }, Buffer.prototype.copy = function(e, t, r, n) {
        if (!Buffer.isBuffer(e)) throw new TypeError("argument should be a Buffer");
        if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
        if (0 === e.length || 0 === this.length) return 0;
        if (t < 0) throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
        var o = n - r;
        if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);
        else if (this === e && r < t && t < n)
            for (var i = o - 1; i >= 0; --i) e[i + t] = this[i + r];
        else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
        return o
    }, Buffer.prototype.fill = function(e, t, r, n) {
        if ("string" == typeof e) {
            if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !Buffer.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
            if (1 === e.length) {
                var o = e.charCodeAt(0);
                ("utf8" === n && o < 128 || "latin1" === n) && (e = o)
            }
        } else "number" == typeof e && (e &= 255);
        if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
        if (r <= t) return this;
        var i;
        if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
            for (i = t; i < r; ++i) this[i] = e;
        else {
            var s = Buffer.isBuffer(e) ? e : Buffer.from(e, n),
                a = s.length;
            if (0 === a) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
            for (i = 0; i < r - t; ++i) this[i + t] = s[i % a]
        }
        return this
    };
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

    function toHex(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
    }

    function utf8ToBytes(e, t) {
        var r;
        t = t || 1 / 0;
        for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
            if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                if (!o) {
                    if (r > 56319) {
                        (t -= 3) > -1 && i.push(239, 191, 189);
                        continue
                    }
                    if (s + 1 === n) {
                        (t -= 3) > -1 && i.push(239, 191, 189);
                        continue
                    }
                    o = r;
                    continue
                }
                if (r < 56320) {
                    (t -= 3) > -1 && i.push(239, 191, 189), o = r;
                    continue
                }
                r = 65536 + (o - 55296 << 10 | r - 56320)
            } else o && (t -= 3) > -1 && i.push(239, 191, 189);
            if (o = null, r < 128) {
                if ((t -= 1) < 0) break;
                i.push(r)
            } else if (r < 2048) {
                if ((t -= 2) < 0) break;
                i.push(r >> 6 | 192, 63 & r | 128)
            } else if (r < 65536) {
                if ((t -= 3) < 0) break;
                i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
            } else {
                if (!(r < 1114112)) throw new Error("Invalid code point");
                if ((t -= 4) < 0) break;
                i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
            }
        }
        return i
    }

    function base64ToBytes(e) {
        return _$base64Js_5.toByteArray(function(e) {
            if ((e = (e = e.split("=")[0]).trim().replace(INVALID_BASE64_RE, "")).length < 2) return "";
            for (; e.length % 4 != 0;) e += "=";
            return e
        }(e))
    }

    function blitBuffer(e, t, r, n) {
        for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
        return o
    }

    function isInstance(e, t) {
        return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
    }

    function numberIsNaN(e) {
        return e != e
    }
    var __toString_42 = {}.toString,
        _$isarray_42 = Array.isArray || function(e) {
            return "[object Array]" == __toString_42.call(e)
        },
        _$hasBinary_38 = {};
    (function(e) {
        var t = Object.prototype.toString,
            r = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === t.call(Blob),
            n = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === t.call(File);
        _$hasBinary_38 = function t(o) {
            if (!o || "object" != typeof o) return !1;
            if (_$isarray_42(o)) {
                for (var i = 0, s = o.length; i < s; i++)
                    if (t(o[i])) return !0;
                return !1
            }
            if ("function" == typeof e && e.isBuffer && e.isBuffer(o) || "function" == typeof ArrayBuffer && o instanceof ArrayBuffer || r && o instanceof Blob || n && o instanceof File) return !0;
            if (o.toJSON && "function" == typeof o.toJSON && 1 === arguments.length) return t(o.toJSON(), !0);
            for (var a in o)
                if (Object.prototype.hasOwnProperty.call(o, a) && t(o[a])) return !0;
            return !1
        }
    }).call(this, _$buffer_8.Buffer);
    var _$browser_30 = {},
        base64encoder, __dummy_30$0 = 0,
        __dummy_30$1 = 0,
        __dummy_30$2 = 0,
        __dummy_30$3 = 0,
        __dummy_30$4 = 0;
    "undefined" != typeof ArrayBuffer && (base64encoder = _$base64Arraybuffer_4);
    var isAndroid = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
        isPhantomJS = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
        dontSendBlobs = isAndroid || isPhantomJS;
    _$browser_30.protocol = 3;
    var packets = _$browser_30.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        },
        packetslist = _$keys_31(packets),
        err = {
            type: "error",
            data: "parser error"
        },
        __dummy_30$5 = 0;

    function map(e, t, r) {
        for (var n = new Array(e.length), o = _$after_1(e.length, r), i = function(e, r, o) {
                t(r, function(t, r) {
                    n[e] = r, o(t, n)
                })
            }, s = 0; s < e.length; s++) i(s, e[s], o)
    }
    _$browser_30.encodePacket = function(e, t, r, n) {
        "function" == typeof t && (n = t, t = !1), "function" == typeof r && (n = r, r = null);
        var o = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ("undefined" != typeof ArrayBuffer && o instanceof ArrayBuffer) return function(e, t, r) {
            if (!t) return _$browser_30.encodeBase64Packet(e, r);
            var n = e.data,
                o = new Uint8Array(n),
                i = new Uint8Array(1 + n.byteLength);
            i[0] = packets[e.type];
            for (var s = 0; s < o.length; s++) i[s + 1] = o[s];
            return r(i.buffer)
        }(e, t, n);
        if (void 0 !== _$blob_6 && o instanceof _$blob_6) return function(e, t, r) {
            if (!t) return _$browser_30.encodeBase64Packet(e, r);
            if (dontSendBlobs) return function(e, t, r) {
                if (!t) return _$browser_30.encodeBase64Packet(e, r);
                var n = new FileReader;
                return n.onload = function() {
                    _$browser_30.encodePacket({
                        type: e.type,
                        data: n.result
                    }, t, !0, r)
                }, n.readAsArrayBuffer(e.data)
            }(e, t, r);
            var n = new Uint8Array(1);
            return n[0] = packets[e.type], r(new _$blob_6([n.buffer, e.data]))
        }(e, t, n);
        if (o && o.base64) return function(e, t) {
            return t("b" + _$browser_30.packets[e.type] + e.data.data)
        }(e, n);
        var i = packets[e.type];
        return void 0 !== e.data && (i += r ? _$utf8_32.encode(String(e.data), {
            strict: !1
        }) : String(e.data)), n("" + i)
    }, _$browser_30.encodeBase64Packet = function(e, t) {
        var r, n = "b" + _$browser_30.packets[e.type];
        if (void 0 !== _$blob_6 && e.data instanceof _$blob_6) {
            var o = new FileReader;
            return o.onload = function() {
                var e = o.result.split(",")[1];
                t(n + e)
            }, o.readAsDataURL(e.data)
        }
        try {
            r = String.fromCharCode.apply(null, new Uint8Array(e.data))
        } catch (t) {
            for (var i = new Uint8Array(e.data), s = new Array(i.length), a = 0; a < i.length; a++) s[a] = i[a];
            r = String.fromCharCode.apply(null, s)
        }
        return n += btoa(r), t(n)
    }, _$browser_30.decodePacket = function(e, t, r) {
        if (void 0 === e) return err;
        if ("string" == typeof e) {
            if ("b" === e.charAt(0)) return _$browser_30.decodeBase64Packet(e.substr(1), t);
            if (r && !1 === (e = function(e) {
                    try {
                        e = _$utf8_32.decode(e, {
                            strict: !1
                        })
                    } catch (e) {
                        return !1
                    }
                    return e
                }(e))) return err;
            var n = e.charAt(0);
            return Number(n) == n && packetslist[n] ? e.length > 1 ? {
                type: packetslist[n],
                data: e.substring(1)
            } : {
                type: packetslist[n]
            } : err
        }
        n = new Uint8Array(e)[0];
        var o = _$arraybufferSlice_2(e, 1);
        return _$blob_6 && "blob" === t && (o = new _$blob_6([o])), {
            type: packetslist[n],
            data: o
        }
    }, _$browser_30.decodeBase64Packet = function(e, t) {
        var r = packetslist[e.charAt(0)];
        if (!base64encoder) return {
            type: r,
            data: {
                base64: !0,
                data: e.substr(1)
            }
        };
        var n = base64encoder.decode(e.substr(1));
        return "blob" === t && _$blob_6 && (n = new _$blob_6([n])), {
            type: r,
            data: n
        }
    }, _$browser_30.encodePayload = function(e, t, r) {
        "function" == typeof t && (r = t, t = null);
        var n = _$hasBinary_38(e);
        return t && n ? _$blob_6 && !dontSendBlobs ? _$browser_30.encodePayloadAsBlob(e, r) : _$browser_30.encodePayloadAsArrayBuffer(e, r) : e.length ? void map(e, function(e, r) {
            _$browser_30.encodePacket(e, !!n && t, !1, function(e) {
                r(null, function(e) {
                    return e.length + ":" + e
                }(e))
            })
        }, function(e, t) {
            return r(t.join(""))
        }) : r("0:")
    }, _$browser_30.decodePayload = function(e, t, r) {
        if ("string" != typeof e) return _$browser_30.decodePayloadAsBinary(e, t, r);
        var n;
        if ("function" == typeof t && (r = t, t = null), "" === e) return r(err, 0, 1);
        for (var o, i, s = "", a = 0, u = e.length; a < u; a++) {
            var l = e.charAt(a);
            if (":" === l) {
                if ("" === s || s != (o = Number(s))) return r(err, 0, 1);
                if (s != (i = e.substr(a + 1, o)).length) return r(err, 0, 1);
                if (i.length) {
                    if (n = _$browser_30.decodePacket(i, t, !1), err.type === n.type && err.data === n.data) return r(err, 0, 1);
                    if (!1 === r(n, a + o, u)) return
                }
                a += o, s = ""
            } else s += l
        }
        return "" !== s ? r(err, 0, 1) : void 0
    }, _$browser_30.encodePayloadAsArrayBuffer = function(e, t) {
        if (!e.length) return t(new ArrayBuffer(0));
        map(e, function(e, t) {
            _$browser_30.encodePacket(e, !0, !0, function(e) {
                return t(null, e)
            })
        }, function(e, r) {
            var n = r.reduce(function(e, t) {
                    var r;
                    return e + (r = "string" == typeof t ? t.length : t.byteLength).toString().length + r + 2
                }, 0),
                o = new Uint8Array(n),
                i = 0;
            return r.forEach(function(e) {
                var t = "string" == typeof e,
                    r = e;
                if (t) {
                    for (var n = new Uint8Array(e.length), s = 0; s < e.length; s++) n[s] = e.charCodeAt(s);
                    r = n.buffer
                }
                o[i++] = t ? 0 : 1;
                var a = r.byteLength.toString();
                for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                for (o[i++] = 255, n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s]
            }), t(o.buffer)
        })
    }, _$browser_30.encodePayloadAsBlob = function(e, t) {
        map(e, function(e, t) {
            _$browser_30.encodePacket(e, !0, !0, function(e) {
                var r = new Uint8Array(1);
                if (r[0] = 1, "string" == typeof e) {
                    for (var n = new Uint8Array(e.length), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                    e = n.buffer, r[0] = 0
                }
                var i = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(),
                    s = new Uint8Array(i.length + 1);
                for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                if (s[i.length] = 255, _$blob_6) {
                    var a = new _$blob_6([r.buffer, s.buffer, e]);
                    t(null, a)
                }
            })
        }, function(e, r) {
            return t(new _$blob_6(r))
        })
    }, _$browser_30.decodePayloadAsBinary = function(e, t, r) {
        "function" == typeof t && (r = t, t = null);
        for (var n = e, o = []; n.byteLength > 0;) {
            for (var i = new Uint8Array(n), s = 0 === i[0], a = "", u = 1; 255 !== i[u]; u++) {
                if (a.length > 310) return r(err, 0, 1);
                a += i[u]
            }
            n = _$arraybufferSlice_2(n, 2 + a.length), a = parseInt(a);
            var l = _$arraybufferSlice_2(n, 0, a);
            if (s) try {
                l = String.fromCharCode.apply(null, new Uint8Array(l))
            } catch (e) {
                var p = new Uint8Array(l);
                for (l = "", u = 0; u < p.length; u++) l += String.fromCharCode(p[u])
            }
            o.push(l), n = _$arraybufferSlice_2(n, a)
        }
        var c = o.length;
        o.forEach(function(e, n) {
            r(_$browser_30.decodePacket(e, t, !0), n, c)
        })
    };
    var _$transport_20 = {},
        __dummy_20$0 = 0,
        __dummy_20$1 = 0;

    function Transport(e) {
        this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress
    }
    _$transport_20 = Transport, _$componentEmitter_11(Transport.prototype), Transport.prototype.onError = function(e, t) {
        var r = new Error(e);
        return r.type = "TransportError", r.description = t, this.emit("error", r), this
    }, Transport.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    }, Transport.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }, Transport.prototype.send = function(e) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(e)
    }, Transport.prototype.onOpen = function() {
        this.readyState = "open", this.writable = !0, this.emit("open")
    }, Transport.prototype.onData = function(e) {
        var t = _$browser_30.decodePacket(e, this.socket.binaryType);
        this.onPacket(t)
    }, Transport.prototype.onPacket = function(e) {
        this.emit("packet", e)
    }, Transport.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close")
    };
    var _$componentInherit_12 = function(e, t) {
            var r = function() {};
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        },
        _$hasCors_39 = {};
    try {
        _$hasCors_39 = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
    } catch (err) {
        _$hasCors_39 = !1
    }
    var _$xmlhttprequest_26 = {};
    (function(e) {
        _$xmlhttprequest_26 = function(t) {
            var r = t.xdomain,
                n = t.xscheme,
                o = t.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!r || _$hasCors_39)) return new XMLHttpRequest
            } catch (e) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && o) return new XDomainRequest
            } catch (e) {}
            if (!r) try {
                return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
            } catch (e) {}
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var s = 1e3,
        m = 60 * s,
        __h_27 = 60 * m,
        d = 24 * __h_27,
        y = 365.25 * d;

    function plural(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var _$ms_27 = function(e, t) {
            t = t || {};
            var r, n = typeof e;
            if ("string" === n && e.length > 0) return function(e) {
                if (!((e = String(e)).length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return r * y;
                            case "days":
                            case "day":
                            case "d":
                                return r * d;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return r * __h_27;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return r * m;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return r * s;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? plural(r = e, d, "day") || plural(r, __h_27, "hour") || plural(r, m, "minute") || plural(r, s, "second") || r + " ms" : function(e) {
                return e >= d ? Math.round(e / d) + "d" : e >= __h_27 ? Math.round(e / __h_27) + "h" : e >= m ? Math.round(e / m) + "m" : e >= s ? Math.round(e / s) + "s" : e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        },
        _$debug_29 = {};

    function createDebug(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    o = n - (t || n);
                e.diff = o, e.prev = t, e.curr = n, t = n;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = _$debug_29.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = _$debug_29.formatters[r];
                    if ("function" == typeof n) {
                        var o = i[a];
                        t = n.call(e, o), i.splice(a, 1), a--
                    }
                    return t
                }), _$debug_29.formatArgs.call(e, i), (r.log || _$debug_29.log || console.log.bind(console)).apply(e, i)
            }
        }
        return r.namespace = e, r.enabled = _$debug_29.enabled(e), r.useColors = _$debug_29.useColors(), r.color = function(e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return _$debug_29.colors[Math.abs(r) % _$debug_29.colors.length]
        }(e), r.destroy = destroy, "function" == typeof _$debug_29.init && _$debug_29.init(r), _$debug_29.instances.push(r), r
    }

    function destroy() {
        var e = _$debug_29.instances.indexOf(this);
        return -1 !== e && (_$debug_29.instances.splice(e, 1), !0)
    }
    _$debug_29 = _$debug_29 = createDebug.debug = createDebug.default = createDebug, _$debug_29.coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, _$debug_29.disable = function() {
        _$debug_29.enable("")
    }, _$debug_29.enable = function(e) {
        var t;
        _$debug_29.save(e), _$debug_29.names = [], _$debug_29.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? _$debug_29.skips.push(new RegExp("^" + e.substr(1) + "$")) : _$debug_29.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < _$debug_29.instances.length; t++) {
            var o = _$debug_29.instances[t];
            o.enabled = _$debug_29.enabled(o.namespace)
        }
    }, _$debug_29.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = _$debug_29.skips.length; t < r; t++)
            if (_$debug_29.skips[t].test(e)) return !1;
        for (t = 0, r = _$debug_29.names.length; t < r; t++)
            if (_$debug_29.names[t].test(e)) return !0;
        return !1
    }, _$debug_29.humanize = _$ms_27, _$debug_29.instances = [], _$debug_29.names = [], _$debug_29.skips = [], _$debug_29.formatters = {};
    var _$browser_28 = {};
    (function(e) {
        function t() {
            var t;
            try {
                t = _$browser_28.storage.debug
            } catch (e) {}
            return !t && void 0 !== e && "env" in e && (t = e.env.DEBUG), t
        }(_$browser_28 = _$browser_28 = _$debug_29).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, _$browser_28.formatArgs = function(e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + _$browser_28.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (n++, "%c" === e && (o = n))
                }), e.splice(o, 0, r)
            }
        }, _$browser_28.save = function(e) {
            try {
                null == e ? _$browser_28.storage.removeItem("debug") : _$browser_28.storage.debug = e
            } catch (e) {}
        }, _$browser_28.load = t, _$browser_28.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, _$browser_28.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), _$browser_28.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], _$browser_28.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message
            }
        }, _$browser_28.enable(t())
    }).call(this, _$browser_51);
    var _$parseqs_46 = {
            encode: function(e) {
                var t = "";
                for (var r in e) e.hasOwnProperty(r) && (t.length && (t += "&"), t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                return t
            },
            decode: function(e) {
                for (var t = {}, r = e.split("&"), n = 0, o = r.length; n < o; n++) {
                    var i = r[n].split("=");
                    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
                }
                return t
            }
        },
        _$yeast_87 = {},
        prev, alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
        length = 64,
        __map_87 = {},
        seed = 0,
        __i_87 = 0;

    function encode(e) {
        var t = "";
        do {
            t = alphabet[e % length] + t, e = Math.floor(e / length)
        } while (e > 0);
        return t
    }

    function yeast() {
        var e = encode(+new Date);
        return e !== prev ? (seed = 0, prev = e) : e + "." + encode(seed++)
    }
    for (; __i_87 < length; __i_87++) __map_87[alphabet[__i_87]] = __i_87;
    yeast.encode = encode, yeast.decode = function(e) {
        var t = 0;
        for (__i_87 = 0; __i_87 < e.length; __i_87++) t = t * length + __map_87[e.charAt(__i_87)];
        return t
    }, _$yeast_87 = yeast;
    var __dummy_24$0 = 0,
        __dummy_24$1 = 0,
        __dummy_24$2 = 0,
        __dummy_24$3 = 0,
        __dummy_24$4 = 0,
        debug = _$browser_28("engine.io-client:polling"),
        _$Polling_24 = Polling,
        hasXHR2 = null != new _$xmlhttprequest_26({
            xdomain: !1
        }).responseType;

    function Polling(e) {
        var t = e && e.forceBase64;
        hasXHR2 && !t || (this.supportsBinary = !1), _$transport_20.call(this, e)
    }
    _$componentInherit_12(Polling, _$transport_20), Polling.prototype.name = "polling", Polling.prototype.doOpen = function() {
        this.poll()
    }, Polling.prototype.pause = function(e) {
        var t = this;

        function r() {
            debug("paused"), t.readyState = "paused", e()
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
            var n = 0;
            this.polling && (debug("we are currently polling - waiting to pause"), n++, this.once("pollComplete", function() {
                debug("pre-pause polling complete"), --n || r()
            })), this.writable || (debug("we are currently writing - waiting to pause"), n++, this.once("drain", function() {
                debug("pre-pause writing complete"), --n || r()
            }))
        } else r()
    }, Polling.prototype.poll = function() {
        debug("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
    }, Polling.prototype.onData = function(e) {
        var t = this;
        debug("polling got data %s", e), _$browser_30.decodePayload(e, this.socket.binaryType, function(e, r, n) {
            if ("opening" === t.readyState && t.onOpen(), "close" === e.type) return t.onClose(), !1;
            t.onPacket(e)
        }), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : debug('ignoring poll - transport state "%s"', this.readyState))
    }, Polling.prototype.doClose = function() {
        var e = this;

        function t() {
            debug("writing close packet"), e.write([{
                type: "close"
            }])
        }
        "open" === this.readyState ? (debug("transport open - closing"), t()) : (debug("transport not open - deferring close"), this.once("open", t))
    }, Polling.prototype.write = function(e) {
        var t = this;
        this.writable = !1;
        var r = function() {
            t.writable = !0, t.emit("drain")
        };
        _$browser_30.encodePayload(e, this.supportsBinary, function(e) {
            t.doWrite(e, r)
        })
    }, Polling.prototype.uri = function() {
        var e = this.query || {},
            t = this.secure ? "https" : "http",
            r = "";
        return !1 !== this.timestampRequests && (e[this.timestampParam] = _$yeast_87()), this.supportsBinary || e.sid || (e.b64 = 1), e = _$parseqs_46.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (r = ":" + this.port), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
    };
    var _$JSONPPolling_22 = {};
    (function(e) {
        _$JSONPPolling_22 = i;
        var t, r = /\n/g,
            n = /\\n/g;

        function o() {}

        function i(r) {
            _$Polling_24.call(this, r), this.query = this.query || {}, t || (e.___eio || (e.___eio = []), t = e.___eio), this.index = t.length;
            var n = this;
            t.push(function(e) {
                n.onData(e)
            }), this.query.j = this.index, e.document && e.addEventListener && e.addEventListener("beforeunload", function() {
                n.script && (n.script.onerror = o)
            }, !1)
        }
        _$componentInherit_12(i, _$Polling_24), i.prototype.supportsBinary = !1, i.prototype.doClose = function() {
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), _$Polling_24.prototype.doClose.call(this)
        }, i.prototype.doPoll = function() {
            var e = this,
                t = document.createElement("script");
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) {
                e.onError("jsonp poll error", t)
            };
            var r = document.getElementsByTagName("script")[0];
            r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                var e = document.createElement("iframe");
                document.body.appendChild(e), document.body.removeChild(e)
            }, 100)
        }, i.prototype.doWrite = function(e, t) {
            var o = this;
            if (!this.form) {
                var i, s = document.createElement("form"),
                    a = document.createElement("textarea"),
                    u = this.iframeId = "eio_iframe_" + this.index;
                s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = u, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a
            }

            function l() {
                p(), t()
            }

            function p() {
                if (o.iframe) try {
                    o.form.removeChild(o.iframe)
                } catch (e) {
                    o.onError("jsonp polling iframe removal error", e)
                }
                try {
                    var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                    i = document.createElement(e)
                } catch (e) {
                    (i = document.createElement("iframe")).name = o.iframeId, i.src = "javascript:0"
                }
                i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
            }
            this.form.action = this.uri(), p(), e = e.replace(n, "\\\n"), this.area.value = e.replace(r, "\\n");
            try {
                this.form.submit()
            } catch (e) {}
            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                "complete" === o.iframe.readyState && l()
            } : this.iframe.onload = l
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$pollingXhr_23 = {};
    (function(e) {
        var t = _$browser_28("engine.io-client:polling-xhr");

        function r() {}

        function n(t) {
            if (_$Polling_24.call(this, t), this.requestTimeout = t.requestTimeout, this.extraHeaders = t.extraHeaders, e.location) {
                var r = "https:" === location.protocol,
                    n = location.port;
                n || (n = r ? 443 : 80), this.xd = t.hostname !== e.location.hostname || n !== t.port, this.xs = t.secure !== r
            }
        }

        function o(e) {
            this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
        }

        function i() {
            for (var e in o.requests) o.requests.hasOwnProperty(e) && o.requests[e].abort()
        }(_$pollingXhr_23 = n).Request = o, _$componentInherit_12(n, _$Polling_24), n.prototype.supportsBinary = !0, n.prototype.request = function(e) {
            return (e = e || {}).uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new o(e)
        }, n.prototype.doWrite = function(e, t) {
            var r = "string" != typeof e && void 0 !== e,
                n = this.request({
                    method: "POST",
                    data: e,
                    isBinary: r
                }),
                o = this;
            n.on("success", t), n.on("error", function(e) {
                o.onError("xhr post error", e)
            }), this.sendXhr = n
        }, n.prototype.doPoll = function() {
            t("xhr poll");
            var e = this.request(),
                r = this;
            e.on("data", function(e) {
                r.onData(e)
            }), e.on("error", function(e) {
                r.onError("xhr poll error", e)
            }), this.pollXhr = e
        }, _$componentEmitter_11(o.prototype), o.prototype.create = function() {
            var r = {
                agent: this.agent,
                xdomain: this.xd,
                xscheme: this.xs,
                enablesXDR: this.enablesXDR
            };
            r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized;
            var n = this.xhr = new _$xmlhttprequest_26(r),
                i = this;
            try {
                t("xhr open %s: %s", this.method, this.uri), n.open(this.method, this.uri, this.async);
                try {
                    if (this.extraHeaders)
                        for (var s in n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(s) && n.setRequestHeader(s, this.extraHeaders[s])
                } catch (e) {}
                if ("POST" === this.method) try {
                    this.isBinary ? n.setRequestHeader("Content-type", "application/octet-stream") : n.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                } catch (e) {}
                try {
                    n.setRequestHeader("Accept", "*/*")
                } catch (e) {}
                "withCredentials" in n && (n.withCredentials = !0), this.requestTimeout && (n.timeout = this.requestTimeout), this.hasXDR() ? (n.onload = function() {
                    i.onLoad()
                }, n.onerror = function() {
                    i.onError(n.responseText)
                }) : n.onreadystatechange = function() {
                    if (2 === n.readyState) try {
                        var e = n.getResponseHeader("Content-Type");
                        i.supportsBinary && "application/octet-stream" === e && (n.responseType = "arraybuffer")
                    } catch (e) {}
                    4 === n.readyState && (200 === n.status || 1223 === n.status ? i.onLoad() : setTimeout(function() {
                        i.onError(n.status)
                    }, 0))
                }, t("xhr data %s", this.data), n.send(this.data)
            } catch (e) {
                return void setTimeout(function() {
                    i.onError(e)
                }, 0)
            }
            e.document && (this.index = o.requestsCount++, o.requests[this.index] = this)
        }, o.prototype.onSuccess = function() {
            this.emit("success"), this.cleanup()
        }, o.prototype.onData = function(e) {
            this.emit("data", e), this.onSuccess()
        }, o.prototype.onError = function(e) {
            this.emit("error", e), this.cleanup(!0)
        }, o.prototype.cleanup = function(t) {
            if (void 0 !== this.xhr && null !== this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, t) try {
                    this.xhr.abort()
                } catch (e) {}
                e.document && delete o.requests[this.index], this.xhr = null
            }
        }, o.prototype.onLoad = function() {
            var e;
            try {
                var t;
                try {
                    t = this.xhr.getResponseHeader("Content-Type")
                } catch (e) {}
                e = "application/octet-stream" === t && this.xhr.response || this.xhr.responseText
            } catch (e) {
                this.onError(e)
            }
            null != e && this.onData(e)
        }, o.prototype.hasXDR = function() {
            return void 0 !== e.XDomainRequest && !this.xs && this.enablesXDR
        }, o.prototype.abort = function() {
            this.cleanup()
        }, o.requestsCount = 0, o.requests = {}, e.document && (e.attachEvent ? e.attachEvent("onunload", i) : e.addEventListener && e.addEventListener("beforeunload", i, !1))
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$empty_7 = {},
        _$websocket_25 = {};
    (function(e) {
        var t, r = _$browser_28("engine.io-client:websocket"),
            n = e.WebSocket || e.MozWebSocket;
        if ("undefined" == typeof window) try {
            t = _$empty_7
        } catch (e) {}
        var o = n;

        function i(e) {
            e && e.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = n && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (o = t), _$transport_20.call(this, e)
        }
        o || "undefined" != typeof window || (o = t), _$websocket_25 = i, _$componentInherit_12(i, _$transport_20), i.prototype.name = "websocket", i.prototype.supportsBinary = !0, i.prototype.doOpen = function() {
            if (this.check()) {
                var e = this.uri(),
                    t = this.protocols,
                    r = {
                        agent: this.agent,
                        perMessageDeflate: this.perMessageDeflate
                    };
                r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders), this.localAddress && (r.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket ? t ? new o(e, t) : new o(e) : new o(e, t, r)
                } catch (e) {
                    return this.emit("error", e)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
            }
        }, i.prototype.addEventListeners = function() {
            var e = this;
            this.ws.onopen = function() {
                e.onOpen()
            }, this.ws.onclose = function() {
                e.onClose()
            }, this.ws.onmessage = function(t) {
                e.onData(t.data)
            }, this.ws.onerror = function(t) {
                e.onError("websocket error", t)
            }
        }, i.prototype.write = function(t) {
            var n = this;
            this.writable = !1;
            for (var o = t.length, i = 0, s = o; i < s; i++) ! function(t) {
                _$browser_30.encodePacket(t, n.supportsBinary, function(i) {
                    if (!n.usingBrowserWebSocket) {
                        var s = {};
                        t.options && (s.compress = t.options.compress), n.perMessageDeflate && ("string" == typeof i ? e.Buffer.byteLength(i) : i.length) < n.perMessageDeflate.threshold && (s.compress = !1)
                    }
                    try {
                        n.usingBrowserWebSocket ? n.ws.send(i) : n.ws.send(i, s)
                    } catch (e) {
                        r("websocket closed before onclose event")
                    }--o || (n.emit("flush"), setTimeout(function() {
                        n.writable = !0, n.emit("drain")
                    }, 0))
                })
            }(t[i])
        }, i.prototype.onClose = function() {
            _$transport_20.prototype.onClose.call(this)
        }, i.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close()
        }, i.prototype.uri = function() {
            var e = this.query || {},
                t = this.secure ? "wss" : "ws",
                r = "";
            return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (r = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = _$yeast_87()), this.supportsBinary || (e.b64 = 1), (e = _$parseqs_46.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
        }, i.prototype.check = function() {
            return !(!o || "__initialize" in o && this.name === i.prototype.name)
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$transports_21 = {};
    (function(e) {
        _$transports_21.polling = function(t) {
            var r = !1,
                n = !1,
                o = !1 !== t.jsonp;
            if (e.location) {
                var i = "https:" === location.protocol,
                    s = location.port;
                s || (s = i ? 443 : 80), r = t.hostname !== location.hostname || s !== t.port, n = t.secure !== i
            }
            if (t.xdomain = r, t.xscheme = n, "open" in new _$xmlhttprequest_26(t) && !t.forceJSONP) return new _$pollingXhr_23(t);
            if (!o) throw new Error("JSONP disabled");
            return new _$JSONPPolling_22(t)
        }, _$transports_21.websocket = _$websocket_25
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var indexOf = [].indexOf,
        _$indexof_41 = function(e, t) {
            if (indexOf) return e.indexOf(t);
            for (var r = 0; r < e.length; ++r)
                if (e[r] === t) return r;
            return -1
        },
        re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        _$parseuri_47 = function(e) {
            var t = e,
                r = e.indexOf("["),
                n = e.indexOf("]"); - 1 != r && -1 != n && (e = e.substring(0, r) + e.substring(r, n).replace(/:/g, ";") + e.substring(n, e.length));
            for (var o = re.exec(e || ""), i = {}, s = 14; s--;) i[parts[s]] = o[s] || "";
            return -1 != r && -1 != n && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i
        },
        _$socket_19 = {};
    (function(e) {
        var t = _$browser_28("engine.io-client:socket");

        function r(t, n) {
            if (!(this instanceof r)) return new r(t, n);
            n = n || {}, t && "object" == typeof t && (n = t, t = null), t ? (t = _$parseuri_47(t), n.hostname = t.host, n.secure = "https" === t.protocol || "wss" === t.protocol, n.port = t.port, t.query && (n.query = t.query)) : n.host && (n.hostname = _$parseuri_47(n.host).host), this.secure = null != n.secure ? n.secure : e.location && "https:" === location.protocol, n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.agent = n.agent || !1, this.hostname = n.hostname || (e.location ? location.hostname : "localhost"), this.port = n.port || (e.location && location.port ? location.port : this.secure ? 443 : 80), this.query = n.query || {}, "string" == typeof this.query && (this.query = _$parseqs_46.decode(this.query)), this.upgrade = !1 !== n.upgrade, this.path = (n.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!n.forceJSONP, this.jsonp = !1 !== n.jsonp, this.forceBase64 = !!n.forceBase64, this.enablesXDR = !!n.enablesXDR, this.timestampParam = n.timestampParam || "t", this.timestampRequests = n.timestampRequests, this.transports = n.transports || ["polling", "websocket"], this.transportOptions = n.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = n.policyPort || 843, this.rememberUpgrade = n.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = n.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== n.perMessageDeflate && (n.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = n.pfx || null, this.key = n.key || null, this.passphrase = n.passphrase || null, this.cert = n.cert || null, this.ca = n.ca || null, this.ciphers = n.ciphers || null, this.rejectUnauthorized = void 0 === n.rejectUnauthorized || n.rejectUnauthorized, this.forceNode = !!n.forceNode;
            var o = "object" == typeof e && e;
            o.global === o && (n.extraHeaders && Object.keys(n.extraHeaders).length > 0 && (this.extraHeaders = n.extraHeaders), n.localAddress && (this.localAddress = n.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
        }
        _$socket_19 = r, r.priorWebsocketSuccess = !1, _$componentEmitter_11(r.prototype), r.protocol = _$browser_30.protocol, r.Socket = r, r.Transport = _$transport_20, r.transports = _$transports_21, r.parser = _$browser_30, r.prototype.createTransport = function(e) {
            t('creating transport "%s"', e);
            var r = function(e) {
                var t = {};
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                return t
            }(this.query);
            r.EIO = _$browser_30.protocol, r.transport = e;
            var n = this.transportOptions[e] || {};
            return this.id && (r.sid = this.id), new _$transports_21[e]({
                query: r,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                timestampRequests: n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0
            })
        }, r.prototype.open = function() {
            var e;
            if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
            else {
                if (0 === this.transports.length) {
                    var t = this;
                    return void setTimeout(function() {
                        t.emit("error", "No transports available")
                    }, 0)
                }
                e = this.transports[0]
            }
            this.readyState = "opening";
            try {
                e = this.createTransport(e)
            } catch (e) {
                return this.transports.shift(), void this.open()
            }
            e.open(), this.setTransport(e)
        }, r.prototype.setTransport = function(e) {
            t("setting transport %s", e.name);
            var r = this;
            this.transport && (t("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function() {
                r.onDrain()
            }).on("packet", function(e) {
                r.onPacket(e)
            }).on("error", function(e) {
                r.onError(e)
            }).on("close", function() {
                r.onClose("transport close")
            })
        }, r.prototype.probe = function(e) {
            t('probing transport "%s"', e);
            var n = this.createTransport(e, {
                    probe: 1
                }),
                o = !1,
                i = this;

            function s() {
                if (i.onlyBinaryUpgrades) {
                    var s = !this.supportsBinary && i.transport.supportsBinary;
                    o = o || s
                }
                o || (t('probe transport "%s" opened', e), n.send([{
                    type: "ping",
                    data: "probe"
                }]), n.once("packet", function(s) {
                    if (!o)
                        if ("pong" === s.type && "probe" === s.data) {
                            if (t('probe transport "%s" pong', e), i.upgrading = !0, i.emit("upgrading", n), !n) return;
                            r.priorWebsocketSuccess = "websocket" === n.name, t('pausing current transport "%s"', i.transport.name), i.transport.pause(function() {
                                o || "closed" !== i.readyState && (t("changing transport and sending upgrade packet"), d(), i.setTransport(n), n.send([{
                                    type: "upgrade"
                                }]), i.emit("upgrade", n), n = null, i.upgrading = !1, i.flush())
                            })
                        } else {
                            t('probe transport "%s" failed', e);
                            var a = new Error("probe error");
                            a.transport = n.name, i.emit("upgradeError", a)
                        }
                }))
            }

            function a() {
                o || (o = !0, d(), n.close(), n = null)
            }

            function u(r) {
                var o = new Error("probe error: " + r);
                o.transport = n.name, a(), t('probe transport "%s" failed because of error: %s', e, r), i.emit("upgradeError", o)
            }

            function l() {
                u("transport closed")
            }

            function p() {
                u("socket closed")
            }

            function c(e) {
                n && e.name !== n.name && (t('"%s" works - aborting "%s"', e.name, n.name), a())
            }

            function d() {
                n.removeListener("open", s), n.removeListener("error", u), n.removeListener("close", l), i.removeListener("close", p), i.removeListener("upgrading", c)
            }
            r.priorWebsocketSuccess = !1, n.once("open", s), n.once("error", u), n.once("close", l), this.once("close", p), this.once("upgrading", c), n.open()
        }, r.prototype.onOpen = function() {
            if (t("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                t("starting upgrade probes");
                for (var e = 0, n = this.upgrades.length; e < n; e++) this.probe(this.upgrades[e])
            }
        }, r.prototype.onPacket = function(e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (t('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                case "open":
                    this.onHandshake(JSON.parse(e.data));
                    break;
                case "pong":
                    this.setPing(), this.emit("pong");
                    break;
                case "error":
                    var r = new Error("server error");
                    r.code = e.data, this.onError(r);
                    break;
                case "message":
                    this.emit("data", e.data), this.emit("message", e.data)
            } else t('packet received with socket readyState "%s"', this.readyState)
        }, r.prototype.onHandshake = function(e) {
            this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
        }, r.prototype.onHeartbeat = function(e) {
            clearTimeout(this.pingTimeoutTimer);
            var t = this;
            t.pingTimeoutTimer = setTimeout(function() {
                "closed" !== t.readyState && t.onClose("ping timeout")
            }, e || t.pingInterval + t.pingTimeout)
        }, r.prototype.setPing = function() {
            var e = this;
            clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function() {
                t("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
            }, e.pingInterval)
        }, r.prototype.ping = function() {
            var e = this;
            this.sendPacket("ping", function() {
                e.emit("ping")
            })
        }, r.prototype.onDrain = function() {
            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
        }, r.prototype.flush = function() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (t("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
        }, r.prototype.write = r.prototype.send = function(e, t, r) {
            return this.sendPacket("message", e, t, r), this
        }, r.prototype.sendPacket = function(e, t, r, n) {
            if ("function" == typeof t && (n = t, t = void 0), "function" == typeof r && (n = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                (r = r || {}).compress = !1 !== r.compress;
                var o = {
                    type: e,
                    data: t,
                    options: r
                };
                this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush()
            }
        }, r.prototype.close = function() {
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var e = this;
                this.writeBuffer.length ? this.once("drain", function() {
                    this.upgrading ? o() : r()
                }) : this.upgrading ? o() : r()
            }

            function r() {
                e.onClose("forced close"), t("socket closing - telling transport to close"), e.transport.close()
            }

            function n() {
                e.removeListener("upgrade", n), e.removeListener("upgradeError", n), r()
            }

            function o() {
                e.once("upgrade", n), e.once("upgradeError", n)
            }
            return this
        }, r.prototype.onError = function(e) {
            t("socket error %j", e), r.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
        }, r.prototype.onClose = function(e, r) {
            "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (t('socket close with reason: "%s"', e), clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, r), this.writeBuffer = [], this.prevBufferLen = 0)
        }, r.prototype.filterUpgrades = function(e) {
            for (var t = [], r = 0, n = e.length; r < n; r++) ~_$indexof_41(this.transports, e[r]) && t.push(e[r]);
            return t
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$lib_18 = {};
    _$lib_18 = _$socket_19, _$lib_18.parser = _$browser_30;
    var _$on_59 = function(e, t, r) {
            return e.on(t, r), {
                destroy: function() {
                    e.removeListener(t, r)
                }
            }
        },
        __s_62 = 1e3,
        __m_62 = 60 * __s_62,
        __h_62 = 60 * __m_62,
        __d_62 = 24 * __h_62,
        __y_62 = 365.25 * __d_62;

    function __plural_62(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var _$ms_62 = function(e, t) {
            t = t || {};
            var r, n = typeof e;
            if ("string" === n && e.length > 0) return function(e) {
                if (!((e = String(e)).length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return r * __y_62;
                            case "days":
                            case "day":
                            case "d":
                                return r * __d_62;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return r * __h_62;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return r * __m_62;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return r * __s_62;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? __plural_62(r = e, __d_62, "day") || __plural_62(r, __h_62, "hour") || __plural_62(r, __m_62, "minute") || __plural_62(r, __s_62, "second") || r + " ms" : function(e) {
                return e >= __d_62 ? Math.round(e / __d_62) + "d" : e >= __h_62 ? Math.round(e / __h_62) + "h" : e >= __m_62 ? Math.round(e / __m_62) + "m" : e >= __s_62 ? Math.round(e / __s_62) + "s" : e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        },
        _$debug_64 = {};

    function __createDebug_64(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    o = n - (t || n);
                e.diff = o, e.prev = t, e.curr = n, t = n;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = _$debug_64.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = _$debug_64.formatters[r];
                    if ("function" == typeof n) {
                        var o = i[a];
                        t = n.call(e, o), i.splice(a, 1), a--
                    }
                    return t
                }), _$debug_64.formatArgs.call(e, i), (r.log || _$debug_64.log || console.log.bind(console)).apply(e, i)
            }
        }
        return r.namespace = e, r.enabled = _$debug_64.enabled(e), r.useColors = _$debug_64.useColors(), r.color = function(e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return _$debug_64.colors[Math.abs(r) % _$debug_64.colors.length]
        }(e), r.destroy = __destroy_64, "function" == typeof _$debug_64.init && _$debug_64.init(r), _$debug_64.instances.push(r), r
    }

    function __destroy_64() {
        var e = _$debug_64.instances.indexOf(this);
        return -1 !== e && (_$debug_64.instances.splice(e, 1), !0)
    }
    _$debug_64 = _$debug_64 = __createDebug_64.debug = __createDebug_64.default = __createDebug_64, _$debug_64.coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, _$debug_64.disable = function() {
        _$debug_64.enable("")
    }, _$debug_64.enable = function(e) {
        var t;
        _$debug_64.save(e), _$debug_64.names = [], _$debug_64.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? _$debug_64.skips.push(new RegExp("^" + e.substr(1) + "$")) : _$debug_64.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < _$debug_64.instances.length; t++) {
            var o = _$debug_64.instances[t];
            o.enabled = _$debug_64.enabled(o.namespace)
        }
    }, _$debug_64.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = _$debug_64.skips.length; t < r; t++)
            if (_$debug_64.skips[t].test(e)) return !1;
        for (t = 0, r = _$debug_64.names.length; t < r; t++)
            if (_$debug_64.names[t].test(e)) return !0;
        return !1
    }, _$debug_64.humanize = _$ms_62, _$debug_64.instances = [], _$debug_64.names = [], _$debug_64.skips = [], _$debug_64.formatters = {};
    var _$browser_63 = {};
    (function(e) {
        function t() {
            var t;
            try {
                t = _$browser_63.storage.debug
            } catch (e) {}
            return !t && void 0 !== e && "env" in e && (t = e.env.DEBUG), t
        }(_$browser_63 = _$browser_63 = _$debug_64).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, _$browser_63.formatArgs = function(e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + _$browser_63.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (n++, "%c" === e && (o = n))
                }), e.splice(o, 0, r)
            }
        }, _$browser_63.save = function(e) {
            try {
                null == e ? _$browser_63.storage.removeItem("debug") : _$browser_63.storage.debug = e
            } catch (e) {}
        }, _$browser_63.load = t, _$browser_63.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, _$browser_63.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), _$browser_63.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], _$browser_63.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message
            }
        }, _$browser_63.enable(t())
    }).call(this, _$browser_51);
    var _$isBuffer_67 = {};
    (function(e) {
        _$isBuffer_67 = function(o) {
            return t && e.Buffer.isBuffer(o) || r && (o instanceof e.ArrayBuffer || n(o))
        };
        var t = "function" == typeof e.Buffer && "function" == typeof e.Buffer.isBuffer,
            r = "function" == typeof e.ArrayBuffer,
            n = r && "function" == typeof e.ArrayBuffer.isView ? e.ArrayBuffer.isView : function(t) {
                return t.buffer instanceof e.ArrayBuffer
            }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$binary_65 = {};
    (function(e) {
        var t = Object.prototype.toString,
            r = "function" == typeof e.Blob || "[object BlobConstructor]" === t.call(e.Blob),
            n = "function" == typeof e.File || "[object FileConstructor]" === t.call(e.File);
        _$binary_65.deconstructPacket = function(e) {
            var t = [],
                r = e.data,
                n = e;
            return n.data = function e(t, r) {
                if (!t) return t;
                if (_$isBuffer_67(t)) {
                    var n = {
                        _placeholder: !0,
                        num: r.length
                    };
                    return r.push(t), n
                }
                if (_$isarray_42(t)) {
                    for (var o = new Array(t.length), i = 0; i < t.length; i++) o[i] = e(t[i], r);
                    return o
                }
                if ("object" == typeof t && !(t instanceof Date)) {
                    o = {};
                    for (var s in t) o[s] = e(t[s], r);
                    return o
                }
                return t
            }(r, t), n.attachments = t.length, {
                packet: n,
                buffers: t
            }
        }, _$binary_65.reconstructPacket = function(e, t) {
            return e.data = function e(t, r) {
                if (!t) return t;
                if (t && t._placeholder) return r[t.num];
                if (_$isarray_42(t))
                    for (var n = 0; n < t.length; n++) t[n] = e(t[n], r);
                else if ("object" == typeof t)
                    for (var o in t) t[o] = e(t[o], r);
                return t
            }(e.data, t), e.attachments = void 0, e
        }, _$binary_65.removeBlobs = function(e, t) {
            var o = 0,
                i = e;
            ! function e(s, a, u) {
                if (!s) return s;
                if (r && s instanceof Blob || n && s instanceof File) {
                    o++;
                    var l = new FileReader;
                    l.onload = function() {
                        u ? u[a] = this.result : i = this.result, --o || t(i)
                    }, l.readAsArrayBuffer(s)
                } else if (_$isarray_42(s))
                    for (var p = 0; p < s.length; p++) e(s[p], p, s);
                else if ("object" == typeof s && !_$isBuffer_67(s))
                    for (var c in s) e(s[c], c, s)
            }(i), o || t(i)
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var __s_68 = 1e3,
        __m_68 = 60 * __s_68,
        __h_68 = 60 * __m_68,
        __d_68 = 24 * __h_68,
        __y_68 = 365.25 * __d_68;

    function __plural_68(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var _$ms_68 = function(e, t) {
            t = t || {};
            var r, n = typeof e;
            if ("string" === n && e.length > 0) return function(e) {
                if (!((e = String(e)).length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return r * __y_68;
                            case "days":
                            case "day":
                            case "d":
                                return r * __d_68;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return r * __h_68;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return r * __m_68;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return r * __s_68;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? __plural_68(r = e, __d_68, "day") || __plural_68(r, __h_68, "hour") || __plural_68(r, __m_68, "minute") || __plural_68(r, __s_68, "second") || r + " ms" : function(e) {
                return e >= __d_68 ? Math.round(e / __d_68) + "d" : e >= __h_68 ? Math.round(e / __h_68) + "h" : e >= __m_68 ? Math.round(e / __m_68) + "m" : e >= __s_68 ? Math.round(e / __s_68) + "s" : e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        },
        _$debug_70 = {};

    function __createDebug_70(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    o = n - (t || n);
                e.diff = o, e.prev = t, e.curr = n, t = n;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = _$debug_70.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = _$debug_70.formatters[r];
                    if ("function" == typeof n) {
                        var o = i[a];
                        t = n.call(e, o), i.splice(a, 1), a--
                    }
                    return t
                }), _$debug_70.formatArgs.call(e, i), (r.log || _$debug_70.log || console.log.bind(console)).apply(e, i)
            }
        }
        return r.namespace = e, r.enabled = _$debug_70.enabled(e), r.useColors = _$debug_70.useColors(), r.color = function(e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return _$debug_70.colors[Math.abs(r) % _$debug_70.colors.length]
        }(e), r.destroy = __destroy_70, "function" == typeof _$debug_70.init && _$debug_70.init(r), _$debug_70.instances.push(r), r
    }

    function __destroy_70() {
        var e = _$debug_70.instances.indexOf(this);
        return -1 !== e && (_$debug_70.instances.splice(e, 1), !0)
    }
    _$debug_70 = _$debug_70 = __createDebug_70.debug = __createDebug_70.default = __createDebug_70, _$debug_70.coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, _$debug_70.disable = function() {
        _$debug_70.enable("")
    }, _$debug_70.enable = function(e) {
        var t;
        _$debug_70.save(e), _$debug_70.names = [], _$debug_70.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? _$debug_70.skips.push(new RegExp("^" + e.substr(1) + "$")) : _$debug_70.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < _$debug_70.instances.length; t++) {
            var o = _$debug_70.instances[t];
            o.enabled = _$debug_70.enabled(o.namespace)
        }
    }, _$debug_70.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = _$debug_70.skips.length; t < r; t++)
            if (_$debug_70.skips[t].test(e)) return !1;
        for (t = 0, r = _$debug_70.names.length; t < r; t++)
            if (_$debug_70.names[t].test(e)) return !0;
        return !1
    }, _$debug_70.humanize = _$ms_68, _$debug_70.instances = [], _$debug_70.names = [], _$debug_70.skips = [], _$debug_70.formatters = {};
    var _$browser_69 = {};
    (function(e) {
        function t() {
            var t;
            try {
                t = _$browser_69.storage.debug
            } catch (e) {}
            return !t && void 0 !== e && "env" in e && (t = e.env.DEBUG), t
        }(_$browser_69 = _$browser_69 = _$debug_70).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, _$browser_69.formatArgs = function(e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + _$browser_69.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (n++, "%c" === e && (o = n))
                }), e.splice(o, 0, r)
            }
        }, _$browser_69.save = function(e) {
            try {
                null == e ? _$browser_69.storage.removeItem("debug") : _$browser_69.storage.debug = e
            } catch (e) {}
        }, _$browser_69.load = t, _$browser_69.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, _$browser_69.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), _$browser_69.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], _$browser_69.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message
            }
        }, _$browser_69.enable(t())
    }).call(this, _$browser_51);
    var _$socketIoParser_66 = {},
        __debug_66 = _$browser_69("socket.io-parser"),
        __dummy_66$0 = 0,
        __dummy_66$1 = 0,
        __dummy_66$2 = 0,
        __dummy_66$3 = 0;

    function Encoder() {}
    _$socketIoParser_66.protocol = 4, _$socketIoParser_66.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], _$socketIoParser_66.CONNECT = 0, _$socketIoParser_66.DISCONNECT = 1, _$socketIoParser_66.EVENT = 2, _$socketIoParser_66.ACK = 3, _$socketIoParser_66.ERROR = 4, _$socketIoParser_66.BINARY_EVENT = 5, _$socketIoParser_66.BINARY_ACK = 6, _$socketIoParser_66.Encoder = Encoder, _$socketIoParser_66.Decoder = Decoder;
    var ERROR_PACKET = _$socketIoParser_66.ERROR + '"encode error"';

    function encodeAsString(e) {
        var t = "" + e.type;
        if (_$socketIoParser_66.BINARY_EVENT !== e.type && _$socketIoParser_66.BINARY_ACK !== e.type || (t += e.attachments + "-"), e.nsp && "/" !== e.nsp && (t += e.nsp + ","), null != e.id && (t += e.id), null != e.data) {
            var r = function(e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return !1
                }
            }(e.data);
            if (!1 === r) return ERROR_PACKET;
            t += r
        }
        return __debug_66("encoded %j as %s", e, t), t
    }

    function Decoder() {
        this.reconstructor = null
    }

    function BinaryReconstructor(e) {
        this.reconPack = e, this.buffers = []
    }

    function error(e) {
        return {
            type: _$socketIoParser_66.ERROR,
            data: "parser error: " + e
        }
    }
    Encoder.prototype.encode = function(e, t) {
        __debug_66("encoding packet %j", e), _$socketIoParser_66.BINARY_EVENT === e.type || _$socketIoParser_66.BINARY_ACK === e.type ? function(e, t) {
            _$binary_65.removeBlobs(e, function(e) {
                var r = _$binary_65.deconstructPacket(e),
                    n = encodeAsString(r.packet),
                    o = r.buffers;
                o.unshift(n), t(o)
            })
        }(e, t) : t([encodeAsString(e)])
    }, _$componentEmitter_11(Decoder.prototype), Decoder.prototype.add = function(e) {
        var t;
        if ("string" == typeof e) t = function(e) {
            var t = 0,
                r = {
                    type: Number(e.charAt(0))
                };
            if (null == _$socketIoParser_66.types[r.type]) return error("unknown packet type " + r.type);
            if (_$socketIoParser_66.BINARY_EVENT === r.type || _$socketIoParser_66.BINARY_ACK === r.type) {
                for (var n = "";
                    "-" !== e.charAt(++t) && (n += e.charAt(t), t != e.length););
                if (n != Number(n) || "-" !== e.charAt(t)) throw new Error("Illegal attachments");
                r.attachments = Number(n)
            }
            if ("/" === e.charAt(t + 1))
                for (r.nsp = ""; ++t;) {
                    if ("," === (i = e.charAt(t))) break;
                    if (r.nsp += i, t === e.length) break
                } else r.nsp = "/";
            var o = e.charAt(t + 1);
            if ("" !== o && Number(o) == o) {
                for (r.id = ""; ++t;) {
                    var i;
                    if (null == (i = e.charAt(t)) || Number(i) != i) {
                        --t;
                        break
                    }
                    if (r.id += e.charAt(t), t === e.length) break
                }
                r.id = Number(r.id)
            }
            if (e.charAt(++t)) {
                var s = function(e) {
                    try {
                        return JSON.parse(e)
                    } catch (e) {
                        return !1
                    }
                }(e.substr(t));
                if (!(!1 !== s && (r.type === _$socketIoParser_66.ERROR || _$isarray_42(s)))) return error("invalid payload");
                r.data = s
            }
            return __debug_66("decoded %s as %j", e, r), r
        }(e), _$socketIoParser_66.BINARY_EVENT === t.type || _$socketIoParser_66.BINARY_ACK === t.type ? (this.reconstructor = new BinaryReconstructor(t), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", t)) : this.emit("decoded", t);
        else {
            if (!_$isBuffer_67(e) && !e.base64) throw new Error("Unknown type: " + e);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (t = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null, this.emit("decoded", t))
        }
    }, Decoder.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction()
    }, BinaryReconstructor.prototype.takeBinaryData = function(e) {
        if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
            var t = _$binary_65.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t
        }
        return null
    }, BinaryReconstructor.prototype.finishedReconstruction = function() {
        this.reconPack = null, this.buffers = []
    };
    var _$toArray_71 = function(e, t) {
            for (var r = [], n = (t = t || 0) || 0; n < e.length; n++) r[n - t] = e[n];
            return r
        },
        _$socket_60 = {},
        __dummy_60$0 = 0,
        __dummy_60$1 = 0,
        __dummy_60$2 = 0,
        __dummy_60$3 = 0,
        __dummy_60$4 = 0,
        __debug_60 = _$browser_63("socket.io-client:socket"),
        __dummy_60$5 = 0,
        __dummy_60$6 = 0;
    _$socket_60 = _$socket_60 = __Socket_60;
    var events = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        },
        emit = _$componentEmitter_11.prototype.emit;

    function __Socket_60(e, t, r) {
        this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, r && r.query && (this.query = r.query), this.io.autoConnect && this.open()
    }
    _$componentEmitter_11(__Socket_60.prototype), __Socket_60.prototype.subEvents = function() {
        if (!this.subs) {
            var e = this.io;
            this.subs = [_$on_59(e, "open", _$componentBind_10(this, "onopen")), _$on_59(e, "packet", _$componentBind_10(this, "onpacket")), _$on_59(e, "close", _$componentBind_10(this, "onclose"))]
        }
    }, __Socket_60.prototype.open = __Socket_60.prototype.connect = function() {
        return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
    }, __Socket_60.prototype.send = function() {
        var e = _$toArray_71(arguments);
        return e.unshift("message"), this.emit.apply(this, e), this
    }, __Socket_60.prototype.emit = function(e) {
        if (events.hasOwnProperty(e)) return emit.apply(this, arguments), this;
        var t = _$toArray_71(arguments),
            r = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : _$hasBinary_38(t)) ? _$socketIoParser_66.BINARY_EVENT : _$socketIoParser_66.EVENT,
                data: t,
                options: {}
            };
        return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (__debug_60("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), this.flags = {}, this
    }, __Socket_60.prototype.packet = function(e) {
        e.nsp = this.nsp, this.io.packet(e)
    }, __Socket_60.prototype.onopen = function() {
        if (__debug_60("transport is open - connecting"), "/" !== this.nsp)
            if (this.query) {
                var e = "object" == typeof this.query ? _$parseqs_46.encode(this.query) : this.query;
                __debug_60("sending connect packet with query %s", e), this.packet({
                    type: _$socketIoParser_66.CONNECT,
                    query: e
                })
            } else this.packet({
                type: _$socketIoParser_66.CONNECT
            })
    }, __Socket_60.prototype.onclose = function(e) {
        __debug_60("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
    }, __Socket_60.prototype.onpacket = function(e) {
        var t = e.nsp === this.nsp,
            r = e.type === _$socketIoParser_66.ERROR && "/" === e.nsp;
        if (t || r) switch (e.type) {
            case _$socketIoParser_66.CONNECT:
                this.onconnect();
                break;
            case _$socketIoParser_66.EVENT:
            case _$socketIoParser_66.BINARY_EVENT:
                this.onevent(e);
                break;
            case _$socketIoParser_66.ACK:
            case _$socketIoParser_66.BINARY_ACK:
                this.onack(e);
                break;
            case _$socketIoParser_66.DISCONNECT:
                this.ondisconnect();
                break;
            case _$socketIoParser_66.ERROR:
                this.emit("error", e.data)
        }
    }, __Socket_60.prototype.onevent = function(e) {
        var t = e.data || [];
        __debug_60("emitting event %j", t), null != e.id && (__debug_60("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? emit.apply(this, t) : this.receiveBuffer.push(t)
    }, __Socket_60.prototype.ack = function(e) {
        var t = this,
            r = !1;
        return function() {
            if (!r) {
                r = !0;
                var n = _$toArray_71(arguments);
                __debug_60("sending ack %j", n), t.packet({
                    type: _$hasBinary_38(n) ? _$socketIoParser_66.BINARY_ACK : _$socketIoParser_66.ACK,
                    id: e,
                    data: n
                })
            }
        }
    }, __Socket_60.prototype.onack = function(e) {
        var t = this.acks[e.id];
        "function" == typeof t ? (__debug_60("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : __debug_60("bad ack %s", e.id)
    }, __Socket_60.prototype.onconnect = function() {
        this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
    }, __Socket_60.prototype.emitBuffered = function() {
        var e;
        for (e = 0; e < this.receiveBuffer.length; e++) emit.apply(this, this.receiveBuffer[e]);
        for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
        this.sendBuffer = []
    }, __Socket_60.prototype.ondisconnect = function() {
        __debug_60("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
    }, __Socket_60.prototype.destroy = function() {
        if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null
        }
        this.io.destroy(this)
    }, __Socket_60.prototype.close = __Socket_60.prototype.disconnect = function() {
        return this.connected && (__debug_60("performing disconnect (%s)", this.nsp), this.packet({
            type: _$socketIoParser_66.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }, __Socket_60.prototype.compress = function(e) {
        return this.flags.compress = e, this
    }, __Socket_60.prototype.binary = function(e) {
        return this.flags.binary = e, this
    };
    var _$manager_58 = {},
        __dummy_58$0 = 0,
        __dummy_58$1 = 0,
        __dummy_58$2 = 0,
        __dummy_58$3 = 0,
        __dummy_58$4 = 0,
        __dummy_58$5 = 0,
        __debug_58 = _$browser_63("socket.io-client:manager"),
        __dummy_58$6 = 0,
        __dummy_58$7 = 0,
        has = Object.prototype.hasOwnProperty;

    function Manager(e, t) {
        if (!(this instanceof Manager)) return new Manager(e, t);
        e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new _$backo2_3({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var r = t.parser || _$socketIoParser_66;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open()
    }
    _$manager_58 = Manager, Manager.prototype.emitAll = function() {
        for (var e in this.emit.apply(this, arguments), this.nsps) has.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
    }, Manager.prototype.updateSocketIds = function() {
        for (var e in this.nsps) has.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e))
    }, Manager.prototype.generateId = function(e) {
        return ("/" === e ? "" : e + "#") + this.engine.id
    }, _$componentEmitter_11(Manager.prototype), Manager.prototype.reconnection = function(e) {
        return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
    }, Manager.prototype.reconnectionAttempts = function(e) {
        return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
    }, Manager.prototype.reconnectionDelay = function(e) {
        return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
    }, Manager.prototype.randomizationFactor = function(e) {
        return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
    }, Manager.prototype.reconnectionDelayMax = function(e) {
        return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
    }, Manager.prototype.timeout = function(e) {
        return arguments.length ? (this._timeout = e, this) : this._timeout
    }, Manager.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }, Manager.prototype.open = Manager.prototype.connect = function(e, t) {
        if (__debug_58("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        __debug_58("opening %s", this.uri), this.engine = _$lib_18(this.uri, this.opts);
        var r = this.engine,
            n = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var o = _$on_59(r, "open", function() {
                n.onopen(), e && e()
            }),
            i = _$on_59(r, "error", function(t) {
                if (__debug_58("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", t), e) {
                    var r = new Error("Connection error");
                    r.data = t, e(r)
                } else n.maybeReconnectOnOpen()
            });
        if (!1 !== this._timeout) {
            var s = this._timeout;
            __debug_58("connect attempt will timeout after %d", s);
            var a = setTimeout(function() {
                __debug_58("connect attempt timed out after %d", s), o.destroy(), r.close(), r.emit("error", "timeout"), n.emitAll("connect_timeout", s)
            }, s);
            this.subs.push({
                destroy: function() {
                    clearTimeout(a)
                }
            })
        }
        return this.subs.push(o), this.subs.push(i), this
    }, Manager.prototype.onopen = function() {
        __debug_58("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var e = this.engine;
        this.subs.push(_$on_59(e, "data", _$componentBind_10(this, "ondata"))), this.subs.push(_$on_59(e, "ping", _$componentBind_10(this, "onping"))), this.subs.push(_$on_59(e, "pong", _$componentBind_10(this, "onpong"))), this.subs.push(_$on_59(e, "error", _$componentBind_10(this, "onerror"))), this.subs.push(_$on_59(e, "close", _$componentBind_10(this, "onclose"))), this.subs.push(_$on_59(this.decoder, "decoded", _$componentBind_10(this, "ondecoded")))
    }, Manager.prototype.onping = function() {
        this.lastPing = new Date, this.emitAll("ping")
    }, Manager.prototype.onpong = function() {
        this.emitAll("pong", new Date - this.lastPing)
    }, Manager.prototype.ondata = function(e) {
        this.decoder.add(e)
    }, Manager.prototype.ondecoded = function(e) {
        this.emit("packet", e)
    }, Manager.prototype.onerror = function(e) {
        __debug_58("error", e), this.emitAll("error", e)
    }, Manager.prototype.socket = function(e, t) {
        var r = this.nsps[e];
        if (!r) {
            r = new _$socket_60(this, e, t), this.nsps[e] = r;
            var n = this;
            r.on("connecting", o), r.on("connect", function() {
                r.id = n.generateId(e)
            }), this.autoConnect && o()
        }

        function o() {
            ~_$indexof_41(n.connecting, r) || n.connecting.push(r)
        }
        return r
    }, Manager.prototype.destroy = function(e) {
        var t = _$indexof_41(this.connecting, e);
        ~t && this.connecting.splice(t, 1), this.connecting.length || this.close()
    }, Manager.prototype.packet = function(e) {
        __debug_58("writing packet %j", e);
        var t = this;
        e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function(r) {
            for (var n = 0; n < r.length; n++) t.engine.write(r[n], e.options);
            t.encoding = !1, t.processPacketQueue()
        }))
    }, Manager.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e)
        }
    }, Manager.prototype.cleanup = function() {
        __debug_58("cleanup");
        for (var e = this.subs.length, t = 0; t < e; t++) this.subs.shift().destroy();
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
    }, Manager.prototype.close = Manager.prototype.disconnect = function() {
        __debug_58("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
    }, Manager.prototype.onclose = function(e) {
        __debug_58("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
    }, Manager.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var e = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) __debug_58("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
        else {
            var t = this.backoff.duration();
            __debug_58("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
            var r = setTimeout(function() {
                e.skipReconnect || (__debug_58("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function(t) {
                    t ? (__debug_58("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (__debug_58("reconnect success"), e.onreconnect())
                }))
            }, t);
            this.subs.push({
                destroy: function() {
                    clearTimeout(r)
                }
            })
        }
    }, Manager.prototype.onreconnect = function() {
        var e = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
    };
    var _$url_61 = {};
    (function(e) {
        var t = _$browser_63("socket.io-client:url");
        _$url_61 = function(r, n) {
            var o = r;
            n = n || e.location, null == r && (r = n.protocol + "//" + n.host), "string" == typeof r && ("/" === r.charAt(0) && (r = "/" === r.charAt(1) ? n.protocol + r : n.host + r), /^(https?|wss?):\/\//.test(r) || (t("protocol-less url %s", r), r = void 0 !== n ? n.protocol + "//" + r : "https://" + r), t("parse %s", r), o = _$parseuri_47(r)), o.port || (/^(http|ws)$/.test(o.protocol) ? o.port = "80" : /^(http|ws)s$/.test(o.protocol) && (o.port = "443")), o.path = o.path || "/";
            var i = -1 !== o.host.indexOf(":") ? "[" + o.host + "]" : o.host;
            return o.id = o.protocol + "://" + i + ":" + o.port, o.href = o.protocol + "://" + i + (n && n.port === o.port ? "" : ":" + o.port), o
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$lib_57 = {},
        __dummy_57$0 = 0,
        __dummy_57$1 = 0,
        __dummy_57$2 = 0,
        __debug_57 = _$browser_63("socket.io-client");
    _$lib_57 = _$lib_57 = __lookup_57;
    var cache = _$lib_57.managers = {};

    function __lookup_57(e, t) {
        "object" == typeof e && (t = e, e = void 0), t = t || {};
        var r, n = _$url_61(e),
            o = n.source,
            i = n.id,
            s = n.path,
            a = cache[i] && s in cache[i].nsps;
        return t.forceNew || t["force new connection"] || !1 === t.multiplex || a ? (__debug_57("ignoring socket cache for %s", o), r = _$manager_58(o, t)) : (cache[i] || (__debug_57("new io instance for %s", o), cache[i] = _$manager_58(o, t)), r = cache[i]), n.query && !t.query && (t.query = n.query), r.socket(n.path, t)
    }
    _$lib_57.protocol = _$socketIoParser_66.protocol, _$lib_57.connect = __lookup_57, _$lib_57.Manager = _$manager_58, _$lib_57.Socket = _$socket_60;
    var _$parseUrl_149 = function(e) {
            var t = /^\w+:\/\//.exec(e),
                r = 0;
            t && (r = t[0].length + 1);
            var n = e.indexOf("/", r);
            return -1 === n ? {
                origin: e,
                pathname: "/"
            } : {
                origin: e.slice(0, n),
                pathname: e.slice(n)
            }
        },
        ___extends_144 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        io = function() {
            return socketIo || (socketIo = _$lib_57), socketIo
        },
        __dummy_144$0 = 0,
        __dummy_144$1 = 0,
        socketIo = void 0,
        statusOrder = ["ASSEMBLY_UPLOADING", "ASSEMBLY_EXECUTING", "ASSEMBLY_COMPLETED"];

    function isStatus(e, t) {
        return statusOrder.indexOf(e) >= statusOrder.indexOf(t)
    }
    var TransloaditAssembly = function(e) {
            function t(r) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this));
                return n.status = r, n.socket = null, n.pollInterval = null, n.closed = !1, n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.connect = function() {
                this._connectSocket(), this._beginPolling()
            }, t.prototype._onFinished = function() {
                this.emit("finished"), this.close()
            }, t.prototype._connectSocket = function() {
                var e = this,
                    t = _$parseUrl_149(this.status.websocket_url),
                    r = io().connect(t.origin, {
                        transports: ["websocket"],
                        path: t.pathname
                    });
                r.on("connect", function() {
                    r.emit("assembly_connect", {
                        id: e.status.assembly_id
                    }), e.emit("connect")
                }), r.on("error", function() {
                    r.disconnect(), e.socket = null
                }), r.on("assembly_finished", function() {
                    e._onFinished()
                }), r.on("assembly_upload_finished", function(t) {
                    e.emit("upload", t), e._fetchStatus({
                        diff: !1
                    })
                }), r.on("assembly_uploading_finished", function() {
                    e.emit("executing"), e._fetchStatus({
                        diff: !1
                    })
                }), r.on("assembly_upload_meta_data_extracted", function() {
                    e.emit("metadata"), e._fetchStatus({
                        diff: !1
                    })
                }), r.on("assembly_result_finished", function(t, r) {
                    e.emit("result", t, r), e._fetchStatus({
                        diff: !1
                    })
                }), r.on("assembly_error", function(t) {
                    e._onError(t), e._fetchStatus({
                        diff: !1
                    })
                }), this.socket = r
            }, t.prototype._onError = function(e) {
                this.emit("error", ___extends_144(new Error(e.message), e))
            }, t.prototype._beginPolling = function() {
                var e = this;
                this.pollInterval = setInterval(function() {
                    e.socket && e.socket.connected || e._fetchStatus()
                }, 2e3)
            }, t.prototype._fetchStatus = function() {
                var e = this,
                    t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).diff,
                    r = void 0 === t || t;
                return fetch(this.status.assembly_ssl_url).then(function(e) {
                    return e.json()
                }).then(function(t) {
                    e.closed || (e.emit("status", t), r ? e.updateStatus(t) : e.status = t)
                })
            }, t.prototype.update = function() {
                return this._fetchStatus({
                    diff: !0
                })
            }, t.prototype.updateStatus = function(e) {
                this._diffStatus(this.status, e), this.status = e
            }, t.prototype._diffStatus = function(e, t) {
                var r = this,
                    n = e.ok,
                    o = t.ok;
                if (t.error && !e.error) return this._onError(t);
                var i = isStatus(o, "ASSEMBLY_EXECUTING") && !isStatus(n, "ASSEMBLY_EXECUTING");
                i && this.emit("executing"), Object.keys(t.uploads).filter(function(t) {
                    return !e.uploads.hasOwnProperty(t)
                }).map(function(e) {
                    return t.uploads[e]
                }).forEach(function(e) {
                    r.emit("upload", e)
                }), i && this.emit("metadata"), Object.keys(t.results).forEach(function(n) {
                    var o = t.results[n],
                        i = e.results[n];
                    o.filter(function(e) {
                        return !i || !i.some(function(t) {
                            return t.id === e.id
                        })
                    }).forEach(function(e) {
                        r.emit("result", n, e)
                    })
                }), isStatus(o, "ASSEMBLY_COMPLETED") && !isStatus(n, "ASSEMBLY_COMPLETED") && this.emit("finished")
            }, t.prototype.close = function() {
                this.closed = !0, this.socket && (this.socket.disconnect(), this.socket = null), clearInterval(this.pollInterval)
            }, t
        }(_$componentEmitter_11),
        _$TransloaditAssembly_144 = TransloaditAssembly,
        _$AssemblyOptions_145 = {};

    function validateParams(e) {
        if (!e) throw new Error("Transloadit: The `params` option is required.");
        if ("string" == typeof e) try {
            e = JSON.parse(e)
        } catch (e) {
            throw e.message = "Transloadit: The `params` option is a malformed JSON string: " + e.message, e
        }
        if (!e.auth || !e.auth.key) throw new Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/account/api-settings.")
    }
    var AssemblyOptions = function() {
        function e(t, r) {
            ! function(t, r) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this), this.files = t, this.opts = r
        }
        return e.prototype._normalizeAssemblyOptions = function(e, t) {
            if (Array.isArray(t.fields)) {
                var r = t.fields;
                t.fields = {}, r.forEach(function(r) {
                    t.fields[r] = e.meta[r]
                })
            }
            return t.fields || (t.fields = {}), t
        }, e.prototype._getAssemblyOptions = function(e) {
            var t = this,
                r = this.opts;
            return Promise.resolve().then(function() {
                return r.getAssemblyOptions(e, r)
            }).then(function(r) {
                return t._normalizeAssemblyOptions(e, r)
            }).then(function(t) {
                return validateParams(t.params), {
                    fileIDs: [e.id],
                    options: t
                }
            })
        }, e.prototype._dedupe = function(e) {
            var t = Object.create(null);
            return e.forEach(function(e) {
                var r, n = e.fileIDs,
                    o = e.options,
                    i = JSON.stringify(o);
                t[i] ? (r = t[i].fileIDs).push.apply(r, n) : t[i] = {
                    options: o,
                    fileIDs: [].concat(n)
                }
            }), Object.keys(t).map(function(e) {
                return t[e]
            })
        }, e.prototype.build = function() {
            var e = this,
                t = this.opts;
            return this.files.length > 0 ? Promise.all(this.files.map(function(t) {
                return e._getAssemblyOptions(t)
            })).then(function(t) {
                return e._dedupe(t)
            }) : t.alwaysRunAssembly ? Promise.resolve(t.getAssemblyOptions(null, t)).then(function(t) {
                return validateParams(t.params), [{
                    fileIDs: e.files.map(function(e) {
                        return e.id
                    }),
                    options: t
                }]
            }) : Promise.resolve([])
        }, e
    }();
    _$AssemblyOptions_145 = AssemblyOptions, _$AssemblyOptions_145.validateParams = validateParams;
    var TransloaditAssemblyWatcher = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this));
                return o._uppy = r, o._assemblyIDs = n, o._remaining = n.length, o.promise = new Promise(function(e, t) {
                    o._resolve = e, o._reject = t
                }), o._onAssemblyComplete = o._onAssemblyComplete.bind(o), o._onAssemblyError = o._onAssemblyError.bind(o), o._onImportError = o._onImportError.bind(o), o._addListeners(), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype._watching = function(e) {
                return -1 !== this._assemblyIDs.indexOf(e)
            }, t.prototype._onAssemblyComplete = function(e) {
                this._watching(e.assembly_id) && (this._uppy.log("[Transloadit] AssemblyWatcher: Got Assembly finish " + e.assembly_id), this.emit("assembly-complete", e.assembly_id), this._checkAllComplete())
            }, t.prototype._onAssemblyError = function(e, t) {
                this._watching(e.assembly_id) && (this._uppy.log("[Transloadit] AssemblyWatcher: Got Assembly error " + e.assembly_id), this._uppy.log(t), this.emit("assembly-error", e.assembly_id, t), this._checkAllComplete())
            }, t.prototype._onImportError = function(e, t, r) {
                this._watching(e.assembly_id) && this._onAssemblyError(e, r)
            }, t.prototype._checkAllComplete = function() {
                this._remaining -= 1, 0 === this._remaining && (this._removeListeners(), this._resolve())
            }, t.prototype._removeListeners = function() {
                this._uppy.off("transloadit:complete", this._onAssemblyComplete), this._uppy.off("transloadit:assembly-error", this._onAssemblyError), this._uppy.off("transloadit:import-error", this._onImportError)
            }, t.prototype._addListeners = function() {
                this._uppy.on("transloadit:complete", this._onAssemblyComplete), this._uppy.on("transloadit:assembly-error", this._onAssemblyError), this._uppy.on("transloadit:import-error", this._onImportError)
            }, t
        }(_$componentEmitter_11),
        _$TransloaditAssemblyWatcher_146 = TransloaditAssemblyWatcher,
        _$Client_147 = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.opts = t
            }
            return e.prototype.createAssembly = function(e) {
                e.templateId;
                var t = e.params,
                    r = e.fields,
                    n = e.signature,
                    o = e.expectedFiles,
                    i = new FormData;
                return i.append("params", "string" == typeof t ? t : JSON.stringify(t)), n && i.append("signature", n), Object.keys(r).forEach(function(e) {
                    i.append(e, r[e])
                }), i.append("num_expected_upload_files", o), fetch(this.opts.service + "/assemblies", {
                    method: "post",
                    body: i
                }).then(function(e) {
                    return e.json()
                }).then(function(e) {
                    if (e.error) {
                        var t = new Error(e.error);
                        throw t.message = e.error, t.details = e.reason, t
                    }
                    return e
                })
            }, e.prototype.reserveFile = function(e, t) {
                var r = encodeURIComponent(t.size);
                return fetch(e.assembly_ssl_url + "/reserve_file?size=" + r, {
                    method: "post"
                }).then(function(e) {
                    return e.json()
                })
            }, e.prototype.addFile = function(e, t) {
                if (!t.uploadURL) return Promise.reject(new Error("File does not have an `uploadURL`."));
                var r = encodeURIComponent(t.size),
                    n = encodeURIComponent(t.uploadURL),
                    o = "size=" + r + "&filename=" + encodeURIComponent(t.name) + "&fieldname=file&s3Url=" + n;
                return fetch(e.assembly_ssl_url + "/add_file?" + o, {
                    method: "post"
                }).then(function(e) {
                    return e.json()
                })
            }, e.prototype.getAssemblyStatus = function(e) {
                return fetch(e).then(function(e) {
                    return e.json()
                })
            }, e
        }(),
        _$storage_77 = {};
    Object.defineProperty(_$storage_77, "__esModule", {
        value: !0
    }), _$storage_77.setItem = function(e, t) {
        if (hasStorage) return localStorage.setItem(e, t)
    }, _$storage_77.getItem = function(e) {
        if (hasStorage) return localStorage.getItem(e)
    }, _$storage_77.removeItem = function(e) {
        if (hasStorage) return localStorage.removeItem(e)
    };
    var hasStorage = !1;
    try {
        hasStorage = "localStorage" in window;
        var key = "tusSupport";
        localStorage.setItem(key, localStorage.getItem(key))
    } catch (e) {
        if (e.code !== e.SECURITY_ERR && e.code !== e.QUOTA_EXCEEDED_ERR) throw e;
        hasStorage = !1
    }
    _$storage_77.canStoreURLs = hasStorage;
    var hasOwn = Object.prototype.hasOwnProperty,
        toStr = Object.prototype.toString,
        __isArray_35 = function(e) {
            return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === toStr.call(e)
        },
        isPlainObject = function(e) {
            if (!e || "[object Object]" !== toStr.call(e)) return !1;
            var t, r = hasOwn.call(e, "constructor"),
                n = e.constructor && e.constructor.prototype && hasOwn.call(e.constructor.prototype, "isPrototypeOf");
            if (e.constructor && !r && !n) return !1;
            for (t in e);
            return void 0 === t || hasOwn.call(e, t)
        },
        _$extend_35 = function e() {
            var t, r, n, o, i, s, a = arguments[0],
                u = 1,
                l = arguments.length,
                p = !1;
            for ("boolean" == typeof a && (p = a, a = arguments[1] || {}, u = 2), (null == a || "object" != typeof a && "function" != typeof a) && (a = {}); u < l; ++u)
                if (null != (t = arguments[u]))
                    for (r in t) n = a[r], a !== (o = t[r]) && (p && o && (isPlainObject(o) || (i = __isArray_35(o))) ? (i ? (i = !1, s = n && __isArray_35(n) ? n : []) : s = n && isPlainObject(n) ? n : {}, a[r] = e(p, s, o)) : void 0 !== o && (a[r] = o));
            return a
        },
        _$querystringify_52 = {},
        undef, __has_52 = Object.prototype.hasOwnProperty;

    function decode(e) {
        return decodeURIComponent(e.replace(/\+/g, " "))
    }
    _$querystringify_52.stringify = function(e, t) {
        t = t || "";
        var r, n, o = [];
        for (n in "string" != typeof t && (t = "?"), e) __has_52.call(e, n) && ((r = e[n]) || null !== r && r !== undef && !isNaN(r) || (r = ""), o.push(encodeURIComponent(n) + "=" + encodeURIComponent(r)));
        return o.length ? t + o.join("&") : ""
    }, _$querystringify_52.parse = function(e) {
        for (var t, r = /([^=?&]+)=?([^&]*)/g, n = {}; t = r.exec(e);) {
            var o = decode(t[1]),
                i = decode(t[2]);
            o in n || (n[o] = i)
        }
        return n
    };
    var _$requiresPort_53 = function(e, t) {
            if (t = t.split(":")[0], !(e = +e)) return !1;
            switch (t) {
                case "http":
                case "ws":
                    return 80 !== e;
                case "https":
                case "wss":
                    return 443 !== e;
                case "ftp":
                    return 21 !== e;
                case "gopher":
                    return 70 !== e;
                case "file":
                    return !1
            }
            return 0 !== e
        },
        _$urlParse_84 = {};
    (function(e) {
        "use strict";
        var t = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
            r = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
            n = [
                ["#", "hash"],
                ["?", "query"],
                function(e) {
                    return e.replace("\\", "/")
                },
                ["/", "pathname"],
                ["@", "auth", 1],
                [NaN, "host", void 0, 1, 1],
                [/:(\d+)$/, "port", void 0, 1],
                [NaN, "hostname", void 0, 1, 1]
            ],
            o = {
                hash: 1,
                query: 1
            };

        function i(t) {
            var n, i = ("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}).location || {},
                s = {},
                u = typeof(t = t || i);
            if ("blob:" === t.protocol) s = new a(unescape(t.pathname), {});
            else if ("string" === u)
                for (n in s = new a(t, {}), o) delete s[n];
            else if ("object" === u) {
                for (n in t) n in o || (s[n] = t[n]);
                void 0 === s.slashes && (s.slashes = r.test(t.href))
            }
            return s
        }

        function s(e) {
            var r = t.exec(e);
            return {
                protocol: r[1] ? r[1].toLowerCase() : "",
                slashes: !!r[2],
                rest: r[3]
            }
        }

        function a(e, t, r) {
            if (!(this instanceof a)) return new a(e, t, r);
            var o, u, l, p, c, d, h = n.slice(),
                f = typeof t,
                _ = this,
                y = 0;
            for ("object" !== f && "string" !== f && (r = t, t = null), r && "function" != typeof r && (r = _$querystringify_52.parse), t = i(t), o = !(u = s(e || "")).protocol && !u.slashes, _.slashes = u.slashes || o && t.slashes, _.protocol = u.protocol || t.protocol || "", e = u.rest, u.slashes || (h[3] = [/(.*)/, "pathname"]); y < h.length; y++) "function" != typeof(p = h[y]) ? (l = p[0], d = p[1], l != l ? _[d] = e : "string" == typeof l ? ~(c = e.indexOf(l)) && ("number" == typeof p[2] ? (_[d] = e.slice(0, c), e = e.slice(c + p[2])) : (_[d] = e.slice(c), e = e.slice(0, c))) : (c = l.exec(e)) && (_[d] = c[1], e = e.slice(0, c.index)), _[d] = _[d] || o && p[3] && t[d] || "", p[4] && (_[d] = _[d].toLowerCase())) : e = p(e);
            r && (_.query = r(_.query)), o && t.slashes && "/" !== _.pathname.charAt(0) && ("" !== _.pathname || "" !== t.pathname) && (_.pathname = function(e, r) {
                for (var n = (t.pathname || "/").split("/").slice(0, -1).concat(e.split("/")), o = n.length, i = n[o - 1], s = !1, a = 0; o--;) "." === n[o] ? n.splice(o, 1) : ".." === n[o] ? (n.splice(o, 1), a++) : a && (0 === o && (s = !0), n.splice(o, 1), a--);
                return s && n.unshift(""), "." !== i && ".." !== i || n.push(""), n.join("/")
            }(_.pathname)), _$requiresPort_53(_.port, _.protocol) || (_.host = _.hostname, _.port = ""), _.username = _.password = "", _.auth && (p = _.auth.split(":"), _.username = p[0] || "", _.password = p[1] || ""), _.origin = _.protocol && _.host && "file:" !== _.protocol ? _.protocol + "//" + _.host : "null", _.href = _.toString()
        }
        a.prototype = {
            set: function(e, t, r) {
                var o = this;
                switch (e) {
                    case "query":
                        "string" == typeof t && t.length && (t = (r || _$querystringify_52.parse)(t)), o[e] = t;
                        break;
                    case "port":
                        o[e] = t, _$requiresPort_53(t, o.protocol) ? t && (o.host = o.hostname + ":" + t) : (o.host = o.hostname, o[e] = "");
                        break;
                    case "hostname":
                        o[e] = t, o.port && (t += ":" + o.port), o.host = t;
                        break;
                    case "host":
                        o[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), o.port = t.pop(), o.hostname = t.join(":")) : (o.hostname = t, o.port = "");
                        break;
                    case "protocol":
                        o.protocol = t.toLowerCase(), o.slashes = !r;
                        break;
                    case "pathname":
                    case "hash":
                        if (t) {
                            var i = "pathname" === e ? "/" : "#";
                            o[e] = t.charAt(0) !== i ? i + t : t
                        } else o[e] = t;
                        break;
                    default:
                        o[e] = t
                }
                for (var s = 0; s < n.length; s++) {
                    var a = n[s];
                    a[4] && (o[a[1]] = o[a[1]].toLowerCase())
                }
                return o.origin = o.protocol && o.host && "file:" !== o.protocol ? o.protocol + "//" + o.host : "null", o.href = o.toString(), o
            },
            toString: function(e) {
                e && "function" == typeof e || (e = _$querystringify_52.stringify);
                var t, r = this,
                    n = r.protocol;
                n && ":" !== n.charAt(n.length - 1) && (n += ":");
                var o = n + (r.slashes ? "//" : "");
                return r.username && (o += r.username, r.password && (o += ":" + r.password), o += "@"), o += r.host + r.pathname, (t = "object" == typeof r.query ? e(r.query) : r.query) && (o += "?" !== t.charAt(0) ? "?" + t : t), r.hash && (o += r.hash), o
            }
        }, a.extractProtocol = s, a.location = i, a.qs = _$querystringify_52, _$urlParse_84 = a
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$request_75 = {};
    Object.defineProperty(_$request_75, "__esModule", {
        value: !0
    }), _$request_75.newRequest = function() {
        return new window.XMLHttpRequest
    }, _$request_75.resolveUrl = function(e, t) {
        return new _urlParse2.default(t, e).toString()
    };
    var obj, __dummy_75$0 = 0,
        _urlParse2 = (obj = _$urlParse_84) && obj.__esModule ? obj : {
            default: obj
        },
        _$isCordova_72 = {};
    Object.defineProperty(_$isCordova_72, "__esModule", {
        value: !0
    }), _$isCordova_72.default = function() {
        return "undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova)
    };
    var _$isReactNative_73 = {};
    Object.defineProperty(_$isReactNative_73, "__esModule", {
        value: !0
    });
    var isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
    _$isReactNative_73.default = isReactNative;
    var _$readAsByteArray_74 = {};
    Object.defineProperty(_$readAsByteArray_74, "__esModule", {
        value: !0
    }), _$readAsByteArray_74.default = function(e, t) {
        var r = new FileReader;
        r.onload = function() {
            t(null, new Uint8Array(r.result))
        }, r.onerror = function(e) {
            t(e)
        }, r.readAsArrayBuffer(e)
    };
    var _$uriToBlob_78 = {};
    Object.defineProperty(_$uriToBlob_78, "__esModule", {
        value: !0
    }), _$uriToBlob_78.default = function(e, t) {
        var r = new XMLHttpRequest;
        r.responseType = "blob", r.onload = function() {
            var e = r.response;
            t(null, e)
        }, r.onerror = function(e) {
            t(e)
        }, r.open("GET", e), r.send()
    };
    var _$source_76 = {},
        ___createClass_76 = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }();
    Object.defineProperty(_$source_76, "__esModule", {
        value: !0
    }), _$source_76.getSource = function(e, t, r) {
        if ((_isReactNative2.default || window.__tus__forceReactNative) && e && void 0 !== e.uri)(0, _uriToBlob2.default)(e.uri, function(e, t) {
            if (e) return r(new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. " + e));
            r(null, new FileSource(t))
        });
        else {
            if ("function" != typeof e.slice || void 0 === e.size) return "function" == typeof e.read ? (t = +t, isFinite(t) ? void r(null, new StreamSource(e, t)) : void r(new Error("cannot create source for stream without a finite value for the `chunkSize` option"))) : void r(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
            r(null, new FileSource(e))
        }
    };
    var _isReactNative2 = _interopRequireDefault(_$isReactNative_73),
        _uriToBlob2 = _interopRequireDefault(_$uriToBlob_78),
        _isCordova2 = _interopRequireDefault(_$isCordova_72),
        _readAsByteArray2 = _interopRequireDefault(_$readAsByteArray_74);

    function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function ___classCallCheck_76(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var FileSource = function() {
            function e(t) {
                ___classCallCheck_76(this, e), this._file = t, this.size = t.size
            }
            return ___createClass_76(e, [{
                key: "slice",
                value: function(e, t, r) {
                    (0, _isCordova2.default)() ? (0, _readAsByteArray2.default)(this._file.slice(e, t), function(e, t) {
                        if (e) return r(e);
                        r(null, t)
                    }) : r(null, this._file.slice(e, t))
                }
            }, {
                key: "close",
                value: function() {}
            }]), e
        }(),
        StreamSource = function() {
            function e(t, r) {
                ___classCallCheck_76(this, e), this._chunkSize = r, this._buffer = void 0, this._bufferOffset = 0, this._reader = t, this._done = !1
            }
            return ___createClass_76(e, [{
                key: "slice",
                value: function(e, t, r) {
                    if (!(e < this._bufferOffset)) return this._readUntilEnoughDataOrDone(e, t, r);
                    r(new Error("Requested data is before the reader's current offset"))
                }
            }, {
                key: "_readUntilEnoughDataOrDone",
                value: function(e, t, r) {
                    var n = this,
                        o = t <= this._bufferOffset + __len_76(this._buffer);
                    if (this._done || o) {
                        var i = this._getDataFromBuffer(e, t);
                        r(null, i)
                    } else this._reader.read().then(function(o) {
                        var i = o.value;
                        o.done ? n._done = !0 : void 0 === n._buffer ? n._buffer = i : n._buffer = function(e, t) {
                            if (e.concat) return e.concat(t);
                            if (e instanceof Blob) return new Blob([e, t], {
                                type: e.type
                            });
                            if (e.set) {
                                var r = new e.constructor(e.length + t.length);
                                return r.set(e), r.set(t, e.length), r
                            }
                            throw new Error("Unknown data type")
                        }(n._buffer, i), n._readUntilEnoughDataOrDone(e, t, r)
                    }).catch(function(e) {
                        r(new Error("Error during read: " + e))
                    })
                }
            }, {
                key: "_getDataFromBuffer",
                value: function(e, t) {
                    e > this._bufferOffset && (this._buffer = this._buffer.slice(e - this._bufferOffset), this._bufferOffset = e);
                    var r = 0 === __len_76(this._buffer);
                    return this._done && r ? null : this._buffer.slice(0, t - e)
                }
            }, {
                key: "close",
                value: function() {
                    this._reader.cancel && this._reader.cancel()
                }
            }]), e
        }();

    function __len_76(e) {
        return void 0 === e ? 0 : void 0 !== e.size ? e.size : e.length
    }
    var _$error_79 = {};
    Object.defineProperty(_$error_79, "__esModule", {
        value: !0
    });
    var DetailedError = function(e) {
        function t(e) {
            var r = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1],
                n = arguments.length <= 2 || void 0 === arguments[2] ? null : arguments[2];
            ! function(e, r) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this);
            var o = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, Object.getPrototypeOf(t).call(this, e.message));
            o.originalRequest = n, o.causingError = r;
            var i = e.message;
            return null != r && (i += ", caused by " + r.toString()), null != n && (i += ", originated from request (response code: " + n.status + ", response text: " + n.responseText + ")"), o.message = i, o
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, Error), t
    }();
    _$error_79.default = DetailedError;
    var _$fingerprint_80 = {};
    Object.defineProperty(_$fingerprint_80, "__esModule", {
        value: !0
    }), _$fingerprint_80.default = function(e, t) {
        return ["tus", e.name, e.type, e.size, e.lastModified, t.endpoint].join("-")
    };
    var _$base64_83 = {
        exports: {}
    };
    (function(global) {
        ! function(e, t) {
            "object" == typeof _$base64_83.exports ? _$base64_83.exports = t(e) : "function" == typeof define && define.amd ? define(t) : t(e)
        }("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== global ? global : this, function(global) {
            "use strict";
            global = global || {};
            var _Base64 = global.Base64,
                version = "2.5.1",
                buffer;
            if (_$base64_83.exports) try {
                buffer = eval("require('buffer').Buffer")
            } catch (e) {
                buffer = void 0
            }
            var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                b64tab = function(e) {
                    for (var t = {}, r = 0, n = e.length; r < n; r++) t[e.charAt(r)] = r;
                    return t
                }(b64chars),
                fromCharCode = String.fromCharCode,
                cb_utob = function(e) {
                    if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? fromCharCode(192 | t >>> 6) + fromCharCode(128 | 63 & t) : fromCharCode(224 | t >>> 12 & 15) + fromCharCode(128 | t >>> 6 & 63) + fromCharCode(128 | 63 & t);
                    var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                    return fromCharCode(240 | t >>> 18 & 7) + fromCharCode(128 | t >>> 12 & 63) + fromCharCode(128 | t >>> 6 & 63) + fromCharCode(128 | 63 & t)
                },
                re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                utob = function(e) {
                    return e.replace(re_utob, cb_utob)
                },
                cb_encode = function(e) {
                    var t = [0, 2, 1][e.length % 3],
                        r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
                    return [b64chars.charAt(r >>> 18), b64chars.charAt(r >>> 12 & 63), t >= 2 ? "=" : b64chars.charAt(r >>> 6 & 63), t >= 1 ? "=" : b64chars.charAt(63 & r)].join("")
                },
                btoa = global.btoa ? function(e) {
                    return global.btoa(e)
                } : function(e) {
                    return e.replace(/[\s\S]{1,3}/g, cb_encode)
                },
                _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function(e) {
                    return (e.constructor === buffer.constructor ? e : buffer.from(e)).toString("base64")
                } : function(e) {
                    return (e.constructor === buffer.constructor ? e : new buffer(e)).toString("base64")
                } : function(e) {
                    return btoa(utob(e))
                },
                encode = function(e, t) {
                    return t ? _encode(String(e)).replace(/[+\/]/g, function(e) {
                        return "+" == e ? "-" : "_"
                    }).replace(/=/g, "") : _encode(String(e))
                },
                encodeURI = function(e) {
                    return encode(e, !0)
                },
                re_btou = new RegExp(["[\xc0-\xdf][\x80-\xbf]", "[\xe0-\xef][\x80-\xbf]{2}", "[\xf0-\xf7][\x80-\xbf]{3}"].join("|"), "g"),
                cb_btou = function(e) {
                    switch (e.length) {
                        case 4:
                            var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                            return fromCharCode(55296 + (t >>> 10)) + fromCharCode(56320 + (1023 & t));
                        case 3:
                            return fromCharCode((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                        default:
                            return fromCharCode((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                    }
                },
                btou = function(e) {
                    return e.replace(re_btou, cb_btou)
                },
                cb_decode = function(e) {
                    var t = e.length,
                        r = t % 4,
                        n = (t > 0 ? b64tab[e.charAt(0)] << 18 : 0) | (t > 1 ? b64tab[e.charAt(1)] << 12 : 0) | (t > 2 ? b64tab[e.charAt(2)] << 6 : 0) | (t > 3 ? b64tab[e.charAt(3)] : 0),
                        o = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(255 & n)];
                    return o.length -= [0, 0, 2, 1][r], o.join("")
                },
                _atob = global.atob ? function(e) {
                    return global.atob(e)
                } : function(e) {
                    return e.replace(/\S{1,4}/g, cb_decode)
                },
                atob = function(e) {
                    return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
                },
                _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function(e) {
                    return (e.constructor === buffer.constructor ? e : buffer.from(e, "base64")).toString()
                } : function(e) {
                    return (e.constructor === buffer.constructor ? e : new buffer(e, "base64")).toString()
                } : function(e) {
                    return btou(_atob(e))
                },
                decode = function(e) {
                    return _decode(String(e).replace(/[-_]/g, function(e) {
                        return "-" == e ? "+" : "/"
                    }).replace(/[^A-Za-z0-9\+\/]/g, ""))
                },
                noConflict = function() {
                    var e = global.Base64;
                    return global.Base64 = _Base64, e
                };
            if (global.Base64 = {
                    VERSION: version,
                    atob: atob,
                    btoa: btoa,
                    fromBase64: decode,
                    toBase64: encode,
                    utob: utob,
                    encode: encode,
                    encodeURI: encodeURI,
                    btou: btou,
                    decode: decode,
                    noConflict: noConflict,
                    __buffer__: buffer
                }, "function" == typeof Object.defineProperty) {
                var noEnum = function(e) {
                    return {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                };
                global.Base64.extendString = function() {
                    Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
                        return decode(this)
                    })), Object.defineProperty(String.prototype, "toBase64", noEnum(function(e) {
                        return encode(this, e)
                    })), Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
                        return encode(this, !0)
                    }))
                }
            }
            return global.Meteor && (Base64 = global.Base64), _$base64_83.exports ? _$base64_83.exports.Base64 = global.Base64 : "function" == typeof define && define.amd && define([], function() {
                return global.Base64
            }), {
                Base64: global.Base64
            }
        })
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), _$base64_83 = _$base64_83.exports;
    var _$upload_82 = {},
        ___createClass_82 = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }();
    Object.defineProperty(_$upload_82, "__esModule", {
        value: !0
    });
    var _fingerprint2 = ___interopRequireDefault_82(_$fingerprint_80),
        _error2 = ___interopRequireDefault_82(_$error_79),
        _extend2 = ___interopRequireDefault_82(_$extend_35),
        __dummy_82$0 = 0,
        __dummy_82$1 = 0,
        __dummy_82$2 = 0,
        Storage = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e, t
        }(_$storage_77);

    function ___interopRequireDefault_82(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var __defaultOptions_82 = {
            endpoint: null,
            fingerprint: _fingerprint2.default,
            resume: !0,
            onProgress: null,
            onChunkComplete: null,
            onSuccess: null,
            onError: null,
            headers: {},
            chunkSize: 1 / 0,
            withCredentials: !1,
            uploadUrl: null,
            uploadSize: null,
            overridePatchMethod: !1,
            retryDelays: null,
            removeFingerprintOnSuccess: !1,
            uploadLengthDeferred: !1
        },
        Upload = function() {
            function e(t, r) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.options = (0, _extend2.default)(!0, {}, __defaultOptions_82, r), this.file = t, this.url = null, this._xhr = null, this._fingerprint = null, this._offset = null, this._aborted = !1, this._size = null, this._source = null, this._retryAttempt = 0, this._retryTimeout = null, this._offsetBeforeRetry = 0
            }
            return ___createClass_82(e, [{
                key: "start",
                value: function() {
                    var e = this,
                        t = this.file;
                    t ? this.options.endpoint || this.options.uploadUrl ? this._source ? this._start(this._source) : (0, _$source_76.getSource)(t, this.options.chunkSize, function(t, r) {
                        t ? e._emitError(t) : (e._source = r, e._start(r))
                    }) : this._emitError(new Error("tus: neither an endpoint or an upload URL is provided")) : this._emitError(new Error("tus: no file or stream to upload provided"))
                }
            }, {
                key: "_start",
                value: function(e) {
                    var t = this,
                        r = this.file;
                    if (this.options.uploadLengthDeferred) this._size = null;
                    else if (null != this.options.uploadSize) {
                        if (this._size = +this.options.uploadSize, isNaN(this._size)) return void this._emitError(new Error("tus: cannot convert `uploadSize` option into a number"))
                    } else if (this._size = e.size, null == this._size) return void this._emitError(new Error("tus: cannot automatically derive upload's size from input and must be specified manually using the `uploadSize` option"));
                    var n, o = this.options.retryDelays;
                    if (null != o) {
                        if ("[object Array]" !== Object.prototype.toString.call(o)) return void this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
                        n = t.options.onError, t.options.onError = function(e) {
                            t.options.onError = n, null != t._offset && t._offset > t._offsetBeforeRetry && (t._retryAttempt = 0);
                            var r = !0;
                            if ("undefined" != typeof window && "navigator" in window && !1 === window.navigator.onLine && (r = !1), t._retryAttempt < o.length && null != e.originalRequest && !inStatusCategory(e.originalRequest.status, 400) && r) {
                                var i = o[t._retryAttempt++];
                                t._offsetBeforeRetry = t._offset, t.options.uploadUrl = t.url, t._retryTimeout = setTimeout(function() {
                                    t.start()
                                }, i)
                            } else t._emitError(e)
                        }
                    }
                    if (this._aborted = !1, null == this.url) {
                        if (null != this.options.uploadUrl) return this.url = this.options.uploadUrl, void this._resumeUpload();
                        if (this.options.resume) {
                            this._fingerprint = this.options.fingerprint(r, this.options);
                            var i = Storage.getItem(this._fingerprint);
                            if (null != i) return this.url = i, void this._resumeUpload()
                        }
                        this._createUpload()
                    } else this._resumeUpload()
                }
            }, {
                key: "abort",
                value: function() {
                    null !== this._xhr && (this._xhr.abort(), this._source.close(), this._aborted = !0), null != this._retryTimeout && (clearTimeout(this._retryTimeout), this._retryTimeout = null)
                }
            }, {
                key: "_emitXhrError",
                value: function(e, t, r) {
                    this._emitError(new _error2.default(t, r, e))
                }
            }, {
                key: "_emitError",
                value: function(e) {
                    if ("function" != typeof this.options.onError) throw e;
                    this.options.onError(e)
                }
            }, {
                key: "_emitSuccess",
                value: function() {
                    "function" == typeof this.options.onSuccess && this.options.onSuccess()
                }
            }, {
                key: "_emitProgress",
                value: function(e, t) {
                    "function" == typeof this.options.onProgress && this.options.onProgress(e, t)
                }
            }, {
                key: "_emitChunkComplete",
                value: function(e, t, r) {
                    "function" == typeof this.options.onChunkComplete && this.options.onChunkComplete(e, t, r)
                }
            }, {
                key: "_setupXHR",
                value: function(e) {
                    this._xhr = e, e.setRequestHeader("Tus-Resumable", "1.0.0");
                    var t = this.options.headers;
                    for (var r in t) e.setRequestHeader(r, t[r]);
                    e.withCredentials = this.options.withCredentials
                }
            }, {
                key: "_createUpload",
                value: function() {
                    var e = this;
                    if (this.options.endpoint) {
                        var t = (0, _$request_75.newRequest)();
                        t.open("POST", this.options.endpoint, !0), t.onload = function() {
                            if (inStatusCategory(t.status, 200)) {
                                var r = t.getResponseHeader("Location");
                                if (null != r) {
                                    if (e.url = (0, _$request_75.resolveUrl)(e.options.endpoint, r), 0 === e._size) return e._emitSuccess(), void e._source.close();
                                    e.options.resume && Storage.setItem(e._fingerprint, e.url), e._offset = 0, e._startUpload()
                                } else e._emitXhrError(t, new Error("tus: invalid or missing Location header"))
                            } else e._emitXhrError(t, new Error("tus: unexpected response while creating upload"))
                        }, t.onerror = function(r) {
                            e._emitXhrError(t, new Error("tus: failed to create upload"), r)
                        }, this._setupXHR(t), this.options.uploadLengthDeferred ? t.setRequestHeader("Upload-Defer-Length", 1) : t.setRequestHeader("Upload-Length", this._size);
                        var r = function(e) {
                            var t = [];
                            for (var r in e) t.push(r + " " + _$base64_83.Base64.encode(e[r]));
                            return t.join(",")
                        }(this.options.metadata);
                        "" !== r && t.setRequestHeader("Upload-Metadata", r), t.send(null)
                    } else this._emitError(new Error("tus: unable to create upload because no endpoint is provided"))
                }
            }, {
                key: "_resumeUpload",
                value: function() {
                    var e = this,
                        t = (0, _$request_75.newRequest)();
                    t.open("HEAD", this.url, !0), t.onload = function() {
                        if (!inStatusCategory(t.status, 200)) return e.options.resume && inStatusCategory(t.status, 400) && Storage.removeItem(e._fingerprint), 423 === t.status ? void e._emitXhrError(t, new Error("tus: upload is currently locked; retry later")) : e.options.endpoint ? (e.url = null, void e._createUpload()) : void e._emitXhrError(t, new Error("tus: unable to resume upload (new upload cannot be created without an endpoint)"));
                        var r = parseInt(t.getResponseHeader("Upload-Offset"), 10);
                        if (isNaN(r)) e._emitXhrError(t, new Error("tus: invalid or missing offset value"));
                        else {
                            var n = parseInt(t.getResponseHeader("Upload-Length"), 10);
                            if (!isNaN(n) || e.options.uploadLengthDeferred) {
                                if (r === n) return e._emitProgress(n, n), void e._emitSuccess();
                                e._offset = r, e._startUpload()
                            } else e._emitXhrError(t, new Error("tus: invalid or missing length value"))
                        }
                    }, t.onerror = function(r) {
                        e._emitXhrError(t, new Error("tus: failed to resume upload"), r)
                    }, this._setupXHR(t), t.send(null)
                }
            }, {
                key: "_startUpload",
                value: function() {
                    var e = this;
                    if (!this._aborted) {
                        var t = (0, _$request_75.newRequest)();
                        this.options.overridePatchMethod ? (t.open("POST", this.url, !0), t.setRequestHeader("X-HTTP-Method-Override", "PATCH")) : t.open("PATCH", this.url, !0), t.onload = function() {
                            if (inStatusCategory(t.status, 200)) {
                                var r = parseInt(t.getResponseHeader("Upload-Offset"), 10);
                                if (isNaN(r)) e._emitXhrError(t, new Error("tus: invalid or missing offset value"));
                                else {
                                    if (e._emitProgress(r, e._size), e._emitChunkComplete(r - e._offset, r, e._size), e._offset = r, r == e._size) return e.options.removeFingerprintOnSuccess && e.options.resume && Storage.removeItem(e._fingerprint), e._emitSuccess(), void e._source.close();
                                    e._startUpload()
                                }
                            } else e._emitXhrError(t, new Error("tus: unexpected response while uploading chunk"))
                        }, t.onerror = function(r) {
                            e._aborted || e._emitXhrError(t, new Error("tus: failed to upload chunk at offset " + e._offset), r)
                        }, "upload" in t && (t.upload.onprogress = function(t) {
                            t.lengthComputable && e._emitProgress(r + t.loaded, e._size)
                        }), this._setupXHR(t), t.setRequestHeader("Upload-Offset", this._offset), t.setRequestHeader("Content-Type", "application/offset+octet-stream");
                        var r = this._offset,
                            n = this._offset + this.options.chunkSize;
                        (n === 1 / 0 || n > this._size) && !this.options.uploadLengthDeferred && (n = this._size), this.options.uploadLengthDeferred ? this._source.slice(r, n, function(r, n) {
                            r ? e._emitError(r) : null === n ? (e._size = e._offset, t.setRequestHeader("Upload-Length", e._offset), t.send()) : (t.send(n), e._emitProgress(e._offset, e._size))
                        }) : (this._source.slice(r, n, function(o, i) {
                            o ? e._emitError(new _error2.default("tus: could not slice file or stream (from " + r + " to " + n + ")", o)) : t.send(i)
                        }), this._emitProgress(this._offset, this._size))
                    }
                }
            }]), e
        }();

    function inStatusCategory(e, t) {
        return e >= t && e < t + 100
    }
    Upload.defaultOptions = __defaultOptions_82, _$upload_82.default = Upload;
    var __obj_81, __dummy_81$0 = 0,
        _upload2 = (__obj_81 = _$upload_82) && __obj_81.__esModule ? __obj_81 : {
            default: __obj_81
        },
        __dummy_81$1 = 0,
        __defaultOptions_81 = _upload2.default.defaultOptions,
        __isSupported_81 = void 0;
    if ("undefined" != typeof window) {
        var _window = window,
            __XMLHttpRequest_81 = _window.XMLHttpRequest,
            __Blob_81 = _window.Blob;
        __isSupported_81 = __XMLHttpRequest_81 && __Blob_81 && "function" == typeof __Blob_81.prototype.slice
    } else __isSupported_81 = !0;
    var _$libEs5_81 = {
            Upload: _upload2.default
        },
        ___extends_150 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_150 = _$lib_96.Plugin,
        __dummy_150$0 = 0,
        __dummy_150$1 = 0,
        __Provider_150 = _$lib_94.Provider,
        __RequestClient_150 = _$lib_94.RequestClient,
        __Socket_150 = _$lib_94.Socket,
        __dummy_150$2 = 0,
        __dummy_150$3 = 0,
        __dummy_150$4 = 0,
        __dummy_150$5 = 0,
        tusDefaultOptions = {
            endpoint: "",
            resume: !0,
            onProgress: null,
            onChunkComplete: null,
            onSuccess: null,
            onError: null,
            headers: {},
            chunkSize: 1 / 0,
            withCredentials: !1,
            uploadUrl: null,
            uploadSize: null,
            overridePatchMethod: !1,
            retryDelays: null
        };

    function __createEventTracker_150(e) {
        var t = [];
        return {
            on: function(r, n) {
                return t.push([r, n]), e.on(r, n)
            },
            remove: function() {
                t.forEach(function(t) {
                    var r = t[0],
                        n = t[1];
                    e.off(r, n)
                })
            }
        }
    }
    var _$lib_150 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                return o.type = "uploader", o.id = "Tus", o.title = "Tus", o.opts = ___extends_150({}, {
                    resume: !0,
                    autoRetry: !0,
                    useFastRemoteRetry: !0,
                    limit: 0,
                    retryDelays: [0, 1e3, 3e3, 5e3]
                }, n), "number" == typeof o.opts.limit && 0 !== o.opts.limit ? o.limitUploads = _$limitPromises_171(o.opts.limit) : o.limitUploads = function(e) {
                    return e
                }, o.uploaders = Object.create(null), o.uploaderEvents = Object.create(null), o.uploaderSockets = Object.create(null), o.handleResetProgress = o.handleResetProgress.bind(o), o.handleUpload = o.handleUpload.bind(o), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.handleResetProgress = function() {
                var e = ___extends_150({}, this.uppy.getState().files);
                Object.keys(e).forEach(function(t) {
                    if (e[t].tus && e[t].tus.uploadUrl) {
                        var r = ___extends_150({}, e[t].tus);
                        delete r.uploadUrl, e[t] = ___extends_150({}, e[t], {
                            tus: r
                        })
                    }
                }), this.uppy.setState({
                    files: e
                })
            }, t.prototype.resetUploaderReferences = function(e) {
                this.uploaders[e] && (this.uploaders[e].abort(), this.uploaders[e] = null), this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
            }, t.prototype.upload = function(e, t, r) {
                var n = this;
                return this.resetUploaderReferences(e.id), new Promise(function(t, r) {
                    var o = ___extends_150({}, tusDefaultOptions, n.opts, e.tus || {});
                    o.onError = function(t) {
                        n.uppy.log(t), n.uppy.emit("upload-error", e, t), t.message = "Failed because: " + t.message, n.resetUploaderReferences(e.id), r(t)
                    }, o.onProgress = function(t, r) {
                        n.onReceiveUploadUrl(e, a.url), n.uppy.emit("upload-progress", e, {
                            uploader: n,
                            bytesUploaded: t,
                            bytesTotal: r
                        })
                    }, o.onSuccess = function() {
                        var r = {
                            uploadURL: a.url
                        };
                        n.uppy.emit("upload-success", e, r), a.url && n.uppy.log("Download " + a.file.name + " from " + a.url), n.resetUploaderReferences(e.id), t(a)
                    };
                    var i = function(e, t, r) {
                            Object.prototype.hasOwnProperty.call(e, t) && !Object.prototype.hasOwnProperty.call(e, r) && (e[r] = e[t])
                        },
                        s = ___extends_150({}, e.meta);
                    i(s, "type", "filetype"), i(s, "name", "filename"), o.metadata = s;
                    var a = new _$libEs5_81.Upload(e.data, o);
                    n.uploaders[e.id] = a, n.uploaderEvents[e.id] = __createEventTracker_150(n.uppy), n.onFileRemove(e.id, function(r) {
                        n.resetUploaderReferences(e.id), t("upload " + r + " was removed")
                    }), n.onPause(e.id, function(e) {
                        e ? a.abort() : a.start()
                    }), n.onPauseAll(e.id, function() {
                        a.abort()
                    }), n.onCancelAll(e.id, function() {
                        n.resetUploaderReferences(e.id)
                    }), n.onResumeAll(e.id, function() {
                        e.error && a.abort(), a.start()
                    }), e.isPaused || a.start()
                })
            }, t.prototype.uploadRemote = function(e, t, r) {
                var n = this;
                this.resetUploaderReferences(e.id);
                var o = ___extends_150({}, this.opts, e.tus || {});
                return new Promise(function(t, r) {
                    if (n.uppy.log(e.remote.url), e.serverToken) return n.connectToServerSocket(e).then(function() {
                        return t()
                    }).catch(r);
                    n.uppy.emit("upload-started", e), new(e.remote.providerOptions.provider ? __Provider_150 : __RequestClient_150)(n.uppy, e.remote.providerOptions).post(e.remote.url, ___extends_150({}, e.remote.body, {
                        endpoint: o.endpoint,
                        uploadUrl: o.uploadUrl,
                        protocol: "tus",
                        size: e.data.size,
                        metadata: e.meta
                    })).then(function(t) {
                        return n.uppy.setFileState(e.id, {
                            serverToken: t.token
                        }), e = n.uppy.getFile(e.id)
                    }).then(function(e) {
                        return n.connectToServerSocket(e)
                    }).then(function() {
                        t()
                    }).catch(function(e) {
                        r(new Error(e))
                    })
                })
            }, t.prototype.connectToServerSocket = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = e.serverToken,
                        i = _$getSocketHost_164(e.remote.serverUrl),
                        s = new __Socket_150({
                            target: i + "/api/" + o
                        });
                    t.uploaderSockets[e.id] = s, t.uploaderEvents[e.id] = __createEventTracker_150(t.uppy), t.onFileRemove(e.id, function() {
                        s.send("pause", {}), r("upload " + e.id + " was removed")
                    }), t.onPause(e.id, function(e) {
                        e ? s.send("pause", {}) : s.send("resume", {})
                    }), t.onPauseAll(e.id, function() {
                        return s.send("pause", {})
                    }), t.onCancelAll(e.id, function() {
                        return s.send("pause", {})
                    }), t.onResumeAll(e.id, function() {
                        e.error && s.send("pause", {}), s.send("resume", {})
                    }), t.onRetry(e.id, function() {
                        s.send("pause", {}), s.send("resume", {})
                    }), t.onRetryAll(e.id, function() {
                        s.send("pause", {}), s.send("resume", {})
                    }), e.isPaused && s.send("pause", {}), s.on("progress", function(r) {
                        return _$emitSocketProgress_156(t, r, e)
                    }), s.on("error", function(r) {
                        var o = r.error.message,
                            i = ___extends_150(new Error(o), {
                                cause: r.error
                            });
                        t.opts.useFastRemoteRetry || (t.resetUploaderReferences(e.id), t.uppy.setFileState(e.id, {
                            serverToken: null
                        })), t.uppy.emit("upload-error", e, i), n(i)
                    }), s.on("success", function(n) {
                        var o = {
                            uploadURL: n.url
                        };
                        t.uppy.emit("upload-success", e, o), t.resetUploaderReferences(e.id), r()
                    })
                })
            }, t.prototype.onReceiveUploadUrl = function(e, t) {
                var r = this.uppy.getFile(e.id);
                r && (r.tus && r.tus.uploadUrl === t || (this.uppy.log("[Tus] Storing upload url"), this.uppy.setFileState(r.id, {
                    tus: ___extends_150({}, r.tus, {
                        uploadUrl: t
                    })
                })))
            }, t.prototype.onFileRemove = function(e, t) {
                this.uploaderEvents[e].on("file-removed", function(r) {
                    e === r.id && t(r.id)
                })
            }, t.prototype.onPause = function(e, t) {
                this.uploaderEvents[e].on("upload-pause", function(r, n) {
                    e === r && t(n)
                })
            }, t.prototype.onRetry = function(e, t) {
                this.uploaderEvents[e].on("upload-retry", function(r) {
                    e === r && t()
                })
            }, t.prototype.onRetryAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("retry-all", function(n) {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.onPauseAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("pause-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.onCancelAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("cancel-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.onResumeAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("resume-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, t.prototype.uploadFiles = function(e) {
                var t = this,
                    r = e.map(function(r, n) {
                        var o = parseInt(n, 10) + 1,
                            i = e.length;
                        return r.error ? function() {
                            return Promise.reject(new Error(r.error))
                        } : r.isRemote ? (t.uppy.emit("upload-started", r), t.uploadRemote.bind(t, r, o, i)) : (t.uppy.emit("upload-started", r), t.upload.bind(t, r, o, i))
                    }).map(function(e) {
                        return t.limitUploads(e)()
                    });
                return _$settle_175(r)
            }, t.prototype.handleUpload = function(e) {
                var t = this;
                if (0 === e.length) return this.uppy.log("Tus: no files to upload!"), Promise.resolve();
                this.uppy.log("Tus is uploading...");
                var r = e.map(function(e) {
                    return t.uppy.getFile(e)
                });
                return this.uploadFiles(r).then(function() {
                    return null
                })
            }, t.prototype.install = function() {
                this.uppy.setState({
                    capabilities: ___extends_150({}, this.uppy.getState().capabilities, {
                        resumableUploads: !0
                    })
                }), this.uppy.addUploader(this.handleUpload), this.uppy.on("reset-progress", this.handleResetProgress), this.opts.autoRetry && this.uppy.on("back-online", this.uppy.retryAll)
            }, t.prototype.uninstall = function() {
                this.uppy.setState({
                    capabilities: ___extends_150({}, this.uppy.getState().capabilities, {
                        resumableUploads: !1
                    })
                }), this.uppy.removeUploader(this.handleUpload), this.opts.autoRetry && this.uppy.off("back-online", this.uppy.retryAll)
            }, t
        }(__Plugin_150),
        _$lib_148 = {},
        ___extends_148 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __dummy_148$0 = 0,
        __Plugin_148 = _$lib_96.Plugin,
        __dummy_148$1 = 0,
        __dummy_148$2 = 0,
        __dummy_148$3 = 0,
        __dummy_148$4 = 0,
        __dummy_148$5 = 0;

    function defaultGetAssemblyOptions(e, t) {
        return {
            params: t.params,
            signature: t.signature,
            fields: t.fields
        }
    }
    var COMPANION = "https://api2.transloadit.com/companion",
        TL_COMPANION = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/,
        TL_UPPY_SERVER = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/uppy-server/;
    _$lib_148 = function(e) {
        function t(r, n) {
            ! function(e, r) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this);
            var o = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, e.call(this, r, n));
            o.type = "uploader", o.id = "Transloadit", o.title = "Transloadit";
            var i = {
                    strings: {
                        creatingAssembly: "Preparing upload...",
                        creatingAssemblyFailed: "Transloadit: Could not create Assembly",
                        encoding: "Encoding..."
                    }
                },
                s = {
                    service: "https://api2.transloadit.com",
                    waitForEncoding: !1,
                    waitForMetadata: !1,
                    alwaysRunAssembly: !1,
                    importFromUploadURLs: !1,
                    signature: null,
                    params: null,
                    fields: {},
                    getAssemblyOptions: defaultGetAssemblyOptions,
                    locale: i
                };
            o.opts = ___extends_148({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o._prepareUpload = o._prepareUpload.bind(o), o._afterUpload = o._afterUpload.bind(o), o._handleError = o._handleError.bind(o), o._onFileUploadURLAvailable = o._onFileUploadURLAvailable.bind(o), o._onRestored = o._onRestored.bind(o), o._getPersistentData = o._getPersistentData.bind(o);
            var a = o.opts.getAssemblyOptions !== s.getAssemblyOptions;
            return o.opts.params ? _$AssemblyOptions_145.validateParams(o.opts.params) : a || _$AssemblyOptions_145.validateParams(null), o.client = new _$Client_147({
                service: o.opts.service
            }), o.activeAssemblies = {}, o
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e), t.prototype._attachAssemblyMetadata = function(e, t) {
            var r = ___extends_148({}, e.meta, {
                    assembly_url: t.assembly_url,
                    filename: e.name,
                    fieldname: "file"
                }),
                n = ___extends_148({}, e.tus, {
                    endpoint: t.tus_url
                }),
                o = e.remote;
            if (e.remote && TL_UPPY_SERVER.test(e.remote.serverUrl)) {
                var i = new Error("The https://api2.transloadit.com/uppy-server endpoint was renamed to https://api2.transloadit.com/companion, please update your `serverUrl` options accordingly.");
                throw this.uppy.log(i), i
            }
            if (e.remote && TL_COMPANION.test(e.remote.serverUrl)) {
                var s = t.companion_url.replace(/\/$/, ""),
                    a = e.remote.url.replace(e.remote.serverUrl, "").replace(/^\//, "");
                o = ___extends_148({}, e.remote, {
                    serverUrl: s,
                    url: s + "/" + a
                })
            }
            var u = ___extends_148({}, e, {
                transloadit: {
                    assembly: t.assembly_id
                }
            });
            return this.opts.importFromUploadURLs || ___extends_148(u, {
                meta: r,
                tus: n,
                remote: o
            }), u
        }, t.prototype._createAssembly = function(e, t, r) {
            var n = this;
            return this.uppy.log("[Transloadit] create Assembly"), this.client.createAssembly({
                params: r.params,
                fields: r.fields,
                expectedFiles: e.length,
                signature: r.signature
            }).then(function(r) {
                var o, i, s = new _$TransloaditAssembly_144(r),
                    a = s.status,
                    u = n.getPluginState(),
                    l = u.assemblies,
                    p = u.uploadsAssemblies;
                n.setPluginState({
                    assemblies: ___extends_148({}, l, (o = {}, o[a.assembly_id] = a, o)),
                    uploadsAssemblies: ___extends_148({}, p, (i = {}, i[t] = [].concat(p[t], [a.assembly_id]), i))
                });
                var c = n.uppy.getState().files,
                    d = {};
                return e.forEach(function(e) {
                    d[e] = n._attachAssemblyMetadata(n.uppy.getFile(e), a)
                }), n.uppy.setState({
                    files: ___extends_148({}, c, d)
                }), n.uppy.emit("transloadit:assembly-created", a, e), n._connectAssembly(s), n.uppy.log("[Transloadit] Created Assembly " + a.assembly_id), s
            }).catch(function(e) {
                throw e.message = n.i18n("creatingAssemblyFailed") + ": " + e.message, e
            })
        }, t.prototype._shouldWaitAfterUpload = function() {
            return this.opts.waitForEncoding || this.opts.waitForMetadata
        }, t.prototype._reserveFiles = function(e, t) {
            var r = this;
            return Promise.all(t.map(function(t) {
                var n = r.uppy.getFile(t);
                return r.client.reserveFile(e, n)
            }))
        }, t.prototype._onFileUploadURLAvailable = function(e) {
            var t = this;
            if (e && e.transloadit && e.transloadit.assembly) {
                var r = this.getPluginState().assemblies[e.transloadit.assembly];
                this.client.addFile(r, e).catch(function(n) {
                    t.uppy.log(n), t.uppy.emit("transloadit:import-error", r, e.id, n)
                })
            }
        }, t.prototype._findFile = function(e) {
            for (var t = this.uppy.getFiles(), r = 0; r < t.length; r++) {
                var n = t[r];
                if (n.uploadURL === e.tus_upload_url) return n;
                if (n.tus && n.tus.uploadUrl === e.tus_upload_url) return n;
                if (!e.is_tus_file && n.name === e.name && n.size === e.size) return n
            }
        }, t.prototype._onFileUploadComplete = function(e, t) {
            var r, n = this.getPluginState(),
                o = this._findFile(t);
            o ? (this.setPluginState({
                files: ___extends_148({}, n.files, (r = {}, r[t.id] = {
                    assembly: e,
                    id: o.id,
                    uploadedFile: t
                }, r))
            }), this.uppy.emit("transloadit:upload", t, this.getAssembly(e))) : this.uppy.log("[Transloadit] Couldn\u2019t file the file, it was likely removed in the process")
        }, t.prototype._onResult = function(e, t, r) {
            var n = this.getPluginState(),
                o = n.files[r.original_id];
            r.localId = o ? o.id : null;
            var i = {
                result: r,
                stepName: t,
                id: r.id,
                assembly: e
            };
            this.setPluginState({
                results: [].concat(n.results, [i])
            }), this.uppy.emit("transloadit:result", t, r, this.getAssembly(e))
        }, t.prototype._onAssemblyFinished = function(e) {
            var t = this,
                r = e.assembly_ssl_url;
            this.client.getAssemblyStatus(r).then(function(e) {
                var r, n = t.getPluginState();
                t.setPluginState({
                    assemblies: ___extends_148({}, n.assemblies, (r = {}, r[e.assembly_id] = e, r))
                }), t.uppy.emit("transloadit:complete", e)
            })
        }, t.prototype._getPersistentData = function(e) {
            var t, r = this.getPluginState(),
                n = r.assemblies,
                o = r.uploadsAssemblies;
            e(((t = {})[this.id] = {
                assemblies: n,
                uploadsAssemblies: o
            }, t))
        }, t.prototype._onRestored = function(e) {
            var t = this,
                r = e && e[this.id] ? e[this.id] : {},
                n = r.assemblies || {},
                o = r.uploadsAssemblies || {};
            0 !== Object.keys(o).length && (this.restored = Promise.resolve().then(function() {
                var e, r, i;
                return e = n, r = {}, i = [], Object.keys(e).forEach(function(n) {
                        var o = e[n];
                        o.uploads.forEach(function(e) {
                            var o = t._findFile(e);
                            r[e.id] = {
                                id: o.id,
                                assembly: n,
                                uploadedFile: e
                            }
                        });
                        var s = t.getPluginState();
                        Object.keys(o.results).forEach(function(e) {
                            o.results[e].forEach(function(t) {
                                var r = s.files[t.original_id];
                                t.localId = r ? r.id : null, i.push({
                                    id: t.id,
                                    result: t,
                                    stepName: e,
                                    assembly: n
                                })
                            })
                        })
                    }), t.setPluginState({
                        assemblies: e,
                        files: r,
                        results: i,
                        uploadsAssemblies: o
                    }),
                    function() {
                        var e = t.getPluginState().assemblies;
                        Object.keys(e).forEach(function(r) {
                            var n = new _$TransloaditAssembly_144(e[r]);
                            t._connectAssembly(n)
                        })
                    }(),
                    function() {
                        var e = t.getPluginState().assemblies;
                        return Promise.all(Object.keys(e).map(function(e) {
                            return t.activeAssemblies[e].update()
                        }))
                    }()
            }), this.restored.then(function() {
                t.restored = null
            }))
        }, t.prototype._connectAssembly = function(e) {
            var t = this,
                r = e.status.assembly_id;
            return this.activeAssemblies[r] = e, e.on("status", function(e) {
                var n, o = t.getPluginState().assemblies;
                t.setPluginState({
                    assemblies: ___extends_148({}, o, (n = {}, n[r] = e, n))
                })
            }), e.on("upload", function(e) {
                t._onFileUploadComplete(r, e)
            }), e.on("error", function(r) {
                t.uppy.emit("transloadit:assembly-error", e.status, r)
            }), e.on("executing", function() {
                t.uppy.emit("transloadit:assembly-executing", e.status)
            }), this.opts.waitForEncoding && e.on("result", function(e, n) {
                t._onResult(r, e, n)
            }), this.opts.waitForEncoding ? e.on("finished", function() {
                t._onAssemblyFinished(e.status)
            }) : this.opts.waitForMetadata && e.on("metadata", function() {
                t._onAssemblyFinished(e.status)
            }), "ASSEMBLY_COMPLETE" === e.ok ? e : (new Promise(function(t, r) {
                e.once("connect", t), e.once("status", t), e.once("error", r)
            }).then(function() {
                t.uppy.log("[Transloadit] Socket is ready")
            }), e.connect(), e)
        }, t.prototype._prepareUpload = function(e, t) {
            var r, n = this;
            (e = e.filter(function(e) {
                return !e.error
            })).forEach(function(e) {
                var t = n.uppy.getFile(e);
                n.uppy.emit("preprocess-progress", t, {
                    mode: "indeterminate",
                    message: n.i18n("creatingAssembly")
                })
            });
            var o = function(e) {
                    var r = e.fileIDs,
                        o = e.options;
                    return n._createAssembly(r, t, o).then(function(e) {
                        if (n.opts.importFromUploadURLs) return n._reserveFiles(e, r)
                    }).then(function() {
                        r.forEach(function(e) {
                            var t = n.uppy.getFile(e);
                            n.uppy.emit("preprocess-complete", t)
                        })
                    }).catch(function(e) {
                        throw r.forEach(function(t) {
                            var r = n.uppy.getFile(t);
                            n.uppy.emit("preprocess-complete", r), n.uppy.emit("upload-error", r, e)
                        }), e
                    })
                },
                i = this.getPluginState().uploadsAssemblies;
            this.setPluginState({
                uploadsAssemblies: ___extends_148({}, i, (r = {}, r[t] = [], r))
            });
            var s = e.map(function(e) {
                return n.uppy.getFile(e)
            });
            return new _$AssemblyOptions_145(s, this.opts).build().then(function(e) {
                return Promise.all(e.map(o))
            }, function(t) {
                throw e.forEach(function(e) {
                    var r = n.uppy.getFile(e);
                    n.uppy.emit("preprocess-complete", r), n.uppy.emit("upload-error", r, t)
                }), t
            })
        }, t.prototype._afterUpload = function(e, t) {
            var r = this;
            e = e.filter(function(e) {
                return !e.error
            });
            var n = this.getPluginState();
            if (this.restored) return this.restored.then(function() {
                return r._afterUpload(e, t)
            });
            var o = n.uploadsAssemblies[t];
            if (!this._shouldWaitAfterUpload()) {
                o.forEach(function(e) {
                    r.activeAssemblies[e].close(), delete r.activeAssemblies[e]
                });
                var i = o.map(function(e) {
                    return r.getAssembly(e)
                });
                return this.uppy.addResultData(t, {
                    transloadit: i
                }), Promise.resolve()
            }
            if (0 === o.length) return this.uppy.addResultData(t, {
                transloadit: []
            }), Promise.resolve();
            var s = new _$TransloaditAssemblyWatcher_146(this.uppy, o);
            return e.forEach(function(e) {
                var t = r.uppy.getFile(e);
                r.uppy.emit("postprocess-progress", t, {
                    mode: "indeterminate",
                    message: r.i18n("encoding")
                })
            }), s.on("assembly-complete", function(e) {
                r.getAssemblyFiles(e).forEach(function(e) {
                    r.uppy.emit("postprocess-complete", e)
                })
            }), s.on("assembly-error", function(e, t) {
                r.getAssemblyFiles(e).forEach(function(e) {
                    r.uppy.emit("upload-error", e, t), r.uppy.emit("postprocess-complete", e)
                })
            }), s.promise.then(function() {
                var e = o.map(function(e) {
                        return r.getAssembly(e)
                    }),
                    n = r.getPluginState(),
                    i = ___extends_148({}, n.uploadsAssemblies);
                delete i[t], r.setPluginState({
                    uploadsAssemblies: i
                }), r.uppy.addResultData(t, {
                    transloadit: e
                })
            })
        }, t.prototype._handleError = function(e, t) {
            var r = this;
            this.uppy.log("[Transloadit] _handleError in upload " + t), this.uppy.log(e), this.getPluginState().uploadsAssemblies[t].forEach(function(e) {
                r.activeAssemblies[e] && r.activeAssemblies[e].close()
            })
        }, t.prototype.install = function() {
            this.uppy.addPreProcessor(this._prepareUpload), this.uppy.addPostProcessor(this._afterUpload), this.uppy.on("error", this._handleError), this.opts.importFromUploadURLs ? this.uppy.on("upload-success", this._onFileUploadURLAvailable) : this.uppy.use(_$lib_150, {
                resume: !1,
                useFastRemoteRetry: !1,
                metaFields: ["assembly_url", "filename", "fieldname"]
            }), this.uppy.on("restore:get-data", this._getPersistentData), this.uppy.on("restored", this._onRestored), this.setPluginState({
                assemblies: {},
                uploadsAssemblies: {},
                files: {},
                results: []
            })
        }, t.prototype.uninstall = function() {
            this.uppy.removePreProcessor(this._prepareUpload), this.uppy.removePostProcessor(this._afterUpload), this.uppy.off("error", this._handleError), this.opts.importFromUploadURLs && this.uppy.off("upload-success", this._onFileUploadURLAvailable)
        }, t.prototype.getAssembly = function(e) {
            return this.getPluginState().assemblies[e]
        }, t.prototype.getAssemblyFiles = function(e) {
            return this.uppy.getFiles().filter(function(t) {
                return t && t.transloadit && t.transloadit.assembly === e
            })
        }, t
    }(__Plugin_148), _$lib_148.COMPANION = COMPANION, _$lib_148.UPPY_SERVER = COMPANION, _$lib_148.COMPANION_PATTERN = /\.transloadit\.com$/;
    var __dummy_151$0 = 0,
        __h_151 = _$preact_49.h,
        UrlUI = function(e) {
            function t(r) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var n = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r));
                return n.handleKeyPress = n.handleKeyPress.bind(n), n.handleClick = n.handleClick.bind(n), n
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                var e = this;
                this.input.value = "", setTimeout(function() {
                    e.input && e.input.focus({
                        preventScroll: !0
                    })
                }, 150)
            }, t.prototype.handleKeyPress = function(e) {
                13 === e.keyCode && this.props.addFile(this.input.value)
            }, t.prototype.handleClick = function() {
                this.props.addFile(this.input.value)
            }, t.prototype.render = function() {
                var e = this;
                return __h_151("div", {
                    class: "uppy-Url"
                }, __h_151("input", {
                    class: "uppy-c-textInput uppy-Url-input",
                    type: "text",
                    "aria-label": this.props.i18n("enterUrlToImport"),
                    placeholder: this.props.i18n("enterUrlToImport"),
                    onkeyup: this.handleKeyPress,
                    ref: function(t) {
                        e.input = t
                    }
                }), __h_151("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
                    type: "button",
                    onclick: this.handleClick
                }, this.props.i18n("import")))
            }, t
        }(_$preact_49.Component),
        _$UrlUI_151 = UrlUI,
        ___extends_152 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __Plugin_152 = _$lib_96.Plugin,
        __dummy_152$0 = 0,
        __h_152 = _$preact_49.h,
        __RequestClient_152 = _$lib_94.RequestClient,
        __dummy_152$1 = 0,
        __dummy_152$2 = 0,
        _$lib_152 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.id = o.opts.id || "Url", o.title = o.opts.title || "Link", o.type = "acquirer", o.icon = function() {
                    return __h_152("svg", {
                        "aria-hidden": "true",
                        width: "23",
                        height: "23",
                        viewBox: "0 0 23 23",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, __h_152("path", {
                        d: "M20.485 11.236l-2.748 2.737c-.184.182-.367.365-.642.547-1.007.73-2.107 1.095-3.298 1.095-1.65 0-3.298-.73-4.398-2.19-.275-.365-.183-1.003.183-1.277.367-.273 1.008-.182 1.283.183 1.191 1.642 3.482 1.915 5.13.73a.714.714 0 0 0 .367-.365l2.75-2.737c1.373-1.46 1.373-3.74-.093-5.108a3.72 3.72 0 0 0-5.13 0L12.33 6.4a.888.888 0 0 1-1.283 0 .88.88 0 0 1 0-1.277l1.558-1.55a5.38 5.38 0 0 1 7.605 0c2.29 2.006 2.382 5.564.274 7.662zm-8.979 6.294L9.95 19.081a3.72 3.72 0 0 1-5.13 0c-1.467-1.368-1.467-3.74-.093-5.108l2.75-2.737.366-.365c.824-.547 1.74-.82 2.748-.73 1.008.183 1.833.639 2.382 1.46.275.365.917.456 1.283.182.367-.273.458-.912.183-1.277-.916-1.186-2.199-1.915-3.573-2.098-1.374-.273-2.84.091-4.031 1.004l-.55.547-2.749 2.737c-2.107 2.189-2.015 5.655.092 7.753C4.727 21.453 6.101 22 7.475 22c1.374 0 2.749-.547 3.848-1.55l1.558-1.551a.88.88 0 0 0 0-1.278c-.367-.364-1.008-.456-1.375-.09z",
                        fill: "#FF814F",
                        "fill-rule": "nonzero"
                    }))
                };
                var i = {
                        strings: {
                            import: "Import",
                            enterUrlToImport: "Enter URL to import a file",
                            failedToFetch: "Companion failed to fetch this URL, please make sure it\u2019s correct",
                            enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
                        }
                    },
                    s = {
                        locale: i
                    };
                if (o.opts = ___extends_152({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.hostname = o.opts.serverUrl, !o.hostname) throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
                return o.getMeta = o.getMeta.bind(o), o.addFile = o.addFile.bind(o), o.handleDrop = o.handleDrop.bind(o), o.handleDragOver = o.handleDragOver.bind(o), o.handleDragLeave = o.handleDragLeave.bind(o), o.handlePaste = o.handlePaste.bind(o), o.client = new __RequestClient_152(r, {
                    serverUrl: o.opts.serverUrl,
                    serverHeaders: o.opts.serverHeaders
                }), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.getFileNameFromUrl = function(e) {
                return e.substring(e.lastIndexOf("/") + 1)
            }, t.prototype.checkIfCorrectURL = function(e) {
                if (!e) return !1;
                var t = e.match(/^([a-z0-9]+):\/\//)[1];
                return "http" === t || "https" === t
            }, t.prototype.addProtocolToURL = function(e) {
                return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e
            }, t.prototype.getMeta = function(e) {
                var t = this;
                return this.client.post("url/meta", {
                    url: e
                }).then(function(e) {
                    if (e.error) throw t.uppy.log("[URL] Error:"), t.uppy.log(e.error), new Error("Failed to fetch the file");
                    return e
                })
            }, t.prototype.addFile = function(e) {
                var t = this;
                return e = this.addProtocolToURL(e), this.checkIfCorrectURL(e) ? this.getMeta(e).then(function(r) {
                    return {
                        source: t.id,
                        name: t.getFileNameFromUrl(e),
                        type: r.type,
                        data: {
                            size: r.size
                        },
                        isRemote: !0,
                        body: {
                            url: e
                        },
                        remote: {
                            serverUrl: t.opts.serverUrl,
                            url: t.hostname + "/url/get",
                            body: {
                                fileId: e,
                                url: e
                            },
                            providerOptions: t.client.opts
                        }
                    }
                }).then(function(e) {
                    t.uppy.log("[Url] Adding remote file");
                    try {
                        t.uppy.addFile(e)
                    } catch (e) {}
                }).then(function() {}).catch(function(e) {
                    t.uppy.log(e), t.uppy.info({
                        message: t.i18n("failedToFetch"),
                        details: e
                    }, "error", 4e3)
                }) : (this.uppy.log("[URL] Incorrect URL entered: " + e), void this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3))
            }, t.prototype.handleDrop = function(e) {
                var t = this;
                e.preventDefault(), e.dataTransfer.items && _$toArray_176(e.dataTransfer.items).forEach(function(e) {
                    "string" === e.kind && "text/uri-list" === e.type && e.getAsString(function(e) {
                        t.uppy.log("[URL] Adding file from dropped url: " + e), t.addFile(e)
                    })
                })
            }, t.prototype.handleDragOver = function(e) {
                e.preventDefault(), this.el.classList.add("drag")
            }, t.prototype.handleDragLeave = function(e) {
                e.preventDefault(), this.el.classList.remove("drag")
            }, t.prototype.handlePaste = function(e) {
                var t = this;
                if (e.clipboardData.items) {
                    var r = _$toArray_176(e.clipboardData.items);
                    r.filter(function(e) {
                        return "file" === e.kind
                    }).length > 0 || r.forEach(function(e) {
                        "string" === e.kind && "text/plain" === e.type && e.getAsString(function(e) {
                            t.uppy.log("[URL] Adding file from pasted url: " + e), t.addFile(e)
                        })
                    })
                }
            }, t.prototype.render = function(e) {
                return __h_152(_$UrlUI_151, {
                    i18n: this.i18n,
                    addFile: this.addFile
                })
            }, t.prototype.onMount = function() {
                this.el && (this.el.addEventListener("drop", this.handleDrop), this.el.addEventListener("dragover", this.handleDragOver), this.el.addEventListener("dragleave", this.handleDragLeave), this.el.addEventListener("paste", this.handlePaste))
            }, t.prototype.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.el && (this.el.removeEventListener("drop", this.handleDrop), this.el.removeEventListener("dragover", this.handleDragOver), this.el.removeEventListener("dragleave", this.handleDragLeave), this.el.removeEventListener("paste", this.handlePaste)), this.unmount()
            }, t
        }(__Plugin_152),
        _$canvasToBlob_154 = function(e, t, r) {
            return e.toBlob ? new Promise(function(n) {
                e.toBlob(n, t, r)
            }) : Promise.resolve().then(function() {
                return _$dataURItoBlob_155(e.toDataURL(t, r), {})
            })
        },
        mimeToExtensions = {
            "video/ogg": "ogv",
            "audio/ogg": "ogg",
            "video/webm": "webm",
            "audio/webm": "webm",
            "video/x-matroska": "mkv",
            "video/mp4": "mp4",
            "audio/mp3": "mp3"
        },
        _$getFileTypeExtension_163 = function(e) {
            return e = e.replace(/;.*$/, ""), mimeToExtensions[e] || null
        },
        __h_177 = _$preact_49.h,
        _$CameraIcon_177 = function(e) {
            return __h_177("svg", {
                "aria-hidden": "true",
                fill: "#0097DC",
                width: "66",
                height: "55",
                viewBox: "0 0 66 55",
                xmlns: "http://www.w3.org/2000/svg"
            }, __h_177("path", {
                d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
                "fill-rule": "evenodd"
            }))
        },
        __h_180 = _$preact_49.h,
        _$RecordButton_180 = function(e) {
            var t = e.recording,
                r = e.onStartRecording,
                n = e.onStopRecording,
                o = e.i18n;
            return console.log("is recording", t), t ? __h_180("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--video",
                type: "button",
                title: o("stopRecording"),
                "aria-label": o("stopRecording"),
                onclick: n
            }, __h_180("svg", {
                "aria-hidden": "true",
                class: "UppyIcon",
                width: "100",
                height: "100",
                viewBox: "0 0 100 100"
            }, __h_180("rect", {
                x: "15",
                y: "15",
                width: "70",
                height: "70"
            }))) : __h_180("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--video",
                type: "button",
                title: o("startRecording"),
                "aria-label": o("startRecording"),
                onclick: r
            }, __h_180("svg", {
                "aria-hidden": "true",
                class: "UppyIcon",
                width: "100",
                height: "100",
                viewBox: "0 0 100 100"
            }, __h_180("circle", {
                cx: "50",
                cy: "50",
                r: "40"
            })))
        },
        __h_181 = _$preact_49.h,
        __dummy_181$0 = 0,
        _$SnapshotButton_181 = function(e) {
            var t = e.onSnapshot,
                r = e.i18n;
            return __h_181("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
                type: "button",
                title: r("takePicture"),
                "aria-label": r("takePicture"),
                onclick: t
            }, _$CameraIcon_177())
        },
        __dummy_178$0 = 0,
        __h_178 = _$preact_49.h,
        __Component_178 = _$preact_49.Component,
        __dummy_178$1 = 0,
        __dummy_178$2 = 0;

    function isModeAvailable(e, t) {
        return -1 !== e.indexOf(t)
    }
    var CameraScreen = function(e) {
            function t() {
                return function(e, r) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.componentDidMount = function() {
                this.props.onFocus(), this.btnContainer.firstChild.focus()
            }, t.prototype.componentWillUnmount = function() {
                this.props.onStop()
            }, t.prototype.render = function() {
                var e = this,
                    t = this.props.supportsRecording && (isModeAvailable(this.props.modes, "video-only") || isModeAvailable(this.props.modes, "audio-only") || isModeAvailable(this.props.modes, "video-audio")),
                    r = isModeAvailable(this.props.modes, "picture");
                return __h_178("div", {
                    class: "uppy uppy-Webcam-container"
                }, __h_178("div", {
                    class: "uppy-Webcam-videoContainer"
                }, __h_178("video", {
                    class: "uppy-Webcam-video  " + (this.props.mirror ? "uppy-Webcam-video--mirrored" : ""),
                    autoplay: !0,
                    muted: !0,
                    playsinline: !0,
                    srcObject: this.props.src || ""
                })), __h_178("div", {
                    class: "uppy-Webcam-buttonContainer",
                    ref: function(t) {
                        e.btnContainer = t
                    }
                }, r ? _$SnapshotButton_181(this.props) : null, " ", t ? _$RecordButton_180(this.props) : null))
            }, t
        }(__Component_178),
        _$CameraScreen_178 = CameraScreen,
        __h_179 = _$preact_49.h,
        _$PermissionsScreen_179 = function(e) {
            return __h_179("div", {
                class: "uppy-Webcam-permissons"
            }, __h_179("div", {
                class: "uppy-Webcam-permissonsIcon"
            }, e.icon()), __h_179("h1", {
                class: "uppy-Webcam-title"
            }, e.i18n("allowAccessTitle")), __h_179("p", null, e.i18n("allowAccessDescription")))
        },
        _$supportsMediaRecorder_183 = function() {
            return "function" == typeof MediaRecorder && !!MediaRecorder.prototype && "function" == typeof MediaRecorder.prototype.start
        },
        ___typeof_182 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        ___extends_182 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        },
        __h_182 = _$preact_49.h,
        __Plugin_182 = _$lib_96.Plugin,
        __dummy_182$0 = 0,
        __dummy_182$1 = 0,
        __dummy_182$2 = 0,
        __dummy_182$3 = 0,
        __dummy_182$4 = 0,
        __dummy_182$5 = 0,
        __dummy_182$6 = 0,
        _$lib_182 = function(e) {
            function t(r, n) {
                ! function(e, r) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this);
                var o = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.call(this, r, n));
                o.mediaDevices = function() {
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return navigator.mediaDevices;
                    var e = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
                    return e ? {
                        getUserMedia: function(t) {
                            return new Promise(function(r, n) {
                                e.call(navigator, t, r, n)
                            })
                        }
                    } : null
                }(), o.supportsUserMedia = !!o.mediaDevices, o.protocol = location.protocol.match(/https/i) ? "https" : "http", o.id = o.opts.id || "Webcam", o.title = o.opts.title || "Camera", o.type = "acquirer", o.icon = _$CameraIcon_177;
                var i = {
                        strings: {
                            smile: "Smile!",
                            takePicture: "Take a picture",
                            startRecording: "Begin video recording",
                            stopRecording: "Stop video recording",
                            allowAccessTitle: "Please allow access to your camera",
                            allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
                        }
                    },
                    s = {
                        onBeforeSnapshot: function() {
                            return Promise.resolve()
                        },
                        countdown: !1,
                        locale: i,
                        modes: ["video-audio", "video-only", "audio-only", "picture"],
                        mirror: !0,
                        facingMode: "user"
                    };
                return o.opts = ___extends_182({}, s, n), o.translator = new _$Translator_153([i, o.uppy.locale, o.opts.locale]), o.i18n = o.translator.translate.bind(o.translator), o.i18nArray = o.translator.translateArray.bind(o.translator), o.install = o.install.bind(o), o.setPluginState = o.setPluginState.bind(o), o.render = o.render.bind(o), o.start = o.start.bind(o), o.stop = o.stop.bind(o), o.takeSnapshot = o.takeSnapshot.bind(o), o.startRecording = o.startRecording.bind(o), o.stopRecording = o.stopRecording.bind(o), o.oneTwoThreeSmile = o.oneTwoThreeSmile.bind(o), o.focus = o.focus.bind(o), o.webcamActive = !1, o.opts.countdown && (o.opts.onBeforeSnapshot = o.oneTwoThreeSmile), o
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, e), t.prototype.isSupported = function() {
                return !!this.mediaDevices
            }, t.prototype.getConstraints = function() {
                return {
                    audio: -1 !== this.opts.modes.indexOf("video-audio") || -1 !== this.opts.modes.indexOf("audio-only"),
                    video: !(-1 === this.opts.modes.indexOf("video-audio") && -1 === this.opts.modes.indexOf("video-only") && -1 === this.opts.modes.indexOf("picture")) && {
                        facingMode: this.opts.facingMode
                    }
                }
            }, t.prototype.start = function() {
                var e = this;
                if (!this.isSupported()) return Promise.reject(new Error("Webcam access not supported"));
                this.webcamActive = !0;
                var t = this.getConstraints();
                return this.mediaDevices.getUserMedia(t).then(function(t) {
                    e.stream = t, e.setPluginState({
                        cameraReady: !0
                    })
                }).catch(function(t) {
                    e.setPluginState({
                        cameraError: t
                    })
                })
            }, t.prototype.startRecording = function() {
                var e = this;
                this.recorder = new MediaRecorder(this.stream), this.recordingChunks = [], this.recorder.addEventListener("dataavailable", function(t) {
                    e.recordingChunks.push(t.data)
                }), this.recorder.start(), this.setPluginState({
                    isRecording: !0
                })
            }, t.prototype.stopRecording = function() {
                var e = this;
                return new Promise(function(t, r) {
                    e.recorder.addEventListener("stop", function() {
                        t()
                    }), e.recorder.stop()
                }).then(function() {
                    return e.setPluginState({
                        isRecording: !1
                    }), e.getVideo()
                }).then(function(t) {
                    try {
                        e.uppy.addFile(t)
                    } catch (e) {}
                }).then(function() {
                    e.recordingChunks = null, e.recorder = null
                }, function(t) {
                    throw e.recordingChunks = null, e.recorder = null, t
                })
            }, t.prototype.stop = function() {
                this.stream.getAudioTracks().forEach(function(e) {
                    e.stop()
                }), this.stream.getVideoTracks().forEach(function(e) {
                    e.stop()
                }), this.webcamActive = !1, this.stream = null
            }, t.prototype.getVideoElement = function() {
                return this.el.querySelector(".uppy-Webcam-video")
            }, t.prototype.oneTwoThreeSmile = function() {
                var e = this;
                return new Promise(function(t, r) {
                    var n = e.opts.countdown,
                        o = setInterval(function() {
                            if (!e.webcamActive) return clearInterval(o), e.captureInProgress = !1, r(new Error("Webcam is not active"));
                            n > 0 ? (e.uppy.info(n + "...", "warning", 800), n--) : (clearInterval(o), e.uppy.info(e.i18n("smile"), "success", 1500), setTimeout(function() {
                                return t()
                            }, 1500))
                        }, 1e3)
                })
            }, t.prototype.takeSnapshot = function() {
                var e = this;
                this.captureInProgress || (this.captureInProgress = !0, this.opts.onBeforeSnapshot().catch(function(t) {
                    var r = "object" === (void 0 === t ? "undefined" : ___typeof_182(t)) ? t.message : t;
                    return e.uppy.info(r, "error", 5e3), Promise.reject(new Error("onBeforeSnapshot: " + r))
                }).then(function() {
                    return e.getImage()
                }).then(function(t) {
                    e.captureInProgress = !1;
                    try {
                        e.uppy.addFile(t)
                    } catch (e) {}
                }, function(t) {
                    throw e.captureInProgress = !1, t
                }))
            }, t.prototype.getImage = function() {
                var e = this,
                    t = this.getVideoElement();
                if (!t) return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
                var r = "webcam-" + Date.now() + ".jpg",
                    n = t.videoWidth,
                    o = t.videoHeight,
                    i = document.createElement("canvas");
                return i.width = n, i.height = o, i.getContext("2d").drawImage(t, 0, 0), _$canvasToBlob_154(i, "image/jpeg").then(function(t) {
                    return {
                        source: e.id,
                        name: r,
                        data: new Blob([t], {
                            type: "image/jpeg"
                        }),
                        type: "image/jpeg"
                    }
                })
            }, t.prototype.getVideo = function() {
                var e = this.recordingChunks[0].type,
                    t = _$getFileTypeExtension_163(e);
                if (!t) return Promise.reject(new Error('Could not retrieve recording: Unsupported media type "' + e + '"'));
                var r = "webcam-" + Date.now() + "." + t,
                    n = new Blob(this.recordingChunks, {
                        type: e
                    }),
                    o = {
                        source: this.id,
                        name: r,
                        data: new Blob([n], {
                            type: e
                        }),
                        type: e
                    };
                return Promise.resolve(o)
            }, t.prototype.focus = function() {
                var e = this;
                this.opts.countdown || setTimeout(function() {
                    e.uppy.info(e.i18n("smile"), "success", 1500)
                }, 1e3)
            }, t.prototype.render = function(e) {
                this.webcamActive || this.start();
                var t = this.getPluginState();
                return t.cameraReady ? __h_182(_$CameraScreen_178, ___extends_182({}, t, {
                    onSnapshot: this.takeSnapshot,
                    onStartRecording: this.startRecording,
                    onStopRecording: this.stopRecording,
                    onFocus: this.focus,
                    onStop: this.stop,
                    i18n: this.i18n,
                    modes: this.opts.modes,
                    supportsRecording: _$supportsMediaRecorder_183(),
                    recording: t.isRecording,
                    mirror: this.opts.mirror,
                    src: this.stream
                })) : __h_182(_$PermissionsScreen_179, {
                    icon: _$CameraIcon_177,
                    i18n: this.i18n
                })
            }, t.prototype.install = function() {
                this.setPluginState({
                    cameraReady: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, t.prototype.uninstall = function() {
                this.stream && this.stop(), this.unmount()
            }, t
        }(__Plugin_182),
        _$uppy_186 = {};
    _$uppy_186.Core = _$lib_96, _$uppy_186.server = _$lib_94, _$uppy_186.views = {
        ProviderView: _$lib_136
    }, _$uppy_186.DefaultStore = _$lib_141, _$uppy_186.ReduxStore = _$lib_142, _$uppy_186.Dashboard = _$lib_110, _$uppy_186.DragDrop = _$lib_115, _$uppy_186.FileInput = _$lib_117, _$uppy_186.Informer = _$lib_125, _$uppy_186.ProgressBar = _$lib_127, _$uppy_186.StatusBar = _$lib_140, _$uppy_186.Dropbox = _$lib_116, _$uppy_186.GoogleDrive = _$lib_124, _$uppy_186.Instagram = _$lib_126, _$uppy_186.Url = _$lib_152, _$uppy_186.Webcam = _$lib_182, _$uppy_186.AwsS3 = _$lib_90, _$uppy_186.AwsS3Multipart = _$lib_89, _$uppy_186.Transloadit = _$lib_148, _$uppy_186.Tus = _$lib_150, _$uppy_186.XHRUpload = _$lib_184, _$uppy_186.Form = _$lib_118, _$uppy_186.GoldenRetriever = _$lib_122, _$uppy_186.ReduxDevTools = _$lib_137, _$uppy_186.ThumbnailGenerator = _$lib_143;
    var _$bundle_185 = {};
    return _$bundle_185 = _$uppy_186, _$bundle_185
});