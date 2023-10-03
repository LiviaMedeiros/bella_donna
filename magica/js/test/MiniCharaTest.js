define("underscore backbone backboneCommon ajaxControl command text!template/test/MiniCharaTest.html".split(" "), function(g, h, a, d, e, k)
{
  var f, l = function()
  {
    f = new(h.View.extend(
    {
      initialize: function(a)
      {
        this.template = g.template(k);
        this.createDom()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .btn"] = this.miniCharaShow;
        return b
      },
      render: function()
      {
        console.log("render", d.getPageJson());
        this.$el.html(this.template(d.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.setGlobalView(
        {});
        a.content.append(this.render().el);
        a.ready.hide()
      },
      miniCharaShow: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && a.doc.querySelector("input").value)
        {
          b = a.doc.querySelector("input").value;
          var c = {};
          c.id = b;
          c.x = 700;
          c.y = 1024 === a.displayWidth ? 135 * Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2) + 175;
          c.fade = .3;
          e.hideMiniChara();
          e.showMiniChara(c)
        }
      }
    }))
  };
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
    }],
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      l()
    },
    remove: function(a)
    {
      e.hideMiniChara();
      f && f.remove();
      a()
    }
  }
});
