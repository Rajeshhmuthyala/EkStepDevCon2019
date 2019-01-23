import {StallService} from './stall-service';
import {GetIdeasResponse} from './responses';
import {GetIdeasRequest, GetStallsRequest} from './requests';
import {Stall} from './Stall';
import {Injectable} from '@angular/core';

@Injectable()
export class StallServiceMock implements StallService {
    public async getStalls(getStallsRequest: GetStallsRequest): Promise<Stall[]> {
        return [
            {
                code: "STA1",
                name: "Creation"
            },
            {
                code: "STA2",
                name: "Classroom"
            }
        ];
    }

    public async getIdeas(getIdeasRequest: GetIdeasRequest): Promise<GetIdeasResponse> {
        if (getIdeasRequest.code === 'STA1') {
            return {
                Stall: {
                    code: "STA1",
                    ideas: [
                        {
                            code: "IDE1",
                            name: "handwriting-recognition",
                            description: "Allow participants to write",
                        },
                        {
                            code: "IDE2",
                            name: "teacher-aid",
                            description: "Allow teachers to quickly create contents",
                        }
                    ],
                    name: "Creation"
                }
            }
        } else {
            return {
                Stall: {
                    code: "STA2",
                    ideas: [
                        {
                            code: "IDE3",
                            name: "some_classroom_name",
                            description: "some_classroom_description",
                        },
                        {
                            code: "IDE4",
                            name: "some_classroom_name_1",
                            description: "some_classroom_description_1",
                        }
                    ],
                    name: "Classroom"
                }
            }
        }
    }
}