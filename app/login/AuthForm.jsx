"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, CheckCircle, AlertCircle,  } from "lucide-react"
import { cn } from "@/lib/utils"
import LogoGenio from '../components/LogoGenio'
import Success from "../GIO-mascota/emote-like.svg"
import Error from "../GIO-mascota/Error-Head.svg"


function Modal({ isOpen, onClose, type, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-white/20 transform transition-all duration-300 scale-100">
        <div className="text-center">
          <div className="mb-4">
            {type === "success" ? (
              Success ? <img src={Success.src} alt="Success" className="w-32 h-32 mx-auto" /> : <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            ) : (
              Error ? <img src={Error.src} alt="Error" className="w-32 h-32 mx-auto" /> : <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            )}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">{type === "success" ? "¡Éxito!" : "¡Error!"}</h3>
          <p className="text-gray-600 mb-5 text-sm leading-relaxed">{message}</p>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}

function FloatingInput({
  id,
  type = "text",
  label,
  value,
  onChange,
  required = false,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative group mb-6">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-lg opacity-0 transition-all duration-300 blur-sm animate-pulse",
          isFocused && "opacity-100",
        )}
      ></div>

      <div className="relative">
        <Input
          id={id}
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "peer pt-6 pb-3 px-4 bg-gray-50/90 backdrop-blur-sm border border-gray-200 rounded-lg transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:bg-white/95 focus:shadow-lg focus:shadow-purple-500/10 relative z-10",
            isFocused && "transform scale-[1.02]",
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none bg-white/90 px-1 rounded text-gray-500 z-20",
            isFocused || hasValue
              ? "top-0 text-xs text-purple-600 font-medium transform -translate-y-1/2"
              : "top-1/2 text-sm transform -translate-y-1/2",
          )}
        >
          {label}
        </label>
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-all duration-200 hover:scale-110 z-20 w-6 h-6 flex items-center justify-center rounded-full hover:bg-purple-50"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  )
}

export function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    message: "",
  })

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const showModal = (type, message) => {
    setModal({ isOpen: true, type, message })
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("/api/auth/2fa/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      const msg =
        data?.error ||
        (res.status === 401
          ? "Usuario o contraseña incorrectos"
          : "Error al iniciar sesión");
      showModal("error", msg);
      return;
    }

    showModal("success", "Te enviamos un código de 6 dígitos al correo.");
    setTimeout(() => {
      window.location.href = "/login/2fa";
    }, 800);
  } catch {
    showModal("error", "Error de red");
  } finally {
    setIsLoading(false);
  }
};



