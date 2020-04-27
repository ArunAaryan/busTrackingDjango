$(document).ready(function() {
   $("#error-msg").css({"visibility":"hidden"});
    
    $("#example").css({"visibility" :"hidden"});
        $.fn.dataTable.ext.errMode = 'throw';
        
        var url = "http://localhost:5000/api/alerts"
        $("#example").dataTable().fnDestroy()


   
    $(function () {
        $('#start_date').datetimepicker({
            dateFormat:"dd-mm-yy",
            maxDate: $.now(),
            useCurrent:false,
            format: 'L'
        });
    });
    $(function () {
        $('#end_date').datetimepicker({
            dateFormat:"dd-mm-yy",
            maxDate: $.now(),
            useCurrent: false,
            format: 'L'
        });
    });

$("#user-search-btn").click(function (e) { 
    
    var start = $("#start_date").val();
    var end = $("#end_date").val();
    var alert_type = $("#alert-type").val();
    // console.log(start);
    if(start =='' || end==''){
        $("#error-msg").css({"visibility":"visible"});
        $("#error-msg").slideDown(function() {
            setTimeout(function() {
                $("#error-msg").slideUp();
            }, 1000);
        });
    }
    else{

    
        $("#error-msg").css({"visiblity":"hidden"})
    
    
    e.preventDefault();
    $("#example").css({"visibility" :"visible"});
    
    $('#example').DataTable( {
        ajax: {url:url,
        type:"POST",
        
        data : function(d){
            return JSON.stringify({"start_date":start,"end_date":end,
            "alert-type":alert_type})
        },
        contentType: "application/json; charset=utf-8",
    
        
        },
    
       
        
        
        dataSrc:'data',
        "order":[[0, "desc"]],
        "columns": [
            { "data":"date_time"},
            { "data":"bus_id"},
            {  "data":"driver_id"},
            {  "data":"driver_name"},
            {  "data":"alert_type"},
    ],
    dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            
            
    });
}//else
    
 });
    
});


    
     
 
