define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/scene0/StorySelectBeforeFilm1.html text!css/quest/scene0/StorySelectBeforeFilm1.css js/quest/scene0/Model js/quest/scene0/Utility js/quest/scene0/parts/UseItemView js/quest/scene0/parts/QuestListView text!template/quest/scene0/StorySelectBeforeFilm1Animation.html".split(" "), function(d, g, b, h, f, w, l, m, n, p, q, r, t)
{
  var c = {},
    v = g.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = d.template(l);
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
        c.useItemView = new q(
        {
          pageModel: a.pageModel
        });
        $("#mainSec").append(c.useItemView.render().el);
        c.questList = [];
        d.each(a.pageModel.questInfo.questInfoList.reverse(), function(b, e, k)
        {
          k = function(e)
          {
            var c = {};
            d.each(a.pageModel.questInfo.sectionInfoList, function(a, e, d)
            {
              a.sectionId == b.questBattle.sectionId && (c = a)
            });
            return c
          }();
          c.questList.push(new r(
          {
            pageModel: a.pageModel,
            sectionInfo: k,
            questInfo: b
          }));
          $("#questList").append(c.questList[e].render().el)
        });
        var e = "";
        1024 !== b.displayWidth && (e = "iPhoneXOrMore");
        b.ua.ipad && (e = "iPad");
        b.scrollSet("scrollWrap", "scrollInner");
        b.ready.hide();
        p.getIsScene0Film1Clear(
        {
          userSectionList: a.pageModel.questInfo.sectionInfoList
        }) && !localStorage.getItem("scene0BeforeFilm1IsClear") && (localStorage.setItem("scene0BeforeFilm1IsClear", "true"), setTimeout(function()
        {
          b.globalMenuView && b.globalMenuView.trigger("removeView");
          $("#scene0UseItemSec").addClass("noDisp");
          c.FilmAnimation = new u(
          {
            terminalClass: e,
            callback: function()
            {
              location.href = "#/Scene0StorySelectAfterFilm1"
            }
          })
        }, 10))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    u = g.View.extend(
    {
      events: function()
      {
        var a = {};
        a["webkitAnimationEnd .filmWrap"] = this.filmWrap;
        a["webkitAnimationEnd .frameWrap"] = this.frameWrap;
        return a
      },
      initialize: function(a)
      {
        this.terminalClass = a.terminalClass;
        this.callback = a.callback;
        this.template = d.template(t);
        this.createDom();
        setTimeout(function()
        {
          f.startSur("8092_film")
        }, 1E3)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model:
          {
            terminalClass: this.terminalClass
          }
        }));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el)
      },
      filmWrap: function()
      {
        b.addClass(b.doc.getElementsByClassName("filmImg")[0], "vibration")
      },
      frameWrap: function()
      {
        var a = this;
        setTimeout(function()
        {
          f.changeBg("web_black.jpg")
        }, 500);
        setTimeout(function()
        {
          a.callback()
        }, 1E3)
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
      var a = h.getPageJson();
      b.setStyle(m);
      a = n.getBeforeFilm1Model(
      {
        pageJson: a
      });
      f.startBgm("bgm01_anime11");
      f.changeBg("web_scene0_storyBG_2.ExportJson");
      a.terminalClass = "";
      1024 !== b.displayWidth && (a.terminalClass = "iPhoneX");
      b.ua.ipad && (a.terminalClass = "iPad");
      c.pageView = new v(
      {
        pageModel: a
      });
      b.setGlobalView()
    },
    remove: function(a)
    {
      d.each(c, function(a, b, c)
      {
        a.removeView && a.removeView();
        a.length && d.each(a, function(a, b, c)
        {
          a.removeView && a.removeView()
        })
      });
      a()
    }
  }
});
