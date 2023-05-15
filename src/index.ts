import Response from './models/response';
import run from './modules/main';

export = function wql(query: string, options = {} as Options): Promise<Response[]> {
  return run(query, options);
}
