define("underscore backbone backboneCommon ajaxControl command js/quest/scene0/Utility".split(" "), function(e, n, l, p, q, d)
{
  return {
    getTopModel: function(a)
    {
      a = a.pageJson;
      var c = {
        itemInfo: d.getMainItemInfo(
        {
          pageJson: a
        }),
        isFilm1Clear: !1,
        templateClass: "BeforeFilm1",
        StorySelectUrl: "#/Scene0StorySelectBeforeFilm1"
      };
      d.getIsScene0Film1Clear(
      {
        userSectionList: a.userSectionList
      }) && (c.isFilm1Clear = !0, c.templateClass = "AfterFilm1", c.StorySelectUrl = "#/Scene0StorySelectAfterFilm1");
      return c
    },
    getBeforeFilm1Model: function(a)
    {
      a = a.pageJson;
      var c = {
        itemInfo: d.getMainItemInfo(
        {
          pageJson: a
        }),
        questInfo:
        {}
      };
      c.questInfo = d.getScene0QuestInfo(
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
          itemInfo: d.getMainItemInfo(
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
        g = [];
      for (a = 1; 17 >= a; a++) g.push(a);
      b.questInfo = function()
      {
        var a = [];
        e.each(g, function(b, h, f)
        {
          b = d.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      a = !1;
      e.each(b.questInfo, function(a, c, f)
      {
        var h = a.sectionInfoList[0];
        c = Number(h.section.viewParameterMap.SCENE0_FILM_NUM);
        f = d.convertFilmNo(
        {
          getType: "native",
          webFilmNo: c
        });
        var m = {
            id: f.nativeFilmNo,
            version: f.nativeVersionNo,
            status: function()
            {
              var b = "NEW";
              e.each(a.questInfoList, function(a, c, h)
              {
                a.cleared && (b = "READY")
              });
              return b
            }(),
            isExtra: !1,
            hasList: h.cleared,
            dayList: []
          },
          k = {
            id: c,
            sectionInfo: h,
            dayList: []
          };
        e.each(a.questInfoList, function(a, b, c)
        {
          m.dayList.push(
          {
            id: a.questBattle.sectionIndex,
            status: function()
            {
              var b = "NEW";
              a.cleared && (b = "READY");
              return b
            }(),
            releaseCost: function()
            {
              var b = a.questBattle.needItemNum;
              a.cleared && (b = 0);
              return b
            }(),
            checkMessage: function()
            {
              var b = "";
              a.questBattle.parameterMap && a.questBattle.parameterMap.MESSAGE && (b = a.questBattle.parameterMap.MESSAGE);
              return b
            }()
          });
          k.dayList[a.questBattle.sectionIndex] = {
            id: a.questBattle.sectionIndex,
            sectionInfo: h,
            questInfo: a,
            isClear: a.cleared,
            needItemNum: a.questBattle.needItemNum
          }
        });
        b.nativeModel.filmList.push(m);
        b.filmInfoWeb[c] = k;
        k.sectionInfo.cleared && b.clearFilmList.push(k)
      });
      b.nativeModel.filmList.sort(function(a, b)
      {
        return a.id - b.id
      });
      a = b.nativeModel.filmList.slice(-1)[0].id;
      b.nativeModel.displayFilmId = a;
      var f = localStorage.getItem("scene0LastFilmId");
      f && (b.nativeModel.displayFilmId = Number(f));
      localStorage.getItem("scene0AfterFilm1IsFirst") || (b.nativeModel.startChangeFilmId = a, b.nativeModel.displayFilmId = a - 1, localStorage.setItem("scene0AfterFilm1IsFirst", "true"));
      return b
    },
    getBattleSelectModel: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: d.getMainItemInfo(
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
            l.scene0BattleDifficultyLevel && (a = l.scene0BattleDifficultyLevel);
            return a
          }()
        },
        g = [];
      for (a = 1; 3 >= a; a++) g.push(a);
      b.questInfo = function()
      {
        var a = [];
        e.each(g, function(b, f, e)
        {
          b = d.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b,
            type: "battle"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      e.each(b.questInfo, function(a, c, d)
      {
        var f = a.sectionInfoList[0];
        c = Number(f.section.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM);
        d = {
          id: c,
          difficultyLevel: c,
          questList: []
        };
        e.each(a.questInfoList, function(a, b, c)
        {
          d.questList.push(
          {
            id: Number(b + 1),
            difficultyLevel: d.difficultyLevel,
            sectionInfo: f,
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
        b.challengeList.push(d)
      });
      return b
    },
    getSideStorySelectModel: function(a)
    {
      var c = a.pageJson,
        b = {
          itemInfo: d.getMainItemInfo(
          {
            pageJson: c
          }),
          itemInfoSide: d.getSideItemInfo(
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
        g = [];
      for (a = 1; 17 >= a; a++) g.push(a);
      b.questInfo = function()
      {
        var a = [];
        e.each(g, function(b, f, e)
        {
          b = d.getScene0QuestInfo(
          {
            pageJson: c,
            targetNum: b,
            type: "side"
          });
          0 < b.sectionInfoList.length && a.push(b)
        });
        return a
      }();
      e.each(b.questInfo, function(a, c, d)
      {
        var f = a.sectionInfoList[0],
          g = Number(f.section.viewParameterMap.SCENE0_SIDESTORY_NUM);
        d = {
          id: g,
          questList: []
        };
        e.each(a.questInfoList, function(a, c, e)
        {
          c = Number(c + 1);
          e = Number(a.questBattle.needItemNum);
          d.questList.push(
          {
            id: c,
            sectionInfo: f,
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
            listId: g,
            btnId: c
          });
          b.questNeedItemNum = e
        });
        b.sideStoryList.push(d)
      });
      if (b.questNeedItemNum > b.itemInfoSide.quantity || 0 == b.noClearList.length) b.playBtnClass = "off";
      return b
    }
  }
});
