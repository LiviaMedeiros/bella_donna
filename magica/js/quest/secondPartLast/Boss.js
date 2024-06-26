define("underscore backbone backboneCommon ajaxControl command QuestUtil cardUtil text!template/quest/secondPartLast/Boss.html text!css/quest/SecondPartLastBoss.css text!css/quest/QuestCommon.css".split(" "), function(e, f, a, g, d, q, h, k, l, m)
{
  var b, p = f.View.extend(
    {
      events: function()
      {
        var c = {};
        c[a.cgti + " #lastBossBattleBtn"] = n;
        return c
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      initialize: function(c)
      {
        this.template = e.template(k);
        a.content.prepend(this.render().el)
      }
    }),
    n = function(c)
    {
      a.questBattleModel = a.secondPartLastInfo.questModelCreate(
      {
        battleType: "LastBattle",
        questModel: a.secondPartLastInfo.questInfo[5],
        sectionModel: a.secondPartLastInfo.sectionInfo
      });
      location.href = "#/SupportSelect"
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
      id: "pieceList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "titleList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      a.secondPartLastInfo ? g.pageModelGet(this.needModelIdObj, null, "noConnect") : location.href = "#/SecondPartLastRouter"
    },
    init: function()
    {
      a.historyArr = ["MyPage", "MainQuest", "SecondPartLastBoss"];
      a.setStyle(l + m);
      d.startBgm("bgm22_battle06");
      d.changeBg("web_secondPartLastBattle_21188.ExportJson");
      b = new p;
      h.createCardList();
      d.getBaseData(a.getNativeObj());
      a.setGlobalView();
      a.tapBlock(!1);
      a.ready.hide()
    },
    remove: function(a)
    {
      b && (b.trigger("removeView"), b.remove());
      a()
    }
  }
});
