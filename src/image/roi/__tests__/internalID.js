import { load } from 'test/common';

/* Image to test:
11111
10001
10101
10001
11111
 */
describe('we check the internalMapID', function () {
  it('should yield the right internalMapIDe', function () {
    return load('BW5x5.png').then(function (img) {
      let roiManager = img.getRoiManager();
      let mask = img.mask(0.5, { invert: true });
      roiManager.fromMask(mask);

      let rois = roiManager.getRois();

      rois.sort(function (a, b) {
        return a.mask.sizes[0] - b.mask.sizes[0];
      });

      expect(rois).toBeInstanceOf(Array);
      expect(rois).toHaveLength(3);
      expect(rois[0].mask.sizes).toEqual([1, 1]);
      expect(rois[1].mask.sizes).toEqual([3, 3]);
      expect(rois[2].mask.sizes).toEqual([5, 5]);

      expect(rois[0].internalIDs).toEqual([-2]);
      expect(rois[1].internalIDs).toEqual([1, -2]);
      expect(rois[2].internalIDs).toEqual([-1, 1, -2]);
    });
  });
});


describe('we check the internalMapID with complex image', function () {
  it('should yield the right internapMapIDs', function () {
    return load('BW15x15transparent.png').then(function (img) {
      let grey = img.grey({ allowGrey: true });
      let mask = grey.mask(0.5);

      let roiManager = img.getRoiManager();
      roiManager.fromMask(mask);

      let rois = roiManager.getRois();

      rois.sort(function (a, b) {
        return a.internalIDs[0] - b.internalIDs[0];
      });

      expect(rois).toBeInstanceOf(Array);
      expect(rois).toHaveLength(2);

      expect(rois[0].mask.sizes).toEqual([15, 15]);
      expect(rois[1].mask.sizes).toEqual([9, 2]);

      expect(rois[0].internalIDs).toEqual([-1, 1]);
      expect(rois[1].internalIDs).toEqual([1]);
    });
  });
});

