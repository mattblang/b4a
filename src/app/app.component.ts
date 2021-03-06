import {Component} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {MdDialog, MdDialogRef} from '@angular/material';
import {BudgetSelectDialogComponent} from "./budgets/budget-select-dialog/budget-select-dialog.component";

@Component({
    selector: 'b4a-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    dialogRef: MdDialogRef<BudgetSelectDialogComponent>;

    constructor(private translate: TranslateService,
                public dialog: MdDialog) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    openBudgetSelect() {
        this.dialogRef = this.dialog.open(BudgetSelectDialogComponent, {
            disableClose: false
        });
    }
}
