define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/NativeAfterFilm1.html js/quest/scene0/Utility".split(" "), function(n, p, b, r, f, q, l)
{
  var e, h, k = function(a, m)
  {
    for (var g = [], c = "END" !== m ? "touches" : "changedTouches", d = 0; d < a.originalEvent[c].length; d++)
    {
      var e = a.originalEvent[c][d].identifier;
      0 > e && (e = -e);
      g[d] = {
        identifier: e,
        clientX: 1024 === b.displayWidth ? a.originalEvent[c][d].clientX : 1024 * a.originalEvent[c][d].clientX / 1280,
        clientY: 1024 === b.displayWidth ? a.originalEvent[c][d].clientY : 1024 * a.originalEvent[c][d].clientY / 1280
      }
    }
    switch (m)
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
  return p.View.extend(
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
      e = a.pageModel;
      this.template = n.template(q);
      this.setNativeObj(
      {
        model: e
      });
      b.removeBackHandler();
      h = !0
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: e
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
        c && (c.filmId && b.tapStory(
        {
          filmId: c.filmId,
          filmVersion: c.filmVersion,
          dayId: c.dayId
        }), c.status && "popList" == c.status && b.tapReturnStoryListBtn())
      });
      f.setScene0StorySelectObject(a.nativeModel)
    },
    tapStory: function(a)
    {
      var b = a.filmId,
        g = a.filmVersion;
      a = a.dayId;
      var c = this;
      f.startSe(1002);
      var g = l.convertFilmNo(
        {
          getType: "web",
          nativeFilmNo: b,
          nativeVersionNo: g
        }),
        d = e.filmInfoWeb[g.webFilmNo].dayList[a];
      d.lastFilmId = b;
      d.isClear ? c.startQuest(
      {
        model: d
      }) : l.openStoryPopup(
      {
        needItemNum: d.needItemNum,
        itemInfo: e.itemInfo,
        callback: function()
        {
          c.startQuest(
          {
            model: d
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
      a.lastFilmId && localStorage.setItem("scene0LastFilmId", a.lastFilmId);
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
      h && (b.tapEffectStop = !0, k(a, "START"))
    },
    touchMove: function(a)
    {
      a.preventDefault();
      h && k(a, "MOVE")
    },
    touchEnd: function(a)
    {
      a.preventDefault();
      h && !b.isDoubleTouch() && (b.tapEffectStop = !1, k(a, "END"))
    },
    removeView: function()
    {
      $("#commandDiv").off();
      f.deleteScene0StorySelectObject();
      b.removeBackHandler();
      h = null;
      this.off();
      this.remove()
    }
  })
});
