define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/CommonStoryBtn.html".split(" "), function(c, f, d, h, k, g)
{
  var e, b;
  return f.View.extend(
  {
    events: function()
    {
      var a = {};
      a[d.cgti + " #toPuellaHistoriaCommonStoryButton"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = c.template(g);
      b = a.commonStoryInfo;
      e = this.createModel(
      {
        commonStoryInfo: b
      })
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: e
      }));
      return this
    },
    tapBtn: function(a)
    {
      a.preventDefault();
      d.isScrolled() || (a = 101101, b.sectionInfoList.length && (a = b.sectionInfoList[b.sectionInfoList.length - 1].sectionId), location.href = "#/QuestBattleSelect/" + a)
    },
    createModel: function(a)
    {
      var b = {
        noClearCount: 0,
        countClass: ""
      };
      c.each(a.commonStoryInfo.questInfoList, function(a, c, d)
      {
        a.cleared || (b.noClearCount++, b.countClass = "display")
      });
      return b
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
