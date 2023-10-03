define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaComposeResult.html".split(" "), function(d, m, a, l, h, n)
{
  var k, e, f, p = function()
  {
    nativeJsonObj = null;
    f = a.composeResultResponse;
    e = l.getPageJson();
    e.composeTarget = a.storage.composeTarget;
    d.each(f.userPieceList, function(a, c) {});
    var c, g = a.doc.createDocumentFragment();
    d.each(f, function(b, d)
    {
      "gameUser" === d && (c = a.doc.createElement("p"), c.textContent = "riche : " + b.riche, g.appendChild(c));
      "userMemoriaList" === d && (c = a.doc.createElement("p"), c.textContent = "level : " + b[0].level, g.appendChild(c), c = a.doc.createElement("p"), c.textContent = "exp : " + b[0].experience, g.appendChild(c))
    });
    k = new(m.View.extend(
    {
      initialize: function(a)
      {
        this.template = d.template(n);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: e
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        var b = d.findWhere(f.userPieceList,
        {
          id: e.composeTarget.id
        });
        a.doc.getElementById("afterLevel").innerText = b.level;
        a.doc.getElementById("afterLb").innerText = 4 > b.lbCount ? b.lbCount : 4;
        a.doc.getElementById("afterAtk").innerText = b.attack;
        a.doc.getElementById("afterDef").innerText = b.defense;
        a.doc.getElementById("afterHp").innerText = b.hp;
        a.doc.getElementById("afterSpe").innerText = b.speed;
        $("#debugWrap").append(g);
        b = a.doc.getElementById("globalBackBtn");
        b.setAttribute("data-noLink", "true");
        b.addEventListener(a.cgti, function()
        {
          location.href = "#/MemoriaCompose/" + a.composeMode
        });
        a.ready.hide()
      }
    }));
    a.responseSetStorage(a.composeResultResponse);
    d.each(a.composeResultResponse.deleted.userPieceList, function(b, c)
    {
      b = a.storage.userPieceList.findWhere(
      {
        id: b.id
      });
      a.storage.userPieceList.remove(b)
    });
    a.composeResultResponse = null
  };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      l.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      p()
    },
    startCommand: function()
    {
      h.startBgm(a.settingBgm);
      h.changeBg("web_common.ExportJson");
      h.setWebView()
    },
    remove: function(a)
    {
      k && k.remove();
      a()
    }
  }
});
