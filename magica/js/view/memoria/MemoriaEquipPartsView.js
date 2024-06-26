define("underscore backbone backboneCommon ajaxControl js/memoria/MemoriaPopup cardUtil command".split(" "), function(h, f, d, l, e, m, k)
{
  f.Model.extend();
  return f.View.extend(
  {
    tagName: "p",
    className: function()
    {
      var a = this.model.toJSON(),
        c = "userMemoriaIcon ";
      if (!a.maxLevel)
      {
        var b = this.parentView.memoriaUtil.getMaxLevel(a.piece.rank, a.lbCount);
        this.model.set("maxLevel", b);
        a.maxLevel = b
      }
      a.effectType || (b = this.parentView.memoriaUtil.getEffect(a), this.model.set("effectType", b), a.effectType = b);
      b = d.equipInfo.pieceSetFlag ? -1 < this.pieceSetIdArr.indexOf(a.id) : !1;
      this.model.set("alreadySet", b);
      a.alreadySet = b;
      a.level === a.maxLevel && (c += " lvMax");
      3 < a.lbCount && (c += " lbMax");
      a.protect && (c += " protected");
      a.selectFlg && (c += " selected");
      a.alreadySet && (c += " alreadySet");
      a.eventEffect && (c += " effective");
      b = !0;
      d.holdDeck && (b = -1 < ["extermination", "exterminationCopy"].indexOf(d.holdDeck.deckCatType));
      b && a.regularEventEffect && (c += " regularEffective");
      (b = this.parentView.memoriaSort.isHideFilterType(a)) || (b = this.parentView.memoriaSort.isHideFilterEffect(a));
      b || (b = this.parentView.memoriaSort.isHideFilterLock(a));
      b || (b = this.parentView.memoriaSort.isHideFilterRank(a));
      b || (b = this.parentView.memoriaSort.isHideFilterCompose(c));
      b && (c += " hide");
      return c
    },
    events: function()
    {
      var a = {};
      a[d.cgti] = this.touchHandler;
      a.touchstart = "popupTimeStart";
      return a
    },
    initialize: function(a)
    {
      this.model.set(
      {
        effectType: this.parentView.memoriaUtil.getEffect(this.model.toJSON())
      });
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.parentView, "viewUpdate", this.viewUpdate);
      this.listenTo(this.parentView, "equipedReset", this.equipedReset);
      this.listenTo(this.model, "change", this.viewUpdate);
      this.listenTo(this.parentView, "dispChange", this.changeDisp);
      this.listenTo(this.parentView, "equipAddClass", this.equipAddClass)
    },
    render: function()
    {
      this.el.innerHTML = this.parentView.memoriaPartsTemplate(
      {
        model: this.model.toJSON()
      });
      return this
    },
    changeDisp: function(a)
    {
      var c = "";
      switch (a)
      {
        case "hp":
          c = "HP  " + this.model.get("hp");
          break;
        case "atk":
          c = "ATK " + this.model.get("attack");
          break;
        case "def":
          c = "DEF " + this.model.get("defense");
          break;
        case "get":
          c = this.model.get("createdAt").substr(2, 8)
      }
      this.el.getElementsByClassName("dispPrm")[0].textContent = c
    },
    viewUpdate: function()
    {
      this.model.get("id") === this.parentView.selectPieceId ? this.model.set(
      {
        selectFlg: !0
      }) : this.model.unset("selectFlg");
      this.el.className = this.className();
      this.equipAddClass()
    },
    equipedReset: function()
    {
      this.model.unset("equipRemoveFlag")
    },
    equipAddClass: function()
    {
      if (this.parentView)
      {
        var a = this,
          c = this.model.toJSON(),
          b = this.parentView,
          g = b.equipDetailView,
          e = g.model.toJSON();
        e.allPiece && e.allPiece[this.model.toJSON().id] && d.addClass(this.el, "equiped");
        g.ownEquipPieceObj && g.ownEquipPieceObj[this.model.toJSON().id] && d.addClass(this.el, "ownEquip");
        b.equipedPiece && b.equipedPiece.cid == this.model.cid && d.addClass(this.el, "remove");
        2 != b.memoriaAbilityEquipNum || "ABILITY" != c.piece.pieceType || this.el.classList.contains("ownEquip") || d.addClass(this.el, "cantEquipAbility");
        2 != b.memoriaSkillEquipNum || "SKILL" != c.piece.pieceType || this.el.classList.contains("ownEquip") || d.addClass(this.el, "cantEquipSkill");
        g.ownEquipPieceIdObj && g.ownEquipPieceIdObj[this.model.toJSON().pieceId] && !this.el.classList.contains("ownEquip") && (b.equipedPiece ? b.equipedPiece.toJSON().pieceId !== this.model.toJSON().pieceId && d.addClass(this.el, "cantEquipId") : d.addClass(this.el, "cantEquipId"));
        c.piece.attributeId && "ALL" !== c.piece.attributeId && !this.el.classList.contains("ownEquip") && c.piece.attributeId !== b.equipInfo.charaAtt && d.addClass(this.el, "cantEquipAtt");
        if (c.piece.charaList && d.equipInfo.charaId)
        {
          var f = !1;
          h.each(c.piece.charaList, function(a)
          {
            a.charaId == d.equipInfo.charaId && (f = !0)
          });
          f || this.el.classList.contains("ownEquip") || d.addClass(this.el, "cantEquipChara")
        }!b.invalidFlag || "invalidRev" != b.invalidFlag || this.el.classList.contains("remove") || this.el.classList.contains("ownEquip") || d.addClass(this.el, "cantEquip");
        h.each(b.hideMemoriaList, function(b)
        {
          b.pieceId == c.pieceId && b.id !== c.id && d.addClass(a.el, "hide")
        })
      }
    },
    popupTimeStart: function(a)
    {
      e.cardDetailPopup(a, this.model.toJSON())
    },
    touchHandler: function(a)
    {
      e.popupTimerStop(a);
      d.isScrolled() || d.detailPopup || (a.preventDefault(), k.startSe(1002), this.el.classList.contains("cantEquipAbility") || this.el.classList.contains("cantEquipSkill") || this.el.classList.contains("cantEquipId") || this.el.classList.contains("cantEquipAtt") || this.el.classList.contains("cantEquipChara") || this.el.classList.contains("cantEquip") || d.doc.querySelector("#memoriaListWrap.cantTap") || (this.parentView.selectPieceId = this.model.toJSON().id, this.parentView.selectPiece && this.parentView.selectPiece.unset("selectFlg"), this.parentView.selectPiece = this.model, this.model.set(
      {
        selectFlg: !0
      }), a = this.parentView.selectPiece ? this.parentView.selectPiece.toJSON() :
      {}, this.parentView.equipInfoView.model.clear(
      {
        silent: !0
      }), this.parentView.equipInfoView.model.set(a)))
    },
    removeView: function()
    {
      e.popupTimerStop();
      this.model.get("selectFlg") && this.model.unset("selectFlg");
      this.model.get("equipRemoveFlag") && this.model.unset("equipRemoveFlag");
      this.off();
      this.remove()
    }
  })
});
