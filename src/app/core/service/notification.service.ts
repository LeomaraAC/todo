import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {Alert} from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController,
              private alertController: AlertController) {
  }

  async toast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    await toast.present();
  }

  async alertConfirm(dados: Alert) {
    const alert = await this.alertController.create({
      header: dados.titulo,
      message: dados.mensagem,
      buttons: [
        {
          text: dados.txtBtnCancelar,
          role: 'cancel'
        },
        {
          text: dados.txtBtnConfirmar,
          handler: dados.acaoBtnConfirmar
        }
      ]
    });

    await alert.present();
  }
}
