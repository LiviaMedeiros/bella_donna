define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/view/item/ItemImgPartsView"], function(f, d, b, g, e)
{
  return d.View.extend(
  {
    tagName: "div",
    className: "present commonFrame4",
    initialize: function(a)
    {
      this.listenTo(this.parentView, "filter", this.filter);
      this.listenTo(this.parentView, "removeChildView", this.removeView);
      this.listenTo(this.model, "change", this.removeView)
    },
    render: function()
    {
      var a = this.model.toJSON(),
        c;
      "CARD" === a.presentType && (c = b.storage.userCharaList.findWhere(
      {
        charaId: (a.cardId + "").substr(0, 4) | 0
      }), c = c.toJSON().chara.defaultCard);
      this.filter();
      this.$el.html(this.template(
      {
        model: a,
        card: c,
        userName: b.storage.user.toJSON().loginName
      }));
      this.itemImgPartsView = new e(
      {
        model: a,
        type: a.presentType
      });
      this.el.appendChild(this.itemImgPartsView.render().el);
      return this
    },
    filter: function()
    {
      var a = this.model.toJSON();
      "ALL" == this.originType || this.originType == a.originType ? b.removeClass(this.el, "hide") : b.addClass(this.el, "hide")
    },
    removeView: function()
    {
      this.itemImgPartsView && this.itemImgPartsView.removeView();
      this.off();
      this.remove()
    }
  })
});
