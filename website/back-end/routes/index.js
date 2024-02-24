import { Router } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import UserBase from '../models/UserBase.js';

const router = Router();
const instance = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });
const saltRounds = 10;

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const isExist = await UserBase.findOne({ username }).lean();
    if (isExist) return res.status(409).json({ message: `Username with ${username} existed!` });
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      await UserBase.create({ username, password: hash });
      res.status(200).json({ ok: true, message: 'Create a new account successful' });
    });
  } catch (error) {
    return res.status(404).json({ message: `Some errors ocurred in POST /register!` });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const currUser = await UserBase.findOne({ username }).lean();
  const match = await bcrypt.compare(password, currUser.password);
  match && res.status(200).json({ ok: true, user: { username } });
});

router.post('/chat', async (req, res, next) => {
  const { msgTextInput, api_key } = req.body;

  instance.defaults.headers.common.Authorization = api_key;

  await instance.post(process.env.GET_QA_RP, {
    "question": msgTextInput
  })
    .then(async (QA_obj_res) => {
      console.log(QA_obj_res.data);

      const rouge_scores = QA_obj_res.data.answer.rouge_scores;
      const predicted_answer = QA_obj_res.data.answer.predicted_answer;
      const context = QA_obj_res.data.answer.context;

      rouge_scores <= 0.1
        ? res.status(200).json({ 'message': 'Mình chưa được huấn luyện để trả lời vấn đề này, bạn hỏi câu hỏi khác giúp mình nhé!' })
        : predicted_answer === '' ? res.status(200).json({ 'message': context }) : res.status(200).json({ 'message': predicted_answer });

      res.end();
    })
    .catch((QA_obj_errer) => {
      // add throw error logic
      console.error(QA_obj_errer.message);
      console.error(QA_obj_errer.statusCode);
      console.error(QA_obj_errer.statusMessage);
    });;
});

router.post('/test', async (req, res, next) => {
  let api_key;
  const q = req.body.msgTextInput;
  console.log(q);

  const instance = axios.create({ baseURL: process.env.BASE_URL });

  await instance.post(process.env.GET_API_KEY_RP, {
    "username": "admin",
    "password": "admin"
  })
    .then(async (response) => {
      api_key = response.data.api_key;
      console.log(`API KEY: ${api_key}`);
      // add logic store user api key

      instance.defaults.headers.common.Authorization = api_key;

      await instance.post(process.env.GET_QA_RP, {
        "question": q
      })
        .then(async (QA_obj_res) => {
          console.log(QA_obj_res.data);

          const rouge_scores = QA_obj_res.data.answer.rouge_scores;
          const predicted_answer = QA_obj_res.data.answer.predicted_answer;
          const context = QA_obj_res.data.answer.context;

          rouge_scores <= 0.1
            ? res.status(200).json({ 'message': 'Mình chưa được huấn luyện để trả lời vấn đề này, bạn hỏi câu hỏi khác giúp mình nhé!' })
            : predicted_answer === '' ? res.status(200).json({ 'message': context }) : res.status(200).json({ 'message': predicted_answer });

          res.end();
        })
        .catch((QA_obj_errer) => {
          // add throw error logic
          console.error(QA_obj_errer.message);
          console.error(QA_obj_errer.statusCode);
          console.error(QA_obj_errer.statusMessage);
        });;
    })
    .catch((error) => {
      // add throw error logic
      console.error(error.message);
      console.error(error.statusCode);
      console.error(error.statusMessage);
    });
});

router.get('/chat', (req, res, next) => {
  res.render('chat', { title: 'Chat page' });
});

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export default router;
