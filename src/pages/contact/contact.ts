import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

 @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
 
 constructor(public navCtrl: NavController) {
  }

  ionViewWillEnter() {
   this.loadMap();
  }


  loadMap(){
 
    Geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(latLng)
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(){
 
  Geolocation.getCurrentPosition().then((position) => {
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
   
    let content = "<h4>Information!</h4>";          
   
    this.addInfoWindow(marker, content);

  })


 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}
 
}

