import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Request } from 'express';
import { SHARED_STORAGE } from './shared-storage.constants';
import { SharedStorageType } from './shared-storage.type';

@Injectable()
export class SharedStorageMiddleware implements NestMiddleware {
  constructor(
    @Inject(SHARED_STORAGE)
    private readonly loginStorage: AsyncLocalStorage<SharedStorageType>,
  ) {}

  use(req: Request, res, next) {
    const loginRequestHeaders: Record<string, string> = {};

    if (req.headers['test-header']) {
      loginRequestHeaders['test-header'] = req.headers['test-header'] as string;
    }

    const loginStore: SharedStorageType = {
      loginRequestHeaders,
    };
    this.loginStorage.run(loginStore, () => {
      next();
    });
  }
}
