import laundryImg from '../assets/services/laundry.png'
import dryCleaningImg from '../assets/services/dry_cleaning.png'
import washFoldImg from '../assets/services/wash_fold.png'
import washIronImg from '../assets/services/wash_iron.png'
import steamPressingImg from '../assets/services/steam_pressing.png'
import shoeImg from '../assets/services/shoe_care.png'
import bagImg from '../assets/services/bag_care.png'
import carpetImg from '../assets/services/carpet_cleaning.png'
import curtainImg from '../assets/services/curtain_cleaning.png'
import mattressImg from '../assets/services/mattress_cleaning.png'
import toyImg from '../assets/services/toy_cleaning.png'
import strollerImg from '../assets/services/stroller_cleaning.png'
import babyCarSeatImg from '../assets/services/baby_car_seat.png'
import commercialLaundryImg from '../assets/services/commercial_laundry.png'
import officeRoutineIcon from '../assets/icons/office_routine.svg'
import monsoonSpecialIcon from '../assets/icons/monsoon_specials.svg'
import festivalCampaignIcon from '../assets/icons/festival_campaigns.svg'

import laundryBefore from '../assets/before-after/Laundry_before.png'
import laundryAfter from '../assets/before-after/Laundry_after.png'
import dryBefore from '../assets/before-after/Drycleaning_before.png'
import dryAfter from '../assets/before-after/Drycleaning_after.png'
import washFoldBefore from '../assets/before-after/washfold_before.png'
import washFoldAfter from '../assets/before-after/washfold_after.png'
import washIronBefore from '../assets/before-after/washiron_before.png'
import washIronAfter from '../assets/before-after/washiron_after.png'
import steamBefore from '../assets/before-after/Steampress_before.png'
import steamAfter from '../assets/before-after/Steampress_after.png'
import shoeBefore from '../assets/before-after/shoecare_before.png'
import shoeAfter from '../assets/before-after/shoecare_after.png'
import bagBefore from '../assets/before-after/bagcare_before.png'
import bagAfter from '../assets/before-after/bagcare_after.png'
import carpetBefore from '../assets/before-after/carpet_before.png'
import carpetAfter from '../assets/before-after/carpet_after.png'
import curtainBefore from '../assets/before-after/curtain_before.png'
import curtainAfter from '../assets/before-after/curtain_after.png'
import mattressBefore from '../assets/before-after/mattress_before.png'
import mattressAfter from '../assets/before-after/mattress_after.png'
import toyBefore from '../assets/before-after/toy_before.png'
import toyAfter from '../assets/before-after/toy_after.png'
import strollerBefore from '../assets/before-after/stroller_before.png'
import strollerAfter from '../assets/before-after/stroller_after.png'
import babyCarBefore from '../assets/before-after/babycar_before.png'
import babyCarAfter from '../assets/before-after/babycar_after.png'
// Carousel before/after images (combined before+after in each image)
import dryC1 from '../assets/ba-carousel/dry-cleaning-1.png'
import dryC2 from '../assets/ba-carousel/dry-cleaning-2.png'
import dryC3 from '../assets/ba-carousel/dry-cleaning-3.png'
import dryC4 from '../assets/ba-carousel/dry-cleaning-4.png'
import shoeC1 from '../assets/ba-carousel/shoe-care-1.png'
import shoeC2 from '../assets/ba-carousel/shoe-care-2.png'
import shoeC3 from '../assets/ba-carousel/shoe-care-3.png'
import shoeC4 from '../assets/ba-carousel/shoe-care-4.png'
import curtainC1 from '../assets/ba-carousel/curtain-cleaning-1.png'
import curtainC2 from '../assets/ba-carousel/curtain-cleaning-2.png'
import curtainC3 from '../assets/ba-carousel/curtain-cleaning-3.png'
import curtainC4 from '../assets/ba-carousel/curtain-cleaning-4.png'
import bagC1 from '../assets/ba-carousel/bag-care-1.png'
import bagC2 from '../assets/ba-carousel/bag-care-2.png'
import bagC3 from '../assets/ba-carousel/bag-care-3.png'
import bagC4 from '../assets/ba-carousel/bag-care-4.png'
import carpetC1 from '../assets/ba-carousel/carpet-cleaning-1.png'
import carpetC2 from '../assets/ba-carousel/carpet-cleaning-2.png'
import carpetC3 from '../assets/ba-carousel/carpet-cleaning-3.png'
import carpetC4 from '../assets/ba-carousel/carpet-cleaning-4.png'
import mattressC1 from '../assets/ba-carousel/mattress-cleaning-1.png'
import mattressC2 from '../assets/ba-carousel/mattress-cleaning-2.png'
import mattressC3 from '../assets/ba-carousel/mattress-cleaning-3.png'
import mattressC4 from '../assets/ba-carousel/mattress-cleaning-4.png'
import toyC1 from '../assets/ba-carousel/toy-baby-1.png'
import toyC2 from '../assets/ba-carousel/toy-baby-2.png'
import toyC3 from '../assets/ba-carousel/toy-baby-3.png'
import toyC4 from '../assets/ba-carousel/toy-baby-4.png'
import washIronC1 from '../assets/ba-carousel/wash-iron-1.png'
import washIronC2 from '../assets/ba-carousel/wash-iron-2.png'
import washIronC3 from '../assets/ba-carousel/wash-iron-3.png'
import washIronC4 from '../assets/ba-carousel/wash-iron-4.png'
import washFoldC1 from '../assets/ba-carousel/wash-fold-1.png'
import washFoldC2 from '../assets/ba-carousel/wash-fold-2.png'
import washFoldC3 from '../assets/ba-carousel/wash-fold-3.png'
import washFoldC4 from '../assets/ba-carousel/wash-fold-4.png'
import steamC1 from '../assets/ba-carousel/steam-pressing-1.png'
import steamC2 from '../assets/ba-carousel/steam-pressing-2.png'
import steamC3 from '../assets/ba-carousel/steam-pressing-3.png'
import steamC4 from '../assets/ba-carousel/steam-pressing-4.png'
import commC1 from '../assets/ba-carousel/commercial-laundry-1.png'
import commC2 from '../assets/ba-carousel/commercial-laundry-2.png'

// ── Pricing category data ─────────────────────────────────────────────────
// Single source of truth — referenced by individual service pages AND the
// Pricing page accordion. Update here once; both pages stay in sync.

