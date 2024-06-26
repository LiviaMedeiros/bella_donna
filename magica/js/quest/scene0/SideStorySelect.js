define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/scene0/SideStorySelect.html text!css/quest/scene0/SideStorySelect.css js/quest/scene0/Model js/quest/scene0/Utility js/quest/scene0/parts/UseItemView js/quest/scene0/parts/SideStoryQuestListView js/quest/scene0/parts/SideStoryQuestBtnView".split(" "), function(f, l, c, g, h, w, m, n, p, q, r, t, u)
{
  var b = {},
    v = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[c.cgti + " #playBtn"] = this.tapPlayBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = f.template(m);
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
        c.content.append(this.render().el);
        b.useItemView = new r(
        {
          pageModel: this.pageModel
        });
        $("#mainSec").append(b.useItemView.render().el);
        f.each(this.pageModel.sideStoryList, function(a, d, c)
        {
          a && (b["SideStoryListView" + d] = new t(
          {
            model: a
          }), $("#storyListSec #storyList").append(b["SideStoryListView" + d].render().el), b["SideStoryListView" + d].el.dataset.scrollHash = "list_" + a.id, f.each(a.questList, function(a, c, x)
          {
            a && (b["SideStoryBtnView" + d] = new u(
            {
              model: a
            }), $("#storyListSec #storyList #" + b["SideStoryListView" + d].getListId()).append(b["SideStoryBtnView" + d].render().el))
          }))
        });
        c.scrollSet("scrollWrap", "scrollInner");
        c.ready.hide()
      },
      tapPlayBtn: function(a)
      {
        a.preventDefault();
        if (!c.isScrolled())
        {
          var d = this;
          c.tapBlock(!0);
          var b = d.pageModel.noClearList[Math.floor(Math.random() * d.pageModel.noClearList.length)];
          a = f.findWhere(d.pageModel.sideStoryList,
          {
            id: b.listId
          });
          var k = f.findWhere(a.questList,
            {
              id: b.btnId
            }),
            e = $("#SideStoryFilm" + b.listId + " #SideStoryBtn" + b.btnId);
          a = $("#SideStoryFilm" + b.listId);
          $(a).hasClass("open") || $(a).addClass("open");
          setTimeout(function()
          {
            c.scrollRefresh()
          }, 50);
          setTimeout(function()
          {
            c.forceScroll("scrollWrap", "scrollInner", "list_" + b.listId, !0)
          }, 80);
          setTimeout(function()
          {
            $(e).addClass("on");
            $(e).find(".effect").addClass("on");
            $(e).find(".effect2").addClass("on");
            $(e).on("webkitAnimationEnd", function()
            {
              $(e).removeClass("on");
              $(e).addClass("finish");
              $(e).off();
              $(e).html(b.btnId);
              setTimeout(function()
              {
                c.tapBlock(!1);
                q.openStoryPopup(
                {
                  needItemNum: k.needItemNum,
                  itemInfo: d.pageModel.itemInfoSide,
                  noPopup: !0,
                  callback: function()
                  {
                    d.startQuest(
                    {
                      model: k
                    })
                  }
                })
              }, 1E3)
            })
          }, 200)
        }
      },
      startQuest: function(a)
      {
        a = a.model;
        c.questStoryOnlyModel = {
          sectionModel: a.sectionInfo,
          questBattleModel: a.questInfo.questBattle
        };
        location.href = "#/QuestStoryOnly"
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
      g.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      var a = g.getPageJson();
      c.setStyle(n);
      a = p.getSideStorySelectModel(
      {
        pageJson: a
      });
      h.startBgm("bgm01_anime11");
      h.changeBg("web_scene0_storyBG.ExportJson");
      b.pageView = new v(
      {
        pageModel: a
      });
      c.setGlobalView()
    },
    remove: function(a)
    {
      f.each(b, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
