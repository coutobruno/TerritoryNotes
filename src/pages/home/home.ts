import { ResidentListPage } from './../resident-list/resident-list';
import { TerritoryDetailPage } from './../territory-detail/territory-detail';
import { TerritoryCreatePage } from './../territory-create/territory-create';
import { TerritoryData } from './../../providers/territory-data';
import { Component } from '@angular/core';
import { ActionSheetController, NavController, Platform, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public territoryList: any;

  constructor(public navCtrl: NavController, public territoryData: TerritoryData, public actionCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController) {

    this.territoryList = this.territoryData.getTerritoryList();
  }

  // Add new territory
  createTerritory(): void {
    this.navCtrl.push(TerritoryCreatePage);
  }

  // Show specific territory Residents
  showTerritoryResidents(territoryId: string): void {
     this.navCtrl.push(ResidentListPage, {territoryId: territoryId});
  }

  // Show more App option
  moreAppOption(){
    let action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Perfil',
          icon: !this.platform.is('ios') ? 'person' : null,
          handler: () => {}
        },{
          text: 'Territory Note',
          icon: !this.platform.is('ios') ? 'apps' : null,
          handler: () => {}
        }
      ]
    });
    action.present();
  }

  // Show more territory option
  moreTerritoryOption(territoryId){
    let action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Residentes',
          icon: !this.platform.is('ios') ? 'person' : null,
          handler: () => {
           this.navCtrl.push(ResidentListPage, {territoryId: territoryId});
          }
        },
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(TerritoryDetailPage, {territoryId: territoryId});
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Remover o território !',
              subTitle: 'Ao remover o território, todos os moradores e visitas associados também serão removidos<br/><br/>Para remover, escreve REMOVER e cliqua no botão Remover !',
              inputs: [
                {
                  name: 'text',
                  placeholder: 'REMOVER'
                }
              ],
              buttons: [
                {
                  text: 'Remover',
                  role: 'destructive',
                  handler: data => {
                    if (data.text == 'REMOVER')
                    {
                      this.territoryData.removeTerritory(territoryId);
                    } else {
                      
                    }
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