import { Component, OnInit } from '@angular/core';
import {  AngularFireList } from '@angular/fire/database';
import { AddService } from '../../add/add.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  imageList: any[];
  posts: any[];
  imageDetailList: AngularFireList<any>;

  constructor(private service: AddService) { }


  ngOnInit() {
    this.service.getImageDetailList();

    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {

        this.imageList = list.map(item => { return item.payload.val(); });
        this.posts = Array.from(Array(Math.ceil((this.imageList.length))).keys());
      }
    );
  }

}

