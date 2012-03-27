

function areYouOnline(){
	var online = navigator.onLine;
	if (!online) { 
		alert("You are NOT online..."); 
	} else {

	}
};

//default behavior is to open links in new window
function keepLinksLocalToWebApp() {
	$("a").click(function(e){
		e.preventDefault();
		window.location = $(this).attr("href");
	});
};

$("a.pg2").click(function(e){
	e.preventDefault();
	$.ajax({
		url: "page2-ajax.html",
		type: "GET",
		dataType:"html"
	}).done(function(jqxhr,txtStatus){
		$(".homebuttons").hide();
		$(".pg2content").html(jqxhr);
		//location.hash = "page2";
	}).fail(function(jqxhr,txtStatus){
		if (navigator.onLine) {alert("oops");} else{alert("You are offline.")};
	});
});

function updateCacheThenApp() {
	window.applicationCache.addEventListener('updateready', function(e) {
	    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	      // Browser downloaded a new app cache.
	      // Swap it in and reload the page to get the new hotness.
	      window.applicationCache.swapCache();
	      if (confirm('A new version of this app is available. Load it?')) {
	        //window.location.reload();
	        window.location.href = "index.html";
	      }
	    } else {
	      // Manifest didn't changed. Nothing new to server.
	    }
	  }, false);
};

$(function(){
	//if the manifest has changed, notify user
	updateCacheThenApp();

	keepLinksLocalToWebApp();

	areYouOnline();
});