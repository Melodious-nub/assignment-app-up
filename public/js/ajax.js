$(document).on("click", ".metismenu li a, .navbar-nav  li a", function(e) {
	
	e.preventDefault();

	var page = $(this).attr("href");
	
	if ($(this).attr("target") == "_self") {window.location.href= page; return true};
	if ($(this).attr("target") == "_blank") window.open(page, "_blank");

	 if (page == "javascript: void(0);") return false;

	window.location.hash = page;

	$(".metismenu li").removeClass("mm-active");
	$(".metismenu li, .metismenu li a").removeClass("active");
	$(".metismenu ul").removeClass("in");

	$(".metismenu a").each(function() {
		var pageUrl = window.location.hash.substr(1);
		if ($(this).attr("href") == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("mm-active"); // add active to li of the current link
			$(this).parent().parent().addClass("mm-show");
			$(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
			$(this).parent().parent().parent().addClass("mm-active");
			$(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
			$(this).parent().parent().parent().parent().parent().addClass("mm-active");
		}
	});

	$(".navbar-nav a").removeClass("active"); 
	$(".navbar-nav li").removeClass("active"); 

	$(".navbar-nav a").each(function () {
		var pageUrl = window.location.hash.substr(1);
		if ( $(this).attr('href') == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active");
			$(this).parent().parent().addClass("active");
			$(this).parent().parent().parent().addClass("active");
			$(this).parent().parent().parent().parent().addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("active");
		}
	});

	 if (page == "javascript: void(0);") return false;

	call_ajax_page(page);
});

function call_ajax_page(page) {

	if(page === "index.html")
	{
		document.title = "Dashboard |  Dashonic - Responsive Bootstrap 5 Admin Dashboard";
	}
	else
	{
		var title = page.replace(".html", "");
		var title1 = title.replace("-", " ");
		document.title = title1.charAt(0).toUpperCase() + title1.slice(1) + " | Dashonic - Responsive Bootstrap 5 Admin Dashboard";
	}

	$.ajax({
		url: "ajax/" + page,
		cache: false,
		dataType: "html",
		type: "GET",
		success: function(data) {
			$("#ajaxresult").empty();
			$("#ajaxresult").html(data);
			window.location.hash = page;
			$(window).scrollTop(0);
		}
	});
	
}

document.addEventListener('DOMContentLoaded', function () {
	var currentPage = document.location.hash;
	if (currentPage) {
		currentPage = currentPage.replace("#", "");
		document.querySelector("#side-menu a[href='" + currentPage + "']") ? document.querySelector("#side-menu a[href='" + currentPage + "']").click() : call_ajax_page("index.html");
	} else {
		call_ajax_page("index.html");
	}
});

document.body.addEventListener("click", function (e) {
	if (!e.target.closest("#side-menu")) {
		if (e.target.hash) {
			var urlHash = e.target.hash.replace("#", '');
			if (document.querySelector("#side-menu a[href='" + urlHash + "']"))
				document.querySelector("#side-menu a[href='" + urlHash + "']").click()
		} else if (e.target.getAttribute("href")) {
			if (document.querySelector("#side-menu a[href='" + e.target.getAttribute("href") + "']"))
				document.querySelector("#side-menu a[href='" + e.target.getAttribute("href") + "']").click()
		}
	}
});
