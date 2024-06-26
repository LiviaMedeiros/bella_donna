define("underscore backbone backboneCommon ajaxControl command text!template/gacha/GachaAnimation.html".split(" "), function(f, g, a, e, b, h)
{
  var c, k = function()
  {
    a.gachaResultJson.tips = {
      type: 2
    };
    setTimeout(function()
    {
      $("#commandDiv").on("nativeCallback", function(d, b)
      {
        if ("GachaResult" === b)
          if ($("#commandDiv").off(), a.tutorialId) a.tutorialUtil[a.tutorialId]();
          else location.href = "#/GachaResult"
      });
      b.setWebView(!1);
      b.startGachaAnimation(a.gachaResultJson)
    }, 500);
    window.isBrowser && (c = new(g.View.extend(
    {
      initialize: function(a)
      {
        this.template = f.template(h);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(e.getPageJson()));
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
    fetch: function(d)
    {
      if (d)
        if (a.tutorialId = d, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId), a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          b.nativeReload("#/TopPage");
          return
        } $(e).trigger("complete")
    },
    init: function()
    {
      k()
    },
    startCommand: function()
    {
      b.changeBg("web_black.jpg")
    },
    remove: function(a)
    {
      c && c.remove();
      a()
    }
  }
});
