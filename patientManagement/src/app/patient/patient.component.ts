import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  patients: any = [];
  isAdmin: boolean = false; // Set this based on user type
  filterCriteria:String = "all";
  filterValue:String = "";
 
  newPatient: Patient = { name: '', disease: '', doc: '', stage: '' };

  constructor(private patientService: PatientService) {}
  ngOnInit(): void {
    this.loadPatients();
  }

 

  toggle():void{
      this.isAdmin= !this.isAdmin;
  }
  loadPatients(): void {
    this.patientService.getPatients().subscribe((patients) => {
      this.patients = patients;
      console.log(patients);
    });
  }

  addPatient(): void {
    // You may want to perform validation before adding the patient
    this.patientService.addPatient(this.newPatient).subscribe(
      (data) =>{
        console.log(data);
        this.loadPatients();
      },
      (error)=>{
        console.log(error);
      }
    )
   this.loadPatients(); // Refresh the patient list
    this.newPatient = { name: '', disease: '', doc: '', stage: '' }; // Clear the form
  }

  deletePat(id:String):void{
    this.patientService.deletePatient(id).subscribe(
      (data)=>{
        
        console.log(data)
        this.loadPatients();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.loadPatients();
  }

  // Inside your component class
filterPatients(): void {
  if (this.filterCriteria === 'all') {
    this.loadPatients(); // Load all patients
  } else {
    // Make an API call based on the selected filter
    const apiEndpoint = `http://localhost:8080/patients/${this.filterCriteria}/${this.filterValue}`;
    this.patientService.getFilteredPatients(apiEndpoint).subscribe((filteredPatients) => {
      console.log(filteredPatients)
      if (Array.isArray(filteredPatients)) {
        this.patients = filteredPatients;
      } else {
        // If not an array, wrap it in an array
        this.patients = [filteredPatients];
      }

    });
  }
}
  // Implement other methods for CRUD operations
}
