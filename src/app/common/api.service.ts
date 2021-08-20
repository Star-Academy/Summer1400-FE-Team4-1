import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ApiError extends Error {
    constructor(message: string, code?: number) {
        super(message);
    }
}

@Injectable()
export class ApiService {
    API_URL = 'https://songs.code-star.ir/' as const;

    constructor(private http: HttpClient) {}

    get<T>(path: string): Observable<T> {
        return this.http.get<T>(this.API_URL + path).pipe(catchError(this.handleError<T>()));
    }

    post<T>(path: string, body: any): Observable<T> {
        return this.http
            .post<T>(this.API_URL + path, body, {
                headers: { 'Content-Type': 'application/json' },
            })
            .pipe(catchError(this.handleError<T>()));
    }

    handleError<T>() {
        return (error: any): Observable<T> => {
            console.error(error);
            if (error instanceof HttpErrorResponse && error.status)
                return throwError(new ApiError(error.error.message, error.status));
            return throwError(new ApiError('اشکال در برقراری ارتباط با سرور', undefined));
        };
    }
}
