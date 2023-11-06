define("underscore backbone backboneCommon command ajaxControl QuestUtil".split(" "), function(f, q, g, h, n, p)
{
  var k = {
    getScene0QuestInfo: function(a)
    {
      var c = a.targetNum,
        b = a.pageJson,
        d = a.type,
        e = "SCENE0_FILM";
      d && ("battle" == d ? e = "SCENE0_CHALLENGEBATTLE" : "side" == d && (e = "SCENE0_SIDESTORY"));
      var l = {
        sectionInfoList: [],
        questInfoList: []
      };
      f.each(b.userSectionList, function(b, a, d)
      {
        a = b.section;
        a.viewParameterMap && a.viewParameterMap[e + "_NUM"] && Number(a.viewParameterMap[e + "_NUM"]) == c && (b.isLastSection = !1, a.viewParameterMap[e + "_LAST_SECTION"] && (d = Number(a.viewParameterMap[e + "_LAST_SECTION"]), 1 == d && (b.isLastSection = !0)), b.isNewestSection = !1, a.viewParameterMap[e + "_NEWEST_SECTION"] && (d = Number(a.viewParameterMap[e + "_NEWEST_SECTION"]), 1 == d && (b.isNewestSection = !0)), l.sectionInfoList.push(b))
      });
      l.sectionInfoList.sort(function(b, a)
      {
        return b.sectionId - a.sectionId
      });
      var m = !0,
        h = [],
        k = [];
      f.each(l.sectionInfoList, function(a, d, e)
      {
        h[d] = [];
        f.each(b.userQuestBattleList, function(b, e, f)
        {
          a.sectionId == b.questBattle.sectionId && (b.targetNum = c, a.section && a.section.secret && (b.secret = a.section.secret), !b.questBattle.ap && a.section.ap && (b.questBattle.ap = a.section.ap), !b.questBattle.difficulty && a.section.difficulty && (b.questBattle.difficulty = a.section.difficulty), h[d].push(b))
        })
      });
      f.each(h, function(b, a, c)
      {
        b.sort(function(b, a)
        {
          return b.questBattleId - a.questBattleId
        })
      });
      f.each(h, function(b, a, c)
      {
        f.each(b, function(b, a, c)
        {
          k.push(b)
        })
      });
      f.each(k, function(b, a, c)
      {
        if (b.cleared || m) l.questInfoList.push(b), b.cleared || "side" == d || "battle" == d || (m = !1)
      });
      f.each(l.sectionInfoList, function(a, c, d)
      {
        f.each(l.questInfoList, function(c, d, e)
        {
          c.questBattle.sectionId == a.sectionId && g.inputOverwriteApInfo(
          {
            campaignList: b.campaignList,
            sectionModel: a,
            questBattleModel: c
          })
        })
      });
      return l
    },
    getMainItemInfo: function(a)
    {
      var c = {
        type: "main",
        quantity: 0,
        itemId: "SCENEZERO_PLAY_TICKET",
        name: "リコールランプ"
      };
      f.each(a.pageJson.userItemList, function(b, a, e)
      {
        b.itemId == c.itemId && (c.quantity = b.quantity)
      });
      return c
    },
    getSideItemInfo: function(a)
    {
      var c = {
        type: "side",
        quantity: 0,
        quantityClass: "c_red",
        itemId: "SCENEZERO_SIDE_TICKET",
        name: "ドアプライズフィルム"
      };
      f.each(a.pageJson.userItemList, function(b, a, e)
      {
        b.itemId == c.itemId && (c.quantity = b.quantity)
      });
      0 == c.quantity && (c.quantityClass = "");
      return c
    },
    getIsScene0Info: function(a)
    {
      var c = a.section;
      a = {
        filmNum: !1,
        challengeBattleNum: !1,
        sideStoryNum: !1,
        isScene0: !1
      };
      c && c.section && (c = c.section, c.viewParameterMap && c.viewParameterMap.SCENE0_FILM_NUM && (a.filmNum = Number(c.viewParameterMap.SCENE0_FILM_NUM), a.isScene0 = !0), c.viewParameterMap && c.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM && (a.challengeBattleNum = Number(c.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM), a.isScene0 = !0), c.viewParameterMap && c.viewParameterMap.SCENE0_SIDESTORY_NUM && (a.sideStoryNum = Number(c.viewParameterMap.SCENE0_SIDESTORY_NUM), a.isScene0 = !0));
      return a
    },
    openStoryPopup: function(a)
    {
      var c = a.needItemNum,
        b = a.itemInfo,
        d = a.noPopup,
        e = a.callback;
      if (b.quantity >= c)
        if (d) e();
        else var f = new g.PopupClass(
        {
          title: "ストーリー再生",
          content: '<span class="c_pink">' + b.name + '</span>を<span class="c_pink">' + c + "個</span>消費して<br>ストーリーを再生しますか？",
          exClass: "scene0StoryPopup",
          closeBtnText: "閉じる",
          decideBtnText: "再生する",
          decideBtnEvent: function()
          {
            f.remove();
            e()
          },
          popupType: "typeC"
        }, null, function()
        {
          $(".scene0StoryPopup .popupBtnArea .decideBtn").removeClass("b_pink");
          $(".scene0StoryPopup .popupBtnArea .decideBtn").addClass("b_scene0_l")
        }, function()
        {
          h.updateScene0StorySelectObject(
          {})
        });
      else new g.PopupClass(
      {
        title: "アイテム不足",
        content: "ストーリー開放に必要なアイテムが足りません。",
        exClass: "scene0StoryPopup",
        closeBtnText: "閉じる",
        popupType: "typeC"
      }, null, null, function()
      {
        h.updateScene0StorySelectObject(
        {})
      })
    },
    getIsScene0Film1Clear: function(a)
    {
      a = k.getScene0QuestInfo(
      {
        targetNum: 1,
        pageJson:
        {
          userSectionList: a.userSectionList,
          userQuestBattleList: []
        }
      }).sectionInfoList;
      var c = !1;
      f.each(a, function(b, a, e)
      {
        c = b.cleared
      });
      return c
    },
    startQuest: function(a)
    {
      var c = a.questBattleModel,
        b = a.sectionModel,
        d = a.userQuestAdventureList;
      g.questBattleModel = k.getCommonQuestBattleModel(
      {
        questBattleModel: c,
        sectionModel: b,
        userQuestAdventureList: d
      });
      k.isEnoughAP(
      {
        needAP: g.questBattleModel.ap
      }) ? location.href = "#/DeckFormation/scene0Challenge" : g.globalMenuView.apPopup(null, "APが不足しています", function()
      {
        k.startQuest(
        {
          questBattleModel: c,
          sectionModel: b,
          userQuestAdventureList: d
        })
      })
    },
    isEnoughAP: function(a)
    {
      a = a.needAP;
      var c = g.globalMenuView.getUserStatus().ACP,
        b = !1;
      a && c >= a && (b = !0);
      0 == a && (b = !0);
      return b
    },
    getDeckType: function()
    {
      return 120
    },
    getCommonQuestBattleModel: function(a)
    {
      var c = a.sectionModel,
        b = a.questBattleModel;
      a = a.userQuestAdventureList;
      b.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      b.chestColor = "bronze_close";
      b.questBattle.missionRewardCode && (b.missionRewardCode = g.itemSet(b.questBattle.missionRewardCode), b.chestColor = b.missionRewardCode.chestColor);
      "NONE" == b.questBattle.questBattleType && f.each([1, 2, 3], function(a, c, d)
      {
        b.questBattle["missionMaster" + a] = {
          description: ""
        }
      });
      var d = c.section;
      b.questType = d.questType;
      b.chapterNoForView = d.chapterNoForView;
      b.genericIndex = d.genericIndex;
      b.title = d.title;
      b.battleTitle = "BATTLE " + b.battleNo;
      b.userQuestAdventureList = a;
      d.secret && (b.secret = d.secret);
      b.ap = function()
      {
        var a = d.ap;
        b.questBattle.ap && (a = b.questBattle.ap);
        b.overwriteAp && (a = b.overwriteAp);
        b.campaignFreeAtNotClear && (a = 0);
        return a
      }();
      b.difficulty = d.difficulty ? d.difficulty : b.questBattle.difficulty;
      b.rewardCodeArr = [];
      c = p.dropItemJson(b);
      c.firstClearReward && (b.firstClearReward = c.firstClearReward);
      c.firstClearRewardName && (b.firstClearRewardName = c.firstClearRewardName);
      c.firstClearRewardQuantity && (b.firstClearRewardQuantity = c.firstClearRewardQuantity);
      c.addDropItem && (b.addDropItem = c.addDropItem);
      c.addDropItemName && (b.addDropItemName = c.addDropItemName);
      c.addDropItemQuantity && (b.addDropItemQuantity = c.addDropItemQuantity);
      b.rewardCodeArr = c.list;
      b.rewardNameArr = c.nameList;
      b.rewardQuantityArr = c.quantityList;
      return b
    },
    setDebugJson: function(a)
    {
      a = a.userSectionList;
      f.each(a, function(a, b, d)
      {
        f.each(["1", "2"], function(b, c, d)
        {
          a.section.viewParameterMap && a.section.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM == b && (a.section.viewParameterMap.SCENE0_FILM_NUM = b)
        })
      });
      return a
    },
    convertFilmNo: function(a)
    {
      var c = a.webFilmNo,
        b = a.nativeFilmNo,
        d = a.nativeVersionNo;
      a = a.getType;
      var e = {
          webFilmNo: c,
          nativeFilmNo: b,
          nativeVersionNo: d
        },
        g = {
          1:
          {
            filmNo: 1,
            version: 1
          },
          2:
          {
            filmNo: 2,
            version: 1
          },
          3:
          {
            filmNo: 3,
            version: 1
          },
          4:
          {
            filmNo: 4,
            version: 1
          },
          5:
          {
            filmNo: 5,
            version: 1
          },
          6:
          {
            filmNo: 6,
            version: 1
          },
          7:
          {
            filmNo: 7,
            version: 1
          },
          8:
          {
            filmNo: 8,
            version: 1
          },
          9:
          {
            filmNo: 9,
            version: 1
          },
          10:
          {
            filmNo: 10,
            version: 1
          },
          11:
          {
            filmNo: 11,
            version: 1
          },
          12:
          {
            filmNo: 12,
            version: 1
          }
        };
      "web" == a && f.each(g, function(a, c, f)
      {
        a.filmNo == b && a.version == d && (e.webFilmNo = c)
      });
      "native" == a && (e.nativeFilmNo = g[c].filmNo, e.nativeVersionNo = g[c].version);
      return e
    },
    playCardGetMvMabayu: function(a)
    {
      var c = a.callback,
        b = {};
      b.presentId = [a.presentId];
      n.ajaxPost(g.linkList.receivePresent, b, function(a)
      {
        g.responseSetStorage(a);
        a && a.gachaAnimation ? ($("#commandDiv").on("nativeCallback", function()
        {
          $("#commandDiv").off();
          h.setWebView(!0);
          g.androidKeyStop = !1;
          c()
        }), g.androidKeyStop = !0, h.stopBgm(), h.setWebView(!1), h.startPresentAnimation(
        {
          gachaAnimation: a.gachaAnimation
        }), window.isBrowser && nativeCallback()) : c()
      })
    }
  };
  return k
});
