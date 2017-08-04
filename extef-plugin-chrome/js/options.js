$( document ).ready(function() {

  chrome.storage.local.get("cnerf",function(result){
    if("cnerf" in result){
      $('#cnerf').prop('checked', result.cnerf);

    }else{
      $('#cnerf').prop('checked', false);
    }
    console.log(result);

  });

  $("#cnerf").change(function() {
      if(this.checked) {
          console.log("checked");

          chrome.storage.local.set({'cnerf': 1}, function() {
            // Notify that we saved.

          });

      }else{
          console.log("unchecked");
          chrome.storage.local.set({'cnerf': 0}, function() {
            // Notify that we saved.

          });
      }
  });


  console.log("option loaded");
});
