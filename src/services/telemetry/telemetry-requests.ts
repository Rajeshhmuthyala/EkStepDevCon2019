interface BaseTelemetryRequest {
    eid: string;
    visitorId: string;
    visitorName: string;
}

export interface RegisterTelemetry extends BaseTelemetryRequest {
    edata: any;
}

export interface AttendanceTelemetry extends BaseTelemetryRequest {
    stallId: string;
    stallName: string;
}

export interface BuyIdeaTelemetry extends BaseTelemetryRequest {
    stallId: string;
    stallName: string;
    ideaId: string;
    ideaName: string;
    edata: any;
}

export interface FeedbackTelemetry extends BaseTelemetryRequest {
    stallId: string;
    stallName: string;
    ideaId: string;
    ideaName: string;
    edata: any;
}