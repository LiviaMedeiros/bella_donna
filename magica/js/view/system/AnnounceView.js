define("underscore backbone backboneCommon ajaxControl text!template/user/AnnounceTemp.html text!template/user/AnnounceTempMainte.html command".split(" "), function(k, r, b, l, t, u, p)
{
  var n, h, q;
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
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this, "removeView", this.removeView);
      this.model = JSON.parse(a.announcementJson);
      this.bannerModel = JSON.parse(a.bannerJson);
      this.currentCategory = "NEW";
      if ("Maintenance" !== b.historyArr[b.historyArr.length - 1]) this.readDay = b.storage.gameUser.get("announcementViewAt") ? Date.parse(b.storage.gameUser.get("announcementViewAt")) : -1, this.template = k.template(t), this.currentTime = l.getPageJson().currentTime;
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
      a.targetCampaign && this.openTextCampaign(a.targetCampaign)
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
      console.log("platForm", d);
      this.platForm = d;
      if ("Maintenance" !== b.historyArr[b.historyArr.length - 1])
      {
        for (var f = this.newestList.length, e = 0, g = Date.parse(l.getPageJson().currentTime); e < f;)
        {
          var m = this.newestList[e].startAt.replace(/-/g, "/"),
            p = this.newestList[e].endAt.replace(/-/g, "/");
          g >= Date.parse(m) && Date.parse(m) > this.readDay && Date.parse(p) > g && (0 > c.indexOf(this.newestList[e].category) && (this.newestList[e].displayOs && "ALL" === this.newestList[e].displayOs ? c.push(this.newestList[e].category) : this.newestList[e].displayOs && this.newestList[e].displayOs === d && c.push(this.newestList[e].category)), 3 === c.length && (e = f));
          e++
        }
        0 < c.length && (-1 < c.indexOf("NEW") ? this.currentCategory = "NEW" : -1 < c.indexOf("MNT") ? this.currentCategory = "MNT" : -1 < c.indexOf("UPD") && (this.currentCategory = "UPD"))
      }
      f = {};
      "Maintenance" !== b.location && (e = Date.parse(l.getPageJson().currentTime), g = (new Date(e)).getDay(), f.week = g, g = b.storage.gameUser ? b.storage.gameUser.toJSON() : l.getPageJson().gameUser, g.passportExpiredAt ? (m = Math.floor((Date.parse(g.passportExpiredAt) - e) / 1E3 / 60 / 60 / 24), f.passport = -1 < m ? !1 : !0) : f.passport = !0, f.passport = !1, g.startdashGachaExpiredAt ? (m = Math.floor(Date.parse(g.startdashGachaExpiredAt) - e), f.startDashGacha = 0 < m ? !0 : !1) : f.startDashGacha = !1, g.startdashMemoriaGachaExpiredAt ? (m = Math.floor(Date.parse(g.startdashMemoriaGachaExpiredAt) - e), f.startDashGachaMemoria = 0 < m ? !0 : !1) : f.startDashGachaMemoria = !1, f.startDashCampaign = !1, g.startdashCampaignExpiredAt && (g = new Date(g.startdashCampaignExpiredAt), m = Math.floor(g.getTime() - e), 0 < m && (e = k.findWhere(l.getPageJson().campaignList,
      {
        campaignType: "STARTDASH"
      })))) && (f.startDashCampaign = !0, f.startDashCampaignContent = {}, f.startDashCampaignContent.campaignId = e.id, f.startDashCampaignContent.endDate = g.getMonth() + 1 + "/" + g.getDate() + " " + g.getHours() + ":" + g.getMinutes(), e = k.findWhere(this.model,
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
      n = b.doc.getElementById("popupArea").getElementsByClassName("announceTitle")[0];
      h = b.doc.getElementById("popupArea").getElementsByClassName("newsField")[0];
      q = b.doc.getElementById("announceTab");
      b.addClass(q.getElementsByClassName(this.currentCategory)[0], "current");
      n.classList.add(this.currentCategory);
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
        h.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
        if ("DMM" === this.platForm && h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
        p.getBaseData(b.getNativeObj());
        for (var f = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"),
            e = 0, c = 0; c < f.length; c++) d = new Image, d.onload = function()
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
        h.classList.add("on");
        n.classList.add("off");
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
          h.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
          if ("DMM" === this.platForm && h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
            for (c = h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"),
              d = d + 1 | 0;
          p.getBaseData(b.getNativeObj());
          for (var e = b.doc.getElementById("scrollTextWrap").getElementsByClassName("announceImg"), g = 0, c = 0; c < e.length; c++) d = new Image, d.onload = function()
          {
            g++;
            g >= e.length && b.scrollRefresh("scrollTextWrap", "newsField", !0)
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
          h.classList.add("on");
          n.classList.add("off");
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
        h.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
        if ("DMM" === this.platForm && h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"),
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
        h.classList.add("on");
        n.classList.add("off");
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
        h.getElementsByClassName("newsTextField")[0].innerHTML = c + a.text;
        if ("DMM" === this.platForm && h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"))
          for (var c = h.getElementsByClassName("newsTextField")[0].getElementsByClassName("notDMM"), d = 0; c[d];) b.addClass(c[d], "hide"), d = d + 1 | 0;
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
        h.classList.add("on");
        n.classList.add("off");
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
      b.isScrolled() || (b.doc.getElementsByClassName("announceList")[0].classList.remove("none"), b.doc.getElementsByClassName("announceText")[0].classList.add("none"), h.classList.remove("on"), n.classList.remove("off"), h.getElementsByClassName("newsTextField")[0].innerHTML = "", b.doc.getElementById("popupArea").getElementsByClassName("newsCloseMini")[0].classList.remove("on"), window.isLocal || "Maintenance" === b.historyArr[b.historyArr.length - 1] || b.scrollRefresh("announceBannerArea", "scrollBar"), b.scrollRefresh("newsScrollWarp", "announceTitle"))
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
      b.isScrolled() || this.currentCategory === a.currentTarget.getAttribute("data-category") || (a = a.currentTarget.getAttribute("data-category"), b.removeClass(q.getElementsByClassName(this.currentCategory)[0], "current"), n.classList.remove(this.currentCategory), b.addClass(q.getElementsByClassName(a)[0], "current"), n.classList.add(a), this.currentCategory = a, b.scrollRefresh("newsScrollWarp", "announceTitle", !0))
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
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
