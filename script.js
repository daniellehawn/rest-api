
"use strict";

var teamArr = [];

var BASE_URL = 'https://pacific-meadow-64112.herokuapp.com/data-api/';
var collection = 'dhawn';

//-----------------------------------------------------------------------------//
//These watch for button clicks to change the form

$('#showFootball').click(function() {
  showForm();
});



//write function to get data from the form and display in the table

	$("#submit-button").click(function() {
      event.preventDefault();
      teamArr.push({
        name: $("#input-name").val(),
        team: $("#input-team").val(),
        player: $("#input-player").val()
      })

      saveFootballData(teamArr);
//      updateFootballData(teamArr);
//      showTable();
//      buildTable();
      $("input").val(" ");
    });



function buildTable() {
  $("#build-tbody").empty();
  var tr, td, button;
  for (var i = 0; i < teamArr.length; i++) {
    tr = $("<tr>");
    
    td = $("<td>");
    td.text(teamArr[i].name);
    tr.append(td);
    
    td = $("<td>");
    td.text(teamArr[i].team);
    tr.append(td);
    
    td = $("<td>");
    td.text(teamArr[i].player);
    tr.append(td);
    
    td = $("<td>");
    button = $("<button type='button' id='btn' class='editBtn'>");
    button.text("Edit");
    td.append(button);
    button = $("<button type='button' id='btn' class='deleteBtn'>");
    button.text("Delete");
    td.append(button);
    tr.append(td);
    
    $("#build-tbody").append(tr);

  }

//Delete the Data
  $(".deleteBtn").click(function() {
    $(this).parents("tr").remove();
    var deleteId = $(this).parents().siblings(":first").text();
    teamArr = teamArr.filter(function(el) {
      return el.name !== deleteId;
    });
    saveFootballData(footballData);
  });

  // Edit Data
  $(".editBtn").click(function() {
    var editId = $(this).parents().siblings(":first").text();
    var editTeam = $.grep(teamArr, function(el) {
      return el.name === editId;
    })[0];
    showForm();
    $("#input-name").val(editTeam.name);
    $("#input-team").val(editTeam.team);
    $("#input-player").val(editTeam.player);
    teamArr = teamArr.filter(function(el) {
      return el.name !== editId;
    });
  });

}

getFootballData();

// Save Football Data to Database
function saveFootballData(teamArr) {
  $.ajax(BASE_URL + collection,
    {
    Method: 'POST',
    data: teamArr,
    success: alert("Save Successful"),
    error: reportAjaxError
  });
}

function getFootballData(){
  $.ajax(BASE_URL + collection,
        {
   method: 'GET',
   success: function(response){
     teamArr = response;
     buildTable();
   },
    error: reportAjaxError
  });
}

function updateFootballData(teamArr) {
    var team = {
      name: teamArr.name,
      team: teamArr.team,
      player: teamArr.player
    };
  $.ajax(BASE_URL + collection + '/' + teamArr.name, 
        {
    method: 'PUT',
    data: teamArr,
    success: buildTable,
    error: reportAjaxError
  } );
  }

function deleteFootballData(teamArr){
  $.ajax(BASE_URL + collection + '/' + teamArr.name,
        {
    method: 'DELETE',
    success: buildTable,
    error: reportAjaxError
  });
}

function reportResponse(){
  console.log(JSON.stringify(response, null, 4));
}

function reportAjaxError( jqXHR, textStatus, errorThrown ){
  $('#response').text( 'An AJAX error occurred!' );
}

//write function to show form

function showForm() {
  $('#showFootball').hide();
  $('#football-data').hide();
  $('#hide-form').show();
}

function showTable(){
  $('#showFootball').show();
  $('#football-data').show();
  $('#hide-form').hide();
}