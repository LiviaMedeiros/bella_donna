define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaHistory.html js/view/arena/ArenaInfoPartsView".split(" "), function(e, k, a, f, d, l, n)
{
  var h = function(b, c)
  {
    $("#commandDiv").on("nativeCallback", function(g, m)
    {
      $("#commandDiv").off();
      f.ajaxPost(a.linkList.questGetReplayData,
      {
        replayId: b
      }, function(b)
      {
        if (a.compareVersion(b.replayData.replayVersion, m))
        {
          a.tapBlock(!0);
          a.androidKeyForceStop = !0;
          a.g_popup_instance && a.g_popup_instance.remove();
          var g = {
            replayData: b.replayData.replayData,
            replayVersion: b.replayData.replayVersion,
            retireUrl: "/magica/index.html#/ArenaHistory/replay"
          };
          a.preNativeFadeIn(function()
          {
            a.ready.show();
            d.setWebView(!1);
            d.stopBgm();
            $("#commandDiv").on("nativeCallback", function(b)
            {
              $("#commandDiv").off();
              a.ready.target.className = "";
              d.changeBg(a.background);
              d.startBgm(a.bgm);
              a.androidKeyStop = !1;
              d.setWebView();
              a.ready.hide();
              c && (c(), c = null)
            });
            d.startQuestRelpay(g);
            window.isBrowser && nativeCallback()
          }, 500)
        }
        else new a.PopupClass(
        {
          title: "リプレイ再生",
          content: "リプレイのバージョンが古いため、再生できません。",
          closeBtnText: "OK",
          popupType: "typeC"
        })
      })
    });
    d.getReplayVersion();
    window.isBrowser && nativeCallback("3.1.1.0")
  };
  return k.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .playReplayBtn"] = this.playReplayBtn;
      b[a.cgti + " .copyReplayBtn"] = this.copyReplayBtn;
      b[a.cgti + " #replayIdPlayBtn"] = this.playReplayIdBtn;
      b[a.cgti + " .historyChange"] = this.changeList;
      return b
    },
    initialize: function(a)
    {
      this.displayMode = null !== a && "object" != typeof a ? a : "attack";
      this.template = e.template(l);
      this.replayList = null;
      "replay" === this.displayMode ? this.getReplayList(this.createDom.bind(this)) : this.createDom()
    },
    render: function()
    {
      this.model = f.getPageJson();
      var b = a.storage.gameUser.toJSON().userId,
        c;
      switch (this.displayMode)
      {
        case "attack":
          c = e.filter(this.model.userArenaBattleResultList, function(a)
          {
            return a.userId == b
          });
          break;
        case "defence":
          c = e.filter(this.model.userArenaBattleResultList, function(a)
          {
            return a.opponentUserId == b
          });
          break;
        case "replay":
          c = this.replayList
      }
      c = e.sortBy(c, function(a)
      {
        return -Date.parse(a.createdAt)
      });
      this.$el.html(this.template(
      {
        model: this.model,
        history: c,
        mode: this.displayMode
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      a.setGlobalView();
      d.getBaseData(a.getNativeObj());
      a.scrollSet("historyScroll", "listScrollInner");
      a.ready.hide()
    },
    getReplayList: function(b)
    {
      if (!this.replayList)
      {
        var c = function(a)
        {
          this.replayList = a.savedResultList;
          b();
          b = null
        }.bind(this);
        f.ajaxPost(a.linkList.arenaGetSaveReplayList, null, c)
      }
    },
    changeList: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !b.currentTarget.classList.contains("current"))
      {
        var c = function()
        {
          a.scrollDestroy("historyScroll", "listScrollInner");
          a.content.innerHTML = "";
          a.content.append(this.render().el);
          d.getBaseData(a.getNativeObj());
          a.scrollSet("historyScroll", "listScrollInner")
        }.bind(this);
        b.currentTarget.classList.contains("attack") ? (this.displayMode = "attack", c()) : b.currentTarget.classList.contains("defence") ? (this.displayMode = "defence", c()) : (this.displayMode = "replay", this.replayList ? c() : this.getReplayList(c))
      }
    },
    playReplayBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || h(b.currentTarget.dataset.replayId)
    },
    copyReplayBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = b.currentTarget.dataset.replayId, d.copyClipboard(b), new a.PopupClass(
      {
        exClass: "copyReplayId",
        title: "リプレイID",
        content: "リプレイIDをコピーしました。<br><br><dl class='colWrap common_dl'><dt class='colLeft'>リプレイID</dt><dd class='colRight'><span class='black'>" + b + "</span></dd></dl>",
        closeBtnText: "OK",
        popupType: "typeC"
      }))
    },
    playReplayIdBtn: function(b)
    {
      if (b && (b.preventDefault(), a.isScrolled())) return;
      var c = this,
        d = function()
        {
          a.doc.getElementById("replayInput").value = ""
        };
      new a.PopupClass(
      {
        title: "リプレイ再生",
        content: e.template($("#replayPopParts").text())(),
        exClass: "replayPopup",
        decideBtnText: "再生する",
        decideBtnEvent: function()
        {
          var b = a.doc.getElementById("replayInput").value,
            d = !0;
          b && 10 === b.length && b.match(/^[a-zA-Z0-9]{10}/) || (d = !1);
          d ? h(b) : new a.PopupClass(
          {
            title: "エラー",
            content: "リプレイIDを正しく入力してください",
            closeBtnText: "OK",
            popupType: "typeC"
          }, null, null, function()
          {
            c.playReplayIdBtn()
          })
        },
        closeBtnText: "キャンセル",
        popupType: "typeA"
      }, null, function()
      {
        $("#commandDiv").off();
        var b = function()
        {
          a.nativeKeyBoard("replayInput", 10, 1, null, b)
        };
        b();
        a.doc.getElementById("replayInputClearBtn").addEventListener(a.cgti, d, !1)
      }, function()
      {
        a.doc.removeEventListener(a.cgti, d, !1)
      })
    },
    removeHandler: function()
    {
      this.trigger("removeView");
      this.remove()
    }
  })
});
