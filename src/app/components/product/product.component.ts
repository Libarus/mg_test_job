import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../interfaces/product";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    isLoading = false;
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.getAllProductsFromServer();
    }

    /**
     * Получает все продукты из .json файла первый раз
     */
    private getAllProductsFromServer() {
        this.isLoading = true;
        if (this.productService.products.length <= 0) {
            this.productService.getAllProducts().subscribe({
                next: (resp) => {
                    if (resp.status == 200) {
                        this.products = resp.body as IProduct[];
                        this.productService.products = this.products;
                    }
                },
                error: (e) => console.error("Ошибка получения всех продуктов " + e),
                complete: () => this.isLoading = false
            });
        } else {
            this.products = this.productService.products;
            this.isLoading = false;
        }
    }

    /**
     * Удаляет продукт по ID
     * @param prodId
     */
    delete(prodId: string) {

        let result = confirm('Удалить?');

        if (result) {
            this.isLoading = true;
            this.productService.deleteProduct(prodId).subscribe({
                next: (resp) => {
                    if (resp.status == 200) {
                        const productId = resp.body as string;
                        this.products = this.products.filter(item => item.id != productId);
                        this.productService.products = this.products;
                    }
                },
                error: (e) => console.error("Ошибка получения всех продуктов " + e),
                complete: () => this.isLoading = false
            });
        }
    }
}
