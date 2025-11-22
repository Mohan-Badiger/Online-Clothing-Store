import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import Newsletter from '../components/NewsletterBox'

const About = () => {
  return (
    <div >
      
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam quas et corporis a sed sit culpa voluptas, earum praesentium distinctio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non quam exercitationem esse numquam unde cupiditate molestiae ab officiis nulla recusandae!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci asperiores quis rerum ullam dolore? Commodi, dicta! Cum, deserunt cupiditate ipsam corrupti fuga autem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus soluta eos pariatur enim, sunt illo.</p>
            <b className='text-gray-800'>Our Mission</b>
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam totam esse consequuntur tenetur facere placeat accusamus sit repellendus omnis ad nostrum voluptate, nulla nesciunt id ipsa animi. Deserunt, alias laboriosam!</b>
          </div>
      </div>

      <div className='text-4xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro inventore, minus itaque ea suscipit dicta impedit ipsam voluptates excepturi necessitatibus.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro inventore, minus itaque ea suscipit dicta impedit ipsam voluptates excepturi necessitatibus.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro inventore, minus itaque ea suscipit dicta impedit ipsam voluptates excepturi necessitatibus.</p>
        </div>
      </div>

      <Newsletter/>

    </div>
  )
}

export default About