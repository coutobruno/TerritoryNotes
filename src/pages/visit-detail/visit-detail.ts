import { FirebaseObjectObservable } from 'angularfire2';
import { Validators } from '@angular/forms';
import { TerritoryData } from './../../providers/territory-data';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-visit-detail',
  templateUrl: 'visit-detail.html'
})
export class VisitDetailPage {

  public updateVisitForm;
  public territoryId: string;
  public residentId: string;
  public visitId: string;
  public visitDate: string;
  public visitResult: string;
  public visitRemarks: string;
  public VisitDetail: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public territoryData: TerritoryData, public formBuilder: FormBuilder) { 

    this.territoryId = this.navParams.get('territoryId');
    this.residentId = this.navParams.get('residentId');
    this.visitId = this.navParams.get('visitId');

    this.VisitDetail = this.territoryData.getVisit(this.territoryId, this.residentId, this.visitId);
    this.VisitDetail.subscribe(snapshot => {
      this.visitDate = snapshot.date
      this.visitResult = snapshot.result
      this.visitRemarks = snapshot.remarks
    });

    this.updateVisitForm = formBuilder.group({
      date: [this.visitDate, Validators.required],
      result: [this.visitResult, Validators.required],
      remarks: [this.visitRemarks]
    });
  }

  updateVisit(){
    if (!this.updateVisitForm.valid){
      console.log(this.updateVisitForm.value);
    } else {
      this.territoryData.updateVisit(
      this.territoryId,
      this.residentId,
      this.visitId,
      this.updateVisitForm.value.date,
      this.updateVisitForm.value.result,
      this.updateVisitForm.value.remarks
      ).then( () => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    }
  }



}
