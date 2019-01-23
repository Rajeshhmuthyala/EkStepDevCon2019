import {StallService} from './stall-service';
import {Inject, Injectable} from '@angular/core';
import {Stall} from './Stall';
import {GetIdeasRequest, GetStallsRequest} from './requests';
import {GetIdeasResponse} from './responses';
import {AppConfig} from '../../config/AppConfig';
import {ApiHandlerService} from '../api/api-handler-service';

@Injectable()
export class StallServicesImpl implements StallService {
    private static GET_STALLS_ENDPOINT = '/search';
    private static GET_IDEAS_ENDPOINT = '/read-dev';

    constructor(private apiHandler: ApiHandlerService,
                @Inject('APP_CONFIG') private appConfig: AppConfig) {
    }

    getStalls(getStallsRequest: GetStallsRequest): Promise<Stall[]> {
        const url = this.appConfig.baseUrl + StallServicesImpl.GET_STALLS_ENDPOINT;

        const body = {
            id: "open-saber.registry.search",
            request: getStallsRequest
        };

        return this.apiHandler.handle(url, body);
    }

    getIdeas(getIdeasRequest: GetIdeasRequest): Promise<GetIdeasResponse> {
        const url = this.appConfig.baseUrl + StallServicesImpl.GET_IDEAS_ENDPOINT;

        const body = {
            id: "open-saber.registry.read",
            request: getIdeasRequest
        };

        return this.apiHandler.handle(url, body);
    }
}