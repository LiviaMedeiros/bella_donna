define("underscore backbone backboneCommon ajaxControl command text!template/test/TipsTest.html text!css/test/TipsTest.css".split(" "), function(f, g, b, d, c, h, k)
{
  var e, l = g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .nextBtn"] = this.next;
      a[b.cgti + " .prevBtn"] = this.prev;
      return a
    },
    initialize: function(a)
    {
      this.template = f.template(h);
      this.createDom();
      this.tipsNum = 0;
      this.tipsMaxNum = c.tipsObj.length;
      console.log(this)
    },
    render: function()
    {
      this.$el.html(this.template(d.getPageJson()));
      return this
    },
    next: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this.tipsNum = this.tipsNum + 1 >= this.tipsMaxNum ? 0 : this.tipsNum + 1, this.playTips(this.tipsNum), this.numUpdate(this.tipsNum))
    },
    prev: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (0 > this.tipsNum - 1 ? this.tipsNum = this.tipsMaxNum - 1 : --this.tipsNum, this.playTips(this.tipsNum), this.numUpdate(this.tipsNum))
    },
    createDom: function()
    {
      b.globalMenuView && b.globalMenuView.remove();
      this.playTips();
      b.content.append(this.render().el);
      b.ready.hide()
    },
    playTips: function(a)
    {
      console.log(a);
      c.startLoading(
      {
        tips: c.tipsObj[a || 0]
      })
    },
    numUpdate: function(a)
    {
      b.doc.querySelector("#cnt").innerText = a + 1
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
      b.androidKeyStop = !0;
      b.setStyle(k);
      e = new l
    },
    remove: function(a)
    {
      e.remove();
      a()
    }
  }
});
