export type Language = "en" | "ko"

export const CATEGORY_LABELS: Record<Language, Record<string, string>> = {
  en: {
    All: "All",
    Outerwear: "Outerwear",
    Knitwear: "Knitwear",
    Tailoring: "Tailoring",
    Accessories: "Accessories",
  },
  ko: {
    All: "전체",
    Outerwear: "아우터",
    Knitwear: "니트웨어",
    Tailoring: "테일러링",
    Accessories: "액세서리",
  },
}

const COPY = {
  en: {
    account: "Account",
    addToBag: "Add to bag",
    addedToBag: "Added to bag",
    atelier: "Atelier",
    bag: "Bag",
    checkout: "Proceed to checkout",
    collection: "Collection",
    colour: "Colour",
    complimentary: "Complimentary",
    continueShopping: "Continue shopping",
    createAccount: "Create account",
    details: "Details",
    discoverCollection: "Discover the collection",
    emptyBag: "Your bag is empty",
    exploreCollection: "Explore the collection",
    fabricCare: "Fabric & Care",
    home: "Home",
    myAccount: "My Account",
    orderSummary: "Order Summary",
    pleaseSelectSize: "Please select a size",
    register: "Register",
    shipping: "Shipping",
    shippingReturns: "Shipping & Returns",
    signIn: "Sign In",
    signInCheckout: "Sign in to checkout",
    signOut: "Sign out",
    size: "Size",
    sizeGuide: "Size guide",
    soldOut: "Sold out",
    sort: "Sort",
    subtotal: "Subtotal",
    total: "Total",
    viewAll: "View all",
    wishlistEmpty: "Your wishlist is empty.",
  },
  ko: {
    account: "계정",
    addToBag: "장바구니 담기",
    addedToBag: "담겼습니다",
    atelier: "아틀리에",
    bag: "백",
    checkout: "결제 진행",
    collection: "컬렉션",
    colour: "컬러",
    complimentary: "무료",
    continueShopping: "쇼핑 계속하기",
    createAccount: "계정 만들기",
    details: "상세 정보",
    discoverCollection: "컬렉션 보기",
    emptyBag: "장바구니가 비어 있습니다",
    exploreCollection: "컬렉션 둘러보기",
    fabricCare: "소재 및 관리",
    home: "홈",
    myAccount: "내 계정",
    orderSummary: "주문 요약",
    pleaseSelectSize: "사이즈를 선택해주세요",
    register: "회원가입",
    shipping: "배송",
    shippingReturns: "배송 및 반품",
    signIn: "로그인",
    signInCheckout: "로그인 후 결제",
    signOut: "로그아웃",
    size: "사이즈",
    sizeGuide: "사이즈 가이드",
    soldOut: "품절",
    sort: "정렬",
    subtotal: "소계",
    total: "총계",
    viewAll: "전체 보기",
    wishlistEmpty: "위시리스트가 비어 있습니다.",
  },
} as const

export type CopyKey = keyof typeof COPY.en

export function t(language: Language, key: CopyKey) {
  return COPY[language][key]
}

export function categoryLabel(language: Language, category: string) {
  return CATEGORY_LABELS[language][category] ?? category
}
