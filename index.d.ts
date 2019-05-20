declare module "skygear" {
  const skygear: Container;
  export default skygear;

  export class Record {
    _id: string;
    _type: string;

    // meta attrs
    createdAt: Date;
    updatedAt: Date;
    ownerID: string;
    createdBy: string;
    updatedBy: string;
    access: ACL;

    static extend(recordType: string, instFunc?: Function): RecordCls;

    constructor(recordType: string, attrs: KVObject);

    readonly recordType: string;
    readonly id: string;

    readonly attributeKeys: string[];
    readonly $transient: KVObject;

    update(attrs: KVObject): void;

    setPublicNoAccess(): void;
    setPublicReadOnly(): void;
    setPublicReadWriteAccess(): void;
    setNoAccessForRole(role: Role): void;
    setReadOnlyForRole(role: Role): void;
    setReadWriteAccessForRole(role: Role): void;
    setNoAccessForUser(user: Record): void;
    setReadOnlyForUser(user: Record): void;
    setReadWriteAccessForUser(user: Record): void;

    hasPublicReadAccess(): boolean;
    hasPublicWriteAccess(): boolean;
    hasReadAccessForRole(role: Role): boolean;
    hasWriteAccessForRole(role: Role): boolean;
    hasReadAccessForUser(user: Record): boolean;
    hasWriteAccessForUser(user: Record): boolean;

    toJSON(): KVObject;

    [key: string]: any;
  }

  export type RecordCls = {
    new (attrs?: KVObject): Record;
  };

  export type KVObject = { [key: string]: any };

  // TODO: write better definition
  export class ACL {}

  export class Role {
    readonly name: string;
    constructor(name: string);
  }

  // NOTE(louis): I do not want to copy this but
  // in react native environment we cannot use --lib DOM
  // so File is undefined.
  // Therefore we have to define it here.
  // This is copied from https://github.com/Microsoft/TypeScript/blob/master/src/lib/dom.generated.d.ts
  interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }

  export interface AssetAttrs {
    name: string;
    file?: File | Blob;
    contentType?: string;
    url?: string;
    base64?: string;
  }
  export class Asset {
    name: string;
    file?: File | Blob;
    contentType?: string;
    url?: string;
    base64?: string;

    constructor(attrs: AssetAttrs);
    static fromJSON(attrs: AssetJson): Asset;
    toJSON(): AssetJson;
  }

  export interface AssetJson {
    $type: "asset";
    $name: string;
    $url: string;
  }

  export class Reference {
    constructor(attrs: Record | string);

    readonly id: string;
    toJSON(): ReferenceJson;
  }

  export interface ReferenceJson {
    $id: string;
    $type: "ref";
  }

  export class GeoLocation {
    latitude: string;
    longitude: string;

    static fromJSON(attrs: { $lat: number; $lng: number }): GeoLocation;

    constructor(latitude: string, longitude: string);
    toJSON(): GeoLocationJson;
  }

  export interface GeoLocationJson {
    $lat: number;
    $lng: number;
    $type: "geo";
  }

  export class BaseContainer {
    apiKey: string;
    endPoint: string;

    config(options: { apiKey: string; endPoint: string }): Promise<BaseContainer>;
    makeRequest(action: string, data: any): Promise<any>;
    lambda(action: string, params: any): Promise<any>;
  }

  export class Container extends BaseContainer {
    auth: AuthContainer;
    publicDB: Database;
    pubsub: PubsubContainer;
    push: PushContainer;

    Query: typeof Query;
    Role: typeof Role;
    ACL: typeof ACL;
    Record: typeof Record;
    UserRecord: RecordCls;
    // Sequence: typeof Sequence;
    Asset: typeof Asset;
    Reference: typeof Reference;
    // Geolocation: Geolocation;
    Database: typeof Database;
    // Friend: typeof Friend;
    // Follower: typeof Follower;
    // Following: typeof Following;
    Error: typeof SkygearError;
    ErrorCodes: ErrorCodeType;
    AuthContainer: typeof AuthContainer;
    // RelationContainer: typeof RelationContainer;
    DatabaseContainer: typeof DatabaseContainer;
    PubsubContainer: typeof PubsubContainer;
    PushContainer: typeof PushContainer;
  }

  export class DatabaseContainer {
    constructor(container: Container);

    uploadAsset(asset: Asset): Promise<Asset>;
  }

  export interface LinkOAuthProviderOption {
    callbackURL: string;
    scope: string[];
    options: any;
  }

  export class AuthContainer {
    currentUser: Record | undefined;
    accessToken: string | undefined;

    adminDisableUser(
      user: Record | string,
      message: string,
      expiry?: Date
    ): Promise<string>;

    adminEnableUser(user: Record | string): Promise<string>;

    adminResetPassword(
      user: Record | string,
      newPassword: string
    ): Promise<string>;

    assignUserRole(
      users: Record[] | string[],
      roles: Role[] | string[]
    ): Promise<"OK">;

    authHandler(): Promise<any>;

    changePassword(
      oldPassword: string,
      newPassword: string,
      invalidate: boolean
    ): Promise<Record>;

    fetchUserRole(
      users: Record[] | string[]
    ): Promise<{ [id: string]: Role[] }>;

    forgotPassword(email: String): Promise<any>;

    getLinkRedirectResult(): Promise<any>;

    getLoginRedirectResult(): Promise<any>;

    getOAuthProviderProfiles(): Promise<any>;

    iframeHandler(): Promise<any>;

    linkOAuthProviderWithAccessToken(
      provider: string,
      accessToken: string
    ): Promise<any>;

    linkOAuthProviderWithPopup(
      provider: string,
      options: LinkOAuthProviderOption
    ): Promise<any>;

    linkOAuthProviderWithRedirect(
      provider: string,
      options: LinkOAuthProviderOption
    ): Promise<any>;

    login(authData: any, password: string): Promise<Record>;

    loginOAuthProviderWithAccessToken(
      provider: string,
      accessToken: string
    ): Promise<Record>;

    loginOAuthProviderWithPopup(
      provider: string,
      options: LinkOAuthProviderOption
    ): Promise<Record>;

    loginOAuthProviderWithRedirect(
      provider: string,
      options: LinkOAuthProviderOption
    ): Promise<Record>;

    loginWithCustomToken(token: string): Promise<Record>;

    loginWithEmail(email: string, password: string): Promise<Record>;

    loginWithProvider(provider: string, authData: any): Promise<Record>;

    loginWithUsername(username: string, password: string): Promise<Record>;

    logout(): Promise<void>;

    onUserChanged(listener: () => void): EventHandle;

    requestVerification(recordKey: string): Promise<any>;

    resetPassword(
      userID: string,
      code: string,
      expireAt: number,
      newPassword: string
    ): Promise<any>;

    revokeUserRole(
      users: Record[] | string[],
      roles: Role[] | string[]
    ): Promise<string[]>;

    setAdminRole(roles: Role[]): Promise<string[]>;

    setDefaultRole(roles: Role[]): Promise<string[]>;

    signup(authData: any, password: string, data: any): Promise<Record>;

    signupAnonymously(): Promise<Record>;

    signupWithEmail(
      email: string,
      password: string,
      data: any
    ): Promise<Record>;

    signupWithUsername(
      username: string,
      password: string,
      data: any
    ): Promise<Record>;

    unlinkOAuthProvider(provider: string): Promise<any>;

    verifyUserWithCode(code: string): Promise<any>;

    whoami(): Promise<Record>;

    _authResolve(user: RecordCls): Promise<Record>;
  }

  export class EventHandle {
    cancel(): void;
  }

  export class PubsubContainer {
    autoPubsub: boolean;
    on(channel: string, handler: (data: any) => void): void;
    off(channel: string, handler?: (data: any) => void): void;
    once(channel: string): Promise<any>;
    onOpen(handler: (data: any) => void): void;
    onClose(handler: (data: any) => void): void;
    publish(channel: string, data: any): void;
    hasHandlers(channel: string): boolean;
    reconfigure(): void;
  }

  /**
   * You can register your device for receiving push notifications.
   *
   * @param {string} token - the device token
   * @param {string} type - the device type (either 'ios' or 'android')
   * @param {string} topic - the device topic, refer to application bundle
   * identifier on iOS and application package name on Android
   **/
  export class PushContainer {
    registerDevice(token: string, type: string, topic: string): Promise<void>;
    unregisterDevice(): Promise<void>;
    sendToUser(
      users: string | string[],
      notification: KVObject,
      topic?: string
    ): Promise<void>;

    sendToDevice(
      devices: string | string[],
      notification: KVObject,
      topic?: string
    ): Promise<void>;
  }

  export class Database {
    getRecordByID(id: string): Promise<Record>;

    save(record: Record, options?: DatabaseSaveOptions): Promise<Record>;
    save(
      records: Record[],
      options?: DatabaseSaveOptions
    ): Promise<DatabaseSaveBatchResult>;

    delete(record: Record): Promise<Record>;
    delete(
      records: Record[] | QueryResult<Record>
    ): Promise<(SkygearError | undefined)[] | undefined>;

    query<T extends Record = Record>(
      query: Query,
      cacheCallback?: boolean
    ): Promise<QueryResult<T>>;

    uploadAsset(asset: Asset): Promise<Asset>;
  }

  interface DatabaseSaveOptions {
    atomic?: Boolean;
  }
  export interface DatabaseSaveBatchResult {
    savedRecords: Record[];
    errors: Error[];
  }

  export class Query {
    constructor(recordCls: RecordCls);

    recordType: string;
    overallCount: boolean;
    limit: number;
    offset: number;
    page: number;

    like(key: string, value: string): this;
    notLike(key: string, value: string): this;
    caseInsensitiveLike(key: string, value: string): this;
    caseInsensitiveNotLike(key: string, value: string): this;

    equalTo(key: string, value: any): this;
    notEqualTo(key: string, value: any): this;

    greaterThan(key: string, value: number | Date): this;
    greaterThanOrEqualTo(key: string, value: number | Date): this;
    lessThan(key: string, value: number | Date): this;
    lessThanOrEqualTo(key: string, value: number | Date): this;
    greaterThanOrEqualTo(key: string, value: number | Date): this;

    distanceGreaterThan(key: string, loc: GeoLocation, distance: number): this;

    contains(key: string, lookupArray: any[]): this;
    notContains(key: string, lookupArray: any[]): this;

    containsValue(key: string, needle: string): this;
    notContainsValue(key: string, needle: string): this;

    // havingRelation(key, rel)
    // notHavingRelation(key, rel)

    addDescending(key: string): this;
    addAscending(key: string): this;

    addDescendingByDistance(key: string, loc: GeoLocation): this;
    addAscendingByDistance(key: string, loc: GeoLocation): this;

    transientInclude(key: string, mapToKey?: string): this;
    transientIncludeDistance(
      key: string,
      mapToKey: string | undefined,
      loc: GeoLocation
    ): this;

    // TODO (Steven-Chan):
    // Define type Predicate
    readonly predicate: any[];

    hash: string;
    toJSON(): KVObject;

    static clone(query: Query): Query;
    static fromJSON(payload: any): Query;
    static or(...queries: Query[]): Query;
    static not(query: Query): Query;
  }

  export interface QueryResult<T> extends Array<T> {
    overallCount: number;
  }

  // an error outlaw that doesn't follow any rules
  // returned by Container & Database Promise failure
  export interface OutlawError {
    status: number;
    error: SkygearError;
  }

  export class SkygearError extends Error {
    constructor(message: string, code?: number, info?: any);
    code: ErrorCodeType[keyof ErrorCodeType];
    info: KVObject | null;
    message: string;
  }

  export interface ErrorCodeType {
    NotAuthenticated: 101;
    PermissionDenied: 102;
    AccessKeyNotAccepted: 103;
    AccessTokenNotAccepted: 104;
    InvalidCredentials: 105;
    InvalidSignature: 106;
    BadRequest: 107;
    InvalidArgument: 108;
    Duplicated: 109;
    ResourceNotFound: 110;
    NotSupported: 111;
    NotImplemented: 112;
    ConstraintViolated: 113;
    IncompatibleSchema: 114;
    AtomicOperationFailure: 115;
    PartialOperationFailure: 116;
    UndefinedOperation: 117;
    PluginUnavailable: 118;
    PluginTimeout: 119;
    RecordQueryInvalid: 120;
    PluginInitializing: 121;
    ResponseTimeout: 122;
    DeniedArgument: 123;
    RecordQueryDenied: 124;
    NotConfigured: 125;
    PasswordPolicyViolated: 126;
    UserDisabled: 127;
    VerificationRequired: 128;
    AssetSizeTooLarge: 129;
    UnexpectedError: 10000;
  }

  export const ErrorCodes: ErrorCodeType;
}

