import { STORAGE_KEY } from '../shared/constants';
import { IData, IMock, requestType } from '../shared/type';
import { compileJsCode } from '../shared/utils/eval-jscode';
import { findActiveData } from '../shared/utils/find-mock'
import * as fetchUtils from '../shared/utils/fetch';

const ORIG_FETCH = window.fetch;
const OhMyFetch = (url, config: { method?: requestType } = {}) => {
  const { method = 'GET' } = config;
  const data: IData = findActiveData(window[STORAGE_KEY].state, url, 'FETCH', method);
  const mock: IMock = data?.mocks[data?.activeStatusCode];

  if (mock) {
    window[STORAGE_KEY].hitSubject.next({
      url: url,
      method: 'FETCH',
      type: method,
      statusCode: data.activeStatusCode
    });

    return new Promise(async(resolv, reject) => {
      try {
        const respMock = await compileJsCode(mock.jsCode)({
          response: mock.responseMock,
          headers: mock.headersMock,
          delay: mock.delay,
          statusCode: data.activeStatusCode }, config);
        const body = new Blob([respMock.response], { type: respMock.headers['content-type'] });

        const response = new Response(body, {
          headers: fetchUtils.jsonToHeaders(respMock.headers),
          status: respMock.statusCode
        });

        setTimeout(() => resolv(response), respMock.delay);
      } catch (err) {
        reject(err);
      }
    });
  } else {
    return ORIG_FETCH(url, config).then(response => {
      if (!data || !data.mocks[response.status]) {
        const clone = response.clone();

        clone.text().then(txt => {
          window[STORAGE_KEY].newMockSubject.next({
            context: {
              url,
              method: 'FETCH',
              type: method,
              statusCode: response.status
            },
            data: {
              response: txt,
              headers: fetchUtils.headersToJson(response.headers)
            }
          });
        });
      }

      return response;
    });
  }
}

export { OhMyFetch };
