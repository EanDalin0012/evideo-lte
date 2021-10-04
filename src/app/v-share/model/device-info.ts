export interface DeviceInfo {
  id: number,
  userAgent: string;
  os: string;
  browser: string;
  device: string;
  osVersion: string;
  browserVersion: string;
  deviceType: string;
  orientation: string;
  ip?: string;
  date?: string;
}
