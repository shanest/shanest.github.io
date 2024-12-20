var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 36.2509592,
			lng: -113.6922812
		},
		zoom: 5
	});
}

// Client ID and API key from the Developer Console
var CLIENT_ID = '237487679179-dm3so0r1sdtccj20plcqr6aqrnvb8dhr.apps.googleusercontent.com';
var CLIENT_ID = '237487679179-8h2u55ijv3hol8u7hbhh5m32ss206r34.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDHXg6EJPtVmHu-kR7UfPmCBdzXXCkVggU';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function() {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
		signoutButton.onclick = handleSignoutClick;
	}, function(error) {
		console.log(JSON.stringify(error, null, 2));
	});
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display = 'block';
		populateMap();
	} else {
		authorizeButton.style.display = 'block';
		signoutButton.style.display = 'none';
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

function getContentString(labels, values) {
	var str = '<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h1 id="firstHeading" class="firstHeading">' + values[0] + '</h1>' +
		'<div id="bodyContent">';
	for (i = 1; i < values.length; i++) {
		str += '<p><b>' + labels[i] + ':</b> ' + values[i];
	}
	str += '</div></div>';
	return str;
}

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function toggleLoc(loc) {
	return new google.maps.LatLng(
		loc.lat() + getRandom(-0.01, 0.01),
		loc.lng() + getRandom(-0.01, 0.01));
}

/**
 * Populate the map with markers from a particular spreadsheet
 */
function populateMap() {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '1JVKe600AE3aGnrJdKicZH7jCbQ1r1PxM_nEYMcG2m7A',
		range: 'Sheet1',
	}).then(function(response) {
		var range = response.result;
		var geocoder = new google.maps.Geocoder();
		var fields = range.values[0];
		var markers = [];
		var values = [];
		$.each(range.values.slice(1), function(index, value) {
			console.log(value);
			var infowindow = new google.maps.InfoWindow({
				content: getContentString(fields, value)
			});
			geocoder.geocode({
				'address': value[1]
			}, function(results, status) {
				if (status == 'OK') {
					var loc = toggleLoc(results[0].geometry.location);
					console.log(loc)
					var marker = new google.maps.Marker({
						map: map,
						position: loc //results[0].geometry.location
					});
					marker.addListener('click', function() {
						infowindow.open(map, marker);
					});
				}
			});

		});
	}, function(response) {
		console.log('Error: ' + response.result.error.message);
	});
}
