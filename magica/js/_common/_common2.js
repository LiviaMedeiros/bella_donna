(function()
{
  function r(a)
  {
    b = e - a.changedTouches[0].clientX;
    d = f - a.changedTouches[0].clientY;
    b = 0 > b ? -b : b;
    d = 0 > d ? -d : d;
    g_move_span = 0 < d - b ? d : b
  }

  function m()
  {
    mediaPlayBgm();
    gMediaPlayer.stopVOICE();
    gMediaPlayer.stopSE();
    g_showStatusPanel = c.getElementById("statusPanelOpen") ? !0 : !1;
    c.getElementById("statusMenu") && (StatusFunc.statusApTimeStart(), gMediaPlayer.apRemain && gMediaPlayer.apRemain(c.getElementById("menuStatusApMaxTime").innerText));
    var a = c.getElementById("popup_common_menu");
    c.getElementById("globalHomeBtn");
    if (c.getElementById("common_menu_btn_wrap"))
    {
      menuGvgTimeSet();
      var b = c.getElementById("common_menu_marquee"),
        d = b.querySelectorAll(".marqueeList").length;
      0 == d && (b.style.display = "none");
      var e = c.getElementById("globalMenuCloseBtn"),
        l, f = c.getElementById("bannerWrap").querySelectorAll(".contentInner"),
        g = 0;
      c.getElementById("CardBasePage") && c.getElementById("EventBCBasePage") || c.getElementById("globalMenuBtn").addEventListener(cgti, function()
      {
        if (!isScrolled())
        {
          var k = c.createEvent("HTMLEvents");
          k.initEvent("globalMenuOpen", !0, !1);
          a.dispatchEvent(k);
          gMediaPlayer.playSE("se_kettei02");
          a.className = "show";
          clearTimeout(l);
          l = setTimeout(function()
          {
            e.style.pointerEvents = "auto"
          }, 100);
          0 != d && (b.className = "show_0");
          if (0 == g)
          {
            for (k = 0; k < f.length; k++) g += $(f[k]).height();
            400 <= g && (f[0].style.marginBottom = "10px")
          }
        }
      });
      e.addEventListener(cgti, function()
      {
        if (!isScrolled())
        {
          var b = c.createEvent("HTMLEvents");
          b.initEvent("globalMenuClose", !0, !1);
          a.dispatchEvent(b);
          gMediaPlayer.playSE("se_kettei02");
          a.className = "";
          h.openFlag = !1;
          global_other_link_btns.className = "";
          clearTimeout(l);
          l = setTimeout(function()
          {
            e.style.pointerEvents = "none"
          }, 100)
        }
      });
      var h = c.getElementById("popup_gMenuBtn");
      h.openFlag = !1;
      h.addEventListener(cgti, function()
      {
        isScrolled() || (gMediaPlayer.playSE("se_kettei02"), global_other_link_btns.className = this.openFlag ? "" : "show", this.openFlag = !this.openFlag)
      })
    }
  }
  g_production_flag && (console.log = function() {});
  var c = document;
  g_body = c.getElementsByTagName("body")[0];
  var b = 0,
    d = 0,
    e = 0,
    f = 0;
  c.addEventListener("touchstart", function(a)
  {
    g_move_span = 0;
    e = a.changedTouches[0].clientX;
    f = a.changedTouches[0].clientY;
    g_window_posY = c.body.scrollTop
  }, !0);
  ua.ios && c.addEventListener("touchmove", r, !0);
  c.addEventListener("touchend", function(a)
  {
    b = e - a.changedTouches[0].clientX;
    d = f - a.changedTouches[0].clientY;
    b = 0 > b ? -b : b;
    d = 0 > d ? -d : d;
    g_move_span = 0 < d - b ? d : b;
    a = (new Date).getTime();
    n = a - p;
    p = a
  }, !0);
  var p = 0,
    n = 0;
  c.getElementById("bannerAreaLinkStop");
  $(document).on(cgti, ".popupBtn", function(a)
  {
    a.preventDefault();
    if (g_move_span < g_move_span_limit)
    {
      var b = a.currentTarget.getAttribute("data-id");
      a = a.currentTarget.getAttribute("data-delay");
      var d = c.createEvent("HTMLEvents");
      d.initEvent(b, !0, !1);
      this.dispatchEvent(d);
      a ? (a = parseInt(a), setTimeout(function()
      {
        popupStart(b)
      }, a)) : popupStart(b)
    }
  });
  commonLocal ? commonLocal.ajaxLoadComp(m) : m();
  $(document).on("touchend", ".se_decide", function(a)
  {
    g_move_span < g_move_span_limit && gMediaPlayer.playSE("se_kettei01")
  });
  $(document).on("touchend", ".se_select", function(a)
  {
    g_move_span < g_move_span_limit && gMediaPlayer.playSE("se_kettei02")
  });
  $(document).on("touchend", ".se_ng", function(a)
  {
    g_move_span < g_move_span_limit && gMediaPlayer.playSE("sys_ng")
  });
  $(document).on("touchend", ".se_cancel", function(a)
  {
    g_move_span < g_move_span_limit && gMediaPlayer.playSE("se_cancel")
  });
  var g = !1; - 1 != navigator.userAgent.indexOf("OS 8_4_1") && (g = !0);
  $(document).on("touchstart", ".SARI", function(a)
  {
    g || $(this).addClass("hover")
  });
  $(document).on("touchend", ".SARI", function(a)
  {
    if (!g && ($(this).removeClass("hover"), ("A" == this.tagName || "BUTTON" == this.tagName || "INPUT" == this.tagName) && 500 > n)) return a.preventDefault(), !1
  });
  ua.ios && c.addEventListener("DOMContentLoaded", function()
  {
    setTimeout(scrollBy, 100, 0, 1)
  });
  var h = document.getElementsByClassName("CLB"),
    q = 0;
  if (h)
    for (i = 0; i < h.length; i++) h[i].addEventListener(cgti, function(a)
    {
      g_move_span > g_move_span_limit || 0 !== q || (q = 1, a = this.getAttribute("data-href").replace(/&amp;/g, "&"), location.href = a)
    })
})();