const handleRegister = async (e) => {
  e.preventDefault()

  if (registerData.password !== registerData.confirmPassword) {
    showModal("error", "Las contraseñas no coinciden")
    return
  }


  if (!registerData.acceptTerms) {
    showModal("error", "Debes aceptar los términos y condiciones para continuar")
    return
  }


  const password = registerData.password
  const errors = []

  if (password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres.")
  if (!/[a-z]/.test(password)) errors.push("La contraseña debe incluir al menos una letra minúscula.")
  if (!/[A-Z]/.test(password)) errors.push("La contraseña debe incluir al menos una letra mayúscula.")
  if (!/\d/.test(password)) errors.push("La contraseña debe incluir al menos un número.")
  if (!/[^\w\s]/.test(password)) errors.push("La contraseña debe incluir al menos un carácter especial (ej: !@#$%).")

  if (errors.length > 0) {
    showModal("error", errors.join("\n"))
    return
  }


  setIsLoading(true)
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerData.name,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      showModal("error", data.error || "Error en el registro")
      return
    }

    showModal("success", data.message || "¡Registro exitoso! Ahora inicia sesión.")
    setTimeout(() => {
      setIsLoginMode(true)
      closeModal()
    }, 1200)
  } catch (err) {
    showModal("error", "Error de red")
  } finally {
    setIsLoading(false)
  }
};


  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-25">
          <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-gradient-radial from-purple-300/40 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-gradient-radial from-pink-300/40 to-transparent rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-[50%] left-[50%] w-[20%] h-[20%] bg-gradient-radial from-purple-200/30 to-transparent rounded-full animate-bounce delay-500"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 min-h-screen flex items-center justify-center py-8">
        <div className="relative w-full h-[600px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl hover:scale-[1.01]">
          <div className="absolute top-6 left-6 z-50 flex items-center space-x-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/30">
            <div onClick={() => (window.location.href = "/")} className="transition-transform duration-300 hover:rotate-12 hover:scale-110">
              <LogoGenio variant="simplified" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              GENIO
            </span>
          </div>

          <div
            className={cn(
              "absolute w-1/2 h-full bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white transition-all duration-1000 ease-in-out z-30 flex flex-col justify-center items-center p-12 text-center",
              "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
              isLoginMode ? "left-1/2 rounded-r-2xl" : "left-0 rounded-l-2xl",
            )}
          >
            <div className="max-w-sm transition-all duration-500 hover:-translate-y-2 relative z-10">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
                {isLoginMode ? "¡Bienvenido a GENIO!" : "¡Únete a GENIO!"}
              </h2>
              <p className="mb-6 opacity-90 leading-relaxed text-sm">
                {isLoginMode
                  ? "¿Ya tienes una cuenta? Inicia sesión para acceder a todas las funciones de nuestra plataforma."
                  : "¿No tienes una cuenta? Regístrate para desbloquear todo el potencial de nuestra plataforma."}
              </p>
              <Button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10">{isLoginMode ? "Crear Cuenta" : "Iniciar Sesión"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
            </div>
          </div>

          <div className="flex h-full">
            <div
              className={cn(
                "w-1/2 h-full p-12 flex flex-col justify-center transition-all duration-500 z-20",
                isLoginMode
                  ? "opacity-100 pointer-events-auto transform translate-x-0"
                  : "opacity-0 pointer-events-none transform translate-x-4",
              )}
            >
              <div className="max-w-sm mx-auto w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Iniciar Sesión</h2>
                <p className="text-gray-600 text-center mb-8">Accede a tu cuenta</p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <FloatingInput
                    id="login-email"
                    type="email"
                    label="Correo electrónico"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />

                  <FloatingInput
                    id="login-password"
                    type="password"
                    label="Contraseña"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    showPasswordToggle
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                  />

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={loginData.rememberMe}
                      onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm text-gray-600 cursor-pointer hover:text-purple-600 transition-colors duration-200"
                    >
                      Recordarme
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Iniciando..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </div>
            </div>

            <div
              className={cn(
                "w-1/2 h-full p-12 flex flex-col justify-center transition-all duration-500 z-20",
                !isLoginMode
                  ? "opacity-100 pointer-events-auto transform translate-x-0"
                  : "opacity-0 pointer-events-none transform -translate-x-4",
              )}
            >
              <div className="max-w-sm mx-auto w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Crear Cuenta</h2>
                <p className="text-gray-600 text-center mb-8">Únete a nuestra plataforma</p>

                <form onSubmit={handleRegister} className="space-y-6">
                  <FloatingInput
                    id="register-name"
                    type="text"
                    label="Nombre"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                  <FloatingInput
                    id="register-last-name"
                    type="text"
                    label="Apellido"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    required
                  />
                  <FloatingInput
                    id="register-email"
                    type="email"
                    label="Correo electrónico"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />

                  <FloatingInput
                    id="register-password"
                    type="password"
                    label="Contraseña"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    showPasswordToggle
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                  />

                  <FloatingInput
                    id="register-confirm-password"
                    type="password"
                    label="Confirmar contraseña"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                    showPasswordToggle
                    showPassword={showConfirmPassword}
                    onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  />

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="accept-terms"
                      checked={registerData.acceptTerms}
                      onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200 mt-0.5"
                      required
                    />
                    <label
                      htmlFor="accept-terms"
                      className="text-sm text-gray-600 cursor-pointer hover:text-purple-600 transition-colors duration-200 leading-relaxed"
                    >
                      Acepto los{" "}
                      <a href="#" className="text-purple-600 hover:text-purple-700 underline font-medium">
                        términos y condiciones
                      </a>{" "}
                      y la{" "}
                      <a href="#" className="text-purple-600 hover:text-purple-700 underline font-medium">
                        política de privacidad
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Creando..." : "Crear Cuenta"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modal.isOpen} onClose={closeModal} type={modal.type} message={modal.message} />
    </>
  )
}
export default AuthForm