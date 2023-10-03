define("underscore backbone backboneCommon ajaxControl command js/quest/scene0/Utility text!template/quest/scene0/RecollectionPopup.html text!template/quest/scene0/RecollectionBtn.html text!template/quest/scene0/RecollectionPopupFilmBtn.html".split(" "), function(e, f, b, k, r, t, l, m, n)
{
  var g, h;
  k = f.View.extend(
  {
    id: "recollectionBtn",
    className: "sb_gold_01 TE",
    events: function()
    {
      var a = {};
      a[b.cgti] = this.tapRecollectionBtn;
      return a
    },
    initialize: function(a)
    {
      this.model = a.pageModel;
      g = a._views;
      this.template = e.template(m);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createDom: function() {},
    tapRecollectionBtn: function(a)
    {
      a && a.preventDefault();
      b.isScrolled() || (g.RecollectionPopupView = new p(
      {
        model: this.model
      }))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  var p = f.View.extend(
    {
      className: "recollectionPopupSec",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.model = a.model;
        this.template = e.template(l);
        this.viewModel = this.createModel(
        {
          model: this.model
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
        a = a.model;
        var c = e.last(a.clearFilmList),
          d = "";
        c.sectionInfo.section && c.sectionInfo.section.outline && (d = c.sectionInfo.section.outline.replace(/＠/g, "<br>"));
        return {
          mainText: d,
          titleClass: "film" + c.id,
          clearFilmList: a.clearFilmList
        }
      },
      createDom: function()
      {
        var a = this;
        h = new b.PopupClass(
        {
          exClass: "scene0RecollectionPopup",
          popupType: "typeA",
          content: ""
        }, null, function()
        {
          $(".scene0RecollectionPopup .popupTextArea").append(a.render().el);
          b.scrollSet("recollectionPopupScrollWrap", "scrollInner");
          e.each(a.viewModel.clearFilmList, function(c, d, b)
          {
            b = !1;
            a.viewModel.clearFilmList.length == d + 1 && (b = !0);
            g["RecollectionFilmBtn" + d] = new q(
            {
              model:
              {
                filmInfo: c,
                isLast: b,
                addSelector: ".scene0RecollectionPopup .popupTextArea .filmBtnList"
              }
            })
          })
        }, null)
      },
      removeView: function()
      {
        h && h.remove();
        this.off();
        this.remove()
      }
    }),
    q = f.View.extend(
    {
      tagName: "li",
      className: function()
      {
        var a = "filmBtnSec";
        this.model.isLast && (a += " on");
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti] = this.tapBtn;
        return a
      },
      initialize: function()
      {
        this.addSelector = this.model.addSelector;
        this.template = e.template(n);
        this.viewModel = this.createModel(
        {
          model: this.model
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
        return {
          filmNum: a.model.filmInfo.id
        }
      },
      createDom: function()
      {
        $(this.addSelector).append(this.render().el)
      },
      tapBtn: function(a)
      {
        a && a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this.model,
            d = "";
          c.filmInfo.sectionInfo.section && c.filmInfo.sectionInfo.section.outline && (d = c.filmInfo.sectionInfo.section.outline.replace(/＠/g, "<br>"));
          $(".mainTextSec #textSec").html(d);
          b.scrollRefresh(null, null, !0);
          $(".filmBtnList .filmBtnSec").removeClass("on");
          $(a.currentTarget).addClass("on");
          $(".textTitle #titleImg").removeClass();
          $(".textTitle #titleImg").addClass("film" + c.filmInfo.id)
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return k
});
