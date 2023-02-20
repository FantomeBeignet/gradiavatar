import crypto from 'node:crypto';

export function hash(data: string): number {
	const hash = crypto.createHash('sha256');
	hash.update(data);
	return parseInt(hash.digest('hex').slice(0, 8), 16);
}
