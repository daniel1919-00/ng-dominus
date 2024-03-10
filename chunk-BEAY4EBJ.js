import{a as je,b as He}from"./chunk-XIY5B67O.js";import{a as Ke,b as $e,c as We}from"./chunk-RHCG75QZ.js";import{b as Le}from"./chunk-7RQC3WJ4.js";import{a as Be,b as Ze}from"./chunk-4BM4YJHG.js";import{a as Ue,b as Te}from"./chunk-JV5R3LUJ.js";import{a as Ce,b as Ee,c as be,e as Me}from"./chunk-CMZAUZW2.js";import{g as we,i as Se,j as Ie,k as Oe,n as ye,o as Pe,p as Fe,q as De,r as ke,s as ze,u as Ne,x as qe,z as Qe}from"./chunk-YKGL6YIU.js";import{$ as I,$d as Ve,Ab as oe,Ba as W,Bb as le,Bd as xe,Ca as J,Db as re,Dd as _e,Eb as ae,Fa as Y,Fd as ve,Ia as u,Oa as C,P,Ta as o,Ua as e,Va as h,Vb as me,Wd as Ae,Xb as de,Xd as Re,Y as B,Ya as k,Yb as se,Yd as Ge,Za as z,_b as pe,_d as Xe,bb as M,bc as ue,ca as Z,cc as y,da as K,db as x,ea as F,f as X,fa as D,fc as T,gb as N,hb as t,hc as ce,ib as _,jb as ee,k as V,mb as te,nb as ie,qb as O,rb as v,rd as fe,sa as $,tb as U,ub as ne,vb as w,wb as S,wd as ge,ya as p,yd as he,z as Q,za as E}from"./chunk-Q6JA2GI5.js";import{e as b}from"./chunk-5FZOKLP6.js";var g=function(l){return l[l.NO_FILES_MSG=0]="NO_FILES_MSG",l[l.UNKNOWN_ERROR=1]="UNKNOWN_ERROR",l[l.INVALID_EXTENSION=2]="INVALID_EXTENSION",l[l.MAX_SIZE_EXCEEDED=3]="MAX_SIZE_EXCEEDED",l[l.ALLOWED_EXTENSIONS=4]="ALLOWED_EXTENSIONS",l[l.MAX_FILE_SIZE=5]="MAX_FILE_SIZE",l[l.IMAGE_SIZE_CHECK_FAILED=6]="IMAGE_SIZE_CHECK_FAILED",l[l.IMAGE_SIZE_CHECK_TEXT=7]="IMAGE_SIZE_CHECK_TEXT",l}(g||{}),Je=new B("Dominus uploader i18n strings");var et=(()=>{let a=class a{transform(i,r=1024,n=2){if(Math.abs(i)<r)return i+" bytes";let m=["kB","MB","GB","TB","PB"],s=m.length-1,f=-1,c=10**1;do i/=r,++f;while(Math.round(Math.abs(i)*c)/c>=r&&f<s);return i.toFixed(2)+" "+m[f]}};a.\u0275fac=function(r){return new(r||a)},a.\u0275pipe=Z({name:"dmFileSize",type:a,pure:!0,standalone:!0});let l=a;return l})();var st=["fileInput"];function pt(l,a){if(l&1&&(o(0,"label",11),t(1),e()),l&2){let d=x();p(1),_(d.label)}}function ut(l,a){if(l&1&&(o(0,"span",12),t(1),e()),l&2){let d=x();p(1),ee(" ",d.intl[d.DmUploaderIntl.ALLOWED_EXTENSIONS]+": "+d.allowedExtensionsText," ")}}function ct(l,a){if(l&1&&(o(0,"span",12),t(1),e()),l&2){let d=x();p(1),_(d.intl[d.DmUploaderIntl.IMAGE_SIZE_CHECK_TEXT]+": "+d.maxImageSizeText)}}var ft=(l,a)=>({file:l,isQueuedFile:!1,fileIndex:a});function gt(l,a){if(l&1&&k(0,13),l&2){let d=a.$implicit,i=a.index;x();let r=N(17);u("ngTemplateOutlet",r)("ngTemplateOutletContext",U(2,ft,d,i))}}var ht=(l,a)=>({file:l,isQueuedFile:!0,fileIndex:a});function xt(l,a){if(l&1&&k(0,13),l&2){let d=a.$implicit;x();let i=N(17);u("ngTemplateOutlet",i)("ngTemplateOutletContext",U(2,ht,d[1],d[0]))}}function _t(l,a){if(l&1&&h(0,"mat-progress-bar",24),l&2){let d=x().file;u("mode",d.progress>0?"determinate":"indeterminate")("value",d.progress||0)}}function vt(l,a){if(l&1){let d=z();o(0,"button",25),M("click",function(r){F(d);let n=x(),m=n.isQueuedFile,s=n.file,f=n.fileIndex,c=x();return r.stopPropagation(),D(m?c.removeFromQueue(s.id):c.removeFile(f))}),o(1,"mat-icon"),t(2,"delete"),e()()}}function Ct(l,a){if(l&1){let d=z();o(0,"button",26),M("click",function(r){F(d);let n=x().file,m=x();return r.stopPropagation(),D(m.retryUpload(n.id))}),o(1,"mat-icon"),t(2,"refresh"),e()()}}function Et(l,a){if(l&1&&h(0,"img",27),l&2){let d=x().file;u("src",d.imagePreviewUrl,$)}}var bt=(l,a,d)=>[l,a,d];function Mt(l,a){if(l&1&&(o(0,"div",14),C(1,_t,1,2,"mat-progress-bar",15),o(2,"div",16)(3,"div",17)(4,"span",18),t(5),e(),o(6,"span",19),t(7),w(8,"dmFileSize"),e()(),o(9,"div",20)(10,"div",17)(11,"span",18),t(12),e()(),C(13,vt,3,0,"button",21)(14,Ct,3,0,"button",22),e()(),C(15,Et,1,1,"img",23),e()),l&2){let d=a.file,i=a.isQueuedFile,r=x();u("ngClass",ne(11,bt,r.displayAs,r.showImagePreview&&d.imagePreviewUrl?"preview":"",i?d.error===""?"dm-uploader-success":"dm-uploader-error":"")),p(1),u("ngIf",i&&d.error===""),p(1),u("ngClass",d.error?"error":"success"),p(3),_(d.name),p(2),_(S(8,9,d.size||0)),p(5),_(d.error),p(1),u("ngIf",i&&d.error!==""||d.progress===void 0),p(1),u("ngIf",i&&d.error!==""&&d.canRetryUpload),p(1),u("ngIf",r.showImagePreview&&d.imagePreviewUrl)}}var tt=(()=>{let a=class a extends Ke{constructor(i,r,n,m,s){super(n),this.http=i,this.changeDetector=r,this.id=`dm-uploader-${a.nextId++}`,this.fileSaveEndpointRequestMethod="POST",this.fileDeleteEndpointRequestMethod="DELETE",this.label="",this.multiple=!1,this.displayAs="list",this.progressBarColor="primary",this.allowedExtensions=[],this.maxFileSize=5*1024*1024,this.showImagePreview=!0,this.uploadFinished=new J,this.containerClasses={"mat-form-field":!1,dragover:!1},this._value=[],this.lastFileId=0,this.filesQueue=new Map,this.maxImageSizeText="",this.allowedExtensionsText="",this.hasFiles=!1,this.DmUploaderIntl=g,this.viewInit=!1,s&&(this.containerClasses["mat-form-field"]=!0),this.intl=Object.assign({[g.NO_FILES_MSG]:"Drag&drop your files or click to browse",[g.UNKNOWN_ERROR]:"Upload Failed!",[g.INVALID_EXTENSION]:"Invalid file extension!",[g.MAX_SIZE_EXCEEDED]:"File size is too big!",[g.ALLOWED_EXTENSIONS]:"Allowed Extensions",[g.MAX_FILE_SIZE]:"Maximum file size",[g.IMAGE_SIZE_CHECK_FAILED]:"Maximum width or height exceeded.",[g.IMAGE_SIZE_CHECK_TEXT]:"Allowed image dimensions (HxW)"},m||{})}ngOnChanges(i){i.allowedExtensions&&(this.allowedExtensionsText=this.allowedExtensions.join(", ")),i.maxImageSize&&this.maxImageSize?.length&&(this.maxImageSizeText=this.maxImageSize.map(r=>r.height+"x"+r.width).join(", ")),this.viewInit&&(this.changeDetector.markForCheck(),this.stateChanges.next())}ngAfterViewInit(){this.viewInit=!0}openFilesInput(){this.fileInput.nativeElement.click()}get value(){return this._value}set value(i){i=i||[],Array.isArray(i)||(i=[i]),this._value=i,this.hasFiles=this._value.length>0,this.onChange(i),this.changeDetector.markForCheck(),this.stateChanges.next()}get shouldLabelFloat(){return!0}get empty(){return this.value.length===0}onFilesAdded(i){if(!(i&&i.length))return;let r=this.multiple?i:[i[0]];for(let n=r.length;n--;){let m=r[n];this.checkFile(m).then(s=>{let f={id:++this.lastFileId,name:m.name,progress:0,size:m.size,error:s,canRetryUpload:s==="",imagePreviewUrl:m.type.includes("image")?URL.createObjectURL(m):"",file:m};this.filesQueue.set(f.id,f),this.changeDetector.markForCheck(),s===""&&this.uploadFile(f).then()})}this.fileInput.nativeElement.value=""}uploadFile(i){return b(this,null,function*(){let r=new FormData,n=i.file;r.append("file",n);let m=this.fileSaveEndpointRequestHeaders instanceof Promise?yield this.fileSaveEndpointRequestHeaders:this.fileSaveEndpointRequestHeaders;this.http.request(this.fileSaveEndpointRequestMethod,this.fileSaveEndpoint,{reportProgress:!0,observe:"events",body:r,headers:m}).pipe(Q(()=>(i.error=this.intl[g.UNKNOWN_ERROR],i.progress=0,this.changeDetector.markForCheck(),V(null)))).subscribe(s=>{if(s)switch(s.type){case T.UploadProgress:i.progress=Math.floor(s.loaded/(s.total||1)*100),this.changeDetector.markForCheck();break;case T.Response:this.multiple||(this._value=[]);let f=this._value;f.push({name:n.name,size:n.size,type:n.type,imagePreviewUrl:n.type.includes("image")?URL.createObjectURL(n):"",data:s.body||{}}),this.removeFromQueue(i.id),this.value=f;break}})})}retryUpload(i){let r=this.filesQueue.get(i);if(r){if(!r.canRetryUpload){this.removeFromQueue(i);return}this.uploadFile(r).then()}}removeFile(i){return b(this,null,function*(){let r=this._value.splice(i,1)[0];if(this.fileDeleteEndpoint){let n=this.fileDeleteEndpointRequestHeaders instanceof Promise?yield this.fileDeleteEndpointRequestHeaders:this.fileDeleteEndpointRequestHeaders;this.http.request(this.fileDeleteEndpointRequestMethod,this.fileDeleteEndpoint,{body:[r],headers:n}).subscribe()}this.hasFiles=this._value.length>0,this.changeDetector.markForCheck()})}removeFromQueue(i){this.filesQueue.delete(i)}onDragOver(i){i.preventDefault(),i.stopPropagation(),this.containerClasses.dragover=!0,this.changeDetector.markForCheck()}onDragLeave(i){i.preventDefault(),i.stopPropagation(),this.containerClasses.dragover=!1,this.changeDetector.markForCheck()}onFilesDropped(i){let r=i.dataTransfer?.files;r&&(i.preventDefault(),i.stopPropagation(),this.onFilesAdded(r)),this.containerClasses.dragover=!1,this.changeDetector.markForCheck()}checkFile(i){return b(this,null,function*(){let r=this.allowedExtensions;if(r.length){let n=i.name.lastIndexOf("."),m;if(n<0)m=!1;else{let s=i.name.substring(n+1).toLowerCase();m=r.indexOf(s)!==-1}if(!m)return this.intl[g.INVALID_EXTENSION]}if(i.size>this.maxFileSize)return this.intl[g.MAX_SIZE_EXCEEDED];if(i.type.includes("image")&&this.maxImageSize?.length){let n=this.maxImageSize,m=yield this.getImageSize(URL.createObjectURL(i)),s=!0;for(let f=n.length;f--;){let c=n[f];if(c.width!==void 0&&c.height!==void 0&&c.width===m.width&&c.height===m.height){s=!1;break}else if(c.width!==void 0&&c.height===void 0&&c.width===m.width){s=!1;break}else if(c.height!==void 0&&c.width===void 0&&c.height===m.height){s=!1;break}}if(s)return this.intl[g.IMAGE_SIZE_CHECK_FAILED]}return""})}getImageSize(i){return b(this,null,function*(){return new Promise((r,n)=>{let m=new Image;m.onload=()=>{r({width:m.width,height:m.height})},m.onerror=()=>{n("Error loading image")},m.src=i})})}ngOnDestroy(){super.ngOnDestroy(),this.uploadFinished.complete()}};a.nextId=0,a.\u0275fac=function(r){return new(r||a)(E(ce),E(W),E(Se,10),E(Je,8),E(be,8))},a.\u0275cmp=I({type:a,selectors:[["dm-uploader"]],viewQuery:function(r,n){if(r&1&&le(st,5),r&2){let m;oe(m=re())&&(n.fileInput=m.first)}},inputs:{fileSaveEndpoint:"fileSaveEndpoint",fileSaveEndpointRequestMethod:"fileSaveEndpointRequestMethod",fileSaveEndpointRequestHeaders:"fileSaveEndpointRequestHeaders",fileDeleteEndpoint:"fileDeleteEndpoint",fileDeleteEndpointRequestMethod:"fileDeleteEndpointRequestMethod",fileDeleteEndpointRequestHeaders:"fileDeleteEndpointRequestHeaders",label:"label",multiple:"multiple",displayAs:"displayAs",progressBarColor:"progressBarColor",allowedExtensions:"allowedExtensions",maxFileSize:"maxFileSize",showImagePreview:"showImagePreview",maxImageSize:"maxImageSize",value:"value"},outputs:{uploadFinished:"uploadFinished"},standalone:!0,features:[ie([{provide:Ee,useExisting:a}]),Y,K,O],decls:18,vars:12,consts:[[1,"dm-uploader-container",3,"ngClass","dragover","dragleave","drop","click"],["class","dm-uploader-label",4,"ngIf"],[1,"dm-uploader-info"],[1,"dm-uploader-info-primary"],[1,"dm-uploader-info-secondary"],["class","dm-uploader-info-secondary-msg",4,"ngIf"],[1,"dm-uploader-files"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngFor","ngForOf"],["type","file",1,"dm-uploader-file-input",3,"accept","multiple","change"],["fileInput",""],["file",""],[1,"dm-uploader-label"],[1,"dm-uploader-info-secondary-msg"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"dm-uploader-file",3,"ngClass"],["class","dm-uploader-file-upload-progress",3,"mode","value",4,"ngIf"],[1,"dm-uploader-file-header",3,"ngClass"],[1,"dm-uploader-file-info"],[1,"dm-uploader-file-info-primary"],[1,"dm-uploader-file-info-secondary"],[1,"dm-uploader-file-info","actions"],["mat-mini-fab","","color","warn",3,"click",4,"ngIf"],["mat-mini-fab","","color","primary",3,"click",4,"ngIf"],["class","dm-uploader-file-preview","alt","",3,"src",4,"ngIf"],[1,"dm-uploader-file-upload-progress",3,"mode","value"],["mat-mini-fab","","color","warn",3,"click"],["mat-mini-fab","","color","primary",3,"click"],["alt","",1,"dm-uploader-file-preview",3,"src"]],template:function(r,n){r&1&&(o(0,"div",0),M("dragover",function(s){return n.onDragOver(s)})("dragleave",function(s){return n.onDragLeave(s)})("drop",function(s){return n.onFilesDropped(s)})("click",function(){return n.openFilesInput()}),C(1,pt,2,1,"label",1),o(2,"div",2)(3,"label",3),t(4),e(),o(5,"div",4),C(6,ut,2,1,"span",5),o(7,"span"),t(8),w(9,"dmFileSize"),e(),C(10,ct,2,1,"span",5),e()(),o(11,"div",6),C(12,gt,1,5,"ng-container",7)(13,xt,1,5,"ng-container",7),e()(),o(14,"input",8,9),M("change",function(s){return n.onFilesAdded(s.target.files)}),e(),C(16,Mt,16,15,"ng-template",null,10,ae)),r&2&&(u("ngClass",n.containerClasses),p(1),u("ngIf",n.label!==""),p(3),_(n.intl[n.DmUploaderIntl.NO_FILES_MSG]),p(2),u("ngIf",n.allowedExtensions.length),p(2),_(n.intl[n.DmUploaderIntl.MAX_FILE_SIZE]+": "+S(9,10,n.maxFileSize)),p(2),u("ngIf",n.maxImageSizeText),p(2),u("ngForOf",n._value),p(1),u("ngForOf",n.filesQueue.entries()),p(1),u("accept",n.allowedExtensions.length?"."+n.allowedExtensions.join(",."):null)("multiple",n.multiple))},dependencies:[y,me,de,se,pe,Re,Ae,ve,_e,et,He,je],styles:[".dm-uploader-container[_ngcontent-%COMP%]{display:flex;position:relative;flex-direction:column;box-sizing:border-box;color:inherit;padding:0}.dm-uploader-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], .dm-uploader-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:before, .dm-uploader-container[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:after{box-sizing:inherit}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-label[_ngcontent-%COMP%]{position:absolute;font-size:var(--dm-uploader-label-size, .84rem);top:.2rem;left:calc(var(--dm-uploader-padding, .4rem) * 2)}.dm-uploader-container[_ngcontent-%COMP%]:not(.mat-form-field){min-height:50px;border:1px solid var(--dm-uploader-border-color, #b0b1b2);border-radius:var(--dm-uploader-border-radius, .2rem);background:var(--dm-uploader-background, #F5F5F5);color:var(--dm-uploader-text-color, #4c4e53);padding:var(--dm-uploader-padding, .4rem)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-info[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:calc(var(--dm-uploader-padding, .4rem) * 2) var(--dm-uploader-padding, .4rem);color:inherit}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-info[_ngcontent-%COMP%]   .dm-uploader-info-primary[_ngcontent-%COMP%]{color:inherit;padding-right:.8rem}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-info[_ngcontent-%COMP%]   .dm-uploader-info-secondary[_ngcontent-%COMP%]{color:inherit;display:flex;flex-shrink:1;flex-direction:column;justify-items:center;font-size:.7rem}.dm-uploader-container.dragover[_ngcontent-%COMP%]{border-color:var(--dm-uploader-file-hover-border-color, cornflowerblue)}.dm-uploader-container.dragover[_ngcontent-%COMP%]   .dm-uploader-info[_ngcontent-%COMP%]   .dm-uploader-info-primary[_ngcontent-%COMP%], .dm-uploader-container.dragover[_ngcontent-%COMP%]   .dm-uploader-info[_ngcontent-%COMP%]   .dm-uploader-info-secondary[_ngcontent-%COMP%]{color:var(--dm-uploader-file-hover-text-color, cornflowerblue)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;max-height:var(--dm-uploader-files-container-max-height, 20rem);overflow-y:auto}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]{display:flex;align-items:flex-start;flex-direction:column;position:relative;border:1px solid var(--dm-uploader-file-border-color, #b0b1b2);border-radius:var(--dm-uploader-border-radius, .2rem)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.list[_ngcontent-%COMP%]{flex-shrink:0;width:100%;margin-top:.4rem}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.grid[_ngcontent-%COMP%]{flex-grow:0;flex-shrink:1;flex-basis:auto;margin:.4em}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:nowrap;width:100%;z-index:2;padding:var(--dm-uploader-padding, .4rem)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]   .dm-uploader-file-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]   .dm-uploader-file-info[_ngcontent-%COMP%]   .dm-uploader-file-info-primary[_ngcontent-%COMP%]{text-rendering:optimizeLegibility;font-weight:var(--dm-uploader-file-info-primary-font-weight, 500);font-size:var(--dm-uploader-file-info-primary-font-size, .9rem);padding:0 .4em}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]   .dm-uploader-file-info[_ngcontent-%COMP%]   .dm-uploader-file-info-secondary[_ngcontent-%COMP%]{text-rendering:optimizeLegibility;font-size:var(--dm-uploader-file-info-secondary-font-size, .7rem);padding:0 .4em}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]   .dm-uploader-file-info.actions[_ngcontent-%COMP%]{flex-wrap:nowrap;flex-direction:row;align-items:center}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]   .dm-uploader-file-info.actions[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{margin-left:.4rem}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.preview[_ngcontent-%COMP%]{height:var(--dm-uploader-file-preview-height, 14rem)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.preview[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]{background-color:var(--dm-uploader-file-preview-header-background-color-default, rgba(255, 255, 255, .6));color:var(--dm-uploader-file-preview-header-text-color-default, inherit)}@supports (-webkit-backdrop-filter: blur(.2em)) or (backdrop-filter: blur(.2em)){.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.preview[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(var(--dm-uploader-file-preview-header-overlay-blur, .18rem));backdrop-filter:blur(var(--dm-uploader-file-preview-header-overlay-blur, .18rem))}}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.dm-uploader-success.preview[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]{background-color:var(--dm-uploader-file-preview-header-background-color-success, rgba(25, 135, 84, .6));color:var(--dm-uploader-file-preview-header-background-color-success, white)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file.dm-uploader-error.preview[_ngcontent-%COMP%]   .dm-uploader-file-header[_ngcontent-%COMP%]{background-color:var(--dm-uploader-file-preview-header-background-color-error, rgba(220, 53, 69, .6));color:var(--dm-uploader-file-preview-header-background-color-error, white)}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-preview[_ngcontent-%COMP%]{position:absolute;object-fit:cover;width:100%;height:100%;inset:0}.dm-uploader-container[_ngcontent-%COMP%]   .dm-uploader-files[_ngcontent-%COMP%]   .dm-uploader-file[_ngcontent-%COMP%]   .dm-uploader-file-upload-progress[_ngcontent-%COMP%]{width:100%}.dm-uploader-file-input[_ngcontent-%COMP%]{display:none}"],changeDetection:0});let l=a;return l})();var it={html:`
<form [formGroup]="form">
    <h3>Configuration</h3>
    <section formGroupName="config" class="dm:grid">
        <mat-form-field class="dm:col-12">
            <mat-label>[allowedExtensions]</mat-label>
            <dm-tags formControlName="allowedExtensions"></dm-tags>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[label]</mat-label>
            <input type="text" matInput formControlName="label">
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[displayAs]</mat-label>
            <mat-select formControlName="displayAs">
                <mat-option value="list">list</mat-option>
                <mat-option value="grid">grid</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[multiple]</mat-label>
            <mat-select formControlName="multiple">
                <mat-option value="1">true</mat-option>
                <mat-option value="0">false</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[maxFileSize]</mat-label>
            <input type="number" matInput formControlName="maxFileSize">
        </mat-form-field>

        <mat-form-field class="dm:col-fixed">
            <mat-label>[showImagePreview]</mat-label>
            <mat-select formControlName="showImagePreview">
                <mat-option value="1">true</mat-option>
                <mat-option value="0">false</mat-option>
            </mat-select>
        </mat-form-field>
    </section>
    <br>
    <h3>Result</h3>
    <h5>Uploader with mat-form-field</h5>
    <mat-form-field class="dm:col-12">
        <mat-label>{{ form.get(['config', 'label'])?.value || '' }}</mat-label>
        <dm-uploader
            formControlName="value"
            [multiple]="form.get(['config', 'multiple'])?.value === '1'"
            [maxFileSize]="(form.get(['config', 'maxFileSize'])?.value || 5) * 1025 * 1024"
            [displayAs]="form.get(['config', 'displayAs'])?.value || 'list'"
            [allowedExtensions]="allowedExtensions"
            [maxImageSize]="maxImageSize"
            [showImagePreview]="form.get(['config', 'showImagePreview'])?.value === '1'"
            fileSaveEndpoint="https://localhost/uploader/upload"
            fileDeleteEndpoint="https://localhost/uploader/delete"></dm-uploader>
    </mat-form-field>
    <br>
    <h5>Uploader without mat-form-field</h5>
    <dm-uploader
        formControlName="value"
        [multiple]="form.get(['config', 'multiple'])?.value === '1'"
        [maxFileSize]="(form.get(['config', 'maxFileSize'])?.value || 5) * 1025 * 1024"
        [displayAs]="form.get(['config', 'displayAs'])?.value || 'list'"
        [label]="form.get(['config', 'label'])?.value || ''"
        [allowedExtensions]="allowedExtensions"
        [maxImageSize]="maxImageSize"
        [showImagePreview]="form.get(['config', 'showImagePreview'])?.value === '1'"
        fileSaveEndpoint="https://localhost/uploader/upload"
        fileDeleteEndpoint="https://localhost/uploader/delete"></dm-uploader>
</form>
<br><br>
<h3>Form Value</h3>
<pre>{{ form.get('value')?.value | json }}</pre>
    `,ts:`
import {Component, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {DmUploaderComponent} from "../../../../../dm-uploader/src/lib/dm-uploader.component";
import {UploaderDocsComponent} from "./uploader-docs/uploader-docs.component";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ComponentDocHeaderComponent} from "../../components/component-doc-header/component-doc-header.component";
import {CodeExampleComponent} from "../../components/code-example/code-example.component";
import {dmUploaderCodeExample} from "./dm-uploader-code-example";
import {DmTagsComponent} from "../../../../../dm-tags/src/lib/dm-tags.component";
import {Subject, takeUntil} from "rxjs";
import {DominusImageSize} from "../../../../../dm-uploader/src/lib/dm-uploader";

@Component({
    selector: 'app-dm-uploader-docs',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTabsModule,
        ReactiveFormsModule,
        DmUploaderComponent,
        UploaderDocsComponent,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        ComponentDocHeaderComponent,
        CodeExampleComponent,
        DmTagsComponent
    ],
    templateUrl: './dm-uploader-docs.component.html',
    styleUrl: './dm-uploader-docs.component.scss'
})
export class DmUploaderDocsComponent implements OnDestroy{
    form: UntypedFormGroup;

    protected allowedExtensions: string[] = ['txt', 'pdf', 'docx', 'xlsx', 'png', 'gif', 'jpg'];
    protected maxImageSize: DominusImageSize[] = [{width: 500, height: 500}];

    private readonly componentDestroyed$ = new Subject<void>();

    constructor(
        fb: UntypedFormBuilder,
    ) {
        this.form = fb.group({
            value: [[]],
            config: fb.group({
                multiple: ['1'],
                displayAs: ['list'],
                allowedExtensions: [['txt', 'pdf', 'docx', 'xlsx', 'png', 'gif', 'jpg']],
                maxFileSize: [5],
                showImagePreview: ['1'],
                label: ['Uploader preview']
            })
        });

        this.form.get(['config', 'allowedExtensions'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(value => {
                this.allowedExtensions = value.slice();
            });

        this.form.get(['config', 'type'])?.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(value => {
                if(value === 'image-uploader') {
                    this.form.get(['config', 'allowedExtensions'])?.setValue(['png', 'gif', 'jpg', 'jpeg']);
                } else {
                    this.form.get(['config', 'allowedExtensions'])?.setValue(['txt', 'pdf', 'docx', 'xlsx']);
                }
            });
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
    `,styles:""};var nt=()=>["config","label"],ot=()=>["config","multiple"],lt=()=>["config","maxFileSize"],rt=()=>["config","displayAs"],at=()=>["config","showImagePreview"],vi=(()=>{let a=class a{constructor(i){this.dmUploaderCodeExample=it,this.allowedExtensions=["txt","pdf","docx","xlsx","png","gif","jpg"],this.maxImageSize=[{width:500,height:500}],this.componentDestroyed$=new X,this.form=i.group({value:[[]],config:i.group({multiple:["1"],displayAs:["list"],allowedExtensions:[["txt","pdf","docx","xlsx","png","gif","jpg"]],maxFileSize:[5],showImagePreview:["1"],label:["Uploader preview"]})}),this.form.get(["config","allowedExtensions"])?.valueChanges.pipe(P(this.componentDestroyed$)).subscribe(r=>{this.allowedExtensions=r.slice()}),this.form.get(["config","type"])?.valueChanges.pipe(P(this.componentDestroyed$)).subscribe(r=>{r==="image-uploader"?this.form.get(["config","allowedExtensions"])?.setValue(["png","gif","jpg","jpeg"]):this.form.get(["config","allowedExtensions"])?.setValue(["txt","pdf","docx","xlsx"])})}ngOnDestroy(){this.componentDestroyed$.next(),this.componentDestroyed$.complete()}};a.\u0275fac=function(r){return new(r||a)(E(ze))},a.\u0275cmp=I({type:a,selectors:[["app-dm-uploader-docs"]],standalone:!0,features:[O],decls:166,vars:37,consts:[["title","Dominus uploader","titleLink","https://www.npmjs.com/package/@ng-dominus/dm-uploader"],["label","Overview"],[3,"code"],[3,"formGroup"],["formGroupName","config",1,"dm:grid"],[1,"dm:col-12"],["formControlName","allowedExtensions"],[1,"dm:col-fixed"],["type","text","matInput","","formControlName","label"],["formControlName","displayAs"],["value","list"],["value","grid"],["formControlName","multiple"],["value","1"],["value","0"],["type","number","matInput","","formControlName","maxFileSize"],["formControlName","showImagePreview"],["formControlName","value","fileSaveEndpoint","https://localhost/uploader/upload","fileDeleteEndpoint","https://localhost/uploader/delete",3,"multiple","maxFileSize","displayAs","allowedExtensions","maxImageSize","showImagePreview"],["formControlName","value","fileSaveEndpoint","https://localhost/uploader/upload","fileDeleteEndpoint","https://localhost/uploader/delete",3,"multiple","maxFileSize","displayAs","label","allowedExtensions","maxImageSize","showImagePreview"],["label","Api"],["label","Internationalization"],[1,"dm:quote"],[1,"dm:quote","code"],["label","Styling"]],template:function(r,n){if(r&1&&(o(0,"app-component-doc-header",0)(1,"p"),t(2,"Angular material based library that handles file uploads."),e()(),o(3,"mat-card")(4,"mat-card-content")(5,"mat-tab-group")(6,"mat-tab",1)(7,"mat-card-content")(8,"app-code-example",2)(9,"form",3)(10,"h3"),t(11,"Configuration"),e(),o(12,"section",4)(13,"mat-form-field",5)(14,"mat-label"),t(15,"[allowedExtensions]"),e(),h(16,"dm-tags",6),e(),o(17,"mat-form-field",7)(18,"mat-label"),t(19,"[label]"),e(),h(20,"input",8),e(),o(21,"mat-form-field",7)(22,"mat-label"),t(23,"[displayAs]"),e(),o(24,"mat-select",9)(25,"mat-option",10),t(26,"list"),e(),o(27,"mat-option",11),t(28,"grid"),e()()(),o(29,"mat-form-field",7)(30,"mat-label"),t(31,"[multiple]"),e(),o(32,"mat-select",12)(33,"mat-option",13),t(34,"true"),e(),o(35,"mat-option",14),t(36,"false"),e()()(),o(37,"mat-form-field",7)(38,"mat-label"),t(39,"[maxFileSize]"),e(),h(40,"input",15),e(),o(41,"mat-form-field",7)(42,"mat-label"),t(43,"[showImagePreview]"),e(),o(44,"mat-select",16)(45,"mat-option",13),t(46,"true"),e(),o(47,"mat-option",14),t(48,"false"),e()()()(),h(49,"br"),o(50,"h3"),t(51,"Result"),e(),o(52,"h5"),t(53,"Uploader with mat-form-field"),e(),o(54,"mat-form-field",5)(55,"mat-label"),t(56),e(),h(57,"dm-uploader",17),e(),h(58,"br"),o(59,"h5"),t(60,"Uploader without mat-form-field"),e(),h(61,"dm-uploader",18),e(),h(62,"br")(63,"br"),o(64,"h3"),t(65,"Form Value"),e(),o(66,"pre"),t(67),w(68,"json"),e()()()(),o(69,"mat-tab",19)(70,"mat-card-content"),h(71,"app-uploader-docs"),e()(),o(72,"mat-tab",20)(73,"mat-card-content")(74,"p"),t(75,"Internationalization can be achieved by using the "),o(76,"span",21),t(77,"DOMINUS_UPLOADER_INTL"),e(),t(78," injection token, and passing an object of strings using the "),o(79,"span",21),t(80,"DominusUploaderIntl"),e(),t(81," members as keys."),e(),o(82,"pre")(83,"code",22),t(84),e()()()(),o(85,"mat-tab",23)(86,"mat-card-content")(87,"p"),t(88,"Override colors using the following css variables:"),e(),o(89,"ul")(90,"li")(91,"span",21),t(92,"--dm-uploader-label-size"),e(),t(93,": Label font size"),e(),o(94,"li")(95,"span",21),t(96,"--dm-uploader-padding"),e(),t(97,": Uploader general padding"),e(),o(98,"li")(99,"span",21),t(100,"--dm-uploader-background"),e(),t(101,": Container background color"),e(),o(102,"li")(103,"span",21),t(104,"--dm-uploader-text-color"),e(),t(105,": Container text color"),e(),o(106,"li")(107,"span",21),t(108,"--dm-uploader-border-color"),e(),t(109,": Container border color"),e(),o(110,"li")(111,"span",21),t(112,"--dm-uploader-border-radius"),e(),t(113,": Uploader general border radius"),e(),o(114,"li")(115,"span",21),t(116,"--dm-uploader-file-hover-border-color"),e(),t(117,": Container border color on file hover"),e(),o(118,"li")(119,"span",21),t(120,"--dm-uploader-file-hover-text-color"),e(),t(121,": Container text color on file hover"),e(),o(122,"li")(123,"span",21),t(124,"--dm-uploader-files-container-max-height"),e(),t(125,": Container max height"),e(),o(126,"li")(127,"span",21),t(128,"--dm-uploader-file-border-color"),e(),t(129,": File container border color"),e(),o(130,"li")(131,"span",21),t(132,"--dm-uploader-file-preview-height"),e(),t(133,": File preview container height"),e(),o(134,"li")(135,"span",21),t(136,"--dm-uploader-file-info-primary-font-weight"),e(),t(137,": File container primary text font weight"),e(),o(138,"li")(139,"span",21),t(140,"--dm-uploader-file-info-primary-font-size"),e(),t(141,": File container primary text font size"),e(),o(142,"li")(143,"span",21),t(144,"--dm-uploader-file-info-secondary-font-size"),e(),t(145,": File container secondary text font size"),e(),o(146,"li")(147,"span",21),t(148,"--dm-uploader-file-preview-header-background-color-default"),e(),t(149,": File preview header default background color"),e(),o(150,"li")(151,"span",21),t(152,"--dm-uploader-file-preview-header-text-color-default"),e(),t(153,": File preview header default text color"),e(),o(154,"li")(155,"span",21),t(156,"--dm-uploader-file-preview-header-overlay-blur"),e(),t(157,": File preview header overlay blur strength"),e(),o(158,"li")(159,"span",21),t(160,"--dm-uploader-file-preview-header-background-color-success"),e(),t(161,": File preview header success background color"),e(),o(162,"li")(163,"span",21),t(164,"--dm-uploader-file-preview-header-background-color-error"),e(),t(165,": File preview header error background color"),e()()()()()()()),r&2){let m,s,f,c,A,R,L,j,H,q,G;p(8),u("code",n.dmUploaderCodeExample),p(1),u("formGroup",n.form),p(47),_(((m=n.form.get(v(27,nt)))==null?null:m.value)||""),p(1),u("multiple",((s=n.form.get(v(28,ot)))==null?null:s.value)==="1")("maxFileSize",(((f=n.form.get(v(29,lt)))==null?null:f.value)||5)*1025*1024)("displayAs",((c=n.form.get(v(30,rt)))==null?null:c.value)||"list")("allowedExtensions",n.allowedExtensions)("maxImageSize",n.maxImageSize)("showImagePreview",((A=n.form.get(v(31,at)))==null?null:A.value)==="1"),p(4),u("multiple",((R=n.form.get(v(32,ot)))==null?null:R.value)==="1")("maxFileSize",(((L=n.form.get(v(33,lt)))==null?null:L.value)||5)*1025*1024)("displayAs",((j=n.form.get(v(34,rt)))==null?null:j.value)||"list")("label",((H=n.form.get(v(35,nt)))==null?null:H.value)||"")("allowedExtensions",n.allowedExtensions)("maxImageSize",n.maxImageSize)("showImagePreview",((q=n.form.get(v(36,at)))==null?null:q.value)==="1"),p(6),_(S(68,25,(G=n.form.get("value"))==null?null:G.value)),p(17),te("@Component(","{",`
    ...
    providers: [`,"{",`
        provide: DOMINUS_UPLOADER_INTL,
        useValue: `,"{",`
            [DominusUploaderIntl.UNKNOWN_ERROR]: 'Upload Failed'
            ...
        `,"}",`
    `,"}",`]
`,"}",`)
export class UploaderDemoComponent `,"{",`
    ...
`,"}","")}},dependencies:[y,ue,xe,ge,he,Ve,Ge,Xe,Ne,ye,we,Pe,Ie,Oe,Fe,ke,De,tt,$e,Ze,Be,Me,Ce,Le,Te,Ue,fe,qe,Qe,We]});let l=a;return l})();export{vi as DmUploaderDocsComponent};
