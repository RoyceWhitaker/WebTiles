!function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.Blazy = e()
}(this, function() {
    function t(t) {
        var o = t._util;
        o.elements = c(t.options),
        o.count = o.elements.length,
        o.destroyed && (o.destroyed = !1,
        t.options.container && p(t.options.container, function(t) {
            u(t, "scroll", o.validateT)
        }),
        u(window, "resize", o.saveViewportOffsetT),
        u(window, "resize", o.validateT),
        u(window, "scroll", o.validateT)),
        e(t)
    }
    function e(t) {
        for (var e = t._util, n = 0; n < e.count; n++) {
            var s, i = e.elements[n], a = i;
            s = t.options;
            var c = a.getBoundingClientRect();
            s.container && g && (a = a.closest(s.containerClass)) ? (a = a.getBoundingClientRect(),
            s = !!o(a, m) && o(c, {
                top: a.top - s.offset,
                right: a.right + s.offset,
                bottom: a.bottom + s.offset,
                left: a.left - s.offset
            })) : s = o(c, m),
            (s || r(i, t.options.successClass)) && (t.load(i),
            e.elements.splice(n, 1),
            e.count--,
            n--)
        }
        0 === e.count && t.destroy()
    }
    function o(t, e) {
        return t.right >= e.left && t.bottom >= e.top && t.left <= e.right && t.top <= e.bottom
    }
    function n(t, e, o) {
        if (!r(t, o.successClass) && (e || o.loadInvisible || 0 < t.offsetWidth && 0 < t.offsetHeight))
            if (e = t.getAttribute(v) || t.getAttribute(o.src)) {
                e = e.split(o.separator);
                var n = e[h && 1 < e.length ? 1 : 0]
                  , c = t.getAttribute(o.srcset)
                  , l = "img" === t.nodeName.toLowerCase()
                  , d = (e = t.parentNode) && "picture" === e.nodeName.toLowerCase();
                if (l || void 0 === t.src) {
                    var m = new Image
                      , g = function() {
                        o.error && o.error(t, "invalid"),
                        a(t, o.errorClass),
                        f(m, "error", g),
                        f(m, "load", w)
                    }
                      , w = function() {
                        l ? d || i(t, n, c) : t.style.backgroundImage = 'url("' + n + '")',
                        s(t, o),
                        f(m, "load", w),
                        f(m, "error", g)
                    };
                    d && (m = t,
                    p(e.getElementsByTagName("source"), function(t) {
                        var e = o.srcset
                          , n = t.getAttribute(e);
                        n && (t.setAttribute("srcset", n),
                        t.removeAttribute(e))
                    })),
                    u(m, "error", g),
                    u(m, "load", w),
                    i(m, n, c)
                } else
                    t.src = n,
                    s(t, o)
            } else
                "video" === t.nodeName.toLowerCase() ? (p(t.getElementsByTagName("source"), function(t) {
                    var e = o.src
                      , n = t.getAttribute(e);
                    n && (t.setAttribute("src", n),
                    t.removeAttribute(e))
                }),
                t.load(),
                s(t, o)) : (o.error && o.error(t, "missing"),
                a(t, o.errorClass))
    }
    function s(t, e) {
        a(t, e.successClass),
        e.success && e.success(t),
        t.removeAttribute(e.src),
        t.removeAttribute(e.srcset),
        p(e.breakpoints, function(e) {
            t.removeAttribute(e.src)
        })
    }
    function i(t, e, o) {
        o && t.setAttribute("srcset", o),
        t.src = e
    }
    function r(t, e) {
        return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
    }
    function a(t, e) {
        r(t, e) || (t.className += " " + e)
    }
    function c(t) {
        var e = [];
        t = t.root.querySelectorAll(t.selector);
        for (var o = t.length; o--; e.unshift(t[o]))
            ;
        return e
    }
    function l(t) {
        m.bottom = (window.innerHeight || document.documentElement.clientHeight) + t,
        m.right = (window.innerWidth || document.documentElement.clientWidth) + t
    }
    function u(t, e, o) {
        t.attachEvent ? t.attachEvent && t.attachEvent("on" + e, o) : t.addEventListener(e, o, {
            capture: !1,
            passive: !0
        })
    }
    function f(t, e, o) {
        t.detachEvent ? t.detachEvent && t.detachEvent("on" + e, o) : t.removeEventListener(e, o, {
            capture: !1,
            passive: !0
        })
    }
    function p(t, e) {
        if (t && e)
            for (var o = t.length, n = 0; n < o && !1 !== e(t[n], n); n++)
                ;
    }
    function d(t, e, o) {
        var n = 0;
        return function() {
            var s = +new Date;
            s - n < e || (n = s,
            t.apply(o, arguments))
        }
    }
    var v, m, h, g;
    return function(o) {
        if (!document.querySelectorAll) {
            var s = document.createStyleSheet();
            document.querySelectorAll = function(t, e, o, n, i) {
                for (i = document.all,
                e = [],
                t = t.replace(/\[for\b/gi, "[htmlFor").split(","),
                o = t.length; o--; ) {
                    for (s.addRule(t[o], "k:v"),
                    n = i.length; n--; )
                        i[n].currentStyle.k && e.push(i[n]);
                    s.removeRule(0)
                }
                return e
            }
        }
        var i = this
          , r = i._util = {};
        r.elements = [],
        r.destroyed = !0,
        i.options = o || {},
        i.options.error = i.options.error || !1,
        i.options.offset = i.options.offset || 100,
        i.options.root = i.options.root || document,
        i.options.success = i.options.success || !1,
        i.options.selector = i.options.selector || ".b-lazy",
        i.options.separator = i.options.separator || "|",
        i.options.containerClass = i.options.container,
        i.options.container = !!i.options.containerClass && document.querySelectorAll(i.options.containerClass),
        i.options.errorClass = i.options.errorClass || "b-error",
        i.options.breakpoints = i.options.breakpoints || !1,
        i.options.loadInvisible = i.options.loadInvisible || !1,
        i.options.successClass = i.options.successClass || "b-loaded",
        i.options.validateDelay = i.options.validateDelay || 25,
        i.options.saveViewportOffsetDelay = i.options.saveViewportOffsetDelay || 50,
        i.options.srcset = i.options.srcset || "data-srcset",
        i.options.src = v = i.options.src || "data-src",
        g = Element.prototype.closest,
        h = 1 < window.devicePixelRatio,
        m = {},
        m.top = 0 - i.options.offset,
        m.left = 0 - i.options.offset,
        i.revalidate = function() {
            t(i)
        }
        ,
        i.load = function(t, e) {
            var o = this.options;
            void 0 === t.length ? n(t, e, o) : p(t, function(t) {
                n(t, e, o)
            })
        }
        ,
        i.destroy = function() {
            var t = this._util;
            this.options.container && p(this.options.container, function(e) {
                f(e, "scroll", t.validateT)
            }),
            f(window, "scroll", t.validateT),
            f(window, "resize", t.validateT),
            f(window, "resize", t.saveViewportOffsetT),
            t.count = 0,
            t.elements.length = 0,
            t.destroyed = !0
        }
        ,
        r.validateT = d(function() {
            e(i)
        }, i.options.validateDelay, i),
        r.saveViewportOffsetT = d(function() {
            l(i.options.offset)
        }, i.options.saveViewportOffsetDelay, i),
        l(i.options.offset),
        p(i.options.breakpoints, function(t) {
            if (t.width >= window.screen.width)
                return v = t.src,
                !1
        }),
        setTimeout(function() {
            t(i)
        })
    }
});
!function(e) {
    e.fn.marquee = function(t) {
        return this.each(function() {
            var i, a, n, r, s, o = e.extend({}, e.fn.marquee.defaults, t), u = e(this), d = 3, p = "animation-play-state", l = !1, c = function(e, t, i) {
                for (var a = ["webkit", "moz", "MS", "o", ""], n = 0; n < a.length; n++)
                    a[n] || (t = t.toLowerCase()),
                    e.addEventListener(a[n] + t, i, !1)
            }, f = function(e) {
                var t, i = [];
                for (t in e)
                    e.hasOwnProperty(t) && i.push(t + ":" + e[t]);
                return i.push(),
                "{" + i.join(",") + "}"
            }, m = {
                pause: function() {
                    l && o.allowCss3Support ? i.css(p, "paused") : e.fn.pause && i.pause(),
                    u.data("runningStatus", "paused"),
                    u.trigger("paused")
                },
                resume: function() {
                    l && o.allowCss3Support ? i.css(p, "running") : e.fn.resume && i.resume(),
                    u.data("runningStatus", "resumed"),
                    u.trigger("resumed")
                },
                toggle: function() {
                    m["resumed" == u.data("runningStatus") ? "pause" : "resume"]()
                },
                destroy: function() {
                    clearTimeout(u.timer),
                    u.find("*").andSelf().unbind(),
                    u.html(u.find(".js-marquee:first").html())
                }
            };
            if ("string" == typeof t)
                e.isFunction(m[t]) && (i || (i = u.find(".js-marquee-wrapper")),
                !0 === u.data("css3AnimationIsSupported") && (l = !0),
                m[t]());
            else {
                var g;
                e.each(o, function(e, t) {
                    if (void 0 !== (g = u.attr("data-" + e))) {
                        switch (g) {
                        case "true":
                            g = !0;
                            break;
                        case "false":
                            g = !1
                        }
                        o[e] = g
                    }
                }),
                o.speed && (o.duration = o.speed * parseInt(u.width(), 10)),
                r = "up" == o.direction || "down" == o.direction,
                o.gap = o.duplicated ? parseInt(o.gap) : 0,
                u.wrapInner('<div class="js-marquee"></div>');
                var h = u.find(".js-marquee").css({
                    "margin-right": o.gap,
                    float: "left"
                });
                if (o.duplicated && h.clone(!0).appendTo(u),
                u.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'),
                i = u.find(".js-marquee-wrapper"),
                r) {
                    var v = u.height();
                    i.removeAttr("style"),
                    u.height(v),
                    u.find(".js-marquee").css({
                        float: "none",
                        "margin-bottom": o.gap,
                        "margin-right": 0
                    }),
                    o.duplicated && u.find(".js-marquee:last").css({
                        "margin-bottom": 0
                    });
                    var y = u.find(".js-marquee:first").height() + o.gap;
                    o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(y, 10) + parseInt(v, 10)) / parseInt(v, 10) * o.duration,
                    o.duration *= parseInt(y, 10) / parseInt(v, 10)) : o.duration *= (parseInt(y, 10) + parseInt(v, 10)) / parseInt(v, 10)
                } else
                    s = u.find(".js-marquee:first").width() + o.gap,
                    a = u.width(),
                    o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10) * o.duration,
                    o.duration *= parseInt(s, 10) / parseInt(a, 10)) : o.duration *= (parseInt(s, 10) + parseInt(a, 10)) / parseInt(a, 10);
                if (o.duplicated && (o.duration /= 2),
                o.allowCss3Support) {
                    var h = document.body || document.createElement("div")
                      , I = "marqueeAnimation-" + Math.floor(1e7 * Math.random())
                      , x = ["Webkit", "Moz", "O", "ms", "Khtml"]
                      , b = "animation"
                      , S = ""
                      , w = "";
                    if (h.style.animation && (w = "@keyframes " + I + " ",
                    l = !0),
                    !1 === l)
                        for (var q = 0; q < x.length; q++)
                            if (void 0 !== h.style[x[q] + "AnimationName"]) {
                                h = "-" + x[q].toLowerCase() + "-",
                                b = h + b,
                                p = h + p,
                                w = "@" + h + "keyframes " + I + " ",
                                l = !0;
                                break
                            }
                    l && (S = I + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s infinite " + o.css3easing,
                    u.data("css3AnimationIsSupported", !0))
                }
                var j = function() {
                    i.css("margin-top", "up" == o.direction ? v + "px" : "-" + y + "px")
                }
                  , C = function() {
                    i.css("margin-left", "left" == o.direction ? a + "px" : "-" + s + "px")
                };
                o.duplicated ? (r ? o.startVisible ? i.css("margin-top", 0) : i.css("margin-top", "up" == o.direction ? v + "px" : "-" + (2 * y - o.gap) + "px") : o.startVisible ? i.css("margin-left", 0) : i.css("margin-left", "left" == o.direction ? a + "px" : "-" + (2 * s - o.gap) + "px"),
                o.startVisible || (d = 1)) : o.startVisible ? d = 2 : r ? j() : C();
                var V = function() {
                    if (o.duplicated && (1 === d ? (o._originalDuration = o.duration,
                    o.duration = r ? "up" == o.direction ? o.duration + v / (y / o.duration) : 2 * o.duration : "left" == o.direction ? o.duration + a / (s / o.duration) : 2 * o.duration,
                    S && (S = I + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    d++) : 2 === d && (o.duration = o._originalDuration,
                    S && (I += "0",
                    w = e.trim(w) + "0 ",
                    S = I + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    d++)),
                    r ? o.duplicated ? (2 < d && i.css("margin-top", "up" == o.direction ? 0 : "-" + y + "px"),
                    n = {
                        "margin-top": "up" == o.direction ? "-" + y + "px" : 0
                    }) : o.startVisible ? 2 === d ? (S && (S = I + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    n = {
                        "margin-top": "up" == o.direction ? "-" + y + "px" : v + "px"
                    },
                    d++) : 3 === d && (o.duration = o._completeDuration,
                    S && (I += "0",
                    w = e.trim(w) + "0 ",
                    S = I + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    j()) : (j(),
                    n = {
                        "margin-top": "up" == o.direction ? "-" + i.height() + "px" : v + "px"
                    }) : o.duplicated ? (2 < d && i.css("margin-left", "left" == o.direction ? 0 : "-" + s + "px"),
                    n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : 0
                    }) : o.startVisible ? 2 === d ? (S && (S = I + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : a + "px"
                    },
                    d++) : 3 === d && (o.duration = o._completeDuration,
                    S && (I += "0",
                    w = e.trim(w) + "0 ",
                    S = I + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    C()) : (C(),
                    n = {
                        "margin-left": "left" == o.direction ? "-" + s + "px" : a + "px"
                    }),
                    u.trigger("beforeStarting"),
                    l) {
                        i.css(b, S);
                        var t = w + " { 100%  " + f(n) + "}"
                          , p = i.find("style");
                        0 !== p.length ? p.filter(":last").html(t) : i.append("<style>" + t + "</style>"),
                        c(i[0], "AnimationIteration", function() {
                            u.trigger("finished")
                        }),
                        c(i[0], "AnimationEnd", function() {
                            V(),
                            u.trigger("finished")
                        })
                    } else
                        i.animate(n, o.duration, o.easing, function() {
                            u.trigger("finished"),
                            o.pauseOnCycle ? u.timer = setTimeout(V, o.delayBeforeStart) : V()
                        });
                    u.data("runningStatus", "resumed")
                };
                u.bind("pause", m.pause),
                u.bind("resume", m.resume),
                o.pauseOnHover && u.bind("mouseenter mouseleave", m.toggle),
                l && o.allowCss3Support ? V() : u.timer = setTimeout(V, o.delayBeforeStart)
            }
        })
    }
    ,
    e.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1e3,
        direction: "left",
        duplicated: !1,
        duration: 5e3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1,
        startVisible: !1
    }
}(jQuery);
!function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";
    function i(i, r, a) {
        function h(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function(t, h) {
                var u = a.data(h, i);
                if (!u)
                    return void s(i + " not initialized. Cannot call methods, i.e. " + r);
                var d = u[e];
                if (!d || "_" == e.charAt(0))
                    return void s(r + " is not a valid method");
                var l = d.apply(u, n);
                o = void 0 === o ? l : o
            }),
            void 0 !== o ? o : t
        }
        function u(t, e) {
            t.each(function(t, n) {
                var o = a.data(n, i);
                o ? (o.option(e),
                o._init()) : (o = new r(n,e),
                a.data(n, i, o))
            })
        }
        (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }
        ),
        a.fn[i] = function(t) {
            if ("string" == typeof t) {
                return h(this, t, o.call(arguments, 1))
            }
            return u(this, t),
            this
        }
        ,
        n(a))
    }
    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice
      , r = t.console
      , s = void 0 === r ? function() {}
    : function(t) {
        r.error(t)
    }
    ;
    return n(e || t.jQuery),
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0
              , o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
                var s = r && r[o];
                s && (this.off(t, o),
                delete r[o]),
                o.apply(this, e),
                n += s ? 0 : 1,
                o = i[n]
            }
            return this
        }
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    function e() {}
    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; u > e; e++) {
            t[h[e]] = 0
        }
        return t
    }
    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
        e
    }
    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px",
            e.style.padding = "1px 2px 3px 4px",
            e.style.borderStyle = "solid",
            e.style.borderWidth = "1px 2px 3px 4px",
            e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            r.isBoxSizeOuter = s = 200 == t(o.width),
            i.removeChild(e)
        }
    }
    function r(e) {
        if (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display)
                return i();
            var a = {};
            a.width = e.offsetWidth,
            a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
                var c = h[l]
                  , f = r[c]
                  , m = parseFloat(f);
                a[c] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight
              , g = a.paddingTop + a.paddingBottom
              , y = a.marginLeft + a.marginRight
              , v = a.marginTop + a.marginBottom
              , _ = a.borderLeftWidth + a.borderRightWidth
              , z = a.borderTopWidth + a.borderBottomWidth
              , E = d && s
              , b = t(r.width);
            !1 !== b && (a.width = b + (E ? 0 : p + _));
            var x = t(r.height);
            return !1 !== x && (a.height = x + (E ? 0 : g + z)),
            a.innerWidth = a.width - (p + _),
            a.innerHeight = a.height - (g + z),
            a.outerWidth = a.width + y,
            a.outerHeight = a.height + v,
            a
        }
    }
    var s, a = "undefined" == typeof console ? e : function(t) {
        console.error(t)
    }
    , h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], u = h.length, d = !1;
    return r
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i]
              , o = n + "MatchesSelector";
            if (t[o])
                return o
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    ,
    i.modulo = function(t, e) {
        return (t % e + e) % e
    }
    ,
    i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t))
            e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++)
                e.push(t[i]);
        else
            e.push(t);
        return e
    }
    ,
    i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }
    ,
    i.getParent = function(t, i) {
        for (; t != document.body; )
            if (t = t.parentNode,
            e(t, i))
                return t
    }
    ,
    i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n)
                    return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                    o.push(i[r])
            }
        }),
        o
    }
    ,
    i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e]
          , o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            t && clearTimeout(t);
            var e = arguments
              , r = this;
            this[o] = setTimeout(function() {
                n.apply(r, e),
                delete r[o]
            }, i || 100)
        }
    }
    ,
    i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var n = t.console;
    return i.htmlInit = function(e, o) {
        i.docReady(function() {
            var r = i.toDashed(o)
              , s = "data-" + r
              , a = document.querySelectorAll("[" + s + "]")
              , h = document.querySelectorAll(".js-" + r)
              , u = i.makeArray(a).concat(i.makeArray(h))
              , d = s + "-options"
              , l = t.jQuery;
            u.forEach(function(t) {
                var i, r = t.getAttribute(s) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r)
                } catch (e) {
                    return void (n && n.error("Error parsing " + s + " on " + t.className + ": " + e))
                }
                var a = new e(t,i);
                l && l.data(t, o, a)
            })
        })
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {},
    t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";
    function i(t) {
        for (var e in t)
            return !1;
        return null,
        !0
    }
    function n(t, e) {
        t && (this.element = t,
        this.layout = e,
        this.position = {
            x: 0,
            y: 0
        },
        this._create())
    }
    var o = document.documentElement.style
      , r = "string" == typeof o.transition ? "transition" : "WebkitTransition"
      , s = "string" == typeof o.transform ? "transform" : "WebkitTransform"
      , a = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[r]
      , h = {
        transform: s,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay"
    }
      , u = n.prototype = Object.create(t.prototype);
    u.constructor = n,
    u._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        },
        this.css({
            position: "absolute"
        })
    }
    ,
    u.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    u.getSize = function() {
        this.size = e(this.element)
    }
    ,
    u.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            e[h[i] || i] = t[i]
        }
    }
    ,
    u.getPosition = function() {
        var t = getComputedStyle(this.element)
          , e = this.layout._getOption("originLeft")
          , i = this.layout._getOption("originTop")
          , n = t[e ? "left" : "right"]
          , o = t[i ? "top" : "bottom"]
          , r = this.layout.size
          , s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10)
          , a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
        s = isNaN(s) ? 0 : s,
        a = isNaN(a) ? 0 : a,
        s -= e ? r.paddingLeft : r.paddingRight,
        a -= i ? r.paddingTop : r.paddingBottom,
        this.position.x = s,
        this.position.y = a
    }
    ,
    u.layoutPosition = function() {
        var t = this.layout.size
          , e = {}
          , i = this.layout._getOption("originLeft")
          , n = this.layout._getOption("originTop")
          , o = i ? "paddingLeft" : "paddingRight"
          , r = i ? "left" : "right"
          , s = i ? "right" : "left"
          , a = this.position.x + t[o];
        e[r] = this.getXValue(a),
        e[s] = "";
        var h = n ? "paddingTop" : "paddingBottom"
          , u = n ? "top" : "bottom"
          , d = n ? "bottom" : "top"
          , l = this.position.y + t[h];
        e[u] = this.getYValue(l),
        e[d] = "",
        this.css(e),
        this.emitEvent("layout", [this])
    }
    ,
    u.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }
    ,
    u.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }
    ,
    u._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x
          , n = this.position.y
          , o = parseInt(t, 10)
          , r = parseInt(e, 10)
          , s = o === this.position.x && r === this.position.y;
        if (this.setPosition(t, e),
        s && !this.isTransitioning)
            return void this.layoutPosition();
        var a = t - i
          , h = e - n
          , u = {};
        u.transform = this.getTranslate(a, h),
        this.transition({
            to: u,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }
    ,
    u.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft")
          , n = this.layout._getOption("originTop");
        return t = i ? t : -t,
        e = n ? e : -e,
        "translate3d(" + t + "px, " + e + "px, 0)"
    }
    ,
    u.goTo = function(t, e) {
        this.setPosition(t, e),
        this.layoutPosition()
    }
    ,
    u.moveTo = u._transitionTo,
    u.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10),
        this.position.y = parseInt(e, 10)
    }
    ,
    u._nonTransition = function(t) {
        this.css(t.to),
        t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd)
            t.onTransitionEnd[e].call(this)
    }
    ,
    u.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration))
            return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd)
            e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
            e.ingProperties[i] = !0,
            t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            this.element.offsetHeight;
            null
        }
        this.enableTransition(t.to),
        this.css(t.to),
        this.isTransitioning = !0
    }
    ;
    var d = "opacity," + function(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }(s);
    u.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t,
            this.css({
                transitionProperty: d,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }),
            this.element.addEventListener(a, this, !1)
        }
    }
    ,
    u.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }
    ,
    u.onotransitionend = function(t) {
        this.ontransitionend(t)
    }
    ;
    var l = {
        "-webkit-transform": "transform"
    };
    u.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn
              , n = l[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n],
            i(e.ingProperties) && this.disableTransition(),
            n in e.clean && (this.element.style[t.propertyName] = "",
            delete e.clean[n]),
            n in e.onEnd) {
                e.onEnd[n].call(this),
                delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }
    ,
    u.disableTransition = function() {
        this.removeTransitionStyles(),
        this.element.removeEventListener(a, this, !1),
        this.isTransitioning = !1
    }
    ,
    u._removeStyles = function(t) {
        var e = {};
        for (var i in t)
            e[i] = "";
        this.css(e)
    }
    ;
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return u.removeTransitionStyles = function() {
        this.css(c)
    }
    ,
    u.stagger = function(t) {
        t = isNaN(t) ? 0 : t,
        this.staggerDelay = t + "ms"
    }
    ,
    u.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
        this.css({
            display: ""
        }),
        this.emitEvent("remove", [this])
    }
    ,
    u.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }),
        void this.hide()) : void this.removeElem()
    }
    ,
    u.reveal = function() {
        delete this.isHidden,
        this.css({
            display: ""
        });
        var t = this.layout.options
          , e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd,
        this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }
    ,
    u.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }
    ,
    u.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity)
            return "opacity";
        for (var i in e)
            return i
    }
    ,
    u.hide = function() {
        this.isHidden = !0,
        this.css({
            display: ""
        });
        var t = this.layout.options
          , e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd,
        this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }
    ,
    u.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }),
        this.emitEvent("hide"))
    }
    ,
    u.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }
    ,
    n
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, n, o) {
    "use strict";
    function r(t, e) {
        var i = n.getQueryElement(t);
        if (!i)
            return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i,
        u && (this.$element = u(this.element)),
        this.options = n.extend({}, this.constructor.defaults),
        this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o,
        c[o] = this,
        this._create(),
        this._getOption("initLayout") && this.layout()
    }
    function s(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        e
    }
    function a(t) {
        if ("number" == typeof t)
            return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/)
          , i = e && e[1]
          , n = e && e[2];
        return i.length ? (i = parseFloat(i)) * (m[n] || 1) : 0
    }
    var h = t.console
      , u = t.jQuery
      , d = function() {}
      , l = 0
      , c = {};
    r.namespace = "outlayer",
    r.Item = o,
    r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var f = r.prototype;
    n.extend(f, e.prototype),
    f.option = function(t) {
        n.extend(this.options, t)
    }
    ,
    f._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }
    ,
    r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    },
    f._create = function() {
        this.reloadItems(),
        this.stamps = [],
        this.stamp(this.options.stamp),
        n.extend(this.element.style, this.options.containerStyle),
        this._getOption("resize") && this.bindResize()
    }
    ,
    f.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }
    ,
    f._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = e[o]
              , s = new i(r,this);
            n.push(s)
        }
        return n
    }
    ,
    f._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }
    ,
    f.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }
    ,
    f.layout = function() {
        this._resetLayout(),
        this._manageStamps();
        var t = this._getOption("layoutInstant")
          , e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e),
        this._isLayoutInited = !0
    }
    ,
    f._init = f.layout,
    f._resetLayout = function() {
        this.getSize()
    }
    ,
    f.getSize = function() {
        this.size = i(this.element)
    }
    ,
    f._getMeasurement = function(t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o),
        this[t] = n ? i(n)[e] : o) : this[t] = 0
    }
    ,
    f.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t),
        this._layoutItems(t, e),
        this._postLayout()
    }
    ,
    f._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }
    ,
    f._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t),
        t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t,
                n.isInstant = e || t.isLayoutInstant,
                i.push(n)
            }, this),
            this._processLayoutQueue(i)
        }
    }
    ,
    f._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }
    ,
    f._processLayoutQueue = function(t) {
        this.updateStagger(),
        t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }
    ,
    f.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t),
        this.stagger)
    }
    ,
    f._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger),
        t.moveTo(e, i))
    }
    ,
    f._postLayout = function() {
        this.resizeContainer()
    }
    ,
    f.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1))
        }
    }
    ,
    f._getContainerSize = d,
    f._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
            t = Math.max(t, 0),
            this.element.style[e ? "width" : "height"] = t + "px"
        }
    }
    ,
    f._emitCompleteOnItems = function(t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }
        function n() {
            ++s == r && i()
        }
        var o = this
          , r = e.length;
        if (!e || !r)
            return void i();
        var s = 0;
        e.forEach(function(e) {
            e.once(t, n)
        })
    }
    ,
    f.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n),
        u)
            if (this.$element = this.$element || u(this.element),
            e) {
                var o = u.Event(e);
                o.type = t,
                this.$element.trigger(o, i)
            } else
                this.$element.trigger(t, i)
    }
    ,
    f.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }
    ,
    f.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }
    ,
    f.stamp = function(t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t),
        t.forEach(this.ignore, this))
    }
    ,
    f.unstamp = function(t) {
        (t = this._find(t)) && t.forEach(function(t) {
            n.removeFrom(this.stamps, t),
            this.unignore(t)
        }, this)
    }
    ,
    f._find = function(t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
        t = n.makeArray(t)) : void 0
    }
    ,
    f._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(),
        this.stamps.forEach(this._manageStamp, this))
    }
    ,
    f._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect()
          , e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }
    ,
    f._manageStamp = d,
    f._getElementOffset = function(t) {
        var e = t.getBoundingClientRect()
          , n = this._boundingRect
          , o = i(t);
        return {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        }
    }
    ,
    f.handleEvent = n.handleEvent,
    f.bindResize = function() {
        t.addEventListener("resize", this),
        this.isResizeBound = !0
    }
    ,
    f.unbindResize = function() {
        t.removeEventListener("resize", this),
        this.isResizeBound = !1
    }
    ,
    f.onresize = function() {
        this.resize()
    }
    ,
    n.debounceMethod(r, "onresize", 100),
    f.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }
    ,
    f.needsResizeLayout = function() {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth
    }
    ,
    f.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)),
        e
    }
    ,
    f.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0),
        this.reveal(e))
    }
    ,
    f.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i)
        }
    }
    ,
    f.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t),
        t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e),
                t.reveal()
            })
        }
    }
    ,
    f.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t),
        t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e),
                t.hide()
            })
        }
    }
    ,
    f.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }
    ,
    f.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }
    ,
    f.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t)
                return i
        }
    }
    ,
    f.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this),
        e
    }
    ,
    f.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
        e && e.length && e.forEach(function(t) {
            t.remove(),
            n.removeFrom(this.items, t)
        }, this)
    }
    ,
    f.destroy = function() {
        var t = this.element.style;
        t.height = "",
        t.position = "",
        t.width = "",
        this.items.forEach(function(t) {
            t.destroy()
        }),
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
        delete this.element.outlayerGUID,
        u && u.removeData(this.element, this.constructor.namespace)
    }
    ,
    r.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e]
    }
    ,
    r.create = function(t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults),
        n.extend(i.defaults, e),
        i.compatOptions = n.extend({}, r.compatOptions),
        i.namespace = t,
        i.data = r.data,
        i.Item = s(o),
        n.htmlInit(i, t),
        u && u.bridget && u.bridget(t, i),
        i
    }
    ;
    var m = {
        ms: 1,
        s: 1e3
    };
    return r.Item = o,
    r
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function() {
        this.getSize(),
        this._getMeasurement("columnWidth", "outerWidth"),
        this._getMeasurement("gutter", "outerWidth"),
        this.measureColumns(),
        this.colYs = [];
        for (var t = 0; t < this.cols; t++)
            this.colYs.push(0);
        this.maxY = 0,
        this.horizontalColIndex = 0
    }
    ,
    n.measureColumns = function() {
        if (this.getContainerWidth(),
        !this.columnWidth) {
            var t = this.items[0]
              , i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter
          , o = this.containerWidth + this.gutter
          , r = o / n
          , s = n - o % n
          , a = s && 1 > s ? "round" : "floor";
        r = Math[a](r),
        this.cols = Math.max(r, 1)
    }
    ,
    n.getContainerWidth = function() {
        var t = this._getOption("fitWidth")
          , i = t ? this.element.parentNode : this.element
          , n = e(i);
        this.containerWidth = n && n.innerWidth
    }
    ,
    n._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth
          , i = e && 1 > e ? "round" : "ceil"
          , n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
            x: this.columnWidth * r.col,
            y: r.y
        }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++)
            this.colYs[u] = a;
        return s
    }
    ,
    n._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t)
          , i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }
    ,
    n._getTopColGroup = function(t) {
        if (2 > t)
            return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
            e[n] = this._getColGroupY(n, t);
        return e
    }
    ,
    n._getColGroupY = function(t, e) {
        if (2 > e)
            return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }
    ,
    n._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = t > 1 && i + t > this.cols ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex,
        {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }
    ,
    n._manageStamp = function(t) {
        var i = e(t)
          , n = this._getElementOffset(t)
          , o = this._getOption("originLeft")
          , r = o ? n.left : n.right
          , s = r + i.outerWidth
          , a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        h -= s % this.columnWidth ? 0 : 1,
        h = Math.min(this.cols - 1, h);
        for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++)
            this.colYs[l] = Math.max(d, this.colYs[l])
    }
    ,
    n._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()),
        t
    }
    ,
    n._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; )
            t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }
    ,
    n.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(),
        t != this.containerWidth
    }
    ,
    i
});
!function(e, t) {
    "function" == typeof define && define.amd ? define("sifter", t) : "object" == typeof exports ? module.exports = t() : e.Sifter = t()
}(this, function() {
    var e = function(e, t) {
        this.items = e,
        this.settings = t || {
            diacritics: !0
        }
    };
    e.prototype.tokenize = function(e) {
        if (!(e = o(String(e || "").toLowerCase())) || !e.length)
            return [];
        var t, n, i, s, l = [], p = e.split(/ +/);
        for (t = 0,
        n = p.length; t < n; t++) {
            if (i = r(p[t]),
            this.settings.diacritics)
                for (s in a)
                    a.hasOwnProperty(s) && (i = i.replace(new RegExp(s,"g"), a[s]));
            l.push({
                string: p[t],
                regex: new RegExp(i,"i")
            })
        }
        return l
    }
    ,
    e.prototype.iterator = function(e, t) {
        var n;
        n = s(e) ? Array.prototype.forEach || function(e) {
            for (var t = 0, n = this.length; t < n; t++)
                e(this[t], t, this)
        }
        : function(e) {
            for (var t in this)
                this.hasOwnProperty(t) && e(this[t], t, this)
        }
        ,
        n.apply(e, [t])
    }
    ,
    e.prototype.getScoreFunction = function(e, t) {
        var n, o, r, s, a;
        n = this,
        e = n.prepareSearch(e, t),
        r = e.tokens,
        o = e.options.fields,
        s = r.length,
        a = e.options.nesting;
        var l = function(e, t) {
            var n, i;
            return e ? (e = String(e || ""),
            i = e.search(t.regex),
            -1 === i ? 0 : (n = t.string.length / e.length,
            0 === i && (n += .5),
            n)) : 0
        }
          , p = function() {
            var e = o.length;
            return e ? 1 === e ? function(e, t) {
                return l(i(t, o[0], a), e)
            }
            : function(t, n) {
                for (var r = 0, s = 0; r < e; r++)
                    s += l(i(n, o[r], a), t);
                return s / e
            }
            : function() {
                return 0
            }
        }();
        return s ? 1 === s ? function(e) {
            return p(r[0], e)
        }
        : "and" === e.options.conjunction ? function(e) {
            for (var t, n = 0, i = 0; n < s; n++) {
                if ((t = p(r[n], e)) <= 0)
                    return 0;
                i += t
            }
            return i / s
        }
        : function(e) {
            for (var t = 0, n = 0; t < s; t++)
                n += p(r[t], e);
            return n / s
        }
        : function() {
            return 0
        }
    }
    ,
    e.prototype.getSortFunction = function(e, n) {
        var o, r, s, a, l, p, u, c, d, h, f;
        if (s = this,
        e = s.prepareSearch(e, n),
        f = !e.query && n.sort_empty || n.sort,
        d = function(e, t) {
            return "$score" === e ? t.score : i(s.items[t.id], e, n.nesting)
        }
        ,
        l = [],
        f)
            for (o = 0,
            r = f.length; o < r; o++)
                (e.query || "$score" !== f[o].field) && l.push(f[o]);
        if (e.query) {
            for (h = !0,
            o = 0,
            r = l.length; o < r; o++)
                if ("$score" === l[o].field) {
                    h = !1;
                    break
                }
            h && l.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
            for (o = 0,
            r = l.length; o < r; o++)
                if ("$score" === l[o].field) {
                    l.splice(o, 1);
                    break
                }
        for (c = [],
        o = 0,
        r = l.length; o < r; o++)
            c.push("desc" === l[o].direction ? -1 : 1);
        return p = l.length,
        p ? 1 === p ? (a = l[0].field,
        u = c[0],
        function(e, n) {
            return u * t(d(a, e), d(a, n))
        }
        ) : function(e, n) {
            var i, o, r;
            for (i = 0; i < p; i++)
                if (r = l[i].field,
                o = c[i] * t(d(r, e), d(r, n)))
                    return o;
            return 0
        }
        : null
    }
    ,
    e.prototype.prepareSearch = function(e, t) {
        if ("object" == typeof e)
            return e;
        t = n({}, t);
        var i = t.fields
          , o = t.sort
          , r = t.sort_empty;
        return i && !s(i) && (t.fields = [i]),
        o && !s(o) && (t.sort = [o]),
        r && !s(r) && (t.sort_empty = [r]),
        {
            options: t,
            query: String(e || "").toLowerCase(),
            tokens: this.tokenize(e),
            total: 0,
            items: []
        }
    }
    ,
    e.prototype.search = function(e, t) {
        var n, i, o, r, s = this;
        return i = this.prepareSearch(e, t),
        t = i.options,
        e = i.query,
        r = t.score || s.getScoreFunction(i),
        e.length ? s.iterator(s.items, function(e, o) {
            n = r(e),
            (!1 === t.filter || n > 0) && i.items.push({
                score: n,
                id: o
            })
        }) : s.iterator(s.items, function(e, t) {
            i.items.push({
                score: 1,
                id: t
            })
        }),
        o = s.getSortFunction(i, t),
        o && i.items.sort(o),
        i.total = i.items.length,
        "number" == typeof t.limit && (i.items = i.items.slice(0, t.limit)),
        i
    }
    ;
    var t = function(e, t) {
        return "number" == typeof e && "number" == typeof t ? e > t ? 1 : e < t ? -1 : 0 : (e = l(String(e || "")),
        t = l(String(t || "")),
        e > t ? 1 : t > e ? -1 : 0)
    }
      , n = function(e, t) {
        var n, i, o, r;
        for (n = 1,
        i = arguments.length; n < i; n++)
            if (r = arguments[n])
                for (o in r)
                    r.hasOwnProperty(o) && (e[o] = r[o]);
        return e
    }
      , i = function(e, t, n) {
        if (e && t) {
            if (!n)
                return e[t];
            for (var i = t.split("."); i.length && (e = e[i.shift()]); )
                ;
            return e
        }
    }
      , o = function(e) {
        return (e + "").replace(/^\s+|\s+$|/g, "")
    }
      , r = function(e) {
        return (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }
      , s = Array.isArray || "undefined" != typeof $ && $.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
      , a = {
        a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
        b: "[b␢βΒB฿𐌁ᛒ]",
        c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
        d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
        e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
        f: "[fƑƒḞḟ]",
        g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
        h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
        i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
        j: "[jȷĴĵɈɉʝɟʲ]",
        k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
        l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
        n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
        o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
        p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
        q: "[qꝖꝗʠɊɋꝘꝙq̃]",
        r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
        s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
        t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
        u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
        v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
        w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
        x: "[xẌẍẊẋχ]",
        y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
        z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
    }
      , l = function() {
        var e, t, n, i, o = "", r = {};
        for (n in a)
            if (a.hasOwnProperty(n))
                for (i = a[n].substring(2, a[n].length - 1),
                o += i,
                e = 0,
                t = i.length; e < t; e++)
                    r[i.charAt(e)] = n;
        var s = new RegExp("[" + o + "]","g");
        return function(e) {
            return e.replace(s, function(e) {
                return r[e]
            }).toLowerCase()
        }
    }();
    return e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("microplugin", t) : "object" == typeof exports ? module.exports = t() : e.MicroPlugin = t()
}(this, function() {
    var e = {};
    e.mixin = function(e) {
        e.plugins = {},
        e.prototype.initializePlugins = function(e) {
            var n, i, o, r = this, s = [];
            if (r.plugins = {
                names: [],
                settings: {},
                requested: {},
                loaded: {}
            },
            t.isArray(e))
                for (n = 0,
                i = e.length; n < i; n++)
                    "string" == typeof e[n] ? s.push(e[n]) : (r.plugins.settings[e[n].name] = e[n].options,
                    s.push(e[n].name));
            else if (e)
                for (o in e)
                    e.hasOwnProperty(o) && (r.plugins.settings[o] = e[o],
                    s.push(o));
            for (; s.length; )
                r.require(s.shift())
        }
        ,
        e.prototype.loadPlugin = function(t) {
            var n = this
              , i = n.plugins
              , o = e.plugins[t];
            if (!e.plugins.hasOwnProperty(t))
                throw new Error('Unable to find "' + t + '" plugin');
            i.requested[t] = !0,
            i.loaded[t] = o.fn.apply(n, [n.plugins.settings[t] || {}]),
            i.names.push(t)
        }
        ,
        e.prototype.require = function(e) {
            var t = this
              , n = t.plugins;
            if (!t.plugins.loaded.hasOwnProperty(e)) {
                if (n.requested[e])
                    throw new Error('Plugin has circular dependency ("' + e + '")');
                t.loadPlugin(e)
            }
            return n.loaded[e]
        }
        ,
        e.define = function(t, n) {
            e.plugins[t] = {
                name: t,
                fn: n
            }
        }
    }
    ;
    var t = {
        isArray: Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    };
    return e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("sifter"), require("microplugin")) : e.Selectize = t(e.jQuery, e.Sifter, e.MicroPlugin)
}(this, function(e, t, n) {
    "use strict";
    var i = function(e, t) {
        if ("string" != typeof t || t.length) {
            var n = "string" == typeof t ? new RegExp(t,"i") : t
              , i = function(e) {
                var t = 0;
                if (3 === e.nodeType) {
                    var o = e.data.search(n);
                    if (o >= 0 && e.data.length > 0) {
                        var r = e.data.match(n)
                          , s = document.createElement("span");
                        s.className = "highlight";
                        var a = e.splitText(o)
                          , l = (a.splitText(r[0].length),
                        a.cloneNode(!0));
                        s.appendChild(l),
                        a.parentNode.replaceChild(s, a),
                        t = 1
                    }
                } else if (1 === e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName))
                    for (var p = 0; p < e.childNodes.length; ++p)
                        p += i(e.childNodes[p]);
                return t
            };
            return e.each(function() {
                i(this)
            })
        }
    };
    e.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var e = this.parentNode;
            e.replaceChild(this.firstChild, this),
            e.normalize()
        }).end()
    }
    ;
    var o = function() {};
    o.prototype = {
        on: function(e, t) {
            this._events = this._events || {},
            this._events[e] = this._events[e] || [],
            this._events[e].push(t)
        },
        off: function(e, t) {
            var n = arguments.length;
            return 0 === n ? delete this._events : 1 === n ? delete this._events[e] : (this._events = this._events || {},
            void (e in this._events != 0 && this._events[e].splice(this._events[e].indexOf(t), 1)))
        },
        trigger: function(e) {
            if (this._events = this._events || {},
            e in this._events != 0)
                for (var t = 0; t < this._events[e].length; t++)
                    this._events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    },
    o.mixin = function(e) {
        for (var t = ["on", "off", "trigger"], n = 0; n < t.length; n++)
            e.prototype[t[n]] = o.prototype[t[n]]
    }
    ;
    var r = /Mac/.test(navigator.userAgent)
      , s = r ? 91 : 17
      , a = r ? 18 : 17
      , l = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity
      , p = function(e) {
        return void 0 !== e
    }
      , u = function(e) {
        return void 0 === e || null === e ? null : "boolean" == typeof e ? e ? "1" : "0" : e + ""
    }
      , c = function(e) {
        return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }
      , d = {};
    d.before = function(e, t, n) {
        var i = e[t];
        e[t] = function() {
            return n.apply(e, arguments),
            i.apply(e, arguments)
        }
    }
    ,
    d.after = function(e, t, n) {
        var i = e[t];
        e[t] = function() {
            var t = i.apply(e, arguments);
            return n.apply(e, arguments),
            t
        }
    }
    ;
    var h = function(e) {
        var t = !1;
        return function() {
            t || (t = !0,
            e.apply(this, arguments))
        }
    }
      , f = function(e, t) {
        var n;
        return function() {
            var i = this
              , o = arguments;
            window.clearTimeout(n),
            n = window.setTimeout(function() {
                e.apply(i, o)
            }, t)
        }
    }
      , g = function(e, t, n) {
        var i, o = e.trigger, r = {};
        e.trigger = function() {
            var n = arguments[0];
            return -1 === t.indexOf(n) ? o.apply(e, arguments) : void (r[n] = arguments)
        }
        ,
        n.apply(e, []),
        e.trigger = o;
        for (i in r)
            r.hasOwnProperty(i) && o.apply(e, r[i])
    }
      , v = function(e, t, n, i) {
        e.on(t, n, function(t) {
            for (var n = t.target; n && n.parentNode !== e[0]; )
                n = n.parentNode;
            return t.currentTarget = n,
            i.apply(this, [t])
        })
    }
      , m = function(e) {
        var t = {};
        if ("selectionStart"in e)
            t.start = e.selectionStart,
            t.length = e.selectionEnd - t.start;
        else if (document.selection) {
            e.focus();
            var n = document.selection.createRange()
              , i = document.selection.createRange().text.length;
            n.moveStart("character", -e.value.length),
            t.start = n.text.length - i,
            t.length = i
        }
        return t
    }
      , y = function(e, t, n) {
        var i, o, r = {};
        if (n)
            for (i = 0,
            o = n.length; i < o; i++)
                r[n[i]] = e.css(n[i]);
        else
            r = e.css();
        t.css(r)
    }
      , w = function(t, n) {
        if (!t)
            return 0;
        var i = e("<test>").css({
            position: "absolute",
            top: -99999,
            left: -99999,
            width: "auto",
            padding: 0,
            whiteSpace: "pre"
        }).text(t).appendTo("body");
        y(n, i, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
        var o = i.width();
        return i.remove(),
        o
    }
      , O = function(e) {
        var t = null
          , n = function(n, i) {
            var o, r, s, a, l, p, u, c;
            n = n || window.event || {},
            i = i || {},
            n.metaKey || n.altKey || (i.force || !1 !== e.data("grow")) && (o = e.val(),
            n.type && "keydown" === n.type.toLowerCase() && (r = n.keyCode,
            s = r >= 97 && r <= 122 || r >= 65 && r <= 90 || r >= 48 && r <= 57 || 32 === r,
            46 === r || 8 === r ? (c = m(e[0]),
            c.length ? o = o.substring(0, c.start) + o.substring(c.start + c.length) : 8 === r && c.start ? o = o.substring(0, c.start - 1) + o.substring(c.start + 1) : 46 === r && void 0 !== c.start && (o = o.substring(0, c.start) + o.substring(c.start + 1))) : s && (p = n.shiftKey,
            u = String.fromCharCode(n.keyCode),
            u = p ? u.toUpperCase() : u.toLowerCase(),
            o += u)),
            a = e.attr("placeholder"),
            !o && a && (o = a),
            (l = w(o, e) + 4) !== t && (t = l,
            e.width(l),
            e.triggerHandler("resize")))
        };
        e.on("keydown keyup update blur", n),
        n()
    }
      , C = function(e) {
        var t = document.createElement("div");
        return t.appendChild(e.cloneNode(!0)),
        t.innerHTML
    }
      , $ = function(n, i) {
        var o, r, s, a, l = this;
        a = n[0],
        a.selectize = l;
        var p = window.getComputedStyle && window.getComputedStyle(a, null);
        if (s = p ? p.getPropertyValue("direction") : a.currentStyle && a.currentStyle.direction,
        s = s || n.parents("[dir]:first").attr("dir") || "",
        e.extend(l, {
            order: 0,
            settings: i,
            $input: n,
            tabIndex: n.attr("tabindex") || "",
            tagType: "select" === a.tagName.toLowerCase() ? 1 : 2,
            rtl: /rtl/i.test(s),
            eventNS: ".selectize" + ++$.count,
            highlightedValue: null,
            isOpen: !1,
            isDisabled: !1,
            isRequired: n.is("[required]"),
            isInvalid: !1,
            isLocked: !1,
            isFocused: !1,
            isInputHidden: !1,
            isSetup: !1,
            isShiftDown: !1,
            isCmdDown: !1,
            isCtrlDown: !1,
            ignoreFocus: !1,
            ignoreBlur: !1,
            ignoreHover: !1,
            hasOptions: !1,
            currentResults: null,
            lastValue: "",
            caretPos: 0,
            loading: 0,
            loadedSearches: {},
            $activeOption: null,
            $activeItems: [],
            optgroups: {},
            options: {},
            userOptions: {},
            items: [],
            renderCache: {},
            onSearchChange: null === i.loadThrottle ? l.onSearchChange : f(l.onSearchChange, i.loadThrottle)
        }),
        l.sifter = new t(this.options,{
            diacritics: i.diacritics
        }),
        l.settings.options) {
            for (o = 0,
            r = l.settings.options.length; o < r; o++)
                l.registerOption(l.settings.options[o]);
            delete l.settings.options
        }
        if (l.settings.optgroups) {
            for (o = 0,
            r = l.settings.optgroups.length; o < r; o++)
                l.registerOptionGroup(l.settings.optgroups[o]);
            delete l.settings.optgroups
        }
        l.settings.mode = l.settings.mode || (1 === l.settings.maxItems ? "single" : "multi"),
        "boolean" != typeof l.settings.hideSelected && (l.settings.hideSelected = "multi" === l.settings.mode),
        l.initializePlugins(l.settings.plugins),
        l.setupCallbacks(),
        l.setupTemplates(),
        l.setup()
    };
    return o.mixin($),
    void 0 !== n ? n.mixin($) : function(e, t) {
        t || (t = {});
        console.error("Selectize: " + e),
        t.explanation && (console.group && console.group(),
        console.error(t.explanation),
        console.group && console.groupEnd())
    }("Dependency MicroPlugin is missing", {
        explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'
    }),
    e.extend($.prototype, {
        setup: function() {
            var t, n, i, o, p, u, c, d, h, f, g = this, m = g.settings, y = g.eventNS, w = e(window), C = e(document), $ = g.$input;
            if (c = g.settings.mode,
            d = $.attr("class") || "",
            t = e("<div>").addClass(m.wrapperClass).addClass(d).addClass(c),
            n = e("<div>").addClass(m.inputClass).addClass("items").appendTo(t),
            i = e('<input type="text" autocomplete="off" />').appendTo(n).attr("tabindex", $.is(":disabled") ? "-1" : g.tabIndex),
            u = e(m.dropdownParent || t),
            o = e("<div>").addClass(m.dropdownClass).addClass(c).hide().appendTo(u),
            p = e("<div>").addClass(m.dropdownContentClass).appendTo(o),
            (f = $.attr("id")) && (i.attr("id", f + "-selectized"),
            e("label[for='" + f + "']").attr("for", f + "-selectized")),
            g.settings.copyClassesToDropdown && o.addClass(d),
            t.css({
                width: $[0].style.width
            }),
            g.plugins.names.length && (h = "plugin-" + g.plugins.names.join(" plugin-"),
            t.addClass(h),
            o.addClass(h)),
            (null === m.maxItems || m.maxItems > 1) && 1 === g.tagType && $.attr("multiple", "multiple"),
            g.settings.placeholder && i.attr("placeholder", m.placeholder),
            !g.settings.splitOn && g.settings.delimiter) {
                var b = g.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                g.settings.splitOn = new RegExp("\\s*" + b + "+\\s*")
            }
            $.attr("autocorrect") && i.attr("autocorrect", $.attr("autocorrect")),
            $.attr("autocapitalize") && i.attr("autocapitalize", $.attr("autocapitalize")),
            g.$wrapper = t,
            g.$control = n,
            g.$control_input = i,
            g.$dropdown = o,
            g.$dropdown_content = p,
            o.on("mouseenter", "[data-selectable]", function() {
                return g.onOptionHover.apply(g, arguments)
            }),
            o.on("mousedown click", "[data-selectable]", function() {
                return g.onOptionSelect.apply(g, arguments)
            }),
            v(n, "mousedown", "*:not(input)", function() {
                return g.onItemSelect.apply(g, arguments)
            }),
            O(i),
            n.on({
                mousedown: function() {
                    return g.onMouseDown.apply(g, arguments)
                },
                click: function() {
                    return g.onClick.apply(g, arguments)
                }
            }),
            i.on({
                mousedown: function(e) {
                    e.stopPropagation()
                },
                keydown: function() {
                    return g.onKeyDown.apply(g, arguments)
                },
                keyup: function() {
                    return g.onKeyUp.apply(g, arguments)
                },
                keypress: function() {
                    return g.onKeyPress.apply(g, arguments)
                },
                resize: function() {
                    g.positionDropdown.apply(g, [])
                },
                blur: function() {
                    return g.onBlur.apply(g, arguments)
                },
                focus: function() {
                    return g.ignoreBlur = !1,
                    g.onFocus.apply(g, arguments)
                },
                paste: function() {
                    return g.onPaste.apply(g, arguments)
                }
            }),
            C.on("keydown" + y, function(e) {
                g.isCmdDown = e[r ? "metaKey" : "ctrlKey"],
                g.isCtrlDown = e[r ? "altKey" : "ctrlKey"],
                g.isShiftDown = e.shiftKey
            }),
            C.on("keyup" + y, function(e) {
                e.keyCode === a && (g.isCtrlDown = !1),
                16 === e.keyCode && (g.isShiftDown = !1),
                e.keyCode === s && (g.isCmdDown = !1)
            }),
            C.on("mousedown" + y, function(e) {
                if (g.isFocused) {
                    if (e.target === g.$dropdown[0] || e.target.parentNode === g.$dropdown[0])
                        return !1;
                    g.$control.has(e.target).length || e.target === g.$control[0] || g.blur(e.target)
                }
            }),
            w.on(["scroll" + y, "resize" + y].join(" "), function() {
                g.isOpen && g.positionDropdown.apply(g, arguments)
            }),
            w.on("mousemove" + y, function() {
                g.ignoreHover = !1
            }),
            this.revertSettings = {
                $children: $.children().detach(),
                tabindex: $.attr("tabindex")
            },
            $.attr("tabindex", -1).hide().after(g.$wrapper),
            e.isArray(m.items) && (g.setValue(m.items),
            delete m.items),
            l && $.on("invalid" + y, function(e) {
                e.preventDefault(),
                g.isInvalid = !0,
                g.refreshState()
            }),
            g.updateOriginalInput(),
            g.refreshItems(),
            g.refreshState(),
            g.updatePlaceholder(),
            g.isSetup = !0,
            $.is(":disabled") && g.disable(),
            g.on("change", this.onChange),
            $.data("selectize", g),
            $.addClass("selectized"),
            g.trigger("initialize"),
            !0 === m.preload && g.onSearchChange("")
        },
        setupTemplates: function() {
            var t = this
              , n = t.settings.labelField
              , i = t.settings.optgroupLabelField
              , o = {
                optgroup: function(e) {
                    return '<div class="optgroup">' + e.html + "</div>"
                },
                optgroup_header: function(e, t) {
                    return '<div class="optgroup-header">' + t(e[i]) + "</div>"
                },
                option: function(e, t) {
                    return '<div class="option">' + t(e[n]) + "</div>"
                },
                item: function(e, t) {
                    return '<div class="item">' + t(e[n]) + "</div>"
                },
                option_create: function(e, t) {
                    return '<div class="create">Add <strong>' + t(e.input) + "</strong>&hellip;</div>"
                }
            };
            t.settings.render = e.extend({}, o, t.settings.render)
        },
        setupCallbacks: function() {
            var e, t, n = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (e in n)
                n.hasOwnProperty(e) && (t = this.settings[n[e]]) && this.on(e, t)
        },
        onClick: function(e) {
            var t = this;
            t.isFocused || (t.focus(),
            e.preventDefault())
        },
        onMouseDown: function(t) {
            var n = this
              , i = t.isDefaultPrevented();
            if (e(t.target),
            n.isFocused) {
                if (t.target !== n.$control_input[0])
                    return "single" === n.settings.mode ? n.isOpen ? n.close() : n.open() : i || n.setActiveItem(null),
                    !1
            } else
                i || window.setTimeout(function() {
                    n.focus()
                }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(t) {
            var n = this;
            return n.isFull() || n.isInputHidden || n.isLocked ? void t.preventDefault() : void (n.settings.splitOn && setTimeout(function() {
                var t = n.$control_input.val();
                if (t.match(n.settings.splitOn))
                    for (var i = e.trim(t).split(n.settings.splitOn), o = 0, r = i.length; o < r; o++)
                        n.createItem(i[o])
            }, 0))
        },
        onKeyPress: function(e) {
            if (this.isLocked)
                return e && e.preventDefault();
            var t = String.fromCharCode(e.keyCode || e.which);
            return this.settings.create && "multi" === this.settings.mode && t === this.settings.delimiter ? (this.createItem(),
            e.preventDefault(),
            !1) : void 0
        },
        onKeyDown: function(e) {
            var t = (e.target,
            this.$control_input[0],
            this);
            if (t.isLocked)
                return void (9 !== e.keyCode && e.preventDefault());
            switch (e.keyCode) {
            case 65:
                if (t.isCmdDown)
                    return void t.selectAll();
                break;
            case 27:
                return void (t.isOpen && (e.preventDefault(),
                e.stopPropagation(),
                t.close()));
            case 78:
                if (!e.ctrlKey || e.altKey)
                    break;
            case 40:
                if (!t.isOpen && t.hasOptions)
                    t.open();
                else if (t.$activeOption) {
                    t.ignoreHover = !0;
                    var n = t.getAdjacentOption(t.$activeOption, 1);
                    n.length && t.setActiveOption(n, !0, !0)
                }
                return void e.preventDefault();
            case 80:
                if (!e.ctrlKey || e.altKey)
                    break;
            case 38:
                if (t.$activeOption) {
                    t.ignoreHover = !0;
                    var i = t.getAdjacentOption(t.$activeOption, -1);
                    i.length && t.setActiveOption(i, !0, !0)
                }
                return void e.preventDefault();
            case 13:
                return void (t.isOpen && t.$activeOption && (t.onOptionSelect({
                    currentTarget: t.$activeOption
                }),
                e.preventDefault()));
            case 37:
                return void t.advanceSelection(-1, e);
            case 39:
                return void t.advanceSelection(1, e);
            case 9:
                return t.settings.selectOnTab && t.isOpen && t.$activeOption && (t.onOptionSelect({
                    currentTarget: t.$activeOption
                }),
                t.isFull() || e.preventDefault()),
                void (t.settings.create && t.createItem() && e.preventDefault());
            case 8:
            case 46:
                return void t.deleteSelection(e)
            }
            return !t.isFull() && !t.isInputHidden || (r ? e.metaKey : e.ctrlKey) ? void 0 : void e.preventDefault()
        },
        onKeyUp: function(e) {
            var t = this;
            if (t.isLocked)
                return e && e.preventDefault();
            var n = t.$control_input.val() || "";
            t.lastValue !== n && (t.lastValue = n,
            t.onSearchChange(n),
            t.refreshOptions(),
            t.trigger("type", n))
        },
        onSearchChange: function(e) {
            var t = this
              , n = t.settings.load;
            n && (t.loadedSearches.hasOwnProperty(e) || (t.loadedSearches[e] = !0,
            t.load(function(i) {
                n.apply(t, [e, i])
            })))
        },
        onFocus: function(e) {
            var t = this
              , n = t.isFocused;
            return t.isDisabled ? (t.blur(),
            e && e.preventDefault(),
            !1) : void (t.ignoreFocus || (t.isFocused = !0,
            "focus" === t.settings.preload && t.onSearchChange(""),
            n || t.trigger("focus"),
            t.$activeItems.length || (t.showInput(),
            t.setActiveItem(null),
            t.refreshOptions(!!t.settings.openOnFocus)),
            t.refreshState()))
        },
        onBlur: function(e, t) {
            var n = this;
            if (n.isFocused && (n.isFocused = !1,
            !n.ignoreFocus)) {
                if (!n.ignoreBlur && document.activeElement === n.$dropdown_content[0])
                    return n.ignoreBlur = !0,
                    void n.onFocus(e);
                var i = function() {
                    n.close(),
                    n.setTextboxValue(""),
                    n.setActiveItem(null),
                    n.setActiveOption(null),
                    n.setCaret(n.items.length),
                    n.refreshState(),
                    t && t.focus && t.focus(),
                    n.ignoreFocus = !1,
                    n.trigger("blur")
                };
                n.ignoreFocus = !0,
                n.settings.create && n.settings.createOnBlur ? n.createItem(null, !1, i) : i()
            }
        },
        onOptionHover: function(e) {
            this.ignoreHover || this.setActiveOption(e.currentTarget, !1)
        },
        onOptionSelect: function(t) {
            var n, i, o = this;
            t.preventDefault && (t.preventDefault(),
            t.stopPropagation()),
            i = e(t.currentTarget),
            i.hasClass("create") ? o.createItem(null, function() {
                o.settings.closeAfterSelect && o.close()
            }) : void 0 !== (n = i.attr("data-value")) && (o.lastQuery = null,
            o.setTextboxValue(""),
            o.addItem(n),
            o.settings.closeAfterSelect ? o.close() : !o.settings.hideSelected && t.type && /mouse/.test(t.type) && o.setActiveOption(o.getOption(n)))
        },
        onItemSelect: function(e) {
            var t = this;
            t.isLocked || "multi" === t.settings.mode && (e.preventDefault(),
            t.setActiveItem(e.currentTarget, e))
        },
        load: function(e) {
            var t = this
              , n = t.$wrapper.addClass(t.settings.loadingClass);
            t.loading++,
            e.apply(t, [function(e) {
                t.loading = Math.max(t.loading - 1, 0),
                e && e.length && (t.addOption(e),
                t.refreshOptions(t.isFocused && !t.isInputHidden)),
                t.loading || n.removeClass(t.settings.loadingClass),
                t.trigger("load", e)
            }
            ])
        },
        setTextboxValue: function(e) {
            var t = this.$control_input;
            t.val() !== e && (t.val(e).triggerHandler("update"),
            this.lastValue = e)
        },
        getValue: function() {
            return 1 === this.tagType && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(e, t) {
            g(this, t ? [] : ["change"], function() {
                this.clear(t),
                this.addItems(e, t)
            })
        },
        setActiveItem: function(t, n) {
            var i, o, r, s, a, l, p, u, c = this;
            if ("single" !== c.settings.mode) {
                if (t = e(t),
                !t.length)
                    return e(c.$activeItems).removeClass("active"),
                    c.$activeItems = [],
                    void (c.isFocused && c.showInput());
                if ("mousedown" === (i = n && n.type.toLowerCase()) && c.isShiftDown && c.$activeItems.length) {
                    for (u = c.$control.children(".active:last"),
                    s = Array.prototype.indexOf.apply(c.$control[0].childNodes, [u[0]]),
                    a = Array.prototype.indexOf.apply(c.$control[0].childNodes, [t[0]]),
                    s > a && (p = s,
                    s = a,
                    a = p),
                    o = s; o <= a; o++)
                        l = c.$control[0].childNodes[o],
                        -1 === c.$activeItems.indexOf(l) && (e(l).addClass("active"),
                        c.$activeItems.push(l));
                    n.preventDefault()
                } else
                    "mousedown" === i && c.isCtrlDown || "keydown" === i && this.isShiftDown ? t.hasClass("active") ? (r = c.$activeItems.indexOf(t[0]),
                    c.$activeItems.splice(r, 1),
                    t.removeClass("active")) : c.$activeItems.push(t.addClass("active")[0]) : (e(c.$activeItems).removeClass("active"),
                    c.$activeItems = [t.addClass("active")[0]]);
                c.hideInput(),
                this.isFocused || c.focus()
            }
        },
        setActiveOption: function(t, n, i) {
            var o, r, s, a, l, u = this;
            u.$activeOption && u.$activeOption.removeClass("active"),
            u.$activeOption = null,
            t = e(t),
            t.length && (u.$activeOption = t.addClass("active"),
            !n && p(n) || (o = u.$dropdown_content.height(),
            r = u.$activeOption.outerHeight(!0),
            n = u.$dropdown_content.scrollTop() || 0,
            s = u.$activeOption.offset().top - u.$dropdown_content.offset().top + n,
            a = s,
            l = s - o + r,
            s + r > o + n ? u.$dropdown_content.stop().animate({
                scrollTop: l
            }, i ? u.settings.scrollDuration : 0) : s < n && u.$dropdown_content.stop().animate({
                scrollTop: a
            }, i ? u.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var e = this;
            "single" !== e.settings.mode && (e.$activeItems = Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")),
            e.$activeItems.length && (e.hideInput(),
            e.close()),
            e.focus())
        },
        hideInput: function() {
            var e = this;
            e.setTextboxValue(""),
            e.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: e.rtl ? 1e4 : -1e4
            }),
            e.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            }),
            this.isInputHidden = !1
        },
        focus: function() {
            var e = this;
            e.isDisabled || (e.ignoreFocus = !0,
            e.$control_input[0].focus(),
            window.setTimeout(function() {
                e.ignoreFocus = !1,
                e.onFocus()
            }, 0))
        },
        blur: function(e) {
            this.$control_input[0].blur(),
            this.onBlur(null, e)
        },
        getScoreFunction: function(e) {
            return this.sifter.getScoreFunction(e, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var e = this.settings
              , t = e.sortField;
            return "string" == typeof t && (t = [{
                field: t
            }]),
            {
                fields: e.searchField,
                conjunction: e.searchConjunction,
                sort: t
            }
        },
        search: function(t) {
            var n, i, o, r = this, s = r.settings, a = this.getSearchOptions();
            if (s.score && "function" != typeof (o = r.settings.score.apply(this, [t])))
                throw new Error('Selectize "score" setting must be a function that returns a function');
            if (t !== r.lastQuery ? (r.lastQuery = t,
            i = r.sifter.search(t, e.extend(a, {
                score: o
            })),
            r.currentResults = i) : i = e.extend(!0, {}, r.currentResults),
            s.hideSelected)
                for (n = i.items.length - 1; n >= 0; n--)
                    -1 !== r.items.indexOf(u(i.items[n].id)) && i.items.splice(n, 1);
            return i
        },
        refreshOptions: function(t) {
            var n, o, r, s, a, l, p, c, d, h, f, g, v, m, y, w;
            void 0 === t && (t = !0);
            var O = this
              , $ = e.trim(O.$control_input.val())
              , b = O.search($)
              , x = O.$dropdown_content
              , S = O.$activeOption && u(O.$activeOption.attr("data-value"));
            for (s = b.items.length,
            "number" == typeof O.settings.maxOptions && (s = Math.min(s, O.settings.maxOptions)),
            a = {},
            l = [],
            n = 0; n < s; n++)
                for (p = O.options[b.items[n].id],
                c = O.render("option", p),
                d = p[O.settings.optgroupField] || "",
                h = e.isArray(d) ? d : [d],
                o = 0,
                r = h && h.length; o < r; o++)
                    d = h[o],
                    O.optgroups.hasOwnProperty(d) || (d = ""),
                    a.hasOwnProperty(d) || (a[d] = document.createDocumentFragment(),
                    l.push(d)),
                    a[d].appendChild(c);
            for (this.settings.lockOptgroupOrder && l.sort(function(e, t) {
                return (O.optgroups[e].$order || 0) - (O.optgroups[t].$order || 0)
            }),
            f = document.createDocumentFragment(),
            n = 0,
            s = l.length; n < s; n++)
                d = l[n],
                O.optgroups.hasOwnProperty(d) && a[d].childNodes.length ? (g = document.createDocumentFragment(),
                g.appendChild(O.render("optgroup_header", O.optgroups[d])),
                g.appendChild(a[d]),
                f.appendChild(O.render("optgroup", e.extend({}, O.optgroups[d], {
                    html: C(g),
                    dom: g
                })))) : f.appendChild(a[d]);
            if (x.html(f),
            O.settings.highlight && b.query.length && b.tokens.length)
                for (x.removeHighlight(),
                n = 0,
                s = b.tokens.length; n < s; n++)
                    i(x, b.tokens[n].regex);
            if (!O.settings.hideSelected)
                for (n = 0,
                s = O.items.length; n < s; n++)
                    O.getOption(O.items[n]).addClass("selected");
            v = O.canCreate($),
            v && (x.prepend(O.render("option_create", {
                input: $
            })),
            w = e(x[0].childNodes[0])),
            O.hasOptions = b.items.length > 0 || v,
            O.hasOptions ? (b.items.length > 0 ? (y = S && O.getOption(S),
            y && y.length ? m = y : "single" === O.settings.mode && O.items.length && (m = O.getOption(O.items[0])),
            m && m.length || (m = w && !O.settings.addPrecedence ? O.getAdjacentOption(w, 1) : x.find("[data-selectable]:first"))) : m = w,
            O.setActiveOption(m),
            t && !O.isOpen && O.open()) : (O.setActiveOption(null),
            t && O.isOpen && O.close())
        },
        addOption: function(t) {
            var n, i, o, r = this;
            if (e.isArray(t))
                for (n = 0,
                i = t.length; n < i; n++)
                    r.addOption(t[n]);
            else
                (o = r.registerOption(t)) && (r.userOptions[o] = !0,
                r.lastQuery = null,
                r.trigger("option_add", o, t))
        },
        registerOption: function(e) {
            var t = u(e[this.settings.valueField]);
            return void 0 !== t && null !== t && !this.options.hasOwnProperty(t) && (e.$order = e.$order || ++this.order,
            this.options[t] = e,
            t)
        },
        registerOptionGroup: function(e) {
            var t = u(e[this.settings.optgroupValueField]);
            return !!t && (e.$order = e.$order || ++this.order,
            this.optgroups[t] = e,
            t)
        },
        addOptionGroup: function(e, t) {
            t[this.settings.optgroupValueField] = e,
            (e = this.registerOptionGroup(t)) && this.trigger("optgroup_add", e, t)
        },
        removeOptionGroup: function(e) {
            this.optgroups.hasOwnProperty(e) && (delete this.optgroups[e],
            this.renderCache = {},
            this.trigger("optgroup_remove", e))
        },
        clearOptionGroups: function() {
            this.optgroups = {},
            this.renderCache = {},
            this.trigger("optgroup_clear")
        },
        updateOption: function(t, n) {
            var i, o, r, s, a, l, p, c = this;
            if (t = u(t),
            r = u(n[c.settings.valueField]),
            null !== t && c.options.hasOwnProperty(t)) {
                if ("string" != typeof r)
                    throw new Error("Value must be set in option data");
                p = c.options[t].$order,
                r !== t && (delete c.options[t],
                -1 !== (s = c.items.indexOf(t)) && c.items.splice(s, 1, r)),
                n.$order = n.$order || p,
                c.options[r] = n,
                a = c.renderCache.item,
                l = c.renderCache.option,
                a && (delete a[t],
                delete a[r]),
                l && (delete l[t],
                delete l[r]),
                -1 !== c.items.indexOf(r) && (i = c.getItem(t),
                o = e(c.render("item", n)),
                i.hasClass("active") && o.addClass("active"),
                i.replaceWith(o)),
                c.lastQuery = null,
                c.isOpen && c.refreshOptions(!1)
            }
        },
        removeOption: function(e, t) {
            var n = this;
            e = u(e);
            var i = n.renderCache.item
              , o = n.renderCache.option;
            i && delete i[e],
            o && delete o[e],
            delete n.userOptions[e],
            delete n.options[e],
            n.lastQuery = null,
            n.trigger("option_remove", e),
            n.removeItem(e, t)
        },
        clearOptions: function() {
            var e = this;
            e.loadedSearches = {},
            e.userOptions = {},
            e.renderCache = {},
            e.options = e.sifter.items = {},
            e.lastQuery = null,
            e.trigger("option_clear"),
            e.clear()
        },
        getOption: function(e) {
            return this.getElementWithValue(e, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(t, n) {
            var i = this.$dropdown.find("[data-selectable]")
              , o = i.index(t) + n;
            return o >= 0 && o < i.length ? i.eq(o) : e()
        },
        getElementWithValue: function(t, n) {
            if (void 0 !== (t = u(t)) && null !== t)
                for (var i = 0, o = n.length; i < o; i++)
                    if (n[i].getAttribute("data-value") === t)
                        return e(n[i]);
            return e()
        },
        getItem: function(e) {
            return this.getElementWithValue(e, this.$control.children())
        },
        addItems: function(t, n) {
            for (var i = e.isArray(t) ? t : [t], o = 0, r = i.length; o < r; o++)
                this.isPending = o < r - 1,
                this.addItem(i[o], n)
        },
        addItem: function(t, n) {
            g(this, n ? [] : ["change"], function() {
                var i, o, r, s, a, l = this, p = l.settings.mode;
                return t = u(t),
                -1 !== l.items.indexOf(t) ? void ("single" === p && l.close()) : void (l.options.hasOwnProperty(t) && ("single" === p && l.clear(n),
                "multi" === p && l.isFull() || (i = e(l.render("item", l.options[t])),
                a = l.isFull(),
                l.items.splice(l.caretPos, 0, t),
                l.insertAtCaret(i),
                (!l.isPending || !a && l.isFull()) && l.refreshState(),
                l.isSetup && (r = l.$dropdown_content.find("[data-selectable]"),
                l.isPending || (o = l.getOption(t),
                s = l.getAdjacentOption(o, 1).attr("data-value"),
                l.refreshOptions(l.isFocused && "single" !== p),
                s && l.setActiveOption(l.getOption(s))),
                !r.length || l.isFull() ? l.close() : l.positionDropdown(),
                l.updatePlaceholder(),
                l.trigger("item_add", t, i),
                l.updateOriginalInput({
                    silent: n
                })))))
            })
        },
        removeItem: function(t, n) {
            var i, o, r, s = this;
            i = t instanceof e ? t : s.getItem(t),
            t = u(i.attr("data-value")),
            -1 !== (o = s.items.indexOf(t)) && (i.remove(),
            i.hasClass("active") && (r = s.$activeItems.indexOf(i[0]),
            s.$activeItems.splice(r, 1)),
            s.items.splice(o, 1),
            s.lastQuery = null,
            !s.settings.persist && s.userOptions.hasOwnProperty(t) && s.removeOption(t, n),
            o < s.caretPos && s.setCaret(s.caretPos - 1),
            s.refreshState(),
            s.updatePlaceholder(),
            s.updateOriginalInput({
                silent: n
            }),
            s.positionDropdown(),
            s.trigger("item_remove", t, i))
        },
        createItem: function(t, n) {
            var i = this
              , o = i.caretPos;
            t = t || e.trim(i.$control_input.val() || "");
            var r = arguments[arguments.length - 1];
            if ("function" != typeof r && (r = function() {}
            ),
            "boolean" != typeof n && (n = !0),
            !i.canCreate(t))
                return r(),
                !1;
            i.lock();
            var s = "function" == typeof i.settings.create ? this.settings.create : function(e) {
                var t = {};
                return t[i.settings.labelField] = e,
                t[i.settings.valueField] = e,
                t
            }
              , a = h(function(e) {
                if (i.unlock(),
                !e || "object" != typeof e)
                    return r();
                var t = u(e[i.settings.valueField]);
                return "string" != typeof t ? r() : (i.setTextboxValue(""),
                i.addOption(e),
                i.setCaret(o),
                i.addItem(t),
                i.refreshOptions(n && "single" !== i.settings.mode),
                void r(e))
            })
              , l = s.apply(this, [t, a]);
            return void 0 !== l && a(l),
            !0
        },
        refreshItems: function() {
            this.lastQuery = null,
            this.isSetup && this.addItem(this.items),
            this.refreshState(),
            this.updateOriginalInput()
        },
        refreshState: function() {
            this.refreshValidityState(),
            this.refreshClasses()
        },
        refreshValidityState: function() {
            if (!this.isRequired)
                return !1;
            var e = !this.items.length;
            this.isInvalid = e,
            this.$control_input.prop("required", e),
            this.$input.prop("required", !e)
        },
        refreshClasses: function() {
            var t = this
              , n = t.isFull()
              , i = t.isLocked;
            t.$wrapper.toggleClass("rtl", t.rtl),
            t.$control.toggleClass("focus", t.isFocused).toggleClass("disabled", t.isDisabled).toggleClass("required", t.isRequired).toggleClass("invalid", t.isInvalid).toggleClass("locked", i).toggleClass("full", n).toggleClass("not-full", !n).toggleClass("input-active", t.isFocused && !t.isInputHidden).toggleClass("dropdown-active", t.isOpen).toggleClass("has-options", !e.isEmptyObject(t.options)).toggleClass("has-items", t.items.length > 0),
            t.$control_input.data("grow", !n && !i)
        },
        isFull: function() {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function(e) {
            var t, n, i, o, r = this;
            if (e = e || {},
            1 === r.tagType) {
                for (i = [],
                t = 0,
                n = r.items.length; t < n; t++)
                    o = r.options[r.items[t]][r.settings.labelField] || "",
                    i.push('<option value="' + c(r.items[t]) + '" selected="selected">' + c(o) + "</option>");
                i.length || this.$input.attr("multiple") || i.push('<option value="" selected="selected"></option>'),
                r.$input.html(i.join(""))
            } else
                r.$input.val(r.getValue()),
                r.$input.attr("value", r.$input.val());
            r.isSetup && (e.silent || r.trigger("change", r.$input.val()))
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var e = this.$control_input;
                this.items.length ? e.removeAttr("placeholder") : e.attr("placeholder", this.settings.placeholder),
                e.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var e = this;
            e.isLocked || e.isOpen || "multi" === e.settings.mode && e.isFull() || (e.focus(),
            e.isOpen = !0,
            e.refreshState(),
            e.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }),
            e.positionDropdown(),
            e.$dropdown.css({
                visibility: "visible"
            }),
            e.trigger("dropdown_open", e.$dropdown))
        },
        close: function() {
            var e = this
              , t = e.isOpen;
            "single" === e.settings.mode && e.items.length && (e.hideInput(),
            e.$control_input.blur()),
            e.isOpen = !1,
            e.$dropdown.hide(),
            e.setActiveOption(null),
            e.refreshState(),
            t && e.trigger("dropdown_close", e.$dropdown)
        },
        positionDropdown: function() {
            var e = this.$control
              , t = "body" === this.settings.dropdownParent ? e.offset() : e.position();
            t.top += e.outerHeight(!0),
            this.$dropdown.css({
                width: e.outerWidth(),
                top: t.top,
                left: t.left
            })
        },
        clear: function(e) {
            var t = this;
            t.items.length && (t.$control.children(":not(input)").remove(),
            t.items = [],
            t.lastQuery = null,
            t.setCaret(0),
            t.setActiveItem(null),
            t.updatePlaceholder(),
            t.updateOriginalInput({
                silent: e
            }),
            t.refreshState(),
            t.showInput(),
            t.trigger("clear"))
        },
        insertAtCaret: function(t) {
            var n = Math.min(this.caretPos, this.items.length);
            0 === n ? this.$control.prepend(t) : e(this.$control[0].childNodes[n]).before(t),
            this.setCaret(n + 1)
        },
        deleteSelection: function(t) {
            var n, i, o, r, s, a, l, p, u, c = this;
            if (o = t && 8 === t.keyCode ? -1 : 1,
            r = m(c.$control_input[0]),
            c.$activeOption && !c.settings.hideSelected && (l = c.getAdjacentOption(c.$activeOption, -1).attr("data-value")),
            s = [],
            c.$activeItems.length) {
                for (u = c.$control.children(".active:" + (o > 0 ? "last" : "first")),
                a = c.$control.children(":not(input)").index(u),
                o > 0 && a++,
                n = 0,
                i = c.$activeItems.length; n < i; n++)
                    s.push(e(c.$activeItems[n]).attr("data-value"));
                t && (t.preventDefault(),
                t.stopPropagation())
            } else
                (c.isFocused || "single" === c.settings.mode) && c.items.length && (o < 0 && 0 === r.start && 0 === r.length ? s.push(c.items[c.caretPos - 1]) : o > 0 && r.start === c.$control_input.val().length && s.push(c.items[c.caretPos]));
            if (!s.length || "function" == typeof c.settings.onDelete && !1 === c.settings.onDelete.apply(c, [s]))
                return !1;
            for (void 0 !== a && c.setCaret(a); s.length; )
                c.removeItem(s.pop());
            return c.showInput(),
            c.positionDropdown(),
            c.refreshOptions(!0),
            l && (p = c.getOption(l),
            p.length && c.setActiveOption(p)),
            !0
        },
        advanceSelection: function(e, t) {
            var n, i, o, r, s, a = this;
            0 !== e && (a.rtl && (e *= -1),
            n = e > 0 ? "last" : "first",
            i = m(a.$control_input[0]),
            a.isFocused && !a.isInputHidden ? (r = a.$control_input.val().length,
            (e < 0 ? 0 === i.start && 0 === i.length : i.start === r) && !r && a.advanceCaret(e, t)) : (s = a.$control.children(".active:" + n),
            s.length && (o = a.$control.children(":not(input)").index(s),
            a.setActiveItem(null),
            a.setCaret(e > 0 ? o + 1 : o))))
        },
        advanceCaret: function(e, t) {
            var n, i, o = this;
            0 !== e && (n = e > 0 ? "next" : "prev",
            o.isShiftDown ? (i = o.$control_input[n](),
            i.length && (o.hideInput(),
            o.setActiveItem(i),
            t && t.preventDefault())) : o.setCaret(o.caretPos + e))
        },
        setCaret: function(t) {
            var n = this;
            if (t = "single" === n.settings.mode ? n.items.length : Math.max(0, Math.min(n.items.length, t)),
            !n.isPending) {
                var i, o, r, s;
                for (r = n.$control.children(":not(input)"),
                i = 0,
                o = r.length; i < o; i++)
                    s = e(r[i]).detach(),
                    i < t ? n.$control_input.before(s) : n.$control.append(s)
            }
            n.caretPos = t
        },
        lock: function() {
            this.close(),
            this.isLocked = !0,
            this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1,
            this.refreshState()
        },
        disable: function() {
            var e = this;
            e.$input.prop("disabled", !0),
            e.$control_input.prop("disabled", !0).prop("tabindex", -1),
            e.isDisabled = !0,
            e.lock()
        },
        enable: function() {
            var e = this;
            e.$input.prop("disabled", !1),
            e.$control_input.prop("disabled", !1).prop("tabindex", e.tabIndex),
            e.isDisabled = !1,
            e.unlock()
        },
        destroy: function() {
            var t = this
              , n = t.eventNS
              , i = t.revertSettings;
            t.trigger("destroy"),
            t.off(),
            t.$wrapper.remove(),
            t.$dropdown.remove(),
            t.$input.html("").append(i.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: i.tabindex
            }).show(),
            t.$control_input.removeData("grow"),
            t.$input.removeData("selectize"),
            e(window).off(n),
            e(document).off(n),
            e(document.body).off(n),
            delete t.$input[0].selectize
        },
        render: function(t, n) {
            var i, o, r = "", s = !1, a = this;
            return "option" !== t && "item" !== t || (i = u(n[a.settings.valueField]),
            s = !!i),
            s && (p(a.renderCache[t]) || (a.renderCache[t] = {}),
            a.renderCache[t].hasOwnProperty(i)) ? a.renderCache[t][i] : (r = e(a.settings.render[t].apply(this, [n, c])),
            "option" === t || "option_create" === t ? r.attr("data-selectable", "") : "optgroup" === t && (o = n[a.settings.optgroupValueField] || "",
            r.attr("data-group", o)),
            "option" !== t && "item" !== t || r.attr("data-value", i || ""),
            s && (a.renderCache[t][i] = r[0]),
            r[0])
        },
        clearCache: function(e) {
            var t = this;
            void 0 === e ? t.renderCache = {} : delete t.renderCache[e]
        },
        canCreate: function(e) {
            var t = this;
            if (!t.settings.create)
                return !1;
            var n = t.settings.createFilter;
            return e.length && ("function" != typeof n || n.apply(t, [e])) && ("string" != typeof n || new RegExp(n).test(e)) && (!(n instanceof RegExp) || n.test(e))
        }
    }),
    $.count = 0,
    $.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    },
    e.fn.selectize = function(t) {
        var n = e.fn.selectize.defaults
          , i = e.extend({}, n, t)
          , o = i.dataAttr
          , r = i.labelField
          , s = i.valueField
          , a = i.optgroupField
          , l = i.optgroupLabelField
          , p = i.optgroupValueField
          , c = function(t, n) {
            var a, l, p, u, c = t.attr(o);
            if (c)
                for (n.options = JSON.parse(c),
                a = 0,
                l = n.options.length; a < l; a++)
                    n.items.push(n.options[a][s]);
            else {
                var d = e.trim(t.val() || "");
                if (!i.allowEmptyOption && !d.length)
                    return;
                for (p = d.split(i.delimiter),
                a = 0,
                l = p.length; a < l; a++)
                    u = {},
                    u[r] = p[a],
                    u[s] = p[a],
                    n.options.push(u);
                n.items = p
            }
        }
          , d = function(t, n) {
            var c, d, h, f, g = n.options, v = {}, m = function(e) {
                var t = o && e.attr(o);
                return "string" == typeof t && t.length ? JSON.parse(t) : null
            }, y = function(t, o) {
                t = e(t);
                var l = u(t.val());
                if (l || i.allowEmptyOption)
                    if (v.hasOwnProperty(l)) {
                        if (o) {
                            var p = v[l][a];
                            p ? e.isArray(p) ? p.push(o) : v[l][a] = [p, o] : v[l][a] = o
                        }
                    } else {
                        var c = m(t) || {};
                        c[r] = c[r] || t.text(),
                        c[s] = c[s] || l,
                        c[a] = c[a] || o,
                        v[l] = c,
                        g.push(c),
                        t.is(":selected") && n.items.push(l)
                    }
            };
            for (n.maxItems = t.attr("multiple") ? null : 1,
            f = t.children(),
            c = 0,
            d = f.length; c < d; c++)
                h = f[c].tagName.toLowerCase(),
                "optgroup" === h ? function(t) {
                    var i, o, r, s, a;
                    for (t = e(t),
                    r = t.attr("label"),
                    r && (s = m(t) || {},
                    s[l] = r,
                    s[p] = r,
                    n.optgroups.push(s)),
                    a = e("option", t),
                    i = 0,
                    o = a.length; i < o; i++)
                        y(a[i], r)
                }(f[c]) : "option" === h && y(f[c])
        };
        return this.each(function() {
            if (!this.selectize) {
                var o = e(this)
                  , r = this.tagName.toLowerCase()
                  , s = o.attr("placeholder") || o.attr("data-placeholder");
                s || i.allowEmptyOption || (s = o.children('option[value=""]').text());
                var a = {
                    placeholder: s,
                    options: [],
                    optgroups: [],
                    items: []
                };
                "select" === r ? d(o, a) : c(o, a),
                new $(o,e.extend(!0, {}, n, a, t))
            }
        })
    }
    ,
    e.fn.selectize.defaults = $.defaults,
    e.fn.selectize.support = {
        validity: l
    },
    $.define("drag_drop", function(t) {
        if (!e.fn.sortable)
            throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var n = this;
            n.lock = function() {
                var e = n.lock;
                return function() {
                    var t = n.$control.data("sortable");
                    return t && t.disable(),
                    e.apply(n, arguments)
                }
            }(),
            n.unlock = function() {
                var e = n.unlock;
                return function() {
                    var t = n.$control.data("sortable");
                    return t && t.enable(),
                    e.apply(n, arguments)
                }
            }(),
            n.setup = function() {
                var t = n.setup;
                return function() {
                    t.apply(this, arguments);
                    var i = n.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: n.isLocked,
                        start: function(e, t) {
                            t.placeholder.css("width", t.helper.css("width")),
                            i.css({
                                overflow: "visible"
                            })
                        },
                        stop: function() {
                            i.css({
                                overflow: "hidden"
                            });
                            var t = n.$activeItems ? n.$activeItems.slice() : null
                              , o = [];
                            i.children("[data-value]").each(function() {
                                o.push(e(this).attr("data-value"))
                            }),
                            n.setValue(o),
                            n.setActiveItem(t)
                        }
                    })
                }
            }()
        }
    }),
    $.define("dropdown_header", function(t) {
        var n = this;
        t = e.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(e) {
                return '<div class="' + e.headerClass + '"><div class="' + e.titleRowClass + '"><span class="' + e.labelClass + '">' + e.title + '</span><a href="javascript:void(0)" class="' + e.closeClass + '">&times;</a></div></div>'
            }
        }, t),
        n.setup = function() {
            var i = n.setup;
            return function() {
                i.apply(n, arguments),
                n.$dropdown_header = e(t.html(t)),
                n.$dropdown.prepend(n.$dropdown_header)
            }
        }()
    }),
    $.define("optgroup_columns", function(t) {
        var n = this;
        t = e.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, t),
        this.getAdjacentOption = function(t, n) {
            var i = t.closest("[data-group]").find("[data-selectable]")
              , o = i.index(t) + n;
            return o >= 0 && o < i.length ? i.eq(o) : e()
        }
        ,
        this.onKeyDown = function() {
            var e = n.onKeyDown;
            return function(t) {
                var i, o, r, s;
                return !this.isOpen || 37 !== t.keyCode && 39 !== t.keyCode ? e.apply(this, arguments) : (n.ignoreHover = !0,
                s = this.$activeOption.closest("[data-group]"),
                i = s.find("[data-selectable]").index(this.$activeOption),
                s = 37 === t.keyCode ? s.prev("[data-group]") : s.next("[data-group]"),
                r = s.find("[data-selectable]"),
                o = r.eq(Math.min(r.length - 1, i)),
                void (o.length && this.setActiveOption(o)))
            }
        }();
        var i = function() {
            var e, t = i.width, n = document;
            return void 0 === t && (e = n.createElement("div"),
            e.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',
            e = e.firstChild,
            n.body.appendChild(e),
            t = i.width = e.offsetWidth - e.clientWidth,
            n.body.removeChild(e)),
            t
        }
          , o = function() {
            var o, r, s, a, l, p, u;
            if (u = e("[data-group]", n.$dropdown_content),
            (r = u.length) && n.$dropdown_content.width()) {
                if (t.equalizeHeight) {
                    for (s = 0,
                    o = 0; o < r; o++)
                        s = Math.max(s, u.eq(o).height());
                    u.css({
                        height: s
                    })
                }
                t.equalizeWidth && (p = n.$dropdown_content.innerWidth() - i(),
                a = Math.round(p / r),
                u.css({
                    width: a
                }),
                r > 1 && (l = p - a * (r - 1),
                u.eq(r - 1).css({
                    width: l
                })))
            }
        };
        (t.equalizeHeight || t.equalizeWidth) && (d.after(this, "positionDropdown", o),
        d.after(this, "refreshOptions", o))
    }),
    $.define("remove_button", function(t) {
        t = e.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0
        }, t);
        return "single" === this.settings.mode ? void function(t, n) {
            n.className = "remove-single";
            var i = t
              , o = '<a href="javascript:void(0)" class="' + n.className + '" tabindex="-1" title="' + c(n.title) + '">' + n.label + "</a>"
              , r = function(e, t) {
                return e + t
            };
            t.setup = function() {
                var s = i.setup;
                return function() {
                    if (n.append) {
                        var a = e(i.$input.context).attr("id")
                          , l = (e("#" + a),
                        i.settings.render.item);
                        i.settings.render.item = function(e) {
                            return r(l.apply(t, arguments), o)
                        }
                    }
                    s.apply(t, arguments),
                    t.$control.on("click", "." + n.className, function(e) {
                        e.preventDefault(),
                        i.isLocked || i.clear()
                    })
                }
            }()
        }(this, t) : void function(t, n) {
            var i = t
              , o = '<a href="javascript:void(0)" class="' + n.className + '" tabindex="-1" title="' + c(n.title) + '">' + n.label + "</a>"
              , r = function(e, t) {
                var n = e.search(/(<\/[^>]+>\s*)$/);
                return e.substring(0, n) + t + e.substring(n)
            };
            t.setup = function() {
                var s = i.setup;
                return function() {
                    if (n.append) {
                        var a = i.settings.render.item;
                        i.settings.render.item = function(e) {
                            return r(a.apply(t, arguments), o)
                        }
                    }
                    s.apply(t, arguments),
                    t.$control.on("click", "." + n.className, function(t) {
                        if (t.preventDefault(),
                        !i.isLocked) {
                            var n = e(t.currentTarget).parent();
                            i.setActiveItem(n),
                            i.deleteSelection() && i.setCaret(i.items.length)
                        }
                    })
                }
            }()
        }(this, t)
    }),
    $.define("restore_on_backspace", function(e) {
        var t = this;
        e.text = e.text || function(e) {
            return e[this.settings.labelField]
        }
        ,
        this.onKeyDown = function() {
            var n = t.onKeyDown;
            return function(t) {
                var i, o;
                return 8 === t.keyCode && "" === this.$control_input.val() && !this.$activeItems.length && (i = this.caretPos - 1) >= 0 && i < this.items.length ? (o = this.options[this.items[i]],
                this.deleteSelection(t) && (this.setTextboxValue(e.text.apply(this, [o])),
                this.refreshOptions(!0)),
                void t.preventDefault()) : n.apply(this, arguments)
            }
        }()
    }),
    $
});
