define(["jquery", "underscore", "backbone"], function(l, q, x)
{
  var a = {
    nativeDownload: !1,
    background: "web_common.ExportJson",
    bgm: "bgm01_anime07",
    settingBg: "web_0011.ExportJson",
    settingBgm: "bgm01_anime07",
    mainQuestMode: "NORMAL",
    settingThemeInit: function()
    {
      if (a.storage.gameUser)
      {
        var b = a.storage.gameUser.get("bgItemId"),
          c = a.storage.gameUser.get("bgItem");
        b && c ? (a.settingBg = c.backgroundImage, a.settingBgm = c.parameter ? c.parameter : "bgm01_anime07") : (a.settingBg = "web_0011.ExportJson", a.settingBgm = "bgm01_anime07")
      }
      else a.settingBg = "web_0011.ExportJson", a.settingBgm = "bgm01_anime07"
    },
    resourceUpdated: !1,
    tutorialId: null,
    tutorialUtil: null,
    historyArr: [],
    doc: document
  };
  a.content = l("#mainContent");
  a.location = "";
  a.imgData = {};
  a.EffectView = x.View.extend(
  {
    className: "commonEffect",
    events: function()
    {
      var a = {};
      a.webkitAnimationEnd = this.removeView;
      return a
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.el.style.top = this.model.y - 128 + "px";
      this.el.style.left = this.model.x - 128 + "px";
      return this
    },
    removeView: function()
    {
      this.remove()
    }
  });
  a.EffectView.prototype.template = q.template(l("#TapEffect").text());
  a.getNativeObj = function()
  {
    var b = {},
      c = a.doc.querySelectorAll("[data-nativeimgkey]") || [],
      d = a.doc.querySelectorAll("[data-nativebgkey]") || [];
    q.each(c, function(c)
    {
      var d = c.dataset.nativeimgkey;
      a.imgData[d] || "" === d || (b[d] = c.dataset.src)
    });
    q.each(d, function(c)
    {
      var d = c.dataset.nativebgkey;
      a.imgData[d] || "" === d || (b[d] = c.dataset.src)
    });
    return b
  };
  a.periodCheck = function(a, c)
  {
    if (!a || !c) return !1;
    a = a.replace(/-/g, "/");
    c = c.replace(/-/g, "/");
    c = new Date(c);
    a = (new Date(a)).getTime();
    return c.getTime() >= a ? !1 : "end"
  };
  a.getClientTime = function()
  {
    var a = new Date;
    return [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("/") + " " + [("0" + a.getHours()).slice(-2), ("0" + a.getMinutes()).slice(-2), ("0" + a.getSeconds()).slice(-2)].join(":")
  };
  a.getTimeText = function(a, c)
  {
    a = new Date(a);
    return c ? a.getMonth() + 1 + "月" + a.getDate() + "日 " + a.getHours() + ":" + ("0" + a.getMinutes()).slice(-2) : a.getMonth() + 1 + "月" + a.getDate() + "日 " + a.getHours() + "時" + ("0" + a.getMinutes()).slice(-2) + "分"
  };
  a.getDateShortening = function(a)
  {
    if (!a.date) return !1;
    var b = {};
    a = new Date(a.date);
    b.yobi = "日月火水木金土".split("")[a.getDay()];
    b.yr = a.getFullYear();
    b.mo = ("" + (a.getMonth() + 1)).slice(-2);
    b.da = ("" + a.getDate()).slice(-2);
    b.ho = ("0" + a.getHours()).slice(-2);
    b.mi = ("0" + a.getMinutes()).slice(-2);
    b.se = ("0" + a.getSeconds()).slice(-2);
    return b
  };
  a.getAddDate = function(a)
  {
    if (!a.date) return !1;
    var b = a.amount,
      d = a.type;
    a = new Date(a.date);
    "year" == d ? a.setFullYear(a.getFullYear() + b) : "month" == d ? a.setMonth(a.getMonth() + b) : "date" == d ? a.setDate(a.getDate() + b) : "hours" == d ? a.setHours(a.getHours() + b) : "minutes" == d ? a.setMinutes(a.getMinutes() + b) : "seconds" == d && a.setSeconds(a.getSeconds() + b);
    return a.toLocaleString("ja-JP",
    {
      timeZone: "Asia/Tokyo"
    })
  };
  a.getIsElapsedTargetTime = function(a)
  {
    var b = a.pageAccessServerTime,
      d = a.targetTime;
    a = new Date(a.pageAccessLocalTime);
    a = (new Date).getTime() - a.getTime();
    b = (new Date(b)).getTime() + a;
    d = (new Date(d)).getTime();
    a = !1;
    b >= d && (a = !0);
    return a
  };
  a.getStatusTargetTermInCurrentTime = function(a)
  {
    var b = new Date(a.endAt),
      d = new Date(a.currentTime),
      e = !1;
    new Date(a.startAt) <= d && d < b && (e = !0);
    return e
  };
  a.countDownTimerManager = function(a)
  {
    var b = a.callback,
      d = new Date(a.endTime),
      e = new Date(a.currentTime),
      g = a.setSelector,
      k = !0;
    void 0 != a.isDispH && (k = a.isDispH);
    var h = !1;
    void 0 != a.isOnlyS && (h = a.isOnlyS);
    var f, m = 0,
      n = "",
      w = d - e - 1E3 * m,
      C = function()
      {
        w = d - e - 1E3 * m;
        if (0 > w)
        {
          var a = "";
          k && (a = "00:");
          var c = "00:00";
          h && (a = "", c = "00");
          l(g).html(a + c);
          clearInterval(f);
          b()
        }
        else
        {
          var c = Math.floor(w / 1E3),
            C = Math.floor(c / 60),
            u = Math.floor(C / 60),
            C = C % 60,
            c = String(c % 60 + 100).substring(1, 3),
            C = String(C + 100).substring(1, 3),
            u = String(u + 100).substring(1, 3),
            a = "";
          k && (a = u + ":");
          n = a + C + ":" + c;
          h && (n = c);
          l(g).html(n);
          m += 1
        }
      };
    return {
      start: function()
      {
        C();
        0 <= w && (f = setInterval(C, 1E3))
      },
      getString: function()
      {
        return n
      },
      stop: function()
      {
        n = "";
        clearInterval(f)
      }
    }
  };
  a.live2dDetail = function(a)
  {
    var b = {};
    if (a)
    {
      if (a.live2dDetail)
      {
        var d = a.live2dDetail.split("");
        b.motionId = Number(d[0] + d[1]);
        b.faceId = String(d[2] + d[3] + d[4]);
        8 == a.live2dDetail.split("").length ? (b.cheekId = Number(d[5] + d[6]), b.tearId = Number(d[7])) : (b.cheekId = Number(d[5]), b.tearId = Number(d[6]))
      }
      else b = {};
      b.voice = "vo_char_" + a.charaNo + "_" + a.messageId;
      return b
    }
  };
  a.sfml = JSON.parse(localStorage.getItem("SortFilterMemoryList")) ||
  {};
  a.sfm = function()
  {
    localStorage.setItem("SortFilterMemoryList", JSON.stringify(a.sfml));
    a.sfml = JSON.parse(localStorage.getItem("SortFilterMemoryList"))
  };
  a.miniCharaStandPose = localStorage.getItem("miniCharaStandPose") || "wait";
  a.questBattleModel = null;
  a.questSupportModel = null;
  a.addBackHandler = function(b)
  {
    if (b && a.doc.getElementById("globalBackBtn"))
    {
      a.eventBackHandler = !0;
      var c = a.doc.getElementById("globalBackBtn");
      c.setAttribute("data-noLink", "true");
      l(c).off(a.cgti);
      l(c).on(a.cgti, b)
    }
  };
  a.removeBackHandler = function()
  {
    a.eventBackHandler = !1;
    if (a.doc.getElementById("globalBackBtn"))
    {
      var b = a.doc.getElementById("globalBackBtn");
      b.setAttribute("data-noLink", "")
    }
    l(b).off(a.cgti)
  };
  var M = {
    GachaTop: ["navi_011", "navi_012_b"],
    CharaListTop: ["navi_021_c"],
    CharaListCustomize: ["navi_031"],
    CharaListComposeMagia: ["navi_041"],
    CharaListEquip: ["navi_051_a", "navi_052_a"],
    MemoriaTop: ["navi_061"],
    ArenaTop: ["navi_071_b"],
    FormationSupport: ["navi_081_b"],
    FormationTop: ["navi_091_a", "navi_092_a", "navi_093", "navi_094_a"],
    SubQuest: ["navi_101"],
    MemoriaSetList: ["navi_111"],
    MemoriaSetEquip: ["navi_121"],
    CharaQuest: ["navi_131", "navi_132"],
    CharaEnhancementTree: ["navi_141"],
    CharaListComposeAttribute: ["navi_151"]
  };
  a.firstNaviCheck = function(b)
  {
    b && b.firstNavi && require(["js/view/tutorial/TutorialPopupView"], function(b)
    {
      var c, e = M[a.location];
      e && new a.PopupClass(
      {
        popupType: "tutorial"
      }, null, function()
      {
        b.prototype.parentView = this;
        c = new b(
        {
          imgArr: e,
          type: "tutorial"
        });
        a.doc.getElementsByClassName("popupInner")[0].appendChild(c.render().el)
      }, function()
      {
        c.removeView()
      })
    })
  };
  a.eventFirstNavi = function(b, c, d, e, g, k)
  {
    b && c && d && require(["js/view/tutorial/TutorialPopupView"], function(h)
    {
      var f;
      new a.PopupClass(
      {
        popupType: "tutorial"
      }, null, function()
      {
        h.prototype.parentView = this;
        f = new h(
        {
          imgArr: b,
          type: k ? k : "event",
          eventId: c,
          eventType: d,
          callback: e,
          eventDetail: g,
          dirName: k
        });
        a.doc.getElementsByClassName("popupInner")[0].appendChild(f.render().el)
      }, function()
      {
        f.removeView()
      })
    })
  };
  a.announceOpen = function(b, c)
  {
    a.tapBlock(!0);
    var d, e = 6E4 * ((new Date).getTime() / 6E4 | 0);
    require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + e, "text!json/announcements/announcements.json?bust=" + e], function(g, e, h, f)
    {
      new a.PopupClass(
      {
        title: "お知らせ",
        exClass: "announcementPopup",
        announce: !0
      }, e, function()
      {
        setTimeout(function()
        {
          a.tapBlock(!1)
        }, 500)
      }, function()
      {
        d && d.trigger("removeView")
      });
      d = new g(
      {
        bannerJson: h,
        announcementJson: f,
        targetEvent: Number(b),
        targetCampaign: Number(c)
      })
    })
  };
  a.targetAnnounceOpen = function(b)
  {
    var c = b.announceData,
      d = function() {};
    b.dispCallback && (d = b.dispCallback);
    a.tapBlock(!0);
    b = 6E4 * ((new Date).getTime() / 6E4 | 0);
    var e;
    require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/announcements/announcements.json?bust=" + b], function(b, k, h)
    {
      new a.PopupClass(
      {
        title: "お知らせ",
        exClass: "announcementPopup",
        announce: !0
      }, k, function()
      {
        setTimeout(function()
        {
          a.tapBlock(!1);
          d()
        }, 500)
      }, function()
      {
        e && e.trigger("removeView")
      });
      e = new b(
      {
        bannerJson: JSON.stringify([
        {
          bannerId: 1,
          description: "",
          bannerText: "",
          startAt: "2017-10-06 00:00:00",
          endAt: "2017-10-10 23:59:59",
          sortKey: 1,
          showAnnounce: !0,
          showMypage: !1,
          imagePath: "",
          bannerLink: "#/TopPage",
          outerBannerLink: ""
        }]),
        announcementJson: h,
        announceData: c
      })
    })
  };
  a.campaignParse = function(a)
  {
    var b = {};
    q.each(a, function(a, c)
    {
      switch (a.campaignType)
      {
        case "POINT_UP":
          var d = {
            campaignId: a.id,
            CARD_COMPOSE:
            {},
            EXPP:
            {},
            YELL:
            {},
            EXPC:
            {},
            CC:
            {},
            EP:
            {},
            pointUpType: [],
            globalBadge: !1
          };
          q.each(a.parameterMap, function(a, b)
          {
            -1 !== b.indexOf("CARD_COMPOSE_") && (d.CARD_COMPOSE[b.split("CARD_COMPOSE_")[1]] = (a | 0) / 1E3); - 1 !== b.indexOf("EXPP_") && (d.EXPP[b.split("EXPP_")[1]] = (a | 0) / 1E3, d.pointUpType.push(b.split("EXPP_")[1]), "ALL" === b.split("EXPP_")[1] && (d.globalBadge = !0)); - 1 !== b.indexOf("YELL_") && (d.YELL[b.split("YELL_")[1]] = (a | 0) / 1E3, d.pointUpType.push(b.split("YELL_")[1]), "ALL" === b.split("YELL_")[1] && (d.globalBadge = !0)); - 1 !== b.indexOf("EXPC_") && (d.EXPC[b.split("EXPC_")[1]] = (a | 0) / 1E3, d.pointUpType.push(b.split("EXPC_")[1]), "ALL" === b.split("EXPC_")[1] && (d.globalBadge = !0)); - 1 !== b.indexOf("CC_") && (d.CC[b.split("CC_")[1]] = (a | 0) / 1E3, d.pointUpType.push(b.split("CC_")[1]), "ALL" === b.split("CC_")[1] && (d.globalBadge = !0)); - 1 !== b.indexOf("EP_") && (d.EP[b.split("EP_")[1]] = (a | 0) / 1E3, d.pointUpType.push(b.split("EP_")[1]), "ALL" === b.split("EP_")[1] && (d.globalBadge = !0))
          });
          b[a.campaignType] = d;
          break;
        case "HALF_AP":
          d = {
            campaignId: a.id,
            questType: [],
            chapterIds: [],
            bgImgPath: ""
          };
          d.questType = a.parameterMap.TARGET_QUEST_TYPES.split(",");
          d.chapterIds = a.parameterMap.TARGET_GENERIC_IDS ? a.parameterMap.TARGET_GENERIC_IDS.split(",") : [];
          d.bgImgPath = a.imagePath ? "url(" + a.imagePath + ") left top no-repeat" : "url(/magica/resource/image_web/campaign/half_ap/common/global_icon_all.png) left top no-repeat";
          b[a.campaignType] = d;
          break;
        case "QUEST_DROP_FACTOR":
          d = {
            campaignId: a.id,
            questType: [],
            chapterIds: [],
            bgImgPath: ""
          };
          d.questType = a.parameterMap.TARGET_QUEST_TYPES.split(",");
          d.chapterIds = a.parameterMap.TARGET_GENERIC_IDS ? a.parameterMap.TARGET_GENERIC_IDS.split(",") : [];
          d.bgImgPath = "url(/magica/resource/image_web/campaign/drop_up/" + d.campaignId + "/global_icon.png) left top no-repeat";
          b[a.campaignType] = d;
          break;
        case "ARENA_REWARD_UP":
          d = {
            campaignId: a.id,
            magnification: a.parameterMap.ARENA_REWARD_UP | 0
          };
          b[a.campaignType] = d;
          break;
        case "BOX_GACHA":
          d = {
            campaignId: a.id,
            bannerImgPath: a.parameterMap.MYPAGE_BANNER_IMAGE
          };
          b[a.campaignType] = d;
          break;
        case "FREE_AT_NOT_CLEAR":
          d = {
            campaignId: a.id,
            questType: [],
            chapterIds: [],
            sectionIds: []
          }, d.questType = a.parameterMap.TARGET_QUEST_TYPES ? a.parameterMap.TARGET_QUEST_TYPES.split(",") : [], d.chapterIds = a.parameterMap.TARGET_GENERIC_IDS ? a.parameterMap.TARGET_GENERIC_IDS.split(",") : [], d.sectionIds = a.parameterMap.TARGET_SECTION_IDS ? a.parameterMap.TARGET_SECTION_IDS.split(",") : [], b[a.campaignType] = d
      }
    });
    return b
  };
  a.inputOverwriteApInfo = function(b)
  {
    var c = b.sectionModel,
      d = b.questBattleModel,
      e = a.campaignParse(b.campaignList),
      g = null,
      k = !1;
    e && (e.FREE_AT_NOT_CLEAR && (0 < e.FREE_AT_NOT_CLEAR.sectionIds.length && 0 <= e.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(c.sectionId)) ? k = !0 : 0 < e.FREE_AT_NOT_CLEAR.chapterIds.length && 0 <= e.FREE_AT_NOT_CLEAR.chapterIds.indexOf(String(c.section.genericId)) ? k = !0 : !k && e.FREE_AT_NOT_CLEAR.questType && q.each(e.FREE_AT_NOT_CLEAR.questType, function(a, b)
    {
      if ("ALL" === a || a == c.section.questType) k = !0
    })), e.HALF_AP && q.each(e.HALF_AP.questType, function(a, b)
    {
      if ("MAIN" == a || "SUB" == a) a == c.section.questType && (0 <= e.HALF_AP.chapterIds.indexOf(String(c.section.genericId)) || 0 === e.HALF_AP.chapterIds.length) && (g = Math.ceil(c.section.ap / 2), d.questBattle.ap && (g = Math.ceil(d.questBattle.ap / 2)));
      else if ("ALL" == a || a == c.section.questType) g = Math.ceil(c.section.ap / 2), d.questBattle.ap && (g = Math.ceil(d.questBattle.ap / 2))
    }));
    g && (d.halfAp = g, d.overwriteAp = g);
    k && (d.campaignFreeAtNotClear = k, d.overwriteAp = 0)
  };
  a.preNativeFadeIn = function(b, c)
  {
    var d = c ? c : 300;
    require(["command"], function(c)
    {
      a.androidKeyStop = !0;
      l(a.ready.target).on("webkitAnimationEnd", function()
      {
        l(a.ready.target).off();
        l(a.ready.target).on("webkitAnimationEnd", function(b)
        {
          "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
        });
        c.changeBg("web_black.jpg");
        setTimeout(function()
        {
          c.setWebView(!1);
          b()
        }, d)
      });
      a.addClass(a.ready.target, "preNativeFadeIn")
    })
  };
  a.storyPlayCheck = function(b, c, d)
  {
    if (!b || !c) return !1;
    var e = !0;
    d = d || a.storage.userQuestAdventureList.toJSON();
    q.each(d, function(a)
    {
      b === a.adventureId && (e = !1)
    });
    e ? (l(a.ready.target).off(), l(a.ready.target).on("webkitAnimationEnd", function()
    {
      cmd.changeBg("web_black.jpg");
      l(a.ready.target).off();
      l(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      ajaxControl.ajaxPost(a.linkList.userQuestAdventureRegist,
      {
        adventureId: String(b)
      }, c.bind(null, !0))
    }), a.ready.target.classList.contains("preNativeFadeIn") ? l(a.ready.target).trigger("webkitAnimationEnd") : a.addClass(a.ready.target, "preNativeFadeIn")) : c(!1)
  };
  a.isPlayStory = function(b)
  {
    var c = b.storyId,
      d = !1;
    if (!c) return d;
    b = b.userQuestAdventureList || a.storage.userQuestAdventureList.toJSON();
    q.each(b, function(a)
    {
      c === a.adventureId && (d = !0)
    });
    return d
  };
  a.playStory = function(b)
  {
    var c = b.cmd,
      d = b.ajaxControl,
      e = b.storyId,
      g = b.callback;
    if (!e || !g) return !1;
    var k = b.userQuestAdventureList,
      h = !1;
    b.isForcePlay && (h = b.isForcePlay);
    var f = !1;
    b.fullVoiceSectionId && (f = b.fullVoiceSectionId);
    var m = !0;
    b = k || a.storage.userQuestAdventureList.toJSON();
    q.each(b, function(a)
    {
      e === a.adventureId && (m = !1);
      h && (m = !0)
    });
    var n = function()
      {
        l("#commandDiv").on("nativeCallback", function()
        {
          l("#commandDiv").off();
          c.setWebView(!0);
          g()
        });
        setTimeout(function()
        {
          c.setWebView(!1);
          c.startStory(e);
          window.isBrowser && l("#commandDiv").trigger("nativeCallback")
        }, 500)
      },
      w = function(b)
      {
        b ? (a.responseSetStorage(b), f ? (l("#commandDiv").on("nativeCallback", function()
        {
          l("#commandDiv").off();
          n()
        }), setTimeout(function()
        {
          var a = "section_" + f;
          c.setWebView(!1);
          c.downloadFileFullVoice(a);
          window.isBrowser && l("#commandDiv").trigger("nativeCallback")
        }, 500)) : n()) : g()
      };
    m ? (l(a.ready.target).off(), l(a.ready.target).on("webkitAnimationEnd", function()
    {
      c.changeBg("web_black.jpg");
      l(a.ready.target).off();
      l(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        b.originalEvent && "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      d.ajaxPost(a.linkList.userQuestAdventureRegist,
      {
        adventureId: String(e)
      }, w)
    }), a.ready.target.classList.contains("preNativeFadeIn") ? l(a.ready.target).trigger("webkitAnimationEnd") : a.addClass(a.ready.target, "preNativeFadeIn")) : w()
  };
  a.storage = {};
  a.storageType = {
    user: "model",
    userList: "model",
    gameUser: "model",
    itemList: "collection",
    giftList: "collection",
    pieceList: "collection",
    titleList: "collection",
    userStatusList: "collection",
    userCharaList: "collection",
    userCharaEnhancementCellList: "collection",
    userCharaAtbEnhancementCellList: "collection",
    atbEnhancementCellList: "collection",
    userCardList: "collection",
    userDoppelList: "collection",
    userDeckList: "collection",
    userPieceList: "collection",
    userPieceSetList: "collection",
    userPieceArchiveList: "collection",
    userPieceStorageList: "collection",
    userLive2dList: "collection",
    userItemList: "collection",
    userGiftList: "collection",
    userFollowList: "collection",
    userFormationSheetList: "collection",
    userQuestAdventureList: "collection",
    userArenaBattle: "model",
    userChapterList: "collection",
    userSectionList: "collection",
    userQuestBattleList: "collection",
    presentList: "collection",
    userDailyChallengeList: "collection",
    userTotalChallengeList: "collection",
    userLimitedChallengeList: "collection",
    userTitleList: "collection",
    userTotalForces: "model",
    patrolList: "collection",
    patrolAreaList: "collection",
    userPatrolList: "collection",
    userEventPuellaRaid: "model",
    userGachaKindList: "collection",
    charaList: "collection",
    doppelList: "collection",
    enemyList: "collection",
    userEnemyList: "collection",
    userPieceCollectionList: "collection"
  };
  a.checkStorageType = function(b)
  {
    return a.storageType[b] || null
  };
  a.setStorage = function(b, c)
  {
    a.storage[c] = {};
    a.storage[c] = b
  };
  a.hasModel = function(b)
  {
    return a.storage[b] ? !0 : !1
  };
  a.responseSetStorage = function(b)
  {
    for (var c in b)
      if ("resultCode" != c)
        if (b[c] instanceof Array)
          if (a.hasModel(c)) q.each(b[c], function(b, d, e)
          {
            var f;
            b.id ? f = {
              id: b.id
            } : b.itemId ? f = {
              itemId: b.itemId
            } : b.statusId ? f = {
              statusId: b.statusId
            } : b.charaId ? f = {
              charaId: b.charaId
            } : b.challengeId ? f = {
              challengeId: b.challengeId
            } : b.giftId ? f = {
              giftId: b.giftId
            } : b.chapterId ? f = {
              chapterId: b.chapterId
            } : b.sectionId ? f = {
              sectionId: b.sectionId
            } : b.questBattleId ? f = {
              questBattleId: b.questBattleId
            } : b.areaMapId ? f = {
              areaMapId: b.areaMapId
            } : b.followUserId ? f = {
              followUserId: b.followUserId
            } : b.deckType ? f = {
              deckType: b.deckType
            } : b.doppelId ? f = {
              doppelId: b.doppelId
            } : b.formationSheetId ? f = {
              formationSheetId: b.formationSheetId
            } : b.adventureId ? f = {
              adventureId: b.adventureId
            } : b.setNum ? f = {
              setNum: b.setNum
            } : b.titleId && (f = {
              titleId: b.titleId
            });
            "pieceList" === c ? f = {
              pieceId: b.pieceId
            } : "itemList" === c ? f = {
              itemCode: b.itemCode
            } : "userLive2dList" == c && (f.charaId = b.charaId, f.live2dId = b.live2dId);
            b.charaEnhancementCellId && (f = {
              charaEnhancementCellId: b.charaEnhancementCellId
            });
            d = a.storage[c].findWhere(f);
            "userCharaAtbEnhancementCellList" === c && (d = !1);
            d ? "userFollowList" !== c ? (d.clear(
            {
              silent: !0
            }), d.set(b)) : !b.inviteCode && b.recentUsedAt ? d.set(
            {
              recentUsedAt: b.recentUsedAt
            }) : (d.clear(
            {
              silent: !0
            }), d.set(b)) : a.storage[c].add(b)
          });
          else
          {
            var d = c,
              e = new(x.Collection.extend(
              {
                url: a.linkList[d]
              }))(b[c]);
            a.setStorage(e, d)
          }
    else a.storage[c] ? a.storage[c].set(b[c]) : (d = c, e = new(x.Model.extend(
    {
      url: a.linkList[d]
    }))(b[c]), a.setStorage(e, d))
  };
  a.refreshStorage = function()
  {
    a.storage = {}
  };
  a.loading = {};
  a.loading.target = a.doc.getElementById("loading");
  a.loading.hide = function()
  {
    setTimeout(function()
    {
      a.androidKeyForceStop = !1
    }, 500);
    a.loading.target.style.display = "none"
  };
  a.loading.show = function()
  {
    a.androidKeyForceStop = !0;
    a.loading.target.style.display = "block"
  };
  a.ready = {};
  a.ready.target = a.doc.getElementById("ready");
  a.ready.content = a.doc.getElementById("baseContainer");
  a.ready.hide = function()
  {
    (l(a.ready.target).hasClass("show") || l(a.ready.target).hasClass("fadein") || l(a.ready.target).hasClass("preNativeFadeIn")) && setTimeout(function()
    {
      a.ready.target.className = "fadeout";
      a.androidKeyForceStop = !1
    }, 100);
    l(a.ready.target).hasClass("tutorialStart") && setTimeout(function()
    {
      a.ready.target.className = "tutorialStartFadeout";
      a.androidKeyForceStop = !1
    }, 100);
    l(a.ready.target).hasClass("gameStartFadeIn") && setTimeout(function()
    {
      a.ready.target.className = "gameStartFadeOut";
      a.androidKeyForceStop = !1
    }, 100);
    l(a.ready.content).hasClass("fadeout") && setTimeout(function()
    {
      a.removeClass(a.ready.content, "fadeout");
      a.addClass(a.ready.content, "fadein");
      a.androidKeyForceStop = !1
    }, 300)
  };
  a.ready.show = function()
  {
    a.androidKeyForceStop = !0;
    a.removeClass(a.ready.content, "fadein");
    a.addClass(a.ready.content, "fadeout");
    a.tapBlock(!0)
  };
  a.tapBlock = function(b)
  {
    b && !a.tutorialId ? (a.doc.querySelector("#tapBlock").style.display = "block", a.addClass(a.doc.getElementById("globalBackBtn"), "off")) : setTimeout(function()
    {
      b ? (a.doc.querySelector("#tapBlock").style.display = "block", a.addClass(a.doc.getElementById("globalBackBtn"), "off")) : (a.doc.querySelector("#tapBlock").style.display = "", a.removeClass(a.doc.getElementById("globalBackBtn"), "off"))
    }, a.tutorialId && !b ? 1E3 : 10)
  };
  a.forceTapBlock = function(b)
  {
    b.isBlock ? a.doc.querySelector("#forceTapBlock").style.display = "block" : a.doc.querySelector("#forceTapBlock").style.display = ""
  };
  var p = function()
  {
    for (var a = navigator.userAgent.toLowerCase(), c = 0; c < arguments.length; c++)
      if (a.match(arguments[c]) || "ipad" === arguments[c] && "MacIntel" === window.clientInformation.platform && "undefined" !== typeof document.ontouchstart) return !0;
    return !1
  };
  a.ua = {
    ios: p("ipad", "iphone", "ipod"),
    ios6: p("iphone os 6_"),
    ios7: p("iphone os 7_"),
    ipad: p("ipad"),
    ipod: p("ipod"),
    android: p("android"),
    isAndroidOs5: p("android 5"),
    isAndroidOs4_4: p("android 4.4"),
    isAndroidOs4_2: p("android 4.2"),
    isAndroidOs4_1: p("android 4.1"),
    isGalaxyNote: p("sc-02e", "sc-01g", "sc-05d", "scl22", "scl24", "sc-01f"),
    isGalaxysTab: p("sc-01e"),
    isGalaxys2: p("isw11sc", "sc-02c", "sc-03d"),
    isGalaxys3: p("sc-03e", "sc-06d", "scl21"),
    isGalaxyNote2: p("sc-02e"),
    isGalaxys3a: p("sc-03e"),
    isGalaxyJ: p("sc-02f"),
    isXperia: p("is11s", "is12s", "so-01b", "so-01c", "so-01e", "so-02e", "so-03d", "sol21", "sol22"),
    isXperiaAX: p("so-01e"),
    isArrows: p("f-05d", "f-10d", "fjl"),
    isEluga: p("p-02e"),
    isINFOBAR_A02: p("htx21"),
    isNexus6: p("nexus 6"),
    isNexus: p("nexus 6", "nexus 5"),
    isNexus5x: p("nexus 5x"),
    isSO_04E: p("so-04e"),
    isLowAnimeRate: p("201f", "201m", "202f", "203sh", "206sh", "301f", "302hw", "302sh", "303sh", "403sc", "404kc", "asus_t00p", "dm015k", "f-01f", "f-02e", "f-02f", "f-04e", "f-05e", "f-06e", "fjl22", "htl21", "htl22", "htl23", "l-01e", "l-04e", "l-05d", "l-05e", "lgl24", "lgv31", "n-02e", "n-03e", "n-04e", "n-06e", "nexus 10", "nexus 7", "p-02e", "p-03e", "sc-01f", "sc-01g", "sc-02e", "sc-02f", "sc-03e", "sc-04e", "sc-06d", "scl22", "scl24", "sh-02e", "sh-02f", "sh-04f", "sh-05f", "sh-06e", "sh-08e", "shl21", "shl22", "shl23", "so-01e", "so-04d", "sol21", "wx10k")
  };
  a.ua.ios && (a.ua.iosVersion = parseInt(navigator.userAgent.toLowerCase().split("os ")[1].substr(0, 1)), p("iphone") && 480 == screen.availWidth && 320 == screen.availHeight ? a.ua.iphone4 = !0 : 3 == window.devicePixelRatio && (a.ua.iphone6plus = !0));
  p = null;
  a.setPlatForm = function(b)
  {
    b && b.currentPlatform && (a.thisPlatform = b.currentPlatform)
  };
  a.setStyle = function(b)
  {
    a.doc.getElementById("headStyle").innerHTML = b
  };
  a.addStyle = function(b)
  {
    a.doc.getElementById("headStyle").innerHTML += b
  };
  var D = 0,
    B = 0,
    G = 0,
    v = 0,
    r = 0,
    H = 0,
    I = 0;
  a.doc.addEventListener("touchstart", function(a)
  {
    B = D = 0;
    H = a.changedTouches[0].clientX;
    I = a.changedTouches[0].clientY;
    G = a.touches.length
  }, !0);
  a.doc.addEventListener("touchend", function(a)
  {
    v = H - a.changedTouches[0].clientX;
    r = I - a.changedTouches[0].clientY;
    v = 0 > v ? -v : v;
    r = 0 > r ? -r : r;
    B = 0 < r - v ? r : v;
    1 > a.touches.length && (G = 0);
    (new Date).getTime()
  }, !0);
  a.doc.addEventListener("touchmove", function(a)
  {
    D += 1;
    v = H - a.changedTouches[0].clientX;
    r = I - a.changedTouches[0].clientY;
    v = 0 > v ? -v : v;
    r = 0 > r ? -r : r;
    B = 0 < r - v ? r : v;
    "range" !== a.target.type && a.preventDefault()
  },
  {
    useCapture: !0,
    passive: !1
  });
  a.androidResetHandler = function()
  {
    B = D = 0
  };
  a.isScrolled = function()
  {
    return 20 < D ? !0 : 16 > B ? !1 : !0
  };
  a.isTouching = function()
  {
    return 0 < G ? !0 : !1
  };
  a.isDoubleTouch = function()
  {
    return 1 < G ? !0 : !1
  };
  a.cgti = !a.ua.ios && !a.ua.android || a.ua.isGalaxys2 || a.ua.isGalaxys3 ? "click" : "touchend";
  a.g_popup_instance = null;
  a.popupArea = a.doc.querySelector("#popupArea");
  l("#popupCurtain").on(a.cgti, function()
  {
    this.classList.contains("tapBlock") || a.g_popup_instance && a.g_popup_instance.remove()
  });
  a.PopupClass = function(b, c, d, e)
  {
    var g = x.Model.extend();
    null !== a.g_popup_instance && a.g_popup_instance.remove();
    a.g_popup_instance = this;
    this.popupView = null;
    this.temp = c ? c : a.doc.getElementById("popupTemp").textContent;
    b.canClose = void 0 === b.canClose ? !0 : b.canClose;
    this.popupModel = new g(b);
    this.callback = d;
    this.closeEvent = e;
    this.popupType = this.popupModel.get("popupType") || "typeA";
    this.exClass = this.popupModel.get("exClass") || "";
    this.simple = this.popupModel.get("simple") ? "simpleAppear" : "";
    this.showCurtain = void 0 === this.popupModel.get("showCurtain") ? !0 : this.popupModel.get("showCurtain");
    this.decideBtnLink = b.decideBtnLink;
    this.decideBtnEvent = b.decideBtnEvent;
    this.open()
  };
  a.PopupClass.prototype.open = function()
  {
    var b = this;
    this.popupView = new(x.View.extend(
    {
      model: b.popupModel,
      className: "popupContent open " + this.popupType + " " + this.exClass + " " + this.simple,
      id: this.popupModel.get("popupId"),
      initialize: function(a)
      {
        this.template = q.template(b.temp)
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .popupCloseBtn"] = this.close;
        b.animationend = this.nextAnimation;
        b.webkitAnimationEnd = this.nextAnimation;
        b.webkitTransitionEnd = this.nextAnimation;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.model.toJSON().decideBtnLink && (this.el.querySelector(".decideBtn").dataset.href = this.model.toJSON().decideBtnLink, a.addClass(this.el.querySelector(".decideBtn"), "linkBtn"));
        if (this.model.toJSON().decideBtnEvent)
        {
          var b = this,
            c = this.el.querySelector(".decideBtn");
          this.el.classList.contains("archiveMoveSelectPop") && (c = this.el.querySelectorAll(".decideBtn"));
          l(c).on(a.cgti, function(a)
          {
            b.model.toJSON().decideBtnEvent(a)
          })
        }
        return this
      },
      close: function(b)
      {
        b && b.preventDefault();
        a.isScrolled() || (a.removeClass(this.el, "open"), a.addClass(this.el, "close"), a.popupCloseBtn = !0, a.helpPopup && a.helpPopup.removeHandler())
      },
      nextAnimation: function(a)
      {
        a.currentTarget.classList.contains("close") && b.remove()
      }
    }));
    if (this.callback)
    {
      var c = new MutationObserver(function()
        {
          c.disconnect();
          !b.callback || b.callback && "function" !== typeof b.callback || b.callback()
        }),
        d = a.doc.getElementById("popupArea");
      c.observe(d,
      {
        attributes: !1,
        childList: !0,
        characterData: !1
      })
    }
    l("#popupArea").append(this.popupView.render().el);
    this.showCurtain && a.addClass(a.doc.getElementById("popupCurtain"), "show");
    this.canClose || a.addClass(a.doc.getElementById("popupCurtain"), "tapBlock");
    this.popupModel.get("param") && (d = this.popupModel.get("param"), this.popupView.$el.find(".popupInner").css(d), d = null)
  };
  a.PopupClass.prototype.remove = function()
  {
    if ("" !== a.popupArea.className)
    {
      var b = new Event(a.popupArea.className + "Close");
      a.popupArea.dispatchEvent(b);
      a.popupArea.className = ""
    }
    a.doc.getElementById("popupCurtain").className = "";
    this.popupView && this.popupView.remove();
    this.popupModel && this.popupModel.clear();
    this.temp = this.popupModel = this.popupView = this.callback = null;
    a.g_popup_instance = null;
    if (this.closeEvent && a.popupCloseBtn && ("function" == typeof this.closeEvent && this.closeEvent(), "object" == typeof this.closeEvent)) this.closeEvent[0](this.closeEvent[1]);
    this.closeEvent = null;
    a.popupCloseBtn = null
  };
  a.addClass = function(a, c)
  {
    if (a)
      if (Array.isArray(c))
        for (var b in c) a.classList.contains(c[b]) || a.classList.add(c[b]);
      else a.classList.contains(c) || a.classList.add(c)
  };
  a.removeClass = function(a, c)
  {
    if (a)
      if (Array.isArray(c))
        for (var b in c) a.classList.contains(c[b]) && a.classList.remove(c[b]);
      else a.classList.contains(c) && a.classList.remove(c)
  };
  a.addClassId = function(b, c)
  {
    if (b)
      if (Array.isArray(c))
        for (var d in c) a.doc.getElementById(b).classList.contains(c[d]) || a.doc.getElementById(b).classList.add(c[d]);
      else a.doc.getElementById(b).classList.contains(c) || a.doc.getElementById(b).classList.add(c)
  };
  a.removeClassId = function(b, c)
  {
    if (b)
      if (Array.isArray(c))
        for (var d in c) a.doc.getElementById(b).classList.contains(c[d]) && a.doc.getElementById(b).classList.remove(c[d]);
      else a.doc.getElementById(b).classList.contains(c) && a.doc.getElementById(b).classList.remove(c)
  };
  a.responseCheck = function(a)
  {
    return "error" == a.resultCode ? (this.errorFunc(a.errorTxt, a.errorLink), !1) : "redirect" == a.resultCode ? (location.href = a.pageLink, !1) : !0
  };
  a.errorFunc = function(a, c)
  {
    function b()
    {
      l("#commonJsErrorLinkBtn").off(cgti, b);
      c ? location.href = c : popupClose("commonJsErrorPopup")
    }
    l("#loading").css("display", "none");
    document.getElementById("commonJsErrorCautionText").textContent = a;
    l("#commonJsErrorLinkBtn").on(cgti, b);
    popupStart("commonJsErrorPopup")
  };
  a.getTotalStone = function()
  {
    var b = a.storage.userItemList.findWhere(
      {
        itemId: "MONEY"
      }),
      c = a.storage.userItemList.findWhere(
      {
        itemId: "PRESENTED_MONEY"
      }),
      b = b ? b.get("quantity") : 0,
      c = c ? c.get("quantity") : 0;
    return {
      totalMoney: b + c,
      userMoney: b,
      presentedMoney: c
    }
  };
  a.calcExpendStone = function(b)
  {
    var c = b.quantity;
    b = b.isPurchasedMoneyOnly;
    var d = a.getTotalStone();
    return b ? d.userMoney >= c ?
    {
      userMoney: d.userMoney - c,
      presentedMoney: d.presentedMoney,
      totalMoney: d.totalMoney - c
    } :
    {
      userMoney: 0,
      presentedMoney: 0,
      totalMoney: d.totalMoney - c
    } : d.presentedMoney >= c ?
    {
      userMoney: d.userMoney,
      presentedMoney: d.presentedMoney - c,
      totalMoney: d.totalMoney - c
    } : d.totalMoney >= c ?
    {
      userMoney: d.userMoney + (d.presentedMoney - c),
      presentedMoney: 0,
      totalMoney: d.totalMoney - c
    } :
    {
      userMoney: 0,
      presentedMoney: 0,
      totalMoney: d.totalMoney - c
    }
  };
  a.scrollBarDisp = function(b)
  {
    if (a.ua.ios) require(["js/libs/iscroll5"], function()
    {
      a.myScroll || (a.myScroll = [], a.setScrollArray = []);
      if (Array.isArray(b))
        for (var c in b) - 1 === a.setScrollArray.indexOf(b[c]) && (a.myScroll[a.myScroll.length] = new IScroll(b[c],
        {
          mouseWheel: !0,
          scrollbars: !0,
          fadeScrollbars: !0
        }), a.setScrollArray[a.setScrollArray.length] = b[c]);
      else - 1 === a.setScrollArray.indexOf(b) && (a.myScroll[a.myScroll.length] = new IScroll(b,
      {
        mouseWheel: !0,
        scrollbars: !0,
        fadeScrollbars: !0
      }), a.setScrollArray[a.setScrollArray.length] = b)
    });
    else
      for (var c = a.doc.getElementsByClassName("scrollBar"), d = 0, e = c.length; d < e; d++) c[d].style = "overflow-y:scroll;height:100%;"
  };
  a.scrollBarControl = function(b, c)
  {
    if (a.ua.ios && a.myScroll)
    {
      if (Array.isArray(a.myScroll))
        for (var d = 0, e = a.myScroll.length; d < e; d++) "refresh" == b && (a.myScroll[d].refresh(), c && a.myScroll[d].scrollTo(0, 0)), "destroy" == b && a.myScroll[d].destroy();
      else "refresh" == b && (a.myScroll.refresh(), c && a.myScroll.scrollTo(0, 0)), "destroy" == b && a.myScroll.destroy();
      "destroy" == b && (a.myScroll = null, a.setScrollArray = null)
    }
  };
  a.backLinkHandler = function()
  {
    a.androidKeyForceStop = !0;
    if ("MyPage" !== a.location && "" !== a.location && "#/TopPage" !== a.location && (!a.tutorialId || "TU520" === a.tutorialId))
      if (a.backlinkTimer && 1001 > (new Date).getTime() - a.backlinkTimer) a.androidKeyForceStop = !1;
      else if (a.backlinkTimer = (new Date).getTime(), !a.eventBackHandler)
    {
      var b = !0,
        c = location.hash;
      q.each("QuestBackground GachaResult MemoriaComposeResult MemoriaEquip MemoriaSetEquip EventTrainingCharaSelect".split(" "), function(a, d)
      {
        -1 !== c.indexOf(a) && (b = !1)
      });
      var d = !1;
      q.each(["QuestBackground", "QuestResult", "ArenaResult", "MyPage"], function(a, b)
      {
        -1 < c.indexOf(a) && (d = !0)
      });
      if (d) a.androidKeyForceStop = !1;
      else
      {
        var e = !1;
        q.each("CharaListTop MemoriaTop GachaTop MissionTop ShopTop FormationTop MainQuest ArenaTop CollectionTop ItemListTop Help ConfigTop PresentList EventDungeonMap".split(" "), function(a, b)
        {
          -1 < c.indexOf(a) && c.split("/")[1] == a && (e = !0)
        });
        a.scrollBarControl("destroy");
        if (e) a.historyArr = [], location.href = "#/TopPage";
        else
        {
          var g = "";
          b ? (a.locationPrev = a.historyArr[a.historyArr.length - 1], a.historyArr.splice(a.historyArr.length - 1, 1), 1 < a.historyArr.length ? (a.doc.getElementById("sideMenu") && (a.doc.querySelector("#sideMenu").className = ""), a.tapBlock(!0), -1 === location.hash.indexOf("PresentHistory") ? location.href = "#/" + a.historyArr[a.historyArr.length - 1] : -1 < a.historyArr[a.historyArr.length - 1].indexOf("GachaTop") ? (a.gachaDisp && (g = "/" + a.gachaDisp), location.href = "#/GachaTop" + g) : location.href = "#/" + a.historyArr[a.historyArr.length - 1]) : location.href = "#/TopPage") : a.historyArr[a.historyArr.length - 1] ? (a.doc.getElementById("sideMenu") && (a.doc.querySelector("#sideMenu").className = ""), a.tapBlock(!0), -1 !== location.hash.indexOf("GachaResult") ? (a.gachaDisp && (g = "/" + a.gachaDisp), location.href = "#/GachaTop" + g) : location.href = "#/" + a.historyArr[a.historyArr.length - 1]) : location.href = "#/TopPage"
        }
      }
    }
  };
  var J = !1;
  a.setGlobalView = function(b)
  {
    J || setTimeout(function()
    {
      a.setGlobalView(b)
    }, 100)
  };
  require(["GlobalView"], function(b)
  {
    J = !0;
    a.setGlobalView = function(c)
    {
      "LoginBonus" !== a.historyArr[a.historyArr.length - 1] && (a.globalMenuView ? a.globalMenuView.trigger("optionSet", c) : a.globalMenuView = new b(c), a.globalMenuView.addCampaignBadge(), a.globalMenuView.addEventBadge(), a.globalMenuView.addRegularEventBadge(), a.globalMenuView.addPatrolBadge(), "#/MyPage" === location.hash && a.addClass(a.doc.getElementById("sideMenu"), "anim"))
    }
  });
  a.setHelpPopup = function(b, c, d)
  {
    a.tapBlock(!0);
    require(["HelpPopup"], function(e)
    {
      a.tapBlock(!1);
      a.helpPopup = new e(b, c, d)
    })
  };
  a.getIconImgPath = function(a, c)
  {
    var b = "";
    switch (a)
    {
      case "RICHE":
        b = "icon_cursechip";
        break;
      default:
        if (-1 < a.indexOf("EVENT_")) b += "event/", -1 < a.indexOf("GROUPBATTLE") && -1 < a.indexOf("_COIN") ? a = "event_groupbattle_coin" : -1 < a.indexOf("TRAINING") && 4 > a.split("_").length ? a = "event_training_potion" : 0 > a.indexOf("ARENARANKING_EXCHANGE") && -1 < a.indexOf("ARENARANKING") && (a = "event_arenaranking_1013_exchange_1");
        else if (-1 < a.indexOf("CAMPAIGN_")) b += "campaign/";
        else if (-1 < a.indexOf("GACHA_FREEBIE_"))
        {
          var e = a.split("_");
          isNaN(e[2]) ? (b += "gacha/", e.pop(), a = e.join("_")) : b += "gacha_old/"
        }
        else - 1 < a.indexOf("SELECTABLE_MEMORIA_TICKET_") && (e = a.split("_"), isNaN(e[3]) && (b += "gacha/", e.pop(), a = e.join("_")));
        b += "icon_" + a.toLowerCase()
    }
    return "/magica/resource/image_web/common/icon/" + (c ? b + ".png" : b + "_f.png")
  };
  a.getRewardImgModel = function(a)
  {
    var b = {};
    a = a.split("_");
    switch (a[0])
    {
      case "RICHE":
        b.imagePath = "main/riche";
        b.quantity = a[a.length - 1];
        break;
      case "PIECE":
      case "MAXPIECE":
        b.quantity = a[a.length - 1];
        b.nativeimgkey = "piece_" + a[1];
        b.imagePath = "memoria/memoria_" + a[1] + "_s";
        break;
      case "TITLE":
        b.quantity = a[a.length - 1];
        b.imagePath = "main/title";
        break;
      case "GIFT":
        b.quantity = a[a.length - 1];
        b.nativeimgkey = "gift_" + a[1];
        b.imagePath = "gift/item_gift_" + a[1];
        break;
      default:
        b.quantity = a[a.length - 1], a.shift(), a.pop(), b.imagePath = (-1 < a.indexOf("EVENT_") ? "event" : "main") + "/" + a.join("_").toLowerCase()
    }
    return b
  };
  a.itemSet = function(b)
  {
    function c(a)
    {
      switch (-1 !== String(a).indexOf("RANK_") ? a.split("_")[1] | 0 : a)
      {
        case 1:
          return "BRONZE";
        case 2:
          return "SILVER";
        default:
          return "GOLD"
      }
    }
    if ("MISS" != b)
    {
      var d, e = {};
      q.each("RICHE_ CARD_ PIECE_ MAXPIECE_ GIFT_ EVENTITEM_ GACHAEVENTITEM_ GEM_ LIVE2D_ DOPPEL_ FORMATIONSHEET_ EVENTEFFECT_ ITEM_".split(" "), function(a)
      {
        -1 !== b.indexOf(a) && (d = a.split("_")[0])
      });
      var g = b.split("_"),
        k;
      switch (d)
      {
        case "RICHE":
          e.itemCode = "riche";
          e.quantity = Number(g[g.length - 1]);
          e.chestColor = "BRONZE";
          e.rewardType = "RICHE";
          break;
        case "ITEM":
          k = "";
          e.quantity = Number(g[g.length - 1]);
          g.shift();
          g.pop();
          q.each(g, function(a, b)
          {
            0 !== b && (a = "_" + a);
            k += a
          });
          e.itemCode = k;
          var h = a.storage.itemList.findWhere(
            {
              itemCode: k
            }),
            h = h ? h.toJSON().treasureChestColor : "BRONZE";
          "GOLD" == h || "SILVER" == h || "BRONZE" == h ? e.chestColor = h : "ADDED_DROP" == h && (e.chestColor = "ADDED_DROP");
          e.rewardType = "ITEM";
          break;
        case "GIFT":
          k = "";
          e.quantity = Number(g[g.length - 1]);
          g.pop();
          q.each(g, function(a, b)
          {
            0 !== b && (a = "_" + a);
            k += a
          });
          e.itemCode = "item_" + k.toLowerCase();
          h = k.split("_")[1] | 0;
          h = a.storage.giftList.findWhere(
          {
            id: h
          });
          e.chestColor = h ? c(h.toJSON().rank) : "BRONZE";
          e.giftModel = h.toJSON();
          e.rewardType = "GIFT";
          break;
        case "LIVE2D":
          g.pop();
          g.shift();
          e.itemCode = g[0];
          e.chestColor = "GOLD";
          e.rewardType = "LIVE2D";
          break;
        case "DOPPEL":
          g.shift();
          e.itemCode = g[0];
          e.chestColor = "GOLD";
          e.rewardType = "DOPPEL";
          break;
        case "PIECE":
        case "MAXPIECE":
          1 < Number(g[g.length - 1]) && (e.quantity = Number(g[g.length - 1]));
          g.pop();
          g.shift();
          e.itemCode = "memoria_" + g[0] + "_s";
          h = a.storage.pieceList.findWhere(
          {
            pieceId: g[0] | 0
          });
          e.piece = h.attributes;
          e.chestColor = h ? c(h.toJSON().rank) : "BRONZE";
          e.rewardType = "PIECE";
          break;
        case "GEM":
          g.pop();
          g.shift();
          e.itemCode = "chara_" + g[0] + "_h";
          e.chestColor = "GOLD";
          e.rewardType = "GEM";
          break;
        case "EVENTEFFECT":
          g.pop();
          g.shift();
          g.shift();
          e.effectItemCode = g.join("_");
          e.rewardType = "EVENTEFFECT";
          break;
        case "CARD":
          g = a.storage.userCardList.findWhere(
          {
            cardId: Number(g[1])
          }), e.cardModel = g.toJSON(), e.cardModel && (h = a.storage.userCharaList.findWhere(
          {
            charaId: Number(e.cardModel.card.charaNo)
          })), e.charaModel = h.toJSON(), e.rewardType = "CARD"
      }
      return e
    }
  };
  a.getRewardInfoForBogetGacha = function(b)
  {
    b = b.rewardInfo;
    var c, d = !1;
    q.each(b, function(a, b, e)
    {
      d || (c = b, d = !0)
    });
    var e = {};
    if ("gift" == c)
    {
      var g = b.gift;
      e.itemCode = "item_" + g.id;
      e.chestColor = a.getItemRankColor(g.rank);
      e.giftModel = g;
      e.rewardType = "GIFT"
    }
    else "item" == c ? (g = b.item, e.itemCode = g.itemCode, e.chestColor = g.treasureChestColor, e.rewardType = "ITEM") : "richeNum" == c && (e.itemCode = "riche", e.quantity = b.richeNum, e.chestColor = "BRONZE", e.rewardType = "RICHE");
    "richeNum" != c && (e.quantity = b.num);
    return e
  };
  a.getItemRankColor = function(a)
  {
    switch (-1 !== String(a).indexOf("RANK_") ? a.split("_")[1] | 0 : a)
    {
      case 1:
        return "BRONZE";
      case 2:
        return "SILVER";
      default:
        return "GOLD"
    }
  };
  a.getApRemainTime = function(a, c, d)
  {
    c = c.point - a.point;
    return 0 >= c ? 0 : a.checkPeriod * c * 60 + Date.parse(a.checkedAt) / 1E3 - Date.parse(d) / 1E3
  };
  a.scrollSet = function(b, c)
  {
    if (a.doc.getElementById(b) && !(1 > a.doc.getElementById(b).getElementsByClassName(c).length))
    {
      var d = a.location;
      a.scrollArr || (a.scrollArr = {});
      a.scrollArr[b + c + d] || (a.scrollArr[b + c + d] = {});
      a.scrollArr[b + c + d].targetId = b;
      a.scrollArr[b + c + d].innerClass = c;
      a.scrollArr[b + c + d].thisPage = d;
      a.scrollArr[b + c + d].scrollbarPositionBase = 0;
      a.scrollArr[b + c + d].touchScrollBarPosition = 0;
      a.scrollArr[b + c + d].stopVelocity = !1;
      var e = ["MemoriaList", "PieceArchive", "RegularEventGroupBattleTop"],
        g, k, h, f = !1;
      if (a.ua.ios || 0 > e.indexOf(a.location)) g = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          f = window.setInterval(a, 17)
        },
        k = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.clearInterval(f);
          f = !1
        };
      a.scrollArr[b + c + d].touchStartNum = 0;
      var m = a.scrollArr[b + c + d].scrollCount = 0,
        n = 0,
        w = null,
        l = a.doc.getElementById(b);
      a.scrollArr[b + c + d].domHeight = l.offsetHeight;
      var y = a.doc.getElementById(b).getElementsByClassName(c)[0];
      a.scrollArr[b + c + d].limit = y.offsetHeight;
      a.doc.getElementsByTagName("body");
      var p = y.style.cssText ? y.style.cssText : "";
      a.scrollArr[b + c + d].defaultCss = p;
      var q = !1;
      if (1 > a.doc.getElementById(b).getElementsByClassName("scrollIndicator").length)
      {
        var e = a.doc.createElement("div"),
          u = a.doc.createElement("div");
        e.className = "scrollIndicator";
        u.className = "scrollIndicatorInner";
        a.doc.getElementById(b).appendChild(e);
        a.doc.getElementById(b).getElementsByClassName("scrollIndicator")[0].appendChild(u)
      }
      "static" === window.getComputedStyle(a.doc.getElementById(b)).position && (a.doc.getElementById(b).style.position = "relative");
      "static" === window.getComputedStyle(a.doc.getElementById(b).getElementsByClassName(c)[0]).position && (a.doc.getElementById(b).getElementsByClassName(c)[0].style.position = "relative");
      var t = a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0];
      a.scrollArr[b + c + d].scrollBarHeight = Math.round(a.scrollArr[b + c + d].domHeight * a.scrollArr[b + c + d].domHeight / a.scrollArr[b + c + d].limit);
      t.style.height = a.scrollArr[b + c + d].scrollBarHeight + "px";
      var v = a.ua.ios ? !0 : !1,
        z = function(e)
        {
          if (v) return a.scrollArr[b + c + d].scrollbarPositionBase = e, t.style.cssText = "height:" + a.scrollArr[b + c + d].scrollBarHeight + "px;-webkit-transform:translateY(" + Math.round(e / a.scrollArr[b + c + d].limit * -a.scrollArr[b + c + d].domHeight) + "px) translateZ(0);", "-webkit-transform:translateY(" + e + "px) translateZ(0);";
          a.scrollArr[b + c + d].scrollbarPositionBase = e;
          t.style.cssText = "height:" + a.scrollArr[b + c + d].scrollBarHeight + "px;-webkit-transform:translate3d(0," + Math.round(e / a.scrollArr[b + c + d].limit * -a.scrollArr[b + c + d].domHeight) + "px,0);";
          return "-webkit-transform:translate3d(0," + e + "px,0);"
        },
        A, F, K = function()
        {
          if (!(!q && B && y && a.doc.getElementById(b) && a.scrollArr && a.scrollArr[b + c + d]) || a.scrollArr[b + c + d].thisPage !== a.location || a.forceScrollFlag || a.scrollArr[b + c + d].stopVelocity) k && k(h);
          else if (!(1 > a.doc.getElementById(b).getElementsByClassName(c).length))
          {
            var e = (new Date).getTime() - w;
            a.scrollArr[b + c + d].touchStartNum = a.scrollArr[b + c + d].scrollCount;
            a.scrollArr[b + c + d].scrollCount = a.scrollArr[b + c + d].scrollCount + n | 0;
            n = ((1700 - e) / 1700 * n * 100 | 0) / 100;
            if (0 > a.scrollArr[b + c + d].scrollCount && -a.scrollArr[b + c + d].scrollCount < A) y.style.cssText = p + z(a.scrollArr[b + c + d].scrollCount);
            else
            {
              if (0 <= a.scrollArr[b + c + d].scrollCount)
              {
                y.style.cssText = p + z(0);
                a.scrollArr[b + c + d].touchStartNum = 0;
                a.removeClass(t, "onScroll");
                a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange");
                k && k(h);
                return
              }
              if (-a.scrollArr[b + c + d].scrollCount >= A)
              {
                a.scrollArr[b + c + d].touchStartNum = F;
                y.style.cssText = p + z(a.scrollArr[b + c + d].touchStartNum);
                a.removeClass(t, "onScroll");
                a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange");
                k && k(h);
                return
              }
            }
            if (!q && y && a.doc.getElementById(b) && a.scrollArr[b + c + d])
            {
              var m = 0 > n ? -n : n;
              1700 > e && 0 < m ? f || g && (h = g(K)) : (a.removeClass(t, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"), k && k(h))
            }
            else k && k(h)
          }
        },
        r = !1,
        x = !1,
        B = !1,
        E = null;
      a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("touchstart", function(d)
      {
        a.isDoubleTouch() ? k && k(h) : (r = !1, E = null, q = !0, x = B = !1, h && k && k(h), m = d.changedTouches[0].clientY, n = 0, !a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length || (d = a.location, a.scrollArr[b + c + d] && a.location === a.scrollArr[b + c + d].thisPage && (a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"), a.scrollArr[b + c + d].stopVelocity = !1, A = a.scrollArr[b + c + d].limit - a.scrollArr[b + c + d].domHeight, F = -a.scrollArr[b + c + d].limit + a.scrollArr[b + c + d].domHeight, E = (new Date).getTime(), r = !0)))
      }, !0);
      var D = null;
      a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("touchmove", function(e)
      {
        if (a.isDoubleTouch() || a.androidKeyForceStop || !r || !a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length) k && k(h);
        else
        {
          !x && a.detailPopup && (x = !0, 1 > a.doc.querySelectorAll("#memoriaDetailWrap #" + b).length && (r = !1));
          var f = a.scrollArr[b + c + d].touchStartNum + (e.changedTouches[0].clientY - m);
          if (!B)
          {
            if (10 > (0 > f ? -f : f)) return;
            a.addClass(t, "onScroll");
            B = !0
          }
          e.preventDefault();
          D = (new Date).getTime();
          n = -(a.scrollArr[b + c + d].scrollCount - f) | 0;
          a.scrollArr[b + c + d].scrollCount = f | 0;
          0 > a.scrollArr[b + c + d].scrollCount && -a.scrollArr[b + c + d].scrollCount < A && (y.style.cssText = p + z(a.scrollArr[b + c + d].scrollCount));
          0 <= a.scrollArr[b + c + d].scrollCount ? (a.scrollArr[b + c + d].scrollCount = 0, a.scrollArr[b + c + d].touchStartNum = 0, y.style.cssText = p + z(0)) : -a.scrollArr[b + c + d].scrollCount >= A && (a.scrollArr[b + c + d].scrollCount = F, a.scrollArr[b + c + d].touchStartNum = F, y.style.cssText = p + z(a.scrollArr[b + c + d].touchStartNum))
        }
      }, !0);
      a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("touchend", function(e)
      {
        q = !1;
        if (r)
          if (r = !1, a.isDoubleTouch()) k && k(h);
          else if (l && y && a.doc.getElementById(b) && !(1 > a.doc.getElementById(b).getElementsByClassName(c).length) && a.scrollArr[b + c + d] && a.scrollArr[b + c + d].thisPage === a.location)
          if (0 > a.scrollArr[b + c + d].scrollCount && -a.scrollArr[b + c + d].scrollCount < A)
          {
            a.scrollArr[b + c + d].touchStartNum = a.scrollArr[b + c + d].scrollCount;
            var f = (new Date).getTime();
            !D || 200 < f - D ? n = 0 : D && 200 > f - E && (f = a.scrollArr[b + c + d].domHeight / a.scrollArr[b + c + d].limit * a.scrollArr[b + c + d].limit, f = (0 > e.changedTouches[0].clientY - m ? -(e.changedTouches[0].clientY - m) : e.changedTouches[0].clientY - m) > (0 > f ? -f : f) ? 0 < e.changedTouches[0].clientY - m ? f : -f : e.changedTouches[0].clientY - m, n = f / 4 | 0);
            1 < (0 > n ? -n : n) ? (w = (new Date).getTime(), g && (h = g(K))) : (a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"), a.removeClass(t, "onScroll"))
          }
        else 0 <= a.scrollArr[b + c + d].scrollCount ? (a.scrollArr[b + c + d].touchStartNum = 0, a.removeClass(t, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange")) : -a.scrollArr[b + c + d].scrollCount >= A && (a.scrollArr[b + c + d].touchStartNum = F, a.removeClass(t, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"));
        else k && k(h);
        else k && k(h)
      }, !0);
      a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0].addEventListener("touchstart", function(e)
      {
        a.isDoubleTouch() || !a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length || (n = 0, 1 > a.scrollArr[b + c + d].limit - a.scrollArr[b + c + d].domHeight || (a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"), a.scrollArr[b + c + d].touchScrollBarPosition = e.changedTouches[0].clientY, a.scrollArr[b + c + d].touchScrollBarStartPosition = a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0].getBoundingClientRect().top - a.doc.getElementById(b).getBoundingClientRect().top, a.addClass(t, "onScroll")))
      });
      a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0].addEventListener("touchmove", function(e)
      {
        if (!a.isDoubleTouch() && a.doc.getElementById(b) && !(1 > a.doc.getElementById(b).getElementsByClassName(c).length || 1 > a.scrollArr[b + c + d].limit - a.scrollArr[b + c + d].domHeight))
        {
          e.preventDefault();
          var f = a.scrollArr[b + c + d].domHeight;
          e = -a.scrollArr[b + c + d].touchScrollBarStartPosition - (e.changedTouches[0].clientY - a.scrollArr[b + c + d].touchScrollBarPosition);
          a.scrollArr[b + c + d].scrollCount = f <= a.scrollArr[b + c + d].scrollBarHeight + -1 * e ? -1 * (a.scrollArr[b + c + d].limit - a.scrollArr[b + c + d].domHeight) : 0 <= e ? 0 : Math.round(e / (f - a.scrollArr[b + c + d].scrollBarHeight) * (a.scrollArr[b + c + d].limit - a.scrollArr[b + c + d].domHeight));
          y.style.cssText = p + z(a.scrollArr[b + c + d].scrollCount)
        }
      });
      a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0].addEventListener("touchend", function(e)
      {
        a.isDoubleTouch() || !a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length || (a.removeClass(t, "onScroll"), a.scrollArr[b + c + d].touchStartNum = a.scrollArr[b + c + d].scrollCount, a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"))
      })
    }
  };
  a.lastScrollCountX = 0;
  a.scrollSetX = function(b, c)
  {
    if (a.doc.getElementById(b) && !(1 > a.doc.getElementById(b).getElementsByClassName(c).length))
    {
      a.scrollArrX || (a.scrollArrX = {});
      if (!a.scrollArrX[b + c]) a.scrollArrX[b + c] = {};
      else if (-1 < ["CharaListTop", "CharaListCompose", "CharaListComposeMagia", "CharaListCustomize", "CharaListEquip"].indexOf(a.location) && a.doc.getElementById(a.scrollArrX[b + c].targetId) && "charaListScrollWrap" === a.scrollArrX[b + c].targetId) return;
      a.scrollArrX[b + c].targetId = b;
      a.scrollArrX[b + c].innerClass = c;
      a.scrollArrX[b + c].scrollbarPositionBase = 0;
      a.scrollArrX[b + c].thisPage = a.location;
      var d, e, g;
      a.ua.ios ? (d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
      {
        window.setTimeout(a, 10)
      }, e = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
      {
        window.setTimeout(a)
      }) : (d = function(a)
      {
        window.setTimeout(a, 10)
      }, e = function(a)
      {
        window.clearTimeout(a)
      });
      var k = a.scrollArrX[b + c].touchStartNum = 0,
        h = a.scrollArrX[b + c].scrollCount = 0,
        f = a.doc.getElementById(b),
        m = a.doc.getElementById(b).getElementsByClassName(c)[0];
      a.scrollArrX[b + c].scrollDomWidth = f.offsetWidth;
      for (var n = m.childNodes,
          w = n.length, l = n[w - 1], p = l.offsetLeft; 0 < w;) w = w - 1 | 0, n[w].offsetLeft > p && (l = n[w], p = l.offsetLeft);
      a.scrollArrX[b + c].lastDom = l;
      a.scrollArrX[b + c].lastDomOffLeft = p;
      a.scrollArrX[b + c].limit = a.scrollArrX[b + c].lastDomOffLeft + l.offsetWidth + 10;
      var q = m.style.cssText ? m.style.cssText : "";
      a.scrollArrX[b + c].defaultCss = q;
      var r = !1,
        n = a.doc.createElement("div"),
        w = a.doc.createElement("div");
      n.className = "scrollIndicatorX";
      w.className = "scrollIndicatorInnerX";
      a.doc.getElementById(b).appendChild(n);
      a.doc.getElementById(b).getElementsByClassName("scrollIndicatorX")[0].appendChild(w);
      "static" === window.getComputedStyle(a.doc.getElementById(b)).position && (a.doc.getElementById(b).style.position = "relative");
      var u = a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInnerX")[0];
      a.scrollArrX[b + c].scrollBarWidth = Math.round(a.scrollArrX[b + c].scrollDomWidth * a.scrollArrX[b + c].scrollDomWidth / a.scrollArrX[b + c].limit);
      u.style.width = a.scrollArrX[b + c].scrollBarWidth + "px";
      var t = function(d)
        {
          var e = d = Math.round(100 * d) / 100;
          a.scrollArrX[b + c].scrollbarPositionBase = e;
          e = Math.round(e / a.scrollArrX[b + c].limit * -a.scrollArrX[b + c].scrollDomWidth);
          u.style.cssText = a.ua.ios ? "width:" + a.scrollArrX[b + c].scrollBarWidth + "px;-webkit-transform:translateX(" + e + "px) translateZ(0);" : "width:" + a.scrollArrX[b + c].scrollBarWidth + "px;-webkit-transform:translate3d(" + e + "px,0,0);";
          return a.storage.user && a.ua.ios ? "-webkit-transform:translateX(" + d + "px) translateZ(0);" : "-webkit-transform:translate3d(" + d + "px,0,0);"
        },
        v = function()
        {
          if (a.isDoubleTouch()) e(g);
          else if (a.doc.getElementById(b))
            if (1 > a.doc.getElementById(b).getElementsByClassName(c).length) e(g);
            else
            {
              var k = 0 > h ? -1 * h : h;
              !f || !m || .1 > k || r || !a.doc.getElementById(b) || !a.scrollArrX[b + c] || a.scrollArrX[b + c].thisPage !== a.location ? e(g) : (a.scrollArrX[b + c].scrollCount += h, 0 <= a.scrollArrX[b + c].scrollCount ? (m.style.cssText = q + t(0), a.scrollArrX[b + c].scrollCount = Math.round(a.scrollArrX[b + c].scrollCount), a.scrollArrX[b + c].touchStartNum = 0, a.removeClass(u, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange")) : -a.scrollArrX[b + c].scrollCount >= a.scrollArrX[b + c].limit - a.scrollArrX[b + c].scrollDomWidth ? (a.scrollArrX[b + c].scrollCount = Math.round(a.scrollArrX[b + c].scrollCount), a.scrollArrX[b + c].touchStartNum = -a.scrollArrX[b + c].limit + a.scrollArrX[b + c].scrollDomWidth, m.style.cssText = q + t(a.scrollArrX[b + c].touchStartNum), a.removeClass(u, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange")) : (m.style.cssText = q + t(a.scrollArrX[b + c].scrollCount), f && m && !(.1 > k) && !r && a.doc.getElementById(b) && a.scrollArrX[b + c] && (h *= .95, a.scrollArrX[b + c].touchStartNum = a.scrollArrX[b + c].scrollCount, .6 < k ? g = d(v) : (a.removeClass(u, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange")))))
            }
          else e(g)
        };
      a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("touchstart", function(d)
      {
        r = !0;
        a.isDoubleTouch() ? e(g) : !a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length || (l = a.scrollArrX[b + c].lastDom, h = 0, a.scrollArrX[b + c].scrollCount = Math.round(a.scrollArrX[b + c].scrollCount), a.scrollArrX[b + c].scrollDomWidth > a.scrollArrX[b + c].limit || (a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"), k = d.changedTouches[0].clientX))
      });
      a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("touchmove", function(d)
      {
        d.preventDefault();
        a.isDoubleTouch() || a.androidKeyForceStop ? e(g) : a.doc.getElementById(b) ? 1 > a.doc.getElementById(b).getElementsByClassName(c).length ? e(g) : (u.classList.contains("onScroll") || a.addClass(u, "onScroll"), a.scrollArrX[b + c].scrollDomWidth > a.scrollArrX[b + c].limit ? e(g) : (h = -(a.scrollArrX[b + c].scrollCount - (a.scrollArrX[b + c].touchStartNum + (d.changedTouches[0].clientX - k))), a.scrollArrX[b + c].scrollCount = a.scrollArrX[b + c].touchStartNum + (d.changedTouches[0].clientX - k), 0 < a.scrollArrX[b + c].scrollCount ? (m.style.cssText !== q + t(0) && (m.style.cssText = q + t(0)), a.scrollArrX[b + c].scrollCount = 0) : -a.scrollArrX[b + c].scrollCount >= a.scrollArrX[b + c].limit - a.scrollArrX[b + c].scrollDomWidth ? (a.scrollArrX[b + c].scrollCount = -a.scrollArrX[b + c].limit + a.scrollArrX[b + c].scrollDomWidth, a.scrollArrX[b + c].touchStartNum = -a.scrollArrX[b + c].limit + a.scrollArrX[b + c].scrollDomWidth, m.style.cssText = q + t(a.scrollArrX[b + c].touchStartNum)) : m.style.cssText = q + t(a.scrollArrX[b + c].scrollCount))) : e(g)
      }, !0);
      a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("touchend", function(k)
      {
        a.isDoubleTouch() ? e(g) : (r = !1, f && m && a.doc.getElementById(b) && a.scrollArrX[b + c] && a.scrollArrX[b + c].thisPage === a.location) ? !a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length || (0 <= a.scrollArrX[b + c].scrollCount ? (a.scrollArrX[b + c].touchStartNum = 0, a.removeClass(u, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange")) : -a.scrollArrX[b + c].scrollCount >= a.scrollArrX[b + c].limit - a.scrollArrX[b + c].scrollDomWidth ? (a.scrollArrX[b + c].touchStartNum = -a.scrollArrX[b + c].limit + a.scrollArrX[b + c].scrollDomWidth, a.removeClass(u, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange")) : (a.scrollArrX[b + c].touchStartNum = a.scrollArrX[b + c].scrollCount, 1 < (0 > h ? -1 * h : h) ? g = d(v) : (a.removeClass(u, "onScroll"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollWillChange"))), "charaListScrollWrap" === a.scrollArrX[b + c].targetId && (a.lastScrollCountX = a.scrollArrX[b + c].scrollCount)) : e(g)
      }, !0);
      a.scrollArrX[b + c].setScroll = function(d)
      {
        var e = 0;
        d.scrollCountX && (e = d.scrollCountX);
        m.style.cssText = q + t(e);
        a.scrollArrX[b + c].touchStartNum = e
      }
    }
  };
  a.scrollRefresh = function(b, c, d, e)
  {
    if (a.scrollArr || a.scrollArrX)
    {
      var g = function(b)
        {
          return a.storage.user && a.ua.ios ? "-webkit-transform:translateY(" + b + "px);" : "-webkit-transform:translate3d(0," + b + "px,0);"
        },
        k = function(b)
        {
          return a.storage.user && a.ua.ios ? "-webkit-transform:translateX(" + b + "px);" : "-webkit-transform:translate3d(" + b + "px,0,0);"
        },
        h = a.location,
        f, m, n, l;
      if (b && c)
        if (a.scrollArr && a.scrollArr[b + c + h])
          if (!a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length || a.scrollArr[b + c + h].thisPage !== a.location) delete a.scrollArr[b + c + h];
          else
          {
            a.scrollArr[b + c + h].stopVelocity = !0;
            f = a.doc.getElementById(b);
            k = f.offsetHeight;
            a.scrollArr[b + c + h].domHeight = k;
            f = a.doc.getElementById(b).getElementsByClassName(a.scrollArr[b + c + h].innerClass)[0];
            var p = f.offsetHeight;
            a.scrollArr[b + c + h].limit = p;
            n = a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0];
            l = d ? 0 : Math.round(a.scrollArr[b + c + h].scrollbarPositionBase / p * -k);
            a.scrollArr[b + c + h].scrollBarHeight = Math.round(k * k / p);
            if (p <= k || d) m = f.style.cssText, f.style.cssText = m + g(0), a.scrollArr[b + c + h].scrollCount = 0, a.scrollArr[b + c + h].touchStartNum = 0;
            l + a.scrollArr[b + c + h].scrollBarHeight >= k && !d && (m = f.style.cssText, f.style.cssText = m + g(-1 * (p - k)), a.scrollArr[b + c + h].scrollCount = -1 * (p - k));
            n && (n.style.cssText = a.ua.ios ? "height:" + a.scrollArr[b + c + h].scrollBarHeight + "px;-webkit-transform:translateY(" + l + "px);" : "height:" + a.scrollArr[b + c + h].scrollBarHeight + "px;-webkit-transform:translate3d(0," + l + "px,0);");
            e && a.forceScrollArr && a.forceScrollArr[b + c] && (d = a.forceScrollArr[b + c].split(","), a.forceScroll(b, c, d[0], d[1]), a.forceScrollArr[b + c] = void 0)
          }
      else
      {
        if (a.scrollArrX && a.scrollArrX[b + c])
          if (!a.doc.getElementById(b) || 1 > a.doc.getElementById(b).getElementsByClassName(c).length) delete a.scrollArrX[b + c];
          else
          {
            f = a.doc.getElementById(b);
            a.scrollArrX[b + c].scrollDomWidth = f.offsetWidth;
            f = a.doc.getElementById(b).getElementsByClassName(a.scrollArrX[b + c].innerClass)[0];
            g = f.childNodes;
            h = g.length;
            m = g[h - 1];
            for (n = m.offsetLeft; 0 < h;) h = h - 1 | 0, g[h].offsetLeft > n && (m = g[h], n = m.offsetLeft);
            a.scrollArrX[b + c].lastDom = m;
            a.scrollArrX[b + c].lastDomOffLeft = n;
            a.scrollArrX[b + c].limit = a.scrollArrX[b + c].lastDomOffLeft + m.offsetWidth + 10;
            n = a.doc.getElementById(b).getElementsByClassName("scrollIndicatorInner")[0];
            l = d ? 0 : Math.round(a.scrollArrX[b + c].scrollbarPositionBase / a.scrollArrX[b + c].limit * -a.scrollArrX[b + c].scrollDomWidth);
            a.scrollArrX[b + c].scrollBarWidth = Math.round(a.scrollArrX[b + c].scrollDomWidth * a.scrollArrX[b + c].scrollDomWidth / a.scrollArrX[b + c].limit);
            g = !1;
            a.scrollArrX[b + c].scrollDomWidth > a.scrollArrX[b + c].lastDomOffLeft + m.offsetWidth && (g = !0, l = 0);
            a.scrollArrX[b + c].scrollBarWidth > a.scrollArrX[b + c].scrollDomWidth && (a.scrollArrX[b + c].scrollBarWidth = a.scrollArrX[b + c].scrollDomWidth);
            if (a.scrollArrX[b + c].limit <= a.scrollArrX[b + c].scrollDomWidth || d || g) m = f.style.cssText, f.style.cssText = m + k(0), a.scrollArrX[b + c].scrollCount = 0, a.scrollArrX[b + c].touchStartNum = 0;
            l + a.scrollArrX[b + c].scrollBarWidth >= a.scrollArrX[b + c].scrollDomWidth && !d && (m = f.style.cssText, f.style.cssText = m + k(-1 * (a.scrollArrX[b + c].limit - a.scrollArrX[b + c].scrollDomWidth)), a.scrollArrX[b + c].scrollCount = -1 * (a.scrollArrX[b + c].limit - a.scrollArrX[b + c].scrollDomWidth));
            n && (n.style.cssText = a.ua.ios ? "width:" + a.scrollArrX[b + c].scrollBarWidth + "px;-webkit-transform:translateX(" + l + "px);" : "width:" + a.scrollArrX[b + c].scrollBarWidth + "px;-webkit-transform:translate3d(" + l + "px,0,0);");
            e && a.forceScrollXArr && a.forceScrollXArr[b + c] && (d = a.forceScrollXArr[b + c].split(","), a.forceScrollX(b, c, d[0], d[1]), a.forceScrollXArr[b + c] = void 0)
          }
      }
      else
      {
        for (f in a.scrollArr)
          if (a.scrollArr[f].thisPage !== a.location) delete a.scrollArr[f];
          else if (c = a.doc.getElementById(a.scrollArr[f].targetId), !c || 1 > c.getElementsByClassName(a.scrollArr[f].innerClass).length) delete a.scrollArr[f];
        else
        {
          a.scrollArr[f].stopVelocity = !0;
          n = c.offsetHeight;
          a.scrollArr[f].domHeight = n;
          b = a.doc.getElementById(a.scrollArr[f].targetId).getElementsByClassName(a.scrollArr[f].innerClass)[0];
          a.scrollArr[f].limit = b.offsetHeight;
          c = a.doc.getElementById(a.scrollArr[f].targetId).getElementsByClassName("scrollIndicatorInner")[0];
          h = d ? 0 : Math.round(a.scrollArr[f].scrollbarPositionBase / a.scrollArr[f].limit * -n);
          a.scrollArr[f].scrollBarHeight = Math.round(n * n / a.scrollArr[f].limit);
          if (a.scrollArr[f].limit <= n || d) m = b.style.cssText, b.style.cssText = m + g(0), a.scrollArr[f].scrollCount = 0, a.scrollArr[f].touchStartNum = 0;
          h + a.scrollArr[f].scrollBarHeight >= n && !d && (m = b.style.cssText, b.style.cssText = m + g(-1 * (a.scrollArr[f].limit - n)), a.scrollArr[f].scrollCount = -1 * (a.scrollArr[f].limit - n));
          c && (Infinity !== a.scrollArr[f].scrollBarHeight ? c.style.cssText = a.ua.ios ? "height:" + a.scrollArr[f].scrollBarHeight + "px;-webkit-transform:translateY(" + h + "px);" : "height:" + a.scrollArr[f].scrollBarHeight + "px;-webkit-transform:translate3d(0," + h + "px,0);" : a.scrollArr[f].scrollBarHeight = a.scrollArr[f].limit);
          e && a.forceScrollArr && a.forceScrollArr[a.scrollArr[f].targetId + a.scrollArr[f].innerClass] && (b = a.forceScrollArr[a.scrollArr[f].targetId + a.scrollArr[f].innerClass].split(","), a.forceScroll(a.scrollArr[f].targetId, a.scrollArr[f].innerClass, b[0], b[1]), a.forceScrollArr[a.scrollArr[f].targetId + a.scrollArr[f].innerClass] = void 0)
        }
        for (f in a.scrollArrX)
          if (b = ["CharaListTop", "CharaListCompose", "CharaListComposeMagia", "CharaListCustomize", "CharaListEquip"], -1 < b.indexOf(a.location) && -1 < b.indexOf(a.scrollArrX[f].thisPage) && a.doc.getElementById(a.scrollArrX[f].targetId) && (a.scrollArrX[f].thisPage = a.location), a.scrollArrX[f].thisPage !== a.location) delete a.scrollArrX[f];
          else if (c = a.doc.getElementById(a.scrollArrX[f].targetId), !c || 1 > c.getElementsByClassName(a.scrollArrX[f].innerClass).length)
        {
          if (void 0 == a.scrollArr) break;
          delete a.scrollArr[f]
        }
        else
        {
          b = a.doc.getElementById(a.scrollArrX[f].targetId).getElementsByClassName(a.scrollArrX[f].innerClass)[0];
          g = b.childNodes;
          a.scrollArrX[f].scrollDomWidth = c.offsetWidth;
          m = g.length;
          h = g[m - 1];
          for (c = h.offsetLeft; 0 < m;) m = m - 1 | 0, g[m].offsetLeft > c && (h = g[m], c = h.offsetLeft);
          a.scrollArrX[f].lastDom = h;
          g = h.offsetWidth;
          a.scrollArrX[f].lastDomOffLeft = c;
          a.scrollArrX[f].limit = a.scrollArrX[f].lastDomOffLeft + g + 10;
          c = a.doc.getElementById(a.scrollArrX[f].targetId).getElementsByClassName("scrollIndicatorInnerX")[0];
          h = d ? 0 : Math.round(a.scrollArrX[f].scrollbarPositionBase / b.offsetWidth * -a.scrollArrX[f].scrollDomWidth);
          a.scrollArrX[f].scrollBarWidth = Math.round(a.scrollArrX[f].scrollDomWidth * a.scrollArrX[f].scrollDomWidth / a.scrollArrX[f].limit);
          n = !1;
          a.scrollArrX[f].scrollDomWidth > a.scrollArrX[f].lastDomOffLeft + g && (n = !0, h = 0);
          a.scrollArrX[f].scrollBarWidth > a.scrollArrX[f].scrollDomWidth && (a.scrollArrX[f].scrollBarWidth = a.scrollArrX[f].scrollDomWidth);
          h + a.scrollArrX[f].scrollDomWidth >= a.scrollArrX[f].limit && !d && (m = b.style.cssText, b.style.cssText = m + k(-1 * (a.scrollArrX[f].limit - a.scrollArrX[f].scrollDomWidth)), a.scrollArrX[f].scrollCount = -1 * (a.scrollArrX[f].limit - a.scrollArrX[f].scrollDomWidth), a.scrollArrX[f].touchStartNum = -1 * (a.scrollArrX[f].limit - a.scrollArrX[f].scrollDomWidth));
          if (a.scrollArrX[f].limit <= a.scrollArrX[f].scrollDomWidth || d || n) m = b.style.cssText, b.style.cssText = m + k(0), a.scrollArrX[f].scrollCount = 0, a.scrollArrX[f].touchStartNum = 0;
          c && (c.style.cssText = a.ua.ios ? "width:" + a.scrollArrX[f].scrollBarWidth + "px;-webkit-transform:translateX(" + h + "px);" : "width:" + a.scrollArrX[f].scrollBarWidth + "px;-webkit-transform:translate3d(" + h + "px,0,0);");
          e && a.forceScrollXArr && a.forceScrollXArr[a.scrollArrX[f].targetId + a.scrollArrX[f].innerClass] && (b = a.forceScrollXArr[a.scrollArrX[f].targetId + a.scrollArrX[f].innerClass].split(","), a.forceScrollX(a.scrollArrX[f].targetId, a.scrollArrX[f].innerClass, b[0], b[1]), a.forceScrollXArr[a.scrollArrX[f].targetId + a.scrollArrX[f].innerClass] = void 0)
        }
      }
    }
  };
  a.scrollDestroy = function(b, c)
  {
    var d = a.location;
    if (b && a.scrollArr[b + c + d]) a.doc.getElementById(b) || delete a.scrollArr[b + c + d];
    else if (b && a.scrollArrX[b + c]) a.doc.getElementById(b) || delete a.scrollArrX[b + c];
    else if (!b)
    {
      for (var e in a.scrollArr) delete a.scrollArr[e];
      if (-1 === ["CharaListTop", "CharaListCompose", "CharaListComposeMagia", "CharaListCustomize", "CharaListEquip"].indexOf(a.location))
      {
        for (var g in a.scrollArrX) delete a.scrollArrX[g];
        a.scrollArrX = {}
      }
      a.scrollArr = {}
    }
    a.scrollRefresh()
  };
  a.forceScrollPreset = function(b, c, d, e)
  {
    a.forceScrollArr || (a.forceScrollArr = []);
    a.forceScrollArr[b + c] = d + "," + e;
    e && a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollForceInvisible")
  };
  a.forceScrollXPreset = function(b, c, d, e)
  {
    a.forceScrollXArr || (a.forceScrollXArr = []);
    a.forceScrollXArr[b + c] = d + "," + e;
    e && a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollForceInvisible")
  };
  a.forceScroll = function(b, c, d, e)
  {
    if (!a.forceScrollFlag)
    {
      a.forceScrollFlag = !0;
      var g = a.doc.getElementById(b);
      if (g)
      {
        var k = g.getElementsByClassName(c)[0];
        if (k)
          if (d = a.doc.querySelectorAll('[data-scroll-hash="' + d + '"]')[0])
          {
            var h = a.location;
            if (a.scrollArr[b + c + h])
            {
              var f = g.getElementsByClassName("scrollIndicatorInner")[0],
                m,
                n;
              a.ua.ios ? (m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
              {
                window.setTimeout(a, 10)
              }, n = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
              {
                window.setTimeout(a)
              }) : (m = function(a)
              {
                window.setTimeout(a, 10)
              }, n = function(a)
              {
                window.clearTimeout(a)
              });
              var l = 0,
                p = !1,
                q = null,
                r = function()
                {
                  if (a.forceScrollFlag && g && k && !(.1 > A) && a.doc.getElementById(b) && a.scrollArr[b + c + h] && a.scrollArr[b + c + h].thisPage === a.location)
                    if (1 > k.length) a.forceScrollFlag = !1;
                    else if (a.scrollArr[b + c + h].scrollCount += l, A = 0 > l ? -1 * l : l, -a.scrollArr[b + c + h].scrollCount >= a.scrollArr[b + c + h].limit - g.offsetHeight) a.scrollArr[b + c + h].scrollCount = Math.round(a.scrollArr[b + c + h].scrollCount), a.scrollArr[b + c + h].touchStartNum = -a.scrollArr[b + c + h].limit + g.offsetHeight, k.style.cssText = a.scrollArr[b + c + h].defaultCss + v(a.scrollArr[b + c + h].touchStartNum), a.removeClass(f, "onScroll"), a.forceScrollFlag = !1, a.removeClass(k, "scrollForce");
                  else if (k.style.cssText = a.scrollArr[b + c + h].defaultCss + v(a.scrollArr[b + c + h].scrollCount), g && k && g && a.scrollArr[b + c + h])
                  {
                    a.scrollArr[b + c + h].touchStartNum = a.scrollArr[b + c + h].scrollCount;
                    var d = -a.scrollArr[b + c + h].scrollCount - -t,
                      d = 0 > d ? -1 * d : d;
                    d < (u + a.scrollArr[b + c + h].scrollCount) / 100 * -30 && (p ? l *= .99 : (l = 0 < l ? d / 20 : d / 20 * -1, p = !0));
                    3 > d || q && q < d ? (a.scrollArr[b + c + h].scrollCount = t, a.scrollArr[b + c + h].touchStartNum = t, k.style.cssText = a.scrollArr[b + c + h].defaultCss + v(a.scrollArr[b + c + h].touchStartNum), a.removeClass(f, "onScroll"), p = !1, a.forceScrollFlag = !1, a.removeClass(k, "scrollForce")) : (F = m(r), q = d)
                  }
                  else a.forceScrollFlag = !1, a.removeClass(k, "scrollForce");
                  else n(F), a.forceScrollFlag = !1, a.removeClass(k, "scrollForce")
                },
                v = function(d)
                {
                  var e = d = Math.round(100 * d) / 100;
                  a.scrollArr[b + c + h].scrollbarPositionBase = e;
                  e = Math.round(e / k.offsetHeight * -g.offsetHeight);
                  f.style.cssText = a.ua.ios ? "height:" + a.scrollArr[b + c + h].scrollBarHeight + "px;-webkit-transform:translateY(" + e + "px) translateZ(0);" : "height:" + a.scrollArr[b + c + h].scrollBarHeight + "px;-webkit-transform:translate3d(0," + e + "px,0);";
                  return a.ua.ios ? "-webkit-transform:translateY(" + d + "px) translateZ(0);" : "-webkit-transform:translate3d(0," + d + "px,0);"
                },
                u = a.scrollArr[b + c + h].touchStartNum,
                t = -1 * d.offsetTop + 15;
              0 < t && (t = 0);
              if (u === t)
              {
                a.forceScrollFlag = !1;
                a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn");
                var x = function()
                {
                  a.doc.getElementById(b).getElementsByClassName(c)[0] && (a.doc.getElementById(b).getElementsByClassName(c)[0].removeEventListener("webkitAnimationEnd", x), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollForceInvisible"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn"))
                };
                a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("webkitAnimationEnd", x);
                a.removeClass(k, "scrollForce")
              }
              else if (a.addClass(k, "scrollForce"), "true" === e || !0 === e)
              {
                a.scrollArr[b + c + h].scrollCount = t;
                a.scrollArr[b + c + h].touchStartNum = t; - a.scrollArr[b + c + h].scrollCount >= a.scrollArr[b + c + h].limit - g.offsetHeight && (a.scrollArr[b + c + h].scrollCount = Math.round(a.scrollArr[b + c + h].scrollCount), a.scrollArr[b + c + h].touchStartNum = -a.scrollArr[b + c + h].limit + g.offsetHeight);
                k.style.cssText = a.scrollArr[b + c + h].defaultCss + v(a.scrollArr[b + c + h].touchStartNum);
                a.removeClass(f, "onScroll");
                p = !1;
                a.forceScrollFlag = !1;
                a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn");
                var z = function()
                {
                  a.doc.getElementById(b).getElementsByClassName(c)[0] && (a.doc.getElementById(b).getElementsByClassName(c)[0].removeEventListener("webkitAnimationEnd", z), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollForceInvisible"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn"))
                };
                a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("webkitAnimationEnd", z);
                a.removeClass(k, "scrollForce")
              }
              else
              {
                e = -u - (d.offsetTop - 15);
                l = (0 > e ? e : -e) / 20;
                u < t && (l *= -1);
                var A = 0 > l ? -1 * l : l,
                  F = r()
              }
            }
            else a.forceScrollFlag = !1, a.removeClass(k, "scrollForceInvisible")
          }
        else a.forceScrollFlag = !1, a.removeClass(k, "scrollForceInvisible");
        else a.forceScrollFlag = !1
      }
      else a.forceScrollFlag = !1
    }
  };
  a.forceScrollX = function(b, c, d, e)
  {
    if (!a.forceScrollFlag)
    {
      a.forceScrollFlag = !0;
      var g = a.doc.getElementById(b);
      if (g)
      {
        var k = g.getElementsByClassName(c)[0];
        if (k && (d = a.doc.querySelectorAll('[data-scroll-hash="' + d + '"]')[0]) && a.scrollArrX[b + c])
        {
          var h = g.getElementsByClassName("scrollIndicatorInnerX")[0],
            f, m;
          a.ua.ios ? (f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
          {
            window.setTimeout(a, 10)
          }, m = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
          {
            window.setTimeout(a)
          }) : (f = function(a)
          {
            window.setTimeout(a, 10)
          }, m = function(a)
          {
            window.clearTimeout(a)
          });
          var n = 0,
            l = !1,
            p = null,
            q = function()
            {
              if (a.forceScrollFlag && g && k && !(.1 > z) && a.doc.getElementById(b) && a.scrollArrX[b + c])
                if (1 > k.length) a.forceScrollFlag = !1;
                else if (a.scrollArrX[b + c].scrollCount += n, z = 0 > n ? -1 * n : n, -a.scrollArrX[b + c].scrollCount >= a.scrollArrX[b + c].limit - g.offsetWidth) a.scrollArrX[b + c].scrollCount = Math.round(a.scrollArrX[b + c].scrollCount), a.scrollArrX[b + c].touchStartNum = -a.scrollArrX[b + c].limit + g.offsetWidth, k.style.cssText = a.scrollArrX[b + c].defaultCss + r(a.scrollArrX[b + c].touchStartNum), a.removeClass(h, "onScroll"), a.forceScrollFlag = !1, a.removeClass(k, "scrollForce");
              else if (k.style.cssText = a.scrollArrX[b + c].defaultCss + r(a.scrollArrX[b + c].scrollCount), g && k && g && a.scrollArrX[b + c])
              {
                a.scrollArrX[b + c].touchStartNum = a.scrollArrX[b + c].scrollCount;
                var d = -a.scrollArrX[b + c].scrollCount - -u,
                  d = 0 > d ? -1 * d : d;
                d < (v + a.scrollArrX[b + c].scrollCount) / 100 * -30 && (l ? n *= .99 : (n = 0 < n ? d / 20 : d / 20 * -1, l = !0));
                3 > d || p && p < d ? (a.scrollArrX[b + c].scrollCount = u, a.scrollArrX[b + c].touchStartNum = u, k.style.cssText = a.scrollArrX[b + c].defaultCss + r(a.scrollArrX[b + c].touchStartNum), a.removeClass(h, "onScroll"), l = !1, a.forceScrollFlag = !1, a.removeClass(k, "scrollForce")) : (A = f(q), p = d)
              }
              else a.forceScrollFlag = !1, a.removeClass(k, "scrollForce");
              else m(A), a.removeClass(k, "scrollForce")
            },
            r = function(d)
            {
              var e = d = Math.round(100 * d) / 100;
              a.scrollArrX[b + c].scrollbarPositionBase = e;
              e = Math.round(e / k.offsetWidth * -g.offsetWidth);
              h.style.cssText = a.ua.ios ? "height:" + a.scrollArrX[b + c].scrollBarHeight + "px;-webkit-transform:translateY(" + e + "px) translateZ(0);" : "height:" + a.scrollArrX[b + c].scrollBarHeight + "px;-webkit-transform:translate3d(0," + e + "px,0);";
              return a.ua.ios ? "-webkit-transform:translateX(" + d + "px) translateZ(0);" : "-webkit-transform:translate3d(" + d + "px,0,0);"
            },
            v = a.scrollArrX[b + c].touchStartNum,
            u = -1 * d.offsetLeft + 15;
          0 < u && (u = 0);
          if (v === u)
          {
            a.forceScrollFlag = !1;
            a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn");
            var t = function()
            {
              a.doc.getElementById(b).getElementsByClassName(c)[0] && (a.doc.getElementById(b).getElementsByClassName(c)[0].removeEventListener("webkitAnimationEnd", t), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollForceInvisible"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn"))
            };
            a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("webkitAnimationEnd", t);
            a.removeClass(k, "scrollForce")
          }
          else if (a.addClass(k, "scrollForce"), "true" === e || !0 === e)
          {
            a.scrollArrX[b + c].scrollCount = u;
            a.scrollArrX[b + c].touchStartNum = u; - a.scrollArrX[b + c].scrollCount >= a.scrollArrX[b + c].limit - g.offsetWidth && (a.scrollArrX[b + c].scrollCount = Math.round(a.scrollArrX[b + c].scrollCount), a.scrollArrX[b + c].touchStartNum = -a.scrollArrX[b + c].limit + g.offsetWidth);
            k.style.cssText = a.scrollArrX[b + c].defaultCss + r(a.scrollArrX[b + c].touchStartNum);
            a.removeClass(h, "onScroll");
            l = !1;
            a.forceScrollFlag = !1;
            a.addClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn");
            var x = function()
            {
              a.doc.getElementById(b).getElementsByClassName(c)[0] && (a.doc.getElementById(b).getElementsByClassName(c)[0].removeEventListener("webkitAnimationEnd", x), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "scrollForceInvisible"), a.removeClass(a.doc.getElementById(b).getElementsByClassName(c)[0], "fadeIn"))
            };
            a.doc.getElementById(b).getElementsByClassName(c)[0].addEventListener("webkitAnimationEnd", x);
            a.removeClass(k, "scrollForce")
          }
          else
          {
            e = -v - (d.offsetLeft - 15);
            n = (0 > e ? e : -e) / 20;
            v < u && (n *= -1);
            var z = 0 > n ? -1 * n : n,
              A = q()
          }
        }
      }
    }
  };
  a.nativeKeyBoard = function(b, c, d, e, g)
  {
    b && (c || (c = 50), d || (d = 0), 0 > c && (c = 0), require(["command"], function(k)
    {
      var h = function(f)
      {
        f.preventDefault();
        a.isScrolled() || a.isDoubleTouch() || !a.doc.getElementById(b) || (window.isBrowser || a.tapBlock(!0), l("#commandDiv").on("nativeCallback", function(d, f)
        {
          l("#commandDiv").off();
          a.tapBlock(!1);
          a.doc.getElementById(b) && ("error" === f.resultCode ? new a.PopupClass(
          {
            title: f.title,
            content: f.errorTxt,
            closeBtnText: "OK"
          }) : (f = (d = f.text) && d.length ? d.length : 0, c && 0 < c && f > c && (d = d.substr(0, c)), a.doc.getElementById(b).value = d, e && a.doc.getElementById(e) && (a.doc.getElementById(e).textContent = f), g && g()))
        }), f = a.doc.getElementById(b).value, k.openKeyBoard(f, c, d), a.doc.getElementById(b).removeEventListener(a.cgti, h), a.doc.getElementById(b).removeAttribute("readonly"), e && a.doc.getElementById(b).addEventListener("keyup", function()
        {
          var d = a.doc.getElementById(b).value,
            f = d && d.length ? d.length : 0;
          0 < c && f > c && (d = d.substr(0, c), a.doc.getElementById(b).value = d);
          a.doc.getElementById(e).textContent = f
        }), window.isBrowser && nativeCallback(
        {
          text: ""
        }))
      };
      a.doc.getElementById(b).addEventListener(a.cgti, h)
    }))
  };
  a.imageZoomView = function(b)
  {
    var c = b.currentTarget;
    "IMG" !== c.tagName && "img" !== c.tagName || new(x.View.extend(
    {
      id: "overImageZoom",
      events: function()
      {
        var b = {};
        b[a.cgti] = this.removeView;
        return b
      },
      initialize: function(b)
      {
        a.androidKeyForceStop = !0;
        a.addClass(a.doc.getElementById("curtain"), "show");
        this.createDom()
      },
      render: function()
      {
        var b = a.doc.createElement("img");
        b.src = c.src;
        this.el.appendChild(b);
        return this.el
      },
      createDom: function()
      {
        a.doc.getElementById("overlapContainer").appendChild(this.render());
        a.doc.getElementById("overlapContainer").style.zIndex = "1000001"
      },
      removeView: function()
      {
        a.removeClass(a.doc.getElementById("curtain"), "show");
        a.androidKeyForceStop = !1;
        a.doc.getElementById("overlapContainer").style.zIndex = "";
        this.off();
        this.remove()
      }
    }))
  };
  a.isRankingRunning = function(a)
  {
    var b = a.regularEventList,
      d = !1;
    a = q.findWhere(a.eventList,
    {
      eventType: "ARENARANKING"
    });
    b = q.findWhere(b,
    {
      regularEventType: "ARENARANKMATCH"
    });
    a ? d = "ARENARANKING" : b && (d = "ARENARANKMATCH");
    return d
  };
  a.compareVersion = function(a, c)
  {
    var b = !1;
    if (a !== c)
    {
      a = a.split(".");
      c = c.split(".");
      for (var e = Math.min(a.length, c.length), g = 0; g < e; g++)
        if (parseInt(a[g]) > parseInt(c[g]))
        {
          b = !0;
          break
        }
      else parseInt(a[g]) < parseInt(c[g]) && (b = !1)
    }
    else b = !0;
    return b
  };
  var E = !1;
  a.toastStop = !1;
  a.toastQueue = [];
  a.toastAppear = function(b)
  {
    if (!E)
    {
      E = !0;
      var c;
      switch (b)
      {
        case "title":
          c = "新しい称号を獲得しました"
      }
      a.toastStop ? a.toastQueue.push(c) : (a.doc.getElementById("toastPushArea").textContent = c, l("#toastPushArea").on("webkitAnimationEnd", function()
      {
        l("#toastPushArea").off();
        a.removeClassId("toastPushArea", "show");
        a.doc.getElementById("toastPushArea").textContent = "";
        E = !1
      }), a.addClassId("toastPushArea", "show"))
    }
  };
  a.toastTriggerAppear = function()
  {
    1 > a.toastQueue.length || (E = !0, a.doc.getElementById("toastPushArea").textContent = a.toastQueue[0], l("#toastPushArea").on("webkitAnimationEnd", function()
    {
      l("#toastPushArea").off();
      a.removeClassId("toastPushArea", "show");
      a.toastQueue.splice(0, 1);
      1 > a.toastQueue.length ? (a.doc.getElementById("toastPushArea").textContent = "", E = !1) : setTimeout(function()
      {
        a.toastTriggerAppear()
      }, 500)
    }), a.addClassId("toastPushArea", "show"))
  };
  var L = !1;
  a.setTitleCollectionObserved = function()
  {
    a.storage.userTitleList && !L && (L = !0, a.storage.userTitleList.on("add", function()
    {
      a.toastAppear("title")
    }))
  };
  a.getTargetComposeAttribute = function(b)
  {
    var c = b.attributeId,
      d = !1;
    b.userStatusList && (d = b.userStatusList);
    var e = {
        attributeId: "NONE",
        composed:
        {
          ATTACK: 0,
          DEFENSE: 0,
          HP: 0
        }
      },
      g = ["HP", "ATTACK", "DEFENSE"];
    if (!d && a.storage.userStatusList) d = a.storage.userStatusList.toJSON();
    else if (!c) return e;
    q.each(d, function(a, b, d)
    {
      ~a.statusId.indexOf(c) && (e.attributeId = c, q.each(g, function(b, c, d)
      {
        ~a.statusId.indexOf(b) && (e.composed[b] = a.point)
      }))
    });
    return e
  };
  a.convertTextBr = function(a)
  {
    return a.text.replace(/＠/g, "<br>")
  };
  a.consentRulesFunctions = function(b)
  {
    return {
      setTime: function(a)
      {
        localStorage.setItem("checkConsentRulesTime", a.currentTime)
      },
      isConsentRules: function(b)
      {
        b = b.currentTime;
        var c = !1,
          e = localStorage.getItem("checkConsentRulesTime");
        a.getStatusTargetTermInCurrentTime(
        {
          startAt: "2020/01/01 00:00:00",
          endAt: "2024/05/31 15:10:00",
          currentTime: b
        }) && (c = !0);
        e && a.getStatusTargetTermInCurrentTime(
        {
          startAt: "2024/05/31 15:10:00",
          endAt: "2200/01/01 00:00:00",
          currentTime: e
        }) && (c = !0);
        return c
      }
    }
  };
  return a
});
