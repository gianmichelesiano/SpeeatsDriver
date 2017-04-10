import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ConsegnePage } from '../consegne/consegne'
import { LoginPage } from '../login/login'
import { User, Auth } from '@ionic/cloud-angular';


import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  mezzoOccupato : boolean= false
  mezzoGuidato: string
  idenMezzo: string
  mezzi: FirebaseListObservable<any>;
  mezziDisponibili: FirebaseListObservable<any>;
  mezziUtente: FirebaseListObservable<any>;
  mezzo: FirebaseObjectObservable<any>;
  constructor(public user: User, private auth:Auth, public af: AngularFire, public navCtrl: NavController) {


  	if(!this.auth.isAuthenticated()) {
        this.navCtrl.setRoot(LoginPage)
    } 
    



    this.mezziDisponibili = af.database.list('/mezzi', 
        { query: { orderByChild: 'disponibile', equalTo: true}})
    console.log("fuori")




/*         this.mezzi.subscribe( res => {
             console.log(res)
             if (res.lenght>0) {
               console.log(res.$key)
               console.log("dentro")
               //this.mezzoOccupato = true
             } else {
                      this.mezziDisponibili = af.database.list('/mezzi', 
                             { query: { orderByChild: 'disponibile', equalTo: true}})
                      console.log("fuori")
             }
    })
*/




  }

  itemSelected(idMezzo){
  	console.log(idMezzo)
  	//item.update({disponibile:true})
  	this.mezzo = this.af.database.object('mezzi/'+idMezzo)
    this.mezzoOccupato = true
    this.idenMezzo = idMezzo 
    this.mezzo.subscribe( res => {
      console.log(res)
      this.mezzoGuidato = res.nome
    })
  	this.mezzo.update({disponibile:false, idUser:this.user.id})
  	//this.navCtrl.setRoot(ConsegnePage, {idMezzo:idMezzo, idUser:this.user.id});  


  }

  abbandona(idenMezzo){
    console.log("idenMezzo")
    console.log(idenMezzo)
    this.mezzo = this.af.database.object('mezzi/'+idenMezzo)
    this.mezzo.update({disponibile:true, idUser:''})
    this.mezzoOccupato = false
   
  }

  logout(){
    this.auth.logout();
  }

}