declare module "skygear/cloud" {
  export interface OpParams {
    action: string;
    args: Array<any>;
  }

  export interface OpOptions {
    context: {
      request_id: string;
      request_tag: string;
    };
    container: CloudCodeContainer;
  }

  export type OpFunc = (parms: any, options: OpOptions) => any;

  export interface OpRegistrationOptions {
    keyRequired?: boolean;
    userRequired?: boolean;
  }

  export function op(
    name: string,
    func: OpFunc,
    options?: OpRegistrationOptions
  ): void;

  export type EveryFunc = () => void;

  export type EveryOptions = any;

  export function every(
    cron: string,
    func: EveryFunc,
    options?: EveryOptions
  ): void;

  export type EventFunc = (event: any) => void;

  export type EventOptions = any;

  export function event(
    name: string,
    func: EventFunc,
    options?: EventOptions
  ): void;

  export interface HandlerOptions {
    method?: string[] | string;
    keyRequired?: boolean;
    userRequired?: boolean;
  }

  export type HandlerReq = any;

  export type HandlerFuncOptions = any;

  export type HandlerFunc = (
    req: HandlerReq,
    options: HandlerFuncOptions
  ) => any;

  export function handler(
    path: string,
    func: HandlerFunc,
    options?: HandlerOptions
  ): void;

