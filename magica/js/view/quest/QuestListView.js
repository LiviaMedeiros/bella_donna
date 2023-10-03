define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/view/quest/QuestListPartsView"], function(c, a, d, f, b)
{
  return a.View.extend(
  {
    initialize: function(b)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this, "appendComp", this.appendComp)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      return this
    },
    appendComp: function()
    {
      var a = this.model.toJSON();
      b.prototype.template = c.template($("#QuestListParts").text());
      b.prototype.parentView = this;
      var e = d.doc.createDocumentFragment();
      c.each(a.questBattleList, function(a, c)
      {
        a = new b(
        {
          model: a
        });
        e.appendChild(a.render().el)
      });
      d.doc.getElementById("questLinkList").appendChild(e)
    },
    removeView: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
