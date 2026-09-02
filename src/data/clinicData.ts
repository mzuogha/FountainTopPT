import { Service, Specialist, Testimonial, FAQItem } from '../types';

export const CLINIC_INFO = {
  name: 'Fountain-Top Physiotherapy & Fitness Clinic',
  shortName: 'Fountain Top PT',
  tagline: 'Restore Movement. Build Strength. Live Pain-Free.',
  subTagline: 'Comprehensive physiotherapy, neurological rehabilitation, pediatric care, and wellness fitness in Asaba, Delta State.',
  phone1: '07039466804',
  phone1Formatted: '+234 703 946 6804',
  phone2: '09016120596',
  phone2Formatted: '+234 901 612 0596',
  address: '1, Nwanze Obi Odogwu Street Behind Stadium by Mountain of Fire Junction, Asaba, Delta State, 320104, Nigeria',
  googleMapsUrl: 'https://maps.google.com/?q=Asaba+Delta+State+Nigeria+Fountain+Top+Physiotherapy',
  email: 'info@fountaintoppt.com',
  emailUrl: 'mailto:info@fountaintoppt.com',
  whatsappNumber: '2347039466804',
  whatsappUrl: 'https://wa.me/2347039466804?text=Hello%20Fountain%20Top%20Physiotherapy%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20consultation.',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 3:00 PM' },
    { days: 'Sunday', time: 'Closed (Emergency on-call)' }
  ],
  stats: [
    { label: 'Successful Recoveries', value: '1,500+' },
    { label: 'Patient Satisfaction', value: '99.4%' },
    { label: 'Years of Clinical Excellence', value: '10+' },
    { label: 'Certified Specialists', value: '8' }
  ]
};

