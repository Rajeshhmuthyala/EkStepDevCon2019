import {UserService} from './user.service';
import {
    CreateUserRpofileRequest,
    GetUserPrfileRequest,
    UpdateUserProfileRequest
} from './requests';
import {CreateUserProfileResponse} from './response';
import {User} from './User';

export class UserServiceImpl implements UserService {
    createUser(createUserProfile: CreateUserRpofileRequest): Promise<CreateUserProfileResponse> {
        throw new Error('To be implemented');
    }

    getUser(userCode: GetUserPrfileRequest): Promise<User> {
        throw new Error('To be implemented');
    }

    updateUserProfile(updatedUserProfile: UpdateUserProfileRequest): Promise<string> {
        throw new Error('To be implemented');
    }

}