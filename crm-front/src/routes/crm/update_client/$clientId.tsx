import { createFileRoute, useParams } from '@tanstack/react-router'
import ClientForm from '../../../components/ClientForm';
import { useQuery } from '@tanstack/react-query';
import { API_HOST } from '../../../config';

const CrmUpdateClient = () => {
    const { clientId } = useParams({ strict: false })
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['client', clientId],
        queryFn: async () => {
            const response = await fetch(`${API_HOST}/clients/${clientId}`);
            const json_data = await response.json();

            return json_data;
        }
    });

    if (isLoading) return 'Cargando...';
    if (error) return 'Ocurrió un error: ' + error.message;

    return (
    <div className="content">
        <div className="list-clients">
        <h1>Editando Cliente {data.full_name}</h1>
        <ClientForm 
            data={data}
            mode='update'
        />
        </div>
    </div>
)};

export const Route = createFileRoute('/crm/update_client/$clientId')({
  component: CrmUpdateClient,
})