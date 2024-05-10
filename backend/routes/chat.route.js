import express from 'express';
const router = express.Router();
import { chat } from '../controllers/chat.controller.js'

router.post('/chat', chat)

export default router;