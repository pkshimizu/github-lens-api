import * as pluralize from 'pluralize';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  override tableName(targetName: string, userSpecifiedName: string): string {
    if (targetName.endsWith('Entity')) {
      targetName = targetName.substring(0, targetName.length - 'Entity'.length);
    }
    return userSpecifiedName || pluralize.plural(snakeCase(targetName));
  }

  override columnName(propertyName: string, customName: string): string {
    return customName || snakeCase(propertyName);
  }

  override joinColumnName(relationName: string, referencedColumnName: string) {
    return snakeCase(
      `${pluralize.singular(relationName)}_${referencedColumnName}`,
    );
  }

  override joinTableName(firstTableName: string, secondTableName: string) {
    return snakeCase(`${firstTableName}_${secondTableName}`);
  }

  override joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string,
  ) {
    return snakeCase(
      `${pluralize.singular(tableName)}_${columnName || propertyName}`,
    );
  }
}
