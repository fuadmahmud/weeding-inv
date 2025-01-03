import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { MailOpen, Instagram, MapPin, Gift, CalendarHeart } from 'lucide-react';
import Braid from '@/assets/braid.jpg';
import Groom from '@/assets/groom.jpg';
import Width1 from '@/assets/width-1.jpg';
import Width2 from '@/assets/width-2.jpg';
import Width3 from '@/assets/width-3.jpg';
import Height1 from '@/assets/height-1.jpg';
import Height2 from '@/assets/height-2.jpg';
import Height3 from '@/assets/height-3.jpg';
import Height4 from '@/assets/height-4.jpg';
import Closing from '@/assets/closing.jpg';
import Card from './components/ui/card';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './components/ui/select';
import FlowerLottie from '@/assets/flower.json';
import Lottie from 'lottie-react';
import Timer from './components/ui/timer';

const IMAGE_ROW = [
  { alt: 'row-1', src: Width1 },
  { alt: 'row-2', src: Width2 },
  { alt: 'row-3', src: Width3 }
];

function App() {
  const [isSliding, setSliding] = useState(false);
  const targetDate = new Date('2025-03-31');
  const formattedDate = format(targetDate, 'EEEE dd MMMM yyyy', { locale: id });

  return (
    <>
      <div
        className={`
          bg-front-image bg-no-repeat bg-cover h-screen
          absolute top-0 left-0 w-full 
          transition-transform duration-700 ease-in-out
          ${isSliding ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className="flex flex-col items-center justify-center gap-2 h-full w-full bg-gradient-to-t to-50% from-black">
          <p>THE WEEDING OF</p>
          <p className="text-playwrite text-2xl">Gunawan & Novita</p>
          <p>Dear</p>
          <p>Nama Undangan</p>
          <Button
            className="bg-gold text-night"
            onClick={() => setSliding(true)}
          >
            <MailOpen /> Buka Undangan
          </Button>
        </div>
      </div>
      <div
        className={`
          min-h-screen w-full bg-eggshell
          transition-transform duration-700 ease-in-out
          ${isSliding ? 'visible' : 'hidden'}
        `}
      >
        {/* Heroes */}
        <div className="bg-heroes-image bg-no-repeat bg-cover bg-center h-screen w-full flex flex-col justify-end">
          <div className="h-1/2 bg-gradient-to-t from-white to-50%">
            <div className="p-4 text-left text-gold flex flex-col gap-4">
              <p>The Weeding Of</p>
              <p className="text-playwrite text-2xl">Gunawan & Novita</p>
              <p className="text-sm">
                We invite you to join and celebrate our weeding
              </p>
              <p>{formattedDate}</p>
              <a
                href="#date"
                className="w-max bg-gold rounded-3xl text-night mt-2 flex flex-row items-center py-2 px-4 gap-2 text-sm"
              >
                <CalendarHeart height={16} width={16} />
                Save the date
              </a>
            </div>

            <div className="curved-edge bg-gold h-20 flex flex-col items-center justify-center text-center text-playwrite text-lg text-night">
              <span className="animate-in slide-in-from-top hover:running duration-200">
                We're Getting Married 💞
              </span>
            </div>
          </div>
        </div>
        {/* Opening */}
        <div className="min-h-screen w-full flex flex-col items-center p-4 my-40 text-night">
          <p className="text-playwrite mb-4 text-xl">
            Assalamu'alaikum Wr. Wb.
          </p>
          <p className="text-sm">Tanpa mengurangi rasa hormat.</p>
          <p className="text-sm">
            Kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk
            menghadiri acara pernikahan kami:{' '}
          </p>
          {/* Female */}
          <div className="border-gold border-2 rounded-t-[64px] rounded-b-[64px] h-64 w-44 mt-6 overflow-hidden">
            <img src={Braid} alt="braid image" />
          </div>
          <p className="text-playwrite text-lg mt-4">Novita</p>
          <p className="text-sm mt-2">Putri ke-2 Bapak & Ibu</p>
          <a
            href="https://instagram.com"
            referrerPolicy="no-referrer"
            target="_blank"
            className="bg-gold rounded-lg flex items-center justify-center h-5 w-5 mt-2"
          >
            <Instagram height={12} width={12} />
          </a>
          <span className="text-playwrite text-lg my-6">&</span>
          {/* Male */}
          <div className="border-gold border-2 rounded-t-[64px] rounded-b-[64px] h-64 w-44 overflow-hidden">
            <img src={Groom} alt="groom image" />
          </div>
          <p className="text-playwrite text-lg mt-4">Gunawan Paramita Putera</p>
          <p className="text-sm mt-2">Putri pertama Bapak & Ibu</p>
          <a
            href="https://instagram.com"
            referrerPolicy="no-referrer"
            target="_blank"
            className="bg-gold rounded-lg flex items-center justify-center h-5 w-5 mt-2"
          >
            <Instagram height={12} width={12} />
          </a>
          <div></div>
        </div>
        {/* Date */}
        <div
          id="date"
          className="bg-gold flex flex-col justify-center items-center gap-4 px-4 py-40 text-night"
        >
          <p className="text-playwrite text-xl">Save The Date</p>
          <p>
            Dan Kami bersyukur, dipertemukan Allah diwaktu terbaik, Kini kami
            menanti hari istimewa kami.
          </p>
          <div className="w-full">
            <Timer targetDate="2025-03-31" />
          </div>
        </div>
        {/* Akad & Resepsi */}
        <div className="w-4/5 text-night border-gold border-double border-4 mx-auto rounded flex flex-col items-center justify-center my-40">
          <div className="py-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-playwrite text-xl">Akad Nikah</p>
              <p>{formattedDate}</p>
              <p className="text-sm">Pukul 10.00 WIB</p>
              <p className="text-sm">Kemayoran Jakarta Pusat</p>
              <Button className="w-max rounded-xl">
                <MapPin />
                Lihat lokasi
              </Button>
            </div>
            <Lottie
              className="h-48 w-48"
              animationData={FlowerLottie}
              loop
              autoPlay
            />
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-playwrite text-xl">Resepsi</p>
              <p>{formattedDate}</p>
              <p className="text-sm">Pukul 10.00 WIB</p>
              <p className="text-sm">Kemayoran Jakarta Pusat</p>
              <Button className="w-max rounded-xl">
                <MapPin />
                Lihat lokasi
              </Button>
            </div>
          </div>
        </div>
        {/* Gallery */}
        <div className="bg-gold p-4 py-40 text-night">
          <p className="text-playwrite text-xl mb-12">Gallery</p>
          <p>
            Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu
            mengingat (kebesaran Allah).
          </p>
          <p className="mb-9">- QS. Az-Zariyat 49 -</p>
          {IMAGE_ROW.map(item => (
            <img
              src={item.src}
              key={item.alt}
              alt={'gallery' + item.alt}
              className="h-56 w-full rounded-lg mt-3"
            />
          ))}
          <div className="flex flex-row items-center justify-between">
            <img
              src={Height1}
              alt="gallery-img-3"
              className="h-64 w-[47.5%] rounded-lg mt-3 object-cover"
              loading="lazy"
            />
            <img
              src={Height2}
              alt="gallery-img-3"
              className="h-64 w-[47.5%] rounded-lg mt-3 object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <img
              src={Height3}
              alt="gallery-img-3"
              className="h-64 w-[47.5%] rounded-lg mt-3 object-cover"
              loading="lazy"
            />
            <img
              src={Height4}
              alt="gallery-img-3"
              className="h-64 w-[47.5%] rounded-lg mt-3 object-cover"
              loading="lazy"
            />
          </div>
        </div>
        {/* Gift */}
        <div className="flex flex-col items-center justify-center p-4 text-night my-40">
          <p className="text-playwrite text-xl mb-12">Amplop Digital</p>
          <div className="mb-4">
            <p>
              Doa Restu Anda merupakan <br />
              karunia yang sangat berarti bagi kami. Dan jika memberi adalah
              ungkapan tanda kasih Anda, Anda dapat memberi kado secara
              cashless.
            </p>
          </div>

          <Button className="w-max">
            <Gift />
            Kirim Hadiah
          </Button>
          <div className="mt-4">
            <Card />
          </div>
        </div>
        {/* Ucapan */}
        <div className="bg-gold p-4 py-40 text-night flex flex-col items-center justify-center">
          <p className="text-playwrite xl mb-12">Ucapkan Sesuatu</p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-center bg-green-300 p-4 font-bold w-[45%] h-24 text-center rounded">
              10
              <br /> Hadir
            </div>
            <div className="flex items-center justify-center bg-red-300 p-4 font-bold w-[45%] h-24 text-center rounded">
              1<br /> Tidak Hadir
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 mt-4">
            <Input placeholder="Nama" className="bg-eggshell" />
            <Textarea
              placeholder="Komentar"
              maxLength={360}
              className="bg-eggshell"
            />
            <Select>
              <SelectTrigger className="bg-eggshell">
                <SelectValue placeholder="Konfirmasi kehadiran" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="yes">Hadir</SelectItem>
                  <SelectItem value="no">Tidak Hadir</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-3">Kirim</Button>
        </div>
        {/* Closing */}
        <div className="flex flex-col items-center justify-center px-4 py-40 text-night gap-3">
          <div className="border-gold border-2 rounded-t-[64px] rounded-b-[64px] h-64 w-44 mt-6 overflow-hidden">
            <img src={Closing} alt="closing image" />
          </div>
          <p className="text-sm mt-12">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
            kehadiran dan doa restunya, kami mengucapkan terima kasih.
          </p>
          <p className="text-playwrite">Wassalamu'alaikum Wr. Wb.</p>
          <p className="text-playwrite text-xl">Gunawan & Novita</p>
        </div>
        {/* Footer */}
        <div className="text-night py-10">
          <span>
            Made with ❤️ by{' '}
            <a
              href="https://fuadmahmud.dev"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              fmd.my.id
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
