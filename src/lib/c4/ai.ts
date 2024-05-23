export function alphabeta(
	node: AlphabetaNode,
	depth: number,
	alpha: number,
	beta: number,
	maximizingPlayer: boolean
): number {
	if (depth === 0 || node.isTerminal) {
		return node.heuristicValue;
	}

	if (maximizingPlayer) {
		let value = -Infinity;
		for (const child of node.children) {
			value = Math.max(value, alphabeta(child, depth - 1, alpha, beta, false));
			if (value > beta) {
				break;
			}
			alpha = Math.max(alpha, value);
		}
		return value;
	} else {
		let value = Infinity;
		for (const child of node.children) {
			value = Math.min(value, alphabeta(child, depth - 1, alpha, beta, true));
			if (value < alpha) {
				break;
			}

			beta = Math.min(beta, value);
		}
		return value;
	}
}

export interface AlphabetaNode {
	heuristicValue: number;
	isTerminal: boolean;
	children: AlphabetaNode[];
}

export function example() {
	// TODO: Make AlphabetaNode from C4Board state.
	// TODO: Implement alphabeta pruning.
	const node: AlphabetaNode = {
		heuristicValue: 0,
		isTerminal: false,
		children: []
	};

	const depth = 5;
	const alpha = -Infinity;
	const beta = Infinity;
	const maximizingPlayer = true;

	return alphabeta(node, depth, alpha, beta, maximizingPlayer);
}
