export class StoreUtil {
  private static list = new Map<string, any>();

  static get(key: string) {
    return StoreUtil.list.get(key);
  }

  static set(key: string, data: any) {
    StoreUtil.list.set(key, data);
  }
}
