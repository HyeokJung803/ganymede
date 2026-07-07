import type { Product } from "./types"

/**
 * Fallback catalogue used when the API at localhost:8080/api is unavailable
 * (e.g. in the preview environment). The live app prefers API data.
 *
 * Image assets are provided by the project owner at the paths below.
 */
const COAT = "/images/products/ganymede-black-coat.png"
const COAT_MODEL = "/images/products/ganymede-black-coat-model.png"
const WOMENS_LEATHER_COAT = "/images/products/ganymede-womens-leather-coat.png"
const WOMENS_LEATHER_COAT_MODEL = "/images/products/ganymede-womens-leather-coat-model.png"
const MENS_WHITE_SHIRT = "/images/products/ganymede-mens-white-shirt.png"
const MENS_WHITE_SHIRT_MODEL = "/images/products/ganymede-mens-white-shirt-model.png"
const WOMENS_IVORY_BLOUSE = "/images/products/ganymede-womens-ivory-blouse.png"
const WOMENS_IVORY_BLOUSE_MODEL = "/images/products/ganymede-womens-ivory-blouse-model.png"
const BLACK_BIFOLD_WALLET = "/images/products/ganymede-black-bifold-wallet.png"
const BLACK_BIFOLD_WALLET_OPEN = "/images/products/ganymede-black-bifold-wallet-open.png"
const BLACK_LEATHER_BELT = "/images/products/ganymede-black-leather-belt.png"
const BLACK_CARD_WALLET = "/images/products/ganymede-black-card-wallet.png"
const BLACK_CARD_WALLET_BACK = "/images/products/ganymede-black-card-wallet-back.png"
const WOMENS_IVORY_WIDE_TROUSER = "/images/products/ganymede-womens-ivory-wide-trouser.png"
const WOMENS_IVORY_WIDE_TROUSER_MODEL = "/images/products/ganymede-womens-ivory-wide-trouser-model.png"
const WOMENS_BLACK_WIDE_TROUSER = "/images/products/ganymede-womens-black-wide-trouser.png"
const WOMENS_BLACK_WIDE_TROUSER_MODEL = "/images/products/ganymede-womens-black-wide-trouser-model.png"
const MENS_BLACK_SLACKS = "/images/products/ganymede-mens-black-slacks.png"
const MENS_BLACK_SLACKS_MODEL = "/images/products/ganymede-mens-black-slacks-model.png"
const BLACK_TOTE_BAG = "/images/products/ganymede-black-tote-bag.png"
const BLACK_TOTE_BAG_MODEL = "/images/products/ganymede-black-tote-bag-model.png"
const BLACK_MINI_TOTE_BAG = "/images/products/ganymede-black-mini-tote-bag.png"
const BLACK_MINI_TOTE_BAG_MODEL = "/images/products/ganymede-black-mini-tote-bag-model.png"
const BROWN_LEATHER_LOAFER = "/images/products/ganymede-brown-leather-loafer.png"
const BROWN_LEATHER_LOAFER_MODEL = "/images/products/ganymede-brown-leather-loafer-model.png"
const BROWN_LEATHER_PUMP = "/images/products/ganymede-brown-leather-pump.png"
const BROWN_LEATHER_PUMP_MODEL = "/images/products/ganymede-brown-leather-pump-model.png"
const KNIT = "/images/products/ganymede-black-knit.png"
const KNIT_MODEL = "/images/products/ganymede-black-knit-model.png"

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Ganymede Black Coat",
    category: "Outerwear",
    price: 2450000,
    currency: "KRW",
    description:
      "A floor-skimming overcoat cut from double-faced Italian wool. Softly structured shoulders, a concealed placket, and a clean, elongated silhouette designed to fall without interruption.",
    image: COAT,
    hoverImage: COAT_MODEL,
    images: [COAT, COAT_MODEL],
    colors: ["Black", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "Double-faced virgin wool, woven in Biella",
      "Concealed two-button placket",
      "Fully bound interior seams",
      "Horn buttons",
    ],
    fabric: "100% Virgin Wool",
    origin: "Made in Seoul",
  },
  {
    id: 2,
    name: "Ganymede Women's Leather Coat",
    category: "Outerwear",
    price: 2860000,
    currency: "KRW",
    description:
      "A long dark-brown leather coat with a tailored lapel, clean button front, and subtle gold GANYMEDE crest.",
    image: WOMENS_LEATHER_COAT,
    hoverImage: WOMENS_LEATHER_COAT_MODEL,
    images: [WOMENS_LEATHER_COAT, WOMENS_LEATHER_COAT_MODEL],
    colors: ["Dark Brown"],
    sizes: ["XS", "S", "M", "L"],
    details: ["Longline leather silhouette", "Tailored lapel", "Button front", "Side welt pockets"],
    fabric: "Lamb leather outer, viscose lining",
    origin: "Made in Seoul",
  },
  {
    id: 3,
    name: "Ganymede Men's White Shirt",
    category: "Tailoring",
    price: 520000,
    currency: "KRW",
    description:
      "A relaxed white shirt with an open camp collar, soft drape, and subtle gold GANYMEDE crest.",
    image: MENS_WHITE_SHIRT,
    hoverImage: MENS_WHITE_SHIRT_MODEL,
    images: [MENS_WHITE_SHIRT, MENS_WHITE_SHIRT_MODEL],
    colors: ["White"],
    sizes: ["S", "M", "L", "XL"],
    details: ["Open camp collar", "Relaxed long sleeve cut", "Pearl buttons", "Curved hem"],
    fabric: "100% Cotton",
    origin: "Made in Seoul",
  },
  {
    id: 4,
    name: "Ganymede Women's Ivory Blouse",
    category: "Tailoring",
    price: 560000,
    currency: "KRW",
    description:
      "An ivory blouse with a soft asymmetric collar, fluid drape, and quiet button front.",
    image: WOMENS_IVORY_BLOUSE,
    hoverImage: WOMENS_IVORY_BLOUSE_MODEL,
    images: [WOMENS_IVORY_BLOUSE, WOMENS_IVORY_BLOUSE_MODEL],
    colors: ["Ivory"],
    sizes: ["XS", "S", "M", "L"],
    details: ["Asymmetric open collar", "Fluid long sleeve cut", "Pearl buttons", "Curved hem"],
    fabric: "Silk blend",
    origin: "Made in Seoul",
  },
  {
    id: 5,
    name: "Ganymede Black Bifold Wallet",
    category: "Accessories",
    price: 420000,
    currency: "KRW",
    description:
      "A black leather bifold wallet with precise edge stitching, card slots, and a gold GANYMEDE monogram.",
    image: BLACK_BIFOLD_WALLET,
    hoverImage: BLACK_BIFOLD_WALLET_OPEN,
    images: [BLACK_BIFOLD_WALLET, BLACK_BIFOLD_WALLET_OPEN],
    colors: ["Black"],
    sizes: ["One Size"],
    details: ["Bifold construction", "Card slots", "Bill compartment", "Gold monogram"],
    fabric: "Calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 6,
    name: "Ganymede Black Leather Belt",
    category: "Accessories",
    price: 360000,
    currency: "KRW",
    description:
      "A black leather belt with precise edge stitching and a polished gold GANYMEDE monogram buckle.",
    image: BLACK_LEATHER_BELT,
    images: [BLACK_LEATHER_BELT],
    colors: ["Black"],
    sizes: ["80", "85", "90", "95", "100"],
    details: ["Gold monogram buckle", "Adjustable holes", "Edge stitching"],
    fabric: "Calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 7,
    name: "Ganymede Black Card Wallet",
    category: "Accessories",
    price: 290000,
    currency: "KRW",
    description:
      "A slim black leather card wallet with clean stitched edges and a gold GANYMEDE monogram.",
    image: BLACK_CARD_WALLET,
    hoverImage: BLACK_CARD_WALLET_BACK,
    images: [BLACK_CARD_WALLET, BLACK_CARD_WALLET_BACK],
    colors: ["Black"],
    sizes: ["One Size"],
    details: ["Slim card holder", "Multiple card slots", "Gold monogram", "Edge stitching"],
    fabric: "Calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 8,
    name: "Ganymede Women's Ivory Wide Trouser",
    category: "Tailoring",
    price: 620000,
    currency: "KRW",
    description:
      "An ivory wide-leg trouser with front pleats, a clean waistband, and a fluid tailored drape.",
    image: WOMENS_IVORY_WIDE_TROUSER,
    hoverImage: WOMENS_IVORY_WIDE_TROUSER_MODEL,
    images: [WOMENS_IVORY_WIDE_TROUSER, WOMENS_IVORY_WIDE_TROUSER_MODEL],
    colors: ["Ivory"],
    sizes: ["XS", "S", "M", "L"],
    details: ["Wide-leg cut", "Front pleats", "Side pockets", "Clean waistband"],
    fabric: "Wool blend",
    origin: "Made in Seoul",
  },
  {
    id: 9,
    name: "Ganymede Women's Black Wide Trouser",
    category: "Tailoring",
    price: 620000,
    currency: "KRW",
    description:
      "A black wide-leg trouser with sharp front pleats, a clean waistband, and a fluid tailored drape.",
    image: WOMENS_BLACK_WIDE_TROUSER,
    hoverImage: WOMENS_BLACK_WIDE_TROUSER_MODEL,
    images: [WOMENS_BLACK_WIDE_TROUSER, WOMENS_BLACK_WIDE_TROUSER_MODEL],
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L"],
    details: ["Wide-leg cut", "Front pleats", "Side pockets", "Clean waistband"],
    fabric: "Wool blend",
    origin: "Made in Seoul",
  },
  {
    id: 10,
    name: "Ganymede Men's Black Slacks",
    category: "Tailoring",
    price: 590000,
    currency: "KRW",
    description:
      "A black straight-leg slack with pressed front creases, side pockets, and a clean tailored waistband.",
    image: MENS_BLACK_SLACKS,
    hoverImage: MENS_BLACK_SLACKS_MODEL,
    images: [MENS_BLACK_SLACKS, MENS_BLACK_SLACKS_MODEL],
    colors: ["Black"],
    sizes: ["28", "30", "32", "34", "36"],
    details: ["Straight-leg cut", "Pressed creases", "Side pockets", "Belt loops"],
    fabric: "Wool blend",
    origin: "Made in Seoul",
  },
  {
    id: 11,
    name: "Ganymede Black Tote Bag",
    category: "Accessories",
    price: 1290000,
    currency: "KRW",
    description:
      "A structured black leather tote with long shoulder handles, pebbled texture, and a gold GANYMEDE monogram.",
    image: BLACK_TOTE_BAG,
    hoverImage: BLACK_TOTE_BAG_MODEL,
    images: [BLACK_TOTE_BAG, BLACK_TOTE_BAG_MODEL],
    colors: ["Black"],
    sizes: ["One Size"],
    details: ["Structured tote body", "Long shoulder handles", "Open top", "Gold monogram"],
    fabric: "Pebbled calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 12,
    name: "Ganymede Black Mini Tote Bag",
    category: "Accessories",
    price: 980000,
    currency: "KRW",
    description:
      "A compact black leather tote with short handles, structured sides, and a gold GANYMEDE monogram.",
    image: BLACK_MINI_TOTE_BAG,
    hoverImage: BLACK_MINI_TOTE_BAG_MODEL,
    images: [BLACK_MINI_TOTE_BAG, BLACK_MINI_TOTE_BAG_MODEL],
    colors: ["Black"],
    sizes: ["One Size"],
    details: ["Compact tote body", "Short top handles", "Structured sides", "Gold monogram"],
    fabric: "Pebbled calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 13,
    name: "Ganymede Brown Leather Loafer",
    category: "Tailoring",
    price: 720000,
    currency: "KRW",
    description:
      "A brown leather penny loafer with a polished finish, low stacked heel, and subtle gold GANYMEDE hardware.",
    image: BROWN_LEATHER_LOAFER,
    hoverImage: BROWN_LEATHER_LOAFER_MODEL,
    images: [BROWN_LEATHER_LOAFER, BROWN_LEATHER_LOAFER_MODEL],
    colors: ["Brown"],
    sizes: ["250", "260", "270", "280"],
    details: ["Penny strap", "Low stacked heel", "Leather lining", "Gold monogram hardware"],
    fabric: "Calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 14,
    name: "Ganymede Brown Leather Pump",
    category: "Tailoring",
    price: 760000,
    currency: "KRW",
    description:
      "A brown pointed-toe leather pump with a slim heel and subtle gold GANYMEDE hardware.",
    image: BROWN_LEATHER_PUMP,
    hoverImage: BROWN_LEATHER_PUMP_MODEL,
    images: [BROWN_LEATHER_PUMP, BROWN_LEATHER_PUMP_MODEL],
    colors: ["Brown"],
    sizes: ["225", "230", "235", "240", "245", "250"],
    details: ["Pointed toe", "Slim heel", "Leather lining", "Gold monogram hardware"],
    fabric: "Calf leather",
    origin: "Made in Seoul",
  },
  {
    id: 15,
    name: "Ganymede Black Knit",
    category: "Knitwear",
    price: 690000,
    currency: "KRW",
    description:
      "A heavyweight black crewneck refined to its essence. Cut with a quiet oversized silhouette, dense structure, and clean unbranded finish.",
    image: KNIT,
    hoverImage: KNIT_MODEL,
    images: [KNIT, KNIT_MODEL],
    colors: ["Black", "Ivory", "Slate"],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "Extra-fine 18.5 micron merino",
      "Fully fashioned shoulders",
      "Ribbed collar, cuffs, and hem",
    ],
    fabric: "100% Extra-Fine Merino Wool",
    origin: "Made in Seoul",
  },
]

export const CATEGORIES = ["All", "Outerwear", "Knitwear", "Tailoring", "Accessories"]
