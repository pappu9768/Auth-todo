import express from 'express';
import { createTodos, deleteTodos, getSpecificTodo, getTodos, updateTodos } from '../controllers/todoControllers.js';
import { todoMiddleware, todoValidation } from '../middlewares/todoMiddleware.js';

const todoRoutes = express.Router();

todoRoutes.post('/create',todoValidation, todoMiddleware ,createTodos);
todoRoutes.get('/',todoMiddleware,getTodos);
todoRoutes.get('/:id',todoMiddleware,getSpecificTodo);
todoRoutes.delete('/:todoid',todoMiddleware,deleteTodos);
todoRoutes.put('/:todoid',todoMiddleware,updateTodos);


export default todoRoutes;