import { Component, inject, input } from '@angular/core';
import { GithubLabel } from '../../interfaces/github-label.interface';
import { NgClass, NgStyle } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [NgStyle],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {
  issuesService = inject(IssuesService);
  public labels = input.required<GithubLabel[]>();

  isSelectedLabel(label: string) {
    return this.issuesService.selectedLabels().has(label);
  }

  onToggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }
}
