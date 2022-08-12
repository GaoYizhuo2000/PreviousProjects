"ab";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
}
: function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
}
;
!function() {
    var e = function(e) {
        var o = {};
        if (e.name.indexOf(" ") >= 0)
            return !1;
        if (!e.name)
            return !1;
        if (o.name = e.name,
        e.gaSupport ? o.gaSupport = e.gaSupport : o.gaSupport = !1,
        !e.customVarSlot && e.gaSupport)
            return !1;
        if (o.customVarSlot = e.customVarSlot,
        !e.variations)
            return !1;
        o.variations = e.variations,
        e.chooseVariationNumber ? o.chooseVariationNumber = e.chooseVariationNumber : o.chooseVariationNumber = Math.floor(Math.random() * t.keys(o.variations).length),
        o.newCookieSet = null;
        var n = "abjs_" + o.name
          , a = t.queryString();
        if (o.cookieVariation = t.getCookie(n),
        o.queryVariation = a["abjs-setvar-" + o.name],
        t.isFunction(o.variations[o.queryVariation]) ? o.assignedVariation = o.queryVariation : o.assignedVariation = o.cookieVariation,
        "yes" === a["abjs-setcookie"] && (o.newCookieSet = !0),
        "" === o.assignedVariation || !t.isFunction(o.variations[o.assignedVariation])) {
            var i = o.chooseVariationNumber;
            o.assignedVariation = t.keys(o.variations)[i],
            o.newCookieSet = !0
        }
        if (!0 === o.newCookieSet) {
            var r = e.cookiePath || window.location.pathname;
            t.setCookie(n, o.assignedVariation, 365, r, e.domain)
        }
        return o.execute = function() {
            t.contentLoaded(window, function() {
                o.variations[o.assignedVariation]()
            })
        }
        ,
        o.execute(),
        o.gaSupport && (window._gaq = window._gaq || [],
        window._gaq.push(["_setCustomVar", o.customVarSlot, "abjs_" + o.name, "abjs_" + o.assignedVariation, 1])),
        o
    }
      , t = {};
    t.setCookie = function(e, t, o, n, a) {
        var i = new Date;
        i.setDate(i.getDate() + o),
        console.log(i.toUTCString());
        var r = escape(t) + (null === o ? "" : "; expires=" + i.toUTCString())
          , s = e + "=" + r + "; path=" + n;
        a && (s += "; domain=" + a),
        document.cookie = s
    }
    ,
    t.getCookie = function(e) {
        var t, o, n, a = document.cookie.split(";");
        for (t = 0; t < a.length; t++)
            if (o = a[t].substr(0, a[t].indexOf("=")),
            n = a[t].substr(a[t].indexOf("=") + 1),
            (o = o.replace(/^\s+|\s+$/g, "")) == e)
                return unescape(n);
        return ""
    }
    ,
    t.keys = function(e) {
        if (e !== Object(e))
            throw new TypeError("ABTestUtils.keys called on non-object");
        var t = []
          , o = null;
        for (o in e)
            Object.prototype.hasOwnProperty.call(e, o) && t.push(o);
        return t
    }
    ,
    t.isFunction = function(e) {
        return !!(e && e.constructor && e.call && e.apply)
    }
    ,
    t.contentLoaded = function(e, t) {
        var o = !1
          , n = !0
          , a = e.document
          , i = a.documentElement
          , r = a.addEventListener ? "addEventListener" : "attachEvent"
          , s = a.addEventListener ? "removeEventListener" : "detachEvent"
          , c = a.addEventListener ? "" : "on"
          , u = function n(i) {
            "readystatechange" == i.type && "complete" != a.readyState || (("load" == i.type ? e : a)[s](c + i.type, n, !1),
            !o && (o = !0) && t.call(e, i.type || i))
        };
        if ("complete" == a.readyState)
            t.call(e, "lazy");
        else {
            if (a.createEventObject && i.doScroll) {
                try {
                    n = !e.frameElement
                } catch (e) {}
                n && function e() {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return void setTimeout(e, 50)
                    }
                    u("poll")
                }()
            }
            a[r](c + "DOMContentLoaded", u, !1),
            a[r](c + "readystatechange", u, !1),
            e[r](c + "load", u, !1)
        }
    }
    ,
    t.queryString = function() {
        for (var e = {}, t = window.location.search.substring(1).split("&"), o = 0; o < t.length; o++) {
            var n = t[o].split("=");
            e[unescape(n[0])] = unescape(n[1])
        }
        return e
    }
    ,
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? module.exports = {
        ABTest: e,
        ABTestUtils: t
    } : (window.ABTest = e,
    window.ABTestUtils = t)
}();
"js.cookie";
!function(e) {
    var n = !1;
    if ("function" == typeof define && define.amd && (define(e),
    n = !0),
    "object" == typeof exports && (module.exports = e(),
    n = !0),
    !n) {
        var o = window.Cookies
          , t = window.Cookies = e();
        t.noConflict = function() {
            return window.Cookies = o,
            t
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var t in o)
                n[t] = o[t]
        }
        return n
    }
    function n(o) {
        function t(n, r, i) {
            var c;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if ("number" == typeof (i = e({
                        path: "/"
                    }, t.defaults, i)).expires) {
                        var a = new Date;
                        a.setMilliseconds(a.getMilliseconds() + 864e5 * i.expires),
                        i.expires = a
                    }
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                    try {
                        c = JSON.stringify(r),
                        /^[\{\[]/.test(c) && (r = c)
                    } catch (e) {}
                    r = o.write ? o.write(r, n) : encodeURIComponent(r + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    n = (n = (n = encodeURIComponent(n + "")).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var s = "";
                    for (var f in i)
                        i[f] && (s += "; " + f,
                        !0 !== i[f] && (s += "=" + i[f]));
                    return document.cookie = n + "=" + r + s
                }
                n || (c = {});
                for (var p = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, u = 0; u < p.length; u++) {
                    var l = p[u].split("=")
                      , C = l.slice(1).join("=");
                    this.json || '"' !== C.charAt(0) || (C = C.slice(1, -1));
                    try {
                        var m = l[0].replace(d, decodeURIComponent);
                        if (C = o.read ? o.read(C, m) : o(C, m) || C.replace(d, decodeURIComponent),
                        this.json)
                            try {
                                C = JSON.parse(C)
                            } catch (e) {}
                        if (n === m) {
                            c = C;
                            break
                        }
                        n || (c[m] = C)
                    } catch (e) {}
                }
                return c
            }
        }
        return t.set = t,
        t.get = function(e) {
            return t.call(t, e)
        }
        ,
        t.getJSON = function() {
            return t.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        t.defaults = {},
        t.remove = function(n, o) {
            t(n, "", e(o, {
                expires: -1
            }))
        }
        ,
        t.withConverter = n,
        t
    }
    return n(function() {})
});
"layer.3.5.1";
!function(e, t) {
    "use strict";
    var i, n, a = e.layui && layui.define, o = {
        getPath: function() {
            var t = document.currentScript ? document.currentScript.src : function() {
                for (var e, t = document.scripts, i = t.length - 1, n = i; n > 0; n--)
                    if ("interactive" === t[n].readyState) {
                        e = t[n].src;
                        break
                    }
                return e || t[i].src
            }()
              , i = e.LAYUI_GLOBAL || {};
            return i.layer_dir || t.substring(0, t.lastIndexOf("/") + 1)
        }(),
        config: {},
        end: {},
        minIndex: 0,
        minLeft: [],
        btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
        type: ["dialog", "page", "iframe", "loading", "tips"],
        getStyle: function(t, i) {
            var n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
            return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](i)
        },
        link: function(t, i, n) {
            if (r.path) {
                var a = document.getElementsByTagName("head")[0]
                  , s = document.createElement("link");
                "string" == typeof i && (n = i);
                var l = (n || t).replace(/\.|\//g, "")
                  , f = "layuicss-" + l
                  , c = "creating"
                  , u = 0;
                s.rel = "stylesheet",
                s.href = r.path + t,
                s.id = f,
                document.getElementById(f) || a.appendChild(s),
                "function" == typeof i && !function d(t) {
                    var n = 100
                      , a = document.getElementById(f);
                    return ++u > 1e4 / n ? e.console && console.error(l + ".css: Invalid") : void (1989 === parseInt(o.getStyle(a, "width")) ? (t === c && a.removeAttribute("lay-status"),
                    a.getAttribute("lay-status") === c ? setTimeout(d, n) : i()) : (a.setAttribute("lay-status", c),
                    setTimeout(function() {
                        d(c)
                    }, n)))
                }()
            }
        }
    }, r = {
        v: "3.5.1",
        ie: function() {
            var t = navigator.userAgent.toLowerCase();
            return !!(e.ActiveXObject || "ActiveXObject"in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
        }(),
        index: e.layer && e.layer.v ? 1e5 : 0,
        path: o.getPath,
        config: function(e, t) {
            return e = e || {},
            r.cache = o.config = i.extend({}, o.config, e),
            r.path = o.config.path || r.path,
            "string" == typeof e.extend && (e.extend = [e.extend]),
            o.config.path && r.ready(),
            e.extend ? (a ? layui.addcss("modules/css/layer/" + e.extend) : o.link("css/layer/" + e.extend),
            this) : this
        },
        ready: function(e) {
            var t = "layer"
              , i = ""
              , n = (a ? "modules/css/layer/" : "css/layer/") + "default/layer.css?v=" + r.v + i;
            return a ? layui.addcss(n, e, t) : o.link(n, e, t),
            this
        },
        alert: function(e, t, n) {
            var a = "function" == typeof t;
            return a && (n = t),
            r.open(i.extend({
                content: e,
                yes: n
            }, a ? {} : t))
        },
        confirm: function(e, t, n, a) {
            var s = "function" == typeof t;
            return s && (a = n,
            n = t),
            r.open(i.extend({
                content: e,
                btn: o.btn,
                yes: n,
                btn2: a
            }, s ? {} : t))
        },
        msg: function(e, n, a) {
            var s = "function" == typeof n
              , f = o.config.skin
              , c = (f ? f + " " + f + "-msg" : "") || "layui-layer-msg"
              , u = l.anim.length - 1;
            return s && (a = n),
            r.open(i.extend({
                content: e,
                time: 3e3,
                shade: !1,
                skin: c,
                title: !1,
                closeBtn: !1,
                btn: !1,
                resize: !1,
                end: a
            }, s && !o.config.skin ? {
                skin: c + " layui-layer-hui",
                anim: u
            } : function() {
                return n = n || {},
                (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")),
                n
            }()))
        },
        load: function(e, t) {
            return r.open(i.extend({
                type: 3,
                icon: e || 0,
                resize: !1,
                shade: .01
            }, t))
        },
        tips: function(e, t, n) {
            return r.open(i.extend({
                type: 4,
                content: [e, t],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                resize: !1,
                fixed: !1,
                maxWidth: 260
            }, n))
        }
    }, s = function(e) {
        var t = this
          , a = function() {
            t.creat()
        };
        t.index = ++r.index,
        t.config.maxWidth = i(n).width() - 30,
        t.config = i.extend({}, t.config, o.config, e),
        document.body ? a() : setTimeout(function() {
            a()
        }, 30)
    };
    s.pt = s.prototype;
    var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
    l.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"],
    l.SHADE = "layui-layer-shade",
    l.MOVE = "layui-layer-move",
    s.pt.config = {
        type: 0,
        shade: .3,
        fixed: !0,
        move: l[1],
        title: "&#x4FE1;&#x606F;",
        offset: "auto",
        area: "auto",
        closeBtn: 1,
        time: 0,
        zIndex: 19891014,
        maxWidth: 360,
        anim: 0,
        isOutAnim: !0,
        minStack: !0,
        icon: -1,
        moveType: 1,
        resize: !0,
        scrollbar: !0,
        tips: 2
    },
    s.pt.vessel = function(e, t) {
        var n = this
          , a = n.index
          , r = n.config
          , s = r.zIndex + a
          , f = "object" == typeof r.title
          , c = r.maxmin && (1 === r.type || 2 === r.type)
          , u = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";
        return r.zIndex = s,
        t([r.shade ? '<div class="' + l.SHADE + '" id="' + l.SHADE + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; ") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + r.area[0] + ";height:" + r.area[1] + ";position:" + (r.fixed ? "fixed;" : "absolute;") + '">' + (e && 2 != r.type ? "" : u) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' + function() {
            var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
            return r.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'),
            e
        }() + "</span>" + (r.btn ? function() {
            var e = "";
            "string" == typeof r.btn && (r.btn = [r.btn]);
            for (var t = 0, i = r.btn.length; t < i; t++)
                e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>";
            return '<div class="' + l[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
        }() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], u, i('<div class="' + l.MOVE + '" id="' + l.MOVE + '"></div>')),
        n
    }
    ,
    s.pt.creat = function() {
        var e = this
          , t = e.config
          , a = e.index
          , s = t.content
          , f = "object" == typeof s
          , c = i("body");
        if (!t.id || !i("#" + t.id)[0]) {
            switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]),
            t.shift && (t.anim = t.shift),
            6 == r.ie && (t.fixed = !1),
            t.type) {
            case 0:
                t.btn = "btn"in t ? t.btn : o.btn[0],
                r.closeAll("dialog");
                break;
            case 2:
                var s = t.content = f ? t.content : [t.content || "", "auto"];
                t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                break;
            case 3:
                delete t.title,
                delete t.closeBtn,
                t.icon === -1 && 0 === t.icon,
                r.closeAll("loading");
                break;
            case 4:
                f || (t.content = [t.content, "body"]),
                t.follow = t.content[1],
                t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>',
                delete t.title,
                t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0],
                t.tipsMore || r.closeAll("tips")
            }
            if (e.vessel(f, function(n, r, u) {
                c.append(n[0]),
                f ? function() {
                    2 == t.type || 4 == t.type ? function() {
                        i("body").append(n[1])
                    }() : function() {
                        s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]),
                        i("#" + l[0] + a).find("." + l[5]).before(r))
                    }()
                }() : c.append(n[1]),
                i("#" + l.MOVE)[0] || c.append(o.moveElem = u),
                e.layero = i("#" + l[0] + a),
                e.shadeo = i("#" + l.SHADE + a),
                t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a)
            }).auto(a),
            e.shadeo.css({
                "background-color": t.shade[1] || "#000",
                opacity: t.shade[0] || t.shade
            }),
            2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", s[0]),
            4 == t.type ? e.tips() : function() {
                e.offset(),
                parseInt(o.getStyle(document.getElementById(l.MOVE), "z-index")) || function() {
                    e.layero.css("visibility", "hidden"),
                    r.ready(function() {
                        e.offset(),
                        e.layero.css("visibility", "visible")
                    })
                }()
            }(),
            t.fixed && n.on("resize", function() {
                e.offset(),
                (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a),
                4 == t.type && e.tips()
            }),
            t.time <= 0 || setTimeout(function() {
                r.close(e.index)
            }, t.time),
            e.move().callback(),
            l.anim[t.anim]) {
                var u = "layer-anim " + l.anim[t.anim];
                e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    i(this).removeClass(u)
                })
            }
            t.isOutAnim && e.layero.data("isOutAnim", !0)
        }
    }
    ,
    s.pt.auto = function(e) {
        var t = this
          , a = t.config
          , o = i("#" + l[0] + e);
        "" === a.area[0] && a.maxWidth > 0 && (r.ie && r.ie < 8 && a.btn && o.width(o.innerWidth()),
        o.outerWidth() > a.maxWidth && o.width(a.maxWidth));
        var s = [o.innerWidth(), o.innerHeight()]
          , f = o.find(l[1]).outerHeight() || 0
          , c = o.find("." + l[6]).outerHeight() || 0
          , u = function(e) {
            e = o.find(e),
            e.height(s[1] - f - c - 2 * (0 | parseFloat(e.css("padding-top"))))
        };
        switch (a.type) {
        case 2:
            u("iframe");
            break;
        default:
            "" === a.area[1] ? a.maxHeight > 0 && o.outerHeight() > a.maxHeight ? (s[1] = a.maxHeight,
            u("." + l[5])) : a.fixed && s[1] >= n.height() && (s[1] = n.height(),
            u("." + l[5])) : u("." + l[5])
        }
        return t
    }
    ,
    s.pt.offset = function() {
        var e = this
          , t = e.config
          , i = e.layero
          , a = [i.outerWidth(), i.outerHeight()]
          , o = "object" == typeof t.offset;
        e.offsetTop = (n.height() - a[1]) / 2,
        e.offsetLeft = (n.width() - a[0]) / 2,
        o ? (e.offsetTop = t.offset[0],
        e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0,
        e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1],
        e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0,
        e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1],
        e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset),
        t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop),
        e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft),
        e.offsetTop += n.scrollTop(),
        e.offsetLeft += n.scrollLeft()),
        i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0),
        e.offsetLeft = i.css("left")),
        i.css({
            top: e.offsetTop,
            left: e.offsetLeft
        })
    }
    ,
    s.pt.tips = function() {
        var e = this
          , t = e.config
          , a = e.layero
          , o = [a.outerWidth(), a.outerHeight()]
          , r = i(t.follow);
        r[0] || (r = i("body"));
        var s = {
            width: r.outerWidth(),
            height: r.outerHeight(),
            top: r.offset().top,
            left: r.offset().left
        }
          , f = a.find(".layui-layer-TipsG")
          , c = t.tips[0];
        t.tips[1] || f.remove(),
        s.autoLeft = function() {
            s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0],
            f.css({
                right: 12,
                left: "auto"
            })) : s.tipLeft = s.left
        }
        ,
        s.where = [function() {
            s.autoLeft(),
            s.tipTop = s.top - o[1] - 10,
            f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
        }
        , function() {
            s.tipLeft = s.left + s.width + 10,
            s.tipTop = s.top,
            f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
        }
        , function() {
            s.autoLeft(),
            s.tipTop = s.top + s.height + 10,
            f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
        }
        , function() {
            s.tipLeft = s.left - o[0] - 10,
            s.tipTop = s.top,
            f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
        }
        ],
        s.where[c - 1](),
        1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](),
        a.find("." + l[5]).css({
            "background-color": t.tips[1],
            "padding-right": t.closeBtn ? "30px" : ""
        }),
        a.css({
            left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
            top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
        })
    }
    ,
    s.pt.move = function() {
        var e = this
          , t = e.config
          , a = i(document)
          , s = e.layero
          , l = s.find(t.move)
          , f = s.find(".layui-layer-resize")
          , c = {};
        return t.move && l.css("cursor", "move"),
        l.on("mousedown", function(e) {
            e.preventDefault(),
            t.move && (c.moveStart = !0,
            c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))],
            o.moveElem.css("cursor", "move").show())
        }),
        f.on("mousedown", function(e) {
            e.preventDefault(),
            c.resizeStart = !0,
            c.offset = [e.clientX, e.clientY],
            c.area = [s.outerWidth(), s.outerHeight()],
            o.moveElem.css("cursor", "se-resize").show()
        }),
        a.on("mousemove", function(i) {
            if (c.moveStart) {
                var a = i.clientX - c.offset[0]
                  , o = i.clientY - c.offset[1]
                  , l = "fixed" === s.css("position");
                if (i.preventDefault(),
                c.stX = l ? 0 : n.scrollLeft(),
                c.stY = l ? 0 : n.scrollTop(),
                !t.moveOut) {
                    var f = n.width() - s.outerWidth() + c.stX
                      , u = n.height() - s.outerHeight() + c.stY;
                    a < c.stX && (a = c.stX),
                    a > f && (a = f),
                    o < c.stY && (o = c.stY),
                    o > u && (o = u)
                }
                s.css({
                    left: a,
                    top: o
                })
            }
            if (t.resize && c.resizeStart) {
                var a = i.clientX - c.offset[0]
                  , o = i.clientY - c.offset[1];
                i.preventDefault(),
                r.style(e.index, {
                    width: c.area[0] + a,
                    height: c.area[1] + o
                }),
                c.isResize = !0,
                t.resizing && t.resizing(s)
            }
        }).on("mouseup", function(e) {
            c.moveStart && (delete c.moveStart,
            o.moveElem.hide(),
            t.moveEnd && t.moveEnd(s)),
            c.resizeStart && (delete c.resizeStart,
            o.moveElem.hide())
        }),
        e
    }
    ,
    s.pt.callback = function() {
        function e() {
            var e = a.cancel && a.cancel(t.index, n);
            e === !1 || r.close(t.index)
        }
        var t = this
          , n = t.layero
          , a = t.config;
        t.openLayer(),
        a.success && (2 == a.type ? n.find("iframe").on("load", function() {
            a.success(n, t.index)
        }) : a.success(n, t.index)),
        6 == r.ie && t.IE6(n),
        n.find("." + l[6]).children("a").on("click", function() {
            var e = i(this).index();
            if (0 === e)
                a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index);
            else {
                var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
                o === !1 || r.close(t.index)
            }
        }),
        n.find("." + l[7]).on("click", e),
        a.shadeClose && t.shadeo.on("click", function() {
            r.close(t.index)
        }),
        n.find(".layui-layer-min").on("click", function() {
            var e = a.min && a.min(n, t.index);
            e === !1 || r.min(t.index, a)
        }),
        n.find(".layui-layer-max").on("click", function() {
            i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index),
            a.restore && a.restore(n, t.index)) : (r.full(t.index, a),
            setTimeout(function() {
                a.full && a.full(n, t.index)
            }, 100))
        }),
        a.end && (o.end[t.index] = a.end)
    }
    ,
    o.reselect = function() {
        i.each(i("select"), function(e, t) {
            var n = i(this);
            n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(),
            n = null
        })
    }
    ,
    s.pt.IE6 = function(e) {
        i("select").each(function(e, t) {
            var n = i(this);
            n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
                layer: "1"
            }).hide(),
            n = null
        })
    }
    ,
    s.pt.openLayer = function() {
        var e = this;
        r.zIndex = e.config.zIndex,
        r.setTop = function(e) {
            var t = function() {
                r.zIndex++,
                e.css("z-index", r.zIndex + 1)
            };
            return r.zIndex = parseInt(e[0].style.zIndex),
            e.on("mousedown", t),
            r.zIndex
        }
    }
    ,
    o.record = function(e) {
        var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
        e.find(".layui-layer-max").addClass("layui-layer-maxmin"),
        e.attr({
            area: t
        })
    }
    ,
    o.rescollbar = function(e) {
        l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"),
        l.html.removeAttr("layer-full"))
    }
    ,
    e.layer = r,
    r.getChildFrame = function(e, t) {
        return t = t || i("." + l[4]).attr("times"),
        i("#" + l[0] + t).find("iframe").contents().find(e)
    }
    ,
    r.getFrameIndex = function(e) {
        return i("#" + e).parents("." + l[4]).attr("times")
    }
    ,
    r.iframeAuto = function(e) {
        if (e) {
            var t = r.getChildFrame("html", e).outerHeight()
              , n = i("#" + l[0] + e)
              , a = n.find(l[1]).outerHeight() || 0
              , o = n.find("." + l[6]).outerHeight() || 0;
            n.css({
                height: t + a + o
            }),
            n.find("iframe").css({
                height: t
            })
        }
    }
    ,
    r.iframeSrc = function(e, t) {
        i("#" + l[0] + e).find("iframe").attr("src", t)
    }
    ,
    r.style = function(e, t, n) {
        var a = i("#" + l[0] + e)
          , r = a.find(".layui-layer-content")
          , s = a.attr("type")
          , f = a.find(l[1]).outerHeight() || 0
          , c = a.find("." + l[6]).outerHeight() || 0;
        a.attr("minLeft");
        s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260),
        parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)),
        a.css(t),
        c = a.find("." + l[6]).outerHeight(),
        s === o.type[2] ? a.find("iframe").css({
            height: parseFloat(t.height) - f - c
        }) : r.css({
            height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
        }))
    }
    ,
    r.min = function(e, t) {
        t = t || {};
        var a = i("#" + l[0] + e)
          , s = i("#" + l.SHADE + e)
          , f = a.find(l[1]).outerHeight() || 0
          , c = a.attr("minLeft") || 181 * o.minIndex + "px"
          , u = a.css("position")
          , d = {
            width: 180,
            height: f,
            position: "fixed",
            overflow: "hidden"
        };
        o.record(a),
        o.minLeft[0] && (c = o.minLeft[0],
        o.minLeft.shift()),
        t.minStack && (d.left = c,
        d.top = n.height() - f,
        a.attr("minLeft") || o.minIndex++,
        a.attr("minLeft", c)),
        a.attr("position", u),
        r.style(e, d, !0),
        a.find(".layui-layer-min").hide(),
        "page" === a.attr("type") && a.find(l[4]).hide(),
        o.rescollbar(e),
        s.hide()
    }
    ,
    r.restore = function(e) {
        var t = i("#" + l[0] + e)
          , n = i("#" + l.SHADE + e)
          , a = t.attr("area").split(",");
        t.attr("type");
        r.style(e, {
            width: parseFloat(a[0]),
            height: parseFloat(a[1]),
            top: parseFloat(a[2]),
            left: parseFloat(a[3]),
            position: t.attr("position"),
            overflow: "visible"
        }, !0),
        t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),
        t.find(".layui-layer-min").show(),
        "page" === t.attr("type") && t.find(l[4]).show(),
        o.rescollbar(e),
        n.show()
    }
    ,
    r.full = function(e) {
        var t, a = i("#" + l[0] + e);
        o.record(a),
        l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e),
        clearTimeout(t),
        t = setTimeout(function() {
            var t = "fixed" === a.css("position");
            r.style(e, {
                top: t ? 0 : n.scrollTop(),
                left: t ? 0 : n.scrollLeft(),
                width: n.width(),
                height: n.height()
            }, !0),
            a.find(".layui-layer-min").hide()
        }, 100)
    }
    ,
    r.title = function(e, t) {
        var n = i("#" + l[0] + (t || r.index)).find(l[1]);
        n.html(e)
    }
    ,
    r.close = function(e, t) {
        var n = i("#" + l[0] + e)
          , a = n.attr("type")
          , s = "layer-anim-close";
        if (n[0]) {
            var f = "layui-layer-wrap"
              , c = function() {
                if (a === o.type[1] && "object" === n.attr("conType")) {
                    n.children(":not(." + l[5] + ")").remove();
                    for (var r = n.find("." + f), s = 0; s < 2; s++)
                        r.unwrap();
                    r.css("display", r.data("display")).removeClass(f)
                } else {
                    if (a === o.type[2])
                        try {
                            var c = i("#" + l[4] + e)[0];
                            c.contentWindow.document.write(""),
                            c.contentWindow.close(),
                            n.find("." + l[5])[0].removeChild(c)
                        } catch (u) {}
                    n[0].innerHTML = "",
                    n.remove()
                }
                "function" == typeof o.end[e] && o.end[e](),
                delete o.end[e],
                "function" == typeof t && t()
            };
            n.data("isOutAnim") && n.addClass("layer-anim " + s),
            i("#layui-layer-moves, #" + l.SHADE + e).remove(),
            6 == r.ie && o.reselect(),
            o.rescollbar(e),
            n.attr("minLeft") && (o.minIndex--,
            o.minLeft.push(n.attr("minLeft"))),
            r.ie && r.ie < 10 || !n.data("isOutAnim") ? c() : setTimeout(function() {
                c()
            }, 200)
        }
    }
    ,
    r.closeAll = function(e, t) {
        "function" == typeof e && (t = e,
        e = null);
        var n = i("." + l[0]);
        i.each(n, function(a) {
            var o = i(this)
              , s = e ? o.attr("type") === e : 1;
            s && r.close(o.attr("times"), a === n.length - 1 ? t : null),
            s = null
        }),
        0 === n.length && "function" == typeof t && t()
    }
    ;
    var f = r.cache || {}
      , c = function(e) {
        return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
    };
    r.prompt = function(e, t) {
        var a = "";
        if (e = e || {},
        "function" == typeof e && (t = e),
        e.area) {
            var o = e.area;
            a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"',
            delete e.area
        }
        var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + "></textarea>" : function() {
            return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input">'
        }(), f = e.success;
        return delete e.success,
        r.open(i.extend({
            type: 1,
            btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
            content: l,
            skin: "layui-layer-prompt" + c("prompt"),
            maxWidth: n.width(),
            success: function(t) {
                s = t.find(".layui-layer-input"),
                s.val(e.value || "").focus(),
                "function" == typeof f && f(t)
            },
            resize: !1,
            yes: function(i) {
                var n = s.val();
                "" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
                    tips: 1
                }) : t && t(n, i, s)
            }
        }, e))
    }
    ,
    r.tab = function(e) {
        e = e || {};
        var t = e.tab || {}
          , n = "layui-this"
          , a = e.success;
        return delete e.success,
        r.open(i.extend({
            type: 1,
            skin: "layui-layer-tab" + c("tab"),
            resize: !1,
            title: function() {
                var e = t.length
                  , i = 1
                  , a = "";
                if (e > 0)
                    for (a = '<span class="' + n + '">' + t[0].title + "</span>"; i < e; i++)
                        a += "<span>" + t[i].title + "</span>";
                return a
            }(),
            content: '<ul class="layui-layer-tabmain">' + function() {
                var e = t.length
                  , i = 1
                  , a = "";
                if (e > 0)
                    for (a = '<li class="layui-layer-tabli ' + n + '">' + (t[0].content || "no content") + "</li>"; i < e; i++)
                        a += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
                return a
            }() + "</ul>",
            success: function(t) {
                var o = t.find(".layui-layer-title").children()
                  , r = t.find(".layui-layer-tabmain").children();
                o.on("mousedown", function(t) {
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    var a = i(this)
                      , o = a.index();
                    a.addClass(n).siblings().removeClass(n),
                    r.eq(o).show().siblings().hide(),
                    "function" == typeof e.change && e.change(o)
                }),
                "function" == typeof a && a(t)
            }
        }, e))
    }
    ,
    r.photos = function(t, n, a) {
        function o(e, t, i) {
            var n = new Image;
            return n.src = e,
            n.complete ? t(n) : (n.onload = function() {
                n.onload = null,
                t(n)
            }
            ,
            void (n.onerror = function(e) {
                n.onerror = null,
                i(e)
            }
            ))
        }
        var s = {};
        if (t = t || {},
        t.photos) {
            var l = !("string" == typeof t.photos || t.photos instanceof i)
              , f = l ? t.photos : {}
              , u = f.data || []
              , d = f.start || 0;
            s.imgIndex = (0 | d) + 1,
            t.img = t.img || "img";
            var y = t.success;
            if (delete t.success,
            l) {
                if (0 === u.length)
                    return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
            } else {
                var p = i(t.photos)
                  , h = function() {
                    u = [],
                    p.find(t.img).each(function(e) {
                        var t = i(this);
                        t.attr("layer-index", e),
                        u.push({
                            alt: t.attr("alt"),
                            pid: t.attr("layer-pid"),
                            src: t.attr("layer-src") || t.attr("src"),
                            thumb: t.attr("src")
                        })
                    })
                };
                if (h(),
                0 === u.length)
                    return;
                if (n || p.on("click", t.img, function() {
                    h();
                    var e = i(this)
                      , n = e.attr("layer-index");
                    r.photos(i.extend(t, {
                        photos: {
                            start: n,
                            data: u,
                            tab: t.tab
                        },
                        full: t.full
                    }), !0)
                }),
                !n)
                    return
            }
            s.imgprev = function(e) {
                s.imgIndex--,
                s.imgIndex < 1 && (s.imgIndex = u.length),
                s.tabimg(e)
            }
            ,
            s.imgnext = function(e, t) {
                s.imgIndex++,
                s.imgIndex > u.length && (s.imgIndex = 1,
                t) || s.tabimg(e)
            }
            ,
            s.keyup = function(e) {
                if (!s.end) {
                    var t = e.keyCode;
                    e.preventDefault(),
                    37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index)
                }
            }
            ,
            s.tabimg = function(e) {
                if (!(u.length <= 1))
                    return f.start = s.imgIndex - 1,
                    r.close(s.index),
                    r.photos(t, !0, e)
            }
            ,
            s.event = function() {
                s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
                    e.preventDefault(),
                    s.imgprev(!0)
                }),
                s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
                    e.preventDefault(),
                    s.imgnext(!0)
                }),
                i(document).on("keyup", s.keyup)
            }
            ,
            s.loadi = r.load(1, {
                shade: !("shade"in t) && .9,
                scrollbar: !1
            }),
            o(u[d].src, function(n) {
                r.close(s.loadi),
                a && (t.anim = -1),
                s.index = r.open(i.extend({
                    type: 1,
                    id: "layui-layer-photos",
                    area: function() {
                        var a = [n.width, n.height]
                          , o = [i(e).width() - 100, i(e).height() - 100];
                        if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
                            var r = [a[0] / o[0], a[1] / o[1]];
                            r[0] > r[1] ? (a[0] = a[0] / r[0],
                            a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1],
                            a[1] = a[1] / r[1])
                        }
                        return [a[0] + "px", a[1] + "px"]
                    }(),
                    title: !1,
                    shade: .9,
                    shadeClose: !0,
                    closeBtn: !1,
                    move: ".layui-layer-phimg img",
                    moveType: 1,
                    scrollbar: !1,
                    moveOut: !0,
                    anim: 5,
                    isOutAnim: !1,
                    skin: "layui-layer-photos" + c("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '">' + function() {
                        return u.length > 1 ? '<div class="layui-layer-imgsee"><span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span><div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + " / " + u.length + "</em></span></div></div>" : ""
                    }() + "</div>",
                    success: function(e, i) {
                        s.bigimg = e.find(".layui-layer-phimg"),
                        s.imgsee = e.find(".layui-layer-imgbar"),
                        s.event(e),
                        t.tab && t.tab(u[d], e),
                        "function" == typeof y && y(e)
                    },
                    end: function() {
                        s.end = !0,
                        i(document).off("keyup", s.keyup)
                    }
                }, t))
            }, function() {
                r.close(s.loadi),
                r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                    yes: function() {
                        u.length > 1 && s.imgnext(!0, !0)
                    }
                })
            })
        }
    }
    ,
    o.run = function(t) {
        i = t,
        n = i(e),
        l.html = i("html"),
        r.open = function(e) {
            var t = new s(e);
            return t.index
        }
    }
    ,
    e.layui && layui.define ? (r.ready(),
    layui.define("jquery", function(t) {
        r.path = layui.cache.dir,
        o.run(layui.$),
        e.layer = r,
        t("layer", r)
    })) : "function" == typeof define && define.amd ? define(["jquery"], function() {
        return o.run(e.jQuery),
        r
    }) : function() {
        r.ready(),
        o.run(e.jQuery)
    }()
}(window);
"client.base.js.0.2.1";
!function(e, i) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = i();
    else if ("function" == typeof define && define.amd)
        define([], i);
    else {
        var t = i();
        for (var n in t)
            ("object" == typeof exports ? exports : e)[n] = t[n]
    }
}(this, (function() {
    return function(e) {
        var i = {};
        function t(n) {
            if (i[n])
                return i[n].exports;
            var o = i[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(o.exports, o, o.exports, t),
            o.l = !0,
            o.exports
        }
        return t.m = e,
        t.c = i,
        t.d = function(e, i, n) {
            t.o(e, i) || Object.defineProperty(e, i, {
                enumerable: !0,
                get: n
            })
        }
        ,
        t.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        t.t = function(e, i) {
            if (1 & i && (e = t(e)),
            8 & i)
                return e;
            if (4 & i && "object" == typeof e && e && e.__esModule)
                return e;
            var n = Object.create(null);
            if (t.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }),
            2 & i && "string" != typeof e)
                for (var o in e)
                    t.d(n, o, function(i) {
                        return e[i]
                    }
                    .bind(null, o));
            return n
        }
        ,
        t.n = function(e) {
            var i = e && e.__esModule ? function() {
                return e["default"]
            }
            : function() {
                return e
            }
            ;
            return t.d(i, "a", i),
            i
        }
        ,
        t.o = function(e, i) {
            return Object.prototype.hasOwnProperty.call(e, i)
        }
        ,
        t.p = "",
        t(t.s = 0)
    }([function(e, i, t) {
        "use strict";
        var n, o, r = t(1)(), a = t(3), s = t(4), l = t(6), u = function() {
            var e = new s;
            return n = e.getResult(),
            o = new l,
            this
        };
        u.prototype = {
            getSoftwareVersion: function() {
                return "0.1.11"
            },
            getBrowserData: function() {
                return n
            },
            getFingerprint: function() {
                var e = "|"
                  , i = n.ua
                  , t = this.getScreenPrint()
                  , o = this.getPlugins()
                  , r = this.getFonts()
                  , s = this.isLocalStorage()
                  , l = this.isSessionStorage()
                  , u = this.getTimeZone()
                  , c = this.getLanguage()
                  , d = this.getSystemLanguage()
                  , b = this.isCookie()
                  , m = this.getCanvasPrint();
                return a(i + e + t + e + o + e + r + e + s + e + l + e + u + e + c + e + d + e + b + e + m, 256)
            },
            getCustomFingerprint: function() {
                for (var e = "|", i = "", t = 0; t < arguments.length; t++)
                    i += arguments[t] + e;
                return a(i, 256)
            },
            getUserAgent: function() {
                return n.ua
            },
            getUserAgentLowerCase: function() {
                return n.ua.toLowerCase()
            },
            getBrowser: function() {
                return n.browser.name
            },
            getBrowserVersion: function() {
                return n.browser.version
            },
            getBrowserMajorVersion: function() {
                return n.browser.major
            },
            isIE: function() {
                return /IE/i.test(n.browser.name)
            },
            isChrome: function() {
                return /Chrome/i.test(n.browser.name)
            },
            isFirefox: function() {
                return /Firefox/i.test(n.browser.name)
            },
            isSafari: function() {
                return /Safari/i.test(n.browser.name)
            },
            isMobileSafari: function() {
                return /Mobile\sSafari/i.test(n.browser.name)
            },
            isOpera: function() {
                return /Opera/i.test(n.browser.name)
            },
            getEngine: function() {
                return n.engine.name
            },
            getEngineVersion: function() {
                return n.engine.version
            },
            getOS: function() {
                return n.os.name
            },
            getOSVersion: function() {
                return n.os.version
            },
            isWindows: function() {
                return /Windows/i.test(n.os.name)
            },
            isMac: function() {
                return /Mac/i.test(n.os.name)
            },
            isLinux: function() {
                return /Linux/i.test(n.os.name)
            },
            isUbuntu: function() {
                return /Ubuntu/i.test(n.os.name)
            },
            isSolaris: function() {
                return /Solaris/i.test(n.os.name)
            },
            getDevice: function() {
                return n.device.model
            },
            getDeviceType: function() {
                return n.device.type
            },
            getDeviceVendor: function() {
                return n.device.vendor
            },
            getCPU: function() {
                return n.cpu.architecture
            },
            isMobile: function() {
                var e = n.ua || navigator.vendor || window.opera;
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
            },
            isMobileMajor: function() {
                return this.isMobileAndroid() || this.isMobileBlackBerry() || this.isMobileIOS() || this.isMobileOpera() || this.isMobileWindows()
            },
            isMobileAndroid: function() {
                return !!n.ua.match(/Android/i)
            },
            isMobileOpera: function() {
                return !!n.ua.match(/Opera Mini/i)
            },
            isMobileWindows: function() {
                return !!n.ua.match(/IEMobile/i)
            },
            isMobileBlackBerry: function() {
                return !!n.ua.match(/BlackBerry/i)
            },
            isMobileIOS: function() {
                return !!n.ua.match(/iPhone|iPad|iPod/i)
            },
            isIphone: function() {
                return !!n.ua.match(/iPhone/i)
            },
            isIpad: function() {
                return !!n.ua.match(/iPad/i)
            },
            isIpod: function() {
                return !!n.ua.match(/iPod/i)
            },
            getScreenPrint: function() {
                return "Current Resolution: " + this.getCurrentResolution() + ", Available Resolution: " + this.getAvailableResolution() + ", Color Depth: " + this.getColorDepth() + ", Device XDPI: " + this.getDeviceXDPI() + ", Device YDPI: " + this.getDeviceYDPI()
            },
            getColorDepth: function() {
                return screen.colorDepth
            },
            getCurrentResolution: function() {
                return screen.width + "x" + screen.height
            },
            getAvailableResolution: function() {
                return screen.availWidth + "x" + screen.availHeight
            },
            getDeviceXDPI: function() {
                return screen.deviceXDPI
            },
            getDeviceYDPI: function() {
                return screen.deviceYDPI
            },
            getPlugins: function() {
                for (var e = "", i = 0; i < navigator.plugins.length; i++)
                    i == navigator.plugins.length - 1 ? e += navigator.plugins[i].name : e += navigator.plugins[i].name + ", ";
                return e
            },
            isJava: function() {
                return navigator.javaEnabled()
            },
            getJavaVersion: function() {
                throw new Error("Please use client.java.js or client.js if you need this functionality!")
            },
            isFlash: function() {
                return !!navigator.plugins["Shockwave Flash"]
            },
            getFlashVersion: function() {
                throw new Error("Please use client.flash.js or client.js if you need this functionality!")
            },
            isSilverlight: function() {
                return !!navigator.plugins["Silverlight Plug-In"]
            },
            getSilverlightVersion: function() {
                return this.isSilverlight() ? navigator.plugins["Silverlight Plug-In"].description : ""
            },
            isMimeTypes: function() {
                return !(!navigator.mimeTypes || !navigator.mimeTypes.length)
            },
            getMimeTypes: function() {
                var e = "";
                if (navigator.mimeTypes)
                    for (var i = 0; i < navigator.mimeTypes.length; i++)
                        i == navigator.mimeTypes.length - 1 ? e += navigator.mimeTypes[i].description : e += navigator.mimeTypes[i].description + ", ";
                return e
            },
            isFont: function(e) {
                return o.detect(e)
            },
            getFonts: function() {
                for (var e = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"], i = "", t = 0; t < e.length; t++)
                    o.detect(e[t]) && (i += t == e.length - 1 ? e[t] : e[t] + ", ");
                return i
            },
            isLocalStorage: function() {
                try {
                    return !!r.localStorage
                } catch (e) {
                    return !0
                }
            },
            isSessionStorage: function() {
                try {
                    return !!r.sessionStorage
                } catch (e) {
                    return !0
                }
            },
            isCookie: function() {
                return navigator.cookieEnabled
            },
            getTimeZone: function() {
                var e, i;
                return e = new Date,
                (i = String(-e.getTimezoneOffset() / 60)) < 0 ? "-" + ("0" + (i *= -1)).slice(-2) : "+" + ("0" + i).slice(-2)
            },
            getLanguage: function() {
                return navigator.language
            },
            getSystemLanguage: function() {
                return navigator.systemLanguage || window.navigator.language
            },
            isCanvas: function() {
                var e = document.createElement("canvas");
                try {
                    return !(!e.getContext || !e.getContext("2d"))
                } catch (i) {
                    return !1
                }
            },
            getCanvasPrint: function() {
                var e, i = document.createElement("canvas");
                try {
                    e = i.getContext("2d")
                } catch (n) {
                    return ""
                }
                var t = "ClientJS,org <canvas> 1.0";
                return e.textBaseline = "top",
                e.font = "14px 'Arial'",
                e.textBaseline = "alphabetic",
                e.fillStyle = "#f60",
                e.fillRect(125, 1, 62, 20),
                e.fillStyle = "#069",
                e.fillText(t, 2, 15),
                e.fillStyle = "rgba(102, 204, 0, 0.7)",
                e.fillText(t, 4, 17),
                i.toDataURL()
            }
        },
        i.ClientJS = u
    }
    , function(e, i, t) {
        "use strict";
        var n = t(2);
        e.exports = function() {
            return "object" == typeof global && global && global.Math === Math && global.Array === Array ? global : n
        }
    }
    , function(e, i, t) {
        "use strict";
        "undefined" != typeof self ? e.exports = self : "undefined" != typeof window ? e.exports = window : e.exports = Function("return this")()
    }
    , function(e, i, t) {
        e.exports = function(e, i) {
            var t, n, o, r, a, s, l, u;
            for (t = 3 & e.length,
            n = e.length - t,
            o = i,
            a = 3432918353,
            s = 461845907,
            u = 0; u < n; )
                l = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(++u)) << 8 | (255 & e.charCodeAt(++u)) << 16 | (255 & e.charCodeAt(++u)) << 24,
                ++u,
                o = 27492 + (65535 & (r = 5 * (65535 & (o = (o ^= l = (65535 & (l = (l = (65535 & l) * a + (((l >>> 16) * a & 65535) << 16) & 4294967295) << 15 | l >>> 17)) * s + (((l >>> 16) * s & 65535) << 16) & 4294967295) << 13 | o >>> 19)) + ((5 * (o >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (r >>> 16) & 65535) << 16);
            switch (l = 0,
            t) {
            case 3:
                l ^= (255 & e.charCodeAt(u + 2)) << 16;
            case 2:
                l ^= (255 & e.charCodeAt(u + 1)) << 8;
            case 1:
                o ^= l = (65535 & (l = (l = (65535 & (l ^= 255 & e.charCodeAt(u))) * a + (((l >>> 16) * a & 65535) << 16) & 4294967295) << 15 | l >>> 17)) * s + (((l >>> 16) * s & 65535) << 16) & 4294967295
            }
            return o ^= e.length,
            o = 2246822507 * (65535 & (o ^= o >>> 16)) + ((2246822507 * (o >>> 16) & 65535) << 16) & 4294967295,
            o = 3266489909 * (65535 & (o ^= o >>> 13)) + ((3266489909 * (o >>> 16) & 65535) << 16) & 4294967295,
            (o ^= o >>> 16) >>> 0
        }
    }
    , function(e, i, t) {
        var n;
        !function(o, r) {
            "use strict";
            var a = "function"
              , s = "undefined"
              , l = "object"
              , u = "string"
              , c = "model"
              , d = "name"
              , b = "type"
              , m = "vendor"
              , w = "version"
              , g = "architecture"
              , p = "console"
              , f = "mobile"
              , h = "tablet"
              , v = "smarttv"
              , y = "wearable"
              , x = "embedded"
              , k = "Amazon"
              , S = "Apple"
              , C = "ASUS"
              , M = "BlackBerry"
              , P = "Firefox"
              , T = "Google"
              , B = "Huawei"
              , A = "LG"
              , L = "Microsoft"
              , U = "Motorola"
              , E = "Opera"
              , G = "Samsung"
              , N = "Sony"
              , j = "Xiaomi"
              , _ = "Zebra"
              , R = "Facebook"
              , D = function(e) {
                var i = {};
                for (var t in e)
                    i[e[t].toUpperCase()] = e[t];
                return i
            }
              , I = function(e, i) {
                return typeof e === u && -1 !== O(i).indexOf(O(e))
            }
              , O = function(e) {
                return e.toLowerCase()
            }
              , z = function(e, i) {
                if (typeof e === u)
                    return e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
                    typeof i === s ? e : e.substring(0, 255)
            }
              , F = function(e, i) {
                for (var t, n, o, s, u, c, d = 0; d < i.length && !u; ) {
                    var b = i[d]
                      , m = i[d + 1];
                    for (t = n = 0; t < b.length && !u; )
                        if (u = b[t++].exec(e))
                            for (o = 0; o < m.length; o++)
                                c = u[++n],
                                typeof (s = m[o]) === l && s.length > 0 ? 2 == s.length ? typeof s[1] == a ? this[s[0]] = s[1].call(this, c) : this[s[0]] = s[1] : 3 == s.length ? typeof s[1] !== a || s[1].exec && s[1].test ? this[s[0]] = c ? c.replace(s[1], s[2]) : r : this[s[0]] = c ? s[1].call(this, c, s[2]) : r : 4 == s.length && (this[s[0]] = c ? s[3].call(this, c.replace(s[1], s[2])) : r) : this[s] = c || r;
                    d += 2
                }
            }
              , q = function(e, i) {
                for (var t in i)
                    if (typeof i[t] === l && i[t].length > 0) {
                        for (var n = 0; n < i[t].length; n++)
                            if (I(i[t][n], e))
                                return "?" === t ? r : t
                    } else if (I(i[t], e))
                        return "?" === t ? r : t;
                return e
            }
              , W = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM"
            }
              , V = {
                browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [w, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [w, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, w], [/opios[\/ ]+([\w\.]+)/i], [w, [d, "Opera Mini"]], [/\bopr\/([\w\.]+)/i], [w, [d, E]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i], [d, w], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [w, [d, "UCBrowser"]], [/\bqbcore\/([\w\.]+)/i], [w, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [w, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [w, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [w, [d, "IE"]], [/yabrowser\/([\w\.]+)/i], [w, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure Browser"], w], [/\bfocus\/([\w\.]+)/i], [w, [d, "Firefox Focus"]], [/\bopt\/([\w\.]+)/i], [w, [d, "Opera Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [w, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [w, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [w, [d, "Opera Coast"]], [/miuibrowser\/([\w\.]+)/i], [w, [d, "MIUI Browser"]], [/fxios\/([-\w\.]+)/i], [w, [d, P]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 Browser"]], [/(oculus|samsung|sailfish)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 Browser"], w], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], w], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, w], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, R], w], [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, w], [/\bgsa\/([\w\.]+) .*safari\//i], [w, [d, "GSA"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [w, [d, "Chrome Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, "Chrome WebView"], w], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [w, [d, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, w], [/version\/([\w\.]+) .*mobile\/\w+ (safari)/i], [w, [d, "Mobile Safari"]], [/version\/([\w\.]+) .*(mobile ?safari|safari)/i], [w, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [w, q, {
                    "1.0": "/8",
                    1.2: "/1",
                    1.3: "/3",
                    "2.0": "/412",
                    "2.0.2": "/416",
                    "2.0.3": "/417",
                    "2.0.4": "/419",
                    "?": "/"
                }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, w], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], w], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [w, [d, "Firefox Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], [d, w]],
                cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, O]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", O]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, O]]],
                device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [m, G], [b, h]], [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [m, G], [b, f]], [/\((ip(?:hone|od)[\w ]*);/i], [c, [m, S], [b, f]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [m, S], [b, h]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [m, B], [b, h]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i], [c, [m, B], [b, f]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [m, j], [b, f]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [m, j], [b, h]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i], [c, [m, "OPPO"], [b, f]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [m, "Vivo"], [b, f]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [m, "Realme"], [b, f]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [m, U], [b, f]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [m, U], [b, h]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [m, A], [b, h]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [m, A], [b, f]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [m, "Lenovo"], [b, h]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [m, "Nokia"], [b, f]], [/(pixel c)\b/i], [c, [m, T], [b, h]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [m, T], [b, f]], [/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [m, N], [b, f]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [m, N], [b, h]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [m, "OnePlus"], [b, f]], [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [m, k], [b, h]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [m, k], [b, f]], [/(playbook);[-\w\),; ]+(rim)/i], [c, m, [b, h]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [m, M], [b, f]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [m, C], [b, h]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [m, C], [b, f]], [/(nexus 9)/i], [c, [m, "HTC"], [b, h]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i], [m, [c, /_/g, " "], [b, f]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [m, "Acer"], [b, h]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [m, "Meizu"], [b, f]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [m, "Sharp"], [b, f]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, c, [b, f]], [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, c, [b, h]], [/(surface duo)/i], [c, [m, L], [b, h]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [m, "Fairphone"], [b, f]], [/(u304aa)/i], [c, [m, "AT&T"], [b, f]], [/\bsie-(\w*)/i], [c, [m, "Siemens"], [b, f]], [/\b(rct\w+) b/i], [c, [m, "RCA"], [b, h]], [/\b(venue[\d ]{2,7}) b/i], [c, [m, "Dell"], [b, h]], [/\b(q(?:mv|ta)\w+) b/i], [c, [m, "Verizon"], [b, h]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [m, "Barnes & Noble"], [b, h]], [/\b(tm\d{3}\w+) b/i], [c, [m, "NuVision"], [b, h]], [/\b(k88) b/i], [c, [m, "ZTE"], [b, h]], [/\b(nx\d{3}j) b/i], [c, [m, "ZTE"], [b, f]], [/\b(gen\d{3}) b.+49h/i], [c, [m, "Swiss"], [b, f]], [/\b(zur\d{3}) b/i], [c, [m, "Swiss"], [b, h]], [/\b((zeki)?tb.*\b) b/i], [c, [m, "Zeki"], [b, h]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], c, [b, h]], [/\b(ns-?\w{0,9}) b/i], [c, [m, "Insignia"], [b, h]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [m, "NextBook"], [b, h]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], c, [b, f]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], c, [b, f]], [/\b(ph-1) /i], [c, [m, "Essential"], [b, f]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [m, "Envizen"], [b, h]], [/\b(trio[-\w\. ]+) b/i], [c, [m, "MachSpeed"], [b, h]], [/\btu_(1491) b/i], [c, [m, "Rotor"], [b, h]], [/(shield[\w ]+) b/i], [c, [m, "Nvidia"], [b, h]], [/(sprint) (\w+)/i], [m, c, [b, f]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [m, L], [b, f]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [m, _], [b, h]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [m, _], [b, f]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, c, [b, p]], [/droid.+; (shield) bui/i], [c, [m, "Nvidia"], [b, p]], [/(playstation [345portablevi]+)/i], [c, [m, N], [b, p]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [m, L], [b, p]], [/smart-tv.+(samsung)/i], [m, [b, v]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [m, G], [b, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, A], [b, v]], [/(apple) ?tv/i], [m, [c, "Apple TV"], [b, v]], [/crkey/i], [[c, "Chromecast"], [m, T], [b, v]], [/droid.+aft(\w)( bui|\))/i], [c, [m, k], [b, v]], [/\(dtv[\);].+(aquos)/i], [c, [m, "Sharp"], [b, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i], [[m, z], [c, z], [b, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[b, v]], [/((pebble))app/i], [m, c, [b, y]], [/droid.+; (glass) \d/i], [c, [m, T], [b, y]], [/droid.+; (wt63?0{2,3})\)/i], [c, [m, _], [b, y]], [/(quest( 2)?)/i], [c, [m, R], [b, y]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [b, x]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [b, f]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [b, h]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[b, h]], [/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i], [[b, f]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [m, "Generic"]]],
                engine: [[/windows.+ edge\/([\w\.]+)/i], [w, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [w, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i], [d, w], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [w, d]],
                os: [[/microsoft (windows) (vista|xp)/i], [d, w], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [w, q, W]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [w, q, W]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i], [[w, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, "Mac OS"], [w, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86)/i], [w, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, w], [/\(bb(10);/i], [w, [d, M]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [w, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [w, [d, "Firefox OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [w, [d, "webOS"]], [/crkey\/([\d\.]+)/i], [w, [d, "Chromecast"]], [/(cros) [\w]+ ([\w\.]+\w)/i], [[d, "Chromium OS"], w], [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, w], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], w], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i], [d, w]]
            }
              , H = function(e, i) {
                if (typeof e === l && (i = e,
                e = r),
                !(this instanceof H))
                    return new H(e,i).getResult();
                var t = e || (typeof o !== s && o.navigator && o.navigator.userAgent ? o.navigator.userAgent : "")
                  , n = i ? function(e, i) {
                    var t = {};
                    for (var n in e)
                        i[n] && i[n].length % 2 == 0 ? t[n] = i[n].concat(e[n]) : t[n] = e[n];
                    return t
                }(V, i) : V;
                return this.getBrowser = function() {
                    var e, i = {};
                    return i.name = r,
                    i.version = r,
                    F.call(i, t, n.browser),
                    i.major = typeof (e = i.version) === u ? e.replace(/[^\d\.]/g, "").split(".")[0] : r,
                    i
                }
                ,
                this.getCPU = function() {
                    var e = {};
                    return e.architecture = r,
                    F.call(e, t, n.cpu),
                    e
                }
                ,
                this.getDevice = function() {
                    var e = {};
                    return e.vendor = r,
                    e.model = r,
                    e.type = r,
                    F.call(e, t, n.device),
                    e
                }
                ,
                this.getEngine = function() {
                    var e = {};
                    return e.name = r,
                    e.version = r,
                    F.call(e, t, n.engine),
                    e
                }
                ,
                this.getOS = function() {
                    var e = {};
                    return e.name = r,
                    e.version = r,
                    F.call(e, t, n.os),
                    e
                }
                ,
                this.getResult = function() {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    }
                }
                ,
                this.getUA = function() {
                    return t
                }
                ,
                this.setUA = function(e) {
                    return t = typeof e === u && e.length > 255 ? z(e, 255) : e,
                    this
                }
                ,
                this.setUA(t),
                this
            };
            H.VERSION = "0.7.30",
            H.BROWSER = D([d, w, "major"]),
            H.CPU = D([g]),
            H.DEVICE = D([c, m, b, p, f, v, h, y, x]),
            H.ENGINE = H.OS = D([d, w]),
            typeof i !== s ? (typeof e !== s && e.exports && (i = e.exports = H),
            i.UAParser = H) : t(5) ? (n = function() {
                return H
            }
            .call(i, t, i, e)) === r || (e.exports = n) : typeof o !== s && (o.UAParser = H);
            var K = typeof o !== s && (o.jQuery || o.Zepto);
            if (K && !K.ua) {
                var Y = new H;
                K.ua = Y.getResult(),
                K.ua.get = function() {
                    return Y.getUA()
                }
                ,
                K.ua.set = function(e) {
                    Y.setUA(e);
                    var i = Y.getResult();
                    for (var t in i)
                        K.ua[t] = i[t]
                }
            }
        }("object" == typeof window ? window : this)
    }
    , function(e, i) {
        (function(i) {
            e.exports = i
        }
        ).call(this, {})
    }
    , function(e, i) {
        e.exports = function() {
            var e = ["monospace", "sans-serif", "serif"]
              , i = document.getElementsByTagName("body")[0]
              , t = document.createElement("span");
            t.style.fontSize = "72px",
            t.innerHTML = "mmmmmmmmmmlli";
            var n = {}
              , o = {};
            for (var r in e)
                t.style.fontFamily = e[r],
                i.appendChild(t),
                n[e[r]] = t.offsetWidth,
                o[e[r]] = t.offsetHeight,
                i.removeChild(t);
            this.detect = function(r) {
                var a = !1;
                for (var s in e) {
                    t.style.fontFamily = r + "," + e[s],
                    i.appendChild(t);
                    var l = t.offsetWidth != n[e[s]] || t.offsetHeight != o[e[s]];
                    i.removeChild(t),
                    a = a || l
                }
                return a
            }
        }
    }
    ])
}
));

