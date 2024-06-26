define("underscore backbone backboneCommon ajaxControl command text!template/user/BackgroundSet.html text!css/user/BackgroundSet.css cardUtil".split(" "), function(l, n, b, g, d, p, q, r)
{
  var h, e, m, f, k, t = n.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .bgItem"] = this.bgSelect;
        a[b.cgti + " #mainBtn"] = this.setBackground;
        return a
      },
      initialize: function(a)
      {
        this.bgId = null;
        this.template = l.template(p);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(f));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        h ? l.each(b.doc.querySelectorAll(".bgItem"), function(a, c)
        {
          console.log(a.dataset.bgid);
          h == a.dataset.bgid && (b.addClass(a, "current"), this.bgId = a.dataset.bgid ? a.dataset.bgid : null, this.bgName = a.textContent)
        }, this) : (b.addClass(b.doc.querySelector("#defaultBg"), "current"), this.bgId = null, this.bgName = b.doc.querySelector("#defaultBg").textContent);
        b.ready.hide()
      },
      bgSelect: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.removeClass(b.doc.querySelector(".current"), "current"), a = a.currentTarget, b.addClass(a, "current"), this.bgId = a.dataset.bgid ? a.dataset.bgid : null, this.bgName = a.textContent, console.log(a.dataset.bgid), a.dataset.bgimage ? (d.changeBg(a.dataset.bgimage), d.startBgm(a.dataset.bgm)) : (d.changeBg("web_0011.ExportJson"), d.startBgm("bgm01_anime07")))
      },
      setBackground: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this;
          g.ajaxPost(b.linkList.setBackground,
          {
            itemId: this.bgId
          }, function(a)
          {
            b.responseSetStorage(a);
            new b.PopupClass(
            {
              title: "変更完了",
              popupId: "bgChangePop",
              content: c.bgName + "を<br>ホーム背景に設定しました。",
              decideBtnText: "マイページへ",
              canClose: !1
            }, null, function()
            {
              $("#bgChangePop .decideBtn").on(b.cgti, function(a)
              {
                $("#bgChangePop .decideBtn").off();
                location.href = "#/MyPage"
              })
            })
          })
        }
      }
    }),
    v = function()
    {
      b.setStyle(q);
      f = g.getPageJson();
      f.backgroundList = f.userItemList.filter(function(a, b)
      {
        if ("BACKGROUND" == a.item.itemType) return !0
      });
      f.backgroundList.sort(function(a, b)
      {
        a = a.item.sortKey;
        b = b.item.sortKey;
        return a < b ? -1 : a > b ? 1 : 0
      });
      k = new t;
      r.createCardList();
      e = b.storage.userCardListEx.findWhere(
      {
        id: f.gameUser.leaderId
      }).toJSON();
      u();
      b.scrollSet("scrollOuter", "scrollInner")
    },
    u = function()
    {
      m = e.charaId + e.live2dId;
      var a = !1;
      e.chara.doubleUnitFlg && "00" === e.live2dId && (a = !0);
      var c = {};
      c.id = String(m);
      c.x = a ? 460 : 350;
      c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
      c.type = 1;
      c.key = "idle";
      a && (c.subId = e.chara.doubleUnitLive2dDetail, c.subX = -40, c.subY = 0);
      d.startL2d(c)
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
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
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
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userLive2dList"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      v()
    },
    startCommand: function()
    {
      (h = g.getPageJson().gameUser.bgItemId) ? l.each(g.getPageJson().userItemList, function(a, b)
      {
        h == a.itemId && d.changeBg(a.item.backgroundImage)
      }): d.changeBg("web_0011.ExportJson");
      d.startBgm(b.settingBgm)
    },
    removeCommand: function()
    {
      d.endL2d()
    },
    remove: function(a)
    {
      k && (k.trigger("remove"), k.remove());
      a()
    }
  }
});
