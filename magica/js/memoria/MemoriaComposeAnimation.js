define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaComposeAnimation.html".split(" "), function(d, e, a, f, c, g)
{
  var b, h = function()
  {
    c.startMemoriaAnimation(nativeJsonObj);
    window.isBrowser && (b = new(e.View.extend(
    {
      initialize: function(a)
      {
        this.template = d.template(g);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          href: "#/MemoriaCompose/" + a.composeMode
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide()
      }
    })))
  };
  return {
    fetch: function()
    {
      $(f).trigger("complete")
    },
    init: function()
    {
      $("#commandDiv").on("nativeCallback", function(b, d)
      {
        location.href = "#/MemoriaCompose/" + a.composeMode;
        c.setWebView()
      });
      h()
    },
    startCommand: function()
    {
      c.changeBg("web_black.jpg")
    },
    remove: function(a)
    {
      b && b.remove();
      a()
    }
  }
});
