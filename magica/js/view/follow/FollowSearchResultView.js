define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/view/follow/FollowTopListView"], function(g, e, d, m, f)
{
  return e.View.extend(
  {
    initialize: function()
    {
      this.listenTo(this.rootView, "removeView", this.removeView);
      f.prototype.parentView = this;
      f.prototype.template = g.template($("#userParts").text())
    },
    addResult: function(c)
    {
      if (!(1 > c.length))
      {
        var h = document.createDocumentFragment(),
          e = Date.parse(m.getPageJson().currentTime) / 1E3,
          k = !1;
        c[0].fields && (k = !0);
        var l = 0;
        g.each(c, function(a, b)
        {
          b = {};
          if (k)
            for (var c in a.fields) b[c] = a.fields[c][0];
          else b = a._source;
          b.displayTitleId && (b.displayTitle = {}, b.displayTitle.id = b.displayTitleId, b.displayTitle.name = b.titleName, b.displayTitle.font = b.titleFont, b.displayTitle.baseImage = b.titleBaseImage, b.displayTitle.sortKey = b.sortKey);
          a._id === d.storage.gameUser.get("userId") || d.storage.userFollowList.findWhere(
          {
            followUserId: a._id
          }) || (l++, b.id = a._id, b.charaName = b.charaName.replace(/userName/g, b.userName), (a = b.lastAccessDate ? Date.parse(b.lastAccessDate) / 1E3 : null) ? (a = (e - a) / 60, 16 > a ? a = "15分以内" : 60 > a ? a = Math.floor(a) + "分前" : 60 < a && 1440 > a ? a = Math.floor(a / 60) + "時間前" : (a = a / 60 / 24, a = 30 < a ? Math.floor(a / 30) + "カ月前" : Math.floor(a) + "日前")) : a = "-日前", b.loginTimeLag = a, b = new f(
          {
            model: b
          }, "search"), h.appendChild(b.render().el))
        });
        0 < l ? d.doc.getElementById("findListWrap").appendChild(h) : d.doc.getElementById("findListWrap").innerHTML = "<div class='noUser'>該当するプレイヤーが存在しません</div>"
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
