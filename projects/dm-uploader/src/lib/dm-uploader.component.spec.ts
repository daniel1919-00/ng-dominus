import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DmUploaderComponent} from './dm-uploader.component';

describe('DmUploaderComponent', () => {
    let component: DmUploaderComponent;
    let fixture: ComponentFixture<DmUploaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmUploaderComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DmUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
