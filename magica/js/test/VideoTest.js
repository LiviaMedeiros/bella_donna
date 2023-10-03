define("underscore backbone backboneCommon ajaxControl command text!../../template/test/VideoTest.html".split(" "), function(e, f, a, c, b, g)
{
  var d, h = function()
  {
    d = new(f.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = e.template(g);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(c.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.setGlobalView();
        b.getBaseData(a.getNativeObj());
        a.ready.hide()
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
    fetch: function(a, b)
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      h()
    },
    startCommand: function()
    {
      b.changeBg("web_0011.ExportJson")
    },
    remove: function(a)
    {
      d.removeView();
      a()
    }
  }
});
