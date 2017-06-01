var BASE_URL = "https://pacific-meadow-64112.herokuapp.com/data-api/";
var collection = "dhawn";

$('#submit-button').on( 'click', handleCreateForm );
$('#read-list').on( 'click', handleReadList );
$('#delete-submit').on( 'click', handleDeleteForm);

function handleCreateForm( evt ) {
  evt.preventDefault();
  var name = $('#input-name').val();
  var team = $('#input-team').val();
  var player = $('#input-player').val();
  
  var person = {
    name: name,
    team: team,
    player: player,
  };
  createPerson( person );
} 

function createPerson( person ) {
  clearResponse( );
  $.ajax( BASE_URL + collection,
  {
    method: 'POST',
    data: person,
    success: reportResponse,
    error: reportAjaxError
  } ); 
}

function handleReadList( evt ){
  evt.preventDefault();
  getListOfPeople( );
}

function getListOfPeople( ){
  clearResponse( );
  $.ajax( BASE_URL + collection,
        {
    method: 'GET',
    success: reportResponse,
    error: reportAjaxError,
  });
}

function handleReadForm( evt ){
  evt.preventDefault();
  var id = $('#read-id').val();
  getPerson( id );
}

function getPerson( id ){
    clearResponse( );
  $.ajax( BASE_URL + collection + '/' + id,
        {
    method: 'GET',
    success: reportResponse,
    error: reportAjaxError,
  });
}

function handleDeleteForm( evt ){
  evt.preventDefault();
  var id = $('#delete-id').val();
  deletePerson( id );
}

function deletePerson( id ){
    clearResponse( );
  $.ajax( BASE_URL + collection + '/' + id,
        {
    method: 'DELETE',
    success: reportResponse,
    error: reportAjaxError,
  });
}

function reportResponse( response ){
  $('#response').text( JSON.stringify( response, null, 4 ) );
  
//    $("#build-tbody").empty();
//  var tr, td, button;
//  for (var i = 0; i < response.length; i++) {
//    tr = $("<tr>");
//    
//    td = $("<td>");
//    td.text(response[i].name);
//    tr.append(td);
//    
//    td = $("<td>");
//    td.text(response[i].team);
//    tr.append(td);
//    
//    td = $("<td>");
//    td.text(response[i].player);
//    tr.append(td);
//    
//    td = $("<td>");
//    td.text(response[i]._id);
//    tr.append(td);
//    
//    td = $("<td>");
//    button = $("<button type='button' id='btn' class='editBtn'>");
//    button.text("Edit");
//    td.append(button);
//    button = $("<button type='button' id='btn' class='deleteBtn'>");
//    button.text("Delete");
//    td.append(button);
//    tr.append(td);
//    
//    $("#build-tbody").append(tr);
}

function reportAjaxError( jqXHR, textStatus, errorThrown ){
  $('#response').text( 'An AJAX error occurred!' );
}

function clearResponse( ){
  $('#response').empty( );
}