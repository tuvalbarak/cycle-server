import { asyncHandler } from '../../helpers/routing';
import { ApiError, HttpStatus } from '../../helpers/error';
import { Router, Response, Request, NextFunction } from 'express';
import ChargingStation from '../../../../models/ChargingStation';
import User from '../../../../models/User';
import Comment from '../../../../models/Comment';

const chargingStationsHandler = Router();

/**
 * @swagger
 *  /chargingStations:
 *  get:
 *    tags:
 *      - Charging Stations
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ChargingStation'
 *
 */

chargingStationsHandler.get(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const chargingStations = <ChargingStation[]>await ChargingStation.findAll({
      include: [{ association: 'owner' }, { association: 'comments' }],
    });

    res.json({ code: 200, message: 'ok', data: chargingStations });
  })
);

/**
 * @swagger
 *  /chargingStations/{id}:
 *  get:
 *    tags:
 *      - Charging Stations
 *    parameters:
 *      - name: id
 *        schema:
 *          type: integer
 *        description: A valid charging station id
 *        required: true
 *        in: path
 *    responses:
 *      200:
 *        description: Ok
 *
 */

chargingStationsHandler.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const chargingStationId = req.params.id;

    const chargingStation = await ChargingStation.findByPk(chargingStationId, {
      include: [{ association: 'owner' }, { association: 'comments' }],
    });

    if (!chargingStation)
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `Charging station ${chargingStationId} not found`
      );

    res.json({ code: 200, message: 'ok', data: chargingStation });
  })
);

/**
 * @swagger
 *  /chargingStations:
 *  post:
 *    tags:
 *      - Charging Stations
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              lat:
 *                type: number
 *              long:
 *                type: number
 *              provider:
 *                type: string
 *                description: The charging station provider
 *              priceDetails:
 *                type: string
 *                description: The charging station price details
 *              address:
 *                type: string
 *                description: The charging station address
 *              city:
 *                type: string
 *                description: The charging station city
 *              count:
 *                type: number
 *                description: The charging station charger count
 *              power:
 *                type: number
 *                description: The charging station charger power
 *              connectorType:
 *                type: number
 *                description: The charging station charger power
 *              isPrivate:
 *                type: boolean
 *                description: Charging station is privately owned
 *              condition:
 *                type: string
 *                description: Occupied, Malfunction, Available
 *              ownerId:
 *                type: number
 *                description: Charging station owner id
 *
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ChargingStation'
 */

chargingStationsHandler.post(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      provider: req.body.provider,
      priceDetails: req.body.priceDetails,
      address: req.body.address,
      city: req.body.city,
      count: req.body.count,
      power: req.body.power,
      connectorType: req.body.connectorType,
      isPrivate: req.body.isPrivate,
      condition: req.body.condition,
      ownerId: req.body.ownerId,
    };

    // if (req.body.ownerId) {
    //   const owner = await User.findByPk(payload.ownerId);

    //   if (!owner) {
    //     throw new ApiError(
    //       HttpStatus.BAD_REQUEST,
    //       `Owner ${payload.ownerId} not found`
    //     );
    //   }
    // }

    const chargingStation = await ChargingStation.create(payload);
    // const comment = await Comment.create();

    // chargingStation.comments.push(comment);

    await chargingStation.reload({
      include: [{ association: 'owner' }, { association: 'comments' }],
    });

    res.json({ code: 200, message: 'ok', data: chargingStation.dataValues });
  })
);

// /**
//  * @swagger
//  *  /chargingStations/{id}/comment:
//  *  post:
//  *    tags:
//  *      - Charging Stations
//  *    parameters:
//  *      - name: id
//  *        schema:
//  *          type: integer
//  *        description: A valid charging station id
//  *        required: true
//  *        in: path
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            type: object
//  *            properties:
//  *              content:
//  *                type: string
//  *              comentator:
//  *                type: string
//  *    responses:
//  *      200:
//  *        description: Ok
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Comment'
//  */

// chargingStationsHandler.post(
//   '/:id/comment',
//   asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const payload = {
//       name: req.body.name,
//       lat: req.body.lat,
//       lng: req.body.lng,
//       provider: req.body.provider,
//       priceDetails: req.body.priceDetails,
//       address: req.body.address,
//       city: req.body.city,
//       count: req.body.count,
//       power: req.body.power,
//       connectorType: req.body.connectorType,
//       isPrivate: req.body.isPrivate,
//       condition: req.body.condition,
//       ownerId: req.body.ownerId,
//     };

//     // if (req.body.ownerId) {
//     //   const owner = await User.findByPk(payload.ownerId);

//     //   if (!owner) {
//     //     throw new ApiError(
//     //       HttpStatus.BAD_REQUEST,
//     //       `Owner ${payload.ownerId} not found`
//     //     );
//     //   }
//     // }

//     const chargingStation = await ChargingStation.create(payload);
//     // const comment = await Comment.create();

//     // chargingStation.comments.push(comment);

//     await chargingStation.reload({
//       include: [{ association: 'owner' }, { association: 'comments' }],
//     });

//     res.json({ code: 200, message: 'ok', data: chargingStation.dataValues });
//   })
// );

/**
 * @swagger
 *  /chargingStations/{chargingStationId}/comment:
 *  post:
 *    tags:
 *      - Charging Stations
 *    parameters:
 *      - name: chargingStationId
 *        schema:
 *          type: integer
 *        description: A valid charging station id
 *        required: true
 *        in: path
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *              commentator:
 *                type: string
 *    responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 */

chargingStationsHandler.post(
  '/:chargingStationId/comment',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      chargingStationId: req.params.chargingStationId,
      commentator: req.body.commentator,
      content: req.body.content,
    };

    const comment = await Comment.create(payload);

    res.json({ code: 200, message: 'ok', data: comment.dataValues });
  })
);

export default chargingStationsHandler;
