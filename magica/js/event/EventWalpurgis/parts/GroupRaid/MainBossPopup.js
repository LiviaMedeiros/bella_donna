define("underscore backbone backboneCommon ajaxControl command js/event/EventWalpurgis/Utility text!template/event/EventWalpurgis/MainBossPopup.html".split(" "), function(f, g, b, l, m, h, k)
{
  var c, e, d;
  return g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .decideBtn"] = this.questStart;
      a[b.cgti + " .useCheckSec #checkBox"] = this.tapCheckBox;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = f.template(k);
      this.model.checkBoxClass = "checkBox";
      100 > this.model.pageModel.bossUseItem.quantity && (this.model.checkBoxClass = "checkBoxOff");
      this.createDom()
    },
    render: function()
    {
      var a = this.model;
      this.$el.html(this.template(
      {
        model:
        {
          bossUseItem: a.pageModel.bossUseItem,
          questInfo: a.questInfo,
          checkBoxClass: a.checkBoxClass
        }
      }));
      return this
    },
    createDom: function()
    {
      var a = this;
      c = new b.PopupClass(
      {
        exClass: "MainBossPopup",
        popupType: "typeA",
        title: "BOSS",
        content: ""
      }, null, function()
      {
        $(".MainBossPopup .popupTextArea").append(a.render().el)
      }, null)
    },
    tapCheckBox: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || a.currentTarget.classList.contains("checkBoxOff") || (a.currentTarget.classList.contains("checked") ? b.removeClass(a.currentTarget, "checked") : b.addClass(a.currentTarget, "checked"))
    },
    questStart: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || (b.questSupportModel = null, this && (e = this.model, d = !1, (a = $(".useCheckSec .checkBox").attr("class")) && ~a.indexOf("checked") && (d = !0)), h.startQuest(
      {
        battleType: "main",
        isUseItem: d,
        questBattleModel: e.questInfo,
        sectionModel: b.EventWalpurgisRaidPrm.sectionInfo,
        userQuestAdventureList: b.EventWalpurgisRaidPrm.userQuestAdventureList
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
