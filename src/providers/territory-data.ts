import { TerritoryCreatePage } from './../pages/territory-create/territory-create';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class TerritoryData {

  territoryList: FirebaseListObservable<any>;
  territoryDetail: FirebaseObjectObservable<any>;
  residentsList: FirebaseListObservable<any>;
  residentDetail: FirebaseObjectObservable<any>;
  visitsList: FirebaseListObservable<any>;
  visitDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    af.auth.subscribe( auth => {
      if (auth) {
        this.territoryList = af.database.list('/Territory', {
          query: {
            orderByChild: 'number'
          }
        });
        this.userId = auth.uid;
      }
    });
  }

  /*>>>>>>>>>> Territories <<<<<<<<<<*/

  // Get the entire list of territories
  getTerritoryList(){
    return this.territoryList;
  }

  // Get a specific territory
  getTerritory(territoryId: string): FirebaseObjectObservable<any> {
    return this.territoryDetail = this.af.database.object('/Territory/' + territoryId);
  }

  // Add new territory
  createTerritory(name: string, number: string, group: string){
    return this.territoryList.push({name, number, group});
  }

  // Remove a specific territory
  removeTerritory(territoryId: string): any {
    return this.territoryList.remove(territoryId);
  }

  // Update a specific territory
  updateTerritory(territoryId: string, name: string, number: string, group: string): any {
    return this.territoryList.update(territoryId, {name: name, number: number, group: group});
  }

  /*>>>>>>>>>> Residents <<<<<<<<<<*/

  // Get the entire list of residents in the territory
  getResidentsList(territoryId: string): any {
    return this.residentsList = this.af.database.list('/Territory/' + territoryId + '/Residents', {
      query: {
        orderByChild: 'address'
      }
    });
  }

  // Get a specific resident
  getResident(territoryId: string, residentId: string): FirebaseObjectObservable<any> {
    return this.residentDetail = this.af.database.object('/Territory/' + territoryId + '/Residents/' + residentId);
  }

  // Add new resident
  createResident(territoryId: string, name: string, address: string, number: string, floor: string, npa: string, location: string){
    return firebase.database().ref('Territory/' + territoryId + '/Residents')
                              .push({name, address, number, floor, npa, location});
  }

  // Remove a specific resident
  removeResident(territoryId: string, residentId: string): any {
    return firebase.database().ref('Territory/' + territoryId + '/Residents/' + residentId)
                              .remove();
  }

  // update a specific resident
  updateResident(territoryId: string, residentId: string, name: string, address: string, number: string, floor: string, npa: string, location: string): any {
    return firebase.database().ref('Territory/' + territoryId + '/Residents/' + residentId)
                              .update({name, address, number, floor, npa, location});
  }

  /*>>>>>>>>>> Visits <<<<<<<<<<*/

  // Get the entire list of visit for a resident
  getVisitsList(territoryId: string, residentId: string): any {
    this.visitsList = this.af.database.list('/Territory/' + territoryId + '/Residents/' + residentId + '/Visits', {
      query: {
        orderByChild: 'date', 
      }
    });

    return this.visitsList.map(visits => {
      return visits.reverse();
    });
  }

  // Get a specific visit
  getVisit(territoryId: string, residentId: string, visitId: string): FirebaseObjectObservable<any> {
    return this.visitDetail = this.af.database.object('/Territory/' + territoryId + '/Residents/' + residentId + '/Visits/' + visitId);
  }

  // Add new visit
  createVisit(territoryId: string, residentId: string, date: string, result: string, remarks: string){
    return firebase.database().ref('Territory/' + territoryId + '/Residents/' + residentId + '/Visits')
                              .push({date, result, remarks});
  }

  // Remove a specific visit
  removeVisit(territoryId: string, residentId: string, visitId: string): any {
    return firebase.database().ref('Territory/' + territoryId + '/Residents/' + residentId + '/Visits/' + visitId)
                              .remove();
  }

  // update a specific visit
  updateVisit(territoryId: string, residentId: string, visitId: string, date: string, result: string, remarks: string): any {
    return firebase.database().ref('Territory/' + territoryId + '/Residents/' + residentId + '/Visits/' + visitId)
                              .update({date, result, remarks});
  }
}
