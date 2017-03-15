import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TerritoryData } from './../../providers/territory-data';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-resident-detail',
  templateUrl: 'resident-detail.html'
})
export class ResidentDetailPage {

  public updateResidentForm;
  public residentDetail: FirebaseObjectObservable<any>;
  public territoryId: string;
  public residentId: string;
  public residentName: string;
  public residentAddress: string;
  public residentFloor: string;
  public residentLocation: string;
  public residentNpa: string;
  public residentNumber: string;

  constructor(public navCtrl: NavController, public territoryData: TerritoryData, public formBuilder: FormBuilder, public navParams: NavParams) {

    this.territoryId = this.navParams.get('territoryId');
    this.residentId = this.navParams.get('residentId');

    this.residentDetail = this.territoryData.getResident(this.territoryId, this.residentId);
    this.residentDetail.subscribe(snapshot => {
      this.residentName = snapshot.name
      this.residentAddress = snapshot.address
      this.residentFloor = snapshot.floor
      this.residentLocation = snapshot.location
      this.residentNpa = snapshot.npa
      this.residentNumber = snapshot.number
    });

    this.updateResidentForm = formBuilder.group({
      name: [this.residentName, Validators.required],
      address: [this.residentAddress, Validators.required],
      number: [this.residentNumber, Validators.required],
      floor: [this.residentFloor, Validators.required],
      npa: [this.residentNpa, Validators.required],
      location: [this.residentLocation, Validators.required]
    });
  }

  updateResident(){
    if (!this.updateResidentForm.valid){
      console.log(this.updateResidentForm.value);
    } else {
      this.territoryData.updateResident(
      this.territoryId,
      this.residentId,
      this.updateResidentForm.value.name,
      this.updateResidentForm.value.address,
      this.updateResidentForm.value.number,
      this.updateResidentForm.value.floor,
      this.updateResidentForm.value.npa,
      this.updateResidentForm.value.location
      ).then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }

}
