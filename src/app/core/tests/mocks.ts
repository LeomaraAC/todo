const notificationReturn = Promise.resolve({
    present: (): Promise<void> => {
        return Promise.resolve();
    }
} as HTMLIonAlertElement);

export {
    notificationReturn
};
