import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {CreateUserResponse} from './response';
import {CreateUserRequest} from './requests';
import {User} from './User';

@Injectable()
export class UserServiceMock implements UserService {
    public async createUser(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
        return {
            uuid: 'SOME_UID',
            qrCode: 'assets/imgs/mock-qrcode.png'
        }
    }

    public async getUser(userId: string): Promise<User> {
        return {
            userName: 'SOMEONE',
            orgName: 'EkStep'
        };
    }
}