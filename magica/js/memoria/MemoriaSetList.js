define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaSetList.html text!css/memoria/MemoriaSetList.css memoriaUtil cardUtil js/memoria/MemoriaPopup".split(" "), function(h, m, a, k, q, t, u, v, w, n)
{
  var x = m.Model.extend(
    {}),
    r, l, y = m.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .hoge"] = this.hoge;
        return b
      },
      initialize: function(a)
      {
        this.template = h.template(t);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(k.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        this.setListCreate();
        a.scrollSet("scrollOuter", "scrollInner");
        a.firstNaviCheck(r);
        a.ready.hide()
      },
      hoge: function(b)
      {
        b.preventDefault();
        a.isScrolled()
      },
      setListCreate: function()
      {
        p.prototype.parentView = this;
        p.prototype.template = h.template($("#memoriaSetListTemp").text());
        for (var b = a.storage.userPieceSetList.toJSON(), f = a.doc.createDocumentFragment(), d = 0; 20 > d;)
        {
          var g = b.filter(function(a)
            {
              return a.setNum == d + 1
            })[0] ||
            {
              setNum: d + 1,
              name: "メモリアセット" + (d + 1)
            },
            c = {
              name: g.name,
              setNum: g.setNum,
              setNumDisp: ("00" + g.setNum).slice(-2),
              pieceArr: [],
              hp: 0,
              attack: 0,
              defense: 0
            };
          c.name && "" != c.name || (c.name = "メモリアセット" + c.setNum);
          h.each(g, function(b, e)
          {
            -1 !== e.indexOf("userPieceId") && (e = Number(e.split("userPieceId")[1]) - 1, c.pieceArr[e] = a.storage.userPieceList.findWhere(
            {
              id: b
            }).toJSON(), c.pieceArr[e] && (c.pieceArr[e].maxLevel = v.getMaxLevel(c.pieceArr[e].piece.rank, c.pieceArr[e].lbCount), c.hp += c.pieceArr[e].hp, c.attack += c.pieceArr[e].attack, c.defense += c.pieceArr[e].defense))
          });
          g = new p(
          {
            model: new x(c)
          });
          f.appendChild(g.render().el);
          d = d + 1 | 0
        }
        a.doc.querySelector("#scrollInner").appendChild(f);
        q.getBaseData(a.getNativeObj())
      }
    }),
    p = m.View.extend(
    {
      className: "setWrap commonFrame3",
      events: function()
      {
        var b = {};
        b["touchstart .equip"] = this.popupTimeStart;
        b[a.cgti + " .equip"] = this.popupTimeStop;
        b[a.cgti + " .memoriaSetBtn"] = this.pieceEquip;
        b[a.cgti + " .nameChangeBtn"] = this.nameChange;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      popupTimeStart: function(b)
      {
        var f = this.model.toJSON().pieceArr[b.currentTarget.dataset.framenum];
        f && (f = a.storage.userPieceList.findWhere(
        {
          id: f.id
        }).toJSON(), n.cardDetailPopup(b, f))
      },
      popupTimeStop: function(a)
      {
        n.popupTimerStop()
      },
      pieceEquip: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b = this.model.toJSON(), a.equipInfo = {
          pieceSetFlag: !0,
          setNum: b.setNum,
          setNumDisp: b.setNumDisp,
          charaName: b.name,
          charaId: null,
          charaAtt: null,
          posIndex: 0,
          pieceIndex: 0,
          pieceArr: b.pieceArr,
          allPiece:
          {},
          revision: 4
        }, h.each(a.equipInfo.pieceArr, function(b, d)
        {
          b && b.id && (a.equipInfo.allPiece[b.id] = !0)
        }), console.log(), location.href = "#/MemoriaEquip")
      },
      nameChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var f = this;
          b = $("#SetNameChangeTemp").text();
          var d = this.model.toJSON();
          d.exClass = "setNameChangePop";
          var g = new a.PopupClass(d, b, function()
          {
            a.nativeKeyBoard("commentInput", 15, null, "textCount");
            a.doc.getElementById("commentDecide").addEventListener(a.cgti, function(b)
            {
              b.preventDefault();
              if (!a.isScrolled())
              {
                a.tapBlock(!0);
                var c = {
                  setNum: d.setNum,
                  name: a.doc.getElementById("commentInput").value,
                  userPieceIdList: []
                };
                h.each(d.pieceArr, function(a)
                {
                  a && a.id && c.userPieceIdList.push(a.id)
                });
                k.ajaxPost(a.linkList.userPieceSetSave, c, function(b)
                {
                  a.responseSetStorage(b);
                  f.model.set(
                  {
                    name: a.doc.getElementById("commentInput").value
                  });
                  q.getBaseData(a.getNativeObj());
                  g.remove();
                  a.tapBlock(!1)
                })
              }
            });
            a.doc.getElementById("defaultNameBtn").addEventListener(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (a.doc.getElementById("commentInput").value = "メモリアセット" + d.setNum, a.doc.getElementById("textCount").textContent = String("メモリアセット" + d.setNum).length)
            })
          })
        }
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
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
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
      id: "userPieceArchiveList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      k.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      w.createCardList();
      a.setStyle(u);
      r = k.getPageJson();
      l = new y
    },
    startCommand: function() {},
    removeCommand: function() {},
    remove: function(a)
    {
      n.popupTimerStop();
      l && (l.trigger("remove"), l.remove());
      a()
    }
  }
});
