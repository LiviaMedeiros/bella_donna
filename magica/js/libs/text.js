/*
 text 2.0.15 Copyright jQuery Foundation and other contributors.
 Released under MIT license, http://github.com/requirejs/text/LICENSE
*/
define(["module"], function(q)
{
  function k(a, e)
  {
    return void 0 === a || "" === a ? e : a
  }
  var g, r, l, m, t, u = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
    v = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
    w = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
    n = "undefined" !== typeof location && location.href,
    x = n && location.protocol && location.protocol.replace(/\:/, ""),
    y = n && location.hostname,
    z = n && (location.port || void 0),
    p = {},
    h = q.config && q.config() ||
    {};
  g = {
    version: "2.0.15",
    strip: function(a)
    {
      if (a)
      {
        a = a.replace(v, "");
        var e = a.match(w);
        e && (a = e[1])
      }
      else a = "";
      return a
    },
    jsEscape: function(a)
    {
      return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
    },
    createXhr: h.createXhr || function()
    {
      var a, e, b;
      if ("undefined" !== typeof XMLHttpRequest) return new XMLHttpRequest;
      if ("undefined" !== typeof ActiveXObject)
        for (e = 0; 3 > e; e += 1)
        {
          b = u[e];
          try
          {
            a = new ActiveXObject(b)
          }
          catch (c)
          {}
          if (a)
          {
            u = [b];
            break
          }
        }
      return a
    },
    parseName: function(a)
    {
      var e, b, c = !1,
        d = a.lastIndexOf(".");
      e = 0 === a.indexOf("./") || 0 === a.indexOf("../"); - 1 !== d && (!e || 1 < d) ? (e = a.substring(0, d), b = a.substring(d + 1)) : e = a;
      a = b || e;
      d = a.indexOf("!"); - 1 !== d && (c = "strip" === a.substring(d + 1), a = a.substring(0, d), b ? b = a : e = a);
      return {
        moduleName: e,
        ext: b,
        strip: c
      }
    },
    xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
    useXhr: function(a, e, b, c)
    {
      var d, f;
      f = g.xdRegExp.exec(a);
      if (!f) return !0;
      a = f[2];
      d = f[3];
      d = d.split(":");
      f = d[1];
      d = d[0];
      if ((b = (!a || a === e) && (!d || d.toLowerCase() === b.toLowerCase())) && !(b = !f && !d)) a: if (f === c) b = !0;
        else
        {
          if (a === e)
            if ("http" === a)
            {
              b = k(f, "80") === k(c, "80");
              break a
            }
          else if ("https" === a)
          {
            b = k(f, "443") === k(c, "443");
            break a
          }
          b = !1
        } return b
    },
    finishLoad: function(a, e, b, c)
    {
      b = e ? g.strip(b) : b;
      h.isBuild && (p[a] = b);
      c(b)
    },
    load: function(a, e, b, c)
    {
      if (c && c.isBuild && !c.inlineText) b();
      else
      {
        h.isBuild = c && c.isBuild;
        var d = g.parseName(a);
        c = d.moduleName + (d.ext ? "." + d.ext : "");
        var f = e.toUrl(c),
          A = h.useXhr || g.useXhr;
        0 === f.indexOf("empty:") ? b() : !n || A(f, x, y, z) ? g.get(f, function(c)
        {
          g.finishLoad(a, d.strip, c, b)
        }, function(a)
        {
          b.error && b.error(a)
        }) : e([c], function(a)
        {
          g.finishLoad(d.moduleName + "." + d.ext, d.strip, a, b)
        })
      }
    },
    write: function(a, e, b, c)
    {
      p.hasOwnProperty(e) && (c = g.jsEscape(p[e]), b.asModule(a + "!" + e, "define(function () { return '" + c + "';});\n"))
    },
    writeFile: function(a, e, b, c, d)
    {
      e = g.parseName(e);
      var f = e.ext ? "." + e.ext : "",
        h = e.moduleName + f,
        k = b.toUrl(e.moduleName + f) + ".js";
      g.load(h, b, function(b)
      {
        b = function(a)
        {
          return c(k, a)
        };
        b.asModule = function(a, b)
        {
          return c.asModule(a, k, b)
        };
        g.write(a, h, b, d)
      }, d)
    }
  };
  if ("node" === h.env || !h.env && "undefined" !== typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"]) r = require.nodeRequire("fs"), g.get = function(a, e, b)
  {
    try
    {
      var c = r.readFileSync(a, "utf8");
      "﻿" === c[0] && (c = c.substring(1));
      e(c)
    }
    catch (d)
    {
      b && b(d)
    }
  };
  else if ("xhr" === h.env || !h.env && g.createXhr()) g.get = function(a, e, b, c)
  {
    var d = g.createXhr(),
      f;
    d.open("GET", a, !0);
    if (c)
      for (f in c) c.hasOwnProperty(f) && d.setRequestHeader(f.toLowerCase(), c[f]);
    if (h.onXhr) h.onXhr(d, a);
    d.onreadystatechange = function(c)
    {
      if (4 === d.readyState && (c = d.status || 0, 399 < c && 600 > c ? (c = Error(a + " HTTP status: " + c), c.xhr = d, b && b(c)) : e(d.responseText), h.onXhrComplete)) h.onXhrComplete(d, a)
    };
    d.send(null)
  };
  else if ("rhino" === h.env || !h.env && "undefined" !== typeof Packages && "undefined" !== typeof java) g.get = function(a, e)
  {
    var b, c, d = new java.io.File(a);
    a = java.lang.System.getProperty("line.separator");
    var d = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d), "utf-8")),
      f = "";
    try
    {
      b = new java.lang.StringBuffer;
      (c = d.readLine()) && c.length() && 65279 === c.charAt(0) && (c = c.substring(1));
      for (null !== c && b.append(c); null !== (c = d.readLine());) b.append(a), b.append(c);
      f = String(b.toString())
    }
    finally
    {
      d.close()
    }
    e(f)
  };
  else if ("xpconnect" === h.env || !h.env && "undefined" !== typeof Components && Components.classes && Components.interfaces) l = Components.classes, m = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), t = "@mozilla.org/windows-registry-key;1" in l, g.get = function(a, e)
  {
    var b, c, d = {};
    t && (a = a.replace(/\//g, "\\"));
    a = new FileUtils.File(a);
    try
    {
      b = l["@mozilla.org/network/file-input-stream;1"].createInstance(m.nsIFileInputStream), b.init(a, 1, 0, !1), c = l["@mozilla.org/intl/converter-input-stream;1"].createInstance(m.nsIConverterInputStream), c.init(b, "utf-8", b.available(), m.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), c.readString(b.available(), d), c.close(), b.close(), e(d.value)
    }
    catch (f)
    {
      throw Error((a && a.path || "") + ": " + f);
    }
  };
  return g
});
