import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { AddService } from './add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  isSubmittedStory: boolean;
  text: any = null;

  constructor(private storage: AngularFireStorage, private service: AddService) {}

  formTemplate: FormGroup;
  storiesTemplate: FormGroup;

  ngOnInit() {


   this.formTemplate = new FormGroup({
      caption: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      /*    likes: new FormControl(''),*/
    });

    this.storiesTemplate = new FormGroup({
      title: new FormControl('', Validators.required),
      storyText: new FormControl('', [Validators.required, Validators.minLength(200)]),
    })

    this.service.getImageDetailList();
    this.resetForm();
    this.service.getstoriesList();
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

  onSend(formValue) {
    this.isSubmitted = true;
    if (this.storiesTemplate.valid) {
      var filePath = `story/${new Date().getTime()}`;
      this.storage
        .upload(filePath, this.text)
        .snapshotChanges()
        .pipe(
          finalize(() => {
              this.service.inserstoriesDetails(formValue);
              this.resetFormStory();
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

  resetFormStory() {
    this.storiesTemplate.reset();
    this.storiesTemplate.setValue({
      title: '',
      storyText: '',

    });
    this.isSubmittedStory = false;
  }
}
