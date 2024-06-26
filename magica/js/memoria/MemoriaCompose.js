define("underscore backbone backboneCommon ajaxControl text!css/memoria/MemoriaComposeTop.css js/view/memoria/MemoriaComposeTopView command".split(" "), function(h, k, a, e, f, g, b)
{
  var c;
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
      id: "userPieceList"
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
      id: "userPatrolList"
    }],
    fetch: function(d)
    {
      a.composeMode = d ? d : a.composeMode ? a.composeMode : "compose";
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(f);
      c = new g
    },
    startCommand: function()
    {
      b.changeBg("web_0020.ExportJson");
      b.startBgm(a.settingBgm)
    },
    remove: function(a)
    {
      c.trigger("remove");
      a()
    }
  }
});
