//Pending List Event Listeners
$("#append_pending_list").on("click", function(e){
  var $li = $("<li />",
              {
                text: $("#input_name").val(),
                "class":"pending_list"
              });
  $($li).data(slipAsObject());
  $("#pending_list").append($li);
})

$(document).on("click", ".pending_list", function(list){
  var slipObject = $(list.target).data();
  console.log(slipObject);
  $("#input_name").val(slipObject.name);
  $("#input_order").val(slipObject.order);
  $("#input_side_note").val(slipObject.sideNotes);
  $("#input_requested_by").val(slipObject.requestedBy);
  $("#input_soc_box").prop('checked',slipObject.socFlag);
  $("#input_order_box").prop('checked',slipObject.orderFlag);
  $("#input_urgent_box").prop('checked',slipObject.urgentFlag);
})
