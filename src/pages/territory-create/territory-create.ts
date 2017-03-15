import { TerritoryData } from './../../providers/territory-data';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-territory-create',
  templateUrl: 'territory-create.html'
})
export class TerritoryCreatePage {

  public newTerritoryForm: any;

  constructor(public navCtrl: NavController, public territoryData: TerritoryData, public formBuilder: FormBuilder) {

    this.newTerritoryForm = formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  createTerritory(){
    if (!this.newTerritoryForm.valid){
      console.log(this.newTerritoryForm.value);
    } else {
      this.territoryData.createTerritory(this.newTerritoryForm.value.name, this.newTerritoryForm.value.number, this.newTerritoryForm.value.group).then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }
}
