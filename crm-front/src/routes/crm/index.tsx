import { createFileRoute } from '@tanstack/react-router'
import SearchBar from '../../components/SearchBar'
import ClientList from '../../components/ClientList'
import { useState } from 'react'
import Pagination from '../../components/Pagination'

const CRM = () => {
  const [fullName, setFullName] = useState('');
  const [creationDateMax, setCreationDateMax] = useState('');
  const [creationDateMin, setCreationDateMin] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const recordsPerPage = 9;

  return (
    <div className="content">
      <div className="list-clients">
        <h1>Clientes</h1>
        <SearchBar 
          fullName={fullName} setFullName={setFullName} 
          creationDateMax={creationDateMax} setCreationDateMax={setCreationDateMax}
          creationDateMin={creationDateMin} setCreationDateMin={setCreationDateMin}
        />

        <ClientList 
          full_name={fullName}
          creation_dateMin={creationDateMin}
          creation_dateMax={creationDateMax}
          limit={recordsPerPage}
          offset={totalRecords > 9 ? currentPage * recordsPerPage : 0}
          setTotalRecords={setTotalRecords}
        />

        <Pagination 
          currentPage={totalRecords > 9 ? currentPage : 0}
          setCurrentPage={setCurrentPage}
          limit={recordsPerPage}
          total_records={totalRecords}
        />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/crm/')({
  component: CRM,
})
