import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  upload() {
    const fd = new FormData();
    /*fd.append('image', this.selectedFile, this.selectedFile.name);*/
    this.http.post('https://curiosity-97ecf.firebaseio.com/posts/add', this.selectedFile).subscribe(res => {
      console.log(res);
    })
  }
/*  loader(e) {
    let file = e;
    let show = "<span> Selected file: <span>" + file
    let output = document.getElementById("selector");

    output.innerHTML = show;
    output.classList.add("active");
    let fileInput = document.getElementById("file");
    fileInput.addEventListener("change", file);

  }*/

/*  var loader = function (e) {
    let file = e.targets.files;
    let show = "<span> Selected file: <span>" + file[0].na

    let output = document.getElementById("selector");
    output.innerHTML = show;
    output.classList.add("active");
};

let fileInput = document.getElementById("file");
fileInput.addEventListener("change", loader);

*/
}
