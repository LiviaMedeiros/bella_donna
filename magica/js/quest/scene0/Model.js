define("underscore backbone backboneCommon ajaxControl command js/quest/scene0/Utility".split(" "), function(h, t, n, u, v, k)
{
  return {
    getTopModel: function(a)
    {
      a = a.pageJson;
      var e = {
        itemInfo: k.getMainItemInfo(
        {
          pageJson: a
        }),
        isFilm1Clear: !1,
        templateClass: "BeforeFilm1",
        StorySelectUrl: "#/Scene0StorySelectBeforeFilm1"
      };
      k.getIsScene0Film1Clear(
      {
        userSectionList: a.userSectionList
      }) && (e.isFilm1Clear = !0, e.templateClass = "AfterFilm1", e.StorySelectUrl = "#/Scene0StorySelectAfterFilm1");
      e.limitedMission = {
        balloonSecClass: "noDisp",
        endDateText: "1/29"
      };
      return e
    },
    getBeforeFilm1Model: function(a)
    {
      a = a.pageJson;
      var e = {
        itemInfo: k.getMainItemInfo(
        {
          pageJson: a
        }),
        questInfo:
        {}
      };
      e.questInfo = k.getScene0QuestInfo(
      {
        pageJson: a,
        targetNum: 1
      });
      return e
    },
    getAfterFilm1Model: function(a)
    {
      var e = a.pageJson,
        b = {
          itemInfo: k.getMainItemInfo(
          {
            pageJson: e
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
        g = [];
      for (a = 1; 18 >= a; a++) g.push(a);
      b.questInfo = function()
      {
        var b = [];
        h.each(g, function(a, p, f)
        {
          a = k.getScene0QuestInfo(
          {
            pageJson: e,
            targetNum: a
          });
          0 < a.sectionInfoList.length && b.push(a)
        });
        return b
      }();
      var p;
      h.each(b.questInfo, function(a, f, e)
      {
        var c = a.sectionInfoList[0];
        f = Number(c.section.viewParameterMap.SCENE0_FILM_NUM);
        var d = k.convertFilmNo(
          {
            getType: "native",
            webFilmNo: f
          }),
          m = {
            id: d.nativeFilmNo,
            version: d.nativeVersionNo,
            sortNo: d.nativeSortNo,
            status: function()
            {
              var b = "NEW";
              h.each(a.questInfoList, function(a, d, f)
              {
                a.cleared && (b = "READY")
              });
              return b
            }(),
            isExtra: function()
            {
              var a = !1;
              0 == d.nativeFilmNo && (a = !0);
              1 == d.nativeFilmNo && 0 == d.nativeVersionNo && (a = !0);
              return a
            }(),
            hasList: c.cleared,
            nextWaitDay: 0,
            isNextWait: !1,
            dayList: []
          },
          l = {
            id: f,
            nativeFilmNo: d.nativeFilmNo,
            nativeVersionNo: d.nativeVersionNo,
            storyEnd: d.storyEnd,
            sectionInfo: c,
            dayList: []
          },
          r = function(a)
          {
            var b = a.filmInfoWeb,
              f = a.section,
              c = a.val;
            a.filmInfo.dayList.push(
            {
              id: c.questBattle.sectionIndex,
              status: function()
              {
                var a = "NEW";
                c.cleared && (a = "READY");
                return a
              }(),
              releaseCost: function()
              {
                var a = c.questBattle.needItemNum;
                c.cleared && (a = 0);
                return a
              }(),
              checkMessage: function()
              {
                var a = "";
                c.questBattle.parameterMap && c.questBattle.parameterMap.MESSAGE && (a = c.questBattle.parameterMap.MESSAGE);
                return a
              }(),
              section: function()
              {
                var a = 0;
                d.nativeDaySectionNo && (a = d.nativeDaySectionNo);
                return a
              }()
            });
            b.dayList[c.questBattle.sectionIndex] = {
              id: c.questBattle.sectionIndex,
              sectionInfo: f,
              questInfo: c,
              isClear: c.cleared,
              needItemNum: c.questBattle.needItemNum
            }
          };
        h.each(a.questInfoList, function(a, b, f)
        {
          r(
          {
            filmInfo: m,
            filmInfoWeb: l,
            section: c,
            val: a
          })
        });
        var g;
        h.each(b.nativeModel.filmList, function(a, b, c)
        {
          a.id == m.id && a.version == m.version && (g = a)
        });
        if (g)
        {
          var q = !1,
            n = !1;
          h.each(m.dayList, function(a, b, c)
          {
            12 != m.id || 1 != a.section || q || (g.dayList.push(
            {
              id: a.id - 1,
              section: a.section,
              status: "BROKEN"
            }), q = !0);
            12 != m.id || 3 != a.section || n || (g.dayList.push(
            {
              id: a.id - 1,
              section: a.section,
              status: "BROKEN"
            }), n = !0);
            g.dayList.push(a)
          });
          12 == m.id && (g.hasList = !1, 17 == l.id && l.sectionInfo.cleared && (g.hasList = !0))
        }
        else b.nativeModel.filmList.push(m);
        b.filmInfoWeb[f] = l;
        l.sectionInfo.cleared && (13 != l.id && 14 != l.id && 16 != l.id && 17 != l.id && 18 != l.id && b.clearFilmList.push(l), p = l)
      });
      b.nativeModel.filmList.sort(function(a, b)
      {
        return a.sortNo - b.sortNo
      });
      a = b.filmInfoWeb.slice(-1)[0];
      var f = a.nativeFilmNo,
        c = h.findWhere(b.nativeModel.filmList,
        {
          id: f
        });
      b.nativeModel.displayFilmId = a.nativeFilmNo;
      b.nativeModel.displayFilmVersion = a.nativeVersionNo;
      var d = localStorage.getItem("scene0LastFilmId");
      d && (d = b.filmInfoWeb[Number(d)]) && (b.nativeModel.displayFilmId = d.nativeFilmNo, b.nativeModel.displayFilmVersion = d.nativeVersionNo);
      a.sectionInfo.cleared && a.sectionInfo.isNewestSection ? (d = c.dayList.slice(-1)[0].id, c.nextWaitDay = d, c.isNextWait = !0, a.storyEnd && (c.nextWaitDay = 0, c.isNextWait = !1)) : (b.nativeModel.displayFilmId = f, b.nativeModel.displayFilmVersion = a.nativeVersionNo);
      localStorage.getItem("scene0AfterFilm1IsFirst") || (b.nativeModel.startChangeFilmId = f, b.nativeModel.displayFilmId = f - 1, localStorage.setItem("scene0AfterFilm1IsFirst", "true"));
      17 > p.id && (12 <= p.id && b.clearFilmList.pop(), 15 <= p.id && b.clearFilmList.pop());
      console.log("_model", b);
      return b
    },
    getBattleSelectModel: function(a)
    {
      var e = a.pageJson,
        b = {
          itemInfo: k.getMainItemInfo(
          {
            pageJson: e
          }),
          userQuestAdventureList: e.userQuestAdventureList,
          questInfo:
          {},
          challengeList: [],
          difficultyLevel: function()
          {
            var a = "level1";
            n.scene0BattleDifficultyLevel && (a = n.scene0BattleDifficultyLevel);
            return a
          }()
        },
        g = [];
      for (a = 1; 3 >= a; a++) g.push(a);
      b.questInfo = function()
      {
        var a = [];
        h.each(g, function(b, c, d)
        {
          b = k.getScene0QuestInfo(
          {
            pageJson: e,
            targetNum: b,
            type: "battle"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      h.each(b.questInfo, function(a, f, c)
      {
        var d = a.sectionInfoList[0];
        f = Number(d.section.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM);
        c = {
          id: f,
          difficultyLevel: f,
          questList: []
        };
        h.each(a.questInfoList, function(a, b, f)
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
      var e = a.pageJson,
        b = {
          itemInfo: k.getMainItemInfo(
          {
            pageJson: e
          }),
          itemInfoSide: k.getSideItemInfo(
          {
            pageJson: e
          }),
          questNeedItemNum: !1,
          playBtnClass: "TE se_decide",
          questInfo:
          {},
          sideStoryList: [],
          noClearList: []
        },
        g = [];
      for (a = 1; 17 >= a; a++) g.push(a);
      b.questInfo = function()
      {
        var a = [];
        h.each(g, function(b, c, d)
        {
          b = k.getScene0QuestInfo(
          {
            pageJson: e,
            targetNum: b,
            type: "side"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      h.each(b.questInfo, function(a, e, c)
      {
        var d = a.sectionInfoList[0],
          f = Number(d.section.viewParameterMap.SCENE0_SIDESTORY_NUM);
        c = {
          id: f,
          questList: []
        };
        h.each(a.questInfoList, function(a, e, g)
        {
          e = Number(e + 1);
          g = Number(a.questBattle.needItemNum);
          c.questList.push(
          {
            id: e,
            sectionInfo: d,
            questInfo: a,
            isClear: a.cleared,
            needItemNum: g,
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
            btnId: e
          });
          b.questNeedItemNum = g
        });
        b.sideStoryList.push(c)
      });
      if (b.questNeedItemNum > b.itemInfoSide.quantity || 0 == b.noClearList.length) b.playBtnClass = "off";
      return b
    }
  }
});
