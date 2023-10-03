define("underscore backbone backboneCommon ajaxControl command text!../../template/test/ScrollTest.html js/view/memoria/UserMemoriaListPartsView memoriaUtil".split(" "), function(f, g, a, d, c, h, l, m)
{
  var e, k = function()
  {
    e = new(g.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .forceScroll"] = this.forceScroll;
        return b
      },
      initialize: function(a)
      {
        this.template = f.template(h);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.scrollSet("scrollTest1", "scrollWrap");
        a.forceScrollPreset("scrollTest1", "scrollWrap", "#/fourth", !0);
        a.setGlobalView();
        c.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      forceScroll: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.forceScroll("scrollTest1", "scrollWrap", b.currentTarget.dataset.targetHash)
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
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
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    }],
    fetch: function(a, c)
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      k()
    },
    startCommand: function()
    {
      c.changeBg("web_0011.ExportJson")
    },
    remove: function(a)
    {
      e.removeView();
      a()
    }
  }
});
