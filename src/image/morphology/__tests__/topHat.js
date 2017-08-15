import {Image} from 'test/common';
import 'should';
import Matrix from 'ml-matrix';

describe('check the top hat function', function () {
    it('check for GREY image 5x5', function () {
        let kernel = new Matrix([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
        let image = new Image(5, 5,
            [
                0, 0, 255, 0, 0,
                0, 255, 255, 255, 0,
                0, 255, 255, 255, 0,
                0, 255, 255, 255, 0,
                0, 0, 255, 0, 0
            ],
            {kind: 'GREY'}
        );

        Array.from(image.topHat({kernel: kernel}).data).should.eql(
            [
                255, 255, 0, 255, 255,
                255, 0, 0, 0, 255,
                255, 0, 0, 0, 255,
                255, 0, 0, 0, 255,
                255, 255, 0, 255, 255
            ]
        );
    });
    it('check for GREY image 5x5 2 iterations', function () {
        let kernel = new Matrix([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
        let image = new Image(5, 5,
            [
                0, 0, 255, 0, 0,
                0, 255, 255, 255, 0,
                0, 255, 255, 255, 0,
                0, 255, 255, 255, 0,
                0, 0, 255, 0, 0
            ],
            {kind: 'GREY'}
        );

        Array.from(image.topHat({kernel: kernel, iterations: 2}).data).should.eql(
            [
                0, 0, 255, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 255, 0, 0
            ]
        );
    });
});

