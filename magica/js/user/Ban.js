define("underscore backbone backboneCommon ajaxControl text!template/user/Ban.html text!css/user/Ban.css command".split(" "), function(c, d, a, b, e, f, g)
{
  var h = function()
  {
    b.getPageJson();
    a.setStyle(f);
    new(d.View.extend(
    {
      initialize: function(a)
      {
        this.template = c.template(e);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(b.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        g.setWebView();
        a.globalMenuView && a.globalMenuView.removeView();
        a.ready.hide()
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
    }],
    fetch: function()
    {
      b.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      h()
    },
    remove: function(a)
    {
      $("#mainContent").empty();
      a()
    }
  }
});
