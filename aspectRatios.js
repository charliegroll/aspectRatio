var aspectRatios = {

	setAspectRatio : function(){
			var ddVal = jQuery("#dd").val();
			var r = aspectRatios.findHeightWidth(ddVal.split(":")[0],ddVal.split(":")[1]);
			chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{height:r.height,width:r.width}, function(){});
	},

	setCustomAspectRatio : function(){
			try{
				var h = parseInt(jQuery("#customAspect1").val());
				var w = parseInt(jQuery("#customAspect2").val());
				var r = aspectRatios.findHeightWidth(h,w);
				chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{height:r.height,width:w.width}, function(){});
			}catch(err){
				console.log('error!');
			}
	},

	setResolution : function(){
		var v = jQuery("#model").val();
		var h = parseInt(v.split('x')[0]);
		var w = parseInt(v.split('x')[1]);
		var mode = jQuery("input:radio[name=mode]:checked").val();
		var r ={};
		if( ((mode == 'l') && (h>w)) || ((mode == 'p') && (w>h)) ){
				r.height = w;r.width = h;
		}else{
				r.height = h;r.width = w;
		}
		chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{height:r.height,width:r.width}, function(){});
	},

	setCustomResolution : function(){
			try{
				var h = parseInt(jQuery("#customRes1").val());
				var w = parseInt(jQuery("#customRes2").val());
				chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT,{height:h,width:w}, function(){});
			}catch(err){
				console.log('error!');
			}
	},

	reduce : function(numerator,denominator){
		  var gcd = function gcd(a,b){
		    return b ? gcd(b, a%b) : a;
		  };
		  gcd = gcd(numerator,denominator);
		  return {h:numerator/gcd,w:denominator/gcd};
	},

	findHeightWidth : function(h,w){
		var rHeight = 0;var rWidth = 0;var counter = 2;
		while( ((counter * h)<screen.height) && ((counter * w)<screen.width) ){
				rHeight = counter * h; rWidth = counter * w; counter++;
		}
		return {height:rHeight,width:rWidth};
	},
	
	validation : {
	
		isNumberKey : function(evt){
			var charCode = (evt.which) ? evt.which : event.keyCode
			if (charCode > 31 && (charCode < 48 || charCode > 57))
				return false;
			return true;
		}
	},

	populate : {
		populateDropDownDistinct : function(ddID,dataArr,propName){
			var makeDD = jQuery(ddID);
			var unique = {};
			var make = '';
			for( var i in dataArr ){
				 make = dataArr[i][propName];
				 if( typeof(unique[make]) == "undefined"){
			  		makeDD.append('<option value="'+make+'">'+make+'</option>');
			 	}
			 	unique[make] = 0;
		    }
		},
		populateDropDownFiltered : function(ddID,dataArr,propName,filterPropName,filterPropVal){
			var modelDD = jQuery(ddID);
			modelDD.html('');
			var make = '';
			var model = '';
			var ar = '';
			var res = '';
			for( var i in dataArr ){
				 model = dataArr[i][propName];
				 make = dataArr[i][filterPropName];
				 ar = dataArr[i].AR;
				 res = dataArr[i].Resolution;
				 if( make == filterPropVal){
			  		modelDD.append('<option value="'+res+'">'+model+' - '+ar+' - '+res+'</option>');
			 	}
		    }
		}
	}

}


jQuery(document).ready(function(){
  //set main info
  jQuery("#screen .height").text("Height: "+screen.height);
  jQuery("#screen .width").text("Width: "+screen.width);
  var r = aspectRatios.reduce(screen.height,screen.width);
  jQuery("#screen .aspectRatio").text("Aspect Ratio: "+r.h+":"+r.w);

  //populate device make dropdown
  aspectRatios.populate.populateDropDownDistinct("#make",deviceData,"Make");

  //attach events
  jQuery(".numberOnly").keypress(aspectRatios.validation.isNumberKey);
  jQuery("#ddBtn").click(aspectRatios.setAspectRatio);
  jQuery("#make").change(function(){
  	aspectRatios.populate.populateDropDownFiltered("#model",deviceData,"Device","Make",jQuery("#make").val());
  });
  jQuery("#customArBtn").click(aspectRatios.setCustomAspectRatio); 
  jQuery("#customResBtn").click(aspectRatios.setCustomResolution); 
  jQuery("#ddResBtn").click(aspectRatios.setResolution);
});