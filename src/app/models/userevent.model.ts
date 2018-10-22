import { DeviceInfo } from 'ngx-device-detector';

export class UserEvent {
  ip: string;
  agent: DeviceInfo;
  device: string;
  referer: string;
  url: string;
  lat: number;
  lon: number;
  city: string;
  zip: string;
  country: string;
}
