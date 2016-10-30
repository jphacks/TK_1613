var compass = (function(){

//目標地点
var targetLat = 35.286119;
var targetLon = 136.883540;

var lat,lon,heading;
var relativeAzimuth;

// 2点間の方位角を求める関数()
function VincentyInverse(lat1, lon1, lat2, lon2) {
	var a = 6378137.0, b = 6356752.31414036, f = 1 / 298.257222101;
	var imax = 50;
	var lat1 = lat1, lng1 = lon1;
	var lat2 = lat1, lng2 = lon2;

	var omega = (lng2 - lng1) * Math.PI / 180.0;
	var U1 = Math.atan((1 - f) * Math.tan(lat1 * Math.PI / 180.0));
	var U2 = Math.atan((1 - f) * Math.tan(lat2 * Math.PI / 180.0));

	var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
	var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);

	var lamuda = omega, lamuda0;
	for (var i = 0; i < imax; i++) {
		var sinSigma = Math.sqrt(Math.pow(cosU2 * Math.sin(lamuda), 2) + Math.pow(cosU1 * sinU2 - sinU1 * cosU2 * Math.cos(lamuda), 2));
		var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * Math.cos(lamuda);
		var sigma = Math.atan2(sinSigma, cosSigma);

		var sinAlfa = cosU1 * cosU2 * Math.sin(lamuda) / sinSigma;
		var cosAlfa2 = 1.0 - Math.pow(sinAlfa, 2);
    //if (cosAlfa2 == 0) cosAlfa2 = 1.0e-20;
    if (cosAlfa2 == 0) return 0;

    var cos2Simgam = cosSigma - (2 * sinU1 * sinU2 / cosAlfa2);
    var C = (f / 16.0) * cosAlfa2 * (4 + f * (4 - 3 * cosAlfa2));

    lamuda0 = lamuda;
    lamuda = omega + (1 - C) * f * sinAlfa * (sigma + C * sinSigma * (cos2Simgam + C * cosSigma * (-1 + 2 * Math.pow(cos2Simgam, 2))));

    if (Math.abs(lamuda - lamuda0) <= 1.0e-12) break;
  }

  var uu = cosAlfa2 * (a * a - b * b) / (b * b);
  var A = 1 + (uu / 16384.0) * (4096 + uu * (-768 + uu * (320 - 175 * uu)));
  var B = (uu / 1024.0) * (256 + uu * (-128 + uu * (74 - 47 * uu)));
  var dSigma = B * sinSigma * (cos2Simgam + (B / 4.0) * (cosSigma * (-1 + 2 * Math.pow(cos2Simgam, 2))
  	- (B / 6.0) * cos2Simgam * (-3 + 4 * Math.pow(sinSigma, 2)) * (-3 + 4 * Math.pow(cos2Simgam, 2))));
  var s = b * A * (sigma - dSigma);

  var az1 = Math.atan2((cosU2 * Math.sin(lamuda)), (cosU1 * sinU2 - sinU1 * cosU2 * Math.cos(lamuda)));
  var az2 = Math.atan2((cosU1 * Math.sin(lamuda)), (-sinU1 * cosU2 + cosU1 * sinU2 * Math.cos(lamuda))) + Math.PI;

  if (az1 < 0) az1 = az1 + Math.PI * 2.0;
  if (i >= imax) i = imax - 1;
  if (!isFinite(s)) return 0;

  return {
  	distance: s.toFixed(4),
  	azimuth1: az1 * 180.0 / Math.PI,
  	azimuth2: az2 * 180.0 / Math.PI,
  	itimes: i + 1
  };
};

function renderCompass(result,heading){
	relativeAzimuth = heading + result.azimuth1;
  //console.log(direction);
  document.getElementById("compass").innerHTML = heading;
  if(result.azimuth1){
  	document.getElementById("azi1").innerHTML = result.azimuth1;
  	document.getElementById("azi2").innerHTML = result.azimuth2;
  }
  $("#north").css({"transform":"rotate("+heading+"deg)"});
  $("#azi").css({"transform":"rotate("+relativeAzimuth+"deg)"});
}
  
function getPosition(position){
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	console.log(lat,lon);
}
  
function handleOrientation(event){//デバイスの向きの変化で実行
  	heading    = event.alpha + 180;
  	relativeDirection = 0;
  	var result = VincentyInverse(lat, lon, targetLat, targetLon);
  //35.692672, 139.757896
  //35.286119, 136.883540
  console.log(result.azimuth2,heading);
  
  //renderCompass(relativeAzimuth);
  renderCompass(result,heading);
}
  
// 位置情報の追跡を開始する
//var watchId = navigator.geolocation.watchPosition(getPosition);
// 端末の向きを監視
//window.addEventListener('deviceorientation', handleOrientation);

return {
  VincentyInverse: VincentyInverse
};

}());