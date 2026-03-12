// import { } from 'next/font/go'

import { Inter, Montserrat_Alternates,  Angkor, Inter_Tight, Intel_One_Mono,    Instrument_Sans } from 'next/font/google';


export const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400"]
})
export const angkor = Angkor({
    subsets: ["latin"],
    weight: ["400"]
    // weight: ["100", "200", "300", "400"]
})


export const titleFont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export const textFont2 = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
export const textFont3 = Intel_One_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
export const textFont4 = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});