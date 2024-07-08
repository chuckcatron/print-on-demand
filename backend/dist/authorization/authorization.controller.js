"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("./authorization.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const local_auth_guard_1 = require("./local-auth.guard");
const logger_service_1 = require("../logger.service");
let AuthorizationController = class AuthorizationController {
    constructor(loggerService, authService) {
        this.loggerService = loggerService;
        this.authService = authService;
    }
    async signIn(body) {
        this.loggerService.log('Sign in request: AuthorizationController.signIn');
        return this.authService.signIn(body.username, body.password);
    }
    async validate(req) {
        return req.user;
    }
};
exports.AuthorizationController = AuthorizationController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "validate", null);
exports.AuthorizationController = AuthorizationController = __decorate([
    (0, common_1.Controller)('authorization'),
    __metadata("design:paramtypes", [logger_service_1.CustomLoggerService,
        authorization_service_1.AuthorizationService])
], AuthorizationController);
//# sourceMappingURL=authorization.controller.js.map