export const SERVICES: Service[] = [
  {
    id: 'general-consultation',
    title: 'General Consultation',
    category: 'musculoskeletal',
    categoryLabel: 'Initial Clinical Assessment',
    shortDesc: 'Comprehensive one-on-one physiotherapy assessment, musculoskeletal diagnosis, pain evaluation, and customized treatment planning.',
    fullDesc: 'Our General Consultation provides an in-depth clinical evaluation with a licensed senior physiotherapist. We conduct full postural assessments, joint mobility and muscle strength diagnostics, and orthopedic evaluations to accurately identify the root cause of your discomfort and design an individualized recovery plan.',
    keyBenefits: [
      'Comprehensive physical assessment and root-cause pain diagnosis',
      'Personalized recovery roadmap and custom exercise prescription',
      'Immediate symptom triage and clinical guidance',
      'Guidance on in-clinic therapy schedules or convenient home visit options'
    ],
    commonConditions: ['General Joint & Body Aches', 'Uncertain Mobility Limitations', 'Postural Strain & Ergonomic Issues', 'Acute Muscle or Sports Sprains', 'Second Opinions & Treatment Planning'],
    treatmentMethods: ['Comprehensive Biomechanical Assessment', 'Range of Motion & Strength Testing', 'Specialized Orthopedic / Neuro Screenings', 'Individualized Care Plan Design'],
    sessionDuration: '30 – 45 mins',
    image: '/images/1536/27300360/personalizedcare-Wxk09ZbG6vUP5F4-sNFIdA.webp',
    iconName: 'Activity',
    featured: true
  },
  {
    id: 'musculoskeletal',
    title: 'Musculoskeletal Physiotherapy',
    category: 'musculoskeletal',
    categoryLabel: 'Orthopedic & Pain Relief',
    shortDesc: 'Comprehensive treatment for back pain, arthritis, joint stiffness, sciatica, neck tension, and sports injuries.',
    fullDesc: 'Our Musculoskeletal Physiotherapy program is designed to identify the root biomechanical source of your pain. We combine targeted manual therapy, therapeutic dry needling, joint mobilization, electrotherapy, and customized progressive exercise regimens to relieve acute discomfort and rebuild long-term musculoskeletal resiliency.',
    keyBenefits: [
      'Rapid pain relief and reduction of joint inflammation',
      'Restoration of full range of motion and joint flexibility',
      'Targeted spinal stabilization and postural correction',
      'Long-term injury prevention protocols'
    ],
    commonConditions: ['Chronic Lower Back Pain', 'Sciatica & Disc Bulge', 'Osteoarthritis & Rheumatoid Arthritis', 'Frozen Shoulder & Rotator Cuff Tears', 'Neck Pain & Cervical Spondylosis', 'Sprains, Strains & Tendonitis'],
    treatmentMethods: ['Manual Joint Mobilization', 'Therapeutic Ultrasound & TENS', 'Core & Spinal Rehabilitation', 'Ergonomic & Postural Re-education'],
    sessionDuration: '45 – 60 mins',
    image: '/images/882/27297959/MusculoskeletalPhysiotherapy-lfnWCPu2qe7Lc1GKFqQG1A.webp',
    iconName: 'Activity',
    featured: true
  },
  {
    id: 'stroke-rehab',
    title: 'Stroke & Neurological Rehabilitation',
    category: 'neurological',
    categoryLabel: 'Neurological Care',
    shortDesc: 'Specialized neuro-physiotherapy to restore motor control, gait, balance, and daily functional independence after stroke.',
    fullDesc: 'Neuroplasticity-focused rehabilitation engineered to help patients regain movement, retrain paralyzed or weakened limbs, overcome spasticity, and achieve personal independence following a stroke or brain injury. Our dedicated therapists provide compassionate, one-on-one guided movement and functional re-training.',
    keyBenefits: [
      'Promotes neuroplastic motor recovery and limb reactivation',
      'Improves balance, posture, and safe independent walking',
      'Manages muscle spasticity and joint contractures',
      'Enhances daily functional living activities and confidence'
    ],
    commonConditions: ['Ischemic & Hemorrhagic Stroke', 'Hemiplegia & Hemiparesis', 'Balance & Gait Impairments', 'Spasticity & Muscle Weakness', 'Post-Brain Injury Functional Deficits'],
    treatmentMethods: ['Neurodevelopmental Therapy (NDT)', 'Task-Oriented Gait Training', 'Constraint-Induced Movement Therapy', 'Electrical Muscle Stimulation'],
    sessionDuration: '60 mins',
    image: '/images/1920/27299803/StrokeRehabilitation-AH3bdDCLa4Jiom6aED5R_A.webp',
    iconName: 'Brain',
    featured: true
  },
  {
    id: 'post-surgical',
    title: 'Post-Surgical Management & Recovery',
    category: 'musculoskeletal',
    categoryLabel: 'Orthopedic Rehabilitation',
    shortDesc: 'Structured postoperative physical therapy protocols ensuring safe, accelerated healing after orthopedic surgery.',
    fullDesc: 'Recover safely with personalized post-operative rehabilitation. We coordinate closely with your orthopedic surgeon’s protocol to manage post-surgical swelling, prevent scar tissue adherence, restore full joint biomechanics, and safely rebuild muscular strength step-by-step.',
    keyBenefits: [
      'Minimizes post-operative swelling, pain, and scar tissue adhesion',
      'Prevents muscle atrophy and accelerates safe weight-bearing',
      'Restores functional joint range of motion safely',
      'Ensures confidence in returning to work, sports, and daily life'
    ],
    commonConditions: ['Total Knee & Hip Replacements', 'ACL, Meniscus & Ligament Repairs', 'Spinal Fusion & Laminectomy Recovery', 'Fracture Fixation & Bone Healing', 'Tendon Reattachment Surgery'],
    treatmentMethods: ['Gentle Passive & Active ROM Exercises', 'Lymphatic & Swelling Management', 'Progressive Resistance Training', 'Functional Proprioception Drills'],
    sessionDuration: '45 – 60 mins',
    image: '/images/612/27299808/Post-SurgicalManagement-UBrMgCOmA9cBZSIYvbkNtQ.webp',
    iconName: 'ShieldCheck',
    featured: true
  },
  {
    id: 'erbs-palsy',
    title: 'Pediatric Erb’s Palsy Treatment',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    shortDesc: 'Dedicated brachial plexus rehabilitation stimulating nerve healing, arm movement, and grip function for infants and children.',
    fullDesc: 'Erb’s Palsy requires early, gentle, and consistent physical therapy. Our pediatric therapists specialize in gentle passive stretching, electrical nerve stimulation, tactile facilitation, and play-based functional movements to restore nerve activation and muscular strength in the affected arm and hand.',
    keyBenefits: [
      'Prevents shoulder joint contractures and muscle shortening',
      'Stimulates brachial plexus nerve regeneration and muscle firing',
      'Restores active reach, grasp, and bi-manual coordination',
      'Family-centered home exercise guidance and caregiver training'
    ],
    commonConditions: ['Neonatal Brachial Plexus Palsy', 'Shoulder Dystocia Injuries', 'Arm Weakness in Infants', 'Hand and Wrist Extensor Deficits'],
    treatmentMethods: ['Gentle Range of Motion Mobilization', 'Neuromuscular Electrical Stimulation', 'Sensory & Tactile Play Drills', 'Splinting & Positioning Support'],
    sessionDuration: '40 – 50 mins',
    image: '/images/547/27303148/ErbsPalsyTreatment-RapKHzs-4K3RJsflzNjm4w.webp',
    iconName: 'Smile',
    featured: false
  },
  {
    id: 'cerebral-palsy',
    title: 'Pediatric Cerebral Palsy Rehabilitation',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    shortDesc: 'Compassionate, developmental therapy to enhance mobility, manage tone, and foster developmental milestones.',
    fullDesc: 'We provide specialized physical therapy for children with Cerebral Palsy to maximize their mobility, coordination, and independence. Our child-friendly clinic environment turns therapeutic exercises into engaging developmental play, assisting with sitting, crawling, standing, and gait development.',
    keyBenefits: [
      'Normalizes hypertonia / hypotonia muscle tone',
      'Encourages core stability and developmental milestones',
      'Enhances gait mechanics and assistive device integration',
      'Promotes lasting self-reliance in daily childhood activities'
    ],
    commonConditions: ['Spastic Cerebral Palsy', 'Athetoid & Ataxic CP', 'Developmental Delay & Balance Deficits', 'Coordination & Motor Planning Difficulties'],
    treatmentMethods: ['Bobath Concept & Neurodevelopmental Therapy', 'Dynamic Balance Platforms', 'Postural Alignment Exercises', 'Gait Training & Orthotic Advisory'],
    sessionDuration: '45 – 60 mins',
    image: '/images/676/27303218/CerebralPalsyTreatment-5eYRt4-mnFYtdpVd5l08AA.webp',
    iconName: 'HeartHandshake',
    featured: false
  },
  {
    id: 'club-foot',
    title: 'Club Foot Treatment & Correction',
    category: 'pediatric',
    categoryLabel: 'Pediatric Care',
    shortDesc: 'Correction therapies, Ponseti follow-up, and functional alignment for healthy foot mobility and pain-free walking.',
    fullDesc: 'Our specialized pediatric foot correction therapy supports infants and children diagnosed with Congenital Talipes Equinovarus (Club Foot). We work alongside casting protocols with corrective soft-tissue stretches, muscle strengthening, and gait re-education to ensure straight, flexible, and weight-bearing feet.',
    keyBenefits: [
      'Maintains optimal ankle dorsiflexion and foot alignment',
      'Prevents relapse after corrective casting or bracing',
      'Strengthens evertor and dorsiflexor muscle groups',
      'Ensures natural, pain-free running and sports participation'
    ],
    commonConditions: ['Congenital Talipes Equinovarus (Clubfoot)', 'Metatarsus Adductus', 'Post-Ponseti Method Care', 'Pediatric Gait Abnormalities'],
    treatmentMethods: ['Specialized Soft Tissue Stretching', 'Brace & Orthosis Compliance Monitoring', 'Early Weight-Bearing Training', 'Progressive Foot Balance Drills'],
    sessionDuration: '40 – 50 mins',
    image: '/images/549/27303242/ClubFootTreatment-D3cMa_iZTFGJg31hUWSdVw.webp',
    iconName: 'Footprints',
    featured: false
  },
  {
    id: 'therapeutic-massage',
    title: 'Therapeutic & Full Body Massage',
    category: 'wellness',
    categoryLabel: 'Wellness & Recovery',
    shortDesc: 'Clinical deep tissue and therapeutic massage relieving chronic tension, improving circulation, and speeding muscle recovery.',
    fullDesc: 'Not just relaxation—our therapeutic massages are administered by trained medical and physiotherapy professionals. We pinpoint trigger points, alleviate deep-seated fascial restrictions, release muscle spasms, and promote lymphatic drainage to leave your body revitalized and free of tightness.',
    keyBenefits: [
      'Alleviates persistent muscular knots and tension headaches',
      'Enhances blood circulation and oxygenation to tissues',
      'Reduces cortisol and promotes restorative bodily relaxation',
      'Complements active physiotherapy and gym workouts'
    ],
    commonConditions: ['Chronic Muscle Tension & Spasms', 'Work-Related Postural Fatigue', 'Myofascial Trigger Point Pain', 'Fibromyalgia & Generalized Body Aches'],
    treatmentMethods: ['Clinical Deep Tissue Therapy', 'Myofascial Trigger Point Release', 'Swedish Therapeutic Strokes', 'Aromatherapy & Muscle Warming'],
    sessionDuration: '60 – 90 mins',
    image: '/images/547/27303071/FullBodyMassage-q644JnCMDKrGVc3TTr80ng.webp',
    iconName: 'Heart',
    featured: false
  },
  {
    id: 'fitness-wellness',
    title: 'Medical Fitness & Wellness Training',
    category: 'wellness',
    categoryLabel: 'Wellness & Conditioning',
    shortDesc: 'Physiotherapist-guided fitness, cardiovascular conditioning, weight management, and preventative health programs.',
    fullDesc: 'Bridge the gap between rehabilitation and peak physical fitness. Our medical fitness programs are customized to your cardiovascular health, joint capacity, and personal fitness goals—supervised directly by licensed therapists to ensure you train without risking reinjury.',
    keyBenefits: [
      'Safely builds functional strength, stamina, and flexibility',
      'Customized programs for seniors, beginners, and athletes',
      'Supports healthy blood pressure, weight, and joint health',
      'Ongoing physiological tracking and progress benchmarking'
    ],
    commonConditions: ['Post-Rehab Conditioning', 'Cardiovascular Fitness Needs', 'Age-Related Sarcopenia / Muscle Loss', 'Obesity & Lifestyle Health Management'],
    treatmentMethods: ['Personalized Resistance Programming', 'Low-Impact Aerobic Workouts', 'Functional Mobility & Core Circuits', 'Cardiovascular & Vital Signs Monitoring'],
    sessionDuration: '60 mins',
    image: '/images/626/27303194/FitnessWellness-aWCh2zsDRhFqaKhTIWMojg.webp',
    iconName: 'Zap',
    featured: true
  }
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'lead-pt',
    name: 'Dr. Chinedu Okafor (PT)',
    role: 'Clinical Director & Lead Physical Therapist',
    qualifications: 'B.MR (Physiotherapy), M.Sc. Orthopedic Rehabilitation, MCSP',
    experienceYears: 12,
    specialties: ['Musculoskeletal Disorders', 'Spinal Manual Therapy', 'Post-Surgical Protocols'],
    bio: 'With over a decade of clinical experience treating complex orthopedic and spinal cases, Dr. Okafor leads Fountain Top with an evidence-based, compassionate philosophy focused on root-cause healing and patient empowerment.',
    image: '/images/1000/23397312/professional-male-doctor-in-white-coat-posed-confidently-with-arms-crossed-against-a-white-background-x9SxUFXbGhejl-tPM6_4RA-j6vNoQ-2ropONf6kJLosFA.webp',
    availability: 'Mon – Fri: 8:00 AM – 5:00 PM'
  },
  {
    id: 'neuro-pt',
    name: 'Dr. Amaka Eze (PT)',
    role: 'Senior Neurological Rehabilitation Specialist',
    qualifications: 'B.Sc. Physiotherapy, Certified Neuro-Developmental Therapist (NDT)',
    experienceYears: 9,
    specialties: ['Stroke Recovery', 'Brain Injury Rehabilitation', 'Spasticity Management'],
    bio: 'Dr. Amaka brings immense warmth and specialized neurological expertise to help stroke survivors and patients with motor deficits regain independent walking and daily function through neuroplastic training.',
    image: '/images/1000/23397304/portrait-of-a-smiling-female-doctor-with-a-stethoscope-in-a-bright-clinical-environment-eH9CZ5qulw7CSnK51SiJdw-zR47Q6s7lJ0KmbH9lFhIXw.webp',
    availability: 'Mon, Tue, Thu, Fri: 8:30 AM – 4:30 PM'
  },
  {
    id: 'pediatric-pt',
    name: 'Dr. Blessing Nwosu (PT)',
    role: 'Pediatric Physical Therapy Lead',
    qualifications: 'B.Physiotherapy, Specialized Fellow in Pediatric Neurology',
    experienceYears: 8,
    specialties: ['Cerebral Palsy Care', 'Erb’s Palsy Recovery', 'Ponseti Clubfoot Management'],
    bio: 'Dr. Blessing is celebrated for her gentle touch and engaging play-based techniques that inspire children with congenital and developmental motor conditions to reach their developmental milestones.',
    image: '/images/1000/23397373/smiling-female-healthcare-professional-in-white-coat-holding-clipboard-indoors-Leg7p3ROcUngAhFbHVWjqQ-Lm_ioatRSCGN0qoRHe_D4A.webp',
    availability: 'Tue – Sat: 9:00 AM – 4:00 PM'
  },
  {
    id: 'sports-pt',
    name: 'Dr. Tunde Adeyemi (PT)',
    role: 'Sports Rehabilitation & Medical Fitness Lead',
    qualifications: 'B.Sc. Physiotherapy, Certified Strength & Conditioning Specialist (CSCS)',
    experienceYears: 7,
    specialties: ['Sports Injury Recovery', 'Joint Biomechanics', 'Functional Medical Fitness'],
    bio: 'Dr. Tunde integrates high-performance athletic rehabilitation with corrective strength exercises, helping athletes and active individuals return to peak form without recurrence.',
    image: '/images/1000/23397232/confident-senior-male-doctor-with-a-stethoscope-representing-healthcare-professionalism-IpXVokk0utCvqHLjOqiT5Q-ynI_vHAgT7lkEtm41O_x0A.webp',
    availability: 'Mon – Fri: 9:00 AM – 6:00 PM, Sat: 9:00 AM – 2:00 PM'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Ngozi Ibekwe',
    title: 'Professional and truly supportive care',
    condition: 'Chronic Shoulder Stiffness',
    quote: 'From my first assessment to my follow-up sessions, the care and attention I received were excellent. The physiotherapists took the time to explain what was happening in my neck and supported me all the way to a full recovery.',
    treatment: 'Musculoskeletal Physiotherapy',
    avatar: '/images/92,287x288+19+0/27300796/NgoziIbekwe-E5PzMF58VNTgFFLbIhOqCQ.webp',
    rating: 5,
    recoveryDuration: '4 Weeks',
    verified: true
  },
  {
    id: 't-2',
    patientName: 'Chinedu Okafor',
    title: 'Best fitness and physical therapy clinic in Asaba',
    condition: 'Severe Lumbar Disc Pain',
    quote: 'I came in with persistent lower back pain that kept me awake and made driving unbearable. The targeted physical therapy and spinal exercises made a significant difference. I can now move and exercise comfortably again.',
    treatment: 'Spinal Decompression & Core Rehab',
    avatar: '/images/92,1252x1254+0+0/27300475/chineduokafor-8nKSetgdRTt1w6ZHdHakhg.webp',
    rating: 5,
    recoveryDuration: '6 Weeks',
    verified: true
  },
  {
    id: 't-3',
    patientName: 'Tunde Adeyemi',
    title: 'Personalized care and amazing postoperative results',
    condition: 'Post-Surgical Knee Ligament Repair',
    quote: 'The rehabilitation program at Fountain Top helped me get back to my normal routine after my orthopedic surgery. Their step-by-step guidance gave me the confidence to walk, climb stairs, and run again without fear.',
    treatment: 'Post-Surgical Management',
    avatar: '/images/92,1252x1254+0+0/27300730/tunde-Y4G8IKHFbHAotLal9NIMMA.webp',
    rating: 5,
    recoveryDuration: '8 Weeks',
    verified: true
  },
  {
    id: 't-4',
    patientName: 'Blessing Nwosu',
    title: 'Genuinely caring team and patient listeners',
    condition: 'Post-Stroke Functional Recovery',
    quote: 'Very caring and professional team. When my mother suffered a stroke, the doctors at Fountain Top treated her with extraordinary patience. Seeing her take independent steps again brought tears of joy to our entire family.',
    treatment: 'Stroke & Neurological Rehabilitation',
    avatar: '/images/92,299x300+12+0/27300652/BlessingNwosu-9_p1wcpsO5aTVxE1D1O1gw.webp',
    rating: 5,
    recoveryDuration: '3 Months',
    verified: true
  },
  {
    id: 't-5',
    patientName: 'Amaka Eze',
    title: 'I can finally sit and move pain-free again',
    condition: 'Chronic Sciatic Nerve Impingement',
    quote: 'I came in with constant lower back pain and couldn’t sit for more than 10 minutes at my office desk. After a few sessions of manual therapy and personalized core training, I noticed dramatic improvement. Highly recommend Fountain Top!',
    treatment: 'Musculoskeletal & Manual Therapy',
    avatar: '/images/92,765x766+0+128/27300846/Amakaeze--aCGAL0ghM8esEfhgo4udA.webp',
    rating: 5,
    recoveryDuration: '5 Weeks',
    verified: true
  }
];

