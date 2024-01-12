define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/BtnListAfterFilm1.html js/quest/scene0/Utility".split(" "), function(c, g, d, h, q, l, m)
{
  var e, k;
  h = g.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = c.template(l);
      k = this.pageModel = a.pageModel;
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
      var a = JSON.parse(JSON.stringify(this.viewModel.filmInfoWeb));
      c.each(a.reverse(), function(a, f, d)
      {
        a && (e["ListView" + f] = new n(
        {
          model: a
        }), $("#BtnListAfterFilm1Sec #btnList").append(e["ListView" + f].render().el), c.each(a.dayList.reverse(), function(b, c, d)
        {
          b && (e["BtnView" + f] = new p(
          {
            model: b,
            filmInfoWeb: a
          }), $("#BtnListAfterFilm1Sec #" + e["ListView" + f].getListId()).append(e["BtnView" + f].render().el))
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
  var n = g.View.extend(
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
    p = g.View.extend(
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
        });
        this.viewModel.filmInfoWeb = a.filmInfoWeb
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
          console.log("BtnViewModel", b.viewModel);
          b.viewModel.isClear ? b.startQuest(
          {
            model: b.viewModel
          }) : m.openStoryPopup(
          {
            needItemNum: b.viewModel.needItemNum,
            itemInfo: k.itemInfo,
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
        localStorage.setItem("scene0LastFilmId", a.filmInfoWeb.id);
        location.href = "#/QuestStoryOnly"
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return h
});
