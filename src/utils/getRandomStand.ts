const MAX_STAND_ID = 117;

export const getRandomStand: (notThisOne?: number) => number = (notThisOne?: number) => {
    const standNumber = Math.floor(Math.random() * (MAX_STAND_ID) + 1);

    if (standNumber !== notThisOne) return standNumber;
    return getRandomStand(notThisOne);
}

export const getOptionsForVote = (): number[] => {
    let firstId = getRandomStand();
    const secondId = getRandomStand();

    if (firstId === secondId) {
        firstId = getRandomStand(firstId);
    }

    return [firstId, secondId];
}