export const CLINIC_PROCESS = [
  {
    step: '01',
    title: 'Comprehensive Initial Assessment',
    description: 'We perform a thorough evaluation of your medical history, posture, muscle strength, joint mobility, neurological reflexes, and pain triggers.',
    icon: 'ClipboardCheck'
  },
  {
    step: '02',
    title: 'Accurate Biomechanical Diagnosis',
    description: 'Our lead specialists identify the exact root cause behind your movement restriction or discomfort rather than just masking symptoms.',
    icon: 'Stethoscope'
  },
  {
    step: '03',
    title: 'Tailored Recovery Protocol',
    description: 'You receive a personalized treatment roadmap blending clinical manual therapy, targeted equipment exercises, and home management guidelines.',
    icon: 'Layers'
  },
  {
    step: '04',
    title: 'Active Healing & Long-Term Strength',
    description: 'We guide you through progressive strengthening, gait re-training, and preventive wellness to ensure lasting pain-free vitality.',
    icon: 'TrendingUp'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What conditions do you treat at Fountain Top Physical Therapy?',
    answer: 'We provide specialized physical therapy and rehabilitation for a broad spectrum of conditions, including musculoskeletal disorders (lower back pain, sciatica, arthritis, neck pain, frozen shoulder), neurological conditions (stroke recovery, brain injury, hemiparesis), pediatric conditions (Erb’s Palsy, Cerebral Palsy, Club Foot), post-surgical recovery, sports injuries, and medical wellness fitness.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'What happens during my first physiotherapy session?',
    answer: 'Your first session begins with a comprehensive physical assessment. Your therapist will review your medical history, test your range of motion, muscle strength, flexibility, and functional limitations. We discuss your personal goals and immediately begin your initial pain-relief treatment and personalized rehabilitation plan.',
    category: 'treatments'
  },
  {
    id: 'faq-3',
    question: 'Do I need a doctor’s referral before visiting your clinic in Asaba?',
    answer: 'No, a doctor’s referral is not mandatory. You can contact Fountain Top directly to schedule an assessment. However, if you already have a referral letter, surgical summary, X-ray, or MRI reports from your physician, please bring them along to assist our comprehensive evaluation.',
    category: 'appointments'
  },
  {
    id: 'faq-4',
    question: 'How long does each physiotherapy session take?',
    answer: 'Standard physiotherapy sessions typically range between 45 to 60 minutes depending on your condition, treatment modality (manual therapy, electrotherapy, active exercise circuits), and whether you are receiving dual therapy such as physical rehab plus therapeutic massage.',
    category: 'treatments'
  },
  {
    id: 'faq-5',
    question: 'Do you provide specialized treatment for infants and children?',
    answer: 'Yes! We have dedicated pediatric physical therapists experienced in treating infants and young children with Congenital Club Foot (Ponseti follow-up), Erb’s Palsy (Brachial Plexus injury), Cerebral Palsy, torticollis, and general motor developmental delays in a welcoming, play-oriented environment.',
    category: 'pediatric'
  },
  {
    id: 'faq-6',
    question: 'How many sessions will I need before I see results?',
    answer: 'Many patients experience noticeable pain relief and improved ease of movement within their first 2 to 3 sessions. Total rehabilitation duration varies depending on whether the condition is acute or chronic; your therapist will provide a clear estimated timeline during your initial evaluation.',
    category: 'treatments'
  },
  {
    id: 'faq-7',
    question: 'Can I book home visit physiotherapy sessions in Asaba?',
    answer: 'Yes, for post-stroke patients, bedridden individuals, or elderly patients who cannot travel comfortably to the clinic, we offer scheduled home-care physiotherapy visits across Asaba and surrounding areas. Please contact us via phone or WhatsApp to arrange home care.',
    category: 'appointments'
  }
];
