/*!
	Modaal - accessible modals - v0.3.1
	by Humaan, for all humans.
	http://humaan.com
 */
!function(a) {
    var t = '<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>'
      , o = {
        init: function(t, o) {
            var e = this;
            e.dom = a("body"),
            e.$elem = a(o),
            e.options = a.extend({}, a.fn.modaal.options, e.$elem.data(), t),
            e.xhr = null,
            e.scope = {
                is_open: !1,
                id: "modaal_" + (new Date).getTime() + Math.random().toString(16).substring(2)
            },
            e.$elem.attr("data-modaal-scope", e.scope.id),
            e.private_options = {
                active_class: "is_active"
            },
            e.lastFocus = null,
            e.options.is_locked || "confirm" == e.options.type || e.options.hide_close ? e.scope.close_btn = "" : e.scope.close_btn = '<button type="button" class="modaal-close" id="modaal-close" aria-label="' + e.options.close_aria_label + '"><span>' + e.options.close_text + "</span></button>",
            "none" === e.options.animation && (e.options.animation_speed = 0,
            e.options.after_callback_delay = 0),
            a(o).on("click.Modaal", function(a) {
                a.preventDefault();
                var t;
                if (e.lastFocus = document.activeElement,
                e.options.should_open !== !1 && ("function" != typeof e.options.should_open || e.options.should_open() !== !1)) {
                    switch (e.options.before_open.call(e, a),
                    e.options.type) {
                    case "inline":
                        e.create_basic();
                        break;
                    case "ajax":
                        t = e.options.source(e.$elem, e.$elem.attr("href")),
                        e.fetch_ajax(t);
                        break;
                    case "confirm":
                        e.options.is_locked = !0,
                        e.create_confirm();
                        break;
                    case "image":
                        e.create_image();
                        break;
                    case "iframe":
                        t = e.options.source(e.$elem, e.$elem.attr("href")),
                        e.create_iframe(t);
                        break;
                    case "video":
                        e.create_video(e.$elem.attr("href"));
                        break;
                    case "instagram":
                        e.create_instagram()
                    }
                    e.watch_events()
                }
            }),
            e.options.start_open === !0 && a(o).click()
        },
        watch_events: function() {
            var t = this;
            t.dom.off("click.Modaal keyup.Modaal keydown.Modaal"),
            t.dom.on("keydown.Modaal", function(o) {
                var e = o.keyCode
                  , i = o.target;
                9 == e && t.scope.is_open && (a.contains(document.getElementById(t.scope.id), i) || a("#" + t.scope.id).find('*[tabindex="0"]').focus())
            }),
            t.dom.on("keyup.Modaal", function(o) {
                var e = o.keyCode
                  , i = o.target;
                return o.shiftKey && 9 == o.keyCode && t.scope.is_open && (a.contains(document.getElementById(t.scope.id), i) || a("#" + t.scope.id).find(".modaal-close").focus()),
                !t.options.is_locked && 27 == e && t.scope.is_open ? a(document.activeElement).is("input:not(:checkbox):not(:radio)") ? !1 : void t.modaal_close() : "image" == t.options.type ? (37 == e && t.scope.is_open && !a("#" + t.scope.id + " .modaal-gallery-prev").hasClass("is_hidden") && t.gallery_update("prev"),
                void (39 == e && t.scope.is_open && !a("#" + t.scope.id + " .modaal-gallery-next").hasClass("is_hidden") && t.gallery_update("next"))) : void 0
            }),
            t.dom.on("click.Modaal", function(o) {
                var e = a(o.target);
                if (!t.options.is_locked && (t.options.overlay_close && e.is(".modaal-inner-wrapper") || e.is(".modaal-close") || e.closest(".modaal-close").length))
                    return void t.modaal_close();
                if (e.is(".modaal-confirm-btn"))
                    return e.is(".modaal-ok") && t.options.confirm_callback.call(t, t.lastFocus),
                    e.is(".modaal-cancel") && t.options.confirm_cancel_callback.call(t, t.lastFocus),
                    void t.modaal_close();
                if (e.is(".modaal-gallery-control")) {
                    if (e.hasClass("is_hidden"))
                        return;
                    return e.is(".modaal-gallery-prev") && t.gallery_update("prev"),
                    void (e.is(".modaal-gallery-next") && t.gallery_update("next"))
                }
            })
        },
        build_modal: function(a) {
            var t = this
              , o = "";
            "instagram" == t.options.type && (o = " modaal-instagram");
            var e, i = "video" == t.options.type ? "modaal-video-wrap" : "modaal-content";
            switch (t.options.animation) {
            case "fade":
                e = " modaal-start_fade";
                break;
            case "slide-down":
                e = " modaal-start_slidedown";
                break;
            default:
                e = " modaal-start_none"
            }
            var l = "";
            t.options.fullscreen && (l = " modaal-fullscreen"),
            "" === t.options.custom_class && "undefined" == typeof t.options.custom_class || (t.options.custom_class = " " + t.options.custom_class);
            var s = "";
            t.options.width && t.options.height && "number" == typeof t.options.width && "number" == typeof t.options.height ? s = ' style="max-width:' + t.options.width + "px;height:" + t.options.height + 'px;overflow:auto;"' : t.options.width && "number" == typeof t.options.width ? s = ' style="max-width:' + t.options.width + 'px;"' : t.options.height && "number" == typeof t.options.height && (s = ' style="height:' + t.options.height + 'px;overflow:auto;"'),
            ("image" == t.options.type || "video" == t.options.type || "instagram" == t.options.type || t.options.fullscreen) && (s = "");
            var n = '<div class="modaal-wrapper modaal-' + t.options.type + e + o + l + t.options.custom_class + '" id="' + t.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper">';
            "video" != t.options.type && (n += '<div class="modaal-container"' + s + ">"),
            n += '<div class="' + i + ' modaal-focus" aria-hidden="false" aria-label="' + t.options.accessible_title + ' (Press escape to close)" role="dialog">',
            n += "inline" == t.options.type ? '<div class="modaal-content-container"></div>' : a,
            n += "</div>" + t.scope.close_btn,
            "video" != t.options.type && (n += "</div>"),
            n += "</div></div></div>",
            t.dom.append(n),
            "inline" == t.options.type && a.appendTo("#" + t.scope.id + " .modaal-content-container"),
            t.modaal_overlay("show")
        },
        create_basic: function() {
            var t = this
              , o = t.$elem.is("[href]") ? a(t.$elem.attr("href")) : t.$elem
              , e = "";
            o.length ? (e = o.contents().clone(!0, !0),
            o.empty()) : e = "Content could not be loaded. Please check the source and try again.",
            t.build_modal(e)
        },
        create_instagram: function() {
            var t = this
              , o = t.options.instagram_id
              , e = ""
              , i = "Instagram photo couldn't be loaded, please check the embed code and try again.";
            if (t.build_modal('<div class="modaal-content-container' + ("" != t.options.loading_class ? " " + t.options.loading_class : "") + '">' + t.options.loading_content + "</div>"),
            "" != o && null !== o && void 0 !== o) {
                var l = "https://api.instagram.com/oembed?url=http://instagr.am/p/" + o + "/";
                a.ajax({
                    url: l,
                    dataType: "jsonp",
                    cache: !1,
                    success: function(o) {
                        e = o.html;
                        var i = a("#" + t.scope.id + " .modaal-content-container");
                        i.length > 0 && (i.removeClass(t.options.loading_class),
                        i.html(e),
                        window.instgrm.Embeds.process())
                    },
                    error: function() {
                        e = i;
                        var o = a("#" + t.scope.id + " .modaal-content-container");
                        o.length > 0 && (o.removeClass(t.options.loading_class).addClass(t.options.ajax_error_class),
                        o.html(e))
                    }
                })
            } else
                e = i;
            return !1
        },
        fetch_ajax: function(t) {
            var o = this;
            null == o.options.accessible_title && (o.options.accessible_title = "Dialog Window"),
            null !== o.xhr && (o.xhr.abort(),
            o.xhr = null),
            o.build_modal('<div class="modaal-content-container' + ("" != o.options.loading_class ? " " + o.options.loading_class : "") + '">' + o.options.loading_content + "</div>"),
            o.xhr = a.ajax(t, {
                success: function(t) {
                    var e = a("#" + o.scope.id).find(".modaal-content-container");
                    e.length > 0 && (e.removeClass(o.options.loading_class),
                    e.html(t),
                    o.options.ajax_success.call(o, e))
                },
                error: function(t) {
                    if ("abort" != t.statusText) {
                        var e = a("#" + o.scope.id + " .modaal-content-container");
                        e.length > 0 && (e.removeClass(o.options.loading_class).addClass(o.options.ajax_error_class),
                        e.html("Content could not be loaded. Please check the source and try again."))
                    }
                }
            })
        },
        create_confirm: function() {
            var a, t = this;
            a = '<div class="modaal-content-container"><h1 id="modaal-title">' + t.options.confirm_title + '</h1><div class="modaal-confirm-content">' + t.options.confirm_content + '</div><div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">' + t.options.confirm_button_text + '</button><button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">' + t.options.confirm_cancel_button_text + "</button></div></div></div>",
            t.build_modal(a)
        },
        create_image: function() {
            var t, o, e = this, i = "", l = '<button type="button" class="modaal-gallery-control modaal-gallery-prev" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>', s = '<button type="button" class="modaal-gallery-control modaal-gallery-next" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>';
            if (e.$elem.is("[rel]")) {
                var n = e.$elem.attr("rel")
                  , d = a('[rel="' + n + '"]');
                d.removeAttr("data-gallery-active", "is_active"),
                e.$elem.attr("data-gallery-active", "is_active"),
                o = d.length - 1;
                var r = [];
                i = '<div class="modaal-gallery-item-wrap">',
                d.each(function(a, t) {
                    var o = ""
                      , e = ""
                      , i = ""
                      , l = !1
                      , s = t.getAttribute("data-modaal-desc")
                      , n = t.getAttribute("data-gallery-active");
                    "" !== t.href || void 0 !== t.href ? o = t.href : "" === t.src && void 0 === t.src || (o = t.src),
                    "" != s && null !== s && void 0 !== s ? (e = s,
                    i = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (a + 1) + " - </span>" + s + "</div>") : i = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (a + 1) + "</span></div>",
                    n && (l = !0);
                    var d = {
                        url: o,
                        alt: e,
                        rawdesc: s,
                        desc: i,
                        active: l
                    };
                    r.push(d)
                });
                for (var c = 0; c < r.length; c++) {
                    var m = ""
                      , p = r[c].rawdesc ? "Image: " + r[c].rawdesc : "Image " + c + " no description";
                    r[c].active && (m = " " + e.private_options.active_class),
                    i += '<div class="modaal-gallery-item gallery-item-' + c + m + '" aria-label="' + p + '"><img src="' + r[c].url + '" alt=" " style="width:100%">' + r[c].desc + "</div>"
                }
                i += "</div>" + l + s
            } else {
                var _ = e.$elem.attr("href")
                  , v = ""
                  , f = ""
                  , p = "";
                e.$elem.attr("data-modaal-desc") ? (p = e.$elem.attr("data-modaal-desc"),
                v = e.$elem.attr("data-modaal-desc"),
                f = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>' + v + "</div>") : p = "Image with no description",
                i = '<div class="modaal-gallery-item is_active" aria-label="' + p + '"><img src="' + _ + '" alt=" " style="width:100%">' + f + "</div>"
            }
            t = i,
            e.build_modal(t),
            a(".modaal-gallery-item.is_active").is(".gallery-item-0") && a(".modaal-gallery-prev").hide(),
            a(".modaal-gallery-item.is_active").is(".gallery-item-" + o) && a(".modaal-gallery-next").hide()
        },
        gallery_update: function(t) {
            var o = this
              , e = a("#" + o.scope.id)
              , i = e.find(".modaal-gallery-item")
              , l = i.length - 1;
            if (0 == l)
                return !1;
            var s = e.find(".modaal-gallery-prev")
              , n = e.find(".modaal-gallery-next")
              , d = 250
              , r = 0
              , c = 0
              , m = e.find(".modaal-gallery-item." + o.private_options.active_class)
              , p = "next" == t ? m.next(".modaal-gallery-item") : m.prev(".modaal-gallery-item");
            return o.options.before_image_change.call(o, m, p),
            "prev" == t && e.find(".gallery-item-0").hasClass("is_active") ? !1 : "next" == t && e.find(".gallery-item-" + l).hasClass("is_active") ? !1 : void m.stop().animate({
                opacity: 0
            }, d, function() {
                p.addClass("is_next").css({
                    position: "absolute",
                    display: "block",
                    opacity: 0
                });
                var t = a(document).width()
                  , i = t > 1140 ? 280 : 50;
                r = e.find(".modaal-gallery-item.is_next").width(),
                c = e.find(".modaal-gallery-item.is_next").height();
                var _ = e.find(".modaal-gallery-item.is_next img").prop("naturalWidth")
                  , v = e.find(".modaal-gallery-item.is_next img").prop("naturalHeight");
                _ > t - i ? (r = t - i,
                e.find(".modaal-gallery-item.is_next").css({
                    width: r
                }),
                e.find(".modaal-gallery-item.is_next img").css({
                    width: r
                }),
                c = e.find(".modaal-gallery-item.is_next").find("img").height()) : (r = _,
                c = v),
                e.find(".modaal-gallery-item-wrap").stop().animate({
                    width: r,
                    height: c
                }, d, function() {
                    m.removeClass(o.private_options.active_class + " " + o.options.gallery_active_class).removeAttr("style"),
                    m.find("img").removeAttr("style"),
                    p.addClass(o.private_options.active_class + " " + o.options.gallery_active_class).removeClass("is_next").css("position", ""),
                    p.stop().animate({
                        opacity: 1
                    }, d, function() {
                        a(this).removeAttr("style").css({
                            width: "100%"
                        }),
                        a(this).find("img").css("width", "100%"),
                        e.find(".modaal-gallery-item-wrap").removeAttr("style"),
                        o.options.after_image_change.call(o, p)
                    }),
                    e.find(".modaal-gallery-item").removeAttr("tabindex"),
                    e.find(".modaal-gallery-item." + o.private_options.active_class).attr("tabindex", "0").focus(),
                    e.find(".modaal-gallery-item." + o.private_options.active_class).is(".gallery-item-0") ? s.stop().animate({
                        opacity: 0
                    }, 150, function() {
                        a(this).hide()
                    }) : s.stop().css({
                        display: "block",
                        opacity: s.css("opacity")
                    }).animate({
                        opacity: 1
                    }, 150),
                    e.find(".modaal-gallery-item." + o.private_options.active_class).is(".gallery-item-" + l) ? n.stop().animate({
                        opacity: 0
                    }, 150, function() {
                        a(this).hide()
                    }) : n.stop().css({
                        display: "block",
                        opacity: s.css("opacity")
                    }).animate({
                        opacity: 1
                    }, 150)
                })
            })
        },
        create_video: function(a) {
            var t, o = this;
            t = '<iframe src="' + a + '" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>',
            o.build_modal('<div class="modaal-video-container">' + t + "</div>")
        },
        create_iframe: function(a) {
            var t, o = this;
            t = null !== o.options.width || void 0 !== o.options.width || null !== o.options.height || void 0 !== o.options.height ? '<iframe src="' + a + '" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>' : '<div class="modaal-content-container">Please specify a width and height for your iframe</div>',
            o.build_modal(t)
        },
        modaal_open: function() {
            var t = this
              , o = a("#" + t.scope.id)
              , e = t.options.animation;
            "none" === e && (o.removeClass("modaal-start_none"),
            t.options.after_open.call(t, o)),
            "fade" === e && o.removeClass("modaal-start_fade"),
            "slide-down" === e && o.removeClass("modaal-start_slide_down");
            var i = o;
            a(".modaal-wrapper *[tabindex=0]").removeAttr("tabindex"),
            i = "image" == t.options.type ? a("#" + t.scope.id).find(".modaal-gallery-item." + t.private_options.active_class) : o.find(".modaal-iframe-elem").length ? o.find(".modaal-iframe-elem") : o.find(".modaal-video-wrap").length ? o.find(".modaal-video-wrap") : o.find(".modaal-focus"),
            i.attr("tabindex", "0").focus(),
            "none" !== e && setTimeout(function() {
                t.options.after_open.call(t, o)
            }, t.options.after_callback_delay)
        },
        modaal_close: function() {
            var t = this
              , o = a("#" + t.scope.id);
            t.options.before_close.call(t, o),
            null !== t.xhr && (t.xhr.abort(),
            t.xhr = null),
            "none" === t.options.animation && o.addClass("modaal-start_none"),
            "fade" === t.options.animation && o.addClass("modaal-start_fade"),
            "slide-down" === t.options.animation && o.addClass("modaal-start_slide_down"),
            setTimeout(function() {
                "inline" == t.options.type && a("#" + t.scope.id + " .modaal-content-container").contents().clone(!0, !0).appendTo(t.$elem.attr("href")),
                o.remove(),
                t.options.after_close.call(t),
                t.scope.is_open = !1
            }, t.options.after_callback_delay),
            t.modaal_overlay("hide"),
            null != t.lastFocus && t.lastFocus.focus()
        },
        modaal_overlay: function(t) {
            var o = this;
            "show" == t ? (o.scope.is_open = !0,
            o.options.background_scroll || o.dom.addClass("modaal-noscroll"),
            o.dom.append('<div class="modaal-overlay" id="' + o.scope.id + '_overlay"></div>'),
            a("#" + o.scope.id + "_overlay").css("background", o.options.background).stop().animate({
                opacity: o.options.overlay_opacity
            }, o.options.animation_speed, function() {
                o.modaal_open()
            })) : "hide" == t && (o.dom.removeClass("modaal-noscroll"),
            a("#" + o.scope.id + "_overlay").stop().animate({
                opacity: 0
            }, o.options.animation_speed, function() {
                a(this).remove()
            }))
        }
    };
    a.fn.modaal = function(t) {
        return this.each(function() {
            var e = a(this).data("modaal");
            if (e) {
                if ("string" == typeof t)
                    switch (t) {
                    case "close":
                        e.modaal_close()
                    }
            } else {
                var i = Object.create(o);
                i.init(t, this),
                a.data(this, "modaal", i)
            }
        })
    }
    ,
    a.fn.modaal.options = {
        type: "inline",
        animation: "fade",
        animation_speed: 300,
        after_callback_delay: 350,
        is_locked: !1,
        hide_close: !1,
        background: "#000",
        overlay_opacity: "0.8",
        overlay_close: !0,
        accessible_title: "Dialog Window",
        start_open: !1,
        fullscreen: !1,
        custom_class: "",
        background_scroll: !1,
        should_open: !0,
        close_text: "Close",
        close_aria_label: "Close (Press escape to close)",
        width: null,
        height: null,
        before_open: function() {},
        after_open: function() {},
        before_close: function() {},
        after_close: function() {},
        source: function(a, t) {
            return t
        },
        confirm_button_text: "Confirm",
        confirm_cancel_button_text: "Cancel",
        confirm_title: "Confirm Title",
        confirm_content: "<p>This is the default confirm dialog content. Replace me through the options</p>",
        confirm_callback: function() {},
        confirm_cancel_callback: function() {},
        gallery_active_class: "gallery_active_item",
        before_image_change: function(a, t) {},
        after_image_change: function(a) {},
        loading_content: t,
        loading_class: "is_loading",
        ajax_error_class: "modaal-error",
        ajax_success: function() {},
        instagram_id: null
    },
    a(function() {
        var t = a(".modaal");
        t.length && t.each(function() {
            var t = a(this)
              , o = {}
              , e = !1;
            t.attr("data-modaal-type") && (e = !0,
            o.type = t.attr("data-modaal-type")),
            t.attr("data-modaal-animation") && (e = !0,
            o.animation = t.attr("data-modaal-animation")),
            t.attr("data-modaal-animation-speed") && (e = !0,
            o.animation_speed = t.attr("data-modaal-animation-speed")),
            t.attr("data-modaal-after-callback-delay") && (e = !0,
            o.after_callback_delay = t.attr("data-modaal-after-callback-delay")),
            t.attr("data-modaal-is-locked") && (e = !0,
            o.is_locked = "true" === t.attr("data-modaal-is-locked")),
            t.attr("data-modaal-hide-close") && (e = !0,
            o.hide_close = "true" === t.attr("data-modaal-hide-close")),
            t.attr("data-modaal-background") && (e = !0,
            o.background = t.attr("data-modaal-background")),
            t.attr("data-modaal-overlay-opacity") && (e = !0,
            o.overlay_opacity = t.attr("data-modaal-overlay-opacity")),
            t.attr("data-modaal-overlay-close") && (e = !0,
            o.overlay_close = "false" !== t.attr("data-modaal-overlay-close")),
            t.attr("data-modaal-accessible-title") && (e = !0,
            o.accessible_title = t.attr("data-modaal-accessible-title")),
            t.attr("data-modaal-start-open") && (e = !0,
            o.start_open = "true" === t.attr("data-modaal-start-open")),
            t.attr("data-modaal-fullscreen") && (e = !0,
            o.fullscreen = "true" === t.attr("data-modaal-fullscreen")),
            t.attr("data-modaal-custom-class") && (e = !0,
            o.custom_class = t.attr("data-modaal-custom-class")),
            t.attr("data-modaal-close-text") && (e = !0,
            o.close_text = t.attr("data-modaal-close-text")),
            t.attr("data-modaal-close-aria-label") && (e = !0,
            o.close_aria_label = t.attr("data-modaal-close-aria-label")),
            t.attr("data-modaal-background-scroll") && (e = !0,
            o.background_scroll = "true" === t.attr("data-modaal-background-scroll")),
            t.attr("data-modaal-width") && (e = !0,
            o.width = parseInt(t.attr("data-modaal-width"))),
            t.attr("data-modaal-height") && (e = !0,
            o.height = parseInt(t.attr("data-modaal-height"))),
            t.attr("data-modaal-confirm-button-text") && (e = !0,
            o.confirm_button_text = t.attr("data-modaal-confirm-button-text")),
            t.attr("data-modaal-confirm-cancel-button-text") && (e = !0,
            o.confirm_cancel_button_text = t.attr("data-modaal-confirm-cancel-button-text")),
            t.attr("data-modaal-confirm-title") && (e = !0,
            o.confirm_title = t.attr("data-modaal-confirm-title")),
            t.attr("data-modaal-confirm-content") && (e = !0,
            o.confirm_content = t.attr("data-modaal-confirm-content")),
            t.attr("data-modaal-gallery-active-class") && (e = !0,
            o.gallery_active_class = t.attr("data-modaal-gallery-active-class")),
            t.attr("data-modaal-loading-content") && (e = !0,
            o.loading_content = t.attr("data-modaal-loading-content")),
            t.attr("data-modaal-loading-class") && (e = !0,
            o.loading_class = t.attr("data-modaal-loading-class")),
            t.attr("data-modaal-ajax-error-class") && (e = !0,
            o.ajax_error_class = t.attr("data-modaal-ajax-error-class")),
            t.attr("data-modaal-instagram-id") && (e = !0,
            o.instagram_id = t.attr("data-modaal-instagram-id")),
            e && t.modaal(o)
        })
    })
}(jQuery, window, document);
/*!
	unslider-min.js
 */
!function(t) {
    "object" == typeof module && "object" == typeof module.exports ? t(require("jquery")) : "function" == typeof define && define.amd ? define([], t(window.jQuery)) : t(window.jQuery)
}(function(t) {
    if (!t)
        return console.warn("Unslider needs jQuery");
    t.Unslider = function(n, e) {
        var i = this;
        return i._ = "unslider",
        i.defaults = {
            autoplay: !1,
            delay: 3e3,
            speed: 750,
            easing: "swing",
            keys: {
                prev: 37,
                next: 39
            },
            nav: !0,
            arrows: {
                prev: '<a class="' + i._ + '-arrow prev">Prev</a>',
                next: '<a class="' + i._ + '-arrow next">Next</a>'
            },
            animation: "horizontal",
            selectors: {
                container: "ul:first",
                slides: "li"
            },
            animateHeight: !1,
            activeClass: i._ + "-active",
            swipe: !0,
            swipeThreshold: .2
        },
        i.$context = n,
        i.options = {},
        i.$parent = null,
        i.$container = null,
        i.$slides = null,
        i.$nav = null,
        i.$arrows = [],
        i.total = 0,
        i.current = 0,
        i.prefix = i._ + "-",
        i.eventSuffix = "." + i.prefix + ~~(2e3 * Math.random()),
        i.interval = [],
        i.init = function(n) {
            return i.options = t.extend({}, i.defaults, n),
            i.$container = i.$context.find(i.options.selectors.container).addClass(i.prefix + "wrap"),
            i.$slides = i.$container.children(i.options.selectors.slides),
            i.setup(),
            t.each(["nav", "arrows", "keys", "infinite"], function(n, e) {
                i.options[e] && i["init" + t._ucfirst(e)]()
            }),
            jQuery.event.special.swipe && i.options.swipe && i.initSwipe(),
            i.options.autoplay && i.start(),
            i.calculateSlides(),
            i.$context.trigger(i._ + ".ready"),
            i.animate(i.options.index || i.current, "init")
        }
        ,
        i.setup = function() {
            i.$context.addClass(i.prefix + i.options.animation).wrap('<div class="' + i._ + '" />'),
            i.$parent = i.$context.parent("." + i._),
            "static" === i.$context.css("position") && i.$context.css("position", "relative"),
            i.$context.css("overflow", "hidden")
        }
        ,
        i.calculateSlides = function() {
            if (i.$slides = i.$container.children(i.options.selectors.slides),
            i.total = i.$slides.length,
            "fade" !== i.options.animation) {
                var t = "width";
                "vertical" === i.options.animation && (t = "height"),
                i.$container.css(t, 100 * i.total + "%").addClass(i.prefix + "carousel"),
                i.$slides.css(t, 100 / i.total + "%")
            }
        }
        ,
        i.start = function() {
            return i.interval.push(setTimeout(function() {
                i.next()
            }, i.options.delay)),
            i
        }
        ,
        i.stop = function() {
            for (var t; t = i.interval.pop(); )
                clearTimeout(t);
            return i
        }
        ,
        i.initNav = function() {
            var n = t('<nav class="' + i.prefix + 'nav"><ol /></nav>');
            i.$slides.each(function(e) {
                var o = this.getAttribute("data-nav") || e + 1;
                t.isFunction(i.options.nav) && (o = i.options.nav.call(i.$slides.eq(e), e, o)),
                n.children("ol").append('<li data-slide="' + e + '">' + o + "</li>")
            }),
            i.$nav = n.insertAfter(i.$context),
            i.$nav.find("li").on("click" + i.eventSuffix, function() {
                var n = t(this).addClass(i.options.activeClass);
                n.siblings().removeClass(i.options.activeClass),
                i.animate(n.attr("data-slide"))
            })
        }
        ,
        i.initArrows = function() {
            !0 === i.options.arrows && (i.options.arrows = i.defaults.arrows),
            t.each(i.options.arrows, function(n, e) {
                i.$arrows.push(t(e).insertAfter(i.$context).on("click" + i.eventSuffix, i[n]))
            })
        }
        ,
        i.initKeys = function() {
            !0 === i.options.keys && (i.options.keys = i.defaults.keys),
            t(document).on("keyup" + i.eventSuffix, function(n) {
                t.each(i.options.keys, function(e, o) {
                    n.which === o && t.isFunction(i[e]) && i[e].call(i)
                })
            })
        }
        ,
        i.initSwipe = function() {
            var t = i.$slides.width();
            "fade" !== i.options.animation && i.$container.on({
                movestart: function(t) {
                    if (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY)
                        return !!t.preventDefault();
                    i.$container.css("position", "relative")
                },
                move: function(n) {
                    i.$container.css("left", -100 * i.current + 100 * n.distX / t + "%")
                },
                moveend: function(n) {
                    Math.abs(n.distX) / t > i.options.swipeThreshold ? i[n.distX < 0 ? "next" : "prev"]() : i.$container.animate({
                        left: -100 * i.current + "%"
                    }, i.options.speed / 2)
                }
            })
        }
        ,
        i.initInfinite = function() {
            var n = ["first", "last"];
            t.each(n, function(t, e) {
                i.$slides.push.apply(i.$slides, i.$slides.filter(':not(".' + i._ + '-clone")')[e]().clone().addClass(i._ + "-clone")["insert" + (0 === t ? "After" : "Before")](i.$slides[n[~~!t]]()))
            })
        }
        ,
        i.destroyArrows = function() {
            t.each(i.$arrows, function(t, n) {
                n.remove()
            })
        }
        ,
        i.destroySwipe = function() {
            i.$container.off("movestart move moveend")
        }
        ,
        i.destroyKeys = function() {
            t(document).off("keyup" + i.eventSuffix)
        }
        ,
        i.setIndex = function(t) {
            return t < 0 && (t = i.total - 1),
            i.current = Math.min(Math.max(0, t), i.total - 1),
            i.options.nav && i.$nav.find('[data-slide="' + i.current + '"]')._active(i.options.activeClass),
            i.$slides.eq(i.current)._active(i.options.activeClass),
            i
        }
        ,
        i.animate = function(n, e) {
            if ("first" === n && (n = 0),
            "last" === n && (n = i.total),
            isNaN(n))
                return i;
            i.options.autoplay && i.stop().start(),
            i.setIndex(n),
            i.$context.trigger(i._ + ".change", [n, i.$slides.eq(n)]);
            var o = "animate" + t._ucfirst(i.options.animation);
            return t.isFunction(i[o]) && i[o](i.current, e),
            i
        }
        ,
        i.next = function() {
            var t = i.current + 1;
            return t >= i.total && (t = i.options.noloop && !i.options.infinite ? i.total - 1 : 0),
            i.animate(t, "next")
        }
        ,
        i.prev = function() {
            var t = i.current - 1;
            return t < 0 && (t = i.options.noloop && !i.options.infinite ? 0 : i.total - 1),
            i.animate(t, "prev")
        }
        ,
        i.animateHorizontal = function(t) {
            var n = "left";
            return "rtl" === i.$context.attr("dir") && (n = "right"),
            i.options.infinite && i.$container.css("margin-" + n, "-100%"),
            i.slide(n, t)
        }
        ,
        i.animateVertical = function(t) {
            return i.options.animateHeight = !0,
            i.options.infinite && i.$container.css("margin-top", -i.$slides.outerHeight()),
            i.slide("top", t)
        }
        ,
        i.slide = function(t, n) {
            if (i.animateHeight(n),
            i.options.infinite) {
                var e;
                n === i.total - 1 && (e = i.total - 3,
                n = -1),
                n === i.total - 2 && (e = 0,
                n = i.total - 2),
                "number" == typeof e && (i.setIndex(e),
                i.$context.on(i._ + ".moved", function() {
                    i.current === e && i.$container.css(t, -100 * e + "%").off(i._ + ".moved")
                }))
            }
            var o = {};
            return o[t] = -100 * n + "%",
            i._move(i.$container, o)
        }
        ,
        i.animateFade = function(t) {
            i.animateHeight(t);
            var n = i.$slides.eq(t).addClass(i.options.activeClass);
            i._move(n.siblings().removeClass(i.options.activeClass), {
                opacity: 0
            }),
            i._move(n, {
                opacity: 1
            }, !1)
        }
        ,
        i.animateHeight = function(t) {
            i.options.animateHeight && i._move(i.$context, {
                height: i.$slides.eq(t).outerHeight()
            }, !1)
        }
        ,
        i._move = function(t, n, e, o) {
            return !1 !== e && (e = function() {
                i.$context.trigger(i._ + ".moved")
            }
            ),
            t._move(n, o || i.options.speed, i.options.easing, e)
        }
        ,
        i.init(e)
    }
    ,
    t.fn._active = function(t) {
        return this.addClass(t).siblings().removeClass(t)
    }
    ,
    t._ucfirst = function(t) {
        return (t + "").toLowerCase().replace(/^./, function(t) {
            return t.toUpperCase()
        })
    }
    ,
    t.fn._move = function() {
        return this.stop(!0, !0),
        t.fn[t.fn.velocity ? "velocity" : "animate"].apply(this, arguments)
    }
    ,
    t.fn.unslider = function(n) {
        return this.each(function(e, i) {
            var o = t(i);
            if (!(t(i).data("unslider")instanceof t.Unslider)) {
                if ("string" == typeof n && o.data("unslider")) {
                    n = n.split(":");
                    var s = o.data("unslider")[n[0]];
                    if (t.isFunction(s))
                        return s.apply(o, n[1] ? n[1].split(",") : null)
                }
                return o.data("unslider", new t.Unslider(o,n))
            }
        })
    }
});

var chopstick = {
    // init, something like a constructor
    init: function() {
        chopstick.loadObject(chopstick.mobileNav, 'chopstick.mobileNav');
        chopstick.loadObject(chopstick.search, 'chopstick.search');
        chopstick.loadObject(chopstick.hide, 'chopstick.hide');
        chopstick.loadObject(chopstick.toggle, 'chopstick.toggle');
        chopstick.loadObject(chopstick.blazy, 'chopstick.blazy');
        chopstick.loadObject(chopstick.modaals, 'chopstick.modaals');
        chopstick.loadObject(chopstick.social, 'chopstick.social');
        chopstick.loadObject(chopstick.loadMore, 'chopstick.loadMore');

        $('.js-marquee-holder').marquee({
            setStartPosition: 100,
            duplicated: true,
            duration: 30000,
            pauseOnHover: true,
            gap: 0,
            startVisible: true
        });

        if ($('.js-overview').hasClass('js-overview-print')) {
            window.print();
        }
    },

    /**
         * This function will load an object by a given name
         *
         * If the object doesn't exist no error will be thrown
         * But if object exists but doesn't have an init method it will throw an error
         *
         * If everything is ok we'll initiate the given object
         */
    loadObject: function(obj, name) {
        // create object based on a name
        // var objName = window[objName];

        // check if object exists
        if (typeof obj != 'undefined') {

            // check if object has a method init
            if (typeof obj.init == 'undefined') {
                // we will throw an error so the designer / developer know there's a problem
                throw new Error('ERROR: "' + name + '" does not have an init function');

            } else {
                // everything is fine so initiate
                obj.init();
            }
        }
    }
};

chopstick.blazy = {
    settings: {
        blazy: null
    },

    init: function() {
        chopstick.blazy.settings.blazy = new Blazy({
            selector: '.js-blazy'
        });
    }
};

chopstick.headerScroll = {
    init: function() {
        var page = $(".js-page");
        var header = $(".js-header");
        var main = $(".js-main");
        var headerHeight = header.height();
        var mainTop = main.offset().top;
        var theHeight = mainTop - headerHeight / 2;
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= theHeight) {
                page.addClass("has-scrolled");
            } else {
                page.removeClass("has-scrolled");
            }
        });
    }
};

