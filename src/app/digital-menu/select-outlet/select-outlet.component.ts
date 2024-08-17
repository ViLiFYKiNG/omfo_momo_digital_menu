import { Component, input } from '@angular/core';

@Component({
  selector: 'app-select-outlet',
  standalone: true,
  imports: [],
  templateUrl: './select-outlet.component.html',
  styleUrl: './select-outlet.component.scss',
})
export class SelectOutletComponent {
  outlet = input.required<string>();
}
