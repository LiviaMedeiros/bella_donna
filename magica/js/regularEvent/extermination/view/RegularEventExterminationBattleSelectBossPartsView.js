define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationBattleSelectBossParts.html js/regularEvent/extermination/view/RegularEventExterminationDifficultyPopupView js/view/item/ItemImgPartsView".split(" "), function(d, e, b, k, f, g, h, c)
{
  return e.View.extend(
  {
    tagName: "div",
    className: "bossWrap",
    events: function()
    {
      var a = {};
      a[b.cgti + " .detailBtn"] = this.tap;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.model, "change", this.replaceView);
      this.template = d.template(g);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      this.itemImgPartsView = new c(
      {
        model:
        {
          item: this.model.attributes.rewardData,
          quantity: this.model.attributes.rewardData.quantity,
          genericId: this.model.attributes.rewardData.genericId
        },
        type: this.model.attributes.rewardData.rewardType
      });
      this.el.querySelectorAll(".rewardWap")[0].appendChild(this.itemImgPartsView.render().el);
      return this
    },
    createDom: function()
    {
      return b.doc.createDocumentFragment()
    },
    replaceView: function(a)
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      this.itemImgPartsView = new c(
      {
        model:
        {
          item: this.model.attributes.rewardData,
          quantity: this.model.attributes.rewardData.quantity,
          genericId: this.model.attributes.rewardData.genericId
        },
        type: this.model.attributes.rewardData.rewardType
      });
      this.el.querySelectorAll(".rewardWap")[0].appendChild(this.itemImgPartsView.render().el);
      f.getBaseData(b.getNativeObj())
    },
    tap: function(a)
    {
      a.preventDefault();
      b.isScrolled() || h.detailPop(this.model.get("difficultyList"), this.model.get("userRegularEventExterminationDifficulty"), this.model.get("index"))
    },
    removeView: function()
    {
      this.itemImgPartsView && this.itemImgPartsView.removeView();
      this.off();
      this.remove()
    }
  })
});
