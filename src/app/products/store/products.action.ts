import { createAction, props } from "@ngrx/store";
import { Products } from "./products";

export const invokeProductsAPI = createAction(
    '[Products API] Invoke Products Fetch API'
  );
   
export const productsFetchAPISuccess = createAction(
  '[Products API] Fetch API Success',
  props<{ allProducts: Products[] }>()
);

export const invokeSaveNewProductAPI = createAction(
  '[Products API] Inovke save new product api',
  props<{ newProduct: Products }>()
);
 
export const saveNewProductAPISucess = createAction(
  '[Products API] save new product api success',
  props<{ newProduct: Products }>()
);

export const invokeUpdateProductAPI = createAction(
  '[Products API] Inovke update product api',
  props<{ updateProduct: Products }>()
);
 
export const updateProductAPISucess = createAction(
  '[Products API] update  product api success',
  props<{ updateProduct: Products }>()
);

export const invokeDeleteProductAPI = createAction(
  '[Products API] Inovke delete product api',
  props<{id:number}>()
);
 
export const deleteProductAPISuccess = createAction(
  '[Products API] deleted product api success',
  props<{id:number}>()
);