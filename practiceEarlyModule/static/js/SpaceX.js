const url = "https://api.spacexdata.com/v2/launchpads";

//var LaunchSites = d3.json(url).then(spaceXResults => 
//    console.log("LaunchSites", spaceXResults));


//var latvanLaunchSites= d3.json(url).then(spaceXResults =>
//        console.log("latvanLaunchSites", spaceXResults[0].location.latitude));

//var BlatvanLaunchSites= d3.json(url).then(spaceXResults =>
//            console.log("B", spaceXResults.location.latitude));

var MapSites = d3.json(url).then(function(data){

    latLong = data.map(place => console.log(place.location.latitude))});


////var latLongLaunchSites= d3.json(url).then(spaceXResults =>
//    console.log("latLongLaunchSites", spaceXResults.location));

//var siteLatLong = LaunchSites.map(sites => 
//            spaceXResults.location.latitude);
//    sites.location.latitude;
//    console.log("siteLatLong", siteLatLong);
        