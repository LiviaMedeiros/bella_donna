define("underscore backbone backboneCommon ajaxControl command js/event/arenaranking/view/EventArenaConfirmView".split(" "), function(f, d, b, g, e, c)
{
  return d.View.extend(
  {
    tagName: "li",
    className: "enemyWrap TE se_decide",
    events: function()
    {
      var a = {};
      a[b.cgti] = this.battleConfirm;
      return a
    },
    initialize: function(a)
    {
      this.model = a;
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.listenTo(this.rootView, "resetListView", this.removeView)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model,
        type: this.rootView.model.userArenaBattleMatch.arenaBattleType
      }));
      return this
    },
    battleConfirm: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.doc.getElementById("tapBlock").style.display = "none", c.prototype.parentView = this, a = new c, a.model = this.model, b.arenaConfirmView = a, b.doc.getElementById("overlapContainer").appendChild(a.render().el), e.getBaseData(b.getNativeObj()))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
