import axios from 'axios';

// axios({
//     method: 'get',
//     baseURL: `https://api.ebird.org/v2/data/obs/US-IL-043/recent`,
//     headers: { 'X-eBirdApiToken': `${process.env.REACT_APP_API_KEY}` }
//   })
//     .then(response => {
//       setBirds(response.data);
//     })
//     .catch(err => {
//       console.error('fuck...', err);
//     });

const baseUrl = 'https://api.ebird.org/v2/data/obs/geo/recent';

let eBirdId;

if (process.env.NODE_ENV !== 'production') {
  eBirdId = process.env.REACT_APP_API_KEY;
} else {
  eBirdId = process.env.API_KEY;
}

const getBirds = (lat, long) => {
  const response = axios({
    method: 'get',
    baseURL: `${baseUrl}?lat=${lat}&lng=${long}&maxResults=350`,
    headers: { 'X-eBirdApiToken': `${eBirdId}` }
  });

  return response.then(response => response.data);
};

export default { getBirds };
