import { MemoryGamePage } from './app.po';

describe('memory-game App', () => {
  let page: MemoryGamePage;

  beforeEach(() => {
    page = new MemoryGamePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
