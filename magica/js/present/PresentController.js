define("underscore backbone backboneCommon ajaxControl command text!template/present/PresentController.html text!css/present/PresentController.css".split(" "), function(e, h, b, k, l, f, g)
{
  return {
    create: function()
    {
      var a = b.doc.getElementById("presentTabBtnWrap");
      if (a)
        for (var a = a.getElementsByClassName("linkBtn"), c = a.length, d = 0; d < c;) 0 <= a[d].dataset.href.indexOf(b.location) ? (b.addClass(a[d], "current"), a[d].linkBtnFlg = !1) : b.removeClass(a[d], "current"), d = d + 1 | 0;
      else a = e.template(f), $("#baseContainer").append(a(
        {
          pageLocation: b.location
        })),
        a = b.doc.getElementById("presentTabBtnWrap"), c = document.createElement("style"), c.setAttribute("type", "text/css"), c.innerText = g, a.appendChild(c)
    },
    remove: function()
    {
      var a = ["PresentList", "PresentHistory"],
        c = b.doc.getElementById("presentTabBtnWrap");
      c && 0 > a.indexOf(b.location) && c.remove()
    }
  }
});
