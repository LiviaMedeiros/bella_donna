define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(g, h, a, l, k)
{
  return h.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " li"] = this.itemSelectFunc;
      return b
    },
    initialize: function()
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.selectMaterial = [];
      this.proveMaterial = [];
      this.selectCount = 0
    },
    render: function() {},
    itemSelectFunc: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
        if (this.rootView.targetView.model.toJSON().id)
        {
          this.rootView.setViewFlag = "material";
          if (0 < this.selectMaterial.length)
          {
            b = [];
            for (var d = this.selectMaterial.length; 0 < d;) d--, b.push(this.selectMaterial[d]);
            this.proveMaterial = b
          }
          "compose" === a.composeMode ? this.rootView.cardListView.composeDisplayHandler() : this.rootView.cardListView.limitBreakDisplayHandler();
          a.ready.show();
          a.doc.getElementById("useMaterialResetBtn").style.display = "block";
          a.doc.getElementById("materialDecideBtn").style.display = "block";
          a.doc.getElementById("mainWrap").style.display = "none";
          a.addClass(a.doc.getElementById("cardListWrap"), "material");
          a.addClass(a.doc.getElementById("memoriaComposeGlowArea"), "off");
          setTimeout(function()
          {
            cardListWrap.style.display = "block";
            a.scrollRefresh("scrollMain", "scrollInner");
            a.ready.hide()
          }, 200);
          var e = this,
            c = a.doc.getElementById("globalBackBtn"),
            f = function(b)
            {
              e.rootView.wrapCloseFunc(b);
              c.removeEventListener(a.cgti, f);
              e.selectItemUpdate()
            };
          c.setAttribute("data-noLink", "true");
          c.setAttribute("data-wrap-id", "cardListWrap");
          c.addEventListener(a.cgti, f)
        }
      else new a.PopupClass(
      {
        title: "強化確認",
        content: "先に強化対象を選択してください。",
        closeBtnText: "閉じる"
      })
    },
    selectItemUpdate: function()
    {
      this.useItemViewReset();
      this.rootView.statusView.afterStatusUpdate();
      g.each(this.selectMaterial, function(b, d)
      {
        var e = a.doc.createDocumentFragment(),
          c = a.doc.createElement("img");
        c.src = "/magica/resource/image_web/memoria/memoria_" + b.pieceId + "_s.png";
        c.className = "materialIcon";
        e.appendChild(c);
        c = a.doc.createElement("p");
        c.className = "iconLbWrap iconLbCount" + b.lbCount;
        c.innerHTML = "<span class='lb1'></span><span class='lb2'></span><span class='lb3'></span><span class='lb4'></span>";
        e.appendChild(c);
        a.doc.querySelectorAll("#useItem li")[d].appendChild(e)
      });
      k.getBaseData(a.getNativeObj())
    },
    useItemSelectReset: function()
    {
      for (var b = a.doc.getElementById("cardListWrap").getElementsByClassName("materialSelect"), d = b.length; 0 < d;) d--, a.removeClass(b[d], "materialSelect");
      a.removeClass(a.doc.getElementById("cardWrap"), "reachMaxLevel");
      this.selectCount = 0;
      this.selectMaterial = [];
      this.proveMaterial = [];
      this.useItemViewReset();
      this.rootView.statusView.afterStatusUpdate();
      a.doc.querySelector("#costRiche .riche").textContent = 0
    },
    useItemViewReset: function()
    {
      for (var b = 0; 10 > b;) a.doc.querySelectorAll("#useItem li")[b].textContent = "", b = b + 1 | 0
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
