define("underscore backbone backboneCommon ajaxControl command text!template/formation/ProfileFormationSupport.html text!css/formation/DeckFormation.css cardUtil memoriaUtil js/view/chara/CharaListView js/card/CardPopup js/memoria/MemoriaPopup QuestUtil".split(" "), function(g, p, a, q, k, x, y, z, A, F, r, t, G)
{
  var B = p.Model.extend(),
    m = [],
    u = null,
    n, C = p.View.extend(
    {
      initialize: function(a)
      {
        this.template = g.template(x);
        this.createDom()
      },
      render: function()
      {
        var a = q.getPageJson();
        this.$el.html(this.template(a));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        v.prototype.parentView = this;
        v.prototype.template = g.template($("#DeckViewTemp").text());
        var b = a.doc.createDocumentFragment(),
          c = w(a.supportCheckModel.userDeck);
        console.log("createView", c);
        u = new v(
        {
          model: new B(c)
        });
        b.appendChild(u.render().el);
        a.doc.querySelector("#DeckFormation").appendChild(b);
        a.questBattleModel && (a.addClass(a.doc.querySelector(".attBox"), "enemyDetail"), g.each(a.questBattleModel.questBattle.waveEnemyAttributeIdList, function(b)
        {
          b = b.toLowerCase();
          a.addClass(a.doc.querySelector(".enemyDetail ." + b), "on")
        }));
        k.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " #pieceEquipBtn"] = this.pieceEquipMode;
        b[a.cgti + " #dispModeChangeBtn"] = this.dispModeChange;
        return b
      },
      pieceEquipMode: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.doc.querySelector(".deckViewWrap").classList.contains("memoriaEquipMode") ? (a.removeClass(a.doc.querySelector(".deckViewWrap"), "memoriaEquipMode"), a.removeClass(a.doc.querySelector("#pieceEquipBtn"), "on")) : (a.addClass(a.doc.querySelector(".deckViewWrap"), "memoriaEquipMode"), a.addClass(a.doc.querySelector("#pieceEquipBtn"), "on")))
      },
      dispModeChange: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b = a.doc.querySelector(".deckViewWrap"), b.classList.contains("memoriaEquipMode") ? a.removeClass(b, "memoriaEquipMode") : b.classList.contains("charaStatusMode") ? (a.removeClass(b, "charaStatusMode"), a.addClass(b, "diskMode")) : b.classList.contains("diskMode") ? (a.removeClass(b, "diskMode"), a.addClass(b, "skillMode")) : b.classList.contains("skillMode") && (a.removeClass(b, "skillMode"), a.addClass(b, "charaStatusMode")))
      }
    }),
    v = p.View.extend(
    {
      className: function()
      {
        return "deckViewWrap charaStatusMode"
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON(),
          img: a.imgData
        }));
        return this
      },
      events: function()
      {
        var b = {};
        b["touchstart .tapArea"] = this.popupTimeStart;
        b["touchstart .memoriaSkillWrap"] = this.popupTimeStart;
        b["touchstart .memoriaWrap .equiped"] = this.memoriaPopupTimeStart;
        b[a.cgti + " .tapArea"] = this.popupTimeStop;
        b[a.cgti + " .memoriaSkillWrap"] = this.popupTimeStop;
        b[a.cgti + " .memoriaWrap .equiped"] = this.memoriaPopupTimeStop;
        return b
      },
      popupTimeStart: function(b)
      {
        var c = this.model.toJSON(),
          d = c.userCardObj["place" + b.currentTarget.parentNode.dataset.posindex];
        if (d && d.card)
        {
          var f = this;
          b.currentTarget.classList.contains("memoriaSkillWrap") && (d.initTabType = "memoria");
          a.holdDeck && (d.linkBlock = !0);
          d.deckFormationFlag = !0;
          r.cardDetailPopup(b, d, function()
          {
            if (a.storage.userCardListEx)
            {
              var b = w(c);
              f.model.clear(
              {
                silent: !0
              });
              f.model.set(b);
              k.getBaseData(a.getNativeObj())
            }
            f.selectModel = null;
            f.selectPos = null;
            a.removeClass(a.doc.querySelector("#charaListWrap"), "open")
          })
        }
      },
      popupTimeStop: function(a)
      {
        r.popupTimerStop()
      },
      memoriaPopupTimeStart: function(b)
      {
        var c = this.model.toJSON().userPieceObj["place" + b.currentTarget.parentNode.parentNode.dataset.posindex][b.currentTarget.dataset.pieceindex - 1];
        !a.tutorialId && c && (c.supportFlag = !0, c.btnHide = !0, t.cardDetailPopup(b, c))
      },
      memoriaPopupTimeStop: function(a)
      {
        t.popupTimerStop()
      },
      removeView: function()
      {
        console.log("DeckView:removeView:");
        this.off();
        this.remove();
        u = null
      }
    }),
    E = function()
    {
      var b = a.supportCheckModel.userCardList,
        c = a.supportCheckModel.userCharaList,
        d = a.supportCheckModel.userPieceList,
        f = a.supportCheckModel.userDoppelList,
        D = a.supportCheckModel.userDeck,
        e = a.supportCheckModel.userStatusList;
      m = [];
      g.each(b, function(b)
      {
        var l = {};
        g.each(c, function(c)
        {
          b.id == c.userCardId && (b.supportFlag = !0, l = z.addExStatus($.extend(b, c), d, f, D), e && (l.userStatusList = e, l.composeAttribute = a.getTargetComposeAttribute(
          {
            attributeId: c.chara.attributeId,
            userStatusList: e
          })))
        });
        m.push(l)
      })
    },
    w = function(b)
    {
      var c = g.clone(b);
      c.posArr = "123456".split("");
      var d = {};
      g.each(c.posArr, function(a, b)
      {
        a = "userCardId" + (b + 1);
        c[a] && (a = g.findWhere(m,
        {
          id: c[a]
        }), d["place" + c["questPositionId" + (b + 1)]] = a)
      });
      c.userCardObj = d;
      var f = {};
      g.each(c.posArr, function(d, e)
      {
        if (b["questPositionId" + (e + 1)])
        {
          d = "place" + b["questPositionId" + (e + 1)];
          var k = "userPieceId" + ("00" + (e + 1)).slice(-2),
            l = (e = c.userCardObj[d]) ? e.revision + 1 : 0;
          for (e = 0; 4 > e;)
          {
            var h = k + (e + 1);
            c[h] ? (0 == d in f && (f[d] = []), h = g.findWhere(a.supportCheckModel.userPieceList,
            {
              id: c[h]
            }), h.maxLevel = A.getMaxLevel(h.piece.rank, h.lbCount), f[d][e] = h) : l--;
            e = e + 1 | 0
          }
        }
      });
      c.userPieceObj = f;
      return c
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
      id: "userStatusList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaList"
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
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      q.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.supportCheckModel ? (E(), q.getPageJson(), a.setStyle(y), n = new C, k.getBaseData(a.getNativeObj())) : location.href = "#/FollowTop"
    },
    startCommand: function()
    {
      k.changeBg("web_0013.ExportJson")
    },
    remove: function(b)
    {
      n && (a.removeBackHandler(), r.popupTimerStop(), t.popupTimerStop(), "FollowTop" !== a.location && a.followSave && (a.followSave = null), n.trigger("removeView"), n.remove());
      m = [];
      b()
    }
  }
});
