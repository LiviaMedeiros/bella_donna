var DynamicCSS = function()
{
  var f = document.getElementsByTagName("head")[0],
    b = f.getElementsByTagName("style")[0];
  b || (b = document.createElement("style"), b.setAttribute("type", "text/css"), b.appendChild(document.createTextNode("")), f.appendChild(b));
  var e = b.sheet;
  return {
    appendRule: function(a, c)
    {
      var g = [],
        d;
      for (d in c) c.hasOwnProperty(d) && g.push(d + ":" + c[d]);
      e.insertRule(a + "{" + g.join(";") + ";}", e.cssRules.length)
    },
    appendKeyframes: function(a, c)
    {
      var g = [],
        d;
      for (d in c)
      {
        var b = c[d],
          f = [],
          h;
        for (h in b) b.hasOwnProperty(h) && f.push(h + ":" + b[h]);
        g.push(d + "{" + f.join(";") + ";}")
      }
      e.insertRule("@-webkit-keyframes " + a + "{" + g.join(" ") + "}", e.cssRules.length)
    },
    deleteKeyframes: function(a)
    {
      var c = e.cssRules.length;
      if (!(0 >= c))
      {
        if ("undefined" == typeof a || a >= c) a = c - 1;
        e.deleteRule(a)
      }
    },
    clearSheet: function()
    {
      for (var a = e.cssRules.length - 1; 0 <= a; a--) e.deleteRule(a)
    },
    getLength: function()
    {
      return e.cssRules.length - 1
    },
    transform: function(a, c, b, d)
    {
      return {
        "-webkit-transform": "translate(" + a + "px," + c + "px) rotate(" + b + "deg) scale(" + d + ")"
      }
    },
    showSheet: function() {}
  }
};
