define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/page/ExchangeTop.html text!css/event/EventWitch/ExchangeTop.css js/event/EventWitch/Model js/event/EventWitch/Utility js/event/EventWitch/parts/ExchangeMemoria".split(" "), function(l, p, d, m, g, q, r, t, u, v)
{
  var h = {},
    e, n, x = p.View.extend(
    {
      events: function()
      {
        var a = {};
        a[d.cgti + " .live2dArea"] = this.touch;
        a[d.cgti + " #ToBoxGachaTopBtn"] = this.tapToBoxGachaTopBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = l.template(q);
        this.pageModel = a.pageModel;
        this.l2dTouchCnt = 0;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.pageModel
        }));
        return this
      },
      createDom: function()
      {
        d.content.append(this.render().el);
        l.each(this.pageModel.eventCharaInfo, function(a, b, c)
        {
          h["ExchangeMemoria" + b] = new v(
          {
            model: a,
            _views: h,
            appendSelector: "#MemoriaList"
          })
        });
        d.ready.hide();
        e = "100851";
        w(!0)
      },
      touch: function(a)
      {
        a.preventDefault();
        if (!d.isScrolled() && e)
        {
          a = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0] : a.originalEvent;
          a = {
            id: e,
            x: a.pageX,
            y: a.pageY
          };
          var b = [32, 33, 34, 35, 36, 37, 38, 39];
          7 <= this.l2dTouchCnt && b.push(40);
          var b = b[Math.floor(Math.random() * b.length)] + 1,
            c = e.substring(0, e.length - 2),
            f = e.substring(e.length - 2, e.length);
          a.voice = "vo_char_" + c + "_" + f + "_" + b;
          g.storyMotionL2dVoice(a);
          this.l2dTouchCnt++
        }
      },
      tapToBoxGachaTopBtn: function(a)
      {
        a.preventDefault();
        d.isScrolled() || (location.href = "#/CampaignBoxGachaTop")
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    w = function(a)
    {
      g.endL2d();
      var b = {
        type: 0
      };
      b.id = e;
      b.x = 140;
      b.y = 1024 === d.displayWidth ? Math.floor(d.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(d.shortSize / 2);
      if (e)
      {
        var c = e.substring(0, e.length - 2);
        if (a)
        {
          b.type = 0;
          a = "vo_char_" + c + "_" + e.substring(e.length - 2, e.length) + "_";
          var c = [],
            f = Number(n.currentTime.split(" ")[1].split(":")[0]),
            k = Number(n.currentTime.split(" ")[1].split(":")[1]);
          6 <= f && 9 >= f && !(9 == f && 0 < k) ? c.push(24) : 11 <= f && 13 >= f && !(13 == f && 0 < k) ? c.push(25) : 17 <= f && 19 >= f && !(19 == f && 0 < k) ? c.push(26) : (22 <= f || 0 == f && !(0 == f && 0 < k)) && c.push(27);
          c.push(28);
          c.push(23);
          d.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON().point >= d.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON().point && c.push(29);
          d.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON().point >= d.storage.userStatusList.findWhere(
          {
            statusId: "MAX_BTP"
          }).toJSON().point && c.push(30);
          b.key = a + (c[Math.floor(Math.random() * c.length)] + 1)
        }
        else b.type = 1, b.key = "idle"
      }
      g.startL2d(b)
    },
    y = function(a)
    {
      var b = a.callback,
        c = a.eventMaster;
      d.playStory(
      {
        cmd: g,
        ajaxControl: m,
        storyId: a.storyId,
        callback: function()
        {
          b();
          localStorage.setItem("WatchEventWitchED", c.eventId);
          setTimeout(function()
          {
            d.removeClass(d.ready.target, "fadeout")
          }, 500)
        }
      });
      window.isBrowser && nativeCallback()
    },
    z = function()
    {
      var a = m.getPageJson();
      n = a;
      var b = u.getEventMaster(
      {
        pageJson: a
      });
      if (b && b.isOpen)
      {
        var c = function()
          {
            d.setStyle(r);
            var b = t.getExchangeTopModel(
            {
              pageJson: a
            });
            g.startBgm(b.eventMaster.viewParameterMap.BGM);
            g.changeBg("web_ev_1210_15121.ExportJson");
            h.pageView = new x(
            {
              pageModel: b
            });
            d.setGlobalView()
          },
          f = Number(localStorage.getItem("WatchEventWitchED")),
          e = b.viewParameterMap.ED_STORYID;
        "exchangeOnly" == b.termStatus && e ? f == b.eventId ? c() : y(
        {
          storyId: e,
          eventMaster: b,
          callback: c
        }) : c()
      }
      else location.href = "#/MyPage"
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
      id: "pieceList"
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
      id: "userDeckList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      m.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      z()
    },
    remove: function(a)
    {
      l.each(h, function(a, c, d)
      {
        a.removeView && a.removeView()
      });
      g.endL2d();
      a()
    }
  }
});
