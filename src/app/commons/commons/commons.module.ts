import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const modules = [
  NzCardModule,
  NzIconModule,
  NzGridModule,
  NzLayoutModule,
  NzDropDownModule,
  NzResultModule,
  NzButtonModule,
  NzBackTopModule,
  NzFormModule,
  NzModalModule,
  NzInputModule,
  NzCheckboxModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  exports: [modules],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class CommonsModule {}