export const dryCleaningCategories = [
  {
    label: "MEN'S WEAR",
    items: [
      { label: 'Shirt', price: 'INR 175 / piece' },
      { label: 'T-Shirt', price: 'INR 150 / piece' },
      { label: 'Trouser/Pants', price: 'INR 175 / piece' },
      { label: 'Jeans/Cargo', price: 'INR 175 / piece' },
      { label: 'Sports Top/Pullover', price: 'INR 300 / piece' },
      { label: 'Sports Bottoms', price: 'INR 150 / piece' },
      { label: 'Shorts/Half Pants', price: 'INR 100 / piece' },
      { label: 'Dhoti/Lungi', price: 'INR 150 / piece' },
      { label: 'Suit (2pc)', price: 'INR 500 / 2pc' },
      { label: 'Suit (3pc)', price: 'INR 650 / 3pc' },
      { label: 'Blazer', price: 'INR 380 / piece' },
      { label: 'Kurta Regular', price: 'INR 200 / piece' },
      { label: 'Kurta Heavy Work', price: 'INR 250 / piece' },
      { label: 'Sherwani/Achkan', price: 'INR 750 / piece' },
      { label: 'Pyjama/Salwar/Chudidar', price: 'INR 150 / piece' },
      { label: 'Night Suits', price: 'INR 300 / pair' },
      { label: 'Co-ord Set', price: 'INR 300 / pair' },
    ]
  },
  {
    label: "WOMEN'S WEAR",
    items: [
      { label: 'Blouse/Choli', price: 'INR 140 / piece' },
      { label: 'Blouse/Choli Heavy Work', price: 'INR 220 / piece' },
      { label: 'Dress/Gown', price: 'INR 380 / piece' },
      { label: 'Dress/Gown Heavy Work', price: 'INR 775 / piece' },
      { label: 'Dupatta/Scarf/Stole', price: 'INR 120 / piece' },
      { label: 'Dupatta/Scarf/Stole Heavy Work', price: 'INR 200 / piece' },
      { label: 'Dupatta/Scarf/Stole Wedding', price: 'INR 325 / piece' },
      { label: 'Burkha/Abaya', price: 'INR 200 / piece' },
      { label: 'Skirt (Short)', price: 'INR 200 / piece' },
      { label: 'Skirt (Long)', price: 'INR 350 / piece' },
      { label: 'Suit Skirt (2pc)', price: 'INR 450 / 2pc' },
      { label: 'Suit Skirt (3pc)', price: 'INR 650 / 3pc' },
      { label: 'Top/Kameez', price: 'INR 175 / piece' },
      { label: 'Kurta Regular', price: 'INR 200 / piece' },
      { label: 'Kurta Heavy Work', price: 'INR 300 / piece' },
      { label: 'Pyjama/Pants/Chudidar', price: 'INR 150 / piece' },
      { label: 'Salwar/Patiala/Plazzo', price: 'INR 200 / piece' },
      { label: 'Lehenga/Gaghra Regular', price: 'INR 675 / piece' },
      { label: 'Lehenga/Gaghra Bridal/Wedding', price: 'INR 900 / piece' },
      { label: 'Saree (Cotton / Synthetic / Light)', price: 'INR 250 / piece' },
      { label: 'Saree (Silk / Chiffon / Georgette)', price: 'INR 350 / piece' },
      { label: 'Saree (Wedding / Designer / Heavy Embroidered)', price: 'INR 900 / piece' },
      { label: 'Night Dress (2pc)', price: 'INR 300 / 2pc' },
      { label: 'Jump Suits', price: 'INR 350 / piece' },
      { label: 'Co-ord Set', price: 'INR 300 / 2pc' },
    ]
  },
  {
    label: 'WINTER & OUTERWEAR',
    items: [
      { label: 'Jacket Half Sleeves', price: 'INR 300 / piece' },
      { label: 'Jacket Full Sleeves', price: 'INR 400 / piece' },
      { label: 'Leather Jacket', price: 'INR 850 / piece' },
      { label: 'Over Coat/Long Coat', price: 'INR 550 / piece' },
      { label: 'Sweat Shirt/Warm Hoodie', price: 'INR 350 / piece' },
      { label: 'Sweat Pants', price: 'INR 175 / piece' },
      { label: 'Shawal/Woolen Stole', price: 'INR 300 / piece' },
      { label: 'Sweater/Cardigans', price: 'INR 325 / piece' },
      { label: 'Gloves Woolen', price: 'INR 120 / pair' },
      { label: 'Thermals', price: 'INR 250 / pair' },
      { label: 'Waist Coat/Nehru Jacket', price: 'INR 280 / piece' },
      { label: 'Lab Coat', price: 'INR 220 / piece' },
    ]
  },
  {
    label: "BABY & KID'S WEAR",
    items: [
      { label: 'Baby Suit (2pc)', price: 'INR 350 / 2pc' },
      { label: 'Baby Suit (3pc)', price: 'INR 400 / 3pc' },
      { label: 'Baby Kurta', price: 'INR 150 / piece' },
      { label: 'Pyjama/Salwar/Chudidar', price: 'INR 120 / piece' },
      { label: 'Baby Shirt / T-Shirt', price: 'INR 120 / piece' },
      { label: 'Baby Trouser', price: 'INR 120 / piece' },
      { label: 'Baby Shorts', price: 'INR 90 / piece' },
      { label: 'Frock', price: 'INR 250 / piece' },
    ]
  },
  {
    label: 'ACCESSORIES',
    items: [
      { label: 'Tie', price: 'INR 120 / piece' },
      { label: 'Tie Bow', price: 'INR 100 / piece' },
      { label: 'Cap', price: 'INR 150 / piece' },
      { label: 'Handkerchief', price: 'INR 50 / piece' },
      { label: 'Gloves', price: 'INR 100 / pair' },
      { label: 'Socks', price: 'INR 100 / piece' },
      { label: 'Belt', price: 'INR 150 / piece' },
    ]
  },
]

export const washIronCategories = [
  {
    label: 'EVERYDAY CLOTHES',
    items: [
      { label: 'Everyday cloths like Shirt/T-Shirt/Jeans/Trouser/Top/Bottom', price: 'INR 199 / kg' },
    ]
  },
]

export const washFoldCategories = [
  {
    label: 'EVERYDAY CLOTHES',
    items: [
      { label: 'Everyday cloths like Shirt/T-Shirt/Jeans/Trouser/Top/Bottom', price: 'INR 149 / kg' },
    ]
  },
]

