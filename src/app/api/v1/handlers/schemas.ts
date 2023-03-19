/**
 * @swagger
 * components:
 *  schemas:
 *    
 *    Battery:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        range_capacity:
 *          type: number
 *        battery_capacity:
 *          type: number
 *        consumption_per_km:
 *          type: number
 *        percentage:
 *          type: number
 *        vehicle_meta_id:
 *          type: number
 *        electric_vehicle_id:
 *          type: number
 *
 *    ElectricVehicle:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        current_battery:
 *          $ref: '#/components/schemas/Battery'
 *        vehicle_meta_id:
 *          type: number
 * 
 *    VehiclesMeta:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        brand:
 *          type: string
 *        model:
 *          type: string
 *        image:
 *          type: string
 *        year:
 *          type: number
 *        vehicles:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ElectricVehicle'
 *        
 */
