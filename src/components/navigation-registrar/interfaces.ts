interface INavigationRegistration {
  title: string;
  state: string;
}

interface INavigationRegistrar {
  get(): INavigationRegistration[];
  register(title: string, state: string): void;
}

