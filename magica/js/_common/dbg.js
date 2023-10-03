(function()
{
  function l(a)
  {
    if (!n)
    {
      var b = a.split("_")[0];
      a = a.split(b + "_")[1];
      var p = "ENV" == b ? "SE" : b;
      if ("STOP" == a) switch (b)
      {
        case "BGM":
          c && (c.pause(), c = null);
          break;
        case "ENV":
          f && (f.pause(), f = null);
          break;
        case "VOICE":
          g && (g.pause(), g = null)
      }
      else
      {
        switch (b)
        {
          case "BGM":
          case "ENV":
          case "SE":
          case "VOICE":
            break;
          default:
            return
        }
        a = spf("/magica/resource/audio/%s/%s.mp3", p, a);
        switch (b)
        {
          case "BGM":
            c && (c.pause(), c = null);
            c = new Audio(a);
            c.volume = q;
            c.loop = !0;
            c.play();
            break;
          case "ENV":
            f && (f.pause(), f = null);
            f = new Audio(a);
            f.volume = r;
            f.loop = !0;
            f.play();
            break;
          case "SE":
            b = new Audio(a);
            b.volume = t;
            b.play();
            break;
          case "VOICE":
            g && (g.pause(), g = null), g = new Audio(a), g.volume = u, g.play()
        }
      }
    }
  }
  var n = location.href.match("192.168.") ? !0 : !1,
    h = {
      BGM: "magica-bgm-volume",
      ENV: "magica-env-volume",
      SE: "magica-se-volume",
      VOICE: "magica-voice-volume"
    },
    q = localStorage.getItem(h.BGM) || .05,
    r = localStorage.getItem(h.ENV) || .05,
    t = localStorage.getItem(h.SE) || .05,
    u = localStorage.getItem(h.VOICE) || .05,
    v = [
      ["HeiSeiGothic", "DFP-HeiSeiGothic-W7.ttf"],
      ["DFHSGothic", "DFP-HeiSeiGothic-W7.ttf"],
      ["BANGLENO", "BANGLENO.TTF"],
      ["BangleNormal", "BANGLENO.TTF"]
    ],
    k = !1,
    c = null,
    f = null,
    g = null;
  document.addEventListener("DOMContentLoaded", function()
  {
    function a(a)
    {
      $.ajax(
      {
        url: a.getAttribute("data-panel-path"),
        dataType: "html",
        cache: !1
      }).error(function(a)
      {
        console.error("load error on ajax: " + a)
      }).success(function(b)
      {
        var m = "";
        b.replace(/<wicket:panel>([\s\S]*)<\/wicket:panel>/, function(a, b)
        {
          m = b
        });
        a.innerHTML = m;
        f++;
        b = a.getElementsByTagName("script");
        for (var d = [], e = 0; e < b.length; e++)
          if (b[e].innerHTML) eval(b[e].innerHTML);
          else
          {
            d.push(document.createElement("script"));
            var g = d.length - 1;
            d[g].src = b[e].src;
            d[g].setAttribute("loadedOrder", g);
            d[e].onload = function(a)
            {
              a = parseInt(this.getAttribute("loadedOrder")) + 1;
              d.length > a ? document.getElementsByTagName("body")[0].appendChild(d[a]) : d.length == a && (a = document.createEvent("HTMLEvents"), a.initEvent("localAjaxPanelLoadFinish", !0, !1), document.dispatchEvent(a))
            };
            d[e].onerror = function(a)
            {
              console.error("js load error:" + this)
            };
            d[0] && document.getElementsByTagName("body")[0].appendChild(d[0])
          }
        "head_foot" != a.id || ua.android || $("#common_foot li:first").before('<li id="common_foot_back_link_wrap" class="SARI se_decide"><span id="foot_back_link"></span></li>');
        f == c.length && (k = !0)
      })
    }(function()
    {
      function a(a, d, c, e)
      {
        b.innerHTML += ('<meta name="viewport" content="width=' + a + ",height=" + d + ",initial-scale=" + c + ",minimum-scale=" + c + ",maximum-scale=" + c + ",target-densitydpi=" + e + ',user-scalable=no" />\n').replace(",height=0", "").replace(",target-densitydpi=0", "")
      }
      if (!document.getElementsByName("viewport").length)
      {
        var b = document.getElementsByTagName("head")[0],
          c = document.getElementsByTagName("body")[0],
          d = SCREEN_WIDTH,
          e = SCREEN_HEIGHT;
        ua.ios ? (c.className += " ios", window.orientation ? ua.ipad ? a(d, e, .8, "medium-dpi") : 414 == screen.availWidth ? a(d, e, .575, "medium-dpi") : 375 == screen.availWidth ? a(d, e, .52, "medium-dpi") : a(d, e, .44, "medium-dpi") : a(d, e, 1, "medium-dpi")) : ua.android && (c.className += " android", 440 <= getAndroidOSVersion() ? (d = screen.availWidth, e = screen.availHeight, .5625 < e / d ? e = 9 * d / 16 : d = 16 * e / 9, a(d, e, d / SCREEN_WIDTH, "device-dpi")) : ua.isEluga ? a("device-width", 0, 1, 340) : a("device-width", 0, 1, "device-dpi"))
      }
    })();
    window.scrollTo(0, 1);
    var b = document.createElement("style");
    b.disable = !1;
    v.forEach(function(a)
    {
      b.innerHTML += spf('@font-face {\n\tfont-family: "%s";\n\tsrc: url("/magica/resource/image_web/font/%s");\n}\n', a[0], a[1])
    });
    $("head").append(b);
    var c = Array.prototype.slice.call(document.getElementsByClassName("panel"));
    if (0 == c.length) return k = !0, !1;
    var f = 0;
    c.forEach(function(b)
    {
      a(b)
    })
  }, !1);
  window.debug = {
    DEFAULT_VOLUME: .05,
    VOLUME_KEY: h,
    ajaxLoadComp: function(a)
    {
      k ? a() : setTimeout(arguments.callee, 0, a)
    },
    log: function(a)
    {
      l(a)
    },
    audio: function(a)
    {
      l(a)
    },
    query: function(a)
    {
      if (!location.search) return null;
      var b = null;
      location.search.substr(1).split("&").forEach(function(c)
      {
        c = c.split("=");
        c[0] == a && (b = c[1])
      });
      return b
    }
  }
})();
