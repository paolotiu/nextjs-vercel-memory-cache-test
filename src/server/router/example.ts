import { createRouter } from './context';
import { z } from 'zod';
import cache from 'memory-cache';

const exampleResponse = 'Hey';
export const exampleRouter = createRouter()
  .query('hello', {
    resolve({ input }) {
      const cached = cache.get('test');
      if (cached) {
        return {
          cached: true,
          message: cached,
        };
      }

      cache.put('test', exampleResponse);

      return {
        cached: false,
        message: 'Hey; not cached',
      };
    },
  })
  .mutation('purge', {
    resolve() {
      cache.clear();
      return {};
    },
  });
