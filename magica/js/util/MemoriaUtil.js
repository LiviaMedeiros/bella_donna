define(["underscore", "backbone", "backboneCommon", "ajaxControl"], function(h, g, r, t)
{
  var c = {};
  g.Collection.extend();
  g.Model.extend();
  c.exArr = [0, 100, 210, 330, 460, 600, 760, 950, 1180, 1460, 1800, 2210, 2690, 3240, 3860, 4550, 5310, 6140, 7040, 8010, 9050, 10160, 11340, 12590, 13910, 15300, 16760, 18290, 19890, 21560, 23300, 25110, 26990, 28940, 30960, 33050, 35210, 37440, 39740, 42110, 44550, 47060, 49640, 52290, 55010, 57800, 60660, 63590, 66590, 69660];
  c.parExArr = [0, 100, 110, 120, 130, 140, 160, 190, 230, 280, 340, 410, 480, 550, 620, 690, 760, 830, 900, 970, 1040,
    1110, 1180, 1250, 1320, 1390, 1460, 1530, 1600, 1670, 1740, 1810, 1880, 1950, 2020, 2090, 2160, 2230, 2300, 2370, 2440, 2510, 2580, 2650, 2720, 2790, 2860, 2930, 3E3, 3070
  ];
  c.getComposeExp = function(b, a, k, f)
  {
    var d = 0,
      e = [100, 200, 500, 1E3];
    h.each(k, function(a)
    {
      switch (a.piece.rank)
      {
        case "RANK_1":
          d += e[0] + (a.experience + c.exArr[a.level - 1]) / 10;
          break;
        case "RANK_2":
          d += e[1] + (a.experience + c.exArr[a.level - 1]) / 10;
          break;
        case "RANK_3":
          d += e[2] + (a.experience + c.exArr[a.level - 1]) / 10;
          break;
        case "RANK_4":
          d += e[3] + (a.experience + c.exArr[a.level - 1]) / 10;
          break;
        default:
          d += 0
      }
    });
    return d
  };
  c.getNextExp = function(b, a)
  {
    return c.parExArr[a] - b
  };
  c.getGuageLength = function(b, a)
  {
    b = Math.floor(b / c.parExArr[a] * 100);
    return 100 < b ? 100 : b
  };
  c.getPieceModeFromItemModel = function(b)
  {
    var a = {
      piece:
      {}
    };
    switch (b.itemId)
    {
      case "MEMORIA_CIRCUIT":
        a.rank = "RANK_2";
        a.piece.pieceKind = "REINFORCEMENT";
        break;
      case "MEMORIA_CIRCUIT_CORE":
        a.rank = "RANK_4";
        a.piece.pieceKind = "REINFORCEMENT";
        break;
      case "OVER_LIMITTER_PIECE":
        a.rank = "RANK_2";
        a.piece.pieceKind = "LIMIT_BREAK";
        break;
      case "OVER_LIMITTER":
        a.rank = "RANK_3";
        a.piece.pieceKind = "LIMIT_BREAK";
        break;
      case "OVER_LIMITTER_CORE":
        a.rank = "RANK_4";
        a.piece.pieceKind = "LIMIT_BREAK";
        break;
      default:
        return null
    }
    a.itemId = b.itemId;
    a.experience = 0;
    a.lbCount = 4;
    a.level = c.getMaxLevel(a.rank, a.lbCount);
    a.piece.name = b.item.name;
    a.piece.rank = a.rank;
    return a
  };
  c.getComposeFactor = function(b)
  {
    switch (b)
    {
      case "RANK_1":
        return 1;
      case "RANK_2":
        return 2;
      case "RANK_3":
        return 3;
      case "RANK_4":
        return 4
    }
    return 60
  };
  var l = function(b)
  {
    switch (b)
    {
      case "RANK_1":
        return 10;
      case "RANK_2":
        return 15;
      case "RANK_3":
        return 20;
      case "RANK_4":
        return 30;
      case "RANK_5":
        return 50;
      default:
        return 30
    }
  };
  c.getMaxLevel = function(b, a)
  {
    a = 4 < a ? 4 : a;
    b = l(b) + 5 * a;
    50 < b && (b = 50);
    return b
  };
  var m = [1, 1, 1.05, 1.11, 1.16, 1.22, 1.27, 1.33, 1.38, 1.44, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5],
    n = [1, 1, 1.03, 1.07, 1.1, 1.14, 1.17, 1.21, 1.25, 1.28, 1.32, 1.35, 1.39, 1.42, 1.46, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5],
    p = [1, 1, 1.02, 1.05, 1.07, 1.1, 1.13,
      1.15, 1.18, 1.21, 1.23, 1.26, 1.28, 1.31, 1.34, 1.36, 1.39, 1.42, 1.44, 1.47, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5
    ],
    q = [1, 1, 1.01, 1.03, 1.05, 1.06, 1.08, 1.1, 1.12, 1.13, 1.15, 1.17, 1.18, 1.2, 1.22, 1.24, 1.25, 1.27, 1.29, 1.31, 1.32, 1.34, 1.36, 1.37, 1.39, 1.41, 1.43, 1.44, 1.46, 1.48, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5];
  c.getParam = function(b, a)
  {
    var c = b.piece.attack | 0,
      f = b.piece.defense | 0,
      d = b.piece.rank,
      d = "RANK_1" === d ? m : "RANK_2" === d ? n : "RANK_3" === d ? p : q,
      e = {};
    e.hp = Math.floor((b.piece.hp | 0) * d[a]) | 0;
    e.attack = Math.floor(c * d[a]) | 0;
    e.defense = Math.floor(f * d[a]) | 0;
    return e
  };
  c.priceArr = [0, 100, 300, 1E3, 5E3, 2E3];
  c.priceCalc = function(b, a)
  {
    b = b.split("_")[1];
    4 < a && (a = 4);
    return c.priceArr[b] * (a + 1)
  };
  c.getEffect = function(b)
  {
    for (var a = 4 > b.lbCount ? b.piece.pieceSkill : b.piece.pieceSkill2, c = !0, f = 1, d = []; c;)
    {
      if (a["art" + f])
      {
        var e;
        switch (a["art" + f].verbCode)
        {
          case "HEAL":
          case "RESURRECT":
          case "REVOKE":
            e = "HEAL";
            break;
          case "BUFF":
          case "BUFF_DYING":
          case "BUFF_HPMAX":
          case "BUFF_PARTY_DIE":
          case "BUFF_DIE":
            e = "BUFF";
            break;
          case "DEBUFF":
          case "DEBUFF_DIE":
            e = "ANTI";
            break;
          case "CONDITION_GOOD":
          case "IGNORE":
          case "ENCHANT":
            e = "EFFECT";
            break;
          case "CONDITION_BAD":
            e = "BADSTATUS";
            break;
          default:
            e = "ETC"
        }
        if (1148 === b.pieceId || 1147 === b.pieceId) e = "ETC";
        "" !== e && -1 === d.indexOf(e) && d.push(e)
      }
      else c = !1;
      f++
    }
    0 === d.length && (d = ["ETC"]);
    return d
  };
  return c
});
