define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/lastBattle/SingleRaidNativeParts.html js/quest/puellaHistoria/lastBattle/parts/SingleRaid/BattleInfo".split(" "), function(l, q, c, r, d, u, v)
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
      var f = this;
      a = a.model;
      $("#commandDiv").off();
      $("#commandDiv").on("nativeCallback", function(a, e)
      {
        e && (d.startSe(1002), f.tapPoint(
        {
          pointId: e.pointId
        }));
        d.enableTapEventSingleRaid(
        {
          enable: !0
        })
      });
      w(
      {
        model: b
      });
      d.pushEventSingleRaid(a.nativeModel)
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
      d.startSe(1003)
    },
    touchStart: function(a)
    {
      a.preventDefault();
      h && (c.tapEffectStop = !0, p(a, "START"))
    },
    touchMove: function(a)
    {
      a.preventDefault();
      h && p(a, "MOVE")
    },
    touchEnd: function(a)
    {
      a.preventDefault();
      h && !c.isDoubleTouch() && (c.tapEffectStop = !1, k ? this.checkBattleInfo() : p(a, "END"))
    },
    removeView: function()
    {
      $("#commandDiv").off();
      d.popEventSingleRaid();
      h = null;
      this.off();
      this.remove()
    }
  });
  var p = function(a, f)
    {
      for (var m = [], e = "END" !== f ? "touches" : "changedTouches", g = 0; g < a.originalEvent[e].length; g++)
      {
        var b = a.originalEvent[e][g].identifier;
        0 > b && (b = -b);
        m[g] = {
          identifier: b,
          clientX: 1024 === c.displayWidth ? a.originalEvent[e][g].clientX : 1024 * a.originalEvent[e][g].clientX / 1280,
          clientY: 1024 === c.displayWidth ? a.originalEvent[e][g].clientY : 1024 * a.originalEvent[e][g].clientY / 1280
        }
      }
      switch (f)
      {
        case "START":
          d.callTouchesBegin(m);
          break;
        case "MOVE":
          d.callTouchesMove(m);
          break;
        case "END":
          d.callTouchesEnd(m)
      }
    },
    x = q.View.extend(
    {
      className: "pointBtnSec",
      initialize: function(a)
      {
        this.model = a.model;
        this.createDom()
      },
      render: function()
      {
        this.template = l.template($("#tempForBrowserBtn").text());
        var a = this.model;
        this.$el.html(this.template(
        {
          model:
          {
            btnNo: a.pointId,
            btnName: "ポイント" + a.dayId
          }
        }));
        return this
      },
      events: function()
      {
        var a = {};
        a[c.cgti + " #pointBtn"] = this.tapPointForBrowser;
        return a
      },
      createDom: function()
      {
        $(".forBrowserSec").append(this.render().el)
      },
      tapPointForBrowser: function(a)
      {
        a.preventDefault();
        c.isScrolled() || t(
        {
          pointId: Number(a.currentTarget.dataset.btnno)
        })
      }
    }),
    w = function(a)
    {
      window.isBrowser && l.each(a.model.nativeModel.pointList, function(a, b, e)
      {
        n["pointBtnView" + b] = new x(
        {
          model: a
        })
      })
    },
    t = function(a)
    {
      var f = Number(a.pointId) - 10;
      if ($("#mainSec #battleInfoSec")[0]) k = !1, $("#battleInfoSec").removeClass("show"), $("#battleInfoSec").addClass("hide"), d.startSe(1003);
      else
      {
        var c = {};
        l.each(b.questInfo.questInfoList, function(a, b, d)
        {
          b == f && (a.battleNo = Number(f + 1), c = a)
        });
        "LAST" == b.nativeModel.pointList[f].iconType ? location.href = "#/EventPuellaRaidTop" : (k = !0, n.battleInfoView = new v(
        {
          model: c
        }))
      }
    };
  return r
});
