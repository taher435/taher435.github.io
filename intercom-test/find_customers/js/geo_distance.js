(function(){
  if (typeof(Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
    }
  }
})();

var earthRadius = 6371; //in kms

//this function uses Sphreical law of cosines from https://en.wikipedia.org/wiki/Great-circle_distance
function calculateGeoDistance(fromLat, fromLong, toLat, toLong){

  var dLong = (toLong - fromLong).toRadians();
  var deltaSigma = Math.acos( (Math.sin(fromLat.toRadians()) * Math.sin(toLat.toRadians())) + ( Math.cos(fromLat.toRadians()) * Math.cos(toLat.toRadians()) * Math.cos(dLong) ));

  return deltaSigma * earthRadius;
}
