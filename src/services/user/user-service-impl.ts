import {UserService} from './user.service';
import {CreateUserRequest} from './requests';
import {CreateUserResponse} from './response';
import {User} from './User';

export class UserServiceImpl implements UserService {
    createUser(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
        throw new Error('To be implemented');
    }

    getUser(userId: string): Promise<User> {
        throw new Error('To be implemented');
    }
}