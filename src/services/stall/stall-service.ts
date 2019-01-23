import {GetIdeasRequest, GetStallsRequest} from './requests';
import {GetIdeasResponse} from './responses';
import {Stall} from './Stall';

export interface StallService {
    getStalls(getStallsRequest: GetStallsRequest): Promise<Stall[]>;

    getIdeas(getIdeasRequest: GetIdeasRequest): Promise<GetIdeasResponse>;
}