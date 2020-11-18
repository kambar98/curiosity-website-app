import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AddService } from '../../add/add.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];
  imageDetailList: AngularFireList<any>;

  constructor(private service: AddService, private storage: AngularFireStorage, private firebase: AngularFireDatabase) { }


  ngOnInit() {
    this.service.getImageDetailList();

    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {

        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length))).keys());
      }
    );
  }

}

