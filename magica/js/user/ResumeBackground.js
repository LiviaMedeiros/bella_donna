define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(b, c, d, a, e, f)
{
  return {
    needModelIdObj: [
    {
      id: "user"
    }],
    fetch: function()
    {
      a.pageModelGet(this.needModelIdObj)
    },
    init: function() {},
    startCommand: function() {},
    remove: function(a)
    {
      a()
    }
  }
});
