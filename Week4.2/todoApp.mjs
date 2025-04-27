import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'; 

const app = express();
const PORT = process.env.PORT || 3060;

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename); 
// Serve static files from the current directory
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })