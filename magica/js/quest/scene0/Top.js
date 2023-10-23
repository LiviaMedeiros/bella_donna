define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/scene0/Top.html text!css/quest/scene0/Top.css js/quest/scene0/Model js/quest/scene0/Utility js/quest/scene0/parts/UseItemView js/view/tutorial/TutorialPopupView".split(" "), function(g, m, b, h, c, v, n, p, q, w, r, k)
{
  var d = {},
    e = {},
    t = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #mainStoryBtn"] = this.tapMainStoryBtn;
        a[b.cgti + " #battleBtn"] = this.tapBattleBtn;
        a[b.cgti + " #sideStoryBtn"] = this.tapSideStoryBtn;
        a[b.cgti + " #missionBtn"] = this.tapMissionBtn;
        a[b.cgti + " #helpBtn"] = this.tapHelpBtn;
        a[b.cgti + " #movieBtn"] = this.tapMovieBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template(n);
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
        d.useItemView = new r(
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
          var f;
          new b.PopupClass(
          {
            popupType: "tutorial"
          }, null, function()
          {
            k.prototype.parentView = this;
            f = new k(
            {
              imgArr: ["navi_01", "navi_02_a", "navi_03_a"],
              type: "scene0"
            });
            b.doc.getElementsByClassName("popupInner")[0].appendChild(f.render().el)
          }, function()
          {
            f.removeView()
          })
        }
      },
      tapMovieBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || l(
        {
          isCanCancel: !0
        })
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    l = function(a)
    {
      var f = a.callback,
        d = a.isCanCancel;
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
          f ? f() : (c.changeBg(e.bgName), c.startBgm(e.bgmName), b.ready.hide())
        });
        d ? c.playMovie("resource/movie/other/op_movie3.usm") : c.playMovieNoSkip("resource/movie/other/op_movie3.usm");
        localStorage.setItem("watchScene0OP", "true");
        window.isBrowser && nativeCallback()
      }, 500)
    },
    u = function()
    {
      var a = function()
      {
        var a = h.getPageJson();
        b.setStyle(p);
        a = q.getTopModel(
        {
          pageJson: a
        });
        e.bgmName = "bgm01_anime11";
        c.startBgm(e.bgmName);
        a.terminalClass = "";
        1024 !== b.displayWidth && (a.terminalClass = "iPhoneXOrMore");
        b.ua.ipad && (a.terminalClass = "iPad");
        e.bgName = a.isFilm1Clear ? b.ua.isIphoneXOrMore ? "web_scene0_topBG_X.ExportJson" : "web_scene0_topBG.ExportJson" : b.ua.isIphoneXOrMore ? "web_scene0_topBG_2X.ExportJson" : "web_scene0_topBG_2.ExportJson";
        c.changeBg(e.bgName);
        d.pageView = new t(
        {
          pageModel: a
        });
        b.setGlobalView()
      };
      localStorage.getItem("watchScene0OP") ? a() : l(
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
      h.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      u()
    },
    remove: function(a)
    {
      g.each(d, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
