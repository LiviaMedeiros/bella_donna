define("underscore backbone backboneCommon ajaxControl text!template/user/AnnounceTemp.html text!template/user/AnnounceTempMainte.html command text!template/announce/tempNotice01.html text!template/announce/tempNotice02.html".split(" "), function(k, r, b, l, t, u, p, v, w)
{
  var m, g, q;
  return r.View.extend(
  {
    events: function()
    {
      var a = {};
      window.isBrowser && (a[b.cgti + " .debugBtn"] = this.debugBtn, a[b.cgti + " .debugOpenBtn"] = this.debugOpenBtn, a[b.cgti + " .debugCloseBtn"] = this.debugCloseBtn, a[b.cgti + " .debugClearBtn"] = this.debugClearBtn);
      a[b.cgti + " .titleList"] = this.openText;
      a[b.cgti + " .bannerAnnounce"] = this.openText;
      a[b.cgti + " .otherNews"] = this.openText;
      a[b.cgti + " .bannerLinkBtn"] = this.bannerLink;
      a[b.cgti + " .newsClose.btn"] = this.closeText;
      a[b.cgti + " .announceBtn"] = this.categoryToggle;
      a[b.cgti + " .andMoreBtn"] = this.andMore;
      a[b.cgti + " .announcePassport"] = this.passPortAnnounce;
      a[b.cgti + " .outerLink"] = this.outerLink;
      a[b.cgti + " .announceTextLink"] = this.announceTextLink;
      a[b.cgti + " .announceOuterLink"] = this.outerLink;
      a[b.cgti + " .separateOuterLink"] = this.separateOuterLink;
      a[b.cgti + " .noticeText"] = this.tapNoticeText;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this, "removeView", this.removeView);
      this.model = JSON.parse(a.announcementJson);
      this.bannerModel = JSON.parse(a.bannerJson);
      this.currentCategory = "NEW";
      if ("Maintenance" !== b.historyArr[b.historyArr.length - 1] && b.storage.gameUser) this.readDay = b.storage.gameUser.get("announcementViewAt") ? Date.parse(b.storage.gameUser.get("announcementViewAt")) : -1, this.template = k.template(t), this.currentTime = l.getPageJson().currentTime;
      else
      {
        this.readDay = Infinity;
        this.template = k.template(u);
        var c = new Date;
        this.currentTime = c.getFullYear() + "/" + (c.getMonth() + 1) + "/" + c.getDate() + " " + c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds()
      }
      var d = this;
      window.isLocal && window.isDebug && (this.currentTime = "2017-11-20 20:00:00");
      this.model = k.filter(this.model, function(a)
      {
        return Date.parse(a.startAt.replace(/-/g, "/")) <= Date.parse(d.currentTime)
      });
      this.model = k.sortBy(this.model, function(a)
      {
        return a.startAt
      });
      this.newestList = k.sortBy(this.model, function(a)
      {
        return -1 * a.sortKey
      });
      this.render();
      b.scrollSet("scrollTextWrap", "newsField");
      b.scrollSet("newsScrollWarp", "announceTitle");
      "Maintenance" !== b.historyArr[b.historyArr.length - 1] && b.scrollSet("announceBannerArea", "scrollBar");
      a.firstViewNews && this.openTextFirst(a.firstViewNews);
      a.targetEvent && this.openTextEvent(a.targetEvent);
      a.targetCampaign && this.openTextCampaign(a.targetCampaign);
      a.announceData && this.openTargetAnnounce(a.announceData)
    },
    render: function()
    {
      k.sortBy(this.model, function(a)
      {
        return -1 * a.sortKey
      });
      var a = k.sortBy(this.bannerModel, function(a)
        {
          return a.sortKey
        }),
        c = [],
        d = b.thisPlatform ? b.thisPlatform : b.ua.android ? "ANDROID" : b.ua.ios ? "IOS" : window.isDebug ? "IOS" : "DMM";
      this.platForm = d;
      if ("Maintenance" !== b.historyArr[b.historyArr.length - 1])
      {
        for (var f = this.newestList.length, e = 0, h = Date.parse(l.getPageJson().currentTime); e < f;)
        {
          var n = this.newestList[e].startAt.replace(/-/g, "/"),
            p = this.newestList[e].endAt.replace(/-/g, "/");
          h >= Date.parse(n) && Date.parse(n) > this.readDay && Date.parse(p) > h && (0 > c.indexOf(this.newestList[e].category) && (this.newestList[e].displayOs && "ALL" === this.newestList[e].displayOs ? c.push(this.newestList[e].category) : this.newestList[e].displayOs && this.newestList[e].displayOs === d && c.push(this.newestList[e].category)), 3 === c.length && (e = f));
          e++
        }
        0 < c.length && (-1 < c.indexOf("NEW") ? this.currentCategory = "NEW" : -1 < c.indexOf("MNT") ? this.currentCategory = "MNT" : -1 < c.indexOf("UPD") && (this.currentCategory = "UPD"))
      }
      f = {};
      "Maintenance" !== b.location && (e = Date.parse(l.getPageJson().currentTime), h = (new Date(e)).getDay(), f.week = h, (h = b.storage.gameUser ? b.storage.gameUser.toJSON() : l.getPageJson().gameUser) || (h = {}), h.passportExpiredAt ? (n = Math.floor((Date.parse(h.passportExpiredAt) - e) / 1E3 / 60 / 60 / 24), f.passport = -1 < n ? !1 : !0) : f.passport = !0, f.passport = !1, h.startdashGachaExpiredAt ? (n = Math.floor(Date.parse(h.startdashGachaExpiredAt) - e), f.startDashGacha = 0 < n ? !0 : !1) : f.startDashGacha = !1, h.startdashMemoriaGachaExpiredAt ? (n = Math.floor(Date.parse(h.startdashMemoriaGachaExpiredAt) - e), f.startDashGachaMemoria = 0 < n ? !0 : !1) : f.startDashGachaMemoria = !1, f.startDashCampaign = !1, h.startdashCampaignExpiredAt && (h = new Date(h.startdashCampaignExpiredAt), n = Math.floor(h.getTime() - e), 0 < n && (e = k.findWhere(l.getPageJson().campaignList,
      {
        campaignType: "STARTDASH"
      })))) && (f.startDashCampaign = !0, f.startDashCampaignContent = {}, f.startDashCampaignContent.campaignId = e.id, f.startDashCampaignContent.endDate = h.getMonth() + 1 + "/" + h.getDate() + " " + h.getHours() + ":" + h.getMinutes(), e = k.findWhere(this.model,
      {
        campaignId: e.id | 0
      })) && (f.startDashCampaignContent.campaignNewsId = e.id);
      this.$el.html(this.template(
      {
        model: this.newestList,
        newFlg: c,
        readDay: this.readDay,
        banner: a,
        addShow: f,
        currentTime: this.currentTime,
        userAgent: d
      }));
      this.el.style.width = "100%";
      this.el.style.height = "100%";
      this.el.style.position = "relative";
      b.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(this.el);
      m = b.doc.getElementById("popupArea").getElementsByClassName("announceTitle")[0];
      g = b.doc.getElementById("popupArea").getElementsByClassName("newsField")[0];
      q = b.doc.getElementById("announceTab");
      b.addClass(q.getElementsByClassName(this.currentCategory)[0], "current");
      m.classList.add(this.currentCategory);
      if ("Maintenance" !== b.historyArr[b.historyArr.length - 1])
      {
        a = this.model.length;
        c = -1;
        for (d = Date.parse(l.getPageJson().currentTime); 0 < a;) a--, f = this.model[a].startAt.replace(/-/g, "/"), e = this.model[a].endAt.replace(/-/g, "/"), d >= Date.parse(f) && Date.parse(f) > this.readDay && Date.parse(e) > d && (c = this.model[a].id, a = 0); - 1 < c && !window.isLocal && l.ajaxSimpleGet(b.linkList.readAnnounce, "", function(a)
        {
          b.responseSetStorage(a)
        })
      }
    },
    tapNoticeText: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c = {
          Notice01: v,
          Notice02: w
        } [a.currentTarget.dataset.id];
        a = $(a.currentTarget).text();
        b.targetAnnounceOpen(
        {
          announceData:
          {
            subject: a,
            startAt: "2024-7-31 00:00:00",
            text: c
          }
        })
      }
    },
    debugBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        a = b.doc.getElementsByClassName("announceList")[0];
        var c = b.doc.getElementsByClassName("announceText")[0],
          d = b.doc.getElementsByClassName("announceDebug")[0];
        a.classList.add("none");
        c.classList.add("none");
        d.classList.remove("none")
      }
    },
    debugOpenBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        a = b.doc.getElementById("taTitle").value;
        var c = b.doc.getElementById("taText").value,
          d = l.getPageJson().currentTime,
          d = d.split(" ")[0],
          d = d.replace(/\//g, "-");
        this.model.unshift(
        {
          id: 987654321,
          displayOs: "ALL",
          category: "NEW",
          subject: a,
          text: c,
          htmlPath: "",
          imgPath: "",
          startAt: d + " 00:00:00",
          endAt: d + " 23:59:59",
          sortKey: 10,
          createdAt: "2017-09-22 20:07:44"
        });
        this.openTextFirst(987654321);
        b.doc.getElementsByClassName("announceDebug")[0].classList.add("none")
      }
    },
    debugCloseBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = b.doc.getElementsByClassName("announceList")[0], b.doc.getElementsByClassName("announceDebug")[0].classList.add("none"), a.classList.remove("none"))
    },
    debugClearBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.doc.getElementById("taTitle").value = "", b.doc.getElementById("taText").value = "")
    },
    openText: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && (a = k.findWhere(this.model,
        {
          id: a.currentTarget.getAttribute("data-newsId") | 0
        })))
      {
        var c = "";
        a.imgPath && (c = '<div class="newsImage announceImg"><img src="' + resDir + a.imgPath + '"></div>');
        g.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
        if ("DMM" === this.platForm && g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
        p.getBaseData(b.getNativeObj());
        for (var f = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"), e = 0, c = 0; c < f.length; c++) d = new Image, d.onload = function()
        {
          e++;
          e >= f.length && b.scrollRefresh("scrollTextWrap", "newsField", !0)
        }, d.src = f[c].src;
        c = a.startAt.split("-");
        d = a.subject.replace(/(<br>|<br \/>|<br\/>)/gi, "");
        b.doc.getElementById("announceTitle").getElementsByClassName("announceMultiLine")[0].innerHTML = d;
        switch (a.category)
        {
          case "NEW":
            a = "お知らせ";
            break;
          case "MNT":
            a = "メンテナンス";
            break;
          case "UPD":
            a = "アップデート";
            break;
          default:
            a = "お知らせ"
        }
        b.doc.getElementById("categoryBanner").innerText = a;
        b.doc.getElementById("innerDate").innerText = Number(c[1]) + "/" + Number(c[2].split(" ")[0]);
        b.doc.getElementsByClassName("announceList")[0].classList.add("none");
        b.doc.getElementsByClassName("announceText")[0].classList.remove("none");
        g.classList.add("on");
        m.classList.add("off");
        a = b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0];
        a.classList.add("on");
        a.addEventListener(b.cgti, this.closeText, !1);
        b.scrollRefresh("scrollTextWrap", "newsField", !0)
      }
    },
    openTextFirst: function(a)
    {
      if (a = k.findWhere(this.model,
        {
          id: a | 0
        }))
      {
        var c = Date.parse(l.getPageJson().currentTime),
          d = a.startAt.replace(/-/g, "/"),
          f = a.endAt.replace(/-/g, "/");
        if (!(c < Date.parse(d) && Date.parse(f) <= c))
        {
          c = "";
          a.imgPath && (c = '<div class="newsImage announceImg"><img src="' + resDir + a.imgPath + '"></div>');
          g.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
          if ("DMM" === this.platForm && g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
            for (c = g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
          p.getBaseData(b.getNativeObj());
          for (var e = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"), h = 0, c = 0; c < e.length; c++) d = new Image, d.onload = function()
          {
            h++;
            h >= e.length && b.scrollRefresh("scrollTextWrap", "newsField", !0)
          }, d.src = e[c].src;
          c = a.startAt.split("-");
          d = a.subject.replace(/(<br>|<br \/>|<br\/>)/gi, "");
          b.doc.getElementById("announceTitle").getElementsByClassName("announceMultiLine")[0].innerHTML = d;
          switch (a.category)
          {
            case "NEW":
              a = "お知らせ";
              break;
            case "MNT":
              a = "メンテナンス";
              break;
            case "UPD":
              a = "アップデート";
              break;
            default:
              a = "お知らせ"
          }
          b.doc.getElementById("categoryBanner").innerText = a;
          b.doc.getElementById("innerDate").innerText = Number(c[1]) + "/" + Number(c[2].split(" ")[0]);
          b.doc.getElementsByClassName("announceList")[0].classList.add("none");
          b.doc.getElementsByClassName("announceText")[0].classList.remove("none");
          g.classList.add("on");
          m.classList.add("off");
          a = b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0];
          a.classList.add("on");
          a.addEventListener(b.cgti, this.closeText, !1);
          b.scrollRefresh("scrollTextWrap", "newsField", !0)
        }
      }
    },
    openTextEvent: function(a)
    {
      if (a = k.findWhere(this.model,
        {
          eventId: a | 0
        }))
      {
        Date.parse(l.getPageJson().currentTime);
        var c = "";
        a.imgPath && (c = '<div class="newsImage announceImg"><img src="' + resDir + a.imgPath + '"></div>');
        g.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
        if ("DMM" === this.platForm && g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"),
              d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
        p.getBaseData(b.getNativeObj());
        for (var f = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"), e = 0, c = 0; c < f.length; c++) d = new Image, d.onload = function()
        {
          e++;
          e >= f.length && b.scrollRefresh("scrollTextWrap", "newsField", !0)
        }, d.src = f[c].src;
        c = a.startAt.split("-");
        d = a.subject.replace(/(<br>|<br \/>|<br\/>)/gi, "");
        b.doc.getElementById("announceTitle").getElementsByClassName("announceMultiLine")[0].innerHTML = d;
        switch (a.category)
        {
          case "NEW":
            a = "お知らせ";
            break;
          case "MNT":
            a = "メンテナンス";
            break;
          case "UPD":
            a = "アップデート";
            break;
          default:
            a = "お知らせ"
        }
        b.doc.getElementById("categoryBanner").innerText = a;
        b.doc.getElementById("innerDate").innerText = Number(c[1]) + "/" + Number(c[2].split(" ")[0]);
        b.doc.getElementsByClassName("announceList")[0].classList.add("none");
        b.doc.getElementsByClassName("announceText")[0].classList.remove("none");
        g.classList.add("on");
        m.classList.add("off");
        c = b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0];
        c.classList.add("on");
        a = function()
        {
          b.g_popup_instance.popupView.close()
        };
        c.addEventListener(b.cgti, a, !1);
        c = b.doc.getElementsByClassName("newsClose")[0];
        c.innerText = "閉じる";
        b.addClass(c, "eventClose");
        b.removeClass(c, "newsClose");
        c.addEventListener(b.cgti, a, !1);
        b.scrollRefresh("scrollTextWrap", "newsField", !0)
      }
    },
    openTextCampaign: function(a)
    {
      if (a = k.findWhere(this.model,
        {
          campaignId: a | 0
        }))
      {
        var c = "";
        a.imgPath && (c = '<div class="newsImage announceImg"><img src="' + resDir + a.imgPath + '"></div>');
        g.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
        if ("DMM" === this.platForm && g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
        p.getBaseData(b.getNativeObj());
        for (var f = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"), e = 0, c = 0; c < f.length; c++) d = new Image, d.onload = function()
        {
          e++;
          e >= f.length && b.scrollRefresh("scrollTextWrap", "newsField", !0)
        }, d.src = f[c].src;
        c = a.startAt.split("-");
        d = a.subject.replace(/(<br>|<br \/>|<br\/>)/gi, "");
        b.doc.getElementById("announceTitle").getElementsByClassName("announceMultiLine")[0].innerHTML = d;
        switch (a.category)
        {
          case "NEW":
            a = "お知らせ";
            break;
          case "MNT":
            a = "メンテナンス";
            break;
          case "UPD":
            a = "アップデート";
            break;
          default:
            a = "お知らせ"
        }
        b.doc.getElementById("categoryBanner").innerText = a;
        b.doc.getElementById("innerDate").innerText = Number(c[1]) + "/" + Number(c[2].split(" ")[0]);
        b.doc.getElementsByClassName("announceList")[0].classList.add("none");
        b.doc.getElementsByClassName("announceText")[0].classList.remove("none");
        g.classList.add("on");
        m.classList.add("off");
        c = b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0];
        c.classList.add("on");
        a = function()
        {
          b.g_popup_instance.popupView.close()
        };
        c.addEventListener(b.cgti, a, !1);
        c = b.doc.getElementsByClassName("newsClose")[0];
        c.innerText = "閉じる";
        b.addClass(c, "eventClose");
        b.removeClass(c, "newsClose");
        c.addEventListener(b.cgti, a, !1);
        b.scrollRefresh("scrollTextWrap", "newsField", !0)
      }
    },
    closeText: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.doc.getElementsByClassName("announceList")[0].classList.remove("none"), b.doc.getElementsByClassName("announceText")[0].classList.add("none"), g.classList.remove("on"), m.classList.remove("off"), g.getElementsByClassName("newsTextField")[0].innerHTML = "", b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0].classList.remove("on"), window.isLocal || "Maintenance" === b.historyArr[b.historyArr.length - 1] || b.scrollRefresh("announceBannerArea", "scrollBar"), b.scrollRefresh("newsScrollWarp", "announceTitle"))
    },
    bannerLink: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (-1 < location.hash.indexOf(a.currentTarget.dataset.href) ? b.g_popup_instance.popupView.close() : (b.ready.show(), setTimeout(function()
      {
        location.href = a.currentTarget.dataset.href
      }, 500)))
    },
    categoryToggle: function(a)
    {
      a.preventDefault();
      b.isScrolled() || this.currentCategory === a.currentTarget.getAttribute("data-category") || (a = a.currentTarget.getAttribute("data-category"), b.removeClass(q.getElementsByClassName(this.currentCategory)[0], "current"), m.classList.remove(this.currentCategory), b.addClass(q.getElementsByClassName(a)[0], "current"), m.classList.add(a), this.currentCategory = a, b.scrollRefresh("newsScrollWarp", "announceTitle", !0))
    },
    andMore: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.addClass(b.doc.getElementById("newsScrollWarp").getElementsByClassName("scrollBar")[0], "moreDisp"), b.scrollRefresh())
    },
    passPortAnnounce: function(a)
    {
      a.preventDefault();
      b.isScrolled() || b.globalMenuView.moneyPopup(a)
    },
    outerLink: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = a.currentTarget.dataset.outlink) && p.browserOpen(a)
    },
    separateOuterLink: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = b.ua.android ? a.currentTarget.dataset.androidUrl : a.currentTarget.dataset.iosUrl) && p.browserOpen(a)
    },
    announceTextLink: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && "Maintenance" !== b.historyArr[b.historyArr.length - 1])
      {
        var c = a.currentTarget.dataset.href;
        c && (-1 < location.hash.indexOf(a.currentTarget.dataset.href) ? b.g_popup_instance.popupView.close() : location.href = c)
      }
    },
    openTargetAnnounce: function(a)
    {
      if (a)
      {
        g.getElementsByClassName("newsTextField")[0].innerHTML = a.text;
        if ("DMM" === this.platForm && g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = g.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
        p.getBaseData(b.getNativeObj());
        for (var f = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"), e = 0, c = 0; c < f.length; c++) d = new Image, d.onload = function()
        {
          e++;
          e >= f.length && b.scrollRefresh("scrollTextWrap", "newsField", !0)
        }, d.src = f[c].src;
        c = a.startAt.split("-");
        a = a.subject.replace(/(<br>|<br \/>|<br\/>)/gi, "");
        b.doc.getElementById("announceTitle").getElementsByClassName("announceMultiLine")[0].innerHTML = a;
        b.doc.getElementById("categoryBanner").innerText = "お知らせ";
        b.doc.getElementById("innerDate").innerText = Number(c[1]) + "/" + Number(c[2].split(" ")[0]);
        b.doc.getElementsByClassName("announceList")[0].classList.add("none");
        b.doc.getElementsByClassName("announceText")[0].classList.remove("none");
        g.classList.add("on");
        m.classList.add("off");
        c = b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0];
        c.classList.add("on");
        a = function()
        {
          b.g_popup_instance.popupView.close()
        };
        c.addEventListener(b.cgti, a, !1);
        c = b.doc.getElementsByClassName("newsClose")[0];
        c.innerText = "閉じる";
        b.addClass(c, "eventClose");
        b.removeClass(c, "newsClose");
        c.addEventListener(b.cgti, a, !1);
        b.scrollRefresh("scrollTextWrap", "newsField", !0)
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
