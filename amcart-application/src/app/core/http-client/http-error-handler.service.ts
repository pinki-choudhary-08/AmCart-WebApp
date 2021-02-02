import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorHandlerService {

  constructor() {
  }

  public handleException(error: any, errorInfo: string): void {
    error.message = `Error message : ${error.message}. More Error Info: ${errorInfo}`;
    // TODO add logger
  }

}
