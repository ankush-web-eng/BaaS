import { User } from './User';

export interface ApiResponse {
    message: string | undefined;
    user: User | undefined;
}