export const steamPressingCategories = [
  {
    label: "MEN'S WEAR",
    items: [
      { label: 'Regular Shirt / T-Shirt / Sports Top / Pullover', price: 'INR 35 / piece' },
      { label: 'Trouser/Pants/Jeans/Cargo/Sports Bottom/Shorts', price: 'INR 35 / piece' },
      { label: 'Sherwani/Achkan', price: 'INR 200 / piece' },
      { label: 'Lungi', price: 'INR 50 / piece' },
      { label: 'Suit (2pc)', price: 'INR 200 / 2pc' },
      { label: 'Suit (3pc)', price: 'INR 240 / 3pc' },
      { label: 'Blazer', price: 'INR 150 / piece' },
      { label: 'Kurta', price: 'INR 45 / piece' },
      { label: 'Pyjama/Salwar/Chudidar', price: 'INR 35 / piece' },
      { label: 'Night Suits', price: 'INR 70 / pair' },
      { label: 'Co-ord Set', price: 'INR 70 / pair' },
    ]
  },
  {
    label: "WOMEN'S WEAR",
    items: [
      { label: 'Blouse/Choli', price: 'INR 30 / piece' },
      { label: 'Blouse/Choli Heavy Work', price: 'INR 70 / piece' },
      { label: 'Dress/Gown', price: 'INR 150 / piece' },
      { label: 'Dress/Gown Heavy Work', price: 'INR 200 / piece' },
      { label: 'Dupatta/Scarf/Stole', price: 'INR 40 / piece' },
      { label: 'Dupatta/Scarf/Stole Heavy Work', price: 'INR 70 / piece' },
      { label: 'Dupatta/Scarf/Stole Wedding', price: 'INR 80 / piece' },
      { label: 'Burkha/Abaya', price: 'INR 150 / piece' },
      { label: 'Skirt (Short)', price: 'INR 60 / piece' },
      { label: 'Skirt (Long)', price: 'INR 100 / piece' },
      { label: 'Suit Skirt (2pc)', price: 'INR 200 / 2pc' },
      { label: 'Suit Skirt (3pc)', price: 'INR 240 / 3pc' },
      { label: 'Top/Kameez', price: 'INR 35 / piece' },
      { label: 'Kurta Regular', price: 'INR 45 / piece' },
      { label: 'Kurta Heavy Work', price: 'INR 70 / piece' },
      { label: 'Pyjama/Pants/Chudidar', price: 'INR 35 / piece' },
      { label: 'Salwar/Patiala/Plazzo', price: 'INR 50 / piece' },
      { label: 'Lehenga/Gaghra Regular', price: 'INR 100 / piece' },
      { label: 'Lehenga/Gaghra Bridal/Wedding', price: 'INR 150 / piece' },
      { label: 'Saree (Cotton / Synthetic / Light)', price: 'INR 120 / piece' },
      { label: 'Saree (Silk / Chiffon / Georgette)', price: 'INR 140 / piece' },
      { label: 'Saree (Wedding / Designer / Heavy Embroidered)', price: 'INR 200 / piece' },
      { label: 'Night Dress (2pc)', price: 'INR 80 / 2pc' },
      { label: 'Jump Suits', price: 'INR 80 / piece' },
      { label: 'Co-ord Set', price: 'INR 80 / 2pc' },
    ]
  },
  {
    label: "BABY & KID'S WEAR",
    items: [
      { label: 'Baby Suit (2pc)', price: 'INR 150 / 2pc' },
      { label: 'Baby Suit (3pc)', price: 'INR 180 / 3pc' },
      { label: 'Baby Kurta', price: 'INR 35 / piece' },
      { label: 'Pyjama/Salwar/Chudidar', price: 'INR 30 / piece' },
      { label: 'Baby Shirt / T-Shirt', price: 'INR 35 / piece' },
      { label: 'Baby Trouser', price: 'INR 35 / piece' },
      { label: 'Baby Shorts', price: 'INR 30 / piece' },
      { label: 'Frock', price: 'INR 50 / piece' },
    ]
  },
  {
    label: 'WINTER & OUTERWEAR',
    items: [
      { label: 'Jacket Half Sleeves', price: 'INR 120 / piece' },
      { label: 'Jacket Full Sleeves', price: 'INR 150 / piece' },
      { label: 'Over Coat/Long Coat', price: 'INR 200 / piece' },
      { label: 'Sweater/Cardigans', price: 'INR 150 / piece' },
      { label: 'Waist Coat/Nehru Jacket', price: 'INR 120 / piece' },
      { label: 'Sweat Shirt/Warm Hoodie', price: 'INR 120 / piece' },
      { label: 'Sweat Pants', price: 'INR 100 / piece' },
    ]
  },
  {
    label: 'HOME FABRIC',
    items: [
      { label: 'Bed Sheet Single', price: 'INR 80 / piece' },
      { label: 'Bed Sheet Double', price: 'INR 120 / piece' },
      { label: 'Pillow Cover', price: 'INR 35 / piece' },
      { label: 'Cushion Cover', price: 'INR 35 / piece' },
      { label: 'Curtains', price: 'INR 120 / piece' },
    ]
  },
]

export const carpetCategories = [
  {
    label: 'RUGS & MATS',
    items: [
      { label: 'Everyday & Patterned Rugs/Mats', price: 'INR 45 / sqft' },
      { label: 'Textured & Natural Rugs/Mats', price: 'INR 50 / sqft' },
      { label: 'Premium & Delicate Rugs/Mats', price: 'INR 60 / sqft' },
      { label: 'Persian Rugs/Mats', price: 'INR 105 / sqft' },
    ]
  },
  {
    label: 'SOFAS & UPHOLSTERY',
    items: [
      { label: 'Ottoman/Pouf', price: 'INR 300 / piece' },
      { label: 'Sofa Cover (1 Seater)', price: 'INR 100 / piece' },
      { label: 'Sofa Cover (2 Seater)', price: 'INR 180 / piece' },
      { label: 'Sofa Cover (3 Seater)', price: 'INR 270 / piece' },
      { label: 'Sofa Throws', price: 'INR 250 / piece' },
    ]
  },
  {
    label: 'HOME TEXTILES',
    items: [
      { label: 'Table Cloth', price: 'INR 150 / piece' },
      { label: 'Table Runner', price: 'INR 100 / piece' },
      { label: 'Door Mat (Max 3×2 Ft.)', price: 'INR 120 / piece' },
    ]
  },
]

export const shoeCategories = [
  {
    label: 'SHOE TYPES',
    items: [
      { label: 'Suede / Nubuck Shoes', price: 'INR 350 / pair' },
      { label: 'Leather Formal Shoes', price: 'INR 350 / pair' },
      { label: 'Sneakers / Sports / Canvas Shoes', price: 'INR 350 / pair' },
      { label: 'High-Top', price: 'INR 450 / pair' },
      { label: 'Heels / Ballies', price: 'INR 250 / pair' },
      { label: 'Kids Shoes', price: 'INR 300 / pair' },
      { label: 'Boots Ankle Length', price: 'INR 450 / pair' },
      { label: 'Boots Mid Length', price: 'INR 600 / pair' },
      { label: 'Boots Knee Length', price: 'INR 800 / pair' },
      { label: 'Sandals / Slippers', price: 'INR 250 / pair' },
    ]
  },
  {
    label: 'ADD-ON SERVICES',
    items: [
      { label: 'Midsole Deoxidation', price: 'INR 400 / pair' },
    ]
  },
]

export const bagCategories = [
  {
    label: 'BAG TYPES',
    items: [
      { label: 'Daily Backpack', price: 'INR 350 / piece' },
      { label: 'Hand Bag / Purse / Wallet', price: 'INR 450 / piece' },
      { label: 'Totes / Sling Bags', price: 'INR 550 / piece' },
      { label: 'Luxury Designer Bags', price: 'INR 850 / piece' },
    ]
  },
]

export const curtainOnlyCategories = [
  {
    label: 'CURTAIN CLEANING',
    items: [
      { label: 'Sheer Curtain', price: 'INR 8 / sqft' },
      { label: 'Normal Curtain Single Ply', price: 'INR 10 / sqft' },
      { label: 'Blackout Curtain Double Ply (with Lining)', price: 'INR 12 / sqft' },
      { label: 'Heavy/Delicate Curtain (with Lining)', price: 'INR 15 / sqft' },
      { label: 'Service Add-On: Remove & Refit', price: 'INR 500 / per job' },
    ]
  },
]

