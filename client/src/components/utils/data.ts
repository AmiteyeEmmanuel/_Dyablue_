import { 
    slideImg1
    ,slideImg2,
    slideImg3, 
    slideImg4,
    slideImg5,
    slideImg6, 
    slideImg7, 
    slideImg8,
    slideImg9 }
    from '../../assets';

interface SliderItem {
    text: string;
    imageSrc: string;
    content: string;
  }
  
export const SLIDER_ITEMS: SliderItem[] = [
    {
        text: 'Top Men`s Hair Trends',
        imageSrc: slideImg1,
        content: 'A look at the hottest men`s hairstyles, including textured crops, modern mullets, and natural curls. Insights from top barbers on how to achieve and maintain these styles'
    },
    {
        text: 'Revolutionizing Barbering',
        imageSrc: slideImg2,
        content: 'An overview of the latest technological advancements in barbering tools, such as AI-driven clippers, smart mirrors, and mobile apps that enhance the client experience.'
    },
    {
        text: 'Health and Safety',
        imageSrc: slideImg3,
        content: 'Best practices for maintaining a clean and safe environment in barbershops, especially in the post-pandemic world. Tips on sanitization, personal protective equipment, and client communication.'
    },
    {
        text: 'Barbering Career Path',
        imageSrc: slideImg4,
        content: 'An overview of the journey to becoming a master barber, from education and apprenticeship to building a clientele and potentially owning a barbershop.'
    },
    {
        text: 'Men`s Mental Health',
        imageSrc: slideImg5,
        content: 'How barbershops serve as community hubs and places of social interaction. The positive impact of a barber`s role in men`s mental health and well-being.'
    },
    {
        text: 'Behind a Great Haircut',
        imageSrc: slideImg6,
        content: 'Understanding the principles of hair structure and growth. How barbers use this knowledge to provide the best haircuts for different hair types.'
    },
    {
        text: 'Diversity and Inclusion',
        imageSrc: slideImg7,
        content: 'The importance of embracing diversity in barbering, from catering to different hair types and textures to creating an inclusive environment for all clients and staff.'
    },
    {
        text: 'Barbering Innovations',
        imageSrc: slideImg8,
        content: ' A look at the future of barbering with emerging trends and technologies, such as augmented reality hair consultations and personalized grooming products based on genetic analysis.'
    },
    {
        text: 'The Perfect Fade',
        imageSrc: slideImg9,
        content: 'Expert advice on mastering the fade haircut, including step-by-step techniques, recommended tools, and common mistakes to avoid for a flawless finish.'
    }
];
  