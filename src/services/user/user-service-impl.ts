import {UserService} from './user.service';
import {CreateUserRequest, GetUserRequest, UpdateUserRequest} from './requests';
import {CreateUserResponse, GetUserResponse, UpdateUserResponse} from './response';
import {Inject, Injectable} from '@angular/core';
import {AppConfig} from '../../config/AppConfig';
import {HTTP, HTTPResponse} from '@ionic-native/http';
import {ErrorHandler} from '../api/util/error-handler';

@Injectable()
export class UserServiceImpl implements UserService {
    private static CREATE_USER_ENDPOINT = '/add';
    private static GET_USER_ENDPOINT = '/read-dev';
    private static UPDATE_USER_ENDPOINT = '/update';

    constructor(private http: HTTP,
                @Inject('APP_CONFIG') private appConfig: AppConfig) {
    }

    createUser(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
        return this.http.post(this.appConfig.baseUrl + UserServiceImpl.CREATE_USER_ENDPOINT, {
            id: "open-saber.registry.create",
            ver: "1.0",
            ets: "11234",
            params: {
                "did": "",
                "key": "",
                "msgid": ""
            },
            request: createUserRequest
        }, {}).then((res: HTTPResponse) => ErrorHandler.parseApiResponse(res));
    }

    getUser(getUserRequest: GetUserRequest): Promise<GetUserResponse> {
        return this.http.post(this.appConfig.baseUrl + UserServiceImpl.GET_USER_ENDPOINT, {
            id: "open-saber.registry.read",
            request: getUserRequest
        }, {}).then((res: HTTPResponse) => ErrorHandler.parseApiResponse(res));
    }

    updateUserProfile(updatedUserRequest: UpdateUserRequest): Promise<UpdateUserResponse> {
        return this.http.post(this.appConfig.baseUrl + UserServiceImpl.UPDATE_USER_ENDPOINT, {
            id: "open-saber.registry.update",
            request: updatedUserRequest
        }, {}).then((res: HTTPResponse) => ErrorHandler.parseApiResponse(res));
    }

}