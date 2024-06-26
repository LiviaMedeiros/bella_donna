define("underscore backbone backboneCommon ajaxControl command text!template/patrol/PatrolLumpFormation.html text!css/patrol/PatrolLumpFormation.css cardUtil js/view/item/ItemImgPartsView".split(" "), function(g, m, a, n, p, q, r, t, u)
{
  var k, v = m.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #patrolLumpBtn"] = this.patrolLumpBtn;
        return b
      },
      initialize: function(b)
      {
        this.template = g.template(q);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {}));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.setGlobalView();
        var b = a.doc.createDocumentFragment();
        l.prototype.rootView = this;
        l.prototype.template = g.template($("#deckPartsTemp").text());
        for (var f = this, e = 0; 5 > e; e++) g.each(a.viewPatrolList, function(b, a, c)
        {
          f.createAutoFormationDeckModel(
          {
            patrolInfo: b,
            deckIndex: a
          })
        });
        g.each(a.viewPatrolList, function(a, f, c)
        {
          a.listWarpClass = "";
          a.userPatrolResult && "EXPEDITION" === a.userPatrolResult.status && (a.listWarpClass = "onPatrol");
          a.canPlay || (a.listWarpClass = "cannotPlay");
          a = new l(
          {
            stageIndex: f
          });
          b.appendChild(a.render().el)
        });
        a.doc.getElementById("deckWrap").appendChild(b);
        p.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      createAutoFormationDeckModel: function(b)
      {
        var f = b.deckIndex,
          e = b.patrolInfo;
        a.storage.userCardListEx.each(function(b)
        {
          var c = g.clone(b.toJSON()),
            f = a.getTargetComposeAttribute(
            {
              attributeId: c.chara.attributeId
            }),
            d = !1,
            h = (c.attack || 0) + (c.defense || 0) + (c.hp || 0) + (c.addendAttack || 0) + (c.addendDefense || 0) + (c.addendHp || 0);
          g.each(f.composed, function(c, b, a)
          {
            h += c
          });
          if (e.patrolArea.forcesBonusAttributeId == c.chara.attributeId || "ALL" == e.patrolArea.forcesBonusAttributeId) h = Math.round(1.5 * h), d = !0;
          c.patrolStrength = h;
          c.advantage = d;
          b.clear(
          {
            silent: !0
          });
          b.set(c,
          {
            silent: !0
          })
        });
        if (!a.patrolDeckList)
        {
          a.patrolDeckList = [];
          a.patrolDeckList.lumpPartyDeckList = [];
          a.patrolDeckList.lumpPartyCharaIdList = "";
          g.each(a.storage.userPatrolList.models, function(c)
          {
            if (c.attributes.userPatrolResult)
            {
              c = c.attributes.userPatrolResult;
              for (var b = c.deckType, f = ["", "", "", "", ""], d = 1; 6 > d; d++) c["charaId" + d] && void 0 != c["charaId" + d] && (f[d - 1] = c["charaId" + d]);
              a.patrolDeckList.push(
              {
                deckType: b,
                charaList: f,
                patrolAreaId: c.patrolAreaId,
                status: c.status ? c.status : "none"
              })
            }
          });
          a.patrolDeckList.startedPartyChara = [];
          var d = [];
          g.each(a.patrolDeckList, function(b)
          {
            "EXPEDITION" == b.status && (0 == d.length ? d.push(b.charaList) : d[0] = d[0].concat(b.charaList))
          });
          0 < d.length && (d = d[0].filter(function(b, a, d)
          {
            return d.indexOf(b) === a
          }));
          a.patrolDeckList.startedPartyChara = d
        }
        a.patrolDeckList.lumpPartyDeckList[f] || (a.patrolDeckList.lumpPartyDeckList[f] = []);
        if (e.canPlay && (!e.userPatrolResult || "EXPEDITION" != e.userPatrolResult.status))
        {
          b = a.storage.userCardListEx.models.sort(function(b, a)
          {
            if (b.attributes.patrolStrength !== a.attributes.patrolStrength)
            {
              if (b.attributes.patrolStrength < a.attributes.patrolStrength) return 1;
              if (b.attributes.patrolStrength > a.attributes.patrolStrength) return -1
            }
            return 0
          });
          var h = [];
          g.each(b, function(b)
          {
            -1 == a.patrolDeckList.startedPartyChara.indexOf(b.attributes.charaId) && -1 == a.patrolDeckList.lumpPartyCharaIdList.indexOf(b.attributes.charaId) && h.push(b)
          });
          for (b = 0; 1 > b; b++) h[b] && (a.patrolDeckList.lumpPartyDeckList[f].push(h[b].toJSON()), a.patrolDeckList.lumpPartyCharaIdList = a.patrolDeckList.lumpPartyCharaIdList + "," + h[b].attributes.charaId)
        }
      },
      patrolLumpBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || n.ajaxPost(a.linkList.patrolLumpStart, this.createLumpStartModel(), function(b)
        {
          a.responseSetStorage(b);
          a.patrolStartResponse = b;
          location.href = "#/PatrolResult"
        })
      },
      createLumpStartModel: function()
      {
        var b = {
            patrolAreaIds: [],
            deckTypeMap:
            {},
            userCardIdsMap:
            {}
          },
          f = a.viewPatrolList;
        g.each(a.patrolDeckList.lumpPartyDeckList, function(a, d, h)
        {
          if (0 < a.length)
          {
            d = f[d];
            b.patrolAreaIds.push(d.patrolAreaId);
            b.deckTypeMap[d.patrolAreaId] = Number("9" + d.patrolArea.areaKey);
            var c = [];
            g.each(a, function(b, a, d)
            {
              c.push(b.id)
            });
            b.userCardIdsMap[d.patrolAreaId] = c
          }
        });
        return b
      }
    }),
    l = m.View.extend(
    {
      className: "deck",
      events: function()
      {
        var b = {};
        b[a.cgti + " #itemListBtn"] = this.itemListBtn;
        return b
      },
      initialize: function(b)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.listenTo(this.rootView, "swapMode", this.selectSwapTargetMode);
        this.listenTo(this.rootView, "reset", this.reset);
        this.listenTo(a.storage.userDeckList, "change", this.reRender);
        this.stageIndex = b.stageIndex;
        this.deckIndex = b.deckIndex;
        this.deckType = "9" + b.deckIndex;
        this.patrolModel = this.createPatrolModel(
        {
          patrolModel: a.viewPatrolList[this.stageIndex]
        });
        this.deckModel = this.createDeckModel(
        {
          deckList: a.patrolDeckList.lumpPartyDeckList[this.stageIndex],
          patrolModel: this.patrolModel
        });
        var f = [],
          e = [];
        g.each(this.patrolModel.patrolArea, function(b, a)
        {
          if (-1 != a.indexOf("dropItem"))
          {
            if (-1 != a.indexOf("dropItemId")) return;
            g.each(b, function(b, a)
            {
              if (-1 != a.indexOf("rewardCode"))
              {
                b = b.split("_");
                a = "";
                for (var c = 0; c < b.length; c++) a = c == b.length - 1 ? a + "1" : a + (b[c] + "_");
                f.push(a)
              }
            })
          } - 1 == a.indexOf("bonus1DropItem") && -1 == a.indexOf("bonus2DropItem") && -1 == a.indexOf("bonus3DropItem") || -1 != a.indexOf("bonus1DropItemId") || -1 != a.indexOf("bonus2DropItemId") || -1 != a.indexOf("bonus3DropItemId") || g.each(b, function(b, a)
          {
            if (-1 != a.indexOf("rewardCode"))
            {
              b = b.split("_");
              a = "";
              for (var c = 0; c < b.length; c++) a = c == b.length - 1 ? a + "1" : a + (b[c] + "_");
              e.push(a)
            }
          })
        });
        b = f.concat(e).filter(function(b, a, c)
        {
          return c.indexOf(b) === a
        });
        this.rewardDom = this.rewardModels(b);
        this.allItemArrLeng = f.length + e.length;
        this.itemArr = f;
        this.bonusItemArr = e.concat(e).filter(function(b, a, c)
        {
          return c.indexOf(b) === a
        });
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          deckModel: this.deckModel,
          patrolModel: this.patrolModel
        }));
        return this
      },
      createDom: function() {},
      createPatrolModel: function(b)
      {
        b = b.patrolModel;
        b.time = b.patrolArea.duration.substr(0, 2) - 0 + ":" + b.patrolArea.duration.substr(2, 2) + ":" + b.patrolArea.duration.substr(4, 2);
        return b
      },
      createDeckModel: function(b)
      {
        var a = b.patrolModel,
          e = {
            charaList: [],
            strength: "---",
            expectedClass: "point0"
          },
          d = 0;
        g.each(b.deckList, function(b, a, f)
        {
          a = {};
          f = String(b.displayCardId);
          var c = String(f).slice(-1),
            g = b.chara.attributeId.toLowerCase();
          a.cardId = f;
          a.att = "att_" + g;
          a.star = "star_rank_" + c;
          a.frame = "frame_rank_" + c;
          a.bg = "bg_" + g;
          e.charaList.push(a);
          d += b.patrolStrength
        });
        0 < d && (e.strength = d);
        a.patrolArea.targetTotalForces1 && a.patrolArea.targetTotalForces2 && a.patrolArea.targetTotalForces3 && (e.expectedClass = d >= a.patrolArea.targetTotalForces3 ? "point3" : d >= a.patrolArea.targetTotalForces2 && d < a.patrolArea.targetTotalForces3 ? "point2" : d >= a.patrolArea.targetTotalForces1 && d < a.patrolArea.targetTotalForces2 ? "point1" : "point0");
        return e
      },
      rewardModels: function(a)
      {
        for (var b = [], e = 0; e < a.length; e++) b.push(this.rewardItemFunc(a[e])), this._reward && this._reward.removeView();
        return b
      },
      rewardItemFunc: function(b)
      {
        b = a.itemSet(b);
        var f = b.itemCode.split("_")[2];
        this._reward = new u(
        {
          model:
          {
            item: b,
            quantity: b.quantity,
            genericId: f,
            piece: b.piece,
            chara:
            {
              id: b.itemCode
            }
          },
          type: b.rewardType
        });
        return this._reward.render().el.innerHTML
      },
      itemListBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b = function()
        {
          var b = a.doc.createDocumentFragment(),
            e = this.rewardModels(this.itemArr),
            d = this.rewardModels(this.bonusItemArr);
          g.each(e, function(a)
          {
            var c = document.createElement("div");
            c.innerHTML = a;
            c.className = "commonItemImgWrap normal";
            b.appendChild(c)
          });
          g.each(d, function(a)
          {
            var c = document.createElement("div");
            c.innerHTML = a;
            c.className = "commonItemImgWrap bonus";
            b.appendChild(c)
          });
          a.doc.querySelector("#popupDetailScrollWrap .scrollInner").appendChild(b);
          p.getBaseData(a.getNativeObj());
          10 < e.length + d.length && setTimeout(function()
          {
            a.scrollSet("popupDetailScrollWrap", "scrollInner")
          }, 800)
        }.bind(this), new a.PopupClass(
        {
          title: "報酬内容",
          content: "<div id='popupDetailScrollWrap'><div class='scrollInner'></div></div>",
          popupType: "typeA",
          closeBtnText: "OK",
          exClass: "popupDetail"
        }, null, b, null))
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
      id: "pieceList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "titleList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
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
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      a.storage.userPatrolList && a.viewPatrolList ? (a.storage.userPatrolList.toJSON(), n.pageModelGet(this.needModelIdObj, null, "noConnect")) : location.href = "#/PatrolTop"
    },
    init: function()
    {
      var b = ["MyPage", "PatrolTop"];
      0 <= a.historyArr.indexOf("PatrolTop") && b.push("PatrolTop");
      b.push("PatrolFormation");
      a.historyArr = b;
      a.setStyle(r);
      t.createCardList();
      k = new v
    },
    remove: function(a)
    {
      k && k.remove();
      a()
    }
  }
});
