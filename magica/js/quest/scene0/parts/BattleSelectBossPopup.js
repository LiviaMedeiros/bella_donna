define("underscore backbone backboneCommon ajaxControl command QuestUtil js/quest/scene0/Utility text!template/quest/scene0/BattleSelectBossPopup.html js/_common/ItemImgView".split(" "), function(d, e, b, m, f, g, h, k, l)
{
  var c;
  return e.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .decideBtn"] = this.questStart;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = d.template(k);
      this.createDom()
    },
    render: function()
    {
      var a = this.model;
      a.questInfo.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      a.questInfo.chestColor = "bronze_close";
      a.questInfo.questBattle.missionRewardCode && (a.questInfo.missionRewardCode = b.itemSet(a.questInfo.questBattle.missionRewardCode), a.questInfo.chestColor = a.questInfo.missionRewardCode.chestColor);
      this.$el.html(this.template(
      {
        model: a
      }));
      return this
    },
    createDom: function()
    {
      var a = this;
      c = new b.PopupClass(
      {
        exClass: "scene0BattleSelectBossPopup",
        popupType: "typeA",
        title: " ",
        content: ""
      }, null, function()
      {
        $(".scene0BattleSelectBossPopup .popupTextArea").append(a.render().el);
        $(".scene0BattleSelectBossPopup .popupTitle").append(a.createTitle());
        a.setRewardItem(
        {
          addSelector: ".scene0BattleSelectBossPopup .rewardItemList"
        });
        f.getBaseData(b.getNativeObj())
      }, null)
    },
    createTitle: function()
    {
      return '<span class="badgeDifficultyLevel level' + this.model.difficultyLevel + '"></span><span class="battleTitle battle' + this.model.id + '"></span>'
    },
    setRewardItem: function(a)
    {
      var b = a.addSelector;
      a = g.dropItemJson(this.model.questInfo);
      d.each(a.itemSetList, function(a, c, d)
      {
        a.id = c;
        a = new l(
        {
          model: a
        });
        $(b).append(a.render().el)
      })
    },
    questStart: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || (b.questSupportModel = null, h.startQuest(
      {
        questBattleModel: this.model.questInfo,
        sectionModel: this.model.sectionInfo,
        userQuestAdventureList: this.model.userQuestAdventureList
      }))
    },
    removeView: function()
    {
      c && c.remove();
      this.off();
      this.remove()
    }
  })
});
