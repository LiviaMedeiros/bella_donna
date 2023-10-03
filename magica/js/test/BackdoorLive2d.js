define("underscore backbone backboneCommon ajaxControl command text!template/test/BackdoorLive2d.html text!css/test/BackdoorLive2d.css js/view/chara/CharaListView cardUtil".split(" "), function(k, g, b, l, f, q, r, t, u)
{
  var m = g.Model.extend(),
    c, v = g.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .voiceBtn"] = this.voiceStart;
        a[b.cgti + " #charaListShow"] = this.charaListShow;
        return a
      },
      initialize: function(a)
      {
        this.prm = {};
        this.template = k.template(q);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(l.getPageJson()));
        return this
      },
      charaListShow: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.removeClass(b.doc.querySelector("#charaListWrap"), "hide")
      },
      voiceStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          b.addClass(b.doc.querySelector("#charaListWrap"), "hide");
          var e = c.prm.charaId,
            h = c.prm.live2dId;
          a = "vo_char_" + e + "_" + c.prm.voicePrefixNo + "_" + a.currentTarget.dataset.voice;
          f.stopVoice();
          var d = {};
          d.id = String(e + h);
          d.voice = a;
          c.prm.doubleUnit && "00" === c.prm.live2dId && (d.subId = c.prm.subId, d.subX = -60, d.subY = 0);
          f.storyMotionL2dVoice(d)
        }
      },
      createDom: function()
      {
        b.setGlobalView();
        u.createCardList();
        b.content.append(this.render().el);
        n.prototype.parentView = this;
        this.live2dListView = new n(
        {
          model: new m
        });
        var a = b.doc.createDocumentFragment();
        a.appendChild(this.live2dListView.render().el);
        b.doc.querySelector("#backdoorLive2dList").appendChild(a);
        b.ready.hide()
      }
    }),
    n = g.View.extend(
    {
      tagName: "ul",
      events: function()
      {
        var a = {};
        a[b.cgti + " .live2dChangeBtn"] = this.live2dChange;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.model, "change", this.render);
        this.template = k.template($("#Live2dList").text())
      },
      live2dChange: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = a.currentTarget, a.classList.contains("selected") || (b.removeClass(b.doc.querySelector("#backdoorLive2dList ul .selected"), "selected"), b.addClass(a, "selected"), a = a.dataset, this.parentView.prm.live2dId = a.live2did, this.parentView.prm.voicePrefixNo = a.voiceprefixno, p(this.parentView.prm.charaId, null, this.parentView.prm.live2dId, this.parentView.prm.voiceprefixno, !0)))
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      }
    }),
    p = function(a, e, h, d, g)
    {
      d = {};
      d.id = String(a + (h || "00"));
      d.x = !c.prm.doubleUnit || h && "00" !== h ? 250 : 360;
      d.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
      if (e) d.voice = e, d.key = e, f.storyMotionL2dVoice(d);
      else if (!g || !e && c.prm.doubleUnit) d.type = 1, d.key = "idle", c.prm.doubleUnit && "00" === c.prm.live2dId && (d.subId = c.prm.subId, d.subX = -60, d.subY = 0), f.endL2d(), f.startL2d(d);
      g && (d.key = "metamorphose", f.storyMotionL2d(d))
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
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userPieceList"
    }],
    fetch: function()
    {
      l.pageModelGet(this.needModelIdObj)
    },
    charaSelect: function(a)
    {
      if (c)
      {
        $("#charaListElms .select").removeClass("select");
        b.addClass(a.el, "select");
        a = a.model.toJSON();
        var e = a.charaId;
        c.prm.charaId = e;
        c.prm.live2dId = a.live2dList[0].live2dId;
        c.prm.voicePrefixNo = a.live2dList[0].voicePrefixNo;
        c.prm.doubleUnit = a.chara.doubleUnitFlg ? !0 : !1;
        a.chara.doubleUnitFlg && "00" === c.prm.live2dId && (c.prm.subId = a.chara.doubleUnitLive2dDetail);
        c.live2dListView.model.clear(
        {
          silent: !0
        });
        c.live2dListView.model.set(a);
        p(e)
      }
    },
    init: function()
    {
      b.setStyle(r);
      c = new v;
      c.charaListView = new t(
      {
        model: new m,
        collection: b.storage.userCardListEx
      });
      b.content.append(c.charaListView.render().el);
      c.charaListView.cardSort.sortStart();
      f.getBaseData(b.getNativeObj());
      b.scrollSet("backdoorListWrap", "backdoorList");
      b.scrollSetX("charaListScrollWrap", "list")
    },
    remove: function(a)
    {
      c.charaListView.removeView();
      c.remove();
      a()
    }
  }
});
