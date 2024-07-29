import express from 'express';
import cors from 'cors';

// Routes
import routes from './routes/index.js';

// Configurations
const app = express();
const port = process.env.PORT || 2020;
app.use(cors());
app.use(express.json({
  limit: '25mb'
}));
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use('/assets', express.static('./src/assets'));
app.use('/uploads', express.static('./uploads'));

app.use('/api', routes);

// Check Server Status
app.get('/', async (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Requested resource not found' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server started at ${port} 🔥`);
});
