import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import './styles.css'

const A = '/assets/'
const work = [
  ['project-royal-institute-traditional-arts-01.jpg', 'المعهد الملكي للفنون التقليدية في قصر الحريري'],
  ['project-world-dates-festival-01.jpg', 'مهرجان عالم التمور / المركز الوطني للنخيل والتمور'],
  ['project-royal-institute-traditional-arts-02.jpg', 'المعهد الملكي للفنون التقليدية في قصر الحريري'],
  ['project-riyadh-marathon-2026-01.jpg', 'ماراثون الرياض 2026'],
] as const

function App() {
  const video = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const [loading, setLoading] = useState(!reduce)
  const [cursor, setCursor] = useState({ x: -100, y: -100, interactive: false })
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const constrained = connection?.saveData || window.matchMedia('(max-width: 640px)').matches
    if (reduce || constrained) return
    const el = video.current
    if (!el) return
    el.load()
    el.play().catch(() => undefined)
  }, [reduce])
  useEffect(() => {
    if (reduce) return
    const timer = window.setTimeout(() => setLoading(false), 1550)
    return () => window.clearTimeout(timer)
  }, [reduce])
  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('cursor-active')
    const move = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY, interactive: Boolean((event.target as Element).closest('a,button')) })
    window.addEventListener('pointermove', move)
    return () => { window.removeEventListener('pointermove', move); document.body.classList.remove('cursor-active') }
  }, [reduce])
  return <><OpeningLoader visible={loading} /><Cursor cursor={cursor} /><main>
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero-poster" src={`${A}hero-fallback-poster-heritage-lighting.jpg`} width="1600" height="900" fetchPriority="high" alt="إضاءة موقع تراثي في فعالية" />
      {!reduce && <video ref={video} className={videoReady ? 'hero-video ready' : 'hero-video'} muted loop playsInline preload="metadata" aria-hidden="true" onCanPlay={() => setVideoReady(true)}>
        <source src={`${A}trust-events-video-01.mp4`} type="video/mp4" />
      </video>}
      <div className="veil" aria-hidden="true" />
      <nav className="site-nav" aria-label="التنقل الرئيسي">
  <a className="brand" href="#hero-title" onClick={() => setMenuOpen(false)}><img src={`${A}trust-events-logo-on-black.jpg`} width="196" height="76" alt="Trust Events" /></a>
  <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span><span></span></button>
  <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}><a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a><a href="#work" onClick={() => setMenuOpen(false)}>أعمالنا</a><a href="#team" onClick={() => setMenuOpen(false)}>فريقنا</a><a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا <span>↖</span></a></div>
  <a className="nav-cta" href="#contact">تواصل معنا <span>↖</span></a>
