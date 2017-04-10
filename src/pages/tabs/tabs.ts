import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ConsegnePage } from '../consegne/consegne';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MyTrackerPage } from '../my-tracker/my-tracker';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ConsegnePage;
  tab3Root: any = ContactPage;
  tab4Root: any = MyTrackerPage;

  constructor() {

  }
}
