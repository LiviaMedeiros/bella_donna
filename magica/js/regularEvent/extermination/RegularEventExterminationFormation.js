define("underscore backbone backboneCommon ajaxControl command js/regularEvent/extermination/view/RegularEventExterminationDifficultyPopupView text!template/regularEvent/extermination/RegularEventExterminationFormation.html text!css/regularEvent/extermination/RegularEventExterminationFormation.css cardUtil DeckUtil".split(" "), function(g, C, b, r, u, G, H, I, D, J)
{
  C.Model.extend();
  var p, v, E, m, l, n = [],
    F = C.View.extend(
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
        this.template = g.template(H);
        this.difficultyModel = g.findWhere(p.eventMaster.regularEventExtermination.difficultyList,
        {
          difficultyId: b.userRegularEventExterminationDifficulty.difficultyId
        });
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          difficultyModel: this.difficultyModel
        }));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.setGlobalView();
        var a = b.doc.createDocumentFragment();
        z.prototype.rootView = this;
        z.prototype.template = g.template($("#deckPartsTemp").text());
        for (var c = 1; 5 >= c; c++)
        {
          var f = new z(c);
          a.appendChild(f.render().el)
        }
        b.doc.getElementById("deckWrap").appendChild(a);
        u.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      allClearBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = function()
        {
          for (var a = {
              formationSheetId: 111,
              formationSheet: g.findWhere(p.userFormationSheetList,
              {
                formationSheetId: 111
              }).formationSheet
            }, a = m.deckDataCreate(a), f = {
              userDeckList: []
            }, e = 1; 5 >= e; e++) "CONQUERED" !== b.userRegularEventExterminationDifficulty["battle" + e + "Status"] && (a.deckType = 70 + e, a.name = "チーム" + String(e), f.userDeckList.push(m.savePrmCreate(a)));
          r.ajaxPost(b.linkList.exterminationBulkSave, f, function(a)
          {
            b.responseSetStorage(a);
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
              }, c = 0; c < this.autoFormationDeckModelArr.length; c++) a.userDeckList.push(m.savePrmCreate(this.autoFormationDeckModelArr[c]));
            console.log(a);
            r.ajaxPost(b.linkList.exterminationBulkSave, a, function(a)
            {
              b.responseSetStorage(a);
              new b.PopupClass(
              {
                title: "魔法少女おまかせ編成",
                content: "魔法少女の編成が完了いたしました。<br><br><div class='c_red'>※メモリアは特別な効果があるものが<br>優先的に装備されます。</div>",
                closeBtnText: "OK",
                popupType: "typeA"
              })
            })
          }.bind(this);
          var c = [];
          new b.PopupClass(
          {
            title: "魔法少女おまかせ編成",
            content: "制圧中の編成以外を以下の編成へと入れ替えます。よろしいですか？<br><div class='c_red'>※メモリアは特別な効果があるものが優先的に装備されます。</div><div id='autoFormationContainer'></div>",
            closeBtnText: "キャンセル",
            decideBtnText: "OK",
            decideBtnEvent: a,
            popupId: "autoFormationPopup",
            popupType: "typeB"
          }, null, function()
          {
            for (var a = b.doc.createDocumentFragment(), e = 1; 5 >= e; e++)
            {
              var d = new z(e);
              a.appendChild(d.renderAutoFormation().el);
              c.push(d)
            }
            b.doc.getElementById("autoFormationContainer").appendChild(a);
            u.getBaseData(b.getNativeObj())
          }, function()
          {
            for (var a = 0; 5 > a; a++) c[a].removeView()
          })
        }
      },
      createAutoFormationDeckModel: function()
      {
        for (var a = [], c = 1; 5 >= c; c++)
          if ("CONQUERED" === b.userRegularEventExterminationDifficulty["battle" + c + "Status"])
          {
            var f = 70 + c,
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
            return 4 <= c.cardId % 10 && 0 > a.indexOf(c.userCardId) && 1 <= c.level
          }).sort(function(a, b)
          {
            if (b.tatalPt < a.tatalPt) return -1;
            if (b.tatalPt > a.tatalPt) return 1
          }), k = [], c = 1; 5 >= c; c++)
          if ("CONQUERED" !== b.userRegularEventExterminationDifficulty["battle" + c + "Status"])
          {
            d = {
              deckType: 70 + c,
              enemyAttribute: this.difficultyModel["enemyAttributeId" + c]
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
            k.push(d)
          } for (c = 0; c < k.length; c++)
        {
          k[c].userCardIdArr = [];
          for (var x = g.filter(e, function(a)
            {
              return a.card.attributeId === k[c].goodAttribute
            }), d = 0; d < x.length; d++) k[c].userCardIdArr.push(x[d].userCardId);
          d = parseInt(e.length / k.length);
          5 < d && (d = 5);
          k[c].userCardIdArr.length > d && (k[c].userCardIdArr.length = d);
          e = e.filter(function(a)
          {
            return !k[c].userCardIdArr.includes(a.userCardId)
          })
        }
        for (c = 0; c < e.length && e[c]; c++) k.sort(function(a, b)
        {
          if (b.userCardIdArr.length < a.userCardIdArr.length) return 1;
          if (b.userCardIdArr.length > a.userCardIdArr.length) return -1
        }), k[0].userCardIdArr.push(e[c].userCardId);
        this.autoFormationDeckModelArr = [];
        b.storage.userPieceList.toJSON();
        for (c = 1; 5 >= c; c++)
          if ("CONQUERED" !== b.userRegularEventExterminationDifficulty["battle" + c + "Status"])
          {
            f = 70 + c;
            e = {
              deckType: f,
              formationSheetId: 111,
              formationSheet: g.findWhere(p.userFormationSheetList,
              {
                formationSheetId: 111
              }).formationSheet,
              name: "チーム" + String(c)
            };
            x = [];
            for (d = 1; 9 >= d; d++) e.formationSheet["placeSkill" + d] && x.push(d);
            f = g.findWhere(k,
            {
              deckType: f
            }).userCardIdArr;
            for (d = 0; 5 > d; d++) f[d] && (e["questPositionId" + String(d + 1)] = x[d], e["userCardId" + String(d + 1)] = f[d], e.questEpisodeUserCardId || (e.questEpisodeUserCardId = f[d]));
            d = m.deckDataCreate(e);
            d = this.memoriaPickup(d, f);
            this.autoFormationDeckModelArr.push(d)
          }
      },
      memoriaPickup: function(a, c)
      {
        function f(b, c)
        {
          var d = r[q];
          if (!(2 <= h[c].ABILITY && 2 <= h[c].SKILL))
          {
            2 <= h[c].ABILITY && (d = "SKILL");
            2 <= h[c].SKILL && (d = "ABILITY");
            var A = "userPieceId" + ("00" + (c + 1)).slice(-2) + (q + 1),
              B = function(f)
              {
                if (!t[d][f])
                  if ("ABILITY" == d)
                    if (t.SKILL[f] && 2 > h[c].SKILL) d = "SKILL";
                    else
                    {
                      e(b, c);
                      return
                    }
                else if ("SKILL" == d)
                  if (t.ABILITY[f] && 2 > h[c].ABILITY) d = "ABILITY";
                  else
                  {
                    e(b, c);
                    return
                  }
                else return;
                var g = t[d][f].pieceId;
                v(b.charaId, t[d][f].piece) && !h[c].MEMORIA.includes(g) ? (a[A] = t[d][f].id + "", h[c].MEMORIA.push(t[d][f].pieceId), t[d].splice(f, 1), u[d]++, h[c][d]++) : B(f + 1 | 0)
              };
            B(0)
          }
        }

        function e(b, c)
        {
          var d = r[q];
          if (!(2 <= h[c].ABILITY && 2 <= h[c].SKILL))
          {
            2 <= h[c].ABILITY && (d = "SKILL");
            2 <= h[c].SKILL && (d = "ABILITY");
            var f = "userPieceId" + ("00" + (c + 1)).slice(-2) + (q + 1),
              A = function(e)
              {
                if (w[d][e])
                {
                  var B = w[d][e].pieceId;
                  v(b.charaId, w[d][e].piece) && !h[c].MEMORIA.includes(B) ? (a[f] = w[d][e].id + "", h[c].MEMORIA.push(w[d][e].pieceId), w[d].splice(e, 1), u[d]++, h[c][d]++) : A(e + 1 | 0)
                }
              };
            A(0)
          }
        }
        var d = b.storage.userPieceList.toJSON();
        for (c = 0; c < d.length; c++) D.memoriaEventCheck(d[c]) && (d[c] = D.memoriaEventCheck(d[c]));
        var k = b.userRegularEventExterminationDifficulty.regularEventId;
        c = [];
        var p = [];
        c = g.filter(d, function(a)
        {
          return "SKILL" === a.piece.pieceType && a.regularEventId !== k
        });
        p = g.filter(d, function(a)
        {
          return "ABILITY" === a.piece.pieceType && a.regularEventId !== k
        });
        c.sort(function(a, b)
        {
          a = a.hp + a.defense;
          b = b.hp + b.defense;
          return a < b ? 1 : a > b ? -1 : 0
        });
        p.sort(function(a, b)
        {
          a = a.hp + a.attack;
          b = b.hp + b.attack;
          return a < b ? 1 : a > b ? -1 : 0
        });
        var l = [],
          n = [];
        if (null != k)
          for (var l = g.filter(d, function(a)
            {
              return a.regularEventId === k
            }), q = 0; q < l.length; q++) n.push(l[q].pieceId);
        d = [];
        n = [];
        d = g.filter(l, function(a)
        {
          return "SKILL" === a.piece.pieceType
        });
        n = g.filter(l, function(a)
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
        var r = ["ABILITY", "SKILL", "ABILITY", "SKILL"],
          h = [
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
          }],
          w = {
            SKILL: c,
            ABILITY: p
          },
          t = {
            SKILL: d,
            ABILITY: n
          },
          u = {
            SKILL: 0,
            ABILITY: 0
          },
          v = function(a, b)
          {
            return b.charaIds ? -1 < b.charaIds.indexOf(a) ? !0 : !1 : !0
          },
          y = q = 0;
        for (console.log(l); 4 > q;) g.each(a.userCardObj, function(a, b)
        {
          a && a.revision >= q && (t.SKILL[0] || t.ABILITY[0] ? f(a, y) : w[r[q]][0] && e(a, y));
          y = y + 1 | 0
        }), q = q + 1 | 0, y = 0;
        console.log("各メモリア", h);
        console.log("_deckModel------", a);
        return m.deckDataCreate(a)
      },
      tabBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          E = a.currentTarget.dataset.mode;
          b.doc.getElementById("deckWrap").className = E;
          for (var c = b.doc.getElementById("tabBtnList").getElementsByClassName("btn"), f = c.length, e = 0; e < f; e++) b.removeClass(c[e], "current");
          b.addClass(a.currentTarget, "current");
          a = b.doc.getElementById("bottomWrap");
          a.classList.contains("hide") ? a.className = "" : a.className = "hide";
          b.doc.getElementById("header").className = "";
          l = null;
          this.trigger("reset")
        }
      }
    }),
    z = C.View.extend(
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
        this.deckType = 70 + a;
        this.createDeckModel();
        this.battleStatus = b.userRegularEventExterminationDifficulty["battle" + this.index + "Status"];
        this.createDom()
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
        this.battleStatus = b.userRegularEventExterminationDifficulty["battle" + this.index + "Status"];
        this.render();
        u.getBaseData(b.getNativeObj())
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
          var a = m.deckDataCreate(a.toJSON()),
            c = String(a.leaderPos),
            f = a.posArr.indexOf(c);
          a.posArr.splice(f, 1);
          a.posArr.unshift(c)
        }
        else a = {
          deckType: this.deckType,
          formationSheetId: 111,
          formationSheet: g.findWhere(p.userFormationSheetList,
          {
            formationSheetId: 111
          }).formationSheet,
          name: "チーム" + String(this.deckType).slice(-1)
        }, a = m.deckDataCreate(a);
        this.deckModel = a
      },
      createDom: function()
      {
        var a = this.rootView.difficultyModel;
        this.enemyModel = {
          enemyId: a["enemyId" + this.index],
          attribute: a["enemyAttributeId" + this.index],
          forces: a["enemyForces" + this.index],
          name: ["第一の結界", "第二の結界", "第三の結界", "第四の結界", "終の結界"][this.index - 1]
        }
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
            b.userRegularEventExterminationDifficulty["battle" + this.index + "Status"] = this.battleStatus;
            b.removeClass(this.el, "CONQUERED");
            b.addClass(this.el, this.battleStatus);
            b.userRegularEventExterminationDifficulty.battle5Status = "LOCK";
            a = b.doc.getElementById("deckWrap").getElementsByClassName("deck")[4];
            b.removeClass(a, "CANPLAY");
            b.addClass(a, "LOCK");
            b.g_popup_instance.remove()
          }.bind(this);
          r.ajaxPost(b.linkList.exterminationUnconquered,
          {
            index: this.index
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
        b.isScrolled() || G.detailPop(this.rootView.difficultyModel, b.userRegularEventExterminationDifficulty, this.index)
      },
      copyBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = function()
        {
          b.copyDeckType = this.deckType;
          location.href = "#/DeckFormation/exterminationCopy"
        }.bind(this), new b.PopupClass(
        {
          title: "クエスト編成コピー",
          content: "殲滅戦には専用の編成が必要です。<br>クエスト編成をコピーして殲滅戦の編成を行いますか？",
          closeBtnText: "とじる",
          decideBtnText: "編成コピー",
          decideBtnEvent: a,
          popupType: "typeA"
        }))
      },
      formationBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.currentExterminationDeckType = this.deckType, b.exterminationQuestBattleId = b.exterminationSectionData + "" + (this.index + "") - 0, location.href = "#/DeckFormation/extermination")
      },
      swapBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
          if (l)
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
            } l = this.deckType;
          this.rootView.trigger("swapMode");
          b.doc.getElementById("header").className = "swapSelectTarget"
        }
      },
      swapFunc: function(a)
      {
        a = (a = b.storage.userDeckList.findWhere(
        {
          deckType: l
        })) ? g.clone(a.toJSON()) :
        {
          deckType: this.deckType,
          formationSheetId: 111,
          formationSheet: g.findWhere(p.userFormationSheetList,
          {
            formationSheetId: 111
          }).formationSheet,
          name: "チーム" + String(this.deckType).slice(-1)
        };
        a = m.deckDataCreate(a);
        var c = g.clone(this.deckModel);
        c.deckType = a.deckType;
        a.deckType = this.deckType;
        var f = {
          userDeckList: []
        };
        f.userDeckList.push(m.savePrmCreate(a, "notRentalData"));
        f.userDeckList.push(m.savePrmCreate(c, "notRentalData"));
        r.ajaxPost(b.linkList.exterminationBulkSave, f, function(a)
        {
          b.responseSetStorage(a);
          l = null;
          b.doc.getElementById("header").className = ""
        })
      },
      cancelBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (l = null, b.doc.getElementById("header").className = "", this.rootView.trigger("reset"))
      },
      selectSwapTargetMode: function()
      {
        if (this.deckType == l) b.addClass(this.el, "base");
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
    K = function()
    {
      b.setStyle(I);
      u.changeBg("web_extermination_top_01.ExportJson");
      u.startBgm("bgm03_story15");
      D.createCardList();
      m = new J("extermination");
      for (var a = [], c = 1; 5 >= c; c++)
      {
        var f = 70 + c;
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
            v = new F
          }.bind(this), e = {
            userDeckList: []
          }, c = 0; c < a.length; c++)
        {
          var d = {
              deckType: a[c],
              formationSheetId: 111,
              formationSheet: g.findWhere(p.userFormationSheetList,
              {
                formationSheetId: 111
              }).formationSheet,
              name: "チーム" + String(a[c]).slice(-1)
            },
            d = m.deckDataCreate(d);
          e.userDeckList.push(m.savePrmCreate(d))
        }
        r.ajaxPost(b.linkList.exterminationBulkSave, e, f)
      }
      else v = new F
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
      r.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.currentExterminationDeckType = "";
      window.isLocal && !b.userRegularEventExterminationDifficulty && (b.userRegularEventExterminationDifficulty = {}, b.userRegularEventExterminationDifficulty.userId = "123456789", b.userRegularEventExterminationDifficulty.regularEventId = 2009, b.userRegularEventExterminationDifficulty.battle1Status = "CANPLAY", b.userRegularEventExterminationDifficulty.battle2Status = "CANPLAY", b.userRegularEventExterminationDifficulty.battle3Status = "CANPLAY", b.userRegularEventExterminationDifficulty.battle4Status = "CANPLAY", b.userRegularEventExterminationDifficulty.battle5Status = "LOCK", b.userRegularEventExterminationDifficulty.cleared = !1, b.userRegularEventExterminationDifficulty.difficultyId = 1);
      p = r.getPageJson();
      var a = g.findWhere(p.regularEventList,
      {
        regularEventType: "EXTERMINATION"
      });
      a ? (p.eventMaster = a, a = ["MyPage", "RegularEventExterminationBattleSelect"], 0 <= b.historyArr.indexOf("RegularEventExterminationBattleConfirm") && a.push("RegularEventExterminationBattleConfirm"), a.push("RegularEventExterminationFormation"), b.historyArr = a, K()) : location.href = "#/MyPage"
    },
    remove: function(a)
    {
      v && (v.trigger("removeChildView"), v.remove());
      b.firstLoad && (b.firstLoad = null);
      l = E = m = null;
      n && (n = null);
      a()
    }
  }
});
