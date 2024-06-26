define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/SideStoryQuestBtn.html js/quest/scene0/Utility".split(" "), function(d, e, c, g, h, f, k)
{
  return e.View.extend(
  {
    className: "storyBtnWrap",
    events: function()
    {
      var a = {};
      a[c.cgti] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template(f);
      this.model = a.model;
      this.viewModel = this.createModel(
      {
        model: this.model
      })
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.viewModel
      }));
      return this
    },
    createModel: function(a)
    {
      var b = a.model;
      b.btnId = "SideStoryBtn" + b.id;
      b.btnText = function()
      {
        var a = b.id;
        b.isClear || (a = "？？");
        return a
      }();
      var c = {
        1: "chara_1",
        2: "chara_2",
        3: "chara_3",
        4: "chara_4",
        5: "chara_5",
        6: "chara_6"
      };
      b.btnClass = function()
      {
        var a = "";
        b.charaId && (a += " " + c[b.charaId]);
        b.isClear && (a += " finish TE se_decide");
        return a
      }();
      return b
    },
    tapBtn: function(a)
    {
      a.preventDefault();
      c.isScrolled() || this.viewModel.isClear && this.startQuest(
      {
        model: this.viewModel
      })
    },
    startQuest: function(a)
    {
      a = a.model;
      c.questStoryOnlyModel = {
        sectionModel: a.sectionInfo,
        questBattleModel: a.questInfo.questBattle
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
