import React, { useState } from 'react';
import { 
  Cloud, Zap, Shield, Users, BarChart3, Globe,
  ChevronDown, ArrowRight, Check
} from 'lucide-react';
import Navbar from './components/Navbar';
import PricingCard from './components/PricingCard';
import Testimonial from './components/Testimonial';
import CTASection from './components/CTASection';
import FooterWithLinks from './components/FooterWithLinks';

const NAV_LINKS = [
  { label: '기능',     href: '#features' },
  { label: '사용방법', href: '#how-it-works' },
  { label: '후기',     href: '#testimonials' },
  { label: '가격',     href: '#pricing' },
  { label: 'FAQ',      href: '#faq' },
];

const features = [
  { icon: <Cloud   className="w-8 h-8" />, title: '클라우드 저장소',  description: '무제한 파일 업로드와 실시간 동기화로 어디서나 접근 가능합니다.' },
  { icon: <Zap     className="w-8 h-8" />, title: '빠른 속도',        description: '최적화된 서버로 초고속 업로드와 다운로드를 경험하세요.' },
  { icon: <Shield  className="w-8 h-8" />, title: '강력한 보안',      description: '엔터프라이즈급 암호화로 데이터를 안전하게 보호합니다.' },
  { icon: <Users   className="w-8 h-8" />, title: '팀 협업',          description: '실시간 공동 작업과 댓글 기능으로 팀 생산성을 높입니다.' },
  { icon: <BarChart3 className="w-8 h-8" />, title: '상세한 분석',    description: '프로젝트 진행 상황과 팀 활동을 한눈에 파악할 수 있습니다.' },
  { icon: <Globe   className="w-8 h-8" />, title: '글로벌 접근',      description: '전 세계 어디서나 빠른 속도로 데이터에 접근하세요.' },
];

const steps = [
  { number: '01', title: '계정 생성',  description: '간단한 회원가입으로 30초 만에 시작하세요.' },
  { number: '02', title: '팀 초대',    description: '이메일로 팀원을 초대하고 프로젝트를 만드세요.' },
  { number: '03', title: '협업 시작',  description: '파일을 공유하고 실시간으로 함께 작업하세요.' },
];

const testimonials = [
  {
    quote: 'CloudSync를 도입한 이후 팀 생산성이 확실히 좋아졌습니다. 파일 관리가 훨씬 편리해졌어요.',
    author: '김지현',
    role: 'CTO',
    company: 'TechNova',
    rating: 5,
  },
  {
    quote: '직관적인 UI 덕분에 팀원들이 별도 교육 없이도 바로 쓸 수 있었습니다. 강력 추천합니다!',
    author: '이민준',
    role: '프로젝트 매니저',
    company: 'BrightLab',
    rating: 5,
  },
  {
    quote: '보안 기능이 탁월합니다. 민감한 고객 데이터를 다루는 저희 팀에 딳 맞는 솔루션이에요.',
    author: '박수연',
    role: '보안 담당자',
    company: 'SecureOne',
    rating: 5,
  },
];

const plans = [
  {
    name: 'Free',
    price: 0,
    description: '개인 사용자를 위한 기본 플랜',
    features: ['5GB 저장 공간', '최대 3명 팀원', '기본 협업 기능', '모바일 앱 지원'],
    buttonText: '무료 시작',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 29000,
    description: '소규모 팀을 위한 프로 플랜',
    features: ['100GB 저장 공간', '무제한 팀원', '고급 협업 기능', '우선 지원', '상세 분석 리포트', 'API 접근'],
    buttonText: 'Pro 시작',
    highlighted: true,
    badge: '인기',
  },
  {
    name: 'Enterprise',
    price: '문의',
    period: '',
    description: '대규모 조직을 위한 맞춤 솔루션',
    features: ['무제한 저장 공간', '무제한 팀원', '전담 고객 지원', '맞춤 통합', '고급 보안 기능', 'SLA 보장'],
    buttonText: '문의하기',
    highlighted: false,
  },
];

