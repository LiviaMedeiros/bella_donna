define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/ClearMovieBgHide.html".split(" "), function(b, c, a, e, f, d)
{
  return c.View.extend(
  {
    className: "puellaFadeAreaView",
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = b.template(d)
    },
    render: function()
    {
      this.$el.html(this.template(
      {}));
      this.changeBtn(
      {
        isPlayMovie: !0
      });
      a.forceTapBlock(
      {
        isBlock: !0
      });
      return this
    },
    changeBtn: function(a)
    {
      a.isPlayMovie ? $("#toPuellaHistoriaCommonStoryButton").addClass("gray") : $("#toPuellaHistoriaCommonStoryButton").removeClass("gray")
    },
    removeView: function()
    {
      this.changeBtn(
      {
        isPlayMovie: !1
      });
      a.forceTapBlock(
      {
        isBlock: !1
      });
      this.off();
      this.remove()
    }
  })
});
