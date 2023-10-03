define("underscore backbone backboneCommon ajaxControl command js/quest/secondPartLast/EnemyDetailPopup text!template/quest/secondPartLast/Formation.html text!css/quest/SecondPartLastFormation.css cardUtil DeckUtil".split(" "), function(g, B, b, q, v, F, G, H, C, I)
{
  B.Model.extend();
  var u, D, l, m, n = [],
    E = B.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #autoFormationBtn"] = this.autoFormationBtn;
        a[b.cgti + " #allClearBtn"] = this.allClearBtn;
        a[b.cgti + " #tabBtnList .btn"] = this.tabBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template(G);
        this.battleInfoModel = b.secondPartLastInfo.battleInfo;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {}));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.setGlobalView();
        var a = b.doc.createDocumentFragment();
        y.prototype.rootView = this;
        y.prototype.template = g.template($("#deckPartsTemp").text());
        for (var c = 1; 5 >= c; c++)
        {
          var f = new y(c);
          a.appendChild(f.render().el)
        }
        b.doc.getElementById("deckWrap").appendChild(a);
        v.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      allClearBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = function()
        {
          for (var a = {
              formationSheetId: 111,
              formationSheet: g.findWhere(b.storage.userFormationSheetList.toJSON(),
              {
                formationSheetId: 111
              }).formationSheet
            }, a = l.deckDataCreate(a), f = {
              userDeckList: []
            }, e = 1; 5 >= e; e++) "CONQUERED" !== b.secondPartLastInfo.battleInfo["battle" + e + "Status"] && (a.deckType = 100 + e, a.name = "チーム" + String(e), f.userDeckList.push(l.savePrmCreate(a)));
          q.ajaxPost(b.linkList.userDeckBulkSave, f, function(a)
          {
            b.responseSetStorage(a);
            b.SecondPartLastBattleConfirmModel && (b.SecondPartLastBattleConfirmModel.deckInfo = b.SecondPartLastBattleConfirmModel.getUserDeck(
            {
              index: b.SecondPartLastBattleConfirmModel.index - 1
            }));
            new b.PopupClass(
            {
              title: "チーム全解散",
              content: "チーム編成を解散しました",
              closeBtnText: "OK",
              popupType: "typeA"
            })
          })
        }.bind(this), new b.PopupClass(
        {
          title: "チーム全解散",
          content: "制圧中を除くチーム編成を解散します。<br>よろしいですか？",
          closeBtnText: "キャンセル",
          decideBtnText: "OK",
          decideBtnEvent: a,
          popupType: "typeA"
        }))
      },
      autoFormationBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          window.isLocal ? this.createAutoFormationDeckModel() : this.autoFormationDeckModelArr || this.createAutoFormationDeckModel();
          a = function()
          {
            for (var a = {
                userDeckList: []
              }, c = 0; c < this.autoFormationDeckModelArr.length; c++) a.userDeckList.push(l.savePrmCreate(this.autoFormationDeckModelArr[c]));
            q.ajaxPost(b.linkList.userDeckBulkSave, a, function(a)
            {
              b.responseSetStorage(a);
              b.SecondPartLastBattleConfirmModel && (b.SecondPartLastBattleConfirmModel.deckInfo = b.SecondPartLastBattleConfirmModel.getUserDeck(
              {
                index: b.SecondPartLastBattleConfirmModel.index - 1
              }));
              new b.PopupClass(
              {
                title: "魔法少女おまかせ編成",
                content: "魔法少女の編成が完了いたしました。",
                closeBtnText: "OK",
                popupType: "typeA"
              })
            })
          }.bind(this);
          var c = [];
          new b.PopupClass(
          {
            title: "魔法少女おまかせ編成",
            content: "制圧中の編成以外を以下の編成へと入れ替えます。よろしいですか？<br><div id='autoFormationContainer'></div>",
            closeBtnText: "キャンセル",
            decideBtnText: "OK",
            decideBtnEvent: a,
            popupId: "autoFormationPopup",
            popupType: "typeB"
          }, null, function()
          {
            for (var a = b.doc.createDocumentFragment(), e = 1; 5 >= e; e++)
            {
              var d = new y(e);
              a.appendChild(d.renderAutoFormation().el);
              c.push(d)
            }
            b.doc.getElementById("autoFormationContainer").appendChild(a);
            v.getBaseData(b.getNativeObj())
          }, function()
          {
            for (var a = 0; 5 > a; a++) c[a].removeView()
          })
        }
      },
      createAutoFormationDeckModel: function()
      {
        for (var a = [], c = 1; 5 >= c; c++)
          if ("CONQUERED" === b.secondPartLastInfo.battleInfo["battle" + c + "Status"])
          {
            var f = 100 + c,
              e = g.findWhere(b.storage.userDeckList.toJSON(),
              {
                deckType: f
              });
            if (e)
              for (var d = 1; 9 >= d; d++) e["userCardId" + d] && a.push(e["userCardId" + d])
          } for (var e = g.filter(b.storage.userCardListEx.toJSON(), function(c)
          {
            var d = b.getTargetComposeAttribute(
            {
              attributeId: c.chara.attributeId
            });
            c.tatalPt = (c.attack || 0) + (c.defense || 0) + (c.hp || 0) + (c.addendAttack || 0) + (c.addendDefense || 0) + (c.addendHp || 0);
            g.each(d.composed, function(a, b, d)
            {
              c.tatalPt += a
            });
            return 0 > a.indexOf(c.userCardId) && 1 <= c.level
          }).sort(function(a, b)
          {
            if (b.tatalPt < a.tatalPt) return -1;
            if (b.tatalPt > a.tatalPt) return 1
          }), h = [], c = 1; 5 >= c; c++)
          if ("CONQUERED" !== b.secondPartLastInfo.battleInfo["battle" + c + "Status"])
          {
            d = {
              deckType: 100 + c,
              enemyAttribute: b.secondPartLastInfo.enemyInfo.list[c - 1].enemyAttributeId
            };
            switch (d.enemyAttribute)
            {
              case "FIRE":
                d.goodAttribute = "WATER";
                d.badAttribute = "TIMBER";
                break;
              case "WATER":
                d.goodAttribute = "TIMBER";
                d.badAttribute = "FIRE";
                break;
              case "TIMBER":
                d.goodAttribute = "FIRE";
                d.badAttribute = "WATER";
                break;
              case "LIGHT":
                d.goodAttribute = "DARK";
                d.badAttribute = "DARK";
                break;
              case "DARK":
                d.goodAttribute = "LIGHT";
                d.badAttribute = "LIGHT";
                break;
              default:
                d.goodAttribute = "LIGHT", d.badAttribute = "DARK"
            }
            h.push(d)
          } for (c = 0; c < h.length; c++)
        {
          h[c].userCardIdArr = [];
          for (var t = g.filter(e, function(a)
            {
              return a.card.attributeId === h[c].goodAttribute
            }), d = 0; d < t.length; d++) h[c].userCardIdArr.push(t[d].userCardId);
          d = parseInt(e.length / h.length);
          5 < d && (d = 5);
          h[c].userCardIdArr.length > d && (h[c].userCardIdArr.length = d);
          e = e.filter(function(a)
          {
            return !h[c].userCardIdArr.includes(a.userCardId)
          })
        }
        for (c = 0; c < e.length && e[c]; c++) h.sort(function(a, b)
        {
          if (b.userCardIdArr.length < a.userCardIdArr.length) return 1;
          if (b.userCardIdArr.length > a.userCardIdArr.length) return -1
        }), h[0].userCardIdArr.push(e[c].userCardId);
        this.autoFormationDeckModelArr = [];
        b.storage.userPieceList.toJSON();
        for (c = 1; 5 >= c; c++)
          if ("CONQUERED" !== b.secondPartLastInfo.battleInfo["battle" + c + "Status"])
          {
            f = 100 + c;
            e = {
              deckType: f,
              formationSheetId: 111,
              formationSheet: g.findWhere(b.storage.userFormationSheetList.toJSON(),
              {
                formationSheetId: 111
              }).formationSheet,
              name: "チーム" + String(c)
            };
            t = [];
            for (d = 1; 9 >= d; d++) e.formationSheet["placeSkill" + d] && t.push(d);
            f = g.findWhere(h,
            {
              deckType: f
            }).userCardIdArr;
            for (d = 0; 5 > d; d++) f[d] && (e["questPositionId" + String(d + 1)] = t[d], e["userCardId" + String(d + 1)] = f[d], e.questEpisodeUserCardId || (e.questEpisodeUserCardId = f[d]));
            d = l.deckDataCreate(e);
            d = this.memoriaPickup(d, f);
            this.autoFormationDeckModelArr.push(d)
          }
      },
      memoriaPickup: function(a, c)
      {
        function f(b, c)
        {
          var d = q[p];
          if (!(2 <= k[c].ABILITY && 2 <= k[c].SKILL))
          {
            2 <= k[c].ABILITY && (d = "SKILL");
            2 <= k[c].SKILL && (d = "ABILITY");
            var z = "userPieceId" + ("00" + (c + 1)).slice(-2) + (p + 1),
              A = function(f)
              {
                if (!r[d][f])
                  if ("ABILITY" == d)
                    if (r.SKILL[f] && 2 > k[c].SKILL) d = "SKILL";
                    else
                    {
                      e(b, c);
                      return
                    }
                else if ("SKILL" == d)
                  if (r.ABILITY[f] && 2 > k[c].ABILITY) d = "ABILITY";
                  else
                  {
                    e(b, c);
                    return
                  }
                else return;
                var g = r[d][f].pieceId;
                v(b.charaId, r[d][f].piece) && !k[c].MEMORIA.includes(g) ? (a[z] = r[d][f].id + "", k[c].MEMORIA.push(r[d][f].pieceId), r[d].splice(f, 1), u[d]++, k[c][d]++) : A(f + 1 | 0)
              };
            A(0)
          }
        }

        function e(b, c)
        {
          var d = q[p];
          if (!(2 <= k[c].ABILITY && 2 <= k[c].SKILL))
          {
            2 <= k[c].ABILITY && (d = "SKILL");
            2 <= k[c].SKILL && (d = "ABILITY");
            var f = "userPieceId" + ("00" + (c + 1)).slice(-2) + (p + 1),
              z = function(e)
              {
                if (w[d][e])
                {
                  var A = w[d][e].pieceId;
                  v(b.charaId, w[d][e].piece) && !k[c].MEMORIA.includes(A) ? (a[f] = w[d][e].id + "", k[c].MEMORIA.push(w[d][e].pieceId), w[d].splice(e, 1), u[d]++, k[c][d]++) : z(e + 1 | 0)
                }
              };
            z(0)
          }
        }
        var d = b.storage.userPieceList.toJSON();
        for (c = 0; c < d.length; c++) C.memoriaEventCheck(d[c]) && (d[c] = C.memoriaEventCheck(d[c]));
        var h = b.secondPartLastInfo.battleInfo.regularEventId;
        c = [];
        var t = [];
        c = g.filter(d, function(a)
        {
          return "SKILL" === a.piece.pieceType && a.regularEventId !== h
        });
        t = g.filter(d, function(a)
        {
          return "ABILITY" === a.piece.pieceType && a.regularEventId !== h
        });
        c.sort(function(a, b)
        {
          a = a.hp + a.defense;
          b = b.hp + b.defense;
          return a < b ? 1 : a > b ? -1 : 0
        });
        t.sort(function(a, b)
        {
          a = a.hp + a.attack;
          b = b.hp + b.attack;
          return a < b ? 1 : a > b ? -1 : 0
        });
        var m = [],
          n = [];
        if (null != h)
          for (var m = g.filter(d, function(a)
            {
              return a.regularEventId === h
            }), p = 0; p < m.length; p++) n.push(m[p].pieceId);
        d = [];
        n = [];
        d = g.filter(m, function(a)
        {
          return "SKILL" === a.piece.pieceType
        });
        n = g.filter(m, function(a)
        {
          return "ABILITY" === a.piece.pieceType
        });
        d.sort(function(a, b)
        {
          a = a.hp + a.defense;
          b = b.hp + b.defense;
          return a < b ? 1 : a > b ? -1 : 0
        });
        n.sort(function(a, b)
        {
          a = a.hp + a.attack;
          b = b.hp + b.attack;
          return a < b ? 1 : a > b ? -1 : 0
        });
        for (var q = ["ABILITY", "SKILL", "ABILITY", "SKILL"], k = [
          {
            SKILL: 0,
            ABILITY: 0,
            MEMORIA: []
          },
          {
            SKILL: 0,
            ABILITY: 0,
            MEMORIA: []
          },
          {
            SKILL: 0,
            ABILITY: 0,
            MEMORIA: []
          },
          {
            SKILL: 0,
            ABILITY: 0,
            MEMORIA: []
          },
          {
            SKILL: 0,
            ABILITY: 0,
            MEMORIA: []
          }], w = {
            SKILL: c,
            ABILITY: t
          }, r = {
            SKILL: d,
            ABILITY: n
          }, u = {
            SKILL: 0,
            ABILITY: 0
          }, v = function(a, b)
          {
            return b.charaIds ? -1 < b.charaIds.indexOf(a) ? !0 : !1 : !0
          }, x = p = 0; 4 > p;) g.each(a.userCardObj, function(a, b)
        {
          a && a.revision >= p && (r.SKILL[0] || r.ABILITY[0] ? f(a, x) : w[q[p]][0] && e(a, x));
          x = x + 1 | 0
        }), p = p + 1 | 0, x = 0;
        return l.deckDataCreate(a)
      },
      tabBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          D = a.currentTarget.dataset.mode;
          b.doc.getElementById("deckWrap").className = D;
          for (var c = b.doc.getElementById("tabBtnList").getElementsByClassName("btn"),
              f = c.length, e = 0; e < f; e++) b.removeClass(c[e], "current");
          b.addClass(a.currentTarget, "current");
          a = b.doc.getElementById("bottomWrap");
          a.classList.contains("hide") ? a.className = "" : a.className = "hide";
          b.doc.getElementById("header").className = "";
          m = null;
          this.trigger("reset")
        }
      }
    }),
    y = B.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .copyBtn"] = this.copyBtn;
        a[b.cgti + " .resetBtn"] = this.resetBtn;
        a[b.cgti + " .detailBtn"] = this.detailBtn;
        a[b.cgti + " .formationBtn"] = this.formationBtn;
        a[b.cgti + " .swapBtn"] = this.swapBtn;
        a[b.cgti + " .cancelBtn"] = this.cancelBtn;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.listenTo(this.rootView, "swapMode", this.selectSwapTargetMode);
        this.listenTo(this.rootView, "reset", this.reset);
        this.listenTo(b.storage.userDeckList, "change", this.reRender);
        this.index = a;
        this.deckType = 100 + a;
        this.createDeckModel();
        this.battleStatus = b.secondPartLastInfo.battleInfo["battle" + this.index + "Status"];
        this.enemyModel = b.secondPartLastInfo.enemyInfo.list[Number(this.index - 1)]
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          battleStatus: this.battleStatus,
          deckModel: this.deckModel,
          enemyModel: this.enemyModel
        }));
        this.el.className = "deck " + this.battleStatus;
        return this
      },
      reRender: function()
      {
        this.createDeckModel();
        this.battleStatus = b.secondPartLastInfo.battleInfo["battle" + this.index + "Status"];
        this.render();
        v.getBaseData(b.getNativeObj())
      },
      renderAutoFormation: function()
      {
        var a = g.findWhere(this.rootView.autoFormationDeckModelArr,
          {
            deckType: this.deckType
          }),
          a = a ? a : this.deckModel;
        this.$el.html(this.template(
        {
          battleStatus: this.battleStatus,
          deckModel: a,
          enemyModel: this.enemyModel
        }));
        this.el.className = "deck " + this.battleStatus;
        return this
      },
      createDeckModel: function()
      {
        var a = b.storage.userDeckList.findWhere(
        {
          deckType: this.deckType
        });
        if (a)
        {
          var a = l.deckDataCreate(a.toJSON()),
            c = String(a.leaderPos),
            f = a.posArr.indexOf(c);
          a.posArr.splice(f, 1);
          a.posArr.unshift(c)
        }
        else a = {
          deckType: this.deckType,
          formationSheetId: 111,
          formationSheet: g.findWhere(b.storage.userFormationSheetList.toJSON(),
          {
            formationSheetId: 111
          }).formationSheet,
          name: "チーム" + String(this.deckType).slice(-1)
        }, a = l.deckDataCreate(a);
        this.deckModel = a
      },
      resetBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = function()
        {
          var a = function(a)
          {
            b.responseSetStorage(a);
            this.rootView.autoFormationDeckModelArr = null;
            this.battleStatus = "CANPLAY";
            b.secondPartLastInfo.battleInfo["battle" + this.index + "Status"] = this.battleStatus;
            b.removeClass(this.el, "CONQUERED");
            b.addClass(this.el, this.battleStatus);
            b.secondPartLastInfo.battleInfo.battle5Status = "LOCK";
            a = b.doc.getElementById("deckWrap").getElementsByClassName("deck")[4];
            b.removeClass(a, "CANPLAY");
            b.addClass(a, "LOCK");
            b.g_popup_instance.remove()
          }.bind(this);
          q.ajaxPost(b.linkList.secondPartLastUnconquered,
          {
            questBattleId: Number(String(b.secondPartLastInfo.sectionId) + String(this.index))
          }, a)
        }.bind(this), new b.PopupClass(
        {
          title: "制圧中",
          content: "制圧状態を解除し、再度制圧前の状態に戻せます。<br /><br /><span class='attention'>※解除後は再度制圧をする必要があります。<br />※制圧に参加した魔法少女を再編成できます。</span>",
          closeBtnText: "閉じる",
          decideBtnText: "解除する",
          decideBtnEvent: a,
          popupType: "typeC"
        }))
      },
      detailBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || F.detailPop(b.secondPartLastInfo.enemyInfo, b.secondPartLastInfo.battleInfo, this.index - 1)
      },
      copyBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = function()
        {
          b.copyDeckType = this.deckType;
          location.href = "#/DeckFormation/secondPartLastCopy"
        }.bind(this), new b.PopupClass(
        {
          title: "クエスト編成コピー",
          content: "鏡の魔女との戦いには専用の編成が必要です。<br>クエスト編成をコピーして編成を行いますか？",
          closeBtnText: "とじる",
          decideBtnText: "編成コピー",
          decideBtnEvent: a,
          popupType: "typeA"
        }))
      },
      formationBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.currentSecondPartLastDeckType = this.deckType, b.exterminationQuestBattleId = Number(String(b.secondPartLastInfo.sectionId) + String(this.index)), location.href = "#/DeckFormation/secondPartLast")
      },
      swapBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
          if (m)
          {
            n[1] = !1;
            for (a = 1; 11 > a; a++)
              if (this.deckModel["rentalPieceSetId" + a])
              {
                n[1] = !0;
                break
              } n[0] || n[1] ? (a = function()
            {
              this.swapFunc(this);
              b.g_popup_instance.popupView.close()
            }.bind(this), new b.PopupClass(
            {
              title: "チーム編成入れ替え",
              content: "編成にレンタルメモリアセットが含まれています。<br>入れ替えるとレンタルメモリアセットが解除されますがよろしいですか？",
              closeBtnText: "キャンセル",
              decideBtnText: "OK",
              decideBtnEvent: a,
              popupType: "typeA"
            })) : this.swapFunc(this)
          }
        else
        {
          n = [];
          for (a = 1; 11 > a; a++)
            if (this.deckModel["rentalPieceSetId" + a])
            {
              n[0] = !0;
              break
            } m = this.deckType;
          this.rootView.trigger("swapMode");
          b.doc.getElementById("header").className = "swapSelectTarget"
        }
      },
      swapFunc: function(a)
      {
        a = (a = b.storage.userDeckList.findWhere(
        {
          deckType: m
        })) ? g.clone(a.toJSON()) :
        {
          deckType: this.deckType,
          formationSheetId: 111,
          formationSheet: g.findWhere(b.storage.userFormationSheetList.toJSON(),
          {
            formationSheetId: 111
          }).formationSheet,
          name: "チーム" + String(this.deckType).slice(-1)
        };
        a = l.deckDataCreate(a);
        var c = g.clone(this.deckModel);
        c.deckType = a.deckType;
        a.deckType = this.deckType;
        var f = {
          userDeckList: []
        };
        f.userDeckList.push(l.savePrmCreate(a, "notRentalData"));
        f.userDeckList.push(l.savePrmCreate(c, "notRentalData"));
        q.ajaxPost(b.linkList.userDeckBulkSave, f, function(a)
        {
          b.responseSetStorage(a);
          b.SecondPartLastBattleConfirmModel && (b.SecondPartLastBattleConfirmModel.deckInfo = b.SecondPartLastBattleConfirmModel.getUserDeck(
          {
            index: b.SecondPartLastBattleConfirmModel.index - 1
          }));
          m = null;
          b.doc.getElementById("header").className = ""
        })
      },
      cancelBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (m = null, b.doc.getElementById("header").className = "", this.rootView.trigger("reset"))
      },
      selectSwapTargetMode: function()
      {
        if (this.deckType == m) b.addClass(this.el, "base");
        else
        {
          b.addClass(this.el, "target");
          var a = this.el.getElementsByClassName("swapBtn")[0];
          a.className = "swapBtn btn b_yellow se_decide TE";
          a.innerHTML = "このチームに<br>入れ替え"
        }
      },
      reset: function()
      {
        b.removeClass(this.el, "base");
        b.removeClass(this.el, "target");
        var a = this.el.getElementsByClassName("swapBtn")[0];
        a.innerHTML = "入れ替え";
        a.className = "swapBtn btn b_white se_decide TE"
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    J = function()
    {
      b.setStyle(H);
      v.changeBg("web_secondPartLastBattle_21188.ExportJson");
      C.createCardList();
      l = new I("secondPartLast");
      for (var a = [], c = 1; 5 >= c; c++)
      {
        var f = 100 + c;
        g.findWhere(b.storage.userDeckList.toJSON(),
        {
          deckType: f
        }) || a.push(f)
      }
      if (a.length)
      {
        for (var f = function(a)
            {
              b.responseSetStorage(a);
              u = new E
            }.bind(this), e = {
              userDeckList: []
            },
            c = 0; c < a.length; c++)
        {
          var d = {
              deckType: a[c],
              formationSheetId: 111,
              formationSheet: g.findWhere(b.storage.userFormationSheetList.toJSON(),
              {
                formationSheetId: 111
              }).formationSheet,
              name: "チーム" + String(a[c]).slice(-1)
            },
            d = l.deckDataCreate(d);
          e.userDeckList.push(l.savePrmCreate(d))
        }
        q.ajaxPost(b.linkList.userDeckBulkSave, e, f)
      }
      else u = new E
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
      id: "pieceList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "titleList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
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
      id: "userFormationSheetList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      b.secondPartLastInfo ? q.pageModelGet(this.needModelIdObj, null, "noConnect") : location.href = "#/SecondPartLastRouter"
    },
    init: function()
    {
      b.currentSecondPartLastDeckType = "";
      var a = ["MainQuest", "SecondPartLastRouter"];
      0 <= b.historyArr.indexOf("SecondPartLastBattleConfirm") && a.push("SecondPartLastBattleConfirm");
      a.push("SecondPartLastFormation");
      b.historyArr = a;
      J()
    },
    remove: function(a)
    {
      u && (u.trigger("removeChildView"), u.remove());
      b.firstLoad && (b.firstLoad = null);
      m = D = l = null;
      n && (n = null);
      a()
    }
  }
});
