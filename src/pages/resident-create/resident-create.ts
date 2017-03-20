import { FormBuilder, Validators } from '@angular/forms';
import { TerritoryData } from './../../providers/territory-data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-resident-create',
  templateUrl: 'resident-create.html'
})
export class ResidentCreatePage {

  public newResidentForm;
  public territoryId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public territoryData: TerritoryData, public formBuilder: FormBuilder) {

    this.territoryId = this.navParams.get('territoryId');

    this.newResidentForm = formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', Validators.required],
      floor: ['',],
      npa: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  createResident(){
    if (!this.newResidentForm.valid){
      console.log(this.newResidentForm.value);
    } else {
      this.territoryData.createResident(
        this.territoryId,
        this.newResidentForm.value.name, 
        this.newResidentForm.value.address,
        this.newResidentForm.value.number,
        this.newResidentForm.value.floor,
        this.newResidentForm.value.npa,
        this.newResidentForm.value.location
        ).then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }

}
