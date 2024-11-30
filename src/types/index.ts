// login
export interface Login {
  data:    Data;
  error:   null;
  success: boolean;
}

export interface Data {
  accessToken:  string;
  refreshToken: string;
  staffInfo:    StaffInfo;
}

export interface StaffInfo {
  id:        number;
  photo:     string;
  user:      User;
  firstName: string;
  lastName:  string;
  rating:    number;
  isActive:  boolean;
  login:     string;
  staffType: number;
  phone:     string;
}

export interface User {
  id:       number;
  userType: number;
  status:   number;
}

// get all contract
export interface GetAllContract {
  data:    Data1;
  error:   null;
  success: boolean;
}

export interface Data1 {
  contracts: Contract[];
  total:     number;
}

export interface Contract {
  id:         number;
  course:     Course;
  title:      string;
  attachment: Attachment;
  createdAt:  string;
}

export interface Attachment {
  url:      string;
  origName: string;
  size:     number;
}

export interface Course {
  id:        number;
  name:      string;
  createdAt: string;
}

// single contract
export interface SingleContract {
  data:    Data2;
  error:   null;
  success: boolean;
}

export interface Data2 {
  id:         number;
  course:     Course;
  title:      string;
  attachment: Attachment;
  createdAt:  string;
}

export interface Attachment {
  url:      string;
  origName: string;
  size:     number;
}

export interface Course {
  id:        number;
  name:      string;
  createdAt: string;
}

// courses
export interface Courses {
  data:    DataCourses;
  error:   null;
  success: boolean;
}

export interface DataCourses {
  courses: Course[];
  total:   number;
}

export interface Course {
  id:                number;
  name:              string;
  disciplineName:    string;
  disciplineId:      number;
  hasStudyMonths:    boolean;
  hasCurriculum:     boolean;
  createdAt:         string;
  imageIllustration: string;
}

// upload
export interface FileTypes {
  "fileName" : string
  "path" : string
  "size" : number
}

export interface Upload {
  data:    Datum[];
  error:   null;
  success: boolean;
}

export interface Datum {
  path:     string;
  fileName: string;
  size:     number;
}
