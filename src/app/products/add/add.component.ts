import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  productForm: FormGroup = this.fb.group({
    id: 0,
    name: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú ]+$')])],
    serial_number: ['', Validators.compose([Validators.required,
    Validators.pattern('^[A-Za-z0-9]+'), Validators.maxLength(8), Validators.minLength(8)])],
    price: [0, Validators.compose([Validators.pattern('^[0-9]+(.[0-9]{0,1})?$'), Validators.min(100), Validators.max(500)])]      
  });

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.productForm.controls;
  }

  save(value: Products) {
    this.store.dispatch(invokeSaveNewProductAPI({ newProduct: value }));
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
