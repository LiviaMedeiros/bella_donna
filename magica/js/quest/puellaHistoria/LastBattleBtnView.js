define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/LastBattleBtn.html js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(c, d, b, f, g, e, h)
{
  return d.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #toPuellaHistoriaLastBattleButton"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = c.template(e);
      this.pageJson = a.pageJson;
      this.btnModel = this.createModel()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.btnModel
      }));
      return this
    },
    tapBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || new b.PopupClass(
      {
        title: "Pillar of Tomorrow",
        content: "クエストは後日開放となります",
        popupType: "typeC",
        closeBtnText: "閉じる",
        exClass: "puellaHistoriaOpenStoryPop"
      }, null, function()
      {
        $(".puellaHistoriaOpenStoryPop .cancelBtn").removeClass("b_white");
        $(".puellaHistoriaOpenStoryPop .cancelBtn").addClass("b_puellaHistoria")
      }, null)
    },
    createModel: function()
    {
      return {}
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
