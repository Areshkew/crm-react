import { FC, useState } from 'react';
import './ClientCard.css';
import { Client } from '../models/Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationState, NotificationType } from '../models/Notification';
import Notification from './Notification';
import { Link } from '@tanstack/react-router';
import { API_HOST } from '../config';

const ClientCard: FC<Client> = ({ id, full_name, email, birth_date, creation_date }) => {
  // Notification
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({type, message});

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }
  
  // Pop-Up
  const [showConfirm, setShowConfirm] = useState(false);
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };
  const handleConfirmDelete = () => {

    mutation.mutate();

    setShowConfirm(false);
  };
  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  // Format Data
  const formatDate = (date_string: string | undefined) => {
    const options: Intl.DateTimeFormatOptions = { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
      };
      const date = new Date(date_string as string);
      return date.toLocaleDateString('es-ES', options);
  };

  // Deletion
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async () => {
        const response = await fetch(`${API_HOST}/clients/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const response_body = await response.json();

        if (!response.ok) {
          throw new Error(`${response_body.error}: ${response_body.message}`);
        }
        
        return response_body;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clients'] });
        showNotification('success', `Se ha eliminado el cliente ${full_name}`);
      },
      onError: (data) => {
        showNotification('error', data.message);
      }
  });
  
  return (
    <div className="client-card">
      <div className="client-info">
        <div className="client-avatar">👤</div>
        <div>
          <h3>{full_name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="client-dates">
        {formatDate(birth_date)} | {formatDate(creation_date)}
      </div>
      <div className="client-actions">
        <Link to={`/crm/update_client/${id}`} style={{all: "unset"}}> 
          <button className="edit-button">✏️</button>
        </Link>
        <button className="delete-button" onClick={handleDeleteClick}>🗑️</button>
      </div>

      {showConfirm && (
        <div className="confirmation-popup">
          <p>¿Estás seguro que quieres eliminar a {full_name}?</p>
            <button className='form-button bg-red' onClick={handleConfirmDelete}>Si, eliminar</button>
            <button className='form-button bg-blue' onClick={handleCancelDelete}>Cancelar</button>
        </div>
      )}

      {notification && (
        <Notification 
          type={notification.type}
          message={notification.message}
        />
      )}
    </div>
)};

export default ClientCard;