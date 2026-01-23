import { Component, signal } from '@angular/core';
import { ItemsComponent } from './components/items/items.component';

@Component({
  selector: 'app-root',
  imports: [ItemsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