export const beddingAndTowelCategories = [
  {
    label: 'BEDDING & LINENS',
    items: [
      { label: 'Bed Sheet Single', price: 'INR 200 / piece' },
      { label: 'Bed Sheet Double', price: 'INR 325 / piece' },
      { label: 'Bed Spread', price: 'INR 300 / piece' },
      { label: 'Pillow', price: 'INR 250 / piece' },
      { label: 'Pillow Cover', price: 'INR 120 / piece' },
      { label: 'Cushion', price: 'INR 200 / piece' },
      { label: 'Cushion Cover', price: 'INR 100 / piece' },
      { label: 'Quilt/Duvet Cover Single (4×6)', price: 'INR 375 / piece' },
      { label: 'Quilt/Duvet Cover Double (6×6)', price: 'INR 525 / piece' },
      { label: 'Quilt/Duvet Cover XL (Above 6×6)', price: 'INR 675 / piece' },
      { label: 'Comforter/Quilt/Blanket/Duvet Single (4×6)', price: 'INR 175 / piece' },
      { label: 'Comforter/Quilt/Blanket/Duvet Double (6×6)', price: 'INR 275 / piece' },
      { label: 'Comforter/Quilt/Blanket/Duvet XL (Above 6×6)', price: 'INR 375 / piece' },
    ]
  },
  {
    label: 'TOWEL & BATH',
    items: [
      { label: 'BathRobe', price: 'INR 180 / piece' },
      { label: 'Bath Towel', price: 'INR 135 / piece' },
      { label: 'Pool Towel', price: 'INR 150 / piece' },
      { label: 'Hand Towel', price: 'INR 60 / piece' },
      { label: 'Face Towel', price: 'INR 80 / piece' },
      { label: 'Napkin', price: 'INR 50 / piece' },
    ]
  },
]

// Keep combined export for backward compatibility with PricingPage
export const curtainAndHomeFabricCategories = [
  ...curtainOnlyCategories,
  ...beddingAndTowelCategories,
]

export const mattressPricingCategories = [
  {
    label: 'BEDDING & HOME LINENS CARE',
    items: [
      { label: 'Single Mattress', price: 'INR 2760 / piece' },
      { label: 'Double Mattress', price: 'INR 3680 / piece' },
      { label: 'Queen Mattress', price: 'INR 4140 / piece' },
      { label: 'King Mattress', price: 'INR 5060 / piece' },
    ]
  },
]

export const toyCategories = [
  {
    label: 'SOFT TOYS',
    items: [
      { label: 'Stuffed Soft Toy Small (up to 1 ft.)', price: 'INR 225 / piece' },
      { label: 'Stuffed Soft Toy Medium (up to 2 ft.)', price: 'INR 435 / piece' },
      { label: 'Stuffed Soft Toy Large (up to 4 ft.)', price: 'INR 680 / piece' },
      { label: 'Stuffed Soft Toy Extra Large (above 4 ft.)', price: 'INR 850 / piece' },
    ]
  },
  {
    label: 'BABY GEAR',
    items: [
      { label: 'Play Mat / Baby Gym', price: 'INR 450 / piece' },
      { label: 'Playpen / Baby Cot / Pram', price: 'INR 750 / piece' },
      { label: 'Diaper Bag', price: 'INR 200 / piece' },
    ]
  },
]

export const strollerOnlyCategories = [
  {
    label: 'STROLLERS & PRAMS',
    badge: 'Main item prices range from INR 1380 to a maximum of INR 2300 depending on the brand, size, and condition.',
    items: [
      { label: 'Lightweight / Umbrella Stroller', price: 'INR 1380 / piece' },
      { label: 'Standard / Full-Size Stroller', price: 'INR 1610 / piece' },
      { label: 'Pram / Bassinet', note: 'Gentle cleaning for delicate interiors', price: 'INR 1610 / piece' },
      { label: 'Jogging Stroller', price: 'INR 1840 / piece' },
      { label: 'Double / Tandem Stroller', price: 'INR 2300 / piece' },
      { label: 'Travel System Stroller', note: 'Frame + detachable car seat', price: 'INR 2300 / piece' },
    ]
  },
  {
    label: 'OTHER BABY GEAR',
    items: [
      { label: 'High Chair', price: 'INR 1380 / piece' },
      { label: 'Baby Cot / Playpen', price: 'INR 1840 / piece' },
    ]
  },
  {
    label: 'ACCESSORIES & SPECIAL TREATMENTS',
    items: [
      { label: 'Stroller Accessories', note: 'Cup holders, snack trays, toy bars', price: 'From INR 345' },
      { label: 'Fabric Add-ons & Bases', note: 'Rain covers, foot-muffs, separate car seat bases', price: 'From INR 690' },
      { label: 'Biohazard / Mold Treatment', note: 'Heavy soiling or severe mold', price: '+ INR 690' },
    ]
  },
]

export const carSeatOnlyCategories = [
  {
    label: 'BABY CAR SEATS',
    items: [
      { label: 'Booster Seat', note: 'Backless or High-Back', price: 'INR 1380 / piece' },
      { label: 'Infant Car Seat (Carrier)', price: 'INR 1380 / piece' },
      { label: 'Convertible Car Seat', price: 'INR 1610 / piece' },
      { label: 'All-in-One Car Seat', note: 'Heavy padding', price: 'INR 1840 / piece' },
    ]
  },
]

export const commercialLaundryCategories = [
  {
    label: 'CUSTOM PRICING',
    items: [
      { label: 'Pricing is tailored to your volume and requirements', price: 'Contact Us' },
    ]
  },
]

// ── Services ──────────────────────────────────────────────────────────────

