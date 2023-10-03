define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/BattleSelectQuestList.html js/quest/scene0/Utility".split(" "), function(b, c, e, f, g, d, h)
{
  return c.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = b.template(d);
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
      a = a.model;
      this.listId = "BattleLevel" + a.id;
      return {
        listTitle: "難易度:" + a.difficultyLevel,
        listId: this.listId
      }
    },
    getListId: function()
    {
      return this.listId
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
