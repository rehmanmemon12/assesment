import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-appointment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.scss'
})
export class BookAppointment {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<BookAppointment>);
  private data = inject(MAT_DIALOG_DATA);
  
  
  appointmentForm: FormGroup;
  
  constructor() {
    let date = new Date('2025-07-02T00:55');
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      birthDate: ['', Validators.required],
      patientId: ['', Validators.required],
      appointmentType: ['', Validators.required],
      visitReason: ['', Validators.required],
      status: ['luonnos', Validators.required],
      doctor: ['Tuomas Veikko Kerola'],
      appointmentDateTime: ['2025-07-02T00:55'],
      additionalInfo: []
    });
  }

  onSubmit() {
    console.log('Appointment created:', this.appointmentForm.value);
    if (this.appointmentForm.valid) {
      console.log('Appointment created:', this.appointmentForm.value);
      // Handle form submission
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
