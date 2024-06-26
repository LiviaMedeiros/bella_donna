define("underscore backbone backboneCommon ajaxControl command text!template/quest/secondPartLast/EnemyDetailPopup.html text!css/quest/SecondPartLastEnemyDetailPopup.css".split(" "), function(g, d, b, n, h, k, l)
{
  d.Model.extend();
  var m = d.View.extend(
  {
    id: "EnemyDetailPopup",
    events: function()
    {
      var a = {};
      a[b.cgti + " .tabBtn"] = this.tabBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = g.template(k);
      this.difficultyModel = a.difficultyModel;
      this.statusModel = a.statusModel;
      this.index = a.index
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        difficultyModel: this.difficultyModel,
        statusModel: this.statusModel,
        current: this.index
      }));
      return this
    },
    tabBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c = b.doc.getElementById("tabBtnList").getElementsByClassName("current")[0],
          e = c.dataset.index;
        b.removeClass(c, "current");
        $("#enemyInfoList .enemyInfo[data-index=" + e + "]").removeClass("current");
        c = parseInt(a.currentTarget.dataset.index);
        b.addClass(a.currentTarget, "current");
        $("#enemyInfoList .enemyInfo[data-index=" + c + "]").addClass("current")
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  return {
    detailPop: function(a, c, e)
    {
      var d = e ? e : 0,
        f = new m(
        {
          difficultyModel: a,
          statusModel: c,
          index: d
        });
      a = function()
      {
        b.doc.querySelector("#popupArea .popupTextArea").appendChild(f.render().el);
        var a = document.createElement("style");
        a.setAttribute("type", "text/css");
        a.innerText = l;
        b.doc.getElementById("EnemyDetailPopup").appendChild(a);
        $("#tabBtnList .tabBtn[data-index=" + d + "]").trigger(b.cgti);
        h.getBaseData(b.getNativeObj())
      }.bind(this);
      c = function()
      {
        f.removeView()
      }.bind(this);
      new b.PopupClass(
      {
        title: "敵情報",
        popupId: "difficultyPopup",
        popupType: "typeA"
      }, null, a, c)
    }
  }
});
