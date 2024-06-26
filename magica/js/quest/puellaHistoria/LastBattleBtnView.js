define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/LastBattleBtn.html js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(e, f, b, k, l, g, h)
{
  var c = !1;
  return f.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #toPuellaHistoriaLastBattleButton"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = e.template(g);
      this.pageJson = a.pageJson;
      this.btnModel = this.createModel(
      {
        commonStoryInfo: a.commonStoryInfo,
        CreateModel: a.CreateModel
      })
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
      b.isScrolled() || (c ? location.href = "#/PuellaHistoriaSingleRaid" : new b.PopupClass(
      {
        title: "Pillar of Tomorrow",
        content: "開放するための条件<br>「現代神浜編」を全てクリア",
        popupType: "typeC",
        closeBtnText: "閉じる",
        exClass: "puellaHistoriaOpenStoryPop"
      }, null, function()
      {
        $(".puellaHistoriaOpenStoryPop .cancelBtn").removeClass("b_white");
        $(".puellaHistoriaOpenStoryPop .cancelBtn").addClass("b_puellaHistoria")
      }, null))
    },
    createModel: function(a)
    {
      c = a.CreateModel.isCommonStoryLastAlreadyWatch(
      {
        commonStoryInfo: a.commonStoryInfo
      });
      a = h.getSingleRaidQuestInfo(
      {
        pageJson: this.pageJson
      });
      var d = {
        btnClass: "gray",
        countClass: "",
        noClearCount: 0
      };
      c && (d.btnClass = "");
      e.each(a.questInfoList, function(a, b, c)
      {
        a.cleared || (d.noClearCount++, d.countClass = "display")
      });
      return d
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
