import { TerritoryData } from './../../providers/territory-data';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-territory-detail',
  templateUrl: 'territory-detail.html'
})
export class TerritoryDetailPage {

  public updateTerritoryForm;
  public territoryDetail: FirebaseObjectObservable<any>;
  public territoryId: any;
  public territoryName: string;
  public territoryNumber: string;
  public territoryGroup: string;

  constructor(public navCtrl: NavController, public territoryData: TerritoryData, public formBuilder: FormBuilder, public navParams: NavParams) {

    this.territoryId = this.navParams.get('territoryId');
    this.territoryDetail = this.territoryData.getTerritory(this.territoryId);
    this.territoryDetail.subscribe(snapshot => {
      this.territoryName = snapshot.name
      this.territoryNumber = snapshot.number
      this.territoryGroup = snapshot.group
    });

    this.updateTerritoryForm = formBuilder.group({
      name: [this.territoryName, Validators.required],
      number: [this.territoryNumber, Validators.required],
      group: [this.territoryGroup, Validators.required]
    });
  }

  // Function to update the specific territory
  modifyTerritory(){
    if (!this.updateTerritoryForm.valid){
      console.log(this.updateTerritoryForm.value);
    } else {
      this.territoryData.updateTerritory(this.territoryId, this.updateTerritoryForm.value.name, this.updateTerritoryForm.value.number, this.updateTerritoryForm.value.group).then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }
}
