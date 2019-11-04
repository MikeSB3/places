//Business Logic for TripList
function TripList() {
  this.list = [];
  this.currentId = 0;
}

TripList.prototype.addTrip = function(trip) {
  trip.id = this.assignId();
  this.list.push(trip);
}

TripList.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

TripList.prototype.findTrip = function(id) {
  for(var i=0; i<this.list.length; i++) {
    if (this.list[i]) {
      if (this.list[i].id == id) {
        return this.list[i];
      }
    }
  };
  return false;
}

//Business Logic for Trip
function Trip(country, city, date, landmark) {
  this.country = country;
  this.city = city;
  this.date = date;
  this.landmark = landmark;
}

//User Logic
var tripList = new TripList();

function displayYourTrip (yourTripInfo) {
  var htmlForTrip = "";
  yourTripInfo.list.forEach(function(trip) {
    htmlForTrip += "<li id=" + trip.id + ">" + trip.country + " " + trip.city + " " + trip.date + " " + trip.landmark + "</li>";
  });
  $("ul.yourTrip").html(htmlForTrip);
}

function showTrip(tripId) {
  var list = tripList.findTrip(tripId);
  console.log(list);
    $("span.enterCountry").html(list.country);
    $("span.enterCity").html(list.city);
    $("span.enterDate").html(list.date);
    $("span.enterLandmark").html(list.landmark);
}

function attachTripListeners () {
  $("ul.yourTrip").on("click", "li", function() {
    showTrip(this.id);
  });
};

$(document).ready(function() {
  attachTripListeners();

  $("form#formOne").submit(function(event) {
    event.preventDefault();
    var enterCountry = $("input#enterCountry").val();
    var enterCity = $("input#enterCity").val();
    var enterDate = $("input#enterDate").val();
    var enterLandmark = $("input#enterLandmark").val();

    var newTrip = new Trip(enterCountry, enterCity, enterDate, enterLandmark);
    tripList.addTrip(newTrip);
    displayYourTrip(tripList);
  })
});
