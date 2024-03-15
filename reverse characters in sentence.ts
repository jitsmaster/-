function reverseWords(sentence: string): string {
  const words = sentence.split(' ');
  const reversedWords = words.map(word => word.split('').reverse().join(''));
  return reversedWords.join(' ');
}

function reverseCharsInSentence(sentence: string): string {
  //old school 2 pointers approach
    let left = 0;
    let right = sentence.length - 1;
    let sentenceArray = sentence.split('');
    while(left< right) {
        [sentenceArray[left], sentenceArray[right]] = [sentenceArray[right], sentenceArray[left]];
        left++;
        right--;
    }

    return sentenceArray.join('');
}

function reverseWordsInSentence(sentence: string): string {
  //first reverse the characters in the sentence
  const reversedSentence = reverseCharsInSentence(sentence);
  //now just need to reverse each word, smart eh?
  return reversedSentence
    .split(' ')
    .map(word => reverseCharsInSentence(word))
    .join(' ');
}
