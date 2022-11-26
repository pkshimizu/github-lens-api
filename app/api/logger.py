from logging.config import dictConfig

from flask import Flask

dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
                "formatter": "default",
            },
        },
        "root": {"level": "DEBUG", "handlers": ["console"]},
        "disable_existing_loggers": False,
    }
)


class Logger:
    def __init__(self):
        self.flask_logger = None

    def setup(self, app: Flask):
        self.flask_logger = app.logger

    def debug(self, message, *args, **kwargs):
        self.flask_logger.debug(message, *args, **kwargs)

    def info(self, message, *args, **kwargs):
        self.flask_logger.info(message, *args, **kwargs)

    def warning(self, message, *args, **kwargs):
        self.flask_logger.warning(message, *args, **kwargs)

    def error(self, message, *args, **kwargs):
        self.flask_logger.error(message, *args, **kwargs)

    def critical(self, message, *args, **kwargs):
        self.flask_logger.critical(message, *args, **kwargs)

    def fatal(self, message, *args, **kwargs):
        self.flask_logger.fatal(message, *args, **kwargs)


logger = Logger()


def setup_logger(app: Flask):
    logger.setup(app)
