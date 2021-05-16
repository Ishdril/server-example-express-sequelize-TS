dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import { sequelize } from './models';
import * as dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;

const app = express();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(router);

(async function (): Promise<void> {
  try {
    console.log(process.env.DB_NAME);
    await sequelize.sync();
    console.log('✅ DB connected');
    app.listen(PORT, () => {
      console.log(`🚀 server running @ http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Can't fire up the server!", error);
  }
})();
