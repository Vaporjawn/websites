var Carousel = function(id, initialIndex, cyclic, transitionTimeDelay) {
  this.id = id;
  this.cycle = cyclic;
  this.currentImage = initialIndex || 0;
  this.timing = transitionTimeDelay;
  this.midTransition = false;
  this.node = document.getElementById(this.id);
  this.images = this.node.getElementsByClassName("slide")[0].getElementsByTagName("img");
  this.imageCount = this.images.length;
  if (this.node.getElementsByClassName("carousel-indicators").length > 0) {
    this.attachIndicators();
  }
  var myself = this;
  this.node.querySelector('[data-action="next"]').onclick = function() {myself.nextImage();}
	this.node.querySelector('[data-action="previous"]').onclick = function() {myself.previousImage();}

  SwipeDetection(this.node, function(direction){
		if (direction == SwipeDetection.DIRECTION_LEFT) myself.nextImage();
		if (direction == SwipeDetection.DIRECTION_RIGHT) myself.previousImage();
	}, 100, 50, 500);
  this.images[this.currentImage].setAttribute("class", "active");
  this.updateImageMeta(this.images[this.currentImage]);
}

Carousel.prototype.attachIndicators = function() {
  var myself = this;
  this.indicators = [];
  for (i = 0; i < this.imageCount; i++) {
    this.indicators[i] = document.createElement("li");
    this.indicators[i].setAttribute("data-slide", i);
    this.indicators[i].addEventListener('click',function(e) {myself.showImage(e.target.getAttribute("data-slide"));});
    this.node.getElementsByClassName("carousel-indicators")[0].appendChild(this.indicators[i]);
  }
  this.indicators[this.currentImage].setAttribute("class", "active");
}

Carousel.prototype.nextImage = function() {this.showImage(this.currentImage+1);}
Carousel.prototype.previousImage = function() {this.showImage(this.currentImage-1);}

Carousel.prototype.showImage = function(request) {
  if (request == this.currentImage) return;

  if (this.midTransition == true) {return;};
  var forward = request > this.currentImage ? true : false;

  var current = this.currentImage;
  this.currentImage = Carousel.validateIndex(request, 0, this.imageCount, this.cycle);
  var forward = this.currentImage > current ? true : false;

  var shown = this.images[this.currentImage];
  var lastShown = this.images[current];

  if (forward) lastShown.setAttribute("class", "previous");
  else lastShown.setAttribute("class", "next");

  shown.setAttribute("class", "active " + (forward ? "right" : "left"));

  this.midTransition = true;
  var myself = this;
  setTimeout(function() {
    myself.midTransition = false;
    lastShown.setAttribute("class", "");
    shown.setAttribute("class", "active");
  }, this.timing);

	if (this.indicators) {
    this.indicators[current].setAttribute("class", "");
    this.indicators[this.currentImage].setAttribute("class", "active");
  }
  this.updateImageMeta(shown);
}

Carousel.prototype.updateImageMeta = function(image) {
  if (image.getAttribute("data-link")) {
    //image.style.cursor="pointer";
    image.onclick = function(e) {
      var link = e.target.getAttribute("data-link");
      window.open(link);
    }
  }
  //else {image.style.cursor = "default";}

  if (this.node.getElementsByClassName("count").length > 0) {
    this.node.getElementsByClassName("count")[0].innerHTML = (this.currentImage+1)+"/"+this.imageCount;
  }
  this.node.getElementsByClassName("carousel-caption")[0].innerHTML = this.images[this.currentImage].getAttribute("alt");
}

Carousel.validateIndex = function(request, min, max, shouldCycle) {
  if (request < min) {
    if (shouldCycle) return max-Math.abs(1*request);
    else return min;
  }
  else if (request > max-1) {
    if (shouldCycle) return min+Math.abs(max-request);
    else return max-1;
  }
  else if (request!==undefined) return request;
}


var setupCarousel = function() {
	if (document.getElementById("mainCarousel")) new Carousel("mainCarousel", 0, true, 600);
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupCarousel);
else setupCarousel();