define("backboneCommon ajaxControl command QuestUtil cardUtil memoriaUtil js/view/user/APPopup js/quest/puellaHistoria/CreateModel js/event/EventArenaRankMatch/Utility js/event/EventArenaRankMatch/parts/DeckEditCountDown js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility js/event/EventWalpurgis/Utility".split(" "), function(a, u, h, x, A, F, t, B, w, K, v, y, z)
{
  function G(c)
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
    var c = w.getDeckType(),
      b = u.getPageJson(),
      e = null;
    this.deckCatType && "quest" !== this.deckCatType ? "support" == this.deckCatType ? e = 20 : "arena" == this.deckCatType ? e = 21 : "eventArena" == this.deckCatType ? e = 22 : "arenaRankMatchAttack" == this.deckCatType ? e = a.currentArenaRankMatchDeckType ? a.currentArenaRankMatchDeckType : c.attackBase + 1 : "arenaRankMatchDefence" == this.deckCatType ? e = c.defence : "dungeon" === this.deckCatType || "dungeonInMap" === this.deckCatType ? e = a.currentDungeonDeckType ? a.currentDungeonDeckType : a.userEventDungeon && a.userEventDungeon.selectedDeckType ? a.userEventDungeon.selectedDeckType : 41 : "group" == this.deckCatType || "groupPrepare" == this.deckCatType ? e = a.currentGroupDeckType ? a.currentGroupDeckType : a.groupDeckType ? a.groupDeckType : 51 : "endless" == this.deckCatType ? e = a.currentEndlessDeckType ? a.currentEndlessDeckType : 61 : "extermination" == this.deckCatType ? e = a.currentExterminationDeckType ? a.currentExterminationDeckType : 71 : "secondPartLast" == this.deckCatType ? e = a.currentSecondPartLastDeckType ? a.currentSecondPartLastDeckType : 101 : "accomplish" == this.deckCatType ? e = 81 : "puellaHistoriaGroupRaid" == this.deckCatType ? e = a.currentPuellaHistoriaGroupRaidDeckType ? a.currentPuellaHistoriaGroupRaidDeckType : v.getDeckType(
    {}) + 1 : "EventWalpurgisRaid" == this.deckCatType ? e = a.currentEventWalpurgisRaidDeckType ? a.currentEventWalpurgisRaidDeckType : z.getDeckType(
    {}) + 1 : "scene0Challenge" == this.deckCatType && (e = a.currentScene0ChallengeDeckType ? a.currentScene0ChallengeDeckType : y.getDeckType() + 1) : e = a.currentDeckType ? a.currentDeckType : b.gameUser && b.gameUser.deckType && 20 > b.gameUser.deckType ? b.gameUser.deckType : 11;
    return e || 11
  };
  t.prototype.deckPrmInit = function()
  {
    var c = u.getPageJson(),
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
    }, this.deckCatType && "quest" !== this.deckCatType || (c.questPositionHelper = 3), e = w.getDeckType(), b == e.attackBase + 1 && (c.name = "攻撃編成"), b == e.defence && (c.name = "防衛編成"), c = this.deckDataCreate(c));
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
      }, d = [], k = [], l = [], f = 0; 10 > f;)
    {
      if (a["userCardId" + (f + 1)])
      {
        d.push(a["userCardId" + (f + 1)]);
        k.push(a["questPositionId" + (f + 1)]);
        for (var q = "place" + a["questPositionId" + (f + 1)], m = [], r = 0; 4 > r;)
        {
          if (a.userPieceObj[q] && a.userPieceObj[q][r] && !a.userPieceObj[q][r].invalidFlag)
          {
            var p = "userPieceId" + ("000" + (f + 1) + (r + 1)).slice(-3);
            a[p] && m.push(a[p])
          }
          r = r + 1 | 0
        }
        l.push(m)
      }
      f = f + 1 | 0
    }
    if ("notRentalData" != b)
      for (c.rentalPieceSetIdList = [], f = 1; 10 >= f; f++) void 0 != a["rentalPieceSetId" + f] ? c.rentalPieceSetIdList.push(a["rentalPieceSetId" + f]) : c.rentalPieceSetIdList.push(null);
    c.userCardIds = d;
    c.questPositionIds = k;
    c.userPieceIdLists = l;
    return c
  };
  t.prototype.deckDataCreate = function(c)
  {
    var b = this;
    a.storage.userCardListEx || A.createCardList();
    var e = u.getPageJson(),
      d = _.clone(c);
    d.deckCatType = this.deckCatType;
    if ("RegularEventExterminationFormation" != a.location || "SecondPartLastFormation" != a.location) a.firstLoad = null != a.firstLoad ? a.firstLoad + 1 : 0;
    if (!d.name && !this.deckCatType || !d.name && "quest" === this.deckCatType || !d.name && "extermination" === this.deckCatType || !d.name && "secondPartLast" === this.deckCatType || !d.name && "dungeon" === this.deckCatType || !d.name && "dungeonInMap" === this.deckCatType)
    {
      var k = "チーム" + String(c.deckType).slice(-1);
      d.name = k
    }
    var l = {},
      f = [];
    _.each(d.formationSheet, function(a, b)
    {
      if (-1 !== b.indexOf("placeSkill") && -1 === b.indexOf("placeSkillId"))
      {
        f.push(b.split("placeSkill")[1]);
        var c = null;
        a.art1 && (c = [a.viewAttributeId]);
        l[b] = c
      }
    });
    "support" == this.deckCatType ? d.posArr = "123456".split("") : ("dungeon" != this.deckCatType && "dungeonInMap" != this.deckCatType || Array.prototype.push.apply(f, ["10", "11"]), d.placeEffect = l, d.posArr = f);
    a.switchNpcValidList || (a.switchNpcValidList = []);
    var q = [];
    if (a.questBattleModel)
      for (k = 0; 5 > k; ++k)
      {
        var m = a.questBattleModel.questBattle["switchCharaId" + (k + 1)];
        m && (void 0 !== a.switchNpcValidList[m] ? (q[m] = a.switchNpcValidList[m], q["load_" + m] = a.switchNpcValidList["load_" + m]) : (q[m] = !0, q["load_" + m] = !1), a.switchNpcValidList["set_" + m] && (q["set_" + m] = a.switchNpcValidList["set_" + m]))
      }
    a.switchNpcValidList = q;
    var r = {};
    d.leaderPos = null;
    _.each(d.posArr, function(b, e)
    {
      var n = "userCardId" + (e + 1),
        k = "questPositionId" + (e + 1),
        f = "switchNpcFlag" + (e + 1);
      if (d[n])
      {
        var n = d[n],
          g = _.findWhere(a.storage.userCardListEx.toJSON(),
          {
            id: n
          });
        g.switchNpcPos = e + 1;
        g.userCardId == d.questEpisodeUserCardId && (d.leaderPos = Number(c[k]));
        a.userRegularEventAccomplishCharaArr && H(g);
        if (a.rentalPieceData && a.rentalPieceData.rentalPieceSetList && a.rentalPieceData.rentalFlag)
        {
          2 > a.firstLoad && (a.rentalPieceData[n] = d["rentalPieceSetId" + (e + 1)] ? d["rentalPieceSetId" + (e + 1)] : null);
          if (a.rentalPieceData[n])
          {
            var l = _.findWhere(a.rentalPieceData.rentalPieceSetList,
            {
              pieceSetId: a.rentalPieceData[n]
            });
            if (void 0 == l || null == l) l = null;
            a.rentalSetFlag || (a.rentalReversFlag ? a.rentalPieceData[n] = d["rentalPieceSetId" + (e + 1)] : d["rentalPieceSetId" + (e + 1)] = a.rentalPieceData[n]);
            null != a.rentalPieceData[n] ? (g.rentalFlag = l, g.rentalID = a.rentalPieceData[n], g.rentalMemoriaUse = !0) : (g.rentalFlag = null, g.rentalID = null, g.rentalMemoriaUse = !1)
          }
          else a.rentalReversFlag ? (a.rentalPieceData[n] = d["rentalPieceSetId" + (e + 1)], l = _.findWhere(a.rentalPieceData.rentalPieceSetList,
          {
            pieceSetId: a.rentalPieceData[n]
          }), null != a.rentalPieceData[n] ? (g.rentalFlag = l, g.rentalID = a.rentalPieceData[n], g.rentalMemoriaUse = !0) : (g.rentalFlag = null, g.rentalID = null, g.rentalMemoriaUse = !1)) : d["rentalPieceSetId" + (e + 1)] = null;
          n = Object.assign(
          {}, g);
          n.supportFlag = !0;
          n.isNpc = !0;
          var p = [];
          _.each(g.rentalFlag, function(a, b)
          {
            "object" === typeof a && (b = b.slice(-1) - 0, p[b - 1] = {}, p[b - 1].level = g.rentalFlag["pieceLevel" + b], p[b - 1].pieceId = g.rentalFlag["pieceId" + b], p[b - 1].hp = g.rentalFlag["pieceHp" + b], p[b - 1].attack = g.rentalFlag["pieceAtk" + b], p[b - 1].defense = g.rentalFlag["pieceDef" + b], p[b - 1].lbCount = g.rentalFlag["pieceLbCount" + b], p[b - 1].piece = a, p[b - 1].rank = a.rank, p[b - 1].lockFlg = !0, p[b - 1].btnHide = !0)
          });
          g.rentalMemoriaModel = A.addExStatus(n, p, n.userDoppelList, n.userDeck)
        }
        else 2 > a.firstLoad ? d["rentalPieceSetId" + (e + 1)] ? (void 0 == a.rentalPieceData && (a.rentalPieceData = {}), a.rentalPieceData[n] = d["rentalPieceSetId" + (e + 1)]) : (void 0 == a.rentalPieceData && (a.rentalPieceData = {}), d["rentalPieceSetId" + (e + 1)] = null, a.rentalPieceData[n] = null) : (a.rentalPieceData && void 0 != a.rentalPieceData[n] && (d["rentalPieceSetId" + (e + 1)] = a.rentalPieceData[n]), g.rentalMemoriaUse = !1);
        if (void 0 != a.switchNpcValidList[g.chara.id])
        {
          if (n = _.find(a.switchNpcList, function(a)
            {
              return a.userCharaList[0].charaId == g.chara.id
            })) 1 == a.switchNpcValidList["set_" + g.chara.id] && 1 == a.switchNpcCompar.setReturn ? a.switchNpcValidList[g.chara.id] = g.switchCharaFlag = d[f] : null != d.switchNpcEventId && a.switchNpcCompar.eventId == d.switchNpcEventId ? null == d[f] ? (g.switchCharaFlag = d[f] = a.switchNpcValidList[g.chara.id], a.switchNpcValidList["load_" + g.chara.id] = !0) : 1 == a.switchNpcValidList["load_" + g.chara.id] ? g.switchCharaFlag = d[f] = a.switchNpcValidList[g.chara.id] : (g.switchCharaFlag = a.switchNpcValidList[g.chara.id] = d[f], a.switchNpcValidList["load_" + g.chara.id] = !0) : void 0 != a.switchNpcCompar.eventId && a.switchNpcCompar.eventId != d.switchNpcEventId ? (d.switchNpcEventId = a.switchNpcCompar.eventId, void 0 == g.switchCharaFlag && (g.switchCharaFlag = d[f] = a.switchNpcValidList[g.chara.id])) : void 0 == g.switchCharaFlag && (g.switchCharaFlag = void 0 != d[f] ? a.switchNpcValidList[g.chara.id] = d[f] : d[f] = a.switchNpcValidList[g.chara.id]), d["switchNpcFlag" + (e + 1)] = g.switchCharaFlag, e = $.extend(n.userCardList[0], n.userCharaList[0]), e.supportFlag = !0, e.isNpc = !0, _.each(n.userPieceList, function(a)
          {
            a.lockFlg = !0;
            a.rank = a.piece.rank;
            a.btnHide = !0
          }), g.switchCharaModel = A.addExStatus(e, n.userPieceList, n.userDoppelList, n.userDeck)
        }
        else void 0 !== a.switchNpcCompar && null !== a.switchNpcCompar && (void 0 !== a.switchNpcCompar[g.userCardId] ? null != a.switchNpcCompar[g.userCardId] ? d[f] = a.switchNpcCompar[g.userCardId] : void 0 != d[f] && null != d[f] && (d[f] = a.switchNpcCompar[g.userCardId]) : null != d[f] ? null == a.switchNpcCompar[g.userCardId] ? null != a.switchNpcCompar.eventId ? d[f] = null : a.switchNpcCompar[g.userCardId] = d[f] : a.switchNpcCompar[g.userCardId] = d[f] : a.switchNpcCompar[g.userCardId] = null);
        r["place" + d[k]] = g
      }
      else d[f] = null;
      "support" !== this.deckCatType && d.questPositionHelper == b && (g = {}, "quest" === this.deckCatType && a.questSupportModel && (g = a.questSupportModel), g.support = !0, r["place" + b] = g)
    }.bind(this));
    d.userCardObj = r;
    var p = {};
    _.each(d.posArr, function(b, e)
    {
      if (c["questPositionId" + (e + 1)])
      {
        b = "place" + c["questPositionId" + (e + 1)];
        var n = "userPieceId" + ("00" + (e + 1)).slice(-2),
          f = d.userCardObj[b],
          k = f ? f.revision + 1 : 0;
        for (e = 0; 4 > e;)
        {
          var g = n + (e + 1);
          if (d[g])
          {
            0 == b in p && (p[b] = []);
            var g = _.findWhere(a.storage.userPieceList.toJSON(),
              {
                id: d[g]
              }),
              l = !1;
            0 >= k && (l = "invalidRev");
            g.piece.charaList && (_.findWhere(g.piece.charaList,
            {
              charaId: f.charaId | 0
            }) || (l = "invalidChara"));
            "ALL" !== g.piece.attributeId && g.piece.attributeId !== f.chara.attributeId && (l = "invalidAtt");
            k--;
            g.maxLevel = F.getMaxLevel(g.piece.rank, g.lbCount);
            g.invalidFlag = l;
            p[b][e] = g
          }
          else k--;
          e = e + 1 | 0
        }
      }
    });
    if ("quest" === this.deckCatType && a.questSupportModel)
      for (k = 0; 4 > k;) m = "equipPiece" + (k + 1), a.questSupportModel[m] && (q = "place" + c.questPositionHelper, 0 == q in p && (p[q] = []), m = a.questSupportModel[m], m.maxLevel = F.getMaxLevel(m.piece.rank, m.lbCount), p[q][k] = m), k = k + 1 | 0;
    d.userPieceObj = p;
    _.each(d.userCardObj, function(a, b)
    {
      a.switchCharaModel && (a.switchCharaModel.userPieceList = 0);
      d.userPieceObj[b] && (_.each(d.userPieceObj[b], function(b, c)
      {
        b && (a["equipPiece" + (c + 1)] = b)
      }), a = A.totalEventEffectSet(a))
    });
    var h, t, C;
    if ("group" === this.deckCatType || "groupPrepare" === this.deckCatType)
      if (e = _.findWhere(e.regularEventList,
        {
          regularEventType: "GROUPBATTLE"
        })) h = e.regularEventGroupBattle.recommendRatingPointRate / 1E3, t = (e.regularEventGroupBattle.atkRatingPointRate - 1E3) / 1E3, C = e.regularEventGroupBattle.recommendCharaAttributes.split(",");
    d.teamStatus = 0;
    _.each(d.userCardObj, function(c, e)
    {
      c.supportFlag || (c.rating = 1, c.appendPoint = 0, c.addHp = c.hp ? c.hp : 0, c.addAttack = c.attack ? c.attack : 0, c.addDefense = c.defense ? c.defense : 0, c.memoriaHp = 0, c.memoriaAttack = 0, c.memoriaDefense = 0, c.addAttribute = {
        hp: 0,
        attack: 0,
        defense: 0
      }, c.composeAttribute && (c.addAttribute.hp = c.composeAttribute.composed.HP, c.addAttribute.attack = c.composeAttribute.composed.ATTACK, c.addAttribute.defense = c.composeAttribute.composed.DEFENSE), h && C && -1 < C.indexOf(c.chara.attributeId) && (c.rating *= h), t && (c.appendPoint += t * c.attack), d.userPieceObj[e] && _.each(d.userPieceObj[e], function(a)
      {
        a && !a.invalidFlag && (c.addHp += a.hp, c.addAttack += a.attack, c.addDefense += a.defense, c.memoriaHp += a.hp, c.memoriaAttack += a.attack, c.memoriaDefense += a.defense)
      }), c.isPHLBUseItem = null, "puellaHistoriaGroupRaid" == d.deckCatType && a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (c.isPHLBUseItem = a.PuellaHistoriaLastBattleGroupRaidPrm.isUseItem), c.isEventWalpurgisRaidUseItem = null, "EventWalpurgisRaid" == d.deckCatType && a.EventWalpurgisRaidPrm && "main" == a.EventWalpurgisRaidPrm.battleType && (c.isEventWalpurgisRaidUseItem = a.EventWalpurgisRaidPrm.isUseItem), c.addEvent = {
        hp: 0,
        attack: 0,
        defense: 0
      }, ("arenaRankMatchAttack" === b.deckCatType || "arenaRankMatchDefence" === b.deckCatType) && a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.spPlusList && _.each(a.EventArenaRankMatchPrm.spPlusList, function(a, b, d)
      {
        b == c.card.attributeId && _.each(a, function(a, b, d)
        {
          c.addEvent[b] = a;
          c.isArenaRankMatchPrmChange = "plus";
          0 > a && (c.isArenaRankMatchPrmChange = "minus")
        })
      }), c.totalHp = c.addHp + c.addEvent.hp + c.addendHp + c.addAttribute.hp, c.totalAttack = c.addAttack + c.addEvent.attack + c.addendAttack + c.addAttribute.attack, c.totalDefense = c.addDefense + c.addEvent.defense + c.addendDefense + c.addAttribute.defense, 0 > c.totalHp && (c.totalHp = 0), 0 > c.totalAttack && (c.totalAttack = 0), 0 > c.totalDefense && (c.totalDefense = 0), d.teamStatus += (c.totalHp + c.totalAttack + c.totalDefense + c.appendPoint) * c.rating)
    });
    20 == c.deckType && (d.name = "サポートチーム");
    21 == c.deckType && (d.name = "ミラーズチーム");
    22 == c.deckType && (d.name = "イベントミラーズチーム");
    "arenaRankMatchAttack" == d.deckCatType && (d.name = "攻撃編成");
    e = w.getDeckType();
    c.deckType == e.defence && (d.name = "防衛編成");
    return d
  };
  var L = function(a, b)
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
          return b >= v.getDeckType(
          {}) + 1 && v.getDeckType(
          {}) + 5 >= b;
        case "EventWalpurgisRaid":
          return b >= z.getDeckType(
          {}) + 1 && z.getDeckType(
          {}) + 5 >= b;
        case "scene0Challenge":
          return b >= y.getDeckType() + 1 && y.getDeckType() + 5 >= b;
        case "arenaRankMatchAttack":
          return b >= w.getDeckType().attackBase + 1 && w.getDeckType().attackBase + 5 >= b;
        default:
          return 11 <= b && 19 >= b
      }
    },
    M = {
      quest: "1",
      dungeon: "4",
      dungeonInMap: "4",
      group: "5",
      groupPrepare: "5",
      endless: "6",
      extermination: "7",
      secondPartLast: "10",
      accomplish: "8",
      puellaHistoriaGroupRaid: String(v.getDeckType(
      {}) / 10),
      EventWalpurgisRaid: String(z.getDeckType(
      {}) / 10),
      scene0Challenge: String(y.getDeckType() / 10),
      arenaRankMatchAttack: String(w.getDeckType().attackBase / 10),
      exterminationCopy: "1",
      secondPartLastCopy: "1"
    };
  t.prototype.deckListDataCreate = function()
  {
    var c = this.deckCatType || "quest",
      b = [];
    _.each(a.storage.userDeckList.toJSON(), function(a, c)
    {
      if (L(this.deckCatType, a.deckType))
      {
        var d = [];
        _.each(a.formationSheet, function(a, c)
        {
          -1 !== c.indexOf("placeSkillId") && d.push(c.split("placeSkillId")[1])
        });
        a.posArr = d;
        b.push(a)
      }
    }.bind(this));
    var e = 0;
    a.rentalSetFlag = !1;
    var d = 9;
    for ("group" === c || "groupPrepare" === c ? d = 4 : "endless" === c ? d = 3 : "accomplish" === c ? d = 1 : "puellaHistoriaGroupRaid" === c ? d = 5 : "EventWalpurgisRaid" === c ? d = 5 : "scene0Challenge" === c ? d = 5 : "arenaRankMatchAttack" === c && (d = 5); e < d;)
    {
      var k = M[c] + (e + 1);
      _.findWhere(b,
      {
        deckType: Number(k)
      }) || (k = {
        name: "チーム" + String(k).slice(-1),
        deckType: Number(k)
      }, b.push(k));
      e = e + 1 | 0
    }
    b.sort(function(a, c)
    {
      return a.deckType < c.deckType ? -1 : a.deckType > c.deckType ? 1 : 0
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
      case "EventWalpurgisRaid":
        this.startEventWalpurgisRaidBattle(
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
        h.startSe(1002);
        var e = new a.PopupClass(
        {
          title: "編成エラー",
          content: "バトル開始には、3人以上の魔法少女が<br>編成に含まれている必要があります。",
          closeBtnText: "OK"
        });
        a.androidKeyStop = !1
      }
      else if (b.length)
        if ((a.questBattleModel && a.questBattleModel.questBattle.onlyCharaIds || a.questBattleModel && a.questBattleModel.questBattle.containCharaIds) && !x.charaConditionCheck(a.questBattleModel.questBattle, b)) b = x.charaConditionText(a.questBattleModel.questBattle), h.startSe(1002), e = new a.PopupClass(
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
              k = !1;
            _.each(c.userCardObj, function(a, b)
            {
              a.isRetired && (k = !0);
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
            if (k)
            {
              h.startSe(1002);
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
          var l = {};
          l.questBattleId = a.questBattleModel.questBattle.questBattleId;
          l.deckType = c.deckType;
          "RAID" === a.questBattleModel.questType ? l.raidId = a.questBattleModel.raidId : "GROUPBATTLE" === a.questBattleModel.questType && (l.groupId = a.questBattleModel.groupId);
          _.each(c, function(a, b)
          {
            if (-1 !== b.indexOf("questPositionId") || -1 !== b.indexOf("userCardId") || -1 !== b.indexOf("userPieceId")) l[b] = a
          });
          for (var f = b = 0; 5 > b; ++b)
          {
            var q = c.userCardObj["place" + c.posArr[b]];
            q && !0 === q.switchCharaFlag && (l["switchCharaId" + (f + 1)] = q.chara.id, f++);
            !q || !0 !== q.rentalFlag && "extermination" !== c.deckCatType || (c["rentalPieceSetId" + (f + 1)] && (l["rentalPieceSetId" + (f + 1)] = c["rentalPieceSetId" + (f + 1)]), f++)
          }
          a.questSupportModel && (a.questSupportModel.isNpc ? l.npcHelpId = a.questSupportModel.npcHelpId : (l.helperUserId = a.questSupportModel.userId, a.questHelperId = a.questSupportModel.userId, l.helperUserCardId = a.questSupportModel.userCardId), l.helpAttributeId = a.questSupportModel.supportTabAtt.toUpperCase(), l.helperPositionId = c.questPositionHelper);
          var b = null,
            f = a.questBattleModel.questBattle.startStory,
            m = [];
          a.questBattleModel.questBattle.questStoryList && _.each(a.questBattleModel.questBattle.questStoryList, function(a)
          {
            a && m.push(a)
          });
          a.questBattleModel.questBattle.endStory && m.push(a.questBattleModel.questBattle.endStory);
          a.questBattleModel.secret && (b = a.questBattleModel.secret);
          this.questDisableFlg = !0;
          D(f, m, a.questBattleModel.userQuestAdventureList, l, b, c);
          h.startSe(1001)
        }
      else h.startSe(1002), e = new a.PopupClass(
      {
        title: "編成エラー",
        content: "魔法少女を１体以上編成してください。",
        closeBtnText: "OK"
      }), a.androidKeyStop = !1
    }
  };
  var D = function(c, b, e, d, k, l)
    {
      $(a.ready.target).on("webkitAnimationEnd", function()
      {
        h.changeBg("web_black.jpg");
        $(a.ready.target).off();
        $(a.ready.target).on("webkitAnimationEnd", function(b)
        {
          "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
        });
        var f = !0,
          q = !0,
          m = 0;
        if (!a.questBattleModel.storyForceStart)
        {
          _.each(e, function(a)
          {
            c === a.adventureId && (f = !1); - 1 < b.indexOf(a.adventureId) && m++
          });
          if (0 == b.length || 0 < b.length && b.length == m) q = !1;
          "MAIN" != a.questBattleModel.questType && "SUB" != a.questBattleModel.questType && "CHARA" != a.questBattleModel.questType && "COSTUME" != a.questBattleModel.questType || a.storage.gameUser.toJSON().skipAdventure || (q = f = !0);
          c || (f = !1);
          0 == b.length && (q = !1)
        }
        a.questBattleModel.eventBranchData && !a.questBattleModel.eventBranchData.startStoryJson && (f = !1);
        h.endL2d();
        var r = null;
        if (window.isBrowser) a.stubQuest = d, a.apiQuestPrm = d, h.sendCommand("QuestStub");
        else if (a.apiQuestPrm = d, f)
        {
          var p = function(b)
            {
              var e = function()
              {
                $("#commandDiv").on("nativeCallback", function(a, b)
                {
                  $("#commandDiv").off();
                  G(b);
                  location.href = "#/QuestBackground"
                });
                I(b)
              };
              $("#commandDiv").on("nativeCallback", function(b, f)
              {
                $("#commandDiv").off();
                f && f.isSkipped && (b = {}, b.adventureId = String(c), u.ajaxPost(a.linkList.adventureSkip, b, function(b)
                {
                  a.responseSetStorage(b)
                }));
                a.questBattleModel.eventBranchData && f && f.alternativeIdList && u.ajaxPost(a.linkList.branchAlternativeStart,
                {
                  pointId: a.questBattleModel.eventBranchData.pointId,
                  alternativeIdList: f.alternativeIdList
                });
                J(
                {
                  questBattleId: d.questBattleId
                }) ? E(
                {
                  deckModel: l,
                  callback: e
                }) : e()
              })
            },
            t = function(b, c)
            {
              $("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                p(c);
                h.startStory(b);
                window.isBrowser && $("#commandDiv").trigger("nativeCallback")
              });
              h.downloadFileFullVoice("section_" + a.questBattleModel.questBattle.sectionId);
              window.isBrowser && $("#commandDiv").trigger("nativeCallback")
            },
            v = function(b, c)
            {
              $("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                p(c);
                h.startStory(b);
                window.isBrowser && $("#commandDiv").trigger("nativeCallback")
              });
              h.downloadFileFullVoice("section_event_" + a.questBattleModel.eventObj.event.eventId);
              window.isBrowser && $("#commandDiv").trigger("nativeCallback")
            },
            r = function(b)
            {
              b.isLoop = a.questBattleModel.isLoop;
              var d = String(c);
              k && (d += "_" + k);
              setTimeout(function()
              {
                h.setWebView(!1);
                a.questBattleModel.eventBranchData ? (p(b), h.startBranchStory(a.questBattleModel.eventBranchData.startStoryJson)) : B.getIsPuellaHistoriaInfo(
                {
                  sectionInfo: a.storage.userSectionList.findWhere(
                  {
                    sectionId: a.questBattleModel.questBattle.sectionId
                  }).toJSON()
                }).isPuellaHistoria ? (p(b), h.startStory(d)) : "MAIN" == a.questBattleModel.questType || "SECONDPARTLAST" === a.questBattleModel.questType ? t(d, b) : a.questBattleModel.eventObj && a.questBattleModel.eventObj.event && a.questBattleModel.eventObj.event.existsVoice ? v(d, b) : (p(b), h.startStory(d), window.isBrowser && $("#commandDiv").trigger("nativeCallback"))
              }, 500)
            };
          $("#popupArea").on(a.cgti, "#resultCodeError .popupCloseBtn", function(b)
          {
            b.preventDefault();
            a.isScrolled() || ($("#popupArea").off(), h.nativeReload("#/TopPage"))
          });
          "SECONDPARTLAST" === a.questBattleModel.questType ? u.ajaxPost(a.linkList.secondPartLastBattleStart, d, r) : u.ajaxPost(a.linkList.questStart, d, r)
        }
        else p = function(b)
        {
          b.isLoop = a.questBattleModel.isLoop;
          var c = function()
          {
            $("#commandDiv").on("nativeCallback", function(a, b)
            {
              $("#commandDiv").off();
              G(b);
              location.href = "#/QuestBackground"
            });
            I(b)
          };
          J(
          {
            questBattleId: d.questBattleId
          }) ? E(
          {
            deckModel: l,
            callback: c
          }) : c()
        }, r = function(b)
        {
          setTimeout(function()
          {
            h.setWebView(!1);
            if (q)
            {
              var c = null;
              "MAIN" == a.questBattleModel.questType ? c = "section_" + a.questBattleModel.questBattle.sectionId : a.questBattleModel.eventObj && a.questBattleModel.eventObj.event && a.questBattleModel.eventObj.event.existsVoice && (c = "section_event_" + a.questBattleModel.eventObj.event.eventId);
              B.getIsPuellaHistoriaInfo(
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
              }), h.downloadFileFullVoice(c), window.isBrowser && $("#commandDiv").trigger("nativeCallback")) : p(b)
            }
            else p(b)
          }, 500)
        }, $("#popupArea").on(a.cgti, "#resultCodeError .popupCloseBtn", function(b)
        {
          b.preventDefault();
          a.isScrolled() || ($("#popupArea").off(), h.nativeReload("#/TopPage"))
        }), "RAID" === a.questBattleModel.questType ? u.ajaxPost(a.linkList.raidQuestStart, d, r) : "GROUPBATTLE" === a.questBattleModel.questType ? a.questBattleModel.isSimulate ? u.ajaxPost(a.linkList.groupBattleBattleSimulateStart, d, r) : u.ajaxPost(a.linkList.groupBattleBattleStart, d, r) : "EXTERMINATION" === a.questBattleModel.questType ? u.ajaxPost(a.linkList.exterminationBattleStart, d, r) : "SECONDPARTLAST" === a.questBattleModel.questType ? u.ajaxPost(a.linkList.secondPartLastBattleStart, d, r) : u.ajaxPost(a.linkList.questStart, d, r)
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
            var k = d.toJSON().section.parameter.split("=")[1];
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventDailyTowerTop/" + k.toLowerCase() + "/" + e;
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
          case "WITCH":
            b.resultUrl = "/magica/index.html#/QuestResult";
            b.retireUrl = "/magica/index.html#/EventWitchTopPage";
            break;
          default:
            b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/MainQuest"
        }
        "SECONDPARTLAST" === a.questBattleModel.questType && (b.resultUrl = "/magica/index.html#/SecondPartLastRouter/battleWin/" + e, b.retireUrl = "/magica/index.html#/SecondPartLastRouter");
        1033044 === e && (b.resultUrl = "/magica/index.html#/SecondPartLastRouter/forceLoseBattle/" + e, b.retireUrl = "/magica/index.html#/MainQuest");
        e = B.getIsPuellaHistoriaInfo(
        {
          sectionInfo: d.toJSON()
        });
        e.isPuellaHistoria && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/PuellaHistoriaTop", e.num && e.num == v.getPuellaHistoriaLastBattleNum(
        {
          type: "singleRaid"
        }) && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/PuellaHistoriaSingleRaid"), e.num && e.num == v.getPuellaHistoriaLastBattleNum(
        {
          type: "singleRaidLast"
        }) && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/PuellaHistoriaSingleRaid"), e.num && e.num == v.getPuellaHistoriaLastBattleNum(
        {
          type: "groupRaid"
        }) && (b.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultSubBoss", b.retireUrl = "/magica/index.html#/EventPuellaRaidTop", a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (b.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultMainBoss")));
        y.getIsScene0Info(
        {
          section: d.toJSON()
        }).isScene0 && (b.resultUrl = "/magica/index.html#/QuestResult", b.retireUrl = "/magica/index.html#/Scene0BattleSelect");
        d = z.getAfterBattleUrl(
        {
          section: d.toJSON(),
          pageJson: u.getPageJson()
        });
        d.isOpen && (b.resultUrl = d.resultUrl, b.retireUrl = d.retireUrl)
      }
      h.setWebView(!1);
      a.nativeQuestPrm = c;
      a.nativeQuestPrm.urls = b;
      h.startQuest(c.userQuestBattleResultList[0].id, b, c.isLoop);
      window.isBrowser && $("#commandDiv").trigger("nativeCallback")
    };
  t.prototype.dungeonMapStartFunc = function(c)
  {
    if (!this.questDisableFlg)
      if (a.androidKeyStop = !0, function()
        {
          for (var a = [], b = 0; 10 > b;)
          {
            var k = c["userCardId" + (b + 1)];
            k && a.push(k);
            b = b + 1 | 0
          }
          return a
        }(), c.leaderPos)
      {
        if ("dungeon" === this.deckCatType)
        {
          h.startSe(1001);
          var b = {
            areaId: a.dungeonAreaModel.areaId,
            deckType: c.deckType
          };
          this.questDisableFlg = !0;
          u.ajaxPost(a.linkList.dungeonStart, b, function(b)
          {
            a.responseSetStorage(b);
            location.href = "#/EventDungeonMap"
          })
        }
        "dungeonInMap" === this.deckCatType && (h.startSe(1002), a.backLinkHandler())
      }
    else h.startSe(1002), new a.PopupClass(
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
      H(b);
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
  var H = function(c)
  {
    var b = a.userRegularEventAccomplishCharaArr[c.charaId];
    b ? (c.damage = b.damage, c.mp = b.mp, c.dp = 0, c.isRetired = b.isRetired, 0 < b.mp && (c.mp = Math.floor(b.mp / 10), 0 == c.mp && (c.mp = 1)), 100 < c.mp && (c.dp = c.mp - 100, c.mp = 100)) : (c.damage = 0, c.mp = 0, c.dp = 0, c.isRetired = null)
  };
  t.prototype.startEventArenaRankMatchBattle = function(c)
  {
    c = c.currentDeckModel;
    if (a.EventArenaRankMatchPrm)
    {
      var b = u.getPageJson();
      a.EventArenaRankMatchPrm.deckEditPageJson && (b = a.EventArenaRankMatchPrm.deckEditPageJson);
      if (c.userCardId1)
        if (a.EventArenaRankMatchPrm.isDeckEditTimeOver) K.openPopup(
        {});
        else if (a.EventArenaRankMatchPrm.deckEditAccessTime && !w.isOpenEvent(
        {
          pageJson: b,
          pageAccessLocalTime: a.EventArenaRankMatchPrm.deckEditAccessTime,
          rankMatchEventInfo: a.EventArenaRankMatchPrm.eventInfo
        })) new a.PopupClass(
      {
        title: "イベント終了",
        content: "イベント開催期間外です。",
        closeBtnText: "OK",
        canClose: !1,
        popupType: "typeC"
      }, null, function() {}, function()
      {
        location.href = "#/ArenaTop"
      });
      else
      {
        if (b = a.EventArenaRankMatchPrm, !b.started)
        {
          b.started = !0;
          var e = {
            deckNum: c.deckType,
            opponentUserId: b.opponentInfo.userId,
            arenaBattleType: b.arenaBattleType,
            matchId: b.matchId
          };
          a.currentArenaRankMatchDeckType = c.deckType;
          a.battleEnemy = b.opponentInfo.userId;
          window.isBrowser ? (a.arenaJson = e, a.globalMenuView && a.globalMenuView.trigger("removeView"), h.sendCommand("ArenaStub," + JSON.stringify(e))) : u.ajaxPost(a.linkList.arenaStart, e, function(b)
          {
            a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
            $(a.ready.target).on("webkitAnimationEnd", function()
            {
              h.changeBg("web_black.jpg");
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
                h.setWebView(!1);
                $("#commandDiv").on("nativeCallback", function(b, c)
                {
                  $("#commandDiv").off();
                  c && c.webData && a.responseSetStorage(c.webData);
                  location.href = "#/QuestBackground"
                });
                h.startArena(c)
              }, 500)
            });
            a.addClass(a.ready.target, "preNativeFadeIn")
          })
        }
      }
      else h.startSe(1002), new a.PopupClass(
      {
        title: "編成エラー",
        content: "バトル開始には、" + a.EventArenaRankMatchPrm.deckMinNumList.arenaRankMatchAttack + "人以上の魔法少女が<br>編成に含まれている必要があります。",
        closeBtnText: "OK"
      }), a.androidKeyStop = !1
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
        }(), c.length)(a.questBattleModel && a.questBattleModel.questBattle.onlyCharaIds || a.questBattleModel && a.questBattleModel.questBattle.containCharaIds) && !x.charaConditionCheck(a.questBattleModel.questBattle, c) ? (c = x.charaConditionText(a.questBattleModel.questBattle), h.startSe(1002), d = new a.PopupClass(
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
          d.remove()
        })
      })) : (h.startSe(1001), c = function()
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
          m = [];
        a.questBattleModel.questBattle.questStoryList && _.each(a.questBattleModel.questBattle.questStoryList, function(a)
        {
          a && m.push(a)
        });
        a.questBattleModel.questBattle.endStory && m.push(a.questBattleModel.questBattle.endStory);
        a.questBattleModel.secret && (d = a.questBattleModel.secret);
        e.questDisableFlg = !0;
        a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (c.isPuellaRaidBreakItemUse = a.PuellaHistoriaLastBattleGroupRaidPrm.isUseItem);
        D(null, m, a.questBattleModel.userQuestAdventureList, c, d, b)
      }, a.PuellaHistoriaLastBattleGroupRaidPrm && "sub" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType ? c() : E(
      {
        deckModel: b,
        callback: c
      }));
      else
      {
        h.startSe(1002);
        var d = new a.PopupClass(
        {
          title: "編成エラー",
          content: "魔法少女を１体以上編成してください。",
          closeBtnText: "OK"
        });
        a.androidKeyStop = !1
      }
  };
  var E = function(c)
    {
      var b = c.deckModel,
        e = c.callback,
        d = v.getStoryIdList(),
        k = [];
      _.each(b.userCardObj, function(a, b, c)
      {
        _.each(d.special, function(b, c, d)
        {
          a.charaId == b.charaId && k.push(b)
        })
      });
      var l = 0,
        f = function()
        {
          l >= k.length ? e() : a.playStory(
          {
            cmd: h,
            ajaxControl: u,
            storyId: k[l].storyId,
            callback: function()
            {
              l++;
              f()
            }
          })
        };
      f()
    },
    J = function(a)
    {
      var b = !1;
      1041021 == a.questBattleId && (b = !0);
      return b
    };
  t.prototype.startEventWalpurgisRaidBattle = function(c)
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
        }(), c.length)(a.questBattleModel && a.questBattleModel.questBattle.onlyCharaIds || a.questBattleModel && a.questBattleModel.questBattle.containCharaIds) && !x.charaConditionCheck(a.questBattleModel.questBattle, c) ? (c = x.charaConditionText(a.questBattleModel.questBattle), h.startSe(1002), d = new a.PopupClass(
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
          d.remove()
        })
      })) : (h.startSe(1001), function()
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
          m = [];
        a.questBattleModel.questBattle.questStoryList && _.each(a.questBattleModel.questBattle.questStoryList, function(a)
        {
          a && m.push(a)
        });
        a.questBattleModel.questBattle.endStory && m.push(a.questBattleModel.questBattle.endStory);
        a.questBattleModel.secret && (d = a.questBattleModel.secret);
        e.questDisableFlg = !0;
        a.EventWalpurgisRaidPrm && "main" == a.EventWalpurgisRaidPrm.battleType && (c.isBreakItemUse = a.EventWalpurgisRaidPrm.isUseItem);
        D(null, m, a.questBattleModel.userQuestAdventureList, c, d, b)
      }());
      else
      {
        h.startSe(1002);
        var d = new a.PopupClass(
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
