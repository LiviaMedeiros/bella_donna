define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/parts/TopCharaList.html js/event/EventWitch/Model js/event/EventWitch/Utility js/event/EventWitch/parts/IconCharaGauge".split(" "), function(e, d, c, k, f, g, l, m, h)
{
  return d.View.extend(
  {
    className: function()
    {
      return "CharaListSec"
    },
    events: function()
    {
      var a = {};
      a[c.cgti + " #ToExchangeTopBtn"] = this.tapToExchangeTopBtn;
      a[c.cgti + " #ToBoxGachaTopBtn"] = this.tapToBoxGachaTopBtn;
      return a
    },
    initialize: function(a)
    {
      var b = this,
        d = a.appendSelector;
      b.template = e.template(g);
      b.model = a.model;
      b._views = a._views;
      b.viewModel = b.createModel(
      {
        model: b.model
      });
      b.viewModel.subItemInfo || (b.viewModel.subItemInfo = {
        quantity: 0
      });
      $(d).append(b.render().el);
      setTimeout(function()
      {
        e.each(b.viewModel.eventCharaInfo, function(a, c, d)
        {
          b._views["TopIconCharaGauge" + c] = new h(
          {
            model: a,
            appendSelector: "#CharaListMain"
          })
        });
        f.getBaseData(c.getNativeObj())
      }, 10)
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
      a = a.model;
      a.listClass = "";
      a.eventCharaInfo && a.eventCharaInfo.length && 7 == a.eventCharaInfo.length && (a.listClass = "chara7");
      return a
    },
    tapToExchangeTopBtn: function(a)
    {
      a.preventDefault();
      c.isScrolled() || (location.href = "#/EventWitchExchangePage")
    },
    tapToBoxGachaTopBtn: function(a)
    {
      a.preventDefault();
      c.isScrolled() || (location.href = "#/CampaignBoxGachaTop")
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
