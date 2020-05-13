import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'unit' })
export class UnitPipe implements PipeTransform {
  transform(
    value: number,
    system: MeasurementSystem,
    measurement: Measurement
  ): number {
    return system === 'Imperial' ? value : this.convertToMetric(value, measurement);
  }

  private convertToMetric(value: number, measurement: Measurement): number {
    switch (measurement) {
      case 'distance':
        return Math.round(value * 1.609344);
      case 'mass':
        return Math.round(value * 0.4535924);
      case 'torque':
        return Math.round(value * 1.35582);
      case 'power':
        return Math.round(value * 0.7456999);
      default:
        return -1;
    }
  }
}

export type MeasurementSystem = 'Imperial' | 'Metric';

export type Measurement = 'distance' | 'mass' | 'torque' | 'power';
