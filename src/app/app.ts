import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { CommonModule } from '@angular/common';
import {HeaderService} from './Service/header.service';
import {SubHeader} from './sub-header/sub-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule, SubHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'assesment';

  protected readonly headerService = inject(HeaderService);

}
