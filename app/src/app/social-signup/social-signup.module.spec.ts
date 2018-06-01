import { SocialSignupModule } from './social-signup.module';

describe('SocialSignupModule', () => {
  let socialSignupModule: SocialSignupModule;

  beforeEach(() => {
    socialSignupModule = new SocialSignupModule();
  });

  it('should create an instance', () => {
    expect(socialSignupModule).toBeTruthy();
  });
});
