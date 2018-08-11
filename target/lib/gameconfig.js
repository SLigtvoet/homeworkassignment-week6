"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
];
exports.colors = ["red", "blue", "green", "yellow", "magenta"];
exports.randomColor = () => {
    return exports.colors[Math.floor(Math.random() * 5)];
};
exports.moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
//# sourceMappingURL=gameconfig.js.map