define("underscore backbone backboneCommon ajaxControl command text!template/gacha/GachaProbabilityPop.html".split(" "), function(c, B, a, C, D, E, G)
{
  var l, h, w = ["LIMITED"],
    m = {
      LIMITED: "limited"
    },
    y = function()
    {
      h = new(B.View.extend(
      {
        events: function()
        {
          var c = {};
          c[a.cgti + " #menuPanel .btn"] = this.tabBtn;
          return c
        },
        initialize: function()
        {
          this.model = l;
          this.template = c.template(E);
          this.createDom()
        },
        render: function()
        {
          this.$el.html(this.template(
          {
            model: this.model,
            nowList: a.gachaProbabilityList[this.model.gachaType],
            probText: this.probText
          }));
          this.el.style.height = "100%";
          this.el.style.width = "100%";
          return this
        },
        createDom: function()
        {
          new a.PopupClass(
          {
            title: "ガチャ提供一覧",
            content: "",
            exClass: "gachaProbabilityPop",
            popupType: "typeB"
          }, null, null, this.removeHandler);
          var F = a.doc.getElementById("popupArea");
          this.probText = "";
          switch (this.model.gachaType)
          {
            case "RARE":
            case "PICKUP":
            case "ATTRIBUTE":
            case "SELECTABLE_PICKUP":
            case "SELECTABLE_MEMORIA_PICKUP":
              this.probText = this.model.isStepup ? "※10連ガチャのうち1枚は、魔法少女確定時の確率で抽選されます。<br>※10連ガチャのうち1枚は、★3以上確定時の確率で抽選されます。<br>※10連ガチャのうち★3以上確定時、魔法少女確定時を除いた8枚は、通常の確率で抽選されます。<br><br>※提供魔法少女、メモリアは重複する可能性があります。<br>※既に所有している魔法少女を獲得した場合、獲得した魔法少女は、獲得した魔法少女のデスティニージェム<br>　1個に変わります。<br><br>※個別の魔法少女、メモリアの確率については、小数点第6位を切り捨てしているため、<br>　合計しても100％にならないことがあります。" : "※10連ガチャのうち1枚は、魔法少女確定時の確率で抽選されます。<br>※10連ガチャのうち1枚は、★3以上確定時の確率で抽選されます。<br>※10連ガチャのうち★3以上確定時、魔法少女確定時を除いた8枚は、通常の確率で抽選されます。<br>※99回連続で★4魔法少女が排出されなかった場合、100回目は★4魔法少女確定時の確率で抽選されます。<br><br>※提供魔法少女、メモリアは重複する可能性があります。<br>※既に所有している魔法少女を獲得した場合、獲得した魔法少女は、獲得した魔法少女のデスティニージェム<br>　1個に変わります。<br><br>※個別の魔法少女、メモリアの確率については、小数点第6位を切り捨てしているため、<br>　合計しても100％にならないことがあります。";
              break;
            case "SPECIAL":
              this.probText = "※既に所有している魔法少女を獲得した場合、獲得した魔法少女は、獲得した魔法少女のデスティニージェム<br>　1個に変わります。"
          }
          F.getElementsByClassName("popupTextArea")[0].appendChild(this.render().el);
          this.displayType = "probability";
          1 > c.size(a.gachaProbabilityList[this.model.gachaType].gachaDrawList.piece) ? a.doc.querySelector("#menuPanel .memoria").style.display = "none" : a.doc.querySelector("#menuPanel .memoria").style.display = "";
          D.getBaseData(a.getNativeObj());
          a.scrollSet("scrollInner", "scrollInnerWrap")
        },
        tabBtn: function(c)
        {
          c.preventDefault();
          a.isScrolled() || c.currentTarget.dataset.gachaType === this.displayType || (a.removeClass(a.doc.getElementById("menuPanel").getElementsByClassName(this.displayType)[0], "current"), a.addClass(c.currentTarget, "current"), this.displayType = c.currentTarget.dataset.gachaType, a.doc.getElementById("GachaProbability").className = this.displayType, a.scrollRefresh(null, null, !0))
        },
        removeHandler: function()
        {
          h && h.remove()
        }
      }))
    };
  return {
    init: function(h, n, b, u)
    {
      l = {};
      l.id = n;
      l.gachaType = b;
      l.gachaSchedule = u;
      a.gachaProbabilityList || (a.gachaProbabilityList = {});
      var g = c.findWhere(u,
      {
        id: n
      });
      h = {
        gachaScheduleId: g.id
      };
      l.isStepup = g.viewParameterMap && g.viewParameterMap.IMAGE_DETAIL ? !0 : !1;
      n = function(f)
      {
        var h,
          l, n, v;
        h = [];
        l = [];
        n = [];
        v = {};
        c.each(f.gachaProbabilityList, function(d, a)
        {
          var b = {};
          b.displayName = d.displayName;
          b.lotteryMap = d.lotteryMap;
          h.push(b);
          var b = c.reduce(d.lotteryMap, function(d, a)
            {
              return d + a
            }, 0),
            e;
          for (e in d.lotteryMap) v[e] || (v[e] = {}), 0 < d.lotteryMap[e] && (v[e][a] = 1E3 * d.lotteryMap[e] / b * 100 / 1E3 + "%");
          var z = [];
          c.each(d.cardProbabilityList, function(d, a)
          {
            a = {};
            a.cardId = d.gachaResult.cardId;
            a.probability = d.probability;
            z.push(a)
          });
          var q = [];
          c.each(d.pieceProbabilityList, function(d, a)
          {
            a = {};
            a.pieceId = d.gachaResult.pieceId;
            a.probability = d.probability;
            q.push(a)
          });
          l.push(z);
          n.push(q)
        });
        var u = [];
        c.each(f.gachaDrawList, function(d, b)
        {
          d.probability = {};
          var q = 0;
          "CARD" === d.type ? (1042 === d.charaId && (d.displayName = a.storage.user.get("loginName")), c.each(l, function(a, b)
          {
            a = c.findWhere(a,
            {
              cardId: d.cardId
            });
            d.probability[b] = null;
            0 < Number(a.probability) && (d.probability[b] = a.probability, q++)
          })) : c.each(n, function(a, b)
          {
            a = c.findWhere(a,
            {
              pieceId: d.pieceId
            });
            d.probability[b] = null;
            0 < Number(a.probability) && (d.probability[b] = a.probability, q++)
          });
          0 != q && u.push(d)
        });
        a.gachaProbabilityList[b] = {};
        a.gachaProbabilityList[b].id = g.id;
        a.gachaProbabilityList[b].gachaType = b;
        a.gachaProbabilityList[b].probabilityBase = h;
        a.gachaProbabilityList[b].probMap = v;
        a.gachaProbabilityList[b].gachaProbability = f.gachaProbability;
        var r = c.sortBy(u, function(a)
          {
            return -Number(a.rarity.substr(-1))
          }),
          k = c.groupBy(r, "type");
        f = c.groupBy(k.CARD, "rarity");
        k = c.groupBy(k.PIECE, "rarity");
        a.gachaProbabilityList[b].gachaDrawList = {
          card: f,
          piece: k
        };
        console.log("nowGacha:", g);
        k = null;
        if (-1 < b.indexOf("SELECTABLE_MEMORIA") && a.selectablePieceIdList)
        {
          console.log("common.selectablePieceIdList", a.selectablePieceIdList);
          selectablePieceIdList = a.selectablePieceIdList;
          var p = [];
          f = c.filter(r, function(a)
          {
            return "PIECE" == a.type && -1 !== selectablePieceIdList.indexOf(a.pieceId)
          });
          c.each(f, function(a, b)
          {
            b = {};
            a = c.findWhere(r,
            {
              type: "PIECE",
              pieceId: a.pieceId
            });
            var d = "";
            if (a.genericValue)
            {
              var e = a.genericValue.split(","),
                e = e.concat();
              c.each(w, function(a, c)
              {
                -1 < e.indexOf(a) && m[a] && (d += " " + m[a])
              })
            }
            b.memoria = a;
            b.addClass = d;
            p.push(b)
          });
          0 < p.length && (a.gachaProbabilityList[b].pickUpMemoria = p)
        }
        else if (-1 < b.indexOf("SELECTABLE") && a.selectableCharaData[g.id])
        {
          k = a.selectableCharaData[g.id];
          console.log("common.selectableCharaData", k);
          var t = [];
          f = {};
          var k = c.findWhere(r,
            {
              type: "CARD",
              charaId: k.charaNo
            }),
            A = "";
          if (k.genericValue)
          {
            var x = k.genericValue.split(","),
              x = x.concat();
            c.each(w, function(a, c)
            {
              -1 < x.indexOf(a) && m[a] && (A += " " + m[a])
            })
          }
          f.card = k;
          f.addClass = A;
          t.push(f);
          a.gachaProbabilityList[b].pickUpCard = t
        }
        g.bonusCardList && 0 < g.bonusCardList.length && (t = [], f = c.sortBy(g.bonusCardList, function(a)
        {
          return -1 * Number(a.rank.substr(-1))
        }), c.each(f, function(a, b)
        {
          b = {};
          a = c.findWhere(r,
          {
            type: "CARD",
            charaId: a.charaNo
          });
          a.rarity.substr(-1);
          var d = "";
          if (a.genericValue)
          {
            var e = a.genericValue.split(","),
              e = e.concat();
            c.each(w, function(a, b)
            {
              -1 < e.indexOf(a) && m[a] && (d += " " + m[a])
            })
          }
          b.card = a;
          b.addClass = d;
          t.push(b)
        }), 0 < t.length && (a.gachaProbabilityList[b].pickUpCard = t));
        g.bonusPieceList && 0 < g.bonusPieceList.length && (p = [], f = c.sortBy(g.bonusPieceList, function(a)
        {
          return -1 * Number(a.rank.substr(-1))
        }), c.each(f, function(a, b)
        {
          b = {};
          a = c.findWhere(r,
          {
            type: "PIECE",
            pieceId: a.pieceId
          });
          var d = "";
          if (a.genericValue)
          {
            var e = a.genericValue.split(","),
              e = e.concat();
            c.each(w, function(a, b)
            {
              -1 < e.indexOf(a) && m[a] && (d += " " + m[a])
            })
          }
          b.memoria = a;
          b.addClass = d;
          p.push(b)
        }), 0 < p.length && (a.gachaProbabilityList[b].pickUpMemoria = p));
        y()
      };
      console.log(b);
      a.gachaProbabilityList[b] && a.gachaProbabilityList[b].id === g.id && "SELECTABLE_MEMORIA_PICKUP" !== b && "SELECTABLE_PICKUP" !== b ? y() : C.ajaxPost(a.linkList.gachaProbability, h, n)
    },
    removeHandler: function()
    {
      h && h.removeHandler()
    }
  }
});
