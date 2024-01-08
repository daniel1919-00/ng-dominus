import{c as $}from"./chunk-4QKZ6KUB.js";import{a as V,b as q}from"./chunk-PZES7UTF.js";import{a as j,b as H,c as X,d as Y,e as Z}from"./chunk-WY3JLOKF.js";import{a as w,e as B,f as R}from"./chunk-KRV5GUGQ.js";import{j as k,k as I,m as A,o as K,p as G,q as L,r as U,t as _,w as J,y as Q}from"./chunk-ZSE52KHP.js";import{$ as s,$b as u,Ia as i,Ta as o,Ua as e,Va as d,Vd as P,Xd as W,Yd as z,_b as y,hb as t,ib as h,od as S,qb as c,rd as N,sb as b,td as D,vb as v,vd as T,wb as x,ya as l,yd as F,za as O}from"./chunk-DNBIXLC5.js";import"./chunk-5FZOKLP6.js";var ee=(()=>{let a=class a{};a.\u0275fac=function(r){return new(r||a)},a.\u0275cmp=s({type:a,selectors:[["app-tags-docs"]],standalone:!0,features:[c],decls:25,vars:0,consts:[[1,"dm:quote","code"],["label","Inputs"],["label","value"],["label","autocompleteOptions"],["label","addOnKeycodes"],["label","addOnBlur"],["label","allowDuplicates"],["label","tagColor"],["label","onBeforeAdd"],["label","onBeforeRemove"]],template:function(r,m){r&1&&(o(0,"app-component-docs")(1,"pre")(2,"code",0),t(3,"import { DmTagsComponent } from '@ng-dominus/dm-tags';"),e()(),o(4,"app-component-docs-section",1)(5,"app-component-docs-section-item",2),t(6," Set the initial tags. "),e(),o(7,"app-component-docs-section-item",3)(8,"p"),t(9,"If set then an autocomplete list is appended to the tags input."),e(),t(10," Can be a function that will be called initially and whenever the users inputs text, and should return a promise with the filtered list items. "),e(),o(11,"app-component-docs-section-item",4),t(12," Keycode presses to add the current input string as a tag "),e(),o(13,"app-component-docs-section-item",5)(14,"p"),t(15,"Add the current input string on element blur."),e(),t(16," This is ignored when autocomplete options are shown, since the input loses focus when selecting the options. "),e(),o(17,"app-component-docs-section-item",6),t(18," Whether duplicate values are allowed "),e(),o(19,"app-component-docs-section-item",7),t(20," Color applied to the entered tags. "),e(),o(21,"app-component-docs-section-item",8),t(22," Function that returns true to allow the item or false to reject it "),e(),o(23,"app-component-docs-section-item",9),t(24," Function that returns true to allow the deletion or false to reject it "),e()()())},dependencies:[u,X,Y,Z]});let n=a;return n})();var te={html:`
<form [formGroup]="form">
    <h3>Configuration</h3>

    <section formGroupName="config" class="dm:grid">
        <mat-form-field class="dm:col-6">
            <mat-label>autocompleteOptions</mat-label>
            <dm-tags formControlName="autocompleteOptions"></dm-tags>
        </mat-form-field>

        <mat-form-field class="dm:col-6">
            <mat-label>addOnKeycodes</mat-label>
            <mat-select [multiple]="true" formControlName="addOnKeycodes">
                <mat-option [value]="ENTER">ENTER</mat-option>
                <mat-option [value]="COMMA">COMMA</mat-option>
                <mat-option [value]="SEMICOLON">SEMICOLON</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-checkbox class="dm:col-6" color="primary" formControlName="addOnBlur">addOnBlur</mat-checkbox>
        <mat-checkbox class="dm:col-6" color="primary" formControlName="allowDuplicates">allowDuplicates
        </mat-checkbox>
    </section>

    <br>
    <h3>Result</h3>
    <mat-form-field>
        <mat-label>Tags</mat-label>
        <dm-tags
            formControlName="value"
            [autocompleteOptions]="form.get('config.autocompleteOptions')?.value"
            [addOnKeycodes]="form.get('config.addOnKeycodes')?.value || [ENTER]"
            [addOnBlur]="form.get('config.addOnBlur')?.value"
            [allowDuplicates]="form.get('config.allowDuplicates')?.value"
        ></dm-tags>
    </mat-form-field>
</form>
<br><br>
<h3>Form Value</h3>
<pre>{{ form.get('value')?.value | json }}</pre>
    `,ts:`
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {UploaderDocsComponent} from "../dm-uploader-docs/uploader-docs/uploader-docs.component";
import {TagsDocsComponent} from "./tags-docs/tags-docs.component";
import {DmTagsComponent} from "../../../../../dm-tags/src/lib/dm-tags.component";
import {COMMA, ENTER, SEMICOLON} from "@angular/cdk/keycodes";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmTagsCodeExample} from "./dm-tags-code-example";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";

@Component({
    selector: 'app-dm-tags-docs',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatTabsModule,
        ReactiveFormsModule,
        UploaderDocsComponent,
        TagsDocsComponent,
        DmTagsComponent,
        CodeExampleComponent,
        ComponentDocHeaderComponent
    ],
    templateUrl: './dm-tags-docs.component.html',
    styleUrl: './dm-tags-docs.component.scss'
})
export class DmTagsDocsComponent {
    form: UntypedFormGroup;

    protected readonly ENTER = ENTER;
    protected readonly COMMA = COMMA;
    protected readonly SEMICOLON = SEMICOLON;

    constructor(
        fb: UntypedFormBuilder,
    ) {
        this.form = fb.group({
            value: [null],
            config: fb.group({
                autocompleteOptions: [null],
                addOnKeycodes: [[ENTER]],
                addOnBlur: [true],
                allowDuplicates: [true],
            })
        });
    }
}
    `,styles:""};var me=n=>[n],Ke=(()=>{let a=class a{constructor(p){this.ENTER=13,this.COMMA=188,this.SEMICOLON=186,this.dmTagsCodeExample=te,this.form=p.group({value:[null],config:p.group({autocompleteOptions:[null],addOnKeycodes:[[13]],addOnBlur:[!0],allowDuplicates:[!0]})})}};a.\u0275fac=function(r){return new(r||a)(O(U))},a.\u0275cmp=s({type:a,selectors:[["app-dm-tags-docs"]],standalone:!0,features:[c],decls:48,vars:15,consts:[["title","Dominus tags","titleLink","https://www.npmjs.com/package/@ng-dominus/dm-tags"],["label","Overview"],[3,"code"],[3,"formGroup"],["formGroupName","config",1,"dm:grid"],[1,"dm:col-6"],["formControlName","autocompleteOptions"],["formControlName","addOnKeycodes",3,"multiple"],[3,"value"],["color","primary","formControlName","addOnBlur",1,"dm:col-6"],["color","primary","formControlName","allowDuplicates",1,"dm:col-6"],["formControlName","value",3,"autocompleteOptions","addOnKeycodes","addOnBlur","allowDuplicates"],["label","Api"]],template:function(r,m){if(r&1&&(o(0,"app-component-doc-header",0)(1,"p"),t(2,"Angular material based library that manages tags."),e()(),o(3,"mat-card")(4,"mat-card-content")(5,"mat-tab-group")(6,"mat-tab",1)(7,"mat-card-content")(8,"app-code-example",2)(9,"form",3)(10,"h3"),t(11,"Configuration"),e(),o(12,"section",4)(13,"mat-form-field",5)(14,"mat-label"),t(15,"autocompleteOptions"),e(),d(16,"dm-tags",6),e(),o(17,"mat-form-field",5)(18,"mat-label"),t(19,"addOnKeycodes"),e(),o(20,"mat-select",7)(21,"mat-option",8),t(22,"ENTER"),e(),o(23,"mat-option",8),t(24,"COMMA"),e(),o(25,"mat-option",8),t(26,"SEMICOLON"),e()()(),o(27,"mat-checkbox",9),t(28,"addOnBlur"),e(),o(29,"mat-checkbox",10),t(30,"allowDuplicates "),e()(),d(31,"br"),o(32,"h3"),t(33,"Result"),e(),o(34,"mat-form-field")(35,"mat-label"),t(36,"Tags"),e(),d(37,"dm-tags",11),e()(),d(38,"br")(39,"br"),o(40,"h3"),t(41,"Form Value"),e(),o(42,"pre"),t(43),v(44,"json"),e()()()(),o(45,"mat-tab",12)(46,"mat-card-content"),d(47,"app-tags-docs"),e()()()()()),r&2){let f,g,C,M,E;l(8),i("code",m.dmTagsCodeExample),l(1),i("formGroup",m.form),l(11),i("multiple",!0),l(1),i("value",m.ENTER),l(2),i("value",m.COMMA),l(2),i("value",m.SEMICOLON),l(12),i("autocompleteOptions",(f=m.form.get("config.autocompleteOptions"))==null?null:f.value)("addOnKeycodes",((g=m.form.get("config.addOnKeycodes"))==null?null:g.value)||b(13,me,m.ENTER))("addOnBlur",(C=m.form.get("config.addOnBlur"))==null?null:C.value)("allowDuplicates",(M=m.form.get("config.allowDuplicates"))==null?null:M.value),l(6),h(x(44,11,(E=m.form.get("value"))==null?null:E.value))}},dependencies:[u,y,F,D,T,q,V,R,B,w,N,S,H,j,z,P,W,_,A,k,I,K,L,G,ee,$,Q,J]});let n=a;return n})();export{Ke as DmTagsDocsComponent};
