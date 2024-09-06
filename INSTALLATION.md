## Getting started

### Backend Setup

#### Step 1: Clone the repository

```bash
git clone https://github.com/kalczugag/ecommerce.git
```

```bash
cd ecommerce
```

#### Step 2: Edit the Environment File

-   Check a file named .env in the /backend directory.

    This file will store environment variables for the project to run.

#### Step 3: Update MongoDB URI

In the .env file, find the line that reads:

`DATABASE="your-mongodb-uri"`

Replace "your-mongodb-uri" with the actual URI of your MongoDB database.

#### Step 4: Install Backend Dependencies

In your terminal, navigate to the /backend directory

```bash
cd backend
```

then run the following command to install the backend dependencies:

```bash
npm install
```

This command will install all the required packages specified in the package.json file.

#### Step 5: Run the Backend Server

In the same terminal, run the following command to start the backend server:

```bash
npm run dev
```

This command will start the backend server, and it will listen for incoming requests.

### Frontend Setup

#### Step 6: Install Frontend Dependencies

Open a new terminal window , and run the following command to install the frontend dependencies:

```bash
cd frontend
```

```bash
npm install
```

#### Step 7: Run the Frontend Server

After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:

```bash
npm run dev
```

This command will start the frontend server, and you'll be able to access the website on localhost:3000 in your web browser.

### Admin Panel Setup (Optional)

#### Step 8: Install Admin Panel Dependencies

Open a new terminal window , and run the following command to install the frontend dependencies:

```bash
cd admin
```

```bash
npm install
```

#### Step 9: Run the Admin Panel Server

After installing the admin dependencies, run the following command in the same terminal to start the admin server:

```bash
npm run dev
```

This command will start the admin panel server, and you'll be able to access the website on localhost:5165 in your web browser.
