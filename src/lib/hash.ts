import crypto from 'node:crypto';

export function hash(data: string): [number, number] {
	const hash = crypto.createHash('sha256');
	hash.update(data);
	const hex = hash.digest('hex');
	return [parseInt(hex.slice(0, 16), 16), parseInt(hex.slice(16, 32), 16)];
}
