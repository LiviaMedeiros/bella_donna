define("underscore backbone backboneCommon ajaxControl command text!css/present/PresentHistory.css js/view/present/PresentHistoryPageView".split(" "), function(h, k, c, d, e, f, g)
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
      id: "userCharaList"
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
      a.presentListUpdate(b)
    },
    remove: function(b)
    {
      a && a.removeView();
      b()
    }
  }
});
