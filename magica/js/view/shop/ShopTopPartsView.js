define("underscore backbone backboneCommon ajaxControl command cardUtil js/card/CardPopup js/memoria/MemoriaPopup js/view/item/ItemImgPartsView".split(" "), function(l, m, b, q, f, n, h, k, g)
{
  var p = function()
  {
    f.endL2d();
    var a, c = q.getPageJson();
    (c = l.findWhere(c.campaignList,
    {
      campaignType: "SHOP_VIEW"
    })) && c.parameterMap && (a = c.parameterMap.LIVE2D);
    c = {};
    c.id = a ? a : "101799";
    c.x = 150;
    c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
    c.type = 1;
    c.key = "idle";
    f.startL2d(c)
  };
  m.Model.extend();
  return m.View.extend(
  {
    className: "shopItemWrap commonFrame4",
    events: function()
    {
      var a = {};
      a[b.cgti] = this.tapped;
      a[b.cgti + " .itemDetailPopup"] = this.itemDetailPopup;
      return a
    },
    initialize: function()
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(this.rootView, "haveNumberAllCheck", this.toggleAction);
      this.listenTo(this.rootView, "conditionChecks", this.conditionCheck);
      this.hasNum = 0
    },
    render: function()
    {
      var a = b.getIconImgPath(this.model.needItemId, !1),
        c = !1;
      this.model.consumeType && "PURCHASED_MONEY" === this.model.consumeType && (c = !0);
      this.$el.html(this.template(
      {
        model: this.model,
        costImage: a,
        purchasedFlg: c
      }));
      g.prototype.touchstartEvent = this.detailTouchStart;
      this.itemImgPartsView = new g(
      {
        model: this.model,
        type: this.model.shopItemType,
        isHideQuantity: !0
      });
      this.el.appendChild(this.itemImgPartsView.render().el);
      this.toggleAction();
      this.model.recommend && b.addClass(this.el.getElementsByClassName("recommend")[0], "on");
      this.model.alreadyGet && (b.addClass(this.el, "off"), b.addClass(this.el, "thisHad"));
      this.model.limitedNumber && this.userShopModel && (this.el.getElementsByClassName("itemAmountNumber")[0].innerText = this.model.limitedNumber - this.userShopModel.num + "/" + this.model.limitedNumber, 0 === this.model.limitedNumber - this.userShopModel.num && b.addClass(this.el, "off"));
      return this
    },
    toggleAction: function()
    {
      this.conditionCheck();
      switch (this.model.shopItemType)
      {
        case "CARD":
          if (this.model.alreadyGet || b.storage.userCharaList.findWhere(
            {
              charaId: this.model.card.charaNo
            })) this.hasNum = 1;
          this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
          break;
        case "ITEM":
          b.storage.userItemList.findWhere(
          {
            itemId: this.model.item.itemCode
          }) && (this.hasNum = b.storage.userItemList.findWhere(
          {
            itemId: this.model.item.itemCode
          }).toJSON().quantity);
          this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
          break;
        case "GIFT":
          b.storage.userGiftList.findWhere(
          {
            giftId: this.model.gift.id
          }) && (this.hasNum = b.storage.userGiftList.findWhere(
          {
            giftId: this.model.gift.id
          }).toJSON().quantity);
          this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
          break;
        case "GEM":
          var a = b.storage.userCharaList.findWhere(
          {
            charaId: Number(this.model.genericId)
          });
          this.hasNum = a ? a.toJSON().lbItemNum ? a.toJSON().lbItemNum : 0 : 0;
          this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
          break;
        case "LIVE2D":
          this.hasNum = b.storage.userLive2dList.findWhere(
          {
            charaId: Number(this.model.chara.id),
            live2dId: this.model.live2d.live2dId
          }) ? 1 : 0;
          this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
          break;
        case "FORMATION_SHEET":
          this.hasNum = b.storage.userFormationSheetList.findWhere(
          {
            formationSheetId: Number(this.model.formationSheet.id)
          }) ? 1 : 0;
          this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
          break;
        case "SET":
          switch (a = this.model.rewardCode.split(","), (-1 < a[0].indexOf("RICHE_") || 1 < a.length) && b.addClass(this.el.getElementsByClassName("had_dl")[0], "none"), a = a[0].split("_"), a[0])
          {
            case "ITEM":
              var c = a.length - 1;
              if (0 === c) break;
              for (var d = "", e = 1; e < c; e++) d = "" !== d ? d + "_" + a[e] : a[e];
              b.storage.userItemList.findWhere(
              {
                itemId: d
              }) && (this.hasNum = b.storage.userItemList.findWhere(
              {
                itemId: d
              }).toJSON().quantity);
              this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum;
              break;
            case "GIFT":
              b.storage.userGiftList.findWhere(
              {
                giftId: a[1] | 0
              }) && (this.hasNum = b.storage.userGiftList.findWhere(
              {
                giftId: a[1] | 0
              }).toJSON().quantity), this.el.getElementsByClassName("itemHasNumber")[0].textContent = this.hasNum
          }
      }
    },
    detailTouchStart: function(b)
    {
      if ("CARD" === this.model.shopItemType) this.model.maxLevel = n.getMaxLevel(this.model.card.rank),
        this.model.maxStatus = n.getAfterParam(this.model.card.cardId, this.model.chara, null, this.model.maxLevel), h.shopCardDetailPopup(b, this.model, p);
      else if ("PIECE" === this.model.shopItemType || "MAXPIECE" === this.model.shopItemType) this.model.closeEvent = p, k.maxParamPopup(b, this.model, !0, !0, !0)
    },
    tapped: function(a)
    {
      if ("CARD" === this.model.shopItemType)
      {
        if (h.popupTimerStop(), b.detailView) return
      }
      else if ("PIECE" === this.model.shopItemType || "MAXPIECE" === this.model.shopItemType)
        if (k.popupTimerStop(), b.detailPopup) return;
      if (!b.isScrolled())
      {
        a.preventDefault();
        f.startSe(1002);
        a = this.rootView.popupTemplate;
        var c = "popupShop forItem";
        !this.model.consumeType || "PURCHASED_MONEY" !== this.model.consumeType && "MONEY" !== this.model.consumeType || (a = this.rootView.popupTemplateMoney, c = "popupShop forMoney");
        g.prototype.touchstartEvent = null;
        var d = new g(
        {
          model: this.model,
          type: this.model.shopItemType,
          isHideQuantity: !0
        });
        new b.PopupClass(
        {
          title: " ",
          content: "",
          exClass: c
        }, null, function()
        {
          var a = b.doc.getElementById("popupInfoDetailTitle");
          a.style.fontSize = "20px";
          a.innerText = this.model.name
        }.bind(this), function()
        {
          d.removeView()
        });
        c = new this.rootView.popupView;
        c.parentView = this;
        c.template = a;
        a = c.render().el;
        a.getElementsByClassName("itemPopMiniWrap")[0].appendChild(d.render().el);
        b.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(a);
        this.model.limitedNumber && this.userShopModel && (b.doc.getElementById("popupArea").getElementsByClassName("itemAmountNumber")[0].innerText = this.model.limitedNumber - this.userShopModel.num + "/" + this.model.limitedNumber, 1 > this.model.limitedNumber - this.userShopModel.num && b.addClass(b.doc.getElementById("purchaseDecide"), "off"));
        ("SET" !== this.model.shopItemType || "SET" === this.model.shopItemType && -1 === this.model.rewardCode.indexOf(",") && -1 === this.model.rewardCode.indexOf("RICHE")) && "PIECE" !== this.model.shopItemType && "MAXPIECE" !== this.model.shopItemType && (this.toggleAction(), b.doc.getElementById("popupArea").getElementsByClassName("hasAmount")[0].innerText = this.hasNum);
        f.getBaseData(b.getNativeObj())
      }
    },
    amountChange: function(a, c)
    {
      this.toggleAction();
      if (this.model.limitedNumber)
        if (a = l.findWhere(a,
          {
            shopItemId: this.model.id
          }), this.userShopModel ? this.userShopModel.num = this.userShopModel.num + c | 0 : this.userShopModel = a, this.rootView.buyNum[this.rootView.currentShopModel.shopId] = this.rootView.buyNum[this.rootView.currentShopModel.shopId] ? this.rootView.buyNum[this.rootView.currentShopModel.shopId] + c : c, c = this.model.limitedNumber - this.userShopModel.num | 0, this.el.getElementsByClassName("itemAmountNumber")[0].innerText = c + "/" + this.model.limitedNumber, 0 === c && (b.addClass(this.el, "off"), "LIVE2D" === this.model.shopItemType && b.storage.userLive2dList ? b.storage.userLive2dList.findWhere(
          {
            charaId: this.model.live2d.charaId,
            live2dId: this.model.live2d.live2dId
          }) && (this.model.alreadyGet = !0) : "ITEM" === this.model.shopItemType && "BACKGROUND" === this.model.item.itemType ? b.storage.userItemList.findWhere(
          {
            itemId: this.model.item.itemCode
          }) && (this.model.alreadyGet = !0) : "FORMATION_SHEET" === this.model.shopItemType ? b.storage.userFormationSheetList.findWhere(
          {
            formationSheetId: this.model.formationSheet.id
          }) && (this.model.alreadyGet = !0) : "CARD" === this.model.shopItemType && "SELECTABLE_UNOWNED_CHARA" === this.rootView.currentShopModel.shopType && b.storage.userCharaList.findWhere(
          {
            charaId: this.model.card.charaNo
          }) && (this.model.alreadyGet = !0), this.model.alreadyGet && b.addClass(this.el, "thisHad")), c = function()
          {
            for (var a = b.doc.getElementById("btnWrap").getElementsByClassName("shopBtn"), c = 0; c < a.length; ++c)
              if (a[c].classList.contains("current"))
              {
                a[c].remove();
                break
              } $(a[0]).trigger(b.cgti);
            b.scrollSetX("btnWrap", "btnScrollInner")
          }, -1 < this.rootView.currentShopModel.shopType.indexOf("COMPLETE_INVISIBLE"))
        {
          a = b.doc.getElementById(String(this.rootView.currentShopModel.shopId)).getElementsByClassName("shopItemWrap");
          for (var d = !0, e = 0; e < a.length; e++)
            if (!a[e].classList.contains("off"))
            {
              d = !1;
              break
            } d && c()
        }
      else a = this.rootView.currentShopModel.totalRecommend, 0 < a && (this.rootView.buyNum[this.rootView.currentShopModel.shopId] | 0) >= a && c()
    },
    itemDetailPopup: function(a)
    {
      if (this.model.isDetailView)
      {
        if ("CARD" === this.model.shopItemType)
        {
          if (h.popupTimerStop(), b.detailView) return
        }
        else if ("PIECE" === this.model.shopItemType || "MAXPIECE" === this.model.shopItemType)
          if (k.popupTimerStop(), b.detailPopup) return;
        a.preventDefault();
        a.stopPropagation();
        b.isScrolled() || new b.PopupClass(
        {
          title: "セット内容",
          content: "<img class='detailImg' src='/magica/resource/image_web/page/shop/detail/" + this.model.genericId.toLowerCase() + ".png'>",
          popupType: "typeB",
          exClass: "popupDetail"
        }, null, null, null)
      }
    },
    conditionCheck: function(a)
    {
      this.model.openConditionIdList && (a && 0 === !this.model.openConditionIdList.indexOf(a) || (this.rootView.conditionFlag(this.model.shopId, this.model.openConditionIdList) ? b.removeClass(this.el, "none") : b.addClass(this.el, "none")))
    },
    removeView: function()
    {
      this.itemImgPartsView && this.itemImgPartsView.removeView();
      this.off();
      this.remove()
    }
  })
});
