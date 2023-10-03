define("underscore backbone backboneCommon ajaxControl command js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(f, g, d, c, h, b)
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
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    }],
    fetch: function(a)
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      var a = c.getPageJson(),
        e = b.getSingleRaidQuestInfo(
        {
          pageJson: a
        });
      d.historyArr = ["MyPage"];
      b.isClearCommonStory(
      {
        pageJson: a
      }) ? b.isClearSingleRaid(
      {
        singleRaidQuestList: e
      }) ? location.href = "#/EventPuellaRaidTop" : location.href = "#/PuellaHistoriaSingleRaid" : location.href = "#/PuellaHistoriaTop"
    },
    remove: function(a)
    {
      a()
    }
  }
});
