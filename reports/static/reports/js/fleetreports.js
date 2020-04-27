$(document).ready(function() {
    function show_error(errorobj){
        $("#error-msg").text(errorobj.error);
            $("#error-msg").css({"visibility":"visible"});
                $("#error-msg").slideDown(function() {
                    setTimeout(function() {
                        $("#error-msg").slideUp();
                    }, 1000);
                });
        
                $("#example").css({"visibility" :"hidden"});
    }

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

    //  datatable function
    function show_data_table(results){
        $('#example').DataTable({
            responsive: true,
            data :results,
            "columns":[
                {"data":"bus_id"},
                {"data":"date"},
                {"data":"time"},
                {"data":"speed"},
                {"data":"location"},
                {"data":"battery_status"},
                {"data":"ignition"}
            ],
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
        })
    }


     $("#user-search-btn").click(function (e) { 
        e.preventDefault();
        $("#example").dataTable().fnDestroy();
        var bus_id = $("#bus_id").val();
        var start = $("#start_date").val();
        var end = $("#end_date").val();
        console.log(bus_id);
        if(bus_id!==''){
            
            if(start =='' || end==''){
                show_error({"error":"Dates cannot be empty"})
            }
            else{
                
                $("#error-msg").css({"visiblity":"hidden"})
                
                $("#example").css({"visibility" :"visible"});
                url ="https://5ea476ae270de6001646056f.mockapi.io/reports/fleetsummary";
                axios({
                data:{"bus_no":bus_id,
                        "start_date":start,
                        "end_date":end
                    },
                    method:"post",
                    url:url,
                }).then(function(response)
                {   
                    
                    if("error" in response.data){
                        show_error(response.data)
                    }
                    else{
                        show_data_table(response.data)
                    }
                   
                })
                .catch(function(error){
                    console.log(error);
                });
            }//else
        }else{
            show_error({"error":"Bus no can't be empty"})
        }
        
     });

    });