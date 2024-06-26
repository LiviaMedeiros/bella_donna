define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/NativeAfterFilm1.html js/quest/scene0/Utility".split(" "), function(p, q, b, t, f, r, m)
{
  var h, k, l = function(a, n)
  {
    for (var g = [], c = "END" !== n ? "touches" : "changedTouches", d = 0; d < a.originalEvent[c].length; d++)
    {
      var e = a.originalEvent[c][d].identifier;
      0 > e && (e = -e);
      g[d] = {
        identifier: e,
        clientX: 1024 === b.displayWidth ? a.originalEvent[c][d].clientX : 1024 * a.originalEvent[c][d].clientX / 1280,
        clientY: 1024 === b.displayWidth ? a.originalEvent[c][d].clientY : 1024 * a.originalEvent[c][d].clientY / 1280
      }
    }
    switch (n)
    {
      case "START":
        f.callTouchesBegin(g);
        break;
      case "MOVE":
        f.callTouchesMove(g);
        break;
      case "END":
        f.callTouchesEnd(g)
    }
  };
  return q.View.extend(
  {
    events: function()
    {
      var a = {};
      a["touchstart #nativeTouchWrap"] = this.touchStart;
      a["touchmove #nativeTouchWrap"] = this.touchMove;
      a["touchend #nativeTouchWrap"] = this.touchEnd;
      a[b.cgti + " #changeStoryAllListBtn"] = this.tapChangeStoryAllListBtn;
      a[b.cgti + " #returnStoryListBtn"] = this.tapReturnStoryListBtn;
      return a
    },
    initialize: function(a)
    {
      h = a.pageModel;
      this.template = p.template(r);
      this.setNativeObj(
      {
        model: h
      });
      b.removeBackHandler();
      k = !0
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: h
      }));
      return this
    },
    setNativeObj: function(a)
    {
      var b = this;
      a = a.model;
      $("#commandDiv").off();
      $("#commandDiv").on("nativeCallback", function(a, c)
      {
        c && ((c.filmId || 0 == c.filmId) && b.tapStory(
        {
          filmId: c.filmId,
          filmVersion: c.filmVersion,
          sectionId: c.sectionId,
          dayId: c.dayId
        }), c.status && "popList" == c.status && b.tapReturnStoryListBtn())
      });
      f.setScene0StorySelectObject(a.nativeModel)
    },
    tapStory: function(a)
    {
      var b = a.filmId,
        g = a.filmVersion,
        c = a.sectionId;
      a = a.dayId;
      var d = this;
      f.startSe(1002);
      var b = m.convertFilmNo(
        {
          getType: "web",
          nativeFilmNo: b,
          nativeVersionNo: g,
          nativeDaySectionNo: c
        }),
        b = h.filmInfoWeb[b.webFilmNo],
        e = b.dayList[a];
      e.lastFilmId = b.id;
      e.isClear ? d.startQuest(
      {
        model: e
      }) : m.openStoryPopup(
      {
        needItemNum: e.needItemNum,
        itemInfo: h.itemInfo,
        callback: function()
        {
          d.startQuest(
          {
            model: e
          })
        }
      })
    },
    startQuest: function(a)
    {
      a = a.model;
      b.questStoryOnlyModel = {
        sectionModel: a.sectionInfo,
        questBattleModel: a.questInfo.questBattle
      };
      localStorage.setItem("scene0LastFilmId", a.lastFilmId);
      location.href = "#/QuestStoryOnly"
    },
    tapChangeStoryAllListBtn: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || (f.setScene0StoryListObject(), $("#globalMenuContainer").addClass("hide"), $("#returnStoryListBtn").addClass("disp"), $("#changeStoryAllListBtn").removeClass("disp"))
    },
    tapReturnStoryListBtn: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || (f.deleteScene0StoryListObject(), $("#globalMenuContainer").removeClass("hide"), $("#returnStoryListBtn").removeClass("disp"), $("#changeStoryAllListBtn").addClass("disp"))
    },
    touchStart: function(a)
    {
      a.preventDefault();
      k && (b.tapEffectStop = !0, l(a, "START"))
    },
    touchMove: function(a)
    {
      a.preventDefault();
      k && l(a, "MOVE")
    },
    touchEnd: function(a)
    {
      a.preventDefault();
      k && !b.isDoubleTouch() && (b.tapEffectStop = !1, l(a, "END"))
    },
    removeView: function()
    {
      $("#commandDiv").off();
      f.deleteScene0StorySelectObject();
      b.removeBackHandler();
      k = null;
      this.off();
      this.remove()
    }
  })
});
