define("underscore backbone backboneCommon ajaxControl command QuestUtil text!css/quest/QuestCommon.css text!css/quest/SubQuest.css js/view/quest/SubQuestView".split(" "), function(n, p, d, e, b, g, h, k, l)
{
  var a, f, c, m = function()
  {
    d.setStyle(h + k);
    f = e.getPageJson();
    a = new l;
    c = setTimeout(function()
    {
      a && a.listScroll.refresh()
    }, 300);
    g.supportPickUp(f);
    d.searchQuestGiftId = null
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
      id: "userFollowList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      m()
    },
    startCommand: function()
    {
      var a = localStorage.getItem("SubQuestSelectPart");
      a && 1 !== (JSON.parse(a).selectPart | 0) ? 2 === JSON.parse(a).selectPart && b.changeBg("bg_adv_21075.jpg") : b.changeBg("web_0021.jpg");
      b.startBgm("bgm04_movie12")
    },
    removeCommand: function()
    {
      b.hideSubQuestBg()
    },
    remove: function(b)
    {
      c && clearTimeout(c);
      a && a.trigger("removeView");
      b()
    }
  }
});
