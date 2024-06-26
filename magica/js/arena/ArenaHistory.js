define("underscore backbone backboneCommon ajaxControl command text!css/arena/ArenaCommon.css js/view/arena/ArenaHistoryView".split(" "), function(h, k, c, d, e, f, g)
{
  var a, b;
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
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      e.changeBg("web_0014.ExportJson")
    },
    fetch: function(a)
    {
      b = a;
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setStyle(f);
      a = new g(b)
    },
    remove: function(b)
    {
      a && a.removeHandler();
      b()
    }
  }
});
