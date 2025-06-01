import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  imports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    MenubarModule,
    TableModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    DividerModule,
    CheckboxModule,
    DropdownModule,
    PaginatorModule,
    SkeletonModule,
    ChipsModule,
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    MenubarModule,
    TableModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    PasswordModule,
    DividerModule,
    CheckboxModule,
    DropdownModule,
    PaginatorModule,
    SkeletonModule,
    ChipsModule,
  ],
})
export class PrimeNgModule {}
