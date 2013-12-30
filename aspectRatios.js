var aspectRatios = {

	setAspectRatio : function(){
		var ddVal = jQuery("#dd").val();
		var r = aspectRatios.findHeightWidth(ddVal.split(":")[0],ddVal.split(":")[1]);
		chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{height:r.height,width:r.width}, function(){});
	},

	reduce : function(numerator,denominator){
		  var gcd = function gcd(a,b){
		    return b ? gcd(b, a%b) : a;
		  };
		  gcd = gcd(numerator,denominator);
		  return numerator/gcd+":"+denominator/gcd;
	},

	findHeightWidth : function(h,w){
		var rHeight = 0;var rWidth = 0;var counter = 2;
		while( ((counter * h)<screen.height) && ((counter * w)<screen.width) ){
				rHeight = counter * h; rWidth = counter * w; counter++;
		}
		return {height:rHeight,width:rWidth};
	}

}


jQuery(document).ready(function(){
  jQuery("#screen .height").text("Screen Height: "+screen.height);
  jQuery("#screen .width").text("Screen Width: "+screen.width);
  jQuery("#screen .aspectRatio").text("Screen Aspect Ratio: "+aspectRatios.reduce(screen.height,screen.width));
  jQuery("#ddBtn").click(aspectRatios.setAspectRatio);
});


