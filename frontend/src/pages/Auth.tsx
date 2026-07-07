import { useState } from "react"
import { useStore } from "../store"
import { t } from "../lib/i18n"
import { cn } from "../lib/utils"
import ProductImage from "../components/ProductImage"

const IMAGE = "/images/products/ganymede-black-coat-model.png"

export default function Auth() {
  const { login, register, authError, authLoading, navigate, language } = useStore()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok =
      mode === "login"
        ? await login(email, password)
        : await register(name, email, password)
    if (ok) navigate("account")
  }

  return (
    <div className="animate-fade-in grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block">
        <div className="h-full min-h-[560px]">
          <ProductImage src={IMAGE} alt="GANYMEDE" label="GANYMEDE" />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 md:px-10">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <p className="mb-3 text-[11px] uppercase tracking-luxe text-muted-foreground">
              {mode === "login" ? "Welcome back" : "Join the house"}
            </p>
            <h1 className="font-serif text-4xl text-foreground">
              {mode === "login" ? t(language, "signIn") : t(language, "createAccount")}
            </h1>
          </div>

          <div className="mt-10 flex border-b border-border">
            {(["login", "register"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={cn(
                  "flex-1 pb-3 text-[11px] uppercase tracking-wide-sm transition-colors",
                  mode === item
                    ? "border-b border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item === "login" ? t(language, "signIn") : t(language, "register")}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {mode === "register" && (
              <Field label="Full name" type="text" value={name} onChange={setName} required />
            )}
            <Field label="Email address" type="email" value={email} onChange={setEmail} required />
            <Field label="Password" type="password" value={password} onChange={setPassword} required />

            {authError && <p className="text-sm text-accent-strong">{authError}</p>}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-foreground px-8 py-4 text-[11px] uppercase tracking-wide-sm text-background transition-colors hover:bg-charcoal disabled:opacity-60"
            >
              {authLoading
                ? "Please wait..."
                : mode === "login"
                  ? t(language, "signIn")
                  : t(language, "createAccount")}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground">
            {mode === "login" ? "New to GANYMEDE? " : "Already a member? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-foreground underline underline-offset-4"
            >
              {mode === "login" ? t(language, "createAccount") : t(language, "signIn")}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-wide-sm text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-border-strong bg-transparent py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  )
}
