import {
  FileText,
  Gavel,
  FileCheck,
  Building2,
  Banknote,
  Languages,
  Scale,
  Lightbulb,
  Store,
  Megaphone,
  Heart,
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'contracts',
    slug: 'contracts',
    name: 'العقود',
    nameEn: 'Contracts',
    icon: FileText,
    description: 'صياغة ومراجعة وتدقيق العقود التجارية والمدنية بدقة قانونية عالية.',
    fullDescription:
      'نقدم خدمات متكاملة في صياغة العقود ومراجعتها وتدقيقها، سواء كانت تجارية أو مدنية أو عمالية. نحرص على أن يكون كل عقد محكماً قانونياً ويحمي مصالح موكلنا بشكل كامل.',
    category: 'شركات',
  },
  {
    id: 'cases',
    slug: 'cases',
    name: 'القضايا',
    nameEn: 'Legal Cases',
    icon: Gavel,
    description: 'تمثيل قانوني متكامل في جميع أنواع القضايا أمام المحاكم السعودية.',
    fullDescription:
      'نتولى التمثيل القانوني الكامل في جميع أنواع القضايا المدنية والتجارية والجنائية والعمالية أمام المحاكم السعودية بكافة درجاتها، مع متابعة مستمرة وتقارير دورية للموكلين.',
    category: 'قضايا',
  },
  {
    id: 'licenses',
    slug: 'licenses',
    name: 'استخراج التراخيص',
    nameEn: 'Licenses',
    icon: FileCheck,
    description: 'استخراج وتجديد التراخيص التجارية والمهنية من الجهات الحكومية.',
    fullDescription:
      'نتولى إجراءات استخراج وتجديد جميع أنواع التراخيص التجارية والمهنية والصناعية من الجهات الحكومية المختصة، مع متابعة كل خطوة حتى الحصول على الترخيص.',
    category: 'شركات',
  },
  {
    id: 'company-formation',
    slug: 'company-formation',
    name: 'تأسيس الشركات',
    nameEn: 'Company Formation',
    icon: Building2,
    description: 'تأسيس الشركات بجميع أنواعها القانونية وفق أحدث الأنظمة السعودية.',
    fullDescription:
      'نقدم خدمات تأسيس شاملة لجميع أنواع الشركات (ذات مسؤولية محدودة، مساهمة، فردية) وفق نظام الشركات السعودي المحدّث، مع إعداد عقد التأسيس والنظام الأساسي وإتمام كافة الإجراءات.',
    category: 'شركات',
  },
  {
    id: 'debt-collection',
    slug: 'debt-collection',
    name: 'تحصيل الديون',
    nameEn: 'Debt Collection',
    icon: Banknote,
    description: 'تحصيل الديون والمستحقات المالية عبر الطرق القانونية الفعّالة.',
    fullDescription:
      'نتخصص في تحصيل الديون والمستحقات المالية المتعثرة عبر منظومة متكاملة تشمل المفاوضات الودية والإجراءات القضائية وأوامر التنفيذ، مع ضمان أعلى معدلات الاسترداد.',
    category: 'قضايا',
  },
  {
    id: 'legal-translation',
    slug: 'legal-translation',
    name: 'الترجمة القانونية',
    nameEn: 'Legal Translation',
    icon: Languages,
    description: 'ترجمة قانونية معتمدة للعقود والوثائق والأحكام بين العربية والإنجليزية.',
    fullDescription:
      'نوفر خدمات ترجمة قانونية معتمدة عالية الدقة للعقود والوثائق الرسمية والأحكام القضائية والتقارير القانونية بين اللغتين العربية والإنجليزية، مع مراعاة الدقة المصطلحية القانونية.',
    category: 'ترجمة',
  },
  {
    id: 'inheritance',
    slug: 'inheritance',
    name: 'تصفية التركات',
    nameEn: 'Estate Settlement',
    icon: Scale,
    description: 'إدارة وتصفية التركات وتقسيم الإرث وفق الشريعة الإسلامية والأنظمة السعودية.',
    fullDescription:
      'نتولى إجراءات تصفية التركات وتقسيم الإرث وفق أحكام الشريعة الإسلامية والأنظمة السعودية، بما يشمل حصر الوارثين وتقدير الأصول وإتمام إجراءات نقل الملكية.',
    category: 'أفراد',
  },
  {
    id: 'intellectual-property',
    slug: 'intellectual-property',
    name: 'الملكية الفكرية',
    nameEn: 'Intellectual Property',
    icon: Lightbulb,
    description: 'تسجيل وحماية حقوق الملكية الفكرية: العلامات التجارية والبراءات وحقوق المؤلف.',
    fullDescription:
      'نقدم خدمات متكاملة لحماية الملكية الفكرية تشمل تسجيل العلامات التجارية وبراءات الاختراع وحقوق المؤلف والرسوم الصناعية، مع الدفاع عنها أمام الجهات المختصة.',
    category: 'شركات',
  },
  {
    id: 'franchise',
    slug: 'franchise',
    name: 'الامتياز التجاري',
    nameEn: 'Franchise',
    icon: Store,
    description: 'إعداد عقود الامتياز التجاري وتنظيم العلاقة بين الممنوح له والمانح.',
    fullDescription:
      'نتخصص في صياغة وتنظيم عقود الامتياز التجاري (الفرانشايز) وتحديد حقوق والتزامات كل طرف، مع الامتثال الكامل لنظام الامتياز التجاري السعودي واشتراطات وزارة التجارة.',
    category: 'شركات',
  },
  {
    id: 'legal-media',
    slug: 'legal-media',
    name: 'الإعلام القانوني',
    nameEn: 'Legal Media',
    icon: Megaphone,
    description: 'إنتاج محتوى قانوني توعوي وتثقيفي يُبسّط القانون للجمهور.',
    fullDescription:
      'نساهم في رفع الوعي القانوني لدى المجتمع عبر إنتاج محتوى قانوني مبسّط وموثوق يشمل المقالات والمنشورات والمواد التثقيفية حول الأنظمة السعودية وحقوق الأفراد.',
    category: 'مجتمعية',
  },
  {
    id: 'pro-bono',
    slug: 'pro-bono',
    name: 'الخدمة المجتمعية',
    nameEn: 'Pro Bono',
    icon: Heart,
    description: 'تمثيل قانوني مجاني لوجه الله لمن لا يستطيع تحمّل أتعاب المحاماة.',
    fullDescription:
      'التزاماً بمسؤوليتنا الاجتماعية، نخصص طاقتنا لخدمة من لا يستطيع تحمّل أتعاب التقاضي. نختار قضية واحدة بشكل دوري لتمثيلها مجاناً، أملاً في تحقيق العدالة للجميع.',
    category: 'مجتمعية',
    featured: true,
  },
];

export const SERVICE_CATEGORIES = ['الكل', 'شركات', 'قضايا', 'أفراد', 'ترجمة', 'مجتمعية'];

export default SERVICES;
