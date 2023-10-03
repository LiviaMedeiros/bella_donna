define("underscore backbone backboneCommon ajaxControl command text!template/mission/MissionTop.html js/view/mission/MissionTopListView".split(" "), function(h, u, a, p, v, w, q)
{
  var l, k, r = {};
  return u.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #tabBtn .btn"] = this.tabScreen;
      b[a.cgti + " #allReserve"] = this.allReserve;
      return b
    },
    initialize: function(a)
    {
      l = p.getPageJson();
      this.firstViewId = a.dispId;
      this.template = h.template(w);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(l));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.eventMission = this.makeEventMissionList();
      this.eventMissionClassList = [];
      r = {};
      l.userDoppelChallengeList && h.each(l.userDoppelChallengeList, function(a, b)
      {
        b = a.challenge.charaNo;
        r[b] || (r[b] = []);
        r[b].push(a)
      });
      this.createView();
      this.clearMissionCount("firstTime");
      this.dailyCalcLeftTime();
      a.setGlobalView();
      k = "mission1";
      this.allReservCheck();
      a.scrollSet("missionScrollWrap", "dailyList");
      a.scrollSet("missionScrollWrap", "totalList");
      a.scrollSet("missionScrollWrap", "doppelList");
      a.scrollSet("missionScrollWrap", "panelList");
      a.scrollSet("tabScroll", "common_tab");
      if (0 < this.eventMissionClassList.length)
        for (var b = this.eventMissionClassList.length; 0 < b;) b = b - 1 | 0, a.scrollSet("missionScrollWrap", this.eventMissionClassList[b]);
      null !== this.firstViewId && "DAILY" !== this.firstViewId && this.checkFirstView();
      v.getBaseData(a.getNativeObj());
      a.ready.hide()
    },
    createView: function()
    {
      q.prototype.rootView = this;
      q.prototype.template = h.template(a.doc.getElementById("missionParts").textContent);
      this.createDailyMissionList();
      this.createTotalMissionList();
      this.eventMission && this.createEventMissionList();
      this.trigger("storyCheck");
      l.userDoppelChallengeList && this.createDoppelMissionList();
      0 < a.panelMissionList.length && this.createPanelMissionList()
    },
    createDailyMissionList: function()
    {
      var b = a.doc.createDocumentFragment(),
        d = l.currentTime.substr(0, 10),
        f = a.storage.gameUser.toJSON(),
        c = 0,
        e = a.storage.userDailyChallengeList.toJSON(),
        e = h.sortBy(e, function(a)
        {
          return a.clearedCount >= a.challenge.count ? -999 + a.challenge.sortKey : a.challenge.sortKey
        });
      h.each(e, function(a, e)
      {
        if (!a.receivedAt || a.receivedAt.substr(0, 10) !== d)
        {
          var t;
          switch (a.challenge.bean)
          {
            case "CLEAR_SUB_QUEST_TODAY":
            case "ARENA_BATTLE_TODAY":
              t = "ARENA";
              e = !0;
              break;
            default:
              e = !1
          }
          e && f.closeFunctions && -1 < f.closeFunctions.indexOf(t) || (a.rewardDescriptionClass = "", a.challenge.rewardDescription && (a.rewardDescriptionClass = "rewardDescription"), a = new q(a, "daily"), b.appendChild(a.render().el), c++)
        }
      });
      1 > c ? a.doc.getElementById("mission1").innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>' : a.doc.getElementById("mission1").appendChild(b);
      b = null
    },
    createTotalMissionList: function()
    {
      var b = a.doc.createDocumentFragment(),
        d = a.storage.gameUser.toJSON(),
        f = 0,
        c = a.storage.userTotalChallengeList.toJSON(),
        c = h.sortBy(c, function(a)
        {
          return a.clearedCount >= a.challenge.count ? -999 + a.challenge.sortKey : a.challenge.sortKey
        });
      h.each(c, function(a, c)
      {
        if (!a.receivedAt)
        {
          var e;
          switch (a.challenge.bean)
          {
            case "CLEAR_SUB_CHAPTER":
            case "ARENA_BATTLE":
            case "ARENA_WIN":
              e = "ARENA";
              c = !0;
              break;
            case "USER_FOLLOW":
              e = "FRIEND";
              c = !0;
              break;
            default:
              c = !1
          }
          c && d.closeFunctions && -1 < d.closeFunctions.indexOf(e) || (a.rewardDescriptionClass = "", a.challenge.rewardDescription && (a.rewardDescriptionClass = "rewardDescription"), a = new q(a, "total"), b.appendChild(a.render().el), f++)
        }
      });
      1 > f ? a.doc.getElementById("mission2").innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>' : a.doc.getElementById("mission2").appendChild(b);
      b = null
    },
    makeEventMissionList: function()
    {
      if (a.storage.userLimitedChallengeList.toJSON())
      {
        var b = [],
          d = Date.parse(l.currentTime),
          f = h.sortBy(l.limitedChallengeGroupList, function(a)
          {
            return a.sortKey
          }),
          c = a.storage.userLimitedChallengeList.toJSON(),
          c = h.sortBy(c, function(a)
          {
            return a.challenge.sortKey
          }),
          e = h.groupBy(c, function(a)
          {
            return a.challenge.groupId
          });
        a.panelMissionList = [];
        h.each(f, function(c, g)
        {
          g = Date.parse(c.startAt);
          if ("PANEL" !== c.viewType)
          {
            var m = c.closeAt ? Date.parse(c.closeAt) : Date.parse(c.endAt);
            c.openFlag = g <= d && m >= d ? !0 : !1;
            c.checkId = "e_" + c.id;
            c.missionList = e[c.id] ? e[c.id] : [];
            b.push(c)
          }
          else c.openFlag = g <= d ? !0 : !1, c.missionList = e[c.id] ? e[c.id] : [], a.panelMissionList.push(c)
        });
        return b
      }
    },
    createEventMissionList: function()
    {
      var b = Date.parse(p.getPageJson().currentTime),
        d = [],
        f = this;
      h.each(this.eventMission, function(c, e)
      {
        d[e] = 0;
        if (c.openFlag)
        {
          var t = a.doc.createDocumentFragment(),
            g = c.checkId,
            m = h.sortBy(c.missionList, function(a)
            {
              return a.clearedCount >= a.challenge.count ? -999 + a.challenge.sortKey : a.challenge.sortKey
            });
          if ("COMPOSE_SUPPORT" === c.viewType && 1 > c.missionList.length) return !1;
          var n = Date.parse(c.endAt),
            k = c.closeAt ? Date.parse(c.closeAt) : n,
            l = b > n && b < k ? !0 : !1;
          h.each(m, function(a, b)
          {
            a.receivedAt || l && a.clearedCount < a.challenge.count || (a.rewardDescriptionClass = "", a.challenge.rewardDescription && (a.rewardDescriptionClass = "rewardDescription"), a = new q(a, g), t.appendChild(a.render().el), d[e]++)
          });
          0 < d[e] ? (m = a.doc.createElement("div"), m.id = g, m.className = "limitedWrap " + g, m.appendChild(t), n = a.doc.createElement("li"), n.className = "btn TE se_tabs " + g, n.dataset.wrap = g, n.dataset.type = c.viewType, c = c.shortName ? c.shortName.replace(/＠/g, "<br>") : c.shortTitle.replace(/＠/g, "<br>"), n.innerHTML = "<span>" + c + "</span><div class='batch " + g + "_batch'></div>", f.eventMissionClassList.push(g), a.doc.getElementById("tabBtn").getElementsByClassName("common_tab")[0].appendChild(n), a.doc.getElementById("missionScrollWrap").appendChild(m), m = n = null) : l || (m = a.doc.createElement("div"), m.id = g, m.className = "limitedWrap " + g, m.innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>', n = a.doc.createElement("li"), n.className = "btn TE se_tabs " + g, n.dataset.wrap = g, c = c.shortName ? c.shortName.replace(/＠/g, "<br>") : c.shortTitle.replace(/＠/g, "<br>"), n.innerHTML = "<span>" + c + "</span><div class='batch " + g + "_batch'></div>", f.eventMissionClassList.push(g), a.doc.getElementById("tabBtn").getElementsByClassName("common_tab")[0].appendChild(n), a.doc.getElementById("missionScrollWrap").appendChild(m), m = n = null)
        }
      })
    },
    createDoppelMissionList: function()
    {
      a.doppelMissionList = null;
      var b = a.doc.createElement("li");
      b.className = "btn TE se_tabs doppelMissionTab";
      b.innerHTML = "<span>ドッペル解放<br>チャレンジ</span>";
      b.dataset.wrap = "doppelMission";
      b.dataset.missionName = "ドッペル解放チャレンジ";
      a.doc.getElementById("tabBtn").getElementsByClassName("common_tab")[0].appendChild(b);
      h.each(r, function(b, f, c)
      {
        h.sortBy(b, function(a)
        {
          return a.clearedCount >= a.challenge.count ? -999 + a.challenge.sortKey : a.challenge.sortKey
        });
        var e = 0,
          d = 0;
        h.each(b, function(a, b)
        {
          a.receivedAt ? d++ : a.clearedCount >= a.challenge.count && e++
        });
        c = "/magica/resource/image_web/page/mission/doppelMission/" + f + "01/banner.png";
        var g = a.doc.createElement("div");
        g.className = "banner TE se_decide linkBtn";
        g.innerHTML = "<div class='img'></div><span class='badge'>" + e + "</span>";
        g.dataset.href = "#/DoppelMissionTop/" + f;
        g.querySelector(".img").style.backgroundImage = "url('" + c + "')";
        g.querySelector(".img").style.backgroundSize = "100% 100%";
        g.missionList = b;
        0 < e && (a.addClass(g, "badge"), a.addClass(a.doc.querySelector(".doppelMissionTab"), "badge"));
        d == b.length && a.addClass(g, "comp");
        a.doc.querySelector("#doppelMission").appendChild(g)
      });
      $("#doppelMission .banner").bind(a.cgti, function(b)
      {
        a.doppelMissionList = b.currentTarget.missionList
      })
    },
    createPanelMissionList: function()
    {
      var b = a.doc.createElement("li");
      b.className = "btn TE se_tabs panelMissionTab";
      b.innerHTML = "<span>スタンプカード</span>";
      b.dataset.wrap = "panelMission";
      b.dataset.missionName = "スタンプカード";
      a.doc.getElementById("tabBtn").getElementsByClassName("common_tab")[0].appendChild(b);
      for (var b = a.panelMissionList.length, d = 0; d < b; d++)
      {
        var f = 0;
        h.each(a.panelMissionList[d].missionList, function(a, b)
        {
          a.receivedAt || a.clearedCount >= a.challenge.count && f++
        });
        var c = "/magica/resource/image_web/page/mission/panelMission/" + a.panelMissionList[d].id + "/banner.png",
          e = a.doc.createElement("div");
        e.className = "banner TE se_decide linkBtn";
        e.innerHTML = "<div class='img'></div><span class='badge'>" + f + "</span>";
        e.dataset.href = "#/PanelMissionTop/" + a.panelMissionList[d].id;
        e.querySelector(".img").style.backgroundImage = "url('" + c + "')";
        e.querySelector(".img").style.backgroundSize = "100% 100%";
        0 < f && (a.addClass(e, "badge"), a.addClass(a.doc.querySelector(".panelMissionTab"), "badge"));
        a.doc.querySelector("#panelMission").appendChild(e)
      }
    },
    checkFirstView: function()
    {
      var b = this,
        d = !1,
        f = String(this.firstViewId);
      "TOTAL" === this.firstViewId ? d = "mission2" : "DOPPELMISSION" === this.firstViewId ? d = "doppelMissionTab" : "PANELMISSION" === this.firstViewId ? d = "panelMissionTab" : -1 !== f.indexOf("e_") ? d = f : h.each(this.eventMission, function(a, e)
      {
        a.eventId && a.eventId === Number(b.firstViewId) ? a.openFlag && (d = a.checkId) : a.campaignId && a.campaignId === Number(b.firstViewId) ? a.openFlag && (d = a.checkId) : a.regularEventId && a.regularEventId === Number(b.firstViewId) && a.openFlag && (d = a.checkId)
      });
      d ? this.tabScreen(null, d) : new a.PopupClass(
      {
        title: "期間外",
        content: "期間外のため<br>対象のミッションは存在しません",
        closeBtnText: "OK",
        popupType: "typeC"
      });
      this.firstViewId = null
    },
    dailyCalcLeftTime: function()
    {
      var b;
      b = Date.parse(l.currentTime) / 1E3;
      var d = new Date(1E3 * (b + 86400));
      b = (Date.parse(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " 0:00:00") / 1E3 - b) / 60;
      60 > b ? b = Math.floor(b) + "分" : 60 < b && 1440 > b ? b = Math.floor(b / 60) + "時間" : (b = b / 60 / 24, b = 30 < b ? Math.floor(b / 30) + "カ月" : Math.floor(b) + "日");
      a.doc.getElementById("dailyTimeNum").textContent = b
    },
    eventCalcLeftTime: function(b)
    {
      b = b.closeAt ? new Date(b.closeAt) : new Date(b.endAt);
      b = b.getMonth() + 1 + "月" + b.getDate() + "日" + b.getHours() + ":" + b.getMinutes();
      a.doc.getElementById("eventTimeNum").textContent = b
    },
    tabScreen: function(b, d)
    {
      if (b)
      {
        b.preventDefault();
        if (a.isScrolled() || b.currentTarget.dataset.wrap === k) return;
        b = b.currentTarget
      }
      else b = a.doc.getElementById("tabBtn").getElementsByClassName(d)[0];
      if (b && b.dataset)
      {
        d = a.doc.getElementById("tabBtn").getElementsByClassName("current")[0];
        a.removeClass(d, "current");
        "mission1" !== k && "mission2" !== k && "doppelMission" !== k && "panelMission" !== k ? a.removeClass(a.doc.getElementById(k), "on") : a.removeClass(a.doc.getElementById("MissionList"), k);
        if ("mission1" !== b.dataset.wrap && "mission2" !== b.dataset.wrap && "doppelMission" !== b.dataset.wrap && "panelMission" !== b.dataset.wrap)
        {
          if (a.addClass(a.doc.getElementById(b.dataset.wrap), "on"), d = h.findWhere(this.eventMission,
            {
              checkId: b.dataset.wrap
            })) this.eventCalcLeftTime(d), "COMPOSE_SUPPORT" === b.dataset.type ? a.removeClass(a.doc.getElementById("eventTime"), "on") : a.addClass(a.doc.getElementById("eventTime"), "on"), a.doc.getElementById("listTitle").textContent = d.name ? d.name.replace(/＠/g, "") : d.title.replace(/＠/g, "")
        }
        else a.removeClass(a.doc.getElementById("eventTime"), "on"), a.addClass(a.doc.getElementById("MissionList"), b.dataset.wrap), d = b.dataset.missionName.replace(/＠/g, "<br>"),
          a.doc.getElementById("listTitle").textContent = d;
        a.addClass(b, "current");
        k = b.dataset.wrap;
        this.allReservCheck();
        switch (k)
        {
          case "mission1":
            a.scrollRefresh("missionScrollWrap", "dailyList", !0);
            break;
          case "mission2":
            a.scrollRefresh("missionScrollWrap", "totalList", !0);
            break;
          case "doppelMission":
            a.scrollRefresh("missionScrollWrap", "doppelList", !0);
            break;
          case "panelMission":
            a.scrollRefresh("missionScrollWrap", "panelList", !0);
            break;
          default:
            a.scrollRefresh("missionScrollWrap", k, !0)
        }
      }
    },
    clearMissionCount: function(b)
    {
      var d = 0,
        f = 0,
        c = l.currentTime.substr(0, 10);
      a.storage.userDailyChallengeList.each(function(a, b)
      {
        a = a.toJSON();
        a.receivedAt && a.receivedAt.substr(0, 10) === c || a.clearedCount >= a.challenge.count && d++
      });
      a.storage.userTotalChallengeList.each(function(a, b)
      {
        a = a.toJSON();
        a.receivedAt || a.clearedCount >= a.challenge.count && f++
      });
      0 < d ? (a.doc.getElementById("dailyBatch").textContent = d, a.addClass(a.doc.getElementById("dailyBatch"), "on")) : a.removeClass(a.doc.getElementById("dailyBatch"), "on");
      0 < f ? (a.doc.getElementById("totalBatch").textContent = f, a.addClass(a.doc.getElementById("totalBatch"), "on")) : a.removeClass(a.doc.getElementById("totalBatch"), "on");
      this.eventMission && (b || (this.eventMission = this.makeEventMissionList()), h.each(this.eventMission, function(b, c)
      {
        if (b.openFlag)
        {
          c = a.doc.getElementById("tabBtn").getElementsByClassName(b.checkId + "_batch")[0];
          var d = 0;
          h.each(b.missionList, function(a, b)
          {
            a.receivedAt || a.clearedCount >= a.challenge.count && d++
          });
          c && (0 < d ? (c.textContent = d, a.addClass(c, "on")) : a.removeClass(c, "on"))
        }
      }))
    },
    allReserve: function(b)
    {
      b.preventDefault();
      if (!(a.isScrolled() || b.currentTarget.classList.contains("off") || 0 < this.tapCount))
      {
        this.tapCount++;
        a.addClass(a.doc.getElementById("allReserve"), "off");
        var d = this,
          f = [];
        switch (k)
        {
          case "mission1":
            var c = l.currentTime.substr(0, 10);
            p.ajaxPost(a.linkList.userDailyAllReceive,
            {}, function(b)
            {
              if ("error" !== b.resultCode)
              {
                var e = 0;
                a.storage.userDailyChallengeList.each(function(a, b)
                {
                  a && (a = a.toJSON(), (!a.receivedAt || a.receivedAt.substr(0, 10) !== c) && a.clearedCount >= a.challenge.count && (f.push(a.challengeId), e++))
                });
                var g = function()
                {
                  d.trigger("afterAllRecieve", "daily", f);
                  d.allReservCheck();
                  d.clearMissionCount();
                  d.tapCount = 0;
                  a.addClass(a.doc.getElementById("allReserve"), "off");
                  a.scrollRefresh(null, null, !0)
                };
                1 > Object.keys(b).length || window.isLocal && window.isBrowser && 2 > Object.keys(b).length ? new a.PopupClass(
                {
                  content: "受け取り期限を過ぎているため<br>対象のミッション報酬を受け取ることはできません",
                  closeBtnText: "OK",
                  popupType: "typeC",
                  exClass: "missionPop"
                }, null, null, g) : (new a.PopupClass(
                {
                  content: "ミッション報酬を" + e + "件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
                  closeBtnText: "OK",
                  popupType: "typeC",
                  exClass: "missionPop"
                }, null, null, g), a.responseSetStorage(b))
              }
            });
            break;
          case "mission2":
            p.ajaxPost(a.linkList.userTotalAllReceive,
            {}, function(b)
            {
              if ("error" !== b.resultCode)
              {
                var c = 0;
                a.storage.userTotalChallengeList.each(function(a, b)
                {
                  a && (a = a.toJSON(), !a.receivedAt && a.clearedCount >= a.challenge.count && (f.push(a.challengeId), c++))
                });
                var e = function()
                {
                  d.trigger("afterAllRecieve", "total", f);
                  d.allReservCheck();
                  d.clearMissionCount();
                  d.tapCount = 0;
                  a.addClass(a.doc.getElementById("allReserve"), "off");
                  a.scrollRefresh(null, null, !0)
                };
                1 > Object.keys(b).length || window.isLocal && window.isBrowser && 2 > Object.keys(b).length ? new a.PopupClass(
                {
                  content: "受け取り期限を過ぎているため<br>対象のミッション報酬を受け取ることはできません",
                  closeBtnText: "OK",
                  popupType: "typeC",
                  exClass: "missionPop"
                }, null, null, e) : (new a.PopupClass(
                {
                  content: "ミッション報酬を" + c + "件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
                  closeBtnText: "OK",
                  popupType: "typeC",
                  exClass: "missionPop"
                }, null, null, e), a.responseSetStorage(b))
              }
            });
            break;
          default:
            this.allReserveAdvance()
        }
      }
    },
    allReserveAdvance: function()
    {
      var b = this,
        d = k.split("_"),
        f = {};
      "e" === d[0] && (f.groupId = Number(d[1]), p.ajaxPost(a.linkList.userLimitedChallengeAllReceieve, f, function(c)
      {
        if ("error" !== c.resultCode)
        {
          var d = h.findWhere(b.eventMission,
            {
              checkId: k
            }),
            f = 0,
            g = [];
          h.each(d.missionList, function(a, b)
          {
            a && !a.receivedAt && a.clearedCount >= a.challenge.count && (g.push(a.challengeId), f++)
          });
          d = function()
          {
            b.trigger("afterAllRecieve", k, g);
            b.allReservCheck();
            b.clearMissionCount();
            b.tapCount = 0;
            a.addClass(a.doc.getElementById("allReserve"), "off");
            a.scrollRefresh(null, null, !0)
          };
          1 > Object.keys(c).length || window.isLocal && window.isBrowser && 2 > Object.keys(c).length ? new a.PopupClass(
          {
            content: "受け取り期限を過ぎているため<br>対象のミッション報酬を受け取ることはできません",
            closeBtnText: "OK",
            popupType: "typeC",
            exClass: "missionPop"
          }, null, null, d) : new a.PopupClass(
          {
            content: "ミッション報酬を" + f + "件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
            closeBtnText: "OK",
            popupType: "typeC",
            exClass: "missionPop"
          }, null, null, d);
          a.responseSetStorage(c);
          b.eventMission = b.makeEventMissionList()
        }
      }))
    },
    allReservCheck: function()
    {
      a.removeClass(a.doc.getElementById("allReserve"), "hide");
      switch (k)
      {
        case "mission1":
          var b = 0,
            d = l.currentTime.substr(0, 10);
          a.storage.userDailyChallengeList.each(function(a, c)
          {
            a = a.toJSON();
            a.receivedAt && a.receivedAt.substr(0, 10) === d || a.clearedCount >= a.challenge.count && b++
          });
          0 < b ? a.removeClass(a.doc.getElementById("allReserve"), "off") : a.addClass(a.doc.getElementById("allReserve"), "off");
          break;
        case "mission2":
          var f = 0;
          a.storage.userTotalChallengeList.each(function(a, b)
          {
            a = a.toJSON();
            a.receivedAt || a.clearedCount >= a.challenge.count && f++
          });
          0 < f ? a.removeClass(a.doc.getElementById("allReserve"), "off") : a.addClass(a.doc.getElementById("allReserve"), "off");
          break;
        case "doppelMission":
        case "panelMission":
          a.addClass(a.doc.getElementById("allReserve"), "hide");
          break;
        default:
          var c = k.split("_");
          "e" === c[0] ? (c = h.findWhere(l.limitedChallengeGroupList,
          {
            id: Number(c[1])
          }), a.addClass(a.doc.getElementById("allReserve"), "off"), "STORY" === c.viewType && a.addClass(a.doc.getElementById("allReserve"), "hide")) : a.addClass(a.doc.getElementById("allReserve"), "off");
          this.allReserveCheckAdvance()
      }
    },
    allReserveCheckAdvance: function()
    {
      var b = h.findWhere(this.eventMission,
        {
          checkId: k
        }),
        d = 0;
      b ? (h.each(b.missionList, function(a, b)
      {
        a.receivedAt || a.clearedCount >= a.challenge.count && d++
      }), 0 < d ? a.removeClass(a.doc.getElementById("allReserve"), "off") : a.addClass(a.doc.getElementById("allReserve"), "off")) : a.addClass(a.doc.getElementById("allReserve"), "off")
    },
    removeView: function()
    {
      this.trigger("removeChildView");
      this.off();
      this.remove()
    }
  })
});
