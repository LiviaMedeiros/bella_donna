define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/scene0/StorySelectAfterFilm1.html text!css/quest/scene0/StorySelectAfterFilm1.css js/quest/scene0/Model js/quest/scene0/Utility js/quest/scene0/parts/UseItemView js/quest/scene0/parts/NativeAfterFilm1 js/quest/scene0/parts/BtnListAfterFilm1 js/quest/scene0/parts/RecollectionBtnAfterFilm1".split(" "), function(d, g, b, e, f, t, h, k, l, u, m, n, p, q)
{
  var a = {},
    r = g.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = d.template(h);
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
        b.content.append(this.render().el);
        a.useItemView = new m(
        {
          pageModel: this.pageModel
        });
        $("#mainSec").append(a.useItemView.render().el);
        a.NativeAfterFilm1 = new n(
        {
          pageModel: this.pageModel,
          _views: a
        });
        $("#mainSec").append(a.NativeAfterFilm1.render().el);
        a.recollectionBtnAfterFilm1 = new q(
        {
          pageModel: this.pageModel,
          _views: a
        });
        $("#mainSec").append(a.recollectionBtnAfterFilm1.render().el);
        window.isBrowser && (a.BtnListAfterFilm1 = new p(
        {
          pageModel: this.pageModel,
          _views: a
        }));
        b.ready.hide()
      },
      removeView: function()
      {
        b.noGetPurchaseStatus = null;
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
      id: "userItemList"
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
      e.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      var c = e.getPageJson();
      b.setStyle(k);
      c = l.getAfterFilm1Model(
      {
        pageJson: c
      });
      f.startBgm("bgm01_anime11");
      f.changeBg("web_scene0_storyBG.ExportJson");
      a.pageView = new r(
      {
        pageModel: c
      });
      b.setGlobalView();
      b.noGetPurchaseStatus = !0;
      b.historyArr = ["MyPage", "Scene0Top", "StorySelectAfterFilm1"]
    },
    remove: function(b)
    {
      d.each(a, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      b()
    }
  }
});
