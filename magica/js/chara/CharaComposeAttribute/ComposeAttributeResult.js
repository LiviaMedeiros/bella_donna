define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaComposeAttribute/ComposeAttributeResult.html".split(" "), function(d, e, c, h, f, g)
{
  var b;
  return e.View.extend(
  {
    id: "composeAttributeResult",
    className: "show",
    events: function()
    {
      var a = {};
      a[c.cgti] = this.hideResult;
      return a
    },
    hideResult: function(a)
    {
      if (a && (a.preventDefault(), c.isScrolled())) return;
      this.tapBlock || this.removeView()
    },
    initialize: function(a)
    {
      this.tapBlock = !0;
      this.listenTo(this.rootView, "remove", this.removeView);
      this.template = d.template(g)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      var a = this;
      setTimeout(function()
      {
        f.startSe(1101)
      }, 200);
      b = setTimeout(function()
      {
        a.tapBlock = !1
      }, 1E3);
      return this
    },
    removeView: function()
    {
      clearTimeout(b);
      b = null;
      this.off();
      this.remove()
    }
  })
});
