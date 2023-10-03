define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/campaign/box_gacha/CampaignBoxGachaTop.html text!css/campaign/box_gacha/CampaignBoxGachaTop.css js/memoria/MemoriaPopup js/card/CardPopup".split(" "), function(e, r, b, p, g, C, D, E, F, G)
{
  var w = r.Model.extend(
    {}),
    n = new w(
    {}),
    h, l, t, q, x, m, H = r.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .live2dArea"] = this.touch;
        a[b.cgti + " #helpBtn"] = this.helpPopup;
        return a
      },
      initialize: function(a)
      {
        this.l2dTouchCnt = 0;
        z.prototype.parentView = this;
        this.cpId = l.id;
        this.template = e.template(D);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: l
        }));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        g.setWebView();
        var a = new z(
        {
          model: n
        });
        b.doc.querySelector("#CampaignBoxGachaTop").appendChild(a.render().el);
        b.ready.hide();
        u(!0)
      },
      touch: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled() && m)
        {
          a = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0] : a.originalEvent;
          a = {
            id: m,
            x: a.pageX,
            y: a.pageY
          };
          var c = [32, 33, 34, 35, 36, 37, 38, 39];
          7 <= this.l2dTouchCnt && c.push(40);
          var c = c[Math.floor(Math.random() * c.length)] + 1,
            f = m.substring(0, m.length - 2);
          a.voice = "vo_char_" + f + "_00_" + c;
          g.storyMotionL2dVoice(a);
          this.l2dTouchCnt++
        }
      },
      helpPopup: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          b.tapBlock(!0);
          var c = this,
            f = 6E4 * ((new Date).getTime() / 6E4 | 0);
          require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + f, "text!json/announcements/announcements.json?bust=" + f], function(f, k, e, g)
          {
            new b.PopupClass(
            {
              title: "お知らせ",
              exClass: "announcementPopup",
              announce: !0
            }, k, function()
            {
              setTimeout(function()
              {
                b.tapBlock(!1)
              }, 500)
            }, function()
            {
              c.announceView && c.announceView.trigger("removeView")
            });
            c.announceView = new f(
            {
              bannerJson: e,
              announcementJson: g,
              targetCampaign: Number(a.currentTarget.dataset.cpid)
            })
          })
        }
      }
    }),
    z = r.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .gachaContentsBtn"] = this.gachaContentsPop;
        a[b.cgti + " .nextGachaBtn"] = this.gachaReset;
        return a
      },
      initialize: function(a)
      {
        A.prototype.parentView = this;
        y.prototype.parentView = this;
        B.prototype.parentView = this;
        this.template = e.template($("#GachaTemp").text());
        this.boxGachaContentView = null;
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        this.createGachaBtn();
        return this
      },
      createGachaBtn: function()
      {
        var a = b.doc.createDocumentFragment(),
          c = this.model.get("gachaSchedule");
        e.each(c.gachaKindList, function(b)
        {
          b = new y(
          {
            model: b
          });
          a.appendChild(b.render().el)
        });
        this.el.querySelector("#gachaBtnWrap").appendChild(a);
        c = (c = b.storage.userItemList.findWhere(
        {
          itemId: l.parameterMap.CAMPAIGN_ITEM_ID
        })) ? c.toJSON().quantity : 0;
        this.el.querySelector("#hasItemNumWrap .hasNum").innerText = c
      },
      gachaContentsPop: function(a)
      {
        a.preventDefault();
        b.isScrolled() || new b.PopupClass(
        {
          title: "ボックス内容一覧",
          popupType: "typeB",
          exClass: "boxContentsPop"
        }, null, function()
        {
          this.boxGachaContentView = new B(
          {
            model: new w(this.model.toJSON()),
            gachaScheduleList: h.gachaScheduleList
          });
          b.doc.querySelector("#popupArea .popupTextArea").appendChild(this.boxGachaContentView.render().el);
          g.getBaseData(b.getNativeObj());
          b.scrollSet("popScrollOuter", "popScrollInner")
        }.bind(this), function()
        {
          this.boxGachaContentView.remove();
          this.boxGachaContentView = null
        }.bind(this))
      },
      gachaReset: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("off") || new b.PopupClass(
        {
          title: "ボックス内容の変更",
          content: "ボックス内の目玉報酬を獲得したため、次のボックスへの変更が可能です。<br>ボックス内容をリセットして次のボックスに変更しますか？<span class='caution c_red'>※現在のボックス内の報酬アイテムは引くことができなくなります。</span>",
          exClass: "gachaResetPop",
          decideBtnText: "変更する",
          decideBtnEvent: function(a)
          {
            a.preventDefault();
            b.isScrolled() || (a = {
              gachaScheduleId: this.model.toJSON().gachaSchedule.id
            }, p.ajaxPost(b.linkList.campaignBoxGachaReset, a, function()
            {
              var a = function(a)
              {
                h.gachaScheduleList = a.gachaScheduleList;
                h.userGachaGroupList = a.userGachaGroupList;
                a = v(a);
                n.clear(
                {
                  silent: !0
                });
                n.set(a);
                b.g_popup_instance.popupView.close()
              }.bind(this);
              p.ajaxSimpleGet(b.linkList.CampaignBoxGachaTopPage, "", a)
            }))
          }.bind(this),
          closeBtnText: "キャンセル"
        })
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
      }
    }),
    B = r.View.extend(
    {
      initialize: function(a)
      {
        this.gachaScheduleList = a.gachaScheduleList;
        this.template = e.template($("#GachaContentTemp").text());
        this.count = 0;
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " .arrowRight"] = this.arrow;
        a[b.cgti + " .arrowLeft"] = this.arrow;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        1 === this.gachaScheduleList.length ? (b.addClass(this.el.querySelector(".arrowLeft"), "hide"), b.addClass(this.el.querySelector(".arrowRight"), "hide")) : (0 === this.count ? b.addClass(this.el.querySelector(".arrowLeft"), "hide") : b.removeClass(this.el.querySelector(".arrowLeft"), "hide"), this.count === this.gachaScheduleList.length - 1 ? b.addClass(this.el.querySelector(".arrowRight"), "hide") : b.removeClass(this.el.querySelector(".arrowRight"), "hide"));
        return this
      },
      arrow: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a.currentTarget.classList.contains("arrowRight") ? this.count < this.gachaScheduleList.length - 1 && this.count++ : 0 < this.count && this.count--, 0 === this.count ? (this.model.clear(
        {
          silent: !0
        }), this.model.set(e.clone(this.parentView.model.toJSON())), g.getBaseData(b.getNativeObj()), b.scrollSet("popScrollOuter", "popScrollInner")) : p.ajaxPost(b.linkList.campaignBoxGachaGetList,
        {
          gachaScheduleId: this.gachaScheduleList[this.count].id
        }, function(a)
        {
          a = {
            gachaScheduleList: this.gachaScheduleList,
            userGachaBoxList: 0 === this.count ? this.model.toJSON().userGachaBoxList : a.gachaBoxSetList
          };
          a = e.clone(v(a));
          0 < this.count && (a.gachaSchedule = this.gachaScheduleList[this.count]);
          this.model.clear(
          {
            silent: !0
          });
          this.model.set(a);
          g.getBaseData(b.getNativeObj());
          b.scrollSet("popScrollOuter", "popScrollInner")
        }.bind(this)))
      }
    }),
    y = r.View.extend(
    {
      className: function()
      {
        var a = "gachaBtn TE se_decide";
        "CAMPAIGN_BOX10" === this.model.beanKind && 10 > n.toJSON().gachaBoxRemainCount && (a += " off");
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti] = this.gachaPopup;
        return a
      },
      initialize: function(a)
      {
        this.drawFlg = !1;
        this.template = e.template($("#GachaBtnTemp").text());
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      gachaPopup: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled() && (x = a = this.model, !this.checkCapacity() && !this.checkGachaPoint()))
        {
          var c = e.template($("#GachaStartPop").text())(
          {
            model: a,
            gachaModel: this.parentView.model.toJSON()
          });
          new b.PopupClass(
          {
            title: a.name,
            content: c,
            decideBtnText: "ガチャを引く",
            decideBtnEvent: function(a)
            {
              a.preventDefault();
              b.isScrolled() || (b.g_popup_instance.popupView.close(), this.gachaStart(a))
            }.bind(this),
            closeBtnText: "キャンセル",
            exClass: "gachaPop"
          }, null, function() {})
        }
      },
      checkCapacity: function()
      {
        var a = b.storage.userPieceList.toJSON().length;
        if (0 >= b.storage.gameUser.get("cardCapacity") + 100 - a) return new b.PopupClass(
        {
          title: this.model.name,
          content: "所持可能なメモリアの上限を100枠以上超えています。<br>メモリアの所持枠を空けてください。",
          decideBtnText: "メモリアへ",
          decideBtnLink: "#/MemoriaTop",
          closeBtnText: "キャンセル",
          exClass: "gachaTxtPop"
        }), !0
      },
      checkGachaPoint: function()
      {
        var a = this.parentView.model.toJSON().userUseItem.quantity,
          c = this.model.needQuantity;
        if (c > a)
        {
          var f = this.model,
            a = e.template($("#GachaCautionPop").text())(
            {
              model: f,
              gachaModel: this.parentView.model.toJSON(),
              needItemNum: c - a
            });
          new b.PopupClass(
          {
            title: f.name,
            content: a,
            decideBtnEvent: function(a)
            {
              a.preventDefault();
              b.isScrolled() || (b.g_popup_instance.popupView.close(), location.href = "#/MainQuest")
            }.bind(this),
            closeBtnText: "閉じる",
            exClass: "gachaPop cautionPop"
          });
          return !0
        }
      },
      gachaStart: function(a)
      {
        a.preventDefault();
        b.isScrolled() || I.bind(this)()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    A = r.View.extend(
    {
      className: function()
      {
        var a = "resultWrap";
        1 === this.model.drawItemList.length && (a += " singleDraw");
        1024 !== b.displayWidth && (a += " iPhoneX");
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti] = this.animSkip;
        a[b.cgti + " #resultCloseBtn"] = this.closeResult;
        a[b.cgti + " .drawItem"] = this.detailPopup;
        a["webkitAnimationEnd .drawItem"] = this.animationTrigger;
        a["webkitanimationend .drawItem"] = this.animationTrigger;
        a["animationend .drawItem"] = this.animationTrigger;
        a["webkitAnimationEnd .rainforcedDrawItem"] = this.animationTrigger2nd;
        a["webkitanimationend .rainforcedDrawItem"] = this.animationTrigger2nd;
        a["animationend .rainforcedDrawItem"] = this.animationTrigger2nd;
        return a
      },
      initialize: function(a)
      {
        this.chestDrop = !1;
        this.getCharaIdArr = [];
        this.getStickerArr = [];
        this.bonusRewardCode = [];
        e.each(this.model.gachaModel.userGachaBoxList, function(a)
        {
          a.gachaBoxSet.bonusFlg && this.bonusRewardCode.push(a.gachaBoxSet.rewardCode)
        }.bind(this));
        e.each(this.model.drawItemList, function(a)
        {
          if (-1 < a.rewardCode.indexOf("_STICKER_")) console.log("stickerDraw", a), this.getStickerArr.push(a);
          else if (-1 !== this.bonusRewardCode.indexOf(a.rewardCode) && a.isNew && -1 !== a.rewardCode.indexOf("CARD_"))
          {
            var b = e.clone(this.model.drawItemList),
              b = b.filter(function(a)
              {
                return -1 !== a.rewardCode.indexOf("CARD_")
              });
            this.getCharaIdArr = function()
            {
              var a = [];
              e.each(b, function(b)
              {
                console.log("model.rewardData.itemData:", b);
                a.push(b.rewardData.itemData.cardModel.card.charaNo)
              });
              return a
            }()
          }
        }.bind(this));
        this.template = e.template($("#GachaResult").text());
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template());
        (0 === this.model.gachaModel.gachaBoxRemainCount || "CAMPAIGN_BOX10" === this.model.gachaPrm.gachaBeanKind && 10 > this.model.gachaModel.gachaBoxRemainCount) && b.addClass(this.el.querySelector(".resultBtnWrap"), "singleBtn");
        return this
      },
      animationTrigger: function(a)
      {
        switch (a.originalEvent.animationName)
        {
          case "chestDrop":
            if (!this.chestDrop)
            {
              this.chestDrop = !0;
              var c = b.doc.querySelectorAll(".drawItemWrap .drawItem"),
                f = 0,
                d = c.length - 1;
              this.dropEndTimer = setTimeout(function()
              {
                this.chestOpentimer = setInterval(function()
                {
                  b.addClass(c[f], "open");
                  setTimeout(function()
                  {
                    g.startSe(1604)
                  }, 370);
                  d == f ? (clearTimeout(this.dropEndTimer), clearInterval(this.chestOpentimer), this.chestOpentimer = this.dropEndTimer = null, this.stickerCheck(88 * (d + 8))) : f++
                }.bind(this), 160)
              }.bind(this), 80)
            }
            break;
          case "chestOpen_item":
            a.currentTarget.classList.contains("bonus") && b.addClass(a.currentTarget.querySelector(".backEffect"), "anim")
        }
      },
      stickerCheck: function(a)
      {
        this.stickerGetTimer && (clearTimeout(this.stickerGetTimer), this.stickerGetTimer = null);
        var c = b.doc.getElementById("rainforcedApper");
        this.stickerGetTimer = setTimeout(function()
        {
          b.addClass(c, "disp");
          c.getElementsByClassName("rainforcedStickerDom")[0] && c.removeChild(c.getElementsByClassName("rainforcedStickerDom")[0]);
          if (0 < this.getStickerArr.length)
          {
            $("#rainforcedApper").on(b.cgti, function(a)
            {
              this.getStickerArr = []
            }.bind(this));
            var a = this.getStickerArr[0],
              d = e.template($("#RainforceApperStickerTemp").text()),
              k = b.doc.createElement("div");
            k.className = "rainforcedStickerDom";
            k.innerHTML = d(
            {
              drawModel: a,
              bonus: this.bonusRewardCode
            });
            c.appendChild(k);
            setTimeout(function()
            {
              g.startSe(1604)
            }, 580);
            this.getStickerArr.splice(0, 1)
          }
          else b.removeClass(c, "disp"), 0 < this.getCharaIdArr.length ? this.charaGetAnimation(0) : (b.addClass(b.doc.querySelector(".boxRemainWrap"), "show"), b.addClass(b.doc.querySelector(".resultBtnWrap"), "show"), this.compFlg = !0)
        }.bind(this), a)
      },
      animationTrigger2nd: function()
      {
        setTimeout(function()
        {
          this.stickerCheck(0)
        }.bind(this), 500)
      },
      animSkip: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("animSkip") || this.compFlg || (b.doc.querySelectorAll(".drawItemWrap .drawItem"), clearTimeout(this.dropEndTimer), clearInterval(this.chestOpentimer), this.chestOpentimer = this.dropEndTimer = null, b.addClass(b.doc.querySelector(".resultWrap"), "animSkip"), this.stickerCheck())
      },
      charaGetAnimation: function(a)
      {
        this.charaGetTimer && (clearTimeout(this.charaGetTimer), this.charaGetTimer = null);
        this.charaGetTimer = setTimeout(function()
        {
          g.endL2d();
          g.stopVoice();
          b.androidKeyStop = !0;
          var a = this.getCharaIdArr[0];
          this.getCharaIdArr.length = 0;
          $(b.ready.target).on("webkitAnimationEnd", function()
          {
            g.changeBg("web_black.jpg");
            $(b.ready.target).off();
            $(b.ready.target).on("webkitAnimationEnd", function(a)
            {
              "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
            });
            $("#commandDiv").on("nativeCallback", function(a, c)
            {
              $("#commandDiv").off();
              b.ready.target.className = "nativeFadeOut";
              g.startBgm(b.bgm);
              g.changeBg(b.background);
              g.setWebView(!0);
              u();
              b.addClass(b.doc.querySelector(".boxRemainWrap"), "show");
              b.addClass(b.doc.querySelector(".resultBtnWrap"), "show");
              this.compFlg = !0
            }.bind(this));
            setTimeout(function()
            {
              g.setWebView(!1);
              g.stopBgm();
              g.playCharaMovie(a);
              window.isBrowser && $("#commandDiv").trigger("nativeCallback")
            }, 500)
          }.bind(this));
          b.addClass(b.ready.target, "preNativeFadeIn")
        }.bind(this), a)
      },
      detailPopup: function(a)
      {
        if (this.compFlg && (a.preventDefault(), !b.isScrolled()))
        {
          var c = b.doc.querySelector(".resultWrap"),
            f = function()
            {
              b.addClass(c, "animSkip");
              b.addClass(c, "hide")
            },
            d = function()
            {
              b.removeClass(c, "hide")
            },
            k = a.currentTarget.dataset.typeId.split("_");
          if (-1 < k[0].indexOf("card"))
          {
            var k = b.storage.userCardList.findWhere(
              {
                cardId: k[1] | 0
              }).toJSON(),
              e = b.storage.userCharaList.findWhere(
              {
                charaId: k.card.charaNo
              }).toJSON(),
              k = C.addExStatus($.extend(k, e));
            G.instantPopup(a, k, d);
            f()
          }
          else - 1 < k[0].indexOf("memoria") && (k = b.storage.userPieceList.findWhere(
          {
            id: k[1]
          }).toJSON(), k.closeEvent = d, F.instantPopup(a, k), f())
        }
      },
      closeResult: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = function(a)
          {
            a = v(a);
            n.clear(
            {
              silent: !0
            });
            n.set(a);
            this.btnView.removeView();
            this.removeView();
            b.androidKeyStop = !1;
            u(!0)
          }.bind(this);
          a = function(a)
          {
            0 === this.model.gachaModel.gachaBoxRemainCount ? (h.gachaScheduleList = a.gachaScheduleList, h.userGachaGroupList = a.userGachaGroupList, c(a), new b.PopupClass(
            {
              title: this.model.gachaModel.name,
              content: "ボックス内のすべてのアイテムを獲得したため、<br>ボックス内容をリセットして、次のボックスに変更しました。",
              closeBtnText: "閉じる"
            })) : c(a)
          }.bind(this);
          p.ajaxSimpleGet(b.linkList.CampaignBoxGachaTopPage, "", a)
        }
      },
      removeView: function()
      {
        clearTimeout(this.dropEndTimer);
        clearInterval(this.chestOpentimer);
        this.chestOpentimer = this.dropEndTimer = null;
        this.off();
        this.remove()
      }
    }),
    I = function()
    {
      if (!this.drawFlg)
      {
        this.drawFlg = b.androidKeyStop = !0;
        var a = e.clone(this.parentView.model.toJSON()),
          c = {
            gachaBeanKind: this.model.beanKind,
            gachaScheduleId: this.model.gachaScheduleIds | 0
          };
        $("#popupArea").on(b.cgti, "#resultCodeError .popupCloseBtn", function(a)
        {
          a.preventDefault();
          b.isScrolled() || ($("#popupArea").off(), g.nativeReload("#/CampaignBoxGachaTop"))
        });
        b.g_popup_instance.popupView.close();
        var f = function(d)
        {
          b.responseSetStorage(d);
          this.parentView.model.unset("userUseItem",
          {
            silent: !0
          });
          this.parentView.model.set(e.clone(J()));
          var k = [];
          d.userPieceList && e.each(d.userPieceList, function(a, b)
          {
            b = {};
            b.id = a.id;
            b.pieceId = a.pieceId;
            k.push(b)
          });
          d = d.gachaAnimation.gachaResultList;
          var f = [],
            h = d.length;
          e.each(d, function(a)
          {
            a = e.clone(a);
            var c = a.rewardCode;
            a.rewardData = {};
            if (-1 < c.indexOf("_STICKER_"))
            {
              a.rewardData.rewardType = "sticker";
              a.rewardData.itemData = {};
              for (var d = c.split("_"), c = "", g = d.length - 1, h = 1; h < g; h++) "" !== c && (c += "_"), c += d[h];
              console.log(b.storage.itemList.findWhere(
              {
                itemCode: c
              }));
              a.rewardData.itemData = b.storage.itemList.findWhere(
              {
                itemCode: c
              }).toJSON()
            }
            else a.rewardData.rewardType = -1 < c.indexOf("GIFT_") ? "gift" : -1 < c.indexOf("LIVE2D_") ? "live2d" : -1 < c.indexOf("DOPPEL_") ? "doppel" : -1 < c.indexOf("GEM_") ? "gem" : -1 < c.indexOf("CARD") ? "card" : -1 < c.indexOf("PIECE_") ? "memoria" : "main", a.rewardData.itemData = b.itemSet(c); - 1 < c.indexOf("CARD") && a.itemId && -1 < a.itemId.indexOf("LIMIT_BREAK_CHARA") && (a.rewardData.isLimitBreak = !0); - 1 < c.indexOf("PIECE_") ? (d = e.findWhere(k,
            {
              pieceId: c.split("_")[1] | 0
            }), c = "memoria_" + d.id, k.splice(e.findIndex(k, d), 1)) : c = c.toLowerCase();
            a.rewardData.typeId = c;
            f.push(a)
          });
          a.gachaBoxRemainCount -= h;
          a.name = this.model.name;
          this.parentView.model.set("gachaBoxRemainCount", a.gachaBoxRemainCount);
          d = {
            gachaPrm: c,
            drawItemList: f,
            gachaModel: a
          };
          q && (q.btnView.removeView(), q.removeView(), q = null);
          q = new A(
          {
            model: d
          });
          b.doc.querySelector("#overlapContainer").appendChild(q.render().el);
          g.startSe(1603);
          q.btnView = new y(
          {
            model: x,
            el: b.doc.querySelector("#resultOnceBtn")
          });
          g.getBaseData(b.getNativeObj());
          this.drawFlg = !1
        }.bind(this);
        p.ajaxPost(b.linkList.gachaResult, c, f)
      }
    },
    v = function(a)
    {
      h.gachaScheduleList = function()
      {
        var a = [],
          b = !1;
        e.each(h.gachaScheduleList, function(c)
        {
          if (!b && c.enable || b) b = !0, a.push(c)
        });
        return a
      }();
      var c = e.sortBy(a.userGachaBoxList, function(a)
      {
        return a.displayOrder || a.gachaBoxSet.displayOrder
      });
      a = h.itemList;
      var f = b.storage.userItemList.toJSON(),
        d = {};
      e.each(h.gachaScheduleList, function(a)
      {
        a.enable && (d.gachaSchedule = a)
      });
      c = K(c);
      d.gachaBoxMaxCount = c.gachaBoxMaxCount;
      d.gachaBoxRemainCount = c.gachaBoxRemainCount;
      d.userGachaBoxList = c.userGachaBoxList;
      d.isBoxBonus = c.isBoxBonus;
      d.useItem = e.findWhere(a,
      {
        itemCode: l.parameterMap.CAMPAIGN_ITEM_ID
      });
      console.log("useItem", e.findWhere(a,
      {
        itemCode: l.parameterMap.CAMPAIGN_ITEM_ID
      }));
      d.userUseItem = e.findWhere(f,
      {
        itemId: l.parameterMap.CAMPAIGN_ITEM_ID
      }) ||
      {
        quantity: 0
      };
      d.boxGachaNum = h.userGachaGroupList.length ? h.userGachaGroupList[0].resetCount + 1 : 1;
      return d
    },
    K = function(a)
    {
      var b = {},
        f = 0,
        d = 0;
      b.isBoxBonus = !0;
      var g = !1,
        h = 0;
      e.each(a, function(a)
      {
        f += a.gachaBoxSet ? a.gachaBoxSet.count : a.count;
        d += a.gachaBoxSet ? a.gachaBoxSet.count - a.count : a.count;
        a.gachaBoxSet && a.gachaBoxSet.bonusFlg && (g = !0, h += a.gachaBoxSet.count - a.count)
      });
      g && 0 == h && (b.isBoxBonus = !1);
      b.gachaBoxMaxCount = f;
      b.gachaBoxRemainCount = d;
      b.userGachaBoxList = a;
      return b
    },
    J = function()
    {
      var a = {},
        c = b.storage.userItemList.toJSON();
      a.userUseItem = e.findWhere(c,
      {
        itemId: l.parameterMap.CAMPAIGN_ITEM_ID
      }) ||
      {
        quantity: 0
      };
      return a
    },
    u = function(a)
    {
      g.endL2d();
      var c = {
        type: 0
      };
      c.id = m;
      c.x = 200;
      c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
      if (m)
      {
        var f = m.substring(0, m.length - 2);
        if (a)
        {
          c.type = 0;
          a = "vo_char_" + f + "_" + m.substring(m.length - 2, m.length) + "_";
          var f = [],
            d = Number(h.currentTime.split(" ")[1].split(":")[0]),
            e = Number(h.currentTime.split(" ")[1].split(":")[1]);
          6 <= d && 9 >= d && !(9 == d && 0 < e) ? f.push(24) : 11 <= d && 13 >= d && !(13 == d && 0 < e) ? f.push(25) : 17 <= d && 19 >= d && !(19 == d && 0 < e) ? f.push(26) : (22 <= d || 0 == d && !(0 == d && 0 < e)) && f.push(27);
          f.push(28);
          f.push(23);
          b.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON().point >= b.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON().point && f.push(29);
          b.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON().point >= b.storage.userStatusList.findWhere(
          {
            statusId: "MAX_BTP"
          }).toJSON().point && f.push(30);
          c.key = a + (f[Math.floor(Math.random() * f.length)] + 1)
        }
        else c.type = 1, c.key = "idle"
      }
      g.startL2d(c)
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
      id: "giftList"
    },
    {
      id: "itemList"
    },
    {
      id: "pieceList"
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
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      h = p.getPageJson();
      l = e.findWhere(h.campaignList,
      {
        campaignType: "BOX_GACHA"
      });
      m = l.parameterMap.LIVE2D_ID;
      if (l.parameterMap && l.parameterMap.BGM && l.parameterMap.BG_IMG)
      {
        var a = l.parameterMap.BGM;
        g.changeBg(l.parameterMap.BG_IMG + ".ExportJson");
        g.startBgm(a)
      }
      else g.changeBg("web_common.ExportJson"), g.startBgm("bgm01_anime07");
      a = v(h);
      n.set(a);
      b.setStyle(E);
      t = new H
    },
    beforeMovieStart: function()
    {
      t && g.endL2d()
    },
    afterMovieEnd: function()
    {
      t && u()
    },
    remove: function(a)
    {
      g.endL2d();
      t && (t.trigger("removeView"), t.remove(), n && (n.clear(), n = new w(
      {})), x = null);
      a()
    }
  }
});