var hideSettings
chopstick.hide = {
    settings: {
        hide: $('.js-hide')
    },

    init: function() {
        hideSettings = chopstick.hide.settings;
        chopstick.hide.hideContent();
    },

    hideContent: function() {
        hideSettings.hide.on('click', function(e) {
            e.preventDefault();
            $(this).closest(hideSettings.hide).parent().addClass('is-hidden');
        });
    }
};

chopstick.loadMore = {
    url: Routing.generate('_custom_frontend_ajax_posts_paginate'),
    locale: $('html').attr('lang'),
    $button: $('.js-show-more'),
    $container: $('.js-show-more-container'),

    init: function() {
        chopstick.loadMore.$button.on('click', function() {
            var nextPage = parseInt(chopstick.loadMore.$button.attr('data-page')) + 1;
            $.ajax({
                type: 'GET',
                url: chopstick.loadMore.url,
                data: {
                    _locale: chopstick.loadMore.locale,
                    page: nextPage
                },
                dataType: 'json',
                async: true,
                success: function(response) {
                    chopstick.loadMore.$container.append(response.html);
                    chopstick.blazy.init();
                    chopstick.modaals.init();
                    chopstick.loadMore.$button.attr('data-page', nextPage).blur();

                    if (response.is_last) {
                        chopstick.loadMore.$button.hide();
                    }
                },
                error: function(response) {
                    console.log('error');
                }
            });
        });
    }
};

