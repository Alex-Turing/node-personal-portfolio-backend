### 📄 `node-personal-portfolio-backend/README.md`

```markdown
# 📦 Portfolio Backend

This is the secure backend API for the my react web app portfolio (alexdevhub) project by **Alexander Hernandez**.  
It acts as a proxy server to interact with GitHub's API using a personal access token, hiding sensitive information from the frontend.

---

## 🚀 Features

- Securely fetches public repositories from your GitHub account
- Retrieves programming languages used in each repository
- Designed to work seamlessly with your React frontend portfolio
- Simple, lightweight, and easy to deploy

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- Axios
- dotenv
- CORS
- Morgan
- Nodemon (devDependencies)

---

## 📂 Project Structure

```
portfolio-backend/
├── app.js                # Main server file
├── index.js              
├── .env                  # Environment variables (not committed)
├── .env.example          # Example env file
├── package.json
├── routes/
│   └── github.js         # API routes to GitHub
├── utils/
│   └── config.js 
│   └── logger.js
│   └── middleware.js 
└── node_modules/
```

---

## 🔒 Environment Setup

Create a `.env` file at the root of the project with the following:

```env
GITHUB_TOKEN=your_personal_access_token_here
```

Make sure your GitHub token has the necessary scopes to access public repositories.

---

## 🧪 Available Routes

| Method | Endpoint                                | Description                       |
|--------|-----------------------------------------|-----------------------------------|
| GET    | `/api/github/repos`                     | Fetch all public repos            |
| GET    | `/api/github/repos/:repo/languages`     | Get languages for a given repo   |

---

## ▶️ Getting Started

1. **Install dependencies**  
   Inside the `portfolio-backend` folder:
   ```bash
   npm install
   ```

2. **Create your `.env` file**  
   ```bash
   cp .env.example .env
   ```

3. **Run the server locally**  
   ```bash
   node index.js or npm run dev
   ```

4. **Test it!**  
   Open your browser or Postman and hit:  
   [http://localhost:5000/api/github/repos](http://localhost:5000/api/github/repos)

---

## 🔗 Integration with Frontend

Your frontend should call the backend instead of GitHub directly.  
Update the `githubService.ts` in your React app like so:

```ts
const BASE_URL = 'http://localhost:5000/api/github';

const getAll = async () => {
  const response = await axios.get(`${BASE_URL}/repos`);
  return response.data;
};

const getLanguages = async (repoName: string) => {
  const response = await axios.get(`${BASE_URL}/repos/${repoName}/languages`);
  return response.data;
};
```

---

## 🧼 Good Practices

- Do **not** commit your `.env` file.
- Rotate your GitHub token periodically.
- Consider rate limits when testing frequently.

---

## 👤 Author

**Alexander Hernandez**  
GitHub: [@Alex-Turing](https://github.com/Alex-Turing)  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
```
