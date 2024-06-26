define("underscore backbone backboneCommon ajaxControl command text!css/arena/ArenaCommon.css js/view/arena/ArenaSimulateView".split(" "), function(h, k, c, d, e, f, g)
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
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userDeckList"
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
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      e.changeBg("web_0014.ExportJson")
    },
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setStyle(f);
      a = new g
    },
    awakeSuspend: function(b)
    {
      a.infoView.awakeSuspend(b);
      a.awakeSuspend(b)
    },
    remove: function(b)
    {
      a && a.removeHandler();
      b()
    }
  }
});
