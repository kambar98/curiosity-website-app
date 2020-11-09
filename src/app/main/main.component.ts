import { Component, OnInit } from '@angular/core';
import { AddService } from '../add/add.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  imageList: any[];
  rowIndexArray: any[];


  constructor(private service: AddService) { }

  ngOnInit() {
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      }
    );
  }

}
