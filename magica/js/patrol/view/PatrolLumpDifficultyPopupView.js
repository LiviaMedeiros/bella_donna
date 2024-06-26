define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationDifficultyPopupView.html text!css/regularEvent/extermination/RegularEventExterminationDifficultyPopupView.css".split(" "), function(g, e, b, n, h, k, l)
{
  e.Model.extend();
  var m = e.View.extend(
  {
    id: "RegularEventExterminationDetailPopup",
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
          d = c.dataset.index;
        b.removeClass(c, "current");
        $("#enemyInfoList .enemyInfo[data-index=" + d + "]").removeClass("current");
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
    detailPop: function(a, c, d)
    {
      var e = d ? d : 1,
        f = new m(
        {
          difficultyModel: a,
          statusModel: c,
          index: e
        });
      c = function()
      {
        b.doc.querySelector("#popupArea .popupTextArea").appendChild(f.render().el);
        var a = document.createElement("style");
        a.setAttribute("type", "text/css");
        a.innerText = l;
        b.doc.getElementById("RegularEventExterminationDetailPopup").appendChild(a);
        $("#tabBtnList .tabBtn[data-index=" + e + "]").trigger(b.cgti);
        h.getBaseData(b.getNativeObj())
      }.bind(this);
      d = function()
      {
        f.removeView()
      }.bind(this);
      new b.PopupClass(
      {
        title: a.name + "　敵情報",
        popupId: "difficultyPopup",
        popupType: "typeA"
      }, null, c, d)
    }
  }
});
