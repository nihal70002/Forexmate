import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeftRight, ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, ChevronDown, Globe2, Headphones, Heart, MapPin, Menu, Plane, Search, ShieldCheck, Sparkles, Users, WalletCards, X } from 'lucide-react'
import './style.css'
import './pages.css'

const destinations = [
  { name: 'Bali', country: 'Indonesia', price: '$489', days: '7 nights', image: 'photo-1537996194471-e657df975ab4', tag: 'MOST LOVED', rating: '4.9' },
  { name: 'Kyoto', country: 'Japan', price: '$625', days: '5 nights', image: 'photo-1493976040374-85c8e12f0c0e', tag: 'CULTURE PICK', rating: '4.8' },
  { name: 'Amalfi Coast', country: 'Italy', price: '$712', days: '6 nights', image: 'photo-1533105079780-92b9be482077', tag: 'SUMMER DREAM', rating: '5.0' },
  { name: 'Marrakech', country: 'Morocco', price: '$398', days: '4 nights', image: 'photo-1539020140153-e479b8c22e70', tag: 'CITY ESCAPE', rating: '4.8' },
  { name: 'Reykjavik', country: 'Iceland', price: '$540', days: '5 nights', image: 'photo-1504893524553-b855bce32c67', tag: 'WILD & FREE', rating: '4.9' },
  { name: 'Cape Town', country: 'South Africa', price: '$680', days: '7 nights', image: 'photo-1580060839134-75a5edca2e99', tag: 'BIG ADVENTURE', rating: '4.9' },
  { name: 'New York', country: 'United States', price: '$325', days: '4 nights', image: 'photo-1496588152823-86ff7695e68f', tag: 'CITY CLASSIC', rating: '4.7' },
  { name: 'Lisbon', country: 'Portugal', price: '$415', days: '5 nights', image: 'photo-1555881400-74d7acaacd8b', tag: 'LOCAL FAVORITE', rating: '4.8' },
  { name: 'Seoul', country: 'South Korea', price: '$590', days: '6 nights', image: 'photo-1538485399081-7191377e8241', tag: 'ALL THE BUZZ', rating: '4.9' },
]
const tabs = ['Flights', 'Stays', 'Packages']
const pageInfo = {
  flights: ['Flights', 'Find a flight that takes you somewhere new.', 'Compare fare ideas for journeys around the world. Choose your dates and destination to get started.'],
  stays: ['Places to stay', 'Stay somewhere that feels like part of the trip.', 'Browse inspiring places to rest, recharge, and wake up somewhere different.'],
  packages: ['Travel packages', 'The whole trip, coming together.', 'Pair a flight with a stay and make planning feel like the easy part.'],
  money: ['Travel money', 'Your money travels well, too.', 'Forexmate Exchange helps make spending abroad feel simple. USD is the displayed currency for this travel experience.'],
  about: ['The Forexmate way', 'Good trips start with feeling at home.', 'We bring travel planning and Forexmate Exchange together, so it is easier to get out there with confidence.'],
  help: ['We are here to help.', 'A little help goes a long way.', 'Our travel team is here around the clock when you need a hand planning your next trip.'],
}

