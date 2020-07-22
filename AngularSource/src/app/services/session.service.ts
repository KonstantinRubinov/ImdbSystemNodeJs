import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public constructor(private logger: LogService){}

  public storeSession(key, data) {
    this.logger.debug("store sessionStorage store: ", data);
    sessionStorage.setItem(key, JSON.stringify(data));
    this.logger.debug("contentData: ", data);
  }

  public retrieveSession(key) {
    this.logger.debug("get sessionStorage: ", key);
    let storedToken: any = sessionStorage.getItem(key);
    if (storedToken) {
      this.logger.debug("storedToken: ", storedToken);
      storedToken = JSON.parse(storedToken);}
    
    return storedToken;
  }
}
