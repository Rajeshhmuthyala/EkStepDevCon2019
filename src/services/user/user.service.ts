import {CreateUserRequest} from './requests';
import {CreateUserResponse} from './response';
import {User} from './User';

export interface UserService {
    createUser(createUserRequest: CreateUserRequest): Promise<CreateUserResponse>;

    getUser(userId: string): Promise<User>;
}