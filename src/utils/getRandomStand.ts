// Maximum ID for stand options
const MAX_STAND_ID = 117;

// Function to get a random stand ID. If an ID is passed as an argument, the function will keep generating random IDs until it gets one that doesn't match the argument.
export const getRandomStandId: (notThisOne?: number) => number = (
  notThisOne?: number
) => {
  const standNumber = Math.floor(Math.random() * MAX_STAND_ID + 1);

  if (standNumber !== notThisOne) return standNumber;
  return getRandomStandId(notThisOne);
};

// Function to get two unique stand IDs for voting options. If the first randomly generated ID matches the second, the function will generate a new first ID that doesn't match the second.
export const getOptionsForVote = (): number[] => {
  let firstId = getRandomStandId();
  const secondId = getRandomStandId();

  if (firstId === secondId) {
    firstId = getRandomStandId(firstId);
  }

  return [firstId, secondId];
};
