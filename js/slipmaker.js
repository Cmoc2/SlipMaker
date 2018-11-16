$("#slip_background").on("input", function(){
})

/*
$('body').on("mousemove", function(event){
  console.log("x: " + event.clientX + " y: " + event.clientY);
})
*/
$("#slip_submit").on("click", function(){
  ToCSVFormat();
})

$("#csv_file").on("click", function(){
  $("csv_file").html(String($("csv_file").attr("download")));
});

function ToCSVFormat(){
  var csv_var = {
    name: $("#input_name").val(),
    order: $("#input_order").val(),
    sideNotes: $("#input_side_note").val(),
    requestedBy: $("#input_requested_by").val()
  }
  var csvHeader = Object.keys(csv_var);
  var csvContent = Object.values(csv_var);
  var csvReady = "";
  csvReady += csvHeader.join();
  csvReady += "\n";
  csvReady += csvContent.join();
  csvReady += "\n";

  console.log(csvReady);
  $("#csv_file").attr({
    "href": "data:text/csv;charset=utf-8," + csvReady,
    "target": "_blank",
    "download": SetFileName()
  });

  var hiddenElement = $("#csv_file");
  hiddenElement.click();
}

function SetFileName(){
  var fileName = "Name, Patient DateTime Discipline Branch"+ ".csv";
  return fileName;
}
