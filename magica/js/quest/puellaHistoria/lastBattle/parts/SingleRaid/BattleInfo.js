define("underscore backbone backboneCommon ajaxControl command js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(e, g, b, l, h, k)
{
  var c;
  return g.View.extend(
  {
    className: "battleInfoWrapperSec",
    events: function()
    {
      var a = {};
      a["animationend #battleInfoSec"] = this.removeBattleInfo;
      a[b.cgti + " .battleBtn"] = this.questStart;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = e.template($("#tempBattleInfo").text());
      this.createDom()
    },
    render: function()
    {
      var a = this.model;
      a.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      a.chestColor = "bronze_close";
      a.questBattle.missionRewardCode && (a.missionRewardCode = b.itemSet(a.questBattle.missionRewardCode), a.chestColor = a.missionRewardCode.chestColor);
      this.$el.html(this.template(
      {
        model: a,
        userName: b.storage.user.get("loginName")
      }));
      return this
    },
    createDom: function()
    {
      b.doc.getElementById("mainSec").appendChild(this.render().el);
      h.getBaseData(b.getNativeObj())
    },
    questStart: function(a)
    {
      a && a.preventDefault();
      if (!b.isScrolled())
      {
        var d;
        this && (c = d = this.model);
        c && (d = c);
        a = b.PuellaHistoriaLastBattleSingleRaidPrm.sectionInfo;
        var f = a[0];
        e.each(a, function(a, b, c)
        {
          a.sectionId == d.questBattle.sectionId && (f = a)
        });
        k.startQuest(
        {
          pageType: "singleRaid",
          questBattleModel: d,
          sectionModel: f,
          userQuestAdventureList: b.PuellaHistoriaLastBattleSingleRaidPrm.userQuestAdventureList
        })
      }
    },
    removeBattleInfo: function()
    {
      -1 != $("#mainSec #battleInfoSec").attr("class").indexOf("hide") && $("#mainSec .battleInfoWrapperSec").remove()
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
