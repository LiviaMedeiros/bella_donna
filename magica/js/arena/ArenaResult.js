define("underscore backbone backboneCommon ajaxControl command text!css/arena/ArenaResult.css js/view/arena/ArenaResultView".split(" "), function(h, k, a, d, e, f, g)
{
  var b, c;
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
      id: "userDoppelList"
    },
    {
      id: "userDeckList"
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
      id: "userFollowList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userArenaBattle"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      a.oldModel = {};
      a.storage.userArenaBattle && (a.oldModel.userArenaBattle = a.storage.userArenaBattle.toJSON());
      var b = {
        strUserId: a.battleEnemy
      };
      a.battleEnemy = null;
      d.pageModelGet(this.needModelIdObj, null, b)
    },
    init: function()
    {
      a.ready.hide();
      e.startBgm("bgm03_story15");
      a.androidKeyStop = !0;
      c = a.questNativeResponse;
      a.setStyle(f);
      b = new g(c)
    },
    remove: function(c)
    {
      a.questNativeResponse = null;
      a.androidKeyStop = !1;
      a.oldModel = null;
      b && b.remove();
      c()
    }
  }
});
