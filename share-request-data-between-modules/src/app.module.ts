import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedStorageMiddleware } from './shared-storage/shared-storage.middleware';
import { SharedStorageModule } from './shared-storage/shared-storage.module';

@Module({
  imports: [SharedStorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SharedStorageMiddleware).forRoutes(AppController);
  }
}
