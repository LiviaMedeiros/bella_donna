define("underscore backbone backboneCommon ajaxControl command text!template/item/ItemSalePopup.html cardUtil".split(" "), function(d, e, a, f, k, g, l)
{
  var h = !1;
  return e.View.extend(
  {
    className: "itemSalePopup",
    events: function()
    {
      var b = {};
      b[a.cgti + " .minusBtn"] = this.itemSelectMinus;
      b[a.cgti + " .plusBtn"] = this.itemSelectPlus;
      b[a.cgti + " .maxBtn"] = this.itemSelectMax;
      b[a.cgti + " #saleDecide"] = this.saleDecide;
      return b
    },
    initialize: function(b, c)
    {
      this.listenTo(this, "removeHandler", this.removeHandler);
      this.template = d.template(g);
      this.selectNum = 1;
      this.prismMaster = a.storage.itemList.findWhere(
      {
        itemCode: "PRISM"
      }).toJSON();
      this.crystalMaster = a.storage.itemList.findWhere(
      {
        itemCode: "DESTINY_CRYSTAL"
      }).toJSON();
      this.isCrystal = !1;
      "RANK_4" === this.model.chara.defaultCard.rank && 2 < this.model.revision && 2003 !== this.model.charaId && (this.isCrystal = !0);
      this.model.quantity = this.model.lbItemNum;
      switch (this.model.chara.defaultCard.rank)
      {
        case "RANK_1":
        case "RANK_2":
          this.model.saleFactor = 1;
          break;
        case "RANK_3":
          this.model.saleFactor = 3;
          break;
        case "RANK_4":
          this.model.saleFactor = 10;
          break;
        case "RANK_5":
          this.model.saleFactor = 20;
          break;
        case "RANK_6":
          this.model.saleFactor = 30;
          break;
        default:
          this.model.saleFactor = 1
      }
      this.model.dispName = this.model.chara.name;
      this.model.chara.title && (this.model.dispTitle = this.model.chara.title);
      console.log("model:", this.model);
      c && (this.callBack = c)
    },
    render: function()
    {
      var b = a.storage.userItemList.findWhere(
        {
          itemId: "PRISM"
        }) ? a.storage.userItemList.findWhere(
        {
          itemId: "PRISM"
        }).toJSON().quantity : 0,
        c = a.storage.userItemList.findWhere(
        {
          itemId: "DESTINY_CRYSTAL"
        }) ? a.storage.userItemList.findWhere(
        {
          itemId: "DESTINY_CRYSTAL"
        }).toJSON().quantity : 0;
      this.$el.html(this.template(
      {
        model: this.model,
        hasPrism: b,
        prism: this.prismMaster,
        isCrystal: this.isCrystal,
        hasCrystal: c,
        crystal: this.crystalMaster
      }));
      return this
    },
    itemSelectMinus: function(b)
    {
      b.preventDefault();
      a.isScrolled() || 2 > this.selectNum || (this.selectNum === this.model.lbItemNum && (a.removeClass(a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("plusBtn")[0], "grayScale"), a.removeClass(a.doc.getElementById("saleSelectWrap").getElementsByClassName("maxBtn")[0], "grayScale")), this.selectNum--, a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("selectNum")[0].innerText = this.selectNum, a.doc.getElementById("totalNum").innerText = this.selectNum * this.model.saleFactor, this.isCrystal && (a.doc.getElementById("crystalTotalNum").innerText = this.selectNum), 1 === this.selectNum && a.addClass(b.currentTarget, "grayScale"))
    },
    itemSelectPlus: function(b)
    {
      b.preventDefault();
      a.isScrolled() || this.selectNum >= this.model.lbItemNum || (1 === this.selectNum && (a.removeClass(a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("minusBtn")[0], "grayScale"), a.removeClass(a.doc.getElementById("saleDecide"), "off")), this.selectNum++, a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("selectNum")[0].innerText = this.selectNum, a.doc.getElementById("totalNum").innerText = this.selectNum * this.model.saleFactor, this.isCrystal && (a.doc.getElementById("crystalTotalNum").innerText = this.selectNum), this.selectNum >= this.model.lbItemNum && (a.addClass(b.currentTarget, "grayScale"), a.addClass(a.doc.getElementById("saleSelectWrap").getElementsByClassName("maxBtn")[0], "grayScale")))
    },
    itemSelectMax: function(b)
    {
      b.preventDefault();
      this.selectNum >= this.model.lbItemNum || (this.selectNum = this.model.lbItemNum, a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("selectNum")[0].innerText = this.selectNum, a.doc.getElementById("totalNum").innerText = this.selectNum * this.model.saleFactor, this.isCrystal && (a.doc.getElementById("crystalTotalNum").innerText = this.selectNum), a.addClass(b.currentTarget, "grayScale"), a.addClass(a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("plusBtn")[0], "grayScale"), a.removeClass(a.doc.getElementById("itemNumSelectWrap").getElementsByClassName("minusBtn")[0], "grayScale"), a.removeClass(a.doc.getElementById("saleDecide"), "off"))
    },
    saleDecide: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !h)
      {
        h = !0;
        var c = this;
        f.ajaxPost(a.linkList.userCharaSale,
        {
          charaId: this.model.charaId,
          num: this.selectNum
        }, function(b)
        {
          h = !1;
          if ("error" !== b.resultCode)
          {
            a.responseSetStorage(b);
            l.createCardList();
            var e = d.template($("#saleComplete").text()),
              f = d.findWhere(b.userItemList,
              {
                itemId: "PRISM"
              }).quantity | 0;
            b = d.findWhere(b.userItemList,
            {
              itemId: "DESTINY_CRYSTAL"
            }) ? d.findWhere(b.userItemList,
            {
              itemId: "DESTINY_CRYSTAL"
            }).quantity | 0 : 0;
            var g = c.isCrystal ? "crystal saleComplete" : "saleComplete";
            new a.PopupClass(
            {
              title: "デスティニージェム変換",
              content: e(
              {
                selectNum: c.selectNum,
                model: c.model,
                afterNum: f,
                isCrystal: c.isCrystal,
                afterCrystal: b,
                prism: c.prismMaster,
                crystal: c.crystalMaster
              }),
              closeBtnText: "OK",
              popupType: "typeE",
              exClass: g
            });
            c.callBack && c.callBack();
            k.getBaseData(a.getNativeObj())
          }
        })
      }
    },
    removeHandler: function()
    {
      a.helpPopup = null;
      this.off();
      this.remove()
    }
  })
});
