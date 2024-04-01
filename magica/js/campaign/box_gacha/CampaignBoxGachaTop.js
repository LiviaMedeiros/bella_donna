define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/campaign/box_gacha/CampaignBoxGachaTop.html text!css/campaign/box_gacha/CampaignBoxGachaTop.css js/memoria/MemoriaPopup js/card/CardPopup js/view/item/ItemImgPartsView js/event/EventWitch/Utility".split(" "), function(f, q, b, p, g, H, I, J, K, L, B, M)
{
  var y = q.Model.extend(
    {}),
    m = new y(
    {}),
    h, l, u, r, z, n, N = q.View.extend(
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
        C.prototype.parentView = this;
        this.cpId = l.id;
        this.template = f.template(I);
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
        var a = new C(
        {
          model: m
        });
        b.doc.querySelector("#CampaignBoxGachaTop").appendChild(a.render().el);
        b.ready.hide();
        v(!0)
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
          require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + d, "text!json/announcements/announcements.json?bust=" + d], function(d, k, f, t)
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
            c.announceView = new d(
            {
              bannerJson: f,
              announcementJson: t,
              targetCampaign: Number(a.currentTarget.dataset.cpid)
            })
          })
        }
      }
    }),
    C = q.View.extend(
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
        D.prototype.parentView = this;
        A.prototype.parentView = this;
        E.prototype.parentView = this;
        F.prototype.parentView = this;
        this.template = f.template($("#GachaTemp").text());
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
          c = m.toJSON(),
          d = O(
          {
            gachaModel: c
          }),
          e = d.gachaModel.boxGachaNum,
          k = "";
        5 > e && (k = "btnType2");
        var x = this.model.get("gachaSchedule");
        f.each(x.gachaKindList, function(b)
        {
          b.btnClass = k;
          b = new A(
          {
            model: b
          });
          a.appendChild(b.render().el)
        });
        5 <= e && (d = new E(
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
          this.boxGachaContentView = new F(
          {
            model: new y(this.model.toJSON()),
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
                a = w(a);
                m.clear(
                {
                  silent: !0
                });
                m.set(a);
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
    F = q.View.extend(
    {
      initialize: function(a)
      {
        this.gachaScheduleList = a.gachaScheduleList;
        this.template = f.template($("#GachaContentTemp").text());
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
        }), this.model.set(f.clone(this.parentView.model.toJSON())), g.getBaseData(b.getNativeObj()), b.scrollSet("popScrollOuter", "popScrollInner")) : p.ajaxPost(b.linkList.campaignBoxGachaGetList,
        {
          gachaScheduleId: this.gachaScheduleList[this.count].id
        }, function(a)
        {
          a = {
            gachaScheduleList: this.gachaScheduleList,
            userGachaBoxList: 0 === this.count ? this.model.toJSON().userGachaBoxList : a.gachaBoxSetList
          };
          a = f.clone(w(a));
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
    A = q.View.extend(
    {
      className: function()
      {
        var a = "gachaBtn TE se_decide " + this.model.btnClass;
        "CAMPAIGN_BOX10" === this.model.beanKind && 10 > m.toJSON().gachaBoxRemainCount && (a += " off");
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
        this.template = f.template($("#GachaBtnTemp").text());
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
        if (!b.isScrolled() && (z = a = this.model, !this.checkCapacity() && !this.checkGachaPoint()))
        {
          var c = f.template($("#GachaStartPop").text())(
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
            a = f.template($("#GachaCautionPop").text())(
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
    E = q.View.extend(
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
        this.template = f.template($("#GachaBtnTemp").text());
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
          var c = f.template($("#AllGachaStartPop").text())(
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
            a = f.template($("#GachaCautionPop").text())(
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
    D = q.View.extend(
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
        f.each(this.model.gachaModel.userGachaBoxList, function(a)
        {
          a.gachaBoxSet.bonusFlg && this.bonusRewardCode.push(a.gachaBoxSet.rewardCode)
        }.bind(this));
        f.each(this.model.drawItemList, function(a)
        {
          if (-1 < a.rewardCode.indexOf("_STICKER_")) this.getStickerArr.push(a);
          else if (-1 !== this.bonusRewardCode.indexOf(a.rewardCode) && a.isNew && -1 !== a.rewardCode.indexOf("CARD_"))
          {
            var b = f.clone(this.model.drawItemList),
              b = b.filter(function(a)
              {
                return -1 !== a.rewardCode.indexOf("CARD_")
              });
            this.getCharaIdArr = function()
            {
              var a = [];
              f.each(b, function(b)
              {
                a.push(b.rewardData.itemData.cardModel.card.charaNo)
              });
              return a
            }()
          }
        }.bind(this));
        this.template = f.template($("#GachaResult").text());
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
                e = c.length - 1;
              this.dropEndTimer = setTimeout(function()
              {
                this.chestOpentimer = setInterval(function()
                {
                  b.addClass(c[d], "open");
                  setTimeout(function()
                  {
                    g.startSe(1604)
                  }, 370);
                  e == d ? (clearTimeout(this.dropEndTimer), clearInterval(this.chestOpentimer), this.chestOpentimer = this.dropEndTimer = null, this.stickerCheck(88 * (e + 8))) : d++
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
              e = f.template($("#RainforceApperStickerTemp").text()),
              k = b.doc.createElement("div");
            k.className = "rainforcedStickerDom";
            k.innerHTML = e(
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
              v();
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
            e = function()
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
              f = b.storage.userCharaList.findWhere(
              {
                charaId: k.card.charaNo
              }).toJSON(),
              k = H.addExStatus($.extend(k, f));
            L.instantPopup(a, k, e);
            d()
          }
          else - 1 < k[0].indexOf("memoria") && (k = b.storage.userPieceList.findWhere(
          {
            id: k[1]
          }).toJSON(), k.closeEvent = e, K.instantPopup(a, k), d())
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
            m.clear(
            {
              silent: !0
            });
            m.set(a);
            this.btnView.removeView();
            this.removeView();
            b.androidKeyStop = !1;
            v(!0)
          }.bind(this);
          a = function(a)
          {
            0 === this.model.gachaModel.gachaBoxRemainCount ? (h.gachaScheduleList = a.gachaScheduleList, h.userGachaGroupList = a.userGachaGroupList, c(a), new b.PopupClass(
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
        var a = f.clone(this.parentView.model.toJSON()),
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
        var d = function(e)
        {
          b.responseSetStorage(e);
          this.parentView.model.unset("userUseItem",
          {
            silent: !0
          });
          this.parentView.model.set(f.clone(G()));
          var d = [];
          e.userPieceList && f.each(e.userPieceList, function(a, b)
          {
            b = {};
            b.id = a.id;
            b.pieceId = a.pieceId;
            d.push(b)
          });
          e = e.gachaAnimation.gachaResultList;
          var x = [],
            t = e.length;
          f.each(e, function(a)
          {
            a = f.clone(a);
            var c = a.rewardCode;
            a.rewardData = {};
            if (-1 < c.indexOf("_STICKER_"))
            {
              a.rewardData.rewardType = "sticker";
              a.rewardData.itemData = {};
              for (var e = c.split("_"), c = "", k = e.length - 1, t = 1; t < k; t++) "" !== c && (c += "_"), c += e[t];
              a.rewardData.itemData = b.storage.itemList.findWhere(
              {
                itemCode: c
              }).toJSON()
            }
            else a.rewardData.rewardType = -1 < c.indexOf("GIFT_") ? "gift" : -1 < c.indexOf("LIVE2D_") ? "live2d" : -1 < c.indexOf("DOPPEL_") ? "doppel" : -1 < c.indexOf("GEM_") ? "gem" : -1 < c.indexOf("CARD") ? "card" : -1 < c.indexOf("PIECE_") ? "memoria" : "main", a.rewardData.itemData = b.itemSet(c);
            a.rewardData.itemData.rewardType && "ITEM" == a.rewardData.itemData.rewardType && (a.rewardData.rewardType = "main"); - 1 < c.indexOf("CARD") && a.itemId && -1 < a.itemId.indexOf("LIMIT_BREAK_CHARA") && (a.rewardData.isLimitBreak = !0); - 1 < c.indexOf("PIECE_") && a.rewardData.itemData.rewardType && "PIECE" == a.rewardData.itemData.rewardType ? (e = f.findWhere(d,
            {
              pieceId: c.split("_")[1] | 0
            }), c = "memoria_" + e.id, d.splice(f.findIndex(d, e), 1)) : c = c.toLowerCase();
            a.rewardData.typeId = c;
            x.push(a)
          });
          a.gachaBoxRemainCount -= t;
          a.name = this.model.name;
          this.parentView.model.set("gachaBoxRemainCount", a.gachaBoxRemainCount);
          e = {
            gachaPrm: c,
            drawItemList: x,
            gachaModel: a
          };
          r && (r.btnView.removeView(), r.removeView(), r = null);
          r = new D(
          {
            model: e
          });
          b.doc.querySelector("#overlapContainer").appendChild(r.render().el);
          g.startSe(1603);
          r.btnView = new A(
          {
            model: z,
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
            this.parentView.model.set(f.clone(G()));
            var e = [];
            f.each(c.resultList, function(a, c, d)
            {
              a = b.getRewardInfoForBogetGacha(
              {
                rewardInfo: a
              });
              "CARD" == a.rewardType && (a.chara = a.charaModel.chara, a.card = a.cardModel.card);
              "GIFT" == a.rewardType && (a.genericId = a.giftModel.id);
              e.push(a)
            });
            R(
            {
              isAllGet: a.model.isAllGet,
              rewardList: e
            });
            g.startSe(1603);
            g.getBaseData(b.getNativeObj());
            this.drawFlg = !1
          }.bind(this),
          e = b.linkList.campaignBoxGachaAllItemUseResult;
        a.model.isAllGet && (e = b.linkList.campaignBoxGachaAllResult);
        p.ajaxPost(e, c, d)
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
        B.prototype.rootView = this;
        var a = b.doc.createDocumentFragment();
        f.each(c, function(b)
        {
          b = new B(
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
            m.clear(
            {
              silent: !0
            });
            m.set(a);
            b.androidKeyStop = !1;
            v(!0)
          },
          c = function()
          {
            var a = "";
            f.each("itemList userItemList userStatusList userPieceList gameUser userCardList userCharaList userGiftList".split(" "), function(b, c, d)
            {
              a = a + "," + b
            });
            return a
          }();
        p.ajaxSimpleGet(b.linkList.CampaignBoxGachaTopPage + "?value=" + c, "", function(c)
        {
          b.responseSetStorage(c);
          h.itemList = c.itemList;
          h.gachaScheduleList = c.gachaScheduleList;
          h.userGachaGroupList = c.userGachaGroupList;
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
      h.gachaScheduleList = function()
      {
        var a = [],
          b = !1;
        f.each(h.gachaScheduleList, function(c)
        {
          if (!b && c.enable || b) b = !0, a.push(c)
        });
        return a
      }();
      var c = f.sortBy(a.userGachaBoxList, function(a)
      {
        return a.displayOrder || a.gachaBoxSet.displayOrder
      });
      a = h.itemList;
      var d = b.storage.userItemList.toJSON(),
        e = {};
      f.each(h.gachaScheduleList, function(a)
      {
        a.enable && (e.gachaSchedule = a)
      });
      c = S(c);
      e.gachaBoxMaxCount = c.gachaBoxMaxCount;
      e.gachaBoxRemainCount = c.gachaBoxRemainCount;
      e.userGachaBoxList = c.userGachaBoxList;
      e.isBoxBonus = c.isBoxBonus;
      e.useItem = f.findWhere(a,
      {
        itemCode: l.parameterMap.CAMPAIGN_ITEM_ID
      });
      e.userUseItem = f.findWhere(d,
      {
        itemId: l.parameterMap.CAMPAIGN_ITEM_ID
      }) ||
      {
        quantity: 0
      };
      e.boxGachaNum = h.userGachaGroupList.length ? h.userGachaGroupList[0].resetCount + 1 : 1;
      return e
    },
    S = function(a)
    {
      var b = {},
        d = 0,
        e = 0;
      b.isBoxBonus = !0;
      var g = !1,
        h = 0;
      f.each(a, function(a)
      {
        d += a.gachaBoxSet ? a.gachaBoxSet.count : a.count;
        e += a.gachaBoxSet ? a.gachaBoxSet.count - a.count : a.count;
        a.gachaBoxSet && a.gachaBoxSet.bonusFlg && (g = !0, h += a.gachaBoxSet.count - a.count)
      });
      g && 0 == h && (b.isBoxBonus = !1);
      b.gachaBoxMaxCount = d;
      b.gachaBoxRemainCount = e;
      b.userGachaBoxList = a;
      return b
    },
    G = function()
    {
      var a = {},
        c = b.storage.userItemList.toJSON();
      a.userUseItem = f.findWhere(c,
      {
        itemId: l.parameterMap.CAMPAIGN_ITEM_ID
      }) ||
      {
        quantity: 0
      };
      return a
    },
    v = function(a)
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
            e = Number(h.currentTime.split(" ")[1].split(":")[0]),
            f = Number(h.currentTime.split(" ")[1].split(":")[1]);
          6 <= e && 9 >= e && !(9 == e && 0 < f) ? d.push(24) : 11 <= e && 13 >= e && !(13 == e && 0 < f) ? d.push(25) : 17 <= e && 19 >= e && !(19 == e && 0 < f) ? d.push(26) : (22 <= e || 0 == e && !(0 == e && 0 < f)) && d.push(27);
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
      a.btnModel = JSON.parse(JSON.stringify(f.findWhere(b.gachaSchedule.gachaKindList,
      {
        groupId: 1
      })));
      a.btnModel.name = "キャンペーンガチャ";
      a.btnModel.displayTitle = "全て引く";
      var d = a.btnModel.needQuantity,
        e = d * b.gachaBoxRemainCount,
        b = b.userUseItem.quantity;
      a.btnModel.isAllGet = !1;
      e <= b ? (a.btnModel.needQuantity = e, a.btnModel.isAllGet = !0) : (a.btnModel.needQuantity = Math.floor(b / d) * d, d > b && (a.btnModel.needQuantity = d));
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
      h = p.getPageJson();
      l = f.findWhere(h.campaignList,
      {
        campaignType: "BOX_GACHA"
      });
      n = l.parameterMap.LIVE2D_ID;
      if (l.parameterMap && l.parameterMap.BGM && l.parameterMap.BG_IMG)
      {
        var a = l.parameterMap.BGM;
        g.changeBg(l.parameterMap.BG_IMG + ".ExportJson");
        g.startBgm(a)
      }
      else g.changeBg("web_common.ExportJson"), g.startBgm("bgm01_anime07");
      l.isEventWitchEnd = M.getEventWitchCampaign(
      {
        pageJson: h,
        campaignInfo: l
      });
      a = w(h);
      m.set(a);
      b.setStyle(J);
      u = new N
    },
    beforeMovieStart: function()
    {
      u && g.endL2d()
    },
    afterMovieEnd: function()
    {
      u && v()
    },
    remove: function(a)
    {
      g.endL2d();
      u && (u.trigger("removeView"), u.remove(), m && (m.clear(), m = new y(
      {})), z = null);
      a()
    }
  }
});
