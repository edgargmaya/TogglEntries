/* Express Router */
import { Router } from 'express'


/* Controllers */
import { getIssues } from '../controllers/issues.controller'
import { getIssuesV2, updateCache } from '../controllers/issues_v2.controller'


/* Router */
const router = Router();

router.route('/v1/projects/:projectId/issues')
    .get(getIssues);

router.route('/v2/projects/:projectId/issues')
    .get(getIssuesV2);

router.route('/v2/update')
    .get(updateCache);

export default router;