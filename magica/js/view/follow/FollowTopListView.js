define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/follow/FollowPopup"], function(e, l, a, g, m)
{
  var d = !1;
  return l.View.extend(
  {
    tagName: "p",
    className: "friend",
    events: function()
    {
      var b = {};
      b[a.cgti + " .wrap"] = this.detailPopup;
      b[a.cgti + " .followBtn"] = this.followBtn;
      b[a.cgti + " .supportCheckBtn"] = this.supportCheck;
      return b
    },
    initialize: function(a, c)
    {
      this.listenTo(this.rootView, "sortRemove", this.sortHandler);
      this.listenTo(this.rootView, "allCheck", this.allCheck);
      this.listenTo(this.rootView, "collectRemove", this.collectRemove);
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.userType = c;
      this.model.charaName = this.model.charaName.replace(/userName/g, this.model.userName);
      this.userId = "follow" === this.userType ? this.model.followUserId : "follower" === this.userType ? this.model.followerUserId : "block" === this.userType ? this.model.blockUserId : "search" === this.userType ? this.model.id : this.model.userId
    },
    render: function(a)
    {
      this.template = e.template($("#userParts").text());
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.model.blocked ? this.el.getElementsByClassName("messageWrap")[0].textContent = "ブロック中" : this.el.getElementsByClassName("messageWrap")[0].textContent = this.model.comment ? this.model.comment : "";
      this.el.dataset.scrollHash = this.userId;
      return this
    },
    allCheck: function(b, c)
    {
      switch (b)
      {
        case "follow":
          "follow" !== this.userType && this.userId === c && (a.addClass(this.el.getElementsByClassName("followIcon")[0], "on"), this.model.follow = !0, "search" !== this.userType && "follower" !== this.userType || this.userId !== c || a.addClass(this.el.getElementsByClassName("followBtn")[0], "already"));
          break;
        case "unfollow":
          "follow" === this.userType && this.userId === c ? this.removeView() : "follow" !== this.userType && this.userId === c && (a.removeClass(this.el.getElementsByClassName("followIcon")[0], "on"), this.model.follow = !1, "search" !== this.userType && "follower" !== this.userType || this.userId !== c || a.removeClass(this.el.getElementsByClassName("followBtn")[0], "already"));
          break;
        case "block":
          "block" !== this.userType && this.userId === c && (a.addClass(this.el.getElementsByClassName("blockIcon")[0], "on"), this.model.blocked = !0, this.el.getElementsByClassName("messageWrap")[0].textContent = "ブロック中");
          break;
        case "unblock":
          "block" === this.userType && this.userId === c ? this.removeView() : "block" !== this.userType && this.userId === c && (a.removeClass(this.el.getElementsByClassName("blockIcon")[0], "on"), this.model.blocked = !1)
      }
    },
    detailPopup: function(b)
    {
      this.btnFlg ? this.btnFlg = !1 : (b.preventDefault(), a.isScrolled() || m.instantPopup(b, this.model, this.userType, this, this.rootView.pagingView.pageNum, this.rootView.pagingViewFollow.pageNum))
    },
    followBtn: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !d)
        if (this.btnFlg = !0, this.rootView.maxFollowCnt <= a.storage.userFollowList.length) new a.PopupClass(
        {
          title: "フォロー上限",
          content: "フォロー上限に達しています<br>これ以上フォローできません。<br><br>" + ("フォロー数: " + a.storage.userFollowList.length + "/" + this.rootView.maxFollowCnt + "人"),
          closeBtnText: "閉じる"
        });
        else
        {
          d = !0;
          var c = this;
          g.ajaxPost(a.linkList.sendFollow,
          {
            friendUserId: this.userId
          }, function(b)
          {
            d = !1;
            if ("error" !== b.resultCode)
            {
              var f = a.storage.userFollowList.length + b.userFollowList.length;
              a.responseSetStorage(b);
              new a.PopupClass(
              {
                title: "フォロー追加",
                content: "<span class='c_pink popUserName'></span>をフォローしました。<br><br>" + ("フォロー数: " + f + "/" + c.rootView.maxFollowCnt + "人"),
                closeBtnText: "閉じる"
              }, null, function()
              {
                $(a.doc.getElementsByClassName("popUserName")).text(c.model.userName)
              });
              a.addClass(c.el.getElementsByClassName("followBtn")[0], "already");
              c.rootView.allCheckAndChange(c.userId, "follow")
            }
          })
        }
    },
    supportCheck: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !d)
      {
        this.btnFlg = !0;
        b = this.model;
        var c = this.userType,
          e = this.rootView.pagingView.pageNum,
          f = this.rootView.pagingViewFollow.pageNum,
          h = "follow" === c ? b.followUserId : "follower" === c ? b.followerUserId : "block" === c ? b.blockUserId : "search" === c ? b.id : b.userId,
          k = function(b)
          {
            "error" !== b.resultCode && (window.isLocal && (b = JSON.parse(b)), a.supportCheckModel = b, a.followSave.active = !0, a.followSave.scrollHash = h, a.followSave.pagingNum = e, a.followSave.pagingNumFollow = f, a.followSave.sortValue = a.doc.getElementById("followSort").value, location.href = "#/ProfileFormationSupport")
          };
        window.isLocal ? require(["text!/magica/json/friend/user/1.json"], function(a)
        {
          k(a)
        }) : g.ajaxSimpleGet(a.linkList.followerProfile, h, k)
      }
    },
    sortHandler: function()
    {
      "follow" === this.userType && (this.off(), this.remove(), delete this.model.view)
    },
    collectRemove: function(a)
    {
      this.userType === a && (this.off(), this.remove(), delete this.model.view)
    },
    removeView: function()
    {
      this.off();
      this.remove();
      delete this.model.view
    }
  })
});
