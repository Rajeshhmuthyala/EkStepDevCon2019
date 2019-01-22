import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {CreateUserProfileResponse} from './response';
import {
    CreateUserRpofileRequest,
    GetUserPrfileRequest,
    UpdateUserProfileRequest
} from './requests';
import {User} from './User';

@Injectable()
export class UserServiceMock implements UserService {
    public async createUser(createUserRequest: CreateUserRpofileRequest): Promise<CreateUserProfileResponse> {
        return {
            userCode: 'VIS999'
        }
    }

    public async getUser(userId: GetUserPrfileRequest): Promise<User> {
        return {
            userName: 'SOMEONE',
            orgName: 'EkStep'
        };
    }

    public async updateUserProfile(updateUserProfile: UpdateUserProfileRequest): Promise<string> {
        return 'Profile Updated Succefully';
    }

}