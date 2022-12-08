const MAX_STAND_ID = 117;

export const getRandomStand: (notThisOne?: number) => number = (notThisOne?: number) => {
    const standNumber = Math.floor(Math.random() * (MAX_STAND_ID - 1) + 1);

    if (standNumber !== notThisOne) return standNumber;
    return getRandomStand(notThisOne);
}

export const getOptionsForVote = (): number[] =>  {
    const firstId = getRandomStand();
    const secondId = getRandomStand();

    return [firstId, secondId];
}