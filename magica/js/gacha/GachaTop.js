define("underscore backbone backboneCommon ajaxControl command text!css/gacha/GachaTop.css js/view/gacha/GachaTopView2".split(" "), function(h, k, a, e, c, f, g)
{
  var d = null,
    b;
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
      id: "userLive2dList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "giftList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceArchiveList"
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
      id: "userPatrolList"
    },
    {
      id: "userGachaKindList",
      refresh: !0
    }],
    startCommand: function()
    {
      c.changeBg("web_0002.jpg");
      c.startBgm(a.settingBgm)
    },
    removeCommand: function()
    {
      c.hideMiniChara()
    },
    fetch: function(b, c)
    {
      d = c || null;
      a.gachaDisp = b ? b : null;
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      if (d)
        if (a.tutorialId = d, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId),
          a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          c.nativeReload("#/TopPage");
          return
        } a.setStyle(f);
      b = new g
    },
    remove: function(a)
    {
      b && (b.trigger("removeView"), b.off(), b.remove(), b = null);
      a()
    }
  }
});