var mobileNavSettings
chopstick.mobileNav = {
    settings: {
        navigation: $('.js-nav'),
        page: $('.js-page'),
        trigger: $('.js-nav-trigger')
    },

    init: function() {
        // Initialize mobile nav settings
        mobileNavSettings = chopstick.mobileNav.settings;
        // Bind toggle events
        chopstick.mobileNav.bindUIEvents();
    },

    bindUIEvents: function() {
        mobileNavSettings.trigger.on('click', function() {
            chopstick.mobileNav.toggleNavigation();
        });
    },

    // build mobile nav
    toggleNavigation: function() {
        mobileNavSettings.page.toggleClass('has-visible-nav');
        mobileNavSettings.navigation.toggleClass('is-visible');
        mobileNavSettings.trigger.toggleClass('is-active');
    }
};

chopstick.modaals = {
    initialUrl: null,

    init: function() {
        chopstick.modaals.initialUrl = window.location.pathname;
        chopstick.modaals.isModaal = false;

        $('.js-modaal-ajax').modaal({
            type: 'ajax',
            animation_speed: '200',
            after_callback_delay: '250',
            custom_class: 'c-modaal',
            background: '#1A1A1B',
            overlay_opacity: '0.75',
            before_open: function() {// window.history.pushState({'url': window.location.pathname, 'innerHTML': document.body.innerHTML, 'type': 'initial' }, 'initial', window.location.pathname);
            },
            ajax_success: function() {
                // Initialize the images
                chopstick.blazy.settings.blazy.revalidate();
                chopstick.modaals.isModaal = true;

                // history.pushState(null, document.title, location.href);
                window.history.replaceState({
                    'url': window.location.pathname,
                    'innerHTML': document.body.innerHTML,
                    'type': 'detail'
                }, 'modaal-detail', this.$elem.data('route'));
                if ("ga"in window) {
                    var tracker = ga.getAll()[0];
                    if (tracker)
                        tracker.send("pageview", location.pathname);
                }

                chopstick.social.bindUIEvents($('.modaal-container .js-twitter'), $('.modaal-container .js-facebook'));
            },
            after_close: function() {
                console.log('close');
                chopstick.modaals.isModaal = false;
                window.history.replaceState({
                    'url': window.location.pathname,
                    'innerHTML': document.body.innerHTML,
                    'type': 'onclose'
                }, 'initial', chopstick.modaals.initialUrl);
                if ("ga"in window) {
                    var tracker = ga.getAll()[0];
                    if (tracker)
                        tracker.send("pageview", location.pathname);
                }
            }
        });
        $('.js-modaal-video').modaal({
            type: 'video'
        });

        $('.js-modaal-image').modaal({
            type: 'image'
        });

        $('.js-modaal-image-popup').modaal({
            type: 'image',
            overlay_opacity: '.5',
            custom_class: 'p-modaal-popup'
        });
    }
};

