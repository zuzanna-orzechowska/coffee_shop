// map id: 41c024922768408
let map;

// intersection observer for drop animation for pins
const intersectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("drop");
      intersectionObserver.unobserve(entry.target);
    }
  }
});

async function initMap() {
  const position = { lat: 40.7117980058395, lng: -74.00644088824954 };
  //@ts-ignore
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: position,
    mapId: "41c024922768408",
  });

  //* marker img
  const cofoveImg = document.createElement("img");
  cofoveImg.src = "images/coffee-pin.png"; // <a href="https://www.freepik.com/icon/location_2007613#fromView=search&page=1&position=1&uuid=1300a385-6575-4567-a0b7-6fffc11ec43d">Icon by Freepik</a>

  // lat
  // lng
  // title
  //! DODAĆ KOLEJNE
  const markers = [
    [
      40.71421340552574,
      -74.00369659684144,
      "52 Duane St floor 7, New York"
    ]
  ];

  for (let i = 0; i<markers.length; i++) {
    const currentMarker = markers[i]

    const location = { lat: currentMarker[0], lng: currentMarker[1] };
    const marker = new AdvancedMarkerElement({
      map: map,
      position: location,
      content: cofoveImg,
      title: currentMarker[2],
      gmpClickable: true,
    });
    
    const infoWindow = new InfoWindow();
    marker.addListener("click", ({domEvent, latLng}) => {
      const { target } = domEvent;
      infoWindow.close();
      infoWindow.setContent(marker.title),
      infoWindow.open(marker.map, marker);
    });
  
    const content = marker.content;
    content.style.opacity = "0";
    content.addEventListener("animationend", (event) => {
      content.classList.remove("drop");
      content.style.opacity = "1";
    });
    const time = 0.5 + Math.random(); // 0.5s delay for easy to see the animation
  
    content.style.setProperty("--delay-time", time + "s");
    intersectionObserver.observe(content);
  };
}

initMap();