import { UserAttendanceRequest } from "./user-attendance";
import { TelemetryService } from "./telemetry-services";

export class TelemetryServiceMock implements TelemetryService {
    public async markAttendance(userData: UserAttendanceRequest): Promise<string> {
        return "Attandance Marked Succefully";
    }
}