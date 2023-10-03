define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaResult.html js/follow/FollowPopup".split(" "), function(k, q, a, m, e, r, t)
{
  var l;
  return q.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #enemyClip"] = this.enemyPopup;
      b[a.cgti + " .replayBtn"] = this.replayBtn;
      b[a.cgti + " #touchScreen"] = this.toggles;
      b["webkitTransitionEnd #resultTitle"] = this.toggleTapBlock;
      b["webkitAnimationEnd #resultTitle"] = this.toggleTapBlock;
      b["webkitanimationend #resultTitle"] = this.toggleTapBlock;
      b["animationend #resultTitle"] = this.toggleTapBlock;
      b["webkitTransitionEnd #pointsWrap"] = this.toggleTapStep;
      b["webkitAnimationEnd #pointsWrap"] = this.toggleTapStep;
      b["webkitanimationend #pointsWrap"] = this.toggleTapStep;
      b["animationend #pointsWrap"] = this.toggleTapStep;
      b["webkitTransitionEnd .nextMirrorAfter"] = this.rankUpAfter;
      b["webkitAnimationEnd .nextMirrorAfter"] = this.rankUpAfter;
      b["webkitanimationend .nextMirrorAfter"] = this.rankUpAfter;
      b["animationend .nextMirrorAfter"] = this.rankUpAfter;
      b["webkitTransitionEnd #enemyBtn"] = this.enemyBtnActive;
      b["webkitAnimationEnd #enemyBtn"] = this.enemyBtnActive;
      b["webkitanimationend #enemyBtn"] = this.enemyBtnActive;
      b["animationend #enemyBtn"] = this.enemyBtnActive;
      return b
    },
    initialize: function(b)
    {
      a.oldModel.userArenaBattle ? (this.oldArenaBattle = a.oldModel.userArenaBattle, a.oldModel = null) : this.oldArenaBattle = a.storage.userArenaBattle.toJSON();
      this.model = b;
      this.newestModel = m.getPageJson();
      b = k.findWhere(this.newestModel.eventList,
      {
        eventId: a.eventArenaRanking.eventId
      });
      var c = this.canPlayRanking();
      b && c ? this.model.userArenaBattleResultList[0] ? (l = this, this.tapFlag = !1, this.tapStep = "first", a.responseSetStorage(this.model), this.allInitialized(), this.battleDataMake(), this.template = k.template(r), this.checkEnemy()) : (e.setWebView(), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "エラー",
        content: "バトルの結果が正しく取得できませんでした。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        e.endArena();
        e.nativeReload("#/TopPage")
      })) : (e.setWebView(), this.newestModel.gameUser.remainBattleCountOfRanking && this.newestModel.gameUser.remainBattleCountOfRanking > this.model.gameUser.remainBattleCountOfRanking && (this.model.gameUser = this.newestModel.gameUser), a.responseSetStorage(this.model), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "ミラーズランキング",
        content: "ランキングバトルのプレイ期間外のため<br>プレイ結果は反映されません。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        e.endArena();
        e.nativeReload("#/TopPage")
      }))
    },
    battleDataMake: function()
    {
      this.battleData = {};
      this.battleData.result = this.model.userArenaBattleResultList[0];
      this.battleData.battle = this.model.userArenaBattle;
      this.battleData.oldBattle = this.model.oldArenaBattle;
      this.battleData.quest = this.model.userQuestBattleResultList[0];
      this.battleData.isRanking = !0;
      this.battleData.rankResult = {};
      this.battleData.basePoint = "WIN" === this.battleData.result.arenaBattleStatus ? a.eventArenaRanking.winPoint : a.eventArenaRanking.losePoint;
      this.battleData.rankResult.powerBonus = "×" +
      {
        I: 1,
        H: 1,
        G: 1,
        F: 1,
        E: 1.1,
        D: 1.15,
        C: 1.2,
        B: 1.2,
        A: 1.2
      } [this.battleData.result.arenaBattleOpponentTeamType];
      a.enemyPower = null;
      "WIN" !== this.battleData.result.arenaBattleStatus && (this.battleData.rankResult.powerBonus = "-");
      var b = a.storage.gameUser.toJSON(),
        b = ("prelim" === a.eventArenaRanking.tarm ? a.eventArenaRanking.preliminaryRoundBattleCount : a.eventArenaRanking.finalRoundBattleCount) - b.remainBattleCountOfRanking,
        c = b - 10 * (b / 10 | 0) | 0;
      this.battleData.rankResult.battleCount = b;
      this.battleData.rankResult.breakBonus = "WIN" === this.battleData.result.arenaBattleStatus ? 3 === c ? "×1.5" : 7 === c ? "×2" : "-" : "-";
      c = [1.1, 1.1, 1.1, .9, .72, .5, .1];
      b = 0;
      this.battleData.quest.turns < c.length && (b = c[this.battleData.quest.turns]);
      var c = 4 > this.battleData.quest.turns ? this.battleData.quest.turns - 1 : 3,
        c = 2 * (this.battleData.quest.connectNum > c ? c : this.battleData.quest.connectNum) / 10,
        f = 5 * (3 < this.battleData.quest.skillNum ? 3 : this.battleData.quest.skillNum) / 100,
        g = [16, 16, 22, 27],
        d = this.battleData.quest.magiaNum,
        g = 1 > d ? 0 : 4 > d ? g[d] / 100 : .27,
        d = [30, 30, 40, 49],
        e = this.battleData.quest.doppelNum,
        d = 1 > e ? 0 : 4 > e ? d[e] / 100 : .49,
        l = 0,
        h = 0,
        n = 0,
        p = 0;
      k.each(this.model.playerList, function(a, b)
      {
        l += a.hp;
        h += a.hpRemain;
        n++;
        0 < a.hpRemain && p++
      });
      h = Math.floor(h / l * 100);
      e = [0, 0, 0, 0, 0, .15, .16, .17, .18, .19, .25, .26, .27, .28, .29, .35, .36, .37, .38, .39, .45, .45][20 < this.battleData.quest.chargeMax ? 20 : this.battleData.quest.chargeMax | 0];
      this.battleData.rankResult.battleBonus = "WIN" === this.battleData.result.arenaBattleStatus ? "×" + (1 + b + f + c + g + d + (80 <= h ? .2 : 80 > h && 70 <= h ? .15 : 70 > h && 60 <= h ? .1 : 60 > h && 50 <= h ? .05 : 0) + (p / n * 15 | 0) / 100 + e).toFixed(2) : "-";
      this.battleData.rewards = {};
      this.battleData.arenaCoinNum = "WIN" === this.battleData.result.arenaBattleStatus ? a.eventArenaRanking.winArenaItemCount : a.eventArenaRanking.loseArenaItemCount;
      this.battleData.rewardItemCode = a.eventArenaRanking.rewardItemId.toLowerCase();
      this.battleData.rewardItemNum = "WIN" === this.battleData.result.arenaBattleStatus ? a.eventArenaRanking.winRewardItemCount : a.eventArenaRanking.loseRewardItemCount
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model,
        battleData: this.battleData,
        gameUser: a.storage.gameUser.toJSON()
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      e.getBaseData(a.getNativeObj());
      a.globalMenuView && a.globalMenuView.trigger("removeView");
      var b;
      b = "WIN" === this.model.userArenaBattleResultList[0].arenaBattleStatus ? 1701 : 1702;
      this.resultSe = setTimeout(function()
      {
        e.startSe(b);
        l.resultSe = null
      }, 2666);
      e.setWebView()
    },
    canPlayRanking: function()
    {
      var b = Date.parse(this.newestModel.currentTime),
        c = a.eventArenaRanking,
        f = Date.parse(c.preliminaryRoundStartAt),
        g = Date.parse(c.preliminaryRoundEndAt),
        d = Date.parse(c.finalRoundStartAt),
        c = Date.parse(c.finalRoundEndAt);
      return b >= f && b < g || !(b >= g && b < d || b >= c) && b >= d && b < c ? !0 : !1
    },
    toggleTapBlock: function(a)
    {
      this.tapFlag = !0
    },
    toggleTapStep: function(a)
    {
      this.tapStep = "second"
    },
    checkEnemy: function()
    {
      for (var a = m.getPageJson().userProfile, c = [], f = 1; 6 > f; f++) a.userDeck["userCardId" + f] && c.push(k.findWhere(a.userCardList,
      {
        id: a.userDeck["userCardId" + f]
      }));
      c = Date.parse(this.newestModel.currentTime) / 1E3;
      (f = a.lastAccessDate ? Date.parse(a.lastAccessDate) / 1E3 : null) ? (c = (c - f) / 60, 16 > c ? c = "15分以内" : 60 > c ? c = Math.floor(c) + "分前" : 60 < c && 1440 > c ? c = Math.floor(c / 60) + "時間前" : (c = c / 60 / 24, c = 30 < c ? Math.floor(c / 30) + "カ月前" : Math.floor(c) + "日前")) : c = "-日前";
      a.loginTimeLag = c;
      this.model.enemyData = a;
      this.createDom()
    },
    allInitialized: function()
    {
      a.arenaStoryPlay = !1;
      this.storyId = null;
      this.model.oldArenaBattle = this.oldArenaBattle;
      this.oldArenaBattle = null;
      this.model.arenaDecks = {};
      this.model.arenaDecks.noneLeader = [];
      for (var b = k.findWhere(a.storage.userDeckList.toJSON(),
        {
          deckType: 21
        }), c = k.findWhere(a.storage.userCardList.toJSON(),
        {
          id: b.questEpisodeUserCardId
        }), f = 1; 6 > f; f++)
        if (b["userCardId" + f])
          if (b.questEpisodeUserCardId !== b["userCardId" + f])
          {
            var g = k.findWhere(a.storage.userCardList.toJSON(),
              {
                id: b["userCardId" + f]
              }),
              d = k.findWhere(a.storage.userCharaList.toJSON(),
              {
                charaId: g.card.charaNo
              });
            g.chara = d.chara;
            this.model.arenaDecks.noneLeader.push(g)
          }
      else this.model.arenaDecks.leaderCard = c, g = k.findWhere(a.storage.userCharaList.toJSON(),
      {
        charaId: c.card.charaNo
      }), this.model.arenaDecks.leaderCard.chara = g.chara;
      this.model.rankup = !1;
      this.model.oldArenaBattle.currentFreeRankClassType !== this.model.userArenaBattle.currentFreeRankClassType && (this.model.rankup = !0, this.model.rankupDisp = {}, this.rankUpStoryChecks());
      a.historyArray = ["MyPage", "ArenaTop"];
      this.backLink = "#/EventArenaRankingTop"
    },
    replayBtn: function(b)
    {
      if (!b.currentTarget.classList.contains("off") && (b.preventDefault(), !a.isScrolled()))
      {
        var c = this.model.userArenaBattleResultList[0].userQuestBattleResultId;
        new a.PopupClass(
        {
          title: "リプレイの保存",
          content: "今回のミラーズバトルを<br>リプレイに保存しますか？",
          closeBtnText: "保存しない",
          decideBtnText: "保存する",
          decideBtnEvent: function()
          {
            a.tapBlock(!0);
            a.androidKeyStop = !0;
            $("#commandDiv").on("nativeCallback", function(b, c)
            {
              $("#commandDiv").off();
              if ("error" === c.resultCode) new a.PopupClass(
              {
                title: c.title ? c.title : "エラー",
                content: c.errorTxt ? c.errorTxt : "リプレイデータの保存に失敗しました。",
                closeBtnText: "OK"
              });
              else
              {
                b = m.getPageJson();
                var d = new Date(b.currentTime);
                d.setDate(d.getDate() + 30);
                b = d.getFullYear();
                c = 10 > d.getMonth() ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
                d = 10 > d.getDate() ? "0" + d.getDate() : d.getDate();
                new a.PopupClass(
                {
                  title: "リプレイの保存",
                  content: "リプレイに保存しました。<br><br>有効期限：" + b + "/" + c + "/" + d + "まで",
                  closeBtnText: "OK"
                });
                a.addClassId("replayBtn", "off");
                a.tapBlock(!1);
                a.androidKeyStop = !1
              }
            });
            e.saveQuestRelpay(
            {
              userQuestBattleResultId: c
            });
            window.isBrowser && $("#commandDiv").trigger("nativeCallback",
            {
              resultCode: ""
            })
          }
        })
      }
    },
    enemyPopup: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b.currentTarget.classList.contains("canTap") || b.currentTarget.classList.contains("skipAnim") ? t.instantPopup(b, this.model.enemyData, "arena", this) : this.toggles(b))
    },
    toggles: function(b)
    {
      b.preventDefault();
      !a.isScrolled() && this.tapFlag && (this.tapFlag = !1, "first" === this.tapStep ? (a.addClass(a.doc.getElementById("touchScreen"), "nodisp"), a.addClass(a.doc.getElementById("mainWrap"), "skipAnim"), a.addClass(a.doc.getElementById("resultTitle"), "skipAnim"), a.addClass(a.doc.getElementById("enemyBtn"), "skipAnim"), a.addClass(a.doc.getElementById("enemyClip"), "skipAnim"), this.tapStep = "second", setTimeout(function()
      {
        l.tapFlag = !0;
        a.removeClass(a.doc.getElementById("touchScreen"), "nodisp")
      }, 300)) : (a.addClass(a.doc.getElementById("touchScreen"), "nodisp"), a.addClass(a.doc.getElementById("mainWrap").getElementsByClassName("touch_screen")[0], "off"), this.guageUpFlag ? (a.addClass(a.doc.getElementById("rankupWrap"), "endAnim"), a.addClass(a.doc.getElementById("resultMirror"), "endAnim"), a.addClass(a.doc.getElementById("resultTitle"), "endAnim"), this.nextPageHandler(b)) : "FREE_RANK" === this.model.userArenaBattleResultList[0].arenaBattleType && this.model.oldArenaBattle.currentFreeRankClass.nextClass ? this.guageFunc() : this.nextPageHandler(b)))
    },
    guageFunc: function()
    {
      this.guageUpFlag = !0;
      this.tapStep = "second";
      var b = function(b)
        {
          l.model.rankup ? l.rankUps() : setTimeout(function()
          {
            a.addClass(a.doc.getElementById("mainWrap"), "endAnim");
            a.addClass(a.doc.getElementById("resultMirror"), "endAnim");
            a.addClass(a.doc.getElementById("resultTitle"), "endAnim");
            a.addClass(a.doc.getElementById("enemyBtn"), "fadeOut");
            l.nextPageHandler(b)
          }, 1E3)
        },
        c = this.model.oldArenaBattle.previousFreeRankClass ? this.model.oldArenaBattle.previousFreeRankClass.requiredPoint | 0 : 0,
        f = Math.round((this.model.oldArenaBattle.freeRankArenaPoint - c) / (this.model.oldArenaBattle.currentFreeRankClass.requiredPoint - c) * 100),
        g;
      this.model.rankup ? (c = 100, g = this.model.oldArenaBattle.currentFreeRankClass.requiredPoint) : (c = this.model.userArenaBattle.previousFreeRankClass ? this.model.userArenaBattle.previousFreeRankClass.requiredPoint | 0 : 0, c = Math.round((this.model.userArenaBattle.freeRankArenaPoint - c) / (this.model.userArenaBattle.currentFreeRankClass.requiredPoint - c) * 100), g = this.model.userArenaBattle.freeRankArenaPoint);
      var d = 0,
        k = (c - f) / 50,
        m = this.model.oldArenaBattle.currentFreeRankClass.requiredPoint - this.model.oldArenaBattle.freeRankArenaPoint,
        h = (g - this.model.oldArenaBattle.freeRankArenaPoint) / 50,
        n = setInterval(function()
        {
          e.startSe(1007);
          d++;
          var c = Math.round(f + k * d);
          a.doc.getElementById("requireWrap").getElementsByClassName("requireGuageInner")[0].style.width = c + "%";
          a.doc.getElementById("leftCount").innerText = Math.round(m - h * d);
          49 < d && (clearInterval(n), b())
        }, 20)
    },
    rankUpAfter: function()
    {
      this.tapFlag = !0;
      a.removeClass(a.doc.getElementById("touchScreen"), "nodisp")
    },
    rankUps: function()
    {
      a.addClass(a.doc.getElementById("replayBtn"), "fadeOut");
      a.addClass(a.doc.getElementById("enemyBtn"), "fadeOut");
      a.addClass(a.doc.getElementById("mainWrap"), "fadeOut");
      a.removeClass(a.doc.getElementById("rankupWrap"), "nodisp");
      a.addClass(a.doc.getElementById("rankupFlash"), "flashing");
      this.model.rankup = !1;
      e.startSe(1703)
    },
    rankUpStoryChecks: function()
    {
      this.storyId = this.model.userArenaBattle.currentFreeRankClass.storyId;
      this.model.rankupDisp.storyName = this.model.userArenaBattle.currentFreeRankClass.className + "「" + this.model.userArenaBattle.currentFreeRankClass.storyTitle + "」";
      var b = a.storage.userSectionList.findWhere(
        {
          sectionId: Number(this.model.userArenaBattle.currentFreeRankClass.openConditionSectionId)
        }),
        b = b && b.toJSON().cleared ? !0 : !1;
      this.model.userArenaBattle.currentFreeRankClass.openConditionSectionId && !b ? (b = this.model.userArenaBattle.currentFreeRankClass.openConditionSection, this.model.rankupDisp.conditionSection = "メインストーリー&nbsp;" + b.openConditionChapter.chapterNoForView + "&nbsp;" + b.genericIndex + "話をクリア", a.arenaStoryPlay = !1) : a.arenaStoryPlay = !0
    },
    nextPageHandler: function(a)
    {
      a && a.preventDefault();
      this.storyCheck(this.backLink)
    },
    storyCheck: function(b)
    {
      $(a.ready.target).on("webkitAnimationEnd", function()
      {
        $(a.ready.target).off("webkitAnimationEnd");
        $(a.ready.target).on("webkitAnimationEnd", function(b)
        {
          "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
        });
        e.endArena();
        location.href = l.storyId ? "#/ArenaTop" : b
      });
      a.addClass(a.ready.target, "preNativeFadeIn")
    },
    enemyBtnActive: function(b)
    {
      a.addClass(a.doc.getElementById("enemyClip"), "canTap")
    },
    removeView: function()
    {
      l = null;
      this.off();
      this.remove()
    }
  })
});
