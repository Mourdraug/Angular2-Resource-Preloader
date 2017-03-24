export interface CachedResource {
	loaded: boolean;
	loading: boolean;
	loadingObservable: any;

	loadResource(url: string): any;
}
