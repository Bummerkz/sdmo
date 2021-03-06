/*
 Highstock JS v6.0.4 (2017-12-15)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (Q, L) {
    "object" === typeof module && module.exports ? module.exports = Q.document ? L(Q) : L : Q.Highcharts = L(Q)
})("undefined" !== typeof window ? window : this, function (Q) {
    var L = function () {
        var a = "undefined" === typeof Q ? window : Q, G = a.document, E = a.navigator && a.navigator.userAgent || "", H = G && G.createElementNS && !!G.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, v = /(edge|msie|trident)/i.test(E) && !a.opera, k = /Firefox/.test(E), q = k && 4 > parseInt(E.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16,
            !0) : {product: "Highstock", version: "6.0.4", deg2rad: 2 * Math.PI / 360, doc: G, hasBidiBug: q, hasTouch: G && void 0 !== G.documentElement.ontouchstart, isMS: v, isWebKit: /AppleWebKit/.test(E), isFirefox: k, isTouchDevice: /(Mobile|Android|Windows Phone)/.test(E), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: H, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () {
        }, charts: []}
    }();
    (function (a) {
        a.timers = [];
        var G = a.charts, E = a.doc, H = a.win;
        a.error = function (v, k) {
            v = a.isNumber(v) ? "Highcharts error #" + v + ": www.highcharts.com/errors/" + v : v;
            if (k)throw Error(v);
            H.console && console.log(v)
        };
        a.Fx = function (a, k, q) {
            this.options = k;
            this.elem = a;
            this.prop = q
        };
        a.Fx.prototype = {dSetter: function () {
            var a = this.paths[0], k = this.paths[1], q = [], w = this.now, t = a.length, u;
            if (1 === w)q = this.toD; else if (t === k.length && 1 > w)for (; t--;)u = parseFloat(a[t]), q[t] = isNaN(u) ? k[t] : w * parseFloat(k[t] - u) + u; else q = k;
            this.elem.attr("d", q, null, !0)
        }, update: function () {
            var a = this.elem, k = this.prop, q = this.now, w =
                this.options.step;
            if (this[k + "Setter"])this[k + "Setter"](); else a.attr ? a.element && a.attr(k, q, null, !0) : a.style[k] = q + this.unit;
            w && w.call(a, q, this)
        }, run: function (v, k, q) {
            var w = this, t = w.options, u = function (a) {
                return u.stopped ? !1 : w.step(a)
            }, z = H.requestAnimationFrame || function (a) {
                setTimeout(a, 13)
            }, m = function () {
                for (var g = 0; g < a.timers.length; g++)a.timers[g]() || a.timers.splice(g--, 1);
                a.timers.length && z(m)
            };
            v === k ? (delete t.curAnim[this.prop], t.complete && 0 === a.keys(t.curAnim).length && t.complete.call(this.elem)) :
                (this.startTime = +new Date, this.start = v, this.end = k, this.unit = q, this.now = this.start, this.pos = 0, u.elem = this.elem, u.prop = this.prop, u() && 1 === a.timers.push(u) && z(m))
        }, step: function (v) {
            var k = +new Date, q, w = this.options, t = this.elem, u = w.complete, z = w.duration, m = w.curAnim;
            t.attr && !t.element ? v = !1 : v || k >= z + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), q = m[this.prop] = !0, a.objectEach(m, function (a) {
                !0 !== a && (q = !1)
            }), q && u && u.call(t), v = !1) : (this.pos = w.easing((k - this.startTime) / z), this.now = this.start + (this.end -
                this.start) * this.pos, this.update(), v = !0);
            return v
        }, initPath: function (v, k, q) {
            function w(a) {
                var b, c;
                for (r = a.length; r--;)b = "M" === a[r] || "L" === a[r], c = /[a-zA-Z]/.test(a[r + 3]), b && c && a.splice(r + 1, 0, a[r + 1], a[r + 2], a[r + 1], a[r + 2])
            }

            function t(a, b) {
                for (; a.length < c;) {
                    a[0] = b[c - a.length];
                    var n = a.slice(0, e);
                    [].splice.apply(a, [0, 0].concat(n));
                    l && (n = a.slice(a.length - e), [].splice.apply(a, [a.length, 0].concat(n)), r--)
                }
                a[0] = "M"
            }

            function u(a, r) {
                for (var n = (c - a.length) / e; 0 < n && n--;)b = a.slice().splice(a.length / C - e, e * C), b[0] =
                    r[c - e - n * e], f && (b[e - 6] = b[e - 2], b[e - 5] = b[e - 1]), [].splice.apply(a, [a.length / C, 0].concat(b)), l && n--
            }

            k = k || "";
            var z, m = v.startX, g = v.endX, f = -1 < k.indexOf("C"), e = f ? 7 : 3, c, b, r;
            k = k.split(" ");
            q = q.slice();
            var l = v.isArea, C = l ? 2 : 1, I;
            f && (w(k), w(q));
            if (m && g) {
                for (r = 0; r < m.length; r++)if (m[r] === g[0]) {
                    z = r;
                    break
                } else if (m[0] === g[g.length - m.length + r]) {
                    z = r;
                    I = !0;
                    break
                }
                void 0 === z && (k = [])
            }
            k.length && a.isNumber(z) && (c = q.length + z * C * e, I ? (t(k, q), u(q, k)) : (t(q, k), u(k, q)));
            return[k, q]
        }};
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter =
            function () {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            };
        a.extend = function (a, k) {
            var q;
            a || (a = {});
            for (q in k)a[q] = k[q];
            return a
        };
        a.merge = function () {
            var v, k = arguments, q, w = {}, t = function (u, q) {
                "object" !== typeof u && (u = {});
                a.objectEach(q, function (m, g) {
                    !a.isObject(m, !0) || a.isClass(m) || a.isDOMElement(m) ? u[g] = q[g] : u[g] = t(u[g] || {}, m)
                });
                return u
            };
            !0 === k[0] && (w = k[1], k = Array.prototype.slice.call(k, 2));
            q = k.length;
            for (v = 0; v < q; v++)w = t(w, k[v]);
            return w
        };
        a.pInt = function (a, k) {
            return parseInt(a, k || 10)
        };
        a.isString = function (a) {
            return"string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return"[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (v, k) {
            return!!v && "object" === typeof v && (!k || !a.isArray(v))
        };
        a.isDOMElement = function (v) {
            return a.isObject(v) && "number" === typeof v.nodeType
        };
        a.isClass = function (v) {
            var k = v && v.constructor;
            return!(!a.isObject(v, !0) || a.isDOMElement(v) || !k || !k.name || "Object" === k.name)
        };
        a.isNumber = function (a) {
            return"number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, k) {
            for (var q = a.length; q--;)if (a[q] === k) {
                a.splice(q, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (v, k, q) {
            var w;
            a.isString(k) ? a.defined(q) ? v.setAttribute(k, q) : v && v.getAttribute && (w = v.getAttribute(k)) : a.defined(k) && a.isObject(k) && a.objectEach(k, function (a, u) {
                v.setAttribute(u, a)
            });
            return w
        };
        a.splat = function (v) {
            return a.isArray(v) ? v : [v]
        };
        a.syncTimeout = function (a, k, q) {
            if (k)return setTimeout(a, k, q);
            a.call(0,
                q)
        };
        a.pick = function () {
            var a = arguments, k, q, w = a.length;
            for (k = 0; k < w; k++)if (q = a[k], void 0 !== q && null !== q)return q
        };
        a.css = function (v, k) {
            a.isMS && !a.svg && k && void 0 !== k.opacity && (k.filter = "alpha(opacity\x3d" + 100 * k.opacity + ")");
            a.extend(v.style, k)
        };
        a.createElement = function (v, k, q, w, t) {
            v = E.createElement(v);
            var u = a.css;
            k && a.extend(v, k);
            t && u(v, {padding: 0, border: "none", margin: 0});
            q && u(v, q);
            w && w.appendChild(v);
            return v
        };
        a.extendClass = function (v, k) {
            var q = function () {
            };
            q.prototype = new v;
            a.extend(q.prototype, k);
            return q
        };
        a.pad = function (a, k, q) {
            return Array((k || 2) + 1 - String(a).length).join(q || 0) + a
        };
        a.relativeLength = function (a, k, q) {
            return/%$/.test(a) ? k * parseFloat(a) / 100 + (q || 0) : parseFloat(a)
        };
        a.wrap = function (a, k, q) {
            var v = a[k];
            a[k] = function () {
                var a = Array.prototype.slice.call(arguments), u = arguments, z = this;
                z.proceed = function () {
                    v.apply(z, arguments.length ? arguments : u)
                };
                a.unshift(v);
                a = q.apply(this, a);
                z.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (v) {
            var k = a.Date;
            return 6E4 * (k.hcGetTimezoneOffset && k.hcGetTimezoneOffset(v) ||
                k.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (v, k, q) {
            if (!a.defined(k) || isNaN(k))return a.defaultOptions.lang.invalidDate || "";
            v = a.pick(v, "%Y-%m-%d %H:%M:%S");
            var w = a.Date, t = new w(k - a.getTZOffset(k)), u = t[w.hcGetHours](), z = t[w.hcGetDay](), m = t[w.hcGetDate](), g = t[w.hcGetMonth](), f = t[w.hcGetFullYear](), e = a.defaultOptions.lang, c = e.weekdays, b = e.shortWeekdays, r = a.pad, w = a.extend({a: b ? b[z] : c[z].substr(0, 3), A: c[z], d: r(m), e: r(m, 2, " "), w: z, b: e.shortMonths[g], B: e.months[g], m: r(g + 1), y: f.toString().substr(2, 2), Y: f,
                H: r(u), k: u, I: r(u % 12 || 12), l: u % 12 || 12, M: r(t[w.hcGetMinutes]()), p: 12 > u ? "AM" : "PM", P: 12 > u ? "am" : "pm", S: r(t.getSeconds()), L: r(Math.round(k % 1E3), 3)}, a.dateFormats);
            a.objectEach(w, function (a, b) {
                for (; -1 !== v.indexOf("%" + b);)v = v.replace("%" + b, "function" === typeof a ? a(k) : a)
            });
            return q ? v.substr(0, 1).toUpperCase() + v.substr(1) : v
        };
        a.formatSingle = function (v, k) {
            var q = /\.([0-9])/, w = a.defaultOptions.lang;
            /f$/.test(v) ? (q = (q = v.match(q)) ? q[1] : -1, null !== k && (k = a.numberFormat(k, q, w.decimalPoint, -1 < v.indexOf(",") ? w.thousandsSep :
                ""))) : k = a.dateFormat(v, k);
            return k
        };
        a.format = function (v, k) {
            for (var q = "{", w = !1, t, u, z, m, g = [], f; v;) {
                q = v.indexOf(q);
                if (-1 === q)break;
                t = v.slice(0, q);
                if (w) {
                    t = t.split(":");
                    u = t.shift().split(".");
                    m = u.length;
                    f = k;
                    for (z = 0; z < m; z++)f && (f = f[u[z]]);
                    t.length && (f = a.formatSingle(t.join(":"), f));
                    g.push(f)
                } else g.push(t);
                v = v.slice(q + 1);
                q = (w = !w) ? "}" : "{"
            }
            g.push(v);
            return g.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (v, k, q, w, t) {
            var u, z = v;
            q =
                a.pick(q, 1);
            u = v / q;
            k || (k = t ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === w && (1 === q ? k = a.grep(k, function (a) {
                return 0 === a % 1
            }) : .1 >= q && (k = [1 / q])));
            for (w = 0; w < k.length && !(z = k[w], t && z * q >= v || !t && u <= (k[w] + (k[w + 1] || k[w])) / 2); w++);
            return z = a.correctFloat(z * q, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, k) {
            var q = a.length, v, t;
            for (t = 0; t < q; t++)a[t].safeI = t;
            a.sort(function (a, t) {
                v = k(a, t);
                return 0 === v ? a.safeI - t.safeI : v
            });
            for (t = 0; t < q; t++)delete a[t].safeI
        };
        a.arrayMin = function (a) {
            for (var k = a.length,
                     q = a[0]; k--;)a[k] < q && (q = a[k]);
            return q
        };
        a.arrayMax = function (a) {
            for (var k = a.length, q = a[0]; k--;)a[k] > q && (q = a[k]);
            return q
        };
        a.destroyObjectProperties = function (v, k) {
            a.objectEach(v, function (a, w) {
                a && a !== k && a.destroy && a.destroy();
                delete v[w]
            })
        };
        a.discardElement = function (v) {
            var k = a.garbageBin;
            k || (k = a.createElement("div"));
            v && k.appendChild(v);
            k.innerHTML = ""
        };
        a.correctFloat = function (a, k) {
            return parseFloat(a.toPrecision(k || 14))
        };
        a.setAnimation = function (v, k) {
            k.renderer.globalAnimation = a.pick(v, k.options.chart.animation,
                !0)
        };
        a.animObject = function (v) {
            return a.isObject(v) ? a.merge(v) : {duration: v ? 500 : 0}
        };
        a.timeUnits = {millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5};
        a.numberFormat = function (v, k, q, w) {
            v = +v || 0;
            k = +k;
            var t = a.defaultOptions.lang, u = (v.toString().split(".")[1] || "").split("e")[0].length, z, m, g = v.toString().split("e");
            -1 === k ? k = Math.min(u, 20) : a.isNumber(k) ? k && g[1] && 0 > g[1] && (z = k + +g[1], 0 <= z ? (g[0] = (+g[0]).toExponential(z).split("e")[0], k = z) : (g[0] = g[0].split(".")[0] || 0,
                v = 20 > k ? (g[0] * Math.pow(10, g[1])).toFixed(k) : 0, g[1] = 0)) : k = 2;
            m = (Math.abs(g[1] ? g[0] : v) + Math.pow(10, -Math.max(k, u) - 1)).toFixed(k);
            u = String(a.pInt(m));
            z = 3 < u.length ? u.length % 3 : 0;
            q = a.pick(q, t.decimalPoint);
            w = a.pick(w, t.thousandsSep);
            v = (0 > v ? "-" : "") + (z ? u.substr(0, z) + w : "");
            v += u.substr(z).replace(/(\d{3})(?=\d)/g, "$1" + w);
            k && (v += q + m.slice(-k));
            g[1] && 0 !== +v && (v += "e" + g[1]);
            return v
        };
        Math.easeInOutSine = function (a) {
            return-.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (v, k, q) {
            if ("width" === k)return Math.min(v.offsetWidth,
                v.scrollWidth) - a.getStyle(v, "padding-left") - a.getStyle(v, "padding-right");
            if ("height" === k)return Math.min(v.offsetHeight, v.scrollHeight) - a.getStyle(v, "padding-top") - a.getStyle(v, "padding-bottom");
            H.getComputedStyle || a.error(27, !0);
            if (v = H.getComputedStyle(v, void 0))v = v.getPropertyValue(k), a.pick(q, "opacity" !== k) && (v = a.pInt(v));
            return v
        };
        a.inArray = function (v, k) {
            return(a.indexOfPolyfill || Array.prototype.indexOf).call(k, v)
        };
        a.grep = function (v, k) {
            return(a.filterPolyfill || Array.prototype.filter).call(v,
                k)
        };
        a.find = Array.prototype.find ? function (a, k) {
            return a.find(k)
        } : function (a, k) {
            var q, w = a.length;
            for (q = 0; q < w; q++)if (k(a[q], q))return a[q]
        };
        a.map = function (a, k) {
            for (var q = [], w = 0, t = a.length; w < t; w++)q[w] = k.call(a[w], a[w], w, a);
            return q
        };
        a.keys = function (v) {
            return(a.keysPolyfill || Object.keys).call(void 0, v)
        };
        a.reduce = function (v, k, q) {
            return(a.reducePolyfill || Array.prototype.reduce).call(v, k, q)
        };
        a.offset = function (a) {
            var k = E.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {top: 0, left: 0};
            return{top: a.top +
                (H.pageYOffset || k.scrollTop) - (k.clientTop || 0), left: a.left + (H.pageXOffset || k.scrollLeft) - (k.clientLeft || 0)}
        };
        a.stop = function (v, k) {
            for (var q = a.timers.length; q--;)a.timers[q].elem !== v || k && k !== a.timers[q].prop || (a.timers[q].stopped = !0)
        };
        a.each = function (v, k, q) {
            return(a.forEachPolyfill || Array.prototype.forEach).call(v, k, q)
        };
        a.objectEach = function (a, k, q) {
            for (var w in a)a.hasOwnProperty(w) && k.call(q, a[w], w, a)
        };
        a.addEvent = function (v, k, q) {
            var w, t, u = v.addEventListener || a.addEventListenerPolyfill;
            v.hcEvents && !Object.prototype.hasOwnProperty.call(v, "hcEvents") && (t = {}, a.objectEach(v.hcEvents, function (a, m) {
                t[m] = a.slice(0)
            }), v.hcEvents = t);
            w = v.hcEvents = v.hcEvents || {};
            u && u.call(v, k, q, !1);
            w[k] || (w[k] = []);
            w[k].push(q);
            return function () {
                a.removeEvent(v, k, q)
            }
        };
        a.removeEvent = function (v, k, q) {
            function w(g, f) {
                var e = v.removeEventListener || a.removeEventListenerPolyfill;
                e && e.call(v, g, f, !1)
            }

            function t() {
                var g, f;
                v.nodeName && (k ? (g = {}, g[k] = !0) : g = z, a.objectEach(g, function (a, c) {
                    if (z[c])for (f = z[c].length; f--;)w(c, z[c][f])
                }))
            }

            var u, z = v.hcEvents, m;
            z && (k ? (u = z[k] || [], q ? (m = a.inArray(q, u), -1 < m && (u.splice(m, 1), z[k] = u), w(k, q)) : (t(), z[k] = [])) : (t(), v.hcEvents = {}))
        };
        a.fireEvent = function (v, k, q, w) {
            var t;
            t = v.hcEvents;
            var u, z;
            q = q || {};
            if (E.createEvent && (v.dispatchEvent || v.fireEvent))t = E.createEvent("Events"), t.initEvent(k, !0, !0), a.extend(t, q), v.dispatchEvent ? v.dispatchEvent(t) : v.fireEvent(k, t); else if (t)for (t = t[k] || [], u = t.length, q.target || a.extend(q, {preventDefault: function () {
                q.defaultPrevented = !0
            }, target: v, type: k}), k = 0; k < u; k++)(z = t[k]) &&
                !1 === z.call(v, q) && q.preventDefault();
            w && !q.defaultPrevented && w(q)
        };
        a.animate = function (v, k, q) {
            var w, t = "", u, z, m;
            a.isObject(q) || (m = arguments, q = {duration: m[2], easing: m[3], complete: m[4]});
            a.isNumber(q.duration) || (q.duration = 400);
            q.easing = "function" === typeof q.easing ? q.easing : Math[q.easing] || Math.easeInOutSine;
            q.curAnim = a.merge(k);
            a.objectEach(k, function (g, f) {
                a.stop(v, f);
                z = new a.Fx(v, q, f);
                u = null;
                "d" === f ? (z.paths = z.initPath(v, v.d, k.d), z.toD = k.d, w = 0, u = 1) : v.attr ? w = v.attr(f) : (w = parseFloat(a.getStyle(v, f)) ||
                    0, "opacity" !== f && (t = "px"));
                u || (u = g);
                u && u.match && u.match("px") && (u = u.replace(/px/g, ""));
                z.run(w, u, t)
            })
        };
        a.seriesType = function (v, k, q, w, t) {
            var u = a.getOptions(), z = a.seriesTypes;
            u.plotOptions[v] = a.merge(u.plotOptions[k], q);
            z[v] = a.extendClass(z[k] || function () {
            }, w);
            z[v].prototype.type = v;
            t && (z[v].prototype.pointClass = a.extendClass(a.Point, t));
            return z[v]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), k = 0;
            return function () {
                return"highcharts-" + a + "-" + k++
            }
        }();
        H.jQuery && (H.jQuery.fn.highcharts =
            function () {
                var v = [].slice.call(arguments);
                if (this[0])return v[0] ? (new (a[a.isString(v[0]) ? v.shift() : "Chart"])(this[0], v[0], v[1]), this) : G[a.attr(this[0], "data-highcharts-chart")]
            })
    })(L);
    (function (a) {
        var G = a.each, E = a.isNumber, H = a.map, v = a.merge, k = a.pInt;
        a.Color = function (q) {
            if (!(this instanceof a.Color))return new a.Color(q);
            this.init(q)
        };
        a.Color.prototype = {parsers: [
            {regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (a) {
                return[k(a[1]), k(a[2]),
                    k(a[3]), parseFloat(a[4], 10)]
            }},
            {regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) {
                return[k(a[1]), k(a[2]), k(a[3]), 1]
            }}
        ], names: {none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000"}, init: function (q) {
            var k, t, u, z;
            if ((this.input = q = this.names[q && q.toLowerCase ? q.toLowerCase() : ""] || q) && q.stops)this.stops = H(q.stops, function (m) {
                return new a.Color(m[1])
            }); else if (q && q.charAt && "#" === q.charAt() && (k = q.length, q = parseInt(q.substr(1), 16), 7 === k ? t = [(q & 16711680) >> 16, (q & 65280) >>
                8, q & 255, 1] : 4 === k && (t = [(q & 3840) >> 4 | (q & 3840) >> 8, (q & 240) >> 4 | q & 240, (q & 15) << 4 | q & 15, 1])), !t)for (u = this.parsers.length; u-- && !t;)z = this.parsers[u], (k = z.regex.exec(q)) && (t = z.parse(k));
            this.rgba = t || []
        }, get: function (a) {
            var q = this.input, t = this.rgba, u;
            this.stops ? (u = v(q), u.stops = [].concat(u.stops), G(this.stops, function (t, m) {
                u.stops[m] = [u.stops[m][0], t.get(a)]
            })) : u = t && E(t[0]) ? "rgb" === a || !a && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" === a ? t[3] : "rgba(" + t.join(",") + ")" : q;
            return u
        }, brighten: function (a) {
            var q, t = this.rgba;
            if (this.stops)G(this.stops, function (t) {
                t.brighten(a)
            }); else if (E(a) && 0 !== a)for (q = 0; 3 > q; q++)t[q] += k(255 * a), 0 > t[q] && (t[q] = 0), 255 < t[q] && (t[q] = 255);
            return this
        }, setOpacity: function (a) {
            this.rgba[3] = a;
            return this
        }, tweenTo: function (a, k) {
            var t = this.rgba, u = a.rgba;
            u.length && t && t.length ? (a = 1 !== u[3] || 1 !== t[3], k = (a ? "rgba(" : "rgb(") + Math.round(u[0] + (t[0] - u[0]) * (1 - k)) + "," + Math.round(u[1] + (t[1] - u[1]) * (1 - k)) + "," + Math.round(u[2] + (t[2] - u[2]) * (1 - k)) + (a ? "," + (u[3] + (t[3] - u[3]) * (1 - k)) : "") + ")") : k = a.input || "none";
            return k
        }};
        a.color = function (k) {
            return new a.Color(k)
        }
    })(L);
    (function (a) {
        var G, E, H = a.addEvent, v = a.animate, k = a.attr, q = a.charts, w = a.color, t = a.css, u = a.createElement, z = a.defined, m = a.deg2rad, g = a.destroyObjectProperties, f = a.doc, e = a.each, c = a.extend, b = a.erase, r = a.grep, l = a.hasTouch, C = a.inArray, I = a.isArray, x = a.isFirefox, F = a.isMS, n = a.isObject, B = a.isString, J = a.isWebKit, A = a.merge, d = a.noop, p = a.objectEach, D = a.pick, h = a.pInt, y = a.removeEvent, P = a.stop, M = a.svg, O = a.SVG_NS, N = a.symbolSizes, R = a.win;
        G = a.SVGElement = function () {
            return this
        };
        c(G.prototype, {opacity: 1, SVG_NS: O, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "), init: function (a, h) {
            this.element = "span" === h ? u(h) : f.createElementNS(this.SVG_NS, h);
            this.renderer = a
        }, animate: function (K, h, d) {
            h = a.animObject(D(h, this.renderer.globalAnimation, !0));
            0 !== h.duration ? (d && (h.complete = d), v(this, K, h)) : (this.attr(K, null, d), h.step && h.step.call(this));
            return this
        }, colorGradient: function (h, d, y) {
            var K =
                this.renderer, b, c, l, n, r, f, S, M, C, D, g = [], B;
            h.radialGradient ? c = "radialGradient" : h.linearGradient && (c = "linearGradient");
            c && (l = h[c], r = K.gradients, S = h.stops, D = y.radialReference, I(l) && (h[c] = l = {x1: l[0], y1: l[1], x2: l[2], y2: l[3], gradientUnits: "userSpaceOnUse"}), "radialGradient" === c && D && !z(l.gradientUnits) && (n = l, l = A(l, K.getRadialAttr(D, n), {gradientUnits: "userSpaceOnUse"})), p(l, function (a, h) {
                "id" !== h && g.push(h, a)
            }), p(S, function (a) {
                g.push(a)
            }), g = g.join(","), r[g] ? D = r[g].attr("id") : (l.id = D = a.uniqueKey(), r[g] = f = K.createElement(c).attr(l).add(K.defs),
                f.radAttr = n, f.stops = [], e(S, function (h) {
                0 === h[1].indexOf("rgba") ? (b = a.color(h[1]), M = b.get("rgb"), C = b.get("a")) : (M = h[1], C = 1);
                h = K.createElement("stop").attr({offset: h[0], "stop-color": M, "stop-opacity": C}).add(f);
                f.stops.push(h)
            })), B = "url(" + K.url + "#" + D + ")", y.setAttribute(d, B), y.gradient = g, h.toString = function () {
                return B
            })
        }, applyTextOutline: function (h) {
            var K = this.element, d, y, c, p, l;
            -1 !== h.indexOf("contrast") && (h = h.replace(/contrast/g, this.renderer.getContrast(K.style.fill)));
            h = h.split(" ");
            y = h[h.length - 1];
            if ((c = h[0]) && "none" !== c && a.svg) {
                this.fakeTS = !0;
                h = [].slice.call(K.getElementsByTagName("tspan"));
                this.ySetter = this.xSetter;
                c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, h, K) {
                    return 2 * h + K
                });
                for (l = h.length; l--;)d = h[l], "highcharts-text-outline" === d.getAttribute("class") && b(h, K.removeChild(d));
                p = K.firstChild;
                e(h, function (a, h) {
                    0 === h && (a.setAttribute("x", K.getAttribute("x")), h = K.getAttribute("y"), a.setAttribute("y", h || 0), null === h && K.setAttribute("y", 0));
                    a = a.cloneNode(1);
                    k(a, {"class": "highcharts-text-outline",
                        fill: y, stroke: y, "stroke-width": c, "stroke-linejoin": "round"});
                    K.insertBefore(a, p)
                })
            }
        }, attr: function (a, h, d, y) {
            var K, b = this.element, c, l = this, e, n;
            "string" === typeof a && void 0 !== h && (K = a, a = {}, a[K] = h);
            "string" === typeof a ? l = (this[a + "Getter"] || this._defaultGetter).call(this, a, b) : (p(a, function (h, K) {
                e = !1;
                y || P(this, K);
                this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(K) && (c || (this.symbolAttr(a), c = !0), e = !0);
                !this.rotation || "x" !== K && "y" !== K || (this.doTransform = !0);
                e || (n = this[K + "Setter"] ||
                    this._defaultSetter, n.call(this, h, K, b), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(K) && this.updateShadows(K, h, n))
            }, this), this.afterSetters());
            d && d();
            return l
        }, afterSetters: function () {
            this.doTransform && (this.updateTransform(), this.doTransform = !1)
        }, updateShadows: function (a, h, d) {
            for (var K = this.shadows, y = K.length; y--;)d.call(K[y], "height" === a ? Math.max(h - (K[y].cutHeight || 0), 0) : "d" === a ? this.d : h, a, K[y])
        }, addClass: function (a, h) {
            var K = this.attr("class") || "";
            -1 === K.indexOf(a) &&
            (h || (a = (K + (K ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
            return this
        }, hasClass: function (a) {
            return-1 !== C(a, (this.attr("class") || "").split(" "))
        }, removeClass: function (a) {
            return this.attr("class", (this.attr("class") || "").replace(a, ""))
        }, symbolAttr: function (a) {
            var h = this;
            e("x y r start end width height innerR anchorX anchorY".split(" "), function (K) {
                h[K] = D(a[K], h[K])
            });
            h.attr({d: h.renderer.symbols[h.symbolName](h.x, h.y, h.width, h.height, h)})
        }, clip: function (a) {
            return this.attr("clip-path", a ? "url(" +
                this.renderer.url + "#" + a.id + ")" : "none")
        }, crisp: function (a, h) {
            var d;
            h = h || a.strokeWidth || 0;
            d = Math.round(h) % 2 / 2;
            a.x = Math.floor(a.x || this.x || 0) + d;
            a.y = Math.floor(a.y || this.y || 0) + d;
            a.width = Math.floor((a.width || this.width || 0) - 2 * d);
            a.height = Math.floor((a.height || this.height || 0) - 2 * d);
            z(a.strokeWidth) && (a.strokeWidth = h);
            return a
        }, css: function (a) {
            var d = this.styles, y = {}, K = this.element, b, e = "", l, n = !d, A = ["textOutline", "textOverflow", "width"];
            a && a.color && (a.fill = a.color);
            d && p(a, function (a, h) {
                a !== d[h] && (y[h] = a, n = !0)
            });
            n && (d && (a = c(d, y)), b = this.textWidth = a && a.width && "auto" !== a.width && "text" === K.nodeName.toLowerCase() && h(a.width), this.styles = a, b && !M && this.renderer.forExport && delete a.width, F && !M ? t(this.element, a) : (l = function (a, h) {
                return"-" + h.toLowerCase()
            }, p(a, function (a, h) {
                -1 === C(h, A) && (e += h.replace(/([A-Z])/g, l) + ":" + a + ";")
            }), e && k(K, "style", e)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
            return this
        }, strokeWidth: function () {
            return this["stroke-width"] ||
                0
        }, on: function (a, h) {
            var d = this, y = d.element;
            l && "click" === a ? (y.ontouchstart = function (a) {
                d.touchEventFired = Date.now();
                a.preventDefault();
                h.call(y, a)
            }, y.onclick = function (a) {
                (-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (d.touchEventFired || 0)) && h.call(y, a)
            }) : y["on" + a] = h;
            return this
        }, setRadialReference: function (a) {
            var h = this.renderer.gradients[this.element.gradient];
            this.element.radialReference = a;
            h && h.radAttr && h.animate(this.renderer.getRadialAttr(a, h.radAttr));
            return this
        }, translate: function (a, h) {
            return this.attr({translateX: a, translateY: h})
        }, invert: function (a) {
            this.inverted = a;
            this.updateTransform();
            return this
        }, updateTransform: function () {
            var a = this.translateX || 0, h = this.translateY || 0, d = this.scaleX, y = this.scaleY, b = this.inverted, c = this.rotation, p = this.matrix, e = this.element;
            b && (a += this.width, h += this.height);
            a = ["translate(" + a + "," + h + ")"];
            z(p) && a.push("matrix(" + p.join(",") + ")");
            b ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + D(this.rotationOriginX, e.getAttribute("x"), 0) + " " + D(this.rotationOriginY,
                e.getAttribute("y") || 0) + ")");
            (z(d) || z(y)) && a.push("scale(" + D(d, 1) + " " + D(y, 1) + ")");
            a.length && e.setAttribute("transform", a.join(" "))
        }, toFront: function () {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        }, align: function (a, h, d) {
            var y, c, K, p, e = {};
            c = this.renderer;
            K = c.alignedObjects;
            var l, n;
            if (a) {
                if (this.alignOptions = a, this.alignByTranslate = h, !d || B(d))this.alignTo = y = d || "renderer", b(K, this), K.push(this), d = null
            } else a = this.alignOptions, h = this.alignByTranslate, y = this.alignTo;
            d = D(d, c[y], c);
            y = a.align;
            c = a.verticalAlign;
            K = (d.x || 0) + (a.x || 0);
            p = (d.y || 0) + (a.y || 0);
            "right" === y ? l = 1 : "center" === y && (l = 2);
            l && (K += (d.width - (a.width || 0)) / l);
            e[h ? "translateX" : "x"] = Math.round(K);
            "bottom" === c ? n = 1 : "middle" === c && (n = 2);
            n && (p += (d.height - (a.height || 0)) / n);
            e[h ? "translateY" : "y"] = Math.round(p);
            this[this.placed ? "animate" : "attr"](e);
            this.placed = !0;
            this.alignAttr = e;
            return this
        }, getBBox: function (a, h) {
            var d, y = this.renderer, b, p = this.element, K = this.styles, l, n = this.textStr, A, r = y.cache, f = y.cacheKeys, M;
            h = D(h, this.rotation);
            b = h * m;
            l = K && K.fontSize;
            z(n) && (M = n.toString(), -1 === M.indexOf("\x3c") && (M = M.replace(/[0-9]/g, "0")), M += ["", h || 0, l, K && K.width, K && K.textOverflow].join());
            M && !a && (d = r[M]);
            if (!d) {
                if (p.namespaceURI === this.SVG_NS || y.forExport) {
                    try {
                        (A = this.fakeTS && function (a) {
                            e(p.querySelectorAll(".highcharts-text-outline"), function (h) {
                                h.style.display = a
                            })
                        }) && A("none"), d = p.getBBox ? c({}, p.getBBox()) : {width: p.offsetWidth, height: p.offsetHeight}, A && A("")
                    } catch (T) {
                    }
                    if (!d || 0 > d.width)d = {width: 0, height: 0}
                } else d = this.htmlGetBBox();
                y.isSVG &&
                (a = d.width, y = d.height, K && "11px" === K.fontSize && 17 === Math.round(y) && (d.height = y = 14), h && (d.width = Math.abs(y * Math.sin(b)) + Math.abs(a * Math.cos(b)), d.height = Math.abs(y * Math.cos(b)) + Math.abs(a * Math.sin(b))));
                if (M && 0 < d.height) {
                    for (; 250 < f.length;)delete r[f.shift()];
                    r[M] || f.push(M);
                    r[M] = d
                }
            }
            return d
        }, show: function (a) {
            return this.attr({visibility: a ? "inherit" : "visible"})
        }, hide: function () {
            return this.attr({visibility: "hidden"})
        }, fadeOut: function (a) {
            var h = this;
            h.animate({opacity: 0}, {duration: a || 150, complete: function () {
                h.attr({y: -9999})
            }})
        },
            add: function (a) {
                var h = this.renderer, d = this.element, y;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && h.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex)y = this.zIndexSetter();
                y || (a ? a.element : h.box).appendChild(d);
                if (this.onAdd)this.onAdd();
                return this
            }, safeRemoveChild: function (a) {
                var h = a.parentNode;
                h && h.removeChild(a)
            }, destroy: function () {
                var a = this, h = a.element || {}, d = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup, y = h.ownerSVGElement;
                h.onclick = h.onmouseout =
                    h.onmouseover = h.onmousemove = h.point = null;
                P(a);
                a.clipPath && y && (e(y.querySelectorAll("[clip-path],[CLIP-PATH]"), function (h) {
                    h.getAttribute("clip-path").match(RegExp('[("]#' + a.clipPath.element.id + '[)"]')) && h.removeAttribute("clip-path")
                }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (y = 0; y < a.stops.length; y++)a.stops[y] = a.stops[y].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(h);
                for (a.destroyShadows(); d && d.div && 0 === d.div.childNodes.length;)h = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = h;
                a.alignTo &&
                b(a.renderer.alignedObjects, a);
                p(a, function (h, d) {
                    delete a[d]
                });
                return null
            }, shadow: function (a, h, d) {
                var y = [], b, c, p = this.element, e, l, K, n;
                if (!a)this.destroyShadows(); else if (!this.shadows) {
                    l = D(a.width, 3);
                    K = (a.opacity || .15) / l;
                    n = this.parentInverted ? "(-1,-1)" : "(" + D(a.offsetX, 1) + ", " + D(a.offsetY, 1) + ")";
                    for (b = 1; b <= l; b++)c = p.cloneNode(0), e = 2 * l + 1 - 2 * b, k(c, {isShadow: "true", stroke: a.color || "#000000", "stroke-opacity": K * b, "stroke-width": e, transform: "translate" + n, fill: "none"}), d && (k(c, "height", Math.max(k(c, "height") -
                        e, 0)), c.cutHeight = e), h ? h.element.appendChild(c) : p.parentNode && p.parentNode.insertBefore(c, p), y.push(c);
                    this.shadows = y
                }
                return this
            }, destroyShadows: function () {
                e(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            }, xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            }, _defaultGetter: function (a) {
                a = D(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            }, dSetter: function (a, h, d) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[h] !== a && (d.setAttribute(h, a), this[h] = a)
            }, dashstyleSetter: function (a) {
                var d, y = this["stroke-width"];
                "inherit" === y && (y = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (d = a.length; d--;)a[d] =
                        h(a[d]) * y;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            }, alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            }, opacitySetter: function (a, h, d) {
                this[h] = a;
                d.setAttribute(h, a)
            }, titleSetter: function (a) {
                var h = this.element.getElementsByTagName("title")[0];
                h || (h = f.createElementNS(this.SVG_NS, "title"), this.element.appendChild(h));
                h.firstChild && h.removeChild(h.firstChild);
                h.appendChild(f.createTextNode(String(D(a),
                    "").replace(/<[^>]*>/g, "")))
            }, textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            }, fillSetter: function (a, h, d) {
                "string" === typeof a ? d.setAttribute(h, a) : a && this.colorGradient(a, h, d)
            }, visibilitySetter: function (a, h, d) {
                "inherit" === a ? d.removeAttribute(h) : this[h] !== a && d.setAttribute(h, a);
                this[h] = a
            }, zIndexSetter: function (a, d) {
                var y = this.renderer, b = this.parentGroup, c = (b || y).element || y.box, p, e = this.element, l, n, y = c === y.box;
                p = this.added;
                var A;
                z(a) &&
                (e.zIndex = a, a = +a, this[d] === a && (p = !1), this[d] = a);
                if (p) {
                    (a = this.zIndex) && b && (b.handleZ = !0);
                    d = c.childNodes;
                    for (A = d.length - 1; 0 <= A && !l; A--)if (b = d[A], p = b.zIndex, n = !z(p), b !== e)if (0 > a && n && !y && !A)c.insertBefore(e, d[A]), l = !0; else if (h(p) <= a || n && (!z(a) || 0 <= a))c.insertBefore(e, d[A + 1] || null), l = !0;
                    l || (c.insertBefore(e, d[y ? 3 : 0] || null), l = !0)
                }
                return l
            }, _defaultSetter: function (a, h, d) {
                d.setAttribute(h, a)
            }});
        G.prototype.yGetter = G.prototype.xGetter;
        G.prototype.translateXSetter = G.prototype.translateYSetter = G.prototype.rotationSetter =
            G.prototype.verticalAlignSetter = G.prototype.rotationOriginXSetter = G.prototype.rotationOriginYSetter = G.prototype.scaleXSetter = G.prototype.scaleYSetter = G.prototype.matrixSetter = function (a, h) {
                this[h] = a;
                this.doTransform = !0
            };
        G.prototype["stroke-widthSetter"] = G.prototype.strokeSetter = function (a, h, d) {
            this[h] = a;
            this.stroke && this["stroke-width"] ? (G.prototype.fillSetter.call(this, this.stroke, "stroke", d), d.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === h && 0 === a && this.hasStroke &&
                (d.removeAttribute("stroke"), this.hasStroke = !1)
        };
        E = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        c(E.prototype, {Element: G, SVG_NS: O, init: function (a, h, d, y, b, c) {
            var p;
            y = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"}).css(this.getStyle(y));
            p = y.element;
            a.appendChild(p);
            k(a, "dir", "ltr");
            -1 === a.innerHTML.indexOf("xmlns") && k(p, "xmlns", this.SVG_NS);
            this.isSVG = !0;
            this.box = p;
            this.boxWrapper = y;
            this.alignedObjects = [];
            this.url = (x || J) && f.getElementsByTagName("base").length ?
                R.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(f.createTextNode("Created with Highstock 6.0.4"));
            this.defs = this.createElement("defs").add();
            this.allowHTML = c;
            this.forExport = b;
            this.gradients = {};
            this.cache = {};
            this.cacheKeys = [];
            this.imgCount = 0;
            this.setSize(h, d, !1);
            var e;
            x && a.getBoundingClientRect && (h = function () {
                t(a, {left: 0, top: 0});
                e = a.getBoundingClientRect();
                t(a, {left: Math.ceil(e.left) -
                    e.left + "px", top: Math.ceil(e.top) - e.top + "px"})
            }, h(), this.unSubPixelFix = H(R, "resize", h))
        }, getStyle: function (a) {
            return this.style = c({fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px"}, a)
        }, setStyle: function (a) {
            this.boxWrapper.css(this.getStyle(a))
        }, isHidden: function () {
            return!this.boxWrapper.getBBox().width
        }, destroy: function () {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            g(this.gradients || {});
            this.gradients = null;
            a && (this.defs = a.destroy());
            this.unSubPixelFix && this.unSubPixelFix();
            return this.alignedObjects = null
        }, createElement: function (a) {
            var h = new this.Element;
            h.init(this, a);
            return h
        }, draw: d, getRadialAttr: function (a, h) {
            return{cx: a[0] - a[2] / 2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2], r: h.r * a[2]}
        }, getSpanWidth: function (a, h) {
            var d = a.getBBox(!0).width;
            !M && this.forExport && (d = this.measureSpanWidth(h.firstChild.data, a.styles));
            return d
        }, applyEllipsis: function (a, h, d, y) {
            var b = a.rotation, c = d, p, e = 0, l = d.length, n = function (a) {
                h.removeChild(h.firstChild);
                a && h.appendChild(f.createTextNode(a))
            }, A;
            a.rotation = 0;
            c = this.getSpanWidth(a, h);
            if (A = c > y) {
                for (; e <= l;)p = Math.ceil((e + l) / 2), c = d.substring(0, p) + "\u2026", n(c), c = this.getSpanWidth(a, h), e === l ? e = l + 1 : c > y ? l = p - 1 : e = p;
                0 === l && n("")
            }
            a.rotation = b;
            return A
        }, escapes: {"\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;"}, buildText: function (a) {
            var d = a.element, y = this, b = y.forExport, c = D(a.textStr, "").toString(), l = -1 !== c.indexOf("\x3c"), n = d.childNodes, A, K, C, g, B = k(d, "x"), x = a.styles, m = a.textWidth,
                N = x && x.lineHeight, P = x && x.textOutline, F = x && "ellipsis" === x.textOverflow, I = x && "nowrap" === x.whiteSpace, u = x && x.fontSize, R, q, J = n.length, x = m && !a.added && this.box, z = function (a) {
                    var b;
                    b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : u || y.style.fontSize || 12;
                    return N ? h(N) : y.fontMetrics(b, a.getAttribute("style") ? a : d).h
                }, w = function (a) {
                    p(y.escapes, function (h, d) {
                        a = a.replace(new RegExp(h, "g"), d)
                    });
                    return a
                };
            R = [c, F, I, N, P, u, m].join();
            if (R !== a.textCache) {
                for (a.textCache = R; J--;)d.removeChild(n[J]);
                l || P || F || m ||
                    -1 !== c.indexOf(" ") ? (A = /<.*class="([^"]+)".*>/, K = /<.*style="([^"]+)".*>/, C = /<.*href="([^"]+)".*>/, x && x.appendChild(d), c = l ? c.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [c], c = r(c, function (a) {
                    return"" !== a
                }), e(c, function (h, c) {
                    var p, l = 0;
                    h = h.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                    p = h.split("|||");
                    e(p, function (h) {
                        if ("" !== h || 1 === p.length) {
                            var e = {}, n = f.createElementNS(y.SVG_NS, "tspan"), r, D;
                            A.test(h) && (r = h.match(A)[1], k(n, "class", r));
                            K.test(h) && (D = h.match(K)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), k(n, "style", D));
                            C.test(h) && !b && (k(n, "onclick", 'location.href\x3d"' + h.match(C)[1] + '"'), k(n, "class", "highcharts-anchor"), t(n, {cursor: "pointer"}));
                            h = w(h.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                            if (" " !== h) {
                                n.appendChild(f.createTextNode(h));
                                l ? e.dx = 0 : c && null !== B && (e.x = B);
                                k(n, e);
                                d.appendChild(n);
                                !l && q && (!M && b && t(n, {display: "block"}), k(n, "dy", z(n)));
                                if (m) {
                                    e = h.replace(/([^\^])-/g, "$1- ").split(" ");
                                    r = 1 < p.length || c || 1 < e.length && !I;
                                    var x = [], N, P = z(n), S = a.rotation;
                                    for (F && (g = y.applyEllipsis(a, n, h, m)); !F && r && (e.length || x.length);)a.rotation = 0, N = y.getSpanWidth(a, n), h = N > m, void 0 === g && (g = h), h && 1 !== e.length ? (n.removeChild(n.firstChild), x.unshift(e.pop())) : (e = x, x = [], e.length && !I && (n = f.createElementNS(O, "tspan"), k(n, {dy: P, x: B}), D && k(n, "style", D), d.appendChild(n)), N > m && (m = N)), e.length && n.appendChild(f.createTextNode(e.join(" ").replace(/- /g,
                                        "-")));
                                    a.rotation = S
                                }
                                l++
                            }
                        }
                    });
                    q = q || d.childNodes.length
                }), g && a.attr("title", a.textStr), x && x.removeChild(d), P && a.applyTextOutline && a.applyTextOutline(P)) : d.appendChild(f.createTextNode(w(c)))
            }
        }, getContrast: function (a) {
            a = w(a).rgba;
            return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
        }, button: function (a, h, d, y, b, p, e, l, n) {
            var r = this.label(a, h, d, n, null, null, null, null, "button"), f = 0;
            r.attr(A({padding: 8, r: 2}, b));
            var M, C, D, K;
            b = A({fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: {color: "#333333", cursor: "pointer",
                fontWeight: "normal"}}, b);
            M = b.style;
            delete b.style;
            p = A(b, {fill: "#e6e6e6"}, p);
            C = p.style;
            delete p.style;
            e = A(b, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, e);
            D = e.style;
            delete e.style;
            l = A(b, {style: {color: "#cccccc"}}, l);
            K = l.style;
            delete l.style;
            H(r.element, F ? "mouseover" : "mouseenter", function () {
                3 !== f && r.setState(1)
            });
            H(r.element, F ? "mouseout" : "mouseleave", function () {
                3 !== f && r.setState(f)
            });
            r.setState = function (a) {
                1 !== a && (r.state = f = a);
                r.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" +
                    ["normal", "hover", "pressed", "disabled"][a || 0]);
                r.attr([b, p, e, l][a || 0]).css([M, C, D, K][a || 0])
            };
            r.attr(b).css(c({cursor: "default"}, M));
            return r.on("click", function (a) {
                3 !== f && y.call(r, a)
            })
        }, crispLine: function (a, h) {
            a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);
            return a
        }, path: function (a) {
            var h = {fill: "none"};
            I(a) ? h.d = a : n(a) && c(h, a);
            return this.createElement("path").attr(h)
        }, circle: function (a, h, d) {
            a = n(a) ? a : {x: a, y: h, r: d};
            h = this.createElement("circle");
            h.xSetter =
                h.ySetter = function (a, h, d) {
                    d.setAttribute("c" + h, a)
                };
            return h.attr(a)
        }, arc: function (a, h, d, y, b, c) {
            n(a) ? (y = a, h = y.y, d = y.r, a = y.x) : y = {innerR: y, start: b, end: c};
            a = this.symbol("arc", a, h, d, d, y);
            a.r = d;
            return a
        }, rect: function (a, h, d, y, b, c) {
            b = n(a) ? a.r : b;
            var p = this.createElement("rect");
            a = n(a) ? a : void 0 === a ? {} : {x: a, y: h, width: Math.max(d, 0), height: Math.max(y, 0)};
            void 0 !== c && (a.strokeWidth = c, a = p.crisp(a));
            a.fill = "none";
            b && (a.r = b);
            p.rSetter = function (a, h, d) {
                k(d, {rx: a, ry: a})
            };
            return p.attr(a)
        }, setSize: function (a, h, d) {
            var y =
                this.alignedObjects, b = y.length;
            this.width = a;
            this.height = h;
            for (this.boxWrapper.animate({width: a, height: h}, {step: function () {
                this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
            }, duration: D(d, !0) ? void 0 : 0}); b--;)y[b].align()
        }, g: function (a) {
            var h = this.createElement("g");
            return a ? h.attr({"class": "highcharts-" + a}) : h
        }, image: function (a, h, d, y, b) {
            var p = {preserveAspectRatio: "none"};
            1 < arguments.length && c(p, {x: h, y: d, width: y, height: b});
            p = this.createElement("image").attr(p);
            p.element.setAttributeNS ?
                p.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : p.element.setAttribute("hc-svg-href", a);
            return p
        }, symbol: function (a, h, d, y, b, p) {
            var l = this, n, A = /^url\((.*?)\)$/, r = A.test(a), M = !r && (this.symbols[a] ? a : "circle"), C = M && this.symbols[M], g = z(h) && C && C.call(this.symbols, Math.round(h), Math.round(d), y, b, p), x, B;
            C ? (n = this.path(g), n.attr("fill", "none"), c(n, {symbolName: M, x: h, y: d, width: y, height: b}), p && c(n, p)) : r && (x = a.match(A)[1], n = this.image(x), n.imgwidth = D(N[x] && N[x].width, p && p.width), n.imgheight =
                D(N[x] && N[x].height, p && p.height), B = function () {
                n.attr({width: n.width, height: n.height})
            }, e(["width", "height"], function (a) {
                n[a + "Setter"] = function (a, h) {
                    var d = {}, y = this["img" + h], b = "width" === h ? "translateX" : "translateY";
                    this[h] = a;
                    z(y) && (this.element && this.element.setAttribute(h, y), this.alignByTranslate || (d[b] = ((this[h] || 0) - y) / 2, this.attr(d)))
                }
            }), z(h) && n.attr({x: h, y: d}), n.isImg = !0, z(n.imgwidth) && z(n.imgheight) ? B() : (n.attr({width: 0, height: 0}), u("img", {onload: function () {
                var a = q[l.chartIndex];
                0 === this.width &&
                (t(this, {position: "absolute", top: "-999em"}), f.body.appendChild(this));
                N[x] = {width: this.width, height: this.height};
                n.imgwidth = this.width;
                n.imgheight = this.height;
                n.element && B();
                this.parentNode && this.parentNode.removeChild(this);
                l.imgCount--;
                if (!l.imgCount && a && a.onload)a.onload()
            }, src: x}), this.imgCount++));
            return n
        }, symbols: {circle: function (a, h, d, y) {
            return this.arc(a + d / 2, h + y / 2, d / 2, y / 2, {start: 0, end: 2 * Math.PI, open: !1})
        }, square: function (a, h, d, y) {
            return["M", a, h, "L", a + d, h, a + d, h + y, a, h + y, "Z"]
        }, triangle: function (a, h, d, y) {
            return["M", a + d / 2, h, "L", a + d, h + y, a, h + y, "Z"]
        }, "triangle-down": function (a, h, d, y) {
            return["M", a, h, "L", a + d, h, a + d / 2, h + y, "Z"]
        }, diamond: function (a, h, d, y) {
            return["M", a + d / 2, h, "L", a + d, h + y / 2, a + d / 2, h + y, a, h + y / 2, "Z"]
        }, arc: function (a, h, d, y, b) {
            var p = b.start, c = b.r || d, e = b.r || y || d, n = b.end - .001;
            d = b.innerR;
            y = D(b.open, .001 > Math.abs(b.end - b.start - 2 * Math.PI));
            var l = Math.cos(p), A = Math.sin(p), r = Math.cos(n), n = Math.sin(n);
            b = .001 > b.end - p - Math.PI ? 0 : 1;
            c = ["M", a + c * l, h + e * A, "A", c, e, 0, b, 1, a + c * r, h + e * n];
            z(d) && c.push(y ? "M" : "L", a + d *
                r, h + d * n, "A", d, d, 0, b, 0, a + d * l, h + d * A);
            c.push(y ? "" : "Z");
            return c
        }, callout: function (a, h, d, y, b) {
            var p = Math.min(b && b.r || 0, d, y), c = p + 6, e = b && b.anchorX;
            b = b && b.anchorY;
            var n;
            n = ["M", a + p, h, "L", a + d - p, h, "C", a + d, h, a + d, h, a + d, h + p, "L", a + d, h + y - p, "C", a + d, h + y, a + d, h + y, a + d - p, h + y, "L", a + p, h + y, "C", a, h + y, a, h + y, a, h + y - p, "L", a, h + p, "C", a, h, a, h, a + p, h];
            e && e > d ? b > h + c && b < h + y - c ? n.splice(13, 3, "L", a + d, b - 6, a + d + 6, b, a + d, b + 6, a + d, h + y - p) : n.splice(13, 3, "L", a + d, y / 2, e, b, a + d, y / 2, a + d, h + y - p) : e && 0 > e ? b > h + c && b < h + y - c ? n.splice(33, 3, "L", a, b + 6, a - 6, b, a, b - 6,
                a, h + p) : n.splice(33, 3, "L", a, y / 2, e, b, a, y / 2, a, h + p) : b && b > y && e > a + c && e < a + d - c ? n.splice(23, 3, "L", e + 6, h + y, e, h + y + 6, e - 6, h + y, a + p, h + y) : b && 0 > b && e > a + c && e < a + d - c && n.splice(3, 3, "L", e - 6, h, e, h - 6, e + 6, h, d - p, h);
            return n
        }}, clipRect: function (h, d, y, b) {
            var p = a.uniqueKey(), c = this.createElement("clipPath").attr({id: p}).add(this.defs);
            h = this.rect(h, d, y, b, 0).add(c);
            h.id = p;
            h.clipPath = c;
            h.count = 0;
            return h
        }, text: function (a, h, d, y) {
            var b = {};
            if (y && (this.allowHTML || !this.forExport))return this.html(a, h, d);
            b.x = Math.round(h || 0);
            d && (b.y =
                Math.round(d));
            if (a || 0 === a)b.text = a;
            a = this.createElement("text").attr(b);
            y || (a.xSetter = function (a, h, d) {
                var y = d.getElementsByTagName("tspan"), b, p = d.getAttribute(h), c;
                for (c = 0; c < y.length; c++)b = y[c], b.getAttribute(h) === p && b.setAttribute(h, a);
                d.setAttribute(h, a)
            });
            return a
        }, fontMetrics: function (a, d) {
            a = a || d && d.style && d.style.fontSize || this.style && this.style.fontSize;
            a = /px/.test(a) ? h(a) : /em/.test(a) ? parseFloat(a) * (d ? this.fontMetrics(null, d.parentNode).f : 16) : 12;
            d = 24 > a ? a + 3 : Math.round(1.2 * a);
            return{h: d, b: Math.round(.8 *
                d), f: a}
        }, rotCorr: function (a, h, d) {
            var y = a;
            h && d && (y = Math.max(y * Math.cos(h * m), 4));
            return{x: -a / 3 * Math.sin(h * m), y: y}
        }, label: function (h, d, b, p, n, l, r, f, M) {
            var C = this, D = C.g("button" !== M && "label"), g = D.text = C.text("", 0, 0, r).attr({zIndex: 1}), x, B, m = 0, N = 3, P = 0, F, t, I, u, K, O = {}, R, k, q = /^url\((.*?)\)$/.test(p), J = q, w, S, v, W;
            M && D.addClass("highcharts-" + M);
            J = q;
            w = function () {
                return(R || 0) % 2 / 2
            };
            S = function () {
                var a = g.element.style, h = {};
                B = (void 0 === F || void 0 === t || K) && z(g.textStr) && g.getBBox();
                D.width = (F || B.width || 0) + 2 * N + P;
                D.height =
                    (t || B.height || 0) + 2 * N;
                k = N + C.fontMetrics(a && a.fontSize, g).b;
                J && (x || (D.box = x = C.symbols[p] || q ? C.symbol(p) : C.rect(), x.addClass(("button" === M ? "" : "highcharts-label-box") + (M ? " highcharts-" + M + "-box" : "")), x.add(D), a = w(), h.x = a, h.y = (f ? -k : 0) + a), h.width = Math.round(D.width), h.height = Math.round(D.height), x.attr(c(h, O)), O = {})
            };
            v = function () {
                var a = P + N, h;
                h = f ? 0 : k;
                z(F) && B && ("center" === K || "right" === K) && (a += {center: .5, right: 1}[K] * (F - B.width));
                if (a !== g.x || h !== g.y)g.attr("x", a), void 0 !== h && g.attr("y", h);
                g.x = a;
                g.y = h
            };
            W = function (a, h) {
                x ? x.attr(a, h) : O[a] = h
            };
            D.onAdd = function () {
                g.add(D);
                D.attr({text: h || 0 === h ? h : "", x: d, y: b});
                x && z(n) && D.attr({anchorX: n, anchorY: l})
            };
            D.widthSetter = function (h) {
                F = a.isNumber(h) ? h : null
            };
            D.heightSetter = function (a) {
                t = a
            };
            D["text-alignSetter"] = function (a) {
                K = a
            };
            D.paddingSetter = function (a) {
                z(a) && a !== N && (N = D.padding = a, v())
            };
            D.paddingLeftSetter = function (a) {
                z(a) && a !== P && (P = a, v())
            };
            D.alignSetter = function (a) {
                a = {left: 0, center: .5, right: 1}[a];
                a !== m && (m = a, B && D.attr({x: I}))
            };
            D.textSetter = function (a) {
                void 0 !== a && g.textSetter(a);
                S();
                v()
            };
            D["stroke-widthSetter"] = function (a, h) {
                a && (J = !0);
                R = this["stroke-width"] = a;
                W(h, a)
            };
            D.strokeSetter = D.fillSetter = D.rSetter = function (a, h) {
                "r" !== h && ("fill" === h && a && (J = !0), D[h] = a);
                W(h, a)
            };
            D.anchorXSetter = function (a, h) {
                n = D.anchorX = a;
                W(h, Math.round(a) - w() - I)
            };
            D.anchorYSetter = function (a, h) {
                l = D.anchorY = a;
                W(h, a - u)
            };
            D.xSetter = function (a) {
                D.x = a;
                m && (a -= m * ((F || B.width) + 2 * N));
                I = Math.round(a);
                D.attr("translateX", I)
            };
            D.ySetter = function (a) {
                u = D.y = Math.round(a);
                D.attr("translateY", u)
            };
            var aa = D.css;
            return c(D,
                {css: function (a) {
                    if (a) {
                        var h = {};
                        a = A(a);
                        e(D.textProps, function (d) {
                            void 0 !== a[d] && (h[d] = a[d], delete a[d])
                        });
                        g.css(h)
                    }
                    return aa.call(D, a)
                }, getBBox: function () {
                    return{width: B.width + 2 * N, height: B.height + 2 * N, x: B.x - N, y: B.y - N}
                }, shadow: function (a) {
                    a && (S(), x && x.shadow(a));
                    return D
                }, destroy: function () {
                    y(D.element, "mouseenter");
                    y(D.element, "mouseleave");
                    g && (g = g.destroy());
                    x && (x = x.destroy());
                    G.prototype.destroy.call(D);
                    D = C = S = v = W = null
                }})
        }});
        a.Renderer = E
    })(L);
    (function (a) {
        var G = a.attr, E = a.createElement, H = a.css, v =
            a.defined, k = a.each, q = a.extend, w = a.isFirefox, t = a.isMS, u = a.isWebKit, z = a.pick, m = a.pInt, g = a.SVGRenderer, f = a.win, e = a.wrap;
        q(a.SVGElement.prototype, {htmlCss: function (a) {
            var b = this.element;
            if (b = a && "SPAN" === b.tagName && a.width)delete a.width, this.textWidth = b, this.updateTransform();
            a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
            this.styles = q(this.styles, a);
            H(this.element, a);
            return this
        }, htmlGetBBox: function () {
            var a = this.element;
            return{x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth,
                height: a.offsetHeight}
        }, htmlUpdateTransform: function () {
            if (this.added) {
                var a = this.renderer, b = this.element, e = this.translateX || 0, l = this.translateY || 0, f = this.x || 0, g = this.y || 0, x = this.textAlign || "left", F = {left: 0, center: .5, right: 1}[x], n = this.styles;
                H(b, {marginLeft: e, marginTop: l});
                this.shadows && k(this.shadows, function (a) {
                    H(a, {marginLeft: e + 1, marginTop: l + 1})
                });
                this.inverted && k(b.childNodes, function (d) {
                    a.invertChild(d, b)
                });
                if ("SPAN" === b.tagName) {
                    var B = this.rotation, t = m(this.textWidth), A = n && n.whiteSpace, d = [B,
                        x, b.innerHTML, this.textWidth, this.textAlign].join();
                    d !== this.cTT && (n = a.fontMetrics(b.style.fontSize).b, v(B) && this.setSpanRotation(B, F, n), H(b, {width: "", whiteSpace: A || "nowrap"}), b.offsetWidth > t && /[ \-]/.test(b.textContent || b.innerText) && H(b, {width: t + "px", display: "block", whiteSpace: A || "normal"}), this.getSpanCorrection(b.offsetWidth, n, F, B, x));
                    H(b, {left: f + (this.xCorr || 0) + "px", top: g + (this.yCorr || 0) + "px"});
                    u && (n = b.offsetHeight);
                    this.cTT = d
                }
            } else this.alignOnAdd = !0
        }, setSpanRotation: function (a, b, e) {
            var c = {},
                r = this.renderer.getTransformKey();
            c[r] = c.transform = "rotate(" + a + "deg)";
            c[r + (w ? "Origin" : "-origin")] = c.transformOrigin = 100 * b + "% " + e + "px";
            H(this.element, c)
        }, getSpanCorrection: function (a, b, e) {
            this.xCorr = -a * e;
            this.yCorr = -b
        }});
        q(g.prototype, {getTransformKey: function () {
            return t && !/Edge/.test(f.navigator.userAgent) ? "-ms-transform" : u ? "-webkit-transform" : w ? "MozTransform" : f.opera ? "-o-transform" : ""
        }, html: function (a, b, r) {
            var c = this.createElement("span"), f = c.element, g = c.renderer, x = g.isSVG, m = function (a, b) {
                k(["opacity",
                    "visibility"], function (c) {
                    e(a, c + "Setter", function (a, d, c, e) {
                        a.call(this, d, c, e);
                        b[c] = d
                    })
                })
            };
            c.textSetter = function (a) {
                a !== f.innerHTML && delete this.bBox;
                this.textStr = a;
                f.innerHTML = z(a, "");
                c.htmlUpdateTransform()
            };
            x && m(c, c.element.style);
            c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, b) {
                "align" === b && (b = "textAlign");
                c[b] = a;
                c.htmlUpdateTransform()
            };
            c.attr({text: a, x: Math.round(b), y: Math.round(r)}).css({fontFamily: this.style.fontFamily, fontSize: this.style.fontSize, position: "absolute"});
            f.style.whiteSpace =
                "nowrap";
            c.css = c.htmlCss;
            x && (c.add = function (a) {
                var b, e = g.box.parentNode, n = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (; a;)n.push(a), a = a.parentGroup;
                        k(n.reverse(), function (a) {
                            function d(h, d) {
                                a[d] = h;
                                t ? l[g.getTransformKey()] = "translate(" + (a.x || a.translateX) + "px," + (a.y || a.translateY) + "px)" : "translateX" === d ? l.left = h + "px" : l.top = h + "px";
                                a.doTransform = !0
                            }

                            var l, h = G(a.element, "class");
                            h && (h = {className: h});
                            b = a.div = a.div || E("div", h, {position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display,
                                opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents}, b || e);
                            l = b.style;
                            q(a, {classSetter: function (a) {
                                return function (h) {
                                    this.element.setAttribute("class", h);
                                    a.className = h
                                }
                            }(b), on: function () {
                                n[0].div && c.on.apply({element: n[0].div}, arguments);
                                return a
                            }, translateXSetter: d, translateYSetter: d});
                            m(a, l)
                        })
                    }
                } else b = e;
                b.appendChild(f);
                c.added = !0;
                c.alignOnAdd && c.htmlUpdateTransform();
                return c
            });
            return c
        }})
    })(L);
    (function (a) {
        function G() {
            var t = a.defaultOptions.global, u = w.moment;
            if (t.timezone) {
                if (u)return function (a) {
                    return-u.tz(a,
                        t.timezone).utcOffset()
                };
                a.error(25)
            }
            return t.useUTC && t.getTimezoneOffset
        }

        function E() {
            var t = a.defaultOptions.global, u, k = t.useUTC, m = k ? "getUTC" : "get", g = k ? "setUTC" : "set", f = "Minutes Hours Day Date Month FullYear".split(" "), e = f.concat(["Milliseconds", "Seconds"]);
            a.Date = u = t.Date || w.Date;
            u.hcTimezoneOffset = k && t.timezoneOffset;
            u.hcGetTimezoneOffset = G();
            u.hcHasTimeZone = !(!u.hcTimezoneOffset && !u.hcGetTimezoneOffset);
            u.hcMakeTime = function (a, b, e, l, f, g) {
                var c;
                k ? (c = u.UTC.apply(0, arguments), c += v(c)) : c = (new u(a,
                    b, q(e, 1), q(l, 0), q(f, 0), q(g, 0))).getTime();
                return c
            };
            for (t = 0; t < f.length; t++)u["hcGet" + f[t]] = m + f[t];
            for (t = 0; t < e.length; t++)u["hcSet" + e[t]] = g + e[t]
        }

        var H = a.color, v = a.getTZOffset, k = a.merge, q = a.pick, w = a.win;
        a.defaultOptions = {colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: {loading: "Loading...", months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " "}, global: {useUTC: !0}, chart: {borderRadius: 0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}}, width: null, height: null, borderColor: "#335cad",
            backgroundColor: "#ffffff", plotBorderColor: "#cccccc"}, title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44}, subtitle: {text: "", align: "center", widthAdjust: -44}, plotOptions: {}, labels: {style: {position: "absolute", color: "#333333"}}, legend: {enabled: !0, align: "center", layout: "horizontal", labelFormatter: function () {
            return this.name
        }, borderColor: "#999999", borderRadius: 0, navigation: {activeColor: "#003399", inactiveColor: "#cccccc"}, itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis"},
            itemHoverStyle: {color: "#000000"}, itemHiddenStyle: {color: "#cccccc"}, shadow: !1, itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"}, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: {style: {fontWeight: "bold"}}}, loading: {labelStyle: {fontWeight: "bold", position: "relative", top: "45%"}, style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}}, tooltip: {enabled: !0, animation: a.svg, borderRadius: 3, dateTimeLabelFormats: {millisecond: "%A, %b %e, %H:%M:%S.%L",
            second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y"}, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, backgroundColor: H("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e', shadow: !0,
            style: {color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap"}}, credits: {enabled: !0, href: "http://www.highcharts.com", position: {align: "right", x: -10, verticalAlign: "bottom", y: -5}, style: {cursor: "pointer", color: "#999999", fontSize: "9px"}, text: "Highcharts.com"}};
        a.setOptions = function (t) {
            a.defaultOptions = k(!0, a.defaultOptions, t);
            E();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        E()
    })(L);
    (function (a) {
        var G =
            a.correctFloat, E = a.defined, H = a.destroyObjectProperties, v = a.isNumber, k = a.merge, q = a.pick, w = a.deg2rad;
        a.Tick = function (a, u, k, m) {
            this.axis = a;
            this.pos = u;
            this.type = k || "";
            this.isNewLabel = this.isNew = !0;
            k || m || this.addLabel()
        };
        a.Tick.prototype = {addLabel: function () {
            var a = this.axis, u = a.options, z = a.chart, m = a.categories, g = a.names, f = this.pos, e = u.labels, c = a.tickPositions, b = f === c[0], r = f === c[c.length - 1], g = m ? q(m[f], g[f], f) : f, m = this.label, c = c.info, l;
            a.isDatetimeAxis && c && (l = u.dateTimeLabelFormats[c.higherRanks[f] || c.unitName]);
            this.isFirst = b;
            this.isLast = r;
            u = a.labelFormatter.call({axis: a, chart: z, isFirst: b, isLast: r, dateTimeLabelFormat: l, value: a.isLog ? G(a.lin2log(g)) : g, pos: f});
            E(m) ? m && m.attr({text: u}) : (this.labelLength = (this.label = m = E(u) && e.enabled ? z.renderer.text(u, 0, 0, e.useHTML).css(k(e.style)).add(a.labelGroup) : null) && m.getBBox().width, this.rotation = 0)
        }, getLabelSize: function () {
            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
        }, handleOverflow: function (a) {
            var t = this.axis, k = t.options.labels, m = a.x,
                g = t.chart.chartWidth, f = t.chart.spacing, e = q(t.labelLeft, Math.min(t.pos, f[3])), f = q(t.labelRight, Math.max(t.isRadial ? 0 : t.pos + t.len, g - f[1])), c = this.label, b = this.rotation, r = {left: 0, center: .5, right: 1}[t.labelAlign || c.attr("align")], l = c.getBBox().width, C = t.getSlotWidth(), I = C, x = 1, F, n = {};
            if (b || !1 === k.overflow)0 > b && m - r * l < e ? F = Math.round(m / Math.cos(b * w) - e) : 0 < b && m + r * l > f && (F = Math.round((g - m) / Math.cos(b * w))); else if (g = m + (1 - r) * l, m - r * l < e ? I = a.x + I * (1 - r) - e : g > f && (I = f - a.x + I * r, x = -1), I = Math.min(C, I), I < C && "center" === t.labelAlign &&
                (a.x += x * (C - I - r * (C - Math.min(l, I)))), l > I || t.autoRotation && (c.styles || {}).width)F = I;
            F && (n.width = F, (k.style || {}).textOverflow || (n.textOverflow = "ellipsis"), c.css(n))
        }, getPosition: function (a, k, q, m) {
            var g = this.axis, f = g.chart, e = m && f.oldChartHeight || f.chartHeight;
            return{x: a ? g.translate(k + q, null, null, m) + g.transB : g.left + g.offset + (g.opposite ? (m && f.oldChartWidth || f.chartWidth) - g.right - g.left : 0), y: a ? e - g.bottom + g.offset - (g.opposite ? g.height : 0) : e - g.translate(k + q, null, null, m) - g.transB}
        }, getLabelPosition: function (a, k, q, m, g, f, e, c) {
            var b = this.axis, r = b.transA, l = b.reversed, C = b.staggerLines, t = b.tickRotCorr || {x: 0, y: 0}, x = g.y, F = m || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1);
            E(x) || (x = 0 === b.side ? q.rotation ? -8 : -q.getBBox().height : 2 === b.side ? t.y + 8 : Math.cos(q.rotation * w) * (t.y - q.getBBox(!1, 0).height / 2));
            a = a + g.x + F + t.x - (f && m ? f * r * (l ? -1 : 1) : 0);
            k = k + x - (f && !m ? f * r * (l ? 1 : -1) : 0);
            C && (q = e / (c || 1) % C, b.opposite && (q = C - q - 1), k += b.labelOffset / C * q);
            return{x: a, y: Math.round(k)}
        }, getMarkPath: function (a, k, q, m, g, f) {
            return f.crispLine(["M",
                a, k, "L", a + (g ? 0 : -q), k + (g ? q : 0)], m)
        }, renderGridLine: function (a, k, q) {
            var m = this.axis, g = m.options, f = this.gridLine, e = {}, c = this.pos, b = this.type, r = m.tickmarkOffset, l = m.chart.renderer, C = b ? b + "Grid" : "grid", t = g[C + "LineWidth"], x = g[C + "LineColor"], g = g[C + "LineDashStyle"];
            f || (e.stroke = x, e["stroke-width"] = t, g && (e.dashstyle = g), b || (e.zIndex = 1), a && (e.opacity = 0), this.gridLine = f = l.path().attr(e).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(m.gridGroup));
            if (!a && f && (a = m.getPlotLinePath(c + r, f.strokeWidth() * q, a, !0)))f[this.isNew ?
                "attr" : "animate"]({d: a, opacity: k})
        }, renderMark: function (a, k, z) {
            var m = this.axis, g = m.options, f = m.chart.renderer, e = this.type, c = e ? e + "Tick" : "tick", b = m.tickSize(c), r = this.mark, l = !r, C = a.x;
            a = a.y;
            var t = q(g[c + "Width"], !e && m.isXAxis ? 1 : 0), g = g[c + "Color"];
            b && (m.opposite && (b[0] = -b[0]), l && (this.mark = r = f.path().addClass("highcharts-" + (e ? e + "-" : "") + "tick").add(m.axisGroup), r.attr({stroke: g, "stroke-width": t})), r[l ? "attr" : "animate"]({d: this.getMarkPath(C, a, b[0], r.strokeWidth() * z, m.horiz, f), opacity: k}))
        }, renderLabel: function (a, k, z, m) {
            var g = this.axis, f = g.horiz, e = g.options, c = this.label, b = e.labels, r = b.step, g = g.tickmarkOffset, l = !0, C = a.x;
            a = a.y;
            c && v(C) && (c.xy = a = this.getLabelPosition(C, a, c, f, b, g, m, r), this.isFirst && !this.isLast && !q(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !q(e.showLastLabel, 1) ? l = !1 : !f || b.step || b.rotation || k || 0 === z || this.handleOverflow(a), r && m % r && (l = !1), l && v(a.y) ? (a.opacity = z, c[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (c.attr("y", -9999), this.isNewLabel = !0))
        }, render: function (a, k, z) {
            var m =
                this.axis, g = m.horiz, f = this.getPosition(g, this.pos, m.tickmarkOffset, k), e = f.x, c = f.y, m = g && e === m.pos + m.len || !g && c === m.pos ? -1 : 1;
            z = q(z, 1);
            this.isActive = !0;
            this.renderGridLine(k, z, m);
            this.renderMark(f, z, m);
            this.renderLabel(f, k, z, a);
            this.isNew = !1
        }, destroy: function () {
            H(this, this.axis)
        }}
    })(L);
    var Z = function (a) {
        var G = a.addEvent, E = a.animObject, H = a.arrayMax, v = a.arrayMin, k = a.color, q = a.correctFloat, w = a.defaultOptions, t = a.defined, u = a.deg2rad, z = a.destroyObjectProperties, m = a.each, g = a.extend, f = a.fireEvent, e = a.format,
            c = a.getMagnitude, b = a.grep, r = a.inArray, l = a.isArray, C = a.isNumber, I = a.isString, x = a.merge, F = a.normalizeTickInterval, n = a.objectEach, B = a.pick, J = a.removeEvent, A = a.splat, d = a.syncTimeout, p = a.Tick, D = function () {
                this.init.apply(this, arguments)
            };
        a.extend(D.prototype, {defaultOptions: {dateTimeLabelFormats: {millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M", hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y"}, endOnTick: !1, labels: {enabled: !0, style: {color: "#666666", cursor: "default", fontSize: "11px"},
            x: 0}, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickmarkPlacement: "between", tickPixelInterval: 100, tickPosition: "outside", title: {align: "middle", style: {color: "#666666"}}, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb"}, defaultYAxisOptions: {endOnTick: !0, tickPixelInterval: 72, showLastLabel: !0, labels: {x: -8}, maxPadding: .05,
            minPadding: .05, startOnTick: !0, title: {rotation: 270, text: "Values"}, stackLabels: {allowOverlap: !1, enabled: !1, formatter: function () {
                return a.numberFormat(this.total, -1)
            }, style: {fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast"}}, gridLineWidth: 1, lineWidth: 0}, defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}}, defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}}, defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}}, defaultTopAxisOptions: {labels: {autoRotation: [-45],
            x: 0}, title: {rotation: 0}}, init: function (a, d) {
            var h = d.isX, y = this;
            y.chart = a;
            y.horiz = a.inverted && !y.isZAxis ? !h : h;
            y.isXAxis = h;
            y.coll = y.coll || (h ? "xAxis" : "yAxis");
            y.opposite = d.opposite;
            y.side = d.side || (y.horiz ? y.opposite ? 0 : 2 : y.opposite ? 1 : 3);
            y.setOptions(d);
            var b = this.options, c = b.type;
            y.labelFormatter = b.labels.formatter || y.defaultLabelFormatter;
            y.userOptions = d;
            y.minPixelPadding = 0;
            y.reversed = b.reversed;
            y.visible = !1 !== b.visible;
            y.zoomEnabled = !1 !== b.zoomEnabled;
            y.hasNames = "category" === c || !0 === b.categories;
            y.categories =
                b.categories || y.hasNames;
            y.names = y.names || [];
            y.plotLinesAndBandsGroups = {};
            y.isLog = "logarithmic" === c;
            y.isDatetimeAxis = "datetime" === c;
            y.positiveValuesOnly = y.isLog && !y.allowNegativeLog;
            y.isLinked = t(b.linkedTo);
            y.ticks = {};
            y.labelEdge = [];
            y.minorTicks = {};
            y.plotLinesAndBands = [];
            y.alternateBands = {};
            y.len = 0;
            y.minRange = y.userMinRange = b.minRange || b.maxZoom;
            y.range = b.range;
            y.offset = b.offset || 0;
            y.stacks = {};
            y.oldStacks = {};
            y.stacksTouched = 0;
            y.max = null;
            y.min = null;
            y.crosshair = B(b.crosshair, A(a.options.tooltip.crosshairs)[h ?
                0 : 1], !1);
            d = y.options.events;
            -1 === r(y, a.axes) && (h ? a.axes.splice(a.xAxis.length, 0, y) : a.axes.push(y), a[y.coll].push(y));
            y.series = y.series || [];
            a.inverted && !y.isZAxis && h && void 0 === y.reversed && (y.reversed = !0);
            n(d, function (a, h) {
                G(y, h, a)
            });
            y.lin2log = b.linearToLogConverter || y.lin2log;
            y.isLog && (y.val2lin = y.log2lin, y.lin2val = y.lin2log)
        }, setOptions: function (a) {
            this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions,
                this.defaultLeftAxisOptions][this.side], x(w[this.coll], a))
        }, defaultLabelFormatter: function () {
            var h = this.axis, d = this.value, b = h.categories, c = this.dateTimeLabelFormat, p = w.lang, n = p.numericSymbols, p = p.numericSymbolMagnitude || 1E3, l = n && n.length, A, r = h.options.labels.format, h = h.isLog ? Math.abs(d) : h.tickInterval;
            if (r)A = e(r, this); else if (b)A = d; else if (c)A = a.dateFormat(c, d); else if (l && 1E3 <= h)for (; l-- && void 0 === A;)b = Math.pow(p, l + 1), h >= b && 0 === 10 * d % b && null !== n[l] && 0 !== d && (A = a.numberFormat(d / b, -1) + n[l]);
            void 0 ===
                A && (A = 1E4 <= Math.abs(d) ? a.numberFormat(d, -1) : a.numberFormat(d, -1, void 0, ""));
            return A
        }, getSeriesExtremes: function () {
            var a = this, d = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.threshold = null;
            a.softThreshold = !a.isXAxis;
            a.buildStacks && a.buildStacks();
            m(a.series, function (h) {
                if (h.visible || !d.options.chart.ignoreHiddenSeries) {
                    var y = h.options, c = y.threshold, p;
                    a.hasVisibleSeries = !0;
                    a.positiveValuesOnly && 0 >= c && (c = null);
                    if (a.isXAxis)y = h.xData, y.length && (h = v(y), p = H(y), C(h) || h instanceof Date || (y = b(y, C),
                        h = v(y)), a.dataMin = Math.min(B(a.dataMin, y[0], h), h), a.dataMax = Math.max(B(a.dataMax, y[0], p), p)); else if (h.getExtremes(), p = h.dataMax, h = h.dataMin, t(h) && t(p) && (a.dataMin = Math.min(B(a.dataMin, h), h), a.dataMax = Math.max(B(a.dataMax, p), p)), t(c) && (a.threshold = c), !y.softThreshold || a.positiveValuesOnly)a.softThreshold = !1
                }
            })
        }, translate: function (a, d, b, c, p, e) {
            var h = this.linkedParent || this, y = 1, n = 0, l = c ? h.oldTransA : h.transA;
            c = c ? h.oldMin : h.min;
            var A = h.minPixelPadding;
            p = (h.isOrdinal || h.isBroken || h.isLog && p) && h.lin2val;
            l || (l = h.transA);
            b && (y *= -1, n = h.len);
            h.reversed && (y *= -1, n -= y * (h.sector || h.len));
            d ? (a = (a * y + n - A) / l + c, p && (a = h.lin2val(a))) : (p && (a = h.val2lin(a)), a = C(c) ? y * (a - c) * l + n + y * A + (C(e) ? l * e : 0) : void 0);
            return a
        }, toPixels: function (a, d) {
            return this.translate(a, !1, !this.horiz, null, !0) + (d ? 0 : this.pos)
        }, toValue: function (a, d) {
            return this.translate(a - (d ? 0 : this.pos), !0, !this.horiz, null, !0)
        }, getPlotLinePath: function (a, d, b, c, p) {
            var h = this.chart, y = this.left, e = this.top, n, l, A = b && h.oldChartHeight || h.chartHeight, r = b && h.oldChartWidth ||
                h.chartWidth, f;
            n = this.transB;
            var D = function (a, h, d) {
                if (a < h || a > d)c ? a = Math.min(Math.max(h, a), d) : f = !0;
                return a
            };
            p = B(p, this.translate(a, null, null, b));
            a = b = Math.round(p + n);
            n = l = Math.round(A - p - n);
            C(p) ? this.horiz ? (n = e, l = A - this.bottom, a = b = D(a, y, y + this.width)) : (a = y, b = r - this.right, n = l = D(n, e, e + this.height)) : (f = !0, c = !1);
            return f && !c ? null : h.renderer.crispLine(["M", a, n, "L", b, l], d || 1)
        }, getLinearTickPositions: function (a, d, b) {
            var h, y = q(Math.floor(d / a) * a);
            b = q(Math.ceil(b / a) * a);
            var c = [], p;
            q(y + a) === y && (p = 20);
            if (this.single)return[d];
            for (d = y; d <= b;) {
                c.push(d);
                d = q(d + a, p);
                if (d === h)break;
                h = d
            }
            return c
        }, getMinorTickInterval: function () {
            var a = this.options;
            return!0 === a.minorTicks ? B(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
        }, getMinorTickPositions: function () {
            var a = this, d = a.options, b = a.tickPositions, c = a.minorTickInterval, p = [], e = a.pointRangePadding || 0, n = a.min - e, e = a.max + e, l = e - n;
            if (l && l / c < a.len / 3)if (a.isLog)m(this.paddedTicks, function (h, d, y) {
                d && p.push.apply(p, a.getLogTickPositions(c, y[d - 1], y[d], !0))
            }); else if (a.isDatetimeAxis &&
                "auto" === this.getMinorTickInterval())p = p.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c), n, e, d.startOfWeek)); else for (d = n + (b[0] - n) % c; d <= e && d !== p[0]; d += c)p.push(d);
            0 !== p.length && a.trimTicks(p);
            return p
        }, adjustForMinRange: function () {
            var a = this.options, d = this.min, b = this.max, c, p, e, n, l, A, r, f;
            this.isXAxis && void 0 === this.minRange && !this.isLog && (t(a.min) || t(a.max) ? this.minRange = null : (m(this.series, function (a) {
                A = a.xData;
                for (n = r = a.xIncrement ? 1 : A.length - 1; 0 < n; n--)if (l = A[n] - A[n - 1], void 0 === e || l < e)e = l
            }),
                this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
            b - d < this.minRange && (p = this.dataMax - this.dataMin >= this.minRange, f = this.minRange, c = (f - b + d) / 2, c = [d - c, B(a.min, d - c)], p && (c[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), d = H(c), b = [d + f, B(a.max, d + f)], p && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = v(b), b - d < f && (c[0] = b - f, c[1] = B(a.min, b - f), d = H(c)));
            this.min = d;
            this.max = b
        }, getClosest: function () {
            var a;
            this.categories ? a = 1 : m(this.series, function (h) {
                var d = h.closestPointRange, y = h.visible || !h.chart.options.chart.ignoreHiddenSeries;
                !h.noSharedTooltip && t(d) && y && (a = t(a) ? Math.min(a, d) : d)
            });
            return a
        }, nameToX: function (a) {
            var h = l(this.categories), d = h ? this.categories : this.names, b = a.options.x, c;
            a.series.requireSorting = !1;
            t(b) || (b = !1 === this.options.uniqueNames ? a.series.autoIncrement() : r(a.name, d));
            -1 === b ? h || (c = d.length) : c = b;
            void 0 !== c && (this.names[c] = a.name);
            return c
        }, updateNames: function () {
            var a = this;
            0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, m(this.series || [],
                function (h) {
                    h.xIncrement = null;
                    if (!h.points || h.isDirtyData)h.processData(), h.generatePoints();
                    m(h.points, function (d, b) {
                        var y;
                        d.options && (y = a.nameToX(d), void 0 !== y && y !== d.x && (d.x = y, h.xData[b] = y))
                    })
                }))
        }, setAxisTranslation: function (a) {
            var h = this, d = h.max - h.min, b = h.axisPointRange || 0, c, p = 0, e = 0, n = h.linkedParent, l = !!h.categories, A = h.transA, r = h.isXAxis;
            if (r || l || b)c = h.getClosest(), n ? (p = n.minPointOffset, e = n.pointRangePadding) : m(h.series, function (a) {
                var d = l ? 1 : r ? B(a.options.pointRange, c, 0) : h.axisPointRange || 0;
                a = a.options.pointPlacement;
                b = Math.max(b, d);
                h.single || (p = Math.max(p, I(a) ? 0 : d / 2), e = Math.max(e, "on" === a ? 0 : d))
            }), n = h.ordinalSlope && c ? h.ordinalSlope / c : 1, h.minPointOffset = p *= n, h.pointRangePadding = e *= n, h.pointRange = Math.min(b, d), r && (h.closestPointRange = c);
            a && (h.oldTransA = A);
            h.translationSlope = h.transA = A = h.options.staticScale || h.len / (d + e || 1);
            h.transB = h.horiz ? h.left : h.bottom;
            h.minPixelPadding = A * p
        }, minFromRange: function () {
            return this.max - this.range
        }, setTickInterval: function (h) {
            var d = this, b = d.chart, p = d.options,
                e = d.isLog, n = d.log2lin, l = d.isDatetimeAxis, A = d.isXAxis, r = d.isLinked, D = p.maxPadding, g = p.minPadding, x = p.tickInterval, k = p.tickPixelInterval, I = d.categories, J = d.threshold, u = d.softThreshold, z, w, v, E;
            l || I || r || this.getTickAmount();
            v = B(d.userMin, p.min);
            E = B(d.userMax, p.max);
            r ? (d.linkedParent = b[d.coll][p.linkedTo], b = d.linkedParent.getExtremes(), d.min = B(b.min, b.dataMin), d.max = B(b.max, b.dataMax), p.type !== d.linkedParent.options.type && a.error(11, 1)) : (!u && t(J) && (d.dataMin >= J ? (z = J, g = 0) : d.dataMax <= J && (w = J, D = 0)), d.min =
                B(v, z, d.dataMin), d.max = B(E, w, d.dataMax));
            e && (d.positiveValuesOnly && !h && 0 >= Math.min(d.min, B(d.dataMin, d.min)) && a.error(10, 1), d.min = q(n(d.min), 15), d.max = q(n(d.max), 15));
            d.range && t(d.max) && (d.userMin = d.min = v = Math.max(d.dataMin, d.minFromRange()), d.userMax = E = d.max, d.range = null);
            f(d, "foundExtremes");
            d.beforePadding && d.beforePadding();
            d.adjustForMinRange();
            !(I || d.axisPointRange || d.usePercentage || r) && t(d.min) && t(d.max) && (n = d.max - d.min) && (!t(v) && g && (d.min -= n * g), !t(E) && D && (d.max += n * D));
            C(p.softMin) && !C(d.userMin) &&
            (d.min = Math.min(d.min, p.softMin));
            C(p.softMax) && !C(d.userMax) && (d.max = Math.max(d.max, p.softMax));
            C(p.floor) && (d.min = Math.max(d.min, p.floor));
            C(p.ceiling) && (d.max = Math.min(d.max, p.ceiling));
            u && t(d.dataMin) && (J = J || 0, !t(v) && d.min < J && d.dataMin >= J ? d.min = J : !t(E) && d.max > J && d.dataMax <= J && (d.max = J));
            d.tickInterval = d.min === d.max || void 0 === d.min || void 0 === d.max ? 1 : r && !x && k === d.linkedParent.options.tickPixelInterval ? x = d.linkedParent.tickInterval : B(x, this.tickAmount ? (d.max - d.min) / Math.max(this.tickAmount - 1, 1) :
                void 0, I ? 1 : (d.max - d.min) * k / Math.max(d.len, k));
            A && !h && m(d.series, function (a) {
                a.processData(d.min !== d.oldMin || d.max !== d.oldMax)
            });
            d.setAxisTranslation(!0);
            d.beforeSetTickPositions && d.beforeSetTickPositions();
            d.postProcessTickInterval && (d.tickInterval = d.postProcessTickInterval(d.tickInterval));
            d.pointRange && !x && (d.tickInterval = Math.max(d.pointRange, d.tickInterval));
            h = B(p.minTickInterval, d.isDatetimeAxis && d.closestPointRange);
            !x && d.tickInterval < h && (d.tickInterval = h);
            l || e || x || (d.tickInterval = F(d.tickInterval,
                null, c(d.tickInterval), B(p.allowDecimals, !(.5 < d.tickInterval && 5 > d.tickInterval && 1E3 < d.max && 9999 > d.max)), !!this.tickAmount));
            this.tickAmount || (d.tickInterval = d.unsquish());
            this.setTickPositions()
        }, setTickPositions: function () {
            var a = this.options, d, b = a.tickPositions;
            d = this.getMinorTickInterval();
            var c = a.tickPositioner, p = a.startOnTick, e = a.endOnTick;
            this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
            this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval /
                5 : d;
            this.single = this.min === this.max && t(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
            this.tickPositions = d = b && b.slice();
            !d && (d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d =
                [d[0], d.pop()], d[0] === d[1] && (d.length = 1)), this.tickPositions = d, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = d = c);
            this.paddedTicks = d.slice(0);
            this.trimTicks(d, p, e);
            this.isLinked || (this.single && 2 > d.length && (this.min -= .5, this.max += .5), b || c || this.adjustTickAmount())
        }, trimTicks: function (a, d, b) {
            var h = a[0], c = a[a.length - 1], p = this.minPointOffset || 0;
            if (!this.isLinked) {
                if (d && -Infinity !== h)this.min = h; else for (; this.min - p > a[0];)a.shift();
                if (b)this.max = c; else for (; this.max + p < a[a.length - 1];)a.pop();
                0 === a.length && t(h) && !this.options.tickPositions && a.push((c + h) / 2)
            }
        }, alignToOthers: function () {
            var a = {}, d, b = this.options;
            !1 === this.chart.options.chart.alignTicks || !1 === b.alignTicks || this.isLog || m(this.chart[this.coll], function (h) {
                var b = h.options, b = [h.horiz ? b.left : b.top, b.width, b.height, b.pane].join();
                h.series.length && (a[b] ? d = !0 : a[b] = 1)
            });
            return d
        }, getTickAmount: function () {
            var a = this.options, d = a.tickAmount, b = a.tickPixelInterval;
            !t(a.tickInterval) && this.len < b && !this.isRadial && !this.isLog && a.startOnTick &&
                a.endOnTick && (d = 2);
            !d && this.alignToOthers() && (d = Math.ceil(this.len / b) + 1);
            4 > d && (this.finalTickAmt = d, d = 5);
            this.tickAmount = d
        }, adjustTickAmount: function () {
            var a = this.tickInterval, d = this.tickPositions, b = this.tickAmount, c = this.finalTickAmt, p = d && d.length, e = B(this.threshold, this.softThreshold ? 0 : null);
            if (this.hasData()) {
                if (p < b) {
                    for (; d.length < b;)d.length % 2 || this.min === e ? d.push(q(d[d.length - 1] + a)) : d.unshift(q(d[0] - a));
                    this.transA *= (p - 1) / (b - 1);
                    this.min = d[0];
                    this.max = d[d.length - 1]
                } else p > b && (this.tickInterval *=
                    2, this.setTickPositions());
                if (t(c)) {
                    for (a = b = d.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < b - 1) && d.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            }
        }, setScale: function () {
            var a, d;
            this.oldMin = this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            d = this.len !== this.oldAxisLength;
            m(this.series, function (d) {
                if (d.isDirtyData || d.isDirty || d.xAxis.isDirty)a = !0
            });
            d || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks &&
                this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = d || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
        }, setExtremes: function (a, d, b, c, p) {
            var h = this, e = h.chart;
            b = B(b, !0);
            m(h.series, function (a) {
                delete a.kdTree
            });
            p = g(p, {min: a, max: d});
            f(h, "setExtremes", p, function () {
                h.userMin = a;
                h.userMax = d;
                h.eventArgs = p;
                b && e.redraw(c)
            })
        }, zoom: function (a, d) {
            var h = this.dataMin,
                b = this.dataMax, c = this.options, p = Math.min(h, B(c.min, h)), c = Math.max(b, B(c.max, b));
            if (a !== this.min || d !== this.max)this.allowZoomOutside || (t(h) && (a < p && (a = p), a > c && (a = c)), t(b) && (d < p && (d = p), d > c && (d = c))), this.displayBtn = void 0 !== a || void 0 !== d, this.setExtremes(a, d, !1, void 0, {trigger: "zoom"});
            return!0
        }, setAxisSize: function () {
            var d = this.chart, b = this.options, c = b.offsets || [0, 0, 0, 0], p = this.horiz, e = this.width = Math.round(a.relativeLength(B(b.width, d.plotWidth - c[3] + c[1]), d.plotWidth)), n = this.height = Math.round(a.relativeLength(B(b.height,
                d.plotHeight - c[0] + c[2]), d.plotHeight)), l = this.top = Math.round(a.relativeLength(B(b.top, d.plotTop + c[0]), d.plotHeight, d.plotTop)), b = this.left = Math.round(a.relativeLength(B(b.left, d.plotLeft + c[3]), d.plotWidth, d.plotLeft));
            this.bottom = d.chartHeight - n - l;
            this.right = d.chartWidth - e - b;
            this.len = Math.max(p ? e : n, 0);
            this.pos = p ? b : l
        }, getExtremes: function () {
            var a = this.isLog, d = this.lin2log;
            return{min: a ? q(d(this.min)) : this.min, max: a ? q(d(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin,
                userMax: this.userMax}
        }, getThreshold: function (a) {
            var d = this.isLog, h = this.lin2log, b = d ? h(this.min) : this.min, d = d ? h(this.max) : this.max;
            null === a ? a = b : b > a ? a = b : d < a && (a = d);
            return this.translate(a, 0, 1, 0, 1)
        }, autoLabelAlign: function (a) {
            a = (B(a, 0) - 90 * this.side + 720) % 360;
            return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
        }, tickSize: function (a) {
            var d = this.options, h = d[a + "Length"], b = B(d[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
            if (b && h)return"inside" === d[a + "Position"] && (h = -h), [h, b]
        }, labelMetrics: function () {
            var a =
                this.tickPositions && this.tickPositions[0] || 0;
            return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
        }, unsquish: function () {
            var a = this.options.labels, d = this.horiz, b = this.tickInterval, c = b, p = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b), e, n = a.rotation, l = this.labelMetrics(), A, r = Number.MAX_VALUE, f, D = function (a) {
                a /= p || 1;
                a = 1 < a ? Math.ceil(a) : 1;
                return a * b
            };
            d ? (f = !a.staggerLines && !a.step && (t(n) ? [n] : p < B(a.autoRotationLimit,
                80) && a.autoRotation)) && m(f, function (a) {
                var d;
                if (a === n || a && -90 <= a && 90 >= a)A = D(Math.abs(l.h / Math.sin(u * a))), d = A + Math.abs(a / 360), d < r && (r = d, e = a, c = A)
            }) : a.step || (c = D(l.h));
            this.autoRotation = f;
            this.labelRotation = B(e, n);
            return c
        }, getSlotWidth: function () {
            var a = this.chart, d = this.horiz, b = this.options.labels, c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), p = a.margin[3];
            return d && 2 > (b.step || 0) && !b.rotation && (this.staggerLines || 1) * this.len / c || !d && (b.style && parseInt(b.style.width, 10) || p && p - a.spacing[3] ||
                .33 * a.chartWidth)
        }, renderUnsquish: function () {
            var a = this.chart, d = a.renderer, b = this.tickPositions, c = this.ticks, p = this.options.labels, e = this.horiz, n = this.getSlotWidth(), l = Math.max(1, Math.round(n - 2 * (p.padding || 5))), A = {}, r = this.labelMetrics(), f = p.style && p.style.textOverflow, D, g = 0, C, B;
            I(p.rotation) || (A.rotation = p.rotation || 0);
            m(b, function (a) {
                (a = c[a]) && a.labelLength > g && (g = a.labelLength)
            });
            this.maxLabelLength = g;
            if (this.autoRotation)g > l && g > r.h ? A.rotation = this.labelRotation : this.labelRotation = 0; else if (n &&
                (D = {width: l + "px"}, !f))for (D.textOverflow = "clip", C = b.length; !e && C--;)if (B = b[C], l = c[B].label)l.styles && "ellipsis" === l.styles.textOverflow ? l.css({textOverflow: "clip"}) : c[B].labelLength > n && l.css({width: n + "px"}), l.getBBox().height > this.len / b.length - (r.h - r.f) && (l.specCss = {textOverflow: "ellipsis"});
            A.rotation && (D = {width: (g > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, f || (D.textOverflow = "ellipsis"));
            if (this.labelAlign = p.align || this.autoLabelAlign(this.labelRotation))A.align = this.labelAlign;
            m(b,
                function (a) {
                    var d = (a = c[a]) && a.label;
                    d && (d.attr(A), D && d.css(x(D, d.specCss)), delete d.specCss, a.rotation = A.rotation)
                });
            this.tickRotCorr = d.rotCorr(r.b, this.labelRotation || 0, 0 !== this.side)
        }, hasData: function () {
            return this.hasVisibleSeries || t(this.min) && t(this.max) && this.tickPositions && 0 < this.tickPositions.length
        }, addTitle: function (a) {
            var d = this.chart.renderer, h = this.horiz, b = this.opposite, c = this.options.title, p;
            this.axisTitle || ((p = c.textAlign) || (p = (h ? {low: "left", middle: "center", high: "right"} : {low: b ? "right" :
                "left", middle: "center", high: b ? "left" : "right"})[c.align]), this.axisTitle = d.text(c.text, 0, 0, c.useHTML).attr({zIndex: 7, rotation: c.rotation || 0, align: p}).addClass("highcharts-axis-title").css(c.style).add(this.axisGroup), this.axisTitle.isNew = !0);
            c.style.width || this.isRadial || this.axisTitle.css({width: this.len});
            this.axisTitle[a ? "show" : "hide"](!0)
        }, generateTick: function (a) {
            var d = this.ticks;
            d[a] ? d[a].addLabel() : d[a] = new p(this, a)
        }, getOffset: function () {
            var a = this, d = a.chart, b = d.renderer, c = a.options, p = a.tickPositions,
                e = a.ticks, l = a.horiz, A = a.side, r = d.inverted && !a.isZAxis ? [1, 0, 3, 2][A] : A, f, D, g = 0, x, C = 0, F = c.title, k = c.labels, q = 0, I = d.axisOffset, d = d.clipOffset, J = [-1, 1, 1, -1][A], u = c.className, z = a.axisParent, v = this.tickSize("tick");
            f = a.hasData();
            a.showAxis = D = f || B(c.showEmpty, !0);
            a.staggerLines = a.horiz && k.staggerLines;
            a.axisGroup || (a.gridGroup = b.g("grid").attr({zIndex: c.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (u || "")).add(z), a.axisGroup = b.g("axis").attr({zIndex: c.zIndex || 2}).addClass("highcharts-" +
                this.coll.toLowerCase() + " " + (u || "")).add(z), a.labelGroup = b.g("axis-labels").attr({zIndex: k.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (u || "")).add(z));
            f || a.isLinked ? (m(p, function (d, h) {
                a.generateTick(d, h)
            }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === A || 2 === A || {1: "left", 3: "right"}[A] === a.labelAlign, B(k.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && m(p, function (a) {
                q = Math.max(e[a].getLabelSize(), q)
            }), a.staggerLines && (q *= a.staggerLines), a.labelOffset = q *
                (a.opposite ? -1 : 1)) : n(e, function (a, d) {
                a.destroy();
                delete e[d]
            });
            F && F.text && !1 !== F.enabled && (a.addTitle(D), D && !1 !== F.reserveSpace && (a.titleOffset = g = a.axisTitle.getBBox()[l ? "height" : "width"], x = F.offset, C = t(x) ? 0 : B(F.margin, l ? 5 : 10)));
            a.renderLine();
            a.offset = J * B(c.offset, I[A]);
            a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
            b = 0 === A ? -a.labelMetrics().h : 2 === A ? a.tickRotCorr.y : 0;
            C = Math.abs(q) + C;
            q && (C = C - b + J * (l ? B(k.y, a.tickRotCorr.y + 8 * J) : k.x));
            a.axisTitleMargin = B(x, C);
            I[A] = Math.max(I[A], a.axisTitleMargin + g + J * a.offset,
                C, f && p.length && v ? v[0] + J * a.offset : 0);
            c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
            d[r] = Math.max(d[r], c)
        }, getLinePath: function (a) {
            var d = this.chart, h = this.opposite, b = this.offset, c = this.horiz, p = this.left + (h ? this.width : 0) + b, b = d.chartHeight - this.bottom - (h ? this.height : 0) + b;
            h && (a *= -1);
            return d.renderer.crispLine(["M", c ? this.left : p, c ? b : this.top, "L", c ? d.chartWidth - this.right : p, c ? b : d.chartHeight - this.bottom], a)
        }, renderLine: function () {
            this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                this.axisLine.attr({stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7}))
        }, getTitlePosition: function () {
            var a = this.horiz, d = this.left, b = this.top, c = this.len, p = this.options.title, e = a ? d : b, n = this.opposite, l = this.offset, A = p.x || 0, r = p.y || 0, f = this.axisTitle, D = this.chart.renderer.fontMetrics(p.style && p.style.fontSize, f), f = Math.max(f.getBBox(null, 0).height - D.h - 1, 0), c = {low: e + (a ? 0 : c), middle: e + c / 2, high: e + (a ? c : 0)}[p.align], d = (a ? b + this.height : d) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + [-f,
                f, D.f, -f][this.side];
            return{x: a ? c + A : d + (n ? this.width : 0) + l + A, y: a ? d + r - (n ? this.height : 0) + l : c + r}
        }, renderMinorTick: function (a) {
            var d = this.chart.hasRendered && C(this.oldMin), b = this.minorTicks;
            b[a] || (b[a] = new p(this, a, "minor"));
            d && b[a].isNew && b[a].render(null, !0);
            b[a].render(null, !1, 1)
        }, renderTick: function (a, d) {
            var b = this.isLinked, h = this.ticks, c = this.chart.hasRendered && C(this.oldMin);
            if (!b || a >= this.min && a <= this.max)h[a] || (h[a] = new p(this, a)), c && h[a].isNew && h[a].render(d, !0, .1), h[a].render(d)
        }, render: function () {
            var b =
                this, c = b.chart, e = b.options, l = b.isLog, A = b.lin2log, r = b.isLinked, f = b.tickPositions, D = b.axisTitle, g = b.ticks, x = b.minorTicks, B = b.alternateBands, F = e.stackLabels, k = e.alternateGridColor, q = b.tickmarkOffset, t = b.axisLine, I = b.showAxis, J = E(c.renderer.globalAnimation), u, z;
            b.labelEdge.length = 0;
            b.overlap = !1;
            m([g, x, B], function (a) {
                n(a, function (a) {
                    a.isActive = !1
                })
            });
            if (b.hasData() || r)b.minorTickInterval && !b.categories && m(b.getMinorTickPositions(), function (a) {
                b.renderMinorTick(a)
            }), f.length && (m(f, function (a, d) {
                b.renderTick(a,
                    d)
            }), q && (0 === b.min || b.single) && (g[-1] || (g[-1] = new p(b, -1, null, !0)), g[-1].render(-1))), k && m(f, function (d, h) {
                z = void 0 !== f[h + 1] ? f[h + 1] + q : b.max - q;
                0 === h % 2 && d < b.max && z <= b.max + (c.polar ? -q : q) && (B[d] || (B[d] = new a.PlotLineOrBand(b)), u = d + q, B[d].options = {from: l ? A(u) : u, to: l ? A(z) : z, color: k}, B[d].render(), B[d].isActive = !0)
            }), b._addedPlotLB || (m((e.plotLines || []).concat(e.plotBands || []), function (a) {
                b.addPlotBandOrLine(a)
            }), b._addedPlotLB = !0);
            m([g, x, B], function (a) {
                var b, h = [], p = J.duration;
                n(a, function (a, d) {
                    a.isActive ||
                    (a.render(d, !1, 0), a.isActive = !1, h.push(d))
                });
                d(function () {
                    for (b = h.length; b--;)a[h[b]] && !a[h[b]].isActive && (a[h[b]].destroy(), delete a[h[b]])
                }, a !== B && c.hasRendered && p ? p : 0)
            });
            t && (t[t.isPlaced ? "animate" : "attr"]({d: this.getLinePath(t.strokeWidth())}), t.isPlaced = !0, t[I ? "show" : "hide"](!0));
            D && I && (e = b.getTitlePosition(), C(e.y) ? (D[D.isNew ? "attr" : "animate"](e), D.isNew = !1) : (D.attr("y", -9999), D.isNew = !0));
            F && F.enabled && b.renderStackTotals();
            b.isDirty = !1
        }, redraw: function () {
            this.visible && (this.render(), m(this.plotLinesAndBands,
                function (a) {
                    a.render()
                }));
            m(this.series, function (a) {
                a.isDirty = !0
            })
        }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function (a) {
            var d = this, b = d.stacks, h = d.plotLinesAndBands, c;
            a || J(d);
            n(b, function (a, d) {
                z(a);
                b[d] = null
            });
            m([d.ticks, d.minorTicks, d.alternateBands], function (a) {
                z(a)
            });
            if (h)for (a = h.length; a--;)h[a].destroy();
            m("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                d[a] && (d[a] = d[a].destroy())
            });
            for (c in d.plotLinesAndBandsGroups)d.plotLinesAndBandsGroups[c] =
                d.plotLinesAndBandsGroups[c].destroy();
            n(d, function (a, b) {
                -1 === r(b, d.keepProps) && delete d[b]
            })
        }, drawCrosshair: function (a, d) {
            var b, h = this.crosshair, c = B(h.snap, !0), p, e = this.cross;
            a || (a = this.cross && this.cross.e);
            this.crosshair && !1 !== (t(d) || !c) ? (c ? t(d) && (p = this.isXAxis ? d.plotX : this.len - d.plotY) : p = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), t(p) && (b = this.getPlotLinePath(d && (this.isXAxis ? d.x : B(d.stackY, d.y)), null, null, null, p) || null), t(b) ? (d = this.categories && !this.isRadial, e || (this.cross =
                e = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + h.className).attr({zIndex: B(h.zIndex, 2)}).add(), e.attr({stroke: h.color || (d ? k("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": B(h.width, 1)}).css({"pointer-events": "none"}), h.dashStyle && e.attr({dashstyle: h.dashStyle})), e.show().attr({d: b}), d && !h.width && e.attr({"stroke-width": this.transA}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
        }, hideCrosshair: function () {
            this.cross &&
            this.cross.hide()
        }});
        return a.Axis = D
    }(L);
    (function (a) {
        var G = a.Axis, E = a.Date, H = a.dateFormat, v = a.defaultOptions, k = a.defined, q = a.each, w = a.extend, t = a.getMagnitude, u = a.getTZOffset, z = a.normalizeTickInterval, m = a.pick, g = a.timeUnits;
        G.prototype.getTimeTicks = function (a, e, c, b) {
            var r = [], l = {}, f = v.global.useUTC, t, x = new E(e - Math.max(u(e), u(c))), F = E.hcMakeTime, n = a.unitRange, B = a.count, J, A;
            if (k(e)) {
                x[E.hcSetMilliseconds](n >= g.second ? 0 : B * Math.floor(x.getMilliseconds() / B));
                if (n >= g.second)x[E.hcSetSeconds](n >= g.minute ?
                    0 : B * Math.floor(x.getSeconds() / B));
                if (n >= g.minute)x[E.hcSetMinutes](n >= g.hour ? 0 : B * Math.floor(x[E.hcGetMinutes]() / B));
                if (n >= g.hour)x[E.hcSetHours](n >= g.day ? 0 : B * Math.floor(x[E.hcGetHours]() / B));
                if (n >= g.day)x[E.hcSetDate](n >= g.month ? 1 : B * Math.floor(x[E.hcGetDate]() / B));
                n >= g.month && (x[E.hcSetMonth](n >= g.year ? 0 : B * Math.floor(x[E.hcGetMonth]() / B)), t = x[E.hcGetFullYear]());
                if (n >= g.year)x[E.hcSetFullYear](t - t % B);
                if (n === g.week)x[E.hcSetDate](x[E.hcGetDate]() - x[E.hcGetDay]() + m(b, 1));
                t = x[E.hcGetFullYear]();
                b = x[E.hcGetMonth]();
                var d = x[E.hcGetDate](), p = x[E.hcGetHours]();
                e = x.getTime();
                E.hcHasTimeZone && (A = (!f || !!E.hcGetTimezoneOffset) && (c - e > 4 * g.month || u(e) !== u(c)), J = u(x), x = new E(e + J));
                f = x.getTime();
                for (e = 1; f < c;)r.push(f), f = n === g.year ? F(t + e * B, 0) : n === g.month ? F(t, b + e * B) : !A || n !== g.day && n !== g.week ? A && n === g.hour ? F(t, b, d, p + e * B, 0, 0, J) - J : f + n * B : F(t, b, d + e * B * (n === g.day ? 1 : 7)), e++;
                r.push(f);
                n <= g.hour && 1E4 > r.length && q(r, function (a) {
                    0 === a % 18E5 && "000000000" === H("%H%M%S%L", a) && (l[a] = "day")
                })
            }
            r.info = w(a, {higherRanks: l, totalRange: n * B});
            return r
        };
        G.prototype.normalizeTimeTickInterval = function (a, e) {
            var c = e || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            e = c[c.length - 1];
            var b = g[e[0]], r = e[1], l;
            for (l = 0; l < c.length && !(e = c[l], b = g[e[0]], r = e[1], c[l + 1] && a <= (b * r[r.length - 1] + g[c[l + 1][0]]) / 2); l++);
            b === g.year && a < 5 * b && (r = [1, 2, 5]);
            a = z(a / b, r, "year" === e[0] ? Math.max(t(a / b), 1) : 1);
            return{unitRange: b, count: a, unitName: e[0]}
        }
    })(L);
    (function (a) {
        var G = a.Axis, E = a.getMagnitude, H = a.map, v = a.normalizeTickInterval, k = a.pick;
        G.prototype.getLogTickPositions = function (a, w, t, u) {
            var q = this.options, m = this.len, g = this.lin2log, f = this.log2lin, e = [];
            u || (this._minorAutoInterval = null);
            if (.5 <= a)a = Math.round(a), e = this.getLinearTickPositions(a, w, t); else if (.08 <= a)for (var m = Math.floor(w), c, b, r, l, C, q = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; m < t + 1 && !C; m++)for (b = q.length, c = 0; c < b && !C; c++)r = f(g(m) * q[c]), r > w && (!u || l <= t) && void 0 !== l && e.push(l), l > t &&
                (C = !0), l = r; else w = g(w), t = g(t), a = u ? this.getMinorTickInterval() : q.tickInterval, a = k("auto" === a ? null : a, this._minorAutoInterval, q.tickPixelInterval / (u ? 5 : 1) * (t - w) / ((u ? m / this.tickPositions.length : m) || 1)), a = v(a, null, E(a)), e = H(this.getLinearTickPositions(a, w, t), f), u || (this._minorAutoInterval = a / 5);
            u || (this.tickInterval = a);
            return e
        };
        G.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        G.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(L);
    (function (a, G) {
        var E = a.arrayMax, H = a.arrayMin, v = a.defined,
            k = a.destroyObjectProperties, q = a.each, w = a.erase, t = a.merge, u = a.pick;
        a.PlotLineOrBand = function (a, m) {
            this.axis = a;
            m && (this.options = m, this.id = m.id)
        };
        a.PlotLineOrBand.prototype = {render: function () {
            var k = this, m = k.axis, g = m.horiz, f = k.options, e = f.label, c = k.label, b = f.to, r = f.from, l = f.value, C = v(r) && v(b), q = v(l), x = k.svgElem, F = !x, n = [], B = f.color, J = u(f.zIndex, 0), A = f.events, n = {"class": "highcharts-plot-" + (C ? "band " : "line ") + (f.className || "")}, d = {}, p = m.chart.renderer, D = C ? "bands" : "lines", h = m.log2lin;
            m.isLog && (r = h(r), b = h(b),
                l = h(l));
            q ? (n = {stroke: B, "stroke-width": f.width}, f.dashStyle && (n.dashstyle = f.dashStyle)) : C && (B && (n.fill = B), f.borderWidth && (n.stroke = f.borderColor, n["stroke-width"] = f.borderWidth));
            d.zIndex = J;
            D += "-" + J;
            (B = m.plotLinesAndBandsGroups[D]) || (m.plotLinesAndBandsGroups[D] = B = p.g("plot-" + D).attr(d).add());
            F && (k.svgElem = x = p.path().attr(n).add(B));
            if (q)n = m.getPlotLinePath(l, x.strokeWidth()); else if (C)n = m.getPlotBandPath(r, b, f); else return;
            F && n && n.length ? (x.attr({d: n}), A && a.objectEach(A, function (a, d) {
                x.on(d, function (a) {
                    A[d].apply(k,
                        [a])
                })
            })) : x && (n ? (x.show(), x.animate({d: n})) : (x.hide(), c && (k.label = c = c.destroy())));
            e && v(e.text) && n && n.length && 0 < m.width && 0 < m.height && !n.flat ? (e = t({align: g && C && "center", x: g ? !C && 4 : 10, verticalAlign: !g && C && "middle", y: g ? C ? 16 : 10 : C ? 6 : -4, rotation: g && !C && 90}, e), this.renderLabel(e, n, C, J)) : c && c.hide();
            return k
        }, renderLabel: function (a, m, g, f) {
            var e = this.label, c = this.axis.chart.renderer;
            e || (e = {align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (g ? "band" : "line") + "-label " + (a.className || "")},
                e.zIndex = f, this.label = e = c.text(a.text, 0, 0, a.useHTML).attr(e).add(), e.css(a.style));
            f = m.xBounds || [m[1], m[4], g ? m[6] : m[1]];
            m = m.yBounds || [m[2], m[5], g ? m[7] : m[2]];
            g = H(f);
            c = H(m);
            e.align(a, !1, {x: g, y: c, width: E(f) - g, height: E(m) - c});
            e.show()
        }, destroy: function () {
            w(this.axis.plotLinesAndBands, this);
            delete this.axis;
            k(this)
        }};
        a.extend(G.prototype, {getPlotBandPath: function (a, m) {
            var g = this.getPlotLinePath(m, null, null, !0), f = this.getPlotLinePath(a, null, null, !0), e = [], c = this.horiz, b = 1, r;
            a = a < this.min && m < this.min || a > this.max &&
                m > this.max;
            if (f && g)for (a && (r = f.toString() === g.toString(), b = 0), a = 0; a < f.length; a += 6)c && g[a + 1] === f[a + 1] ? (g[a + 1] += b, g[a + 4] += b) : c || g[a + 2] !== f[a + 2] || (g[a + 2] += b, g[a + 5] += b), e.push("M", f[a + 1], f[a + 2], "L", f[a + 4], f[a + 5], g[a + 4], g[a + 5], g[a + 1], g[a + 2], "z"), e.flat = r;
            return e
        }, addPlotBand: function (a) {
            return this.addPlotBandOrLine(a, "plotBands")
        }, addPlotLine: function (a) {
            return this.addPlotBandOrLine(a, "plotLines")
        }, addPlotBandOrLine: function (k, m) {
            var g = (new a.PlotLineOrBand(this, k)).render(), f = this.userOptions;
            g && (m &&
                (f[m] = f[m] || [], f[m].push(k)), this.plotLinesAndBands.push(g));
            return g
        }, removePlotBandOrLine: function (a) {
            for (var m = this.plotLinesAndBands, g = this.options, f = this.userOptions, e = m.length; e--;)m[e].id === a && m[e].destroy();
            q([g.plotLines || [], f.plotLines || [], g.plotBands || [], f.plotBands || []], function (c) {
                for (e = c.length; e--;)c[e].id === a && w(c, c[e])
            })
        }, removePlotBand: function (a) {
            this.removePlotBandOrLine(a)
        }, removePlotLine: function (a) {
            this.removePlotBandOrLine(a)
        }})
    })(L, Z);
    (function (a) {
        var G = a.dateFormat, E = a.each,
            H = a.extend, v = a.format, k = a.isNumber, q = a.map, w = a.merge, t = a.pick, u = a.splat, z = a.syncTimeout, m = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {init: function (a, f) {
            this.chart = a;
            this.options = f;
            this.crosshairs = [];
            this.now = {x: 0, y: 0};
            this.isHidden = !0;
            this.split = f.split && !a.inverted;
            this.shared = f.shared || this.split
        }, cleanSplit: function (a) {
            E(this.chart.series, function (f) {
                var e = f && f.tt;
                e && (!e.isActive || a ? f.tt = e.destroy() : e.isActive = !1)
            })
        }, getLabel: function () {
            var a = this.chart.renderer,
                f = this.options;
            this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, f.shape || "callout", null, null, f.useHTML, null, "tooltip").attr({padding: f.padding, r: f.borderRadius}), this.label.attr({fill: f.backgroundColor, "stroke-width": f.borderWidth}).css(f.style).shadow(f.shadow)), this.label.attr({zIndex: 8}).add());
            return this.label
        }, update: function (a) {
            this.destroy();
            w(!0, this.chart.options.tooltip.userOptions, a);
            this.init(this.chart, w(!0, this.options, a))
        }, destroy: function () {
            this.label &&
            (this.label = this.label.destroy());
            this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        }, move: function (a, f, e, c) {
            var b = this, r = b.now, l = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - r.x) || 1 < Math.abs(f - r.y)), g = b.followPointer || 1 < b.len;
            H(r, {x: l ? (2 * r.x + a) / 3 : a, y: l ? (r.y + f) / 2 : f, anchorX: g ? void 0 : l ? (2 * r.anchorX + e) / 3 : e, anchorY: g ? void 0 : l ? (r.anchorY + c) / 2 : c});
            b.getLabel().attr(r);
            l && (clearTimeout(this.tooltipTimeout),
                this.tooltipTimeout = setTimeout(function () {
                    b && b.move(a, f, e, c)
                }, 32))
        }, hide: function (a) {
            var f = this;
            clearTimeout(this.hideTimer);
            a = t(a, this.options.hideDelay, 500);
            this.isHidden || (this.hideTimer = z(function () {
                f.getLabel()[a ? "fadeOut" : "hide"]();
                f.isHidden = !0
            }, a))
        }, getAnchor: function (a, f) {
            var e, c = this.chart, b = c.inverted, r = c.plotTop, l = c.plotLeft, g = 0, m = 0, x, F;
            a = u(a);
            e = a[0].tooltipPos;
            this.followPointer && f && (void 0 === f.chartX && (f = c.pointer.normalize(f)), e = [f.chartX - c.plotLeft, f.chartY - r]);
            e || (E(a, function (a) {
                x =
                    a.series.yAxis;
                F = a.series.xAxis;
                g += a.plotX + (!b && F ? F.left - l : 0);
                m += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && x ? x.top - r : 0)
            }), g /= a.length, m /= a.length, e = [b ? c.plotWidth - m : g, this.shared && !b && 1 < a.length && f ? f.chartY - r : b ? c.plotHeight - g : m]);
            return q(e, Math.round)
        }, getPosition: function (a, f, e) {
            var c = this.chart, b = this.distance, r = {}, l = c.inverted && e.h || 0, g, m = ["y", c.chartHeight, f, e.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight], x = ["x", c.chartWidth, a, e.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
                F = !this.followPointer && t(e.ttBelow, !c.inverted === !!e.negative), n = function (a, c, e, h, n, A) {
                    var d = e < h - b, p = h + b + e < c, f = h - b - e;
                    h += b;
                    if (F && p)r[a] = h; else if (!F && d)r[a] = f; else if (d)r[a] = Math.min(A - e, 0 > f - l ? f : f - l); else if (p)r[a] = Math.max(n, h + l + e > c ? h : h + l); else return!1
                }, B = function (a, c, e, h) {
                    var d;
                    h < b || h > c - b ? d = !1 : r[a] = h < e / 2 ? 1 : h > c - e / 2 ? c - e - 2 : h - e / 2;
                    return d
                }, k = function (a) {
                    var d = m;
                    m = x;
                    x = d;
                    g = a
                }, A = function () {
                    !1 !== n.apply(0, m) ? !1 !== B.apply(0, x) || g || (k(!0), A()) : g ? r.x = r.y = 0 : (k(!0), A())
                };
            (c.inverted || 1 < this.len) && k();
            A();
            return r
        },
            defaultFormatter: function (a) {
                var f = this.points || u(this), e;
                e = [a.tooltipFooterHeaderFormatter(f[0])];
                e = e.concat(a.bodyFormatter(f));
                e.push(a.tooltipFooterHeaderFormatter(f[0], !0));
                return e
            }, refresh: function (a, f) {
                var e, c = this.options, b, r = a, l, g = {}, m = [];
                e = c.formatter || this.defaultFormatter;
                var g = this.shared, x;
                c.enabled && (clearTimeout(this.hideTimer), this.followPointer = u(r)[0].series.tooltipOptions.followPointer, l = this.getAnchor(r, f), f = l[0], b = l[1], !g || r.series && r.series.noSharedTooltip ? g = r.getLabelConfig() :
                    (E(r, function (a) {
                        a.setState("hover");
                        m.push(a.getLabelConfig())
                    }), g = {x: r[0].category, y: r[0].y}, g.points = m, r = r[0]), this.len = m.length, g = e.call(g, this), x = r.series, this.distance = t(x.tooltipOptions.distance, 16), !1 === g ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({opacity: 1}).show(), this.split ? this.renderSplit(g, u(a)) : (c.style.width || e.css({width: this.chart.spacingBox.width}), e.attr({text: g && g.join ? g.join("") : g}), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(r.colorIndex,
                    x.colorIndex)), e.attr({stroke: c.borderColor || r.color || x.color || "#666666"}), this.updatePosition({plotX: f, plotY: b, negative: r.negative, ttBelow: r.ttBelow, h: l[2] || 0})), this.isHidden = !1))
            }, renderSplit: function (g, f) {
                var e = this, c = [], b = this.chart, r = b.renderer, l = !0, m = this.options, k = 0, x = this.getLabel();
                a.isString(g) && (g = [!1, g]);
                E(g.slice(0, f.length + 1), function (a, n) {
                    if (!1 !== a) {
                        n = f[n - 1] || {isHeader: !0, plotX: f[0].plotX};
                        var g = n.series || e, C = g.tt, A = n.series || {}, d = "highcharts-color-" + t(n.colorIndex, A.colorIndex, "none");
                        C || (g.tt = C = r.label(null, null, null, "callout", null, null, m.useHTML).addClass("highcharts-tooltip-box " + d).attr({padding: m.padding, r: m.borderRadius, fill: m.backgroundColor, stroke: m.borderColor || n.color || A.color || "#333333", "stroke-width": m.borderWidth}).add(x));
                        C.isActive = !0;
                        C.attr({text: a});
                        C.css(m.style).shadow(m.shadow);
                        a = C.getBBox();
                        A = a.width + C.strokeWidth();
                        n.isHeader ? (k = a.height, A = Math.max(0, Math.min(n.plotX + b.plotLeft - A / 2, b.chartWidth - A))) : A = n.plotX + b.plotLeft - t(m.distance, 16) - A;
                        0 > A && (l = !1);
                        a = (n.series &&
                            n.series.yAxis && n.series.yAxis.pos) + (n.plotY || 0);
                        a -= b.plotTop;
                        c.push({target: n.isHeader ? b.plotHeight + k : a, rank: n.isHeader ? 1 : 0, size: g.tt.getBBox().height + 1, point: n, x: A, tt: C})
                    }
                });
                this.cleanSplit();
                a.distribute(c, b.plotHeight + k);
                E(c, function (a) {
                    var c = a.point, e = c.series;
                    a.tt.attr({visibility: void 0 === a.pos ? "hidden" : "inherit", x: l || c.isHeader ? a.x : c.plotX + b.plotLeft + t(m.distance, 16), y: a.pos + b.plotTop, anchorX: c.isHeader ? c.plotX + b.plotLeft : c.plotX + e.xAxis.pos, anchorY: c.isHeader ? a.pos + b.plotTop - 15 : c.plotY + e.yAxis.pos})
                })
            },
            updatePosition: function (a) {
                var f = this.chart, e = this.getLabel(), e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a);
                this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + f.plotLeft, a.plotY + f.plotTop)
            }, getDateFormat: function (a, f, e, c) {
                var b = G("%m-%d %H:%M:%S.%L", f), r, l, g = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, k = "millisecond";
                for (l in m) {
                    if (a === m.week && +G("%w", f) === e && "00:00:00.000" === b.substr(6)) {
                        l = "week";
                        break
                    }
                    if (m[l] > a) {
                        l = k;
                        break
                    }
                    if (g[l] && b.substr(g[l]) !== "01-01 00:00:00.000".substr(g[l]))break;
                    "week" !== l && (k = l)
                }
                l && (r = c[l]);
                return r
            }, getXDateFormat: function (a, f, e) {
                f = f.dateTimeLabelFormats;
                var c = e && e.closestPointRange;
                return(c ? this.getDateFormat(c, a.x, e.options.startOfWeek, f) : f.day) || f.year
            }, tooltipFooterHeaderFormatter: function (a, f) {
                f = f ? "footer" : "header";
                var e = a.series, c = e.tooltipOptions, b = c.xDateFormat, r = e.xAxis, l = r && "datetime" === r.options.type && k(a.key), g = c[f + "Format"];
                l && !b && (b = this.getXDateFormat(a, c, r));
                l && b && E(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    g = g.replace("{point." +
                        a + "}", "{point." + a + ":" + b + "}")
                });
                return v(g, {point: a, series: e})
            }, bodyFormatter: function (a) {
                return q(a, function (a) {
                    var e = a.series.tooltipOptions;
                    return(e[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, e[(a.point.formatPrefix || "point") + "Format"])
                })
            }}
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.attr, H = a.charts, v = a.color, k = a.css, q = a.defined, w = a.each, t = a.extend, u = a.find, z = a.fireEvent, m = a.isObject, g = a.offset, f = a.pick, e = a.splat, c = a.Tooltip;
        a.Pointer = function (a, c) {
            this.init(a,
                c)
        };
        a.Pointer.prototype = {init: function (a, e) {
            this.options = e;
            this.chart = a;
            this.runChartClick = e.chart.events && !!e.chart.events.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            c && (a.tooltip = new c(a, e.tooltip), this.followTouchMove = f(e.tooltip.followTouchMove, !0));
            this.setDOMEvents()
        }, zoomOption: function (a) {
            var b = this.chart, c = b.options.chart, e = c.zoomType || "", b = b.inverted;
            /touch/.test(a.type) && (e = f(c.pinchType, e));
            this.zoomX = a = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = a && !b || e && b;
            this.zoomVert = e && !b || a && b;
            this.hasZoom = a || e
        }, normalize: function (a, c) {
            var b;
            b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
            c || (this.chartPosition = c = g(this.chart.container));
            return t(a, {chartX: Math.round(b.pageX - c.left), chartY: Math.round(b.pageY - c.top)})
        }, getCoordinates: function (a) {
            var b = {xAxis: [], yAxis: []};
            w(this.chart.axes, function (c) {
                b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
            });
            return b
        }, findNearestKDPoint: function (a, c, e) {
            var b;
            w(a, function (a) {
                var l =
                    !(a.noSharedTooltip && c) && 0 > a.options.findNearestPointBy.indexOf("y");
                a = a.searchPoint(e, l);
                if ((l = m(a, !0)) && !(l = !m(b, !0)))var l = b.distX - a.distX, r = b.dist - a.dist, n = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex), l = 0 < (0 !== l && c ? l : 0 !== r ? r : 0 !== n ? n : b.series.index > a.series.index ? -1 : 1);
                l && (b = a)
            });
            return b
        }, getPointFromEvent: function (a) {
            a = a.target;
            for (var b; a && !b;)b = a.point, a = a.parentNode;
            return b
        }, getChartCoordinatesFromPoint: function (a, c) {
            var b = a.series, e = b.xAxis, b = b.yAxis, r =
                f(a.clientX, a.plotX);
            if (e && b)return c ? {chartX: e.len + e.pos - r, chartY: b.len + b.pos - a.plotY} : {chartX: r + e.pos, chartY: a.plotY + b.pos}
        }, getHoverData: function (b, c, e, g, k, x, F) {
            var n, l = [], r = F && F.isBoosting;
            g = !(!g || !b);
            F = c && !c.stickyTracking ? [c] : a.grep(e, function (a) {
                return a.visible && !(!k && a.directTouch) && f(a.options.enableMouseTracking, !0) && a.stickyTracking
            });
            c = (n = g ? b : this.findNearestKDPoint(F, k, x)) && n.series;
            n && (k && !c.noSharedTooltip ? (F = a.grep(e, function (a) {
                return a.visible && !(!k && a.directTouch) && f(a.options.enableMouseTracking,
                    !0) && !a.noSharedTooltip
            }), w(F, function (a) {
                var d = u(a.points, function (a) {
                    return a.x === n.x && !a.isNull
                });
                m(d) && (r && (d = a.getPoint(d)), l.push(d))
            })) : l.push(n));
            return{hoverPoint: n, hoverSeries: c, hoverPoints: l}
        }, runPointActions: function (b, c) {
            var e = this.chart, r = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0, g = r ? r.shared : !1, x = c || e.hoverPoint, m = x && x.series || e.hoverSeries, m = this.getHoverData(x, m, e.series, !!c || m && m.directTouch && this.isDirectTouch, g, b, {isBoosting: e.isBoosting}), n, x = m.hoverPoint;
            n = m.hoverPoints;
            c = (m = m.hoverSeries) && m.tooltipOptions.followPointer;
            g = g && m && !m.noSharedTooltip;
            if (x && (x !== e.hoverPoint || r && r.isHidden)) {
                w(e.hoverPoints || [], function (b) {
                    -1 === a.inArray(b, n) && b.setState()
                });
                w(n || [], function (a) {
                    a.setState("hover")
                });
                if (e.hoverSeries !== m)m.onMouseOver();
                e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                if (!x.series)return;
                x.firePointEvent("mouseOver");
                e.hoverPoints = n;
                e.hoverPoint = x;
                r && r.refresh(g ? n : x, b)
            } else c && r && !r.isHidden && (x = r.getAnchor([
                {}
            ], b), r.updatePosition({plotX: x[0], plotY: x[1]}));
            this.unDocMouseMove || (this.unDocMouseMove = G(e.container.ownerDocument, "mousemove", function (b) {
                var c = H[a.hoverChartIndex];
                if (c)c.pointer.onDocumentMouseMove(b)
            }));
            w(e.axes, function (c) {
                var e = f(c.crosshair.snap, !0), l = e ? a.find(n, function (a) {
                    return a.series[c.coll] === c
                }) : void 0;
                l || !e ? c.drawCrosshair(b, l) : c.hideCrosshair()
            })
        }, reset: function (a, c) {
            var b = this.chart, r = b.hoverSeries, f = b.hoverPoint, g = b.hoverPoints, m = b.tooltip, n = m && m.shared ? g : f;
            a && n && w(e(n), function (b) {
                b.series.isCartesian && void 0 === b.plotX &&
                (a = !1)
            });
            if (a)m && n && (m.refresh(n), f && (f.setState(f.state, !0), w(b.axes, function (a) {
                a.crosshair && a.drawCrosshair(null, f)
            }))); else {
                if (f)f.onMouseOut();
                g && w(g, function (a) {
                    a.setState()
                });
                if (r)r.onMouseOut();
                m && m.hide(c);
                this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                w(b.axes, function (a) {
                    a.hideCrosshair()
                });
                this.hoverX = b.hoverPoints = b.hoverPoint = null
            }
        }, scaleGroups: function (a, c) {
            var b = this.chart, e;
            w(b.series, function (l) {
                e = a || l.getPlotBox();
                l.xAxis && l.xAxis.zoomEnabled && l.group && (l.group.attr(e),
                    l.markerGroup && (l.markerGroup.attr(e), l.markerGroup.clip(c ? b.clipRect : null)), l.dataLabelsGroup && l.dataLabelsGroup.attr(e))
            });
            b.clipRect.attr(c || b.clipBox)
        }, dragStart: function (a) {
            var b = this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY = a.chartY
        }, drag: function (a) {
            var b = this.chart, c = b.options.chart, e = a.chartX, f = a.chartY, g = this.zoomHor, m = this.zoomVert, n = b.plotLeft, B = b.plotTop, k = b.plotWidth, A = b.plotHeight, d, p = this.selectionMarker, D = this.mouseDownX,
                h = this.mouseDownY, y = c.panKey && a[c.panKey + "Key"];
            p && p.touch || (e < n ? e = n : e > n + k && (e = n + k), f < B ? f = B : f > B + A && (f = B + A), this.hasDragged = Math.sqrt(Math.pow(D - e, 2) + Math.pow(h - f, 2)), 10 < this.hasDragged && (d = b.isInsidePlot(D - n, h - B), b.hasCartesianSeries && (this.zoomX || this.zoomY) && d && !y && !p && (this.selectionMarker = p = b.renderer.rect(n, B, g ? 1 : k, m ? 1 : A, 0).attr({fill: c.selectionMarkerFill || v("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker", zIndex: 7}).add()), p && g && (e -= D, p.attr({width: Math.abs(e), x: (0 < e ?
                0 : e) + D})), p && m && (e = f - h, p.attr({height: Math.abs(e), y: (0 < e ? 0 : e) + h})), d && !p && c.panning && b.pan(a, c.panning)))
        }, drop: function (a) {
            var b = this, c = this.chart, e = this.hasPinched;
            if (this.selectionMarker) {
                var f = {originalEvent: a, xAxis: [], yAxis: []}, g = this.selectionMarker, m = g.attr ? g.attr("x") : g.x, n = g.attr ? g.attr("y") : g.y, B = g.attr ? g.attr("width") : g.width, u = g.attr ? g.attr("height") : g.height, A;
                if (this.hasDragged || e)w(c.axes, function (d) {
                    if (d.zoomEnabled && q(d.min) && (e || b[{xAxis: "zoomX", yAxis: "zoomY"}[d.coll]])) {
                        var c = d.horiz,
                            l = "touchend" === a.type ? d.minPixelPadding : 0, h = d.toValue((c ? m : n) + l), c = d.toValue((c ? m + B : n + u) - l);
                        f[d.coll].push({axis: d, min: Math.min(h, c), max: Math.max(h, c)});
                        A = !0
                    }
                }), A && z(c, "selection", f, function (a) {
                    c.zoom(t(a, e ? {animation: !1} : null))
                });
                this.selectionMarker = this.selectionMarker.destroy();
                e && this.scaleGroups()
            }
            c && (k(c.container, {cursor: c._cursor}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
        }, onContainerMouseDown: function (a) {
            2 !== a.button && (a = this.normalize(a),
                this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
        }, onDocumentMouseUp: function (b) {
            H[a.hoverChartIndex] && H[a.hoverChartIndex].pointer.drop(b)
        }, onDocumentMouseMove: function (a) {
            var b = this.chart, c = this.chartPosition;
            a = this.normalize(a, c);
            !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
        }, onContainerMouseLeave: function (b) {
            var c = H[a.hoverChartIndex];
            c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition =
                null)
        }, onContainerMouseMove: function (b) {
            var c = this.chart;
            q(a.hoverChartIndex) && H[a.hoverChartIndex] && H[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
            b = this.normalize(b);
            b.returnValue = !1;
            "mousedown" === c.mouseIsDown && this.drag(b);
            !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
        }, inClass: function (a, c) {
            for (var b; a;) {
                if (b = E(a, "class")) {
                    if (-1 !== b.indexOf(c))return!0;
                    if (-1 !== b.indexOf("highcharts-container"))return!1
                }
                a =
                    a.parentNode
            }
        }, onTrackerMouseOut: function (a) {
            var b = this.chart.hoverSeries;
            a = a.relatedTarget || a.toElement;
            this.isDirectTouch = !1;
            if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker")))b.onMouseOut()
        }, onContainerClick: function (a) {
            var b = this.chart, c = b.hoverPoint, e = b.plotLeft, f = b.plotTop;
            a = this.normalize(a);
            b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (z(c.series, "click", t(a, {point: c})),
                b.hoverPoint && c.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - f) && z(b, "click", a)))
        }, setDOMEvents: function () {
            var b = this, c = b.chart.container, e = c.ownerDocument;
            c.onmousedown = function (a) {
                b.onContainerMouseDown(a)
            };
            c.onmousemove = function (a) {
                b.onContainerMouseMove(a)
            };
            c.onclick = function (a) {
                b.onContainerClick(a)
            };
            this.unbindContainerMouseLeave = G(c, "mouseleave", b.onContainerMouseLeave);
            a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = G(e, "mouseup", b.onDocumentMouseUp));
            a.hasTouch && (c.ontouchstart = function (a) {
                b.onContainerTouchStart(a)
            }, c.ontouchmove = function (a) {
                b.onContainerTouchMove(a)
            }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = G(e, "touchend", b.onDocumentTouchEnd)))
        }, destroy: function () {
            var b = this;
            b.unDocMouseMove && b.unDocMouseMove();
            this.unbindContainerMouseLeave();
            a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
            clearInterval(b.tooltipTimeout);
            a.objectEach(b, function (a, c) {
                b[c] = null
            })
        }}
    })(L);
    (function (a) {
        var G = a.charts, E = a.each, H = a.extend, v = a.map, k = a.noop, q = a.pick;
        H(a.Pointer.prototype, {pinchTranslate: function (a, k, q, v, m, g) {
            this.zoomHor && this.pinchTranslateDirection(!0, a, k, q, v, m, g);
            this.zoomVert && this.pinchTranslateDirection(!1, a, k, q, v, m, g)
        }, pinchTranslateDirection: function (a, k, q, v, m, g, f, e) {
            var c = this.chart, b = a ? "x" : "y", r = a ? "X" : "Y", l = "chart" + r, C = a ? "width" : "height", t = c["plot" + (a ? "Left" : "Top")], x, F, n = e || 1, B = c.inverted, u = c.bounds[a ? "h" : "v"],
                A = 1 === k.length, d = k[0][l], p = q[0][l], D = !A && k[1][l], h = !A && q[1][l], y;
            q = function () {
                !A && 20 < Math.abs(d - D) && (n = e || Math.abs(p - h) / Math.abs(d - D));
                F = (t - p) / n + d;
                x = c["plot" + (a ? "Width" : "Height")] / n
            };
            q();
            k = F;
            k < u.min ? (k = u.min, y = !0) : k + x > u.max && (k = u.max - x, y = !0);
            y ? (p -= .8 * (p - f[b][0]), A || (h -= .8 * (h - f[b][1])), q()) : f[b] = [p, h];
            B || (g[b] = F - t, g[C] = x);
            g = B ? 1 / n : n;
            m[C] = x;
            m[b] = k;
            v[B ? a ? "scaleY" : "scaleX" : "scale" + r] = n;
            v["translate" + r] = g * t + (p - g * d)
        }, pinch: function (a) {
            var t = this, u = t.chart, w = t.pinchDown, m = a.touches, g = m.length, f = t.lastValidTouch,
                e = t.hasZoom, c = t.selectionMarker, b = {}, r = 1 === g && (t.inClass(a.target, "highcharts-tracker") && u.runTrackerClick || t.runChartClick), l = {};
            1 < g && (t.initiated = !0);
            e && t.initiated && !r && a.preventDefault();
            v(m, function (a) {
                return t.normalize(a)
            });
            "touchstart" === a.type ? (E(m, function (a, b) {
                w[b] = {chartX: a.chartX, chartY: a.chartY}
            }), f.x = [w[0].chartX, w[1] && w[1].chartX], f.y = [w[0].chartY, w[1] && w[1].chartY], E(u.axes, function (a) {
                if (a.zoomEnabled) {
                    var b = u.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, e = a.toPixels(q(a.options.min,
                        a.dataMin)), n = a.toPixels(q(a.options.max, a.dataMax)), l = Math.max(e, n);
                    b.min = Math.min(a.pos, Math.min(e, n) - c);
                    b.max = Math.max(a.pos + a.len, l + c)
                }
            }), t.res = !0) : t.followTouchMove && 1 === g ? this.runPointActions(t.normalize(a)) : w.length && (c || (t.selectionMarker = c = H({destroy: k, touch: !0}, u.plotBox)), t.pinchTranslate(w, m, b, c, l, f), t.hasPinched = e, t.scaleGroups(b, l), t.res && (t.res = !1, this.reset(!1, 0)))
        }, touch: function (k, t) {
            var u = this.chart, v, m;
            if (u.index !== a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget: !0});
            a.hoverChartIndex = u.index;
            1 === k.touches.length ? (k = this.normalize(k), (m = u.isInsidePlot(k.chartX - u.plotLeft, k.chartY - u.plotTop)) && !u.openMenu ? (t && this.runPointActions(k), "touchmove" === k.type && (t = this.pinchDown, v = t[0] ? 4 <= Math.sqrt(Math.pow(t[0].chartX - k.chartX, 2) + Math.pow(t[0].chartY - k.chartY, 2)) : !1), q(v, !0) && this.pinch(k)) : t && this.reset()) : 2 === k.touches.length && this.pinch(k)
        }, onContainerTouchStart: function (a) {
            this.zoomOption(a);
            this.touch(a, !0)
        }, onContainerTouchMove: function (a) {
            this.touch(a)
        }, onDocumentTouchEnd: function (k) {
            G[a.hoverChartIndex] &&
            G[a.hoverChartIndex].pointer.drop(k)
        }})
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.charts, H = a.css, v = a.doc, k = a.extend, q = a.noop, w = a.Pointer, t = a.removeEvent, u = a.win, z = a.wrap;
        if (!a.hasTouch && (u.PointerEvent || u.MSPointerEvent)) {
            var m = {}, g = !!u.PointerEvent, f = function () {
                var c = [];
                c.item = function (a) {
                    return this[a]
                };
                a.objectEach(m, function (a) {
                    c.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
                });
                return c
            }, e = function (c, b, e, l) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !E[a.hoverChartIndex] ||
                (l(c), l = E[a.hoverChartIndex].pointer, l[b]({type: e, target: c.currentTarget, preventDefault: q, touches: f()}))
            };
            k(w.prototype, {onContainerPointerDown: function (a) {
                e(a, "onContainerTouchStart", "touchstart", function (a) {
                    m[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                })
            }, onContainerPointerMove: function (a) {
                e(a, "onContainerTouchMove", "touchmove", function (a) {
                    m[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                    m[a.pointerId].target || (m[a.pointerId].target = a.currentTarget)
                })
            }, onDocumentPointerUp: function (a) {
                e(a,
                    "onDocumentTouchEnd", "touchend", function (a) {
                        delete m[a.pointerId]
                    })
            }, batchMSEvents: function (a) {
                a(this.chart.container, g ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                a(this.chart.container, g ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(v, g ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }});
            z(w.prototype, "init", function (a, b, e) {
                a.call(this, b, e);
                this.hasZoom && H(b.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            z(w.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(G)
            });
            z(w.prototype, "destroy", function (a) {
                this.batchMSEvents(t);
                a.call(this)
            })
        }
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.css, H = a.discardElement, v = a.defined, k = a.each, q = a.isFirefox, w = a.marginNames, t = a.merge, u = a.pick, z = a.setAnimation, m = a.stableSort, g = a.win, f = a.wrap;
        a.Legend = function (a, c) {
            this.init(a, c)
        };
        a.Legend.prototype = {init: function (a, c) {
            this.chart = a;
            this.setOptions(c);
            c.enabled && (this.render(), G(this.chart, "endResize", function () {
                this.legend.positionCheckboxes()
            }))
        },
            setOptions: function (a) {
                var c = u(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = t(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = u(a.symbolWidth, 16);
                this.pages = []
            }, update: function (a, c) {
                var b = this.chart;
                this.setOptions(t(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                u(c, !0) && b.redraw()
            }, colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" :
                    "addClass"]("highcharts-legend-item-hidden");
                var b = this.options, e = a.legendItem, l = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, b = c ? b.itemStyle.color : g, m = c ? a.color || g : g, k = a.options && a.options.marker, n = {fill: m};
                e && e.css({fill: b, color: b});
                l && l.attr({stroke: m});
                f && (k && f.isMarker && (n = a.pointAttribs(), c || (n.stroke = n.fill = g)), f.attr(n))
            }, positionItem: function (a) {
                var c = this.options, b = c.symbolPadding, c = !c.rtl, e = a._legendItemPos, l = e[0], e = e[1], f = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ?
                    l : this.legendWidth - l - 2 * b - 4, e);
                f && (f.x = l, f.y = e)
            }, destroyItem: function (a) {
                var c = a.checkbox;
                k(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                c && H(a.checkbox)
            }, destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                k(this.getAllItems(), function (c) {
                    k(["legendItem", "legendGroup"], a, c)
                });
                k("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            }, positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
                    c, b = this.clipHeight || this.legendHeight, f = this.titleHeight;
                a && (c = a.translateY, k(this.allItems, function (e) {
                    var l = e.checkbox, g;
                    l && (g = c + f + l.y + (this.scrollOffset || 0) + 3, E(l, {left: a.translateX + e.checkboxOffset + l.x - 20 + "px", top: g + "px", display: g > c - 6 && g < c + b - 6 ? "" : "none"}))
                }, this))
            }, renderTitle: function () {
                var a = this.options, c = this.padding, b = a.title, f = 0;
                b.text && (this.title || (this.title = this.chart.renderer.label(b.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group)),
                    a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: f}));
                this.titleHeight = f
            }, setText: function (e) {
                var c = this.options;
                e.legendItem.attr({text: c.labelFormat ? a.format(c.labelFormat, e) : c.labelFormatter.call(e)})
            }, renderItem: function (a) {
                var c = this.chart, b = c.renderer, e = this.options, l = "horizontal" === e.layout, f = this.symbolWidth, g = e.symbolPadding, m = this.itemStyle, k = this.itemHiddenStyle, n = this.padding, B = l ? u(e.itemDistance, 20) : 0, q = !e.rtl, A = e.width, d = e.itemMarginBottom ||
                    0, p = this.itemMarginTop, D = a.legendItem, h = !a.series, y = !h && a.series.drawLegendSymbol ? a.series : a, v = y.options, M = this.createCheckboxForItem && v && v.showCheckbox, v = f + g + B + (M ? 20 : 0), w = e.useHTML, N = a.options.className;
                D || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + y.type + "-series highcharts-color-" + a.colorIndex + (N ? " " + N : "") + (h ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = D = b.text("", q ? f + g : -g, this.baseline || 0, w).css(t(a.visible ? m : k)).attr({align: q ? "left" : "right",
                    zIndex: 2}).add(a.legendGroup), this.baseline || (f = m.fontSize, this.fontMetrics = b.fontMetrics(f, D), this.baseline = this.fontMetrics.f + 3 + p, D.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, y.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, D, w), M && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                m.width || D.css({width: (e.itemWidth || e.width || c.spacingBox.width) - v});
                this.setText(a);
                b = D.getBBox();
                m = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width +
                    v;
                this.itemHeight = b = Math.round(a.legendItemHeight || b.height || this.symbolHeight);
                l && this.itemX - n + m > (A || c.spacingBox.width - 2 * n - e.x) && (this.itemX = n, this.itemY += p + this.lastLineHeight + d, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, m);
                this.lastItemY = p + this.itemY + d;
                this.lastLineHeight = Math.max(b, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                l ? this.itemX += m : (this.itemY += p + b + d, this.lastLineHeight = b);
                this.offsetWidth = A || Math.max((l ? this.itemX - n - (a.checkbox ? 0 : B) : m) + n, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                k(this.chart.series, function (c) {
                    var b = c && c.options;
                    c && u(b.showInLegend, v(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                return a
            }, getAlignment: function () {
                var a = this.options;
                return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            }, adjustMargins: function (a, c) {
                var b = this.chart, e = this.options, l = this.getAlignment();
                l && k([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (f, g) {
                    f.test(l) && !v(a[g]) && (b[w[g]] = Math.max(b[w[g]], b.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * e[g % 2 ? "x" : "y"] + u(e.margin, 12) + c[g] + (0 === g ? b.titleOffset + b.options.title.margin : 0)))
                })
            }, render: function () {
                var a = this, c = a.chart, b = c.renderer, f = a.group, l, g, q, x, F = a.box, n = a.options, B = a.padding;
                a.itemX = B;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                f || (a.group = f = b.g("legend").attr({zIndex: 7}).add(), a.contentGroup = b.g().attr({zIndex: 1}).add(f), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                l = a.getAllItems();
                m(l, function (a, b) {
                    return(a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                n.reversed && l.reverse();
                a.allItems = l;
                a.display = g = !!l.length;
                a.lastLineHeight = 0;
                k(l, function (b) {
                    a.renderItem(b)
                });
                q = (n.width || a.offsetWidth) + B;
                x = a.lastItemY + a.lastLineHeight + a.titleHeight;
                x = a.handleOverflow(x);
                x += B;
                F || (a.box = F = b.rect().addClass("highcharts-legend-box").attr({r: n.borderRadius}).add(f), F.isNew = !0);
                F.attr({stroke: n.borderColor, "stroke-width": n.borderWidth || 0, fill: n.backgroundColor ||
                    "none"}).shadow(n.shadow);
                0 < q && 0 < x && (F[F.isNew ? "attr" : "animate"](F.crisp.call({}, {x: 0, y: 0, width: q, height: x}, F.strokeWidth())), F.isNew = !1);
                F[g ? "show" : "hide"]();
                a.legendWidth = q;
                a.legendHeight = x;
                k(l, function (b) {
                    a.positionItem(b)
                });
                g && (b = c.spacingBox, /(lth|ct|rth)/.test(a.getAlignment()) && (b = t(b, {y: b.y + c.titleOffset + c.options.title.margin})), f.align(t(n, {width: q, height: x}), !0, b));
                c.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var c = this, b = this.chart, e = b.renderer, l = this.options, f =
                    l.y, g = this.padding, b = b.spacingBox.height + ("top" === l.verticalAlign ? -f : f) - g, f = l.maxHeight, m, F = this.clipRect, n = l.navigation, B = u(n.animation, !0), q = n.arrowSize || 12, A = this.nav, d = this.pages, p, D = this.allItems, h = function (a) {
                    "number" === typeof a ? F.attr({height: a}) : F && (c.clipRect = F.destroy(), c.contentGroup.clip());
                    c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + g + "px,9999px," + (g + a) + "px,0)" : "auto")
                };
                "horizontal" !== l.layout || "middle" === l.verticalAlign || l.floating || (b /= 2);
                f && (b = Math.min(b, f));
                d.length =
                    0;
                a > b && !1 !== n.enabled ? (this.clipHeight = m = Math.max(b - 20 - this.titleHeight - g, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, k(D, function (a, b) {
                    var c = a._legendItemPos[1], h = Math.round(a.legendItem.getBBox().height), e = d.length;
                    if (!e || c - d[e - 1] > m && (p || c) !== d[e - 1])d.push(p || c), e++;
                    a.pageIx = e - 1;
                    p && (D[b - 1].pageIx = e - 1);
                    b === D.length - 1 && c + h - d[e - 1] > m && (d.push(c), a.pageIx = e);
                    c !== p && (p = c)
                }), F || (F = c.clipRect = e.clipRect(0, g, 9999, 0), c.contentGroup.clip(F)), h(m), A || (this.nav = A = e.g().attr({zIndex: 1}).add(this.group),
                    this.up = e.symbol("triangle", 0, 0, q, q).on("click",function () {
                        c.scroll(-1, B)
                    }).add(A), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").css(n.style).add(A), this.down = e.symbol("triangle-down", 0, 0, q, q).on("click",function () {
                    c.scroll(1, B)
                }).add(A)), c.scroll(0), a = b) : A && (h(), this.nav = A.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, c) {
                var b = this.pages, e = b.length;
                a = this.currentPage + a;
                var l = this.clipHeight, f = this.options.navigation, g = this.pager,
                    m = this.padding;
                a > e && (a = e);
                0 < a && (void 0 !== c && z(c, this.chart), this.nav.attr({translateX: m, translateY: l + this.padding + 7 + this.titleHeight, visibility: "visible"}), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), g.attr({text: a + "/" + e}), this.down.attr({x: 18 + this.pager.getBBox().width, "class": a === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), this.up.attr({fill: 1 === a ? f.inactiveColor : f.activeColor}).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({fill: a ===
                    e ? f.inactiveColor : f.activeColor}).css({cursor: a === e ? "default" : "pointer"}), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = a, this.positionCheckboxes())
            }};
        a.LegendSymbolMixin = {drawRectangle: function (a, c) {
            var b = a.symbolHeight, e = a.options.squareSymbol;
            c.legendSymbol = this.chart.renderer.rect(e ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, e ? b : a.symbolWidth, b, u(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(c.legendGroup)
        },
            drawLineMarker: function (a) {
                var c = this.options, b = c.marker, e = a.symbolWidth, l = a.symbolHeight, f = l / 2, g = this.chart.renderer, m = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var k;
                k = {"stroke-width": c.lineWidth || 0};
                c.dashStyle && (k.dashstyle = c.dashStyle);
                this.legendLine = g.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(k).add(m);
                b && !1 !== b.enabled && (c = Math.min(u(b.radius, f), f), 0 === this.symbol.indexOf("url") && (b = t(b, {width: l, height: l}), c = 0), this.legendSymbol = b = g.symbol(this.symbol, e /
                    2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(m), b.isMarker = !0)
            }};
        (/Trident\/7\.0/.test(g.navigator.userAgent) || q) && f(a.Legend.prototype, "positionItem", function (a, c) {
            var b = this, e = function () {
                c._legendItemPos && a.call(b, c)
            };
            e();
            setTimeout(e)
        })
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.animate, H = a.animObject, v = a.attr, k = a.doc, q = a.Axis, w = a.createElement, t = a.defaultOptions, u = a.discardElement, z = a.charts, m = a.css, g = a.defined, f = a.each, e = a.extend, c = a.find, b = a.fireEvent, r = a.grep, l = a.isNumber, C = a.isObject, I =
            a.isString, x = a.Legend, F = a.marginNames, n = a.merge, B = a.objectEach, J = a.Pointer, A = a.pick, d = a.pInt, p = a.removeEvent, D = a.seriesTypes, h = a.splat, y = a.svg, P = a.syncTimeout, M = a.win, O = a.Chart = function () {
            this.getArgs.apply(this, arguments)
        };
        a.chart = function (a, d, b) {
            return new O(a, d, b)
        };
        e(O.prototype, {callbacks: [], getArgs: function () {
            var a = [].slice.call(arguments);
            if (I(a[0]) || a[0].nodeName)this.renderTo = a.shift();
            this.init(a[0], a[1])
        }, init: function (d, b) {
            var c, h, p = d.series, e = d.plotOptions || {};
            d.series = null;
            c = n(t, d);
            for (h in c.plotOptions)c.plotOptions[h].tooltip =
                e[h] && n(e[h].tooltip) || void 0;
            c.tooltip.userOptions = d.chart && d.chart.forExport && d.tooltip.userOptions || d.tooltip;
            c.series = d.series = p;
            this.userOptions = d;
            d = c.chart;
            h = d.events;
            this.margin = [];
            this.spacing = [];
            this.bounds = {h: {}, v: {}};
            this.labelCollectors = [];
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var l = this;
            l.index = z.length;
            z.push(l);
            a.chartCount++;
            h && B(h, function (a, d) {
                G(l, d, a)
            });
            l.xAxis = [];
            l.yAxis = [];
            l.pointCount = l.colorCounter = l.symbolCounter =
                0;
            l.firstRender()
        }, initSeries: function (d) {
            var b = this.options.chart;
            (b = D[d.type || b.type || b.defaultSeriesType]) || a.error(17, !0);
            b = new b;
            b.init(this, d);
            return b
        }, orderSeries: function (a) {
            var d = this.series;
            for (a = a || 0; a < d.length; a++)d[a] && (d[a].index = a, d[a].name = d[a].name || "Series " + (d[a].index + 1))
        }, isInsidePlot: function (a, d, b) {
            var c = b ? d : a;
            a = b ? a : d;
            return 0 <= c && c <= this.plotWidth && 0 <= a && a <= this.plotHeight
        }, redraw: function (d) {
            var c = this.axes, h = this.series, p = this.pointer, n = this.legend, l = this.isDirtyLegend,
                A, g, y = this.hasCartesianSeries, D = this.isDirtyBox, m, r = this.renderer, x = r.isHidden(), B = [];
            this.setResponsive && this.setResponsive(!1);
            a.setAnimation(d, this);
            x && this.temporaryDisplay();
            this.layOutTitles();
            for (d = h.length; d--;)if (m = h[d], m.options.stacking && (A = !0, m.isDirty)) {
                g = !0;
                break
            }
            if (g)for (d = h.length; d--;)m = h[d], m.options.stacking && (m.isDirty = !0);
            f(h, function (a) {
                a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), l = !0);
                a.isDirtyData && b(a, "updatedData")
            });
            l && n.options.enabled &&
            (n.render(), this.isDirtyLegend = !1);
            A && this.getStacks();
            y && f(c, function (a) {
                a.updateNames();
                a.setScale()
            });
            this.getMargins();
            y && (f(c, function (a) {
                a.isDirty && (D = !0)
            }), f(c, function (a) {
                var d = a.min + "," + a.max;
                a.extKey !== d && (a.extKey = d, B.push(function () {
                    b(a, "afterSetExtremes", e(a.eventArgs, a.getExtremes()));
                    delete a.eventArgs
                }));
                (D || A) && a.redraw()
            }));
            D && this.drawChartBox();
            b(this, "predraw");
            f(h, function (a) {
                (D || a.isDirty) && a.visible && a.redraw();
                a.isDirtyData = !1
            });
            p && p.reset(!0);
            r.draw();
            b(this, "redraw");
            b(this,
                "render");
            x && this.temporaryDisplay(!0);
            f(B, function (a) {
                a.call()
            })
        }, get: function (a) {
            function d(d) {
                return d.id === a || d.options && d.options.id === a
            }

            var b, h = this.series, p;
            b = c(this.axes, d) || c(this.series, d);
            for (p = 0; !b && p < h.length; p++)b = c(h[p].points || [], d);
            return b
        }, getAxes: function () {
            var a = this, d = this.options, b = d.xAxis = h(d.xAxis || {}), d = d.yAxis = h(d.yAxis || {});
            f(b, function (a, d) {
                a.index = d;
                a.isX = !0
            });
            f(d, function (a, d) {
                a.index = d
            });
            b = b.concat(d);
            f(b, function (d) {
                new q(a, d)
            })
        }, getSelectedPoints: function () {
            var a =
                [];
            f(this.series, function (d) {
                a = a.concat(r(d.data || [], function (a) {
                    return a.selected
                }))
            });
            return a
        }, getSelectedSeries: function () {
            return r(this.series, function (a) {
                return a.selected
            })
        }, setTitle: function (a, d, b) {
            var c = this, h = c.options, p;
            p = h.title = n({style: {color: "#333333", fontSize: h.isStock ? "16px" : "18px"}}, h.title, a);
            h = h.subtitle = n({style: {color: "#666666"}}, h.subtitle, d);
            f([
                ["title", a, p],
                ["subtitle", d, h]
            ], function (a, d) {
                var b = a[0], h = c[b], p = a[1];
                a = a[2];
                h && p && (c[b] = h = h.destroy());
                a && !h && (c[b] = c.renderer.text(a.text,
                    0, 0, a.useHTML).attr({align: a.align, "class": "highcharts-" + b, zIndex: a.zIndex || 4}).add(), c[b].update = function (a) {
                    c.setTitle(!d && a, d && a)
                }, c[b].css(a.style))
            });
            c.layOutTitles(b)
        }, layOutTitles: function (a) {
            var d = 0, b, c = this.renderer, h = this.spacingBox;
            f(["title", "subtitle"], function (a) {
                var b = this[a], p = this.options[a];
                a = "title" === a ? -3 : p.verticalAlign ? 0 : d + 2;
                var n;
                b && (n = p.style.fontSize, n = c.fontMetrics(n, b).b, b.css({width: (p.width || h.width + p.widthAdjust) + "px"}).align(e({y: a + n}, p), !1, "spacingBox"), p.floating ||
                    p.verticalAlign || (d = Math.ceil(d + b.getBBox(p.useHTML).height)))
            }, this);
            b = this.titleOffset !== d;
            this.titleOffset = d;
            !this.isDirtyBox && b && (this.isDirtyBox = b, this.hasRendered && A(a, !0) && this.isDirtyBox && this.redraw())
        }, getChartSize: function () {
            var d = this.options.chart, b = d.width, d = d.height, c = this.renderTo;
            g(b) || (this.containerWidth = a.getStyle(c, "width"));
            g(d) || (this.containerHeight = a.getStyle(c, "height"));
            this.chartWidth = Math.max(0, b || this.containerWidth || 600);
            this.chartHeight = Math.max(0, a.relativeLength(d,
                this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
        }, temporaryDisplay: function (d) {
            var b = this.renderTo;
            if (d)for (; b && b.style;)b.hcOrigStyle && (a.css(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (k.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode; else for (; b && b.style;) {
                k.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, k.body.appendChild(b));
                if ("none" === a.getStyle(b, "display", !1) || b.hcOricDetached)b.hcOrigStyle = {display: b.style.display, height: b.style.height, overflow: b.style.overflow},
                    d = {display: "block", overflow: "hidden"}, b !== this.renderTo && (d.height = 0), a.css(b, d), b.offsetWidth || b.style.setProperty("display", "block", "important");
                b = b.parentNode;
                if (b === k.body)break
            }
        }, setClassName: function (a) {
            this.container.className = "highcharts-container " + (a || "")
        }, getContainer: function () {
            var b, c = this.options, h = c.chart, p, n;
            b = this.renderTo;
            var f = a.uniqueKey(), A;
            b || (this.renderTo = b = h.renderTo);
            I(b) && (this.renderTo = b = k.getElementById(b));
            b || a.error(13, !0);
            p = d(v(b, "data-highcharts-chart"));
            l(p) && z[p] &&
                z[p].hasRendered && z[p].destroy();
            v(b, "data-highcharts-chart", this.index);
            b.innerHTML = "";
            h.skipClone || b.offsetWidth || this.temporaryDisplay();
            this.getChartSize();
            p = this.chartWidth;
            n = this.chartHeight;
            A = e({position: "relative", overflow: "hidden", width: p + "px", height: n + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)"}, h.style);
            this.container = b = w("div", {id: f}, A, b);
            this._cursor = b.style.cursor;
            this.renderer = new (a[h.renderer] || a.Renderer)(b, p, n, null, h.forExport,
                c.exporting && c.exporting.allowHTML);
            this.setClassName(h.className);
            this.renderer.setStyle(h.style);
            this.renderer.chartIndex = this.index
        }, getMargins: function (a) {
            var d = this.spacing, b = this.margin, c = this.titleOffset;
            this.resetMargins();
            c && !g(b[0]) && (this.plotTop = Math.max(this.plotTop, c + this.options.title.margin + d[0]));
            this.legend && this.legend.display && this.legend.adjustMargins(b, d);
            this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
            this.adjustPlotArea &&
            this.adjustPlotArea();
            a || this.getAxisMargins()
        }, getAxisMargins: function () {
            var a = this, d = a.axisOffset = [0, 0, 0, 0], b = a.margin;
            a.hasCartesianSeries && f(a.axes, function (a) {
                a.visible && a.getOffset()
            });
            f(F, function (c, h) {
                g(b[h]) || (a[c] += d[h])
            });
            a.setChartSize()
        }, reflow: function (d) {
            var b = this, c = b.options.chart, h = b.renderTo, p = g(c.width) && g(c.height), e = c.width || a.getStyle(h, "width"), c = c.height || a.getStyle(h, "height"), h = d ? d.target : M;
            if (!p && !b.isPrinting && e && c && (h === M || h === k)) {
                if (e !== b.containerWidth || c !== b.containerHeight)clearTimeout(b.reflowTimeout),
                    b.reflowTimeout = P(function () {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, d ? 100 : 0);
                b.containerWidth = e;
                b.containerHeight = c
            }
        }, initReflow: function () {
            var a = this, d;
            d = G(M, "resize", function (d) {
                a.reflow(d)
            });
            G(a, "destroy", d)
        }, setSize: function (d, c, h) {
            var p = this, e = p.renderer;
            p.isResizing += 1;
            a.setAnimation(h, p);
            p.oldChartHeight = p.chartHeight;
            p.oldChartWidth = p.chartWidth;
            void 0 !== d && (p.options.chart.width = d);
            void 0 !== c && (p.options.chart.height = c);
            p.getChartSize();
            d = e.globalAnimation;
            (d ? E : m)(p.container, {width: p.chartWidth +
                "px", height: p.chartHeight + "px"}, d);
            p.setChartSize(!0);
            e.setSize(p.chartWidth, p.chartHeight, h);
            f(p.axes, function (a) {
                a.isDirty = !0;
                a.setScale()
            });
            p.isDirtyLegend = !0;
            p.isDirtyBox = !0;
            p.layOutTitles();
            p.getMargins();
            p.redraw(h);
            p.oldChartHeight = null;
            b(p, "resize");
            P(function () {
                p && b(p, "endResize", null, function () {
                    --p.isResizing
                })
            }, H(d).duration)
        }, setChartSize: function (a) {
            var d = this.inverted, b = this.renderer, c = this.chartWidth, h = this.chartHeight, p = this.options.chart, e = this.spacing, n = this.clipOffset, l, A, g, y;
            this.plotLeft =
                l = Math.round(this.plotLeft);
            this.plotTop = A = Math.round(this.plotTop);
            this.plotWidth = g = Math.max(0, Math.round(c - l - this.marginRight));
            this.plotHeight = y = Math.max(0, Math.round(h - A - this.marginBottom));
            this.plotSizeX = d ? y : g;
            this.plotSizeY = d ? g : y;
            this.plotBorderWidth = p.plotBorderWidth || 0;
            this.spacingBox = b.spacingBox = {x: e[3], y: e[0], width: c - e[3] - e[1], height: h - e[0] - e[2]};
            this.plotBox = b.plotBox = {x: l, y: A, width: g, height: y};
            c = 2 * Math.floor(this.plotBorderWidth / 2);
            d = Math.ceil(Math.max(c, n[3]) / 2);
            b = Math.ceil(Math.max(c,
                n[0]) / 2);
            this.clipBox = {x: d, y: b, width: Math.floor(this.plotSizeX - Math.max(c, n[1]) / 2 - d), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, n[2]) / 2 - b))};
            a || f(this.axes, function (a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        }, resetMargins: function () {
            var a = this, d = a.options.chart;
            f(["margin", "spacing"], function (b) {
                var c = d[b], h = C(c) ? c : [c, c, c, c];
                f(["Top", "Right", "Bottom", "Left"], function (c, p) {
                    a[b][p] = A(d[b + c], h[p])
                })
            });
            f(F, function (d, b) {
                a[d] = A(a.margin[b], a.spacing[b])
            });
            a.axisOffset = [0, 0, 0, 0];
            a.clipOffset =
                [0, 0, 0, 0]
        }, drawChartBox: function () {
            var a = this.options.chart, d = this.renderer, b = this.chartWidth, c = this.chartHeight, h = this.chartBackground, p = this.plotBackground, e = this.plotBorder, n, l = this.plotBGImage, A = a.backgroundColor, f = a.plotBackgroundColor, g = a.plotBackgroundImage, y, D = this.plotLeft, m = this.plotTop, r = this.plotWidth, x = this.plotHeight, B = this.plotBox, k = this.clipRect, F = this.clipBox, q = "animate";
            h || (this.chartBackground = h = d.rect().addClass("highcharts-background").add(), q = "attr");
            n = a.borderWidth || 0;
            y = n + (a.shadow ?
                8 : 0);
            A = {fill: A || "none"};
            if (n || h["stroke-width"])A.stroke = a.borderColor, A["stroke-width"] = n;
            h.attr(A).shadow(a.shadow);
            h[q]({x: y / 2, y: y / 2, width: b - y - n % 2, height: c - y - n % 2, r: a.borderRadius});
            q = "animate";
            p || (q = "attr", this.plotBackground = p = d.rect().addClass("highcharts-plot-background").add());
            p[q](B);
            p.attr({fill: f || "none"}).shadow(a.plotShadow);
            g && (l ? l.animate(B) : this.plotBGImage = d.image(g, D, m, r, x).add());
            k ? k.animate({width: F.width, height: F.height}) : this.clipRect = d.clipRect(F);
            q = "animate";
            e || (q = "attr", this.plotBorder =
                e = d.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
            e.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
            e[q](e.crisp({x: D, y: m, width: r, height: x}, -e.strokeWidth()));
            this.isDirtyBox = !1
        }, propFromSeries: function () {
            var a = this, d = a.options.chart, b, c = a.options.series, h, p;
            f(["inverted", "angular", "polar"], function (e) {
                b = D[d.type || d.defaultSeriesType];
                p = d[e] || b && b.prototype[e];
                for (h = c && c.length; !p && h--;)(b = D[c[h].type]) && b.prototype[e] && (p = !0);
                a[e] = p
            })
        }, linkSeries: function () {
            var a =
                this, d = a.series;
            f(d, function (a) {
                a.linkedSeries.length = 0
            });
            f(d, function (d) {
                var b = d.options.linkedTo;
                I(b) && (b = ":previous" === b ? a.series[d.index - 1] : a.get(b)) && b.linkedParent !== d && (b.linkedSeries.push(d), d.linkedParent = b, d.visible = A(d.options.visible, b.options.visible, d.visible))
            })
        }, renderSeries: function () {
            f(this.series, function (a) {
                a.translate();
                a.render()
            })
        }, renderLabels: function () {
            var a = this, b = a.options.labels;
            b.items && f(b.items, function (c) {
                var h = e(b.style, c.style), p = d(h.left) + a.plotLeft, n = d(h.top) +
                    a.plotTop + 12;
                delete h.left;
                delete h.top;
                a.renderer.text(c.html, p, n).attr({zIndex: 2}).css(h).add()
            })
        }, render: function () {
            var a = this.axes, d = this.renderer, b = this.options, c, h, p;
            this.setTitle();
            this.legend = new x(this, b.legend);
            this.getStacks && this.getStacks();
            this.getMargins(!0);
            this.setChartSize();
            b = this.plotWidth;
            c = this.plotHeight = Math.max(this.plotHeight - 21, 0);
            f(a, function (a) {
                a.setScale()
            });
            this.getAxisMargins();
            h = 1.1 < b / this.plotWidth;
            p = 1.05 < c / this.plotHeight;
            if (h || p)f(a, function (a) {
                (a.horiz && h || !a.horiz &&
                    p) && a.setTickInterval(!0)
            }), this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && f(a, function (a) {
                a.visible && a.render()
            });
            this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({zIndex: 3}).add());
            this.renderSeries();
            this.renderLabels();
            this.addCredits();
            this.setResponsive && this.setResponsive();
            this.hasRendered = !0
        }, addCredits: function (a) {
            var d = this;
            a = n(!0, this.options.credits, a);
            a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click",
                function () {
                    a.href && (M.location.href = a.href)
                }).attr({align: a.position.align, zIndex: 8}).css(a.style).add().align(a.position), this.credits.update = function (a) {
                d.credits = d.credits.destroy();
                d.addCredits(a)
            })
        }, destroy: function () {
            var d = this, c = d.axes, h = d.series, e = d.container, n, l = e && e.parentNode;
            b(d, "destroy");
            d.renderer.forExport ? a.erase(z, d) : z[d.index] = void 0;
            a.chartCount--;
            d.renderTo.removeAttribute("data-highcharts-chart");
            p(d);
            for (n = c.length; n--;)c[n] = c[n].destroy();
            this.scroller && this.scroller.destroy &&
            this.scroller.destroy();
            for (n = h.length; n--;)h[n] = h[n].destroy();
            f("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                var b = d[a];
                b && b.destroy && (d[a] = b.destroy())
            });
            e && (e.innerHTML = "", p(e), l && u(e));
            B(d, function (a, b) {
                delete d[b]
            })
        }, isReadyToRender: function () {
            var a = this;
            return y || M != M.top || "complete" === k.readyState ? !0 : (k.attachEvent("onreadystatechange", function () {
                k.detachEvent("onreadystatechange",
                    a.firstRender);
                "complete" === k.readyState && a.firstRender()
            }), !1)
        }, firstRender: function () {
            var a = this, d = a.options;
            if (a.isReadyToRender()) {
                a.getContainer();
                b(a, "init");
                a.resetMargins();
                a.setChartSize();
                a.propFromSeries();
                a.getAxes();
                f(d.series || [], function (d) {
                    a.initSeries(d)
                });
                a.linkSeries();
                b(a, "beforeRender");
                J && (a.pointer = new J(a, d));
                a.render();
                if (!a.renderer.imgCount && a.onload)a.onload();
                a.temporaryDisplay(!0)
            }
        }, onload: function () {
            f([this.callback].concat(this.callbacks), function (a) {
                a && void 0 !== this.index &&
                a.apply(this, [this])
            }, this);
            b(this, "load");
            b(this, "render");
            g(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
            this.onload = null
        }})
    })(L);
    (function (a) {
        var G, E = a.each, H = a.extend, v = a.erase, k = a.fireEvent, q = a.format, w = a.isArray, t = a.isNumber, u = a.pick, z = a.removeEvent;
        a.Point = G = function () {
        };
        a.Point.prototype = {init: function (a, g, f) {
            this.series = a;
            this.color = a.color;
            this.applyOptions(g, f);
            a.options.colorByPoint ? (g = a.options.colors || a.chart.options.colors, this.color = this.color || g[a.colorCounter],
                g = g.length, f = a.colorCounter, a.colorCounter++, a.colorCounter === g && (a.colorCounter = 0)) : f = a.colorIndex;
            this.colorIndex = u(this.colorIndex, f);
            a.chart.pointCount++;
            return this
        }, applyOptions: function (a, g) {
            var f = this.series, e = f.options.pointValKey || f.pointValKey;
            a = G.prototype.optionsToObject.call(this, a);
            H(this, a);
            this.options = this.options ? H(this.options, a) : a;
            a.group && delete this.group;
            e && (this.y = this[e]);
            this.isNull = u(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
            this.selected && (this.state =
                "select");
            "name"in this && void 0 === g && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
            void 0 === this.x && f && (this.x = void 0 === g ? f.autoIncrement(this) : g);
            return this
        }, optionsToObject: function (a) {
            var g = {}, f = this.series, e = f.options.keys, c = e || f.pointArrayMap || ["y"], b = c.length, m = 0, l = 0;
            if (t(a) || null === a)g[c[0]] = a; else if (w(a))for (!e && a.length > b && (f = typeof a[0], "string" === f ? g.name = a[0] : "number" === f && (g.x = a[0]), m++); l < b;)e && void 0 === a[m] || (g[c[l]] = a[m]), m++, l++; else"object" === typeof a && (g = a, a.dataLabels &&
                (f._hasPointLabels = !0), a.marker && (f._hasPointMarkers = !0));
            return g
        }, getClassName: function () {
            return"highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
        }, getZone: function () {
            var a = this.series,
                g = a.zones, a = a.zoneAxis || "y", f = 0, e;
            for (e = g[f]; this[a] >= e.value;)e = g[++f];
            e && e.color && !this.options.color && (this.color = e.color);
            return e
        }, destroy: function () {
            var a = this.series.chart, g = a.hoverPoints, f;
            a.pointCount--;
            g && (this.setState(), v(g, this), g.length || (a.hoverPoints = null));
            if (this === a.hoverPoint)this.onMouseOut();
            if (this.graphic || this.dataLabel)z(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (f in this)this[f] = null
        }, destroyElements: function () {
            for (var a = ["graphic", "dataLabel",
                "dataLabelUpper", "connector", "shadowGroup"], g, f = 6; f--;)g = a[f], this[g] && (this[g] = this[g].destroy())
        }, getLabelConfig: function () {
            return{x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal}
        }, tooltipFormatter: function (a) {
            var g = this.series, f = g.tooltipOptions, e = u(f.valueDecimals, ""), c = f.valuePrefix || "", b = f.valueSuffix || "";
            E(g.pointArrayMap || ["y"], function (f) {
                f = "{point." +
                    f;
                if (c || b)a = a.replace(f + "}", c + f + "}" + b);
                a = a.replace(f + "}", f + ":,." + e + "f}")
            });
            return q(a, {point: this, series: this.series})
        }, firePointEvent: function (a, g, f) {
            var e = this, c = this.series.options;
            (c.point.events[a] || e.options && e.options.events && e.options.events[a]) && this.importEvents();
            "click" === a && c.allowPointSelect && (f = function (a) {
                e.select && e.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            k(this, a, g, f)
        }, visible: !0}
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.animObject, H = a.arrayMax, v = a.arrayMin, k = a.correctFloat,
            q = a.Date, w = a.defaultOptions, t = a.defaultPlotOptions, u = a.defined, z = a.each, m = a.erase, g = a.extend, f = a.fireEvent, e = a.grep, c = a.isArray, b = a.isNumber, r = a.isString, l = a.merge, C = a.objectEach, I = a.pick, x = a.removeEvent, F = a.splat, n = a.SVGElement, B = a.syncTimeout, J = a.win;
        a.Series = a.seriesType("line", null, {lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: {duration: 1E3}, events: {}, marker: {lineWidth: 0, lineColor: "#ffffff", radius: 4, states: {hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1}, select: {fillColor: "#cccccc",
                lineColor: "#000000", lineWidth: 2}}}, point: {events: {}}, dataLabels: {align: "center", formatter: function () {
                return null === this.y ? "" : a.numberFormat(this.y, -1)
            }, style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"}, verticalAlign: "bottom", x: 0, y: 0, padding: 5}, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: {hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}}, select: {marker: {}}}, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"},
            {isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function (a, d) {
                var b = this, c, h = a.series, e;
                b.chart = a;
                b.options = d = b.setOptions(d);
                b.linkedSeries = [];
                b.bindAxes();
                g(b, {name: d.name, state: "", visible: !1 !== d.visible, selected: !0 === d.selected});
                c = d.events;
                C(c, function (a, d) {
                    G(b, d, a)
                });
                if (c && c.click || d.point && d.point.events && d.point.events.click || d.allowPointSelect)a.runTrackerClick = !0;
                b.getColor();
                b.getSymbol();
                z(b.parallelArrays, function (a) {
                    b[a + "Data"] = []
                });
                b.setData(d.data, !1);
                b.isCartesian && (a.hasCartesianSeries = !0);
                h.length && (e = h[h.length - 1]);
                b._i = I(e && e._i, -1) + 1;
                a.orderSeries(this.insert(h))
            }, insert: function (a) {
                var d = this.options.index, c;
                if (b(d)) {
                    for (c = a.length; c--;)if (d >= I(a[c].options.index, a[c]._i)) {
                        a.splice(c + 1, 0, this);
                        break
                    }
                    -1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return I(c, a.length - 1)
            }, bindAxes: function () {
                var b = this, d = b.options, c = b.chart, e;
                z(b.axisTypes || [], function (h) {
                    z(c[h],
                        function (a) {
                            e = a.options;
                            if (d[h] === e.index || void 0 !== d[h] && d[h] === e.id || void 0 === d[h] && 0 === e.index)b.insert(a.series), b[h] = a, a.isDirty = !0
                        });
                    b[h] || b.optionalAxis === h || a.error(18, !0)
                })
            }, updateParallelArrays: function (a, d) {
                var c = a.series, e = arguments, h = b(d) ? function (b) {
                    var h = "y" === b && c.toYData ? c.toYData(a) : a[b];
                    c[b + "Data"][d] = h
                } : function (a) {
                    Array.prototype[d].apply(c[a + "Data"], Array.prototype.slice.call(e, 2))
                };
                z(c.parallelArrays, h)
            }, autoIncrement: function () {
                var b = this.options, d = this.xIncrement, c, e = b.pointIntervalUnit,
                    h = 0, d = I(d, b.pointStart, 0);
                this.pointInterval = c = I(this.pointInterval, b.pointInterval, 1);
                e && (b = new q(d), "day" === e ? b = +b[q.hcSetDate](b[q.hcGetDate]() + c) : "month" === e ? b = +b[q.hcSetMonth](b[q.hcGetMonth]() + c) : "year" === e && (b = +b[q.hcSetFullYear](b[q.hcGetFullYear]() + c)), q.hcHasTimeZone && (h = a.getTZOffset(b) - a.getTZOffset(d)), c = b - d + h);
                this.xIncrement = d + c;
                return d
            }, setOptions: function (a) {
                var d = this.chart, b = d.options, c = b.plotOptions, h = (d.userOptions || {}).plotOptions || {}, e = c[this.type];
                this.userOptions = a;
                d = l(e,
                    c.series, a);
                this.tooltipOptions = l(w.tooltip, w.plotOptions.series && w.plotOptions.series.tooltip, w.plotOptions[this.type].tooltip, b.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, a.tooltip);
                this.stickyTracking = I(a.stickyTracking, h[this.type] && h[this.type].stickyTracking, h.series && h.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : d.stickyTracking);
                null === e.marker && delete d.marker;
                this.zoneAxis = d.zoneAxis;
                a = this.zones = (d.zones || []).slice();
                !d.negativeColor && !d.negativeFillColor || d.zones || a.push({value: d[this.zoneAxis + "Threshold"] || d.threshold || 0, className: "highcharts-negative", color: d.negativeColor, fillColor: d.negativeFillColor});
                a.length && u(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
                return d
            }, getCyclic: function (a, d, b) {
                var c, h = this.chart, p = this.userOptions, e = a + "Index", n = a + "Counter", l = b ? b.length : I(h.options.chart[a + "Count"], h[a + "Count"]);
                d || (c = I(p[e], p["_" + e]), u(c) || (h.series.length || (h[n] = 0), p["_" + e] = c = h[n] % l, h[n] += 1),
                    b && (d = b[c]));
                void 0 !== c && (this[e] = c);
                this[a] = d
            }, getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            }, getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, setData: function (e, d, p, n) {
                var h = this, l = h.points, f = l && l.length || 0, g, A = h.options, D = h.chart, m = null, x = h.xAxis, B = A.turboThreshold, k = this.xData, q =
                    this.yData, F = (g = h.pointArrayMap) && g.length;
                e = e || [];
                g = e.length;
                d = I(d, !0);
                if (!1 !== n && g && f === g && !h.cropped && !h.hasGroupedData && h.visible)z(e, function (a, d) {
                    l[d].update && a !== A.data[d] && l[d].update(a, !1, null, !1)
                }); else {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    z(this.parallelArrays, function (a) {
                        h[a + "Data"].length = 0
                    });
                    if (B && g > B) {
                        for (p = 0; null === m && p < g;)m = e[p], p++;
                        if (b(m))for (p = 0; p < g; p++)k[p] = this.autoIncrement(), q[p] = e[p]; else if (c(m))if (F)for (p = 0; p < g; p++)m = e[p], k[p] = m[0], q[p] = m.slice(1, F + 1); else for (p = 0; p < g; p++)m =
                            e[p], k[p] = m[0], q[p] = m[1]; else a.error(12)
                    } else for (p = 0; p < g; p++)void 0 !== e[p] && (m = {series: h}, h.pointClass.prototype.applyOptions.apply(m, [e[p]]), h.updateParallelArrays(m, p));
                    q && r(q[0]) && a.error(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = e;
                    for (p = f; p--;)l[p] && l[p].destroy && l[p].destroy();
                    x && (x.minRange = x.userMinRange);
                    h.isDirty = D.isDirtyBox = !0;
                    h.isDirtyData = !!l;
                    p = !1
                }
                "point" === A.legendType && (this.processData(), this.generatePoints());
                d && D.redraw(p)
            }, processData: function (b) {
                var d = this.xData, c = this.yData,
                    e = d.length, h;
                h = 0;
                var n, l, f = this.xAxis, g, A = this.options;
                g = A.cropThreshold;
                var m = this.getExtremesFromAll || A.getExtremesFromAll, x = this.isCartesian, A = f && f.val2lin, B = f && f.isLog, r = this.requireSorting, k, q;
                if (x && !this.isDirty && !f.isDirty && !this.yAxis.isDirty && !b)return!1;
                f && (b = f.getExtremes(), k = b.min, q = b.max);
                if (x && this.sorted && !m && (!g || e > g || this.forceCrop))if (d[e - 1] < k || d[0] > q)d = [], c = []; else if (d[0] < k || d[e - 1] > q)h = this.cropData(this.xData, this.yData, k, q), d = h.xData, c = h.yData, h = h.start, n = !0;
                for (g = d.length ||
                    1; --g;)e = B ? A(d[g]) - A(d[g - 1]) : d[g] - d[g - 1], 0 < e && (void 0 === l || e < l) ? l = e : 0 > e && r && (a.error(15), r = !1);
                this.cropped = n;
                this.cropStart = h;
                this.processedXData = d;
                this.processedYData = c;
                this.closestPointRange = l
            }, cropData: function (a, d, b, c) {
                var h = a.length, p = 0, e = h, n = I(this.cropShoulder, 1), l;
                for (l = 0; l < h; l++)if (a[l] >= b) {
                    p = Math.max(0, l - n);
                    break
                }
                for (b = l; b < h; b++)if (a[b] > c) {
                    e = b + n;
                    break
                }
                return{xData: a.slice(p, e), yData: d.slice(p, e), start: p, end: e}
            }, generatePoints: function () {
                var a = this.options, d = a.data, b = this.data, c, h = this.processedXData,
                    e = this.processedYData, n = this.pointClass, l = h.length, f = this.cropStart || 0, g, m = this.hasGroupedData, a = a.keys, x, B = [], r;
                b || m || (b = [], b.length = d.length, b = this.data = b);
                a && m && (this.options.keys = !1);
                for (r = 0; r < l; r++)g = f + r, m ? (x = (new n).init(this, [h[r]].concat(F(e[r]))), x.dataGroup = this.groupMap[r]) : (x = b[g]) || void 0 === d[g] || (b[g] = x = (new n).init(this, d[g], h[r])), x && (x.index = g, B[r] = x);
                this.options.keys = a;
                if (b && (l !== (c = b.length) || m))for (r = 0; r < c; r++)r !== f || m || (r += l), b[r] && (b[r].destroyElements(), b[r].plotX = void 0);
                this.data = b;
                this.points = B
            }, getExtremes: function (a) {
                var d = this.yAxis, p = this.processedXData, e, h = [], n = 0;
                e = this.xAxis.getExtremes();
                var l = e.min, f = e.max, g, A, m, r;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (r = 0; r < e; r++)if (A = p[r], m = a[r], g = (b(m, !0) || c(m)) && (!d.positiveValuesOnly || m.length || 0 < m), A = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (p[r + 1] || A) >= l && (p[r - 1] || A) <= f, g && A)if (g = m.length)for (; g--;)"number" === typeof m[g] && (h[n++] = m[g]); else h[n++] = m;
                this.dataMin =
                    v(h);
                this.dataMax = H(h)
            }, translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options, d = a.stacking, c = this.xAxis, e = c.categories, h = this.yAxis, n = this.points, l = n.length, f = !!this.modifyValue, g = a.pointPlacement, m = "between" === g || b(g), r = a.threshold, x = a.startFromThreshold ? r : 0, B, q, F, t, C = Number.MAX_VALUE;
                "between" === g && (g = .5);
                b(g) && (g *= I(a.pointRange || c.pointRange));
                for (a = 0; a < l; a++) {
                    var J = n[a], v = J.x, w = J.y;
                    q = J.low;
                    var z = d && h.stacks[(this.negStacks && w < (x ? 0 : r) ? "-" : "") + this.stackKey],
                        E;
                    h.positiveValuesOnly && null !== w && 0 >= w && (J.isNull = !0);
                    J.plotX = B = k(Math.min(Math.max(-1E5, c.translate(v, 0, 0, 0, 1, g, "flags" === this.type)), 1E5));
                    d && this.visible && !J.isNull && z && z[v] && (t = this.getStackIndicator(t, v, this.index), E = z[v], w = E.points[t.key], q = w[0], w = w[1], q === x && t.key === z[v].base && (q = I(r, h.min)), h.positiveValuesOnly && 0 >= q && (q = null), J.total = J.stackTotal = E.total, J.percentage = E.total && J.y / E.total * 100, J.stackY = w, E.setOffset(this.pointXOffset || 0, this.barW || 0));
                    J.yBottom = u(q) ? h.translate(q, 0, 1, 0, 1) :
                        null;
                    f && (w = this.modifyValue(w, J));
                    J.plotY = q = "number" === typeof w && Infinity !== w ? Math.min(Math.max(-1E5, h.translate(w, 0, 1, 0, 1)), 1E5) : void 0;
                    J.isInside = void 0 !== q && 0 <= q && q <= h.len && 0 <= B && B <= c.len;
                    J.clientX = m ? k(c.translate(v, 0, 0, 0, 1, g)) : B;
                    J.negative = J.y < (r || 0);
                    J.category = e && void 0 !== e[J.x] ? e[J.x] : J.x;
                    J.isNull || (void 0 !== F && (C = Math.min(C, Math.abs(B - F))), F = B);
                    J.zone = this.zones.length && J.getZone()
                }
                this.closestPointRangePx = C
            }, getValidPoints: function (a, d) {
                var b = this.chart;
                return e(a || this.points || [], function (a) {
                    return d && !b.isInsidePlot(a.plotX, a.plotY, b.inverted) ? !1 : !a.isNull
                })
            }, setClip: function (a) {
                var d = this.chart, b = this.options, c = d.renderer, h = d.inverted, e = this.clipBox, n = e || d.clipBox, l = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, n.height, b.xAxis, b.yAxis].join(), f = d[l], g = d[l + "m"];
                f || (a && (n.width = 0, h && (n.x = d.plotSizeX), d[l + "m"] = g = c.clipRect(h ? d.plotSizeX + 99 : -99, h ? -d.plotLeft : -d.plotTop, 99, h ? d.chartWidth : d.chartHeight)), d[l] = f = c.clipRect(n), f.count = {length: 0});
                a && !f.count[this.index] && (f.count[this.index] = !0, f.count.length += 1);
                !1 !== b.clip && (this.group.clip(a || e ? f : d.clipRect), this.markerGroup.clip(g), this.sharedClipKey = l);
                a || (f.count[this.index] && (delete f.count[this.index], --f.count.length), 0 === f.count.length && l && d[l] && (e || (d[l] = d[l].destroy()), d[l + "m"] && (d[l + "m"] = d[l + "m"].destroy())))
            }, animate: function (a) {
                var d = this.chart, b = E(this.options.animation), c;
                a ? this.setClip(b) : (c = this.sharedClipKey, (a = d[c]) && a.animate({width: d.plotSizeX, x: 0}, b), d[c + "m"] && d[c + "m"].animate({width: d.plotSizeX + 99, x: 0}, b), this.animate =
                    null)
            }, afterAnimate: function () {
                this.setClip();
                f(this, "afterAnimate");
                this.finishedAnimating = !0
            }, drawPoints: function () {
                var a = this.points, d = this.chart, b, c, h, e, n = this.options.marker, l, f, g, m = this[this.specialGroup] || this.markerGroup, r, x = I(n.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * n.radius);
                if (!1 !== n.enabled || this._hasPointMarkers)for (b = 0; b < a.length; b++)c = a[b], e = c.graphic, l = c.marker || {}, f = !!c.marker, h = x && void 0 === l.enabled || l.enabled, g = c.isInside, h && !c.isNull ? (h = I(l.symbol, this.symbol),
                    c.hasImage = 0 === h.indexOf("url"), r = this.markerAttribs(c, c.selected && "select"), e ? e[g ? "show" : "hide"](!0).animate(r) : g && (0 < r.width || c.hasImage) && (c.graphic = e = d.renderer.symbol(h, r.x, r.y, r.width, r.height, f ? l : n).add(m)), e && e.attr(this.pointAttribs(c, c.selected && "select")), e && e.addClass(c.getClassName(), !0)) : e && (c.graphic = e.destroy())
            }, markerAttribs: function (a, d) {
                var b = this.options.marker, c = a.marker || {}, h = I(c.radius, b.radius);
                d && (b = b.states[d], d = c.states && c.states[d], h = I(d && d.radius, b && b.radius, h + (b && b.radiusPlus ||
                    0)));
                a.hasImage && (h = 0);
                a = {x: Math.floor(a.plotX) - h, y: a.plotY - h};
                h && (a.width = a.height = 2 * h);
                return a
            }, pointAttribs: function (a, d) {
                var b = this.options.marker, c = a && a.options, h = c && c.marker || {}, e = this.color, n = c && c.color, l = a && a.color, c = I(h.lineWidth, b.lineWidth);
                a = a && a.zone && a.zone.color;
                e = n || a || l || e;
                a = h.fillColor || b.fillColor || e;
                e = h.lineColor || b.lineColor || e;
                d && (b = b.states[d], d = h.states && h.states[d] || {}, c = I(d.lineWidth, b.lineWidth, c + I(d.lineWidthPlus, b.lineWidthPlus, 0)), a = d.fillColor || b.fillColor || a, e = d.lineColor ||
                    b.lineColor || e);
                return{stroke: e, "stroke-width": c, fill: a}
            }, destroy: function () {
                var a = this, d = a.chart, b = /AppleWebKit\/533/.test(J.navigator.userAgent), c, h, e = a.data || [], l, g;
                f(a, "destroy");
                x(a);
                z(a.axisTypes || [], function (d) {
                    (g = a[d]) && g.series && (m(g.series, a), g.isDirty = g.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (h = e.length; h--;)(l = e[h]) && l.destroy && l.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                C(a, function (a, d) {
                    a instanceof n && !a.survive && (c = b && "group" === d ? "hide" : "destroy",
                        a[c]())
                });
                d.hoverSeries === a && (d.hoverSeries = null);
                m(d.series, a);
                d.orderSeries();
                C(a, function (d, b) {
                    delete a[b]
                })
            }, getGraphPath: function (a, d, b) {
                var c = this, h = c.options, e = h.step, p, n = [], l = [], f;
                a = a || c.points;
                (p = a.reversed) && a.reverse();
                (e = {right: 1, center: 2}[e] || e && 3) && p && (e = 4 - e);
                !h.connectNulls || d || b || (a = this.getValidPoints(a));
                z(a, function (p, g) {
                    var m = p.plotX, r = p.plotY, A = a[g - 1];
                    (p.leftCliff || A && A.rightCliff) && !b && (f = !0);
                    p.isNull && !u(d) && 0 < g ? f = !h.connectNulls : p.isNull && !d ? f = !0 : (0 === g || f ? g = ["M", p.plotX, p.plotY] :
                        c.getPointSpline ? g = c.getPointSpline(a, p, g) : e ? (g = 1 === e ? ["L", A.plotX, r] : 2 === e ? ["L", (A.plotX + m) / 2, A.plotY, "L", (A.plotX + m) / 2, r] : ["L", m, A.plotY], g.push("L", m, r)) : g = ["L", m, r], l.push(p.x), e && l.push(p.x), n.push.apply(n, g), f = !1)
                });
                n.xMap = l;
                return c.graphPath = n
            }, drawGraph: function () {
                var a = this, d = this.options, b = (this.gappedPath || this.getGraphPath).call(this), c = [
                    ["graph", "highcharts-graph", d.lineColor || this.color, d.dashStyle]
                ];
                z(this.zones, function (b, e) {
                    c.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" +
                        e + " " + (b.className || ""), b.color || a.color, b.dashStyle || d.dashStyle])
                });
                z(c, function (c, e) {
                    var h = c[0], p = a[h];
                    p ? (p.endX = a.preventGraphAnimation ? null : b.xMap, p.animate({d: b})) : b.length && (a[h] = a.chart.renderer.path(b).addClass(c[1]).attr({zIndex: 1}).add(a.group), p = {stroke: c[2], "stroke-width": d.lineWidth, fill: a.fillGraph && a.color || "none"}, c[3] ? p.dashstyle = c[3] : "square" !== d.linecap && (p["stroke-linecap"] = p["stroke-linejoin"] = "round"), p = a[h].attr(p).shadow(2 > e && d.shadow));
                    p && (p.startX = b.xMap, p.isArea = b.isArea)
                })
            },
                applyZones: function () {
                    var a = this, d = this.chart, b = d.renderer, c = this.zones, h, e, n = this.clips || [], l, f = this.graph, g = this.area, m = Math.max(d.chartWidth, d.chartHeight), r = this[(this.zoneAxis || "y") + "Axis"], x, B, k = d.inverted, q, F, t, C, u = !1;
                    c.length && (f || g) && r && void 0 !== r.min && (B = r.reversed, q = r.horiz, f && f.hide(), g && g.hide(), x = r.getExtremes(), z(c, function (c, p) {
                        h = B ? q ? d.plotWidth : 0 : q ? 0 : r.toPixels(x.min);
                        h = Math.min(Math.max(I(e, h), 0), m);
                        e = Math.min(Math.max(Math.round(r.toPixels(I(c.value, x.max), !0)), 0), m);
                        u && (h = e = r.toPixels(x.max));
                        F = Math.abs(h - e);
                        t = Math.min(h, e);
                        C = Math.max(h, e);
                        r.isXAxis ? (l = {x: k ? C : t, y: 0, width: F, height: m}, q || (l.x = d.plotHeight - l.x)) : (l = {x: 0, y: k ? C : t, width: m, height: F}, q && (l.y = d.plotWidth - l.y));
                        k && b.isVML && (l = r.isXAxis ? {x: 0, y: B ? t : C, height: l.width, width: d.chartWidth} : {x: l.y - d.plotLeft - d.spacingBox.x, y: 0, width: l.height, height: d.chartHeight});
                        n[p] ? n[p].animate(l) : (n[p] = b.clipRect(l), f && a["zone-graph-" + p].clip(n[p]), g && a["zone-area-" + p].clip(n[p]));
                        u = c.value > x.max
                    }), this.clips = n)
                }, invertGroups: function (a) {
                function d() {
                    z(["group",
                        "markerGroup"], function (d) {
                        b[d] && (c.renderer.isVML && b[d].attr({width: b.yAxis.len, height: b.xAxis.len}), b[d].width = b.yAxis.len, b[d].height = b.xAxis.len, b[d].invert(a))
                    })
                }

                var b = this, c = b.chart, h;
                b.xAxis && (h = G(c, "resize", d), G(b, "destroy", h), d(a), b.invertGroups = d)
            }, plotGroup: function (a, d, b, c, h) {
                var e = this[a], p = !e;
                p && (this[a] = e = this.chart.renderer.g().attr({zIndex: c || .1}).add(h));
                e.addClass("highcharts-" + d + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (u(this.colorIndex) ? "highcharts-color-" +
                    this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                e.attr({visibility: b})[p ? "attr" : "animate"](this.getPlotBox());
                return e
            }, getPlotBox: function () {
                var a = this.chart, d = this.xAxis, b = this.yAxis;
                a.inverted && (d = b, b = this.xAxis);
                return{translateX: d ? d.left : a.plotLeft, translateY: b ? b.top : a.plotTop, scaleX: 1, scaleY: 1}
            }, render: function () {
                var a = this, d = a.chart, b, c = a.options, h = !!a.animate && d.renderer.isSVG && E(c.animation).duration, e = a.visible ? "inherit" :
                    "hidden", n = c.zIndex, l = a.hasRendered, f = d.seriesGroup, g = d.inverted;
                b = a.plotGroup("group", "series", e, n, f);
                a.markerGroup = a.plotGroup("markerGroup", "markers", e, n, f);
                h && a.animate(!0);
                b.inverted = a.isCartesian ? g : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(g);
                !1 === c.clip || a.sharedClipKey || l || b.clip(d.clipRect);
                h && a.animate();
                l || (a.animationTimeout = B(function () {
                        a.afterAnimate()
                    },
                    h));
                a.isDirty = !1;
                a.hasRendered = !0
            }, redraw: function () {
                var a = this.chart, d = this.isDirty || this.isDirtyData, b = this.group, c = this.xAxis, h = this.yAxis;
                b && (a.inverted && b.attr({width: a.plotWidth, height: a.plotHeight}), b.animate({translateX: I(c && c.left, a.plotLeft), translateY: I(h && h.top, a.plotTop)}));
                this.translate();
                this.render();
                d && delete this.kdTree
            }, kdAxisArray: ["clientX", "plotY"], searchPoint: function (a, d) {
                var b = this.xAxis, c = this.yAxis, h = this.chart.inverted;
                return this.searchKDTree({clientX: h ? b.len - a.chartY +
                    b.pos : a.chartX - b.pos, plotY: h ? c.len - a.chartX + c.pos : a.chartY - c.pos}, d)
            }, buildKDTree: function () {
                function a(b, c, e) {
                    var h, p;
                    if (p = b && b.length)return h = d.kdAxisArray[c % e], b.sort(function (a, d) {
                        return a[h] - d[h]
                    }), p = Math.floor(p / 2), {point: b[p], left: a(b.slice(0, p), c + 1, e), right: a(b.slice(p + 1), c + 1, e)}
                }

                this.buildingKdTree = !0;
                var d = this, b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete d.kdTree;
                B(function () {
                    d.kdTree = a(d.getValidPoints(null, !d.directTouch), b, b);
                    d.buildingKdTree = !1
                }, d.options.kdNow ? 0 : 1)
            },
                searchKDTree: function (a, d) {
                    function b(a, d, p, l) {
                        var f = d.point, g = c.kdAxisArray[p % l], m, r, x = f;
                        r = u(a[h]) && u(f[h]) ? Math.pow(a[h] - f[h], 2) : null;
                        m = u(a[e]) && u(f[e]) ? Math.pow(a[e] - f[e], 2) : null;
                        m = (r || 0) + (m || 0);
                        f.dist = u(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                        f.distX = u(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                        g = a[g] - f[g];
                        m = 0 > g ? "left" : "right";
                        r = 0 > g ? "right" : "left";
                        d[m] && (m = b(a, d[m], p + 1, l), x = m[n] < x[n] ? m : f);
                        d[r] && Math.sqrt(g * g) < x[n] && (a = b(a, d[r], p + 1, l), x = a[n] < x[n] ? a : x);
                        return x
                    }

                    var c = this, h = this.kdAxisArray[0], e = this.kdAxisArray[1],
                        n = d ? "distX" : "dist";
                    d = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree();
                    if (this.kdTree)return b(a, this.kdTree, d, d)
                }})
    })(L);
    (function (a) {
        var G = a.Axis, E = a.Chart, H = a.correctFloat, v = a.defined, k = a.destroyObjectProperties, q = a.each, w = a.format, t = a.objectEach, u = a.pick, z = a.Series;
        a.StackItem = function (a, g, f, e, c) {
            var b = a.chart.inverted;
            this.axis = a;
            this.isNegative = f;
            this.options = g;
            this.x = e;
            this.total = null;
            this.points = {};
            this.stack = c;
            this.rightCliff = this.leftCliff =
                0;
            this.alignOptions = {align: g.align || (b ? f ? "left" : "right" : "center"), verticalAlign: g.verticalAlign || (b ? "middle" : f ? "bottom" : "top"), y: u(g.y, b ? 4 : f ? 14 : -6), x: u(g.x, b ? f ? -6 : 6 : 0)};
            this.textAlign = g.textAlign || (b ? f ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {destroy: function () {
            k(this, this.axis)
        }, render: function (a) {
            var g = this.options, f = g.format, f = f ? w(f, this) : g.formatter.call(this);
            this.label ? this.label.attr({text: f, visibility: "hidden"}) : this.label = this.axis.chart.renderer.text(f, null, null, g.useHTML).css(g.style).attr({align: this.textAlign,
                rotation: g.rotation, visibility: "hidden"}).add(a)
        }, setOffset: function (a, g) {
            var f = this.axis, e = f.chart, c = f.translate(f.usePercentage ? 100 : this.total, 0, 0, 0, 1), f = f.translate(0), f = Math.abs(c - f);
            a = e.xAxis[0].translate(this.x) + a;
            c = this.getStackBox(e, this, a, c, g, f);
            if (g = this.label)g.align(this.alignOptions, null, c), c = g.alignAttr, g[!1 === this.options.crop || e.isInsidePlot(c.x, c.y) ? "show" : "hide"](!0)
        }, getStackBox: function (a, g, f, e, c, b) {
            var m = g.axis.reversed, l = a.inverted;
            a = a.plotHeight;
            g = g.isNegative && !m || !g.isNegative &&
                m;
            return{x: l ? g ? e : e - b : f, y: l ? a - f - c : g ? a - e - b : a - e, width: l ? b : c, height: l ? c : b}
        }};
        E.prototype.getStacks = function () {
            var a = this;
            q(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            q(a.series, function (g) {
                !g.options.stacking || !0 !== g.visible && !1 !== a.options.chart.ignoreHiddenSeries || (g.stackKey = g.type + u(g.options.stack, ""))
            })
        };
        G.prototype.buildStacks = function () {
            var a = this.series, g = u(this.options.reversedStacks, !0), f = a.length, e;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (e = f; e--;)a[g ? e :
                    f - e - 1].setStackedPoints();
                for (e = 0; e < f; e++)a[e].modifyStacks()
            }
        };
        G.prototype.renderStackTotals = function () {
            var a = this.chart, g = a.renderer, f = this.stacks, e = this.stackTotalGroup;
            e || (this.stackTotalGroup = e = g.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            e.translate(a.plotLeft, a.plotTop);
            t(f, function (a) {
                t(a, function (a) {
                    a.render(e)
                })
            })
        };
        G.prototype.resetStacks = function () {
            var a = this, g = a.stacks;
            a.isXAxis || t(g, function (f) {
                t(f, function (e, c) {
                    e.touched < a.stacksTouched ? (e.destroy(), delete f[c]) :
                        (e.total = null, e.cumulative = null)
                })
            })
        };
        G.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), t(a, function (a) {
                t(a, function (a) {
                    a.cumulative = a.total
                })
            }))
        };
        z.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var m = this.processedXData, g = this.processedYData, f = [], e = g.length, c = this.options, b = c.threshold, r = u(c.startFromThreshold && b, 0), l = c.stack, c = c.stacking, k = this.stackKey, q =
                    "-" + k, x = this.negStacks, F = this.yAxis, n = F.stacks, B = F.oldStacks, t, A, d, p, D, h, y;
                F.stacksTouched += 1;
                for (D = 0; D < e; D++)h = m[D], y = g[D], t = this.getStackIndicator(t, h, this.index), p = t.key, d = (A = x && y < (r ? 0 : b)) ? q : k, n[d] || (n[d] = {}), n[d][h] || (B[d] && B[d][h] ? (n[d][h] = B[d][h], n[d][h].total = null) : n[d][h] = new a.StackItem(F, F.options.stackLabels, A, h, l)), d = n[d][h], null !== y ? (d.points[p] = d.points[this.index] = [u(d.cumulative, r)], v(d.cumulative) || (d.base = p), d.touched = F.stacksTouched, 0 < t.index && !1 === this.singleStacks && (d.points[p][0] =
                    d.points[this.index + "," + h + ",0"][0])) : d.points[p] = d.points[this.index] = null, "percent" === c ? (A = A ? k : q, x && n[A] && n[A][h] ? (A = n[A][h], d.total = A.total = Math.max(A.total, d.total) + Math.abs(y) || 0) : d.total = H(d.total + (Math.abs(y) || 0))) : d.total = H(d.total + (y || 0)), d.cumulative = u(d.cumulative, r) + (y || 0), null !== y && (d.points[p].push(d.cumulative), f[D] = d.cumulative);
                "percent" === c && (F.usePercentage = !0);
                this.stackedYData = f;
                F.oldStacks = {}
            }
        };
        z.prototype.modifyStacks = function () {
            var a = this, g = a.stackKey, f = a.yAxis.stacks, e = a.processedXData,
                c, b = a.options.stacking;
            a[b + "Stacker"] && q([g, "-" + g], function (g) {
                for (var l = e.length, r, m; l--;)if (r = e[l], c = a.getStackIndicator(c, r, a.index, g), m = (r = f[g] && f[g][r]) && r.points[c.key])a[b + "Stacker"](m, r, l)
            })
        };
        z.prototype.percentStacker = function (a, g, f) {
            g = g.total ? 100 / g.total : 0;
            a[0] = H(a[0] * g);
            a[1] = H(a[1] * g);
            this.stackedYData[f] = a[1]
        };
        z.prototype.getStackIndicator = function (a, g, f, e) {
            !v(a) || a.x !== g || e && a.key !== e ? a = {x: g, index: 0, key: e} : a.index++;
            a.key = [f, g, a.index].join();
            return a
        }
    })(L);
    (function (a) {
        var G = a.addEvent,
            E = a.animate, H = a.Axis, v = a.createElement, k = a.css, q = a.defined, w = a.each, t = a.erase, u = a.extend, z = a.fireEvent, m = a.inArray, g = a.isNumber, f = a.isObject, e = a.isArray, c = a.merge, b = a.objectEach, r = a.pick, l = a.Point, C = a.Series, I = a.seriesTypes, x = a.setAnimation, F = a.splat;
        u(a.Chart.prototype, {addSeries: function (a, b, c) {
            var e, d = this;
            a && (b = r(b, !0), z(d, "addSeries", {options: a}, function () {
                e = d.initSeries(a);
                d.isDirtyLegend = !0;
                d.linkSeries();
                b && d.redraw(c)
            }));
            return e
        }, addAxis: function (a, b, e, l) {
            var d = b ? "xAxis" : "yAxis", p = this.options;
            a = c(a, {index: this[d].length, isX: b});
            b = new H(this, a);
            p[d] = F(p[d] || {});
            p[d].push(a);
            r(e, !0) && this.redraw(l);
            return b
        }, showLoading: function (a) {
            var b = this, c = b.options, e = b.loadingDiv, d = c.loading, p = function () {
                e && k(e, {left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px"})
            };
            e || (b.loadingDiv = e = v("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = v("span", {className: "highcharts-loading-inner"}, null, e), G(b, "redraw", p));
            e.className =
                "highcharts-loading";
            b.loadingSpan.innerHTML = a || c.lang.loading;
            k(e, u(d.style, {zIndex: 10}));
            k(b.loadingSpan, d.labelStyle);
            b.loadingShown || (k(e, {opacity: 0, display: ""}), E(e, {opacity: d.style.opacity || .5}, {duration: d.showDuration || 0}));
            b.loadingShown = !0;
            p()
        }, hideLoading: function () {
            var a = this.options, b = this.loadingDiv;
            b && (b.className = "highcharts-loading highcharts-loading-hidden", E(b, {opacity: 0}, {duration: a.loading.hideDuration || 100, complete: function () {
                k(b, {display: "none"})
            }}));
            this.loadingShown = !1
        }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "), update: function (a, e, l) {
                var n = this, d = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, p = a.chart, f, h, x = [];
                if (p) {
                    c(!0, n.options.chart, p);
                    "className"in p && n.setClassName(p.className);
                    if ("inverted"in p || "polar"in p)n.propFromSeries(), f = !0;
                    "alignTicks"in p && (f = !0);
                    b(p, function (a, d) {
                        -1 !== m("chart." + d, n.propsRequireUpdateSeries) && (h = !0);
                        -1 !== m(d, n.propsRequireDirtyBox) &&
                        (n.isDirtyBox = !0)
                    });
                    "style"in p && n.renderer.setStyle(p.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && c(!0, this.options.plotOptions, a.plotOptions);
                b(a, function (a, b) {
                    if (n[b] && "function" === typeof n[b].update)n[b].update(a, !1); else if ("function" === typeof n[d[b]])n[d[b]](a);
                    "chart" !== b && -1 !== m(b, n.propsRequireUpdateSeries) && (h = !0)
                });
                w("xAxis yAxis zAxis series colorAxis pane".split(" "), function (d) {
                    a[d] && (w(F(a[d]), function (a, b) {
                        (b = q(a.id) && n.get(a.id) || n[d][b]) && b.coll === d && (b.update(a,
                            !1), l && (b.touched = !0));
                        if (!b && l)if ("series" === d)n.addSeries(a, !1).touched = !0; else if ("xAxis" === d || "yAxis" === d)n.addAxis(a, "xAxis" === d, !1).touched = !0
                    }), l && w(n[d], function (a) {
                        a.touched ? delete a.touched : x.push(a)
                    }))
                });
                w(x, function (a) {
                    a.remove(!1)
                });
                f && w(n.axes, function (a) {
                    a.update({}, !1)
                });
                h && w(n.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && c(!0, n.options.loading, a.loading);
                f = p && p.width;
                p = p && p.height;
                g(f) && f !== n.chartWidth || g(p) && p !== n.chartHeight ? n.setSize(f, p) : r(e, !0) && n.redraw()
            }, setSubtitle: function (a) {
                this.setTitle(void 0,
                    a)
            }});
        u(l.prototype, {update: function (a, b, c, e) {
            function d() {
                p.applyOptions(a);
                null === p.y && h && (p.graphic = h.destroy());
                f(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol && (p.graphic = h.destroy()), a && a.dataLabels && p.dataLabel && (p.dataLabel = p.dataLabel.destroy()), p.connector && (p.connector = p.connector.destroy()));
                l = p.index;
                n.updateParallelArrays(p, l);
                m.data[l] = f(m.data[l], !0) || f(a, !0) ? p.options : a;
                n.isDirty = n.isDirtyData = !0;
                !n.fixedBox && n.hasCartesianSeries && (g.isDirtyBox = !0);
                "point" === m.legendType &&
                (g.isDirtyLegend = !0);
                b && g.redraw(c)
            }

            var p = this, n = p.series, h = p.graphic, l, g = n.chart, m = n.options;
            b = r(b, !0);
            !1 === e ? d() : p.firePointEvent("update", {options: a}, d)
        }, remove: function (a, b) {
            this.series.removePoint(m(this, this.series.data), a, b)
        }});
        u(C.prototype, {addPoint: function (a, b, c, e) {
            var d = this.options, p = this.data, n = this.chart, h = this.xAxis, h = h && h.hasNames && h.names, l = d.data, f, g, m = this.xData, x, k;
            b = r(b, !0);
            f = {series: this};
            this.pointClass.prototype.applyOptions.apply(f, [a]);
            k = f.x;
            x = m.length;
            if (this.requireSorting &&
                k < m[x - 1])for (g = !0; x && m[x - 1] > k;)x--;
            this.updateParallelArrays(f, "splice", x, 0, 0);
            this.updateParallelArrays(f, x);
            h && f.name && (h[k] = f.name);
            l.splice(x, 0, a);
            g && (this.data.splice(x, 0, null), this.processData());
            "point" === d.legendType && this.generatePoints();
            c && (p[0] && p[0].remove ? p[0].remove(!1) : (p.shift(), this.updateParallelArrays(f, "shift"), l.shift()));
            this.isDirtyData = this.isDirty = !0;
            b && n.redraw(e)
        }, removePoint: function (a, b, c) {
            var e = this, d = e.data, p = d[a], n = e.points, h = e.chart, l = function () {
                n && n.length === d.length &&
                n.splice(a, 1);
                d.splice(a, 1);
                e.options.data.splice(a, 1);
                e.updateParallelArrays(p || {series: e}, "splice", a, 1);
                p && p.destroy();
                e.isDirty = !0;
                e.isDirtyData = !0;
                b && h.redraw()
            };
            x(c, h);
            b = r(b, !0);
            p ? p.firePointEvent("remove", null, l) : l()
        }, remove: function (a, b, c) {
            function e() {
                d.destroy();
                p.isDirtyLegend = p.isDirtyBox = !0;
                p.linkSeries();
                r(a, !0) && p.redraw(b)
            }

            var d = this, p = d.chart;
            !1 !== c ? z(d, "remove", null, e) : e()
        }, update: function (a, b) {
            var e = this, n = e.chart, d = e.userOptions, p = e.oldType || e.type, l = a.type || d.type || n.options.chart.type,
                h = I[p].prototype, f, g = ["group", "markerGroup", "dataLabelsGroup"], m = ["navigatorSeries", "baseSeries"], x = e.finishedAnimating && {animation: !1};
            if (Object.keys && "data" === Object.keys(a).toString())return this.setData(a.data, b);
            m = g.concat(m);
            w(m, function (a) {
                m[a] = e[a];
                delete e[a]
            });
            a = c(d, x, {index: e.index, pointStart: e.xData[0]}, {data: e.options.data}, a);
            e.remove(!1, null, !1);
            for (f in h)e[f] = void 0;
            u(e, I[l || p].prototype);
            w(m, function (a) {
                e[a] = m[a]
            });
            e.init(n, a);
            a.zIndex !== d.zIndex && w(g, function (d) {
                e[d] && e[d].attr({zIndex: a.zIndex})
            });
            e.oldType = p;
            n.linkSeries();
            r(b, !0) && n.redraw(!1)
        }});
        u(H.prototype, {update: function (a, b) {
            var e = this.chart;
            a = e.options[this.coll][this.options.index] = c(this.userOptions, a);
            this.destroy(!0);
            this.init(e, u(a, {events: void 0}));
            e.isDirtyBox = !0;
            r(b, !0) && e.redraw()
        }, remove: function (a) {
            for (var b = this.chart, c = this.coll, n = this.series, d = n.length; d--;)n[d] && n[d].remove(!1);
            t(b.axes, this);
            t(b[c], this);
            e(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
            w(b[c], function (a, d) {
                a.options.index =
                    d
            });
            this.destroy();
            b.isDirtyBox = !0;
            r(a, !0) && b.redraw()
        }, setTitle: function (a, b) {
            this.update({title: a}, b)
        }, setCategories: function (a, b) {
            this.update({categories: a}, b)
        }})
    })(L);
    (function (a) {
        var G = a.color, E = a.each, H = a.map, v = a.pick, k = a.Series, q = a.seriesType;
        q("area", "line", {softThreshold: !1, threshold: 0}, {singleStacks: !1, getStackPoints: function (k) {
            var q = [], u = [], w = this.xAxis, m = this.yAxis, g = m.stacks[this.stackKey], f = {}, e = this.index, c = m.series, b = c.length, r, l = v(m.options.reversedStacks, !0) ? 1 : -1, C;
            k = k || this.points;
            if (this.options.stacking) {
                for (C = 0; C < k.length; C++)k[C].leftNull = k[C].rightNull = null, f[k[C].x] = k[C];
                a.objectEach(g, function (a, b) {
                    null !== a.total && u.push(b)
                });
                u.sort(function (a, b) {
                    return a - b
                });
                r = H(c, function () {
                    return this.visible
                });
                E(u, function (a, c) {
                    var x = 0, n, k;
                    if (f[a] && !f[a].isNull)q.push(f[a]), E([-1, 1], function (m) {
                        var x = 1 === m ? "rightNull" : "leftNull", d = 0, p = g[u[c + m]];
                        if (p)for (C = e; 0 <= C && C < b;)n = p.points[C], n || (C === e ? f[a][x] = !0 : r[C] && (k = g[a].points[C]) && (d -= k[1] - k[0])), C += l;
                        f[a][1 === m ? "rightCliff" : "leftCliff"] =
                            d
                    }); else {
                        for (C = e; 0 <= C && C < b;) {
                            if (n = g[a].points[C]) {
                                x = n[1];
                                break
                            }
                            C += l
                        }
                        x = m.translate(x, 0, 1, 0, 1);
                        q.push({isNull: !0, plotX: w.translate(a, 0, 0, 0, 1), x: a, plotY: x, yBottom: x})
                    }
                })
            }
            return q
        }, getGraphPath: function (a) {
            var q = k.prototype.getGraphPath, u = this.options, w = u.stacking, m = this.yAxis, g, f, e = [], c = [], b = this.index, r, l = m.stacks[this.stackKey], C = u.threshold, I = m.getThreshold(u.threshold), x, u = u.connectNulls || "percent" === w, F = function (n, f, g) {
                var x = a[n];
                n = w && l[x.x].points[b];
                var d = x[g + "Null"] || 0;
                g = x[g + "Cliff"] || 0;
                var p,
                    k, x = !0;
                g || d ? (p = (d ? n[0] : n[1]) + g, k = n[0] + g, x = !!d) : !w && a[f] && a[f].isNull && (p = k = C);
                void 0 !== p && (c.push({plotX: r, plotY: null === p ? I : m.getThreshold(p), isNull: x, isCliff: !0}), e.push({plotX: r, plotY: null === k ? I : m.getThreshold(k), doCurve: !1}))
            };
            a = a || this.points;
            w && (a = this.getStackPoints(a));
            for (g = 0; g < a.length; g++)if (f = a[g].isNull, r = v(a[g].rectPlotX, a[g].plotX), x = v(a[g].yBottom, I), !f || u)u || F(g, g - 1, "left"), f && !w && u || (c.push(a[g]), e.push({x: g, plotX: r, plotY: x})), u || F(g, g + 1, "right");
            g = q.call(this, c, !0, !0);
            e.reversed = !0;
            f = q.call(this, e, !0, !0);
            f.length && (f[0] = "L");
            f = g.concat(f);
            q = q.call(this, c, !1, u);
            f.xMap = g.xMap;
            this.areaPath = f;
            return q
        }, drawGraph: function () {
            this.areaPath = [];
            k.prototype.drawGraph.apply(this);
            var a = this, q = this.areaPath, u = this.options, z = [
                ["area", "highcharts-area", this.color, u.fillColor]
            ];
            E(this.zones, function (m, g) {
                z.push(["zone-area-" + g, "highcharts-area highcharts-zone-area-" + g + " " + m.className, m.color || a.color, m.fillColor || u.fillColor])
            });
            E(z, function (m) {
                var g = m[0], f = a[g];
                f ? (f.endX = a.preventGraphAnimation ?
                    null : q.xMap, f.animate({d: q})) : (f = a[g] = a.chart.renderer.path(q).addClass(m[1]).attr({fill: v(m[3], G(m[2]).setOpacity(v(u.fillOpacity, .75)).get()), zIndex: 0}).add(a.group), f.isArea = !0);
                f.startX = q.xMap;
                f.shiftUnit = u.step ? 2 : 1
            })
        }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle})
    })(L);
    (function (a) {
        var G = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {getPointSpline: function (a, H, v) {
            var k = H.plotX, q = H.plotY, w = a[v - 1];
            v = a[v + 1];
            var t, u, z, m;
            if (w && !w.isNull && !1 !== w.doCurve && !H.isCliff && v && !v.isNull && !1 !== v.doCurve && !H.isCliff) {
                a = w.plotY;
                z = v.plotX;
                v = v.plotY;
                var g = 0;
                t = (1.5 * k + w.plotX) / 2.5;
                u = (1.5 * q + a) / 2.5;
                z = (1.5 * k + z) / 2.5;
                m = (1.5 * q + v) / 2.5;
                z !== t && (g = (m - u) * (z - k) / (z - t) + q - m);
                u += g;
                m += g;
                u > a && u > q ? (u = Math.max(a, q), m = 2 * q - u) : u < a && u < q && (u = Math.min(a, q), m = 2 * q - u);
                m > v && m > q ? (m = Math.max(v, q), u = 2 * q - m) : m < v && m < q && (m = Math.min(v, q), u = 2 * q - m);
                H.rightContX = z;
                H.rightContY = m
            }
            H = ["C", G(w.rightContX, w.plotX), G(w.rightContY, w.plotY), G(t, k), G(u, q), k, q];
            w.rightContX = w.rightContY = null;
            return H
        }})
    })(L);
    (function (a) {
        var G = a.seriesTypes.area.prototype,
            E = a.seriesType;
        E("areaspline", "spline", a.defaultPlotOptions.area, {getStackPoints: G.getStackPoints, getGraphPath: G.getGraphPath, drawGraph: G.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle})
    })(L);
    (function (a) {
        var G = a.animObject, E = a.color, H = a.each, v = a.extend, k = a.isNumber, q = a.merge, w = a.pick, t = a.Series, u = a.seriesType, z = a.svg;
        u("column", "line", {borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: {hover: {halo: !1, brightness: .1},
            select: {color: "#cccccc", borderColor: "#000000"}}, dataLabels: {align: null, verticalAlign: null, y: null}, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: {distance: 6}, threshold: 0, borderColor: "#ffffff"}, {cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () {
            t.prototype.init.apply(this, arguments);
            var a = this, g = a.chart;
            g.hasRendered && H(g.series, function (f) {
                f.type === a.type && (f.isDirty = !0)
            })
        }, getColumnMetrics: function () {
            var a = this, g = a.options, f = a.xAxis,
                e = a.yAxis, c = f.reversed, b, r = {}, l = 0;
            !1 === g.grouping ? l = 1 : H(a.chart.series, function (c) {
                var n = c.options, f = c.yAxis, g;
                c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || e.len !== f.len || e.pos !== f.pos || (n.stacking ? (b = c.stackKey, void 0 === r[b] && (r[b] = l++), g = r[b]) : !1 !== n.grouping && (g = l++), c.columnIndex = g)
            });
            var k = Math.min(Math.abs(f.transA) * (f.ordinalSlope || g.pointRange || f.closestPointRange || f.tickInterval || 1), f.len), q = k * g.groupPadding, x = (k - 2 * q) / (l || 1), g = Math.min(g.maxPointWidth || f.len, w(g.pointWidth,
                x * (1 - 2 * g.pointPadding)));
            a.columnMetrics = {width: g, offset: (x - g) / 2 + (q + ((a.columnIndex || 0) + (c ? 1 : 0)) * x - k / 2) * (c ? -1 : 1)};
            return a.columnMetrics
        }, crispCol: function (a, g, f, e) {
            var c = this.chart, b = this.borderWidth, r = -(b % 2 ? .5 : 0), b = b % 2 ? .5 : 1;
            c.inverted && c.renderer.isVML && (b += 1);
            this.options.crisp && (f = Math.round(a + f) + r, a = Math.round(a) + r, f -= a);
            e = Math.round(g + e) + b;
            r = .5 >= Math.abs(g) && .5 < e;
            g = Math.round(g) + b;
            e -= g;
            r && e && (--g, e += 1);
            return{x: a, y: g, width: f, height: e}
        }, translate: function () {
            var a = this, g = a.chart, f = a.options, e =
                a.dense = 2 > a.closestPointRange * a.xAxis.transA, e = a.borderWidth = w(f.borderWidth, e ? 0 : 1), c = a.yAxis, b = f.threshold, r = a.translatedThreshold = c.getThreshold(b), l = w(f.minPointLength, 5), k = a.getColumnMetrics(), q = k.width, x = a.barW = Math.max(q, 1 + 2 * e), F = a.pointXOffset = k.offset;
            g.inverted && (r -= .5);
            f.pointPadding && (x = Math.ceil(x));
            t.prototype.translate.apply(a);
            H(a.points, function (e) {
                var n = w(e.yBottom, r), f = 999 + Math.abs(n), f = Math.min(Math.max(-f, e.plotY), c.len + f), k = e.plotX + F, d = x, p = Math.min(f, n), m, h = Math.max(f, n) - p;
                l &&
                    Math.abs(h) < l && (h = l, m = !c.reversed && !e.negative || c.reversed && e.negative, e.y === b && a.dataMax <= b && c.min < b && (m = !m), p = Math.abs(p - r) > l ? n - l : r - (m ? l : 0));
                e.barX = k;
                e.pointWidth = q;
                e.tooltipPos = g.inverted ? [c.len + c.pos - g.plotLeft - f, a.xAxis.len - k - d / 2, h] : [k + d / 2, f + c.pos - g.plotTop, h];
                e.shapeType = "rect";
                e.shapeArgs = a.crispCol.apply(a, e.isNull ? [k, r, d, 0] : [k, p, d, h])
            })
        }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () {
            this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
        },
            pointAttribs: function (a, g) {
                var f = this.options, e, c = this.pointAttrToOptions || {};
                e = c.stroke || "borderColor";
                var b = c["stroke-width"] || "borderWidth", r = a && a.color || this.color, l = a && a[e] || f[e] || this.color || r, k = a && a[b] || f[b] || this[b] || 0, c = f.dashStyle;
                a && this.zones.length && (r = a.getZone(), r = a.options.color || r && r.color || this.color);
                g && (a = q(f.states[g], a.options.states && a.options.states[g] || {}), g = a.brightness, r = a.color || void 0 !== g && E(r).brighten(a.brightness).get() || r, l = a[e] || l, k = a[b] || k, c = a.dashStyle || c);
                e = {fill: r,
                    stroke: l, "stroke-width": k};
                c && (e.dashstyle = c);
                return e
            }, drawPoints: function () {
                var a = this, g = this.chart, f = a.options, e = g.renderer, c = f.animationLimit || 250, b;
                H(a.points, function (r) {
                    var l = r.graphic;
                    if (k(r.plotY) && null !== r.y) {
                        b = r.shapeArgs;
                        if (l)l[g.pointCount < c ? "animate" : "attr"](q(b)); else r.graphic = l = e[r.shapeType](b).add(r.group || a.group);
                        f.borderRadius && l.attr({r: f.borderRadius});
                        l.attr(a.pointAttribs(r, r.selected && "select")).shadow(f.shadow, null, f.stacking && !f.borderRadius);
                        l.addClass(r.getClassName(),
                            !0)
                    } else l && (r.graphic = l.destroy())
                })
            }, animate: function (a) {
                var g = this, f = this.yAxis, e = g.options, c = this.chart.inverted, b = {}, r = c ? "translateX" : "translateY", l;
                z && (a ? (b.scaleY = .001, a = Math.min(f.pos + f.len, Math.max(f.pos, f.toPixels(e.threshold))), c ? b.translateX = a - f.len : b.translateY = a, g.group.attr(b)) : (l = g.group.attr(r), g.group.animate({scaleY: 1}, v(G(g.options.animation), {step: function (a, c) {
                    b[r] = l + c.pos * (f.pos - l);
                    g.group.attr(b)
                }})), g.animate = null))
            }, remove: function () {
                var a = this, g = a.chart;
                g.hasRendered && H(g.series,
                    function (f) {
                        f.type === a.type && (f.isDirty = !0)
                    });
                t.prototype.remove.apply(a, arguments)
            }})
    })(L);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(L);
    (function (a) {
        var G = a.Series;
        a = a.seriesType;
        a("scatter", "line", {lineWidth: 0, findNearestPointBy: "xy", marker: {enabled: !0}, tooltip: {headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e', pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},
            {sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () {
                this.options.lineWidth && G.prototype.drawGraph.call(this)
            }})
    })(L);
    (function (a) {
        var G = a.deg2rad, E = a.isNumber, H = a.pick, v = a.relativeLength;
        a.CenteredSeriesMixin = {getCenter: function () {
            var a = this.options, q = this.chart, w = 2 * (a.slicedOffset || 0), t = q.plotWidth - 2 * w, q = q.plotHeight - 2 * w, u = a.center, u = [H(u[0], "50%"), H(u[1], "50%"), a.size || "100%", a.innerSize || 0], z = Math.min(t,
                q), m, g;
            for (m = 0; 4 > m; ++m)g = u[m], a = 2 > m || 2 === m && /%$/.test(g), u[m] = v(g, [t, q, z, u[2]][m]) + (a ? w : 0);
            u[3] > u[2] && (u[3] = u[2]);
            return u
        }, getStartAndEndRadians: function (a, q) {
            a = E(a) ? a : 0;
            q = E(q) && q > a && 360 > q - a ? q : a + 360;
            return{start: G * (a + -90), end: G * (q + -90)}
        }}
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.CenteredSeriesMixin, H = a.defined, v = a.each, k = a.extend, q = E.getStartAndEndRadians, w = a.inArray, t = a.noop, u = a.pick, z = a.Point, m = a.Series, g = a.seriesType, f = a.setAnimation;
        g("pie", "line", {center: [null, null], clip: !1, colorByPoint: !0, dataLabels: {distance: 30,
            enabled: !0, formatter: function () {
                return this.point.isNull ? void 0 : this.point.name
            }, x: 0}, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: {followPointer: !0}, borderColor: "#ffffff", borderWidth: 1, states: {hover: {brightness: .1, shadow: !1}}}, {isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: a.seriesTypes.column.prototype.pointAttribs, animate: function (a) {
            var c =
                this, b = c.points, e = c.startAngleRad;
            a || (v(b, function (a) {
                var b = a.graphic, l = a.shapeArgs;
                b && (b.attr({r: a.startR || c.center[3] / 2, start: e, end: e}), b.animate({r: l.r, start: l.start, end: l.end}, c.options.animation))
            }), c.animate = null)
        }, updateTotals: function () {
            var a, c = 0, b = this.points, f = b.length, l, g = this.options.ignoreHiddenPoint;
            for (a = 0; a < f; a++)l = b[a], c += g && !l.visible ? 0 : l.isNull ? 0 : l.y;
            this.total = c;
            for (a = 0; a < f; a++)l = b[a], l.percentage = 0 < c && (l.visible || !g) ? l.y / c * 100 : 0, l.total = c
        }, generatePoints: function () {
            m.prototype.generatePoints.call(this);
            this.updateTotals()
        }, translate: function (a) {
            this.generatePoints();
            var c = 0, b = this.options, e = b.slicedOffset, l = e + (b.borderWidth || 0), f, g, x, k = q(b.startAngle, b.endAngle), n = this.startAngleRad = k.start, k = (this.endAngleRad = k.end) - n, m = this.points, t, A = b.dataLabels.distance, b = b.ignoreHiddenPoint, d, p = m.length, D;
            a || (this.center = a = this.getCenter());
            this.getX = function (d, b, c) {
                x = Math.asin(Math.min((d - a[1]) / (a[2] / 2 + c.labelDistance), 1));
                return a[0] + (b ? -1 : 1) * Math.cos(x) * (a[2] / 2 + c.labelDistance)
            };
            for (d = 0; d < p; d++) {
                D = m[d];
                D.labelDistance = u(D.options.dataLabels && D.options.dataLabels.distance, A);
                this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, D.labelDistance);
                f = n + c * k;
                if (!b || D.visible)c += D.percentage / 100;
                g = n + c * k;
                D.shapeType = "arc";
                D.shapeArgs = {x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * f) / 1E3, end: Math.round(1E3 * g) / 1E3};
                x = (g + f) / 2;
                x > 1.5 * Math.PI ? x -= 2 * Math.PI : x < -Math.PI / 2 && (x += 2 * Math.PI);
                D.slicedTranslation = {translateX: Math.round(Math.cos(x) * e), translateY: Math.round(Math.sin(x) * e)};
                g = Math.cos(x) * a[2] /
                    2;
                t = Math.sin(x) * a[2] / 2;
                D.tooltipPos = [a[0] + .7 * g, a[1] + .7 * t];
                D.half = x < -Math.PI / 2 || x > Math.PI / 2 ? 1 : 0;
                D.angle = x;
                f = Math.min(l, D.labelDistance / 5);
                D.labelPos = [a[0] + g + Math.cos(x) * D.labelDistance, a[1] + t + Math.sin(x) * D.labelDistance, a[0] + g + Math.cos(x) * f, a[1] + t + Math.sin(x) * f, a[0] + g, a[1] + t, 0 > D.labelDistance ? "center" : D.half ? "right" : "left", x]
            }
        }, drawGraph: null, drawPoints: function () {
            var a = this, c = a.chart.renderer, b, f, l, g, m = a.options.shadow;
            m && !a.shadowGroup && (a.shadowGroup = c.g("shadow").add(a.group));
            v(a.points, function (e) {
                f =
                    e.graphic;
                if (e.isNull)f && (e.graphic = f.destroy()); else {
                    g = e.shapeArgs;
                    b = e.getTranslate();
                    var r = e.shadowGroup;
                    m && !r && (r = e.shadowGroup = c.g("shadow").add(a.shadowGroup));
                    r && r.attr(b);
                    l = a.pointAttribs(e, e.selected && "select");
                    f ? f.setRadialReference(a.center).attr(l).animate(k(g, b)) : (e.graphic = f = c[e.shapeType](g).setRadialReference(a.center).attr(b).add(a.group), e.visible || f.attr({visibility: "hidden"}), f.attr(l).attr({"stroke-linejoin": "round"}).shadow(m, r));
                    f.addClass(e.getClassName())
                }
            })
        }, searchPoint: t,
            sortByAngle: function (a, c) {
                a.sort(function (a, e) {
                    return void 0 !== a.angle && (e.angle - a.angle) * c
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, getCenter: E.getCenter, getSymbol: t}, {init: function () {
            z.prototype.init.apply(this, arguments);
            var a = this, c;
            a.name = u(a.name, "Slice");
            c = function (b) {
                a.slice("select" === b.type)
            };
            G(a, "select", c);
            G(a, "unselect", c);
            return a
        }, isValid: function () {
            return a.isNumber(this.y, !0) && 0 <= this.y
        }, setVisible: function (a, c) {
            var b = this, e = b.series, l = e.chart, f = e.options.ignoreHiddenPoint;
            c = u(c, f);
            a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, e.options.data[w(b, e.data)] = b.options, v(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
                if (b[c])b[c][a ? "show" : "hide"](!0)
            }), b.legendItem && l.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), f && (e.isDirty = !0), c && l.redraw())
        }, slice: function (a, c, b) {
            var e = this.series;
            f(b, e.chart);
            u(c, !0);
            this.sliced = this.options.sliced = H(a) ? a : !this.sliced;
            e.options.data[w(this, e.data)] = this.options;
            this.graphic.animate(this.getTranslate());
            this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
        }, getTranslate: function () {
            return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
        }, haloPath: function (a) {
            var c = this.shapeArgs;
            return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {innerR: this.shapeArgs.r - 1, start: c.start, end: c.end})
        }})
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.arrayMax, H = a.defined, v = a.each, k = a.extend, q = a.format, w = a.map, t = a.merge, u = a.noop, z = a.pick, m = a.relativeLength, g =
            a.Series, f = a.seriesTypes, e = a.stableSort;
        a.distribute = function (a, b) {
            function c(a, b) {
                return a.target - b.target
            }

            var l, f = !0, g = a, x = [], k;
            k = 0;
            for (l = a.length; l--;)k += a[l].size;
            if (k > b) {
                e(a, function (a, b) {
                    return(b.rank || 0) - (a.rank || 0)
                });
                for (k = l = 0; k <= b;)k += a[l].size, l++;
                x = a.splice(l - 1, a.length)
            }
            e(a, c);
            for (a = w(a, function (a) {
                return{size: a.size, targets: [a.target], align: z(a.align, .5)}
            }); f;) {
                for (l = a.length; l--;)f = a[l], k = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, k - f.size *
                    f.align), b - f.size);
                l = a.length;
                for (f = !1; l--;)0 < l && a[l - 1].pos + a[l - 1].size > a[l].pos && (a[l - 1].size += a[l].size, a[l - 1].targets = a[l - 1].targets.concat(a[l].targets), a[l - 1].align = .5, a[l - 1].pos + a[l - 1].size > b && (a[l - 1].pos = b - a[l - 1].size), a.splice(l, 1), f = !0)
            }
            l = 0;
            v(a, function (a) {
                var b = 0;
                v(a.targets, function () {
                    g[l].pos = a.pos + b;
                    b += g[l].size;
                    l++
                })
            });
            g.push.apply(g, x);
            e(g, c)
        };
        g.prototype.drawDataLabels = function () {
            function c(a, b) {
                var d = b.filter;
                return d ? (b = d.operator, a = a[d.property], d = d.value, "\x3e" === b && a > d || "\x3c" ===
                    b && a < d || "\x3e\x3d" === b && a >= d || "\x3c\x3d" === b && a <= d || "\x3d\x3d" === b && a == d || "\x3d\x3d\x3d" === b && a === d ? !0 : !1) : !0
            }

            var b = this, e = b.options, f = e.dataLabels, g = b.points, k, x, m = b.hasRendered || 0, n, B, u = z(f.defer, !!e.animation), A = b.chart.renderer;
            if (f.enabled || b._hasPointLabels)b.dlProcessOptions && b.dlProcessOptions(f), B = b.plotGroup("dataLabelsGroup", "data-labels", u && !m ? "hidden" : "visible", f.zIndex || 6), u && (B.attr({opacity: +m}), m || G(b, "afterAnimate", function () {
                b.visible && B.show(!0);
                B[e.animation ? "animate" : "attr"]({opacity: 1},
                    {duration: 200})
            })), x = f, v(g, function (d) {
                var p, l = d.dataLabel, h, g, r = d.connector, m = !l, F;
                k = d.dlOptions || d.options && d.options.dataLabels;
                (p = z(k && k.enabled, x.enabled) && !d.isNull) && (p = !0 === c(d, k || f));
                p && (f = t(x, k), h = d.getLabelConfig(), F = f[d.formatPrefix + "Format"] || f.format, n = H(F) ? q(F, h) : (f[d.formatPrefix + "Formatter"] || f.formatter).call(h, f), F = f.style, h = f.rotation, F.color = z(f.color, F.color, b.color, "#000000"), "contrast" === F.color && (d.contrastColor = A.getContrast(d.color || b.color), F.color = f.inside || 0 > z(d.labelDistance,
                    f.distance) || e.stacking ? d.contrastColor : "#000000"), e.cursor && (F.cursor = e.cursor), g = {fill: f.backgroundColor, stroke: f.borderColor, "stroke-width": f.borderWidth, r: f.borderRadius || 0, rotation: h, padding: f.padding, zIndex: 1}, a.objectEach(g, function (a, d) {
                    void 0 === a && delete g[d]
                }));
                !l || p && H(n) ? p && H(n) && (l ? g.text = n : (l = d.dataLabel = h ? A.text(n, 0, -9999).addClass("highcharts-data-label") : A.label(n, 0, -9999, f.shape, null, null, f.useHTML, null, "data-label"), l.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (f.className ||
                    "") + (f.useHTML ? "highcharts-tracker" : ""))), l.attr(g), l.css(F).shadow(f.shadow), l.added || l.add(B), b.alignDataLabel(d, l, f, null, m)) : (d.dataLabel = l = l.destroy(), r && (d.connector = r.destroy()))
            })
        };
        g.prototype.alignDataLabel = function (a, b, e, f, g) {
            var c = this.chart, l = c.inverted, r = z(a.dlBox && a.dlBox.centerX, a.plotX, -9999), n = z(a.plotY, -9999), m = b.getBBox(), q, t = e.rotation, d = e.align, p = this.visible && (a.series.forceDL || c.isInsidePlot(r, Math.round(n), l) || f && c.isInsidePlot(r, l ? f.x + 1 : f.y + f.height - 1, l)), D = "justify" === z(e.overflow,
                "justify");
            if (p && (q = e.style.fontSize, q = c.renderer.fontMetrics(q, b).b, f = k({x: l ? this.yAxis.len - n : r, y: Math.round(l ? this.xAxis.len - r : n), width: 0, height: 0}, f), k(e, {width: m.width, height: m.height}), t ? (D = !1, r = c.renderer.rotCorr(q, t), r = {x: f.x + e.x + f.width / 2 + r.x, y: f.y + e.y + {top: 0, middle: .5, bottom: 1}[e.verticalAlign] * f.height}, b[g ? "attr" : "animate"](r).attr({align: d}), n = (t + 720) % 360, n = 180 < n && 360 > n, "left" === d ? r.y -= n ? m.height : 0 : "center" === d ? (r.x -= m.width / 2, r.y -= m.height / 2) : "right" === d && (r.x -= m.width, r.y -= n ? 0 : m.height)) :
                (b.align(e, null, f), r = b.alignAttr), D ? a.isLabelJustified = this.justifyDataLabel(b, e, r, m, f, g) : z(e.crop, !0) && (p = c.isInsidePlot(r.x, r.y) && c.isInsidePlot(r.x + m.width, r.y + m.height)), e.shape && !t))b[g ? "attr" : "animate"]({anchorX: l ? c.plotWidth - a.plotY : a.plotX, anchorY: l ? c.plotHeight - a.plotX : a.plotY});
            p || (b.attr({y: -9999}), b.placed = !1)
        };
        g.prototype.justifyDataLabel = function (a, b, e, f, g, k) {
            var c = this.chart, l = b.align, n = b.verticalAlign, r, m, q = a.box ? 0 : a.padding || 0;
            r = e.x + q;
            0 > r && ("right" === l ? b.align = "left" : b.x = -r, m = !0);
            r = e.x + f.width - q;
            r > c.plotWidth && ("left" === l ? b.align = "right" : b.x = c.plotWidth - r, m = !0);
            r = e.y + q;
            0 > r && ("bottom" === n ? b.verticalAlign = "top" : b.y = -r, m = !0);
            r = e.y + f.height - q;
            r > c.plotHeight && ("top" === n ? b.verticalAlign = "bottom" : b.y = c.plotHeight - r, m = !0);
            m && (a.placed = !k, a.align(b, null, g));
            return m
        };
        f.pie && (f.pie.prototype.drawDataLabels = function () {
            var c = this, b = c.data, e, f = c.chart, k = c.options.dataLabels, m = z(k.connectorPadding, 10), x = z(k.connectorWidth, 1), q = f.plotWidth, n = f.plotHeight, t, u = c.center, A = u[2] / 2, d = u[1], p, D,
                h, y, w = [
                    [],
                    []
                ], M, O, N, G, K = [0, 0, 0, 0];
            c.visible && (k.enabled || c._hasPointLabels) && (v(b, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({width: "auto", textOverflow: "clip"}), a.dataLabel.shortened = !1)
            }), g.prototype.drawDataLabels.apply(c), v(b, function (a) {
                a.dataLabel && a.visible && (w[a.half].push(a), a.dataLabel._pos = null)
            }), v(w, function (b, l) {
                var g, r, x = b.length, t = [], B;
                if (x)for (c.sortByAngle(b, l - .5), 0 < c.maxLabelDistance && (g = Math.max(0, d - A - c.maxLabelDistance), r = Math.min(d +
                    A + c.maxLabelDistance, f.plotHeight), v(b, function (a) {
                    0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, d - A - a.labelDistance), a.bottom = Math.min(d + A + a.labelDistance, f.plotHeight), B = a.dataLabel.getBBox().height || 21, a.positionsIndex = t.push({target: a.labelPos[1] - a.top + B / 2, size: B, rank: a.y}) - 1)
                }), a.distribute(t, r + B - g)), G = 0; G < x; G++)e = b[G], r = e.positionsIndex, h = e.labelPos, p = e.dataLabel, N = !1 === e.visible ? "hidden" : "inherit", O = g = h[1], t && H(t[r]) && (void 0 === t[r].pos ? N = "hidden" : (y = t[r].size, O = e.top + t[r].pos)), delete e.positionIndex,
                    M = k.justify ? u[0] + (l ? -1 : 1) * (A + e.labelDistance) : c.getX(O < e.top + 2 || O > e.bottom - 2 ? g : O, l, e), p._attr = {visibility: N, align: h[6]}, p._pos = {x: M + k.x + ({left: m, right: -m}[h[6]] || 0), y: O + k.y - 10}, h.x = M, h.y = O, z(k.crop, !0) && (D = p.getBBox().width, g = null, M - D < m ? (g = Math.round(D - M + m), K[3] = Math.max(g, K[3])) : M + D > q - m && (g = Math.round(M + D - q + m), K[1] = Math.max(g, K[1])), 0 > O - y / 2 ? K[0] = Math.max(Math.round(-O + y / 2), K[0]) : O + y / 2 > n && (K[2] = Math.max(Math.round(O + y / 2 - n), K[2])), p.sideOverflow = g)
            }), 0 === E(K) || this.verifyDataLabelOverflow(K)) && (this.placeDataLabels(),
                x && v(this.points, function (a) {
                    var d;
                    t = a.connector;
                    if ((p = a.dataLabel) && p._pos && a.visible && 0 < a.labelDistance) {
                        N = p._attr.visibility;
                        if (d = !t)a.connector = t = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(c.dataLabelsGroup), t.attr({"stroke-width": x, stroke: k.connectorColor || a.color || "#666666"});
                        t[d ? "attr" : "animate"]({d: c.connectorPath(a.labelPos)});
                        t.attr("visibility", N)
                    } else t && (a.connector = t.destroy())
                }))
        }, f.pie.prototype.connectorPath = function (a) {
            var b =
                a.x, c = a.y;
            return z(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, f.pie.prototype.placeDataLabels = function () {
            v(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({width: b._attr.width + "px", textOverflow: "ellipsis"}), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a),
                    b.moved = !0) : b && b.attr({y: -9999}))
            }, this)
        }, f.pie.prototype.alignDataLabel = u, f.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center, c = this.options, e = c.center, f = c.minSize || 80, g, k = null !== c.size;
            k || (null !== e[0] ? g = Math.max(b[2] - Math.max(a[1], a[3]), f) : (g = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? g = Math.max(Math.min(g, b[2] - Math.max(a[0], a[2])), f) : (g = Math.max(Math.min(g, b[2] - a[0] - a[2]), f), b[1] += (a[0] - a[2]) / 2), g < b[2] ? (b[2] = g, b[3] = Math.min(m(c.innerSize || 0, g), g), this.translate(b),
                this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        f.column && (f.column.prototype.alignDataLabel = function (a, b, e, f, k) {
            var c = this.chart.inverted, l = a.series, r = a.dlBox || a.shapeArgs, n = z(a.below, a.plotY > z(this.translatedThreshold, l.yAxis.len)), m = z(e.inside, !!this.options.stacking);
            r && (f = t(r), 0 > f.y && (f.height += f.y, f.y = 0), r = f.y + f.height - l.yAxis.len, 0 < r && (f.height -= r), c && (f = {x: l.yAxis.len - f.y - f.height, y: l.xAxis.len - f.x - f.width, width: f.height, height: f.width}), m || (c ? (f.x += n ? 0 : f.width, f.width = 0) : (f.y +=
                n ? f.height : 0, f.height = 0)));
            e.align = z(e.align, !c || m ? "center" : n ? "right" : "left");
            e.verticalAlign = z(e.verticalAlign, c || m ? "middle" : n ? "top" : "bottom");
            g.prototype.alignDataLabel.call(this, a, b, e, f, k);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({color: a.contrastColor})
        })
    })(L);
    (function (a) {
        var G = a.Chart, E = a.each, H = a.objectEach, v = a.pick;
        a = a.addEvent;
        a(G.prototype, "render", function () {
            var a = [];
            E(this.labelCollectors || [], function (k) {
                a = a.concat(k())
            });
            E(this.yAxis || [], function (k) {
                k.options.stackLabels && !k.options.stackLabels.allowOverlap && H(k.stacks, function (k) {
                    H(k, function (k) {
                        a.push(k.label)
                    })
                })
            });
            E(this.series || [], function (k) {
                var q = k.options.dataLabels, t = k.dataLabelCollections || ["dataLabel"];
                (q.enabled || k._hasPointLabels) && !q.allowOverlap && k.visible && E(t, function (q) {
                    E(k.points, function (k) {
                        k[q] && (k[q].labelrank = v(k.labelrank, k.shapeArgs && k.shapeArgs.height), a.push(k[q]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        G.prototype.hideOverlappingLabels = function (a) {
            var k = a.length, v, t, u, z, m, g, f, e, c, b = function (a, b, c, e, f, g, n, k) {
                return!(f > a + c || f + n < a || g > b + e || g + k < b)
            };
            for (t = 0; t < k; t++)if (v = a[t])v.oldOpacity = v.opacity, v.newOpacity = 1, v.width || (u = v.getBBox(), v.width = u.width, v.height = u.height);
            a.sort(function (a, b) {
                return(b.labelrank || 0) - (a.labelrank || 0)
            });
            for (t = 0; t < k; t++)for (u = a[t], v = t + 1; v < k; ++v)if (z = a[v], u && z && u !== z && u.placed && z.placed && 0 !== u.newOpacity && 0 !== z.newOpacity && (m = u.alignAttr, g = z.alignAttr, f = u.parentGroup, e = z.parentGroup, c = 2 * (u.box ? 0 : u.padding || 0), m = b(m.x + f.translateX, m.y + f.translateY, u.width - c, u.height -
                c, g.x + e.translateX, g.y + e.translateY, z.width - c, z.height - c)))(u.labelrank < z.labelrank ? u : z).newOpacity = 0;
            E(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.Chart, H = a.createElement, v = a.css, k = a.defaultOptions, q = a.defaultPlotOptions, w = a.each, t = a.extend, u = a.fireEvent, z = a.hasTouch, m = a.inArray, g = a.isObject, f = a.Legend, e = a.merge,
            c = a.pick, b = a.Point, r = a.Series, l = a.seriesTypes, C = a.svg, I;
        I = a.TrackerMixin = {drawTrackerPoint: function () {
            var a = this, b = a.chart.pointer, c = function (a) {
                var c = b.getPointFromEvent(a);
                void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
            };
            w(a.points, function (a) {
                a.graphic && (a.graphic.element.point = a);
                a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
            });
            a._hasTracking || (w(a.trackerGroups, function (e) {
                if (a[e]) {
                    a[e].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                        b.onTrackerMouseOut(a)
                    });
                    if (z)a[e].on("touchstart", c);
                    a.options.cursor && a[e].css(v).css({cursor: a.options.cursor})
                }
            }), a._hasTracking = !0)
        }, drawTrackerGraph: function () {
            var a = this, b = a.options, c = b.trackByArea, e = [].concat(c ? a.areaPath : a.graphPath), f = e.length, g = a.chart, d = g.pointer, p = g.renderer, l = g.options.tooltip.snap, h = a.tracker, k, m = function () {
                if (g.hoverSeries !== a)a.onMouseOver()
            }, r = "rgba(192,192,192," + (C ? .0001 : .002) + ")";
            if (f && !c)for (k = f + 1; k--;)"M" === e[k] && e.splice(k + 1, 0, e[k + 1] - l, e[k + 2], "L"), (k && "M" === e[k] || k === f) && e.splice(k,
                0, "L", e[k - 2] + l, e[k - 1]);
            h ? h.attr({d: e}) : a.graph && (a.tracker = p.path(e).attr({"stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: r, fill: c ? r : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * l), zIndex: 2}).add(a.group), w([a.tracker, a.markerGroup], function (a) {
                a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function (a) {
                    d.onTrackerMouseOut(a)
                });
                b.cursor && a.css({cursor: b.cursor});
                if (z)a.on("touchstart", m)
            }))
        }};
        l.column && (l.column.prototype.drawTracker = I.drawTrackerPoint);
        l.pie && (l.pie.prototype.drawTracker = I.drawTrackerPoint);
        l.scatter && (l.scatter.prototype.drawTracker = I.drawTrackerPoint);
        t(f.prototype, {setItemEvents: function (a, c, f) {
            var n = this, g = n.chart.renderer.boxWrapper, l = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
            (f ? c : a.legendGroup).on("mouseover",function () {
                a.setState("hover");
                g.addClass(l);
                c.css(n.options.itemHoverStyle)
            }).on("mouseout",function () {
                c.css(e(a.visible ? n.itemStyle : n.itemHiddenStyle));
                g.removeClass(l);
                a.setState()
            }).on("click",
                function (d) {
                    var b = function () {
                        a.setVisible && a.setVisible()
                    };
                    g.removeClass(l);
                    d = {browserEvent: d};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", d, b) : u(a, "legendItemClick", d, b)
                })
        }, createCheckboxForItem: function (a) {
            a.checkbox = H("input", {type: "checkbox", checked: a.selected, defaultChecked: a.selected}, this.options.itemCheckboxStyle, this.chart.container);
            G(a.checkbox, "click", function (b) {
                u(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                    a.select()
                })
            })
        }});
        k.legend.itemStyle.cursor =
            "pointer";
        t(E.prototype, {showResetZoom: function () {
            var a = this, b = k.lang, c = a.options.chart.resetZoomButton, e = c.theme, f = e.states, g = "chart" === c.relativeTo ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null,function () {
                a.zoomOut()
            }, e, f && f.hover).attr({align: c.position.align, title: b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
        }, zoomOut: function () {
            var a = this;
            u(a, "selection", {resetSelection: !0}, function () {
                a.zoom()
            })
        }, zoom: function (a) {
            var b, e = this.pointer,
                f = !1, l;
            !a || a.resetSelection ? (w(this.axes, function (a) {
                b = a.zoom()
            }), e.initiated = !1) : w(a.xAxis.concat(a.yAxis), function (a) {
                var d = a.axis;
                e[d.isXAxis ? "zoomX" : "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn && (f = !0))
            });
            l = this.resetZoomButton;
            f && !l ? this.showResetZoom() : !f && g(l) && (this.resetZoomButton = l.destroy());
            b && this.redraw(c(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
        }, pan: function (a, b) {
            var c = this, e = c.hoverPoints, f;
            e && w(e, function (a) {
                a.setState()
            });
            w("xy" === b ? [1, 0] : [1], function (b) {
                b =
                    c[b ? "xAxis" : "yAxis"][0];
                var d = b.horiz, e = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d], h = (b.pointRange || 0) / 2, n = b.getExtremes(), l = b.toValue(g - e, !0) + h, k = b.toValue(g + b.len - e, !0) - h, m = k < l, g = m ? k : l, l = m ? l : k, k = Math.min(n.dataMin, h ? n.min : b.toValue(b.toPixels(n.min) - b.minPixelPadding)), h = Math.max(n.dataMax, h ? n.max : b.toValue(b.toPixels(n.max) + b.minPixelPadding)), m = k - g;
                0 < m && (l += m, g = k);
                m = l - h;
                0 < m && (l = h, g -= m);
                b.series.length && g !== n.min && l !== n.max && (b.setExtremes(g, l, !1, !1, {trigger: "pan"}), f = !0);
                c[d] =
                    e
            });
            f && c.redraw(!1);
            v(c.container, {cursor: "move"})
        }});
        t(b.prototype, {select: function (a, b) {
            var e = this, f = e.series, g = f.chart;
            a = c(a, !e.selected);
            e.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                e.selected = e.options.selected = a;
                f.options.data[m(e, f.data)] = e.options;
                e.setState(a && "select");
                b || w(g.getSelectedPoints(), function (a) {
                    a.selected && a !== e && (a.selected = a.options.selected = !1, f.options.data[m(a, f.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                })
            })
        }, onMouseOver: function (a) {
            var b =
                this.series.chart, c = b.pointer;
            a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
            c.runPointActions(a, this)
        }, onMouseOut: function () {
            var a = this.series.chart;
            this.firePointEvent("mouseOut");
            w(a.hoverPoints || [], function (a) {
                a.setState()
            });
            a.hoverPoints = a.hoverPoint = null
        }, importEvents: function () {
            if (!this.hasImportedEvents) {
                var b = this, c = e(b.series.options.point, b.options).events;
                b.events = c;
                a.objectEach(c, function (a, c) {
                    G(b, c, a)
                });
                this.hasImportedEvents = !0
            }
        }, setState: function (a, b) {
            var e = Math.floor(this.plotX),
                f = this.plotY, g = this.series, l = g.options.states[a] || {}, d = q[g.type].marker && g.options.marker, p = d && !1 === d.enabled, k = d && d.states && d.states[a] || {}, h = !1 === k.enabled, m = g.stateMarkerGraphic, r = this.marker || {}, x = g.chart, u = g.halo, v, F = d && g.markerAttribs;
            a = a || "";
            if (!(a === this.state && !b || this.selected && "select" !== a || !1 === l.enabled || a && (h || p && !1 === k.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                F && (v = g.markerAttribs(this, a));
                if (this.graphic)this.state && this.graphic.removeClass("highcharts-point-" +
                    this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(g.pointAttribs(this, a), c(x.options.chart.animation, l.animation)), v && this.graphic.animate(v, c(x.options.chart.animation, k.animation, d.animation)), m && m.hide(); else {
                    if (a && k) {
                        d = r.symbol || g.symbol;
                        m && m.currentSymbol !== d && (m = m.destroy());
                        if (m)m[b ? "animate" : "attr"]({x: v.x, y: v.y}); else d && (g.stateMarkerGraphic = m = x.renderer.symbol(d, v.x, v.y, v.width, v.height).add(g.markerGroup), m.currentSymbol = d);
                        m && m.attr(g.pointAttribs(this,
                            a))
                    }
                    m && (m[a && x.isInsidePlot(e, f, x.inverted) ? "show" : "hide"](), m.element.point = this)
                }
                (e = l.halo) && e.size ? (u || (g.halo = u = x.renderer.path().add((this.graphic || m).parentGroup)), u[b ? "animate" : "attr"]({d: this.haloPath(e.size)}), u.attr({"class": "highcharts-halo highcharts-color-" + c(this.colorIndex, g.colorIndex)}), u.point = this, u.attr(t({fill: this.color || g.color, "fill-opacity": e.opacity, zIndex: -1}, e.attributes))) : u && u.point && u.point.haloPath && u.animate({d: u.point.haloPath(0)});
                this.state = a
            }
        }, haloPath: function (a) {
            return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                a, this.plotY - a, 2 * a, 2 * a)
        }});
        t(r.prototype, {onMouseOver: function () {
            var a = this.chart, b = a.hoverSeries;
            if (b && b !== this)b.onMouseOut();
            this.options.events.mouseOver && u(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        }, onMouseOut: function () {
            var a = this.options, b = this.chart, c = b.tooltip, e = b.hoverPoint;
            b.hoverSeries = null;
            if (e)e.onMouseOut();
            this && a.events.mouseOut && u(this, "mouseOut");
            !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
            this.setState()
        }, setState: function (a) {
            var b = this,
                e = b.options, f = b.graph, g = e.states, l = e.lineWidth, e = 0;
            a = a || "";
            if (b.state !== a && (w([b.group, b.markerGroup, b.dataLabelsGroup], function (d) {
                d && (b.state && d.removeClass("highcharts-series-" + b.state), a && d.addClass("highcharts-series-" + a))
            }), b.state = a, !g[a] || !1 !== g[a].enabled) && (a && (l = g[a].lineWidth || l + (g[a].lineWidthPlus || 0)), f && !f.dashstyle))for (l = {"stroke-width": l}, f.animate(l, c(b.chart.options.chart.animation, g[a] && g[a].animation)); b["zone-graph-" + e];)b["zone-graph-" + e].attr(l), e += 1
        }, setVisible: function (a, b) {
            var c = this, e = c.chart, f = c.legendItem, g, d = e.options.chart.ignoreHiddenSeries, p = c.visible;
            g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !p : a) ? "show" : "hide";
            w(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                if (c[a])c[a][g]()
            });
            if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c)c.onMouseOut();
            f && e.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && w(e.series, function (a) {
                a.options.stacking && a.visible && (a.isDirty = !0)
            });
            w(c.linkedSeries, function (b) {
                b.setVisible(a,
                    !1)
            });
            d && (e.isDirtyBox = !0);
            !1 !== b && e.redraw();
            u(c, g)
        }, show: function () {
            this.setVisible(!0)
        }, hide: function () {
            this.setVisible(!1)
        }, select: function (a) {
            this.selected = a = void 0 === a ? !this.selected : a;
            this.checkbox && (this.checkbox.checked = a);
            u(this, a ? "select" : "unselect")
        }, drawTracker: I.drawTrackerGraph})
    })(L);
    (function (a) {
        var G = a.Chart, E = a.each, H = a.inArray, v = a.isArray, k = a.isObject, q = a.pick, w = a.splat;
        G.prototype.setResponsive = function (k) {
            var q = this.options.responsive, t = [], m = this.currentResponsive;
            q && q.rules &&
            E(q.rules, function (f) {
                void 0 === f._id && (f._id = a.uniqueKey());
                this.matchResponsiveRule(f, t, k)
            }, this);
            var g = a.merge.apply(0, a.map(t, function (f) {
                return a.find(q.rules,function (a) {
                    return a._id === f
                }).chartOptions
            })), t = t.toString() || void 0;
            t !== (m && m.ruleIds) && (m && this.update(m.undoOptions, k), t ? (this.currentResponsive = {ruleIds: t, mergedOptions: g, undoOptions: this.currentOptions(g)}, this.update(g, k)) : this.currentResponsive = void 0)
        };
        G.prototype.matchResponsiveRule = function (a, k) {
            var t = a.condition;
            (t.callback ||
                function () {
                    return this.chartWidth <= q(t.maxWidth, Number.MAX_VALUE) && this.chartHeight <= q(t.maxHeight, Number.MAX_VALUE) && this.chartWidth >= q(t.minWidth, 0) && this.chartHeight >= q(t.minHeight, 0)
                }).call(this) && k.push(a._id)
        };
        G.prototype.currentOptions = function (q) {
            function t(m, g, f, e) {
                var c;
                a.objectEach(m, function (a, m) {
                    if (!e && -1 < H(m, ["series", "xAxis", "yAxis"]))for (a = w(a), f[m] = [], c = 0; c < a.length; c++)g[m][c] && (f[m][c] = {}, t(a[c], g[m][c], f[m][c], e + 1)); else k(a) ? (f[m] = v(a) ? [] : {}, t(a, g[m] || {}, f[m], e + 1)) : f[m] = g[m] ||
                        null
                })
            }

            var z = {};
            t(q, this.options, z, 0);
            return z
        }
    })(L);
    (function (a) {
        var G = a.addEvent, E = a.Axis, H = a.Chart, v = a.css, k = a.dateFormat, q = a.defined, w = a.each, t = a.extend, u = a.noop, z = a.pick, m = a.timeUnits, g = a.wrap;
        g(a.Series.prototype, "init", function (a) {
            var e;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (e = this.xAxis) && e.options.ordinal && G(this, "updatedData", function () {
                delete e.ordinalIndex
            })
        });
        g(E.prototype, "getTimeTicks", function (a, e, c, b, g, l, t, u) {
            var f = 0, r, n, v = {}, C, A, d, p = [], D = -Number.MAX_VALUE, h = this.options.tickPixelInterval;
            if (!this.options.ordinal && !this.options.breaks || !l || 3 > l.length || void 0 === c)return a.call(this, e, c, b, g);
            A = l.length;
            for (r = 0; r < A; r++) {
                d = r && l[r - 1] > b;
                l[r] < c && (f = r);
                if (r === A - 1 || l[r + 1] - l[r] > 5 * t || d) {
                    if (l[r] > D) {
                        for (n = a.call(this, e, l[f], l[r], g); n.length && n[0] <= D;)n.shift();
                        n.length && (D = n[n.length - 1]);
                        p = p.concat(n)
                    }
                    f = r + 1
                }
                if (d)break
            }
            a = n.info;
            if (u && a.unitRange <= m.hour) {
                r = p.length - 1;
                for (f = 1; f < r; f++)k("%d", p[f]) !== k("%d", p[f - 1]) && (v[p[f]] = "day", C = !0);
                C && (v[p[0]] = "day");
                a.higherRanks = v
            }
            p.info = a;
            if (u && q(h)) {
                u = a = p.length;
                r = [];
                var y;
                for (C = []; u--;)f = this.translate(p[u]), y && (C[u] = y - f), r[u] = y = f;
                C.sort();
                C = C[Math.floor(C.length / 2)];
                C < .6 * h && (C = null);
                u = p[a - 1] > b ? a - 1 : a;
                for (y = void 0; u--;)f = r[u], b = Math.abs(y - f), y && b < .8 * h && (null === C || b < .8 * C) ? (v[p[u]] && !v[p[u + 1]] ? (b = u + 1, y = f) : b = u, p.splice(b, 1)) : y = f
            }
            return p
        });
        t(E.prototype, {beforeSetTickPositions: function () {
            var a, e = [], c = !1, b, g = this.getExtremes(), l = g.min, k = g.max, m, t = this.isXAxis && !!this.options.breaks, g = this.options.ordinal, u = Number.MAX_VALUE, n = this.chart.options.chart.ignoreHiddenSeries;
            b = "highcharts-navigator-xaxis" === this.options.className;
            !this.options.overscroll || this.max !== this.dataMax || this.chart.mouseIsDown && !b || this.eventArgs && (!this.eventArgs || "navigator" === this.eventArgs.trigger) || (this.max += this.options.overscroll, !b && q(this.userMin) && (this.min += this.options.overscroll));
            if (g || t) {
                w(this.series, function (b, c) {
                    if (!(n && !1 === b.visible || !1 === b.takeOrdinalPosition && !t) && (e = e.concat(b.processedXData), a = e.length, e.sort(function (a, b) {
                        return a - b
                    }), u = Math.min(u, z(b.closestPointRange,
                        u)), a))for (c = a - 1; c--;)e[c] === e[c + 1] && e.splice(c, 1)
                });
                a = e.length;
                if (2 < a) {
                    b = e[1] - e[0];
                    for (m = a - 1; m-- && !c;)e[m + 1] - e[m] !== b && (c = !0);
                    !this.options.keepOrdinalPadding && (e[0] - l > b || k - e[e.length - 1] > b) && (c = !0)
                } else this.options.overscroll && (2 === a ? u = e[1] - e[0] : 1 === a ? (u = this.options.overscroll, e = [e[0], e[0] + u]) : u = this.overscrollPointsRange);
                c ? (this.options.overscroll && (this.overscrollPointsRange = u, e = e.concat(this.getOverscrollPositions())), this.ordinalPositions = e, b = this.ordinal2lin(Math.max(l, e[0]), !0), m = Math.max(this.ordinal2lin(Math.min(k,
                    e[e.length - 1]), !0), 1), this.ordinalSlope = k = (k - l) / (m - b), this.ordinalOffset = l - b * k) : (this.overscrollPointsRange = z(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
            }
            this.isOrdinal = g && c;
            this.groupIntervalFactor = null
        }, val2lin: function (a, e) {
            var c = this.ordinalPositions;
            if (c) {
                var b = c.length, f, g;
                for (f = b; f--;)if (c[f] === a) {
                    g = f;
                    break
                }
                for (f = b - 1; f--;)if (a > c[f] || 0 === f) {
                    a = (a - c[f]) / (c[f + 1] - c[f]);
                    g = f + a;
                    break
                }
                e = e ? g : this.ordinalSlope * (g || 0) + this.ordinalOffset
            } else e =
                a;
            return e
        }, lin2val: function (a, e) {
            var c = this.ordinalPositions;
            if (c) {
                var b = this.ordinalSlope, f = this.ordinalOffset, g = c.length - 1, k;
                if (e)0 > a ? a = c[0] : a > g ? a = c[g] : (g = Math.floor(a), k = a - g); else for (; g--;)if (e = b * g + f, a >= e) {
                    b = b * (g + 1) + f;
                    k = (a - e) / (b - e);
                    break
                }
                return void 0 !== k && void 0 !== c[g] ? c[g] + (k ? k * (c[g + 1] - c[g]) : 0) : a
            }
            return a
        }, getExtendedPositions: function () {
            var a = this, e = a.chart, c = a.series[0].currentDataGrouping, b = a.ordinalIndex, g = c ? c.count + c.unitName : "raw", l = a.options.overscroll, k = a.getExtremes(), m, q;
            b || (b = a.ordinalIndex =
            {});
            b[g] || (m = {series: [], chart: e, getExtremes: function () {
                return{min: k.dataMin, max: k.dataMax + l}
            }, options: {ordinal: !0}, val2lin: E.prototype.val2lin, ordinal2lin: E.prototype.ordinal2lin}, w(a.series, function (b) {
                q = {xAxis: m, xData: b.xData.slice(), chart: e, destroyGroupedData: u};
                q.xData = q.xData.concat(a.getOverscrollPositions());
                q.options = {dataGrouping: c ? {enabled: !0, forced: !0, approximation: "open", units: [
                    [c.unitName, [c.count]]
                ]} : {enabled: !1}};
                b.processData.apply(q);
                m.series.push(q)
            }), a.beforeSetTickPositions.apply(m),
                b[g] = m.ordinalPositions);
            return b[g]
        }, getOverscrollPositions: function () {
            var f = this.options.overscroll, e = this.overscrollPointsRange, c = [], b = this.dataMax;
            if (a.defined(e))for (c.push(b); b <= this.dataMax + f;)b += e, c.push(b);
            return c
        }, getGroupIntervalFactor: function (a, e, c) {
            var b;
            c = c.processedXData;
            var f = c.length, g = [];
            b = this.groupIntervalFactor;
            if (!b) {
                for (b = 0; b < f - 1; b++)g[b] = c[b + 1] - c[b];
                g.sort(function (a, b) {
                    return a - b
                });
                g = g[Math.floor(f / 2)];
                a = Math.max(a, c[0]);
                e = Math.min(e, c[f - 1]);
                this.groupIntervalFactor = b = f *
                    g / (e - a)
            }
            return b
        }, postProcessTickInterval: function (a) {
            var e = this.ordinalSlope;
            return e ? this.options.breaks ? this.closestPointRange || a : a / (e / this.closestPointRange) : a
        }});
        E.prototype.ordinal2lin = E.prototype.val2lin;
        g(H.prototype, "pan", function (a, e) {
            var c = this.xAxis[0], b = c.options.overscroll, f = e.chartX, g = !1;
            if (c.options.ordinal && c.series.length) {
                var k = this.mouseDownX, m = c.getExtremes(), q = m.dataMax, t = m.min, n = m.max, u = this.hoverPoints, z = c.closestPointRange || c.overscrollPointsRange, k = (k - f) / (c.translationSlope *
                    (c.ordinalSlope || z)), A = {ordinalPositions: c.getExtendedPositions()}, z = c.lin2val, d = c.val2lin, p;
                A.ordinalPositions ? 1 < Math.abs(k) && (u && w(u, function (a) {
                    a.setState()
                }), 0 > k ? (u = A, p = c.ordinalPositions ? c : A) : (u = c.ordinalPositions ? c : A, p = A), A = p.ordinalPositions, q > A[A.length - 1] && A.push(q), this.fixedRange = n - t, k = c.toFixedRange(null, null, z.apply(u, [d.apply(u, [t, !0]) + k, !0]), z.apply(p, [d.apply(p, [n, !0]) + k, !0])), k.min >= Math.min(m.dataMin, t) && k.max <= Math.max(q, n) + b && c.setExtremes(k.min, k.max, !0, !1, {trigger: "pan"}), this.mouseDownX =
                    f, v(this.container, {cursor: "move"})) : g = !0
            } else g = !0;
            g && (b && (c.max = c.dataMax + b), a.apply(this, Array.prototype.slice.call(arguments, 1)))
        })
    })(L);
    (function (a) {
        function G() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function E(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, H(this.pointArrayMap, ["y"]))
        }

        var H = a.pick, v = a.wrap, k = a.each, q = a.extend, w = a.isArray, t = a.fireEvent, u = a.Axis, z = a.Series;
        q(u.prototype, {isInBreak: function (a, g) {
            var f = a.repeat || Infinity, e = a.from, c = a.to - a.from;
            g = g >= e ? (g - e) % f : f - (e - g) % f;
            return a.inclusive ? g <= c : g < c && 0 !== g
        }, isInAnyBreak: function (a, g) {
            var f = this.options.breaks, e = f && f.length, c, b, k;
            if (e) {
                for (; e--;)this.isInBreak(f[e], a) && (c = !0, b || (b = H(f[e].showPoints, this.isXAxis ? !1 : !0)));
                k = c && g ? c && !b : c
            }
            return k
        }});
        v(u.prototype, "setTickPositions", function (a) {
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (this.options.breaks) {
                var g = this.tickPositions, f = this.tickPositions.info, e = [], c;
                for (c = 0; c < g.length; c++)this.isInAnyBreak(g[c]) || e.push(g[c]);
                this.tickPositions =
                    e;
                this.tickPositions.info = f
            }
        });
        v(u.prototype, "init", function (a, g, f) {
            var e = this;
            f.breaks && f.breaks.length && (f.ordinal = !1);
            a.call(this, g, f);
            a = this.options.breaks;
            e.isBroken = w(a) && !!a.length;
            e.isBroken && (e.val2lin = function (a) {
                var b = a, c, f;
                for (f = 0; f < e.breakArray.length; f++)if (c = e.breakArray[f], c.to <= a)b -= c.len; else if (c.from >= a)break; else if (e.isInBreak(c, a)) {
                    b -= a - c.from;
                    break
                }
                return b
            }, e.lin2val = function (a) {
                var b, c;
                for (c = 0; c < e.breakArray.length && !(b = e.breakArray[c], b.from >= a); c++)b.to < a ? a += b.len : e.isInBreak(b,
                    a) && (a += b.len);
                return a
            }, e.setExtremes = function (a, b, e, f, g) {
                for (; this.isInAnyBreak(a);)a -= this.closestPointRange;
                for (; this.isInAnyBreak(b);)b -= this.closestPointRange;
                u.prototype.setExtremes.call(this, a, b, e, f, g)
            }, e.setAxisTranslation = function (a) {
                u.prototype.setAxisTranslation.call(this, a);
                a = e.options.breaks;
                var b = [], c = [], f = 0, g, m, q = e.userMin || e.min, v = e.userMax || e.max, n = H(e.pointRangePadding, 0), B, w;
                k(a, function (a) {
                    m = a.repeat || Infinity;
                    e.isInBreak(a, q) && (q += a.to % m - q % m);
                    e.isInBreak(a, v) && (v -= v % m - a.from %
                        m)
                });
                k(a, function (a) {
                    B = a.from;
                    for (m = a.repeat || Infinity; B - m > q;)B -= m;
                    for (; B < q;)B += m;
                    for (w = B; w < v; w += m)b.push({value: w, move: "in"}), b.push({value: w + (a.to - a.from), move: "out", size: a.breakSize})
                });
                b.sort(function (a, b) {
                    return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                });
                g = 0;
                B = q;
                k(b, function (a) {
                    g += "in" === a.move ? 1 : -1;
                    1 === g && "in" === a.move && (B = a.value);
                    0 === g && (c.push({from: B, to: a.value, len: a.value - B - (a.size || 0)}), f += a.value - B - (a.size || 0))
                });
                e.breakArray = c;
                e.unitLength = v - q - f + n;
                t(e,
                    "afterBreaks");
                e.options.staticScale ? e.transA = e.options.staticScale : e.unitLength && (e.transA *= (v - e.min + n) / e.unitLength);
                n && (e.minPixelPadding = e.transA * e.minPointOffset);
                e.min = q;
                e.max = v
            })
        });
        v(z.prototype, "generatePoints", function (a) {
            a.apply(this, G(arguments));
            var g = this.xAxis, f = this.yAxis, e = this.points, c, b = e.length, k = this.options.connectNulls, l;
            if (g && f && (g.options.breaks || f.options.breaks))for (; b--;)c = e[b], l = null === c.y && !1 === k, l || !g.isInAnyBreak(c.x, !0) && !f.isInAnyBreak(c.y, !0) || (e.splice(b, 1), this.data[b] &&
                this.data[b].destroyElements())
        });
        a.Series.prototype.drawBreaks = function (a, g) {
            var f = this, e = f.points, c, b, m, l;
            a && k(g, function (g) {
                c = a.breakArray || [];
                b = a.isXAxis ? a.min : H(f.options.threshold, a.min);
                k(e, function (e) {
                    l = H(e["stack" + g.toUpperCase()], e[g]);
                    k(c, function (c) {
                        m = !1;
                        if (b < c.from && l > c.to || b > c.from && l < c.from)m = "pointBreak"; else if (b < c.from && l > c.from && l < c.to || b > c.from && l > c.to && l < c.from)m = "pointInBreak";
                        m && t(a, m, {point: e, brk: c})
                    })
                })
            })
        };
        a.Series.prototype.gappedPath = function () {
            var k = this.options.gapSize,
                g = this.points.slice(), f = g.length - 1, e = this.yAxis, c;
            if (k && 0 < f)for ("value" !== this.options.gapUnit && (k *= this.closestPointRange); f--;)g[f + 1].x - g[f].x > k && (c = (g[f].x + g[f + 1].x) / 2, g.splice(f + 1, 0, {isNull: !0, x: c}), this.options.stacking && (c = e.stacks[this.stackKey][c] = new a.StackItem(e, e.options.stackLabels, !1, c, this.stack), c.total = 0));
            return this.getGraphPath(g)
        };
        v(a.seriesTypes.column.prototype, "drawPoints", E);
        v(a.Series.prototype, "drawPoints", E)
    })(L);
    (function (a) {
        var G = a.arrayMax, E = a.arrayMin, H = a.Axis, v = a.defaultPlotOptions,
            k = a.defined, q = a.each, w = a.extend, t = a.format, u = a.isNumber, z = a.merge, m = a.pick, g = a.Point, f = a.Tooltip, e = a.wrap, c = a.Series.prototype, b = c.processData, r = c.generatePoints, l = {approximation: "average", groupPixelWidth: 2, dateTimeLabelFormats: {millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"], second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"], minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], day: ["%A, %b %e, %Y",
                "%A, %b %e", "-%A, %b %e, %Y"], week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], month: ["%B %Y", "%B", "-%B %Y"], year: ["%Y", "%Y", "-%Y"]}}, C = {line: {}, spline: {}, area: {}, areaspline: {}, column: {approximation: "sum", groupPixelWidth: 10}, arearange: {approximation: "range"}, areasplinerange: {approximation: "range"}, columnrange: {approximation: "range", groupPixelWidth: 10}, candlestick: {approximation: "ohlc", groupPixelWidth: 10}, ohlc: {approximation: "ohlc", groupPixelWidth: 5}}, I = a.defaultDataGroupingUnits = [
                ["millisecond",
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ], x = a.approximations = {sum: function (a) {
                var b = a.length, c;
                if (!b && a.hasNulls)c = null; else if (b)for (c = 0; b--;)c += a[b];
                return c
            }, average: function (a) {
                var b = a.length;
                a = x.sum(a);
                u(a) && b && (a /= b);
                return a
            }, averages: function () {
                var a = [];
                q(arguments, function (b) {
                    a.push(x.average(b))
                });
                return void 0 === a[0] ? void 0 : a
            }, open: function (a) {
                return a.length ?
                    a[0] : a.hasNulls ? null : void 0
            }, high: function (a) {
                return a.length ? G(a) : a.hasNulls ? null : void 0
            }, low: function (a) {
                return a.length ? E(a) : a.hasNulls ? null : void 0
            }, close: function (a) {
                return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
            }, ohlc: function (a, b, c, e) {
                a = x.open(a);
                b = x.high(b);
                c = x.low(c);
                e = x.close(e);
                if (u(a) || u(b) || u(c) || u(e))return[a, b, c, e]
            }, range: function (a, b) {
                a = x.low(a);
                b = x.high(b);
                if (u(a) || u(b))return[a, b];
                if (null === a && null === b)return null
            }};
        c.groupData = function (a, b, c, e) {
            var f = this.data, d = this.options.data,
                g = [], n = [], h = [], k = a.length, m, r, t = !!b, v = [];
            e = "function" === typeof e ? e : x[e] || C[this.type] && x[C[this.type].approximation] || x[l.approximation];
            var B = this.pointArrayMap, w = B && B.length, z = 0;
            r = 0;
            var F, J;
            w ? q(B, function () {
                v.push([])
            }) : v.push([]);
            F = w || 1;
            for (J = 0; J <= k && !(a[J] >= c[0]); J++);
            for (J; J <= k; J++) {
                for (; void 0 !== c[z + 1] && a[J] >= c[z + 1] || J === k;) {
                    m = c[z];
                    this.dataGroupInfo = {start: r, length: v[0].length};
                    r = e.apply(this, v);
                    void 0 !== r && (g.push(m), n.push(r), h.push(this.dataGroupInfo));
                    r = J;
                    for (m = 0; m < F; m++)v[m].length = 0,
                        v[m].hasNulls = !1;
                    z += 1;
                    if (J === k)break
                }
                if (J === k)break;
                if (B) {
                    m = this.cropStart + J;
                    var E = f && f[m] || this.pointClass.prototype.applyOptions.apply({series: this}, [d[m]]), I;
                    for (m = 0; m < w; m++)I = E[B[m]], u(I) ? v[m].push(I) : null === I && (v[m].hasNulls = !0)
                } else m = t ? b[J] : null, u(m) ? v[0].push(m) : null === m && (v[0].hasNulls = !0)
            }
            return[g, n, h]
        };
        c.processData = function () {
            var a = this.chart, e = this.options.dataGrouping, f = !1 !== this.allowDG && e && m(e.enabled, a.options.isStock), g = this.visible || !a.options.chart.ignoreHiddenSeries, l, d = this.currentDataGrouping,
                p;
            this.forceCrop = f;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== b.apply(this, arguments) && f) {
                this.destroyGroupedData();
                var q = this.processedXData, h = this.processedYData, r = a.plotSizeX, a = this.xAxis, t = a.options.ordinal, u = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (u) {
                    this.isDirty = l = !0;
                    this.points = null;
                    f = a.getExtremes();
                    p = f.min;
                    f = f.max;
                    t = t && a.getGroupIntervalFactor(p, f, this) || 1;
                    u = u * (f - p) / r * t;
                    r = a.getTimeTicks(a.normalizeTimeTickInterval(u, e.units || I), Math.min(p, q[0]), Math.max(f,
                        q[q.length - 1]), a.options.startOfWeek, q, this.closestPointRange);
                    q = c.groupData.apply(this, [q, h, r, e.approximation]);
                    h = q[0];
                    t = q[1];
                    if (e.smoothed && h.length) {
                        e = h.length - 1;
                        for (h[e] = Math.min(h[e], f); e-- && 0 < e;)h[e] += u / 2;
                        h[0] = Math.max(h[0], p)
                    }
                    p = r.info;
                    this.closestPointRange = r.info.totalRange;
                    this.groupMap = q[2];
                    k(h[0]) && h[0] < a.dataMin && g && (a.min === a.dataMin && (a.min = h[0]), a.dataMin = h[0]);
                    this.processedXData = h;
                    this.processedYData = t
                } else this.groupMap = null;
                this.hasGroupedData = l;
                this.currentDataGrouping = p;
                this.preventGraphAnimation =
                    (d && d.totalRange) !== (p && p.totalRange)
            }
        };
        c.destroyGroupedData = function () {
            var a = this.groupedData;
            q(a || [], function (b, c) {
                b && (a[c] = b.destroy ? b.destroy() : null)
            });
            this.groupedData = null
        };
        c.generatePoints = function () {
            r.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        e(g.prototype, "update", function (b) {
            this.dataGroup ? a.error(24) : b.apply(this, [].slice.call(arguments, 1))
        });
        e(f.prototype, "tooltipFooterHeaderFormatter", function (b, c, e) {
            var f = c.series, g = f.tooltipOptions,
                d = f.options.dataGrouping, p = g.xDateFormat, l, h = f.xAxis, n = a.dateFormat;
            return h && "datetime" === h.options.type && d && u(c.key) ? (b = f.currentDataGrouping, d = d.dateTimeLabelFormats, b ? (h = d[b.unitName], 1 === b.count ? p = h[0] : (p = h[1], l = h[2])) : !p && d && (p = this.getXDateFormat(c, g, h)), p = n(p, c.key), l && (p += n(l, c.key + b.totalRange - 1)), t(g[(e ? "footer" : "header") + "Format"], {point: w(c.point, {key: p}), series: f})) : b.call(this, c, e)
        });
        e(c, "destroy", function (a) {
            a.call(this);
            this.destroyGroupedData()
        });
        e(c, "setOptions", function (a, b) {
            a =
                a.call(this, b);
            var c = this.type, e = this.chart.options.plotOptions, f = v[c].dataGrouping;
            C[c] && (f || (f = z(l, C[c])), a.dataGrouping = z(f, e.series && e.series.dataGrouping, e[c].dataGrouping, b.dataGrouping));
            this.chart.options.isStock && (this.requireSorting = !0);
            return a
        });
        e(H.prototype, "setScale", function (a) {
            a.call(this);
            q(this.series, function (a) {
                a.hasProcessed = !1
            })
        });
        H.prototype.getGroupPixelWidth = function () {
            var a = this.series, b = a.length, c, e = 0, f = !1, d;
            for (c = b; c--;)(d = a[c].options.dataGrouping) && (e = Math.max(e, d.groupPixelWidth));
            for (c = b; c--;)(d = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / e || b && d.forced) && (f = !0);
            return f ? e : 0
        };
        H.prototype.setDataGrouping = function (a, b) {
            var c;
            b = m(b, !0);
            a || (a = {forced: !1, units: null});
            if (this instanceof H)for (c = this.series.length; c--;)this.series[c].update({dataGrouping: a}, !1); else q(this.chart.options.series, function (b) {
                b.dataGrouping = a
            }, !1);
            b && this.chart.redraw()
        }
    })(L);
    (function (a) {
        var G = a.each, E = a.Point,
            H = a.seriesType, v = a.seriesTypes;
        H("ohlc", "column", {lineWidth: 1, tooltip: {pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'}, threshold: null, states: {hover: {lineWidth: 3}}, stickyTracking: !0}, {directTouch: !1, pointArrayMap: ["open", "high", "low", "close"], toYData: function (a) {
            return[a.open, a.high, a.low, a.close]
        }, pointValKey: "close",
            pointAttrToOptions: {stroke: "color", "stroke-width": "lineWidth"}, pointAttribs: function (a, q) {
                q = v.column.prototype.pointAttribs.call(this, a, q);
                var k = this.options;
                delete q.fill;
                !a.options.color && k.upColor && a.open < a.close && (q.stroke = k.upColor);
                return q
            }, translate: function () {
                var a = this, q = a.yAxis, w = !!a.modifyValue, t = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                v.column.prototype.translate.apply(a);
                G(a.points, function (k) {
                    G([k.open, k.high, k.low, k.close, k.low], function (u, m) {
                        null !== u && (w && (u = a.modifyValue(u)),
                            k[t[m]] = q.toPixels(u, !0))
                    });
                    k.tooltipPos[1] = k.plotHigh + q.pos - a.chart.plotTop
                })
            }, drawPoints: function () {
                var a = this, q = a.chart;
                G(a.points, function (k) {
                    var t, u, v, m, g = k.graphic, f, e = !g;
                    void 0 !== k.plotY && (g || (k.graphic = g = q.renderer.path().add(a.group)), g.attr(a.pointAttribs(k, k.selected && "select")), u = g.strokeWidth() % 2 / 2, f = Math.round(k.plotX) - u, v = Math.round(k.shapeArgs.width / 2), m = ["M", f, Math.round(k.yBottom), "L", f, Math.round(k.plotHigh)], null !== k.open && (t = Math.round(k.plotOpen) + u, m.push("M", f, t, "L", f - v, t)),
                        null !== k.close && (t = Math.round(k.plotClose) + u, m.push("M", f, t, "L", f + v, t)), g[e ? "attr" : "animate"]({d: m}).addClass(k.getClassName(), !0))
                })
            }, animate: null}, {getClassName: function () {
            return E.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
        }})
    })(L);
    (function (a) {
        var G = a.defaultPlotOptions, E = a.each, H = a.merge, v = a.seriesType, k = a.seriesTypes;
        v("candlestick", "ohlc", H(G.column, {states: {hover: {lineWidth: 2}}, tooltip: G.ohlc.tooltip, threshold: null, lineColor: "#000000",
            lineWidth: 1, upColor: "#ffffff", stickyTracking: !0}), {pointAttribs: function (a, v) {
            var q = k.column.prototype.pointAttribs.call(this, a, v), u = this.options, w = a.open < a.close, m = u.lineColor || this.color;
            q["stroke-width"] = u.lineWidth;
            q.fill = a.options.color || (w ? u.upColor || this.color : this.color);
            q.stroke = a.lineColor || (w ? u.upLineColor || m : m);
            v && (a = u.states[v], q.fill = a.color || q.fill, q.stroke = a.lineColor || q.stroke, q["stroke-width"] = a.lineWidth || q["stroke-width"]);
            return q
        }, drawPoints: function () {
            var a = this, k = a.chart;
            E(a.points,
                function (q) {
                    var t = q.graphic, v, m, g, f, e, c, b, r = !t;
                    void 0 !== q.plotY && (t || (q.graphic = t = k.renderer.path().add(a.group)), t.attr(a.pointAttribs(q, q.selected && "select")).shadow(a.options.shadow), e = t.strokeWidth() % 2 / 2, c = Math.round(q.plotX) - e, v = q.plotOpen, m = q.plotClose, g = Math.min(v, m), v = Math.max(v, m), b = Math.round(q.shapeArgs.width / 2), m = Math.round(g) !== Math.round(q.plotHigh), f = v !== q.yBottom, g = Math.round(g) + e, v = Math.round(v) + e, e = [], e.push("M", c - b, v, "L", c - b, g, "L", c + b, g, "L", c + b, v, "Z", "M", c, g, "L", c, m ? Math.round(q.plotHigh) :
                        g, "M", c, v, "L", c, f ? Math.round(q.yBottom) : v), t[r ? "attr" : "animate"]({d: e}).addClass(q.getClassName(), !0))
                })
        }})
    })(L);
    Z = function (a) {
        var G = a.each, E = a.seriesTypes, H = a.stableSort;
        return{translate: function () {
            E.column.prototype.translate.apply(this);
            var a = this.options, k = this.chart, q = this.points, w = q.length - 1, t, u, z = a.onSeries;
            t = z && k.get(z);
            var a = a.onKey || "y", z = t && t.options.step, m = t && t.points, g = m && m.length, f = this.xAxis, e = this.yAxis, c = f.getExtremes(), b = 0, r, l, C, I;
            if (t && t.visible && g)for (b = (t.pointXOffset || 0) + (t.barW ||
                0) / 2, t = t.currentDataGrouping, l = m[g - 1].x + (t ? t.totalRange : 0), H(q, function (a, b) {
                return a.x - b.x
            }), a = "plot" + a[0].toUpperCase() + a.substr(1); g-- && q[w] && !(r = m[g], t = q[w], t.y = r.y, r.x <= t.x && void 0 !== r[a] && (t.x <= l && (t.plotY = r[a], r.x < t.x && !z && (C = m[g + 1]) && void 0 !== C[a] && (I = (t.x - r.x) / (C.x - r.x), t.plotY += I * (C[a] - r[a]), t.y += I * (C.y - r.y))), w--, g++, 0 > w)););
            G(q, function (a, g) {
                var l;
                void 0 === a.plotY && (a.x >= c.min && a.x <= c.max ? a.plotY = k.chartHeight - f.bottom - (f.opposite ? f.height : 0) + f.offset - e.top : a.shapeArgs = {});
                a.plotX += b;
                (u = q[g - 1]) && u.plotX === a.plotX && (void 0 === u.stackIndex && (u.stackIndex = 0), l = u.stackIndex + 1);
                a.stackIndex = l
            })
        }}
    }(L);
    (function (a, G) {
        function E(a) {
            m[a + "pin"] = function (f, e, c, b, g) {
                var l = g && g.anchorX;
                g = g && g.anchorY;
                "circle" === a && b > c && (f -= Math.round((b - c) / 2), c = b);
                f = m[a](f, e, c, b);
                l && g && (f.push("M", "circle" === a ? f[1] - f[4] : f[1] + f[4] / 2, e > g ? e : e + b, "L", l, g), f = f.concat(m.circle(l - 1, g - 1, 2, 2)));
                return f
            }
        }

        var H = a.addEvent, v = a.each, k = a.merge, q = a.noop, w = a.Renderer, t = a.seriesType, u = a.TrackerMixin, z = a.VMLRenderer, m = a.SVGRenderer.prototype.symbols;
        t("flags", "column", {pointRange: 0, allowOverlapX: !1, shape: "flag", stackDistance: 12, textAlign: "center", tooltip: {pointFormat: "{point.text}\x3cbr/\x3e"}, threshold: null, y: -30, fillColor: "#ffffff", lineWidth: 1, states: {hover: {lineColor: "#000000", fillColor: "#ccd6eb"}}, style: {fontSize: "11px", fontWeight: "bold"}}, {sorted: !1, noSharedTooltip: !0, allowDG: !1, takeOrdinalPosition: !1, trackerGroups: ["markerGroup"], forceCrop: !0, init: a.Series.prototype.init, pointAttribs: function (a, f) {
            var e = this.options, c = a && a.color || this.color,
                b = e.lineColor, g = a && a.lineWidth;
            a = a && a.fillColor || e.fillColor;
            f && (a = e.states[f].fillColor, b = e.states[f].lineColor, g = e.states[f].lineWidth);
            return{fill: a || c, stroke: b || c, "stroke-width": g || e.lineWidth || 0}
        }, translate: G.translate, drawPoints: function () {
            var g = this.points, f = this.chart, e = f.renderer, c, b, m = this.options, l = m.y, q, t, u, w, n, B, z = this.yAxis, A = {}, d = [];
            for (t = g.length; t--;)u = g[t], B = u.plotX > this.xAxis.len, c = u.plotX, w = u.stackIndex, q = u.options.shape || m.shape, b = u.plotY, void 0 !== b && (b = u.plotY + l - (void 0 !== w &&
                w * m.stackDistance)), u.anchorX = w ? void 0 : u.plotX, n = w ? void 0 : u.plotY, w = u.graphic, void 0 !== b && 0 <= c && !B ? (w || (w = u.graphic = e.label("", null, null, q, null, null, m.useHTML).attr(this.pointAttribs(u)).css(k(m.style, u.style)).attr({align: "flag" === q ? "left" : "center", width: m.width, height: m.height, "text-align": m.textAlign}).addClass("highcharts-point").add(this.markerGroup), u.graphic.div && (u.graphic.div.point = u), w.shadow(m.shadow), w.isNew = !0), 0 < c && (c -= w.strokeWidth() % 2), q = {y: b, anchorY: n}, m.allowOverlapX && (q.x = c, q.anchorX =
                u.anchorX), w.attr({text: u.options.title || m.title || "A"})[w.isNew ? "attr" : "animate"](q), m.allowOverlapX || (A[u.plotX] ? A[u.plotX].size = Math.max(A[u.plotX].size, w.width) : A[u.plotX] = {align: 0, size: w.width, target: c, anchorX: c}), u.tooltipPos = f.inverted ? [z.len + z.pos - f.plotLeft - b, this.xAxis.len - c] : [c, b + z.pos - f.plotTop]) : w && (u.graphic = w.destroy());
            m.allowOverlapX || (a.objectEach(A, function (a) {
                a.plotX = a.anchorX;
                d.push(a)
            }), a.distribute(d, this.xAxis.len), v(g, function (a) {
                var b = a.graphic && A[a.plotX];
                b && (a.graphic[a.graphic.isNew ?
                    "attr" : "animate"]({x: b.pos, anchorX: a.anchorX}), a.graphic.isNew = !1)
            }));
            m.useHTML && a.wrap(this.markerGroup, "on", function (b) {
                return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
            })
        }, drawTracker: function () {
            var a = this.points;
            u.drawTrackerPoint.apply(this);
            v(a, function (f) {
                var e = f.graphic;
                e && H(e.element, "mouseover", function () {
                    0 < f.stackIndex && !f.raised && (f._y = e.y, e.attr({y: f._y - 8}), f.raised = !0);
                    v(a, function (a) {
                        a !== f && a.raised && a.graphic && (a.graphic.attr({y: a._y}),
                            a.raised = !1)
                    })
                })
            })
        }, animate: q, buildKDTree: q, setClip: q});
        m.flag = function (a, f, e, c, b) {
            var g = b && b.anchorX || a;
            b = b && b.anchorY || f;
            return m.circle(g - 1, b - 1, 2, 2).concat(["M", g, b, "L", a, f + c, a, f, a + e, f, a + e, f + c, a, f + c, "Z"])
        };
        E("circle");
        E("square");
        w === z && v(["flag", "circlepin", "squarepin"], function (a) {
            z.prototype.symbols[a] = m[a]
        })
    })(L, Z);
    (function (a) {
        function G(a, b, c) {
            this.init(a, b, c)
        }

        var E = a.addEvent, H = a.Axis, v = a.correctFloat, k = a.defaultOptions, q = a.defined, w = a.destroyObjectProperties, t = a.each, u = a.fireEvent, z = a.hasTouch,
            m = a.isTouchDevice, g = a.merge, f = a.pick, e = a.removeEvent, c = a.wrap, b, r = {height: m ? 20 : 14, barBorderRadius: 0, buttonBorderRadius: 0, liveRedraw: a.svg && !m, margin: 10, minWidth: 6, step: .2, zIndex: 3, barBackgroundColor: "#cccccc", barBorderWidth: 1, barBorderColor: "#cccccc", buttonArrowColor: "#333333", buttonBackgroundColor: "#e6e6e6", buttonBorderColor: "#cccccc", buttonBorderWidth: 1, rifleColor: "#333333", trackBackgroundColor: "#f2f2f2", trackBorderColor: "#f2f2f2", trackBorderWidth: 1};
        k.scrollbar = g(!0, r, k.scrollbar);
        a.swapXY = b = function (a, b) {
            var c = a.length, e;
            if (b)for (b = 0; b < c; b += 3)e = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = e;
            return a
        };
        G.prototype = {init: function (a, b, c) {
            this.scrollbarButtons = [];
            this.renderer = a;
            this.userOptions = b;
            this.options = g(r, b);
            this.chart = c;
            this.size = f(this.options.size, this.options.height);
            b.enabled && (this.render(), this.initEvents(), this.addEvents())
        }, render: function () {
            var a = this.renderer, c = this.options, e = this.size, f;
            this.group = f = a.g("scrollbar").attr({zIndex: c.zIndex, translateY: -99999}).add();
            this.track = a.rect().addClass("highcharts-scrollbar-track").attr({x: 0,
                r: c.trackBorderRadius || 0, height: e, width: e}).add(f);
            this.track.attr({fill: c.trackBackgroundColor, stroke: c.trackBorderColor, "stroke-width": c.trackBorderWidth});
            this.trackBorderWidth = this.track.strokeWidth();
            this.track.attr({y: -this.trackBorderWidth % 2 / 2});
            this.scrollbarGroup = a.g().add(f);
            this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({height: e, width: e, r: c.barBorderRadius || 0}).add(this.scrollbarGroup);
            this.scrollbarRifles = a.path(b(["M", -3, e / 4, "L", -3, 2 * e / 3, "M", 0, e / 4, "L", 0, 2 * e / 3, "M",
                3, e / 4, "L", 3, 2 * e / 3], c.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
            this.scrollbar.attr({fill: c.barBackgroundColor, stroke: c.barBorderColor, "stroke-width": c.barBorderWidth});
            this.scrollbarRifles.attr({stroke: c.rifleColor, "stroke-width": 1});
            this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
            this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
            this.drawScrollbarButton(0);
            this.drawScrollbarButton(1)
        }, position: function (a, b, c, e) {
            var f =
                this.options.vertical, g = 0, l = this.rendered ? "animate" : "attr";
            this.x = a;
            this.y = b + this.trackBorderWidth;
            this.width = c;
            this.xOffset = this.height = e;
            this.yOffset = g;
            f ? (this.width = this.yOffset = c = g = this.size, this.xOffset = b = 0, this.barWidth = e - 2 * c, this.x = a += this.options.margin) : (this.height = this.xOffset = e = b = this.size, this.barWidth = c - 2 * e, this.y += this.options.margin);
            this.group[l]({translateX: a, translateY: this.y});
            this.track[l]({width: c, height: e});
            this.scrollbarButtons[1][l]({translateX: f ? 0 : c - b, translateY: f ? e - g : 0})
        },
            drawScrollbarButton: function (a) {
                var c = this.renderer, e = this.scrollbarButtons, f = this.options, g = this.size, l;
                l = c.g().add(this.group);
                e.push(l);
                l = c.rect().addClass("highcharts-scrollbar-button").add(l);
                l.attr({stroke: f.buttonBorderColor, "stroke-width": f.buttonBorderWidth, fill: f.buttonBackgroundColor});
                l.attr(l.crisp({x: -.5, y: -.5, width: g + 1, height: g + 1, r: f.buttonBorderRadius}, l.strokeWidth()));
                l = c.path(b(["M", g / 2 + (a ? -1 : 1), g / 2 - 3, "L", g / 2 + (a ? -1 : 1), g / 2 + 3, "L", g / 2 + (a ? 2 : -2), g / 2], f.vertical)).addClass("highcharts-scrollbar-arrow").add(e[a]);
                l.attr({fill: f.buttonArrowColor})
            }, setRange: function (a, b) {
                var c = this.options, e = c.vertical, f = c.minWidth, g = this.barWidth, l, k, m = this.rendered && !this.hasDragged ? "animate" : "attr";
                q(g) && (a = Math.max(a, 0), l = Math.ceil(g * a), this.calculatedWidth = k = v(g * Math.min(b, 1) - l), k < f && (l = (g - f + k) * a, k = f), f = Math.floor(l + this.xOffset + this.yOffset), g = k / 2 - .5, this.from = a, this.to = b, e ? (this.scrollbarGroup[m]({translateY: f}), this.scrollbar[m]({height: k}), this.scrollbarRifles[m]({translateY: g}), this.scrollbarTop = f, this.scrollbarLeft =
                    0) : (this.scrollbarGroup[m]({translateX: f}), this.scrollbar[m]({width: k}), this.scrollbarRifles[m]({translateX: g}), this.scrollbarLeft = f, this.scrollbarTop = 0), 12 >= k ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
            }, initEvents: function () {
                var a = this;
                a.mouseMoveHandler = function (b) {
                    var c = a.chart.pointer.normalize(b), e = a.options.vertical ? "chartY" : "chartX", f = a.initPositions;
                    !a.grabbedCenter || b.touches && 0 === b.touches[0][e] ||
                    (c = a.cursorToScrollbarPosition(c)[e], e = a[e], e = c - e, a.hasDragged = !0, a.updatePosition(f[0] + e, f[1] + e), a.hasDragged && u(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMType: b.type, DOMEvent: b}))
                };
                a.mouseUpHandler = function (b) {
                    a.hasDragged && u(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMType: b.type, DOMEvent: b});
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function (b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function (b) {
                    var c = v(a.to - a.from) * a.options.step;
                    a.updatePosition(v(a.from - c), v(a.to - c));
                    u(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                };
                a.buttonToMaxClick = function (b) {
                    var c = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + c, a.to + c);
                    u(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                };
                a.trackClick = function (b) {
                    var c = a.chart.pointer.normalize(b), e = a.to - a.from, f = a.y + a.scrollbarTop, g = a.x + a.scrollbarLeft;
                    a.options.vertical && c.chartY > f || !a.options.vertical && c.chartX > g ? a.updatePosition(a.from + e, a.to + e) : a.updatePosition(a.from - e, a.to - e);
                    u(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                }
            }, cursorToScrollbarPosition: function (a) {
                var b = this.options, b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return{chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b), chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)}
            }, updatePosition: function (a, b) {
                1 < b && (a = v(1 - v(b - a)), b = 1);
                0 > a && (b = v(b - a), a = 0);
                this.from = a;
                this.to = b
            }, update: function (a) {
                this.destroy();
                this.init(this.chart.renderer, g(!0, this.options, a), this.chart)
            }, addEvents: function () {
                var a = this.options.inverted ? [1, 0] : [0, 1], b = this.scrollbarButtons, c = this.scrollbarGroup.element, e = this.mouseDownHandler, f = this.mouseMoveHandler, g = this.mouseUpHandler, a = [
                    [b[a[0]].element, "click", this.buttonToMinClick],
                    [b[a[1]].element, "click", this.buttonToMaxClick],
                    [this.track.element, "click", this.trackClick],
                    [c, "mousedown", e],
                    [c.ownerDocument, "mousemove", f],
                    [c.ownerDocument,
                        "mouseup", g]
                ];
                z && a.push([c, "touchstart", e], [c.ownerDocument, "touchmove", f], [c.ownerDocument, "touchend", g]);
                t(a, function (a) {
                    E.apply(null, a)
                });
                this._events = a
            }, removeEvents: function () {
                t(this._events, function (a) {
                    e.apply(null, a)
                });
                this._events.length = 0
            }, destroy: function () {
                var a = this.chart.scroller;
                this.removeEvents();
                t(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function (a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, w(a.scrollbarButtons))
            }};
        c(H.prototype, "init", function (a) {
            var b = this;
            a.apply(b, Array.prototype.slice.call(arguments, 1));
            b.options.scrollbar && b.options.scrollbar.enabled && (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new G(b.chart.renderer, b.options.scrollbar, b.chart), E(b.scrollbar, "changed", function (a) {
                var c = Math.min(f(b.options.min, b.min), b.min, b.dataMin), e = Math.max(f(b.options.max, b.max), b.max, b.dataMax) - c, g;
                b.horiz && !b.reversed || !b.horiz && b.reversed ? (g = c + e * this.to, c += e *
                    this.from) : (g = c + e * (1 - this.from), c += e * (1 - this.to));
                b.setExtremes(c, g, !0, !1, a)
            }))
        });
        c(H.prototype, "render", function (a) {
            var b = Math.min(f(this.options.min, this.min), this.min, f(this.dataMin, this.min)), c = Math.max(f(this.options.max, this.max), this.max, f(this.dataMax, this.max)), e = this.scrollbar, g = this.titleOffset || 0;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (e) {
                this.horiz ? (e.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : g + this.axisTitleMargin + this.offset),
                    this.width, this.height), g = 1) : (e.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? g + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height), g = 0);
                if (!this.opposite && !this.horiz || this.opposite && this.horiz)this.chart.scrollbarsOffsets[g] += this.scrollbar.size + this.scrollbar.options.margin;
                isNaN(b) || isNaN(c) || !q(this.min) || !q(this.max) ? e.setRange(0, 0) : (g = (this.min - b) / (c - b), b = (this.max - b) / (c - b), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(g,
                    b) : e.setRange(1 - b, 1 - g))
            }
        });
        c(H.prototype, "getOffset", function (a) {
            var b = this.horiz ? 2 : 1, c = this.scrollbar;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            c && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[b] += c.size + c.options.margin)
        });
        c(H.prototype, "destroy", function (a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        a.Scrollbar = G
    })(L);
    (function (a) {
        function G(a) {
            this.init(a)
        }

        var E = a.addEvent, H = a.Axis, v = a.Chart, k = a.color,
            q = a.defaultOptions, w = a.defined, t = a.destroyObjectProperties, u = a.each, z = a.erase, m = a.error, g = a.extend, f = a.grep, e = a.hasTouch, c = a.isArray, b = a.isNumber, r = a.isObject, l = a.merge, C = a.pick, I = a.removeEvent, x = a.Scrollbar, F = a.Series, n = a.seriesTypes, B = a.wrap, J = [].concat(a.defaultDataGroupingUnits), A = function (a) {
                var d = f(arguments, b);
                if (d.length)return Math[a].apply(0, d)
            };
        J[4] = ["day", [1, 2, 3, 4]];
        J[5] = ["week", [1, 2, 3]];
        n = void 0 === n.areaspline ? "line" : "areaspline";
        g(q, {navigator: {height: 40, margin: 25, maskInside: !0, handles: {width: 7,
            height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: !0, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999"}, maskFill: k("#6685c2").setOpacity(.3).get(), outlineColor: "#cccccc", outlineWidth: 1, series: {type: n, fillOpacity: .05, lineWidth: 1, compare: null, dataGrouping: {approximation: "average", enabled: !0, groupPixelWidth: 2, smoothed: !0, units: J}, dataLabels: {enabled: !1, zIndex: 2}, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: {enabled: !1}, pointRange: 0,
            threshold: null}, xAxis: {overscroll: 0, className: "highcharts-navigator-xaxis", tickLength: 0, lineWidth: 0, gridLineColor: "#e6e6e6", gridLineWidth: 1, tickPixelInterval: 200, labels: {align: "left", style: {color: "#999999"}, x: 3, y: -4}, crosshair: !1}, yAxis: {className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: !1, endOnTick: !1, minPadding: .1, maxPadding: .1, labels: {enabled: !1}, crosshair: !1, title: {text: null}, tickLength: 0, tickWidth: 0}}});
        a.Renderer.prototype.symbols["navigator-handle"] = function (a, b, c, e, f) {
            a = f.width /
                2;
            b = Math.round(a / 3) + .5;
            f = f.height;
            return["M", -a - 1, .5, "L", a, .5, "L", a, f + .5, "L", -a - 1, f + .5, "L", -a - 1, .5, "M", -b, 4, "L", -b, f - 3, "M", b - 1, 4, "L", b - 1, f - 3]
        };
        G.prototype = {drawHandle: function (a, b, c, e) {
            var d = this.navigatorOptions.handles.height;
            this.handles[b][e](c ? {translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(a, 10) + .5 - d)} : {translateX: Math.round(this.left + parseInt(a, 10)), translateY: Math.round(this.top + this.height / 2 - d / 2 - 1)})
        }, drawOutline: function (a, b, c, e) {
            var d = this.navigatorOptions.maskInside,
                h = this.outline.strokeWidth(), f = h / 2, h = h % 2 / 2, g = this.outlineHeight, p = this.scrollbarHeight, k = this.size, n = this.left - p, l = this.top;
            c ? (n -= f, c = l + b + h, b = l + a + h, a = ["M", n + g, l - p - h, "L", n + g, c, "L", n, c, "L", n, b, "L", n + g, b, "L", n + g, l + k + p].concat(d ? ["M", n + g, c - f, "L", n + g, b + f] : [])) : (a += n + p - h, b += n + p - h, l += f, a = ["M", n, l, "L", a, l, "L", a, l + g, "L", b, l + g, "L", b, l, "L", n + k + 2 * p, l].concat(d ? ["M", a - f, l, "L", b + f, l] : []));
            this.outline[e]({d: a})
        }, drawMasks: function (a, b, c, e) {
            var d = this.left, h = this.top, f = this.height, g, p, n, k;
            c ? (n = [d, d, d], k = [h, h + a,
                h + b], p = [f, f, f], g = [a, b - a, this.size - b]) : (n = [d, d + a, d + b], k = [h, h, h], p = [a, b - a, this.size - b], g = [f, f, f]);
            u(this.shades, function (a, b) {
                a[e]({x: n[b], y: k[b], width: p[b], height: g[b]})
            })
        }, renderElements: function () {
            var a = this, b = a.navigatorOptions, c = b.maskInside, e = a.chart, f = e.inverted, g = e.renderer, n;
            a.navigatorGroup = n = g.g("navigator").attr({zIndex: 8, visibility: "hidden"}).add();
            var k = {cursor: f ? "ns-resize" : "ew-resize"};
            u([!c, c, !c], function (d, c) {
                a.shades[c] = g.rect().addClass("highcharts-navigator-mask" + (1 === c ? "-inside" :
                    "-outside")).attr({fill: d ? b.maskFill : "rgba(0,0,0,0)"}).css(1 === c && k).add(n)
            });
            a.outline = g.path().addClass("highcharts-navigator-outline").attr({"stroke-width": b.outlineWidth, stroke: b.outlineColor}).add(n);
            b.handles.enabled && u([0, 1], function (d) {
                b.handles.inverted = e.inverted;
                a.handles[d] = g.symbol(b.handles.symbols[d], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                a.handles[d].attr({zIndex: 7 - d}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][d]).add(n);
                var c = b.handles;
                a.handles[d].attr({fill: c.backgroundColor, stroke: c.borderColor, "stroke-width": c.lineWidth}).css(k)
            })
        }, update: function (a) {
            u(this.series || [], function (a) {
                a.baseSeries && delete a.baseSeries.navigatorSeries
            });
            this.destroy();
            l(!0, this.chart.options.navigator, this.options, a);
            this.init(this.chart)
        }, render: function (d, c, e, h) {
            var f = this.chart, g, p, n = this.scrollbarHeight, k, l = this.xAxis;
            g = l.fake ? f.xAxis[0] : l;
            var m = this.navigatorEnabled, q, r = this.rendered;
            p = f.inverted;
            var t, u = f.xAxis[0].minRange, v =
                f.xAxis[0].options.maxRange;
            if (!this.hasDragged || w(e)) {
                if (!b(d) || !b(c))if (r)e = 0, h = C(l.width, g.width); else return;
                this.left = C(l.left, f.plotLeft + n + (p ? f.plotWidth : 0));
                this.size = q = k = C(l.len, (p ? f.plotHeight : f.plotWidth) - 2 * n);
                f = p ? n : k + 2 * n;
                e = C(e, l.toPixels(d, !0));
                h = C(h, l.toPixels(c, !0));
                b(e) && Infinity !== Math.abs(e) || (e = 0, h = f);
                d = l.toValue(e, !0);
                c = l.toValue(h, !0);
                t = Math.abs(a.correctFloat(c - d));
                t < u ? this.grabbedLeft ? e = l.toPixels(c - u, !0) : this.grabbedRight && (h = l.toPixels(d + u, !0)) : w(v) && t > v && (this.grabbedLeft ?
                    e = l.toPixels(c - v, !0) : this.grabbedRight && (h = l.toPixels(d + v, !0)));
                this.zoomedMax = Math.min(Math.max(e, h, 0), q);
                this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(e, h), 0), q);
                this.range = this.zoomedMax - this.zoomedMin;
                q = Math.round(this.zoomedMax);
                e = Math.round(this.zoomedMin);
                m && (this.navigatorGroup.attr({visibility: "visible"}), r = r && !this.hasDragged ? "animate" : "attr", this.drawMasks(e, q, p, r), this.drawOutline(e, q, p, r), this.navigatorOptions.handles.enabled && (this.drawHandle(e,
                    0, p, r), this.drawHandle(q, 1, p, r)));
                this.scrollbar && (p ? (p = this.top - n, g = this.left - n + (m || !g.opposite ? 0 : (g.titleOffset || 0) + g.axisTitleMargin), n = k + 2 * n) : (p = this.top + (m ? this.height : -n), g = this.left - n), this.scrollbar.position(g, p, f, n), this.scrollbar.setRange(this.zoomedMin / k, this.zoomedMax / k));
                this.rendered = !0
            }
        }, addMouseEvents: function () {
            var a = this, b = a.chart, c = b.container, h = [], f, g;
            a.mouseMoveHandler = f = function (b) {
                a.onMouseMove(b)
            };
            a.mouseUpHandler = g = function (b) {
                a.onMouseUp(b)
            };
            h = a.getPartsEvents("mousedown");
            h.push(E(c, "mousemove", f), E(c.ownerDocument, "mouseup", g));
            e && (h.push(E(c, "touchmove", f), E(c.ownerDocument, "touchend", g)), h.concat(a.getPartsEvents("touchstart")));
            a.eventsToUnbind = h;
            a.series && a.series[0] && h.push(E(a.series[0].xAxis, "foundExtremes", function () {
                b.navigator.modifyNavigatorAxisExtremes()
            }))
        }, getPartsEvents: function (a) {
            var b = this, d = [];
            u(["shades", "handles"], function (c) {
                u(b[c], function (e, h) {
                    d.push(E(e.element, a, function (a) {
                        b[c + "Mousedown"](a, h)
                    }))
                })
            });
            return d
        }, shadesMousedown: function (a, b) {
            a = this.chart.pointer.normalize(a);
            var d = this.chart, c = this.xAxis, e = this.zoomedMin, f = this.left, g = this.size, p = this.range, n = a.chartX, k;
            d.inverted && (n = a.chartY, f = this.top);
            1 === b ? (this.grabbedCenter = n, this.fixedWidth = p, this.dragOffset = n - e) : (a = n - f - p / 2, 0 === b ? a = Math.max(0, a) : 2 === b && a + p >= g && (a = g - p, k = this.getUnionExtremes().dataMax), a !== e && (this.fixedWidth = p, b = c.toFixedRange(a, a + p, null, k), w(b.min) && d.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {trigger: "navigator"})))
        }, handlesMousedown: function (a, b) {
            this.chart.pointer.normalize(a);
            a = this.chart;
            var d = a.xAxis[0], c = a.inverted && !d.reversed || !a.inverted && d.reversed;
            0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = c ? d.min : d.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = c ? d.max : d.min);
            a.fixedRange = null
        }, onMouseMove: function (a) {
            var b = this, d = b.chart, c = b.left, e = b.navigatorSize, f = b.range, g = b.dragOffset, n = d.inverted;
            a.touches && 0 === a.touches[0].pageX || (a = d.pointer.normalize(a), d = a.chartX,
                n && (c = b.top, d = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, d - c, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos, d - c)) : b.grabbedCenter && (b.hasDragged = !0, d < g ? d = g : d > e + g - f && (d = e + g - f), b.render(0, 0, d - g, d - g + f)), b.hasDragged && b.scrollbar && b.scrollbar.options.liveRedraw && (a.DOMType = a.type, setTimeout(function () {
                b.onMouseUp(a)
            }, 0)))
        }, onMouseUp: function (a) {
            var b = this.chart, d = this.xAxis, c = this.scrollbar, e, f, g = a.DOMEvent || a;
            (!this.hasDragged || c && c.hasDragged) && "scrollbar" !==
                a.trigger || (this.zoomedMin === this.otherHandlePos ? e = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (f = this.fixedExtreme), this.zoomedMax === this.size && (f = this.getUnionExtremes().dataMax), d = d.toFixedRange(this.zoomedMin, this.zoomedMax, e, f), w(d.min) && b.xAxis[0].setExtremes(Math.min(d.min, d.max), Math.max(d.min, d.max), !0, this.hasDragged ? !1 : null, {trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: g}));
            "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth =
                this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
        }, removeEvents: function () {
            this.eventsToUnbind && (u(this.eventsToUnbind, function (a) {
                a()
            }), this.eventsToUnbind = void 0);
            this.removeBaseSeriesEvents()
        }, removeBaseSeriesEvents: function () {
            var a = this.baseSeries || [];
            this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && u(a, function (a) {
                I(a, "updatedData", this.updatedDataHandler)
            }, this), a[0].xAxis && I(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
        }, init: function (a) {
            var b =
                a.options, d = b.navigator, c = d.enabled, e = b.scrollbar, f = e.enabled, b = c ? d.height : 0, g = f ? e.height : 0;
            this.handles = [];
            this.shades = [];
            this.chart = a;
            this.setBaseSeries();
            this.height = b;
            this.scrollbarHeight = g;
            this.scrollbarEnabled = f;
            this.navigatorEnabled = c;
            this.navigatorOptions = d;
            this.scrollbarOptions = e;
            this.outlineHeight = b + g;
            this.opposite = C(d.opposite, !c && a.inverted);
            var n = this, e = n.baseSeries, f = a.xAxis.length, k = a.yAxis.length, m = e && e[0] && e[0].xAxis || a.xAxis[0];
            a.extraMargin = {type: n.opposite ? "plotTop" : "marginBottom",
                value: (c || !a.inverted ? n.outlineHeight : 0) + d.margin};
            a.inverted && (a.extraMargin.type = n.opposite ? "marginRight" : "plotLeft");
            a.isDirtyBox = !0;
            n.navigatorEnabled ? (n.xAxis = new H(a, l({breaks: m.options.breaks, ordinal: m.options.ordinal}, d.xAxis, {id: "navigator-x-axis", yAxis: "navigator-y-axis", isX: !0, type: "datetime", index: f, offset: 0, keepOrdinalPadding: !0, startOnTick: !1, endOnTick: !1, minPadding: 0, maxPadding: 0, zoomEnabled: !1}, a.inverted ? {offsets: [g, 0, -g, 0], width: b} : {offsets: [0, -g, 0, g], height: b})), n.yAxis = new H(a,
                l(d.yAxis, {id: "navigator-y-axis", alignTicks: !1, offset: 0, index: k, zoomEnabled: !1}, a.inverted ? {width: b} : {height: b})), e || d.series.data ? n.updateNavigatorSeries() : 0 === a.series.length && B(a, "redraw", function (b, d) {
                0 < a.series.length && !n.series && (n.setBaseSeries(), a.redraw = b);
                b.call(a, d)
            }), n.renderElements(), n.addMouseEvents()) : n.xAxis = {translate: function (b, d) {
                var c = a.xAxis[0], e = c.getExtremes(), f = c.len - 2 * g, h = A("min", c.options.min, e.dataMin), c = A("max", c.options.max, e.dataMax) - h;
                return d ? b * c / f + h : f * (b - h) / c
            }, toPixels: function (a) {
                return this.translate(a)
            },
                toValue: function (a) {
                    return this.translate(a, !0)
                }, toFixedRange: H.prototype.toFixedRange, fake: !0};
            a.options.scrollbar.enabled && (a.scrollbar = n.scrollbar = new x(a.renderer, l(a.options.scrollbar, {margin: n.navigatorEnabled ? 0 : 10, vertical: a.inverted}), a), E(n.scrollbar, "changed", function (b) {
                var d = n.size, c = d * this.to, d = d * this.from;
                n.hasDragged = n.scrollbar.hasDragged;
                n.render(0, 0, d, c);
                (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function () {
                    n.onMouseUp(b)
                })
            }));
            n.addBaseSeriesEvents();
            n.addChartEvents()
        },
            getUnionExtremes: function (a) {
                var b = this.chart.xAxis[0], d = this.xAxis, c = d.options, e = b.options, f;
                a && null === b.dataMin || (f = {dataMin: C(c && c.min, A("min", e.min, b.dataMin, d.dataMin, d.min)), dataMax: C(c && c.max, A("max", e.max, b.dataMax, d.dataMax, d.max))});
                return f
            }, setBaseSeries: function (a, b) {
                var d = this.chart, c = this.baseSeries = [];
                a = a || d.options && d.options.navigator.baseSeries || 0;
                u(d.series || [], function (b, d) {
                    b.options.isInternal || !b.options.showInNavigator && (d !== a && b.options.id !== a || !1 === b.options.showInNavigator) ||
                    c.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(b)
            }, updateNavigatorSeries: function (b) {
                var d = this, e = d.chart, f = d.baseSeries, n, k, m = d.navigatorOptions.series, r, t = {enableMouseTracking: !1, index: null, linkedTo: null, group: "nav", padXAxis: !1, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", showInLegend: !1, stacking: !1, isInternal: !0, visible: !0}, v = d.series = a.grep(d.series || [], function (b) {
                    var c = b.baseSeries;
                    return 0 > a.inArray(c, f) ? (c && (I(c, "updatedData", d.updatedDataHandler), delete c.navigatorSeries),
                        b.destroy(), !1) : !0
                });
                f && f.length && u(f, function (a) {
                    var h = a.navigatorSeries, p = g({color: a.color}, c(m) ? q.navigator.series : m);
                    h && !1 === d.navigatorOptions.adaptToUpdatedData || (t.name = "Navigator " + f.length, n = a.options || {}, r = n.navigatorOptions || {}, k = l(n, t, p, r), p = r.data || p.data, d.hasNavigatorData = d.hasNavigatorData || !!p, k.data = p || n.data && n.data.slice(0), h && h.options ? h.update(k, b) : (a.navigatorSeries = e.initSeries(k), a.navigatorSeries.baseSeries = a, v.push(a.navigatorSeries)))
                });
                if (m.data && (!f || !f.length) || c(m))d.hasNavigatorData = !1, m = a.splat(m), u(m, function (a, b) {
                    t.name = "Navigator " + (v.length + 1);
                    k = l(q.navigator.series, {color: e.series[b] && !e.series[b].options.isInternal && e.series[b].color || e.options.colors[b] || e.options.colors[0]}, t, a);
                    k.data = a.data;
                    k.data && (d.hasNavigatorData = !0, v.push(e.initSeries(k)))
                });
                this.addBaseSeriesEvents()
            }, addBaseSeriesEvents: function () {
                var a = this, b = a.baseSeries || [];
                b[0] && b[0].xAxis && E(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                u(b, function (b) {
                    E(b, "show", function () {
                        this.navigatorSeries &&
                        this.navigatorSeries.setVisible(!0, !1)
                    });
                    E(b, "hide", function () {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    });
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && E(b, "updatedData", this.updatedDataHandler);
                    E(b, "remove", function () {
                        this.navigatorSeries && (z(a.series, this.navigatorSeries), this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            }, modifyNavigatorAxisExtremes: function () {
                var a = this.xAxis, b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min &&
                    b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            }, modifyBaseAxisExtremes: function () {
                var a = this.chart.navigator, c = this.getExtremes(), e = c.dataMin, f = c.dataMax, c = c.max - c.min, g = a.stickToMin, n = a.stickToMax, k = this.options.overscroll, l, m, q = a.series && a.series[0], r = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (g && (m = e, l = m + c), n && (l = f + k, g || (m = Math.max(l - c, q && q.xData ? q.xData[0] : -Number.MAX_VALUE))), r && (g || n) && b(m) && (this.min = this.userMin = m, this.max = this.userMax = l));
                a.stickToMin =
                    a.stickToMax = null
            }, updatedDataHandler: function () {
                var a = this.chart.navigator, c = this.navigatorSeries;
                a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = b(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !a.stickToMax);
                c && !a.hasNavigatorData && (c.options.pointStart = this.xData[0], c.setData(this.options.data, !1, null, !1))
            }, addChartEvents: function () {
                E(this.chart, "redraw", function () {
                    var a = this.navigator, b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis ||
                        a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min, b.max)
                })
            }, destroy: function () {
                this.removeEvents();
                this.xAxis && (z(this.chart.xAxis, this.xAxis), z(this.chart.axes, this.xAxis));
                this.yAxis && (z(this.chart.yAxis, this.yAxis), z(this.chart.axes, this.yAxis));
                u(this.series || [], function (a) {
                    a.destroy && a.destroy()
                });
                u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function (a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                u([this.handles], function (a) {
                    t(a)
                }, this)
            }};
        a.Navigator = G;
        B(H.prototype, "zoom", function (a, b, c) {
            var d = this.chart, e = d.options, f = e.chart.zoomType, g = e.navigator, e = e.rangeSelector, n;
            this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? n = !1 : "xy" === f && this.options.range && (d = this.previousZoom, w(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !== n ? n : a.call(this, b, c)
        });
        B(v.prototype, "init", function (a, b, c) {
            E(this, "beforeRender",
                function () {
                    var a = this.options;
                    if (a.navigator.enabled || a.scrollbar.enabled)this.scroller = this.navigator = new G(this)
                });
            a.call(this, b, c)
        });
        B(v.prototype, "setChartSize", function (a) {
            var b = this.legend, c = this.navigator, d, e, f, g;
            a.apply(this, [].slice.call(arguments, 1));
            c && (e = b && b.options, f = c.xAxis, g = c.yAxis, d = c.scrollbarHeight, this.inverted ? (c.left = c.opposite ? this.chartWidth - d - c.height : this.spacing[3] + d, c.top = this.plotTop + d) : (c.left = this.plotLeft + d, c.top = c.navigatorOptions.top || this.chartHeight - c.height - d -
                this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ? b.legendHeight + C(e.margin, 10) : 0)), f && g && (this.inverted ? f.options.left = g.options.left = c.left : f.options.top = g.options.top = c.top, f.setAxisSize(), g.setAxisSize()))
        });
        B(F.prototype, "addPoint", function (a, b, c, e, f) {
            var d = this.options.turboThreshold;
            d && this.xData.length > d && r(b, !0) && this.chart.navigator && m(20, !0);
            a.call(this, b, c, e, f)
        });
        B(v.prototype, "addSeries",
            function (a, b, c, e) {
                a = a.call(this, b, !1, e);
                this.navigator && this.navigator.setBaseSeries(null, !1);
                C(c, !0) && this.redraw();
                return a
            });
        B(F.prototype, "update", function (a, b, c) {
            a.call(this, b, !1);
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
            C(c, !0) && this.chart.redraw()
        });
        v.prototype.callbacks.push(function (a) {
            var b = a.navigator;
            b && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        })
    })(L);
    (function (a) {
        function G(a) {
            this.init(a)
        }

        var E = a.addEvent, H = a.Axis, v = a.Chart,
            k = a.css, q = a.createElement, w = a.dateFormat, t = a.defaultOptions, u = t.global.useUTC, z = a.defined, m = a.destroyObjectProperties, g = a.discardElement, f = a.each, e = a.extend, c = a.fireEvent, b = a.Date, r = a.isNumber, l = a.merge, C = a.pick, I = a.pInt, x = a.splat, F = a.wrap;
        e(t, {rangeSelector: {verticalAlign: "top", buttonTheme: {"stroke-width": 0, width: 28, height: 18, padding: 2, zIndex: 7}, floating: !1, x: 0, y: 0, height: void 0, inputPosition: {align: "right", x: 0, y: 0}, buttonPosition: {align: "left", x: 0, y: 0}, labelStyle: {color: "#666666"}}});
        t.lang = l(t.lang,
            {rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To"});
        G.prototype = {clickButton: function (a, b) {
            var c = this, e = c.chart, d = c.buttonOptions[a], g = e.xAxis[0], n = e.scroller && e.scroller.getUnionExtremes() || g || {}, h = n.dataMin, k = n.dataMax, l, m = g && Math.round(Math.min(g.max, C(k, g.max))), q = d.type, t, n = d._range, v, w, B, z = d.dataGrouping;
            if (null !== h && null !== k) {
                e.fixedRange = n;
                z && (this.forcedDataGrouping = !0, H.prototype.setDataGrouping.call(g || {chart: this.chart}, z, !1));
                if ("month" === q || "year" === q)g ? (q = {range: d,
                    max: m, dataMin: h, dataMax: k}, l = g.minFromRange.call(q), r(q.newMax) && (m = q.newMax)) : n = d; else if (n)l = Math.max(m - n, h), m = Math.min(l + n, k); else if ("ytd" === q)if (g)void 0 === k && (h = Number.MAX_VALUE, k = Number.MIN_VALUE, f(e.series, function (a) {
                    a = a.xData;
                    h = Math.min(a[0], h);
                    k = Math.max(a[a.length - 1], k)
                }), b = !1), m = c.getYTDExtremes(k, h, u), l = v = m.min, m = m.max; else {
                    E(e, "beforeRender", function () {
                        c.clickButton(a)
                    });
                    return
                } else"all" === q && g && (l = h, m = k);
                l += d._offsetMin;
                m += d._offsetMax;
                c.setSelected(a);
                g ? g.setExtremes(l, m, C(b, 1), null,
                    {trigger: "rangeSelectorButton", rangeSelectorButton: d}) : (t = x(e.options.xAxis)[0], B = t.range, t.range = n, w = t.min, t.min = v, E(e, "load", function () {
                    t.range = B;
                    t.min = w
                }))
            }
        }, setSelected: function (a) {
            this.selected = this.options.selected = a
        }, defaultButtons: [
            {type: "month", count: 1, text: "1m"},
            {type: "month", count: 3, text: "3m"},
            {type: "month", count: 6, text: "6m"},
            {type: "ytd", text: "YTD"},
            {type: "year", count: 1, text: "1y"},
            {type: "all", text: "All"}
        ], init: function (a) {
            var b = this, e = a.options.rangeSelector, g = e.buttons || [].concat(b.defaultButtons),
                d = e.selected, n = function () {
                    var a = b.minInput, d = b.maxInput;
                    a && a.blur && c(a, "blur");
                    d && d.blur && c(d, "blur")
                };
            b.chart = a;
            b.options = e;
            b.buttons = [];
            a.extraTopMargin = e.height;
            b.buttonOptions = g;
            this.unMouseDown = E(a.container, "mousedown", n);
            this.unResize = E(a, "resize", n);
            f(g, b.computeButtonRange);
            void 0 !== d && g[d] && this.clickButton(d, !1);
            E(a, "load", function () {
                a.xAxis && a.xAxis[0] && E(a.xAxis[0], "setExtremes", function (c) {
                    this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger &&
                        b.forcedDataGrouping && this.setDataGrouping(!1, !1)
                })
            })
        }, updateButtonStates: function () {
            var a = this.chart, b = a.xAxis[0], c = Math.round(b.max - b.min), e = !b.hasVisibleSeries, a = a.scroller && a.scroller.getUnionExtremes() || b, d = a.dataMin, g = a.dataMax, a = this.getYTDExtremes(g, d, u), k = a.min, h = a.max, l = this.selected, m = r(l), q = this.options.allButtonsEnabled, t = this.buttons;
            f(this.buttonOptions, function (a, f) {
                var n = a._range, p = a.type, r = a.count || 1, u = t[f], v = 0;
                a = a._offsetMax - a._offsetMin;
                f = f === l;
                var y = n > g - d, A = n < b.minRange, w = !1,
                    x = !1, n = n === c;
                ("month" === p || "year" === p) && c + 36E5 >= 864E5 * {month: 28, year: 365}[p] * r + a && c - 36E5 <= 864E5 * {month: 31, year: 366}[p] * r + a ? n = !0 : "ytd" === p ? (n = h - k + a === c, w = !f) : "all" === p && (n = b.max - b.min >= g - d, x = !f && m && n);
                p = !q && (y || A || x || e);
                r = f && n || n && !m && !w;
                p ? v = 3 : r && (m = !0, v = 2);
                u.state !== v && u.setState(v)
            })
        }, computeButtonRange: function (a) {
            var b = a.type, c = a.count || 1, e = {millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5};
            if (e[b])a._range = e[b] * c; else if ("month" === b || "year" === b)a._range = 864E5 * {month: 30, year: 365}[b] *
                c;
            a._offsetMin = C(a.offsetMin, 0);
            a._offsetMax = C(a.offsetMax, 0);
            a._range += a._offsetMax - a._offsetMin
        }, setInputValue: function (a, b) {
            var c = this.chart.options.rangeSelector, e = this[a + "Input"];
            z(b) && (e.previousValue = e.HCTime, e.HCTime = b);
            e.value = w(c.inputEditDateFormat || "%Y-%m-%d", e.HCTime);
            this[a + "DateBox"].attr({text: w(c.inputDateFormat || "%b %e, %Y", e.HCTime)})
        }, showInput: function (a) {
            var b = this.inputGroup, c = this[a + "DateBox"];
            k(this[a + "Input"], {left: b.translateX + c.x + "px", top: b.translateY + "px", width: c.width -
                2 + "px", height: c.height - 2 + "px", border: "2px solid silver"})
        }, hideInput: function (a) {
            k(this[a + "Input"], {border: 0, width: "1px", height: "1px"});
            this.setInputValue(a)
        }, drawInput: function (a) {
            function b() {
                var a = v.value, b = (n.inputDateParser || Date.parse)(a), d = f.xAxis[0], e = f.scroller && f.scroller.xAxis ? f.scroller.xAxis : d, g = e.dataMin, e = e.dataMax;
                b !== v.previousValue && (v.previousValue = b, r(b) || (b = a.split("-"), b = Date.UTC(I(b[0]), I(b[1]) - 1, I(b[2]))), r(b) && (u || (b += 6E4 * (new Date).getTimezoneOffset()), m ? b > c.maxInput.HCTime ?
                    b = void 0 : b < g && (b = g) : b < c.minInput.HCTime ? b = void 0 : b > e && (b = e), void 0 !== b && d.setExtremes(m ? b : d.min, m ? d.max : b, void 0, void 0, {trigger: "rangeSelectorInput"})))
            }

            var c = this, f = c.chart, d = f.renderer.style || {}, g = f.renderer, n = f.options.rangeSelector, h = c.div, m = "min" === a, v, w, x = this.inputGroup;
            this[a + "Label"] = w = g.label(t.lang[m ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({padding: 2}).add(x);
            x.offset += w.width + 5;
            this[a + "DateBox"] = g = g.label("", x.offset).addClass("highcharts-range-input").attr({padding: 2,
                width: n.inputBoxWidth || 90, height: n.inputBoxHeight || 17, stroke: n.inputBoxBorderColor || "#cccccc", "stroke-width": 1, "text-align": "center"}).on("click",function () {
                    c.showInput(a);
                    c[a + "Input"].focus()
                }).add(x);
            x.offset += g.width + (m ? 10 : 0);
            this[a + "Input"] = v = q("input", {name: a, className: "highcharts-range-selector", type: "text"}, {top: f.plotTop + "px"}, h);
            w.css(l(d, n.labelStyle));
            g.css(l({color: "#333333"}, d, n.inputStyle));
            k(v, e({position: "absolute", border: 0, width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: d.fontSize,
                fontFamily: d.fontFamily, top: "-9999em"}, n.inputStyle));
            v.onfocus = function () {
                c.showInput(a)
            };
            v.onblur = function () {
                c.hideInput(a)
            };
            v.onchange = b;
            v.onkeypress = function (a) {
                13 === a.keyCode && b()
            }
        }, getPosition: function () {
            var a = this.chart, b = a.options.rangeSelector, a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
            return{buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10}
        }, getYTDExtremes: function (a, c, e) {
            var f = new b(a), d = f[b.hcGetFullYear]();
            e = e ? b.UTC(d, 0, 1) : +new b(d, 0, 1);
            c = Math.max(c || 0, e);
            f = f.getTime();
            return{max: Math.min(a || f, f), min: c}
        }, render: function (a, b) {
            var c = this, e = c.chart, d = e.renderer, g = e.container, k = e.options, h = k.exporting && !1 !== k.exporting.enabled && k.navigation && k.navigation.buttonOptions, n = t.lang, l = c.div, m = k.rangeSelector, k = m.floating, r = c.buttons, l = c.inputGroup, u = m.buttonTheme, v = m.buttonPosition, w = m.inputPosition, x = m.inputEnabled, z = u && u.states, B = e.plotLeft, E, F = c.buttonGroup, G;
            G = c.rendered;
            var H = c.options.verticalAlign, I = e.legend, L = I && I.options, Y = v.y, X = w.y, Q = G || !1, T = 0, U = 0, V;
            if (!1 !== m.enabled) {
                G ||
                (c.group = G = d.g("range-selector-group").attr({zIndex: 7}).add(), c.buttonGroup = F = d.g("range-selector-buttons").add(G), c.zoomText = d.text(n.rangeSelectorZoom, C(B + v.x, B), 15).css(m.labelStyle).add(F), E = C(B + v.x, B) + c.zoomText.getBBox().width + 5, f(c.buttonOptions, function (a, b) {
                    r[b] = d.button(a.text, E, 0,function () {
                        var d = a.events && a.events.click, e;
                        d && (e = d.call(a));
                        !1 !== e && c.clickButton(b);
                        c.isActive = !0
                    }, u, z && z.hover, z && z.select, z && z.disabled).attr({"text-align": "center"}).add(F);
                    E += r[b].width + C(m.buttonSpacing,
                        5)
                }), !1 !== x && (c.div = l = q("div", null, {position: "relative", height: 0, zIndex: 1}), g.parentNode.insertBefore(l, g), c.inputGroup = l = d.g("input-group").add(G), l.offset = 0, c.drawInput("min"), c.drawInput("max")));
                B = e.plotLeft - e.spacing[3];
                c.updateButtonStates();
                h && this.titleCollision(e) && "top" === H && "right" === v.align && v.y + F.getBBox().height - 12 < (h.y || 0) + h.height && (T = -40);
                "left" === v.align ? V = v.x - e.spacing[3] : "right" === v.align && (V = v.x + T - e.spacing[1]);
                F.align({y: v.y, width: F.getBBox().width, align: v.align, x: V}, !0, e.spacingBox);
                c.group.placed = Q;
                c.buttonGroup.placed = Q;
                !1 !== x && (T = h && this.titleCollision(e) && "top" === H && "right" === w.align && w.y - l.getBBox().height - 12 < (h.y || 0) + h.height + e.spacing[0] ? -40 : 0, "left" === w.align ? V = B : "right" === w.align && (V = -Math.max(e.axisOffset[1], -T)), l.align({y: w.y, width: l.getBBox().width, align: w.align, x: w.x + V - 2}, !0, e.spacingBox), g = l.alignAttr.translateX + l.alignOptions.x - T + l.getBBox().x + 2, h = l.alignOptions.width, n = F.alignAttr.translateX + F.getBBox().x, V = F.getBBox().width + 20, (w.align === v.align || n + V > g && g + h >
                    n && Y < X + l.getBBox().height) && l.attr({translateX: l.alignAttr.translateX + (e.axisOffset[1] >= -T ? 0 : -T), translateY: l.alignAttr.translateY + F.getBBox().height + 10}), c.setInputValue("min", a), c.setInputValue("max", b), c.inputGroup.placed = Q);
                c.group.align({verticalAlign: H}, !0, e.spacingBox);
                a = c.group.getBBox().height + 20;
                b = c.group.alignAttr.translateY;
                "bottom" === H && (I = L && "bottom" === L.verticalAlign && L.enabled && !L.floating ? I.legendHeight + C(L.margin, 10) : 0, a = a + I - 20, U = b - a - (k ? 0 : m.y) - 10);
                if ("top" === H)k && (U = 0), e.titleOffset &&
                    (U = e.titleOffset + e.options.title.margin), U += e.margin[0] - e.spacing[0] || 0; else if ("middle" === H)if (X === Y)U = 0 > X ? b + void 0 : b; else if (X || Y)U = 0 > X || 0 > Y ? U - Math.min(X, Y) : b - a + NaN;
                c.group.translate(m.x, m.y + Math.floor(U));
                !1 !== x && (c.minInput.style.marginTop = c.group.translateY + "px", c.maxInput.style.marginTop = c.group.translateY + "px");
                c.rendered = !0
            }
        }, getHeight: function () {
            var a = this.options, b = this.group, c = a.y, e = a.buttonPosition.y, a = a.inputPosition.y, b = b ? b.getBBox(!0).height + 13 + c : 0, c = Math.min(a, e);
            if (0 > a && 0 > e || 0 < a &&
                0 < e)b += Math.abs(c);
            return b
        }, titleCollision: function (a) {
            return!(a.options.title.text || a.options.subtitle.text)
        }, update: function (a) {
            var b = this.chart;
            l(!0, b.options.rangeSelector, a);
            this.destroy();
            this.init(b);
            b.rangeSelector.render()
        }, destroy: function () {
            var b = this, c = b.minInput, e = b.maxInput;
            b.unMouseDown();
            b.unResize();
            m(b.buttons);
            c && (c.onfocus = c.onblur = c.onchange = null);
            e && (e.onfocus = e.onblur = e.onchange = null);
            a.objectEach(b, function (a, c) {
                a && "chart" !== c && (a.destroy ? a.destroy() : a.nodeType && g(this[c]));
                a !== G.prototype[c] && (b[c] = null)
            }, this)
        }};
        H.prototype.toFixedRange = function (a, b, c, e) {
            var d = this.chart && this.chart.fixedRange;
            a = C(c, this.translate(a, !0, !this.horiz));
            b = C(e, this.translate(b, !0, !this.horiz));
            c = d && (b - a) / d;
            .7 < c && 1.3 > c && (e ? a = b - d : b = a + d);
            r(a) && r(b) || (a = b = void 0);
            return{min: a, max: b}
        };
        H.prototype.minFromRange = function () {
            var a = this.range, b = {month: "Month", year: "FullYear"}[a.type], c, e = this.max, d, f, g = function (a, c) {
                var d = new Date(a), e = d["get" + b]();
                d["set" + b](e + c);
                e === d["get" + b]() && d.setDate(0);
                return d.getTime() -
                    a
            };
            r(a) ? (c = e - a, f = a) : (c = e + g(e, -a.count), this.chart && (this.chart.fixedRange = e - c));
            d = C(this.dataMin, Number.MIN_VALUE);
            r(c) || (c = d);
            c <= d && (c = d, void 0 === f && (f = g(c, a.count)), this.newMax = Math.min(c + f, this.dataMax));
            r(e) || (c = void 0);
            return c
        };
        F(v.prototype, "init", function (a, b, c) {
            E(this, "init", function () {
                this.options.rangeSelector.enabled && (this.rangeSelector = new G(this))
            });
            a.call(this, b, c)
        });
        F(v.prototype, "render", function (a, b, c) {
            var e = this.axes, d = this.rangeSelector;
            d && (f(e, function (a) {
                a.updateNames();
                a.setScale()
            }),
                this.getAxisMargins(), d.render(), e = d.options.verticalAlign, d.options.floating || ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0)));
            a.call(this, b, c)
        });
        F(v.prototype, "update", function (b, c, e, f) {
            var d = this.rangeSelector, g;
            this.extraTopMargin = this.extraBottomMargin = !1;
            d && (d.render(), g = c.rangeSelector && c.rangeSelector.verticalAlign || d.options && d.options.verticalAlign, d.options.floating || ("bottom" === g ? this.extraBottomMargin = !0 : "middle" !== g && (this.extraTopMargin = !0)));
            b.call(this,
                a.merge(!0, c, {chart: {marginBottom: C(c.chart && c.chart.marginBottom, this.margin.bottom), spacingBottom: C(c.chart && c.chart.spacingBottom, this.spacing.bottom)}}), e, f)
        });
        F(v.prototype, "redraw", function (a, b, c) {
            var e = this.rangeSelector;
            e && !e.options.floating && (e.render(), e = e.options.verticalAlign, "bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0));
            a.call(this, b, c)
        });
        v.prototype.adjustPlotArea = function () {
            var a = this.rangeSelector;
            this.rangeSelector && (a = a.getHeight(), this.extraTopMargin &&
                (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
        };
        v.prototype.callbacks.push(function (a) {
            function b() {
                c = a.xAxis[0].getExtremes();
                r(c.min) && e.render(c.min, c.max)
            }

            var c, e = a.rangeSelector, d, f;
            e && (f = E(a.xAxis[0], "afterSetExtremes", function (a) {
                e.render(a.min, a.max)
            }), d = E(a, "redraw", b), b());
            E(a, "destroy", function () {
                e && (d(), f())
            })
        });
        a.RangeSelector = G
    })(L);
    (function (a) {
        var G = a.arrayMax, E = a.arrayMin, H = a.Axis, v = a.Chart, k = a.defined, q = a.each, w = a.extend, t = a.format, u = a.grep, z = a.inArray, m = a.isNumber,
            g = a.isString, f = a.map, e = a.merge, c = a.pick, b = a.Point, r = a.Renderer, l = a.Series, C = a.splat, I = a.SVGRenderer, x = a.VMLRenderer, F = a.wrap, n = l.prototype, B = n.init, J = n.processData, A = b.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function (b, k, l) {
            var d = g(b) || b.nodeName, m = arguments[d ? 1 : 0], p = m.series, n = a.getOptions(), q, r = c(m.navigator && m.navigator.enabled, n.navigator.enabled, !0), t = r ? {startOnTick: !1, endOnTick: !1} : null, u = {marker: {enabled: !1, radius: 2}}, w = {shadow: !1, borderWidth: 0};
            m.xAxis = f(C(m.xAxis || {}), function (a) {
                return e({minPadding: 0,
                    maxPadding: 0, overscroll: 0, ordinal: !0, title: {text: null}, labels: {overflow: "justify"}, showLastLabel: !0}, n.xAxis, a, {type: "datetime", categories: null}, t)
            });
            m.yAxis = f(C(m.yAxis || {}), function (a) {
                q = c(a.opposite, !0);
                return e({labels: {y: -2}, opposite: q, showLastLabel: !1, title: {text: null}}, n.yAxis, a)
            });
            m.series = null;
            m = e({chart: {panning: !0, pinchType: "x"}, navigator: {enabled: r}, scrollbar: {enabled: c(n.scrollbar.enabled, !0)}, rangeSelector: {enabled: c(n.rangeSelector.enabled, !0)}, title: {text: null}, tooltip: {split: c(n.tooltip.split,
                !0), crosshairs: !0}, legend: {enabled: !1}, plotOptions: {line: u, spline: u, area: u, areaspline: u, arearange: u, areasplinerange: u, column: w, columnrange: w, candlestick: w, ohlc: w}}, m, {isStock: !0});
            m.series = p;
            return d ? new v(b, m, l) : new v(m, k)
        };
        F(H.prototype, "autoLabelAlign", function (a) {
            var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels;
            return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"),
                b[c] = this, "right") : a.apply(this, [].slice.call(arguments, 1))
        });
        F(H.prototype, "destroy", function (a) {
            var b = this.chart, c = this.options && this.options.top + "," + this.options.height;
            c && b._labelPanes && b._labelPanes[c] === this && delete b._labelPanes[c];
            return a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        F(H.prototype, "getPlotLinePath", function (b, e, l, h, n, r) {
            var d = this, p = this.isLinked && !this.series ? this.linkedParent.series : this.series, t = d.chart, u = t.renderer, v = d.left, w = d.top, y, x, A, B, D = [], C = [], E, F;
            if ("xAxis" !==
                d.coll && "yAxis" !== d.coll)return b.apply(this, [].slice.call(arguments, 1));
            C = function (a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = d.options[b];
                return m(a) ? [t[b][a]] : g(a) ? [t.get(a)] : f(p, function (a) {
                    return a[b]
                })
            }(d.coll);
            q(d.isXAxis ? t.yAxis : t.xAxis, function (a) {
                if (k(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis", b = k(a.options[b]) ? t[b][a.options[b]] : t[b][0];
                    d === b && C.push(a)
                }
            });
            E = C.length ? [] : [d.isXAxis ? t.yAxis[0] : t.xAxis[0]];
            q(C, function (b) {
                -1 !== z(b, E) || a.find(E, function (a) {
                    return a.pos ===
                        b.pos && a.len && b.len
                }) || E.push(b)
            });
            F = c(r, d.translate(e, null, null, h));
            m(F) && (d.horiz ? q(E, function (a) {
                var b;
                x = a.pos;
                B = x + a.len;
                y = A = Math.round(F + d.transB);
                if (y < v || y > v + d.width)n ? y = A = Math.min(Math.max(v, y), v + d.width) : b = !0;
                b || D.push("M", y, x, "L", A, B)
            }) : q(E, function (a) {
                var b;
                y = a.pos;
                A = y + a.len;
                x = B = Math.round(w + d.height - F);
                if (x < w || x > w + d.height)n ? x = B = Math.min(Math.max(w, x), d.top + d.height) : b = !0;
                b || D.push("M", y, x, "L", A, B)
            }));
            return 0 < D.length ? u.crispPolyLine(D, l || 1) : null
        });
        I.prototype.crispPolyLine = function (a, b) {
            var c;
            for (c = 0; c < a.length; c += 6)a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a
        };
        r === x && (x.prototype.crispPolyLine = I.prototype.crispPolyLine);
        F(H.prototype, "hideCrosshair", function (a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        F(H.prototype, "drawCrosshair", function (a, b, e) {
            var d, f;
            a.call(this, b, e);
            if (k(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                a = this.chart;
                var g = this.options.crosshair.label,
                    l = this.horiz;
                d = this.opposite;
                f = this.left;
                var m = this.top, n = this.crossLabel, p, q = g.format, r = "", u = "inside" === this.options.tickPosition, v = !1 !== this.crosshair.snap, x = 0;
                b || (b = this.cross && this.cross.e);
                p = l ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                n || (n = this.crossLabel = a.renderer.label(null, null, null, g.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({align: g.align || p, padding: c(g.padding,
                    8), r: c(g.borderRadius, 3), zIndex: 2}).add(this.labelGroup), n.attr({fill: g.backgroundColor || this.series[0] && this.series[0].color || "#666666", stroke: g.borderColor || "", "stroke-width": g.borderWidth || 0}).css(w({color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center"}, g.style)));
                l ? (p = v ? e.plotX + f : b.chartX, m += d ? 0 : this.height) : (p = d ? this.width + f : 0, m = v ? e.plotY + m : b.chartY);
                q || g.formatter || (this.isDatetimeAxis && (r = "%b %d, %Y"), q = "{value" + (r ? ":" + r : "") + "}");
                b = v ? e[this.isXAxis ? "x" : "y"] : this.toValue(l ?
                    b.chartX : b.chartY);
                n.attr({text: q ? t(q, {value: b}) : g.formatter.call(this, b), x: p, y: m, visibility: "visible"});
                b = n.getBBox();
                if (l) {
                    if (u && !d || !u && d)m = n.y - b.height
                } else m = n.y - b.height / 2;
                l ? (d = f - b.x, f = f + this.width - b.x) : (d = "left" === this.labelAlign ? f : 0, f = "right" === this.labelAlign ? f + this.width : a.chartWidth);
                n.translateX < d && (x = d - n.translateX);
                n.translateX + b.width >= f && (x = -(n.translateX + b.width - f));
                n.attr({x: p + x, y: m, anchorX: l ? p : this.opposite ? 0 : a.chartWidth, anchorY: l ? this.opposite ? a.chartHeight : 0 : m + b.height / 2})
            }
        });
        n.init = function () {
            B.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        n.setCompare = function (a) {
            this.modifyValue = "value" === a || "percent" === a ? function (b, c) {
                var d = this.compareValue;
                if (void 0 !== b && void 0 !== d)return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
            } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        n.processData = function () {
            var a, b = -1, c, e, f = !0 === this.options.compareStart ? 0 : 1, g, k;
            J.apply(this, arguments);
            if (this.xAxis && this.processedYData)for (c =
                                                           this.processedXData, e = this.processedYData, g = e.length, this.pointArrayMap && (b = z("close", this.pointArrayMap), -1 === b && (b = z(this.pointValKey || "y", this.pointArrayMap))), a = 0; a < g - f; a++)if (k = e[a] && -1 < b ? e[a][b] : e[a], m(k) && c[a + f] >= this.xAxis.min && 0 !== k) {
                this.compareValue = k;
                break
            }
        };
        F(n, "getExtremes", function (a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = E(b), this.dataMax = G(b))
        });
        H.prototype.setCompare = function (a, b) {
            this.isXAxis || (q(this.series, function (b) {
                b.setCompare(a)
            }), c(b, !0) && this.chart.redraw())
        };
        b.prototype.tooltipFormatter = function (b) {
            b = b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, c(this.series.tooltipOptions.changeDecimals, 2)));
            return A.apply(this, [b])
        };
        F(l.prototype, "render", function (a) {
            this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = e(this.chart.clipBox), this.clipBox.width = this.xAxis.len,
                this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({width: this.xAxis.len, height: this.yAxis.len}) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
            a.call(this)
        });
        F(v.prototype, "getSelectedPoints", function (a) {
            var b = a.call(this);
            q(this.series, function (a) {
                a.hasGroupedData && (b = b.concat(u(a.points || [], function (a) {
                    return a.selected
                })))
            });
            return b
        });
        F(v.prototype, "update", function (a, b) {
            "scrollbar"in b && this.navigator &&
            (e(!0, this.options.scrollbar, b.scrollbar), this.navigator.update({}, !1), delete b.scrollbar);
            return a.apply(this, Array.prototype.slice.call(arguments, 1))
        })
    })(L);
    return L
});
