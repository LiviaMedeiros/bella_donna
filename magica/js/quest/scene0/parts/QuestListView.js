define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/QuestList.html js/quest/scene0/Utility".split(" "), function(d, e, c, k, f, g, h)
{
  return e.View.extend(
  {
    tagName: "li",
    className: "scene0QuestListSecWrap",
    events: function()
    {
      var a = {};
      a[c.cgti] = this.tapList;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template(g);
      this.questInfo = a.questInfo;
      this.sectionInfo = a.sectionInfo;
      this.itemInfo = a.pageModel.itemInfo;
      this.listModel = this.createModel(
      {
        model: this.questInfo
      })
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.listModel
      }));
      return this
    },
    createModel: function(a)
    {
      a = a.model;
      var b = {
        status: "noClear",
        dayNum: 0,
        needItemNum: 0
      };
      a.cleared && (b.status = "cleared");
      b.dayNum = a.questBattle.sectionIndex;
      b.needItemNum = a.questBattle.needItemNum;
      return b
    },
    tapList: function(a)
    {
      a.preventDefault();
      if (!c.isScrolled())
      {
        f.startSe(1002);
        var b = this;
        "noClear" == b.listModel.status ? h.openStoryPopup(
        {
          needItemNum: b.listModel.needItemNum,
          itemInfo: b.itemInfo,
          callback: function()
          {
            b.startQuest()
          }
        }) : b.startQuest()
      }
    },
    startQuest: function()
    {
      c.questStoryOnlyModel = {
        sectionModel: this.sectionInfo,
        questBattleModel: this.questInfo.questBattle
      };
      location.href = "#/QuestStoryOnly"
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
