define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/BtnListAfterFilm1.html js/quest/scene0/Utility".split(" "), function(c, f, d, g, p, k, l)
{
  var e, h;
  g = f.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = c.template(k);
      h = this.pageModel = a.pageModel;
      e = a._views;
      this.viewModel = this.createModel(
      {
        pageModel: this.pageModel
      });
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.viewModel
      }));
      return this
    },
    createModel: function(a)
    {
      return a.pageModel
    },
    createDom: function()
    {
      $("#mainSec").append(this.render().el);
      c.each(this.viewModel.filmInfoWeb.reverse(), function(a, b, d)
      {
        a && (e["ListView" + b] = new m(
        {
          model: a
        }), $("#BtnListAfterFilm1Sec #btnList").append(e["ListView" + b].render().el), c.each(a.dayList.reverse(), function(a, c, d)
        {
          a && (e["BtnView" + b] = new n(
          {
            model: a
          }), $("#BtnListAfterFilm1Sec #" + e["ListView" + b].getListId()).append(e["BtnView" + b].render().el))
        }))
      });
      d.scrollSet("scrollWrap", "scrollInner")
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  var m = f.View.extend(
    {
      className: "listWrapSec",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = c.template($("#tempListSec").text());
        this.model = a.model;
        this.viewModel = this.createModel(
        {
          model: this.model
        })
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.viewModel
        }));
        return this
      },
      createModel: function(a)
      {
        a = a.model;
        this.listId = "film" + a.id;
        return {
          listTitle: "フィルム" + a.id,
          listId: this.listId
        }
      },
      getListId: function()
      {
        return this.listId
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    n = f.View.extend(
    {
      className: "storyBtn",
      events: function()
      {
        var a = {};
        a[d.cgti] = this.tapBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = c.template($("#tempBtn").text());
        this.model = a.model;
        this.viewModel = this.createModel(
        {
          model: this.model
        })
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.viewModel
        }));
        return this
      },
      createModel: function(a)
      {
        a = a.model;
        a.btnText = "Day" + a.id;
        var b = "b_pink";
        a.isClear && (b = "b_white");
        a.btnClass = b;
        return a
      },
      tapBtn: function(a)
      {
        a.preventDefault();
        if (!d.isScrolled())
        {
          var b = this;
          b.viewModel.isClear ? b.startQuest(
          {
            model: b.viewModel
          }) : l.openStoryPopup(
          {
            needItemNum: b.viewModel.needItemNum,
            itemInfo: h.itemInfo,
            callback: function()
            {
              b.startQuest(
              {
                model: b.viewModel
              })
            }
          })
        }
      },
      startQuest: function(a)
      {
        a = a.model;
        d.questStoryOnlyModel = {
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
  return g
});
