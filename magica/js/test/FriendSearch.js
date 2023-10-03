define("underscore backbone backboneCommon ajaxControl text!css/test/FriendSearch.css js/view/friend/FriendSearchView".split(" "), function(f, g, a, c, d, e)
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
      a.setStyle(d);
      b = new e
    },
    remove: function(a)
    {
      b.trigger("removeView");
      a()
    }
  }
});
