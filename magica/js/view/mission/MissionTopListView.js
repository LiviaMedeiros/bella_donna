define("underscore backbone backboneCommon ajaxControl command js/view/item/ItemImgPartsView".split(" "), function(k, n, b, f, c, g)
{
  var l = !1;
  return n.View.extend(
  {
    className: "wrap commonFrame4",
    events: function()
    {
      var a = {};
      a[b.cgti + " .itemDetailPopup"] = this.itemDetailPopup;
      a[b.cgti + " .missionBtn"] = this.missionBtn;
      return a
    },
    initialize: function(a, d)
    {
      this.listenTo(this.rootView, "removeChildView", this.removeView);
      this.listenTo(this.rootView, "afterAllRecieve", this.afterAllRecieve);
      this.listenTo(this.rootView, "storyCheck", this.storyCheck);
      this.model = a;
      this.model.challenge.displayName = b.convertTextBr(
      {
        text: this.model.challenge.displayName
      });
      this.missionType = d;
      l = !1
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      var a = this.model.challenge.count,
        d = this.model.clearedCount;
      d >= a ? (this.el.classList.add("clear"), b.addClass(this.el.getElementsByClassName("missionBtn")[0], "clear"), b.removeClass(this.el.getElementsByClassName("missionBtn")[0], "b_white"), b.addClass(this.el.getElementsByClassName("missionBtn")[0], "b_pink"), this.el.getElementsByClassName("missionGuage")[0].style.width = "100%", d !== a && (this.el.getElementsByClassName("missionCompleteNum")[0].textContent = a + "/" + a)) : this.el.getElementsByClassName("missionGuage")[0].style.width = Math.floor(d / a * 100) + "%";
      this.itemImgPartsView = new g(
      {
        model: this.model.challenge.rewardList[0],
        type: this.model.challenge.rewardList[0].presentType,
        displayIconId: this.model.challenge.displayIconId
      });
      this.el.appendChild(this.itemImgPartsView.render().el);
      return this
    },
    missionBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && !l)
      {
        l = !0;
        var d = f.getPageJson(),
          m = this.model.challenge.story ? this.model.challenge.story : null;
        if (this.model.clearedCount >= this.model.challenge.count)
        {
          var e = this;
          a = function(a)
          {
            if ("error" !== a.resultCode)
            {
              b.responseSetStorage(a);
              switch (e.missionType)
              {
                case "daily":
                  b.storage.userDailyChallengeList.remove(b.storage.userDailyChallengeList.findWhere(
                  {
                    challengeId: e.model.challengeId
                  }));
                  e.rootView.allReservCheck();
                  break;
                case "total":
                  b.storage.userTotalChallengeList.remove(b.storage.userTotalChallengeList.findWhere(
                  {
                    challengeId: e.model.challengeId
                  }));
                  e.rootView.allReservCheck();
                  break;
                default:
                  e.rootView.eventMission = e.rootView.makeEventMissionList(), e.rootView.allReservCheck()
              }
              l = !1;
              var c = function()
              {
                m && e.rootView.trigger("storyCheck");
                e.rootView.clearMissionCount()
              };
              1 > Object.keys(a).length || window.isLocal && window.isBrowser && 2 > Object.keys(a).length ? new b.PopupClass(
              {
                content: "受け取り期限を過ぎているため<br>対象のミッション報酬を受け取ることはできません",
                closeBtnText: "OK",
                popupType: "typeC",
                exClass: "missionPop"
              }, null, null, c) : m ? (f.ajaxPost(b.linkList.userQuestAdventureRegist,
              {
                adventureId: String(m)
              }, function(a)
              {
                "error" !== a.resultCode && b.responseSetStorage(a)
              }), e.storyStart(m, function(a)
              {
                a && a.isSkipped && (a = {}, a.adventureId = String(m), f.ajaxPost(b.linkList.adventureSkip, a, function(a)
                {
                  b.responseSetStorage(a)
                }));
                new b.PopupClass(
                {
                  content: "ミッション報酬を1件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
                  closeBtnText: "OK",
                  popupType: "typeC",
                  exClass: "missionPop"
                }, null, null, c)
              })) : new b.PopupClass(
              {
                content: "ミッション報酬を1件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
                closeBtnText: "OK",
                popupType: "typeC",
                exClass: "missionPop"
              }, null, null, c);
              e.removeView();
              "daily" === e.missionType ? 1 > b.doc.getElementById("mission1").getElementsByClassName("wrap").length && (b.doc.getElementById("mission1").innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>') : "total" === e.missionType ? 1 > b.doc.getElementById("mission2").getElementsByClassName("wrap").length && (b.doc.getElementById("mission2").innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>') : 1 > b.doc.getElementById(e.missionType).getElementsByClassName("wrap").length && ((a = k.findWhere(d.limitedChallengeGroupList,
              {
                id: e.model.challenge.groupId
              })) && "COMPOSE_SUPPORT" === a.viewType ? e.removeTab() : b.doc.getElementById(e.missionType).innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>');
              b.scrollRefresh(null, null, !0)
            }
          };
          if ("daily" === this.missionType) f.ajaxPost(b.linkList.userDailyChallengeReceive,
          {
            challengeId: this.model.challengeId
          }, a);
          else if ("total" === this.missionType) f.ajaxPost(b.linkList.userTotalChallengeReceive,
          {
            challengeId: this.model.challengeId
          }, a);
          else
          {
            var c = this.missionType.split("_");
            "e" !== c[0] && "c" !== c[0] || f.ajaxPost(b.linkList.userLimitedChallengeReceive,
            {
              challengeId: this.model.challengeId
            }, a)
          }
        }
        else
        {
          l = !1;
          a = this.model.challenge.pageLink ? this.model.challenge.pageLink : "#/MyPage";
          if ("#/ArenaTop" === a || "#/SubQuest" === a)
            if (c = b.storage.gameUser.toJSON(), c.closeFunctions && -1 < c.closeFunctions.indexOf("ARENA"))
            {
              new b.PopupClass(
              {
                title: "ミッション",
                content: "メインストーリー2章を<br>クリアすることで解放されます。",
                closeBtnText: "OK",
                popupType: "typeC"
              });
              return
            } if ("daily" !== this.missionType && "total" !== this.missionType)
          {
            var h = this.missionType.split("_"),
              c = function(a)
              {
                var b = Date.parse(new Date);
                a = Date.parse(a.endAt);
                return b > a ? !1 : !0
              },
              g = function()
              {
                location.href = "#/MyPage"
              };
            "e" === h[0] ? (h = k.findWhere(this.rootView.eventMission,
            {
              checkId: this.missionType
            }), c(h) ? location.href = a : new b.PopupClass(
            {
              title: "期間外",
              content: "期間外のため<br>対象のミッションは存在しません",
              closeBtnText: "マイページへ",
              popupType: "typeC"
            }, null, null, g)) : "c" === h[0] && (h = k.findWhere(this.rootView.eventMission,
            {
              checkId: this.missionType
            }), c(h) ? location.href = a : new b.PopupClass(
            {
              title: "期間外",
              content: "期間外のため<br>対象のミッションは存在しません",
              closeBtnText: "マイページへ",
              popupType: "typeC"
            }, null, null, g))
          }
          else location.href = a
        }
      }
    },
    afterAllRecieve: function(a, d)
    {
      if (a === this.missionType)
      {
        var c = f.getPageJson();
        "daily" === this.missionType ? -1 < d.indexOf(this.model.challengeId) && (b.storage.userDailyChallengeList.remove(b.storage.userDailyChallengeList.findWhere(
        {
          challengeId: this.model.challengeId
        })), this.removeView(), 1 > b.doc.getElementById("mission1").getElementsByClassName("wrap").length && (b.doc.getElementById("mission1").innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>'), b.scrollRefresh()) : "total" === this.missionType ? -1 < d.indexOf(this.model.challengeId) && (b.storage.userTotalChallengeList.remove(b.storage.userTotalChallengeList.findWhere(
        {
          challengeId: this.model.challengeId
        })), this.removeView(), 1 > b.doc.getElementById("mission2").getElementsByClassName("wrap").length && (b.doc.getElementById("mission2").innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>'), b.scrollRefresh()) : -1 < d.indexOf(this.model.challengeId) && (this.removeView(), 1 > b.doc.getElementById(a).getElementsByClassName("wrap").length && ((d = k.findWhere(c.limitedChallengeGroupList,
        {
          id: this.model.challenge.groupId
        })) && "COMPOSE_SUPPORT" === d.viewType ? this.removeTab() : b.doc.getElementById(a).innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>'), b.scrollRefresh())
      }
    },
    removeTab: function()
    {
      for (var a = b.doc.getElementById("tabScroll").getElementsByClassName("btn"), c = 0; c < a.length; ++c)
        if (a[c].classList.contains("current"))
        {
          a[c].remove();
          break
        } $(a[c]).trigger(b.cgti);
      b.scrollSet("tabScroll", "common_tab")
    },
    itemDetailPopup: function(a)
    {
      if (this.model.challenge.isDetailView && (a.preventDefault(), !b.isScrolled()))
      {
        a = function()
        {
          g.prototype.rootView = this;
          var a = b.doc.createDocumentFragment();
          k.each(this.model.challenge.rewardList, function(b)
          {
            b = new g(
            {
              model: b,
              type: b.presentType
            });
            a.appendChild(b.render().el)
          });
          b.doc.querySelector("#popupDetailScrollWrap .scrollInner").appendChild(a);
          5 < this.model.challenge.rewardList.length && b.addClassId("popupDetailScrollWrap", "alignLeft");
          10 < this.model.challenge.rewardList.length && b.scrollSet("popupDetailScrollWrap", "scrollInner");
          c.getBaseData(b.getNativeObj())
        }.bind(this);
        var d = function()
        {
          this.trigger("removeChildView")
        }.bind(this);
        new b.PopupClass(
        {
          title: "セット内容",
          content: "<div id='popupDetailScrollWrap'><div class='scrollInner'></div></div>",
          popupType: "typeA",
          closeBtnText: "OK",
          exClass: "popupDetail"
        }, null, a, d)
      }
    },
    storyStart: function(a, d)
    {
      a = a.split(",");
      0 === a.length ? new b.PopupClass(
      {
        title: "ストーリー確認",
        content: "ストーリーがありません",
        closeBtnText: "OK"
      }) : (b.androidKeyStop = !0, function()
      {
        $("#commandDiv").on("nativeCallback", function()
        {
          a[0] ? (-1 != a[0].indexOf("_QS") ? c.startStory(a[0].split("_QS")[0]) : c.startStory(a[0]), a.splice(0, 1)) : setTimeout(function()
          {
            c.changeBg(b.background);
            c.startBgm(b.bgm);
            c.setWebView(!0);
            b.ready.target.className = "nativeFadeOut";
            $("#commandDiv").off();
            b.androidKeyStop = !1;
            d && d()
          }, 300)
        })
      }(), $(b.ready.target).on("webkitAnimationEnd", function()
      {
        $(b.ready.target).off();
        $(b.ready.target).on("webkitAnimationEnd", function(a)
        {
          "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
        });
        c.changeBg("web_black.jpg");
        setTimeout(function()
        {
          c.setWebView(!1);
          a && a[0] && -1 != a[0].indexOf("_QS") ? c.startStory(a[0].split("_QS")[0]) : c.startStory(a[0]);
          a.splice(0, 1);
          window.isBrowser && window.isDebug && $("#commandDiv").trigger("nativeCallback")
        }, 300)
      }), b.addClass(b.ready.target, "preNativeFadeIn"))
    },
    storyCheck: function()
    {
      if (this.model.challenge.story && this.model.challenge.rewardRequiredId)
      {
        var a = b.storage.userLimitedChallengeList.findWhere(
        {
          challengeId: this.model.challenge.rewardRequiredId
        });
        a && !a.toJSON().receivedAt ? b.addClass(this.el.getElementsByClassName("missionBtn")[0], "inactive") : b.removeClass(this.el.getElementsByClassName("missionBtn")[0], "inactive")
      }
    },
    removeView: function()
    {
      this.itemImgPartsView && this.itemImgPartsView.removeView();
      this.off();
      this.remove();
      delete this.model.challenge.view
    }
  })
});
