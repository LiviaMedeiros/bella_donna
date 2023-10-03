define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/groupBattle/RegularEventGroupBattleUser.html text!css/regularEvent/groupBattle/RegularEventGroupBattleUser.css cardUtil QuestUtil".split(" "), function(c, d, a, h, f, k, g, l, m)
{
  d.Model.extend();
  f = d.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .nameChange"] = this.gbCommon.groupNameChange;
      b[a.cgti + " #rewardBtn"] = this.gbCommon.rewardPopup;
      b[a.cgti + " #missionBtn"] = this.gbCommon.missionPopup;
      b[a.cgti + " #battleLogBtn"] = this.gbCommon.battleLogPopup;
      b[a.cgti + " #myScrollBtn"] = this.scrollMember;
      b[a.cgti + " #topScrollMemberBtn"] = this.topScrollMember;
      return b
    },
    initialize: function(b)
    {
      a.setStyle(g);
      this.template = c.template(k);
      this.myData = c.findWhere(this.pageJson.sortedRankingList,
      {
        isMyself: !0
      });
      this.createDom();
      "close" != this.pageJson.eventStatus && a.addBackHandler(this.backHandler.bind(this))
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        info: this.pageJson,
        myData: this.myData
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.gbCommon.clearMissionCount();
      if (0 < this.pageJson.sortedRankingList.length)
      {
        e.prototype.rootView = this;
        e.prototype.template = c.template($("#memberPartsTemp").text());
        var b = a.doc.createDocumentFragment();
        c.each(this.pageJson.sortedRankingList, function(a, c)
        {
          a = new e(
          {
            model: a
          });
          b.appendChild(a.render().el)
        });
        a.doc.getElementById("rankingList").appendChild(b);
        a.scrollSet("scrollMemberOuter", "scrollInner")
      }
      else a.doc.getElementById("rankingList").innerHTML = '<p class="noRank ts_white">ランキングは現在集計中です。<br>ランキングは毎日16時に更新されます。</p>'
    },
    scrollMember: function(b)
    {
      b.preventDefault();
      a.isScrolled() || a.forceScroll("scrollMemberOuter", "scrollInner", "myself", !0)
    },
    topScrollMember: function(b)
    {
      b.preventDefault();
      a.isScrolled() || a.forceScroll("scrollMemberOuter", "scrollInner", "memberTop", !0)
    },
    backHandler: function(b)
    {
      a.tapBlock(!0);
      a.androidKeyStop = !0;
      this.gbCommon.changeScene("PAGE_BOSS")
    },
    removeView: function()
    {
      this.off();
      a.removeBackHandler();
      this.remove()
    }
  });
  var e = d.View.extend(
  {
    className: "member",
    events: function()
    {
      var b = {};
      b[a.cgti + " .goodBtn"] = this.goodBtn;
      b[a.cgti + " .logBtn"] = this.logBtn;
      return b
    },
    initialize: function(b)
    {
      a.setStyle(g);
      this.createDom();
      "close" != this.rootView.pageJson.eventStatus && a.addBackHandler(this.rootView.backHandler.bind(this))
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        info: this.rootView.pageJson,
        model: this.model
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.model.isMyself && (this.el.dataset.scrollHash = "myself")
    },
    goodBtn: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = b.currentTarget.dataset.userId,
          d = b.currentTarget.parentNode.getElementsByClassName("userName")[0].innerText;
        b = function()
        {
          var b = function(b)
          {
            this.rootView.pageJson.userRegularEventGroupBattle.remainGoodCount--;
            new a.PopupClass(
            {
              title: "キモチ戦",
              content: "<span class='c_red'>" + d + "</span>に「いいね」をしました！<br><br><span class='c_red'>MPを" + parseInt(b.addGoodMpNum / 10) + "獲得しました。</span><br>※獲得したMPはバトルに引き継がれます。",
              popupType: "typeC",
              closeBtnText: "OK"
            });
            0 >= this.rootView.pageJson.userRegularEventGroupBattle.remainGoodCount && $(a.doc.getElementsByClassName("goodBtn")).addClass("off")
          }.bind(this);
          h.ajaxPost(a.linkList.groupBattleBattleGood,
          {
            toUserId: c
          }, b)
        }.bind(this);
        new a.PopupClass(
        {
          title: "キモチ戦",
          content: "<span class='c_red'>" + d + "</span>に「いいね」します！<br><br><span class='c_red'>※いいねは1日" + this.rootView.pageJson.eventMaster.regularEventGroupBattle.maxGoodCount + "回できます。</span>",
          popupType: "typeC",
          decideBtnText: "OK",
          decideBtnEvent: b,
          closeBtnText: "キャンセル"
        })
      }
    },
    logBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || this.rootView.gbCommon.battleLogPopup(b)
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  return f
});
