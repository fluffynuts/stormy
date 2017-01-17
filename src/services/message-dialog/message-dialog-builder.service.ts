import { IModule, material } from 'angular';
import * as angular from 'angular';
import * as _ from 'lodash';

class MessageDialogBuilder implements IMessageDialogBuilder {
  _mdDialog: material.IDialogService;
  _message: string;
  _okHandler: Function;
  _okLabel: string;
  _title: string;
  _exception: any;

  public constructor($mdDialog: material.IDialogService) {
    this._mdDialog = $mdDialog;
  }

  public withException(ex: any): IMessageDialogBuilder {
    this._exception = ex;
    return this;
  }

  public withMessage(message: string): IMessageDialogBuilder {
    this._message = message;
    return this;
  }

  public withOkHandler(handler: Function): IMessageDialogBuilder {
    this._okHandler = handler;
    return this;
  }

  public withTitle(title: string): IMessageDialogBuilder {
    this._title = title;
    return this;
  }

  public withOkLabel(label: string): IMessageDialogBuilder {
    this._okLabel = label;
    return this;
  }

  private _buildMessage(): string {
    return [
        this._message,
        this._buildExceptionMessage()
      ].join('') || '(no text set )\':)';
  }

  private _buildExceptionMessage(): string {
    debugger;
    return _.get(this._exception, 'data.ExceptionMessage') ||
           this._exception;
  }

  show() {
    const title = this._title || 'Alert';
    const message = this._buildMessage();
    this._mdDialog.show(
      this._mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(false)
        .title(title)
        .htmlContent(message)
        .ariaLabel(`${title} :: ${message}`)
        .ok(this._okLabel || 'Ok')
    );
  }
}


function createMessageDialogBuilderService($mdDialog: material.IDialogService) {
  (MessageDialogBuilder as any).create = () => new MessageDialogBuilder($mdDialog);
  return MessageDialogBuilder;
}

export default function (app: IModule) {
  app.service('messageDialogBuilder', createMessageDialogBuilderService);
}
