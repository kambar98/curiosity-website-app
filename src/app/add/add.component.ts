import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AddService} from './add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

  constructor(private storage: AngularFireStorage, private service: AddService) {}

  ngOnInit() {
    this.service.getImageDetailList();
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `posty/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.service.insertImageDetails(formValue);
              this.resetForm();
            });
          }),
        )
        .subscribe();
    }
  }
  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
    });
    this.imgSrc = '/assets/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
