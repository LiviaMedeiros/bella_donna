define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(e, h, a, k, d)
{
  function f(b)
  {
    if (b.currentTarget && b.currentTarget.classList.contains("touch") && (setTimeout(function()
      {
        a.removeClass(b.currentTarget, "touch")
      }, 0), ("A" == b.currentTarget.tagName || "BUTTON" == b.currentTarget.tagName || "INPUT" == b.currentTarget.tagName) && 500 > timeSpan)) return b.preventDefault(), !1
  }
  $(document).on(a.cgti, ".se_kettei02", function(b)
  {
    b.preventDefault();
    a.isScrolled() || d.startSe(1001)
  });
  $(document).on(a.cgti, ".se_decide", function(b)
  {
    b.preventDefault();
    a.isScrolled() || d.startSe(1002)
  });
  $(document).on(a.cgti, ".se_tabs", function(b)
  {
    b.preventDefault();
    a.isScrolled() || d.startSe(1008)
  });
  $(document).on(a.cgti, ".se_cancel", function(b)
  {
    b.preventDefault();
    a.isScrolled() || d.startSe(1003)
  });
  $(document).on(a.cgti, ".linkBtn", function(b)
  {
    a.tutorialId || a.disableLink || a.isScrolled() || a.isDoubleTouch() || (b.preventDefault(), this.getAttribute("data-href") && this.getAttribute("data-href").split("/")[1] == a.location || b.currentTarget.linkBtnFlg || (a.g_popup_instance && a.g_popup_instance.remove(), a.doc.querySelector("#sideMenu") && (a.doc.querySelector("#sideMenu").className = ""), a.tapBlock(!0), b.currentTarget.linkBtnFlg = !0, location.href = this.getAttribute("data-href")))
  });
  $(document).on("touchstart", ".btnOverlay", function(b)
  {
    a.addClass(b.currentTarget, "overlayOn")
  });
  $(document).on("touchcancel", ".btnOverlay", function(b)
  {
    a.removeClass(b.currentTarget, "overlayOn")
  });
  $(document).on(a.cgti, ".btnOverlay", function(b)
  {
    a.removeClass(b.currentTarget, "overlayOn")
  });
  $(document).on(a.cgti, ".imageZoom", function(b)
  {
    a.isScrolled() || (b.preventDefault(), a.imageZoomView(b))
  });
  $("#baseReceive").on("getBaseData", function(b, c)
  {
    $.extend(a.imgData, c);
    g()
  });
  var g = function()
  {
    e.each(a.imgData, function(b, c)
    {
      var d = a.doc.querySelectorAll("[data-nativeimgkey=" + c + "]");
      d && e.each(d, function(a)
      {
        a.dataset.nativeimgkey = "";
        a.src = "data:image/png;base64," + b
      });
      (c = a.doc.querySelectorAll("[data-nativebgkey=" + c + "]")) && e.each(c, function(a)
      {
        a.dataset.nativebgkey = "";
        a.style.backgroundImage = "url(data:image/png;base64," + b + ")"
      })
    })
  };
  $(document).on("touchstart", ".TE", function(b)
  {
    b.currentTarget.classList.contains("off") || b.currentTarget.classList.contains("current") || b.currentTarget.classList.contains("selected") || a.addClass(b.currentTarget, "touch")
  });
  $(document).on("touchmove", ".TE", f);
  $(document).on("touchend", ".TE", f);
  $(document).on("touchstart", "body", function(b)
  {
    if (!a.tapEffectStop)
    {
      b = b.originalEvent.changedTouches[0];
      var c = {
        x: b.pageX,
        y: b.pageY
      };
      a.tapTimer = setTimeout(function()
      {
        a.effectView && (a.effectView.removeView(), a.effectView = null);
        a.effectView = new a.EffectView(
        {
          model: c
        });
        a.doc.body.appendChild(a.effectView.render().el);
        a.tapTimer = null
      }, 100)
    }
  });
  $(document).on("touchmove", "body", function(b)
  {
    a.tapTimer && (clearTimeout(a.tapTimer), a.tapTimer = null)
  })
});
