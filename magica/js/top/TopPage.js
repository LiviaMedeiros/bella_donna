define("underscore backbone backboneCommon ajaxControl command TutorialUtil text!template/top/TopPage.html text!template/etc/RulePopup.html text!template/etc/GameStartPopup.html text!css/top/Top.css".split(" "), function(l, n, a, g, b, B, t, u, v, w)
{
  var h, e, p = !1,
    q = !1,
    z = function()
    {
      x();
      b.noticeOffWeekly('["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]');
      var c = function()
        {
          $("#configCallback").on("configCallback", function(b, c)
          {
            $("#configCallback").off();
            a.noticeAp = 1 === c.ap ? !0 : !1
          });
          b.noticeApConfig("configCallback");
          "TopPage" !== a.location ? b.setWebView() : ($("#commandDiv").on("saveDataCallback", function(c, d)
          {
            $("#commandDiv").off();
            d ? (a.resumeData = d, a.responseSetStorage(d), y(d), a.questHelperId = d.userQuestBattleResultList[0].helpUserId, d.userQuestBattleResultList[0].questBattle.questBattleType && "HARD" == d.userQuestBattleResultList[0].questBattle.questBattleType && (a.mainQuestMode = "HARD"), location.href = "#/QuestBackground") : ($("#commandDiv").on("nativeCallback", function(a, c)
            {
              $("#commandDiv").off();
              m();
              b.noticeRegist()
            }), b.startTop())
          }), b.checkQuestStored())
        },
        d = function()
        {
          $("#commandDiv").on("nativeCallback", function(b, d)
          {
            $("#commandDiv").off();
            a.nativeDownload = !1;
            c()
          })
        };
      a.nativeDownload = !0;
      if (162 < (window.app_ver.split(".").join("") | 0))
      {
        var f = 0;
        $("#configCallback").on("configCallback", function(k, e)
        {
          $("#configCallback").off();
          f = e.movie ? e.movie : 0;
          $("#commandDiv").on("nativeCallback", function(k, C)
          {
            $("#commandDiv").off();
            0 !== f ? (d(), b.downloadFile("movie",
            {
              isVisibleCancel: !0,
              description: !0,
              note: !0
            })) : (a.nativeDownload = !1, c())
          });
          b.downloadFile("common");
          b.awakePurchase()
        });
        b.getDownloadConfig("configCallback")
      }
      else d(), b.downloadFile("common"), b.awakePurchase()
    },
    m = function()
    {
      e = g.getPageJson();
      a.setStyle(w);
      a.forceTapBlock(
      {
        isBlock: !1
      });
      console.log("common.tutorialId", a.tutorialId);
      console.log("common.tutorialUtil", a.tutorialUtil);
      l.has(e.user, "id") || g.ajaxPost(a.linkList.createUser, null, function(c)
      {
        n.Model.extend(
        {});
        a.responseSetStorage(c);
        b.noticeApFullTurnOn();
        a.noticeAp = !0;
        b.noticeTurnOn(
        {
          tag1: 0,
          tag2: 0,
          tag3: 0
        })
      });
      b.setWebView();
      h = new A;
      a.globalMenuView && a.globalMenuView.removeView()
    },
    A = n.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #touchScreen"] = this.touchScreen;
        b[a.cgti + " #clearBtn"] = this.cacheClear;
        b[a.cgti + " #opMovieBtn"] = this.opMovie;
        b[a.cgti + " #transferBtn"] = this.transferPop;
        b[a.cgti + " #terms"] = this.rulePopup;
        return b
      },
      initialize: function(a)
      {
        this.template = l.template(t);
        this.createDom()
      },
      render: function()
      {
        window.isDebug && l.findWhere(e.eventList,
        {
          eventType: "AJ2018"
        }) && (e.aj2018 = !0);
        this.$el.html(this.template(
        {
          model: e
        }));
        return this
      },
      touchScreen: function(b)
      {
        b.preventDefault();
        a.isScrolled() || ("undefined" !== typeof e.gameUser ? "TU997" !== a.storage.user.get("tutorialId") && "TU999" !== a.storage.user.get("tutorialId") ? (a.tapBlock(!0), require(["js/util/TutorialUtil.js"], function(b)
        {
          a.tutorialUtil = b;
          a.tutorialId = a.tutorialUtil.getResumeId();
          b.tutorialResume()
        })) : ($(a.ready.target).on("webkitAnimationEnd", function()
        {
          $(a.ready.target).off();
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          a.tutorialUtil = null;
          a.tutorialId = null;
          location.href = "#/MyPage"
        }), a.addClass(a.ready.target, "gameStartFadeIn")) : r())
      },
      cacheClear: function(c)
      {
        c && c.preventDefault();
        a.isScrolled() || p || (b.clearWebCache(!0), new a.PopupClass(
        {
          title: "キャッシュクリア",
          content: "キャッシュクリアしました。",
          closeBtnText: "閉じる"
        }), p = !0)
      },
      opMovie: function(c)
      {
        c && c.preventDefault();
        a.isScrolled() || (b.changeBg("web_black.jpg"), b.stopVoice(), a.androidKeyStop = !0, $(a.ready.target).on("webkitAnimationEnd", function()
        {
          $(a.ready.target).off();
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          b.endTop();
          setTimeout(function()
          {
            b.setWebView(!1);
            a.ready.show();
            b.stopBgm();
            $("#commandDiv").on("nativeCallback", function(c, f)
            {
              $("#commandDiv").off();
              a.ready.target.className = "";
              b.startTop();
              $("#commandDiv").on("nativeCallback", function(c, d)
              {
                $("#commandDiv").off();
                a.androidKeyStop = !1;
                b.setWebView();
                a.ready.hide()
              })
            });
            b.playMovie("resource/movie/other/op_movie2.usm")
          }, 500)
        }), a.addClass(a.ready.target, "preNativeFadeIn"))
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.doc.querySelector("#app_ver span").textContent = window.app_ver;
        window.isDebug && require(["text!/magica/resource/image_web/debug/selectedBranch.json"], function(b)
        {
          b = JSON.parse(b);
          var c = a.doc.querySelector("#TopPage"),
            f = a.doc.createElement("div");
          f.innerHTML = '<p id="web_res_ver" class="c_purple" style="line-height: 1.1;margin: 10px;">web res：<span class="c_purple">' + b.webBranch + "</span></p>";
          c.appendChild(f)
        }, function(a)
        {
          console.log(a)
        });
        a.ready.hide()
      },
      transferPop: function()
      {
        if (!a.isScrolled())
        {
          var b, d, f = this,
            k = function()
            {
              f.transferPop()
            },
            e = !1,
            g = function(c)
            {
              c.preventDefault();
              a.isScrolled() || e || (e = !0, f.transferSubmit(b, d))
            };
          new a.PopupClass(
          {
            title: "引き継ぎ・連携",
            content: a.doc.getElementById("transferInner").innerText,
            popupType: "typeE",
            exClass: "transferPop",
            closeBtnText: "キャンセル",
            decideBtnText: "OK"
          });
          a.nativeKeyBoard("transferId", 15, 1);
          a.nativeKeyBoard("transferPassword", 15, 1);
          a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, function(c)
          {
            c.preventDefault();
            a.isScrolled() || (b = a.doc.getElementById("transferPopup").getElementsByClassName("personalId")[0].value, d = a.doc.getElementById("transferPopup").getElementsByClassName("password")[0].value, 8 > d.length || 15 < d.length ? new a.PopupClass(
            {
              title: "引き継ぎ・連携",
              content: "パスワードは8文字以上15文字以内です。",
              popupType: "typeC",
              closeBtnText: "OK"
            }, null, null, k) : (new a.PopupClass(
            {
              title: "引き継ぎ・連携",
              content: "引き継ぎ・連携を行います。<br>よろしいですか？",
              popupType: "typeE",
              closeBtnText: "キャンセル",
              decideBtnText: "OK",
              exClass: "transferCheck"
            }, null, null, k), a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, g)))
          }, !1)
        }
      },
      transferSubmit: function(c, d)
      {
        g.ajaxPost(a.linkList.userTransfer,
        {
          personalId: c,
          password: d
        }, function(c)
        {
          "error" !== c.resultCode && (localStorage.setItem("MainQuestSelectPart", JSON.stringify(
          {
            selectPart: 1
          })), localStorage.setItem("SubQuestSelectPart", JSON.stringify(
          {
            selectPart: 1
          })), localStorage.removeItem("storedStoryIds"), localStorage.removeItem("storedVoiceTarget"), localStorage.removeItem("continuousPlayFlag"), new a.PopupClass(
          {
            title: "引き継ぎ・連携",
            content: "引き継ぎ・連携が完了しました。",
            closeBtnText: "閉じる",
            popupType: "typeC"
          }, null, null, function()
          {
            b.endTop();
            b.nativeReload("#/TopPage")
          }))
        })
      },
      rulePopup: function(c, d)
      {
        c.preventDefault();
        a.isScrolled() || (c = null, d && (c = function()
        {
          r()
        }), new a.PopupClass(
        {
          title: "サービス利用規約",
          content: u,
          popupType: "typeB"
        }, null, function()
        {
          a.doc.getElementById("rulePolicyLink").addEventListener(a.cgti, function(c)
          {
            c.preventDefault();
            a.isScrolled() || a.isDoubleTouch() || b.browserOpen("http://www.aniplex.co.jp/help/privacy.html")
          });
          a.doc.getElementById("ruleLinkAdjust").addEventListener(a.cgti, function(c)
          {
            c.preventDefault();
            a.isScrolled() || a.isDoubleTouch() || b.browserOpen("https://www.adjust.com/ja/terms/privacy-policy/")
          })
        }, c), a.scrollSet("rulesBase", "rulesPop"))
      }
    }),
    r = function()
    {
      function c()
      {
        function c(c)
        {
          function d()
          {
            var c = function(c)
              {
                b.awakePurchase();
                var d = function(c)
                {
                  a.responseSetStorage(c);
                  a.tapBlock(!0);
                  require(["js/util/TutorialUtil.js"], function(c)
                  {
                    a.tutorialUtil = c;
                    a.tutorialId = a.tutorialUtil.getResumeId();
                    c.tutorialResume();
                    setTimeout(function()
                    {
                      a.ready.target.className = "tutorialStart";
                      b.setWebView(!0)
                    }, 200)
                  })
                };
                window.isBrowser && window.isDebug && !e.gameUser ? g.ajaxPost(a.linkList.prologueRegister,
                {
                  tutorialId: "TU999"
                }, function()
                {
                  location.href = "#/MyPage"
                }) : (d(c), a.sfml = {})
              },
              d = {
                userName: "？？？？？"
              };
            q || (q = !0, g.ajaxPost(a.linkList.createGameUser, d, c))
          }
          c && a.responseSetStorage(c);
          window.isBrowser ? (f && f.remove(), d()) : (f && f.remove(), $(a.ready.target).on("webkitAnimationEnd", function()
          {
            b.endTop();
            $(a.ready.target).off();
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            $("#commandDiv").on("nativeCallback", function(b, c)
            {
              c && "string" === typeof c && (b = {
                tutorialId: c
              }, "prologue" !== c ? g.ajaxPost(a.linkList.prologueRegister, b) : ($("#commandDiv").off(), d()))
            });
            setTimeout(function()
            {
              var c = a.storage.user.get("tutorialId");
              "OP010" === c && (c = "OP020");
              "prologue" !== c ? b.startPrologue(c) : d();
              b.setWebView(!1)
            }, 500)
          }), a.addClass(a.ready.target, "preNativeFadeIn"))
        }
        "OP000" == a.storage.user.get("tutorialId") ? g.ajaxPost(a.linkList.prologueRegister,
        {
          tutorialId: "OP010"
        }, c) : c()
      }
      var d = function()
      {
        $(a.doc.querySelector("#rulePopupBtn")).on(a.cgti, function(a)
        {
          h.rulePopup(a, !0)
        });
        $(a.doc.querySelector("#gameStartBtn")).on(a.cgti, function(d)
        {
          d && d.preventDefault();
          a.isScrolled() || ($(a.doc.querySelector("#gameStartBtn")).off(), localStorage.clear(), d = a.consentRulesFunctions(
          {}), e.currentTime && d.setTime(
          {
            currentTime: e.currentTime
          }), $("#commandDiv").on("nativeCallback", function(d)
          {
            $("#commandDiv").off();
            b.noticeApFullTurnOn();
            a.noticeAp = !0;
            c()
          }), b.configDataInitilize(), window.isBrowser && nativeCallback())
        })
      };
      if ("OP000" == a.storage.user.get("tutorialId")) var f = new a.PopupClass(
      {
        title: "ゲーム開始",
        content: v
      }, null, d);
      else c()
    },
    x = function()
    {
      var c = a.storage.user.toJSON(),
        d = a.storage.gameUser.toJSON();
      b.noticeRegist(
      {
        tag1: c.purchaseTag,
        tag2: d.levelTag,
        tag3: d.progressTag
      })
    },
    y = function(b)
    {
      if (b)
      {
        var c = b.userQuestBattleResultList[0].questBattle;
        a.responseSetStorage(b);
        if (b = (b = a.storage.userSectionList.findWhere(
          {
            sectionId: c.sectionId
          })) ? b.toJSON() : null) c = (c = a.storage.userChapterList.findWhere(
        {
          chapterId: b.section.genericId
        })) ? c.toJSON() : null, a.playChapter = c, a.playSection = b
      }
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
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "titleList"
    },
    {
      id: "userQuestAdventureList"
    }],
    fetch: function()
    {
      var c = this;
      b.setWebView(!1);
      b.stopMemoriaTop();
      b.endQuest();
      b.endArena();
      b.endL2d();
      b.hideMiniChara();
      b.hideMultiMiniChara();
      b.popEventBranch();
      b.hideSubQuestBg();
      b.popEventSingleRaid();
      b.deleteEventWitchExchangeAnime();
      b.popEventStoryRaid();
      b.callTouchesClear();
      b.weekQuestTopUnset();
      b.stopComposeEffect();
      b.turnOffCamera();
      b.stopNormalGachaMemoria();
      b.formationPreviewRemove();
      b.enemyFormationPreviewRemove();
      b.endGachaAnimation();
      b.endPlayMovie();
      b.hideEventDungeon();
      b.hideEventRaid();
      b.popEmotionBoard();
      b.deletePuellaHistoriaObject();
      b.deleteScene0StorySelectObject();
      b.deleteScene0StoryListObject();
      if (window.g_sns && window.app_ver || window.isBrowser) g.pageModelGet(c.needModelIdObj);
      else
      {
        var d = 0,
          f = function()
          {
            d++;
            3 < d ? (a.androidKeyStop = !0, b.setWebView(), new a.PopupClass(
            {
              title: "通信エラー",
              popupId: "resultCodeError",
              content: "通信環境の良い所で再度お試しください。",
              decideBtnText: "リロード",
              canClose: !1
            }, null, function()
            {
              a.tapBlock(!1);
              a.forceTapBlock(
              {
                isBlock: !1
              });
              a.loading.hide();
              $("#resultCodeError .decideBtn").on(a.cgti, function(a)
              {
                $("#resultCodeError .decideBtn").off();
                b.nativeReload("#/TopPage");
                window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
              })
            })) : window.g_sns && window.app_ver ? g.pageModelGet(c.needModelIdObj) : setTimeout(f, 500)
          };
        setTimeout(f, 500)
      }
    },
    init: function()
    {
      e = g.getPageJson();
      "undefined" !== typeof e.gameUser && b.setUserId(e.gameUser.userId);
      var a = window.deleteAssetArr(),
        d = function()
        {
          "undefined" !== typeof e.gameUser ? z() : ($("#commandDiv").on("nativeCallback", function(a, c)
          {
            $("#commandDiv").off();
            m();
            b.noticeRegist()
          }), b.startTop(), b.changeBg("web_black.jpg"))
        },
        f = function()
        {
          $("#commandDiv").on("nativeCallback", function(c, e)
          {
            $("#commandDiv").off();
            e.isExist ? ($("#commandDiv").on("nativeCallback", function(b, c)
            {
              $("#commandDiv").off();
              a.shift();
              0 < a.length ? f() : d()
            }), c = 6E4 * ((new Date).getTime() / 6E4 | 0), require(["text!" + a[0].jsonFilePath + "?bust=" + c], function(a)
            {
              a = JSON.parse(a);
              b.removeFile(a.list)
            })) : (a.shift(), 0 < a.length ? f() : d())
          });
          b.existFile(a[0].confirmFileNames)
        };
      window.isBrowser ? m() : 0 < a.length ? f() : d()
    },
    remove: function(a)
    {
      h && h.remove();
      b.endTop();
      a()
    }
  }
});
