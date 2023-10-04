define("backboneCommon ajaxControl command QuestUtil cardUtil memoriaUtil js/view/user/APPopup js/quest/puellaHistoria/CreateModel js/event/EventArenaRankMatch/Utility js/event/EventArenaRankMatch/parts/DeckEditCountDown js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility".split(" "), function(a, r, f, z, A, E, t, C, B, J, w, x)
{
  function F(c)
  {
    if (c)
    {
      c = c.webData;
      var b = c.userQuestBattleResultList[0].questBattle;
      a.responseSetStorage(c);
      if (c = (c = a.storage.userSectionList.findWhere(
        {
          sectionId: b.sectionId
        })) ? c.toJSON() : null) b = (b = a.storage.userChapterList.findWhere(
      {
        chapterId: c.section.genericId
      })) ? b.toJSON() : null, a.playChapter = b, a.playSection = c
    }
  }
  t = function(a)
  {
    this.deckCatType = a;
    this.questDisableFlg = !1
  };
  t.prototype.setCurrentDeckType = function()
  {
    var c = B.getDeckType(),
      b = r.getPageJson(),
      e = null;
    this.deckCatType && "quest" !== this.deckCatType ? "support" == this.deckCatType ? e = 20 : "arena" == this.deckCatType ? e = 21 : "eventArena" == this.deckCatType ? e = 22 : "arenaRankMatchAttack" == this.deckCatType ? e = c.listAttack[0] : "arenaRankMatchDefence" == this.deckCatType ? e = c.listDefence[0] : "dungeon" === this.deckCatType || "dungeonInMap" === this.deckCatType ? e = a.currentDungeonDeckType ? a.currentDungeonDeckType : a.userEventDungeon && a.userEventDungeon.selectedDeckType ? a.userEventDungeon.selectedDeckType : 41 : "group" == this.deckCatType || "groupPrepare" == this.deckCatType ? e = a.currentGroupDeckType ? a.currentGroupDeckType : a.groupDeckType ? a.groupDeckType : 51 : "endless" == this.deckCatType ? e = a.currentEndlessDeckType ? a.currentEndlessDeckType : 61 : "extermination" == this.deckCatType ? e = a.currentExterminationDeckType ? a.currentExterminationDeckType : 71 : "secondPartLast" == this.deckCatType ? e = a.currentSecondPartLastDeckType ? a.currentSecondPartLastDeckType : 101 : "accomplish" == this.deckCatType ? e = 81 : "puellaHistoriaGroupRaid" == this.deckCatType ? e = a.currentPuellaHistoriaGroupRaidDeckType ? a.currentPuellaHistoriaGroupRaidDeckType : w.getDeckType(
    {}) + 1 : "scene0Challenge" == this.deckCatType && (e = a.currentScene0ChallengeDeckType ? a.currentScene0ChallengeDeckType : x.getDeckType() + 1) : e = a.currentDeckType ? a.currentDeckType : b.gameUser && b.gameUser.deckType && 20 > b.gameUser.deckType ? b.gameUser.deckType : 11;
    return e || 11
  };
  t.prototype.deckPrmInit = function()
  {
    var c = r.getPageJson(),
      b = this.setCurrentDeckType(),
      e = a.storage.userDeckList.findWhere(
      {
        deckType: b
      });
    e ? c = this.deckDataCreate(e.toJSON()) : (c = {
      deckType: b,
      formationSheetId: 111,
      formationSheet: _.findWhere(c.userFormationSheetList,
      {
        formationSheetId: 111
      }).formationSheet,
      name: "チーム" + String(b).slice(-1),
      switchNpcEventId: null,
      switchNpcFlag1: null,
      switchNpcFlag2: null,
      switchNpcFlag3: null,
      switchNpcFlag4: null,
      switchNpcFlag5: null,
      switchNpcFlag6: null,
      switchNpcFlag7: null,
      switchNpcFlag8: null,
      switchNpcFlag9: null,
      switchNpcFlag10: null,
      rentalPieceSetId1: null,
      rentalPieceSetId2: null,
      rentalPieceSetId3: null,
      rentalPieceSetId4: null,
      rentalPieceSetId5: null,
      rentalPieceSetId6: null,
      rentalPieceSetId7: null,
      rentalPieceSetId8: null,
      rentalPieceSetId9: null,
      rentalPieceSetId10: null
    }, this.deckCatType && "quest" !== this.deckCatType || (c.questPositionHelper = 3), e = B.getDeckType(), b == e.listAttack[0] && (c.name = "攻撃編成"), b == e.listDefence[0] && (c.name = "防衛編成"), c = this.deckDataCreate(c));
    return {
      currentDeckType: b,
      currentDeckModel: c
    }
  };
  t.prototype.savePrmCreate = function(a, b)
  {
    for (var c = {
        deckType: a.deckType,
        formationSheetId: a.formationSheetId,
        name: a.name,
        questPositionHelper: a.questPositionHelper,
        episodeUserCardId: a.questEpisodeUserCardId
      }, d = [], v = [], h = [], l = 0; 10 > l;)
    {
      if (a["userCardId" + (l + 1)])
      {
        d.push(a["userCardId" + (l + 1)]);
        v.push(a["questPositionId" + (l + 1)]);
        for (var f = "place" + a["questPositionId" + (l + 1)], k = [], p = 0; 4 > p;)
        {
          if (a.userPieceObj[f] && a.userPieceObj[f][p] && !a.userPieceObj[f][p].invalidFlag)
          {
            var u = "userPieceId" + ("000" + (l + 1) + (p + 1)).slice(-3);
            a[u] && k.push(a[u])
          }
          p = p + 1 | 0
        }
        h.push(k)
      }
      l = l + 1 | 0
    }
    if ("notRentalData" != b)
      for (c.rentalPieceSetIdList = [], l = 1; 10 >= l; l++) void 0 != a["rentalPieceSetId" + l] ? c.rentalPieceSetIdList.push(a["rentalPieceSetId" + l]) : c.rentalPieceSetIdList.push(null);
    c.userCardIds = d;
    c.questPositionIds = v;
    c.userPieceIdLists = h;
    return c
  };
  t.prototype.deckDataCreate = function(c)
  {
    var b = this;
    a.storage.userCardListEx || A.createCardList();
    var e = r.getPageJson(),
      d = _.clone(c);
    d.deckCatType = this.deckCatType;
    if ("RegularEventExterminationFormation" != a.location || "SecondPartLastFormation" != a.location) a.firstLoad = null != a.firstLoad ? a.firstLoad + 1 : 0;
    if (!d.name && !this.deckCatType || !d.name && "quest" === this.deckCatType || !d.name && "extermination" === this.deckCatType || !d.name && "secondPartLast" === this.deckCatType || !d.name && "dungeon" === this.deckCatType || !d.name && "dungeonInMap" === this.deckCatType)
    {
      var f = "チーム" + String(c.deckType).slice(-1);
      d.name = f
    }
    var h = {},
      l = [];
    _.each(d.formationSheet, function(a, b)
    {
      if (-1 !== b.indexOf("placeSkill") && -1 === b.indexOf("placeSkillId"))
      {
        l.push(b.split("placeSkill")[1]);
        var c = null;
        a.art1 && (c = [a.viewAttributeId]);
        h[b] = c
      }
    });
    "support" == this.deckCatType ? d.posArr = "123456".split("") : ("dungeon" != this.deckCatType && "dungeonInMap" != this.deckCatType || Array.prototype.push.apply(l, ["10", "11"]), d.placeEffect = h, d.posArr = l);
    a.switchNpcValidList || (a.switchNpcValidList = []);
    var n = [];
    if (a.questBattleModel)
      for (f = 0; 5 > f; ++f)
      {
        var k = a.questBattleModel.questBattle["switchCharaId" + (f + 1)];
        k && (void 0 !== a.switchNpcValidList[k] ? (n[k] = a.switchNpcValidList[k], n["load_" + k] = a.switchNpcValidList["load_" + k]) : (n[k] = !0, n["load_" + k] = !1), a.switchNpcValidList["set_" + k] && (n["set_" + k] = a.switchNpcValidList["set_" + k]))
      }
    a.switchNpcValidList = n;
    var p = {};
    d.leaderPos = null;
    _.each(d.posArr, function(b, e)
    {
      var m = "userCardId" + (e + 1),
        f = "questPositionId" + (e + 1),
        h = "switchNpcFlag" + (e + 1);
      if (d[m])
      {
        var m = d[m],
          g = _.findWhere(a.storage.userCardListEx.toJSON(),
          {
            id: m
          });
        g.switchNpcPos = e + 1;
        g.userCardId == d.questEpisodeUserCardId && (d.leaderPos = Number(c[f]));
        a.userRegularEventAccomplishCharaArr && G(g);
        if (a.rentalPieceData && a.rentalPieceData.rentalPieceSetList && a.rentalPieceData.rentalFlag)
        {
          2 > a.firstLoad && (a.rentalPieceData[m] = d["rentalPieceSetId" + (e + 1)] ? d["rentalPieceSetId" + (e + 1)] : null);
          if (a.rentalPieceData[m])
          {
            var k = _.findWhere(a.rentalPieceData.rentalPieceSetList,
            {
              pieceSetId: a.rentalPieceData[m]
            });
            if (void 0 == k || null == k) k = null;
            a.rentalSetFlag || (a.rentalReversFlag ? a.rentalPieceData[m] = d["rentalPieceSetId" + (e + 1)] : d["rentalPieceSetId" + (e + 1)] = a.rentalPieceData[m]);
            null != a.rentalPieceData[m] ? (g.rentalFlag = k, g.rentalID = a.rentalPieceData[m], g.rentalMemoriaUse = !0) : (g.rentalFlag = null, g.rentalID = null, g.rentalMemoriaUse = !1)
          }
          else a.rentalReversFlag ? (a.rentalPieceData[m] = d["rentalPieceSetId" + (e + 1)], k = _.findWhere(a.rentalPieceData.rentalPieceSetList,
          {
            pieceSetId: a.rentalPieceData[m]
          }), null != a.rentalPieceData[m] ? (g.rentalFlag = k, g.rentalID = a.rentalPieceData[m], g.rentalMemoriaUse = !0) : (g.rentalFlag = null, g.rentalID = null, g.rentalMemoriaUse = !1)) : d["rentalPieceSetId" + (e + 1)] = null;
          m = Object.assign(
          {}, g);
          m.supportFlag = !0;
          m.isNpc = !0;
          var q = [];
          _.each(g.rentalFlag, function(a, b)
          {
            "object" === typeof a && (b = b.slice(-1) - 0, q[b - 1] = {}, q[b - 1].level = g.rentalFlag["pieceLevel" + b], q[b - 1].pieceId = g.rentalFlag["pieceId" + b], q[b - 1].hp = g.rentalFlag["pieceHp" + b], q[b - 1].attack = g.rentalFlag["pieceAtk" + b], q[b - 1].defense = g.rentalFlag["pieceDef" + b], q[b - 1].lbCount = g.rentalFlag["pieceLbCount" + b], q[b - 1].piece = a, q[b - 1].rank = a.rank, q[b - 1].lockFlg = !0, q[b - 1].btnHide = !0)
          });
          g.rentalMemoriaModel = A.addExStatus(m, q, m.userDoppelList, m.userDeck)
        }
        else 2 > a.firstLoad ? d["rentalPieceSetId" + (e + 1)] ? (void 0 == a.rentalPieceData && (a.rentalPieceData = {}), a.rentalPieceData[m] = d["rentalPieceSetId" + (e + 1)]) : (void 0 == a.rentalPieceData && (a.rentalPieceData = {}), d["rentalPieceSetId" + (e + 1)] = null, a.rentalPieceData[m] = null) : (a.rentalPieceData && void 0 != a.rentalPieceData[m] && (d["rentalPieceSetId" + (e + 1)] = a.rentalPieceData[m]), g.rentalMemoriaUse = !1);
        if (void 0 != a.switchNpcValidList[g.chara.id])
        {
          if (m = _.find(a.switchNpcList, function(a)
            {
              return a.userCharaList[0].charaId == g.chara.id
            })) 1 == a.switchNpcValidList["set_" + g.chara.id] && 1 == a.switchNpcCompar.setReturn ? a.switchNpcValidList[g.chara.id] = g.switchCharaFlag = d[h] : null != d.switchNpcEventId && a.switchNpcCompar.eventId == d.switchNpcEventId ? null == d[h] ? (g.switchCharaFlag = d[h] = a.switchNpcValidList[g.chara.id], a.switchNpcValidList["load_" + g.chara.id] = !0) : 1 == a.switchNpcValidList["load_" + g.chara.id] ? g.switchCharaFlag = d[h] = a.switchNpcValidList[g.chara.id] : (g.switchCharaFlag = a.switchNpcValidList[g.chara.id] = d[h], a.switchNpcValidList["load_" + g.chara.id] = !0) : void 0 != a.switchNpcCompar.eventId && a.switchNpcCompar.eventId != d.switchNpcEventId ? (d.switchNpcEventId = a.switchNpcCompar.eventId, void 0 == g.switchCharaFlag && (g.switchCharaFlag = d[h] = a.switchNpcValidList[g.chara.id])) : void 0 == g.switchCharaFlag && (g.switchCharaFlag = void 0 != d[h] ? a.switchNpcValidList[g.chara.id] = d[h] : d[h] = a.switchNpcValidList[g.chara.id]), d["switchNpcFlag" + (e + 1)] = g.switchCharaFlag, e = $.extend(m.userCardList[0], m.userCharaList[0]), e.supportFlag = !0, e.isNpc = !0, _.each(m.userPieceList, function(a)
          {
            a.lockFlg = !0;
            a.rank = a.piece.rank;
            a.btnHide = !0
          }), g.switchCharaModel = A.addExStatus(e, m.userPieceList, m.userDoppelList, m.userDeck)
        }
        else void 0 !== a.switchNpcCompar && null !== a.switchNpcCompar && (void 0 !== a.switchNpcCompar[g.userCardId] ? null != a.switchNpcCompar[g.userCardId] ? d[h] = a.switchNpcCompar[g.userCardId] : void 0 != d[h] && null != d[h] && (d[h] = a.switchNpcCompar[g.userCardId]) : null != d[h] ? null == a.switchNpcCompar[g.userCardId] ? null != a.switchNpcCompar.eventId ? d[h] = null : a.switchNpcCompar[g.userCardId] = d[h] : a.switchNpcCompar[g.userCardId] = d[h] : a.switchNpcCompar[g.userCardId] = null);
        p["place" + d[f]] = g
      }
      else d[h] = null;
      "support" !== this.deckCatType && d.questPositionHelper == b && (g = {}, "quest" === this.deckCatType && a.questSupportModel && (g = a.questSupportModel), g.support = !0, p["place" + b] = g)
    }.bind(this));
    d.userCardObj = p;
    var u = {};
    _.each(d.posArr, function(b, e)
    {
      if (c["questPositionId" + (e + 1)])
      {
        b = "place" + c["questPositionId" + (e + 1)];
        var m = "userPieceId" + ("00" + (e + 1)).slice(-2),
          h = d.userCardObj[b],
          q = h ? h.revision + 1 : 0;
        for (e = 0; 4 > e;)
        {
          var g = m + (e + 1);
          if (d[g])
          {
            0 == b in u && (u[b] = []);
            var g = _.findWhere(a.storage.userPieceList.toJSON(),
              {
                id: d[g]
              }),
              f = !1;
            0 >= q && (f = "invalidRev");
            g.piece.charaList && (_.findWhere(g.piece.charaList,
            {
              charaId: h.charaId | 0
            }) || (f = "invalidChara"));
            "ALL" !== g.piece.attributeId && g.piece.attributeId !== h.chara.attributeId && (f = "invalidAtt");
            q--;
            g.maxLevel = E.getMaxLevel(g.piece.rank, g.lbCount);
            g.invalidFlag = f;
            u[b][e] = g
          }
          else q--;
          e = e + 1 | 0
        }
      }
    });
    if ("quest" === this.deckCatType && a.questSupportModel)
      for (f = 0; 4 > f;) k = "equipPiece" + (f + 1), a.questSupportModel[k] && (n = "place" + c.questPositionHelper, 0 == n in u && (u[n] = []), k = a.questSupportModel[k], k.maxLevel = E.getMaxLevel(k.piece.rank, k.lbCount), u[n][f] = k), f = f + 1 | 0;
    d.userPieceObj = u;
    _.each(d.userCardObj, function(a, b)
    {
      a.switchCharaModel && (a.switchCharaModel.userPieceList = 0);
      d.userPieceObj[b] && (_.each(d.userPieceObj[b], function(b, c)
      {
        b && (a["equipPiece" + (c + 1)] = b)
      }), a = A.totalEventEffectSet(a))
    });
    var y, q, D;
    if ("group" === this.deckCatType || "groupPrepare" === this.deckCatType)
      if (e = _.findWhere(e.regularEventList,
        {
          regularEventType: "GROUPBATTLE"
        })) y = e.regularEventGroupBattle.recommendRatingPointRate / 1E3, q = (e.regularEventGroupBattle.atkRatingPointRate - 1E3) / 1E3, D = e.regularEventGroupBattle.recommendCharaAttributes.split(",");
    _.each(d.userCardObj, function(c, e)
    {
      c.supportFlag || (c.rating = 1, c.appendPoint = 0, ("arenaRankMatchAttack" === b.deckCatType || "arenaRankMatchDefence" === b.deckCatType) && a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.spPlusList && _.each(a.EventArenaRankMatchPrm.spPlusList, function(a, b, d)
      {
        b == c.card.attributeId && (_.each(a, function(a, b, d)
        {
          c[b] && (c[b] += a)
        }), c.isArenaRankMatchPrmUp = !0)
      }), c.addHp = c.hp ? c.hp : 0, c.addAttack = c.attack ? c.attack : 0, c.addDefense = c.defense ? c.defense : 0, c.memoriaHp = 0, c.memoriaAttack = 0, c.memoriaDefense = 0, y && D && -1 < D.indexOf(c.chara.attributeId) && (c.rating *= y), q && (c.appendPoint += q * c.attack), d.userPieceObj[e] && _.each(d.userPieceObj[e], function(a)
      {
        a && !a.invalidFlag && (c.addHp += a.hp, c.addAttack += a.attack, c.addDefense += a.defense, c.memoriaHp += a.hp, c.memoriaAttack += a.attack, c.memoriaDefense += a.defense)
      }), c.isPHLBUseItem = null, "puellaHistoriaGroupRaid" == d.deckCatType && a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (c.isPHLBUseItem = a.PuellaHistoriaLastBattleGroupRaidPrm.isUseItem))
    });
    20 == c.deckType && (d.name = "サポートチーム");
    21 == c.deckType && (d.name = "ミラーズチーム");
    22 == c.deckType && (d.name = "イベントミラーズチーム");
    e = B.getDeckType();
    c.deckType == e.listAttack[0] && (d.name = "攻撃編成");
    c.deckType == e.listDefence[0] && (d.name = "防衛編成");
    return d
  };
  var K = function(a, b)
    {
      switch (a)
      {
        case "quest":
          return 11 <= b && 19 >= b;
        case "dungeon":
        case "dungeonInMap":
          return 41 <= b && 49 >= b;
        case "group":
        case "groupPrepare":
          return 51 <= b && 54 >= b;
        case "endless":
          return 61 <= b && 63 >= b;
        case "extermination":
          return 71 <= b && 75 >= b;
        case "secondPartLast":
          return 101 <= b && 105 >= b;
        case "accomplish":
          return 71 <= b && 75 >= b;
        case "puellaHistoriaGroupRaid":
          return b >= w.getDeckType(
          {}) + 1 && w.getDeckType(
          {}) + 5 >= b;
        case "scene0Challenge":
          return b >= x.getDeckType() + 1 && x.getDeckType() + 5 >= b;
        default:
          return 11 <= b && 19 >= b
      }
    },
    L = {
      quest: "1",
      dungeon: "4",
      dungeonInMap: "4",
      group: "5",
      groupPrepare: "5",
      endless: "6",
      extermination: "7",
      secondPartLast: "10",
      accomplish: "8",
      puellaHistoriaGroupRaid: String(w.getDeckType(
      {}) / 10),
      scene0Challenge: String(x.getDeckType() / 10),
      exterminationCopy: "1",
      secondPartLastCopy: "1"
    };
  t.prototype.deckListDataCreate = function()
  {
    var c = this.deckCatType || "quest",
      b = [];
    _.each(a.storage.userDeckList.toJSON(), function(a, c)
    {
      if (K(this.deckCatType, a.deckType))
      {
        var d = [];
        _.each(a.formationSheet, function(a, b)
        {
          -1 !== b.indexOf("placeSkillId") && d.push(b.split("placeSkillId")[1])
        });
        a.posArr = d;
        b.push(a)
      }
    }.bind(this));
    var e = 0;
    a.rentalSetFlag = !1;
    var d = 9;
    for ("group" === c || "groupPrepare" === c ? d = 4 : "endless" === c ? d = 3 : "accomplish" === c ? d = 1 : "puellaHistoriaGroupRaid" === c ? d = 5 : "scene0Challenge" === c && (d = 5); e < d;)
    {
      var f = L[c] + (e + 1);
      _.findWhere(b,
      {
        deckType: Number(f)
      }) || (f = {
        name: "チーム" + String(f).slice(-1),
        deckType: Number(f)
      }, b.push(f));
      e = e + 1 | 0
    }
    b.sort(function(a, b)
    {
      return a.deckType < b.deckType ? -1 : a.deckType > b.deckType ? 1 : 0
    });
    return b
  };
  t.prototype.nextPageFunc = function(a)
  {
    switch (this.deckCatType)
    {
      case "quest":
      case "group":
      case "accomplish":
      case "endless":
      case "scene0Challenge":
        this.questFunc(a);
        break;
      case "puellaHistoriaGroupRaid":
        this.startPuellaHistoriaGroupRaidBattle(
        {
          deckModel: a
        });
        break;
      case "dungeon":
      case "dungeonInMap":
        this.dungeonMapStartFunc(a);
        break;
      case "arenaRankMatchAttack":
        this.startEventArenaRankMatchBattle(
        {
          currentDeckModel: a
        })
    }
  };
  t.prototype.questFunc = function(c)
  {
    if (!this.questDisableFlg)
    {
      a.androidKeyStop = !0;
      var b = function()
      {
        for (var a = [], b = 0; 10 > b;)
        {
          var d = c["userCardId" + (b + 1)];
          d && a.push(d);
          b = b + 1 | 0
        }
        return a
      }();
      if ("endless" === c.deckCatType && 3 > b.length)
      {
        f.startSe(1002);
        var e = new a.PopupClass(
        {
          title: "編成エラー",
          content: "バトル開始には、3人以上の魔法少女が<br>編成に含まれている必要があります。",
          closeBtnText: "OK"
        });
        a.androidKeyStop = !1
      }
      else if (b.length)
        if ((a.questBattleModel && a.questBattleModel.questBattle.onlyCharaIds || a.questBattleModel && a.questBattleModel.questBattle.containCharaIds) && !z.charaConditionCheck(a.questBattleModel.questBattle, b)) b = z.charaConditionText(a.questBattleModel.questBattle), f.startSe(1002), e = new a.PopupClass(
        {
          title: "クエスト開始条件",
          popupId: "charaConditionPopup",
          content: b,
          decideBtnText: "OK",
          canClose: !1
        }, null, function()
        {
          $("#charaConditionPopup .decideBtn").on(a.cgti, function(a)
          {
            e.remove()
          })
        });
        else
        {
          if ("accomplish" === c.deckCatType)
          {
            var d = !1,
              v = !1;
            _.each(c.userCardObj, function(a, b)
            {
              a.isRetired && (v = !0);
              40 > a.level && (d = !0)
            });
            if (d)
            {
              e = new a.PopupClass(
              {
                title: "編成エラー",
                content: "レベル40未満の魔法少女がチームに含まれています。",
                closeBtnText: "OK"
              });
              a.androidKeyStop = !1;
              return
            }
            if (v)
            {
              f.startSe(1002);
              e = new a.PopupClass(
              {
                title: "編成エラー",
                content: "戦闘不能の魔法少女が含まれています。",
                closeBtnText: "OK"
              });
              a.androidKeyStop = !1;
              return
            }
          }
          var h = {};
          h.questBattleId = a.questBattleModel.questBattle.questBattleId;
          h.deckType = c.deckType;
          "RAID" === a.questBattleModel.questType ? h.raidId = a.questBattleModel.raidId : "GROUPBATTLE" === a.questBattleModel.questType && (h.groupId = a.questBattleModel.groupId);
          _.each(c, function(a, b)
          {
            if (-1 !== b.indexOf("questPositionId") || -1 !== b.indexOf("userCardId") || -1 !== b.indexOf("userPieceId")) h[b] = a
          });
          for (var l = b = 0; 5 > b; ++b)
          {
            var n = c.userCardObj["place" + c.posArr[b]];
            n && !0 === n.switchCharaFlag && (h["switchCharaId" + (l + 1)] = n.chara.id, l++);
            !n || !0 !== n.rentalFlag && "extermination" !== c.deckCatType || (c["rentalPieceSetId" + (l + 1)] && (h["rentalPieceSetId" + (l + 1)] = c["rentalPieceSetId" + (l + 1)]), l++)
          }
          a.questSupportModel && (a.questSupportModel.isNpc ? h.npcHelpId = a.questSupportModel.npcHelpId : (h.helperUserId = a.questSupportModel.userId, a.questHelperId = a.questSupportModel.userId, h.helperUserCardId = a.questSupportModel.userCardId), h.helpAttributeId = a.questSupportModel.supportTabAtt.toUpperCase(), h.helperPositionId = c.questPositionHelper);
          var b = null,
            l = a.questBattleModel.questBattle.startStory,
            k = [];
          a.questBattleModel.questBattle.questStoryList && _.each(a.questBattleModel.questBattle.questStoryList, function(a)
          {
            a && k.push(a)
          });
          a.questBattleModel.questBattle.endStory && k.push(a.questBattleModel.questBattle.endStory);
          a.questBattleModel.secret && (b = a.questBattleModel.secret);
          this.questDisableFlg = !0;
          H(l, k, a.questBattleModel.userQuestAdventureList, h, b);
          f.startSe(1001)
        }
      else f.startSe(1002), e = new a.PopupClass(
      {
        title: "編成エラー",
        content: "魔法少女を１体以上編成してください。",
        closeBtnText: "OK"
      }), a.androidKeyStop = !1
    }
  };
  var H = function(c, b, e, d, v)
    {
      $(a.ready.target).on("webkitAnimationEnd", function()
      {
        f.changeBg("web_black.jpg");
        $(a.ready.target).off();
        $(a.ready.target).on("webkitAnimationEnd", function(b)
        {
          "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
        });
        var h = !0,
          l = !0,
          n = 0;
        if (!a.questBattleModel.storyForceStart)
        {
          _.each(e, function(a)
          {
            c === a.adventureId && (h = !1); - 1 < b.indexOf(a.adventureId) && n++
          });
          if (0 == b.length || 0 < b.length && b.length == n) l = !1;
          "MAIN" != a.questBattleModel.questType && "SUB" != a.questBattleModel.questType && "CHARA" != a.questBattleModel.questType && "COSTUME" != a.questBattleModel.questType || a.storage.gameUser.toJSON().skipAdventure || (l = h = !0);
          c || (h = !1);
          0 == b.length && (l = !1)
        }
        a.questBattleModel.eventBranchData && !a.questBattleModel.eventBranchData.startStoryJson && (h = !1);
        f.endL2d();
        var k = null;
        if (window.isBrowser) a.stubQuest = d, a.apiQuestPrm = d, f.sendCommand("QuestStub");
        else if (a.apiQuestPrm = d, h)
        {
          var p = function(b)
            {
              $("#commandDiv").on("nativeCallback", function(d, e)
              {
                $("#commandDiv").off();
                e && e.isSkipped && (d = {}, d.adventureId = String(c), r.ajaxPost(a.linkList.adventureSkip, d, function(b)
                {
                  a.responseSetStorage(b)
                }));
                a.questBattleModel.eventBranchData && e && e.alternativeIdList && r.ajaxPost(a.linkList.branchAlternativeStart,
                {
                  pointId: a.questBattleModel.eventBranchData.pointId,
                  alternativeIdList: e.alternativeIdList
                });
                $("#commandDiv").on("nativeCallback", function(a, b)
                {
                  $("#commandDiv").off();
                  F(b);
                  location.href = "#/QuestBackground"
                });
                I(b)
              })
            },
            u = function(b, c)
            {
              $("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                p(c);
                f.startStory(b);
                window.isBrowser && $("#commandDiv").trigger("nativeCallback")
              });
              f.downloadFileFullVoice("section_" + a.questBattleModel.questBattle.sectionId);
              window.isBrowser && $("#commandDiv").trigger("nativeCallback")
            },
            y = function(b, c)
            {
              $("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                p(c);
                f.startStory(b);
                window.isBrowser && $("#commandDiv").trigger("nativeCallback")
              });
              f.downloadFileFullVoice("section_event_" + a.questBattleModel.eventObj.event.eventId);
              window.isBrowser && $("#commandDiv").trigger("nativeCallback")
            },
            k = function(b)
            {
              b.isLoop = a.questBattleModel.isLoop;
              var d = String(c);
              v && (d += "_" + v);
              setTimeout(function()
              {
                f.setWebView(!1);
                a.questBattleModel.eventBranchData ? (p(b), f.startBranchStory(a.questBattleModel.eventBranchData.startStoryJson)) : C.getIsPuellaHistoriaInfo(
                {
                  sectionInfo: a.storage.userSectionList.findWhere(
                  {
                    sectionId: a.questBattleModel.questBattle.sectionId
                  }).toJSON()
                }).isPuellaHistoria ? (p(b), f.startStory(d)) : "MAIN" == a.questBattleModel.questType || "SECONDPARTLAST" === a.questBattleModel.questType ? u(d, b) : a.questBattleModel.eventObj && a.questBattleModel.eventObj.event && a.questBattleModel.eventObj.event.existsVoice ? y(d, b) : (p(b), f.startStory(d), window.isBrowser && $("#commandDiv").trigger("nativeCallback"))
              }, 500)
            };
          $("#popupArea").on(a.cgti, "#resultCodeError .popupCloseBtn", function(b)
          {
            b.preventDefault();
            a.isScrolled() || ($("#popupArea").off(), f.nativeReload("#/TopPage"))
          });
          "SECONDPARTLAST" === a.questBattleModel.questType ? r.ajaxPost(a.linkList.secondPartLastBattleStart, d, k) : r.ajaxPost(a.linkList.questStart, d, k)
        }
        else p = function(b)
        {
          b.isLoop = a.questBattleModel.isLoop;
          $("#commandDiv").on("nativeCallback", function(a, b)
          {
            $("#commandDiv").off();
            F(b);
            location.href = "#/QuestBackground"
          });
          I(b)
        }, k = function(b)
        {
          setTimeout(function()
          {
            f.setWebView(!1);
            if (l)
            {
              var c = null;
              "MAIN" == a.questBattleModel.questType ? c = "section_" + a.questBattleModel.questBattle.sectionId : a.questBattleModel.eventObj && a.questBattleModel.eventObj.event && a.questBattleModel.eventObj.event.existsVoice && (c = "section_event_" + a.questBattleModel.eventObj.event.eventId);
              C.getIsPuellaHistoriaInfo(
              {
                sectionInfo: a.storage.userSectionList.findWhere(
                {
                  sectionId: a.questBattleModel.questBattle.sectionId
                }).toJSON()
              }).isPuellaHistoria && (c = null);
              c ? ($("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                p(b)
              }), f.downloadFileFullVoice(c), window.isBrowser && $("#commandDiv").trigger("nativeCallback")) : p(b)
            }
            else p(b)
          }, 500)
        }, $("#popupArea").on(a.cgti, "#resultCodeError .popupCloseBtn", function(b)
        {
          b.preventDefault();
          a.isScrolled() || ($("#popupArea").off(), f.nativeReload("#/TopPage"))
        }), "RAID" === a.questBattleModel.questType ? r.ajaxPost(a.linkList.raidQuestStart, d, k) : "GROUPBATTLE" === a.questBattleModel.questType ? a.questBattleModel.isSimulate ? r.ajaxPost(a.linkList.groupBattleBattleSimulateStart, d, k) : r.ajaxPost(a.linkList.groupBattleBattleStart, d, k) : "EXTERMINATION" === a.questBattleModel.questType ? r.ajaxPost(a.linkList.exterminationBattleStart, d, k) : "SECONDPARTLAST" === a.questBattleModel.questType ? r.ajaxPost(a.linkList.secondPartLastBattleStart, d, k) : r.ajaxPost(a.linkList.questStart, d, k)
      });
      a.ready.target.classList.contains("preNativeFadeIn") ? $(a.ready.target).trigger("webkitAnimationEnd") : a.addClass(a.ready.target, "preNativeFadeIn")
    },
    I = function(c)
    {
      a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
      var b = null;
      if (c.userQuestBattleResultList[0] && c.userQuestBattleResultList[0].questBattle && c.userQuestBattleResultList[0].questBattle.sectionId)
      {
        var e = c.userQuestBattleResultList[0].questBattleId,
          b = {},
          d = a.storage.userSectionList.findWhere(
          {
            sectionId: c.userQuestBattleResultList[0].questBattle.sectionId
          });
        if (a.searchQuestGiftId && "MAIN" == d.toJSON().section.questType || a.searchQuestGiftId && "SUB" == d.toJSON().section.questType || a.searchQuestGiftId && "CHARA" == d.toJSON().section.questType || a.searchQuestGiftId && "COSTUME" == d.toJSON().section.questType) b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/SearchQuest/" + e;
        else switch (d.toJSON().section.questType)
        {
          case "SUB":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/SubQuest";
            break;
          case "CHARA":
          case "COSTUME":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/CharaQuest";
            break;
          case "EVENT_S":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventTrainingTop";
            break;
          case "COMPOSE":
          case "MATERIAL":
          case "ENHANCEMENT_AROUSAL":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventQuest";
            break;
          case "TOWER":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventTowerTop";
            break;
          case "DAILYTOWER":
            var v = d.toJSON().section.parameter.split("=")[1];
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventDailyTowerTop/" + v.toLowerCase() + "/" + e;
            break;
          case "BRANCH":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventBranchTop";
            break;
          case "SINGLERAID":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventSingleRaidTop/" + e;
            break;
          case "ACCOMPLISH":
            b.resultUrl = "/magica/index.html#/RegularEventAccomplishTop/" + e;
            b.retireUrl = "/magica/index.html#/RegularEventAccomplishTop";
            break;
          case "STORYRAID":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventStoryRaidTop/" + e;
            break;
          case "RAID":
            b.resultUrl = "/magica/index.html#/EventRaidTop";
            b.retireUrl = "/magica/index.html#/EventRaidTop";
            break;
          case "GROUPBATTLE":
            b.resultUrl = "/magica/index.html#/RegularEventGroupBattleTop/" + e;
            b.retireUrl = "/magica/index.html#/RegularEventGroupBattleTop/" + e;
            break;
          case "EXTERMINATION":
            b.resultUrl = "/magica/index.html#/RegularEventExterminationBattleSelect/" + e;
            b.retireUrl = "/magica/index.html#/RegularEventExterminationBattleSelect";
            break;
          case "REG_ACC":
            b.resultUrl = "/magica/index.html#/RegularEventAccomplishTop/" + e;
            b.retireUrl = "/magica/index.html#/RegularEventAccomplishTop";
            break;
          default:
            b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/MainQuest"
        }
        "SECONDPARTLAST" === a.questBattleModel.questType && (b.resultUrl = "/magica/index.html#/SecondPartLastRouter/battleWin/" + e, b.retireUrl = "/magica/index.html#/SecondPartLastRouter");
        1033044 === e && (b.resultUrl = "/magica/index.html#/SecondPartLastRouter/forceLoseBattle/" + e, b.retireUrl = "/magica/index.html#/MainQuest");
        e = C.getIsPuellaHistoriaInfo(
        {
          sectionInfo: d.toJSON()
        });
        e.isPuellaHistoria && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/PuellaHistoriaTop", e.num && e.num == w.getPuellaHistoriaLastBattleNum(
        {
          type: "singleRaid"
        }) && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/PuellaHistoriaSingleRaid"), e.num && e.num == w.getPuellaHistoriaLastBattleNum(
        {
          type: "groupRaid"
        }) && (b.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultSubBoss", b.retireUrl = "/magica/index.html#/EventPuellaRaidTop", a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (b.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultMainBoss")));
        x.getIsScene0Info(
        {
          section: d.toJSON()
        }).isScene0 && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/Scene0BattleSelect")
      }
      f.setWebView(!1);
      a.nativeQuestPrm = c;
      a.nativeQuestPrm.urls = b;
      f.startQuest(c.userQuestBattleResultList[0].id, b, c.isLoop);
      window.isBrowser && $("#commandDiv").trigger("nativeCallback")
    };
  t.prototype.dungeonMapStartFunc = function(c)
  {
    if (!this.questDisableFlg)
      if (a.androidKeyStop = !0, function()
        {
          for (var a = [], b = 0; 10 > b;)
          {
            var f = c["userCardId" + (b + 1)];
            f && a.push(f);
            b = b + 1 | 0
          }
          return a
        }(), c.leaderPos)
      {
        if ("dungeon" === this.deckCatType)
        {
          f.startSe(1001);
          var b = {
            areaId: a.dungeonAreaModel.areaId,
            deckType: c.deckType
          };
          this.questDisableFlg = !0;
          r.ajaxPost(a.linkList.dungeonStart, b, function(b)
          {
            a.responseSetStorage(b);
            location.href = "#/EventDungeonMap"
          })
        }
        "dungeonInMap" === this.deckCatType && (f.startSe(1002), a.backLinkHandler())
      }
    else f.startSe(1002), new a.PopupClass(
    {
      title: "編成エラー",
      content: "メインメンバーに魔法少女を１体以上編成してください。",
      closeBtnText: "OK"
    }), a.androidKeyStop = !1
  };
  t.prototype.appendCharaStatus = function()
  {
    "accomplish" === this.deckCatType && a.userRegularEventAccomplishCharaArr && a.storage.userCardListEx.each(function(a)
    {
      var b = a.toJSON();
      G(b);
      a.clear(
      {
        silent: !0
      });
      a.set(b,
      {
        silent: !0
      })
    })
  };
  var G = function(c)
  {
    var b = a.userRegularEventAccomplishCharaArr[c.charaId];
    b ? (c.damage = b.damage, c.mp = b.mp, c.dp = 0, c.isRetired = b.isRetired, 0 < b.mp && (c.mp = Math.floor(b.mp / 10), 0 == c.mp && (c.mp = 1)), 100 < c.mp && (c.dp = c.mp - 100, c.mp = 100)) : (c.damage = 0, c.mp = 0, c.dp = 0, c.isRetired = null)
  };
  t.prototype.getTeamStatus = function(a)
  {
    var b = 0;
    _.each(a.deckInfo.userCardObj, function(a, c, f)
    {
      b += (a.addHp + a.addAttack + a.addDefense + a.addendHp + a.composeAttribute.composed.HP + a.addendAttack + a.composeAttribute.composed.ATTACK + a.addendDefense + a.composeAttribute.composed.DEFENSE + a.appendPoint) * a.rating
    });
    return b
  };
  t.prototype.startEventArenaRankMatchBattle = function(c)
  {
    c = c.currentDeckModel;
    if (a.EventArenaRankMatchPrm)
    {
      var b = r.getPageJson();
      a.EventArenaRankMatchPrm.deckEditPageJson && (b = a.EventArenaRankMatchPrm.deckEditPageJson);
      c.userCardId1 ? a.EventArenaRankMatchPrm.isDeckEditTimeOver ? J.openPopup(
      {}) : a.EventArenaRankMatchPrm.deckEditAccessTime && !B.isOpenEvent(
      {
        pageJson: b,
        pageAccessLocalTime: a.EventArenaRankMatchPrm.deckEditAccessTime,
        rankMatchEventInfo: a.EventArenaRankMatchPrm.eventInfo
      }) ? new a.PopupClass(
      {
        title: "イベント終了",
        content: "イベント開催期間外です。",
        closeBtnText: "OK",
        canClose: !1,
        popupType: "typeC"
      }, null, function() {}, function()
      {
        location.href = "#/ArenaTop"
      }) : (c = a.EventArenaRankMatchPrm, c.started || (c.started = !0, b = {
        opponentUserId: c.opponentInfo.userId,
        arenaBattleType: c.arenaBattleType,
        matchId: c.matchId
      }, a.battleEnemy = c.opponentInfo.userId, window.isBrowser ? (a.arenaJson = b, a.globalMenuView && a.globalMenuView.trigger("removeView"), f.sendCommand("ArenaStub," + JSON.stringify(b))) : r.ajaxPost(a.linkList.arenaStart, b, function(b)
      {
        a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
        $(a.ready.target).on("webkitAnimationEnd", function()
        {
          f.changeBg("web_black.jpg");
          $(a.ready.target).off("webkitAnimationEnd");
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          var c = {};
          c.questId = b.userQuestBattleResultList[0].id;
          c.replayId = b.userQuestBattleResultList[0].replayId;
          c.resultUrl = "/magica/index.html#/RegularEventArenaRankMatchResult";
          c.retireUrl = "/magica/index.html#/RegularEventArenaRankMatchTop";
          c.tips = {
            type: 2
          };
          a.globalMenuView && a.globalMenuView.trigger("removeView");
          setTimeout(function()
          {
            f.setWebView(!1);
            $("#commandDiv").on("nativeCallback", function(b, c)
            {
              $("#commandDiv").off();
              c && c.webData && a.responseSetStorage(c.webData);
              location.href = "#/QuestBackground"
            });
            f.startArena(c)
          }, 500)
        });
        a.addClass(a.ready.target, "preNativeFadeIn")
      }))) : (f.startSe(1002), new a.PopupClass(
      {
        title: "編成エラー",
        content: "バトル開始には、" + a.EventArenaRankMatchPrm.deckMinNum + "人以上の魔法少女が<br>編成に含まれている必要があります。",
        closeBtnText: "OK"
      }), a.androidKeyStop = !1)
    }
    else location.href = "#/ArenaTop"
  };
  t.prototype.startPuellaHistoriaGroupRaidBattle = function(c)
  {
    var b = c.deckModel,
      e = this;
    if (!e.questDisableFlg)
      if (a.androidKeyStop = !0, c = function()
        {
          for (var a = [], c = 0; 10 > c;)
          {
            var d = b["userCardId" + (c + 1)];
            d && a.push(d);
            c = c + 1 | 0
          }
          return a
        }(), c.length)
        if ((a.questBattleModel && a.questBattleModel.questBattle.onlyCharaIds || a.questBattleModel && a.questBattleModel.questBattle.containCharaIds) && !z.charaConditionCheck(a.questBattleModel.questBattle, c)) c = z.charaConditionText(a.questBattleModel.questBattle), f.startSe(1002), k = new a.PopupClass(
        {
          title: "クエスト開始条件",
          popupId: "charaConditionPopup",
          content: c,
          decideBtnText: "OK",
          canClose: !1
        }, null, function()
        {
          $("#charaConditionPopup .decideBtn").on(a.cgti, function(a)
          {
            k.remove()
          })
        });
        else
        {
          f.startSe(1001);
          var d = function()
          {
            var c = {};
            c.questBattleId = a.questBattleModel.questBattle.questBattleId;
            c.deckType = b.deckType;
            "RAID" === a.questBattleModel.questType ? c.raidId = a.questBattleModel.raidId : "GROUPBATTLE" === a.questBattleModel.questType && (c.groupId = a.questBattleModel.groupId);
            _.each(b, function(a, b)
            {
              if (-1 !== b.indexOf("questPositionId") || -1 !== b.indexOf("userCardId") || -1 !== b.indexOf("userPieceId")) c[b] = a
            });
            for (var d = 0, f = 0; 5 > d; ++d)
            {
              var h = b.userCardObj["place" + b.posArr[d]];
              h && !0 === h.switchCharaFlag && (c["switchCharaId" + (f + 1)] = h.chara.id, f++);
              !h || !0 !== h.rentalFlag && "extermination" !== b.deckCatType || (b["rentalPieceSetId" + (f + 1)] && (c["rentalPieceSetId" + (f + 1)] = b["rentalPieceSetId" + (f + 1)]), f++)
            }
            var d = null,
              k = [];
            a.questBattleModel.questBattle.questStoryList && _.each(a.questBattleModel.questBattle.questStoryList, function(a)
            {
              a && k.push(a)
            });
            a.questBattleModel.questBattle.endStory && k.push(a.questBattleModel.questBattle.endStory);
            a.questBattleModel.secret && (d = a.questBattleModel.secret);
            e.questDisableFlg = !0;
            a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (c.isPuellaRaidBreakItemUse = a.PuellaHistoriaLastBattleGroupRaidPrm.isUseItem);
            H(null, k, a.questBattleModel.userQuestAdventureList, c, d)
          };
          if (a.PuellaHistoriaLastBattleGroupRaidPrm && "sub" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType) d();
          else
          {
            var t = w.getStoryIdList(),
              h = [];
            _.each(b.userCardObj, function(a, b, c)
            {
              _.each(t.special, function(b, c, d)
              {
                a.charaId == b.charaId && h.push(b)
              })
            });
            var l = 0,
              n = function()
              {
                console.log("PHStory__count", l);
                l >= h.length ? d() : a.playStory(
                {
                  cmd: f,
                  ajaxControl: r,
                  storyId: h[l].storyId,
                  callback: function()
                  {
                    l++;
                    n()
                  }
                })
              };
            n()
          }
        }
    else
    {
      f.startSe(1002);
      var k = new a.PopupClass(
      {
        title: "編成エラー",
        content: "魔法少女を１体以上編成してください。",
        closeBtnText: "OK"
      });
      a.androidKeyStop = !1
    }
  };
  return t
});
