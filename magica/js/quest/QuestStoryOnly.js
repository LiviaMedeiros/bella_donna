define("underscore backbone backboneCommon ajaxControl command js/quest/puellaHistoria/CreateModel js/quest/scene0/Utility".split(" "), function(m, z, b, g, r, n, k)
{
  var v = function(a)
    {
      var c = a.model,
        e = a.callback;
      a = "";
      c.sectionModel.section.secret && (a = "_" + c.sectionModel.section.secret);
      var d = c.questBattleModel.sectionId;
      99 == n.getIsPuellaHistoriaInfo(
      {
        sectionInfo: c.sectionModel
      }).num && (d = !1);
      b.playStory(
      {
        cmd: r,
        ajaxControl: g,
        storyId: c.questBattleModel.startStory + a,
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
    u = function(a)
    {
      var c = a.model,
        e = a.callback,
        d = c.questBattleModel.sectionId;
      a.isSideStory && (d = !1);
      var f = function(a)
        {
          var c = a.callback;
          b.playStory(
          {
            cmd: r,
            ajaxControl: g,
            storyId: a.storyId,
            fullVoiceSectionId: d,
            isForcePlay: !0,
            callback: function()
            {
              c()
            }
          })
        },
        h = c.questBattleModel.sceneZeroStoryIds.split(","),
        p = 0,
        t = function()
        {
          p++;
          h.length == p ? e(
          {
            model: c
          }) : f(
          {
            storyId: h[p],
            callback: function()
            {
              t()
            }
          })
        };
      f(
      {
        storyId: h[0],
        callback: function()
        {
          t()
        }
      })
    },
    w = function(b)
    {
      var a = b.callback;
      g.simplePageModelGet("Scene0StorySelectAfterFilm1", null, function(b)
      {
        b && b.receiveCardPresentId ? k.playCardGetMvMabayu(
        {
          presentId: b.receiveCardPresentId,
          callback: function()
          {
            a()
          }
        }) : a()
      })
    },
    q = function(a)
    {
      var c = a.callback,
        e, d = function(a)
        {
          b.questNativeResponse = a;
          b.responseSetStorage(b.questNativeResponse);
          x(b.questNativeResponse);
          c()
        },
        f = function(a)
        {
          if (a)
          {
            a = a.webData;
            var c = a.userQuestBattleResultList[0].questBattle;
            b.responseSetStorage(a);
            if (a = (a = b.storage.userSectionList.findWhere(
              {
                sectionId: c.sectionId
              })) ? a.toJSON() : null) c = (c = b.storage.userChapterList.findWhere(
            {
              chapterId: a.section.genericId
            })) ? c.toJSON() : null, b.playChapter = c, b.playSection = a
          }
          a = {
            result: "SUCCESSFUL"
          };
          a.userQuestBattleResultId = e;
          g.ajaxPost(b.linkList.questNativeResultSend, a, d)
        },
        h = {};
      h.questBattleId = a.model.questBattleModel.questBattleId;
      h.deckType = 1;
      g.ajaxPost(b.linkList.questStart, h, function(a)
      {
        var c = {};
        c.userQuestBattleResultId = a.userQuestBattleResultList[0].id;
        e = c.userQuestBattleResultId;
        g.ajaxPost(b.linkList.questNativeGet, c, f)
      })
    },
    x = function(a)
    {
      if (b.playSection)
      {
        var c = b.storage.userSectionList.findWhere(
          {
            sectionId: a.userQuestBattleResultList[0].questBattle.sectionId
          }).toJSON(),
          e = c.cleared;
        !b.playSection.cleared && e && (b.clearSectionModel = c, b.playSection = null);
        var d = null;
        a.userChapterList && m.each(a.userChapterList, function(b, a)
        {
          b.chapterId == c.section.genericId && (d = b)
        });
        var f = null;
        d && (e = d.cleared, f = b.playChapter.cleared, e && !f && (b.clearChapterModel = {}, b.clearChapterModel.before = b.playChapter, b.clearChapterModel.after = null, a.userChapterList && m.each(a.userChapterList, function(a)
        {
          a.chapter.questType == d.chapter.questType && a.chapterId !== d.chapterId && (b.clearChapterModel.after = a)
        })));
        b.playChapter = null;
        99 == n.getIsPuellaHistoriaInfo(
        {
          sectionInfo: c
        }).num && (b.clearSectionModel = null, b.playSection = null, b.clearChapterModel = null);
        k.getIsScene0Info(
        {
          section: c
        }).isScene0 && (b.clearSectionModel = null, b.playSection = null, b.clearChapterModel = null)
      }
    },
    l = function(a)
    {
      var c, e = a.userQuestBattleResultList[0].questBattle.sectionId,
        d = b.storage.userSectionList.findWhere(
        {
          sectionId: e
        }).toJSON();
      switch (d.section.questType)
      {
        case "MAIN":
          c = "#/MainQuest";
          b.historyArr = ["MyPage", "MainQuest"];
          break;
        case "SUB":
          c = "#/SubQuest";
          b.historyArr = ["MyPage", "SubQuest"];
          break;
        case "CHARA":
        case "COSTUME":
          c = "#/CharaQuest";
          b.historyArr = ["MyPage", "CharaQuest"];
          break;
        default:
          void 0 !== d.section.dayOfTheWeekQuestType && (c = "#/EventQuest", b.historyArr = ["MyPage", "EventQuest"])
      }
      var f = !1;
      a.userSectionList && m.each(a.userSectionList, function(b, a, c)
      {
        b.sectionId == e && b.cleared && (f = !0)
      });
      f || (c = "#/QuestBattleSelect/" + e);
      a = n.getIsPuellaHistoriaInfo(
      {
        sectionInfo: d,
        sectionList: b.storage.userSectionList.toJSON()
      });
      99 == a.num && (c = "#/QuestBattleSelect/" + a.sectionInfoList[a.sectionInfoList.length - 1].sectionId, b.historyArr = ["MyPage", "MainQuest", "PuellaHistoriaTop"], a.isLastSection && (c = "#/PuellaHistoriaTop"));
      a = k.getIsScene0Info(
      {
        section: d
      });
      a.isScene0 && (b.historyArr = ["MyPage", "Scene0Top"], a.filmNum ? 2 <= a.filmNum ? (localStorage.setItem("scene0BeforeFilm1IsClear", "true"), c = "#/Scene0StorySelectAfterFilm1") : (c = "#/Scene0StorySelectBeforeFilm1", d.cleared && localStorage.getItem("scene0BeforeFilm1IsClear") && (c = "#/Scene0StorySelectAfterFilm1")) : a.sideStoryNum && (c = "#/Scene0SideStorySelect"));
      return c
    },
    y = function()
    {
      b.androidKeyStop = !0;
      var a = k.getIsScene0Info(
      {
        section: b.questStoryOnlyModel.sectionModel
      });
      a.isScene0 && b.questStoryOnlyModel.questBattleModel.sceneZeroStoryIds ? a.sideStoryNum ? q(
      {
        model: b.questStoryOnlyModel,
        callback: function()
        {
          u(
          {
            model: b.questStoryOnlyModel,
            isSideStory: a.sideStoryNum,
            callback: function(a)
            {
              location.href = l(b.questNativeResponse)
            }
          })
        }
      }) : u(
      {
        model: b.questStoryOnlyModel,
        isSideStory: a.sideStoryNum,
        callback: function(a)
        {
          var c = a.model;
          b.questStoryOnlyModel.questNoClearNextPage ? location.href = b.questStoryOnlyModel.questNoClearNextPage : q(
          {
            model: c,
            callback: function()
            {
              10420203 == c.questBattleModel.questBattleId ? w(
              {
                callback: function()
                {
                  location.href = l(b.questNativeResponse)
                }
              }) : location.href = l(b.questNativeResponse)
            }
          })
        }
      }) : v(
      {
        model: b.questStoryOnlyModel,
        callback: function(a)
        {
          a = a.model;
          b.questStoryOnlyModel.questNoClearNextPage ? location.href = b.questStoryOnlyModel.questNoClearNextPage : q(
          {
            model: a,
            callback: function()
            {
              location.href = l(b.questNativeResponse)
            }
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
    fetch: function(a)
    {
      b.questStoryOnlyModel ? g.pageModelGet(this.needModelIdObj, null, "noConnect") : location.href = "#/MainQuest"
    },
    init: function()
    {
      b.globalMenuView && b.globalMenuView.removeView();
      b.historyArr = ["MyPage", "MainQuest", "QuestStoryOnly"];
      y()
    },
    remove: function(a)
    {
      b.androidKeyStop = !1;
      a()
    }
  }
});
