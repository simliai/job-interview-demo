import toast from 'react-hot-toast';
import ToastCoreAPI from './ToastCoreAPI';

class ToastAPI extends ToastCoreAPI {
  static success(message: string) {
    toast.success(message);
  }

  static showComplex(title: string, description: string) {
    return this.coreShowComplex(title, description);
  }

  static showSimple(message: string) {
    return this.coreShowSimple(message);
  }

  static showComplexPrefilled = () => {
    const title = 'Still under construction';
    const description = 'Hey! This button is still under construction.';
    return this.showComplex(title, description);
  };

  static showSuccessOrFailedFiftyFifty = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve('Saved');
          } else {
            reject('Could not save');
          }
        }, 1000);
      }),
      {
        loading: 'Verifying...',
        success: <b>Email verified!</b>,
        error: <b>Could not save.</b>,
      }
    );
  };
}

export default ToastAPI;