var currentPath = 'https://cpt.9136.com/';
var tradeHost = 'https://cpt.9136.com/';
var timeNum = '222';
//\u7528\u4e8e\u505a\u662f\u5426\u514d\u8d39\u7684\u6807\u8bc6
var showdl = 0;
//1\u4e3a\u663e\u793a -1\u4e3a\u9690\u85cf   0\u4e3a\u9690\u85cf\u5e76\u4e14\u8ba1\u65f6\u5668\u4e0d\u505c\u6b62   \uff08\u4e0b\u8f7d\uff09
var showgg = -1;
//1\u4e3a\u663e\u793a -1\u4e3a\u9690\u85cf
var textLen = 0;
var jsonKey = '';
var client = new ClientJS();
var fingerprint = client.getFingerprint();
var utc = new Date();
var requestSuffix = utc.getUTCFullYear() + "_" + utc.getMonth() + "_" + utc.getDate() + "_" + (Math.floor(utc.getHours() / 3));
var globalAType;
function runCpt() {
    "v1-1.12";
    function getQrCode(a) {
        function b() {
            var a, b;
            showdl || (showdl = -1),
            qr || (qr = "rand"),
            a = currentPath + "qr/" + qr + ".jpg?" + requestSuffix,
            b = currentPath + "json/alert.4" + jsonKey + ".json?" + requestSuffix,
            $.ajax({
                url: b,
                dataType: "json",
                success: function(b) {
                    var c, d, e, f, g, h;
                    for (price = b.price,
                    goods = b.goods,
                    goodsDis = b.goodsDis,
                    c = setTimeout(function() {
                        timeNum = "222",
                        clearTimeout(c)
                    }, b.time),
                    d = b.queList,
                    e = "",
                    f = 0; f < d.length; f++)
                        //e += '<li>	<div class="que">' + d[f].que + "</div>" + '	<div class="ans">' + d[f].ans + "</div>" + "</li>";
                    //g = b.alert,
                    //h = "<div class='copy_mask mask' style='display: none;'><div class='copy-alert alert-bounceIn'><div class='close' data-alert='copy_mask'></div><div class='paybox'>   <div class='paybox-title'>" + g.title + "</div>" + "   <div class='paybox-art'>" + g.art + "</div>" + "   <div class='paybox-img'><img loading='lazy' src='" + currentPath + "img/pay.jpg'></div>" + "   <div class='paybox-money'><h2>" + g.price[0] + price + g.price[1] + "</h2><span>" + g.price[2] + "</span></div>" + "   <div class='paybox-bottom online-pay'>" + g.pT + "</div>" + "   <div class='paybox-service'>" + "       <span class='customer-service'>" + g.service[1] + "</span>" + "   </div>" + "</div>" + "<div class='codebox'>" + "   <div class='codebox_title'>" + g.freeT + "</div>" + "   <div class='codebox_tip'>" + g.tip + "</div>" + "   <div class='codebox_tip codebox_tip_2'>\u5FEB\u81F35\u79D2</div>" + "   <img loading='lazy' class='codebox_qrcode' src='" + a + "'>" + "   <div class='codebox_search'>" + "       <input type='text' name='q' placeholder='" + g.placeholder + "' class='houhao_bar'>" + "       <input type='button' value='\u786E\u8BA4' class='houhaoresults' data-range-pass='" + JSON.stringify(b.codePass) + "' data-range-next='" + JSON.stringify(b.codeNext) + "'></div>" + "   <div class='codebox_tips'>" + g.tip_s + "</div>" + "</div>" + "</div></div>",
                    //$("body").append(h + payBox + paySuccessBox + customBox + scanDiscountBox(b.alertDis) + scanDiscountQrBox(qr, b.codeDis)),
                    //$(".customer_service_box ul").append(e),
                    //$(".pay_mask .pay_qrcode img").attr("src", loadQrImg),
                    //$(".pay_mask").bind("beforeShow", function() {
                        //$(".discount_price_txt", this).css("display", useDis ? "block" : "none")
                    })
                }
            })
        }
        return a ? (b(),
        void 0) : ($.ajax({
            url: tradeHost + "v1/trade/qr/free.3",
            data: {
                title: title,
                scan: scan,
                fp: fingerprint,
                fpact: "r",
                city: city,
                lanmu: lanmu,
                k: Math.random()
            },
            method: "GET",
            timeout: 3e3,
            success: function(a) {
                "ALL_SCANNED" === a.qr || (qr = a.qr),
                a.scan.length > 0 && (Cookies.set("scan_list", a.scan, {
                    expires: 30,
                    path: "/"
                }),
                scan_list = a.scan.split("."))
            },
            complete: function() {
                b()
            }
        }),
        void 0)
    }
    function codeSuccess() {
        $(".mask").hide(),
        layer.msg("\u606D\u559C\u60A8\uFF01\u9A8C\u8BC1\u7801\u6B63\u786E\uFF0C\u60A8\u5DF2\u83B7\u5F97VIP\u514D\u8D39\u590D\u5236\u6743\u9650\uFF0C\u9A6C\u4E0A\u590D\u5236\u5427\uFF01", {
            icon: 6,
            time: 800
        }),
        log({
            type: "code",
            value: qr
        }, function() {
            Cookies.set(qrCookieKey, 1, {
                expires: 1
            }),
            scan_list.indexOf(qr) < 0 && (scan_list.push(qr),
            Cookies.set("scan_list", scan_list.join("."), {
                expires: 30,
                path: "/"
            }),
            $.ajax({
                url: tradeHost + "v1/trade/qr/free.3",
                data: {
                    title: title,
                    scan: scan_list.join("."),
                    fp: fingerprint,
                    fpact: "w",
                    city: city,
                    lanmu: lanmu,
                    k: Math.random()
                },
                method: "GET",
                timeout: 3e3,
                success: function() {},
                complete: function() {}
            }).fail(function() {
                console.log("request err")
            }))
        })
    }
    function getQueryVariable(a) {
        var d, e, b = window.location.search.substring(1), c = b.split("&");
        for (d = 0; d < c.length; d++)
            if (e = c[d].split("="),
            e[0] == a)
                return e[1];
        return !1
    }
    function log(a, b) {
        var d, c = "undefined" == typeof FINGER_PRINT ? !1 : !0;
        return c ? (d = {
            goods_type: "copy",
            terminal: "pc",
            event_type: a.type,
            event_value: JSON.stringify([FINGER_PRINT, a.value, document.referrer])
        },
        $.ajax({
            url: tradeHost + "statistics/log?" + Math.random(),
            data: {
                value: JSON.stringify(d)
            },
            dataType: "json"
        }).always(function() {
            b && b()
        }),
        void 0) : (b && b(),
        void 0)
    }
    function look_log() {
        var d, a = parseInt((new Date).getTime() / 1e3) / 60, b = "undefined" == typeof FINGER_PRINT ? !1 : !0, c = Cookies.get("log" + qrCookieKey);
        !b || 15 > a - c || (d = {
            goods_type: "look",
            terminal: "pc",
            event_type: "look",
            event_value: JSON.stringify([FINGER_PRINT, document.referrer])
        },
        $.ajax({
            url: tradeHost + "statistics/log?" + Math.random(),
            data: {
                value: JSON.stringify(d)
            },
            dataType: "json",
            success: function() {
                Cookies.set("log" + qrCookieKey, a, {
                    expires: 1
                })
            }
        }).fail(function() {
            console.log("request err")
        }))
    }
    function hashCode(a) {
        var b = 0
          , c = a.length
          , d = 0;
        if (c > 0)
            for (; c > d; )
                b = 0 | (b << 5) - b + a.charCodeAt(d++);
        return b
    }
    var price, goods, goodsDis, useDis, closeCallbacks, startTime = parseInt((new Date).getTime() / 1e3), payBox = '<div class="pay_mask mask" style="display: none;">\n    <div class="mask_box alert-bounceIn">\n        <div class="pay_mask_top">\u6B22\u8FCE\u4F7F\u7528\u5FAE\u4FE1\u652F\u4ED8</div>\n        <div class="pay_qrcode">\n            <img loading="lazy" src="">\n        </div>\n        <div class="pay_tip"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAIVBMVEUAAAD////////////////////////////////////////PIev5AAAACnRSTlMA1ncNunNiOTUTSsYRYQAAAENJREFUCNdjiFq1armxcdWqVUsZligpKTMwGCkpeTEsY4CCLIZFMKYWYWYnjDmDAQkIwgEyEwGQtJFkG8KRyE5HeAgAREcaCU+naWkAAAAASUVORK5CYII=" alt="">\u626B\u4E00\u626B\u5FAE\u4FE1\u652F\u4ED8</div>\n        <div class="pay_price">\u5FAE\u4FE1\u652F\u4ED8\uFF1A<span></span><p class="discount_price_txt" style="display:none;">\u5DF2\u4F18\u60E04\u5143</p></div>\n        <div class="close" data-alert="pay_mask"></div>\n    </div>\n</div>', paySuccessBox = '<div class="buy_success mask" style="display: none;">\n    <div class="mask_box alert-bounceIn">\n		 <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1629"><path d="M511.993344 0.002048C229.260838 0.002048 0 229.261862 0 511.998464c0 282.732506 229.259814 511.990272 511.993344 511.990272C794.73097 1023.987712 1023.988736 794.73097 1023.988736 511.998464c0-282.736602-229.257766-511.996416-511.995392-511.996416zM788.582942 397.083376L475.699087 709.96723C464.321548 721.341697 449.189043 727.145665 434.1702 727.145665c-15.018843 0-30.036662-5.687233-41.527863-17.177411l-157.23859-157.241662c-22.982403-22.865668-22.982403-60.072299 0-83.054702 22.982403-22.982403 60.074347-22.86874 83.05675 0l115.823366 115.710727 271.352919-271.357015c22.871812-22.86874 60.074347-22.86874 83.05675 0 22.871812 22.983427 22.871812 60.189034-0.11059 83.057774z" fill="" p-id="1630"></path></svg>        <div class="buy_success_tip1">\u652F\u4ED8\u6210\u529F</div>\n        <div class="buy_success_tip2">\u5DF2\u83B7\u5F97\u6587\u7AE0\u590D\u5236\u6743\u9650</div>\n        <div class="buy_btn_qr">\u786E\u5B9A</div>\n    </div>\n</div>', scanDiscountBox = function(a) {
        return '<div class="xtiper_1 xtiper mask" style="display: none;">\n    <div class="xtiper_main alert-bounceIn">\n        <div class="xtiper_tit"><p>' + a.title + "</p>\n" + '            <div class="close" data-alert="xtiper_1"></div>\n' + "        </div>\n" + '        <div class="xtiper_tip">\n' + '            <i class="xtiper_icon"> </i>\n' + '            <div class="xtiper_con">' + a.art + "</div>\n" + "        </div>\n" + '        <div class="xtiper_btn">\n' + "            <ul>\n" + '                <li class="pay_discount active"><button>' + a.btn[0] + "</button></li>\n" + '                <li class="next_discount active"><button>' + a.btn[1] + "</button></li>\n" + "            </ul>\n" + '            <div class="xtiper_btnbor"></div>\n' + "        </div>\n" + "    </div>\n" + "</div>"
    }, scanDiscountLastBox = function(a) {
        return '<div class="xtiper_2 xtiper mask" style="display: none;">\n    <div class="xtiper_main alert-bounceIn">\n        <div class="xtiper_tit"><p>\u6E29\u99A8\u63D0\u9192</p>\n        </div>\n        <div class="xtiper_tip">\n            <i class="xtiper_icon"> </i>\n            <div class="xtiper_con">' + a.text + "</div>\n" + "        </div>\n" + '        <div class="xtiper_btn">\n' + "            <ul>\n" + '                <li class="pay_discount active close_btn" data-alert="mask"><button>\u72FC\u5FC3\u5173\u95ED</button></li>\n' + '                <li class="next_discount active close_btn" data-alert="xtiper_2" data-callback="' + a.callback + '"><button>\u5173\u6CE8\u6700\u540E1\u4E2A\u516C\u4F17\u53F7</button></li>\n' + "            </ul>\n" + '            <div class="xtiper_btnbor"></div>\n' + "        </div>\n" + "    </div>\n" + "</div>"
    }, scanDiscountQrBox = function(a, b) {
        return a += "_03",
        '<div class="pay_tc mask" style="display: none;">\n    <div class="pay_con alert-bounceIn">\n        <div class="pay_con_nr">\n            <div class="help_head"><span>\u514D\u8D39</span>\u590D\u5236\u65B9\u6CD5\u6307\u5F15</div>\n            <span class="gghjz">\u626B\u7801\u5173\u6CE8\u9886\u53D6\u9A8C\u8BC1\u7801!<br>\u53EA\u97001\u79D2</span>\n            <div class="erweima"><img loading="lazy" src="' + currentPath + "qr/" + a + ".jpg?" + requestSuffix + '"></div>\n' + '            <div class="houhao_search2">\n' + '                <input type="text" maxlength="4" id="code3" name="code3" placeholder="\u8BF7\u5728\u8FD9\u91CC\u8F93\u5165\u9A8C\u8BC1\u7801" class="houhao_bar2">\n' + '                <input type="button" value="\u786E\u5B9A" class="houhaoresults2" data-range="' + JSON.stringify(b) + '">\n' + "            </div>\n" + '            <span class="gghjz2">\u8F93\u5165\u9A8C\u8BC1\u7801\u540E\u53EF<span style="color: #d00;">\u514D\u8D39</span>\u590D\u5236\u3002</span>\n' + '            <div class="close" data-alert="pay_tc" data-callback="showDiscountLastBox" data-callback-value=\'' + JSON.stringify({
            text: "\u4EB2\uFF0C\u60A8\u53EA\u9700\u8981\u518D\u5173\u6CE81\u4E2A\u516C\u4F17\u53F7\u9886\u53D6\u9A8C\u8BC1\u7801\uFF0C\u5373\u53EF\u514D\u8D39\u83B7\u5F97\u5168\u7AD930\u5929\u590D\u5236\u6743\u9650\uFF01"
        }) + "'></div>\n" + "        </div>\n" + "    </div>\n" + "</div>"
    }, customBox = '<div class="customer_mask mask" style="display: none;">	<div class="customer_service_box" style="margin: 112px auto 0;width:730px;">       <div class="close" data-alert="customer_mask"></div>		<div class="cj_title"><span>\u5E38\u89C1\u95EE\u9898</span></div>		<ul>		</ul>	</div></div>', qrCookieKey = hashCode(window.location.pathname.replace(/[_-]\d+.htm/, ".htm")).toString(), payCookieKey = "copyKey", title = document.title, scan = Cookies.get("scan_list") || "", scan_list = scan ? scan.split(".") : [], qr = qrDis = "", ispaying = !1, buystate = null, setState = null, loadQrImg = currentPath + "img/wxzhifu_load.gif", city = "";
    lanmuArr = $("body").html().match(/.*?<code>&gt;<\/code>/g) || [],
    lanmuArr.splice(0, 1),
    lanmu = $("<div>" + lanmuArr.join("") + "</div>").text() || "",
    $.ajax({
        url: tradeHost + "v1/trade/qr/free.3",
        data: {
            title: title,
            scan: scan,
            fp: fingerprint,
            fpact: "r",
            city: city,
            lanmu: lanmu,
            k: Math.random()
        },
        method: "GET",
        timeout: 3e3,
        success: function(a) {
            globalAType = a.a_type,
            showgg = "y" === a.sp ? 1 : -1,
            showdl = "y" === a.dl ? 1 : -1,
            "ALL_SCANNED" === a.qr || (qr = a.qr),
            a.scan.length > 0 && (Cookies.set("scan_list", a.scan, {
                expires: 30,
                path: "/"
            }),
            scan_list = a.scan.split(".")),
            (a.qr.indexOf("spec_") > -1 || "ALL_SCANNED" === a.qr) && scan.indexOf("city") < 0 ? $.ajax({
                url: "https://apis.map.qq.com/ws/location/v1/ip",
                data: {
                    key: "4X5BZ-7F4HU-3Q6VL-BOOHJ-ROE7V-L6BVG",
                    output: "jsonp"
                },
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "callback",
                timeout: 3e3,
                success: function(a) {
                    0 === a.status && a.result.ad_info && (a.result.ad_info.city ? (city = a.result.ad_info.city,
                    a.result.ad_info.district && (city += a.result.ad_info.district)) : city = a.result.ad_info.province)
                },
                complete: function() {
                    getQrCode()
                }
            }) : getQrCode(!0)
        }
    }),
    $(document).ready(function() {
        var a = getQueryVariable("code");
        Number(a) >= 8e3 && Number(a) <= 9e3 && Cookies.set(qrCookieKey, 1, {
            expires: 1
        }),
        look_log()
    }),
    $(document).on("click", ".copy_mask .customer-service", function() {
        $(".customer_mask").show()
    }),
    closeCallbacks = {
        showDiscountLastBox: function(a) {
            $(".xtiper_2").remove(),
            $("body").append(scanDiscountLastBox(a)),
            $(".xtiper_2").css("display", "block")
        },
        showDiscountQrBox: function() {
            $(".xtiper_1").css("display", "none"),
            $(".xtiper_2").css("display", "none"),
            $(".pay_mask").css("display", "none"),
            $(".pay_tc").css("display", "block")
        }
    },
    $(document).on("click", ".mask .close,.mask .close_btn", function() {
        var a = $(this).data("callback")
          , b = $(this).data("callbackValue");
        return a && closeCallbacks[a] ? (closeCallbacks[a](b),
        void 0) : "pay_mask" === $(this).data("alert") && useDis ? (closeCallbacks.showDiscountLastBox({
            text: '\u4EB2\uFF0C\u89C9\u5F97\u8D35\u4E86\uFF0C\u4E0D\u60F3\u4ED8\u6B3E\uFF0C\u60A8\u53EA\u9700\u70B9\u51FB\u53F3\u4E0B\u65B9"\u5173\u6CE8\u6700\u540E1\u4E2A\u516C\u4F17\u53F7"\u9886\u53D6\u9A8C\u8BC1\u7801\uFF0C\u5373\u53EF\u514D\u8D39\u83B7\u5F97\u5168\u7AD930\u5929\u590D\u5236\u6743\u9650',
            callback: "showDiscountQrBox"
        }),
        void 0) : ($(this).data("unstopPay") || ($(".pay_mask .pay_qrcode img").attr("src", loadQrImg),
        ispaying = !1,
        window.clearInterval(buystate),
        window.clearTimeout(setState)),
        $("." + $(this).data("alert")).css("display", "none"),
        void 0)
    }),
    $(document).on("click", ".buy_btn_qr", function() {
        $(".mask").hide()
    }),
    $(document).on("click", ".paybox-bottom.online-pay", function() {
        ispaying || (ispaying = !0,
        $(".pay_mask").show(),
        $.ajax({
            url: tradeHost + "v1/wechat/normal/pay/goods",
            data: {
                id: useDis ? goodsDis : goods,
                rd: window.location.href.split("?")[0],
                title: title,
                referer: encodeURIComponent(document.referrer),
                city: encodeURIComponent(city),
                k: Math.random()
            },
            method: "GET",
            dataType: "JSON",
            timeout: 1e4,
            success: function(a) {
                $(".pay_mask .pay_qrcode img").attr("src", a.src),
                $(".pay_mask .pay_price span").text(a.msg + "\u5143"),
                $(".pay_mask").show(),
                buystate = setInterval(function() {
                    $.getJSON(tradeHost + "v1/trade/copytext/copy/" + a.order + "?" + Math.random(), function(b) {
                        "OK" === b.state && (log({
                            type: "pay",
                            value: "copy" + a.order
                        }),
                        $(".mask").hide(),
                        $(".buy_success").show(),
                        Cookies.set(payCookieKey, 1, {
                            expires: 30,
                            path: "/"
                        }),
                        ispaying = !1,
                        clearInterval(buystate))
                    })
                }, 1500)
            },
            complete: function() {}
        }))
    }),
    document.addEventListener("copy", function(a) {
        var b = Cookies.get(payCookieKey)
          , c = Cookies.get(qrCookieKey);
        void 0 === b && void 0 === c && "222" === timeNum ? ($(".copy_mask").show(),
        log({
            type: "alert",
            value: parseInt((new Date).getTime() / 1e3) - startTime
        }),
        a.preventDefault()) : layer.msg("\u5DF2\u590D\u5236\u6210\u529F", {
            icon: 6,
            time: 800
        })
    }),
    $(document).on("click", ".houhaoresults", function() {
        var a = parseInt($(this).prev().val())
          , b = $(this).data("rangePass")
          , c = $(this).data("rangeNext");
        b.indexOf(a) > -1 ? codeSuccess() : c.indexOf(a) > -1 ? $(".xtiper_1").css("display", "block") : alert("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u5FAE\u4FE1\u626B\u7801\u5173\u6CE8\uFF0C\u5373\u53EF\u83B7\u5F97\u9A8C\u8BC1\u7801")
    }),
    $(document).on("click", ".xtiper_1 .xtiper_btn .pay_discount", function() {
        useDis = !0,
        $(".paybox-bottom.online-pay").trigger("click")
    }),
    $(document).on("click", ".xtiper_1 .xtiper_btn .next_discount", function() {
        $(".pay_tc").css("display", "block")
    }),
    $(document).on("click", ".pay_tc .houhaoresults2", function() {
        var a = parseInt($(this).prev().val())
          , b = $(this).data("range");
        b && b.indexOf(a) > -1 ? codeSuccess() : alert("\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u5FAE\u4FE1\u626B\u7801\u5173\u6CE8\uFF0C\u5373\u53EF\u83B7\u5F97\u9A8C\u8BC1\u7801")
    }),
    $("head").append('<link rel="stylesheet" href="' + currentPath + "css/pc-style.7.css?" + requestSuffix + '">'),
    jQuery(function(a) {
        var b = a.fn.show;
        a.fn.show = function(c, d) {
            return a(this).each(function() {
                var e = a(this)
                  , f = function() {
                    a.isFunction(d) && d.apply(e),
                    e.trigger("afterShow")
                };
                e.trigger("beforeShow"),
                b.apply(e, [c, f])
            })
        }
    });
}
var myAbTest = myAbTest || ABTest({
    name: "ab_test",
    customVarSlot: 1,
    variations: {
        a: function() {
            jsonKey = 'c';
            runCpt();
        },
        b: function() {
            jsonKey = 'd';
            runCpt();
        },
    }
});

