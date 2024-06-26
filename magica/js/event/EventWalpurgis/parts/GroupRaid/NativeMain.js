define("underscore backbone backboneCommon ajaxControl command js/event/EventWalpurgis/Model text!template/event/EventWalpurgis/GroupRaidNativeParts.html js/event/EventWalpurgis/parts/GroupRaid/SubBossPopup js/event/EventWalpurgis/parts/GroupRaid/MainBossPopup".split(" "), function(m, q, f, r, h, n, v, w, x)
{
  var b, l, k, t;
  r = q.View.extend(
  {
    events: function()
    {
      var a = {};
      a["touchstart #nativeTouchWrap"] = this.touchStart;
      a["touchmove #nativeTouchWrap"] = this.touchMove;
      a["touchend #nativeTouchWrap"] = this.touchEnd;
      a[f.cgti + " #changeNativeData"] = this.changeNativeData;
      return a
    },
    initialize: function(a)
    {
      b = a.model;
      l = a._views;
      t = a.getIsStampDisp;
      this.template = m.template(v);
      this.setNativeObj(
      {
        model: b
      });
      k = !0
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
      var d = this;
      a = a.model;
      $("#commandDiv").off();
      $("#commandDiv").on("nativeCallback", function(a, c)
      {
        c && ("reload" == c.type ? d.reloadAllList(
        {}) : (h.startSe(1002), d.tapPoint(
        {
          type: c.type
        })))
      });
      y(
      {
        model: b
      });
      h.pushEventPuellaRaid(a.nativeModel)
    },
    reloadNativeObj: function(a)
    {
      h.reloadEventPuellaRaid(a.model.nativeModel)
    },
    tapPoint: function(a)
    {
      u(
      {
        type: a.type
      })
    },
    reloadAllList: function()
    {
      var a = this,
        d = {
          nativeModel:
          {
            stampList: [],
            damageList: []
          }
        };
      n.getStampList(
      {
        callback: function(g)
        {
          m.each(g.res.stampList, function(a, e, g)
          {
            d.nativeModel.stampList.push(
            {
              userName: a.userName,
              comment: a.comment,
              filename: "event_dailytower_" + a.stampId + "_s.png"
            })
          });
          n.getAttackInfoList(
          {
            mode: "",
            callback: function(c)
            {
              m.each(c.res.damageList, function(a, c, g)
              {
                d.nativeModel.damageList.push(
                {
                  userName: a.userName,
                  damage: a.damage
                })
              });
              a.reloadNativeObj(
              {
                model: d
              })
            }
          })
        }
      })
    },
    touchStart: function(a)
    {
      a.preventDefault();
      k && (f.tapEffectStop = !0, p(a, "START"))
    },
    touchMove: function(a)
    {
      a.preventDefault();
      k && p(a, "MOVE")
    },
    touchEnd: function(a)
    {
      a.preventDefault();
      k && !f.isDoubleTouch() && (f.tapEffectStop = !1, p(a, "END"))
    },
    changeNativeData: function(a)
    {
      a.preventDefault();
      k && z(
      {})
    },
    removeView: function()
    {
      $("#commandDiv").off();
      h.popEventStoryRaid();
      k = null;
      this.off();
      this.remove()
    }
  });
  var p = function(a, d)
    {
      for (var g = [], c = "END" !== d ? "touches" : "changedTouches", e = 0; e < a.originalEvent[c].length; e++)
      {
        var b = a.originalEvent[c][e].identifier;
        0 > b && (b = -b);
        g[e] = {
          identifier: b,
          clientX: 1024 === f.displayWidth ? a.originalEvent[c][e].clientX : 1024 * a.originalEvent[c][e].clientX / 1280,
          clientY: 1024 === f.displayWidth ? a.originalEvent[c][e].clientY : 1024 * a.originalEvent[c][e].clientY / 1280
        }
      }
      switch (d)
      {
        case "START":
          h.callTouchesBegin(g);
          break;
        case "MOVE":
          h.callTouchesMove(g);
          break;
        case "END":
          h.callTouchesEnd(g)
      }
    },
    u = function(a)
    {
      a = a.type;
      t() || ("boss" == a ? l.MainBossPopup = new x(
      {
        model:
        {
          pageModel: b,
          questInfo: b.questInfo.questInfoList.boss
        },
        _views: l
      }) : "normal" == a && (l.SubBossPopup = new w(
      {
        model: b.questInfo.questInfoList.subBossList,
        _views: l
      })))
    },
    A = q.View.extend(
    {
      className: "pointBtnSec",
      initialize: function(a)
      {
        this.model = a.model;
        this.createDom()
      },
      render: function()
      {
        this.template = m.template($("#tempForBrowserBtn").text());
        var a = this.model;
        this.$el.html(this.template(
        {
          model:
          {
            type: a.type,
            btnName: "ポイント：" + a.btnName
          }
        }));
        return this
      },
      events: function()
      {
        var a = {};
        a[f.cgti + " #pointBtn"] = this.tapPointForBrowser;
        return a
      },
      createDom: function()
      {
        $(".forBrowserSec").append(this.render().el)
      },
      tapPointForBrowser: function(a)
      {
        a.preventDefault();
        f.isScrolled() || u(
        {
          type: a.currentTarget.dataset.type
        })
      }
    }),
    y = function(a)
    {
      window.isBrowser && (k || m.each([
      {
        type: "boss",
        btnName: "ボス"
      },
      {
        type: "normal",
        btnName: "取巻"
      }], function(a, b, c)
      {
        l["pointBtnView" + b] = new A(
        {
          model: a
        })
      }))
    },
    z = function(a)
    {
      n.getStampList(
      {
        callback: function(a)
        {
          console.log("stampList", a.res);
          n.getAttackInfoList(
          {
            mode: "",
            callback: function(a)
            {
              console.log("damageList", a.res)
            }
          })
        }
      })
    };
  return r
});
