import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import { DettaglioOrdinePage } from '../dettaglio-ordine/dettaglio-ordine'
import { DettaglioClientePage } from '../dettaglio-cliente/dettaglio-cliente'



/*
  Generated class for the Consegne page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consegne',
  templateUrl: 'consegne.html'
})
export class ConsegnePage {

  idUser: string
  idMezzo: string
  //consegne: FirebaseListObservable<any>;
  consegne: Observable<any[]>;

  constructor(public alertCtrl: AlertController, public af: AngularFire,public navCtrl: NavController, public navParams: NavParams) {

  	this.idUser = navParams.get('idUser')
    this.idMezzo = navParams.get('idMezzo')
  	this.consegne = af.database.list('/consegna', { query: { orderByChild: 'idMezzo', equalTo: this.idMezzo}})
           .map(consegne => {
            consegne.map(consegna => {
                consegna.cliente = this.af.database.object('/clienti/'+consegna.idCliente+'/datiPersonali');
                consegna.mezzo = this.af.database.object('/mezzi/'+consegna.idMezzo);
                consegna.ordine = this.af.database.object('/ordini/'+consegna.$key);
                consegna.ordineRistoranti = this.af.database.list('/consegna', { query: { orderByChild: 'idOrdine', equalTo: consegna.$key}})

            });
          return consegne;
          });
         this.consegne.subscribe(res => console.log(res))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsegnePage');
  }

  apriDettaglioOrdine(idOrdine){
      console.log(idOrdine)
      this.navCtrl.push(DettaglioOrdinePage, { idOrdine:idOrdine });
  }

  apriDettaglioCliente(idCliente){
     console.log(idCliente)
     this.navCtrl.push(DettaglioClientePage, { idCliente:idCliente });
  }

}
