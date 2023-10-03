define("underscore backbone backboneCommon ajaxControl command text!template/quest/QuestBackground.html".split(" "), function(k, l, a, e, d, m)
{
  var f, h = function()
  {
    a.androidKeyStop = !1;
    a.globalMenuView && a.globalMenuView.trigger("removeView");
    if (window.isDebug && a.storage.userStatusList && a.storage.user && "312e6b2e-72c5-11e9-ba3e-06c4985d592a" === a.storage.user.get("id"))
      if (void 0 !== a.noticeAp && !0 === a.noticeAp)
      {
        var g = a.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON(),
          h = a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_ACP"
          }).toJSON(),
          g = a.getApRemainTime(g, h, e.getPageJson().currentTime);
        d.noticeApFullSet(g)
      }
    else void 0 === a.noticeAp && ($("#configCallback").on("configCallback", function(c, b)
    {
      $("#configCallback").off();
      a.noticeAp = 1 === b.ap ? !0 : !1;
      a.noticeAp && (c = a.storage.userStatusList.findWhere(
      {
        statusId: "ACP"
      }).toJSON(), b = a.storage.userStatusList.findWhere(
      {
        statusId: "MAX_ACP"
      }).toJSON(), c = a.getApRemainTime(c, b, e.getPageJson().currentTime), d.noticeApFullSet(c))
    }), d.noticeApConfig("configCallback"));
    f = new(l.View.extend(
    {
      initialize: function(c)
      {
        a.questNativeResponse = null;
        this.template = k.template(m);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(e.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }));
    $("#commandDiv").on("nativeCallback", function(c, b)
    {
      console.log("background:NativeCallback:", b);
      c = null;
      "purchasePopup" === b ? (d.setWebView(!0), a.questNativeResponse && a.questNativeResponse.userItemList && (c = {
        userItemList: a.questNativeResponse.userItemList
      }, a.responseSetStorage(c)), require(["js/view/purchase/PurchasePopup"], function(b)
      {
        e.ajaxSimpleGet(a.linkList.moneyShopList, "", function(a)
        {
          b.prototype.parentView || (b.prototype.parentView = f);
          new b(a, !0)
        })
      })) : (b.userItemList && (c = {
        userItemList: b.userItemList
      }, a.responseSetStorage(c)), b.webData ? (a.responseSetStorage(b.webData), a.questNativeResponse = b) : b.userQuestBattleResultList && "FAILED" === b.userQuestBattleResultList[0].questBattleStatus && "ARENA" !== b.userQuestBattleResultList[0].battleType && "ARENA_EVENT" !== b.userQuestBattleResultList[0].battleType ? (a.questNativeResponse && a.questNativeResponse.userItemList && (c = {
        userItemList: a.questNativeResponse.userItemList
      }, a.responseSetStorage(c)), a.questNativeResponse = b) : (a.questNativeResponse = b) && b.fox && (b.adjust ? d.setFoxData(b.fox, b.adjust) : d.setFoxData(b.fox)))
    })
  };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    }],
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      h()
    },
    startCommand: function() {},
    remove: function(a)
    {
      $("#commandDiv").off();
      f && f.removeView();
      a()
    }
  }
});