// /**
//  * @param event
//  */
// window.onpopstate = function(event) {
//     console.log(event);
//     event.preventDefault();
// if (event.state && typeof event.state.type !== 'undefined') {
//     if (event.state.type === 'initial') {
//         $('#modaal-close').click();
//     }
// }
//
// if (!event.state) {
//     window.history.back();
// }
// window.history.back();
// };

var searchSettings
chopstick.search = {
    settings: {
        navigation: $('.js-nav'),
        search: $('.js-search'),
        page: $('.js-page'),
        input: $('.js-search-input'),
        trigger: $('.js-search-trigger')
    },

    init: function() {
        // Initialize mobile nav settings
        searchSettings = chopstick.search.settings;
        // Bind toggle events
        chopstick.search.bindUIEvents();
    },

    bindUIEvents: function() {
        searchSettings.trigger.on('click', function() {
            chopstick.search.toggleSearch();
        });
    },

    // build mobile nav
    toggleSearch: function() {
        searchSettings.page.toggleClass('has-visible-search');
        searchSettings.search.toggleClass('is-visible');
        searchSettings.trigger.toggleClass('is-active');
        searchSettings.input.focus();
    }
};

/**
 * @author Designers <designers@wijs.be>
 *
 * @type {{settings: Array, init: Function, bindUIEvents: Function }}
 */

