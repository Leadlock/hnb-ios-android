import { useLayoutEffect, useRef, useState } from 'react'
import './Testimonials.css'

/* Real customer reviews. Review text is verbatim as received. */
const reviews = [
  {
    name: 'Rakhi Singh',
    location: 'Navi Mumbai',
    rating: 5,
    text: "I have been using Hangers & Basket Laundry Service for quite some time now, and I am thoroughly satisfied with their service.\n\nI have entrusted them with numerous items, but one experience stands out. I gave them a sofa cover that was in extremely poor condition — stained with dirt, paint, and glue. I was certain it would have to be discarded. However, they worked wonders and returned it to me looking absolutely brand new.\n\nWhat I appreciate most is that H & B offers a comprehensive, one-stop solution. Previously, before traveling, I had to approach different vendors for shoe cleaning, dry cleaning, ironing, and suitcase or bag cleaning. Now, Hanger & Basket handles it all — laundry, dry cleaning, shoe care, ironing, and even suitcase & bag cleaning. It is completely stress-free and hassle-free.\n\nThey are also exceptionally reliable for urgent requests. The pick-up and delivery team is courteous, humble, and highly professional. They don't treat you merely as a client, but like family.\n\nI highly recommend Hangers & Basket. This service truly makes life effortless.",
  },
  {
    name: 'Chaitra',
    location: 'Navi Mumbai',
    rating: 5,
    text: "I've personally used Hangers and Basket's services for laundry and dry cleaning and I've been extremely happy with the results.\n\nThe quality of their work has been consistently excellent, with great attention to detail. My gowns and curtains came back looking fresh, clean and beautifully maintained, and my shoes came back as good as new everytime.\n\nWhat I particularly appreciate is the care they take with every item, especially delicate and difficult-to-clean pieces. The service is professional, reliable and hassle-free from start to finish. It's reassuring to know that I can trust them with my clothes, curtains and other priced belongings.\n\nI would definitely recommend their services to anyone looking for quality cleaning with a personal touch!",
  },
  {
    name: 'Vishal Pratap Singh',
    location: 'Navi Mumbai',
    rating: 5,
    text: "I've had a really good experience with Hangers & Basket. The service is professional, convenient, and the quality of laundry has been consistently good. The team is responsive and takes good care of the clothes. Overall, a reliable and hassle-free laundry service that I'd definitely recommend!",
  },
  {
    name: 'Heena Peddawad',
    location: 'Navi Mumbai',
    rating: 5,
    text: "I'm extremely happy with my experience with Hangers & Basket! ❤️ From the moment I gave my clothes for laundry, the entire process was smooth, professional, and completely hassle-free. The clothes came back fresh, spotless, neatly folded, and with great attention to detail. ✨\n\nWhat I loved most was their excellent service, timely delivery, and the care they take with every garment. It's rare to find a laundry service that combines quality, convenience, and professionalism so beautifully.\n\nThank you, Hangers & Basket, for making laundry so effortless! Highly recommended.",
  },
  {
    name: 'Komal Mittal',
    location: 'Navi Mumbai',
    rating: 5,
    text: "Thank you, Hangers & Basket team, for the wonderful laundry service. Everything came back so fresh, neatly folded, and handled with great care. It is a huge help and saves me so much time. I really appreciate your hard work. 👏🏻",
  },
  {
    name: 'Amita Singh',
    location: 'Navi Mumbai',
    rating: 5,
    text: "I've had a great experience with Hangers & Basket. The service is smooth, timely, and the clothes always come back fresh, clean, and neatly handled. The team is friendly and professional, making the entire process really convenient. Definitely a laundry service I'd happily recommend 🙏🙂",
  },
]

const col1 = reviews.filter((_, i) => i % 2 === 0)
const col2 = reviews.filter((_, i) => i % 2 !== 0)

/* Reviews vary a lot in length, so a fixed duration would make the two columns
   scroll at visibly different speeds. Drive the duration off the measured
   height instead, and both columns move at the same pixels per second. */
const SCROLL_SPEED = 30
const CLAMP_ABOVE = 320

function Column({ items, reverse }) {
  const trackRef = useRef(null)
  const [duration, setDuration] = useState(22)
  const [openCard, setOpenCard] = useState(null)
  const [touched, setTouched] = useState(false)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      // the track holds two identical copies, so one loop travels half its height
      setDuration(Math.max(track.scrollHeight / 2 / SCROLL_SPEED, 12))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const doubled = [...items, ...items]

  return (
    <div className="tr-col-wrap">
      <div
        ref={trackRef}
        className={`tr-col-track ${reverse ? 'reverse' : ''} ${openCard !== null || touched ? 'paused' : ''}`}
        style={{ animationDuration: `${duration}s` }}
        onPointerDown={() => setTouched(true)}
        onPointerUp={() => setTouched(false)}
        onPointerCancel={() => setTouched(false)}
      >
        {doubled.map((r, i) => {
          const isLong = r.text.length > CLAMP_ABOVE
          const isOpen = openCard === i
          return (
            <div key={i} className={`tr-card ${isOpen ? 'expanded' : ''}`}>
              <div className="tr-quote">"</div>
              <div className="tr-stars">{'★'.repeat(r.rating)}</div>
              <p className="tr-text">{r.text}</p>
              {isLong && (
                <button
                  type="button"
                  className="tr-more"
                  onClick={() => setOpenCard(isOpen ? null : i)}
                >
                  {isOpen ? 'Show less' : 'Read full review'}
                </button>
              )}
              <div className="tr-author">
                <div className="tr-avatar" style={{ background: avatarColor(r.name) }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="tr-name">{r.name}</div>
                  <div className="tr-service">{r.location}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function avatarColor(name) {
  const colors = ['#7c3aed','#1F5FFF','#16a34a','#ea580c','#e11d48','#0891b2','#d97706']
  let h = 0
  for (let c of name) h += c.charCodeAt(0)
  return colors[h % colors.length]
}

export default function Testimonials() {
  return (
    <section className="tr-section">
      <div className="container">
        <div className="text-center section-head">
          <div className="section-tag tr-tag">★ Customer Reviews</div>
          <h2 className="tr-title">Trusted by Indian Homes.<br /><span className="gradient-text">See What They Say.</span></h2>
        </div>
      </div>

      <div className="tr-grid">
        <Column items={col1} reverse={false} />
        <Column items={col2} reverse={true} />
      </div>
    </section>
  )
}
