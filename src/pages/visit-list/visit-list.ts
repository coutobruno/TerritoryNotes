import { AlertController } from 'ionic-angular';
import { VisitDetailPage } from './../visit-detail/visit-detail';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public territoryData: TerritoryData, public actionCtrl: ActionSheetController, public platform: Platform,
              public alertCtrl: AlertController) {

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

  // Show more resident option
  moreVisitOption(visitId: string) {
    let action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(VisitDetailPage, { territoryId: this.territoryId, residentId: this.residentId, visitId: visitId });
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Remover a visita !',
              subTitle: 'Desejas remover esta visita ?',
              buttons: [
                {
                  text: 'Remover',
                  role: 'destructive',
                  handler: () => {
                    this.territoryData.removeVisit(this.territoryId, this.residentId, visitId);
                  }
                },
                {
                  text: 'Cancelar',
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          }
        }
      ]
    });
    action.present();
  }
}
