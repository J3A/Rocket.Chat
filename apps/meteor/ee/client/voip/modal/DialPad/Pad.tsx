import { Box } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

import PadButton from './PadButton';

export type PadDigit = [string, string];

const digits: PadDigit[] = [
	['1', ''],
	['2', 'ABC'],
	['3', 'DEF'],
	['4', 'GHI'],
	['5', 'JKL'],
	['6', 'MNO'],
	['7', 'PQRS'],
	['8', 'TUV'],
	['9', 'WXYZ'],
	['*', ''],
	['0', '+'],
	['#', ''],
];

const Pad = ({
	onClickPadButton,
	onLongPressPadButton,
}: {
	onClickPadButton: (digit: PadDigit) => void;
	onLongPressPadButton: (digit: PadDigit) => void;
}): ReactElement => (
	<Box display='flex' flexWrap='wrap' mi='-8px' mbs='28px'>
		{digits.map((digit, idx) => (
			<PadButton key={idx} onClickPadButton={onClickPadButton} onLongPressPadButton={onLongPressPadButton}>
				{digit}
			</PadButton>
		))}
	</Box>
);

export default Pad;
