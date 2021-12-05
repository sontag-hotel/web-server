import {Global, Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {KakaoClient} from './kakaoClient';

@Global()
@Module({
  imports: [AuthModule],
  providers: [KakaoClient, AuthModule],
  exports: [AuthModule],
})
export class CommonModule {}
