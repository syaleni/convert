import {promises} from 'fs';
import {join as joinPaths} from 'path';
import {format} from 'prettier';
// @ts-ignore
import * as config from '../prettier.config';
import {unitFamilies} from '../src/unitFamilies';
import {typeNameFromUnit} from './util';

const {writeFile} = promises;

let file: string[] = [
	'// THIS IS AN AUTOGENERATED FILE, DO NOT EDIT MANUALLY',
	'// Also, if you know how to do the typesafety without a massive declaration file, PLEASE contact the authors!',
	'// We would love your advice on improving this!',
	'// Maybe this is useful? https://stackoverflow.com/a/45257357/10808983',
	'',
	"import {ConverterBody} from './common';",
	''
];

for (let [family, definition] of Object.entries(unitFamilies)) {
	file.push(
		`export type ${typeNameFromUnit(family)} = ${[definition.base.flat(), definition.conversions.flatMap(conversion => conversion.aliases.flat())]
			.flat()
			.map(alias => `'${alias}'`)
			.join(' | ')}`
	);
}

const allUnits = Object.keys(unitFamilies).map(unitFamily => typeNameFromUnit(unitFamily));

file.push(
	`export type AllUnits = ${allUnits.join(' | ')};`,
	'',
	'export interface Converter<Q> {',
	allUnits.map(unit => `from(fromUnit: ${unit}): ConverterBody<${unit}, Q>`).join('\n'),
	'}'
);

const path = joinPaths(__dirname, '..', 'types', 'units.d.ts');

writeFile(path, format(file.join('\n'), {...config, filepath: path}));
