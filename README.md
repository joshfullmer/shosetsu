# Shosetsu

Shosetsu is a web app for the aspiring author. It helps authors get organized with different projects, outlines, characters, places, and more.

Check it out here: [Shosetsu](shosetsu.appspot.com)

## Technologies implemented

### Backend

- Django and Python
  - Django serves up the API that the frontend uses
- Django REST Framework and Django REST Framework JWT
  - JWT Authentication
- MySQL Database for persistence

### Frontend

- React
  - React consumes the backend API
  - React Router for SPA navigation
- Babel
  - Transpiles JSX files to Javascript for modern browser compatibility
- Styled Components
  - CSS is handled at a component level, not on stylesheets.
  - This allows CSS to be much more compartmentalized.
- ESLint
  - Code styling

### Hosting

- Google Cloud Platform
  - Uses GCP Flexible App Engine
