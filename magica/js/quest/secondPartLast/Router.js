define("underscore backbone backboneCommon ajaxControl command QuestUtil cardUtil js/quest/secondPartLast/ConvertModel".split(" "), function(l, z, c, h, f, t, A, u)
{
  var n, p, g, k, v = function(a)
    {
      var b = !1,
        c = a.model.secondPartLastInfo.questInfo,
        m = a.model.secondPartLastInfo.storyInfo.storyIdList.armAllClear,
        f = !1;
      l.each(n.userQuestAdventureList, function(a, b, c)
      {
        a.adventureId == m && (f = !0)
      });
      var d = 0;
      l.each(c, function(a, b, c)
      {
        "CONQUERED" == a.genericValue && d++
      });
      f || 4 != d || (b = !0);
      return b
    },
    q = function(a)
    {
      var b = !1;
      "CONQUERED" == a.model.secondPartLastInfo.battleInfo.battle5Status && (b = !0);
      return b
    },
    w = function(a)
    {
      a = a.model.secondPartLastInfo.questInfo;
      var b = !1;
      1 <= a[a.length - 1].clearCount && (b = !0);
      return b
    },
    x = function(a)
    {
      var b = a.model;
      if (k && "forceLoseBattle" == k)
        if (f.changeBg("web_black.jpg"), a = l.findWhere(c.storage.userQuestBattleList.toJSON(),
          {
            questBattleId: Number(g)
          }))
        {
          var e = l.findWhere(c.storage.userSectionList.toJSON(),
            {
              sectionId: a.questBattle.sectionId
            }),
            m = "";
          e && e.section.secret ? (m = "_" + e.section.secret, c.playStory(
          {
            cmd: f,
            ajaxControl: h,
            storyId: a.questBattle.endStory + m,
            fullVoiceSectionId: a.questBattle.sectionId,
            isForcePlay: !c.storage.gameUser.toJSON().skipAdventure,
            callback: function()
            {
              d(
              {
                url: "#/MainQuest"
              })
            }
          })) : d(
          {
            url: "#/MainQuest"
          })
        }
      else d(
      {
        url: "#/MainQuest"
      });
      else b.secondPartLastInfo.battleInfo.isMirrorBattleWin ? b.secondPartLastInfo.battleInfo.isMirrorBattleWin && !q(
      {
        model: b
      }) ? "battleWin" == k ? r(
      {
        model: b,
        playedQuestBattleId: g,
        callback: function()
        {
          v(
          {
            model: b
          }) ? c.playStory(
          {
            cmd: f,
            ajaxControl: h,
            storyId: b.secondPartLastInfo.storyInfo.storyIdList.armAllClear,
            fullVoiceSectionId: b.secondPartLastInfo.sectionId,
            callback: function()
            {
              d(
              {
                url: "#/SecondPartLastTop/" + g
              })
            }
          }) : d(
          {
            url: "#/SecondPartLastTop/" + g
          })
        }
      }) : d(
      {
        url: "#/SecondPartLastTop"
      }) : b.secondPartLastInfo.battleInfo.isMirrorBattleWin && q(
      {
        model: b
      }) && !w(
      {
        model: b
      }) ? "battleWin" == k ? r(
      {
        model: b,
        playedQuestBattleId: g,
        callback: function()
        {
          d(
          {
            url: "#/SecondPartLastBoss"
          })
        }
      }) : d(
      {
        url: "#/SecondPartLastBoss"
      }) : d(
      {
        url: "#/MainQuest"
      }) : "mirrorBattleWin" == k ? h.ajaxPost(c.linkList.secondPartLastMirrorBattleClear,
      {}, function(a)
      {
        c.responseSetStorage(a);
        c.playStory(
        {
          cmd: f,
          ajaxControl: h,
          storyId: b.secondPartLastInfo.storyInfo.storyIdList.afterMirrorBattle,
          fullVoiceSectionId: b.secondPartLastInfo.sectionId,
          callback: function()
          {
            d(
            {
              url: "#/SecondPartLastTop"
            })
          }
        })
      }) : c.playStory(
      {
        cmd: f,
        ajaxControl: h,
        storyId: b.secondPartLastInfo.storyInfo.storyIdList.beforeMirrorBattle,
        fullVoiceSectionId: b.secondPartLastInfo.sectionId,
        callback: function()
        {
          f.setWebView(!1);
          f.startMirrorBattle(
          {
            resultUrl: "/magica/index.html#/SecondPartLastRouter/mirrorBattleWin",
            retireUrl: "/magica/index.html#/MainQuest"
          })
        }
      })
    },
    r = function(a)
    {
      var b = a.model,
        e = a.playedQuestBattleId,
        d = a.callback,
        g;
      l.each(b.secondPartLastInfo.questInfo, function(a, b, c)
      {
        e == a.questBattleId && (g = a)
      });
      a = "";
      b.secondPartLastInfo.sectionInfo.section.secret && (a = "_" + b.secondPartLastInfo.sectionInfo.section.secret);
      g ? c.playStory(
      {
        cmd: f,
        ajaxControl: h,
        storyId: g.questBattle.endStory + a,
        fullVoiceSectionId: b.secondPartLastInfo.sectionId,
        callback: function()
        {
          d()
        }
      }) : d()
    },
    d = function(a)
    {
      a = a.url;
      k = g = null;
      location.href = a
    },
    y = function(a)
    {
      var b = "SECONDPARTLAST";
      a.battleType && "LastBattle" == a.battleType && (b = "MAIN");
      var e = a.sectionModel,
        d = a.questModel;
      if (!e || !d) return !1;
      a = {};
      e = e.section;
      a.questType = b;
      a.userQuestAdventureList = c.storage.userQuestAdventureList.toJSON();
      a.rewardCodeArr = [];
      e.secret && (a.secret = e.secret);
      a.questBattle = d.questBattle;
      a.ap = 0;
      a.difficulty = 0;
      e.ap && (a.ap = e.ap);
      e.difficulty && (a.difficulty = e.difficulty);
      a.chapterNoForView = "第12章";
      a.genericIndex = e.genericIndex;
      a.title = e.title;
      a.battleTitle = "LAST BATTLE";
      b = t.dropItemJson(d);
      b.firstClearReward && (a.firstClearReward = b.firstClearReward);
      b.firstClearRewardName && (a.firstClearRewardName = b.firstClearRewardName);
      b.firstClearRewardQuantity && (a.firstClearRewardQuantity = b.firstClearRewardQuantity);
      b.addDropItem && (a.addDropItem = b.addDropItem);
      b.addDropItemName && (a.addDropItemName = b.addDropItemName);
      b.addDropItemQuantity && (a.addDropItemQuantity = b.addDropItemQuantity);
      a.rewardCodeArr = b.list;
      a.rewardNameArr = b.nameList;
      a.rewardQuantityArr = b.quantityList;
      return a
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "pieceList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "titleList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
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
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      var b = a.conditionType;
      a = a.questBattleId;
      c.globalMenuView && c.globalMenuView.removeView();
      f.endQuest();
      f.setWebView(!0);
      c.questNativeResponse && (c.responseSetStorage(c.questNativeResponse), nativeJson = c.questNativeResponse);
      c.supportUserList = null;
      c.questNativeResponse = null;
      c.questBattleModel = null;
      c.mainChapterId = !1;
      c.mainPointId = !1;
      b && (k = b);
      a && (g = a);
      h.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      n = h.getPageJson();
      p = u.getModel(
      {
        pageJson: n
      });
      c.secondPartLastInfo.questModelCreate = y;
      x(
      {
        model: p
      })
    },
    remove: function(a)
    {
      a()
    }
  }
});
