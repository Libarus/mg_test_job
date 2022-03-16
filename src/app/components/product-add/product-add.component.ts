import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

    isLoading = false;
    title='Добавление';
    form = new FormGroup({});
    numberFloatRegEx = /^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/;
    numberIntRegEx = /^-?(0|[1-9]\d*)?$/;

    constructor(
        private productService: ProductService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.form.addControl('name', new FormControl('', Validators.required));
        this.form.addControl('price', new FormControl(0, [Validators.required, Validators.pattern(this.numberFloatRegEx)]));
        this.form.addControl('volume', new FormControl(0, [Validators.required, Validators.pattern(this.numberFloatRegEx)]));
        this.form.addControl('unit', new FormControl('', Validators.required));
        this.form.addControl('quantity', new FormControl(0, [Validators.required, Validators.pattern(this.numberIntRegEx)]));
        this.form.addControl('is_published', new FormControl(false));
        this.isLoading = false;
    }

    get name() {
        return this.form.get('name');
    }

    get price() {
        return this.form.get('price');
    }

    get volume() {
        return this.form.get('volume');
    }

    get unit() {
        return this.form.get('unit');
    }

    get quantity() {
        return this.form.get('quantity');
    }

    get is_published() {
        return this.form.get('is_published');
    }

    submit() {
        if (this.form.invalid)
            return;

        console.info(this.form.value);

        this.isLoading = true;

        this.productService.addProduct(this.form.value).subscribe({
            next: (resp) => {
                if (resp.status == 200) {
                    this.productService.products.push(resp.body);
                    this.router.navigate(['/product']).then();
                }
            },
            error: (err) => console.error("Ошибка добавления новой продукции " + err),
            complete: () => (this.isLoading = false)
        });
    }


}
