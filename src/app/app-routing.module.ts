import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {ProductComponent} from "./components/product/product.component";
import {HomeComponent} from "./components/home/home.component";
import {ProductAddComponent} from "./components/product-add/product-add.component";
import {ProductEditComponent} from "./components/product-edit/product-edit.component";
import {ProductRemoveComponent} from "./components/product-remove/product-remove.component";

const routes: Routes = [
    {
        path: '', component: AppComponent, children: [
            {path: '', redirectTo: '/', pathMatch: 'full'},
            {path: '', component: HomeComponent},
            {path: 'product', component: ProductComponent},
            {path: 'product/add', component: ProductAddComponent},
            {path: 'product/edit/:productId', component: ProductEditComponent},
            {path: 'product/remove/:productId', component: ProductRemoveComponent},
        ]
    },
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
