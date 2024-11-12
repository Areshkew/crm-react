import './ClientForm.css';
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Client } from '../models/Client';
import { useState } from 'react';
import { NotificationState, NotificationType } from '../models/Notification';
import Notification from './Notification';
import { useNavigate } from '@tanstack/react-router';
import { API_HOST } from '../config';


const ClientForm = ( { data, mode } : { data?: Client, mode?: string } ) => {
  const is_update_mode = mode === 'update';
  const navigate = useNavigate();

  // Notification
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({type, message});

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  // Validations
  const today = new Date();
  const eighteen_years_ago = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      .toISOString()
      .split("T")[0];
  const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const number_regex = /^\d+$/;
  
  // Form
  const mutation = useMutation({
    mutationFn: async (form_data: Client) => {
        const method = is_update_mode ? 'PUT' : 'POST';
        const response = await fetch(`${API_HOST}/clients/${is_update_mode ? data?.id : ''}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form_data),
        });
        const response_body = await response.json();

        if (!response.ok) {
          throw new Error(`${response_body.error}: ${response_body.message}`);
        }
        
        return response_body;
      }
  });

  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      full_name: data?.full_name ?? '',
      id: data?.id ?? '',
      birth_date: data?.birth_date ?? '',
      email: data?.email ?? '',
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value, {
        onSuccess: (data) => {
          form.reset();
          const message_vrb = is_update_mode ? 'actualizado' : 'creado';
          if(is_update_mode) {
            queryClient.invalidateQueries({ queryKey: ['client'] });
            
            navigate({
              to: `/crm/update_client/${data.client.id}`
            })
          }

          showNotification('success', `Se ha ${message_vrb} un cliente: ${data.client.full_name}!`);
        },
        onError: (data) => {
          showNotification('error', data.message);
        }
      });
    },
  });
  
  return (
    <>
      {notification && (
        <Notification 
          type={notification.type}
          message={notification.message}
        />
      )}

      <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
        <div className="form-fields">
            <div className="form-field w-55">
              <form.Field
                name="full_name"
                validators={{
                  onChange: ({ value }: {value: string}) =>
                    !value
                      ? 'El nombre es requerido.'
                      : value.length < 8
                        ? 'El nombre debe tener al menos 8 caracteres.'
                        : undefined
                }}
              >
                
                {(field) => (
                  <>
                    <label htmlFor={field.name}>Nombre completo</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="text"
                      placeholder="Nombre completo"  
                      className="form-input"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em role="alert" className='form-error'>{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </>
                )}

              </form.Field>

            </div>

            <div className="form-field w-40">
              <form.Field
                name="id"
                validators={{
                  onChange: ({ value }: {value: string}) =>
                    !value
                      ? 'El número de documento es requerido.'
                      : !number_regex.test(value)
                        ? 'El número de documento debe ser numérico.'
                        : undefined
                }}
              >
                
                {(field) => (
                  <>
                    <label htmlFor={field.name}>Número de documento</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="text"
                      placeholder="Número de documento"  
                      className="form-input"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em role="alert" className='form-error'>{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </>
                )}

              </form.Field>
            </div>

            <div className="form-field w-40">
              <form.Field
                name="birth_date"
                validators={{
                  onChange: ({ value }: {value: string}) =>
                    !value
                      ? 'La fecha de nacimiento es requerida.'
                      : undefined
                }}
              >
                
                {(field) => (
                  <>
                    <label htmlFor={field.name}>Fecha de nacimiento</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ? new Date(field.state.value).toISOString().split('T')[0] : ''}
                      type="date"
                      placeholder="Fecha de nacimiento"  
                      max={eighteen_years_ago}
                      step="1"
                      className="form-input"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em role="alert" className='form-error'>{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </>
                )}

              </form.Field>
            </div>

            <div className="form-field w-55">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }: {value: string}) =>
                    !value
                      ? 'El email es requerido.'
                      : !email_regex.test(value)
                        ? 'El formato del email no es válido.'
                        : undefined
                }}
              >
                
                {(field) => (
                  <>
                    <label htmlFor={field.name}>Email</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="email"
                      placeholder="Email"  
                      max={eighteen_years_ago}
                      step="1"
                      className="form-input"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors ? (
                      <em role="alert" className='form-error'>{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </>
                )}

              </form.Field>
            </div>
        </div>
      
        <div className="form-buttons">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Link to='/crm' style={{all: "unset"}}> 
                  <button type="reset" onClick={() => form.reset()} className="form-button bg-red">
                    Cancelar
                  </button>
                </Link>

                <button type="submit" disabled={!canSubmit} className="form-button bg-blue">
                  {isSubmitting ? '...' : 'Guardar'}
                </button>

              </>
            )}
          />
        </div>
      </form>
    </>
)};

export default ClientForm;

