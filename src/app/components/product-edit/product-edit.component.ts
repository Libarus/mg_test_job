import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-product-edit',
    templateUrl: './../product-add/product-add.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    productId = "";
    title = 'Редактирование';
    isLoading = false;
    form = new FormGroup({});
    numberFloatRegEx = /^[-+]?[0-9]*[.,]?[0-9]+(?:[eE][-+]?[0-9]+)?$/;
    numberIntRegEx = /^-?(0|[1-9]\d*)?$/;

    constructor(
        private aRoute: ActivatedRoute,
        private productService: ProductService,
        private router: Router) {
    }

    ngOnInit(): void {
        if (this.productService.products.length <= 0)
            this.router.navigate(['/product']);

        this.isLoading = true;
        this.form.addControl('name', new FormControl('', Validators.required));
        this.form.addControl('price', new FormControl(0, [Validators.required, Validators.pattern(this.numberFloatRegEx)]));
        this.form.addControl('volume', new FormControl(0, [Validators.required, Validators.pattern(this.numberFloatRegEx)]));
        this.form.addControl('unit', new FormControl('', Validators.required));
        this.form.addControl('quantity', new FormControl(0, [Validators.required, Validators.pattern(this.numberIntRegEx)]));
        this.form.addControl('is_published', new FormControl(false));

        this.aRoute.params.subscribe((params: Params) => {

            if (params.hasOwnProperty('productId')) {
                this.productId = params['productId'];

                const prod = this.productService.products.filter(item => item.id == this.productId)[0];

                this.name?.setValue(prod.name);
                this.price?.setValue(prod.price);
                this.volume?.setValue(prod.volume);
                this.unit?.setValue(prod.unit);
                this.quantity?.setValue(prod.quantity);
                this.is_published?.setValue(prod.is_published);

                this.isLoading = false;
            } else {
                this.router.navigate(['/product']);
            }
        });

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

        let product = this.form.value
        product.id = this.productId;

        this.isLoading = true;

        this.productService.updateProduct(product).subscribe({
            next: (resp) => {
                if (resp.status == 200) {
                    console.info(resp.body);
                    const products = this.productService.products.map(item => {
                        if (item.id != resp.body.id) {
                            return item;
                        }
                        return resp.body;
                    });
                    this.productService.products = products;
                    console.info(this.productService.products);
                    this.router.navigate(['/product']).then();
                }
            },
            error: (err) => console.error("Ошибка обновления новой продукции " + err),
            complete: () => (this.isLoading = false)
        });
    }

}
