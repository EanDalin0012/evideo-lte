import { Component, OnInit } from '@angular/core';
import { AccountTypeCode, LOCAL_STORAGE } from '../../v-share/constants/common.const';
import { AccountType } from '../../v-share/model/account-type';
import { Account } from '../../v-share/model/account';
import { UrlComplete } from '../../v-share/model/url-complete';
import { Member } from '../../v-share/model/member';
import { Group } from '../../v-share/model/group';
import { Router } from '@angular/router';
import { DataService } from '../../v-share/service/data.service';
import { Utils } from '../../v-share/util/utils.static';
import * as $ from 'jquery';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  accountTypes: AccountType[] = accountTypes;
  accountInfo: Account = {
    id: 0,
    accountID: '',
    accountName: '',
    accountBalance: 0,
    accountType: '',
    status:'',
    currency: ''
  };

  urlComplete: UrlComplete = {
    mainUrl: '',
    childUrl: '',
    subUrl: ''
  };

  sidebarMenus = {
    default: true,
    chat: false,
    settings: false,
  };

  members: Member = {
    active: '',
    total: []
  };
  groups: Group;
  accountType ='';

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     $(".main-wrapper").removeClass('slide-nav');
    //     $(".sidebar-overlay").removeClass('opened');
    //     const url = event.url.split("/");
    //     this.urlComplete.mainUrl = url[1];
    //     this.urlComplete.subUrl = url[2];
    //     this.urlComplete.childUrl = url[3];
    //     if (url[1] === "") {
    //       this.urlComplete.mainUrl = "dashboard";
    //       this.urlComplete.subUrl = "admin";
    //     }

    //     if (url[2] === "chat" || url[2] === "calls") {
    //       this.sidebarMenus.chat = true;
    //       this.sidebarMenus.default = false;
    //     } else {
    //       this.sidebarMenus.chat = false;
    //       this.sidebarMenus.default = true;
    //     }
    //   }
    // });

    this.groups = {
      active: "",
      total: ["general", "video responsive survey", "500rs", "warehouse"],
    };
    this.members = {
      active: "Mike Litorus",
      total: [
        { name: "John Doe", count: 3 },
        { name: "Richard Miles", count: 0 },
        { name: "John Smith", count: 7 },
        { name: "Mike Litorus", count: 9 },
      ],
    };
  }

  ngOnInit() {
    this.urlComplete.mainUrl = 'acc';
    this.urlComplete.subUrl = AccountTypeCode.Admin;

    this.dataService.visitSourceParamRoutorChangeData.subscribe(message => {
      let account_type = Utils.getSecureStorage(LOCAL_STORAGE.AccountTypeCode);
      let msg = '';
      if (message !== '') {
        msg = message;
      } else {
        this.accountType = account_type;
        msg = account_type;
      }
      this.activeSidebar(msg);
    });

    // Slide up and down of menus
    $(document).on("click", "#sidebar-menu a", function (e) {
      e.stopImmediatePropagation();
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });

    // this.dataService.visitData.subscribe(message => {
    //   if (message !== '') {
    //     setTimeout(() => {
    //       this.urlComplete.mainUrl = message;
    //       this.urlComplete.subUrl = message;
    //     });
    //   }
    // });

    this.accountInfo = Utils.getSecureStorage(LOCAL_STORAGE.Account_Info);

  }

  setActive(member:any) {
    // this.allModulesService.members.active = member;
  }

  routerAccount() {
    this.urlComplete.mainUrl = 'acc';
    this.urlComplete.subUrl = this.accountInfo.accountType;
    Utils.setSecureStorage(LOCAL_STORAGE.AccountTypeCode, this.accountInfo.accountType);
    this.dataService.visitParamRouterChange('acc');
    this.onNavigateRoutor('/acc/');
  }

  onNavigateRoutor(router: string) {
    this.router.navigate([router]);
  }

  activeSidebar(msg: string) {
    switch (msg) {
      case 'profile':
        this.urlComplete.mainUrl = 'acc'+msg;
        this.urlComplete.subUrl = msg;
        break;
      // case 'acc':
      //   let account_type = Utils.getSecureStorage(LOCAL_STORAGE.AccountTypeCode);
      //   this.urlComplete.mainUrl = 'acc';
      //   this.urlComplete.subUrl = account_type;
      //   break;
      case 'acc':
        this.urlComplete.mainUrl = 'my-account';
        this.urlComplete.subUrl = 'my-account';
        break;
      default:
        this.urlComplete.mainUrl = '';
        this.urlComplete.subUrl = msg;
        break;
    }
  }

}

export const accountTypes: AccountType[] = [
  {
    id: 2,
    code: AccountTypeCode.Seniar,
    name: 'Senair',
    remark: 'A'
  },
];

export const accountSenairTypes: AccountType[] = [
  {
    id: 3,
    code: AccountTypeCode.Seniar,
    name: 'Master',
    remark: 'A'
  },
  {
    id: 4,
    code: AccountTypeCode.Seniar,
    name: 'Agent',
    remark: 'Agent'
  },
];


export const accountMasterTypes: AccountType[] = [
  {
    id: 3,
    code: AccountTypeCode.Seniar,
    name: 'Agent',
    remark: 'Agent'
  },
  {
    id: 4,
    code: AccountTypeCode.Seniar,
    name: 'Member',
    remark: 'Member'
  },
];


export const accountAgentTypes: AccountType[] = [
  {
    id: 4,
    code: AccountTypeCode.Seniar,
    name: 'Member',
    remark: 'Member'
  },
];
