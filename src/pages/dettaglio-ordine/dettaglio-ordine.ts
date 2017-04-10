import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';

/*
  Generated class for the DettaglioOrdine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dettaglio-ordine',
  templateUrl: 'dettaglio-ordine.html'
})
export class DettaglioOrdinePage {

  idOrdine: string
  listaordineDettaglio: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

  	this.idOrdine = navParams.get('idOrdine')
    this.listaordineDettaglio = af.database.list('/ordiniRistoranti', {
                      query: {
                        orderByChild: 'idOrdine',
                        equalTo: this.idOrdine
                      }
                    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DettaglioOrdinePage');
  }

  cambiaRitirato(itemId, ritirato, idOrdine){
        let totale = 1
        console.log(itemId, ritirato, idOrdine)
        ritirato = !ritirato
        let updateOrdineRistorante = this.af.database.object('ordiniRistoranti/'+itemId);
        updateOrdineRistorante.update({ ritirato: ritirato }).then(() =>{
          let ordiniRistorantiTotale = this.af.database.list('/ordiniRistoranti', { query: { orderByChild: 'idOrdine', equalTo: idOrdine}});
          ordiniRistorantiTotale.subscribe(snapshots => {
                  snapshots.forEach(snapshot => {
                       let itemInterno = 0
                       if (snapshot.ritirato==1){
                                itemInterno = 1
                       }
                       totale = totale*itemInterno
                  }) // fine foreach
                  console.log(totale)
                  let updateOrdine = this.af.database.object('ordini/'+idOrdine)
                  if (totale == 1){
                      updateOrdine.update({stato:2})

                  } else {
                      updateOrdine.update({stato:1})
                  }
          })//fine susc
        })// fine update   
  } // fine funzione

}
