import { useEffect, useRef, useState } from 'react';

type ReturnTuple = [
	string,
	number,
	React.MutableRefObject<HTMLElement>,
	React.MutableRefObject<HTMLElement>
];

const useMinHeight = (): ReturnTuple => {
	const [clearance, setClearance] = useState<string>('calc(100vh - 0px)');
	const [margin, setMargin] = useState<number>(92);

	const upper = useRef<HTMLElement>(null);
	const lower = useRef<HTMLElement>(null);

	useEffect(() => {
		const offset = upper.current.offsetHeight + lower.current?.offsetHeight;
		setMargin(upper.current.offsetHeight);
		setClearance(`calc(100vh - ${offset}px)`);
	}, [upper, lower]);

	return [clearance, margin, upper, lower];
};

export default useMinHeight;
