import {Injectable} from "@angular/core";
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpClient,
} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import { v4 as uuidv4 } from "uuid";
import {IProduct} from "../interfaces/product";

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {

    // по умолчанию список продуктов
    private _productJsonPath = "assets/products.json";

    constructor(private http: HttpClient) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.handleRequests(req, next);
    }

    /**
     * Handle request's and support with mock data.
     * @param req
     * @param next
     */
    handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
        const {url, method} = req;

        if (url.endsWith("/products") && method === "GET") {
            req = req.clone({
                url: this._productJsonPath,
            });
            return next.handle(req).pipe(delay(500));
        }

        if (url.endsWith("/products") && method === "POST") {
            const {body} = req.clone();
            body.id = uuidv4();
            return of(new HttpResponse({status: 200, body})).pipe(delay(500));
        }

        if (url.endsWith("/products") && method === "PUT") {
            const {body} = req.clone();
            return of(new HttpResponse({status: 200, body})).pipe(delay(500));
        }

        if (url.match(/\/products\/.*/) && method === "DELETE") {
            const prodId = this.getProductId(url);
            return of(new HttpResponse({status: 200, body: prodId})).pipe(
                delay(500)
            );
        }

        return next.handle(req);
    }

    /**
     * Получает uuid из url
     * @param url
     */
    getProductId(url: any) {
        const urlValues = url.split("/");
        return urlValues[urlValues.length - 1];
    }
}

export let backendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendHttpInterceptor,
    multi: true,
};
