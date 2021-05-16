import express from 'express';
import { getAllMessages, getUserById, postNewMessage, postNewUser } from '../controllers';

const router = express.Router();

router.post('/users', postNewUser);
router.get('/users/:id', getUserById);
router.post('/users/:id/messages', postNewMessage);
router.get('/users/:id/messages', getAllMessages);

export default router;