</nav>
      <div className="hero-copy">
        <h1 id="hero-title">حضورٌ يعتني بكل تفاصيل الموقع.</h1>
        <p>خدمات نظافة وضيافة وإدارة حشود تساند فعاليتك قبلها وأثناءها وبعدها.</p>
        <a className="button" href="#work">استكشف أعمالنا <span>←</span></a>
      </div>
      <p className="hero-note">تمرير للاستكشاف <span>↓</span></p>
    </section>

    <Section id="services" title="ما الذي ندعمه؟" kicker="خدمات ميدانية مدروسة">
      <div className="services">
        <ServiceCard index="01" image="project-royal-institute-traditional-arts-01.jpg" title="نظافة الموقع">تنظيف الموقع قبل الفعالية، والمحافظة على نظافته أثناءها، والتنظيف الشامل بعد انتهائها.</ServiceCard>
        <ServiceCard index="02" image="team-photo-heritage-food-festival.jpg" title="إدارة النفايات والضيافة">إدارة النفايات، وخدمات ضيافة يقدّمها باريستا وندل مدرّبون.</ServiceCard>
        <ServiceCard index="03" image="team-photo-esports-world-cup-site.jpg" title="تنظيم الحشود">فريق مدرّب لتوجيه وتنظيم الحشود، بما يدعم انسيابية تدفقها بأمان.</ServiceCard>
      </div>
    </Section>

    <Section id="work" title="أعمال مختارة" kicker="من مواقع عملنا">
      <div className="gallery">
        {work.map(([image, label], i) => <m.figure key={image} className={`card card-${i + 1}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .55, delay: i * .08 }}>
          <img src={`${A}${image}`} width="1200" height="800" loading="lazy" sizes="(max-width: 700px) 100vw, 50vw" alt={label} /><figcaption>{label}</figcaption>
        </m.figure>)}
      </div>
    </Section>

    <section id="team" className="team" aria-labelledby="team-title">
      <div><p className="eyebrow">فريق في الميدان</p><h2 id="team-title">خلف كل مساحة منظمة، فريق حاضر.</h2></div>
      <div className="team-images"><img src={`${A}team-photo-esports-world-cup.jpg`} width="900" height="600" loading="lazy" alt="فريق Trust Events في موقع العمل" /><img src={`${A}team-photo-heritage-food-festival.jpg`} width="900" height="600" loading="lazy" alt="فريق Trust Events أثناء فعالية" /></div>
    </section>

    <footer id="contact">
  <div className="footer-top"><div><p className="eyebrow">لنبدأ الحديث</p><h2>لنجعل فعاليتك<br />في أيدٍ موثوقة.</h2></div><img src={`${A}trust-events-logo-on-black.jpg`} width="196" height="76" alt="Trust Events" /></div>
  <div className="contact-links">
    <a href="https://www.trust-events.com.sa"><span className="contact-icon" aria-hidden="true"><GlobeIcon /></span><span><b>الموقع الإلكتروني</b><small>trust-events.com.sa</small></span><span className="arrow" aria-hidden="true">↖</span></a>
    <a href="mailto:info@trust-events.com.sa"><span className="contact-icon" aria-hidden="true"><MailIcon /></span><span><b>البريد الإلكتروني</b><small dir="ltr">info@trust-events.com.sa</small></span><span className="arrow" aria-hidden="true">↖</span></a>
    <a href="tel:+966562447862"><span className="contact-icon" aria-hidden="true"><PhoneIcon /></span><span><b>اتصل بنا</b><small dir="ltr">+966 56 244 7862</small></span><span className="arrow" aria-hidden="true">↖</span></a>
  </div>
  <div className="footer-bottom"><small>© Trust Events</small><a href="#hero-title">العودة للأعلى <span>↑</span></a></div>
</footer>
  </main></>
}
function OpeningLoader({ visible }: { visible: boolean }) { if (!visible) return null; return <m.div className="opening-loader" aria-label="جارٍ تحميل الموقع"><div className="book" aria-hidden="true"><m.div className="book-cover cover-right" initial={{ rotateY: 0 }} animate={{ rotateY: -158 }} transition={{ duration: .85, delay: .25, ease: [.6,.02,.15,.98] }} /><m.div className="book-cover cover-left" initial={{ rotateY: 0 }} animate={{ rotateY: 158 }} transition={{ duration: .85, delay: .25, ease: [.6,.02,.15,.98] }} /><div className="book-spine" /><div className="book-mark">TRUST<br />EVENTS</div></div><p>تبدأ الحكاية من التفاصيل</p></m.div> }
function Cursor({ cursor }: { cursor: { x: number, y: number, interactive: boolean } }) { return <m.div className={`custom-cursor ${cursor.interactive ? 'is-interactive' : ''}`} animate={{ x: cursor.x, y: cursor.y }} transition={{ type: 'spring', stiffness: 720, damping: 38, mass: .22 }} aria-hidden="true"><span /></m.div> }function ServiceCard({ index, image, title, children }: { index: string, image: string, title: string, children: React.ReactNode }) { return <m.article className="service-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .55, delay: Number(index) * .08 }} whileHover={{ y: -7 }}><div className="service-image"><img src={`${A}${image}`} width="900" height="600" loading="lazy" alt="" /><span>{index}</span></div><div className="service-copy"><h3>{title}</h3><p>{children}</p><i aria-hidden="true">←</i></div></m.article> }function Section({ id, title, kicker, children }: { id?: string, title: string, kicker: string, children: React.ReactNode }) { return <section id={id} className="section"><header><p className="eyebrow">{kicker}</p><h2>{title}</h2></header>{children}</section> }
function GlobeIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.1 2.25 3.1 5.08 3.1 8.5S14.1 18.25 12 20.5c-2.1-2.25-3.1-5.08-3.1-8.5S9.9 5.75 12 3.5"/></svg> }
function MailIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4.5 7 7.5 5.8L19.5 7"/></svg> }
function PhoneIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7.1 3.8 4.8 5.2c-.7.43-1 1.28-.7 2.06 2.2 5.83 5.72 9.36 11.55 11.57.78.3 1.63 0 2.06-.7l1.38-2.3c.42-.7.32-1.6-.25-2.17l-1.55-1.55a1.8 1.8 0 0 0-2.15-.3l-1.1.62a14.1 14.1 0 0 1-2.5-2.48l.62-1.1a1.8 1.8 0 0 0-.3-2.15l-1.55-1.55a1.8 1.8 0 0 0-2.17-.25Z"/></svg> }createRoot(document.getElementById('root')!).render(<LazyMotion features={domAnimation}><App /></LazyMotion>)








