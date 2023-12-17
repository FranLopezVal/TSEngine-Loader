

import * as tse from 'enginets';

const _animation = new tse.Animation("down", [
    { timeExecution: 1, position: new tse.vector2(0, 0) },
    { timeExecution: 1, position: new tse.vector2(1, 0) },
    { timeExecution: 1, position: new tse.vector2(2, 0) },
    { timeExecution: 1, position: new tse.vector2(3, 0) }], 14, true);

const _animation2 = new tse.Animation("left", [
    { timeExecution: 1, position: new tse.vector2(0, 1) },
    { timeExecution: 1, position: new tse.vector2(1, 1) },
    { timeExecution: 1, position: new tse.vector2(2, 1) },
    { timeExecution: 1, position: new tse.vector2(3, 1) }], 14, false);

const _animation3 = new tse.Animation("right", [
    { timeExecution: 1, position: new tse.vector2(0, 2) },
    { timeExecution: 1, position: new tse.vector2(1, 2) },
    { timeExecution: 1, position: new tse.vector2(2, 2) },
    { timeExecution: 1, position: new tse.vector2(3, 2) }], 14, false);

const _animation4 = new tse.Animation("up", [
    { timeExecution: 1, position: new tse.vector2(0, 3) },
    { timeExecution: 1, position: new tse.vector2(1, 3) },
    { timeExecution: 1, position: new tse.vector2(2, 3) },
    { timeExecution: 1, position: new tse.vector2(3, 3) }], 14, false);



const DogoAnimations = [_animation, _animation2, _animation3, _animation4];

export { DogoAnimations };