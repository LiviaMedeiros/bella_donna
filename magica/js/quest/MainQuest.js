define("underscore backbone backboneCommon ajaxControl command QuestUtil text!css/quest/MainQuest.css text!css/quest/QuestCommon.css js/view/quest/MainQuestView".split(" "), function(p, q, a, f, c, h, k, l, m)
{
  var b, g, d, n = function()
    {
      a.setStyle(k + l);
      g = f.getPageJson();
      b = new m;
      d = setTimeout(function()
      {
        b && b.listScroll.refresh()
      }, 300);
      h.supportPickUp(g);
      c.getBaseData(a.getNativeObj());
      a.searchQuestGiftId = null
    },
    e = null;
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
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
      id: "userFollowList"
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
      id: "pieceList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      e = a || null;
      f.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setWebView(!0);
      if (e)
        if (a.tutorialId = e, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId), a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          c.nativeReload("#/TopPage");
          return
        } a.mainChapterId = !1;
      a.mainPointId = !1;
      n()
    },
    startCommand: function()
    {
      c.startBgm("bgm04_movie12")
    },
    remove: function(a)
    {
      d && clearTimeout(d);
      b && b.trigger("removeView");
      a()
    }
  }
});
