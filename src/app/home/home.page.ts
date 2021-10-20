import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController) {
    this.startTemporizador();
  }

  cData: string = "20/9/2021";
  cHora: number = 21;
  cMinuto: number = 29;
  cSegundo: number = 0;

  segundo: number = 0;
  minuto: number = 0;
  hora: number = 0;
  data: string = "";

  intervalo;

  startTemporizador()
  {

    this.intervalo = setInterval(() => {

      const dataAtual = new Date();
      this.segundo = dataAtual.getSeconds();
      this.minuto = dataAtual.getMinutes();
      this.hora = dataAtual.getHours();

      this.data = dataAtual.getDate() + "/"
      + (dataAtual.getMonth() + 1) + "/"
      + dataAtual.getFullYear();

      if(this.cData == "20/9/2021"){
        if(this.cHora == this.hora){
          if(this.cMinuto == this.minuto){
            if(this.cSegundo == this.segundo){
              this.presentAlert();
            }
          }
        }
      }
    }, 1000);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      subHeader: 'Ta na hora de acordar!',
      message: 'Já são: ' + this.hora + ":" + this.minuto + ":" + this.segundo,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role); 
  }

}
