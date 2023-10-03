define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(g, h, a, k, c)
{
  return h.View.extend(
  {
    events: function()
    {
      var c = {};
      c[a.cgti + " .dataDecide"] = this.dataDecide;
      return c
    },
    initialize: function(a)
    {
      this.option = a;
      this.template = g.template(this.template);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.option
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el)
    },
    dataDecide: function(d)
    {
      d.preventDefault();
      if (!a.isScrolled())
      {
        a.androidKeyStop = !0;
        var b = this;
        if (this.option.onFlag)
        {
          switch (this.option.type)
          {
            case "voice":
              $("#commandDiv").on("nativeCallback", function()
              {
                b.rootView.configAllReGet();
                new a.PopupClass(
                {
                  title: "データ削除",
                  content: "データの削除が完了しました。",
                  popupType: "typeC",
                  closeBtnText: "OK"
                });
                a.androidKeyStop = !1;
                $("#commandDiv").off()
              });
              c.removeAsset("voice", "nativeCallback");
              window.isBrowser && nativeCallback();
              break;
            case "movie":
              if ("off" !== this.option.newType) $("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                $("#commandDiv").on("nativeCallback", function()
                {
                  b.rootView.configAllReGet();
                  c.startBgm(a.settingBgm);
                  new a.PopupClass(
                  {
                    title: "ムービーデータ",
                    content: "データの設定が完了しました。",
                    popupType: "typeC",
                    closeBtnText: "OK"
                  });
                  a.androidKeyStop = !1;
                  $("#commandDiv").off()
                });
                "high" === b.option.newType ? c.setMovieConfig(2) : c.setMovieConfig(1);
                new a.PopupClass(
                {
                  title: "ムービーデータ",
                  content: "データの設定が完了しました。",
                  popupType: "typeC",
                  closeBtnText: "OK"
                }, null, null, function()
                {
                  b.rootView.configAllReGet()
                });
                window.isBrowser && nativeCallback()
              });
              else $("#commandDiv").on("nativeCallback", function()
              {
                b.rootView.configAllReGet();
                new a.PopupClass(
                {
                  title: "データ削除",
                  content: "データの削除が完了しました。",
                  popupType: "typeC",
                  closeBtnText: "OK"
                });
                a.androidKeyStop = !1;
                c.setMovieConfig(0);
                $("#commandDiv").off()
              });
              c.removeAsset("movie", "nativeCallback");
              window.isBrowser && nativeCallback()
          }
          b.rootView.configAllReGet()
        }
        else
        {
          if (window.isBrowser)
          {
            b.rootView.resourceConfig[b.option.type] = 1;
            "voice" === b.option.type && (b.rootView.resourceConfig.deleteVoice = 0);
            b.rootView.configAllReGet();
            d = "ムービーデータ";
            var f = "データの設定が完了しました。";
            "voice" === b.option.type && (d = "データダウンロード", f = "データのダウンロードが完了しました。");
            new a.PopupClass(
            {
              title: d,
              content: f,
              popupType: "typeC",
              closeBtnText: "OK"
            });
            a.androidKeyStop = !1
          }
          else $("#commandDiv").on("nativeCallback", function()
          {
            c.setWebView(!0);
            c.startBgm(a.settingBgm);
            var e = "ムービーデータ",
              d = "データの設定が完了しました。";
            "voice" === b.option.type && (e = {
              voice: 0
            }, e.movie = b.rootView.resourceConfig.deleteMovie, c.setDownloadDeleteConfig(e), e = "データダウンロード", d = "データのダウンロードが完了しました。");
            b.rootView.configAllReGet();
            new a.PopupClass(
            {
              title: e,
              content: d,
              popupType: "typeC",
              closeBtnText: "OK"
            }, null, null, function()
            {
              "voice" === b.option.type && a.removeClass(a.doc.getElementById("fullVoiceBtn"), "off")
            });
            a.androidKeyStop = !1;
            $("#commandDiv").off()
          });
          switch (this.option.type)
          {
            case "voice":
              c.setWebView(!1);
              c.downloadFileConfigPage("voice");
              window.isBrowser && nativeCallback();
              break;
            case "movie":
              "high" === this.option.newType ? c.setMovieConfig(2) : c.setMovieConfig(1), new a.PopupClass(
                {
                  title: "ムービーデータ",
                  content: "データの設定が完了しました。",
                  popupType: "typeC",
                  closeBtnText: "OK"
                }, null, null, function()
                {
                  b.rootView.configAllReGet()
                }),
                window.isBrowser && nativeCallback()
          }
        }
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
