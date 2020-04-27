$(document).ready(function() {
    console.log('jquery loaded');

    $("#error-msg").css({"visibility":"hidden"});

    $("#example").css({"visibility" :"hidden"});
    
        $.fn.dataTable.ext.errMode = 'throw';
    
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
        
    
        $("#searchBus").click(function (e) { 
            var start = $("#start_date").val();
                var end = $("#end_date").val();
    
    
            e.preventDefault();
            var busno = $("#busno").val();
            console.log(busno);
            console.log(start);
            console.log(end);
            if (busno != ''){
                if(start!='' && end!=''){

                
                var url = "http://127.0.0.1:5000/api/"+busno+"/dailyrunhours/latest"
                $("#error-msg").text("")
                $("#example").css({"visibility" :"visible"});
                $("#example").dataTable().fnDestroy()
                $('#example').DataTable( {
                    ajax: {url:url,
                        type:"POST",
                        
                        data : function(d){
                            return JSON.stringify({ "start_date":start,"end_date":end })
                        },
                        contentType: "application/json; charset=utf-8",
                        
                        },
                 
                    dataSrc:'data',
                    "order":[[0, "desc"]],
                    "columns": [
                        { "data":"date_time"},
                       {  "data":"bus_id"},
                       {  "data":"daily_run_hours"},
                    ],
                    dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
                } );
            } else{
                $("#error-msg").text("Dates cannot be empty");
                $("#error-msg").css({"visibility":"visible"});
        $("#error-msg").slideDown(function() {
            setTimeout(function() {
                $("#error-msg").slideUp();
            }, 1000);
        });
            }
        }
            else{
                $("#error-msg").text("BusNo cannot be empty");
                $("#error-msg").css({"visibility":"visible"});
        $("#error-msg").slideDown(function() {
            setTimeout(function() {
                $("#error-msg").slideUp();
            }, 1000);
        });
            }
        });
        
    } );