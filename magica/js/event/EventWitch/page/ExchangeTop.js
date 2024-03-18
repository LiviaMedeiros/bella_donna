define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/page/ExchangeTop.html text!css/event/EventWitch/ExchangeTop.css js/event/EventWitch/Model js/event/EventWitch/Utility js/event/EventWitch/parts/ExchangeMemoria".split(" "), function(k, n, c, m, h, p, q, r, t, u)
{
  var g = {},
    e, l, w = n.View.extend(
    {
      events: function()
      {
        var a = {};
        a[c.cgti + " .live2dArea"] = this.touch;
        a[c.cgti + " #ToBoxGachaTopBtn"] = this.tapToBoxGachaTopBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = k.template(p);
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
        c.content.append(this.render().el);
        k.each(this.pageModel.eventCharaInfo, function(a, b, d)
        {
          g["ExchangeMemoria" + b] = new u(
          {
            model: a,
            _views: g,
            appendSelector: "#MemoriaList"
          })
        });
        c.ready.hide();
        e = "100851";
        v(!0)
      },
      touch: function(a)
      {
        a.preventDefault();
        if (!c.isScrolled() && e)
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
            d = e.substring(0, e.length - 2);
          a.voice = "vo_char_" + d + "_00_" + b;
          h.storyMotionL2dVoice(a);
          this.l2dTouchCnt++
        }
      },
      tapToBoxGachaTopBtn: function(a)
      {
        a.preventDefault();
        c.isScrolled() || (location.href = "#/CampaignBoxGachaTop")
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    v = function(a)
    {
      h.endL2d();
      var b = {
        type: 0
      };
      b.id = e;
      b.x = 140;
      b.y = 1024 === c.displayWidth ? Math.floor(c.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(c.shortSize / 2);
      if (e)
      {
        var d = e.substring(0, e.length - 2);
        if (a)
        {
          b.type = 0;
          a = "vo_char_" + d + "_" + e.substring(e.length - 2, e.length) + "_";
          var d = [],
            f = Number(l.currentTime.split(" ")[1].split(":")[0]),
            g = Number(l.currentTime.split(" ")[1].split(":")[1]);
          6 <= f && 9 >= f && !(9 == f && 0 < g) ? d.push(24) : 11 <= f && 13 >= f && !(13 == f && 0 < g) ? d.push(25) : 17 <= f && 19 >= f && !(19 == f && 0 < g) ? d.push(26) : (22 <= f || 0 == f && !(0 == f && 0 < g)) && d.push(27);
          d.push(28);
          d.push(23);
          c.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON().point >= c.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON().point && d.push(29);
          c.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON().point >= c.storage.userStatusList.findWhere(
          {
            statusId: "MAX_BTP"
          }).toJSON().point && d.push(30);
          b.key = a + (d[Math.floor(Math.random() * d.length)] + 1)
        }
        else b.type = 1, b.key = "idle"
      }
      h.startL2d(b)
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
      var a = m.getPageJson();
      l = a;
      var b = t.getEventMaster(
      {
        pageJson: a
      });
      b && b.isOpen ? (c.setStyle(q), a = r.getExchangeTopModel(
      {
        pageJson: a
      }), h.startBgm(a.eventMaster.viewParameterMap.BGM), h.changeBg("web_ev_1210_15121.ExportJson"), g.pageView = new w(
      {
        pageModel: a
      }), c.setGlobalView()) : location.href = "#/MyPage"
    },
    remove: function(a)
    {
      k.each(g, function(a, d, c)
      {
        a.removeView && a.removeView()
      });
      h.endL2d();
      a()
    }
  }
});
