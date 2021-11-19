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

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EntityProperty, JSONSchemaInfoBasics } from '../../../api/types';

@Component({
    template: `
            <modelingsdk-expression-code-editor
                [attr.data-automation-id]="'variable-value'"
                [expression]="value"
                (expressionChange)="onChange($event)"
                [variables]="autocompletionContext"
                [language]="'json'"
                [removeEnclosingBrackets]="false"
                [enableDialogEditor]="!disabled"
                [enableInlineEditor]="!disabled"
                [removeLineNumbers]="true"
                [lineWrapping]="false"
                [nonBracketedOutput]="false">
            </modelingsdk-expression-code-editor>
    `
})
export class PropertiesViewerJsonInputComponent {
    @Output() change = new EventEmitter();
    @Input() value: string;
    @Input() disabled = false;
    @Input() model: JSONSchemaInfoBasics | string;
    @Input() autocompletionContext: EntityProperty[] = [];

    onChange(value: string) {
        this.value = value;
        if (this.value && this.value.trim()) {
            try {
                JSON.parse(this.value);
            } catch (e) {
                return;
            }
            this.change.emit(this.value);
        } else {
            this.change.emit(null);
        }
    }
}