function App() {
  const [tab, setTab] = useState('Flights')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || 'home')
  const [showMore, setShowMore] = useState(false)
  const [trip, setTrip] = useState('Round trip')
  const [from, setFrom] = useState('New York (JFK)')
  const [to, setTo] = useState('Bali, Indonesia (DPS)')
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 3000) }
  const swap = () => { setFrom(to); setTo(from) }
  const searchLabel = tab === 'Flights' ? 'Find flights' : tab === 'Stays' ? 'Find stays' : 'Explore packages'
  useEffect(() => {
    const syncPage = () => { setPage(window.location.hash.replace('#', '') || 'home'); setMenuOpen(false); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])
  const goPage = (next) => { setPage(next); window.location.hash = next; setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="min-h-screen bg-paper text-ink">
    <header className="topbar"><a href="#home" className="brand" aria-label="Forexmate Travel home"><span className="brand-mark"><Plane size={20} fill="currentColor"/></span><span>forexmate<span className="brand-light"> travel</span></span></a>
      <nav className={`${menuOpen ? 'nav-open' : ''}`}><a className={page==='home'?'nav-active':''} href="#home" onClick={()=>setMenuOpen(false)}>Explore</a><a className={page==='flights'?'nav-active':''} href="#flights" onClick={()=>setMenuOpen(false)}>Flights</a><a className={page==='stays'?'nav-active':''} href="#stays" onClick={()=>setMenuOpen(false)}>Stays</a><a className={page==='packages'?'nav-active':''} href="#packages" onClick={()=>setMenuOpen(false)}>Packages</a><a className={page==='money'?'nav-active':''} href="#money" onClick={()=>setMenuOpen(false)}>Travel money</a><a href="#about" onClick={()=>setMenuOpen(false)}>About</a><a href="#help" onClick={()=>setMenuOpen(false)}>Help</a></nav>
      <div className="header-actions"><label className="currency-select"><Globe2 size={16}/><span>USD</span></label><button className="login" onClick={()=>notify('Sign in is coming soon.')}>Log in</button><button className="join" onClick={()=>notify('Welcome aboard — account creation is coming soon.')}>Join for free <ArrowRight size={15}/></button></div>
      <button className="mobile-toggle" aria-label="Toggle navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>

    <main id="home">{page!=='home' && pageInfo[page] ? <RoutePage page={page} onGo={goPage} onNotify={notify}/> : <><section className="hero">
      <div className="hero-photo" aria-hidden="true"></div><div className="hero-overlay"></div>
      <div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR NEXT CHAPTER STARTS HERE</div><h1>The world is<br/>closer than <em>ever.</em></h1><p>Flights, stays, and travel money. All the pieces for a better trip, in one place.</p><a className="hero-link" href="#explore">Find your somewhere <ArrowRight size={17}/></a></div>
      <div className="hero-note"><span className="note-line"></span><span>Somewhere between<br/>here and <b>everywhere.</b></span></div>
      <div className="photo-credit">UBUD, BALI <span>—</span> 08°30′S 115°15′E</div>
      <div className="booking-card"><div className="booking-tabs">{tabs.map(item=><button key={item} className={tab===item?'tab-selected':''} onClick={()=>setTab(item)}>{item==='Flights'?<Plane size={16}/>:item==='Stays'?<MapPin size={16}/>:<Sparkles size={16}/>} {item}</button>)}</div>
        <div className="trip-options"><button className="trip-choice" onClick={()=>setTrip(trip==='Round trip'?'One way':'Round trip')}>{trip} <ChevronDown size={14}/></button><span className="passengers"><Users size={15}/> 1 traveler <ChevronDown size={14}/></span></div>
        <div className="search-fields"><label className="field"><span>{tab==='Stays'?'DESTINATION':'FROM'}</span><div><MapPin size={18}/><input value={from} onChange={e=>setFrom(e.target.value)} aria-label="Origin"/></div></label><button className="swap" aria-label="Swap destinations" onClick={swap}><ArrowLeftRight size={17}/></button><label className="field"><span>{tab==='Stays'?'CHECK IN':'TO'}</span><div><Plane size={18}/><input value={to} onChange={e=>setTo(e.target.value)} aria-label="Destination"/></div></label><label className="field date-field"><span>{tab==='Stays'?'CHECK OUT':'DATES'}</span><div><CalendarDays size={18}/><input aria-label="Travel dates" value="Jun 12 — Jun 19" onChange={()=>{}}/></div></label><button className="search-button" onClick={()=>notify(`${searchLabel} for ${to} — booking tools are coming soon.`)}><Search size={17}/>{searchLabel}</button></div>
        <div className="booking-foot"><span><ShieldCheck size={15}/> No hidden fees, ever</span><span>Powered by Forexmate Exchange</span></div>
      </div>
    </section>

    <section className="benefit-strip" id="why"><div><span className="benefit-icon"><WalletCards size={19}/></span><span><b>One card, anywhere</b><small>Travel money that just works</small></span></div><i></i><div><span className="benefit-icon"><ArrowUpRight size={19}/></span><span><b>Rates worth traveling for</b><small>Exchange smarter, spend more</small></span></div><i></i><div><span className="benefit-icon"><Headphones size={19}/></span><span><b>Here when you need us</b><small>Real humans, around the clock</small></span></div><a href="#why" onClick={e=>{e.preventDefault();notify('Travel protection details are coming soon.')}}>Travel with confidence <ArrowRight size={15}/></a></section>

    <section className="destinations" id="explore"><div className="section-heading"><div><div className="eyebrow dark-eyebrow">A LITTLE INSPIRATION <span>✳</span> A LOT OF POSSIBILITY</div><h2>Somewhere calling <em>your name.</em></h2></div><a href="#deals" className="view-all">See all destinations <ArrowRight size={16}/></a></div>
      <div className="destination-grid">{destinations.slice(0,showMore?destinations.length:3).map((place,i)=><DestinationCard key={place.name} place={place} onNotify={notify} onExplore={()=>{setTab('Flights');setTo(`${place.name}, ${place.country}`);window.scrollTo({top:0,behavior:'smooth'})}}/>)}</div><button className="show-more" onClick={()=>setShowMore(!showMore)}>{showMore?'Show fewer destinations':'Show more destinations'} <ChevronDown size={16} className={showMore?'rotate-up':''}/></button>
    </section>

    <section className="exchange-banner"><div className="exchange-orb orb-one"></div><div className="exchange-orb orb-two"></div><div className="exchange-text"><span className="eyebrow">THE WORLD IN YOUR WALLET</span><h2>Spend like you <em>belong.</em><br/>Anywhere you land.</h2><p>Make travel money the easiest part of your trip. Great exchange rates, one clever card, and no nasty surprises.</p><button onClick={()=>notify('Travel money features are coming soon.')}>Meet your travel card <ArrowRight size={16}/></button></div><div className="currency-visual"><div className="currency-chip">✳</div><div className="currency-row"><span>USD</span><b>$</b><span className="currency-line"></span><span>EUR</span><b>€</b></div><div className="currency-caption"><span>YOUR MONEY, WITHOUT BORDERS</span><BadgeCheck size={19}/></div><div className="currency-floating">1 USD <ArrowLeftRight size={13}/> 0.92 EUR</div></div></section>

    <section className="trust-row"><div><b>Good trips start with good company.</b><span>Join 120,000+ travelers finding their way with Forexmate.</span></div><div className="trust-proof"><span>★★★★★</span><b>4.9/5</b><small>from 8,200+ happy travelers</small></div><button onClick={()=>notify('Traveler stories are coming soon.')}>Read their stories <ArrowRight size={15}/></button></section>
    </> }</main>
    <footer id="footer"><a href="#home" className="brand footer-brand"><span className="brand-mark"><Plane size={18} fill="currentColor"/></span><span>forexmate<span className="brand-light"> travel</span></span></a><span>Go further. Feel at home.</span><span>© 2026 Forexmate Exchange</span><a href="#home">Back to top ↑</a></footer>
    {toast&&<div role="status" className="toast"><Check size={17}/>{toast}</div>}
  </div>
}

function DestinationCard({place,onNotify,onExplore}) {
  const [saved,setSaved] = useState(false)
  return <article className="destination-card"><div className="destination-image" style={{backgroundImage:`url(https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=900&q=85)`}}><span className="place-tag">{place.tag}</span><button aria-label={`${saved?'Remove':'Save'} ${place.name}`} className={`heart ${saved?'hearted':''}`} onClick={()=>{setSaved(!saved);onNotify(`${place.name} ${saved?'removed from':'saved to'} your trips.`)}}><Heart size={18}/></button><span className="rating">★ {place.rating}</span></div><div className="destination-info"><div><h3>{place.name}</h3><p>{place.country} <span>·</span> {place.days}</p></div><div className="price"><small>FROM</small><b>{place.price}</b></div></div><button className="card-link" onClick={onExplore}>Explore {place.name} <ArrowUpRight size={15}/></button></article>
}

function RoutePage({page,onGo,onNotify}) {
  const [title,heading,description]=pageInfo[page]
  const list = page==='flights' ? destinations.slice(0,6) : page==='stays' ? [...destinations].reverse().slice(0,6) : destinations.slice(0,6)
  return <section className="route-page"><div className="route-hero"><span className="eyebrow dark-eyebrow">FOREXMATE TRAVEL <span>✳</span> {title.toUpperCase()}</span><h1>{heading}</h1><p>{description}</p><button className="route-cta" onClick={()=>page==='money'?onNotify('Travel money details are coming soon.'):onGo('home')}>{page==='money'?'Explore travel money':'Start exploring'} <ArrowRight size={16}/></button></div>{page==='about'||page==='help'||page==='money'?<div className="route-feature"><div className="feature-symbol">{page==='money'?<WalletCards size={32}/>:page==='help'?<Headphones size={32}/>:<Globe2 size={32}/>}</div><div><span className="eyebrow dark-eyebrow">MADE FOR THE WAY YOU TRAVEL</span><h2>{page==='money'?'One familiar currency. A world of possibilities.':page==='help'?'Real people. Real help.':'More world, less worry.'}</h2><p>{page==='money'?'Browse trips and plan with USD prices throughout the experience. Forexmate Exchange is here to make your travel money simple.':'From finding your next destination to getting help along the way, Forexmate Travel brings the details together in one friendly place.'}</p></div><button className="card-link" onClick={()=>onGo('home')}>Explore trips <ArrowUpRight size={15}/></button></div>:<><div className="route-intro"><div><span className="eyebrow dark-eyebrow">A FEW PLACES TO BEGIN</span><h2>{page==='flights'?'Popular flight ideas':page==='stays'?'Stays with a sense of place':'Trips worth looking forward to'}</h2></div><span className="route-count">{destinations.length} destinations <Globe2 size={15}/></span></div><div className="destination-grid route-grid">{list.map(place=><DestinationCard key={place.name} place={place} onNotify={onNotify} onExplore={()=>onNotify(`${page==='stays'?'Stay':'Trip'} details for ${place.name} are coming soon.`)}/>)}</div><button className="show-more" onClick={()=>onGo('home')}>Browse all destinations <ArrowRight size={16}/></button></>}<div className="route-bottom"><b>Where would you like to go next?</b><button onClick={()=>onGo('home')}>Back to explore <ArrowRight size={15}/></button></div></section>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
