# To-Do List Frontend

Aplicación web frontend para un sistema de gestión de tareas diarias con consejos personalizados.

## Características

- Planificación de tareas diarias
- Generación de horarios optimizados basados en:
  - Nivel de energía
  - Tiempo disponible
  - Tipo de día (intenso, relajado, mixto)
- Consejos diarios personalizados
- Interfaz de usuario intuitiva y responsiva
- Integración con API backend

## Tecnologías Utilizadas

- React
- TypeScript
- Styled Components
- Cloudflare Pages (despliegue)

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

## Configuración

El proyecto utiliza un archivo de configuración (`config.ts`) que contiene las URLs de la API:

```typescript
export const API_BASE_URL = 'https://todo-list-aia.what-to-do.workers.dev/api';

export const API_ENDPOINTS = {
    SCHEDULE: `${API_BASE_URL}/schedule`,
    DAILY_TIP: `${API_BASE_URL}/daily-tip`
};
```

## Scripts Disponibles

- `npm start`: Inicia la aplicación en modo desarrollo
- `npm run build`: Genera una versión optimizada para producción
- `npm run deploy`: Despliega la aplicación en Cloudflare Pages

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   ├── config.ts       # Configuración de la API
│   └── App.tsx         # Componente principal
├── public/            # Archivos estáticos
├── package.json       # Dependencias y scripts
└── wrangler.toml      # Configuración de Cloudflare
```

## Despliegue

La aplicación está configurada para desplegarse en Cloudflare Pages. El archivo `wrangler.toml` contiene la configuración necesaria:

```toml
name = "todo-list-frontend"
type = "webpack"
account_id = "" # Necesitarás reemplazar esto con tu Account ID
workers_dev = true

[site]
bucket = "./build"
entry-point = "workers-site"

[build]
command = "npm run build"
upload.format = "service-worker"
pages_build_output_dir = "./build"
```

## Contribución

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
