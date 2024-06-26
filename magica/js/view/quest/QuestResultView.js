define("underscore backbone backboneCommon ajaxControl text!template/quest/QuestResult.html cardUtil command QuestUtil js/view/quest/QuestResultUnitPartView js/view/chara/CharaResultView js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility js/event/EventWitch/Utility js/event/EventWitch/parts/IconCharaGauge".split(" "), function(l, A, a, r, I, q, h, B, C, u, J, F, D, v, G)
{
  var d, w = A.Model.extend(),
    x = {},
    t = {},
    K = function(b)
    {
      var c, d = b.userQuestBattleResultList[0].questBattle.sectionId,
        f = b.userQuestBattleResultList[0].questBattleId,
        g = [];
      l.each(b.userQuestBattleList, function(a)
      {
        a.questBattle.sectionId == d && g.push(a)
      });
      var n = [];
      l.each(b.userSectionList, function(a, b)
      {
        d !== a.sectionId && n.push(a)
      });
      a.charaQuestBeforeType = null;
      a.charaQuestBeforeCharaId = null;
      var k = !0,
        h = a.storage.userSectionList;
      b = h.findWhere(
      {
        sectionId: d
      });
      var p = a.storage.userQuestBattleList.findWhere(
      {
        questBattleId: f
      });
      if (b)
        if (a.searchQuestGiftId && "MAIN" == b.toJSON().section.questType || a.searchQuestGiftId && "SUB" == b.toJSON().section.questType || a.searchQuestGiftId && "CHARA" == b.toJSON().section.questType || a.searchQuestGiftId && "COSTUME" == b.toJSON().section.questType) c = "#/SearchQuest/" + f, a.historyArr = ["MyPage", "SearchQuest"];
        else
        {
          a.searchQuestGiftId = null;
          b = b.toJSON();
          var m = b.section.questType;
          switch (m)
          {
            case "MAIN":
              p = p.toJSON();
              (m = a.storage.userChapterList.findWhere(
              {
                chapterId: b.section.genericId
              })) && (m = m.toJSON());
              p.questBattle.questBattleType && (a.mainQuestMode = p.questBattle.questBattleType);
              if (m && "SINGLERAID" == m.chapter.chapterType && !a.clearChapterModel || m && "BRANCH" == m.chapter.chapterType && !a.clearChapterModel) switch (a.mainChapterId || (a.mainChapterId = m.chapterId), 0 < n.length && (a.openSectionList = n), m.chapter.chapterType)
              {
                case "SINGLERAID":
                  c = "#/MainQuestSingleRaid";
                  a.historyArr = ["MyPage", "MainQuest", "MainQuestSingleRaid"];
                  break;
                case "BRANCH":
                  c = "#/MainQuestBranch", a.historyArr = ["MyPage", "MainQuest", "MainQuestBranch"]
              }
              else c = "#/MainQuest", a.historyArr = ["MyPage", "MainQuest"];
              break;
            case "SUB":
              c = "#/SubQuest";
              a.historyArr = ["MyPage", "SubQuest"];
              break;
            case "CHARA":
            case "COSTUME":
              a.charaQuestBeforeType = b.section.questType;
              a.charaQuestBeforeCharaId = b.section.genericId | 0;
              c = "#/CharaQuest";
              a.historyArr = ["MyPage", "CharaQuest"];
              break;
            default:
              k = !1, "EVENT_S" == m && (c = "#/EventTrainingTop/" + f, a.historyArr = ["MyPage", "EventTrainingTop"]), void 0 !== b.section.dayOfTheWeekQuestType && (c = "#/EventQuest/" + f, a.historyArr = ["MyPage", "EventQuest"]), "TOWER" == m && (p = null, p = 1 == b.section.genericIndex ? "/normal/" + f : "/challenge/" + f, c = "#/EventTowerTop", p && (c += p), a.historyArr = ["MyPage", "EventTowerTop"]), "DAILYTOWER" == m && (p = b.section.parameter.split("=")[1], c = "#/EventDailyTowerTop", p && (c += "/" + p.toLowerCase() + "/" + f), a.historyArr = ["MyPage", "EventDailyTowerTop"]), "BRANCH" == m && (c = "#/EventBranchTop/" + f, a.historyArr = ["MyPage", "EventBranchTop"]), "SINGLERAID" == m && (c = "#/EventSingleRaidTop/" + f, a.historyArr = ["MyPage", "EventSingleRaidTop"], a.resumeData && (a.eventSingleRaidResumeData = a.resumeData)), "STORYRAID" == m && (c = "#/EventStoryRaidTop/" + f, a.historyArr = ["MyPage", "EventStoryRaidTop"], a.resumeData && (a.eventStoryRaidResumeData = a.resumeData)), "ACCOMPLISH" == m && (c = "#/EventAccomplishTop", a.historyArr = ["MyPage", "EventAccomplishTop"]), "REG_ACC" == m && (c = "#/RegularEventAccomplishTop/" + f, a.historyArr = ["MyPage", "RegularEventAccomplishTop"]), "DUNGEON" == m && (c = "#/EventDungeonMap", a.historyArr = ["MyPage", "EventDungeonMap"]), "EXTERMINATION" == m && (c = "#/RegularEventExterminationBattleSelect/" + f, a.historyArr = ["MyPage", "RegularEventExterminationTop", "RegularEventExterminationBattleSelect"])
          }
          a.clearSectionModel || a.clearChapterModel || !k || (c = "#/QuestBattleSelect/" + d + "/" + f, console.log("セクション内に未クリアクエストがあります。選択画面に遷移します。"));
          k = J.getIsPuellaHistoriaInfo(
          {
            sectionInfo: b,
            sectionList: h.toJSON()
          });
          k.isPuellaHistoria && (c = "#/QuestBattleSelect/" + k.sectionInfoList[k.sectionInfoList.length - 1].sectionId + "/" + f, a.historyArr = ["MyPage", "MainQuest", "PuellaHistoriaTop"], k.num && k.num == F.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaid"
          }) && (c = "#/PuellaHistoriaSingleRaid"), k.num && k.num == F.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaidLast"
          }) && (c = "#/PuellaHistoriaSingleRaid"));
          D.getIsScene0Info(
          {
            section: b
          }).isScene0 && (a.historyArr = ["MyPage", "Scene0Top", "Scene0BattleSelect"], c = "#/Scene0BattleSelect");
          v.IsEventWitchSection(
          {
            section: b,
            pageJson: t
          }) && (a.historyArr = ["MyPage", "MainQuest", "EventWitchTopPage"], c = "#/EventWitchTopPage")
        }
      else c = "#/MainQuest", a.historyArr = ["MyPage", "MainQuest"];
      a.resumeData = null;
      return c
    },
    L = function(b)
    {
      if (a.playSection)
      {
        var c = a.storage.userSectionList.findWhere(
        {
          sectionId: b.userQuestBattleResultList[0].questBattle.sectionId
        });
        if (c)
        {
          var d = c.toJSON(),
            c = d.cleared;
          !a.playSection.cleared && c && (a.clearSectionModel = d, a.playSection = null);
          var f = null;
          b.userChapterList && l.each(b.userChapterList, function(a, b)
          {
            a.chapterId == d.section.genericId && (f = a)
          });
          var g = null;
          f && a.playChapter && (c = f.cleared, g = a.playChapter.cleared, c && !g && (a.clearChapterModel = {}, a.clearChapterModel.before = a.playChapter, a.clearChapterModel.after = null, b.userChapterList && l.each(b.userChapterList, function(b)
          {
            b.chapter.questType == f.chapter.questType && b.chapter.partNo == f.chapter.partNo && b.chapterId !== f.chapterId && (a.clearChapterModel.after = b)
          })));
          a.playChapter = null;
          D.getIsScene0Info(
          {
            section: d
          }).isScene0 && (a.clearSectionModel = null, a.playSection = null, a.clearChapterModel = null);
          v.IsEventWitchSection(
          {
            section: d,
            pageJson: t
          }) && (a.clearSectionModel = null, a.playSection = null, a.clearChapterModel = null)
        }
      }
    },
    M = function(b)
    {
      if (!a.questBattleModel || !a.questBattleModel.cleared) return !1;
      var c = a.questBattleModel.overwriteAp ? Number(a.questBattleModel.overwriteAp) : a.questBattleModel.ap,
        d = a.storage.userStatusList.findWhere(
        {
          statusId: "ACP"
        }).toJSON().point;
      if (c && d < c || a.questBattleModel.needItemNum && a.questBattleModel.useItemId && (c = a.storage.userItemList.findWhere(
        {
          itemId: a.questBattleModel.useItemId
        }), d = a.questBattleModel.needItemNum, (c ? c.toJSON().quantity : 0) < d) || !a.storage.userSectionList.findWhere(
        {
          sectionId: b.userQuestBattleResultList[0].questBattle.sectionId
        })) return !1;
      b = !0;
      if (!a.questBattleModel.questBattle.autoRun || a.questBattleModel.questBattle.skipHelper) b = !1;
      return b
    },
    N = function()
    {
      var b = B.dropItemJson(a.questBattleModel);
      b.addDropItem && (a.questBattleModel.addDropItem = b.addDropItem);
      b.addDropItemName && (a.questBattleModel.addDropItemName = b.addDropItemName);
      b.addDropItemQuantity && (a.questBattleModel.addDropItemQuantity = b.addDropItemQuantity);
      a.questBattleModel.rewardCodeArr = b.list;
      a.questBattleModel.rewardNameArr = b.nameList;
      a.questBattleModel.rewardQuantityArr = b.quantityList
    },
    O = A.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #tapAction"] = this.tapSkip;
        b[a.cgti + " #questRetryBtn"] = this.questRetry;
        b[a.cgti + " #questLoopBtn"] = this.autoQuest;
        b["webkitTransitionEnd .clearSprite"] = this.spliteRoling;
        b["webkitAnimationEnd .clearSprite"] = this.spliteRoling;
        b["webkitanimationend .clearSprite"] = this.spliteRoling;
        b["animationend .clearSprite"] = this.spliteRoling;
        b["webkitTransitionEnd #itemResult .maskWrap"] = this.itemAnimEnd;
        b["webkitAnimationEnd #itemResult .maskWrap"] = this.itemAnimEnd;
        b["webkitanimationend #itemResult .maskWrap"] = this.itemAnimEnd;
        b["animationend #itemResult .maskWrap"] = this.itemAnimEnd;
        return b
      },
      initialize: function(b)
      {
        t = b.pageJson;
        this.listenTo(this, "remove", this.removeView);
        this.template = l.template(I);
        this.questDisableFlg = !1;
        a.setTitleCollectionObserved();
        if (this.model && this.model.userQuestBattleResultList)
        {
          this.oldGameUser = a.resumeData ? a.resumeData.gameUser : a.storage.gameUser.toJSON();
          this.oldStatusModel = a.resumeData ? a.resumeData.userStatusList : a.storage.userStatusList.toJSON();
          this.oldQuestBattle = a.resumeData ? a.resumeData.userQuestBattleList : a.storage.userQuestBattleList.toJSON();
          this.oldCharaModel = a.resumeData ? a.resumeData.userCharaList : a.storage.userCharaList.toJSON();
          this.oldCardModel = a.resumeData ? a.resumeData.userCardList : a.storage.userCardList.toJSON();
          this.newestModel = r.getPageJson();
          this.model.userStatusList || (this.model.userStatusList = a.storage.userStatusList.toJSON());
          a.responseSetStorage(this.model);
          L(this.model);
          this.nextPage = K(this.model);
          this.questLoopStatus = "none";
          if (this.canRetry = M(this.model)) this.questLoopStatus = B.getQuestLoopStatus(a.questBattleModel), B.supportPickUp(this.newestModel), N();
          q.createCardList();
          this.allInitialized();
          this.createDom()
        }
        else a.tapBlock(!1), a.androidKeyStop = !0, new a.PopupClass(
        {
          title: "エラー",
          content: "クエスト結果が正しく取得できませんでした。<br>トップページに戻ります。",
          closeBtnText: "OK"
        }, null, null, function()
        {
          h.endQuest();
          h.nativeReload("#/TopPage")
        })
      },
      render: function()
      {
        var b = this;
        this.$el.html(this.template(
        {
          model: this.userQuestResult,
          getItems: this.getItems,
          master: this.missionArr,
          missionClear: this.missionClear,
          missionReward: this.missionReward,
          rewardRiche: this.rewardRiche,
          gameUser: a.storage.gameUser.toJSON(),
          canRetry: this.canRetry,
          questLoopStatus: this.questLoopStatus,
          eventWitchPointType: function(a)
          {
            a = "";
            b.eventWitchBattleInfo && b.eventWitchBattleInfo.isGaugeBattle && (a = b.eventWitchBattleInfo.pointType);
            return a
          }()
        }));
        return this
      },
      createDom: function()
      {
        this.missionAndItems();
        a.content.append(this.render().el);
        a.globalMenuView && a.globalMenuView.trigger("removeView");
        this.createView()
      },
      createView: function()
      {
        this.missionRewardHandler();
        this.userRankHandler();
        this.userUnitHandler();
        h.getBaseData(a.getNativeObj());
        a.ready.hide();
        d = this;
        this.stepObserver("firstStep")
      },
      allInitialized: function()
      {
        this.userQuestResult = this.model.userQuestBattleResultList[0];
        this.userQuestBattle = this.userQuestResult.questBattle;
        this.userQuest = l.findWhere(this.model.userQuestBattleList,
        {
          questBattleId: this.userQuestResult.questBattleId
        });
        this.missionArr = [];
        this.missionClear = [];
        this.rewardRiche = 0;
        this.getItems = [];
        this.totalStarCnt = this.missionCount2 = this.missionCount1 = 0;
        this.beforeCards = [];
        this.rankUpNum = 0;
        this.unitEpUpFlag = this.unitLvUpFlag = !1;
        this.levelUpUnit = [];
        this.epUpUnit = [];
        this.unitExpBefore = [];
        this.unitExpAfter = [];
        this.unitEpBefore = [];
        this.unitEpAfter = [];
        this.timeOuts = null;
        x = {};
        this.runRetry = this.runLoop = !1;
        this.eventWitchBattleInfo = v.getEventWitchBattleInfo(
        {
          questBattle: this.userQuestBattle,
          pageJson: t
        });
        this.isEventWitchGaugeBattle = this.eventWitchBattleInfo.isGaugeBattle
      },
      stepObserver: function(a)
      {
        switch (a)
        {
          case "firstStep":
            d.firstStep();
            break;
          case "follow":
            d.followerHandler();
            break;
          case "userRank":
            d.levelUpFunc();
            break;
          case "charaExp":
            d.charaGuageFunc();
            break;
          case "charaLvPop":
            d.unitLvUpPop();
            break;
          case "charaEp":
            d.epExpFunc();
            break;
          case "charaEpPop":
            d.unitEpPop();
            break;
          case "items":
            d.itemFunc()
        }
      },
      tapSkip: function(b)
      {
        if (!a.isScrolled() && (b.currentTarget.dataset || b.currentTarget.dataset.nowFunc))
        {
          a.removeClass(a.doc.getElementById("tapAction"), "active");
          var c = b.currentTarget.dataset.nowFunc;
          b.currentTarget.dataset.nowFunc = "noneActive";
          b.preventDefault();
          switch (c)
          {
            case "charaExp":
              0 < this.levelUpUnit.length ? (h.startSe(1101), d.stepObserver("charaLvPop")) : d.stepObserver("charaEp");
              break;
            case "charaEp":
              0 < this.epUpUnit.length ? d.stepObserver("charaEpPop") : d.model.questLoop ? (a.doc.getElementById("tapAction").dataset.nowFunc = "nextBtn", d.nextBtnFunc()) : (a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextBtn");
              break;
            case "nextBtn":
              a.doc.getElementById("tapAction").dataset.nowFunc = "noneActive";
              this.nextBtnFunc(b);
              break;
            case "nextPageBtn":
              a.doc.getElementById("tapAction").dataset.nowFunc = "noneActive";
              b = null;
              var c = a.storage.userQuestAdventureList.toJSON(),
                e = a.storage.userSectionList.findWhere(
                {
                  sectionId: this.model.userQuestBattleResultList[0].questBattle.sectionId
                });
              e && (e = e.toJSON(), e.section && e.section.secret && (b = e.section.secret));
              this.storyCheck(this.userQuestBattle.endStory, c, this.nextPage, b);
              break;
            case "EventGaugeUp":
              a.doc.getElementById("tapAction").dataset.nowFunc = "noneActive", this.setEventGaugeUpSec(b)
          }
        }
      },
      firstStep: function()
      {
        d.setSe();
        setTimeout(function()
        {
          var b = a.doc.getElementById("expNum"),
            c = a.doc.getElementById("exRankGuageBar"),
            e = a.doc.getElementById("playerLv");
          d.countUp(0, d.userQuestResult.exp, b);
          h.startSe(1007);
          setTimeout(function()
          {
            a.addClass(a.doc.getElementById("nextRankExp"), "on")
          }, 510);
          d.gaugeUp(d.userExpBefore, d.userExpAfter, c, e, "rank", "up");
          a.addClass(a.doc.getElementsByClassName("exGuageWrap")[0], "active")
        }, 2500);
        setTimeout(function()
        {
          var b = l.findWhere(a.storage.userFollowList.toJSON(),
            {
              followUserId: d.userQuestResult.helpUserId
            }) ? !0 : !1,
            c = 0,
            e = a.storage.userStatusList.findWhere(
            {
              statusId: "MAX_FOLLOW"
            }),
            f = a.storage.userFollowList.toJSON().length;
          void 0 !== e ? c = e.toJSON().point : b = !0;
          c <= f && (b = !0);
          d.userQuestResult.helpUserId || (b = !0);
          a.storage.gameUser.toJSON().closeFunctions && -1 < a.storage.gameUser.toJSON().closeFunctions.indexOf("FRIEND") && (b = !0);
          b || d.model.questLoop ? d.stepObserver("userRank") : d.stepObserver("follow")
        }, 3500)
      },
      setSe: function()
      {
        setTimeout(function()
        {
          h.startSe(1601)
        }, 500);
        setTimeout(function()
        {
          h.startSe(1602)
        }, 1E3);
        0 < this.missionCount1 && 3 === this.totalStarCnt && setTimeout(function()
        {
          h.startSe(1603);
          setTimeout(function()
          {
            h.startSe(1604)
          }, 610)
        }, 2390)
      },
      treasureBoxPreload: function()
      {
        var a = ["bronze", "silver", "gold"],
          c = [];
        l.forEach(this.getItems, function(a)
        {
          "ADDED_DROP" === a.chestColor && -1 === c.indexOf(a.itemCode.toLowerCase()) && c.push(a.itemCode.toLowerCase())
        });
        var d = function()
          {
            var b = a[0],
              e = new Image;
            e.src = "/magica/resource/image_web/common/treasure/" + b + "_close.png";
            e.onload = function()
            {
              var e = new Image;
              e.src = "/magica/resource/image_web/common/treasure/" + b + "_open.png";
              e.onload = function()
              {
                a.shift();
                0 < a.length ? d() : 0 < c.length && f()
              }
            }
          },
          f = function()
          {
            var a = c[0],
              b = new Image;
            b.src = "/magica/resource/image_web/common/treasure/event/" + a + "_close.png";
            b.onload = function()
            {
              var b = new Image;
              b.src = "/magica/resource/image_web/common/treasure/event/" + a + "_open.png";
              b.onload = function()
              {
                c.shift();
                0 < c.length && f()
              }
            }
          };
        d()
      },
      missionAndItems: function()
      {
        this.missionReward = a.itemSet(this.userQuestResult.questBattle.missionRewardCode); - 1 < this.missionReward.itemCode.indexOf("GIFT") ? this.missionReward.imgPath = "/gift/" : this.missionReward.imgPath = "/main/";
        "riche" === this.missionReward.itemCode && (this.missionReward.itemCode = "riche");
        var b = l.findWhere(this.oldQuestBattle,
        {
          questBattleId: this.userQuestResult.questBattleId
        });
        if (b)
          for (var c = 1; 4 > c; c++) this.missionArr.push(this.userQuestBattle["missionMaster" + c]), this.userQuest["missionStatus" + c] === b["missionStatus" + c] ? (this.missionClear.push(this.userQuest["missionStatus" + c]), "CLEARED" === this.userQuest["missionStatus" + c] && this.missionCount2++) : (this.missionClear.push("CLEAR"), this.missionCount1++);
        var d = this;
        if (b = this.userQuestResult.dropRewardCodes)
        {
          var f = this,
            b = b.split(",");
          l.each(b, function(b, c)
          {
            var e = a.itemSet(b);
            e.itemCode ? (-1 < e.itemCode.indexOf("GIFT") ? e.imgPath = "/gift/" : -1 < e.itemCode.indexOf("MONEY") ? e.imgPath = "/main/" : -1 < e.itemCode.indexOf("riche") ? (f.rewardRiche += e.quantity | 0, e.imgPath = "/main/") : -1 < e.itemCode.indexOf("memoria_") ? e.imgPath = "/memoria/" : e.imgPath = -1 < e.itemCode.indexOf("EVENT_") ? "/event/" : "/main/", d.isEventWitchGaugeBattle && l.each(d.eventWitchBattleInfo.factorItemIdList, function(a, b, c)
            {
              e && e.itemCode == a && (e = null)
            }), e && f.getItems.push(e)) : l.each(f.getItems, function(a, b)
            {
              a.itemCode == e.effectItemCode && (f.getItems[b].effectFlag = !0)
            })
          })
        }
        this.treasureBoxPreload()
      },
      missionRewardHandler: function()
      {
        this.totalStarCnt = this.missionCount1 + this.missionCount2;
        3 === this.totalStarCnt ? 0 < this.missionCount1 ? (a.addClass(a.doc.getElementById("ResultWrap").getElementsByClassName("resultMark")[0], "complete"), a.addClass(a.doc.getElementById("ResultWrap").getElementsByClassName("resultMarkOver")[0], "complete"), a.addClass(a.doc.getElementById("missionItemList"), "canGet"), h.getBaseData(a.getNativeObj())) : a.addClass(a.doc.getElementById("missionItemList"), "alreadyGet") : a.addClass(a.doc.getElementById("missionItemList"), "noGet")
      },
      userRankHandler: function()
      {
        var b = a.storage.gameUser.toJSON();
        a.doc.getElementById("expNum");
        a.doc.getElementById("exRankGuageBar");
        a.doc.getElementById("playerLv");
        var c = this.oldGameUser.totalExpForCurrentLevel || 0,
          d = b.totalExpForCurrentLevel || 0;
        this.rankUpNum = b.level - this.oldGameUser.level;
        a.doc.getElementById("playerLv").textContent = this.oldGameUser.level;
        var f = 0;
        b.totalExpForNextLevel && (f = b.totalExpForNextLevel - b.exp);
        a.doc.getElementById("nextRankExpNum").textContent = f;
        this.userExpBefore = Math.floor((this.oldGameUser.exp - c) / (this.oldGameUser.totalExpForNextLevel - c) * 100) | 0;
        this.userExpAfter = Math.floor((b.exp - d) / (b.totalExpForNextLevel - c) * 100 + 100 * this.rankUpNum) | 0;
        a.doc.getElementById("exRankGuageBar").style.width = this.userExpBefore + "%"
      },
      userUnitHandler: function()
      {
        for (var b = 1; 10 > b; b++)
          if (this.userQuestResult["userCardId" + b])
          {
            var c = l.findWhere(this.oldCardModel,
              {
                id: this.userQuestResult["userCardId" + b]
              }),
              d = l.findWhere(a.storage.userCardListEx.toJSON(),
              {
                userCardId: this.userQuestResult["userCardId" + b]
              });
            c.bondsTotalPt = l.findWhere(this.oldCharaModel,
            {
              charaId: d.charaId
            }).bondsTotalPt;
            var f = !1;
            this.userQuestResult.episodeUserCardId && this.userQuestResult.episodeUserCardId === d.id && (f = !0);
            this.beforeCards.push(
            {
              beforeModel: c,
              afterModel: d,
              isLeader: f
            })
          } C.prototype.parentView = this;
        C.prototype.template = l.template($("#unitPartTemp").text());
        var g = a.doc.createDocumentFragment();
        l.each(this.beforeCards, function(a, b)
        {
          a = new C(a);
          g.appendChild(a.render().el)
        });
        a.doc.getElementById("charaWrap").appendChild(g);
        g = null
      },
      followerHandler: function()
      {
        E.prototype.parentView = this;
        E.prototype.template = l.template($("#supportPart").text());
        var b = l.template($("#followPopTemp").text()),
          c = r.getPageJson().userProfile,
          e = a.storage.userFollowList ? a.storage.userFollowList.toJSON().length : 0,
          f = {
            1: "ALL",
            2: "FIRE",
            3: "WATER",
            4: "TIMBER",
            5: "LIGHT",
            6: "DARK"
          },
          g = {
            ALL: null,
            FIRE: null,
            WATER: null,
            TIMBER: null,
            LIGHT: null,
            DARK: null
          },
          n = {},
          k = Date.parse(d.newestModel.currentTime) / 1E3,
          y = c && c.lastAccessDate ? Date.parse(c.lastAccessDate) / 1E3 : null;
        y ? (k = (k - y) / 60, 16 > k ? k = "15分以内" : 60 > k ? k = Math.floor(k) + "分前" : 60 < k && 1440 > k ? k = Math.floor(k / 60) + "時間前" : (k = k / 60 / 24, k = 30 < k ? Math.floor(k / 30) + "カ月前" : Math.floor(k) + "日前")) : k = "-日前";
        c.loginTimeLag = k;
        var p = {};
        l.each(c.userDeck, function(a, b)
        {
          -1 !== b.indexOf("questPositionId") && (b = b.split("questPositionId")[1], p[f[a]] = c.userDeck["userCardId" + b])
        });
        l.each(p, function(a, b)
        {
          l.each(c.userCardList, function(c)
          {
            a == c.id && (g[b] = c)
          })
        });
        l.each(c.userCharaList, function(a)
        {
          l.each(f, function(b)
          {
            g[b] && a.userCardId == g[b].id && (g[b].supportFlag = !0, g[b].filterAtt = b, g[b] = q.addExStatus($.extend(g[b], a), c.userPieceList, c.userDoppelList, c.userDeck))
          })
        });
        n.userName = c.userName;
        n.loginTimeLag = c.loginTimeLag;
        n.userRank = c.userRank;
        n.follow = c.follow;
        n.follower = c.follower;
        n.gameUser = c.gameUser;
        n.definiteClassRank = c.definiteClassRank;
        k = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_FOLLOW"
        });
        y = d.userQuestResult.helpAttributeId;
        new a.PopupClass(
        {
          title: "フォロー",
          content: "",
          exClass: "qeustResultPop"
        }, null, null, function()
        {
          d.trigger("removeFriendParts");
          d.levelUpFunc()
        });
        var m = a.doc.createElement("div");
        m.innerHTML = b(
        {
          model: c,
          follow: e,
          maxFollow: k.toJSON().point,
          attribute: y
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(m);
        l.each(f, function(b)
        {
          n.tapBlock = !1;
          b = $.extend(!1, n, g[b] ||
          {
            filterAtt: b,
            card:
            {
              cardName: "未設定"
            },
            tapBlock: !0
          });
          b = new E(
          {
            model: new w(b)
          });
          a.doc.querySelector("#supportDecks").appendChild(b.render().el)
        });
        h.getBaseData(a.getNativeObj());
        a.doc.getElementById("popupArea").getElementsByClassName("touchWrap")[0].addEventListener(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || void 0 === b.target.dataset.att || (a.removeClass(a.doc.getElementById("popupArea").getElementsByClassName("touchWrap")[0].getElementsByClassName("current")[0], "current"), a.addClass(b.target, "current"), a.doc.getElementById("popupArea").getElementsByClassName("unitWrap")[0].className = "unitWrap " + b.target.dataset.att)
        });
        var H = function(b)
        {
          b.preventDefault();
          a.isScrolled() || (a.doc.getElementById("followDecide").removeEventListener(a.cgti, H), r.ajaxPost(a.linkList.sendFollow,
          {
            friendUserId: d.userQuestResult.helpUserId
          }, function(b)
          {
            "error" !== b.resultCode && (new a.PopupClass(
            {
              title: "フォロー追加",
              content: "<span class='c_pink popUserName'></span>をフォローしました。",
              closeBtnText: "閉じる"
            }, null, function()
            {
              $(a.doc.getElementsByClassName("popUserName")).text(c.userName);
              c = null
            }, d.levelUpFunc), a.responseSetStorage(b))
          }))
        };
        a.doc.getElementById("followDecide").addEventListener(a.cgti, H)
      },
      levelUpFunc: function()
      {
        if (0 < d.rankUpNum)
        {
          h.startSe(1606);
          var b = l.template($("#rankUpPopup").text()),
            c = {};
          c.afterLv = a.storage.gameUser.get("level");
          c.beforeLv = a.storage.gameUser.get("level") - d.rankUpNum;
          c.beforeMaxAp = l.findWhere(d.oldStatusModel,
          {
            statusId: "MAX_ACP"
          }).point;
          var e = l.findWhere(d.model.userStatusList,
          {
            statusId: "MAX_ACP"
          });
          c.afterMaxAp = e ? e.point : c.beforeMaxAp;
          c.beforeMaxFollow = l.findWhere(d.oldStatusModel,
          {
            statusId: "MAX_FOLLOW"
          }).point;
          e = l.findWhere(d.model.userStatusList,
          {
            statusId: "MAX_FOLLOW"
          });
          c.afterMaxFollow = e ? e.point : c.beforeMaxFollow;
          new a.PopupClass(
          {}, b(
          {
            gameUser: a.storage.gameUser.toJSON,
            userStatus: a.storage.userStatusList.toJSON(),
            number: c
          }), null, function()
          {
            d.stepObserver("charaExp")
          });
          d.model.questLoop && setTimeout(function()
          {
            null !== a.g_popup_instance && a.g_popup_instance.popupView.close()
          }, 1E3)
        }
        else d.stepObserver("charaExp");
        void 0 !== a.noticeAp && !0 === a.noticeAp ? (b = a.storage.userStatusList.findWhere(
        {
          statusId: "ACP"
        }).toJSON(), c = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON(), b = a.getApRemainTime(b, c, r.getPageJson().currentTime), h.noticeApFullSet(b)) : void 0 === a.noticeAp && ($("#configCallback").on("configCallback", function(b, c)
        {
          $("#configCallback").off();
          a.noticeAp = 1 === c.ap ? !0 : !1;
          a.noticeAp && (b = a.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON(), c = a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON(), b = a.getApRemainTime(b, c, r.getPageJson().currentTime), h.noticeApFullSet(b))
        }), h.noticeApConfig("configCallback"))
      },
      charaGuageFunc: function()
      {
        var b = function()
        {
          setTimeout(function()
          {
            0 < d.levelUpUnit.length ? d.stepObserver("charaLvPop") : d.stepObserver("charaEp")
          })
        };
        d.timeOuts = setTimeout(function()
        {
          h.startSe(1007);
          for (var c = a.doc.getElementById("charaWrap").getElementsByTagName("li"), e = 0, f = c.length; e < f; e++)
          {
            var g = c[e];
            0 < e ? setTimeout(d.gaugeUp(d.unitExpBefore[e], d.unitExpAfter[e], g.getElementsByClassName("charaExGuage")[0], g, "charaEx", e), 500) : setTimeout(d.gaugeUp(d.unitExpBefore[e], d.unitExpAfter[e], g.getElementsByClassName("charaExGuage")[0], g, "charaEx", e, b), 500);
            a.addClass(g.getElementsByClassName("getExNum")[0], "anim");
            a.addClass(g.getElementsByClassName("exFlashWrap")[0], "active")
          }
        }, 1E3)
      },
      unitLvUpPop: function(b)
      {
        if (!a.resultView || !a.resultView.tapBlock)
        {
          a.doc.getElementById("tapAction").dataset.nowFunc = "noneActive";
          b = {};
          var c;
          1 < d.levelUpUnit.length ? (a.tapBlock(!1), c = d.levelUpUnit[0][0], c.chara = d.levelUpUnit[0][1].chara, b.before = q.addExStatus(c), b.after = q.addExStatus(d.levelUpUnit[0][1]), b.type = "level", a.resultView = new u(
          {
            model: new w(b)
          }, d.unitLvUpPop, d.model.questLoop), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), d.unitLvUpFlag || (d.unitLvUpFlag = !0), d.levelUpUnit.splice(0, 1)) : (a.tapBlock(!1), c = d.levelUpUnit[0][0], c.chara = d.levelUpUnit[0][1].chara, b.before = q.addExStatus(c), b.after = q.addExStatus(d.levelUpUnit[0][1]), b.type = "level", a.resultView = new u(
          {
            model: new w(b)
          }, d.epExpFunc, d.model.questLoop), $("#overlapContainer").append(a.resultView.render().el), d.unitLvUpFlag = !0, h.getBaseData(a.getNativeObj()), d.levelUpUnit = [])
        }
      },
      epExpFunc: function()
      {
        d.unitEpUpFlag = !1;
        d.timeOuts = setTimeout(function()
        {
          h.startSe(1007);
          for (var b = function()
            {
              d.trigger("showEpExp");
              0 < d.epUpUnit.length ? d.stepObserver("charaEpPop") : d.model.questLoop ? (a.doc.getElementById("tapAction").dataset.nowFunc = "nextBtn", d.nextBtnFunc()) : (a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextBtn")
            }, c = a.doc.getElementById("charaWrap").getElementsByTagName("li"), e = 0, f = c.length; e < f; e++)
          {
            var g = c[e];
            0 < e ? setTimeout(d.gaugeUp(d.unitEpBefore[e], d.unitEpAfter[e], g.getElementsByClassName("charaEpGuage")[0], g, "charaEp", e), 500) : setTimeout(d.gaugeUp(d.unitEpBefore[e], d.unitEpAfter[e], g.getElementsByClassName("charaEpGuage")[0], g, "charaEp", e, b), 500);
            a.addClass(g.getElementsByClassName("getEpExNum")[0], "anim");
            a.addClass(g.getElementsByClassName("epFlashWrap")[0], "active")
          }
        }, 500)
      },
      unitEpPop: function(b)
      {
        if (!a.resultView || !a.resultView.tapBlock)
        {
          a.doc.getElementById("tapAction").dataset.nowFunc = "noneActive";
          b = a.storage.userCardListEx.findWhere(
          {
            cardId: d.epUpUnit[0][0].cardId
          }).toJSON();
          var c = {},
            e;
          1 < d.epUpUnit.length ? (a.tapBlock(!1), e = d.epUpUnit[0][0], e.chara = b.chara, c.before = q.addExStatus(e), c.before.episodeLevel = d.epUpUnit[0][1], c.after = q.addExStatus(b), c.type = "episode", a.resultView = new u(
          {
            model: new w(c)
          }, function()
          {
            d.unitEpPop()
          }, d.model.questLoop), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), d.unitEpUpFlag = !0, d.epUpUnit.splice(0, 1)) : (a.tapBlock(!1), e = d.epUpUnit[0][0], e.chara = b.chara, c.before = q.addExStatus(e), c.before.episodeLevel = d.epUpUnit[0][1], c.after = q.addExStatus(b), c.type = "episode", a.resultView = new u(
          {
            model: new w(c)
          }, function()
          {
            setTimeout(function()
            {
              d.model.questLoop ? (a.doc.getElementById("tapAction").dataset.nowFunc = "nextBtn", d.nextBtnFunc()) : (a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextBtn")
            }, 500)
          }, d.model.questLoop), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), d.unitEpUpFlag = !1, d.epUpUnit = [])
        }
      },
      nextBtnFunc: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.addClass(a.doc.getElementById("expWrap"), "off");
        a.removeClass(a.doc.getElementById("itemWrap"), "off");
        a.removeClass(a.doc.getElementById("itemResult"), "off");
        a.removeClass(a.doc.getElementById("getTotalRiche"), "off");
        a.removeClass(a.doc.getElementById("hasTotalRiche"), "off");
        setTimeout(function()
        {
          d.stepObserver("items")
        }, 500)
      },
      itemFunc: function()
      {
        var b = a.doc.getElementById("goldNum");
        d.countUp(0, d.userQuestResult.riche, b);
        b = a.doc.getElementById("getItemList").getElementsByTagName("li");
        a.addClass(a.doc.getElementById("itemResult"), "anim");
        if (!this.isEventWitchGaugeBattle)
        {
          var c = function()
          {
            d.canRetry && d.model.questLoop ? d.autoQuest() : (d.canRetry && a.addClass(a.doc.getElementById("retryWrap"), "active"), a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextPageBtn")
          };
          1 > b.length ? d.timeOuts = setTimeout(c, 500) : (d.canRetry && !d.model.questLoop && a.addClass(a.doc.getElementById("retryWrap"), "active"), h.startSe(1604))
        }
      },
      spliteRoling: function(b)
      {
        b.currentTarget.parentNode.classList.contains("clear") && a.addClass(b.currentTarget, "roling")
      },
      itemAnimEnd: function()
      {
        this.okFlg || (this.okFlg = !0, 14 < a.doc.getElementById("getItemList").getElementsByTagName("li").length && (a.addClass(a.doc.getElementById("itemResult"), "canScroll"), a.scrollSet("itemResult", "itemScroll")), this.isEventWitchGaugeBattle ? d.canRetry && d.model.questLoop ? d.setEventGaugeUpSec() : (a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "EventGaugeUp") : d.canRetry && d.model.questLoop ? d.autoQuest() : (a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextPageBtn"))
      },
      storyCheck: function(b, c, d, f)
      {
        var e = r.getPageJson(),
          n = a.storage.userSectionList.findWhere(
          {
            sectionId: this.model.userQuestBattleResultList[0].questBattle.sectionId
          }),
          k = !0;
        l.each(c, function(a)
        {
          b === a.adventureId && (k = !1)
        });
        if ("MAIN" == n.toJSON().section.questType || "SUB" == n.toJSON().section.questType || "CHARA" == n.toJSON().section.questType || "COSTUME" == n.toJSON().section.questType) e.gameUser.skipAdventure || (k = !0);
        b && "BRANCH" != n.toJSON().section.questType || (k = !1);
        if (window.isBrowser)
          if (a.tutorialId) a.tutorialUtil[a.tutorialId]();
          else location.href = d;
        else
        {
          if (k) $(a.ready.target).on("webkitAnimationEnd", function()
          {
            h.changeBg("web_black.jpg");
            h.endQuest();
            $(a.ready.target).off();
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            $("#commandDiv").on("nativeCallback", function(c, e)
            {
              e && e.isSkipped && (c = {}, c.adventureId = String(b), r.ajaxPost(a.linkList.adventureSkip, c, function(b)
              {
                a.responseSetStorage(b)
              }));
              h.startBgm(a.bgm);
              $("#commandDiv").off();
              e && e.userName ? (r.ajaxPost(a.linkList.userChangeNamePrologue,
              {
                name: e.userName
              }, function(b)
              {
                a.responseSetStorage(b);
                a.tapBlock(!0);
                require(["js/util/TutorialUtil.js"], function(b)
                {
                  a.tutorialUtil = b;
                  a.tutorialId = a.tutorialUtil.getResumeId();
                  a.tutorialUtil.tutorialEnd("TU999")
                })
              }), setTimeout(function()
              {
                h.setWebView(!0)
              }, 200)) : a.tutorialId && a.tutorialUtil[a.tutorialId] ? (a.tutorialUtil[a.tutorialId](), h.setWebView(), $("#commandDiv").off()) : (location.href = d, setTimeout(function()
              {
                h.setWebView(!0)
              }, 200))
            });
            r.ajaxPost(a.linkList.userQuestAdventureRegist,
            {
              adventureId: String(b)
            }, function(b)
            {
              "error" !== b.resultCode && a.responseSetStorage(b)
            });
            var c = String(b);
            f && (c += "_" + f);
            setTimeout(function()
            {
              h.setWebView(!1);
              h.startStory(c);
              a.tutorialId && a.tutorialUtil.tutorialIdRegist(a.tutorialUtil.getResumeId())
            }, 500)
          });
          else $(a.ready.target).on("webkitAnimationEnd", function()
          {
            h.changeBg(a.background);
            h.endQuest();
            $(a.ready.target).off();
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            if (a.tutorialId && a.tutorialUtil[a.tutorialId]) a.tutorialUtil[a.tutorialId]();
            else location.href = d
          });
          a.addClass(a.ready.target, "preNativeFadeIn")
        }
      },
      autoQuest: function(b)
      {
        if (!this.questDisableFlg)
        {
          if (b && (b.preventDefault(), a.isScrolled())) return;
          this.runLoop = this.questDisableFlg = !0;
          window.isBrowser ? (a.questBattleModel.isLoop = !0, h.sendCommand("QuestStub")) : r.ajaxPost(a.linkList.questStart, a.apiQuestPrm, function(b)
          {
            setTimeout(function()
            {
              $("#commandDiv").on("nativeCallback", function(b, c)
              {
                $("#commandDiv").off();
                if (c)
                {
                  b = c.webData;
                  c = b.userQuestBattleResultList[0].questBattle;
                  a.responseSetStorage(b);
                  if (b = (b = a.storage.userSectionList.findWhere(
                    {
                      sectionId: c.sectionId
                    })) ? b.toJSON() : null) c = (c = a.storage.userChapterList.findWhere(
                  {
                    chapterId: b.section.genericId
                  })) ? c.toJSON() : null, a.playChapter = c, a.playSection = b;
                  location.href = "#/QuestBackground"
                }
              });
              a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
              h.setWebView(!1);
              h.startQuest(b.userQuestBattleResultList[0].id, a.nativeQuestPrm.urls, !0);
              window.isBrowser && $("#commandDiv").trigger("nativeCallback")
            }, 500)
          })
        }
      },
      countUp: function(b, c, d)
      {
        var e, g;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, g = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (e = function(a)
        {
          window.setTimeout(a, 10)
        }, g = function(a)
        {
          window.clearTimeout(a)
        });
        var h = 0,
          k = null,
          l = c,
          p = function()
          {
            h++;
            if ("QuestResult" === a.location)
            {
              k || (k = (new Date).getTime());
              var c = (new Date).getTime() - k;
              if (50 >= h)
              {
                var f = Math.floor(c / 500 * (l - b)) + b | 0;
                499 < c ? (l = String(l).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), d.innerHTML = "+" + l.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), g(m)) : (f = String(f).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), f = f.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), d.innerHTML = "+" + f, m = e(p))
              }
              else g(m), h = 0
            }
          },
          m = e(p)
      },
      gaugeUp: function(b, c, d, f, g, h, k)
      {
        var e, l, m = null;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, l = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (e = function(a)
        {
          window.setTimeout(a, 10)
        }, l = function(a)
        {
          window.clearTimeout(a)
        });
        var n = 0,
          r = "rank" === g ? 50 : 25,
          q = 0,
          t = 0,
          z = 0;
        "rank" === g && f && (z = Number(f.textContent));
        "charaEx" === g && f && (z = Number(f.getElementsByClassName("unitLv")[0].textContent));
        "charaEp" === g && f && (z = Number(f.getElementsByClassName("epLvNum")[0].textContent));
        var v = function()
        {
          n++;
          if ("QuestResult" === a.location)
          {
            m || (m = (new Date).getTime());
            var p = (new Date).getTime() - m;
            if (n <= r && b !== c)
            {
              var w = p / (10 * r),
                u = Math.floor((c - b) * w) + b - 100 * q | 0,
                y = 0;
              if ("rank" === g && 499 < p || "rank" !== g && 249 < p) w = 1, u = Math.floor(c - b) + b - 100 * q | 0;
              for (; 99 < u;) t++, y++, q++, u = Math.floor((c - b) * w) + b - 100 * q | 0;
              0 < y && ("rank" === g && f && (f.textContent = t + z), "charaEx" === g && f && (a.addClass(f.getElementsByClassName("lvup")[0], "anim"), a.addClass(f.getElementsByClassName("unitLv")[0], "c_red"), f.getElementsByClassName("unitLv")[0].textContent = t + z), "charaEp" === g && f && (a.addClass(f.getElementsByClassName("epup")[0], "anim"), a.addClass(f.getElementsByClassName("epLvNum")[0], "c_red"), f.getElementsByClassName("epLvNum")[0].textContent = t + z));
              d.style.width = u + "%";
              "rank" === g && 499 < p || "rank" !== g && 249 < p ? (l(x[g + h]), n = 0, k && k()) : x[g + h] = e(v)
            }
            else n <= r && b === c || "rank" === g && 500 > p || "rank" !== g && 259 > p ? x[g + h] = e(v) : (l(x[g + h]), n = 0, k && k())
          }
        };
        x[g + h] = e(v)
      },
      questRetry: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && this.canRetry)
        {
          this.runRetry = !0;
          h.changeBg(a.background);
          h.endQuest();
          a.historyArr.push(this.nextPage.split("#/")[1]);
          b = a.storage.userSectionList.findWhere(
          {
            sectionId: this.model.userQuestBattleResultList[0].questBattle.sectionId
          });
          var c = D.getIsScene0Info(
          {
            section: b.toJSON()
          });
          "DAILYTOWER" === b.toJSON().section.questType && "ENDLESSCHALLENGE" === b.toJSON().section.parameter.split("=")[1] ? location.href = "#/DeckFormation/endless" : location.href = c.isScene0 ? "#/DeckFormation/scene0Challenge" : "#/SupportSelect"
        }
      },
      setEventGaugeUpSec: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.addClass(a.doc.getElementById("expWrap"), "off");
        a.addClass(a.doc.getElementById("itemWrap"), "off");
        a.addClass(a.doc.getElementById("itemResult"), "off");
        a.addClass(a.doc.getElementById("getTotalRiche"), "off");
        a.addClass(a.doc.getElementById("hasTotalRiche"), "off");
        a.removeClass(a.doc.getElementById("gaugeWrap"), "off");
        G.prototype.rootView = this;
        var c = this,
          e = v.getEventCharaInfo(
          {
            pageType: "questResult",
            eventWitchCharaList: t.eventWitchCharaList,
            eventWitch: t.eventWitch,
            userItemList: a.storage.userItemList.toJSON()
          });
        l.each(e, function(a, b, d)
        {
          new G(
          {
            pointType: c.eventWitchBattleInfo.pointType,
            appendSelector: "#gaugeWrap .charaListSec",
            model: a
          })
        });
        7 == e.length && $("#gaugeWrap .charaListSec").addClass("chara7");
        h.getBaseData(a.getNativeObj());
        setTimeout(function()
        {
          a.EventWitchPrm || (a.EventWitchPrm = {});
          a.EventWitchPrm.beforeRatioList = v.getBeforeRatioList(
          {
            eventCharaInfo: e
          })
        }, 100);
        setTimeout(function()
        {
          d.setLastTouchScreen()
        }, 500)
      },
      setLastTouchScreen: function()
      {
        d.canRetry && d.model.questLoop ? setTimeout(function()
        {
          d.autoQuest()
        }, 1E3) : (d.canRetry && a.addClass(a.doc.getElementById("retryWrap"), "active"), a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextPageBtn")
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        this.runLoop || (a.nativeQuestPrm = null, a.apiQuestPrm = null, a.questHelperId = null, this.runRetry || (a.questBattleModel = null));
        x = a.resultView = null;
        d && d.timeOuts && clearTimeout(this.timeOuts);
        this.off();
        this.remove()
      }
    }),
    E = A.View.extend(
    {
      initialize: function()
      {
        this.listenTo(this.parentView, "removeFriendParts", this.removeView);
        this.popupInitFlag = !1
      },
      className: function()
      {
        return "toggleWrap"
      },
      events: function()
      {
        return {}
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.model.toJSON().filterAtt && a.addClass(this.el, this.model.toJSON().filterAtt);
        return this
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return O
});
