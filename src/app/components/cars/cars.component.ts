import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from '../../models/car.model';
import { CarsService } from '../../services/cars.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  dataSource: MatTableDataSource<Car> = new MatTableDataSource();

  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  displayColumns = [
    'year',
    'make',
    'model',
    'country',
    'styling',
    'acceleration',
    'handling',
    'fun_factor',
    'cool_factor',
    'weekend_total',
    'features',
    'comfort',
    'quality',
    'practicality',
    'value',
    'daily_total',
    'dougscore',
    'details'
  ];

  constructor(private readonly carsService: CarsService) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe((cars: Car[]) => {
      this.dataSource.data = cars;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
