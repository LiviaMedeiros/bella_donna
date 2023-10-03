define("underscore backbone backboneCommon ajaxControl command text!../../template/test/SelectStoryTest.html text!css/test/SelectStoryTest.css".split(" "), function(l, n, b, m, g, p, q)
{
  var k, f = [],
    r = n.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #storyStart"] = this.storyStart;
        a[b.cgti + " #saveStoryStart"] = this.storyStart;
        a[b.cgti + " #questStoryStart"] = this.storyStart;
        a[b.cgti + " #storedStoryStart"] = this.storedStoryStart;
        a[b.cgti + " #storedStoryCheck"] = this.storedStoryCheck;
        a[b.cgti + " #pasteBtn"] = this.pasteBtn;
        a[b.cgti + " #historyBtn"] = this.historyPop;
        a[b.cgti + " .changeIdBtn"] = this.changeStoryId;
        a[b.cgti + " .changeIndexBtn"] = this.changeStoryIndex;
        a[b.cgti + " .inputTextBtn"] = this.inputText;
        a[b.cgti + " #inputClearBtn"] = this.inputClear;
        a[b.cgti + " #inputDelete1Btn"] = this.inputDelete1;
        return a
      },
      initialize: function(a)
      {
        a = localStorage.getItem("StoryTestHistory");
        this.template = l.template(p);
        this.createDom();
        a && (f = JSON.parse(a), b.doc.getElementById("storyId").value = f[0].sid)
      },
      render: function()
      {
        this.$el.html(this.template(m.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        b.nativeKeyBoard("storyId", 15, 1);
        b.ready.hide()
      },
      changeStoryId: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e = b.doc.getElementById("storyId"),
            c = e.value.split("-");
          if (c[0])
          {
            var d = c[1] ? c[1].split("_") : null,
              f = parseInt(c[0]),
              c = d ? d[0] : null,
              d = d ? d[1] : null,
              h = f;
            switch (a.currentTarget.dataset.type)
            {
              case "jump":
                h = a.currentTarget.dataset.num;
                break;
              case "add":
                h = f + parseInt(a.currentTarget.dataset.num)
            }
            a = h;
            c && (a += "-" + c);
            d && (a += "_" + d);
            e.value = a
          }
        }
      },
      changeStoryIndex: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e = b.doc.getElementById("storyId"),
            c = e.value.split("-"),
            d = c[1] ? c[1].split("_") : null;
          if (d && d[0])
          {
            var c = c[0],
              f = parseInt(d[0]),
              d = d ? d[1] : null,
              h = 1;
            switch (a.currentTarget.dataset.type)
            {
              case "jump":
                h = a.currentTarget.dataset.num;
                break;
              case "add":
                h = f + parseInt(a.currentTarget.dataset.num)
            }
            1 > h && (h = 1);
            a = c;
            h && (a += "-" + h);
            d && (a += "_" + d);
            e.value = a
          }
        }
      },
      inputClear: function(a)
      {
        a.preventDefault();
        !b.isScrolled() && (a = b.doc.getElementById("storyId")) && (a.value = "")
      },
      inputDelete1: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.getElementById("storyId"), a.value && (a.value = a.value.slice(0, -1)))
      },
      inputText: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e = b.doc.getElementById("storyId"),
            c = e.value,
            c = c + a.currentTarget.dataset.text;
          e.value = c
        }
      },
      pasteBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || ($("#commandDiv").on("nativeCallback", function(a, c)
        {
          $("#commandDiv").off();
          a = c.replace(/(\s|"|')/g, "");
          b.doc.getElementById("storyId").value = a
        }), g.pasteClipboard(), window.isBrowser && nativeCallback('"515601-1_　UNnvl"'))
      },
      historyPop: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e = b.doc.getElementById("storyId");
          a = l.template($("#HistoryParts").text())(
          {
            historyArr: f
          });
          var c, d, g = function(a)
            {
              a.preventDefault();
              b.isScrolled() || (e.value = a.currentTarget.parentNode.getElementsByClassName("sid")[0].innerText, b.g_popup_instance && b.g_popup_instance.remove())
            },
            h = function(a)
            {
              a.preventDefault();
              b.isScrolled() || (localStorage.removeItem("StoryTestHistory"), f = [], b.g_popup_instance && b.g_popup_instance.remove())
            };
          new b.PopupClass(
          {
            title: "ストーリー確認履歴",
            content: a,
            exClass: "historyPop"
          }, null, function()
          {
            c = b.doc.getElementById("historyList").getElementsByClassName("inputBtn");
            d = b.doc.getElementById("historyDeleteBtn");
            $(c).on(b.cgti, g);
            $(d).on(b.cgti, h);
            b.scrollSet("historyScrollWrap", "scrollInner")
          }, function()
          {
            $(c).off(b.cgti);
            $(d).off(b.cgti)
          })
        }
      },
      saveLocalStorage: function()
      {
        50 < f.length && (f.length = 50);
        localStorage.setItem("StoryTestHistory", JSON.stringify(f))
      },
      storedStoryCheck: function(a)
      {
        a.preventDefault();
        b.isScrolled() || ($("#commandDiv").on("saveDataCallback", function(a, c)
        {
          $("#commandDiv").off();
          c && c.storyId ? new b.PopupClass(
          {
            title: "ストーリー中断データ",
            content: "中断ストーリー：" + c.storyId
          }) : new b.PopupClass(
          {
            title: "ストーリー中断データ",
            content: "中断ストーリーはありません"
          })
        }), g.getStorySaveData(), window.isLocal && saveDataCallback(
        {
          storyId: "storyIdTest"
        }))
      },
      storedStoryStart: function(a)
      {
        a.preventDefault();
        b.isScrolled() || ($("#commandDiv").on("nativeCallback", function(a, c)
        {
          g.setWebView();
          b.ready.hide();
          $("#commandDiv").off();
          g.setWebView()
        }.bind(this)), g.setWebView(!1), g.startStoredStory(), window.isBrowser && nativeCallback())
      },
      storyStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e = b.doc.getElementById("storyId").value,
            c = {
              sid: e,
              read: null
            };
          $("#commandDiv").on("nativeCallback", function(a, e)
          {
            f.shift();
            c.read = "read";
            f.unshift(c);
            g.setWebView();
            b.ready.hide();
            $("#commandDiv").off();
            this.saveLocalStorage();
            e && e.isSaved && new b.PopupClass(
            {
              title: "ストーリー途中保存",
              content: "ストーリーを中断しました。<br>"
            })
          }.bind(this));
          f.unshift(c);
          g.setWebView(!1);
          "quest" == a.currentTarget.dataset.target ? g.startQuestStory(e) : "story" == a.currentTarget.dataset.target && g.startStory(e,
          {
            canSave: !0
          });
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    }],
    fetch: function(a, b)
    {
      m.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(q);
      k = new r
    },
    remove: function(a)
    {
      f = null;
      k && k.remove();
      a()
    }
  }
});
