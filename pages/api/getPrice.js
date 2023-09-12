import axios from 'axios';

const api_key = process.env.COINMARKETCAP_APIKEY;

export default async (req, res) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': api_key,
        },
        params: {
          symbol: 'SOL',
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to fetch data.' });
  }
};
