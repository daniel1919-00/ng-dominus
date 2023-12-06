import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DmTagsComponent} from './dm-tags.component';

describe('DmTagsComponent', () => {
    let component: DmTagsComponent;
    let fixture: ComponentFixture<DmTagsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DmTagsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DmTagsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
