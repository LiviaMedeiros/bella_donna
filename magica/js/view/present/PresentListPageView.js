define("underscore backbone backboneCommon ajaxControl command text!template/present/PresentList.html js/view/present/PresentListPartsView js/view/common/PagingView js/present/PresentController".split(" "), function(g, l, a, f, e, q, h, n, p)
{
  var m = l.Model.extend(),
    r = l.Collection.extend();
  return l.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .paging li"] = this.paging;
      b[a.cgti + " .receiveBtn"] = this.receivePresent;
      return b
    },
    initialize: function(a)
    {
      this.pageNum = 1;
      this.presentList = new r;
      this.template = g.template(q);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(f.getPageJson()));
      return this
    },
    createDom: function()
    {
      var b = this,
        c = f.getPageJson();
      a.content.append(this.render().el);
      n.parentView = this;
      var d = new m(
      {
        count: c.presentCount,
        pageLimit: 50
      });
      this.pagingView = new n(
      {
        model: d
      });
      this.presentCnt = c.presentCount;
      this.presentCntUpdate(c.presentCount);
      h.prototype.parentView = this;
      h.prototype.template = g.template($("#presentParts").text());
      if (c.presentList && 0 < c.presentList.length)
      {
        var k = a.doc.createDocumentFragment();
        g.each(c.presentList, function(a, c)
        {
          a = new m(a);
          b.presentList.add(a);
          a = new h(
          {
            model: a
          });
          k.appendChild(a.render().el)
        });
        a.doc.getElementById("presentInner").appendChild(k)
      }
      else c = a.doc.createElement("div"), c.className = "presentNoItem ts_white", c.innerText = "現在受取ることのできるプレゼントがありません", a.doc.getElementById("presentInner").innerHTML = "", a.doc.getElementById("presentInner").appendChild(c);
      0 === this.presentCnt && a.addClass(a.doc.querySelector(".receiveBtn"), "off");
      e.getBaseData(a.getNativeObj());
      a.scrollSet("presentScrollWrap", "presentScrollInner");
      p.create();
      a.ready.hide()
    },
    presentCntUpdate: function(b)
    {
      this.presentCnt = b;
      a.doc.getElementById("presentCnt").innerText = this.presentCnt
    },
    receiveFunc: function(b)
    {
      a.androidKeyStop = !0;
      var c = this;
      f.ajaxPost(a.linkList.receivePresent, b, function(b)
      {
        a.responseSetStorage(b);
        var k = c.presentCnt,
          d = function()
          {
            new a.PopupClass(
            {
              popupId: "successPopup",
              content: "プレゼントを" + k + "件受け取りました",
              popupType: "typeC",
              closeBtnText: "閉じる"
            });
            c.presentListUpdate(1, !0)
          };
        b.gachaAnimation && !window.isBrowser ? ($("#commandDiv").on("nativeCallback", function()
        {
          $("#commandDiv").off();
          e.startBgm(a.settingBgm);
          setTimeout(function()
          {
            e.setWebView(!0);
            a.androidKeyStop = !1;
            a.ready.target.className = "readyFadeOut";
            e.changeBg("web_common.ExportJson");
            d()
          }, 500)
        }), $(a.ready.target).on("webkitAnimationEnd", function()
        {
          e.stopBgm();
          e.changeBg("web_black.jpg");
          $(a.ready.target).off();
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          setTimeout(function()
          {
            e.setWebView(!1);
            e.startPresentAnimation(
            {
              gachaAnimation: b.gachaAnimation
            })
          }, 500)
        }), a.addClass(a.ready.target, "preNativeFadeIn")) : (a.androidKeyStop = !1, d())
      })
    },
    presentListUpdate: function(b, c)
    {
      var d = this;
      if (c)
      {
        if (1 === b)
        {
          d.presentCnt = 0;
          d.presentCntUpdate(0);
          d.pagingView.model.set(
          {
            count: 0,
            pageLimit: 50
          });
          a.addClass(a.doc.querySelector(".receiveBtn"), "off");
          b = a.doc.createElement("div");
          b.className = "presentNoItem ts_white";
          b.innerText = "現在受取ることのできるプレゼントがありません";
          a.doc.getElementById("presentInner").innerHTML = "";
          a.doc.getElementById("presentInner").appendChild(b);
          return
        }
        b = 0 < b - 1 ? b - 1 : 1
      }
      f.ajaxPost(a.linkList.presentListPage,
      {
        page: String(b)
      }, function(b)
      {
        d.pagingView.model.set(
        {
          count: b.presentCount,
          pageLimit: 50
        });
        d.presentCnt = b.presentCount;
        d.presentCntUpdate(b.presentCount);
        d.trigger("removeChildView");
        d.presentList.reset();
        if (b.presentList && 0 < b.presentList.length)
        {
          var c = a.doc.createDocumentFragment();
          g.each(b.presentList, function(a, b)
          {
            a = new m(a);
            d.presentList.add(a);
            a = new h(
            {
              model: a
            });
            c.appendChild(a.render().el)
          });
          a.doc.getElementById("presentInner").appendChild(c);
          e.getBaseData(a.getNativeObj())
        }
        else
        {
          var f = a.doc.createElement("div");
          f.className = "presentNoItem ts_white";
          f.innerText = "現在受取ることのできるプレゼントがありません";
          a.doc.getElementById("presentInner").innerHTML = "";
          a.doc.getElementById("presentInner").appendChild(f)
        }
        a.scrollRefresh();
        0 === b.presentCount && a.addClass(a.doc.querySelector(".receiveBtn"), "off")
      })
    },
    receivePresent: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = {};
        switch (b.target.getAttribute("data-receive-type"))
        {
          case "ALL":
            c.receiveType = "ALL"
        }
        this.receiveFunc(c)
      }
    },
    removeHandler: function()
    {
      this.off();
      this.remove();
      p.remove()
    }
  })
});
