import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Action } from 'src/app/redux/action';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private redux:NgRedux<Store>, private logger:LogService) {}

  ngOnInit() {
    //this.retrieveL();
  }

  private retrieveL() {
    this.logger.debug("inside: ", "localstorage");
    let storedToken: any = localStorage.getItem('orders');
    this.logger.debug("storedToken: ", storedToken);
    console.log("storedToken:", storedToken);
    if (!storedToken) throw 'no token found';
    storedToken = JSON.parse(storedToken);
    // const action: Action={type:ActionType.addAllWatchedProduct, payload:storedToken};
    // this.redux.dispatch(action);
    //this.productsService.watchedOrders=storedToken;
  }

}
