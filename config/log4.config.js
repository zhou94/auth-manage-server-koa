const path = require('path');
let baseLogPath = path.resolve(__dirname, '../logs')


//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
//var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

module.exports = {
    appenders:
    {
        "console": {"type": "console"},
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "maxLogSize": 1000,
            "numBackups": 100,
            "path":errorPath
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "maxLogSize": 1000,
            "numBackups": 100,
            "path":responsePath
        },
    },
    categories: {
        "default": {"appenders": ["console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "http": {"appenders": ["resLogger"],"level": "info"}
    },
    "replaceConsole": true,
    "baseLogPath": baseLogPath 
}