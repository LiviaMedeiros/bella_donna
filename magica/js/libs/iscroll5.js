(function(g, m, f)
{
  function p(a, b)
  {
    this.wrapper = "string" == typeof a ? m.querySelector(a) : a;
    this.scroller = this.wrapper.children[0];
    this.scrollerStyle = this.scroller.style;
    this.options = {
      resizeScrollbars: !0,
      mouseWheelSpeed: 20,
      snapThreshold: .334,
      startX: 0,
      startY: 0,
      scrollY: !0,
      directionLockThreshold: 5,
      momentum: !0,
      bounce: !0,
      bounceTime: 600,
      bounceEasing: "",
      preventDefault: !0,
      preventDefaultException:
      {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
      },
      HWCompositing: !0,
      useTransition: !0,
      useTransform: !0
    };
    for (var c in b) this.options[c] = b[c];
    this.translateZ = this.options.HWCompositing && d.hasPerspective ? " translateZ(0)" : "";
    this.options.useTransition = d.hasTransition && this.options.useTransition;
    this.options.useTransform = d.hasTransform && this.options.useTransform;
    this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough;
    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
    this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY;
    this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX;
    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
    this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? d.ease[this.options.bounceEasing] || d.ease.circular : this.options.bounceEasing;
    this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling;
    !0 === this.options.tap && (this.options.tap = "tap");
    "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1);
    this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
    this.directionY = this.directionX = this.y = this.x = 0;
    this._events = {};
    this._init();
    this.refresh();
    this.scrollTo(this.options.startX, this.options.startY);
    this.enable();
    this.unitSelectFlag = m.getElementById("UnitQuestTopPage") ? !0 : !1
  }

  function q(a, b, c)
  {
    var e = m.createElement("div"),
      d = m.createElement("div");
    !0 === c && (e.style.cssText = "position:absolute;z-index:9999", d.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px");
    d.className = "iScrollIndicator";
    "h" == a ? (!0 === c && (e.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", d.style.height = "100%"), e.className = "iScrollHorizontalScrollbar") : (!0 === c && (e.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", d.style.width = "100%"), e.className = "iScrollVerticalScrollbar");
    e.style.cssText += ";overflow:hidden";
    b || (e.style.pointerEvents = "none");
    e.appendChild(d);
    return e
  }

  function r(a, b)
  {
    this.wrapper = "string" == typeof b.el ? m.querySelector(b.el) : b.el;
    this.wrapperStyle = this.wrapper.style;
    this.indicator = this.wrapper.children[0];
    this.indicatorStyle = this.indicator.style;
    this.scroller = a;
    this.options = {
      listenX: !0,
      listenY: !0,
      interactive: !1,
      resize: !0,
      defaultScrollbars: !1,
      shrink: !1,
      fade: !1,
      speedRatioX: 0,
      speedRatioY: 0
    };
    for (var c in b) this.options[c] = b[c];
    this.sizeRatioY = this.sizeRatioX = 1;
    this.maxPosY = this.maxPosX = 0;
    this.options.interactive && (this.options.disableTouch || (d.addEvent(this.indicator, "touchstart", this), d.addEvent(g, "touchend", this)), this.options.disablePointer || (d.addEvent(this.indicator, "MSPointerDown", this), d.addEvent(g, "MSPointerUp", this)), this.options.disableMouse || (d.addEvent(this.indicator, "mousedown", this), d.addEvent(g, "mouseup", this)));
    this.options.fade && (this.wrapperStyle[d.style.transform] = this.scroller.translateZ, this.wrapperStyle[d.style.transitionDuration] = d.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
  }
  var t = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || g.msRequestAnimationFrame || function(a)
    {
      g.setTimeout(a, 1E3 / 60)
    },
    d = function()
    {
      function a(a)
      {
        return !1 === e ? !1 : "" === e ? a : e + a.charAt(0).toUpperCase() + a.substr(1)
      }
      var b = {},
        c = m.createElement("div").style,
        e = function()
        {
          for (var a = ["t", "webkitT", "MozT", "msT", "OT"], b, e = 0, d = a.length; e < d; e++)
            if (b = a[e] + "ransform", b in c) return a[e].substr(0, a[e].length - 1);
          return !1
        }();
      b.getTime = Date.now || function()
      {
        return (new Date).getTime()
      };
      b.extend = function(a, b)
      {
        for (var c in b) a[c] = b[c]
      };
      b.addEvent = function(a, b, c, e)
      {
        a.addEventListener(b, c, !!e)
      };
      b.removeEvent = function(a, b, c, e)
      {
        a.removeEventListener(b, c, !!e)
      };
      b.momentum = function(a, b, c, e, d, k)
      {
        b = a - b;
        c = f.abs(b) / c;
        var h;
        k = void 0 === k ? 6E-4 : k;
        h = a + c * c / (2 * k) * (0 > b ? -1 : 1);
        k = c / k;
        h < e ? (h = d ? e - d / 2.5 * (c / 8) : e, b = f.abs(h - a), k = b / c) : 0 < h && (h = d ? d / 2.5 * (c / 8) : 0, b = f.abs(a) + h, k = b / c);
        return {
          destination: f.round(h),
          duration: k
        }
      };
      var d = a("transform");
      b.extend(b,
      {
        hasTransform: !1 !== d,
        hasPerspective: a("perspective") in c,
        hasTouch: "ontouchstart" in g,
        hasPointer: navigator.msPointerEnabled,
        hasTransition: a("transition") in c
      });
      b.isBadAndroid = /Android /.test(g.navigator.appVersion) && !/Chrome\/\d/.test(g.navigator.appVersion);
      b.extend(b.style = {},
      {
        transform: d,
        transitionTimingFunction: a("transitionTimingFunction"),
        transitionDuration: a("transitionDuration"),
        transitionDelay: a("transitionDelay"),
        transformOrigin: a("transformOrigin")
      });
      b.hasClass = function(a, b)
      {
        return (new RegExp("(^|\\s)" + b + "(\\s|$)")).test(a.className)
      };
      b.addClass = function(a, c)
      {
        if (!b.hasClass(a, c))
        {
          var e = a.className.split(" ");
          e.push(c);
          a.className = e.join(" ")
        }
      };
      b.removeClass = function(a, c)
      {
        b.hasClass(a, c) && (a.className = a.className.replace(new RegExp("(^|\\s)" + c + "(\\s|$)", "g"), " "))
      };
      b.offset = function(a)
      {
        for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
        return {
          left: b,
          top: c
        }
      };
      b.preventDefaultException = function(a, b)
      {
        for (var c in b)
          if (b[c].test(a[c])) return !0;
        return !1
      };
      b.extend(b.eventType = {},
      {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,
        mousedown: 2,
        mousemove: 2,
        mouseup: 2,
        MSPointerDown: 3,
        MSPointerMove: 3,
        MSPointerUp: 3
      });
      b.extend(b.ease = {},
      {
        quadratic:
        {
          style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fn: function(a)
          {
            return a * (2 - a)
          }
        },
        circular:
        {
          style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
          fn: function(a)
          {
            return f.sqrt(1 - --a * a)
          }
        },
        back:
        {
          style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          fn: function(a)
          {
            return --a * a * (5 * a + 4) + 1
          }
        },
        bounce:
        {
          style: "",
          fn: function(a)
          {
            return (a /= 1) < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
          }
        },
        elastic:
        {
          style: "",
          fn: function(a)
          {
            return 0 === a ? 0 : 1 == a ? 1 : .4 * f.pow(2, -10 * a) * f.sin(2 * (a - .055) * f.PI / .22) + 1
          }
        }
      });
      b.tap = function(a, b)
      {
        var c = m.createEvent("Event");
        c.initEvent(b, !0, !0);
        c.pageX = a.pageX;
        c.pageY = a.pageY;
        a.target.dispatchEvent(c)
      };
      b.click = function(a)
      {
        var b = a.target,
          c;
        /(SELECT|INPUT|TEXTAREA)/i.test(b.tagName) || (c = m.createEvent("MouseEvents"), c.initMouseEvent("click", !0, !0, a.view, 1, b.screenX, b.screenY, b.clientX, b.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), c._constructed = !0, b.dispatchEvent(c))
      };
      return b
    }();
  p.prototype = {
    version: "5.1.1",
    _init: function()
    {
      this._initEvents();
      (this.options.scrollbars || this.options.indicators) && this._initIndicators();
      this.options.mouseWheel && this._initWheel();
      this.options.snap && this._initSnap();
      this.options.keyBindings && this._initKeys()
    },
    destroy: function()
    {
      this._initEvents(!0);
      this._execEvent("destroy")
    },
    _transitionEnd: function(a)
    {
      a.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
    },
    _start: function(a)
    {
      if (!(1 != d.eventType[a.type] && 0 !== a.button || !this.enabled || this.initiated && d.eventType[a.type] !== this.initiated))
      {
        !this.options.preventDefault || d.isBadAndroid || d.preventDefaultException(a.target, this.options.preventDefaultException) || a.preventDefault();
        var b = a.touches ? a.touches[0] : a;
        this.initiated = d.eventType[a.type];
        this.moved = !1;
        this.directionLocked = this.directionY = this.directionX = this.distY = this.distX = 0;
        this._transitionTime();
        this.startTime = d.getTime();
        this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, a = this.getComputedPosition(), this._translate(f.round(a.x), f.round(a.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd"));
        this.startX = this.x;
        this.startY = this.y;
        this.absStartX = this.x;
        this.absStartY = this.y;
        this.pointX = b.pageX;
        this.pointY = b.pageY;
        this._execEvent("beforeScrollStart")
      }
    },
    _move: function(a)
    {
      if (this.enabled && d.eventType[a.type] === this.initiated)
      {
        this.options.preventDefault && a.preventDefault();
        var b = a.touches ? a.touches[0] : a,
          c = b.pageX - this.pointX,
          e = b.pageY - this.pointY,
          k = d.getTime(),
          h;
        this.pointX = b.pageX;
        this.pointY = b.pageY;
        this.distX += c;
        this.distY += e;
        b = f.abs(this.distX);
        h = f.abs(this.distY);
        if (!(300 < k - this.endTime && 10 > b && 10 > h))
        {
          this.directionLocked || this.options.freeScroll || (this.directionLocked = b > h + this.options.directionLockThreshold ? "h" : h >= b + this.options.directionLockThreshold ? "v" : "n");
          if ("h" == this.directionLocked)
          {
            if ("vertical" == this.options.eventPassthrough) a.preventDefault();
            else if ("horizontal" == this.options.eventPassthrough)
            {
              this.initiated = !1;
              return
            }
            e = 0
          }
          else if ("v" == this.directionLocked)
          {
            if ("horizontal" == this.options.eventPassthrough) a.preventDefault();
            else if ("vertical" == this.options.eventPassthrough)
            {
              this.initiated = !1;
              return
            }
            c = 0
          }
          c = this.hasHorizontalScroll ? c : 0;
          e = this.hasVerticalScroll ? e : 0;
          a = this.x + c;
          b = this.y + e;
          if (0 < a || a < this.maxScrollX) a = this.options.bounce ? this.x + c / 3 : 0 < a ? 0 : this.maxScrollX;
          if (0 < b || b < this.maxScrollY) b = this.options.bounce ? this.y + e / 3 : 0 < b ? 0 : this.maxScrollY;
          this.directionX = 0 < c ? -1 : 0 > c ? 1 : 0;
          this.directionY = 0 < e ? -1 : 0 > e ? 1 : 0;
          this.moved || this._execEvent("scrollStart");
          this.moved = !0;
          this._translate(a, b);
          300 < k - this.startTime && (this.startTime = k, this.startX = this.x, this.startY = this.y)
        }
      }
    },
    _end: function(a)
    {
      if (this.enabled && d.eventType[a.type] === this.initiated)
      {
        this.options.preventDefault && !d.preventDefaultException(a.target, this.options.preventDefaultException) && a.preventDefault();
        var b, c;
        c = d.getTime() - this.startTime;
        a = f.round(this.x);
        var e = f.round(this.y),
          k = f.abs(a - this.startX),
          h = f.abs(e - this.startY);
        b = 0;
        var g = "";
        this.initiated = this.isInTransition = 0;
        this.endTime = d.getTime();
        this.scrollTo(a, e);
        if (!this.resetPosition(this.options.bounceTime))
          if (this.options.momentum && this._events.flick && 200 > c && 100 > k && 100 > h) this._execEvent("flick");
          else if (this.options.momentum && 300 > c && (b = this.hasHorizontalScroll ? d.momentum(this.x, this.startX, c, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) :
          {
            destination: a,
            duration: 0
          }, c = this.hasVerticalScroll ? d.momentum(this.y, this.startY, c, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) :
          {
            destination: e,
            duration: 0
          }, a = b.destination, e = c.destination, b = f.max(b.duration, c.duration), this.isInTransition = 1), this.options.snap && (this.currentPage = g = this._nearestSnap(a, e), b = this.options.snapSpeed || f.max(f.max(f.min(f.abs(a - g.x), 1E3), f.min(f.abs(e - g.y), 1E3)), 300), a = g.x, e = g.y, this.directionY = this.directionX = 0, g = this.options.bounceEasing), this._execEvent("flickMotionStart"), a != this.x || e != this.y)
        {
          if (0 < a || a < this.maxScrollX || 0 < e || e < this.maxScrollY) g = d.ease.quadratic;
          this.scrollTo(a, e, b, g)
        }
        else this._execEvent("scrollEnd")
      }
    },
    _resize: function()
    {
      var a = this;
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(function()
      {
        a.refresh()
      }, this.options.resizePolling)
    },
    resetPosition: function(a)
    {
      var b = this.x,
        c = this.y;
      !this.hasHorizontalScroll || 0 < this.x ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX);
      !this.hasVerticalScroll || 0 < this.y ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY);
      if (b == this.x && c == this.y) return !1;
      this.scrollTo(b, c, a || 0, this.options.bounceEasing);
      return !0
    },
    disable: function()
    {
      this.enabled = !1
    },
    enable: function()
    {
      this.enabled = !0
    },
    refresh: function()
    {
      this.wrapperWidth = this.wrapper.clientWidth;
      this.wrapperHeight = this.wrapper.clientHeight;
      this.scrollerWidth = this.scroller.offsetWidth;
      this.scrollerHeight = this.scroller.offsetHeight;
      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
      this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
      this.hasHorizontalScroll = this.options.scrollX && 0 > this.maxScrollX;
      this.hasVerticalScroll = this.options.scrollY && 0 > this.maxScrollY;
      this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth);
      this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight);
      this.directionY = this.directionX = this.endTime = 0;
      this.wrapperOffset = d.offset(this.wrapper);
      this._execEvent("refresh");
      this.resetPosition()
    },
    on: function(a, b)
    {
      this._events[a] || (this._events[a] = []);
      this._events[a].push(b)
    },
    off: function(a, b)
    {
      this._events[a] && (b = this._events[a].indexOf(b), -1 < b && this._events[a].splice(b, 1))
    },
    _execEvent: function(a)
    {
      if (this._events[a])
      {
        var b = 0,
          c = this._events[a].length;
        if (c)
          for (; b < c; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
      }
    },
    scrollBy: function(a, b, c, e)
    {
      a = this.x + a;
      b = this.y + b;
      this.scrollTo(a, b, c || 0, e)
    },
    scrollTo: function(a, b, c, e)
    {
      e = e || d.ease.circular;
      this.isInTransition = this.options.useTransition && 0 < c;
      !c || this.options.useTransition && e.style ? (this._transitionTimingFunction(e.style), this._transitionTime(c), this._translate(a, b)) : this._animate(a, b, c, e.fn)
    },
    scrollToElement: function(a, b, c, e, k)
    {
      if (a = a.nodeType ? a : this.scroller.querySelector(a))
      {
        var h = d.offset(a);
        h.left -= this.wrapperOffset.left;
        h.top -= this.wrapperOffset.top;
        !0 === c && (c = f.round(a.offsetWidth / 2 - this.wrapper.offsetWidth / 2));
        !0 === e && (e = f.round(a.offsetHeight / 2 - this.wrapper.offsetHeight / 2));
        h.left -= c || 0;
        h.top -= e || 0;
        h.left = 0 < h.left ? 0 : h.left < this.maxScrollX ? this.maxScrollX : h.left;
        h.top = 0 < h.top ? 0 : h.top < this.maxScrollY ? this.maxScrollY : h.top;
        b = void 0 === b || null === b || "auto" === b ? f.max(f.abs(this.x - h.left), f.abs(this.y - h.top)) : b;
        this.scrollTo(h.left, h.top, b, k)
      }
    },
    _transitionTime: function(a)
    {
      a = a || 0;
      this.scrollerStyle[d.style.transitionDuration] = a + "ms";
      !a && d.isBadAndroid && (this.scrollerStyle[d.style.transitionDuration] = "0.001s");
      if (this.indicators)
        for (var b = this.indicators.length; b--;) this.indicators[b].transitionTime(a)
    },
    _transitionTimingFunction: function(a)
    {
      this.scrollerStyle[d.style.transitionTimingFunction] = a;
      if (this.indicators)
        for (var b = this.indicators.length; b--;) this.indicators[b].transitionTimingFunction(a)
    },
    _translate: function(a, b)
    {
      this.options.useTransform ? this.scrollerStyle[d.style.transform] = "translate(" + a + "px," + b + "px)" + this.translateZ : (a = f.round(a), b = f.round(b), this.scrollerStyle.left = a + "px", this.scrollerStyle.top = b + "px");
      this.x = a;
      this.y = b;
      if (this.indicators)
        for (a = this.indicators.length; a--;) this.indicators[a].updatePosition()
    },
    _initEvents: function(a)
    {
      a = a ? d.removeEvent : d.addEvent;
      var b = this.options.bindToWrapper ? this.wrapper : g;
      a(g, "orientationchange", this);
      a(g, "resize", this);
      this.options.click && a(this.wrapper, "click", this, !0);
      this.options.disableMouse || (a(this.wrapper, "mousedown", this), a(b, "mousemove", this), a(b, "mousecancel", this), a(b, "mouseup", this));
      d.hasPointer && !this.options.disablePointer && (a(this.wrapper, "MSPointerDown", this), a(b, "MSPointerMove", this), a(b, "MSPointerCancel", this), a(b, "MSPointerUp", this));
      d.hasTouch && !this.options.disableTouch && (a(this.wrapper, "touchstart", this), a(b, "touchmove", this), a(b, "touchcancel", this), a(b, "touchend", this));
      a(this.scroller, "transitionend", this);
      a(this.scroller, "webkitTransitionEnd", this);
      a(this.scroller, "oTransitionEnd", this);
      a(this.scroller, "MSTransitionEnd", this)
    },
    getComputedPosition: function()
    {
      var a = g.getComputedStyle(this.scroller, null),
        b;
      this.options.useTransform ? (a = a[d.style.transform].split(")")[0].split(", "), b = +(a[12] || a[4]), a = +(a[13] || a[5])) : (b = +a.left.replace(/[^-\d.]/g, ""), a = +a.top.replace(/[^-\d.]/g, ""));
      return {
        x: b,
        y: a
      }
    },
    _initIndicators: function()
    {
      function a(a)
      {
        for (var b = f.indicators.length; b--;) a.call(f.indicators[b])
      }
      var b = this.options.interactiveScrollbars,
        c = "string" != typeof this.options.scrollbars,
        e = [],
        d, f = this;
      this.indicators = [];
      this.options.scrollbars && (this.options.scrollY && (d = {
        el: q("v", b, this.options.scrollbars),
        interactive: b,
        defaultScrollbars: !0,
        customStyle: c,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenX: !1
      }, this.wrapper.appendChild(d.el), e.push(d)), this.options.scrollX && (d = {
        el: q("h", b, this.options.scrollbars),
        interactive: b,
        defaultScrollbars: !0,
        customStyle: c,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenY: !1
      }, this.wrapper.appendChild(d.el), e.push(d)));
      this.options.indicators && (e = e.concat(this.options.indicators));
      for (b = e.length; b--;) this.indicators.push(new r(this, e[b]));
      this.options.fadeScrollbars && (this.on("scrollEnd", function()
      {
        a(function()
        {
          this.fade()
        })
      }), this.on("scrollCancel", function()
      {
        a(function()
        {
          this.fade()
        })
      }), this.on("scrollStart", function()
      {
        a(function()
        {
          this.fade(1)
        })
      }), this.on("beforeScrollStart", function()
      {
        a(function()
        {
          this.fade(1, !0)
        })
      }));
      this.on("refresh", function()
      {
        a(function()
        {
          this.refresh()
        })
      });
      this.on("destroy", function()
      {
        a(function()
        {
          this.destroy()
        });
        delete this.indicators
      })
    },
    _initWheel: function()
    {
      d.addEvent(this.wrapper, "wheel", this);
      d.addEvent(this.wrapper, "mousewheel", this);
      d.addEvent(this.wrapper, "DOMMouseScroll", this);
      this.on("destroy", function()
      {
        d.removeEvent(this.wrapper, "wheel", this);
        d.removeEvent(this.wrapper, "mousewheel", this);
        d.removeEvent(this.wrapper, "DOMMouseScroll", this)
      })
    },
    _wheel: function(a)
    {
      if (this.enabled)
      {
        a.preventDefault();
        a.stopPropagation();
        var b, c, e, d = this;
        void 0 === this.wheelTimeout && d._execEvent("scrollStart");
        clearTimeout(this.wheelTimeout);
        this.wheelTimeout = setTimeout(function()
        {
          d._execEvent("scrollEnd");
          d.wheelTimeout = void 0
        }, 400);
        if ("deltaX" in a) b = -a.deltaX, a = -a.deltaY;
        else if ("wheelDeltaX" in a) b = a.wheelDeltaX / 120 * this.options.mouseWheelSpeed, a = a.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
        else if ("wheelDelta" in a) b = a = a.wheelDelta / 120 * this.options.mouseWheelSpeed;
        else if ("detail" in a) b = a = -a.detail / 3 * this.options.mouseWheelSpeed;
        else return;
        b *= this.options.invertWheelDirection;
        a *= this.options.invertWheelDirection;
        this.hasVerticalScroll || (b = a, a = 0);
        this.options.snap ? (c = this.currentPage.pageX, e = this.currentPage.pageY, 0 < b ? c-- : 0 > b && c++, 0 < a ? e-- : 0 > a && e++, this.goToPage(c, e)) : (c = this.x + f.round(this.hasHorizontalScroll ? b : 0), e = this.y + f.round(this.hasVerticalScroll ? a : 0), 0 < c ? c = 0 : c < this.maxScrollX && (c = this.maxScrollX), 0 < e ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY), this.scrollTo(c, e, 0))
      }
    },
    _initSnap: function()
    {
      this.currentPage = {};
      "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap));
      this.on("refresh", function()
      {
        var a = 0,
          b, c = 0,
          e, d, h, g = 0,
          n;
        e = this.options.snapStepX || this.wrapperWidth;
        var l = this.options.snapStepY || this.wrapperHeight;
        this.pages = [];
        if (this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight)
        {
          if (!0 === this.options.snap)
            for (d = f.round(e / 2), h = f.round(l / 2); g > -this.scrollerWidth;)
            {
              this.pages[a] = [];
              for (n = b = 0; n > -this.scrollerHeight;) this.pages[a][b] = {
                x: f.max(g, this.maxScrollX),
                y: f.max(n, this.maxScrollY),
                width: e,
                height: l,
                cx: g - d,
                cy: n - h
              }, n -= l, b++;
              g -= e;
              a++
            }
          else
            for (l = this.options.snap, b = l.length, e = -1; a < b; a++)
            {
              if (0 === a || l[a].offsetLeft <= l[a - 1].offsetLeft) c = 0, e++;
              this.pages[c] || (this.pages[c] = []);
              g = f.max(-l[a].offsetLeft, this.maxScrollX);
              n = f.max(-l[a].offsetTop, this.maxScrollY);
              d = g - f.round(l[a].offsetWidth / 2);
              h = n - f.round(l[a].offsetHeight / 2);
              this.pages[c][e] = {
                x: g,
                y: n,
                width: l[a].offsetWidth,
                height: l[a].offsetHeight,
                cx: d,
                cy: h
              };
              g > this.maxScrollX && c++
            }
          this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
          0 === this.options.snapThreshold % 1 ? this.snapThresholdY = this.snapThresholdX = this.options.snapThreshold : (this.snapThresholdX = f.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = f.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
        }
      });
      this.on("flick", function()
      {
        var a = this.options.snapSpeed || f.max(f.max(f.min(f.abs(this.x - this.startX), 1E3), f.min(f.abs(this.y - this.startY), 1E3)), 300);
        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, a)
      })
    },
    _nearestSnap: function(a, b)
    {
      if (!this.pages.length) return {
        x: 0,
        y: 0,
        pageX: 0,
        pageY: 0
      };
      var c = 0,
        e = this.pages.length,
        d = 0;
      if (f.abs(a - this.absStartX) < this.snapThresholdX && f.abs(b - this.absStartY) < this.snapThresholdY) return this.currentPage;
      0 < a ? a = 0 : a < this.maxScrollX && (a = this.maxScrollX);
      0 < b ? b = 0 : b < this.maxScrollY && (b = this.maxScrollY);
      for (; c < e; c++)
        if (a >= this.pages[c][0].cx)
        {
          a = this.pages[c][0].x;
          break
        } for (e = this.pages[c].length; d < e; d++)
        if (b >= this.pages[0][d].cy)
        {
          b = this.pages[0][d].y;
          break
        } c == this.currentPage.pageX && (c += this.directionX, 0 > c ? c = 0 : c >= this.pages.length && (c = this.pages.length - 1), a = this.pages[c][0].x);
      d == this.currentPage.pageY && (d += this.directionY, 0 > d ? d = 0 : d >= this.pages[0].length && (d = this.pages[0].length - 1), b = this.pages[0][d].y);
      return {
        x: a,
        y: b,
        pageX: c,
        pageY: d
      }
    },
    goToPage: function(a, b, c, d)
    {
      d = d || this.options.bounceEasing;
      a >= this.pages.length ? a = this.pages.length - 1 : 0 > a && (a = 0);
      b >= this.pages[a].length ? b = this.pages[a].length - 1 : 0 > b && (b = 0);
      var e = this.pages[a][b].x,
        h = this.pages[a][b].y;
      c = void 0 === c ? this.options.snapSpeed || f.max(f.max(f.min(f.abs(e - this.x), 1E3), f.min(f.abs(h - this.y), 1E3)), 300) : c;
      this.currentPage = {
        x: e,
        y: h,
        pageX: a,
        pageY: b
      };
      this._execEvent("goToPage");
      this.scrollTo(e, h, c, d)
    },
    next: function(a, b)
    {
      var c = this.currentPage.pageX,
        d = this.currentPage.pageY;
      c++;
      c >= this.pages.length && this.hasVerticalScroll && (c = 0, d++);
      this.goToPage(c, d, a, b)
    },
    prev: function(a, b)
    {
      var c = this.currentPage.pageX,
        d = this.currentPage.pageY;
      c--;
      0 > c && this.hasVerticalScroll && (c = 0, d--);
      this.goToPage(c, d, a, b)
    },
    _initKeys: function(a)
    {
      a = {
        pageUp: 33,
        pageDown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };
      var b;
      if ("object" == typeof this.options.keyBindings)
        for (b in this.options.keyBindings) "string" == typeof this.options.keyBindings[b] && (this.options.keyBindings[b] = this.options.keyBindings[b].toUpperCase().charCodeAt(0));
      else this.options.keyBindings = {};
      for (b in a) this.options.keyBindings[b] = this.options.keyBindings[b] || a[b];
      d.addEvent(g, "keydown", this);
      this.on("destroy", function()
      {
        d.removeEvent(g, "keydown", this)
      })
    },
    _key: function(a)
    {
      if (this.enabled)
      {
        var b = this.options.snap,
          c = b ? this.currentPage.pageX : this.x,
          e = b ? this.currentPage.pageY : this.y,
          g = d.getTime(),
          h = this.keyTime || 0,
          m;
        this.options.useTransition && this.isInTransition && (m = this.getComputedPosition(), this._translate(f.round(m.x), f.round(m.y)), this.isInTransition = !1);
        this.keyAcceleration = 200 > g - h ? f.min(this.keyAcceleration + .25, 50) : 0;
        switch (a.keyCode)
        {
          case this.options.keyBindings.pageUp:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? c += b ? 1 : this.wrapperWidth : e += b ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.pageDown:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? c -= b ? 1 : this.wrapperWidth : e -= b ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.end:
            c = b ? this.pages.length - 1 : this.maxScrollX;
            e = b ? this.pages[0].length - 1 : this.maxScrollY;
            break;
          case this.options.keyBindings.home:
            e = c = 0;
            break;
          case this.options.keyBindings.left:
            c += b ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.up:
            e += b ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.right:
            c -= b ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.down:
            e -= b ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          default:
            return
        }
        b ? this.goToPage(c, e) : (0 < c ? this.keyAcceleration = c = 0 : c < this.maxScrollX && (c = this.maxScrollX, this.keyAcceleration = 0), 0 < e ? this.keyAcceleration = e = 0 : e < this.maxScrollY && (e = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(c, e, 0), this.keyTime = g)
      }
    },
    _animate: function(a, b, c, e)
    {
      function f()
      {
        var k = d.getTime(),
          n;
        k >= p ? (h.isAnimating = !1, h._translate(a, b), h.resetPosition(h.options.bounceTime) || h._execEvent("scrollEnd")) : (k = (k - l) / c, n = e(k), k = (a - g) * n + g, h._translate(k, (b - m) * n + m), h.isAnimating && t(f))
      }
      var h = this,
        g = this.x,
        m = this.y,
        l = d.getTime(),
        p = l + c;
      this.isAnimating = !0;
      f()
    },
    handleEvent: function(a)
    {
      switch (a.type)
      {
        case "touchstart":
        case "MSPointerDown":
        case "mousedown":
          this._start(a);
          break;
        case "touchmove":
        case "MSPointerMove":
        case "mousemove":
          this._move(a);
          break;
        case "touchend":
        case "MSPointerUp":
        case "mouseup":
        case "touchcancel":
        case "MSPointerCancel":
        case "mousecancel":
          this._end(a);
          break;
        case "orientationchange":
        case "resize":
          this._resize();
          break;
        case "transitionend":
        case "webkitTransitionEnd":
        case "oTransitionEnd":
        case "MSTransitionEnd":
          this._transitionEnd(a);
          break;
        case "wheel":
        case "DOMMouseScroll":
        case "mousewheel":
          this._wheel(a);
          break;
        case "keydown":
          this._key(a);
          break;
        case "click":
          a._constructed || (a.preventDefault(), a.stopPropagation())
      }
    }
  };
  r.prototype = {
    handleEvent: function(a)
    {
      switch (a.type)
      {
        case "touchstart":
        case "MSPointerDown":
        case "mousedown":
          this._start(a);
          break;
        case "touchmove":
        case "MSPointerMove":
        case "mousemove":
          this._move(a);
          break;
        case "touchend":
        case "MSPointerUp":
        case "mouseup":
        case "touchcancel":
        case "MSPointerCancel":
        case "mousecancel":
          this._end(a)
      }
    },
    destroy: function()
    {
      this.options.interactive && (d.removeEvent(this.indicator, "touchstart", this), d.removeEvent(this.indicator, "MSPointerDown", this), d.removeEvent(this.indicator, "mousedown", this), d.removeEvent(g, "touchmove", this), d.removeEvent(g, "MSPointerMove", this), d.removeEvent(g, "mousemove", this), d.removeEvent(g, "touchend", this), d.removeEvent(g, "MSPointerUp", this), d.removeEvent(g, "mouseup", this));
      this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
    },
    _start: function(a)
    {
      var b = a.touches ? a.touches[0] : a;
      a.preventDefault();
      a.stopPropagation();
      this.transitionTime();
      this.initiated = !0;
      this.moved = !1;
      this.lastPointX = b.pageX;
      this.lastPointY = b.pageY;
      this.startTime = d.getTime();
      this.options.disableTouch || d.addEvent(g, "touchmove", this);
      this.options.disablePointer || d.addEvent(g, "MSPointerMove", this);
      this.options.disableMouse || d.addEvent(g, "mousemove", this);
      this.scroller._execEvent("beforeScrollStart")
    },
    _move: function(a)
    {
      var b = a.touches ? a.touches[0] : a,
        c, e;
      d.getTime();
      this.moved || this.scroller._execEvent("scrollStart");
      this.moved = !0;
      c = b.pageX - this.lastPointX;
      this.lastPointX = b.pageX;
      e = b.pageY - this.lastPointY;
      this.lastPointY = b.pageY;
      this._pos(this.x + c, this.y + e);
      a.preventDefault();
      a.stopPropagation()
    },
    _end: function(a)
    {
      if (this.initiated)
      {
        this.initiated = !1;
        a.preventDefault();
        a.stopPropagation();
        d.removeEvent(g, "touchmove", this);
        d.removeEvent(g, "MSPointerMove", this);
        d.removeEvent(g, "mousemove", this);
        if (this.scroller.options.snap)
        {
          a = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
          var b = this.options.snapSpeed || f.max(f.max(f.min(f.abs(this.scroller.x - a.x), 1E3), f.min(f.abs(this.scroller.y - a.y), 1E3)), 300);
          if (this.scroller.x != a.x || this.scroller.y != a.y) this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = a, this.scroller.scrollTo(a.x, a.y, b, this.scroller.options.bounceEasing)
        }
        this.moved && this.scroller._execEvent("scrollEnd")
      }
    },
    transitionTime: function(a)
    {
      a = a || 0;
      this.indicatorStyle[d.style.transitionDuration] = a + "ms";
      !a && d.isBadAndroid && (this.indicatorStyle[d.style.transitionDuration] = "0.001s")
    },
    transitionTimingFunction: function(a)
    {
      this.indicatorStyle[d.style.transitionTimingFunction] = a
    },
    refresh: function()
    {
      this.transitionTime();
      this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none";
      this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (d.addClass(this.wrapper, "iScrollBothScrollbars"), d.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (d.removeClass(this.wrapper, "iScrollBothScrollbars"), d.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
      this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = f.max(f.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX);
      this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = f.max(f.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY);
      this.updatePosition()
    },
    updatePosition: function()
    {
      var a = this.options.listenX && f.round(this.sizeRatioX * this.scroller.x) || 0,
        b = this.options.listenY && f.round(this.sizeRatioY * this.scroller.y) || 0;
      this.options.ignoreBoundaries || (a < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = f.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px"), a = this.minBoundaryX) : a > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = f.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : a = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = f.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px"), b = this.minBoundaryY) : b > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = f.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : b = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px"));
      this.x = a;
      this.y = b;
      this.scroller.options.useTransform ? this.indicatorStyle[d.style.transform] = "translate(" + a + "px," + b + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = a + "px", this.indicatorStyle.top = b + "px")
    },
    _pos: function(a, b)
    {
      0 > a ? a = 0 : a > this.maxPosX && (a = this.maxPosX);
      0 > b ? b = 0 : b > this.maxPosY && (b = this.maxPosY);
      a = this.options.listenX ? f.round(a / this.sizeRatioX) : this.scroller.x;
      b = this.options.listenY ? f.round(b / this.sizeRatioY) : this.scroller.y;
      this.scroller.scrollTo(a, b)
    },
    fade: function(a, b)
    {
      if (!b || this.visible) clearTimeout(this.fadeTimeout), this.fadeTimeout = null, b = a ? 0 : 300, this.wrapperStyle[d.style.transitionDuration] = (a ? 250 : 500) + "ms", this.fadeTimeout = setTimeout(function(a)
      {
        this.wrapperStyle.opacity = a;
        this.visible = +a
      }.bind(this, a ? "1" : "0"), b)
    }
  };
  p.utils = d;
  "undefined" != typeof module && module.exports ? module.exports = p : g.IScroll = p
})(window, document, Math);
