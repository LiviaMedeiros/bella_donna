define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/parts/IconCharaGauge.html js/event/EventWitch/Utility".split(" "), function(d, f, h, k, l, g, m)
{
  return f.View.extend(
  {
    className: function()
    {
      var a = "IconCharaGaugeSec";
      this.model.charaId && (a += " charaId" + this.model.charaId);
      return a
    },
    events: function()
    {
      var a = {};
      a["webkitAnimationEnd .barR"] = this.nextAnime;
      a["webkitAnimationEnd .barL"] = this.nextAnime;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.rootView, "removeChildView", this.removeView);
      var c = a.appendSelector;
      this.pointType = "";
      a.pointType && (this.pointType = a.pointType);
      this.template = d.template(g);
      this.model = a.model;
      this.animeCount = 0;
      this.viewModel = this.createModel(
      {
        model: this.model
      });
      var b = ".charaId" + this.model.charaId;
      a = this.viewModel.beforeRatio;
      $(c).append(this.render().el);
      100 <= a && $(b + " .circle").addClass("max");
      setTimeout(function()
      {
        $(b + " .circle .barR").addClass("anime");
        $(b + " .circle .barL").addClass("anime")
      }, 1)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.viewModel
      }));
      return this
    },
    createModel: function(a)
    {
      var c = this,
        b = a.model;
      d.each(b.factorUpList, function(a, e, d)
      {
        c.pointType == a.type && (b.iconName = a.iconName)
      });
      return b
    },
    nextAnime: function()
    {
      var a = ".charaId" + this.model.charaId,
        c = this.viewModel.currentRatio,
        b = this.viewModel.beforeRatio;
      if (this.viewModel.pageType && "questResult" != this.viewModel.pageType) 100 <= c && $(a + " .circle").addClass("max");
      else
      {
        this.animeCount++;
        var d = function()
          {
            $(a + " .iconUPSec").addClass("anime")
          },
          e = function()
          {
            $(a + " .iconMaxSec").addClass("anime");
            $(a + " .circle").addClass("animeMax")
          };
        50 >= c ? 1 == this.animeCount && d() : 50 < c && 99 > c ? 50 > b ? 2 == this.animeCount && d() : 1 == this.animeCount && d() : 100 <= c && (50 > b ? 2 == this.animeCount && e() : 1 == this.animeCount && e())
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
