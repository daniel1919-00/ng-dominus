import{a as X,b as Y}from"./chunk-OMI7WDFL.js";import{a as _,d as T,f as V,g as H,h as J,i as K,j as Q}from"./chunk-UD26RQLN.js";import{a as Z}from"./chunk-25YS2ZIB.js";import{a as k,d as w}from"./chunk-LGXH64IJ.js";import{a as q}from"./chunk-4K6TX47G.js";import{i as B,l as A,m as F,o as P,p as I,q as O,s as j,t as z,u as G,v as R,w as U}from"./chunk-LZD34W4H.js";import{$ as s,$b as h,Ad as N,Ha as d,Sa as i,Ta as e,Td as W,Ua as p,Vd as $,Wd as L,ab as c,ac as v,bc as x,g as S,gb as t,ib as C,pb as f,qd as y,tb as g,ub as b,vd as M,xa as r,xd as D,ya as E}from"./chunk-2C6FR2QZ.js";import"./chunk-5FZOKLP6.js";var tt={html:"",styles:"",ts:""};var et=(()=>{let n=class n{};n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=s({type:n,selectors:[["app-dm-notifications-api-docs"]],standalone:!0,features:[f],decls:8,vars:0,consts:[["label","Public methods"],["label","alert"],["label","confirm"],["label","notify"]],template:function(o,a){o&1&&(i(0,"app-component-docs")(1,"app-component-docs-section",0)(2,"app-component-docs-section-item",1),t(3," Opens an alert dialog "),e(),i(4,"app-component-docs-section-item",2),t(5," Opens a confirmation dialog. "),e(),i(6,"app-component-docs-section-item",3),t(7," Displays a notification "),e()()())},dependencies:[x,J,K,Q]});let m=n;return m})();var nt=(()=>{let n=class n{};n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=s({type:n,selectors:[["ng-component"]],standalone:!0,features:[f],decls:3,vars:0,consts:[["src","https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg","alt","",2,"max-width","180px"]],template:function(o,a){o&1&&(i(0,"p"),t(1,"Hello from example component!"),e(),p(2,"img",0))},encapsulation:2});let m=n;return m})(),At=(()=>{let n=class n{constructor(l,o){this.notifications=o,this.dmNotificationsCodeExample=tt,this.confirmResult$=new S(null),this.notificationConfig=l.group({duration:[5e3],type:["info"],verticalPosition:["bottom"],horizontalPosition:["end"]})}alert(){this.notifications.alert({title:"Alert dialog example",content:"This is an example alert!"})}confirm(){this.notifications.confirm({title:"Confirmation dialog example",content:"Are you sure?"}).subscribe(l=>this.confirmResult$.next(l))}exampleNotification(){this.notify({type:this.notificationConfig.get("type")?.value||"info",content:"Example notification"})}notifyUsingComponent(){this.notify({type:this.notificationConfig.get("type")?.value||"info",content:nt})}notifyWithCustomButton(){this.notify({type:this.notificationConfig.get("type")?.value||"info",content:"This notifications has custom action buttons.",actionButtons:[{label:"Action!",click:()=>{this.notifications.alert({content:"Action button clicked!"})}}]})}notify(l){let o=parseInt(this.notificationConfig.get("duration")?.value||0);this.notifications.notify(Object.assign({duration:isNaN(o)?5e3:o,position:{vertical:this.notificationConfig.get("verticalPosition")?.value||"bottom",horizontal:this.notificationConfig.get("horizontalPosition")?.value||"end"}},l||{}))}};n.\u0275fac=function(o){return new(o||n)(E(z),E(Z))},n.\u0275cmp=s({type:n,selectors:[["app-dm-notifications-docs"]],standalone:!0,features:[f],decls:154,vars:9,consts:[["title","Dominus notifications","titleLink","https://www.npmjs.com/package/@ng-dominus/dm-notifications"],["label","Overview"],["title","Alert dialog",3,"code"],[1,"dm:grid"],["color","primary","mat-raised-button","",1,"dm:col-fixed",3,"click"],["title","Confirm dialog",3,"code"],["title","Notifications",3,"code"],[1,"dm:grid",3,"formGroup"],[1,"dm:col-12","dm:md:col-6"],["type","number","matInput","","formControlName","duration"],["formControlName","type"],["value","info"],["value","success"],["value","warn"],["value","danger"],["formControlName","verticalPosition"],["value","top"],["value","bottom"],["formControlName","horizontalPosition"],["value","start"],["value","center"],["value","end"],["value","left"],["value","right"],[1,"example-buttons","dm:align-content-center"],["label","Api"],["label","Styling"],[1,"dm:quote"]],template:function(o,a){o&1&&(i(0,"app-component-doc-header",0)(1,"p"),t(2,"Angular material based library used to handle user notifications."),e()(),i(3,"mat-card")(4,"mat-card-content")(5,"mat-tab-group")(6,"mat-tab",1)(7,"mat-card-content")(8,"app-code-example",2)(9,"div",3)(10,"button",4),c("click",function(){return a.alert()}),t(11,"Show alert"),e()()(),i(12,"app-code-example",5)(13,"div",3)(14,"button",4),c("click",function(){return a.confirm()}),t(15,"Show confirmation dialog"),e()(),p(16,"br"),i(17,"h3"),t(18,"Result"),e(),i(19,"pre"),t(20),g(21,"json"),g(22,"async"),e()(),i(23,"app-code-example",6)(24,"form",7)(25,"mat-form-field",8)(26,"mat-label"),t(27,"Duration(ms)"),e(),p(28,"input",9),e(),i(29,"mat-form-field",8)(30,"mat-label"),t(31,"Notification Type"),e(),i(32,"mat-select",10)(33,"mat-option",11),t(34,"info"),e(),i(35,"mat-option",12),t(36,"success"),e(),i(37,"mat-option",13),t(38,"warn"),e(),i(39,"mat-option",14),t(40,"danger"),e()()(),i(41,"mat-form-field",8)(42,"mat-label"),t(43,"Vertical Position"),e(),i(44,"mat-select",15)(45,"mat-option",16),t(46,"top"),e(),i(47,"mat-option",17),t(48,"bottom"),e()()(),i(49,"mat-form-field",8)(50,"mat-label"),t(51,"Horizontal Position"),e(),i(52,"mat-select",18)(53,"mat-option",19),t(54,"start"),e(),i(55,"mat-option",20),t(56,"center"),e(),i(57,"mat-option",21),t(58,"end"),e(),i(59,"mat-option",22),t(60,"left"),e(),i(61,"mat-option",23),t(62,"right"),e()()()(),i(63,"div",24)(64,"button",4),c("click",function(){return a.exampleNotification()}),t(65,"Show notification"),e(),i(66,"button",4),c("click",function(){return a.notifyUsingComponent()}),t(67,"Show notification using custom component"),e(),i(68,"button",4),c("click",function(){return a.notifyWithCustomButton()}),t(69,"Show notification with an action button"),e()()()()(),i(70,"mat-tab",25)(71,"mat-card-content"),p(72,"app-dm-notifications-api-docs"),e()(),i(73,"mat-tab",26)(74,"mat-card-content")(75,"p"),t(76,"Override colors using the following css variables:"),e(),i(77,"ul")(78,"li"),t(79," Info notification type "),i(80,"ul")(81,"li")(82,"span",27),t(83,"--dominus-notifications-info-background"),e(),t(84,": Background color"),e(),i(85,"li")(86,"span",27),t(87,"--dominus-notifications-info-border-color"),e(),t(88,": Border color"),e(),i(89,"li")(90,"span",27),t(91,"--dominus-notifications-info-text-color"),e(),t(92,": Text color"),e(),i(93,"li")(94,"span",27),t(95,"--dominus-notifications-info-btn-color"),e(),t(96,": Action button color"),e()()(),i(97,"li"),t(98," Success notification type "),i(99,"ul")(100,"li")(101,"span",27),t(102,"--dominus-notifications-success-background"),e(),t(103,": Background color"),e(),i(104,"li")(105,"span",27),t(106,"--dominus-notifications-success-border-color"),e(),t(107,": Border color"),e(),i(108,"li")(109,"span",27),t(110,"--dominus-notifications-success-text-color"),e(),t(111,": Text color"),e(),i(112,"li")(113,"span",27),t(114,"--dominus-notifications-success-btn-color"),e(),t(115,": Action button color"),e()()(),i(116,"li"),t(117," Warning notification type "),i(118,"ul")(119,"li")(120,"span",27),t(121,"--dominus-notifications-warn-background"),e(),t(122,": Background color"),e(),i(123,"li")(124,"span",27),t(125,"--dominus-notifications-warn-border-color"),e(),t(126,": Border color"),e(),i(127,"li")(128,"span",27),t(129,"--dominus-notifications-warn-text-color"),e(),t(130,": Text color"),e(),i(131,"li")(132,"span",27),t(133,"--dominus-notifications-warn-btn-color"),e(),t(134,": Action button color"),e()()(),i(135,"li"),t(136," Danger notification type "),i(137,"ul")(138,"li")(139,"span",27),t(140,"--dominus-notifications-danger-background"),e(),t(141,": Background color"),e(),i(142,"li")(143,"span",27),t(144,"--dominus-notifications-danger-border-color"),e(),t(145,": Border color"),e(),i(146,"li")(147,"span",27),t(148,"--dominus-notifications-danger-text-color"),e(),t(149,": Text color"),e(),i(150,"li")(151,"span",27),t(152,"--dominus-notifications-danger-btn-color"),e(),t(153,": Action button color"),e()()()()()()()()()),o&2&&(r(8),d("code",a.dmNotificationsCodeExample),r(4),d("code",a.dmNotificationsCodeExample),r(8),C("Confirmed: ",b(21,5,b(22,7,a.confirmResult$)),""),r(3),d("code",a.dmNotificationsCodeExample),r(1),d("formGroup",a.notificationConfig))},dependencies:[x,h,v,q,U,G,P,B,I,A,F,N,M,D,L,W,$,R,O,j,w,k,Y,X,T,_,H,V,y,et],styles:[".example-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:.6rem}"]});let m=n;return m})();export{At as DmNotificationsDocsComponent};
