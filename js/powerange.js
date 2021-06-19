(function () {
    function e(t, s, n) {
        var i = e.resolve(t);
        if (null == i) {
            n = n || t, s = s || "root";
            var o = Error('Failed to require "' + n + '" from "' + s + '"');
            throw o.path = n, o.parent = s, o.require = !0, o
        }
        var r = e.modules[i];
        if (!r._resolving && !r.exports) {
            var a = {};
            a.exports = {}, a.client = a.component = !0, r._resolving = !0, r.call(this, a.exports, e.relative(i), a), delete r._resolving, r.exports = a.exports
        }
        return r.exports
    }

    e.modules = {}, e.aliases = {}, e.resolve = function (t) {
        "/" === t.charAt(0) && (t = t.slice(1));
        for (var s = [t, t + ".js", t + ".json", t + "/index.js", t + "/index.json"], n = 0; s.length > n; n++) {
            var t = s[n];
            if (e.modules.hasOwnProperty(t))return t;
            if (e.aliases.hasOwnProperty(t))return e.aliases[t]
        }
    }, e.normalize = function (e, t) {
        var s = [];
        if ("." != t.charAt(0))return t;
        e = e.split("/"), t = t.split("/");
        for (var n = 0; t.length > n; ++n)".." == t[n] ? e.pop() : "." != t[n] && "" != t[n] && s.push(t[n]);
        return e.concat(s).join("/")
    }, e.register = function (t, s) {
        e.modules[t] = s
    }, e.alias = function (t, s) {
        if (!e.modules.hasOwnProperty(t))throw Error('Failed to alias "' + t + '", it does not exist');
        e.aliases[s] = t
    }, e.relative = function (t) {
        function s(e, t) {
            for (var s = e.length; s--;)if (e[s] === t)return s;
            return-1
        }

        function n(s) {
            var i = n.resolve(s);
            return e(i, t, s)
        }

        var i = e.normalize(t, "..");
        return n.resolve = function (n) {
            var o = n.charAt(0);
            if ("/" == o)return n.slice(1);
            if ("." == o)return e.normalize(i, n);
            var r = t.split("/"), a = s(r, "deps") + 1;
            return a || (a = 0), n = r.slice(0, a + 1).join("/") + "/deps/" + n
        }, n.exists = function (t) {
            return e.modules.hasOwnProperty(n.resolve(t))
        }, n
    }, e.register("component-event/index.js", function (e) {
        var t = window.addEventListener ? "addEventListener" : "attachEvent", s = window.removeEventListener ? "removeEventListener" : "detachEvent", n = "addEventListener" !== t ? "on" : "";
        e.bind = function (e, s, i, o) {
            return e[t](n + s, i, o || !1), i
        }, e.unbind = function (e, t, i, o) {
            return e[s](n + t, i, o || !1), i
        }
    }), e.register("component-query/index.js", function (e, t, s) {
        function n(e, t) {
            return t.querySelector(e)
        }

        e = s.exports = function (e, t) {
            return t = t || document, n(e, t)
        }, e.all = function (e, t) {
            return t = t || document, t.querySelectorAll(e)
        }, e.engine = function (t) {
            if (!t.one)throw Error(".one callback required");
            if (!t.all)throw Error(".all callback required");
            return n = t.one, e.all = t.all, e
        }
    }), e.register("component-matches-selector/index.js", function (e, t, s) {
        function n(e, t) {
            if (r)return r.call(e, t);
            for (var s = i.all(t, e.parentNode), n = 0; s.length > n; ++n)if (s[n] == e)return!0;
            return!1
        }

        var i = t("query"), o = Element.prototype, r = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector;
        s.exports = n
    }), e.register("discore-closest/index.js", function (e, t, s) {
        var n = t("matches-selector");
        s.exports = function (e, t, s, i) {
            for (e = s ? {parentNode: e} : e, i = i || document; (e = e.parentNode) && e !== document;) {
                if (n(e, t))return e;
                if (e === i)return
            }
        }
    }), e.register("component-delegate/index.js", function (e, t) {
        var s = t("closest"), n = t("event");
        e.bind = function (e, t, i, o, r) {
            return n.bind(e, i, function (n) {
                var i = n.target || n.srcElement;
                n.delegateTarget = s(i, t, !0, e), n.delegateTarget && o.call(e, n)
            }, r)
        }, e.unbind = function (e, t, s, i) {
            n.unbind(e, t, s, i)
        }
    }), e.register("component-events/index.js", function (e, t, s) {
        function n(e, t) {
            if (!(this instanceof n))return new n(e, t);
            if (!e)throw Error("element required");
            if (!t)throw Error("object required");
            this.el = e, this.obj = t, this._events = {}
        }

        function i(e) {
            var t = e.split(/ +/);
            return{name: t.shift(), selector: t.join(" ")}
        }

        var o = t("event"), r = t("delegate");
        s.exports = n, n.prototype.sub = function (e, t, s) {
            this._events[e] = this._events[e] || {}, this._events[e][t] = s
        }, n.prototype.bind = function (e, t) {
            function s() {
                var e = [].slice.call(arguments).concat(h);
                l[t].apply(l, e)
            }

            var n = i(e), a = this.el, l = this.obj, c = n.name, t = t || "on" + c, h = [].slice.call(arguments, 2);
            return n.selector ? s = r.bind(a, n.selector, c, s) : o.bind(a, c, s), this.sub(c, t, s), s
        }, n.prototype.unbind = function (e, t) {
            if (0 == arguments.length)return this.unbindAll();
            if (1 == arguments.length)return this.unbindAllOf(e);
            var s = this._events[e];
            if (s) {
                var n = s[t];
                n && o.unbind(this.el, e, n)
            }
        }, n.prototype.unbindAll = function () {
            for (var e in this._events)this.unbindAllOf(e)
        }, n.prototype.unbindAllOf = function (e) {
            var t = this._events[e];
            if (t)for (var s in t)this.unbind(e, s)
        }
    }), e.register("component-indexof/index.js", function (e, t, s) {
        s.exports = function (e, t) {
            if (e.indexOf)return e.indexOf(t);
            for (var s = 0; e.length > s; ++s)if (e[s] === t)return s;
            return-1
        }
    }), e.register("component-classes/index.js", function (e, t, s) {
        function n(e) {
            if (!e)throw Error("A DOM element reference is required");
            this.el = e, this.list = e.classList
        }

        var i = t("indexof"), o = /\s+/, r = Object.prototype.toString;
        s.exports = function (e) {
            return new n(e)
        }, n.prototype.add = function (e) {
            if (this.list)return this.list.add(e), this;
            var t = this.array(), s = i(t, e);
            return~s || t.push(e), this.el.className = t.join(" "), this
        }, n.prototype.remove = function (e) {
            if ("[object RegExp]" == r.call(e))return this.removeMatching(e);
            if (this.list)return this.list.remove(e), this;
            var t = this.array(), s = i(t, e);
            return~s && t.splice(s, 1), this.el.className = t.join(" "), this
        }, n.prototype.removeMatching = function (e) {
            for (var t = this.array(), s = 0; t.length > s; s++)e.test(t[s]) && this.remove(t[s]);
            return this
        }, n.prototype.toggle = function (e, t) {
            return this.list ? (t !== void 0 ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this) : (t !== void 0 ? t ? this.add(e) : this.remove(e) : this.has(e) ? this.remove(e) : this.add(e), this)
        }, n.prototype.array = function () {
            var e = this.el.className.replace(/^\s+|\s+$/g, ""), t = e.split(o);
            return"" === t[0] && t.shift(), t
        }, n.prototype.has = n.prototype.contains = function (e) {
            return this.list ? this.list.contains(e) : !!~i(this.array(), e)
        }
    }), e.register("component-emitter/index.js", function (e, t, s) {
        function n(e) {
            return e ? i(e) : void 0
        }

        function i(e) {
            for (var t in n.prototype)e[t] = n.prototype[t];
            return e
        }

        s.exports = n, n.prototype.on = n.prototype.addEventListener = function (e, t) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
        }, n.prototype.once = function (e, t) {
            function s() {
                n.off(e, s), t.apply(this, arguments)
            }

            var n = this;
            return this._callbacks = this._callbacks || {}, s.fn = t, this.on(e, s), this
        }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function (e, t) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length)return this._callbacks = {}, this;
            var s = this._callbacks[e];
            if (!s)return this;
            if (1 == arguments.length)return delete this._callbacks[e], this;
            for (var n, i = 0; s.length > i; i++)if (n = s[i], n === t || n.fn === t) {
                s.splice(i, 1);
                break
            }
            return this
        }, n.prototype.emit = function (e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1), s = this._callbacks[e];
            if (s) {
                s = s.slice(0);
                for (var n = 0, i = s.length; i > n; ++n)s[n].apply(this, t)
            }
            return this
        }, n.prototype.listeners = function (e) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
        }, n.prototype.hasListeners = function (e) {
            return!!this.listeners(e).length
        }
    }), e.register("ui-component-mouse/index.js", function (e, t, s) {
        function n(e, t) {
            this.obj = t || {}, this.el = e
        }

        var i = t("emitter"), o = t("event");
        s.exports = function (e, t) {
            return new n(e, t)
        }, i(n.prototype), n.prototype.bind = function () {
            function e(i) {
                s.onmouseup && s.onmouseup(i), o.unbind(document, "mousemove", t), o.unbind(document, "mouseup", e), n.emit("up", i)
            }

            function t(e) {
                s.onmousemove && s.onmousemove(e), n.emit("move", e)
            }

            var s = this.obj, n = this;
            return n.down = function (i) {
                s.onmousedown && s.onmousedown(i), o.bind(document, "mouseup", e), o.bind(document, "mousemove", t), n.emit("down", i)
            }, o.bind(this.el, "mousedown", n.down), this
        }, n.prototype.unbind = function () {
            o.unbind(this.el, "mousedown", this.down), this.down = null
        }
    }), e.register("abpetkov-percentage-calc/percentage-calc.js", function (e) {
        e.isNumber = function (e) {
            return"number" == typeof e ? !0 : !1
        }, e.of = function (t, s) {
            return e.isNumber(t) && e.isNumber(s) ? t / 100 * s : void 0
        }, e.from = function (t, s) {
            return e.isNumber(t) && e.isNumber(s) ? 100 * (t / s) : void 0
        }
    }), e.register("abpetkov-closest-num/closest-num.js", function (e) {
        e.find = function (e, t) {
            var s = null, n = null, o = t[0];
            for (i = 0; t.length > i; i++)s = Math.abs(e - o), n = Math.abs(e - t[i]), s > n && (o = t[i]);
            return o
        }
    }), e.register("vesln-super/lib/super.js", function (e, t, s) {
        function n() {
            var t = i.call(arguments);
            if (t.length)return"function" != typeof t[0] ? e.merge(t) : (e.inherits.apply(null, t), void 0)
        }

        var i = Array.prototype.slice, e = s.exports = n;
        e.extend = function (t, s) {
            var n = this, i = function () {
                return n.apply(this, arguments)
            };
            return e.merge([i, this]), e.inherits(i, this), t && e.merge([i.prototype, t]), s && e.merge([i, s]), i.extend = this.extend, i
        }, e.inherits = function (e, t) {
            e.super_ = t, Object.create ? e.prototype = Object.create(t.prototype, {constructor: {value: e, enumerable: !1, writable: !0, configurable: !0}}) : (e.prototype = new t, e.prototype.constructor = e)
        }, e.merge = function (e) {
            for (var t = 2 === e.length ? e.shift() : {}, s = null, n = 0, i = e.length; i > n; n++) {
                s = e[n];
                for (var o in s)s.hasOwnProperty(o) && (t[o] = s[o])
            }
            return t
        }
    }), e.register("powerange/lib/powerange.js", function (e, t, s) {
        var n = (t("./main"), t("./horizontal")), i = t("./vertical"), o = {callback: function () {
        }, decimal: !1, disable: !1, disableOpacity: .5, hideRange: !1, klass: "", min: 0, max: 100, start: null, step: null, vertical: !1};
        s.exports = function (e, t) {
            t = t || {};
            for (var s in o)null == t[s] && (t[s] = o[s]);
            return t.vertical ? new i(e, t) : new n(e, t)
        }
    }), e.register("powerange/lib/main.js", function (e, t, s) {
        function n(e, t) {
            return this instanceof n ? (this.element = e, this.options = t || {}, this.slider = this.create("span", "range-bar"), null !== this.element && "text" === this.element.type && this.init(), void 0) : new n(e, t)
        }

        var o = t("mouse"), r = t("events"), a = t("classes"), l = t("percentage-calc");
        s.exports = n, n.prototype.bindEvents = function () {
            this.handle = this.slider.querySelector(".range-handle"), this.touch = r(this.handle, this), this.touch.bind("touchstart", "onmousedown"), this.touch.bind("touchmove", "onmousemove"), this.touch.bind("touchend", "onmouseup"), this.mouse = o(this.handle, this), this.mouse.bind()
        }, n.prototype.hide = function () {
            this.element.style.display = "none"
        }, n.prototype.append = function () {
            var e = this.generate();
            this.insertAfter(this.element, e)
        }, n.prototype.generate = function () {
            var e = {handle: {type: "span", selector: "range-handle"}, min: {type: "span", selector: "range-min"}, max: {type: "span", selector: "range-max"}, quantity: {type: "span", selector: "range-quantity"}};
            for (var t in e)if (e.hasOwnProperty(t)) {
                var s = this.create(e[t].type, e[t].selector);
                this.slider.appendChild(s)
            }
            return this.slider
        }, n.prototype.create = function (e, t) {
            var s = document.createElement(e);
            return s.className = t, s
        }, n.prototype.insertAfter = function (e, t) {
            e.parentNode.insertBefore(t, e.nextSibling)
        }, n.prototype.extraClass = function (e) {
            this.options.klass && a(this.slider).add(e)
        }, n.prototype.setRange = function (e, t) {
            "number" != typeof e || "number" != typeof t || this.options.hideRange || (this.slider.querySelector(".range-min").innerHTML = e, this.slider.querySelector(".range-max").innerHTML = t)
        }, n.prototype.setValue = function (e, t) {
            var s = l.from(parseFloat(e), t), n = l.of(s, this.options.max - this.options.min) + this.options.min, i = !1;
            n = this.options.decimal ? Math.round(100 * n) / 100 : Math.round(n), i = this.element.value != n ? !0 : !1, this.element.value = n, this.options.callback(), i && this.changeEvent()
        }, n.prototype.step = function (e, t) {
            var s = e - t, n = l.from(this.checkStep(this.options.step), this.options.max - this.options.min), o = l.of(n, s), r = [];
            for (i = 0; s >= i; i += o)r.push(i);
            return this.steps = r, this.steps
        }, n.prototype.checkValues = function (e) {
            this.options.min > e && (this.options.start = this.options.min), e > this.options.max && (this.options.start = this.options.max), this.options.min >= this.options.max && (this.options.min = this.options.max)
        }, n.prototype.checkStep = function (e) {
            return 0 > e && (e = Math.abs(e)), this.options.step = e, this.options.step
        }, n.prototype.disable = function () {
            (this.options.min == this.options.max || this.options.min > this.options.max || this.options.disable) && (this.mouse.unbind(), this.touch.unbind(), this.slider.style.opacity = this.options.disableOpacity, a(this.handle).add("range-disabled"))
        }, n.prototype.unselectable = function (e, t) {
            a(this.slider).has("unselectable") || t !== !0 ? a(this.slider).remove("unselectable") : a(this.slider).add("unselectable")
        }, n.prototype.changeEvent = function () {
            if ("function" != typeof Event && document.fireEvent)this.element.fireEvent("onchange"); else {
                var e = document.createEvent("HTMLEvents");
                e.initEvent("change", !1, !0), this.element.dispatchEvent(e)
            }
        }, n.prototype.init = function () {
            this.hide(), this.append(), this.bindEvents(), this.extraClass(this.options.klass), this.checkValues(this.options.start), this.setRange(this.options.min, this.options.max), this.disable()
        }
    }), e.register("powerange/lib/horizontal.js", function (e, t, s) {
        function n() {
            a.apply(this, arguments), this.options.step && this.step(this.slider.offsetWidth, this.handle.offsetWidth), this.setStart(this.options.start)
        }

        var i = t("super"), o = t("closest-num"), r = t("percentage-calc"), a = t("./main");
        s.exports = n, i(n, a), n.prototype.setStart = function (e) {
            var t = null === e ? this.options.min : e, s = r.from(t - this.options.min, this.options.max - this.options.min) || 0, n = r.of(s, this.slider.offsetWidth - this.handle.offsetWidth), i = this.options.step ? o.find(n, this.steps) : n;
            this.setPosition(i), this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth)
        }, n.prototype.setPosition = function (e) {
            this.handle.style.left = e + "px", this.slider.querySelector(".range-quantity").style.width = e + "px"
        }, n.prototype.onmousedown = function (e) {
            e.touches && (e = e.touches[0]), this.startX = e.clientX, this.handleOffsetX = this.handle.offsetLeft, this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth, this.unselectable(this.slider, !0)
        }, n.prototype.onmousemove = function (e) {
            e.preventDefault(), e.touches && (e = e.touches[0]);
            var t = this.handleOffsetX + e.clientX - this.startX, s = this.steps ? o.find(t, this.steps) : t;
            0 >= t ? this.setPosition(0) : t >= this.restrictHandleX ? this.setPosition(this.restrictHandleX) : this.setPosition(s), this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth)
        }, n.prototype.onmouseup = function () {
            this.unselectable(this.slider, !1)
        }
    }), e.register("powerange/lib/vertical.js", function (e, t, s) {
        function n() {
            l.apply(this, arguments), o(this.slider).add("vertical"), this.options.step && this.step(this.slider.offsetHeight, this.handle.offsetHeight), this.setStart(this.options.start)
        }

        var i = t("super"), o = t("classes"), r = t("closest-num"), a = t("percentage-calc"), l = t("./main");
        s.exports = n, i(n, l), n.prototype.setStart = function (e) {
            var t = null === e ? this.options.min : e, s = a.from(t - this.options.min, this.options.max - this.options.min) || 0, n = a.of(s, this.slider.offsetHeight - this.handle.offsetHeight), i = this.options.step ? r.find(n, this.steps) : n;
            this.setPosition(i), this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight)
        }, n.prototype.setPosition = function (e) {
            this.handle.style.bottom = e + "px", this.slider.querySelector(".range-quantity").style.height = e + "px"
        }, n.prototype.onmousedown = function (e) {
            e.touches && (e = e.touches[0]), this.startY = e.clientY, this.handleOffsetY = this.slider.offsetHeight - this.handle.offsetHeight - this.handle.offsetTop, this.restrictHandleY = this.slider.offsetHeight - this.handle.offsetHeight, this.unselectable(this.slider, !0)
        }, n.prototype.onmousemove = function (e) {
            e.preventDefault(), e.touches && (e = e.touches[0]);
            var t = this.handleOffsetY + this.startY - e.clientY, s = this.steps ? r.find(t, this.steps) : t;
            0 >= t ? this.setPosition(0) : t >= this.restrictHandleY ? this.setPosition(this.restrictHandleY) : this.setPosition(s), this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight)
        }, n.prototype.onmouseup = function () {
            this.unselectable(this.slider, !1)
        }
    }), e.alias("component-events/index.js", "powerange/deps/events/index.js"), e.alias("component-events/index.js", "events/index.js"), e.alias("component-event/index.js", "component-events/deps/event/index.js"), e.alias("component-delegate/index.js", "component-events/deps/delegate/index.js"), e.alias("discore-closest/index.js", "component-delegate/deps/closest/index.js"), e.alias("discore-closest/index.js", "component-delegate/deps/closest/index.js"), e.alias("component-matches-selector/index.js", "discore-closest/deps/matches-selector/index.js"), e.alias("component-query/index.js", "component-matches-selector/deps/query/index.js"), e.alias("discore-closest/index.js", "discore-closest/index.js"), e.alias("component-event/index.js", "component-delegate/deps/event/index.js"), e.alias("component-classes/index.js", "powerange/deps/classes/index.js"), e.alias("component-classes/index.js", "classes/index.js"), e.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js"), e.alias("ui-component-mouse/index.js", "powerange/deps/mouse/index.js"), e.alias("ui-component-mouse/index.js", "mouse/index.js"), e.alias("component-emitter/index.js", "ui-component-mouse/deps/emitter/index.js"), e.alias("component-event/index.js", "ui-component-mouse/deps/event/index.js"), e.alias("abpetkov-percentage-calc/percentage-calc.js", "powerange/deps/percentage-calc/percentage-calc.js"), e.alias("abpetkov-percentage-calc/percentage-calc.js", "powerange/deps/percentage-calc/index.js"), e.alias("abpetkov-percentage-calc/percentage-calc.js", "percentage-calc/index.js"), e.alias("abpetkov-percentage-calc/percentage-calc.js", "abpetkov-percentage-calc/index.js"), e.alias("abpetkov-closest-num/closest-num.js", "powerange/deps/closest-num/closest-num.js"), e.alias("abpetkov-closest-num/closest-num.js", "powerange/deps/closest-num/index.js"), e.alias("abpetkov-closest-num/closest-num.js", "closest-num/index.js"), e.alias("abpetkov-closest-num/closest-num.js", "abpetkov-closest-num/index.js"), e.alias("vesln-super/lib/super.js", "powerange/deps/super/lib/super.js"), e.alias("vesln-super/lib/super.js", "powerange/deps/super/index.js"), e.alias("vesln-super/lib/super.js", "super/index.js"), e.alias("vesln-super/lib/super.js", "vesln-super/index.js"), e.alias("powerange/lib/powerange.js", "powerange/index.js"), "object" == typeof exports ? module.exports = e("powerange") : "function" == typeof define && define.amd ? define([], function () {
        return e("powerange")
    }) : this.Powerange = e("powerange")
})();