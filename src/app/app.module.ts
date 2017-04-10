import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ConsegnePage } from '../pages/consegne/consegne'
import { DettaglioOrdinePage } from '../pages/dettaglio-ordine/dettaglio-ordine'
import { LoginPage } from '../pages/login/login'
import { MyTrackerPage } from '../pages/my-tracker/my-tracker'
import { DettaglioClientePage } from '../pages/dettaglio-cliente/dettaglio-cliente'
import { LocationTracker } from '../providers/location-tracker';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';





export const firebaseConfig = {
  apiKey: 'AIzaSyAD1ZodtGDUmPIZUI7e_leAERDjh80jNKc',
  authDomain: 'speeats.firebaseapp.com',
  databaseURL: 'https://speeats.firebaseio.com',
  storageBucket: 'speeats.appspot.com',
  messagingSenderId: '955979856036'
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b3a52b25'
  }
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ConsegnePage,
    LoginPage,
    DettaglioOrdinePage,
    DettaglioClientePage,
    MyTrackerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ConsegnePage,
    LoginPage,
    DettaglioOrdinePage,
    DettaglioClientePage,
    MyTrackerPage
  ],
  providers: [
    LocationTracker,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
