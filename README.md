# 360 Virtual Tour

Full-stack virtual tour experience for Ennejma Ezzahra with a Django REST API and a lightweight frontend that loads Google Maps Street View, authenticates users, and collects feedback.

## Features
- JWT-based authentication (register/login).
- Hotspot listing to anchor the 360 tour.
- Authenticated feedback submission.
- Swagger/Redoc API documentation.
- Simple Nginx-served frontend.

## Project structure
```
360/
  backend/          Django API (tour_api, authentication, tour)
  frontend/         Static frontend (HTML/CSS/JS)
  docker-compose.yml
```

## Quick start (local)
### Backend
```sh
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
Open `frontend/index.html` in a browser or serve it with a static server.

## Docker
```sh
docker compose up --build
```
Note: `docker-compose.yml` currently provisions Postgres, but the Django settings are configured for SQLite by default. Update `backend/tour_api/settings.py` if you want to use Postgres in Docker.

## API endpoints
- `POST /auth/register/`
- `POST /auth/login/` -> returns JWT access token
- `GET /tour/hotspots/`
- `POST /tour/feedback/` (requires `Authorization: Bearer <token>`)
- `GET /swagger/` and `GET /redoc/`

## Configuration notes
- The frontend uses `http://127.0.0.1:8000` as `API_BASE_URL`.
- A Google Maps key is currently embedded in `frontend/index.html` and `frontend/script.js`.

## License
MIT
