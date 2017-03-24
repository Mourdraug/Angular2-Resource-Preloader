import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import { CachedResource } from './cached.interface';
import { CachedImage } from './cachedimage';

import { DictMap } from 'm-collections';

@Injectable()
export class ResourceProvider {
	private cachedResources: DictMap<CachedResource>;

	constructor() {
		this.cachedResources = new DictMap<CachedResource>();
	}

	public getImage(imgUrl: string) {
		let resource = this.cachedResources.get(imgUrl);
		if (resource instanceof CachedImage && resource.loaded) {
			return Observable.of(resource.image);
		} else if (resource instanceof CachedImage && resource.loading) {
			return resource.loadingObservable;
		} else {
			resource = new CachedImage();
			this.cachedResources.put(imgUrl, resource);
			return resource.loadResource(imgUrl);
		}
	}

	public preloadImages(imgUrls: string[]) {
		return Observable.from(imgUrls).concatMap(imgUrl => this.getImage(imgUrl));
	}
}
