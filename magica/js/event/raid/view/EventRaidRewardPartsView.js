define("underscore backbone backboneCommon ajaxControl command text!css/event/raid/EventRaidRewardParts.css text!template/event/raid/EventRaidRewardParts.html".split(" "), function(c, e, a, f, g, h, k)
{
  f = e.View.extend(
  {
    id: "RewardPopup",
    events: function()
    {
      var b = {};
      b[a.cgti + " .closeBtn"] = this.closeBtn;
      return b
    },
    initialize: function(b)
    {
      this.eventId = b.eventId;
      this.logRaidBossList = b.logRaidBossList;
      this.closeCallback = b.closeCallback;
      this.template = c.template(k);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        eventId: this.eventId
      }));
      var b = a.doc.createElement("style");
      b.setAttribute("type", "text/css");
      b.innerHTML = h;
      this.el.insertBefore(b, this.el.firstChild);
      return this
    },
    createDom: function()
    {
      a.doc.getElementById("overlapContainer").appendChild(this.render().el);
      a.doc.getElementById("curtain").className = "show";
      d.prototype.rootView = this;
      d.prototype.template = c.template($("#rewardPopupListParts").text());
      var b = a.doc.createDocumentFragment();
      c.each(this.logRaidBossList, function(a, c)
      {
        a.index = c;
        a = new d(
        {
          model: a
        });
        b.appendChild(a.render().el)
      });
      a.doc.getElementById("rewardPopupList").appendChild(b);
      g.getBaseData(a.getNativeObj());
      a.scrollSet("rewardPopupListWrap", "scrollInner");
      setTimeout(function()
      {
        g.startSe(1701)
      }, 500)
    },
    closeBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.doc.getElementById("curtain").className = "show", a.doc.getElementById("curtain").className = "", this.closeCallback && this.closeCallback(), this.removeView())
    },
    removeView: function()
    {
      this.trigger("removeChildView");
      this.off();
      this.remove()
    }
  });
  var d = e.View.extend(
  {
    tagName: "li",
    className: "rewardChild",
    initialize: function(a)
    {
      this.listenTo(this.rootView, "removeChildView", this.removeView)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.el.classList.add(this.model.type);
      return this
    },
    removeView: function()
    {
      this.remove()
    }
  });
  return f
});
