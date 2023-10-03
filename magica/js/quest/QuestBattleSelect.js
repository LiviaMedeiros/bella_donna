define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/QuestBattleSelect.html text!css/quest/QuestBattleSelect.css text!css/quest/QuestCommon.css js/view/quest/QuestListPartsView js/quest/puellaHistoria/CreateModel text!template/quest/puellaHistoria/OutlinePopup.html js/view/quest/ClearAnimationsView".split(" "), function(k, A, a, p, g, z, B, C, D, x, y, E, F)
{
  var q, r, t, c, n, e = 0,
    u, G = A.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .missionBtn"] = this.missionToggle;
        b[a.cgti + " #advSkipPopBtn"] = this.advSkipSetting;
        b[a.cgti + " #puellaHistoriaTitle"] = this.tapPuellaHistoriaTitle;
        b[a.cgti + " #archiveBtn"] = this.tapPuellaHistoriaArchiveBtn;
        return b
      },
      initialize: function(a)
      {
        this.template = k.template(B);
        this.createDom()
      },
      render: function()
      {
        c.section.message = c.section.message.replace(/＠/g, "<br>");
        c.section.message = c.section.message.replace(/userName/g, a.storage.user.get("loginName"));
        this.halfAp && (c.section.halfAp = this.halfAp);
        "HARD" == a.mainQuestMode ? (this.challengeModeAp && (c.section.challengeModeAp = this.challengeModeAp), this.challengeModeDifficulty && (c.section.challengeModeDifficulty = this.challengeModeDifficulty)) : (c.section.challengeModeAp = !1, c.section.challengeModeDifficulty = !1);
        c.section.puellaHistoriaNum = e;
        this.$el.html(this.template(
        {
          model: c.section
        }));
        return this
      },
      createDom: function()
      {
        var b = !1;
        e = 0;
        a.setGlobalView();
        var l = p.getPageJson(),
          d = this;
        k.each(l.userSectionList, function(h)
        {
          t == h.sectionId && (h.section.questBattleList = [], k.each(l.userQuestBattleList, function(m)
          {
            h.section.sectionId === m.questBattle.sectionId && ("MAIN" == h.section.questType ? (m.questBattle.questBattleType == a.mainQuestMode && (h.section.questBattleList.push(m), "HARD" != a.mainQuestMode || d.challengeModeAp || (d.challengeModeAp = m.questBattle.ap || "-"), "HARD" != a.mainQuestMode || d.challengeModeDifficulty || (d.challengeModeDifficulty = m.questBattle.difficulty || "-")), "NONE" == m.questBattle.questBattleType && (h.section.questBattleList.push(m), b = !0)) : h.section.questBattleList.push(m))
          }), h.section.questBattleList.sort(function(a, b)
          {
            return a.questBattle.sectionIndex - b.questBattle.sectionIndex
          }), e = y.getIsPuellaHistoriaInfo(
          {
            sectionInfo: h
          }).num, c = h)
        });
        c || (a.tutorialId ? g.nativeReload("#/TopPage") : location.href = "#/MainQuest");
        d = this;
        this.halfAp = this.campaignData = null;
        this.freeAtNotClear = !1;
        l.campaignList && (this.campaignData = a.campaignParse(l.campaignList));
        this.campaignData && (this.campaignData.FREE_AT_NOT_CLEAR && (0 < this.campaignData.FREE_AT_NOT_CLEAR.sectionIds.length && 0 <= this.campaignData.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(c.sectionId)) ? this.freeAtNotClear = !0 : 0 < this.campaignData.FREE_AT_NOT_CLEAR.chapterIds.length && 0 <= this.campaignData.FREE_AT_NOT_CLEAR.chapterIds.indexOf(String(c.section.genericId)) ? this.freeAtNotClear = !0 : !this.freeAtNotClear && this.campaignData.FREE_AT_NOT_CLEAR.questType && k.each(this.campaignData.FREE_AT_NOT_CLEAR.questType, function(a, b)
        {
          if ("ALL" === a || a == c.section.questType) d.freeAtNotClear = !0
        })), this.campaignData.HALF_AP && k.each(this.campaignData.HALF_AP.questType, function(a, b)
        {
          if ("MAIN" == a || "SUB" == a) a == c.section.questType && (0 <= d.campaignData.HALF_AP.chapterIds.indexOf(String(c.section.genericId)) || 0 === d.campaignData.HALF_AP.chapterIds.length) && (d.halfAp = d.challengeModeAp ? Math.ceil(d.challengeModeAp / 2) : Math.ceil(c.section.ap / 2));
          else if ("ALL" == a || a == c.section.questType) d.halfAp = d.challengeModeAp ? Math.ceil(d.challengeModeAp / 2) : Math.ceil(c.section.ap / 2)
        }));
        k.each(l.userChapterList, function(a, b)
        {
          c.section.genericId == a.chapterId && (c.section.chapterNoForView = a.chapter.chapterNoForView, c.section.chapter = a.chapter)
        });
        switch (c.section.questType)
        {
          case "MAIN":
            c.section.questTypeText = "Main Story";
            break;
          case "SUB":
            c.section.questTypeText = "Another Story";
            break;
          case "CHARA":
            c.section.questTypeText = "Chara Story";
            break;
          case "COSTUME":
            c.section.questTypeText = "Costume Story"
        }
        var f = this.render().el;
        a.mainQuestMode && "HARD" == a.mainQuestMode && a.addClass(f.querySelector("#QuestBattleSelect"), "challenge");
        a.addClass(f.querySelector("#QuestBattleSelect"), c.section.questType);
        a.content.append(f);
        c.section.chapter && c.section.chapter.partNo && a.addClassId("QuestBattleSelect", "season" + c.section.chapter.partNo);
        b && a.addClassId("QuestBattleSelect", "questBattleTypeNONE");
        0 != e ? 99 == e ? (a.addClassId("QuestBattleSelect", "puellaHistoriaCommonStory"), g.changeBg("web_PuellaHistoria_19093_01.ExportJson"), g.startBgm("bgm21_system02")) : (a.addClassId("QuestBattleSelect", "puellaHistoria"), c.section.imagePath && g.changeBg("bg_adv_" + c.section.imagePath + ".jpg"), f = "bgm04_movie12", 1 == e ? f = "bgm01_battle05" : 2 == e ? f = "bgm03_story08" : 3 == e ? f = "bgm01_battle04" : 4 == e ? f = "bgm03_story18" : 5 == e ? f = "bgm05_event10" : 6 == e && (f = "bgm23_magus02"), g.startBgm(f)) : (c.section.imagePath && g.changeBg("bg_adv_" + c.section.imagePath + ".jpg"), g.startBgm("bgm04_movie12"));
        this.createQuestList();
        this.advSkipDomSet();
        this.setPuellaHistoriaOutlinesPopup();
        this.setSectionClearAnime(
        {
          callback: function()
          {
            var b = {};
            b.key = t;
            b.type = 1;
            b.id = "0";
            b.x = 280;
            b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
            g.startL2d(b)
          }
        })
      },
      createQuestList: function()
      {
        var b = this;
        x.prototype.parentView = this;
        x.prototype.template = k.template($("#QuestListParts").text());
        var l = !1,
          d = [];
        k.each(c.section.questBattleList, function(a, b)
        {
          if (!l || a.cleared) 0 != e && (a.puellaHistoriaNum = e), d.push(a), a.cleared || (l = !0)
        });
        if (0 != e)
        {
          var f = y.getPuellaHistoriaInfo(
            {
              puellaHistoriaNum: e,
              pageJson: r
            }),
            d = f.questInfoList;
          u = f.sectionInfoList
        }
        d.sort(function(a, b)
        {
          return a.questBattle.sectionIndex > b.questBattle.sectionIndex ? -1 : a.questBattle.sectionIndex < b.questBattle.sectionIndex ? 1 : 0
        });
        var h = a.doc.createDocumentFragment();
        k.each(d, function(c, d)
        {
          c.missionRewardCode = {
            itemCode: "",
            rewardType: ""
          };
          c.chestColor = "bronze_close";
          c.questBattle.missionRewardCode && (c.missionRewardCode = a.itemSet(c.questBattle.missionRewardCode), c.chestColor = c.missionRewardCode.chestColor);
          !c.cleared && b.freeAtNotClear ? c.campaignFreeAtNotClear = !0 : b.halfAp && (c.halfAp = b.halfAp);
          "NONE" == c.questBattle.questBattleType && k.each([1, 2, 3], function(a, b, d)
          {
            c.questBattle["missionMaster" + a] = {
              description: ""
            }
          });
          d = new x(
          {
            model: c
          });
          d.el.dataset.scrollHash = c.questBattleId;
          h.appendChild(d.render().el)
        });
        a.doc.getElementById("questLinkList").appendChild(h);
        a.scrollSet("scrollWrap", "scrollInner");
        v && !l && a.forceScrollPreset("scrollWrap", "scrollInner", v, !0);
        g.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      advSkipSetting: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          g.startSe(1002);
          var c = {
              skipAdventure: n ? !1 : !0
            },
            d = this;
          b = "";
          b = n ? 'を<span class="c_pink">再生する</span>' : 'は<span class="c_pink">再生しない</span>';
          var e = new a.PopupClass(
          {
            title: "既読ストーリーの再生設定",
            popupId: "advSkipSetPop",
            content: "クエストをプレイする際に<br>一度見たストーリー" + b + "設定に変更します。",
            decideBtnText: "OK",
            closeBtnText: "閉じる"
          }, null, function()
          {
            var b = function(b)
            {
              b && b.gameUser && (n = b.gameUser.skipAdventure, a.responseSetStorage(b), d.advSkipDomSet(n), e.remove())
            };
            $(".decideBtn").on(a.cgti, function(d)
            {
              d.preventDefault();
              a.isScrolled() || p.ajaxPost(a.linkList.setAdvSkip, c, b)
            })
          })
        }
      },
      tapPuellaHistoriaTitle: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/PuellaHistoriaTop")
      },
      tapPuellaHistoriaArchiveBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/StoryCollection/puellaHistoria")
      },
      advSkipDomSet: function(b)
      {
        n = void 0 !== b ? b : r.gameUser.skipAdventure;
        b = a.doc.querySelector("#advSkipPopBtn");
        n ? (a.addClass(b, "sb_gold_02"), a.removeClass(b, "on"), a.removeClass(b, "sb_gold_03")) : (a.addClass(b, "on"), a.addClass(b, "sb_gold_03"), a.removeClass(b, "sb_gold_02"))
      },
      modelSend: function()
      {
        return c
      },
      missionToggle: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          b = a.doc.querySelector("#questLinkList");
          var c = a.doc.querySelector("#questLinkList").className; - 1 !== c.indexOf("first") ? b.className = "second scrollInner" : -1 !== c.indexOf("second") && (b.className = "first scrollInner")
        }
      },
      setPuellaHistoriaOutlinesPopup: function()
      {
        var b = !!localStorage.getItem("puellaHistoriaOutlinesPopupAlready");
        99 == e && !b && u && (b = u[u.length - 1].section, new a.PopupClass(
        {
          title: b.title,
          outline: b.outline.replace(/＠/g, "<br>"),
          defaultCardId: b.defaultCardId,
          exClass: "puellaHistoriaOutlinePopup"
        }, E), g.getBaseData(a.getNativeObj()), localStorage.setItem("puellaHistoriaOutlinesPopupAlready", !0))
      },
      setSectionClearAnime: function(b)
      {
        var c = b.callback;
        if (0 != e && 99 != e && a.clearSectionModel && a.clearSectionModel.section && a.clearSectionModel.section.clearReward)
        {
          b = a.clearSectionModel.section;
          var d = z.clearRewardChestColor(b.clearReward),
            f = y.getIsPuellaHistoriaInfo(
            {
              sectionInfo: a.clearSectionModel
            });
          F.section(b.clearRewardCode, b, d, function()
          {
            f.isLastSection ? location.href = "#/PuellaHistoriaTop" : c()
          });
          g.getBaseData(a.getNativeObj());
          a.clearSectionModel = null
        }
        else c()
      }
    }),
    w = null,
    v = null;
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
    fetch: function(b, c)
    {
      if (b && 103305 == b && "NORMAL" == a.mainQuestMode) location.href = "#/MainQuest";
      else
      {
        c && (String(c).match(/TU/) ? w = c : v = c);
        if (t = b || null) a.mainPointId = b;
        p.pageModelGet(this.needModelIdObj)
      }
    },
    init: function()
    {
      if (w)
        if (a.tutorialId = w, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId), a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          g.nativeReload("#/TopPage");
          return
        } a.questBattleModel = null;
      a.setStyle(C + D);
      r = p.getPageJson();
      z.supportPickUp(r);
      q = new G
    },
    startCommand: function() {},
    remove: function(a)
    {
      g.endL2d();
      v = c = t = w = null;
      q && (q.trigger("removeView"), q.remove());
      a()
    }
  }
});
