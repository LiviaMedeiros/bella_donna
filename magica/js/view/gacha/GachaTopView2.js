define("underscore backbone backboneCommon ajaxControl command memoriaUtil text!template/gacha/GachaTop.html js/gacha/GachaProbability js/view/gacha/GachaBtnView".split(" "), function(d, n, b, v, g, t, w, x, p)
{
  var u = n.Model.extend(
    {}),
    m, l, h, y = n.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #leftArrow"] = this.gachaChange;
        a[b.cgti + " #rightArrow"] = this.gachaChange;
        a["webkitTransitionEnd #gachaWrap #onDisp"] = this.charaImageAnimationEnd;
        a["webkitanimationend #gachaWrap .onDisp"] = this.charaImageAnimationEnd;
        a["webkitAnimationEnd #gachaWrap .onDisp"] = this.charaImageAnimationEnd;
        a["animationend #gachaWrap .onDisp"] = this.charaImageAnimationEnd;
        a["touchstart #gachaWrap"] = this.swipeStart;
        a["touchmove #gachaWrap"] = this.swipeing;
        a["touchend #gachaWrap"] = this.swipeEnd;
        return a
      },
      swipeStart: function(a)
      {
        2 > this.gachaScheduleList.length || (this.touching = !0, this.touchPoint = a.originalEvent.changedTouches[0].clientX)
      },
      swipeing: function(a)
      {
        if (!(!this.touching || 2 > this.gachaScheduleList.length || (a = a.originalEvent.changedTouches[0].clientX - this.touchPoint, 250 > a && -250 < a)))
        {
          this.touching = !1;
          g.startSe(1002);
          var b = 0; - 250 > a ? b = 1 : 250 < a && (b = -1);
          this.gachaChange(null, b)
        }
      },
      swipeEnd: function(a)
      {
        !this.touching || 2 > this.gachaScheduleList.length || (this.touching = !1)
      },
      initialize: function(a)
      {
        h = v.getPageJson();
        var c = [];
        d.each(h.gachaScheduleList, function(a, b)
        {
          a = d.clone(a);
          a.gachaGroupId && (b = d.findWhere(h.userGachaGroupList,
          {
            gachaGroupId: a.gachaGroupId
          }) || null) && (a.gachaGroup = b);
          if (void 0 != h.userGachaKindList)
          {
            b = [];
            for (var e = 0; e < a.gachaKindList.length; e++) b = d.findWhere(h.userGachaKindList,
            {
              gachaKindId: a.gachaKindList[e].gachaKindId
            }) || null, null != b && b.gachaKind && "ADDITIONAL" == b.gachaKind.type && (a.gachaKindList[e].userGachaKind = b)
          } - 1 !== a.gachaType.indexOf("SELECTABLE_MEMORIA") && d.each(a.selectablePieceList, function(a)
          {
            a.piece = {
              attack: a.attack,
              defense: a.defense,
              hp: a.hp,
              rank: a.rank
            };
            a.maxLevel = t.getMaxLevel(a.rank, 4);
            var b = t.getParam(a, a.maxLevel);
            a.maxAttack = b.attack;
            a.maxDefense = b.defense;
            a.maxHp = b.hp
          });
          c.push(a)
        });
        this.gachaScheduleList = c;
        if (b.gachaDisp)
        {
          var k,
            e;
          if (isFinite(b.gachaDisp)) k = [Number(b.gachaDisp)];
          else if (-1 < b.gachaDisp.indexOf(",") || -1 < b.gachaDisp.indexOf("-"))
          {
            a = b.gachaDisp.split(",");
            k = [];
            for (var f = 0; f < a.length; ++f)
              if (-1 < a[f].indexOf("-"))
                for (var g = a[f].split("-"), l = g[0]; l <= g[1]; ++l) k.push(Number(l));
              else k.push(Number(a[f]))
          }
          else e = b.gachaDisp;
          d.each(this.gachaScheduleList, function(a, b)
          {
            (k && -1 < k.indexOf(a.id) || a.gachaType == e) && !this.gachaIndex && (this.gachaIndex = b)
          }.bind(this));
          void 0 === this.gachaIndex && (new b.PopupClass(
          {
            title: "期間外",
            content: "期間外のため<br>対象のガチャは存在しません",
            closeBtnText: "OK",
            popupType: "typeC"
          }), this.gachaIndex = 0)
        }
        else this.gachaIndex = 0;
        this.template = d.template(w);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(h));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        this.createView();
        this.gachaInit();
        g.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      createView: function()
      {
        q.prototype.parentView = this;
        q.prototype.template = d.template($("#GachaTemp").text());
        this.gachaModel = new u(this.gachaScheduleList[this.gachaIndex]);
        this.gachaView = new q(
        {
          model: this.gachaModel
        });
        b.doc.querySelector("#GachaTop").appendChild(this.gachaView.render().el)
      },
      gachaChange: function(a, c)
      {
        if (a)
        {
          a.preventDefault();
          if (b.isScrolled()) return;
          c = a.currentTarget;
          c = "rightArrow" == c.id ? 1 : -1
        }
        b.selectablePieceIdList = null;
        b.selectablePiece = null;
        b.selectableGachaModel = null;
        a = this.gachaScheduleList.length;
        this.gachaIndex += c;
        this.gachaIndex === a && (this.gachaIndex = 0);
        0 > this.gachaIndex && (this.gachaIndex = a - 1);
        this.gachaModel.clear(
        {
          silent: !0
        });
        this.gachaModel.set(this.gachaScheduleList[this.gachaIndex]);
        this.resetCmd();
        this.gachaInit();
        g.getBaseData(b.getNativeObj())
      },
      charaImageAnimationEnd: function(a)
      {
        if (1 !== this.gachaView.dispCharaDataList.length)
        {
          this.gachaView.dispCharaDataList.length > this.gachaView.dispCharaIndex + 1 ? this.gachaView.dispCharaIndex++ : this.gachaView.dispCharaIndex = 0;
          b.removeClass(b.doc.querySelector(".onDisp"), "onDisp");
          b.addClass(b.doc.querySelector("#card" + this.gachaView.dispCharaIndex), "onDisp");
          a = this.gachaView.dispCharaDataList[this.gachaView.dispCharaIndex];
          var c = b.doc.querySelector("#attribute span"),
            k = b.doc.querySelector("#rare"),
            e = b.doc.querySelector("#charaName"),
            f = b.doc.querySelector("#charaTitle");
          a && (c.className = "type_f " + a.attributeId, k.className = a.rank, e.innerText = 1042 === a.charaNo ? b.storage.user.get("loginName") : a.cardName, f.innerText = a.title || "", this.sdCharaStart())
        }
      },
      gachaInit: function()
      {
        if (-1 !== this.gachaModel.toJSON().gachaType.indexOf("SELECTABLE_MEMORIA"))
          if (g.changeBg("web_0024.ExportJson"), this.gachaView.selectablePieceIdList)
          {
            b.selectablePieceIdList = this.gachaView.selectablePieceIdList;
            var a = [];
            d.each(this.gachaModel.toJSON().displayPieceList, function(b, k)
            {
              a.push(b.pieceId)
            });
            g.displayMemoriaTop(a);
            this.gachaView.displayPieceChange()
          }
        else this.normalGachaStart();
        else switch (g.changeBg("web_0002.jpg"), this.gachaView.sdCharaInit(), this.gachaModel.toJSON().gachaType)
        {
          case "NORMAL":
          case "STARTDASH_MEMORIA":
            this.normalGachaStart();
            break;
          default:
            this.sdCharaStart()
        }
      },
      resetCmd: function()
      {
        m && clearTimeout(m);
        l && clearTimeout(l);
        g.stopNormalGachaMemoria();
        g.stopMemoriaTop();
        this.gachaView.dispCharaIndex = 0;
        this.gachaView.dispPieceIndex = 0;
        g.hideMiniChara()
      },
      normalGachaStart: function()
      {
        var a = {}; - 1 !== this.gachaModel.toJSON().gachaType.indexOf("SELECTABLE_MEMORIA") || "STARTDASH_MEMORIA" === this.gachaModel.toJSON().gachaType ? this.gachaView.selectablePieceIdList ? (a.x = 640, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 80 : Math.ceil(b.shortSize / 2) + 85, a.memoriaIdList = this.gachaView.selectablePieceIdList) : (a.x = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetWidth / 2) : Math.ceil(b.longSize / 2) + 110, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 170 : Math.ceil(b.shortSize / 2) + 125) : (a.x = 640, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 80 : Math.ceil(b.shortSize / 2) + 85);
        a.memoriaIdList || (a.memoriaIdList = function()
        {
          var a = [];
          d.each(this.gachaModel.toJSON().displayPieceList, function(b)
          {
            a.push(b.pieceId)
          });
          return a
        }.call(this));
        m && clearTimeout(m);
        m = setTimeout(function()
        {
          g.playNormalGachaMemoria(a)
        }, 500)
      },
      sdCharaStart: function()
      {
        l && clearTimeout(l);
        var a = this.gachaModel.toJSON();
        if (!(0 >= this.gachaView.dispCharaDataList.length || a.viewParameterMap && a.viewParameterMap.IMAGE_DETAIL || -1 < a.gachaType.indexOf("SELECTABLE_MEMORIA") || "SPECIAL" === a.gachaType || "STARTDASH_MEMORIA" === a.gachaType || "STARTDASH" === a.gachaType))
        {
          var c = {};
          c.id = String(this.gachaView.dispCharaDataList[this.gachaView.dispCharaIndex].charaNo + "00");
          c.y = "SELECTABLE_TUTORIAL" === a.gachaType || "SELECTABLE_PICKUP" === a.gachaType || "SELECTABLE_SPECIAL" === a.gachaType ? 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 210 : Math.ceil(b.shortSize / 2) + 240 : 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 170 : Math.ceil(b.shortSize / 2) + 210;
          1042 == this.gachaView.dispCharaDataList[this.gachaView.dispCharaIndex].charaNo && (c.y -= 90);
          c.x = 1024 === b.displayWidth ? 221 : 290;
          c.fade = .5;
          c.animeList = ["reaction", "stance"];
          g.hideMiniChara();
          l = setTimeout(function()
          {
            g.showMiniChara(c);
            if ("PICKUP" === this.gachaModel.toJSON().gachaType || "ATTRIBUTE" === this.gachaModel.toJSON().gachaType || "TYPE" === this.gachaModel.toJSON().gachaType) l = setTimeout(function()
            {
              this.charaImageAnimationEnd()
            }.bind(this), 7500)
          }.bind(this), 500)
        }
      }
    }),
    q = n.View.extend(
    {
      id: "gachaWrap",
      className: function()
      {
        var a = "",
          b = this.model.toJSON(),
          a = a + b.gachaType;
        b.viewParameterMap && b.viewParameterMap.IMAGE_DETAIL && (a += " STEPUP"); - 1 !== b.gachaType.indexOf("SELECTABLE_MEMORIA") ? this.selectablePieceIdList || (a += " notSelected") : -1 !== b.gachaType.indexOf("SELECTABLE") && (this.selectableCardId || (a += " notSelected"));
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " #selectableBtn"] = this.selectableLink;
        a[b.cgti + " #selectableLinkBtn"] = this.selectableLink;
        a[b.cgti + " #selectablePopBtn"] = this.selectableListPop;
        a["webkitTransitionEnd #displayPieceWrap .displayPiece"] = this.displayPieceChange;
        a["webkitanimationend #displayPieceWrap  .displayPiece"] = this.displayPieceChange;
        a["webkitAnimationEnd #displayPieceWrap  .displayPiece"] = this.displayPieceChange;
        a["animationend #displayPieceWrap .displayPiece"] = this.displayPieceChange;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeView", this.removeView);
        this.listenTo(this.model, "change", this.render);
        this.listenTo(b.storage.userItemList, "change", this.btnReCreate);
        this.model.toJSON();
        p.prototype.parentView = this;
        p.prototype.template = d.template($("#GachaBtnTemp").text());
        r.prototype.parentView = this;
        r.prototype.template = d.template($("#GachaFooterTemp").text());
        this.charaDataTemp = d.template($("#CharaDataTemp").text());
        this.dispCharaIndex = 0;
        this.dispCharaDataList = [];
        this.dispPieceIndex = 0
      },
      btnReCreate: function()
      {
        this.trigger("removeBtnView");
        this.trigger("removeFooterView");
        this.createBtnViews();
        this.createFooterView()
      },
      displayPieceChange: function(a)
      {
        var c = b.doc.getElementById("displayPieceWrap").getElementsByClassName("displayPiece");
        a && b.removeClass(a.currentTarget, "onDispPiece");
        b.addClass(c[this.dispPieceIndex], "onDispPiece");
        this.dispPieceIndex++;
        4 <= this.dispPieceIndex && (this.dispPieceIndex = 0)
      },
      sdCharaInit: function()
      {
        this.dispCharaDataList = [];
        var a = this.model.toJSON();
        $(b.doc.querySelector("#charaData")).html();
        if (-1 !== a.gachaType.indexOf("SELECTABLE"))
        {
          if (this.selectableCardId)
          {
            var c = d.findWhere(a.selectableCharaList,
              {
                defaultCardId: this.selectableCardId
              }),
              c = {
                attack: c.defaultCard.attack,
                attributeId: c.attributeId,
                cardId: c.defaultCardId,
                cardName: c.name,
                charaNo: c.id,
                defense: c.defaultCard.defense,
                growthType: c.growthType,
                hp: c.defaultCard.hp,
                initialType: c.initialType,
                miniCharaNo: c.defaultCard.miniCharaNo,
                rank: c.defaultCard.rank,
                title: c.title
              };
            this.dispCharaDataList.push(c);
            b.selectableCharaData || (b.selectableCharaData = []);
            b.selectableCharaData[a.id] = c
          }
        }
        else 0 < a.displayCardList.length && "SPECIAL" !== a.gachaType && "STARTDASH_MEMORIA" !== a.gachaType && "STARTDASH" !== a.gachaType && "ATTRIBUTE" !== a.gachaType && "TYPE" !== a.gachaType && (this.dispCharaDataList = d.clone(a.displayCardList));
        if (0 < this.dispCharaDataList.length)
        {
          if (a = d.findWhere(this.dispCharaDataList,
            {
              charaNo: 1042
            })) a.cardName = b.storage.user.get("loginName");
          b.removeClass(b.doc.querySelector("#charaData"), "hide");
          $(b.doc.querySelector("#charaData")).html(this.charaDataTemp(
          {
            model: this.dispCharaDataList[this.dispCharaIndex]
          }));
          1 === this.dispCharaDataList.length && b.addClass(b.doc.querySelector("#card" + this.dispCharaIndex), "singleCard");
          b.addClass(b.doc.querySelector("#card" + this.dispCharaIndex), "onDisp")
        }
      },
      createBtnViews: function()
      {
        this.trigger("removeBtnView");
        var a = this.model.toJSON(),
          c = b.doc.createDocumentFragment();
        this.nowGacha = a;
        var k = b.getTotalStone();
        d.each(a.gachaKindList, function(e, f)
        {
          f = null;
          if (e.substituteItemId)
          {
            var d = b.storage.userItemList.findWhere(
            {
              itemId: e.substituteItemId
            });
            f = d ? d.toJSON() : null;
            d && (f.subItemFlag = !0);
            f = f && 0 < f.quantity ? f : !1
          } - 1 !== e.displayTitle.indexOf("＠") && (e.displayTitle = e.displayTitle.replace(/＠/g, "<br>"));
          if (!f) switch (e.needPointKind)
          {
            case "PURCHASED_MONEY":
              f = {
                item:
                {
                  name: "有償マギアストーン",
                  shortDescription: "有償マギアストーン",
                  itemCode: "PURCHASED_MONEY",
                  unit: "個"
                },
                quantity: k.userMoney,
                moneyObj: k
              };
              break;
            case "MONEY":
              f = {
                item:
                {
                  name: "マギアストーン",
                  shortDescription: "マギアストーン",
                  itemCode: "MONEY",
                  unit: "個"
                },
                quantity: k.totalMoney,
                moneyObj: k
              };
              break;
            case "YELL":
              f = (f = b.storage.userItemList.findWhere(
              {
                itemId: "YELL"
              })) ? f.toJSON() :
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
              f = (f = b.storage.userItemList.findWhere(
              {
                itemId: e.itemId
              })) ? f.toJSON() :
              {
                item: e.item,
                quantity: 0
              }
          }
          e.userUseItem = f;
          e.viewStartAt = a.viewStartAt;
          e.viewEndAt = a.viewEndAt;
          "STARTDASH" === a.gachaType && (e.viewStartAt = b.getAddDate(
          {
            date: h.gameUser.startdashGachaExpiredAt,
            type: "date",
            amount: -7
          }), e.viewEndAt = h.gameUser.startdashGachaExpiredAt);
          "STARTDASH_MEMORIA" === a.gachaType && (e.viewStartAt = b.getAddDate(
          {
            date: h.gameUser.startdashMemoriaGachaExpiredAt,
            type: "date",
            amount: -7
          }), e.viewEndAt = h.gameUser.startdashMemoriaGachaExpiredAt);
          if ("RARE" === a.gachaType || "SELECTABLE_TUTORIAL" === a.gachaType) e.viewStartAt = "", e.viewEndAt = "";
          e = new p(
          {
            model: new u(e)
          });
          c.appendChild(e.render().el)
        });
        this.el.querySelector("#gachaBtnWrap").appendChild(c)
      },
      createFooterView: function()
      {
        this.trigger("removeFooterView");
        var a = new r(
        {
          model: this.model
        });
        this.el.appendChild(a.render().el)
      },
      render: function()
      {
        var a = this.model.toJSON();
        this.selectablePieceIdList = this.selectableCardId = null;
        if (-1 !== a.gachaType.indexOf("SELECTABLE_MEMORIA"))
        {
          if (!b.selectablePiece && a.gachaGroup && a.gachaGroup.pieceIds || b.selectablePiece && 4 == b.selectablePiece.pieceIdList.length && b.selectablePiece.gachaId === a.id)
            if (b.selectablePiece) this.selectablePieceIdList = b.selectablePiece.pieceIdList;
            else if (a.gachaGroup && a.gachaGroup.pieceIds)
          {
            this.selectablePieceIdList = [];
            var c = a.gachaGroup.pieceIds.split(",");
            d.each(c, function(a)
            {
              this.selectablePieceIdList.push(parseInt(a))
            }.bind(this))
          }
        }
        else - 1 !== a.gachaType.indexOf("SELECTABLE") && ((!b.selectableChara || !b.selectableChara[a.id]) && a.gachaGroup && a.gachaGroup.cardId || b.selectableChara && b.selectableChara[a.id] && b.selectableChara[a.id].cardId && b.selectableChara[a.id].gachaId === a.id) && (this.selectableCardId = b.selectableChara && b.selectableChara[a.id] ? b.selectableChara[a.id].cardId : a.gachaGroup && a.gachaGroup.cardId ? a.gachaGroup.cardId : null);
        if ("STARTDASH" === a.gachaType) a = b.getTimeText(h.gameUser.startdashGachaExpiredAt, !0), this.model.set(
        {
          startdashGachaExpiredAt: a
        },
        {
          silent: !0
        });
        else if ("STARTDASH_MEMORIA" === a.gachaType) a = b.getTimeText(h.gameUser.startdashMemoriaGachaExpiredAt, !0), this.model.set(
        {
          startdashGachaExpiredAt: a
        },
        {
          silent: !0
        });
        else if ("PICKUP" === a.gachaType || "ATTRIBUTE" === a.gachaType || "TYPE" === a.gachaType) a = b.getTimeText(a.viewEndAt, !0), this.model.set(
        {
          gachaEndAt: a
        },
        {
          silent: !0
        });
        a = !1;
        d.findWhere(h.campaignList,
        {
          campaignType: "GACHA_LINEUP"
        }) && -1 !== d.findWhere(h.campaignList,
        {
          campaignType: "GACHA_LINEUP"
        }).parameterMap.GACHA_ID_LIST.split(",").indexOf(this.model.id + "") && (a = !0);
        this.$el.html(this.template(
        {
          model: this.model.toJSON(),
          campaignLink: a
        }));
        this.el.className = this.className();
        this.createBtnViews();
        this.createFooterView();
        return this
      },
      selectableLink: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = this.model.toJSON(), b.selectableGachaModel = a, -1 !== a.gachaType.indexOf("SELECTABLE_MEMORIA") ? location.href = "#/SelectableGachaPieceSelect" : location.href = "#/SelectableGachaCharaSelect")
      },
      selectableListPop: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = this.model.toJSON();
          var c = "",
            d = {
              popupType: "typeA"
            }; - 1 !== a.gachaType.indexOf("SELECTABLE_MEMORIA") ? (c = $("#selectablePieceListPop").text(), d.pieceList = a.selectablePieceList, d.exClass = "selectablePieceListPop") : (c = $("#selectablePop").text(), d.charaList = a.selectableCharaList, d.exClass = "selectableListPop");
          new b.PopupClass(d, c, function()
          {
            g.getBaseData(b.getNativeObj());
            b.scrollSet("scrollOuter", "scrollInner")
          })
        }
      },
      removeView: function()
      {
        this.trigger("removeBtnView");
        this.trigger("removeFooterView");
        this.trigger("removeView");
        $("#popupArea").off();
        m && clearTimeout(m);
        l && clearTimeout(l);
        g.stopMemoriaTop();
        g.stopNormalGachaMemoria();
        g.hideMiniChara();
        "SelectableGachaCharaSelect" == b.location ? (b.selectablePieceIdList = null, b.selectablePiece = null) : "SelectableGachaPieceSelect" == b.location && (b.selectableCharaData = null, b.selectableChara = null);
        this.off();
        this.remove()
      }
    }),
    r = n.View.extend(
    {
      id: "gachaFooterWrap",
      events: function()
      {
        var a = {};
        a[b.cgti + " #probabilityBtn"] = this.gachaProbabilityPop;
        a[b.cgti + " #purchaseMoneyBtn"] = this.purchaseMoneyPop;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeFooterView", this.removeView);
        this.probabilityDispFlag = this.historyDispFlag = !0;
        switch (this.model.toJSON().gachaType)
        {
          case "SELECTABLE_TUTORIAL":
            this.probabilityDispFlag = this.historyDispFlag = !1;
            break;
          case "SELECTABLE_SPECIAL":
            this.probabilityDispFlag = this.historyDispFlag = !1;
            break;
          case "NORMAL":
            this.probabilityDispFlag = !1
        }
        this.gachaGroupCount = this.hasItemTxt = this.hasItemNum = this.useItemType = null;
        switch (this.model.toJSON().gachaType)
        {
          case "PICKUP":
          case "ATTRIBUTE":
          case "TYPE":
          case "RARE":
          case "STARTDASH":
          case "STARTDASH_MEMORIA":
          case "SELECTABLE_MEMORIA_PICKUP":
          case "SELECTABLE_PICKUP":
            this.useItemType = "MONEY";
            this.hasItemNum = b.getTotalStone().totalMoney;
            a = this.model.toJSON();
            this.gachaGroupCount = a.gachaGroup ? a.gachaGroup.count : 0;
            this.hasItemTxt = "所持数";
            break;
          case "NORMAL":
            this.useItemType = "YELL", this.hasItemNum = (a = b.storage.userItemList.findWhere(
            {
              itemId: "YELL"
            })) ? a.toJSON().quantity : 0, this.hasItemTxt = "サポート Pt"
        }
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      gachaProbabilityPop: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this.model.toJSON();
          x.init(a, c.id, c.gachaType, this.parentView.parentView.gachaScheduleList)
        }
      },
      purchaseMoneyPop: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.globalMenuView.moneyPopup(a)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return y
});
