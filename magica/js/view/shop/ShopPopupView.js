define("underscore backbone backboneCommon ajaxControl js/card/CardPopup command js/view/item/ItemImgPartsView".split(" "), function(l, t, a, r, w, u, v)
{
  function p(b)
  {
    b = b.totalCost;
    if (q)
    {
      var d = a.calcExpendStone(
      {
        quantity: b,
        isPurchasedMoneyOnly: m
      });
      l.map(d, function(a, c)
      {
        $("#remain_" + c).html('<span class="arrow">&#9654;</span>' + a);
        $("#remain_" + c).removeClass("same")
      });
      l.map(k.have, function(a, c)
      {
        a == d[c] && $("#remain_" + c).addClass("same")
      })
    }
  }
  var n = !1,
    m = !1,
    q = !1,
    k = {};
  return t.View.extend(
  {
    className: "shopPopup",
    events: function()
    {
      var b = {};
      b[a.cgti + " #purchaseDecide"] = this.purchaseDecide;
      b[a.cgti + " #amountPlus"] = this.amountPlus;
      b[a.cgti + " #amountMinus"] = this.amountMinus;
      b[a.cgti + " .maxBtn"] = this.amountMax;
      return b
    },
    initialize: function()
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.amounts = 1;
      this.tapCount = 0
    },
    render: function()
    {
      var b = 0;
      m = q = !1;
      var d = this.parentView.model.needNumber * this.amounts,
        h = "-";
      switch (this.parentView.model.needItemId)
      {
        case "MONEY":
          q = !0;
          k.have = a.getTotalStone();
          this.parentView.model.consumeType && "PURCHASED_MONEY" === this.parentView.model.consumeType ? (m = !0, b = k.have.userMoney) : b = k.have.totalMoney;
          b < this.parentView.model.needNumber && (d = 0);
          var c = a.getDateShortening(
            {
              date: this.parentView.model.viewStartAt
            }),
            f = a.getDateShortening(
            {
              date: this.parentView.model.endAt
            });
          c && f ? (h = "" + (c.yr + "/" + c.mo + "/" + c.da + " " + c.ho + ":" + c.mi), h = h + " 〜 " + (f.yr + "/" + f.mo + "/" + f.da + " " + f.ho + ":" + f.mi)) : c ? h = "-" : f && (h = " 〜 " + (f.yr + "/" + f.mo + "/" + f.da + " " + f.ho + ":" + f.mi));
          k.enoughClass = {
            totalMoney: "colorChange",
            userMoney: ""
          };
          m && (k.enoughClass = {
            totalMoney: "",
            userMoney: "colorChange"
          });
          break;
        case "ARENA_COIN":
          b = (b = a.storage.userItemList.findWhere(
          {
            itemId: "ARENA_COIN"
          })) ? b.toJSON().quantity : 0;
          break;
        case "YELL":
          b = (b = a.storage.userItemList.findWhere(
          {
            itemId: "YELL"
          })) ? b.toJSON().quantity : 0;
          break;
        case "PRISM":
          b = a.storage.userItemList.findWhere(
          {
            itemId: "PRISM"
          }) ? a.storage.userItemList.findWhere(
          {
            itemId: "PRISM"
          }).toJSON().quantity : 0;
          break;
        case "RICHE":
          b = a.storage.gameUser.toJSON().riche;
          break;
        default:
          b = a.storage.userItemList.findWhere(
          {
            itemId: this.parentView.model.needItemId
          }) ? a.storage.userItemList.findWhere(
          {
            itemId: this.parentView.model.needItemId
          }).toJSON().quantity : 0
      }
      c = Math.floor(b / this.parentView.model.needNumber) | 0;
      this.canPurchaseNum = this.parentView.model.limitedNumber ? this.parentView.userShopModel ? Number(this.parentView.model.limitedNumber) - Number(this.parentView.userShopModel.num) | 0 : Number(this.parentView.model.limitedNumber) : Infinity;
      this.maxNumber = this.parentView.model.limitedNumber ? Math.min(c, this.canPurchaseNum | 0) : c;
      c = a.getIconImgPath(this.parentView.model.needItemId, !1);
      this.$el.html(this.template(
      {
        model: this.parentView.model,
        maxNumber: this.maxNumber,
        setVal: b,
        costImage: c,
        moneyObj: k,
        termText: h,
        purchasedFlg: m
      }));
      q && setTimeout(function()
      {
        p(
        {
          totalCost: d
        })
      }, 50);
      return this
    },
    purchaseDecide: function(b)
    {
      b.preventDefault();
      if (!(a.isScrolled() || n || 0 < this.tapCount))
      {
        this.tapCount++;
        var d = this.parentView.model;
        a.addClass(a.doc.getElementById("purchaseDecide"), "cantTap");
        if (d.endAt)
        {
          b = Date.parse(d.endAt) / 1E3;
          var h = Date.parse(r.getPageJson().currentTime) / 1E3 + ((Date.parse(new Date) / 1E3 | 0) - this.parentView.rootView.shopLimitCounter);
          if (b < h)
          {
            new a.PopupClass(
            {
              title: "アイテム購入",
              content: "期間外のため<br>対象のアイテムを購入することはできません",
              closeBtnText: "OK",
              exClass: "popupShop"
            });
            this.tapCount = 0;
            return
          }
        }
        if (this.canPurchaseNum < this.amounts) new a.PopupClass(
        {
          title: "アイテム購入",
          content: "購入可能上限に達しています。",
          closeBtnText: "OK",
          exClass: "popupShop"
        }), this.tapCount = 0;
        else if (1 > this.maxNumber) b = this.parentView.model.consumeType && "PURCHASED_MONEY" === this.parentView.model.consumeType ? "マギアストーン(有償)" : a.storage.itemList.findWhere(
        {
          itemCode: this.parentView.model.needItemId
        }) ? a.storage.itemList.findWhere(
        {
          itemCode: this.parentView.model.needItemId
        }).toJSON().name : "購入に必要なアイテム", new a.PopupClass(
        {
          title: "アイテム購入",
          content: b + "が<br>不足しています。",
          closeBtnText: "OK",
          exClass: "popupShop"
        }), this.tapCount = 0;
        else if (1 > this.amounts) new a.PopupClass(
        {
          title: "アイテム購入",
          content: "購入個数を選択してください。",
          closeBtnText: "OK",
          exClass: "popupShop"
        }), this.tapCount = 0;
        else
        {
          n = !0;
          var c = this;
          b = {
            shopId: d.shopId,
            shopItemId: d.id,
            num: this.amounts
          };
          1 < this.tapCount || r.ajaxPost(a.linkList.shopBuy, b, function(b)
          {
            if ("error" !== b.resultCode)
            {
              a.responseSetStorage(b);
              var e, g = 0;
              switch (c.parentView.model.shopItemType)
              {
                case "CARD":
                  e = c.parentView.model.card.cardName;
                  c.parentView.model.chara && c.parentView.model.chara.title && (e += "(" + c.parentView.model.chara.title + ")");
                  g = "1体";
                  break;
                case "PIECE":
                case "MAXPIECE":
                  e = c.parentView.model.piece.pieceName;
                  g = a.storage.userPieceList.findWhere(
                  {
                    pieceId: Number(c.parentView.model.piece.pieceId)
                  }).length + "枚";
                  break;
                case "ITEM":
                  e = c.parentView.model.item.name;
                  g = l.findWhere(b.userItemList,
                  {
                    itemId: c.parentView.model.genericId
                  });
                  g = g.quantity + g.item.unit;
                  break;
                case "GIFT":
                  e = c.parentView.model.gift.name;
                  g = l.findWhere(b.userGiftList,
                  {
                    giftId: Number(c.parentView.model.genericId)
                  }).quantity + "個";
                  break;
                case "SET":
                  e = c.parentView.model.name;
                  g = null;
                  break;
                case "GEM":
                  g = l.findWhere(b.userCharaList,
                  {
                    charaId: Number(c.parentView.model.genericId)
                  });
                  e = c.parentView.model.name;
                  g = g.lbItemNum + "個";
                  break;
                case "FORMATION_SHEET":
                  e = c.parentView.model.formationSheet.name;
                  g = "1個";
                  break;
                case "LIVE2D":
                  e = c.parentView.model.name, g = "1個"
              }
              var f = l.template($("#completePop").text()),
                h = new v(
                {
                  model: c.parentView.model,
                  type: c.parentView.model.shopItemType,
                  isHideQuantity: !0
                });
              new a.PopupClass(
              {
                title: "購入完了",
                content: f(
                {
                  model: c.parentView.model,
                  itemName: e,
                  hasNum: g
                }),
                closeBtnText: "OK",
                exClass: "completePop"
              }, null, null, function()
              {
                h.removeView()
              });
              a.doc.getElementById("commonItemImgParent").appendChild(h.render().el);
              u.getBaseData(a.getNativeObj());
              c.tapCount = 0;
              n = !1;
              c.parentView.amountChange(b.userShopItemList, c.amounts);
              c.parentView.rootView.conditionCheck(c.parentView.model.id);
              "SELECTABLE_UNOWNED_CHARA" === c.parentView.rootView.currentShopModel.shopType && (b = c.parentView.rootView.currentShopModel.name.replace(/＠/g, ""), e = c.parentView.rootView.getShopItemNum(d.shopId), b = e.listNum === e.thisHadNum ? b + "　（オファー：COMPLETE）" : b + ("　(オファー可能：" + (e.listNum - e.thisHadNum) + "/" + e.listNum + "）"), a.doc.getElementById("listTitle").innerHTML = b)
            }
          });
          setTimeout(function()
          {
            c && 0 < c.tapCount && (n = !1, c.tapCount = 0)
          }, 1E3)
        }
      }
    },
    amountPlus: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !b.currentTarget.classList.contains("off"))
      {
        this.amounts++;
        var d = this.amounts * (this.parentView.model.needNumber | 0);
        a.doc.getElementById("amountSelects").innerText = this.amounts;
        a.doc.getElementById("totalCost").innerText = d;
        a.removeClass(a.doc.getElementById("amountMinus"), "off");
        a.removeClass(a.doc.getElementById("purchaseDecide"), "off");
        p(
        {
          totalCost: d
        });
        this.amounts >= this.maxNumber && a.addClass(b.currentTarget, "off")
      }
    },
    amountMinus: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !b.currentTarget.classList.contains("off"))
      {
        this.amounts--;
        var d = this.amounts * (this.parentView.model.needNumber | 0);
        a.doc.getElementById("amountSelects").innerText = this.amounts;
        a.doc.getElementById("totalCost").innerText = d;
        a.removeClass(a.doc.getElementById("amountPlus"), "off");
        p(
        {
          totalCost: d
        });
        2 > this.amounts && a.addClass(b.currentTarget, "off")
      }
    },
    amountMax: function(b)
    {
      b.preventDefault();
      a.isScrolled() || b.currentTarget.classList.contains("off") || 1 > this.maxNumber || (this.amounts = this.maxNumber, b = this.amounts * (this.parentView.model.needNumber | 0), a.doc.getElementById("amountSelects").innerText = this.amounts, a.doc.getElementById("totalCost").innerText = b, a.removeClass(a.doc.getElementById("amountMinus"), "off"), a.removeClass(a.doc.getElementById("purchaseDecide"), "off"), p(
      {
        totalCost: b
      }), a.addClass(a.doc.getElementById("amountPlus"), "off"))
    },
    removeView: function()
    {
      n = !1;
      this.off();
      this.remove()
    }
  })
});
