# YekMoviez Clone

A full-stack website built with **Django** and **React**, cloning the [YekMoviez](https://yekmoviez.com) site. This platform allows users to browse movies, series, and anime. Developed for **testing and improving web development skills**.

**Note:** Approximately 20% of the code was assisted by ChatGPT.

---

## Features

### Backend (Django + DRF)

-   User authentication using **JWT tokens**
-   Custom user model with admin access
-   APIs to get user details and update profile
-   PostgreSQL database (can switch to SQLite for testing)

### Frontend (React + Tailwind + Swiper)

-   Displays **top 5 animes ordered by score** on the homepage
-   Anime search powered by **Jikan API** (shows top 3 results by score)
-   Responsive UI with **Tailwind CSS**
-   Swiper carousel for featured anime
-   Axios for API requests

---

## Tech Stack

-   **Backend:** Django, Django REST Framework, Simple JWT, PostgreSQL
-   **Frontend:** React, Tailwind CSS, Swiper, Axios, React Router DOM
-   **Tools:** Vite, ESLint, Prettier

---

## Installation / Setup

### Backend

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd back
    ```

2. **Create and activate a virtual environment**

    ```bash
    python -m venv venv
    source venv/bin/activate   # Linux/macOS
    venv\Scripts\activate      # Windows
    ```

3. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Create `.env` file** in the backend root:

    ```env
    DEBUG=True
    DATABASE_NAME=<your-db-name>
    DATABASE_USER=<your-db-user>
    DATABASE_PASSWORD=<your-db-password>
    SECRET_KEY=<your-secret-key>
    ```

5. **Run migrations**

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

6. **Create superuser (for admin access)**

    ```bash
    python manage.py createsuperuser
    ```

7. **Start backend server**
    ```bash
    python manage.py runserver
    ```

---

### Frontend

1. **Navigate to frontend folder**

    ```bash
    cd ../front
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

4. Open your browser and go to `http://localhost:5173`

**Notes:**

-   Backend should be running at `http://127.0.0.1:8000` for API requests
-   Frontend communicates with backend via JWT for authentication

---

## Usage

-   Browse movies, series, and anime
-   Search for anime using the search bar (top 3 results displayed)
-   Admin can manage users and view custom user data
-   Top-rated anime carousel displayed on the homepage

---

## Backend Dependencies (`requirements.txt`)

```
asgiref==3.10.0
Django==5.2.7
django-cors-headers==4.9.0
django-environ==0.12.0
djangorestframework==3.16.1
djangorestframework_simplejwt==5.5.1
pillow==12.0.0
psycopg2==2.9.10
PyJWT==2.10.1
sqlparse==0.5.3
tzdata==2025.2
```

## Frontend Dependencies (`package.json`)

-   React, React DOM, Tailwind CSS, Swiper, Axios, JWT-decode, React Router DOM, and others

---

## Contributing

-   Contributions are welcome!
-   Feel free to fork the repository and create pull requests

---

## License

This project is for **educational purposes** and personal testing.
