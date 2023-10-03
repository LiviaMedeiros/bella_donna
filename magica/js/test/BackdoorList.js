define("underscore backbone backboneCommon ajaxControl command text!template/test/backdoorList.html".split(" "), function(f, n, b, d, c, p)
{
  return n.View.extend(
  {
    id: "content",
    className: "hide",
    events: function()
    {
      var a = {};
      a[b.cgti + " #seachable"] = this.seachableFunc;
      a[b.cgti + " #backdoorTutorial"] = this.tutorialFunc;
      a[b.cgti + " #backdoorTutorialReset"] = this.tutorialResetFunc;
      a[b.cgti + " #backdoorTutorialComp"] = this.tutorialCompFunc;
      a[b.cgti + " #regAccRepairReset"] = this.regAccRepairReset;
      a[b.cgti + " .reloadBtn"] = this.reloadFunc;
      a[b.cgti + " .nativeReload"] = this.nativeReloadTest;
      a[b.cgti + " .errorTestBtn"] = this.errorTest;
      a[b.cgti + " .randomError"] = this.rondomeErrorTest;
      a[b.cgti + " .tweetTest"] = this.tweetTest;
      a[b.cgti + " .fullVoiceTest"] = this.fullVoiceTest;
      a[b.cgti + " .chapterClearTest"] = this.chapterClearTest;
      a[b.cgti + " .chapter2ndClearTest"] = this.chapter2ndClearTest;
      a[b.cgti + " #chatTestBtn"] = this.chatTest;
      a[b.cgti + " .errorIdTestBtn"] = this.errorIdTestBtn;
      a[b.cgti + " #localStorageSave"] = this.localStorageSave;
      a[b.cgti + " #localStorageGet"] = this.localStorageGet;
      a[b.cgti + " #localStorageClear"] = this.localStorageClear;
      a[b.cgti + " #EventAccomplishDebugModeNormal"] = this.eventAccomplishDebugModeNormal;
      a[b.cgti + " #EventAccomplishDebugModeChallenge"] = this.eventAccomplishDebugModeChallenge;
      a[b.cgti + " #EventDungeonMapTest"] = this.eventDungeonMapTest;
      a[b.cgti + " .titlePopup"] = this.titlePopup;
      a[b.cgti + " .prologueTestBtn"] = this.prologueTest;
      a[b.cgti + " #startMirrorBattle"] = this.startMirrorBattle;
      a[b.cgti + " #commonStoryTest"] = this.commonStoryTest;
      a[b.cgti + " #mirrorBattleRetry"] = this.mirrorBattleRetry;
      a[b.cgti + " #getPurchaseStatus"] = this.getPurchaseStatus;
      a[b.cgti + " #puellaHistoriaLastBattleSingleRaid"] = this.puellaHistoriaLastBattleSingleRaid;
      a[b.cgti + " #puellaHistoriaLastBattleGroupRaid"] = this.puellaHistoriaLastBattleGroupRaid;
      a[b.cgti + " #toScene0Top"] = this.toScene0Top;
      a[b.cgti + " #toPlayScene0OP"] = this.toPlayScene0OP;
      a[b.cgti + " #getCardAnime"] = this.getCardAnime;
      a[b.cgti + " #testSurround"] = this.testSurround;
      a[b.cgti + " #testSurround2"] = this.testSurround2;
      return a
    },
    initialize: function(b)
    {
      this.template = f.template(p)
    },
    render: function()
    {
      this.$el.html(this.template());
      return this
    },
    regAccRepairReset: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        a = d.getPageJson();
        a = f.findWhere(a.regularEventList,
        {
          regularEventType: "ACCOMPLISH"
        });
        var e = 2013;
        a && (e = a.regularEventId);
        new b.PopupClass(
        {
          title: "バトルミュージアムの回復リセット",
          content: "バトルミュージアムの回復機能をリセットしますか？<br>eventId：<input id='inputEventId' class='commonFrame3' readonly='readonly' type='text' maxlength='4' value=''>",
          decideBtnEvent: function()
          {
            d.ajaxPost(b.linkList.accomplishResetCure,
            {
              regularEventId: e
            }, function(a)
            {
              new b.PopupClass(
              {
                title: "バトルミュージアムの回復リセット",
                content: "バトルミュージアムの回復機能をリセットしました",
                closeBtnText: "閉じる"
              });
              b.responseSetStorage(a)
            })
          },
          decideBtnText: "リセット",
          closeBtnText: "閉じる"
        }, null, function()
        {
          b.doc.getElementById("inputEventId").value = e;
          b.nativeKeyBoard("inputEventId", 15, 1)
        })
      }
    },
    seachableFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || d.ajaxPost(b.linkList.testSeachabke, null, function(a)
      {
        new b.PopupClass(
        {
          title: "完了",
          content: "検索サーバにユーザーを登録しました。<br>しばらく待つと検索できるようになります。（最長15分）",
          closeBtnText: "閉じる"
        })
      })
    },
    chapterClearTest: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var e = "";
        switch (a.currentTarget.dataset.target)
        {
          case "firstChapter":
            e = "１部一括クリア"
        }
        new b.PopupClass(
        {
          title: e,
          content: "実行するにはデッキ１が「いろは単デッキ」になっている<br>必要があります。",
          closeBtnText: "キャンセル",
          decideBtnText: "実行する",
          decideBtnEvent: function()
          {
            d.ajaxPost(b.linkList.backdoor1stChapterClear, null, function(a)
            {
              new b.PopupClass(
              {
                title: e,
                content: "対象のストーリーをすべてクリア状態にしました。",
                closeBtnText: "閉じる"
              }, null, null, function()
              {
                c.nativeReload("#/MyPage");
                window.isDebug && window.isBrowser && (location.href = "#/MyPage", location.reload())
              })
            })
          }
        })
      }
    },
    chapter2ndClearTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || new b.PopupClass(
      {
        title: "2部11章一括クリア",
        content: "第二部の11章まで一括クリアします。",
        closeBtnText: "キャンセル",
        decideBtnText: "実行する",
        decideBtnEvent: function()
        {
          d.ajaxPost(b.linkList.backdoor2ndChapterClear, null, function(a)
          {
            new b.PopupClass(
            {
              title: "2部11章一括クリア",
              content: "対象のストーリーをすべてクリア状態にしました。",
              closeBtnText: "閉じる"
            }, null, null, function()
            {
              c.nativeReload("#/MyPage");
              window.isDebug && window.isBrowser && (location.href = "#/MyPage", location.reload())
            })
          })
        }
      })
    },
    tutorialFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || "TU999" == b.storage.user.get("tutorialId") || "TU997" == b.storage.user.get("tutorialId") || (b.tapBlock(!0), require(["js/util/TutorialUtil.js"], function(a)
      {
        b.tutorialUtil = a;
        b.tutorialId = b.tutorialUtil.getResumeId();
        a.tutorialResume();
        console.log("tutorialId:", b.storage.user.get("tutorialId"))
      }))
    },
    tutorialResetFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || new b.PopupClass(
      {
        title: "チュートリアル設定",
        content: f.template($("#tutorialPop").text())(),
        popupType: "typeE",
        exClass: "transferPop",
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        decideBtnEvent: function()
        {
          var a = b.doc.getElementById("tutorialSelect").value;
          d.ajaxPost(b.linkList.prologueRegister,
          {
            tutorialId: a
          }, function(e)
          {
            new b.PopupClass(
            {
              title: "tutorial reset",
              content: a + "を登録しました。",
              closeBtnText: "閉じる"
            });
            console.log("tutorialIdRegistComp", e);
            b.responseSetStorage(e)
          })
        }
      })
    },
    tutorialCompFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || d.ajaxPost(b.linkList.prologueRegister,
      {
        tutorialId: "TU999"
      }, function(a)
      {
        new b.PopupClass(
        {
          title: "tutorial comp",
          content: "TU999を登録しました。",
          closeBtnText: "閉じる"
        });
        console.log("tutorialIdRegistComp", a);
        b.responseSetStorage(a)
      })
    },
    reloadFunc: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.pageObj.removeCommand(), 160 > (window.app_ver.split(".").join("") | 0) || window.isBrowser ? (c.setWebView(!1), location.href = a.currentTarget.getAttribute("data-href"), location.reload()) : c.nativeReload(a.currentTarget.getAttribute("data-href")))
    },
    nativeReloadTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || c.nativeReload("#/MyPage")
    },
    errorTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = f.template($("#errorTestPop").text()), new b.PopupClass(
      {
        title: "グループ名変更",
        content: a(),
        closeBtnText: "閉じる",
        decideBtnText: "決定",
        decideBtnEvent: function(a)
        {
          a = b.doc.getElementById("errorCode").value;
          d.ajaxPost(b.linkList.backdoorError + "/" + a, "", function(b) {})
        }
      }, null, function()
      {
        b.nativeKeyBoard("errorCode", 3)
      }))
    },
    rondomeErrorTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || d.ajaxPost(b.linkList.randomError, "", function(b)
      {
        console.log("server ramdom error test", b)
      })
    },
    tweetTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = f.template($("#groupNameChangePop").text()), new b.PopupClass(
      {
        title: "グループ名変更",
        content: a(),
        closeBtnText: "閉じる",
        decideBtnText: "ツイート",
        decideBtnEvent: function(a)
        {
          a = b.doc.getElementById("changeName").value.split("?");
          a = a[0].split("/");
          6 > a.length ? new b.PopupClass(
          {
            title: "エラー",
            content: "URLが不正です",
            closeBtnText: "閉じる"
          }) : (a = " ★おためしついーと★%0a https://twitter.com/" + a[3] + "/status/" + a[5] + "/photo/1%0a★おためしついーと★", a = encodeURI(a).replace(/%250a/g, "%0a"), c.browserOpen("https://twitter.com/share?text=" + a + "%0a&count=none&lang=ja"))
        }
      }, null, function()
      {
        b.nativeKeyBoard("changeName", 200)
      }))
    },
    fullVoiceTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || ($(b.ready.target).on("webkitAnimationEnd", function()
      {
        c.changeBg("web_black.jpg");
        $(b.ready.target).off();
        $(b.ready.target).on("webkitAnimationEnd", function(a)
        {
          "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
        });
        $("#commandDiv").on("nativeCallback", function()
        {
          $("#commandDiv").off();
          b.removeClass(b.ready.target, "preNativeFadeIn");
          c.setWebView(!0);
          c.startBgm(b.settingBgm);
          c.changeBg(b.settingBg)
        });
        setTimeout(function()
        {
          c.setWebView(!1);
          c.downloadFileFullVoice("section_event_1033")
        }, 500)
      }), b.addClass(b.ready.target, "preNativeFadeIn"))
    },
    chatTest: function()
    {
      c.startChat()
    },
    errorIdTestBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        $(document).ajaxSend(function(b, a, c)
        {
          a.setRequestHeader("USER-ID-FBA9X88MAE", null)
        });
        var c = function()
        {
          $(document).ajaxSend(function(b, a, c)
          {
            a.setRequestHeader("USER-ID-FBA9X88MAE", window.g_sns)
          })
        };
        $.ajax(
        {
          url: b.linkList.backdoorError,
          type: "POST",
          contentType: "application/JSON",
          dataType: "JSON"
        }).done(function(a)
        {
          "error" !== a.resultCode && c && c(a);
          b.loading.hide()
        })
      }
    },
    prologueTest: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var e = a.currentTarget.dataset.opid;
        c.endL2d();
        $(b.ready.target).on("webkitAnimationEnd", function()
        {
          $(b.ready.target).off();
          $(b.ready.target).on("webkitAnimationEnd", function(a)
          {
            "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
          });
          $("#commandDiv").on("nativeCallback", function(b, a)
          {
            console.log("nativeCallback", a);
            a && "prologue" === a && ($("#commandDiv").off(), c.setWebView())
          });
          setTimeout(function()
          {
            c.startPrologue(e);
            c.setWebView(!1);
            b.removeClass(b.ready.target, "preNativeFadeIn")
          }, 500)
        });
        b.addClass(b.ready.target, "preNativeFadeIn")
      }
    },
    localStorageGet: function(a)
    {
      a.preventDefault();
      b.isScrolled() || console.log("localStorage:", localStorage.getItem("LocalStorageTest"))
    },
    localStorageSave: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (localStorage.setItem("LocalStorageTest", "test"), console.log("localStorage:", localStorage.getItem("LocalStorageTest")))
    },
    localStorageClear: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (localStorage.clear(), b.sfml = {}, console.log("localStorage:", localStorage.getItem("LocalStorageTest")), new b.PopupClass(
      {
        title: "localStorage clear",
        content: "localStorageのデータを削除しました。",
        closeBtnText: "閉じる"
      }))
    },
    titlePopup: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = f.template($("#titlePopupTemp").text()), new b.PopupClass(
      {
        title: "称号変更",
        content: a(),
        popupType: "typeB",
        closeBtnText: "OK"
      }))
    },
    eventAccomplishDebugModeNormal: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.accomplishDebug = "normal", new b.PopupClass(
      {
        title: "踏破イベントデバッグモード",
        content: "ストーリークエストデバッグモードをオンにしました。<br>オフにするにはアプリを再起動してください。",
        closeBtnText: "閉じる"
      }))
    },
    eventAccomplishDebugModeChallenge: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.accomplishDebug = "challenge", new b.PopupClass(
      {
        title: "踏破イベントデバッグモード",
        content: "チャレンジクエストデバッグモードをオンにしました。<br>オフにするにはアプリを再起動してください。",
        closeBtnText: "閉じる"
      }))
    },
    eventDungeonMapTest: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
        if (f.findWhere(d.getPageJson().eventList,
          {
            eventType: "DUNGEON"
          }))
        {
          var c = function(a)
          {
            a = window.isLocal ? JSON.parse(a) : a;
            a.interrupt ? (b.interrupt = null, location.href = a.interrupt.page) : (a = {
              areaId: a.userEventDungeonAreaList[a.userEventDungeonAreaList.length - 1].areaId,
              deckType: 41
            }, console.log("dungeon start Api:", a), d.ajaxPost(b.linkList.dungeonStart, a, function(a)
            {
              console.log("-------- dungeonStart --------");
              console.log("dungeonStartResponse:", a);
              b.responseSetStorage(a);
              location.href = "#/EventDungeonMap"
            }))
          };
          if (window.isLocal) require(["text!/magica/json/page/EventDungeonTop.json"], function(a)
          {
            c(a)
          });
          else
          {
            var g = [],
              h = [],
              k = [],
              l, q = {
                0: 1,
                1: 3,
                2: 5,
                3: 7,
                4: 9,
                5: 10,
                6: 11
              },
              m = b.storage.userPieceList.toJSON();
            b.storage.userCardListEx.each(function(a, b)
            {
              if (7 > b)
              {
                a.toJSON();
                g.push(a.id);
                h.push(q[b]);
                var c = [];
                m[b] && c.push(m[b].id);
                k.push(c);
                0 === b && (l = a.id)
              }
            });
            a = {
              deckType: 41,
              formationSheetId: 111,
              name: "ダンジョン1",
              episodeUserCardId: l
            };
            a.userCardIds = g;
            a.questPositionIds = h;
            a.userPieceIdLists = k;
            console.log("dungeon deck savePrm:", a);
            d.ajaxPost(b.linkList.userDeckSave, a, function(a)
            {
              b.responseSetStorage(a);
              d.ajaxSimpleGet("/magica/api/page/EventDungeonTop", "", c)
            })
          }
        }
      else new b.PopupClass(
      {
        title: "エラー",
        content: "ダンジョンイベントの開催期間外です。",
        closeBtnText: "閉じる"
      })
    },
    startMirrorBattle: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (c.setWebView(!1), c.startMirrorBattle(
      {
        resultUrl: "/magica/index.html#/MainQuest",
        retireUrl: "/magica/index.html#/TopPage"
      }))
    },
    commonStoryTest: function(a)
    {
      a.preventDefault();
      b.isScrolled() || b.playStory(
      {
        cmd: c,
        ajaxControl: d,
        storyId: "101203-8",
        fullVoiceSectionId: 101203,
        isForcePlay: !0,
        callback: function()
        {
          new b.PopupClass(
          {
            title: "ストーリー再生終了",
            content: "ストーリーが終わりました。",
            closeBtnText: "閉じる"
          })
        }
      })
    },
    mirrorBattleRetry: function(a)
    {
      a.preventDefault();
      b.isScrolled() || d.ajaxPost(b.linkList.backdoorMirrorBattleRetry, null, function(a)
      {
        new b.PopupClass(
        {
          title: "理違いバトル再挑戦",
          content: "理違いバトルに再挑戦できるようになりました。",
          closeBtnText: "閉じる"
        })
      })
    },
    getPurchaseStatus: function(a)
    {
      a.preventDefault();
      b.isScrolled() || ($("#commandDiv").on("nativeCallback", function(a, c)
      {
        $("#commandDiv").off();
        var d = "ロック状態のはありません";
        a = c.product_ids;
        0 < a.length && (d = "ロック状態のproduct_idリスト<br>", f.each(a, function(a, b, c)
        {
          d += "・" + String(a);
          d += "<br>"
        }));
        new b.PopupClass(
        {
          title: "マギアストーン購入状況確認",
          content: d,
          popupType: "typeB",
          closeBtnText: "閉じる"
        })
      }), c.getPurchaseStatus(), a = {
        product_ids: ["aaaa", "bbbb", "cccc"]
      }, window.isBrowser && nativeCallback(a))
    },
    puellaHistoriaLastBattleSingleRaid: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (location.href = "#/PuellaHistoriaSingleRaid")
    },
    puellaHistoriaLastBattleGroupRaid: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (location.href = "#/EventPuellaRaidTop")
    },
    toScene0Top: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (location.href = "#/Scene0Top")
    },
    toPlayScene0OP: function(a)
    {
      a.preventDefault();
      b.isScrolled() || b.preNativeFadeIn(function()
      {
        b.ready.show();
        c.stopBgm();
        $("#commandDiv").on("nativeCallback", function(a, d)
        {
          $("#commandDiv").off();
          b.ready.target.className = "";
          c.changeBg(b.background);
          c.startBgm(b.bgm);
          b.androidKeyStop = !1;
          c.setWebView();
          b.ready.hide()
        });
        c.playMovieNoSkip("resource/movie/other/op_movie3.usm");
        window.isBrowser && nativeCallback()
      }, 500)
    },
    getCardAnime: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (c.endL2d(), $("#commandDiv").on("nativeCallback", function()
      {
        $("#commandDiv").off();
        c.startBgm(b.settingBgm);
        setTimeout(function()
        {
          c.setWebView(!0);
          b.androidKeyStop = !1;
          b.ready.target.className = "readyFadeOut";
          c.changeBg("web_common.ExportJson")
        }, 50)
      }), $(b.ready.target).on("webkitAnimationEnd", function()
      {
        c.stopBgm();
        c.changeBg("web_black.jpg");
        $(b.ready.target).off();
        $(b.ready.target).on("webkitAnimationEnd", function(a)
        {
          "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
        });
        setTimeout(function()
        {
          c.setWebView(!1);
          c.startPresentAnimation(
          {
            gachaAnimation:
            {
              direction1: 1,
              direction2: 1,
              direction3: 1,
              gachaResultList: [
              {
                type: "CARD",
                rarity: "RANK_4",
                cardId: 40144,
                attributeId: "LIGHT",
                charaId: 4014,
                direction: 4,
                displayName: "昴 かずみ",
                isNew: !0
              }]
            }
          })
        }, 500)
      }), b.addClass(b.ready.target, "preNativeFadeIn"))
    },
    testSurround: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (c.stopSe(), c.stopSur(), setTimeout(function()
      {
        c.startSur("8092_film")
      }, 10))
    },
    testSurround2: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (c.stopSe(), c.stopSur(), setTimeout(function()
      {
        c.startSur("9004_historia")
      }, 10))
    }
  })
});
