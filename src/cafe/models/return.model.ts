import {Field, ObjectType} from '@nestjs/graphql';
import {CafeUser} from './cafe.user.model';

//표준화된 리턴 모델
@ObjectType({description: 'Normalized_Response_Model'})
export class NormalizedResponse {
  @Field(() => [CafeUser])
  data!: CafeUser[];

  @Field(() => String)
  message?: string;

  @Field(() => Number)
  code?: number;
}