chopstick.social = {
    dimensions: 'width=626,height=436',
    twitterTrigger: $('.js-twitter'),
    facebookTrigger: $('.js-facebook'),

    init: function() {
        chopstick.social.bindUIEvents(chopstick.social.twitterTrigger, chopstick.social.facebookTrigger);
    },

    bindUIEvents: function(twitterTrigger, facebookTrigger) {
        // Twitter
        twitterTrigger.on('touchstart click', function(e) {
            var trigger = $(this);
            // Check if action needs to be prevented
            if (trigger.data("action") === "none") {
                e.preventDefault();
            }
            // Share on Twitter
            chopstick.social.shareTwitter(trigger.data('message'), trigger.data('url'));
        });

        // Facebook
        facebookTrigger.on('touchstart click', function(e) {
            var trigger = $(this);
            // Check if action needs to be prevented
            if (trigger.data("action") === "none") {
                e.preventDefault();
            }
            // Share on Facebook
            chopstick.social.shareFacebook(trigger.data('title'), trigger.data('summary'));
        });
    },

    shareFacebook: function(title, summary) {
        window.open("https://www.facebook.com/sharer/sharer.php?p[title]=" + title + "&p[summary]=" + summary + "&p[url]=" + encodeURIComponent(location.href), 'facebook', chopstick.social.dimensions);
    },

    shareTwitter: function(message, url) {
        if (url) {
            window.open('http://twitter.com/intent/tweet?text=' + message + ' ' + url, 'twitter', chopstick.social.dimensions);
        } else {
            window.open('http://twitter.com/intent/tweet?text=' + message + ' ' + encodeURIComponent(location.href), 'twitter', chopstick.social.dimensions);
        }
    }
};

