import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AddService {
  imageDetailList: AngularFireList<any>;
  storiesList: AngularFireList<any>;


  constructor(private firebase: AngularFireDatabase) {}

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }
  getstoriesList() {
    this.storiesList = this.firebase.list('Stories');
  }

  inserstoriesDetails(storiesDetails) {
    this.storiesList.push(storiesDetails);
  }
}
