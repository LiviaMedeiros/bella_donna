define("underscore backbone backboneCommon ajaxControl command text!template/gacha/GachaSaleSettingPopup.html text!css/gacha/GachaSaleSettingPopup.css".split(" "), function(h, f, b, n, p, k, l)
{
  f.Model.extend();
  var e, m = function()
  {
    var g = new(f.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .checkWrap"] = this.check;
        a[b.cgti + " #cautionWrap"] = this.checkCaution;
        a[b.cgti + " #clearBtn"] = this.clearBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = h.template(k)
      },
      render: function()
      {
        this.$el.html(this.template());
        var a = b.doc.createElement("style");
        a.setAttribute("type", "text/css");
        a.innerText = l;
        this.el.appendChild(a);
        return this
      },
      check: function(a)
      {
        a.preventDefault();
        b.isScrolled() || ("RANK_3" === a.currentTarget.dataset.filter && (a.currentTarget.classList.contains("current") ? (b.removeClass(b.doc.getElementById("cautionWrap"), "on"), b.removeClass(b.doc.getElementsByClassName("decideBtn")[0], "off")) : (b.addClass(b.doc.getElementById("cautionWrap"), "on"), b.addClass(b.doc.getElementsByClassName("decideBtn")[0], "off"))), a.currentTarget.classList.toggle("current"))
      },
      checkCaution: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a.currentTarget.classList.toggle("current"), b.doc.getElementsByClassName("decideBtn")[0].classList.toggle("off"))
      },
      clearBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = b.doc.getElementsByClassName("checkWrap");
          for (var d = 0; d < a.length;) b.removeClass(a[d], "current"), d = d + 1 | 0;
          b.doc.getElementById("cautionWrap").className = "se_tabs";
          b.removeClass(b.doc.getElementsByClassName("decideBtn")[0], "off")
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }));
    new b.PopupClass(
    {
      title: "自動設定",
      popupId: "saleSettingPopup",
      param:
      {
        width: "890px",
        height: "486px",
        top: "-webkit-calc(50% - 243px)",
        left: "-webkit-calc(50% - 445px)"
      },
      decideBtnText: "設定完了",
      decideBtnEvent: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = b.doc.getElementsByClassName("checkWrap");
          for (var d = [], c = 0; c < a.length;) a[c].classList.contains("current") && d.push(a[c].dataset.filter), c = c + 1 | 0;
          0 < c ? localStorage.setItem("GachaSaleSeting", d.join(",")) : localStorage.removeItem("GachaSaleSeting");
          b.g_popup_instance.popupView.close()
        }
      },
      closeBtnText: "キャンセル"
    }, null, function()
    {
      b.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(g.render().el);
      var a = localStorage.getItem("GachaSaleSeting");
      if (a)
        for (var a = a.split(","), d = b.doc.getElementsByClassName("checkWrap"), c = 0; c < d.length;) - 1 < a.indexOf(d[c].dataset.filter) && $(d[c]).trigger(b.cgti), c = c + 1 | 0
    }, function()
    {
      g.removeView();
      e && (e(), e = null)
    })
  };
  return {
    instantPopup: function(b)
    {
      e = b ? b : null;
      m()
    }
  }
});
