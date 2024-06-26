define(["underscore", "backbone", "backboneCommon", "text!resource/image_web/_json/puellaHistoria/overview.json"], function(d, u, r, m)
{
  var q = {
    getModel: function(a)
    {
      var c = a.pageJson,
        b = {
          soulInfo:
          {
            openNum: 0
          },
          mirrorInfoList: [],
          currentTime: c.currentTime
        },
        f = this;
      d.each([1, 2, 3, 4, 5, 6], function(a, e, d)
      {
        e = f.getPuellaHistoriaQuestInfo(
        {
          eventNum: a,
          pageJson: c
        });
        d = f.getOpenEvent(
        {
          eventNum: a,
          pageJson: c
        });
        var t = f.getToURL(
          {
            questInfo: e,
            eventInfo: d
          }),
          n = e.isClear,
          g = e.sectionId,
          p = !1,
          h = e.overview;
        d.isOpenEvent && (n = d.isClear, g = d.sectionId, p = d.endAt, h = JSON.parse(m).overviewList[String(a)], h = {
          title: h.title,
          text: h.mainText.replace(/＠/g, "<br>"),
          img: h.img
        });
        b.mirrorInfoList.push(
        {
          id: a,
          isOpenEvent: d.isOpenEvent,
          endAt: p,
          toUrl: t,
          isClear: n,
          isArchivesQuest: e.isArchives,
          sectionId: g,
          overview: h
        })
      });
      d.each(b.mirrorInfoList, function(a, c, f)
      {
        a.isClear && (b.soulInfo.openNum++, 1 != a.id && 3 != a.id || b.soulInfo.openNum++)
      });
      var e = !1;
      d.each(c.eventList, function(a, b, c)
      {
        "PUELLA_RAID" == a.eventType && (e = !0)
      });
      b.isOpenLastBattleEvent = e;
      return b
    },
    getOpenEvent: function(a)
    {
      var c = a.eventNum;
      a = a.pageJson;
      var b = {
        isOpenEvent: !1,
        eventType: "",
        sectionId: 0,
        isClear: !1
      };
      d.each(a.eventList, function(a, d, g)
      {
        a.parameterMap && a.parameterMap.PUELLAHISTORIA_NUM && Number(a.parameterMap.PUELLAHISTORIA_NUM) == c && (b.isOpenEvent = !0, b.eventType = a.eventType, b.sectionId = Number(a.parameterMap.NORMALSECTIONID), b.endAt = a.endAt)
      });
      d.each(a.userSectionList, function(a, c, d)
      {
        0 != b.sectionId && a.sectionId == b.sectionId && (b.isClear = !!a.cleared)
      });
      return b
    },
    getPuellaHistoriaQuestInfo: function(a)
    {
      var c = a.eventNum,
        b = a.pageJson,
        d = JSON.parse(m).overviewList;
      a = {
        isArchives: !1,
        isClear: !1,
        sectionId: 0,
        overview:
        {
          title: "none",
          text: "",
          cardId: ""
        }
      };
      b = this.getPuellaHistoriaInfo(
      {
        puellaHistoriaNum: c,
        pageJson: b
      }).sectionInfoList;
      0 < b.length && (b = b[b.length - 1], a.sectionId = b.sectionId, a.isArchives = !0, a.isClear = !1, b.isLastSection && (a.isClear = !!b.cleared), c = d[String(c)]) && (a.overview.title = c.title, a.overview.text = c.mainText.replace(/＠/g, "<br>"), a.overview.img = c.img);
      return a
    },
    getToURL: function(a)
    {
      var c = a.eventInfo;
      a = a.questInfo;
      var b = "none";
      c.isOpenEvent ? "DAILYTOWER" == c.eventType && (b = "#/EventDailyTowerTop") : a.isArchives && (b = "#/QuestBattleSelect/" + a.sectionId);
      return b
    },
    getPuellaHistoriaInfo: function(a)
    {
      var c = a.puellaHistoriaNum,
        b = a.pageJson,
        f = {
          sectionInfoList: [],
          questInfoList: []
        };
      d.each(b.userSectionList, function(a, b, d)
      {
        b = a.section;
        b.viewParameterMap && b.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM && Number(b.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM) == c && (a.isLastSection = !1, b.viewParameterMap.PUELLAHISTORIA_NORMAL_LAST_SECTION && 1 == Number(b.viewParameterMap.PUELLAHISTORIA_NORMAL_LAST_SECTION) && (a.isLastSection = !0), f.sectionInfoList.push(a))
      });
      f.sectionInfoList.sort(function(a, b)
      {
        return a.sectionId - b.sectionId
      });
      var e = !0,
        g = [],
        k = [];
      d.each(f.sectionInfoList, function(a, e, f)
      {
        g[e] = [];
        d.each(b.userQuestBattleList, function(b, d, f)
        {
          a.sectionId == b.questBattle.sectionId && (b.puellaHistoriaNum = c, a.section && a.section.secret && (b.secret = a.section.secret), !b.questBattle.ap && a.section.ap && (b.questBattle.ap = a.section.ap), !b.questBattle.difficulty && a.section.difficulty && (b.questBattle.difficulty = a.section.difficulty), g[e].push(b))
        })
      });
      d.each(g, function(a, b, c)
      {
        a.sort(function(a, b)
        {
          return a.questBattleId - b.questBattleId
        })
      });
      d.each(g, function(a, b, c)
      {
        d.each(a, function(a, b, c)
        {
          k.push(a)
        })
      });
      d.each(k, function(a, b, d)
      {
        if (a.cleared || e) f.questInfoList.push(a), a.cleared || (e = !1), 992 == c && (e = !0)
      });
      var l = 1;
      99 == c && (l = 0);
      d.each(f.questInfoList, function(a, b, c)
      {
        a.questBattle.sectionIndex = l;
        l++
      });
      return f
    },
    getIsPuellaHistoriaInfo: function(a)
    {
      var c = a.sectionInfo;
      a = a.sectionList;
      var b = {
        num: 0,
        isPuellaHistoria: !1,
        isLastSection: !1,
        sectionInfoList: []
      };
      c && c.section && (c = c.section, c.viewParameterMap && c.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM && (b.num = Number(c.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM), b.isPuellaHistoria = !0), c.viewParameterMap && c.viewParameterMap.PUELLAHISTORIA_NORMAL_LAST_SECTION && 1 == Number(c.viewParameterMap.PUELLAHISTORIA_NORMAL_LAST_SECTION) && (b.isLastSection = !0));
      a && (d.each(a, function(a, c, d)
      {
        c = a.section;
        c.viewParameterMap && c.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM && Number(c.viewParameterMap.PUELLAHISTORIA_NORMAL_NUM) == b.num && b.sectionInfoList.push(a)
      }), b.sectionInfoList.sort(function(a, b)
      {
        return a.sectionId - b.sectionId
      }));
      return b
    },
    isCommonStoryLastAlreadyWatch: function(a)
    {
      var c = a.commonStoryInfo,
        b = !1,
        f = r.storage.userQuestAdventureList.toJSON();
      d.each(c.sectionInfoList, function(a, g, k)
      {
        q.getIsPuellaHistoriaInfo(
        {
          sectionInfo: a
        }).isLastSection && d.each(c.questInfoList, function(c, e, g)
        {
          if (c.questBattle.sectionId == a.sectionId)
          {
            var k = c.questBattle.startStory;
            d.each(f, function(a, c, d)
            {
              k == a.adventureId && (b = !0)
            })
          }
        })
      });
      return b
    }
  };
  return q
});
