export type RegisterData = {
  email: string;
  password: string;
};

export type BusPosition = {
  Lat: number;
  Lon: number;
};

export type NotificationFormData = {
  line: string;
  stop: string;
  email: string;
  time: string;
  user_id: number;
};

export type LocationRequest = {
  time: string;
};

export type BusData = {
  Lines: string;
  Lon: number;
  VehicleNumber: string;
  Time: string;
  Lat: number;
  Brigade: string;
};

export type LocationResponse = {
  result: BusData[];
};