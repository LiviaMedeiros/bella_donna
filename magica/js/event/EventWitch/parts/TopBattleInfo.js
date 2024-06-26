define("underscore backbone backboneCommon ajaxControl command js/event/EventWitch/Utility".split(" "), function(e, g, b, l, h, k)
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
      this.factorItemIdList = a.factorItemIdList;
      this.createModel();
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
    createModel: function()
    {
      var a = this.model;
      a.battleText = "";
      var b = {
        1: "Ⅰ",
        2: "Ⅱ",
        3: "Ⅲ",
        4: "Ⅳ",
        5: "Ⅴ"
      };
      "sub_item" == a.pointType ? a.battleText = "可能性の因子" + b[a.questBattle.sectionIndex] : "challenge" == a.pointType ? a.battleText = "チャレンジ" + b[a.questBattle.sectionIndex] : "eyesight" == a.pointType ? a.battleText = "目にした嘆き" : "hearing" == a.pointType ? a.battleText = "耳にした驚き" : "smell" == a.pointType ? a.battleText = "臭った諦め" : "taste" == a.pointType ? a.battleText = "味わった苦しみ" : "touch" == a.pointType && (a.battleText = "触れた悲しみ")
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
        a = b.EventWitchPrm.sectionInfo;
        var f = a[0];
        e.each(a, function(a, b, c)
        {
          a.sectionId == d.questBattle.sectionId && (f = a)
        });
        k.startQuest(
        {
          questBattleModel: d,
          sectionModel: f,
          userQuestAdventureList: b.EventWitchPrm.userQuestAdventureList,
          factorItemIdList: this.factorItemIdList
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
