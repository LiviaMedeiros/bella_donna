define("underscore backbone backboneCommon ajaxControl command text!template/base/ItemImgView.html".split(" "), function(c, d, b, f, g, e)
{
  return d.View.extend(
  {
    className: function()
    {
      var a = "itemImgWrap";
      this.model.id && (a = a + " item" + this.model.id);
      return a
    },
    events: function()
    {
      var a = {};
      a[b.cgti] = this.tapImg;
      return a
    },
    initialize: function(a)
    {
      this.template = c.template(e);
      this.model = a.model
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    tapImg: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || this.model.callback && this.model.callback()
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
