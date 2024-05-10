import express from 'express';
const router = express.router();
import { chat } from '../controllers/chat.controller'

router.post('/chat', chat)

export default router;