interface ITokenRepository {
  get(): Promise<string>;
  set(token: string): Promise<void>;
  clear(): Promise<void>;
}

interface IAngularStore {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
}


