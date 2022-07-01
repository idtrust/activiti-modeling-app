/*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TabModel, TranslationMock, TranslationService } from '@alfresco/adf-core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TabManagerEntityService } from '../components/tab-manager/tab-manager-entity.service';
import { TabManagerService } from './tab-manager.service';


describe('TabManagerService', () => {
    let service: TabManagerService;
    let entityService: TabManagerEntityService;
    const entitySubject = new BehaviorSubject<TabModel[]>([]);
    const fakeTabModel: TabModel = <TabModel> {id: 'id-1', title: 'new-name'};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: TranslationService, useClass: TranslationMock },
                {
                    provide: TabManagerEntityService, useValue: {
                        updateOneInCache: jest.fn(),
                        entities$: entitySubject
                    }
                }
            ]
        });

        service = TestBed.inject(TabManagerService);
        entityService = TestBed.inject(TabManagerEntityService);
    });

    it('should not update title when tab is not found in tabs registry', (done) => {
        service.getTabs().subscribe(() => {
            service.updateTabTitle('new-name', 'id-1');
            expect(entityService.updateOneInCache).not.toHaveBeenCalled();
            done();
        });
    });

    it('should not update title when tab title has not been changed', (done) => {
        entitySubject.next([fakeTabModel]);
        service.getTabs().subscribe(() => {
            service.updateTabTitle('new-name', 'id-1');
            expect(entityService.updateOneInCache).not.toHaveBeenCalled();
            done();
        });
    });

    it('should update title when tab is found in tabs registry', (done) => {
        entitySubject.next([fakeTabModel]);
        service.getTabs().subscribe(() => {
            service.updateTabTitle('new-name-changed', 'id-1');
            expect(entityService.updateOneInCache).toHaveBeenCalledWith({id: 'id-1', title: 'new-name-changed'});
            done();
        });
    });

});
