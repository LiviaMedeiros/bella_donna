define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaData.html js/card/CardPopup CharaCommon".split(" "), function(c, d, a, f, g, e, h, k)
{
  return d.View.extend(
  {
    id: "charaData",
    events: function()
    {
      return {}
    },
    initialize: function(b)
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "change", this.flag);
      this.template = c.template(e)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      return this
    },
    conditionIconSet: function()
    {
      this.lvMaxFlag && a.addClass(this.el.querySelector(".lvMaxFlag"), "on");
      this.lbMaxFlag && a.addClass(this.el.querySelector(".lbMaxFlag"), "on");
      this.revMaxFlag && a.addClass(this.el.querySelector(".revMaxFlag"), "on");
      this.episodeLvMaxFlag && a.addClass(this.el.querySelector(".episodeLvMaxFlag"), "on")
    },
    flag: function()
    {
      var b = this.model.toJSON(),
        a = b.level,
        c = b.maxLevel,
        d = b.maxRare,
        e = b.card.rank.split("RANK_")[1];
      this.lvMaxFlag = a == c ? !0 : !1;
      this.rareMaxFlag = e == d ? !0 : !1;
      this.episodeLvMaxFlag = 5 == b.episodeLevel ? !0 : !1;
      this.conditionIconSet()
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
