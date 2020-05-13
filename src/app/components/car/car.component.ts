import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from '../../models/car.model';
import { CarsService } from '../../services/cars.service';
import { MeasurementSystem } from '../../pipes/unit.pipe';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  car$: Observable<Car>;
  system: MeasurementSystem;

  constructor(
    private readonly carsService: CarsService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.system = 'Imperial';
    this.car$ = this.route.paramMap.pipe(
      switchMap(params => this.carsService.getCarById(params.get('id')))
    );
  }

  changeSystem(event) {
    this.system = event.checked ? 'Metric' : 'Imperial';
  }
}
