define("underscore backbone backboneCommon ajaxControl text!css/memoria/UserMemoriaList.css js/view/memoria/PieceArchiveView command cardUtil".split(" "), function(l, m, a, f, c, g, h, k)
{
  var b, d, e;
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "userStatusList"
    },
    {
      id: "gameUser"
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
      id: "userLimitedChallengeList"
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
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceStorageList"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      d || h.changeBg("web_0020.ExportJson")
    },
    fetch: function(b, c)
    {
      e = b || null;
      d = a.equipInfo || null;
      f.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(c);
      k.createCardList();
      b = new g(
      {
        equipInfo: d,
        mode: e
      })
    },
    remove: function(c)
    {
      a.cardCollection = null;
      a.currentModel = null;
      a.currentDOM = null;
      a.sellingFlg = null;
      a.selectAbility = null;
      e = d = a.equipInfo = null;
      a.popModel && (a.popModel = null);
      b && b.trigger("remove");
      c()
    }
  }
});
