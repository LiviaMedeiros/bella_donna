define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationBattleConfirm.html text!css/regularEvent/extermination/RegularEventExterminationBattleConfirm.css js/regularEvent/extermination/view/RegularEventExterminationDifficultyPopupView DeckUtil cardUtil".split(" "), function(l, m, b, r, n, v, w, x, y, z)
{
  var f, p, q, t, d, B = m.View.extend(
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
        this.template = l.template(v);
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
        d.deckIndex = d.predeckIndex = f.eventMaster.RegularEventExterminationBattleConfirm.index - 1;
        b.currentExterminationDeckType && (d.deckIndex = b.currentExterminationDeckType - 71);
        var a = this.makeDeckList(d.deckIndex);
        t = new u(
        {
          model: a.toJSON()
        });
        n.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      makeDeckList: function(a)
      {
        var g = m.Model.extend(),
          c = a - 1;
        void 0 == d.deckModelArr[c] ? (g = new g(d.userDeckList[a]), d.deckModelArr[c] = g) : g = d.deckModelArr[c];
        var f = 0;
        if (void 0 != g.get("cardList"))
          for (var c = g.get("cardList"), h = c.length, e = 0; e < h; e++)
          {
            var k = c[e],
              A = b.getTargetComposeAttribute(
              {
                attributeId: k.chara.attributeId
              });
            if ("" != c[e] || void 0 != c[e]) f += (k.attack || 0) + (k.defense || 0) + (k.hp || 0) + (k.addendAttack || 0) + (k.addendDefense || 0) + (k.addendHp || 0), l.each(A.composed, function(a, b, e)
            {
              f += a
            })
          }
        if (void 0 != g.get("memoriaList"))
          for (c = g.get("memoriaList").memoriaData, h = c.length, e = 0; e < h; e++)
            if (k = c[e], "" != c[e] || void 0 != c[e]) f += (k.attack || 0) + (k.defense || 0) + (k.hp || 0);
        g.set(
        {
          index: a + 1
        });
        g.set(
        {
          recommendedStrength: f
        });
        a = "battle" + (a + 1) + "Status";
        0 == f ? (b.doc.getElementById("deckListArea").className = "nonDeck se_decide TE", b.doc.getElementById("linkBattleBtn").className = "off") : "CONQUERED" == b.userRegularEventExterminationDifficulty[a] ? (b.doc.getElementById("deckListArea").className = "off", b.doc.getElementById("linkBattleBtn").className = "off") : (b.doc.getElementById("deckListArea").className = "se_decide TE", b.doc.getElementById("linkBattleBtn").className = "se_decide TE");
        return g
      },
      linkFormationtFunc: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.currentExterminationDeckType = void 0 != d.userDeckList[d.deckIndex].userDeck ? d.userDeckList[d.deckIndex].userDeck.deckType : d.deckIndex + 71, location.href = "#/RegularEventExterminationFormation")
      },
      formationBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("off") || (b.currentExterminationDeckType = d.deckIndex + 71, location.href = "#/DeckFormation/extermination")
      },
      battleStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var g = this,
            c = new y("extermination");
          a = m.Model.extend();
          if (d.deckIndex == d.predeckIndex) a = new a(d.userDeckList[d.deckIndex].userDeck), a = c.deckDataCreate(a.toJSON()), g.battleClrearDataFunc(), c.questFunc(a);
          else
          {
            var f = new a(d.userDeckList[d.deckIndex].userDeck),
              h = c.deckDataCreate(f.toJSON());
            a = new a(d.userDeckList[d.predeckIndex].userDeck);
            f = c.deckDataCreate(a.toJSON());
            f.deckType = d.deckIndex + 71;
            h.deckType = d.predeckIndex + 71;
            a = c.savePrmCreate(h);
            f = c.savePrmCreate(f);
            a = {
              userDeckList: [a, f]
            };
            console.log(a);
            r.ajaxPost(b.linkList.exterminationBulkSave, a, function(a)
            {
              b.responseSetStorage(a);
              console.log(a);
              g.battleClrearDataFunc();
              c.questFunc(h)
            })
          }
        }
      },
      battleClrearDataFunc: function()
      {
        var a = b.questBattleModel.questBattle.questBattleId,
          d = l.findWhere(f.userQuestBattleList,
          {
            questBattleId: a
          }).cleared;
        b.exterminationClearData = {
          questBattleId: a,
          cleared: d
        }
      },
      info: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = b.userRegularEventExterminationDifficulty;
          var d = f.eventMaster.RegularEventExterminationBattleConfirm.index,
            c = l.findWhere(f.eventMaster.regularEventExtermination.difficultyList,
            {
              difficultyId: f.eventMaster.RegularEventExterminationBattleConfirm.difficultyId
            });
          x.detailPop(c, a, d)
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
    u = m.View.extend(
    {
      tagName: "div",
      className: "deckArea",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = l.template($("#unitListTemp").text());
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
        for (var d = [], e, c = 0; 5 > c; c++) e = "userCardId" + (c + 1), e = a[e], e = l.findWhere(b.storage.userCardListEx.toJSON(),
        {
          id: e
        }), void 0 != e && (e.id == a.questEpisodeUserCardId ? d.unshift(e) : d.push(e));
        return d
      }

      function g(a)
      {
        for (var b = [], d = 1; 6 > d; d++)
          for (var e = 1; 5 > e; e++)
          {
            var c = "userPieceId0" + d + e;
            void 0 != a[c] || void 0 != a[c] ? b.push(a[c]) : b.push("")
          }
        a = [];
        d = b.length;
        for (e = 0; e < d; e++)
          if (a[e] = l.findWhere(f.userPieceList,
            {
              id: b[e]
            }), void 0 == a[e] || void 0 == a[e]) a[e] = "";
        return {
          memoriaList: b,
          memoriaData: a
        }
      }
      z.createCardList();
      d = d ||
      {};
      d.deckModelArr = [];
      b.historyArr = ["MyPage", "RegularEventExterminationBattleSelect", "RegularEventExterminationBattleConfirm"];
      b.clearSectionModel = null;
      b.clearChapterModel = null;
      f = r.getPageJson();
      q = l.findWhere(f.regularEventList,
      {
        regularEventType: "EXTERMINATION"
      });
      q || (location.href = "#/MyPage");
      f.eventMaster = q;
      b.RegularEventExterminationBattleConfirm && (f.eventMaster.RegularEventExterminationBattleConfirm = b.RegularEventExterminationBattleConfirm.model.toJSON());
      for (var c = !0, m = b.userRegularEventExterminationDifficulty, h = 1; 5 > h; h++)
        if ("CONQUERED" != m["battle" + h + "Status"])
        {
          c = !1;
          break
        } 5 == b.RegularEventExterminationBattleConfirm.model.attributes.index && 0 == c && (location.href = "#/RegularEventExterminationBattleSelect");
      c = f.eventMaster.regularEventExtermination;
      c = l.findWhere(c.difficultyList,
      {
        difficultyId: c.difficultyGroupId
      });
      f.difficultyId = c.difficultyId;
      d.userDeckList = ["", "", "", "", ""];
      l.each(b.storage.userDeckList.toJSON(), function(b)
      {
        var c, e;
        switch (b.deckType)
        {
          case 71:
            c = a(b);
            e = g(b);
            d.userDeckList[0] = {
              userDeck: b,
              cardList: c,
              memoriaList: e
            };
            break;
          case 72:
            c = a(b);
            e = g(b);
            d.userDeckList[1] = {
              userDeck: b,
              cardList: c,
              memoriaList: e
            };
            break;
          case 73:
            c = a(b);
            e = g(b);
            d.userDeckList[2] = {
              userDeck: b,
              cardList: c,
              memoriaList: e
            };
            break;
          case 74:
            c = a(b);
            e = g(b);
            d.userDeckList[3] = {
              userDeck: b,
              cardList: c,
              memoriaList: e
            };
            break;
          case 75:
            c = a(b), e = g(b), d.userDeckList[4] = {
              userDeck: b,
              cardList: c,
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
      d && (d = void 0);
      a()
    }
  }
});
