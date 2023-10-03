define("underscore backbone backboneCommon ajaxControl command text!css/config/ConfigTop.css js/view/config/ConfigTopView".split(" "), function(g, h, a, c, d, e, f)
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
    startCommand: function()
    {
      d.changeBg("web_common.ExportJson")
    },
    fetch: function()
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(e);
      b = new f
    },
    remove: function(a)
    {
      b && b.remove();
      a()
    }
  }
});