const faqs = [
  { question: 'CloudSync는 어때한 서비스인가요?',            answer: 'CloudSync는 팀 협업을 위한 클라우드 기반 프로젝트 관리 플랫폼입니다.' },
  { question: '무료 플랜과 유료 플랜의 차이는 무엇인가요?', answer: '무료 플랜은 5GB 저장 공간과 최대 3명의 팀원을 지원하며, Pro 플랜은 100GB 저장 공간, 무제한 팀원, 고급 기능과 우선 지원을 제공합니다.' },
  { question: '데이터는 안전하게 보호되나요?',             answer: '네, 모든 데이터는 AES-256 암호화로 보호되며, 정기적인 보안 감사와 백업을 통해 데이터 안전을 보장합니다.' },
  { question: '모바일에서도 사용할 수 있나요?',            answer: 'iOS와 Android용 네이티브 앱을 제공하며, 모바일 브라우저에서도 완벽하게 작동합니다.' },
  { question: '언제든지 플랜을 변경할 수 있나요?',         answer: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있으며, 남은 기간에 대한 비용은 자동으로 정산됩니다.' },
  { question: '환불 정책은 어떻게 되나요?',               answer: '구독 후 14일 이내에는 100% 환불이 가능하며, 그 이후에는 취소 시점부터 다음 결제일까지 서비스를 이용할 수 있습니다.' },
];

const FOOTER_LINKS = [
  {
    title: '제품',
    items: [
      { label: '기능',    href: '#features' },
      { label: '가격',    href: '#pricing' },
      { label: '보안',    href: '#' },
      { label: '업데이트', href: '#' },
    ],
  },
  {
    title: '회사',
    items: [
      { label: '소개',  href: '#' },
      { label: '블로그', href: '#' },
      { label: '채용',  href: '#' },
      { label: '문의',  href: '#' },
    ],
  },
  {
    title: '지원',
    items: [
      { label: '고객센터', href: '#' },
      { label: '문서',    href: '#' },
      { label: 'API',     href: '#' },
      { label: '상태',    href: '#' },
    ],
  },
];

function App() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo="CloudSync"
        links={NAV_LINKS}
        ctaText="무료 시작"
        ctaHref="#pricing"
      />

      <section className="pt-24 pb-20 bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              팀 협업을 더{' '}
              <span className="text-primary-600">쉽고 효율적으로</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              CloudSync로 프로젝트 관리를 시작하세요.
              실시간 협업, 안전한 파일 공유, 강력한 분석 기능을 한 곳에서.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                무료로 시작하기 <ArrowRight className="w-5 h-5" />
              </a>
              <button className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition text-lg font-semibold">
                데모 보기
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">신용카드 필요 없음 · 무료 플랜 영구 제공</p>
          </div>
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl aspect-video flex items-center justify-center">
              <div className="text-center">
                <Cloud className="w-24 h-24 text-primary-600 mx-auto mb-4" />
                <p className="text-primary-800 text-lg font-medium">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">강력한 기능</h2>
            <p className="text-xl text-gray-600">팀 협업에 필요한 모든 것을 하나의 플랫폼에서</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">간단한 3단계</h2>
            <p className="text-xl text-gray-600">몇 분 만에 시작할 수 있습니다</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block w-8 h-8 text-primary-300 mx-auto mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">고객 후기</h2>
            <p className="text-xl text-gray-600">실제 사용자들의 생생한 이야기</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">투명한 가격 정책</h2>
            <p className="text-xl text-gray-600">팀 규모에 맞는 플랜을 선택하세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <PricingCard
                key={i}
                plan={plan.name}
                price={plan.price}
                period={plan.period !== undefined ? plan.period : '월'}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
                badge={plan.badge}
                buttonText={plan.buttonText}
                onSelect={() => console.log(`${plan.name} 플랜 선택`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600">궁금한 점이 있으신가요?</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="지금 바로 시작하세요"
        subtitle="14일 무료 체험, 신용카드 필요 없음"
        primaryButton={{ text: '무료로 시작하기', href: '#pricing' }}
        secondaryButton={{ text: 'FAQ 보기', href: '#faq' }}
      />

      <FooterWithLinks
        companyName="CloudSync"
        description="팀 협업을 위한 최고의 클라우드 솔루션"
        links={FOOTER_LINKS}
        socialLinks={[
          { platform: 'twitter',   href: '#' },
          { platform: 'linkedin',  href: '#' },
          { platform: 'github',    href: '#' },
        ]}
        copyright="© 2026 CloudSync. All rights reserved."
        extraLinks={[
          { label: '이용약관',         href: '#' },
          { label: '개인정보처리방침', href: '#' },
          { label: '쿠키 정책',        href: '#' },
        ]}
      />
    </div>
  );
}

export default App;