import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductComponent} from './components/product/product.component';
import {backendProvider} from "./interceptors/backend";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './components/home/home.component';
import {ProductAddComponent} from './components/product-add/product-add.component';
import {ProductEditComponent} from './components/product-edit/product-edit.component';
import {ProductRemoveComponent} from './components/product-remove/product-remove.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        ProductComponent,
        HomeComponent,
        ProductAddComponent,
        ProductEditComponent,
        ProductRemoveComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [backendProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
