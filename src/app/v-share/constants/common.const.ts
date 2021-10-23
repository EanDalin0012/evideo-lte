
export enum MODAL_STORE_KEY {
  MODAL_STORE_KEY = 'Modal_Store_object_dialog'
}
export enum HTTPResponseCode {
  Success = "200",
  NotFound = "404",
  Found = "302",
  Forbidden = "403"
}

export enum AES_INFO {
  STORE = "AES_INFO"
}

export enum AuthorizationModule {
  // 1
  User_Read     = 1,
  User_Create   = 2,
  User_Update   = 3,
  User_Delete   = 4,
// 2
  Movie_Read     = 5,
  Movie_Create   = 6,
  Movie_Update   = 7,
  Movie_Delete   = 8,
// 3
  Movie_Source_Read     = 9,
  Movie_Source_Create   = 10,
  Movie_Source_Update   = 11,
  Movie_Source_Delete   = 12,
// 4

  Setting_Movie_Type_Read     = 13,
  Setting_Movie_Type_Create   = 14,
  Setting_Movie_Type_Update   = 15,
  Setting_Movie_Type_Delete   = 16,

// 5
  Setting_Sub_Movie_Type_Read     = 17,
  Setting_Sub_Movie_Type_Create   = 18,
  Setting_Sub_Movie_Type_Update   = 19,
  Setting_Sub_Movie_Type_Delete   = 20,

// 6
  Setting_Client_Setting_Read     = 21,
  Setting_Client_Setting_Create   = 22,
  Setting_Client_Setting_Update   = 23,
  Setting_Client_Setting_Delete   = 24,

}



export enum LOCAL_STORAGE {
  DEVICE_INFO               = 'deviceInfo',
  MOVEI_Edit                  = 'Movei-edit',
  Setting_Movie_Add           = 'Setting-Movie-Add',
  Setting_Movie_Type_Edit     = 'Setting-Movie-Type-Edit',
  VdSource        = 'vd-source',
  VdSourcePreview        = 'VdSourcePreview',
  VdSourceEdit    = 'vd-source-edit',
  UserEdit    = 'user-edit',
  videoSourceAdd  = 'videoSourceAdd',
  videoSourceEdit  = 'videoSourceEdit',


  NekWorkIP       = 'NekWorkIP',
  CONTENTS_VERSION= 'contentsVersion',
  PRE_TRANSACTION = 'preTransaction',
  USER_INFO       = 'userInfo',
  IS_REMEMBER_ID  = 'isRememberId',
  USER_ID         = 'userID',
  LANGUAGE_CODE   = 'languageCode',
  I18N            = 'i18n',
  LAST_EVENT_TIME = 'lastEventTime',
  LAST_TIME_CHECK_NOTIFICATION = 'theLastTimeCheckNotification',
  Authorization   = 'Authorization',
  SearchHistoryVideo = 'SearchHistoryVideo'
}



export enum LANGUAGE {
  EN = '01',      // english
  KM = '02',      // khmer
  KO = '03',      // korean
  JA = '04',      // japanese
  ZH = '05',      // chines
  I18N_EN = 'en',
  I18N_KM = 'km',
  I18N_KO = 'ko',
  I18N_JA = 'ja',
  I18N_ZH = 'zh'
}

export enum AccountTypeCode {
  Admin = 'adm',
  Seniar = 'seni',
  Master = 'mast',
  Agent = 'agen',
  Member = 'memb'
}

export const AccountCompany = [
  {
    id: 1,
    accountID: '999999999'
  },
  {
    id: 2,
    accountID: '000000000'
  }
];

export enum TransactionType {
  WithdrawalCashOut = 'WithdrawalCashOut',
  DepositMoney = 'DepositMoney'
}

export enum AccountStatus {
  Active = 'act',
  Inactive = 'inact'
}

export enum BTN_ROLES {
  CLOSE     = 'CLOSE',
  EDIT      = 'EDIT',
  SAVE      = 'SAVE',
  DELETE    = 'DELETE',
  ACTIVE    = 'ACTIVE'

}

export enum AESINFO {
  STORE = 'AESINFO'
}


export const Genders = [
  {
    code: 'm',
    text: 'Male',
  },
  {
    code: 'f',
    text: 'Female',
  }
];
