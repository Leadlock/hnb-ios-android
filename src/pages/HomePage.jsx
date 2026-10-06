import Header from '../components/Header'
import Hero from '../components/Hero'
import ServicesSection from '../components/ServicesSection'
import ProcessTimeline from '../components/ProcessTimeline'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import AppPromo from '../components/AppPromo'
import FAQAccordion from '../components/FAQAccordion'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppPromo />
        <ServicesSection />
        <ProcessTimeline />
        <WhyChooseUs />
        <Testimonials />
        <div id="faq"><FAQAccordion /></div>
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
