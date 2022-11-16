export class PatientModel {
  Id: number | undefined;
  Name: string | undefined;
  Age: number | undefined;
  CheckIn: string | undefined;
  Sex: string | undefined;
}

export class PatientHistoryModel {
  Id: number | undefined;
  Height: string | undefined;
  Weight: number | undefined;
  Smoking: string | undefined;
  Alcohol: string | undefined;
  PatientHistoryId: number | undefined;
  BMI: number | undefined;
}
