export interface Member {
  active: string;
  total: TotalItem[];
}
interface TotalItem {
  name: string;
  count: number;
}
