// Mark as called by the `--required` node argument
import { REQUIRED } from '..';
(process as any)[REQUIRED] = true;

// Execution for side effects only
import { execute } from '../lib';
execute();