import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import { CarInput } from '../../models/car-input.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  submitSuccess: boolean;
  submitError: boolean;
  submittedMake: string;
  submittedModel: string;

  carForm = this.fb.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/^19\d{2}$|^20[012]\d$/),
      ]),
    ],
    country: ['', Validators.required],
    styling: ['', Validators.required],
    acceleration: ['', Validators.required],
    handling: ['', Validators.required],
    fun_factor: ['', Validators.required],
    cool_factor: ['', Validators.required],
    features: ['', Validators.required],
    comfort: ['', Validators.required],
    quality: ['', Validators.required],
    practicality: ['', Validators.required],
    value: ['', Validators.required],
  });

  weekend_categories: string[] = [
    'styling',
    'acceleration',
    'handling',
    'fun_factor',
    'cool_factor'
  ];
  daily_categories: string[] = [
    'features',
    'comfort',
    'quality',
    'practicality',
    'value'
  ];

  constructor(private fb: FormBuilder, private carsService: CarsService) {}

  ngOnInit(): void {
    this.submitSuccess = false;
    this.submitError = false;
    this.submittedMake = '';
    this.submittedModel = '';
  }

  public getRatingRange(): number[] {
    return [...Array(10).keys()].map((i) => i + 1);
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.warn(this.carForm.value);
    this.carsService.createCar(this.carForm.value as CarInput).subscribe(response => {
      this.submitSuccess = true;
      this.submittedMake = this.carForm.value.make;
      this.submittedModel = this.carForm.value.model;
      formDirective.resetForm();
      this.carForm.reset();
      console.log(response);

    },
    error => {
      this.submitError = true;
      console.log(error);
    });
  }
}
