export function toTitleCase(string: string) {
  var sentence = string?.toLowerCase().split(' ');
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0]?.toUpperCase() + sentence[i]?.slice(1);
  }
  const formattedString = sentence?.join(' ');
  return formattedString;
}

export function convertHectogramToKilogram(hectogram: number) {
  return (hectogram / 10).toFixed(2);
}

export function convertDecimeterToCentimeter(decimeter: number) {
  return (decimeter * 10).toFixed(0);
}

export function getLimitedRandonNumber(minValue: number, maxValue: number) {
  return Number((Math.random() * (maxValue - minValue) + minValue).toFixed(2));
}

export function applyMaskMoneyBR(value: number, hiddenSymbol?: boolean) {
  return value === null || value === undefined
    ? '-'
    : hiddenSymbol
    ? value.toLocaleString('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}

export function fastCompareObjects<TObject1, TObject2>(object1: TObject1, object2: TObject2) {
  return JSON.stringify(object1) === JSON.stringify(object2);
}
