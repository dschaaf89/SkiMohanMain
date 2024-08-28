export interface BillboardData {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Program {
  id: string;
  name: string;
  billboard: BillboardData;
  imageUrl: string;
};

export interface Type {
  id: string;
  name: string;
  value: string;
};

export interface Image {
  id: string;
  url: string;
}


export interface Product {
  id: string;
  program: Program;
  name: string;
  price: string;
 quantity:number;
  isFeatured: boolean;
  type: Type;
  images: Image[]
};

export interface Instructor {
  UniqueID: string;
  NAME_FIRST: string;
  NAME_LAST: string;
  HOME_TEL: string;
  C_TEL: string;
  BRTHD: Date;
  AGE?: number;
  E_mail_main: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
  ZIP: string;
  STATUS?: string;
  COMMENTS?: string;
  PSIA?: string;
  prevYear?: string;
  dateReg?: string;
  dateConfirmed?: string;
  emailCommunication?: boolean;
  InstructorType?: string;
  AASI?: string;
  testScore?: string;
  ParentAuth?: boolean;
  OverNightLodge?: boolean;
  ageRequestByStaff?: string[];
  clinics?: string[];
  clinicInstructor?: boolean;
  Supervisor?: boolean;
  skiLevel?: string;
  boardLevel?: string;
  skiMinAge?: string;
  skiMaxAge?: string;
  boardMinAge?: string;
  boardMaxAge?: string;
  married?: boolean;
  spouseName?: string;
  resume?: string;
  instructorCom?: string;
  noteToInstructor?: string;
  priority?: string;
  dateAssigned?: string;
  assignmentConfirmed?: string;
  classSignedUp?: string;
  classAssigned?: string;
  permSub?: boolean;
  back2Back?: boolean;
  classPerWeek?: string;
  updateAt: Date;
  dateTimes?: string;
  classTimeIds?: number[];
  employeeNumber?: string;
  payRate?: string;
  deductions?: string;
  payCheckNo?: string;
  payCheckDate?: string;
  payAdvance?: string;
  payComment?: string;
  ssn?: string;
  payType?: string;
  dateFeePaid?: string;
  disclosureForm?: boolean;
  i9Form?: boolean;
  w4Recieved?: boolean;
  WSPRecieved?: boolean;
  testRecieved?: boolean;
  idRecieved?: boolean;
  schoolPermission?: boolean;
  WSPDate?: string;
}
