var galleryIndex = 0, photoIndex = 0, insertingPhotoSemaphore = false, image_class = "full_width";
var galleries = [
	{
		title: (language == 'pt'?"Galeria":"Gallery"),
		photos: [
			{
				title:(language == 'pt'?"Escultura 1":"Sculpture 1"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0001.jpg",
				src:"images/escultura_0001.jpg",
				scrollTop:0.25
			},
			{
				title:(language == 'pt'?"Escultura 2":"Sculpture 2"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0002.jpg",
				src:"images/escultura_0002.jpg",
				scrollTop:0.3
			},
			{
				title:(language == 'pt'?"Escultura 3":"Sculpture 3"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0003.jpg",
				src:"images/escultura_0003.jpg",
				scrollTop:0.6
			},
			{
				title:(language == 'pt'?"Escultura 4":"Sculpture 4"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0004.jpg",
				src:"images/escultura_0004.jpg",
				scrollTop:0.15
			},
			{
				title:(language == 'pt'?"Escultura 5":"Sculpture 5"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0005.jpg",
				src:"images/escultura_0005.jpg",
				scrollTop:0.3
			},
			{
				title:(language == 'pt'?"Escultura 6":"Sculpture 6"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0006.jpg",
				src:"images/escultura_0006.jpg",
				scrollTop:0.1
			},
			{
				title:(language == 'pt'?"Escultura 7":"Sculpture 7"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0007.jpg",
				src:"images/escultura_0007.jpg",
				scrollTop:0
			},
			{
				title:(language == 'pt'?"Escultura 8":"Sculpture 8"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0008.jpg",
				src:"images/escultura_0008.jpg",
				scrollTop:0.2
			},
			{
				title:(language == 'pt'?"Escultura 9":"Sculpture 9"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0009.jpg",
				src:"images/escultura_0009.jpg",
				scrollTop:0.2
			},
			{
				title:(language == 'pt'?"Escultura 10":"Sculpture 10"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0010.jpg",
				src:"images/escultura_0010.jpg",
				scrollTop:0.45
			},
			{
				title:(language == 'pt'?"Escultura 11":"Sculpture 11"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0011.jpg",
				src:"images/escultura_0011.jpg",
				scrollTop:0.45
			},
			{
				title:(language == 'pt'?"Escultura 12":"Sculpture 12"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0012.jpg",
				src:"images/escultura_0012.jpg",
				scrollTop:0
			},
			{
				title:(language == 'pt'?"Escultura 13":"Sculpture 13"),
				description:(language == 'pt'?"Escultura em metal oxidado. Preço sob consulta.":"Metal sculpture."),
				thumb:"images/thumbs/escultura_0013.jpg",
				src:"images/escultura_0013.jpg",
				scrollTop:0.2
			}
		]
	}
];

function insertPhoto() {
	// Checking semaphore
	if(insertingPhotoSemaphore) {
		return;
	}

	// Setting semaphore to TRUE
	insertingPhotoSemaphore = true;

	if(galleries.length > galleryIndex) {
		gallery = galleries[galleryIndex];
	} else {
		galleryIndex = 0;
		gallery = galleries[galleryIndex];
	}

	if(gallery.photos.length > photoIndex) {
		photo = gallery.photos[photoIndex];
	} else {
		photoIndex = 0;
		photo = gallery.photos[photoIndex];
	}

	var firstPhoto = (photoIndex == 0);
	var lastPhoto = (photoIndex == gallery.photos.length-1);

	$("#loader").addClass("loading").children("img").remove();

	$("body").scrollTop(0);

	// Insert Image Tag
	var img = new Image();
	$(img).attr("alt", photo.title).addClass(image_class).load(function () {
		$("#loader").removeClass("loading").append(this);
		$("body").scrollTop($(this).attr("height")*photo.scrollTop);
		insertingPhotoSemaphore = false;
	}).error(function () {
		// notify the user that the image could not be loaded
	}).click(function() {
		$(this).toggleClass("full_width").toggleClass("full_height");
		image_class = $(this).attr("class");
		$("body").scrollTop($(this).attr("height")*photo.scrollTop);
	}).attr("src", photo.src);

	$("span.description").html(photo.description);

	if(firstPhoto) {
		$(".image-arrow.prev").addClass("hide");
	} else {
		$(".image-arrow.prev").removeClass("hide");
	}

	if(lastPhoto) {
		$(".image-arrow.next").addClass("hide");
	} else {
		$(".image-arrow.next").removeClass("hide");
	}
}

function qTipGalleriesContent() {
	var content = "";

	for(var gallery in galleries) {
		var photoIndex = 0;

		content += "<h1>"+galleries[gallery].title+"</h1>";
		content += "<div class=\"row\">";
		content += "<div class=\"qtip-image-arrow prev\"><div class=\"arrow hide\"></div></div>";
		for(var photo in galleries[gallery].photos) {
			content += "<div class=\"thumb"+(++photoIndex > 5 ? " hide" : "")+"\"><a href=\"#/photo/"+(parseInt(gallery)+1)+"/"+(parseInt(photo)+1)+"\"><img src=\""+galleries[gallery].photos[photo].thumb+"\" alt=\""+galleries[gallery].photos[photo].title+"\" /></a></div>";
		}
		content += "<div class=\"qtip-image-arrow next\"><div class=\"arrow"+(galleries[gallery].photos.length > 5 ? "" : " hide")+"\"></div></div>";
		content += "</div>";
	}

	return content;
}

$(function() {
	// QTip Language
	$("a.language").qtip({
		content: (language == 'pt'?"English":"Português"),
		position: {
			corner: {
				target: "topMiddle",
				tooltip: "bottomLeft"
			}
		},
		style: {
			name:"dark",
			tip:true,
			border: {
				radius:5
			}
		},
		hide: {
			delay:100,
			fixed:true
		}
	});

	// QTip Galleries
	$("a.galleries").qtip({
		content: qTipGalleriesContent(),
		position: {
			corner: {
				target: "topMiddle",
				tooltip: "bottomLeft"
			}
		},
		style: {
			width:650,
			name:"dark",
			tip:true,
			border: {
				radius:5
			}
		},
		hide: {
			delay:500,
			fixed:true
		},
		api: {
			onRender: function() {
				this.elements.content.find(".qtip-image-arrow.prev .arrow").click(function() {
					var lastShow = $(this).parents(".row").children(".thumb:not(.hide):last");
					var lastHide = $(this).parents(".row").children(".thumb:not(.hide):first").prev();
					lastShow.addClass("hide");
					lastHide.removeClass("hide");

					if(!$(this).parents(".row").children(".thumb:first").hasClass("hide")) {
						$(this).addClass("hide");
					}

					if($(this).parents(".row").children(".thumb:last").hasClass("hide")) {
						$(this).parents(".row").find(".qtip-image-arrow.next .arrow").removeClass("hide");
					} else {
						$(this).parents(".row").find(".qtip-image-arrow.next .arrow").addClass("hide");
					}
				});

				this.elements.content.find(".qtip-image-arrow.next .arrow").click(function() {
					var firstShow = $(this).parents(".row").children(".thumb:not(.hide):first");
					var firstHide = $(this).parents(".row").children(".thumb:not(.hide):last").next();
					firstShow.addClass("hide");
					firstHide.removeClass("hide");

					if(!$(this).parents(".row").children(".thumb:last").hasClass("hide")) {
						$(this).addClass("hide");
					}

					if($(this).parents(".row").children(".thumb:first").hasClass("hide")) {
						$(this).parents(".row").find(".qtip-image-arrow.prev .arrow").removeClass("hide");
					} else {
						$(this).parents(".row").find(".qtip-image-arrow.prev .arrow").addClass("hide");
					}
				});
			}
		}
	});

	// QTip Curriculum
	$("a.curriculum").qtip({
		content: {
			url: "curriculum.php?lang="+language
		},
		position: {
			corner: {
				target: "topMiddle",
				tooltip: "bottomLeft"
			}
		},
		style: {
			width:640,
			name:"dark",
			tip:true,
			border: {
				radius:5
			}
		},
		hide: {
			delay:500,
			fixed:true
		}
	});

	// QTip Contacts
	$("a.contacts").qtip({
		content: {
			url: "contacts.php?lang="+language
		},
		position: {
			corner: {
				target: "topMiddle",
				tooltip: "bottomLeft"
			}
		},
		style: {
			width:250,
			name:"dark",
			tip:true,
			border: {
				radius:5
			}
		},
		hide: {
			delay:500,
			fixed:true
		}
	});

	// Previous Arrow
	$(".image-arrow.prev").hover(
		function () {
			$(this).children(".arrow").removeClass("hide");
		},
		function () {
			$(this).children(".arrow").addClass("hide");
		}
	).click(function() {
		$.address.value("/photo/"+(parseInt(galleryIndex)+1)+"/"+(parseInt(--photoIndex)+1));
	});

	// Next Arrow
	$(".image-arrow.next").hover(
		function () {
			$(this).children(".arrow").removeClass("hide");
		},
		function () {
			$(this).children(".arrow").addClass("hide");
		}
	).click(function() {
		$.address.value("/photo/"+(parseInt(galleryIndex)+1)+"/"+(parseInt(++photoIndex)+1));
	});

	// jQuery Address
	$.address.change(function(event) {
		galleryIndex = parseInt(event.value.split('/')[2])-1;
		photoIndex = parseInt(event.value.split('/')[3])-1;
		insertPhoto();
	}).externalChange(function(event) {
		if(event.value.split('/')[2] && event.value.split('/')[3]) {
			galleryIndex = parseInt(event.value.split('/')[2])-1;
			photoIndex = parseInt(event.value.split('/')[3])-1;
		}

		insertPhoto();
	});
});