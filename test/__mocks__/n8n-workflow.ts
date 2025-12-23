/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export class NodeApiError extends Error {
  constructor(node: any, error: any, options?: any) {
    super(options?.message || error?.message || 'API Error');
    this.name = 'NodeApiError';
  }
}

export class NodeOperationError extends Error {
  constructor(node: any, error: any, options?: any) {
    super(error?.message || 'Operation Error');
    this.name = 'NodeOperationError';
  }
}

export interface INodeProperties {
  displayName: string;
  name: string;
  type: string;
  default?: any;
  required?: boolean;
  description?: string;
  options?: any[];
  displayOptions?: any;
  typeOptions?: any;
  placeholder?: string;
  noDataExpression?: boolean;
}

export interface INodeTypeDescription {
  displayName: string;
  name: string;
  icon?: string;
  group: string[];
  version: number;
  subtitle?: string;
  description: string;
  defaults: any;
  inputs: string[];
  outputs: string[];
  credentials?: any[];
  properties: INodeProperties[];
  webhooks?: any[];
}

export interface IDataObject {
  [key: string]: any;
}

export interface INodeExecutionData {
  json: IDataObject;
  binary?: any;
}

export interface IExecuteFunctions {
  getInputData(): INodeExecutionData[];
  getNodeParameter(name: string, index: number, defaultValue?: any): any;
  getCredentials(name: string): Promise<IDataObject>;
  getNode(): any;
  helpers: {
    request(options: any): Promise<any>;
    returnJsonArray(data: any): INodeExecutionData[];
    constructExecutionMetaData(data: any, options: any): INodeExecutionData[];
  };
  continueOnFail(): boolean;
}