var showDldocOk = false;
var newHtml = $('<div>');
var starImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAY1BMVEUAAAD/mAD/mgD/mQD/mQD/mQD/mQD/mAD/mQD/mQD/mQD//wD/mQD/mAD/nwD/mQD/mAD/mQD/mQD/mgD/mAD/mQD/mAD/mAD/mQD/mgD/mQD/mgD/lwD/mQD/lQD/mwD/mQAl+fFuAAAAIHRSTlMA7ytS5M++uGk2JAGqjAzr1ZKFR/agl005MMxiYF8YF49KoKIAAAC9SURBVDjLlZJZCsMwDETl2vEWZ9+76v6nrAkhYCUR7fsyzGNgsOBP8mHIWUEiSragRqxzvoBW0IJIxhdEpkshQ2QrJtzomIKritK9WoM7pni6EjZm22iFJyjdWAcgkUWCF1wuPMAimPwGkZvgcmrQnDOqmFOD5pxReUiwVLCQUlChIIKhgiGCooIiv4kHykSYj4I7HdG3bb89H4nQ4Mr4AXiPZzM0RoKHFR/WGXSEXmDHaToj3Mkld1mA3/gCrXs1vl7stYYAAAAASUVORK5CYII=';
/*\u4e0b\u8f7d\u5361\u7247\u653e\u7f6e*/
if (document.querySelector('.after_height_light_second_floor ~ p')) {
    document.querySelector('.after_height_light_second_floor ~ p').className = 'rel_art_line';
}
document.addEventListener('DOMContentLoaded', function() {
    var dlBoxHtml = '<div class="download_fixed">' + ' <div class="download_fixed_box">' + '    <div class="download_fixed_fuzhi"><em></em><span>\u4E00\u952E\u590D\u5236\u5168\u6587</span></div>' + '    <div class="download_fixed_down download_card_box" data-pos="a"><em></em><span>\u4E0B\u8F7D\u5168\u6587</span></div>' + '    <a target="_blank" href="/contact.html" class="download_fixed_toushi"><em></em><span>\u6295\u8BC9</span></a>' + '</div>' + '</div>';

    var newHtmlStop = false;
    $(newHtml).css({
        position: 'fixed',
        top: '-10000px',
        right: '-10000px'
    });
    $(newHtml).attr('id', 'article_text_cpt');
    $('body').append($(newHtml)[0].outerHTML);

    if (document.getElementsByClassName('content')) {
        document.getElementsByClassName('content')[0].childNodes.forEach(function(ele) {
            if (newHtmlStop)
                return;
            newHtmlStop = ele.nodeName.toLowerCase() !== '#text' && ele.className.indexOf('after_height_light') > -1;
            if (newHtmlStop)
                return;

            if (ele.nodeName.toLowerCase() === '#text') {
                var html = ele.textContent;
            } else {
                var html = ele.outerHTML;
                if (html.toLowerCase().indexOf('</script>') > -1)
                    return;
            }

            // $('#article_text_cpt').append(html);
        })
    }

    if (!showDldocOk) {
        showDldocOk = true;
        var showdltimer = setInterval(function() {
            if (showdl && showdl === 1) {

                $(document).on('click', '.download_fixed_fuzhi', function(e) {
                    selectText(document.getElementById('article_text_cpt'));
                    document.execCommand('copy');
                });
                $(".after_height_light").after(dlBoxHtml);

                $('.download_fixed_fuzhi').css('display', 'none');
                $('.download_fixed_toushi').css('display', 'none');
                if (tradeHost.indexOf('ddnx') > -1) {
                    $('.download_fixed').css('display', 'none');
                } else if (jsonKey == 'd') {
                    $('.download_card_box').addClass('download_card_box_ext_bg_img');
                }

                var dlRBottomHtml = '<div class="download_fixed_bottom download_card_box" data-pos="b"><em></em><span>\u4E0B\u8F7D\u6587\u6863</span></div>';
                $('.content').append(dlRBottomHtml);

                $('.download_fixed_down').css('display', 'block');

                var pathname = location.pathname;
                var star = 0;
                for (var i = 0; i < pathname.length; i++) {
                    star = parseInt(star) + parseInt(pathname.charCodeAt(i));
                }
                var str = '';
                //\u51e0\u9897\u661f\u8bbe\u7f6e
                for (i = 0; i < 5; i++) {
                    str += '<img src="' + starImg + '">\n';
                }

                var lala = 'https://' + location.host.replace(/^(m\.|mip\.)/, 'www.');
                var r = Math.random();
                var d = '' + '<a class="download_card download_card_box" data-pos="c">\n' + '    <img loading="lazy" class="download_card_pic" src="' + currentPath + 'img/icon_word.2.png" alt="">\n' + '    <div class="download_card_msg">\n' + '        <div class="download_card_title" style="text-decoration:none;">\u300a' + document.title + '.doc\u300b</div>\n' + '        <div class="download_card_tip">\u5c06\u672c\u6587\u7684Word\u6587\u6863\u4e0b\u8f7d\u5230\u7535\u8111\uff0c\u65b9\u4fbf\u6536\u85cf\u548c\u6253\u5370</div>\n' + '        <div class="download_card_tj">\n' + '            <span>\u63a8\u8350\u5ea6\uff1a</span>\n' + str + '        </div>\n' + '    </div>\n' + '    <div class="download_card_btn">\n' + '        <img style="border-radius: unset;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2MjU5MTk0MTg2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY0MDciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQzMiAwaDE2MGMyNi42IDAgNDggMjEuNCA0OCA0OHYzMzZoMTc1LjRjMzUuNiAwIDUzLjQgNDMgMjguMiA2OC4yTDUzOS40IDc1Ni42Yy0xNSAxNS0zOS42IDE1LTU0LjYgMEwxODAuMiA0NTIuMmMtMjUuMi0yNS4yLTcuNC02OC4yIDI4LjItNjguMkgzODRWNDhjMC0yNi42IDIxLjQtNDggNDgtNDh6IG01OTIgNzUydjIyNGMwIDI2LjYtMjEuNCA0OC00OCA0OEg0OGMtMjYuNiAwLTQ4LTIxLjQtNDgtNDhWNzUyYzAtMjYuNiAyMS40LTQ4IDQ4LTQ4aDI5My40bDk4IDk4YzQwLjIgNDAuMiAxMDUgNDAuMiAxNDUuMiAwbDk4LTk4SDk3NmMyNi42IDAgNDggMjEuNCA0OCA0OHogbS0yNDggMTc2YzAtMjItMTgtNDAtNDAtNDBzLTQwIDE4LTQwIDQwIDE4IDQwIDQwIDQwIDQwLTE4IDQwLTQweiBtMTI4IDBjMC0yMi0xOC00MC00MC00MHMtNDAgMTgtNDAgNDAgMTggNDAgNDAgNDAgNDAtMTggNDAtNDB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2NDA4Ij48L3BhdGg+PC9zdmc+" alt="">\n' + '        <div class="downlod_btn_right">\n' + '            <div>\u70b9\u51fb\u4e0b\u8f7d\u6587\u6863</div>\n' + '        </div>\n' + '    </div>\n' + '</a>';
                $(document).on('click', '.download_card_box', function(e) {
                    var pos = $(this).data('pos');
                    console.log('dddd');
                    window.open(lala + '/dldoc/index.html?' + r + timeNum + '&pos=' + pos + '&url=' + pathname + '&jk=' + jsonKey, '_blank');
                });
                var flag = true;
                /*\u4ee5\u4e0b\u76ee\u5f55\u4e0d\u653e\u7f6e*/
                var bmd = ['/jianlixiazai/', '/company/', '/zhaopin/', '/mingqi/', '/gaoxiao/', '/sydwzp/', '/xuanjianghui/', '/zhaopinhui/', '/ftp/', 'ask', '/zi/', '/ci/'];
                var reg = /\d+\.(htm)/
                for (var i = 0; i < bmd.length; i++) {
                    if (location.href.indexOf(bmd[i]) != -1 || !reg.test(location.href)) {
                        flag = false;
                        break;
                    }
                }
                /* var rand_time = new Date().getTime() / 1000;
				 rand_time = rand_time - rand_time % (2 * 3600);  //\u5168\u5c40\u65f6\u95f4\u6233 \u4e24\u4e2a\u5c0f\u65f6
				 if(showgg === 1){
					 var ggstr = '<p class="gg_card"><img src="/static/cpt/img/write_content_bottom.2.png?'+ rand_time +'" alt=""></p><p style="position: fixed;right: 10px;bottom: 10px;"><img src="/static/cpt/img/write_right_float.2.png?'+ rand_time +'" alt=""></p>';
					 $(".content").after(ggstr);
				 }*/
                if ($(".content").length > 0) {
                    var html = $(".content").html();
                    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '');
                    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/ig, '');
                    html = html.replace(/<a[^>]*>[\s\S]*?<\/a>/ig, '');
                    html = html.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/ig, '');
                    textLen = $('<div/>').html(html).text().replace(/[\u3000\u3010\u3011\s\r\n\t]/g, '').length;
                }
                if ((textLen > 800 && flag) || typeof DOWNLOAD_OK !== "undefined") {
                    if ($('.download_card').length === 0) {
                        $(".after_height_light").after(d);
                    }
                }
                // $('.gg_card').eq(1).hide();

                clearInterval(showdltimer);
            }

            if (!$('.special_a_for_qr')[0]) {
                var aInfos = [["pc_a", "https://detail.youzan.com/show/goods?alias=272tozj67mzqk03"], ["pc_b", "https://detail.youzan.com/show/goods?alias=2xhryyj3i41cs7q"], ["m_a", "https://j.youzan.com/31HHfe"], ["m_b", "https://j.youzan.com/wuTHfe"], ];
                var qrRelate = {
                    c: 0,
                    d: 1,
                    default: -1,
                };
                var qrSrc = jsonKey;
                if (qrSrc) {
                    var aKey = qrRelate.default;
                    if (qrRelate[qrSrc] !== undefined) {
                        aKey = qrRelate[qrSrc]
                    }
                    var aInfo = aInfos[aKey];
                    $('.main-right .right_fix').prepend('<div style="display:none;"><script type="text/javascript" src="https://v1.cnzz.com/z_stat.php?id=2412233&web_id=2412233"></script></div>' + '<div class="special_a_for_qr">' + '<a target="_blank" href="https://cpt.9136.com/img/a_special/_' + aInfo[0] + '.html?v1.2&key=' + aKey + '" rel="nofollow">' + '<img loading="lazy" src="https://cpt.9136.com/img/a_special/' + aInfo[0] + '.jpg?' + requestSuffix + '" style="width: 100%;"></a></div>');
                }
            }

        }, 1000)
    }

    // excellentArticles();
});

