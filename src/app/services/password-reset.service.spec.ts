import { TestBed, async } from '@angular/core/testing';
import { PasswordResetService } from './password-reset.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { apiBaseUrl } from '../../env';

describe('PasswordResetService', () => {
  let passwordResetService: PasswordResetService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetService],
      imports: [HttpClientTestingModule]
    });

    passwordResetService = TestBed.get(PasswordResetService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(async(() => {
    httpMock.verify();
  }));

  it('can request for password reset link', async(() => {
    const email = 'johndoe@gmail.com';
    const emailRequestResponse = { message: 'reset link has been sent to your email'};

    passwordResetService.requestPasswordResetLink(email)
      .subscribe((message) => expect(message).toEqual(emailRequestResponse.message));

    const request = httpMock.expectOne(`${apiBaseUrl}/passwords/reset?email=${email}`);
    expect(request.request.method.toLowerCase()).toEqual('get');

    request.flush(emailRequestResponse);
  }));

  it('can change password', async(() => {
      const password = 'pass';
      const resetResponse = { message: 'password reset successful ' }

      passwordResetService.resetPassword(password, password, 'auth token')
        .subscribe((message) => {
          expect(message).toEqual(resetResponse.message);
        });

      const request = httpMock.expectOne(`${apiBaseUrl}/passwords/reset`);

      expect(request.request.method.toLowerCase()).toEqual('put');
      expect(request.request.body).toEqual({password, confirm:  password});

      request.flush(resetResponse);
  }));
});
