import {AppPreferences} from '@ionic-native/app-preferences';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AppPreferencesMock implements AppPreferences {
    clearAll(): Promise<any> {
        return undefined;
    }

    cloudSync(): Object {
        return undefined;
    }

    defaults(): Object {
        return undefined;
    }

    public async fetch(dict: string, key?: string): Promise<any> {
        return localStorage.getItem(dict);
    }

    iosSuite(suiteName: string): any {
    }

    remove(dict: string, key?: string): Promise<any> {
        return undefined;
    }

    show(): Promise<any> {
        return undefined;
    }

    public async store(dict: string, key: string, value?: any): Promise<any> {
        localStorage.setItem(dict, key);
    }

    suite(suiteName: string): any {
    }

    watch(subscribe: boolean): Observable<any> {
        return undefined;
    }
}