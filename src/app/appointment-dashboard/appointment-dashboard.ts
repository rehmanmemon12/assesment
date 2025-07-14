import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule  } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {BookAppointment} from '../book-appointment/book-appointment';
import {HeaderService} from '../Service/header.service';
import {Subscription} from 'rxjs';
import {MatIcon} from '@angular/material/icon';

interface Patient {
  id: string;
  name: string;
  socialSecurityNumber: string;
}

interface Appointment {
  id: string;
  time: string;
  doctor: string;
  department: string;
  patient: Patient;
  type: 'etävastaanotto' | 'vastaanotto' | 'hoitopuhelu' | 'konsultaatio';
  status: 'scheduled' | 'in-progress' | 'completed';
  description?: string; // Add description field
}

@Component({
  selector: 'app-appointment-dashboard',
  imports: [CommonModule, MatIcon, FormsModule],
  templateUrl: './appointment-dashboard.html',
  styleUrl: './appointment-dashboard.scss'
})
export class AppointmentDashboard implements OnInit, OnDestroy {

  private readonly sub: Subscription[] = [];
  private readonly dialog = inject(MatDialog);
  private readonly headerService = inject(HeaderService);

  searchPatientValue = signal('');
  
  // Track expanded appointments
  expandedAppointments = signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.loadPatients('today');
    this.sub.push(
    this.headerService.searchAction$.subscribe((data: any) => {
      this.searchFromHeader(data);
    }));
  }

  appointments = signal<Appointment[]>([
    {
      id: '1',
      time: '09:00 AM',
      doctor: 'Juha Lahtinen',
      patient: {
        id: '240545-123Y',
        name: 'Juha Lahtinen',
        socialSecurityNumber: '240545-123Y'
      },
      department: 'Helsinki Hospital, Cardiology Department',
      type: 'etävastaanotto',
      status: 'scheduled',
      description: 'Initial cardiology consultation for chest pain evaluation. Patient reports intermittent chest discomfort over the past month.'
    },
    {
      id: '2',
      time: '09:45 AM',
      doctor: 'Kaarina Mäkinen',
      patient: {
        id: '210637-963A',
        name: 'Kaarina Mäkinen',
        socialSecurityNumber: '210637-963A'
      },
      department: 'Helsinki Hospital, Cardiology Department',
      type: 'etävastaanotto',
      status: 'scheduled',
      description: 'Follow-up appointment for hypertension management. Review of medication effectiveness and blood pressure monitoring results.'
    },
    {
      id: '3',
      time: '10:30 AM',
      doctor: 'Antti Virtanen',
      patient: {
        id: '060526-741B',
        name: 'Antti Virtanen',
        socialSecurityNumber: '060526-741B'
      },
      department: 'Helsinki Hospital, Cardiology Department',
      type: 'vastaanotto',
      status: 'in-progress',
      description: 'Comprehensive cardiac assessment including ECG review and discussion of lifestyle modifications for heart health.'
    },
    {
      id: '4',
      time: '11:15 AM',
      doctor: 'Mari Hiltenen',
      patient: {
        id: '060526-741B',
        name: 'Mari Hiltenen',
        socialSecurityNumber: '060526-741B'
      },
      department: 'Helsinki Hospital, Cardiology Department',
      type: 'hoitopuhelu',
      status: 'scheduled',
      description: 'Post-procedure check-up following cardiac catheterization. Discuss recovery progress and next steps in treatment plan.'
    },
    {
      id: '5',
      time: '01:00 PM',
      doctor: 'Petri Niemi',
      patient: {
        id: '060526-741B',
        name: 'Petri Niemi',
        socialSecurityNumber: '060526-741B'
      },
      department: 'Helsinki Hospital, Cardiology Department',
      type: 'konsultaatio',
      status: 'scheduled',
      description: 'Specialist consultation for arrhythmia concerns. Review of recent Holter monitor results and treatment options.'
    },
    {
      id: '6',
      time: '02:15 PM',
      doctor: 'Laura Leppänen',
      patient: {
        id: '151139-258D',
        name: 'Laura Leppänen',
        socialSecurityNumber: '151139-258D'
      },
      department: 'Helsinki Hospital, Cardiology Department',
      type: 'etävastaanotto',
      status: 'scheduled',
      description: 'Preventive cardiology consultation for risk assessment. Family history of heart disease evaluation and preventive care planning.'
    }
  ]);

  // Store original data
  private readonly originalPatients = signal<any[]>([]);
  
  // Current displayed patients
  latestPatients = signal<any[]>([]);
  
  loadPatients(date: string) {
    console.log('Loading patients for:', date);

    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const tomorrow = new Date(today.setDate(today.getDate() + 1));

    const patients = [];

    if (date === 'today') {
      patients.push({ id: '240545-123Y', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '240545-123Y', date: today.toISOString().split('T')[0] });
      patients.push({ id: '010132-123Y', name: 'Juhani Korhonen', socialSecurityNumber: '010132-123Y', date: today.toISOString().split('T')[0] });
      patients.push({ id: '150242-456K', name: 'Riikka Mäkelä', socialSecurityNumber: '150242-456K', date: today.toISOString().split('T')[0] });
      patients.push({ id: '300630-789P', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '300630-789P', date: today.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: today.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: today.toISOString().split('T')[0] });
    }

    if (date === 'yesterday') {
      patients.push({ id: '240545-123Y', name: 'Tuo Veikko Kerola', socialSecurityNumber: '240545-123Y', date: yesterday.toISOString().split('T')[0] });
      patients.push({ id: '010132-123Y', name: 'Juhani Korhonen', socialSecurityNumber: '010132-123Y', date: yesterday.toISOString().split('T')[0] });
      patients.push({ id: '150242-456K', name: 'Riikka Mäkelä', socialSecurityNumber: '150242-456K', date: yesterday.toISOString().split('T')[0] });
      patients.push({ id: '300630-789P', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '300630-789P', date: yesterday.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: yesterday.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: yesterday.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: yesterday.toISOString().split('T')[0] });
    }

    if (date === 'tomorrow') {
      patients.push({ id: '240545-123Y', name: 'Tuomas Veko Kerola', socialSecurityNumber: '240545-123Y', date: tomorrow.toISOString().split('T')[0] });
      patients.push({ id: '010132-123Y', name: 'Juhani Korhonen', socialSecurityNumber: '010132-123Y', date: tomorrow.toISOString().split('T')[0] });
      patients.push({ id: '150242-456K', name: 'Riikka Mäkelä', socialSecurityNumber: '150242-456K', date: tomorrow.toISOString().split('T')[0] });
      patients.push({ id: '300630-789P', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '300630-789P', date: tomorrow.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: tomorrow.toISOString().split('T')[0] });
      patients.push({ id: '010141-321N', name: 'Aino Salminen', socialSecurityNumber: '010141-321N', date: tomorrow.toISOString().split('T')[0] }); 
    }
    
    this.originalPatients.set(patients);
    this.latestPatients.set(patients);
  }

  loadAppointments(date: string) {
    console.log('Loading appointments for:', date);

    const appointments = [];

    if (date === 'today') {
      appointments.push({ 
        id: '1', 
        time: '09:00 AM', 
        doctor: 'Juha Lahtinen', 
        patient: { id: '240545-123Y', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '240545-123Y' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Initial cardiology consultation for chest pain evaluation. Patient reports intermittent chest discomfort over the past month.'
      });
      appointments.push({ 
        id: '2', 
        time: '09:45 AM', 
        doctor: 'Kaarina Mäkinen', 
        patient: { id: '210637-963A', name: 'Kaarina Mäkinen', socialSecurityNumber: '210637-963A' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Follow-up appointment for hypertension management. Review of medication effectiveness and blood pressure monitoring results.'
      });
      appointments.push({ 
        id: '3', 
        time: '10:30 AM', 
        doctor: 'Antti Virtanen', 
        patient: { id: '060526-741B', name: 'Antti Virtanen', socialSecurityNumber: '060526-741B' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'vastaanotto', 
        status: 'in-progress',
        description: 'Comprehensive cardiac assessment including ECG review and discussion of lifestyle modifications for heart health.'
      });
      appointments.push({ 
        id: '4', 
        time: '11:15 AM', 
        doctor: 'Mari Hiltenen', 
        patient: { id: '060526-741B', name: 'Mari Hiltenen', socialSecurityNumber: '060526-741B' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'hoitopuhelu', 
        status: 'scheduled',
        description: 'Post-procedure check-up following cardiac catheterization. Discuss recovery progress and next steps in treatment plan.'
      });
      appointments.push({ 
        id: '5', 
        time: '01:00 PM', 
        doctor: 'Petri Niemi', 
        patient: { id: '060526-741B', name: 'Petri Niemi', socialSecurityNumber: '060526-741B' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'konsultaatio', 
        status: 'scheduled',
        description: 'Specialist consultation for arrhythmia concerns. Review of recent Holter monitor results and treatment options.'
      });
      appointments.push({ 
        id: '6', 
        time: '02:15 PM', 
        doctor: 'Laura Leppänen', 
        patient: { id: '151139-258D', name: 'Laura Leppänen', socialSecurityNumber: '151139-258D' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Preventive cardiology consultation for risk assessment. Family history of heart disease evaluation and preventive care planning.'
      });
    }

    if (date === 'yesterday') {
      appointments.push({ 
        id: '1', 
        time: '09:00 AM', 
        doctor: 'Juha Lahtinen', 
        patient: { id: '240545-123Y', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '240545-123Y' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Previous day consultation for cardiac evaluation. Patient follow-up for ongoing treatment plan.'
      });
      appointments.push({ 
        id: '2', 
        time: '09:45 AM', 
        doctor: 'Kaarina Mäkinen', 
        patient: { id: '210637-963A', name: 'Kaarina Mäkinen', socialSecurityNumber: '210637-963A' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Yesterday\'s appointment for medication review and blood pressure monitoring assessment.'
      });
      appointments.push({ 
        id: '3', 
        time: '10:30 AM', 
        doctor: 'Antti Virtanen', 
        patient: { id: '060526-741B', name: 'Antti Virtanen', socialSecurityNumber: '060526-741B' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'vastaanotto', 
        status: 'in-progress',
        description: 'Yesterday\'s cardiac assessment and lifestyle counseling session.'
      });
      appointments.push({ 
        id: '4', 
        time: '11:15 AM', 
        doctor: 'Mari Hiltenen', 
        patient: { id: '060526-741B', name: 'Mari Hiltenen', socialSecurityNumber: '060526-741B' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'hoitopuhelu', 
        status: 'scheduled',
        description: 'Yesterday\'s post-procedure follow-up and recovery assessment.'
      });
      appointments.push({ 
        id: '5', 
        time: '01:00 PM', 
        doctor: 'Petri Niemi', 
        patient: { id: '060526-741B', name: 'Petri Niemi', socialSecurityNumber: '060526-741B' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'konsultaatio', 
        status: 'scheduled',
        description: 'Yesterday\'s specialist consultation for arrhythmia management.'
      });
      appointments.push({ 
        id: '6', 
        time: '02:15 PM', 
        doctor: 'Laura Leppänen', 
        patient: { id: '151139-258D', name: 'Laura Leppänen', socialSecurityNumber: '151139-258D' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Yesterday\'s preventive cardiology consultation and risk assessment.'
      });
    }

    if (date === 'tomorrow') {
      appointments.push({ 
        id: '1', 
        time: '09:00 AM', 
        doctor: 'Juha Lahtinen', 
        patient: { id: '240545-123Y', name: 'Tuomas Veikko Kerola', socialSecurityNumber: '240545-123Y' }, 
        department: 'Helsinki Hospital, Cardiology Department', 
        type: 'etävastaanotto', 
        status: 'scheduled',
        description: 'Tomorrow\'s scheduled cardiac consultation for comprehensive evaluation and treatment planning.'
      });
    }

    this.appointments.set(appointments as Appointment[]);
  }

  quickActions = [
    { icon: '🏥', label: 'Hospital' },
    { icon: '🧪', label: 'Laboratory' },
    { icon: '📄', label: 'Certificates' },
    { icon: '📋', label: 'Prescriptions' },
    { icon: '🏃', label: 'Imaging' },
    { icon: '💊', label: 'Medicine list' }
  ];

  getAppointmentTypeLabel(type: string): string {
    switch (type) {
      case 'etävastaanotto': return 'Remote appointment';
      case 'vastaanotto': return 'Appointment';
      case 'hoitopuhelu': return 'Home visit';
      case 'konsultaatio': return 'Consultation';
      default: return type;
    }
  }

  openRemoteAppointment(appointmentId: string) {
    console.log('Opening remote appointment:', appointmentId);

    this.dialog.open(BookAppointment, {
      width: '600px',
      height: '600px',
      data: {
        appointmentId: appointmentId
      }
    });
  }

  searchFromHeader(data: any) {

    console.log('Search data:', data);
    if (data?.searchValue?.length > 0) {
      let filteredAppointments = this.appointments().filter(appointment => appointment.patient.name?.toLowerCase().includes(data.searchValue?.toLowerCase()));
      this.appointments.set(filteredAppointments);
    } else {
      this.appointments.set(this.appointments());
    }
  }

  openPatient(patientId: string) {
    console.log('Opening patient:', patientId);
  }

  visitPatient(patientId: string) {
    console.log('Visiting patient:', patientId);
  }

  ngOnDestroy() {
    this.sub.forEach(x => x.unsubscribe());
  }

  searchPatient(searchValue: string) {
    console.log('Search patient:', searchValue);
    if (searchValue) {
      let patients = this.originalPatients(); // Use original data
      let filteredPatients = patients.filter(patient => 
        patient.name?.toLowerCase().includes(searchValue?.toLowerCase()) || 
        patient.socialSecurityNumber?.toLowerCase().includes(searchValue?.toLowerCase())
      );
      this.latestPatients.set(filteredPatients);
    } else {
      this.latestPatients.set(this.originalPatients()); // Restore original data
    }
  }

  clearSearch() {
    this.searchPatientValue.set('');
    this.latestPatients.set(this.originalPatients()); // Restore original data
  }

  // Toggle appointment description visibility
  toggleAppointmentDescription(appointmentId: string) {
    const expanded = this.expandedAppointments();
    const newExpanded = new Set(expanded);
    
    if (newExpanded.has(appointmentId)) {
      newExpanded.delete(appointmentId);
    } else {
      newExpanded.add(appointmentId);
    }
    
    this.expandedAppointments.set(newExpanded);
  }

  // Check if appointment is expanded
  isAppointmentExpanded(appointmentId: string): boolean {
    return this.expandedAppointments().has(appointmentId);
  }
}
