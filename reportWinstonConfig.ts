import {
    Reporter,
    FullConfig,
    Suite,
    TestCase,
    TestError,
    TestResult,
    TestStep,
    FullResult
  } from '@playwright/test/reporter';
  import { createLogger, format, level, transports } from 'winston';
  import { existsSync, mkdirSync } from 'fs';
  
  const logDir = 'logs'; 
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }

  const myFormat = format.printf(info => {
    if(info instanceof Error) {
        return `${info.timestamp} ${info.level}: ${info.message} ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
  });
 
    const logger = createLogger({
      level: process.env.LOG_LEVEL || 'info' || 'warn' || 'error'  || 'debug' || 'http',
      format: format.combine(
        //format.colorize({ colors: { error: 'red'}}, ),
        //format.uncolorize(),
        format.splat(),
        format.errors({ stack: true }), 
        format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }), 
        format.align(),
        myFormat
      ),
      defaultMeta: { service: 'checkout-service'},
      transports: [
          new transports.File({ filename: 'logs/error.log', level: 'error' }),
          new transports.File({ filename: 'logs/combined.log' }),
          new transports.Console(),
      ],
      exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log', handleExceptions: true }),
      ],
      rejectionHandlers: [
        new transports.File({ filename: 'logs/rejections.log', handleRejections: true} ),
      ],
      //exitOnError: false,
    });   
    
    export default class MyReporter implements Reporter {
      onBegin(config: FullConfig, suite: Suite): void {
        logger.info(`Starting the run with ${suite.allTests().length} tests`);
      }
    
      onTestBegin(test: TestCase): void {
        logger.info(`Test Case Started: ${test.title}`);
      }
    
      onTestEnd(test: TestCase, result: TestResult): void {
        if(result.status === 'failed'){
          logger.error(`${test.title} Executing Test End: ${result.error?.stack} Status: ${result.status}`);
          //logger.error(`${result.error?.message}` + `Status: ` + ` ${result.status} `);
          logger.error( `${result.error?.message}` + `\x1b[41m Status: \x1b[0m` + `\x1b[41m ${result.status} \x1b[0m`);
        }else{
          logger.info(`Test Case Completed: ${test.title} Status: ${result.status}`);
        }
      }
    
      onStepBegin(test: TestCase, result: TestResult, step: TestStep, ): void {
        if (step.category === 'test.step') {
          logger.info(`Executing Step Begin: ${step.title} `);
        }
      }
      onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === 'test.step') {
          logger.info(`Executing Step End: ${step.title} Status: ${result.status}`);
        }
      }
      
      onEnd(result: FullResult): Promise<{ status?: FullResult['status']; } | undefined | void> | void {
        if(result.status === 'failed'){
          //logger.error(`Test suite is ended: ` + ` ${result.status}`);
          logger.error( `\x1b[41m Test suite is ended: \x1b[0m` + `\x1b[41m ${result.status} \x1b[0m` );
        }else{
          logger.info( 'Test suite is ended: ' + `${result.status} `);
        }
      }
  
      onError(error: TestError) {
        logger.error(`Error line is displaying `+ error.message);
        logger.error(`Error stack line displaying ` + error.stack );
      }
    }
  