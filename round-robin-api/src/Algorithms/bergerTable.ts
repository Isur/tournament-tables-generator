interface Pair {
    white: unknown,
    black: unknown,
}

interface Round {
    pairs: Pair[],
}

interface BergerResults {
    rounds: Round[],
}

export const BergerTable = (array: unknown[]): BergerResults => {
    const bergerClock = new BergerClock(array);
    return bergerClock.generateRound();
}

class BergerClock {
    private center: unknown;
    private top: unknown;
    private leftSide: unknown[];
    private rightSide: unknown[];

    public constructor(array: unknown[]) {
        if(array.length %2 !== 0) array.push('WAITING');
        this.center = array[array.length - 1];
        this.top = array[0];
        this.leftSide = [...array].splice(1, array.length / 2 - 1);
        this.rightSide = [...array].splice(array.length /2, array.length / 2 -1).reverse();
    }

    private buildPairs(withSwap: boolean): Round {
        const pairs = withSwap ? [{
            white: this.center,
            black: this.top,
        }] : [{
            white: this.top,
            black: this.center,
        }];
        for(let i = 0; i < this.leftSide.length; i++) {
            pairs.push({
                white: this.leftSide[i],
                black: this.rightSide[i],
            })
        }

        return { pairs };
    }

    private rotate() {
        const lastRight = this.rightSide.pop();
        this.leftSide.push(lastRight);
        const firstLeft = this.leftSide.shift();
        this.rightSide = [this.top, ...this.rightSide];
        this.top = firstLeft;
    }

    public generateRound(): BergerResults {
        const numOfRounds = this.leftSide.length + this.rightSide.length + 1;
        const rounds =  [];
        for(let i = 0; i < numOfRounds; i++) {
            rounds.push(this.buildPairs(i % 2 === 1));
            this.rotate();
        }
        return { rounds };
    }
}