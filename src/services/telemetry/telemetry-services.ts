import { UserAttendanceRequest } from "./user-attendance";

export interface TelemetryService {

    markAttendance(userData: UserAttendanceRequest): Promise<string>;

}