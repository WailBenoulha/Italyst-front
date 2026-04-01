// src/LandingPage/UniversityData.js

const UNIVERSITALY_LINK = "https://www.universitaly.it";

const buildUni = (base) => {
  const isPublic = base.type === 'Public'
  const isSpecial = base.type === 'Special'

  const defaultLanguage = base.language || {
    english: base.englishReq || {
      required: true,
      accepted: ['IELTS (min 5.5–6.5)', 'TOEFL iBT (min 72–90)', 'Cambridge B2 First'],
      note: 'MOI letter accepted from universities where medium of instruction is English.',
    },
    italian: base.italianReq || {
      required: 'For Italian-taught programmes',
      level: 'B1/B2',
      accepted: ['CILS', 'CELI', 'PLIDA', 'IT certified by Italian Cultural Institute'],
    },
  }

  const defaultFees = base.fees || {
    tuition: isPublic ? '€500 – €3,500 / year' : isSpecial ? '€0 (fully funded)' : '€3,000 – €15,000 / year',
    applicationFee: isPublic ? '€0 – €30' : '€50 – €120',
    scholarships: ['DSU Regional Scholarship (covers tuition + stipend)', 'MAECI Italian Government Scholarship', 'University Merit Grants'],
    financialNote: isPublic
      ? 'Tuition is income-based (ISEE declaration). Many students from developing countries pay the minimum fee (€0–€700/year).'
      : 'Private university fees are fixed. Partial scholarships and fee waivers may be available based on merit or income.',
  }

  const defaultDeadlines = base.deadlines || {
    applicationWindow: 'February – July (varies by programme)',
    universitalyDeadline: 'July 15th (Non-EU students)',
    visaDeadline: 'August 30th',
    note: 'Always check the official university portal for programme-specific deadlines.',
  }

  const defaultDocuments = [
    'Valid Passport (copy)',
    'Academic Transcripts (translated + legalised)',
    'Degree Certificate (Apostille/legalised)',
    'Europass CV',
    'Statement of Purpose / Motivation Letter',
    'Language Certificate (English + Italian as required)',
    '2 Letters of Recommendation (for Master & PhD)',
    'Declaration of Value (Dichiarazione di Valore) — for non-EU applicants',
  ]

  return {
    name: base.name,
    type: base.type,
    founded: base.founded,
    students: base.students,
    image: base.image || 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200',
    city: base.city || null,
    website: base.website || '#',
    ranking: base.ranking || null,
    specialities: base.specialities || [],
    programmes: base.programmes || ['Bachelor (Laurea Triennale)', 'Master (Laurea Magistrale)', 'PhD (Dottorato di Ricerca)'],
    language: defaultLanguage,
    admission: {
      gpa: base.gpa || { minimum: '2.0–2.5 / 4.0 equivalent', note: '70%+ or equivalent recommended for competitive programmes.' },
      type: base.admissionType || (isSpecial ? 'Competitive entrance exam + portfolio' : 'Open admission / ranking-based for limited programmes'),
      documents: base.documents || defaultDocuments,
      extraRequirements: base.extraRequirements || [],
    },
    fees: defaultFees,
    deadlines: defaultDeadlines,
    links: {
      website: base.website || '#',
      admissions: base.admissions || '#',
      universitaly: UNIVERSITALY_LINK,
    },
  }
}

