import '../index.css';
import { Copy } from 'lucide-react';
import BRILogo from '@/assets/bri.svg?react';
import BSILogo from '@/assets/bsi.svg?react';
import GopayLogo from '@/assets/gopay.svg?react';
import { useMemo, useState } from 'react';

export default function Card({
  number,
  name,
  valid,
  type,
}: {
  number: string;
  name: string;
  valid: string;
  type: string;
}) {
  const [copied, setCopy] = useState(false);

  const Logo = useMemo(() => {
    if (type === 'gopay') return GopayLogo;
    else if (type === 'bsi') return BSILogo;
    return BRILogo;
  }, [type]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(number);
      const timeout = setTimeout(() => {
        setCopy(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    /* From Uiverse.io by vinodjangid07 */
    <div className="visa-card">
      <div className="logoContainer">
        <Logo height={32} width={32} />
      </div>
      <div className="number-container">
        <label className="input-label" htmlFor="cardNumber">
          {type === 'gopay' ? 'PHONE' : 'CARD'} NUMBER
        </label>
        <div className="flex flex-row gap-3 items-center justify-center">
          <span className="inputstyle !h-auto">{number}</span>
          <Copy
            role="button"
            onClick={handleCopy}
            className="text-gold h-3 w-3"
          />
        </div>
      </div>

      <div className="name-date-cvv-container">
        <div className="name-wrapper">
          <label className="input-label" htmlFor="holderName">
            CARD HOLDER
          </label>

          <span className="inputstyle">{name}</span>
        </div>

        <div className="expiry-wrapper">
          <label className="input-label" htmlFor="expiry">
            VALID THRU
          </label>
          <span className="inputstyle">{valid}</span>
        </div>
        <div className="cvv-wrapper">
          <label className="input-label" htmlFor="cvv">
            CVV
          </label>
          <span className="inputstyle">{copied ? 'copied' : '***'}</span>
        </div>
      </div>
    </div>
  );
}
