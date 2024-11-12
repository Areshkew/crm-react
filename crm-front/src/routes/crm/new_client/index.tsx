import { createFileRoute } from '@tanstack/react-router'
import ClientForm from '../../../components/ClientForm';

const crmNewClient = () => (
    <div className="content">
      <div className='list-clients'>
            <h1>Nuevo Cliente</h1>
            <ClientForm />
      </div>
    </div>
  );

export const Route = createFileRoute('/crm/new_client/')({
  component: crmNewClient,
})