const REGIONS = {
  'Piemonte': {
    slug: 'piemonte',
    capital: 'Turin',
    description: 'Industrial heartland meets Alpine majesty. Home to Fiat, fine wines, and elegant baroque architecture.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Torino', type: 'Public', founded: 1404, students: '80,000+', city: 'Turin',
        ranking: 'Top 600 QS World',
        specialities: ['Medicine & Surgery', 'Law', 'Humanities & Philosophy', 'Natural Sciences', 'Pharmacy', 'Political Science', 'Psychology', 'Veterinary Medicine'],
        programmes: ['Bachelor', 'Master', 'PhD', 'Single-Cycle (Medicine, Law)'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 80', 'Cambridge C1'], note: 'English-taught Master programmes available.' },
        deadlines: { applicationWindow: 'Nov 26, 2025 – Jan 29, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Application fee €60. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€60', scholarships: ['DSU Regional Scholarship', 'MAECI', 'University Merit Grants'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Politecnico di Torino', type: 'Public', founded: 1859, students: '35,000+', city: 'Turin',
        ranking: 'Top 400 QS World',
        specialities: ['Engineering (Civil, Mechanical, Aerospace, Electronic)', 'Architecture & Urban Design', 'Computer Science & AI', 'Industrial Design', 'Energy Engineering', 'Mathematical Engineering'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Many Master programmes fully taught in English.' },
        deadlines: { applicationWindow: 'Dec 19, 2025 – Feb 14, 2026 (1st); Mar 3 – Apr 2, 2026 (2nd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Application fee €50. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€50', scholarships: ['DSU Regional Scholarship', 'MAECI', 'Polito Merit Grants'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Università del Piemonte Orientale', type: 'Public', founded: 1998, students: '15,000+', city: 'Vercelli / Alessandria / Novara',
        specialities: ['Medicine', 'Pharmacy', 'Economics', 'Law', 'Political Sciences', 'Sciences and Technology'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'MOI letter'], note: 'Some programmes available in English.' },
        deadlines: { applicationWindow: 'Open enrollment — fill application form', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Regional Scholarship', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Scienze Gastronomiche', type: 'Private', founded: 2004, students: '600+', city: 'Pollenzo (Cuneo)',
        specialities: ['Gastronomic Sciences', 'Food & Wine Communication', 'Sustainable Agriculture', 'Food Journalism', 'Sensory Sciences'],
        programmes: ['Bachelor', 'Master'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 80', 'Cambridge B2+'], note: 'Bilingual English–Italian programme.' },
        fees: { tuition: '€12,000 / year', applicationFee: '€100', scholarships: ['Slow Food Scholarships', 'Merit-based partial grants'], financialNote: 'Private institution; limited scholarships available.' },
      }),
      buildUni({
        name: 'ESCP Business School (Torino Campus)', type: 'Private', founded: 1819, students: '1,000+', city: 'Turin',
        specialities: ['Business Administration', 'Finance', 'Marketing & Digital', 'Luxury Management', 'Entrepreneurship'],
        programmes: ['Master', 'Executive MBA', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90', 'GMAT/GRE'], note: 'Fully English-taught. Multi-campus European degree.' },
        fees: { tuition: '€14,000 – €22,000 / year', applicationFee: '€120', scholarships: ['ESCP Merit Scholarships', 'MAECI'], financialNote: 'Private institution; merit scholarships available.' },
      }),
    ],
  },

  "Valle d'Aosta/Vallée d'Aoste": {
    slug: 'valle-d-aosta',
    capital: 'Aosta',
    description: "Italy's smallest region. Nestled in the Alps, bilingual French-Italian culture.",
    universities: [
      buildUni({
        name: "Università della Valle d'Aosta", type: 'Public', founded: 2000, students: '1,000+', city: 'Aosta',
        specialities: ['Languages & Communication', 'Business & Tourism', 'Education & Childhood Sciences', 'Sport Sciences'],
        programmes: ['Bachelor', 'Master'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 60', 'Cambridge B1+', 'MOI letter'], note: 'Trilingual environment (Italian, French, English).' },
        italianReq: { required: 'B1 recommended', level: 'B1', accepted: ['CILS', 'CELI', 'PLIDA'] },
      }),
    ],
  },

  'Lombardia': {
    slug: 'lombardia',
    capital: 'Milan',
    description: "Italy's economic powerhouse. Global fashion, finance, and design capital.",
    universities: [
      buildUni({
        name: 'Università degli Studi di Milano (La Statale)', type: 'Public', founded: 1924, students: '64,000+', city: 'Milan',
        ranking: 'Top 300 QS World',
        specialities: ['Medicine & Dentistry', 'Law', 'Political Science', 'Economics', 'Humanities', 'Natural Sciences', 'Environmental Science', 'Communication'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge C1'], note: 'International programmes available in English.' },
        deadlines: { applicationWindow: 'Jan 22, 2026 onwards', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Application fee €30. Different CGPA requirements per programme.' },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€30', scholarships: ['DSU Regional Scholarship', 'MAECI', 'University Merit Grants'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Politecnico di Milano', type: 'Public', founded: 1863, students: '47,000+', city: 'Milan',
        ranking: 'Top 150 QS World',
        specialities: ['Architecture & Urban Planning', 'Industrial Design', 'Fashion Design', 'Engineering (all branches)', 'Computer Science & AI', 'Aerospace Engineering', 'Mathematical Engineering'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 80', 'Cambridge B2+'], note: 'All Master programmes fully taught in English.' },
        deadlines: {
          applicationWindow: 'Oct 1 – Dec 1, 2025 (1st Call); Jan 13 – Feb 26, 2026 (Engineering 2nd); Feb 27 – Mar 31, 2026 (Architecture/Design)',
          universitalyDeadline: 'July 15th', visaDeadline: 'August 30th',
          note: '€50 for standard, €150 for Engineering/Architecture calls. Min CGPA 3.3 for Pakistani applicants.',
        },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€50 – €150', scholarships: ['DSU Regione Lombardia', 'MAECI', 'Polimi Excellence Grants'], financialNote: 'Tuition is income-based (ISEE).' },
        gpa: { minimum: '3.3 / 4.0 (Pakistan)', note: 'GPA requirement varies by country of origin.' },
      }),
      buildUni({
        name: 'Università degli Studi di Milano-Bicocca', type: 'Public', founded: 1998, students: '37,000+', city: 'Milan',
        ranking: 'Top 500 QS World',
        specialities: ['Medicine', 'Economics & Statistics', 'Physics', 'Environmental Sciences', 'Psychology', 'Sociology', 'Computer Science'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Growing number of English-taught programmes.' },
        deadlines: { applicationWindow: 'Nov 5, 2025 – Jan 16, 2026 (1st); Feb 10 – Mar 31, 2026 (limited); Mar 16 – Apr 16, 2026 (2nd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€30', scholarships: ['DSU Regional Scholarship', 'MAECI'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Università Bocconi', type: 'Private', founded: 1902, students: '15,000+', city: 'Milan',
        ranking: 'Top 10 in Economics & Business (Europe)',
        specialities: ['Economics', 'Finance & Banking', 'Management', 'Law', 'Data Science & AI', 'Political Science', 'Marketing'],
        programmes: ['Bachelor', 'Master of Science', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90', 'Cambridge C1'], note: 'All Bachelor and Master programmes in English. GMAT/GRE required for some programmes.' },
        fees: { tuition: '€5,000 – €14,000 / year (income-based)', applicationFee: '€85', scholarships: ['Bocconi Merit Awards (full tuition)', 'ISU Need-Based Grants', 'MAECI'], financialNote: 'Generous scholarship programme; many international students receive significant aid.' },
      }),
      buildUni({
        name: 'Università Cattolica del Sacro Cuore', type: 'Private', founded: 1921, students: '42,000+', city: 'Milan',
        ranking: 'Top 600 QS World',
        specialities: ['Medicine & Surgery', 'Economics & Business', 'Law', 'Agriculture & Food Sciences', 'Psychology', 'Communication', 'Education', 'International Relations'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'English-taught programmes in Business, Medicine and International programmes.' },
        fees: { tuition: '€3,000 – €8,000 / year', applicationFee: '€60', scholarships: ['University Merit Grants', 'DSU Scholarships', 'MAECI'], financialNote: 'Fees vary by faculty and income.' },
      }),
      buildUni({
        name: 'Università degli Studi di Pavia', type: 'Public', founded: 1361, students: '26,000+', city: 'Pavia',
        ranking: 'Top 500 QS World',
        specialities: ['Medicine & Surgery', 'Law', 'Engineering', 'Economics', 'Political Science', 'Musicology', 'Pharmacy', 'Natural Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'College system (Collegi di Merito) offers scholarships + accommodation.' },
        deadlines: { applicationWindow: 'Nov 12–20, 2025 (1st); Jan 12–20, 2026 (2nd); Mar 10–18, 2026 (3rd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €35. Min CGPA 2.65 required.' },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€35', scholarships: ['DSU Regional Scholarship', 'MAECI', 'Collegi di Merito'], financialNote: 'Tuition is income-based (ISEE).' },
        gpa: { minimum: '2.65 / 4.0', note: 'Minimum CGPA 2.65 required.' },
      }),
      buildUni({
        name: 'Università degli Studi di Brescia', type: 'Public', founded: 1982, students: '15,000+', city: 'Brescia',
        specialities: ['Medicine', 'Engineering', 'Economics & Management', 'Law'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'MOI letter'], note: 'Limited English-taught programmes; Italian recommended.' },
        deadlines: { applicationWindow: 'Feb 5, 2026 onwards', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. Contact for CGPA details.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€20', scholarships: ['DSU Regional Scholarship', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Bergamo', type: 'Public', founded: 1968, students: '22,000+', city: 'Bergamo',
        specialities: ['Languages & Literature', 'Engineering', 'Economics', 'Human Sciences', 'Education'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Nov 24, 2025 – Jan 15, 2026 (1st); Jan 1–30, 2026 (2nd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Regional Scholarship', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: "Università degli Studi dell'Insubria", type: 'Public', founded: 1998, students: '12,000+', city: 'Varese / Como',
        specialities: ['Medicine', 'Sciences', 'Economics', 'Law', 'Biotechnology', 'Computer Science'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 70', 'MOI letter'] },
        deadlines: { applicationWindow: 'Jan 15, 2026 onwards', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Regional Scholarship', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'IULM – Libera Università di Lingue e Comunicazione', type: 'Private', founded: 1968, students: '7,000+', city: 'Milan',
        specialities: ['Communication & Media', 'Advertising & Brand Communication', 'Interpreting & Translation', 'Tourism & Hospitality Management', 'Arts & Entertainment Management', 'Digital Marketing'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Strong international focus; English-taught programmes available.' },
        fees: { tuition: '€4,500 – €8,000 / year', applicationFee: '€80', scholarships: ['IULM Merit Scholarships', 'DSU grants'], financialNote: 'Fee bands based on income.' },
      }),
      buildUni({
        name: 'Università Vita-Salute San Raffaele', type: 'Private', founded: 1996, students: '3,500+', city: 'Milan',
        ranking: 'Top 400 QS (Medicine)',
        specialities: ['Medicine & Surgery (highly competitive)', 'Psychology & Neuroscience', 'Philosophy'],
        programmes: ['Single-Cycle Medicine', 'Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90'], note: 'English-taught Medicine programme. Entrance exam required.' },
        admission: { gpa: { minimum: '3.0 / 4.0', note: 'Very competitive. Entrance exam (IMAT or local) mandatory.' }, type: 'Competitive entrance exam', documents: ['Passport', 'Transcripts', 'IMAT results', 'Language certificate'] },
        fees: { tuition: '€8,000 – €20,000 / year', applicationFee: '€100', scholarships: ['Merit-based grants', 'MAECI'], financialNote: 'Private institution; limited scholarships.' },
      }),
      buildUni({
        name: 'LIUC – Università Cattaneo', type: 'Private', founded: 1991, students: '2,500+', city: 'Castellanza (Varese)',
        specialities: ['Industrial Engineering & Management', 'Economics & Business', 'Law (focus on business law)', 'Supply Chain & Logistics', 'Finance'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Tight industry connections; English-taught MBA available.' },
        fees: { tuition: '€5,000 – €10,000 / year', applicationFee: '€80', scholarships: ['LIUC merit grants'], financialNote: 'Private institution.' },
      }),
      buildUni({
        name: 'Humanitas University', type: 'Private', founded: 2014, students: '1,500+', city: 'Pieve Emanuele (Milan)',
        ranking: 'Top young university (Times Higher Education)',
        specialities: ['Medicine & Surgery', 'Dentistry & Dental Prosthetics', 'Nursing', 'Biomedical Sciences'],
        programmes: ['Single-Cycle Medicine (in English)', 'Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90', 'Cambridge C1'], note: 'All programmes fully taught in English. IMAT entrance exam required for Medicine.' },
        admission: { gpa: { minimum: '3.0 / 4.0', note: 'Highly selective. IMAT exam mandatory.' }, type: 'Competitive entrance (IMAT)', documents: ['Passport', 'Transcripts', 'IMAT score', 'English certificate'] },
        fees: { tuition: '€15,000 – €22,000 / year', applicationFee: '€100', scholarships: ['HU Excellence Scholarships (up to full tuition)', 'MAECI'], financialNote: 'Significant scholarships available to reduce private fees.' },
      }),
    ],
  },

  'Trentino-Alto Adige/Südtirol': {
    slug: 'trentino',
    capital: 'Trento',
    description: 'Trilingual Alpine region. Known for innovation and sustainability.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Trento', type: 'Public', founded: 1962, students: '16,000+', city: 'Trento',
        ranking: 'Top 400 QS World',
        specialities: ['Law', 'Economics & Management', 'Engineering', 'Computer Science', 'Sociology & Social Research', 'Psychology', 'Mathematics', 'Physics'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Strong international focus; several Master programmes in English.' },
        deadlines: { applicationWindow: 'Dec 18, 2025 – Mar 23, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Trentino', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Libera Università di Bolzano (unibz)', type: 'Public', founded: 1997, students: '4,100+', city: 'Bolzano',
        specialities: ['Economics & Management', 'Computer Science', 'Design & Art', 'Education', 'Engineering', 'Tourism Management'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Trilingual university (Italian, German, English). Many programmes offered in all three languages.' },
        deadlines: { applicationWindow: 'Jan 31, 2026 — different dates per programme', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €50. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€50', scholarships: ['DSU', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
    ],
  },

  'Veneto': {
    slug: 'veneto',
    capital: 'Venice',
    description: 'From the canals of Venice to Palladian villas and Prosecco vineyards.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Padova', type: 'Public', founded: 1222, students: '70,000+', city: 'Padua',
        ranking: 'Top 250 QS World',
        specialities: ['Medicine & Surgery', 'Engineering', 'Law', 'Economics', 'Science', 'Agronomy', 'Veterinary Medicine', 'Psychology', 'Pharmacy', 'Statistics'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge C1'], note: 'Second oldest university in Italy. Extensive English-taught programme catalogue.' },
        deadlines: {
          applicationWindow: 'Nov 2, 2025 – Feb 2, 2026 (1st call); Jan 7 – ? (limited); Mar 2 – May 2, 2026 (2nd call)',
          universitalyDeadline: 'July 15th', visaDeadline: 'August 30th',
          note: 'Fee €60. Min CGPA 3.3 for Pakistani applicants.',
        },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€60', scholarships: ['DSU Veneto', 'MAECI', 'UniPd Merit Grants'], financialNote: 'Tuition is income-based.' },
        gpa: { minimum: '3.3 / 4.0 (Pakistan)', note: 'Requirement varies by country.' },
      }),
      buildUni({
        name: "Università Ca' Foscari Venezia", type: 'Public', founded: 1868, students: '23,000+', city: 'Venice',
        ranking: 'Top 400 QS World',
        specialities: ['Economics & Business', 'Humanities & Languages', 'Environmental Sciences', 'Computer Science', 'Asian & African Studies', 'Tourism & Cultural Heritage Management'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Internationally oriented. Many Master programmes in English.' },
        deadlines: { applicationWindow: 'Dec 17, 2025 – Jan 14, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. Min CGPA 2.8 required.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Veneto', 'MAECI'], financialNote: 'Tuition is income-based.' },
        gpa: { minimum: '2.8 / 4.0', note: 'Minimum CGPA 2.8 required.' },
      }),
      buildUni({
        name: 'Università IUAV di Venezia', type: 'Public', founded: 1926, students: '4,500+', city: 'Venice',
        specialities: ['Architecture', 'Urban Planning & Design', 'Fashion Design', 'Visual Arts', 'Theatrical Costume Design', 'Interior Design'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'Portfolio review'], note: 'Portfolio or design test required for some programmes.' },
        admission: { gpa: { minimum: '2.5 / 4.0' }, type: 'Portfolio / entrance test + interview for design programmes', documents: ['Passport', 'Transcripts', 'Portfolio (design programmes)', 'Language certificate'] },
      }),
      buildUni({
        name: 'Università degli Studi di Verona', type: 'Public', founded: 1982, students: '28,000+', city: 'Verona',
        specialities: ['Medicine & Surgery', 'Nursing', 'Economics', 'Law', 'Languages', 'Computer Science', 'Sport Sciences', 'Biotechnology'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Feb 2 – Mar 30, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €50. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€50', scholarships: ['DSU Veneto', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
    ],
  },

  'Friuli-Venezia Giulia': {
    slug: 'friuli',
    capital: 'Trieste',
    description: 'A crossroads of Latin, Slavic and Germanic cultures.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Trieste', type: 'Public', founded: 1924, students: '15,000+', city: 'Trieste',
        specialities: ['Engineering', 'Economics', 'Law', 'Medicine', 'Sciences', 'Psychology', 'Humanities', 'Political Science'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Dec 15 – Jan 15, 2026 (1st); Feb 15 – Apr 30, 2026 (2nd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €40. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€40', scholarships: ['DSU FVG', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Udine', type: 'Public', founded: 1978, students: '15,000+', city: 'Udine',
        specialities: ['Agriculture & Food Sciences', 'Architecture', 'Economics', 'Education', 'Engineering', 'Humanities', 'Medicine', 'Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'MOI letter'] },
        deadlines: { applicationWindow: 'Open — link available', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€20', scholarships: ['DSU FVG', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'SISSA – Scuola Internazionale Superiore di Studi Avanzati', type: 'Special', founded: 1978, students: '300+', city: 'Trieste',
        ranking: 'Top research institute in Europe',
        specialities: ['Mathematics', 'Physics (incl. Astrophysics & Condensed Matter)', 'Neuroscience', 'Data Science', 'Science Communication'],
        programmes: ['PhD only', 'Postdoctoral Research'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90'], note: 'Fully English-medium. Entrance exam + interview required. Full funding provided.' },
        admission: { gpa: { minimum: '3.5 / 4.0', note: 'Highly competitive. Oral/written entrance examination.' }, type: 'Competitive entrance exam', documents: ['Passport', 'Master degree', 'Research proposal', 'Reference letters (3)', 'English certificate'] },
        fees: { tuition: '€0 (fully funded)', applicationFee: '€0', scholarships: ['Full stipend ~€15,000/year + free accommodation'], financialNote: 'All PhD students receive full funding.' },
      }),
    ],
  },

  'Liguria': {
    slug: 'liguria',
    capital: 'Genoa',
    description: 'Cinque Terre, pesto, and the ancient maritime republic of Genoa.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Genova', type: 'Public', founded: 1481, students: '32,000+', city: 'Genoa',
        ranking: 'Top 600 QS World',
        specialities: ['Engineering (Naval, Civil, Mechanical, Electronic)', 'Architecture', 'Medicine', 'Economics', 'Humanities', 'Law', 'Sciences', 'Pharmacy'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Naval and Marine Engineering programmes attract strong international cohort.' },
        deadlines: { applicationWindow: 'Nov 26, 2025 (1st); Mar 20, 2026 (2nd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. 75%–82% required.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Liguria', 'MAECI'], financialNote: 'Tuition is income-based.' },
        gpa: { minimum: '75%–82%', note: 'Percentage-based requirement.' },
      }),
    ],
  },

  'Emilia-Romagna': {
    slug: 'emilia-romagna',
    capital: 'Bologna',
    description: "Home to Europe's oldest university and the Motor Valley.",
    universities: [
      buildUni({
        name: 'Alma Mater Studiorum – Università di Bologna', type: 'Public', founded: 1088, students: '90,000+', city: 'Bologna',
        ranking: 'Top 200 QS World',
        specialities: ['Law', 'Medicine & Surgery', 'Engineering', 'Economics', 'Humanities', 'Sciences', 'Agriculture', 'Architecture', 'Political Science', 'Statistics', 'Communication'],
        programmes: ['Bachelor', 'Master', 'PhD', 'Single-Cycle', 'Executive'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: "World's oldest university. Huge catalogue of English-taught programmes. Campuses in Rimini, Forlì, Cesena, Ravenna." },
        deadlines: { applicationWindow: 'Nov 28, 2025 onwards (open)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No Fee / €20 / €50 depending on programme. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€0 – €50', scholarships: ['DSU Emilia-Romagna', 'MAECI', 'UniBo Excellence Grants'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Università degli Studi di Parma', type: 'Public', founded: 1117, students: '30,000+', city: 'Parma',
        specialities: ['Medicine', 'Pharmacy', 'Economics & Management', 'Engineering', 'Food Science', 'Law', 'Humanities'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Food Science programmes internationally recognised.' },
        deadlines: { applicationWindow: 'Jan 15 – Apr 17, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Ferrara', type: 'Public', founded: 1391, students: '25,000+', city: 'Ferrara',
        specialities: ['Architecture', 'Medicine', 'Engineering', 'Economics', 'Law', 'Humanities', 'Sciences', 'Pharmacy'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Jan 15 – Apr 30, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€20', scholarships: ['DSU', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Modena e Reggio Emilia', type: 'Public', founded: 1175, students: '28,000+', city: 'Modena / Reggio Emilia',
        specialities: ['Medicine', 'Engineering (Automotive, Computer)', 'Economics', 'Law', 'Sciences', 'Pharmacy', 'Communication & Media'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Motor Valley location; strong Automotive Engineering connections (Ferrari, Lamborghini).' },
        deadlines: { applicationWindow: 'Feb 10, 2026 onwards', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€20', scholarships: ['DSU', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
    ],
  },

  'Toscana': {
    slug: 'toscana',
    capital: 'Florence',
    description: 'Birthplace of the Renaissance. Unrivalled art and cultural heritage.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Firenze', type: 'Public', founded: 1321, students: '50,000+', city: 'Florence',
        ranking: 'Top 500 QS World',
        specialities: ['Agriculture & Forestry', 'Architecture', 'Economics', 'Education', 'Engineering', 'Humanities', 'Law', 'Medicine', 'Pharmacy', 'Political Science', 'Sciences', 'Psychology'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Major Art and Architecture programmes. English-taught Master degrees available.' },
        deadlines: { applicationWindow: 'Dec 8, 2025 – Feb 6, 2026 (1st); Feb 15 – Apr 17, 2026 (2nd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€20', scholarships: ['DSU Toscana', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Pisa', type: 'Public', founded: 1343, students: '45,000+', city: 'Pisa',
        ranking: 'Top 350 QS World',
        specialities: ['Engineering (all branches)', 'Computer Science & AI', 'Mathematics & Physics', 'Medicine & Surgery', 'Pharmacy', 'Economics', 'Humanities & Classical Studies', 'Law', 'Agriculture', 'Veterinary Medicine', 'Political Science'],
        programmes: ['Bachelor', 'Master', 'PhD', 'Single-Cycle'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: 'Strong STEM focus. Close collaboration with Scuola Normale Superiore. Many English-taught Master degrees in Engineering & Sciences.' },
        deadlines: { applicationWindow: 'Dec 1, 2025 – Apr 30, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Toscana', 'MAECI', 'UniPi Merit Grants'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Università degli Studi di Siena', type: 'Public', founded: 1240, students: '17,000+', city: 'Siena',
        ranking: 'Top 500 QS World',
        specialities: ['Medicine & Surgery', 'Law', 'Economics', 'Pharmacy', 'Humanities', 'Sciences', 'Biotechnology', 'Communication'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Nov 6, 2025 – May 6, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €49.90. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€49.90', scholarships: ['DSU Toscana', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università per Stranieri di Siena', type: 'Public', founded: 1917, students: '2,500+', city: 'Siena',
        specialities: ['Italian Language & Culture', 'Italian as a Second Language (certification)', 'Translation & Interpreting', 'Cultural Mediation', 'Communication'],
        programmes: ['Bachelor', 'Master', 'CILS certification courses', 'Short language courses'],
        englishReq: { required: false, note: 'Primary language of instruction is Italian. English-level requirement minimal.' },
        italianReq: { required: 'Varies by programme (A1 to C2)', level: 'A1+', accepted: ['CILS (issued here)', 'CELI', 'PLIDA'] },
      }),
      buildUni({
        name: 'Università degli Studi di Tuscia', type: 'Public', founded: 1979, students: '8,000+', city: 'Viterbo',
        specialities: ['Agriculture & Forestry', 'Economics & Management', 'Humanities', 'Sciences & Technology', 'Environmental Sciences', 'Cultural Heritage'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'], note: 'No application fee. Open enrollment. No CGPA requirement.' },
        deadlines: { applicationWindow: 'Jan 15, 2026 onwards (open)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: 'No Fee', scholarships: ['DSU Lazio', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Scuola Normale Superiore di Pisa', type: 'Special', founded: 1810, students: '600+', city: 'Pisa',
        ranking: 'Top 100 QS (Arts & Humanities)',
        specialities: ['Mathematics', 'Physics', 'Chemistry', 'Biology & Neuroscience', 'Humanities (Classics, History, Philosophy, Literature)', 'Political Science & Economics'],
        programmes: ['Undergraduate (parallel to regular degree)', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90', 'Cambridge C1'], note: 'Extremely competitive entrance exam. Students follow normal university courses + SNS seminars. Full scholarship.' },
        admission: { gpa: { minimum: '3.8 / 4.0', note: 'Top 1% academic performers only.' }, type: 'Rigorous entrance examination', documents: ['Academic records', 'Research statement', 'Reference letters (2)', 'Language certificate'] },
        fees: { tuition: '€0 (full scholarship)', applicationFee: '€0', scholarships: ['Full tuition + stipend + room & board'], financialNote: 'All students fully funded.' },
      }),
      buildUni({
        name: "Scuola Superiore Sant'Anna", type: 'Special', founded: 1987, students: '700+', city: 'Pisa',
        ranking: 'Top 100 QS (Young Universities)',
        specialities: ['Law', 'Economics & Management', 'Political Science', 'Agriculture', 'Medicine', 'Engineering & Robotics', 'BioRobotics'],
        programmes: ['Undergraduate (parallel programme)', 'PhD', 'Master (post-graduate)'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90', 'Cambridge C1'], note: 'Highly competitive entrance exam. Full scholarship for all students.' },
        fees: { tuition: '€0 (full scholarship)', applicationFee: '€0', scholarships: ['Full tuition + stipend + accommodation'], financialNote: 'All students fully funded.' },
      }),
      buildUni({
        name: 'IMT Scuola Alti Studi Lucca', type: 'Special', founded: 2005, students: '200+', city: 'Lucca',
        ranking: 'Top research school in Systems Sciences',
        specialities: ['Computer Science & Systems Engineering', 'Economics & Management', 'Cultural Heritage (analysis & management)', 'Political Science', 'Neuroscience'],
        programmes: ['PhD only'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90'], note: 'All PhD programmes fully in English. Full scholarship.' },
        fees: { tuition: '€0 (full funding)', applicationFee: '€0', scholarships: ['Full stipend ~€14,000/year + housing'], financialNote: 'All PhD students fully funded.' },
      }),
    ],
  },

  'Umbria': {
    slug: 'umbria',
    capital: 'Perugia',
    description: "The green heart of Italy. Medieval hilltop towns and truffles.",
    universities: [
      buildUni({
        name: 'Università degli Studi di Perugia', type: 'Public', founded: 1308, students: '28,000+', city: 'Perugia',
        specialities: ['Medicine & Surgery', 'Agriculture', 'Economics', 'Engineering', 'Law', 'Pharmacy', 'Political Science', 'Sciences', 'Veterinary Medicine', 'Foreign Languages'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Direct Pre-enrollment on Universitaly (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'IELTS required. No fee.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Umbria', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università per Stranieri di Perugia', type: 'Public', founded: 1925, students: '5,000+', city: 'Perugia',
        specialities: ['Italian Language & Culture', 'Translation & Interpreting', 'Italian Cooking & Food Culture', 'Art History', 'Cultural Heritage', 'Communication & Journalism'],
        programmes: ['Bachelor', 'Master', 'CELI certification', 'Language courses (short/long)'],
        englishReq: { required: false, note: 'Italian-medium institution. Some Master programmes have English component.' },
        italianReq: { required: 'Varies by programme', level: 'A1–C2', accepted: ['CELI (issued here)', 'CILS', 'PLIDA'] },
      }),
    ],
  },

  'Marche': {
    slug: 'marche',
    capital: 'Ancona',
    description: 'Unspoiled Adriatic coastline and Renaissance towns.',
    universities: [
      buildUni({
        name: 'Università Politecnica delle Marche', type: 'Public', founded: 1969, students: '16,000+', city: 'Ancona',
        specialities: ['Engineering (Civil, Environmental, Biomedical, Computer)', 'Medicine', 'Economics', 'Sciences', 'Agriculture'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Dec 16, 2025 – Jan 30, 2026 (1st); Mar 1 – Apr 30, 2026 (2nd); Jun 1–30, 2026 (3rd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €10. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€10', scholarships: ['DSU Marche', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Urbino Carlo Bo', type: 'Public', founded: 1506, students: '14,000+', city: 'Urbino',
        specialities: ['Communication & Media', 'Pharmacy', 'Education', 'Humanities', 'Law', 'Political Science', 'Psychology', 'Sciences', 'Sociology'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
      }),
      buildUni({
        name: 'Università degli Studi di Macerata', type: 'Public', founded: 1290, students: '11,000+', city: 'Macerata',
        specialities: ['Law', 'Humanities', 'Political Science & International Relations', 'Education', 'Philosophy', 'History', 'Foreign Languages'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'] },
        deadlines: { applicationWindow: 'Jan 7 – Apr 24, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Marche', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Camerino', type: 'Public', founded: 1336, students: '7,000+', city: 'Camerino',
        specialities: ['Architecture & Design', 'Environmental & Earth Sciences', 'Pharmacy', 'Law', 'Computer Science', 'Veterinary Medicine'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Nov 15, 2025 – Mar 31, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. Minimum 70% for Pakistani applicants.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€20', scholarships: ['DSU Marche', 'MAECI'], financialNote: 'Tuition is income-based.' },
        gpa: { minimum: '70%', note: 'Minimum 70% for Pakistani applicants.' },
      }),
    ],
  },

  'Lazio': {
    slug: 'lazio',
    capital: 'Rome',
    description: 'Eternal Rome, the Vatican, and vibrant contemporary culture.',
    universities: [
      buildUni({
        name: 'Sapienza Università di Roma', type: 'Public', founded: 1303, students: '115,000+', city: 'Rome',
        ranking: 'Top 150 QS World (largest university in Europe)',
        specialities: ['Medicine & Surgery', 'Law', 'Engineering', 'Architecture', 'Economics', 'Humanities', 'Sciences', 'Pharmacy', 'Political Science', 'Psychology', 'Communication', 'Statistics'],
        programmes: ['Bachelor', 'Master', 'PhD', 'Single-Cycle', 'Specialisation Schools'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: "Europe's largest university. Extensive English-taught programme catalogue. IELTS required (not just proficiency)." },
        deadlines: { applicationWindow: 'Dec 22, 2025 – May 15, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. IELTS required. Different CGPA requirements per programme.' },
        fees: { tuition: '€500 – €3,500 / year', applicationFee: '€30', scholarships: ['DSU Lazio', 'MAECI', 'Sapienza Merit Grants'], financialNote: 'Tuition is income-based (ISEE).' },
      }),
      buildUni({
        name: 'Università degli Studi di Roma Tor Vergata', type: 'Public', founded: 1982, students: '33,000+', city: 'Rome',
        ranking: 'Top 500 QS World',
        specialities: ['Medicine', 'Engineering', 'Sciences', 'Economics', 'Law', 'Humanities'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Jan 21 – Apr 30, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. Different CGPA requirements per programme.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Lazio', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi Roma Tre', type: 'Public', founded: 1992, students: '35,000+', city: 'Rome',
        specialities: ['Architecture', 'Economics', 'Education', 'Engineering', 'Humanities', 'Law', 'Political Science', 'Sciences', 'Philosophy'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'May, 2026 (open later)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Lazio', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'LUISS Guido Carli', type: 'Private', founded: 1966, students: '10,000+', city: 'Rome',
        ranking: 'Top business school in Italy',
        specialities: ['Economics & Finance', 'Business & Management', 'Law', 'Political Science & International Affairs', 'Communication & Media Studies', 'Data Science'],
        programmes: ['Bachelor', 'Master of Science', 'PhD', 'LLM'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90', 'Cambridge C1'], note: 'Many programmes fully in English. GMAT may be required for MBA.' },
        fees: { tuition: '€7,000 – €16,000 / year', applicationFee: '€100', scholarships: ['LUISS Excellence Awards (full + partial)', 'MAECI', 'DSU grants'], financialNote: 'Merit-based scholarships available.' },
      }),
      buildUni({
        name: 'LUMSA Università', type: 'Private', founded: 1939, students: '7,500+', city: 'Rome',
        specialities: ['Law', 'Education & Psychology', 'Communication & Digital Media', 'Economics', 'Political Science', 'Social Work'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2'], note: 'Catholic institution; international and English-taught programmes available.' },
        fees: { tuition: '€3,500 – €7,000 / year', applicationFee: '€60', scholarships: ['LUMSA merit grants', 'DSU'], financialNote: 'Income-based fee structure.' },
      }),
      buildUni({
        name: 'Università degli Studi di Roma "Foro Italico"', type: 'Public', founded: 1998, students: '2,500+', city: 'Rome',
        specialities: ['Sport Sciences & Physical Education', 'Human Movement Sciences', 'Sport Management', 'Physical Therapy'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'MOI letter'] },
      }),
      buildUni({
        name: 'Campus Bio-Medico di Roma', type: 'Private', founded: 1991, students: '2,000+', city: 'Rome',
        specialities: ['Medicine & Surgery', 'Nursing', 'Biomedical Engineering', 'Nutrition Sciences'],
        programmes: ['Single-Cycle Medicine', 'Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79'], note: 'Competitive entrance exam. Private Catholic institution.' },
        fees: { tuition: '€8,000 – €18,000 / year', applicationFee: '€100', scholarships: ['Merit-based grants', 'MAECI'], financialNote: 'Private institution.' },
      }),
      buildUni({
        name: 'UNINT – Università degli Studi Internazionali di Roma', type: 'Private', founded: 1996, students: '2,000+', city: 'Rome',
        specialities: ['Foreign Languages & Communication', 'International Relations', 'Economics & Business', 'Translation & Interpreting', 'Law'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2'] },
        fees: { tuition: '€3,000 – €6,000 / year', applicationFee: '€60', scholarships: ['UNINT grants', 'DSU'], financialNote: 'Private institution.' },
      }),
      buildUni({
        name: 'Università degli Studi della Tuscia', type: 'Public', founded: 1979, students: '8,000+', city: 'Viterbo',
        specialities: ['Agriculture & Forestry', 'Economics & Management', 'Humanities', 'Sciences & Technology', 'Environmental Sciences', 'Cultural Heritage'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'], note: 'No application fee. Open enrollment. No CGPA requirement.' },
        deadlines: { applicationWindow: 'Jan 15, 2026 onwards (open)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: 'No Fee', scholarships: ['DSU Lazio', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Cassino e del Lazio Meridionale', type: 'Public', founded: 1979, students: '8,000+', city: 'Cassino',
        specialities: ['Engineering', 'Economics', 'Humanities', 'Law', 'Sciences'],
        programmes: ['Bachelor', 'Master', 'PhD'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'], note: 'Welcoming to international students.' },
        deadlines: { applicationWindow: 'Feb 13 – Apr 30, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €15. Different CGPA requirements per programme.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: '€15', scholarships: ['DSU Lazio', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
    ],
  },

  'Abruzzo': {
    slug: 'abruzzo',
    capital: "L'Aquila",
    description: "Wild national parks and Italy's most forested region.",
    universities: [
      buildUni({
        name: "Università degli Studi dell'Aquila", type: 'Public', founded: 1952, students: '18,000+', city: "L'Aquila",
        specialities: ['Engineering', 'Sciences', 'Medicine', 'Economics', 'Humanities', 'Education', 'Law'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Dec 1, 2025 – Feb 25, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €20. No CGPA requirement.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: '€20', scholarships: ['DSU Abruzzo', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: "Università degli Studi 'G. d'Annunzio' Chieti-Pescara", type: 'Public', founded: 1965, students: '27,000+', city: 'Chieti / Pescara',
        specialities: ['Medicine & Dentistry', 'Economics', 'Architecture', 'Education', 'Pharmacy', 'Psychology', 'Humanities', 'Law', 'Sport Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
      }),
      buildUni({
        name: 'Università degli Studi di Teramo', type: 'Public', founded: 1993, students: '6,000+', city: 'Teramo',
        specialities: ['Law', 'Economics', 'Agriculture & Food Sciences', 'Biosciences & Technology', 'Communication & Media'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'] },
        deadlines: { applicationWindow: 'Send email to coordinator / Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: 'No Fee', scholarships: ['DSU Abruzzo', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'GSSI – Gran Sasso Science Institute', type: 'Special', founded: 2012, students: '200+', city: "L'Aquila",
        ranking: 'International PhD Institute',
        specialities: ['Physics', 'Mathematics', 'Computer Science', 'Urban Studies & Regional Science'],
        programmes: ['PhD only'],
        englishReq: { required: true, accepted: ['IELTS min 6.5', 'TOEFL iBT min 90'], note: 'Fully English-medium. Full scholarship.' },
        fees: { tuition: '€0', applicationFee: '€0', scholarships: ['Full stipend ~€16,000/year + free accommodation'], financialNote: 'All PhD students fully funded.' },
      }),
    ],
  },

  'Molise': {
    slug: 'molise',
    capital: 'Campobasso',
    description: "Italy's second smallest region — tranquil and traditional.",
    universities: [
      buildUni({
        name: 'Università degli Studi del Molise', type: 'Public', founded: 1982, students: '7,000+', city: 'Campobasso',
        specialities: ['Agriculture & Environment', 'Economics', 'Engineering', 'Humanities', 'Law', 'Medicine', 'Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'], note: 'Small, welcoming institution with personalised support for international students.' },
      }),
    ],
  },

  'Campania': {
    slug: 'campania',
    capital: 'Naples',
    description: 'Volcanic intensity — Naples, Pompeii, and the Amalfi Coast.',
    universities: [
      buildUni({
        name: 'Università di Napoli Federico II', type: 'Public', founded: 1224, students: '80,000+', city: 'Naples',
        ranking: 'Top 400 QS World',
        specialities: ['Medicine & Surgery', 'Engineering (all branches)', 'Architecture', 'Agriculture', 'Economics', 'Law', 'Sciences', 'Pharmacy', 'Political Science', 'Humanities', 'Veterinary Medicine'],
        englishReq: { required: true, accepted: ['IELTS min 6.0', 'TOEFL iBT min 79', 'Cambridge B2+'], note: "One of the world's oldest public universities (1224). Strong engineering and science faculties." },
        deadlines: { applicationWindow: 'Send email to coordinator / Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Campania', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: "Università degli Studi della Campania 'Luigi Vanvitelli'", type: 'Public', founded: 1991, students: '29,000+', city: 'Caserta / Naples',
        specialities: ['Medicine', 'Engineering', 'Architecture', 'Law', 'Economics', 'Psychology', 'Pharmacy'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Send email / Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. Contact for CGPA details.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Campania', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: "Università di Napoli L'Orientale", type: 'Public', founded: 1732, students: '10,000+', city: 'Naples',
        ranking: 'Top in Asian & African Studies (Italy)',
        specialities: ['Asian Languages & Cultures (Chinese, Japanese, Korean, Arabic, Hindi)', 'African Languages', 'Political Science & International Relations', 'Foreign Languages & Literature', 'Translation & Interpreting'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Oldest Oriental studies institute in Europe. Unique language programmes.' },
      }),
      buildUni({
        name: 'Università di Napoli Parthenope', type: 'Public', founded: 1920, students: '13,000+', city: 'Naples',
        specialities: ['Economics & Business', 'Engineering', 'Sciences (Marine, Environmental)', 'Law', 'Sport Sciences', 'Maritime Studies'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Campania', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Salerno', type: 'Public', founded: 1968, students: '35,000+', city: 'Fisciano (Salerno)',
        specialities: ['Engineering', 'Economics', 'Medicine', 'Law', 'Humanities', 'Sciences', 'Pharmacy', 'Education'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Campania', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi del Sannio', type: 'Public', founded: 1998, students: '6,000+', city: 'Benevento',
        specialities: ['Engineering', 'Economics', 'Sciences', 'Law'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'MOI letter'] },
      }),
      buildUni({
        name: 'Università Suor Orsola Benincasa', type: 'Private', founded: 1895, students: '9,000+', city: 'Naples',
        specialities: ['Law', 'Communication & Media', 'Education', 'Humanities', 'Fashion & Textile Design', 'Social Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2'], note: 'Historic institute with strong arts and humanities heritage.' },
        fees: { tuition: '€2,500 – €6,000 / year', applicationFee: '€50', scholarships: ['DSU grants', 'University merit awards'], financialNote: 'Income-based fee structure.' },
      }),
    ],
  },

  'Puglia': {
    slug: 'puglia',
    capital: 'Bari',
    description: 'The heel of the boot. Trulli, Baroque Lecce, and olive groves.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Bari Aldo Moro', type: 'Public', founded: 1925, students: '45,000+', city: 'Bari',
        ranking: 'Top 600 QS World',
        specialities: ['Medicine & Surgery', 'Law', 'Economics', 'Sciences', 'Agriculture', 'Pharmacy', 'Engineering', 'Humanities', 'Political Science', 'Veterinary Medicine'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Puglia', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Politecnico di Bari', type: 'Public', founded: 1990, students: '11,000+', city: 'Bari',
        specialities: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Architecture', 'Industrial Engineering', 'Computer Engineering'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Engineering-focused polytechnic. International Master degrees available.' },
        deadlines: { applicationWindow: 'Direct Pre-enrollment on Universitaly (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Puglia', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università del Salento', type: 'Public', founded: 1955, students: '17,000+', city: 'Lecce',
        specialities: ['Humanities', 'Engineering', 'Sciences', 'Economics', 'Law', 'Cultural Heritage', 'Foreign Languages'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Puglia', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Foggia', type: 'Public', founded: 1999, students: '11,000+', city: 'Foggia',
        specialities: ['Medicine', 'Agriculture', 'Economics', 'Law', 'Humanities'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'] },
        deadlines: { applicationWindow: 'Send email / Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Puglia', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Libera Università Mediterranea (LUM)', type: 'Private', founded: 1995, students: '4,000+', city: 'Casamassima (Bari)',
        specialities: ['Economics & Business', 'Law', 'Management & Innovation', 'Digital & Marketing', 'Engineering Management'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2'] },
        fees: { tuition: '€4,000 – €8,000 / year', applicationFee: '€80', scholarships: ['LUM merit grants', 'Industry-sponsored scholarships'], financialNote: 'Private institution; merit scholarships available.' },
      }),
    ],
  },

  'Basilicata': {
    slug: 'basilicata',
    capital: 'Potenza',
    description: "Matera — a UNESCO city of cave dwellings. Raw, ancient beauty.",
    universities: [
      buildUni({
        name: 'Università degli Studi della Basilicata', type: 'Public', founded: 1982, students: '7,000+', city: 'Potenza / Matera',
        specialities: ['Agriculture & Forestry', 'Engineering', 'Sciences', 'Humanities', 'Architecture (Matera campus)'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'], note: 'Matera campus focuses on Cultural Heritage and Architecture in the UNESCO city.' },
        deadlines: { applicationWindow: 'Direct Pre-enrollment (Apr 3)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: 'No Fee', scholarships: ['DSU Basilicata', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
    ],
  },

  'Calabria': {
    slug: 'calabria',
    capital: 'Catanzaro',
    description: 'The toe of the boot. Crystal coasts and Greek ruins.',
    universities: [
      buildUni({
        name: 'Università della Calabria', type: 'Public', founded: 1968, students: '25,000+', city: 'Rende (Cosenza)',
        specialities: ['Engineering', 'Economics', 'Sciences', 'Humanities', 'Political Science', 'Pharmacy', 'Law', 'Computer Science'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Open (link available)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €10. Min CGPA 3.3 for Pakistani applicants.' },
        fees: { tuition: '€500 – €2,500 / year', applicationFee: '€10', scholarships: ['DSU Calabria', 'MAECI'], financialNote: 'Tuition is income-based.' },
        gpa: { minimum: '3.3 / 4.0 (Pakistan)', note: 'Requirement varies by country.' },
      }),
      buildUni({
        name: 'Università degli Studi di Catanzaro "Magna Græcia"', type: 'Public', founded: 1998, students: '11,000+', city: 'Catanzaro',
        specialities: ['Medicine & Surgery', 'Pharmacy', 'Law', 'Nutrition Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
      }),
      buildUni({
        name: 'Università Mediterranea di Reggio Calabria', type: 'Public', founded: 1982, students: '8,000+', city: 'Reggio Calabria',
        specialities: ['Architecture', 'Engineering', 'Agriculture', 'Law', 'Sciences'],
        englishReq: { required: true, accepted: ['IELTS min 5.0', 'TOEFL iBT min 65', 'Cambridge B1+', 'MOI letter'] },
      }),
      buildUni({
        name: 'Università per Stranieri "Dante Alighieri"', type: 'Private', founded: 1984, students: '1,000+', city: 'Reggio Calabria',
        specialities: ['Italian Language & Culture', 'Translation', 'Italian as a Foreign Language (teaching)', 'Cultural Mediation'],
        programmes: ['Bachelor', 'Master', 'Language courses'],
        englishReq: { required: false, note: 'Italian-medium. Focus is Italian language teaching and certification.' },
        italianReq: { required: 'Required', level: 'B1+', accepted: ['PLIDA', 'CILS', 'CELI'] },
        fees: { tuition: '€2,000 – €5,000 / year', applicationFee: '€50', scholarships: ['DSU grants'], financialNote: 'Affordable private institution.' },
      }),
    ],
  },

  'Sicilia': {
    slug: 'sicilia',
    capital: 'Palermo',
    description: 'Mediterranean crossroads of cultures. Mount Etna and ancient temples.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Palermo', type: 'Public', founded: 1806, students: '42,000+', city: 'Palermo',
        specialities: ['Medicine & Surgery', 'Engineering', 'Architecture', 'Economics', 'Law', 'Sciences', 'Humanities', 'Agriculture', 'Pharmacy'],
        englishReq: { required: true, accepted: ['IELTS required', 'Cambridge B2', 'MOI letter'], note: 'IELTS required (not just proficiency letter).' },
        deadlines: { applicationWindow: 'Jan 15, 2026 onwards', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. IELTS required. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Sicilia', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Catania', type: 'Public', founded: 1434, students: '40,000+', city: 'Catania',
        ranking: 'Top 600 QS World',
        specialities: ['Medicine', 'Engineering (Electronics, Computer Science)', 'Sciences', 'Agriculture', 'Economics', 'Law', 'Humanities', 'Pharmacy'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'], note: 'Oldest university in Sicily. Strong electronics and ICT engineering focus.' },
        deadlines: { applicationWindow: 'Feb 10 – Mar 17, 2026', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €10. 70% for bachelor, CGPA 3.0 for master.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€10', scholarships: ['DSU Sicilia', 'MAECI'], financialNote: 'Tuition is income-based.' },
        gpa: { minimum: '70% (Bachelor) / 3.0 GPA (Master)', note: 'Different for bachelor and master levels.' },
      }),
      buildUni({
        name: 'Università degli Studi di Messina', type: 'Public', founded: 1548, students: '23,000+', city: 'Messina',
        specialities: ['Medicine', 'Pharmacy', 'Law', 'Economics', 'Humanities', 'Sciences', 'Engineering', 'Political Science', 'Veterinary Medicine'],
        englishReq: { required: true, accepted: ['IELTS required', 'Cambridge B2', 'MOI letter'], note: 'IELTS required (not just proficiency letter).' },
        deadlines: { applicationWindow: 'Nov 24 – Dec 22, 2025 (1st); Feb 1 – Mar 31, 2026 (2nd); Apr 13 – May 10, 2026 (3rd)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'Fee €30. IELTS required. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: '€30', scholarships: ['DSU Sicilia', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università Kore di Enna', type: 'Private', founded: 2004, students: '10,000+', city: 'Enna',
        specialities: ['Engineering', 'Economics & Business', 'Law', 'Architecture', 'Sport Sciences', 'Humanities', 'Computer Science'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2'] },
        fees: { tuition: '€3,000 – €7,000 / year', applicationFee: '€70', scholarships: ['Kore merit grants', 'DSU'], financialNote: 'Private institution with competitive fees.' },
      }),
    ],
  },

  'Sardegna': {
    slug: 'sardegna',
    capital: 'Cagliari',
    description: 'Turquoise waters and a fiercely independent island culture.',
    universities: [
      buildUni({
        name: 'Università degli Studi di Cagliari', type: 'Public', founded: 1606, students: '25,000+', city: 'Cagliari',
        specialities: ['Medicine & Surgery', 'Engineering', 'Economics', 'Law', 'Humanities', 'Sciences', 'Pharmacy', 'Architecture', 'Veterinary Medicine'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Fill out the form (open)', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Sardegna', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
      buildUni({
        name: 'Università degli Studi di Sassari', type: 'Public', founded: 1562, students: '13,000+', city: 'Sassari',
        specialities: ['Medicine & Surgery', 'Agriculture', 'Pharmacy', 'Law', 'Economics', 'Humanities', 'Sciences', 'Veterinary Medicine'],
        englishReq: { required: true, accepted: ['IELTS min 5.5', 'TOEFL iBT min 72', 'Cambridge B2', 'MOI letter'] },
        deadlines: { applicationWindow: 'Jan 10, 2026 onwards', universitalyDeadline: 'July 15th', visaDeadline: 'August 30th', note: 'No fee. No CGPA requirement. Innovation management for sustainable tourism programme available.' },
        fees: { tuition: '€500 – €3,000 / year', applicationFee: 'No Fee', scholarships: ['DSU Sardegna', 'MAECI'], financialNote: 'Tuition is income-based.' },
      }),
    ],
  },
}

export default REGIONS