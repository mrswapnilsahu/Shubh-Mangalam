import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController
  ) { }

  categoryData:any;
  amenityData:any;
  property = {
    name: 'test',
    category: '',
    amenity: '',
    area: '',
    contact: '',
    description: '',
    state: '',
    city: '',
    address: '',
    imgs: ''
  };
  image:any;
  imageName = [];
  imgUploadSpinner = false;
  flag;


  ngOnInit() {
    console.log(this.getCatData());
    console.log(this.getAmenitiesData());
  }

  // Getting all the categories
  async getCatData() {    
    try {
      await this.http.get(environment.API_BASE_URL + 'getCategory.php').subscribe((data:any) => {
        this.categoryData = data;
        console.log('Categories Data: '+JSON.stringify(data));
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Getting all the amenities
  async getAmenitiesData() {    
    try {
      await this.http.get(environment.API_BASE_URL + 'getAmenity.php').subscribe((data:any) => {
        this.amenityData = data;
        console.log('Amenities Data: '+JSON.stringify(data));
      });
    } catch (error) {
      console.log(error);
    }
  }

  saveData() {
    const formData = new FormData();
    formData.append('name', this.property.name);
    formData.append('category', JSON.stringify(this.property.category));
    formData.append('amenity', JSON.stringify(this.property.amenity));
    formData.append('area', this.property.area);
    formData.append('contact', this.property.contact);
    formData.append('description', this.property.description);
    formData.append('state', this.property.state);
    formData.append('city', this.property.city);
    formData.append('address', this.property.address);
    formData.append('user', '1');
    formData.append('image', JSON.stringify(this.imageName));
    console.log(this.property);
    this.http.post(environment.API_BASE_URL + 'listProperty.php', formData).subscribe((data:any) => {
      console.log(data);
      this.presentToast(data.message);      
    });
  }

  upload(str:any){
    this.imgUploadSpinner = true;
    const formData = new FormData();
    this.image=str.target.files[0];
    formData.append('files[]', this.image);
    console.log(formData,this.image);
    this.http.post(environment.API_BASE_URL + 'uploadImage.php',formData)
    .subscribe((data:any)=>{
      console.log(data);
      this.imageName.push(data.imgName);
      console.log(this.imageName);
      this.imgUploadSpinner = false;
      this.flag = "Image uploaded, "
    });
    console.log(str);
    console.log(this.imageName);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: "toast-scheme",
      duration: 2000
    });
    toast.present();
  }

  goToHome() {
    this.router.navigate(['home']);
  }
 
}
