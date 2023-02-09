import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Products } from './products';
 
export const selectProducts = createFeatureSelector<Products[]>('myproducts');

export const selectProductById = (productId: number) =>
  createSelector(selectProducts, (products: Products[]) => {
    var productbyId = products.filter((_) => _.id == productId);
    if (productbyId.length == 0) {
      return null;
    }
    return productbyId[0];
});