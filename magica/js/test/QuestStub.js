define("underscore backbone backboneCommon ajaxControl text!template/test/QuestStub.html text!css/test/QuestStub.css js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility".split(" "), function(k, p, a, d, q, r, t, n, u)
{
  function v(b)
  {
    if (b)
    {
      b = b.webData;
      var e = b.userQuestBattleResultList[0].questBattle;
      console.log("data:", b);
      console.log("questResultData", e);
      a.responseSetStorage(b);
      if (b = (b = a.storage.userSectionList.findWhere(
        {
          sectionId: e.sectionId
        })) ? b.toJSON() : null) e = (e = a.storage.userChapterList.findWhere(
      {
        chapterId: b.section.genericId
      })) ? e.toJSON() : null, a.playChapter = e, a.playSection = b
    }
  }
  var m, w = function(b)
    {
      var e, d = b.userQuestBattleResultList[0].questBattle.sectionId,
        g = [];
      k.each(b.userQuestBattleList, function(a)
      {
        a.questBattle.sectionId == d && g.push(a)
      });
      b = a.storage.userSectionList.findWhere(
      {
        sectionId: d
      }).toJSON();
      switch (b.section.questType)
      {
        case "MAIN":
          e = "#/MainQuest";
          a.historyArr = ["MyPage", "MainQuest"];
          break;
        case "SUB":
          e = "#/SubQuest";
          a.historyArr = ["MyPage", "SubQuest"];
          break;
        case "CHARA":
        case "COSTUME":
          e = "#/CharaQuest";
          a.historyArr = ["MyPage", "CharaQuest"];
          break;
        default:
          void 0 !== b.section.dayOfTheWeekQuestType && (e = "#/EventQuest", a.historyArr = ["MyPage", "EventQuest"])
      }
      1 < g.length && (e = "#/QuestBattleSelect/" + d);
      return e
    },
    x = function(b)
    {
      if (a.playSection)
      {
        var e = a.storage.userSectionList.findWhere(
          {
            sectionId: b.userQuestBattleResultList[0].questBattle.sectionId
          }).toJSON(),
          d = e.cleared;
        !a.playSection.cleared && d && (a.clearSectionModel = e, a.playSection = null);
        var g = null;
        b.userChapterList && k.each(b.userChapterList, function(a, b)
        {
          a.chapterId == e.section.genericId && (g = a)
        });
        var h = null;
        g && (d = g.cleared, h = a.playChapter.cleared, d && !h && (a.clearChapterModel = {}, a.clearChapterModel.before = a.playChapter, a.clearChapterModel.after = null, b.userChapterList && k.each(b.userChapterList, function(b)
        {
          b.chapter.questType == g.chapter.questType && b.chapterId !== g.chapterId && (a.clearChapterModel.after = b)
        })));
        a.playChapter = null
      }
    },
    y = p.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .resultBtn"] = this.resultSend;
        return b
      },
      initialize: function(a)
      {
        this.template = k.template(q);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide();
        a.scrollSet("hiddenWrap", "scrollInner")
      },
      resultSend: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var e = b.currentTarget.getAttribute("data-result"),
            m = b.currentTarget.getAttribute("data-skip");
          setTimeout(function()
          {
            var b = {};
            b.userQuestBattleResultId = l.userQuestBattleResultList[0].id;
            d.ajaxPost(a.linkList.questNativeGet, b, function(h)
            {
              v(h);
              b.result = e;
              b.continueNum = Number(a.doc.querySelector('input[name="continueNum"]').value) || 0;
              b.totalTurn = Number(a.doc.querySelector('input[name="totalTurn"]').value) || 3;
              b.totalWave = 0;
              k.each(h.waveList, function(a, e)
              {
                b.totalWave += 1
              });
              b.totalTurn = Number(a.doc.querySelector('input[name="totalTurn"]').value) || 1;
              b.clearTime = Number(a.doc.querySelector('input[name="clearTime"]').value) || 1;
              b.killNum = Number(a.doc.querySelector('input[name="killNum"]').value) || 1;
              b.magiaNum = Number(a.doc.querySelector('input[name="magiaNum"]').value) || 0;
              b.doppelNum = Number(a.doc.querySelector('input[name="doppelNum"]').value) || 0;
              b.deadNum = Number(a.doc.querySelector('input[name="deadNum"]').value) || 0;
              b.chargeNum = Number(a.doc.querySelector('input[name="chargeNum"]').value) || 0;
              b.skillNum = Number(a.doc.querySelector('input[name="skillNum"]').value) || 0;
              b.connectNum = Number(a.doc.querySelector('input[name="connectNum"]').value) || 0;
              b.diskAcceleNum = Number(a.doc.querySelector('input[name="diskAcceleNum"]').value) || 0;
              b.diskBlastNum = Number(a.doc.querySelector('input[name="diskBlastNum"]').value) || 0;
              b.diskChargeNum = Number(a.doc.querySelector('input[name="diskChargeNum"]').value) || 0;
              b.lastAttackCardId = Number(a.doc.querySelector('input[name="lastAttackCardId"]').value) || 10011;
              b.stackedChargeNum = Number(a.doc.querySelector('input[name="stackedChargeNum"]').value) || 0;
              var f = Number(a.doc.querySelector('input[name="rateHp"]').value) || 100;
              100 < f ? f = 100 : 0 > f && (f = 0);
              b.rateHp = f;
              var g = {
                totalDamage: Number(a.doc.querySelector('input[name="totalDamage"]').value) || 1,
                mostDamage: Number(a.doc.querySelector('input[name="mostDamage"]').value) || 1
              };
              b.waveList = [];
              k.each(h.waveList, function(a, e)
              {
                b.waveList.push(g)
              });
              a.questBattleModel && (b.questLoop = a.questBattleModel.isLoop);
              var l = a.doc.querySelector('input[name="totalDamage"]').value.split(",");
              if (f = (f = a.storage.userSectionList.findWhere(
                {
                  sectionId: h.webData.userQuestBattleResultList[0].questBattle.sectionId
                })) ? f.toJSON() : null)
                if (f = f.section.questType, "ACCOMPLISH" === f || "DUNGEON" === f || "GROUPBATTLE" === f || "REG_ACC" === f) b.playerList = [], k.each(h.playerList, function(e, d)
                {
                  e.hpRemain = parseInt((l[d] ? l[d] : 100) / 100 * e.hp);
                  e.mpRemain = 10 * Number(a.doc.querySelector('input[name="mpRemain"]').value) || 0;
                  b.playerList.push(e)
                });
              d.ajaxPost(a.linkList.questNativeResultSend, b, function(b)
              {
                a.questNativeResponse = b;
                if ("true" == m) a.responseSetStorage(a.questNativeResponse), x(a.questNativeResponse), location.href = w(a.questNativeResponse), a.questBattleModel && !a.questBattleModel.raidId && "GROUPBATTLE" !== a.questBattleModel.questType && (a.questNativeResponse = null), nativeJSON = null;
                else if (a.stubQuest.resultUtl) location.href = a.stubQuest.resultUtl;
                else
                {
                  var d = h.webData.userQuestBattleResultList[0].questBattleId,
                    c = {},
                    f = a.storage.userSectionList.findWhere(
                    {
                      sectionId: h.webData.userQuestBattleResultList[0].questBattle.sectionId
                    }),
                    g = a.storage.userQuestBattleList.findWhere(
                    {
                      questBattleId: d
                    });
                  switch (f ? f.toJSON().section.questType : g.toJSON().questBattle.questBattleType)
                  {
                    case "SUB":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/SubQuest";
                      break;
                    case "CHARA":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/CharaQuest";
                      break;
                    case "EVENT_S":
                    case "COMPOSE":
                    case "MATERIAL":
                    case "ENHANCEMENT_AROUSAL":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventQuest";
                      break;
                    case "TOWER":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventTowerTop";
                      break;
                    case "DAILYTOWER":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventDailyTowerTop";
                      break;
                    case "BRANCH":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventBranchTop";
                      break;
                    case "SINGLERAID":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventSingleRaidTop/" + d;
                      break;
                    case "STORYRAID":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventStoryRaidTop/" + d;
                      break;
                    case "ACCOMPLISH":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventAccomplishTop";
                      break;
                    case "REG_ACC":
                      c.resultUrl = "/magica/index.html#/RegularEventAccomplishTop/" + d;
                      c.retireUrl = "/magica/index.html#/RegularEventAccomplishTop";
                      break;
                    case "DUNGEON":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventDungeonMap";
                      break;
                    case "RAID":
                      c.resultUrl = "/magica/index.html#/EventRaidTop";
                      c.retireUrl = "/magica/index.html#/EventRaidTop";
                      break;
                    case "GROUPBATTLE":
                      c.resultUrl = "/magica/index.html#/RegularEventGroupBattleTop/" + d;
                      c.retireUrl = "/magica/index.html#/RegularEventGroupBattleTop/" + d;
                      break;
                    case "EXTERMINATION":
                      c.resultUrl = "/magica/index.html#/RegularEventExterminationBattleSelect/" + d;
                      c.retireUrl = "/magica/index.html#/RegularEventExterminationBattleSelect";
                      break;
                    default:
                      c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/MainQuest"
                  }
                  d = t.getIsPuellaHistoriaInfo(
                  {
                    sectionInfo: f.toJSON()
                  });
                  d.isPuellaHistoria && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/PuellaHistoriaTop", d.num && d.num == n.getPuellaHistoriaLastBattleNum(
                  {
                    type: "singleRaid"
                  }) && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/PuellaHistoriaSingleRaid"), d.num && d.num == n.getPuellaHistoriaLastBattleNum(
                  {
                    type: "groupRaid"
                  }) && (c.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultSubBoss", c.retireUrl = "/magica/index.html#/EventPuellaRaidTop", a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (c.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultMainBoss")));
                  u.getIsScene0Info(
                  {
                    section: f.toJSON()
                  }).isScene0 && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/Scene0BattleSelect");
                  c && window.isLocal && (c.resultUrl = c.resultUrl.split("/magica/index.html")[1], c.retireUrl = c.retireUrl.split("/magica/index.html")[1]);
                  console.log("urls", c);
                  "FAILED" !== e ? location.href = c.resultUrl : (console.log(b), a.responseSetStorage(b), a.questBattleModel && !a.questBattleModel.raidId && "GROUPBATTLE" !== a.questBattleModel.questType && (a.questNativeResponse = null), a.questHelperId = null, a.historyArr = ["MyPage"], location.href = c.retireUrl)
                }
              })
            })
          }, 100)
        }
      }
    }),
    l = {},
    z = function()
    {
      l = {};
      a.setStyle(r);
      a.setGlobalView();
      var b = function(a)
      {
        l = a;
        m = new y
      };
      a.questBattleModel ? "RAID" === a.questBattleModel.questType ? d.ajaxPost(a.linkList.raidQuestStart, a.stubQuest, b) : "GROUPBATTLE" === a.questBattleModel.questType ? a.questBattleModel.isSimulate ? d.ajaxPost(a.linkList.groupBattleBattleSimulateStart, a.stubQuest, b) : d.ajaxPost(a.linkList.groupBattleBattleStart, a.stubQuest, b) : d.ajaxPost(a.linkList.questStart, a.stubQuest, b) : d.ajaxPost(a.linkList.questStart, a.stubQuest, b)
    };
  return {
    needModelIdObj: [
    {
      id: "user",
      refresh: !0
    },
    {
      id: "gameUser",
      refresh: !0
    },
    {
      id: "userStatusList",
      refresh: !0
    },
    {
      id: "userCharaList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      window.isDebug ? ($(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      }), z()) : (location.href = "#/TopPage", location.reload())
    },
    remove: function(a)
    {
      m && m.remove();
      a()
    }
  }
});
