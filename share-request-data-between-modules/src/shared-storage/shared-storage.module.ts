import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { SHARED_STORAGE } from './shared-storage.constants';
import { SharedStorageType } from './shared-storage.type';

@Module({
  providers: [
    {
      provide: SHARED_STORAGE,
      useValue: new AsyncLocalStorage<SharedStorageType>(),
    },
  ],
  exports: [SHARED_STORAGE],
})
export class SharedStorageModule {}
