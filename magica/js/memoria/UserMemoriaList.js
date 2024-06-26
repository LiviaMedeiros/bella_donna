define("underscore backbone backboneCommon ajaxControl text!css/memoria/UserMemoriaList.css js/view/memoria/UserMemoriaListView command cardUtil".split(" "), function(l, m, a, f, e, g, h, k)
{
  var d, b, c;
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
      b || h.changeBg("web_0020.ExportJson")
    },
    fetch: function(d, e)
    {
      c = d || null;
      b = a.equipInfo || null;
      f.pageModelGet(this.needModelIdObj)
    },
    sendMode: function()
    {
      return c
    },
    init: function()
    {
      "equip" != c || b ? "formationEquip" != c || b ? (a.setStyle(e), k.createCardList(), d = new g(
      {
        equipInfo: b,
        mode: c
      })) : location.href = "#/DeckFormation" : location.href = "#/CharaListEquip"
    },
    remove: function(e)
    {
      a.cardCollection = null;
      a.currentModel = null;
      a.currentDOM = null;
      a.sellingFlg = null;
      a.selectAbility = null;
      c = b = a.equipInfo = null;
      a.popModel && (a.popModel = null);
      d && d.trigger("remove");
      e()
    }
  }
});
