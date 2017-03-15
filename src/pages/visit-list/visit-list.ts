import { VisitCreatePage } from './../visit-create/visit-create';
import { FirebaseListObservable } from 'angularfire2';
import { ResidentCreatePage } from './../resident-create/resident-create';
import { TerritoryData } from '../../providers/territory-data';
import { Component } from '@angular/core';
import { ActionSheetController, NavController, Platform, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-visit-list',
  templateUrl: 'visit-list.html'
})
export class VisitListPage {

  public visitsList: any;
  public residentId: any;
  public territoryId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public territoryData: TerritoryData) {

    this.territoryId = this.navParams.get('territoryId');
    this.residentId = this.navParams.get('residentId');
    this.visitsList = this.territoryData.getVisitsList(this.territoryId, this.residentId);
    
  }

  // Add new visit
  addVisit(): void {
    let territoryId = this.navParams.get('territoryId');
    let residentId = this.navParams.get('residentId');
    this.navCtrl.push(VisitCreatePage, {territoryId, residentId});
  }
}
