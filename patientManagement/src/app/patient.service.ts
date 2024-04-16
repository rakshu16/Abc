import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from './model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private client : HttpClient) { }

  // private patients: Patient[] = [
  //   {  name: 'Patient 1', disease: 'Fever', doc: 'Dr. Smith', stage: 'normal' },
  //   {  name: 'Patient 2', disease: 'COVID-19', doc: 'Dr. Johnson', stage: 'severe' },
  //   // Add more sample patients
  // ];

  private apiurl : String ="http://localhost:8080/patients";


  getPatients(): Observable<any> {
    const url = this.apiurl+"/all"
    return this.client.get(url);
  }
  addPatient(patient: Patient): Observable<any> {
    const url = this.apiurl+"/register"
    return this.client.post(url,patient);
  }
  deletePatient(patientId: String): Observable<any> {
    const url = this.apiurl+"/delete/"+patientId;
    return this.client.delete(url);
  }
  getFilteredPatients(apiEndpoint: string): Observable<any> {
    return this.client.get(apiEndpoint);
  }
  // Implement other CRUD methods as needed
}
