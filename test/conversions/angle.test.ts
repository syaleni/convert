import {convertAssert} from '../util';

describe('angle', () => {
	convertAssert(180, 'deg', Math.PI, 'rad', true);
	convertAssert(180, 'degree', Math.PI, 'rad', true);
    convertAssert(180, 'degrees', Math.PI, 'rad', true);
    
    convertAssert(180, 'deg', Math.PI, 'radian', true);
	convertAssert(180, 'degree', Math.PI, 'radian', true);
    convertAssert(180, 'degrees', Math.PI, 'radian', true);
    
    convertAssert(180, 'deg', Math.PI, 'radians', true);
	convertAssert(180, 'degree', Math.PI, 'radians', true);
    convertAssert(180, 'degrees', Math.PI, 'radians', true);
    
    convertAssert(1, 'rad', 57.2958, 'deg', true);
    convertAssert(1, 'radian', 57.2958, 'deg', true);
    convertAssert(1, 'radians', 57.2958, 'deg', true);

    convertAssert(1, 'rad', 57.2958, 'degree', true);
    convertAssert(1, 'radian', 57.2958, 'degree', true);
    convertAssert(1, 'radians', 57.2958, 'degree', true);

    convertAssert(1, 'rad', 57.2958, 'degrees', true);
    convertAssert(1, 'radian', 57.2958, 'degrees', true);
    convertAssert(1, 'radians', 57.2958, 'degrees', true);
});
