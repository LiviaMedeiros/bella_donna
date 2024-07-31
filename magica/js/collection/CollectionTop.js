define("underscore backbone backboneCommon ajaxControl command text!template/collection/CollectionTop.html text!css/collection/CollectionTop.css".split(" "), function(f, l, b, g, d, m, n)
{
  var k = {},
    h, p = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti] = this.touch;
        a[b.cgti + " #globalBackBtn"] = this.tapGlobalBackBtn;
        return a
      },
      tapGlobalBackBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/TopPage")
      },
      initialize: function(a)
      {
        this.template = f.template(m);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(g.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.ready.hide()
      }
    });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userCharaList"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      k = g.getPageJson();
      b.setStyle(n);
      h = new p;
      var a = k.userCharaList,
        e = a[Math.floor(Math.random() * a.length)],
        a = e.chara.doubleUnitFlg,
        f = e.chara.doubleUnitLive2dDetail,
        e = e.charaId + "00";
      d.endL2d();
      var c = {};
      c.id = e;
      c.x = a ? 480 : 320;
      c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
      a && (c.subId = f, c.subX = -100, c.subY = 0);
      c.type = 1;
      c.key = "idle";
      d.startL2d(c);
      b.historyArr = ["TopPage"]
    },
    remove: function(a)
    {
      h && h.remove();
      a()
    },
    startCommand: function()
    {
      d.changeBg("web_0015.ExportJson");
      d.startBgm("bgm02_anime11")
    },
    removeCommand: function()
    {
      d.endL2d()
    }
  }
});
