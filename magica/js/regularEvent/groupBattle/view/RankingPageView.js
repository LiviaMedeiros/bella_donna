define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/groupBattle/RegularEventGroupBattleRanking.html text!css/regularEvent/groupBattle/RegularEventGroupBattleRanking.css cardUtil QuestUtil".split(" "), function(l, h, b, r, t, u, v, w, x)
{
  h.Model.extend();
  r = h.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .rankingTab"] = this.tabChange;
      a[b.cgti + " #topScrollBtn"] = this.topScrollRanking;
      a[b.cgti + " .rewardBtn"] = this.gbCommon.rewardPopup;
      return a
    },
    initialize: function(a)
    {
      b.setStyle(v);
      this.backPageId = a.backPageId;
      this.template = l.template(u);
      this.createDom();
      b.addBackHandler(this.backHandler.bind(this))
    },
    render: function()
    {
      var a = this.pageJson;
      a.loginName = b.storage.user.get("loginName");
      a.userLevel = b.storage.gameUser.get("level");
      this.$el.html(this.template(this.pageJson));
      return this
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      var a = b.doc.getElementsByClassName("rankingTab");
      $(a[0]).trigger(b.cgti);
      b.scrollSet("scrollOuter", "scrollInner")
    },
    tabChange: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var d = this.pageJson,
          f = a.currentTarget.dataset.type,
          e = a.currentTarget.dataset.id;
        b.doc.getElementById("rankingListWrap").className = f;
        var h = b.doc.getElementsByClassName("rankingList")[0];
        h.innerHTML = "";
        if ("daily" == f && !e)
        {
          for (var m = b.doc.getElementById("dailyTabWrap").getElementsByClassName("rankingTab"), c = 0, g = m.length; c < g && !m[c].classList.contains("current");) c = c + 1 | 0;
          e = c >= g ? g : c + 1;
          b.addClass(m[e - 1], "current")
        }
        if ("group" == f && !e)
        {
          for (var m = d.regularEventGroupBattleUserGroup.grade ? d.regularEventGroupBattleUserGroup.grade.substr(0, 1) : "S", k = b.doc.getElementById("groupTabWrap").getElementsByClassName("rankingTab"), c = 0, g = k.length; c < g && !k[c].classList.contains("current");) - 1 < k[c].dataset.id.indexOf(m) && (e = k[c].dataset.id), c = c + 1 | 0;
          c >= g && (c = 0);
          b.addClass(k[c], "current");
          e = k[c].dataset.id
        }
        g = a.currentTarget.parentNode.getElementsByClassName("rankingTab");
        l.each(g, function(a)
        {
          b.removeClass(a, "current")
        });
        b.addClass(a.currentTarget, "current");
        p.prototype.rootView = this;
        p.prototype.type = f;
        p.prototype.template = "group" == f ? l.template(b.doc.getElementById("GroupRankingListPartsTemp").textContent) : l.template(b.doc.getElementById("RankingListPartsTemp").textContent);
        var n;
        if ("total" == f) a = d.totalRankingList, n = d.myTotalDamage;
        else if ("daily" == f) a = d.dailyRankingList[e], n = d.myDailyDamage && d.myDailyDamage[e] ? d.myDailyDamage[e][0] : null;
        else
          for (c in a = [], e = e.split(","), e) d.groupRankingList[e[c]] && (a = a.concat(d.groupRankingList[e[c]]));
        if (a && 0 < a.length)
        {
          var q = b.doc.createDocumentFragment(),
            d = b.doc.createElement("div");
          d.dataset.scrollHash = "top";
          q.appendChild(d);
          l.each(a, function(a, c)
          {
            a.type = f;
            var e = new p(a);
            q.appendChild(e.render().el);
            if (0 == c)
            {
              var d = b.doc.getElementById("topCharaImage");
              d.className = "";
              "group" == f ? (d.dataset.nativeimgkey = "card_" + a.topUserLeaderCardId + "_l", d.dataset.src = "resource/image_native/card/image/card_" + a.topUserLeaderCardId + "_l.png") : (d.dataset.nativeimgkey = "card_" + a.leaderCardId + "_l", d.dataset.src = "resource/image_native/card/image/card_" + a.leaderCardId + "_l.png");
              setTimeout(function()
              {
                d.className = "anim"
              }, 100)
            }
          });
          h.appendChild(q)
        }
        else h.innerHTML = "<p class='noLog ts_white'>ランキング集計中</p>";
        b.doc.getElementById("RegularEventGroupBattleRanking").className = f;
        b.doc.getElementById("myRankingRank").innerHTML = n && n.ranking ? n.ranking : "圏外";
        t.getBaseData(b.getNativeObj());
        b.scrollRefresh(null, null, !0)
      }
    },
    topScrollRanking: function(a)
    {
      a.preventDefault();
      b.isScrolled() || b.forceScroll("scrollOuter", "scrollInner", "top", !0)
    },
    backHandler: function(a)
    {
      b.tapBlock(!0);
      b.androidKeyStop = !0;
      this.gbCommon.changeScene(this.backPageId)
    },
    removeView: function()
    {
      b.removeBackHandler();
      this.trigger("removeChildView");
      this.off();
      this.remove()
    }
  });
  var p = h.View.extend(
  {
    className: "member",
    events: function()
    {
      var a = {};
      a[b.cgti + " .logBtn"] = this.logBtn;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.rootView, "removeChildView", this.removeView);
      this.model = a
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.model.userId == b.storage.gameUser.get("userId") && b.addClass(this.el, "myself");
      100 <= this.model.ranking && b.addClass(this.el, "border");
      return this
    },
    logBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || this.rootView.gbCommon.battleLogPopup(a)
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  return r
});
