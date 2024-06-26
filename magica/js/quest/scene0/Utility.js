define("underscore backbone backboneCommon command ajaxControl QuestUtil".split(" "), function(h, r, f, k, p, q)
{
  var l = {
    getScene0QuestInfo: function(a)
    {
      var c = a.targetNum,
        b = a.pageJson,
        d = a.type,
        e = "SCENE0_FILM";
      d && ("battle" == d ? e = "SCENE0_CHALLENGEBATTLE" : "side" == d && (e = "SCENE0_SIDESTORY"));
      var g = {
        sectionInfoList: [],
        questInfoList: []
      };
      h.each(b.userSectionList, function(b, a, d)
      {
        a = b.section;
        a.viewParameterMap && a.viewParameterMap[e + "_NUM"] && Number(a.viewParameterMap[e + "_NUM"]) == c && (b.isLastSection = !1, a.viewParameterMap[e + "_LAST_SECTION"] && (d = Number(a.viewParameterMap[e + "_LAST_SECTION"]), 1 == d && (b.isLastSection = !0)), b.isNewestSection = !1, a.viewParameterMap[e + "_NEWEST_SECTION"] && (d = Number(a.viewParameterMap[e + "_NEWEST_SECTION"]), 1 == d && (b.isNewestSection = !0)), g.sectionInfoList.push(b))
      });
      g.sectionInfoList.sort(function(b, c)
      {
        return b.sectionId - c.sectionId
      });
      var n = !0,
        m = [],
        k = [];
      h.each(g.sectionInfoList, function(a, d, e)
      {
        m[d] = [];
        h.each(b.userQuestBattleList, function(b, e, g)
        {
          a.sectionId == b.questBattle.sectionId && (b.targetNum = c, a.section && a.section.secret && (b.secret = a.section.secret), !b.questBattle.ap && a.section.ap && (b.questBattle.ap = a.section.ap), !b.questBattle.difficulty && a.section.difficulty && (b.questBattle.difficulty = a.section.difficulty), m[d].push(b))
        })
      });
      h.each(m, function(b, a, c)
      {
        b.sort(function(b, a)
        {
          return b.questBattleId - a.questBattleId
        })
      });
      h.each(m, function(b, a, c)
      {
        h.each(b, function(b, a, c)
        {
          k.push(b)
        })
      });
      h.each(k, function(b, a, c)
      {
        if (b.cleared || n) g.questInfoList.push(b), b.cleared || "side" == d || "battle" == d || (n = !1)
      });
      h.each(g.sectionInfoList, function(a, c, d)
      {
        h.each(g.questInfoList, function(c, d, e)
        {
          c.questBattle.sectionId == a.sectionId && f.inputOverwriteApInfo(
          {
            campaignList: b.campaignList,
            sectionModel: a,
            questBattleModel: c
          })
        })
      });
      return g
    },
    getMainItemInfo: function(a)
    {
      var c = {
        type: "main",
        quantity: 0,
        itemId: "SCENEZERO_PLAY_TICKET",
        name: "リコールランプ"
      };
      h.each(a.pageJson.userItemList, function(b, a, e)
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
      h.each(a.pageJson.userItemList, function(b, a, e)
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
        else var g = new f.PopupClass(
        {
          title: "ストーリー再生",
          content: '<span class="c_pink">' + b.name + '</span>を<span class="c_pink">' + c + "個</span>消費して<br>ストーリーを再生しますか？",
          exClass: "scene0StoryPopup",
          closeBtnText: "閉じる",
          decideBtnText: "再生する",
          decideBtnEvent: function()
          {
            g.remove();
            e()
          },
          popupType: "typeC"
        }, null, function()
        {
          $(".scene0StoryPopup .popupBtnArea .decideBtn").removeClass("b_pink");
          $(".scene0StoryPopup .popupBtnArea .decideBtn").addClass("b_scene0_l")
        }, function()
        {
          k.updateScene0StorySelectObject(
          {})
        });
      else new f.PopupClass(
      {
        title: "アイテム不足",
        content: "ストーリー開放に必要なアイテムが足りません。",
        exClass: "scene0StoryPopup",
        closeBtnText: "閉じる",
        popupType: "typeC"
      }, null, null, function()
      {
        k.updateScene0StorySelectObject(
        {})
      })
    },
    getIsScene0Film1Clear: function(a)
    {
      a = l.getScene0QuestInfo(
      {
        targetNum: 1,
        pageJson:
        {
          userSectionList: a.userSectionList,
          userQuestBattleList: []
        }
      }).sectionInfoList;
      var c = !1;
      h.each(a, function(b, a, e)
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
      f.questBattleModel = l.getCommonQuestBattleModel(
      {
        questBattleModel: c,
        sectionModel: b,
        userQuestAdventureList: d
      });
      l.isEnoughAP(
      {
        needAP: f.questBattleModel.ap
      }) ? location.href = "#/DeckFormation/scene0Challenge" : f.globalMenuView.apPopup(null, "APが不足しています", function()
      {
        l.startQuest(
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
      var c = f.globalMenuView.getUserStatus().ACP,
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
      b.questBattle.missionRewardCode && (b.missionRewardCode = f.itemSet(b.questBattle.missionRewardCode), b.chestColor = b.missionRewardCode.chestColor);
      "NONE" == b.questBattle.questBattleType && h.each([1, 2, 3], function(a, c, d)
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
      c = q.dropItemJson(b);
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
      h.each(a, function(a, b, d)
      {
        h.each(["1", "2"], function(b, c, d)
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
        d = a.nativeVersionNo,
        e = a.nativeDaySectionNo;
      e || (e = 0);
      a = a.getType;
      var g = {
          webFilmNo: c,
          nativeFilmNo: b,
          nativeVersionNo: d,
          nativeDaySectionNo: e
        },
        f = {
          1:
          {
            filmNo: 1,
            version: 1,
            daySection: 0,
            sortNo: 3
          },
          2:
          {
            filmNo: 2,
            version: 1,
            daySection: 0,
            sortNo: 4
          },
          3:
          {
            filmNo: 3,
            version: 1,
            daySection: 0,
            sortNo: 5
          },
          4:
          {
            filmNo: 4,
            version: 1,
            daySection: 0,
            sortNo: 6
          },
          5:
          {
            filmNo: 5,
            version: 1,
            daySection: 0,
            sortNo: 7
          },
          6:
          {
            filmNo: 6,
            version: 1,
            daySection: 0,
            sortNo: 8
          },
          7:
          {
            filmNo: 7,
            version: 1,
            daySection: 0,
            sortNo: 9
          },
          8:
          {
            filmNo: 8,
            version: 1,
            daySection: 0,
            sortNo: 10
          },
          9:
          {
            filmNo: 9,
            version: 1,
            daySection: 0,
            sortNo: 11
          },
          10:
          {
            filmNo: 10,
            version: 1,
            daySection: 0,
            sortNo: 12
          },
          11:
          {
            filmNo: 11,
            version: 1,
            daySection: 0,
            sortNo: 13
          },
          12:
          {
            filmNo: 12,
            version: 1,
            daySection: 0,
            sortNo: 14
          },
          13:
          {
            filmNo: 12,
            version: 1,
            daySection: 1,
            sortNo: 14
          },
          14:
          {
            filmNo: 12,
            version: 1,
            daySection: 2,
            sortNo: 14
          },
          15:
          {
            filmNo: 0,
            version: 1,
            daySection: 0,
            sortNo: 1
          },
          16:
          {
            filmNo: 1,
            version: 0,
            daySection: 0,
            sortNo: 2
          },
          17:
          {
            filmNo: 12,
            version: 1,
            daySection: 3,
            sortNo: 14
          },
          18:
          {
            filmNo: 13,
            version: 1,
            daySection: 0,
            sortNo: 15,
            storyEnd: !0
          }
        };
      "web" == a && h.each(f, function(a, c, f)
      {
        a.filmNo == b && a.version == d && a.daySection == e && (g.webFilmNo = c)
      });
      "native" == a && (g.nativeFilmNo = f[c].filmNo, g.nativeVersionNo = f[c].version, g.nativeDaySectionNo = f[c].daySection, g.nativeSortNo = f[c].sortNo, g.storyEnd = !1, f[c].storyEnd && (g.storyEnd = f[c].storyEnd));
      return g
    },
    playCardGetMvMabayu: function(a)
    {
      var c = a.callback,
        b = {};
      b.presentId = [a.presentId];
      p.ajaxPost(f.linkList.receivePresent, b, function(a)
      {
        f.responseSetStorage(a);
        a && a.gachaAnimation ? ($("#commandDiv").on("nativeCallback", function()
        {
          $("#commandDiv").off();
          k.setWebView(!0);
          f.androidKeyStop = !1;
          c()
        }), f.androidKeyStop = !0, k.stopBgm(), k.setWebView(!1), k.startPresentAnimation(
        {
          gachaAnimation: a.gachaAnimation
        }), window.isBrowser && nativeCallback()) : c()
      })
    }
  };
  return l
});
