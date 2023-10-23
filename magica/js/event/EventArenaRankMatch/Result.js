define("underscore backbone backboneCommon ajaxControl command text!css/event/EventArenaRankMatch/Result.css text!template/event/EventArenaRankMatch/Result.html js/event/EventArenaRankMatch/Utility js/follow/FollowPopup js/view/item/ItemImgPartsView".split(" "), function(e, n, a, h, b, p, q, r, v, t)
{
  var f, g, m, u = n.View.extend(
  {
    events: function()
    {
      var d = {};
      d[a.cgti + " .replayBtn"] = this.replayBtn;
      d[a.cgti + " #touchScreen"] = this.toggles;
      d["webkitAnimationEnd .touch_screenTextWrap"] = this.touchScreen;
      return d
    },
    initialize: function(d)
    {
      this.model = d;
      g = h.getPageJson();
      this.model.userQuestBattleResultList && this.model.userQuestBattleResultList[0] && "TIME_UP" == this.model.userQuestBattleResultList[0].questBattleStatus ? (b.setWebView(), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "エラー",
        content: "バトルの所要時間が一定時間を超えたため<br>このバトルは無効になります。<br>イベントTOPに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        b.endArena();
        location.href = "#/RegularEventArenaRankMatchTop"
      })) : this.model.userArenaBattleResultList && this.model.userArenaBattleResultList[0] ? this.checkDispResult() ? (this.tapFlag = !1, a.responseSetStorage(this.model), this.allInitialized(), this.template = e.template(q), this.createDom()) : (b.setWebView(), a.responseSetStorage(this.model), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "ミラーズランクマッチ",
        content: "ランキングバトルのプレイ期間外のため<br>プレイ結果は反映されません。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        b.endArena();
        location.href = "#/TopPage"
      })) : (b.setWebView(), a.androidKeyStop = !0, new a.PopupClass(
      {
        title: "エラー",
        content: "バトルの結果が正しく取得できませんでした。<br>トップページに戻ります。",
        closeBtnText: "OK"
      }, null, null, function()
      {
        b.endArena();
        location.href = "#/TopPage"
      }))
    },
    allInitialized: function()
    {
      var d = this,
        c = r.getDeckType(),
        b = a.currentArenaRankMatchDeckType;
      b || (b = c.attackBase + 1);
      this.model.arenaDecks = {};
      this.model.arenaDecks.noneLeader = [];
      for (var c = e.findWhere(a.storage.userDeckList.toJSON(),
        {
          deckType: b
        }), b = e.findWhere(a.storage.userCardList.toJSON(),
        {
          id: c.questEpisodeUserCardId
        }), k = 1; 6 > k; k++)
        if (c["userCardId" + k])
          if (c.questEpisodeUserCardId !== c["userCardId" + k])
          {
            var l = e.findWhere(a.storage.userCardList.toJSON(),
              {
                id: c["userCardId" + k]
              }),
              h = e.findWhere(a.storage.userCharaList.toJSON(),
              {
                charaId: l.card.charaNo
              });
            l.chara = h.chara;
            this.model.arenaDecks.noneLeader.push(l)
          }
      else this.model.arenaDecks.leaderCard = b, l = e.findWhere(a.storage.userCharaList.toJSON(),
      {
        charaId: b.card.charaNo
      }), this.model.arenaDecks.leaderCard.chara = l.chara;
      c = 999999;
      this.model.rankMatchRanking && (c = this.model.rankMatchRanking.ranking);
      this.model.rankMatchOrderRank = {
        rank: c
      };
      this.model.rankMatchOrderRank.isOrderRankUp = !1;
      a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.orderRank && a.EventArenaRankMatchPrm.orderRank > c && (this.model.rankMatchOrderRank.isOrderRankUp = !0);
      var f = [];
      e.each(String(c), function(a, c, b)
      {
        f.push(String(a))
      });
      this.model.rankMatchOrderRank.textList = f;
      this.model.rankMatchBonusRewardList = [];
      var c = this.model.userArenaBattle.maxRankRewardsList,
        g = 0;
      c && c.length && (e.each(c, function(a, c, b)
      {
        e.each(a.presentList, function(a, c, b)
        {
          c = (new t(
          {
            model: a,
            type: a.presentType
          })).render().model;
          d.model.rankMatchBonusRewardList.push(
          {
            imagePath: c.imagePath,
            displayName: c.displayName,
            quantity: a.quantity
          })
        })
      }), e.each(this.model.rankMatchBonusRewardList, function(a, c, b)
      {
        g += a.quantity
      }), this.model.quantity = g);
      this.model.enemyData = a.EventArenaRankMatchPrm.opponentInfo;
      a.historyArr = ["MyPage", "ArenaTop", "RegularEventArenaRankMatchTop"];
      this.backLink = "#/RegularEventArenaRankMatchTop"
    },
    replayBtn: function(d)
    {
      if (!d.currentTarget.classList.contains("off") && (d.preventDefault(), !a.isScrolled()))
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
            $("#commandDiv").on("nativeCallback", function(c, b)
            {
              $("#commandDiv").off();
              if ("error" === b.resultCode) new a.PopupClass(
              {
                title: b.title ? b.title : "エラー",
                content: b.errorTxt ? b.errorTxt : "リプレイデータの保存に失敗しました。",
                closeBtnText: "OK"
              });
              else
              {
                c = h.getPageJson();
                var d = new Date(c.currentTime);
                d.setDate(d.getDate() + 30);
                c = d.getFullYear();
                b = 10 > d.getMonth() ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
                d = 10 > d.getDate() ? "0" + d.getDate() : d.getDate();
                new a.PopupClass(
                {
                  title: "リプレイの保存",
                  content: "リプレイに保存しました。<br><br>有効期限：" + c + "/" + b + "/" + d + "まで",
                  closeBtnText: "OK"
                });
                a.addClassId("replayBtn", "off");
                a.tapBlock(!1);
                a.androidKeyStop = !1
              }
            });
            b.saveQuestRelpay(
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
    checkDispResult: function()
    {
      var b = !1,
        c = e.findWhere(g.regularEventList,
        {
          regularEventId: a.EventArenaRankMatchPrm.eventInfo.regularEventId
        });
      c && a.getStatusTargetTermInCurrentTime(
      {
        startAt: c.startAt,
        endAt: c.endAt,
        currentTime: g.currentTime
      }) && (b = !0);
      return b
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
      b.getBaseData(a.getNativeObj());
      a.ready.hide();
      a.globalMenuView && a.globalMenuView.trigger("removeView");
      "WIN" === this.model.userArenaBattleResultList[0].arenaBattleStatus ? this.model.rankMatchOrderRank.isOrderRankUp ? (a.addClass(a.doc.getElementsByClassName("touch_screenTextWrap")[0], "win"), a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "win")) : (a.addClass(a.doc.getElementsByClassName("touch_screenTextWrap")[0], "win_noneReward"), a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "win_noneReward")) : (a.addClass(a.doc.getElementsByClassName("touch_screenTextWrap")[0], "lose"), a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "lose"));
      b.setWebView()
    },
    toggles: function(d)
    {
      d.preventDefault();
      a.isScrolled() || (b.endArena(), location.href = "#/RegularEventArenaRankMatchTop")
    },
    touchScreen: function()
    {
      a.addClass(a.doc.getElementById("touchScreen"), "on")
    },
    rankUps: function()
    {
      b.startSe(1703)
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
      h.pageModelGet(this.needModelIdObj, null, null)
    },
    init: function()
    {
      a.ready.hide();
      b.startBgm("bgm03_story15");
      a.androidKeyStop = !0;
      m = a.questNativeResponse;
      a.setStyle(p);
      f = new u(m)
    },
    remove: function(b)
    {
      a.questNativeResponse = null;
      a.androidKeyStop = !1;
      a.oldModel = null;
      f && f.remove();
      b()
    }
  }
});
