import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { HomePage } from '../home/home'

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';

  constructor(public navCtrl: NavController, public auth:Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    if(this.showLogin) {
      console.log('process login');

      if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Errore di registrazione', 
          subTitle:'Tutti i campi sono obbligatori',
          buttons:['OK']
        });
        alert.present();
        return;
      }     

      let loader = this.loadingCtrl.create({
        content: "Autenticazione..."
      });
      loader.present();
      
      this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
        console.log('ok i guess?');
        loader.dismissAll();
        this.navCtrl.setRoot(HomePage);        
      }, (err) => {
        loader.dismissAll();
        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email non valida.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password obbligatoria.<br/>';

        let alert = this.alertCtrl.create({
          title:'Errore di login', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    } else {
      this.showLogin = true;
    }
  }

  doRegister() {
    if(!this.showLogin) {
      console.log('process register');

      /*
      do our own initial validation
      */
      if(this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Errore di registrazione', 
          subTitle:'Tutti i campi sono obbligatori',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
      console.log(details);
      
      let loader = this.loadingCtrl.create({
        content: "Registrazione del tuo account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        console.log('ok signup');
        this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(HomePage);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email obbligatoria.<br/>';
          if(e === 'required_password') errors += 'Password obbligatoria.<br/>';
          if(e === 'conflict_email') errors += 'Un utente con questa mail è già presente.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Indirizzo mail non valido.';
        }
        let alert = this.alertCtrl.create({
          title:'Errore di registrazione', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
     
    } else {
      this.showLogin = false;
    }
  }
}