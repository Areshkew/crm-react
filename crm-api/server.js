import express from 'express';
import { logger } from './src/config/logger.js';
import { ENV } from './src/config/const.js';
import { sequelize } from './src/config/db.js';
import cors from 'cors';
import { _ClientController } from './src/controllers/client-controller.js'; // Singleton Class

//
const app = express();
const PORT = 3000;
const corsOptions = {
    origin: ENV.cors_origin,
    optionsSuccessStatus: 200
}

// Middleware
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
});
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Internal Server Error');
});
app.use(cors(corsOptions));
app.use(express.json());

// Ruta básica
app.get('/', (req, res) => {
    res.send('¡Hola, mundo! Esta es una respuesta desde Express.');
});

// Create
app.post('/clients', async (req, res) => {
    const { id, full_name, email, birth_date } = req.body;

    try {
        const client = await _ClientController.create_client(id, full_name, email, birth_date);
        res.status(201).json({ client });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo crear el cliente', message: error.message });
    }
});

// Read
app.get('/clients', async (req, res) => {
    const { full_name, creation_dateMin, creation_dateMax, limit = 10, offset = 0 } = req.query;

    try {
        const clients = await _ClientController.get_clients({
            full_name,
            creation_dateMin: creation_dateMin ? new Date(creation_dateMin) : undefined,
            creation_dateMax: creation_dateMax ? new Date(creation_dateMax) : undefined,
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10)
        });

        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo consultar clientes.', message: error.message });
    }
});

app.get('/clients/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const client = await _ClientController.get_client(_id);

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo consultar cliente.', message: error.message });
    }
});

// Update
app.put('/clients/:id', async (req, res) => {
    const _id = req.params.id;
    const { id, full_name, email, birth_date } = req.body;

    // Sequelize will only update the fields in this object.
    const updates = {};
    if (id) updates.id = id;
    if (full_name) updates.full_name = full_name;
    if (email) updates.email = email;
    if (birth_date) updates.birth_date = birth_date;

    try {
        const client = await _ClientController.update_client(_id, updates);
        res.status(201).json({ client });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo actualizar el cliente', message: error.message });
    }
});

// Delete
app.delete('/clients/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const deleted_client = await _ClientController.delete_client(_id);
        res.status(201).json({ deleted_client });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo borrar el cliente', message: error.message });
    }
});

// Server bootstrap
sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection success');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
        logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Connection fail', error);
  });