import { resolve } from 'path';
const baseLogPath = resolve(__dirname, '../../logs'); // 日志要写入哪个目标

const log4jsConfig = {
  appenders: {
    console: {
      type: 'console', // 打印到控制台
    },
    access: {
      type: 'dateFile', // 会写入文件，并且按照日期分类
      filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为:access.当前时间.log
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd', // 时间格式
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true, // 是否保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期切割
      pattern: 'yyyy-MM-dd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期切割
      pattern: 'yyyy-MM-dd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appenders: 'errorFile'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG'
    },
    info: {
      appenders: ['console', 'app', 'errors'],
      level: 'info'
    },
    access: {
      appenders: ['console', 'app', 'errors'],
      level: 'info'
    },
    http: {
      appenders: ['access'],
      level: 'DEBUG'
    }
  },
  pm2: true, // 使用pm2来管理项目时打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据pm2分配的id进行区分，以免各进程在写日志是造成冲突
};

export default log4jsConfig;
