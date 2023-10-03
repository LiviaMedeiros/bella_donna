define("underscore backbone backboneCommon ajaxControl command text!css/event/EventArenaRankMatch/Result.css text!template/event/EventArenaRankMatch/Result.html js/event/EventArenaRankMatch/Utility js/follow/FollowPopup js/view/item/ItemImgPartsView".split(" "), function(f, n, a, k, e, p, q, r, v, t)
{
  var g, h, m, u = n.View.extend(
  {
    events: function()
    {
      var c = {};
      c[a.cgti + " .replayBtn"] = this.replayBtn;
      c[a.cgti + " #touchScreen"] = this.toggles;
      c["webkitAnimationEnd .touch_screenTextWrap"] = this.touchScreen;
      return c
    },
    initialize: function(c)
    {
      this.model = c;
      h = k.getPageJson();
      this.checkDispResult() ? this.model.userArenaBattleResultList[0] ? (this.tapFlag = !1, a.responseSetStorage(this.model), this.allInitialized(), this.template = f.template(q), this.createDom()) : (e.setWebView(), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "エラー",
        content: "バトルの結果が正しく取得できませんでした。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        e.endArena();
        e.nativeReload("#/TopPage");
        window.isBrowser && (location.href = "#/TopPage")
      })) : (e.setWebView(), a.responseSetStorage(this.model), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "ミラーズランクマッチ",
        content: "ランキングバトルのプレイ期間外のため<br>プレイ結果は反映されません。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        e.endArena();
        e.nativeReload("#/TopPage");
        window.isBrowser && (location.href = "#/TopPage")
      }))
    },
    allInitialized: function()
    {
      var c = this,
        b = r.getDeckType();
      this.model.arenaDecks = {};
      this.model.arenaDecks.noneLeader = [];
      for (var b = f.findWhere(a.storage.userDeckList.toJSON(),
          {
            deckType: b.listAttack[0]
          }), e = f.findWhere(a.storage.userCardList.toJSON(),
          {
            id: b.questEpisodeUserCardId
          }),
          l = 1; 6 > l; l++)
        if (b["userCardId" + l])
          if (b.questEpisodeUserCardId !== b["userCardId" + l])
          {
            var d = f.findWhere(a.storage.userCardList.toJSON(),
              {
                id: b["userCardId" + l]
              }),
              k = f.findWhere(a.storage.userCharaList.toJSON(),
              {
                charaId: d.card.charaNo
              });
            d.chara = k.chara;
            this.model.arenaDecks.noneLeader.push(d)
          }
      else this.model.arenaDecks.leaderCard = e, d = f.findWhere(a.storage.userCharaList.toJSON(),
      {
        charaId: e.card.charaNo
      }), this.model.arenaDecks.leaderCard.chara = d.chara;
      b = 999999;
      this.model.userArenaRankMatchRankingA ? b = this.model.userArenaRankMatchRankingA.rank : this.model.userArenaRankMatchRankingB && (b = this.model.userArenaRankMatchRankingB.rank);
      this.model.rankMatchOrderRank = {
        rank: b
      };
      this.model.rankMatchOrderRank.isOrderRankUp = !1;
      a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.orderRank && a.EventArenaRankMatchPrm.orderRank > b && (this.model.rankMatchOrderRank.isOrderRankUp = !0);
      var g = [];
      f.each(String(b), function(a, b, c)
      {
        g.push(String(a))
      });
      this.model.rankMatchOrderRank.textList = g;
      this.model.rankMatchBonusRewardList = [];
      var b = this.model.userArenaBattle.maxRankRewardsList,
        h = 0;
      b && b.length && (f.each(b, function(a, b, d)
      {
        f.each(a.presentList, function(a, b, d)
        {
          b = (new t(
          {
            model: a,
            type: a.presentType
          })).render().model;
          c.model.rankMatchBonusRewardList.push(
          {
            imagePath: b.imagePath,
            displayName: b.displayName,
            quantity: a.quantity
          })
        })
      }), f.each(this.model.rankMatchBonusRewardList, function(a, b, c)
      {
        h += a.quantity
      }), this.model.quantity = h);
      this.model.enemyData = a.EventArenaRankMatchPrm.opponentInfo;
      a.historyArr = ["MyPage", "ArenaTop", "RegularEventArenaRankMatchTop"];
      this.backLink = "#/RegularEventArenaRankMatchTop"
    },
    replayBtn: function(c)
    {
      if (!c.currentTarget.classList.contains("off") && (c.preventDefault(), !a.isScrolled()))
      {
        var b = this.model.userArenaBattleResultList[0].userQuestBattleResultId;
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
                b = k.getPageJson();
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
              userQuestBattleResultId: b
            });
            window.isBrowser && $("#commandDiv").trigger("nativeCallback",
            {
              resultCode: ""
            })
          }
        })
      }
    },
    checkDispResult: function()
    {
      var c = !1,
        b = f.findWhere(h.regularEventList,
        {
          regularEventId: a.EventArenaRankMatchPrm.eventInfo.regularEventId
        });
      b && a.getStatusTargetTermInCurrentTime(
      {
        startAt: b.startAt,
        endAt: b.endAt,
        currentTime: h.currentTime
      }) && (c = !0);
      return c
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      e.getBaseData(a.getNativeObj());
      a.ready.hide();
      a.globalMenuView && a.globalMenuView.trigger("removeView");
      "WIN" === this.model.userArenaBattleResultList[0].arenaBattleStatus ? this.model.rankMatchOrderRank.isOrderRankUp ? (a.addClass(a.doc.getElementsByClassName("touch_screenTextWrap")[0], "win"), a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "win")) : (a.addClass(a.doc.getElementsByClassName("touch_screenTextWrap")[0], "win_noneReward"), a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "win_noneReward")) : (a.addClass(a.doc.getElementsByClassName("touch_screenTextWrap")[0], "lose"), a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "lose"));
      e.setWebView()
    },
    toggles: function(c)
    {
      c.preventDefault();
      a.isScrolled() || (e.endArena(), location.href = "#/RegularEventArenaRankMatchTop")
    },
    touchScreen: function()
    {
      a.addClass(a.doc.getElementById("touchScreen"), "on")
    },
    rankUps: function()
    {
      e.startSe(1703)
    },
    removeView: function()
    {
      this.off();
      this.remove()
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
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userArenaBattle"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      a.battleEnemy = null;
      k.pageModelGet(this.needModelIdObj, null, null)
    },
    init: function()
    {
      a.ready.hide();
      e.startBgm("bgm03_story15");
      a.androidKeyStop = !0;
      m = a.questNativeResponse;
      a.setStyle(p);
      g = new u(m)
    },
    remove: function(c)
    {
      a.questNativeResponse = null;
      a.androidKeyStop = !1;
      a.oldModel = null;
      g && g.remove();
      c()
    }
  }
});
