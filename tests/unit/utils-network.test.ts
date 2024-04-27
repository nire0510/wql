import * as netUtils from '../../src/utils/network';

describe('Network Utility', () => {
  test('getIpAddress - should return the right IP address of a hostname', async () => {
    const ip = await netUtils.getIpAddress('www.example.com');

    expect(['2606:2800:21f:cb07:6820:80da:af6b:8b2c', '93.184.215.14']).toContain(ip);
  });

  test('isUrlExists - should return true if URL does exists', async () => {
    const exampleExists = await netUtils.isUrlExists('https://www.example.com');
    const dummyExists = await netUtils.isUrlExists('https://www.1q2w3eewq123.com');

    expect(exampleExists).toBeTruthy();
    expect(dummyExists).toBeFalsy();
  });
});

