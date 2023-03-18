"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routing_1 = require("../../helpers/routing");
const User_1 = __importDefault(require("../../../../models/User"));
const error_1 = require("../../helpers/error");
const usersHandler = (0, express_1.Router)();
/**
 * @swagger
 *  /users:
 *  get:
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Ok
 *
 */
usersHandler.get('/', (0, routing_1.asyncHandler)(async (req, res, next) => {
    const users = (await User_1.default.findAll());
    res.json({ code: 200, message: 'ok', data: users });
}));
/**
 * @swagger
 *  /users/{id}:
 *  get:
 *    tags:
 *      - Users
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid user id
 *        required: true
 *        in: path
 *    responses:
 *      200:
 *        description: Ok
 *
 */
usersHandler.get('/:id', (0, routing_1.asyncHandler)(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User_1.default.findByPk(userId);
    if (!user)
        throw new error_1.ApiError(error_1.HttpStatus.BAD_REQUEST, `User ${userId} not found`);
    res.json({ code: 200, message: 'ok', data: user });
}));
/**
 * @swagger
 *  /users:
 *  post:
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email
 *              first_name:
 *                type: string
 *                description: The user's first name
 *              last_name:
 *                type: string
 *                description: The user's last name
 *              username:
 *                type: string
 *                description: The user's username
 *              password:
 *                type: string
 *                description: The user's password
 *    responses:
 *      200:
 *        description: Ok
 */
usersHandler.post('/', (0, routing_1.asyncHandler)(async (req, res, next) => {
    const payload = {
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    };
    const user = await User_1.default.create(payload);
    res.json({ code: 200, message: 'ok', data: user.dataValues });
}));
exports.default = usersHandler;
//# sourceMappingURL=main.js.map