import { Dispatch, FC, SetStateAction } from 'react';
import './SearchBar.css';
import { Link } from '@tanstack/react-router';

interface SearchBarProps {
  fullName: string;
  setFullName: Dispatch< SetStateAction<string> >;
  creationDateMax: string;
  setCreationDateMax: Dispatch< SetStateAction<string> >;
  creationDateMin: string;
  setCreationDateMin: Dispatch< SetStateAction<string> >;
}

const SearchBar: FC<SearchBarProps> = ({ 
  fullName, setFullName, 
  creationDateMax, setCreationDateMax,
  creationDateMin, setCreationDateMin,
}) => {
  // Max Dates for inputs
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Add one day
  const tomorrowISO = tomorrow.toISOString().split('T')[0];

  //
  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.type = 'date';
    };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      event.target.type = 'text';
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar..."
        className="search-input"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Fecha mínima de creación"
        className="date-input"
        id="creationDateMin"
        value={creationDateMin}
        onChange={(e) => {
          setCreationDateMin(e.target.value)
        }}
        max={today}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {creationDateMin && (
        <button className="clear-button" onClick={() => {
          setCreationDateMin('')
          const minInput = document.getElementById('creationDateMin') as HTMLInputElement;
            if (minInput) {
                minInput.type = 'text'; // Change to text type when clearing
            }
          } }>
          &times;
        </button>
      )}

      <input
        type="text"
        placeholder="Fecha máxima de creación"
        id="creationDateMax"
        className="date-input" 
        value={creationDateMax}
        onChange={(e) => setCreationDateMax(e.target.value)}
        max={tomorrowISO}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {creationDateMax && (
        <button className="clear-button" onClick={() => {
           setCreationDateMax('') 
           const maxInput = document.getElementById('creationDateMax') as HTMLInputElement;
            if (maxInput) {
                maxInput.type = 'text'; // Change to text type when clearing
            }
           } }>
          &times;
        </button>
      )}

      <Link to="/crm/new_client" style={{ all: 'unset' }}>
        <button className="new-client-button">+ Nuevo cliente</button>
      </Link>
    </div>
)};
export default SearchBar;