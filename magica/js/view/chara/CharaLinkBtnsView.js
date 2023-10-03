define(["underscore", "backbone", "backboneCommon", "ajaxControl", "text!template/chara/CharaLinkBtns.html"], function(d, e, b, g, f)
{
  var c;
  return e.View.extend(
  {
    id: "btnArea",
    events: function()
    {
      var a = {};
      a[b.cgti + " li span"] = this.linkBtnFunc;
      a[b.cgti + " li.current span"] = this.backLinkFunc;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.template = d.template(f);
      this.canTapFlag = !0
    },
    render: function()
    {
      this.$el.html(this.template());
      var a = b.location.split("CharaList")[1].toLowerCase();
      this.el.className = a;
      b.addClass(this.el.getElementsByClassName(a)[0], "current");
      return this
    },
    linkBtnFunc: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && (a = a.currentTarget.parentNode, !a.classList.contains("current") && a.getAttribute("data-href") && (b.removeClass(this.el.getElementsByClassName("current")[0], "current"), b.addClass(a, "current"), this.canTapFlag)))
      {
        this.canTapFlag = !1;
        this.el.className = a.getAttribute("data-href").split("CharaList")[1].toLowerCase();
        location.href = a.getAttribute("data-href");
        var d = this;
        c = setTimeout(function()
        {
          d.canTapFlag = !0
        }, 800)
      }
    },
    backLinkFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this.charaTopFunc(), location.href = "#/CharaListTop")
    },
    charaTopFunc: function()
    {
      b.removeClass(this.el.getElementsByClassName("current")[0], "current");
      this.el.className = "top"
    },
    removeView: function()
    {
      c && (clearTimeout(c), c = null);
      this.off();
      this.remove()
    }
  })
});
