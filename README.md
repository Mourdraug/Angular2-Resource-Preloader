# Angular2-Resource-Preloader
Small Angular2 module I made for preloading images to cache.
So far it only supports loading images, but this functionality may be extended in future.

#Installation
    npm install angular2-resource-preloader
    
#Usage
Usage is pretty straightforward, import PreloaderModule in for example root module:
    @NgModule({
      imports:      [ BrowserModule, PreloadModule ],
      ...
      bootstrap:    [ RootComponent ]
    })
    export class RootModule { }

Preload module will register ResourceProvider service available in application through DI. You can then request single image like so:
    constructor(private resourceProvider: ResourceProvider) { }
    loadAmazingDuck() {
      this.resourceProvider.getImage('./duck.png').subscribe((img: HTMLImageElement) => console.log('loaded amazing duck image from: ' + img.src));
    }
