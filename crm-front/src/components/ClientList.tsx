import { Dispatch, FC, Key, SetStateAction, useEffect, useState } from 'react';
import { Client } from '../models/Client';
import ClientCard from './ClientCard';
import './ClientList.css';
import { useQuery } from '@tanstack/react-query';
import { API_HOST } from '../config';

interface ClientFilterProps {
  full_name?: string;
  creation_dateMin?: string;
  creation_dateMax?: string;
  limit?: number;
  offset?: number;
  setTotalRecords: Dispatch< SetStateAction<number> >;
}

const ClientList: FC<ClientFilterProps> = ({
  full_name = '',
  creation_dateMin = '',
  creation_dateMax = '',
  limit = 10,
  offset = 0,
  setTotalRecords
}) => {
  const [debouncedFullName, setDebouncedFullName] = useState(full_name);
  
  // Debounce full_name
  useEffect(() => {
    const handler = setTimeout(() => {
      if (full_name !== debouncedFullName) {
        setDebouncedFullName(full_name);
      }
    }, 300); 

    // Clear the timeout if full_name changes before the delay is over
    return () => clearTimeout(handler);
  }, [full_name, debouncedFullName]);

  //
  const { isLoading, error, data } = useQuery({
    queryKey: ['clients', debouncedFullName, creation_dateMin, creation_dateMax, offset],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        full_name,
        creation_dateMin,
        creation_dateMax,
        limit: limit.toString(),
        offset: offset.toString(),
      });
      
      const response = await fetch(`${API_HOST}/clients?${queryParams}`);
      const json_data = await response.json();
      setTotalRecords( +json_data.total_count );

      return json_data;
    }
  });

  if (isLoading) return (<div className="client-list"> Cargando... </div>);
  if (error) return (<div className="client-list"> 'Ocurrió un error: ' + error.message </div>) ;

  return (
    <div className="client-list">
      {data?.clients?.map((client: Client, index: Key) => (
        <ClientCard key={index} {...client} />
      )) || <p>No se encontraron clientes.</p>}
    </div>
  );
};
export default ClientList;