define("underscore backbone backboneCommon ajaxControl command text!css/item/ItemListTop.css js/view/item/ItemListView".split(" "), function(h, k, c, d, e, f, g)
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
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList",
      refresh: !0
    },
    {
      id: "userGiftList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      e.changeBg("web_common.ExportJson")
    },
    fetch: function(a)
    {
      b = a;
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setStyle(f);
      a = new g(
      {
        firstView: b
      });
      b = null
    },
    remove: function(b)
    {
      a && a.removeHandler();
      b()
    }
  }
});
