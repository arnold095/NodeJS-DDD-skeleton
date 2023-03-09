import { DummyPrimitives } from '../Domain/Dummy';

export interface DummySchema extends Omit<DummyPrimitives, 'id'> {
  _id: string;
}
