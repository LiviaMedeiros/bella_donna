define(["backboneCommon"], function(b)
{
  var a = {},
    c = {
      friend: "/friend_search/_search"
    },
    d = "/search",
    e = "";
  if (location.href.match("file://") || location.href.match("http://localhost:5963") || location.href.match("https://localhost:5963")) d = "/magica/json", e = ".json";
  b.searchLinkList = [];
  a.pathSet = function()
  {
    for (var a in c) b.searchLinkList[a] = d + c[a] + e
  };
  return a
});