export const services = [
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    description: 'Expert dry cleaning for delicate fabrics and premium garments.',
    price: 'INR 50/piece',
    icon: '🧥',
    image: dryCleaningImg,
    color: '#F0FDF4',
    accent: '#16A34A',
    heroImage: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=1200&q=80',
    beforeImg: dryBefore,
    afterImg: dryAfter,
    carouselImages: [dryC1, dryC2, dryC3, dryC4],
    longDesc: 'State-of-the-art dry cleaning for suits, gowns, silk, wool, and other delicate fabrics. Our certified experts ensure fabric integrity and brilliant results.',
    benefits: ['Safe for all delicate fabrics', 'Stain removal expertise', 'Shape preservation', 'Expert finishing & pressing', 'Garment protection bags'],
    process: [
      { title: 'Booking',        desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',    desc: 'Secure and prompt collection.' },
      { title: 'Inspection',     desc: 'Checking care labels & integrity.' },
      { title: 'Pre-Treatment',  desc: 'Targeted stain loosening.' },
      { title: 'Solvent Bath',   desc: 'Eco-friendly dry cleaning.' },
      { title: 'Steam Finish',   desc: 'Restoring crispness & shape.' },
      { title: 'Packaging',      desc: 'Sealed perfectly on hangers.' },
      { title: 'Delivery',       desc: 'Fresh garments delivered.' },
    ],
    pricingCategories: dryCleaningCategories,
  },
  {
    id: 'shoe-care',
    title: 'Shoe Care',
    description: 'Deep cleaning, restoration and polishing for all types of footwear.',
    price: 'INR 250/pair',
    icon: '👟',
    image: shoeImg,
    color: '#FFF1F2',
    accent: '#E11D48',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    beforeImg: shoeBefore,
    afterImg: shoeAfter,
    carouselImages: [shoeC1, shoeC2, shoeC3, shoeC4],
    longDesc: 'Expert shoe cleaning and restoration for sneakers, leather shoes, heels, boots and more. We bring your footwear back to life using premium care products.',
    benefits: ['All shoe types accepted', 'Sole & upper deep clean', 'Deodorizing treatment', 'Color restoration', 'Premium conditioning & polish'],
    process: [
      { title: 'Booking',             desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',         desc: 'Secure collection of footwear.' },
      { title: 'Material Assessment', desc: 'Identifying leather, suede, or canvas.' },
      { title: 'Prep Work',           desc: 'Removal of laces and insoles.' },
      { title: 'Sole Scrub',          desc: 'High-friction brushing for mud/grime.' },
      { title: 'Upper Treatment',     desc: 'Hand-brushing delicate materials.' },
      { title: 'Deodorizing',         desc: 'Antibacterial spray treatment.' },
      { title: 'Condition & Polish',  desc: 'Restoring shine and suppleness.' },
      { title: 'Delivery',            desc: 'Ready-to-wear shoes delivered.' },
    ],
    pricingCategories: shoeCategories,
  },
  {
    id: 'curtain-cleaning',
    title: 'Curtain Cleaning',
    description: 'On-rail or removed curtain cleaning for fresh, bright results.',
    price: 'INR 8/sqft',
    icon: '🪟',
    image: curtainImg,
    color: '#FDF4FF',
    accent: '#7C3AED',
    heroImage: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80',
    beforeImg: curtainBefore,
    afterImg: curtainAfter,
    carouselImages: [curtainC1, curtainC2, curtainC3, curtainC4],
    longDesc: 'Specialized curtain cleaning, we collect, deep-clean every fabric type, and return them fresh to your door. We handle all fabric types, blackout curtains, sheers, and heavy drapes.',
    benefits: ['All Fabric Types', 'Remove and Refit Service', 'Onsite Pleats Ironing Option', 'Dust & Allergen Removal', 'Increase Shine & Brightness'],
    process: [
      { title: 'Booking',         desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Expert Removal',  desc: 'Safe unmounting of your curtains.' },
      { title: 'Fabric Analysis', desc: 'Determining the ideal wash method.' },
      { title: 'Dust Extraction', desc: 'Industrial vacuuming to remove allergens.' },
      { title: 'Deep Wash',       desc: 'Specialized dry or wet wash.' },
      { title: 'Steam Press',     desc: 'Pressing to set crisp pleats.' },
      { title: 'Delivery',        desc: 'Fresh drapes delivered home.' },
      { title: 'Original Refit',  desc: 'Curtains hung back perfectly.' },
    ],
    pricingCategories: curtainOnlyCategories,
  },
  {
    id: 'bag-care',
    title: 'Leather & Bags Care',
    description: 'Luxury and everyday bag cleaning, conditioning and restoration.',
    price: 'INR 350/bag',
    icon: '👜',
    image: bagImg,
    color: '#FFFBEB',
    accent: '#D97706',
    heroImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80',
    beforeImg: bagBefore,
    afterImg: bagAfter,
    carouselImages: [bagC1, bagC2, bagC3, bagC4],
    longDesc: 'Professional cleaning and conditioning for handbags, backpacks, travel bags, and luxury accessories. We protect and restore your investment.',
    benefits: ['Leather & fabric bags', 'Interior deep cleaning', '3-5 Days Turnaround', 'Stain & odor removal', 'Protective conditioning'],
    process: [
      { title: 'Booking',            desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',        desc: 'Valet arrives for secure collection.' },
      { title: 'Assessment',         desc: 'Documenting condition & hardware.' },
      { title: 'Delicate Dusting',   desc: 'Air-brushing surface debris safely.' },
      { title: 'Stain Extraction',   desc: 'Specialized leather safe cleaners.' },
      { title: 'Deep Conditioning',  desc: 'Restoring vital moisture.' },
      { title: 'Hardware Polish',    desc: 'Shine zippers, buckles & clasps.' },
      { title: 'Shape Preservation', desc: 'Interior padding & tissue wrap.' },
      { title: 'Delivery',           desc: 'Luxury items returned pristine.' },
    ],
    pricingCategories: bagCategories,
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet & Sofa Care',
    description: 'Expert carpet deep cleaning with powerful stain removal technology.',
    price: 'INR 45/sqft',
    icon: '🔲',
    image: carpetImg,
    color: '#EFF6FF',
    accent: '#2563EB',
    heroImage: 'https://images.unsplash.com/photo-1558618047-f4e80b5dbb7c?w=1200&q=80',
    beforeImg: carpetBefore,
    afterImg: carpetAfter,
    carouselImages: [carpetC1, carpetC2, carpetC3, carpetC4],
    longDesc: 'Industrial-grade carpet & Sofa cleaning for homes and businesses. We handle all sizes and materials — Persian rugs, wall-to-wall carpets, runners, Sofa cover, Ottoman and more.',
    benefits: ['All carpet types & sizes', 'Powerful stain extraction', 'Anti-bacterial treatment', 'Persian & oriental rug care', 'Fast-dry formula'],
    process: [
      { title: 'Booking',       desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Inspection',    desc: 'Evaluation for expected cleaning possibility.' },
      { title: 'Dry Vacuuming', desc: 'To remove dirt and pet hairs.' },
      { title: 'Pre-Spray',     desc: 'Cleansing agent applied on tough stains.' },
      { title: 'Shampooing',    desc: 'Organic chemicals for foamy cleaning.' },
      { title: 'Conditioning',  desc: 'Softens the furs of carpets post cleaning.' },
      { title: 'Speed Dry',     desc: 'High velocity air movers for faster drying.' },
      { title: 'Packaging',     desc: 'Rolled securely in protective layers.' },
      { title: 'Delivery',      desc: 'Placed exactly where you need it.' },
    ],
    pricingCategories: carpetCategories,
  },
  {
    id: 'mattress-cleaning',
    title: 'Bedding & Home Linens Care',
    description: 'Deep sanitization and stain removal for a healthier sleep.',
    price: 'INR 2760/mattress',
    icon: '🛏️',
    image: mattressImg,
    color: '#FFF7ED',
    accent: '#C2410C',
    heroImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    beforeImg: mattressBefore,
    afterImg: mattressAfter,
    carouselImages: [mattressC1, mattressC2, mattressC3, mattressC4],
    longDesc: 'Professionally sanitized and deep steam cleaning to eliminate dust mites, bacteria, and allergens from your Beddings, Home Linens, Quilts, Towels & More. Wake up healthier every day.',
    benefits: ['Professionally Sanitized', 'Dust mite elimination', 'Stain & odor removal', 'Allergen reduction', 'Child & pet safe products'],
    process: [
      { title: 'Booking',          desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',      desc: 'Bulk collection of heavy linens.' },
      { title: 'Mite Treatment',   desc: 'Specialized hygienic pre-wash.' },
      { title: 'Deep Sanitize',    desc: 'High-temperature wash cycle.' },
      { title: 'Fabric Softening', desc: 'Conditioner for a cozy feel.' },
      { title: 'Flat Ironing',     desc: 'Commercial rollers for hotel finish.' },
      { title: 'Packaging',        desc: 'Air-tight folding for freshness.' },
      { title: 'Delivery',         desc: 'Fresh linens delivered to door.' },
    ],
    pricingCategories: [...mattressPricingCategories, ...beddingAndTowelCategories],
  },
  {
    id: 'toy-cleaning',
    title: 'Toy & Baby Care',
    description: 'Safe, thorough sanitization of soft toys, plastic toys and playsets.',
    price: 'INR 200/item',
    icon: '🧸',
    image: toyImg,
    color: '#FFF7ED',
    accent: '#F59E0B',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    beforeImg: toyBefore,
    afterImg: toyAfter,
    carouselImages: [toyC1, toyC2, toyC3, toyC4],
    longDesc: "Is your child's favorite toy or stroller really as clean as you think? We offer professional deep-cleaning and sanitization for prams, pushchairs, and plushies—thoroughly treating frames, fabrics, straps, and soft toys with 100% baby-safe, non-toxic products. Send us a photo on WhatsApp today for an instant quote!",
    benefits: ['Child-safe, non-toxic products', 'Deep sanitization & deodorizing', 'Soft toy hand wash & dry', 'Plastic & hard toy disinfection', 'Allergen & bacteria removal'],
    process: [
      { title: 'Booking',              desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',          desc: 'Safe collection of delicate items.' },
      { title: 'Safety Check',         desc: 'Checking for electronics or loose parts.' },
      { title: 'Hypoallergenic Prep',  desc: '100% mild, non-toxic baby detergents.' },
      { title: 'Gentle Wash',          desc: 'Ultra-soft cycles to protect structures.' },
      { title: 'UV Sanitization',      desc: 'Eliminate bacteria and allergens.' },
      { title: 'Soft Dry',             desc: 'Gentle drying to ensure fluffiness.' },
      { title: 'Packaging',            desc: 'Sealed in eco-friendly packaging.' },
      { title: 'Delivery',             desc: 'Safely returned to your home.' },
    ],
    pricingCategories: toyCategories,
  },
  {
    id: 'wash-iron',
    title: 'Wash & Iron',
    description: 'Perfectly washed and professionally ironed garments every time.',
    price: 'INR 199/kg',
    icon: '👔',
    image: washIronImg,
    color: '#FDF4FF',
    accent: '#9333EA',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    beforeImg: washIronBefore,
    afterImg: washIronAfter,
    carouselImages: [washIronC1, washIronC2, washIronC3, washIronC4],
    longDesc: 'Get your clothes washed and crisply ironed by our professional team. Ideal for office wear, school uniforms, and everyday outfits.',
    benefits: ['Crease-free finish', 'Professional steam ironing', 'Collar & cuff attention', 'Hang or fold as preferred', 'Priced by weight'],
    process: [
      { title: 'Booking',        desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',    desc: 'Convenient doorstep collection.' },
      { title: 'Color Sorting',  desc: 'Preventing color bleeding.' },
      { title: 'Temp Control',   desc: 'Optimal cycles based on fabric.' },
      { title: 'Conditioning',   desc: 'Fabric softening for a premium feel.' },
      { title: 'Gentle Drying',  desc: 'Controlled to prevent shrinkage.' },
      { title: 'Pro Pressing',   desc: 'Meticulous ironing & wrinkle removal.' },
      { title: 'Packaging',      desc: 'Hung or folded perfectly.' },
      { title: 'Delivery',       desc: 'Ready for your wardrobe.' },
    ],
    pricingCategories: washIronCategories,
  },
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    description: 'Bulk laundry by weight — washed, dried, and neatly folded.',
    price: 'INR 149/kg',
    icon: '🧺',
    image: washFoldImg,
    color: '#FFF7ED',
    accent: '#EA580C',
    heroImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=80',
    beforeImg: washFoldBefore,
    afterImg: washFoldAfter,
    carouselImages: [washFoldC1, washFoldC2, washFoldC3, washFoldC4],
    longDesc: 'Perfect for busy households and individuals. Drop off or schedule a pickup, and we handle all your regular laundry — washed, dried, and folded.',
    benefits: ['Priced by weight', 'Same-day option available', 'Neatly folded & packed', 'Separate delicates handling', 'Family bundle discounts'],
    process: [
      { title: 'Booking',          desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',      desc: 'Convenient doorstep collection.' },
      { title: 'Sorting',          desc: 'Separation by color and fabric weight.' },
      { title: 'Deep Clean',       desc: 'Washing with high-quality detergents.' },
      { title: 'Sanitization',     desc: 'Hygienic freshness for everyday wear.' },
      { title: 'Perfect Dry',      desc: 'Moisture-controlled drying cycles.' },
      { title: 'Precision Fold',   desc: 'Retail-style folding for easy stacking.' },
      { title: 'Packed Like New',  desc: 'Neatly bundled in pristine packaging.' },
      { title: 'Delivery',         desc: 'Delivered straight back to you.' },
    ],
    pricingCategories: washFoldCategories,
  },
  {
    id: 'steam-pressing',
    title: 'Steam Pressing',
    description: 'Professional steam pressing for crisp, crease-free garments every time.',
    price: 'INR 30/piece',
    icon: '🧷',
    image: steamPressingImg,
    color: '#EFF6FF',
    accent: '#1F5FFF',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    beforeImg: steamBefore,
    afterImg: steamAfter,
    carouselImages: [steamC1, steamC2, steamC3, steamC4],
    longDesc: 'Our professional steam pressing service delivers perfectly pressed, crease-free garments using industrial steam equipment. Ideal for office wear, formal attire, and everyday clothes.',
    benefits: ['Industrial steam equipment', 'Crease-free finish guaranteed', 'Collar & cuff precision', 'Shape & fabric preserved', 'Same-day turnaround available'],
    process: [
      { title: 'Booking',          desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',      desc: 'Wrinkled garments collected.' },
      { title: 'Prep Check',       desc: 'Heat sensitivity inspection.' },
      { title: 'Wrinkle Release',  desc: 'High-pressure industrial steam.' },
      { title: 'Seam Setting',     desc: 'Establishing sharp creases.' },
      { title: 'Cooling',          desc: 'Allowing fabric to set shape.' },
      { title: 'Packaging',        desc: 'Immediate hanging to prevent creases.' },
      { title: 'Delivery',         desc: 'Perfectly pressed garments delivered.' },
    ],
    pricingCategories: steamPressingCategories,
  },
  {
    id: 'commercial-laundry',
    title: 'Commercial Laundry',
    description: 'High-volume laundry solutions for hotels, restaurants, spas, and businesses.',
    price: 'Custom Pricing',
    icon: '🏨',
    image: commercialLaundryImg,
    color: '#F0FDF4',
    accent: '#0F766E',
    heroImage: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&q=80',
    beforeImg: laundryBefore,
    afterImg: laundryAfter,
    carouselImages: [commC1, commC2],
    longDesc: 'End-to-end commercial laundry services tailored for businesses. We handle bulk linen, uniforms, towels, and workwear with industrial-grade equipment and strict hygiene standards.',
    benefits: ['Bulk volume handling', 'Consolidated Invoicing', 'Scheduled pickup & delivery', 'Hygiene-certified processes', 'Custom SLA agreements'],
    process: [
      { title: 'Booking',             desc: 'Via WhatsApp, Call, App, or B2B Contract.' },
      { title: 'Bulk Pickup',         desc: 'Scheduled collection for businesses.' },
      { title: 'Industrial Sorting',  desc: 'Categorizing by material and soil.' },
      { title: 'Heavy-Duty Wash',     desc: 'Robust sanitization with industrial machines.' },
      { title: 'Stain Extraction',    desc: 'Aggressive treatment for heavy stains.' },
      { title: 'Hi-Speed Press',      desc: 'Rapid flatwork ironers for volume.' },
      { title: 'Tracking',            desc: 'Accurate inventory counting.' },
      { title: 'Packaging',           desc: 'Bundled and mapped to departments.' },
      { title: 'Delivery',            desc: 'Scheduled delivery to premises.' },
    ],
    pricingCategories: commercialLaundryCategories,
  },
  {
    id: 'stroller-cleaning',
    title: 'Stroller Cleaning',
    description: 'Deep cleaning and sanitization of baby strollers and prams.',
    price: 'INR 1380/stroller',
    icon: '🛒',
    image: strollerImg,
    color: '#EFF6FF',
    accent: '#3B82F6',
    heroImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=80',
    beforeImg: strollerBefore,
    afterImg: strollerAfter,
    carouselImages: [toyC1, toyC2, toyC3, toyC4],
    longDesc: 'Professional deep cleaning and sanitization of baby strollers and prams using child-safe, non-toxic products. We clean every corner, fabric, and frame to keep your baby safe.',
    benefits: ['Child-safe, non-toxic products', 'Full frame & wheel cleaning', 'Fabric seat deep wash', 'Mold & bacteria removal', 'Quick-dry finish'],
    process: [
      { title: 'Booking',              desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',          desc: 'Safe collection of delicate items.' },
      { title: 'Safety Check',         desc: 'Checking for electronics or loose parts.' },
      { title: 'Hypoallergenic Prep',  desc: '100% mild, non-toxic baby detergents.' },
      { title: 'Gentle Wash',          desc: 'Ultra-soft cycles to protect structures.' },
      { title: 'UV Sanitization',      desc: 'Eliminate bacteria and allergens.' },
      { title: 'Soft Dry',             desc: 'Gentle drying to ensure fluffiness.' },
      { title: 'Packaging',            desc: 'Sealed in eco-friendly packaging.' },
      { title: 'Delivery',             desc: 'Safely returned to your home.' },
    ],
    pricingCategories: strollerOnlyCategories,
  },
  {
    id: 'baby-car-seat',
    title: 'Baby Car Seat',
    description: 'Thorough cleaning and sanitization of baby and child car seats.',
    price: 'INR 1380/seat',
    icon: '🪑',
    image: babyCarSeatImg,
    color: '#F0FDF4',
    accent: '#16A34A',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    beforeImg: babyCarBefore,
    afterImg: babyCarAfter,
    carouselImages: [toyC1, toyC2, toyC3, toyC4],
    longDesc: 'Expert cleaning and sanitization of infant and child car seats. We remove all stains, odors, and bacteria using child-safe products, ensuring a safe and hygienic ride for your little one.',
    benefits: ['Child-safe, non-toxic products', 'Harness & buckle cleaning', 'Deep fabric extraction', 'Odor & stain removal', 'Full reassembly included'],
    process: [
      { title: 'Booking',              desc: 'Schedule via WhatsApp, Call or App.' },
      { title: 'Home Pickup',          desc: 'Safe collection of delicate items.' },
      { title: 'Safety Check',         desc: 'Checking for electronics or loose parts.' },
      { title: 'Hypoallergenic Prep',  desc: '100% mild, non-toxic baby detergents.' },
      { title: 'Gentle Wash',          desc: 'Ultra-soft cycles to protect structures.' },
      { title: 'UV Sanitization',      desc: 'Eliminate bacteria and allergens.' },
      { title: 'Soft Dry',             desc: 'Gentle drying to ensure fluffiness.' },
      { title: 'Packaging',            desc: 'Sealed in eco-friendly packaging.' },
      { title: 'Delivery',             desc: 'Safely returned to your home.' },
    ],
    pricingCategories: carSeatOnlyCategories,
  },
]

export const testimonials = [
  {
    name: 'Sarah Sharma',
    role: 'Bandra, Mumbai',
    text: 'Hangers & Basket has completely changed how I handle laundry. The quality is exceptional and the pickup & delivery is always on time. Highly recommend!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
  },
  {
    name: 'Arjun Mehta',
    role: 'Koramangala, Bengaluru',
    text: 'My suits have never looked better. Their dry cleaning is top-notch and the app makes booking incredibly easy. Worth every rupee.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
  },
  {
    name: 'Priya Nair',
    role: 'Jubilee Hills, Hyderabad',
    text: 'Used their carpet cleaning service — absolutely fantastic results! The team was professional and the house smells so fresh. Will use again.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
  },
  {
    name: 'Rahul Verma',
    role: 'Connaught Place, Delhi',
    text: 'Been using Hangers & Basket for 2 years now. Consistent quality, great app, and their customer service is excellent. My go-to for all cleaning needs.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
  },
  {
    name: 'Emily D\'Souza',
    role: 'Powai, Mumbai',
    text: 'The shoe care service is amazing! My white sneakers look brand new. Fast turnaround and very reasonable prices for the quality you get.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80'
  }
]

export const faqs = [
  {
    q: 'How does the pickup and delivery work?',
    a: 'Simply book via our app or website, choose your preferred pickup time, and our driver will collect your items. We deliver back within 24–72 hours depending on the service.'
  },
  {
    q: 'What are your operating hours?',
    a: 'We operate 7 days a week from 10:00 AM to 8:00 PM. Pickups and deliveries are available throughout these hours across all covered areas.'
  },
  {
    q: 'Is there a minimum order value?',
    a: 'There is no minimum order value. Free pickup and delivery is included on all orders above INR 499.'
  },
  {
    q: 'How do you handle delicate or luxury items?',
    a: 'All delicate and luxury items are handled by our certified specialists using fabric-specific processes and premium care products. We inspect every item before and after cleaning.'
  },
  {
    q: 'What if my item is damaged or lost?',
    a: 'We handle all garments, linen, and fabrics with utmost care, in the rare event of loss or damage during processing, compensation will be strictly as per the policy excluding the specific damage exceptions listed, details available under Terms & Conditions section.'
  },
  {
    q: 'Do you offer subscription plans?',
    a: 'Yes! We offer prepay packs and membership plans (Silver, Gold, Platinum, Diamond) with discounts of up to 25%. Prepay packs are great for regular laundry needs, while memberships offer priority pickup, express service uses, and better per-item rates. Check our Plans page for the latest offers.'
  },
  {
    q: 'Can I track my order?',
    a: "Absolutely! Our app provides real-time order tracking from pickup to delivery. You'll also receive notifications on WhatsApp at each stage."
  },
  {
    q: 'Which areas do you cover?',
    a: 'We currently serve Navi Mumbai and Kharghar. Stay tuned as we expand to more areas soon!'
  }
]

export const locations = [
  'Bandra, Mumbai', 'Powai, Mumbai', 'Andheri, Mumbai', 'Koramangala, Bengaluru', 'Indiranagar, Bengaluru',
  'HSR Layout, Bengaluru', 'Whitefield, Bengaluru', 'Connaught Place, Delhi', 'Hauz Khas, Delhi', 'Dwarka, Delhi',
  'Jubilee Hills, Hyderabad', 'Gachibowli, Hyderabad', 'Anna Nagar, Chennai', 'Adyar, Chennai', 'Alwarpet, Chennai',
  'Salt Lake, Kolkata', 'Park Street, Kolkata', 'Kalyani Nagar, Pune', 'Baner, Pune', 'Satellite, Ahmedabad',
  'Navrangpura, Ahmedabad', 'Civil Lines, Jaipur', 'Gomti Nagar, Lucknow', 'Aundh, Pune', 'Sector 18, Noida'
]

export const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'App Store Rating' },
  { value: '98%', label: 'On-Time Delivery' },
  { value: '13+', label: 'Services Offered' }
]

export const features = [
  {
    icon: '🚀',
    title: 'Express 24hr Turnaround',
    desc: 'Get your laundry back within 24 hours with our express service option.'
  },
  {
    icon: '🌿',
    title: 'Eco-Friendly Products',
    desc: 'We use only biodegradable, skin-safe cleaning agents protecting your family and the planet.'
  },
  {
    icon: '🔒',
    title: 'Fully Insured Items',
    desc: 'Every item in our care is fully insured. Your belongings are safe with us, always.'
  },
  {
    icon: '📱',
    title: 'Smart App Booking',
    desc: 'Book, track, and manage all your orders seamlessly through our award-winning app.'
  },
  {
    icon: '💳',
    title: 'Flexible Payments',
    desc: 'Pay online, via app, or cash on delivery. We accept all major cards and digital wallets.'
  },
  {
    icon: '⭐',
    title: 'Certified Professionals',
    desc: 'Our team are trained, certified, and background-checked experts in garment care.'
  }
]

// ── Packs & Memberships ───────────────────────────────────────────────────

const eligibleEverydayItems = ['Shirt', 'T-Shirt', 'Trouser', 'Blouse', 'Normal Top', 'Skirt', 'Sports Pants', 'Kids Clothes (Normal)', 'Homely Wear', 'Gym Clothes', 'Summer Wear']

export const prepayPacks = [
  {
    id: 'laundry-starter',
    badge: 'Laundry Starter',
    title: 'Wash & Iron 6 kg Pack',
    subtitle: 'for the price of 5 kg',
    description: 'For customers who want finished clothes ready to wear without paying full one-off price on every order.',
    price: 1000,
    originalPrice: 1194,
    savings: 194,
    highlights: [
      '6 kg wash & iron pack',
      'Effective rate: ₹167/kg or ₹33/piece',
      'Works well for office wear and family essentials',
    ],
    validity: 'One time use only',
    eligibleItems: eligibleEverydayItems,
    isBestSeller: false,
    waMessage: 'Hi, I wanted to know more about your *Laundry Starter Pack*.',
  },
  {
    id: 'family-wash-fold',
    badge: 'Family Laundry',
    title: 'Family Laundry 15 kg Wash & Fold Pack',
    subtitle: null,
    description: 'For customers who want maximum savings on daily bulk wash without needing everything ironed.',
    price: 1890,
    originalPrice: 2235,
    savings: 345,
    highlights: [
      '15 kg wash & fold pack',
      'Effective rate: ₹126/kg or ₹25/piece approx.',
      'Roughly 60–75 daily wear garments',
      'Works well for Family, Student and Active wear cloths',
    ],
    validity: '30 days',
    eligibleItems: eligibleEverydayItems,
    isBestSeller: false,
    waMessage: 'Hi, I wanted to know more about your *Family Laundry Pack*.',
  },
  {
    id: 'family-wash-iron',
    badge: 'Best Seller',
    title: 'Family Laundry 15 kg Wash & Iron Pack',
    subtitle: null,
    description: 'For customers who want finished clothes ready to wear without paying full one-off price on every order.',
    price: 2250,
    originalPrice: 2985,
    savings: 735,
    highlights: [
      '15 kg wash & iron pack',
      'Effective rate: ₹150/kg or ₹30/piece approx.',
      'Works well for family essentials and Students',
    ],
    validity: '30 days',
    eligibleItems: eligibleEverydayItems,
    isBestSeller: true,
    waMessage: 'Hi, I wanted to know more about your *Best Seller Pack*.',
  },
]

export const regularOffers = [
  {
    id: 'office-routine',
    badge: 'Office Routine',
    icon: officeRoutineIcon,
    iconBg: '#EFF6FF',
    iconColor: '#1F5FFF',
    title: 'Shirt Dry Clean 10 Pack',
    price: 1500,
    originalPrice: 1750,
    savings: 250,
    highlights: [
      '10 shirt dry cleans',
      'Effective rate: ₹150 per shirt',
      'Works well for working professionals',
      'Strong pack for premium wardrobe care',
    ],
    waMessage: 'Hi, I wanted to know more about your *Office Routine Pack*.',
  },
  {
    id: 'monsoon-special',
    badge: 'Monsoon Special',
    icon: monsoonSpecialIcon,
    iconBg: '#EFF6FF',
    iconColor: '#1F5FFF',
    title: 'Rain Rescue',
    price: null,
    originalPrice: null,
    savings: null,
    highlights: [
      '10% off on jackets, blankets, curtains & heavier garments',
      'Free anti-odor or freshness treatment on orders above ₹5,000',
    ],
    waMessage: 'Hi, I wanted to know more about your *Rain Rescue Pack*.',
  },
  {
    id: 'festival-campaign',
    badge: 'Festival Campaign',
    icon: festivalCampaignIcon,
    iconBg: '#EFF6FF',
    iconColor: '#1F5FFF',
    title: 'Diwali Festival Wardrobe Reset',
    price: null,
    originalPrice: null,
    savings: null,
    highlights: [
      'Flat ₹250 off on orders above ₹2,500',
      'Get festival-ready — prepare your best ethnic wear',
    ],
    waMessage: 'Hi, I wanted to know more about your *Festival Campaign*.',
  },
]

export const membershipPlans = [
  {
    id: 'silver',
    tier: 'Silver',
    color: '#94a3b8',
    accentDark: '#475569',
    investment: 5000,
    discount: 10,
    validity: '45 days',
    rates: [
      'Wash & Fold: ₹134.10 / kg',
      'Wash & Iron: ₹179.10 / kg',
      'Shirt Dry Clean: ₹157.50',
      'Shoe Cleaning from: ₹315',
    ],
    perks: [],
    expressUses: null,
    isBestValue: false,
  },
  {
    id: 'gold',
    tier: 'Gold',
    color: '#f59e0b',
    accentDark: '#b45309',
    investment: 10000,
    discount: 15,
    validity: '60 days',
    rates: [
      'Wash & Fold: ₹126.65 / kg',
      'Wash & Iron: ₹169.15 / kg',
      'Shirt Dry Clean: ₹148.75',
      'Shoe Cleaning from: ₹297.50',
    ],
    perks: ['Priority pickup slot — skip the queue during busy seasons'],
    expressUses: 3,
    isBestValue: false,
  },
  {
    id: 'platinum',
    tier: 'Platinum',
    color: '#a855f7',
    accentDark: '#7c3aed',
    investment: 15000,
    discount: 20,
    validity: '90 days',
    rates: [
      'Wash & Fold: ₹119.20 / kg',
      'Wash & Iron: ₹159.20 / kg',
      'Shirt Dry Clean: ₹140.00',
      'Shoe Cleaning from: ₹280',
    ],
    perks: ['Priority pickup slot — skip the queue during busy seasons'],
    expressUses: 7,
    isBestValue: true,
  },
  {
    id: 'diamond',
    tier: 'Diamond',
    color: '#22d3ee',
    accentDark: '#0891b2',
    investment: 20000,
    discount: 25,
    validity: '120 days',
    rates: [
      'Wash & Fold: ₹111.75 / kg',
      'Wash & Iron: ₹149.25 / kg',
      'Shirt Dry Clean: ₹131.25',
      'Shoe Cleaning from: ₹262.50',
    ],
    perks: ['Priority pickup slot — skip the queue during busy seasons'],
    expressUses: 14,
    isBestValue: false,
  },
]

export const membershipTnC = [
  '48-hour express service is available to Gold, Platinum, and Diamond members only.',
  '24-hour express service is charged extra for all members regardless of tier.',
  'No carry-forward is allowed for any remaining balance at expiry.',
]
