import { Logger, ILogObj } from 'tslog';
// import { readFileSync, writeFileSync } from 'fs';
// import configuration from '../configs/configurations';

export class LoggerService {
  private logger: Logger<ILogObj>;
  private static logger: Logger<ILogObj>;
  private filename: string;
  private static filename: string;

  constructor() {
    // this.logger = new Logger<ILogObj>({
    //   minLevel: 'debug', // Set appropriate log level
    //   displayDateTime: true,
    //   displayLogLevel: true,
    //   displayFunctionName: false,
    //   displayFilePath: 'hidden', // Adjust as needed
    // });
    // this.filename = configuration().logs.fileName;
    // this.attachTransports();
  }

  //   static staticInitialize(): void {
  //     LoggerService.filename = configuration().logs.fileName;
  //     LoggerService.logger = new Logger<ILogObj>({
  //       minLevel: 'debug',
  //       displayDateTime: true,
  //       displayLogLevel: true,
  //       displayFunctionName: false,
  //       displayFilePath: 'hidden',
  //     });
  //     LoggerService.attachStaticTransports();
  //   }

  //   private static attachStaticTransports(): void {
  //     LoggerService.logger.attachTransport((logObject: ILogObj & ILogObjMeta) => {
  //       // Implement transport logic here
  //     });
  //   }

  //   private attachTransports(): void {
  //     this.logger.attachTransport((logObject: ILogObj & ILogObjMeta) => {
  //       // Implement transport logic here
  //     });
  //   }

  //   private static logToTransport(logObject: ILogObj & ILogObjMeta): void {
  //     if (logObject.logLevelId > 4) {
  //       let logFileArray: any[] = [];
  //       const filename = LoggerService.filename || configuration().logs.fileName;

  //       try {
  //         logFileArray = JSON.parse(readFileSync(`${filename}.json`, 'utf8'));
  //       } catch (err: any) {
  //         console.error('Error reading log file:', err);
  //       }

  //       logFileArray.push({ time: new Date().toLocaleString(), logObject });

  //       if (logFileArray.length > 100) {
  //         logFileArray.splice(0, logFileArray.length - 100);
  //       }

  //       try {
  //         writeFileSync(
  //           `${filename}.json`,
  //           JSON.stringify(logFileArray, null, 2),
  //         );
  //       } catch (err: any) {
  //         console.error('Error writing to log file:', err);
  //       }
  //     }
  //   }

  //   silly(message: any, ...optionalParams: any[]): void {
  //     this.logger.silly(message, ...optionalParams);
  //   }

  //   static silly(message: any, ...optionalParams: any[]): void {
  //     LoggerService.logger.silly(message, ...optionalParams);
  //   }

  // Implement other log levels similarly
}

// Initialize the static logger
// LoggerService.staticInitialize();
