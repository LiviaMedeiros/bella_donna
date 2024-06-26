define(["backbone"], function(d)
{
  d.Router.prototype.before = function() {};
  d.Router.prototype.after = function() {};
  d.Router.prototype.route = function(c, a, f)
  {
    _.isRegExp(c) || (c = this._routeToRegExp(c));
    _.isFunction(a) && (f = a, a = "");
    f || (f = this[a]);
    var b = this;
    d.history.route(c, function(g)
    {
      var e = b._extractParameters(c, g);
      b.before.apply(b, [g.replace(e[0], ""), e[0]]);
      f && f.apply(b, e);
      b.after.apply(b, arguments);
      b.trigger.apply(b, ["route:" + a].concat(e));
      b.trigger("route", a, e);
      d.history.trigger("route", b, a, e)
    });
    return this
  };
  d.View.prototype.attr = function(c, a)
  {
    this.attributes.hasOwnProperty(c);
    if (!a) return this.attributes[c];
    this.attributes[c] = a
  }
});
