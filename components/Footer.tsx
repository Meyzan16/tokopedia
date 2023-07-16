import { footerLinks } from '@/constants'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
type ColumnProps = {
  title: string;
  links: Array<string>;
}

const FooterColumn = ({title,links}: ColumnProps) => (
    <div className='footer_column'>
        <h4 className='font-semibold'>{title}</h4>
        <ul className='flex flex-col gap-2 font-normal'>
            {links.map((link) => 
              <Link href='/' key={link}>
                {link}
              </Link>
            )}
        </ul>
    </div>
)

const Footer = () => {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col gap-8 w-full '>

            <div className="flex items-start flex-col">


                <p className="text-start text-sm font-normal mt-10 max-w-xs">
                    Flexanime is a website providing anime advertisements in the world
                </p>
            </div>

        <div className='flex flex-wrap gap-12'>
            <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />

            <div className='flex-1 flex flex-col gap-4'>
              <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
              <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
            </div>

              <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />
              
            <div className='flex-1 flex flex-col gap-4'>
              <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
              <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
            </div>
        </div>

      </div>

      <div className='flexBetween footer_copyright'>
          <p>@ 2023 Flexanime. All rights reserved</p>

          <p className='text-gray'>
            <span className='text-black font-semibold'>Meyzan</span> projects submmited
          </p>
      </div>
    </footer>
  )
}

export default Footer
