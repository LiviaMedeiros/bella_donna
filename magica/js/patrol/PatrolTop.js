define("underscore backbone backboneCommon ajaxControl command text!template/patrol/PatrolTop.html text!css/patrol/PatrolTop.css cardUtil js/patrol/view/PatrolDeckView".split(" "), function(d, m, b, l, q, t, u, v, r)
{
  m.Model.extend();
  var k, f, n, w = m.View.extend(
    {
      initialize: function(a)
      {
        this.template = d.template(t);
        this.createDom()
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " #lumpExpeditionBtn"] = this.executeLumpExpedition;
        a[b.cgti + " #lumpResultBtn"] = this.getLumpResult;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(k));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        for (var a = [], e = 0;; e++)
        {
          var c = d.filter(b.storage.userPatrolList.toJSON(), function(a)
          {
            return a.patrolArea.areaKey === e + 1
          });
          if (!c.length) break;
          var g = d.find(c, function(a)
          {
            return a.canPlay
          });
          g ? a.push(g) : (c = d.sortBy(c, "patrolAreaId"), a.push(c[0]))
        }
        b.viewPatrolList = a;
        p.prototype.rootView = this;
        p.prototype.template = d.template($("#areaParts").text());
        var h = b.doc.createDocumentFragment();
        d.each(a, function(a, b)
        {
          a = new p(a);
          h.appendChild(a.render().el);
          a.createDom()
        });
        b.doc.getElementById("areaList").appendChild(h);
        this.trigger("startTimer");
        d.find(b.doc.getElementsByClassName("area notPlay"), function(a)
        {
          return a
        });
        d.find(b.doc.getElementsByClassName("area expendition"), function(a)
        {
          return a
        });
        a = d.find(b.doc.getElementsByClassName("area isEnd"), function(a)
        {
          return a
        });
        d.find(b.doc.getElementsByClassName("area canPlay"), function(a)
        {
          return a
        }) || b.addClass(b.doc.getElementById("lumpExpeditionBtn"), "off");
        a || b.addClass(b.doc.getElementById("lumpResultBtn"), "off");
        q.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      awakeSuspend: function(a)
      {
        this.suspendTime = a;
        this.trigger("awakeSuspend")
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
      },
      getLumpResult: function(a)
      {
        a.preventDefault();
        b.isScrolled() || l.ajaxPost(b.linkList.patrolLumpEnd,
        {
          userPatrolResultId: 0
        }, function(a)
        {
          b.patrolEndResponse = a;
          location.href = "#/PatrolLumpResult"
        })
      },
      executeLumpExpedition: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (this.checkCanPlay() ? location.href = "#/PatrolLumpFormation" : new b.PopupClass(
        {
          title: "一括パトロール",
          content: "パトロールに出発できる魔法少女が不足しています。",
          closeBtnText: "OK",
          popupType: "typeC"
        }, null, null, null))
      },
      checkCanPlay: function()
      {
        var a = [],
          e = [],
          c = [],
          g = !1;
        d.each(b.viewPatrolList, function(c, d)
        {
          if (c.canPlay)
            if (!c.userPatrolResult) a.push(c.patrolArea.areaKey);
            else if ("EXPEDITION" == c.userPatrolResult.status)
            for (d = 0; 6 > d; d++)
            {
              var g = c.userPatrolResult["charaId" + String(d + 1)];
              g && b.storage.userCardListEx.findWhere(
              {
                charaId: g
              }) && e.push(g)
            }
        });
        var h = [];
        d.each(b.storage.userCardListEx.models, function(a)
        {
          h.push(a.attributes.charaId)
        });
        d.each(h, function(a)
        {
          var b = !1;
          d.each(e, function(c)
          {
            c == a && (b = !0)
          });
          b || c.push(a)
        });
        return g = a.length > c.length ? !1 : !0
      }
    }),
    p = m.View.extend(
    {
      className: "area",
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.listenTo(this.rootView, "startTimer", this.startTimer);
        this.listenTo(this.rootView, "awakeSuspend", this.awakeSuspend);
        this.model = this.createModel(a);
        this.model.isExpendition && this.initTimer()
      },
      events: function()
      {
        var a = {};
        a[b.cgti] = this.select;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        var a = "area pos" + this.model.patrolArea.areaKey;
        this.model.canPlay || (a += " off");
        this.el.className = a;
        return this
      },
      createModel: function(a)
      {
        a.isExpendition = a.userPatrolResult && "EXPEDITION" === a.userPatrolResult.status;
        a.charaIdArr = [];
        if (a.isExpendition)
          for (var e = 0; 5 > e; e++)
          {
            var c = a["charaId" + String(e + 1)];
            c && (c = b.storage.userCardListEx.findWhere(
            {
              id: c
            })) && a.charaIdArr.push(c.charaId)
          }
        a.rewardImgModel = b.getRewardImgModel(a.patrolArea.viewReward);
        return a
      },
      initTimer: function(a)
      {
        a = (new Date(a ? a : k.currentTime)).getTime();
        var b = (new Date(this.model.userPatrolResult.startedAt)).getTime(),
          c = parseInt(this.model.patrolArea.duration.slice(0, 2)),
          d = parseInt(this.model.patrolArea.duration.slice(2, -2)),
          h = parseInt(this.model.patrolArea.duration.slice(4));
        this.remainTime = b + 1E3 * (3600 * c + 60 * d + h) - a
      },
      startTimer: function()
      {
        this.model.isExpendition && (0 >= this.remainTime ? this.compTimer() : (this.timer = setInterval(this.timerInterval.bind(this), 1E3), this.timerInterval()))
      },
      compTimer: function()
      {
        clearInterval(this.timer);
        this.model.isEnd = !0;
        this.el.classList.add("isEnd");
        this.el.getElementsByClassName("timerWrap")[0].className = "timerWrap complete";
        this.el.getElementsByClassName("timer")[0].innerHTML = "パトロール完了"
      },
      timerInterval: function()
      {
        if (0 >= this.remainTime) this.compTimer();
        else
        {
          this.remainTime -= 1E3;
          var a = parseInt(this.remainTime / 1E3),
            b = a / 3600 | 0,
            c = (a - 3600 * b) / 60 | 0,
            a = a - 3600 * b - 60 * c | 0,
            b = "" + ((10 > b ? "0" + b : b) + "：") + ((10 > c ? "0" + c : c) + "：") + (10 > a ? "0" + a : a),
            b = "<span>完了まで</span>" + b;
          this.el.getElementsByClassName("timer")[0].innerHTML = b
        }
      },
      createDom: function()
      {
        this.el.getElementsByClassName("name")[0].innerHTML = this.model.patrolArea.areaName;
        if (this.model.canPlay)
          if (this.model.isExpendition) b.addClass(this.el.getElementsByClassName("timerWrap")[0], "expendition"), this.el.classList.add("expendition");
          else if (this.model.isEnd) this.el.classList.add("isEnd");
        else
        {
          var a = this.model.patrolArea.duration.slice(0, 2),
            a = a + ("：" + this.model.patrolArea.duration.slice(2, -2)),
            a = a + ("：" + this.model.patrolArea.duration.slice(4));
          this.el.getElementsByClassName("timer")[0].innerHTML = "<span>所要時間</span>" + a;
          this.el.classList.add("canPlay")
        }
        else this.el.getElementsByClassName("timer")[0].innerHTML = "開放：" + this.model.patrolArea.conditionDescription, this.el.classList.add("notPlay")
      },
      select: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
          if (this.model.canPlay)
            if (this.model.isEnd) l.ajaxPost(b.linkList.patrolEnd,
            {
              userPatrolResultId: this.model.userPatrolResultId
            }, function(a)
            {
              b.patrolEndResponse = a;
              location.href = "#/PatrolResult"
            });
            else if (this.model.isExpendition)
        {
          if (!this.el.classList.contains("tap") && (this.el.classList.add("tap"), c = this.el))
          {
            var e = c.getElementsByClassName("chara");
            d.each(e, function(a, b)
            {
              a && a.classList.add("rove")
            });
            setTimeout(function()
            {
              d.each(e, function(a, b)
              {
                a && a.classList.remove("rove")
              });
              c && c.classList.remove("tap")
            }.bind(this), 1600)
          }
        }
        else r.prototype.rootView = this.rootView, new r(
        {
          model: this.model
        });
        else
        {
          new b.PopupClass(
          {
            title: "エリア未解放",
            content: "条件を満たしていません",
            closeBtnText: "OK",
            popupType: "typeC"
          });
          this.el.classList.add("shake");
          var c = this.el;
          setTimeout(function()
          {
            c && c.classList.remove("shake")
          }.bind(this), 500)
        }
      },
      awakeSuspend: function()
      {
        this.model.isExpendition && (this.timer && clearInterval(this.timer), this.initTimer(this.rootView.suspendTime), this.startTimer())
      },
      removeView: function()
      {
        this.timer && clearInterval(this.timer);
        this.off();
        this.remove()
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
      id: "userDeckList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "giftList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "patrolAreaList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userPatrolList",
      refresh: !0
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userLive2dList"
    }],
    fetch: function()
    {
      l.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setGlobalView();
      b.setStyle(u);
      k = l.getPageJson();
      v.createCardList();
      var a = parseInt(k.currentTime.slice(11, 13));
      b.patrolBgIndex = 7 <= a && 16 >= a ? 1 : 16 < a && 19 >= a ? 2 : 3;
      q.changeBg("web_patrol_top_0" + b.patrolBgIndex + ".ExportJson");
      f = new w
    },
    awakeSuspend: function(a)
    {
      f.awakeSuspend(a)
    },
    remove: function(a)
    {
      f.PatrolDeckView && (f.PatrolDeckView.removeView(), f.PatrolDeckView = null);
      f && f.removeView();
      k = f = null;
      n && clearInterval(n);
      n = null;
      b.patrolDeckList && (b.patrolDeckList = null);
      a()
    }
  }
});
