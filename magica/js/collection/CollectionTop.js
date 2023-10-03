define("underscore backbone backboneCommon ajaxControl command text!template/collection/CollectionTop.html text!css/collection/CollectionTop.css".split(" "), function(f, l, c, g, d, m, n)
{
  var k = {},
    h, p = l.View.extend(
    {
      initialize: function(b)
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
        c.setGlobalView();
        c.content.append(this.render().el);
        c.ready.hide()
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      k = g.getPageJson();
      c.setStyle(n);
      h = new p;
      var b = k.userCharaList,
        e = b[Math.floor(Math.random() * b.length)],
        b = e.chara.doubleUnitFlg,
        f = e.chara.doubleUnitLive2dDetail,
        e = e.charaId + "00";
      d.endL2d();
      var a = {};
      a.id = e;
      a.x = b ? 480 : 320;
      a.y = 1024 === c.displayWidth ? Math.floor(c.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(c.shortSize / 2);
      b && (a.subId = f, a.subX = -100, a.subY = 0);
      a.type = 1;
      a.key = "idle";
      d.startL2d(a)
    },
    remove: function(b)
    {
      h && h.remove();
      b()
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
