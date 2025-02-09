import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import {
  MailOpen,
  Instagram,
  MapPin,
  Gift,
  Play,
  Pause,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import Braid from '@/assets/braid.webp';
import Groom from '@/assets/groom.webp';
import Closing from '@/assets/closing.jpg';
import Card from './components/ui/card';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { id } from 'date-fns/locale';
import BackgroundMusic from '@/assets/backsound.mp3';
import Timer from './components/ui/timer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Gallery from './components/ui/gallery';
import Heroes from './components/ui/heroes';
import OurStory from '@/assets/our-story.webp';
import supabase from './lib/supabase';
import { PostgrestError, QueryData } from '@supabase/supabase-js';
import { Tables } from './lib/types';
import CommentForm from './components/ui/comment-form';

const ACCOUNTS = [
  {
    name: 'Gunawan P. Putera',
    valid: '04/25',
    number: '7206448053',
    type: 'bsi',
  },
  {
    name: 'Novita Sari',
    valid: '04/25',
    number: '0817-7677-9683',
    type: 'gopay',
  },
  {
    name: 'Novita Sari',
    valid: '04/25',
    number: '0434 0103 4655 503',
    type: 'bri',
  },
];

const queryComments = supabase
  .from('comment')
  .select()
  .order('id', { ascending: false });

type ResponseComments = QueryData<typeof queryComments>;

function App() {
  const [isSliding, setSliding] = useState(false);
  const [openGift, setOpenGift] = useState(false);
  const [played, setPlayed] = useState(false);
  const resepsiDate = new Date('2025-04-02');
  const targetDate =
    new Date() > new Date('2025-02-19') ? resepsiDate : new Date('2025-02-19');
  const formattedDate = format(targetDate, 'EEEE dd MMMM yyyy', { locale: id });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isTabActive, setIsTabActive] = useState(true);
  const [comments, setComments] = useState<{
    data: ResponseComments;
    error: PostgrestError | null;
    loading: boolean;
  }>({
    data: [],
    error: null,
    loading: false,
  });
  const [guest, setGuest] = useState<{
    data: Tables<'invite'> | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });
  const params = new URLSearchParams(location.search);
  const slug = params.get('tamu');

  const fetchComments = useCallback(async () => {
    setComments({ ...comments, loading: true });
    const { data, error } = await queryComments;
    if (error) {
      setComments({ data: [], error, loading: false });
    } else {
      setComments({ data, error, loading: false });
    }
  }, []);

  const fetchGuest = useCallback(async () => {
    if (slug) {
      const { data, error } = await supabase.rpc('get_invite', { slug });

      if (error) {
        setGuest({ data, error });
      } else {
        setGuest({ data, error });
      }
    }
  }, [slug]);

  const handleVisibilityChange = useCallback(() => {
    setIsTabActive(document.visibilityState === 'visible');
  }, []);

  useEffect(() => {
    AOS.init({
      disable: false,
      duration: 1000,
      delay: 200,
    });
    AOS.refresh();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    fetchComments();
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (slug) {
      fetchGuest();
    }
  }, [slug]);

  useEffect(() => {
    if (!isTabActive) setPlayed(false);
    if (played) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [played, audioRef, isTabActive]);

  return (
    <>
      <div
        className={`
          bg-front-image bg-center bg-no-repeat bg-cover inset-0 h-screen
          absolute top-0 left-0 w-full 
          transition-transform duration-700 ease-in-out
          ${isSliding ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className="flex flex-col items-center justify-center gap-2 h-full w-full bg-gradient-to-t to-50% from-black">
          <p>THE WEEDING OF</p>
          <p className="text-playwrite text-2xl">Gunawan & Novita</p>
          <p>Dear</p>
          <p>
            {guest.data
              ? `${
                  guest.data.salutation
                    ? guest.data.salutation + ' ' + guest.data.name
                    : guest.data.name
                }`
              : ''}
          </p>
          <Button
            className="bg-gold text-night hover:text-gold"
            onClick={() => {
              setSliding(true);
              setPlayed(true);
            }}
          >
            <MailOpen /> Buka Undangan
          </Button>
        </div>
      </div>
      <div
        className={`
          min-h-screen w-full bg-eggshell relative
          transition-transform duration-700 ease-in-out
          ${isSliding ? 'visible' : 'hidden'}
        `}
      >
        {/* Heroes */}
        <Heroes date={formattedDate} />
        {/* Opening */}
        <div className="min-h-screen w-full flex flex-col items-center p-4 my-40 text-night">
          <div data-aos="zoom-in-up">
            <p className="text-playwrite mb-4 text-xl">
              Assalamu'alaikum Wr. Wb.
            </p>
            <p className="text-sm">Tanpa mengurangi rasa hormat.</p>
            <p className="text-sm">
              Kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk
              menghadiri acara pernikahan kami:{' '}
            </p>
          </div>
          {/* Female */}
          <div
            className="border-gold border-2 relative rounded-t-[64px] rounded-b-[64px] h-64 w-44 mt-6 overflow-hidden"
            data-aos="zoom-in-up"
          >
            <img src={Braid} alt="braid image" />
          </div>
          <div
            className="flex flex-col items-center justify-center"
            data-aos="zoom-in-up"
          >
            <p className="text-playwrite text-lg mt-4">Novita Sari</p>
            <p className="text-sm mt-2">
              Putri Terakhir dari
              <br /> Bapak Karso & (Almh.) Ibu Sutri
            </p>
            <a
              href="https://instagram.com/_greenchoco"
              referrerPolicy="no-referrer"
              target="_blank"
              className="bg-gold rounded-lg flex items-center justify-center h-5 w-5 mt-2"
            >
              <Instagram height={12} width={12} />
            </a>
          </div>
          <span className="text-playwrite text-lg my-6">&</span>
          {/* Male */}
          <div
            className="border-gold border-2 relative rounded-t-[64px] rounded-b-[64px] h-64 w-44 mt-6 overflow-hidden"
            data-aos="zoom-in-up"
          >
            <img src={Groom} alt="groom image" />
          </div>
          <div
            className="flex flex-col items-center justify-center"
            data-aos="zoom-in-up"
          >
            <p className="text-playwrite text-lg mt-4">
              Gunawan Paramita Putera
            </p>
            <p className="text-sm mt-2">
              Putra Pertama dari
              <br /> Bapak Tri Subagio Putro & Ibu Umi Murtani
            </p>
            <a
              href="https://instagram.com/ggppnwn"
              referrerPolicy="no-referrer"
              target="_blank"
              className="bg-gold rounded-lg flex items-center justify-center h-5 w-5 mt-2"
            >
              <Instagram height={12} width={12} />
            </a>
          </div>
        </div>
        {/* Date */}
        <div id="date" className="bg-gold gap-4 px-4 py-20 text-night">
          <div
            className="flex flex-col justify-center items-center gap-3"
            data-aos="zoom-out-down"
          >
            <p className="text-playwrite text-xl">Save The Date</p>
            <p>
              Dan Kami bersyukur, dipertemukan Allah diwaktu terbaik, Kini kami
              menanti hari istimewa kami.
            </p>
            <div className="w-full">
              <Timer targetDate={targetDate} />
            </div>
          </div>
        </div>
        {/* Akad & Resepsi */}
        <div className="w-4/5 text-night border-gold border-double border-4 mx-auto rounded flex flex-col items-center justify-center my-20">
          <div className="py-8 flex flex-col gap-4" data-aos="zoom-in">
            <div className="flex flex-col gap-2 justify-center items-center px-4">
              <p className="text-playwrite text-xl">Akad & Tasyakuran</p>
              <p>{formattedDate}</p>
              <p className="text-sm">Pukul 12.00 - 17.00 WIB</p>
              <p className="text-xs">
                Jl Serdang Baru 8 No. 26 RT 002 RW 005 Kel. Serdang Kec.
                Kemayoran, Jakarta Pusat
              </p>
              <a
                href="https://maps.app.goo.gl/SQ5XC6VzHTBhJ6j59"
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-max rounded-2xl bg-night text-eggshell flex flex-row items-center px-3 py-2 gap-2 text-sm "
              >
                <MapPin height={12} width={12} />
                Lihat lokasi
              </a>
            </div>
            <div
              className="flex flex-col gap-2 justify-center items-center px-4"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <p className="text-playwrite text-xl">Resepsi</p>
              <p>{format(resepsiDate, 'EEEE dd MMMM yyyy', { locale: id })}</p>
              <p className="text-sm">Pukul 09.00 - Selesai WIB</p>
              <p className="text-xs">
                Dusun Kedung Uter No. 26 RT 002 RW 001 Desa Kendalrejo Kec.
                Petarukan Kab. Pemalang
              </p>
              <a
                href="https://maps.app.goo.gl/rhTaksdFwHuoSv6z5?g_st=aw"
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-max rounded-2xl bg-night text-eggshell flex flex-row items-center px-3 py-2 gap-2 text-sm "
              >
                <MapPin height={12} width={12} />
                Lihat lokasi
              </a>
            </div>
          </div>
        </div>
        {/* Gallery */}
        <div className="bg-gold p-4 py-20 text-night">
          <div data-aos="fade-up">
            <p className="text-playwrite text-xl mb-12">Gallery</p>
            <p>
              Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu
              mengingat (kebesaran Allah).
            </p>
          </div>
          <p className="mb-9">- QS. Az-Zariyat 49 -</p>
          <Gallery />
        </div>
        {/* Our Story */}
        <div className="flex flex-col items-center justify-center p-4 text-night my-20 px-4">
          <p className="text-playwrite text-xl mb-12">Our Story</p>
          <div className="bg-gold rounded-md flex flex-col items-center overflow-hidden">
            <img src={OurStory} alt="our-story" />
            <div className="flex flex-row">
              <div className="flex flex-col px-4 py-8 gap-8 text-left w-3/4">
                <div data-aos="fade-left">
                  <p className="text-playwrite mb-2">Awal Bertemu</p>
                  <p>Juli 2022</p>
                  <p>
                    Kami bertemu di salah satu lembaga pendidikan dimana kami
                    sama-sama menjadi pengajar. Dalam beberapa kesempatan kami
                    sering berkolaborasi pada kegiatan sekolah.
                  </p>
                </div>
                <div data-aos="fade-right">
                  <p className="text-playwrite mb-2">Menjalin Hubungan</p>
                  <p>4 April 2024</p>
                  <p>
                    Kami sempat berhenti dalam berkomunikasi karena sudah
                    ditempat kerja yang berbeda, hingga akhirnya kami mulai
                    aktif berkomunikasi kembali setelah salah satu diantara kami
                    mulai iseng replay Instagram story. Akhirnya obrolan itu
                    berlanjut menjadi rasa cinta sampai akhirnya kami memutuskan
                    untuk menjalin sebuah komitmen.
                  </p>
                </div>
                <div data-aos="fade-left">
                  <p className="text-playwrite mb-2">Lamaran</p>
                  <p>2 November 2024</p>
                  <p>
                    Sebagai hadiah hari lahir Novita, Gunawan memberikan hadiah
                    yang sangat spesial yaitu melamar Novita untuk menjadi calon
                    istrinya.
                  </p>
                </div>
                <div data-aos="fade-right">
                  <p>19 Februari 2025</p>
                  <p>
                    insyaAllah kami akan menunaikan ibadah terpanjang dalam
                    kehidupan yaitu janji suci pernikahan.
                  </p>
                </div>
              </div>
              <div className="bg-night text-gold w-1/4 flex items-center justify-center">
                <p className="rotate-90 text-playwrite">Love Story</p>
              </div>
            </div>
          </div>
        </div>
        {/* Gift */}
        <div className="flex flex-col items-center justify-center p-4 text-night my-20">
          <div
            className="flex flex-col items-center justify-center"
            data-aos="fade-down"
          >
            <p className="text-playwrite text-xl mb-12">Amplop Digital</p>
            <div className="mb-4">
              <p>
                Tanpa mengurangi rasa hormat kami bagi tamu yang ingin
                mengirimkan hadiah kepada kedua mempelai dapat mengirimkannya
                melalui:
              </p>
            </div>

            <Button className="w-max" onClick={() => setOpenGift(!openGift)}>
              <Gift />
              Kirim Hadiah
            </Button>
          </div>
          {openGift && (
            <div
              className="mt-4 flex flex-col items-center gap-3"
              data-aos="slide-left"
            >
              {ACCOUNTS.map((item) => (
                <Card {...item} key={item.number} />
              ))}
            </div>
          )}
        </div>
        {/* Ucapan */}
        <div className="bg-gold p-4 py-20 text-night flex flex-col items-center justify-center">
          <p className="text-playwrite xl mb-12">Ucapkan Sesuatu</p>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center justify-center bg-green-300 p-4 font-bold w-[45%] h-24 text-center rounded">
              {comments.data.length
                ? comments.data.filter((comment) => comment.rsvp).length
                : 0}
              <br /> Hadir
            </div>
            <div className="flex items-center justify-center bg-red-300 p-4 font-bold w-[45%] h-24 text-center rounded">
              {comments.data.length
                ? comments.data.length -
                  comments.data.filter((comment) => comment.rsvp).length
                : 0}
              <br /> Tidak Hadir
            </div>
          </div>
          <CommentForm
            guest={guest.data}
            fetchComments={fetchComments}
            loading={comments.loading}
          />
          <div className="bg-eggshell mt-3 w-full flex flex-col items-start p-4 gap-4 overflow-y-auto h-96">
            {comments.data.length ? (
              comments.data.map((comment) => {
                return (
                  <div className="flex flex-col" key={comment.id}>
                    <div className="flex flex-row items-center">
                      <p className="font-bold">{comment.name}</p>
                      {comment.valid && <BadgeCheck className="ml-2 h-4 w-4" />}
                    </div>
                    <p className="text-start">{comment.comment}</p>
                    <div className="flex flex-row items-center text-sm">
                      <Clock className="mr-2 h-3 w-3" />
                      <p>
                        {formatDistanceToNowStrict(comment.created_at, {
                          locale: id,
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Jadilah yang pertama untuk beri ucapan</p>
            )}
          </div>
        </div>
        {/* Closing */}
        <div className="flex flex-col items-center justify-center pb-20 text-night gap-3">
          <div className="w-full overflow-hidden">
            <img src={Closing} alt="closing image" className="object-contain" />
          </div>
          <div
            className="flex flex-col items-center px-4 gap-3"
            data-aos="fade-down"
          >
            <p className="text-sm mt-12">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
              kehadiran dan doa restunya, kami mengucapkan terima kasih.
            </p>
            <p className="text-playwrite">Wassalamu'alaikum Wr. Wb.</p>
            <p className="text-playwrite text-xl">Gunawan & Novita</p>
          </div>
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
        <div
          className="bg-gold text-night p-2 rounded-full w-max shadow fixed bottom-8 right-8 flex items-center justify-center z-50"
          role="button"
          onClick={() => setPlayed(!played)}
        >
          <audio ref={audioRef}>
            <source src={BackgroundMusic} type="audio/mp3" />
          </audio>
          {played ? <Pause /> : <Play />}
        </div>
      </div>
    </>
  );
}

export default App;
