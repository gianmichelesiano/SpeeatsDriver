import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/filter';
 
@Injectable()
export class LocationTracker {
 
  trackerList: FirebaseListObservable<any>; 

  

  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
  public lastUpdateTime = new Date();
 
  constructor(public zone: NgZone, public   af: AngularFire) {
 
  }

 
startTracking(tempo, idGuidatore) {
 
  // Background Tracking

  let minFrequency = tempo*1000
  console.log("minFrequency")
  console.log(minFrequency)




 
  let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10, 
    debug: true,
    interval: minFrequency 
  };


 
  // Turn ON the background-geolocation system.
  BackgroundGeolocation.start();

  let options = {
    frequency: minFrequency, 
    enableHighAccuracy: true
  };
 
  this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
    console.log(position);

    let mezzi = this.af.database.list('/tracciamento')
    console.log("ora")

    var now = new Date();

    mezzi.push(position)




 
    // Run update inside of Angular's zone
    this.zone.run(() => {
      var data = Math.floor(Date.now() / 1000)
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(this.lat)
      mezzi.push({
                    idGuidatore:idGuidatore,
                    data:data,
                    lat:this.lat, 
                    lng:this.lng
                  })

    });
 
  });
 

}




 
stopTracking() {
 
  console.log('stopTracking');
 
  BackgroundGeolocation.finish();
  BackgroundGeolocation.stop();
  this.watch.unsubscribe();
 
}
 
}