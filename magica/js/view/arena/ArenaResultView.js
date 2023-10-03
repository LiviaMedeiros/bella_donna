define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaResult.html js/follow/FollowPopup".split(" "), function(k, u, a, m, f, v, w)
{
  var h;
  return u.View.extend(
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
      this.model.userArenaBattleResultList[0] ? (h = this, this.tapFlag = !1, this.tapStep = "first", a.responseSetStorage(this.model), this.allInitialized(), this.template = k.template(v), this.campaign = a.campaignParse(m.getPageJson().campaignList), this.battleDataMake(), this.checkEnemy()) : (f.setWebView(), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "エラー",
        content: "バトルの結果が正しく取得できませんでした。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        f.endArena();
        f.nativeReload("#/TopPage")
      }))
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
    battleDataMake: function()
    {
      this.battleData = {};
      this.battleData.result = this.model.userArenaBattleResultList[0];
      this.battleData.battle = this.model.userArenaBattle;
      this.battleData.oldBattle = this.model.oldArenaBattle;
      this.battleData.quest = this.model.userQuestBattleResultList[0];
      this.battleData.isRanking = !1;
      this.battleData.isSimulate = "SIMULATE" == this.battleData.result.arenaBattleType || "CODE_MATCH" == this.battleData.result.arenaBattleType;
      this.battleData.freeResult = {};
      var a = [1.5, 1.5, 1.5, 1.4, 1.3, 1.2, 1.1],
        c = [0, 0, 1, 2, 3, 5, 7, 10],
        e = "HIGHER" === this.battleData.result.arenaBattleOpponentType ? 2 : "SAME" === this.battleData.result.arenaBattleOpponentType ? 1 : 0;
      this.battleData.freeResult.matchDiff = "HIGHER" === this.battleData.result.arenaBattleOpponentType ? 2 : "SAME" === this.battleData.result.arenaBattleOpponentType ? 1 : 0;
      this.battleData.freeResult.difficultyBonus = [.8, 1, 1.2][e];
      this.battleData.freeResult.turnBonus = 6 < this.battleData.quest.turns ? 1 : a[this.battleData.quest.turns];
      this.battleData.freeResult.consectiveBonus = 8 > this.battleData.result.numberOfConsecutiveWins ? c[this.battleData.result.numberOfConsecutiveWins] : 0;
      a = this.battleData.oldBattle.previousFreeRankClass ? this.battleData.oldBattle.previousFreeRankClass.requiredPoint | 0 : 0;
      this.battleData.freeResult.guageLen = Math.round((this.battleData.oldBattle.freeRankArenaPoint - a) / (this.battleData.oldBattle.currentFreeRankClass.requiredPoint - a) * 100);
      this.battleData.freeResult.mirrorsPoint = this.battleData.oldBattle.currentFreeRankClass.requiredPoint - this.battleData.oldBattle.freeRankArenaPoint;
      a = 1;
      "FREE_RANK" == this.battleData.result.arenaBattleType && this.campaign.ARENA_REWARD_UP && (a = this.campaign.ARENA_REWARD_UP.magnification / 1E3);
      this.battleData.freeResult.getCoin = "WIN" !== this.battleData.result.arenaBattleStatus ? 1 * a : 3 * a;
      if (this.battleData.isSimulate)
      {
        m.getPageJson();
        this.battleData.simulateResult = {};
        this.battleData.simulateResult.basePoint = "WIN" === this.battleData.result.arenaBattleStatus ? 1E3 : 300;
        var g = 0,
          d = 0,
          f = 0,
          h = 0;
        k.each(this.model.playerList, function(a, b)
        {
          g += a.hp;
          d += a.hpRemain;
          f++;
          0 < a.hpRemain && h++
        });
        d = Math.floor(d / g * 100);
        this.battleData.simulateResult.remainHp = d;
        a = {
          I: 100,
          H: 100,
          G: 100,
          F: 100,
          E: 110,
          D: 115,
          C: 120,
          B: 120,
          A: 120
        };
        c = this.battleData.result.arenaBattleOpponentTeamType;
        this.battleData.simulateResult.powerBonus = "×" + String(a[c] / 100);
        var l = [1.1, 1.1, 1.1, .9, .72, .5, .1],
          e = 0;
        this.battleData.quest.turns < l.length && (e = l[this.battleData.quest.turns]);
        var l = 4 > this.battleData.quest.turns ? this.battleData.quest.turns - 1 : 3,
          l = this.battleData.quest.connectNum > l ? l : this.battleData.quest.connectNum | 0,
          q = 3 < this.battleData.quest.skillNum ? 3 : this.battleData.quest.skillNum | 0,
          r = [16, 16, 22, 27],
          n = 3 < this.battleData.quest.magiaNum ? 3 : this.battleData.quest.magiaNum | 0,
          r = 1 > n ? 0 : r[n] / 100,
          n = [30, 30, 40, 49],
          p = 3 < this.battleData.quest.doppelNum ? 3 : this.battleData.quest.doppelNum | 0,
          n = 1 > p ? 0 : n[p] / 100,
          p = [0, 0, 0, 0, 0, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 35, 36, 37, 38, 39, 45, 45][20 < this.battleData.quest.chargeMax ? 20 : this.battleData.quest.chargeMax | 0] / 100,
          t = 100;
        this.battleData.simulateResult.battleBonus = "-";
        "WIN" === this.battleData.result.arenaBattleStatus && (t = 100 * Number((1 + e + 5 * q / 100 + 2 * l / 10 + r + n + (80 <= d ? .2 : 80 > d && 70 <= d ? .15 : 70 > d && 60 <= d ? .1 : 60 > d && 50 <= d ? .05 : 0) + (h / f * 15 | 0) / 100 + p).toFixed(2)), this.battleData.simulateResult.battleBonus = "×" + t / 100);
        this.battleData.simulateResult.point = Math.floor(a[c] / 100 * this.battleData.simulateResult.basePoint * (t / 100))
      }
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      f.getBaseData(a.getNativeObj());
      a.globalMenuView && a.globalMenuView.trigger("removeView");
      var b;
      b = "WIN" === this.model.userArenaBattleResultList[0].arenaBattleStatus ? 1701 : 1702;
      this.resultSe = setTimeout(function()
      {
        f.startSe(b);
        h.resultSe = null
      }, 2666);
      "FREE_RANK" == this.battleData.result.arenaBattleType && this.campaign.ARENA_REWARD_UP && a.addClass(a.doc.getElementById("pointsWrap").getElementsByClassName("coinNum")[0], "bonus");
      f.setWebView()
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
      for (var a = m.getPageJson().userProfile, c = [], e = 1; 6 > e; e++) a.userDeck["userCardId" + e] && c.push(k.findWhere(a.userCardList,
      {
        id: a.userDeck["userCardId" + e]
      }));
      c = Date.parse(this.newestModel.currentTime) / 1E3;
      (e = a.lastAccessDate ? Date.parse(a.lastAccessDate) / 1E3 : null) ? (c = (c - e) / 60, 16 > c ? c = "15分以内" : 60 > c ? c = Math.floor(c) + "分前" : 60 < c && 1440 > c ? c = Math.floor(c / 60) + "時間前" : (c = c / 60 / 24, c = 30 < c ? Math.floor(c / 30) + "カ月前" : Math.floor(c) + "日前")) : c = "-日前";
      a.loginTimeLag = c;
      this.model.enemyData = a;
      this.createDom()
    },
    allInitialized: function()
    {
      a.historyArray = ["MyPage", "ArenaTop"];
      this.backLink = "FREE_RANK" === this.model.userArenaBattleResultList[0].arenaBattleType ? "#/ArenaFreeRank" : "RANKING" === this.model.userArenaBattleResultList[0].arenaBattleType ? "#/ArenaRanking" : "SIMULATE" === this.model.userArenaBattleResultList[0].arenaBattleType || "CODE_MATCH" === this.model.userArenaBattleResultList[0].arenaBattleType ? "#/ArenaSimulate" : "#/ArenaTop";
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
          }),
          e = 1; 6 > e; e++)
        if (b["userCardId" + e])
          if (b.questEpisodeUserCardId !== b["userCardId" + e])
          {
            var g = k.findWhere(a.storage.userCardList.toJSON(),
              {
                id: b["userCardId" + e]
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
      "FREE_RANK" === this.model.userArenaBattleResultList[0].arenaBattleType && (this.model.rankup = !1, this.model.userArenaBattle && this.model.oldArenaBattle.currentFreeRankClassType !== this.model.userArenaBattle.currentFreeRankClassType ? (this.model.rankup = !0, this.model.rankupDisp = {}, this.rankUpStoryChecks()) : this.model.userArenaBattle || (this.model.userArenaBattle = this.model.oldArenaBattle))
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
            f.saveQuestRelpay(
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
      "CODE_MATCH" !== this.model.userArenaBattleResultList[0].arenaBattleType && (b.preventDefault(), a.isScrolled() || (b.currentTarget.classList.contains("canTap") || b.currentTarget.classList.contains("skipAnim") ? w.instantPopup(b, this.model.enemyData, "arena", this) : this.toggles(b)))
    },
    toggles: function(b)
    {
      b.preventDefault();
      !a.isScrolled() && this.tapFlag && (this.tapFlag = !1, "first" === this.tapStep ? (a.addClass(a.doc.getElementById("touchScreen"), "nodisp"), a.addClass(a.doc.getElementById("mainWrap"), "skipAnim"), a.addClass(a.doc.getElementById("resultTitle"), "skipAnim"), a.addClass(a.doc.getElementById("enemyBtn"), "skipAnim"), a.addClass(a.doc.getElementById("enemyClip"), "skipAnim"), this.tapStep = "second", setTimeout(function()
      {
        h.tapFlag = !0;
        a.removeClass(a.doc.getElementById("touchScreen"), "nodisp")
      }, 300)) : (a.addClass(a.doc.getElementById("touchScreen"), "nodisp"), a.addClass(a.doc.getElementById("mainWrap").getElementsByClassName("touch_screen")[0], "off"), "FREE_RANK" === this.model.userArenaBattleResultList[0].arenaBattleType && this.guageUpFlag ? (a.addClass(a.doc.getElementById("rankupWrap"), "endAnim"), a.addClass(a.doc.getElementById("resultMirror"), "endAnim"), a.addClass(a.doc.getElementById("resultTitle"), "endAnim"), this.nextPageHandler(b)) : "FREE_RANK" === this.model.userArenaBattleResultList[0].arenaBattleType && this.model.oldArenaBattle.currentFreeRankClass.nextClass ? this.guageFunc() : this.nextPageHandler(b)))
    },
    guageFunc: function()
    {
      this.guageUpFlag = !0;
      this.tapStep = "second";
      var b = function(b)
        {
          h.model.rankup ? h.rankUps() : setTimeout(function()
          {
            a.addClass(a.doc.getElementById("resultDate"), "fadeOut");
            a.addClass(a.doc.getElementById("mainWrap"), "endAnim");
            a.addClass(a.doc.getElementById("resultMirror"), "endAnim");
            a.addClass(a.doc.getElementById("resultTitle"), "endAnim");
            a.addClass(a.doc.getElementById("enemyBtn"), "fadeOut");
            h.nextPageHandler(b)
          }, 1E3)
        },
        c = this.model.oldArenaBattle.previousFreeRankClass ? this.model.oldArenaBattle.previousFreeRankClass.requiredPoint | 0 : 0,
        e = Math.round((this.model.oldArenaBattle.freeRankArenaPoint - c) / (this.model.oldArenaBattle.currentFreeRankClass.requiredPoint - c) * 100),
        g;
      this.model.rankup ? (c = 100, g = this.model.oldArenaBattle.currentFreeRankClass.requiredPoint) : (c = this.model.userArenaBattle.previousFreeRankClass ? this.model.userArenaBattle.previousFreeRankClass.requiredPoint | 0 : 0, c = Math.round((this.model.userArenaBattle.freeRankArenaPoint - c) / (this.model.userArenaBattle.currentFreeRankClass.requiredPoint - c) * 100), g = this.model.userArenaBattle.freeRankArenaPoint);
      var d = 0,
        k = (c - e) / 50,
        m = this.model.oldArenaBattle.currentFreeRankClass.requiredPoint - this.model.oldArenaBattle.freeRankArenaPoint,
        l = (g - this.model.oldArenaBattle.freeRankArenaPoint) / 50,
        q = setInterval(function()
        {
          f.startSe(1007);
          d++;
          var c = Math.round(e + k * d);
          a.doc.getElementById("requireWrap").getElementsByClassName("requireGuageInner")[0].style.width = c + "%";
          a.doc.getElementById("leftCount").textContent = Math.round(m - l * d);
          49 < d && (clearInterval(q), b())
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
      a.addClass(a.doc.getElementById("resultDate"), "fadeOut");
      a.addClass(a.doc.getElementById("enemyBtn"), "fadeOut");
      a.addClass(a.doc.getElementById("mainWrap"), "fadeOut");
      a.removeClass(a.doc.getElementById("rankupWrap"), "nodisp");
      a.addClass(a.doc.getElementById("rankupFlash"), "flashing");
      this.model.rankup = !1;
      f.startSe(1703)
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
        f.endArena();
        location.href = h.storyId ? "#/ArenaTop" : b
      });
      a.addClass(a.ready.target, "preNativeFadeIn")
    },
    enemyBtnActive: function(b)
    {
      a.addClass(a.doc.getElementById("enemyClip"), "canTap")
    },
    removeView: function()
    {
      h = null;
      this.off();
      this.remove()
    }
  })
});
