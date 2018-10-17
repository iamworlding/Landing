import { DeviceInfo } from 'ngx-device-detector';

export class User {
  ip: string;
  agent: DeviceInfo;
  referer: string;
  url: string;
  lat: number;
  lon: number;
  city: string;
  zip: string;
  country: string;
}
