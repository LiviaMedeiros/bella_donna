define("underscore backbone backboneCommon ajaxControl command text!css/regularEvent/accomplish/RegularEventAccomplishRecovery.css".split(" "), function(c, e, b, f, h, g)
{
  return e.View.extend(
  {
    tagName: "div",
    id: "allRecoveryBtn",
    className: "se_decide TE",
    events: function()
    {
      var a = {};
      a[b.cgti] = this.allRecoveryBtn;
      return a
    },
    initialize: function(b)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.createDom()
    },
    createDom: function(a)
    {
      a = document.createElement("style");
      a.setAttribute("type", "text/css");
      a.innerText = g;
      if (b.userRegularEventAccomplishCureAt) this.el.classList.add("off");
      else
      {
        var d;
        b.userRegularEventAccomplishCharaArr && (d = c.find(b.userRegularEventAccomplishCharaArr, function(b)
        {
          return 1 == b.isRetired || 0 < b.damage
        }));
        d || this.el.classList.add("not")
      }
      this.el.appendChild(a)
    },
    allRecoveryBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a.currentTarget.classList.contains("off") ? new b.PopupClass(
      {
        title: "HP回復",
        content: "すでにイベント期間に回復済です。",
        closeBtnText: "OK",
        popupType: "typeC",
        popupId: "recoverOkPopup"
      }, null, null, null) : a.currentTarget.classList.contains("not") ? new b.PopupClass(
      {
        title: "HP回復",
        content: "回復可能な魔法少女がいません。",
        closeBtnText: "OK",
        popupType: "typeC",
        popupId: "recoverOkPopup"
      }, null, null, null) : a.currentTarget.classList.contains("all") ? new b.PopupClass(
      {
        title: "HP回復",
        content: "全てのステージをクリア済です。",
        closeBtnText: "OK",
        popupType: "typeC",
        popupId: "recoverOkPopup"
      }, null, null, null) : new b.PopupClass(
      {
        title: "HP回復",
        content: "全ての魔法少女のHPを回復します。",
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        decideBtnEvent: function(a)
        {
          a.preventDefault();
          b.isScrolled() || a.currentTarget.classList.contains("off") || (b.androidKeyStop = !0, $("#recoverConfirm .decideBtn").off(), b.doc.getElementById("allRecoveryBtn").classList.add("off"), a = function(a)
          {
            b.userRegularEventAccomplishCureAt = a.userRegularEventAccomplish.cureAt;
            b.userRegularEventAccomplishCharaArr || (b.userRegularEventAccomplishCharaArr = []);
            c.each(a.userRegularEventAccomplishCharaList, function(a)
            {
              b.userRegularEventAccomplishCharaArr[a.charaId] = a
            });
            this.recoverCallback && (this.recoverCallback(), this.recoverCallback = null);
            new b.PopupClass(
            {
              title: "HP回復",
              content: "全ての魔法少女のHPを回復しました",
              closeBtnText: "OK",
              popupType: "typeC",
              popupId: "recoverOkPopup"
            }, null, null, null);
            b.androidKeyStop = !1
          }.bind(this), f.ajaxPost(b.linkList.accomplishCure,
          {}, a))
        }.bind(this),
        popupType: "typeC",
        popupId: "recoverConfirm"
      }, null, function()
      {
        var a = b.doc.createElement("div");
        a.innerHTML = '<div id="cautionWrap" class="flexBox se_tabs"><div class="checkBox"></div><div><div class="c_red">イベント期間中一度しか回復できません。</div>本当に回復しますか。</div></div>';
        b.doc.querySelector(".popupTextArea").appendChild(a);
        $("#recoverConfirm .decideBtn").addClass("off");
        $("#cautionWrap").on(b.cgti, function(a)
        {
          a.preventDefault();
          b.isScrolled() || (a.currentTarget.classList.toggle("current"), a.currentTarget.classList.contains("current") ? $("#recoverConfirm .decideBtn").removeClass("off") : $("#recoverConfirm .decideBtn").addClass("off"))
        })
      }, null))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
