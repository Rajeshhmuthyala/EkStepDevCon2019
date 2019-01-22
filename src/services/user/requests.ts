
export interface CreateUserRpofileRequest {
    id: string;
    request: {
        Visitor: {
            name: string
            org: string
            nCoinsGiven: number
        }
    }
}

export interface GetUserPrfileRequest {
    id: string;
    request: {
        code: string;
    }
}

export  interface UpdateUserProfileRequest {
    id: string;
    request: {
        Visitor: {
            code: string;
            name: string
            org: string
            nCoinsGiven: number
        }
    }
}