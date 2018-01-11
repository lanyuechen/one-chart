import { uuid } from './common';

describe('common', () => {
  it('uuid', () => {
    expect(uuid() === uuid()).toBe(false);
    expect(uuid().length).toBe(24);
    expect(uuid('', 30).length).toBe(30);
    expect(uuid('', 50).length).toBe(36);
  });
});