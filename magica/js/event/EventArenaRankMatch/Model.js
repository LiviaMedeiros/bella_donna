define("underscore backbone backboneCommon js/event/EventArenaRankMatch/Utility DeckUtil cardUtil".split(" "), function(d, n, h, e, l, p)
{
  return {
    getTopModel: function(b)
    {
      var a = {};
      b = b.pageJson;
      var c = h.getDateShortening(
      {
        date: new Date
      });
      a.pageAccessLocalTime = c.yr + "/" + c.mo + "/" + c.da + " " + c.ho + ":" + c.mi + ":" + c.se;
      a.eventInfo = b.regularEventArenaRankMatch;
      a.userInfo = {
        name: d.escape(b.user.loginName),
        rank: b.gameUser.level,
        orderRank: b.regularEventArenaRankMatch.npcNum + 1,
        highestOrderRank: b.userArenaBattle.rankMatchMaxRank,
        classRank: "",
        isEnableDefenseDeck: b.enableDefenseDeck
      };
      d.each([b.userArenaRankMatchRankingA, b.userArenaRankMatchRankingB], function(b, c, d)
      {
        b && (a.userInfo.orderRank = Number(b.rank))
      });
      a.userInfo.classRank = e.getEmblemRank(
      {
        orderRank: a.userInfo.orderRank,
        emblemList: b.emblemList
      });
      a.battleInfo = {
        arenaBattleType: b.arenaBattleType,
        matchExpiredAt: b.userArenaRankMatch.expiredAt,
        matchId: b.userArenaRankMatch.matchId
      };
      c = e.getDeckType();
      a.userDeckInfo = {
        attack: d.findWhere(b.userDeckList,
        {
          deckType: c.listAttack[0]
        }),
        defence: d.findWhere(b.userDeckList,
        {
          deckType: c.listDefence[0]
        }),
        editTime: 300
      };
      c = new l("arenaRankMatchAttack");
      a.userInfo.teamStatus = "---";
      if (a.userDeckInfo.attack)
      {
        var f = c.deckDataCreate(a.userDeckInfo.attack);
        a.userInfo.teamStatus = c.getTeamStatus(
        {
          deckInfo: f
        })
      }
      a.userInfo.displayCardId = h.storage.userCardListEx.findWhere(
      {
        id: b.gameUser.leaderId
      }).toJSON().displayCardId;
      a.userInfo.displayCardId || (a.userInfo.displayCardId = 10011);
      a.presentInfo = e.createRewardModel(
      {
        rewardList: b.rewardList,
        emblemList: b.emblemList
      });
      if (b.dailyRewards && b.dailyRewards.length)
      {
        var k = [];
        d.each(b.dailyRewards, function(a, b, c)
        {
          a = a.presentList[0];
          a = {
            img: e.getItemInfo(
            {
              model: a,
              type: a.presentType
            }).imagePath,
            name: a.displayName,
            num: a.quantity
          };
          k.push(a)
        });
        a.presentInfo.daily.todayInfo = {
          userRank: a.userInfo.highestOrderRank,
          itemList: k
        }
      }
      a.specialRuleInfo = {
        list: ["特殊ルールはありません"],
        deckMinNumList:
        {
          arenaRankMatchAttack: 5,
          arenaRankMatchDefence: 5
        },
        deckMaxNumList:
        {
          arenaRankMatchAttack: 5,
          arenaRankMatchDefence: 5
        }
      };
      c = a.eventInfo.specialRuleMap;
      f = {};
      c && (a.specialRuleInfo.deckMinNumList.arenaRankMatchAttack = c.MUST_KEEP_ATTACK_DECK, a.specialRuleInfo.deckMinNumList.arenaRankMatchDefence = c.MUST_KEEP_DEFENSE_DECK, f = e.getSpRulesList(
      {
        spRulesMap: c
      }), a.specialRuleInfo.plusList = f, a.specialRuleInfo.list = e.getSpRulesText(
      {
        spRulesMap: c,
        plusList: f
      }));
      a.attackCountInfo = {
        num: b.battlePossibleCount,
        numMax: 5,
        recoverNeedNum: a.eventInfo.recoveryBattleCost
      };
      a.coolDownTimeInfo = {
        nextTime: b.battleCoolTime,
        recoverNeedNum: a.eventInfo.recoverCoolTimeCost
      };
      a.opponentList = {
        higher: [],
        midst: [],
        lower: []
      };
      var g = b.userArenaRankMatch,
        m = ["higherOpponentUserArenaBattleInfo", "midstOpponentUserArenaBattleInfo", "lowerOpponentUserArenaBattleInfo"];
      d.each(a.opponentList, function(a, b, c)
      {
        d.each([1, 2, 3, 4, 5], function(c, e, f)
        {
          d.each(m, function(d, e, f)
          {
            g[d + c] && (e = g[d + c], e.battleType = g.arenaBattleType, -1 != d.indexOf(b) && a.push(e))
          })
        })
      });
      return a
    }
  }
});
