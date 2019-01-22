import {
    CreateUserRpofileRequest,
    GetUserPrfileRequest,
    UpdateUserProfileRequest
} from './requests';
import {CreateUserProfileResponse} from './response';
import {User} from './User';

export interface UserService {
    createUser(createUserProfile: CreateUserRpofileRequest): Promise<CreateUserProfileResponse>;

    getUser(userCode: GetUserPrfileRequest): Promise<User>;

    updateUserProfile(updateUserProfile: UpdateUserProfileRequest): Promise<string>;
}
