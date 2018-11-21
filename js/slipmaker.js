var csvUpload;

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

var droparea = $('#upload_file_label')[0];
$('#upload_file_label').on('dragover',function(event){
    event.preventDefault();
})
$('#upload_file_label').on('drop', function(e){
  e.preventDefault();
  ParseFile(e.originalEvent.dataTransfer.files[0],e.originalEvent.dataTransfer.files[0].name);
})

function ToCSVFormat(){
  var csv_var = slipAsObject();
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

  var hiddenElement = $("#csv_file")[0];
  hiddenElement.click();
}

function SetFileName(){
  var fileName = "Name, Patient DateTime Discipline Branch"+ ".csv";
  return fileName;
}

function ParseFile(f_content, f_name){
  var reader = new FileReader();
  reader.onload = function(){
    console.log(f_name);
    csvUpload = d3.csvParse(reader.result);
    console.log(csvUpload);
    FillSections(csvUpload);
  }
  reader.readAsText(f_content, 'utf8');
}

function FillSections(droppedFile){
  $("#input_name").val(droppedFile[0].name);
  $("#input_order").val(droppedFile[0].order);
  $("#input_side_note").val(droppedFile[0].sideNotes);
  $("#input_requested_by").val(droppedFile[0].requestedBy);
  droppedFile[0].socFlag == "TRUE" ? $("#input_soc_box").prop('checked', true): $("#input_soc_box").prop('checked', false);
  droppedFile[0].orderFlag == "TRUE" ? $("#input_order_box").prop('checked', true): $("#input_order_box").prop('checked', false);
  droppedFile[0].urgentFlag == "TRUE" ? $("#input_urgent_box").prop('checked', true): $("#input_urgent_box").prop('checked', false);
  droppedFile[0].socRate;
}

function slipAsObject(){
   return {
    name: $("#input_name").val(),
    order: $("#input_order").val(),
    sideNotes: $("#input_side_note").val(),
    requestedBy: $("#input_requested_by").val(),
    socRate: "",
    socFlag: $("#input_soc_box").prop('checked'),
    orderFlag: $("#input_order_box").prop('checked'),
    urgentFlag: $("#input_urgent_box").prop('checked')
  };
}
