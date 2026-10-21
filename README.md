# Jordan Finder — React + API REST

Proyecto académico sencillo para buscar zapatillas Jordan. Tiene un frontend en React y una API propia hecha con Node.js y Express. Postman permite probar los endpoints.

> Importante: los nombres e imágenes se han ajustado a modelos Jordan concretos; los precios siguen siendo datos de ejemplo y no son precios oficiales de una tienda. Las imágenes se cargan desde URLs externas y pueden variar.

## Requisitos

- Node.js instalado
- Postman instalado (opcional, para probar la API)

## 1. Instalar dependencias

Abre una terminal dentro de la carpeta `jordan-finder` y ejecuta:

```bash
npm install
```

## 2. Iniciar React y la API

```bash
npm run dev
```

La página estará en `http://localhost:5173` y la API en `http://localhost:3001`.

Deja esa terminal abierta mientras usas el proyecto. Si cierras el proceso, la API se detiene.

## 3. Probar la API en Postman

Crea una petición de tipo **GET** y prueba estas direcciones:

| Prueba | URL |
|---|---|
| Estado de la API | `http://localhost:3001/api/health` |
| Todos los modelos | `http://localhost:3001/api/sneakers` |
| Buscar Jordan 1 | `http://localhost:3001/api/sneakers?search=Jordan%201` |
| Buscar Chicago | `http://localhost:3001/api/sneakers?search=Chicago` |
| Ver el producto con ID 1 | `http://localhost:3001/api/sneakers/1` |

Pulsa **Send**. La respuesta aparece en formato JSON en la parte inferior de Postman.

También puedes importar el archivo `Jordan-Finder.postman_collection.json` en Postman:
1. Abre Postman.
2. Pulsa **Import**.
3. Selecciona el archivo JSON de esta carpeta.
4. Ejecuta las peticiones importadas. Recuerda iniciar la API antes.

## 4. ¿Cómo se conecta React con la API?

En `src/App.jsx`, la función `searchSneakers` ejecuta:

```js
const response = await fetch(`/api/sneakers?search=${encodeURIComponent(value)}`);
const data = await response.json();
setSneakers(data.results);
```

Vite redirige las peticiones `/api` al servidor Express en el puerto 3001. React muestra los resultados recibidos en JSON.

## 5. Estructura

```text
jordan-finder/
├── server/
│   └── index.js
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── Jordan-Finder.postman_collection.json
└── README.md
```

## 6. Crear el despliegue

Este proyecto usa dos procesos (React y Express). Netlify por sí solo no ejecuta el servidor Express tradicional. Para publicarlo, despliega el frontend en Netlify y el servidor en un servicio compatible con Node.js, y cambia la configuración del proxy para apuntar al servidor publicado. Para una entrega local de clase, `npm run dev` es suficiente para demostrar React y Postman.

## Endpoints disponibles

- `GET /api/health`: comprueba que el servidor funciona.
- `GET /api/sneakers`: devuelve los productos de ejemplo.
- `GET /api/sneakers?search=Jordan%201`: filtra por nombre, modelo o color.
- `GET /api/sneakers/:id`: devuelve un producto por ID o un error 404.
