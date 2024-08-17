import { useState, useEffect } from 'react';
import { getRequest } from '../services/fetchServices';
const api_host = import.meta.env.VITE_API_HOST

function useUser() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getRequest(
            `${api_host}/users/get-data`,
            {
            'Content-Type': 'application/json',
            }
        ) 
        if(response.status === 200){
          const data = await response.json();
          setUser(data);
        }
        else {
          throw new Error('Failed to fetch user data');
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); 

  return { user, loading, error };
}

export default useUser;
