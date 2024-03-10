import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImagesService } from 'src/app/services/images.service';
import { ProfilePageService } from 'src/app/services/profile-page.service';
import { MyNursesService } from 'src/app/services/my-nurses.service';
import { AccountService } from 'src/app/services/account.service';
import { ProfilePageInfo } from 'src/app/models/ProfilePageInfo';
import { ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  uploadForm: FormGroup;
  profilePageInfo: ProfilePageInfo;
  selectedFile: File = null;
  imageUrl: string;
  @ViewChild('croppingModal') croppingModal: any;
  modalRef: NgbModalRef;
  editMode: boolean= false;
  
  constructor(private fb: FormBuilder, private router: Router, private imageService: ImagesService,
    private profileService: ProfilePageService, private accountService: AccountService,
    private modalService: NgbModal) {

      this.profilePageInfo = {
        imageUrl: '',
        email: '',
        firstName: '',
        lastName: '',
      };
    
      this.uploadForm = this.fb.group({
      avatar: [null],
      price:['Setează prețul consultație tale', Validators.required],
    });
  }


  enableEditMode(){
    this.editMode=true;
  }
  
  ngOnInit(): void {
    this.imageService.getImageUrlByUserId(this.accountService.userId).subscribe((url: string) => {
      this.profilePageInfo = {
        imageUrl: url,
        email: this.accountService.email,
        firstName: this.accountService.firstName,
        lastName: this.accountService.lastName
      }
    });
  }

  onSelectFile(e) {
    this.selectedFile = (e.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      avatar: this.selectedFile,
    });

    this.uploadForm.get('avatar').updateValueAndValidity();

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const blob = this.dataURLtoBlob(dataUrl);
        const imageUrl = URL.createObjectURL(blob);
        this.imageUrl = imageUrl;
        this.profilePageInfo.imageUrl = imageUrl;
        

        this.openCroppingModal();
      };
      
      reader.readAsDataURL(this.selectedFile);
    }
    
  }
  
  dataURLtoBlob(dataURL: string): Blob {
    
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  

  onImageCropped(event: ImageCroppedEvent) {
    const croppedImage = event.base64;
    const modalClosedPromise = new Promise((resolve) => {
      this.modalRef.result.then(
        (result) => {
          resolve(result);
        },
        () => {
          resolve('close');
        }
      );
    });

    modalClosedPromise.then((result) => {
      if (result === 'crop') {
        this.profilePageInfo.imageUrl = croppedImage;        
        this.imageUrl = croppedImage;
      }
    });
  }

  openCroppingModal() {
    this.modalRef = this.modalService.open(this.croppingModal, {
      ariaLabelledBy: 'modal-title',
      backdrop: 'static',
      keyboard: false,
    });
  }

  closeCroppingModal() {
    this.modalRef.dismiss();
  }
  
  onSubmit(): void {
    if (this.selectedFile == null) {
      this.backToHome();
      return;
    }
    
    const blob = this.dataURLtoBlob(this.profilePageInfo.imageUrl);
    const file = new File([blob], 'new-file-name.jpg', { type: blob.type });
    this.profileService.uploadImageFileByEntity(file, this.accountService.userId).subscribe(
      () => {
        this.imageService.getImageUrlByUserId(this.accountService.userId).subscribe((url: string) => {
          this.profilePageInfo.imageUrl = url;
          this.imageUrl=url;
          this.backToHome();
        });
    });
}

  imgChangeEvt: any = '';
  cropImgPreview: any = '';

  backToHome() {
    this.router.navigate(['../home']).then(() => {
      window.location.reload();
    });
  }

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
  }

  imgLoad() { }
  initCropper() { }
  imgFailed() { }

}
