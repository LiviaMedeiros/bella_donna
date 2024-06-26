define("underscore backbone backboneCommon ajaxControl command text!css/arena/ArenaCommon.css js/view/arena/ArenaRewardView".split(" "), function(g, h, a, c, d, e, f)
{
  var b;
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
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      d.changeBg("web_0014.ExportJson")
    },
    fetch: function()
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(e);
      b = new f
    },
    remove: function(a)
    {
      b && b.removeHandler();
      a()
    }
  }
});
