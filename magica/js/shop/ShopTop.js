define("underscore backbone backboneCommon ajaxControl command text!css/shop/ShopTop.css js/view/shop/ShopTopView cardUtil".split(" "), function(f, m, g, d, c, h, k, l)
{
  var b, e = null;
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      var a = d.getPageJson(),
        b = "web_0016.ExportJson";
      (a = f.findWhere(a.campaignList,
      {
        campaignType: "SHOP_VIEW"
      })) && a.parameterMap && a.parameterMap.BG_IMG && (b = a.parameterMap.BG_IMG + ".ExportJson");
      c.changeBg(b);
      c.startBgm("bgm03_story11")
    },
    fetch: function(a)
    {
      e = a ? a : null;
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      g.setStyle(h);
      l.createCardList();
      b = new k(
      {
        firstView: e
      })
    },
    removeCommand: function()
    {
      c.endL2d()
    },
    remove: function(a)
    {
      b && b.trigger("remove");
      a()
    }
  }
});
