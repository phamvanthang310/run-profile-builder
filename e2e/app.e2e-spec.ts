import { RunprofileBuilderPage } from './app.po';

describe('runprofile-builder App', () => {
  let page: RunprofileBuilderPage;

  beforeEach(() => {
    page = new RunprofileBuilderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
