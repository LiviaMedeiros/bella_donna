define("underscore backbone backboneCommon ajaxControl js/view/memoria/MemoriaSortView js/view/memoria/bulkSelectPopupView".split(" "), function(q, c, f, t, m, n)
{
  var k = {
      RANK_1: 0,
      RANK_2: 1,
      RANK_3: 2,
      RANK_4: 3,
      RANK_5: 4
    },
    h = ["get", "desc", null, null, null, null, 1, null, null, null],
    r = ["get", "desc", null, null, null, null, 1, null, null, null, null];
  c = function(a, b)
  {
    this.memoryHash = a;
    this.parentView = b;
    this.sortPrm = [];
    this.selectPrm = r;
    this.sortInit()
  };
  c.prototype.sortStart = function(a)
  {
    a || (a = this.sortPrm);
    var b = "asc" === a[1] ? 1 : -1,
      d, p = 0;
    "MemoriaList" === f.location || "PieceArchive" === f.location ? d = f.doc.getElementById("memoriaWrapInner") : "MemoriaCompose" === f.location ? d = f.doc.getElementById("cardWrap") : "MemoriaEquip" === f.location && (d = f.doc.getElementById("scrollInner"));
    var c = !1,
      g = window.getComputedStyle(d).display;
    if ("flex" === g || "-webkit-flex" === g) c = !0;
    [].slice.call(d.querySelectorAll(".userMemoriaIcon")).map(function(a)
    {
      var b = a.getElementsByClassName("paramWrap")[0].dataset;
      return {
        dom: a,
        param: b
      }
    }).sort(function(e, d)
    {
      if ("rank" == a[0])
      {
        if (k[d.param.rank] < k[e.param.rank]) return -1 * b;
        if (k[d.param.rank] > k[e.param.rank]) return 1 * b
      }
      else if ("level" == a[0])
      {
        if (Number(d.param.level) < Number(e.param.level)) return -1 * b;
        if (Number(d.param.level) > Number(e.param.level)) return 1 * b
      }
      else if ("atk" == a[0])
      {
        if (Number(d.param.atk) < Number(e.param.atk)) return -1 * b;
        if (Number(d.param.atk) > Number(e.param.atk)) return 1 * b
      }
      else if ("def" == a[0])
      {
        if (Number(d.param.def) < Number(e.param.def)) return -1 * b;
        if (Number(d.param.def) > Number(e.param.def)) return 1 * b
      }
      else if ("hp" == a[0])
      {
        if (Number(d.param.hp) < Number(e.param.hp)) return -1 * b;
        if (Number(d.param.hp) > Number(e.param.hp)) return 1 * b
      }
      else if ("lb" == a[0])
      {
        if (Number(d.param.lb) < Number(e.param.lb)) return -1 * b;
        if (Number(d.param.lb) > Number(e.param.lb)) return 1 * b
      }
      if ("get" !== a[0])
      {
        if (Number(d.param.pieceId) < Number(e.param.pieceId)) return -1 * b;
        if (Number(d.param.pieceId) > Number(e.param.pieceId)) return 1 * b
      }
      if (Date.parse(d.param.created) < Date.parse(e.param.created)) return -1 * b;
      if (Date.parse(d.param.created) > Date.parse(e.param.created)) return 1 * b;
      if ("get" === a[0])
      {
        if (Number(d.param.pieceId) < Number(e.param.pieceId)) return -1 * b;
        if (Number(d.param.pieceId) > Number(e.param.pieceId)) return 1 * b
      }
      return 0
    }).forEach(function(b)
    {
      if (c)
      {
        var e = p;
        a[8] && b.dom.classList.contains("equiped") && (e = e - 1E3 | 0);
        "PieceArchive" === f.location && a[4] && b.dom.classList.contains("effective") && (e = e - 1E3 | 0);
        b.dom.style.WebkitOrder = e;
        b.dom.style.order = e;
        p = p + 1 | 0
      }
      else a[8] && b.dom.classList.contains("equiped") && (b.dom.style.WebkitOrder = "-1000", b.dom.style.order = "-1000"), d.appendChild(b.dom)
    });
    this.parentView && this.parentView.afterFilterFunc()
  };
  c.prototype.sortInit = function()
  {
    if (this.memoryHash)
    {
      this.localStorageCheck(this.memoryHash);
      for (var a = 4; a < h.length;) void 0 === this.sortPrm[a] && (this.sortPrm[a] = h[a]), a = a + 1 | 0;
      f.sfml[this.memoryHash] = this.sortPrm;
      f.sfm()
    }
    else this.sortPrm = h
  };
  c.prototype.localStorageCheck = function(a)
  {
    a && a in f.sfml ? this.sortPrm = f.sfml[a] : !a || a in f.sfml || (this.sortPrm = h, f.sfml[a] = this.sortPrm, f.sfm())
  };
  c.prototype.ascSort = function(a)
  {
    this.sortPrm[1] = a;
    this.multiSort(this.sortPrm)
  };
  c.prototype.sortPopupOpen = function(a)
  {
    var b;
    m.prototype.cardSort = this;
    b = new m;
    new f.PopupClass(
    {
      popupType: "typeB"
    }, null, null, function()
    {
      b.removeView()
    });
    f.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(b.render().el);
    a = f.doc.getElementById("sortfilter").getElementsByClassName("filterList");
    for (var d = 0, p = a.length; d < p;)
    {
      var c = parseInt(a[d].dataset.sortid);
      if (this.sortPrm[c])
        for (var c = this.sortPrm[c].split(","), g = a[d].getElementsByClassName("filterBtn"), e = 0, h = g.length; e < h;) g[e].classList.contains("ALL") || -1 < c.indexOf(g[e].dataset.filter) && g[e].classList.add("current"), e = e + 1 | 0;
      else a[d].getElementsByClassName("ALL")[0].classList.add("current");
      d = d + 1 | 0
    }
  };
  c.prototype.bulkSelectPopupOpen = function(a)
  {
    var b;
    n.prototype.cardSort = this;
    b = new n(
    {
      rootView: a.rootView
    });
    new f.PopupClass(
    {
      popupType: "typeB"
    }, null, null, function()
    {
      b.removeView()
    });
    f.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(b.render().el);
    a = f.doc.getElementById("sortfilter").getElementsByClassName("filterList");
    for (var d = 0, c = a.length; d < c;) a[d].getElementsByClassName("ALL")[0].classList.add("current"), d = d + 1 | 0
  };
  c.prototype.firstSort = function()
  {
    this.sortPrm && this.sortStart(this.sortPrm)
  };
  c.prototype.multiSort = function(a)
  {
    this.sortPrm = a;
    this.sortStart(this.sortPrm);
    a = [];
    for (var b = 0; b < h.length;) a.push(this.sortPrm[b]), b = b + 1 | 0;
    this.memoryHash && (f.sfml[this.memoryHash] = a, f.sfm())
  };
  c.prototype.saveMemory = function()
  {
    if (this.sortPrm && this.memoryHash)
    {
      for (var a = [], b = 0; b < h.length;) a.push(this.sortPrm[b]), b = b + 1 | 0;
      f.sfml[this.memoryHash] = a;
      f.sfm()
    }
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
  c.prototype.getFilterEvent = function()
  {
    return this.sortPrm[4]
  };
  c.prototype.getFilterLock = function()
  {
    return this.sortPrm[5]
  };
  c.prototype.getDisplaySize = function()
  {
    return this.sortPrm[6]
  };
  c.prototype.getEffectType = function()
  {
    return this.sortPrm[7]
  };
  c.prototype.getPrimary = function()
  {
    return this.sortPrm[8]
  };
  c.prototype.getFilterCompose = function()
  {
    return this.sortPrm[9]
  };
  c.prototype.isFilterOn = function()
  {
    return null !== this.sortPrm[2] || null !== this.sortPrm[3] || null !== this.sortPrm[5] || null !== this.sortPrm[7] || null !== this.sortPrm[9]
  };
  c.prototype.isHideFilterType = function(a)
  {
    var b = !1;
    if (null !== this.sortPrm[2])
    {
      var d = ["REINFORCEMENT", "LIMIT_BREAK"],
        c = this.getFilterType();
      if (-1 < c.indexOf("REINFORCEMENT")) 0 > d.indexOf(a.piece.pieceKind) && 0 > c.indexOf(a.piece.pieceType) && (b = !0);
      else if (-1 < d.indexOf(a.piece.pieceKind) || 0 > c.indexOf(a.piece.pieceType)) b = !0
    }
    return b
  };
  c.prototype.isHideFilterEffect = function(a)
  {
    var b = !1;
    if (null !== this.sortPrm[7])
    {
      var d = !1;
      q.each(a.effectType, function(a, b)
      {
        -1 !== this.sortPrm[7].indexOf(a) && (d = !0)
      }.bind(this));
      d || (b = !0)
    }
    return b
  };
  c.prototype.isHideFilterRank = function(a)
  {
    var b = !1;
    null !== this.sortPrm[3] && 0 > this.sortPrm[3].indexOf(a.piece.rank) && (b = !0);
    return b
  };
  c.prototype.isHideFilterLock = function(a)
  {
    var b = !1;
    null !== this.sortPrm[5] && ("LOCKED" !== this.sortPrm[5] || a.protect ? "UNLOCKED" === this.sortPrm[5] && a.protect && (b = !0) : b = !0);
    return b
  };
  c.prototype.isHideFilterCompose = function(a)
  {
    var b = !1;
    if (null !== this.sortPrm[9])
    {
      var b = !1,
        d = -1 < this.sortPrm[9].indexOf("LV_MAX"),
        c = -1 < this.sortPrm[9].indexOf("LB_MAX"),
        f = -1 < this.sortPrm[9].indexOf("ETC"),
        g = -1 < a.indexOf("lvMax");
      a = -1 < a.indexOf("lbMax");
      d && c && g && a ? b = !0 : d && !c && g && !a ? b = !0 : !d && c && !g && a ? b = !0 : !f || g || a || (b = !0);
      b = !b
    }
    return b
  };
  c.prototype.checkBulkSelect = function(a)
  {
    var b = a.pieceModel,
      d = a.pieceClassText;
    a = a.hideFlg;
    var c = this.selectPrm,
      f = !1,
      g = {
        type: !1,
        rank: !1,
        lock: !1,
        compose: !1,
        special: !1
      };
    if (null !== c[2])
    {
      var e = !1,
        h = ["REINFORCEMENT", "LIMIT_BREAK"],
        l = c[2];
      if (-1 < l.indexOf("REINFORCEMENT")) 0 > h.indexOf(b.piece.pieceKind) && 0 > l.indexOf(b.piece.pieceType) && (e = !0);
      else if (-1 < h.indexOf(b.piece.pieceKind) || 0 > l.indexOf(b.piece.pieceType)) e = !0;
      g.type = !e; - 1 < c[2].indexOf("ALL") && (g.type = !0)
    }
    null !== c[3] && (-1 < c[3].indexOf(b.piece.rank) && (g.rank = !0), -1 < c[3].indexOf("ALL") && (g.rank = !0));
    null !== c[5] && (e = !1, "LOCKED" !== c[5] || b.protect ? "UNLOCKED" === c[5] && b.protect && (e = !0) : e = !0, g.lock = !e, -1 < c[5].indexOf("ALL") && (g.lock = !0));
    if (null !== c[9])
    {
      var b = -1 < c[9].indexOf("LV_MAX"),
        e = -1 < c[9].indexOf("LB_MAX"),
        h = -1 < c[9].indexOf("ETC"),
        l = -1 < d.indexOf("lvMax"),
        k = -1 < d.indexOf("lbMax");
      b && e && l && k ? g.compose = !0 : b && !e && l && !k ? g.compose = !0 : !b && e && !l && k ? g.compose = !0 : !h || l || k || (g.compose = !0); - 1 < c[9].indexOf("ALL") && (g.compose = !0)
    }
    null !== c[10] && (b = c[10].split(","), q.each(b, function(a, b, c)
    {
      "EVENT" == a && (-1 < d.indexOf("effective") || -1 < d.indexOf("regularEffective") || -1 < d.indexOf("overEffective")) && (g.special = !0)
    }), -1 < c[10].indexOf("ALL") && (g.special = !0));
    var m = 0,
      n = 0;
    q.each(g, function(a, b, c)
    {
      m++;
      a && n++
    });
    m == n && (f = !0); - 1 < d.indexOf("selected") && (f = !0); - 1 < d.indexOf("equiped") && (f = !1);
    a && (f = !1);
    return f
  };
  c.prototype.resetSelectPrm = function()
  {
    this.selectPrm = r
  };
  c.prototype.setDefaultSelectPrm = function()
  {
    this.selectPrm = ["get", "desc", "ALL", "ALL", "ALL", "ALL", 1, null, null, "ALL", "ALL"]
  };
  c.prototype.getSortPrm = function(a)
  {
    a.filterType = this.sortPrm[2];
    a.rankFilter = this.sortPrm[3];
    a.lockFilter = this.sortPrm[5];
    a.effectFilter = this.sortPrm[7];
    a.equipedPrimary = this.sortPrm[8];
    a.composeFilter = this.sortPrm[9]
  };
  return c
});
