import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import ChargingStation from '../app/models/ChargingStation';

const readFile = promisify(fs.readFile);

export const seedChargingStations = async () => {
  const filePath = path.join(__dirname, '..', 'jsons', 'charging_stations.json');

  let chargingStations = JSON.parse(await readFile(filePath,'utf-8')).map((record) => {
    return {
      address: record.address,
      city: record.city,
      connectorType: record.connector_type,
      count: record.count,
      lat: record.lat,
      lng: record.lng,
      power: record.power,
      priceDetails: record.price,
      provider: record.provider_id,
      isPrivate: false,
      name: record.name,
      condition: 'Available',
      ratings: [],
    }
  });

  await ChargingStation.bulkCreate(chargingStations);
}


/**
 * 
 *  address -> address
 city -> city
 connector_type -> connectorType
 count -> count
 lat -> lat
 lng -> lng
 power -> power
 price -> priceDetails
 provider_id -> provider
 stationAccess -> omit -> isPrivate: false
 station_id -> id (PK) -> omit 
 name -> name
 //
 condition: 'Available'
 ratings: []

 *   {
    address: 'דרך יצחק רבין 11',
    city: 'בית שמש',
    connector_type: 'type_2',
    count: 2,
    lat: 31.74755063,
    lng: 34.99377936,
    power: 22,
    price: 'שקע Type 2\\r\\nתעריף בית שמש - לקוח מזדמן: דמי שימוש - 2 ש"ח, 1.69 ש"ח לקו"ט \\r\\n.\\r\\n',
    provider_id: 'Evedge',
    station_access: 'public',
    station_id: 100,
    name: 'בית שמש - יצחק רבין 11'
 }
 */