(function()
{
  var m = location.href.match("192.168.") ? !0 : !1,
    h = {
      BGM: "magica-bgm-volume",
      ENV: "magica-env-volume",
      SE: "magica-se-volume",
      VOICE: "magica-voice-volume"
    },
    n = localStorage.getItem(h.BGM) || .05,
    p = localStorage.getItem(h.ENV) || .05,
    q = localStorage.getItem(h.SE) || .05,
    r = localStorage.getItem(h.VOICE) || .05,
    t = [
      ["HeiSeiGothic", "DFP-HeiSeiGothic-W7.ttf"],
      ["DFHSGothic", "DFP-HeiSeiGothic-W7.ttf"],
      ["BANGLENO", "BANGLENO.TTF"],
      ["BangleNormal", "BANGLENO.TTF"]
    ],
    l = !1,
    c = null,
    d = null,
    e = null;
  document.addEventListener("DOMContentLoaded", function()
  {
    function b(b)
    {
      $.ajax(
      {
        url: b.getAttribute("data-panel-path"),
        dataType: "html",
        cache: !1
      }).error(function(b)
      {
        console.error("load error on ajax: " + b)
      }).success(function(a)
      {
        var e = "";
        a.replace(/<wicket:panel>([\s\S]*)<\/wicket:panel>/, function(b, a)
        {
          e = a
        });
        b.innerHTML = e;
        d++;
        a = b.getElementsByTagName("script");
        for (var f = [], g = 0; g < a.length; g++)
          if (a[g].innerHTML) eval(a[g].innerHTML);
          else
          {
            f.push(document.createElement("script"));
            var k = f.length - 1;
            f[k].src = a[g].src;
            f[k].setAttribute("loadedOrder", k);
            f[g].onload = function(a)
            {
              a = parseInt(this.getAttribute("loadedOrder")) + 1;
              f.length > a ? document.getElementsByTagName("body")[0].appendChild(f[a]) : f.length == a && (a = document.createEvent("HTMLEvents"), a.initEvent("localAjaxPanelLoadFinish", !0, !1), document.dispatchEvent(a))
            };
            f[g].onerror = function(a)
            {
              console.error("js load error:" + this)
            };
            f[0] && document.getElementsByTagName("body")[0].appendChild(f[0])
          }
        "head_foot" != b.id || ua.android || $("#common_foot li:first").before('<li id="common_foot_back_link_wrap" class="SARI se_decide"><span id="foot_back_link"></span></li>');
        d == c.length && (l = !0)
      })
    }
    window.scrollTo(0, 1);
    var a = document.createElement("style");
    a.disable = !1;
    t.forEach(function(b)
    {
      a.innerHTML += spf('@font-face {\n\tfont-family: "%s";\n\tsrc: url("/magica/resource/image_web/font/%s");\n}\n', b[0], b[1])
    });
    $("head").append(a);
    var c = Array.prototype.slice.call(document.getElementsByClassName("panel"));
    if (0 == c.length) return l = !0, !1;
    var d = 0;
    c.forEach(function(a)
    {
      b(a)
    })
  }, !1);
  window.commonLocal = {
    DEFAULT_VOLUME: .05,
    VOLUME_KEY: h,
    ajaxLoadComp: function(b)
    {
      l ? b() : setTimeout(arguments.callee, 0, b)
    },
    audio: function(b)
    {
      a: if (!m)
      {
        var a = b.split("_")[0];
        b = b.split(a + "_")[1];
        var k = "ENV" == a ? "SE" : a;
        if ("STOP" == b) switch (a)
        {
          case "BGM":
            c && (c.pause(), c = null);
            break;
          case "ENV":
            d && (d.pause(), d = null);
            break;
          case "VOICE":
            e && (e.pause(), e = null)
        }
        else
        {
          switch (a)
          {
            case "BGM":
            case "ENV":
            case "SE":
            case "VOICE":
              break;
            default:
              break a
          }
          b = spf("/magica/resource/audio/%s/%s.mp3", k, b);
          switch (a)
          {
            case "BGM":
              c && (c.pause(), c = null);
              c = new Audio(b);
              c.volume = n;
              c.loop = !0;
              c.play();
              break;
            case "ENV":
              d && (d.pause(), d = null);
              d = new Audio(b);
              d.volume = p;
              d.loop = !0;
              d.play();
              break;
            case "SE":
              a = new Audio(b);
              a.volume = q;
              a.play();
              break;
            case "VOICE":
              e && (e.pause(), e = null), e = new Audio(b), e.volume = r, e.play()
          }
        }
      }
    },
    query: function(b)
    {
      if (!location.search) return null;
      var a = null;
      location.search.substr(1).split("&").forEach(function(c)
      {
        c = c.split("=");
        c[0] == b && (a = c[1])
      });
      return a
    }
  }
})();
