define("underscore backbone backboneCommon ajaxControl command text!css/present/PresentList.css js/view/present/PresentListPageView".split(" "), function(h, k, c, d, e, f, g)
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setStyle(f);
      c.setGlobalView();
      d.getPageJson();
      a = new g
    },
    startCommand: function()
    {
      e.changeBg("web_common.ExportJson")
    },
    paging: function(b)
    {
      a.pageNum = b;
      a.presentListUpdate(b, null)
    },
    remove: function(b)
    {
      a && (a.presentList.trigger("removeView"), a.removeHandler());
      b()
    }
  }
});
