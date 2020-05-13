import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarInput } from '../models/car-input.model';

@Injectable()
export class CarsService {
  constructor(private http: HttpClient) {}

  public getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:3000/cars');
  }

  public getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`http://localhost:3000/cars/${id}`);
  }

  public createCar(car: CarInput): Observable<any> {
    return this.http.post('http://localhost:3000/cars', car, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    });
  }
}
