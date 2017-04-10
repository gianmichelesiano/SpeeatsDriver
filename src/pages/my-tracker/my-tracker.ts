import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import { User, Auth } from '@ionic/cloud-angular';

/*
  Generated class for the MyTracker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-tracker',
  templateUrl: 'my-tracker.html'
})
export class MyTrackerPage {

  idGuidatore:string
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, public user: User, private auth:Auth) {
    this.idGuidatore = this.user.id
    console.log(this.idGuidatore)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTrackerPage');
  }

  start(tempo){
    console.log(tempo)
    this.locationTracker.startTracking(tempo, this.idGuidatore);
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

}
