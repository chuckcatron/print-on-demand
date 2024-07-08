import { AuthorizationService } from './authorization.service';
declare const LocalStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class LocalStrategy extends LocalStrategy_base {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    validate(username: string, password: string): Promise<any>;
}
export {};
