define(["jquery", "backbone", "backboneCommon", "command"], function(f, r, c, d)
{
  function F(a, b)
  {
    var e = a.id;
    a = (new(r.Model.extend(
    {
      url: b,
      parse: function(b)
      {
        return b[e]
      }
    }))).fetch(
    {
      success: function(b, a)
      {
        c.setStorage(b, e);
        p[e] = a[e];
        v(a)
      }
    });
    g.push(a)
  }

  function G(a, b)
  {
    var e = a.id;
    a = (new(r.Collection.extend(
    {
      url: b,
      parse: function(b)
      {
        return b[e]
      }
    }))).fetch(
    {
      success: function(b, a)
      {
        c.setStorage(b, e);
        p[e] = a[e];
        v(a)
      }
    });
    g.push(a)
  }

  function D(a, b)
  {
    a = f.ajax(
    {
      url: b,
      type: "GET",
      dataType: "json"
    }).done(function(b)
    {
      console.log("fetch", b);
      for (var a in b) u.push(a), p[a] = b[a];
      v(b)
    });
    g.push(a)
  }

  function v(a)
  {
    "undefined" !== typeof a.resultCode && "error" == a.resultCode && x();
    f.extend(t, a);
    y += 1;
    y == z + 1 && f(n).trigger("complete", t)
  }

  function x()
  {
    for (var a = g.length, b = 0; b < a; b++) 4 != g[b].readyState && g[b].abort()
  }

  function q()
  {
    d.startBgm("bgm00_system01");
    d.changeBg("web_common.ExportJson");
    d.stopMemoriaTop();
    d.endQuest();
    d.endArena();
    d.endL2d();
    d.hideMiniChara();
    d.hideMultiMiniChara();
    d.popEventBranch();
    d.hideSubQuestBg();
    d.popEventSingleRaid();
    d.callTouchesClear();
    d.weekQuestTopUnset();
    d.stopComposeEffect();
    d.turnOffCamera();
    d.stopNormalGachaMemoria();
    d.formationPreviewRemove();
    d.enemyFormationPreviewRemove();
    d.endGachaAnimation();
    d.endPlayMovie();
    d.hideEventDungeon();
    d.hideEventRaid();
    d.setWebView()
  }

  function A(a, b)
  {
    "error" !== a.resultCode && b && b(a);
    c.loading.hide()
  }

  function E(a, b)
  {
    var e = 0;
    _.each(a, function(a, m, g)
    {
      var l = c.storageType[m] || null;
      u.push(m);
      p[m] = g[m];
      switch (l)
      {
        case "model":
          var l = {},
            B = r.Model.extend(
            {
              url: c.linkList[m]
            });
          c.hasModel(m) ? (l[m] = a, c.responseSetStorage(l)) : (l = new B(a), c.setStorage(l, m));
          break;
        case "collection":
          l = {}, B = r.Collection.extend(
          {
            url: c.linkList[m]
          }), c.hasModel(m) ? (l[m] = a, c.responseSetStorage(l)) : (a = new B(a), c.setStorage(a, m))
      }
      if (Object.keys(g).length - 1 == e)
      {
        if (n.interruptCheck(g, b)) return;
        a:
        {
          if ("undefined" !== typeof g.resultCode && ("error" == g.resultCode && x(), "maintenance" == g.resultCode))
          {
            if (k) break a;
            k = !0;
            160 > (window.app_ver.split(".").join("") | 0) ? (q(), location.href = "#/Maintenance", location.reload()) : d.nativeReload("#/Maintenance");
            break a
          }
          f(n).trigger("complete", g)
        }
      }
      e = e + 1 || 0
    })
  }

  function w(a, b, e)
  {
    if (b.responseJSON && "maintenance" == b.responseJSON.resultCode) k || (k = !0, 160 > (window.app_ver.split(".").join("") | 0) ? (q(), location.href = "#/Maintenance") : d.nativeReload("#/Maintenance"));
    else if (0 == b.status) c.tapBlock(!1), c.loading.hide(), c.androidKeyStop = !0, new c.PopupClass(
    {
      title: "通信エラー",
      popupId: "resultCodeError",
      content: "通信環境の良い所で再度お試しください。",
      decideBtnText: "リロード",
      canClose: !1
    }, null, function()
    {
      f("#resultCodeError .decideBtn").on(c.cgti, function(a)
      {
        f("#resultCodeError .decideBtn").off();
        d.nativeReload("#/TopPage");
        window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
      })
    });
    else if (429 == b.status || 502 == b.status || 503 == b.status) d.setWebView(), c.loading.hide(), c.tapBlock(!1), c.androidKeyStop = !0, new c.PopupClass(
    {
      title: "通信エラー",
      popupId: "resultCodeError",
      content: "現在、アクセスが集中しております。<br>しばらくたってからアクセスをお願いいたします。",
      decideBtnText: "トップページへ",
      canClose: !1
    }, null, function()
    {
      f("#resultCodeError .decideBtn").on(c.cgti, function(a)
      {
        f("#resultCodeError .decideBtn").off();
        d.nativeReload("#/TopPage");
        window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
      })
    })
  }
  var C, y = 0,
    z = 0,
    t = {},
    p = {},
    u = {},
    g = [],
    k = !1;
  f(document).ajaxSend(function(a, b, c)
  {
    window.g_sns ? (b.setRequestHeader("USER-ID-FBA9X88MAE", window.g_sns), window.isDebug && window.g_token && b.setRequestHeader("F4-Access-Token", window.g_token), window.app_ver && b.setRequestHeader("F4S-CLIENT-VER", window.app_ver), window.sendHostName || (window.sendHostName = location.hostname), b.setRequestHeader("X-Platform-Host", window.sendHostName), window.modelName && b.setRequestHeader("CLIENT-MODEL-NAME", window.modelName), window.osVersion && b.setRequestHeader("CLIENT-OS-VER", window.osVersion), window.bootCount && b.setRequestHeader("CLIENT-SESSION-ID", window.bootCount), window.webInitTime && b.setRequestHeader("WEBVIEW-SESSION-ID", window.webInitTime)) : window.isDebug || window.isBrowser || x()
  });
  f(document).ajaxStart(function(a)
  {
    c.loading.show()
  });
  f(document).ajaxError(function(a, b, e, l)
  {
    "timeout" == l ? (c.tapBlock(!1), c.loading.hide(), c.androidKeyStop = !0, new c.PopupClass(
    {
      title: "通信エラー",
      popupId: "resultCodeError",
      content: "通信環境の良い所で再度お試しください。",
      decideBtnText: "リロード",
      canClose: !1
    }, null, function()
    {
      f("#resultCodeError .decideBtn").on(c.cgti, function(a)
      {
        f("#resultCodeError .decideBtn").off();
        d.nativeReload("#/TopPage");
        window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
      })
    })) : "abort" == l ? (c.tapBlock(!1), c.loading.hide()) : b.responseJSON && "maintenance" == b.responseJSON.resultCode && !k && (k = !0, 160 > (window.app_ver.split(".").join("") | 0) ? (q(), location.href = "#/Maintenance", location.reload()) : d.nativeReload("#/Maintenance"))
  });
  f(document).ajaxComplete(function(a, b)
  {
    200 == b.status && b.responseJSON && b.responseJSON.fox && (b.responseJSON.adjust ? d.setFoxData(b.responseJSON.fox, b.responseJSON.adjust) : d.setFoxData(b.responseJSON.fox));
    if (!window.webInitTime && b.responseJSON && b.responseJSON.currentTime)
    {
      a = b.responseJSON.currentTime.split(" ");
      var e = "";
      _.each(a[0].split("/"), function(a)
      {
        e += a
      });
      _.each(a[1].split(":"), function(a)
      {
        e += a
      });
      window.webInitTime = e
    }
    400 == b.status ? c.loading.hide() : b.responseJSON && "maintenance" == b.responseJSON.resultCode ? k || (k = !0, 160 > (window.app_ver.split(".").join("") | 0) ? (q(), location.href = "#/Maintenance", location.reload()) : d.nativeReload("#/Maintenance")) : 200 !== b.status && 429 !== b.status && 502 !== b.status && 503 !== b.status ? (a = b.status ? b.status : "-", window.isBrowser && 404 == b.status || (C = function()
    {
      c.tapBlock(!1);
      c.loading.hide();
      f("#resultCodeError .decideBtn").on(c.cgti, function(a)
      {
        f("#resultCodeError .decideBtn").off();
        d.nativeReload("#/TopPage");
        window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
      })
    }, c.androidKeyStop = !0, "-" == a ? new c.PopupClass(
    {
      title: "通信エラー",
      popupId: "resultCodeError",
      content: "通信環境の良い所で再度お試しください。",
      decideBtnText: "リロード",
      canClose: !1
    }, null, C) : new c.PopupClass(
    {
      title: "予期せぬエラー",
      popupId: "resultCodeError",
      content: "予期せぬエラーが発生しました。<br />ご迷惑をおかけし、申し訳ございません。[" + a + "]",
      decideBtnText: "トップページへ",
      canClose: !1
    }, null, C))) : b.responseJSON && "error" == b.responseJSON.resultCode && (c.tapBlock(!1), c.loading.hide(), new c.PopupClass(
    {
      title: b.responseJSON.title,
      popupId: "resultCodeError",
      content: b.responseJSON.errorTxt,
      closeBtnText: "閉じる"
    }))
  });
  f.ajaxSetup(
  {
    timeout: 2E4
  });
  var n = {
    interruptCheck: function(a, b)
    {
      a.forceClearCache && d.clearWebCache();
      if (a.resourceUpdated) return c.androidKeyStop = !0, new c.PopupClass(
      {
        title: "データ更新",
        popupId: "resultCodeError",
        content: "データが更新されました。<br>トップページに遷移します。",
        decideBtnText: "トップページへ",
        canClose: !1
      }, null, function()
      {
        c.tapBlock(!1);
        c.loading.hide();
        f("#resultCodeError .decideBtn").on(c.cgti, function(a)
        {
          f("#resultCodeError .decideBtn").off();
          d.nativeReload("#/TopPage");
          window.isDebug && window.isBrowser && (location.href = "#/TopPage", location.reload())
        })
      }), !0;
      a.interrupt && !b && (-1 == a.interrupt.page.indexOf(c.location) && (c.interrupt = a.interrupt.page), location.href = a.interrupt.page, b = window.app_ver.split(".").join("") | 0, "#/TopPage" == a.interrupt.page ? 160 > b || window.isDebug && window.isBrowser ? (q(), location.href = "#/TopPage", location.reload()) : d.nativeReload("#/TopPage") : "#/NewVersionRecommend" == a.interrupt.page ? 160 > b || window.isDebug && window.isBrowser ? (q(), location.href = "#/NewVersionRecommend", location.reload()) : d.nativeReload("#/NewVersionRecommend") : "#/Ban" == a.interrupt.page && (160 > b || window.isDebug && window.isBrowser ? (q(), location.href = "#/Ban", location.reload()) : d.nativeReload("#/Ban")));
      return !1
    },
    ajaxPost: function(a, b, c)
    {
      g = [];
      a = f.ajax(
      {
        url: a,
        type: "POST",
        contentType: "application/JSON",
        dataType: "JSON",
        data: JSON.stringify(b),
        error: function(a)
        {
          console.log("通信エラーのポップアップ出したい");
          w(this, a)
        },
        success: function(a)
        {
          n.interruptCheck(a, !1) || A(a, c)
        }
      });
      g.push(a)
    },
    ajaxPlainPost: function(a, b, c)
    {
      g = [];
      a = f.ajax(
      {
        url: a,
        type: "POST",
        contentType: "text/plain",
        dataType: "text",
        data: b,
        error: function(a)
        {
          w(this, a)
        },
        success: function(a)
        {
          n.interruptCheck(a, !1) || A(a, c)
        }
      });
      g.push(a)
    },
    ajaxSimpleGet: function(a, b, c)
    {
      g = [];
      a = f.ajax(
      {
        url: "" !== b ? a + "/" + b : a,
        type: "GET",
        error: function(a)
        {
          w(this, a)
        },
        success: function(a)
        {
          window.isLocal && (a = JSON.parse(a));
          n.interruptCheck(a, !1) || A(a, c)
        }
      });
      g.push(a)
    },
    simplePageModelGet: function(a, b, d)
    {
      a = a ? a : c.location;
      a = window.isLocal ? "/magica/json/page/" + a + ".json" : "/magica/api/page/" + a;
      this.ajaxPost(a, b, d)
    },
    pageModelGet: function(a, b, c)
    {
      window.g_sns || d.getSNS();
      window.isDebug && !window.g_token && d.getAccessToken();
      if (window.isLocal) this.eachGet(a, b, c);
      else this.onceGet(a, b, c)
    },
    eachGet: function(a, b, d)
    {
      p = null;
      p = {};
      y = 0;
      g = [];
      u = null;
      u = [];
      window.isLocal && "noConnect" != d && D(
      {
        id: c.location
      }, "/magica/json/page/" + c.location + ".json");
      b = 0;
      t = {};
      z = a.length;
      if ("noConnect" == d) f(n).trigger("complete", t);
      else
        for (; b < z;)
        {
          d = c.storageType[a[b].id] || null;
          var e = c.linkList[a[b].id];
          if (!c.hasModel(a[b].id) || a[b].refresh) switch (d)
          {
            case "model":
              F(a[b], e);
              break;
            case "collection":
              G(a[b], e);
              break;
            case null:
              D(a[b], e)
          }
          else p[a[b].id] = c.storage[a[b].id].toJSON(), v(c.storage[a[b].id].toJSON());
          b = b + 1 | 0
        }
    },
    onceGet: function(a, b, d)
    {
      var e = d ? "POST" : "GET";
      p = null;
      p = {};
      u = null;
      u = [];
      for (var g = b ? !0 : !1, n = b = "", h = 0, k = 0; h < a.length;)
      {
        var q = c.storageType[a[h].id] || null,
          r = c.hasModel(a[h].id),
          v = a[h].refresh;
        !r || r && v ? ("collection" === q && r && c.storage[a[h].id].reset(), delete c.storage[a[h].id], "GET" == e ? b += 0 === k ? "value=" + a[h].id : "," + a[h].id : "POST" == e && (n += 0 === k ? "" + a[h].id : "," + a[h].id), k = k + 1 | 0) : p[a[h].id] = c.storage[a[h].id].toJSON();
        h = h + 1 | 0
      }
      var t;
      "GET" == e ? t = b = -1 != b.indexOf("value=") ? b + ("&timeStamp=" + (new Date).getTime()) : b + ("timeStamp=" + (new Date).getTime()) : "POST" == e && ("" !== n && (d.value = n), t = JSON.stringify(d));
      a = {
        url: "/magica/api/page/" + c.location,
        type: e,
        dataType: "json",
        data: t
      };
      "POST" == e && (a.contentType = "application/JSON");
      a.error = function(a)
      {
        w(this, a)
      };
      a.success = function(a)
      {
        E(a, g)
      };
      "noConnect" == d ? E(
      {
        dummy: ""
      }, g) : f.ajax(a)
    },
    getPageJson: function()
    {
      return p
    },
    getPagePureJsons: function()
    {
      return u
    }
  };
  return n
});
