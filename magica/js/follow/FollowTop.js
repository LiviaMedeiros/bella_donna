define("underscore backbone backboneCommon ajaxControl command text!css/follow/FollowTop.css js/view/follow/FollowTopView".split(" "), function(h, k, c, d, e, f, g)
{
  var a;
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "userFollowList",
      refresh: !0
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
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      e.changeBg("web_common.ExportJson")
    },
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c.setStyle(f);
      a = new g
    },
    paging: function(b)
    {
      c.doc.getElementById("FriendList").classList.contains("follow") ? (a.pageNumFollow = b, a.followUpdate()) : c.doc.getElementById("FriendList").classList.contains("follower") && (a.pageNum = b, a.followerUpdate())
    },
    remove: function(b)
    {
      a && a.removeHandler();
      b()
    }
  }
});
