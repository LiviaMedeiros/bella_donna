define("underscore backbone backboneCommon ajaxControl text!template/terms/Terms.html text!css/terms/Terms.css".split(" "), function(c, d, a, b, e, f)
{
  var g = function()
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
      g()
    },
    remove: function(a)
    {
      $("#mainContent").empty();
      a()
    }
  }
});
