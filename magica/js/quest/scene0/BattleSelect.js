define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/scene0/BattleSelect.html text!css/quest/scene0/BattleSelect.css js/quest/scene0/Model js/quest/scene0/Utility js/quest/scene0/parts/UseItemView js/quest/scene0/parts/BattleSelectQuestListView js/quest/scene0/parts/BattleSelectQuestBtnView js/quest/scene0/parts/BattleSelectChangeDifficultyLevelPopup".split(" "), function(d, h, b, f, g, u, k, l, m, v, n, p, q, r)
{
  var c = {},
    t = h.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #changeDifficultyLevelBtn"] = this.tapChangeDifficultyLevelBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = d.template(k);
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
        b.content.append(a.render().el);
        c.useItemView = new n(
        {
          pageModel: a.pageModel
        });
        $("#mainSec").append(c.useItemView.render().el);
        d.each(a.pageModel.challengeList, function(b, e, f)
        {
          b && (c["BattleSelectListView" + e] = new p(
          {
            model: b
          }), $("#QuestMainSec").append(c["BattleSelectListView" + e].render().el), d.each(b.questList, function(b, d, f)
          {
            b && (c["BattleSelectBtnView" + e] = new q(
            {
              model: b,
              _views: c,
              userQuestAdventureList: a.pageModel.userQuestAdventureList
            }), $("#QuestMainSec #" + c["BattleSelectListView" + e].getListId()).append(c["BattleSelectBtnView" + e].render().el))
          }))
        });
        b.ready.hide()
      },
      tapChangeDifficultyLevelBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (c.ChangeDifficultyLevelPopup = new r(
        {}))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
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
      id: "userQuestAdventureList"
    }],
    fetch: function()
    {
      f.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      var a = f.getPageJson();
      b.setStyle(l);
      a = m.getBattleSelectModel(
      {
        pageJson: a
      });
      g.startBgm("bgm01_anime11");
      g.changeBg("web_scene0_storyBG.ExportJson");
      c.pageView = new t(
      {
        pageModel: a
      });
      b.setGlobalView()
    },
    remove: function(a)
    {
      d.each(c, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
