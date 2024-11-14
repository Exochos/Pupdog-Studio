// utils/generateName.js

export const maybeTruncate = (word, truncateChance = 0.25) => {
  if (Math.random() < truncateChance && word.length > 1) {
    const removeFromStart = Math.random() < 0.5;
    if (removeFromStart) {
      const truncatedWord = word.slice(1);
      console.log(`Truncated '${word}' to '${truncatedWord}' (removed first character)`);
      return truncatedWord;
    } else {
      const truncatedWord = word.slice(0, -1);
      console.log(`Truncated '${word}' to '${truncatedWord}' (removed last character)`);
      return truncatedWord;
    }
  }
  return word;
};

export const generateStartupName = (prefixes, middles, suffixes, {
  truncateChance = 0.25,
  prefixProb = 0.8,
  middleProb = 0.8,
  suffixProb = 0.8,
  minLength = 3,
  maxLength = 15
} = {}) => {
  let includePrefix = Math.random() < prefixProb;
  let includeMiddle = Math.random() < middleProb;
  let includeSuffix = Math.random() < suffixProb;

  // Ensure at least one segment is included
  if (!includePrefix && !includeMiddle && !includeSuffix) {
    const segment = Math.floor(Math.random() * 3);
    if (segment === 0) includePrefix = true;
    else if (segment === 1) includeMiddle = true;
    else includeSuffix = true;
  }

  const nameParts = [];

  if (includePrefix) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    nameParts.push(maybeTruncate(prefix, truncateChance));
  }

  if (includeMiddle) {
    const middle = middles[Math.floor(Math.random() * middles.length)];
    nameParts.push(maybeTruncate(middle, truncateChance));
  }

  if (includeSuffix) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    nameParts.push(maybeTruncate(suffix, truncateChance));
  }

  const name = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');

  if (name.length >= minLength && name.length <= maxLength) {
    return name;
  } else {
    // Retry if name does not meet length constraints
    return generateStartupName(prefixes, middles, suffixes, { truncateChance, prefixProb, middleProb, suffixProb, minLength, maxLength });
  }
};
