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
    zoom: 13,
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
      "52 Duane St floor 7, New York",
    ],
    [
      40.7141640984682, 
      -73.98038810598143,
      "Top Floor, 551 Grand St, New York"
    ],
    [
      40.69667158212301, 
      -73.99769590519885,
      "Montague St &, Pierrepont Pl, Brooklyn"
    ],
    [
      40.71903776793416, 
      -74.05282025951381,
      "420 Grand St, Jersey City"
    ],
    [
      40.75036988927183,
      -74.0362621939909,
      "900 Madison St, Hoboken"
    ],
    [
      40.63707094554077, 
      -73.92680518212697,
      "5200 Kings Hwy Ste A, Brooklyn"
    ]
  ];

  for (let i = 0; i<markers.length; i++) {
    const currentMarker = markers[i]

    const location = { lat: currentMarker[0], lng: currentMarker[1] };
    const img = cofoveImg.cloneNode();

    const marker = new AdvancedMarkerElement({
      map: map,
      position: location,
      content: img  ,
      title: currentMarker[2],
      gmpClickable: true,
    });
  
    console.log("Marker został dodany do mapy:", marker);
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
  
    content.style.setProperty("--delay-time", "0s");
    intersectionObserver.observe(content);
  };
}

initMap();