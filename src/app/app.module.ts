import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/components';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
