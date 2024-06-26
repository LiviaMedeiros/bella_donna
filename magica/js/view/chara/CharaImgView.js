define("underscore backbone backboneCommon ajaxControl text!template/chara/CharaImg.html js/card/CardPopup".split(" "), function(b, a, d, e, c, f)
{
  return a.View.extend(
  {
    id: "charaImg",
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
