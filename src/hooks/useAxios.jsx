import axios from "axios";
import { useState } from "react";


const useAxios = () => {
    const [respond, setRespond] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const axiosClients = axios.create({
        baseURL: 'http://localhost:1337/api',
        timeout: 1000,
    })

    function newAbortSignal(timeoutMs) {
        const abortController = new AbortController();
        setTimeout(() => abortController.abort(), timeoutMs || 0);

        return abortController.signal;
    }

    const fetchData = async ({ method, path, getpar = {}, postdata = {} }) => {
        try {
            setLoading(true);

            await axiosClients({
                method: method,
                url: path,
                data: method.toLowerCase() === "get" ? undefined : postdata, // Only include data for non-GET requests
                params: method.toLowerCase() === "get" ? getpar : undefined,
                signal: newAbortSignal(1000),
            }).then(resp => {
                setRespond(resp.data);
            }).catch(error => {
                setError(error.message);
            });

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);

        }
    }

    return { fetchData, respond, error, loading };
}

export default useAxios