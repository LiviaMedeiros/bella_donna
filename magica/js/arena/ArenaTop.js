define("underscore backbone backboneCommon ajaxControl command text!css/arena/ArenaCommon.css js/view/arena/ArenaTopView".split(" "), function(h, k, c, e, d, f, g)
{
  var a;
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userArenaBattle"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      d.changeBg("web_0014.ExportJson");
      d.startBgm("bgm03_story15")
    },
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setStyle(f);
      a = new g;
      c.questBattleModel = null
    },
    awakeSuspend: function(b)
    {
      a.infoView.awakeSuspend(b)
    },
    remove: function(b)
    {
      a && a.removeHandler();
      b()
    }
  }
});
