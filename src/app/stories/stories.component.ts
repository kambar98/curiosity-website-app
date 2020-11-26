import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { AddService } from '../add/add.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: any[];
  posts: any[];
  storiesList: AngularFireList<any>;
  p: number = 1;

  constructor(private service: AddService) { }

  ngOnInit() {
    this.service.getstoriesList();

    this.service.storiesList.snapshotChanges().subscribe((list) => {
      this.stories = list.map((item) => {
        return item.payload.val();
      });
      this.posts = Array.from(Array(Math.ceil(this.stories.length)).keys());
    });
  }
}
