import logoImg from "@assets/téléchargement_(1)_1769676206860.png";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Heart, 
  Shield, 
  Sparkles, 
  Eye,
  HandHeart,
  Lightbulb,
  Clock,
  Users,
  Gift,
  Timer,
  CheckCircle,
  Quote
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";

const heroImage = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/hero/hero-main-b71d1d7307964dccb0409ae9e22944a1.png";
const feature1 = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/features/features-1-ae1ef5d2a75e4534b0e0b895db61b9a8.png";
const feature2 = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/features/features-2-33187eef7dd7484fab73fdca0794a31b.png";
const feature3 = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/features/features-3-5b6402d461444efcb875b25b7a63c98b.png";
const benefitsImage = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/benefits/benefits-main-6e2dc194ebb240ba8cff811ab91c96fb.png";
const testimonial1 = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/testimonials/testimonials-1-798a84de0d5c4564a50fa1554240b668.png";
const testimonial2 = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/testimonials/testimonials-2-3d507b112e214e8ea8213b3c24abb939.png";
const ctaImage = "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3706901d-71b8-466b-b92c-c547ec57641e/3706901d-71b8-466b-b92c-c547ec57641e/cta/cta-main-2477ed77efe74b0787d81951e8e32b66.png";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון לא תקין"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "הפנייה נשלחה בהצלחה!",
        description: "נחזור אליך תוך 24-48 שעות.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "שגיאה בשליחה",
        description: "אנא נסי שוב מאוחר יותר.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const faqItems = [
    {
      question: "כמה זמן לוקח התהליך?",
      answer: "התהליך מותאם אישית לכל אישה. יש נשים שמרגישות שינוי משמעותי כבר אחרי מספר מפגשים, ויש שצריכות תהליך ארוך יותר. בממוצע, רוב הנשים עוברות תהליך של 3-6 חודשים. הקצב נקבע לפי המוכנות הפנימית שלך ולא לפי לוח זמנים חיצוני."
    },
    {
      question: "האם התהליך מתאים לי אם אני עדיין בקשר?",
      answer: "כן, בהחלט. חלק מהנשים מגיעות כשהן עדיין בקשר אבל מרגישות שמשהו לא בסדר. התהליך עוזר לך להבין מה קורה, לבנות בהירות ולקבל החלטות מתוך מקום של כוח פנימי ולא מתוך פחד או בלבול."
    },
    {
      question: "האם הטיפול מתאים גם לנשים שלא בטוחות אם הקשר רעיל?",
      answer: "בהחלט. הרבה פעמים הספק הוא חלק מהדינמיקה של הקשר. בפגישה הראשונה נעזור לך לעשות סדר ולזהות אם יש דפוסים רעילים, בלי שום לחץ לקבל החלטות דרמטיות."
    },
    {
      question: "מה ההבדל בין הטיפול שלך לטיפול פסיכולוגי רגיל?",
      answer: "הגישה שלי משלבת הבנה פסיכולוגית עמוקה עם כלים מעשיים מעולמות האימון והNLP. זה לא רק הבנה של מה קרה, אלא גם בניית כלים קונקרטיים לחיים היומיומיים. בנוסף, יש דגש חזק על חיבור לגוף ולתחושות, ולא רק עבודה מנטלית."
    },
    {
      question: "איך אני יודעת שזה יעבוד בשבילי?",
      answer: "זו בדיוק המטרה של הפגישה הראשונה במחיר הסמלי. במפגש הזה את תרגישי אם יש התאמה, אם את מרגישה מובנת ובטוחה, ואם הגישה שלי מתאימה לך. אין התחייבות מראש - רק אחרי שאת מרגישה שזה המקום הנכון בשבילך."
    },
    {
      question: "מה אם אני לא מוכנה לוותר על הקשר לגמרי?",
      answer: "זה בסדר גמור. המטרה שלי היא לא לשכנע אותך לעזוב, אלא לעזור לך להבין מה באמת קורה ולקבל החלטות מתוך בהירות. יש נשים שמחליטות לעבוד על הקשר, ויש שמחליטות לעזוב. החשוב הוא שההחלטה תהיה שלך, מתוך מקום של כוח ולא מתוך פחד."
    },
    {
      question: "האם המפגשים מתקיימים פנים אל פנים או באינטרנט?",
      answer: "אני מציעה שתי אפשרויות - מפגשים פנים אל פנים במרכז הארץ ומפגשים בזום. שתי הצורות יעילות באותה מידה. הבחירה תלויה בנוחות שלך ובמיקום הגיאוגרפי."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation / Logo Area */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-center items-center pointer-events-none" dir="rtl">
        <div className="pointer-events-auto">
          <img 
            src={logoImg} 
            alt="חלי לב - לוגו" 
            className="h-24 md:h-32 w-auto object-contain drop-shadow-xl"
            data-testid="img-logo"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="אישה רגועה ומחוברת לעצמה"
            className="w-full h-full object-cover"
            data-testid="img-hero"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
              מקשר רעיל<br />
              <span className="text-primary">לחיים חופשיים</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed" data-testid="text-hero-subtitle">
              ליווי רגשי עדין ומעמיק לנשים שיוצאות מקשרים רעילים - לחזרה לעצמן, לביטחון פנימי ולשקט שמגיע להן
            </p>
            
            <blockquote className="border-r-4 border-primary pr-4 mb-8 text-white/80 italic" data-testid="text-hero-quote">
              "הוא גרם לי להאמין שאני המשוגעת... לא ידעתי איך לצאת מזה"
              <p className="mt-2 text-sm not-italic">זה בדיוק מה שאמרה לי מטופלת אחרי הפגישה הראשונה - <strong>במחיר סמלי</strong></p>
            </blockquote>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-cta"
              >
                קבעי פגישה ראשונה עכשיו
              </Button>
              <p className="text-white/70 text-sm" data-testid="text-hero-offer">
                הפגישה הראשונה במחיר סמלי של 49 ₪ בלבד
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="py-20 bg-card" data-testid="section-treatment">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-treatment-title">
              הטיפול "<span className="text-primary">Toxic Free</span>"
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-treatment-subtitle">
              שילוב נדיר של חמלה רכה עם עמידה איתנה על עקרונות - הגישה הטיפולית שמחזירה לך את השליטה על חייך
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover-elevate" data-testid="card-feature-1">
              <img src={feature1} alt="זיהוי נורות אדום" className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">זיהוי נורות אדום</h3>
                </div>
                <p className="text-muted-foreground">
                  למידה לזהות מנגנוני שליטה ודפוסים רעילים שמופעלים עליך - כדי שלא תיפלי בהם שוב
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover-elevate" data-testid="card-feature-2">
              <img src={feature2} alt="תמיכה רגשית מלאה" className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <HandHeart className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">תמיכה רגשית מלאה</h3>
                </div>
                <p className="text-muted-foreground">
                  מרחב בטוח ולא שיפוטי, מתוך ניסיון אישי ומקצועי עמוק - כאן לא צריך "להיות חזקות"
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover-elevate" data-testid="card-feature-3">
              <img src={feature3} alt="שינוי פנימי מיידי" className="w-full h-48 object-cover" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">שינוי פנימי מיידי</h3>
                </div>
                <p className="text-muted-foreground">
                  תחושת מסוגלות ושינוי פנימי כבר מהמפגש הראשון - לא עוד שיחה רגילה אלא התחלה של חיים חדשים
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20" data-testid="section-principles">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-12" data-testid="text-principles-title">העקרונות המנחים אותי</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover-elevate" data-testid="card-principle-1">
              <Shield className="w-10 h-10 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">אין בעיה באישה</h4>
              <p className="text-sm text-muted-foreground">
                הייתה הסתגלות למציאות פוגעת - עכשיו לומדים דרך חדשה
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-elevate" data-testid="card-principle-2">
              <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">ריפוי בקשר</h4>
              <p className="text-sm text-muted-foreground">
                לא בכוח או סיסמאות, אלא דרך חיבור מחדש לגוף ולרגש
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-elevate" data-testid="card-principle-3">
              <Lightbulb className="w-10 h-10 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">הבנה + כלים</h4>
              <p className="text-sm text-muted-foreground">
                עומק רגשי עם עבודה יומיומית שמחזירה שליטה
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-elevate" data-testid="card-principle-4">
              <Clock className="w-10 h-10 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">הקצב שלך</h4>
              <p className="text-sm text-muted-foreground">
                הקשבה אמיתית למוכנות הפנימית - בלי לחץ
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card" data-testid="section-benefits">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={benefitsImage} 
                alt="אישה מאושרת וחופשית" 
                className="rounded-lg shadow-xl w-full"
                data-testid="img-benefits"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="text-benefits-title">
                מה שנשים חוות<br />
                <span className="text-primary">במהלך הליווי</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4" data-testid="benefit-item-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">מבלבול לבהירות</h4>
                    <p className="text-muted-foreground text-sm">
                      ירידה הדרגתית בעוצמת הכמיהה והבלבול, הבנה רגשית (לא רק שכלית) של מה קרה בקשר
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4" data-testid="benefit-item-2">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">מתלות לעצמאות</h4>
                    <p className="text-muted-foreground text-sm">
                      חיזוק ביטחון פנימי ויכולת בחירה, בניית גבולות רגשיים בריאים
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4" data-testid="benefit-item-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">חזרה לעצמן</h4>
                    <p className="text-muted-foreground text-sm">
                      חיבור מחדש לעצמן, לרצון ולחיים - שקט פנימי ויציבות רגשית
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4" data-testid="benefit-item-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <HandHeart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">פתיחת הלב מחדש</h4>
                    <p className="text-muted-foreground text-sm">
                      יכולת לפתוח את הלב מחדש לקשר בריא - בלי לאבד את עצמן
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-lg" data-testid="text-benefits-cta-box">
                <p className="text-center font-medium">
                  זה לא אימון של "תתגברי"<br />
                  <span className="text-primary">זה תהליך של חזרה הביתה</span>
                </p>
              </div>
              
              <Button 
                className="mt-6 w-full sm:w-auto"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-benefits-cta"
              >
                התחילי את המסע שלך עוד היום
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" data-testid="section-testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">נשים שבחרו לשחרר עצמן</h2>
            <p className="text-muted-foreground" data-testid="text-testimonials-subtitle">
              סיפורים אמיתיים של נשים שעברו את התהליך וחזרו לעצמן
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6" data-testid="card-testimonial-1">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial1} 
                  alt="שרה מ." 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">שרה מ.</h4>
                  <p className="text-sm text-muted-foreground">גרושה, אמא לשניים</p>
                </div>
              </div>
              <div className="relative">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -right-2" />
                <blockquote className="text-muted-foreground pr-6">
                  "אחרי 3 שנים של קשר רעיל, הגעתי לחלי מותשת לחלוטין. חשבתי שאני משוגעת, שאני זו שגורמת לכל הבעיות. הפגישה הראשונה החינמית פתחה לי את העיניים - הבנתי שאני לא לבד ושיש דרך החוצה. התהליך עם חלי החזיר לי את עצמי, את הביטחון שלי ואת השמחה. היום אני יודעת מה הגבולות שלי ולא מפחדת לעמוד עליהם."
                </blockquote>
              </div>
              <p className="text-sm text-primary font-medium mt-4">שינוי מלא תוך 4 חודשים</p>
            </Card>
            
            <Card className="p-6" data-testid="card-testimonial-2">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial2} 
                  alt="מיכל ר." 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">מיכל ר.</h4>
                  <p className="text-sm text-muted-foreground">מנהלת פרויקטים</p>
                </div>
              </div>
              <div className="relative">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -right-2" />
                <blockquote className="text-muted-foreground pr-6">
                  "הייתי במערכת יחסים שבה הרגשתי שאני הולכת על ביצים כל הזמן. כל דבר שעשיתי היה 'לא נכון'. חלי עזרה לי להבין שזה לא אני - זה היה גזלייטינג. היא לימדה אותי לזהות את הדפוסים ולבנות גבולות בריאים. הכי חשוב - היא הייתה שם בשבילי בכל שלב, בלי שיפוטים. היום אני במקום אחר לגמרי, חזקה ובטוחה בעצמי."
                </blockquote>
              </div>
              <p className="text-sm text-primary font-medium mt-4">חזרה לביטחון עצמי תוך 6 שבועות</p>
            </Card>
          </div>
          
          <p className="text-center text-muted-foreground mt-8" data-testid="text-testimonials-count">
            <strong className="text-foreground">מעל 200 נשים</strong> כבר בחרו לשחרר עצמן
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card" data-testid="section-faq">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">שאלות נפוצות</h2>
            <p className="text-muted-foreground" data-testid="text-faq-subtitle">
              תשובות לשאלות שנשים שואלות לפני שהן מתחילות את התהליך
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-background rounded-lg px-6"
                >
                  <AccordionTrigger 
                    className="text-right" 
                    data-testid={`accordion-faq-${index + 1}`}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden" data-testid="section-contact">
        <div className="absolute inset-0">
          <img
            src={ctaImage}
            alt="חלי במשרד הטיפולי"
            className="w-full h-full object-cover"
            data-testid="img-contact"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-contact-title">
                הרגע שלך להתחיל מחדש
              </h2>
              <p className="text-white/90 mb-8" data-testid="text-contact-subtitle">
                הפגישה הראשונה שלנו היא במחיר סמלי בלבד. בלי התחייבות, בלי לחץ - רק מרחב בטוח להבין מה קורה ולראות איך אני יכולה לעזור לך.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">מה תקבלי במפגש החינמי:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3" data-testid="text-contact-benefit-1">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-white/90">הבנה ברורה של המצב שלך</span>
                  </li>
                  <li className="flex items-center gap-3" data-testid="text-contact-benefit-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-white/90">זיהוי דפוסים רעילים בקשר</span>
                  </li>
                  <li className="flex items-center gap-3" data-testid="text-contact-benefit-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-white/90">כלים ראשונים להתמודדות</span>
                  </li>
                  <li className="flex items-center gap-3" data-testid="text-contact-benefit-4">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-white/90">תחושת הקלה ותמיכה אמיתית</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Card className="p-6 md:p-8" data-testid="card-contact-form">
              <h3 className="text-xl font-bold mb-6 text-center">קבעי את הפגישה החינמית שלך עכשיו</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם מלא</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>אימייל</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>טלפון</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ספרי לי קצת על עצמך (אופציונלי)</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} data-testid="input-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? "שולחת..." : "שליחה"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    המקומות מוגבלים • הפגישה נקבעת תוך 24-48 שעות
                  </p>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground" data-testid="section-stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div data-testid="stat-women">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6" />
                <span className="text-3xl md:text-4xl font-bold">200+</span>
              </div>
              <p className="text-sm opacity-90">נשים שהשתחררו</p>
            </div>
            
            <div data-testid="stat-free">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="w-6 h-6" />
                <span className="text-3xl md:text-4xl font-bold">49 ₪</span>
              </div>
              <p className="text-sm opacity-90">פגישה ראשונה</p>
            </div>
            
            <div data-testid="stat-time">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Timer className="w-6 h-6" />
                <span className="text-3xl md:text-4xl font-bold">24-48</span>
              </div>
              <p className="text-sm opacity-90">שעות לקביעה</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t" data-testid="section-footer">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <img 
              src={logoImg} 
              alt="חלי לב - לוגו" 
              className="h-16 md:h-20 w-auto object-contain opacity-80"
              data-testid="img-footer-logo"
            />
          </div>
          <p className="text-muted-foreground text-sm" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Toxic Free - חלי לב. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
}
