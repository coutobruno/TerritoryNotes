import { TerritoryData } from './../../providers/territory-data';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePicker } from 'ionic-native';

@Component({
  selector: 'page-visit-create',
  templateUrl: 'visit-create.html'
})
export class VisitCreatePage {

  public newVisitForm;
  public territoryId: string;
  public residentId: string;
  public date: any;
  public time: any;
  public datetime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public territoryData: TerritoryData, public formBuilder: FormBuilder) {

    this.territoryId = this.navParams.get('territoryId');
    this.residentId = this.navParams.get('residentId');
    this.time = new Date().getHours;
    this.date = new Date().setHours(this.time + 1);
    this.datetime = new Date().toISOString();
    //this.date.toISOString();
    //this.date = new Date().toISOString();
    //this.date.setHours(this.time + 1);

    this.newVisitForm = formBuilder.group({
      date: [this.datetime, Validators.required],
      result: ['', Validators.required],
      remarks: ['']
    });
  }

  createVisit() {
    if (!this.newVisitForm.valid) {
      console.log(this.newVisitForm.value);
    } else {
      this.territoryData.createVisit(this.territoryId, this.residentId, this.newVisitForm.value.date, this.newVisitForm.value.result, this.newVisitForm.value.remarks).then(() => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }
}
