import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spinner',
  imports: [
    MatProgressSpinner,
  ],
  templateUrl: './app-spinner.html',
})
export class AppSpinner {

}
