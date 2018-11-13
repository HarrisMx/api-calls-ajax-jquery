$(document).ready(function(){
    // $('.modal').modal('show'); 
    $('.diagnosis').css('display', 'none');
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im14b2xpc2kuZGV2ZWxvcGVyQG91dGxvb2suY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI0MTI3IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE4LTEwLTI1IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1NDIxMDg5MTgsIm5iZiI6MTU0MjEwMTcxOH0.dEJtA2oOHV3HagrvCy-spVkuWP5EwZNHEZhfS2OGz-w';
     var uri = "https://authservice.priaid.ch/login";
     var secret_key = "s7HWi_OUTLOOK_COM_AUT";
     var computedHash = CryptoJS.HmacMD5(uri, secret_key);
     var computedHashString = computedHash.toString(CryptoJS.enc.Base64);
     var symptomName;
     var id;
     symptomName = $( "#symptoms" ).val();

     $.ajax({
         method: 'GET',
         url: 'https://sandbox-healthservice.priaid.ch/symptoms?token='+token+'&format=json&language=en-gb',
         dataType: 'json'
     }).done(function(data){
         console.log(data);
         getID(data);
         $.each(data, function(i, symptom){
             $('#symptoms').append('<option>' + symptom.Name + '</option>');
         });
     });

     getID = function(data){
         $( "#symptoms" ).change(function() {
             symptomName = $( "#symptoms" ).val();
             $.each(data, function(i, symptom){
             if(symptom.Name == symptomName){
                 id = symptom.ID;
             }
         });
         });

         return id;
     }
     
     getDiagnosis = function(){
         var age = $('.age').val();
         var gen = $('#gender').val();

         $.ajax({
         method: 'GET',
         url: 'https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=['+id+']&gender='+gen+'&year_of_birth='+age+'&token='+token+'&format=json&language=en-gb',
         dataType: 'json'
     }).done(function(data){
         console.log(data);
         $.each(data, function(i, symptom){

         });
     });
     }
     
     $('.diagn').on('click', function(){
         if($('.age').val().toString() != '' ){
             getDiagnosis();
             $('.diagnosis').css('display', 'block');
         }
     });
     
 });