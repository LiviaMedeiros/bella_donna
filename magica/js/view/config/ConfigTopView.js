define("underscore backbone backboneCommon ajaxControl command text!template/config/ConfigTop.html js/view/config/ConfigTopDataPopView js/config/DeleteUserData".split(" "), function(l, r, a, m, d, t, n, u)
{
  var h, q, k, c, p, g = 0,
    v = function(b)
    {
      b.preventDefault();
      if (!(a.isScrolled() || 0 < g))
      {
        g++;
        a.tapBlock(!0);
        b = {
          password: a.doc.getElementById("transferPassword").value
        };
        var c = function(b)
        {
          "error" !== b.resultCode && (a.responseSetStorage(b), new a.PopupClass(
          {
            title: "パスワード設定",
            content: "パスワード設定が完了しました。",
            closeBtnText: "閉じる",
            popupType: "typeC"
          }), a.tapBlock(!1), g = 0, a.addClass(a.doc.getElementById("menuPanel").getElementsByClassName("noPassIcon")[0], "off"), a.doc.getElementById("transferSettings").textContent = "設定済み")
        };
        "" !== a.doc.getElementById("transferPassword").value ? a.doc.getElementById("transferPassword").value === a.doc.getElementById("checkPassWord").value ? 7 < a.doc.getElementById("transferPassword").value.length && 16 > a.doc.getElementById("transferPassword").value.length ? m.ajaxPost(a.linkList.userPassword, b, c) : (new a.PopupClass(
        {
          title: "エラー",
          content: "パスワードは8文字以上15文字以内で<br>設定してください。",
          popupType: "typeC",
          closeBtnText: "閉じる"
        }), a.tapBlock(!1)) : (new a.PopupClass(
        {
          title: "エラー",
          content: "パスワードと確認用入力欄が一致しません。",
          popupType: "typeC",
          closeBtnText: "閉じる"
        }), a.tapBlock(!1)) : (new a.PopupClass(
        {
          title: "エラー",
          content: "パスワードを入力してください。",
          popupType: "typeC",
          closeBtnText: "閉じる"
        }), a.tapBlock(!1))
      }
    },
    w = function(b)
    {
      b.preventDefault();
      if (!(a.isScrolled() || 0 < g))
      {
        g++;
        var c = function()
        {
          d.nativeReload("#/TopPage");
          window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
        };
        m.ajaxPost(a.linkList.userChangeName, p, function(b)
        {
          "error" !== b.resultCode && (a.responseSetStorage(b), new a.PopupClass(
          {
            title: "プレイヤー名変更",
            content: "プレイヤー名の変更が完了しました。",
            closeBtnText: "トップページへ",
            popupType: "typeC"
          }, null, null, c), a.tapBlock(!1), g = 0, a.doc.getElementById("userName").textContent = p.name, a.addClass(a.doc.getElementById("nameChange"), "off"))
        })
      }
    };
  return r.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #menuPanel .btn"] = this.switchShow;
      b[a.cgti + " #transfer"] = this.transferHandler;
      b[a.cgti + " #nameChange"] = this.nameChangeHandler;
      b[a.cgti + " #idCopy"] = this.userIdCopy;
      b[a.cgti + " #transferIdCopy"] = this.transferIdCopy;
      b[a.cgti + " #cacheClear"] = this.cacheClear;
      b[a.cgti + " .slider"] = this.sliderCount;
      b[a.cgti + " #voices .checkBox"] = this.voicePopHandler;
      b[a.cgti + " #fullVoiceBtn"] = this.fullVoiceDownload;
      b[a.cgti + " #movies .checkBox"] = this.moviePopHandler;
      b[a.cgti + " #movieAddBtn"] = this.movieAddBtn;
      b[a.cgti + " #fullMovieBtn"] = this.fullMovieDownload;
      b[a.cgti + " #allDownload"] = this.allDownloadPopHandler;
      b[a.cgti + " .dataDeleteCheckBox"] = this.dataDeletePopHandler;
      b[a.cgti + " #pushAP"] = this.pushApToggle;
      b[a.cgti + " #pushEvent"] = this.pushEventToggle;
      b[a.cgti + " .outerLink"] = this.outerLink;
      b[a.cgti + " #codeSubmit"] = this.serialCodeSubmit;
      b[a.cgti + " #deleteUserDataBtn"] = this.deleteUserData;
      return b
    },
    initialize: function(a)
    {
      this.template = l.template(t);
      g = 0;
      this.createDom()
    },
    render: function()
    {
      h = m.getPageJson();
      this.$el.html(this.template(h));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.resourceConfig = {};
      this.resourceConfig.voice = 0;
      this.resourceConfig.deleteVoice = 0;
      this.resourceConfig.movie = 1;
      this.resourceConfig.deleteMovie = 1;
      this.noticeAp = this.noticeSet = !1;
      c = this;
      this.configAllReGet();
      n.prototype.rootView = this;
      n.prototype.template = $("#dataPopInner").text();
      a.setGlobalView();
      a.scrollSet("datasWrap", "configScroll");
      a.scrollSet("inputCodeWrap", "codeScroll");
      a.ready.hide();
      if ("DMM" === h.currentPlatform || "ANDROID" === h.currentPlatform)
      {
        var b = function()
          {
            var b = a.doc.getElementById("presentCode").value,
              c = "",
              f = "";
            if (0 < b.length)
            {
              for (var b = b.toUpperCase().split(""), d = 0; d < b.length;) 0 !== d && 0 === d % 4 && (c += "-"), c += b[d], f += b[d], d = d + 1 | 0;
              a.doc.getElementById("presentCode").value = f;
              12 === d ? (a.doc.getElementById("codeCaution").textContent = "", a.removeClass(a.doc.getElementById("codeSubmit"), "off")) : (a.doc.getElementById("codeCaution").textContent = "※シリアルコードは12桁で入力してください。", a.addClass(a.doc.getElementById("codeSubmit"), "off"))
            }
            else a.doc.getElementById("codeCaution").textContent = "※シリアルコードは12桁で入力してください。", a.addClass(a.doc.getElementById("codeSubmit"), "off");
            a.doc.getElementById("codeAfter").textContent = c;
            a.scrollRefresh("codeWrap", "codeScroll")
          },
          f = function(c)
          {
            c.preventDefault();
            a.isScrolled() || a.nativeKeyBoard("presentCode", 12, 1, null, b)
          };
        a.doc.getElementById("presentCode").addEventListener(a.cgti, f);
        window.isBrowser && window.isDebug && (a.doc.getElementById("presentCode").removeAttribute("readonly"), a.doc.getElementById("presentCode").removeEventListener(a.cgti, f), a.doc.getElementById("presentCode").addEventListener("keyup", b))
      }
      window.isLocal && window.isBrowser && (1 === c.resourceConfig.voice ? (a.addClass(a.doc.getElementById("voiceDataWrap"), "on"), a.removeClass(a.doc.getElementById("voiceDataOffWrap"), "on"), a.removeClass(a.doc.getElementById("fullVoiceBtn"), "off")) : 0 === c.resourceConfig.voice && (a.removeClass(a.doc.getElementById("voiceDataWrap"), "on"), a.addClass(a.doc.getElementById("voiceDataOffWrap"), "on"), a.addClass(a.doc.getElementById("fullVoiceBtn"), "off"), a.addClass(a.doc.getElementById("voiceDeleteSettingWrap"), "invalid")), 2 === c.resourceConfig.movie ? (a.addClass(a.doc.getElementById("movieDataWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataLowWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataOffWrap"), "on")) : 1 === c.resourceConfig.movie ? (a.removeClass(a.doc.getElementById("movieDataWrap"), "on"), a.addClass(a.doc.getElementById("movieDataLowWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataOffWrap"), "on")) : (a.removeClass(a.doc.getElementById("movieDataWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataLowWrap"), "on"), a.addClass(a.doc.getElementById("movieDataOffWrap"), "on"), a.addClass(a.doc.getElementById("movieDeleteSettingWrap"), "invalid")), c.noticeSet ? c.noticeSet && (a.doc.getElementById("pushEvent").textContent = "ON") : a.doc.getElementById("pushEvent").textContent = "OFF", c.noticeAp ? c.noticeAp && (a.doc.getElementById("pushAP").textContent = "ON") : a.doc.getElementById("pushAP").textContent = "OFF", 0 === c.resourceConfig.deleteVoice ? a.addClass(a.doc.getElementById("voiceDeleteSettingWrap"), "on") : a.addClass(a.doc.getElementById("fullVoiceBtn"), "off"), 0 === c.resourceConfig.deleteMovie && a.addClass(a.doc.getElementById("movieDeleteSettingWrap"), "on"))
    },
    switchShow: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = a.doc.getElementById("configWrap");
        c.classList.contains(b.currentTarget.dataset.type) || (c.className = "commonFrame1", a.addClass(c, b.currentTarget.dataset.type), a.removeClass(a.doc.getElementById("menuPanel").getElementsByClassName("current")[0], "current"), a.addClass(b.currentTarget, "current"), a.doc.getElementById("listTitle").textContent = b.currentTarget.textContent, a.doc.getElementById("configWrap").scrollTop = 0, "datas" !== b.currentTarget.dataset.type && "inputCode" !== b.currentTarget.dataset.type || a.scrollRefresh())
      }
    },
    transferHandler: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (g = 0, b = l.template(a.doc.getElementById("transferInner").textContent), new a.PopupClass(
      {
        title: "パスワード設定",
        content: b(
        {
          user: a.storage.user.toJSON()
        }),
        exClass: "transferPop",
        popupType: "typeE",
        closeBtnText: "キャンセル",
        decideBtnText: "設定"
      }), a.nativeKeyBoard("transferPassword", -1, 1), a.nativeKeyBoard("checkPassWord", -1, 1), a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, v))
    },
    nameChangeHandler: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !b.currentTarget.classList.contains("off"))
      {
        g = 0;
        b = l.template($("#nameChangePop").text());
        var c = a.doc.getElementById("userName").textContent;
        new a.PopupClass(
        {
          title: "プレイヤー名変更",
          content: b(),
          closeBtnText: "閉じる",
          decideBtnText: "確認"
        });
        a.doc.getElementById("changeName").value = a.doc.getElementById("userName").textContent;
        a.doc.getElementById("textCount").textContent = c.length;
        a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, this.nameChangeConfirm);
        a.nativeKeyBoard("changeName", 8, null, "textCount")
      }
    },
    nameChangeConfirm: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.tapBlock(!0), p = {
        name: a.doc.getElementById("changeName").value
      }, "" === a.doc.getElementById("changeName").value ? (new a.PopupClass(
      {
        title: "プレイヤー名変更",
        content: "プレイヤー名を入力してください。",
        closeBtnText: "閉じる",
        popupType: "typeC"
      }), a.tapBlock(!1), g = 0) : (new a.PopupClass(
      {
        title: "プレイヤー名変更",
        content: "名前を「<span class='popUserName'></span>」に変更しますがよろしいですか？<br><br><span class='c_red'>※名前の変更は１日に１回だけ可能です<br>※変更後はトップページに戻ります",
        closeBtnText: "閉じる",
        decideBtnText: "変更"
      }, null, function()
      {
        $(a.doc.getElementsByClassName("popUserName")).text(p.name)
      }), a.tapBlock(!1), a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, w)))
    },
    userIdCopy: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = a.storage.gameUser.get("inviteCode"), d.copyClipboard(b), new a.PopupClass(
      {
        title: "プレイヤーID",
        content: "クリップボードにコピーしました。",
        closeBtnText: "OK",
        popupType: "typeC"
      }))
    },
    transferIdCopy: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = a.storage.user.get("personalId"), d.copyClipboard(b), new a.PopupClass(
      {
        title: "引き継ぎ・連携ID",
        content: "クリップボードにコピーしました。",
        closeBtnText: "OK",
        popupType: "typeC"
      }))
    },
    cacheClear: function(b)
    {
      a.isScrolled() || q || (d.clearWebCache(!0), new a.PopupClass(
      {
        title: "キャッシュクリア",
        content: "キャッシュクリアしました。",
        closeBtnText: "閉じる",
        popupType: "typeC"
      }), a.addClass(b.currentTarget, "grayScale"), q = !0)
    },
    sliderCount: function(a)
    {
      a.preventDefault();
      this.paramaterSet(a.currentTarget.id, a.currentTarget.value)
    },
    voicePopHandler: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = {
        type: "voice"
      }, b.onFlag = 1 === this.resourceConfig.voice ? !0 : !1, new a.PopupClass(
      {
        title: "データ設定変更",
        content: "",
        popupType: "typeC"
      }, null, null, function()
      {
        k.removeView()
      }), k = new n(b), a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(k.render().el))
    },
    fullVoiceDownload: function(b)
    {
      b.preventDefault();
      a.isScrolled() || new a.PopupClass(
      {
        title: "ストーリーボイス一括ダウンロード",
        content: '未ダウンロードのメインストーリーのボイスを一括ダウンロードします。<br><span class="c_red">※Wi-Fiなど安定した通信環境をお勧めいたします。</span>',
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        exClass: "allDlPop"
      }, null, function()
      {
        $(".decideBtn").on(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || ($(".decideBtn").off(), a.androidKeyStop = !0, window.isBrowser ? (d.downloadFileConfigPage("fullvoice"), new a.PopupClass(
          {
            title: "データダウンロード",
            content: "データのダウンロードが完了しました。",
            closeBtnText: "OK",
            popupType: "typeC"
          }), a.androidKeyStop = !1) : ($("#commandDiv").on("nativeCallback", function()
          {
            $("#commandDiv").off();
            c.configAllReGet();
            d.setWebView(!0);
            d.startBgm(a.settingBgm);
            new a.PopupClass(
            {
              title: "データダウンロード",
              content: "データのダウンロードが完了しました。",
              closeBtnText: "OK",
              popupType: "typeC"
            });
            a.androidKeyStop = !1
          }), d.setWebView(!1), d.downloadFileConfigPage("fullvoice")))
        })
      }, function()
      {
        $(".decideBtn").off()
      })
    },
    moviePopHandler: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = {
          type: "movie"
        };
        c.onFlag = 0 < this.resourceConfig.movie ? !0 : !1;
        c.newType = b.currentTarget.dataset.movieType;
        c.oldType = this.resourceConfig.movie;
        new a.PopupClass(
        {
          title: "データ設定変更",
          content: "",
          popupType: "typeC"
        }, null, null, function()
        {
          k.removeView()
        });
        k = new n(c);
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(k.render().el)
      }
    },
    movieAddBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || ($("#commandDiv").on("nativeCallback", function(b, e)
      {
        $("#commandDiv").off();
        c.configAllReGet();
        d.setWebView(!0);
        d.startBgm(a.settingBgm);
        new a.PopupClass(
        {
          title: "ムービーデータ",
          content: "ムービーデータのダウンロードが完了しました。",
          closeBtnText: "OK",
          popupType: "typeC"
        });
        a.androidKeyStop = !1
      }), a.androidKeyStop = !0, d.setWebView(!1), d.downloadFile("movie",
      {
        isVisibleCancel: !0,
        description: !0,
        note: !0
      }))
    },
    fullMovieDownload: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        $("#commandDiv").on("nativeCallback", function(b, f)
        {
          $("#commandDiv").off();
          c.configAllReGet();
          d.setWebView(!0);
          d.startBgm(a.settingBgm);
          new a.PopupClass(
          {
            title: "ムービーデータ",
            content: "ムービーデータのダウンロードが完了しました。",
            closeBtnText: "OK",
            popupType: "typeC"
          });
          a.androidKeyStop = !1
        });
        var f = {
          isVisibleCancel: !0,
          description: !0,
          note: !0
        };
        a.androidKeyStop = !0;
        d.setWebView(!1);
        this.resourceConfig.deleteMovie = 0;
        b = {};
        b.voice = this.resourceConfig.deleteVoice;
        b.movie = this.resourceConfig.deleteMovie;
        d.setDownloadDeleteConfig(b);
        setTimeout(function()
        {
          d.downloadFile("movieall", f)
        }, 500)
      }
    },
    allDownloadPopHandler: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = l.template($("#allDownloadPop").text()), new a.PopupClass(
      {
        title: "データの最適化",
        content: b(),
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        exClass: "allDlPop"
      }), a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, c.allDataDownload), a.addClass(a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0], "popupCloseBtn"))
    },
    dataDeletePopHandler: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var f = b.currentTarget.dataset.deleteType,
          e = a.doc.getElementById(f + "DeleteSettingWrap"),
          g = e.classList.contains("on");
        b = l.template($("#deleteConfirmPop").text());
        new a.PopupClass(
        {
          title: "データの削除の設定",
          content: b(
          {
            type: f,
            isOn: g
          }),
          closeBtnText: "OK",
          exClass: "dataDeletePopup"
        }, null, null, function()
        {
          g ? (a.removeClass(e, "on"), "voice" == f ? (a.addClass(a.doc.getElementById("fullVoiceBtn"), "off"), c.resourceConfig.deleteVoice = 1) : c.resourceConfig.deleteMovie = 1) : (a.addClass(e, "on"), "voice" == f ? (a.removeClass(a.doc.getElementById("fullVoiceBtn"), "off"), c.resourceConfig.deleteVoice = 0) : c.resourceConfig.deleteMovie = 0);
          var b = {};
          b.voice = c.resourceConfig.deleteVoice;
          b.movie = c.resourceConfig.deleteMovie;
          d.setDownloadDeleteConfig(b)
        })
      }
    },
    allDataDownload: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.androidKeyStop = !0, window.isBrowser ? (a.addClass(a.doc.getElementById("voiceDataWrap"), "on"), a.addClass(a.doc.getElementById("movieDataWrap"), "on"), c.resourceConfig.voice = 1, c.resourceConfig.movie = 1, new a.PopupClass(
      {
        title: "データの最適化",
        content: "データの最適化が完了しました。",
        closeBtnText: "OK",
        popupType: "typeC"
      }), a.androidKeyStop = !1) : ($("#commandDiv").on("nativeCallback", function()
      {
        $("#commandDiv").off();
        $("#commandDiv").on("nativeCallback", function()
        {
          $("#commandDiv").off();
          c.configAllReGet();
          d.setWebView(!0);
          d.startBgm(a.settingBgm);
          new a.PopupClass(
          {
            title: "データの最適化",
            content: "データの最適化が完了しました。",
            closeBtnText: "OK",
            popupType: "typeC"
          });
          a.androidKeyStop = !1
        });
        d.downloadFileConfigPage("all");
        window.isBrowser && nativeCallback()
      }), d.setWebView(!1), d.removeAsset("common", "nativeCallback"), window.isBrowser && nativeCallback()))
    },
    pushApToggle: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        if (this.noticeAp) d.noticeApFullOff();
        else
        {
          b = a.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON();
          var f = a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON();
          b = a.getApRemainTime(b, f, h.currentTime);
          1 > b ? d.noticeApFullTurnOn() : d.noticeApFullSet(b)
        }
        c.configAllReGet()
      }
    },
    pushEventToggle: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        if (this.noticeSet) d.noticeRestore();
        else
        {
          b = a.storage.user.toJSON();
          var f = a.storage.gameUser.toJSON();
          d.noticeTurnOn(
          {
            tag1: b.purchaseTag,
            tag2: f.levelTag,
            tag3: f.progressTag
          })
        }
        c.configAllReGet()
      }
    },
    outerLink: function(b)
    {
      b.preventDefault();
      a.isScrolled() || b.currentTarget.dataset.url && d.browserOpen(b.currentTarget.dataset.url)
    },
    serialCodeSubmit: function(b)
    {
      b.preventDefault();
      a.isScrolled() || b.currentTarget.classList.contains("off") || "DMM" !== h.currentPlatform && "ANDROID" !== h.currentPlatform || (b = String(a.doc.getElementById("presentCode").value), m.ajaxPost(a.linkList.serialSend,
      {
        serial: b
      }, function(b)
      {
        if ("error" !== b.resultCode)
          if (a.responseSetStorage(b), b.messageType)
          {
            var c = "";
            switch (b.messageType)
            {
              case "INVALID":
                c = "入力されたシリアルコードに誤りがあります。<br>※シリアルコードは、ー（ハイフン）を除いた12桁の半角英数字です。";
                break;
              case "DUPLICATE":
                c = "入力されたシリアルコードは特典受取り済です。<br>※特典はプレゼントボックスよりお受け取りください。";
                break;
              case "OUT_OF_TERM":
                c = "入力されたシリアルコードは有効期間外です。"
            }
            new a.PopupClass(
            {
              title: "エラー",
              content: c,
              closeBtnText: "OK",
              popupType: "typeC"
            })
          }
        else new a.PopupClass(
        {
          title: "シリアルコード",
          content: "受け取りが完了しました。<br>特典はプレゼントボックスよりお受け取りください。",
          closeBtnText: "OK",
          popupType: "typeC"
        })
      }))
    },
    configAllReGet: function()
    {
      var b = 0;
      $("#configCallback").on("configCallback", function(d, e)
      {
        if (void 0 !== e.bgm) a.doc.getElementById("bgmSlider").value = 10 * e.bgm;
        else if (void 0 !== e.se) a.doc.getElementById("soundSlider").value = 10 * e.se;
        else if (void 0 !== e.vo) a.doc.getElementById("voiceSlider").value = 10 * e.vo;
        else if (void 0 !== e.movie || void 0 !== e.voice) c.resourceConfig.voice = e.voice, c.resourceConfig.movie = e.movie, a.donwloadConfig = e;
        else if (void 0 !== e.pnote) c.noticeSet = 1 === e.pnote ? !0 : !1;
        else if (void 0 !== e.Sun) c.noticeWeekly = e;
        else if (void 0 !== e.ap) c.noticeAp = 1 === e.ap ? !0 : !1, a.noticeAp = c.noticeAp;
        else if (void 0 !== e.deleteMovie || void 0 !== e.deleteVoice) c.resourceConfig.deleteVoice = e.deleteVoice, c.resourceConfig.deleteMovie = e.deleteMovie;
        b++;
        6 < b && (1 === c.resourceConfig.voice ? (a.addClass(a.doc.getElementById("voiceDataWrap"), "on"), a.removeClass(a.doc.getElementById("voiceDataOffWrap"), "on"), 0 === c.resourceConfig.deleteVoice && a.removeClass(a.doc.getElementById("fullVoiceBtn"), "off"), a.removeClass(a.doc.getElementById("voiceDeleteSettingWrap"), "invalid")) : 0 === c.resourceConfig.voice && (a.removeClass(a.doc.getElementById("voiceDataWrap"), "on"), a.addClass(a.doc.getElementById("voiceDataOffWrap"), "on"), a.addClass(a.doc.getElementById("fullVoiceBtn"), "off"), a.addClass(a.doc.getElementById("voiceDeleteSettingWrap"), "invalid")), 2 === c.resourceConfig.movie ? (a.addClass(a.doc.getElementById("movieDataWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataLowWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataOffWrap"), "on"), a.removeClassId("fullMovieBtn", "off"), a.removeClass(a.doc.getElementById("movieDeleteSettingWrap"), "invalid")) : 1 === c.resourceConfig.movie ? (a.removeClass(a.doc.getElementById("movieDataWrap"), "on"), a.addClass(a.doc.getElementById("movieDataLowWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataOffWrap"), "on"), a.removeClassId("fullMovieBtn", "off"), a.removeClass(a.doc.getElementById("movieDeleteSettingWrap"), "invalid")) : (a.removeClass(a.doc.getElementById("movieDataWrap"), "on"), a.removeClass(a.doc.getElementById("movieDataLowWrap"), "on"), a.addClass(a.doc.getElementById("movieDataOffWrap"), "on"), a.addClassId("fullMovieBtn", "off"), a.addClass(a.doc.getElementById("movieDeleteSettingWrap"), "invalid")), c.noticeSet ? c.noticeSet && (a.doc.getElementById("pushEvent").textContent = "ON") : a.doc.getElementById("pushEvent").textContent = "OFF", c.noticeAp ? c.noticeAp && (a.doc.getElementById("pushAP").textContent = "ON") : a.doc.getElementById("pushAP").textContent = "OFF", 0 === c.resourceConfig.deleteVoice ? a.addClass(a.doc.getElementById("voiceDeleteSettingWrap"), "on") : a.addClass(a.doc.getElementById("fullVoiceBtn"), "off"), 0 === c.resourceConfig.deleteMovie && a.addClass(a.doc.getElementById("movieDeleteSettingWrap"), "on"), $("#configCallback").off())
      });
      d.getBGMVolume("configCallback");
      d.getSEVolume("configCallback");
      d.getVOVolume("configCallback");
      d.getDownloadConfig("configCallback");
      d.getDownloadDeleteConfig("configCallback");
      d.noticeGetStatus("configCallback");
      d.noticeApConfig("configCallback");
      window.isBrowser && (configCallback(
      {
        bgm: 12
      }), configCallback(
      {
        se: 23
      }), configCallback(
      {
        vo: 34
      }), configCallback(
      {
        movie: c.resourceConfig.movie,
        voice: c.resourceConfig.voice
      }), configCallback(
      {
        deleteVoice: c.resourceConfig.deleteVoice,
        deleteMovie: c.resourceConfig.deleteMovie
      }), configCallback(
      {
        pnote: 0
      }), configCallback(
      {
        ap: 0
      }))
    },
    paramaterSet: function(a, c)
    {
      switch (a)
      {
        case "bgmSlider":
          c = (c / 10).toFixed(2);
          d.setBGMVolume(c);
          break;
        case "soundSlider":
          c = (c / 10).toFixed(2);
          d.setSEVolume(c);
          break;
        case "voiceSlider":
          c = (c / 10).toFixed(2), d.setVOVolume(c)
      }
    },
    deleteUserData: function()
    {
      u.init()
    }
  })
});
