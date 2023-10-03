define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/BattleSelectQuestBtn.html js/quest/scene0/Utility js/quest/scene0/parts/BattleSelectBossPopup".split(" "), function(d, e, c, h, k, f, l, g)
{
  return e.View.extend(
  {
    className: "battleBtnSec",
    events: function()
    {
      var a = {};
      a[c.cgti + " .tapSec"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template(f);
      this.model = a.model;
      this._views = a._views;
      this.model.userQuestAdventureList = a.userQuestAdventureList;
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
      b.btnClass = "battle" + b.id;
      a = "";
      0 == b.questInfo.maxDamage && (a = "new");
      b.questInfo.cleared && (a = "clear");
      var c = 0;
      d.each([1, 2, 3], function(a, d, e)
      {
        "CLEARED" == b.questInfo["missionStatus" + a] && c++
      });
      3 == c && (a = "complete");
      b.btnClass = b.btnClass + " " + a;
      return b
    },
    tapBtn: function(a)
    {
      a.preventDefault();
      c.isScrolled() || (this._views.BattleSelectBossPopup = new g(
      {
        model: this.viewModel
      }))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
