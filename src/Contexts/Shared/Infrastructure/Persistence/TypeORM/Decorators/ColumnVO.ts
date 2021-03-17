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
                    from: value => {
                        if (value) value = new valueObject(value);
                        return value;
                    },
                    to: (value) => {
                        let val = value;
                        if(value instanceof valueObject) return value.value;
                        return val;
                    }
                }
            }
        } as ColumnMetadataArgs);
    }
}
