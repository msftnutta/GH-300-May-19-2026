import { jest } from '@jest/globals';

describe('config', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.PORT;
  });

  it('defaults PORT to 3000 when not set', async () => {
    const { config } = await import('../src/config.js');
    expect(config.port).toBe(3000);
  });

  it('uses PORT from environment when set', async () => {
    process.env.PORT = '4567';
    const { config } = await import('../src/config.js');
    expect(config.port).toBe(4567);
  });
});
