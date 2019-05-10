$(document).ready(function(){

//call the api of informaton
var totalInfo =  $.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    async: false,
    success: cb, //send the information to a funtion for save it in variable
});


var data; //variable for save the information

//callback function for save the ajax information
function cb(info) {
  data = info;
}

//print the informacion at the begin
$( data.results ).each(function( index ) {
  $('<div id = "newElement" class="col text-center resumen mb-5 p-3">' + "<img src='"+data.results[index]["picture"]["medium"]+"' class='img-fluid rounded-circle' /><br><h3 class='mt-3'>" +data.results[index]["name"]["first"] +" " +data.results[index]["name"]["last"]+ "</h3><p>"+ data.results[index]["email"]+"</p><br><a type='button' href='#"+ "element"+index+"' class='btn btn-light mas' id='"+index+"' role='button'>Ver detalles</a>" +'</div>').prependTo($('#div1'));
});

//function for search information based in keyup event
$('#searcher').keyup(function(){
    //Validate if the searcher input is empty print all values of the ajax callback
    if($("#searcher").val() == "")
    {
      //print all results of the callback
      $( data.results ).each(function( index ) {
        $("#newElement").remove();
        //use de index for add ids
        $('<div id = "newElement" class="col text-center resumen mb-5 p-3">' + "<img src='"+data.results[index]["picture"]["medium"]+"' class='img-fluid rounded-circle' /><br><h3 class='mt-3'>" +data.results[index]["name"]["first"] +" " +data.results[index]["name"]["last"]+ "</h3><p>"+ data.results[index]["email"]+"</p><br><a type='button' href='#"+ "element"+index+"' class='btn btn-light mas' id='"+index+"' role='button'>Ver detalles</a>" +'</div>').prependTo($('#div1'));
      });
    }
    else{ //if the searcher element has values make a filter
      var lookingFor = $("#searcher").val().toLowerCase(); //save in lowercase the value to search
      var expression = new RegExp(lookingFor, "i"); //save the value to seach in a regular expression
      $("#div1 #newElement").filter(function() {//return the element that match the criteria
          $(this).toggle($(this).text().toLowerCase().indexOf(lookingFor) > -1);//show the element if exists a coincidence
      });
    }
});//end funtion searcher


//function for show all the individual information
$( "a.mas" ).click(function() {
    var ids = $(this).attr('id'); //get id of the "button" element for match the index in the ajax callback
    //addClass for styles of results
    $(".principal, .complement").addClass("col-12 col-md-6");
    $(".principal").removeClass("col-12");
    $("a.btn").removeClass("active");
    //erase the container for results for don't pile up results
    $("#div2 div").remove();
    //print the result of all information demanded
    $('<div id = "newElement-'+ids+'" class="col text-center completo"><div class="text-right"><div id="element'+ids+'"></div><a type="button" class="btn closer" role="button" id="b-'+ids+'"><i class="fas fa-times-circle"></i></a></div><img src="'+data.results[ids]["picture"]["large"]+'" class="img-fluid rounded-circle" /><br><h3 class="mt-3">' +data.results[ids]["name"]["first"] +' ' +data.results[ids]["name"]["last"]+ '</h3><div class="moreinfo border py-5 px-3 mb-5"><div><label class="font-weight-bold">Email:</label><p> '+data.results[ids]["email"]+'</p></div><div><label class="font-weight-bold">Phone: </label><p> '+data.results[ids]["phone"]+'</p></div><div><label class="font-weight-bold">Cell: </label><p> '+data.results[ids]["cell"]+'</p></div><div><label class="font-weight-bold">Nationality: </label><p> '+data.results[ids]["nat"]+'</p></div><div><label class="font-weight-bold">Post Code: </label><p> '+data.results[ids]["location"]["postcode"]+'</p></div><div><label class="font-weight-bold">Location: </label><p> '+data.results[ids]["location"]["street"]+ ', ' + data.results[ids]["location"]["city"]+', '+ data.results[ids]["location"]["state"] +'</p></div></div></div>').prependTo($('#div2'));
    //addClass to indicate the "button" clicked
    $("a#"+ids).addClass("active");
    //disable the "button" to execute functionalite
    $("a#"+ids).unbind('click', true);
});//end function show


//function for close the "all information" container
$( document ).on("click", ".closer" ,function(event) {
    var id = $(this).attr('id'); //get the id of the "button" for close
    var ids = id.substr(2); //return the number correspond to the close element to use as id matcher
    $("#newElement-"+ids).remove();//eliminite all elements in the Container
    //validate the "button" for show information and add classes for indicate if it is valiable for use it
    if($("a#"+ids).hasClass("disable"))
    {
      $("a#"+ids).addClass("active");
      $("a#"+ids).removeClass("disable");
    }else{
      $("a#"+ids).removeClass("active");
      $("a#"+ids).addClass("disable");
    }
    //addClass for styles of results
    $(".principal").removeClass("col-md-6");
    $(".principal").addClass("col-12");
    //active the "button" for show all information to execute functionalite
    $("a#"+ids).bind('click');
});//end funtion close


});
