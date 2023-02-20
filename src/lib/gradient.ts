import { hash } from './hash';

type Direction = 'vertical' | 'horizontal' | 'diagonal' | 'antidiagonal';

function gaussianFunction(input: number, mean: number, sigma: number): number {
	const coef = 1 / (sigma * Math.sqrt(2 * Math.PI));
	const exp = Math.exp(-Math.pow(input - mean, 2) / (2 * Math.pow(sigma, 2)));
	return coef * exp;
}

function hashToHSL(hash: number): number[] {
	const h = hash % 359;
	const s = gaussianFunction(hash, 50, 5) / 100;
	const l = gaussianFunction(hash, 50, 5) / 100;
	return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
	const a = s * Math.min(l, 1 - l);
	const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
	return [(f(0) >> 16) & 255, (f(8) >> 8) & 255, f(4) & 255].join(',');
}

export function stringToAvatar(input: string, size: number, direction: Direction): string {
	const i1 = input.substring(0, input.length / 2);
	const i2 = input.substring(input.length / 2);
	const hash1 = hash(i1);
	const hash2 = hash(i2);
	const [h1, s1, l1] = hashToHSL(hash1);
	const c1 = hslToHex(h1, s1, l1);
	const [h2, s2, l2] = hashToHSL(hash2);
	const c2 = hslToHex(h2, s2, l2);
	let x1, y1, x2, y2: number;
	switch (direction) {
		case 'vertical':
			x1 = size / 2;
			y1 = 0;
			x2 = size / 2;
			y2 = size;
			break;
		case 'horizontal':
			x1 = 0;
			y1 = size / 2;
			x2 = size;
			y2 = size / 2;
			break;
		case 'diagonal':
			x1 = 0;
			y1 = 0;
			x2 = size;
			y2 = size;
			break;
		case 'antidiagonal':
			x1 = size;
			y1 = 0;
			x2 = 0;
			y2 = size;
			break;
	}
	return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#gradient)" />
    <defs>
      <linearGradient id="gradient" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse">
        <stop stop-color="${c1}" />
        <stop offset="1" stop-color="${c2}" />
      </linearGradient>
    </defs>
  </svg>`.trim();
}
