define("underscore backbone backboneCommon ajaxControl text!template/test/QuestStub.html text!css/test/QuestStub.css js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility js/event/EventWalpurgis/Utility".split(" "), function(l, q, a, f, r, t, u, p, v, w)
{
  function x(b)
  {
    if (b)
    {
      b = b.webData;
      var d = b.userQuestBattleResultList[0].questBattle;
      console.log("data:", b);
      console.log("questResultData", d);
      a.responseSetStorage(b);
      if (b = (b = a.storage.userSectionList.findWhere(
        {
          sectionId: d.sectionId
        })) ? b.toJSON() : null) d = (d = a.storage.userChapterList.findWhere(
      {
        chapterId: b.section.genericId
      })) ? d.toJSON() : null, a.playChapter = d, a.playSection = b
    }
  }
  var n, y = function(b)
    {
      var d, f = b.userQuestBattleResultList[0].questBattle.sectionId,
        h = [];
      l.each(b.userQuestBattleList, function(a)
      {
        a.questBattle.sectionId == f && h.push(a)
      });
      b = a.storage.userSectionList.findWhere(
      {
        sectionId: f
      }).toJSON();
      switch (b.section.questType)
      {
        case "MAIN":
          d = "#/MainQuest";
          a.historyArr = ["MyPage", "MainQuest"];
          break;
        case "SUB":
          d = "#/SubQuest";
          a.historyArr = ["MyPage", "SubQuest"];
          break;
        case "CHARA":
        case "COSTUME":
          d = "#/CharaQuest";
          a.historyArr = ["MyPage", "CharaQuest"];
          break;
        default:
          void 0 !== b.section.dayOfTheWeekQuestType && (d = "#/EventQuest", a.historyArr = ["MyPage", "EventQuest"])
      }
      1 < h.length && (d = "#/QuestBattleSelect/" + f);
      return d
    },
    z = function(b)
    {
      if (a.playSection)
      {
        var d = a.storage.userSectionList.findWhere(
          {
            sectionId: b.userQuestBattleResultList[0].questBattle.sectionId
          }).toJSON(),
          f = d.cleared;
        !a.playSection.cleared && f && (a.clearSectionModel = d, a.playSection = null);
        var h = null;
        b.userChapterList && l.each(b.userChapterList, function(a, b)
        {
          a.chapterId == d.section.genericId && (h = a)
        });
        var k = null;
        h && (f = h.cleared, k = a.playChapter.cleared, f && !k && (a.clearChapterModel = {}, a.clearChapterModel.before = a.playChapter, a.clearChapterModel.after = null, b.userChapterList && l.each(b.userChapterList, function(b)
        {
          b.chapter.questType == h.chapter.questType && b.chapterId !== h.chapterId && (a.clearChapterModel.after = b)
        })));
        a.playChapter = null
      }
    },
    A = q.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .resultBtn"] = this.resultSend;
        return b
      },
      initialize: function(a)
      {
        this.template = l.template(r);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(f.getPageJson()));
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
          var d = b.currentTarget.getAttribute("data-result"),
            n = b.currentTarget.getAttribute("data-skip");
          setTimeout(function()
          {
            var b = {};
            b.userQuestBattleResultId = m.userQuestBattleResultList[0].id;
            f.ajaxPost(a.linkList.questNativeGet, b, function(k)
            {
              x(k);
              b.result = d;
              b.continueNum = Number(a.doc.querySelector('input[name="continueNum"]').value) || 0;
              b.totalTurn = Number(a.doc.querySelector('input[name="totalTurn"]').value) || 3;
              b.totalWave = 0;
              l.each(k.waveList, function(a, d)
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
              var e = Number(a.doc.querySelector('input[name="rateHp"]').value) || 100;
              100 < e ? e = 100 : 0 > e && (e = 0);
              b.rateHp = e;
              var h = {
                totalDamage: Number(a.doc.querySelector('input[name="totalDamage"]').value) || 1,
                mostDamage: Number(a.doc.querySelector('input[name="mostDamage"]').value) || 1
              };
              b.waveList = [];
              l.each(k.waveList, function(a, d)
              {
                b.waveList.push(h)
              });
              a.questBattleModel && (b.questLoop = a.questBattleModel.isLoop);
              var m = a.doc.querySelector('input[name="totalDamage"]').value.split(",");
              if (e = (e = a.storage.userSectionList.findWhere(
                {
                  sectionId: k.webData.userQuestBattleResultList[0].questBattle.sectionId
                })) ? e.toJSON() : null)
                if (e = e.section.questType, "ACCOMPLISH" === e || "DUNGEON" === e || "GROUPBATTLE" === e || "REG_ACC" === e) b.playerList = [], l.each(k.playerList, function(d, f)
                {
                  d.hpRemain = parseInt((m[f] ? m[f] : 100) / 100 * d.hp);
                  d.mpRemain = 10 * Number(a.doc.querySelector('input[name="mpRemain"]').value) || 0;
                  b.playerList.push(d)
                });
              f.ajaxPost(a.linkList.questNativeResultSend, b, function(b)
              {
                a.questNativeResponse = b;
                if ("true" == n) a.responseSetStorage(a.questNativeResponse), z(a.questNativeResponse), location.href = y(a.questNativeResponse), a.questBattleModel && !a.questBattleModel.raidId && "GROUPBATTLE" !== a.questBattleModel.questType && (a.questNativeResponse = null), nativeJSON = null;
                else if (a.stubQuest.resultUtl) location.href = a.stubQuest.resultUtl;
                else
                {
                  var g = k.webData.userQuestBattleResultList[0].questBattleId,
                    c = {},
                    e = a.storage.userSectionList.findWhere(
                    {
                      sectionId: k.webData.userQuestBattleResultList[0].questBattle.sectionId
                    }),
                    h = a.storage.userQuestBattleList.findWhere(
                    {
                      questBattleId: g
                    });
                  switch (e ? e.toJSON().section.questType : h.toJSON().questBattle.questBattleType)
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
                      c.retireUrl = "/magica/index.html#/EventSingleRaidTop/" + g;
                      break;
                    case "STORYRAID":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventStoryRaidTop/" + g;
                      break;
                    case "ACCOMPLISH":
                      c.resultUrl = "/magica/index.html#/QuestResult";
                      c.retireUrl = "/magica/index.html#/EventAccomplishTop";
                      break;
                    case "REG_ACC":
                      c.resultUrl = "/magica/index.html#/RegularEventAccomplishTop/" + g;
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
                      c.resultUrl = "/magica/index.html#/RegularEventGroupBattleTop/" + g;
                      c.retireUrl = "/magica/index.html#/RegularEventGroupBattleTop/" + g;
                      break;
                    case "EXTERMINATION":
                      c.resultUrl = "/magica/index.html#/RegularEventExterminationBattleSelect/" + g;
                      c.retireUrl = "/magica/index.html#/RegularEventExterminationBattleSelect";
                      break;
                    default:
                      c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/MainQuest"
                  }
                  g = u.getIsPuellaHistoriaInfo(
                  {
                    sectionInfo: e.toJSON()
                  });
                  g.isPuellaHistoria && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/PuellaHistoriaTop", g.num && g.num == p.getPuellaHistoriaLastBattleNum(
                  {
                    type: "singleRaid"
                  }) && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/PuellaHistoriaSingleRaid"), g.num && g.num == p.getPuellaHistoriaLastBattleNum(
                  {
                    type: "singleRaidLast"
                  }) && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/PuellaHistoriaSingleRaid"), g.num && g.num == p.getPuellaHistoriaLastBattleNum(
                  {
                    type: "groupRaid"
                  }) && (c.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultSubBoss", c.retireUrl = "/magica/index.html#/EventPuellaRaidTop", a.PuellaHistoriaLastBattleGroupRaidPrm && "main" == a.PuellaHistoriaLastBattleGroupRaidPrm.battleType && (c.resultUrl = "/magica/index.html#/PuellaHistoriaGroupRaidQuestResultMainBoss")));
                  v.getIsScene0Info(
                  {
                    section: e.toJSON()
                  }).isScene0 && (c.resultUrl = "/magica/index.html#/QuestResult", c.retireUrl = "/magica/index.html#/Scene0BattleSelect");
                  e = w.getAfterBattleUrl(
                  {
                    section: e.toJSON(),
                    pageJson: f.getPageJson()
                  });
                  e.isOpen && (c.resultUrl = e.resultUrl, c.retireUrl = e.retireUrl);
                  c && window.isLocal && (c.resultUrl = c.resultUrl.split("/magica/index.html")[1], c.retireUrl = c.retireUrl.split("/magica/index.html")[1]);
                  console.log("urls", c);
                  "FAILED" !== d ? location.href = c.resultUrl : (console.log(b), a.responseSetStorage(b), a.questBattleModel && !a.questBattleModel.raidId && "GROUPBATTLE" !== a.questBattleModel.questType && (a.questNativeResponse = null), a.questHelperId = null, a.historyArr = ["MyPage"], location.href = c.retireUrl)
                }
              })
            })
          }, 100)
        }
      }
    }),
    m = {},
    B = function()
    {
      m = {};
      a.setStyle(t);
      a.setGlobalView();
      var b = function(a)
      {
        m = a;
        n = new A
      };
      a.questBattleModel ? "RAID" === a.questBattleModel.questType ? f.ajaxPost(a.linkList.raidQuestStart, a.stubQuest, b) : "GROUPBATTLE" === a.questBattleModel.questType ? a.questBattleModel.isSimulate ? f.ajaxPost(a.linkList.groupBattleBattleSimulateStart, a.stubQuest, b) : f.ajaxPost(a.linkList.groupBattleBattleStart, a.stubQuest, b) : f.ajaxPost(a.linkList.questStart, a.stubQuest, b) : f.ajaxPost(a.linkList.questStart, a.stubQuest, b)
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
      f.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      window.isDebug ? ($(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      }), B()) : (location.href = "#/TopPage", location.reload())
    },
    remove: function(a)
    {
      n && n.remove();
      a()
    }
  }
});
