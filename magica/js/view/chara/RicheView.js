define("underscore backbone backboneCommon ajaxControl text!template/chara/Riche.html js/card/CardPopup CharaCommon".split(" "), function(b, a, d, e, c, f, g)
{
  return a.View.extend(
  {
    id: "richeWrap",
    className: "commonFrame3",
    initialize: function(a)
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(this.model, "change", this.render);
      this.template = b.template(c)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      return this
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
