import { HealthArticle, QuickHealthTip } from '../types';

export const QUICK_HEALTH_TIPS: QuickHealthTip[] = [
  {
    id: 'tip-1',
    title: 'The 30-Minute Sitting Rule',
    category: 'Posture & Spine',
    iconName: 'Clock',
    tip: 'Prolonged sitting increases lumbar disc pressure by over 40% compared to standing.',
    actionStep: 'Stand up, roll your shoulders backward 5 times, and do 3 gentle standing back extensions every 30 minutes.'
  },
  {
    id: 'tip-2',
    title: 'Ice vs. Heat for Injuries',
    category: 'Pain Relief',
    iconName: 'ShieldAlert',
    tip: 'Use cold therapy for acute sprains/swelling (first 48-72 hrs). Switch to moist heat for chronic stiffness and muscular tension.',
    actionStep: 'Apply an ice pack wrapped in a damp cloth for 15-20 minutes at a time. Never apply direct ice on bare skin.'
  },
  {
    id: 'tip-3',
    title: 'Proper Heavy Object Lifting',
    category: 'Spine Protection',
    iconName: 'Activity',
    tip: 'Bending at the waist with straight legs places excessive shear stress on the L4-L5 lumbar spine.',
    actionStep: 'Bend your knees, tighten your core abdominal wall, hold the load close to your chest, and lift with your thighs.'
  },
  {
    id: 'tip-4',
    title: 'Stroke Recovery: The Early Window',
    category: 'Neuro Recovery',
    iconName: 'Brain',
    tip: 'The human brain exhibits maximal neuroplastic capacity in the first 3 to 6 months following a stroke.',
    actionStep: 'Initiate structured physical therapy as soon as medically stabilized to accelerate limb re-training.'
  }
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'article-1',
    slug: '5-daily-habits-lower-back-pain-sciatica',
    title: '5 Daily Habits to Eliminate Lower Back Pain and Sciatica for Desk Workers & Drivers',
    category: 'spine-back',
    categoryLabel: 'Spine & Back Health',
    readTime: '4 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Chinedu Okafor',
      role: 'Chief Physiotherapist & Spine Specialist',
      avatar: '/images/92,1252x1254+0+0/27300475/chineduokafor-8nKSetgdRTt1w6ZHdHakhg.png'
    },
    summary: 'Lower back pain is the leading cause of activity limitation across Nigeria. Learn 5 evidence-based ergonomic adjustments and spinal mobility exercises to relieve lumbar strain.',
    keyTakeaways: [
      'Sitting without lumbar support doubles intradiscal pressure compared to relaxed standing.',
      'Active micro-breaks every 30 minutes reset spinal posture and prevent muscle spasm.',
      'Core stabilization (transverse abdominis activation) protects the spine better than traditional sit-ups.',
      'Never ignore tingling or shooting pain traveling down your leg (sciatica).'
    ],
    content: {
      introduction: 'Lower back pain and sciatica affect up to 80% of adults at some point in their lifetime. In modern sedentary environments—whether sitting in long traffic commutes or working long hours at computer desks in Asaba—the lumbar spine endures continuous compressive loading. Fortunately, targeted physiotherapy habits can decompress your spine and prevent recurrent flares.',
      sections: [
        {
          heading: '1. Establish Ergonomic Lumbar Support',
          body: 'When seated, the natural inward curve (lordosis) of your lower back tends to flatten out, transferring the load from bones onto spinal discs and ligaments. Place a small lumbar roll or rolled hand towel behind your lower back to maintain your natural spinal curve.',
          actionableTips: [
            'Adjust chair height so your hips are slightly higher than your knees.',
            'Keep your computer monitor at eye level to prevent forward neck slouching.'
          ]
        },
        {
          heading: '2. Practice the McKenzie Prone Extension',
          body: 'Gentle spinal extension moves the nucleus pulposus inside your discs forward, taking direct pressure off irritated sciatic nerves.',
          actionableTips: [
            'Lie flat on your stomach for 2 minutes.',
            'Slowly prop yourself up on your elbows, keeping your hips and pelvis relaxed against the floor.',
            'Perform 10 gentle repetitions morning and evening.'
          ]
        },
        {
          heading: '3. Activate Deep Core Stabilizers (The Pelvic Brace)',
          body: 'Your core acts as a natural internal back brace. Weakness in the transverse abdominis and gluteal muscles forces your lumbar joints to absorb excessive shock.',
          actionableTips: [
            'Practice gentle abdominal drawing-in: gently pull your navel toward your spine while breathing normally.',
            'Incorporate daily glute bridges and bird-dog exercises.'
          ]
        },
        {
          heading: '4. Perform Glute & Piriformis Stretches',
          body: 'A tight piriformis muscle deep in the buttock can compress the sciatic nerve, causing sharp shooting pain down the back of your leg.',
          actionableTips: [
            'Sit in a sturdy chair, cross one ankle over the opposite knee (figure-4 shape), and gently lean your torso forward with a straight spine until you feel a comfortable stretch.'
          ]
        }
      ],
      physioAdvice: 'If you experience severe shooting leg pain, numbness in the foot, or weakness when lifting your toes, seek a comprehensive clinical assessment immediately.'
    },
    image: '/images/882/27297959/MusculoskeletalPhysiotherapy-lfnWCPu2qe7Lc1GKFqQG1A.webp',
    tags: ['Back Pain', 'Sciatica', 'Ergonomics', 'Spine Rehabilitation', 'Asaba Physio'],
    relatedServiceId: 'musculoskeletal'
  },
  {
    id: 'article-2',
    slug: 'stroke-recovery-golden-window-neuro-rehabilitation',
    title: 'The Golden Recovery Window in Stroke Rehabilitation: What Every Family Needs to Know',
    category: 'stroke-neuro',
    categoryLabel: 'Stroke & Neurological Care',
    readTime: '6 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Blessing Nwosu',
      role: 'Senior Neuro-Physiotherapist',
      avatar: '/images/92,299x300+12+0/27300652/BlessingNwosu-9_p1wcpsO5aTVxE1D1O1gw.webp'
    },
    summary: 'Discover how neuroplasticity drives post-stroke motor recovery, why the first 90 to 180 days are critical, and how targeted neuro-physiotherapy helps patients regain independent movement.',
    keyTakeaways: [
      'Neuroplasticity allows healthy brain regions to adopt functions of damaged neural pathways.',
      'Starting specialized physiotherapy early prevents joint contractures, muscle wasting, and learned non-use.',
      'Repetitive, task-oriented gait and hand retraining yield the highest long-term functional recovery rates.',
      'Caregiver support and positive home reinforcement significantly boost patient motivation and recovery speed.'
    ],
    content: {
      introduction: 'A stroke is a life-altering neurological event, but it does not mean permanent loss of independence. The human brain possesses an incredible biological capacity called neuroplasticity—the ability to rewire connections and create new neural pathways. Understanding how to stimulate this process through structured neuro-physiotherapy is the key to regaining motor control, speech, and mobility.',
      sections: [
        {
          heading: '1. Why Early Mobilization Matters',
          body: 'As soon as the patient is medically stabilized in the hospital, gentle bedside physiotherapy should commence. Early passive range-of-motion exercises prevent stiffness, preserve joint capsules, and reduce the risk of deep vein thrombosis (DVT) and pressure ulcers.',
          actionableTips: [
            'Perform gentle bed positioning to prevent shoulder subluxation and hand curling.',
            'Encourage active-assisted movement on the affected side whenever possible.'
          ]
        },
        {
          heading: '2. Managing Muscle Tone & Spasticity',
          body: 'Post-stroke spasticity causes involuntary muscle tightness, often pulling the arm into a clenched fist or turning the foot inward. Our therapists use targeted stretching, sustained positioning, and neuromuscular facilitation techniques to normalize tone and facilitate voluntary movement.'
        },
        {
          heading: '3. Task-Specific Gait & Balance Training',
          body: 'Regaining the ability to walk safely requires coordinated trunk control, weight shifting, and rhythmic limb advancement. We utilize parallel bar training, body-weight supported gait sessions, and sensory re-education to guide patients from wheelchair reliance to confident, independent steps.'
        }
      ],
      physioAdvice: 'Recovery is a marathon, not a sprint. Even beyond 6 months, consistent neuro-rehabilitation continues to yield functional gains in dexterity, balance, and quality of life.'
    },
    image: '/images/1920/27299803/StrokeRehabilitation-AH3bdDCLa4Jiom6aED5R_A.webp',
    tags: ['Stroke Rehab', 'Neuroplasticity', 'Paralysis Care', 'Gait Training', 'Neurology'],
    relatedServiceId: 'stroke-rehab'
  },
  {
    id: 'article-3',
    slug: 'pediatric-physiotherapy-erbs-palsy-cerebral-palsy-milestones',
    title: 'Pediatric Physiotherapy for Erb’s Palsy, Cerebral Palsy & Delayed Motor Milestones',
    category: 'pediatric',
    categoryLabel: 'Pediatric Health',
    readTime: '5 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Ngozi Ibekwe',
      role: 'Consultant Pediatric Physiotherapist',
      avatar: '/images/92,287x288+19+0/27300796/NgoziIbekwe-E5PzMF58VNTgFFLbIhOqCQ.webp'
    },
    summary: 'A comprehensive guide for parents on identifying developmental motor delays, understanding Erb’s palsy and clubfoot interventions, and how early pediatric physical therapy transforms children’s lives.',
    keyTakeaways: [
      'Early intervention within the first weeks or months of infancy delivers the highest rate of full motor recovery.',
      'Brachial plexus injuries (Erb’s Palsy) respond exceptionally well to gentle range-of-motion and sensory stimulation.',
      'Ponseti method casting combined with pediatric physiotherapy corrects congenital clubfoot without invasive surgery.',
      'Therapeutic play encourages natural developmental milestones like rolling, sitting, crawling, and walking.'
    ],
    content: {
      introduction: 'Watching your child grow and reach developmental milestones is one of life’s greatest joys. However, conditions such as difficult birth deliveries (brachial plexus injuries / Erb’s palsy), neonatal jaundice complications, cerebral palsy, or congenital clubfoot can impair a child’s motor progression. With compassionate, child-friendly physiotherapy, children can build strength, balance, and coordination.',
      sections: [
        {
          heading: '1. Recognizing Delayed Motor Milestones',
          body: 'Every child develops at their own pace, but significant delays—such as an infant not holding their head by 4 months, not sitting without support by 9 months, or favoring only one arm—warrant a prompt pediatric physiotherapy evaluation.',
          actionableTips: [
            'Practice supervised "tummy time" for 10–15 minutes multiple times daily to build neck and upper back strength.',
            'Provide colorful toys that encourage two-handed reaching and trunk rotation.'
          ]
        },
        {
          heading: '2. Early Care for Erb’s Palsy (Brachial Plexus Injury)',
          body: 'Erb’s palsy occurs when the nerves of the baby’s neck and shoulder are stretched during delivery, causing weakness or lack of movement in one arm. Daily passive range of motion prevents contractures, while sensory stroking stimulates nerve regeneration.'
        },
        {
          heading: '3. Correcting Clubfoot (Talipes Equinovarus)',
          body: 'Congenital clubfoot is fully treatable. Through serial gentle manipulation and customized bracing, we guide the infant’s feet into anatomically correct alignment, allowing the child to run and play normally throughout life.'
        }
      ],
      physioAdvice: 'Early intervention is the greatest gift for your child’s physical future. The earlier gentle therapy begins, the greater the potential for unhindered mobility.'
    },
    image: '/images/547/27303148/ErbsPalsyTreatment-RapKHzs-4K3RJsflzNjm4w.webp',
    tags: ['Pediatric Physio', 'Erbs Palsy', 'Cerebral Palsy', 'Clubfoot', 'Child Development'],
    relatedServiceId: 'erbs-palsy'
  },
  {
    id: 'article-4',
    slug: 'managing-knee-osteoarthritis-pain-without-surgery',
    title: 'Managing Knee Osteoarthritis & Joint Pain: How Physiotherapy Delays or Prevents Surgery',
    category: 'joint-arthritis',
    categoryLabel: 'Joint & Arthritis Care',
    readTime: '4 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Tunde Alabi',
      role: 'Orthopedic Rehabilitation Specialist',
      avatar: '/images/92,1252x1254+0+0/27300730/tunde-Y4G8IKHFbHAotLal9NIMMA.webp'
    },
    summary: 'Learn how strengthening your quadriceps, improving synovial fluid circulation, and offloading knee cartilage can dramatically reduce arthritis pain and keep you active.',
    keyTakeaways: [
      'Strong quadriceps and hamstrings act as internal shock absorbers for the knee joint.',
      'Movement promotes the production of synovial fluid, which lubricates cartilage and relieves morning stiffness.',
      'Weight management directly multiplies knee joint relief (1 kg weight loss reduces knee impact by 4 kg).',
      'Low-impact activities like stationary cycling and water aerobics are ideal for arthritic joints.'
    ],
    content: {
      introduction: 'Osteoarthritis is one of the most common causes of knee pain and difficulty climbing stairs or standing up from low chairs. While cartilage wear occurs naturally with age, joint pain does not have to dictate your lifestyle. Physiotherapy provides effective, non-invasive strategies to relieve joint friction and restore pain-free walking.',
      sections: [
        {
          heading: '1. Quadriceps & VMO Strengthening',
          body: 'The Vastus Medialis Oblique (VMO) muscle on the inner thigh stabilizes the kneecap (patella). When weak, the kneecap tracks incorrectly, causing bone-on-cartilage grinding and inflammation.',
          actionableTips: [
            'Perform seated straight-leg raises with toes pointed slightly outward.',
            'Do isometric wall sits or shallow mini-squats to build endurance without overloading the joint.'
          ]
        },
        {
          heading: '2. Decompressing the Joint with Manual Therapy',
          body: 'Gentle manual joint mobilization performed by a licensed physiotherapist stretches the joint capsule and stimulates endogenous pain relief, providing immediate ease of movement.'
        },
        {
          heading: '3. Footwear and Biomechanical Correction',
          body: 'Over-pronation (flat feet) causes the lower leg to rotate inward, increasing pressure on the medial knee compartment. Supportive footwear and corrective orthotics restore balanced alignment.'
        }
      ],
      physioAdvice: 'Do not wait until the knee becomes completely stiff or swollen. Regular therapeutic exercise preserves joint cartilage and prevents surgical replacement.'
    },
    image: '/images/612/27299808/Post-SurgicalManagement-UBrMgCOmA9cBZSIYvbkNtQ.webp',
    tags: ['Knee Pain', 'Osteoarthritis', 'Joint Health', 'Non-Surgical Relief', 'Orthopedics'],
    relatedServiceId: 'musculoskeletal'
  },
  {
    id: 'article-5',
    slug: 'post-surgical-physiotherapy-knee-hip-fracture-recovery',
    title: 'Post-Surgical Physiotherapy: Critical Milestones for Knee, Hip & Fracture Rehabilitation',
    category: 'post-surgery',
    categoryLabel: 'Post-Surgical Rehab',
    readTime: '5 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Chinedu Okafor',
      role: 'Chief Physiotherapist',
      avatar: '/images/92,1252x1254+0+0/27300475/chineduokafor-8nKSetgdRTt1w6ZHdHakhg.webp'
    },
    summary: 'Undergoing surgery is only the first half of recovery. Structured post-operative physiotherapy restores range of motion, breaks down scar tissue, and rebuilds muscular strength.',
    keyTakeaways: [
      'Physiotherapy should begin within days of orthopedic surgery under surgeon protocol guidance.',
      'Early lymphatic drainage and controlled movement prevent excessive swelling and deep joint stiffness.',
      'Gradual progressive loading rebuilds bone density and muscular power safely.',
      'Proprioception and balance retraining prevent future falls or re-injury.'
    ],
    content: {
      introduction: 'Whether you have had knee ligament reconstruction (ACL), hip replacement, open reduction fracture fixation, or spinal decompression surgery, the success of your procedure depends heavily on rehabilitation. Without structured therapy, surgical repairs can heal with excessive scar tissue, persistent stiffness, and chronic muscle weakness.',
      sections: [
        {
          heading: 'Phase 1: Pain & Swelling Management (Weeks 1–3)',
          body: 'The primary goal immediately following surgery is controlling inflammation, promoting wound healing, and activating dormant stabilizing muscles with gentle isometric contractions.',
          actionableTips: [
            'Use the R.I.C.E protocol (Rest, Ice, Compression, Elevation) as guided by your therapist.',
            'Perform gentle ankle pumps to maintain calf blood circulation and prevent blood clots.'
          ]
        },
        {
          heading: 'Phase 2: Restoring Full Range of Motion (Weeks 4–8)',
          body: 'Manual therapy, gentle continuous passive motion, and targeted stretches prevent fibrosis and restore normal joint flexion and extension.'
        },
        {
          heading: 'Phase 3: Functional Strength & Return to Activity (Weeks 8+)',
          body: 'We introduce resistance bands, balance boards, and sport/work-specific movement drills to return you to full physical independence.'
        }
      ],
      physioAdvice: 'Always coordinate your physiotherapy with your orthopedic surgeon’s protocol to ensure safe, milestone-driven recovery.'
    },
    image: '/images/612/27299808/Post-SurgicalManagement-UBrMgCOmA9cBZSIYvbkNtQ.webp',
    tags: ['Post-Surgery', 'Rehabilitation', 'Fracture Care', 'Knee Replacement', 'Physical Therapy'],
    relatedServiceId: 'post-surgical'
  },
  {
    id: 'article-6',
    slug: 'relieving-neck-tension-cervical-spondylosis-stretches',
    title: 'Relieving Neck Tension & "Text Neck": 4 Physiotherapist-Approved Home Stretches',
    category: 'wellness-prevention',
    categoryLabel: 'Wellness & Prevention',
    readTime: '3 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Amaka Eze',
      role: 'Wellness & Ergonomics Lead',
      avatar: '/images/92,765x766+0+128/27300846/Amakaeze--aCGAL0ghM8esEfhgo4udA.webp'
    },
    summary: 'Looking down at smartphones and laptops places up to 27kg of strain on your cervical spine. Learn 4 quick daily stretches to release trapped nerves and eliminate tension headaches.',
    keyTakeaways: [
      'Tilting your head forward at 60 degrees increases the weight on your cervical spine from 5kg to 27kg.',
      'Chin tucks strengthen deep cervical flexors that hold your head upright.',
      'Tight upper trapezius and levator scapulae muscles frequently trigger tension headaches behind the eyes.',
      'Frequent postural resets throughout the workday prevent chronic cervical spondylosis.'
    ],
    content: {
      introduction: 'In our smartphone-driven world, "text neck" has become an epidemic. The average human head weighs about 5kg in an upright position. When tilted forward, the effective gravitational load on your neck muscles and cervical vertebrae skyrockets to 27kg. This chronic strain leads to disc bulges, pinched nerves, tingling in the fingers, and throbbing tension headaches.',
      sections: [
        {
          heading: '1. The Retraction Chin Tuck',
          body: 'The single most effective exercise to reverse forward-head posture and open up the neural foramina.',
          actionableTips: [
            'Sit tall, look straight ahead, and gently pull your chin straight back as if making a "double chin".',
            'Hold for 5 seconds; repeat 10 times.'
          ]
        },
        {
          heading: '2. Upper Trapezius Stretch',
          body: 'Sit on one hand to anchor your shoulder down. Gently tilt your opposite ear toward your opposite shoulder until a soothing stretch is felt along the side of the neck. Hold for 20 seconds each side.'
        },
        {
          heading: '3. Levator Scapulae "Smell the Armpit" Stretch',
          body: 'Turn your head 45 degrees to the side, look down toward your armpit, and use gentle hand pressure on the crown of your head to lengthen the deep neck muscle.'
        }
      ],
      physioAdvice: 'Perform these stretches every 2 hours during long work or driving sessions to keep your cervical spine flexible and pain-free.'
    },
    image: '/images/547/27303071/FullBodyMassage-q644JnCMDKrGVc3TTr80ng.webp',
    tags: ['Neck Pain', 'Cervical Spondylosis', 'Text Neck', 'Headache Relief', 'Ergonomics'],
    relatedServiceId: 'musculoskeletal'
  }
];
