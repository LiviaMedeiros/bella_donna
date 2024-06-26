define("underscore backbone backboneCommon ajaxControl command text!template/quest/SectionClearAnimation.html text!template/quest/StoryClearAnimation.html".split(" "), function(k, l, a, r, d, m, n)
{
  var c, g, e, f, p = function()
    {
      a.androidKeyStop = !0;
      return new(l.View.extend(
      {
        events: function()
        {
          var b = {};
          b[a.cgti + " #SectionClearAnimation"] = this.finishAnimation;
          b["webkitTransitionEnd #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
          b["webkitAnimationEnd #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
          b["webkitanimationend #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
          b["animationend #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
          return b
        },
        initialize: function()
        {
          this.finishFlg = !1;
          this.template = k.template(m)
        },
        render: function()
        {
          this.$el.html(this.template(c));
          setTimeout(function()
          {
            d.startSe(1501)
          }, 500);
          return this
        },
        animationTrigger: function(b)
        {
          switch (b.currentTarget.id)
          {
            case "magicCircle":
              this.finishFlg ? this.removeHandler() : (a.addClass(a.doc.getElementById("SectionClearAnimation"), "step1"), setTimeout(function()
              {
                d.startSe(1501)
              }, 2750));
              break;
            case "sectionChestOpen":
              a.addClass(a.doc.getElementById("SectionClearAnimation"), "step2");
              break;
            case "itemPetal2":
              a.addClass(a.doc.getElementById("SectionClearAnimation"), "finish")
          }
        },
        finishAnimation: function(b)
        {
          b.preventDefault();
          a.isScrolled() || this.finishFlg || (b.currentTarget.classList.contains("finish") ? (this.finishFlg = !0, a.addClass(a.doc.getElementById("SectionClearAnimation"), "lastStep"), setTimeout(function()
          {
            this.removeHandler()
          }.bind(this), 200)) : (a.removeClass(a.doc.getElementById("SectionClearAnimation"), "step1"), a.removeClass(a.doc.getElementById("SectionClearAnimation"), "step2"), a.addClass(a.doc.getElementById("SectionClearAnimation"), "finish")))
        },
        removeHandler: function()
        {
          a.androidKeyStop = !1;
          this.off();
          this.remove();
          e && (e(), e = null)
        }
      }))
    },
    q = function()
    {
      a.androidKeyStop = !0;
      return new(l.View.extend(
      {
        events: function()
        {
          var b = {};
          b[a.cgti + " #StoryClearAnimation"] = this.finishAnimation;
          b["webkitTransitionEnd #StoryClearAnimation .sectionAnimation"] = this.animationTrigger;
          b["webkitAnimationEnd #StoryClearAnimation .sectionAnimation"] = this.animationTrigger;
          b["webkitanimationend #StoryClearAnimation .sectionAnimation"] = this.animationTrigger;
          b["animationend #StoryClearAnimation .sectionAnimation"] = this.animationTrigger;
          return b
        },
        initialize: function()
        {
          this.stepCount = 0;
          this.template = k.template(n)
        },
        render: function()
        {
          this.$el.html(this.template(c));
          setTimeout(function()
          {
            d.startSe(1503)
          }, 500);
          return this
        },
        animationTrigger: function(b)
        {
          switch (b.currentTarget.id)
          {
            case "storyCircle1":
              0 === this.stepCount ? (this.stepCount = 1, a.addClass(a.doc.getElementById("StoryClearAnimation"), "step1")) : 4 === this.stepCount ? (this.stepCount = 5, a.addClass(a.doc.getElementById("StoryClearAnimation"), "step5")) : 7 !== this.stepCount && 100 !== this.stepCount || this.removeHandler();
              break;
            case "storyTitle1":
              1 === this.stepCount && (this.stepCount = 2, a.addClass(a.doc.getElementById("StoryClearAnimation"), "step2"));
              break;
            case "storyClearSmall":
              2 === this.stepCount && (this.stepCount = 3, a.addClass(a.doc.getElementById("StoryClearAnimation"), "step3"));
              break;
            case "storyPetal3":
              3 === this.stepCount && (null !== c.after ? (this.stepCount = 4, a.addClass(a.doc.getElementById("StoryClearAnimation"), "step4"), d.startSe(1504)) : (this.stepCount = 99, a.addClass(a.doc.getElementById("StoryClearAnimation"), "finish")));
              break;
            case "storyTitle2":
              5 === this.stepCount && (a.addClass(a.doc.getElementById("StoryClearAnimation"), "finish"), this.stepCount = 6)
          }
        },
        finishAnimation: function(b)
        {
          b.preventDefault();
          !a.isScrolled() && b.currentTarget.classList.contains("finish") && 7 !== this.stepCount && 100 !== this.stepCount && (6 === this.stepCount ? (this.stepCount = 7, a.addClass(a.doc.getElementById("StoryClearAnimation"), "lastStep")) : 99 === this.stepCount && (this.stepCount = 100, a.addClass(a.doc.getElementById("StoryClearAnimation"), "lastStepAnother")))
        },
        removeHandler: function()
        {
          a.androidKeyStop = !1;
          this.off();
          this.remove();
          f && (f(), f = null)
        }
      }))
    };
  return {
    section: function(b, h, f, d)
    {
      console.log("clearAnimation:START: -------------------------------");
      console.log("itemCode:", b);
      console.log("section:", h);
      console.log("chestColor:", f);
      console.log("clearAnimation: -------------------------------------");
      e = null;
      c = {};
      c.rewardType = -1 < b.indexOf("GIFT_") ? "gift" : -1 < b.indexOf("LIVE2D_") ? "live2d" : -1 < b.indexOf("DOPPEL_") ? "doppel" : -1 < b.indexOf("GEM_") ? "gem" : -1 < b.indexOf("PIECE_") ? "memoria" : "main";
      c.itemId = a.itemSet(b);
      c.chestColor = f;
      c.quantity = h.clearReward.quantity;
      c.displayName = h.clearReward.displayName;
      d && (e = d);
      g = p();
      $("#overlapContainer").append(g.render().el)
    },
    story: function(a, d, e)
    {
      f = null;
      c = {};
      c.before = a.chapter;
      c.after = null === d || void 0 === d ? null : d.chapter;
      e && (f = e);
      g = q();
      $("#overlapContainer").append(g.render().el)
    },
    removeHandler: function()
    {
      g.removeHandler()
    }
  }
});
