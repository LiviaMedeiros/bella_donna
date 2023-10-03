define("underscore backbone backboneCommon ajaxControl command text!template/event/accomplish/CompleteAnimation.html".split(" "), function(f, g, c, m, h, k)
{
  var d, e, b, l = function()
  {
    return new(g.View.extend(
    {
      events: function()
      {
        var a = {};
        a[c.cgti] = this.finishFunc;
        a["webkitTransitionEnd .completeEfOverlay"] = this.animationFinish;
        a["webkitAnimationEnd .completeEfOverlay"] = this.animationFinish;
        a["webkitanimationend .completeEfOverlay"] = this.animationFinish;
        a["animationend .completeEfOverlay"] = this.animationFinish;
        return a
      },
      initialize: function(a, b)
      {
        this.removeFlg = this.finishFlg = !1;
        this.template = f.template(k)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          type: e
        }));
        setTimeout(function()
        {
          h.startSe(1001)
        }, 1050);
        return this
      },
      finishFunc: function(a)
      {
        a.preventDefault();
        !c.isScrolled() && this.finishFlg && (this.finishFlg = !1, this.removeFlg = !0, c.addClass(c.doc.getElementById("CompleteAnimation"), "finish"))
      },
      animationFinish: function(a)
      {
        a.preventDefault();
        var b = this;
        this.removeFlg ? this.removeHandler() : setTimeout(function()
        {
          b.finishFlg = !0
        }, 500)
      },
      removeHandler: function()
      {
        this.off();
        this.remove();
        d && d();
        b = null
      }
    }))
  };
  return {
    start: function(a, c)
    {
      e = a ? a : "story";
      d = c ? c : null;
      b = l();
      $("#overlapContainer").append(b.render().el)
    },
    remove: function()
    {
      b && (b.removeHandler(), b = null)
    }
  }
});
