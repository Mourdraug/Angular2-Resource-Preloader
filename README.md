# Angular2-Resource-Preloader
Small Angular2 module I made for preloading images to cache.
So far it only supports loading images, but this functionality may be extended in future.

### Installation
    npm install angular2-resource-preloader
    
### Usage
Usage is pretty straightforward, import PreloaderModule in for example root module:
```javascript
@NgModule({
	imports:      [ BrowserModule, PreloadModule ],
	...
	bootstrap:    [ RootComponent ]
})
export class RootModule { }
```
Preload module will register ResourceProvider service available in application through DI. You can then request single image like so:
```javascript
constructor(private resourceProvider: ResourceProvider) { }
loadAmazingDuck() {
	this.resourceProvider.getImage('./duck.png').subscribe((img: HTMLImageElement) => console.log('loaded amazing duck image from: ' + img.src));
}
```
ResourceProvider.getImage(string) method returns rxjs Observable type, which will push HTMLImageElement type to all subscribing Observers, note that if image is already cached, operation is synchronous, but if not, it is pushed asychronously when onLoad event of HTMLImageElement occurs.

It is also possible to load whole bunch of images at once:
```javascript
private preloadImgs: string[] = ['./duck.png', './cat.png', 'dog.png'];

constructor(private resourceProvider: ResourceProvider) {}

loadAllListedResources() {
	console.log('Preloading Resources');
	this.resourceProvider.preloadImages(this.preloadImgs).subscribe((img: HTMLImageElement) => this.preloadImage(img), (err: Error) => this.preloadError(err), () => this.preloadComplete());
}
preloadImage(image: HTMLImageElement) {
	console.log(image.src + ' loaded!');
}

preloadError(err: Error) {
	console.log('Preload Error!' + err);
}

preloadComplete() {
	console.log('Preload Complete!');
}
```
Loading multiple images is done through concatMap, that means loading is not done in any particular order.

### TODO
- Proper Documentation
- Loading in order
