define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaSetEquip.html text!css/memoria/MemoriaSetEquip.css memoriaUtil cardUtil js/memoria/MemoriaPopup".split(" "), function(k, q, b, m, r, y, z, u, A, p)
{
  var v = q.Model.extend(
  {});
  b.rentalSetFlag = !1;
  var x, t, B = q.View.extend(
    {
      initialize: function(b)
      {
        this.template = k.template(y);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(m.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        this.isRegularEventDeck = !1;
        b.holdDeck && (this.isRegularEventDeck = -1 < ["extermination", "exterminationCopy"].indexOf(b.holdDeck.deckCatType));
        var a = $.extend(!0,
        {}, b.equipInfo);
        a.isRegularEventDeck = this.isRegularEventDeck;
        w.prototype.parentView = this;
        w.prototype.template = k.template($("#EquipDetail").text());
        var c = b.doc.createDocumentFragment();
        this.equipDetailView = new w(
        {
          model: new v(a)
        });
        c.appendChild(this.equipDetailView.render().el);
        b.doc.querySelector("#MemoriaSetEquip").appendChild(c);
        b.rentalPieceData && b.rentalPieceData.rentalPieceSetList && this.rentalSetListCreate();
        this.setListCreate();
        b.scrollSet("scrollOuter", "scrollInner");
        b.firstNaviCheck(x);
        b.ready.hide()
      },
      setListCreate: function()
      {
        n.prototype.parentView = this;
        n.prototype.template = k.template($("#memoriaSetListTemp").text());
        for (var a = b.storage.userPieceSetList.toJSON(), c = b.doc.createDocumentFragment(), f = b.storage.userCardListEx.findWhere(
          {
            charaId: b.equipInfo.charaId
          }).toJSON(), e = 0; 20 > e;)
        {
          var l = a.filter(function(b)
            {
              return b.setNum == e + 1
            })[0] ||
            {
              setNum: e + 1,
              name: "メモリアセット" + (e + 1)
            },
            d = {
              name: l.name,
              setNum: l.setNum,
              setNumDisp: ("00" + l.setNum).slice(-2),
              pieceArr: [],
              hp: 0,
              attack: 0,
              defense: 0,
              isRegularEventDeck: this.isRegularEventDeck
            };
          d.name && "" != d.name || (d.name = "メモリアセット" + d.setNum);
          var h = f.revision + 1;
          k.each(l, function(a, c)
          {
            if (-1 !== c.indexOf("userPieceId"))
              if (c = Number(c.split("userPieceId")[1]) - 1, d.pieceArr[c] = b.storage.userPieceList.findWhere(
                {
                  id: a
                }).toJSON(), d.pieceArr[c])
              {
                d.pieceArr[c].maxLevel = u.getMaxLevel(d.pieceArr[c].piece.rank, d.pieceArr[c].lbCount);
                d.hp += d.pieceArr[c].hp;
                d.attack += d.pieceArr[c].attack;
                d.defense += d.pieceArr[c].defense;
                var g = !1;
                d.pieceArr[c].piece.charaList && k.each(d.pieceArr[c].piece.charaList, function(b, a)
                {
                  b.charaId !== f.charaId && (g = "cantEquipChara")
                });
                "ALL" !== d.pieceArr[c].piece.attributeId && d.pieceArr[c].piece.attributeId !== f.chara.attributeId && (g = "cantEquipAtt");
                0 >= h && (g = "cantEquip");
                h--;
                d.pieceArr[c].invalidFlag = g
              }
            else h--
          });
          l = new n(
          {
            model: new v(d)
          });
          c.appendChild(l.render().el);
          e = e + 1 | 0
        }
        b.doc.querySelector("#scrollInner").appendChild(c);
        r.getBaseData(b.getNativeObj())
      },
      rentalSetListCreate: function()
      {
        n.prototype.parentView = this;
        n.prototype.template = k.template($("#memoriaSetListTemp").text());
        for (var a = b.rentalPieceData.rentalPieceSetList, c = b.doc.createDocumentFragment(), f = b.storage.userCardListEx.findWhere(
          {
            charaId: b.equipInfo.charaId
          }).toJSON(), e = 0, l = b.rentalPieceData.rentalPieceSetList.length; e < l;)
        {
          for (var d = {
              setNum: e + 1,
              name: "レンタルメモリアセット" + (e + 1)
            }, h = 1; 5 > h; h++) d["piece" + h] = a[e]["piece" + h], d["piece" + h].level = a[e]["pieceLevel" + h], d["piece" + h].hp = a[e]["pieceHp" + h], d["piece" + h].attack = a[e]["pieceAtk" + h], d["piece" + h].defense = a[e]["pieceDef" + h], d["piece" + h].lbCount = a[e]["pieceLbCount" + h];
          var g = {
              name: d.name,
              setNum: d.setNum,
              setNumDisp: ("00" + d.setNum).slice(-2),
              pieceArr: [],
              hp: 0,
              attack: 0,
              defense: 0,
              isRegularEventDeck: this.isRegularEventDeck,
              pieceSetId: a[e].pieceSetId
            },
            m = 4;
          k.each(d, function(b, a)
          {
            -1 !== a.indexOf("piece") && (a = Number(a.split("piece")[1]) - 1, g.pieceArr[a] = b, g.pieceArr[a] ? (g.pieceArr[a].maxLevel = u.getMaxLevel(g.pieceArr[a].rank, g.pieceArr[a].lbCount), g.hp += g.pieceArr[a].hp, g.attack += g.pieceArr[a].attack, g.defense += g.pieceArr[a].defense, g.rental = !0, b = !1, "ALL" !== g.pieceArr[a].attributeId && g.pieceArr[a].attributeId !== f.chara.attributeId && (b = "cantEquipAtt"), 0 >= m && (b = "cantEquip"), m--, g.pieceArr[a].invalidFlag = b) : m--)
          });
          d = new n(
          {
            model: new v(g)
          });
          d.el.className = "setWrap commonFrame3 rental";
          c.appendChild(d.render().el);
          e = e + 1 | 0
        }
        b.doc.querySelector("#scrollInner").appendChild(c)
      }
    }),
    n = q.View.extend(
    {
      className: "setWrap commonFrame3",
      events: function()
      {
        var a = {};
        a[b.cgti + " .memoriaSetEquipBtn"] = this.equipConf;
        a[b.cgti + " .memoriaSetBtn"] = this.setConf;
        a["touchstart .equip"] = this.popupTimeStart;
        a[b.cgti + " .equip"] = this.popupTimeStop;
        a[b.cgti + " .nameChangeBtn"] = this.nameChange;
        return a
      },
      initialize: function(b)
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
      popupTimeStart: function(a)
      {
        var c = this.model.toJSON().pieceArr[a.currentTarget.dataset.framenum];
        if (c)
        {
          var f;
          void 0 != b.storage.userPieceList.findWhere(
          {
            id: c.id
          }) ? f = b.storage.userPieceList.findWhere(
          {
            id: c.id
          }).toJSON() : (console.log(c), f = {
            piece: c,
            btnHide: !0,
            lockFlg: !0
          }, f.level = c.level, f.maxLevel = c.maxLevel, f.attack = c.attack, f.defense = c.defense, f.hp = c.hp, f.lbCount = c.lbCount);
          p.cardDetailPopup(a, f)
        }
      },
      popupTimeStop: function(b)
      {
        p.popupTimerStop()
      },
      setConf: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this;
          this.model.toJSON().pieceArr.length ? (a = "<p>「" + this.model.toJSON().name + "」を上書きします。</br>", new b.PopupClass(
          {
            title: "メモリアセット上書き確認",
            content: a + "よろしいですか？</p>",
            decideBtnText: "OK",
            closeBtnText: "キャンセル",
            exClass: "setEquipConf"
          }, null, function()
          {
            $("#popupArea .decideBtn").on(b.cgti, function(a)
            {
              a.preventDefault();
              b.isScrolled() || ($("#popupArea .decideBtn").off(), c.setFunc(), b.g_popup_instance.remove())
            })
          })) : c.setFunc()
        }
      },
      setFunc: function()
      {
        var a = this,
          c = this.model.toJSON(),
          f = this.parentView.equipDetailView.model.toJSON().pieceArr,
          e = {
            setNum: c.setNum,
            name: c.name,
            userPieceIdList: []
          };
        k.each(f, function(b)
        {
          b && b.id && e.userPieceIdList.push(b.id)
        });
        m.ajaxPost(b.linkList.userPieceSetSave, e, function(c)
        {
          if (c.userPieceSetList && c.userPieceSetList[0])
          {
            b.responseSetStorage(c);
            var d = {
              name: c.userPieceSetList[0].name,
              setNum: c.userPieceSetList[0].setNum,
              setNumDisp: ("00" + c.userPieceSetList[0].setNum).slice(-2),
              pieceArr: [],
              hp: 0,
              attack: 0,
              defense: 0
            };
            d.name && "" != d.name || (d.name = "メモリアセット" + d.setNum);
            k.each(c.userPieceSetList[0], function(a, c)
            {
              -1 !== c.indexOf("userPieceId") && (c = Number(c.split("userPieceId")[1]) - 1, d.pieceArr[c] = b.storage.userPieceList.findWhere(
              {
                id: a
              }).toJSON(), d.pieceArr[c] && (d.pieceArr[c].maxLevel = u.getMaxLevel(d.pieceArr[c].piece.rank, d.pieceArr[c].lbCount), d.hp += d.pieceArr[c].hp, d.attack += d.pieceArr[c].attack, d.defense += d.pieceArr[c].defense))
            });
            a.model.set(d);
            r.getBaseData(b.getNativeObj())
          }
          a.parentView.equipDetailView.changeSetMode()
        })
      },
      equipConf: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this;
          a = null;
          this.model.attributes.rental ? (a = "<p>現在の装備メモリアの代わりに、</br>" + ("メモリアセット「" + this.model.toJSON().name + "」を装備します。</br>"), a += 'よろしいですか？</p><p class="c_red">※現在装備しているメモリアのレンタルを外すと</br>元のメモリアを装備した状態になります。</p>') : (a = "<p>現在の装備メモリアをはずして、</br>" + ("メモリアセット「" + this.model.toJSON().name + "」を装備します。</br>"), a += 'よろしいですか？</p><p class="c_red">※同じチームの魔法少女が装備しているメモリアが含まれる場合、</br>自動的にその魔法少女から装備がはずされます。</p>');
          new b.PopupClass(
          {
            title: "メモリアセット確認",
            content: a,
            decideBtnText: "OK",
            closeBtnText: "キャンセル",
            exClass: "setEquipConf"
          }, null, function()
          {
            $("#popupArea .decideBtn").on(b.cgti, function(a)
            {
              a.preventDefault();
              b.isScrolled() || ($("#popupArea .decideBtn").off(), c.equipFunc())
            })
          })
        }
      },
      equipFunc: function()
      {
        var a = this.model.toJSON(),
          c = a.pieceArr,
          f = b.equipInfo.posIndex,
          e = null,
          l = null,
          d = null;
        if (this.model.attributes.rental) k.each(b.holdDeck, function(b, a)
        {
          -1 !== a.indexOf("questPositionId") && b == f && (l = "userCardId" + a.split("questPositionId")[1].slice(-2), d = "rentalPieceSetId" + a.split("questPositionId")[1].slice(-2))
        }), b.rentalPieceData[b.holdDeck[l]] = a.pieceSetId, b.rentalSetFlag = !0, b.holdDeck[d] = a.pieceSetId;
        else
          for (k.each(b.holdDeck, function(a, c)
            {
              -1 !== c.indexOf("questPositionId") && a == f && (e = "userPieceId" + ("00" + c.split("questPositionId")[1]).slice(-2), d = "rentalPieceSetId" + c.split("questPositionId")[1].slice(-2), b.holdDeck[d] && (b.holdDeck[d] = void 0))
            }), k.each(a.pieceArr, function(a, c)
            {
              k.each(b.holdDeck, function(c, d)
              {
                (a && c == a.id && -1 !== d.indexOf("userPieceId") || -1 !== d.indexOf(e)) && delete b.holdDeck[d]
              })
            }), a = 0; 4 > a;) c[a] && c[a].id && (b.holdDeck[e + (a + 1)] = c[a].id), a = a + 1 | 0;
        b.backLinkHandler()
      },
      nameChange: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this;
          a = $("#SetNameChangeTemp").text();
          var f = this.model.toJSON();
          f.exClass = "setNameChangePop";
          var e = new b.PopupClass(f, a, function()
          {
            b.nativeKeyBoard("commentInput", 15, null, "textCount");
            b.doc.getElementById("commentDecide").addEventListener(b.cgti, function(a)
            {
              a.preventDefault();
              if (!b.isScrolled())
              {
                b.tapBlock(!0);
                var d = {
                  setNum: f.setNum,
                  name: b.doc.getElementById("commentInput").value,
                  userPieceIdList: []
                };
                k.each(f.pieceArr, function(a)
                {
                  a && a.id && d.userPieceIdList.push(a.id)
                });
                m.ajaxPost(b.linkList.userPieceSetSave, d, function(a)
                {
                  b.responseSetStorage(a);
                  c.model.set(
                  {
                    name: b.doc.getElementById("commentInput").value
                  });
                  r.getBaseData(b.getNativeObj());
                  e.remove();
                  b.tapBlock(!1)
                })
              }
            });
            b.doc.getElementById("defaultNameBtn").addEventListener(b.cgti, function(a)
            {
              a.preventDefault();
              b.isScrolled() || (b.doc.getElementById("commentInput").value = "メモリアセット" + f.setNum, b.doc.getElementById("textCount").textContent = String("メモリアセット" + f.setNum).length)
            })
          })
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    w = q.View.extend(
    {
      id: "equipDetailWrap",
      events: function()
      {
        var a = {};
        a[b.cgti + " #mainBtn"] = this.changeSetMode;
        a["touchstart .equip"] = this.popupTimeStart;
        a[b.cgti + " .equip"] = this.popupTimeStop;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        r.getBaseData(b.getNativeObj());
        return this
      },
      popupTimeStart: function(a)
      {
        var c = this.model.toJSON().pieceArr[a.currentTarget.dataset.framenum];
        c && (c = b.storage.userPieceList.findWhere(
        {
          id: c.id
        }).toJSON(), p.cardDetailPopup(a, c))
      },
      popupTimeStop: function(a)
      {
        p.popupTimerStop()
      },
      changeSetMode: function(a)
      {
        if (a && (a.preventDefault(), b.isScrolled())) return;
        a = b.doc.querySelector("#MemoriaSetEquip");
        a.classList.contains("typeSet") ? (a.querySelector("h2").textContent = "装備したいセットを選んでください", b.removeClass(a, "typeSet")) : (a.querySelector("h2").textContent = "登録したいセットを選んでください", b.addClass(a, "typeSet"))
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
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      m.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.equipInfo ? (A.createCardList(), b.setStyle(z), x = m.getPageJson(), t = new B) : location.href = "#/MyPage"
    },
    startCommand: function() {},
    removeCommand: function() {},
    remove: function(a)
    {
      p.popupTimerStop();
      t && (t.trigger("removeView"), t.remove());
      a()
    }
  }
});
