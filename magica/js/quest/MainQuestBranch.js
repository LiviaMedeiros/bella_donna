define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/MainQuestBranch.html text!css/quest/MainQuestBranch.css text!css/quest/QuestCommon.css js/view/quest/ClearAnimationsView".split(" "), function(l, x, b, v, h, p, y, z, A, w)
{
  var r, q, e, k, m, t, B = x.View.extend(
    {
      events: function()
      {
        var a = {};
        a["touchstart #mapWrap"] = this.touchStart;
        a["touchmove #mapWrap"] = this.touchMove;
        a["touchend #mapWrap"] = this.touchEnd;
        return a
      },
      initialize: function(a)
      {
        this.template = l.template(y);
        this.createDom()
      },
      render: function()
      {
        var a = r;
        a.chapterId = b.mainChapterId;
        this.$el.html(this.template(a));
        "HARD" === b.mainQuestMode && b.addClass(this.el.querySelector("#bg"), "challengeMode");
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        b.ready.hide()
      },
      touchStart: function(a)
      {
        a.preventDefault();
        e && (b.tapEffectStop = !0, u(a, "START"))
      },
      touchMove: function(a)
      {
        a.preventDefault();
        e && u(a, "MOVE")
      },
      touchEnd: function(a)
      {
        a.preventDefault();
        e && (b.tapEffectStop = !1, u(a, "END"))
      }
    }),
    D = function()
    {
      console.log(k);
      b.setStyle(z + A);
      r = v.getPageJson();
      m = C();
      p.supportPickUp(r);
      q = new B;
      if (m.newPointIdList.length) $("#commandDiv").on("nativeCallback", function(a, c)
      {
        $("#commandDiv").off();
        e || (e = !0, b.clearSectionModel ? (a = b.clearSectionModel.section, c = p.clearRewardChestColor(a.clearReward), w.section(a.clearRewardCode, a, c, function()
        {
          n()
        }), b.clearSectionModel = null) : n());
        $("#commandDiv").on("nativeCallback", function(a, c)
        {
          !c || c && !c.pointId || (h.startSe(1002), $("#commandDiv").off(), location.href = "#/QuestBattleSelect/" + c.pointId)
        })
      });
      else
      {
        if (b.clearSectionModel)
        {
          var a = b.clearSectionModel.section,
            g = p.clearRewardChestColor(a.clearReward);
          w.section(a.clearRewardCode, a, g, function()
          {
            e = !0;
            n()
          });
          b.clearSectionModel = null
        }
        else e = !0, n();
        $("#commandDiv").on("nativeCallback", function(a, c)
        {
          !c || c && !c.pointId || (h.startSe(1002), $("#commandDiv").off(), location.href = "#/QuestBattleSelect/" + c.pointId)
        })
      }
      h.pushMainQuestEventBranch(m);
      window.isBrowser && n()
    },
    n = function()
    {
      var a = k.chapter.viewParameterMap.NORMALSECTIONID || 1,
        g = m.questList[0].pointId,
        f = m.questList[0].status,
        c = l.filter(m.questList, function(a)
        {
          console.log(a);
          return "NEW" === a.status
        });
      console.log(g, a, f);
      console.log(g, a, f);
      String(g) !== String(a) && "NEW" !== f && 0 === c.length ? b.addClass(b.doc.querySelector(".allClear"), "show") : b.removeClass(b.doc.querySelector(".allClear"), "show")
    },
    C = function()
    {
      var a = {},
        g = k;
      a.mainStoryId = g.chapter.chapterId;
      a.newPointIdList = [];
      a.centerPointId = b.openSectionList || !t ? 0 : Number(t);
      a.questList = [];
      if (b.openSectionList)
      {
        var f = b.openSectionList;
        b.openSectionList = null;
        l.each(f, function(c, b)
        {
          a.newPointIdList.push(c.sectionId)
        });
        a.newPointIdList.sort(function(a, b)
        {
          return a < b ? -1 : a > b ? 1 : 0
        })
      }
      l.each(g.sectionList, function(c, b)
      {
        var d = {};
        d.pointId = c.sectionId;
        d.questBattleId = c.sectionId;
        d.x = Number(c.section.pointX);
        d.y = Number(c.section.pointY);
        d.charId = Number(c.section.parameter);
        d.connectList = c.section.connectPointIds ? c.section.connectPointIds.split(",") : [];
        d.titleId = Number(c.section.iconId);
        d.connectList.length && l.each(d.connectList, function(a, b, c)
        {
          c[b] = Number(a)
        });
        d.status = c.cleared ? "CLEAR" : "NEW";
        var g = !1,
          f = !1;
        l.each(c.section.questBattleList, function(a, b)
        {
          "new" == a.questState && (g = !0);
          "clear" == a.questState && (f = !0)
        });
        g || f ? g && !f ? d.status = "NEW" : f && (d.status = "CLEAR") : d.status = "COMPLETE";
        a.questList.push(d);
        0 != b || a.centerPointId || (a.centerPointId = c.sectionId)
      });
      console.log("mapJson", a);
      return a
    },
    u = function(a, g)
    {
      for (var f = [], c = "END" !== g ? "touches" : "changedTouches", e = 0; e < a.originalEvent[c].length; e++)
      {
        var d = a.originalEvent[c][e].identifier;
        0 > d && (d = -d);
        f[e] = {
          identifier: d,
          clientX: 1024 === b.displayWidth ? a.originalEvent[c][e].clientX : 1024 * a.originalEvent[c][e].clientX / 1280,
          clientY: 1024 === b.displayWidth ? a.originalEvent[c][e].clientY : 1024 * a.originalEvent[c][e].clientY / 1280
        }
      }
      switch (g)
      {
        case "START":
          h.callTouchesBegin(f);
          break;
        case "MOVE":
          h.callTouchesMove(f);
          break;
        case "END":
          h.callTouchesEnd(f)
      }
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      e = !1;
      k = null;
      v.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      t = b.mainPointId ? b.mainPointId : null;
      b.mainChapterId ? (k = p.createChapterModel(b.mainChapterId), D()) : location.href = "#/MainQuest"
    },
    startCommand: function()
    {
      h.changeBg("web_black.jpg");
      h.startBgm("bgm04_movie12")
    },
    remove: function(a)
    {
      q && (q.trigger("remove"), q.remove());
      k && (h.popEventBranch(), k = null);
      $("#commandDiv").off();
      a()
    }
  }
});
