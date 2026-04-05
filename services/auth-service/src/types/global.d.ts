/// <reference types="@clerk/express/env" />

declare module '@clerk/express';

import type { UserJSON } from '@clerk/express';

export interface webhookEvent extends UserJSON {
  id: string;
}
