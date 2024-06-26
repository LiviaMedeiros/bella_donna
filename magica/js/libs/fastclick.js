/*
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
(function()
{
  function c(a, b)
  {
    function d(a, b)
    {
      return function()
      {
        return a.apply(b, arguments)
      }
    }
    var f;
    b = b ||
    {};
    this.trackingClick = !1;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.lastTouchIdentifier = this.touchStartY = this.touchStartX = 0;
    this.touchBoundary = b.touchBoundary || 10;
    this.layer = a;
    this.tapDelay = b.tapDelay || 200;
    this.tapTimeout = b.tapTimeout || 700;
    if (!c.notNeeded(a))
    {
      b = "onMouse onClick onTouchStart onTouchMove onTouchEnd onTouchCancel".split(" ");
      for (var e = 0, h = b.length; e < h; e++) this[b[e]] = d(this[b[e]], this);
      g && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0));
      a.addEventListener("click", this.onClick, !0);
      a.addEventListener("touchstart", this.onTouchStart, !1);
      a.addEventListener("touchmove", this.onTouchMove, !1);
      a.addEventListener("touchend", this.onTouchEnd, !1);
      a.addEventListener("touchcancel", this.onTouchCancel, !1);
      Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, d, c)
      {
        var f = Node.prototype.removeEventListener;
        "click" === b ? f.call(a, b, d.hijacked || d, c) : f.call(a, b, d, c)
      }, a.addEventListener = function(b, d, c)
      {
        var f = Node.prototype.addEventListener;
        "click" === b ? f.call(a, b, d.hijacked || (d.hijacked = function(a)
        {
          a.propagationStopped || d(a)
        }), c) : f.call(a, b, d, c)
      });
      "function" === typeof a.onclick && (f = a.onclick, a.addEventListener("click", function(a)
      {
        f(a)
      }, !1), a.onclick = null)
    }
  }
  var h = 0 <= navigator.userAgent.indexOf("Windows Phone"),
    g = 0 < navigator.userAgent.indexOf("Android") && !h,
    e = /iP(ad|hone|od)/.test(navigator.userAgent) && !h,
    k = e && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    l = e && /OS [6-7]_\d/.test(navigator.userAgent),
    m = 0 < navigator.userAgent.indexOf("BB10");
  c.prototype.needsClick = function(a)
  {
    switch (a.nodeName.toLowerCase())
    {
      case "button":
      case "select":
      case "textarea":
        if (a.disabled) return !0;
        break;
      case "input":
        if (e && "file" === a.type || a.disabled) return !0;
        break;
      case "label":
      case "iframe":
      case "video":
        return !0
    }
    return /\bneedsclick\b/.test(a.className)
  };
  c.prototype.needsFocus = function(a)
  {
    switch (a.nodeName.toLowerCase())
    {
      case "textarea":
        return !0;
      case "select":
        return !g;
      case "input":
        switch (a.type)
        {
          case "button":
          case "checkbox":
          case "file":
          case "image":
          case "radio":
          case "submit":
            return !1
        }
        return !a.disabled && !a.readOnly;
      default:
        return /\bneedsfocus\b/.test(a.className)
    }
  };
  c.prototype.sendClick = function(a, b)
  {
    var d;
    document.activeElement && document.activeElement !== a && document.activeElement.blur();
    d = b.changedTouches[0];
    b = document.createEvent("MouseEvents");
    b.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null);
    b.forwardedTouchEvent = !0;
    a.dispatchEvent(b)
  };
  c.prototype.determineEventType = function(a)
  {
    return g && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
  };
  c.prototype.focus = function(a)
  {
    var b;
    e && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
  };
  c.prototype.updateScrollParent = function(a)
  {
    var b, d;
    b = a.fastClickScrollParent;
    if (!b || !b.contains(a))
    {
      d = a;
      do {
        if (d.scrollHeight > d.offsetHeight)
        {
          b = d;
          a.fastClickScrollParent = d;
          break
        }
        d = d.parentElement
      } while (d)
    }
    b && (b.fastClickLastScrollTop = b.scrollTop)
  };
  c.prototype.getTargetElementFromEventTarget = function(a)
  {
    return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
  };
  c.prototype.onTouchStart = function(a)
  {
    var b, d, c;
    if (1 < a.targetTouches.length) return !0;
    b = this.getTargetElementFromEventTarget(a.target);
    d = a.targetTouches[0];
    if (e)
    {
      c = window.getSelection();
      if (c.rangeCount && !c.isCollapsed) return !0;
      if (!k)
      {
        if (d.identifier && d.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
        this.lastTouchIdentifier = d.identifier;
        this.updateScrollParent(b)
      }
    }
    this.trackingClick = !0;
    this.trackingClickStart = a.timeStamp;
    this.targetElement = b;
    this.touchStartX = d.pageX;
    this.touchStartY = d.pageY;
    a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault();
    return !0
  };
  c.prototype.touchHasMoved = function(a)
  {
    a = a.changedTouches[0];
    var b = this.touchBoundary;
    return Math.abs(a.pageX - this.touchStartX) > b || Math.abs(a.pageY - this.touchStartY) > b ? !0 : !1
  };
  c.prototype.onTouchMove = function(a)
  {
    if (!this.trackingClick) return !0;
    if (this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) this.trackingClick = !1, this.targetElement = null;
    return !0
  };
  c.prototype.findControl = function(a)
  {
    return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
  };
  c.prototype.onTouchEnd = function(a)
  {
    var b, d, c = this.targetElement;
    if (!this.trackingClick) return !0;
    if (a.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0;
    if (a.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
    this.cancelNextClick = !1;
    this.lastClickTime = a.timeStamp;
    b = this.trackingClickStart;
    this.trackingClick = !1;
    this.trackingClickStart = 0;
    l && (d = a.changedTouches[0], c = document.elementFromPoint(d.pageX - window.pageXOffset, d.pageY - window.pageYOffset) || c, c.fastClickScrollParent = this.targetElement.fastClickScrollParent);
    d = c.tagName.toLowerCase();
    if ("label" === d)
    {
      if (b = this.findControl(c))
      {
        this.focus(c);
        if (g) return !1;
        c = b
      }
    }
    else if (this.needsFocus(c))
    {
      if (100 < a.timeStamp - b || e && window.top !== window && "input" === d) return this.targetElement = null, !1;
      this.focus(c);
      this.sendClick(c, a);
      e && "select" === d || (this.targetElement = null, a.preventDefault());
      return !1
    }
    if (e && !k && (b = c.fastClickScrollParent) && b.fastClickLastScrollTop !== b.scrollTop) return !0;
    this.needsClick(c) || (a.preventDefault(), this.sendClick(c, a));
    return !1
  };
  c.prototype.onTouchCancel = function()
  {
    this.trackingClick = !1;
    this.targetElement = null
  };
  c.prototype.onMouse = function(a)
  {
    return this.targetElement && !a.forwardedTouchEvent && a.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
  };
  c.prototype.onClick = function(a)
  {
    if (this.trackingClick) return this.targetElement = null, this.trackingClick = !1, !0;
    if ("submit" === a.target.type && 0 === a.detail) return !0;
    a = this.onMouse(a);
    a || (this.targetElement = null);
    return a
  };
  c.prototype.destroy = function()
  {
    var a = this.layer;
    g && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0));
    a.removeEventListener("click", this.onClick, !0);
    a.removeEventListener("touchstart", this.onTouchStart, !1);
    a.removeEventListener("touchmove", this.onTouchMove, !1);
    a.removeEventListener("touchend", this.onTouchEnd, !1);
    a.removeEventListener("touchcancel", this.onTouchCancel, !1)
  };
  c.notNeeded = function(a)
  {
    var b, c;
    if ("undefined" === typeof window.ontouchstart) return !0;
    if (c = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])
      if (g)
      {
        if ((b = document.querySelector("meta[name=viewport]")) && (-1 !== b.content.indexOf("user-scalable=no") || 31 < c && document.documentElement.scrollWidth <= window.outerWidth)) return !0
      }
    else return !0;
    return m && (b = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), 10 <= b[1] && 3 <= b[2] && (b = document.querySelector("meta[name=viewport]")) && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction || 27 <= +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] && (b = document.querySelector("meta[name=viewport]")) && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth) ? !0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction ? !0 : !1
  };
  c.attach = function(a, b)
  {
    return new c(a, b)
  };
  "function" === typeof define && "object" === typeof define.amd && define.amd ? define(function()
  {
    return c
  }) : "undefined" !== typeof module && module.exports ? (module.exports = c.attach, module.exports.FastClick = c) : window.FastClick = c
})();