  export type ProviderCls = Function;

  export type ProviderOptions = any;

  export function provides(
    providerType: string,
    providerID: string,
    providerCls: ProviderCls,
    options?: ProviderOptions
  ): void;

  export type AuthData = any;

  export class BaseAuthProvider {
    handleAction(action: any, param: any): Promise<any>;

    login(authData: AuthData): Promise<any>;

    logout(authData: AuthData): Promise<any>;

    info(authData: AuthData): Promise<any>;
  }

  import {
    Record,
    BaseContainer,
    AuthContainer,
    Database,
    PubsubContainer
  } from "skygear";

  export { SkygearError } from "skygear";

  export type Record = Record;

  export type Pool = any;

  export type HookFunc = (
    newRecord: Record,
    oldRecord: Record,
    pool: Pool,
    options: any
  ) => any;

  export interface HookOptions {
    type: string;
    trigger: string;
    async: boolean;
  }

  export function hook(
    name: string,
    func: HookFunc,
    options?: HookOptions
  ): void;

  export type RecordOperationFunc = (
    record: Record,
    originalRecord: Record | undefined,
    pool: Pool,
    options: any
  ) => any;

  export interface RecordOperationOptions {
    async: boolean;
  }

  export function beforeSave(
    recordType: string,
    func: RecordOperationFunc,
    options?: RecordOperationOptions
  ): void;

