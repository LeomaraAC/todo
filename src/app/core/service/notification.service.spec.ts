import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Alert} from '../models/alert.model';
import {notificationReturn} from '../tests/mocks';

const BTN_CANCELAR = 0;
const BTN_CONFIRMAR = 1;

describe('NotificationService', () => {
    let service: NotificationService;
    let alertControllerSpy: jasmine.SpyObj<AlertController>;
    let toastControllerSpy: jasmine.SpyObj<ToastController>;

    beforeEach(() => {
        const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
        const toastSpy = jasmine.createSpyObj('ToastController', ['create']);

        TestBed.configureTestingModule({
            providers: [
                {provide: AlertController, useValue: alertSpy}
            ]
        });

        service = TestBed.inject(NotificationService);
        alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
        toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;

        alertControllerSpy.create.and.returnValue(notificationReturn);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Deve exibir um alert ao chamar o método "alert"', () => {
        const alert = new Alert();
        alert.titulo = 'Teste!';
        alert.acaoBtnConfirmar = () => { };
        service.alertConfirm(alert);

        expect(alertControllerSpy.create).toHaveBeenCalled();
        expect(alertControllerSpy.create.calls.count()).toBe(1);
    });

    it('Deve chamar a callback fornecida ao confirmar o alert', () => {
        let confirmou = false;
        const alert = new Alert();
        alert.titulo = 'Teste!';
        alert.acaoBtnConfirmar = () => confirmou = true;
        service.alertConfirm(alert);

        const btnConfirmar: any = alertControllerSpy.create.calls.first().args[0].buttons[BTN_CONFIRMAR];
        btnConfirmar.handler();
        expect(confirmou).toBe(true);
    });
});
