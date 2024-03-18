define("underscore backbone backboneCommon ajaxControl command text!template/test/EventWitchIconTest.html text!css/quest/QuestResult.css js/event/EventWitch/Model js/event/EventWitch/Utility js/event/EventWitch/parts/IconCharaGauge".split(" "), function(c, g, b, h, k, l, m, r, f, n)
{
  var d = {},
    p = g.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = c.template(l);
        this.pageModel = a.pageModel;
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
        var a = this;
        b.content.append(this.render().el);
        c.each(a.pageModel.charaList, function(e, c, b)
        {
          new n(
          {
            pointType: a.pageModel.pointType,
            appendSelector: "#gaugeWrap .charaListSec",
            model: e
          })
        });
        7 == a.pageModel.charaList.length && $("#gaugeWrap .charaListSec").addClass("chara7");
        k.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    q = function()
    {
      b.setStyle(m);
      var a = {
        pointType: "touch",
        charaList: [
        {
          charaId: 3002,
          eyesightFactor: 1,
          hearingFactor: 1,
          smellFactor: 1,
          tasteFactor: 5,
          touchFactor: 2,
          currentRatio: 2,
          beforeRatio: 0
        },
        {
          charaId: 3003,
          eyesightFactor: 1,
          hearingFactor: 2,
          smellFactor: 1,
          tasteFactor: 1,
          touchFactor: 5,
          currentRatio: 100,
          beforeRatio: 20
        },
        {
          charaId: 3007,
          eyesightFactor: 5,
          hearingFactor: 1,
          smellFactor: 2,
          tasteFactor: 1,
          touchFactor: 1,
          currentRatio: 30,
          beforeRatio: 20
        },
        {
          charaId: 3006,
          eyesightFactor: 1,
          hearingFactor: 1,
          smellFactor: 2,
          tasteFactor: 5,
          touchFactor: 1,
          currentRatio: 60,
          beforeRatio: 20
        },
        {
          charaId: 3004,
          eyesightFactor: 1,
          hearingFactor: 5,
          smellFactor: 2,
          tasteFactor: 1,
          touchFactor: 1,
          currentRatio: 20,
          beforeRatio: 10
        },
        {
          charaId: 3025,
          eyesightFactor: 1,
          hearingFactor: 2,
          smellFactor: 1,
          tasteFactor: 5,
          touchFactor: 1,
          currentRatio: 70,
          beforeRatio: 70
        }]
      };
      c.each(a.charaList, function(a, b, d)
      {
        a.pageType = "questResult";
        f.getRatioAngle(
        {
          ratioObj: a
        });
        a.factorUpList = f.getFactorInfo(
        {
          infoList: a
        });
        var e = [3, 2, 1, 2, 3];
        c.each(a.factorUpList, function(a, b, c)
        {
          a.iconName = "arrow_" + e[b]
        })
      });
      console.log("_pageModel.charaList", a.charaList);
      d.pageView = new p(
      {
        pageModel: a
      });
      b.setGlobalView()
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
      h.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      q()
    },
    remove: function(a)
    {
      c.each(d, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
