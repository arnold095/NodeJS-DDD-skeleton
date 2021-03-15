import { ColumnType, getMetadataArgsStorage } from "typeorm";
import { ColumnMetadataArgs } from "typeorm/metadata-args/ColumnMetadataArgs";

export function PrimaryColumnVO(columnName: string, valueObject: any, type: ColumnType = 'uuid'): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        // create and register a new column metadata
        getMetadataArgsStorage().columns.push({
            target: object.constructor,
            propertyName: propertyName,
            mode: "regular",
            options: {
                name: columnName,
                type,
                primary: true,
                nullable: false,
                transformer: {
                    from: value => new valueObject(value),
                    to: (value) => {
                        let val = value;
                        if (value instanceof valueObject) return value.value;
                        return val;
                    }
                }
            }
        } as ColumnMetadataArgs);
    };
}
