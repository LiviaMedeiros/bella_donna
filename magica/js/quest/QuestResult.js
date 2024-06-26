define("underscore backbone backboneCommon ajaxControl command text!css/quest/QuestResult.css js/view/quest/QuestResultView".split(" "), function(m, n, a, g, c, h, k)
{
  var d, e, l = function()
    {
      a.androidKeyStop = !0;
      a.strSupportPickUpUserIds = "";
      a.supportUserList = null;
      e = a.questNativeResponse;
      a.setStyle(h);
      var b = g.getPageJson();
      d = new k(
      {
        model: e,
        pageJson: b
      });
      c.setWebView()
    },
    f = null;
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
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
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
      id: "userItemList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userTitleList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
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
      id: "userQuestAdventureList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      c.startBgm("bgm03_movie37", !0)
    },
    fetch: function(b)
    {
      f = b || null;
      b = {};
      a.questNativeResponse && a.questNativeResponse.userQuestBattleResultList[0] && a.questNativeResponse.userQuestBattleResultList[0].questBattleId && (b.questBattleId = String(a.questNativeResponse.userQuestBattleResultList[0].questBattleId));
      a.questHelperId && (b.strUserId = a.questHelperId);
      g.pageModelGet(this.needModelIdObj, null, b)
    },
    init: function()
    {
      if (f)
        if (a.tutorialId = f, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId), a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          c.nativeReload("#/TopPage");
          return
        } $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      l()
    },
    remove: function(b)
    {
      $("#commandDiv").off();
      a.androidKeyStop = !1;
      e = a.questNativeResponse = null;
      d && d.trigger("remove");
      b()
    }
  }
});
