define("underscore backbone backboneCommon ajaxControl command js/quest/scene0/Utility text!template/quest/scene0/BattleSelectChangeDifficultyLevelPopup.html".split(" "), function(d, e, b, f, k, l, g)
{
  var c;
  f = e.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = d.template(g);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model:
        {
          currentLevel: $("#QuestMainSec").attr("class")
        }
      }));
      return this
    },
    createDom: function()
    {
      var a = this;
      c = new b.PopupClass(
      {
        exClass: "scene0BattleSelectChangeDifficultyLevelPopup",
        popupType: "typeC",
        title: " ",
        content: ""
      }, null, function()
      {
        $(".scene0BattleSelectChangeDifficultyLevelPopup .popupTextArea").append(a.render().el);
        d.each([
        {
          btnId: 1,
          btnText: "困難級"
        },
        {
          btnId: 2,
          btnText: "窮地級"
        },
        {
          btnId: 3,
          btnText: "絶望級"
        }], function(a, b, c)
        {
          a = new h(
          {
            model: a
          });
          $(".scene0BattleSelectChangeDifficultyLevelPopup .popupTextArea #btnList").append(a.render().el)
        });
        $(".scene0BattleSelectChangeDifficultyLevelPopup .popupTitle").append(a.createTitle())
      }, null)
    },
    createTitle: function()
    {
      return '<span class="titleImg"></span>'
    },
    removeView: function()
    {
      c && c.remove();
      this.off();
      this.remove()
    }
  });
  var h = e.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .changeBtn"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template($("#tempDifficultyLevelBtn").text());
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
      return a.model
    },
    tapBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = a.currentTarget.dataset.id, $("#QuestMainSec").attr("class", "level" + a), b.scene0BattleDifficultyLevel = "level" + a, c.remove())
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  return f
});
