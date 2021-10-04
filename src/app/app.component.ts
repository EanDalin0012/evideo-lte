import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCAL_STORAGE, LANGUAGE } from './v-share/constants/common.const';
import { Utils } from './v-share/util/utils.static';
import { MyLogUtil } from './v-share/util/my-log-util';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'evideo-lte';
  constructor(
    private translate: TranslateService) {
    this.setInitialAppLanguage();
  }
  ngOnInit(): void {
    $(document).on('click', '#toggle_btn', () => {
      if ($('body').hasClass('mini-sidebar')) {
        $('body').removeClass('mini-sidebar');
        $('.subdrop + ul').slideDown();
      } else {
        $('body').addClass('mini-sidebar');
        $('.subdrop + ul').slideUp();
      }
      return false;
    });

    $(document).on('mouseover', (e) => {
      e.stopPropagation();
      if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        const targ = $(e.target).closest('.sidebar').length;
        if (targ) {
          $('body').addClass('expand-menu');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp();
        }
        return false;
      } else {
        return true;
      }
    });
    $('body').append('<div class="sidebar-overlay"></div>');
    $(document).on('click', '#mobile_btn', function() {
      var $wrapper = $('.main-wrapper');
      $wrapper.toggleClass('slide-nav');
      $('.sidebar-overlay').toggleClass('opened');
      $('html').addClass('menu-opened');
      $('#task_window').removeClass('opened');
      return false;
    });

    $(".sidebar-overlay").on("click", function () {
      var $wrapper = $('.main-wrapper');
        $('html').removeClass('menu-opened');
        $(this).removeClass('opened');
        $wrapper.removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
        $('#task_window').removeClass('opened');
    });
  }
  setInitialAppLanguage() {
    const i18n = Utils.getSecureStorage( LOCAL_STORAGE.I18N );
    MyLogUtil.log('i18n', i18n);
    if ( !i18n ) {
      Utils.setSecureStorage(LOCAL_STORAGE.I18N, LANGUAGE.I18N_EN.toString());
      this.translate.setDefaultLang( LANGUAGE.I18N_EN.toString() );
      MyLogUtil.log('LANGUAGE.I18N_EN.toString()', LANGUAGE.I18N_EN.toString());
      this.translate.use( LANGUAGE.I18N_EN.toString() );
    } else {
      this.translate.setDefaultLang( 'en' );
      this.translate.use( i18n );
    }
  }
}
