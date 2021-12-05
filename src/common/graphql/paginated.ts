import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Type} from '@nestjs/common';

export interface IPagniatedType<T> {
  totalCount: number;
  items: T[];
}
export function Paginated<T>(classRef: Type<T>): Type<IPagniatedType<T>> {
  @ObjectType({isAbstract: true})
  abstract class PaginatedType implements IPagniatedType<T> {
    @Field(() => [classRef])
    items!: T[];

    @Field(() => Int)
    totalCount!: number;

    constructor(options?: {items: T[]; totalCount: number}) {
      if (options) {
        this.items = options.items;
        this.totalCount = options.totalCount;
      }
    }
  }

  return PaginatedType as Type<IPagniatedType<T>>;
}
