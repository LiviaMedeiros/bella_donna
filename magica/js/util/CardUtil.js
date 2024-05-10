define(["underscore", "backbone", "backboneCommon", "ajaxControl", "memoriaUtil"], function(h, m, l, n, p)
{
  function t(a, b)
  {
    if (!a.charaId || !b || !l.storage.gameUser || l.storage.gameUser.toJSON().eventTrainingId !== b.eventId) return !1;
    var c = !1,
      d = a.charaId;
    a = l.storage.gameUser.toJSON().trainingSelectedCharaNos.split(",");
    h.each(a, function(a)
    {
      d == a && (c = !0)
    });
    return c
  }
  var d = {},
    u = m.Collection.extend();
  m.Model.extend();
  d.totalEventEffectSet = function(a)
  {
    var b = 0,
      c = a.revision + 1;
    a.eventEffect = {};
    for (var d = 0; b < c;)
    {
      if (a["equipPiece" + (b + 1)])
      {
        var e = a["equipPiece" + (b + 1)];
        e.eventType && (a.eventType = e.eventType.toLowerCase());
        e.eventId && (a.eventId = e.eventId);
        e.eventEffect && (a.eventEffect || (a.eventEffect = {}), a.eventEffectValue || (a.eventEffectValue = 0), a.bonusFlag = !0, h.each(e.eventEffect, function(b, c)
        {
          c in a.eventEffect || (a.eventEffect[c] = 0);
          a.eventEffect[c] += b | 0;
          d = a.eventEffect[c]
        }));
        e.regularEventType && (a.regularEventType = e.regularEventType.toLowerCase());
        e.regularEventId && (a.regularEventId = e.regularEventId);
        e.regularEventEffect && (a.regularEventEffect || (a.regularEventEffect = {}), a.regularBonusFlag = !0, h.each(e.regularEventEffect, function(b, c)
        {
          c in a.regularEventEffect || (a.regularEventEffect[c] = 0);
          a.regularEventEffect[c] += b | 0
        }))
      }
      b = b + 1 | 0
    }
    a.eventEffectValue = d;
    return a
  };
  d.memoriaEventSet = function()
  {
    var a = l.storage.userPieceList;
    a && a.each(function(a)
    {
      var b = d.memoriaEventCheck(a.toJSON());
      b && a.set(b)
    })
  };
  d.memoriaEventCheck = function(a)
  {
    if (!a) return !1;
    var b = [],
      c = {},
      d = n.getPageJson();
    h.each(d.eventList, function(d, e)
    {
      b.push(d.eventId);
      c[d.eventId] = d.eventType;
      d && d.parameterMap && d.parameterMap.PROTECTED_PIECE_ID && Number(d.parameterMap.PROTECTED_PIECE_ID) == a.pieceId && (a.unprotectLimitFlag = !0)
    });
    h.each(d.regularEventList, function(d, e)
    {
      b.push(d.regularEventId);
      c[d.regularEventId] = d.regularEventType;
      d && d.parameterMap && d.parameterMap.PROTECTED_PIECE_ID && Number(d.parameterMap.PROTECTED_PIECE_ID) == a.pieceId && (a.unprotectLimitFlag = !0)
    });
    l.storage.userLimitedChallengeList && l.storage.userLimitedChallengeList.each(function(b, d)
    {
      b = b.toJSON();
      if ("LIMITED_PIECE_QUEST" === b.challenge.bean && Number(b.challenge.parameter2) == a.pieceId) return a.unprotectLimitFlag = !0, !1
    });
    if (0 == b.length || !a.piece || !a.piece.pieceSkill) return !1;
    var e = a.lbCount,
      d = null;
    a.eventDescription = "";
    d = 4 > e ? a.piece.pieceSkill : a.piece.pieceSkill2;
    if ((e = d.regularEventId) && 0 <= b.indexOf(e))
    {
      a.regularEventId = e;
      a.regularEventType = c[e];
      a.regularEventEffect = {};
      for (e = 1; 9 >= e; e++)
      {
        var f = d["regularEventArt" + e];
        if (f)
        {
          if (!(f.effectCode in a.regularEventEffect))
          {
            var g = f.effectCode;
            f.genericValue && (g += "_" + f.genericValue);
            a.regularEventEffect[g] = 0
          }
          f.effectValue && (a.regularEventEffect[g] += f.effectValue)
        }
      }
      a.eventDescription += "<span class='c_red'>" + d.regularEventDescription + "</span>"
    }
    if ((e = d.eventId) && 0 <= b.indexOf(e))
    {
      a.eventId = e;
      a.eventType = c[e];
      a.eventEffect = {};
      for (e = 1; 3 >= e; e++)
        if (f = d["eventArt" + e]) f.effectCode in a.eventEffect || (g = f.effectCode + "_" + f.genericValue, a.eventEffect[g] = 0), a.eventEffect[g] += f.effectValue;
      a.eventDescription += "<span class='c_red'>" + d.eventDescription + "</span>"
    }
    return a.eventId || a.regularEventId || a.unprotectLimitFlag ? a : !1
  };
  d.createCardList = function()
  {
    var a = [],
      b = n.getPageJson(),
      c = null;
    b.eventList && (c = b.eventList.filter(function(a, b)
    {
      if ("TRAINING" == a.eventType) return !0
    })[0]);
    var b = l.storage.userCharaList,
      k = l.storage.userCardList,
      e = l.storage.userPieceList,
      f = l.storage.userDeckList,
      g = l.storage.userPieceSetList;
    e.each(function(a)
    {
      a.set(
      {
        equipFlag: !1,
        eventType: null,
        eventId: null,
        eventEffect: null,
        regularEventId: null,
        regularEventEffect: null,
        eventDescription: null,
        equipDeck: []
      },
      {
        silent: !0
      })
    });
    f.each(function(a)
    {
      var b = a.toJSON();
      h.each(b, function(a, d)
      {
        if (-1 !== d.indexOf("userPieceId"))
        {
          d = 11 <= b.deckType && 19 >= b.deckType ? "quest" : 20 == b.deckType ? "support" : 21 == b.deckType ? "arena" : 22 == b.deckType ? "eventArena" : "event";
          a = e.findWhere(
          {
            id: a
          });
          var c = a.toJSON();
          c.equipDeck.push(d);
          a.set(c,
          {
            silent: !0
          })
        }
      })
    });
    g.each(function(a)
    {
      a = a.toJSON();
      h.each(a, function(a, b)
      {
        -1 !== b.indexOf("userPieceId") && (a = e.findWhere(
        {
          id: a
        }), b = a.toJSON(), b.equipDeck.push("pieceSet"), a.set(b,
        {
          silent: !0
        }))
      })
    });
    e.each(function(a)
    {
      var b = a.toJSON();
      b.equipDeck.filter(function(a, d)
      {
        return d === b.equipDeck.indexOf(a)
      });
      0 !== b.equipDeck.length && (b.equipFlag = !0);
      a.set(b,
      {
        silent: !0
      })
    });
    d.memoriaEventSet();
    h.each(b.toJSON(), function(b)
    {
      var e = b.userCardId;
      c && (b.eventFlag = t(b, c));
      b.chara.description = b.chara.description.replace(/＠/g, "<br>");
      var f = b.createdAt;
      h.each(k.toJSON(), function(c)
      {
        e == c.id && (c = d.addExStatus($.extend(b, c)), c.createdAt = f, a.push(c))
      })
    });
    l.hasModel("userCardListEx") ? h.each(a, function(a, b)
    {
      b = l.storage.userCardListEx.findWhere(
      {
        id: a.id
      });
      b.clear(
      {
        silent: !0
      });
      b.set(a,
      {
        silent: !0
      })
    }) : l.storage.userCardListEx = new u(a)
  };
  var v = {
    BALANCE: "バランス",
    ATTACK: "アタック",
    DEFENSE: "ディフェンス",
    MAGIA: "マギア",
    HEAL: "ヒール",
    SUPPORT: "サポート",
    ULTIMATE: "アルティメット",
    CIRCLE_MAGIA: "円環マギア",
    CIRCLE_SUPPORT: "円環サポート",
    EXCEED: "エクシード",
    AKUMA: "あくま",
    ARUTEMETTO: "あるてぃめっと",
    INFINITE: "インフィニット",
    MUGENDAI: "むげんだい",
    MYSTIC: "ミスティック",
    DEVIL: "悪魔",
    LASTCONNECT: "ラストコネクト"
  };
  d.addExStatus = function(a, b, c, k)
  {
    a.maxRare = d.maxRank(a);
    a.maxLevel = d.getMaxLevel(a.card.rank);
    a.expRatio = d.expRatio(a);
    a.expRequire = d.expRequire(a);
    a.nextMaxLevel = d.getNextMaxLevel(a.card.rank);
    a.nextCard = d.nextCard(a);
    a.episodeLevel = d.getEpisodeLevel(a);
    a.episodeRatio = d.episodeRatio(a);
    a.epExpRatio = d.getEpisodeExpRatio(a);
    a.epExpRequire = d.getEpisodeExpRequire(a);
    a.charaType = v[a.chara.initialType];
    if (l.storage.userCharaEnhancementCellList)
    {
      var e = l.storage.userCharaEnhancementCellList.where(
      {
        charaId: a.charaId
      });
      a.enhanceCnt = e.length ? e.length - 1 : 0
    }
    l.storage.userCharaAtbEnhancementCellList && (e = l.storage.userCharaAtbEnhancementCellList.where(
    {
      charaId: a.charaId
    }), a.atbEnhanceCnt = e.length ? e.length : 0);
    a.addendHp || (a.addendHp = 0);
    a.addendAttack || (a.addendAttack = 0);
    a.addendDefense || (a.addendDefense = 0);
    a.composeAttribute = l.getTargetComposeAttribute(
    {
      attributeId: a.chara.attributeId
    });
    b && h.each(b, function(a)
    {
      d.memoriaEventCheck(a)
    });
    if (a.supportFlag)
    {
      a.chara.description = a.chara.description.replace(/＠/g, "<br>");
      a.doppelOpenFlag = !1;
      if (c)
        if (a.card.doppel)
        {
          c = c.filter(function(b)
          {
            return a.card.doppel.id == b.doppelId
          });
          var e = 5 <= Number(a.card.rank.split("_")[1]),
            f = 5 <= a.episodeLevel,
            g = 5 <= a.magiaLevel;
          a.doppelOpenFlag = 0 !== c.length && e && f && g ? !0 : !1
        }
      else a.doppelOpenFlag = !1;
      else a.doppelOpenFlag = !1;
      a.addHp = a.hp;
      a.addAttack = a.attack;
      a.addDefense = a.defense;
      a.memoriaHp = 0;
      a.memoriaAttack = 0;
      a.memoriaDefense = 0;
      if (a.isNpc)
        for (c = 0; 4 > c;)
        {
          e = "equipPiece" + (c + 1);
          if (b && b.length && b[c])
          {
            if (a[e] = b[c], a[e].maxLevel = p.getMaxLevel(a[e].rank, a[e].lbCount), a.addHp += a[e].hp, a.addAttack += a[e].attack, a.addDefense += a[e].defense, a.memoriaHp += a[e].hp, a.memoriaAttack += a[e].attack, a.memoriaDefense += a[e].defense, e = d.memoriaEventCheck(a[e])) e.eventId && (a.bonusMemoriaFlag = !0, a.bonusEventId = e.eventId, a.bonusEventType = e.eventType), e.regularEventId && (a.bonusReuglarMemoriaFlag = !0, a.bonusReuglarEventId = e.regularEventId, a.bonusReuglarEventType = e.regularEventType)
          }
          else a[e] = null;
          c = c + 1 | 0
        }
      else h.each(k, function(c, e)
      {
        if (-1 !== e.indexOf("userCardId") && a.userCardId == c)
          for (c = "userPieceId" + ("00" + e.split("userCardId")[1]).slice(-2), e = 0; 4 > e;)
          {
            var f = "equipPiece" + (e + 1),
              g = c + (e + 1);
            if (k[g])
            {
              if (a[f] = h.findWhere(b,
                {
                  id: k[g]
                }), a[f].maxLevel = p.getMaxLevel(a[f].rank, a[f].lbCount), a.addHp += a[f].hp, a.addAttack += a[f].attack, a.addDefense += a[f].defense, a.memoriaHp += a[f].hp, a.memoriaAttack += a[f].attack, a.memoriaDefense += a[f].defense, f = d.memoriaEventCheck(a[f])) f.eventId && (a.bonusMemoriaFlag = !0, a.bonusEventId = f.eventId, a.bonusEventType = f.eventType), f.regularEventId && (a.bonusReuglarMemoriaFlag = !0, a.bonusReuglarEventId = f.regularEventId, a.bonusReuglarEventType = f.regularEventType)
            }
            else a[f] = null;
            e = e + 1 | 0
          }
      });
      a = d.totalEventEffectSet(a)
    }
    else a.chara.description = a.chara.description.replace(/＠/g, "<br>"), a = d.totalEventEffectSet(a), c = l.storage.userLive2dList, c = c.where(
      {
        charaId: a.charaId
      }) ? c.where(
      {
        charaId: a.charaId
      }) : [], 0 < c.length && c.sort(function(a, b)
      {
        return a.toJSON().live2dId < b.toJSON().live2dId ? -1 : a.toJSON().live2dId > b.toJSON().live2dId ? 1 : 0
      }), a.live2dList = [], h.each(c, function(b, c)
      {
        b = b.toJSON();
        a.live2dId == b.live2dId && (a.live2dIndex = c);
        c = {};
        c.live2dId = b.live2dId;
        c.description = b.live2d.description;
        c.voicePrefixNo = b.live2d.voicePrefixNo;
        a.live2dList.push(c)
      }),
      a.live2dList.sort(function(a, b)
      {
        return a.live2dId < b.live2dId ? -1 : a.live2dId > b.live2dId ? 1 : 0
      }), c = l.storage.userDoppelList, a.card.doppel ? c.findWhere(
      {
        doppelId: a.card.doppel.id
      }) ? a.doppelOpenFlag = !0 : a.doppelOpenFlag = !1 : a.doppelOpenFlag = !1, a.mp && (a.mp = Math.floor(a.mp / 10) | 0, 100 < a.mp && (a.dp = a.mp - 100, a.mp = 100));
    a.customizeBonus = {
      HP: "+0%",
      ATTACK: "+0%",
      DEFENSE: "+0%",
      ACCEL: "+0%",
      BLAST: "+0%",
      CHARGE: "+0%"
    };
    for (c = 0; 6 > c;) e = a.card.cardCustomize ? a.card.cardCustomize["bonusCode" + (c + 1)] || null : null, f = a.card.cardCustomize ? a.card.cardCustomize["bonusNum" + (c + 1)] || null : null, a["customized" + (c + 1)] && (a.customizeBonus[e] = "+" + (f | 0) / 10 + "%"), c = c + 1 | 0;
    return a
  };
  d.maxRank = function(a)
  {
    var b = null;
    if (a && a.chara)
    {
      for (var c = 1; 5 >= c && a.chara["evolutionCard" + c]; c++) b = a.chara["evolutionCard" + c].rank, b = Number(b.split("_")[1]);
      b || (b = Number(a.card.rank.split("_")[1]))
    }
    else if (a)
    {
      for (c = 1; 5 >= c && a["evolutionCard" + c]; c++) b = a["evolutionCard" + c].rank, b = Number(b.split("_")[1]);
      b || (b = Number(a.defaultCard.rank.split("_")[1]))
    }
    return b
  };
  d.nextCard = function(a)
  {
    var b = a.chara,
      c = a.cardId;
    a.card.rank.split("RANK_");
    return b.defaultCardId === c ? b.evolutionCard1 : b.evolutionCardId1 === c ? b.evolutionCard2 : b.evolutionCardId2 === c ? b.evolutionCard3 : b.evolutionCardId3 === c ? b.evolutionCard4 : b.evolutionCardId4 === c ? b.evolutionCard5 : null
  };
  d.expRequire = function(a)
  {
    var b = a.level;
    return d.exArr[b] - d.exArr[b - 1] - a.experience | 0
  };
  d.expRatio = function(a)
  {
    var b = a.level,
      b = a.experience / (d.exArr[b] - d.exArr[b - 1]) * 100,
      b = Math.floor(b);
    a.maxLevel && a.level == a.maxLevel && (b = 100);
    b || (b = 0);
    return b
  };
  d.episodeExp = [0, 1E3, 4E3, 14E3, 64E3];
  d.getEpisodeLevel = function(a)
  {
    var b = 0;
    h.each(d.episodeExp, function(c, d)
    {
      c <= a.bondsTotalPt && (b = d + 1)
    });
    return b
  };
  d.getEpisodeExpRequire = function(a)
  {
    var b = 0;
    h.each(d.episodeExp, function(c, d)
    {
      c > a.bondsTotalPt && 0 == b && (b = c - a.bondsTotalPt | 0)
    });
    return b
  };
  d.getEpisodeExpRatio = function(a)
  {
    var b = 100,
      c = 0;
    h.each(d.episodeExp, function(b, d)
    {
      b <= a.bondsTotalPt && (c = d + 1)
    });
    5 !== c && (b = (a.bondsTotalPt - d.episodeExp[c - 1]) / (d.episodeExp[c] - d.episodeExp[c - 1]) * 100 || 0, b = Math.floor(b));
    return b
  };
  d.getEpisodeComposeExp = function(a)
  {
    var b = 0;
    a instanceof Array ? h.each(a, function(a)
    {
      a = a.model.itemId || a.model.toJSON().itemId;
      b = -1 != a.indexOf("_PP") ? b + d.itemExp[2] : -1 != a.indexOf("_P") ? b + d.itemExp[1] : b + d.itemExp[0]
    }) : $.each(a, function(a, k)
    {
      "length" !== a && (b = -1 != a.indexOf("_PP") ? b + d.itemExp[2] * k : -1 != a.indexOf("_P") ? b + d.itemExp[1] * k : b + d.itemExp[0] * k)
    });
    return b
  };
  d.getCanUseEpisodeComposeItemNum = function(a, b, c)
  {
    var k = 0;
    $.each(b, function(a, b)
    {
      "length" !== a && a !== c && (k = -1 != a.indexOf("_PP") ? k + d.itemExp[2] * b : -1 != a.indexOf("_P") ? k + d.itemExp[1] * b : k + d.itemExp[0] * b)
    });
    a += k;
    b = d.episodeExp[4];
    var e = 0,
      e = -1 != c.indexOf("_PP") ? d.itemExp[2] : -1 != c.indexOf("_P") ? d.itemExp[1] : d.itemExp[0];
    return Math.ceil((b - a) / e)
  };
  d.episodeRatio = function(a)
  {
    var b = a.episodeLevel;
    a = a.bondsTotalPt / (d.episodeExp[b] - d.episodeExp[b - 1]) * 100;
    a = Math.floor(a);
    5 == b && (a = 100);
    a || (a = 0);
    return a
  };
  d.exArr = [0, 110, 250, 430, 660, 950, 1310, 1750, 2280, 2910, 3640, 4470, 5400, 6430, 7560, 8790, 10120, 11550, 13080, 14710, 16440, 18270, 20200, 22230, 24360, 26590, 28920, 31350,
    33880, 36510, 39240, 42070, 45E3, 48030, 51160, 54390, 57720, 61150, 64680, 68310, 72040, 75870, 79800, 83830, 87960, 92190, 96520, 100950, 105480, 110110, 114840, 119670, 124600, 129630, 134760, 139990, 145320, 150750, 156280, 161910, 167640, 173470, 179400, 185430, 191560, 197790, 204120, 210550, 217080, 223710, 230440, 237270, 244200, 251230, 258360, 265590, 272920, 280350, 287880, 295510, 303240, 311070, 319E3, 327030, 335160, 343390, 351720, 360150, 368680, 377310, 386040, 394870, 403800, 412830, 421960, 431190, 440520, 449950, 459480, 469110
  ];
  d.itemExp = [100, 500,
    2500
  ];
  d.getComposeExp = function(a, b, c, k)
  {
    var e = 0;
    k instanceof Array ? h.each(k, function(a)
    {
      a = a.model.itemId || a.model.toJSON().itemId;
      var b = -1 != a.indexOf(c) || -1 != a.indexOf("ALL") ? 1.5 : 1;
      e = -1 != a.indexOf("_PP") ? e + d.itemExp[2] * b : -1 != a.indexOf("_P") ? e + d.itemExp[1] * b : e + d.itemExp[0] * b
    }) : $.each(k, function(a, b)
    {
      if ("length" !== a)
      {
        var f = -1 != a.indexOf(c) || -1 != a.indexOf("ALL") ? 1.5 : 1;
        e = -1 != a.indexOf("_PP") ? e + d.itemExp[2] * f * b : -1 != a.indexOf("_P") ? e + d.itemExp[1] * f * b : e + d.itemExp[0] * f * b
      }
    });
    return e
  };
  d.getCanUseComposeItemNum = function(a, b, c, k, e, f)
  {
    var g = 0;
    $.each(e, function(a, b)
    {
      if ("length" !== a && a !== f)
      {
        var c = -1 !== a.indexOf(k) || -1 !== a.indexOf("ALL") ? 1.5 : 1;
        g = -1 != a.indexOf("_PP") ? g + d.itemExp[2] * c * b : -1 != a.indexOf("_P") ? g + d.itemExp[1] * c * b : g + d.itemExp[0] * c * b
      }
    });
    a = d.exArr[a - 1] + c + g;
    b = d.exArr[b - 1];
    c = 0;
    c = -1 !== f.indexOf(k) || -1 !== f.indexOf("ALL") ? 1.5 : 1;
    c = -1 != f.indexOf("_PP") ? d.itemExp[2] * c : -1 != f.indexOf("_P") ? d.itemExp[1] * c : d.itemExp[0] * c;
    b -= a;
    0 > b && (b = 0);
    return Math.ceil(b / c)
  };
  var q = {
      RANK_1: 1,
      RANK_2: 2,
      RANK_3: 3,
      RANK_4: 4,
      RANK_5: 5
    },
    w = {
      RANK_1: 1,
      RANK_2: 2,
      RANK_3: 3
    },
    x = {
      RANK_1: 4,
      RANK_2: 8,
      RANK_3: 12
    },
    r = {
      RANK_1: 5,
      RANK_2: 50,
      RANK_3: 400
    };
  d.getComposeCost = function(a, b, c)
  {
    var d = 0,
      e, f, g = q[a] || 0;
    h.each(c, function(a, c)
    {
      c = c.split("_")[3] || "N";
      switch (c)
      {
        case "PP":
          c = "RANK_3";
          break;
        case "P":
          c = "RANK_2";
          break;
        case "N":
          c = "RANK_1"
      }
      f = r[c];
      e = w[c];
      d += Math.floor((f + (b - 1) * e) * g) * a
    });
    return d
  };
  d.getEpisodeComposeCost = function(a, b, c)
  {
    var d = 0,
      e, f, g = q[a] || 0;
    h.each(c, function(a, c)
    {
      c = c.split("_")[2] || "N";
      switch (c)
      {
        case "PP":
          c = "RANK_3";
          break;
        case "P":
          c = "RANK_2";
          break;
        case "N":
          c = "RANK_1"
      }
      f = r[c];
      e = x[c];
      d += Math.floor((f + (b - 1) * e) * g) * a
    });
    return d
  };
  var y = function(a)
    {
      switch (a)
      {
        case "RANK_1":
          return 40;
        case "RANK_2":
          return 50;
        case "RANK_3":
          return 60;
        case "RANK_4":
          return 80;
        case "RANK_5":
          return 100;
        default:
          return 1
      }
    },
    z = function(a)
    {
      switch (a)
      {
        case "RANK_1":
          return 50;
        case "RANK_2":
          return 60;
        case "RANK_3":
          return 80;
        case "RANK_4":
          return 100;
        case "RANK_5":
          return 100;
        default:
          return 1
      }
    };
  d.getMaxLevel = function(a)
  {
    return y(a)
  };
  d.getNextMaxLevel = function(a)
  {
    return z(a)
  };
  d.getAfterParam = function(a, b, c, k)
  {
    a = b.defaultCardId === a ? b.defaultCard : b.evolutionCardId1 === a ? b.evolutionCard1 : b.evolutionCardId2 === a ? b.evolutionCard2 : b.evolutionCardId3 === a ? b.evolutionCard3 : b.evolutionCardId4 === a ? b.evolutionCard4 : b.evolutionCard5;
    b = a.growthType;
    c = a.rank;
    var e = d.getMaxLevel(c);
    k > e && (k = e);
    e = {
      attack: a.attack,
      defense: a.defense,
      hp: a.hp
    };
    k = A(c, k);
    var f, g, h;
    switch (b)
    {
      case "BALANCE":
        h = g = f = 1;
        break;
      case "ATTACK":
        f = 1.03;
        g = .97;
        h = .98;
        break;
      case "DEFENSE":
        f = .98;
        g = 1.05;
        h = .97;
        break;
      case "HP":
        f = .97;
        g = .98;
        h = 1.04;
        break;
      case "ATKDEF":
        f = 1.02;
        g = 1.01;
        h = .99;
        break;
      case "ATKHP":
        f = 1.01;
        g = .99;
        h = 1.02;
        break;
      case "DEFHP":
        f = .99, g = 1.02, h = 1.01
    }
    e.attack = a.attack + a.attack * k * f | 0;
    e.defense = a.defense + a.defense * k * g | 0;
    e.hp = a.hp + a.hp * k * h | 0;
    return e
  };
  var A = function(a, b)
  {
    var c = [0, .05, .1, .15, .2, .25, .3, .35, .41, .46, .51, .56, .61, .66, .71, .76, .82, .87, .92, .97, 1.02, 1.07, 1.12, 1.17, 1.23, 1.28, 1.33, 1.38, 1.43, 1.48, 1.53, 1.58, 1.64, 1.69, 1.74, 1.79, 1.84, 1.89, 1.94, 2],
      d = [0, .04, .08, .13, .17, .22, .26, .31, .35, .4, .44, .49, .53, .58, .62, .67, .71, .76, .8, .85, .89,
        .94, .98, 1.03, 1.07, 1.12, 1.16, 1.21, 1.25, 1.3, 1.34, 1.39, 1.43, 1.48, 1.52, 1.57, 1.61, 1.66, 1.7, 1.75, 1.79, 1.84, 1.88, 1.93, 1.97, 2.02, 2.06, 2.11, 2.15, 2.2
      ],
      e = [0, .04, .08, .12, .16, .2, .24, .28, .32, .36, .4, .44, .48, .52, .56, .61, .65, .69, .73, .77, .81, .85, .89, .93, .97, 1.01, 1.05, 1.09, 1.13, 1.17, 1.22, 1.26, 1.3, 1.34, 1.38, 1.42, 1.46, 1.5, 1.54, 1.58, 1.62, 1.66, 1.7, 1.74, 1.78, 1.83, 1.87, 1.91, 1.95, 1.99, 2.03, 2.07, 2.11, 2.15, 2.19, 2.23, 2.27, 2.31, 2.35, 2.4],
      f = [0, .03, .06, .09, .13, .16, .19, .23, .26, .29, .32, .36, .39, .42, .46, .49, .52, .55, .59, .62, .65, .69,
        .72, .75, .78, .82, .85, .88, .92, .95, .98, 1.02, 1.05, 1.08, 1.11, 1.15, 1.18, 1.21, 1.25, 1.28, 1.31, 1.34, 1.38, 1.41, 1.44, 1.48, 1.51, 1.54, 1.57, 1.61, 1.64, 1.67, 1.71, 1.74, 1.77, 1.81, 1.84, 1.87, 1.9, 1.94, 1.97, 2, 2.04, 2.07, 2.1, 2.13, 2.17, 2.2, 2.23, 2.27, 2.3, 2.33, 2.36, 2.4, 2.43, 2.46, 2.5, 2.53, 2.56, 2.6
      ],
      g = [0, .03, .06, .09, .12, .15, .18, .21, .24, .27, .3, .33, .36, .39, .42, .45, .48, .51, .54, .57, .6, .63, .66, .69, .72, .75, .78, .81, .84, .87, .9, .93, .96, 1, 1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3, 1.33, 1.36, 1.39, 1.42, 1.45, 1.48, 1.51, 1.54, 1.57, 1.6,
        1.63, 1.66, 1.69, 1.72, 1.75, 1.78, 1.81, 1.84, 1.87, 1.9, 1.93, 1.96, 2, 2.03, 2.06, 2.09, 2.12, 2.15, 2.18, 2.21, 2.24, 2.27, 2.3, 2.33, 2.36, 2.39, 2.42, 2.45, 2.48, 2.51, 2.54, 2.57, 2.6, 2.63, 2.66, 2.69, 2.72, 2.75, 2.78, 2.81, 2.84, 2.87, 2.9, 2.93, 2.96, 3
      ];
    switch (a)
    {
      case "RANK_1":
        return c[b - 1];
      case "RANK_2":
        return d[b - 1];
      case "RANK_3":
        return e[b - 1];
      case "RANK_4":
        return f[b - 1];
      case "RANK_5":
        return g[b - 1];
      default:
        return 1
    }
  };
  return d
});
