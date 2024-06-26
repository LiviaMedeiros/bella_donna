define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(k, I, a, n, d)
{
  function v()
  {
    var b = a.doc.getElementById("mainContent");
    b.addEventListener("webkitAnimationEnd", function h(g)
    {
      a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
      a.addClass(a.doc.querySelector("#baseContainer"), "type01");
      g = a.doc.getElementById("sideMenu");
      var f = a.doc.getElementById("menu"),
        d = g.getElementsByClassName("gacha")[0];
      f.addEventListener(a.cgti, function q(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.addClass(f, "off"), a.removeClass(a.doc.querySelector("#tutorialContainer"), "show"), a.removeClass(a.doc.querySelector("#baseContainer"), "type01"), setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type02")
        }, 10), c.tutorialText("TU510_2"), f.removeEventListener(a.cgti, q, !1))
      }, !1);
      d.addEventListener(a.cgti, function l(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/GachaTop/SELECTABLE_TUTORIAL/TU520", a.removeClass(f, "off"), a.removeClass(a.doc.querySelector("#baseContainer"), "type02"), d.removeEventListener(a.cgti, l, !1))
      }, !1);
      b.removeEventListener("webkitAnimationEnd", h, !1)
    }, !1)
  }

  function x()
  {
    var b = a.doc.getElementById("mainContent");
    a.doc.querySelector("#tutorialContainer");
    a.doc.querySelector("#tutorialContainer .bgWrap");
    25 > a.getTotalStone().totalMoney ? d.nativeReload("#/TopPage") : b.addEventListener("webkitAnimationEnd", function h(g)
    {
      a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
      a.selectableChara && a.selectableChara[a.selectableGachaModel.id] ? (c.tutorialText("TU520_2"), a.addClass(a.doc.querySelector("#baseContainer"), "type02")) : (a.addClass(a.doc.querySelector("#baseContainer"), "type01"), $(a.doc.querySelector("#tutorialContainer")).on(a.cgti, function(b)
      {
        $(a.doc.querySelector("#tutorialContainer")).off();
        d.startSe(1008);
        a.removeClass(a.doc.querySelector("#tutorialContainer"), "show")
      }));
      b.removeEventListener("webkitAnimationEnd", h, !1)
    }, !1)
  }

  function y()
  {
    var b = a.doc.getElementById("mainContent");
    b.addEventListener("webkitAnimationEnd", function h(c)
    {
      a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
      a.addClass(a.doc.querySelector("#baseContainer"), "type01");
      c = a.doc.getElementById("sideMenu");
      var f = a.doc.getElementById("menu"),
        d = c.getElementsByClassName("team")[0];
      f.addEventListener(a.cgti, function q(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.addClass(f, "off"), a.removeClass(a.doc.querySelector("#tutorialContainer"), "show"), a.removeClass(a.doc.querySelector("#baseContainer"), "type01"), setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type02")
        }, 10), f.removeEventListener(a.cgti, q, !1))
      }, !1);
      d.addEventListener(a.cgti, function l(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/FormationTop/TU550", a.removeClass(f, "off"), a.removeClass(a.doc.querySelector("#baseContainer"), "type02"), d.removeEventListener(a.cgti, l, !1))
      }, !1);
      b.removeEventListener("webkitAnimationEnd", h, !1)
    }, !1)
  }

  function z()
  {
    var b = a.doc.getElementById("mainContent");
    b.addEventListener("webkitAnimationEnd", function h(c)
    {
      a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
      var f = a.doc.getElementsByClassName("questBtn")[0];
      f.addEventListener(a.cgti, function p(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/DeckFormation/TU560", f.removeEventListener(a.cgti, p, !1))
      }, !1);
      b.removeEventListener("webkitAnimationEnd", h, !1)
    }, !1)
  }

  function A()
  {
    var b = a.doc.getElementById("mainContent");
    b.addEventListener("webkitAnimationEnd", function h(d)
    {
      a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
      var f = a.doc.querySelectorAll("#DeckFormation .deckViewWrap .deckPartsWrap .deckParts");
      d = !1;
      f[3].classList.contains("on") ? c.TU560("save2") : f[0].classList.contains("on") ? d = !0 : a.addClass(a.doc.querySelector("#baseContainer"), "type01");
      var f = a.doc.getElementById("sideMenu"),
        g = a.doc.getElementById("menu"),
        p = f.getElementsByClassName("globalQuestBtn")[0];
      g.addEventListener(a.cgti, function l(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.addClass(g, "off"), a.removeClass(a.doc.querySelector("#tutorialContainer"), "show"), a.removeClass(a.doc.querySelector("#baseContainer"), "type04"), c.tutorialText("TU560_4"), setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type05")
        }, 10), g.removeEventListener(a.cgti, l, !1))
      }, !1);
      p.addEventListener(a.cgti, function w(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.removeClass(g, "off"), a.removeClass(a.doc.querySelector("#tutorialContainer"), "show"), a.removeClass(a.doc.querySelector("#baseContainer"), "type05"), c.tutorialEnd("TU997"), p.removeEventListener(a.cgti, w, !1))
      }, !1);
      d && c.TU560("save");
      b.removeEventListener("webkitAnimationEnd", h, !1)
    }, !1)
  }

  function B(b)
  {
    var c = !1;
    k.each(a.storage.userQuestAdventureList.toJSON(), function(a, e)
    {
      b == a.adventureId && (c = !0)
    });
    return c
  }

  function C(b)
  {
    b.preventDefault();
    a.isScrolled() || (a.tapBlock(!0), t = {
      name: a.doc.getElementById("changeName").value
    }, "" === a.doc.getElementById("changeName").value ? (new a.PopupClass(
    {
      title: "プレイヤー名入力",
      content: "プレイヤー名を入力してください。",
      closeBtnText: "閉じる",
      popupType: "typeC"
    }), a.tapBlock(!1)) : (a.tapBlock(!1), D()))
  }

  function E(b)
  {
    var e = !1;
    if ("TU998" == b && (e = B(u[b])))
    {
      a.tapBlock(!1);
      e = k.template($("#nameChangePop").text());
      new a.PopupClass(
      {
        title: "プレイヤー名入力",
        popupId: "nameSettingPopup",
        content: e(),
        decideBtnText: "OK",
        canClose: !1
      });
      a.doc.getElementById("textCount").innerText = 0;
      a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, C);
      a.nativeKeyBoard("changeName", 8, 0, "textCount");
      return
    }
    $(a.ready.target).on("webkitAnimationEnd", function()
    {
      d.endTop();
      d.changeBg("web_black.jpg");
      $(a.ready.target).off();
      $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      $("#commandDiv").on("nativeCallback", function(e, g)
      {
        $("#commandDiv").off();
        "TU998" == b ? g && g.userName && (d.changeBg("web_common.ExportJson"), d.endTop(), e = {
          name: g.userName
        }, $("#popupArea").on(a.cgti, "#resultCodeError .popupCloseBtn", function(b)
        {
          b.preventDefault();
          a.isScrolled() || ($("#popupArea").off(), d.nativeReload("#/TopPage"))
        }), n.ajaxPost(a.linkList.userChangeNamePrologue, e, function(e)
        {
          $("#popupArea").off();
          a.responseSetStorage(e);
          c.tutorialEnd("TU999");
          location.href = r[b]
        }), setTimeout(function()
        {
          d.setWebView(!0)
        }, 3E3)) : (location.href = r[b], setTimeout(function()
        {
          d.setWebView(!0)
        }, 200))
      });
      setTimeout(function()
      {
        d.setWebView(!1);
        d.startStory(u[b])
      }, 500)
    });
    a.addClass(a.ready.target, "preNativeFadeIn")
  }

  function m(b)
  {
    $(a.ready.target).on("webkitAnimationEnd", function()
    {
      d.changeBg("web_black.jpg");
      d.endL2d();
      $(a.ready.target).off();
      $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      var e = {};
      e.questBattleId = a.questBattleModel.questBattle.questBattleId;
      e.deckType = 11;
      var h = a.storage.userDeckList.findWhere(
      {
        deckType: 11
      }).toJSON();
      k.each(h, function(a, b)
      {
        -1 != b.indexOf("questPositionId") && (e[b] = a); - 1 != b.indexOf("userCardId") && (e[b] = a)
      });
      b.npcHelpId && (e.npcHelpId = b.npcHelpId);
      var g = a.questBattleModel.questBattle.startStory;
      window.isBrowser ? (a.stubQuest = e, a.stubQuest.resultUtl = b.resultUrl, d.sendCommand("QuestStub")) : n.ajaxPost(a.linkList.questStart, e, function(e)
      {
        $("#commandDiv").on("nativeCallback", function()
        {
          $("#commandDiv").off();
          $("#commandDiv").on("nativeCallback", function(b, c)
          {
            $("#commandDiv").off();
            c && (b = c.webData, c = b.userQuestBattleResultList[0].questBattle, a.responseSetStorage(b), b = (b = a.storage.userSectionList.findWhere(
            {
              sectionId: c.sectionId
            })) ? b.toJSON() : null) && (c = (c = a.storage.userChapterList.findWhere(
            {
              chapterId: b.section.genericId
            })) ? c.toJSON() : null, a.playChapter = c, a.playSection = b);
            location.href = "#/QuestBackground"
          });
          var d = {};
          d.resultUrl = b.resultUrl;
          d.retireUrl = "/magica/index.html";
          F(e, d);
          c.tutorialIdRegist(b.questStartTutorialId)
        });
        c.tutorialIdRegist(b.startStoryTutorialId);
        setTimeout(function()
        {
          d.setWebView(!1);
          d.startStory(g)
        }, 500)
      })
    });
    a.addClass(a.ready.target, "preNativeFadeIn")
  }

  function F(b, c)
  {
    a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
    d.setWebView(!1);
    d.startQuest(b.userQuestBattleResultList[0].id, c)
  }
  var c = {},
    u = {
      TU160: "101101-4",
      TU250: "101101-7",
      TU460: "101102-4",
      TU998: "101103-10"
    },
    G = {
      TU010: "<p>タッチしてストーリーを<br>開始しましょう</p>",
      TU120: "<p>クエストをサポートしてくれる魔法少女を選択しましょう<br>サポートしてもらうことでサポートポイントを獲得できます</p>",
      TU510: "<p>メインメニューが使用可能になりました。<br>MENUをタッチしてください</p>",
      TU510_2: "<p>メインメニューからは様々な画面に移動することができます<br>「ガチャ」に移動してみましょう</p>",
      TU520: "<p>ガチャでは魔法少女やメモリアを手に入れることができます<br>特別に選んだ魔法少女1体を必ずもらえるガチャを用意しました<br>好きな魔法少女を選んでみましょう</p>",
      TU520_2: "<p>魔法少女を選んだらガチャを引いて仲間にしてみましょう<br>★4魔法少女は選んだ1体のみ出現します<br>ガチャを引くまでは魔法少女を選びなおすことが可能です</p>",
      TU540: "<p>仲間にした魔法少女を<br>チームに入れてみましょう</p>",
      TU550: "<p>クエスト用のチームを編成しましょう</p>",
      TU560: "<p>未設定をタッチしてください</p>",
      TU560_2: "<p>先ほど仲間にした魔法少女をタッチしてください</p>",
      TU560_3: "<p>魔法少女をチームに参加させることができました<br>「決定」をタッチしてください</p>",
      TU560_3_1: "<p>他の魔法少女も編成してみましょう<br>お任せ編成ボタンをタッチすることで、<br>自動でチームを編成できます</p>",
      TU560_4: "<p>編成したチームで<br>次のクエストに進みましょう</p>"
    },
    H = {
      TU010: "TU010",
      TU020: "TU010",
      TU030: "TU010",
      TU040: "TU110",
      TU110: "TU110",
      TU120: "TU110",
      TU130: "TU110",
      TU140: "TU110",
      TU150: "TU160",
      TU160: "TU160",
      TU210: "TU210",
      TU220: "TU210",
      TU230: "TU210",
      TU240: "TU250",
      TU250: "TU250",
      TU310: "TU310",
      TU320: "TU320",
      TU330: "TU320",
      TU340: "TU320",
      TU350: "TU320",
      TU360: "TU410",
      TU410: "TU410",
      TU420: "TU410",
      TU430: "TU410",
      TU440: "TU410",
      TU450: "TU460",
      TU460: "TU460",
      TU510: "TU510",
      TU520: "TU520",
      TU530: "TU550",
      TU540: "TU550",
      TU550: "TU550",
      TU560: "TU560",
      TU998: "TU998"
    },
    r = {
      prologue: "#/QuestBattleSelect/101101/TU010",
      TU010: "#/QuestBattleSelect/101101/TU010",
      TU110: "#/QuestBattleSelect/101101/TU110",
      TU160: "#/QuestBattleSelect/101101/TU210",
      TU210: "#/QuestBattleSelect/101101/TU210",
      TU250: "#/MainQuest/TU310",
      TU310: "#/MainQuest/TU310",
      TU320: "#/QuestBattleSelect/101102/TU320",
      TU370: "#/QuestBattleSelect/101102/TU370",
      TU410: "#/QuestBattleSelect/101102/TU410",
      TU460: "#/QuestBattleSelect/101102/TU510",
      TU510: "#/QuestBattleSelect/101102/TU510",
      TU520: "#/GachaTop/SELECTABLE_TUTORIAL/TU520",
      TU550: "#/FormationTop/TU550",
      TU560: "#/DeckFormation/TU560",
      TU998: "#/MainQuest"
    };
  c.tutorialAddClass = function(b)
  {
    a.addClass(a.doc.querySelector("#baseContainer"), "tutorial");
    this.tutorialRemoveClass();
    b && a.addClass(a.doc.querySelector("#baseContainer"), b)
  };
  c.tutorialRemoveClass = function()
  {
    var b = [];
    k.each(a.doc.querySelector("#baseContainer").classList, function(a)
    {
      b.push(a)
    });
    k.each(b, function(b)
    {
      b && (-1 === b.indexOf("TU") && -1 === b.indexOf("type") || a.removeClass(a.doc.querySelector("#baseContainer"), b))
    })
  };
  c.tutorialEnd = function(b, c)
  {
    c || (c = "#/MainQuest");
    this.tutorialIdRegist(b);
    a.tutorialId = null;
    a.tutorialUtil = null;
    a.removeClass(a.doc.querySelector("#baseContainer"), "tutorial");
    this.tutorialRemoveClass();
    a.historyArr = [];
    setTimeout(function()
    {
      location.href = c
    }, 100)
  };
  c.getResumeId = function()
  {
    return H[a.storage.user.get("tutorialId")]
  };
  c.tutorialResume = function()
  {
    var a = this.getResumeId();
    switch (a)
    {
      case "TU160":
      case "TU250":
      case "TU460":
      case "TU998":
        E(a);
        break;
      default:
        this.tutorialAddClass(), location.href = r[this.getResumeId()]
    }
  };
  c.tutorialText = function(b)
  {
    b = G[b] || "";
    a.doc.querySelector("#tutorialContainer .textWrap").innerHTML = b
  };
  c.tutorialIdRegist = function(b)
  {
    if (b && "prologue" != b && "string" === typeof b)
    {
      var c = b.split("TU")[1] | 0,
        d = a.storage.user.get("tutorialId").split("TU")[1] | 0;
      c !== d && c > d && n.ajaxPost(a.linkList.prologueRegister,
      {
        tutorialId: b
      }, function(b)
      {
        a.responseSetStorage(b)
      });
      "TU997" != b && "TU998" != b && "TU999" != b && this.tutorialInit(b)
    }
  };
  c.tutorialInit = function(b)
  {
    a.removeClass(a.doc.querySelector("#tutorialContainer"), "show");
    this.tutorialText(b);
    switch (b)
    {
      case "TU510":
        v();
        break;
      case "TU520":
        x();
        break;
      case "TU540":
        y();
        break;
      case "TU550":
        z();
        break;
      case "TU560":
        A();
        break;
      default:
        mainContent.addEventListener("webkitAnimationEnd", function h(b)
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          mainContent.removeEventListener("webkitAnimationEnd", h, !1)
        }, !1)
    }
  };
  c.TU010 = function()
  {
    m(
    {
      npcHelpId: null,
      resultUrl: "/magica/index.html#/QuestResult/TU040",
      startStoryTutorialId: "TU020",
      questStartTutorialId: "TU030"
    })
  };
  c.TU040 = function()
  {
    location.href = "#/QuestBattleSelect/101101/TU110"
  };
  c.TU110 = function()
  {
    location.href = "#/SupportSelect/TU120"
  };
  c.TU120 = function()
  {
    m(
    {
      npcHelpId: a.questBattleModel.questBattle.npcHelpId,
      resultUrl: "/magica/index.html#/QuestResult/TU150",
      startStoryTutorialId: "TU130",
      questStartTutorialId: "TU140"
    })
  };
  c.TU150 = function()
  {
    location.href = "#/QuestBattleSelect/101101/TU210"
  };
  c.TU210 = function()
  {
    m(
    {
      npcHelpId: null,
      resultUrl: "/magica/index.html#/QuestResult/TU240",
      startStoryTutorialId: "TU220",
      questStartTutorialId: "TU230"
    })
  };
  c.TU240 = function()
  {
    location.href = "#/MainQuest/TU310"
  };
  c.TU310 = function()
  {
    location.href = "#/QuestBattleSelect/101102/TU320"
  };
  c.TU320 = function()
  {
    location.href = "#/SupportSelect/TU330"
  };
  c.TU330 = function()
  {
    m(
    {
      npcHelpId: a.questBattleModel.questBattle.npcHelpId,
      resultUrl: "/magica/index.html#/QuestResult/TU360",
      startStoryTutorialId: "TU340",
      questStartTutorialId: "TU350"
    })
  };
  c.TU360 = function()
  {
    location.href = "#/QuestBattleSelect/101102/TU410"
  };
  c.TU410 = function()
  {
    location.href = "#/SupportSelect/TU420"
  };
  c.TU420 = function()
  {
    m(
    {
      npcHelpId: a.questBattleModel.questBattle.npcHelpId,
      resultUrl: "/magica/index.html#/QuestResult/TU450",
      startStoryTutorialId: "TU430",
      questStartTutorialId: "TU440"
    })
  };
  c.TU450 = function()
  {
    location.href = "#/QuestBattleSelect/101102/TU510"
  };
  c.TU520 = function()
  {
    location.href = "#/GachaAnimation/TU530"
  };
  c.TU530 = function()
  {
    location.href = "#/GachaResult/TU540"
  };
  c.TU550 = function()
  {
    location.href = "#/DeckFormation/TU560"
  };
  c.TU560 = function(b)
  {
    switch (b)
    {
      case "set":
        (b = a.doc.querySelector("#charaList .userCharaIcon.RANK_4")) || (b = a.doc.querySelector("#charaList .userCharaIcon.RANK_3"));
        b || (b = a.doc.querySelector("#charaList .userCharaIcon.RANK_2"));
        a.addClass(b, "on");
        a.removeClass(a.doc.querySelector("#tutorialContainer"), "show");
        a.removeClass(a.doc.querySelector("#baseContainer"), "type01");
        c.tutorialText("TU560_2");
        setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type02")
        }, 10);
        break;
      case "charaSelect":
        b = a.doc.querySelectorAll("#charaListWrap #charaList .userCharaIcon")[0];
        var d = a.doc.querySelector("#mainBtn");
        a.removeClass(b, "on");
        a.addClass(b, "tapOff");
        a.addClass(d, "on");
        c.tutorialText("TU560_3");
        a.removeClass(a.doc.querySelector("#tutorialContainer"), "show");
        a.removeClass(a.doc.querySelector("#baseContainer"), "type02");
        setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type03")
        }, 10);
        break;
      case "save":
        b = a.doc.querySelector("#mainBtn");
        d = a.doc.querySelector("#autoFormationPopBtn");
        a.removeClass(b, "on");
        a.addClass(d, "on");
        c.tutorialText("TU560_3_1");
        a.removeClass(a.doc.querySelector("#tutorialContainer"), "show");
        a.removeClass(a.doc.querySelector("#baseContainer"), "type03");
        setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type03_1")
        }, 10);
        break;
      case "autoPop":
        b = a.doc.querySelector("#autoFormationPopBtn");
        d = a.doc.querySelector("#mainBtn");
        a.removeClass(b, "on");
        a.addClass(b, "tapOff");
        a.addClass(d, "on");
        c.tutorialText("TU560_3");
        a.removeClass(a.doc.querySelector("#tutorialContainer"), "show");
        a.removeClass(a.doc.querySelector("#baseContainer"), "type03_1");
        setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type03_2")
        }, 10);
        break;
      case "save2":
        b = a.doc.querySelector("#mainBtn"), d = a.doc.querySelector("#globalMenuContainer"), a.removeClass(b, "on"), a.addClass(b, "tapOff"), a.addClass(d, "on"), a.removeClass(a.doc.querySelector("#tutorialContainer"), "show"), a.removeClass(a.doc.querySelector("#baseContainer"), "type03_2"), setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#tutorialContainer"), "show");
          a.addClass(a.doc.querySelector("#baseContainer"), "type04")
        }, 10)
    }
  };
  var t = "",
    D = function()
    {
      $("#popupArea").on(a.cgti, "#resultCodeError .popupCloseBtn", function(b)
      {
        b.preventDefault();
        a.isScrolled() || ($("#popupArea").off(), d.nativeReload("#/TopPage"))
      });
      n.ajaxPost(a.linkList.userChangeNamePrologue, t, function(b)
      {
        "error" !== b.resultCode && ($("#popupArea").off(), $(a.ready.target).on("webkitAnimationEnd", function()
        {
          $(a.ready.target).off();
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          })
        }), a.g_popup_instance.remove(), a.addClass(a.ready.target, "gameStartFadeIn"), c.tutorialEnd("TU999", "#/MyPage"))
      })
    };
  return c
});
