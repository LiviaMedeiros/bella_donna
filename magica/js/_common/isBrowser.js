define("underscore backbone backboneCommon ajaxControl command text!css/test/isBrowser.css".split(" "), function(d, e, f, m, k, g, n)
{
  window.app_ver = "TEST_BROWSER";
  e = document.createElement("style");
  e.type = "text/css";
  e.innerHTML = g;
  document.getElementsByTagName("head").item(0).appendChild(e);
  if (localStorage.getItem("motoya"))
  {
    g = [];
    var h = document.styleSheets.item(1);
    g.push("@font-face {font-family: 'motoya'; src: url('data:font/ttf;base64," + String(localStorage.getItem("motoya")) + "');}");
    d.each(g, function(b, a, c)
    {
      h.insertRule(b, h.cssRules.length)
    })
  }
  if (location.href.match("file://") || location.href.match("http://localhost:5963") || location.href.match("http://localhost:5963")) window.isLocal = !0, window.app_ver = "TEST_LOCAL_FILE", require(["text!css/test/isLocal.css"], function(b)
  {
    var a = document.createElement("style");
    a.type = "text/css";
    a.innerHTML = b;
    document.getElementsByTagName("head").item(0).appendChild(a)
  });
  k.sendCommand = function(b)
  {
    var a = String(b);
    if (-1 != a.indexOf("QuestStub")) console.log("debug:command: " + a + "\nクエストスタブページへ遷移します。"), location.href = "#/QuestStub";
    else if (-1 != a.indexOf("ArenaStub")) console.log("debug:command: " + a + "\nアリーナスタブページへ遷移します。"), location.href = "#/ArenaStub";
    else if (-1 != a.indexOf("EventArenaMissionStub")) console.log("debug:command: " + a + "\nイベントアリーナスタブページへ遷移します。"), location.href = "#/EventArenaMissionStub";
    else if ("60" == a.split(",")[0])
    {
      var c = JSON.parse(b.substr(3));
      d.each(c, function(a, b)
      {
        c[b] = "/magica/" + a
      });
      $("#baseReceive").trigger("getBaseDataBrowser", c)
    }
    else a.split(","), "241" == a.split(",")[0] && $("#commandDiv").trigger("nativeCallback"), "320" == a.split(",")[0] && $("#commandDiv").trigger("nativeCallback"), "99" == a.split(",")[0] ? console.log("native:command: 99 json続く") : "98" == a.split(",")[0] ? console.log("native:command: 98 json続く") : console.log("native:command: " + a)
  };
  $("#baseReceive").on("getBaseDataBrowser", function(b, a)
  {
    $.extend(f.imgData, a);
    l()
  });
  var l = function()
  {
    d.each(f.imgData, function(b, a)
    {
      var c = f.doc.querySelectorAll("[data-nativeimgkey=" + a + "]");
      c && d.each(c, function(a)
      {
        a.dataset.nativeimgkey = "";
        a.src = b
      });
      (a = f.doc.querySelectorAll("[data-nativebgkey=" + a + "]")) && d.each(a, function(a)
      {
        a.dataset.nativebgkey = "";
        a.style.backgroundImage = "url(" + b + ")"
      })
    })
  }
});
