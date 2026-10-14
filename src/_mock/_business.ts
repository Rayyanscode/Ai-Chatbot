import type { Business } from 'src/types/business';

export const BUSINESS_CATEGORY_COLORS: Record<string, string> = {
  'Software & Technology': '#4A90D9',
  'Food & Beverage': '#6BBD7C',
  'Fashion & Retail': '#C77DBA',
  'Construction & Real Estate': '#E8874A',
  Healthcare: '#E05B5B',
  'Education & Training': '#F4A931',
  'Logistics & Shipping': '#5BA8C4',
  'Marketing & Design': '#9B72CF',
};

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'TechNova Solutions',
    category: 'Software & Technology',
    description:
      'Cutting-edge software development and IT consulting services for modern businesses.',
    avatar: 'TN',
    location: 'San Francisco, CA',
    fullDescription:
      'TechNova Solutions is a leading software development company founded in 2015. We specialize in custom software development, cloud migrations, AI/ML integrations, and enterprise IT consulting. Our team of 120+ engineers delivers world-class solutions across fintech, healthcare, and e-commerce sectors.',
    email: 'hello@technova.io',
    phone: '+1 (415) 555-0100',
    website: 'www.technova.io',
    tags: ['Software Dev', 'Cloud', 'AI/ML', 'Consulting'],
  },
  {
    id: '2',
    name: 'GreenLeaf Organics',
    category: 'Food & Beverage',
    description: 'Premium organic food products sourced directly from sustainable farms worldwide.',
    avatar: 'GL',
    location: 'Portland, OR',
    fullDescription:
      'GreenLeaf Organics has been championing sustainable food since 2010. We partner with over 200 certified organic farms to bring fresh, traceable, and affordable produce to families across North America. Our product line includes fresh vegetables, grains, dairy alternatives, and artisan snacks.',
    email: 'info@greenleaforganics.com',
    phone: '+1 (503) 555-0200',
    website: 'www.greenleaforganics.com',
    tags: ['Organic', 'Sustainable', 'Farm-to-Table', 'Vegan-Friendly'],
  },
  {
    id: '3',
    name: 'StyleHaus Boutique',
    category: 'Fashion & Retail',
    description: 'Curated fashion collections blending contemporary trends with timeless elegance.',
    avatar: 'SH',
    location: 'New York, NY',
    fullDescription:
      "StyleHaus Boutique is New York's premier destination for curated fashion. Since 2012, we've offered meticulously selected collections from emerging designers and established luxury brands. Our personal styling service, custom tailoring, and exclusive seasonal lookbooks set us apart.",
    email: 'style@stylehaus.com',
    phone: '+1 (212) 555-0300',
    website: 'www.stylehaus.com',
    tags: ['Fashion', 'Luxury', 'Personal Styling', 'Tailoring'],
  },
  {
    id: '4',
    name: 'BuildRight Construction',
    category: 'Construction & Real Estate',
    description:
      'Reliable construction and renovation services with a focus on quality craftsmanship.',
    avatar: 'BR',
    location: 'Chicago, IL',
    fullDescription:
      'BuildRight Construction has delivered over 500 residential and commercial projects since 2008. From ground-up construction to complete renovations, our licensed contractors bring precision, transparency, and on-time delivery to every project. We are fully bonded and insured in 12 states.',
    email: 'projects@buildright.com',
    phone: '+1 (312) 555-0400',
    website: 'www.buildright.com',
    tags: ['Construction', 'Renovation', 'Commercial', 'Residential'],
  },
  {
    id: '5',
    name: 'HealthFirst Clinic',
    category: 'Healthcare',
    description: 'Comprehensive medical care and wellness services for individuals and families.',
    avatar: 'HF',
    location: 'Austin, TX',
    fullDescription:
      'HealthFirst Clinic is a multi-specialty outpatient clinic offering primary care, preventive health screenings, mental health services, and chronic disease management. Our patient-first philosophy and same-day appointment availability make quality healthcare accessible to all.',
    email: 'care@healthfirst.com',
    phone: '+1 (512) 555-0500',
    website: 'www.healthfirst.com',
    tags: ['Primary Care', 'Mental Health', 'Preventive', 'Telemedicine'],
  },
  {
    id: '6',
    name: 'EduPath Academy',
    category: 'Education & Training',
    description: 'Online and in-person educational programs empowering learners of all ages.',
    avatar: 'EP',
    location: 'Boston, MA',
    fullDescription:
      'EduPath Academy offers accredited online and hybrid learning programs in technology, business, and creative arts. With over 50,000 enrolled students worldwide, our courses are designed by industry experts and offer flexible scheduling, mentorship, and career placement support.',
    email: 'learn@edupathacademy.com',
    phone: '+1 (617) 555-0600',
    website: 'www.edupathacademy.com',
    tags: ['E-Learning', 'Certification', 'Mentorship', 'Career'],
  },
  {
    id: '7',
    name: 'SwiftDeliver Logistics',
    category: 'Logistics & Shipping',
    description: 'Fast, reliable delivery and supply chain solutions for businesses of all sizes.',
    avatar: 'SD',
    location: 'Dallas, TX',
    fullDescription:
      'SwiftDeliver Logistics provides end-to-end supply chain management, last-mile delivery, warehousing, and freight forwarding services. Serving 3,000+ clients across North America, we leverage real-time tracking, AI-optimized routing, and 98.7% on-time delivery rates.',
    email: 'ops@swiftdeliver.com',
    phone: '+1 (214) 555-0700',
    website: 'www.swiftdeliver.com',
    tags: ['Last-Mile', 'Warehousing', 'Freight', 'Real-Time Tracking'],
  },
  {
    id: '8',
    name: 'CreativeBloom Agency',
    category: 'Marketing & Design',
    description:
      'Full-service creative agency specializing in branding, design, and digital marketing.',
    avatar: 'CB',
    location: 'Los Angeles, CA',
    fullDescription:
      'CreativeBloom Agency is an award-winning creative studio that has helped 300+ brands build compelling identities. Our services span brand strategy, UI/UX design, social media management, SEO, content production, and performance advertising. We blend data insights with creative storytelling.',
    email: 'hello@creativebloom.com',
    phone: '+1 (323) 555-0800',
    website: 'www.creativebloom.com',
    tags: ['Branding', 'UI/UX', 'SEO', 'Content'],
  },
];

export const MOCK_BUSINESS_MAP: Record<string, Business> = MOCK_BUSINESSES.reduce(
  (acc, business) => {
    acc[business.id] = business;
    return acc;
  },
  {} as Record<string, Business>
);
