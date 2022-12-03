import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUsers,
  updateUsers,
  deleteUsers,
  getUserNotes,
} from '../controllers/users.controllers.js';

const router = Router();

// Simple CRUD
/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the user
 *      username:
 *        type: string
 *        description: The username of the user
 *    required:
 *     - username
 *    example:
 *      id: 1
 *      username: John Doe
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Returns the list of all the users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: All users
 *        content:
 *         application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Returns user by id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: The id of the user
 *    responses:
 *      200:
 *        description: User by id
 *        content:
 *         application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/User'
 *            example:
 *             id: 1
 *             username: John Doe
 *      404:
 *        description: User not found

 */
router.get('/users/:id', getUser);

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         example:
 *          username: Custom name
 *    responses:
 *     200:
 *      description: The user was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *
 *
 */
router.post('/users', createUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  patch:
 *    summary: Update a user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *        example:
 *          username: New username
 *    responses:
 *     200:
 *      description: The user was successfully updated
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *
 *
 */
router.patch('/users/:id', updateUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Returns user by id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Delete user by id
 *    responses:
 *      200:
 *        description: User deleted
 *      404:
 *        description: User not found

 */
router.delete('/users/:id', deleteUsers);

// Adictional Routes
router.get('/users/:id/notes', getUserNotes);

export default router;
