import express from 'express';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import farmRoutes from './routes/farm.js';
import analysisRoutes from './routes/analysis.js';
import occurrenceRoutes from './routes/occurrence.js';
import faqRoutes from './routes/faq.js';
import sectorStatsRoutes from './routes/sectorstats.js';


const app = express();
app.use(express.json());
app.use('/public', express.static('public'));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/farms', farmRoutes);
app.use('/analysis', analysisRoutes);
app.use('/occurrence', occurrenceRoutes);
app.use('/faq', faqRoutes);
app.use('/sector-stats', sectorStatsRoutes);

app.get('/', (req, res) => res.send('API está no Ar!'));

export default app;