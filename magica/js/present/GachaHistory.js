define("underscore backbone backboneCommon ajaxControl command text!css/present/GachaHistory.css js/view/present/GachaHistoryPageView".split(" "), function(h, k, c, d, e, f, g)
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
      a.gachaListUpdate(b)
    },
    remove: function(b)
    {
      a && a.removeView();
      b()
    }
  }
});
