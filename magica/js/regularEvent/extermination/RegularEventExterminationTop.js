define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationTop.html text!css/regularEvent/extermination/RegularEventExterminationTop.css".split(" "), function(g, l, b, p, e, x, y)
{
  l.Model.extend();
  var d, q, n, z = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #scheduleBtn"] = this.scheduleBtn;
        a[b.cgti + " #helpBtn"] = this.eventNaviPopup;
        a[b.cgti + " .debugBtn"] = this.debugBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template(x);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.setGlobalView();
        for (var a = d.eventMaster.regularEventExtermination.difficultyList, h = a.length, c = 0, f = null; c < h;)
        {
          if (!a[c].isCleared)
          {
            f = a.splice(c, 1)[0];
            break
          }
          c = c + 1 | 0
        }
        f || (f = a.splice(h - 1, 1)[0]);
        a.unshift(f);
        t.prototype.rootView = this;
        t.prototype.template = g.template($("#difficultyPartsTemp").text());
        var k = b.doc.createDocumentFragment();
        g.each(a, function(a, b)
        {
          a.index = b;
          a = new t(a);
          k.appendChild(a.render().el)
        });
        b.doc.getElementById("difficultyList").appendChild(k);
        e.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      eventNaviPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.eventFirstNavi(["navi_01", "navi_02", "navi_03"], d.eventMaster.regularEventId, "extermination", null, !0, "regularEvent")
      },
      debugBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled()) switch (a.currentTarget.dataset.type)
        {
          case "clearCutin":
            new u(d.eventMaster.regularEventExtermination.difficultyList[0]);
            break;
          case "allClearCutin":
            new v(d.eventMaster.regularEventExtermination.difficultyList[0])
        }
      },
      scheduleBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = g.template($("#schedulePopupTemp").text()), new b.PopupClass(
        {
          title: "解放スケジュール",
          content: a(),
          popupId: "schedulePopup",
          popupType: "typeA"
        }, null, function()
        {
          e.getBaseData(b.getNativeObj())
        }))
      }
    }),
    u = l.View.extend(
    {
      id: "clearCutinContainer",
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .animationEnd"] = this.animationEnd;
        a["webkitAnimationEnd .animationEnd"] = this.animationEnd;
        a["webkitanimationend .animationEnd"] = this.animationEnd;
        a["animationend .animationEnd"] = this.animationEnd;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template($("#clearCutinPartsTemp").text());
        this.model = a;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      createDom: function()
      {
        b.doc.getElementById("overlapContainer").appendChild(this.render().el);
        setTimeout(function()
        {
          e.startSe(3103)
        }, 500)
      },
      animationEnd: function(a)
      {
        this.removeView()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    v = l.View.extend(
    {
      id: "allClearCutinContainer",
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .animationEnd"] = this.animationEnd;
        a["webkitAnimationEnd .animationEnd"] = this.animationEnd;
        a["webkitanimationend .animationEnd"] = this.animationEnd;
        a["animationend .animationEnd"] = this.animationEnd;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template($("#allClearCutinPartsTemp").text());
        this.completeRewardModel = b.getRewardImgModel(d.eventMaster.regularEventExtermination.completeRewardCodes.split(",")[0]);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          rewardModel: this.completeRewardModel
        }));
        return this
      },
      createDom: function()
      {
        b.doc.getElementById("overlapContainer").appendChild(this.render().el);
        e.getBaseData(b.getNativeObj());
        setTimeout(function()
        {
          e.startSe(3103)
        }, 500)
      },
      animationEnd: function(a)
      {
        this.el.classList.add("fadeOut");
        setTimeout(function()
        {
          new A;
          this.removeView()
        }.bind(this), 300)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    A = l.View.extend(
    {
      id: "changeAllClearCutinContainer",
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .animationEnd"] = this.animationEnd;
        a["webkitAnimationEnd .animationEnd"] = this.animationEnd;
        a["webkitanimationend .animationEnd"] = this.animationEnd;
        a["animationend .animationEnd"] = this.animationEnd;
        a[b.cgti] = this.tap;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template($("#changeAllClearCutinPartsTemp").text());
        this.tapBlock = !0;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      createDom: function()
      {
        b.doc.getElementById("overlapContainer").appendChild(this.render().el);
        e.getBaseData(b.getNativeObj());
        setTimeout(function()
        {
          e.startSe(3103)
        }, 500)
      },
      animationEnd: function(a)
      {
        switch (a.originalEvent.animationName)
        {
          case "exterminationTopClearFadeIn":
            b.doc.getElementById("RegularEventExterminationTop").classList.add("allClear");
            b.doc.getElementById("changeAllClearInfo").classList.add("show");
            break;
          case "exterminationTopClearInfoOpen":
            b.doc.getElementById("changeAllClearTouchScreen").classList.add("show"), this.tapBlock = !1
        }
      },
      tap: function(a)
      {
        a.preventDefault();
        b.isScrolled() || this.tapBlock || (this.el.classList.add("fadeOut"), setTimeout(function()
        {
          this.removeView()
        }.bind(this), 300))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    t = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti] = this.select;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = a;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      createDom: function()
      {
        var a = "difficultyWrap";
        this.model.isCleared ? a += " cleared" : this.model.isLock && (a += " lock");
        this.el.className = a
      },
      select: function(a)
      {
        a.preventDefault();
        b.isScrolled() || !d.isAllClear && this.model.isCleared || this.model.isLock || (d.isAllClear ? new b.PopupClass(
        {
          title: "殲滅戦",
          content: "ステージ" + this.model.name + "へ再度挑戦します。<br>よろしいですか？",
          popupId: "finalRoundStartPopup",
          closeBtnText: "キャンセル",
          decideBtnText: "OK",
          decideBtnEvent: this.selectDifficulty.bind(this),
          popupType: "typeA"
        }) : this.selectDifficulty())
      },
      selectDifficulty: function(a)
      {
        var d = this.model.startStoryId;
        p.ajaxPost(b.linkList.exterminationSelectDifficulty,
        {
          difficultyId: this.model.difficultyId
        }, function()
        {
          w(d, function(a)
          {
            a ? (b.responseSetStorage(a), $("#commandDiv").on("nativeCallback", function(a, d)
            {
              $("#commandDiv").off();
              e.setWebView(!0);
              b.tapBlock(!1);
              b.androidKeyStop = !1;
              b.ready.target.className = "nativeFadeOut";
              location.href = "#/RegularEventExterminationBattleSelect"
            }), setTimeout(function()
            {
              e.setWebView(!1);
              e.startStory(d);
              window.isBrowser && nativeCallback()
            }, 500)) : (b.tapBlock(!1), b.androidKeyStop = !1, location.href = "#/RegularEventExterminationBattleSelect")
          })
        })
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    r = function()
    {
      b.setStyle(y);
      d.isAllClear ? e.changeBg("web_extermination_top_02.ExportJson") : e.changeBg("web_extermination_top_01.ExportJson");
      e.startBgm("bgm21_system01");
      var a, h = Date.parse(d.currentTime),
        c = d.eventMaster.regularEventExtermination.difficultyList;
      g.each(c, function(c, e)
      {
        var f = b.storage.userSectionList.findWhere(
        {
          sectionId: c.sectionId
        });
        f && f.get("cleared") && (c.isCleared = !0);
        f = Date.parse(c.openDate);
        h < f ? c.lockText = c.openDate.slice(0, 10) + "<br>に解放" : a && !a.isCleared && (c.lockText = a.name + "クリア<br>で解放");
        c.lockText && (c.isLock = !0);
        a = c;
        c.rewardModels = [];
        f = c.clearRewardCodes.split(",");
        4 == e && (f = f.concat(d.eventMaster.regularEventExtermination.completeRewardCodes.split(",")));
        for (e = 0; e < f.length; e++) c.rewardModels.push(b.getRewardImgModel(f[e]))
      });
      q = new z;
      var f = !1,
        k = String(d.eventMaster.regularEventId) + "_" + String(c[0].difficultyId),
        m = localStorage.getItem("EXTERMINATION_CLEARANIME");
      m && (f = k === m);
      c[0].isCleared || c[0].isLock || f || ("EASY" === c[0].name ? b.eventFirstNavi(["navi_01", "navi_02", "navi_03"], d.eventMaster.regularEventId, "extermination", function()
      {
        new u(c[0])
      }, !1, "regularEvent") : new u(c[0]), localStorage.setItem("EXTERMINATION_CLEARANIME", k))
    },
    w = function(a, h)
    {
      var c = !0;
      a ? g.each(d.userQuestAdventureList, function(b)
      {
        a === b.adventureId && (c = !1)
      }) : c = !1;
      c ? ($(b.ready.target).off(), $(b.ready.target).on("webkitAnimationEnd", function()
      {
        e.changeBg("web_black.jpg");
        $(b.ready.target).off();
        $(b.ready.target).on("webkitAnimationEnd", function(a)
        {
          "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
        });
        p.ajaxPost(b.linkList.userQuestAdventureRegist,
        {
          adventureId: String(a)
        }, h)
      }), b.ready.target.classList.contains("preNativeFadeIn") ? $(b.ready.target).trigger("webkitAnimationEnd") : b.addClass(b.ready.target, "preNativeFadeIn")) : (h(), d.isAllClear && b.doc.getElementById("RegularEventExterminationTop").classList.add("allClear"))
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "pieceList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "titleList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      e.endQuest();
      e.setWebView(!0);
      b.questNativeResponse && (b.responseSetStorage(b.questNativeResponse), nativeJson = b.questNativeResponse);
      b.supportUserList = null;
      b.questNativeResponse = null;
      b.questBattleModel = null;
      a && 0 < a && (n = a | 0);
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.clearSectionModel = null;
      b.clearChapterModel = null;
      d = p.getPageJson();
      var a = g.findWhere(d.regularEventList,
      {
        regularEventType: "EXTERMINATION"
      });
      a || (location.href = "#/MyPage");
      d.eventMaster = a;
      d.isAllClear = !0;
      var h = d.eventMaster.regularEventExtermination.difficultyList,
        c;
      for (c in h)
      {
        var f = b.storage.userSectionList.findWhere(
        {
          sectionId: h[c].sectionId
        });
        if (!f || !f.get("cleared"))
        {
          d.isAllClear = !1;
          break
        }
      }
      if (d.userRegularEventExtermination.inChallenging) location.href = "#/RegularEventExterminationBattleSelect";
      else if (5 > b.storage.userCardList.filter(function(a)
        {
          return 4 <= a.get("cardId") % 10
        }).length) new b.PopupClass(
      {
        title: "殲滅戦",
        content: "殲滅戦に参加するには<br>★4以上の魔法少女が<span class='c_red'>5</span>体必要です。",
        popupId: "finalRoundStartPopup",
        closeBtnText: "OK",
        popupType: "typeA"
      }, null, null, function()
      {
        location.href = "#/MyPage"
      }), b.tapBlock(!1), b.androidKeyStop = !1;
      else
      {
        b.historyArr = ["MyPage", "RegularEventExterminationTop"];
        var k = a.startStoryId,
          m = null;
        if (n)
        {
          var a = b.storage.userQuestBattleList.findWhere(
            {
              questBattleId: n
            }),
            l = g.findWhere(d.eventMaster.regularEventExtermination.difficultyList,
            {
              sectionId: a.toJSON().questBattle.sectionId
            });
          d.isAllClear ? (k = d.eventMaster.regularEventExtermination.completeStoryId, m = function()
          {
            new v(l)
          }) : k = l.clearStoryId
        }
        window.isLocal ? r() : w(k, function(a)
        {
          a ? (b.responseSetStorage(a), $("#commandDiv").on("nativeCallback", function(a, c)
          {
            $("#commandDiv").off();
            e.setWebView(!0);
            b.tapBlock(!1);
            b.androidKeyStop = !1;
            b.ready.target.className = "nativeFadeOut";
            n ? (r(), m && (m(), m = null)) : r()
          }), setTimeout(function()
          {
            e.setWebView(!1);
            e.startStory(k);
            window.isBrowser && nativeCallback()
          }, 500)) : (b.tapBlock(!1), b.androidKeyStop = !1, r())
        })
      }
    },
    remove: function(a)
    {
      q && (q.trigger("removeChildView"), q.remove());
      n = null;
      a()
    }
  }
});
