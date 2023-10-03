define("underscore backbone backboneCommon ajaxControl command text!template/test/RealGachaAnimation.html".split(" "), function(e, f, c, d, a, g)
{
  var b, h = function()
  {
    setTimeout(function()
    {
      $("#commandDiv").on("nativeCallback", function(k, a)
      {
        "GachaResult" === a && ($("#commandDiv").off(), location.href = "#/RealGachaResult")
      });
      a.setWebView(!1);
      a.startGachaAnimation(nativeJsonObj)
    }, 500);
    window.isBrowser && (b = new(f.View.extend(
    {
      initialize: function(a)
      {
        this.template = e.template(g);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d.getPageJson()));
        return this
      },
      createDom: function()
      {
        c.content.append(this.render().el);
        c.ready.hide()
      }
    })))
  };
  return {
    fetch: function(a)
    {
      $(d).trigger("complete")
    },
    init: function()
    {
      h()
    },
    startCommand: function()
    {
      a.changeBg("web_black.jpg")
    },
    remove: function(a)
    {
      b && b.remove();
      a()
    }
  }
});
