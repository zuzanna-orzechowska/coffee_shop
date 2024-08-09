// map id: 41c024922768408
/*function initMap() {
    new google.maps.Marker ({
        position: {lat: 40.715589099555835, lng: -74.01265195125747},
        map,
        title: "Cofove cafeteria"
    })
}*/
async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
      center: { lat: 37.4239163, lng: -122.0947209 },
      zoom: 14,
      mapId: "4504f8b37365c3d0",
    });
    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: 37.4239163, lng: -122.0947209 },
    });
  }
  
  initMap();