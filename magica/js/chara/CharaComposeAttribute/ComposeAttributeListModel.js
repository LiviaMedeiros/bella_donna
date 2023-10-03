define(["underscore", "backbone", "backboneCommon"], function(a, f, d)
{
  f = {};
  var l;
  f.getListModel = function(e)
  {
    l = e.selectCharaInfo;
    e = d.storage.atbEnhancementCellList.toJSON();
    var r = d.storage.userCharaAtbEnhancementCellList.toJSON(),
      f = d.storage.userItemList.toJSON(),
      p = d.storage.itemList.toJSON(),
      n = [],
      k = l.chara.attributeId;
    a.each(e, function(g, b, d)
    {
      if (~g.atbEnhancementType.indexOf(k))
      {
        var h = {
          id: g.atbEnhancementCellId,
          attributeId: k,
          composeQuantity: g.effectValue,
          isComposed: !1
        };
        a.each(["HP", "ATTACK", "DEFENSE"], function(c, b, a)
        {
          ~g.atbEnhancementType.indexOf(c) && (h.composeType = c)
        });
        a.each(r, function(c, b, a)
        {
          c.atbEnhancementCellId == g.atbEnhancementCellId && c.charaId == l.charaId && (h.isComposed = !0)
        });
        b = g.openingConditions.replace("UPPER_CARD_REVISION_", "");
        h.lockInfo = {
          isLock: !0,
          conditionText: "魔力解放" + b + "で解除されます"
        };
        Number(b) <= Number(l.revision) && (h.lockInfo.isLock = !1);
        h.needItem = [];
        var c = {},
          e = [
          {
            getKey: "needItemCode1",
            setKey: "id"
          },
          {
            getKey: "needValue1",
            setKey: "quantity"
          },
          {
            getKey: "needItemCode2",
            setKey: "id"
          },
          {
            getKey: "needValue2",
            setKey: "quantity"
          },
          {
            getKey: "needItemCode3",
            setKey: "id"
          },
          {
            getKey: "needValue3",
            setKey: "quantity"
          }];
        a.each(Object.keys(g), function(b, d, t)
        {
          a.each(e, function(a, d, q)
          {
            b == a.getKey && (c[a.setKey] = g[b])
          });
          2 == Object.keys(c).length && (c.have = 0, a.each(f, function(b, a, q)
          {
            b.itemId == c.id && (c.have = b.quantity)
          }), a.each(p, function(b, a, q)
          {
            b.itemCode == c.id && (c.name = b.name)
          }), h.needItem.push(c), c = {})
        });
        n.push(h)
      }
    });
    return n
  };
  f.getAllNeedItemList = function(e)
  {
    e = e.selectCharaInfo;
    var f = [],
      l = d.storage.atbEnhancementCellList.toJSON(),
      p = d.storage.userItemList.toJSON(),
      n = d.storage.itemList.toJSON(),
      k = e.chara.attributeId,
      g = function(b)
      {
        b = b.id;
        var a = 10;
        ~b.indexOf("_LIFE") ? a = 1 : ~b.indexOf("_POWER") ? a = 2 : ~b.indexOf("_PROTECT") ? a = 3 : ~b.indexOf("_ALL") && (a = 4);
        return a
      };
    a.each(l, function(b, d, e)
    {
      if (~b.atbEnhancementType.indexOf(k))
      {
        var c = {},
          h = [
          {
            getKey: "needItemCode1",
            setKey: "id"
          },
          {
            getKey: "needItemCode2",
            setKey: "id"
          },
          {
            getKey: "needItemCode3",
            setKey: "id"
          }];
        a.each(Object.keys(b), function(d, e, l)
        {
          a.each(h, function(a, e, f)
          {
            d == a.getKey && (c[a.setKey] = b[d])
          });
          var k = !1;
          c.id || (k = !0);
          a.each(f, function(a, b, d)
          {
            a.id && a.id == c.id && (k = !0)
          });
          var m = {
            id: c.id,
            have: 0,
            afterUse: 0,
            quantity: 0,
            dispClass: "none"
          };
          a.each(p, function(a, b, d)
          {
            a.itemId == c.id && (m.have = a.quantity, m.afterUse = a.quantity)
          });
          a.each(n, function(a, b, d)
          {
            a.itemCode == c.id && (m.name = a.name)
          });
          k || (m.sortNum = g(
          {
            id: c.id
          }), f.push(m));
          c = {}
        })
      }
    });
    return f
  };
  return f
});
