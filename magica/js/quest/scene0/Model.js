define("underscore backbone backboneCommon ajaxControl command js/quest/scene0/Utility".split(" "), function(e, p, m, q, r, f)
{
  return {
    getTopModel: function(a)
    {
      a = a.pageJson;
      var c = {
        itemInfo: f.getMainItemInfo(
        {
          pageJson: a
        }),
        isFilm1Clear: !1,
        templateClass: "BeforeFilm1",
        StorySelectUrl: "#/Scene0StorySelectBeforeFilm1"
      };
      f.getIsScene0Film1Clear(
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
        itemInfo: f.getMainItemInfo(
        {
          pageJson: a
        }),
        questInfo:
        {}
      };
      c.questInfo = f.getScene0QuestInfo(
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
          itemInfo: f.getMainItemInfo(
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
        k = [];
      for (a = 1; 17 >= a; a++) k.push(a);
      b.questInfo = function()
      {
        var a = [];
        e.each(k, function(b, d, h)
        {
          b = f.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      a = !1;
      e.each(b.questInfo, function(a, d, h)
      {
        var c = a.sectionInfoList[0];
        d = Number(c.section.viewParameterMap.SCENE0_FILM_NUM);
        h = f.convertFilmNo(
        {
          getType: "native",
          webFilmNo: d
        });
        var g = {
            id: h.nativeFilmNo,
            version: h.nativeVersionNo,
            status: function()
            {
              var b = "NEW";
              e.each(a.questInfoList, function(a, c, d)
              {
                a.cleared && (b = "READY")
              });
              return b
            }(),
            isExtra: !1,
            hasList: c.cleared,
            nextWaitDay: 0,
            dayList: []
          },
          l = {
            id: d,
            sectionInfo: c,
            dayList: []
          },
          n = function(a)
          {
            var b = a.filmInfoWeb,
              c = a.section,
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
              sectionInfo: c,
              questInfo: d,
              isClear: d.cleared,
              needItemNum: d.questBattle.needItemNum
            }
          };
        e.each(a.questInfoList, function(a, b, d)
        {
          4 == g.id ? 13 >= a.questBattle.sectionIndex && n(
          {
            filmInfo: g,
            filmInfoWeb: l,
            section: c,
            val: a
          }) : n(
          {
            filmInfo: g,
            filmInfoWeb: l,
            section: c,
            val: a
          })
        });
        b.nativeModel.filmList.push(g);
        b.filmInfoWeb[d] = l;
        l.sectionInfo.cleared && b.clearFilmList.push(l)
      });
      b.nativeModel.filmList.sort(function(a, b)
      {
        return a.id - b.id
      });
      var d = b.nativeModel.filmList.slice(-1)[0];
      a = d.id;
      b.nativeModel.displayFilmId = a;
      var h = localStorage.getItem("scene0LastFilmId");
      h && (b.nativeModel.displayFilmId = Number(h));
      4 == a && "READY" == d.dayList.slice(-1)[0].status ? (h = d.dayList.slice(-1)[0].id, d.nextWaitDay = h) : b.nativeModel.displayFilmId = a;
      localStorage.getItem("scene0AfterFilm1IsFirst") || (b.nativeModel.startChangeFilmId = a, b.nativeModel.displayFilmId = a - 1, localStorage.setItem("scene0AfterFilm1IsFirst", "true"));
      return b
    },
    getBattleSelectModel: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: f.getMainItemInfo(
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
        k = [];
      for (a = 1; 3 >= a; a++) k.push(a);
      b.questInfo = function()
      {
        var a = [];
        e.each(k, function(b, d, e)
        {
          b = f.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b,
            type: "battle"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      e.each(b.questInfo, function(a, c, g)
      {
        var d = a.sectionInfoList[0];
        c = Number(d.section.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM);
        g = {
          id: c,
          difficultyLevel: c,
          questList: []
        };
        e.each(a.questInfoList, function(a, b, c)
        {
          g.questList.push(
          {
            id: Number(b + 1),
            difficultyLevel: g.difficultyLevel,
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
        b.challengeList.push(g)
      });
      return b
    },
    getSideStorySelectModel: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: f.getMainItemInfo(
          {
            pageJson: c
          }),
          itemInfoSide: f.getSideItemInfo(
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
        k = [];
      for (a = 1; 17 >= a; a++) k.push(a);
      b.questInfo = function()
      {
        var a = [];
        e.each(k, function(b, d, e)
        {
          b = f.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b,
            type: "side"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      e.each(b.questInfo, function(a, c, g)
      {
        var d = a.sectionInfoList[0],
          f = Number(d.section.viewParameterMap.SCENE0_SIDESTORY_NUM);
        g = {
          id: f,
          questList: []
        };
        e.each(a.questInfoList, function(a, c, e)
        {
          c = Number(c + 1);
          e = Number(a.questBattle.needItemNum);
          g.questList.push(
          {
            id: c,
            sectionInfo: d,
            questInfo: a,
            isClear: a.cleared,
            needItemNum: e,
            charaId: function(b)
            {
              b = null;
              a.questBattle.parameterMap && a.questBattle.parameterMap.SIDESTORY_CHARANUM && (b = a.questBattle.parameterMap.SIDESTORY_CHARANUM);
              return b
            }()
          });
          a.cleared || b.noClearList.push(
          {
            listId: f,
            btnId: c
          });
          b.questNeedItemNum = e
        });
        b.sideStoryList.push(g)
      });
      if (b.questNeedItemNum > b.itemInfoSide.quantity || 0 == b.noClearList.length) b.playBtnClass = "off";
      return b
    }
  }
});
