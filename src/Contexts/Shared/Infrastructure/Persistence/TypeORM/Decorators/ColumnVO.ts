import { getMetadataArgsStorage } from "typeorm";
import { ColumnMetadataArgs } from "typeorm/metadata-args/ColumnMetadataArgs";

export function ColumnVO(columnName: string, valueObject: any, type: string= 'varchar'): Function {
    return function (object: Object, propertyName: string) {
        getMetadataArgsStorage().columns.push({
            target: object.constructor,
            propertyName: propertyName,
            mode: 'regular',
            options: {
                name: columnName,
                type,
                transformer: {
                    from: value => new valueObject(value),
                    to: value => value
                }
            }
        } as ColumnMetadataArgs);
    }
}
