define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaTop.html text!css/chara/CharaTop.css text!css/chara/CharaCommon.css cardUtil CharaCommon".split(" "), function(q, r, b, h, d, t, u, v, w, c)
{
  var e, f, k, l = null,
    g, x = r.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti] = this.touch;
        a[b.cgti + " #leaderChangeBtn"] = this.confCharaChange;
        a[b.cgti + " #helperChangeBtn"] = this.confCharaChange;
        a[b.cgti + " #poseChangeBtn"] = this.standPoseChange;
        a[b.cgti + " .miniCharaWrap"] = this.miniCharaMotion;
        a[b.cgti + " .enhanceLink"] = this.enhanceLink;
        return a
      },
      miniCharaMotion: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = {}, a.id = String(c.charaDataView.model.toJSON().card.miniCharaNo), a.x = 1024 === b.displayWidth ? 400 : 440, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135, a.fade = .3, a.animeList = ["reaction", b.miniCharaStandPose], d.showMiniChara(a))
      },
      enhanceLink: function(a)
      {
        a.preventDefault();
        a.stopPropagation();
        b.isScrolled() || (location.href = "#/CharaEnhancementTree/" + c.charaDataView.model.toJSON().userCardId)
      },
      standPoseChange: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (d.startSe(1008), a = "wait" == b.miniCharaStandPose ? "stance" : "wait", localStorage.setItem("miniCharaStandPose", a), b.miniCharaStandPose = a, a = {}, a.id = String(c.charaDataView.model.toJSON().card.miniCharaNo), a.x = 1024 === b.displayWidth ? 400 : 440, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135, a.fade = .3, a.animeList = [b.miniCharaStandPose], d.showMiniChara(a))
      },
      initialize: function(a)
      {
        this.template = q.template(t);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(h.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.content.prepend(this.render().el);
        this.createView()
      },
      createView: function()
      {
        w.createCardList();
        b.setGlobalView();
        b.firstNaviCheck(e);
        b.tapBlock(!1);
        b.ready.hide()
      },
      confCharaChange: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = a.currentTarget.getAttribute("data-type");
          var d = "";
          "changeLeader" == a && (d = "お気に入り");
          var e = c.charaDataView.model.toJSON(),
            g = e.card.cardName,
            f = {};
          f.userCardId = e.userCardId;
          h.ajaxPost(b.linkList[a], f, function(a)
          {
            b.responseSetStorage(a);
            n(e);
            new b.PopupClass(
            {
              title: "変更完了",
              content: g + "を" + d + "に設定しました。",
              closeBtnText: "閉じる"
            })
          })
        }
      },
      touch: function(a)
      {
        a.preventDefault();
        b.isScrolled()
      }
    }),
    n = function(a)
    {
      var c = b.doc.querySelector("#leaderChangeBtn");
      b.storage.gameUser.toJSON().leaderId == a.userCardId ? b.addClass(c, "off") : b.removeClass(c, "off")
    },
    m = "",
    p = function(a)
    {
      a = a.attributeId.toLowerCase();
      m && $(".composeAttribute").removeClass(m);
      $(".composeAttribute").addClass(a);
      m = a
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
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
      id: "userDeckList"
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
      id: "userPatrolList"
    }],
    charaSelect: function(a)
    {
      c.charaSelect(a);
      n(a.model.toJSON());
      c.showMiniChara(a.model.toJSON().card.miniCharaNo);
      p(
      {
        attributeId: a.model.attributes.chara.attributeId
      })
    },
    fetch: function(a)
    {
      l = a ? a : null;
      h.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.questBattleModel = null;
      e = h.getPageJson();
      b.setStyle(u + v);
      g = new x;
      c.charaViewInit(l);
      k = f = 1;
      if (e.campaignList)
      {
        var a = b.campaignParse(e.campaignList);
        a.POINT_UP && a.POINT_UP.CARD_COMPOSE && (a.POINT_UP.CARD_COMPOSE.EXCELLENT || a.POINT_UP.CARD_COMPOSE.GREAT) && (f = a.POINT_UP.CARD_COMPOSE.EXCELLENT || 1, k = a.POINT_UP.CARD_COMPOSE.GREAT || 1)
      }
      1 === f && 1 === k || b.addClass(b.doc.querySelector("#btnArea"), "campaignIcon");
      a = c.charaDataView.model.toJSON().card.miniCharaNo;
      c.showMiniChara(a);
      p(
      {
        attributeId: c.charaDataView.model.attributes.chara.attributeId
      });
      b.tapBlock(!1)
    },
    startCommand: function()
    {
      d.changeBg("web_common.ExportJson");
      d.startBgm(b.settingBgm)
    },
    remove: function(a)
    {
      g && (l = null, c.charaViewRemove(), g.trigger("remove"), g.remove());
      a()
    },
    charaCommon: function()
    {
      return c
    }
  }
});
