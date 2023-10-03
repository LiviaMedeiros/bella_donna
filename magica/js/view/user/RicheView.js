define(["underscore", "backbone", "backboneCommon"], function(b, a, c)
{
  return a.View.extend(
  {
    initialize: function()
    {
      console.log(this.rootView);
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.listenTo(this.model, "change", this.reRender)
    },
    reRender: function()
    {
      this.el.textContent = this.model.toJSON().riche
    },
    removeView: function()
    {
      console.log("removeView riche");
      this.off();
      this.remove()
    }
  })
});
