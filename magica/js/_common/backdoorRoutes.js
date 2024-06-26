define(["underscore", "backbone", "backboneCommon"], function(c, d, b)
{
  return {
    ArenaStub:
    {
      url: "ArenaStub(/:query)",
      pageInit: function()
      {
        require(["js/test/ArenaStub"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    Backdoor:
    {
      url: "Backdoor",
      pageInit: function()
      {
        require(["js/test/Backdoor"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    BackdoorEpLv:
    {
      url: "BackdoorEpLv",
      pageInit: function()
      {
        require(["js/test/BackdoorEpLv"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    BackdoorLive2d:
    {
      url: "BackdoorLive2d",
      pageInit: function()
      {
        require(["js/test/BackdoorLive2d"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    BackdoorQuestBattle:
    {
      url: "BackdoorQuestBattle",
      pageInit: function()
      {
        require(["js/test/BackdoorQuestBattle"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    BackdoorQuestList:
    {
      url: "BackdoorQuestList",
      pageInit: function()
      {
        require(["js/test/BackdoorQuestList"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CreateTestUser:
    {
      url: "CreateTestUser",
      pageInit: function()
      {
        require(["js/test/CreateTestUser"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    StyleTemplate:
    {
      url: "StyleTemplate",
      pageInit: function()
      {
        require(["js/test/StyleTemplate"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    ScrollTest:
    {
      url: "ScrollTest",
      pageInit: function()
      {
        require(["js/test/ScrollTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RaidAnimationTest:
    {
      url: "RaidAnimationTest",
      pageInit: function()
      {
        require(["js/test/RaidAnimationTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    FriendSearch:
    {
      url: "FriendSearch",
      pageInit: function()
      {
        require(["js/test/FriendSearch"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    QuestStub:
    {
      url: "QuestStub(/:query)",
      pageInit: function()
      {
        require(["js/test/QuestStub"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    SelectStoryTest:
    {
      url: "SelectStoryTest",
      pageInit: function()
      {
        require(["js/test/SelectStoryTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CardStatusChecker:
    {
      url: "CardStatusChecker",
      pageInit: function()
      {
        require(["js/test/CardStatusChecker"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    MiniCharaTest:
    {
      url: "MiniCharaTest",
      pageInit: function()
      {
        require(["js/test/MiniCharaTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    TapEffectTest:
    {
      url: "TapEffectTest",
      pageInit: function()
      {
        require(["js/test/TapEffectTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    SoundTest:
    {
      url: "SoundTest",
      pageInit: function()
      {
        require(["js/test/SoundTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    DoubleUnitTest:
    {
      url: "DoubleUnitTest",
      pageInit: function()
      {
        require(["js/test/DoubleUnitTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    TipsTest:
    {
      url: "TipsTest",
      pageInit: function()
      {
        require(["js/test/TipsTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EffectTest:
    {
      url: "EffectTest",
      pageInit: function()
      {
        require(["js/test/EffectTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    NativeSandBox:
    {
      url: "NativeSandBox",
      pageInit: function()
      {
        require(["js/test/NativeSandBox"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    SdCharaTest:
    {
      url: "SdCharaTest",
      pageInit: function()
      {
        require(["js/test/SdCharaTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventArenaMissionStub:
    {
      url: "EventArenaMissionStub",
      pageInit: function()
      {
        require(["js/test/EventArenaMissionStub"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RealGachaTop:
    {
      url: "RealGachaTop",
      pageInit: function()
      {
        require(["js/test/RealGachaTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RealGachaAnimation:
    {
      url: "RealGachaAnimation",
      pageInit: function()
      {
        require(["js/test/RealGachaAnimation"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RealGachaResult:
    {
      url: "RealGachaResult",
      pageInit: function()
      {
        require(["js/test/RealGachaResult"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    DeleteDataTest:
    {
      url: "DeleteDataTest",
      pageInit: function()
      {
        require(["js/test/DeleteDataTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    VideoTest:
    {
      url: "VideoTest",
      pageInit: function()
      {
        require(["js/test/VideoTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    SubSecondTest:
    {
      url: "SubSecondTest",
      pageInit: function()
      {
        require(["js/test/SubSecondTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    ShopReworkTest:
    {
      url: "ShopReworkTest",
      pageInit: function()
      {
        require(["js/test/ShopReworkTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    MailSendTest:
    {
      url: "MailSendTest",
      pageInit: function()
      {
        require(["js/test/MailSendTest"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    }
  }
});