function excellentArticles() {
    if ($('.excellent_articles_box')[0]) {
        return;
    }

    var keyword = $('h1.title').text();
    var randKey = new Date().getTime() / 1000;
    randKey = randKey - randKey % 86400;

    var starHtml = '';
    for (var i = 0; i < 5; i++) {
        starHtml += '<img src="' + starImg + '">\n';
    }
    $.get('/static/cpt/excellent/article', {
        keyword: keyword,
        randKey: randKey
    }, function(res) {
        if (res.code !== 0)
            return;
        if (!res.data || res.data.length < 1)
            return;

        var data = res.data;
        var html = '<div class="excellent_articles_box"><ul>';
        var rowNum = 5;
        for (var i = 0; i < data.length; i++) {
            var row = data[i];

            var localUrl = window.location.href.replace(/http[s]*:\/\/[^/]*/, '');
            row.url = row.url.replace(/http[s]*:\/\/[^/]*/, '');
            if (row.url === localUrl)
                continue;

            if (--rowNum < 0)
                break;
            html += '<li class="excellent_articles_row"><a target="_blank" href="https://www.ruiwen.com/test_' + jsonKey + '.html?v1.1&url=' + row.url + '">' + '<img loading="lazy" class="excellent_icon" src="' + currentPath + 'img/icon_word.2.png" alt="">' + '<span class="excellent_title">' + row.title + '</span>' + '<span class="excellent_star">\u63A8\u8350\u5EA6\uFF1A' + starHtml + '</span>' + '</a></li>';
        }
        html += '<li class="excellent_articles_title">\u76F8\u5173\u63A8\u8350</li></ul></div>';

        if (jsonKey === 'a') {
            $('.content').prepend(html);
        } else {
            $('.after_height_light_second_floor').after(html);
        }
    });
}

function selectText(node) {
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}
