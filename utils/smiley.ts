export type Smiley = {
    number: number;
    value: string;
};
export type Smileys = Smiley[];

export const smileys: Smileys = [
    { number: 10, value: "😞" },
    { number: 25, value: "😊" },
    { number: 50, value: "😁" },
    { number: 75, value: "😄" },
    { number: 100, value: "😍" },
  ];

  
export const findClosestObject = (array: Smileys, number: any): Smiley => {
    return array.reduce((a, b, _currentIndex, array): Smiley => {
        let aNumber = typeof a == "object" ? a.number : a;
        let aDiff = Math.abs(aNumber - number);
        let bDiff = Math.abs(b.number - number);
        // blank object
        var result: number = 0;
        if (aDiff == bDiff) {
            // Choose largest vs smallest (> vs <)
            result = a.number > b.number ? b.number : aNumber;
        } else {
            result = bDiff < aDiff ? b.number : aNumber;
        }
        return (
            array.find((e) => e.number == result) ?? { number: 1, value: "😊" }
        );
    });
};