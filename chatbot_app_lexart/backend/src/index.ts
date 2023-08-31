import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoute';
import conversationRoutes from './routes/conversationRoute';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/register', userRoutes);
app.use('/api/conversation', conversationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
