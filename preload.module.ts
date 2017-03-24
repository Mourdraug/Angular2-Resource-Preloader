import { NgModule } from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatMap';

import { ResourceProvider } from './src/resource.provider';

export * from './src/cached.interface';
export * from './src/resource.provider';
export * from './src/cachedimage';

@NgModule({
  providers:      [ResourceProvider],
})
export class PreloadModule {}
