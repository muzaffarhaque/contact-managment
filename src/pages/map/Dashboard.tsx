import  { useEffect, useState } from 'react'
import CovidMap from './CovidMap'
import { GiDeathStar } from "react-icons/gi"
import { FcDataRecovery } from "react-icons/fc"
import { TbCurrentLocation, TbPresentationAnalytics } from "react-icons/tb"
import './map.scss';
import { fetchData } from '../../server/api/Api';
import { LineGraph } from '.';


export default function Dashboard() {
  const [countrydata,setCountrydata] = useState<any>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  async function getAllCountryData() {
    const res = await fetchData('https://disease.sh/v3/covid-19/all')
    setCountrydata(res);
    console.log("All countoru data", res)
  }
  useEffect((): any => {
    return () => getAllCountryData()
  }, [])

  return (
    <div>
      {/* <Image src={Loader} alt="Loading..."/> */}
      <div className="ling-grap-status-wrapper">
        <div className="dasboar-heighlights-wrapper">
          <div className="details-box">
            <h4 className='fw-bold fs-22-16'>
              <TbPresentationAnalytics className="icon" /> &nbsp;&nbsp;
              Current
            </h4>
            <p className='mb-0 fs-16-14 fw-semibold text-center'>{countrydata.active}</p>
          </div>
          <div className="details-box">
            <h4 className='fw-bold fs-22-16'>
              <TbCurrentLocation className="" /> &nbsp;&nbsp;
              Casws
            </h4>
            <p className='mb-0 fs-16-14 fw-semibold text-center'>{countrydata.cases}</p>
          </div>
          <div className="details-box">
            <h4 className='fw-bold fs-22-16'>
              <GiDeathStar className="" /> &nbsp;&nbsp;
              Death
            </h4>
            <p className='mb-0 fs-16-14 fw-semibold text-center'>{countrydata.deaths}</p>
          </div>
          <div className="details-box">
            <h4 className='fw-bold fs-22-16'>
              <FcDataRecovery className="" /> &nbsp;&nbsp;
              Recovery
            </h4>
            <p className='mb-0 fs-16-14 fw-semibold text-center'>{countrydata.recovered}</p>
          </div>
        </div>
        <div className="line-grap-dev">
          <LineGraph/>
        </div>
      </div>
      <h4 className='fw-bold fs-22-16 py-4'>Covid Status of Country wise :</h4>
       
      <div className="covid-mardker-frame">
        <CovidMap />
      </div>
    </div>
  )
}
