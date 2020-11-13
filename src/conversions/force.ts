import {ratioer} from '../util';

const lbToN = 4.44822216152605; // pounds to newton
const kgfToN = 9.80665; // kilogram-force (or kilopond) to newton
const pdlToN = 0.138255; // poundal to newton
/**
 * Conversions for force.
 * https://en.wikipedia.org/wiki/Pound_(force)
 * @private
 */
export const force = {
	newton: ratioer(1),
	newtons: ratioer(1),
	N: ratioer(1),

	kilonewton: ratioer(1e3),
	kilonewtons: ratioer(1e3),
	kN: ratioer(1e3),

	kilopond: ratioer(kgfToN),
	kiloponds: ratioer(kgfToN),
	'kilogram-force': ratioer(kgfToN),
	kp: ratioer(kgfToN),
	kgf: ratioer(kgfToN),

	dyne: ratioer(1e-5),
	dynes: ratioer(1e-5),
	dyn: ratioer(1e-5),

	pound: ratioer(lbToN),
	pounds: ratioer(lbToN),
	lb: ratioer(lbToN),
	lbs: ratioer(lbToN),

	'pound-force': ratioer(lbToN),
	lbf: ratioer(lbToN),

	kilopound: ratioer(1e3 * lbToN),
	kilopounds: ratioer(1e3 * lbToN),
	kip: ratioer(1e3 * lbToN),
	kips: ratioer(1e3 * lbToN),

	poundal: ratioer(pdlToN),
	poundals: ratioer(pdlToN),
	pdl: ratioer(pdlToN)
};
