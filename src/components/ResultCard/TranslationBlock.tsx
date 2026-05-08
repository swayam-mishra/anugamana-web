interface TranslationBlockProps {
  translation: string;
  userInput: string;
}

export function TranslationBlock({ translation, userInput }: TranslationBlockProps) {
  const words = translation.split(' ');
  const inputWords = userInput
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);

  return (
    <div className="flex-1">
      <p className="text-sm font-medium text-orange-700 mb-2">Translation</p>
      <p className="text-lg leading-relaxed text-gray-800">
        {words.map((word, i) => {
          const clean = word.toLowerCase().replace(/[.,!?;:]/g, '');
          const isMatch = inputWords.some((iw) => clean.includes(iw) || iw.includes(clean));
          return isMatch ? (
            <span key={i} className="bg-orange-200 px-1 rounded">
              {word}{' '}
            </span>
          ) : (
            word + ' '
          );
        })}
      </p>
    </div>
  );
}
