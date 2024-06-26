define("underscore backbone backboneCommon ajaxControl js/card/CardPopup command".split(" "), function(h, d, b, k, f, e)
{
  return d.View.extend(
  {
    tagName: "li",
    className: function()
    {
      var a = this.model.toJSON().chara.initialType; - 1 < a.indexOf("_") && (a = a.split("_"), a = a[a.length - 1]);
      var b = this.model.toJSON().chara.enhancementGroupId ? "enhanced " : "",
        a = "userCharaIcon " + this.model.toJSON().card.attributeId + " " + this.model.toJSON().card.rank + " " + a + " " + b + " userCardId" + this.model.toJSON().userCardId + " charaId" + this.model.toJSON().charaId;
      this.model.toJSON().eventFlag && (a += " eventChara");
      return a
    },
    events: function()
    {
      var a = {};
      a[b.cgti] = this.charaSelect;
      a.touchstart = "popupTimeStart";
      return a
    },
    initialize: function()
    {
      this.listenTo(this.parentView, "remove", this.removeView);
      this.listenTo(this.model, "charaSelect", this.charaSelectFunc);
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "change", this.charaObjKeyUpdate);
      this.userCardId = this.model.toJSON().userCardId
    },
    render: function(a)
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      "init" !== a && e.getBaseData(b.getNativeObj());
      return this
    },
    charaObjKeyUpdate: function()
    {
      this.userCardId !== this.model.toJSON().userCardId && this.parentView.charaViews[this.userCardId] && (this.parentView.charaViews[this.model.toJSON().userCardId] = this.parentView.charaViews[this.userCardId], delete this.parentView.charaViews[this.userCardId], this.parentView.selectCardId = this.model.toJSON().userCardId, this.userCardId = this.model.toJSON().userCardId)
    },
    popupTimeStart: function(a)
    {
      if (!b.patrolDeckList)
      {
        var g = null;
        if ("CharaListTop" == b.location || "CharaListCompose" == b.location || "CharaListLimitBreak" == b.location || "CharaListCustomize" == b.location || "CharaListComposeMagia" == b.location || "CharaListEquip" == b.location || "CharaListComposeAttribute" == b.location) var c = b.pageObj.charaCommon(),
          d = this,
          g = function()
          {
            c.showMiniChara(d.model.toJSON().card.miniCharaNo, !0);
            if (c.charaImgView)
            {
              var a = b.storage.userCardListEx.findWhere(
                {
                  id: c.charaImgView.model.toJSON().id
                }),
                a = a ? a.toJSON() :
                {};
              c.charaImgView.model.set(
              {
                displayCardId: a.displayCardId
              });
              e.getBaseData(b.getNativeObj())
            }
          };
        f.cardDetailPopup(a, this.model.toJSON(), g)
      }
    },
    charaSelect: function(a)
    {
      a.preventDefault();
      f.popupTimerStop(a);
      b.isScrolled() || b.content.hasClass("hide") || (e.startSe("1002"), this.charaSelectFunc())
    },
    charaSelectFunc: function(a)
    {
      b.pageObj.charaSelect && b.pageObj.charaSelect(this, a);
      b.patrolDeckList && this.parentView.rootView && this.parentView.rootView.trigger("chara", this, a)
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
