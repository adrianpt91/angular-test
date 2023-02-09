import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Products } from '../store/products';
import { invokeUpdateProductAPI } from '../store/products.action';
import { selectProductById } from '../store/products.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  productForm: FormGroup = new FormGroup('')

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectProductById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.productForm = this.fb.group({
          id: [data.id],
          name: [data.name, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú ]+$')])],
          serial_number: [data.serial_number, Validators.compose([Validators.required,
          Validators.pattern('^[A-Za-z0-9]+'), Validators.maxLength(8), Validators.minLength(8)])],
          price: [data.price, Validators.compose([Validators.pattern('^[0-9]+(.[0-9]{0,1})?$'), Validators.min(100), Validators.max(500)])]      
        });
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.productForm.controls;
  }

  update() {
    this.store.dispatch(
      invokeUpdateProductAPI({ updateProduct: { ...this.productForm.value } })
    );
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
