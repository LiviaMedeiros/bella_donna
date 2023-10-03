define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/scene0/Top.html text!css/quest/scene0/Top.css js/quest/scene0/Model js/quest/scene0/Utility js/quest/scene0/parts/UseItemView js/view/tutorial/TutorialPopupView".split(" "), function(f, k, b, g, c, u, l, m, n, v, p, h)
{
  var d = {},
    q = k.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #mainStoryBtn"] = this.tapMainStoryBtn;
        a[b.cgti + " #battleBtn"] = this.tapBattleBtn;
        a[b.cgti + " #sideStoryBtn"] = this.tapSideStoryBtn;
        a[b.cgti + " #missionBtn"] = this.tapMissionBtn;
        a[b.cgti + " #helpBtn"] = this.tapHelpBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = f.template(l);
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
        d.useItemView = new p(
        {
          pageModel: this.pageModel
        });
        $("#mainSec").append(d.useItemView.render().el);
        b.ready.hide()
      },
      tapMainStoryBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = this.pageModel.StorySelectUrl)
      },
      tapBattleBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/Scene0BattleSelect")
      },
      tapSideStoryBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/Scene0SideStorySelect")
      },
      tapMissionBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/MissionTop")
      },
      tapHelpBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e;
          new b.PopupClass(
          {
            popupType: "tutorial"
          }, null, function()
          {
            h.prototype.parentView = this;
            e = new h(
            {
              imgArr: ["navi_01", "navi_02", "navi_03"],
              type: "scene0"
            });
            b.doc.getElementsByClassName("popupInner")[0].appendChild(e.render().el)
          }, function()
          {
            e.removeView()
          })
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    r = function(a)
    {
      var e = a.callback;
      b.preNativeFadeIn(function()
      {
        b.ready.show();
        c.setWebView(!1);
        c.stopBgm();
        $("#commandDiv").on("nativeCallback", function(a, d)
        {
          $("#commandDiv").off();
          b.androidKeyStop = !1;
          c.setWebView(!0);
          e()
        });
        c.playMovieNoSkip("resource/movie/other/op_movie3.usm");
        localStorage.setItem("watchScene0OP", "true");
        window.isBrowser && nativeCallback()
      }, 500)
    },
    t = function()
    {
      var a = function()
      {
        var a = g.getPageJson();
        b.setStyle(m);
        a = n.getTopModel(
        {
          pageJson: a
        });
        c.startBgm("bgm01_anime11");
        a.terminalClass = "";
        1024 !== b.displayWidth && (a.terminalClass = "iPhoneXOrMore");
        b.ua.ipad && (a.terminalClass = "iPad");
        a.isFilm1Clear ? b.ua.isIphoneXOrMore ? c.changeBg("web_scene0_topBG_X.ExportJson") : c.changeBg("web_scene0_topBG.ExportJson") : b.ua.isIphoneXOrMore ? c.changeBg("web_scene0_topBG_2X.ExportJson") : c.changeBg("web_scene0_topBG_2.ExportJson");
        d.pageView = new q(
        {
          pageModel: a
        });
        b.setGlobalView()
      };
      localStorage.getItem("watchScene0OP") ? a() : r(
      {
        callback: a
      })
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
      g.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      t()
    },
    remove: function(a)
    {
      f.each(d, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
