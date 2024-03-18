define("underscore backbone backboneCommon ajaxControl command text!template/user/MyPage.html text!css/user/MyPage.css js/view/user/BannerView cardUtil text!template/etc/EtcPopup.html js/etc/ConsentRules js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(p, z, a, l, e, C, D, A, E, F, G, J)
{
  var m, q, g, c, f, u, r = null,
    t = null,
    y = z.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .live2dArea"] = this.touch;
        b["touchstart #live2dBtn"] = this.live2dSelectTimer;
        b[a.cgti + " #live2dBtn"] = this.live2dFuncRegacy;
        b[a.cgti + " #wearDecide"] = this.live2dSelectFunc;
        b[a.cgti + " #uiHideBtn"] = this.uiHideFunc;
        b[a.cgti + " #portraitBtn"] = this.live2dPortrait;
        b[a.cgti + " #favoriteChara .tapArea"] = this.myProfile;
        b[a.cgti + " #announce"] = this.announcePopup;
        b[a.cgti + " #config"] = this.etcPopup;
        return b
      },
      initialize: function(a)
      {
        this.l2dTouchCnt = 0;
        c && (this.live2dId = c.live2dId);
        this.live2dPortrait = !1;
        this.template = p.template(C);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          leaderCardId: c ? c.displayCardId : 10011,
          presentCount: f.presentCount ? f.presentCount : 0
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        e.getBaseData(a.getNativeObj());
        e.setWebView();
        l.getPageJson().notifyMessage && !a.notifyMessage && (a.notifyMessage = l.getPageJson().notifyMessage);
        a.tapBlock(!0);
        g = this;
        if (l.getPageJson().interrupt) a.setGlobalView();
        else
        {
          f.loginBonusList && (a.loginBonus = f.loginBonusList);
          f.loginBonusPeriod && (a.loginBonusPeriod = f.loginBonusPeriod);
          f.campaignList && (a.campaignListLogin = f.campaignList);
          f.loginBonusCampaign && (a.loginBonusCampaign = f.loginBonusCampaign);
          f.loginBonusCampaignList && (a.loginBonusCampaignList = f.loginBonusCampaignList);
          if (f.supportPoint && (a.supportPoint = f.supportPoint, f.supportBonus))
          {
            var b = "ALL",
              d = 0;
            p.each(f.supportBonus.attributeIdCountMap, function(a, c)
            {
              a > d && (d = a, b = c)
            });
            a.mostUseSupportAtt = b;
            console.log("common.mostUseSupportAtt: ", a.mostUseSupportAtt)
          }
          var n = l.getPagePureJsons(),
            k = !1,
            v = !1,
            h = !1,
            B = !1; - 1 < n.indexOf("userDailyChallengeList") && a.storage.userDailyChallengeList && (v = k = !0, a.storage.userDailyChallengeList.reset(), delete a.storage.userDailyChallengeList); - 1 < n.indexOf("userTotalChallengeList") && a.storage.userTotalChallengeList && (h = k = !0, a.storage.userTotalChallengeList.reset(), delete a.storage.userTotalChallengeList); - 1 < n.indexOf("userLimitedChallengeList") && a.storage.userLimitedChallengeList && (B = k = !0, a.storage.userLimitedChallengeList.reset(), delete a.storage.userLimitedChallengeList);
          k && (n = {}, v && (n.userDailyChallengeList = f.userDailyChallengeList), h && (n.userTotalChallengeList = f.userTotalChallengeList), B && (n.userLimitedChallengeList = f.userLimitedChallengeList), a.responseSetStorage(n));
          a.setGlobalView();
          !a.loginBonusCampaign && !a.loginBonusCampaignList || this.loginBonusCampaignFlg || (a.loginBonusCampaignList || (a.loginBonusCampaignList = [], a.loginBonusCampaignList.push(a.loginBonusCampaign)), p.each(a.loginBonusCampaignList, function(b, d)
          {
            p.findWhere(a.campaignListLogin,
            {
              id: b.campaignId
            });
            b.imagePath && (a.doc.createElement("img").src = b.imagePath);
            if (b.storyIds && 0 < b.storyIds.length)
            {
              b = b.storyIds.split(",");
              for (var c = b.length, k = [], e = 0; e < c; e++) a.storage.userQuestAdventureList.findWhere(
              {
                adventureId: b[e]
              }) || k.push(b[e]);
              a.loginBonusCampaignList[d].storyIds = k
            }
          }));
          g.popupFlgs();
          f.presentFlag && a.addClass(a.doc.getElementById("present"), "anim");
          this.setBanner();
          c && 2 <= c.live2dList.length && (w.prototype.rootView = this, this.live2dListMake(), a.doc.querySelector("#live2dBtn").className = "TE se_decide", a.scrollSet("mypageWearScrollOuter", "scrollInner"));
          this.checkApCurePush()
        }
        a.setTitleCollectionObserved();
        a.ready.hide()
      },
      touch: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && c)
          if (this.live2dTap) this.live2dTap = !1;
          else
          {
            e.stopVoice();
            var d;
            d = c;
            var n = this.l2dTouchCnt;
            if (d)
            {
              var k = [32, 33, 34, 35];
              2 <= d.episodeLevel && k.push(36);
              3 <= d.episodeLevel && k.push(37);
              4 <= d.episodeLevel && k.push(38);
              5 <= d.episodeLevel && k.push(39);
              7 <= n && k.push(40);
              d = k[Math.floor(Math.random() * k.length)]
            }
            else d = void 0;
            d = "vo_char_" + c.charaId + "_" + c.live2dList[c.live2dIndex].voicePrefixNo + "_" + (d + 1);
            88 == this.live2dId.slice(-2) ? e.startVoice(d) : (b = b.originalEvent.changedTouches ? b.originalEvent.changedTouches[0] : b.originalEvent, b = {
              id: c.charaId + this.live2dId,
              x: b.pageX,
              y: b.pageY
            }, b.voice = d, c.chara.doubleUnitFlg && 0 === c.live2dIndex && (b.subId = c.chara.doubleUnitLive2dDetail, b.subX = -60, b.subY = 0), e.storyMotionL2dVoice(b));
            this.l2dTouchCnt++
          }
      },
      live2dPortrait: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          a.tapBlock(!0);
          e.endL2d();
          b = {};
          b.id = c.charaId + m.live2dId;
          b.x = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) : Math.floor(a.longSize / 2) + 55;
          b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.floor(a.shortSize / 2);
          b.type = 1;
          b.key = "idle";
          var d = !1;
          c.chara.doubleUnitFlg && 0 === c.live2dIndex && (d = !0);
          this.live2dPortrait ? (this.live2dPortrait = !1, e.changeBg(a.settingBg), a.removeClass(a.doc.querySelector(".live2dArea"), "portrait"), a.removeClass(a.doc.querySelector("#live2dMenu"), "portrait"), a.removeClass(a.doc.querySelector("#wearWrap"), "portrait"), a.doc.querySelector("#menu").style.display = "", d && (b.x = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) + 180 : Math.floor(a.longSize / 2) + 210, b.subId = c.chara.doubleUnitLive2dDetail, b.subX = -60, b.subY = 0)) : (this.live2dPortrait = !0, b.isPortrait = !0, e.changeBg(a.settingBg, !0), a.addClass(a.doc.querySelector(".live2dArea"), "portrait"), a.addClass(a.doc.querySelector("#live2dMenu"), "portrait"), a.addClass(a.doc.querySelector("#wearWrap"), "portrait"), a.doc.querySelector("#menu").style.display = "none", 217 > (window.app_ver.split(".").join("") | 0) ? d ? (b.x = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) + 300 : Math.floor(a.longSize / 2) + 390, b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) - 120 : Math.floor(a.shortSize / 2) - 95, b.subId = c.chara.doubleUnitLive2dDetail, b.subX = -300, b.subY = 240) : b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.floor(a.shortSize / 2) + 45 : d ? (b.x = 0, b.y = 1024 === a.displayWidth ? 0 : -20, b.subId = c.chara.doubleUnitLive2dDetail) : (b.x = 0, b.y = 1024 === a.displayWidth ? 0 : -20));
          b.txtVisible = "true";
          e.startL2d(b);
          setTimeout(function()
          {
            a.tapBlock(!1)
          }, 700)
        }
      },
      live2dSelectFunc: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        window.isBrowser && window.isLocal || (this.wearChanging ? (a.addClass(a.doc.getElementById("wearWrap"), "off"), a.tapBlock(!0), this.wearChanging = !1, a.removeClass(a.doc.getElementById("MyPage"), "wearing"), a.removeClass(a.doc.getElementById("globalMenuContainer"), "hide")) : (a.removeClass(a.doc.getElementById("wearWrap"), "off"), a.tapBlock(!0), this.wearChanging = !0, a.addClass(a.doc.getElementById("MyPage"), "wearing"), a.addClass(a.doc.getElementById("globalMenuContainer"), "hide")), setTimeout(function()
        {
          "MyPage" === a.location && (a.scrollRefresh(), a.tapBlock(!1))
        }, 700))
      },
      live2dListMake: function()
      {
        if (!window.isBrowser || !window.isLocal)
        {
          var b = a.doc.getElementById("mypageWearScrollOuter").getElementsByClassName("scrollInner")[0];
          b.innerHTML = "";
          if (0 < c.live2dList.length) p.each(c.live2dList, function(a, d)
          {
            a = new w(
            {
              model: a
            });
            b.appendChild(a.render().el)
          });
          else
          {
            var d = new w(
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
        }
      },
      live2dSelectTimer: function(b)
      {
        this.l2dSlTimer && clearTimeout(this.l2dSlTimer);
        var d = this;
        this.timerFire = this.l2dTimerStop = !1;
        this.l2dSlTimer = setTimeout(function()
        {
          "MyPage" !== a.location || d.l2dTimerStop || a.isDoubleTouch() || (d.timerFire = !0, d.live2dSelectFunc(b))
        }, 1E3)
      },
      live2dFuncRegacy: function(b)
      {
        if (!this.timerFire && (this.l2dTimerStop = !0, clearTimeout(this.l2dSlTimer), b.preventDefault(), !a.isScrolled() && !a.isDoubleTouch()))
        {
          var d = b.currentTarget;
          a.addClass(b.currentTarget, "block");
          r = setTimeout(function()
          {
            d && (a.removeClass(d, "block"), r = null)
          }, 1500);
          c.live2dIndex += 1;
          c.live2dList[c.live2dIndex] || (c.live2dIndex = 0);
          this.live2dId = b = c.live2dList[c.live2dIndex].live2dId;
          x(b, null, this.live2dPortrait);
          this.live2dListMake()
        }
      },
      live2dFunc: function(b)
      {
        a.addClass(a.doc.getElementById("wearWrap"), "block");
        r = setTimeout(function()
        {
          a.removeClass(a.doc.getElementById("wearWrap"), "block");
          r = null
        }, 1500);
        c.live2dIndex = p.findIndex(c.live2dList,
        {
          live2dId: b
        });
        this.live2dId = b = c.live2dList[c.live2dIndex].live2dId;
        x(b, null, this.live2dPortrait)
      },
      uiHideFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var d = this;
          t = null;
          var c = function(b)
            {
              t = setTimeout(function()
              {
                t = null;
                d.live2dTap = !0;
                e.startSe(1008);
                a.tapEffectStop = !1;
                a.doc.querySelector("#menu") && a.doc.querySelector("#live2dMenu") && (d.live2dPortrait || (a.doc.querySelector("#menu").style.display = ""), a.doc.querySelector("#live2dMenu").style.display = "", document.getElementById("MyPage").removeEventListener("touchstart", c), document.getElementById("MyPage").removeEventListener(a.cgti, k))
              }, 800)
            },
            k = function(a)
            {
              t && clearTimeout(t)
            };
          b = "uiHidePop";
          this.live2dPortrait && (b = "uiHidePop portrait");
          var v = new a.PopupClass(
          {
            exClass: b,
            content: "画面上のボタンを非表示にします。<br><br>非表示に切り替え後は<br>画面長押しでボタンが表示されます。",
            decideBtnText: "非表示にする",
            closeBtnText: "キャンセル",
            showCurtain: !1,
            canClose: !1
          }, null, function()
          {
            $(".uiHidePop .decideBtn").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (v.popupView.close(), a.doc.querySelector("#menu").style.display = "none", a.doc.querySelector("#live2dMenu").style.display = "none", a.tapEffectStop = !0, document.getElementById("MyPage").addEventListener("touchstart", c), document.getElementById("MyPage").addEventListener(a.cgti, k))
            })
          })
        }
      },
      myProfile: function(b)
      {
        b.preventDefault();
        a.isScrolled() || require(["js/view/user/MyProfilePopup"], function(a)
        {
          a.instantPopup()
        })
      },
      announcePopup: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.tapBlock(!0);
        a.loading.show();
        q && q.trigger("removeView");
        var d = this,
          c = 6E4 * ((new Date).getTime() / 6E4 | 0);
        require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + c, "text!json/announcements/announcements.json?bust=" + c], function(c, e, h, n)
        {
          new a.PopupClass(
          {
            title: "お知らせ",
            exClass: "announcementPopup",
            announce: !0
          }, e, function()
          {
            setTimeout(function()
            {
              a.tapBlock(!1);
              a.loading.hide()
            }, 500)
          }, function()
          {
            q && q.trigger("removeView");
            b || (d.firstPopFlg = !0, d.popupFlgs())
          });
          q = new c(
          {
            bannerJson: h,
            announcementJson: n
          })
        })
      },
      etcPopup: function(b)
      {
        b.preventDefault();
        a.isScrolled() || new a.PopupClass(
        {
          title: "その他",
          popupType: "typeC",
          exClass: "etcPop"
        }, F, function()
        {
          a.storage.gameUser && a.storage.gameUser.toJSON().closeFunctions && -1 < a.storage.gameUser.toJSON().closeFunctions.indexOf("FRIEND") && a.addClass(a.doc.getElementById("popupArea").getElementsByClassName("friendBtn")[0], ["grayScale", "limited"]);
          window.isDebug && (f && f.currentTime && (a.doc.getElementById("backDoorCurrentTimeArea").textContent = "アクセス時:" + f.currentTime), a.doc.querySelector("#popupArea .backDoorBtn").addEventListener(a.cgti, g.backdoor))
        })
      },
      popupFlgs: function()
      {
        a.tapBlock(!0);
        if (g.rewardReceiveFlg) g.rewardReceiveFlg = !0, rewardReceiveHandler(), a.tapBlock(!1);
        else if (a.loginBonus && !g.loginBonusFlg) g.loginBonusFlg = !0, g.loginBonusHandler(), localStorage.removeItem("puellaHistoriaOutlinesPopupAlready");
        else if (a.loginBonusCampaignList && !g.loginBonusCampaignFlg) a.loginBonusCampaignList[0].storyIds && 0 < a.loginBonusCampaignList[0].storyIds.length ? g.loginBonusStory() : g.campaignLoginCommon();
        else if ("NOT_ANSWERED" !== f.gameUser.userReviewStatus || a.oneTimeReviewPopFlg || g.reviewFlg)
          if (f.userWarning && !g.warningFlg) g.warningFlg = !0, g.warningPopHandler(), a.tapBlock(!1);
          else if (void 0 === g.firstPopFlg)
        {
          if (void 0 === g.firstPopFlg)
          {
            a.loading.show();
            var b = 6E4 * (Date.parse(l.getPageJson().currentTime) / 6E4 | 0);
            require(["text!json/announcements/light_top50.json?bust=" + b], function(b)
            {
              b = JSON.parse(b);
              b = p.sortBy(b, function(a)
              {
                return a.startAt
              });
              for (var d = a.storage.gameUser.get("announcementViewAt") ? Date.parse(a.storage.gameUser.get("announcementViewAt")) : -1, c = b.length, e = -1, h = Date.parse(l.getPageJson().currentTime); 0 < c;)
              {
                c--;
                var f = b[c].startAt.replace(/-/g, "/"),
                  m = b[c].endAt.replace(/-/g, "/"),
                  f = Date.parse(f),
                  m = Date.parse(m);
                if (d < f && h >= f && m > h)
                  if (b[c].displayOs && "ALL" === b[c].displayOs) e = b[c].id, c = 0;
                  else if (a.ua.android && "ANDROID" === b[c].displayOs || a.ua.ios && "IOS" === b[c].displayOs) e = b[c].id, c = 0
              } - 1 < e ? (g.firstPopFlg = !0, g.announcePopup()) : (g.firstPopFlg = !1, a.loading.hide(), g.popupFlgs())
            })
          }
        }
        else a.notifyMessage && !g.messageFlg ? (g.messageFlg = !0, g.messagePopHandler(), a.tapBlock(!1)) : !a.passWordNoticeFlg && a.storage.gameUser.get("passwordNotice") && a.storage.gameUser.toJSON().closeFunctions && -1 === a.storage.gameUser.toJSON().closeFunctions.indexOf("FRIEND") ? (a.passWordNoticeFlg = !0, g.passwordPopHandler()) : (b = function()
        {
          localStorage.getItem("watchPuellaHistoriaPrologue") ? (x(null, !0), a.tapBlock(!1)) : location.href = "#/PuellaHistoriaTop"
        }, a.consentRulesFunctions(
        {}).isConsentRules(
        {}) ? b() : (G.init(
        {
          pageJson: f,
          endCallback: b
        }).consentPopup(), a.tapBlock(!1)));
        else g.reviewFlg = !0, g.reviewPopHandler(), a.tapBlock(!1)
      },
      loginBonusHandler: function()
      {
        var b = function()
        {
          g.popupFlgs()
        };
        require(["text!template/loginBonus/loginBonusPopupTemp.html"], function(d)
        {
          var c = p.sortBy(a.loginBonus, "day"),
            k = "loginBonusPop",
            g = "ログインボーナス";
          !c[0] || "S1" != c[0].pattern && "S2" != c[0].pattern || (k = "loginBonusPop startDash", g = "　");
          var h = a.loginBonusPeriod,
            f = a.doc.createElement("div");
          d = p.template(d);
          var m = a.supportPoint ? a.supportPoint : null,
            q = a.mostUseSupportAtt ? a.mostUseSupportAtt : "ALL";
          new a.PopupClass(
          {
            title: g,
            content: "",
            exClass: k,
            popupType: "typeB"
          }, null, function()
          {
            setTimeout(function()
            {
              a.tapBlock(!1)
            }, 500)
          }, b);
          f.innerHTML = d(
          {
            gameUser: a.storage.gameUser.toJSON(),
            loginBonus: c,
            period: h,
            supportPoint: m,
            helperAtt: q,
            currentTime: l.getPageJson().currentTime
          });
          a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(f);
          e.getBaseData(a.getNativeObj());
          f = null
        })
      },
      campaignLoginCommon: function()
      {
        a.androidKeyStop = !0;
        a.tapBlock(!0);
        var b = function()
          {
            a.loginBonusCampaignList.splice(0, 1);
            a.androidKeyStop = !1;
            0 === a.loginBonusCampaignList.length && (a.campaignListLogin = null, a.loginBonusCampaign = null, a.loginBonusCampaignList = null, g.loginBonusCampaignFlg = !0);
            g.popupFlgs()
          },
          d = p.findWhere(a.campaignListLogin,
          {
            id: a.loginBonusCampaignList[0].campaignId
          });
        require(["text!template/loginBonus/loginBonusCampaignPopupTemp.html"], function(c)
        {
          if (!a.loginBonusCampaignList[0].loginBonusList || 1 > a.loginBonusCampaignList[0].loginBonusList.length) a.tapBlock(!1), b();
          else
          {
            c = p.template(c);
            var k = new a.PopupClass(
            {
              simple: !0
            }, c(
            {
              campaign: d,
              bonus: a.loginBonusCampaignList[0]
            }), function()
            {
              $(".itemPetal1").on("webkitAnimationStart", function()
              {
                $(".itemPetal1").off();
                e.startSe(1701)
              });
              a.loginBonusCampaignList[0].storyIds && 0 !== a.loginBonusCampaignList[0].storyIds.length || setTimeout(function()
              {
                a.addClass(a.doc.getElementById("campaignAnimationWrap"), "anim")
              }, 1E3);
              $(".itemPetal2").on("webkitAnimationEnd", function()
              {
                $(".itemPetal2").off();
                $("#campaignAnimationWrap").on(a.cgti, function(b)
                {
                  b && (b.preventDefault(), a.isScrolled() || ($("#campaignAnimationWrap").off(), e.startSe(1002), $("#campaignAnimationWrap").on("webkitAnimationEnd", function()
                  {
                    $("#campaignAnimationWrap").off();
                    a.tapBlock(!1);
                    $("#campaignAnimationWrap").on(a.cgti, function(b)
                    {
                      b.preventDefault();
                      a.isScrolled() || ($("#campaignAnimationWrap").off(), e.startSe(1003), k.popupView.close())
                    })
                  }), a.addClass(a.doc.getElementById("campaignAnimationWrap"), "fadeOut")))
                });
                a.tapBlock(!1)
              })
            }, b);
            e.getBaseData(a.getNativeObj())
          }
        })
      },
      loginBonusStory: function()
      {
        a.androidKeyStop = !0;
        a.tapBlock(!0);
        var b = a.loginBonusCampaignList[0].storyIds,
          d = !1;
        a.loginBonusCampaignList[0].loginBonusList && 0 < a.loginBonusCampaignList[0].loginBonusList.length && (d = !0);
        var c = function()
        {
          $("#commandDiv").on("nativeCallback", function(c, k)
          {
            k && k.isSkipped && (c = {}, c.adventureId = String(b[0]), l.ajaxPost(a.linkList.adventureSkip, c, function(b)
            {
              a.responseSetStorage(b)
            }));
            b.splice(0, 1);
            if (0 < b.length) l.ajaxPost(a.linkList.userQuestAdventureRegist,
            {
              adventureId: String(b[0])
            }, function(d)
            {
              "error" !== d.resultCode && (a.responseSetStorage(d), e.startStory(String(b[0])), window.isBrowser && nativeCallback())
            });
            else if ($("#commandDiv").off(), e.startBgm(a.bgm), e.changeBg(a.background), a.ready.target.className = "show", e.setWebView(), a.ready.hide(), d) setTimeout(function()
            {
              a.addClass(a.doc.getElementById("campaignAnimationWrap"), "anim")
            }, 2E3);
            else
            {
              c = a.loginBonusCampaignList.splice(0, 1);
              a.androidKeyStop = !1;
              if (0 === a.loginBonusCampaignList.length && (a.campaignListLogin = null, a.loginBonusCampaign = null, a.loginBonusCampaignList = null, g.loginBonusCampaignFlg = !0, c[0].campaign.parameterMap && c[0].campaign.parameterMap.JUMP_URL))
              {
                a.campaignJump = !0;
                location.href = c[0].campaign.parameterMap.JUMP_URL;
                return
              }
              g.popupFlgs()
            }
          });
          l.ajaxPost(a.linkList.userQuestAdventureRegist,
          {
            adventureId: String(b[0])
          }, function(c)
          {
            "error" !== c.resultCode && (a.responseSetStorage(c), setTimeout(function()
            {
              e.setWebView(!1);
              e.startStory(String(b[0]));
              d && g.campaignLoginCommon();
              window.isBrowser && nativeCallback()
            }, 500))
          })
        };
        $(a.ready.target).on("webkitAnimationEnd", function()
        {
          $(a.ready.target).off("webkitAnimationEnd");
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          e.changeBg("web_black.jpg");
          c()
        });
        if (window.isBrowser)
        {
          a.tapBlock(!0);
          e.setWebView(!1);
          var k = function(c)
          {
            "error" !== c.resultCode && (a.responseSetStorage(c), b.splice(0, 1), 0 < b.length ? (e.startStory(String(b[0])), l.ajaxPost(a.linkList.userQuestAdventureRegist,
            {
              adventureId: String(b[0])
            }, k)) : d ? setTimeout(function()
            {
              a.addClass(a.doc.getElementById("campaignAnimationWrap"), "anim")
            }, 2E3) : setTimeout(function()
            {
              e.setWebView(!0);
              a.tapBlock(!1)
            }, 1500))
          };
          l.ajaxPost(a.linkList.userQuestAdventureRegist,
          {
            adventureId: String(b[0])
          }, k);
          d ? g.campaignLoginCommon() : setTimeout(function()
          {
            e.setWebView(!0);
            a.tapBlock(!1)
          }, 1500)
        }
        else a.addClass(a.ready.target, "preNativeFadeIn")
      },
      reviewPopHandler: function()
      {
        a.oneTimeReviewPopFlg = !0;
        var b = function()
        {
          l.ajaxPlainPost(a.linkList.rejectReview, "", function(b)
          {
            b = JSON.parse(b);
            "error" !== b.resultCode && (a.responseSetStorage(b), g.popupFlgs())
          })
        };
        require(["text!template/user/ReviewPopTemp.html"], function(c)
        {
          c = p.template(c);
          new a.PopupClass(
          {
            title: "マギアレコード運営事務局より",
            content: c(),
            exClass: "reviewPopup"
          }, null, function()
          {
            setTimeout(function()
            {
              a.tapBlock(!1)
            }, 500)
          }, b);
          var d = 0;
          a.doc.getElementById("acceptReview").addEventListener(a.cgti, function(b)
          {
            if (!(a.isScrolled() || 0 < d))
            {
              d++;
              b.preventDefault();
              b = null;
              a.ua.ios && (b = "https://itunes.apple.com/jp/app/%E3%83%9E%E3%82%AE%E3%82%A2%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89-%E9%AD%94%E6%B3%95%E5%B0%91%E5%A5%B3%E3%81%BE%E3%81%A9%E3%81%8B%E3%83%9E%E3%82%AE%E3%82%AB%E5%A4%96%E4%BC%9D/id1164785360?l=ja&ls=1&mt=8&action=write-review");
              a.ua.android && (b = "https://play.google.com/store/apps/details?id=com.aniplex.magireco&hl=ja");
              if (!window.isBrowser)
              {
                if (!b) return;
                e.browserOpen(b)
              }
              a.g_popup_instance.remove();
              l.ajaxPlainPost(a.linkList.acceptReview, "", function(b)
              {
                b = JSON.parse(b);
                "error" !== b.resultCode && (a.responseSetStorage(b), g.popupFlgs())
              })
            }
          })
        })
      },
      warningPopHandler: function()
      {
        new a.PopupClass(
        {
          title: "マギアレコード運営事務局より",
          content: '<div class="scrollInnerWrap">' + f.userWarning.warning + "</div>",
          closeBtnText: "確認しました",
          exClass: "warningPop"
        }, null, function()
        {
          a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].id = "warningScroll";
          a.scrollSet("warningScroll", "scrollInnerWrap")
        }, function()
        {
          g.popupFlgs()
        })
      },
      messagePopHandler: function()
      {
        new a.PopupClass(
        {
          title: "マギアレコード運営事務局より",
          content: '<div class="scrollInnerWrap">' + a.notifyMessage + "</div>",
          closeBtnText: "OK",
          exClass: "warningPop"
        }, null, function()
        {
          a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].id = "warningScroll";
          a.scrollSet("warningScroll", "scrollInnerWrap");
          a.notifyMessage = null
        }, function()
        {
          g.popupFlgs()
        })
      },
      passwordPopHandler: function()
      {
        new a.PopupClass(
        {
          title: "引き継ぎ・連携用パスワードの設定について",
          content: '<div class="scrollInnerWrap">引き継ぎ・連携用パスワードを設定しておくことで<br>機種変更時や、端末が壊れてしまった場合など<br>データを新しい端末に引き継ぐことができます。<br><br>いますぐパスワードを設定しますか？<br><br><span class="c_red">※パスワードを設定していない場合<br>この端末のデータを引き継ぐことはできません。</span></div>',
          closeBtnText: "あとで設定",
          decideBtnText: "設定する",
          exClass: "warningPop"
        }, null, function()
        {
          a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].id = "warningScroll";
          a.scrollSet("warningScroll", "scrollInnerWrap");
          $("#popupArea .decideBtn").on(a.cgti, function(b)
          {
            b.preventDefault();
            a.isScrolled() || ($("#popupArea .decideBtn").off(), location.href = "#/ConfigTop")
          });
          a.tapBlock(!1)
        }, function()
        {
          $("#popupArea .decideBtn").off();
          g.popupFlgs()
        })
      },
      rewardReceiveHandler: function()
      {
        new a.PopupClass(
        {
          title: "受取確認",
          content: "プレゼントを受け取りました。",
          closeBtnText: "OK"
        }, null, null, function()
        {
          g.popupFlgs()
        })
      },
      checkApCurePush: function()
      {
        if (void 0 !== a.noticeAp && !0 === a.noticeAp)
        {
          if (a.storage.userStatusList)
          {
            var b = a.storage.userStatusList.findWhere(
              {
                statusId: "ACP"
              }),
              c = a.storage.userStatusList.findWhere(
              {
                statusId: "MAX_ACP"
              });
            b && c && (b.toJSON().point >= c.toJSON().point ? e.noticeApFullSet(0) : (b = a.getApRemainTime(b.toJSON(), c.toJSON(), l.getPageJson().currentTime), e.noticeApFullSet(b)))
          }
        }
        else if (void 0 === a.noticeAp)
        {
          var g = this;
          $("#configCallback").on("configCallback", function(b, c)
          {
            $("#configCallback").off();
            a.noticeAp = 1 === c.ap ? !0 : !1;
            a.noticeAp && g.checkApCurePush()
          });
          e.noticeApConfig("configCallback")
        }
      },
      setBanner: function()
      {
        A.prototype.parentView = this;
        var b = 6E4 * ((new Date).getTime() / 6E4 | 0);
        require(["text!json/event_banner/event_banner.json?bust=" + b], function(b)
        {
          a.doc.getElementById("mypageBanner") && (u = new A(b), a.doc.getElementById("mypageBanner").appendChild(u.render().el))
        })
      },
      backdoor: function()
      {
        if (window.isDebug)
        {
          var b = function()
          {
            a.doc.querySelector("#content").classList.toggle("hide");
            "MyPage" === a.location && a.scrollRefresh()
          };
          a.doc.querySelector("#content") ? b() : require(["js/test/BackdoorList"], function(c)
          {
            c = new c;
            a.doc.querySelector("#MyPage").appendChild(c.render().el);
            "MyPage" === a.location && a.scrollSet("backdoorListWrap", "backdoorList");
            b()
          })
        }
      },
      live2dSet: function(b)
      {
        if (c && c.live2dId != this.live2dId)
        {
          var d = {};
          d.charaId = c.charaId;
          d.live2dId = this.live2dId;
          l.ajaxPost(a.linkList.live2dSet, d, function(d)
          {
            a.responseSetStorage(d);
            d = d.userCharaList[0];
            var e = a.storage.userCharaList.findWhere(
            {
              charaId: c.charaId
            });
            e.clear(
            {
              silent: !0
            });
            e.set(d);
            b()
          })
        }
        else b()
      },
      removeFunc: function(a)
      {
        e.stopVoice();
        this.trigger("l2dListRemove");
        this.live2dSet(a)
      }
    }),
    w = z.View.extend(
    {
      tagName: "div",
      className: function()
      {
        var a = "commonFrame4 TE se_tabs wrap";
        this.rootView.live2dId === this.model.live2dId && (a += " current");
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
        a.isScrolled() || this.el.classList.contains("current") || (a.removeClass(a.doc.getElementById("mypageWearScrollOuter").getElementsByClassName("current")[0], "current"), a.addClass(this.el, "current"), this.rootView.live2dFunc(this.model.live2dId))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    H = function()
    {
      a.setStyle(D);
      a.forceTapBlock(
      {
        isBlock: !1
      });
      console.log("common.tutorialId", a.tutorialId);
      console.log("common.tutorialUtil", a.tutorialUtil);
      f = l.getPageJson();
      p.has(f.user, "id") ? p.has(f, "gameUser") ? (E.createCardList(), c = (c = a.storage.userCardListEx.findWhere(
      {
        id: f.gameUser.leaderId
      })) ? a.storage.userCardListEx.findWhere(
      {
        id: f.gameUser.leaderId
      }).toJSON() : null, window.isBrowser ? m = new y : ($("#commandDiv").on("nativeCallback", function(b, c)
      {
        $("#commandDiv").off();
        "" !== c ? l.ajaxPost(a.linkList.rewardReceive,
        {
          serial: c
        }, function(b)
        {
          b.messageType ? new a.PopupClass(
          {
            title: "確認",
            content: "キャンペーンのプレゼントが受け取れませんでした。[" +
            {
              INVALID: "コード不正",
              DUPLICATE: "受取済",
              OUT_OF_TERM: "受取期間外"
            } [b.messageType] + "]",
            closeBtnText: "OK"
          }) : new a.PopupClass(
          {
            title: "確認",
            content: "キャンペーンのプレゼントを受け取りました。<br>プレゼントをご確認ください。",
            closeBtnText: "OK"
          });
          e.deleteRewardPrm();
          m = new y
        }) : m = new y
      }), e.getRewardPrm()), a.questBattleModel = null, a.searchQuestGiftId = null, a.noGetPurchaseStatus = null) : (new a.PopupClass(
      {
        title: "ユーザーが存在しません",
        popupId: "successPopup",
        content: "トップページに戻ります",
        decideBtnText: "トップページへ",
        canClose: !1
      }, null, function()
      {
        a.doc.getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, function()
        {
          e.nativeReload("#/TopPage")
        })
      }), a.tapBlock(!1)) : e.nativeReload("#/TopPage")
    },
    x = function(b, d, g)
    {
      if (c && (b = b ? c.charaId + b : c.charaId + c.live2dId))
      {
        e.stopVoice();
        var f = !1;
        c.chara.doubleUnitFlg && 0 === c.live2dIndex && (f = !0);
        var l = c.chara.doubleUnitFlg && 88 == b.slice(-2),
          h = {};
        h.id = String(b);
        h.x = 1024 === a.displayWidth ? f ? 540 : 380 : f ? 500 : 325;
        h.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
        if (d)
        {
          h.type = l ? 1 : 0;
          var n = "vo_char_" + c.charaId + "_" + c.live2dList[c.live2dIndex].voicePrefixNo + "_" + (I() + 1);
          h.key = l ? "idle" : n;
          f && (h.subId = c.chara.doubleUnitLive2dDetail, h.subX = -60, h.subY = 0);
          e.endL2d();
          setTimeout(function()
          {
            "MyPage" === a.location && (h.txtVisible = "true", e.startL2d(h), l && setTimeout(function()
            {
              e.startVoice(n)
            }, 200))
          }, 100)
        }
        else c.chara.doubleUnitFlg ? (h.type = 1, h.key = "idle", a.doc.getElementById("MyPage").classList.contains("menuHide") && (h.x = 1024 === a.displayWidth ? f ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) + 180 : Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) : f ? Math.floor(a.longSize / 2) + 210 : Math.floor(a.longSize / 2) + 55), g ? (h.isPortrait = !0, h.x = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) : Math.floor(a.longSize / 2) + 45, 217 > (window.app_ver.split(".").join("") | 0) ? f ? (h.x = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) + 300 : Math.floor(a.longSize / 2) + 390, h.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) - 120 : Math.floor(a.shortSize / 2) - 95, h.subId = c.chara.doubleUnitLive2dDetail, h.subX = -300, h.subY = 240) : h.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.floor(a.shortSize / 2) + 55 : f ? (h.x = 0, h.y = 1024 === a.displayWidth ? 0 : -20, h.subId = c.chara.doubleUnitLive2dDetail) : (h.x = 0, h.y = 1024 === a.displayWidth ? 0 : -20)) : f && (h.subId = c.chara.doubleUnitLive2dDetail, h.subX = -60, h.subY = 0), e.endL2d(), setTimeout(function()
        {
          "MyPage" === a.location && (h.txtVisible = "true", e.startL2d(h))
        }, 100)) : (h.key = "metamorphose", e.storyMotionL2d(h))
      }
    },
    I = function()
    {
      var b = [];
      if (a.loginBonus) return 23;
      var c = Number(f.currentTime.split(" ")[1].split(":")[0]),
        e = Number(f.currentTime.split(" ")[1].split(":")[1]);
      6 <= c && 9 >= c && !(9 == c && 0 < e) ? b.push(24) : 11 <= c && 13 >= c && !(13 == c && 0 < e) ? b.push(25) : 17 <= c && 19 >= c && !(19 == c && 0 < e) ? b.push(26) : 22 <= c || 0 == c && !(0 == c && 0 < e) ? b.push(27) : b.push(28);
      a.storage.userStatusList.findWhere(
      {
        statusId: "ACP"
      }).toJSON().point >= a.storage.userStatusList.findWhere(
      {
        statusId: "MAX_ACP"
      }).toJSON().point && b.push(29);
      a.storage.userStatusList.findWhere(
      {
        statusId: "BTP"
      }).toJSON().point >= a.storage.userStatusList.findWhere(
      {
        statusId: "MAX_BTP"
      }).toJSON().point && b.push(30);
      return b[Math.floor(Math.random() * b.length)]
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
      id: "userQuestAdventureList"
    },
    {
      id: "titleList"
    },
    {
      id: "userTotalForces"
    },
    {
      id: "userTitleList"
    },
    {
      id: "userPatrolList"
    },
    {
      id: "userGachaKindList",
      refresh: !0
    }],
    fetch: function()
    {
      e.stopMemoriaTop();
      e.endQuest();
      e.endArena();
      e.endL2d();
      e.hideMiniChara();
      e.popEventBranch();
      e.hideSubQuestBg();
      e.popEventSingleRaid();
      e.deleteEventWitchExchangeAnime();
      e.callTouchesClear();
      l.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      H()
    },
    pageJson: function()
    {
      return l.getPageJson()
    },
    remove: function(b)
    {
      m ? m.removeFunc(function()
      {
        r && clearTimeout(r);
        r = null;
        m.remove();
        q && q.trigger("removeView");
        a.loginBonus && (a.loginBonus = null);
        u && u.removeView();
        b()
      }) : b()
    },
    firstPopup: function()
    {
      m.firstPopup()
    },
    startCommand: function()
    {
      e.changeBg(a.settingBg);
      e.startBgm(a.settingBgm)
    },
    menuShow: function()
    {
      a.tapBlock(!0);
      e.endL2d();
      "MyPage" === a.location && a.removeClass(a.doc.getElementById("live2dMenu"), "show");
      a.removeClass(a.doc.getElementById("MyPage"), "menuHide");
      a.addClass(a.doc.getElementById("MyPage"), "menuShow");
      if (c)
      {
        var b = !1;
        c.chara.doubleUnitFlg && 0 === c.live2dIndex && (b = !0);
        var d = {};
        d.id = c.charaId + m.live2dId;
        d.x = 1024 === a.displayWidth ? b ? 540 : 380 : b ? 500 : 325;
        d.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
        b && (d.subId = c.chara.doubleUnitLive2dDetail, d.subX = -60, d.subY = 0);
        d.type = 1;
        d.key = "idle";
        d.txtVisible = "true";
        e.startL2d(d)
      }
      setTimeout(function()
      {
        "MyPage" === a.location && a.tapBlock(!1)
      }, 700)
    },
    menuHide: function()
    {
      a.tapBlock(!0);
      e.endL2d();
      a.removeClass(a.doc.getElementById("MyPage"), "menuShow");
      a.addClass(a.doc.getElementById("MyPage"), "menuHide");
      if (c)
      {
        var b = !1;
        c.chara.doubleUnitFlg && 0 === c.live2dIndex && (b = !0);
        var d = {};
        d.id = c.charaId + m.live2dId;
        d.x = 1024 === a.displayWidth ? b ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) + 180 : Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) : b ? Math.ceil(a.longSize / 2) + 210 : Math.ceil(a.longSize / 2) + 55;
        d.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
        b && (d.subId = c.chara.doubleUnitLive2dDetail, d.subX = -60, d.subY = 0);
        d.type = 1;
        d.key = "idle";
        d.txtVisible = "true";
        e.startL2d(d)
      }
      t && clearTimeout(t);
      setTimeout(function()
      {
        "MyPage" === a.location && (a.addClass(a.doc.getElementById("live2dMenu"), "show"), a.tapBlock(!1))
      }, 700)
    },
    removeCommand: function()
    {
      e.endL2d()
    }
  }
});
