define("underscore backbone backboneCommon ajaxControl command text!template/base/GlobalMenu.html js/view/user/APPopup".split(" "), function(m, n, a, k, y, z, r)
{
  var q = "",
    w = n.View.extend(
    {
      initialize: function()
      {
        this.listenTo(this.model, "change", this.render);
        this.render()
      },
      render: function()
      {
        var b = a.storage.userStatusList,
          c = {},
          d = n.Model.extend();
        c.ACP = b.findWhere(
        {
          statusId: "ACP"
        }).toJSON().point || "0";
        c.MAX_ACP = b.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON().point || "0";
        this.model = new d(c);
        b = this.model.toJSON();
        m.each(b, function(b, c)
        {
          a.doc.querySelector("." + c).textContent = b
        });
        b = a.doc.querySelector(".ACP");
        a.removeClass(b, "limit");
        a.removeClass(b, "over");
        c.ACP >= 3 * c.MAX_ACP ? a.addClass(b, "limit") : c.ACP > c.MAX_ACP && a.addClass(b, "over")
      },
      removeView: function()
      {
        this.model.clear();
        delete this.model;
        this.off();
        this.remove()
      }
    }),
    u, D = n.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #menu"] = this.menuToggle;
        b[a.cgti + " #ap"] = this.apPopup;
        b[a.cgti + " #money"] = this.moneyPopup;
        b[a.cgti + " .backLinkBtn"] = this.backLinkHandler;
        b[a.cgti + " .helpBtn"] = this.helpPop;
        b[a.cgti + " .globalBattleBtn"] = this.globalBattleBtn;
        b[a.cgti + " .globalRegularEventBtn"] = this.globalRegularEventBtn;
        b[a.cgti + " .linkBtn.btnOverlay"] = this.locationCheck;
        return b
      },
      initialize: function(b)
      {
        this.listenTo(this, "removeView", this.removeView);
        this.listenTo(this, "firstPopup", this.firstPopup);
        this.listenTo(this, "optionSet", this.optionSet);
        this.campaignBadgeView = null;
        this.template = m.template(z);
        this.createDom(b)
      },
      render: function()
      {
        this.$el.html(this.template(a.storage))
      },
      createDom: function(b)
      {
        this.render();
        a.setTitleCollectionObserved();
        this.listenTo(a.storage.userItemList, "change", this.itemChangeHandler);
        this.listenTo(a.storage.userStatusList, "change", this.statusDisplay);
        this.listenTo(a.storage.userDailyChallengeList, "change", this.missionBadgeCnt);
        this.listenTo(a.storage.userTotalChallengeList, "change", this.missionBadgeCnt);
        this.listenTo(a.storage.userLimitedChallengeList, "change", this.missionBadgeCnt);
        var c = this.helpArraySet(a.location);
        b && b.hideHelp || "noneActive" === c.setType || (a.addClass(this.el.getElementsByClassName("helpBtn")[0], "on"), this.el.getElementsByClassName("helpBtn")[0].dataset.type = c.setType.toString(), this.el.getElementsByClassName("helpBtn")[0].dataset.title = c.popTitle);
        a.doc.getElementById("globalMenuContainer").appendChild(this.el);
        this.statusDisplay();
        this.itemChangeHandler();
        this.missionBadgeCnt();
        this.pagePerHandler(b);
        this.userRankHandler();
        c = k.getPageJson();
        b = Date.parse(c.currentTime);
        var d = c.regularEventList ? c.regularEventList[0] : null;
        if (d)
        {
          switch (d.regularEventType)
          {
            case "GROUPBATTLE":
              c = "groupBattle";
              d = Date.parse(d.regularEventGroupBattle.preliminaryRoundStartAt);
              c = b > d ? c + " open" : c + " close";
              break;
            default:
              c = d.regularEventType.toLowerCase()
          }
          a.doc.getElementsByClassName("globalRegularEventBtn")[0].className = "globalRegularEventBtn globalBigBtn " + c
        }
        c = Date.parse("2022/04/01 00:00:00");
        d = Date.parse("2022/04/01 23:59:59");
        this.isAprilSumoOpen = b >= c && b <= d;
        b = a.doc.getElementsByClassName("globalBattleBtn")[0];
        this.isAprilSumoOpen && !b.classList.contains("limited") && a.addClass(b, "campaignSumo");
        a.thisPlatform || a.setPlatForm(k.getPageJson());
        a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
        a.storage.userStatusList && (a.storage.userStatusList.findWhere(
        {
          statusId: "ACP"
        }).toJSON().point >= a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON().point || this.autoCureSet())
      },
      userRankHandler: function()
      {
        for (var b = a.storage.gameUser.toJSON(), c = a.doc.createDocumentFragment(), d = (b.level + "").split(""), e = 0, h = d.length; e < h; e++)
        {
          var l = a.doc.createElement("img");
          l.src = resDir + "/magica/resource/image_web/common/number/" + d[e] + ".png";
          c.appendChild(l)
        }
        a.doc.getElementById("exp").getElementsByClassName("userRank")[0].appendChild(c);
        c = b.totalExpForNextLevel;
        d = b.totalExpForCurrentLevel || 0;
        b = b.exp;
        e = c - b;
        a.doc.getElementById("exp").getElementsByClassName("pointWrap")[0].textContent = "あと" + e;
        b = Math.round((b - d) / (c - d) * 100) + "%";
        a.doc.getElementById("exp").getElementsByClassName("gaugeInner")[0].style.width = b
      },
      autoCureSet: function(b)
      {
        if (a.storage.userStatusList && a.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }) && a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }) && k.getPageJson().currentTime)
        {
          var c = a.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON();
          this.currentTime = b ? b : Date.parse(k.getPageJson().currentTime) / 1E3;
          var d = Date.parse(c.checkedAt) / 1E3 + 60 * c.checkPeriod,
            e = d - this.currentTime,
            h = this;
          if (-1 > e)
          {
            b = 0;
            for (var l = a.storage.userStatusList.findWhere(
              {
                statusId: "ACP"
              }).toJSON(), f = a.storage.userStatusList.findWhere(
              {
                statusId: "MAX_ACP"
              }).toJSON().point; 0 > e && b + c.point < f;) b++, d += 60 * l.checkPeriod, e = d - h.currentTime;
            var g = new Date(1E3 * (d - 60 * c.checkPeriod)),
              e = g.getFullYear(),
              l = 10 > g.getMonth() ? "0" + (g.getMonth() + 1) : g.getMonth() + 1,
              f = 10 > g.getDate() ? "0" + g.getDate() : g.getDate(),
              A = 10 > g.getHours() ? "0" + g.getHours() : g.getHours(),
              m = 10 > g.getMinutes() ? "0" + g.getMinutes() : g.getMinutes(),
              g = 10 > g.getSeconds() ? "0" + g.getSeconds() : g.getSeconds(),
              l = e + "/" + l + "/" + f + " " + A + ":" + m + ":" + g,
              e = a.storage.userStatusList.findWhere(
              {
                statusId: "ACP"
              }).toJSON();
            e.checkedAt = l;
            e.point = b + c.point;
            c = a.storage.userStatusList.findWhere(
            {
              statusId: "ACP"
            });
            c.clear(
            {
              silent: !0
            });
            c.set(e);
            c = a.storage.userStatusList.findWhere(
            {
              statusId: "ACP"
            }).toJSON()
          }
          c.point >= a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON().point || (a.cureSpTimeCount = 0, a.cureSpTimeCountStartAt = Date.parse(new Date), a.acpTimeCure = setInterval(function()
          {
            if (a.storage.userStatusList)
            {
              if (a.cureSpTimeCount = Math.floor((Date.parse(new Date) - a.cureSpTimeCountStartAt) / 1E3) | 0, a.storage.userStatusList.findWhere(
                {
                  statusId: "ACP"
                }) && a.storage.userStatusList.findWhere(
                {
                  statusId: "MAX_ACP"
                }))
              {
                var b = a.storage.userStatusList.findWhere(
                  {
                    statusId: "ACP"
                  }).toJSON(),
                  c = a.storage.userStatusList.findWhere(
                  {
                    statusId: "MAX_ACP"
                  }).toJSON();
                if (b.point < c.point)
                {
                  if (a.doc.getElementById("apPointWrap"))
                  {
                    var e = d - h.currentTime - a.cureSpTimeCount,
                      g = e + 300 * (c.point - b.point - 1),
                      c = e / 60 | 0,
                      e = e - 60 * c | 0,
                      l = g / 60 / 60 | 0,
                      k = g / 60 - 60 * l | 0,
                      g = g - 60 * k - 3600 * l | 0;
                    a.doc.getElementById("apFullTime").textContent = c + ":" + ("0" + e).slice(-2);
                    a.doc.getElementById("apFullTime2").textContent = 0 < l ? l + ":" + ("0" + k).slice(-2) + ":" + ("0" + g).slice(-2) : k + ":" + ("0" + g).slice(-2)
                  }
                  if (!(h.currentTime + a.cureSpTimeCount < d))
                  {
                    h.currentTime = d;
                    d += 60 * b.checkPeriod;
                    a.cureSpTimeCountStartAt = Date.parse(new Date);
                    var f = new Date(1E3 * h.currentTime),
                      c = f.getFullYear(),
                      g = 10 > f.getMonth() ? "0" + (f.getMonth() + 1) : f.getMonth() + 1,
                      e = 10 > f.getDate() ? "0" + f.getDate() : f.getDate(),
                      l = 10 > f.getHours() ? "0" + f.getHours() : f.getHours(),
                      k = 10 > f.getMinutes() ? "0" + f.getMinutes() : f.getMinutes(),
                      f = 10 > f.getSeconds() ? "0" + f.getSeconds() : f.getSeconds(),
                      g = c + "/" + g + "/" + e + " " + l + ":" + k + ":" + f,
                      c = a.storage.userStatusList.findWhere(
                      {
                        statusId: "ACP"
                      }).toJSON();
                    c.checkedAt = g;
                    c.point = b.point + b.periodicPoint;
                    b = a.storage.userStatusList.findWhere(
                    {
                      statusId: "ACP"
                    });
                    b.clear(
                    {
                      silent: !0
                    });
                    b.set(c)
                  }
                }
                else clearInterval(a.acpTimeCure), a.doc.getElementById("apPointWrap") && r.apCureEvents(), a.cureSpTimeCount = 0, d = h.currentTime = null
              }
            }
            else clearInterval(a.acpTimeCure), a.doc.getElementById("apPointWrap") && r.apCureEvents(), a.cureSpTimeCount = 0, d = h.currentTime = null
          }, 1E3))
        }
      },
      statusDisplay: function()
      {
        this.userStatusView ? this.userStatusView.render() : (w.prototype.parentView = this, this.userStatusView = new w(
        {
          el: a.doc.getElementById("status")
        }));
        a.doc.getElementById("apPointWrap") && r.apCureEvents()
      },
      itemChangeHandler: function()
      {
        var b = a.storage.userItemList,
          c = b.findWhere(
          {
            itemId: "PRESENTED_MONEY"
          }) ? b.findWhere(
          {
            itemId: "PRESENTED_MONEY"
          }).toJSON().quantity : 0,
          b = b.findWhere(
          {
            itemId: "MONEY"
          }) ? b.findWhere(
          {
            itemId: "MONEY"
          }).toJSON().quantity : 0,
          d = a.doc.querySelector("#money .pointWrap");
        (d.textContent | 0) !== c + b && (d.textContent = c + b);
        a.storage.userItemList && k.getPageJson().currentTime && (c = k.getPageJson(), B(
        {
          pageJson: c
        }))
      },
      missionBadgeCnt: function()
      {
        if (a.storage.userDailyChallengeList && a.storage.userTotalChallengeList && !this.onceTimeFlg)
        {
          this.onceTimeFlg = !0;
          var b = 0,
            c = k.getPageJson().currentTime ? k.getPageJson().currentTime.substr(0, 10) : null;
          a.storage.userDailyChallengeList.each(function(a, d)
          {
            d = a.toJSON();
            var e = !1;
            d.limitAt ? d.limitAt !== c && (e = !0) : a.set(
            {
              limitAt: c
            });
            e || d.receivedAt && d.receivedAt.substr(0, 10) === c || d.clearedCount >= d.challenge.count && b++
          });
          a.storage.userTotalChallengeList.each(function(a, c)
          {
            a = a.toJSON();
            a.receivedAt || a.clearedCount >= a.challenge.count && b++
          });
          var d = Date.parse(k.getPageJson().currentTime);
          k.getPageJson().currentTime && (a.storage.userLimitedChallengeList.each(function(a, c)
          {
            c = a.toJSON();
            if ("PANEL" !== c.viewType && "SUMMER" !== c.viewType)
            {
              var e = !1;
              c.limitAt ? c.limitAt < d && (e = !0) : a.set(
              {
                limitAt: Date.parse(c.endAt)
              });
              e || c.receivedAt || c.clearedCount >= c.challenge.count && b++
            }
          }), 0 < b ? (a.addClass(a.doc.getElementById("missionBadge"), "on"), a.doc.getElementById("missionBadge").textContent = b) : a.removeClass(a.doc.getElementById("missionBadge"), "on"), this.onceTimeFlg = !1)
        }
      },
      pagePerHandler: function(b)
      {
        var c = 0;
        m.each(b, function()
        {
          c++
        });
        0 < c ? (b.hideMenu && a.addClass(a.doc.getElementById("menu"), "noneDisp"), b.hideBackLink && a.addClass(a.doc.getElementsByClassName("backLinkBtn")[0], "noneDisp"), b.hideStatus && a.addClass(a.doc.getElementById("status"), "noneDisp")) : ("MyPage" !== a.location ? (a.addClass(a.doc.getElementById("rank"), "noneDisp"), a.addClass(a.doc.getElementById("etcMenu"), "noneDisp")) : (a.addClass(a.doc.getElementById("sideMenuBg"), "noneDisp"), a.addClass(a.doc.getElementsByClassName("homeBtn")[0], "noneDisp"), a.addClass(a.doc.getElementsByClassName("backLinkBtn")[0], "noneDisp")), "DeckFormation" != a.location && "EventAccomplishDeck" != a.location || a.addClass(a.doc.getElementById("status"), "noneDisp"), "MemoriaEquip" != a.location && "MemoriaSetEquip" != a.location || a.addClass(a.doc.getElementById("menu"), "noneDisp"))
      },
      menuToggle: function(b)
      {
        a.isScrolled() || (b.preventDefault(), a.isDoubleTouch() || ("DeckFormation" == a.location && a.holdDeck || "EventAccomplishDeck" == a.location && a.holdDeck ? a.pageObj.deckChangeConf() : (b = a.doc.getElementById("sideMenu"), b.classList.contains("anim") ? (a.addClass(b, "close"), a.removeClass(b, "anim"), a.addClass(a.doc.getElementById("sideMenuBg"), "close"), a.removeClass(a.doc.getElementById("sideMenuBg"), "anim"), "MyPage" === a.location && (a.removeClass(a.doc.getElementById("status"), "myPageShow"), a.addClass(a.doc.getElementById("status"), "myPageHide"), a.doc.getElementById("mypageBanner") && a.addClass(a.doc.getElementById("mypageBanner"), "hide"), a.pageObj.menuHide())) : (a.addClass(b, "anim"), a.removeClass(b, "close"), a.addClass(a.doc.getElementById("sideMenuBg"), "anim"), a.removeClass(a.doc.getElementById("sideMenuBg"), "close"), "MyPage" === a.location && (a.removeClass(a.doc.getElementById("status"), "myPageHide"), a.addClass(a.doc.getElementById("status"), "myPageShow"), a.doc.getElementById("mypageBanner") && a.removeClass(a.doc.getElementById("mypageBanner"), "hide"), a.pageObj.menuShow())))))
      },
      backLinkHandler: function(b)
      {
        b.preventDefault();
        b.stopPropagation();
        a.isScrolled() || a.isDoubleTouch() || (y.startSe(1003), "true" === b.currentTarget.getAttribute("data-noLink") ? b.currentTarget.setAttribute("data-noLink", "") : a.backLinkHandler())
      },
      apPopup: function(b, c, d)
      {
        if (b && (b.preventDefault(), a.isScrolled() || a.isDoubleTouch())) return;
        r.instantPopup(c, d)
      },
      moneyPopup: function(b)
      {
        b && b.preventDefault();
        if (!a.isScrolled() && !a.isDoubleTouch())
        {
          a.tapBlock(!0);
          u && u.removeView();
          var c = this;
          require(["js/view/purchase/PurchasePopup"], function(b)
          {
            var d = function(d)
            {
              a.tapBlock(!1);
              b.prototype.parentView || (b.prototype.parentView = c);
              u = new b(d)
            };
            window.isLocal ? require(["text!/magica/json/money/shop/list.json"], function(b)
            {
              d(b)
            }) : k.ajaxSimpleGet(a.linkList.moneyShopList, "", d)
          })
        }
      },
      helpPop: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.setHelpPopup(b.currentTarget.dataset.type, b.currentTarget.dataset.title)
      },
      helpArraySet: function(b)
      {
        var a = {};
        switch (b)
        {
          case "CharaListTop":
            a.popTitle = "魔法少女について";
            a.setType = ["03", "14_02"];
            break;
          case "CharaListCompose":
          case "CharaListCustomize":
          case "CharaListComposeMagia":
          case "CharaListEquip":
            a.popTitle = "魔法少女強化について";
            a.setType = ["04", "14_03"];
            break;
          case "CharaEnhancementTree":
            a.popTitle = "精神強化について";
            a.setType = ["04_08", "03_13", "14_11"];
            break;
          case "CharaListComposeAttribute":
            a.popTitle = "属性強化について";
            a.setType = ["04_08", "04_10", "14_12"];
            break;
          case "MemoriaTop":
          case "MemoriaList":
          case "MemoriaCompose":
            a.popTitle = "メモリアについて";
            a.setType = ["05", "14_04"];
            break;
          case "GachaTop":
            a.popTitle = "ガチャについて";
            a.setType = ["11", "14_01"];
            break;
          case "MissionTop":
            a.popTitle = "ミッションについて";
            a.setType = ["12"];
            break;
          case "ShopTop":
            a.popTitle = "ショップについて";
            a.setType = ["13"];
            break;
          case "MainQuest":
            a.popTitle = "クエストについて";
            a.setType = ["06", "07"];
            break;
          case "CharaQuest":
            a.popTitle = "クエストについて";
            a.setType = ["06", "07", "14_09", "14_10"];
            break;
          case "SubQuest":
            a.popTitle = "クエストについて";
            a.setType = ["06", "07", "14_08"];
            break;
          case "FormationTop":
          case "DeckFormation":
            a.popTitle = "チームについて";
            a.setType = ["08", "14_06", "14_07"];
            break;
          case "ArenaTop":
          case "ArenaFreeRank":
          case "ArenaRanking":
          case "ArenaReward":
          case "ArenaHistory":
          case "ArenaSimulate":
            a.popTitle = "ミラーズについて";
            a.setType = ["10", "14_05"];
            break;
          case "PresentList":
          case "PresentHistory":
            a.popTitle = "プレゼントについて";
            a.setType = ["15_01", "15_02"];
            break;
          case "ItemListTop":
            a.popTitle = "アイテムについて";
            a.setType = ["04_07"];
            break;
          case "FollowTop":
            a.popTitle = "フォローについて";
            a.setType = ["09"];
            break;
          case "MemoriaSetList":
            a.popTitle = "メモリアセットについて";
            a.setType = ["05_04"];
            break;
          case "StoryCollection":
            a.popTitle = "ストーリーアーカイブについて";
            a.setType = ["06_06", "06_07"];
            break;
          case "PatrolTop":
            a.popTitle = "パトロールについて";
            a.setType = ["19"];
            break;
          default:
            a.setType = "noneActive"
        }
        return a
      },
      getUserStatus: function()
      {
        return this.userStatusView.model.toJSON()
      },
      optionSet: function(a)
      {
        this.createDom(a)
      },
      globalBattleBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("limited") || (location.href = this.isAprilSumoOpen ? "#/CampaignSumoTop" : "#/ArenaTop")
      },
      globalRegularEventBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = k.getPageJson();
          if (c)
            if (b = Date.parse(c.currentTime), c = c.regularEventList ? c.regularEventList[0] : null) switch (c.regularEventType)
            {
              case "GROUPBATTLE":
                var d = Date.parse(c.regularEventGroupBattle.preliminaryRoundStartAt),
                  e = Date.parse(c.regularEventGroupBattle.preliminaryRoundEndAt),
                  h = Date.parse(c.regularEventGroupBattle.finalRoundStartAt),
                  l = Date.parse(c.regularEventGroupBattle.finalRoundEndAt),
                  f = Date.parse(c.regularEventGroupBattle.finalRoundSummarizedAt);
                b < f && b > l ? new a.PopupClass(
                {
                  title: "キモチ戦",
                  content: "ただいま集計中です。<br>最終結果は" + a.getTimeText(f) + "から確認いただけます。",
                  popupType: "typeA",
                  popupId: "groupBattlePopup",
                  closeBtnText: "OK"
                }) : b < h && b > e ? new a.PopupClass(
                {
                  title: "キモチ戦",
                  content: "ただいま集計中です。<br>後半戦は" + a.getTimeText(h) + "から開始いたします。",
                  popupType: "typeA",
                  popupId: "groupBattlePopup",
                  closeBtnText: "OK"
                }) : b < d ? a.announceOpen(c.regularEventId) : location.href = "#/RegularEventGroupBattleTop";
                break;
              case "EXTERMINATION":
                location.href = "#/RegularEventExterminationTop";
                break;
              case "ACCOMPLISH":
                location.href = "#/RegularEventAccomplishTop"
            }
          else location.href = "#/EventRecord"
        }
      },
      locationCheck: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.dataset.href === "#/" + a.location && this.menuToggle(b)
      },
      awakeSuspend: function(a)
      {
        var b = this,
          d = function(a)
          {
            a = window.isLocal ? JSON.parse(a) : a;
            b.suspendRefresh(a.currentTime)
          };
        a = "/magica/api/page/ResumeBackground?timeStamp=" + (new Date).getTime();
        window.isLocal ? require(["text!/magica/json/page/ResumeBackground.json"], function(a)
        {
          d(a)
        }) : k.ajaxSimpleGet(a, "", d)
      },
      suspendRefresh: function(b)
      {
        var c = Date.parse(b) / 1E3;
        a.acpTimeCure && clearInterval(a.acpTimeCure);
        this.autoCureSet(c);
        switch (a.location)
        {
          case "EventRaidTop":
          case "ArenaTop":
          case "ArenaFreeRank":
          case "ArenaRanking":
            a.pageObj.awakeSuspend(c);
            break;
          case "PatrolTop":
          case "EventAprilFoolTop":
            a.pageObj.awakeSuspend(b)
        }
        "PatrolTop" != a.location && k.getPageJson().userPatrolList && "" != q && (clearInterval(q), this.addPatrolBadge(b))
      },
      addCampaignBanner: function()
      {
        var b = k.getPageJson();
        b && (this.removeCampaignBanner(), b.campaignList && (b = a.campaignParse(b.campaignList), b.BOX_GACHA && (this.campaignBannerView = new C(
        {
          cpData: b
        }), this.el.querySelector("#sideBigBtns").appendChild(this.campaignBannerView.render().el))))
      },
      addCampaignBadge: function()
      {
        var b = k.getPageJson();
        if (b)
        {
          var c = {
            expp: !1,
            yell: !1,
            expc: !1,
            cc: !1,
            ep: !1,
            freeAtNotClear: !1,
            arena: !1,
            dropUp: !1
          };
          this.removeCampaignBadge();
          if (b.campaignList)
          {
            b = a.campaignParse(b.campaignList);
            b.POINT_UP && b.POINT_UP.globalBadge && (b.POINT_UP.EXPP && (c.expp = !0), b.POINT_UP.YELL && (c.yell = !0));
            b.HALF_AP && (c.halfAp = b.HALF_AP.bgImgPath);
            b.ARENA_REWARD_UP && (c.arena = b.ARENA_REWARD_UP.magnification);
            b.QUEST_DROP_FACTOR && (c.dropUp = b.QUEST_DROP_FACTOR.bgImgPath);
            var d;
            if (c.expp || c.yell || c.expc || c.cc || c.ep || c.halfAp || c.freeAtNotClear || c.dropUp) d = n.Model.extend(
            {}), t.prototype.template = m.template(this.el.querySelector("#CampaignBadgeTemp").textContent), b = a.doc.createDocumentFragment(), this.campaignBadgeView = new t(
            {
              model: new d(c)
            }), b.appendChild(this.campaignBadgeView.render().el), this.el.querySelector("#sideBigBtns").appendChild(b);
            a.storage.gameUser.toJSON().closeFunctions && -1 < a.storage.gameUser.toJSON().closeFunctions.indexOf("ARENA") || !c.arena || (d = n.Model.extend(
            {}), t.prototype.template = m.template(this.el.querySelector("#ArenaCampaignBadgeTemp").textContent), b = a.doc.createDocumentFragment(), this.arenaCampaignBadgeView = new t(
            {
              model: new d(c)
            }, !0), b.appendChild(this.arenaCampaignBadgeView.render().el), this.el.querySelector("#sideBigBtns").appendChild(b))
          }
        }
      },
      getBadgeText: function(a)
      {
        var b = k.getPageJson();
        if (!b) return "";
        if (k.getPageJson().currentTime)
        {
          var b = b.currentTime.split(" ")[0],
            d = a.split(" ")[0];
          a = a.split(" ")[1];
          return b == d ? a.split(":")[0] + ":" + a.split(":")[1] + "まで" : Number(d.split("/")[1]) + "/" + Number(d.split("/")[2]) + "まで"
        }
      },
      addEventBadge: function()
      {
        var b = k.getPageJson();
        if (b && (this.removeEventBadge(), b.eventList))
        {
          var c = a.storage.gameUser.toJSON().closeFunctions.split(","),
            d = null,
            d = b.eventList.filter(function(a, b)
            {
              if ("TOWER" == a.eventType || "DAILYTOWER" == a.eventType || "BRANCH" == a.eventType || "ARENAMISSION" == a.eventType || "SINGLERAID" == a.eventType || "STORYRAID" == a.eventType || "TRAINING" == a.eventType || "ACCOMPLISH" == a.eventType || "DUNGEON" == a.eventType || "RAID" == a.eventType || "PUELLA_RAID" == a.eventType || "ARENARANKING" == a.eventType && -1 === c.indexOf("ARENA")) return !0
            });
          b.regularEventList && (b = b.regularEventList.filter(function(a, b)
          {
            if ("ARENARANKMATCH" == a.regularEventType && -1 === c.indexOf("ARENA")) return !0
          }), d = d.concat(b));
          if (d)
          {
            b = n.Model.extend(
            {});
            p.prototype.template = m.template(this.el.querySelector("#EventBadgeTemp").textContent);
            p.prototype.rootView = this;
            var e = a.doc.createDocumentFragment();
            this.eventBadgeView = [];
            for (var h = 0, l = d.length; h < l;)
            {
              d[h].endAtText = this.getBadgeText(d[h].endAt);
              var f = new p(
              {
                model: new b(d[h])
              });
              e.appendChild(f.render().el);
              this.eventBadgeView.push(f);
              h = h + 1 | 0
            }
            this.el.querySelector("#sideBigBtns").appendChild(e)
          }
        }
      },
      addRegularEventBadge: function()
      {
        var b = k.getPageJson();
        if (b)
        {
          this.removeRegularEventBadge();
          var c, d = Date.parse(b.currentTime);
          if (k.getPageJson().currentTime && (c = a.doc.getElementsByClassName("globalRegularEventBtn")[0], !c.classList.contains("arenarankmatch")))
          {
            if (c.classList.contains("groupBattle"))
            {
              if (c = m.findWhere(b.regularEventList,
                {
                  regularEventType: "GROUPBATTLE"
                }))
              {
                p.prototype.template = m.template(this.el.querySelector("#EventBadgeTemp").textContent);
                p.prototype.rootView = this;
                var e = Date.parse(c.regularEventGroupBattle.preliminaryRoundStartAt),
                  h = Date.parse(c.regularEventGroupBattle.preliminaryRoundEndAt),
                  l = Date.parse(c.regularEventGroupBattle.finalRoundStartAt),
                  f = Date.parse(c.regularEventGroupBattle.finalRoundEndAt),
                  g = Date.parse(c.regularEventGroupBattle.finalRoundSummarizedAt);
                d < g && d > f || d < l && d > h ? c.endAtText = "集計中" : d < e ? (b = c.regularEventGroupBattle.preliminaryRoundStartAt.split(" ")[0], c.endAtText = Number(b.split("/")[1]) + "/" + Number(b.split("/")[2]) + "開催予定") : d < f ? (b = b.currentTime.split(" ")[0], d = c.regularEventGroupBattle.finalRoundEndAt.split(" ")[0], e = c.regularEventGroupBattle.finalRoundEndAt.split(" ")[1], c.endAtText = "", c.endAtText = b == d ? e.split(":")[0] + ":" + e.split(":")[1] + "まで" : Number(d.split("/")[1]) + "/" + Number(d.split("/")[2]) + "まで") : d > g && (c.endAtText = "結果発表中")
              }
            }
            else if (c = b.regularEventList ? b.regularEventList[0] : null) c.endAtText = this.getBadgeText(c.endAt);
            c && (b = n.Model.extend(
            {}), d = a.doc.createDocumentFragment(), this.regularEventBadgeView = new p(
            {
              model: new b(c)
            }), d.appendChild(this.regularEventBadgeView.render().el), this.el.querySelector("#sideBigBtns").appendChild(d))
          }
        }
      },
      addPatrolBadge: function(b)
      {
        var c = k.getPageJson();
        if (c && k.getPageJson().currentTime)
        {
          this.removePatrolBadge();
          var d = {};
          b = b ? b : c.currentTime;
          var e = [];
          c.userPatrolList && m.each(c.userPatrolList, function(a)
          {
            if (a.userPatrolResult && "EXPEDITION" == a.userPatrolResult.status && a.patrolArea)
            {
              var b = a.patrolArea.duration,
                b = 1E3 * (3600 * (b.substr(0, 2) - 0) + 60 * (b.substr(2, 2) - 0) + (b.substr(4, 2) - 0));
              e.push(b + Date.parse(a.userPatrolResult.startedAt))
            }
          });
          c = function(a, b)
          {
            return Math.min(a, b)
          };
          if (0 != e.length && "PatrolTop" != a.location)
          {
            p.prototype.template = m.template(this.el.querySelector("#EventBadgeTemp").textContent);
            p.prototype.rootView = this;
            c = e.reduce(c);
            d.patrol = !0;
            d.time = c;
            var c = n.Model.extend(
              {}),
              h = a.doc.createDocumentFragment();
            this.patrolBadgeView = new p(
            {
              model: new c(d)
            });
            h.appendChild(this.patrolBadgeView.render().el);
            this.el.querySelector("#sideBigBtns").appendChild(h);
            this.patrolBadgeView.el.dataset.href = "#/PatrolTop";
            var l = new Date(this.patrolBadgeView.model.attributes.time),
              f = this.patrolBadgeView.el.getElementsByClassName("endAtText")[0],
              g = new Date(b) - 0 + 1E3,
              d = this.countdownTimer(l, g);
            0 > d.ms ? f.innerText = "帰還しました" : (f.innerText = "完了まで" + d.h + ":" + d.m + ":" + d.s, q = setInterval(function()
            {
              g = g - 0 + 1E3;
              var a = this.countdownTimer(l, g);
              0 > a.ms ? (f.innerText = "帰還しました", clearInterval(q)) : f.innerText = "完了まで" + a.h + ":" + a.m + ":" + a.s
            }.bind(this), 1E3))
          }
        }
      },
      countdownTimer: function(a, c)
      {
        a = a.getTime() - c;
        c = Math.floor(a / 1E3 / 60 / 60 / 24);
        var b = Math.floor(a / 1E3 / 60 / 60);
        10 > b && (b = "0" + b);
        var e = Math.floor(a / 1E3 / 60) % 60;
        10 > e && (e = "0" + e);
        var h = Math.floor(a / 1E3) % 60;
        10 > h && (h = "0" + h);
        return {
          ms: a,
          d: c,
          h: b,
          m: e,
          s: h
        }
      },
      removeCampaignBanner: function()
      {
        this.campaignBannerView && (this.campaignBannerView.removeView(), this.campaignBannerView = null)
      },
      removeCampaignBadge: function()
      {
        this.campaignBadgeView && (this.campaignBadgeView.removeView(), this.campaignBadgeView = null)
      },
      removeEventBadge: function()
      {
        if (this.eventBadgeView)
        {
          for (var a = 0, c = this.eventBadgeView.length; a < c;) this.eventBadgeView[a].removeView(), a = a + 1 | 0;
          this.eventBadgeView = null
        }
      },
      removeRegularEventBadge: function()
      {
        this.regularEventBadgeView && (this.regularEventBadgeView.removeView(), this.regularEventBadgeView = null)
      },
      removePatrolBadge: function()
      {
        this.patrolBadgeView && (this.patrolBadgeView.removeView(), this.patrolBadgeView = null, "" != q && clearInterval(q))
      },
      removeView: function()
      {
        a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
        this.bannerView && this.bannerView.removeView();
        this.userStatusView && this.userStatusView.removeView();
        this.eventBadgeView && this.removeEventBadge();
        this.campaignBadgeView && this.campaignBadgeView.removeView();
        this.regularEventBadgeView && this.removeRegularEventBadge();
        this.patrolBadgeView && this.removePatrolBadge();
        a.globalMenuView = null;
        this.off();
        this.remove()
      }
    }),
    C = n.View.extend(
    {
      tagName: "li",
      className: "campaignBanner TE se_decide linkBtn",
      attributes:
      {
        "data-href": "#/CampaignBoxGachaTop"
      },
      initialize: function(a)
      {
        this.template = "<img src='" + a.cpData.BOX_GACHA.bannerImgPath + "' />"
      },
      render: function()
      {
        this.$el.html(this.template);
        return this
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    t = n.View.extend(
    {
      tagName: "li",
      className: "campaignBadgeWrap",
      events: function()
      {
        var a = {};
        a["webkitAnimationEnd .campaignBadge"] = this.animationTrigger;
        return a
      },
      initialize: function(a, c)
      {
        c && (this.arenaBadge = !0);
        this.cnt = 0
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.domCnt = this.el.querySelectorAll(".campaignBadge").length;
        1 == this.domCnt ? a.addClass(this.el.querySelectorAll(".campaignBadge")[0], "only") : a.addClass(this.el.querySelectorAll(".campaignBadge")[0], "off");
        this.arenaBadge && a.addClass(this.el, "ARENA");
        return this
      },
      animationTrigger: function(b)
      {
        b.currentTarget.classList.contains("off") ? (a.removeClass(b.currentTarget, "off"), this.cnt = this.cnt + 1 >= this.domCnt ? 0 : this.cnt + 1, a.addClass(this.el.querySelectorAll(".campaignBadge")[this.cnt], "on")) : (a.addClass(b.currentTarget, "off"), a.removeClass(b.currentTarget, "on"))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    v = {
      TOWER: "#/EventTowerTop",
      DAILYTOWER: "#/EventDailyTowerTop",
      BRANCH: "#/EventBranchTop",
      ARENAMISSION: "#/EventArenaMissionTop",
      ARENARANKING: "#/ArenaTop",
      SINGLERAID: "#/EventSingleRaidTop",
      STORYRAID: "#/EventStoryRaidTop",
      TRAINING: "#/EventTrainingTop",
      DUNGEON: "#/EventDungeonTop",
      RAID: "#/EventRaidTop",
      GROUPBATTLE: "#/RegularEventGroupBattleTop",
      EXTERMINATION: "#/RegularEventExterminationTop",
      ACCOMPLISH: "#/RegularEventAccomplishTop",
      ARENARANKMATCH: "#/ArenaTop",
      PUELLA_RAID: "#/PuellaHistoriaRouter"
    },
    x = {
      TOWER: "tower",
      DAILYTOWER: "dailytower",
      BRANCH: "branch",
      ARENAMISSION: "arenaMission",
      ARENARANKING: "arenaranking",
      SINGLERAID: "singleraid",
      STORYRAID: "storyraid",
      TRAINING: "training",
      DUNGEON: "dungeon",
      RAID: "raid",
      GROUPBATTLE: "groupBattle",
      EXTERMINATION: "extermination",
      ACCOMPLISH: "accomplish",
      PUELLA_RAID: "puellaRaid"
    },
    p = n.View.extend(
    {
      tagName: "li",
      events: function()
      {
        var b = {};
        b[a.cgti] = this.locationCheck;
        return b
      },
      className: function()
      {
        var a = "eventBadgeWrap TE se_decide",
          c;
        this.model.get("eventType") ? (c = this.model.get("eventType"), a += " linkBtn " + c.toLowerCase()) : this.model.get("regularEventType") ? (c = this.model.get("regularEventType"), v[c] && (a += " linkBtn"), a = "ARENARANKMATCH" == c ? a + (" " + c.toLowerCase()) : a + " regularevent") : a += " linkBtn patrol";
        return a
      },
      initialize: function(a)
      {
        if (this.model.get("eventType")) switch (this.eventType = this.model.get("eventType"), x[this.eventType])
        {
          case "puellaRaid":
            a = "/magica/resource/image_web/page/quest/puellaHistoria_lastBattle/event/" + this.model.toJSON().eventId + "/event_pop.png";
            break;
          case "arenaranking":
            a = "/magica/resource/image_web/event/arenaranking/common/event_pop.png";
            break;
          case "training":
            a = "/magica/resource/image_web/event/training/common/event_pop_a.png";
            break;
          default:
            a = "/magica/resource/image_web/event/" + x[this.model.get("eventType")] + "/" + this.model.toJSON().eventId + "/event_pop.png"
        }
        else this.model.get("regularEventType") ? (this.eventType = this.model.get("regularEventType"), a = "/magica/resource/image_web/common/global/event_pop.png", "ARENARANKMATCH" == this.eventType && (a = "/magica/resource/image_web/event/arenaRankMatch/common/event_pop.png")) : a = "/magica/resource/image_web/regularEvent/groupBattle/common2/event_pop.png";
        this.model.set(
        {
          imagePath: a
        })
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.eventType && (this.eventType.toLowerCase().charAt(0).toUpperCase(), this.eventType.toLowerCase().slice(1).toLowerCase());
        v[this.eventType] && (this.el.dataset.href = v[this.eventType]);
        return this
      },
      locationCheck: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.dataset.href === "#/" + a.location && this.rootView.menuToggle(b)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    B = function(b)
    {
      var c = b.pageJson;
      b = [];
      c.campaignList && (b = c.campaignList);
      b.sort(function(a, b)
      {
        return b.id - a.id
      });
      var d = !1;
      m.each(b, function(b, h, k)
      {
        "FREE_GACHA" == b.campaignType && b.imagePath && b.parameterMap && b.parameterMap.GACHAKINDID && !d && (h = E(
        {
          gachaKindId: b.parameterMap.GACHAKINDID,
          pageJson: c
        }), 0 < h && (b = b.imagePath, h = a.doc.getElementById("gachaBadge"), a.addClass(h, "freeRareGacha"), h.style.backgroundImage = "url('" + b + "')", d = !0))
      });
      d || F(
      {
        pageJson: c
      })
    },
    E = function(b)
    {
      var c = Number(b.gachaKindId),
        d = b.pageJson,
        e = 0;
      b = [];
      a.storage && a.storage.userGachaKindList && (b = a.storage.userGachaKindList.toJSON());
      m.each(b, function(b, k, f)
      {
        b.gachaKindId == c && (b.canRemainCount ? e = b.canRemainCount - b.totalCount : b.gachaKind && "DAILY" == b.gachaKind.type && b.recentGachaAt && function()
        {
          var c = !1,
            e = function()
            {
              var b = a.getDateShortening(
              {
                date: d.currentTime
              });
              return b.yr + "/" + b.mo + "/" + b.da
            }(),
            f = function()
            {
              var c = a.getDateShortening(
              {
                date: b.recentGachaAt
              });
              return c.yr + "/" + c.mo + "/" + c.da
            }();
          e != f && (c = !0);
          return c
        }() && (e = 1))
      });
      return e
    },
    F = function(b)
    {
      b = b.pageJson.currentTime;
      var c = a.storage.gameUser.get("freeGachaAt") ? a.storage.gameUser.get("freeGachaAt") : "";
      "" === c || c.substr(0, 10) !== b.substr(0, 10) ? (a.addClass(a.doc.getElementById("gachaBadge"), "on"), a.doc.getElementById("gachaBadge").textContent = "Free") : (b = a.storage.userItemList.findWhere(
      {
        itemId: "YELL"
      }) ? a.storage.userItemList.findWhere(
      {
        itemId: "YELL"
      }).toJSON().quantity : 0, 199 < b ? (b = Math.floor(b / 200), a.addClass(a.doc.getElementById("gachaBadge"), "on"), a.doc.getElementById("gachaBadge").textContent = b) : a.removeClass(a.doc.getElementById("gachaBadge"), "on"))
    };
  return D
});
