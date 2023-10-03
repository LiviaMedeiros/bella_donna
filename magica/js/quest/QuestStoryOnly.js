define("underscore backbone backboneCommon ajaxControl command js/quest/puellaHistoria/CreateModel js/quest/scene0/Utility".split(" "), function(k, y, a, h, p, l, g)
{
  var t = function(b)
    {
      var c = b.model,
        e = b.callback;
      b = "";
      c.sectionModel.section.secret && (b = "_" + c.sectionModel.section.secret);
      var d = c.questBattleModel.sectionId;
      99 == l.getIsPuellaHistoriaInfo(
      {
        sectionInfo: c.sectionModel
      }).num && (d = !1);
      a.playStory(
      {
        cmd: p,
        ajaxControl: h,
        storyId: c.questBattleModel.startStory + b,
        fullVoiceSectionId: d,
        isForcePlay: !0,
        callback: function()
        {
          e(
          {
            model: c
          })
        }
      })
    },
    u = function(b)
    {
      var c = b.model,
        e = b.callback,
        d = c.questBattleModel.sectionId;
      b.isSideStory && (d = !1);
      var f = function(b)
        {
          var c = b.callback;
          a.playStory(
          {
            cmd: p,
            ajaxControl: h,
            storyId: b.storyId,
            fullVoiceSectionId: d,
            isForcePlay: !0,
            callback: function()
            {
              c()
            }
          })
        },
        m = c.questBattleModel.sceneZeroStoryIds.split(","),
        n = 0,
        g = function()
        {
          n++;
          m.length == n ? e(
          {
            model: c
          }) : f(
          {
            storyId: m[n],
            callback: function()
            {
              g()
            }
          })
        };
      f(
      {
        storyId: m[0],
        callback: function()
        {
          g()
        }
      })
    },
    v = function(a)
    {
      var c = a.callback;
      h.simplePageModelGet("Scene0StorySelectAfterFilm1", null, function(a)
      {
        a && a.receiveCardPresentId ? g.playCardGetMvMabayu(
        {
          presentId: a.receiveCardPresentId,
          callback: function()
          {
            c()
          }
        }) : c()
      })
    },
    r = function(b)
    {
      var c = b.model,
        e, d = function(b)
        {
          a.questNativeResponse = b;
          a.responseSetStorage(a.questNativeResponse);
          w(a.questNativeResponse);
          10420203 == c.questBattleModel.questBattleId ? v(
          {
            callback: function()
            {
              location.href = q(a.questNativeResponse)
            }
          }) : location.href = q(a.questNativeResponse)
        },
        f = function(b)
        {
          if (b)
          {
            b = b.webData;
            var c = b.userQuestBattleResultList[0].questBattle;
            a.responseSetStorage(b);
            if (b = (b = a.storage.userSectionList.findWhere(
              {
                sectionId: c.sectionId
              })) ? b.toJSON() : null) c = (c = a.storage.userChapterList.findWhere(
            {
              chapterId: b.section.genericId
            })) ? c.toJSON() : null, a.playChapter = c, a.playSection = b
          }
          b = {
            result: "SUCCESSFUL"
          };
          b.userQuestBattleResultId = e;
          h.ajaxPost(a.linkList.questNativeResultSend, b, d)
        };
      b = {};
      b.questBattleId = c.questBattleModel.questBattleId;
      b.deckType = 1;
      h.ajaxPost(a.linkList.questStart, b, function(b)
      {
        var c = {};
        c.userQuestBattleResultId = b.userQuestBattleResultList[0].id;
        e = c.userQuestBattleResultId;
        h.ajaxPost(a.linkList.questNativeGet, c, f)
      })
    },
    w = function(b)
    {
      if (a.playSection)
      {
        var c = a.storage.userSectionList.findWhere(
          {
            sectionId: b.userQuestBattleResultList[0].questBattle.sectionId
          }).toJSON(),
          e = c.cleared;
        !a.playSection.cleared && e && (a.clearSectionModel = c, a.playSection = null);
        var d = null;
        b.userChapterList && k.each(b.userChapterList, function(a, b)
        {
          a.chapterId == c.section.genericId && (d = a)
        });
        var f = null;
        d && (e = d.cleared, f = a.playChapter.cleared, e && !f && (a.clearChapterModel = {}, a.clearChapterModel.before = a.playChapter, a.clearChapterModel.after = null, b.userChapterList && k.each(b.userChapterList, function(b)
        {
          b.chapter.questType == d.chapter.questType && b.chapterId !== d.chapterId && (a.clearChapterModel.after = b)
        })));
        a.playChapter = null;
        99 == l.getIsPuellaHistoriaInfo(
        {
          sectionInfo: c
        }).num && (a.clearSectionModel = null, a.playSection = null, a.clearChapterModel = null);
        g.getIsScene0Info(
        {
          section: c
        }).isScene0 && (a.clearSectionModel = null, a.playSection = null, a.clearChapterModel = null)
      }
    },
    q = function(b)
    {
      var c, e = b.userQuestBattleResultList[0].questBattle.sectionId,
        d = a.storage.userSectionList.findWhere(
        {
          sectionId: e
        }).toJSON();
      switch (d.section.questType)
      {
        case "MAIN":
          c = "#/MainQuest";
          a.historyArr = ["MyPage", "MainQuest"];
          break;
        case "SUB":
          c = "#/SubQuest";
          a.historyArr = ["MyPage", "SubQuest"];
          break;
        case "CHARA":
        case "COSTUME":
          c = "#/CharaQuest";
          a.historyArr = ["MyPage", "CharaQuest"];
          break;
        default:
          void 0 !== d.section.dayOfTheWeekQuestType && (c = "#/EventQuest", a.historyArr = ["MyPage", "EventQuest"])
      }
      var f = !1;
      b.userSectionList && k.each(b.userSectionList, function(a, b, c)
      {
        a.sectionId == e && a.cleared && (f = !0)
      });
      f || (c = "#/QuestBattleSelect/" + e);
      b = l.getIsPuellaHistoriaInfo(
      {
        sectionInfo: d,
        sectionList: a.storage.userSectionList.toJSON()
      });
      99 == b.num && (c = "#/QuestBattleSelect/" + b.sectionInfoList[b.sectionInfoList.length - 1].sectionId, a.historyArr = ["MyPage", "MainQuest", "PuellaHistoriaTop"], b.isLastSection && (c = "#/PuellaHistoriaTop"));
      d = g.getIsScene0Info(
      {
        section: d
      });
      d.isScene0 && (a.historyArr = ["MyPage", "Scene0Top"], d.filmNum ? (c = "#/Scene0StorySelectBeforeFilm1", g.getIsScene0Film1Clear(
      {
        userSectionList: a.storage.userSectionList.toJSON()
      }) && localStorage.getItem("scene0BeforeFilm1IsClear") && (c = "#/Scene0StorySelectAfterFilm1")) : d.sideStoryNum && (c = "#/Scene0SideStorySelect"));
      return c
    },
    x = function()
    {
      var b = g.getIsScene0Info(
      {
        section: a.questStoryOnlyModel.sectionModel
      });
      b.isScene0 && a.questStoryOnlyModel.questBattleModel.sceneZeroStoryIds ? u(
      {
        model: a.questStoryOnlyModel,
        isSideStory: b.sideStoryNum,
        callback: function(b)
        {
          a.questStoryOnlyModel.questNoClearNextPage ? location.href = a.questStoryOnlyModel.questNoClearNextPage : r(
          {
            model: b.model
          })
        }
      }) : t(
      {
        model: a.questStoryOnlyModel,
        callback: function(b)
        {
          a.questStoryOnlyModel.questNoClearNextPage ? location.href = a.questStoryOnlyModel.questNoClearNextPage : r(
          {
            model: b.model
          })
        }
      })
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    }],
    fetch: function(b)
    {
      a.questStoryOnlyModel ? h.pageModelGet(this.needModelIdObj, null, "noConnect") : location.href = "#/MainQuest"
    },
    init: function()
    {
      a.globalMenuView && a.globalMenuView.removeView();
      a.historyArr = ["MyPage", "MainQuest", "QuestStoryOnly"];
      x()
    },
    remove: function(a)
    {
      a()
    }
  }
});
