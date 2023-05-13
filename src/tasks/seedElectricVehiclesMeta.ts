import VehiclesMeta from '../app/models/VehiclesMeta';
import Battery from '../app/models/Battery';

export const seedElectricVehiclesMeta = async () => {
  const batteryTeslaY = await Battery.create({
    rangeCapacity: 345,
    batteryCapacity: 57500,
    consumptionPerKm: 167,
    percentage: 100,
  });

  const vehicleTeslaY = await VehiclesMeta.create({
    manufactureBatteryId: 1,
    brand: 'Tesla',
    model: 'Y',
    image: '',
    year: 2023,
  });

  const batteryTesla3 = await Battery.create({
    rangeCapacity: 380,
    batteryCapacity: 57500,
    consumptionPerKm: 151,
    percentage: 100,
  });

  const vehicleTesla3 = await VehiclesMeta.create({
    manufactureBatteryId: 2,
    brand: 'Tesla',
    model: '3',
    image: '',
    year: 2023,
  });

  const batteryHyundaiKonaEV = await Battery.create({
    rangeCapacity: 305,
    batteryCapacity: 39200,
    consumptionPerKm: 143,
    percentage: 100,
  });

  const vehicleHyundaiKonaEV = await VehiclesMeta.create({
    manufactureBatteryId: 3,
    brand: 'Hyundai',
    model: 'Kona EV',
    image: '',
    year: 2023,
  });

  const batteryHyundaiKonaLR = await Battery.create({
    rangeCapacity: 484,
    batteryCapacity: 64000,
    consumptionPerKm: 147,
    percentage: 100,
  });

  const vehicleHyundaiKonaLR = await VehiclesMeta.create({
    manufactureBatteryId: 4,
    brand: 'Hyundai',
    model: 'Kona LR',
    image: '',
    year: 2023,
  });

  const batteryBydAtto = await Battery.create({
    rangeCapacity: 420,
    batteryCapacity: 60480,
    consumptionPerKm: 160,
    percentage: 100,
  });

  const vehicleBydAtto = await VehiclesMeta.create({
    manufactureBatteryId: 5,
    brand: 'BYD',
    model: 'ATTO 3',
    image: '',
    year: 2023,
  });

  const batteryBydTang = await Battery.create({
    rangeCapacity: 400,
    batteryCapacity: 86400,
    consumptionPerKm: 238,
    percentage: 100,
  });

  const vehicleBydTang = await VehiclesMeta.create({
    manufactureBatteryId: 6,
    brand: 'BYD',
    model: 'TANG',
    image: '',
    year: 2023,
  });

  const batteryByHan = await Battery.create({
    rangeCapacity: 521,
    batteryCapacity: 85400,
    consumptionPerKm: 185,
    percentage: 100,
  });

  const vehicleBydHan = await VehiclesMeta.create({
    manufactureBatteryId: 7,
    brand: 'BYD',
    model: 'HAN',
    image: '',
    year: 2023,
  });

  const batteryAudiQ8 = await Battery.create({
    rangeCapacity: 525,
    batteryCapacity: 106000,
    consumptionPerKm: 202,
    percentage: 100,
  });

  const vehicleAudiQ8 = await VehiclesMeta.create({
    manufactureBatteryId: 8,
    brand: 'Audi',
    model: 'Q8',
    image: '',
    year: 2023,
  });

  const batteryAudiSQ8 = await Battery.create({
    rangeCapacity: 445,
    batteryCapacity: 106000,
    consumptionPerKm: 238,
    percentage: 100,
  });

  const vehicleAudiSQ8 = await VehiclesMeta.create({
    manufactureBatteryId: 9,
    brand: 'Audi',
    model: 'SQ8',
    image: '',
    year: 2023,
  });

  const batteryOraGT = await Battery.create({
    rangeCapacity: 330,
    batteryCapacity: 59300,
    consumptionPerKm: 180,
    percentage: 100,
  });

  const vehicleOraGt = await VehiclesMeta.create({
    manufactureBatteryId: 10,
    brand: 'ORA',
    model: 'GT',
    image: '',
    year: 2023,
  });

  const batteryOra63 = await Battery.create({
    rangeCapacity: 340,
    batteryCapacity: 59300,
    consumptionPerKm: 174,
    percentage: 100,
  });

  const vehicleOra63 = await VehiclesMeta.create({
    manufactureBatteryId: 11,
    brand: 'ORA',
    model: '63',
    image: '',
    year: 2023,
  });

  const batteryDacia = await Battery.create({
    rangeCapacity: 160,
    batteryCapacity: 25000,
    consumptionPerKm: 156,
    percentage: 100,
  });

  const vehicleDacia = await VehiclesMeta.create({
    manufactureBatteryId: 12,
    brand: 'Dacia',
    model: 'Sprint Electric',
    image: '',
    year: 2023,
  });

  const batteryVolvoC40 = await Battery.create({
    rangeCapacity: 390,
    batteryCapacity: 78000,
    consumptionPerKm: 200,
    percentage: 100,
  });

  const vehicleVolvoC40 = await VehiclesMeta.create({
    manufactureBatteryId: 13,
    brand: 'Volvo',
    model: 'C40',
    image: '',
    year: 2023,
  });

  const batteryVolvoXC40 = await Battery.create({
    rangeCapacity: 380,
    batteryCapacity: 78000,
    consumptionPerKm: 205,
    percentage: 100,
  });

  const vehicleVolvoXC40 = await VehiclesMeta.create({
    manufactureBatteryId: 14,
    brand: 'Volvo',
    model: 'XC40',
    image: '',
    year: 2023,
  });

  const batteryVolvoEX90 = await Battery.create({
    rangeCapacity: 455,
    batteryCapacity: 107000,
    consumptionPerKm: 235,
    percentage: 100,
  });

  const vehicleVolvoEX90 = await VehiclesMeta.create({
    manufactureBatteryId: 15,
    brand: 'Volvo',
    model: 'EX90',
    image: '',
    year: 2023,
  });

  const batteryMercedes500 = await Battery.create({
    rangeCapacity: 485,
    batteryCapacity: 108400,
    consumptionPerKm: 224,
    percentage: 100,
  });

  const vehicleMercedes500 = await VehiclesMeta.create({
    manufactureBatteryId: 16,
    brand: 'Mercedes',
    model: 'EQS 500',
    image: '',
    year: 2023,
  });

  const batteryBMWi4 = await Battery.create({
    rangeCapacity: 400,
    batteryCapacity: 67000,
    consumptionPerKm: 168,
    percentage: 100,
  });

  const vehicleBMWi4 = await VehiclesMeta.create({
    manufactureBatteryId: 17,
    brand: 'BMW',
    model: 'i4 eDrive35',
    image: '',
    year: 2023,
  });

  const batteryAiwaysU6 = await Battery.create({
    rangeCapacity: 350,
    batteryCapacity: 60000,
    consumptionPerKm: 171,
    percentage: 100,
  });

  const vehicleAiwaysU6 = await VehiclesMeta.create({
    manufactureBatteryId: 18,
    brand: 'Aiways',
    model: 'U6',
    image: '',
    year: 2023,
  });

  const batteryPeugeot308 = await Battery.create({
    rangeCapacity: 300,
    batteryCapacity: 51000,
    consumptionPerKm: 170,
    percentage: 100,
  });

  const vehiclePeugeot308 = await VehiclesMeta.create({
    manufactureBatteryId: 19,
    brand: 'Peugeot',
    model: 'e-308',
    image: '',
    year: 2023,
  });

  const batteryGenesisGV70 = await Battery.create({
    rangeCapacity: 350,
    batteryCapacity: 74000,
    consumptionPerKm: 211,
    percentage: 100,
  });

  const vehicleGenesisGV70 = await VehiclesMeta.create({
    manufactureBatteryId: 20,
    brand: 'Genesis',
    model: 'GV70',
    image: '',
    year: 2023,
  });
};
