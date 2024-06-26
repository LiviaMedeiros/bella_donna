define("underscore backbone backboneCommon ajaxControl cardUtil command js/view/chara/CharaListView js/view/chara/CharaDataView js/view/chara/CharaResultView js/view/chara/CharaImgView js/view/chara/RicheView".split(" "), function(v, k, b, l, w, d, m, n, p, q, r)
{
  var g = k.Model.extend(),
    a = {},
    t = k.View.extend(
    {
      className: "confirmPopupCurtain",
      render: function()
      {
        this.$el.html();
        return this
      }
    });
  a.CharaResultView = p;
  var h = null;
  a.charaViewInit = function(c)
  {
    var e = b.location.split("CharaList")[1].toLowerCase();
    a.curtainView || (a.curtainView = new t, $("#baseContainer").append(a.curtainView.render().el));
    a.charaDataView || (a.charaDataView = new n(
    {
      model: new g
    }), a.charaDataView.ccommon = this, $("#baseContainer").append(a.charaDataView.render().el));
    a.charaDataView.el.className = e + " show";
    a.richeView || (a.richeView = new r(
    {
      model: new g(l.getPageJson())
    }), $("#baseContainer").append(a.richeView.render().el));
    a.charaImgView || (a.charaImgView = new q(
    {
      model: new g
    }), b.content.append(a.charaImgView.render().el));
    a.charaListView ? a.charaListView.initSelectCardId = c : (a.charaListView = new m(
    {
      model: new g,
      collection: b.storage.userCardListEx
    }), b.content.append(a.charaListView.render().el), a.charaListView.initSelectCardId = c, a.charaListView.charaDataView = a.charaDataView, a.charaListView.charaImgView = a.charaImgView);
    a.charaListView.cardSort.multiSort();
    b.scrollSetX("charaListScrollWrap", "list");
    d.getBaseData(b.getNativeObj());
    a.checkCanEnhance();
    a.addIdComposeAttributeBtn();
    h = setTimeout(function()
    {
      b.removeClass(b.doc.querySelector("#btnArea"), "offLink")
    }, 750)
  };
  a.charaViewRemove = function()
  {
    -1 == b.location.indexOf("CharaListTop") && -1 == b.location.indexOf("CharaListCompose") && -1 == b.location.indexOf("CharaListComposeMagia") && -1 == b.location.indexOf("CharaListCustomize") && -1 == b.location.indexOf("CharaListEquip") && -1 == b.location.indexOf("CharaListComposeAttribute") && (a.charaListView && a.charaListView.trigger("remove"), a.charaDataView && a.charaDataView.remove(), a.charaImgView && a.charaImgView.remove(), a.charaListView && a.charaListView.removeView(), a.richeView && a.richeView.remove(), a.curtainView && a.curtainView.remove(), a.charaDataView = null, a.charaImgView = null, a.charaListView = null, a.richeView = null, f = a.curtainView = null, d.hideMiniChara(), h && clearTimeout(h))
  };
  var f = null;
  a.showMiniChara = function(a, e, u)
  {
    if (a != f || f && e || u)
    {
      e || (f = a);
      var c = {};
      c.id = String(f);
      c.x = 1024 === b.displayWidth ? 400 : 440;
      c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135;
      c.fade = .3;
      c.animeList = [b.miniCharaStandPose];
      d.hideMiniChara();
      setTimeout(function()
      {
        d.showMiniChara(c)
      }, 50)
    }
  };
  a.hideMiniChara = function(a)
  {
    d.hideMiniChara();
    a || (f = null)
  };
  a.playComposeEffect = function()
  {
    var a = {};
    a.x = 1024 === b.displayWidth ? 400 : 440;
    a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135;
    d.playComposeEffect(a)
  };
  a.playCustomizeEffect = function(a, e)
  {
    var c = {};
    c.x = 1024 === b.displayWidth ? 400 : 440;
    c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135;
    c.type = a;
    e && (c.value = e);
    d.playCustomizeEffect(c)
  };
  a.playBulkCustomizeEffect = function(a)
  {
    var c = {};
    c.x = 1024 === b.displayWidth ? 400 : 440;
    c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135;
    c.abilityList = a;
    d.playBulkCustomizeEffect(c)
  };
  a.playComposeResultEffect = function(a)
  {
    var c = {};
    c.x = 1024 === b.displayWidth ? 400 : 440;
    c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 175;
    c.type = a || 1;
    d.playComposeResultEffect(c)
  };
  a.playComposeMagiaEffect = function()
  {
    var a = {};
    a.x = 1024 === b.displayWidth ? 400 : 440;
    a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 175;
    d.playComposeMagiaEffect(a)
  };
  a.playComposeAttributeEffect = function(a, e)
  {
    var c = {};
    c.x = 1024 === b.displayWidth ? 400 : 440;
    c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135;
    c.type = a;
    e && (c.value = e);
    d.playComposeAttributeEffect(c)
  };
  a.playComposeAttributeBulkEffect = function(a)
  {
    var c = {};
    c.x = 1024 === b.displayWidth ? 400 : 440;
    c.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135;
    c.abilityList = a;
    d.playComposeAttributeEffect(c)
  };
  a.charaSelect = function(c)
  {
    $("#charaListElms .select").removeClass("select");
    b.addClass(c.el, "select");
    a.charaListView && a.charaListView.selectCardId != c.model.toJSON().userCardId && (a.charaListView.selectCardId = c.model.toJSON().userCardId, a.charaListView.charaDataView.model.clear(
    {
      silent: !0
    }), a.charaListView.charaImgView.model.clear(
    {
      silent: !0
    }), a.charaListView.charaDataView.model.set(c.model.toJSON()), a.charaListView.charaImgView.model.set(c.model.toJSON()), d.getBaseData(b.getNativeObj()), a.checkCanEnhance(), a.addIdComposeAttributeBtn())
  };
  a.checkCanEnhance = function()
  {
    b.doc.getElementById("btnArea") && a.charaListView.charaDataView.model.toJSON().chara.enhancementGroupId ? (b.removeClass(b.doc.getElementById("btnArea").getElementsByClassName("enhance")[0], "off"), 0 > b.historyArr[b.historyArr.length - 1].indexOf("CharaListTop") && (b.addClass(b.doc.getElementById("btnArea").getElementsByClassName("enhance")[0], "linkBtn"), b.doc.getElementById("btnArea").getElementsByClassName("enhance")[0].dataset.href = "#/CharaEnhancementTree/" + a.charaListView.charaDataView.model.toJSON().userCardId)) : b.doc.getElementById("btnArea") && b.addClass(b.doc.getElementById("btnArea").getElementsByClassName("enhance")[0], "off")
  };
  a.addIdComposeAttributeBtn = function()
  {
    b.doc.getElementById("btnArea") && $("#btnArea .composeAttribute").attr("data-href", "#/CharaListComposeAttribute/" + a.charaListView.charaDataView.model.toJSON().card.charaNo)
  };
  return a
});
