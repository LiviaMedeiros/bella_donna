define("underscore backbone backboneCommon ajaxControl text!template/quest/QuestResult.html cardUtil command QuestUtil js/view/quest/QuestResultUnitPartView js/view/chara/CharaResultView js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility".split(" "), function(l, x, a, r, G, q, h, A, B, u, H, E, C)
{
  var d, t = x.Model.extend(),
    w = {},
    I = function(b)
    {
      var c, d = b.userQuestBattleResultList[0].questBattle.sectionId,
        e = b.userQuestBattleResultList[0].questBattleId,
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
        questBattleId: e
      });
      if (b)
        if (a.searchQuestGiftId && "MAIN" == b.toJSON().section.questType || a.searchQuestGiftId && "SUB" == b.toJSON().section.questType || a.searchQuestGiftId && "CHARA" == b.toJSON().section.questType || a.searchQuestGiftId && "COSTUME" == b.toJSON().section.questType) c = "#/SearchQuest/" + e, a.historyArr = ["MyPage", "SearchQuest"];
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
              k = !1, "EVENT_S" == m && (c = "#/EventTrainingTop/" + e, a.historyArr = ["MyPage", "EventTrainingTop"]), void 0 !== b.section.dayOfTheWeekQuestType && (c = "#/EventQuest/" + e, a.historyArr = ["MyPage", "EventQuest"]), "TOWER" == m && (p = null, p = 1 == b.section.genericIndex ? "/normal/" + e : "/challenge/" + e, c = "#/EventTowerTop", p && (c += p), a.historyArr = ["MyPage", "EventTowerTop"]), "DAILYTOWER" == m && (p = b.section.parameter.split("=")[1], c = "#/EventDailyTowerTop", p && (c += "/" + p.toLowerCase() + "/" + e), a.historyArr = ["MyPage", "EventDailyTowerTop"]), "BRANCH" == m && (c = "#/EventBranchTop/" + e, a.historyArr = ["MyPage", "EventBranchTop"]), "SINGLERAID" == m && (c = "#/EventSingleRaidTop/" + e, a.historyArr = ["MyPage", "EventSingleRaidTop"], a.resumeData && (a.eventSingleRaidResumeData = a.resumeData)), "STORYRAID" == m && (c = "#/EventStoryRaidTop/" + e, a.historyArr = ["MyPage", "EventStoryRaidTop"], a.resumeData && (a.eventStoryRaidResumeData = a.resumeData)), "ACCOMPLISH" == m && (c = "#/EventAccomplishTop", a.historyArr = ["MyPage", "EventAccomplishTop"]), "REG_ACC" == m && (c = "#/RegularEventAccomplishTop/" + e, a.historyArr = ["MyPage", "RegularEventAccomplishTop"]), "DUNGEON" == m && (c = "#/EventDungeonMap", a.historyArr = ["MyPage", "EventDungeonMap"]), "EXTERMINATION" == m && (c = "#/RegularEventExterminationBattleSelect/" + e, a.historyArr = ["MyPage", "RegularEventExterminationTop", "RegularEventExterminationBattleSelect"])
          }
          a.clearSectionModel || a.clearChapterModel || !k || (c = "#/QuestBattleSelect/" + d + "/" + e, console.log("セクション内に未クリアクエストがあります。選択画面に遷移します。"));
          k = H.getIsPuellaHistoriaInfo(
          {
            sectionInfo: b,
            sectionList: h.toJSON()
          });
          k.isPuellaHistoria && (c = "#/QuestBattleSelect/" + k.sectionInfoList[k.sectionInfoList.length - 1].sectionId + "/" + e, a.historyArr = ["MyPage", "MainQuest", "PuellaHistoriaTop"], k.num && k.num == E.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaid"
          }) && (c = "#/PuellaHistoriaSingleRaid"), k.num && k.num == E.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaidLast"
          }) && (c = "#/PuellaHistoriaSingleRaid"));
          C.getIsScene0Info(
          {
            section: b
          }).isScene0 && (a.historyArr = ["MyPage", "Scene0Top", "Scene0BattleSelect"], c = "#/Scene0BattleSelect")
        }
      else c = "#/MainQuest", a.historyArr = ["MyPage", "MainQuest"];
      a.resumeData = null;
      return c
    },
    J = function(b)
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
          var e = null;
          b.userChapterList && l.each(b.userChapterList, function(a, b)
          {
            a.chapterId == d.section.genericId && (e = a)
          });
          var g = null;
          e && a.playChapter && (c = e.cleared, g = a.playChapter.cleared, c && !g && (a.clearChapterModel = {}, a.clearChapterModel.before = a.playChapter, a.clearChapterModel.after = null, b.userChapterList && l.each(b.userChapterList, function(b)
          {
            b.chapter.questType == e.chapter.questType && b.chapter.partNo == e.chapter.partNo && b.chapterId !== e.chapterId && (a.clearChapterModel.after = b)
          })));
          a.playChapter = null;
          C.getIsScene0Info(
          {
            section: d
          }).isScene0 && (a.clearSectionModel = null, a.playSection = null, a.clearChapterModel = null)
        }
      }
    },
    K = function(b)
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
    L = function()
    {
      var b = A.dropItemJson(a.questBattleModel);
      b.addDropItem && (a.questBattleModel.addDropItem = b.addDropItem);
      b.addDropItemName && (a.questBattleModel.addDropItemName = b.addDropItemName);
      b.addDropItemQuantity && (a.questBattleModel.addDropItemQuantity = b.addDropItemQuantity);
      a.questBattleModel.rewardCodeArr = b.list;
      a.questBattleModel.rewardNameArr = b.nameList;
      a.questBattleModel.rewardQuantityArr = b.quantityList
    },
    M = x.View.extend(
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
        this.listenTo(this, "remove", this.removeView);
        this.template = l.template(G);
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
          J(this.model);
          this.nextPage = I(this.model);
          this.questLoopStatus = "none";
          if (this.canRetry = K(this.model)) this.questLoopStatus = A.getQuestLoopStatus(a.questBattleModel), A.supportPickUp(this.newestModel), L();
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
          questLoopStatus: this.questLoopStatus
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
        w = {};
        this.runRetry = this.runLoop = !1
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
                f = a.storage.userSectionList.findWhere(
                {
                  sectionId: this.model.userQuestBattleResultList[0].questBattle.sectionId
                });
              f && (f = f.toJSON(), f.section && f.section.secret && (b = f.section.secret));
              this.storyCheck(this.userQuestBattle.endStory, c, this.nextPage, b)
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
            f = a.doc.getElementById("playerLv");
          d.countUp(0, d.userQuestResult.exp, b);
          h.startSe(1007);
          setTimeout(function()
          {
            a.addClass(a.doc.getElementById("nextRankExp"), "on")
          }, 510);
          d.gaugeUp(d.userExpBefore, d.userExpAfter, c, f, "rank", "up");
          a.addClass(a.doc.getElementsByClassName("exGuageWrap")[0], "active")
        }, 2500);
        setTimeout(function()
        {
          var b = l.findWhere(a.storage.userFollowList.toJSON(),
            {
              followUserId: d.userQuestResult.helpUserId
            }) ? !0 : !1,
            c = 0,
            f = a.storage.userStatusList.findWhere(
            {
              statusId: "MAX_FOLLOW"
            }),
            e = a.storage.userFollowList.toJSON().length;
          void 0 !== f ? c = f.toJSON().point : b = !0;
          c <= e && (b = !0);
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
              f = new Image;
            f.src = "/magica/resource/image_web/common/treasure/" + b + "_close.png";
            f.onload = function()
            {
              var f = new Image;
              f.src = "/magica/resource/image_web/common/treasure/" + b + "_open.png";
              f.onload = function()
              {
                a.shift();
                0 < a.length ? d() : 0 < c.length && e()
              }
            }
          },
          e = function()
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
                0 < c.length && e()
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
        if (b = this.userQuestResult.dropRewardCodes)
        {
          var d = this,
            b = b.split(",");
          l.each(b, function(b, c)
          {
            var e = a.itemSet(b);
            e.itemCode ? (-1 < e.itemCode.indexOf("GIFT") ? e.imgPath = "/gift/" : -1 < e.itemCode.indexOf("MONEY") ? e.imgPath = "/main/" : -1 < e.itemCode.indexOf("riche") ? (d.rewardRiche += e.quantity | 0, e.imgPath = "/main/") : -1 < e.itemCode.indexOf("memoria_") ? e.imgPath = "/memoria/" : e.imgPath = -1 < e.itemCode.indexOf("EVENT_") ? "/event/" : "/main/", d.getItems.push(e)) : l.each(d.getItems, function(a, b)
            {
              a.itemCode == e.effectItemCode && (d.getItems[b].effectFlag = !0)
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
        var e = 0;
        b.totalExpForNextLevel && (e = b.totalExpForNextLevel - b.exp);
        a.doc.getElementById("nextRankExpNum").textContent = e;
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
            var e = !1;
            this.userQuestResult.episodeUserCardId && this.userQuestResult.episodeUserCardId === d.id && (e = !0);
            this.beforeCards.push(
            {
              beforeModel: c,
              afterModel: d,
              isLeader: e
            })
          } B.prototype.parentView = this;
        B.prototype.template = l.template($("#unitPartTemp").text());
        var g = a.doc.createDocumentFragment();
        l.each(this.beforeCards, function(a, b)
        {
          a = new B(a);
          g.appendChild(a.render().el)
        });
        a.doc.getElementById("charaWrap").appendChild(g);
        g = null
      },
      followerHandler: function()
      {
        D.prototype.parentView = this;
        D.prototype.template = l.template($("#supportPart").text());
        var b = l.template($("#followPopTemp").text()),
          c = r.getPageJson().userProfile,
          f = a.storage.userFollowList ? a.storage.userFollowList.toJSON().length : 0,
          e = {
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
          v = c.lastAccessDate ? Date.parse(c.lastAccessDate) / 1E3 : null;
        v ? (k = (k - v) / 60, 16 > k ? k = "15分以内" : 60 > k ? k = Math.floor(k) + "分前" : 60 < k && 1440 > k ? k = Math.floor(k / 60) + "時間前" : (k = k / 60 / 24, k = 30 < k ? Math.floor(k / 30) + "カ月前" : Math.floor(k) + "日前")) : k = "-日前";
        c.loginTimeLag = k;
        var p = {};
        l.each(c.userDeck, function(a, b)
        {
          -1 !== b.indexOf("questPositionId") && (b = b.split("questPositionId")[1], p[e[a]] = c.userDeck["userCardId" + b])
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
          l.each(e, function(b)
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
        v = d.userQuestResult.helpAttributeId;
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
          follow: f,
          maxFollow: k.toJSON().point,
          attribute: v
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(m);
        l.each(e, function(b)
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
          b = new D(
          {
            model: new t(b)
          });
          a.doc.querySelector("#supportDecks").appendChild(b.render().el)
        });
        h.getBaseData(a.getNativeObj());
        a.doc.getElementById("popupArea").getElementsByClassName("touchWrap")[0].addEventListener(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || void 0 === b.target.dataset.att || (a.removeClass(a.doc.getElementById("popupArea").getElementsByClassName("touchWrap")[0].getElementsByClassName("current")[0], "current"), a.addClass(b.target, "current"), a.doc.getElementById("popupArea").getElementsByClassName("unitWrap")[0].className = "unitWrap " + b.target.dataset.att)
        });
        var F = function(b)
        {
          b.preventDefault();
          a.isScrolled() || (a.doc.getElementById("followDecide").removeEventListener(a.cgti, F), r.ajaxPost(a.linkList.sendFollow,
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
        a.doc.getElementById("followDecide").addEventListener(a.cgti, F)
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
          var f = l.findWhere(d.model.userStatusList,
          {
            statusId: "MAX_ACP"
          });
          c.afterMaxAp = f ? f.point : c.beforeMaxAp;
          c.beforeMaxFollow = l.findWhere(d.oldStatusModel,
          {
            statusId: "MAX_FOLLOW"
          }).point;
          f = l.findWhere(d.model.userStatusList,
          {
            statusId: "MAX_FOLLOW"
          });
          c.afterMaxFollow = f ? f.point : c.beforeMaxFollow;
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
          for (var c = a.doc.getElementById("charaWrap").getElementsByTagName("li"), f = 0, e = c.length; f < e; f++)
          {
            var g = c[f];
            0 < f ? setTimeout(d.gaugeUp(d.unitExpBefore[f], d.unitExpAfter[f], g.getElementsByClassName("charaExGuage")[0], g, "charaEx", f), 500) : setTimeout(d.gaugeUp(d.unitExpBefore[f], d.unitExpAfter[f], g.getElementsByClassName("charaExGuage")[0], g, "charaEx", f, b), 500);
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
            model: new t(b)
          }, d.unitLvUpPop, d.model.questLoop), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), d.unitLvUpFlag || (d.unitLvUpFlag = !0), d.levelUpUnit.splice(0, 1)) : (a.tapBlock(!1), c = d.levelUpUnit[0][0], c.chara = d.levelUpUnit[0][1].chara, b.before = q.addExStatus(c), b.after = q.addExStatus(d.levelUpUnit[0][1]), b.type = "level", a.resultView = new u(
          {
            model: new t(b)
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
            }, c = a.doc.getElementById("charaWrap").getElementsByTagName("li"), f = 0, e = c.length; f < e; f++)
          {
            var g = c[f];
            0 < f ? setTimeout(d.gaugeUp(d.unitEpBefore[f], d.unitEpAfter[f], g.getElementsByClassName("charaEpGuage")[0], g, "charaEp", f), 500) : setTimeout(d.gaugeUp(d.unitEpBefore[f], d.unitEpAfter[f], g.getElementsByClassName("charaEpGuage")[0], g, "charaEp", f, b), 500);
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
            f;
          1 < d.epUpUnit.length ? (a.tapBlock(!1), f = d.epUpUnit[0][0], f.chara = b.chara, c.before = q.addExStatus(f), c.before.episodeLevel = d.epUpUnit[0][1], c.after = q.addExStatus(b), c.type = "episode", a.resultView = new u(
          {
            model: new t(c)
          }, function()
          {
            d.unitEpPop()
          }, d.model.questLoop), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), d.unitEpUpFlag = !0, d.epUpUnit.splice(0, 1)) : (a.tapBlock(!1), f = d.epUpUnit[0][0], f.chara = b.chara, c.before = q.addExStatus(f), c.before.episodeLevel = d.epUpUnit[0][1], c.after = q.addExStatus(b), c.type = "episode", a.resultView = new u(
          {
            model: new t(c)
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
        var c = function()
        {
          d.canRetry && d.model.questLoop ? d.autoQuest() : (d.canRetry && a.addClass(a.doc.getElementById("retryWrap"), "active"), a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextPageBtn")
        };
        1 > b.length ? d.timeOuts = setTimeout(c, 500) : (d.canRetry && !d.model.questLoop && a.addClass(a.doc.getElementById("retryWrap"), "active"), h.startSe(1604))
      },
      spliteRoling: function(b)
      {
        b.currentTarget.parentNode.classList.contains("clear") && a.addClass(b.currentTarget, "roling")
      },
      itemAnimEnd: function()
      {
        this.okFlg || (this.okFlg = !0, 14 < a.doc.getElementById("getItemList").getElementsByTagName("li").length && (a.addClass(a.doc.getElementById("itemResult"), "canScroll"), a.scrollSet("itemResult", "itemScroll")), d.canRetry && d.model.questLoop ? d.autoQuest() : (a.addClass(a.doc.getElementById("tapAction"), "active"), a.doc.getElementById("tapAction").dataset.nowFunc = "nextPageBtn"))
      },
      storyCheck: function(b, c, d, e)
      {
        var f = r.getPageJson(),
          n = a.storage.userSectionList.findWhere(
          {
            sectionId: this.model.userQuestBattleResultList[0].questBattle.sectionId
          }),
          k = !0;
        l.each(c, function(a)
        {
          b === a.adventureId && (k = !1)
        });
        if ("MAIN" == n.toJSON().section.questType || "SUB" == n.toJSON().section.questType || "CHARA" == n.toJSON().section.questType || "COSTUME" == n.toJSON().section.questType) f.gameUser.skipAdventure || (k = !0);
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
            e && (c += "_" + e);
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
        var e, f;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, f = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (e = function(a)
        {
          window.setTimeout(a, 10)
        }, f = function(a)
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
                var g = Math.floor(c / 500 * (l - b)) + b | 0;
                499 < c ? (l = String(l).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), d.innerHTML = "+" + l.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), f(m)) : (g = String(g).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), g = g.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), d.innerHTML = "+" + g, m = e(p))
              }
              else f(m),
                h = 0
            }
          },
          m = e(p)
      },
      gaugeUp: function(b, c, d, e, g, h, k)
      {
        var f, l, m = null;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, l = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (f = function(a)
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
          y = 0;
        "rank" === g && e && (y = Number(e.textContent));
        "charaEx" === g && e && (y = Number(e.getElementsByClassName("unitLv")[0].textContent));
        "charaEp" === g && e && (y = Number(e.getElementsByClassName("epLvNum")[0].textContent));
        var u = function()
        {
          n++;
          if ("QuestResult" === a.location)
          {
            m || (m = (new Date).getTime());
            var p = (new Date).getTime() - m;
            if (n <= r && b !== c)
            {
              var v = p / (10 * r),
                z = Math.floor((c - b) * v) + b - 100 * q | 0,
                x = 0;
              if ("rank" === g && 499 < p || "rank" !== g && 249 < p) v = 1, z = Math.floor(c - b) + b - 100 * q | 0;
              for (; 99 < z;) t++, x++,
                q++, z = Math.floor((c - b) * v) + b - 100 * q | 0;
              0 < x && ("rank" === g && e && (e.textContent = t + y), "charaEx" === g && e && (a.addClass(e.getElementsByClassName("lvup")[0], "anim"), a.addClass(e.getElementsByClassName("unitLv")[0], "c_red"), e.getElementsByClassName("unitLv")[0].textContent = t + y), "charaEp" === g && e && (a.addClass(e.getElementsByClassName("epup")[0], "anim"), a.addClass(e.getElementsByClassName("epLvNum")[0], "c_red"), e.getElementsByClassName("epLvNum")[0].textContent = t + y));
              d.style.width = z + "%";
              "rank" === g && 499 < p || "rank" !== g && 249 < p ? (l(w[g + h]), n = 0, k && k()) : w[g + h] = f(u)
            }
            else n <= r && b === c || "rank" === g && 500 > p || "rank" !== g && 259 > p ? w[g + h] = f(u) : (l(w[g + h]), n = 0, k && k())
          }
        };
        w[g + h] = f(u)
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
          var c = C.getIsScene0Info(
          {
            section: b.toJSON()
          });
          "DAILYTOWER" === b.toJSON().section.questType && "ENDLESSCHALLENGE" === b.toJSON().section.parameter.split("=")[1] ? location.href = "#/DeckFormation/endless" : location.href = c.isScene0 ? "#/DeckFormation/scene0Challenge" : "#/SupportSelect"
        }
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        this.runLoop || (a.nativeQuestPrm = null, a.apiQuestPrm = null, a.questHelperId = null, this.runRetry || (a.questBattleModel = null));
        w = a.resultView = null;
        d && d.timeOuts && clearTimeout(this.timeOuts);
        this.off();
        this.remove()
      }
    }),
    D = x.View.extend(
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
  return M
});
