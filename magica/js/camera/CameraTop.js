define("underscore backbone backboneCommon ajaxControl command text!template/camera/CameraTop.html text!css/camera/CameraTop.css cardUtil text!template/chara/CharaList.html text!template/chara/CharaListParts.html sortUtil".split(" "), function(g, n, a, t, e, v, w, x, y, z, A)
{
  var B = n.Model.extend(),
    c, m, u, p = null,
    C = function(l, g)
    {
      if (l = l ? c.charaId + l : c.charaId + c.live2dId)
      {
        var h = !1;
        c.chara.doubleUnitFlg && 0 === c.live2dIndex && (h = !0);
        var f = {};
        f.id = String(l);
        f.x = h ? 480 : 350;
        f.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
        h && (f.subId = c.chara.doubleUnitLive2dDetail, f.subX = -60, f.subY = 0);
        g || c.chara.doubleUnitFlg ? (f.type = 1, f.key = "idle", e.endL2d(), setTimeout(function()
        {
          "CameraTop" === a.location && e.startL2d(f)
        }, 100)) : (f.key = "metamorphose", e.storyMotionL2d(f))
      }
    },
    r = function(a, c)
    {
      for (var g = [], f = "END" !== c ? "touches" : "changedTouches", b = 0; b < a.originalEvent[f].length; b++)
      {
        var d = a.originalEvent[f][b].identifier;
        0 > d && (d = -d);
        g[b] = {
          identifier: d,
          clientX: a.originalEvent[f][b].clientX,
          clientY: a.originalEvent[f][b].clientY
        }
      }
      switch (c)
      {
        case "START":
          e.callTouchesBegin(g);
          break;
        case "MOVE":
          e.callTouchesMove(g);
          break;
        case "END":
          e.callTouchesEnd(g)
      }
    },
    E = function()
    {
      var l = n.View.extend(
        {
          events: function()
          {
            var b = {};
            b[a.cgti + " #posToggle"] = this.posToggle;
            b[a.cgti + " .wearToggle"] = this.wearToggle;
            b[a.cgti + " .charaToggle"] = this.charaListToggle;
            b[a.cgti + " #cameraRun"] = this.running;
            b[a.cgti + " #shutter"] = this.shutter;
            b[a.cgti + " #startTimer"] = this.timer;
            b[a.cgti + " .live2dArea"] = this.touch;
            b[a.cgti + " .live2dArea"] = this.touch;
            b[a.cgti + " .live2dArea"] = this.touch;
            b[a.cgti + " #CameraPageBackLinkBtn"] = this.backBtn;
            b[a.cgti + " #cameraHelp"] = this.helpShow;
            return b
          },
          initialize: function(a)
          {
            this.toggleFlg = this.l2dTouchCnt = 0;
            this.zoomRatio = 1;
            this.cameraRunning = this.doubleTapFlg = !1;
            this.timerFunc = null;
            u = t.getPageJson();
            this.template = g.template(v);
            this.createDom()
          },
          render: function()
          {
            this.$el.html(this.template(u));
            return this
          },
          createDom: function()
          {
            q.prototype.rootView = this;
            f.prototype.rootView = this;
            a.content.append(this.render().el);
            a.setGlobalView();
            a.doc.getElementById("globalMenuContainer").style.display = "none";
            e.getBaseData(a.getNativeObj());
            x.createCardList();
            c = a.storage.userCardListEx.findWhere(
            {
              id: a.storage.gameUser.toJSON().leaderId
            }).toJSON();
            this.live2dId = c.live2dId;
            this.charaListView = new q(
            {
              model: new B,
              collection: a.storage.userCardListEx
            });
            a.doc.getElementById("chara").appendChild(this.charaListView.render().el);
            this.charaListView.initSelectCardId = c.userCardId;
            this.charaListView.cardSort.multiSort();
            a.scrollSetX("charaListScrollWrap", "list");
            this.live2dListMake();
            a.scrollSet("scrollOuter", "scrollInner");
            e.getBaseData(a.getNativeObj());
            a.ready.hide();
            this.posToggle()
          },
          charaListToggle: function(b)
          {
            b.preventDefault();
            a.isScrolled() || this.lastToggle && 500 > (new Date).getTime() - this.lastToggle || (this.lastToggle = (new Date).getTime(), a.removeClass(a.doc.getElementById("chara"), "forceOff"), a.doc.getElementById("chara").classList.toggle("off"), a.doc.getElementById("CameraTop").classList.toggle("changing"), a.scrollRefresh())
          },
          changeDisplayChara: function(b)
          {
            b != c.userCardId && (c = a.storage.userCardListEx.findWhere(
            {
              id: b
            }).toJSON(), this.live2dId = c.live2dId, a.removeClass(a.doc.getElementById("CameraTop"), "pos" + this.toggleFlg), this.l2dTouchCnt = this.toggleFlg = 0, this.live2dListMake(), this.posToggle())
          },
          touch: function(b)
          {
            if (!a.isDoubleTouch() && (b.preventDefault(), !a.isScrolled()))
              if (this.live2dTap) this.live2dTap = !1;
              else
              {
                e.stopVoice();
                b = b.originalEvent.changedTouches ? b.originalEvent.changedTouches[0] : b.originalEvent;
                b = {
                  id: c.charaId + this.live2dId,
                  x: b.pageX,
                  y: b.pageY
                };
                var d = c,
                  D = this.l2dTouchCnt,
                  k = [32, 33, 34, 35];
                2 <= d.episodeLevel && k.push(36);
                3 <= d.episodeLevel && k.push(37);
                4 <= d.episodeLevel && k.push(38);
                5 <= d.episodeLevel && k.push(39);
                7 <= D && k.push(40);
                d = "vo_char_" + c.charaId + "_" + c.live2dList[c.live2dIndex].voicePrefixNo + "_" + (k[Math.floor(Math.random() * k.length)] + 1);
                88 == this.live2dId.slice(-2) ? e.startVoice(d) : (b.voice = d, c.chara.doubleUnitFlg && 0 === c.live2dIndex && (b.subId = c.chara.doubleUnitLive2dDetail, b.subX = this.subX, b.subY = 0), e.storyMotionL2dVoice(b));
                this.l2dTouchCnt++
              }
          },
          wearToggle: function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              b = c.charaId + this.live2dId;
              var d = {};
              this.wearChanging ? (a.addClass(a.doc.getElementById("wearWrap"), "off"), a.tapBlock(!0), this.wearChanging = !1, e.endL2d(), a.removeClass(a.doc.getElementById("CameraTop"), "wearing"), this.posToggle(null, !0), d.id = b, d.x = this.posX, d.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2), c.chara.doubleUnitFlg && 0 === c.live2dIndex && (d.subId = c.chara.doubleUnitLive2dDetail, d.subX = this.subX, d.subY = 0), d.type = 1, d.key = "idle") : (a.removeClass(a.doc.getElementById("wearWrap"), "off"), a.tapBlock(!0), this.wearChanging = !0, e.endL2d(), a.addClass(a.doc.getElementById("CameraTop"), "wearing"), d.id = b, d.x = 350, d.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2), d.type = 1, d.key = "idle", c.chara.doubleUnitFlg && 0 === c.live2dIndex && (d.x = 480, d.subId = c.chara.doubleUnitLive2dDetail, d.subX = -60, d.subY = 0));
              e.startL2d(d);
              setTimeout(function()
              {
                "CameraTop" === a.location && (a.scrollRefresh(), a.tapBlock(!1))
              }, 700)
            }
          },
          live2dListMake: function()
          {
            var b = a.doc.getElementById("scrollOuter").getElementsByClassName("scrollInner")[0];
            this.trigger("l2dListRemove");
            this.l2dListId = c.id;
            if (0 < c.live2dList.length) g.each(c.live2dList, function(a, d)
            {
              a = new f(
              {
                model: a
              });
              b.appendChild(a.render().el)
            });
            else
            {
              var d = new f(
              {
                model:
                {
                  live2dId: c.live2dId,
                  description: "魔法少女",
                  voicePrefixNo: "00"
                }
              });
              b.appendChild(d.render().el)
            }
          },
          live2dFunc: function(b)
          {
            a.addClass(a.doc.getElementById("wearWrap"), "block");
            c.live2dIndex = g.findIndex(c.live2dList,
            {
              live2dId: b
            });
            this.live2dId = b = c.live2dList[c.live2dIndex].live2dId;
            a.tapBlock(!0);
            C(b);
            p = setTimeout(function()
            {
              a.removeClass(a.doc.getElementById("wearWrap"), "block");
              a.tapBlock(!1);
              p = null
            }, 1500)
          },
          running: function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              a.tapBlock(!0);
              var d = this;
              this.cameraRunning ? (e.changeBg(a.settingBg), e.turnOffCamera(), a.removeClass(a.doc.getElementById("CameraTop"), "cameraActive"), this.cameraRunning = !1, a.tapEffectStop = !1, a.androidKeyStop = !1, a.tapBlock(!1)) : ($("#commandDiv").on("nativeCallback", function(b, c)
              {
                $("#commandDiv").off();
                c.isSuccess ? (a.addClass(a.doc.getElementById("CameraTop"), "cameraActive"), e.removeBg(), d.cameraRunning = !0, a.tapEffectStop = !0, a.androidKeyStop = !0) : (new a.PopupClass(
                {
                  title: "エラー",
                  content: c.message,
                  closeBtnText: "OK"
                }), a.androidKeyStop = !1, e.turnOffCamera());
                a.tapBlock(!1)
              }), e.turnOnCamera(), window.isBrowser && ($("#commandDiv").off(), a.addClass(a.doc.getElementById("CameraTop"), "cameraActive"), e.removeBg(), this.cameraRunning = !0, a.tapEffectStop = !0, a.androidKeyStop = !0, a.tapBlock(!1)))
            }
          },
          shutter: function(b)
          {
            if (b && (b.preventDefault(), a.isScrolled())) return;
            this.cameraRunning && (a.tapBlock(!0), a.addClass(a.doc.getElementById("CameraTop"), "shuttering"), $("#commandDiv").on("nativeCallback", function(b, c)
            {
              $("#commandDiv").off();
              c.isSuccess ? new a.PopupClass(
              {
                title: "カメラ撮影",
                content: "撮影が完了しました。",
                closeBtnText: "OK",
                popupType: "typeC"
              }) : new a.PopupClass(
              {
                title: "エラー",
                content: c.message,
                closeBtnText: "OK"
              });
              a.removeClass(a.doc.getElementById("CameraTop"), "shuttering");
              a.tapBlock(!1)
            }), this.sutterFunc = setTimeout(function()
            {
              e.captureCamera()
            }, 500), window.isBrowser && setTimeout(function()
            {
              $("#commandDiv").off();
              new a.PopupClass(
              {
                title: "カメラ撮影",
                content: "撮影が完了しました。",
                closeBtnText: "OK",
                popupType: "typeC"
              });
              a.removeClass(a.doc.getElementById("CameraTop"), "shuttering");
              a.tapBlock(!1)
            }, 1E3))
          },
          timer: function(b)
          {
            b.preventDefault();
            if (!a.isScrolled() && this.cameraRunning)
            {
              a.tapBlock(!0);
              a.addClass(a.doc.getElementById("CameraTop"), "shuttering");
              var d = this;
              this.timerFunc = setTimeout(function()
              {
                this.timerFunc = null;
                d.shutter()
              }, 4500)
            }
          },
          pinchStart: function(a)
          {
            this.cameraRunning && (a.preventDefault(), r(a, "START"))
          },
          pinchMove: function(a)
          {
            this.cameraRunning && (a.preventDefault(), r(a, "MOVE"))
          },
          pinchEnd: function(a)
          {
            this.cameraRunning && (a.preventDefault(), r(a, "END"))
          },
          posToggle: function(b, d)
          {
            if (b && (b.preventDefault(), a.isScrolled())) return;
            d || (a.addClass(a.doc.getElementById("posToggle"), "off"), a.addClass(a.doc.getElementById("CameraPageBackLinkBtn"), "off"));
            b = d ? this.toggleFlg - 1 : this.toggleFlg;
            0 > b && (b = 0);
            if (c.chara.doubleUnitFlg && 0 === c.live2dIndex)
            {
              7 < b && (b = this.toggleFlg = 0);
              this.subX = -60;
              switch (b)
              {
                case 0:
                  this.posX = 692;
                  break;
                case 1:
                  this.posX = 812;
                  break;
                case 2:
                  this.posX = 932;
                  break;
                case 3:
                  this.posX = 452;
                  break;
                case 4:
                  this.posX = 572;
                  break;
                case 5:
                  this.posX = 612;
                  this.subX = 60;
                  break;
                case 6:
                  this.posX = 582;
                  this.subX = 160;
                  break;
                case 7:
                  this.posX = 512, this.subX = 296
              }
              1024 !== a.displayWidth && (this.posX -= 68)
            }
            else
            {
              switch (b)
              {
                case 0:
                case 5:
                  this.posX = 512;
                  break;
                case 1:
                case 6:
                  this.posX = 674;
                  break;
                case 2:
                case 7:
                  this.posX = 836;
                  break;
                case 3:
                case 8:
                  this.posX = 188;
                  break;
                case 4:
                case 9:
                  this.posX = 350
              }
              1024 !== a.displayWidth && (this.posX -= 68);
              this.subX = null
            }
            d || this.positionChange()
          },
          positionChange: function()
          {
            a.tapBlock(!0);
            e.endL2d();
            this.toggleFlg = 9 === this.toggleFlg || 7 === this.toggleFlg && c.chara.doubleUnitFlg && 0 === c.live2dIndex ? 0 : this.toggleFlg + 1;
            var b = {};
            b.id = c.charaId + this.live2dId;
            b.x = this.posX;
            b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
            c.chara.doubleUnitFlg && 0 === c.live2dIndex && (b.subId = c.chara.doubleUnitLive2dDetail, b.subX = this.subX, b.subY = 0);
            b.type = 1;
            b.key = "idle";
            e.startL2d(b);
            setTimeout(function()
            {
              "CameraTop" === a.location && (a.tapBlock(!1), a.removeClass(a.doc.getElementById("CameraPageBackLinkBtn"), "off"), a.removeClass(a.doc.getElementById("posToggle"), "off"))
            }, 700)
          },
          backBtn: function(b)
          {
            b.preventDefault();
            a.isScrolled() || (location.href = "#/MyPage")
          },
          suspendAwake: function(b)
          {
            a.tapBlock(!0);
            var d = !1;
            this.timerFunc && (clearTimeout(this.timerFunc), this.timerFunc = null, d = !0);
            var c = function()
            {
              a.tapBlock(!1)
            };
            b = b.split(" ")[0].split("/");
            2018 !== Number(b[0]) || 4 !== Number(b[1]) || 1 !== Number(b[2]) ? new a.PopupClass(
            {
              title: "エラー",
              content: "「みたまの撮影会」は終了しました。",
              canClose: !1,
              popupType: "typeC",
              closeBtnText: "OK"
            }, null, c, function()
            {
              location.href = "#/MyPage"
            }) : d ? new a.PopupClass(
            {
              title: "エラー",
              content: "撮影が中断されました。",
              canClose: !1,
              popupType: "typeC",
              closeBtnText: "OK"
            }, null, c, function()
            {
              a.removeClass(a.doc.getElementById("CameraTop"), "shuttering")
            }) : a.tapBlock(!1)
          },
          helpShow: function(b)
          {
            b.preventDefault();
            a.isScrolled() || (console.log("oe"), a.setHelpPopup("15_04", "カメラ撮影"))
          },
          removeFunc: function(a)
          {
            this.off();
            this.remove();
            a && a()
          }
        }),
        q = n.View.extend(
        {
          id: "charaListWrap",
          events: function()
          {
            var b = {};
            b[a.cgti + " #sortPopup"] = this.sortPop;
            b[a.cgti + " #sortBtn"] = this.sortStart;
            b[a.cgti + " .orderBtn"] = this.sortOrder;
            return b
          },
          initialize: function(a)
          {
            this.listenTo(this, "remove", this.removeView);
            this.template = g.template(y);
            h.prototype.template = g.template(z);
            h.prototype.parentView = this;
            this.cardSort = new A("Camera_chara", this);
            this.charaViews = {};
            this.initSelectCardId = this.selectCardId = null;
            this.selectView = ""
          },
          charaSelect: function(a, c)
          {
            var b = this;
            a && (g.each(this.charaViews, function(d)
            {
              a == d.model.toJSON().userCardId && (d.charaSelectFunc(c), b.selectView = d)
            }), this.selectCardId = a)
          },
          filterFunc: function()
          {
            var b = null,
              c = this;
            if (this.cardSort)
            {
              var e = this.cardSort.getFilterType(),
                f = this.cardSort.getFilterRare(),
                l = this.cardSort.getFilterEnhance(),
                h = this.cardSort.getFilterInitial(),
                m = e ? e.split(",") : [],
                n = f ? f.split(",") : [],
                p = h ? h.split(",") : [];
              g.each(this.charaViews, function(d)
              {
                var e = !1,
                  f = !1,
                  k = !1,
                  h = !1;
                m.length ? g.each(m, function(a)
                {
                  d.el.classList.contains(a) && (e = !0)
                }) : e = !0;
                n.length ? g.each(n, function(a)
                {
                  d.el.classList.contains(a) && (f = !0)
                }) : f = !0;
                l ? "enable" === l && d.el.classList.contains("enhanced") ? k = !0 : "disable" !== l || d.el.classList.contains("enhanced") || (k = !0) : k = !0;
                p.length ? g.each(p, function(a)
                {
                  d.el.classList.contains(a) && (h = !0)
                }) : h = !0;
                e && f && k && h || d.el.classList.contains("formationRemove") || d.el.classList.contains("formationCurrent") ? (a.removeClass(d.el, "hide"), b || (b = d.model.toJSON().userCardId)) : (a.addClass(d.el, "hide"), c.selectCardId && d.model.toJSON())
              });
              m.length || n.length || l || p.length ? a.addClass(a.doc.querySelector("#sortPopup"), "filterOn") : a.removeClass(a.doc.querySelector("#sortPopup"), "filterOn");
              this.cardSort.memoryHash && (a.sfml[this.cardSort.memoryHash] = this.cardSort.sortPrm, a.sfm())
            }
            var q = 0;
            g.each(this.el.querySelectorAll(".userCharaIcon"), function(a)
            {
              a.classList.contains("hide") || q++
            });
            0 === q ? a.removeClass(a.doc.querySelector(".charaListCaution"), "hide") : a.addClass(a.doc.querySelector(".charaListCaution"), "hide");
            if (this.initSelectCardId) c.charaSelect(this.initSelectCardId, !0), c.initSelectCardId = null;
            else if (!this.selectCardId || this.selectCardId && this.charaViews[this.selectCardId].el.classList.contains("hide")) b = null, g.each(this.el.querySelectorAll("#charaListElms li"), function(a, d)
            {
              b || a.classList.contains("hide") || (b = a.querySelector(".prm_userCardId").innerText, c.charaSelect(b, !0))
            }), b || g.each(this.el.querySelectorAll("#charaListElms li"), function(a, d)
            {
              b || (b = a.querySelector(".prm_userCardId").innerText, c.charaSelect(b, !0))
            });
            a.scrollRefresh()
          },
          render: function()
          {
            var b = a.doc.createDocumentFragment(),
              d = this;
            this.$el.html(this.template(
            {
              model: this.model.toJSON()
            }));
            this.collection.each(function(c, e)
            {
              e = a.storage.userCharaEnhancementCellList.where(
              {
                charaId: c.get("charaId")
              });
              c.set(
              {
                enhanceCnt: e.length ? e.length - 1 : 0
              });
              e = new h(
              {
                model: c
              });
              d.charaViews[c.toJSON().userCardId] = e;
              b.appendChild(e.render().el)
            });
            this.el.querySelector("#charaListElms").appendChild(b);
            return this
          },
          sortPop: function(b)
          {
            b.preventDefault();
            a.isScrolled() || this.cardSort.sortPopupOpen(b)
          },
          sortStart: function(b)
          {
            b.preventDefault();
            a.isScrolled() || (this.cardSort.sortPrm[0] = {
              get: "level",
              level: "rank",
              rank: "atk",
              atk: "def",
              def: "hp",
              hp: "eplv",
              eplv: "rev",
              rev: "mlv",
              mlv: "enhance",
              enhance: "get"
            } [this.cardSort.sortPrm[0]], this.cardSort.multiSort(this.cardSort.sortPrm))
          },
          sortOrder: function(b)
          {
            b.preventDefault();
            a.isScrolled() || ("asc" === this.cardSort.getAscId() ? this.cardSort.sortPrm[1] = "desc" : this.cardSort.sortPrm[1] = "asc", this.cardSort.ascSort(this.cardSort.sortPrm[1]))
          },
          removeView: function()
          {
            this.off();
            this.remove()
          }
        }),
        h = n.View.extend(
        {
          tagName: "li",
          className: function()
          {
            var a = this.model.toJSON().chara.initialType; - 1 < a.indexOf("_") && (a = a.split("_"), a = a[a.length - 1]);
            var c = this.model.toJSON().chara.enhancementGroupId ? "enhanced " : "",
              a = "userCharaIcon " + this.model.toJSON().card.attributeId + " " + this.model.toJSON().card.rank + " " + a + " " + c + " userCardId" + this.model.toJSON().userCardId + " charaId" + this.model.toJSON().charaId;
            this.model.toJSON().eventFlag && (a += " eventChara");
            return a
          },
          events: function()
          {
            var b = {};
            b[a.cgti] = this.charaSelect;
            return b
          },
          initialize: function()
          {
            this.listenTo(this.parentView, "remove", this.removeView);
            this.listenTo(this.model, "charaSelect", this.charaSelectFunc);
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "change", this.charaObjKeyUpdate);
            this.userCardId = this.model.toJSON().userCardId
          },
          render: function()
          {
            this.$el.html(this.template(
            {
              model: this.model.toJSON()
            }));
            e.getBaseData(a.getNativeObj());
            return this
          },
          charaObjKeyUpdate: function()
          {
            this.userCardId !== this.model.toJSON().userCardId && (this.parentView.charaViews[this.model.toJSON().userCardId] = this.parentView.charaViews[this.userCardId], delete this.parentView.charaViews[this.userCardId], this.parentView.selectCardId = this.model.toJSON().userCardId, this.userCardId = this.model.toJSON().userCardId)
          },
          charaSelect: function(b)
          {
            b.preventDefault();
            a.isScrolled() || a.content.hasClass("hide") || (e.startSe("1002"), this.charaSelectFunc())
          },
          charaSelectFunc: function(b)
          {
            this.parentView.selectView && a.removeClass(this.parentView.selectView.el, "select");
            a.addClass(this.el, "select");
            this.parentView.selectView = this;
            this.parentView.rootView.changeDisplayChara(this.model.toJSON().userCardId)
          },
          removeView: function()
          {
            this.off();
            this.remove()
          }
        }),
        f = n.View.extend(
        {
          tagName: "div",
          className: function()
          {
            var a = "commonFrame4 TE se_tabs wrap";
            c.live2dId === this.model.live2dId && (a += " current");
            return a
          },
          events: function()
          {
            var b = {};
            b[a.cgti] = this.wearSelect;
            return b
          },
          initialize: function()
          {
            this.listenTo(this.rootView, "l2dListRemove", this.removeView)
          },
          render: function()
          {
            this.$el.text(this.model.description);
            return this
          },
          wearSelect: function(b)
          {
            b.preventDefault();
            a.isScrolled() || this.el.classList.contains("current") || (a.removeClass(a.doc.getElementById("scrollOuter").getElementsByClassName("current")[0], "current"), a.addClass(this.el, "current"), this.rootView.live2dFunc(this.model.live2dId))
          },
          removeView: function()
          {
            this.off();
            this.remove()
          }
        });
      a.setStyle(w);
      m = new l
    };
  return {
    needModelIdObj: [
    {
      id: "user",
      refresh: !0
    },
    {
      id: "gameUser",
      refresh: !0
    },
    {
      id: "userStatusList",
      refresh: !0
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
      id: "userDoppelList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userLive2dList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, c)
    {
      t.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      E()
    },
    startCommand: function()
    {
      e.changeBg(a.settingBg);
      e.startBgm(a.settingBgm)
    },
    awakeSuspend: function(a)
    {
      m && m.suspendAwake(a)
    },
    remove: function(c)
    {
      a.tapEffectStop = !1;
      a.doc.getElementById("globalMenuContainer") && (a.doc.getElementById("globalMenuContainer").style.display = "");
      e.changeBg(a.settingBg);
      e.turnOffCamera();
      m ? m.removeFunc(function()
      {
        p && clearTimeout(p);
        p = null;
        m.remove();
        c()
      }) : c()
    },
    removeCommand: function()
    {
      e.endL2d()
    }
  }
});
