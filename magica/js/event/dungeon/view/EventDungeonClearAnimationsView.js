define("underscore backbone backboneCommon ajaxControl command text!css/event/dungeon/EventDungeonClearAnimation.css text!template/event/dungeon/EventDungeonClearAnimation.html".split(" "), function(l, m, b, r, d, n, p)
{
  var e, f, k, q = function()
  {
    b.androidKeyStop = !0;
    return new(m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #SectionClearAnimation"] = this.finishAnimation;
        a["webkitTransitionEnd #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
        a["webkitanimationend #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
        a["animationend #SectionClearAnimation .sectionAnimation"] = this.animationTrigger;
        a["webkitTransitionEnd #SectionClearAnimation .rolingSprite"] = this.rolingSprite;
        a["webkitanimationend #SectionClearAnimation .rolingSprite"] = this.rolingSprite;
        a["animationend #SectionClearAnimation .rolingSprite"] = this.rolingSprite;
        return a
      },
      initialize: function()
      {
        this.finishFlg = !1;
        this.template = l.template(p)
      },
      render: function()
      {
        this.$el.html(this.template(e));
        var a = document.createElement("style");
        a.setAttribute("type", "text/css");
        a.innerText = n;
        this.el.appendChild(a);
        setTimeout(function()
        {
          d.startSe(1501)
        }, 500);
        return this
      },
      animationTrigger: function(a)
      {
        switch (a.currentTarget.id)
        {
          case "sectionClear_b2":
            this.finishFlg ? this.removeHandler() : (b.doc.getElementById("sectionItemTitle").classList.contains("get") ? a = "step2" : (a = "step1", setTimeout(function()
            {
              d.startSe(1501)
            }, 2750), setTimeout(function()
            {
              d.startSe(1604)
            }, 2750)), b.addClass(b.doc.getElementById("SectionClearAnimation"), a));
            break;
          case "sectionChestOpen":
            b.addClass(b.doc.getElementById("SectionClearAnimation"), "step2");
            break;
          case "resultMissionFrame":
            b.removeClass(a.currentTarget, "sectionAnimation"), this.missionAnimation(1)
        }
      },
      rolingSprite: function(a)
      {
        b.addClass(a.currentTarget, "roling")
      },
      missionAnimation: function(a)
      {
        var c = 0;
        if (3 < a)
        {
          var g = "",
            h = -1;
          e.missionCleared1 && e.missionCleared2 && e.missionCleared3 ? e.firstComp ? (g = "canGet", c = 300, d.startSe(1603), h = 1604) : g = "alreadyGet" : (g = "noGet", c = 300, h = 1003);
          b.doc.getElementById("missionItemList").className = g;
          setTimeout(function()
          {
            b.addClass(b.doc.getElementById("SectionClearAnimation"), "finish");
            b.doc.getElementById("touchScreen").className = "fadeIn"; - 1 != h && d.startSe(h)
          }, c)
        }
        else "firstClear" == e["missionStatus" + a] && (setTimeout(function()
        {
          d.startSe(1602)
        }, 200), c = 300, 3 == a && (c += 500), b.addClass(b.doc.getElementById("resultMissionRow" + a), "anim")), setTimeout(function()
        {
          f.missionAnimation(a + 1)
        }, c)
      },
      finishAnimation: function(a)
      {
        a.preventDefault();
        b.isScrolled() || !a.currentTarget.classList.contains("finish") || this.finishFlg || (this.finishFlg = !0, b.addClass(b.doc.getElementById("SectionClearAnimation"), "lastStep"))
      },
      removeHandler: function()
      {
        console.log("EventDungeonClearAnimationsView:removeHandler()");
        b.androidKeyStop = !1;
        this.off();
        this.remove();
        k && k()
      }
    }))
  };
  return {
    section: function(a, c)
    {
      console.log("clearAnimation:START: -------------------------------");
      console.log("areaModel:", a);
      console.log("clearAnimation: -------------------------------------");
      e = a;
      c && (k = c);
      f = q();
      $("#overlapContainer").append(f.render().el);
      d.getBaseData(b.getNativeObj())
    },
    removeHandler: function()
    {
      f.removeHandler()
    }
  }
});
