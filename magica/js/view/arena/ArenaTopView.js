define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaTop.html js/view/arena/ArenaInfoPartsView js/event/EventArenaRankMatch/Utility js/event/EventArenaRankMatch/parts/EventReward".split(" "), function(k, r, b, n, t, u, p, q, v)
{
  var g;
  return r.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .limitedBtn"] = this.conditionPopup;
      a[b.cgti + " .mirrorsEnter"] = this.infinitEnter;
      a[b.cgti + " .rankingEnter"] = this.rankingEnter;
      a[b.cgti + " .rankMatchTopBtn"] = this.tapRankMatchTopBtn;
      a[b.cgti + " .noEventMirrorBtn"] = this.tapNoEventBtn;
      a[b.cgti + " #rankMatchRewardBtn"] = this.tapRankMatchRewardBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = k.template(u);
      this.model = n.getPageJson();
      this.arenaJson = b.storage.userArenaBattle.toJSON();
      a = this.nowRankStoryCheck();
      this.canPlay = this.conditionCheck(a);
      this.currentEventClass = "noEvent";
      this.noEventInit();
      this.rankMatchInit();
      this.rankingInitialize();
      this.nextCondition = this.canPlay ? this.checkNextRankCondition() : !1;
      this.createDom()
    },
    rankingInitialize: function()
    {
      this.ranking = {};
      this.ranking.rankingClose = this.model.rankingClosing;
      this.ranking.rankingEventStatus = !1;
      this.ranking.canEnter = !1;
      if (this.model.eventArenaRanking)
      {
        b.eventArenaRanking = this.model.eventArenaRanking;
        var a = k.findWhere(this.model.eventList,
        {
          eventId: this.model.eventArenaRanking.eventId
        });
        b.storage.userArenaBattle.toJSON();
        if (!this.rankingClose && a && this.model.eventArenaRanking)
        {
          this.currentEventClass = "ranking";
          this.ranking.shopId = a.shopId;
          this.ranking.itemId = this.model.eventArenaRanking.rewardItemId.toLowerCase();
          var c = b.storage.userItemList.findWhere(
          {
            itemId: this.model.eventArenaRanking.rewardItemId
          }) ? b.storage.userItemList.findWhere(
          {
            itemId: this.model.eventArenaRanking.rewardItemId
          }).get("quantity") : 0;
          this.ranking.itemHasNum = c;
          var d = Date.parse(this.model.currentTime),
            e = this.model.eventArenaRanking,
            h = b.storage.gameUser.toJSON(),
            g = Date.parse(e.preliminaryRoundStartAt),
            c = Date.parse(e.preliminaryRoundEndAt),
            l = Date.parse(e.finalRoundStartAt),
            m = Date.parse(e.finalRoundEndAt),
            f;
          d >= g && d < c ? (this.ranking.rankingEventStatus = "prelim", this.ranking.rankingBattleMaxCount = e.preliminaryRoundBattleCount, this.ranking.rankingBattleLeftCount = h.remainBattleCountOfRanking ? h.remainBattleCountOfRanking : 0, this.ranking.canEnter = 0 < this.ranking.rankingBattleLeftCount ? !0 : !1, f = new Date(c), this.ranking.battleLimit = f.getMonth() + 1 + "月" + f.getDate() + "日&nbsp;" + f.getHours() + ":" + ("0" + f.getMinutes()).substr(-2, 2), f = c) : d >= c && d < l ? (this.ranking.rankingEventStatus = "counting", a = new Date(l), this.ranking.battleLimit = a.getMonth() + 1 + "月" + a.getDate() + "日&nbsp;" + a.getHours() + ":" + ("0" + a.getMinutes()).substr(-2, 2)) : d >= l && d < m ? (this.ranking.rankingEventStatus = "final", this.ranking.rankingBattleMaxCount = e.finalRoundBattleCount, this.ranking.rankingBattleLeftCount = h.remainBattleCountOfRanking ? h.remainBattleCountOfRanking : 0, this.ranking.canEnter = 0 < this.ranking.rankingBattleLeftCount ? !0 : !1, f = new Date(m), this.ranking.battleLimit = f.getMonth() + 1 + "月" + f.getDate() + "日&nbsp;" + f.getHours() + ":" + ("0" + f.getMinutes()).substr(-2, 2), f = m) : d >= m && (this.ranking.rankingEventStatus = "isOver", a = new Date(a.endAt), this.ranking.battleLimit = a.getMonth() + 1 + "月" + a.getDate() + "日&nbsp;" + a.getHours() + ":" + ("0" + a.getMinutes()).substr(-2, 2));
          b.eventArenaRanking.tarm = this.ranking.rankingEventStatus;
          b.eventArenaRanking.tarmEnd = f
        }
      }
      else b.eventArenaRanking = null
    },
    rankMatchInit: function()
    {
      var a = this.model,
        c = this;
      c.rankMatchModel = {};
      if (a.eventArenaRankMatch)
      {
        var d = k.findWhere(a.regularEventList,
        {
          regularEventId: a.eventArenaRankMatch.regularEventId
        });
        if (!a.rankMatchClosing && a.eventArenaRankMatch && d)
        {
          c.currentEventClass = "rankMatch";
          c.rankMatchModel = a.eventArenaRankMatch;
          b.eventArenaRankMatch = a.eventArenaRankMatch;
          c.rankMatchModel.status = "going";
          c.rankMatchModel.limitTitleText = "開催期間";
          var e = d.endAt,
            h = "まで",
            g = b.getStatusTargetTermInCurrentTime(
            {
              startAt: d.startAt,
              endAt: e,
              currentTime: a.currentTime
            });
          c.rankMatchModel.userRank = c.rankMatchModel.npcNum + 1 + "位";
          c.rankMatchModel.userRankNum = c.rankMatchModel.npcNum + 1;
          k.each([a.userArenaRankMatchRanking], function(a, b, d)
          {
            a && (c.rankMatchModel.userRank = a.ranking + "位", c.rankMatchModel.userRankNum = a.ranking)
          });
          c.rankMatchModel.currentBattleCount = a.battlePossibleCount;
          c.rankMatchModel.currentClassRank = q.getEmblemRank(
          {
            orderRank: Number(c.rankMatchModel.userRankNum),
            emblemList: c.model.emblemList
          });
          c.rankMatchModel.itemHasNum = 0;
          var l = b.storage.userItemList.findWhere(
          {
            itemId: "EVENT_ARENARANKMATCH_" + d.regularEventId + "_EXCHANGE_1"
          });
          l && (c.rankMatchModel.itemHasNum = l.get("quantity"));
          c.rankMatchModel.shopId = "";
          d.shopId && (c.rankMatchModel.shopId = d.shopId);
          g || (c.rankMatchModel.status = "counting", c.rankMatchModel.limitTitleText = "結果発表", e = a.eventArenaRankMatch.aggregationEndAt, h = "", c.rankMatchModel.userRank = "---");
          a = b.getDateShortening(
          {
            date: e
          });
          c.rankMatchModel.battleLimit = a.mo + "月" + a.da + "日&nbsp;" + a.ho + ":" + a.mi + h
        }
      }
      else b.eventArenaRankMatch = null
    },
    noEventInit: function()
    {
      var a = this.model;
      this.noEventModel = {};
      this.noEventModel.rankingInfo = {
        rank: "",
        point: "---"
      };
      this.noEventModel.rankMatchInfo = {
        rank: "",
        point: "---"
      };
      a.gameUser && a.gameUser.interimArenaRankMatchClassType && (this.noEventModel.rankMatchInfo.rank = a.gameUser.interimArenaRankMatchClassType);
      a.userArenaBattle && (a.userArenaBattle.rankingArenaPoint && (this.noEventModel.rankingInfo.point = a.userArenaBattle.rankingArenaPoint + "pt"), a.userArenaBattle.definiteClassRank && (this.noEventModel.rankingInfo.rank = a.userArenaBattle.definiteClassRank));
      a.userArenaRankMatchHistory && a.userArenaRankMatchHistory.length && a.userArenaRankMatchHistory[a.userArenaRankMatchHistory.length - 1] && a.userArenaRankMatchHistory[a.userArenaRankMatchHistory.length - 1].rank && 0 != a.userArenaRankMatchHistory[a.userArenaRankMatchHistory.length - 1].rank && (this.noEventModel.rankMatchInfo.point = a.userArenaRankMatchHistory[a.userArenaRankMatchHistory.length - 1].rank + "位")
    },
    tapRankMatchTopBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this.rankMatchModel && "going" == this.rankMatchModel.status ? location.href = "#/RegularEventArenaRankMatchTop" : new b.PopupClass(
      {
        title: "ミラーズランクマッチの結果集計中",
        content: "現在、ミラーズランクマッチの結果集計中です。<br>集計中はミラーズバトルはプレイできません。",
        closeBtnText: "OK",
        popupType: "typeC"
      }))
    },
    tapNoEventBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || new b.PopupClass(
      {
        title: "ミラーズイベント",
        content: "ミラーズイベントは現在開催しておりません。<br>次回開催をお待ちください。",
        closeBtnText: "OK",
        popupType: "typeC"
      })
    },
    tapRankMatchRewardBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && (a = this.model, a.rewardList && a.emblemList && this.rankMatchModel))
      {
        var c = q.createRewardModel(
        {
          rewardList: a.rewardList,
          emblemList: a.emblemList
        });
        v.openPopup(
        {
          rewardList: c,
          rankInfo:
          {
            orderRank: this.rankMatchModel.userRankNum,
            highestOrderRank: a.userArenaBattle.rankMatchMaxRank
          }
        })
      }
    },
    render: function(a)
    {
      this.rankingOpenStatus();
      a = b.storage.userCardList.findWhere(
      {
        id: b.storage.gameUser.get("leaderId")
      }).toJSON().displayCardId;
      var c = b.storage.userItemList.findWhere(
        {
          itemId: "ARENA_COIN"
        }) ? b.storage.userItemList.findWhere(
        {
          itemId: "ARENA_COIN"
        }).toJSON().quantity : 0,
        d = !1,
        e = b.campaignParse(this.model.campaignList);
      e.ARENA_REWARD_UP && (d = e.ARENA_REWARD_UP.magnification);
      this.$el.html(this.template(
      {
        model: this.arenaJson,
        dontReach: !1,
        chips: c,
        gameUser: b.storage.gameUser.toJSON(),
        leader: a,
        canPlay: this.canPlay,
        nextCondition: this.nextCondition,
        ranking: this.ranking,
        rankMatchModel: this.rankMatchModel,
        noEventModel: this.noEventModel,
        currentEventClass: this.currentEventClass,
        campaign: d
      }));
      return this
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      p.prototype.rootView = this;
      this.infoView = new p;
      b.doc.getElementById("bpGuageTop").appendChild(this.infoView.render().el);
      b.setGlobalView();
      g = this;
      t.getBaseData(b.getNativeObj());
      this.diffencivePopup();
      b.firstNaviCheck(n.getPageJson());
      b.ready.hide()
    },
    infinitEnter: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this.ranking.rankingEventStatus || this.rankMatchModel ? "counting" === this.ranking.rankingEventStatus || "isOver" === this.ranking.rankingEventStatus ? new b.PopupClass(
      {
        title: "ミラーズランキングの結果集計中",
        content: "現在、ミラーズランキングの結果集計中です。<br>集計中はミラーズバトルはプレイできません。",
        closeBtnText: "OK",
        popupType: "typeC"
      }) : this.rankMatchModel && "counting" == this.rankMatchModel.status ? new b.PopupClass(
      {
        title: "ミラーズランクマッチの結果集計中",
        content: "現在、ミラーズランクマッチの結果集計中です。<br>集計中はミラーズバトルはプレイできません。",
        closeBtnText: "OK",
        popupType: "typeC"
      }) : this.canPlay ? location.href = "#/ArenaFreeRank" : this.conditionPopup(a) : this.canPlay ? location.href = "#/ArenaFreeRank" : this.conditionPopup(a))
    },
    rankingEnter: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
        if (this.ranking.canEnter) location.href = "#/EventArenaRankingTop";
        else if (this.ranking.rankingEventStatus && !this.ranking.rankingClose)
      {
        a = Date.parse(this.model.currentTime);
        var c = this.model.eventArenaRanking,
          d = Date.parse(c.preliminaryRoundEndAt),
          c = Date.parse(c.finalRoundStartAt),
          c = new Date(c),
          c = c.getMonth() + 1 + "月" + c.getDate() + "日&nbsp;" + c.getHours() + ":" + ("0" + c.getMinutes()).substr(-2, 2);
        "prelim" === this.ranking.rankingEventStatus ? a < d - 864E5 ? new b.PopupClass(
        {
          title: "ミラーズランキング",
          content: "本日分の対戦回数の上限に達しています。<br>対戦回数は16:00にリセットされます。",
          closeBtnText: "OK",
          popupType: "typeC"
        }) : new b.PopupClass(
        {
          title: "ミラーズランキング",
          content: "本日分の対戦回数の上限に達しています。<br>本戦は" + c + "開始予定です。",
          closeBtnText: "OK",
          popupType: "typeC"
        }) : "final" === this.ranking.rankingEventStatus && new b.PopupClass(
        {
          title: "ミラーズランキング",
          content: "本戦の対戦回数の上限に達しています。<br>結果発表をお待ちください。",
          closeBtnText: "OK",
          popupType: "typeC"
        })
      }
      else this.ranking.rankingEventStatus && this.ranking.rankingClose ? "counting" === this.ranking.rankingEventStatus ? (a = Date.parse(this.model.eventArenaRanking.finalRoundStartAt), a = new Date(a), a = a.getMonth() + 1 + "月" + a.getDate() + "日&nbsp;" + a.getHours() + ":" + ("0" + a.getMinutes()).substr(-2, 2), new b.PopupClass(
      {
        title: "ミラーズランキングの結果集計中",
        content: "現在、ミラーズランキングの結果集計中です。<br>集計中はミラーズバトルはプレイできません。<br>本戦は" + a + "開始予定です。",
        closeBtnText: "OK",
        popupType: "typeC"
      })) : "isOver" === this.ranking.rankingEventStatus && new b.PopupClass(
      {
        title: "ミラーズランキングの結果集計中",
        content: "現在、ミラーズランキングの結果集計中です。<br>集計中はミラーズバトルはプレイできません。",
        closeBtnText: "OK",
        popupType: "typeC"
      }) : new b.PopupClass(
      {
        title: "ミラーズランキング",
        content: "ミラーズランキングは現在開催しておりません。<br>次回開催をお待ちください。",
        closeBtnText: "OK",
        popupType: "typeC"
      })
    },
    nowRankStoryCheck: function()
    {
      var a;
      if (b.arenaStoryPlay) a = !0;
      else if (a = b.storage.userQuestAdventureList.findWhere(
        {
          adventureId: this.arenaJson.currentFreeRankClass.storyId
        }), !a)
        if (this.arenaJson.currentFreeRankClass.openConditionSectionId)
        {
          var c = b.storage.userSectionList.findWhere(
          {
            sectionId: Number(this.arenaJson.currentFreeRankClass.openConditionSectionId)
          });
          if (this.sectionCheck = c && c.toJSON().cleared ? !0 : !1) b.arenaStoryPlay = !0
        }
      else a = !0, b.arenaStoryPlay = !0;
      return a
    },
    diffencivePopup: function()
    {
      if (this.model.arenaBonusResult && 0 < this.model.arenaBonusResult.total)
      {
        var a = this.model.arenaBonusResult;
        a.winNum = a.wins + a.rankMatchWins;
        a.loseNum = a.total - a.winNum;
        a.mirrorsWins = a.wins;
        a.rankMatchCoinNum = 5 * a.rankMatchWins;
        var c = k.template($("#yestadayBonus").text());
        new b.PopupClass(
        {
          title: "前日の防衛ボーナス",
          content: c(
          {
            model: a
          }),
          exClass: "yestadayBonus",
          popupType: "typeC"
        })
      }
    },
    rankingOpenStatus: function()
    {
      var a = !0,
        b = this.arenaJson.currentFreeRankClassType.split("_");
      4 < (b[b.length - 1] | 0) && (a = !1);
      return a
    },
    conditionCheck: function(a)
    {
      "FREE_RANK_1" === this.arenaJson.currentFreeRankClassType ? (a = !0, b.storage.userQuestAdventureList.findWhere(
      {
        adventureId: this.arenaJson.currentFreeRankClass.storyId
      }) || (b.arenaStoryPlay = !0)) : a = a ? !0 : this.sectionCheck ? !0 : !1;
      return a
    },
    checkNextRankCondition: function()
    {
      return this.arenaJson.nextFreeRankClass ? this.arenaJson.nextFreeRankClass.openConditionSection ? !0 : !1 : !1
    },
    conditionPopup: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        a = this.nextCondition ? g.arenaJson.nextFreeRankClass : g.arenaJson.currentFreeRankClass;
        var c = a.openConditionChapter,
          d = k.template($("#limitedPopup").text());
        new b.PopupClass(
        {
          title: a.className + "・ストーリー解放条件",
          content: d(
          {
            conditionText: "メインストーリー&nbsp;" + c.chapterNoForView + "&nbsp;" + a.openConditionSection.genericIndex + "話をクリア"
          }),
          closeBtnText: "閉じる",
          exClass: "conditionPopup",
          popupType: "typeC"
        })
      }
    },
    removeHandler: function()
    {
      b.arenaClearFlag && (b.arenaClearFlag = !1);
      g = null;
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
