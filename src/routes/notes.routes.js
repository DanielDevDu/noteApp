import { Router } from 'express';
import {
  getNotes,
  getNote,
  createNotes,
  updateNotes,
  deleteNotes,
} from '../controllers/notes.controllers.js';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Note:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: The auto-generated id of the user
 *      title:
 *        type: string
 *        description: Title of the note
 *      description:
 *        type: string
 *        description: Description of the note
 *      user_id:
 *        type: integer
 *        description: User id of the note
 *    required:
 *     - title
 *     - description
 *     - user_id
 *    example:
 *      title: My Note
 *      description: This is my note
 *      user_id: 1
 */

/**
 * @swagger
 * /api/notes:
 *  get:
 *    summary: Returns the list of all the notes
 *    tags: [Note]
 *    responses:
 *      200:
 *        description: All notes
 *        content:
 *         application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Note'
 */
router.get('/notes', getNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *  get:
 *    summary: Returns note by id
 *    tags: [Note]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: The id of the note
 *    responses:
 *      200:
 *        description: Note by id
 *        content:
 *         application/json:
 *          schema:
 *            type: object
 *            items:
 *              $ref: '#/components/schemas/Note'
 *            example:
 *              id: 1
 *              title: My Note
 *              description: This is my note 
 *              user_id: 1
 *      404:
 *        description: Note not found

 */
router.get('/notes/:id', getNote);

/**
 * @swagger
 * /api/notes:
 *  post:
 *    summary: Create a new Note
 *    tags: [Note]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Note'
 *    responses:
 *     200:
 *      description: The Note was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/Note'
 *
 *
 */
router.post('/notes', createNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *  patch:
 *    summary: Update a note
 *    tags: [Note]
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
 *         title: new title
 *         description: new description
 *    responses:
 *     200:
 *      description: The note was successfully updated
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/Note'
 *
 *
 */
router.patch('/notes/:id', updateNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *  delete:
 *    summary: Delete a Note by id
 *    tags: [Note]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Delete note by id
 *    responses:
 *      200:
 *        description: Note deleted
 *      404:
 *        description: Note not found

 */
router.delete('/notes/:id', deleteNotes);

export default router;
