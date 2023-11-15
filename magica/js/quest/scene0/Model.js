define("underscore backbone backboneCommon ajaxControl command js/quest/scene0/Utility".split(" "), function(f, p, m, q, r, g)
{
  return {
    getTopModel: function(a)
    {
      a = a.pageJson;
      var c = {
        itemInfo: g.getMainItemInfo(
        {
          pageJson: a
        }),
        isFilm1Clear: !1,
        templateClass: "BeforeFilm1",
        StorySelectUrl: "#/Scene0StorySelectBeforeFilm1"
      };
      g.getIsScene0Film1Clear(
      {
        userSectionList: a.userSectionList
      }) && (c.isFilm1Clear = !0, c.templateClass = "AfterFilm1", c.StorySelectUrl = "#/Scene0StorySelectAfterFilm1");
      c.limitedMission = {
        balloonSecClass: "",
        endDateText: "11/24"
      };
      return c
    },
    getBeforeFilm1Model: function(a)
    {
      a = a.pageJson;
      var c = {
        itemInfo: g.getMainItemInfo(
        {
          pageJson: a
        }),
        questInfo:
        {}
      };
      c.questInfo = g.getScene0QuestInfo(
      {
        pageJson: a,
        targetNum: 1
      });
      return c
    },
    getAfterFilm1Model: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: g.getMainItemInfo(
          {
            pageJson: c
          }),
          questInfo:
          {},
          nativeModel:
          {
            filmList: []
          },
          filmInfoWeb: [],
          clearFilmList: []
        },
        h = [];
      for (a = 1; 17 >= a; a++) h.push(a);
      b.questInfo = function()
      {
        var a = [];
        f.each(h, function(b, e, d)
        {
          b = g.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      a = !1;
      f.each(b.questInfo, function(a, e, c)
      {
        var d = a.sectionInfoList[0];
        e = Number(d.section.viewParameterMap.SCENE0_FILM_NUM);
        c = g.convertFilmNo(
        {
          getType: "native",
          webFilmNo: e
        });
        var k = {
            id: c.nativeFilmNo,
            version: c.nativeVersionNo,
            status: function()
            {
              var b = "NEW";
              f.each(a.questInfoList, function(a, e, d)
              {
                a.cleared && (b = "READY")
              });
              return b
            }(),
            isExtra: !1,
            hasList: d.cleared,
            nextWaitDay: 0,
            dayList: []
          },
          l = {
            id: e,
            sectionInfo: d,
            dayList: []
          },
          n = function(a)
          {
            var b = a.filmInfoWeb,
              e = a.section,
              d = a.val;
            a.filmInfo.dayList.push(
            {
              id: d.questBattle.sectionIndex,
              status: function()
              {
                var a = "NEW";
                d.cleared && (a = "READY");
                return a
              }(),
              releaseCost: function()
              {
                var a = d.questBattle.needItemNum;
                d.cleared && (a = 0);
                return a
              }(),
              checkMessage: function()
              {
                var a = "";
                d.questBattle.parameterMap && d.questBattle.parameterMap.MESSAGE && (a = d.questBattle.parameterMap.MESSAGE);
                return a
              }()
            });
            b.dayList[d.questBattle.sectionIndex] = {
              id: d.questBattle.sectionIndex,
              sectionInfo: e,
              questInfo: d,
              isClear: d.cleared,
              needItemNum: d.questBattle.needItemNum
            }
          };
        f.each(a.questInfoList, function(a, b, e)
        {
          n(
          {
            filmInfo: k,
            filmInfoWeb: l,
            section: d,
            val: a
          })
        });
        b.nativeModel.filmList.push(k);
        b.filmInfoWeb[e] = l;
        l.sectionInfo.cleared && b.clearFilmList.push(l)
      });
      b.nativeModel.filmList.sort(function(a, b)
      {
        return a.id - b.id
      });
      var d = b.nativeModel.filmList.slice(-1)[0];
      a = d.id;
      var e = b.filmInfoWeb[a];
      b.nativeModel.displayFilmId = a;
      var k = localStorage.getItem("scene0LastFilmId");
      k && (b.nativeModel.displayFilmId = Number(k));
      e.sectionInfo.cleared && e.sectionInfo.isNewestSection ? (e = d.dayList.slice(-1)[0].id, d.nextWaitDay = e) : b.nativeModel.displayFilmId = a;
      localStorage.getItem("scene0AfterFilm1IsFirst") || (b.nativeModel.startChangeFilmId = a, b.nativeModel.displayFilmId = a - 1, localStorage.setItem("scene0AfterFilm1IsFirst", "true"));
      return b
    },
    getBattleSelectModel: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: g.getMainItemInfo(
          {
            pageJson: c
          }),
          userQuestAdventureList: c.userQuestAdventureList,
          questInfo:
          {},
          challengeList: [],
          difficultyLevel: function()
          {
            var a = "level1";
            m.scene0BattleDifficultyLevel && (a = m.scene0BattleDifficultyLevel);
            return a
          }()
        },
        h = [];
      for (a = 1; 3 >= a; a++) h.push(a);
      b.questInfo = function()
      {
        var a = [];
        f.each(h, function(b, d, f)
        {
          b = g.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b,
            type: "battle"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      f.each(b.questInfo, function(a, e, c)
      {
        var d = a.sectionInfoList[0];
        e = Number(d.section.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM);
        c = {
          id: e,
          difficultyLevel: e,
          questList: []
        };
        f.each(a.questInfoList, function(a, b, e)
        {
          c.questList.push(
          {
            id: Number(b + 1),
            difficultyLevel: c.difficultyLevel,
            sectionInfo: d,
            questInfo: a,
            isClear: a.cleared,
            bossName: function()
            {
              var b = "";
              a.questBattle.parameterMap && a.questBattle.parameterMap.BOSS_NAME && (b = a.questBattle.parameterMap.BOSS_NAME);
              return b
            }()
          })
        });
        b.challengeList.push(c)
      });
      return b
    },
    getSideStorySelectModel: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: g.getMainItemInfo(
          {
            pageJson: c
          }),
          itemInfoSide: g.getSideItemInfo(
          {
            pageJson: c
          }),
          questNeedItemNum: !1,
          playBtnClass: "TE se_decide",
          questInfo:
          {},
          sideStoryList: [],
          noClearList: []
        },
        h = [];
      for (a = 1; 17 >= a; a++) h.push(a);
      b.questInfo = function()
      {
        var a = [];
        f.each(h, function(b, d, f)
        {
          b = g.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b,
            type: "side"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      f.each(b.questInfo, function(a, c, g)
      {
        var d = a.sectionInfoList[0],
          e = Number(d.section.viewParameterMap.SCENE0_SIDESTORY_NUM);
        g = {
          id: e,
          questList: []
        };
        f.each(a.questInfoList, function(a, c, f)
        {
          c = Number(c + 1);
          f = Number(a.questBattle.needItemNum);
          g.questList.push(
          {
            id: c,
            sectionInfo: d,
            questInfo: a,
            isClear: a.cleared,
            needItemNum: f,
            charaId: function(b)
            {
              b = null;
              a.questBattle.parameterMap && a.questBattle.parameterMap.SIDESTORY_CHARANUM && (b = a.questBattle.parameterMap.SIDESTORY_CHARANUM);
              return b
            }()
          });
          a.cleared || b.noClearList.push(
          {
            listId: e,
            btnId: c
          });
          b.questNeedItemNum = f
        });
        b.sideStoryList.push(g)
      });
      if (b.questNeedItemNum > b.itemInfoSide.quantity || 0 == b.noClearList.length) b.playBtnClass = "off";
      return b
    }
  }
});
