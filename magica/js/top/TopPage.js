define("underscore backbone backboneCommon ajaxControl command text!template/top/TopPage.html text!css/top/Top.css js/top/RefundPoup text!template/announce/tempTakeover.html text!template/announce/tempNotice01.html text!template/announce/tempNotice02.html".split(" "), function(k, q, a, g, c, r, t, u, v, w, x)
{
  var m, d, n;
  a.displayedTop = !1;
  a.isSetUserData = !1;
  var z = function()
    {
      var b = function()
        {
          "TopPage" !== a.location ? c.setWebView() : ($("#commandDiv").on("saveDataCallback", function(b, f)
          {
            $("#commandDiv").off();
            a.displayedTop ? l() : ($("#commandDiv").on("nativeCallback", function(a, b)
            {
              $("#commandDiv").off();
              l()
            }), c.startTop())
          }), c.checkQuestStored())
        },
        f = function()
        {
          $("#commandDiv").on("nativeCallback", function(c, f)
          {
            $("#commandDiv").off();
            a.nativeDownload = !1;
            b()
          });
          a.displayedTop && b()
        };
      a.nativeDownload = !0;
      if (162 < (window.app_ver.split(".").join("") | 0))
        if (a.displayedTop) f();
        else
        {
          var e = 0;
          $("#configCallback").on("configCallback", function(d, h)
          {
            $("#configCallback").off();
            a.nativeDownload = !1;
            e = h.movie ? h.movie : 0;
            $("#commandDiv").on("nativeCallback", function(d, h)
            {
              $("#commandDiv").off();
              0 !== e ? (f(), c.downloadFile("movie",
              {
                isVisibleCancel: !0,
                description: !0,
                note: !0
              })) : (a.nativeDownload = !1, b())
            });
            c.downloadFile("common")
          });
          c.getDownloadConfig("configCallback")
        }
      else f(), a.displayedTop || c.downloadFile("common")
    },
    l = function()
    {
      d = g.getPageJson();
      a.setStyle(t);
      a.forceTapBlock(
      {
        isBlock: !1
      });
      var b = function()
      {
        c.endTop();
        c.changeBg("web_common.ExportJson");
        c.setWebView();
        m = new A;
        a.globalMenuView && a.globalMenuView.removeView();
        a.displayedTop = !0
      };
      k.has(d.user, "id") ? b() : g.ajaxPost(a.linkList.createUser, null, function(f)
      {
        a.responseSetStorage(f);
        localStorage.clear();
        $("#commandDiv").on("nativeCallback", function(a)
        {
          $("#commandDiv").off();
          b()
        });
        c.configDataInitilize();
        window.isBrowser && nativeCallback()
      })
    },
    A = q.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #transferBtn"] = this.transferPop;
        b[a.cgti + " #CharaListTopBtn"] = this.tapCharaListTopBtn;
        b[a.cgti + " #ArchiveBtn"] = this.tapArchiveBtn;
        b[a.cgti + " #TakeoverBtn"] = this.tapTakeoverBtn;
        b[a.cgti + " #RefundBtn"] = this.tapRefundBtn;
        b[a.cgti + " .noticeText"] = this.tapNoticeText;
        return b
      },
      initialize: function(a)
      {
        this.template = k.template(r);
        d.isServerActive = !0;
        this.createDom()
      },
      render: function()
      {
        window.isDebug && k.findWhere(d.eventList,
        {
          eventType: "AJ2018"
        }) && (d.aj2018 = !0);
        this.$el.html(this.template(
        {
          model: d
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide();
        d && d.gameUser && !a.isSetUserData && (B(
        {
          pageJson: d,
          userData: n
        }), a.isSetUserData = !0)
      },
      tapCharaListTopBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/CharaListTop")
      },
      tapArchiveBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/CollectionTop")
      },
      tapTakeoverBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.targetAnnounceOpen(
        {
          announceData:
          {
            subject: "『魔法少女まどか☆マギカMagia Exedra』連携コードのご案内",
            startAt: "2024-7-31 00:00:00",
            text: v
          },
          dispCallback: function()
          {
            var b = "";
            d.user && d.user.personalId && (b = d.user.personalId, $(".codeSec").removeClass("noDisp"), $("#takeOverCode").html(b), setTimeout(function()
            {
              a.scrollRefresh("scrollTextWrap", "newsField", !0)
            }, 50))
          }
        })
      },
      tapNoticeText: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = {
            Notice01: w,
            Notice02: x
          } [b.currentTarget.dataset.id];
          b = $(b.currentTarget).text();
          a.targetAnnounceOpen(
          {
            announceData:
            {
              subject: b,
              startAt: "2024-7-31 00:00:00",
              text: c
            }
          })
        }
      },
      tapRefundBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || u.checkIsRegistedRepaymentMail(
        {
          pageJson: d
        })
      },
      transferPop: function(b)
      {
        b && b.preventDefault();
        if (!a.isScrolled())
        {
          var c, e, d = this,
            h = function()
            {
              d.transferPop()
            },
            g = !1,
            y = function(b)
            {
              b.preventDefault();
              a.isScrolled() || g || (g = !0, d.transferSubmit(c, e))
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
          a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, function(b)
          {
            b && b.preventDefault();
            a.isScrolled() || (c = a.doc.getElementById("transferPopup").getElementsByClassName("personalId")[0].value, e = a.doc.getElementById("transferPopup").getElementsByClassName("password")[0].value, 8 > e.length || 15 < e.length ? new a.PopupClass(
            {
              title: "引き継ぎ・連携",
              content: "パスワードは8文字以上15文字以内です。",
              popupType: "typeC",
              closeBtnText: "OK"
            }, null, null, h) : (new a.PopupClass(
            {
              title: "引き継ぎ・連携",
              content: "引き継ぎ・連携を行います。<br>よろしいですか？",
              popupType: "typeE",
              closeBtnText: "キャンセル",
              decideBtnText: "OK",
              exClass: "transferCheck"
            }, null, null, h), a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, y)))
          }, !1)
        }
      },
      transferSubmit: function(b, f)
      {
        g.ajaxPost(a.linkList.userTransfer,
        {
          personalId: b,
          password: f
        }, function(b)
        {
          "error" !== b.resultCode && (localStorage.setItem("MainQuestSelectPart", JSON.stringify(
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
            a.displayedTop = !1;
            c.setUserJson("");
            a.refreshStorage();
            c.endTop();
            c.nativeReload("#/TopPage");
            window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
          }))
        })
      }
    }),
    C = function(b)
    {
      var f = b.callback,
        e = !1;
      $("#commandDiv").on("nativeCallback", function(a, b)
      {
        $("#commandDiv").off();
        e = b;
        "undefined" === e && (e = !1);
        f(e)
      });
      window.isBrowser ? nativeCallback("") : (b = window.app_ver.split(".").join("") | 0, a.ua.ios && 320 > b ? (e = !1, f(e)) : a.ua.android && 321 > b ? (e = !1, f(e)) : c.getUserJson())
    },
    D = function(b)
    {
      var c = b.callback,
        e = 0;
      if (a.hasModel("charaList")) c();
      else
      {
        var d = ["CharaCollection", "PieceCollection", "DoppelCollection", "EnemyCollection"],
          h = function(a)
          {
            a = a.apiNum;
            return window.isLocal ? "/magica/json/page/" + d[a] + ".json" : "/magica/api/page/" + d[a]
          },
          p = function(b)
          {
            g.ajaxSimpleGet(h(
            {
              apiNum: b.apiNum
            }), "", function(b)
            {
              a.responseSetStorage(b);
              e++;
              e == d.length ? c() : p(
              {
                apiNum: e
              })
            })
          };
        p(
        {
          apiNum: e
        })
      }
    },
    B = function(b)
    {
      var d = b.pageJson;
      b.userData || (k.each(["charaList", "userPieceCollectionList", "doppelList", "enemyList", "userEnemyList"], function(b, c, f)
      {
        d[b] = a.storage[b].toJSON()
      }), c.setUserJson(d))
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
      id: "userCharaList"
    },
    {
      id: "userCardList"
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
      id: "userPieceArchiveList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaEnhancementCellList"
    }],
    fetch: function()
    {
      var b = this;
      a.displayedTop || c.setWebView(!1);
      c.stopMemoriaTop();
      c.endQuest();
      c.endArena();
      c.endL2d();
      c.hideMiniChara();
      c.hideMultiMiniChara();
      c.popEventBranch();
      c.hideSubQuestBg();
      c.popEventSingleRaid();
      c.deleteEventWitchExchangeAnime();
      c.popEventStoryRaid();
      c.callTouchesClear();
      c.weekQuestTopUnset();
      c.stopComposeEffect();
      c.turnOffCamera();
      c.stopNormalGachaMemoria();
      c.formationPreviewRemove();
      c.enemyFormationPreviewRemove();
      c.endGachaAnimation();
      c.endPlayMovie();
      c.hideEventDungeon();
      c.hideEventRaid();
      c.popEmotionBoard();
      c.deletePuellaHistoriaObject();
      c.deleteScene0StorySelectObject();
      c.deleteScene0StoryListObject();
      var d = function(d)
      {
        if (n = d) g.ApiPageAccessCallback(n);
        else if (console.log("サーバー通信可能"), window.g_sns && window.app_ver || window.isBrowser) g.pageModelGet(b.needModelIdObj);
        else
        {
          var e = 0,
            f = function()
            {
              e++;
              3 < e ? (a.androidKeyStop = !0, c.setWebView(), new a.PopupClass(
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
                  c.nativeReload("#/TopPage");
                  window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
                })
              })) : window.g_sns && window.app_ver ? g.pageModelGet(b.needModelIdObj) : setTimeout(f, 500)
            };
          setTimeout(f, 500)
        }
      };
      a.hasModel("gameUser") ? g.pageModelGet(this.needModelIdObj, null, "noConnect") : C(
      {
        callback: d
      })
    },
    init: function()
    {
      d = g.getPageJson();
      var b = function()
      {
        "undefined" !== typeof d.gameUser && c.setUserId(d.gameUser.userId);
        var b = window.deleteAssetArr(),
          e = function()
          {
            "undefined" !== typeof d.gameUser ? z() : ($("#commandDiv").on("nativeCallback", function(b, a)
            {
              $("#commandDiv").off();
              l()
            }), c.startTop())
          },
          g = function()
          {
            $("#commandDiv").on("nativeCallback", function(a, d)
            {
              $("#commandDiv").off();
              d.isExist ? ($("#commandDiv").on("nativeCallback", function(a, c)
              {
                $("#commandDiv").off();
                b.shift();
                0 < b.length ? g() : e()
              }), a = 6E4 * ((new Date).getTime() / 6E4 | 0), require(["text!" + b[0].jsonFilePath + "?bust=" + a], function(a)
              {
                a = JSON.parse(a);
                c.removeFile(a.list)
              })) : (b.shift(), 0 < b.length ? g() : e())
            });
            c.existFile(b[0].confirmFileNames)
          };
        window.isBrowser ? l() : 0 < b.length && !a.displayedTop ? g() : e()
      };
      d && d.gameUser ? D(
      {
        callback: b
      }) : b()
    },
    remove: function(a)
    {
      m && m.remove();
      c.endTop();
      a()
    }
  }
});
