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
  },
  {
    id: 'article-7',
    slug: 'frozen-shoulder-adhesive-capsulitis-recovery-stages',
    title: 'Overcoming Frozen Shoulder (Adhesive Capsulitis): The 3 Clinical Stages & Gentle Mobility Protocols',
    category: 'joint-arthritis',
    categoryLabel: 'Joint & Arthritis Care',
    readTime: '5 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Tunde Alabi',
      role: 'Orthopedic Rehabilitation Specialist',
      avatar: '/images/92,1252x1254+0+0/27300730/tunde-Y4G8IKHFbHAotLal9NIMMA.webp'
    },
    summary: 'Adhesive capsulitis causes severe shoulder stiffness and nocturnal ache. Understand the freezing, frozen, and thawing phases, and how gentle physiotherapeutic joint glides prevent permanent range loss.',
    keyTakeaways: [
      'Frozen shoulder progresses through 3 distinct phases: Freezing (pain predominant), Frozen (stiffness predominant), and Thawing (gradual recovery).',
      'Aggressive forced stretching during Stage 1 aggravates capsular inflammation and worsens stiffness.',
      'Passive Codman pendulum swings and low-grade Maitland mobilizations reduce pain without aggravating the capsule.',
      'Loss of external rotation with the elbow tucked at the side is the clinical hallmark of adhesive capsulitis.'
    ],
    content: {
      introduction: 'Adhesive capsulitis, commonly known as frozen shoulder, is a condition characterized by insidious onset of pain and progressive global restriction of active and passive glenohumeral motion. The joint capsule thickens, contracts, and develops fibrotic adhesions that restrict the humeral head from gliding freely. With stage-appropriate physical therapy, patients can accelerate resolution and regain overhead reach.',
      sections: [
        {
          heading: '1. Phase 1: The "Freezing" Stage (2 to 9 Months)',
          body: 'During this inflammatory phase, pain is severe, constant, and typically worse at night when lying on the affected shoulder. Aggressive stretching during this phase triggers inflammatory flares. Treatment focuses on pain modulation, gentle heat/cold, and non-provocative pendular oscillations.',
          actionableTips: [
            'Perform Codman Pendulum swings: lean forward over a table, let the affected arm hang relaxed like a dead weight, and gently sway your body to circle the arm without active muscular effort.',
            'Sleep on your back or unaffected side with a supportive pillow placed under the forearm of the affected limb.'
          ]
        },
        {
          heading: '2. Phase 2: The "Frozen" Stage (4 to 12 Months)',
          body: 'Pain begins to plateau or diminish, but stiffness reaches its peak. Active daily tasks like fastening garments behind the back or reaching overhead become severely restricted. Physiotherapy introduces progressive end-range sustained stretches and posterior capsular mobilizations.'
        },
        {
          heading: '3. Phase 3: The "Thawing" Stage (12 to 24+ Months)',
          body: 'Spontaneous resolution begins as the contracted capsule remodels. Structured rotator cuff strengthening, scapular stabilization, and functional neuromuscular re-education ensure full restoration of joint mechanics.'
        }
      ],
      physioAdvice: 'Early diagnosis by a physiotherapist differentiates adhesive capsulitis from rotator cuff tears and calcific tendinopathy, ensuring you receive the correct treatment at each stage.'
    },
    image: '/images/1920/27323029/TotalMotion-i6V21VBepNOiZPFWp0X9Kg.webp',
    tags: ['Frozen Shoulder', 'Adhesive Capsulitis', 'Shoulder Pain', 'Joint Mobilization', 'Orthopedics'],
    relatedServiceId: 'musculoskeletal'
  },
  {
    id: 'article-8',
    slug: 'plantar-fasciitis-morning-heel-pain-rathleff-protocol',
    title: 'Plantar Fasciitis & Morning Heel Pain: Why Rest Fails and How High-Load Strength Training Heals',
    category: 'wellness-prevention',
    categoryLabel: 'Wellness & Prevention',
    readTime: '4 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Chinedu Okafor',
      role: 'Chief Physiotherapist & Spine Specialist',
      avatar: '/images/92,1252x1254+0+0/27300475/chineduokafor-8nKSetgdRTt1w6ZHdHakhg.webp'
    },
    summary: 'Sharp pain upon taking your first morning steps is the classic hallmark of plantar fasciopathy. Discover the clinically proven Rathleff high-load strength protocol, calf-ankle mobility drills, and arch biomechanics.',
    keyTakeaways: [
      'Plantar fasciitis is predominantly a degenerative micro-tear disorder (fasciopathy) rather than purely acute inflammation.',
      'Complete immobilization weakens collagen fibres; controlled progressive mechanical loading stimulates tissue remodeling.',
      'The Rathleff Protocol (heel raises with a towel under the big toe) activates the Windlass mechanism to rebuild tendon tensile strength.',
      'Tight gastrocnemius and soleus calf muscles limit dorsiflexion and transfer massive compensatory tension onto the plantar fascia.'
    ],
    content: {
      introduction: 'That sharp, stabbing pain under your heel when taking your first morning steps or standing up after prolonged sitting is plantar fasciopathy. The plantar fascia is a thick fibrous band connecting your calcaneus (heel bone) to your toes. In modern concrete environments and with unsupportive footwear, repetitive tensile overload causes collagen degeneration.',
      sections: [
        {
          heading: '1. The Rathleff High-Load Strength Protocol',
          body: 'Published in the Scandinavian Journal of Medicine & Science in Sports, heavy-slow resistance training produces faster pain reduction and superior functional recovery compared to standard stretching alone.',
          actionableTips: [
            'Place a rolled hand towel under your toes on a stair or step to hyperextend the metatarsophalangeal joints (engaging the Windlass mechanism).',
            'Perform slow, controlled calf raises: 3 seconds to rise, 2-second hold at top, 3 seconds to lower.',
            'Perform 3 sets of 12 repetitions every other day, gradually adding backpack weight as pain allows.'
          ]
        },
        {
          heading: '2. Gastrocnemius & Soleus Calf Mobilization',
          body: 'A stiff ankle joint forces the foot to over-pronate during push-off. Stretching both the straight-knee calf (gastrocnemius) and bent-knee calf (soleus) restores normal 15-20 degrees of ankle dorsiflexion.'
        },
        {
          heading: '3. Pre-Step Morning Mobilization Routine',
          body: 'Before putting weight on your feet in the morning, cross your leg over and use your hands to gently pull your toes upward toward your shin for 10 seconds (repeat 5 times). This warms the contracted fascia before initial weight-bearing.'
        }
      ],
      physioAdvice: 'Avoid walking barefoot on hard tile or stone floors while recovering. Custom or semi-rigid orthotic arch supports cushion the medial calcaneal tuberosity and accelerate healing.'
    },
    image: '/images/408/27299818/clubfoot-gYGnG5vQHpePmAvZUnuKRQ.webp',
    tags: ['Plantar Fasciitis', 'Heel Pain', 'Rathleff Protocol', 'Foot & Ankle', 'Physiotherapy'],
    relatedServiceId: 'musculoskeletal'
  },
  {
    id: 'article-9',
    slug: 'carpal-tunnel-syndrome-nerve-gliding-ergonomics',
    title: 'Carpal Tunnel Syndrome vs. Pinched Neck Nerve: Neurodynamic Flossing & Ergonomics',
    category: 'spine-back',
    categoryLabel: 'Spine & Back Health',
    readTime: '5 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Amaka Eze',
      role: 'Wellness & Ergonomics Lead',
      avatar: '/images/92,765x766+0+128/27300846/Amakaeze--aCGAL0ghM8esEfhgo4udA.webp'
    },
    summary: 'Numbness, tingling, or nighttime burning in the thumb, index, and middle fingers can stem from wrist compression or cervical root irritation. Learn neurodynamic nerve gliding exercises and optimal wrist positioning.',
    keyTakeaways: [
      'The median nerve passes through the carpal tunnel beneath the transverse carpal ligament, supplying the thumb, index, middle, and half of ring finger.',
      'Sustained wrist extension while typing or using a mouse increases carpal tunnel pressure six-fold.',
      'Differentiating median nerve entrapment at the wrist from cervical radiculopathy (C6/C7 disc pinch) is essential for targeted treatment.',
      'Neurodynamic "nerve flossing" glides the nerve through surrounding tissues, preventing adhesions and restoring microcirculation.'
    ],
    content: {
      introduction: 'Tingling fingers, weak grip, and waking up in the middle of the night needing to "shake out" your hand are hallmark signs of median nerve distress. Whether caused by prolonged computer typing, driving, pregnancy fluid retention, or repetitive manual tasks, conservative physiotherapy resolves symptoms in over 75% of mild-to-moderate cases without surgery.',
      sections: [
        {
          heading: '1. Wrist Ergonomics & Neutral Splinting',
          body: 'Resting your wrist on a hard desk edge or working with the wrist tilted upward (extension) narrows the carpal tunnel cross-sectional area. Keep your forearms supported so your wrists remain in a neutral 0-degree plane.',
          actionableTips: [
            'Wear a neutral wrist splint at night to prevent sleep-induced wrist curling (flexion), which chokes axonal blood flow.',
            'Position your mouse and keyboard so you do not have to stretch or deviate your wrist sideways.'
          ]
        },
        {
          heading: '2. Median Nerve Gliding Exercises',
          body: 'Gentle nerve mobilizations slide the median nerve along its anatomical pathway from the neck down to the fingertips, reducing intraneural edema.',
          actionableTips: [
            'Make a fist with the thumb outside the fingers.',
            'Open fingers and extend the wrist back gently.',
            'Extend the thumb outward and slowly tilt the head toward the opposite shoulder.',
            'Perform 5 smooth, painless repetitions 3 times daily. Never push into sharp tingling or pain.'
          ]
        },
        {
          heading: '3. Cervical Spine & Thoracic Outlet Assessment',
          body: 'In "double crush syndrome", a mild compression of cervical nerve roots in the neck sensitizes the nerve along its distal pathway at the wrist. A complete spinal evaluation ensures no underlying cervical issue is overlooked.'
        }
      ],
      physioAdvice: 'If you notice visible muscle wasting at the base of your thumb (thenar atrophy) or constant numbness that does not resolve, immediate clinical consultation is required.'
    },
    image: '/images/547/27303071/FullBodyMassage-q644JnCMDKrGVc3TTr80ng.webp',
    tags: ['Carpal Tunnel', 'Nerve Gliding', 'Hand Numbness', 'Ergonomics', 'Neurodynamics'],
    relatedServiceId: 'musculoskeletal'
  },
  {
    id: 'article-10',
    slug: 'peace-and-love-protocol-acute-sprain-injury-recovery',
    title: 'Why The Old R.I.C.E. Protocol Was Replaced by P.E.A.C.E. & L.O.V.E. for Sprains & Muscle Tears',
    category: 'post-surgery',
    categoryLabel: 'Post-Surgical Rehab',
    readTime: '5 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Tunde Alabi',
      role: 'Orthopedic Rehabilitation Specialist',
      avatar: '/images/92,1252x1254+0+0/27300730/tunde-Y4G8IKHFbHAotLal9NIMMA.webp'
    },
    summary: 'Published in the British Journal of Sports Medicine, the modern P.E.A.C.E. & L.O.V.E. framework replaces excessive ice and anti-inflammatories with active mechanotherapy to rebuild strong, resilient soft tissue.',
    keyTakeaways: [
      'Excessive ice application delays tissue healing by shutting down the initial cellular inflammatory response required for collagen repair.',
      'NSAIDs (anti-inflammatory drugs) taken during the first 48 hours impair tissue regeneration and tendon-to-bone healing.',
      'P.E.A.C.E. governs the acute management phase (Days 1–3): Protect, Elevate, Avoid anti-inflammatories, Compress, Educate.',
      'L.O.V.E. guides subacute rehabilitation (Day 4 onwards): Load, Optimism, Vascularization, Exercise.'
    ],
    content: {
      introduction: 'For decades, athletes and injured patients were instructed to follow the R.I.C.E. protocol (Rest, Ice, Compression, Elevation). However, contemporary sports medicine and cellular biology have revealed that prolonged rest and aggressive icing blunt the natural inflammatory cascade essential for tissue remodeling. The British Journal of Sports Medicine introduced P.E.A.C.E. & L.O.V.E. as the gold standard for soft tissue recovery.',
      sections: [
        {
          heading: '1. The Acute Phase: P.E.A.C.E. (First 1 to 3 Days)',
          body: 'Immediately following an ankle sprain, muscle strain, or ligament tear, focus on protecting the tissue without halting healing biological processes.',
          actionableTips: [
            'P - Protect: Unload and restrict movement for the first 24–48 hours to minimize bleeding.',
            'E - Elevate: Elevate the limb higher than the heart to promote interstitial fluid drainage.',
            'A - Avoid Anti-inflammatories: Allow natural inflammatory cells (macrophages) to clean up damaged fibers.',
            'C - Compress: Use elastic bandage wrapping to limit intra-articular edema.',
            'E - Educate: Learn that active recovery outperforms passive modalities.'
          ]
        },
        {
          heading: '2. The Subacute Phase: L.O.V.E. (Day 4 Onwards)',
          body: 'After the initial acute pain subsides, dynamic movement and progressive mechanotransduction guide new collagen alignment.',
          actionableTips: [
            'L - Load: Introduce pain-free, active weight-bearing early to stimulate tendon/ligament remodeling.',
            'O - Optimism: Maintain a positive psychological outlook, which directly correlates with faster neurological and motor recovery.',
            'V - Vascularization: Engage in pain-free cardiovascular activity (e.g. stationary cycling) to boost blood perfusion.',
            'E - Exercise: Rebuild strength, joint proprioception, and dynamic neuromuscular control.'
          ]
        }
      ],
      physioAdvice: 'Early guided physical therapy transforms a vulnerable sprain into a fully resilient, re-injury-resistant joint.'
    },
    image: '/images/1920/27323026/Wellness-fsxjlunXObTd_keNXqFrfA.webp',
    tags: ['PEACE and LOVE', 'Sprain Treatment', 'Sports Injury', 'Ankle Rehab', 'Evidence-Based Physio'],
    relatedServiceId: 'post-surgical'
  },
  {
    id: 'article-11',
    slug: 'senior-balance-fall-prevention-otago-exercises',
    title: 'Senior Balance & Fall Prevention: The Otago Physical Therapy Guide to Preserving Independence',
    category: 'wellness-prevention',
    categoryLabel: 'Wellness & Prevention',
    readTime: '6 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Blessing Nwosu',
      role: 'Senior Neuro-Physiotherapist',
      avatar: '/images/92,299x300+12+0/27300652/BlessingNwosu-9_p1wcpsO5aTVxE1D1O1gw.webp'
    },
    summary: 'Falls are the leading cause of hip fractures and loss of autonomy among seniors. Discover how multi-sensory balance retraining, reactive stepping, and lower-limb strengthening preserve safety and mobility.',
    keyTakeaways: [
      'Age-related loss of muscle mass (sarcopenia) and decreased sensory feedback slow reactive fall recovery reflexes.',
      'The Otago Exercise Program is clinically proven to reduce falls in older adults by 35% to 50%.',
      'Training the 3 balance systems (Visual, Vestibular, and Proprioceptive) keeps coordination sharp.',
      'Sit-to-stand power drills rebuild the quadriceps and gluteal strength required for independent stair navigation.'
    ],
    content: {
      introduction: 'Maintaining physical autonomy, confidence, and steady footing is essential for enjoying healthy senior years. Balance is not a single sense—it is an intricate integration of what your eyes see, what your inner ear senses (vestibular), and what the nerve receptors in your feet and joints feel (proprioception). Structured geriatric physical therapy maintains bone density, joint flexibility, and rapid postural reflexes.',
      sections: [
        {
          heading: '1. The 3 Pillars of Postural Stability',
          body: 'As we age, we often become overly reliant on visual cues for balance. When light dims or ground surfaces become uneven, falls happen. Physiotherapy trains the vestibular system and ankle proprioceptors to maintain equilibrium regardless of visual conditions.',
          actionableTips: [
            'Practice Tandem Standing: Stand with one foot directly in front of the other (heel-to-toe) near a sturdy countertop for safety. Hold for 20 seconds, then switch feet.',
            'Perform Single-Leg Stance: Stand on one foot while lightly touching a support, progressing to hands-free as confidence builds.'
          ]
        },
        {
          heading: '2. Functional Lower-Limb Power (Sit-to-Stand)',
          body: 'Strong thigh, hip, and calf muscles provide the mechanical force needed to catch yourself if you trip.',
          actionableTips: [
            'Perform Chair Squats: Sit on a sturdy dining chair, cross your arms over your chest, lean slightly forward from your hips, and stand up without using your hands. Repeat 10 times daily.'
          ]
        },
        {
          heading: '3. Home Hazard Audit & Environmental Safety',
          body: 'Eliminating throw rugs, installing secure grab bars in bathrooms, and ensuring adequate hallway lighting are simple, life-saving measures.'
        }
      ],
      physioAdvice: 'A comprehensive fall-risk screening by our neuro-physiotherapists assesses your gait velocity, balance thresholds, and muscle power to create a customized home exercise program.'
    },
    image: '/images/576/23397232/confident-senior-male-doctor-with-a-stethoscope-representing-healthcare-professionalism-IpXVokk0utCvqHLjOqiT5Q-ynI_vHAgT7lkEtm41O_x0A.webp',
    tags: ['Senior Health', 'Fall Prevention', 'Balance Training', 'Otago Protocol', 'Geriatric Physio'],
    relatedServiceId: 'stroke-rehab'
  },
  {
    id: 'article-12',
    slug: 'postpartum-diastasis-recti-pelvic-floor-rehabilitation',
    title: 'Postpartum Recovery: Restoring The Pelvic Floor, Healing Diastasis Recti & Relieving Pelvic Girdle Pain',
    category: 'wellness-prevention',
    categoryLabel: 'Wellness & Prevention',
    readTime: '5 min read',
    publishDate: 'Updated August 2026',
    author: {
      name: 'Dr. Ngozi Ibekwe',
      role: 'Consultant Pediatric & Women’s Health Physiotherapist',
      avatar: '/images/92,287x288+19+0/27300796/NgoziIbekwe-E5PzMF58VNTgFFLbIhOqCQ.webp'
    },
    summary: 'Pregnancy and childbirth place immense mechanical stress on the linea alba and pelvic hammock. Learn evidence-based diaphragmatic breathing, deep transverse abdominis activation, and pelvic girdle stabilization.',
    keyTakeaways: [
      'Diastasis Recti is the natural separation of the rectus abdominis muscles caused by hormone-induced stretching of the linea alba.',
      'Traditional sit-ups and forward planks increase intra-abdominal pressure and worsen abdominal doming.',
      'The "Deep Core Canister" (Diaphragm, Transverse Abdominis, Multifidus, and Pelvic Floor) must be retrained synchronously.',
      'Pelvic girdle and sacroiliac (SI) joint pain respond rapidly to manual therapy and gluteal stabilizing exercises.'
    ],
    content: {
      introduction: 'Bringing a child into the world is extraordinary, but pregnancy and delivery fundamentally alter the biomechanics of the pelvis, spine, and abdominal wall. Many mothers suffer in silence with back pain, urinary leakage when coughing or sneezing (stress incontinence), or abdominal separation (diastasis recti). Women’s health physiotherapy restores core synergy and functional strength.',
      sections: [
        {
          heading: '1. Understanding & Assessing Diastasis Recti',
          body: 'The linea alba connective tissue softens during pregnancy due to relaxin and estrogen hormones. Checking for an abdominal gap and tension generation helps guide safe postpartum recovery.',
          actionableTips: [
            'Avoid traditional crunches, sit-ups, and heavy lifting in the early postpartum period.',
            'Practice rolling to your side ("log roll") before sitting up from bed to avoid straining your healing abdominal wall.'
          ]
        },
        {
          heading: '2. Synchronized Diaphragmatic Core Breathing',
          body: 'As you inhale, your diaphragm and pelvic floor gently descend; as you exhale, they naturally lift and contract together.',
          actionableTips: [
            'Lie on your back with knees bent. Place one hand on your ribs and one on your lower belly.',
            'Inhale deeply into the sides of your ribcage, allowing the belly and pelvic floor to relax.',
            'Exhale gently through pursed lips while gently drawing your lower abdomen inward and lifting the pelvic floor.'
          ]
        },
        {
          heading: '3. Rebuilding Sacroiliac & Pelvic Girdle Stability',
          body: 'Asymmetrical pelvic joint pain is common when walking or rolling over in bed. Targeted glute bridge progressions, clamshells, and bird-dog exercises stabilize the pelvic ring.'
        }
      ],
      physioAdvice: 'Postpartum rehabilitation is essential whether you delivered vaginally or via Caesarean section. Specialized physical therapy restores your core strength and confidence.'
    },
    image: '/images/576/23397373/smiling-female-healthcare-professional-in-white-coat-holding-clipboard-indoors-Leg7p3ROcUngAhFbHVWjqQ-Lm_ioatRSCGN0qoRHe_D4A.webp',
    tags: ['Postpartum Physio', 'Diastasis Recti', 'Pelvic Floor', 'Women Health', 'Core Rehabilitation'],
    relatedServiceId: 'wellness-fitness'
  }
];

