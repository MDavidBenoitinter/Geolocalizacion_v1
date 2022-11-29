import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
// import {ApiService} from 'src/app/services/api.service';
import { Plugins }  from '@capacitor/core';
const {Geolocation} = Plugins;
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  locations:any=[];
  location = localStorage.getItem("location");
  locationSearched:any;
  locationSelected:any;
  coords:any;

  constructor(
    private modal: ModalController,
    private apiService: ApiService,
    private translateService: TranslateModule, 
    private nativeGeocoder: NativeGeocoder,
    public alertController: AlertController,
    ) {

    }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  closeModal(){
    this.modal.dismiss();
  }
  
  async locate(){
    const coordinates = await this.Geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    console.log("Coords: ", this.coords)
    this.getCity(this.coords.latitude, this.coords.longitude)
  }

  getCity(latitude: number, longitude: number){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
    .then((result: NativeGeocoderResult[]) => 
    this.saveCity(result))
    .catch((error:any)=>
    this.presentAlert1());
    
  }

  saveCity(result){
    console.log(JSON.stringify(result[0].locality))
    this.cityFounded(JSON.stringify(result[0].locality))
  }

}


