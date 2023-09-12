import axios from 'axios';
const api_key = process.env.NEXT_PUBLIC_COINMARKETCAP_APIKEY;

const Price = () => {
  axios
    .get('pages/api/getPrice')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  return;
};

export default Price;
