# Stall Allocation System

This project consists of a backend API and a frontend React application for managing stall allocations at events.

## Setup Instructions

## Running the Backend

### 1. Change to backend directory:

```bash
cd stall-allocation
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

On Windows:

```bash
.\venv\Scripts\activate
```

On macOS/Linux:

bash
source venv/bin/activate

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the backend server with Uvicorn:

```bash
uvicorn api:app --reload
```
The backend should now be running at http://localhost:8000.

## Running the Frontend

### 1. Change to frontend directory:

```bash
cd event-management-system-frontend
```

### 2. Install Node.js dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm run dev
```
The frontend should now be running 

