define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaEquip.html text!template/memoria/MemoriaEquipInfo.html text!css/memoria/MemoriaEquip.css js/view/memoria/MemoriaEquipPartsView memoriaSortUtil memoriaUtil cardUtil js/memoria/MemoriaPopup".split(" "), function(f, p, a, q, k, A, B, C, t, D, x, E, u)
{
  var y = p.Model.extend(),
    d, r = "rank level hp atk def lb get".split(" "),
    z = {
      rank: "レアリティ順",
      level: "レベル順",
      hp: "HP順",
      atk: "ATK順",
      def: "DEF順",
      lb: "限界突破順",
      get: "入手順"
    },
    F = ["TOWER", "DAILYTOWER", "BRANCH", "SINGLERAID"],
    G = ["EXTERMINATION"],
    n, l, H = p.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .hoge"] = this.hoge;
        b[a.cgti + " #eventFilterBtn"] = this.eventFilterBtn;
        b[a.cgti + " #sortPopupMemoria"] = this.sortPopMemoria;
        b[a.cgti + " #sortBtn"] = this.sortStart;
        b[a.cgti + " #ascPanelMemoria li"] = this.ascStartMemoria;
        b[a.cgti + " #sizeChange"] = this.sizeChange;
        return b
      },
      initialize: function(b)
      {
        this.template = f.template(A);
        this.equipedPiece = this.selectPieceId = this.selectPiece = null;
        this.ownEquipPieceObj = {};
        this.ownEquipPieceIdObj = {};
        this.memoriaSkillEquipNum = this.memoriaAbilityEquipNum = 0;
        this.isRegularEventDeck = !0;
        a.holdDeck && (this.isRegularEventDeck = -1 < ["extermination", "exterminationCopy"].indexOf(a.holdDeck.deckCatType));
        this.memoriaSort = d = new D("UserMemoriaList_equip", this);
        this.memoriaUtil = x;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(q.getPageJson()));
        return this
      },
      changeSetConf: function()
      {
        var b = function()
          {
            $("#popupArea .popupCloseBtn").on(a.cgti, function()
            {
              $("#popupArea .popupCloseBtn").off();
              c.remove();
              a.removeBackHandler();
              a.backLinkHandler()
            });
            $("#popupArea .decideBtn").on(a.cgti, function()
            {
              $("#popupArea .decideBtn").off();
              c.remove();
              l.equipDetailView.equipFunc()
            })
          },
          c = a.equipInfo.pieceSetFlag ? new a.PopupClass(
          {
            canClose: !1,
            title: "メモリアセット編集の終了",
            content: "メモリアセットの内容が変更されています。",
            closeBtnText: "変更を破棄",
            decideBtnText: "変更を保存"
          }, null, b) : new a.PopupClass(
          {
            canClose: !1,
            title: "メモリア装備確認",
            content: "メモリアの装備の内容が変更されています。",
            closeBtnText: "変更を破棄して編成に戻る",
            decideBtnText: "変更を保持して編成に戻る"
          }, null, b)
      },
      orderSet: function()
      {
        "asc" === d.getAscId() ? (a.addClass(a.doc.getElementById("ascMemoria"), "none"), a.removeClass(a.doc.getElementById("descMemoria"), "none")) : (a.addClass(a.doc.getElementById("descMemoria"), "none"), a.removeClass(a.doc.getElementById("ascMemoria"), "none"))
      },
      sortPopMemoria: function(b)
      {
        b.preventDefault();
        a.isScrolled() || d.sortPopupOpen(b)
      },
      ascStartMemoria: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (d.ascSort(b.currentTarget.dataset.ascid), this.orderSet())
      },
      afterFilterFunc: function()
      {
        this.sortBtn ? this.sortBtn = !1 : (this.trigger("viewUpdate"), d.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE filterOn" : a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE filterOff", a.scrollRefresh("scrollOuter", "scrollInner"))
      },
      firstCollectionSort: function()
      {
        var b = {
            RANK_1: 0,
            RANK_2: 1,
            RANK_3: 2,
            RANK_4: 3,
            RANK_5: 4
          },
          c = "asc" === d.sortPrm[1] ? 1 : -1;
        a.storage.userPieceList.comparator = function(a, e)
        {
          if ("rank" == d.sortPrm[0])
          {
            if (b[e.get("piece").rank] < b[a.get("piece").rank]) return -1 * c;
            if (b[e.get("piece").rank] > b[a.get("piece").rank]) return 1 * c
          }
          else if ("level" == d.sortPrm[0])
          {
            if (e.get("level") < a.get("level")) return -1 * c;
            if (e.get("level") > a.get("level")) return 1 * c
          }
          else if ("atk" == d.sortPrm[0])
          {
            if (e.get("attack") < a.get("attack")) return -1 * c;
            if (e.get("attack") > a.get("attack")) return 1 * c
          }
          else if ("def" == d.sortPrm[0])
          {
            if (e.get("defense") < a.get("defense")) return -1 * c;
            if (e.get("defense") > a.get("defense")) return 1 * c
          }
          else if ("hp" == d.sortPrm[0])
          {
            if (e.get("hp") < a.get("hp")) return -1 * c;
            if (e.get("hp") > a.get("hp")) return 1 * c
          }
          else if ("lb" == d.sortPrm[0])
          {
            if (e.get("lbCount") < a.get("lbCount")) return -1 * c;
            if (e.get("lbCount") > a.get("lbCount")) return 1 * c
          }
          if ("get" !== d.sortPrm[0])
          {
            if (e.get("pieceId") < a.get("pieceId")) return -1 * c;
            if (e.get("pieceId") > a.get("pieceId")) return 1 * c
          }
          if (Date.parse(e.get("createdAt")) < Date.parse(a.get("createdAt"))) return -1 * c;
          if (Date.parse(e.get("createdAt")) > Date.parse(a.get("createdAt"))) return 1 * c;
          if ("get" === d.sortPrm[0])
          {
            if (e.get("pieceId") < a.get("pieceId")) return -1 * c;
            if (e.get("pieceId") > a.get("pieceId")) return 1 * c
          }
          return 0
        };
        a.storage.userPieceList.sort()
      },
      sortStart: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          this.sortBtn = !0;
          var c = r.indexOf(d.getSortId());
          a.removeClass(a.doc.getElementById("memoriaListWrap"), d.getSortId());
          c = c + 1 >= r.length ? 0 : c + 1;
          d.sortPrm[0] = r[c];
          d.multiSort(d.sortPrm);
          b.currentTarget.innerHTML = "<span class='b_screen'></span>" + z[r[c]];
          a.addClass(a.doc.getElementById("memoriaListWrap"), d.getSortId());
          this.orderSet();
          "lv" != d.getSortId() && "rank" != d.getSortId() && "lb" != d.getSortId() && this.trigger("dispChange", d.getSortId())
        }
      },
      createDom: function()
      {
        a.setGlobalView();
        var b = this;
        a.content.append(this.render().el);
        v.prototype.parentView = this;
        v.prototype.template = f.template(B);
        var c = a.doc.createDocumentFragment();
        this.equipInfoView = new v(
        {
          model: new y(
          {})
        });
        c.appendChild(this.equipInfoView.render().el);
        a.doc.querySelector("#MemoriaEquip").appendChild(c);
        var g = $.extend(!0,
        {}, a.equipInfo);
        g.isRegularEventDeck = this.isRegularEventDeck;
        w.prototype.parentView = this;
        w.prototype.template = f.template($("#EquipDetail").text());
        c = a.doc.createDocumentFragment();
        this.equipDetailView = new w(
        {
          model: new y(g)
        });
        c.appendChild(this.equipDetailView.render().el);
        a.doc.querySelector("#MemoriaEquip").appendChild(c);
        0 < this.equipDetailView.model.toJSON().pieceIndex && this.equipDetailView.equipFrameActivation(null, this.equipDetailView.model.toJSON().pieceIndex);
        a.scrollSet("scrollOuter", "scrollInner");
        a.doc.getElementById("memoriaHasNum").innerText = n.userPieceList.length;
        a.removeClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent");
        this.eventRunning = !1;
        n.eventList && f.each(n.eventList, function(c)
        {
          0 <= F.indexOf(c.eventType) && (b.eventRunning = !0, a.addClass(a.doc.getElementById("eventFilterBtn"), "onDisp"), d.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent"))
        });
        this.eventRunning || f.each(n.regularEventList, function(c)
        {
          0 <= G.indexOf(c.regularEventType) && (b.eventRunning = !0, a.addClass(a.doc.getElementById("eventFilterBtn"), "onDisp"), d.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent"))
        });
        a.equipInfo.pieceSetFlag && a.addClass(a.doc.getElementById("memoriaListWrap"), "pieceSet");
        c = a.doc.getElementById("memoriaListWrap");
        g = a.doc.getElementById("sizeChange");
        switch (d.getDisplaySize())
        {
          case .8:
            a.addClass(c, "smaller");
            g.dataset.size = "smallest";
            a.addClass(g, "smaller");
            break;
          case .7:
            a.removeClass(c, "smaller");
            a.addClass(c, "smallest");
            g.dataset.size = "normal";
            a.removeClass(g, "smaller");
            a.addClass(g, "smallest");
            break;
          default:
            a.removeClass(c, "smallest"), g.dataset.size = "smaller", a.removeClass(g, "smallest")
        }
        this.orderSet();
        d.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE filterOn" : a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE filterOff";
        a.doc.querySelector("#sortBtn").innerHTML = "<span class='b_screen'></span>" + z[d.getSortId()];
        a.addClass(a.doc.getElementById("memoriaListWrap"), d.getSortId());
        this.firstCollectionSort();
        this.createListView();
        this.trigger("viewUpdate");
        this.trigger("equipAddClass")
      },
      createListView: function()
      {
        this.memoriaPartsTemplate = f.template($("#MemoriaListParts").text());
        t.prototype.parentView = this;
        var b = $.extend(!0,
          {}, a.equipInfo),
          c = [];
        a.storage.userPieceSetList.each(function(a)
        {
          a = a.toJSON();
          a.setNum != b.setNum && f.each(a, function(a, b)
          {
            -1 !== b.indexOf("userPieceId") && c.push(a)
          })
        });
        t.prototype.pieceSetIdArr = c;
        var g = this,
          e = a.doc.createDocumentFragment();
        a.storage.userPieceList.each(function(b, c)
        {
          c = b.toJSON();
          b.set("maxLevel", x.getMaxLevel(c.piece.rank, c.lbCount));
          b = new t(
          {
            model: b
          });
          e.appendChild(b.render().el);
          g.equipedPrimary && c.equipFlag && (b.el.style.WebkitOrder = "-1000", b.el.style.order = "-1000");
          g.memoriaCount++;
          30 === g.memoriaCount && (a.doc.getElementById("memoriaListWrap").appendChild(e), k.getBaseData(a.getNativeObj()), a.ready.hide(), e = null, e = a.doc.createDocumentFragment())
        });
        "lv" !== d.getSortId() && "rank" !== d.getSortId() && "lb" !== d.getSortId() && this.trigger("dispChange", d.getSortId());
        a.doc.getElementById("scrollInner").appendChild(e);
        e = null;
        null !== d.sortPrm[4] && a.addClass(a.doc.getElementById("eventFilterBtn"), "on");
        a.scrollRefresh("scrollOuter", "scrollInner");
        30 < this.memoriaCount ? k.getBaseData(a.getNativeObj()) : (k.getBaseData(a.getNativeObj()), a.ready.hide())
      },
      eventFilterBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b.currentTarget.classList.toggle("on"), d.sortPrm[4] = null !== d.sortPrm[4] ? null : "on", a.sfml.UserMemoriaList_equip = d.sortPrm, a.sfm(), d.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaListWrap"), "onlyEvent"), a.scrollRefresh())
      },
      sizeChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = a.doc.getElementById("memoriaListWrap");
          switch (b.currentTarget.dataset.size)
          {
            case "smaller":
              a.addClass(c, "smaller");
              b.currentTarget.dataset.size = "smallest";
              a.addClass(b.currentTarget, "smaller");
              b = .8;
              break;
            case "smallest":
              a.removeClass(c, "smaller");
              a.addClass(c, "smallest");
              b.currentTarget.dataset.size = "normal";
              a.removeClass(b.currentTarget, "smaller");
              a.addClass(b.currentTarget, "smallest");
              b = .7;
              break;
            default:
              a.removeClass(c, "smallest"), b.currentTarget.dataset.size = "smaller", a.removeClass(b.currentTarget, "smallest"), b = 1
          }
          d.sortPrm[6] = b;
          d.saveMemory();
          a.scrollRefresh("scrollOuter", "scrollInner")
        }
      }
    }),
    w = p.View.extend(
    {
      id: "equipDetailWrap",
      className: function()
      {
        return ""
      },
      events: function()
      {
        var b = {};
        b["touchstart .equip"] = this.popupTimeStart;
        b[a.cgti + " .equip"] = this.equipFrameActivation;
        b[a.cgti + " .canSet"] = this.equipFrameActivation;
        b[a.cgti + " #mainBtn"] = this.equipFunc;
        b[a.cgti + " #allRemoveBtn"] = this.allRemoveFunc;
        return b
      },
      popupTimeStart: function(b)
      {
        var c = this.model.toJSON().pieceArr[b.currentTarget.dataset.framenum];
        c && (c = a.storage.userPieceList.findWhere(
        {
          id: c.id
        }).toJSON(), u.cardDetailPopup(b, c))
      },
      initialize: function(a)
      {
        this.ownEquipPickUp();
        this.selectFrame = null;
        this.listenTo(this.model, "change", this.ownEquipPickUp);
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "change", this.changeSetCheck);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        k.getBaseData(a.getNativeObj());
        return this
      },
      ownEquipPickUp: function()
      {
        var a = this;
        this.ownEquipPieceObj = {};
        this.ownEquipPieceIdObj = {};
        f.each(this.model.toJSON().pieceArr, function(b, g)
        {
          b && (a.ownEquipPieceObj[b.id] = b, a.ownEquipPieceIdObj[b.pieceId] = !0)
        })
      },
      changeSetCheck: function()
      {
        var b = this.model.toJSON().pieceArr;
        I(b, a.equipInfo.pieceArr)
      },
      equipFrameActivation: function(b, c)
      {
        u.popupTimerStop(b);
        if (b)
        {
          b.preventDefault();
          if (a.isScrolled()) return;
          c = Number(b.currentTarget.dataset.framenum)
        }
        else --c;
        var g = this;
        b = this.el;
        this.parentView.trigger("equipedReset");
        a.removeClass(a.doc.querySelector("#equipDetailWrap .memoriaWrap .selected"), "selected");
        this.parentView.trigger("viewUpdate");
        if (this.selectFrame == c)
        {
          this.selectFrame = null;
          a.removeClass(b.querySelector(".memoriaWrap .selected"), "selected");
          a.addClass(a.doc.querySelector("#memoriaListWrap"), "cantTap");
          var e = this.model.toJSON().pieceArr,
            d = a.equipInfo.pieceArr,
            h = !1;
          f.each(e, function(a, b)
          {
            if (a && !d[b] || a && d[b] && a.id !== d[b].id) h = !0
          });
          f.each(d, function(a, b)
          {
            if (a && !e[b] || a && e[b] && a.id !== e[b].id) h = !0
          });
          e.length !== d.length && (h = !0);
          h && a.removeClass(a.doc.querySelector("#mainBtn"), "off");
          a.removeClass(a.doc.querySelector("#allRemoveBtn"), "off");
          this.parentView.invalidFlag = null;
          this.parentView.equipedPiece = null;
          this.parentView.selectPiece = null;
          this.parentView.selectPieceId = null;
          this.parentView.memoriaAbilityEquipNum = 0;
          this.parentView.memoriaSkillEquipNum = 0;
          this.parentView.equipInfoView.model.clear()
        }
        else this.selectFrame = c, a.addClass(this.el.querySelectorAll(".memoriaWrap .memoria")[c], "selected"), a.removeClass(a.doc.querySelector("#memoriaListWrap"), "cantTap"), a.addClass(a.doc.querySelector("#mainBtn"), "off"), a.addClass(a.doc.querySelector("#allRemoveBtn"), "off"), b = this.model.toJSON().pieceArr[c] ||
        {}, console.log(b), this.parentView.invalidFlag = b.invalidFlag || null, this.parentView.equipedPiece = a.storage.userPieceList.findWhere(
        {
          id: b.id
        }) || null, this.parentView.selectPiece = a.storage.userPieceList.findWhere(
        {
          id: b.id
        }) || null, this.parentView.selectPieceId = b.id || null, this.parentView.memoriaAbilityEquipNum = 0, this.parentView.memoriaSkillEquipNum = 0, f.each(this.model.toJSON().pieceArr, function(a, b)
        {
          a && b !== c && ("ABILITY" == a.piece.pieceType && g.parentView.memoriaAbilityEquipNum++, "SKILL" == a.piece.pieceType && g.parentView.memoriaSkillEquipNum++)
        }), (b = this.parentView.equipedPiece ? this.parentView.equipedPiece.toJSON() : null) ? (b.maxLevel || this.parentView.selectPiece.set("maxLevel", this.parentView.memoriaUtil.getMaxLevel(b.piece.rank, b.lbCount)), this.parentView.selectPiece.set(
        {
          equipRemoveFlag: !0
        }), this.parentView.equipInfoView.model.clear(
        {
          silent: !0
        }), this.parentView.equipInfoView.model.set(this.parentView.selectPiece.toJSON())) : this.parentView.equipInfoView.model.clear();
        this.parentView.trigger("viewUpdate")
      },
      equipFunc: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        var c = this.model.toJSON();
        b = c.pieceArr;
        if (a.equipInfo.pieceSetFlag)
        {
          var g = {
            setNum: c.setNum,
            name: c.charaName,
            userPieceIdList: []
          };
          f.each(c.pieceArr, function(a)
          {
            a && a.id && g.userPieceIdList.push(a.id)
          });
          q.ajaxPost(a.linkList.userPieceSetSave, g, function(b)
          {
            a.responseSetStorage(b);
            location.href = "#/MemoriaSetList"
          })
        }
        else
        {
          var e = null;
          f.each(a.holdDeck, function(a, b)
          {
            -1 !== b.indexOf("questPositionId") && a == c.posIndex && (e = "userPieceId" + ("00" + b.split("questPositionId")[1]).slice(-2))
          });
          f.each(c.pieceArr, function(b, c)
          {
            f.each(a.holdDeck, function(c, d)
            {
              (b && c == b.id && -1 !== d.indexOf("userPieceId") || -1 !== d.indexOf(e)) && delete a.holdDeck[d]
            })
          });
          for (var d = 0; 4 > d;) b[d] && b[d].id && (a.holdDeck[e + (d + 1)] = b[d].id), d = d + 1 | 0;
          a.removeBackHandler();
          a.backLinkHandler()
        }
      },
      allRemoveFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = f.clone(this.model.toJSON());
          f.each(c.pieceArr, function(a, b)
          {
            a && (delete c.allPiece[a.id], c.pieceArr[b] = null)
          });
          if (!c.pieceSetFlag)
          {
            var d = a.storage.userCardListEx.findWhere(
            {
              charaId: c.charaId
            }).toJSON().card.miniCharaNo;
            f.each(a.equipInfo.allPiece, function(a, b)
            {
              a.charaId !== d && (console.log(a), c.allPiece[b] = a)
            })
          }
          this.model.clear(
          {
            silent: !0
          });
          this.model.set(c);
          a.removeClass(a.doc.querySelector("#mainBtn"), "off");
          this.parentView.trigger("viewUpdate")
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    v = p.View.extend(
    {
      id: "equipInfo",
      className: "commonFrame1",
      events: function()
      {
        var b = {};
        b[a.cgti + " #memoriaEquipBtn"] = this.equipedConf;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        var b = this.model.toJSON();
        if (this.parentView.equipDetailView)
        {
          var c = this.parentView.equipDetailView.model.toJSON();
          c.allPiece[b.id] && (b.equipCharaId = c.allPiece[b.id].charaId)
        }
        var d;
        b && this.parentView.equipedPiece && (c = this.parentView.equipedPiece.toJSON(), b.id && b.id !== c.id && (d = {}, d.hp = b.hp - c.hp, d.attack = b.attack - c.attack, d.defense = b.defense - c.defense));
        this.$el.html(this.template(
        {
          model: b,
          additional: d
        }));
        k.getBaseData(a.getNativeObj());
        return this
      },
      equipedConf: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = this,
            d = this.model.toJSON(),
            e = this.parentView.equipDetailView.model.toJSON();
          console.log(this.parentView);
          if (a.equipInfo.pieceSetFlag && !d.equipRemoveFlag && !e.allPiece[d.id] && d.alreadySet) new a.PopupClass(
          {
            title: "装備変更",
            content: "このメモリアは既に他のセットへ登録中です。<br>セット登録しますか？",
            decideBtnEvent: function()
            {
              c.memoriaSet(b);
              a.g_popup_instance.remove()
            },
            decideBtnText: "OK",
            closeBtnText: "閉じる",
            popupType: "typeC"
          }, null, h);
          else if (e.allPiece[this.model.toJSON().id] && e.allPiece[this.model.toJSON().id].name)
            if (d = e.allPiece[this.model.toJSON().id].name, e = e.charaName, d !== e)
            {
              var m = f.template($("#formationEquipPop").text()),
                h = function()
                {
                  a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, function()
                  {
                    c.memoriaSet(b);
                    a.g_popup_instance.remove()
                  })
                };
              new a.PopupClass(
              {
                title: "装備変更",
                content: m(
                {
                  cardName: d,
                  targetName: e
                }),
                decideBtnText: "OK",
                closeBtnText: "閉じる",
                popupType: "typeC"
              }, null, h)
            }
          else this.memoriaSet(b);
          else this.memoriaSet(b)
        }
      },
      memoriaSet: function(b)
      {
        if (!b.currentTarget.classList.contains("off"))
        {
          b = this.parentView.equipDetailView;
          var c = b.selectFrame,
            d = f.clone(this.model.toJSON()),
            e = f.clone(b.model.toJSON());
          if (e.charaId)
          {
            var m = a.storage.userCardListEx.findWhere(
              {
                charaId: e.charaId
              }),
              h = m.toJSON().chara.name;
            m.toJSON().chara.title && (h += " " + m.toJSON().chara.title);
            var k = m.toJSON().card.miniCharaNo
          }
          delete d.equipRemoveFlag;
          delete d.selectFlg;
          e.pieceArr[c] && e.pieceArr[c].id == d.id ? (delete e.allPiece[d.id], e.pieceArr[c] = null) : (e.pieceArr[c] && delete e.allPiece[e.pieceArr[c].id], b.ownEquipPieceObj[d.id] && f.each(e.pieceArr, function(a, b)
          {
            a && a.id == d.id && (delete e.allPiece[d.id], e.pieceArr[b] = null)
          }), e.allPiece[d.id] = {
            name: h,
            charaId: k || null
          }, e.pieceArr[c] = d);
          f.each(a.equipInfo.allPiece, function(a, b)
          {
            if (!e.allPiece[b])
            {
              var c = !1;
              f.each(e.pieceArr, function(a, d)
              {
                a && a.id == b && (c = !0)
              });
              c || a.charaId === k || (e.allPiece[b] = a)
            }
          });
          b.model.clear(
          {
            silent: !0
          });
          b.model.set(e);
          b.selectFrame = null;
          a.removeClass(b.el.querySelector(".memoriaWrap .selected"), "selected");
          a.addClass(a.doc.querySelector("#memoriaListWrap"), "cantTap");
          a.removeClass(a.doc.querySelector("#mainBtn"), "off");
          a.removeClass(a.doc.querySelector("#allRemoveBtn"), "off");
          this.parentView.invalidFlag = null;
          this.parentView.equipedPiece = null;
          this.parentView.selectPiece = null;
          this.parentView.selectPieceId = null;
          this.parentView.memoriaAbilityEquipNum = 0;
          this.parentView.memoriaSkillEquipNum = 0;
          this.model.clear();
          this.parentView.trigger("equipedReset");
          this.parentView.trigger("viewUpdate")
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    I = function(b, c)
    {
      var d = !1;
      console.log(b, c);
      f.each(b, function(a, b)
      {
        if (a && !c[b] || a && c[b] && a.id !== c[b].id) d = !0
      });
      f.each(c, function(a, c)
      {
        if (a && !b[c] || a && b[c] && a.id !== b[c].id) d = !0
      });
      b.length !== c.length && (d = !0);
      d ? (a.addClass(a.doc.querySelector("#changeBg"), "show"), a.addBackHandler(l.changeSetConf)) : (a.removeClass(a.doc.querySelector("#changeBg"), "show"), a.removeBackHandler())
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "userStatusList"
    },
    {
      id: "gameUser"
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
      id: "userGiftList"
    },
    {
      id: "pieceList"
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      q.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.equipInfo ? (console.log("equipInfo", a.equipInfo), E.createCardList(), a.setStyle(C), n = q.getPageJson(), l = new H, k.getBaseData(a.getNativeObj())) : location.href = "#/MyPage"
    },
    startCommand: function() {},
    removeCommand: function() {},
    remove: function(b)
    {
      a.removeBackHandler();
      u.popupTimerStop();
      l && (l.trigger("removeView"), l.remove());
      b()
    }
  }
});
