import { decode } from 'blurhash';

export function getDataUrlFromArr(
  arr: Uint8ClampedArray,
  width: number,
  height: number,
) {
  if (typeof width === 'undefined' || typeof height === 'undefined') {
    width = height = Math.sqrt(arr.length / 4);
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  if (ctx) {
    const imgData = ctx.createImageData(width, height);
    imgData.data.set(arr);
    ctx.putImageData(imgData, 0, 0);

    return canvas.toDataURL();
  }
  return '';
}

export function decodeBlurHash(hash: string, width: number, height: number) {
  return getDataUrlFromArr(decode(hash, width, height), width, height);
}
