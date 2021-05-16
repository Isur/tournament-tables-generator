interface Pair {
    white: unknown,
    black: unknown,
}

interface Round {
    pairs: Pair[],
}

interface RoundRobinResult {
    rounds: Round[],
}

export const RoundRobin = (array: unknown[]): RoundRobinResult => {
    if(array.length % 2 !== 0) {
        array.push("WAITING");
    }
    const arrayLength = array.length;

    const rounds = [];
    let pairs;

    for(let i = 0; i < arrayLength -1; i++) {
        if(!pairs) pairs = [...array];
        pairs = shiftElements([...pairs]);
        const whites = [...pairs].splice(0, arrayLength / 2);
        const blacks = [...pairs].splice(-arrayLength / 2);

        rounds.push({ whites, blacks });
    }

    const result: RoundRobinResult = {
        rounds: [],
    };

    for(const round of rounds) {
        let pairs: Pair[] = [];
        for(let i = 0; i < round.whites.length; i++) {
            pairs.push({
                white: round.whites[i],
                black: round.blacks[i],
            });
        }
        result.rounds.push({ pairs });
    }

    return result;
}

const shiftElements = (array: unknown[], skip: number = 1) => {
    const lastElement = array.pop();
    array.splice(skip, 0, lastElement);
    return array;
}
