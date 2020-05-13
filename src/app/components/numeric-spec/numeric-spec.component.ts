import { Component, Input } from '@angular/core';
import { Measurement, MeasurementSystem } from '../../pipes/unit.pipe';

@Component({
  selector: 'app-numeric-spec',
  templateUrl: './numeric-spec.component.html',
  styleUrls: ['./numeric-spec.component.scss']
})
export class NumericSpecComponent {

  @Input()
  label: string;

  @Input()
  system: MeasurementSystem;

  @Input()
  measurement: Measurement;

  @Input()
  value: number;

  @Input()
  imperialUnit: string;

  @Input()
  metricUnit: string;
}
