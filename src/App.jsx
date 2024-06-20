import { useEffect } from 'react'
import useAxios from './hooks/useAxios'

function App() {
  const { respond, error, loading, fetchData } = useAxios();
  const apiKey = '9ac4f61e35ea7b861ae890bd0dd7b17c30fb15600ca43b931b6da448fe28fe4ccf7cbac3be89149c5b2167a416d13f4bacc77e6fe2474bd7af39217cfe0e3f3d32efe9dd3ee8cfb4308c47455bfda896acd56627217e6fe2bf83bcf133d0959b34558e79d658d82ebddc24e3bda903f75b922ab395edb508615067dbd353f5ae';

  useEffect(() => {
    fetchData({
      method: 'GET',
      path: 'items',
      getpar: { populate: { image: { fields: ['url', 'alternativeText'] } } },
    });
  }, []);

  console.log("Respond: ", respond);
  console.error("Error: ", error);
  console.log("Loading Status: ", loading);

  if ((loading === false) && respond || (loading === false) && error) {
    return error ? (
      JSON.stringify(error)
    ) : (
      respond.data.map((resp) => (
        JSON.stringify(resp)
      ))

    );
  }
  return ('loading');

}

export default App
