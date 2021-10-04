import { AccountBalancePipe } from './account-balance.pipe';

describe('AccountBalancePipe', () => {
  it('create an instance', () => {
    const pipe = new AccountBalancePipe();
    expect(pipe).toBeTruthy();
  });
});
