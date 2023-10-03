define("underscore backbone backboneCommon ajaxControl command text!template/event/storyraid/FinalAnimationTemp.html".split(" "), function(k, l, a, q, m, n)
{
  var d, e, f, p = function()
  {
    a.tapBlock(!0);
    a.androidKeyStop = !0;
    return new(l.View.extend(
    {
      id: "finishSceneAnimation",
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .finishSceneAnimation"] = this.animationTrigger;
        a["webkitAnimationEnd .finishSceneAnimation"] = this.animationTrigger;
        a["webkitanimationend .finishSceneAnimation"] = this.animationTrigger;
        a["animationend .finishSceneAnimation"] = this.animationTrigger;
        return a
      },
      initialize: function()
      {
        this.finishFlg = !1;
        this.template = k.template(n)
      },
      render: function()
      {
        this.$el.html(this.template(
        {}));
        return this
      },
      animationTrigger: function(b)
      {
        switch (b.currentTarget.id)
        {
          case "rainbowEffect":
            setTimeout(function()
            {
              a.addClass(this.el, "loop");
              a.tapBlock(!1);
              a.androidKeyStop = !1;
              f && f();
              a.setGlobalView()
            }.bind(this), 500)
        }
      },
      finishAnimation: function(b)
      {
        b.preventDefault();
        a.isScrolled() || !b.currentTarget.classList.contains("finish") || this.finishFlg || (this.finishFlg = !0, a.addClass(a.doc.getElementById("finishSceneAnimation"), "lastStep"))
      },
      removeHandler: function()
      {
        a.tapBlock(!1);
        a.androidKeyStop = !1;
        this.off();
        this.remove();
        e && e()
      }
    }))
  };
  return {
    finish: function(b, g, c, h)
    {
      d = p();
      h && (e = h);
      c && (f = c);
      c = a.doc.createElement("div");
      c.id = "whiteOut";
      a.doc.getElementById("overlapContainer").appendChild(c);
      $("#whiteOut").on("webkitAnimationEnd", function()
      {
        $("#whiteOut").off();
        g && g();
        a.globalMenuView && a.globalMenuView.removeView();
        a.removeClass(a.doc.getElementById("whiteOut"), "start");
        a.addClass(a.doc.getElementById("whiteOut"), "end");
        $("#whiteOut").on("webkitAnimationEnd", function()
        {
          $("#whiteOut").off();
          a.doc.getElementById("overlapContainer").removeChild(a.doc.getElementById("whiteOut"));
          $("#" + b).append(d.render().el)
        })
      });
      a.addClass(a.doc.getElementById("whiteOut"), "start");
      setTimeout(function()
      {
        m.startSe(1503)
      }, 2300)
    },
    removeHandler: function()
    {
      d.removeHandler()
    }
  }
});
