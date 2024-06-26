define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationBattleConfirm.html text!css/regularEvent/extermination/RegularEventExterminationBattleConfirm.css js/regularEvent/extermination/view/RegularEventExterminationDifficultyPopupView DeckUtil cardUtil".split(" "), function(h, l, b, r, n, v, w, x, y, z)
{
  var f, p, q, t, c, B = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #helpBtn"] = this.announceOpen;
        a[b.cgti + " #bossParamArea .detailBtn"] = this.info;
        a[b.cgti + " #linkFormationtBtn"] = this.linkFormationtFunc;
        a[b.cgti + " #linkBattleBtn"] = this.battleStart;
        a["webkitAnimationStart #kekkaiImageArea"] = this.openKekkai;
        a[b.cgti + " #deckListArea"] = this.formationBtn;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = h.template(v);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(f));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        u.prototype.parentView = this;
        c.deckIndex = c.predeckIndex = f.eventMaster.RegularEventExterminationBattleConfirm.index - 1;
        b.currentExterminationDeckType && (c.deckIndex = b.currentExterminationDeckType - 71);
        var a = this.makeDeckList(c.deckIndex);
        t = new u(
        {
          model: a.toJSON()
        });
        n.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      makeDeckList: function(a)
      {
        var g = l.Model.extend(),
          d = a - 1;
        void 0 == c.deckModelArr[d] ? (g = new g(c.userDeckList[a]), c.deckModelArr[d] = g) : g = c.deckModelArr[d];
        var m = 0;
        if (void 0 != g.get("cardList"))
          for (var d = g.get("cardList"), f = d.length, e = 0; e < f; e++)
          {
            var k = d[e],
              A = b.getTargetComposeAttribute(
              {
                attributeId: k.chara.attributeId
              });
            if ("" != d[e] || void 0 != d[e]) m += (k.attack || 0) + (k.defense || 0) + (k.hp || 0) + (k.addendAttack || 0) + (k.addendDefense || 0) + (k.addendHp || 0), h.each(A.composed, function(a, b, e)
            {
              m += a
            })
          }
        if (void 0 != g.get("memoriaList"))
          for (d = g.get("memoriaList").memoriaData, f = d.length, e = 0; e < f; e++)
            if (k = d[e], "" != d[e] || void 0 != d[e]) m += (k.attack || 0) + (k.defense || 0) + (k.hp || 0);
        g.set(
        {
          index: a + 1
        });
        g.set(
        {
          recommendedStrength: m
        });
        a = "battle" + (a + 1) + "Status";
        0 == m ? (b.doc.getElementById("deckListArea").className = "nonDeck se_decide TE", b.doc.getElementById("linkBattleBtn").className = "off") : "CONQUERED" == b.userRegularEventExterminationDifficulty[a] ? (b.doc.getElementById("deckListArea").className = "off", b.doc.getElementById("linkBattleBtn").className = "off") : (b.doc.getElementById("deckListArea").className = "se_decide TE", b.doc.getElementById("linkBattleBtn").className = "se_decide TE");
        return g
      },
      linkFormationtFunc: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.currentExterminationDeckType = void 0 != c.userDeckList[c.deckIndex].userDeck ? c.userDeckList[c.deckIndex].userDeck.deckType : c.deckIndex + 71, location.href = "#/RegularEventExterminationFormation")
      },
      formationBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("off") || (b.currentExterminationDeckType = c.deckIndex + 71, location.href = "#/DeckFormation/extermination")
      },
      battleStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var g = this,
            d = new y("extermination");
          a = l.Model.extend();
          if (c.deckIndex == c.predeckIndex) a = new a(c.userDeckList[c.deckIndex].userDeck), a = d.deckDataCreate(a.toJSON()), g.battleClrearDataFunc(), d.questFunc(a);
          else
          {
            var f = new a(c.userDeckList[c.deckIndex].userDeck),
              h = d.deckDataCreate(f.toJSON());
            a = new a(c.userDeckList[c.predeckIndex].userDeck);
            f = d.deckDataCreate(a.toJSON());
            f.deckType = c.deckIndex + 71;
            h.deckType = c.predeckIndex + 71;
            a = d.savePrmCreate(h);
            f = d.savePrmCreate(f);
            a = {
              userDeckList: [a, f]
            };
            console.log(a);
            r.ajaxPost(b.linkList.exterminationBulkSave, a, function(a)
            {
              b.responseSetStorage(a);
              console.log(a);
              g.battleClrearDataFunc();
              d.questFunc(h)
            })
          }
        }
      },
      battleClrearDataFunc: function()
      {
        var a = b.questBattleModel.questBattle.questBattleId,
          c = h.findWhere(f.userQuestBattleList,
          {
            questBattleId: a
          }).cleared;
        b.exterminationClearData = {
          questBattleId: a,
          cleared: c
        }
      },
      info: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = b.userRegularEventExterminationDifficulty;
          var c = f.eventMaster.RegularEventExterminationBattleConfirm.index,
            d = h.findWhere(f.eventMaster.regularEventExtermination.difficultyList,
            {
              difficultyId: f.eventMaster.RegularEventExterminationBattleConfirm.difficultyId
            });
          x.detailPop(d, a, c)
        }
      },
      openKekkai: function(a)
      {
        n.startSe(7215)
      },
      announceOpen: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.eventFirstNavi(["navi_01", "navi_02", "navi_03"], q.regularEventId, "extermination", null, !0, "regularEvent")
      }
    }),
    u = l.View.extend(
    {
      tagName: "div",
      className: "deckArea",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = h.template($("#unitListTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(this));
        return this
      },
      createDom: function()
      {
        $("#deckListArea").append(this.render().el)
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
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      n.endQuest();
      n.setWebView(!0);
      b.questNativeResponse && (b.responseSetStorage(b.questNativeResponse), nativeJson = b.questNativeResponse);
      b.supportUserList = null;
      b.questNativeResponse = null;
      r.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      function a(a)
      {
        for (var c = [], e, d = 0; 5 > d; d++) e = "userCardId" + (d + 1), e = a[e], e = h.findWhere(b.storage.userCardListEx.toJSON(),
        {
          id: e
        }), void 0 != e && (e.id == a.questEpisodeUserCardId ? c.unshift(e) : c.push(e));
        return c
      }

      function g(a)
      {
        for (var b = [], c = 1; 6 > c; c++)
          for (var e = 1; 5 > e; e++)
          {
            var d = "userPieceId0" + c + e;
            void 0 != a[d] || void 0 != a[d] ? b.push(a[d]) : b.push("")
          }
        a = [];
        c = b.length;
        for (e = 0; e < c; e++)
          if (a[e] = h.findWhere(f.userPieceList,
            {
              id: b[e]
            }), void 0 == a[e] || void 0 == a[e]) a[e] = "";
        return {
          memoriaList: b,
          memoriaData: a
        }
      }
      z.createCardList();
      c = c ||
      {};
      c.deckModelArr = [];
      b.historyArr = ["MyPage", "RegularEventExterminationBattleSelect", "RegularEventExterminationBattleConfirm"];
      b.clearSectionModel = null;
      b.clearChapterModel = null;
      f = r.getPageJson();
      q = h.findWhere(f.regularEventList,
      {
        regularEventType: "EXTERMINATION"
      });
      q || (location.href = "#/MyPage");
      f.eventMaster = q;
      b.RegularEventExterminationBattleConfirm && (f.eventMaster.RegularEventExterminationBattleConfirm = b.RegularEventExterminationBattleConfirm.model.toJSON());
      for (var d = !0, m = b.userRegularEventExterminationDifficulty, l = 1; 5 > l; l++)
        if ("CONQUERED" != m["battle" + l + "Status"])
        {
          d = !1;
          break
        } 5 == b.RegularEventExterminationBattleConfirm.model.attributes.index && 0 == d && (location.href = "#/RegularEventExterminationBattleSelect");
      f.difficultyId = b.userRegularEventExterminationDifficulty.difficultyId;
      c.userDeckList = ["", "", "", "", ""];
      h.each(b.storage.userDeckList.toJSON(), function(b)
      {
        var d, e;
        switch (b.deckType)
        {
          case 71:
            d = a(b);
            e = g(b);
            c.userDeckList[0] = {
              userDeck: b,
              cardList: d,
              memoriaList: e
            };
            break;
          case 72:
            d = a(b);
            e = g(b);
            c.userDeckList[1] = {
              userDeck: b,
              cardList: d,
              memoriaList: e
            };
            break;
          case 73:
            d = a(b);
            e = g(b);
            c.userDeckList[2] = {
              userDeck: b,
              cardList: d,
              memoriaList: e
            };
            break;
          case 74:
            d = a(b);
            e = g(b);
            c.userDeckList[3] = {
              userDeck: b,
              cardList: d,
              memoriaList: e
            };
            break;
          case 75:
            d = a(b), e = g(b), c.userDeckList[4] = {
              userDeck: b,
              cardList: d,
              memoriaList: e
            }
        }
      });
      b.setStyle(w);
      n.changeBg("web_extermination_top_01.ExportJson");
      p = new B(f)
    },
    remove: function(a)
    {
      p && (p.trigger("removeView"), p.remove());
      t && t.remove();
      c && (c = void 0);
      a()
    }
  }
});
