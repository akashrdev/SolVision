import { useState } from 'react';
import axios from 'axios';
const api_key = process.env.NEXT_PUBLIC_COINMARKETCAP_APIKEY;

const Price = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [solHourChange, setSolHourChange] = useState(null);
  const [solDayChange, setSolDayChange] = useState(null);

  axios
    .get('http://localhost:3000/api/getPrice')
    .then((response) => {
      setSolPrice(response.data.data.SOL[0].quote.USD.price);
      setSolHourChange(response.data.data.SOL[0].quote.USD.percent_change_1h);
      setSolDayChange(response.data.data.SOL[0].quote.USD.percent_change_24h);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="flex w-screen justify-center border-b border-white flex-row space-x-5">
      <h1 className="text-white text-sm">
        SOL ${Math.round((solPrice + Number.EPSILON) * 100) / 100}
      </h1>
      <div className="flex flex-row space-x-1">
        <h1 className="text-sm">1H</h1>
        {solHourChange < 0 ? (
          <h1 className="text-red-500 text-sm">
            {Math.round((solHourChange + Number.EPSILON) * 100) / 100}%
          </h1>
        ) : (
          <h1 className="text-emerald-500 text-sm">
            {Math.round((solHourChange + Number.EPSILON) * 100) / 100}%
          </h1>
        )}
      </div>
      <div className="flex flex-row space-x-1">
        <h1 className="text-sm">24H</h1>
        {solDayChange < 0 ? (
          <h1 className="text-red-500 text-sm">
            {Math.round((solDayChange + Number.EPSILON) * 100) / 100}%
          </h1>
        ) : (
          <h1 className="text-emerald-500 text-sm">
            {Math.round((solDayChange + Number.EPSILON) * 100) / 100}%
          </h1>
        )}
      </div>
    </div>
  );
};

export default Price;
