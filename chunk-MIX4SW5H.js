import{a as Y,b as Z}from"./chunk-KDKGN4HL.js";import{a as O,b as $,c as K,d as Q,e as X}from"./chunk-I66DDFNL.js";import{a as A,e as B}from"./chunk-VSICOE5Y.js";import{g as P,j as T,k as _,n as F,o as U,p as G,r as R,s as j,t as I,u as z,x as H,y as q,z as J}from"./chunk-RKLFAAHW.js";import{$ as s,Ad as M,Bd as w,Ed as k,Ia as d,Ta as e,Ua as o,Va as p,Xd as V,Zd as W,_b as y,_d as L,ac as E,bb as c,bc as x,g as h,hb as t,jb as v,qb as f,qd as S,vb as b,vd as N,wb as C,xd as D,ya as r,za as g}from"./chunk-NC6LZSZK.js";import"./chunk-5FZOKLP6.js";var tt={html:`
<div class="dm:grid">
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="alert()">Show alert</button>
</div>
    `,ts:`
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    constructor(
        protected notifications: DmNotificationsService
    ) {}

    alert() {
        this.notifications.alert({
            title: 'Alert dialog example',
            content: 'This is an example alert!'
        });
    }
}
    `,styles:""},ot={html:`
<div class="dm:grid">
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="confirm()">Show confirmation dialog</button>
</div>
<br>
<h3>Result</h3>
<pre>Confirmed: {{ confirmResult$ | async | json }}</pre>
    `,ts:`
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    protected readonly confirmResult$ = new BehaviorSubject<boolean|null>(null);

    constructor(
        protected notifications: DmNotificationsService
    ) {}

    confirm() {
        this.notifications.confirm({
            title: 'Confirmation dialog example',
            content: 'Are you sure?'
        }).subscribe(result => this.confirmResult$.next(result));
    }
}
    `,styles:""},et={html:`
<h3>Configuration</h3>
<form class="dm:grid" [formGroup]="notificationConfig">
    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Duration(ms)</mat-label>
        <input type="number" matInput formControlName="duration">
    </mat-form-field>
    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Notification Type</mat-label>
        <mat-select formControlName="type">
            <mat-option value="info">info</mat-option>
            <mat-option value="success">success</mat-option>
            <mat-option value="warn">warn</mat-option>
            <mat-option value="danger">danger</mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Vertical Position</mat-label>
        <mat-select formControlName="verticalPosition">
            <mat-option value="top">top</mat-option>
            <mat-option value="bottom">bottom</mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field class="dm:col-12 dm:md:col-6">
        <mat-label>Horizontal Position</mat-label>
        <mat-select formControlName="horizontalPosition">
            <mat-option value="start">start</mat-option>
            <mat-option value="center">center</mat-option>
            <mat-option value="end">end</mat-option>
            <mat-option value="left">left</mat-option>
            <mat-option value="right">right</mat-option>
        </mat-select>
    </mat-form-field>
</form>
<h3>Result</h3>
<div class="example-buttons dm:align-content-center">
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="exampleNotification()">Show notification</button>
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="notifyUsingComponent()">Show notification using custom component</button>
    <button class="dm:col-fixed" color="primary" mat-raised-button (click)="notifyWithCustomButton()">Show notification with an action button</button>
</div>
    `,ts:`
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
    standalone: true,
    template: \`
        <p>Hello from example component!</p>
        <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg" alt="" style="max-width: 180px">
    \`
})
class DmNotificationsExampleComponent {}

@Component({
    selector: 'app-dm-notifications-docs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dm-notifications-docs.component.html',
    styleUrl: './dm-notifications-docs.component.scss'
})
export class DmNotificationsDocsComponent {
    protected notificationConfig: UntypedFormGroup

    constructor(
        fb: UntypedFormBuilder,
        protected notifications: DmNotificationsService
    ) {
        this.notificationConfig = fb.group({
            duration: [5000],
            type: ['info'],
            verticalPosition: ['bottom'],
            horizontalPosition: ['end'],
        });
    }

    exampleNotification() {
        this.notify({
            type: this.notificationConfig.get('type')?.value || 'info',
            content: 'Example notification'
        });
    }

    notifyUsingComponent() {
        this.notify({
            type: this.notificationConfig.get('type')?.value || 'info',
            content: DmNotificationsExampleComponent
        });
    }

    notifyWithCustomButton() {
        this.notify({
            type: this.notificationConfig.get('type')?.value || 'info',
            content: 'This notifications has custom action buttons.',
            actionButtons: [
                {
                    label: 'Action!',
                    click: () => {
                        this.notifications.alert({
                            content: 'Action button clicked!'
                        });
                    }
                }
            ]
        })
    }

    private notify(config: DmNotificationConfig) {
        const duration = parseInt(this.notificationConfig.get('duration')?.value || 0);
        this.notifications.notify(Object.assign({
            duration: isNaN(duration) ? 5000 : duration,
            position: {
                vertical: this.notificationConfig.get('verticalPosition')?.value || 'bottom',
                horizontal: this.notificationConfig.get('horizontalPosition')?.value || 'end',
            }
        }, config || {}));
    }
}
    `,styles:""};var it=(()=>{let i=class i{};i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=s({type:i,selectors:[["app-dm-notifications-api-docs"]],standalone:!0,features:[f],decls:8,vars:0,consts:[["label","Public methods"],["label","alert"],["label","confirm"],["label","notify"]],template:function(n,a){n&1&&(e(0,"app-component-docs")(1,"app-component-docs-section",0)(2,"app-component-docs-section-item",1),t(3," Opens an alert dialog "),o(),e(4,"app-component-docs-section-item",2),t(5," Opens a confirmation dialog. "),o(),e(6,"app-component-docs-section-item",3),t(7," Displays a notification "),o()()())},dependencies:[x,K,Q,X]});let m=i;return m})();var at=(()=>{let i=class i{};i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=s({type:i,selectors:[["ng-component"]],standalone:!0,features:[f],decls:3,vars:0,consts:[["src","https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg","alt","",2,"max-width","180px"]],template:function(n,a){n&1&&(e(0,"p"),t(1,"Hello from example component!"),o(),p(2,"img",0))},encapsulation:2});let m=i;return m})(),Ft=(()=>{let i=class i{constructor(l,n){this.notifications=n,this.confirmResult$=new h(null),this.dmNotificationsAlertDialogCodeExample=tt,this.dmNotificationsConfirmDialogCodeExample=ot,this.dmGeneralNotificationsCodeExample=et,this.notificationConfig=l.group({duration:[5e3],type:["info"],verticalPosition:["bottom"],horizontalPosition:["end"]})}alert(){this.notifications.alert({title:"Alert dialog example",content:"This is an example alert!"})}confirm(){this.notifications.confirm({title:"Confirmation dialog example",content:"Are you sure?"}).subscribe(l=>this.confirmResult$.next(l))}exampleNotification(){this.notify({type:this.notificationConfig.get("type")?.value||"info",content:"Example notification"})}notifyUsingComponent(){this.notify({type:this.notificationConfig.get("type")?.value||"info",content:at})}notifyWithCustomButton(){this.notify({type:this.notificationConfig.get("type")?.value||"info",content:"This notifications has custom action buttons.",actionButtons:[{label:"Action!",click:()=>{this.notifications.alert({content:"Action button clicked!"})}}]})}notify(l){let n=parseInt(this.notificationConfig.get("duration")?.value||0);this.notifications.notify(Object.assign({duration:isNaN(n)?5e3:n,position:{vertical:this.notificationConfig.get("verticalPosition")?.value||"bottom",horizontal:this.notificationConfig.get("horizontalPosition")?.value||"end"}},l||{}))}};i.\u0275fac=function(n){return new(n||i)(g(j),g(q))},i.\u0275cmp=s({type:i,selectors:[["app-dm-notifications-docs"]],standalone:!0,features:[f],decls:158,vars:9,consts:[["title","Dominus notifications","titleLink","https://www.npmjs.com/package/@ng-dominus/dm-notifications"],["label","Overview"],["title","Alert dialog",3,"code"],[1,"dm:grid"],["color","primary","mat-raised-button","",1,"dm:col-fixed",3,"click"],["title","Confirm dialog",3,"code"],["title","General Notifications",3,"code"],[1,"dm:grid",3,"formGroup"],[1,"dm:col-12","dm:md:col-6"],["type","number","matInput","","formControlName","duration"],["formControlName","type"],["value","info"],["value","success"],["value","warn"],["value","danger"],["formControlName","verticalPosition"],["value","top"],["value","bottom"],["formControlName","horizontalPosition"],["value","start"],["value","center"],["value","end"],["value","left"],["value","right"],[1,"example-buttons","dm:align-content-center"],["label","Api"],["label","Styling"],[1,"dm:quote"]],template:function(n,a){n&1&&(e(0,"app-component-doc-header",0)(1,"p"),t(2,"Angular material based library used to handle user notifications."),o()(),e(3,"mat-card")(4,"mat-card-content")(5,"mat-tab-group")(6,"mat-tab",1)(7,"mat-card-content")(8,"app-code-example",2)(9,"div",3)(10,"button",4),c("click",function(){return a.alert()}),t(11,"Show alert"),o()()(),e(12,"app-code-example",5)(13,"div",3)(14,"button",4),c("click",function(){return a.confirm()}),t(15,"Show confirmation dialog"),o()(),p(16,"br"),e(17,"h3"),t(18,"Result"),o(),e(19,"pre"),t(20),b(21,"json"),b(22,"async"),o()(),e(23,"app-code-example",6)(24,"h3"),t(25,"Configuration"),o(),e(26,"form",7)(27,"mat-form-field",8)(28,"mat-label"),t(29,"Duration(ms)"),o(),p(30,"input",9),o(),e(31,"mat-form-field",8)(32,"mat-label"),t(33,"Notification Type"),o(),e(34,"mat-select",10)(35,"mat-option",11),t(36,"info"),o(),e(37,"mat-option",12),t(38,"success"),o(),e(39,"mat-option",13),t(40,"warn"),o(),e(41,"mat-option",14),t(42,"danger"),o()()(),e(43,"mat-form-field",8)(44,"mat-label"),t(45,"Vertical Position"),o(),e(46,"mat-select",15)(47,"mat-option",16),t(48,"top"),o(),e(49,"mat-option",17),t(50,"bottom"),o()()(),e(51,"mat-form-field",8)(52,"mat-label"),t(53,"Horizontal Position"),o(),e(54,"mat-select",18)(55,"mat-option",19),t(56,"start"),o(),e(57,"mat-option",20),t(58,"center"),o(),e(59,"mat-option",21),t(60,"end"),o(),e(61,"mat-option",22),t(62,"left"),o(),e(63,"mat-option",23),t(64,"right"),o()()()(),e(65,"h3"),t(66,"Result"),o(),e(67,"div",24)(68,"button",4),c("click",function(){return a.exampleNotification()}),t(69,"Show notification"),o(),e(70,"button",4),c("click",function(){return a.notifyUsingComponent()}),t(71,"Show notification using custom component"),o(),e(72,"button",4),c("click",function(){return a.notifyWithCustomButton()}),t(73,"Show notification with an action button"),o()()()()(),e(74,"mat-tab",25)(75,"mat-card-content"),p(76,"app-dm-notifications-api-docs"),o()(),e(77,"mat-tab",26)(78,"mat-card-content")(79,"p"),t(80,"Override colors using the following css variables:"),o(),e(81,"ul")(82,"li"),t(83," Info notification type "),e(84,"ul")(85,"li")(86,"span",27),t(87,"--dominus-notifications-info-background"),o(),t(88,": Background color"),o(),e(89,"li")(90,"span",27),t(91,"--dominus-notifications-info-border-color"),o(),t(92,": Border color"),o(),e(93,"li")(94,"span",27),t(95,"--dominus-notifications-info-text-color"),o(),t(96,": Text color"),o(),e(97,"li")(98,"span",27),t(99,"--dominus-notifications-info-btn-color"),o(),t(100,": Action button color"),o()()(),e(101,"li"),t(102," Success notification type "),e(103,"ul")(104,"li")(105,"span",27),t(106,"--dominus-notifications-success-background"),o(),t(107,": Background color"),o(),e(108,"li")(109,"span",27),t(110,"--dominus-notifications-success-border-color"),o(),t(111,": Border color"),o(),e(112,"li")(113,"span",27),t(114,"--dominus-notifications-success-text-color"),o(),t(115,": Text color"),o(),e(116,"li")(117,"span",27),t(118,"--dominus-notifications-success-btn-color"),o(),t(119,": Action button color"),o()()(),e(120,"li"),t(121," Warning notification type "),e(122,"ul")(123,"li")(124,"span",27),t(125,"--dominus-notifications-warn-background"),o(),t(126,": Background color"),o(),e(127,"li")(128,"span",27),t(129,"--dominus-notifications-warn-border-color"),o(),t(130,": Border color"),o(),e(131,"li")(132,"span",27),t(133,"--dominus-notifications-warn-text-color"),o(),t(134,": Text color"),o(),e(135,"li")(136,"span",27),t(137,"--dominus-notifications-warn-btn-color"),o(),t(138,": Action button color"),o()()(),e(139,"li"),t(140," Danger notification type "),e(141,"ul")(142,"li")(143,"span",27),t(144,"--dominus-notifications-danger-background"),o(),t(145,": Background color"),o(),e(146,"li")(147,"span",27),t(148,"--dominus-notifications-danger-border-color"),o(),t(149,": Border color"),o(),e(150,"li")(151,"span",27),t(152,"--dominus-notifications-danger-text-color"),o(),t(153,": Text color"),o(),e(154,"li")(155,"span",27),t(156,"--dominus-notifications-danger-btn-color"),o(),t(157,": Action button color"),o()()()()()()()()()),n&2&&(r(8),d("code",a.dmNotificationsAlertDialogCodeExample),r(4),d("code",a.dmNotificationsConfirmDialogCodeExample),r(8),v("Confirmed: ",C(21,5,C(22,7,a.confirmResult$)),""),r(3),d("code",a.dmGeneralNotificationsCodeExample),r(3),d("formGroup",a.notificationConfig))},dependencies:[x,y,E,J,H,I,F,P,U,T,_,M,N,D,L,V,W,z,G,R,k,w,Z,Y,B,A,$,O,S,it],styles:[".example-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:.6rem}"]});let m=i;return m})();export{Ft as DmNotificationsDocsComponent};
