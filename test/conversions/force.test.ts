import {convertAssert} from '../util';

describe('force', () => {
	convertAssert(1, 'kN', 1e3, 'N', true);
	convertAssert(1, 'kilonewtons', 1000, 'newtons', true);
	convertAssert(1, 'N', 1e-3, 'kilonewton', true);
	convertAssert(1, 'lbs', 4.4482, 'N', true);
	convertAssert(1, 'kips', 4448.22, 'N', true);
	convertAssert(1, 'kips', 1000, 'lbs', true);
	convertAssert(1, 'kips', 1000, 'lbs', true);
	convertAssert(1, 'kp', 9.80665, 'N', true);
	convertAssert(1, 'dyne', 1e-5, 'N', true);
	convertAssert(1, 'pdl', 0.138255, 'N', true);
});
