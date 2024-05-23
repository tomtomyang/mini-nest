export class SimpleReflect {
  static metadataContainer = new Map<string, Map<any, any>>();

  static hasMetadata(metadataKey: string, target: any): boolean {
    const targetMetadata = SimpleReflect.metadataContainer.get(metadataKey);
    if (!targetMetadata) {
      return false;
    }
    return targetMetadata.has(target);
  }

  static defineMetadata(metadataKey: string, metadataValue: any, target: any): void {
    let targetMetadata = SimpleReflect.metadataContainer.get(metadataKey);
    if (!targetMetadata) {
      targetMetadata = new Map();
      SimpleReflect.metadataContainer.set(metadataKey, targetMetadata);
    }
    targetMetadata.set(target, metadataValue);
  }

  static getMetadata<T>(metadataKey: string, target: any): T | undefined {
    const targetMetadata = SimpleReflect.metadataContainer.get(metadataKey);
    return targetMetadata ? (targetMetadata.get(target) as T) : undefined;
  }
}
