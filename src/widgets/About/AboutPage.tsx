'use client';

import Image from 'next/image';
import { Header } from 'widgets/Header/Header.tsx';

export const AboutPage = () => {
  return (
    <>
      <Header />
      <main
        className={'flex gap-3.5 justify-center max-w-6xl w-full flex-wrap'}
      >
        <div>
          <Image
            alt={'Picture of animals in a museum'}
            className={'w-full min-w-xs h-auto max-h-[600px]'}
            height={1280}
            src={'/images/IMG_9133.jpeg'}
            width={853}
          />
        </div>
        <div className={'flex flex-col gap-3.5 max-w-lg w-full'}>
          <p className={'text-2xl text-justify'}>
            Hi! I am Dasha Nemirich. I am a former biologist and
            bioinformatician who is exploring web development. I appreciate
            beautiful and elegant interfaces that are intuitive and
            user-friendly. I love visual arts, so for this project I chose {''}
            <a
              className={'hover:opacity-40 transition-opacity'}
              href={'https://api.artic.edu/docs/'}
              rel="noreferrer"
              target={'_blank'}
            >
              The Art Institute of Chicago API
            </a>
            . The project was completed as part of a React course at Rolling
            Scope School in 2025.
          </p>
          <a
            className={'self-end'}
            href={'https://rs.school/courses/reactjs'}
            rel="noreferrer"
            target={'_blank'}
          >
            <Image
              alt={'Rolling scopes school logo'}
              className={'w-20 hover:opacity-40 transition-opacity'}
              height={199}
              src={'/icons/rs_school.svg'}
              width={553}
            />
          </a>
        </div>
      </main>
    </>
  );
};
