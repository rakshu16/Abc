export interface Patient {

    name: string;
    disease: string;
    doc: string;
    stage: string; // Assuming 'stage' can be 'normal', 'severe', or 'critical'
  }