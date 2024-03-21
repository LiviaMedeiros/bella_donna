define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/campaign/box_gacha/CampaignBoxGachaTop.html text!css/campaign/box_gacha/CampaignBoxGachaTop.css js/memoria/MemoriaPopup js/card/CardPopup js/view/item/ItemImgPartsView js/event/EventWitch/Utility".split(" "), function(e, q, b, p, g, G, H, I, J, K, A, L)
{
  var x = q.Model.extend(
    {}),
    l = new x(
    {}),
    k, m, t, r, y, n, N = q.View.extend(
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
        B.prototype.parentView = this;
        this.cpId = m.id;
        this.template = e.template(H);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: m
        }));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        g.setWebView();
        var a = new B(
        {
          model: l
        });
        b.doc.querySelector("#CampaignBoxGachaTop").appendChild(a.render().el);
        b.ready.hide();
        u(!0)
      },
      touch: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled() && n)
        {
          a = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0] : a.originalEvent;
          a = {
            id: n,
            x: a.pageX,
            y: a.pageY
          };
          var c = [32, 33, 34, 35, 36, 37, 38, 39];
          7 <= this.l2dTouchCnt && c.push(40);
          var c = c[Math.floor(Math.random() * c.length)] + 1,
            d = n.substring(0, n.length - 2);
          a.voice = "vo_char_" + d + "_00_" + c;
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
            d = 6E4 * ((new Date).getTime() / 6E4 | 0);
          require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + d, "text!json/announcements/announcements.json?bust=" + d], function(d, h, e, v)
          {
            new b.PopupClass(
            {
              title: "お知らせ",
              exClass: "announcementPopup",
              announce: !0
            }, h, function()
            {
              setTimeout(function()
              {
                b.tapBlock(!1)
              }, 500)
            }, function()
            {
              c.announceView && c.announceView.trigger("removeView")
            });
            c.announceView = new d(
            {
              bannerJson: e,
              announcementJson: v,
              targetCampaign: Number(a.currentTarget.dataset.cpid)
            })
          })
        }
      }
    }),
    B = q.View.extend(
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
        C.prototype.parentView = this;
        z.prototype.parentView = this;
        D.prototype.parentView = this;
        E.prototype.parentView = this;
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
          c = l.toJSON(),
          d = O(
          {
            gachaModel: c
          }),
          f = d.gachaModel.boxGachaNum,
          h = "";
        5 > f && (h = "btnType2");
        var M = this.model.get("gachaSchedule");
        e.each(M.gachaKindList, function(b)
        {
          b.btnClass = h;
          b = new z(
          {
            model: b
          });
          a.appendChild(b.render().el)
        });
        5 <= f && (d = new D(
        {
          model: d.btnModel
        }), a.appendChild(d.render().el));
        this.el.querySelector("#gachaBtnWrap").appendChild(a);
        c = c.userUseItem.quantity;
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
          this.boxGachaContentView = new E(
          {
            model: new x(this.model.toJSON()),
            gachaScheduleList: k.gachaScheduleList
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
                k.gachaScheduleList = a.gachaScheduleList;
                k.userGachaGroupList = a.userGachaGroupList;
                a = w(a);
                l.clear(
                {
                  silent: !0
                });
                l.set(a);
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
    E = q.View.extend(
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
          a = e.clone(w(a));
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
    z = q.View.extend(
    {
      className: function()
      {
        var a = "gachaBtn TE se_decide " + this.model.btnClass;
        "CAMPAIGN_BOX10" === this.model.beanKind && 10 > l.toJSON().gachaBoxRemainCount && (a += " off");
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
        if (!b.isScrolled() && (y = a = this.model, !this.checkCapacity() && !this.checkGachaPoint()))
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
          var d = this.model,
            a = e.template($("#GachaCautionPop").text())(
            {
              model: d,
              gachaModel: this.parentView.model.toJSON(),
              needItemNum: c - a
            });
          new b.PopupClass(
          {
            title: d.name,
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
        b.isScrolled() || P.bind(this)()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    D = q.View.extend(
    {
      className: function()
      {
        var a = "gachaAllBtn TE se_decide";
        this.model.isAllGet && (a += " allGet");
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
        if (!b.isScrolled() && (a = this.model, !this.checkCapacity() && !this.checkGachaPoint()))
        {
          var c = e.template($("#AllGachaStartPop").text())(
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
          var d = this.model,
            a = e.template($("#GachaCautionPop").text())(
            {
              model: d,
              gachaModel: this.parentView.model.toJSON(),
              needItemNum: c - a
            });
          new b.PopupClass(
          {
            title: d.name,
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
        b.isScrolled() || Q.bind(this)()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    C = q.View.extend(
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
          if (-1 < a.rewardCode.indexOf("_STICKER_")) this.getStickerArr.push(a);
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
                d = 0,
                f = c.length - 1;
              this.dropEndTimer = setTimeout(function()
              {
                this.chestOpentimer = setInterval(function()
                {
                  b.addClass(c[d], "open");
                  setTimeout(function()
                  {
                    g.startSe(1604)
                  }, 370);
                  f == d ? (clearTimeout(this.dropEndTimer), clearInterval(this.chestOpentimer), this.chestOpentimer = this.dropEndTimer = null, this.stickerCheck(88 * (f + 8))) : d++
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
              f = e.template($("#RainforceApperStickerTemp").text()),
              h = b.doc.createElement("div");
            h.className = "rainforcedStickerDom";
            h.innerHTML = f(
            {
              drawModel: a,
              bonus: this.bonusRewardCode
            });
            c.appendChild(h);
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
            d = function()
            {
              b.addClass(c, "animSkip");
              b.addClass(c, "hide")
            },
            f = function()
            {
              b.removeClass(c, "hide")
            },
            h = a.currentTarget.dataset.typeId.split("_");
          if (-1 < h[0].indexOf("card"))
          {
            var h = b.storage.userCardList.findWhere(
              {
                cardId: h[1] | 0
              }).toJSON(),
              e = b.storage.userCharaList.findWhere(
              {
                charaId: h.card.charaNo
              }).toJSON(),
              h = G.addExStatus($.extend(h, e));
            K.instantPopup(a, h, f);
            d()
          }
          else - 1 < h[0].indexOf("memoria") && (h = b.storage.userPieceList.findWhere(
          {
            id: h[1]
          }).toJSON(), h.closeEvent = f, J.instantPopup(a, h), d())
        }
      },
      closeResult: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = function(a)
          {
            a = w(a);
            l.clear(
            {
              silent: !0
            });
            l.set(a);
            this.btnView.removeView();
            this.removeView();
            b.androidKeyStop = !1;
            u(!0)
          }.bind(this);
          a = function(a)
          {
            0 === this.model.gachaModel.gachaBoxRemainCount ? (k.gachaScheduleList = a.gachaScheduleList, k.userGachaGroupList = a.userGachaGroupList, c(a), new b.PopupClass(
            {
              title: "ボックス内容の変更",
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
    P = function()
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
        var d = function(d)
        {
          b.responseSetStorage(d);
          this.parentView.model.unset("userUseItem",
          {
            silent: !0
          });
          this.parentView.model.set(e.clone(F()));
          var h = [];
          d.userPieceList && e.each(d.userPieceList, function(a, b)
          {
            b = {};
            b.id = a.id;
            b.pieceId = a.pieceId;
            h.push(b)
          });
          d = d.gachaAnimation.gachaResultList;
          var f = [],
            v = d.length;
          e.each(d, function(a)
          {
            a = e.clone(a);
            var c = a.rewardCode;
            a.rewardData = {};
            if (-1 < c.indexOf("_STICKER_"))
            {
              a.rewardData.rewardType = "sticker";
              a.rewardData.itemData = {};
              for (var d = c.split("_"), c = "", v = d.length - 1, g = 1; g < v; g++) "" !== c && (c += "_"), c += d[g];
              a.rewardData.itemData = b.storage.itemList.findWhere(
              {
                itemCode: c
              }).toJSON()
            }
            else a.rewardData.rewardType = -1 < c.indexOf("GIFT_") ? "gift" : -1 < c.indexOf("LIVE2D_") ? "live2d" : -1 < c.indexOf("DOPPEL_") ? "doppel" : -1 < c.indexOf("GEM_") ? "gem" : -1 < c.indexOf("CARD") ? "card" : -1 < c.indexOf("PIECE_") ? "memoria" : "main", a.rewardData.itemData = b.itemSet(c);
            a.rewardData.itemData.rewardType && "ITEM" == a.rewardData.itemData.rewardType && (a.rewardData.rewardType = "main"); - 1 < c.indexOf("CARD") && a.itemId && -1 < a.itemId.indexOf("LIMIT_BREAK_CHARA") && (a.rewardData.isLimitBreak = !0); - 1 < c.indexOf("PIECE_") && a.rewardData.itemData.rewardType && "PIECE" == a.rewardData.itemData.rewardType ? (d = e.findWhere(h,
            {
              pieceId: c.split("_")[1] | 0
            }), c = "memoria_" + d.id, h.splice(e.findIndex(h, d), 1)) : c = c.toLowerCase();
            a.rewardData.typeId = c;
            f.push(a)
          });
          a.gachaBoxRemainCount -= v;
          a.name = this.model.name;
          this.parentView.model.set("gachaBoxRemainCount", a.gachaBoxRemainCount);
          d = {
            gachaPrm: c,
            drawItemList: f,
            gachaModel: a
          };
          r && (r.btnView.removeView(), r.removeView(), r = null);
          r = new C(
          {
            model: d
          });
          b.doc.querySelector("#overlapContainer").appendChild(r.render().el);
          g.startSe(1603);
          r.btnView = new z(
          {
            model: y,
            el: b.doc.querySelector("#resultOnceBtn")
          });
          g.getBaseData(b.getNativeObj());
          this.drawFlg = !1
        }.bind(this);
        p.ajaxPost(b.linkList.gachaResult, c, d)
      }
    },
    Q = function()
    {
      var a = this;
      if (!a.drawFlg)
      {
        b.androidKeyStop = !0;
        a.drawFlg = !0;
        var c = {
          gachaScheduleId: a.model.gachaScheduleIds | 0
        };
        $("#popupArea").on(b.cgti, "#resultCodeError .popupCloseBtn", function(a)
        {
          a.preventDefault();
          b.isScrolled() || ($("#popupArea").off(), g.nativeReload("#/CampaignBoxGachaTop"))
        });
        b.g_popup_instance.popupView.close();
        var d = function(c)
          {
            b.responseSetStorage(c);
            this.parentView.model.unset("userUseItem",
            {
              silent: !0
            });
            this.parentView.model.set(e.clone(F()));
            var d = [];
            e.each(c.resultList, function(a, c, f)
            {
              a = b.getRewardInfoForBogetGacha(
              {
                rewardInfo: a
              });
              "CARD" == a.rewardType && (a.chara = a.charaModel.chara, a.card = a.cardModel.card);
              "GIFT" == a.rewardType && (a.genericId = a.giftModel.id);
              d.push(a)
            });
            R(
            {
              isAllGet: a.model.isAllGet,
              rewardList: d
            });
            g.startSe(1603);
            g.getBaseData(b.getNativeObj());
            this.drawFlg = !1
          }.bind(this),
          f = b.linkList.campaignBoxGachaAllItemUseResult;
        a.model.isAllGet && (f = b.linkList.campaignBoxGachaAllResult);
        p.ajaxPost(f, c, d)
      }
    },
    R = function(a)
    {
      var c = a.rewardList,
        d = a.isAllGet;
      new b.PopupClass(
      {
        title: "ガチャ結果",
        content: "<div id='popupDetailScrollWrap'><div class='scrollInner'></div></div>",
        popupType: "typeA",
        closeBtnText: "OK",
        exClass: "popupDetail"
      }, null, function()
      {
        A.prototype.rootView = this;
        var a = b.doc.createDocumentFragment();
        e.each(c, function(b)
        {
          b = new A(
          {
            model: b,
            type: b.rewardType
          });
          a.appendChild(b.render().el)
        });
        b.doc.querySelector("#popupDetailScrollWrap .scrollInner").appendChild(a);
        5 < c.length && b.addClassId("popupDetailScrollWrap", "alignLeft");
        10 < c.length && b.scrollSet("popupDetailScrollWrap", "scrollInner");
        g.getBaseData(b.getNativeObj())
      }, function()
      {
        var a = function(a)
          {
            a = w(a);
            l.clear(
            {
              silent: !0
            });
            l.set(a);
            b.androidKeyStop = !1;
            u(!0)
          },
          c = function()
          {
            var a = "";
            e.each("itemList userItemList userStatusList userPieceList gameUser userCardList userCharaList userGiftList".split(" "), function(b, c, d)
            {
              a = a + "," + b
            });
            return a
          }();
        p.ajaxSimpleGet(b.linkList.CampaignBoxGachaTopPage + "?value=" + c, "", function(c)
        {
          b.responseSetStorage(c);
          k.itemList = c.itemList;
          k.gachaScheduleList = c.gachaScheduleList;
          k.userGachaGroupList = c.userGachaGroupList;
          d ? (a(c), new b.PopupClass(
          {
            title: "ボックス内容の変更",
            content: "ボックス内のすべてのアイテムを獲得したため、<br>ボックス内容をリセットして、次のボックスに変更しました。",
            closeBtnText: "閉じる"
          })) : a(c)
        })
      })
    },
    w = function(a)
    {
      k.gachaScheduleList = function()
      {
        var a = [],
          b = !1;
        e.each(k.gachaScheduleList, function(c)
        {
          if (!b && c.enable || b) b = !0, a.push(c)
        });
        return a
      }();
      var c = e.sortBy(a.userGachaBoxList, function(a)
      {
        return a.displayOrder || a.gachaBoxSet.displayOrder
      });
      a = k.itemList;
      var d = b.storage.userItemList.toJSON(),
        f = {};
      e.each(k.gachaScheduleList, function(a)
      {
        a.enable && (f.gachaSchedule = a)
      });
      c = S(c);
      f.gachaBoxMaxCount = c.gachaBoxMaxCount;
      f.gachaBoxRemainCount = c.gachaBoxRemainCount;
      f.userGachaBoxList = c.userGachaBoxList;
      f.isBoxBonus = c.isBoxBonus;
      f.useItem = e.findWhere(a,
      {
        itemCode: m.parameterMap.CAMPAIGN_ITEM_ID
      });
      f.userUseItem = e.findWhere(d,
      {
        itemId: m.parameterMap.CAMPAIGN_ITEM_ID
      }) ||
      {
        quantity: 0
      };
      f.boxGachaNum = k.userGachaGroupList.length ? k.userGachaGroupList[0].resetCount + 1 : 1;
      return f
    },
    S = function(a)
    {
      var b = {},
        d = 0,
        f = 0;
      b.isBoxBonus = !0;
      var g = !1,
        k = 0;
      e.each(a, function(a)
      {
        d += a.gachaBoxSet ? a.gachaBoxSet.count : a.count;
        f += a.gachaBoxSet ? a.gachaBoxSet.count - a.count : a.count;
        a.gachaBoxSet && a.gachaBoxSet.bonusFlg && (g = !0, k += a.gachaBoxSet.count - a.count)
      });
      g && 0 == k && (b.isBoxBonus = !1);
      b.gachaBoxMaxCount = d;
      b.gachaBoxRemainCount = f;
      b.userGachaBoxList = a;
      return b
    },
    F = function()
    {
      var a = {},
        c = b.storage.userItemList.toJSON();
      a.userUseItem = e.findWhere(c,
      {
        itemId: m.parameterMap.CAMPAIGN_ITEM_ID
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
      c.id = n;
      c.x = 200;
      c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
      if (n)
      {
        var d = n.substring(0, n.length - 2);
        if (a)
        {
          c.type = 0;
          a = "vo_char_" + d + "_" + n.substring(n.length - 2, n.length) + "_";
          var d = [],
            f = Number(k.currentTime.split(" ")[1].split(":")[0]),
            e = Number(k.currentTime.split(" ")[1].split(":")[1]);
          6 <= f && 9 >= f && !(9 == f && 0 < e) ? d.push(24) : 11 <= f && 13 >= f && !(13 == f && 0 < e) ? d.push(25) : 17 <= f && 19 >= f && !(19 == f && 0 < e) ? d.push(26) : (22 <= f || 0 == f && !(0 == f && 0 < e)) && d.push(27);
          d.push(28);
          d.push(23);
          b.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON().point >= b.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON().point && d.push(29);
          b.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON().point >= b.storage.userStatusList.findWhere(
          {
            statusId: "MAX_BTP"
          }).toJSON().point && d.push(30);
          c.key = a + (d[Math.floor(Math.random() * d.length)] + 1)
        }
        else c.type = 1, c.key = "idle"
      }
      g.startL2d(c)
    },
    O = function(a)
    {
      var b = a.gachaModel;
      a = {
        gachaModel: b
      };
      a.btnModel = JSON.parse(JSON.stringify(e.findWhere(b.gachaSchedule.gachaKindList,
      {
        groupId: 1
      })));
      a.btnModel.name = "キャンペーンガチャ";
      a.btnModel.displayTitle = "全て引く";
      var d = a.btnModel.needQuantity,
        f = d * b.gachaBoxRemainCount,
        b = b.userUseItem.quantity;
      a.btnModel.isAllGet = !1;
      f <= b ? (a.btnModel.needQuantity = f, a.btnModel.isAllGet = !0) : (a.btnModel.needQuantity = Math.floor(b / d) * d, d > b && (a.btnModel.needQuantity = d));
      a.btnModel.gachaCount = Math.floor(a.btnModel.needQuantity / d);
      return a
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
      k = p.getPageJson();
      m = e.findWhere(k.campaignList,
      {
        campaignType: "BOX_GACHA"
      });
      n = m.parameterMap.LIVE2D_ID;
      if (m.parameterMap && m.parameterMap.BGM && m.parameterMap.BG_IMG)
      {
        var a = m.parameterMap.BGM;
        g.changeBg(m.parameterMap.BG_IMG + ".ExportJson");
        g.startBgm(a)
      }
      else g.changeBg("web_common.ExportJson"), g.startBgm("bgm01_anime07");
      var a = m,
        c = {
          isEventEnd: !1
        },
        d = L.getEventMaster(
        {
          pageJson: k
        });
      d && "exchangeOnly" == d.termStatus && (c.isEventEnd = !0);
      a.eventWitchInfo = c;
      a = w(k);
      l.set(a);
      b.setStyle(I);
      t = new N
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
      t && (t.trigger("removeView"), t.remove(), l && (l.clear(), l = new x(
      {})), y = null);
      a()
    }
  }
});
