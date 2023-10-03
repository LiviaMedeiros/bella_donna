define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(b, c, d, a, e)
{
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userLive2dList"
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
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    }],
    fetch: function()
    {
      a.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      location.href = "#/RegularEventArenaRankMatchTop"
    },
    remove: function(a)
    {
      a()
    }
  }
});
