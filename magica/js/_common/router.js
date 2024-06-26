define("underscore backbone backboneCommon ajaxControl command routes eRoutes bRoutes".split(" "), function(f, k, a, e, d, l, m, n)
{
  $(e).on("complete", function(b, c)
  {
    a.loading.hide();
    a.imgData = {};
    a.settingThemeInit();
    a.prevPageObj ? (a.prevPageObj.removeCommand && a.prevPageObj.removeCommand(), a.prevPageObj.remove(function()
    {
      a.interrupt ? a.interrupt = null : (h(), a.pageObj.init());
      setTimeout(function()
      {
        a.androidKeyForceStop = !1
      }, 500)
    })) : (a.interrupt ? a.interrupt = null : (h(), a.pageObj.init()), setTimeout(function()
    {
      a.androidKeyForceStop = !1
    }, 500))
  });
  var h = function()
    {
      "TopPage" !== a.location && "NewVersionRecommend" !== a.location && (a.pageObj.startCommand ? a.pageObj.startCommand() : ("QuestResult" !== a.location && "ArenaResult" !== a.location && d.changeBg(a.background), d.startBgm(a.bgm)))
    },
    p = function()
    {
      var b = a.location,
        c = a.historyArr[a.historyArr.length - 1] ? a.historyArr[a.historyArr.length - 1].split("/")[0] : "";
      b == c && (c = a.locationPrev ? a.locationPrev : ""); - 1 !== b.indexOf("CharaList") && -1 !== c.indexOf("CharaList") || a.ready.show()
    },
    q = function()
    {
      var b = a.location,
        c = a.historyArr[a.historyArr.length - 1] ? a.historyArr[a.historyArr.length - 1].split("/")[0] : "";
      if (-1 === b.indexOf("CharaList") || -1 === c.indexOf("CharaList")) a.hasModel("userCardListEx") && a.storage.userCardListEx.reset(), delete a.storage.userCardListEx
    };
  $(a.ready.target).on("webkitAnimationEnd", function(b)
  {
    "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
  });
  $(a.ready.content).on("webkitAnimationEnd", function(b)
  {
    "readyFadeIn" == b.originalEvent.animationName && (a.tapBlock(!1), a.scrollRefresh(null, null, null, !0))
  });
  $("#androidBackKey").on("androidBackKey", function(b, c)
  {
    if (!(a.isTouching() || a.androidKeyStop || a.androidKeyForceStop || a.tutorialId))
      if (a.androidKeyForceStop = !0, a.androidResetHandler(), a.g_popup_instance) a.g_popup_instance.popupModel.toJSON().canClose && (d.startSe(1003), a.g_popup_instance.popupView.close()), setTimeout(function()
      {
        a.androidKeyForceStop = !1
      }, 500);
      else if (a.detailPopup) a.detailPopup.removeHandler(), a.detailPopup = null, setTimeout(function()
    {
      a.androidKeyForceStop = !1
    }, 500);
    else if (a.detailView) d.startSe(1003),
      a.detailView.detailClose(), a.detailView = null, setTimeout(function()
      {
        a.androidKeyForceStop = !1
      }, 500);
    else if (a.arenaConfirmView) a.arenaConfirmView.removeView(), a.arenaConfirmView = null, setTimeout(function()
    {
      a.androidKeyForceStop = !1
    }, 500);
    else if ("" !== location.hash && "#/MyPage" !== location.hash && "#/TopPage" !== location.hash && "#/NewVersionRecommend" !== location.hash) a.doc.getElementById("sideMenu") && a.doc.getElementById("sideMenu").classList.contains("anim") ? (d.startSe(1002), b = a.doc.getElementById("sideMenu"), a.addClass(b, "close"), a.removeClass(b, "anim"), a.addClass(a.doc.getElementById("sideMenuBg"), "close"), a.removeClass(a.doc.getElementById("sideMenuBg"), "anim")) : (d.startSe(1003), a.backLinkHandler()), setTimeout(function()
    {
      a.androidKeyForceStop = !1
    }, 500);
    else if ("" === location.hash || "#/MyPage" === location.hash || "#/TopPage" === location.hash || "#/NewVersionRecommend" === location.hash) setTimeout(function()
    {
      a.androidKeyForceStop = !1
    }, 500), new a.PopupClass(
    {
      title: "終了確認",
      content: "アプリを終了しますか？",
      closeBtnText: "キャンセル",
      decideBtnText: "終了"
    }), a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, function()
    {
      d.closeGame()
    })
  });
  $("#questRetire").on("questRetire", function(b, c)
  {
    a.responseSetStorage(c);
    a.resumeData && (a.resumeData = null);
    a.arenaBattleType ? (a.historyArr = ["MyPage", "ArenaTop", "FREE_RANK" === a.arenaBattleType ? "ArenaFreeRank" : "ArenaRanking"], a.arenaBattleType = null, a.battleEnemy = null) : (a.responseSetStorage(a.questNativeResponse), a.questBattleModel && !a.questBattleModel.raidId && "GROUPBATTLE" !== a.questBattleModel.questType && (a.questNativeResponse = null), a.questHelperId = null, a.historyArr = ["MyPage"]);
    a.strSupportPickUpUserIds = "";
    a.supportUserList = null;
    if (void 0 !== a.noticeAp && !0 === a.noticeAp)
    {
      if (!a.storage.userStatusList) return;
      b = a.storage.userStatusList.findWhere(
      {
        statusId: "ACP"
      }).toJSON();
      c = a.storage.userStatusList.findWhere(
      {
        statusId: "MAX_ACP"
      }).toJSON();
      b = a.getApRemainTime(b, c, e.getPageJson().currentTime);
      d.noticeApFullSet(b)
    }
    else void 0 === a.noticeAp && ($("#configCallback").on("configCallback", function(b, c)
    {
      $("#configCallback").off();
      a.noticeAp = 1 === c.ap ? !0 : !1;
      a.noticeAp && (b = a.storage.userStatusList.findWhere(
      {
        statusId: "ACP"
      }).toJSON(), c = a.storage.userStatusList.findWhere(
      {
        statusId: "MAX_ACP"
      }).toJSON(), b = a.getApRemainTime(b, c, e.getPageJson().currentTime), d.noticeApFullSet(b))
    }), d.noticeApConfig("configCallback"));
    d.setWebView(!0)
  });
  $("#suspendAwake").on("suspendAwake", function(b, c)
  {
    a.globalMenuView && a.globalMenuView.awakeSuspend(c)
  });
  var r = function(a)
  {
    var b = !0;
    f.each("Animation Result Stub LoginBonus QuestBackground MemoriaEquip MemoriaSetEquip EventTrainingCharaSelect CharaEnhancementTree".split(" "), function(c)
    {
      -1 !== a[0].indexOf(c) && (b = !1)
    });
    return b
  };
  return k.Router.extend(
  {
    routes: function()
    {
      var a = {},
        c = {
          "": "TopPage"
        };
      Object.assign(a, l, m);
      window.isDebug && Object.assign(a, n);
      f.each(a, function(a, b)
      {
        var d = a.url;
        a = a.pageInit;
        c[d] || (c[d] = b, this.setRouteCallback(b, a))
      }, this);
      return c
    },
    setRouteCallback: function(a, c)
    {
      this.on("route:" + a, function()
      {
        c.apply(this, arguments)
      })
    },
    before: function(b)
    {
      a.androidKeyForceStop = !0;
      a.location = "" === b ? "TopPage" : b.split("/")[0];
      p();
      a.popupTimerObj && clearTimeout(a.popupTimerObj);
      a.detailView && a.detailView.detailClose();
      q();
      var c = r(arguments);
      if ("MyPage" === b) a.historyArr = ["MyPage"];
      else if (c)
      {
        c = location.hash.split("/");
        if (2 >= c.length) - 1 < a.historyArr.indexOf(arguments[0]) && a.historyArr.splice(a.historyArr.indexOf(arguments[0]), 1);
        else
        {
          var d = "";
          f.each(c, function(a)
          {
            "#" !== a && (d = "" == d ? d + a : d + ("/" + a))
          }); - 1 < a.historyArr.indexOf(d) && a.historyArr.splice(a.historyArr.indexOf(d), 1)
        }
        if (a.historyArr[a.historyArr.length - 1] !== location.hash.split("/")[1])
          if (2 >= c.length) a.historyArr.push(arguments[0]);
          else
          {
            var g = "";
            f.each(c, function(a)
            {
              "#" !== a && (g = "" == g ? g + a : g + ("/" + a))
            });
            a.historyArr.push(g)
          }
      }
      "DeckFormation" !== a.location && "EventAccomplishDeck" !== a.location && "EventAccomplishRecovery" !== a.location && "MemoriaList" !== a.location && "MemoriaEquip" !== a.location && "MemoriaSetEquip" !== a.location && (a.holdDeck = null);
      var e = !1;
      f.each("CharaListTop CharaListCustomize CharaListComposeMagia MemoriaTop GachaTop MissionTop ShopTop FormationTop MainQuest ArenaTop EventDungeonMap".split(" "), function(b)
      {
        a.location == b && (e = !0)
      });
      e && (a.charaListCustomizeSelectId = null, a.charaListComposeMagiaSelectId = null, a.charaQuestBeforeType = null, a.charaQuestBeforeCharaId = null);
      a.g_popup_instance && a.g_popup_instance.remove();
      a.detailPopup && a.detailPopup.removeHandler();
      $("#commandDiv").off();
      a.myScroll && a.scrollBarControl("destroy");
      if (a.scrollArr || a.scrollArrX) a.scrollDestroy(), a.forceScrollFlag = !1;
      a.pageObj && (a.prevPageObj = a.pageObj)
    }
  })
});
