define("underscore backbone backboneCommon ajaxControl command text!template/test/SubSecondTest.html text!css/test/SubSecondTest.css".split(" "), function(f, g, b, d, c, h, k)
{
  var e, l = g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .placeNum"] = this.changeBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = f.template(h);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(d.getPageJson()));
      return this
    },
    createDom: function()
    {
      b.setGlobalView();
      b.content.append(this.render().el);
      b.ready.hide()
    },
    changeBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = a.currentTarget.dataset.nums | 0, c.moveSubQuestBgPart2(
      {
        logoId: a,
        textId: a
      }))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    }],
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(k);
      e = new l;
      c.showSubQuestBgPart2(
      {
        logoId: 1,
        textId: 1
      })
    },
    remove: function(a)
    {
      c.hideSubQuestBg();
      e.removeView();
      a()
    }
  }
});
