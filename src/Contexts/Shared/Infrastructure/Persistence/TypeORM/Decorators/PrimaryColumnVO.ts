/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnType, getMetadataArgsStorage } from 'typeorm';
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';

export function PrimaryColumnVO(
  columnName: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ValueObject: any,
  type: ColumnType = 'uuid'
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    // create and register a new column metadata
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName,
      mode: 'regular',
      options: {
        name: columnName,
        type,
        primary: true,
        nullable: false,
        transformer: {
          from: (value) => {
            if (value) value = new ValueObject(value);
            return value;
          },
          to: (value) => {
            const val = value;
            if (value instanceof ValueObject) return value.value;
            return val;
          },
        },
      },
    } as ColumnMetadataArgs);
  };
}
