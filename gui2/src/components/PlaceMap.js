import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const PlaceMap = ({ onClose }) => {
  const [data, setData] = useState(null);
  const mapRef = useRef();
  const [marker, setMarker] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [geocoder, setGeocoder] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 48, lng: 2 });

  useEffect(() => {
    if (window.google) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDE0Qmrx_Qn5Nx04wvENvJ_riRGll6-tx0",
  });
  if (!isLoaded) return <div>Loading...</div>;

  const MapStyle = {
    width: "100%",
    height: "100vh",
  };

  const onMapClick = async (e) => {
    const result = await geocode({ location: e.latLng });
    handleResult(result);
  };

  const geocode = async (request) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode(request, (results, status) => {
        if (status === "OK") {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  const handleResult = (results) => {
    setMapCenter(results[0].geometry.location);
    setMarker({
      position: results[0].geometry.location,
    });
    let firstLocation = results[0].geometry.location;

    console.log(firstLocation);

    let lat = firstLocation.lat();
    let lng = firstLocation.lng();

    console.log(lat); // prints the latitude
    console.log(lng); // prints the longitude
    setData({ lat, lng });
  };

  const handleClose = () => {
    onClose(data);
  };

  return (
    <div>
      <div>
        This is a placemap.
        <button onClick={handleClose}>Close</button>
        <input
          type="text"
          placeholder="Enter a location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button
          onClick={async () => {
            const result = await geocode({ address: locationInput });
            handleResult(result);
          }}
        >
          Geocode
        </button>
      </div>
      <div style={{ width: "100%", height: "100vh" }}>
        <GoogleMap
          mapContainerStyle={MapStyle}
          center={mapCenter}
          zoom={8}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={onMapClick}
        >
          {marker && <Marker position={marker.position} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default PlaceMap;
