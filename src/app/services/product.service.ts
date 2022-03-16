import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {IProduct} from "../interfaces/product";

@Injectable({
    providedIn: "root",
})
export class ProductService {

    public products: IProduct[] = [];

    constructor(private http: HttpClient) {
    }

    /**
     * Получить все продукты.
     */
    getAllProducts(): Observable<any> {
        return this.http
            .get<any>("http://localhost:4200/products", {observe: "response"})
            .pipe(
                retry(3), // попробовать трижды получить данные
                catchError(ProductService.handleError) // вызвать обработчик ошибки
            );
    }

    /**
     * Добавить новый продукт
     * @param product
     */
    addProduct(product: any): Observable<any> {
        return this.http
            .post<any>("http://localhost:4200/products", product, {
                observe: "response",
            })
            .pipe(catchError(ProductService.handleError));
    }


    /**
     * Получение продукции по ID
     * @param prodId
     */
    getProductById(prodId: string): IProduct {
        return this.products.filter(item => item.id == prodId)[0];
    }

    /**
     * Обновить продукт
     * @param product
     */
    updateProduct(product: IProduct): Observable<any> {
        return this.http
            .put<any>("http://localhost:4200/products", product, {
                observe: "response",
            })
            .pipe(catchError(ProductService.handleError));
    }

    /**
     * Удалить продукт по ID
     * @param prodId
     */
    deleteProduct(prodId: string) {
        return this.http
            .delete<any>("http://localhost:4200/products/" + prodId, {
                observe: "response",
            })
            .pipe(catchError(ProductService.handleError));
    }

    private static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Произошла клиентская или сетевая ошибка.
            console.error("Произошла ошибка:", error.error.message);
        } else {
            // Бэкэнд вернул неверный код ответа.
            console.error(
                `Бэкенд вернул статус: ${error.status}, ` + ` данные: ${error.error}`
            );
        }
        return throwError(() => "Что-то случилось странно. Попробуйте позже.");
    }
}
