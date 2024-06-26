define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaData.html js/card/CardPopup CharaCommon".split(" "), function(f, g, a, n, h, k, l, p)
{
  return g.View.extend(
  {
    id: "charaData",
    events: function()
    {
      var d = {};
      d[a.cgti + " #detailBtn"] = this.detailPopup;
      return d
    },
    initialize: function(a)
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "change", this.flag);
      this.template = f.template(k)
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
      var a = this.model.toJSON(),
        e = a.level,
        c = a.maxLevel,
        b = a.maxRare,
        m = a.card.rank.split("RANK_")[1];
      this.lvMaxFlag = e == c ? !0 : !1;
      this.rareMaxFlag = m == b ? !0 : !1;
      this.episodeLvMaxFlag = 5 == a.episodeLevel ? !0 : !1;
      this.conditionIconSet()
    },
    detailPopup: function(d)
    {
      d.preventDefault();
      if (!a.isScrolled())
      {
        var e = null;
        if ("CharaListTop" == a.location || "CharaListCompose" == a.location || "CharaListCustomize" == a.location || "CharaListComposeMagia" == a.location || "CharaListEquip" == a.location || "CharaListComposeAttribute" == a.location) var c = this,
          e = function()
          {
            c.ccommon.showMiniChara(c.model.toJSON().card.miniCharaNo, !0);
            if (c.ccommon.charaImgView)
            {
              var b = a.storage.userCardListEx.findWhere(
                {
                  id: c.model.toJSON().id
                }),
                b = b ? b.toJSON() :
                {};
              c.ccommon.charaImgView.model.set(
              {
                displayCardId: b.displayCardId
              });
              h.getBaseData(a.getNativeObj())
            }
          };
        var b = a.storage.userCardListEx.findWhere(
          {
            id: this.model.toJSON().id
          }),
          b = b ? b.toJSON() :
          {};
        l.instantPopup(d, b, e)
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
