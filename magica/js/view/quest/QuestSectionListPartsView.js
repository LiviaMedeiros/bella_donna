define(["underscore", "backbone", "backboneCommon", "ajaxControl"], function(d, c, a, f)
{
  c.Model.extend();
  return c.View.extend(
  {
    tagName: "li",
    className: function()
    {
      var b = "section";
      this.model.canPlay ? b += " se_decide" : (b += " off", 103305 == this.model.sectionId && "NORMAL" == a.mainQuestMode && (b += " noChallenge"));
      return b
    },
    events: function()
    {
      var b = {};
      b[a.cgti] = this.sceneChange;
      return b
    },
    initialize: function(b)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.parentView, "modeToggle", this.removeView);
      this.parentView.el.classList.contains("open") && a.addClass(this.el, "scrollElm")
    },
    render: function()
    {
      this.model.sectionState = "comp";
      var b = this;
      this.model.section.questBattleCount = 0;
      d.each(this.model.section.questBattleList, function(a)
      {
        var c = "CLEARED" === a.missionStatus2 ? "cleared" : null,
          d = "CLEARED" === a.missionStatus3 ? "cleared" : null,
          e = a.cleared ? "clear" : "new";
        a.questState = "CLEARED" === a.missionStatus1 && c && d ? "comp" : e;
        "clear" === a.questState && (b.model.sectionState = "clear");
        "new" === a.questState && (b.model.sectionState = "new");
        b.model.section.questBattleCount++
      });
      this.$el.html(this.template(
      {
        model: this.model
      }));
      a.addClass(this.el, this.model.sectionState);
      103305 == this.model.sectionId && "NORMAL" == a.mainQuestMode && (this.model.cleared ? a.addClass(this.el, "noChallenge") : a.addClass(this.el, "secondPartLastQuest"));
      return this
    },
    sceneChange: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
        if (a.tutorialId) a.tutorialUtil[a.tutorialId]();
        else 103305 == this.model.sectionId && "NORMAL" == a.mainQuestMode ? this.model.cleared ? new a.PopupClass(
        {
          content: "このストーリーは再挑戦できません。",
          closeBtnText: "OK",
          popupType: "typeC"
        }, null, null) : location.href = "#/SecondPartLastRouter" : location.href = "#/QuestBattleSelect/" + this.model.sectionId
    },
    removeView: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
