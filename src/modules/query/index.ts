import pick from 'lodash.pick';
import extract from './extractor';
import where from './filter';
import * as fsUtils from '../../utils/fs';
import limit from './limiter';
import load from './loader';
import distinct from './merger';
import * as netUtils from '../../utils/network';
import parse from './parser';
import Query from '../../models/query';
import Response from '../../models/response';
import order from './sorter';

export default async function run(query: string, options: Options): Promise<Response[]> {
  const queries: Query[] = parse(query);
  const responses: Response[] = await Promise.all(
    queries.map(async (query: Query) => {
      const start = Date.now();
      const browser = await load(query.website.url, options);
      try {
        const ipAddress = await netUtils.getIpAddress(new URL(query.website.url).hostname);
        const pageDescription = (await browser.getAttribute('head > meta[name="description"]', 'content') || [''])[0];
        const pageModified = await browser.executeScript(() => document.lastModified);
        const pageTitle = await browser.getTitle();
        const userAgent = await browser.getUserAgent();
        const data = await extract(browser, query);
        const dataFiltered = where(data, query.where);
        const dataOrdered = order(dataFiltered, query.order);
        const dataDistinct = distinct(dataOrdered, query.distinct);
        const dataLimited = limit(dataDistinct, query.limit);
        const properties = query.properties.map((property) => property.alias || property.name);
        const dataFinal = dataLimited.map((row) => pick(row, ...properties));
        const response = new Response(
          {
            userAgent,
            ...options,
          },
          {
            url: query.website.url,
            ip: ipAddress,
            name: query.website.alias,
            title: pageTitle,
            description: pageDescription,
            modified: pageModified as string,
          },
          {
            datetime: new Date(),
            statement: query.statement,
            screenshot: options.screenshot ? fsUtils.generateTempFilePath('png') : undefined,
            duration: Math.round((Date.now() - start) / 1000),
          },
          dataFinal,
        );

        options.screenshot && await browser.screenshot(response.meta.query.screenshot!);

        return response;
      }
      catch (error) {
        throw new Error(`Unable to run query: ${error}`);
      }
      finally {
        await browser.close();
      }
    })
  );

  return responses;
}
