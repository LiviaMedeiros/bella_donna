define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(g, h, a, e, b)
{
  var c = function()
  {
    var d = !1;
    a.EventWitchMemoriaExchangeAnimePrm && a.EventWitchMemoriaExchangeAnimePrm.rewardPieceId && a.EventWitchMemoriaExchangeAnimePrm.storyId && (d = !0);
    d || (a.historyArr = ["MyPage", "EventWitchTopPage", "EventWitchExchangePage"], location.href = "#/EventWitchExchangePage");
    var c = a.EventWitchMemoriaExchangeAnimePrm.rewardPieceId,
      f = a.EventWitchMemoriaExchangeAnimePrm.storyId;
    $("#commandDiv").off();
    $("#commandDiv").on("nativeCallback", function(d, c)
    {
      $("#commandDiv").off();
      b.deleteEventWitchExchangeAnime();
      b.stopBgm();
      b.setWebView(!0);
      setTimeout(function()
      {
        a.playStory(
        {
          cmd: b,
          ajaxControl: e,
          storyId: f,
          isForcePlay: !0,
          callback: function()
          {
            a.EventWitchMemoriaExchangeAnimePrm = null;
            a.historyArr = ["MyPage", "EventWitchTopPage", "EventWitchExchangePage"];
            location.href = "#/EventWitchExchangePage"
          }
        })
      }, 10)
    });
    $(a.ready.target).off();
    $(a.ready.target).on("webkitAnimationEnd", function()
    {
      b.setWebView(!1);
      b.stopBgm();
      setTimeout(function()
      {
        b.pushEventWitchExchangeAnime(
        {
          memoriaId: c
        });
        b.startBgm("bgm02_anime07");
        window.isBrowser && $("#commandDiv").trigger("nativeCallback")
      }, 10)
    });
    a.addClass(a.ready.target, "preNativeFadeIn")
  };
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
      id: "pieceList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
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
      id: "userLive2dList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      c(
      {})
    },
    remove: function(a)
    {
      a()
    }
  }
});
