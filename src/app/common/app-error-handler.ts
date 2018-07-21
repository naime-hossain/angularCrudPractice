import { ErrorHandler } from "../../../node_modules/@angular/core";


export class AppErrorHandler implements ErrorHandler{
  handleError(error){
    alert('unexpected error occured');
    console.log(error);
  }
}
