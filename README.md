# Gestión de Clientes

Este repositorio contiene una web pequeña gestión de clientes, implementada utilizando React, TanStack Query, TanStack Router, Vite, Express.js (con arquitectura MVC), y PostgreSQL con características avanzadas como búsqueda por vectorización (`ts_tovec`).

## Descripción

La aplicación web permite la gestión completa de clientes, incluyendo la visualización, filtrado, creación, actualización y eliminación lógica de registros.  Se ha implementado una API RESTful utilizando Express.js y PostgreSQL como base de datos.  El frontend, construido con React, utiliza TanStack Query para la gestión eficiente de datos y TanStack Router para el enrutamiento.

**Funcionalidades:**

* **Visualización de clientes:**  Muestra una lista de clientes con nombre completo, email, fecha de nacimiento y fecha de creación.
* **Filtrado de clientes:** Permite filtrar la lista de clientes por nombre completo y fecha de creación.
* **Creación de clientes:**  Permite la creación de nuevos clientes, solicitando nombre completo, número de documento, email y fecha de nacimiento.
* **Actualización de clientes:**  Permite la actualización de los datos de clientes existentes.
* **Eliminación lógica de clientes:**  Permite marcar clientes como eliminados, sin borrarlos físicamente de la base de datos.
* **Búsqueda avanzada (PostgreSQL):**  Utiliza la función `ts_tovec` de PostgreSQL para una búsqueda eficiente y robusta por nombre.  (Detallar implementación si se considera relevante)
* **API RESTful (Express.js):**  API bien estructurada siguiendo la arquitectura MVC para una mejor organización y mantenimiento.

**Tecnologías Utilizadas:**

* **Frontend:**
    * React
    * TanStack Query
    * TanStack Router
    * Vite
    * CSS3
* **Backend:**
    * Node.js
    * Express.js (MVC)
    * PostgreSQL
