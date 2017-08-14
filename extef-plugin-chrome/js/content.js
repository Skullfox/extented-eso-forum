$( document ).ready(function() {

  extefPlugin = {

    "start" : function(){
      console.log('%c Extended Eso Forum Plugin ' + chrome.runtime.getManifest().version, 'background: #fff; color: #33636b');
    },

    "advertisement" : function(){
      setCookie("om-635196", true); // hide horns of the reach advertisement
    },

    "languageSwitcher" : function(){

      var _this = this;

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


      _this.addAfterAjax(".top-level ul",function(){

          $(".logos.list-unstyled").empty();

          $.each( lang , function( key) {
            $(".top-level ul").first().append('<li class="extef-flags" style="display:none" ><a class="extef-flag-link"  href="'+lang[key].link+'"><img src="'+lang[key].flag+'"></a></li>');
          });

          $(".extef-flags").fadeIn();

      })

    },

    "breadcrumbs" : function (){

      $("#Breadcrumbs").appendTo(".MeBox.Inline");
      $("#Breadcrumbs").addClass("extef-breadcrumb");

    },

    "serverstatus" : function(){
      var _this = this;

      $.ajax({
        url: "https://live-services.elderscrollsonline.com/status/realms",
        dataType: "json",
        success: function(result){


          _this.addAfterAjax(".top-level ul",function(){

            $(".top-level").append('<ul class="extef-server" style="display: none"></ul>');

            var s = result.zos_platform_response.response;

            $.each( s , function( sn ) {

                  var sna = sn.split("The Elder Scrolls Online ");
                  var x = (s[sn] == "UP")? "green" : "red";
                  $(".extef-server").append('<li>'+sna[1]+'<span class="circle '+x+'"></span> </li>');
            });

              $(".extef-server").fadeIn();

          })

       },
       error : function(result, exception){
         if(result.responseJSON.zos_platform_response.result_code != 2000){
           console.warn(result.responseJSON.zos_platform_response.result_message);
           return false;
         }

       }


     });

    },

    "addAfterAjax" : function(selector,callback){

      var e = setInterval(function() {

         if ($(selector).length) {

              callback();

            clearInterval(e);
         }

      }, 300,selector,callback);

    },

    "checkForUpdate" : function(){
      var _this = this;

      $.ajax({
        url: "https://raw.githubusercontent.com/Skullfox/extented-eso-forum/master/extef-plugin-chrome/manifest.json",
        dataType: "json",
        success: function(result){

          if(result.version > chrome.runtime.getManifest().version ){

            _this.addAfterAjax(".top-level ul",function(){
                $(".top-level ul").first().append('<li class="extef-update" style="" ><a target="_blank"class=""href="https://github.com/Skullfox/extented-eso-forum">EXTEF Update available</a></li>');
            })

          }

       }});

    },

    "setCurrentPage" : function(){

      setCookie("extef_site", 1);

      if ($('.Discussions').length){
        // on Discussions site


        var url = window.location.href;
        var sp = url.split("/");

        var catUrl = sp[0]+"//"+sp[1]+"/"+sp[2]+"/"+sp[3]+"/"+sp[4]+"/"+sp[5];

        if(sp.length > 6){
          //px
          var p = sp[6].split("p");
          var s = parseInt( p[1] );
          setCookie("extef_site",parseInt( s ) );
        }else{
          var s = 1;
          setCookie("extef_site",parseInt( 1 ) );
        }
      }

    },

    "nerfFilter" : function(){

      var _this = this;

      chrome.storage.local.get("cnerf",function(result){
        if("cnerf" in result){
          if(result.cnerf){


            _this.addAfterAjax(".DiscussionsTable",function(){

              var c = 0;

              $( "tr.ItemDiscussion .DiscussionName a" ).each(function( index ) {
                  if( $( this ).text().match(/nerf/i) ){

                    var i = $( this ).parents(".Item");

                    if( i.hasClass("extef-filter-nerf") == false ){
                      //console.log( $( this ).text() );
                      $( this ).parents(".Item").addClass("extef-filter-nerf");
                      $( this ).parents(".Item").hide();
                      c++;
                    }
                  }
                });
                //console.log("EXTEF filter hides "+c+" threads");

            })

          }else{


            _this.addAfterAjax(".DiscussionsTable",function(){

              var c = 0;

              $( "tr.extef-filter-nerf" ).each(function( index ) {
                      $( this ).show();
                      $( this ).removeClass("extef-filter-nerf");
                });
                //console.log("EXTEF filter hides "+c+" threads");
            })


          }
        };
      });

    },

    "options" : function(){




    }

  }

  var url = window.location.href;
  if(url.indexOf("www.elderscrollsonline.com") !== -1){

    console.log("on mainsite");


    if(url.indexOf("agegate") !== -1){
      console.log("agegate detected");
    }

  }

  extefPlugin.start();
  extefPlugin.languageSwitcher();
  extefPlugin.breadcrumbs();
  extefPlugin.serverstatus();
  extefPlugin.setCurrentPage();
  extefPlugin.options();
  extefPlugin.nerfFilter();
  extefPlugin.advertisement();

  $(".logos.list-unstyled").empty();

   function checkNewContent(){

        var c = getCookie("extef_site");
        var extefSite =  parseInt(c) + 1;

       var url = window.location.href;
       var sp = url.split("/");


       if(sp.length == 5){
         var catUrl = sp[0]+"//"+sp[1]+"/"+sp[2]+"/"+sp[3]+"/"+sp[4];
       }else{
         var catUrl = sp[0]+"//"+sp[1]+"/"+sp[2]+"/"+sp[3]+"/"+sp[4]+"/"+sp[5];
       }



       setCookie("extef_site",extefSite);

       $.ajax({
         url: catUrl + "/p" + extefSite + ".json",
         dataType: "json",
         success: function(result){

           $(".DataTable.DiscussionsTable tbody").append('<tr class=" asd extef-conten-site-'+extefSite+' "> Page' + extefSite + '<tr>');

           $.each( result.Discussions , function( d ) {

             var ds = result.Discussions[d];
             var isStaffClass = (ds.Staff)? "is-staff": "";

             $(".DataTable.DiscussionsTable tbody").append('<tr id="Discussion_' + ds.DiscussionID+'" class="Item Alt Unread ItemDiscussion "> \
                      <td class="Col-Staff"> \
                   <div class="Wrap"> \
                            </div> \
                </td> \
                <td class="Col-Icon"> \
                   <div class="Wrap"> \
                      <span class="icon icon-mail" title="Discussion"><span class="sr-only">Discussion</span></span>      </div> \
                </td> \
              <td class="DiscussionName"> \
                <div class="Wrap"> \
                  <a href="'+ds.Url+'" class="Title">'+ds.Name+'</a> 		</div> \
              </td> \
                      <td class="Col-Star"> \
                      <div class="Wrap"> \
                                </div> \
                   </td> \
                  <td class="FirstUser Col-User"> \
                <div class="Wrap"> \
                  <a href="/en/profile/'+ds.FirstName+'" class="UserLink BlockTitle ' + isStaffClass + '">'+ds.FirstName+'</a>		</div> \
                </td> \
              <td class="BigCount CountComments"> \
                   <div class="Wrap"> \
                      <span title="'+ds.CountComments+' comments" class="Number">'+ds.CountComments+'</span>      </div> \
              </td> \
              <td class="BigCount CountViews"> \
                   <div class="Wrap"> \
                      <span title="'+ds.CountViews+' views" class="Number">'+ds.CountViews+'</span>      </div> \
              </td> \
              <td class="LastUser Col-User"> \
                <div class="Wrap"> \
                  <a href="/en/profile/'+ds.LastName+'" class="UserLink BlockTitle">'+ds.LastName+'</a><div class="Meta"><a href="https://forums.elderscrollsonline.com/en/discussion/363759/chrome-plugin-extended-eso-forum/p1#latest" class="CommentDate MItem"><time title="August  2, 2017  2:54PM" datetime="2017-08-02T12:54:26+00:00">2:54PM</time></a></div>		</div> \
              </td> \
                </tr> \
             ');

           });


        }});

         extefPlugin.nerfFilter();

   }


   function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
  }

  function getCookie(key) {
      var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      return keyValue ? keyValue[2] : null;
  }


   $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {

          if ($('.Discussions').length){
            checkNewContent();

          }
      }

   });

});
