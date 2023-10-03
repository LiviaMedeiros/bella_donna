define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/view/card/CardSortView"], function(c, m, a, n, f)
{
  c = function(b, a)
  {
    this.parentView = a;
    this.selectCardId = null;
    this.memoryHash = b;
    this.sortPrm = [];
    this.sortInit()
  };
  var g = {
      FIRE: 0,
      WATER: 1,
      TIMBER: 2,
      LIGHT: 3,
      DARK: 4,
      VOID: 5
    },
    h = {
      get: "入手",
      level: "レベル",
      rank: "レアリティ",
      atk: "ATK",
      def: "DEF",
      hp: "HP",
      eplv: "エピソードLv",
      rev: "魔力解放",
      mlv: "マギアLv",
      enhance: "精神強化",
      composeAttribute: "属性強化"
    },
    k = {
      get: "sortGet",
      level: "sortLv",
      rank: "sortRank",
      atk: "sortAtk",
      def: "sortDef",
      hp: "sortHp",
      eplv: "sortEplv",
      rev: "sortRev",
      mlv: "sortMlv",
      enhance: "sortEnhance",
      composeAttribute: "sortComposeAttribute"
    };
  c.prototype.sortStart = function(b)
  {
    b || (b = this.sortPrm);
    var c = "asc" === b[1] ? -1 : 1,
      e = a.doc.querySelector("#charaListElms");
    [].slice.call(e.querySelectorAll(".userCharaIcon")).map(function(a)
    {
      var c = Number(a.querySelector(".prm_" + b[0]).textContent),
        l = g[a.querySelector(".prm_att").textContent],
        d = Number(a.querySelector(".prm_charaId").textContent),
        e = Number(a.querySelector(".prm_rank").textContent);
      return {
        dom: a,
        value: c,
        value2: l,
        value3: d,
        value4: e
      }
    }).sort(function(a, d)
    {
      if (d.value < a.value) return -1 * c;
      if (d.value > a.value) return 1 * c;
      if ("get" !== b[0])
      {
        if (d.value2 < a.value2) return 1;
        if (d.value2 > a.value2) return -1;
        if (d.value4 > a.value4) return 1;
        if (d.value4 < a.value4) return -1;
        if (d.value3 > a.value3) return 1;
        if (d.value3 < a.value3) return -1
      }
      else
      {
        if (d.value3 < a.value3) return -1;
        if (d.value3 > a.value3) return 1
      }
      return 0
    }).forEach(function(a)
    {
      e.appendChild(a.dom)
    });
    a.doc.querySelector("#sortBtn").dataset.id = b[0];
    a.doc.querySelector("#sortBtn").textContent = h[b[0]];
    a.doc.querySelector(".orderBtn").dataset.id = b[1];
    a.doc.querySelector(".orderBtn").className = "orderBtn se_tabs TE " + b[1];
    a.doc.querySelector("#charaListElms").className = "list " + k[b[0]];
    this.parentView.filterFunc()
  };
  c.prototype.sortInit = function()
  {
    this.memoryHash ? (this.localStorageCheck(this.memoryHash), this.sortPrm[4] || (this.sortPrm[4] = null), this.sortPrm[5] || (this.sortPrm[5] = null)) : this.sortPrm = ["rank", "desc", null, null, null, null]
  };
  c.prototype.localStorageCheck = function(b)
  {
    b && b in a.sfml ? this.sortPrm = a.sfml[b] : !b || b in a.sfml || (this.sortPrm = ["rank", "desc", null, null, null, null], a.sfml[b] = this.sortPrm, a.sfm())
  };
  c.prototype.ascSort = function(b)
  {
    this.sortPrm[1] = b;
    this.memoryHash && (a.sfml[this.memoryHash] = this.sortPrm, a.sfm());
    this.multiSort(this.sortPrm)
  };
  c.prototype.sortPopupOpen = function(b)
  {
    f.prototype.cardSort = this;
    b = new f;
    new a.PopupClass(
    {
      popupType: "typeB"
    });
    a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(b.render().el);
    if (this.sortPrm[2])
    {
      b = 0;
      for (var d = this.sortPrm[2].split(","), c = d.length; b < c;) a.addClass(a.doc.querySelector("#filterAttList ." + d[b]), "current"), b = b + 1 | 0
    }
    else a.addClass(a.doc.querySelector("#filterAttList .ALL"), "current");
    if (this.sortPrm[3])
      for (b = 0, d = this.sortPrm[3].split(","), c = d.length; b < c;) a.addClass(a.doc.querySelector("#filterRankList ." + d[b]), "current"), b = b + 1 | 0;
    else a.addClass(a.doc.querySelector("#filterRankList .ALL"), "current");
    this.sortPrm[4] ? a.addClass(a.doc.querySelector("#filterEnhanceList ." + this.sortPrm[4]), "current") : a.addClass(a.doc.querySelector("#filterEnhanceList .ALL"), "current");
    if (this.sortPrm[5])
      for (b = 0, d = this.sortPrm[5].split(","), c = d.length; b < c;) a.addClass(a.doc.querySelector("#filterInitialList ." + d[b]), "current"), b = b + 1 | 0;
    else a.addClass(a.doc.querySelector("#filterInitialList .ALL"), "current");
    this.sortPrm[6] ? a.addClass(a.doc.querySelector("#filterComposeAttributeList ." + this.sortPrm[6]), "current") : a.addClass(a.doc.querySelector("#filterComposeAttributeList .ALL"), "current")
  };
  c.prototype.multiSort = function(b)
  {
    b && (this.sortPrm = b, this.memoryHash && (a.sfml[this.memoryHash] = this.sortPrm, a.sfm()));
    this.sortStart(this.sortPrm)
  };
  c.prototype.getSortId = function()
  {
    return this.sortPrm[0]
  };
  c.prototype.getAscId = function()
  {
    return this.sortPrm[1]
  };
  c.prototype.getFilterType = function()
  {
    return this.sortPrm[2]
  };
  c.prototype.getFilterRare = function()
  {
    return this.sortPrm[3]
  };
  c.prototype.getFilterEnhance = function()
  {
    return this.sortPrm[4]
  };
  c.prototype.getFilterInitial = function()
  {
    return this.sortPrm[5]
  };
  c.prototype.getFilterComposeAttribute = function()
  {
    return this.sortPrm[6]
  };
  return c
});
