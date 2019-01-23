import {StallService} from './stall-service';
import {Inject, Injectable} from '@angular/core';
import {Stall} from './Stall';
import {GetIdeasRequest, GetStallsRequest} from './requests';
import {GetIdeasResponse} from './responses';
import {HTTP, HTTPResponse} from '@ionic-native/http';
import {AppConfig} from '../../config/AppConfig';
import {ErrorHandler} from '../api/util/error-handler';

@Injectable()
export class StallServicesImpl implements StallService {
    private static GET_STALLS_ENDPOINT = '/search';
    private static GET_IDEAS_ENDPOINT = '/read-dev';

    constructor(private http: HTTP,
                @Inject('APP_CONFIG') private appConfig: AppConfig) {
    }

    getStalls(getStallsRequest: GetStallsRequest): Promise<Stall[]> {
        return this.http.post(this.appConfig.baseUrl + StallServicesImpl.GET_STALLS_ENDPOINT, {
            id: "open-saber.registry.search",
            request: getStallsRequest
        }, {}).then(async (res: HTTPResponse) => ErrorHandler.parseApiResponse(res));
    }

    getIdeas(getIdeasRequest: GetIdeasRequest): Promise<GetIdeasResponse> {
        return this.http.post(this.appConfig.baseUrl + StallServicesImpl.GET_IDEAS_ENDPOINT, {
            id: "open-saber.registry.read",
            request: getIdeasRequest
        }, {}).then(async (res: HTTPResponse) => ErrorHandler.parseApiResponse(res));
    }
}