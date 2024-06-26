define("underscore backbone backboneCommon ajaxControl command cardUtil text!css/gacha/GachaResult.css text!css/gacha/GachaTop.css text!template/gacha/GachaResult.html js/view/gacha/GachaBtnView js/memoria/MemoriaPopup js/card/CardPopup js/gacha/GachaSaleSettingPopupView js/view/item/ItemImgPartsView".split(" "), function(h, q, b, t, m, u, x, y, z, v, A, B, C, r)
{
  var D = q.Model.extend(
    {}),
    f, n, c, k, p, F = q.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #onceMore"] = this.gachaPop;
        a[b.cgti + " #saleSettingBtn"] = this.saleSetting;
        return a
      },
      initialize: function(a)
      {
        b.reGacha = null;
        this.drawFlg = !1;
        a = {};
        a.userGachaGroup = p.gachaAnimation.userGachaGroup || null;
        a.pieceCapacity = f.gameUser.cardCapacity;
        a.hasPieceNum = f.userPieceList.length;
        a.hasCardNum = f.userCharaList.length;
        a.playedGachaType = b.playedGachaType;
        a.playedGacha = c || null;
        if (k)
        {
          a.gachaFreebieId = k;
          var l = b.storage.userItemList.findWhere(
          {
            itemId: k
          });
          a.freebieIconPath = b.getIconImgPath(k, !0);
          a.freebieNum = l ? l.toJSON().quantity : 0
        }
        this.model = a;
        this.nowGacha = c || null;
        this.template = h.template(z);
        v.prototype.parentView = this;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        this.createView();
        if (c && c.bonusRewardList) $(b.ready.content).on("webkitAnimationEnd", function(a)
        {
          "readyFadeIn" == a.originalEvent.animationName && ($(b.ready.content).off(), new E)
        });
        b.ready.hide();
        b.toastStop = !1;
        b.toastTriggerAppear()
      },
      createView: function()
      {
        w.prototype.rootView = this;
        new w(
        {
          model: p,
          el: b.doc.getElementById("cardWrap")
        });
        if (c && b.playedGachaPrm)
        {
          var a;
          b.doc.createDocumentFragment();
          var l = b.getTotalStone();
          h.each(c.gachaKindList, function(d, e)
          {
            if (b.playedGachaPrm.gachaBeanKind == d.beanKind)
            {
              e = null;
              if (d.substituteItemId)
              {
                var g = b.storage.userItemList.findWhere(
                {
                  itemId: d.substituteItemId
                });
                e = g ? g.toJSON() : null;
                g && (e.subItemFlag = !0);
                e = e && 0 < e.quantity ? e : !1
              }
              if (!e) switch (d.needPointKind)
              {
                case "PURCHASED_MONEY":
                  e = {
                    item:
                    {
                      name: "有償マギアストーン",
                      shortDescription: "有償マギアストーン",
                      itemCode: "PURCHASED_MONEY",
                      unit: "個"
                    },
                    quantity: l.userMoney,
                    moneyObj: l
                  };
                  break;
                case "MONEY":
                  e = {
                    item:
                    {
                      name: "マギアストーン",
                      shortDescription: "マギアストーン",
                      itemCode: "MONEY",
                      unit: "個"
                    },
                    quantity: l.totalMoney,
                    moneyObj: l
                  };
                  break;
                case "YELL":
                  e = (e = b.storage.userItemList.findWhere(
                  {
                    itemId: "YELL"
                  })) ? e.toJSON() :
                  {
                    item:
                    {
                      name: "サポートPt",
                      shortDescription: "サポートPt",
                      itemCode: "YELL",
                      unit: "Pt"
                    },
                    quantity: 0
                  };
                  break;
                case "ITEM":
                  e = (e = b.storage.userItemList.findWhere(
                  {
                    itemId: d.itemId
                  })) ? e.toJSON() :
                  {
                    item: d.item,
                    quantity: 0
                  }
              }
              d.userUseItem = e;
              void 0 != f.userGachaKindList && (d.userGachaKind = h.findWhere(f.userGachaKindList,
              {
                gachaKindId: d.gachaKindId
              }) || null, d.userGachaKind && d.userGachaKind.gachaKind && "ADDITIONAL" != d.userGachaKind.gachaKind.type && (d.userGachaKind = null));
              a = d;
              d.viewStartAt = c.viewStartAt;
              d.viewEndAt = c.viewEndAt;
              "STARTDASH" === c.gachaType && (d.viewStartAt = b.getAddDate(
              {
                date: f.gameUser.startdashGachaExpiredAt,
                type: "date",
                amount: -7
              }), d.viewEndAt = f.gameUser.startdashGachaExpiredAt);
              "STARTDASH_MEMORIA" === c.gachaType && (d.viewStartAt = b.getAddDate(
              {
                date: f.gameUser.startdashMemoriaGachaExpiredAt,
                type: "date",
                amount: -7
              }), d.viewEndAt = f.gameUser.startdashMemoriaGachaExpiredAt);
              "RARE" === c.gachaType && (d.viewStartAt = "", d.viewEndAt = "");
              new v(
              {
                model: new D(d),
                el: b.doc.querySelector("#onceMore")
              })
            }
          });
          if (a && a.userGachaKind)
          {
            var g = ("00" + (a.userGachaKind.canRemainCount - a.userGachaKind.totalCount)).slice(-2);
            b.doc.querySelector("#onceMore").classList.add("freeBtn");
            "0" != g[0] && b.doc.querySelector("#bageTextArea").classList.add("doubledigit");
            "0" == g[0] ? b.doc.querySelector("#bageTextArea .number1").classList.add("none") : b.doc.querySelector("#bageTextArea .number1").classList.add("num" + g[0]);
            b.doc.querySelector("#bageTextArea .number2").classList.add("num" + g[1])
          }!a || a.gachaKindId !== b.playedGachaKindId || b.freeNormalGacha || c.viewParameterMap && c.viewParameterMap.IMAGE_DETAIL || "DAILY" === a.beanKind || "STARTDASH_MEMORIA" === this.model.playedGachaType || "STARTDASH" === this.model.playedGachaType || (b.doc.querySelector("#onceMore").style.display = "block")
        }
      },
      saleSetting: function(a)
      {
        a.preventDefault();
        b.isScrolled() || C.instantPopup()
      }
    }),
    w = q.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .cardChild"] = this.detailPopup;
        return a
      },
      initialize: function(b)
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.render()
      },
      render: function()
      {
        var a = this.model.gachaAnimation.gachaResultList,
          l = h.template($("#gachaResultParts").text());
        u.createCardList();
        var g = [];
        this.model.userPieceList && h.each(this.model.userPieceList, function(b, a)
        {
          0 > p.gachaAnimation.autoSalePieceIdList.indexOf(b.id) && (a = {}, a.id = b.id, a.pieceId = b.pieceId, g.push(a))
        });
        var d = b.doc.createDocumentFragment(),
          e;
        h.each(a, function(a, c)
        {
          e = b.doc.createElement("div");
          e.className = "cardChild";
          c = {};
          c.isNew = a.isNew;
          c.type = a.type;
          c.price = a.price;
          switch (a.type)
          {
            case "CARD":
              c.charaId = a.charaId;
              a.itemId && (c.itemId = a.itemId, c.item = "on", a.extraItemId && (c.item += " up"));
              1042 === c.charaId && (c.dispName = b.storage.user.get("loginName"));
              c.attributeId = a.attributeId;
              c.rarity = a.rarity;
              c.key = "card_" + a.cardId + "_c";
              c.src = "resource/image_native/card/image/card_" + a.cardId + "_c.png";
              e.dataset.typeId = "card_" + c.charaId;
              break;
            case "PIECE":
              c.item = "";
              c.key = "memoria_" + a.pieceId + "_c";
              c.src = "resource/image_native/memoria/memoria_" + a.pieceId + "_c.png";
              if (!c.price)
              {
                var f = h.findWhere(g,
                {
                  pieceId: a.pieceId
                });
                e.dataset.typeId = "memoria_" + f.id;
                g.splice(h.findIndex(g, f), 1)
              }
              break;
            case "ITEM":
              c.item = "", c.key = a.itemId.toLowerCase(), c.rarity = a.rarity, c.src = "resource/image_native/item/" + a.itemId.toLowerCase() + "_b.png", e.dataset.typeId = a.itemId
          }
          e.innerHTML = l(
          {
            model: c
          });
          a.extraItemId && (this.itemImgPartsView = new r(
          {
            model: a.extraReward,
            type: a.extraReward.presentType
          }), e.appendChild(this.itemImgPartsView.render().el));
          d.appendChild(e)
        }.bind(this));
        b.doc.getElementById("cardWrap").appendChild(d);
        1 === a.length && b.addClass(b.doc.getElementById("cardWrap"), "cardOne");
        b.doc.querySelector("#backLinkBtn").dataset.href = "#/GachaTop";
        if (c)
        {
          a = null;
          if (c.viewParameterMap && c.viewParameterMap.IMAGE_DETAIL)
          {
            var k = h.find(f.gachaScheduleList, function(a)
            {
              return a.gachaGroupId === c.gachaGroupId && !0 === a.enable
            });
            k && (a = k.id)
          }
          else a = c.id;
          a && (b.doc.querySelector("#backLinkBtn").dataset.href = "#/GachaTop/" + a)
        }
        m.getBaseData(b.getNativeObj())
      },
      detailPopup: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = a.currentTarget.dataset.typeId;
          c && (c = c.split("_"), -1 < c[0].indexOf("card") ? (c = b.storage.userCardListEx.findWhere(
          {
            charaId: c[1] | 0
          }).toJSON(), B.instantPopup(a, c)) : -1 < c[0].indexOf("memoria") && (c = b.storage.userPieceList.findWhere(
          {
            id: c[1]
          }).toJSON(), A.instantPopup(a, c, !0)))
        }
      },
      removeView: function()
      {
        this.itemImgPartsView && this.itemImgPartsView.removeView();
        this.off();
        this.remove()
      }
    }),
    E = q.View.extend(
    {
      className: function()
      {
        var a = "bonusRewardWrap noTap";
        1 === c.bonusRewardList.length && (a += " singleDraw");
        1024 !== b.displayWidth && (a += " iPhoneX");
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti] = this.closeResult;
        return a
      },
      initialize: function(a)
      {
        this.template = h.template($("#bonusRewardTemp").text());
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      createDom: function()
      {
        b.doc.querySelector("#overlapContainer").appendChild(this.render().el);
        b.doc.getElementById("curtain").className = "show";
        var a = b.doc.getElementById("bonusRewardWrap");
        r.prototype.rootView = n;
        h.each(c.bonusRewardList, function(b)
        {
          b = new r(
          {
            model: b,
            type: b.presentType
          });
          a.appendChild(b.render().el)
        });
        m.getBaseData(b.getNativeObj());
        setTimeout(function()
        {
          this.el.classList.remove("noTap");
          b.doc.getElementById("bonusRewardCautionWrap").classList.remove("hide")
        }.bind(this), 600);
        m.startSe(1603)
      },
      closeResult: function(a)
      {
        a.preventDefault();
        b.isScrolled() || this.el.classList.contains("noTap") || (this.el.classList.add("close"), b.doc.getElementById("bonusRewardCautionWrap").classList.add("hide"), setTimeout(function()
        {
          b.doc.getElementById("curtain").className = "";
          this.removeView()
        }.bind(this), 600))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "giftList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userPatrolList"
    },
    {
      id: "userGachaKindList",
      refresh: !0
    }],
    fetch: function(a)
    {
      m.setWebView();
      if (a)
        if (b.tutorialId = a, b.tutorialUtil) b.tutorialUtil.tutorialIdRegist(b.tutorialId), b.tutorialUtil.tutorialAddClass(b.tutorialId);
        else
        {
          m.nativeReload("#/TopPage");
          return
        } t.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      f = t.getPageJson();
      b.setStyle(x + y);
      u.createCardList();
      b.gachaResultJson ? (c = h.findWhere(f.gachaScheduleList,
      {
        id: b.gachaDisp
      }), p = b.gachaResultJson, b.gachaResultJson = {}, c && (k = c.viewParameterMap && c.viewParameterMap.FREEBIE ? c.viewParameterMap.FREEBIE : null), n = new F) : m.nativeReload("#/TopPage")
    },
    startCommand: function()
    {
      m.startBgm(b.settingBgm);
      m.changeBg("web_0017.ExportJson")
    },
    remove: function(a)
    {
      n && ($("#popupArea").off(), n.trigger("removeView"), n.remove());
      b.reGacha || (b.androidKeyStop = !1);
      $(b.ready.content).off("webkitAnimationEnd");
      $(b.ready.content).on("webkitAnimationEnd", function(a)
      {
        "readyFadeIn" == a.originalEvent.animationName && (b.tapBlock(!1), b.scrollRefresh(null, null, null, !0))
      });
      c = p = k = b.freeNormalGacha = null;
      a()
    }
  }
});
