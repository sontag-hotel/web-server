import {Field, ArgsType /*, registerEnumType*/} from '@nestjs/graphql';

@ArgsType()
export class GetCafeArgs {
  @Field()
  _id?: string;
}
