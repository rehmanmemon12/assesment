import {Component, EventEmitter, inject, Output, Input, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatMenuItem,
    MatMenuTrigger,
    MatMenu
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly fromBuilder = inject(FormBuilder);


  public searchForm: FormGroup = this.fromBuilder.group({
    searchValue: [''],
  });

  @Input() searchValue: string | null = null;
  @Output() searchResults = new EventEmitter();

  userInfo = signal<{
    name: string;
    role: string;
    clinic: string;
  }>({
    name: 'Tuomas Veikko Kerola',
    role: 'Doctor',
    clinic: 'Clinic'
  });

  searchResult() {
    let rawData = this.searchForm.getRawValue();
    if (rawData.searchValue.length > 0)
      this.searchResults.emit(this.searchForm.getRawValue());
  }

  resetSearch() {
    this.searchForm.controls['searchValue'].setValue('');
    this.searchValue = null;
    this.searchResults.emit('');
  }

  enterPresEvent(){
    this.searchResult();
  }

  onLogout() {
    console.log('onLogout');
  }

  onSettings() {
    console.log('onSettings');
  }

  onAdminPanel() {
    console.log('onAdminPanel');
  }
}
