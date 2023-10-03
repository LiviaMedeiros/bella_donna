define(["underscore", "backbone", "backboneCommon", "ajaxControl"], function(d, c, b, e)
{
  return c.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti] = this.targetSelectFunc;
      return a
    },
    initialize: function()
    {
      this.listenTo(this.model, "change", this.selectTarget);
      this.listenTo(this.rootView, "remove", this.removeView)
    },
    render: function(a)
    {
      this.el.innerHTML = a ? '<img data-nativeimgkey="memoria_' + this.model.toJSON().pieceId + '_c" data-src="resource/image_native/memoria/memoria_' + this.model.toJSON().pieceId + '_c.png" class="targetMemoria">' : ""
    },
    targetSelectFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || b.backLinkHandler()
    },
    selectTarget: function()
    {
      this.model.toJSON().id ? (this.rootView.costRicheUpdate(), this.render(!0)) : this.render(!1)
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
