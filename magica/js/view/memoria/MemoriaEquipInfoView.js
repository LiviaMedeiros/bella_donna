define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaEquipInfo.html".split(" "), function(e, g, b, h, k, l)
{
  return g.View.extend(
  {
    id: "equipInfo",
    events: function()
    {
      var a = {};
      a[b.cgti + " #memoriaEquipBtn"] = this.equipFunc;
      return a
    },
    initialize: function(a)
    {
      this.disableFlag = !1;
      this.template = e.template(l);
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.model, "change", this.render)
    },
    render: function()
    {
      var a = this.model.toJSON(),
        c;
      if (a && this.parentView.equipedPiece)
      {
        var d = this.parentView.equipedPiece.toJSON();
        a.id && a.id !== d.id && (c = {}, c.hp = a.hp - d.hp, c.attack = a.attack - d.attack, c.defense = a.defense - d.defense)
      }
      d = !1;
      "formationEquip" == this.parentView.mode && this.parentView.equipInfo.pieceModel && (d = this.parentView.equipInfo.pieceModel.id == a.id);
      this.$el.html(this.template(
      {
        model: a,
        ownWquip: d,
        additional: c
      }));
      k.getBaseData(b.getNativeObj());
      return this
    },
    equipFunc: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && !a.currentTarget.classList.contains("off") && !this.disableFlag && (this.disableFlag = !0, b.tapBlock(!0), this.model.toJSON(), "formationEquip" == this.parentView.mode))
        if (this.parentView.equipInfo.allPiece[this.model.toJSON().id] && this.parentView.equipInfo.allPiece[this.model.toJSON().id].name && this.parentView.equipInfo.selectPieceId !== this.model.toJSON().id)
        {
          var c = this.parentView.equipInfo.allPiece[this.model.toJSON().id].name,
            d = this.parentView.equipInfo.charaName;
          a = c !== d ? e.template($("#formationEquipPop").text()) : e.template($("#formationEquipPop2").text());
          var f = this;
          new b.PopupClass(
          {
            title: "装備変更",
            content: a(
            {
              cardName: c,
              targetName: d
            }),
            decideBtnText: "OK",
            closeBtnText: "閉じる",
            popupType: "typeC"
          }, null, function()
          {
            b.tapBlock(!1);
            console.log(b.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0]);
            b.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(b.cgti, function()
            {
              b.tapBlock(!0);
              f.formationEquip()
            })
          }, function()
          {
            f.disableFlag = !1
          })
        }
      else this.formationEquip()
    },
    equip: function()
    {
      var a = {},
        c = this.model.toJSON(),
        d = this.parentView.equipInfo,
        f = this;
      a.userCardId = d.userCardId;
      a.target = d.target;
      this.parentView.selectPiece !== this.parentView.equipedPiece && (a.userPieceId = c.id);
      h.ajaxPost(b.linkList.pieceEquip, a, function(a)
      {
        f.disableFlag = !1;
        b.responseSetStorage(a);
        b.tapBlock(!1);
        b.backLinkHandler()
      })
    },
    formationEquip: function()
    {
      var a = this.model.toJSON(),
        c = this.parentView.equipInfo,
        d = null;
      e.each(b.holdDeck, function(a, m)
      {
        e.each(b.holdDeck, function(a, b)
        {
          -1 !== b.indexOf("questPositionId") && a == c.posIndex && (d = "userPieceId" + ("000" + b.split("questPositionId")[1] + String(c.pieceIndex)).slice(-3))
        })
      });
      c.allPiece[a.id] && c.allPiece[a.id].name ? c.pieceModel && c.pieceModel.id == a.id ? delete b.holdDeck[d] : (e.each(b.holdDeck, function(d, c)
      {
        -1 !== c.indexOf("userPieceId") && d == a.id && delete b.holdDeck[c]
      }), b.holdDeck[d] = a.id) : b.holdDeck[d] = a.id;
      console.log(b.holdDeck);
      b.backLinkHandler()
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
