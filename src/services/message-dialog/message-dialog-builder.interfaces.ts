interface IMessageDialogBuilder {
  withMessage: (message: string) => IMessageDialogBuilder;
  withTitle: (title: string) => IMessageDialogBuilder;
  withOkLabel: (label: string) => IMessageDialogBuilder;
  withOkHandler: (handler: Function) => IMessageDialogBuilder;
  withException: (ex: any) => IMessageDialogBuilder;
  show: () => void;
}

interface IMessageDialogBuilderService {
  create: () => IMessageDialogBuilder;
}