  export function afterSave(
    recordType: string,
    func: RecordOperationFunc,
    options?: RecordOperationOptions
  ): void;

  export function beforeDelete(
    recordType: string,
    func: RecordOperationFunc,
    options?: RecordOperationOptions
  ): void;

  export function afterDelete(
    recordType: string,
    func: RecordOperationFunc,
    options?: RecordOperationOptions
  ): void;

  export type StaticAssetFunc = () => string;

  export function staticAsset(mountPoint: string, func: StaticAssetFunc): void;

  interface ConfigOptions {
    ignoreWarning: boolean;
  }

  export function configModule(
    moduleName: string,
    options?: ConfigOptions
  ): Promise<any>;

  export class CloudCodeContainer extends BaseContainer {
    asUserId: string;
    auth: AuthContainer;
    publicDB: Database;
    pubsub: PubsubContainer;
  }

  export function getContainer(userId?: string): CloudCodeContainer;

  export function publishEventsToChannels(
    channels: string[],
    eventsData: any[]
  ): Promise<void>;

  export class SkygearResponse {
    constructor(options?: {
      statusCode?: number;
      body?: string;
      headers?: { [header: string]: string };
    });
  }
}

declare module "skygear/react-native" {
  import Container from "skygear";
  export default Container;
}

declare module "skygear-core/dist/cloud/asset" {
  export interface Signer {
    sign: (name: string) => Promise<string>;
  }
  export function getSigner(): Signer;
}

