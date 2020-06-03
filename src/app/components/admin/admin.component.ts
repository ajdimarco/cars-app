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
  submitErrorMessages: string[];
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
        Validators.min(1900),
        Validators.max(2030),
        Validators.pattern(/^\d+$/)
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
        zero_to_sixty_mph: [
          undefined,
          Validators.compose([Validators.min(0.01), Validators.max(100)]),
        ],
        top_speed_mph: [
          undefined,
          Validators.compose([Validators.min(0.01), Validators.max(330)]),
        ],
        horsepower: [
          undefined,
          Validators.compose([Validators.min(0.01), Validators.max(4000)]),
        ],
        torque_lb_ft: [
          undefined,
          Validators.compose([Validators.min(0.01), Validators.max(4000)]),
        ],
      }),
      engine: this.fb.group({
        type: [undefined],
        layout: [undefined],
        displacement_liters: [
          undefined,
          Validators.compose([Validators.min(0), Validators.max(20)]),
        ],
        aspiration: [undefined],
        fuel: [undefined],
      }),
      transmission: this.fb.group({
        type: [undefined],
        gears: [
          undefined,
          Validators.compose([Validators.min(1), Validators.max(20), Validators.pattern(/^\d+$/)]),
        ],
      }),
      drive_type: [undefined],
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
    this.submitSuccess = false;
    this.submitError = false;
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
        console.log(error?.error?.message);
      }
    );
  }
}
