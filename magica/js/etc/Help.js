define("underscore backbone backboneCommon ajaxControl command text!css/etc/Help.css js/view/etc/HelpView".split(" "), function(g, h, a, c, d, e, f)
{
  var b;
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(e);
      b = new f
    },
    startCommand: function()
    {
      d.changeBg("web_common.ExportJson")
    },
    remove: function(a)
    {
      b && b.remove();
      a()
    }
  }
});
