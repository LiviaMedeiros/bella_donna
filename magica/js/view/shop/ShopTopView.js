define("underscore backbone backboneCommon ajaxControl command text!template/shop/ShopTop.html js/view/shop/ShopTopPartsView js/view/shop/ShopPopupView cardUtil memoriaUtil".split(" "), function(f, t, c, u, k, v, p, q, w, x)
{
  var g, y = function()
    {
      k.endL2d();
      var a, e, b = f.findWhere(g.campaignList,
      {
        campaignType: "SHOP_VIEW"
      });
      b && b.parameterMap && (a = b.parameterMap.LIVE2D, e = b.parameterMap.VOICEID);
      b = {};
      b.id = a ? a : "101799";
      b.x = 150;
      b.y = 1024 === c.displayWidth ? Math.floor(c.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(c.shortSize / 2);
      b.type = 0;
      b.key = e ? e + r() : "vo_game_0002_" + r();
      k.startL2d(b)
    },
    r = function()
    {
      var a = ["01", "02", "03", "04"],
        c = Number(g.currentTime.split(" ")[1].split(":")[0]),
        b = Number(g.currentTime.split(" ")[1].split(":")[1]);
      6 <= c && 9 >= c && !(9 == c && 0 < b) ? a.push("08") : 11 <= c && 13 >= c && !(13 == c && 0 < b) ? a.push("09") : 17 <= c && 19 >= c && !(19 == c && 0 < b) ? a.push("10") : 22 <= c || 0 === c && !(0 === c && 0 < b) ? a.push("11") : a.push("12");
      return a[Math.floor(Math.random() * a.length)]
    },
    m = function(a)
    {
      var e = 0;
      switch (a.itemId)
      {
        case "MONEY":
          e = "MONEY" !== a.shopType && "MONTHLY" !== a.shopType && "SELECTABLE_UNOWNED_CHARA" !== a.shopType ? c.getTotalStone().totalMoney : c.getTotalStone().userMoney;
          break;
        case "RICHE":
          e = c.storage.gameUser.get("riche");
          break;
        default:
          var b = f.findWhere(c.storage.userItemList.toJSON(),
          {
            itemId: a.itemId
          });
          b && (e = b.quantity)
      }
      b = {};
      b.iconImgPath = c.getIconImgPath(a.itemId);
      b.hasNum = e;
      return b
    };
  return t.View.extend(
  {
    events: function()
    {
      var a = {};
      a[c.cgti] = this.touch;
      a[c.cgti + " .shopBtn"] = this.toggleDisp;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this, "remove", this.removeView);
      this.listenTo(c.storage.gameUser, "change", this.amountCheck);
      this.listenTo(c.storage.userItemList, "change", this.amountCheck);
      this.firstView = a.firstView;
      g = u.getPageJson();
      this.template = f.template(v);
      this.popupView = q;
      this.cardUtil = w;
      this.memoriaUtil = x;
      this.conditionCheckItemIds = [];
      this.scrollObj = [];
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(g));
      return this
    },
    createDom: function()
    {
      c.content.append(this.render().el);
      p.prototype.rootView = this;
      p.prototype.template = f.template($("#shopParts").text());
      q.prototype.rootView = this;
      this.popupTemplate = f.template($("#shopPopupTempCard").text());
      this.popupTemplateMoney = f.template($("#shopPopupTempMoney").text());
      var a = g.shopList,
        a = f.sortBy(a, "sortkey"),
        e = this,
        b = c.doc.createDocumentFragment();
      this.buyNum = [];
      f.each(a, function(a, d)
      {
        var n = e.makeTabBtnAndBaseDom(a, d),
          l = c.doc.createDocumentFragment();
        if (0 < a.shopItemList.length)
        {
          var k = 0,
            h = f.sortBy(a.shopItemList, "sortkey"),
            m = 0;
          f.each(h, function(b)
          {
            if ("GEM" === b.shopItemType)
            {
              var d = c.storage.userCharaList.findWhere(
              {
                charaId: Number(b.genericId)
              });
              if (!d) return;
              1042 === Number(b.genericId) && (b.description = c.storage.user.get("loginName") + "の魔力解放に使用するアイテム")
            }
            else "LIVE2D" === b.shopItemType && c.storage.userLive2dList ? c.storage.userLive2dList.findWhere(
            {
              charaId: b.live2d.charaId,
              live2dId: b.live2d.live2dId
            }) && (b.alreadyGet = !0) : "ITEM" === b.shopItemType && "BACKGROUND" === b.item.itemType ? c.storage.userItemList.findWhere(
            {
              itemId: b.item.itemCode
            }) && (b.alreadyGet = !0) : "FORMATION_SHEET" === b.shopItemType ? c.storage.userFormationSheetList.findWhere(
            {
              formationSheetId: b.formationSheet.id
            }) && (b.alreadyGet = !0) : "CARD" === b.shopItemType && (1042 === b.chara.id && (b.name = c.storage.user.get("loginName"), "DESTINY_CRYSTAL" === b.needItemId && (b.name = "【期間限定】" + b.name)), "SELECTABLE_UNOWNED_CHARA" === a.shopType && (d = c.storage.userCharaList.findWhere(
            {
              charaId: b.chara.id
            }))) && (b.alreadyGet = !0);
            if (g.currentTime >= b.startAt && g.currentTime < b.endAt || !b.endAt && g.currentTime >= b.startAt || !b.startAt && !b.endAt)
            {
              d = new p;
              d.model = b;
              f.findWhere(g.userShopItemList,
              {
                shopItemId: b.id
              }) && (d.userShopModel = f.findWhere(g.userShopItemList,
              {
                shopItemId: b.id
              }), m += d.userShopModel.num);
              l.appendChild(d.render().el);
              b.recommend && c.addClass(n, "recommend");
              if (b.openConditionIdList)
                for (d = 0; d < b.openConditionIdList.length; d++) e.conditionCheckItemIds.push(b.openConditionIdList[d]);
              k++
            }
          });
          1 > k && (h = c.doc.createElement("p"), h.innerText = "現在商品購入可能な商品がありません。", h.className = "noItem", l.appendChild(h));
          0 < m && (e.buyNum[a.shopId] = m)
        }
        else h = c.doc.createElement("p"), h.innerText = "現在商品購入可能な商品がありません。",
          h.className = "noItem", l.appendChild(h);
        b.appendChild(n);
        c.doc.getElementById(a.shopId).appendChild(l);
        0 == d && "SELECTABLE_UNOWNED_CHARA" === a.shopType && (d = a.name.replace(/＠/g, ""), h = e.getShopItemNum(a.shopId), d = h.listNum === h.thisHadNum ? d + "　（オファー：COMPLETE）" : d + ("　(オファー可能：" + (h.listNum - h.thisHadNum) + "/" + h.listNum + "）"), c.doc.getElementById("listTitle").innerHTML = d);
        e.scrollObj.push("type" + a.shopId)
      });
      c.doc.getElementById("btnWrap").getElementsByClassName("btnScrollInner")[0].appendChild(b);
      c.scrollSetX("btnWrap", "btnScrollInner");
      for (var n in this.scrollObj) c.scrollSet("lists", this.scrollObj[n]);
      b = null;
      c.setGlobalView();
      y();
      k.getBaseData(c.getNativeObj());
      f.findWhere(g.shopList,
      {
        shopId: Number(this.displayType)
      });
      c.storage.userItemList.toJSON();
      this.amountCheck();
      this.shopLimitCounter = Date.parse(new Date) / 1E3 | 0;
      null !== this.firstView && (f.findWhere(g.shopList,
      {
        shopId: Number(this.firstView)
      }) ? (this.toggleDisp(null, this.firstView), c.forceScrollXPreset("btnWrap", "btnScrollInner", "#/btn" + this.firstView, !0)) : new c.PopupClass(
      {
        title: "期間外",
        content: "期間外のため<br>対象のショップは存在しません",
        closeBtnText: "OK",
        popupType: "typeC"
      }));
      for (var d in this.scrollObj) c.scrollRefresh("lists", this.scrollObj[d], !0);
      c.ready.hide()
    },
    makeTabBtnAndBaseDom: function(a, e)
    {
      var b = c.doc.createElement("li");
      0 < e ? b.className = "shopBtn TE se_tabs tabs" + a.shopId : (this.displayType = Number(a.shopId), b.className = "shopBtn TE se_tabs tabs" + a.shopId + " current", c.doc.getElementById("listTitle").innerHTML = a.name.replace(/＠/g, ""), this.currentShopModel = a);
      switch (a.shopType)
      {
        case "SPECIAL":
        case "CAMPAIGN":
        case "MONEY":
        case "SPECIAL_COMPLETE_INVISIBLE":
          b.className += " specialBtn";
          break;
        case "SELECTABLE_UNOWNED_CHARA":
          b.className += " specialBtn2"
      }
      b.innerHTML = "<span>" + a.name.replace(/＠/g, "<br>") + "<div class='recommendMark'></div></span>";
      b.dataset.shoptype = a.shopId;
      b.dataset.scrollHash = "#/btn" + a.shopId;
      var f = m(a),
        d = c.doc.createElement("img");
      d.src = f.iconImgPath;
      d.className = "tabItemIcon";
      b.appendChild(d);
      if ("MONEY" === a.shopType || "MONTHLY" === a.shopType || "SELECTABLE_UNOWNED_CHARA" === a.shopType) d = c.doc.createElement("img"), d.src = "/magica/resource/image_web/common/icon/icon_purchased.png",
        d.className = "tabPurchasedIcon", b.appendChild(d);
      f = c.doc.createDocumentFragment();
      d = c.doc.createElement("div");
      d.id = a.shopId;
      d.className = 0 < e ? "listWrap noDisp type" + a.shopId : "listWrap type" + a.shopId;
      f.appendChild(d);
      c.doc.getElementById("lists").appendChild(f);
      return b
    },
    touch: function(a)
    {
      a.preventDefault();
      a.target.dataset.touchwrap && !c.isScrolled() && (a = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0] : a.originalEvent, k.motionL2d(
      {
        x: a.pageX,
        y: a.pageY
      }))
    },
    toggleDisp: function(a, e)
    {
      if (a && (a.preventDefault(), c.isScrolled() || this.displayType === a.target.dataset.shoptype)) return;
      a = e ? Number(e) : Number(a.target.dataset.shoptype);
      c.addClass(c.doc.getElementById(this.displayType), "noDisp");
      c.removeClass(c.doc.getElementById(a), "noDisp");
      c.removeClass(c.doc.getElementById("btnWrap").getElementsByClassName("current")[0], "current");
      c.addClass(c.doc.getElementById("btnWrap").getElementsByClassName("tabs" + a)[0], "current");
      for (var b in this.scrollObj) c.scrollRefresh("lists", this.scrollObj[b], !0);
      this.displayType = a;
      b = f.findWhere(g.shopList,
      {
        shopId: Number(this.displayType)
      });
      c.storage.userItemList.toJSON();
      this.currentShopModel = b;
      a = m(b);
      "MONEY" !== b.shopType && "MONTHLY" !== b.shopType && "SELECTABLE_UNOWNED_CHARA" !== b.shopType ? c.removeClass(c.doc.getElementById("hasItems").getElementsByClassName("purchasedIcon")[0], "on") : c.addClass(c.doc.getElementById("hasItems").getElementsByClassName("purchasedIcon")[0], "on");
      c.doc.getElementById("hasItems").getElementsByClassName("costIcon")[0].src = a.iconImgPath;
      c.doc.getElementById("hasItems").getElementsByClassName("pointFrame")[0].innerText = a.hasNum;
      a = b.name.replace(/＠/g, "");
      "SELECTABLE_UNOWNED_CHARA" === b.shopType && (b = this.getShopItemNum(this.displayType), a = b.listNum === b.thisHadNum ? a + "　（オファー：COMPLETE）" : a + ("　(オファー可能：" + (b.listNum - b.thisHadNum) + "/" + b.listNum + "）"));
      c.doc.getElementById("listTitle").innerText = a;
      e || this.trigger("haveNumberAllCheck")
    },
    amountCheck: function()
    {
      var a = f.findWhere(g.shopList,
      {
        shopId: Number(this.displayType)
      });
      c.storage.userItemList.toJSON();
      var e = m(a);
      "MONEY" !== a.shopType && a.shopType && "SELECTABLE_UNOWNED_CHARA" !== a.shopType ? c.removeClass(c.doc.getElementById("hasItems").getElementsByClassName("purchasedIcon")[0], "on") : c.addClass(c.doc.getElementById("hasItems").getElementsByClassName("purchasedIcon")[0], "on");
      c.doc.getElementById("hasItems").getElementsByClassName("costIcon")[0].src = e.iconImgPath;
      c.doc.getElementById("hasItems").getElementsByClassName("pointFrame")[0].innerText = e.hasNum
    },
    conditionCheck: function(a)
    {
      if (-1 !== this.conditionCheckItemIds.indexOf(a | 0))
      {
        this.trigger("conditionChecks", a | 0);
        for (var e in this.scrollObj) c.scrollRefresh("lists", this.scrollObj[e])
      }
    },
    conditionFlag: function(a, c)
    {
      var b = !0;
      a = f.findWhere(g.shopList,
      {
        shopId: a
      });
      for (var e = c.length, d = 0; d < e; d++)
      {
        var l = c[d] | 0,
          k = f.findWhere(a.shopItemList,
          {
            id: l
          }),
          l = f.findWhere(g.userShopItemList,
          {
            shopItemId: l
          });
        k && l && k.limitedNumber ? 0 < k.limitedNumber - l.num && (b = !1, ShopTop) : b = !1;
        b || (d = e)
      }
      return b
    },
    getShopItemNum: function(a)
    {
      var e = {};
      a = c.doc.getElementById(String(a));
      e.listNum = a.getElementsByClassName("shopItemWrap").length;
      e.thisHadNum = a.getElementsByClassName("thisHad").length;
      return e
    },
    removeView: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
