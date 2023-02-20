import { hash } from './hash';

export type Direction = 'vertical' | 'horizontal' | 'diagonal' | 'antidiagonal';

function erfinv(x: number): number {
	const a = 0.147;
	const b = 2 / (Math.PI * a) + Math.log(1 - x ** 2) / 2;
	const sqrt1 = Math.sqrt(b ** 2 - Math.log(1 - x ** 2) / a);
	const sqrt2 = Math.sqrt(sqrt1 - b);
	return sqrt2 * Math.sign(x);
}

function remap(x: number, a: number, b: number, c: number, d: number): number {
	const y = ((x - a) * (d - c)) / (b - a) + c;
	return 0.5 + 0.1 * erfinv(2 * ((y - c) / (d - c)) - 1);
}

function hashToHSL(hash: number): number[] {
	const h = hash % 359;
	const x = hash % 100;
	const s = 1;
	const l = remap(x, 0, 100, 0, 1);
	return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
	h /= 360;
	let r, g, b;
	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		const hslToRGB = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hslToRGB(p, q, h + 1 / 3);
		g = hslToRGB(p, q, h);
		b = hslToRGB(p, q, h - 1 / 3);
	}
	const toHex = (x: number) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function stringToLinearGradient(input: string, size: number, direction: Direction): string {
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
