/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

import { readFileSync, writeFileSync } from 'fs';
import { LoggerService as NestLogger } from '@nestjs/common';
import { ILogObject, Logger } from 'tslog';
import configuration from '../config/configuration';

// import { WebhookService } from "../modules";

export class LoggerService implements NestLogger {
  private logger: Logger;

  private static logger: Logger;

  private filename: string;

  private static filename: string;

  constructor() {
    this.logger = new Logger({ displayTypes: false });
    this.filename = configuration().logs.fileName;
    this.attachTransports();
  }

  static staticInitialize(): void {
    this.logger = new Logger({ displayTypes: false });
    this.filename = configuration().logs.fileName;
    this.attachTransports();
  }

  static attachTransports(): void {
    this.logger.attachTransport(
      {
        silly: LoggerService.logToTransport,
        debug: LoggerService.logToTransport,
        trace: LoggerService.logToTransport,
        info: LoggerService.logToTransport,
        warn: LoggerService.logToTransport,
        error: LoggerService.logToTransport,
        fatal: LoggerService.logToTransport,
      },
      'debug',
    );
  }

  private attachTransports(): void {
    this.logger.attachTransport(
      {
        silly: LoggerService.logToTransport,
        debug: LoggerService.logToTransport,
        trace: LoggerService.logToTransport,
        info: LoggerService.logToTransport,
        warn: LoggerService.logToTransport,
        error: LoggerService.logToTransport,
        fatal: LoggerService.logToTransport,
      },
      'debug',
    );
  }

  private static logToTransport(logObject: ILogObject): void {
    if (logObject.logLevelId > 4) {
      let logFileArray: Array<any>;
      const filename = configuration().logs.fileName;

      try {
        logFileArray = JSON.parse(readFileSync(`${filename}.json`).toString());
      } catch (err: any) {
        try {
          logFileArray = [];
          writeFileSync(
            `${filename}.json`,
            JSON.stringify(logFileArray, null, 2),
          );
        } catch (err) {}
      }

      logFileArray.push({ time: new Date().toLocaleString(), logObject });

      if (logFileArray.length > 100) {
        logFileArray.splice(0, logFileArray.length - 100);
      }
      try {
        logFileArray = [];
        writeFileSync(
          `${filename}.json`,
          JSON.stringify(logFileArray, null, 2),
        );
      } catch (err) {}
    }
  }

  silly(message: any, ...optionalParams: any[]): void {
    this.logger.silly(message, ...optionalParams);
  }

  static silly(message: any, ...optionalParams: any[]): void {
    this.logger.silly(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.logger.debug(message, ...optionalParams);
  }

  static debug(message: any, ...optionalParams: any[]): void {
    this.logger.debug(message, ...optionalParams);
  }

  trace(message: any, ...optionalParams: any[]): void {
    this.logger.trace(message, ...optionalParams);
  }

  static trace(message: any, ...optionalParams: any[]): void {
    this.logger.trace(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]): void {
    this.logger.info(message, ...optionalParams);
  }

  static log(message: any, ...optionalParams: any[]): void {
    this.logger.info(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.logger.warn(message, ...optionalParams);
  }

  static warn(message: any, ...optionalParams: any[]): void {
    this.logger.warn(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    // WebhookService.sendError(message);
    this.logger.error(message, ...optionalParams);
  }

  static error(message: any, ...optionalParams: any[]): void {
    // WebhookService.sendError(message);
    this.logger.error(message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]): void {
    this.logger.fatal(message, ...optionalParams);
  }

  static fatal(message: any, ...optionalParams: any[]): void {
    this.logger.fatal(message, ...optionalParams);
  }
}

LoggerService.staticInitialize();
