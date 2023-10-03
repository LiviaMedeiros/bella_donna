define("underscore backbone backboneCommon ajaxControl command text!template/campaign/sumo/CampaignSumoTop.html text!css/campaign/sumo/CampaignSumoTop.css".split(" "), function(e, f, b, g, c, h, k)
{
  var d, l = f.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .outerLinkBtn"] = this.outerLink;
      return a
    },
    initialize: function(a)
    {
      this.template = e.template(h);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(b.storage));
      return this
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      b.setGlobalView();
      c.getBaseData(b.getNativeObj());
      b.ready.hide()
    },
    outerLink: function(a)
    {
      a.preventDefault();
      b.isScrolled() || c.browserOpen("http://magireco.com/")
    },
    removeFunc: function(a)
    {
      this.off();
      this.remove();
      a && a()
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
      id: "userStatusList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, b)
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(k);
      b.historyArr = ["MyPage", "CampaignSumoTop"];
      d = new l
    },
    startCommand: function()
    {
      c.changeBg("web_31083.ExportJson");
      c.startBgm("bgm03_story15")
    },
    removeCommand: function() {},
    remove: function(a)
    {
      d ? d.removeFunc(a) : a()
    }
  }
});
