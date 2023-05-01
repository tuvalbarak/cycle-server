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
 *          description: The unique identifier for the battery
 *        range_capacity:
 *          type: number
 *          description: The maximum range of the battery in kilometers
 *        battery_capacity:
 *          type: number
 *          description: The capacity of the battery in kilowatt hours (kWh)
 *        consumption_per_km:
 *          type: number
 *          description: The energy consumption of the vehicle in kilowatt hours per kilometer (kWh/km)
 *        percentage:
 *          type: number
 *          description: The percentage of the battery's charge remaining
 *        vehicle_meta_id:
 *          type: number
 *          description: The ID of the vehicle model that this battery is used in
 *        electric_vehicle_id:
 *          type: number
 *          description: The ID of the electric vehicle that this battery is installed in
 *
 *    ElectricVehicle:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The unique identifier for the electric vehicle
 *        current_battery:
 *          $ref: '#/components/schemas/Battery'
 *          description: The battery currently installed in the vehicle
 *        vehicle_meta_id:
 *          type: number
 *          description: The ID of the vehicle model that this electric vehicle is based on
 *
 *    VehiclesMeta:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The unique identifier for the vehicle model
 *        brand:
 *          type: string
 *          description: The brand of the vehicle
 *        model:
 *          type: string
 *          description: The model of the vehicle
 *        image:
 *          type: string
 *          description: A URL to an image of the vehicle
 *        year:
 *          type: number
 *          description: The year the vehicle was manufactured
 *        vehicles:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ElectricVehicle'
 *            description: A list of electric vehicles based on this vehicle model
 *
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The unique identifier for the user
 *        googleId:
 *          type: integer
 *          description: The user's Google ID
 *        email:
 *          type: string
 *          description: The user's email address
 *        name:
 *          type: string
 *          description: The user's name
 *        thumbnail:
 *          type: string
 *          description: A URL to the user's profile picture
 *        phone:
 *          type: string
 *          description: The user's phone number
 *        crystalsBalance:
 *          type: integer
 *          description: The user's current balance of crystals
 *        drivingCharacteristicId:
 *          type: integer
 *          description: The ID of the user's driving characteristic
 *        preferenceId:
 *          type: integer
 *          description: The ID of the user's preference
 *        vehiclesHistory:
 *          type: array
 *          items:
 *            type: integer
 *            description: An array of vehicle IDs that the user has used in the past
 *    ChargingStation:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The unique identifier for the charging station
 *        name:
 *          type: string
 *          description: The name of the charging station
 *        lat:
 *          type: number
 *          description: The latitude of the charging station location
 *        lng:
 *          type: number
 *          description: The longitude of the charging station location
 *        provider:
 *          type: string
 *          description: The name of the charging station provider
 *        priceDetails:
 *          type: string
 *          description: Details about the price of charging at the station
 *        address:
 *          type: string
 *          description: The address of the charging station
 *        city:
 *          type: string
 *          description: The city where the charging station is located
 *        count:
 *          type: number
 *          description: The number of chargers available at the station
 *        power:
 *          type: number
 *          description: The charging power of the station in kW
 *        connectorType:
 *          type: string
 *          description: The type of connector available at the station
 *        isPrivate:
 *          type: boolean
 *          description: Indicates whether the station is private or not
 *        condition:
 *          type: string
 *          description: Occupied, Malfunction, Available
 *        comments:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Comment'
 *            description: The charging station comments
 *        user:
 *          $ref: '#/components/schemas/User'
 *          description: The user who owns the charging station, if applicable
 *
 *    Comment:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: The unique identifier for the comment
 *        content:
 *          type: string
 *          description: The content of the comment
 *        createdAt:
 *          type: string
 *          description: Timestamp of the comment
 *        comentator:
 *          type: string
 *          description: The name of the comment creator
 *        chargingStationId:
 *          type: number
 *          description: The id of the charging station
 */
