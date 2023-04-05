import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

const modules = [
  NzCardModule,
  NzIconModule,
  NzGridModule,   
  NzLayoutModule,
  NzDropDownModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: [modules],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class CommonsModule {}
