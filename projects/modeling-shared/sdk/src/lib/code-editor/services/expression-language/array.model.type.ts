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

import { ModelingType } from '../primitive-modeling-types.service';
import { jsonModelType } from './json.model.type';

export const arrayModelType: ModelingType = {
    id: 'array',
    collectionOf: 'json',
    properties: [[
        {
            property: 'length',
            type: 'integer',
            documentation: 'Return the number of elements in the array'
        }
    ], jsonModelType.properties].flat(),
    methods: jsonModelType.methods
};
