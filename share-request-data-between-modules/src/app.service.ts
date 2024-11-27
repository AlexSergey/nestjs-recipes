import { Inject, Injectable } from '@nestjs/common';
import { SHARED_STORAGE } from './shared-storage/shared-storage.constants';
import { AsyncLocalStorage } from 'node:async_hooks';
import { SharedStorageType } from './shared-storage/shared-storage.type';

@Injectable()
export class AppService {
  constructor(
    @Inject(SHARED_STORAGE)
    private readonly sharedStorage: AsyncLocalStorage<SharedStorageType>,
  ) {}
  getHello(): string {
    const testHeader =
      this.sharedStorage.getStore()['loginRequestHeaders']['test-header'];

    return `Hello World ${testHeader} !`;
  }
}
