import { useState } from 'react';
import '../index.css';
import { Copy } from 'lucide-react';
import { Button } from './button';

export default function Card() {
  const cardNumber = '1234 5678 9101 1121';
  const [copied, setCopied] = useState(false);

  const writeClipboardText = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setCopied(true);
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    /* From Uiverse.io by satyamchaudharydev */
    <div className="card work">
      <div className="img-section text-gold flex flex-row items-center justify-between px-2">
        <p>Bank BCA</p>
        {copied && <p className="text-sm">Copied!</p>}
      </div>
      <div className="card-desc">
        <div className="card-header">
          <div className="card-title">Gunawan Paramita</div>
          <div className="card-menu">
            <Button variant="link" type="button" onClick={writeClipboardText}>
              <Copy height={16} width={16} />
            </Button>
          </div>
        </div>
        <div className="card-time">{cardNumber}</div>
      </div>
    </div>
  );
}