declare module "skygear-chat" {
  const skygearChatContainer: SkygearChatContainer;

  import { Record, Asset } from "skygear";

  interface ConversationOptions {
    distinctByParticipants?: boolean;
    admins?: string[];
  }

  export interface SkygearChatSubscribeHandlerData {
    record_type: string;
    event_type: string;
    record: Record;
  }

  export class SkygearChatContainer {
    createConversation(
      participants: Record[],
      title?: string,
      meta?: JSON,
      options?: ConversationOptions
    ): Promise<Record>;
    createDirectConversation(
      user: Record,
      title?: string,
      meta?: JSON,
      options?: ConversationOptions
    ): Promise<Record>;
    getConversation(
      conversationID: string,
      includeLastMessage?: boolean
    ): Promise<Record>;
    getConversations(page?: number, pageSize?: number): Promise<Record[]>;
    getUserConversation(conversation: Record): Promise<Record>;
    updateConversation(
      conversation: Record,
      title?: string,
      meta?: JSON
    ): Promise<Record>;
    leaveConversation(conversation: Record): Promise<boolean>;
    deleteConversation(conversation: Record): Promise<boolean>;

    addParticipants(
      conversation: Record,
      participants: Record[]
    ): Promise<Record>;
    removeParticipants(
      conversation: Record,
      participants: Record[]
    ): Promise<Record>;

    addAdmins(conversation: Record, addAdmins: Record[]): Promise<Record>;
    removeAdmins(conversation: Record, addAdmins: Record[]): Promise<Record>;

    createMessage(
      conversation: Record,
      body: string,
      metadata?: JSON,
      asset?: Asset
    ): Promise<Record>;
    editMessage(
      message: Record,
      body: string,
      metadata?: JSON,
      asset?: Asset
    ): Promise<Record>;
    deleteMessage(message: Record): Promise<Record>;
    getUnreadCount(): Promise<{ message: number; conversation: number }>;
    getMessages(
      conversation: Record,
      limit?: number,
      beforeTime?: Date,
      order?: string
    ): Promise<Record[]>;
    getMessageReceipts(message: Record): Promise<Record[]>;

    markAsDelivered(message: Record[]): Promise<boolean>;
    markAsRead(message: Record[]): Promise<boolean>;
    markAsLastMessageRead(
      conversation: Record,
      message: Record
    ): Promise<number>;

    getUnreadMessageCount(conversation: Record): Promise<number>;

    subscribeTypingIndicator(conversation: Record, callback: () => void): void;
    subscribeAllTypingIndicator(callback: () => void): void;
    unsubscribeTypingIndicator(
      conversation: Record,
      handler?: () => void
    ): void;
    subscribe(handler: (data: SkygearChatSubscribeHandlerData) => void): void;
    unsubscribe(handler: (data: SkygearChatSubscribeHandlerData) => void): void;
  }

  export default skygearChatContainer;
}
