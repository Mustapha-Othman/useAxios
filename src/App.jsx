import { useEffect } from 'react'
import useAxios from './hooks/useAxios'
function App() {
  const { respond, error, loading, fetchData } = useAxios();

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

  if ((loading == false) && respond) {
    return error ? (
      { error }
    ) : (
      // respond.data.map((resp) => (
      //   {resp.id}
      // ))
      `Your data here!`
    );
  }
  return (`loading`);

}

export default App
