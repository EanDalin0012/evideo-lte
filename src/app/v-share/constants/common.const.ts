
export enum MODAL_STORE_KEY {
  MODAL_STORE_KEY = 'Modal_Store_object_dialog'
}
export enum HTTPResponseCode {
  Success = "200",
  NotFound = "404"
}

export enum AES_INFO {
  STORE = "AES_INFO"
}

export enum LOCAL_STORAGE {
  DEVICE_INFO               = 'deviceInfo',
  MOVEI_Edit                  = 'Movei-edit',
  Setting_Movie_Add           = 'Setting-Movie-Add',
  Setting_Movie_Type_Edit     = 'Setting-Movie-Type-Edit',
  VdSource        = 'vd-source',
  VdSourceEdit    = 'vd-source-edit',
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
