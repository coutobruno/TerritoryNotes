import { VisitListPage } from './../visit-list/visit-list';
import { ResidentDetailPage } from './../resident-detail/resident-detail';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ResidentCreatePage } from './../resident-create/resident-create';
import { TerritoryData } from '../../providers/territory-data';
import { Component } from '@angular/core';
import { ActionSheetController, NavController, Platform, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-resident-list',
  templateUrl: 'resident-list.html'
})
export class ResidentListPage {

  public residentsList: any;
  public territoryId: any;
  public territoryDetail: any;
  public territoryNumber: string;
  public residentId: any;
  public visitsList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public territoryData: TerritoryData, public actionCtrl: ActionSheetController, public alertCtrl: AlertController) {

    this.territoryId = this.navParams.get('territoryId');
    this.residentsList = this.territoryData.getResidentsList(this.territoryId);
    this.territoryDetail = this.territoryData.getTerritory(this.territoryId);
    this.territoryDetail.subscribe(snapshot => {
      this.territoryNumber = snapshot.number
      console.log(snapshot);
    });

  }

  // Add new resident to the territory
  addResident(territoryId: string): void {
    this.navCtrl.push(ResidentCreatePage, { territoryId: territoryId });
  }

  // Show specific Resident Visits
  showResidentVisits(residentId): void {
    let territoryId = this.territoryId;
    this.navCtrl.push(VisitListPage, { territoryId, residentId });
  }

  // Show more resident option
  moreResidentOption(residentId: string) {
    let action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Visitas',
          icon: !this.platform.is('ios') ? 'person' : null,
          handler: () => {
            this.navCtrl.push(VisitListPage, { territoryId: this.territoryId, residentId: residentId });
          }
        },
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(ResidentDetailPage, { territoryId: this.territoryId, residentId: residentId });
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Remover o morador !',
              subTitle: 'Deseja remover o morador e todas as suas visitas ?',
              buttons: [
                {
                  text: 'Remover',
                  role: 'destructive',
                  handler: () => {
                    this.territoryData.removeResident(this.territoryId, residentId);
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
