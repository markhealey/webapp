

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

	//downloading appcache...
	window.applicationCache.addEventListener('downloading', downloadProgress, false);
	window.applicationCache.addEventListener("progress", downloadProgress, false);
	window.applicationCache.addEventListener('updateready', _swapCache, false);
	window.applicationCache.addEventListener('cached', _cachingDone, false);
};

function _cachingDone(){
	$(".progress").removeClass("active");
	$(".progress .bar").css("width", "0%");
}

function _swapCache(){

	window.setTimeout(function(){
		$(".progress").removeClass("active");

		window.applicationCache.swapCache();

		if (confirm('A new version of this app is available. Reload?')) {
			window.location.href = "index.html";
		}
	},1250);
}

var total;
var downloaded;

function downloadProgress(e) {
	total = e.total;
	downloaded = e.loaded;
	$(".progress .bar").css("width", (downloaded/total)*100 + "%");
	if (downloaded == total && total > 0 && downloaded > 0){
		total, downloaded = 0;
	}
};

$(function(){
	keepLinksLocalToWebApp();
	areYouOnline();
});


//if the manifest has changed, notify user
updateCacheThenApp();