var toggleSettings
chopstick.toggle = {
    settings: {
        showHideToggle: $('.js-show-hide')
    },

    init: function() {
        // Initialize toggle settings
        toggleSettings = chopstick.toggle.settings;
        // Bind toggle events
        chopstick.toggle.bindUIEvents();
    },

    bindUIEvents: function() {
        // Bind show hide event
        toggleSettings.showHideToggle.on('touchstart click', function(e) {
            var trigger = $(this);
            // Check if action needs to be prevented
            if (trigger.data("action") == "none") {
                e.preventDefault();
            }
            chopstick.toggle.showHide(trigger.data("target-selector"));
            trigger.toggleClass('is-toggled');
        });
    },

    showHide: function(targets) {
        //  Toggle the 'is-hidden' class
        $(targets).toggleClass('is-hidden');
    }
};

$(chopstick.init);

// Images must be loaded before initiating Masonry.
// This makes sure masonry calculates correct heights for blocks.
$(window).load(function() {
    $('.js-masonry').masonry({
        itemSelector: '.js-masonry-item'
    });
});

$(document).ready(function() {
    var cookieVisited = '__RWVisited_';
    var cookieTheme = 'RWTheme';
    var themeSwitcher = $('.c-nav-theme');
    var defaultTheme = 'alpha';

    themeSwitcher.find('.c-nav-theme__item').each(function() {
        $(this).on('click', function() {
            var chosenTheme = $(this).attr('data-theme');

            setTheme(chosenTheme);
            setCookie(cookieTheme, chosenTheme, 3);
        })
    });

    if (checkCookie(cookieTheme)) {
        setTheme(getCookie(cookieTheme));
    } else {
        // Set default theme selected
        setTheme(defaultTheme);
        $('.c-nav-theme__item .c-nav-theme__trigger--alpha').parent().addClass('is-selected');
    }

    if ($('.js-modaal-image-popup').length > 0) {
        cookieVisited += $('.js-modaal-image-popup').data('updated-at');
        if (!checkCookie(cookieVisited) && !checkCookieValue(cookieVisited, true)) {
            showModal();
            setCookie(cookieVisited, true, 3);
        }
    }

    function setCookie(name, value, days) {
        // TODO: make day optional; set to infinite if no date.
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    function checkCookie(name) {
        return (document.cookie.split(';').filter(function(item) {
            return item.indexOf(name + '=') >= 0;
        }).length);
    }

    function checkCookieValue(name, value) {
        return (document.cookie.split(';').filter(function(item) {
            return item.indexOf(name + '=' + value) >= 0;
        }).length);
    }

    function getCookie(name) {
        var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
        return !!pair ? pair[1] : null;
    }

    function showModal() {
        // Trigger the modal.
        if ($('.js-modaal-image-popup').length) {
            $('.js-modaal-image-popup').trigger('click');
        }
    }

    function setTheme(name) {
        // Remove old theme class (if there is one)
        $('body').removeClass(function(index, css) {
            // This will search for a class with the theme prefix
            return (css.match(/(^|\s)t-theme\S+/g) || []).join(' ');
        });

        // Apply the selected theme
        $('body').addClass('t-theme-' + name);
        // Change the currently selected theme
        $('.c-nav-theme .c-nav-theme__item').removeClass('is-selected');
        $('.c-nav-theme__item .c-nav-theme__trigger--' + name).parent().addClass('is-selected');
    }
});
