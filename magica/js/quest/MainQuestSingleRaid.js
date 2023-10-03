define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/MainQuestSingleRaid.html text!css/quest/MainQuestSingleRaid.css text!css/quest/QuestCommon.css js/view/quest/ClearAnimationsView".split(" "), function(p, z, b, w, h, q, A, B, C, x)
{
  var t, m, k, l, n, u, D = z.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #scaleChangePlus"] = this.scaleUp;
        a[b.cgti + " #scaleChangeMinus"] = this.scaleDown;
        a[b.cgti + " #resetPosition"] = this.resetPosition;
        a["touchstart #mapWrap"] = this.touchStart;
        a["touchmove #mapWrap"] = this.touchMove;
        a["touchend #mapWrap"] = this.touchEnd;
        return a
      },
      initialize: function(a)
      {
        b.mainSingleRaidScale || (b.mainSingleRaidScale = 100);
        this.template = p.template(A);
        this.createDom()
      },
      render: function()
      {
        var a = t;
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
        k && (b.tapEffectStop = !0, b.isDoubleTouch() ? (this.doubleTapFlg = !0, this.pinchStart(a)) : v(a, "START"))
      },
      touchMove: function(a)
      {
        a.preventDefault();
        k && (this.doubleTapFlg ? this.pinchMove(a) : v(a, "MOVE"))
      },
      touchEnd: function(a)
      {
        a.preventDefault();
        k && (b.tapEffectStop = !1, this.doubleTapFlg ? (this.pinchEnd(a), this.doubleTapFlg = !1) : v(a, "END"))
      },
      pinchStart: function(a)
      {
        a.preventDefault();
        a = y(a, "START");
        2 > a.length ? this.doubleTapFlg = !1 : this.startDistance = Math.sqrt(Math.pow(a[1].clientX - a[0].clientX, 2) + Math.pow(a[1].clientY - a[0].clientY, 2))
      },
      pinchMove: function(a)
      {
        a.cancelable && a.preventDefault();
        a = y(a, "MOVE");
        2 > a.length ? this.doubleTapFlg = !1 : (a = Math.sqrt(Math.pow(a[1].clientX - a[0].clientX, 2) + Math.pow(a[1].clientY - a[0].clientY, 2)), a = parseInt(b.mainSingleRaidScale + (a < this.startDistance ? -this.startDistance / a : a / this.startDistance)), b.mainSingleRaidScale = a, this.updateScale())
      },
      pinchEnd: function(a)
      {
        a.preventDefault();
        this.startDistance = null
      },
      scaleUp: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.isDoubleTouch() || a.currentTarget.classList.contains("off") || (b.mainSingleRaidScale = b.mainSingleRaidScale + 5 | 0, this.updateScale())
      },
      scaleDown: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.isDoubleTouch() || a.currentTarget.classList.contains("off") || (b.mainSingleRaidScale = b.mainSingleRaidScale - 5 | 0, this.updateScale())
      },
      resetPosition: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.isDoubleTouch() || (b.mainSingleRaidScale = 100, this.updateScale())
      },
      updateScale: function()
      {
        100 <= b.mainSingleRaidScale ? (b.mainSingleRaidScale = 100, b.addClassId("scaleChangePlus", "off"), b.removeClassId("scaleChangeMinus", "off")) : 50 >= b.mainSingleRaidScale ? (b.mainSingleRaidScale = 50, b.removeClassId("scaleChangePlus", "off"), b.addClassId("scaleChangeMinus", "off")) : (b.removeClassId("scaleChangePlus", "off"), b.removeClassId("scaleChangeMinus", "off"));
        h.scaleEventSingleRaid(b.mainSingleRaidScale)
      }
    }),
    F = function()
    {
      console.log(l);
      b.setStyle(B + C);
      t = w.getPageJson();
      n = E();
      q.supportPickUp(t);
      m = new D;
      if (n.newPointIdList.length) $("#commandDiv").on("nativeCallback", function(a, c)
      {
        $("#commandDiv").off();
        $("#commandDiv").on("nativeCallback", function(a, d)
        {
          if (!k)
            if (k = !0, m.updateScale(), b.clearSectionModel)
            {
              a = b.clearSectionModel.section;
              var c = q.clearRewardChestColor(a.clearReward);
              x.section(a.clearRewardCode, a, c, function()
              {
                r()
              });
              b.clearSectionModel = null
            }
          else r();
          !d || d && !d.pointId || (h.startSe(1002), $("#commandDiv").off(), location.href = "#/QuestBattleSelect/" + d.pointId)
        })
      });
      else $("#commandDiv").on("nativeCallback", function(a, c)
      {
        if (!k)
          if (k = !0, m.updateScale(), b.clearSectionModel)
          {
            a = b.clearSectionModel.section;
            var e = q.clearRewardChestColor(a.clearReward);
            x.section(a.clearRewardCode, a, e, function()
            {
              r()
            });
            b.clearSectionModel = null
          }
        else r();
        !c || c && !c.pointId || (h.startSe(1002), $("#commandDiv").off(), location.href = "#/QuestBattleSelect/" + c.pointId)
      });
      h.pushEventSingleRaid(n);
      window.isBrowser && nativeCallback()
    },
    r = function()
    {
      var a = l.chapter.viewParameterMap.NORMALSECTIONID || 1,
        c = n.pointList[0].pointId,
        e = n.pointList[0].status;
      console.log(c, a, e);
      String(c) !== String(a) && "CLEAR" == e ? b.addClass(b.doc.querySelector(".allClear"), "show") : b.removeClass(b.doc.querySelector(".allClear"), "show")
    },
    E = function()
    {
      var a = {},
        c = l;
      a.mainStoryId = c.chapter.chapterId;
      a.mapWidth = Number(c.chapter.viewParameterMap.MAP_WIDTH);
      a.mapHeight = Number(c.chapter.viewParameterMap.MAP_HEIGHT);
      a.newPointIdList = [];
      a.centerPointId = b.openSectionList || !u ? 0 : Number(u);
      a.pointList = [];
      if (b.openSectionList)
      {
        var e = b.openSectionList;
        b.openSectionList = null;
        p.each(e, function(b, c)
        {
          a.newPointIdList.push(b.sectionId)
        });
        a.newPointIdList.sort(function(a, b)
        {
          return a < b ? -1 : a > b ? 1 : 0
        })
      }
      p.each(c.sectionList, function(d, c)
      {
        var g = {};
        g.pointId = d.sectionId;
        g.status = d.cleared ? "CLEAR" : "NEW";
        g.x = Number(d.section.pointX);
        g.y = Number(d.section.pointY);
        g.miniCharIdList = [];
        g.storyId = d.section.genericIndex;
        g.questClearList = ["COMPLETE"];
        var e = !1,
          f = !1;
        p.each(d.section.questBattleList, function(a, b)
        {
          console.log(a.questState);
          "new" == a.questState && (e = !0);
          "clear" == a.questState && (f = !0)
        });
        e ? (g.questClearList = ["NO_CLEAR"], "HARD" !== b.mainQuestMode || f || (g.status = "NEW")) : f && (g.questClearList = ["CLEAR"]);
        a.pointList.push(g);
        0 == c && (d.section.miniCharaNos && (c = d.section.miniCharaNos.split(",").map(function(a)
        {
          return Number(a)
        }), g.miniCharIdList = c), a.centerPointId || (a.centerPointId = d.sectionId))
      });
      console.log("mapJson", a);
      return a
    },
    y = function(a, c)
    {
      var e = [];
      c = "END" !== c ? "touches" : "changedTouches";
      for (var d = 0; d < a.originalEvent[c].length; d++)
      {
        var f = a.originalEvent[c][d].identifier;
        0 > f && (f = -f);
        e[d] = {
          identifier: f,
          clientX: 1024 === b.displayWidth ? a.originalEvent[c][d].clientX : 1024 * a.originalEvent[c][d].clientX / 1280,
          clientY: 1024 === b.displayWidth ? a.originalEvent[c][d].clientY : 1024 * a.originalEvent[c][d].clientY / 1280
        }
      }
      return e
    },
    v = function(a, c)
    {
      for (var e = [], d = "END" !== c ? "touches" : "changedTouches", f = 0; f < a.originalEvent[d].length; f++)
      {
        var g = a.originalEvent[d][f].identifier;
        0 > g && (g = -g);
        e[f] = {
          identifier: g,
          clientX: 1024 === b.displayWidth ? a.originalEvent[d][f].clientX : 1024 * a.originalEvent[d][f].clientX / 1280,
          clientY: 1024 === b.displayWidth ? a.originalEvent[d][f].clientY : 1024 * a.originalEvent[d][f].clientY / 1280
        }
      }
      switch (c)
      {
        case "START":
          h.callTouchesBegin(e);
          break;
        case "MOVE":
          h.callTouchesMove(e);
          break;
        case "END":
          h.callTouchesEnd(e)
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
      k = !1;
      l = null;
      w.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      u = b.mainPointId ? b.mainPointId : null;
      b.mainChapterId ? (l = q.createChapterModel(b.mainChapterId), F()) : location.href = "#/MainQuest"
    },
    startCommand: function()
    {
      h.changeBg("web_black.jpg");
      h.startBgm("bgm04_movie12")
    },
    remove: function(a)
    {
      m && (m.trigger("remove"), m.remove());
      l && (h.popEventSingleRaid(), l = null);
      $("#commandDiv").off();
      a()
    }
  }
});
