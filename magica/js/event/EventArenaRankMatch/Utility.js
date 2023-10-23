define(["underscore", "backbone", "backboneCommon", "js/view/item/ItemImgPartsView"], function(d, q, n, p)
{
  var m = {
    getDeckType: function(b)
    {
      return {
        attackBase: 130,
        defence: 24
      }
    },
    getItemInfo: function(b)
    {
      return (new p(
      {
        model: b.model,
        type: b.type
      })).render().model
    },
    createRewardModel: function(b)
    {
      var e = b.emblemList,
        f = {
          daily:
          {
            rankList: []
          },
          maxRank:
          {
            rankList: []
          },
          lastRanking:
          {
            rankList: []
          }
        },
        h = {
          DAILY: "daily",
          MAX_RANK: "maxRank",
          FINAL_RANK: "lastRanking"
        },
        k = function(a)
        {
          var c = a.rank,
            b = !1;
          d.each([2, 3, 4, 5, 6, 7, 8, 9, 10], function(a, l, d)
          {
            a == c && (b = !0)
          });
          return b
        };
      d.each(b.rewardList, function(a, c, b)
      {
        var g = {};
        g.id = a.minRank;
        g.rank = a.minRank + "位〜" + a.maxRank + "位";
        if (a.minRank == a.maxRank || "MAX_RANK" == a.rewardType) g.rank = a.maxRank + "位";
        "MAX_RANK" == a.rewardType && 1 == a.maxRank && (g.rank = "1位〜10位");
        g.itemList = [];
        d.each(a.presentList, function(a, c, b)
        {
          a = {
            name: a.displayName,
            img: m.getItemInfo(
            {
              model: a,
              type: a.presentType
            }).imagePath,
            num: a.quantity
          };
          g.itemList.push(a)
        });
        "FINAL_RANK" == a.rewardType && d.each(e, function(c, b, d)
        {
          c.minRank == a.minRank && (g.emblemRank = c.emblem)
        });
        "MAX_RANK" == a.rewardType && k(
        {
          rank: a.maxRank
        }) || f[h[a.rewardType]].rankList.push(g)
      });
      d.each(e, function(a, c, b)
      {
        var g = !1;
        d.each(f.lastRanking.rankList, function(c, b, d)
        {
          a.minRank == c.id && (g = !0)
        });
        g || (c = {}, c.id = a.minRank, c.rank = a.minRank + "位〜" + a.maxRank + "位", a.minRank == a.maxRank && (c.rank = a.maxRank + "位"), c.itemList = [], c.emblemRank = a.emblem, f.lastRanking.rankList.push(c))
      });
      d.each(f, function(a, c, b)
      {
        a.rankList = d.sortBy(a.rankList, function(a)
        {
          return a.id
        })
      });
      return f
    },
    getSpRulesList: function(b)
    {
      var e = "FIRE WATER TIMBER LIGHT DARK VOID".split(" "),
        f = ["hp", "attack", "defense"],
        h = {},
        k = [];
      d.each(b.spRulesMap, function(a, c, b)
      {
        if (-1 != c.indexOf("PLUS_"))
        {
          var g = {};
          d.each(e, function(a, b, d)
          {
            -1 != c.indexOf(String(a)) && (g.attr = a)
          });
          d.each(f, function(a, b, d)
          {
            -1 != c.toLowerCase().indexOf(String(a)) && (g.type = a)
          });
          g.value = a;
          k.push(g)
        }
      });
      k = k.sort(function(a, b)
      {
        return f.indexOf(a.type) - f.indexOf(b.type)
      });
      k = k.sort(function(a, b)
      {
        return e.indexOf(a.attr) - e.indexOf(b.attr)
      });
      d.each(k, function(a, b, k)
      {
        d.each(e, function(b, c, e)
        {
          a.attr == b && (h[b] || (h[b] = {}), d.each(f, function(c, d, g)
          {
            a.type == c && (h[b][c] = a.value)
          }))
        })
      });
      return h
    },
    getSpRulesText: function(b)
    {
      var e = b.plusList,
        f = [];
      d.each(b.spRulesMap, function(a, b, d)
      {
        if (-1 != b.indexOf("MUST_KEEP_"))
        {
          d = "攻撃";
          var c = 0; - 1 != b.indexOf("DEFENSE") && (d = "防衛", c = 1);
          f[c] = "◆" + d + "編成人数制限：" + a + "人以上"
        }
      });
      var h = {
          FIRE: "火",
          WATER: "水",
          TIMBER: "木",
          LIGHT: "光",
          DARK: "闇",
          VOID: "無"
        },
        k = {
          defense: "DEF",
          attack: "ATK",
          hp: "HP"
        };
      d.each(e, function(a, b, e)
      {
        var c = "",
          l = 0,
          m = 0;
        d.each(a, function(a, b, d)
        {
          c += k[b] + "・";
          l = a;
          m++
        });
        c = c.slice(0, -1);
        a = "";
        2 <= m && (a = "それぞれ");
        e = "アップ";
        0 > l && (e = "ダウン", l = Math.abs(l));
        f.push("◆" + ('<div class="icon ' + b + '"></div>') + h[b] + "属性魔法少女の" + c + "が" + a + l + e)
      });
      return f
    },
    getEmblemRank: function(b)
    {
      var e = b.orderRank,
        f = "";
      d.each(b.emblemList, function(b, d, a)
      {
        b.minRank <= e && e <= b.maxRank && (f = b.emblem)
      });
      return f
    },
    isOpenEvent: function(b)
    {
      var e = b.pageJson,
        f = b.pageAccessLocalTime,
        h = !1;
      (b = d.findWhere(e.regularEventList,
      {
        regularEventId: b.rankMatchEventInfo.regularEventId
      })) && (h = !n.getIsElapsedTargetTime(
      {
        pageAccessLocalTime: f,
        pageAccessServerTime: e.currentTime,
        targetTime: b.endAt
      }));
      return h
    }
  };
  return m
});
