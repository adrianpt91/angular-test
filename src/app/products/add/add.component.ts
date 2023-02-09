import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Products } from '../store/products';
import { invokeSaveNewProductAPI } from '../store/products.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  productForm: Products = {
    id: 0,
    name: '',
    serial_number: '',
    price: 0,
  };

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    this.store.dispatch(invokeSaveNewProductAPI({ newProduct: this.productForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/']);
      }
    });
  }

}
