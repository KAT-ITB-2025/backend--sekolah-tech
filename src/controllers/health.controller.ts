import { getHealthMessage } from '~/repositories/health.repository';
import { getHealthStatusRoute } from '~/routes/health.route';
import { createRouter } from '~/utils/router-factory';

export const healthRouter = createRouter();

healthRouter.openapi(getHealthStatusRoute, async (c) => {
  try {
    const msg = await getHealthMessage();
    return c.json({ message: msg }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
