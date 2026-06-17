import type { CartItem } from '@/types';
import { formatINR } from './utils';

export const WHATSAPP_NUMBER = '919999999999'; // <-- replace with the store's number

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry(name: string, size?: string, color?: string) {
  const msg = `Hi Maison Lumière 👋\n\nI'd like to order:\n• *${name}*${size ? `\n  Size: ${size}` : ''}${color ? `\n  Colour: ${color}` : ''}\n\nIs this in stock?`;
  return waLink(msg);
}

export function cartCheckout(items: CartItem[], total: number) {
  const lines = items
    .map((i, idx) => `${idx + 1}. ${i.name} (${i.size}/${i.color}) ×${i.quantity} — ${formatINR(i.price * i.quantity)}`)
    .join('\n');
  const msg = `Hi Maison Lumière 👋\n\nI'd like to place this order:\n\n${lines}\n\n*Total: ${formatINR(total)}*\n\nPlease confirm availability & delivery. Thank you!`;
  return waLink(msg);
}
