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
  public territoryByGroups: any;

  constructor(public navCtrl: NavController, public territoryData: TerritoryData, public actionCtrl: ActionSheetController, public platform: Platform, public alertCtrl: AlertController) {
    this.territoryByGroups = 'Todos';
    this.territoryList = this.territoryData.getTerritoryList();
  }

  // Add new territory
  createTerritory(): void {
    this.navCtrl.push(TerritoryCreatePage);
  }

  // Show specific territory Residents
  showTerritoryResidents(territoryId: string): void {
    this.navCtrl.push(ResidentListPage, { territoryId: territoryId });
  }

  // Filter territories by group
  filterTerritoriesByGroups() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Escolhe o grupo');

    if (this.territoryByGroups == 'Todos')
    {
      alert.addInput({ type: 'radio', label: 'Todos', value: 'Todos', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Todos', value: 'Todos', checked: false });
    }

    if (this.territoryByGroups == 'Fribourg')
    {
      alert.addInput({ type: 'radio', label: 'Fribourg', value: 'Fribourg', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Fribourg', value: 'Fribourg', checked: false });
    }

    if (this.territoryByGroups == 'Fribourg-Norte')
    {
      alert.addInput({ type: 'radio', label: 'Fribourg-Norte', value: 'Fribourg-Norte', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Fribourg-Norte', value: 'Fribourg-Norte', checked: false });
    }

    if (this.territoryByGroups == 'Marly')
    {
      alert.addInput({ type: 'radio', label: 'Marly', value: 'Marly', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Marly', value: 'Marly', checked: false });
    }

    if (this.territoryByGroups == 'Matran')
    {
      alert.addInput({ type: 'radio', label: 'Matran', value: 'Matran', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Matran', value: 'Matran', checked: false });
    }

    if (this.territoryByGroups == 'Morat')
    {
      alert.addInput({ type: 'radio', label: 'Morat', value: 'Morat', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Morat', value: 'Morat', checked: false });
    }

    if (this.territoryByGroups == 'Schönberg')
    {
      alert.addInput({ type: 'radio', label: 'Schönberg', value: 'Schönberg', checked: true });
    } else {
      alert.addInput({ type: 'radio', label: 'Schönberg', value: 'Schönberg', checked: false });
    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.territoryByGroups = data;
        if (data == 'Todos') {
          this.territoryList = this.territoryData.getTerritoryList();
        } else {
          this.territoryList = this.territoryData.getTerritoriesByGroups(data);
        }
      }
    });
    alert.present();
  }

  // Show more App option
  moreAppOption() {
    let action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Aplicativo',
          icon: !this.platform.is('ios') ? 'apps' : null,
          handler: () => {
            let alert = this.alertCtrl.create({
              title: 'Versão do Territory Notes',
              subTitle: '0.2.1',
              buttons: [
                {
                  text: 'Fechar',
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

  // Show more territory option
  moreTerritoryOption(territoryId) {
    let action = this.actionCtrl.create({
      buttons: [
        {
          text: 'Residentes',
          icon: !this.platform.is('ios') ? 'person' : null,
          handler: () => {
            this.navCtrl.push(ResidentListPage, { territoryId: territoryId });
          }
        },
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(TerritoryDetailPage, { territoryId: territoryId });
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
                    if (data.text == 'REMOVER') {
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