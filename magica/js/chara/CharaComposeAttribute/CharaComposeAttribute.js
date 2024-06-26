define("underscore backbone backboneCommon ajaxControl command js/chara/CharaComposeAttribute/ComposeAttributeListModel text!template/chara/CharaComposeAttribute/CharaComposeAttribute.html text!css/chara/CharaComposeAttribute.css text!css/chara/CharaCommon.css cardUtil CharaCommon js/chara/CharaComposeAttribute/ComposeAttributeList js/chara/CharaComposeAttribute/ComposeAttributeResult js/chara/CharaComposeAttribute/ComposeAttributeBulkResult".split(" "), function(h, v, b, w, l, m, C, D, E, F, d, n, G, H)
{
  var g = null;
  v.Model.extend();
  var x, p, q, r, f, I = v.View.extend(
    {
      events: function()
      {
        return {}
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      initialize: function(a)
      {
        this.template = h.template(C);
        b.content.prepend(this.render().el)
      }
    }),
    y = function()
    {
      return f
    },
    z = function(a)
    {
      var c = a.composeItem,
        e = a.convertType,
        f = a.beforeComposeAttribute,
        J = a.attribute,
        k = a.$_selectedElm.parent().find(".effectWrap"),
        g = 0;
      setTimeout(function()
      {
        k.addClass("anim")
      }, 50);
      k.on("animationend", function()
      {
        g++;
        2 > g || h()
      });
      var h = function()
      {
        d.playComposeAttributeEffect(e, c.composeQuantity);
        setTimeout(function()
        {
          var a = b.getTargetComposeAttribute(
            {
              attributeId: c.attributeId
            }),
            a = new G(
            {
              model:
              {
                diffQuantity: c.composeQuantity,
                attributeId: c.attributeId,
                composeType: c.composeType,
                convertType: e,
                quantityAll:
                {
                  before: f.composed[c.composeType],
                  after: a.composed[c.composeType]
                },
                attribute: J
              }
            });
          $("#overlapContainer").append(a.render().el);
          t(
          {});
          l.getBaseData(b.getNativeObj());
          u(
          {});
          b.tapBlock(!1)
        }, 1400)
      }
    },
    A = function(a)
    {
      var c = a.composeItem,
        e = 0;
      h.each(c.canComposeIdList, function(a, b, d)
      {
        var k = $(".id_" + a).parent().find(".effectWrap");
        setTimeout(function()
        {
          k.addClass("anim")
        }, 50);
        k.on("animationend", function()
        {
          e++;
          e >= 2 * c.canComposeIdList.length && f()
        })
      });
      var f = function()
      {
        var a = [];
        h.each(c, function(b, c, e)
        {
          b.quantity && 0 < b.quantity && a.push(
          {
            type: b.type,
            value: b.quantity
          })
        });
        d.playComposeAttributeBulkEffect(a);
        setTimeout(function()
        {
          var a = new H(
          {
            model: K(
            {
              afterInfo: b.getTargetComposeAttribute(
              {
                attributeId: c.attributeId
              }),
              itemInfo: c
            })
          });
          $("#overlapContainer").append(a.render().el);
          t(
          {});
          l.getBaseData(b.getNativeObj());
          u(
          {});
          b.tapBlock(!1)
        }, 1600)
      }
    },
    u = function(a)
    {
      p = m.getListModel(
      {
        selectCharaInfo: f
      });
      q = m.getAllNeedItemList(
      {
        selectCharaInfo: f
      });
      n.remove();
      n.init(
      {
        listJson: p,
        needItemHaveList: q,
        getSelectCharaInfo: y,
        setCharaResultView: z,
        setCharaResultBulkView: A
      })
    },
    K = function(a)
    {
      var b = a.afterInfo;
      a = a.itemInfo;
      var e = {
          attribute: a.attribute,
          dispStatusList:
          {
            HP:
            {
              convertType: "HP",
              diffQuantity: 0,
              beforeQuantity: 0,
              afterQuantity: 0,
              secClass: "none"
            },
            ATTACK:
            {
              convertType: "ATK",
              diffQuantity: 0,
              beforeQuantity: 0,
              afterQuantity: 0,
              secClass: "none"
            },
            DEFENSE:
            {
              convertType: "DEF",
              diffQuantity: 0,
              beforeQuantity: 0,
              afterQuantity: 0,
              secClass: "none"
            }
          }
        },
        d = 0;
      h.each(a, function(a, c, f)
      {
        a.quantity && (d++, e.dispStatusList[c].diffQuantity = a.quantity, e.dispStatusList[c].afterQuantity = b.composed[c], e.dispStatusList[c].beforeQuantity = Number(b.composed[c]) - Number(a.quantity), e.dispStatusList[c].secClass = "", 0 > e.dispStatusList[c].beforeQuantity && (d--, e.dispStatusList[c].secClass = "none"))
      });
      e.dispCountClass = "statusNo" + d;
      return e
    },
    t = function(a)
    {
      d.charaListView && (d.charaListView.removeView(), d.charaListView = null);
      F.createCardList();
      var c;
      h.map(b.storage.userCardListEx.models, function(a, b)
      {
        a.attributes.card.charaNo == g && (c = a.attributes.userCardId)
      });
      c || h.map(b.storage.userCardListEx.models, function(a, b)
      {
        1001 == a.attributes.card.charaNo && (c = a.attributes.userCardId)
      });
      d.charaViewInit(c);
      a = b.scrollArrX.charaListScrollWraplist.setScroll;
      a(
      {
        scrollCountX: b.lastScrollCountX
      })
    },
    B = function(a)
    {
      b.historyArr = ["MyPage", "CharaListTop/" + f.id, "CharaListComposeAttribute/" + g]
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
      id: "itemList"
    },
    {
      id: "userItemList"
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
      id: "userCharaEnhancementCellList"
    },
    {
      id: "atbEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
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
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
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
      d.charaSelect(a);
      var b = d.charaDataView.model.toJSON().card.miniCharaNo;
      d.showMiniChara(b);
      f = a.model.attributes;
      a = f.card.charaNo;
      a != g && (u(
      {}), g = a);
      B(
      {})
    },
    fetch: function(a)
    {
      g = a ? a : null;
      w.pageModelGet(this.needModelIdObj, null,
      {})
    },
    init: function()
    {
      if (!g)
        if (d.charaListView && d.charaListView.charaViews) g = d.charaListView.charaDataView.model.toJSON().card.charaNo;
        else
        {
          location.href = "#/CharaListTop";
          return
        } b.setStyle(D + E);
      x = w.getPageJson();
      r = new I;
      t(
      {});
      f = d.charaListView.charaViews[d.charaListView.selectCardId].model.attributes;
      p = m.getListModel(
      {
        selectCharaInfo: f
      });
      q = m.getAllNeedItemList(
      {
        selectCharaInfo: f
      });
      n.init(
      {
        listJson: p,
        needItemHaveList: q,
        getSelectCharaInfo: y,
        setCharaResultView: z,
        setCharaResultBulkView: A
      });
      var a = d.charaDataView.model.toJSON().card.miniCharaNo;
      d.showMiniChara(a);
      b.setGlobalView();
      b.addClass(b.doc.querySelector("#richeWrap"), "hide");
      b.firstNaviCheck(x);
      B(
      {});
      b.tapBlock(!1);
      b.ready.hide()
    },
    startCommand: function()
    {
      l.changeBg("web_common.ExportJson");
      l.startBgm(b.settingBgm)
    },
    remove: function(a)
    {
      b.removeClass(b.doc.querySelector("#richeWrap"), "hide");
      d.charaViewRemove();
      r && r.remove();
      n.remove();
      a()
    },
    charaCommon: function()
    {
      return d
    }
  }
});
