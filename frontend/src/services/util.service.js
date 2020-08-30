export const utilService = {
	getRandomInt,
};

function getRandomInt(num1, num2) {
	var max = num1 >= num2 ? num1 + 1 : num2 + 1;
	var min = num1 <= num2 ? num1 : num2;
	return Math.floor(Math.random() * (max - min)) + min;
}
