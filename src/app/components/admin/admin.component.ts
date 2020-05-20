import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { CarInput } from '../../models/car-input.model';
import {
  aspirationTypes,
  dailyCategories,
  driveTypes,
  engineLayouts,
  engineTypes,
  fuelTypes,
  transmissionTypes,
  weekendCategories,
} from '../../models/car.model';
import { CarsService } from '../../services/cars.service';

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

  weekendCategories: string[];
  dailyCategories: string[];
  engineTypes: string[];
  engineLayouts: string[];
  aspirationTypes: string[];
  fuelTypes: string[];
  transmissionTypes: string[];
  driveTypes: string[];

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
    specs: this.fb.group({
      performance: this.fb.group({
        zero_to_sixty_mph: ['', Validators.pattern(/^\d{0,3}(\.\d+)?$/)],
        top_speed_mph: ['', Validators.pattern(/^\d{0,3}$/)],
        horsepower: ['', Validators.pattern(/^\d{0,4}$/)],
        torque_lb_ft: ['', Validators.pattern(/^\d{0,4}$/)],
      }),
      engine: this.fb.group({
        type: [''],
        layout: [''],
        displacement_liters: ['', Validators.pattern(/^\d{0,2}(\.\d+)?$/)],
        aspiration: [''],
        fuel: [''],
      }),
      transmission: this.fb.group({
        type: [''],
        gears: ['', Validators.pattern(/^\d{0,4}$/)],
      }),
      drive_type: [''],
    }),
  });

  constructor(private fb: FormBuilder, private carsService: CarsService) {}

  ngOnInit(): void {
    this.submitSuccess = false;
    this.submitError = false;
    this.submittedMake = '';
    this.submittedModel = '';

    this.weekendCategories = weekendCategories;
    this.dailyCategories = dailyCategories;
    this.engineTypes = engineTypes;
    this.engineLayouts = engineLayouts;
    this.aspirationTypes = aspirationTypes;
    this.fuelTypes = fuelTypes;
    this.transmissionTypes = transmissionTypes;
    this.driveTypes = driveTypes;
  }

  public getRatingRange(): number[] {
    return [...Array(10).keys()].map((i) => i + 1);
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.warn(this.carForm.value);
    this.carsService.createCar(this.carForm.value as CarInput).subscribe(
      (response) => {
        this.submitSuccess = true;
        this.submittedMake = this.carForm.value.make;
        this.submittedModel = this.carForm.value.model;
        formDirective.resetForm();
        this.carForm.reset();
        console.log(response);
      },
      (error) => {
        this.submitError = true;
        console.log(error);
      }
    );
  }
}
