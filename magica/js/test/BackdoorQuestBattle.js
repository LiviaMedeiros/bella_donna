define("underscore backbone backboneCommon ajaxControl command text!../../template/test/BackdoorQuestBattle.html text!css/test/BackdoorQuestBattle.css cardUtil DeckUtil".split(" "), function(f, m, b, k, g, n, p, q, r)
{
  var l, e = [],
    t = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #questStart"] = this.questStart;
        a[b.cgti + " #pasteBtn"] = this.pasteBtn;
        a[b.cgti + " #historyBtn"] = this.historyPop;
        a[b.cgti + " #deckSelectBtn"] = this.deckSelectPop;
        a[b.cgti + " #deckLinkBtn"] = this.deckLinkBtn;
        a[b.cgti + " .inputTextBtn"] = this.inputText;
        a[b.cgti + " #inputClearBtn"] = this.inputClear;
        a[b.cgti + " #inputDelete1Btn"] = this.inputDelete1;
        return a
      },
      initialize: function(a)
      {
        q.createCardList();
        var d = new r("quest"),
          c = [];
        b.storage.userDeckList.each(function(a)
        {
          a = a.toJSON();
          (20 > a.deckType || 21 === a.deckType) && c.push(d.deckDataCreate(a))
        });
        this.deckList = c;
        this.template = f.template(n);
        this.createDom();
        (a = localStorage.getItem("QuestTestDeckType")) ? (a = Number(a), f.findWhere(this.deckList,
        {
          deckType: a
        }) ? this.deckType = a : this.deckType = 11) : this.deckType = this.deckList[0].deckType;
        if (a = localStorage.getItem("QuestTestHistory")) e = JSON.parse(a), e.length && (b.doc.getElementById("questId").value = e[0].sid);
        this.renderDeckInfo()
      },
      render: function()
      {
        this.$el.html(this.template(k.getPageJson()));
        return this
      },
      renderDeckInfo: function()
      {
        var a = b.doc.getElementById("deckInner"),
          d = f.template($("#DeckInfoParts").text()),
          c = f.findWhere(this.deckList,
          {
            deckType: this.deckType
          });
        a.innerHTML = d(
        {
          model: c
        });
        g.getBaseData(b.getNativeObj())
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        b.nativeKeyBoard("questId", 15, 1);
        b.ready.hide()
      },
      inputClear: function(a)
      {
        a.preventDefault();
        !b.isScrolled() && (a = b.doc.getElementById("questId")) && (a.value = "")
      },
      inputDelete1: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.getElementById("questId"), a.value && (a.value = a.value.slice(0, -1)))
      },
      inputText: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var d = b.doc.getElementById("questId"),
            c = d.value,
            c = c + a.currentTarget.dataset.text;
          d.value = c
        }
      },
      pasteBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || ($("#commandDiv").on("nativeCallback", function(a, c)
        {
          $("#commandDiv").off();
          a = c.replace(/(\s|"|')/g, "");
          b.doc.getElementById("questId").value = a
        }), g.pasteClipboard(), window.isBrowser && nativeCallback('"1011011"'))
      },
      historyPop: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var d = b.doc.getElementById("questId");
          a = f.template($("#HistoryParts").text())(
          {
            historyArr: e
          });
          var c, h = function(a)
          {
            a.preventDefault();
            b.isScrolled() || (d.value = a.currentTarget.parentNode.getElementsByClassName("sid")[0].innerText, b.g_popup_instance && b.g_popup_instance.remove())
          };
          new b.PopupClass(
          {
            title: "確認履歴",
            content: a,
            exClass: "historyPop"
          }, null, function()
          {
            c = b.doc.getElementById("historyList").getElementsByClassName("inputBtn");
            b.doc.getElementById("historyDeleteBtn");
            $(c).on(b.cgti, h);
            b.scrollSet("historyScrollWrap", "scrollInner")
          }, function()
          {
            $(c).off(b.cgti)
          })
        }
      },
      deckLinkBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          switch (this.deckType)
          {
            case 21:
              a = "#/DeckFormation/arena";
              break;
            default:
              a = "#/DeckFormation/quest"
          }
          b.currentDeckType = this.deckType;
          location.href = a
        }
      },
      deckSelectPop: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var d = function(a)
          {
            a.preventDefault();
            b.isScrolled() || ($(".deck").removeClass("selected"), $(a.currentTarget).addClass("selected"), this.deckType = Number(a.currentTarget.dataset.type), this.renderDeckInfo(), localStorage.setItem("QuestTestDeckType", String(this.deckType)), b.g_popup_instance && b.g_popup_instance.popupView.close())
          };
          a = function()
          {
            g.getBaseData(b.getNativeObj());
            b.scrollSet("deckScrollWrap", "scrollInner");
            $(".deck").on(b.cgti, d.bind(this))
          }.bind(this);
          var c = f.template($("#DeckPopParts").text())(
          {
            deckList: this.deckList,
            currentDeckType: this.deckType
          });
          new b.PopupClass(
          {
            title: "デッキ選択",
            content: c,
            popupType: "typeB",
            exClass: "deckSelectPop"
          }, null, a, function()
          {
            $(".deck").off(b.cgti)
          })
        }
      },
      saveLocalStorage: function()
      {
        50 < e.length && (e.length = 50);
        localStorage.setItem("QuestTestHistory", JSON.stringify(e));
        localStorage.setItem("QuestTestDeckType", String(this.deckType))
      },
      questStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
          if (a = b.doc.getElementById("questId").value, !a || isNaN(a)) new b.PopupClass(
          {
            title: "エラー",
            content: "クエストIDが不正です。",
            closeBtnText: "OK"
          });
          else
          {
            var d = {
                sid: a,
                read: null
              },
              c = {},
              h = f.findWhere(this.deckList,
              {
                deckType: this.deckType
              });
            c.questBattleId = a;
            c.deckType = h.deckType;
            f.each(h, function(a, b)
            {
              if (-1 !== b.indexOf("questPositionId") || -1 !== b.indexOf("userCardId") || -1 !== b.indexOf("userPieceId")) c[b] = a
            });
            k.ajaxPost(b.linkList.backdoorStartQuest, c, function(a)
            {
              "error" !== a.resultCode && (g.setWebView(!1), $("#commandDiv").on("nativeCallback", function(a, b)
              {
                $("#commandDiv").off();
                e.shift();
                d.read = "read";
                e.unshift(d);
                this.saveLocalStorage();
                window.isBrowser || (location.href = "#/QuestBackground")
              }.bind(this)), e.unshift(d), g.startQuest(a.userQuestBattleResultList[0].id,
              {
                resultUrl: "/magica/index.html#/BackdoorQuestBattle",
                retireUrl: "/magica/index.html#/BackdoorQuestBattle"
              }, !1), window.isBrowser && $("#commandDiv").trigger("nativeCallback"))
            }.bind(this));
            this.saveLocalStorage()
          }
      }
    });
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
      id: "userDeckList"
    },
    {
      id: "userFormationSheetList"
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
      id: "userCardList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    }],
    fetch: function(a, b)
    {
      g.endQuest();
      g.setWebView(!0);
      k.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(p);
      l = new t
    },
    remove: function(a)
    {
      e = null;
      l && l.remove();
      a()
    }
  }
});
