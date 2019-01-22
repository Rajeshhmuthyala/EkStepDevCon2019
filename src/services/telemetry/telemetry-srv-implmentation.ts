import { TelemetryService } from "./telemetry-services";
import { UserAttendanceRequest } from "./user-attendance";

export class TelemetryServiceImpl implements TelemetryService {
    markAttendance(userData :UserAttendanceRequest): Promise<string> {
        throw new Error('To be implemented');
    }
}