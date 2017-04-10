import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the DettaglioCliente page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dettaglio-cliente',
  templateUrl: 'dettaglio-cliente.html'
})
export class DettaglioClientePage {

  idCliente: string
  cliente: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {

  	this.idCliente = navParams.get('idCliente')
  	this.cliente = this.af.database.object('/clienti/'+this.idCliente+'/datiPersonali');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DettaglioClientePage');
  }

}
