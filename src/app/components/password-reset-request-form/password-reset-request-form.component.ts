import { Component, OnInit } from '@angular/core';

import { PasswordResetService } from '../../services/password-reset.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-name',
  templateUrl: './password-reset-request-form.component.html',
  styleUrls: ['./password-reset-request-form.component.css']
})
export class PasswordResetRequestFormComponent implements OnInit {
  error: string;
  email: string;

  constructor(
    private passwordResetService: PasswordResetService,
    private alert: AlertService) { }

  ngOnInit() { }

  requestResetLink() {
    this.passwordResetService.requestPasswordResetLink(this.email)
      .subscribe(
        (message) => this.alert.open(message, 'Okay'),
        (errorMessage) => this.error = errorMessage,
      );
  }
}