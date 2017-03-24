import { Observable } from 'rxjs/Observable';
import { CachedResource } from './cached.interface';

export class CachedImage implements CachedResource {
	public loaded: boolean = false;
	public loading: boolean = false;
	public loadingObservable: Observable<HTMLImageElement> = null;

	public image: HTMLImageElement;

	public loadResource(imgUrl: string) {
		this.image = new Image();
		this.image.src = imgUrl;
		this.loadingObservable = Observable.create((x: any) => this.createObservable(x));
		return this.loadingObservable;
	}

	private createObservable(observer: any) {
		let self = this;
		self.loading = true;
		this.image.onload = function() {
			self.loaded = true;
			self.loading = false;
			observer.next(this);
			observer.complete();
		};
		this.image.onerror = function(err) {
			self.loading = false;
			observer.error(err);
		};
	}

}
