$( document ).ready(function() {

  var lang = {
    "en_us" : {
      "link": "https://forums.elderscrollsonline.com/en/categories",
      "flag" : "https://esosslfiles-a.akamaihd.net/images/flags/en-us.png"
    },
    "en_int" : {
      "link": "https://forums.elderscrollsonline.com/en-gb/categories",
      "flag" : "https://esosslfiles-a.akamaihd.net/images/flags/en-gb.png"
    },
    "de" : {
      "link": "https://forums.elderscrollsonline.com/de/categories",
      "flag" : "https://esosslfiles-a.akamaihd.net/images/flags/de.png"
    },
    "fr" : {
      "link": "https://forums.elderscrollsonline.com/fr/categories",
      "flag" : "https://esosslfiles-a.akamaihd.net/images/flags/fr.png"
    },

  };

  $.each( lang , function( key) {
    $(".MeBox.Inline").append('<span class="Bullet">·</span><a class="esof-flag-link" href="'+lang[key].link+'"><img src="'+lang[key].flag+'"></a>');
  });

  $("#Breadcrumbs").appendTo(".MeBox.Inline");
  $("#Breadcrumbs").addClass("extef-breadcrumb");


});
