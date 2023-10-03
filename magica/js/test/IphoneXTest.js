define("underscore backbone backboneCommon ajaxControl command text!template/test/IphoneXTest.html text!css/test/IphoneXTest.css".split(" "), function(e, f, a, c, g, h, k)
{
  var d, m = f.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = e.template(h);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(c.getPageJson()));
      return this
    },
    createDom: function()
    {
      a.setGlobalView();
      a.content.append(this.render().el);
      var l = a.doc.getElementById("debugSafeArea"),
        b = window.getComputedStyle(a.doc.getElementsByTagName("body")[0]);
      l.innerHTML = "padding-left:" + b.getPropertyValue("padding-left").replace(/[^0-9]/g, "") + "<br>padding-right:" + b.getPropertyValue("padding-right").replace(/[^0-9]/g, "") + "<br>padding-bottom:" + b.getPropertyValue("padding-bottom").replace(/[^0-9]/g, "");
      a.ready.hide()
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
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(k);
      d = new m
    },
    startCommand: function()
    {
      g.changeBg("web_0011.ExportJson")
    },
    remove: function(a)
    {
      d.remove();
      a()
    }
  }
});
