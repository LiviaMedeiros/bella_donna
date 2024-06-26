define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/parts/TopNativeMain.html js/event/EventWitch/parts/TopBattleInfo".split(" "), function(l, q, e, r, c, u, v)
{
  var b, n, h, k = !1;
  r = q.View.extend(
  {
    events: function()
    {
      var a = {};
      a["touchstart #nativeTouchWrap"] = this.touchStart;
      a["touchmove #nativeTouchWrap"] = this.touchMove;
      a["touchend #nativeTouchWrap"] = this.touchEnd;
      return a
    },
    initialize: function(a)
    {
      b = a.model;
      n = a._views;
      k = !1;
      this.template = l.template(u);
      this.setNativeObj(
      {
        model: b
      });
      h = !0
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: b
      }));
      return this
    },
    setNativeObj: function(a)
    {
      var m = this;
      a = a.model;
      $("#commandDiv").off();
      $("#commandDiv").on("nativeCallback", function(a, d)
      {
        d && (c.startSe(1002), m.tapPoint(
        {
          pointId: d.pointId
        }));
        c.enableTapEventSingleRaid(
        {
          enable: !0
        })
      });
      w(
      {
        model: b
      });
      c.pushEventSingleRaid(a.nativeModel)
    },
    tapPoint: function(a)
    {
      t(
      {
        pointId: Number(a.pointId)
      })
    },
    checkBattleInfo: function()
    {
      k = !1;
      $("#battleInfoSec").removeClass("show");
      $("#battleInfoSec").addClass("hide");
      c.startSe(1003)
    },
    touchStart: function(a)
    {
      a.preventDefault();
      h && (e.tapEffectStop = !0, p(a, "START"))
    },
    touchMove: function(a)
    {
      a.preventDefault();
      h && p(a, "MOVE")
    },
    touchEnd: function(a)
    {
      a.preventDefault();
      h && !e.isDoubleTouch() && (e.tapEffectStop = !1, k ? this.checkBattleInfo() : p(a, "END"))
    },
    removeView: function()
    {
      $("#commandDiv").off();
      c.popEventSingleRaid();
      h = null;
      this.off();
      this.remove()
    }
  });
  var p = function(a, m)
    {
      for (var g = [], d = "END" !== m ? "touches" : "changedTouches", f = 0; f < a.originalEvent[d].length; f++)
      {
        var b = a.originalEvent[d][f].identifier;
        0 > b && (b = -b);
        g[f] = {
          identifier: b,
          clientX: 1024 === e.displayWidth ? a.originalEvent[d][f].clientX : 1024 * a.originalEvent[d][f].clientX / 1280,
          clientY: 1024 === e.displayWidth ? a.originalEvent[d][f].clientY : 1024 * a.originalEvent[d][f].clientY / 1280
        }
      }
      switch (m)
      {
        case "START":
          c.callTouchesBegin(g);
          break;
        case "MOVE":
          c.callTouchesMove(g);
          break;
        case "END":
          c.callTouchesEnd(g)
      }
    },
    x = q.View.extend(
    {
      className: "pointBtnSec",
      initialize: function(a)
      {
        this.model = a.model;
        this.index = a.index;
        this.createDom()
      },
      render: function()
      {
        this.template = l.template($("#tempForBrowserBtn").text());
        this.$el.html(this.template(
        {
          model:
          {
            btnNo: this.model.pointId,
            btnName: "ポイント" + this.index
          }
        }));
        return this
      },
      events: function()
      {
        var a = {};
        a[e.cgti + " #pointBtn"] = this.tapPointForBrowser;
        return a
      },
      createDom: function()
      {
        $(".forBrowserSec").append(this.render().el)
      },
      tapPointForBrowser: function(a)
      {
        a.preventDefault();
        e.isScrolled() || t(
        {
          pointId: Number(a.currentTarget.dataset.btnno)
        })
      }
    }),
    w = function(a)
    {
      window.isBrowser && l.each(a.model.nativeModel.pointList, function(a, b, d)
      {
        n["pointBtnView" + b] = new x(
        {
          model: a,
          index: b
        })
      })
    },
    t = function(a)
    {
      var e = Number(a.pointId);
      if ($("#mainSec #battleInfoSec")[0]) k = !1, $("#battleInfoSec").removeClass("show"), $("#battleInfoSec").addClass("hide"), c.startSe(1003);
      else
      {
        var g = {};
        l.each(b.questInfo.questInfoList, function(a, b, c)
        {
          a.questBattleId == e && (g = a)
        });
        k = !0;
        n.battleInfoView = new v(
        {
          model: g,
          factorItemIdList: b.factorItemIdList
        })
      }
    };
  return r
});
