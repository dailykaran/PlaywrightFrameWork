import {
    Reporter,
    FullConfig,
    Suite,
    TestCase,
    TestError,
    TestResult,
    TestStep,
  } from '@playwright/test/reporter';
  import { createLogger, format, transports } from 'winston';
  
  import { existsSync, mkdirSync } from 'fs';
  
  const logDir = 'logs';
  
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }
  
/*   const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
  }); */

  const logger = createLogger({
    transports: [
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format.json()
      }),
      new transports.File({
        filename: 'logs/info.log',
        level: 'info',
        format: format.json()
      }),
      new transports.Http({
        level: 'warn',
        format: format.json()
      }),
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.colorize(),
          format.simple()
        ),
      }),

    ]
  });
  
  export default class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite): void {
      logger.info(`Starting the run with ${suite.allTests().length} tests`);
    }
  
    onTestBegin(test: TestCase): void {
      logger.info(`Test Case Started: ${test.title}`);
    }
  
    onTestEnd(test: TestCase, result: TestResult): void {
      logger.info(`Test Case Completed: ${test.title} Status: ${result.status}`);
    }
  
    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
      if (step.category === 'test.step') {
        logger.info(`Executing Step: ${step.title}`);
      }
    }
  
    onError(error: TestError): void {
      logger.error(error.message);
    }
  }
