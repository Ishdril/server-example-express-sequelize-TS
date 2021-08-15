import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import helmet from 'helmet';
import { sequelize } from './models';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);

(async function (): Promise<void> {
  try {
    await sequelize.sync();
    console.log('✅ DB connected to:', process.env.DB_NAME);
    app.listen(PORT, () => {
      console.log(`🚀 server running @ http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Can't fire up the server!", error);
  }
})();
