import { ClientModel } from '../models/client.js';
import { Op, literal, ValidationError } from 'sequelize';

let instance;
class ClientController {
    constructor() {
        if (instance) {
            throw new Error("Only one instance allowed!");
        }
        instance = this;
    }

    // Create
    async create_client(id, full_name, email, birth_date) {
        try {
            const client_data = await ClientModel.create({
                id,
                full_name,
                email,
                birth_date,
                creation_date: new Date()
            });

            return client_data;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error("El usuario ya existe");
            }

            throw new Error(error.message);
        }
    }

    // Read
    async get_client(id){
        try {
            const client = await ClientModel.findOne({
                where: { id: id },
                attributes: { exclude: ['is_deleted'] }
              });

            if (!client) {
                throw new Error(`Cliente con ID ${id} no encontrado.`);
            }

            return client;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async get_clients({ full_name, creation_dateMin, creation_dateMax, limit, offset }){
        try {
            const whereClause = { is_deleted: false };
            
            // Vector Search - PostgresSQL
            if (full_name) {
                const formattedQuery = full_name.split(' ').join(' & ');
                
                whereClause[Op.and] = [
                    literal(`to_tsvector('spanish', full_name) @@ to_tsquery('spanish', '${formattedQuery}')`)
                ];
            }
        
            if (creation_dateMin || creation_dateMax) {
              whereClause.creation_date = {};
              if (creation_dateMin) {
                whereClause.creation_date[Op.gte] = creation_dateMin; // GTE
              }
              if (creation_dateMax) {
                whereClause.creation_date[Op.lte] = creation_dateMax; // LTE
              }
            }
        
            const [clients, total_count] = await Promise.all([
                ClientModel.findAll({
                    where: whereClause,
                    limit,
                    offset,
                    attributes: { exclude: ['is_deleted'] }
                }),
                ClientModel.count({
                    where: whereClause
                })
            ]);
    
            return { clients, total_count };
          } catch (error) {
            throw new Error(error.message);
          }
    }

    // Update
    async update_client(id, updates){
        try {
            const client = await ClientModel.findOne({
                where: { id: id }
            });

            if (!client) {
                throw new Error('Cliente no encontrado');
            }

            await client.update(updates);
            return client;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Delete
    async delete_client(id) {
        try {
            const result = await ClientModel.update(
                { is_deleted: true },
                {
                    where: { id: id }
                }
            );
    
            if (result[0] === 0) {
                throw new Error('Cliente no encontrado');
            }
    
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const _ClientController = Object.freeze(new ClientController());