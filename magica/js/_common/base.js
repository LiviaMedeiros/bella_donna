window.isDebug || (window.console.log = function() {});
window.onerror = function(a, e, f, l, b)
{
  if (!window.isBrowser)
  {
    var h = a + " " + e + ":" + f;
    require(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(a, b, d, e, c)
    {
      c.setWebView(!0);
      d.tapBlock(!1);
      d.loading.hide();
      d.doc.querySelector("#baseContainer").style.display = "none";
      d.androidKeyStop = !0;
      new d.PopupClass(
      {
        title: "エラー",
        popupId: "resultCodeError",
        content: "エラーが発生しました。トップページに遷移します。",
        decideBtnText: "トップページへ",
        canClose: !1
      }, null, function()
      {
        $("#resultCodeError .decideBtn").on(d.cgti, function(a)
        {
          $("#resultCodeError .decideBtn").off();
          c.nativeReload("#/TopPage")
        })
      });
      d && d.location && (h += " page:" + d.location);
      e.ajaxPlainPost(d.linkList.jsErrorSend, h, null)
    })
  }
};
window.app_ver = "";
window.webInitTime = "";
window.sendHostName = location.hostname;
var nativeJsonObj = {},
  nativeCallback = function(a)
  {
    console.log("nativeCallback:function:", a);
    $("#commandDiv").trigger("nativeCallback", a)
  },
  saveDataCallback = function(a)
  {
    $("#commandDiv").trigger("saveDataCallback", a)
  },
  appVersionGet = function(a)
  {
    window.app_ver = a
  },
  getBaseData = function(a)
  {
    $("#baseReceive").trigger("getBaseData", a)
  },
  fontDataGet = function(a)
  {
    var e = [],
      f = document.styleSheets.item(1);
    e.push("@font-face {font-family: 'motoya'; src: url('data:font/ttf;base64," + String(a.motoya) + "');}");
    e.push("@font-face {font-family: 'mbm'; src: url('data:font/ttf;base64," + String(a.mbm) + "');}");
    _.each(e, function(a, b, e)
    {
      f.insertRule(a, f.cssRules.length)
    })
  },
  purchaseCallback = function(a)
  {
    $("#commandDiv").trigger("purchaseCallback", a)
  },
  androidBackKey = function(a)
  {
    $("#androidBackKey").trigger("androidBackKey", a)
  },
  questRetire = function(a)
  {
    $("#questRetire").trigger("questRetire", a)
  },
  configCallback = function(a)
  {
    $("#configCallback").trigger("configCallback", a)
  },
  suspendAwake = function(a)
  {
    $("#suspendAwake").trigger("suspendAwake", a)
  },
  setDeviceInfo = function(a)
  {
    window.modelName = a.modelName;
    window.osVersion = a.osVersion;
    window.bootCount = a.bootCount
  };
require("jquery underscore backbone router backboneCommon ajaxControl command apiPathMapping searchPathMapping backboneCustom commonEvent".split(" "), function(a, e, f, l, b, h, g, m, d, n)
{
  if (!window.isBrowser || window.isDebug)
  {
    var c = document.body;
    c.scrollTop = 1;
    window.addEventListener("touchmove", function(a)
    {
      "range" !== a.target.type && (a.target === c && 0 !== c.scrollTop && c.scrollTop + c.clientHeight !== c.scrollHeight ? a.stopPropagation() : a.preventDefault())
    },
    {
      useCapture: !0,
      passive: !1
    });
    c.addEventListener("scroll", function(a)
    {
      0 === c.scrollTop ? c.scrollTop = 1 : c.scrollTop + c.clientHeight === c.scrollHeight && --c.scrollTop
    });
    a("#curtain").on(b.cgti, function() {});
    a = window.clientInformation.platform;
    var k = function()
    {
      if (!window.isBrowser || window.isDebug) window.isBrowser && window.isDebug && require(["isBrowser"]), window.isDebug && !window.g_token && g.getAccessToken(), g.getAppVersion(), g.getDeviceInfo("setDeviceInfo"), b.baseObj = {
        init: function()
        {
          new l;
          f.history.start();
          var a = window.parent.screen,
            c = a.height > a.width ? a.height : a.width,
            a = a.height > a.width ? a.width : a.height,
            d = a / c;
          b.scaleHeight = !1;
          b.displayWidth = 1024;
          b.longSize = c;
          b.shortSize = a;
          b.displayHeight = 0;
          window.app_ver.split(".").join("");
          b.ua.isIphoneXOrMore = !1;
          b.ua.ios ? b.addClass(b.doc.getElementsByTagName("body")[0], "ios") : b.addClass(b.doc.getElementsByTagName("body")[0], "android");
          b.ua.ios && .53 > d && (b.scaleHeight = !0, b.doc.getElementById("viewport").setAttribute("content", "width=1280, user-scalable=no"), b.displayWidth = 1280, c = b.scaleHeight ? 1.25 * window.innerHeight | 0 : window.innerHeight | 0, "" === b.doc.getElementsByTagName("html")[0].style.height && 0 !== c && (b.doc.getElementsByTagName("html")[0].style.height = c + "px", b.displayHeight = c), b.scaleHeight && b.doc.getElementById("baseContainer") && (c = (c - 36) / c, b.doc.getElementById("baseContainer").style.cssText += "-webkit-transform:scale(" + c + ");-webkit-transform-origin:0 0;left:-webkit-calc((100% - 1024px * " + c + ") / 2);overflow:visible;"), b.ua.isIphoneXOrMore = !0);
          g.getFontData()
        }
      }, m.pathSet(), d.pathSet()
    };
    "Win32" === a || "Win64" === a ? (window.isBrowser = !0, k()) : "MacIntel" === a ? (g.getSNS(), setTimeout(function()
    {
      window.g_sns ? b.ua.ios = !0 : window.isBrowser = !0;
      k()
    }, 500)) : (g.getSNS(), k())
  }
});
