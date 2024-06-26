define("underscore backbone backboneCommon ajaxControl command text!template/quest/secondPartLast/BattleConfirm.html text!css/quest/SecondPartLastBattleConfirm.css js/quest/secondPartLast/EnemyDetailPopup DeckUtil cardUtil QuestUtil".split(" "), function(f, g, a, m, e, n, p, q, k, r, u)
{
  var d, h, c, t = g.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #helpBtn"] = this.announceOpen;
        b[a.cgti + " #bossParamArea .detailBtn"] = this.info;
        b[a.cgti + " #linkFormationtBtn"] = this.linkFormationtFunc;
        b[a.cgti + " #linkBattleBtn"] = this.battleStart;
        b["webkitAnimationStart #kekkaiImageArea"] = this.openKekkai;
        b[a.cgti + " #deckListArea"] = this.formationBtn;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = f.template(n);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(this.model));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        l.prototype.parentView = this;
        c.deckIndex = c.predeckIndex = a.SecondPartLastBattleConfirmModel.index - 1;
        a.currentSecondPartLastDeckType && (c.deckIndex = a.currentSecondPartLastDeckType - 101);
        var b = this.makeDeckList(c.deckIndex);
        h = new l(
        {
          model: b.toJSON()
        });
        e.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      makeDeckList: function(b)
      {
        var c = new(g.Model.extend())(a.SecondPartLastBattleConfirmModel.deckInfo),
          d = new k("secondPartLast"),
          e = 0;
        a.SecondPartLastBattleConfirmModel.deckInfo.userDeck && (d = d.deckDataCreate(a.SecondPartLastBattleConfirmModel.deckInfo.userDeck), f.each(d.userCardObj, function(a, b, c)
        {
          e += (a.addHp + a.addAttack + a.addDefense + a.addendHp + a.addendAttack + a.addendDefense + a.composeAttribute.composed.HP + a.composeAttribute.composed.ATTACK + a.composeAttribute.composed.DEFENSE + a.appendPoint) * a.rating
        }));
        c.set(
        {
          index: b + 1
        });
        c.set(
        {
          recommendedStrength: e
        });
        0 == e ? (a.doc.getElementById("deckListArea").className = "nonDeck se_decide TE", a.doc.getElementById("linkBattleBtn").className = "off") : "CONQUERED" == a.SecondPartLastBattleConfirmModel.battleStatus ? (a.doc.getElementById("deckListArea").className = "off", a.doc.getElementById("linkBattleBtn").className = "off") : (a.doc.getElementById("deckListArea").className = "se_decide TE", a.doc.getElementById("linkBattleBtn").className = "se_decide TE");
        return c
      },
      linkFormationtFunc: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.currentSecondPartLastDeckType = c.deckIndex + 101, location.href = "#/SecondPartLastFormation")
      },
      formationBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("off") || (a.currentSecondPartLastDeckType = c.deckIndex + 101, location.href = "#/DeckFormation/secondPartLast")
      },
      battleStart: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          b = new k("secondPartLast");
          var c;
          a.questBattleModel = a.secondPartLastInfo.questModelCreate(
          {
            battleType: "partsBattle",
            questModel: a.SecondPartLastBattleConfirmModel.questModel,
            sectionModel: a.SecondPartLastBattleConfirmModel.sectionModel
          });
          c = b.deckDataCreate(a.SecondPartLastBattleConfirmModel.deckInfo.userDeck);
          b.questFunc(c)
        }
      },
      info: function(b)
      {
        b.preventDefault();
        a.isScrolled() || q.detailPop(a.secondPartLastInfo.enemyInfo, a.secondPartLastInfo.battleInfo, a.SecondPartLastBattleConfirmModel.index - 1)
      },
      openKekkai: function(a)
      {
        e.startSe(7215)
      },
      announceOpen: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.eventFirstNavi(["navi_01", "navi_02", "navi_03"], (void 0).regularEventId, "extermination", null, !0, "regularEvent")
      }
    }),
    l = g.View.extend(
    {
      tagName: "div",
      className: "deckArea",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = f.template($("#unitListTemp").text());
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
    fetch: function(b)
    {
      a.secondPartLastInfo ? m.pageModelGet(this.needModelIdObj, null, "noConnect") : location.href = "#/SecondPartLastRouter"
    },
    init: function()
    {
      c = c ||
      {};
      a.historyArr = ["MainQuest", "SecondPartLastRouter", "SecondPartLastBattleConfirm"];
      a.clearSectionModel = null;
      a.clearChapterModel = null;
      a.SecondPartLastBattleConfirmModel || (location.href = "#/SecondPartLastRouter");
      a.setStyle(p);
      e.changeBg("web_secondPartLastBattle_21188.ExportJson");
      r.createCardList();
      d = new t(
      {
        model:
        {
          battleConfirmModel: a.SecondPartLastBattleConfirmModel
        }
      })
    },
    remove: function(a)
    {
      d && (d.trigger("removeView"), d.remove());
      h && h.remove();
      c && (c = void 0);
      a()
    }
  }
});
