import {ratioer} from '../util';

const PI = Math.PI;

/**
 * Conversions for angular units.
 * https://www.maplesoft.com/support/help/maple/view.aspx?path=Units/angle#:~:text=An%20angle%20symbolically%20has%20dimension,the%20radius%20equals%20the%20arclength.
 * @private
 */
export const angle = {
	radian: ratioer(1),
	radians: ratioer(1),
    rad: ratioer(1),

    degree: ratioer(PI/180),
    degrees: ratioer(PI/180),
    deg: ratioer(PI/180),

    // hour:ratioer(PI/12),
    // minute:ratioer((PI/12) / 60),
    // second:ratioer((PI/12) / 60 / 60),
}