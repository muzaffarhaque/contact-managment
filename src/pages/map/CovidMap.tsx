import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Loader from "../../assets/images/loading-spinner.gif";
import { Image } from 'react-bootstrap';
import "leaflet/dist/leaflet.css";
import { fetchData } from '../../server/api/Api';
// import marker from "../../assets/images/marker.png";
import './map.scss';
interface Country {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  cases: number;
  recovered: number;
  deaths: number;
}

const CovidMap: React.FC = () => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCovidData = async () => {
    console.log("call 2 times",countriesData.length);
        const response = await fetchData('https://disease.sh/v3/covid-19/countries');
        setCountriesData(response);
        setLoading(false); 
};
  useEffect(():any => {
    return ()=> fetchCovidData();
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={[0, 0]} zoom={2} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {loading ? (
          <div className="loader d-flex align-content-center justify-content-center">
             <Image src={Loader} alt="Loading..."/>
          </div>
        ) : (
          countriesData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h2>{country.country}</h2>
                  <p>Active Cases: {country.cases - country.recovered - country.deaths}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default CovidMap;
