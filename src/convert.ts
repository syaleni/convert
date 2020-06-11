import {ReadonlyDeep} from 'type-fest';
import {AllUnits, Converter} from '../types/units';
import {families} from './unitFamilies';
import {invariant} from './util';

/**
 * A conversion between a unit.
 */
export interface Unit<T = unknown> {
	/**
	 * The base unit.
	 * @example ['second', 'seconds', 's']
	 */
	base: readonly T[];
	/** The conversion ratios for this unit. */
	conversions: readonly {
		/**
		 * Aliases for this ratio.
		 * @example ['minute', 'minutes', 'm']
		 */
		aliases: readonly string[];
		/**
		 * The ratio as expressed in units of the base unit. For example, you express `1` second in minutes as `1 / 60` minutes.
		 * @example 1 / 60
		 */
		ratio: number;
	}[];
}

/**
 * Get the conversion ratio to the base unit of a `Unit`
 * @param unit The unit to get the conversion ratio from
 * @param desiredConversion The conversion you are looking for
 *
 * @example
 * ```ts
 * conversionRatio(time, 'minutes');
 * // 1 / 60
 * ```
 */
function conversionRatio(unit: ReadonlyDeep<Unit>, desiredConversion: Readonly<string>): number {
	if (unit.base.includes(desiredConversion)) {
		return 1;
	}

	const found = unit.conversions.find(conversion => conversion.aliases.includes(desiredConversion));

	if (found) {
		return found.ratio;
	}

	const ratio = unit.base.includes(desiredConversion) ? 1 : unit.conversions.find(conversion => conversion.aliases.includes(desiredConversion))?.ratio;

	invariant(ratio !== undefined, `No conversion could be found for ${desiredConversion}`);

	return ratio;
}

/**
 * Convert from one unit to another.
 * @example convert(360).from('seconds').to('minutes');
 */
// export const convert = <T extends number | bigint>(quantity: T): Converter<T> => {
export const convert = (quantity: number) => {
	if (quantity === 0 || quantity === 0n) {
		return {from: () => ({to: (): typeof quantity => quantity})};
	}

	return {
		from: (fromUnit: AllUnits) => {
			let from: typeof fromUnit;
			let to: typeof fromUnit;

			from = fromUnit;

			const _unit = families.find(type => type.base.includes(from) || type.conversions.find(conversion => conversion.aliases.includes(from)));

			invariant(_unit, `No conversion could be found for ${from}`);

			const fromRatio = conversionRatio(_unit, from);

			return {
				to: (toUnit: typeof from): typeof quantity => {
					to = toUnit;

					if (to === from) {
						return quantity;
					}

					const toRatio = conversionRatio(_unit, to);

					const combinedRatio = (1 / fromRatio) * toRatio;

					if (typeof quantity === 'bigint') {
						try {
							// Note: BigInt support only works when you are converting integers (obviously)
							// If you tried converting 30 seconds into minutes it would fail since 0.5 minutes is not an integer

							const bigIntRatio = BigInt(combinedRatio);
							return quantity * bigIntRatio;
						} catch (error) {
							throw new TypeError(`Conversion ratio for ${from} to ${to} can't be expressed as an integer`);
						}
					}

					return quantity * combinedRatio;
				}
			};
		}
	};
};

const bruh = (num: number | bigint): typeof num => num;

const aNumber = bruh(10);

console.log(aNumber);
